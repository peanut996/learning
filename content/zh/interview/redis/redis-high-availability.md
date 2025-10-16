## 高可用

### 40. 什么是主从复制？如何实现？

**核心答案：**
主从复制是 Redis 实现数据冗余和高可用的基础机制，通过将主节点（Master）的数据自动同步到一个或多个从节点（Slave/Replica），实现读写分离和故障备份。

**实现方式：**

1. **配置方式**
   ```bash
   # 从节点配置文件
   replicaof <master-ip> <master-port>
   masterauth <master-password>  # 如果主节点需要密码

   # 或运行时动态配置
   redis-cli> REPLICAOF 192.168.1.100 6379
   ```

2. **架构模式**

<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
  <rect x="250" y="20" width="100" height="60" fill="#4CAF50" stroke="#333" stroke-width="2" rx="5"/>
  <text x="300" y="45" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Master</text>
  <text x="300" y="65" text-anchor="middle" fill="white" font-size="12">读+写</text>
  <rect x="50" y="180" width="100" height="60" fill="#2196F3" stroke="#333" stroke-width="2" rx="5"/>
  <text x="100" y="205" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Slave 1</text>
  <text x="100" y="225" text-anchor="middle" fill="white" font-size="12">只读</text>
  <rect x="250" y="180" width="100" height="60" fill="#2196F3" stroke="#333" stroke-width="2" rx="5"/>
  <text x="300" y="205" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Slave 2</text>
  <text x="300" y="225" text-anchor="middle" fill="white" font-size="12">只读</text>
  <rect x="450" y="180" width="100" height="60" fill="#2196F3" stroke="#333" stroke-width="2" rx="5"/>
  <text x="500" y="205" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Slave 3</text>
  <text x="500" y="225" text-anchor="middle" fill="white" font-size="12">只读</text>
  <line x1="280" y1="80" x2="120" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="300" y1="80" x2="300" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="320" y1="80" x2="480" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="150" y="130" fill="#666" font-size="12">数据同步</text>
  <text x="300" y="130" fill="#666" font-size="12">数据同步</text>
  <text x="450" y="130" fill="#666" font-size="12">数据同步</text>
</svg>

**应用场景：**
- **读写分离**：主节点处理写操作，从节点分担读操作
- **数据备份**：实时热备份，防止数据丢失
- **故障转移**：主节点故障时可以提升从节点
- **负载均衡**：多个从节点分担读压力

**关键要点：**
- 一主多从，支持链式复制（从节点可以有自己的从节点）
- 主节点不阻塞，异步复制到从节点
- 从节点默认只读，防止数据不一致
- 复制过程对主节点性能影响小

**记忆口诀：** 主写从读，异步复制，一主多从保高用

---

41. 主从复制的原理是什么？

### 41. 主从复制的原理是什么？

**核心答案：**
Redis 主从复制分为**全量复制**和**增量复制**两种方式，首次连接时进行全量同步，后续通过增量同步保持数据一致。

**复制流程：**

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
  <rect x="50" y="20" width="120" height="50" fill="#4CAF50" stroke="#333" stroke-width="2" rx="5"/>
  <text x="110" y="50" text-anchor="middle" fill="white" font-weight="bold">Master</text>
  <rect x="530" y="20" width="120" height="50" fill="#2196F3" stroke="#333" stroke-width="2" rx="5"/>
  <text x="590" y="50" text-anchor="middle" fill="white" font-weight="bold">Slave</text>
  <line x1="170" y1="45" x2="520" y2="45" stroke="#FF5722" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="345" y="35" text-anchor="middle" fill="#FF5722" font-size="13" font-weight="bold">1. PSYNC</text>
  <line x1="520" y1="100" x2="170" y2="100" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="345" y="90" text-anchor="middle" fill="#FF9800" font-size="13" font-weight="bold">2. +FULLRESYNC runid offset</text>
  <rect x="50" y="120" width="120" height="40" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="110" y="145" text-anchor="middle" font-size="12" font-weight="bold">3. BGSAVE</text>
  <line x1="170" y1="180" x2="520" y2="180" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="345" y="170" text-anchor="middle" fill="#4CAF50" font-size="13" font-weight="bold">4. 发送 RDB 文件</text>
  <rect x="530" y="200" width="120" height="40" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="590" y="225" text-anchor="middle" font-size="12" font-weight="bold">5. 加载 RDB</text>
  <line x1="170" y1="260" x2="520" y2="260" stroke="#9C27B0" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="345" y="250" text-anchor="middle" fill="#9C27B0" font-size="13" font-weight="bold">6. 发送缓冲区命令</text>
  <rect x="200" y="290" width="300" height="140" fill="#F5F5F5" stroke="#666" stroke-width="2" rx="5" stroke-dasharray="5,5"/>
  <text x="350" y="310" text-anchor="middle" font-size="14" font-weight="bold">增量复制阶段</text>
  <line x1="170" y1="340" x2="520" y2="340" stroke="#00BCD4" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="345" y="330" text-anchor="middle" fill="#00BCD4" font-size="12">写命令1</text>
  <line x1="170" y1="370" x2="520" y2="370" stroke="#00BCD4" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="345" y="360" text-anchor="middle" fill="#00BCD4" font-size="12">写命令2</text>
  <line x1="170" y1="400" x2="520" y2="400" stroke="#00BCD4" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="345" y="390" text-anchor="middle" fill="#00BCD4" font-size="12">写命令3...</text>
</svg>

**详细说明：**

1. **建立连接（第1-2步）**
   - 从节点发送 `PSYNC <runid> <offset>` 命令
   - 首次连接：`PSYNC ? -1`（请求全量复制）
   - 断线重连：`PSYNC <上次的runid> <offset>`（尝试增量复制）

2. **全量复制（第3-6步）**
   - **BGSAVE**：Master 在后台生成 RDB 快照
   - **缓冲写命令**：生成 RDB 期间，Master 将新写命令存入复制缓冲区
   - **传输 RDB**：将 RDB 文件发送给 Slave
   - **加载数据**：Slave 清空旧数据，加载 RDB 文件
   - **同步缓冲**：Master 发送缓冲区中的写命令

3. **增量复制（第7步起）**
   - Master 持续将写命令发送给 Slave
   - Slave 执行接收到的命令，保持数据同步
   - 通过 `replication backlog`（复制积压缓冲区）支持断线重连

**三种复制场景：**

| 场景 | 触发条件 | 同步方式 | 性能影响 |
|------|---------|---------|---------|
| **首次连接** | Slave 第一次连接 Master | 全量复制 | Master 需要 BGSAVE，网络传输 RDB |
| **断线重连** | 短时间断线，offset 在 backlog 内 | 增量复制 | 仅传输缺失的命令，影响小 |
| **长时间断线** | offset 不在 backlog 内 | 全量复制 | 重新 BGSAVE，影响大 |

**关键配置参数：**
```bash
# 复制积压缓冲区大小（默认1MB）
repl-backlog-size 1mb

# 主节点超时时间
repl-timeout 60

# 是否开启无盘复制（不生成RDB文件，直接网络传输）
repl-diskless-sync no
```

**关键要点：**
- **PSYNC** 是核心命令，自动选择全量或增量复制
- **复制偏移量（offset）** 用于记录同步进度
- **运行ID（runid）** 用于标识 Master 身份
- **复制积压缓冲区** 是环形缓冲区，保存最近的写命令

**记忆口诀：** 首次全量 RDB 传，后续增量命令传，断线重连看偏移，积压缓冲是关键

---

42. 什么是哨兵模式（Sentinel）？

### 42. 什么是哨兵模式（Sentinel）？

**核心答案：**
Redis Sentinel 是 Redis 官方提供的高可用解决方案，通过独立的哨兵进程监控主从节点，在主节点故障时自动进行故障转移，实现无人工干预的自动化容灾。

**架构图：**

<svg viewBox="0 0 650 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
  <rect x="120" y="280" width="410" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5" stroke-dasharray="5,5"/>
  <text x="325" y="265" text-anchor="middle" font-size="14" font-weight="bold" fill="#FF9800">Sentinel 集群（监控层）</text>
  <rect x="50" y="20" width="100" height="60" fill="#4CAF50" stroke="#333" stroke-width="2" rx="5"/>
  <text x="100" y="45" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Master</text>
  <text x="100" y="65" text-anchor="middle" fill="white" font-size="11">192.168.1.10</text>
  <rect x="250" y="20" width="100" height="60" fill="#2196F3" stroke="#333" stroke-width="2" rx="5"/>
  <text x="300" y="45" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Slave 1</text>
  <text x="300" y="65" text-anchor="middle" fill="white" font-size="11">192.168.1.11</text>
  <rect x="450" y="20" width="100" height="60" fill="#2196F3" stroke="#333" stroke-width="2" rx="5"/>
  <text x="500" y="45" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Slave 2</text>
  <text x="500" y="65" text-anchor="middle" fill="white" font-size="11">192.168.1.12</text>
  <line x1="150" y1="50" x2="240" y2="50" stroke="#666" stroke-width="2" marker-end="url(#arr)"/>
  <text x="195" y="42" text-anchor="middle" font-size="10" fill="#666">复制</text>
  <line x1="350" y1="50" x2="440" y2="50" stroke="#666" stroke-width="2" marker-end="url(#arr)"/>
  <text x="395" y="42" text-anchor="middle" font-size="10" fill="#666">复制</text>
  <circle cx="150" cy="310" r="30" fill="#FF9800" stroke="#333" stroke-width="2"/>
  <text x="150" y="315" text-anchor="middle" fill="white" font-size="12" font-weight="bold">S1</text>
  <circle cx="325" cy="310" r="30" fill="#FF9800" stroke="#333" stroke-width="2"/>
  <text x="325" y="315" text-anchor="middle" fill="white" font-size="12" font-weight="bold">S2</text>
  <circle cx="500" cy="310" r="30" fill="#FF9800" stroke="#333" stroke-width="2"/>
  <text x="500" y="315" text-anchor="middle" fill="white" font-size="12" font-weight="bold">S3</text>
  <line x1="120" y1="90" x2="150" y2="280" stroke="#FF5722" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="280" y1="90" x2="325" y2="280" stroke="#FF5722" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="480" y1="90" x2="500" y2="280" stroke="#FF5722" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="180" y1="310" x2="295" y2="310" stroke="#666" stroke-width="1.5" stroke-dasharray="2,2"/>
  <line x1="355" y1="310" x2="470" y2="310" stroke="#666" stroke-width="1.5" stroke-dasharray="2,2"/>
  <text x="325" y="145" text-anchor="middle" font-size="12" fill="#FF5722">心跳监控</text>
  <text x="325" y="365" text-anchor="middle" font-size="11" fill="#666">Sentinel 之间互相通信</text>
</svg>

**核心功能：**

1. **监控（Monitoring）**
   - 持续检查主从节点是否正常工作
   - 通过发送 PING 命令进行健康检查

2. **通知（Notification）**
   - 当监控的 Redis 实例出现问题时，通过 API 通知系统管理员或其他应用程序

3. **自动故障转移（Automatic Failover）**
   - 主节点故障时，自动将一个从节点提升为新主节点
   - 其他从节点重新配置为新主节点的从节点
   - 通知客户端新的主节点地址

4. **配置提供者（Configuration Provider）**
   - 客户端连接 Sentinel 获取当前主节点地址
   - 主节点变更时，Sentinel 通知客户端新地址

**配置示例：**
```bash
# sentinel.conf
port 26379
sentinel monitor mymaster 192.168.1.10 6379 2  # 2个Sentinel同意才判定下线
sentinel down-after-milliseconds mymaster 5000   # 5秒无响应判定主观下线
sentinel parallel-syncs mymaster 1               # 故障转移时同时进行复制的从节点数
sentinel failover-timeout mymaster 180000        # 故障转移超时时间
```

**部署要求：**
- **至少3个 Sentinel 节点**（保证高可用和选举）
- **奇数个节点**（便于选举达成多数派）
- **分布式部署**（不同物理机，避免单点故障）

**关键要点：**
- Sentinel 是独立进程，不处理数据请求
- 通过 **Raft 算法**选举 Leader 执行故障转移
- 客户端需要支持 Sentinel 协议（如 Jedis、Lettuce）
- 适合中小规模、对可用性要求高的场景

**记忆口诀：** 哨兵独立监主从，故障自动做转移，三节点奇数保选举

---

43. 哨兵模式的工作原理是什么？

### 43. 哨兵模式的工作原理是什么？

**核心答案：**
Sentinel 通过**主观下线**和**客观下线**判断主节点故障，然后通过**选举**机制选出 Leader Sentinel 执行故障转移，将从节点提升为新主节点。

**工作流程图：**

<svg viewBox="0 0 750 550" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="a1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
  <rect x="50" y="20" width="650" height="520" fill="none" stroke="#999" stroke-width="2" rx="5"/>
  <rect x="70" y="40" width="200" height="100" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="170" y="60" text-anchor="middle" font-weight="bold" font-size="14">阶段1: 监控与发现</text>
  <text x="170" y="85" text-anchor="middle" font-size="12">• Sentinel 每秒向主从发送 PING</text>
  <text x="170" y="105" text-anchor="middle" font-size="12">• Master 超时未响应</text>
  <text x="170" y="125" text-anchor="middle" font-size="12">• 标记为<tspan font-weight="bold" fill="#F44336">主观下线(SDOWN)</tspan></text>
  <rect x="320" y="40" width="200" height="100" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="420" y="60" text-anchor="middle" font-weight="bold" font-size="14">阶段2: 客观下线判定</text>
  <text x="420" y="85" text-anchor="middle" font-size="12">• 询问其他 Sentinel 的判断</text>
  <text x="420" y="105" text-anchor="middle" font-size="12">• 达到 quorum 数量同意</text>
  <text x="420" y="125" text-anchor="middle" font-size="12">• 标记为<tspan font-weight="bold" fill="#FF9800">客观下线(ODOWN)</tspan></text>
  <rect x="70" y="180" width="200" height="100" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="170" y="200" text-anchor="middle" font-weight="bold" font-size="14">阶段3: 选举 Leader</text>
  <text x="170" y="225" text-anchor="middle" font-size="12">• Sentinel 之间发起投票</text>
  <text x="170" y="245" text-anchor="middle" font-size="12">• 采用 Raft 算法选举</text>
  <text x="170" y="265" text-anchor="middle" font-size="12">• 获得<tspan font-weight="bold" fill="#4CAF50">多数派</tspan>选票的 Sentinel 胜出</text>
  <rect x="320" y="180" width="200" height="100" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="420" y="200" text-anchor="middle" font-weight="bold" font-size="14">阶段4: 选择新主节点</text>
  <text x="420" y="220" text-anchor="middle" font-size="12">Leader Sentinel 选择从节点：</text>
  <text x="420" y="240" text-anchor="middle" font-size="11">1. 排除下线/断开连接的</text>
  <text x="420" y="255" text-anchor="middle" font-size="11">2. 选择优先级最高的</text>
  <text x="420" y="270" text-anchor="middle" font-size="11">3. 选择偏移量最大的（数据最新）</text>
  <rect x="70" y="320" width="200" height="100" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
  <text x="170" y="340" text-anchor="middle" font-weight="bold" font-size="14">阶段5: 故障转移</text>
  <text x="170" y="360" text-anchor="middle" font-size="12">• 向选中的从节点发送</text>
  <text x="170" y="380" text-anchor="middle" font-size="12"><tspan font-weight="bold">SLAVEOF NO ONE</tspan></text>
  <text x="170" y="400" text-anchor="middle" font-size="12">• 将其他从节点指向新主节点</text>
  <rect x="320" y="320" width="200" height="100" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
  <text x="420" y="340" text-anchor="middle" font-weight="bold" font-size="14">阶段6: 更新配置</text>
  <text x="420" y="365" text-anchor="middle" font-size="12">• 更新 Sentinel 配置</text>
  <text x="420" y="385" text-anchor="middle" font-size="12">• 通知客户端新的主节点地址</text>
  <text x="420" y="405" text-anchor="middle" font-size="12">• 监控旧主节点恢复情况</text>
  <line x1="270" y1="90" x2="310" y2="90" stroke="#666" stroke-width="2" marker-end="url(#a1)"/>
  <line x1="170" y1="140" x2="170" y2="170" stroke="#666" stroke-width="2" marker-end="url(#a1)"/>
  <line x1="270" y1="230" x2="310" y2="230" stroke="#666" stroke-width="2" marker-end="url(#a1)"/>
  <line x1="170" y1="280" x2="170" y2="310" stroke="#666" stroke-width="2" marker-end="url(#a1)"/>
  <line x1="270" y1="370" x2="310" y2="370" stroke="#666" stroke-width="2" marker-end="url(#a1)"/>
  <rect x="560" y="40" width="130" height="400" fill="#FFFDE7" stroke="#FBC02D" stroke-width="2" rx="5"/>
  <text x="625" y="60" text-anchor="middle" font-weight="bold" font-size="13" fill="#F57F17">关键配置</text>
  <text x="625" y="85" text-anchor="middle" font-size="11">quorum: 2</text>
  <text x="625" y="105" text-anchor="middle" font-size="10">（判定下线需要的</text>
  <text x="625" y="120" text-anchor="middle" font-size="10">Sentinel 同意数）</text>
  <text x="625" y="150" text-anchor="middle" font-size="11">down-after-ms:</text>
  <text x="625" y="165" text-anchor="middle" font-size="11">30000</text>
  <text x="625" y="185" text-anchor="middle" font-size="10">（判定主观下线</text>
  <text x="625" y="200" text-anchor="middle" font-size="10">的超时时间）</text>
  <text x="625" y="230" text-anchor="middle" font-size="11">failover-timeout:</text>
  <text x="625" y="245" text-anchor="middle" font-size="11">180000</text>
  <text x="625" y="265" text-anchor="middle" font-size="10">（故障转移</text>
  <text x="625" y="280" text-anchor="middle" font-size="10">超时时间）</text>
  <text x="625" y="310" text-anchor="middle" font-size="11">parallel-syncs: 1</text>
  <text x="625" y="330" text-anchor="middle" font-size="10">（同时复制的</text>
  <text x="625" y="345" text-anchor="middle" font-size="10">从节点数量）</text>
</svg>

**详细说明：**

**1. 主观下线（Subjectively Down, SDOWN）**
- 单个 Sentinel 认为主节点下线
- 条件：`down-after-milliseconds` 时间内无响应

**2. 客观下线（Objectively Down, ODOWN）**
- 多个 Sentinel 达成共识，主节点确实下线
- 条件：至少 `quorum` 个 Sentinel 判定为 SDOWN

**3. Leader 选举**
- 使用 **Raft 算法**进行选举
- 每个 Sentinel 有一票，先到先得
- 获得 **大多数**（majority = N/2 + 1）选票的成为 Leader

**4. 新主节点选择规则（优先级递减）：**
   1. 排除状态不健康的从节点
   2. 选择配置 `slave-priority` 最高的
   3. 选择复制偏移量（offset）最大的（数据最完整）
   4. 选择 runid 最小的（字典序）

**5. 故障转移步骤：**
   ```
   Leader Sentinel 执行:
   1. 向新主节点发送: SLAVEOF NO ONE
   2. 向其他从节点发送: SLAVEOF <new-master-ip> <new-master-port>
   3. 更新内部配置，记录新主节点信息
   4. 通知其他 Sentinel 和客户端
   ```

**关键参数：**

| 参数 | 说明 | 建议值 |
|------|------|--------|
| **quorum** | 判定客观下线的 Sentinel 数量 | N/2 + 1（N为Sentinel总数） |
| **majority** | 故障转移授权需要的 Sentinel 数量 | 自动计算：N/2 + 1 |
| **down-after-milliseconds** | 主观下线判定时间 | 30000（30秒） |
| **failover-timeout** | 故障转移超时时间 | 180000（3分钟） |

**关键要点：**
- **quorum** 和 **majority** 是两个不同的概念
  - quorum：判定下线的门槛（可配置）
  - majority：选举 Leader 和授权转移的门槛（固定为多数派）
- Sentinel 之间通过 **Pub/Sub** 机制发现彼此
- 客户端需要支持 Sentinel 协议，自动发现新主节点

**记忆口诀：** 主观客观两下线，选举 Leader 做转移，多数派权威定，从中择优做新主

---

44. 什么是 Redis 集群？

### 44. 什么是 Redis 集群？

**核心答案：**
Redis Cluster 是 Redis 官方的分布式解决方案，通过数据分片实现横向扩展，支持海量数据存储和高并发访问，同时提供自动故障转移功能。

**集群架构图：**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="ar" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
  <text x="350" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis Cluster (6节点: 3主3从)</text>
  <rect x="50" y="50" width="180" height="140" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="140" y="70" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">分片1</text>
  <rect x="70" y="85" width="140" height="45" fill="#4CAF50" stroke="#333" stroke-width="2" rx="3"/>
  <text x="140" y="105" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Master 1</text>
  <text x="140" y="120" text-anchor="middle" fill="white" font-size="10">Slot: 0-5460</text>
  <rect x="70" y="140" width="140" height="35" fill="#81C784" stroke="#333" stroke-width="2" rx="3"/>
  <text x="140" y="160" text-anchor="middle" fill="white" font-size="11">Slave 1</text>
  <line x1="140" y1="130" x2="140" y2="135" stroke="#666" stroke-width="1.5" stroke-dasharray="2,2"/>
  <rect x="260" y="50" width="180" height="140" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="350" y="70" text-anchor="middle" font-size="13" font-weight="bold" fill="#1565C0">分片2</text>
  <rect x="280" y="85" width="140" height="45" fill="#2196F3" stroke="#333" stroke-width="2" rx="3"/>
  <text x="350" y="105" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Master 2</text>
  <text x="350" y="120" text-anchor="middle" fill="white" font-size="10">Slot: 5461-10922</text>
  <rect x="280" y="140" width="140" height="35" fill="#64B5F6" stroke="#333" stroke-width="2" rx="3"/>
  <text x="350" y="160" text-anchor="middle" fill="white" font-size="11">Slave 2</text>
  <line x1="350" y1="130" x2="350" y2="135" stroke="#666" stroke-width="1.5" stroke-dasharray="2,2"/>
  <rect x="470" y="50" width="180" height="140" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="560" y="70" text-anchor="middle" font-size="13" font-weight="bold" fill="#E65100">分片3</text>
  <rect x="490" y="85" width="140" height="45" fill="#FF9800" stroke="#333" stroke-width="2" rx="3"/>
  <text x="560" y="105" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Master 3</text>
  <text x="560" y="120" text-anchor="middle" fill="white" font-size="10">Slot: 10923-16383</text>
  <rect x="490" y="140" width="140" height="35" fill="#FFB74D" stroke="#333" stroke-width="2" rx="3"/>
  <text x="560" y="160" text-anchor="middle" fill="white" font-size="11">Slave 3</text>
  <line x1="560" y1="130" x2="560" y2="135" stroke="#666" stroke-width="1.5" stroke-dasharray="2,2"/>
  <line x1="210" y1="120" x2="250" y2="120" stroke="#9E9E9E" stroke-width="2" stroke-dasharray="3,3"/>
  <line x1="420" y1="120" x2="460" y2="120" stroke="#9E9E9E" stroke-width="2" stroke-dasharray="3,3"/>
  <text x="230" y="110" text-anchor="middle" font-size="10" fill="#666">Gossip</text>
  <text x="440" y="110" text-anchor="middle" font-size="10" fill="#666">Gossip</text>
  <rect x="50" y="220" width="600" height="160" fill="#F5F5F5" stroke="#666" stroke-width="2" rx="5"/>
  <text x="350" y="245" text-anchor="middle" font-size="14" font-weight="bold">核心特性</text>
  <text x="180" y="275" text-anchor="middle" font-size="12" fill="#4CAF50" font-weight="bold">数据分片</text>
  <text x="180" y="295" font-size="11">• 16384 个哈希槽</text>
  <text x="180" y="310" font-size="11">• CRC16 算法分配</text>
  <text x="180" y="325" font-size="11">• 支持横向扩展</text>
  <text x="180" y="340" font-size="11">• 无中心化架构</text>
  <text x="350" y="275" text-anchor="middle" font-size="12" fill="#2196F3" font-weight="bold">高可用</text>
  <text x="350" y="295" font-size="11">• 主从自动复制</text>
  <text x="350" y="310" font-size="11">• 自动故障转移</text>
  <text x="350" y="325" font-size="11">• 节点健康检测</text>
  <text x="350" y="340" font-size="11">• 数据冗余备份</text>
  <text x="520" y="275" text-anchor="middle" font-size="12" fill="#FF9800" font-weight="bold">通信机制</text>
  <text x="520" y="295" font-size="11">• Gossip 协议</text>
  <text x="520" y="310" font-size="11">• 节点相互发现</text>
  <text x="520" y="325" font-size="11">• 拓扑信息同步</text>
  <text x="520" y="340" font-size="11">• 客户端智能路由</text>
</svg>

**核心特点：**

1. **数据分片（Sharding）**
   - 16384 个哈希槽（Hash Slot）
   - 每个主节点负责一部分槽
   - 通过 `CRC16(key) % 16384` 计算槽位

2. **去中心化架构**
   - 无需 Proxy 或 Sentinel
   - 节点之间通过 **Gossip 协议**通信
   - 每个节点都知道整个集群的拓扑结构

3. **高可用性**
   - 每个主节点可以有多个从节点
   - 主节点故障时，自动提升从节点
   - 支持最终一致性

4. **横向扩展**
   - 动态增加/删除节点
   - 在线数据迁移（Resharding）
   - 最多支持 1000 个节点

**创建集群示例：**
```bash
# Redis 5.0+ 使用内置命令
redis-cli --cluster create \
  192.168.1.10:7000 192.168.1.10:7001 \
  192.168.1.10:7002 192.168.1.10:7003 \
  192.168.1.10:7004 192.168.1.10:7005 \
  --cluster-replicas 1  # 每个主节点1个从节点

# 检查集群状态
redis-cli --cluster check 192.168.1.10:7000
```

**客户端访问：**
```bash
# 连接集群（-c 参数启用集群模式）
redis-cli -c -h 192.168.1.10 -p 7000

# 查看集群信息
127.0.0.1:7000> CLUSTER INFO
127.0.0.1:7000> CLUSTER NODES
```

**适用场景：**
- **海量数据存储**：单机无法容纳的数据量
- **高并发访问**：读写压力分散到多个节点
- **高可用要求**：自动故障转移，无需人工干预
- **弹性伸缩**：业务增长时动态扩容

**优势与限制：**

| 优势 | 限制 |
|------|------|
| ✅ 无单点故障 | ❌ 不支持多数据库（只有 DB0） |
| ✅ 读写性能线性扩展 | ❌ 批量操作受限（需同一槽） |
| ✅ 自动数据分片 | ❌ 事务仅支持单 key |
| ✅ 动态扩容缩容 | ❌ 运维复杂度较高 |

**关键要点：**
- 最少需要 **3 个主节点**（保证分片和选举）
- 推荐 **6 个节点**（3主3从）保证高可用
- 使用 **一致性哈希槽**而非一致性哈希环
- 客户端需要支持集群模式（如 JedisCluster）

**记忆口诀：** 集群分片横扩展，无中心化 Gossip 传，主从复制保可用，哈希槽位定归属

---

### 45. Redis 集群的数据分片策略是什么？

**核心答案：**
Redis Cluster 采用**哈希槽（Hash Slot）**分片策略，将整个数据空间划分为 **16384** 个槽位，通过 `CRC16(key) % 16384` 计算 key 所属的槽，每个主节点负责一部分槽。

**详细说明：**

**哈希槽分片流程：**

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
  <text x="350" y="25" text-anchor="middle" font-size="16" font-weight="bold">数据分片流程</text>
  <rect x="250" y="50" width="200" height="60" fill="#2196F3" stroke="#333" stroke-width="2" rx="5"/>
  <text x="350" y="75" text-anchor="middle" fill="white" font-size="14" font-weight="bold">1. 客户端请求</text>
  <text x="350" y="95" text-anchor="middle" fill="white" font-size="12">SET user:1000 "Alice"</text>
  <rect x="250" y="140" width="200" height="60" fill="#4CAF50" stroke="#333" stroke-width="2" rx="5"/>
  <text x="350" y="165" text-anchor="middle" fill="white" font-size="14" font-weight="bold">2. 计算哈希槽</text>
  <text x="350" y="185" text-anchor="middle" fill="white" font-size="11">CRC16("user:1000") % 16384 = 8888</text>
  <rect x="250" y="230" width="200" height="60" fill="#FF9800" stroke="#333" stroke-width="2" rx="5"/>
  <text x="350" y="255" text-anchor="middle" fill="white" font-size="14" font-weight="bold">3. 查找负责节点</text>
  <text x="350" y="275" text-anchor="middle" fill="white" font-size="11">Slot 8888 → Master 2</text>
  <rect x="250" y="320" width="200" height="60" fill="#9C27B0" stroke="#333" stroke-width="2" rx="5"/>
  <text x="350" y="345" text-anchor="middle" fill="white" font-size="14" font-weight="bold">4. 路由到目标节点</text>
  <text x="350" y="365" text-anchor="middle" fill="white" font-size="11">Master 2 执行写入操作</text>
  <line x1="350" y1="110" x2="350" y2="135" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
  <line x1="350" y1="200" x2="350" y2="225" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
  <line x1="350" y1="290" x2="350" y2="315" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
  <rect x="50" y="50" width="150" height="330" fill="#F5F5F5" stroke="#666" stroke-width="2" rx="5"/>
  <text x="125" y="75" text-anchor="middle" font-size="13" font-weight="bold">16384 个槽</text>
  <rect x="60" y="90" width="130" height="35" fill="#4CAF50" stroke="#333" stroke-width="1.5" rx="3"/>
  <text x="125" y="110" text-anchor="middle" font-size="11" fill="white">0-5460</text>
  <text x="125" y="120" text-anchor="middle" font-size="9" fill="white">Master 1</text>
  <rect x="60" y="135" width="130" height="35" fill="#2196F3" stroke="#333" stroke-width="1.5" rx="3"/>
  <text x="125" y="155" text-anchor="middle" font-size="11" fill="white">5461-10922</text>
  <text x="125" y="165" text-anchor="middle" font-size="9" fill="white">Master 2</text>
  <rect x="60" y="180" width="130" height="35" fill="#FF9800" stroke="#333" stroke-width="1.5" rx="3"/>
  <text x="125" y="200" text-anchor="middle" font-size="11" fill="white">10923-16383</text>
  <text x="125" y="210" text-anchor="middle" font-size="9" fill="white">Master 3</text>
  <line x1="125" y1="230" x2="125" y2="250" stroke="#9C27B0" stroke-width="2" marker-end="url(#arrow2)"/>
  <text x="125" y="268" text-anchor="middle" font-size="11" fill="#9C27B0" font-weight="bold">Slot 8888</text>
  <text x="125" y="282" text-anchor="middle" font-size="10" fill="#9C27B0">↓</text>
  <rect x="70" y="290" width="110" height="30" fill="#2196F3" stroke="#333" stroke-width="2" rx="3"/>
  <text x="125" y="310" text-anchor="middle" font-size="11" fill="white" font-weight="bold">Master 2</text>
  <rect x="500" y="50" width="180" height="330" fill="#FFFDE7" stroke="#FBC02D" stroke-width="2" rx="5"/>
  <text x="590" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#F57F17">Hash Tag</text>
  <text x="590" y="100" font-size="11">多 key 操作需在</text>
  <text x="590" y="115" font-size="11">同一槽：</text>
  <text x="590" y="140" font-size="10" font-family="monospace">user:{1000}:name</text>
  <text x="590" y="155" font-size="10" font-family="monospace">user:{1000}:age</text>
  <text x="590" y="175" font-size="10">都计算 {1000} 的槽</text>
  <rect x="510" y="195" width="160" height="50" fill="white" stroke="#FF9800" stroke-width="1.5" rx="3"/>
  <text x="590" y="215" text-anchor="middle" font-size="11" font-weight="bold">槽迁移</text>
  <text x="590" y="230" text-anchor="middle" font-size="10">支持在线</text>
  <text x="590" y="242" text-anchor="middle" font-size="10">动态调整</text>
  <rect x="510" y="255" width="160" height="115" fill="white" stroke="#4CAF50" stroke-width="1.5" rx="3"/>
  <text x="590" y="275" text-anchor="middle" font-size="11" font-weight="bold">为何 16384？</text>
  <text x="590" y="293" font-size="9">1. 心跳包大小合理</text>
  <text x="590" y="307" font-size="9">   (2KB bitmap)</text>
  <text x="590" y="323" font-size="9">2. 主节点一般不超过</text>
  <text x="590" y="337" font-size="9">   1000个</text>
  <text x="590" y="353" font-size="9">3. 槽迁移效率更高</text>
</svg>

**详细说明：**

**1. 哈希槽计算**
```python
# 伪代码
slot = CRC16(key) & 16383  # 等价于 % 16384

# 示例
key = "user:1000"
slot = CRC16("user:1000") & 16383  # 结果: 8888
```

**2. Hash Tag（哈希标签）**
当 key 包含 `{...}` 时，只对花括号内的内容计算哈希：
```bash
# 以下 key 会分配到同一个槽
user:{1000}:name     → CRC16("1000") & 16383
user:{1000}:age      → CRC16("1000") & 16383
user:{1000}:email    → CRC16("1000") & 16383

# 支持批量操作和事务
MGET user:{1000}:name user:{1000}:age
```

**3. 槽分配方式**

| 方式 | 说明 | 适用场景 |
|------|------|---------|
| **自动分配** | 创建集群时平均分配 | 新建集群 |
| **手动分配** | 使用 `CLUSTER ADDSLOTS` | 精细控制 |
| **在线迁移** | 使用 `CLUSTER SETSLOT` | 动态扩缩容 |

**4. 槽迁移流程**
```bash
# 场景：将槽 8888 从 Master 2 迁移到 Master 4
# 1. 标记槽为迁移状态
CLUSTER SETSLOT 8888 MIGRATING <Master 4的node-id>  # 在源节点执行
CLUSTER SETSLOT 8888 IMPORTING <Master 2的node-id>  # 在目标节点执行

# 2. 迁移数据
CLUSTER GETKEYSINSLOT 8888 100  # 获取槽中的 key
MIGRATE <target-ip> <target-port> <key> 0 5000  # 逐个迁移

# 3. 完成迁移
CLUSTER SETSLOT 8888 NODE <Master 4的node-id>  # 在所有节点执行
```

**5. 客户端路由**

**MOVED 重定向（槽已迁移）：**
```bash
127.0.0.1:7000> GET user:1000
(error) MOVED 8888 192.168.1.11:7001  # 槽 8888 在 7001 节点
```

**ASK 重定向（槽正在迁移）：**
```bash
127.0.0.1:7000> GET user:1000
(error) ASK 8888 192.168.1.12:7002  # 临时重定向
```

智能客户端会缓存槽映射表，减少重定向次数。

**为什么是 16384 个槽？**

1. **心跳包大小合理**
   - 节点间通过 Gossip 协议传输槽信息
   - 16384 个槽需要 2KB 的 bitmap（16384/8 = 2048 字节）
   - 65536 个槽需要 8KB，心跳包过大

2. **集群规模考虑**
   - 官方推荐最多 1000 个节点
   - 16384 个槽平均每个节点 16-17 个槽，分布均匀

3. **迁移效率**
   - 槽数量越少，迁移粒度越大，效率越高

**关键要点：**
- **哈希槽** 是预分片机制，避免了一致性哈希的数据倾斜问题
- **Hash Tag** 解决了多 key 操作限制
- 支持**在线槽迁移**，无需停机
- 客户端需要实现**智能路由**（Smart Client）

**记忆口诀：** 一万六千槽预分，CRC16 取模定归属，Hash Tag 聚相关，在线迁移保平滑

---

### 46. 什么是哈希槽？

**核心答案：**
哈希槽（Hash Slot）是 Redis Cluster 用于数据分片的核心机制，将所有数据划分为 **16384** 个槽位，每个 key 通过 `CRC16(key) % 16384` 计算归属的槽，不同的槽由不同的节点负责。

**详细说明：**

**哈希槽的本质：**
- **预分片机制**：提前将数据空间划分为固定数量的槽
- **路由依据**：key → slot → node 的两级映射
- **无中心设计**：每个节点都知道所有槽的分配情况

**与一致性哈希的对比：**

| 维度 | 哈希槽 | 一致性哈希 |
|-----|--------|----------|
| 槽数量 | 固定 16384 个 | 虚拟节点数可变 |
| 数据分布 | 均匀可控 | 可能倾斜 |
| 扩缩容 | 按槽迁移 | 按虚拟节点迁移 |
| 实现复杂度 | 简单 | 相对复杂 |

**哈希槽的优势：**
1. **分布均匀**：可精确控制每个节点负责的槽数
2. **迁移方便**：以槽为单位，粒度合适
3. **路由简单**：客户端只需维护槽到节点的映射表
4. **支持 Hash Tag**：相关 key 可分配到同一槽，支持批量操作

**关键要点：**
- 哈希槽是 Redis Cluster 的**核心分片机制**
- **16384** 个槽在心跳包大小、集群规模、迁移效率之间取得平衡
- 支持**在线迁移**，不影响服务可用性
- 详细的分片策略和实现参见**问题 45**

**记忆口诀：** 固定槽位一万六，CRC 计算定归属，预分片避免倾斜，按槽迁移最方便

---

### 47. Redis 集群如何实现故障转移？

**核心答案：**
Redis Cluster 通过 **Gossip 协议**进行节点健康检测，当多数主节点判定某主节点故障时，自动将其从节点提升为新主节点，无需 Sentinel 参与。

**故障转移流程：**

<svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="a3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
  <text x="350" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis Cluster 故障转移</text>
  <rect x="50" y="50" width="280" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="190" y="70" text-anchor="middle" font-size="13" font-weight="bold">阶段1: 故障检测</text>
  <text x="190" y="90" font-size="11">• 节点通过 Gossip 协议互相 PING</text>
  <text x="190" y="105" font-size="11">• 超时未响应标记为 <tspan fill="#F44336" font-weight="bold">PFAIL</tspan></text>
  <text x="190" y="120" font-size="11">• 半数以上主节点确认则标记 <tspan fill="#D32F2F" font-weight="bold">FAIL</tspan></text>
  <rect x="370" y="50" width="280" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="510" y="70" text-anchor="middle" font-size="13" font-weight="bold">阶段2: 从节点选举</text>
  <text x="510" y="90" font-size="11">• 从节点发现主节点 FAIL</text>
  <text x="510" y="105" font-size="11">• 向其他主节点请求投票</text>
  <text x="510" y="120" font-size="11">• 获得<tspan font-weight="bold" fill="#FF9800">多数派</tspan>选票的从节点胜出</text>
  <rect x="50" y="160" width="280" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="190" y="180" text-anchor="middle" font-size="13" font-weight="bold">阶段3: 提升为主节点</text>
  <text x="190" y="200" font-size="11">• 胜出的从节点执行 <tspan font-weight="bold">REPLICAOF NO ONE</tspan></text>
  <text x="190" y="215" font-size="11">• 接管旧主节点的所有槽</text>
  <text x="190" y="230" font-size="11">• 通过 Gossip 广播新配置</text>
  <rect x="370" y="160" width="280" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="510" y="180" text-anchor="middle" font-size="13" font-weight="bold">阶段4: 更新集群配置</text>
  <text x="510" y="200" font-size="11">• 其他节点收到 Gossip 消息</text>
  <text x="510" y="215" font-size="11">• 更新槽映射表</text>
  <text x="510" y="230" font-size="11">• 客户端自动发现新主节点</text>
  <line x1="330" y1="90" x2="360" y2="90" stroke="#666" stroke-width="2" marker-end="url(#a3)"/>
  <line x1="190" y1="130" x2="190" y2="150" stroke="#666" stroke-width="2" marker-end="url(#a3)"/>
  <line x1="330" y1="200" x2="360" y2="200" stroke="#666" stroke-width="2" marker-end="url(#a3)"/>
  <rect x="50" y="270" width="600" height="210" fill="#F5F5F5" stroke="#666" stroke-width="2" rx="5"/>
  <text x="350" y="295" text-anchor="middle" font-size="14" font-weight="bold">关键机制详解</text>
  <rect x="70" y="310" width="270" height="155" fill="white" stroke="#9C27B0" stroke-width="1.5" rx="3"/>
  <text x="205" y="330" text-anchor="middle" font-size="12" font-weight="bold" fill="#9C27B0">PFAIL vs FAIL</text>
  <text x="205" y="355" text-anchor="middle" font-size="11" font-weight="bold">PFAIL (可能失败)</text>
  <text x="205" y="373" font-size="10">• 单个节点主观判断</text>
  <text x="205" y="388" font-size="10">• 超过 <tspan font-weight="bold">cluster-node-timeout</tspan> 未响应</text>
  <text x="205" y="410" text-anchor="middle" font-size="11" font-weight="bold">FAIL (确认失败)</text>
  <text x="205" y="428" font-size="10">• 大多数主节点确认 PFAIL</text>
  <text x="205" y="443" font-size="10">• 触发故障转移流程</text>
  <rect x="360" y="310" width="270" height="155" fill="white" stroke="#00BCD4" stroke-width="1.5" rx="3"/>
  <text x="495" y="330" text-anchor="middle" font-size="12" font-weight="bold" fill="#00BCD4">选举机制</text>
  <text x="495" y="353" font-size="10"><tspan font-weight="bold">• 延迟投票：</tspan>复制偏移量越大,延迟越短</text>
  <text x="495" y="373" font-size="10"><tspan font-weight="bold">• 先到先得：</tspan>每个主节点只投1票</text>
  <text x="495" y="393" font-size="10"><tspan font-weight="bold">• 多数派：</tspan>需要 N/2+1 票才能胜出</text>
  <text x="495" y="413" font-size="10"><tspan font-weight="bold">• 重试机制：</tspan>选举失败后重新发起</text>
  <text x="495" y="433" font-size="10"><tspan font-weight="bold">• epoch递增：</tspan>类似 Raft 的 term</text>
</svg>

**详细说明：**

**1. 故障检测（PFAIL → FAIL）**

```bash
# 配置项
cluster-node-timeout 15000  # 节点超时时间（毫秒）

# PFAIL（主观下线）
- 节点 A 向节点 B 发送 PING
- 超过 cluster-node-timeout 未收到 PONG
- 节点 A 将节点 B 标记为 PFAIL

# FAIL（客观下线）
- 节点 A 通过 Gossip 收集其他节点对 B 的判断
- 如果半数以上主节点都认为 B 是 PFAIL
- 节点 A 将 B 标记为 FAIL 并广播
```

**2. 从节点选举**

从节点根据**复制偏移量**决定发起选举的延迟时间：
```
延迟 = 500ms + random(0~500ms) + REPLICA_RANK * 1000ms

REPLICA_RANK = 按复制偏移量排名（数据越新排名越前）
```

这样可以确保**数据最完整的从节点**优先发起选举。

**3. 投票规则**

| 规则 | 说明 |
|------|------|
| **每个主节点只有1票** | 先请求先获得 |
| **多数派原则** | 需要 `N/2 + 1` 票（N为主节点总数） |
| **epoch 递增** | 类似 Raft 的 term，避免过期投票 |
| **投票超时** | 2倍 `cluster-node-timeout`，超时重新选举 |

**4. 故障转移配置**

```bash
# redis.conf
cluster-node-timeout 15000         # 节点超时判定时间
cluster-replica-validity-factor 10  # 从节点数据过期因子
cluster-require-full-coverage no    # 部分槽不可用时是否停止服务
```

**5. 与 Sentinel 的区别**

| 特性 | Redis Cluster | Sentinel |
|------|--------------|----------|
| **架构** | 去中心化，内置故障转移 | 独立的监控进程 |
| **通信协议** | Gossip | Pub/Sub + 命令 |
| **故障检测** | 节点间互相检测 | Sentinel 监控 Redis |
| **适用场景** | 分布式、大规模集群 | 主从复制高可用 |

**失败场景处理：**

1. **从节点全部故障**
   - 主节点故障后无法转移
   - 该分片的槽不可用
   - 如果 `cluster-require-full-coverage=yes`，整个集群不可用

2. **网络分区**
   - 少数派分区的主节点会停止写入
   - 多数派分区继续服务
   - 分区恢复后数据会同步

3. **同时多个主节点故障**
   - 每个分片独立进行故障转移
   - 如果没有足够的从节点，部分分片不可用

**关键要点：**
- 故障检测基于 **Gossip 协议**，无需中心化组件
- 采用 **Raft 算法**的投票机制保证一致性
- **复制偏移量**决定从节点选举优先级
- 支持**自动**和**手动**故障转移

**记忆口诀：** Gossip 探故障，PFAIL 到 FAIL，从节点选举争，多数派权威定

---

48. 主从复制、哨兵、集群的区别是什么？

### 48. 主从复制、哨兵、集群的区别是什么？

**核心答案：**
三者是 Redis 不同层次的高可用方案：**主从复制**提供数据备份和读写分离；**哨兵**在主从基础上增加自动故障转移；**集群**实现分布式数据分片和横向扩展。

**对比图：**

<svg viewBox="0 0 750 550" xmlns="http://www.w3.org/2000/svg">
  <text x="375" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis 高可用方案对比</text>
  <rect x="50" y="50" width="200" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="150" y="75" text-anchor="middle" font-size="14" font-weight="bold" fill="#2E7D32">主从复制</text>
  <circle cx="150" cy="110" r="25" fill="#4CAF50" stroke="#333" stroke-width="2"/>
  <text x="150" y="117" text-anchor="middle" fill="white" font-size="12" font-weight="bold">M</text>
  <circle cx="110" cy="170" r="20" fill="#81C784" stroke="#333" stroke-width="1.5"/>
  <text x="110" y="176" text-anchor="middle" fill="white" font-size="11">S1</text>
  <circle cx="150" cy="170" r="20" fill="#81C784" stroke="#333" stroke-width="1.5"/>
  <text x="150" y="176" text-anchor="middle" fill="white" font-size="11">S2</text>
  <circle cx="190" cy="170" r="20" fill="#81C784" stroke="#333" stroke-width="1.5"/>
  <text x="190" y="176" text-anchor="middle" fill="white" font-size="11">S3</text>
  <line x1="140" y1="130" x2="115" y2="155" stroke="#666" stroke-width="1.5" stroke-dasharray="2,2"/>
  <line x1="150" y1="135" x2="150" y2="150" stroke="#666" stroke-width="1.5" stroke-dasharray="2,2"/>
  <line x1="160" y1="130" x2="185" y2="155" stroke="#666" stroke-width="1.5" stroke-dasharray="2,2"/>
  <text x="150" y="210" text-anchor="middle" font-size="11">✓ 数据备份</text>
  <text x="150" y="225" text-anchor="middle" font-size="11">✓ 读写分离</text>
  <rect x="275" y="50" width="200" height="180" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="375" y="75" text-anchor="middle" font-size="14" font-weight="bold" fill="#E65100">哨兵模式</text>
  <rect x="320" y="95" width="110" height="95" fill="#FFECB3" stroke="#FF9800" stroke-width="1.5" rx="3" stroke-dasharray="3,3"/>
  <text x="375" y="110" text-anchor="middle" font-size="10">主从架构</text>
  <circle cx="375" cy="135" r="15" fill="#4CAF50" stroke="#333" stroke-width="1.5"/>
  <text x="375" y="140" text-anchor="middle" fill="white" font-size="10">M</text>
  <circle cx="350" cy="170" r="12" fill="#81C784" stroke="#333" stroke-width="1"/>
  <text x="350" y="175" text-anchor="middle" fill="white" font-size="9">S</text>
  <circle cx="400" cy="170" r="12" fill="#81C784" stroke="#333" stroke-width="1"/>
  <text x="400" y="175" text-anchor="middle" fill="white" font-size="9">S</text>
  <circle cx="320" cy="130" r="15" fill="#FF9800" stroke="#333" stroke-width="1.5"/>
  <text x="320" y="136" text-anchor="middle" fill="white" font-size="9">哨兵</text>
  <circle cx="375" cy="95" r="15" fill="#FF9800" stroke="#333" stroke-width="1.5"/>
  <text x="375" y="101" text-anchor="middle" fill="white" font-size="9">哨兵</text>
  <circle cx="430" cy="130" r="15" fill="#FF9800" stroke="#333" stroke-width="1.5"/>
  <text x="430" y="136" text-anchor="middle" fill="white" font-size="9">哨兵</text>
  <text x="375" y="210" text-anchor="middle" font-size="11">✓ 自动故障转移</text>
  <text x="375" y="225" text-anchor="middle" font-size="11">✓ 监控通知</text>
  <rect x="500" y="50" width="200" height="180" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="600" y="75" text-anchor="middle" font-size="14" font-weight="bold" fill="#1565C0">Redis Cluster</text>
  <circle cx="560" cy="110" r="18" fill="#4CAF50" stroke="#333" stroke-width="1.5"/>
  <text x="560" y="116" text-anchor="middle" fill="white" font-size="10">M1</text>
  <circle cx="640" cy="110" r="18" fill="#2196F3" stroke="#333" stroke-width="1.5"/>
  <text x="640" y="116" text-anchor="middle" fill="white" font-size="10">M2</text>
  <circle cx="600" cy="160" r="18" fill="#FF9800" stroke="#333" stroke-width="1.5"/>
  <text x="600" y="166" text-anchor="middle" fill="white" font-size="10">M3</text>
  <circle cx="545" cy="140" r="13" fill="#81C784" stroke="#333" stroke-width="1"/>
  <text x="545" y="145" text-anchor="middle" fill="white" font-size="9">S1</text>
  <circle cx="655" cy="140" r="13" fill="#64B5F6" stroke="#333" stroke-width="1"/>
  <text x="655" y="145" text-anchor="middle" fill="white" font-size="9">S2</text>
  <circle cx="600" cy="190" r="13" fill="#FFB74D" stroke="#333" stroke-width="1"/>
  <text x="600" y="195" text-anchor="middle" fill="white" font-size="9">S3</text>
  <line x1="575" y1="115" x2="625" y2="115" stroke="#9E9E9E" stroke-width="1" stroke-dasharray="2,2"/>
  <line x1="615" y1="125" x2="585" y2="150" stroke="#9E9E9E" stroke-width="1" stroke-dasharray="2,2"/>
  <line x1="575" y1="125" x2="610" y2="150" stroke="#9E9E9E" stroke-width="1" stroke-dasharray="2,2"/>
  <text x="600" y="210" text-anchor="middle" font-size="11">✓ 数据分片</text>
  <text x="600" y="225" text-anchor="middle" font-size="11">✓ 横向扩展</text>
  <rect x="50" y="250" width="650" height="280" fill="#F5F5F5" stroke="#666" stroke-width="2" rx="5"/>
  <text x="375" y="275" text-anchor="middle" font-size="14" font-weight="bold">详细对比</text>
  <text x="80" y="300" font-size="12" font-weight="bold">维度</text>
  <text x="220" y="300" text-anchor="middle" font-size="12" font-weight="bold">主从复制</text>
  <text x="400" y="300" text-anchor="middle" font-size="12" font-weight="bold">哨兵模式</text>
  <text x="590" y="300" text-anchor="middle" font-size="12" font-weight="bold">Redis Cluster</text>
  <line x1="60" y1="305" x2="690" y2="305" stroke="#999" stroke-width="1"/>
  <text x="80" y="325" font-size="11">架构</text>
  <text x="220" y="325" text-anchor="middle" font-size="10">一主多从</text>
  <text x="400" y="325" text-anchor="middle" font-size="10">主从 + 哨兵监控</text>
  <text x="590" y="325" text-anchor="middle" font-size="10">多主多从分片</text>
  <text x="80" y="350" font-size="11">容量</text>
  <text x="220" y="350" text-anchor="middle" font-size="10">受限于主节点内存</text>
  <text x="400" y="350" text-anchor="middle" font-size="10">受限于主节点内存</text>
  <text x="590" y="350" text-anchor="middle" font-size="10">可线性扩展</text>
  <text x="80" y="375" font-size="11">QPS</text>
  <text x="220" y="375" text-anchor="middle" font-size="10">从节点分担读</text>
  <text x="400" y="375" text-anchor="middle" font-size="10">从节点分担读</text>
  <text x="590" y="375" text-anchor="middle" font-size="10">多主分担读写</text>
  <text x="80" y="400" font-size="11">故障转移</text>
  <text x="220" y="400" text-anchor="middle" font-size="10">✗ 手动</text>
  <text x="400" y="400" text-anchor="middle" font-size="10">✓ 自动</text>
  <text x="590" y="400" text-anchor="middle" font-size="10">✓ 自动</text>
  <text x="80" y="425" font-size="11">复杂度</text>
  <text x="220" y="425" text-anchor="middle" font-size="10">简单</text>
  <text x="400" y="425" text-anchor="middle" font-size="10">中等</text>
  <text x="590" y="425" text-anchor="middle" font-size="10">复杂</text>
  <text x="80" y="450" font-size="11">客户端</text>
  <text x="220" y="450" text-anchor="middle" font-size="10">普通客户端</text>
  <text x="400" y="450" text-anchor="middle" font-size="10">需支持Sentinel</text>
  <text x="590" y="450" text-anchor="middle" font-size="10">需支持Cluster</text>
  <text x="80" y="475" font-size="11">最小节点</text>
  <text x="220" y="475" text-anchor="middle" font-size="10">2 (1主1从)</text>
  <text x="400" y="475" text-anchor="middle" font-size="10">5 (1主1从+3哨兵)</text>
  <text x="590" y="475" text-anchor="middle" font-size="10">6 (3主3从)</text>
  <text x="80" y="500" font-size="11">适用场景</text>
  <text x="220" y="500" text-anchor="middle" font-size="9">读多写少、数据量小</text>
  <text x="400" y="500" text-anchor="middle" font-size="9">中小规模、高可用</text>
  <text x="590" y="500" text-anchor="middle" font-size="9">大数据量、高并发</text>
</svg>

**详细对比表：**

| 维度 | 主从复制 | 哨兵模式 | Redis Cluster |
|------|---------|----------|--------------|
| **核心目标** | 数据备份、读写分离 | 自动故障转移 | 数据分片、横向扩展 |
| **容量限制** | 单机内存 | 单机内存 | 可无限扩展 |
| **性能扩展** | 读操作线性扩展 | 读操作线性扩展 | 读写操作都线性扩展 |
| **故障转移** | ✗ 需要手动 | ✓ 自动 | ✓ 自动 |
| **数据分片** | ✗ 不支持 | ✗ 不支持 | ✓ 支持 |
| **部署复杂度** | 简单 | 中等 | 复杂 |
| **运维成本** | 低 | 中 | 高 |
| **最小节点数** | 2 (1主1从) | 5 (1主1从+3哨兵) | 6 (3主3从) |
| **客户端要求** | 普通客户端 | 需支持 Sentinel 协议 | 需支持 Cluster 协议 |
| **通信机制** | 主从复制协议 | Pub/Sub + 命令 | Gossip 协议 |
| **单点故障** | ✗ 主节点是单点 | ✓ 无单点 | ✓ 无单点 |
| **数据一致性** | 最终一致 | 最终一致 | 最终一致 |
| **事务支持** | ✓ 完整支持 | ✓ 完整支持 | ⚠️ 仅支持单 key |
| **批量操作** | ✓ 完整支持 | ✓ 完整支持 | ⚠️ 需同槽（Hash Tag） |
| **多数据库** | ✓ 支持16个DB | ✓ 支持16个DB | ✗ 仅 DB0 |

**选型建议：**

**1. 使用主从复制**
- ✅ 数据量小（单机可容纳）
- ✅ 读多写少
- ✅ 可接受手动故障转移
- ✅ 部署运维简单优先
- ❌ 不适合：需要自动故障恢复

**2. 使用哨兵模式**
- ✅ 数据量中等（单机可容纳）
- ✅ 对可用性要求高
- ✅ 需要自动故障转移
- ✅ 读写压力不是特别大
- ❌ 不适合：海量数据、高并发写入

**3. 使用 Redis Cluster**
- ✅ 数据量巨大（单机无法容纳）
- ✅ 高并发读写
- ✅ 需要横向扩展
- ✅ 业务可容忍部分数据不可用
- ❌ 不适合：小规模应用、需要完整事务

**演进路径：**
```
主从复制 → 哨兵模式 → Redis Cluster
   ↓           ↓            ↓
 数据备份   自动故障转移   横向扩展
```

**关键要点：**
- 三者可以结合使用（如 Cluster 中的每个分片是主从）
- 选型时综合考虑：数据量、QPS、可用性、运维成本
- 从简单到复杂递进，避免过度设计
- 主从复制是基础，哨兵和集群都依赖它

**记忆口诀：** 主从备份读写分，哨兵监控自转移，集群分片横扩展，场景不同各有长

---
