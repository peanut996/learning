# Chapter 4: Core Technical Components of LLMs

## 4.1 Text Preprocessing and Tokenization

### 4.1.1 The Importance of Tokenization
Tokenization is the first step in LLM text processing, converting raw text into numerical representations that models can understand.

**Limitations of Traditional Word Segmentation:**
- **Vocabulary Explosion**: Full word tokenization leads to excessively large vocabularies, especially for morphologically rich languages
- **Out-of-Vocabulary Problem**: Words not seen during training cannot be processed
- **Low-Frequency Word Handling**: Many low-frequency words occupy vocabulary space but receive insufficient training
- **Cross-Language Consistency**: Different languages have vastly different tokenization standards

**Advantages of Subword Segmentation:**
- **Balancing Expressiveness and Efficiency**: Finding a balance between character-level and word-level representation
- **Handling Unknown Words**: Can represent unseen words through subword combinations
- **Alleviating Data Sparsity**: Reduces the number of low-frequency words
- **Cross-Language Unification**: Provides consistent representation methods for multilingual models

### 4.1.2 Main Subword Segmentation Algorithms

**Byte Pair Encoding (BPE):**
- **Core Idea**: Iteratively merge the most frequently occurring character or character sequence pairs
- **Algorithm Flow**:
  1. Initialize: Break all words into character sequences
  2. Count the frequency of adjacent character pairs
  3. Merge the most frequent character pair
  4. Repeat steps 2-3 until reaching the preset vocabulary size
  5. Apply learned merge rules to process new text

**BPE Example:**
```
Initial vocabulary: ["low", "lower", "newest", "widest"]
Character level: ["l o w", "l o w e r", "n e w e s t", "w i d e s t"]

Iteration process:
1. Most frequent pair: "e s" → merge to "es"
2. Most frequent pair: "es t" → merge to "est"
3. Most frequent pair: "l o" → merge to "lo"
...

Final result: ["lo w", "lo w er", "new est", "wid est"]
```

**WordPiece Algorithm:**
- **Core Improvement**: Merges based on language model probability rather than simple frequency
- **Merge Criterion**: Choose character pairs that maximize training data likelihood
- **Formula**:
  ```
  score(x,y) = count(xy) / (count(x) × count(y))
  ```
- **Advantages**: Better preserves linguistic semantic integrity
- **Application**: Used in Google's BERT model

**SentencePiece Algorithm:**
- **Language Independence**: Does not rely on pre-tokenization, directly processes raw text
- **Unified Processing**: Treats spaces as special characters, achieving true end-to-end tokenization
- **Multilingual Support**: Particularly suitable for languages without explicit space separation like Chinese and Japanese
- **Implementation**:
  ```
  Original: "Hello world"
  SentencePiece: ["▁Hello", "▁wor", "ld"]
  (▁ represents original space position)
  ```

### 4.1.3 Vocabulary Construction Strategies

**Vocabulary Size Selection:**
- **Small Vocabulary (8K-16K)**:
  - Advantages: Fewer model parameters, faster training
  - Disadvantages: Increased sequence length, limited expressiveness
- **Medium Vocabulary (32K-64K)**:
  - Balance Point: Achieves balance between efficiency and expressiveness
  - Mainstream Choice: Scale adopted by most LLMs
- **Large Vocabulary (128K+)**:
  - Advantages: Better expressiveness, shorter sequences
  - Disadvantages: Large embedding layer parameters, high computational overhead

**Multilingual Vocabulary Design:**
- **Language Balance**: Ensure adequate representation for all languages
- **Script Coverage**: Cover different writing systems (Latin, Chinese, Arabic, etc.)
- **Sampling Strategy**: Adjust training data sampling ratios based on target language distribution

### 4.1.4 Special Token Handling

**Basic Special Tokens:**
- **[CLS]**: Classification token, usually at sequence beginning, used for classification tasks
- **[SEP]**: Separator token, used to separate different text segments
- **[PAD]**: Padding token, used to align sequences in batches to the same length
- **[UNK]**: Unknown token, represents out-of-vocabulary words
- **[MASK]**: Mask token, used for masked language model training

**Generation Task Special Tokens:**
- **[BOS]/[SOS]**: Beginning of sequence token
- **[EOS]**: End of sequence token
- **[EOD]**: End of document token

**Formatting Tokens:**
```
<|system|>: System prompt information
<|user|>: User input
<|assistant|>: Assistant response
<|endoftext|>: End of text
```

### 4.1.5 Differences Between English and Chinese Tokenization

**English Tokenization Characteristics:**
- **Natural Separation**: Spaces naturally provide word boundary information
- **Morphological Changes**: Need to handle word form variations (run/running/ran)
- **Compound Words**: Need to handle compound word segmentation
- **Abbreviation Processing**: Handle abbreviated forms (don't → do not)

**Chinese Tokenization Challenges:**
- **No Clear Separation**: No natural separators like spaces
- **Ambiguous Segmentation**: The same sentence may have multiple reasonable tokenization methods
  ```
  Example: 研究生命的起源 (studying the origin of life)
  Segmentation 1: 研究 / 生命 / 的 / 起源 (study / life / of / origin)
  Segmentation 2: 研究生 / 命 / 的 / 起源 (graduate student / life / of / origin)
  ```
- **Blurred Word Boundaries**: Unclear boundaries between words and phrases
- **Constantly Emerging New Words**: Rapid emergence of internet slang and technical terms

**Multilingual Unified Solution:**
- **SentencePiece Unified Processing**: Independent of pre-tokenization, unified processing of various languages
- **Character-Level Fallback**: For difficult-to-recognize parts, fall back to character-level processing
- **Context-Aware**: Use contextual information to resolve tokenization ambiguity

## 4.2 Embedding Layers

### 4.2.1 Basic Concepts of Word Embeddings

**Necessity of Embeddings:**
- **Sparse Representation Problem**: One-hot encoding leads to high-dimensional sparse vectors with low computational efficiency
- **Semantic Loss**: One-hot encoding cannot capture semantic relationships between words
- **Dimension Explosion**: Vocabulary size directly determines vector dimension, difficult to scale

**Advantages of Embeddings:**
- **Dense Representation**: Maps sparse vocabulary to dense low-dimensional space
- **Semantic Modeling**: Similar words are closer in embedding space
- **Parameter Efficiency**: Significantly reduces model parameter count
- **Transfer Ability**: Pre-trained embeddings can transfer to downstream tasks

**Mathematical Representation of Embeddings:**
```
one-hot: [0, 0, 1, 0, ..., 0] ∈ ℝ^V (V is vocabulary size)
embedding: [0.2, -0.1, 0.8, ..., 0.3] ∈ ℝ^d (d is embedding dimension)

Embedding matrix: E ∈ ℝ^(V×d)
Embedding lookup: embedding = E[token_id]
```

### 4.2.2 Token Embedding Implementation

**Embedding Layer Design:**
- **Lookup Table Mechanism**: Essentially a large lookup table where each token ID corresponds to a vector
- **Parameter Sharing**: Input and output embedding layers can share parameters to reduce total parameters
- **Initialization Strategies**:
  ```
  # Common initialization methods
  Xavier initialization: weight ~ N(0, 1/sqrt(d))
  He initialization: weight ~ N(0, 2/sqrt(d))
  Uniform distribution: weight ~ U(-sqrt(3/d), sqrt(3/d))
  ```

**Embedding Layer Training:**
- **End-to-End Learning**: Embedding weights are trained together as model parameters
- **Gradient Updates**: Only embedding vectors corresponding to used tokens receive gradient updates
- **Regularization Techniques**:
  - Dropout: Randomly zero out some embedding dimensions
  - Weight Decay: L2 regularization to prevent overfitting
  - Gradient Clipping: Prevent gradient explosion

### 4.2.3 Detailed Analysis of Position Embedding

**Importance of Position Information:**
- **Order Sensitivity**: Natural language is highly dependent on word order
- **Grammatical Structure**: Position information is crucial for parsing grammatical relationships
- **Semantic Differences**: Same words at different positions may have different meanings

**Deep Dive into Absolute Position Encoding:**

**Sinusoidal Position Encoding:**
```
PE(pos, 2i) = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
```

**Design Principle Analysis:**
- **Frequency Decay**: Different dimensions use different frequencies, from high to low
- **Uniqueness Guarantee**: Each position has a unique encoding representation
- **Relative Position Relationship**: Using trigonometric properties, relative positions have fixed linear relationships
- **Extrapolation Capability**: Can handle inputs longer than training sequences

**Learned Position Encoding Comparison:**
```
Advantages:
- Adapts to task-specific position patterns
- Can learn complex position relationships
- Usually better performance within limited length

Disadvantages:
- Cannot extrapolate to longer sequences
- Requires additional parameter storage
- Longer training time
```

**Modern Position Encoding Schemes:**

**Rotary Position Embedding (RoPE):**
- **Core Idea**: Encode position information through rotation matrices in complex space
- **Mathematical Representation**:
  ```
  f_q(x_m, m) = (W_q x_m) ⊗ e^(i m θ)
  f_k(x_n, n) = (W_k x_n) ⊗ e^(i n θ)
  ```
- **Advantages**: Naturally encodes relative position relationships with good extrapolation performance

**ALiBi (Attention with Linear Biases):**
- **Mechanism**: Directly adds linear bias to attention scores
- **Calculation**:
  ```
  attention_score = QK^T + bias_matrix
  bias_matrix[i,j] = -m × |i-j|
  ```
- **Benefits**: Simple and efficient with excellent length extrapolation capability

### 4.2.4 Embedding Dimension Selection Principles

**Dimension Selection Trade-offs:**
- **Expressiveness vs Computational Efficiency**: Higher dimensions provide stronger expressiveness but increase computational cost
- **Overfitting Risk**: Excessively high dimensions may lead to overfitting, especially on small datasets
- **Downstream Task Requirements**: Different tasks have different requirements for representation capability

**Empirical Rules:**
- **Small Models (<100M parameters)**: 128-512 dimensions
- **Medium Models (100M-1B parameters)**: 512-1024 dimensions
- **Large Models (>1B parameters)**: 1024-4096 dimensions or higher

**Relationship Between Dimension and Other Model Components:**
```
Common settings:
d_model = d_embedding
d_ff = 4 × d_model (Feed-Forward hidden layer dimension)
d_head = d_model / num_heads (dimension per attention head)
```

## 4.3 Detailed Attention Mechanisms

### 4.3.1 Complete Self-Attention Computation Process

**Step 1: Linear Transformations**
```python
# Input: X ∈ ℝ^(seq_len × d_model)
Q = X @ W_Q  # Query matrix
K = X @ W_K  # Key matrix
V = X @ W_V  # Value matrix

# Weight matrices: W_Q, W_K, W_V ∈ ℝ^(d_model × d_model)
```

**Step 2: Attention Score Calculation**
```python
# Calculate attention scores
scores = Q @ K.T  # ∈ ℝ^(seq_len × seq_len)

# Scaling factor
scaled_scores = scores / sqrt(d_model)
```

**Step 3: Mask Application (if needed)**
```python
# Causal mask (for GPT and other decoder-only models)
mask = torch.triu(torch.ones(seq_len, seq_len), diagonal=1)
masked_scores = scaled_scores.masked_fill(mask == 1, -inf)
```

**Step 4: Softmax Normalization**
```python
attention_weights = softmax(masked_scores, dim=-1)
# Ensure each row sums to 1, representing probability distribution
```

**Step 5: Weighted Aggregation**
```python
output = attention_weights @ V  # ∈ ℝ^(seq_len × d_model)
```

### 4.3.2 Design Principles of Scaled Dot-Product Attention

**Necessity of Scaling Factor:**
- **Gradient Stability**: Prevents softmax function from entering saturation region causing gradient vanishing
- **Numerical Stability**: Avoids numerical overflow caused by excessively large dot products
- **Theoretical Analysis**:
  ```
  Assuming q_i, k_j are independent and identically distributed with mean 0, variance 1
  Then variance of q_i · k_j is d_k
  After scaling, variance becomes 1, maintaining numerical stability
  ```

**Properties of Attention Distribution:**
- **Sparsity**: After softmax, attention typically concentrates on a few relevant positions
- **Smoothness**: Temperature parameter (here √d_k) controls distribution smoothness
- **Interpretability**: Attention weights provide intuitive explanation of model decisions

### 4.3.3 Parallel Implementation of Multi-Head Attention

**Parallel Computation Implementation Tricks:**
```python
# Traditional implementation (serial)
outputs = []
for head in range(num_heads):
    Q_h = Q @ W_Q[head]
    K_h = K @ W_K[head]
    V_h = V @ W_V[head]
    output_h = attention(Q_h, K_h, V_h)
    outputs.append(output_h)
concat_output = concat(outputs)

# Efficient implementation (parallel)
# Concatenate weight matrices of all heads
W_Q_all = concat([W_Q[0], W_Q[1], ..., W_Q[h-1]], dim=1)
Q_all = X @ W_Q_all  # Single matrix multiplication for all heads' Q

# Reshape to multi-head format
Q_heads = Q_all.reshape(batch_size, seq_len, num_heads, d_head)
Q_heads = Q_heads.transpose(1, 2)  # (batch, num_heads, seq_len, d_head)
```

**Memory Efficiency Optimizations:**
- **Flash Attention**: Reduces memory usage through block computation
- **Gradient Checkpointing**: Trades computation for memory by recomputing forward pass
- **Mixed Precision Training**: Uses FP16 to reduce memory footprint

### 4.3.4 Attention Weight Visualization and Interpretation

**Attention Heatmaps:**
- **X-axis**: Token positions in input sequence
- **Y-axis**: Token positions in output sequence (or same sequence for self-attention)
- **Color Intensity**: Magnitude of attention weights

**Attention Patterns in Different Layers:**
- **Shallow Layers**: Mainly focus on local grammatical relationships (adjacent words)
- **Middle Layers**: Capture medium-distance semantic relationships
- **Deep Layers**: Model long-distance dependencies and high-level semantic relationships

**Attention Head Specialization:**
Analysis of actually trained models reveals:
- **Syntactic Heads**: Focus on subject-verb-object grammatical relationships
- **Coreference Heads**: Handle pronoun reference and noun mention
- **Positional Heads**: Mainly attend to relative position information
- **Semantic Heads**: Capture semantic similarity and topic relevance

**Limitations of Attention Interpretation:**
- **Causality Issues**: High attention weights don't necessarily indicate causal relationships
- **Multi-Head Aggregation**: Single head interpretation may be incomplete
- **Non-Linear Transformations**: Subsequent FFN layers further transform attention output
- **Training Dynamics**: Attention patterns constantly change during training

**Practical Attention Analysis Methods:**
```python
# Attention weight statistics
def analyze_attention_patterns(attention_weights):
    # attention_weights: (batch, num_heads, seq_len, seq_len)

    # Calculate attention locality (degree of focusing on adjacent tokens)
    locality_score = compute_locality_bias(attention_weights)

    # Calculate attention dispersion
    entropy = compute_attention_entropy(attention_weights)

    # Identify key attention connections
    important_connections = find_important_attention_links(attention_weights)

    return {
        'locality': locality_score,
        'entropy': entropy,
        'key_connections': important_connections
    }
```