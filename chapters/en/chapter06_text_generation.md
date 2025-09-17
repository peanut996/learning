# Chapter 6: Text Generation Mechanisms in LLMs

## 6.1 Detailed Generation Strategies

### 6.1.1 Basic Principles of Autoregressive Generation

**Mathematical Description of Generation Process:**
```
P(y1, y2, ..., yT | x) = ∏(t=1 to T) P(yt | x, y1, ..., yt-1)
```

**Step-by-Step Generation Process:**
1. **Initialization**: Given input sequence x and starting token
2. **Conditional Probability Calculation**: Compute probability distribution of next token
3. **Token Selection**: Choose next token according to decoding strategy
4. **Sequence Update**: Add selected token to current sequence
5. **Iterative Continuation**: Repeat steps 2-4 until stopping condition is met

**Stopping Conditions:**
- Generate special end-of-sequence token (EOS)
- Reach maximum length limit
- Meet task-specific termination conditions

### 6.1.2 Greedy Decoding

**Algorithm Principle:**
Select the token with highest probability at each step:

```python
def greedy_decode(model, input_ids, max_length):
    generated = input_ids.clone()

    for _ in range(max_length):
        # Get probability distribution for next token
        with torch.no_grad():
            outputs = model(generated)
            logits = outputs.logits[:, -1, :]  # Logits at last position

        # Select token with highest probability
        next_token = torch.argmax(logits, dim=-1, keepdim=True)

        # Check if end token
        if next_token.item() == eos_token_id:
            break

        # Add to sequence
        generated = torch.cat([generated, next_token], dim=1)

    return generated
```

**Advantages:**
- **High Computational Efficiency**: Only requires one forward pass per step
- **Deterministic Output**: Same input always produces same output
- **Simple Implementation**: Intuitive and straightforward algorithm

**Limitations:**
- **Local Optimum**: May get trapped in local optima, missing global optimum
- **Repetition Issues**: Prone to generating repetitive phrases or sentences
- **Lack of Diversity**: Single output lacks creativity
- **Error Accumulation**: Early errors affect subsequent generation quality

### 6.1.3 Beam Search

**Algorithm Principle:**
Maintain multiple candidate sequences, expand all candidates at each step and keep the best k:

```python
def beam_search(model, input_ids, beam_size, max_length):
    batch_size = input_ids.size(0)

    # Initialize beam
    sequences = input_ids.unsqueeze(1).repeat(1, beam_size, 1)
    scores = torch.zeros(batch_size, beam_size)

    for step in range(max_length):
        # Get logits for all candidates
        with torch.no_grad():
            outputs = model(sequences.view(-1, sequences.size(-1)))
            logits = outputs.logits[:, -1, :]
            log_probs = F.log_softmax(logits, dim=-1)

        # Reshape to (batch_size, beam_size, vocab_size)
        log_probs = log_probs.view(batch_size, beam_size, -1)

        # Calculate cumulative scores
        scores = scores.unsqueeze(-1) + log_probs

        # Select top-k candidates
        scores_flat = scores.view(batch_size, -1)
        top_scores, top_indices = torch.topk(scores_flat, beam_size, dim=1)

        # Parse beam indices and token indices
        beam_indices = top_indices // scores.size(-1)
        token_indices = top_indices % scores.size(-1)

        # Update sequences
        sequences = sequences.gather(1, beam_indices.unsqueeze(-1).expand(-1, -1, sequences.size(-1)))
        sequences = torch.cat([sequences, token_indices.unsqueeze(-1)], dim=-1)
        scores = top_scores

    # Return highest scoring sequence
    best_sequences = sequences[:, 0, :]
    return best_sequences
```

**Advantages:**
- **Global Search**: Considers multiple possible paths, reducing local optimum issues
- **Quality Improvement**: Usually produces higher quality output
- **Controllability**: Control search width through beam_size adjustment

**Limitations:**
- **Computational Overhead**: Need to maintain multiple candidate sequences, increased computation
- **Memory Usage**: Storing multiple beam states requires more memory
- **Length Bias**: Tends to generate shorter sequences
- **Still Has Repetition Issues**: May still produce repetition in some cases

**Length Normalization:**
```python
# Improvement to avoid length bias
normalized_score = total_score / (sequence_length ** length_penalty)
```

### 6.1.4 Sampling Methods

**Necessity of Random Sampling:**
- **Diversity Requirements**: Deterministic methods struggle to produce diverse outputs
- **Creative Tasks**: Literary creation, dialogue require certain randomness
- **Avoid Repetition**: Randomness can effectively reduce repetition issues

#### Top-k Sampling

**Algorithm Principle:**
Sample only from the k tokens with highest probability:

```python
def top_k_sampling(logits, k, temperature=1.0):
    # Apply temperature parameter
    logits = logits / temperature

    # Get top-k maximum values
    top_k_logits, top_k_indices = torch.topk(logits, k, dim=-1)

    # Create mask, keep top-k, set others to negative infinity
    logits_mask = logits.clone()
    logits_mask[logits_mask < top_k_logits[..., -1:]] = float('-inf')

    # Calculate probabilities and sample
    probs = F.softmax(logits_mask, dim=-1)
    next_token = torch.multinomial(probs, num_samples=1)

    return next_token
```

**Advantages:**
- **Controllability**: Control candidate set size through k value
- **Avoid Low-Quality Tokens**: Filter out meaningless tokens with very low probability
- **Balance**: Achieve balance between determinism and randomness

**Limitations:**
- **Fixed Candidate Set**: Cannot dynamically adjust based on probability distribution characteristics
- **Tail Truncation**: May miss some meaningful low-probability tokens

#### Top-p Sampling (Nucleus Sampling)

**Algorithm Principle:**
Select the minimal token set with cumulative probability reaching p for sampling:

```python
def top_p_sampling(logits, p, temperature=1.0):
    # Apply temperature parameter
    logits = logits / temperature

    # Calculate probabilities
    probs = F.softmax(logits, dim=-1)

    # Sort by probability descending
    sorted_probs, sorted_indices = torch.sort(probs, descending=True, dim=-1)

    # Calculate cumulative probabilities
    cumulative_probs = torch.cumsum(sorted_probs, dim=-1)

    # Create mask, keep tokens with cumulative probability <= p
    sorted_indices_to_remove = cumulative_probs > p
    sorted_indices_to_remove[..., 1:] = sorted_indices_to_remove[..., :-1].clone()
    sorted_indices_to_remove[..., 0] = 0

    # Apply mask
    indices_to_remove = sorted_indices_to_remove.scatter(1, sorted_indices, sorted_indices_to_remove)
    logits[indices_to_remove] = float('-inf')

    # Recalculate probabilities and sample
    probs = F.softmax(logits, dim=-1)
    next_token = torch.multinomial(probs, num_samples=1)

    return next_token
```

**Advantages:**
- **Dynamic Adjustment**: Candidate set size automatically adjusts based on probability distribution
- **Maintain Diversity**: Retain more choices when distribution is uniform
- **Quality Assurance**: Reduce candidate set when distribution is concentrated

#### Hybrid Sampling Strategies

**Top-k + Top-p Combination:**
```python
def combined_sampling(logits, top_k, top_p, temperature=1.0):
    # Apply top-k filtering first
    if top_k > 0:
        top_k_logits, _ = torch.topk(logits, min(top_k, logits.size(-1)))
        logits[logits < top_k_logits[..., -1:]] = float('-inf')

    # Apply top-p filtering
    if top_p < 1.0:
        logits = top_p_sampling_filter(logits, top_p)

    # Apply temperature and sample
    logits = logits / temperature
    probs = F.softmax(logits, dim=-1)
    next_token = torch.multinomial(probs, num_samples=1)

    return next_token
```

### 6.1.5 Temperature Parameter Mechanism

**Mathematical Definition:**
```
P(yi | x, y<i) = softmax(logits_i / T)
```
where T is the temperature parameter

**Effects of Temperature Parameter:**

**T > 1 (High Temperature):**
- **Effect**: Probability distribution becomes flatter
- **Result**: Generate more random, diverse text
- **Application Scenarios**: Creative writing, brainstorming
- **Mathematical Behavior**:
```
When T→∞, P(yi) → 1/|V| (uniform distribution)
```

**T < 1 (Low Temperature):**
- **Effect**: Probability distribution becomes sharper
- **Result**: Generate more deterministic, conservative text
- **Application Scenarios**: Factual Q&A, code generation
- **Mathematical Behavior**:
```
When T→0, P(yi) → δ(i=argmax(logits)) (deterministic selection)
```

**Temperature Parameter Selection Strategy:**
```python
def adaptive_temperature(task_type, generation_step):
    """Dynamically adjust temperature based on task type and generation step"""
    base_temp = {
        'creative_writing': 1.2,
        'dialogue': 0.9,
        'factual_qa': 0.7,
        'code_generation': 0.3
    }

    # Optional: gradually decrease temperature as generation progresses
    decay_factor = 0.99 ** generation_step

    return base_temp[task_type] * decay_factor
```

### 6.1.6 Modern Generation Strategies

#### Contrastive Search

**Core Idea:**
Balance generation quality and diversity, avoid repetition while maintaining coherence:

```python
def contrastive_search(model, input_ids, alpha=0.6, k=4, max_length=50):
    """
    alpha: parameter to balance confidence and contrastiveness
    k: candidate set size
    """
    generated = input_ids.clone()

    for _ in range(max_length):
        # Get logits
        outputs = model(generated)
        logits = outputs.logits[:, -1, :]

        # Select top-k candidates
        top_k_probs, top_k_indices = torch.topk(F.softmax(logits, dim=-1), k)

        # Calculate contrastive scores
        scores = []
        for i, (prob, token_idx) in enumerate(zip(top_k_probs[0], top_k_indices[0])):
            # Calculate similarity with historical sequence
            similarity = compute_similarity(generated, token_idx)

            # Contrastive score: confidence - similarity penalty
            score = alpha * prob - (1 - alpha) * similarity
            scores.append(score)

        # Select token with highest score
        best_idx = torch.argmax(torch.tensor(scores))
        next_token = top_k_indices[0][best_idx].unsqueeze(0).unsqueeze(0)

        generated = torch.cat([generated, next_token], dim=1)

    return generated
```

#### Typical Sampling

**Core Concept:**
Select tokens with high "typicality" rather than highest probability:

```python
def typical_sampling(logits, tau=0.95, temperature=1.0):
    """
    tau: typicality threshold
    """
    logits = logits / temperature
    probs = F.softmax(logits, dim=-1)

    # Calculate information content -log(p)
    log_probs = F.log_softmax(logits, dim=-1)
    neg_entropy = probs * log_probs
    entropy = -neg_entropy.sum()

    # Calculate typicality of each token
    typical_filter = torch.abs(log_probs + entropy) < tau

    # Filter and renormalize
    filtered_logits = logits.clone()
    filtered_logits[~typical_filter] = float('-inf')

    probs = F.softmax(filtered_logits, dim=-1)
    next_token = torch.multinomial(probs, num_samples=1)

    return next_token
```

## 6.2 Context Understanding and Processing

### 6.2.1 Context Window Concepts and Limitations

**Context Window Definition:**
The maximum sequence length that a model can process in a single forward pass, usually limited by the following factors:

**Technical Limitations:**
- **Attention Mechanism Complexity**: O(n²) computational and memory complexity
- **Position Encoding Range**: Maximum sequence length limitation from pretraining
- **GPU Memory Capacity**: Longer sequences require more memory

**Practical Impact:**
```python
# Context window sizes for different models
context_windows = {
    "GPT-3": 2048,      # ~1500 words
    "GPT-4": 8192,      # ~6000 words
    "GPT-4-32k": 32768, # ~24000 words
    "Claude-2": 100000, # ~75000 words
    "GPT-4-turbo": 128000, # ~96000 words
}
```

**Sliding Window Strategy:**
```python
def sliding_window_generation(text, model, window_size, overlap=256):
    """Process long text with sliding window"""
    tokens = tokenizer.encode(text)
    results = []

    for i in range(0, len(tokens), window_size - overlap):
        chunk = tokens[i:i + window_size]

        # Process current window
        with torch.no_grad():
            output = model.generate(
                torch.tensor([chunk]),
                max_new_tokens=512
            )

        results.append(output)

        # If overlap exists, preserve overlapping part
        if i + window_size >= len(tokens):
            break

    return results
```

### 6.2.2 Challenges and Solutions for Long Sequence Processing

#### Attention Complexity Issues

**Problem Analysis:**
- **Computational Complexity**: O(n²d) where n is sequence length, d is hidden dimension
- **Memory Complexity**: Need to store n×n attention matrix
- **Practical Impact**: Doubling sequence length quadruples computation

**Solution 1: Linear Attention**
```python
class LinearAttention(nn.Module):
    def __init__(self, dim, heads=8):
        super().__init__()
        self.heads = heads
        self.to_qkv = nn.Linear(dim, dim * 3, bias=False)
        self.to_out = nn.Linear(dim, dim)

    def forward(self, x):
        # Project to Q, K, V
        qkv = self.to_qkv(x).chunk(3, dim=-1)
        q, k, v = map(lambda t: rearrange(t, 'b n (h d) -> b h n d', h=self.heads), qkv)

        # Feature mapping function φ(x) = elu(x) + 1
        q = F.elu(q) + 1
        k = F.elu(k) + 1

        # Linear attention computation: O(nd²)
        context = torch.einsum('bhnd,bhne->bhde', k, v)
        out = torch.einsum('bhnd,bhde->bhne', q, context)

        out = rearrange(out, 'b h n d -> b n (h d)')
        return self.to_out(out)
```

**Solution 2: Sparse Attention**
```python
def sparse_attention_pattern(seq_len, pattern_type='local'):
    """Generate sparse attention patterns"""
    if pattern_type == 'local':
        # Local attention: each position only attends to surrounding tokens
        window_size = 64
        mask = torch.zeros(seq_len, seq_len)
        for i in range(seq_len):
            start = max(0, i - window_size // 2)
            end = min(seq_len, i + window_size // 2)
            mask[i, start:end] = 1

    elif pattern_type == 'strided':
        # Strided attention: sample at fixed intervals
        stride = 8
        mask = torch.zeros(seq_len, seq_len)
        for i in range(seq_len):
            mask[i, ::stride] = 1
            mask[i, :min(64, seq_len)] = 1  # Keep first 64 positions

    return mask.bool()
```

#### Position Encoding Extension

**Problem**: Position encodings from pretraining cannot handle longer sequences

**ALiBi Extrapolation Method:**
```python
def get_alibi_slopes(num_heads):
    """Generate ALiBi linear bias slopes"""
    def get_slopes_power_of_2(n):
        start = (2**(-2**-(math.log2(n)-3)))
        ratio = start
        return [start*ratio**i for i in range(n)]

    if math.log2(num_heads).is_integer():
        return get_slopes_power_of_2(num_heads)
    else:
        # Handle non-power-of-2 cases
        closest_power_of_2 = 2**math.floor(math.log2(num_heads))
        return get_slopes_power_of_2(closest_power_of_2) + \
               get_alibi_slopes(2*closest_power_of_2)[0::2][:num_heads-closest_power_of_2]

def apply_alibi_bias(attention_scores, seq_len, num_heads):
    """Apply ALiBi bias"""
    slopes = torch.tensor(get_alibi_slopes(num_heads))

    # Create distance matrix
    position = torch.arange(seq_len).unsqueeze(0)
    distance = position.T - position

    # Apply bias
    bias = slopes.unsqueeze(-1).unsqueeze(-1) * distance.abs()
    attention_scores = attention_scores + bias

    return attention_scores
```

**RoPE Extrapolation Method:**
```python
def extrapolate_rope(base_freq=10000, max_seq_len=2048, target_seq_len=8192):
    """Extend RoPE to longer sequences"""
    # Frequency extrapolation
    scale_factor = target_seq_len / max_seq_len
    adjusted_base_freq = base_freq * scale_factor

    return adjusted_base_freq

def ntk_rope_scaling(dim, max_seq_len, target_seq_len, base=10000):
    """RoPE scaling with Neural Tangent Kernel method"""
    scale = target_seq_len / max_seq_len

    # NTK-aware scaling
    alpha = 2 * math.log(scale) / math.log(2) + 1
    base = base * alpha ** (dim / (dim - 2))

    return base
```

### 6.2.3 Context Relevance Modeling

#### Hierarchical Attention

**Concept**: Different levels of information require different granularities of attention mechanisms

```python
class HierarchicalAttention(nn.Module):
    def __init__(self, config):
        super().__init__()
        # Word-level attention
        self.word_attention = MultiHeadAttention(config.hidden_size, config.num_heads)

        # Sentence-level attention
        self.sentence_attention = MultiHeadAttention(config.hidden_size, config.num_heads)

        # Paragraph-level attention
        self.paragraph_attention = MultiHeadAttention(config.hidden_size, config.num_heads)

        self.level_weights = nn.Parameter(torch.ones(3))

    def forward(self, hidden_states, sentence_boundaries, paragraph_boundaries):
        # Word-level features
        word_output = self.word_attention(hidden_states)

        # Sentence-level feature aggregation
        sentence_features = self.aggregate_by_boundaries(word_output, sentence_boundaries)
        sentence_output = self.sentence_attention(sentence_features)

        # Paragraph-level feature aggregation
        paragraph_features = self.aggregate_by_boundaries(sentence_output, paragraph_boundaries)
        paragraph_output = self.paragraph_attention(paragraph_features)

        # Weighted fusion
        weights = F.softmax(self.level_weights, dim=0)
        final_output = weights[0] * word_output + \
                      weights[1] * sentence_output + \
                      weights[2] * paragraph_output

        return final_output
```

#### Context Relevance Measurement

**Semantic Similarity Calculation:**
```python
def compute_context_relevance(query_embed, context_embeds, method='cosine'):
    """Calculate relevance between query and context parts"""
    if method == 'cosine':
        # Cosine similarity
        similarity = F.cosine_similarity(
            query_embed.unsqueeze(1),
            context_embeds,
            dim=-1
        )
    elif method == 'attention':
        # Attention similarity
        similarity = torch.matmul(query_embed, context_embeds.transpose(-2, -1))
        similarity = similarity / math.sqrt(query_embed.size(-1))
        similarity = F.softmax(similarity, dim=-1)

    return similarity

def adaptive_context_selection(hidden_states, relevance_scores, threshold=0.1):
    """Adaptively select context based on relevance"""
    # Filter low-relevance content
    mask = relevance_scores > threshold

    # Keep high-relevance hidden states
    selected_indices = torch.where(mask)[0]
    selected_states = hidden_states[selected_indices]

    return selected_states, selected_indices
```

## 6.3 Generation Quality Control

### 6.3.1 Solutions for Repetition Problems

#### Repetition Detection Mechanisms

**N-gram Repetition Detection:**
```python
def detect_ngram_repetition(sequence, n=3, max_repeat=2):
    """Detect n-gram repetition patterns"""
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
    """Apply repetition penalty to previously seen tokens"""
    for token_id in set(input_ids.flatten().tolist()):
        logits[..., token_id] /= penalty

    return logits
```

**Sentence-level Repetition Detection:**
```python
class SentenceRepetitionDetector:
    def __init__(self, similarity_threshold=0.85):
        self.threshold = similarity_threshold
        self.sentence_embeddings = []

    def add_sentence(self, sentence, embedding_model):
        """Add new sentence and detect repetition"""
        # Calculate sentence embedding
        new_embedding = embedding_model.encode(sentence)

        # Compare with historical sentences
        for i, past_embedding in enumerate(self.sentence_embeddings):
            similarity = cosine_similarity([new_embedding], [past_embedding])[0][0]

            if similarity > self.threshold:
                return True, i  # Repetition detected

        # Add to history
        self.sentence_embeddings.append(new_embedding)
        return False, -1
```

#### Anti-repetition Strategies

**Coverage Mechanism:**
```python
class CoverageAttention(nn.Module):
    def __init__(self, hidden_size):
        super().__init__()
        self.hidden_size = hidden_size
        self.coverage_proj = nn.Linear(1, hidden_size)

    def forward(self, query, key, value, coverage):
        # Standard attention
        scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(self.hidden_size)

        # Coverage features
        coverage_feature = self.coverage_proj(coverage.unsqueeze(-1))

        # Fuse coverage information
        adjusted_scores = scores + coverage_feature.squeeze(-1)
        attention_weights = F.softmax(adjusted_scores, dim=-1)

        # Update coverage
        new_coverage = coverage + attention_weights.sum(dim=1)

        output = torch.matmul(attention_weights, value)
        return output, attention_weights, new_coverage
```

**Diversity Reward:**
```python
def diversity_reward(generated_sequence, window_size=50):
    """Calculate diversity reward for generated sequence"""
    if len(generated_sequence) < window_size:
        return 0

    # Recent window_size tokens
    recent_tokens = generated_sequence[-window_size:]

    # Calculate unique token ratio
    unique_ratio = len(set(recent_tokens)) / len(recent_tokens)

    # Calculate average mutual information
    token_counts = Counter(recent_tokens)
    entropy = -sum(count/len(recent_tokens) * math.log(count/len(recent_tokens))
                  for count in token_counts.values())

    diversity_score = 0.5 * unique_ratio + 0.5 * entropy / math.log(len(set(recent_tokens)))

    return diversity_score
```

### 6.3.2 Ensuring Text Coherence

#### Local Coherence

**Sentence-internal Consistency Check:**
```python
def check_sentence_coherence(sentence, grammar_checker, semantic_model):
    """Check sentence internal coherence"""
    coherence_score = 0

    # Grammar check
    grammar_errors = grammar_checker.check(sentence)
    grammar_score = max(0, 1 - len(grammar_errors) * 0.1)

    # Semantic consistency
    semantic_score = semantic_model.score_coherence(sentence)

    # Comprehensive scoring
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

        # Predict coherence score at each position
        coherence_scores = torch.sigmoid(self.coherence_head(lstm_out))

        return coherence_scores
```

#### Global Coherence

**Topic Consistency Tracking:**
```python
class TopicCoherenceTracker:
    def __init__(self, topic_model, max_drift=0.3):
        self.topic_model = topic_model
        self.max_drift = max_drift
        self.topic_history = []

    def track_topic_drift(self, new_text):
        """Track topic drift"""
        # Get topic distribution of current text
        current_topics = self.topic_model.get_topic_distribution(new_text)

        if not self.topic_history:
            self.topic_history.append(current_topics)
            return 0, current_topics

        # Calculate difference from historical topics
        recent_avg = np.mean(self.topic_history[-3:], axis=0)
        drift_score = 1 - cosine_similarity([current_topics], [recent_avg])[0][0]

        self.topic_history.append(current_topics)

        return drift_score, current_topics

    def is_drift_acceptable(self, drift_score):
        """Judge if topic drift is acceptable"""
        return drift_score <= self.max_drift
```

**Causal Relationship Check:**
```python
def check_causal_consistency(events, causal_model):
    """Check causal consistency of event sequence"""
    inconsistencies = []

    for i, current_event in enumerate(events):
        # Check prerequisites of current event
        prerequisites = causal_model.get_prerequisites(current_event)

        # Verify if prerequisites are satisfied in previous events
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

### 6.3.3 Ensuring Factual Accuracy

#### Knowledge Retrieval Augmentation

**RAG (Retrieval-Augmented Generation) Implementation:**
```python
class RAGGenerator:
    def __init__(self, retriever, generator, knowledge_base):
        self.retriever = retriever
        self.generator = generator
        self.knowledge_base = knowledge_base

    def generate_with_retrieval(self, query, top_k=5):
        """Generation with retrieval"""
        # 1. Retrieve relevant documents
        relevant_docs = self.retriever.retrieve(query, top_k=top_k)

        # 2. Build augmented input
        context = self.build_context(query, relevant_docs)

        # 3. Generate response
        response = self.generator.generate(context)

        # 4. Fact verification
        verified_response = self.verify_facts(response, relevant_docs)

        return verified_response, relevant_docs

    def build_context(self, query, documents):
        """Build context containing retrieved documents"""
        context = f"Query: {query}\n\nRelevant Information:\n"

        for i, doc in enumerate(documents):
            context += f"{i+1}. {doc['content']}\n"

        context += f"\nBased on the above information, please answer the query:"

        return context
```

**Knowledge Consistency Check:**
```python
class FactChecker:
    def __init__(self, knowledge_graph, fact_verification_model):
        self.kg = knowledge_graph
        self.fact_model = fact_verification_model

    def verify_claim(self, claim):
        """Verify accuracy of single claim"""
        # 1. Extract triples
        triples = self.extract_triples(claim)

        # 2. Verify in knowledge graph
        kg_verification = []
        for triple in triples:
            exists = self.kg.check_triple(triple)
            kg_verification.append((triple, exists))

        # 3. Use fact verification model
        fact_score = self.fact_model.predict(claim)

        return {
            'claim': claim,
            'kg_verification': kg_verification,
            'fact_score': fact_score,
            'is_supported': fact_score > 0.7 and all(v[1] for v in kg_verification)
        }

    def extract_triples(self, text):
        """Extract entity-relation triples from text"""
        # Use NER and relation extraction
        entities = self.ner_model.extract_entities(text)
        relations = self.relation_model.extract_relations(text, entities)

        triples = []
        for relation in relations:
            triple = (relation['subject'], relation['predicate'], relation['object'])
            triples.append(triple)

        return triples
```

#### Uncertainty Quantification

**Knowledge Boundary Identification:**
```python
class UncertaintyQuantifier:
    def __init__(self, model, confidence_threshold=0.8):
        self.model = model
        self.threshold = confidence_threshold

    def estimate_confidence(self, input_text, num_samples=10):
        """Estimate confidence using Monte Carlo dropout"""
        # Enable dropout for inference
        self.model.train()

        outputs = []
        for _ in range(num_samples):
            with torch.no_grad():
                output = self.model(input_text)
                outputs.append(output)

        # Calculate prediction variance
        predictions = torch.stack(outputs)
        mean_pred = predictions.mean(dim=0)
        variance = predictions.var(dim=0)

        # Confidence inversely related to variance
        confidence = 1 / (1 + variance.mean())

        return confidence.item(), mean_pred

    def should_abstain(self, confidence):
        """Judge whether to abstain from answering"""
        return confidence < self.threshold

    def generate_hedge_response(self, confidence, base_response):
        """Generate response with uncertainty expression"""
        if confidence > 0.9:
            return base_response
        elif confidence > 0.7:
            return f"Based on available information, {base_response}"
        elif confidence > 0.5:
            return f"I believe {base_response}, though I'm not entirely certain."
        else:
            return "I'm not confident enough to provide a definitive answer to this question."
```

**Multi-model Ensemble Verification:**
```python
class EnsembleFactChecker:
    def __init__(self, models, voting_strategy='weighted'):
        self.models = models
        self.voting_strategy = voting_strategy

    def ensemble_verification(self, claim):
        """Ensemble multiple models for fact verification"""
        results = []

        for model_name, model in self.models.items():
            result = model.verify(claim)
            results.append({
                'model': model_name,
                'confidence': result['confidence'],
                'prediction': result['prediction'],
                'weight': model.reliability_score
            })

        # Voting decision
        if self.voting_strategy == 'majority':
            final_decision = self.majority_vote(results)
        elif self.voting_strategy == 'weighted':
            final_decision = self.weighted_vote(results)
        else:
            final_decision = self.confidence_based_vote(results)

        return final_decision

    def weighted_vote(self, results):
        """Weighted voting"""
        total_weight = sum(r['weight'] for r in results)
        weighted_confidence = sum(r['confidence'] * r['weight'] for r in results) / total_weight

        # Accept if majority of high-weight models support
        supporting_weight = sum(r['weight'] for r in results if r['prediction'])

        return {
            'prediction': supporting_weight > total_weight / 2,
            'confidence': weighted_confidence,
            'individual_results': results
        }
```