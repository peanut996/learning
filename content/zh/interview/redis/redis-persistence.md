## 持久化

### 15. Redis 的持久化机制有哪些？

**核心答案**:Redis 提供三种持久化机制：RDB(快照持久化)、AOF(日志持久化)、混合持久化(RDB+AOF),用于将内存中的数据保存到磁盘,防止数据丢失。

**详细说明**:

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis 持久化机制全景图</text>
<rect x="30" y="60" width="790" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">三种持久化机制对比</text>
<rect x="50" y="110" width="240" height="130" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ RDB 快照</text>
<text x="60" y="160" font-size="10">• 全量数据快照</text>
<text x="60" y="178" font-size="10">• 二进制文件</text>
<text x="60" y="196" font-size="10">• 定时备份</text>
<text x="60" y="220" font-size="9" fill="#1976d2" font-weight="bold">✓ 恢复快,体积小</text>
<rect x="305" y="110" width="240" height="130" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ AOF 日志</text>
<text x="315" y="160" font-size="10">• 记录写命令</text>
<text x="315" y="178" font-size="10">• 追加日志</text>
<text x="315" y="196" font-size="10">• 实时/秒级</text>
<text x="315" y="220" font-size="9" fill="#388e3c" font-weight="bold">✓ 数据完整性好</text>
<rect x="560" y="110" width="240" height="130" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 混合持久化</text>
<text x="570" y="160" font-size="10">• RDB + AOF</text>
<text x="570" y="178" font-size="10">• 4.0+ 版本</text>
<text x="570" y="196" font-size="10">• 结合优点</text>
<text x="570" y="220" font-size="9" fill="#f57c00" font-weight="bold">✓ 最佳方案</text>
<rect x="30" y="280" width="790" height="240" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="310" text-anchor="middle" font-size="14" font-weight="bold">详细对比</text>
<rect x="50" y="330" width="180" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="355" text-anchor="middle" font-size="11" font-weight="bold">RDB 特点</text>
<text x="60" y="380" font-size="9">优点:</text>
<text x="60" y="398" font-size="9">• 恢复速度快</text>
<text x="60" y="414" font-size="9">• 文件体积小</text>
<text x="60" y="438" font-size="9">缺点:</text>
<text x="60" y="456" font-size="9">• 可能丢失数据</text>
<text x="60" y="472" font-size="9">• fork阻塞</text>
<rect x="245" y="330" width="180" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="355" text-anchor="middle" font-size="11" font-weight="bold">AOF 特点</text>
<text x="255" y="380" font-size="9">优点:</text>
<text x="255" y="398" font-size="9">• 数据完整</text>
<text x="255" y="414" font-size="9">• 可读性好</text>
<text x="255" y="438" font-size="9">缺点:</text>
<text x="255" y="456" font-size="9">• 文件体积大</text>
<text x="255" y="472" font-size="9">• 恢复慢</text>
<rect x="440" y="330" width="180" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="355" text-anchor="middle" font-size="11" font-weight="bold">混合持久化</text>
<text x="450" y="380" font-size="9">优点:</text>
<text x="450" y="398" font-size="9">• 恢复快(RDB)</text>
<text x="450" y="414" font-size="9">• 数据全(AOF)</text>
<text x="450" y="438" font-size="9">缺点:</text>
<text x="450" y="456" font-size="9">• 兼容性(4.0+)</text>
<rect x="635" y="330" width="170" height="170" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="355" text-anchor="middle" font-size="11" font-weight="bold">选择建议</text>
<text x="645" y="380" font-size="9">• 默认:混合</text>
<text x="645" y="398" font-size="9">• 性能优先:RDB</text>
<text x="645" y="414" font-size="9">• 数据优先:AOF</text>
<text x="645" y="438" font-size="9">• 开发环境:</text>
<text x="645" y="456" font-size="9">  可不开启</text>
</svg>

**三种持久化机制详解**:

**1. RDB (Redis Database)**:
- **方式**：定期生成数据快照
- **文件**:dump.rdb 二进制文件
- **触发**:
  - 手动:SAVE(阻塞) 或 BGSAVE(后台)
  - 自动:配置 save 规则
- **优点**:
  - 恢复速度快
  - 文件体积小,紧凑
  - 适合备份和灾难恢复
- **缺点**:
  - 可能丢失最后一次快照后的数据
  - fork 子进程时短暂阻塞
  - 数据量大时 fork 耗时

**2. AOF (Append Only File)**:
- **方式**：记录每个写命令
- **文件**:appendonly.aof 文本文件
- **同步策略**:
  - always:每个命令立即写入(最安全,最慢)
  - everysec:每秒写入(推荐,平衡)
  - no:由操作系统决定(最快,可能丢失较多)
- **优点**:
  - 数据完整性好
  - 文件可读,易于分析
  - 支持重写压缩
- **缺点**:
  - 文件体积大
  - 恢复速度慢
  - 性能略低于 RDB

**3. 混合持久化 (RDB + AOF)**:
- **版本**:Redis 4.0+ 引入
- **原理**:
  - AOF 重写时,先写入 RDB 快照
  - 再追加增量 AOF 日志
  - 兼顾两者优点
- **配置**:
  ```bash
  aof-use-rdb-preamble yes  # 开启混合持久化
  ```
- **优点**:
  - 恢复速度快(RDB部分)
  - 数据完整(AOF增量)
  - 文件体积适中
- **推荐使用**

**持久化机制对比**:

| 特性 | RDB | AOF | 混合持久化 |
|-----|-----|-----|-----------|
| **文件体积** | 小 | 大 | 中等 |
| **恢复速度** | 快 | 慢 | 快 |
| **数据完整性** | 差(可能丢分钟级) | 好(丢秒级) | 好 |
| **性能影响** | 低(定期) | 中(实时) | 中 |
| **文件格式** | 二进制 | 文本 | 二进制+文本 |
| **可读性** | 不可读 | 可读 | 部分可读 |
| **适用场景** | 备份,灾难恢复 | 数据安全优先 | 生产环境推荐 |

**配置示例**:

**RDB 配置**:
```bash
# redis.conf

# 自动触发规则(时间 变更次数)
save 900 1      # 900秒内至少1个key改变,触发
save 300 10     # 300秒内至少10个key改变
save 60 10000   # 60秒内至少10000个key改变

# RDB 文件名
dbfilename dump.rdb

# RDB 文件路径
dir /var/lib/redis/

# 是否压缩
rdbcompression yes

# 是否校验
rdbchecksum yes

# BGSAVE失败是否停止写入
stop-writes-on-bgsave-error yes
```

**AOF 配置**:
```bash
# redis.conf

# 启用AOF
appendonly yes

# AOF 文件名
appendfilename "appendonly.aof"

# 同步策略
appendfsync everysec  # always | everysec | no

# AOF重写触发条件
auto-aof-rewrite-percentage 100  # 文件大小增长100%触发
auto-aof-rewrite-min-size 64mb   # 最小64MB才触发

# 重写时是否继续fsync
no-appendfsync-on-rewrite no

# 加载时忽略最后不完整命令
aof-load-truncated yes
```

**混合持久化配置**:
```bash
# redis.conf (4.0+)

# 同时开启RDB和AOF
save 900 1
appendonly yes

# 开启混合持久化
aof-use-rdb-preamble yes
```

**手动触发命令**:

```bash
# RDB
SAVE        # 同步保存(阻塞,不推荐)
BGSAVE      # 后台保存(推荐)

# AOF
BGREWRITEAOF  # 后台重写AOF

# 查看最后一次持久化时间
LASTSAVE

# 查看持久化状态
INFO persistence
```

**持久化流程**:

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">RDB vs AOF 持久化流程</text>
<rect x="50" y="60" width="320" height="300" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="210" y="90" text-anchor="middle" font-size="13" font-weight="bold">RDB 流程</text>
<rect x="70" y="110" width="280" height="40" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="210" y="135" text-anchor="middle" font-size="10">1. 触发BGSAVE(手动或自动)</text>
<rect x="70" y="160" width="280" height="40" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="210" y="185" text-anchor="middle" font-size="10">2. fork子进程</text>
<rect x="70" y="210" width="280" height="40" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="210" y="235" text-anchor="middle" font-size="10">3. 子进程写入临时RDB文件</text>
<rect x="70" y="260" width="280" height="40" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="210" y="285" text-anchor="middle" font-size="10">4. 替换旧RDB文件</text>
<rect x="70" y="310" width="280" height="40" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="210" y="335" text-anchor="middle" font-size="10">5. 持久化完成</text>
<rect x="430" y="60" width="320" height="300" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="590" y="90" text-anchor="middle" font-size="13" font-weight="bold">AOF 流程</text>
<rect x="450" y="110" width="280" height="40" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="590" y="135" text-anchor="middle" font-size="10">1. 接收写命令</text>
<rect x="450" y="160" width="280" height="40" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="590" y="185" text-anchor="middle" font-size="10">2. 追加到AOF缓冲区</text>
<rect x="450" y="210" width="280" height="40" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="590" y="235" text-anchor="middle" font-size="10">3. 根据策略fsync到磁盘</text>
<rect x="450" y="260" width="280" height="40" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="590" y="285" text-anchor="middle" font-size="10">4. 文件过大时重写AOF</text>
<rect x="450" y="310" width="280" height="40" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="590" y="335" text-anchor="middle" font-size="10">5. 持久化完成</text>
</svg>

**数据恢复优先级**:
1. **同时存在 AOF 和 RDB**:优先使用 AOF(数据更完整)
2. **只有 RDB**:使用 RDB 恢复
3. **只有 AOF**:使用 AOF 恢复

**使用建议**:

| 场景 | 推荐方案 | 原因 |
|-----|---------|------|
| **生产环境** | 混合持久化(RDB+AOF) | 平衡性能和安全 |
| **开发环境** | 不开启或仅RDB | 性能优先 |
| **缓存场景** | 仅RDB或不开启 | 可接受数据丢失 |
| **金融/支付** | AOF(always) | 数据安全第一 |
| **大数据量** | RDB | 恢复速度重要 |

**性能优化**:
1. **RDB 优化**:
   - 调整 save 规则,避免频繁触发
   - 避免在业务高峰期手动 BGSAVE

2. **AOF 优化**:
   - 使用 everysec 策略(推荐)
   - 定期重写 AOF,控制文件大小
   - 重写时暂停 fsync(no-appendfsync-on-rewrite yes)

3. **混合优化**:
   - 合理设置重写阈值
   - 监控 fork 时间,避免大量写入时触发

**关键要点**:
- ✓ **三种机制**:RDB、AOF、混合持久化
- ✓ **RDB特点**：快照,恢复快,可能丢数据
- ✓ **AOF特点**：日志,数据全,文件大
- ✓ **混合最优**:4.0+推荐,兼顾优点
- ✓ **恢复优先级**:AOF > RDB
- ⚠ **性能影响**：持久化会影响性能
- ⚠ **磁盘空间**:AOF文件可能很大
- ⚠ **fork阻塞**：数据量大时注意

**记忆口诀**:Redis持久化三机制,RDB快照AOF日志,混合持久最推荐,数据安全性能兼顾,生产环境必须开,恢复优先看AOF


### 16. 什么是 RDB？RDB 的工作原理是什么？

**核心答案**:RDB(Redis Database)是 Redis 的快照持久化机制,通过生成某个时间点的全量数据快照保存到磁盘,文件为二进制格式的 dump.rdb,恢复速度快但可能丢失最后一次快照后的数据。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">RDB 快照持久化全景图</text>
<rect x="30" y="60" width="790" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">RDB 的核心特性</text>
<rect x="50" y="110" width="180" height="130" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 全量快照</text>
<text x="60" y="160" font-size="10">• 完整数据副本</text>
<text x="60" y="178" font-size="10">• 二进制格式</text>
<text x="60" y="196" font-size="10">• 紧凑存储</text>
<text x="60" y="220" font-size="9" fill="#1976d2" font-weight="bold">✓ 恢复快</text>
<rect x="245" y="110" width="180" height="130" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ Fork机制</text>
<text x="255" y="160" font-size="10">• 子进程持久化</text>
<text x="255" y="178" font-size="10">• COW写时复制</text>
<text x="255" y="196" font-size="10">• 不阻塞主线程</text>
<text x="255" y="220" font-size="9" fill="#388e3c" font-weight="bold">✓ 异步</text>
<rect x="440" y="110" width="180" height="130" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 触发方式</text>
<text x="450" y="160" font-size="10">• SAVE(阻塞)</text>
<text x="450" y="178" font-size="10">• BGSAVE(后台)</text>
<text x="450" y="196" font-size="10">• 自动触发</text>
<text x="450" y="220" font-size="9" fill="#f57c00" font-weight="bold">✓ 灵活</text>
<rect x="635" y="110" width="170" height="130" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 适用场景</text>
<text x="645" y="160" font-size="10">• 定期备份</text>
<text x="645" y="178" font-size="10">• 灾难恢复</text>
<text x="645" y="196" font-size="10">• 主从复制</text>
<text x="645" y="220" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 高效</text>
<rect x="30" y="280" width="790" height="290" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="310" text-anchor="middle" font-size="14" font-weight="bold">BGSAVE 工作流程</text>
<rect x="50" y="330" width="240" height="220" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="355" text-anchor="middle" font-size="11" font-weight="bold">流程步骤</text>
<text x="60" y="380" font-size="10">1️⃣ Redis fork子进程</text>
<text x="70" y="400" font-size="9">• 主进程继续处理请求</text>
<text x="60" y="425" font-size="10">2️⃣ 子进程遍历数据</text>
<text x="70" y="445" font-size="9">• 序列化所有key-value</text>
<text x="60" y="470" font-size="10">3️⃣ 写入临时文件</text>
<text x="70" y="490" font-size="9">• temp-{pid}.rdb</text>
<text x="60" y="515" font-size="10">4️⃣ 原子替换</text>
<text x="70" y="535" font-size="9">• rename → dump.rdb</text>
<rect x="305" y="330" width="240" height="220" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="355" text-anchor="middle" font-size="11" font-weight="bold">写时复制(COW)</text>
<text x="315" y="385" font-size="10">原理:</text>
<text x="315" y="405" font-size="9">• Fork时共享内存</text>
<text x="315" y="423" font-size="9">• 写操作时才复制页</text>
<text x="315" y="448" font-size="10">优势:</text>
<text x="315" y="468" font-size="9">✓ 节省内存</text>
<text x="315" y="486" font-size="9">✓ Fork速度快</text>
<text x="315" y="511" font-size="10">注意:</text>
<text x="315" y="531" font-size="9">⚠ 大量写入时内存翻倍</text>
<rect x="560" y="330" width="240" height="220" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="355" text-anchor="middle" font-size="11" font-weight="bold">优缺点</text>
<text x="570" y="385" font-size="10">优点:</text>
<text x="570" y="405" font-size="9">✓ 文件紧凑,体积小</text>
<text x="570" y="423" font-size="9">✓ 恢复速度快</text>
<text x="570" y="441" font-size="9">✓ 适合备份</text>
<text x="570" y="466" font-size="10">缺点:</text>
<text x="570" y="486" font-size="9">✗ 可能丢失数据</text>
<text x="570" y="504" font-size="9">✗ Fork时短暂阻塞</text>
<text x="570" y="522" font-size="9">✗ 数据量大时耗时</text>
</svg>

**RDB 的定义**:

**RDB** = **R**edis **D**ata**b**ase
- **本质**：内存数据的全量快照
- **格式**：二进制文件(dump.rdb)
- **时机**：某个时间点的完整数据副本
- **恢复**：直接加载到内存即可

**触发方式**:

**1. 手动触发**:
```bash
# SAVE(同步,阻塞,不推荐)
SAVE  # 主线程执行,阻塞所有请求

# BGSAVE(异步,推荐)
BGSAVE  # fork子进程后台执行

# 查看上次保存时间
LASTSAVE  # 返回Unix时间戳
```

**2. 自动触发**:
```bash
# redis.conf 配置
save 900 1      # 900秒内≥1个key变化
save 300 10     # 300秒内≥10个key变化
save 60 10000   # 60秒内≥10000个key变化

# 任意一个条件满足即触发BGSAVE
```

**3. 其他触发场景**:
- 主从复制时,主节点自动BGSAVE
- 执行SHUTDOWN命令时
- 执行FLUSHALL命令后

**工作原理(BGSAVE)**:

**步骤1: Fork子进程**
```
主进程 fork() → 子进程
    ↓              ↓
继续处理请求    持久化数据
```

**步骤2: 子进程遍历数据**
```bash
for key in database:
    type = key.type
    value = key.value
    expiretime = key.expiretime
    write_to_rdb(type, key, value, expiretime)
```

**步骤3: 写入临时文件**
```
temp-{pid}.rdb
    ↓
包含:
- RDB文件头(版本号)
- 元数据
- 所有key-value
- 校验和(CRC64)
```

**步骤4: 原子替换**
```bash
rename("temp-12345.rdb", "dump.rdb")
# 原子操作,保证一致性
```

**写时复制(COW)机制**:

```
Fork后:
主进程 ←→ 子进程 (共享内存)

主进程写操作:
主进程 → 复制内存页 → 修改
子进程 → 继续访问原始数据(快照)

优势:
✓ 节省内存(不完全复制)
✓ Fork速度快
✓ 实现数据快照

注意:
⚠ 大量写入时可能内存翻倍
```

**RDB 文件格式**:

```
+-------------+
| REDIS 0009  |  # 魔数 + 版本号
+-------------+
| Metadata    |  # 元数据
+-------------+
| Database 0  |  # 数据库0
|   - key1    |
|   - key2    |
+-------------+
| Database 1  |  # 数据库1
+-------------+
| EOF         |  # 结束标记
+-------------+
| CRC64       |  # 校验和
+-------------+
```

**配置参数**:

```bash
# redis.conf

# 自动触发规则
save 900 1
save 300 10
save 60 10000

# 禁用:save ""

# RDB文件名
dbfilename dump.rdb

# 存储路径
dir /var/lib/redis/

# 压缩(推荐)
rdbcompression yes

# 校验
rdbchecksum yes

# BGSAVE失败时停止写入
stop-writes-on-bgsave-error yes
```

**性能影响**:

| 阶段 | 影响 | 持续时间 |
|-----|-----|---------|
| **Fork** | 短暂阻塞 | 数十~数百ms |
| **写文件** | 几乎无 | 秒级~分钟级 |
| **磁盘IO** | 可能影响 | 持续期间 |
| **内存** | 可能翻倍 | 持续期间(大量写入) |

**优化建议**:

1. **避免大内存实例**(单实例 < 10GB)
2. **避免业务高峰期执行**
3. **使用SSD磁盘**
4. **预留足够内存**(物理内存 ≥ Redis内存 × 2)
5. **开启内存过量使用**(`vm.overcommit_memory = 1`)

**使用场景**:

**✓ 适合**:
- 定期备份(每天、每小时)
- 灾难恢复
- 主从复制全量同步
- 可接受分钟级数据丢失
- 对恢复速度要求高

**✗ 不适合**:
- 不能接受数据丢失
- 实时性要求高
- 频繁持久化(用AOF)
- 内存不足的环境

**监控和故障恢复**:

```bash
# 查看持久化状态
INFO persistence

# 关键指标:
# rdb_last_save_time: 上次保存时间
# rdb_last_bgsave_status: 状态(ok/err)
# rdb_last_bgsave_time_sec: 耗时(秒)

# 故障恢复:
# 1. 停止Redis
redis-cli SHUTDOWN

# 2. 替换RDB文件
cp /backup/dump.rdb /var/lib/redis/

# 3. 启动Redis
redis-server redis.conf
```

**关键要点**:
- ✓ **全量快照**：完整数据副本
- ✓ **二进制格式**：紧凑、恢复快
- ✓ **Fork机制**：子进程异步持久化
- ✓ **COW优化**：节省内存
- ✓ **适合备份**：定期备份、灾难恢复
- ⚠ **可能丢失数据**：最后一次快照后的数据
- ⚠ **Fork阻塞**：数据量大时注意
- ⚠ **内存翻倍**：大量写入时预留内存

**记忆口诀**:RDB快照全量备份,BGSAVE后台不阻塞,Fork子进程写时复制,二进制格式恢复快,定期备份灾难恢复,可能丢失分钟数据


### 17. 什么是 AOF？AOF 的工作原理是什么？

**核心答案**:AOF(Append Only File)是 Redis 的日志持久化机制,通过记录每个写命令并追加到文件末尾,实现数据持久化,数据完整性好但文件体积大、恢复慢。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">AOF 日志持久化全景图</text>
<rect x="30" y="60" width="790" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">AOF 的核心特性</text>
<rect x="50" y="110" width="180" height="130" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 记录命令</text>
<text x="60" y="160" font-size="10">• 写命令日志</text>
<text x="60" y="178" font-size="10">• 文本格式</text>
<text x="60" y="196" font-size="10">• 追加写入</text>
<text x="60" y="220" font-size="9" fill="#1976d2" font-weight="bold">✓ 数据完整</text>
<rect x="245" y="110" width="180" height="130" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 同步策略</text>
<text x="255" y="160" font-size="10">• always(每条)</text>
<text x="255" y="178" font-size="10">• everysec(每秒)</text>
<text x="255" y="196" font-size="10">• no(系统决定)</text>
<text x="255" y="220" font-size="9" fill="#388e3c" font-weight="bold">✓ 灵活配置</text>
<rect x="440" y="110" width="180" height="130" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ AOF重写</text>
<text x="450" y="160" font-size="10">• 压缩文件</text>
<text x="450" y="178" font-size="10">• 去除冗余</text>
<text x="450" y="196" font-size="10">• 后台执行</text>
<text x="450" y="220" font-size="9" fill="#f57c00" font-weight="bold">✓ 优化体积</text>
<rect x="635" y="110" width="170" height="130" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 适用场景</text>
<text x="645" y="160" font-size="10">• 数据安全</text>
<text x="645" y="178" font-size="10">• 秒级丢失</text>
<text x="645" y="196" font-size="10">• 实时持久化</text>
<text x="645" y="220" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 可靠性高</text>
<rect x="30" y="280" width="790" height="290" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="310" text-anchor="middle" font-size="14" font-weight="bold">AOF 工作流程</text>
<rect x="50" y="330" width="240" height="220" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="355" text-anchor="middle" font-size="11" font-weight="bold">写入流程</text>
<text x="60" y="380" font-size="10">1️⃣ 接收写命令</text>
<text x="70" y="400" font-size="9">• SET key value</text>
<text x="60" y="425" font-size="10">2️⃣ 追加到AOF缓冲</text>
<text x="70" y="445" font-size="9">• 内存缓冲区</text>
<text x="60" y="470" font-size="10">3️⃣ 同步到磁盘</text>
<text x="70" y="490" font-size="9">• 根据策略fsync</text>
<text x="60" y="515" font-size="10">4️⃣ 追加到AOF文件</text>
<text x="70" y="535" font-size="9">• appendonly.aof</text>
<rect x="305" y="330" width="240" height="220" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="355" text-anchor="middle" font-size="11" font-weight="bold">三种同步策略</text>
<text x="315" y="385" font-size="10">always:</text>
<text x="315" y="405" font-size="9">• 每条命令立即fsync</text>
<text x="315" y="423" font-size="9">• 最安全,最慢</text>
<text x="315" y="448" font-size="10">everysec(推荐):</text>
<text x="315" y="468" font-size="9">• 每秒fsync一次</text>
<text x="315" y="486" font-size="9">• 平衡性能和安全</text>
<text x="315" y="511" font-size="10">no:</text>
<text x="315" y="531" font-size="9">• 由操作系统决定</text>
<rect x="560" y="330" width="240" height="220" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="355" text-anchor="middle" font-size="11" font-weight="bold">优缺点</text>
<text x="570" y="385" font-size="10">优点:</text>
<text x="570" y="405" font-size="9">✓ 数据完整性好</text>
<text x="570" y="423" font-size="9">✓ 文件可读</text>
<text x="570" y="441" font-size="9">✓ 支持重写压缩</text>
<text x="570" y="466" font-size="10">缺点:</text>
<text x="570" y="486" font-size="9">✗ 文件体积大</text>
<text x="570" y="504" font-size="9">✗ 恢复速度慢</text>
<text x="570" y="522" font-size="9">✗ 性能略低</text>
</svg>

**AOF 的定义**:

**AOF** = **A**ppend **O**nly **F**ile
- **本质**：记录每个写命令的日志
- **格式**：文本文件(appendonly.aof)
- **方式**：追加写入(append)
- **恢复**：重新执行所有命令

**工作原理**:

**1. 命令追加(Append)**:
```bash
# 客户端执行写命令
SET user:1001 "张三"

# Redis处理:
1. 执行命令,修改内存
2. 将命令追加到AOF缓冲区
3. AOF缓冲区内容:
   *3
   $3
   SET
   $9
   user:1001
   $9
   张三
```

**2. 文件同步(Sync)**:
```bash
# 根据配置策略,将AOF缓冲区内容写入磁盘
# appendfsync配置:
# - always: 每条命令立即fsync
# - everysec: 每秒fsync(推荐)
# - no: 由操作系统决定
```

**3. 文件重写(Rewrite)**:
```bash
# 文件过大时,触发重写压缩
# 原AOF:
SET key 1
SET key 2
SET key 3
DEL key

# 重写后:
# (空,因为key最终被删除)

# 或
SET name "a"
SET name "b"
SET name "c"

# 重写后:
SET name "c"
```

**AOF 文件格式(RESP协议)**:

```
*3          # 数组长度3
$3          # 字符串长度3
SET         # 命令
$9          # 字符串长度9
user:1001   # key
$9          # 字符串长度9
张三        # value

*2          # 数组长度2
$3          # 字符串长度3
DEL         # 命令
$9          # 字符串长度9
user:1002   # key
```

**三种同步策略对比**:

| 策略 | fsync频率 | 性能 | 安全性 | 数据丢失 |
|-----|----------|-----|--------|---------|
| **always** | 每条命令 | 最慢 | 最高 | 几乎不丢 |
| **everysec** | 每秒一次 | 较快 | 较高 | 最多1秒 |
| **no** | 操作系统决定 | 最快 | 最低 | 可能数秒 |

**推荐配置**: `appendfsync everysec`
- 平衡性能和数据安全
- 最多丢失1秒数据
- 性能影响较小

**AOF 重写机制**:

**为什么需要重写**:
```bash
# AOF文件会越来越大
SET key "value1"    # 1条命令
SET key "value2"    # 2条命令
SET key "value3"    # 3条命令
...
SET key "value1000" # 1000条命令

# 但key最终值只是"value1000"
# 前999条命令都是冗余的
```

**重写原理**:
1. **fork子进程**
2. **遍历当前数据库**,生成最简命令序列
3. **写入临时AOF文件**
4. **主进程的新写命令**追加到AOF重写缓冲区
5. **子进程完成后**,将重写缓冲区数据追加到新AOF
6. **原子替换**旧AOF文件

**触发条件**:

**自动触发**:
```bash
# redis.conf
auto-aof-rewrite-percentage 100  # 增长100%触发
auto-aof-rewrite-min-size 64mb   # 至少64MB才触发

# 例如:
# 上次重写后大小: 64MB
# 当前大小: 128MB (增长100%)
# 且 >= 64MB
# → 触发重写
```

**手动触发**:
```bash
BGREWRITEAOF
```

**配置参数**:

```bash
# redis.conf

# 1. 启用AOF
appendonly yes

# 2. AOF文件名
appendfilename "appendonly.aof"

# 3. 同步策略(推荐everysec)
appendfsync everysec

# 4. 重写触发条件
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb

# 5. 重写时是否暂停fsync
no-appendfsync-on-rewrite no
# yes: 重写时不fsync,性能好但可能丢数据
# no: 重写时继续fsync,安全但可能慢

# 6. 加载时忽略最后不完整命令
aof-load-truncated yes

# 7. 混合持久化(4.0+,推荐)
aof-use-rdb-preamble yes
```

**AOF 工作流程图**:

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">AOF 完整工作流程</text>
<rect x="50" y="60" width="180" height="350" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="90" text-anchor="middle" font-size="13" font-weight="bold">1. 命令执行</text>
<rect x="70" y="110" width="140" height="50" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="140" text-anchor="middle" font-size="10">客户端写命令</text>
<rect x="70" y="180" width="140" height="50" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="210" text-anchor="middle" font-size="10">Redis执行命令</text>
<rect x="70" y="250" width="140" height="50" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="280" text-anchor="middle" font-size="10">追加到AOF缓冲</text>
<path d="M 140 160 L 140 180" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow-aof)"/>
<path d="M 140 230 L 140 250" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow-aof)"/>
<rect x="270" y="60" width="180" height="350" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="360" y="90" text-anchor="middle" font-size="13" font-weight="bold">2. 文件同步</text>
<rect x="290" y="110" width="140" height="50" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="360" y="135" text-anchor="middle" font-size="10">AOF缓冲区</text>
<rect x="290" y="180" width="140" height="50" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="360" y="205" text-anchor="middle" font-size="10">根据策略fsync</text>
<text x="300" y="220" font-size="8">always/everysec/no</text>
<rect x="290" y="250" width="140" height="50" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="360" y="280" text-anchor="middle" font-size="10">写入磁盘</text>
<path d="M 360 160 L 360 180" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-aof)"/>
<path d="M 360 230 L 360 250" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-aof)"/>
<rect x="490" y="60" width="260" height="350" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="620" y="90" text-anchor="middle" font-size="13" font-weight="bold">3. AOF重写(可选)</text>
<rect x="510" y="110" width="220" height="50" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="620" y="140" text-anchor="middle" font-size="10">触发重写(文件过大)</text>
<rect x="510" y="180" width="220" height="50" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="620" y="210" text-anchor="middle" font-size="10">fork子进程压缩</text>
<rect x="510" y="250" width="220" height="50" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="620" y="275" text-anchor="middle" font-size="10">生成新AOF文件</text>
<text x="520" y="290" font-size="8">(去除冗余命令)</text>
<rect x="510" y="320" width="220" height="50" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="620" y="350" text-anchor="middle" font-size="10">原子替换旧文件</text>
<path d="M 620 160 L 620 180" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-aof)"/>
<path d="M 620 230 L 620 250" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-aof)"/>
<path d="M 620 300 L 620 320" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-aof)"/>
<path d="M 230 280 L 270 135" stroke="#666" stroke-width="2" marker-end="url(#arrow-aof)"/>
<text x="240" y="200" font-size="9">写入</text>
<defs>
<marker id="arrow-aof" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**AOF 重写详细流程**:

```
1. Redis fork子进程
   ├── 主进程: 继续处理命令
   │   └── 新命令同时写入:
   │       ├── AOF缓冲区(正常流程)
   │       └── AOF重写缓冲区(重写期间)
   └── 子进程: 生成新AOF
       └── 遍历当前数据生成最简命令

2. 子进程完成重写
   └── 主进程接收信号:
       ├── 将AOF重写缓冲区内容追加到新AOF
       ├── 原子替换旧AOF文件
       └── 清空AOF重写缓冲区
```

**性能影响**:

| 策略 | CPU | 磁盘IO | 延迟 | 数据丢失风险 |
|-----|-----|--------|-----|-------------|
| **always** | 低 | 高 | 高 | 最低 |
| **everysec** | 低 | 中 | 低 | 低(1秒) |
| **no** | 低 | 低 | 最低 | 高 |

**优化建议**:

1. **使用everysec策略**(平衡性能和安全)
2. **合理设置重写阈值**(避免频繁重写)
3. **重写时暂停fsync**(生产环境慎用)
4. **使用混合持久化**(4.0+推荐)
5. **监控AOF文件大小**

**使用场景**:

**✓ 适合**:
- 对数据安全要求高
- 可接受秒级数据丢失
- 需要实时持久化
- 数据恢复时需要完整日志

**✗ 不适合**:
- 对性能要求极高
- 磁盘IO是瓶颈
- 可接受分钟级数据丢失(用RDB)
- 对文件大小敏感

**监控和故障恢复**:

```bash
# 查看AOF状态
INFO persistence

# 关键指标:
# aof_enabled: AOF是否启用
# aof_rewrite_in_progress: 是否正在重写
# aof_last_rewrite_time_sec: 上次重写耗时
# aof_current_size: 当前AOF大小
# aof_base_size: 上次重写后大小

# 手动触发重写
BGREWRITEAOF

# AOF文件损坏修复
redis-check-aof --fix appendonly.aof
```

**AOF 文件示例**:

```bash
# 原始命令序列
SET user:1001 "张三"
SET user:1002 "李四"
INCR counter
INCR counter
LPUSH list "a" "b" "c"

# AOF文件内容(RESP格式)
*3
$3
SET
$9
user:1001
$9
张三
*3
$3
SET
$9
user:1002
$9
李四
*2
$4
INCR
$7
counter
*2
$4
INCR
$7
counter
*5
$5
LPUSH
$4
list
$1
a
$1
b
$1
c
```

**重写后的AOF**:
```bash
# 去除冗余,优化命令
SET user:1001 "张三"
SET user:1002 "李四"
SET counter "2"        # 合并2次INCR
RPUSH list "c" "b" "a" # 直接生成完整列表
```

**关键要点**:
- ✓ **日志持久化**：记录每个写命令
- ✓ **数据完整**：最多丢失1秒(everysec)
- ✓ **文本格式**：可读、易分析
- ✓ **支持重写**：压缩文件大小
- ✓ **三种策略**:always/everysec/no
- ✓ **适合实时**：对数据安全要求高的场景
- ⚠ **文件大**：比RDB大很多
- ⚠ **恢复慢**：需要重新执行所有命令
- ⚠ **性能影响**：略低于RDB

**记忆口诀**:AOF日志记录命令,文本格式可追加,everysec推荐策略,重写压缩去冗余,数据完整秒级丢失,恢复慢但更安全


### 18. RDB 和 AOF 的区别是什么？如何选择？

**核心答案**:RDB 是全量快照备份,二进制文件恢复快但可能丢失分钟级数据;AOF 是增量命令日志,文本格式数据完整但体积大恢复慢。生产环境推荐混合持久化(RDB+AOF),兼顾性能和安全。

**详细对比**:

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="25" text-anchor="middle" font-size="16" font-weight="bold">RDB vs AOF 全面对比</text>
<rect x="30" y="60" width="420" height="270" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="240" y="90" text-anchor="middle" font-size="14" font-weight="bold">RDB (快照持久化)</text>
<rect x="50" y="110" width="380" height="200" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="60" y="135" font-size="11" font-weight="bold">特点:</text>
<text x="60" y="155" font-size="10">✓ 全量快照备份</text>
<text x="60" y="173" font-size="10">✓ 二进制格式,文件小</text>
<text x="60" y="191" font-size="10">✓ 恢复速度快</text>
<text x="60" y="209" font-size="10">✓ Fork子进程,不阻塞</text>
<text x="60" y="234" font-size="11" font-weight="bold">缺点:</text>
<text x="60" y="254" font-size="10">✗ 可能丢失分钟级数据</text>
<text x="60" y="272" font-size="10">✗ Fork时短暂阻塞</text>
<text x="60" y="290" font-size="10">✗ 大内存时耗时长</text>
<rect x="470" y="60" width="420" height="270" fill="#e8f5e9" stroke="#388e3c" stroke-width="3" rx="5"/>
<text x="680" y="90" text-anchor="middle" font-size="14" font-weight="bold">AOF (日志持久化)</text>
<rect x="490" y="110" width="380" height="200" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="500" y="135" font-size="11" font-weight="bold">特点:</text>
<text x="500" y="155" font-size="10">✓ 记录每条写命令</text>
<text x="500" y="173" font-size="10">✓ 数据完整性好(秒级)</text>
<text x="500" y="191" font-size="10">✓ 文本格式可读</text>
<text x="500" y="209" font-size="10">✓ 支持重写压缩</text>
<text x="500" y="234" font-size="11" font-weight="bold">缺点:</text>
<text x="500" y="254" font-size="10">✗ 文件体积大</text>
<text x="500" y="272" font-size="10">✗ 恢复速度慢</text>
<text x="500" y="290" font-size="10">✗ 性能略低于RDB</text>
<rect x="30" y="350" width="860" height="280" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="450" y="380" text-anchor="middle" font-size="14" font-weight="bold">核心对比</text>
<rect x="50" y="400" width="200" height="210" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="150" y="425" text-anchor="middle" font-size="11" font-weight="bold">持久化方式</text>
<text x="60" y="450" font-size="10">RDB: 全量快照</text>
<text x="60" y="468" font-size="10">AOF: 增量日志</text>
<text x="150" y="495" text-anchor="middle" font-size="11" font-weight="bold">文件大小</text>
<text x="60" y="520" font-size="10">RDB: 小(压缩)</text>
<text x="60" y="538" font-size="10">AOF: 大</text>
<text x="150" y="565" text-anchor="middle" font-size="11" font-weight="bold">数据丢失</text>
<text x="60" y="590" font-size="10">RDB: 分钟级</text>
<text x="60" y="608" font-size="10">AOF: 秒级</text>
<rect x="270" y="400" width="200" height="210" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="370" y="425" text-anchor="middle" font-size="11" font-weight="bold">恢复速度</text>
<text x="280" y="450" font-size="10">RDB: 快</text>
<text x="280" y="468" font-size="10">AOF: 慢</text>
<text x="370" y="495" text-anchor="middle" font-size="11" font-weight="bold">性能影响</text>
<text x="280" y="520" font-size="10">RDB: 低</text>
<text x="280" y="538" font-size="10">AOF: 中</text>
<text x="370" y="565" text-anchor="middle" font-size="11" font-weight="bold">适用场景</text>
<text x="280" y="590" font-size="10">RDB: 定期备份</text>
<text x="280" y="608" font-size="10">AOF: 实时持久化</text>
<rect x="490" y="400" width="380" height="210" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="425" text-anchor="middle" font-size="12" font-weight="bold">推荐配置 ⭐</text>
<text x="500" y="455" font-size="11" font-weight="bold">混合持久化(4.0+):</text>
<text x="500" y="478" font-size="10">appendonly yes</text>
<text x="500" y="496" font-size="10">appendfsync everysec</text>
<text x="500" y="514" font-size="10">aof-use-rdb-preamble yes</text>
<text x="500" y="540" font-size="11" font-weight="bold">优势:</text>
<text x="500" y="560" font-size="10">✓ RDB快速恢复</text>
<text x="500" y="578" font-size="10">✓ AOF数据完整</text>
<text x="500" y="596" font-size="10">✓ 平衡性能和安全</text>
</svg>

**核心区别**:

| 维度 | RDB | AOF |
|-----|-----|-----|
| **持久化方式** | 全量快照 | 增量命令日志 |
| **文件格式** | 二进制 | 文本(RESP) |
| **文件大小** | 小(压缩) | 大 |
| **数据完整性** | 分钟级丢失 | 秒级丢失(everysec) |
| **恢复速度** | 快 | 慢 |
| **性能开销** | 低(定期) | 中(实时) |
| **可读性** | 不可读 | 可读 |
| **适用场景** | 定期备份 | 实时持久化 |

**如何选择**:

**场景1: 可接受分钟级数据丢失(RDB only)**
```bash
# 配置
appendonly no
save 900 1
save 300 10
save 60 10000

# 适合: 缓存、数据可重建、性能要求高
```

**场景2: 不能接受数据丢失(AOF only)**
```bash
# 配置
appendonly yes
appendfsync always  # 或everysec

# 适合: 核心数据、金融场景
```

**场景3: 生产环境(混合持久化,推荐)**
```bash
# 配置
appendonly yes
appendfsync everysec
aof-use-rdb-preamble yes

save 900 1
save 300 10
save 60 10000

# 适合: 大多数生产场景
# 优势: 结合两者优点
```

**混合持久化**:

```
AOF文件结构(4.0+):
+-------------+
| RDB部分     | ← 全量数据快照
|  (二进制)   |
+-------------+
| AOF部分     | ← 增量命令日志
|  (文本)     |
+-------------+

优势:
✓ 恢复快(大部分用RDB)
✓ 数据完整(增量用AOF)
✓ 文件小(RDB压缩)
```

**选择决策树**:

```
数据丢失容忍度?
    │
    ├─ 不能丢失 → AOF(always)
    │
    ├─ 秒级丢失 → 混合持久化(推荐)
    │
    └─ 分钟级丢失 → RDB only
```

**实际配置示例**:

**1. 标准Web应用(推荐)**:
```bash
appendonly yes
appendfsync everysec
aof-use-rdb-preamble yes
save 900 1
save 300 10
save 60 10000
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
```

**2. 金融/支付场景**:
```bash
appendonly yes
appendfsync always
save ""  # 禁用RDB
```

**3. 高性能缓存**:
```bash
appendonly no
save 900 1  # 或save ""完全禁用
```

**性能对比**:

| 场景 | QPS(万) | 延迟(ms) | 数据丢失 |
|-----|---------|---------|---------|
| **无持久化** | 10 | 0.1 | 全部 |
| **RDB only** | 9.5 | 0.12 | 分钟级 |
| **AOF(everysec)** | 8 | 0.15 | 1秒 |
| **AOF(always)** | 3 | 0.3 | 几乎不丢 |
| **混合持久化** | 8 | 0.15 | 1秒 |

**最佳实践**:

1. **生产环境标配**：混合持久化 + everysec
2. **监控**：定期检查`INFO persistence`
3. **备份**:RDB定期备份 + AOF实时保护
4. **恢复优先级**：优先加载AOF(数据更完整)
5. **容量规划**：磁盘 ≥ 内存 × 10

**关键要点**:
- ✓ **RDB**:快照、恢复快、分钟级丢失
- ✓ **AOF**:日志、数据完整、恢复慢
- ✓ **推荐**：混合持久化(4.0+)
- ✓ **标准**:RDB+AOF,everysec
- ✓ **高安全**:AOF always
- ✓ **高性能**:RDB only
- ✓ **监控**：定期检查状态
- ✓ **备份**：多重保障

**记忆口诀**:RDB快照AOF日志,各有优缺需权衡,生产环境混合用,性能安全两兼顾,everysec是标准,always追求最安全,纯缓存可禁用,定期监控和备份


### 19. 什么是 AOF 重写？

**核心答案**:AOF 重写是 Redis 压缩 AOF 文件的机制,通过创建新的 AOF 文件来替代旧文件,去除冗余命令,保留达到当前数据库状态所需的最少命令集,从而大幅减小文件体积。

**详细说明**:

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">AOF 重写机制全景图</text>
<rect x="30" y="60" width="790" height="240" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">为什么需要 AOF 重写</text>
<rect x="50" y="110" width="240" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 冗余命令</text>
<text x="60" y="160" font-size="10">原始AOF:</text>
<text x="60" y="180" font-size="9" font-family="monospace">SET key "v1"</text>
<text x="60" y="198" font-size="9" font-family="monospace">SET key "v2"</text>
<text x="60" y="216" font-size="9" font-family="monospace">SET key "v3"</text>
<text x="60" y="234" font-size="9">...</text>
<text x="60" y="252" font-size="9" font-family="monospace">SET key "v1000"</text>
<text x="60" y="270" font-size="9" fill="#d32f2f" font-weight="bold">✗ 前999条冗余</text>
<rect x="305" y="110" width="240" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 重写后</text>
<text x="315" y="160" font-size="10">压缩后AOF:</text>
<text x="315" y="180" font-size="9" font-family="monospace">SET key "v1000"</text>
<text x="315" y="208" font-size="10">文件大小:</text>
<text x="315" y="228" font-size="9">• 原始: 100MB</text>
<text x="315" y="246" font-size="9">• 重写后: 1MB</text>
<text x="315" y="270" font-size="9" fill="#388e3c" font-weight="bold">✓ 压缩99%</text>
<rect x="560" y="110" width="240" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 触发条件</text>
<text x="570" y="165" font-size="10">自动触发:</text>
<text x="570" y="185" font-size="9">• 增长100%</text>
<text x="570" y="203" font-size="9">• 且≥64MB</text>
<text x="570" y="228" font-size="10">手动触发:</text>
<text x="570" y="248" font-size="9" font-family="monospace">BGREWRITEAOF</text>
<text x="570" y="270" font-size="9" fill="#f57c00" font-weight="bold">✓ 灵活控制</text>
<rect x="30" y="320" width="790" height="300" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="350" text-anchor="middle" font-size="14" font-weight="bold">AOF 重写流程</text>
<rect x="50" y="370" width="240" height="230" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="395" text-anchor="middle" font-size="11" font-weight="bold">步骤1-3: 准备</text>
<text x="60" y="420" font-size="10">1️⃣ fork子进程</text>
<text x="70" y="440" font-size="9">• 主进程继续服务</text>
<text x="60" y="465" font-size="10">2️⃣ 子进程遍历数据</text>
<text x="70" y="485" font-size="9">• 读取当前数据库</text>
<text x="60" y="510" font-size="10">3️⃣ 生成最简命令</text>
<text x="70" y="530" font-size="9">• 去除冗余</text>
<text x="70" y="548" font-size="9">• 写入临时文件</text>
<text x="70" y="575" font-size="9" fill="#1976d2" font-weight="bold">✓ 不影响主进程</text>
<rect x="305" y="370" width="240" height="230" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="395" text-anchor="middle" font-size="11" font-weight="bold">步骤4-5: 缓冲</text>
<text x="315" y="420" font-size="10">4️⃣ 重写期间新命令</text>
<text x="325" y="440" font-size="9">• 写入AOF缓冲区</text>
<text x="325" y="458" font-size="9">• 写入AOF重写缓冲区</text>
<text x="315" y="483" font-size="10">5️⃣ 双重保障</text>
<text x="325" y="503" font-size="9">• 主进程正常持久化</text>
<text x="325" y="521" font-size="9">• 重写数据不丢失</text>
<text x="315" y="555" font-size="9" fill="#388e3c" font-weight="bold">✓ 数据一致性</text>
<rect x="560" y="370" width="240" height="230" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="395" text-anchor="middle" font-size="11" font-weight="bold">步骤6-7: 完成</text>
<text x="570" y="420" font-size="10">6️⃣ 子进程完成</text>
<text x="580" y="440" font-size="9">• 通知主进程</text>
<text x="580" y="458" font-size="9">• 追加重写缓冲区</text>
<text x="570" y="483" font-size="10">7️⃣ 原子替换</text>
<text x="580" y="503" font-size="9">• rename新AOF</text>
<text x="580" y="521" font-size="9">• 删除旧AOF</text>
<text x="570" y="555" font-size="9" fill="#f57c00" font-weight="bold">✓ 重写完成</text>
</svg>

**AOF 重写的定义**:

AOF 重写是对 AOF 文件的"瘦身"操作:
- **目的**: 减小文件体积,提高加载速度
- **原理**: 生成达到当前状态的最少命令集
- **方式**: 通过 fork 子进程在后台执行
- **结果**: 新 AOF 文件替代旧文件

**为什么需要重写**:

```bash
# 场景1: 多次修改同一key
SET name "张三"
SET name "李四"
SET name "王五"
# ... 重复1000次
SET name "赵六"

# 重写后只保留:
SET name "赵六"  # 只需这1条命令

# 场景2: 增减操作
INCR counter  # 1
INCR counter  # 2
INCR counter  # 3
# ... 重复1000次
INCR counter  # 1000

# 重写后只保留:
SET counter "1000"  # 直接设置最终值

# 场景3: 已删除的key
SET temp "value"
DEL temp

# 重写后:
# (完全不需要这些命令)
```

**重写触发条件**:

**自动触发**:
```bash
# redis.conf
auto-aof-rewrite-percentage 100   # 增长100%触发
auto-aof-rewrite-min-size 64mb    # 最小64MB才触发

# 计算公式:
# 当前AOF大小 >= auto-aof-rewrite-min-size
# 且
# (当前AOF大小 - 上次重写后大小) / 上次重写后大小 >= auto-aof-rewrite-percentage%

# 例如:
# 上次重写后: 64MB
# 当前大小: 128MB
# 增长率: (128-64)/64 = 100%
# 且 128MB >= 64MB
# → 触发重写
```

**手动触发**:
```bash
BGREWRITEAOF
```

**AOF 重写详细流程**:

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">AOF 重写完整流程图</text>
<rect x="50" y="60" width="180" height="400" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="90" text-anchor="middle" font-size="13" font-weight="bold">主进程</text>
<rect x="70" y="110" width="140" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="10">1. 接收写命令</text>
<text x="80" y="155" font-size="9">继续正常服务</text>
<rect x="70" y="190" width="140" height="80" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="215" text-anchor="middle" font-size="10">2. 双写</text>
<text x="80" y="235" font-size="9">• AOF缓冲区</text>
<text x="80" y="253" font-size="9">• AOF重写缓冲区</text>
<rect x="70" y="290" width="140" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="315" text-anchor="middle" font-size="10">3. 等待子进程</text>
<text x="80" y="335" font-size="9">继续处理请求</text>
<rect x="70" y="370" width="140" height="80" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="395" text-anchor="middle" font-size="10">4. 收到信号</text>
<text x="80" y="415" font-size="9">追加重写缓冲区</text>
<text x="80" y="433" font-size="9">原子替换AOF</text>
<rect x="270" y="60" width="180" height="400" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="360" y="90" text-anchor="middle" font-size="13" font-weight="bold">子进程</text>
<rect x="290" y="110" width="140" height="60" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="360" y="135" text-anchor="middle" font-size="10">1. Fork创建</text>
<text x="300" y="155" font-size="9">共享父进程内存</text>
<rect x="290" y="190" width="140" height="80" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="360" y="215" text-anchor="middle" font-size="10">2. 遍历数据库</text>
<text x="300" y="235" font-size="9">读取所有key</text>
<text x="300" y="253" font-size="9">生成最简命令</text>
<rect x="290" y="290" width="140" height="60" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="360" y="315" text-anchor="middle" font-size="10">3. 写临时文件</text>
<text x="300" y="335" font-size="9">temp-{pid}.aof</text>
<rect x="290" y="370" width="140" height="80" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="360" y="395" text-anchor="middle" font-size="10">4. 完成通知</text>
<text x="300" y="415" font-size="9">向父进程发信号</text>
<text x="300" y="433" font-size="9">退出</text>
<rect x="490" y="60" width="320" height="400" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="650" y="90" text-anchor="middle" font-size="13" font-weight="bold">数据流向</text>
<rect x="510" y="110" width="280" height="80" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="650" y="135" text-anchor="middle" font-size="11" font-weight="bold">新命令</text>
<text x="520" y="160" font-size="9">→ AOF缓冲区 → appendonly.aof</text>
<text x="520" y="178" font-size="9">→ AOF重写缓冲区 (暂存)</text>
<rect x="510" y="210" width="280" height="80" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="650" y="235" text-anchor="middle" font-size="11" font-weight="bold">重写数据</text>
<text x="520" y="260" font-size="9">子进程 → temp-{pid}.aof</text>
<text x="520" y="278" font-size="9">(基于fork时的数据快照)</text>
<rect x="510" y="310" width="280" height="140" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="650" y="335" text-anchor="middle" font-size="11" font-weight="bold">合并完成</text>
<text x="520" y="360" font-size="9">1. temp-{pid}.aof</text>
<text x="520" y="378" font-size="9">2. + AOF重写缓冲区</text>
<text x="520" y="396" font-size="9">3. = 新appendonly.aof</text>
<text x="520" y="414" font-size="9">4. rename替换旧文件</text>
<text x="520" y="432" font-size="9" fill="#f57c00" font-weight="bold">✓ 数据完整,无丢失</text>
<path d="M 210 140 L 270 140" stroke="#666" stroke-width="2" marker-end="url(#arrow-rewrite)"/>
<text x="220" y="135" font-size="8">fork</text>
<path d="M 140 270 L 140 290" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow-rewrite)"/>
<path d="M 360 350 L 360 370" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-rewrite)"/>
<path d="M 210 410 L 270 410" stroke="#f57c00" stroke-width="2" marker-start="url(#arrow-rewrite)"/>
<text x="220" y="405" font-size="8">信号</text>
<defs>
<marker id="arrow-rewrite" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**重写流程详解**:

**步骤1: Fork子进程**
```bash
# 主进程执行fork()
pid_t pid = fork();

if (pid == 0) {
    # 子进程:执行AOF重写
    rewriteAppendOnlyFile();
    exit(0);
} else {
    # 父进程:继续处理客户端请求
    continue_serving_clients();
}
```

**步骤2: 子进程生成新AOF**
```bash
# 遍历所有数据库
for db in redis.databases:
    for key in db.keys():
        type = key.type
        value = key.value
        expiretime = key.expiretime

        # 生成对应的命令
        if type == STRING:
            write("SET", key, value)
        elif type == LIST:
            write("RPUSH", key, *value)
        elif type == HASH:
            write("HMSET", key, **value)
        # ... 其他类型

        # 设置过期时间
        if expiretime:
            write("EXPIREAT", key, expiretime)
```

**步骤3: 主进程的新命令处理**
```bash
# 重写期间,主进程收到新写命令
SET newkey "newvalue"

# 主进程会:
1. 执行命令,修改内存数据
2. 将命令追加到 AOF缓冲区 → 写入旧AOF文件
3. 将命令追加到 AOF重写缓冲区 → 暂存

# 为什么需要AOF重写缓冲区?
# - 子进程基于fork时的数据快照
# - fork后的新命令子进程看不到
# - 需要在重写完成后追加这些新命令
# - 保证新AOF文件包含所有数据
```

**步骤4: 子进程完成,主进程追加**
```bash
# 子进程完成,发送信号
kill(parent_pid, SIGUSR1);

# 主进程收到信号后:
1. 将AOF重写缓冲区的内容追加到新AOF文件
2. 对新AOF文件改名 (rename)
   temp-12345.aof → appendonly.aof
3. 关闭旧AOF文件
4. 清空AOF重写缓冲区
```

**重写示例**:

**原始AOF (100MB)**:
```bash
SET user:1001 "张三"
SET user:1001 "李四"
SET user:1001 "王五"
INCR counter
INCR counter
INCR counter
LPUSH list "a"
LPUSH list "b"
LPUSH list "c"
SET temp "xxx"
DEL temp
# ... 大量冗余命令
```

**重写后AOF (1MB)**:
```bash
SET user:1001 "王五"      # 只保留最终值
SET counter "3"           # 合并INCR
RPUSH list "c" "b" "a"    # 直接生成完整列表
# temp已删除,不需要命令
```

**配置参数**:

```bash
# redis.conf

# 自动重写触发条件
auto-aof-rewrite-percentage 100   # 增长100%触发
auto-aof-rewrite-min-size 64mb    # 最小64MB才触发

# 重写时是否暂停fsync
no-appendfsync-on-rewrite no
# no: 重写时继续fsync(安全,可能慢)
# yes: 重写时不fsync(快,可能丢数据)

# 混合持久化(4.0+)
aof-use-rdb-preamble yes
# yes: AOF重写时使用RDB格式 + AOF增量
# no: 纯AOF格式
```

**混合持久化的重写**:

```bash
# Redis 4.0+ 开启混合持久化后
# AOF重写会生成如下格式:

+-------------------+
| RDB格式数据       | ← fork时刻的完整快照
| (二进制,紧凑)     |
+-------------------+
| AOF格式增量命令   | ← 重写期间的新命令
| (文本,RESP)       |
+-------------------+

# 优势:
✓ 恢复速度快(大部分数据用RDB)
✓ 数据完整(增量命令用AOF)
✓ 文件体积适中
```

**性能影响**:

| 阶段 | CPU | 内存 | 磁盘IO | 影响 |
|-----|-----|------|--------|------|
| **Fork** | 低 | 瞬时翻倍(COW) | 无 | 短暂阻塞 |
| **遍历数据** | 中(子进程) | 共享 | 无 | 几乎无影响 |
| **写新AOF** | 低 | 少量 | 高 | 可能影响 |
| **追加缓冲区** | 低 | 少量 | 中 | 短暂阻塞 |

**监控和管理**:

```bash
# 查看重写状态
INFO persistence

# 关键指标:
aof_rewrite_in_progress: 0     # 是否正在重写(0=否,1=是)
aof_rewrite_scheduled: 0       # 是否计划重写
aof_last_rewrite_time_sec: 5   # 上次重写耗时(秒)
aof_current_rewrite_time_sec: -1  # 当前重写已耗时
aof_current_size: 134217728    # 当前AOF大小(字节)
aof_base_size: 67108864        # 上次重写后大小(字节)

# 手动触发重写
BGREWRITEAOF

# 取消重写(不推荐)
# 只能kill子进程,不够优雅
```

**常见问题**:

**Q1: 重写期间Redis宕机会怎样?**
```
A: 不影响
- 旧AOF文件依然存在
- 临时文件(temp-{pid}.aof)会被忽略
- 重启后加载旧AOF文件
- 数据完整不丢失
```

**Q2: 重写期间大量写入怎么办?**
```
A: AOF重写缓冲区可能很大
- 主进程需要维护两个缓冲区
- 内存占用增加
- 追加时可能阻塞较久
建议:避免在业务高峰期重写
```

**Q3: 为什么不用主线程重写?**
```
A: 会严重阻塞Redis
- 遍历所有数据需要时间
- 写文件需要磁盘IO
- 阻塞期间无法处理请求
所以必须用子进程后台执行
```

**优化建议**:

1. **合理设置触发条件**:
   ```bash
   # 避免频繁重写
   auto-aof-rewrite-percentage 100
   auto-aof-rewrite-min-size 256mb  # 提高最小值
   ```

2. **避免业务高峰期**:
   ```bash
   # 通过监控自动化脚本控制
   # 在凌晨低峰期手动触发
   redis-cli BGREWRITEAOF
   ```

3. **预留足够内存**:
   ```bash
   # 物理内存 >= Redis内存 × 2
   # 避免OOM
   ```

4. **使用混合持久化**:
   ```bash
   aof-use-rdb-preamble yes
   # 减小AOF文件体积
   ```

5. **监控重写耗时**:
   ```bash
   # 如果耗时过长(>10分钟)
   # 考虑:
   # - 拆分实例(减小单实例数据量)
   # - 升级硬件(SSD)
   # - 优化数据结构
   ```

**关键要点**:
- ✓ **目的**：压缩AOF文件,去除冗余
- ✓ **原理**：重新生成最少命令集
- ✓ **方式**:fork子进程,后台执行
- ✓ **缓冲区**：主进程双写,保证数据完整
- ✓ **混合持久化**:RDB+AOF,兼顾优点
- ✓ **自动触发**：增长100%且>=64MB
- ✓ **手动触发**:BGREWRITEAOF
- ⚠ **性能影响**:fork时短暂阻塞
- ⚠ **内存占用**：重写期间可能翻倍
- ⚠ **避免高峰**：在低峰期执行

**记忆口诀**:AOF重写去冗余,fork子进程后台跑,遍历数据生成最简命令,主进程双写保数据,重写缓冲区追加上,原子替换旧文件,混合持久最优方案


### 20. Redis 如何实现数据恢复？

**核心答案**:Redis 启动时会自动检查持久化文件(RDB/AOF),按照 AOF优先、RDB备用的原则加载数据。AOF 存在且有效时优先使用 AOF 恢复(数据更完整),否则使用 RDB。恢复过程通过重新执行命令(AOF)或直接加载快照(RDB)来重建内存数据。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis 数据恢复流程</text>
<rect x="30" y="60" width="790" height="240" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">恢复优先级和策略</text>
<rect x="50" y="110" width="240" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ AOF 优先</text>
<text x="60" y="160" font-size="10">检查 appendonly.aof</text>
<text x="60" y="185" font-size="9">✓ 存在且有效</text>
<text x="70" y="203" font-size="9">→ 加载 AOF</text>
<text x="70" y="221" font-size="9">→ 重新执行命令</text>
<text x="60" y="246" font-size="9">✓ 数据最完整</text>
<text x="60" y="264" font-size="9" fill="#1976d2" font-weight="bold">优先级: 最高</text>
<rect x="305" y="110" width="240" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ RDB 备用</text>
<text x="315" y="160" font-size="10">检查 dump.rdb</text>
<text x="315" y="185" font-size="9">✗ AOF 不存在/无效</text>
<text x="325" y="203" font-size="9">→ 加载 RDB</text>
<text x="325" y="221" font-size="9">→ 直接加载快照</text>
<text x="315" y="246" font-size="9">✓ 恢复速度快</text>
<text x="315" y="264" font-size="9" fill="#388e3c" font-weight="bold">优先级: 次之</text>
<rect x="560" y="110" width="240" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 空实例</text>
<text x="570" y="160" font-size="10">无持久化文件</text>
<text x="570" y="185" font-size="9">✗ AOF 不存在</text>
<text x="570" y="203" font-size="9">✗ RDB 不存在</text>
<text x="580" y="221" font-size="9">→ 空实例启动</text>
<text x="580" y="239" font-size="9">→ 无数据</text>
<text x="570" y="264" font-size="9" fill="#f57c00" font-weight="bold">优先级: 无恢复</text>
<rect x="30" y="320" width="790" height="250" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="350" text-anchor="middle" font-size="14" font-weight="bold">启动加载流程</text>
<rect x="50" y="370" width="240" height="180" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="395" text-anchor="middle" font-size="11" font-weight="bold">步骤1-2: 检查</text>
<text x="60" y="420" font-size="10">1️⃣ Redis 启动</text>
<text x="70" y="440" font-size="9">• 读取配置文件</text>
<text x="70" y="458" font-size="9">• 检查持久化配置</text>
<text x="60" y="483" font-size="10">2️⃣ 文件检查</text>
<text x="70" y="503" font-size="9">• appendonly.aof</text>
<text x="70" y="521" font-size="9">• dump.rdb</text>
<text x="60" y="545" font-size="9" fill="#1976d2" font-weight="bold">✓ 确定恢复策略</text>
<rect x="305" y="370" width="240" height="180" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="395" text-anchor="middle" font-size="11" font-weight="bold">步骤3-4: 加载</text>
<text x="315" y="420" font-size="10">3️⃣ 执行加载</text>
<text x="325" y="440" font-size="9">• AOF: 重放命令</text>
<text x="325" y="458" font-size="9">• RDB: 加载快照</text>
<text x="315" y="483" font-size="10">4️⃣ 数据校验</text>
<text x="325" y="503" font-size="9">• CRC64 校验和</text>
<text x="325" y="521" font-size="9">• 格式完整性</text>
<text x="315" y="545" font-size="9" fill="#388e3c" font-weight="bold">✓ 重建内存数据</text>
<rect x="560" y="370" width="240" height="180" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="395" text-anchor="middle" font-size="11" font-weight="bold">步骤5-6: 完成</text>
<text x="570" y="420" font-size="10">5️⃣ 过期键处理</text>
<text x="580" y="440" font-size="9">• 删除已过期key</text>
<text x="580" y="458" font-size="9">• 重建过期字典</text>
<text x="570" y="483" font-size="10">6️⃣ 开始服务</text>
<text x="580" y="503" font-size="9">• 接受客户端连接</text>
<text x="580" y="521" font-size="9">• 正常提供服务</text>
<text x="570" y="545" font-size="9" fill="#f57c00" font-weight="bold">✓ 恢复完成</text>
</svg>

**恢复优先级逻辑**:

```
Redis 启动
    ↓
检查 appendonly.aof
    ↓
┌─ 存在且有效? ─→ 是 ─→ 加载 AOF ─→ 完成
│                           ↓
│                      (数据最完整)
↓
否
↓
检查 dump.rdb
    ↓
┌─ 存在且有效? ─→ 是 ─→ 加载 RDB ─→ 完成
│                           ↓
│                      (恢复快速)
↓
否
↓
空实例启动(无数据)
```

**AOF 恢复流程**:

<svg viewBox="0 0 850 450" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">AOF 恢复详细流程</text>
<rect x="50" y="60" width="750" height="360" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">重放命令恢复数据</text>
<rect x="70" y="110" width="200" height="80" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="135" text-anchor="middle" font-size="11" font-weight="bold">1. 打开 AOF 文件</text>
<text x="80" y="160" font-size="9">• 读取 appendonly.aof</text>
<text x="80" y="178" font-size="9">• 验证文件格式</text>
<rect x="290" y="110" width="200" height="80" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="390" y="135" text-anchor="middle" font-size="11" font-weight="bold">2. 解析命令</text>
<text x="300" y="160" font-size="9">• 按 RESP 协议解析</text>
<text x="300" y="178" font-size="9">• 逐条读取命令</text>
<rect x="510" y="110" width="200" height="80" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="610" y="135" text-anchor="middle" font-size="11" font-weight="bold">3. 执行命令</text>
<text x="520" y="160" font-size="9">• 逐条执行写命令</text>
<text x="520" y="178" font-size="9">• 重建内存数据</text>
<rect x="70" y="210" width="200" height="80" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="170" y="235" text-anchor="middle" font-size="11" font-weight="bold">4. 处理过期键</text>
<text x="80" y="260" font-size="9">• 检查 EXPIREAT</text>
<text x="80" y="278" font-size="9">• 删除已过期 key</text>
<rect x="290" y="210" width="200" height="80" fill="#fff" stroke="#00796b" stroke-width="1" rx="3"/>
<text x="390" y="235" text-anchor="middle" font-size="11" font-weight="bold">5. 错误处理</text>
<text x="300" y="260" font-size="9">• 命令错误时记录</text>
<text x="300" y="278" font-size="9">• 继续或终止加载</text>
<rect x="510" y="210" width="200" height="80" fill="#fff" stroke="#c2185b" stroke-width="1" rx="3"/>
<text x="610" y="235" text-anchor="middle" font-size="11" font-weight="bold">6. 完成加载</text>
<text x="520" y="260" font-size="9">• 关闭 AOF 文件</text>
<text x="520" y="278" font-size="9">• 数据恢复完成</text>
<rect x="180" y="310" width="490" height="90" fill="#fff" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="425" y="335" text-anchor="middle" font-size="12" font-weight="bold">混合持久化(4.0+)恢复</text>
<text x="190" y="360" font-size="10">1. 检测文件格式(REDIS 开头 = RDB 前缀)</text>
<text x="190" y="378" font-size="10">2. 先加载 RDB 部分(快速恢复大部分数据)</text>
<text x="190" y="396" font-size="10">3. 再执行 AOF 增量命令(恢复最新数据)</text>
<path d="M 170 190 L 170 210" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow-recover)"/>
<path d="M 270 150 L 290 150" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow-recover)"/>
<path d="M 490 150 L 510 150" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-recover)"/>
<path d="M 610 190 L 610 210" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-recover)"/>
<path d="M 390 290 L 390 310" stroke="#00796b" stroke-width="2" marker-end="url(#arrow-recover)"/>
<defs>
<marker id="arrow-recover" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**AOF 恢复过程**:

```bash
# 1. Redis 启动,检测到 appendonly.aof
redis-server redis.conf

# 2. 日志输出
* Reading RDB preamble from AOF file...  # 混合持久化
* Reading the remaining AOF tail...
* DB loaded from append only file: 5.123 seconds

# 3. 内部流程
打开 appendonly.aof
↓
while (读取到命令) {
    解析命令(RESP 协议)
    ↓
    执行命令:
    - SET key value      → 写入内存
    - LPUSH list item    → 构建列表
    - SADD set member    → 构建集合
    - EXPIREAT key time  → 设置过期
    ↓
    if (命令错误) {
        log(错误信息)
        if (aof-load-truncated=yes) {
            continue  # 跳过错误命令
        } else {
            exit(1)   # 终止加载
        }
    }
}
↓
处理过期键(删除已过期)
↓
开始服务
```

**RDB 恢复流程**:

```bash
# 1. Redis 启动,检测到 dump.rdb
redis-server redis.conf

# 2. 日志输出
* DB loaded from disk: 0.123 seconds

# 3. 内部流程
打开 dump.rdb
↓
验证文件头(REDIS + 版本号)
↓
while (读取数据) {
    读取数据库编号
    ↓
    读取 key-value 对:
    - 类型标识
    - key 名称
    - value 内容
    - 过期时间(可选)
    ↓
    根据类型重建数据结构:
    - STRING  → 直接设置
    - LIST    → 重建链表
    - SET     → 重建集合
    - ZSET    → 重建跳表
    - HASH    → 重建哈希表
    ↓
    设置过期时间(如果有)
}
↓
校验 CRC64 校验和
↓
处理过期键(删除已过期)
↓
开始服务
```

**混合持久化恢复**:

```bash
# AOF 文件结构(Redis 4.0+)
+-------------------+
| REDIS 0009        | ← RDB 格式标识
| [RDB 数据]        | ← 完整快照
+-------------------+
| *3\r\n$3\r\nSET... | ← AOF 增量命令
| [AOF 命令]        |
+-------------------+

# 恢复流程
1. 打开 appendonly.aof
2. 读取前几个字节,判断是否是 "REDIS"
   ↓
3. 是 → 混合格式
   ├── 先按 RDB 格式加载快照部分
   └── 再按 AOF 格式执行增量命令
   ↓
4. 否 → 纯 AOF 格式
   └── 直接按 AOF 格式逐条执行命令
```

**恢复性能对比**:

| 恢复方式 | 速度 | 数据完整性 | 文件大小 | 典型耗时(1GB数据) |
|---------|------|-----------|---------|------------------|
| **RDB** | 快 | 可能丢失分钟级 | 小 | 0.5-2秒 |
| **AOF** | 慢 | 最多丢失秒级 | 大 | 10-60秒 |
| **混合持久化** | 较快 | 最多丢失秒级 | 中 | 2-10秒 |

**配置和命令**:

```bash
# redis.conf 配置

# 1. AOF 恢复配置
appendonly yes                    # 启用 AOF
aof-load-truncated yes            # 加载时忽略不完整命令
aof-use-rdb-preamble yes          # 使用混合持久化(4.0+)

# 2. RDB 恢复配置
dbfilename dump.rdb               # RDB 文件名
dir /var/lib/redis/               # 文件路径
rdbchecksum yes                   # 启用校验和

# 3. 恢复行为配置
stop-writes-on-bgsave-error yes   # BGSAVE 失败时停止写入
```

**手动恢复操作**:

```bash
# 场景1: 使用备份的 RDB 恢复
# 1. 停止 Redis
redis-cli SHUTDOWN

# 2. 替换 RDB 文件
cp /backup/dump.rdb /var/lib/redis/dump.rdb

# 3. 启动 Redis
redis-server /etc/redis/redis.conf

# 场景2: 使用备份的 AOF 恢复
# 1. 停止 Redis
redis-cli SHUTDOWN

# 2. 替换 AOF 文件
cp /backup/appendonly.aof /var/lib/redis/appendonly.aof

# 3. 修复 AOF(如果损坏)
redis-check-aof --fix /var/lib/redis/appendonly.aof

# 4. 启动 Redis
redis-server /etc/redis/redis.conf

# 场景3: 同时存在 RDB 和 AOF
# Redis 会优先使用 AOF
# 如果只想用 RDB,需要:
# 1. 临时禁用 AOF
#    appendonly no
# 2. 启动 Redis
# 3. 启动后再开启 AOF
#    CONFIG SET appendonly yes
```

**恢复故障排查**:

**问题1: AOF 文件损坏**
```bash
# 症状
# Bad file format reading the append only file
# Wrong signature trying to load DB from file

# 解决
redis-check-aof --fix appendonly.aof

# 会输出:
# 0x              0: Expected prefix '*', got: 'x'
# AOF analyzed: size=1234, ok_up_to=1200, diff=34
# This will shrink the AOF from 1234 bytes, with 34 bytes, to 1200 bytes
# Continue? [y/N]: y
# Successfully truncated AOF
```

**问题2: RDB 文件损坏**
```bash
# 症状
# Short read or OOM loading DB. Unrecoverable error, aborting now.

# 解决
redis-check-rdb dump.rdb

# 会输出:
# [offset 0] Checking RDB file dump.rdb
# [offset 26] AUX FIELD redis-ver = '6.2.5'
# [offset 40] AUX FIELD redis-bits = '64'
# [offset 52] AUX FIELD ctime = '1638000000'
# ...
# [offset 1234] Checksum OK
# [info] 5 keys read
# [info] 0 expires
# [info] 0 already expired
```

**问题3: 同时存在 RDB 和 AOF,但只想用 RDB**
```bash
# 方法1: 临时移除 AOF
mv appendonly.aof appendonly.aof.bak
redis-server redis.conf
# 启动后再决定是否恢复 AOF

# 方法2: 临时禁用 AOF 配置
# redis.conf
appendonly no
# 启动后再开启
```

**恢复时间估算**:

```bash
# 估算公式

RDB 恢复时间:
恢复时间 ≈ 文件大小(MB) / 500MB/s (SSD) 或 100MB/s (HDD)
例: 5GB RDB ÷ 500MB/s ≈ 10秒

AOF 恢复时间:
恢复时间 ≈ 文件大小(MB) / 50MB/s (命令执行速度)
例: 5GB AOF ÷ 50MB/s ≈ 100秒

混合持久化恢复时间:
RDB 部分: 4GB ÷ 500MB/s ≈ 8秒
AOF 部分: 1GB ÷ 50MB/s ≈ 20秒
总计: 约 30秒
```

**监控恢复过程**:

```bash
# 查看日志
tail -f /var/log/redis/redis.log

# 关键日志:
# RDB 加载:
* DB loaded from disk: 0.123 seconds

# AOF 加载:
* Reading RDB preamble from AOF file...
* Reading the remaining AOF tail...
* DB loaded from append only file: 5.123 seconds

# 连接测试
redis-cli PING
# PONG (说明已启动)

# 查看加载的数据量
redis-cli
> DBSIZE
(integer) 1000000

> INFO stats
# total_commands_processed:1000000
```

**最佳实践**:

**1. 定期备份**:
```bash
# 每天备份 RDB
0 2 * * * cp /var/lib/redis/dump.rdb /backup/redis/dump-$(date +\%Y\%m\%d).rdb

# 每小时备份 AOF
0 * * * * cp /var/lib/redis/appendonly.aof /backup/redis/appendonly-$(date +\%Y\%m\%d\%H).aof
```

**2. 多地备份**:
```bash
# 本地 + 远程
rsync -avz /backup/redis/ user@backup-server:/redis-backup/
```

**3. 验证备份**:
```bash
# 定期验证备份文件完整性
redis-check-rdb /backup/redis/dump.rdb
redis-check-aof /backup/redis/appendonly.aof
```

**4. 演练恢复**:
```bash
# 定期在测试环境演练恢复流程
# 确保关键时刻能快速恢复
```

**5. 监控恢复时间**:
```bash
# 记录每次启动的加载时间
# 如果加载时间过长(>5分钟)
# 考虑优化:
# - 启用混合持久化
# - 减小单实例数据量
# - 升级硬件(SSD)
```

**不同场景恢复策略**:

| 场景 | 推荐策略 | 原因 |
|-----|---------|------|
| **生产环境恢复** | 混合持久化 | 平衡速度和数据完整性 |
| **快速恢复** | RDB only | 速度最快,可接受少量丢失 |
| **数据完整性优先** | AOF only | 最多丢失1秒 |
| **大数据量(>10GB)** | 混合持久化 | 纯 AOF 太慢 |
| **测试环境** | RDB only | 速度快,数据不重要 |

**关键要点**:
- ✓ **优先级**:AOF > RDB > 空实例
- ✓ **AOF 恢复**：重新执行命令,慢但完整
- ✓ **RDB 恢复**：直接加载快照,快但可能丢数据
- ✓ **混合持久化**：先 RDB 再 AOF,最优方案
- ✓ **自动检测**：启动时自动选择恢复方式
- ✓ **错误处理**：支持跳过损坏命令
- ✓ **备份重要**：定期备份,多地存储
- ✓ **验证恢复**：定期演练恢复流程
- ⚠ **恢复时间**：数据量大时需要较长时间
- ⚠ **文件完整性**：使用 redis-check-* 工具验证

**记忆口诀**:Redis恢复AOF优先,RDB备用速度快,混合持久最佳选,启动自动检测加载,重放命令或载快照,过期键处理别忘了,定期备份多地存,演练恢复保平安
