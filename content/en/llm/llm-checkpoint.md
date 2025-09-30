# LLM Checkpoint Guide

## What is a Checkpoint?

A checkpoint is a snapshot of the model state saved during deep learning training, containing all model parameters, optimizer states, and other necessary information at a specific training step. For Large Language Model (LLM) training, checkpoints are the core mechanism for achieving fault tolerance, model evaluation, and deployment.

## Components of a Checkpoint

### 1. Core Components

A complete LLM checkpoint typically includes:

- **Model Weights**: All parameters of the neural network
- **Optimizer State**: Momentum and variance information for optimizers like Adam, AdamW
- **Training Steps**: Current global training step count
- **LR Scheduler State**: Historical learning rate changes
- **RNG State**: Ensures training reproducibility
- **Metadata**: Model configuration, training hyperparameters, etc.

### 2. Storage Formats

Common checkpoint storage formats:

- **PyTorch (.pt, .pth)**: PyTorch native format, saved using `torch.save()`
- **SafeTensors (.safetensors)**: Safe format introduced by Hugging Face, faster loading
- **TensorFlow (.ckpt)**: TensorFlow checkpoint format
- **GGUF (.gguf)**: Quantized format used by llama.cpp
- **Sharded Format**: Large models split into multiple files (e.g., model-00001-of-00010.safetensors)

## Checkpoint Saving Strategies

### 1. Periodic Saving

```python
# Save every N steps
if global_step % save_steps == 0:
    save_checkpoint(model, optimizer, global_step)
```

**Pros**: Simple and straightforward, minimal training progress loss
**Cons**: May save too many unnecessary checkpoints

### 2. Validation-Based Saving

```python
# Only save the best model on validation set
if val_loss < best_val_loss:
    best_val_loss = val_loss
    save_checkpoint(model, optimizer, global_step, is_best=True)
```

**Pros**: Saves storage space, retains the best model
**Cons**: Requires additional validation overhead

### 3. Multi-Version Saving

```python
# Keep the last K checkpoints
checkpoints = [f"ckpt_{i}.pt" for i in range(k)]
if len(checkpoints) >= max_checkpoints:
    os.remove(checkpoints[0])  # Delete the oldest
```

**Pros**: Balances storage and training safety
**Cons**: Still requires significant storage space

### 4. Milestone + Rolling Strategy

```python
# Permanently save specific steps, overwrite others periodically
if global_step in milestone_steps:
    save_checkpoint(f"milestone_{global_step}.pt")
else:
    save_checkpoint("latest.pt", overwrite=True)
```

**Pros**: Retains key checkpoints while saving space
**Cons**: Requires advance planning of milestones

## Checkpoint Applications in LLM Training

### 1. Fault Tolerance and Recovery

LLM training typically takes weeks or even months. Checkpoints enable recovery from:

- Hardware failures (GPU crashes, node failures)
- Network interruptions
- Power outages
- Manual training interruptions

**Example: Resume training from checkpoint**

```python
def load_checkpoint(checkpoint_path):
    checkpoint = torch.load(checkpoint_path)
    model.load_state_dict(checkpoint['model_state'])
    optimizer.load_state_dict(checkpoint['optimizer_state'])
    start_step = checkpoint['global_step']
    return start_step

# Resume training
start_step = load_checkpoint("latest_checkpoint.pt")
for step in range(start_step, total_steps):
    train_step(model, data)
```

### 2. Continual Learning

Continue training from existing checkpoints:

- **Domain Adaptation**: Continue training on domain-specific data from a general model
- **Instruction Fine-Tuning**: Load pretrained checkpoint then perform SFT (Supervised Fine-Tuning)
- **Multi-Stage Training**: Pre-train on large-scale data, then fine-tune on high-quality data

### 3. Model Evaluation and Selection

Saving multiple checkpoints allows you to:

- Compare model performance at different training stages
- Avoid overfitting (select the checkpoint with best validation performance)
- Perform model ensembling

### 4. Distributed Training Synchronization

In multi-node multi-GPU training, checkpoints are used for:

- **Synchronizing Training State**: Ensure all nodes resume from the same state
- **Dynamic Scaling**: Redistribute parameters when adding or removing training nodes
- **Checkpoint Aggregation**: FSDP (Fully Sharded Data Parallel) requires merging sharded parameters

## Challenges with Large Model Checkpoints

### 1. Storage Overhead

**Problem**:
- GPT-3 (175B parameters) FP32 checkpoint is approximately 700GB
- Including optimizer states can reach 2-3TB

**Solutions**:
- Use mixed precision training (FP16/BF16), reducing storage by half
- Shard optimizer states
- Save only model weights without optimizer (for inference deployment)
- Use incremental checkpoints (save only changed parameters)

### 2. Save and Load Speed

**Problem**:
- Saving large model checkpoints may take tens of minutes
- Affects training efficiency and fault recovery speed

**Solutions**:
- Asynchronous saving: Save checkpoints in background threads without blocking training
- Use high-speed storage (NVMe SSD, parallel file systems)
- Use efficient serialization formats (SafeTensors is 2-3x faster than PyTorch native format)
- Compressed storage (e.g., using zarr format)

### 3. Consistency in Distributed Environments

**Problem**:
- Different nodes may be in different training states
- Data parallel and model parallel have different checkpoint formats

**Solutions**:
- Save checkpoint only on rank 0 node
- FSDP provides `state_dict_type` parameter for unified format
- DeepSpeed provides ZeRO checkpoint tools

### 4. Version Compatibility

**Problem**:
- Old checkpoints may not load after framework upgrades
- Model architecture changes lead to parameter mismatches

**Solutions**:
- Record training environment (framework version, model configuration)
- Provide checkpoint conversion tools
- Use framework-agnostic formats (e.g., SafeTensors, ONNX)

## Best Practices

### 1. Checkpoint Naming Convention

```
checkpoint_step_{global_step}_loss_{loss:.4f}.pt
# Example: checkpoint_step_10000_loss_2.3456.pt
```

Clear naming helps quickly identify checkpoint training state.

### 2. Separate Model Weights from Training State

```python
# Save complete training state (for resuming training)
torch.save({
    'model': model.state_dict(),
    'optimizer': optimizer.state_dict(),
    'scheduler': scheduler.state_dict(),
    'step': global_step
}, 'training_state.pt')

# Save only model weights (for inference)
torch.save(model.state_dict(), 'model_weights.pt')
```

### 3. Use SafeTensors Format

```python
from safetensors.torch import save_file, load_file

# Save
save_file(model.state_dict(), "model.safetensors")

# Load
model.load_state_dict(load_file("model.safetensors"))
```

### 4. Implement Automatic Cleanup

```python
def cleanup_old_checkpoints(checkpoint_dir, keep_last=3):
    checkpoints = sorted(glob.glob(f"{checkpoint_dir}/checkpoint_*.pt"))
    for old_ckpt in checkpoints[:-keep_last]:
        os.remove(old_ckpt)
        print(f"Removed old checkpoint: {old_ckpt}")
```

### 5. Verify Checkpoint Integrity

```python
def verify_checkpoint(checkpoint_path):
    try:
        checkpoint = torch.load(checkpoint_path)
        required_keys = ['model', 'optimizer', 'step']
        assert all(k in checkpoint for k in required_keys)
        print(f"✓ Checkpoint valid: {checkpoint_path}")
        return True
    except Exception as e:
        print(f"✗ Checkpoint corrupted: {e}")
        return False
```

## Checkpoint Tools in Popular Frameworks

### Hugging Face Transformers

```python
from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
    output_dir="./checkpoints",
    save_strategy="steps",
    save_steps=1000,
    save_total_limit=3,  # Keep only last 3
    load_best_model_at_end=True,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
)

trainer.train(resume_from_checkpoint="./checkpoints/checkpoint-1000")
```

### DeepSpeed

```python
# Save
model_engine.save_checkpoint(save_dir, tag=f"step_{global_step}")

# Load
_, client_state = model_engine.load_checkpoint(load_dir, tag)
```

### PyTorch FSDP

```python
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
from torch.distributed.fsdp import StateDictType, FullStateDictConfig

# Configure save format
cfg = FullStateDictConfig(offload_to_cpu=True, rank0_only=True)
with FSDP.state_dict_type(model, StateDictType.FULL_STATE_DICT, cfg):
    state_dict = model.state_dict()
    if rank == 0:
        torch.save(state_dict, "checkpoint.pt")
```

## Summary

Checkpoints are critical infrastructure for LLM training. A well-designed checkpoint strategy can:

1. **Improve Training Reliability**: Quickly recover from failures
2. **Optimize Resource Utilization**: Save storage space and I/O time
3. **Support Flexible Experimentation**: Facilitate model comparison and version management
4. **Accelerate Iteration Cycles**: Perform incremental training from existing checkpoints

As model sizes continue to grow, checkpoint technology continues to evolve. New storage formats, compression algorithms, and distributed strategies will continue to drive improvements in LLM training efficiency.