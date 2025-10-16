## 事务与锁

### 33. Redis 支持事务吗？如何实现？

**核心答案**

Redis 支持事务，通过 MULTI、EXEC、DISCARD、WATCH 四个命令实现。事务将多个命令打包成一个原子操作执行。

**详细说明**

1. **事务的基本使用**

```bash
# 开启事务
MULTI

# 命令入队
SET key1 value1
SET key2 value2
INCR counter

# 执行事务
EXEC
```

2. **四个核心命令**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="50" width="150" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="80" text-anchor="middle" class="label" font-weight="bold">MULTI</text>
<text x="125" y="105" text-anchor="middle" class="small">开启事务</text>
<rect x="230" y="50" width="150" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="305" y="80" text-anchor="middle" class="label" font-weight="bold">命令入队</text>
<text x="305" y="100" text-anchor="middle" class="small">SET/GET/INCR</text>
<text x="305" y="115" text-anchor="middle" class="small">命令排队</text>
<rect x="410" y="50" width="150" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="485" y="80" text-anchor="middle" class="label" font-weight="bold">EXEC</text>
<text x="485" y="105" text-anchor="middle" class="small">执行事务</text>
<rect x="590" y="50" width="150" height="80" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="665" y="80" text-anchor="middle" class="label" font-weight="bold">DISCARD</text>
<text x="665" y="105" text-anchor="middle" class="small">取消事务</text>
<path d="M 200 90 L 230 90" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<path d="M 380 90 L 410 90" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<path d="M 305 130 Q 305 180 485 180 L 485 130" stroke="#c62828" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead-red)"/>
<text x="395" y="200" text-anchor="middle" class="small" fill="#c62828">或取消</text>
<rect x="50" y="250" width="150" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="125" y="280" text-anchor="middle" class="label" font-weight="bold">WATCH</text>
<text x="125" y="300" text-anchor="middle" class="small">乐观锁</text>
<text x="125" y="315" text-anchor="middle" class="small">监控键变化</text>
<path d="M 200 290 L 280 90" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5"/>
<text x="240" y="160" text-anchor="middle" class="small" fill="#f57c00">监控</text>
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
<marker id="arrowhead-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#c62828"/>
</marker>
</defs>
</svg>

| 命令 | 作用 | 说明 |
|------|------|------|
| MULTI | 开启事务 | 标记事务的开始 |
| EXEC | 执行事务 | 执行队列中的所有命令 |
| DISCARD | 取消事务 | 清空命令队列，放弃执行 |
| WATCH | 监控键 | 实现乐观锁，键被修改则事务失败 |

3. **执行流程**

```
客户端                     Redis 服务器
   |                           |
   |----MULTI----------------->| 开启事务
   |<-------OK-----------------|
   |                           |
   |----SET key1 val1--------->| 命令入队
   |<------QUEUED--------------|
   |                           |
   |----SET key2 val2--------->| 命令入队
   |<------QUEUED--------------|
   |                           |
   |----EXEC------------------>| 执行所有命令
   |<------1) OK---------------|
   |<------2) OK---------------| 返回所有结果
```

4. **使用示例**

```bash
# 示例1：正常事务
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> SET name "Tom"
QUEUED
127.0.0.1:6379> SET age 20
QUEUED
127.0.0.1:6379> EXEC
1) OK
2) OK

# 示例2：取消事务
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> SET name "Tom"
QUEUED
127.0.0.1:6379> DISCARD
OK
```

**关键要点**

- ✅ Redis 通过 MULTI/EXEC 实现事务
- ✅ 命令在 EXEC 之前只是入队，不会执行
- ✅ EXEC 执行时会顺序执行所有命令
- ✅ DISCARD 可以取消事务
- ✅ WATCH 提供乐观锁机制

**记忆口诀**

```
开启事务用 MULTI（开启）
命令入队不执行（排队）
EXEC 执行全部命令（执行）
DISCARD 取消全放弃（取消）
```

### 34. Redis 事务的特性是什么？

**核心答案**

Redis 事务具有三个重要特性：**原子性**（部分支持）、**隔离性**（单线程保证）、但**不保证持久性**（取决于持久化配置），且**不支持回滚**。

**详细说明**

1. **Redis 事务的四大特性**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="50" width="320" height="100" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="210" y="80" text-anchor="middle" class="label" font-weight="bold">✅ 隔离性 (Isolation)</text>
<text x="210" y="105" text-anchor="middle" class="small">单线程执行，天然保证</text>
<text x="210" y="125" text-anchor="middle" class="small">事务期间命令不会被其他客户端打断</text>
<rect x="430" y="50" width="320" height="100" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="590" y="80" text-anchor="middle" class="label" font-weight="bold">⚠️ 原子性 (Atomicity)</text>
<text x="590" y="105" text-anchor="middle" class="small">部分支持</text>
<text x="590" y="125" text-anchor="middle" class="small">命令错误：不执行 / 运行错误：继续执行</text>
<rect x="50" y="180" width="320" height="100" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="210" y="210" text-anchor="middle" class="label" font-weight="bold">❌ 持久性 (Durability)</text>
<text x="210" y="235" text-anchor="middle" class="small">不保证</text>
<text x="210" y="255" text-anchor="middle" class="small">取决于 RDB/AOF 配置</text>
<rect x="430" y="180" width="320" height="100" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="590" y="210" text-anchor="middle" class="label" font-weight="bold">❌ 一致性 (Consistency)</text>
<text x="590" y="235" text-anchor="middle" class="small">不支持回滚</text>
<text x="590" y="255" text-anchor="middle" class="small">错误命令继续执行，不保证一致性</text>
<rect x="150" y="320" width="500" height="130" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="350" text-anchor="middle" class="label" font-weight="bold">Redis 事务 vs 传统数据库事务</text>
<text x="400" y="380" text-anchor="middle" class="small">✅ Redis：轻量级、高性能、弱 ACID</text>
<text x="400" y="400" text-anchor="middle" class="small">✅ MySQL：完整 ACID、支持回滚、性能较低</text>
<text x="400" y="420" text-anchor="middle" class="small">⚠️ Redis 适合简单原子操作，不适合复杂事务逻辑</text>
</svg>

2. **原子性（Atomicity）- 部分支持**

| 错误类型 | 发生时机 | 是否执行 | 原子性 | 示例 |
|---------|---------|---------|--------|------|
| **语法错误** | 入队时 | ❌ 全部不执行 | ✅ 保证 | `SET key` (缺少参数) |
| **运行时错误** | 执行时 | ⚠️ 错误命令跳过，其他继续 | ❌ 不保证 | 对字符串执行 `INCR` |

```bash
# 情况1：语法错误 - 不执行任何命令
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> SET key1 value1
QUEUED
127.0.0.1:6379> SET key2  # 缺少参数
(error) ERR wrong number of arguments
127.0.0.1:6379> EXEC
(error) EXECABORT Transaction discarded

# 情况2：运行时错误 - 部分执行
127.0.0.1:6379> SET key1 "abc"
OK
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> INCR key1  # 对字符串执行 INCR
QUEUED
127.0.0.1:6379> SET key2 value2
QUEUED
127.0.0.1:6379> EXEC
1) (error) ERR value is not an integer  # 第1条失败
2) OK  # 第2条成功执行
```

3. **隔离性（Isolation）- 完全支持**

```
时间线：
Client A                    Client B
   |                           |
   |----MULTI----------------->|
   |----SET key1 val1--------->|
   |                           |----GET key1------->
   |                           |<---返回旧值--------|
   |----SET key2 val2--------->|
   |----EXEC------------------>|
   |<---全部执行完成------------|
   |                           |----GET key1------->
   |                           |<---返回新值--------|
```

✅ **保证隔离性**：
- Redis 单线程模型，事务中的命令顺序执行
- 事务执行期间，其他客户端命令不会插入
- WATCH 提供乐观锁机制

4. **持久性（Durability）- 不保证**

```
RDB 模式：事务成功 → 内存中 → 下次快照时才持久化
         ↓ (服务器崩溃)
         数据丢失

AOF 模式 (appendfsync always)：事务成功 → 立即写入磁盘
                              ↓
                              数据持久化 ✅

AOF 模式 (appendfsync everysec)：事务成功 → 1秒后写入磁盘
                                 ↓ (1秒内崩溃)
                                 数据可能丢失
```

5. **不支持回滚**

```bash
# MySQL 事务（支持回滚）
START TRANSACTION;
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2; # 失败
ROLLBACK;  # 全部回滚

# Redis 事务（不支持回滚）
MULTI
DECR balance:1 100
INCR balance:2 100  # 如果失败
EXEC  # 第一条已执行，无法回滚
```

**为什么不支持回滚？**
- ✅ 性能考虑：回滚需要额外开销
- ✅ 简化设计：Redis 追求高性能
- ✅ 错误预防：命令在执行前已经过语法检查
- ✅ 使用场景：Redis 多用于简单操作，不需要复杂事务

**关键要点**

| 特性 | 支持程度 | 说明 |
|-----|---------|------|
| 原子性 | ⚠️ 部分支持 | 语法错误不执行，运行错误继续 |
| 隔离性 | ✅ 完全支持 | 单线程保证 |
| 持久性 | ❌ 不保证 | 取决于持久化配置 |
| 回滚 | ❌ 不支持 | 无法撤销已执行命令 |

**记忆口诀**

```
隔离完全单线程（Isolation ✅）
原子部分看错误（Atomicity ⚠️）
持久取决配置定（Durability ❌）
回滚不支持要注意（No Rollback ❌）
```

### 35. 什么是 WATCH 命令？

**核心答案**

WATCH 是 Redis 提供的乐观锁机制，用于在事务执行前监控一个或多个键。如果被监控的键在事务执行前被修改，事务将被取消，返回 nil。

**详细说明**

1. **WATCH 工作原理**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<text x="400" y="30" text-anchor="middle" class="label" font-weight="bold">WATCH 乐观锁机制</text>
<rect x="50" y="60" width="300" height="200" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="200" y="90" text-anchor="middle" class="label" font-weight="bold">✅ 成功场景</text>
<text x="80" y="120" class="small">Client A:</text>
<text x="80" y="140" class="small">WATCH balance</text>
<text x="80" y="160" class="small">val = GET balance (100)</text>
<text x="80" y="180" class="small">MULTI</text>
<text x="80" y="200" class="small">SET balance 50</text>
<text x="80" y="220" class="small">EXEC → OK ✅</text>
<text x="200" y="245" text-anchor="middle" class="small" fill="#4caf50">balance 未被修改，事务成功</text>
<rect x="450" y="60" width="300" height="200" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="600" y="90" text-anchor="middle" class="label" font-weight="bold">❌ 失败场景</text>
<text x="480" y="120" class="small">Client A:</text>
<text x="480" y="140" class="small">WATCH balance</text>
<text x="480" y="160" class="small">val = GET balance (100)</text>
<text x="600" y="180" class="small" fill="#ff5722">← Client B: SET balance 80</text>
<text x="480" y="200" class="small">MULTI</text>
<text x="480" y="220" class="small">SET balance 50</text>
<text x="480" y="240" class="small">EXEC → nil ❌</text>
<text x="600" y="265" text-anchor="middle" class="small" fill="#f44336">balance 被修改，事务取消</text>
<rect x="150" y="300" width="500" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="330" text-anchor="middle" class="label" font-weight="bold">WATCH 使用流程</text>
<text x="180" y="360" class="small">① WATCH key1 key2 ...</text>
<text x="180" y="385" class="small">② 读取需要的值</text>
<text x="180" y="410" class="small">③ 根据读取的值进行业务逻辑</text>
<text x="180" y="435" class="small">④ MULTI</text>
<text x="180" y="460" class="small">⑤ 执行修改命令</text>
<text x="180" y="485" class="small">⑥ EXEC（如果 key 被修改则返回 nil）</text>
<text x="180" y="510" class="small">⑦ UNWATCH（取消监控）</text>
<path d="M 170 365 L 170 515" stroke="#1976d2" stroke-width="2"/>
</svg>

2. **基本使用示例**

```bash
# 场景：库存扣减（100 → 99）
127.0.0.1:6379> SET stock 100
OK

# Client A: 监控库存
127.0.0.1:6379> WATCH stock
OK
127.0.0.1:6379> GET stock
"100"

# Client B: 同时修改库存（模拟并发）
127.0.0.1:6379> SET stock 95
OK

# Client A: 尝试扣减库存
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> DECRBY stock 1
QUEUED
127.0.0.1:6379> EXEC
(nil)  # 返回 nil，事务取消
```

3. **完整的重试逻辑**

```python
def decr_stock(key, amount):
    """使用 WATCH 实现乐观锁的库存扣减"""
    pipe = redis.pipeline()

    while True:
        try:
            # 监控库存键
            pipe.watch(key)

            # 获取当前库存
            current_stock = int(pipe.get(key))

            # 检查库存是否充足
            if current_stock < amount:
                pipe.unwatch()
                return False, "库存不足"

            # 开启事务
            pipe.multi()
            pipe.decrby(key, amount)

            # 执行事务
            result = pipe.execute()

            # 成功
            if result:
                return True, "扣减成功"

        except redis.WatchError:
            # 键被修改，重试
            continue
        finally:
            pipe.reset()

    return False, "扣减失败"
```

4. **WATCH 的关键特性**

| 特性 | 说明 |
|------|------|
| **监控多个键** | `WATCH key1 key2 key3` |
| **自动解除** | EXEC/DISCARD 后自动解除监控 |
| **手动解除** | `UNWATCH` 取消所有监控 |
| **返回值** | 成功返回结果数组，失败返回 nil |
| **实现原理** | 基于版本号（CAS，Compare-And-Swap） |

5. **WATCH vs 悲观锁**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="50" width="330" height="300" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="215" y="80" text-anchor="middle" class="label" font-weight="bold">乐观锁 (WATCH)</text>
<text x="80" y="110" class="small">✅ 不加锁，先执行</text>
<text x="80" y="135" class="small">✅ 冲突时重试</text>
<text x="80" y="160" class="small">✅ 并发性能高</text>
<text x="80" y="185" class="small">✅ 适合读多写少</text>
<text x="80" y="210" class="small">❌ 冲突频繁时重试多</text>
<rect x="70" y="230" width="290" height="100" fill="#fff" stroke="#4caf50" rx="3"/>
<text x="80" y="255" class="small" font-family="monospace">WATCH key</text>
<text x="80" y="275" class="small" font-family="monospace">GET key</text>
<text x="80" y="295" class="small" font-family="monospace">MULTI ... EXEC</text>
<text x="80" y="315" class="small" font-family="monospace"># 失败则重试</text>
<rect x="420" y="50" width="330" height="300" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="585" y="80" text-anchor="middle" class="label" font-weight="bold">悲观锁 (SETNX)</text>
<text x="450" y="110" class="small">✅ 先加锁，再执行</text>
<text x="450" y="135" class="small">✅ 避免冲突</text>
<text x="450" y="160" class="small">✅ 适合写多读少</text>
<text x="450" y="185" class="small">❌ 并发性能低</text>
<text x="450" y="210" class="small">❌ 可能死锁</text>
<rect x="440" y="230" width="290" height="100" fill="#fff" stroke="#f44336" rx="3"/>
<text x="450" y="255" class="small" font-family="monospace">SETNX lock 1</text>
<text x="450" y="275" class="small" font-family="monospace">GET key</text>
<text x="450" y="295" class="small" font-family="monospace">SET key newval</text>
<text x="450" y="315" class="small" font-family="monospace">DEL lock</text>
</svg>

6. **使用场景**

| 场景 | 使用 WATCH | 原因 |
|------|-----------|------|
| 库存扣减 | ✅ | 读多写少，冲突少 |
| 账户余额修改 | ✅ | 需要先读后写 |
| 计数器增减 | ✅ | 高并发读写 |
| 秒杀场景 | ⚠️ | 冲突频繁，考虑 Lua 脚本 |
| 复杂事务 | ❌ | 不支持回滚，考虑其他方案 |

**关键要点**

- ✅ WATCH 实现乐观锁，监控键的变化
- ✅ 被监控的键在事务前被修改，EXEC 返回 nil
- ✅ EXEC/DISCARD 后自动解除监控
- ✅ 适合读多写少、冲突少的场景
- ✅ 冲突时需要手动重试

**记忆口诀**

```
WATCH 监控键变化（监控）
修改则失败要重试（检测）
乐观锁来保护并发（乐观）
读多写少最适合（场景）
```

### 36. Redis 如何实现分布式锁？

**核心答案**

Redis 通过 `SET key value NX EX seconds` 命令实现分布式锁。NX 保证只有在键不存在时才能设置成功（获取锁），EX 设置过期时间防止死锁。

**详细说明**

1. **分布式锁的基本实现**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<text x="400" y="30" text-anchor="middle" class="label" font-weight="bold">Redis 分布式锁实现流程</text>
<rect x="50" y="60" width="200" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="90" text-anchor="middle" class="label" font-weight="bold">① 获取锁</text>
<text x="150" y="115" text-anchor="middle" class="small">SET lock uuid</text>
<text x="150" y="130" text-anchor="middle" class="small">NX EX 30</text>
<rect x="300" y="60" width="200" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="90" text-anchor="middle" class="label" font-weight="bold">② 执行业务</text>
<text x="400" y="115" text-anchor="middle" class="small">处理业务逻辑</text>
<text x="400" y="130" text-anchor="middle" class="small">操作共享资源</text>
<rect x="550" y="60" width="200" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="650" y="90" text-anchor="middle" class="label" font-weight="bold">③ 释放锁</text>
<text x="650" y="115" text-anchor="middle" class="small">Lua 脚本</text>
<text x="650" y="130" text-anchor="middle" class="small">校验 uuid + DEL</text>
<path d="M 250 100 L 300 100" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 500 100 L 550 100" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="100" y="180" width="600" height="280" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"/>
<text x="400" y="210" text-anchor="middle" class="label" font-weight="bold">核心要点</text>
<text x="130" y="245" class="small" font-weight="bold">1. 互斥性：</text>
<text x="150" y="270" class="small">• NX 保证只有一个客户端能获取锁</text>
<text x="130" y="305" class="small" font-weight="bold">2. 防死锁：</text>
<text x="150" y="330" class="small">• EX 设置过期时间，自动释放</text>
<text x="130" y="365" class="small" font-weight="bold">3. 唯一标识：</text>
<text x="150" y="390" class="small">• 使用 UUID 防止误删其他客户端的锁</text>
<text x="130" y="425" class="small" font-weight="bold">4. 原子操作：</text>
<text x="150" y="450" class="small">• 使用 Lua 脚本保证释放锁的原子性</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

2. **基本实现代码**

```python
import redis
import uuid
import time

class RedisLock:
    def __init__(self, redis_client, lock_key, timeout=30):
        """
        初始化分布式锁
        :param redis_client: Redis 客户端
        :param lock_key: 锁的键名
        :param timeout: 锁的超时时间（秒）
        """
        self.redis = redis_client
        self.lock_key = lock_key
        self.timeout = timeout
        self.identifier = str(uuid.uuid4())  # 唯一标识

    def acquire(self):
        """
        获取锁
        :return: True 成功，False 失败
        """
        # SET lock_key uuid NX EX timeout
        result = self.redis.set(
            self.lock_key,
            self.identifier,
            nx=True,           # 只在键不存在时设置
            ex=self.timeout    # 设置过期时间
        )
        return result is not None

    def release(self):
        """
        释放锁（使用 Lua 脚本保证原子性）
        """
        lua_script = """
        if redis.call("GET", KEYS[1]) == ARGV[1] then
            return redis.call("DEL", KEYS[1])
        else
            return 0
        end
        """
        self.redis.eval(lua_script, 1, self.lock_key, self.identifier)

# 使用示例
redis_client = redis.Redis(host='localhost', port=6379)
lock = RedisLock(redis_client, "order:lock:1001", timeout=10)

if lock.acquire():
    try:
        # 执行业务逻辑
        print("获取锁成功，处理订单...")
        time.sleep(2)
    finally:
        lock.release()
        print("释放锁")
else:
    print("获取锁失败")
```

3. **完整的 SET 命令选项**

```bash
# 基本语法
SET key value [NX|XX] [GET] [EX seconds|PX milliseconds|EXAT unix-time|PXAT unix-time|KEEPTTL]

# 分布式锁常用组合
SET lock:order:1001 uuid-xxxx NX EX 30
```

| 选项 | 说明 | 用途 |
|------|------|------|
| **NX** | Not eXists，键不存在时才设置 | 保证互斥性 |
| **XX** | eXists，键存在时才设置 | 续期锁 |
| **EX seconds** | 设置秒级过期时间 | 防止死锁 |
| **PX milliseconds** | 设置毫秒级过期时间 | 更精确的控制 |
| **GET** | 返回旧值 | 获取锁的同时返回旧值 |

4. **为什么要使用 UUID？**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="50" width="330" height="300" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="215" y="80" text-anchor="middle" class="label" font-weight="bold">❌ 不使用 UUID（错误）</text>
<text x="80" y="115" class="small">时间线：</text>
<text x="80" y="145" class="small">① Client A 获取锁</text>
<text x="80" y="170" class="small">② Client A 业务超时（30s+）</text>
<text x="80" y="195" class="small">③ 锁自动过期，被释放</text>
<text x="80" y="220" class="small">④ Client B 获取锁</text>
<text x="80" y="245" class="small">⑤ Client A 完成业务</text>
<text x="80" y="270" class="small" fill="#f44336" font-weight="bold">⑥ Client A 释放了 B 的锁！❌</text>
<text x="215" y="310" text-anchor="middle" class="small" fill="#f44336">导致 Client B 的锁被误删</text>
<rect x="420" y="50" width="330" height="300" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="585" y="80" text-anchor="middle" class="label" font-weight="bold">✅ 使用 UUID（正确）</text>
<text x="450" y="115" class="small">时间线：</text>
<text x="450" y="145" class="small">① Client A 获取锁（uuid-A）</text>
<text x="450" y="170" class="small">② Client A 业务超时（30s+）</text>
<text x="450" y="195" class="small">③ 锁自动过期，被释放</text>
<text x="450" y="220" class="small">④ Client B 获取锁（uuid-B）</text>
<text x="450" y="245" class="small">⑤ Client A 完成业务</text>
<text x="450" y="270" class="small" fill="#4caf50" font-weight="bold">⑥ 发现 uuid 不匹配，不删除 ✅</text>
<text x="585" y="310" text-anchor="middle" class="small" fill="#4caf50">避免误删其他客户端的锁</text>
</svg>

5. **为什么释放锁要使用 Lua 脚本？**

```bash
# ❌ 错误做法：分两步操作，不是原子的
GET lock:key           # 第1步：获取值
DEL lock:key           # 第2步：删除锁
# 问题：两步之间可能被其他客户端抢占

# ✅ 正确做法：Lua 脚本，原子操作
EVAL "
if redis.call('GET', KEYS[1]) == ARGV[1] then
    return redis.call('DEL', KEYS[1])
else
    return 0
end
" 1 lock:key uuid-xxxx
```

6. **加锁流程图**

```
Client A                        Redis                        Client B
   |                              |                              |
   |--SET lock uuid-A NX EX 30-->| ✅ 成功                       |
   |<--------OK-------------------|                              |
   |                              |                              |
   |                              |<--SET lock uuid-B NX EX 30---|
   |                              |---失败 (键已存在) ---------->|
   |                              |                              |
   |----处理业务逻辑-------------->|                              |
   |                              |                              |
   |--Lua: 校验uuid-A + DEL----->| ✅ 匹配，删除                 |
   |<--------1--------------------|                              |
   |                              |                              |
   |                              |<--SET lock uuid-B NX EX 30---|
   |                              |---成功 ---------------------->|
```

**关键要点**

| 特性 | 实现方式 | 重要性 |
|------|---------|--------|
| 互斥性 | SET NX | ⭐⭐⭐ 核心 |
| 防死锁 | EX seconds | ⭐⭐⭐ 必须 |
| 唯一标识 | UUID | ⭐⭐⭐ 防止误删 |
| 原子释放 | Lua 脚本 | ⭐⭐⭐ 保证正确性 |

**记忆口诀**

```
SET NX 保证互斥性（加锁）
EX 过期防死锁（超时）
UUID 唯一标识锁（身份）
Lua 原子来释放（解锁）
```

### 37. 分布式锁的实现有哪些问题？如何解决？

**核心答案**

Redis 分布式锁主要有五大问题：**锁超时**、**主从同步延迟**、**不可重入**、**锁续期**和**单点故障**。解决方案包括使用 Redlock 算法、实现锁续期（看门狗）、可重入锁设计等。

**详细说明**

1. **五大核心问题**

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<text x="425" y="30" text-anchor="middle" class="label" font-weight="bold" font-size="16">Redis 分布式锁的五大问题</text>
<rect x="50" y="60" width="240" height="100" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="170" y="85" text-anchor="middle" class="label" font-weight="bold">❶ 锁超时问题</text>
<text x="70" y="110" class="small">业务未完成，锁已过期</text>
<text x="70" y="130" class="small">→ 其他客户端获取锁</text>
<text x="70" y="150" class="small">→ 出现并发问题</text>
<rect x="310" y="60" width="240" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="430" y="85" text-anchor="middle" class="label" font-weight="bold">❷ 主从同步延迟</text>
<text x="330" y="110" class="small">主节点加锁后宕机</text>
<text x="330" y="130" class="small">从节点还未同步锁信息</text>
<text x="330" y="150" class="small">→ 锁丢失</text>
<rect x="570" y="60" width="240" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="690" y="85" text-anchor="middle" class="label" font-weight="bold">❸ 不可重入</text>
<text x="590" y="110" class="small">同一线程无法多次获取锁</text>
<text x="590" y="130" class="small">→ 递归调用时死锁</text>
<text x="590" y="150" class="small">→ 需要记录持有者信息</text>
<rect x="50" y="180" width="240" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="170" y="205" text-anchor="middle" class="label" font-weight="bold">❹ 锁续期问题</text>
<text x="70" y="230" class="small">业务执行时间不确定</text>
<text x="70" y="250" class="small">→ 固定过期时间不合理</text>
<text x="70" y="270" class="small">→ 需要自动续期</text>
<rect x="310" y="180" width="240" height="100" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="430" y="205" text-anchor="middle" class="label" font-weight="bold">❺ 单点故障</text>
<text x="330" y="230" class="small">Redis 单节点宕机</text>
<text x="330" y="250" class="small">→ 锁服务不可用</text>
<text x="330" y="270" class="small">→ 需要多节点方案</text>
<rect x="100" y="320" width="650" height="250" fill="#fafafa" stroke="#666" stroke-width="2" rx="5"/>
<text x="425" y="350" text-anchor="middle" class="label" font-weight="bold">解决方案总览</text>
<text x="130" y="385" class="small" font-weight="bold">问题 ➡️ 解决方案</text>
<text x="130" y="415" class="small">❶ 锁超时 → 实现看门狗（Watchdog）自动续期</text>
<text x="130" y="445" class="small">❷ 主从延迟 → 使用 Redlock 算法（多节点）</text>
<text x="130" y="475" class="small">❸ 不可重入 → 使用 Hash 结构存储重入次数</text>
<text x="130" y="505" class="small">❹ 锁续期 → 后台线程定期续期（Redisson）</text>
<text x="130" y="535" class="small">❺ 单点故障 → 使用 Redlock / Redis 集群</text>
</svg>

2. **问题1：锁超时 - 解决方案（看门狗机制）**

```python
import threading
import time

class RedisLockWithWatchdog:
    def __init__(self, redis_client, lock_key, timeout=30):
        self.redis = redis_client
        self.lock_key = lock_key
        self.timeout = timeout
        self.identifier = str(uuid.uuid4())
        self.watchdog_thread = None
        self.stop_watchdog = False

    def acquire(self):
        """获取锁"""
        result = self.redis.set(
            self.lock_key, self.identifier,
            nx=True, ex=self.timeout
        )
        if result:
            # 启动看门狗线程，自动续期
            self.start_watchdog()
        return result is not None

    def start_watchdog(self):
        """启动看门狗线程，定期续期"""
        def renew_lock():
            while not self.stop_watchdog:
                time.sleep(self.timeout / 3)  # 每 1/3 超时时间续期一次
                lua_script = """
                if redis.call('GET', KEYS[1]) == ARGV[1] then
                    return redis.call('EXPIRE', KEYS[1], ARGV[2])
                else
                    return 0
                end
                """
                self.redis.eval(
                    lua_script, 1,
                    self.lock_key, self.identifier, self.timeout
                )

        self.watchdog_thread = threading.Thread(target=renew_lock, daemon=True)
        self.watchdog_thread.start()

    def release(self):
        """释放锁"""
        self.stop_watchdog = True  # 停止看门狗
        lua_script = """
        if redis.call('GET', KEYS[1]) == ARGV[1] then
            return redis.call('DEL', KEYS[1])
        else
            return 0
        end
        """
        self.redis.eval(lua_script, 1, self.lock_key, self.identifier)
```

3. **问题2：主从同步延迟 - 解决方案（Redlock）**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<text x="400" y="30" text-anchor="middle" class="label" font-weight="bold">主从同步延迟问题</text>
<rect x="50" y="60" width="330" height="150" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="215" y="85" text-anchor="middle" class="label" font-weight="bold">❌ 问题场景</text>
<text x="80" y="115" class="small">① Client A 在 Master 获取锁</text>
<text x="80" y="140" class="small">② Master 宕机（锁未同步到 Slave）</text>
<text x="80" y="165" class="small">③ Slave 升级为 Master</text>
<text x="80" y="190" class="small">④ Client B 在新 Master 获取同一把锁</text>
<rect x="420" y="60" width="330" height="150" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="585" y="85" text-anchor="middle" class="label" font-weight="bold">✅ Redlock 方案</text>
<text x="450" y="115" class="small">① 部署 5 个独立的 Redis 节点</text>
<text x="450" y="140" class="small">② 依次在所有节点获取锁</text>
<text x="450" y="165" class="small">③ 超过半数（3/5）成功才算获取锁</text>
<text x="450" y="190" class="small">④ 避免单点故障和主从延迟问题</text>
<rect x="150" y="240" width="500" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="270" text-anchor="middle" class="label" font-weight="bold">Redlock 获取锁流程</text>
<text x="180" y="300" class="small">1. 获取当前时间戳 T1</text>
<text x="180" y="325" class="small">2. 依次在 N 个节点尝试获取锁（设置超时时间）</text>
<text x="180" y="350" class="small">3. 计算获取锁的总耗时 = T2 - T1</text>
<text x="180" y="375" class="small">4. 如果超过半数节点成功 AND 总耗时 &lt; 锁有效期</text>
<text x="200" y="400" class="small">→ 获取锁成功，有效期 = 原有效期 - 总耗时 - 时钟漂移</text>
</svg>

4. **问题3：不可重入 - 解决方案（Hash 结构）**

```python
class ReentrantRedisLock:
    """可重入的 Redis 锁"""

    def acquire(self):
        """获取锁（支持重入）"""
        lua_script = """
        if redis.call('EXISTS', KEYS[1]) == 0 then
            -- 锁不存在，创建锁并设置重入次数为 1
            redis.call('HSET', KEYS[1], ARGV[1], 1)
            redis.call('EXPIRE', KEYS[1], ARGV[2])
            return 1
        elseif redis.call('HEXISTS', KEYS[1], ARGV[1]) == 1 then
            -- 锁存在且是当前线程持有，重入次数+1
            redis.call('HINCRBY', KEYS[1], ARGV[1], 1)
            redis.call('EXPIRE', KEYS[1], ARGV[2])
            return 1
        else
            -- 锁被其他线程持有
            return 0
        end
        """
        result = self.redis.eval(
            lua_script, 1,
            self.lock_key, self.identifier, self.timeout
        )
        return result == 1

    def release(self):
        """释放锁（支持重入）"""
        lua_script = """
        if redis.call('HEXISTS', KEYS[1], ARGV[1]) == 0 then
            -- 锁不存在或不是当前线程持有
            return 0
        else
            local count = redis.call('HINCRBY', KEYS[1], ARGV[1], -1)
            if count > 0 then
                -- 重入次数-1，但还未归零，不释放锁
                redis.call('EXPIRE', KEYS[1], ARGV[2])
                return 0
            else
                -- 重入次数归零，释放锁
                redis.call('DEL', KEYS[1])
                return 1
            end
        end
        """
        self.redis.eval(lua_script, 1, self.lock_key, self.identifier, self.timeout)
```

**数据结构**：
```
HSET lock:order:1001
  thread-uuid-1234  3    # 重入次数
```

5. **五大问题对比表**

| 问题 | 影响 | 解决方案 | 实现难度 |
|------|------|---------|---------|
| 锁超时 | 并发安全问题 | 看门狗自动续期 | ⭐⭐ 中等 |
| 主从延迟 | 锁丢失 | Redlock 算法 | ⭐⭐⭐ 复杂 |
| 不可重入 | 死锁 | Hash 结构存储重入次数 | ⭐⭐ 中等 |
| 锁续期 | 业务中断 | 后台线程续期 | ⭐⭐ 中等 |
| 单点故障 | 服务不可用 | 多节点 / 集群 | ⭐⭐⭐ 复杂 |

6. **生产级方案推荐：Redisson**

```java
// Redisson 自动解决了上述所有问题
Config config = new Config();
config.useSingleServer().setAddress("redis://127.0.0.1:6379");
RedissonClient redisson = Redisson.create(config);

// 获取锁（自动续期、可重入）
RLock lock = redisson.getLock("order:lock:1001");

try {
    // 尝试加锁：等待100秒，持有30秒（自动续期）
    boolean res = lock.tryLock(100, 30, TimeUnit.SECONDS);
    if (res) {
        // 处理业务逻辑
    }
} finally {
    lock.unlock();
}
```

**Redisson 特性**：
- ✅ 自动续期（看门狗）
- ✅ 可重入锁
- ✅ 公平锁
- ✅ 读写锁
- ✅ RedLock 支持

**关键要点**

| 问题 | 解决方案 | 关键技术 |
|------|---------|---------|
| 锁超时 | 看门狗续期 | 后台线程 + EXPIRE |
| 主从延迟 | Redlock | 多节点半数成功 |
| 不可重入 | Hash 结构 | HSET + 计数器 |
| 锁续期 | 自动续期 | 定时任务 |
| 单点故障 | 集群/Redlock | 高可用架构 |

**记忆口诀**

```
超时续期看门狗（锁超时）
主从延迟用 Redlock（同步问题）
重入计数 Hash 存储（可重入）
后台线程自动续（续期）
多节点来防故障（高可用）
```

### 38. 什么是 Redlock？

**核心答案**

Redlock 是 Redis 作者提出的分布式锁算法，通过在**多个独立的 Redis 节点**（至少 5 个）上获取锁，**超过半数节点成功**才算获取锁成功，解决单点故障和主从同步延迟问题。

**详细说明**

1. **Redlock 架构**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<text x="400" y="30" text-anchor="middle" class="label" font-weight="bold" font-size="16">Redlock 分布式锁架构</text>
<rect x="100" y="70" width="120" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="160" y="100" text-anchor="middle" class="label" font-weight="bold">Redis-1</text>
<text x="160" y="125" text-anchor="middle" class="small">独立节点</text>
<rect x="250" y="70" width="120" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="310" y="100" text-anchor="middle" class="label" font-weight="bold">Redis-2</text>
<text x="310" y="125" text-anchor="middle" class="small">独立节点</text>
<rect x="400" y="70" width="120" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="460" y="100" text-anchor="middle" class="label" font-weight="bold">Redis-3</text>
<text x="460" y="125" text-anchor="middle" class="small">独立节点</text>
<rect x="550" y="70" width="120" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="610" y="100" text-anchor="middle" class="label" font-weight="bold">Redis-4</text>
<text x="610" y="125" text-anchor="middle" class="small">独立节点</text>
<rect x="30" y="70" width="40" height="80" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="50" y="115" text-anchor="middle" class="small" transform="rotate(-90 50 115)">5个独立节点</text>
<ellipse cx="400" cy="250" rx="180" ry="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="400" y="245" text-anchor="middle" class="label" font-weight="bold">Client</text>
<text x="400" y="265" text-anchor="middle" class="small">依次获取锁</text>
<path d="M 160 150 L 340 230" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 310 150 L 370 230" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 460 150 L 420 230" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 610 150 L 450 230" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow2)"/>
<rect x="100" y="350" width="600" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="380" text-anchor="middle" class="label" font-weight="bold">获取锁的判断条件（需同时满足）</text>
<text x="130" y="415" class="small">✅ 条件1：成功节点数 ≥ (N/2 + 1)</text>
<text x="180" y="440" class="small">例如：5个节点至少成功3个</text>
<text x="130" y="475" class="small">✅ 条件2：总耗时 &lt; 锁的有效期</text>
<text x="180" y="500" class="small">有效期 = 原有效期 - 总耗时 - 时钟漂移</text>
<defs>
<marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#4caf50"/>
</marker>
</defs>
</svg>

2. **Redlock 算法步骤**

**获取锁**：
```python
import time
import redis

def acquire_lock_redlock(redis_nodes, lock_key, identifier, timeout=30):
    """
    Redlock 获取锁算法
    :param redis_nodes: Redis 节点列表
    :param lock_key: 锁的键名
    :param identifier: 唯一标识（UUID）
    :param timeout: 锁的超时时间（秒）
    :return: 是否成功获取锁
    """
    # 步骤1：获取当前时间戳（毫秒）
    start_time = int(time.time() * 1000)

    # 步骤2：依次在所有节点尝试获取锁
    success_count = 0
    for redis_node in redis_nodes:
        try:
            # 设置单个节点的超时时间（避免阻塞太久）
            result = redis_node.set(
                lock_key, identifier,
                nx=True, px=timeout * 1000  # 毫秒
            )
            if result:
                success_count += 1
        except Exception as e:
            # 节点不可用，跳过
            continue

    # 步骤3：计算总耗时
    elapsed_time = int(time.time() * 1000) - start_time

    # 步骤4：判断是否获取锁成功
    # 条件1：成功节点数 >= N/2 + 1
    # 条件2：总耗时 < 锁有效期
    quorum = len(redis_nodes) // 2 + 1
    if success_count >= quorum and elapsed_time < timeout * 1000:
        # 获取锁成功
        return True, timeout * 1000 - elapsed_time  # 返回剩余有效期
    else:
        # 获取锁失败，释放已获取的锁
        release_lock_redlock(redis_nodes, lock_key, identifier)
        return False, 0


def release_lock_redlock(redis_nodes, lock_key, identifier):
    """
    Redlock 释放锁
    """
    lua_script = """
    if redis.call('GET', KEYS[1]) == ARGV[1] then
        return redis.call('DEL', KEYS[1])
    else
        return 0
    end
    """
    for redis_node in redis_nodes:
        try:
            redis_node.eval(lua_script, 1, lock_key, identifier)
        except:
            continue
```

**使用示例**：
```python
# 创建 5 个独立的 Redis 连接
redis_nodes = [
    redis.Redis(host='redis1.example.com', port=6379),
    redis.Redis(host='redis2.example.com', port=6379),
    redis.Redis(host='redis3.example.com', port=6379),
    redis.Redis(host='redis4.example.com', port=6379),
    redis.Redis(host='redis5.example.com', port=6379),
]

# 获取锁
success, valid_time = acquire_lock_redlock(
    redis_nodes,
    "order:lock:1001",
    "uuid-xxxx",
    timeout=30
)

if success:
    try:
        print(f"获取锁成功，剩余有效期：{valid_time}ms")
        # 处理业务逻辑
    finally:
        release_lock_redlock(redis_nodes, "order:lock:1001", "uuid-xxxx")
else:
    print("获取锁失败")
```

3. **Redlock 流程图**

```
时间线：
T1 = 当前时间

Client                Redis-1    Redis-2    Redis-3    Redis-4    Redis-5
  |                      |          |          |          |          |
  |---SET lock uuid---->✅         |          |          |          |
  |---SET lock uuid--------------->✅         |          |          |
  |---SET lock uuid--------------------------->✅         |          |
  |---SET lock uuid---------------------------------------->❌        |
  |---SET lock uuid------------------------------------------------>❌
  |                      |          |          |          |          |

T2 = 当前时间
耗时 = T2 - T1 = 50ms
成功节点 = 3/5 ≥ 3（半数）
耗时 50ms < 锁有效期 30000ms

✅ 获取锁成功！
实际有效期 = 30000 - 50 - 时钟漂移(10ms) = 29940ms
```

4. **Redlock vs 单节点锁**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="50" width="330" height="300" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="215" y="80" text-anchor="middle" class="label" font-weight="bold">单节点锁（主从）</text>
<text x="80" y="115" class="small" font-weight="bold">优点：</text>
<text x="90" y="140" class="small">✅ 实现简单</text>
<text x="90" y="165" class="small">✅ 性能高</text>
<text x="90" y="190" class="small">✅ 延迟低</text>
<text x="80" y="225" class="small" font-weight="bold">缺点：</text>
<text x="90" y="250" class="small">❌ 主从同步延迟导致锁丢失</text>
<text x="90" y="275" class="small">❌ 主节点宕机，锁不可用</text>
<text x="90" y="300" class="small">❌ 单点故障</text>
<rect x="420" y="50" width="330" height="300" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="585" y="80" text-anchor="middle" class="label" font-weight="bold">Redlock（多节点）</text>
<text x="450" y="115" class="small" font-weight="bold">优点：</text>
<text x="460" y="140" class="small">✅ 避免主从同步延迟问题</text>
<text x="460" y="165" class="small">✅ 高可用（容忍部分节点故障）</text>
<text x="460" y="190" class="small">✅ 更强的安全性</text>
<text x="450" y="225" class="small" font-weight="bold">缺点：</text>
<text x="460" y="250" class="small">❌ 实现复杂</text>
<text x="460" y="275" class="small">❌ 性能较低（需要多次网络请求）</text>
<text x="460" y="300" class="small">❌ 时钟依赖（需要时钟同步）</text>
</svg>

5. **Redlock 的争议**

| 观点 | 支持者 | 反对理由 |
|------|--------|---------|
| **支持** | Redis 作者 Antirez | 提供更强的安全保证，适合对一致性要求高的场景 |
| **反对** | Martin Kleppmann | 依赖时钟同步，时钟漂移可能导致安全问题；不如使用 ZooKeeper/etcd |

**Martin 的质疑**：
- ⚠️ **时钟漂移**：节点时钟不同步可能导致锁失效
- ⚠️ **GC 暂停**：进程 GC 导致锁过期
- ⚠️ **网络分区**：网络问题可能导致同时获取锁

**Antirez 的回应**：
- ✅ Redlock 依赖相对时间，不需要绝对时钟同步
- ✅ 通过 fencing token 机制防止过期锁的使用
- ✅ 适合大部分场景，完美方案需要使用 ZooKeeper

6. **何时使用 Redlock？**

| 场景 | 是否使用 Redlock | 推荐方案 |
|------|----------------|---------|
| 高并发秒杀 | ⚠️ 不推荐 | 单节点 + Lua 脚本 |
| 订单处理 | ✅ 推荐 | Redlock 或 Redisson |
| 定时任务调度 | ✅ 推荐 | Redlock 或 ZooKeeper |
| 强一致性要求 | ❌ 不推荐 | ZooKeeper / etcd |
| 高性能要求 | ❌ 不推荐 | 单节点 Redis 锁 |

**关键要点**

- ✅ Redlock 需要至少 5 个独立的 Redis 节点
- ✅ 超过半数节点成功才算获取锁成功
- ✅ 解决主从同步延迟和单点故障问题
- ⚠️ 依赖时钟同步，存在争议
- ⚠️ 实现复杂，性能较单节点低

**记忆口诀**

```
五个节点独立部署（架构）
半数成功才算锁（条件）
避免主从延迟问题（优点）
时钟依赖有争议（缺点）
```

### 39. Redis 的事务和 MySQL 的事务有什么区别？

**核心答案**

Redis 事务是**轻量级、弱 ACID**，不支持回滚，适合简单原子操作；MySQL 事务是**完整 ACID**，支持回滚和复杂事务逻辑，但性能较低。

**详细说明**

1. **核心区别对比**

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<text x="450" y="30" text-anchor="middle" class="label" font-weight="bold" font-size="16">Redis 事务 vs MySQL 事务</text>
<rect x="50" y="60" width="380" height="550" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="240" y="90" text-anchor="middle" class="label" font-weight="bold">Redis 事务</text>
<text x="80" y="125" class="small" font-weight="bold">命令：</text>
<text x="90" y="150" class="small">MULTI / EXEC / DISCARD</text>
<text x="80" y="185" class="small" font-weight="bold">原子性：</text>
<text x="90" y="210" class="small">⚠️ 部分支持</text>
<text x="90" y="230" class="small">• 语法错误：不执行</text>
<text x="90" y="250" class="small">• 运行错误：继续执行</text>
<text x="80" y="285" class="small" font-weight="bold">隔离性：</text>
<text x="90" y="310" class="small">✅ 完全支持</text>
<text x="90" y="330" class="small">• 单线程，天然隔离</text>
<text x="80" y="365" class="small" font-weight="bold">持久性：</text>
<text x="90" y="390" class="small">❌ 不保证</text>
<text x="90" y="410" class="small">• 取决于持久化配置</text>
<text x="80" y="445" class="small" font-weight="bold">回滚：</text>
<text x="90" y="470" class="small">❌ 不支持</text>
<text x="90" y="490" class="small">• 性能优先，无回滚</text>
<text x="80" y="525" class="small" font-weight="bold">适用场景：</text>
<text x="90" y="550" class="small">✅ 简单原子操作</text>
<text x="90" y="570" class="small">✅ 高性能要求</text>
<text x="90" y="590" class="small">✅ 缓存更新</text>
<rect x="470" y="60" width="380" height="550" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="660" y="90" text-anchor="middle" class="label" font-weight="bold">MySQL 事务</text>
<text x="500" y="125" class="small" font-weight="bold">命令：</text>
<text x="510" y="150" class="small">BEGIN / COMMIT / ROLLBACK</text>
<text x="500" y="185" class="small" font-weight="bold">原子性：</text>
<text x="510" y="210" class="small">✅ 完全支持</text>
<text x="510" y="230" class="small">• 通过 undo log 实现</text>
<text x="510" y="250" class="small">• 支持回滚</text>
<text x="500" y="285" class="small" font-weight="bold">隔离性：</text>
<text x="510" y="310" class="small">✅ 四种隔离级别</text>
<text x="510" y="330" class="small">• READ UNCOMMITTED</text>
<text x="510" y="350" class="small">• READ COMMITTED</text>
<text x="510" y="370" class="small">• REPEATABLE READ（默认）</text>
<text x="510" y="390" class="small">• SERIALIZABLE</text>
<text x="500" y="425" class="small" font-weight="bold">持久性：</text>
<text x="510" y="450" class="small">✅ 完全支持</text>
<text x="510" y="470" class="small">• redo log 保证持久化</text>
<text x="500" y="505" class="small" font-weight="bold">回滚：</text>
<text x="510" y="530" class="small">✅ 支持</text>
<text x="510" y="550" class="small">• ROLLBACK 回滚所有操作</text>
<text x="500" y="585" class="small" font-weight="bold">适用场景：</text>
<text x="510" y="610" class="small">✅ 复杂事务逻辑</text>
<text x="510" y="630" class="small">✅ 强一致性要求</text>
<text x="510" y="650" class="small">✅ 金融、订单等业务</text>
</svg>

2. **ACID 特性对比**

| 特性 | Redis | MySQL | 说明 |
|------|-------|-------|------|
| **原子性** | ⚠️ 部分 | ✅ 完全 | Redis 运行时错误不回滚，MySQL 支持回滚 |
| **一致性** | ❌ 不保证 | ✅ 保证 | Redis 无约束检查，MySQL 有外键、唯一索引等 |
| **隔离性** | ✅ 完全 | ✅ 完全 | Redis 单线程天然隔离，MySQL 多种隔离级别 |
| **持久性** | ❌ 不保证 | ✅ 保证 | Redis 取决于持久化策略，MySQL 通过 redo log 保证 |

3. **具体差异示例**

**(1) 回滚支持**

```sql
-- MySQL: 支持回滚
START TRANSACTION;
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2; -- 失败
ROLLBACK;  -- 全部回滚，账户1的余额不变
```

```bash
# Redis: 不支持回滚
MULTI
DECRBY balance:1 100
INCRBY balance:2 100  # 失败（例如类型错误）
EXEC  # 第一条已执行，无法回滚
```

**(2) 隔离级别**

| | Redis | MySQL |
|---|-------|-------|
| **隔离机制** | 单线程，命令顺序执行 | MVCC（多版本并发控制） |
| **隔离级别** | 只有一种（类似 SERIALIZABLE） | 四种可选 |
| **并发控制** | 乐观锁（WATCH） | 悲观锁（行锁、表锁） |

**(3) 错误处理**

```bash
# Redis: 语法错误不执行，运行错误继续
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> SET key1 "value1"
QUEUED
127.0.0.1:6379> INCR key1  # 运行时错误
QUEUED
127.0.0.1:6379> SET key2 "value2"
QUEUED
127.0.0.1:6379> EXEC
1) OK
2) (error) ERR value is not an integer  # 错误
3) OK  # 第3条继续执行
```

```sql
-- MySQL: 任何错误都会导致整个事务回滚
START TRANSACTION;
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 'abc' WHERE id = 2; -- 错误
-- 整个事务自动回滚，第1条也不执行
```

4. **性能对比**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<text x="400" y="30" text-anchor="middle" class="label" font-weight="bold">性能特点对比</text>
<rect x="50" y="60" width="330" height="250" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="215" y="90" text-anchor="middle" class="label" font-weight="bold">Redis 事务（高性能）</text>
<text x="80" y="125" class="small" font-weight="bold">优点：</text>
<text x="90" y="150" class="small">⚡ 内存操作，极快</text>
<text x="90" y="175" class="small">⚡ 单线程，无锁开销</text>
<text x="90" y="200" class="small">⚡ 无回滚机制，轻量级</text>
<text x="80" y="235" class="small" font-weight="bold">性能：</text>
<text x="90" y="260" class="small">10万+ QPS</text>
<text x="90" y="285" class="small">微秒级延迟</text>
<rect x="420" y="60" width="330" height="250" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="585" y="90" text-anchor="middle" class="label" font-weight="bold">MySQL 事务（可靠性）</text>
<text x="450" y="125" class="small" font-weight="bold">开销：</text>
<text x="460" y="150" class="small">📝 undo log 记录</text>
<text x="460" y="175" class="small">📝 redo log 持久化</text>
<text x="460" y="200" class="small">🔒 锁机制开销</text>
<text x="460" y="225" class="small">💾 磁盘 I/O</text>
<text x="450" y="260" class="small" font-weight="bold">性能：</text>
<text x="460" y="285" class="small">几千 TPS</text>
<text x="460" y="310" class="small">毫秒级延迟</text>
</svg>

5. **使用场景对比**

| 场景 | Redis 事务 | MySQL 事务 | 原因 |
|------|-----------|-----------|------|
| **秒杀扣库存** | ✅ 推荐 | ❌ | Redis 性能高，Lua 脚本原子性 |
| **账户转账** | ❌ | ✅ 推荐 | 需要强一致性和回滚 |
| **订单处理** | ❌ | ✅ 推荐 | 涉及多表，需要复杂事务 |
| **缓存更新** | ✅ 推荐 | ❌ | 简单操作，性能优先 |
| **计数器** | ✅ 推荐 | ❌ | INCR 原子操作，无需事务 |
| **分布式锁** | ✅ 推荐 | ❌ | Redis 性能高，支持过期 |

6. **命令对比**

| 操作 | Redis | MySQL |
|------|-------|-------|
| **开启事务** | `MULTI` | `START TRANSACTION` 或 `BEGIN` |
| **提交事务** | `EXEC` | `COMMIT` |
| **回滚事务** | ❌ 不支持 | `ROLLBACK` |
| **取消事务** | `DISCARD` | `ROLLBACK` |
| **乐观锁** | `WATCH` | MVCC（自动） |
| **设置隔离级别** | ❌ 无 | `SET TRANSACTION ISOLATION LEVEL` |
| **保存点** | ❌ 不支持 | `SAVEPOINT` |

7. **为什么 Redis 不支持回滚？**

Redis 作者的解释：
- ✅ **性能优先**：回滚需要额外的日志记录和回滚逻辑，影响性能
- ✅ **简化设计**：Redis 追求简单、高性能
- ✅ **错误预防**：命令在入队时已做语法检查，运行错误多由程序 bug 导致
- ✅ **使用场景**：Redis 主要用于简单操作，不适合复杂事务

**关键要点**

| 维度 | Redis | MySQL |
|------|-------|-------|
| 设计目标 | 高性能、轻量级 | 完整 ACID、可靠性 |
| 回滚 | ❌ 不支持 | ✅ 支持 |
| 隔离级别 | 单一（类似 SERIALIZABLE） | 四种可选 |
| 持久性 | 取决于配置 | 保证持久化 |
| 适用场景 | 简单原子操作 | 复杂事务逻辑 |
| 性能 | 10万+ QPS | 几千 TPS |

**记忆口诀**

```
Redis 轻量高性能（特点）
不支持回滚要记牢（核心）
MySQL 完整 ACID 全（优势）
复杂事务它最好（场景）
```
