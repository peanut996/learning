# Chapter 3: Transformer Architecture Deep Dive

## 3.1 Transformer Design Principles

### 3.1.1 Core Concepts of Self-Attention Mechanism
Self-Attention is the core innovation of Transformer, fundamentally changing the way sequence modeling is performed.

**Problems with Traditional Sequence Modeling:**
- **Sequential Dependency**: RNN/LSTM must process sequentially, cannot be parallelized
- **Long-range Dependency Decay**: Information gradually lost in long sequences
- **Computational Bottleneck**: Hidden states become bottlenecks for information transfer

**Self-Attention Solutions:**
- **Direct Relationship Modeling**: Any two positions can directly compute correlation
- **Parallel Computation**: All positions can be processed simultaneously, greatly improving efficiency
- **Dynamic Weights**: Dynamically assign attention weights based on content

**Mathematical Definition of Self-Attention:**
```
Attention(Q,K,V) = softmax(QK^T/√dk)V
```
Where:
- Q (Query): Query matrix, representing "what I want to attend to"
- K (Key): Key matrix, representing "what information I can provide"
- V (Value): Value matrix, representing "what content I actually contain"
- dk: Dimension of key vectors, used for scaling to prevent gradient vanishing

**Detailed Computation Process:**
1. **Linear Transformation**: Input X gets Q, K, V through three different weight matrices
   ```
   Q = XWQ,  K = XWK,  V = XWV
   ```

2. **Similarity Computation**: Calculate similarity between each query and all keys
   ```
   scores = QK^T/√dk
   ```

3. **Normalization**: Use softmax to convert similarities to probability distribution
   ```
   weights = softmax(scores)
   ```

4. **Weighted Sum**: Weighted average of values based on weights
   ```
   output = weights × V
   ```

**Advantages of Self-Attention:**
- **Global Receptive Field**: Each position can directly access any position in the sequence
- **Computational Complexity**: For sequence length n, complexity is O(n²), better than RNN's O(n) for short sequences
- **Interpretability**: Attention weights provide intuitive interpretability
- **Position Independence**: Breaks the mandatory sequential constraint of positions

### 3.1.2 Advantages of Parallel Processing
Transformer's parallelization capability is a major advantage over RNN/LSTM.

**Serial Computation Limitations of RNN:**
```
h1 = f(x1, h0)
h2 = f(x2, h1)  # Must wait for h1 computation to complete
h3 = f(x3, h2)  # Must wait for h2 computation to complete
...
```

**Parallel Computation of Transformer:**
```
# All positions can be computed simultaneously
output1, output2, ..., outputn = Attention(Q, K, V)
```

**Specific Advantages of Parallelization:**
- **Training Acceleration**: Can fully utilize GPU's parallel computing capabilities
- **Memory Efficiency**: Avoids the need to save all intermediate states as in RNN
- **Gradient Flow**: Gradients from all positions can backpropagate directly, avoiding gradient vanishing
- **Hardware Friendly**: Matrix operations are more suitable for modern GPU architectures

**Computational Efficiency Comparison:**
- **RNN Training Time**: O(n) × sequence length (serial)
- **Transformer Training Time**: O(1) (parallel, limited by memory)
- **Actual Speedup**: Can achieve 10-100x training acceleration on modern GPUs

### 3.1.3 Encoder-Decoder Architecture
The original Transformer adopts the classic Encoder-Decoder architecture, providing a flexible framework for different tasks.

**Overall Architecture Overview:**
```
Input → Encoder → Context Representation → Decoder → Output
```

**Role of Encoder:**
- **Feature Extraction**: Encode input sequences into high-dimensional representations
- **Context Modeling**: Capture dependencies within input sequences
- **Multi-layer Stacking**: Progressively abstract features through multiple encoder layers

**Role of Decoder:**
- **Sequence Generation**: Generate target sequences based on encoder outputs
- **Autoregressive Generation**: Each generation step depends on previously generated content
- **Conditional Generation**: Combine encoder information for conditional generation

**Information Flow in Encoder-Decoder:**
1. **Encoding Phase**: Encoder processes complete input sequence
2. **Interaction Phase**: Decoder accesses Encoder outputs through Cross-Attention
3. **Decoding Phase**: Decoder autoregressively generates output sequence

**Application Scenarios:**
- **Machine Translation**: Source language → Target language
- **Text Summarization**: Long text → Summary
- **Question Answering**: Question + Document → Answer
- **Code Generation**: Natural language → Code

## 3.2 Key Component Analysis

### 3.2.1 Multi-Head Attention
Multi-Head Attention is an enhanced version of Self-Attention that learns different types of relationships through multiple "heads" in parallel.

**Limitations of Single-Head Attention:**
- **Limited Expressiveness**: Single attention mechanism may only capture one type of relationship
- **Information Bottleneck**: All information passes through the same attention channel

**Multi-Head Design Philosophy:**
- **Parallel Multi-heads**: Use h different attention heads working simultaneously
- **Division of Labor**: Each head can focus on learning different types of dependency relationships
- **Information Fusion**: Concatenate outputs from multiple heads and apply linear transformation

**Mathematical Representation:**
```
MultiHead(Q,K,V) = Concat(head1, head2, ..., headh)WO

Where: headi = Attention(QWiQ, KWiK, VWiV)
```

**Specific Computation Steps:**
1. **Projection and Division**: Project Q, K, V to h subspaces respectively
   ```
   Qi = QWiQ,  Ki = KWiK,  Vi = VWiV
   Dimensions: d_model → d_model/h
   ```

2. **Parallel Computation**: Each head independently computes attention
   ```
   headi = Attention(Qi, Ki, Vi)
   ```

3. **Concatenation and Fusion**: Concatenate outputs from all heads
   ```
   MultiHead = Concat(head1, ..., headh)
   ```

4. **Output Projection**: Get final output through linear layer
   ```
   Output = MultiHead × WO
   ```

**Examples of Different Head Specializations:**
- **Head 1**: Focus on syntactic relationships (subject-verb-object structure)
- **Head 2**: Focus on semantic relationships (synonyms, antonyms)
- **Head 3**: Focus on long-range dependencies (pronoun references)
- **Head 4**: Focus on local patterns (phrase structures)

**Hyperparameter Selection:**
- **Number of Heads (h)**: Usually 8 or 16, too many leads to parameter redundancy
- **Head Dimension (dk)**: Usually set to d_model/h, maintaining parameter balance
- **Rule of Thumb**: h × dk = d_model, ensuring parameter efficiency

### 3.2.2 Position Encoding
Since Self-Attention is inherently position-agnostic, additional mechanisms are needed to model positional information.

**Importance of Positional Information:**
- **Word Order Sensitivity**: Natural language meaning heavily depends on word order
- **Syntactic Structure**: Positional information is crucial for understanding grammatical relationships
- **Temporal Modeling**: Many tasks require understanding the temporal order of events

**Absolute Position Encoding (Original Transformer):**
Uses trigonometric functions to encode absolute positions:
```
PE(pos, 2i) = sin(pos/10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos/10000^(2i/d_model))
```

**Design Advantages:**
- **Fixed Pattern**: No learning required, reduces parameter count
- **Extrapolation Capability**: Can handle sequence lengths not seen during training
- **Relative Positions**: Encodings of different positions have fixed linear relationships

**Learned Position Encoding:**
- **Learnable Parameters**: Position encodings as trainable parameters
- **Strong Adaptability**: Can learn task-specific positional patterns
- **Limitation**: Difficult to extrapolate to longer sequences

**Relative Position Encoding:**
Modern variants increasingly use relative position encoding:
- **Relative Relationships**: Focus on relative distance between position i and position j
- **Rotary Position Embedding (RoPE)**: Efficient encoding method used by GPT and other models
- **ALiBi**: Linear bias position encoding method

**Position Encoding Injection Methods:**
- **Additive Injection**: PE + Token Embedding (original method)
- **Concatenative Injection**: Concat(Token Embedding, PE)
- **Multiplicative Injection**: Token Embedding ⊗ PE

### 3.2.3 Feed-Forward Networks
Each Transformer layer contains a feed-forward network responsible for non-linear transformations and feature extraction.

**FFN Structure:**
```
FFN(x) = max(0, xW1 + b1)W2 + b2
```
I.e.: Linear layer → ReLU activation → Linear layer

**Specific Implementation:**
1. **Dimension Expansion**: d_model → d_ff (usually d_ff = 4 × d_model)
2. **Activation Function**: ReLU or GELU introduces non-linearity
3. **Dimension Compression**: d_ff → d_model

**Role of FFN:**
- **Non-linear Transformation**: Introduces complex non-linear transformation capabilities
- **Feature Extraction**: Learns position-specific feature transformations
- **Information Processing**: Further processes outputs from attention mechanism
- **Expression Enhancement**: Increases model's expressive power and capacity

**Activation Function Selection:**
- **ReLU**: Used in original Transformer, simple and efficient
- **GELU**: Commonly used in modern LLMs, smoother activation function
- **SwiGLU**: Used in some latest models, better performance

**Dimension Selection Principles:**
- **Expansion Ratio**: d_ff is usually 4 times d_model
- **Computational Balance**: Balance between expressive power and computational cost
- **Rule of Thumb**: Larger d_ff can improve model capacity but increases computational cost

### 3.2.4 Layer Normalization
Layer Normalization is a key component for stable Transformer training.

**Necessity of Normalization:**
- **Gradient Stability**: Prevent gradient explosion or vanishing
- **Training Acceleration**: Speed up convergence
- **Numerical Stability**: Maintain activation values within reasonable ranges

**Layer Norm vs Batch Norm:**
- **Batch Norm**: Normalizes across batch dimension, suitable for CV tasks
- **Layer Norm**: Normalizes across feature dimension, suitable for NLP tasks
- **Advantages**: Independent of batch size, more stable in sequence modeling

**Layer Norm Computation:**
```
μ = (1/d) × Σxi
σ² = (1/d) × Σ(xi - μ)²
LN(x) = γ × (x - μ)/√(σ² + ε) + β
```

**Parameter Explanation:**
- **μ, σ²**: Mean and variance of the layer
- **γ, β**: Learnable scaling and shifting parameters
- **ε**: Small constant to prevent division by zero (usually 1e-6)

**Pre-Norm vs Post-Norm:**
- **Post-Norm (Original)**: Sublayer → Add & Norm
- **Pre-Norm (Modern)**: Norm → Sublayer → Add
- **Pre-Norm Advantages**: More stable training, especially in deep networks

### 3.2.5 Residual Connections
Residual connections are key technology for training deep Transformers.

**Principle of Residual Connections:**
```
output = SubLayer(input) + input
```

**Problems Solved:**
- **Gradient Vanishing**: Provides direct backpropagation paths for gradients
- **Information Loss**: Ensures input information is not completely lost
- **Training Stability**: Makes deep networks easier to train

**Application in Transformer:**
1. **Multi-Head Attention**:
   ```
   x' = x + MultiHeadAttention(LayerNorm(x))
   ```

2. **Feed-Forward Network**:
   ```
   x'' = x' + FFN(LayerNorm(x'))
   ```

**Challenges of Deep Networks:**
- **Degradation Problem**: Performance actually decreases when networks get deeper
- **Optimization Difficulty**: Deep networks are hard to train to the performance of shallow networks
- **Residual Solution**: Let networks learn residuals rather than direct mappings

**Design Considerations:**
- **Dimension Matching**: Residual connections require input and output dimensions to match
- **Initialization Strategy**: Weight initialization of residual paths is important
- **Gradient Flow**: Ensure gradients can flow smoothly to early layers

## 3.3 Transformer Variants

### 3.3.1 GPT Series (Decoder-only)
GPT adopts a Decoder-only architecture, focusing on autoregressive language modeling.

**Architectural Features:**
- **Unidirectional Attention**: Can only see content before the current position
- **Causal Masking**: Uses masks to ensure no "looking into the future"
- **Autoregressive Generation**: Generates next token one by one

**Masking Mechanism:**
```
Mask Matrix (Lower triangular matrix):
[1, 0, 0, 0]
[1, 1, 0, 0]
[1, 1, 1, 0]
[1, 1, 1, 1]
```

**Evolution of GPT:**
- **GPT-1**: 117 million parameters, proved effectiveness of pretraining + fine-tuning
- **GPT-2**: 1.5 billion parameters, demonstrated powerful text generation capabilities
- **GPT-3**: 175 billion parameters, emerged few-shot learning capabilities
- **GPT-4**: Parameters undisclosed, significantly improved multimodal capabilities and reasoning

**Training Objective:**
- **Next Word Prediction**: Given context, predict probability distribution of next word
- **Mathematical Representation**: maximize Σ log P(wi|w1, w2, ..., wi-1)

**Application Advantages:**
- **Text Generation**: Excellent at generating coherent long texts
- **Dialogue Systems**: Natural dialogue generation capabilities
- **Creative Writing**: Novel, poetry, and script creation
- **Code Generation**: Understanding requirements and generating code

### 3.3.2 BERT Series (Encoder-only)
BERT adopts an Encoder-only architecture, focusing on language understanding tasks.

**Architectural Features:**
- **Bidirectional Attention**: Can simultaneously see left and right context
- **No Generation Capability**: Cannot perform autoregressive generation
- **Deep Understanding**: Focuses on deep understanding and representation of text

**Pretraining Tasks:**
1. **Masked Language Model (MLM)**:
   - Randomly mask 15% of vocabulary
   - Predict masked words
   - Learn bidirectional context representations

2. **Next Sentence Prediction (NSP)**:
   - Judge whether two sentences are consecutive
   - Learn relationships between sentences
   - (Proven less important in subsequent variants)

**BERT Variants:**
- **RoBERTa**: Removes NSP, optimizes training strategies
- **ALBERT**: Parameter sharing, reduces model size
- **DeBERTa**: Decoupled attention mechanism, improves performance
- **DistilBERT**: Lightweight version through knowledge distillation

**Application Scenarios:**
- **Text Classification**: Sentiment analysis, topic classification
- **Named Entity Recognition**: Identifying person names, place names, organization names
- **Question Answering**: Reading comprehension and knowledge QA
- **Similarity Computation**: Text similarity and retrieval

### 3.3.3 T5 Series (Encoder-Decoder)
T5 maintains the complete Encoder-Decoder architecture, unifying all NLP tasks as text-to-text conversion.

**"Text-to-Text" Philosophy:**
- **Unified Framework**: All tasks converted to text generation problems
- **Task Prefixes**: Specify specific task types through prefixes
- **Examples**:
  - Translation: "translate English to German: Hello" → "Hallo"
  - Summarization: "summarize: [long text]" → "[summary]"
  - Classification: "classify: [text]" → "positive/negative"

**Architectural Advantages:**
- **Flexibility**: Same model can handle multiple tasks
- **Transfer Learning**: Tasks can mutually promote learning
- **Unified Interface**: Simplifies model usage and deployment

**T5 Variants:**
- **T5-small/base/large/3B/11B**: Models of different scales
- **mT5**: Multilingual version
- **UL2**: Unified Language Learner framework
- **PaLM-2**: Large-scale model based on T5 architecture

**Training Strategies:**
- **Denoising Autoencoding**: Corrupt input text, train model to recover
- **Multi-task Learning**: Train simultaneously on multiple tasks
- **Prefix LM**: Combines advantages of autoencoding and autoregressive approaches

**Application Scenarios:**
- **Multi-task Processing**: Scenarios requiring multiple NLP tasks
- **Few-shot Learning**: Quickly adapting to new tasks
- **Conditional Generation**: Generating text based on specific conditions
- **Cross-task Transfer**: Leveraging correlations between tasks