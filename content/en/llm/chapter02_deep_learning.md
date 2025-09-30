# Chapter 2: Deep Learning and Neural Network Fundamentals

## 2.1 Basic Deep Learning Concepts

### 2.1.1 Basic Principles of Neural Networks
Neural networks are the foundation of deep learning, computational models inspired by biological neural systems.

**Biological vs Artificial Neurons:**
- **Biological Neurons**: Composed of cell body, dendrites, and axons, transmitting information through electrochemical signals
- **Artificial Neurons (Perceptrons)**: Mathematical models that receive multiple inputs, compute weighted sums, and produce output through activation functions
- **Mathematical Representation**: `y = f(∑(wi × xi) + b)`, where f is the activation function, wi are weights, xi are inputs, and b is bias

**Neural Network Layer Structure:**
- **Input Layer**: Receives raw data, each node corresponds to a feature
- **Hidden Layers**: Perform feature transformation and abstraction, can have multiple layers
- **Output Layer**: Produces final prediction results

**Role of Activation Functions:**
- **Introduce Non-linearity**: Without activation functions, multi-layer networks are equivalent to single-layer linear transformations
- **Common Activation Functions**:
  - **Sigmoid**: `σ(x) = 1/(1+e^(-x))`, output range (0,1)
  - **Tanh**: `tanh(x) = (e^x - e^(-x))/(e^x + e^(-x))`, output range (-1,1)
  - **ReLU**: `ReLU(x) = max(0,x)`, simple and efficient, alleviates gradient vanishing
  - **Leaky ReLU**: `LeakyReLU(x) = max(αx,x)`, α typically 0.01
  - **GELU**: `GELU(x) = x × Φ(x)`, widely used in Transformers

### 2.1.2 Forward Propagation and Backpropagation
Neural network training involves two core steps: forward propagation and backpropagation.

**Forward Propagation:**
- **Computation Process**: Input data propagates layer by layer from input to output layer
- **Layer-wise Calculation**: Each layer's output = activation function(weight matrix × previous layer output + bias)
- **Final Output**: Network produces prediction results
- **Mathematical Representation**:
  ```
  a^(l) = f^(l)(W^(l) × a^(l-1) + b^(l))
  ```
  where a^(l) is the activation of layer l, W^(l) is the weight matrix, b^(l) is the bias vector

**Backpropagation:**
- **Core Idea**: Compute gradients of loss function with respect to parameters using chain rule
- **Gradient Calculation**: Starting from output layer, compute gradients layer by layer backward
- **Parameter Update**: Update weights and biases based on gradients and learning rate
- **Chain Rule**:
  ```
  ∂L/∂W^(l) = ∂L/∂a^(l) × ∂a^(l)/∂z^(l) × ∂z^(l)/∂W^(l)
  ```

**Gradient Vanishing and Exploding Problems:**
- **Gradient Vanishing**: Gradients decay exponentially in deep networks, causing slow parameter updates in early layers
- **Gradient Exploding**: Gradients grow exponentially during backpropagation, causing excessive parameter updates
- **Solutions**:
  - Gradient Clipping
  - Residual Connections
  - Layer Normalization
  - Proper weight initialization strategies

### 2.1.3 Gradient Descent Optimization Algorithms
Gradient descent is the core optimization method for neural network training.

**Batch Gradient Descent (BGD):**
- **Update Rule**: `θ = θ - α × ∇J(θ)`
- **Characteristics**: Uses entire training dataset to compute gradients
- **Advantages**: Stable convergence, can find global optimum (for convex functions)
- **Disadvantages**: High computational cost, high memory requirements, slow convergence

**Stochastic Gradient Descent (SGD):**
- **Update Rule**: Uses single sample to compute gradients each time
- **Characteristics**: High-frequency parameter updates, introduces randomness
- **Advantages**: Computationally efficient, can escape local optima
- **Disadvantages**: Unstable convergence, may oscillate around optimum

**Mini-batch Gradient Descent:**
- **Update Rule**: Uses small batches of data (typically 32-512 samples) to compute gradients
- **Balance Point**: Achieves balance between computational efficiency and convergence stability
- **Practical Application**: Standard practice in modern deep learning

**Advanced Optimizers:**
- **Momentum**:
  ```
  v = βv + (1-β)∇J(θ)
  θ = θ - αv
  ```
  Introduces momentum term, accelerates convergence, reduces oscillations

- **Adam (Adaptive Moment Estimation)**:
  ```
  m = β₁m + (1-β₁)∇J(θ)
  v = β₂v + (1-β₂)(∇J(θ))²
  θ = θ - α × m̂/√(v̂ + ε)
  ```
  Adaptive learning rate, combines advantages of momentum and RMSprop

- **AdamW**: Improved version of Adam with decoupled weight decay
- **RMSprop**: Adaptive learning rate, suitable for handling non-stationary objectives

### 2.1.4 Loss Functions and Evaluation Metrics
Loss functions define the gap between model predictions and true labels.

**Regression Task Loss Functions:**
- **Mean Squared Error (MSE)**:
  ```
  MSE = (1/n) × ∑(yi - ŷi)²
  ```
  Sensitive to outliers, commonly used for regression problems

- **Mean Absolute Error (MAE)**:
  ```
  MAE = (1/n) × ∑|yi - ŷi|
  ```
  Less sensitive to outliers

- **Huber Loss**: Combines advantages of MSE and MAE, behaves like MSE for small errors and MAE for large errors

**Classification Task Loss Functions:**
- **Cross-Entropy Loss**:
  ```
  CE = -∑yi × log(ŷi)
  ```
  Most commonly used classification loss function, suitable for probability outputs

- **Binary Cross-Entropy**: Special case for binary classification problems
- **Focal Loss**: Addresses class imbalance problems, focuses on hard-to-classify samples

**Evaluation Metrics:**
- **Classification Tasks**:
  - Accuracy: Proportion of correct predictions
  - Precision: Proportion of actual positives among positive predictions
  - Recall: Proportion of predicted positives among actual positives
  - F1 Score: Harmonic mean of precision and recall
  - AUC-ROC: Area under ROC curve

- **Regression Tasks**:
  - Root Mean Square Error (RMSE): Square root of MSE
  - Mean Absolute Percentage Error (MAPE)
  - Coefficient of Determination (R²)

## 2.2 Sequence Modeling Basics

### 2.2.1 Limitations of Recurrent Neural Networks (RNNs)
RNNs were the primary method for processing sequential data in early days but have significant limitations.

**Basic Principles of RNNs:**
- **Recurrent Structure**: Hidden states carry information across time steps
- **Mathematical Representation**:
  ```
  ht = tanh(Wxh × xt + Whh × ht-1 + bh)
  yt = Why × ht + by
  ```
- **Parameter Sharing**: Same weight matrices used across all time steps

**Major Limitations of RNNs:**
- **Gradient Vanishing Problem**: Long-range dependencies are difficult to learn in long sequences
  - Gradients decay exponentially across time dimensions
  - Network cannot remember long-term information

- **Gradient Exploding Problem**: Gradients may grow exponentially
  - Can be mitigated through gradient clipping
  - Still affects training stability

- **Sequential Computation Constraints**:
  - Cannot parallelize sequence processing
  - Training and inference speed limited
  - Difficult to handle very long sequences

- **Information Bottleneck**:
  - All historical information compressed into fixed-size hidden state
  - Important historical information easily lost

### 2.2.2 Long Short-Term Memory (LSTM)
LSTM solves RNN's gradient vanishing problem through gating mechanisms.

**Core Ideas of LSTM:**
- **Cell State**: Long-term memory carrier for information
- **Gating Mechanisms**: Control information flow in, retention, and output
- **Solving Gradient Vanishing**: Maintains gradient flow through additive operations

**Three Gates in LSTM:**
- **Forget Gate**:
  ```
  ft = σ(Wf × [ht-1, xt] + bf)
  ```
  Decides what information to discard from cell state

- **Input Gate**:
  ```
  it = σ(Wi × [ht-1, xt] + bi)
  C̃t = tanh(WC × [ht-1, xt] + bC)
  ```
  Decides what new information to store in cell state

- **Output Gate**:
  ```
  ot = σ(Wo × [ht-1, xt] + bo)
  ht = ot × tanh(Ct)
  ```
  Decides which parts of cell state to output

**Cell State Update:**
```
Ct = ft × Ct-1 + it × C̃t
```

**Advantages of LSTM:**
- **Alleviates Gradient Vanishing**: Additive updates of cell state maintain gradient flow
- **Selective Memory**: Gating mechanisms allow network to learn when to remember, forget, and output
- **Handles Long Sequences**: Can model longer-range dependencies

**LSTM Variants:**
- **Peephole LSTM**: Gates can observe cell state
- **Coupled Forget and Input Gates**: Simplified gating structure
- **Bidirectional LSTM**: Utilizes both forward and backward information

### 2.2.3 Gated Recurrent Unit (GRU)
GRU is a simplified version of LSTM that reduces parameter count while maintaining similar performance.

**Design Philosophy of GRU:**
- **Simplified Structure**: Reduces LSTM's three gates to two gates
- **Merged Cell and Hidden States**: Reduces parameter count
- **Maintains Key Functions**: Still effectively handles long sequence dependencies

**Two Gates in GRU:**
- **Reset Gate**:
  ```
  rt = σ(Wr × [ht-1, xt] + br)
  ```
  Controls how much of previous hidden state to use

- **Update Gate**:
  ```
  zt = σ(Wz × [ht-1, xt] + bz)
  ```
  Controls how much of previous hidden state is retained to current time

**Hidden State Update:**
```
h̃t = tanh(Wh × [rt × ht-1, xt] + bh)
ht = (1 - zt) × ht-1 + zt × h̃t
```

**GRU vs LSTM:**
- **Parameter Count**: GRU has approximately 25% fewer parameters than LSTM
- **Computational Efficiency**: GRU has faster training and inference speed
- **Performance Comparison**: Similar performance on most tasks, specific tasks may vary
- **Selection Guidelines**:
  - Small dataset: Choose GRU (fewer parameters, less prone to overfitting)
  - Large dataset: Can try LSTM (stronger expressive power)
  - Limited computational resources: Choose GRU

### 2.2.4 Sequence-to-Sequence (Seq2Seq) Models
Seq2Seq models are classic architectures for handling sequence transformation tasks.

**Basic Architecture of Seq2Seq:**
- **Encoder**: Encodes input sequence into fixed-length vector representation
- **Decoder**: Generates output sequence based on encoding vector
- **Application Scenarios**: Machine translation, text summarization, dialogue generation, etc.

**Encoder Design:**
- **Recurrent Encoder**: Uses LSTM/GRU to process input sequence
- **Final State**: Encoder's final hidden state serves as context vector
- **Bidirectional Encoder**: Combines forward and backward information for richer representation

**Decoder Design:**
- **Initialization**: Uses encoder's final state to initialize decoder
- **Autoregressive Generation**: Each step's generation depends on previously generated content
- **Teacher Forcing**: Uses true labels as input during training

**Introduction of Attention Mechanism:**
Traditional Seq2Seq Problems:
- **Information Bottleneck**: All input information compressed into single vector
- **Long Sequence Performance Degradation**: Encoding vector struggles to retain all important information

**Attention Mechanism Solutions:**
- **Dynamic Context**: Decoder can access all encoder hidden states at each step
- **Weight Calculation**:
  ```
  eij = a(si-1, hj)  # Alignment scores
  αij = softmax(eij)  # Attention weights
  ci = Σ αij × hj     # Context vector
  ```
- **Improvement Effects**: Significantly improves long sequence translation quality

**Limitations of Seq2Seq:**
- **Serial Decoding**: Cannot parallelize generation, slow inference speed
- **Length Constraints**: Still difficult when processing very long sequences
- **Alignment Issues**: Poor performance when input-output sequence lengths differ significantly

These limitations ultimately led to the emergence of Transformer architecture, completely changing the paradigm of sequence modeling.