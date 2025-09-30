# Chapter 5: LLM Training Process

## 5.1 Pretraining

### 5.1.1 Goals and Significance of Pretraining

**Core Goals of Pretraining:**
- **Language Representation Learning**: Learn general language representations from large amounts of unlabeled text
- **Knowledge Acquisition**: Encode human knowledge into model parameters
- **Pattern Recognition**: Learn statistical patterns and structures of language
- **Transfer Capability Development**: Provide powerful initialization parameters for downstream tasks

**Important Significance of Pretraining:**

**Breaking Data Bottlenecks:**
- **Abundant Unlabeled Data**: Vast amounts of unlabeled text data available on the internet
- **Reduced Annotation Dependency**: Avoids the cost of separately annotating large amounts of data for each task
- **Strong Generalizability**: One pretraining can serve multiple downstream tasks

**Knowledge Accumulation and Transfer:**
- **World Knowledge Learning**: Learn factual knowledge from Wikipedia, news, books, etc.
- **Common Sense Reasoning**: Learn common sense knowledge from daily life
- **Professional Knowledge**: Exposure to professional terminology and concepts from various domains
- **Cross-Task Transfer**: Transfer learned knowledge to new tasks

**Emergence of Language Capabilities:**
- **Grammar Understanding**: Learn grammatical rules and syntactic structures of language
- **Semantic Understanding**: Understand meanings of words, phrases, and sentences
- **Context Modeling**: Learn long-distance dependencies and contextual relationships
- **Reasoning Abilities**: Reasoning capabilities emerge during large-scale pretraining

### 5.1.2 Language Modeling Tasks

**Autoregressive Language Modeling:**

**Basic Principle:**
```
P(x1, x2, ..., xn) = ∏(i=1 to n) P(xi | x1, x2, ..., xi-1)
```

**Training Objective:**
- **Next Word Prediction**: Given context, predict the probability distribution of the next word
- **Maximum Likelihood Estimation**: Maximize the log-likelihood of training data
- **Mathematical Representation**:
```
L = -∑(i=1 to N) log P(xi | x<i; θ)
```

**GPT Series Approach:**
- **Causal Masking**: Ensures the model can only see information before the current position
- **Teacher Forcing**: Uses true sequences during training, autoregressive generation during inference
- **Advantages**: Naturally suitable for text generation tasks
- **Limitations**: Can only utilize unidirectional context information

**Bidirectional Language Modeling:**

**BERT's Masked Language Model (MLM):**
- **Basic Idea**: Randomly mask some tokens in the input and predict the masked content
- **Masking Strategy**:
```
Randomly select 15% of tokens:
- 80% replace with [MASK]
- 10% replace with random token
- 10% keep unchanged
```
- **Training Objective**:
```
L = -∑(i∈M) log P(xi | x\M; θ)
```
where M is the set of masked positions

**Advantages and Limitations:**
- **Advantages**: Can utilize bidirectional context information, better language understanding capability
- **Limitations**: Inconsistent input forms between pretraining and fine-tuning stages (pretraining-fine-tuning gap)

### 5.1.3 Improvements to Masked Language Models

**ELECTRA's Replaced Token Detection:**
- **Core Idea**: Instead of predicting masked tokens, judge whether each token has been replaced
- **Generator-Discriminator Architecture**:
```
Generator: Small MLM model that generates replacement tokens
Discriminator: Judges whether each position's token is the original token
```
- **Advantages**: All positions participate in training, improving sample efficiency

**RoBERTa's Optimization Strategies:**
- **Remove NSP Task**: Found that Next Sentence Prediction provides limited performance improvement
- **Dynamic Masking**: Use different masking patterns for each epoch
- **Longer Training**: Use more data and longer training time
- **Larger Batches**: Increase batch size to improve training stability

**DeBERTa's Decoupled Attention:**
- **Position Information Separation**: Process content and position information separately
- **Relative Position Encoding**: Use relative positions instead of absolute positions
- **Enhanced Mask Decoder**: Better integrate position information during fine-tuning

### 5.1.4 Training Data Scale and Quality Requirements

**Data Scale Requirements:**

**Relationship Between Parameter Scale and Data Volume:**
- **Empirical Rule**: Data volume is typically 20-100 times the parameter count
- **Specific Examples**:
```
GPT-3 (175B parameters): ~300B tokens
GPT-4 (estimated >1T parameters): >13T tokens
PaLM (540B parameters): ~780B tokens
```

**Scaling Laws:**
- **Chinchilla Rule**: For a given compute budget, should balance model size and training data volume
- **Optimal Ratio**: Each parameter needs approximately 20 tokens of training data
- **Compute Budget Allocation**:
```
Optimal model size ∝ (compute budget)^0.5
Optimal data volume ∝ (compute budget)^0.5
```

**Data Quality Requirements:**

**Data Source Diversity:**
- **Web Text**: Common Crawl, Web crawls (60-70%)
- **Books and Literature**: Books1, Books2, Project Gutenberg (10-15%)
- **Academic Literature**: ArXiv, PubMed papers (5-10%)
- **News Articles**: News websites, RSS feeds (5-10%)
- **Reference Materials**: Wikipedia, encyclopedias (2-5%)
- **Code Repositories**: GitHub, StackOverflow (5-10%)

**Data Cleaning Strategies:**

**Content Filtering:**
```python
# Common data cleaning steps
def clean_text_data(raw_text):
    # 1. Language detection and filtering
    if not is_target_language(raw_text):
        return None

    # 2. Quality scoring
    quality_score = compute_quality_score(raw_text)
    if quality_score < threshold:
        return None

    # 3. Deduplication
    if is_duplicate(raw_text):
        return None

    # 4. Privacy information filtering
    filtered_text = remove_pii(raw_text)

    # 5. Harmful content filtering
    if contains_harmful_content(filtered_text):
        return None

    return filtered_text
```

**Quality Metrics:**
- **Language Quality**: Grammatical correctness, spelling error rate
- **Information Density**: Proportion of meaningful content
- **Duplication Level**: Avoid large amounts of repetitive content
- **Diversity**: Diversity in topics, styles, and sources

### 5.1.5 Computational Resources and Hardware Requirements

**Hardware Architecture Selection:**

**GPU Clusters:**
- **Mainstream Choice**: NVIDIA A100, H100 GPUs
- **Memory Requirements**:
```
Parameter storage: 4 bytes per parameter (FP32) or 2 bytes (FP16)
Gradient storage: Same size as parameters
Optimizer state: Adam requires 2-3x parameter size

Total memory requirement ≈ parameter count × (4-8) bytes
```
- **Practical Examples**:
```
7B parameter model: requires ~56-112GB memory
175B parameter model: requires ~1.4-2.8TB memory
```

**Distributed Training Strategies:**

**Data Parallelism:**
- **Principle**: Each GPU maintains complete model copy, processes different data batches
- **Communication Requirements**: Need to synchronize gradients, communication volume equals parameter count
- **Applicable Scenarios**: When model fits in single GPU

**Model Parallelism:**
- **Tensor Parallelism**: Distribute single operations across multiple GPUs
```python
# Tensor parallelism example for linear layer
# Original: Y = XW
# Split W into W1, W2: Y = [XW1, XW2]
```
- **Pipeline Parallelism**: Distribute different layers across different GPUs
- **Applicable Scenarios**: When model is too large for single GPU

**3D Parallelism:**
- **Combine Three Parallel Strategies**: Data parallelism + Tensor parallelism + Pipeline parallelism
- **DeepSpeed ZeRO**: Zero Redundancy Optimizer, reduces memory usage
- **Megatron-LM**: NVIDIA's large-scale parallel training framework

**Training Time Estimation:**

**Computational Analysis:**
```
FLOPs per token ≈ 6 × N (N is parameter count)
Total FLOPs = 6 × N × D (D is training data token count)

Training time = Total FLOPs / (GPU count × Per-GPU compute × Utilization)
```

**Real-world Example:**
```
GPT-3 training:
- Parameters: 175B
- Training data: 300B tokens
- Total compute: 3.14×10^23 FLOPS
- Hardware: ~1000 V100 GPUs
- Training time: ~34 days
```

**Cost Estimation:**
- **Cloud Computing Cost**: AWS p4d.24xlarge ~$32/hour
- **GPT-3 Level Model**: Estimated training cost $4-10M
- **Open Source Alternatives**: Use academic resources and open source tools to reduce costs

## 5.2 Fine-tuning

### 5.2.1 Supervised Fine-tuning

**Basic Principles of Fine-tuning:**
- **Parameter Initialization**: Use pretrained model parameters as initialization
- **Task Adaptation**: Continue training on task-specific data
- **Learning Rate Setting**: Usually use smaller learning rates to avoid catastrophic forgetting
- **Freezing Strategy**: Can choose to freeze some layers, only train top layers

**Full Parameter Fine-tuning vs Parameter-Efficient Fine-tuning:**

**Full Parameter Fine-tuning:**
```python
# Full fine-tuning pseudocode
for batch in task_dataloader:
    # Forward pass
    logits = model(batch.input_ids)
    loss = criterion(logits, batch.labels)

    # Backward pass, update all parameters
    loss.backward()
    optimizer.step()  # Update all model parameters
    optimizer.zero_grad()
```

**Parameter-Efficient Fine-tuning Methods:**

**LoRA (Low-Rank Adaptation):**
- **Core Idea**: Add low-rank matrices on top of pretrained parameters
- **Mathematical Representation**:
```
W' = W + BA
where B ∈ ℝ^(d×r), A ∈ ℝ^(r×k), r << min(d,k)
```
- **Advantages**: Only need to train few parameters (usually <1%), significantly reduce computation and storage requirements
- **Implementation**:
```python
# LoRA layer implementation
class LoRALayer(nn.Module):
    def __init__(self, in_features, out_features, rank=4):
        self.lora_A = nn.Linear(in_features, rank, bias=False)
        self.lora_B = nn.Linear(rank, out_features, bias=False)
        self.scaling = rank ** -0.5

    def forward(self, x):
        return self.lora_B(self.lora_A(x)) * self.scaling
```

**Adapter Methods:**
- **Structure**: Insert small feedforward networks between Transformer layers
- **Design Principle**:
```
Adapter(x) = x + Down(ReLU(Up(LayerNorm(x))))
```
- **Advantages**: Keep original model unchanged, only train adapter parameters

**Prefix Tuning:**
- **Method**: Only train input prefix embeddings, freeze model parameters
- **Applicable Scenarios**: Particularly suitable for generation tasks
- **Simple Implementation**: Add trainable prefix tokens before input

### 5.2.2 Task-Specific Data Preparation

**Data Formatting Strategies:**

**Classification Task Data Format:**
```python
# Text classification data example
{
    "text": "This movie is really great, the actors performed excellently, and the plot is engaging.",
    "label": "positive",
    "metadata": {
        "domain": "movie_review",
        "source": "imdb"
    }
}
```

**Generation Task Data Format:**
```python
# QA task data example
{
    "instruction": "Please answer the following question",
    "input": "What is machine learning?",
    "output": "Machine learning is a branch of artificial intelligence that enables computers to automatically learn and improve from data through algorithms, without being explicitly programmed.",
    "task_type": "qa"
}
```

**Multi-turn Dialogue Data Format:**
```python
# Dialogue data example
{
    "conversation": [
        {
            "role": "user",
            "content": "How's the weather today?"
        },
        {
            "role": "assistant",
            "content": "I cannot access real-time weather information. I recommend checking weather apps or websites for accurate weather forecasts."
        },
        {
            "role": "user",
            "content": "Can you recommend some good weather apps?"
        }
    ]
}
```

**Data Augmentation Techniques:**

**Text Data Augmentation:**
- **Back Translation**: Text→Foreign Language→Back Translation, increase expression diversity
- **Synonym Replacement**: Use synonym dictionaries for vocabulary substitution
- **Sentence Restructuring**: Change sentence structure while preserving semantics
- **Noise Injection**: Add spelling errors, punctuation changes, etc.

**Quality Control:**
```python
def quality_check(sample):
    checks = [
        is_language_correct(sample['text']),
        is_label_valid(sample['label']),
        is_length_appropriate(sample['text']),
        is_content_appropriate(sample['text'])
    ]
    return all(checks)
```

### 5.2.3 Learning Rate Scheduling and Hyperparameter Optimization

**Learning Rate Scheduling Strategies:**

**Linear Decay Scheduling:**
```python
def linear_schedule(current_step, total_steps, peak_lr, min_lr=0):
    if current_step < warmup_steps:
        # Warmup phase
        return peak_lr * current_step / warmup_steps
    else:
        # Linear decay phase
        progress = (current_step - warmup_steps) / (total_steps - warmup_steps)
        return peak_lr * (1 - progress) + min_lr * progress
```

**Cosine Annealing Scheduling:**
```python
def cosine_schedule(current_step, total_steps, peak_lr, min_lr=0):
    if current_step < warmup_steps:
        return peak_lr * current_step / warmup_steps
    else:
        progress = (current_step - warmup_steps) / (total_steps - warmup_steps)
        return min_lr + (peak_lr - min_lr) * (1 + cos(π * progress)) / 2
```

**AdamW Optimizer Configuration:**
```python
# Recommended AdamW configuration
optimizer = AdamW(
    model.parameters(),
    lr=5e-5,            # Base learning rate
    betas=(0.9, 0.999), # Momentum parameters
    eps=1e-8,           # Numerical stability
    weight_decay=0.01,   # Weight decay
    correct_bias=True    # Bias correction
)
```

**Key Hyperparameter Selection:**

**Learning Rate Range:**
- **Full Parameter Fine-tuning**: 1e-5 to 5e-5
- **LoRA Fine-tuning**: 1e-4 to 1e-3
- **Selection Principle**: Larger models use smaller learning rates

**Batch Size:**
- **Gradient Accumulation**: Use when GPU memory is insufficient
- **Effective Batch Size**: batch_size × gradient_accumulation_steps
- **Recommended Range**: 16-128 samples

**Training Epochs:**
- **Small Datasets**: 10-50 epochs
- **Large Datasets**: 2-5 epochs
- **Early Stopping Strategy**: Monitor validation set performance to prevent overfitting

### 5.2.4 Overfitting Prevention Strategies

**Regularization Techniques:**

**Dropout Strategy:**
```python
# Dropout rate settings for different components
config = {
    "attention_dropout": 0.1,    # Attention weight dropout
    "hidden_dropout": 0.1,       # Hidden layer dropout
    "embedding_dropout": 0.1,    # Embedding layer dropout
    "classifier_dropout": 0.3    # Classifier dropout (usually higher)
}
```

**Weight Decay:**
- **L2 Regularization**: Add penalty term for weight squared sum
- **Selective Application**: Usually not applied to bias and LayerNorm parameters
- **Decay Rate Selection**: 0.01-0.1 range

**Data-Related Strategies:**

**Validation Set Split:**
```python
# Dataset split example
train_size = int(0.8 * len(dataset))
val_size = int(0.1 * len(dataset))
test_size = len(dataset) - train_size - val_size

train_data, val_data, test_data = random_split(
    dataset, [train_size, val_size, test_size]
)
```

**Cross Validation:**
- **K-Fold Cross Validation**: Particularly suitable for small datasets
- **Stratified Sampling**: Ensure uniform distribution of categories across folds
- **Time Series Data**: Use time-sensitive split methods

**Early Stopping and Checkpoints:**
```python
# Early stopping implementation
class EarlyStopping:
    def __init__(self, patience=7, min_delta=0):
        self.patience = patience
        self.min_delta = min_delta
        self.counter = 0
        self.best_score = None

    def __call__(self, val_score):
        if self.best_score is None:
            self.best_score = val_score
        elif val_score < self.best_score + self.min_delta:
            self.counter += 1
            if self.counter >= self.patience:
                return True
        else:
            self.best_score = val_score
            self.counter = 0
        return False
```

## 5.3 Advanced Training Techniques

### 5.3.1 Reinforcement Learning from Human Feedback (RLHF)

**Complete RLHF Pipeline:**

**Stage 1: Supervised Fine-tuning (SFT):**
- **Goal**: Supervised learning on high-quality instruction-response pairs
- **Data Requirements**: High-quality dialogue data with human annotations
- **Training Objective**: Maximize conditional probability P(response|instruction)

**Stage 2: Reward Model Training:**
- **Data Collection**: Let SFT model generate multiple responses, human ranking
- **Model Architecture**: Usually use same model as SFT, but output scalar reward scores
- **Training Objective**:
```
L_reward = -E[(r(x,y_chosen) - r(x,y_rejected))]
```
where r(x,y) is the reward model output

**Stage 3: PPO Reinforcement Learning:**
- **Objective Function**:
```
L_PPO = E[min(r(θ)A, clip(r(θ), 1-ε, 1+ε)A)]
where r(θ) = π_θ(y|x) / π_θ_old(y|x)
```
- **KL Divergence Constraint**: Prevent new policy from deviating too far from original model
- **Complete Objective**:
```
L = L_PPO + β × KL(π_θ || π_SFT)
```

**Key Technical Details in RLHF:**

**Reward Model Design:**
```python
class RewardModel(nn.Module):
    def __init__(self, base_model):
        super().__init__()
        self.base_model = base_model
        self.reward_head = nn.Linear(base_model.config.hidden_size, 1)

    def forward(self, input_ids, attention_mask):
        outputs = self.base_model(input_ids, attention_mask)
        # Use last token's hidden state
        last_hidden_state = outputs.last_hidden_state[:, -1, :]
        reward = self.reward_head(last_hidden_state)
        return reward
```

**PPO Training Challenges:**
- **Reward Hacking**: Model may learn to deceive the reward model
- **Training Instability**: RL training is more unstable than supervised learning
- **High Computational Overhead**: Need to maintain multiple model copies simultaneously

### 5.3.2 Instruction Tuning

**Core Philosophy of Instruction Tuning:**
- **Unified Format**: Unify various tasks into instruction-input-output format
- **Generalization Capability**: Improve model's understanding and execution of new instructions
- **Zero-shot Performance**: Execute new tasks without task-specific fine-tuning

**Instruction Data Construction:**

**Task Diversity:**
```python
# Instruction template examples
instruction_templates = {
    "classification": [
        "Classify the following text into {categories}",
        "Which category does this text belong to: {categories}",
        "Please determine the category of the following content"
    ],
    "generation": [
        "Generate {content_type} based on the following description",
        "Please create a {content_type} about {topic}",
        "Continue the following content"
    ],
    "qa": [
        "Answer the following question",
        "Answer the question based on given information",
        "Please explain {concept}"
    ]
}
```

**Negative Sample Construction:**
- **Refusal to Answer**: Learn to refuse inappropriate or beyond-capability requests
- **Clarification Queries**: Learn to seek clarification for ambiguous instructions
- **Safety Boundaries**: Learn to identify and refuse harmful requests

**Chain-of-Thought (CoT) Training:**
```python
# CoT training data example
{
    "instruction": "Solve this math problem",
    "input": "Tom has 15 apples, gave 3 to Mary, then bought 8 more. How many does he have now?",
    "output": "Let me calculate step by step:\n1. Tom initially had 15 apples\n2. After giving 3 to Mary: 15 - 3 = 12 apples\n3. After buying 8 more: 12 + 8 = 20 apples\nSo Tom now has 20 apples."
}
```

### 5.3.3 Alignment Techniques

**Multiple Dimensions of Alignment:**

**Helpfulness:**
- **Task Completion Capability**: Accurately understand and execute user instructions
- **Information Accuracy**: Provide correct, up-to-date information
- **Response Completeness**: Give comprehensive and relevant answers

**Harmlessness:**
- **Content Safety**: Avoid generating harmful, violent, discriminatory content
- **Privacy Protection**: Do not leak personal privacy information
- **Legal Compliance**: Comply with relevant laws and regulations

**Honesty:**
- **Knowledge Boundaries**: Acknowledge what is not known
- **Uncertainty Expression**: Appropriately express uncertainty
- **Avoid Hallucination**: Reduce generation of false information

**Constitutional AI Method:**
- **Self-Critique**: Let model evaluate its own output
- **Self-Correction**: Improve responses based on critique
- **Recursive Improvement**: Multi-round self-improvement process

### 5.3.4 In-Context Learning (ICL)

**ICL Working Mechanism:**

**Few-shot Learning:**
```python
# Few-shot prompting example
prompt = """
Please translate the following sentences to English:

Chinese: 今天天气很好。
English: The weather is nice today.

Chinese: 我喜欢读书。
English: I like reading books.

Chinese: 这个问题很复杂。
English: """
```

**Key Factors in ICL:**

**Example Selection Strategies:**
- **Similarity Selection**: Choose examples most similar to target task
- **Diversity Balance**: Ensure examples cover different situations
- **Quality Control**: Use high-quality examples
- **Order Effects**: Order of examples affects performance

**Prompt Engineering Techniques:**
```python
# Structured prompt template
def create_prompt(task_description, examples, query):
    prompt = f"Task: {task_description}\n\n"

    for i, (input_text, output_text) in enumerate(examples, 1):
        prompt += f"Example {i}:\nInput: {input_text}\nOutput: {output_text}\n\n"

    prompt += f"Now please process:\nInput: {query}\nOutput: "
    return prompt
```

**Theoretical Understanding of ICL:**
- **Gradient Update Simulation**: ICL may simulate gradient descent process
- **Pattern Matching**: Learn input-output mapping patterns through examples
- **Meta-Learning**: Learn the ability to learn during pretraining