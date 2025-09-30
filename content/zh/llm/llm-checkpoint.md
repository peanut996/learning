# LLM Checkpoint 详解

## 什么是 Checkpoint？

Checkpoint（检查点）是深度学习训练过程中保存的模型状态快照，包含了模型在特定训练步骤时的所有参数、优化器状态以及其他必要信息。对于大语言模型（LLM）训练来说，checkpoint 是实现训练容错、模型评估和部署的核心机制。

## Checkpoint 的组成

### 1. 核心组件

一个完整的 LLM checkpoint 通常包含：

- **模型权重 (Model Weights)**: 神经网络的所有参数
- **优化器状态 (Optimizer State)**: Adam、AdamW 等优化器的动量和方差信息
- **训练步数 (Training Steps)**: 当前训练到的全局步数
- **学习率调度器状态 (LR Scheduler State)**: 学习率变化的历史记录
- **随机数生成器状态 (RNG State)**: 保证训练可复现性
- **元数据 (Metadata)**: 模型配置、训练超参数等

### 2. 存储格式

常见的 checkpoint 存储格式：

- **PyTorch (.pt, .pth)**: PyTorch 原生格式，使用 `torch.save()` 保存
- **SafeTensors (.safetensors)**: Hugging Face 推出的安全格式，加载速度更快
- **TensorFlow (.ckpt)**: TensorFlow 的 checkpoint 格式
- **GGUF (.gguf)**: llama.cpp 使用的量化格式
- **分片格式**: 将大模型拆分成多个文件（如 model-00001-of-00010.safetensors）

## Checkpoint 保存策略

### 1. 定期保存

```python
# 每 N 步保存一次
if global_step % save_steps == 0:
    save_checkpoint(model, optimizer, global_step)
```

**优点**: 简单直接，不会丢失太多训练进度
**缺点**: 可能保存过多不必要的 checkpoint

### 2. 基于验证集性能保存

```python
# 只保存验证集上表现最好的模型
if val_loss < best_val_loss:
    best_val_loss = val_loss
    save_checkpoint(model, optimizer, global_step, is_best=True)
```

**优点**: 节省存储空间，保留最优模型
**缺点**: 需要额外的验证开销

### 3. 多版本保存

```python
# 保留最近的 K 个 checkpoint
checkpoints = [f"ckpt_{i}.pt" for i in range(k)]
if len(checkpoints) >= max_checkpoints:
    os.remove(checkpoints[0])  # 删除最旧的
```

**优点**: 平衡存储和训练安全性
**缺点**: 仍需要较大存储空间

### 4. 里程碑 + 滚动策略

```python
# 特定步数永久保存，其他定期覆盖
if global_step in milestone_steps:
    save_checkpoint(f"milestone_{global_step}.pt")
else:
    save_checkpoint("latest.pt", overwrite=True)
```

**优点**: 既保留关键节点，又节省空间
**缺点**: 需要提前规划里程碑

## Checkpoint 在 LLM 训练中的应用

### 1. 容错恢复

LLM 训练通常需要数周甚至数月，checkpoint 可以在以下情况恢复训练：

- 硬件故障（GPU 崩溃、节点宕机）
- 网络中断
- 电源故障
- 手动中断训练

**示例：从 checkpoint 恢复训练**

```python
def load_checkpoint(checkpoint_path):
    checkpoint = torch.load(checkpoint_path)
    model.load_state_dict(checkpoint['model_state'])
    optimizer.load_state_dict(checkpoint['optimizer_state'])
    start_step = checkpoint['global_step']
    return start_step

# 恢复训练
start_step = load_checkpoint("latest_checkpoint.pt")
for step in range(start_step, total_steps):
    train_step(model, data)
```

### 2. 增量训练（Continual Learning）

基于已有 checkpoint 继续训练：

- **领域适配**: 在通用模型基础上继续训练特定领域数据
- **指令微调**: 加载预训练 checkpoint 后进行 SFT（Supervised Fine-Tuning）
- **多阶段训练**: 先在大规模数据上预训练，再在高质量数据上精调

### 3. 模型评估与选择

保存多个 checkpoint 可以：

- 对比不同训练阶段的模型性能
- 避免过拟合（选择验证集表现最好的 checkpoint）
- 进行模型集成（ensemble）

### 4. 分布式训练同步

在多机多卡训练中，checkpoint 用于：

- **同步训练状态**: 确保所有节点从相同状态恢复
- **动态扩缩容**: 增加或减少训练节点时重新分配参数
- **检查点聚合**: FSDP（Fully Sharded Data Parallel）中需要合并分片参数

## 大模型 Checkpoint 的挑战

### 1. 存储开销

**问题**:
- GPT-3 (175B 参数) 的 FP32 checkpoint 约 700GB
- 包含优化器状态后可达 2-3TB

**解决方案**:
- 使用混合精度训练（FP16/BF16），减少一半存储
- 优化器状态分片存储
- 仅保存模型权重，不保存优化器（用于推理部署）
- 采用增量 checkpoint（只保存变化的参数）

### 2. 保存与加载速度

**问题**:
- 大模型 checkpoint 保存可能需要数十分钟
- 影响训练效率和容错恢复速度

**解决方案**:
- 异步保存：在后台线程保存 checkpoint，不阻塞训练
- 使用高速存储（NVMe SSD、并行文件系统）
- 采用高效序列化格式（SafeTensors 比 PyTorch 原生格式快 2-3 倍）
- 压缩存储（如使用 zarr 格式）

### 3. 分布式环境的一致性

**问题**:
- 不同节点可能处于不同训练状态
- 数据并行和模型并行的 checkpoint 格式不同

**解决方案**:
- 只在 rank 0 节点保存 checkpoint
- FSDP 提供 `state_dict_type` 参数统一格式
- DeepSpeed 提供 ZeRO checkpoint 工具

### 4. 版本兼容性

**问题**:
- 框架升级后旧 checkpoint 可能无法加载
- 模型架构变化导致参数不匹配

**解决方案**:
- 记录训练环境（框架版本、模型配置）
- 提供 checkpoint 转换工具
- 使用与框架无关的格式（如 SafeTensors、ONNX）

## 最佳实践

### 1. Checkpoint 命名规范

```
checkpoint_step_{global_step}_loss_{loss:.4f}.pt
# 示例: checkpoint_step_10000_loss_2.3456.pt
```

清晰的命名可以快速识别 checkpoint 的训练状态。

### 2. 分离模型权重与训练状态

```python
# 保存完整训练状态（用于恢复训练）
torch.save({
    'model': model.state_dict(),
    'optimizer': optimizer.state_dict(),
    'scheduler': scheduler.state_dict(),
    'step': global_step
}, 'training_state.pt')

# 仅保存模型权重（用于推理）
torch.save(model.state_dict(), 'model_weights.pt')
```

### 3. 使用 SafeTensors 格式

```python
from safetensors.torch import save_file, load_file

# 保存
save_file(model.state_dict(), "model.safetensors")

# 加载
model.load_state_dict(load_file("model.safetensors"))
```

### 4. 实现自动清理机制

```python
def cleanup_old_checkpoints(checkpoint_dir, keep_last=3):
    checkpoints = sorted(glob.glob(f"{checkpoint_dir}/checkpoint_*.pt"))
    for old_ckpt in checkpoints[:-keep_last]:
        os.remove(old_ckpt)
        print(f"Removed old checkpoint: {old_ckpt}")
```

### 5. 验证 Checkpoint 完整性

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

## 主流框架的 Checkpoint 工具

### Hugging Face Transformers

```python
from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
    output_dir="./checkpoints",
    save_strategy="steps",
    save_steps=1000,
    save_total_limit=3,  # 只保留最近 3 个
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
# 保存
model_engine.save_checkpoint(save_dir, tag=f"step_{global_step}")

# 加载
_, client_state = model_engine.load_checkpoint(load_dir, tag)
```

### PyTorch FSDP

```python
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
from torch.distributed.fsdp import StateDictType, FullStateDictConfig

# 配置保存格式
cfg = FullStateDictConfig(offload_to_cpu=True, rank0_only=True)
with FSDP.state_dict_type(model, StateDictType.FULL_STATE_DICT, cfg):
    state_dict = model.state_dict()
    if rank == 0:
        torch.save(state_dict, "checkpoint.pt")
```

## 总结

Checkpoint 是 LLM 训练的关键基础设施，合理的 checkpoint 策略可以：

1. **提高训练可靠性**: 快速从故障中恢复
2. **优化资源利用**: 节省存储空间和 I/O 时间
3. **支持灵活实验**: 方便模型对比和版本管理
4. **加速迭代周期**: 基于已有 checkpoint 进行增量训练

随着模型规模的增长，checkpoint 技术也在不断演进，新的存储格式、压缩算法和分布式策略将继续推动 LLM 训练效率的提升。