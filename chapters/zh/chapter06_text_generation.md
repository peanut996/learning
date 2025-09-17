# 第6章：LLM的文本生成机制

## 6.1 生成策略详解

### 6.1.1 自回归生成的基本原理

**生成过程的数学描述：**
```
P(y1, y2, ..., yT | x) = ∏(t=1 to T) P(yt | x, y1, ..., yt-1)
```

**逐步生成流程：**
1. **初始化**：给定输入序列x和起始token
2. **条件概率计算**：计算下一个token的概率分布
3. **token选择**：根据解码策略选择下一个token
4. **序列更新**：将选择的token添加到当前序列
5. **迭代继续**：重复步骤2-4直到满足停止条件

**停止条件：**
- 生成特殊结束标记(EOS)
- 达到最大长度限制
- 满足任务特定的终止条件

### 6.1.2 贪心解码(Greedy Decoding)

**算法原理：**
每一步都选择概率最高的token：
```python
def greedy_decode(model, input_ids, max_length):
    generated = input_ids.clone()

    for _ in range(max_length):
        # 获取下一个token的概率分布
        with torch.no_grad():
            outputs = model(generated)
            logits = outputs.logits[:, -1, :]  # 最后一个位置的logits

        # 选择概率最高的token
        next_token = torch.argmax(logits, dim=-1, keepdim=True)

        # 检查是否为结束符
        if next_token.item() == eos_token_id:
            break

        # 添加到序列中
        generated = torch.cat([generated, next_token], dim=1)

    return generated
```

**优势：**
- **计算效率高**：每步只需要一次前向传播
- **确定性输出**：相同输入总是产生相同输出
- **实现简单**：算法逻辑直观易懂

**局限性：**
- **局部最优**：可能陷入局部最优解，错过全局最优
- **重复问题**：容易产生重复的短语或句子
- **缺乏多样性**：生成结果单一，缺乏创造性
- **错误累积**：早期错误会影响后续生成质量

### 6.1.3 束搜索(Beam Search)

**算法原理：**
维护多个候选序列，每步扩展所有候选并保留最优的k个：

```python
def beam_search(model, input_ids, beam_size, max_length):
    batch_size = input_ids.size(0)

    # 初始化beam
    sequences = input_ids.unsqueeze(1).repeat(1, beam_size, 1)
    scores = torch.zeros(batch_size, beam_size)

    for step in range(max_length):
        # 获取所有候选的logits
        with torch.no_grad():
            outputs = model(sequences.view(-1, sequences.size(-1)))
            logits = outputs.logits[:, -1, :]
            log_probs = F.log_softmax(logits, dim=-1)

        # 重塑为(batch_size, beam_size, vocab_size)
        log_probs = log_probs.view(batch_size, beam_size, -1)

        # 计算累积分数
        scores = scores.unsqueeze(-1) + log_probs

        # 选择top-k个候选
        scores_flat = scores.view(batch_size, -1)
        top_scores, top_indices = torch.topk(scores_flat, beam_size, dim=1)

        # 解析beam索引和token索引
        beam_indices = top_indices // scores.size(-1)
        token_indices = top_indices % scores.size(-1)

        # 更新序列
        sequences = sequences.gather(1, beam_indices.unsqueeze(-1).expand(-1, -1, sequences.size(-1)))
        sequences = torch.cat([sequences, token_indices.unsqueeze(-1)], dim=-1)
        scores = top_scores

    # 返回得分最高的序列
    best_sequences = sequences[:, 0, :]
    return best_sequences
```

**优势：**
- **全局搜索**：考虑多个可能的路径，减少局部最优问题
- **质量提升**：通常产生更高质量的输出
- **可控性**：通过调整beam_size控制搜索宽度

**局限性：**
- **计算开销**：需要维护多个候选序列，计算量增大
- **内存占用**：存储多个beam状态需要更多内存
- **长度偏差**：倾向于生成较短的序列
- **仍有重复问题**：在某些情况下仍可能产生重复

**长度归一化：**
```python
# 避免长度偏差的改进
normalized_score = total_score / (sequence_length ** length_penalty)
```

### 6.1.4 采样方法

**随机采样的必要性：**
- **多样性需求**：确定性方法难以产生多样化的输出
- **创造性任务**：文学创作、对话等需要一定的随机性
- **避免重复**：随机性可以有效减少重复问题

#### Top-k采样

**算法原理：**
只从概率最高的k个token中进行采样：

```python
def top_k_sampling(logits, k, temperature=1.0):
    # 应用温度参数
    logits = logits / temperature

    # 获取top-k个最大值
    top_k_logits, top_k_indices = torch.topk(logits, k, dim=-1)

    # 创建mask，保留top-k，其余设为负无穷
    logits_mask = logits.clone()
    logits_mask[logits_mask < top_k_logits[..., -1:]] = float('-inf')

    # 计算概率并采样
    probs = F.softmax(logits_mask, dim=-1)
    next_token = torch.multinomial(probs, num_samples=1)

    return next_token
```

**优势：**
- **可控性**：通过k值控制候选集大小
- **避免低质量token**：过滤掉概率很低的无意义token
- **平衡性**：在确定性和随机性之间取得平衡

**局限性：**
- **固定候选集**：无法根据概率分布的特性动态调整
- **尾部截断**：可能错过一些有意义的低概率token

#### Top-p采样(Nucleus Sampling)

**算法原理：**
选择累积概率达到p的最小token集合进行采样：

```python
def top_p_sampling(logits, p, temperature=1.0):
    # 应用温度参数
    logits = logits / temperature

    # 计算概率
    probs = F.softmax(logits, dim=-1)

    # 按概率降序排列
    sorted_probs, sorted_indices = torch.sort(probs, descending=True, dim=-1)

    # 计算累积概率
    cumulative_probs = torch.cumsum(sorted_probs, dim=-1)

    # 创建mask，保留累积概率<=p的token
    sorted_indices_to_remove = cumulative_probs > p
    sorted_indices_to_remove[..., 1:] = sorted_indices_to_remove[..., :-1].clone()
    sorted_indices_to_remove[..., 0] = 0

    # 应用mask
    indices_to_remove = sorted_indices_to_remove.scatter(1, sorted_indices, sorted_indices_to_remove)
    logits[indices_to_remove] = float('-inf')

    # 重新计算概率并采样
    probs = F.softmax(logits, dim=-1)
    next_token = torch.multinomial(probs, num_samples=1)

    return next_token
```

**优势：**
- **动态调整**：候选集大小根据概率分布自动调整
- **保持多样性**：在分布均匀时保留更多选择
- **质量保证**：在分布集中时减少候选集

#### 混合采样策略

**Top-k + Top-p组合：**
```python
def combined_sampling(logits, top_k, top_p, temperature=1.0):
    # 先应用top-k过滤
    if top_k > 0:
        top_k_logits, _ = torch.topk(logits, min(top_k, logits.size(-1)))
        logits[logits < top_k_logits[..., -1:]] = float('-inf')

    # 再应用top-p过滤
    if top_p < 1.0:
        logits = top_p_sampling_filter(logits, top_p)

    # 应用温度并采样
    logits = logits / temperature
    probs = F.softmax(logits, dim=-1)
    next_token = torch.multinomial(probs, num_samples=1)

    return next_token
```

### 6.1.5 温度参数的作用机制

**数学定义：**
```
P(yi | x, y<i) = softmax(logits_i / T)
```
其中T为温度参数

**温度参数的影响：**

**T > 1 (高温度)：**
- **效果**：概率分布变得更加平坦
- **结果**：生成更随机、多样化的文本
- **适用场景**：创意写作、头脑风暴
- **数学表现**：
```
当T→∞时，P(yi) → 1/|V| (均匀分布)
```

**T < 1 (低温度)：**
- **效果**：概率分布变得更加尖锐
- **结果**：生成更确定、保守的文本
- **适用场景**：事实问答、代码生成
- **数学表现**：
```
当T→0时，P(yi) → δ(i=argmax(logits)) (确定性选择)
```

**温度参数的选择策略：**
```python
def adaptive_temperature(task_type, generation_step):
    """根据任务类型和生成步骤动态调整温度"""
    base_temp = {
        'creative_writing': 1.2,
        'dialogue': 0.9,
        'factual_qa': 0.7,
        'code_generation': 0.3
    }

    # 可选：随着生成步骤增加逐渐降低温度
    decay_factor = 0.99 ** generation_step

    return base_temp[task_type] * decay_factor
```

### 6.1.6 现代生成策略

#### Contrastive Search

**核心思想：**
平衡生成质量和多样性，避免重复的同时保持连贯性：

```python
def contrastive_search(model, input_ids, alpha=0.6, k=4, max_length=50):
    """
    alpha: 用于平衡置信度和对比性的参数
    k: 候选集大小
    """
    generated = input_ids.clone()

    for _ in range(max_length):
        # 获取logits
        outputs = model(generated)
        logits = outputs.logits[:, -1, :]

        # 选择top-k候选
        top_k_probs, top_k_indices = torch.topk(F.softmax(logits, dim=-1), k)

        # 计算对比分数
        scores = []
        for i, (prob, token_idx) in enumerate(zip(top_k_probs[0], top_k_indices[0])):
            # 计算与历史序列的相似度
            similarity = compute_similarity(generated, token_idx)

            # 对比分数：置信度 - 相似度惩罚
            score = alpha * prob - (1 - alpha) * similarity
            scores.append(score)

        # 选择得分最高的token
        best_idx = torch.argmax(torch.tensor(scores))
        next_token = top_k_indices[0][best_idx].unsqueeze(0).unsqueeze(0)

        generated = torch.cat([generated, next_token], dim=1)

    return generated
```

#### Typical Sampling

**核心理念：**
选择"典型性"高的token，而不是概率最高的token：

```python
def typical_sampling(logits, tau=0.95, temperature=1.0):
    """
    tau: 典型性阈值
    """
    logits = logits / temperature
    probs = F.softmax(logits, dim=-1)

    # 计算信息量 -log(p)
    log_probs = F.log_softmax(logits, dim=-1)
    neg_entropy = probs * log_probs
    entropy = -neg_entropy.sum()

    # 计算每个token的典型性
    typical_filter = torch.abs(log_probs + entropy) < tau

    # 过滤并重新归一化
    filtered_logits = logits.clone()
    filtered_logits[~typical_filter] = float('-inf')

    probs = F.softmax(filtered_logits, dim=-1)
    next_token = torch.multinomial(probs, num_samples=1)

    return next_token
```

## 6.2 上下文理解与处理

### 6.2.1 上下文窗口的概念与限制

**上下文窗口定义：**
模型在单次前向传播中能够处理的最大序列长度，通常受到以下因素限制：

**技术限制：**
- **注意力机制复杂度**：O(n²) 的计算和内存复杂度
- **位置编码范围**：预训练时的最大序列长度限制
- **GPU内存容量**：长序列需要更多显存

**实际影响：**
```python
# 不同模型的上下文窗口大小
context_windows = {
    "GPT-3": 2048,      # ~1500词
    "GPT-4": 8192,      # ~6000词
    "GPT-4-32k": 32768, # ~24000词
    "Claude-2": 100000, # ~75000词
    "GPT-4-turbo": 128000, # ~96000词
}
```

**窗口滑动策略：**
```python
def sliding_window_generation(text, model, window_size, overlap=256):
    """滑动窗口处理长文本"""
    tokens = tokenizer.encode(text)
    results = []

    for i in range(0, len(tokens), window_size - overlap):
        chunk = tokens[i:i + window_size]

        # 处理当前窗口
        with torch.no_grad():
            output = model.generate(
                torch.tensor([chunk]),
                max_new_tokens=512
            )

        results.append(output)

        # 如果overlap存在，保留重叠部分
        if i + window_size >= len(tokens):
            break

    return results
```

### 6.2.2 长序列处理的挑战与解决方案

#### 注意力复杂度问题

**问题分析：**
- **计算复杂度**：O(n²d) 其中n为序列长度，d为隐藏维度
- **内存复杂度**：需要存储n×n的注意力矩阵
- **实际影响**：序列长度翻倍，计算量增加4倍

**解决方案1：线性注意力**
```python
class LinearAttention(nn.Module):
    def __init__(self, dim, heads=8):
        super().__init__()
        self.heads = heads
        self.to_qkv = nn.Linear(dim, dim * 3, bias=False)
        self.to_out = nn.Linear(dim, dim)

    def forward(self, x):
        # 投影到Q, K, V
        qkv = self.to_qkv(x).chunk(3, dim=-1)
        q, k, v = map(lambda t: rearrange(t, 'b n (h d) -> b h n d', h=self.heads), qkv)

        # 特征映射函数 φ(x) = elu(x) + 1
        q = F.elu(q) + 1
        k = F.elu(k) + 1

        # 线性注意力计算: O(nd²)
        context = torch.einsum('bhnd,bhne->bhde', k, v)
        out = torch.einsum('bhnd,bhde->bhne', q, context)

        out = rearrange(out, 'b h n d -> b n (h d)')
        return self.to_out(out)
```

**解决方案2：稀疏注意力**
```python
def sparse_attention_pattern(seq_len, pattern_type='local'):
    """生成稀疏注意力模式"""
    if pattern_type == 'local':
        # 局部注意力：每个位置只关注周围的token
        window_size = 64
        mask = torch.zeros(seq_len, seq_len)
        for i in range(seq_len):
            start = max(0, i - window_size // 2)
            end = min(seq_len, i + window_size // 2)
            mask[i, start:end] = 1

    elif pattern_type == 'strided':
        # 步长注意力：按固定步长采样
        stride = 8
        mask = torch.zeros(seq_len, seq_len)
        for i in range(seq_len):
            mask[i, ::stride] = 1
            mask[i, :min(64, seq_len)] = 1  # 保留前64个位置

    return mask.bool()
```

#### 位置编码扩展

**问题**：预训练时的位置编码无法处理更长序列

**ALiBi外推方法：**
```python
def get_alibi_slopes(num_heads):
    """生成ALiBi的线性偏置斜率"""
    def get_slopes_power_of_2(n):
        start = (2**(-2**-(math.log2(n)-3)))
        ratio = start
        return [start*ratio**i for i in range(n)]

    if math.log2(num_heads).is_integer():
        return get_slopes_power_of_2(num_heads)
    else:
        # 处理非2的幂的情况
        closest_power_of_2 = 2**math.floor(math.log2(num_heads))
        return get_slopes_power_of_2(closest_power_of_2) + \
               get_alibi_slopes(2*closest_power_of_2)[0::2][:num_heads-closest_power_of_2]

def apply_alibi_bias(attention_scores, seq_len, num_heads):
    """应用ALiBi偏置"""
    slopes = torch.tensor(get_alibi_slopes(num_heads))

    # 创建距离矩阵
    position = torch.arange(seq_len).unsqueeze(0)
    distance = position.T - position

    # 应用偏置
    bias = slopes.unsqueeze(-1).unsqueeze(-1) * distance.abs()
    attention_scores = attention_scores + bias

    return attention_scores
```

**RoPE外推方法：**
```python
def extrapolate_rope(base_freq=10000, max_seq_len=2048, target_seq_len=8192):
    """扩展RoPE到更长序列"""
    # 频率外推法
    scale_factor = target_seq_len / max_seq_len
    adjusted_base_freq = base_freq * scale_factor

    return adjusted_base_freq

def ntk_rope_scaling(dim, max_seq_len, target_seq_len, base=10000):
    """Neural Tangent Kernel方法的RoPE缩放"""
    scale = target_seq_len / max_seq_len

    # NTK-aware scaling
    alpha = 2 * math.log(scale) / math.log(2) + 1
    base = base * alpha ** (dim / (dim - 2))

    return base
```

### 6.2.3 上下文相关性建模

#### 层次化注意力

**概念**：不同层级的信息需要不同粒度的注意力机制

```python
class HierarchicalAttention(nn.Module):
    def __init__(self, config):
        super().__init__()
        # 词级注意力
        self.word_attention = MultiHeadAttention(config.hidden_size, config.num_heads)

        # 句子级注意力
        self.sentence_attention = MultiHeadAttention(config.hidden_size, config.num_heads)

        # 段落级注意力
        self.paragraph_attention = MultiHeadAttention(config.hidden_size, config.num_heads)

        self.level_weights = nn.Parameter(torch.ones(3))

    def forward(self, hidden_states, sentence_boundaries, paragraph_boundaries):
        # 词级特征
        word_output = self.word_attention(hidden_states)

        # 句子级特征聚合
        sentence_features = self.aggregate_by_boundaries(word_output, sentence_boundaries)
        sentence_output = self.sentence_attention(sentence_features)

        # 段落级特征聚合
        paragraph_features = self.aggregate_by_boundaries(sentence_output, paragraph_boundaries)
        paragraph_output = self.paragraph_attention(paragraph_features)

        # 加权融合
        weights = F.softmax(self.level_weights, dim=0)
        final_output = weights[0] * word_output + \
                      weights[1] * sentence_output + \
                      weights[2] * paragraph_output

        return final_output
```

#### 上下文相关性度量

**语义相似度计算：**
```python
def compute_context_relevance(query_embed, context_embeds, method='cosine'):
    """计算查询与上下文各部分的相关性"""
    if method == 'cosine':
        # 余弦相似度
        similarity = F.cosine_similarity(
            query_embed.unsqueeze(1),
            context_embeds,
            dim=-1
        )
    elif method == 'attention':
        # 注意力相似度
        similarity = torch.matmul(query_embed, context_embeds.transpose(-2, -1))
        similarity = similarity / math.sqrt(query_embed.size(-1))
        similarity = F.softmax(similarity, dim=-1)

    return similarity

def adaptive_context_selection(hidden_states, relevance_scores, threshold=0.1):
    """根据相关性自适应选择上下文"""
    # 过滤低相关性的内容
    mask = relevance_scores > threshold

    # 保留高相关性的hidden states
    selected_indices = torch.where(mask)[0]
    selected_states = hidden_states[selected_indices]

    return selected_states, selected_indices
```

## 6.3 生成质量控制

### 6.3.1 重复性问题的解决方案

#### 重复检测机制

**N-gram重复检测：**
```python
def detect_ngram_repetition(sequence, n=3, max_repeat=2):
    """检测n-gram重复模式"""
    tokens = sequence.split() if isinstance(sequence, str) else sequence

    ngram_counts = {}
    repetitions = []

    for i in range(len(tokens) - n + 1):
        ngram = tuple(tokens[i:i+n])

        if ngram in ngram_counts:
            ngram_counts[ngram] += 1
            if ngram_counts[ngram] > max_repeat:
                repetitions.append((i, ngram))
        else:
            ngram_counts[ngram] = 1

    return repetitions

def repetition_penalty(logits, input_ids, penalty=1.2):
    """对已出现的token施加重复惩罚"""
    for token_id in set(input_ids.flatten().tolist()):
        logits[..., token_id] /= penalty

    return logits
```

**句级重复检测：**
```python
class SentenceRepetitionDetector:
    def __init__(self, similarity_threshold=0.85):
        self.threshold = similarity_threshold
        self.sentence_embeddings = []

    def add_sentence(self, sentence, embedding_model):
        """添加新句子并检测重复"""
        # 计算句子嵌入
        new_embedding = embedding_model.encode(sentence)

        # 与历史句子比较
        for i, past_embedding in enumerate(self.sentence_embeddings):
            similarity = cosine_similarity([new_embedding], [past_embedding])[0][0]

            if similarity > self.threshold:
                return True, i  # 检测到重复

        # 添加到历史记录
        self.sentence_embeddings.append(new_embedding)
        return False, -1
```

#### 反重复策略

**Coverage机制：**
```python
class CoverageAttention(nn.Module):
    def __init__(self, hidden_size):
        super().__init__()
        self.hidden_size = hidden_size
        self.coverage_proj = nn.Linear(1, hidden_size)

    def forward(self, query, key, value, coverage):
        # 标准注意力
        scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(self.hidden_size)

        # Coverage特征
        coverage_feature = self.coverage_proj(coverage.unsqueeze(-1))

        # 融合coverage信息
        adjusted_scores = scores + coverage_feature.squeeze(-1)
        attention_weights = F.softmax(adjusted_scores, dim=-1)

        # 更新coverage
        new_coverage = coverage + attention_weights.sum(dim=1)

        output = torch.matmul(attention_weights, value)
        return output, attention_weights, new_coverage
```

**多样性奖励：**
```python
def diversity_reward(generated_sequence, window_size=50):
    """计算生成序列的多样性奖励"""
    if len(generated_sequence) < window_size:
        return 0

    # 最近window_size个token
    recent_tokens = generated_sequence[-window_size:]

    # 计算unique token比例
    unique_ratio = len(set(recent_tokens)) / len(recent_tokens)

    # 计算平均互信息
    token_counts = Counter(recent_tokens)
    entropy = -sum(count/len(recent_tokens) * math.log(count/len(recent_tokens))
                  for count in token_counts.values())

    diversity_score = 0.5 * unique_ratio + 0.5 * entropy / math.log(len(set(recent_tokens)))

    return diversity_score
```

### 6.3.2 生成文本的连贯性保证

#### 局部连贯性

**句内一致性检查：**
```python
def check_sentence_coherence(sentence, grammar_checker, semantic_model):
    """检查句子内部连贯性"""
    coherence_score = 0

    # 语法检查
    grammar_errors = grammar_checker.check(sentence)
    grammar_score = max(0, 1 - len(grammar_errors) * 0.1)

    # 语义一致性
    semantic_score = semantic_model.score_coherence(sentence)

    # 综合评分
    coherence_score = 0.6 * grammar_score + 0.4 * semantic_score

    return coherence_score, grammar_errors

class LocalCoherenceModel(nn.Module):
    def __init__(self, vocab_size, embed_size, hidden_size):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_size)
        self.lstm = nn.LSTM(embed_size, hidden_size, batch_first=True)
        self.coherence_head = nn.Linear(hidden_size, 1)

    def forward(self, token_ids):
        embeds = self.embedding(token_ids)
        lstm_out, _ = self.lstm(embeds)

        # 预测每个位置的连贯性分数
        coherence_scores = torch.sigmoid(self.coherence_head(lstm_out))

        return coherence_scores
```

#### 全局连贯性

**主题一致性跟踪：**
```python
class TopicCoherenceTracker:
    def __init__(self, topic_model, max_drift=0.3):
        self.topic_model = topic_model
        self.max_drift = max_drift
        self.topic_history = []

    def track_topic_drift(self, new_text):
        """跟踪主题漂移"""
        # 获取当前文本的主题分布
        current_topics = self.topic_model.get_topic_distribution(new_text)

        if not self.topic_history:
            self.topic_history.append(current_topics)
            return 0, current_topics

        # 计算与历史主题的差异
        recent_avg = np.mean(self.topic_history[-3:], axis=0)
        drift_score = 1 - cosine_similarity([current_topics], [recent_avg])[0][0]

        self.topic_history.append(current_topics)

        return drift_score, current_topics

    def is_drift_acceptable(self, drift_score):
        """判断主题漂移是否可接受"""
        return drift_score <= self.max_drift
```

**因果关系检查：**
```python
def check_causal_consistency(events, causal_model):
    """检查事件序列的因果一致性"""
    inconsistencies = []

    for i, current_event in enumerate(events):
        # 检查当前事件的前提条件
        prerequisites = causal_model.get_prerequisites(current_event)

        # 验证前提条件是否在之前的事件中满足
        for prereq in prerequisites:
            if not any(causal_model.satisfies(prev_event, prereq)
                      for prev_event in events[:i]):
                inconsistencies.append({
                    'event': current_event,
                    'missing_prerequisite': prereq,
                    'position': i
                })

    return inconsistencies
```

### 6.3.3 事实准确性的保证

#### 知识检索增强

**RAG (Retrieval-Augmented Generation) 实现：**
```python
class RAGGenerator:
    def __init__(self, retriever, generator, knowledge_base):
        self.retriever = retriever
        self.generator = generator
        self.knowledge_base = knowledge_base

    def generate_with_retrieval(self, query, top_k=5):
        """带检索的生成"""
        # 1. 检索相关文档
        relevant_docs = self.retriever.retrieve(query, top_k=top_k)

        # 2. 构建增强的输入
        context = self.build_context(query, relevant_docs)

        # 3. 生成回答
        response = self.generator.generate(context)

        # 4. 事实验证
        verified_response = self.verify_facts(response, relevant_docs)

        return verified_response, relevant_docs

    def build_context(self, query, documents):
        """构建包含检索文档的上下文"""
        context = f"Query: {query}\n\nRelevant Information:\n"

        for i, doc in enumerate(documents):
            context += f"{i+1}. {doc['content']}\n"

        context += f"\nBased on the above information, please answer the query:"

        return context
```

**知识一致性检查：**
```python
class FactChecker:
    def __init__(self, knowledge_graph, fact_verification_model):
        self.kg = knowledge_graph
        self.fact_model = fact_verification_model

    def verify_claim(self, claim):
        """验证单个声明的准确性"""
        # 1. 提取三元组
        triples = self.extract_triples(claim)

        # 2. 在知识图谱中验证
        kg_verification = []
        for triple in triples:
            exists = self.kg.check_triple(triple)
            kg_verification.append((triple, exists))

        # 3. 使用事实验证模型
        fact_score = self.fact_model.predict(claim)

        return {
            'claim': claim,
            'kg_verification': kg_verification,
            'fact_score': fact_score,
            'is_supported': fact_score > 0.7 and all(v[1] for v in kg_verification)
        }

    def extract_triples(self, text):
        """从文本中提取实体关系三元组"""
        # 使用NER和关系抽取
        entities = self.ner_model.extract_entities(text)
        relations = self.relation_model.extract_relations(text, entities)

        triples = []
        for relation in relations:
            triple = (relation['subject'], relation['predicate'], relation['object'])
            triples.append(triple)

        return triples
```

#### 不确定性量化

**知识边界识别：**
```python
class UncertaintyQuantifier:
    def __init__(self, model, confidence_threshold=0.8):
        self.model = model
        self.threshold = confidence_threshold

    def estimate_confidence(self, input_text, num_samples=10):
        """使用蒙特卡洛dropout估计置信度"""
        # 启用dropout进行推理
        self.model.train()

        outputs = []
        for _ in range(num_samples):
            with torch.no_grad():
                output = self.model(input_text)
                outputs.append(output)

        # 计算预测的方差
        predictions = torch.stack(outputs)
        mean_pred = predictions.mean(dim=0)
        variance = predictions.var(dim=0)

        # 置信度与方差成反比
        confidence = 1 / (1 + variance.mean())

        return confidence.item(), mean_pred

    def should_abstain(self, confidence):
        """判断是否应该拒绝回答"""
        return confidence < self.threshold

    def generate_hedge_response(self, confidence, base_response):
        """生成带有不确定性表达的回答"""
        if confidence > 0.9:
            return base_response
        elif confidence > 0.7:
            return f"Based on available information, {base_response}"
        elif confidence > 0.5:
            return f"I believe {base_response}, though I'm not entirely certain."
        else:
            return "I'm not confident enough to provide a definitive answer to this question."
```

**多模型集成验证：**
```python
class EnsembleFactChecker:
    def __init__(self, models, voting_strategy='weighted'):
        self.models = models
        self.voting_strategy = voting_strategy

    def ensemble_verification(self, claim):
        """集成多个模型进行事实验证"""
        results = []

        for model_name, model in self.models.items():
            result = model.verify(claim)
            results.append({
                'model': model_name,
                'confidence': result['confidence'],
                'prediction': result['prediction'],
                'weight': model.reliability_score
            })

        # 投票决策
        if self.voting_strategy == 'majority':
            final_decision = self.majority_vote(results)
        elif self.voting_strategy == 'weighted':
            final_decision = self.weighted_vote(results)
        else:
            final_decision = self.confidence_based_vote(results)

        return final_decision

    def weighted_vote(self, results):
        """加权投票"""
        total_weight = sum(r['weight'] for r in results)
        weighted_confidence = sum(r['confidence'] * r['weight'] for r in results) / total_weight

        # 如果大多数高权重模型支持，则接受
        supporting_weight = sum(r['weight'] for r in results if r['prediction'])

        return {
            'prediction': supporting_weight > total_weight / 2,
            'confidence': weighted_confidence,
            'individual_results': results
        }
```