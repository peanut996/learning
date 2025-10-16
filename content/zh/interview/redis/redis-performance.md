## 性能优化

### 49. 如何提高 Redis 的性能？

#### 核心答案

从六个维度优化 Redis 性能：**网络优化**（Pipeline、连接池）、**命令优化**（避免慢命令、批量操作）、**内存优化**（数据结构、淘汰策略）、**持久化优化**（AOF/RDB 配置）、**架构优化**（主从分离、集群分片）、**系统优化**（内核参数、硬件配置）。

#### 详细说明

<svg viewBox="0 0 900 680" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="perfGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.3"/>
    </linearGradient>
    <linearGradient id="perfGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.3"/>
    </linearGradient>
    <linearGradient id="perfGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.3"/>
    </linearGradient>
  </defs>
  <text x="450" y="25" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">Redis 性能优化全景图</text>
  <g transform="translate(50, 50)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#3b82f6">1. 网络优化</text>
    <rect x="0" y="10" width="380" height="90" fill="url(#perfGrad1)" stroke="#3b82f6" stroke-width="2" rx="5"/>
    <text x="10" y="30" font-size="12" fill="#374151">• Pipeline：批量执行命令，减少 RTT（往返时间）</text>
    <text x="10" y="50" font-size="12" fill="#374151">• 连接池：复用连接，避免频繁创建销毁</text>
    <text x="10" y="70" font-size="12" fill="#374151">• 客户端缓冲：合理设置 client-output-buffer-limit</text>
    <text x="10" y="90" font-size="12" fill="#374151">• TCP 优化：调整 tcp-backlog、tcp-keepalive</text>
  </g>
  <g transform="translate(470, 50)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#10b981">2. 命令优化</text>
    <rect x="0" y="10" width="380" height="90" fill="url(#perfGrad2)" stroke="#10b981" stroke-width="2" rx="5"/>
    <text x="10" y="30" font-size="12" fill="#374151">• 避免慢命令：禁用 KEYS、FLUSHALL</text>
    <text x="10" y="50" font-size="12" fill="#374151">• 批量操作：使用 MGET、MSET 代替多次单次操作</text>
    <text x="10" y="70" font-size="12" fill="#374151">• 合理过期：避免大量 key 同时过期（设置随机值）</text>
    <text x="10" y="90" font-size="12" fill="#374151">• Lua 脚本：复杂逻辑合并为原子操作</text>
  </g>
  <g transform="translate(50, 170)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#f59e0b">3. 内存优化</text>
    <rect x="0" y="10" width="380" height="110" fill="url(#perfGrad3)" stroke="#f59e0b" stroke-width="2" rx="5"/>
    <text x="10" y="30" font-size="12" fill="#374151">• 数据结构：选择合适编码（ziplist、intset）</text>
    <text x="10" y="50" font-size="12" fill="#374151">• 内存碎片：定期执行 MEMORY PURGE</text>
    <text x="10" y="70" font-size="12" fill="#374151">• 淘汰策略：根据业务选择 LRU/LFU/TTL</text>
    <text x="10" y="90" font-size="12" fill="#374151">• 压缩配置：启用 list-compress-depth</text>
    <text x="10" y="110" font-size="12" fill="#374151">• Key 命名：避免过长 key，使用简短前缀</text>
  </g>
  <g transform="translate(470, 170)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#8b5cf6">4. 持久化优化</text>
    <rect x="0" y="10" width="380" height="110" fill="#8b5cf6" fill-opacity="0.1" stroke="#8b5cf6" stroke-width="2" rx="5"/>
    <text x="10" y="30" font-size="12" fill="#374151">• RDB：降低 save 频率，子进程 bgsave</text>
    <text x="10" y="50" font-size="12" fill="#374151">• AOF：使用 everysec 折中策略</text>
    <text x="10" y="70" font-size="12" fill="#374151">• AOF 重写：控制 auto-aof-rewrite-percentage</text>
    <text x="10" y="90" font-size="12" fill="#374151">• 混合持久化：RDB + AOF 结合（Redis 4.0+）</text>
    <text x="10" y="110" font-size="12" fill="#374151">• 禁用持久化：缓存场景可完全关闭</text>
  </g>
  <g transform="translate(50, 310)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#ef4444">5. 架构优化</text>
    <rect x="0" y="10" width="380" height="110" fill="#ef4444" fill-opacity="0.1" stroke="#ef4444" stroke-width="2" rx="5"/>
    <text x="10" y="30" font-size="12" fill="#374151">• 读写分离：从节点承担读请求</text>
    <text x="10" y="50" font-size="12" fill="#374151">• 分片集群：水平扩展，分散负载</text>
    <text x="10" y="70" font-size="12" fill="#374151">• 多实例：单机多个 Redis 实例（不同端口）</text>
    <text x="10" y="90" font-size="12" fill="#374151">• 冷热分离：热数据 Redis，冷数据数据库</text>
    <text x="10" y="110" font-size="12" fill="#374151">• 缓存预热：启动时加载常用数据</text>
  </g>
  <g transform="translate(470, 310)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#06b6d4">6. 系统优化</text>
    <rect x="0" y="10" width="380" height="110" fill="#06b6d4" fill-opacity="0.1" stroke="#06b6d4" stroke-width="2" rx="5"/>
    <text x="10" y="30" font-size="12" fill="#374151">• 内核参数：vm.overcommit_memory=1</text>
    <text x="10" y="50" font-size="12" fill="#374151">• THP：关闭透明大页（Transparent Huge Pages）</text>
    <text x="10" y="70" font-size="12" fill="#374151">• Swap：禁用交换分区或设置 swappiness=0</text>
    <text x="10" y="90" font-size="12" fill="#374151">• 文件句柄：增大 ulimit -n 限制</text>
    <text x="10" y="110" font-size="12" fill="#374151">• CPU 绑定：使用 taskset 绑定 CPU 核心</text>
  </g>
  <g transform="translate(50, 450)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#1f2937">性能监控指标</text>
    <rect x="0" y="10" width="800" height="200" fill="#f3f4f6" stroke="#9ca3af" stroke-width="2" rx="5"/>
    <line x1="200" y1="10" x2="200" y2="210" stroke="#d1d5db" stroke-width="1"/>
    <line x1="400" y1="10" x2="400" y2="210" stroke="#d1d5db" stroke-width="1"/>
    <line x1="600" y1="10" x2="600" y2="210" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="50" x2="800" y2="50" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="90" x2="800" y2="90" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="130" x2="800" y2="130" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="170" x2="800" y2="170" stroke="#d1d5db" stroke-width="1"/>
    <text x="100" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">监控类别</text>
    <text x="300" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">关键指标</text>
    <text x="500" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">INFO 命令</text>
    <text x="700" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">优化建议</text>
    <text x="100" y="72" text-anchor="middle" font-size="11" fill="#374151">性能指标</text>
    <text x="300" y="72" text-anchor="middle" font-size="11" fill="#374151">OPS、延迟、命中率</text>
    <text x="500" y="72" text-anchor="middle" font-size="11" fill="#374151">instantaneous_ops_per_sec</text>
    <text x="700" y="72" text-anchor="middle" font-size="11" fill="#374151">目标 OPS &lt; 10w</text>
    <text x="100" y="112" text-anchor="middle" font-size="11" fill="#374151">内存指标</text>
    <text x="300" y="112" text-anchor="middle" font-size="11" fill="#374151">使用率、碎片率</text>
    <text x="500" y="112" text-anchor="middle" font-size="11" fill="#374151">used_memory、mem_fragmentation_ratio</text>
    <text x="700" y="112" text-anchor="middle" font-size="11" fill="#374151">碎片率 1.0-1.5 正常</text>
    <text x="100" y="152" text-anchor="middle" font-size="11" fill="#374151">连接指标</text>
    <text x="300" y="152" text-anchor="middle" font-size="11" fill="#374151">连接数、拒绝数</text>
    <text x="500" y="152" text-anchor="middle" font-size="11" fill="#374151">connected_clients、rejected_connections</text>
    <text x="700" y="152" text-anchor="middle" font-size="11" fill="#374151">拒绝数 &gt; 0 需扩容</text>
    <text x="100" y="192" text-anchor="middle" font-size="11" fill="#374151">持久化</text>
    <text x="300" y="192" text-anchor="middle" font-size="11" fill="#374151">fork 耗时、IO 等待</text>
    <text x="500" y="192" text-anchor="middle" font-size="11" fill="#374151">latest_fork_usec、aof_current_size</text>
    <text x="700" y="192" text-anchor="middle" font-size="11" fill="#374151">fork 时间 &lt; 1s</text>
  </g>
</svg>

**1. 网络优化**

```bash
# redis.conf 配置
tcp-backlog 511                    # TCP 连接队列大小
timeout 0                          # 客户端空闲超时（0 表示不超时）
tcp-keepalive 300                  # TCP keepalive 间隔（秒）
client-output-buffer-limit normal 0 0 0      # 普通客户端缓冲区
client-output-buffer-limit replica 256mb 64mb 60   # 复制客户端缓冲区
```

```python
# Python 使用连接池
from redis import ConnectionPool, Redis

pool = ConnectionPool(
    host='localhost',
    port=6379,
    max_connections=50,      # 最大连接数
    socket_keepalive=True,
    socket_connect_timeout=5
)
redis_client = Redis(connection_pool=pool)
```

**2. 命令优化**

```bash
# ❌ 慢命令示例（避免使用）
KEYS pattern*              # O(n) 遍历所有 key
SMEMBERS big_set           # 大集合一次返回
HGETALL big_hash           # 大哈希一次返回
SORT big_list              # 大列表排序

# ✅ 优化方案
SCAN 0 MATCH pattern* COUNT 100    # 渐进式遍历
SSCAN big_set 0 COUNT 100          # 分批获取集合元素
HSCAN big_hash 0 COUNT 100         # 分批获取哈希字段

# ✅ 批量操作
MGET key1 key2 key3        # 批量获取（而非多次 GET）
MSET key1 v1 key2 v2       # 批量设置

# 避免大量 key 同时过期
SET key1 value EX 3600     # ❌ 固定过期时间
SET key1 value EX $((3600 + RANDOM % 600))  # ✅ 加随机值（3600-4200s）
```

**3. 内存优化**

```bash
# redis.conf 配置
maxmemory 4gb                           # 最大内存限制
maxmemory-policy allkeys-lru            # 淘汰策略
maxmemory-samples 5                     # LRU 采样数（越大越精确）

# 数据结构优化配置
hash-max-ziplist-entries 512            # Hash 使用 ziplist 的最大元素数
hash-max-ziplist-value 64               # Hash 使用 ziplist 的最大值大小
list-max-ziplist-size -2                # List ziplist 大小限制
list-compress-depth 1                   # List 两端不压缩节点数
set-max-intset-entries 512              # Set 使用 intset 的最大元素数
zset-max-ziplist-entries 128            # ZSet 使用 ziplist 的最大元素数
zset-max-ziplist-value 64               # ZSet 使用 ziplist 的最大值大小

# 内存碎片整理（Redis 4.0+）
activedefrag yes                        # 启用主动碎片整理
active-defrag-ignore-bytes 100mb        # 碎片低于此值不整理
active-defrag-threshold-lower 10        # 碎片率低于 10% 不整理
active-defrag-threshold-upper 100       # 碎片率高于 100% 强制整理
```

**4. 持久化优化**

```bash
# RDB 配置
save 900 1                # 900 秒内至少 1 次修改则保存
save 300 10               # 300 秒内至少 10 次修改则保存
save 60 10000             # 60 秒内至少 10000 次修改则保存
stop-writes-on-bgsave-error yes   # RDB 失败时停止写入
rdbcompression yes        # 启用 RDB 压缩
rdbchecksum yes           # RDB 文件校验

# AOF 配置
appendonly yes
appendfsync everysec      # 每秒 fsync（推荐，折中方案）
no-appendfsync-on-rewrite no     # 重写时不暂停 fsync
auto-aof-rewrite-percentage 100  # AOF 文件大小增长 100% 触发重写
auto-aof-rewrite-min-size 64mb   # AOF 最小重写大小

# 混合持久化（Redis 4.0+）
aof-use-rdb-preamble yes  # AOF 重写时使用 RDB 格式前缀
```

**5. 架构优化**

```bash
# 读写分离（从节点只读）
replica-read-only yes

# 多实例部署（单机不同端口）
redis-server --port 6379 --dir /data/redis-6379
redis-server --port 6380 --dir /data/redis-6380
redis-server --port 6381 --dir /data/redis-6381

# 缓存预热示例
redis-cli --pipe < cache_warmup.txt
```

**6. 系统优化**

```bash
# 内核参数优化（/etc/sysctl.conf）
vm.overcommit_memory = 1           # 内存过量分配策略
net.core.somaxconn = 511           # 连接队列大小
vm.swappiness = 0                  # 禁用交换分区

# 关闭透明大页
echo never > /sys/kernel/mm/transparent_hugepage/enabled

# 增加文件句柄限制（/etc/security/limits.conf）
redis soft nofile 65535
redis hard nofile 65535

# CPU 绑定（避免进程在 CPU 间迁移）
taskset -c 0 redis-server /etc/redis/redis.conf
```

#### 性能测试

```bash
# Redis 自带基准测试工具
redis-benchmark -h localhost -p 6379 -c 50 -n 100000 -d 100

# 参数说明：
# -c 50：50 个并发连接
# -n 100000：总共 100000 个请求
# -d 100：数据大小 100 字节
# -t set,get：只测试 SET 和 GET 命令
# -q：简化输出

# 测试结果分析（示例）
SET: 89285.71 requests per second    # QPS（每秒查询数）
GET: 92592.59 requests per second
```

#### 关键要点

1. **性能瓶颈排查顺序**：网络延迟 → 慢命令 → 内存不足 → 持久化阻塞 → 系统资源
2. **优先级**：先优化命令和数据结构（成本低、效果大），再考虑架构扩展（成本高）
3. **监控告警**：
   - OPS > 10w/s：考虑分片
   - 延迟 > 1ms：排查慢命令
   - 内存 > 80%：检查淘汰策略或扩容
   - 碎片率 > 1.5：执行碎片整理
4. **权衡取舍**：
   - 性能 vs 持久化：缓存场景可禁用持久化
   - 内存 vs 速度：压缩节省内存但增加 CPU 开销
   - 一致性 vs 性能：读写分离可能读到旧数据

#### 记忆口诀

> **网命内持架系统，六个维度优性能**
> 网络批量减往返，命令避慢用批操
> 内存结构选编码，持久策略折中选
> 架构分离加分片，系统参数调内核
> 监控指标勤检查，瓶颈定位再优化
50. 什么是管道（Pipeline）？

### 50. 什么是管道（Pipeline）？

#### 核心答案

Pipeline（管道）是 Redis 客户端的一种**批量执行技术**，将多条命令打包后一次性发送给服务器，服务器按顺序执行后统一返回结果。核心优势是**减少网络往返次数（RTT）**，将 N 次 RTT 降为 1 次，显著提升性能（可达 5-10 倍）。

#### 详细说明

<svg viewBox="0 0 900 620" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
    </marker>
    <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
    </marker>
  </defs>
  <text x="450" y="25" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">Pipeline 原理对比</text>
  <g transform="translate(50, 50)">
    <text x="200" y="0" text-anchor="middle" font-size="14" font-weight="bold" fill="#ef4444">普通模式（串行）</text>
    <rect x="20" y="20" width="80" height="60" fill="#fef2f2" stroke="#ef4444" stroke-width="2" rx="5"/>
    <text x="60" y="55" text-anchor="middle" font-size="12" fill="#374151">Client</text>
    <rect x="300" y="20" width="80" height="60" fill="#fef2f2" stroke="#ef4444" stroke-width="2" rx="5"/>
    <text x="340" y="55" text-anchor="middle" font-size="12" fill="#374151">Server</text>
    <line x1="100" y1="100" x2="300" y2="100" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
    <text x="200" y="95" text-anchor="middle" font-size="11" fill="#ef4444">SET k1 v1</text>
    <line x1="300" y1="120" x2="100" y2="120" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
    <text x="200" y="115" text-anchor="middle" font-size="11" fill="#ef4444">OK</text>
    <line x1="100" y1="140" x2="300" y2="140" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
    <text x="200" y="135" text-anchor="middle" font-size="11" fill="#ef4444">SET k2 v2</text>
    <line x1="300" y1="160" x2="100" y2="160" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
    <text x="200" y="155" text-anchor="middle" font-size="11" fill="#ef4444">OK</text>
    <line x1="100" y1="180" x2="300" y2="180" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
    <text x="200" y="175" text-anchor="middle" font-size="11" fill="#ef4444">SET k3 v3</text>
    <line x1="300" y1="200" x2="100" y2="200" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
    <text x="200" y="195" text-anchor="middle" font-size="11" fill="#ef4444">OK</text>
    <text x="200" y="230" text-anchor="middle" font-size="13" font-weight="bold" fill="#ef4444">3 次命令 = 6 次网络往返（3 RTT）</text>
    <text x="200" y="250" text-anchor="middle" font-size="12" fill="#7f1d1d">假设 RTT=1ms，总耗时 ≈ 3ms</text>
  </g>
  <g transform="translate(480, 50)">
    <text x="200" y="0" text-anchor="middle" font-size="14" font-weight="bold" fill="#3b82f6">Pipeline 模式（批量）</text>
    <rect x="20" y="20" width="80" height="60" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" rx="5"/>
    <text x="60" y="55" text-anchor="middle" font-size="12" fill="#374151">Client</text>
    <rect x="300" y="20" width="80" height="60" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" rx="5"/>
    <text x="340" y="55" text-anchor="middle" font-size="12" fill="#374151">Server</text>
    <path d="M 100 100 L 300 100 L 300 120 L 300 140" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrowBlue)"/>
    <text x="130" y="95" font-size="11" fill="#3b82f6">SET k1 v1</text>
    <text x="130" y="115" font-size="11" fill="#3b82f6">SET k2 v2</text>
    <text x="130" y="135" font-size="11" fill="#3b82f6">SET k3 v3</text>
    <text x="200" y="165" text-anchor="middle" font-size="10" fill="#1e40af" font-weight="bold">[批量打包发送]</text>
    <path d="M 300 180 L 100 180 L 100 160 L 100 140" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrowBlue)"/>
    <text x="150" y="175" font-size="11" fill="#3b82f6">OK</text>
    <text x="150" y="195" font-size="11" fill="#3b82f6">OK</text>
    <text x="150" y="215" font-size="11" fill="#3b82f6">OK</text>
    <text x="200" y="230" text-anchor="middle" font-size="13" font-weight="bold" fill="#3b82f6">3 次命令 = 2 次网络往返（1 RTT）</text>
    <text x="200" y="250" text-anchor="middle" font-size="12" fill="#1e3a8a">假设 RTT=1ms，总耗时 ≈ 1ms（提升 3 倍）</text>
  </g>
  <g transform="translate(50, 330)">
    <text x="400" y="0" font-size="14" font-weight="bold" fill="#1f2937">Pipeline 特点与注意事项</text>
    <rect x="0" y="15" width="800" height="260" fill="#f9fafb" stroke="#d1d5db" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="13" font-weight="bold" fill="#059669">✅ 优点</text>
    <text x="30" y="60" font-size="12" fill="#374151">1. 显著减少网络往返次数，性能提升 5-10 倍（取决于 RTT）</text>
    <text x="30" y="80" font-size="12" fill="#374151">2. 客户端实现，无需服务器特殊配置，通用性强</text>
    <text x="30" y="100" font-size="12" fill="#374151">3. 命令按顺序执行，保证顺序一致性</text>
    <text x="30" y="120" font-size="12" fill="#374151">4. 适用于所有 Redis 命令（读、写、混合均可）</text>
    <text x="20" y="150" font-size="13" font-weight="bold" fill="#dc2626">⚠️ 注意事项</text>
    <text x="30" y="170" font-size="12" fill="#374151">1. 非原子性：Pipeline 中的命令不是原子执行，中间可能穿插其他客户端命令</text>
    <text x="30" y="190" font-size="12" fill="#374151">2. 内存占用：批量命令会占用服务器输入/输出缓冲区，单次不宜超过 10000 条</text>
    <text x="30" y="210" font-size="12" fill="#374151">3. 错误处理：某条命令失败不影响其他命令，需逐个检查返回结果</text>
    <text x="30" y="230" font-size="12" fill="#374151">4. 阻塞风险：过大的 Pipeline 会阻塞其他客户端（单线程特性）</text>
    <text x="30" y="250" font-size="12" fill="#374151">5. 无事务保证：Pipeline ≠ MULTI/EXEC，不提供回滚机制</text>
  </g>
</svg>

**1. Pipeline 使用示例**

```python
# Python redis-py 库
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# ❌ 普通模式（3 次 RTT）
r.set('key1', 'value1')
r.set('key2', 'value2')
r.set('key3', 'value3')

# ✅ Pipeline 模式（1 次 RTT）
pipe = r.pipeline()
pipe.set('key1', 'value1')
pipe.set('key2', 'value2')
pipe.set('key3', 'value3')
results = pipe.execute()  # 统一执行并返回结果列表
print(results)  # [True, True, True]

# 混合读写操作
pipe = r.pipeline()
pipe.set('counter', 0)
pipe.incr('counter')
pipe.incr('counter')
pipe.get('counter')
results = pipe.execute()
print(results)  # [True, 1, 2, '2']
```

```java
// Java Jedis 库
Jedis jedis = new Jedis("localhost", 6379);

// Pipeline 使用
Pipeline pipeline = jedis.pipelined();
pipeline.set("key1", "value1");
pipeline.set("key2", "value2");
pipeline.set("key3", "value3");
List<Object> results = pipeline.syncAndReturnAll();  // 执行并获取结果
System.out.println(results);  // [OK, OK, OK]
```

**2. Pipeline vs 其他批量操作**

| 对比维度 | Pipeline | MULTI/EXEC（事务） | 原生批量命令（MGET/MSET） | Lua 脚本 |
|---------|---------|-------------------|------------------------|---------|
| **原子性** | ❌ 非原子 | ✅ 原子性（隔离执行） | ✅ 原子性 | ✅ 原子性 |
| **命令限制** | 任意命令 | 任意命令 | 仅限特定命令 | 任意逻辑 |
| **网络往返** | 1 次 RTT | 2 次 RTT（MULTI+EXEC） | 1 次 RTT | 1 次 RTT |
| **错误处理** | 逐条失败 | 全部回滚（DISCARD） | 全部失败 | 全部失败 |
| **条件逻辑** | ❌ 不支持 | ❌ 不支持（WATCH 除外） | ❌ 不支持 | ✅ 支持 if/else |
| **适用场景** | 大批量操作 | 需要原子性保证 | 简单批量读写 | 复杂业务逻辑 |

**3. Pipeline 最佳实践**

```python
import redis

r = redis.Redis(host='localhost', port=6379)

# ✅ 批量插入大数据（分批 Pipeline）
def bulk_insert(data_dict, batch_size=1000):
    """
    分批插入数据，避免单次 Pipeline 过大
    """
    pipe = r.pipeline()
    count = 0

    for key, value in data_dict.items():
        pipe.set(key, value)
        count += 1

        # 每 1000 条执行一次
        if count % batch_size == 0:
            pipe.execute()
            pipe = r.pipeline()  # 重置 Pipeline

    # 处理剩余数据
    if count % batch_size != 0:
        pipe.execute()

# 使用示例
large_data = {f'key_{i}': f'value_{i}' for i in range(10000)}
bulk_insert(large_data)
```

```python
# ✅ Pipeline 错误处理
pipe = r.pipeline()
pipe.set('key1', 'value1')
pipe.incr('key1')  # 错误：key1 不是整数
pipe.set('key2', 'value2')

try:
    results = pipe.execute()
except redis.exceptions.ResponseError as e:
    print(f"Pipeline 中某条命令失败: {e}")
    # 注意：失败的命令不影响其他命令，key1 和 key2 均已设置
```

**4. 性能测试对比**

```bash
# 测试场景：写入 10000 条数据

# 普通模式
$ time python -c "
import redis
r = redis.Redis()
for i in range(10000):
    r.set(f'key_{i}', f'value_{i}')
"
# 耗时：约 5.2 秒（10000 次 RTT，假设 RTT=0.5ms）

# Pipeline 模式（批量 1000）
$ time python -c "
import redis
r = redis.Redis()
pipe = r.pipeline()
for i in range(10000):
    pipe.set(f'key_{i}', f'value_{i}')
    if i % 1000 == 0:
        pipe.execute()
        pipe = r.pipeline()
pipe.execute()
"
# 耗时：约 0.6 秒（10 次 RTT，性能提升 8 倍）
```

**5. Pipeline 使用限制**

```bash
# 服务器缓冲区限制（redis.conf）
client-output-buffer-limit normal 0 0 0    # 普通客户端无限制
client-output-buffer-limit replica 256mb 64mb 60   # 复制客户端限制

# 单次 Pipeline 建议：
# - 命令数量：< 10000 条
# - 数据大小：< 1MB（避免阻塞其他客户端）
# - 执行时间：< 100ms（避免长时间阻塞主线程）
```

#### 关键要点

1. **核心原理**：Pipeline 通过批量发送命令减少 RTT，本质是客户端实现的网络优化
2. **原子性**：Pipeline 不保证原子性，需要原子性请使用 MULTI/EXEC 或 Lua 脚本
3. **分批策略**：大批量操作建议分批（1000-5000 条/批），避免阻塞和内存溢出
4. **适用场景**：
   - ✅ 批量插入/更新数据（如导入缓存）
   - ✅ 批量查询（如获取用户信息列表）
   - ❌ 需要原子性的业务逻辑（用事务或 Lua）
   - ❌ 命令间有依赖关系（后续命令依赖前面结果，用 Lua）
5. **性能提升**：局域网环境提升 5-10 倍，跨地域网络（高 RTT）提升可达几十倍

#### 记忆口诀

> **Pipeline 批量减往返，客户端打包提效率**
> 非原子性需注意，命令失败不回滚
> 分批执行防阻塞，千条为宜不过万
> 事务保证用 MULTI，复杂逻辑 Lua 更好
51. 什么是 Redis 的慢查询？如何分析？

### 51. 什么是 Redis 的慢查询？如何分析？

#### 核心答案

慢查询是指执行时间**超过指定阈值**的 Redis 命令，会被记录到**慢查询日志（Slow Log）**中。Redis 提供 `SLOWLOG` 命令查看慢查询记录，通过分析慢查询可以发现性能瓶颈（如大 key 操作、O(n) 复杂度命令）。关键配置：`slowlog-log-slower-than`（阈值，微秒）和 `slowlog-max-len`（日志长度）。

#### 详细说明

<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="slowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.3"/>
    </linearGradient>
    <marker id="arrowSlow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#dc2626"/>
    </marker>
  </defs>
  <text x="450" y="25" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">慢查询工作原理</text>
  <g transform="translate(50, 50)">
    <rect x="0" y="0" width="800" height="200" fill="#f9fafb" stroke="#d1d5db" stroke-width="2" rx="5"/>
    <text x="400" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#1f2937">命令执行流程</text>
    <rect x="50" y="50" width="120" height="60" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
    <text x="110" y="75" text-anchor="middle" font-size="12" fill="#374151">1. 命令排队</text>
    <text x="110" y="95" text-anchor="middle" font-size="11" fill="#6b7280">输入缓冲区</text>
    <path d="M 170 80 L 230 80" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowSlow)"/>
    <rect x="230" y="50" width="120" height="60" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
    <text x="290" y="75" text-anchor="middle" font-size="12" fill="#374151">2. 命令执行</text>
    <text x="290" y="95" text-anchor="middle" font-size="11" fill="#ef4444" font-weight="bold">⏱️ 记录耗时</text>
    <path d="M 350 80 L 410 80" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowSlow)"/>
    <rect x="410" y="50" width="120" height="60" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
    <text x="470" y="75" text-anchor="middle" font-size="12" fill="#374151">3. 返回结果</text>
    <text x="470" y="95" text-anchor="middle" font-size="11" fill="#6b7280">输出缓冲区</text>
    <path d="M 530 80 L 590 80" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowSlow)"/>
    <rect x="590" y="50" width="140" height="60" fill="#fef2f2" stroke="#ef4444" stroke-width="2" rx="5"/>
    <text x="660" y="70" text-anchor="middle" font-size="11" fill="#374151">4. 慢查询判断</text>
    <text x="660" y="88" text-anchor="middle" font-size="10" fill="#dc2626">耗时 > 阈值？</text>
    <text x="660" y="103" text-anchor="middle" font-size="10" fill="#059669">→ 写入 Slow Log</text>
    <text x="400" y="140" text-anchor="middle" font-size="12" fill="#7f1d1d" font-weight="bold">⚠️ 慢查询只统计步骤 2 的执行时间，不包括排队和网络传输时间</text>
    <text x="400" y="165" text-anchor="middle" font-size="11" fill="#6b7280">因此即使慢查询日志为空，客户端仍可能感知到延迟（排队等待、网络拥塞）</text>
  </g>
  <g transform="translate(50, 270)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#1f2937">慢查询配置参数</text>
    <rect x="0" y="10" width="800" height="150" fill="#f3f4f6" stroke="#9ca3af" stroke-width="2" rx="5"/>
    <line x1="250" y1="10" x2="250" y2="160" stroke="#d1d5db" stroke-width="1"/>
    <line x1="500" y1="10" x2="500" y2="160" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="50" x2="800" y2="50" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="100" x2="800" y2="100" stroke="#d1d5db" stroke-width="1"/>
    <text x="125" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">配置项</text>
    <text x="375" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">说明</text>
    <text x="650" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">推荐值</text>
    <text x="125" y="78" text-anchor="middle" font-size="11" fill="#374151">slowlog-log-slower-than</text>
    <text x="375" y="70" text-anchor="middle" font-size="10" fill="#374151">慢查询阈值（微秒）</text>
    <text x="375" y="85" text-anchor="middle" font-size="10" fill="#6b7280">超过此值的命令会被记录</text>
    <text x="650" y="70" text-anchor="middle" font-size="10" fill="#059669" font-weight="bold">10000（10ms）</text>
    <text x="650" y="85" text-anchor="middle" font-size="9" fill="#6b7280">生产环境建议 1-10ms</text>
    <text x="125" y="128" text-anchor="middle" font-size="11" fill="#374151">slowlog-max-len</text>
    <text x="375" y="120" text-anchor="middle" font-size="10" fill="#374151">慢查询日志最大长度</text>
    <text x="375" y="135" text-anchor="middle" font-size="10" fill="#6b7280">超过后采用先进先出（FIFO）</text>
    <text x="650" y="120" text-anchor="middle" font-size="10" fill="#059669" font-weight="bold">128-1000</text>
    <text x="650" y="135" text-anchor="middle" font-size="9" fill="#6b7280">日志仅占用内存，可适当增大</text>
  </g>
  <g transform="translate(50, 440)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#1f2937">慢查询分析流程</text>
    <rect x="0" y="15" width="180" height="80" fill="url(#slowGrad1)" stroke="#ef4444" stroke-width="2" rx="5"/>
    <text x="90" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">1. 查看慢日志</text>
    <text x="90" y="58" text-anchor="middle" font-size="10" fill="#374151">SLOWLOG GET 10</text>
    <text x="90" y="73" text-anchor="middle" font-size="10" fill="#6b7280">获取最近 10 条记录</text>
    <path d="M 180 55 L 220 55" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowSlow)"/>
    <rect x="220" y="15" width="180" height="80" fill="url(#slowGrad1)" stroke="#ef4444" stroke-width="2" rx="5"/>
    <text x="310" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">2. 分析命令</text>
    <text x="310" y="58" text-anchor="middle" font-size="10" fill="#374151">识别慢命令类型</text>
    <text x="310" y="73" text-anchor="middle" font-size="10" fill="#6b7280">KEYS/HGETALL/...</text>
    <path d="M 400 55 L 440 55" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowSlow)"/>
    <rect x="440" y="15" width="180" height="80" fill="url(#slowGrad1)" stroke="#ef4444" stroke-width="2" rx="5"/>
    <text x="530" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">3. 定位原因</text>
    <text x="530" y="58" text-anchor="middle" font-size="10" fill="#374151">大 key / O(n) 命令</text>
    <text x="530" y="73" text-anchor="middle" font-size="10" fill="#6b7280">数据结构不合理</text>
    <path d="M 620 55 L 660 55" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowSlow)"/>
    <rect x="660" y="15" width="140" height="80" fill="#d1fae5" stroke="#059669" stroke-width="2" rx="5"/>
    <text x="730" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">4. 优化方案</text>
    <text x="730" y="58" text-anchor="middle" font-size="10" fill="#374151">替换慢命令</text>
    <text x="730" y="73" text-anchor="middle" font-size="10" fill="#059669">拆分大 key</text>
  </g>
  <g transform="translate(50, 540)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#1f2937">常见慢命令及优化</text>
    <rect x="0" y="10" width="800" height="140" fill="#fefce8" stroke="#facc15" stroke-width="2" rx="5"/>
    <text x="20" y="35" font-size="12" fill="#374151">❌ <tspan font-weight="bold" fill="#dc2626">KEYS pattern*</tspan> → ✅ SCAN 0 MATCH pattern* COUNT 100（渐进式遍历）</text>
    <text x="20" y="60" font-size="12" fill="#374151">❌ <tspan font-weight="bold" fill="#dc2626">HGETALL big_hash</tspan> → ✅ HSCAN big_hash 0 COUNT 100（分批获取）</text>
    <text x="20" y="85" font-size="12" fill="#374151">❌ <tspan font-weight="bold" fill="#dc2626">SMEMBERS big_set</tspan> → ✅ SSCAN big_set 0 COUNT 100（分批获取）</text>
    <text x="20" y="110" font-size="12" fill="#374151">❌ <tspan font-weight="bold" fill="#dc2626">LRANGE list 0 -1</tspan> → ✅ LRANGE list 0 99（限制返回数量）</text>
    <text x="20" y="135" font-size="12" fill="#374151">❌ <tspan font-weight="bold" fill="#dc2626">SORT big_list</tspan> → ✅ 应用层排序或使用 ZSet 有序集合</text>
  </g>
</svg>

**1. 慢查询配置**

```bash
# redis.conf 配置
slowlog-log-slower-than 10000    # 阈值 10ms（10000 微秒）
slowlog-max-len 128               # 最多保存 128 条慢日志

# 特殊值：
# slowlog-log-slower-than 0：记录所有命令
# slowlog-log-slower-than -1：禁用慢查询日志

# 运行时动态修改（无需重启）
redis-cli> CONFIG SET slowlog-log-slower-than 5000
redis-cli> CONFIG SET slowlog-max-len 256

# 持久化配置（写入 redis.conf）
redis-cli> CONFIG REWRITE
```

**2. 慢查询查看与分析**

```bash
# 查看慢查询日志
redis-cli> SLOWLOG GET 5    # 获取最近 5 条慢查询

# 示例输出：
1) 1) (integer) 6            # 日志唯一 ID
   2) (integer) 1609459200   # 执行时间戳（Unix 时间）
   3) (integer) 12000        # 执行耗时（微秒，12ms）
   4) 1) "KEYS"              # 执行的命令
      2) "user:*"
   5) "127.0.0.1:52143"      # 客户端地址
   6) ""                     # 客户端名称

2) 1) (integer) 5
   2) (integer) 1609459180
   3) (integer) 15000        # 15ms
   4) 1) "HGETALL"
      2) "big_hash_key"
   5) "192.168.1.100:6379"
   6) "myapp"

# 查看慢查询日志数量
redis-cli> SLOWLOG LEN
(integer) 128

# 清空慢查询日志
redis-cli> SLOWLOG RESET
OK
```

**3. 慢查询分析脚本（Python）**

```python
import redis
from datetime import datetime

def analyze_slow_log(host='localhost', port=6379):
    """
    分析 Redis 慢查询日志
    """
    r = redis.Redis(host=host, port=port, decode_responses=True)

    # 获取慢查询日志
    slow_logs = r.slowlog_get(100)

    if not slow_logs:
        print("✅ 没有慢查询记录")
        return

    # 统计慢命令类型
    cmd_stats = {}

    print(f"\n📊 慢查询分析报告（共 {len(slow_logs)} 条）")
    print("=" * 80)

    for log in slow_logs:
        log_id = log['id']
        timestamp = datetime.fromtimestamp(log['start_time'])
        duration = log['duration'] / 1000  # 转换为毫秒
        command = ' '.join(log['command'])
        client = log['client_address']

        # 统计命令类型
        cmd_type = log['command'][0].upper()
        cmd_stats[cmd_type] = cmd_stats.get(cmd_type, 0) + 1

        print(f"\n🔴 ID: {log_id}")
        print(f"   时间: {timestamp}")
        print(f"   耗时: {duration:.2f}ms")
        print(f"   命令: {command}")
        print(f"   客户端: {client}")

    print("\n" + "=" * 80)
    print("📈 慢命令统计：")
    for cmd, count in sorted(cmd_stats.items(), key=lambda x: x[1], reverse=True):
        print(f"   {cmd}: {count} 次")

# 使用示例
analyze_slow_log()
```

**4. 生产环境监控方案**

```python
import redis
import time
import json

def monitor_slow_log(host='localhost', port=6379, interval=60):
    """
    定期监控慢查询并告警
    """
    r = redis.Redis(host=host, port=6379, decode_responses=True)
    last_id = 0

    while True:
        try:
            # 获取最新慢查询
            logs = r.slowlog_get(10)

            for log in logs:
                if log['id'] > last_id:
                    duration = log['duration'] / 1000  # ms
                    command = ' '.join(log['command'])

                    # 告警阈值：超过 50ms
                    if duration > 50:
                        alert_msg = {
                            'level': 'HIGH',
                            'duration_ms': duration,
                            'command': command,
                            'client': log['client_address'],
                            'timestamp': log['start_time']
                        }
                        print(f"🚨 慢查询告警: {json.dumps(alert_msg, ensure_ascii=False)}")
                        # 这里可以集成告警系统（钉钉、邮件、Prometheus 等）

                    last_id = log['id']

            time.sleep(interval)

        except Exception as e:
            print(f"❌ 监控异常: {e}")
            time.sleep(interval)

# 后台运行
# monitor_slow_log()
```

**5. 慢查询优化建议**

```bash
# 1. 避免使用的命令（生产环境禁用）
KEYS *                    # 使用 SCAN 代替
FLUSHALL                  # 清空所有数据
FLUSHDB                   # 清空当前数据库
SAVE                      # 同步持久化（使用 BGSAVE）

# 2. 谨慎使用的命令（需控制数据量）
HGETALL big_hash          # 大哈希表一次获取所有字段
SMEMBERS big_set          # 大集合一次获取所有成员
LRANGE list 0 -1          # 获取整个列表
ZRANGE zset 0 -1          # 获取整个有序集合
SORT list                 # 大列表排序

# 3. 优化方案
# ✅ 使用 SCAN 系列命令（SCAN、HSCAN、SSCAN、ZSCAN）
SCAN 0 MATCH user:* COUNT 100
HSCAN big_hash 0 COUNT 100

# ✅ 限制返回数量
LRANGE list 0 99          # 只获取前 100 个元素
ZRANGE zset 0 99          # 只获取前 100 个成员

# ✅ 拆分大 key
# 将大 Hash 拆分为多个小 Hash
# user:{uid}:profile → user:{uid}:profile:1, user:{uid}:profile:2

# ✅ 使用更合适的数据结构
# 列表排序 → ZSet（天然有序）
# 大字符串 → 多个小字符串或 Hash
```

**6. 慢查询阈值设置建议**

| 环境 | 阈值设置 | 说明 |
|-----|---------|------|
| **开发环境** | 100ms | 宽松设置，发现明显问题 |
| **测试环境** | 10ms | 接近生产，提前发现隐患 |
| **生产环境** | 1-5ms | 严格控制，保证性能 |
| **高并发场景** | 1ms | 极致性能要求 |

```bash
# 根据业务特点动态调整
# 如果慢查询日志每天新增 < 10 条：阈值可能太高，建议降低
# 如果慢查询日志每天新增 > 1000 条：阈值可能太低，或确实存在性能问题
```

#### 关键要点

1. **慢查询统计范围**：只包含命令执行时间，不含排队、网络传输时间
2. **日志存储**：慢查询日志存储在内存中（FIFO 队列），重启后丢失
3. **阈值设置**：生产环境建议 1-10ms，需根据业务场景和服务器性能调整
4. **定期巡检**：
   - 每天检查慢查询日志，统计高频慢命令
   - 设置监控告警（超过阈值自动通知）
   - 定期分析 `INFO commandstats` 查看命令调用统计
5. **优化优先级**：
   - 高频慢命令（如每秒执行多次的 KEYS）优先优化
   - 低频但耗时极长的命令（如 SORT 大数据）次之
   - 考虑业务影响程度（核心接口 vs 后台任务）

#### 记忆口诀

> **慢查询日志记耗时，超过阈值便记录**
> 只统执行不含网络，内存存储重启丢
> SLOWLOG GET 查日志，分析优化找瓶颈
> KEYS HGETALL 是元凶，SCAN 分批是良方
> 生产环境一到十，定期巡检设告警
52. 大 key 问题是什么？如何解决？

### 52. 大 key 问题是什么？如何解决？

#### 核心答案

大 key 是指**单个 key 存储的值过大**（如 String 超过 10KB，List/Set/Hash 元素数超过 5000），会导致：**内存占用高**、**网络传输慢**、**阻塞主线程**（删除、过期时）、**主从复制延迟**。解决方案：**拆分大 key**（按范围或哈希分片）、**压缩数据**、**定期清理**、**设置合理过期时间**、**异步删除**（UNLINK）。

#### 详细说明

<svg viewBox="0 0 900 750" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bigkeyGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#dc2626;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#dc2626;stop-opacity:0.3"/>
    </linearGradient>
    <linearGradient id="bigkeyGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#059669;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#059669;stop-opacity:0.3"/>
    </linearGradient>
  </defs>
  <text x="450" y="25" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">大 Key 问题全景</text>
  <g transform="translate(50, 50)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#dc2626">大 Key 判断标准</text>
    <rect x="0" y="10" width="800" height="180" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
    <line x1="160" y1="10" x2="160" y2="190" stroke="#fca5a5" stroke-width="1"/>
    <line x1="400" y1="10" x2="400" y2="190" stroke="#fca5a5" stroke-width="1"/>
    <line x1="600" y1="10" x2="600" y2="190" stroke="#fca5a5" stroke-width="1"/>
    <line x1="0" y1="50" x2="800" y2="50" stroke="#fca5a5" stroke-width="1"/>
    <line x1="0" y1="90" x2="800" y2="90" stroke="#fca5a5" stroke-width="1"/>
    <line x1="0" y1="130" x2="800" y2="130" stroke="#fca5a5" stroke-width="1"/>
    <line x1="0" y1="170" x2="800" y2="170" stroke="#fca5a5" stroke-width="1"/>
    <text x="80" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">数据类型</text>
    <text x="280" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">判断指标</text>
    <text x="500" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">警戒线</text>
    <text x="700" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">危险线</text>
    <text x="80" y="72" text-anchor="middle" font-size="11" fill="#374151">String</text>
    <text x="280" y="72" text-anchor="middle" font-size="11" fill="#374151">value 大小</text>
    <text x="500" y="72" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">> 10 KB</text>
    <text x="700" y="72" text-anchor="middle" font-size="11" fill="#dc2626" font-weight="bold">> 1 MB</text>
    <text x="80" y="112" text-anchor="middle" font-size="11" fill="#374151">List/Set</text>
    <text x="280" y="112" text-anchor="middle" font-size="11" fill="#374151">元素数量</text>
    <text x="500" y="112" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">> 5000</text>
    <text x="700" y="112" text-anchor="middle" font-size="11" fill="#dc2626" font-weight="bold">> 10000</text>
    <text x="80" y="152" text-anchor="middle" font-size="11" fill="#374151">Hash/ZSet</text>
    <text x="280" y="152" text-anchor="middle" font-size="11" fill="#374151">字段/成员数量</text>
    <text x="500" y="152" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">> 5000</text>
    <text x="700" y="152" text-anchor="middle" font-size="11" fill="#dc2626" font-weight="bold">> 10000</text>
    <text x="400" y="185" text-anchor="middle" font-size="10" fill="#7f1d1d">注：实际阈值需根据业务场景和服务器性能调整</text>
  </g>
  <g transform="translate(50, 250)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#dc2626">大 Key 危害</text>
    <rect x="0" y="15" width="380" height="150" fill="url(#bigkeyGrad1)" stroke="#dc2626" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="12" font-weight="bold" fill="#991b1b">1. 内存占用</text>
    <text x="30" y="58" font-size="11" fill="#374151">• 单个 key 占用大量内存，导致内存碎片</text>
    <text x="30" y="75" font-size="11" fill="#374151">• 可能触发内存淘汰，影响其他数据</text>
    <text x="20" y="100" font-size="12" font-weight="bold" fill="#991b1b">2. 性能影响</text>
    <text x="30" y="118" font-size="11" fill="#374151">• 网络传输慢（如 1MB 数据需 80ms）</text>
    <text x="30" y="135" font-size="11" fill="#374151">• 阻塞主线程（删除、过期、持久化）</text>
    <text x="30" y="152" font-size="11" fill="#374151">• 慢查询频发，影响整体 QPS</text>
  </g>
  <g transform="translate(470, 250)">
    <rect x="0" y="15" width="380" height="150" fill="url(#bigkeyGrad1)" stroke="#dc2626" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="12" font-weight="bold" fill="#991b1b">3. 高可用风险</text>
    <text x="30" y="58" font-size="11" fill="#374151">• 主从复制延迟（大 key 同步慢）</text>
    <text x="30" y="75" font-size="11" fill="#374151">• 故障切换时间长（RDB 载入慢）</text>
    <text x="20" y="100" font-size="12" font-weight="bold" fill="#991b1b">4. 运维风险</text>
    <text x="30" y="118" font-size="11" fill="#374151">• 难以迁移（Cluster 槽迁移慢）</text>
    <text x="30" y="135" font-size="11" fill="#374151">• 难以备份（RDB/AOF 文件过大）</text>
    <text x="30" y="152" font-size="11" fill="#374151">• 删除慢（DEL 阻塞，需用 UNLINK）</text>
  </g>
  <g transform="translate(50, 430)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#059669">大 Key 排查方法</text>
    <rect x="0" y="15" width="800" height="140" fill="url(#bigkeyGrad2)" stroke="#059669" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="12" font-weight="bold" fill="#065f46">方法 1：redis-cli --bigkeys（推荐）</text>
    <text x="30" y="58" font-size="11" fill="#374151">• 扫描整个数据库，统计每种类型的最大 key</text>
    <text x="30" y="73" font-size="11" fill="#6b7280">命令：redis-cli --bigkeys -i 0.1（每 100ms 扫描一次，避免阻塞）</text>
    <text x="20" y="98" font-size="12" font-weight="bold" fill="#065f46">方法 2：MEMORY USAGE（Redis 4.0+）</text>
    <text x="30" y="116" font-size="11" fill="#374151">• 查看单个 key 占用的内存字节数</text>
    <text x="30" y="131" font-size="11" fill="#6b7280">命令：MEMORY USAGE key_name</text>
    <text x="450" y="98" font-size="12" font-weight="bold" fill="#065f46">方法 3：SCAN + DEBUG OBJECT</text>
    <text x="460" y="116" font-size="11" fill="#374151">• 遍历所有 key，查询序列化长度</text>
    <text x="460" y="131" font-size="11" fill="#6b7280">命令：DEBUG OBJECT key_name</text>
  </g>
  <g transform="translate(50, 590)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#059669">大 Key 解决方案</text>
    <rect x="0" y="15" width="800" height="140" fill="#d1fae5" stroke="#059669" stroke-width="2" rx="5"/>
    <text x="20" y="38" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">1. 拆分大 key</tspan>：Hash 拆成多个小 Hash（如 user:1000 → user:1000:1, user:1000:2）</text>
    <text x="20" y="58" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">2. 数据压缩</tspan>：对 String 类型进行 gzip/snappy 压缩（权衡 CPU 与内存）</text>
    <text x="20" y="78" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">3. 定期清理</tspan>：使用 HSCAN/SSCAN 分批删除元素，而非一次性 DEL</text>
    <text x="20" y="98" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">4. 异步删除</tspan>：使用 UNLINK 代替 DEL（后台线程删除，不阻塞主线程）</text>
    <text x="20" y="118" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">5. 冷热分离</tspan>：热数据 Redis，冷数据迁移到数据库或对象存储</text>
    <text x="20" y="138" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">6. 过期策略</tspan>：设置合理 TTL，避免大 key 长期占用内存</text>
  </g>
</svg>

**1. 大 Key 排查工具**

```bash
# 方法 1：redis-cli --bigkeys（推荐）
redis-cli --bigkeys -i 0.1

# 输出示例：
# Biggest string found 'user:profile:1000' has 1048576 bytes
# Biggest list found 'task:queue' has 15000 items
# Biggest hash found 'product:details' has 8000 fields
# Biggest zset found 'ranking:score' has 20000 members

# 参数说明：
# -i 0.1：每 100ms 扫描一次，避免阻塞（生产环境必加）
# --bigkeys：扫描每种类型的最大 key

# 方法 2：查看单个 key 内存占用（Redis 4.0+）
redis-cli> MEMORY USAGE user:profile:1000
(integer) 1048576    # 1MB

# 方法 3：DEBUG OBJECT 查看序列化长度
redis-cli> DEBUG OBJECT user:profile:1000
Value at:0x7f8e8c0a4000 refcount:1 encoding:raw serializedlength:1048576 lru:5256698

# 方法 4：自定义扫描脚本（Python）
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

def find_big_keys(threshold_kb=10):
    """
    扫描大 key（超过阈值）
    """
    cursor = 0
    big_keys = []

    while True:
        cursor, keys = r.scan(cursor, count=100)

        for key in keys:
            # 获取内存占用
            memory = r.memory_usage(key)
            if memory and memory > threshold_kb * 1024:
                key_type = r.type(key)
                size = r.memory_usage(key) / 1024  # KB
                big_keys.append((key, key_type, size))
                print(f"🔴 大 Key：{key} | 类型：{key_type} | 大小：{size:.2f}KB")

        if cursor == 0:
            break

    return big_keys

# 查找超过 10KB 的 key
find_big_keys(threshold_kb=10)
```

**2. 大 Key 拆分方案**

```python
import redis
import hashlib

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# 方案 1：Hash 按字段数量拆分
def split_big_hash(big_key, bucket_size=1000):
    """
    将大 Hash 拆分为多个小 Hash
    """
    # 获取所有字段
    all_fields = r.hgetall(big_key)

    # 按 bucket_size 分组
    buckets = {}
    for i, (field, value) in enumerate(all_fields.items()):
        bucket_idx = i // bucket_size
        bucket_key = f"{big_key}:{bucket_idx}"

        if bucket_key not in buckets:
            buckets[bucket_key] = {}

        buckets[bucket_key][field] = value

    # 写入新的小 Hash
    pipe = r.pipeline()
    for bucket_key, fields in buckets.items():
        pipe.hset(bucket_key, mapping=fields)
    pipe.execute()

    # 删除原大 Hash（使用 UNLINK 异步删除）
    r.unlink(big_key)

    print(f"✅ 拆分完成：{big_key} → {len(buckets)} 个小 Hash")

# 使用示例
# split_big_hash('user:1000:profile', bucket_size=1000)


# 方案 2：按字段名哈希分片
def split_hash_by_field_hash(big_key, shard_count=10):
    """
    按字段名哈希分片（字段分布更均匀）
    """
    all_fields = r.hgetall(big_key)

    # 按哈希值分片
    shards = {i: {} for i in range(shard_count)}
    for field, value in all_fields.items():
        # 计算字段名哈希值
        hash_val = int(hashlib.md5(field.encode()).hexdigest(), 16)
        shard_idx = hash_val % shard_count
        shards[shard_idx][field] = value

    # 写入分片
    pipe = r.pipeline()
    for shard_idx, fields in shards.items():
        shard_key = f"{big_key}:shard_{shard_idx}"
        pipe.hset(shard_key, mapping=fields)
    pipe.execute()

    r.unlink(big_key)

    print(f"✅ 哈希分片完成：{big_key} → {shard_count} 个分片")

# 使用示例
# split_hash_by_field_hash('product:details', shard_count=10)
```

**3. 安全删除大 Key**

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

def safe_delete_big_key(key):
    """
    安全删除大 key（避免阻塞）
    """
    key_type = r.type(key)

    if key_type == 'string':
        # String 直接使用 UNLINK 异步删除
        r.unlink(key)
        print(f"✅ String 已异步删除：{key}")

    elif key_type == 'list':
        # List 分批删除（每次删除 100 个元素）
        while r.llen(key) > 0:
            r.ltrim(key, 100, -1)  # 删除前 100 个
        r.unlink(key)
        print(f"✅ List 已分批删除：{key}")

    elif key_type == 'set':
        # Set 使用 SPOP 逐个删除
        while r.scard(key) > 0:
            r.spop(key, 100)  # 每次弹出 100 个
        r.unlink(key)
        print(f"✅ Set 已分批删除：{key}")

    elif key_type == 'zset':
        # ZSet 使用 ZREMRANGEBYRANK 分批删除
        while r.zcard(key) > 0:
            r.zremrangebyrank(key, 0, 99)  # 每次删除 100 个
        r.unlink(key)
        print(f"✅ ZSet 已分批删除：{key}")

    elif key_type == 'hash':
        # Hash 使用 HSCAN + HDEL 分批删除
        cursor = 0
        while True:
            cursor, fields = r.hscan(key, cursor, count=100)
            if fields:
                r.hdel(key, *fields.keys())
            if cursor == 0:
                break
        r.unlink(key)
        print(f"✅ Hash 已分批删除：{key}")

    else:
        print(f"❌ 未知类型：{key_type}")

# 使用示例
# safe_delete_big_key('big_hash_key')
```

**4. 数据压缩示例**

```python
import redis
import gzip
import json

r = redis.Redis(host='localhost', port=6379)

def set_compressed_value(key, data, ttl=None):
    """
    压缩存储数据
    """
    # 序列化 + 压缩
    json_str = json.dumps(data)
    compressed = gzip.compress(json_str.encode('utf-8'))

    # 存储
    if ttl:
        r.setex(key, ttl, compressed)
    else:
        r.set(key, compressed)

    # 对比压缩率
    original_size = len(json_str.encode('utf-8'))
    compressed_size = len(compressed)
    ratio = (1 - compressed_size / original_size) * 100

    print(f"✅ 压缩存储：{key}")
    print(f"   原始大小：{original_size} 字节")
    print(f"   压缩后：{compressed_size} 字节")
    print(f"   压缩率：{ratio:.1f}%")

def get_compressed_value(key):
    """
    解压获取数据
    """
    compressed = r.get(key)
    if not compressed:
        return None

    # 解压 + 反序列化
    json_str = gzip.decompress(compressed).decode('utf-8')
    return json.loads(json_str)

# 使用示例
large_data = {'user_id': 1000, 'profile': 'x' * 10000}  # 10KB 数据
set_compressed_value('user:1000:profile', large_data, ttl=3600)
data = get_compressed_value('user:1000:profile')
```

**5. 配置优化**

```bash
# redis.conf 配置

# 1. 启用 lazy-free（异步删除，Redis 4.0+）
lazyfree-lazy-eviction yes          # 内存淘汰时异步删除
lazyfree-lazy-expire yes            # 过期 key 异步删除
lazyfree-lazy-server-del yes        # DEL 命令隐式转为 UNLINK
replica-lazy-flush yes              # 从节点全量同步时异步清空

# 2. 限制数据结构大小（触发压缩编码）
hash-max-ziplist-entries 512        # Hash 超过 512 字段转为 hashtable
hash-max-ziplist-value 64           # Hash 单个值超过 64 字节转为 hashtable
list-max-ziplist-size -2            # List 单节点最大 8KB
set-max-intset-entries 512          # Set 超过 512 个元素转为 hashtable
zset-max-ziplist-entries 128        # ZSet 超过 128 个成员转为skiplist

# 3. 主动碎片整理（避免大 key 导致内存碎片）
activedefrag yes
active-defrag-threshold-lower 10    # 碎片率 > 10% 启动整理
```

#### 关键要点

1. **预防为主**：设计阶段就要避免大 key，单个 key 不超过 10KB/5000 元素
2. **定期巡检**：每周使用 `--bigkeys` 扫描，发现问题及时拆分
3. **安全删除**：生产环境使用 UNLINK 代替 DEL，避免阻塞
4. **拆分策略**：
   - 按范围拆分（如按时间、ID 区间）
   - 按哈希分片（分布更均匀）
   - 按业务拆分（如用户信息分为基础信息、扩展信息）
5. **监控告警**：设置内存占用、慢查询告警，及时发现大 key

#### 记忆口诀

> **大 Key 危害四方面，内存性能高可用**
> 网络传输慢如牛，删除阻塞主线程
> 排查工具 bigkeys，MEMORY USAGE 查占用
> 拆分压缩是良方，UNLINK 删除不阻塞
> 预防为主勤巡检，设计合理最重要
53. 热 key 问题是什么？如何解决？

### 53. 热 key 问题是什么？如何解决？

#### 核心答案

热 key 是指**访问频率极高的 key**（如热门商品、明星微博），在短时间内产生大量请求（如 QPS > 1000），导致：**单点瓶颈**（流量集中在一个节点）、**CPU 飙升**、**网络带宽打满**、**缓存击穿风险**。解决方案：**多级缓存**（本地缓存 + Redis）、**热 key 复制**（多个副本分散流量）、**读写分离**、**限流降级**。

#### 详细说明

<svg viewBox="0 0 900 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="hotkeyGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.3"/>
    </linearGradient>
    <linearGradient id="hotkeyGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.3"/>
    </linearGradient>
    <marker id="arrowHot" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#dc2626"/>
    </marker>
  </defs>
  <text x="450" y="25" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">热 Key 问题全景</text>
  <g transform="translate(50, 50)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#dc2626">热 Key 产生场景</text>
    <rect x="0" y="15" width="380" height="140" fill="url(#hotkeyGrad1)" stroke="#dc2626" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="12" fill="#374151"><tspan font-weight="bold" fill="#991b1b">1. 热点事件</tspan>：明星爆料、突发新闻</text>
    <text x="30" y="58" font-size="11" fill="#6b7280">示例：微博热搜 key，瞬间百万级 QPS</text>
    <text x="20" y="80" font-size="12" fill="#374151"><tspan font-weight="bold" fill="#991b1b">2. 秒杀活动</tspan>：限量商品、抢购</text>
    <text x="30" y="98" font-size="11" fill="#6b7280">示例：iPhone 新品首发，商品详情 key</text>
    <text x="20" y="120" font-size="12" fill="#374151"><tspan font-weight="bold" fill="#991b1b">3. 数据倾斜</tspan>：用户行为不均衡</text>
    <text x="30" y="138" font-size="11" fill="#6b7280">示例：头部账号粉丝数 key，访问量远超普通账号</text>
  </g>
  <g transform="translate(470, 50)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#dc2626">热 Key 危害</text>
    <rect x="0" y="15" width="380" height="140" fill="url(#hotkeyGrad1)" stroke="#dc2626" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="12" fill="#374151"><tspan font-weight="bold" fill="#991b1b">1. 单点瓶颈</tspan>：流量集中在一个 Redis 节点</text>
    <text x="30" y="58" font-size="11" fill="#6b7280">Cluster 模式下，热 key 所在分片负载过高</text>
    <text x="20" y="80" font-size="12" fill="#374151"><tspan font-weight="bold" fill="#991b1b">2. CPU 飙升</tspan>：大量请求处理导致 CPU 100%</text>
    <text x="30" y="98" font-size="11" fill="#6b7280">单线程模型，其他命令排队等待</text>
    <text x="20" y="120" font-size="12" fill="#374151"><tspan font-weight="bold" fill="#991b1b">3. 带宽打满</tspan>：网卡流量达到上限</text>
    <text x="30" y="138" font-size="11" fill="#6b7280">尤其是返回大 value 时（如商品详情）</text>
  </g>
  <g transform="translate(50, 210)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#1f2937">热 Key 识别方法</text>
    <rect x="0" y="15" width="800" height="160" fill="#f9fafb" stroke="#9ca3af" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="12" font-weight="bold" fill="#3b82f6">方法 1：业务预判</text>
    <text x="30" y="58" font-size="11" fill="#374151">• 根据业务特点提前识别（如秒杀商品 ID、热搜话题 ID）</text>
    <text x="30" y="73" font-size="11" fill="#6b7280">• 提前做好预热和防护准备</text>
    <text x="20" y="98" font-size="12" font-weight="bold" fill="#3b82f6">方法 2：Redis 监控（MONITOR 命令）</text>
    <text x="30" y="116" font-size="11" fill="#374151">• redis-cli MONITOR | head -10000 > monitor.log</text>
    <text x="30" y="131" font-size="11" fill="#dc2626">⚠️ 生产环境慎用，会显著降低性能（30%-50%）</text>
    <text x="450" y="98" font-size="12" font-weight="bold" fill="#3b82f6">方法 3：客户端统计</text>
    <text x="460" y="116" font-size="11" fill="#374151">• 在应用层拦截器统计 key 访问频率</text>
    <text x="460" y="131" font-size="11" fill="#374151">• 上报到监控系统（如 Prometheus）</text>
    <text x="20" y="156" font-size="12" font-weight="bold" fill="#3b82f6">方法 4：Redis 4.0+ hotkeys</text>
    <text x="30" y="167" font-size="11" fill="#374151">• redis-cli --hotkeys（基于 LFU 算法统计）</text>
  </g>
  <g transform="translate(50, 390)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#059669">解决方案 1：多级缓存</text>
    <rect x="0" y="15" width="800" height="120" fill="url(#hotkeyGrad2)" stroke="#059669" stroke-width="2" rx="5"/>
    <rect x="50" y="35" width="100" height="50" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
    <text x="100" y="65" text-anchor="middle" font-size="11" fill="#374151">本地缓存</text>
    <text x="100" y="80" text-anchor="middle" font-size="10" fill="#92400e">JVM 堆内</text>
    <path d="M 150 60 L 190 60" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowHot)"/>
    <text x="170" y="55" text-anchor="middle" font-size="10" fill="#dc2626">未命中</text>
    <rect x="190" y="35" width="100" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
    <text x="240" y="65" text-anchor="middle" font-size="11" fill="#374151">Redis</text>
    <text x="240" y="80" text-anchor="middle" font-size="10" fill="#1e40af">分布式缓存</text>
    <path d="M 290 60 L 330 60" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowHot)"/>
    <text x="310" y="55" text-anchor="middle" font-size="10" fill="#dc2626">未命中</text>
    <rect x="330" y="35" width="100" height="50" fill="#d1fae5" stroke="#059669" stroke-width="2" rx="5"/>
    <text x="380" y="65" text-anchor="middle" font-size="11" fill="#374151">MySQL</text>
    <text x="380" y="80" text-anchor="middle" font-size="10" fill="#065f46">持久化存储</text>
    <text x="20" y="110" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">优点</tspan>：热 key 访问不经过 Redis，QPS 可达 10w+</text>
    <text x="20" y="128" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#dc2626">缺点</tspan>：缓存一致性问题，需设置较短 TTL（如 1-5s）</text>
  </g>
  <g transform="translate(50, 530)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#059669">解决方案 2：热 Key 复制（推荐）</text>
    <rect x="0" y="15" width="800" height="100" fill="#d1fae5" stroke="#059669" stroke-width="2" rx="5"/>
    <text x="20" y="38" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">原理</tspan>：将热 key 复制多份（如 product:1000 → product:1000_1, product:1000_2, ...）</text>
    <text x="20" y="56" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">实现</tspan>：客户端随机选择副本（负载均衡），分散到多个节点</text>
    <text x="20" y="74" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">优点</tspan>：流量均摊，无单点瓶颈；实现简单，无需改造 Redis</text>
    <text x="20" y="92" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#dc2626">缺点</tspan>：数据冗余，内存占用增加；更新时需同步所有副本</text>
  </g>
  <g transform="translate(50, 650)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#059669">解决方案 3：限流降级</text>
    <rect x="0" y="15" width="380" height="100" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
    <text x="20" y="38" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#92400e">限流</tspan>：对热 key 访问限流（如 QPS 1000）</text>
    <text x="30" y="56" font-size="10" fill="#6b7280">使用 Guava RateLimiter 或 Redis 限流</text>
    <text x="20" y="76" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#92400e">降级</tspan>：超过阈值返回默认值或缓存</text>
    <text x="30" y="94" font-size="10" fill="#6b7280">保护 Redis，避免雪崩</text>
  </g>
  <g transform="translate(470, 650)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#059669">解决方案 4：读写分离</text>
    <rect x="0" y="15" width="380" height="100" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
    <text x="20" y="38" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#1e40af">原理</tspan>：热 key 读请求路由到从节点</text>
    <text x="30" y="56" font-size="10" fill="#6b7280">1 主 + N 从，读流量分散到 N 个节点</text>
    <text x="20" y="76" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#059669">优点</tspan>：扩展性好，可动态增加从节点</text>
    <text x="20" y="94" font-size="11" fill="#dc2626"><tspan font-weight="bold">缺点</tspan>：主从延迟，可能读到旧数据</text>
  </g>
</svg>

**1. 热 Key 检测脚本**

```python
import redis
from collections import Counter
import time

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

def detect_hot_keys_by_monitor(duration=60, top_n=10):
    """
    方法 1：通过 MONITOR 命令检测热 key
    ⚠️ 生产环境慎用，会降低 30%-50% 性能
    """
    print(f"⚠️ 开始监控 {duration} 秒，这会影响 Redis 性能...")

    key_counter = Counter()
    start_time = time.time()

    # 订阅 MONITOR 输出
    monitor = r.monitor()

    for entry in monitor:
        # 解析命令（简化版，实际需更复杂的解析）
        if isinstance(entry, dict) and 'command' in entry:
            command = entry['command']
            if len(command) >= 2:
                cmd_type = command[0].upper()
                if cmd_type in ['GET', 'SET', 'HGET', 'HGETALL']:
                    key = command[1]
                    key_counter[key] += 1

        # 超时退出
        if time.time() - start_time > duration:
            break

    # 输出 Top N 热 key
    print(f"\n🔥 Top {top_n} 热 Key：")
    for key, count in key_counter.most_common(top_n):
        print(f"   {key}: {count} 次访问")

# 使用示例（谨慎使用）
# detect_hot_keys_by_monitor(duration=60, top_n=10)


def detect_hot_keys_client_side():
    """
    方法 2：客户端侧统计（推荐）
    在应用层拦截器中统计 key 访问频率
    """
    from functools import wraps
    from collections import defaultdict
    import threading

    class HotKeyDetector:
        def __init__(self, report_interval=60):
            self.key_counter = defaultdict(int)
            self.lock = threading.Lock()
            self.report_interval = report_interval
            self.start_reporting()

        def record(self, key):
            """记录 key 访问"""
            with self.lock:
                self.key_counter[key] += 1

        def get_decorator(self):
            """装饰器，自动统计 key 访问"""
            def decorator(func):
                @wraps(func)
                def wrapper(key, *args, **kwargs):
                    self.record(key)
                    return func(key, *args, **kwargs)
                return wrapper
            return decorator

        def report(self):
            """定期上报热 key"""
            with self.lock:
                if self.key_counter:
                    top_keys = sorted(self.key_counter.items(),
                                     key=lambda x: x[1], reverse=True)[:10]
                    print(f"\n🔥 热 Key 统计（最近 {self.report_interval}s）：")
                    for key, count in top_keys:
                        qps = count / self.report_interval
                        print(f"   {key}: {count} 次访问 (QPS: {qps:.2f})")
                        # 这里可以上报到监控系统（Prometheus、InfluxDB 等）
                    self.key_counter.clear()

            # 定时下次上报
            threading.Timer(self.report_interval, self.report).start()

        def start_reporting(self):
            """启动定期上报"""
            threading.Timer(self.report_interval, self.report).start()

    # 使用示例
    detector = HotKeyDetector(report_interval=60)

    # 包装 Redis 命令
    @detector.get_decorator()
    def redis_get(key):
        return r.get(key)

    # 业务代码调用
    # redis_get('product:1000')
```

**2. 多级缓存实现**

```python
import redis
from functools import lru_cache
import time

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

class MultiLevelCache:
    """
    多级缓存：本地缓存 + Redis + 数据库
    """
    def __init__(self, local_ttl=5, redis_ttl=600):
        self.local_ttl = local_ttl      # 本地缓存 TTL（秒）
        self.redis_ttl = redis_ttl      # Redis 缓存 TTL（秒）
        self.local_cache = {}           # {key: (value, expire_time)}

    def get(self, key, db_fetch_func):
        """
        多级缓存获取数据
        """
        # L1：本地缓存
        local_value = self._get_from_local(key)
        if local_value is not None:
            print(f"✅ 本地缓存命中：{key}")
            return local_value

        # L2：Redis 缓存
        redis_value = r.get(key)
        if redis_value:
            print(f"✅ Redis 缓存命中：{key}")
            self._set_to_local(key, redis_value)
            return redis_value

        # L3：数据库
        print(f"⚠️ 缓存未命中，查询数据库：{key}")
        db_value = db_fetch_func()
        if db_value:
            # 回写到 Redis 和本地缓存
            r.setex(key, self.redis_ttl, db_value)
            self._set_to_local(key, db_value)

        return db_value

    def _get_from_local(self, key):
        """从本地缓存获取"""
        if key in self.local_cache:
            value, expire_time = self.local_cache[key]
            if time.time() < expire_time:
                return value
            else:
                del self.local_cache[key]  # 过期删除
        return None

    def _set_to_local(self, key, value):
        """写入本地缓存"""
        expire_time = time.time() + self.local_ttl
        self.local_cache[key] = (value, expire_time)

    def invalidate(self, key):
        """缓存失效（删除所有层级）"""
        if key in self.local_cache:
            del self.local_cache[key]
        r.delete(key)

# 使用示例
cache = MultiLevelCache(local_ttl=5, redis_ttl=600)

def get_product_info(product_id):
    """获取商品信息"""
    key = f"product:{product_id}"

    def fetch_from_db():
        # 模拟数据库查询
        return f"Product {product_id} details"

    return cache.get(key, fetch_from_db)

# 业务调用
# info = get_product_info(1000)
```

**3. 热 Key 复制方案**

```python
import redis
import random
import hashlib

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

class HotKeyReplicator:
    """
    热 Key 复制：将热 key 复制多份，分散流量
    """
    def __init__(self, replica_count=10):
        self.replica_count = replica_count

    def set_hot_key(self, key, value, ttl=None):
        """
        设置热 key（写入所有副本）
        """
        pipe = r.pipeline()
        for i in range(self.replica_count):
            replica_key = f"{key}_replica_{i}"
            if ttl:
                pipe.setex(replica_key, ttl, value)
            else:
                pipe.set(replica_key, value)
        pipe.execute()
        print(f"✅ 热 Key 已复制：{key} → {self.replica_count} 个副本")

    def get_hot_key(self, key):
        """
        获取热 key（随机选择副本，负载均衡）
        """
        replica_idx = random.randint(0, self.replica_count - 1)
        replica_key = f"{key}_replica_{replica_idx}"
        return r.get(replica_key)

    def delete_hot_key(self, key):
        """
        删除热 key（删除所有副本）
        """
        pipe = r.pipeline()
        for i in range(self.replica_count):
            replica_key = f"{key}_replica_{i}"
            pipe.delete(replica_key)
        pipe.execute()
        print(f"✅ 热 Key 已删除：{key} 及其所有副本")

# 使用示例
replicator = HotKeyReplicator(replica_count=10)

# 写入热 key
replicator.set_hot_key('product:hot_sale', 'iPhone 16 Pro', ttl=3600)

# 读取热 key（自动负载均衡）
for _ in range(5):
    value = replicator.get_hot_key('product:hot_sale')
    print(f"读取到：{value}")
```

**4. 限流降级方案**

```python
import redis
import time
from functools import wraps

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

class RateLimiter:
    """
    基于 Redis 的滑动窗口限流器
    """
    def __init__(self, max_requests=1000, window_size=1):
        self.max_requests = max_requests  # 最大请求数
        self.window_size = window_size    # 时间窗口（秒）

    def is_allowed(self, key):
        """
        检查是否允许访问（滑动窗口算法）
        """
        now = time.time()
        window_start = now - self.window_size

        # 使用 ZSet 存储请求时间戳
        pipe = r.pipeline()
        # 删除窗口外的记录
        pipe.zremrangebyscore(f"rate_limit:{key}", 0, window_start)
        # 统计窗口内的请求数
        pipe.zcard(f"rate_limit:{key}")
        # 添加当前请求
        pipe.zadd(f"rate_limit:{key}", {str(now): now})
        # 设置过期时间
        pipe.expire(f"rate_limit:{key}", int(self.window_size) + 1)

        results = pipe.execute()
        current_requests = results[1]

        if current_requests < self.max_requests:
            return True
        else:
            print(f"⚠️ 限流触发：{key} (QPS: {current_requests}/{self.max_requests})")
            return False

    def get_decorator(self, default_value=None):
        """
        装饰器：限流 + 降级
        """
        def decorator(func):
            @wraps(func)
            def wrapper(key, *args, **kwargs):
                if self.is_allowed(key):
                    return func(key, *args, **kwargs)
                else:
                    # 降级：返回默认值
                    print(f"🛡️ 降级处理：返回默认值")
                    return default_value
            return wrapper
        return decorator

# 使用示例
limiter = RateLimiter(max_requests=1000, window_size=1)  # 1000 QPS

@limiter.get_decorator(default_value='降级数据')
def get_hot_product(product_id):
    """获取热门商品（带限流）"""
    return r.get(f"product:{product_id}")

# 模拟高并发访问
# for _ in range(1500):
#     result = get_hot_product('hot_sale')
```

**5. Redis 配置优化**

```bash
# redis.conf 配置

# 1. 启用 LFU 淘汰策略（便于热 key 统计）
maxmemory-policy allkeys-lfu    # LFU 算法记录访问频率

# 2. 调整 LFU 参数
lfu-log-factor 10               # 访问频率对数增长因子（默认 10）
lfu-decay-time 1                # 频率衰减时间（分钟，默认 1）

# 3. 开启 hotkeys 统计
# redis-cli --hotkeys（需要 maxmemory-policy 为 LFU）
```

#### 关键要点

1. **预防为主**：通过业务分析提前识别热 key（秒杀、热搜等），提前做好防护
2. **分层防护**：多级缓存（本地 + Redis）→ 热 key 复制 → 限流降级，多层防御
3. **监控告警**：
   - 实时监控 key 的 QPS（客户端统计）
   - 设置告警阈值（如单 key QPS > 1000）
   - 自动触发热 key 复制或限流
4. **方案选择**：
   - **读多写少**：多级缓存 + 热 key 复制（推荐）
   - **读写均衡**：读写分离 + 限流降级
   - **极端热点**：限流 + 降级（保护系统）
5. **缓存一致性**：本地缓存 TTL 要短（1-5s），避免数据不一致时间过长

#### 记忆口诀

> **热 Key 访问频率高，单点瓶颈 CPU 飙**
> 多级缓存分层防，本地 Redis 加数据库
> 热 Key 复制多副本，随机选择分流量
> 限流降级保系统，业务预判早准备
> 客户端统计做监控，超过阈值自动防
54. Redis 的批量操作有哪些？

### 54. Redis 的批量操作有哪些？

#### 核心答案

Redis 批量操作主要有四类：**1. 原生批量命令**（MGET/MSET、HMSET、LPUSH 多值）；**2. Pipeline**（客户端打包多条命令）；**3. 事务 MULTI/EXEC**（原子性批量执行）；**4. Lua 脚本**（服务端原子执行复杂逻辑）。选择标准：简单批量用原生命令，大批量用 Pipeline，需原子性用事务/Lua，复杂逻辑用 Lua。

#### 详细说明

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="batchGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.3"/>
    </linearGradient>
  </defs>
  <text x="450" y="25" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">Redis 批量操作对比</text>
  <g transform="translate(50, 50)">
    <rect x="0" y="0" width="800" height="580" fill="#f9fafb" stroke="#d1d5db" stroke-width="2" rx="5"/>
    <line x1="160" y1="0" x2="160" y2="580" stroke="#d1d5db" stroke-width="1"/>
    <line x1="280" y1="0" x2="280" y2="580" stroke="#d1d5db" stroke-width="1"/>
    <line x1="400" y1="0" x2="400" y2="580" stroke="#d1d5db" stroke-width="1"/>
    <line x1="550" y1="0" x2="550" y2="580" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="50" x2="800" y2="50" stroke="#d1d5db" stroke-width="2"/>
    <line x1="0" y1="120" x2="800" y2="120" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="200" x2="800" y2="200" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="280" x2="800" y2="280" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="360" x2="800" y2="360" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="440" x2="800" y2="440" stroke="#d1d5db" stroke-width="1"/>
    <line x1="0" y1="520" x2="800" y2="520" stroke="#d1d5db" stroke-width="1"/>
    <text x="80" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">对比维度</text>
    <text x="220" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">原生批量命令</text>
    <text x="340" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">Pipeline</text>
    <text x="475" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">MULTI/EXEC</text>
    <text x="675" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">Lua 脚本</text>
    <text x="80" y="88" text-anchor="middle" font-size="11" fill="#374151">原子性</text>
    <text x="220" y="88" text-anchor="middle" font-size="10" fill="#059669" font-weight="bold">✅ 原子</text>
    <text x="340" y="88" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="bold">❌ 非原子</text>
    <text x="475" y="88" text-anchor="middle" font-size="10" fill="#059669" font-weight="bold">✅ 原子</text>
    <text x="675" y="88" text-anchor="middle" font-size="10" fill="#059669" font-weight="bold">✅ 原子</text>
    <text x="80" y="163" text-anchor="middle" font-size="11" fill="#374151">网络往返</text>
    <text x="220" y="163" text-anchor="middle" font-size="10" fill="#059669">1 RTT</text>
    <text x="340" y="163" text-anchor="middle" font-size="10" fill="#059669">1 RTT</text>
    <text x="475" y="150" text-anchor="middle" font-size="10" fill="#f59e0b">2 RTT</text>
    <text x="475" y="168" text-anchor="middle" font-size="9" fill="#6b7280">(MULTI+EXEC)</text>
    <text x="675" y="163" text-anchor="middle" font-size="10" fill="#059669">1 RTT</text>
    <text x="80" y="243" text-anchor="middle" font-size="11" fill="#374151">命令限制</text>
    <text x="220" y="230" text-anchor="middle" font-size="9" fill="#dc2626">仅限特定命令</text>
    <text x="220" y="248" text-anchor="middle" font-size="9" fill="#6b7280">(MGET/MSET等)</text>
    <text x="340" y="243" text-anchor="middle" font-size="10" fill="#059669">任意命令</text>
    <text x="475" y="243" text-anchor="middle" font-size="10" fill="#059669">任意命令</text>
    <text x="675" y="243" text-anchor="middle" font-size="10" fill="#059669">任意逻辑</text>
    <text x="80" y="323" text-anchor="middle" font-size="11" fill="#374151">条件逻辑</text>
    <text x="220" y="323" text-anchor="middle" font-size="10" fill="#dc2626">❌ 不支持</text>
    <text x="340" y="323" text-anchor="middle" font-size="10" fill="#dc2626">❌ 不支持</text>
    <text x="475" y="310" text-anchor="middle" font-size="10" fill="#f59e0b">⚠️ WATCH</text>
    <text x="475" y="328" text-anchor="middle" font-size="9" fill="#6b7280">(乐观锁)</text>
    <text x="675" y="310" text-anchor="middle" font-size="10" fill="#059669">✅ if/else</text>
    <text x="675" y="328" text-anchor="middle" font-size="9" fill="#6b7280">(完整编程)</text>
    <text x="80" y="403" text-anchor="middle" font-size="11" fill="#374151">错误处理</text>
    <text x="220" y="403" text-anchor="middle" font-size="10" fill="#dc2626">全部失败</text>
    <text x="340" y="403" text-anchor="middle" font-size="10" fill="#f59e0b">逐条失败</text>
    <text x="475" y="390" text-anchor="middle" font-size="10" fill="#dc2626">全部回滚</text>
    <text x="475" y="408" text-anchor="middle" font-size="9" fill="#6b7280">(DISCARD)</text>
    <text x="675" y="403" text-anchor="middle" font-size="10" fill="#dc2626">全部失败</text>
    <text x="80" y="483" text-anchor="middle" font-size="11" fill="#374151">性能</text>
    <text x="220" y="483" text-anchor="middle" font-size="10" fill="#059669">最快</text>
    <text x="340" y="470" text-anchor="middle" font-size="10" fill="#059669">快</text>
    <text x="340" y="488" text-anchor="middle" font-size="9" fill="#6b7280">(减少 RTT)</text>
    <text x="475" y="483" text-anchor="middle" font-size="10" fill="#f59e0b">较快</text>
    <text x="675" y="470" text-anchor="middle" font-size="10" fill="#059669">快</text>
    <text x="675" y="488" text-anchor="middle" font-size="9" fill="#6b7280">(服务端执行)</text>
    <text x="80" y="553" text-anchor="middle" font-size="11" fill="#374151">适用场景</text>
    <text x="220" y="545" text-anchor="middle" font-size="9" fill="#374151">简单批量</text>
    <text x="220" y="560" text-anchor="middle" font-size="9" fill="#374151">读写</text>
    <text x="340" y="545" text-anchor="middle" font-size="9" fill="#374151">大批量</text>
    <text x="340" y="560" text-anchor="middle" font-size="9" fill="#374151">操作</text>
    <text x="475" y="545" text-anchor="middle" font-size="9" fill="#374151">需原子性</text>
    <text x="475" y="560" text-anchor="middle" font-size="9" fill="#374151">保证</text>
    <text x="675" y="545" text-anchor="middle" font-size="9" fill="#374151">复杂业务</text>
    <text x="675" y="560" text-anchor="middle" font-size="9" fill="#374151">逻辑</text>
  </g>
</svg>

**1. 原生批量命令**

```bash
# String 批量操作
MGET key1 key2 key3                    # 批量获取
MSET key1 value1 key2 value2           # 批量设置
MSETNX key1 value1 key2 value2         # 批量设置（不存在时）

# Hash 批量操作
HMSET hash field1 value1 field2 value2 # 批量设置字段（Redis 4.0+ 废弃，用 HSET）
HSET hash field1 value1 field2 value2  # 批量设置字段（Redis 4.0+）
HMGET hash field1 field2 field3        # 批量获取字段
HGETALL hash                            # 获取所有字段（慎用大 Hash）

# List 批量操作
LPUSH list value1 value2 value3        # 批量左侧插入
RPUSH list value1 value2 value3        # 批量右侧插入
LRANGE list 0 99                       # 批量获取（指定范围）

# Set 批量操作
SADD set member1 member2 member3       # 批量添加成员
SMEMBERS set                           # 获取所有成员（慎用大 Set）

# ZSet 批量操作
ZADD zset score1 member1 score2 member2  # 批量添加成员
ZRANGE zset 0 99                       # 批量获取（按分数排序）
```

```python
# Python 示例
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# MGET/MSET 批量操作
r.mset({'user:1': 'Alice', 'user:2': 'Bob', 'user:3': 'Charlie'})
values = r.mget('user:1', 'user:2', 'user:3')
print(values)  # ['Alice', 'Bob', 'Charlie']

# HMSET 批量设置 Hash
r.hset('product:1000', mapping={
    'name': 'iPhone',
    'price': 999,
    'stock': 100
})

# HMGET 批量获取 Hash 字段
fields = r.hmget('product:1000', 'name', 'price')
print(fields)  # ['iPhone', '999']
```

**2. Pipeline 批量操作**

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Pipeline 批量执行
pipe = r.pipeline()

# 添加多条命令
for i in range(1000):
    pipe.set(f'key:{i}', f'value:{i}')
    pipe.expire(f'key:{i}', 3600)

# 统一执行（1 次 RTT）
results = pipe.execute()
print(f"执行了 {len(results)} 条命令")

# Pipeline 混合操作
pipe = r.pipeline()
pipe.set('counter', 0)
pipe.incr('counter')
pipe.incr('counter')
pipe.get('counter')
pipe.hset('user:1000', 'name', 'Alice')
pipe.hget('user:1000', 'name')

results = pipe.execute()
print(results)  # [True, 1, 2, '2', 1, 'Alice']
```

**3. 事务 MULTI/EXEC**

```bash
# Redis 命令行
redis-cli> MULTI                       # 开启事务
OK
redis-cli> SET account:A 100
QUEUED
redis-cli> SET account:B 200
QUEUED
redis-cli> DECRBY account:A 50
QUEUED
redis-cli> INCRBY account:B 50
QUEUED
redis-cli> EXEC                        # 执行事务
1) OK
2) OK
3) (integer) 50
4) (integer) 250

# 使用 WATCH 实现乐观锁
redis-cli> WATCH balance               # 监控 key
OK
redis-cli> GET balance
"100"
redis-cli> MULTI
OK
redis-cli> DECRBY balance 10
QUEUED
redis-cli> EXEC
1) (integer) 90                        # 如果 balance 被其他客户端修改，返回 nil

# 取消事务
redis-cli> MULTI
OK
redis-cli> SET key1 value1
QUEUED
redis-cli> DISCARD                     # 取消事务
OK
```

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Python 事务（Pipeline + transaction=True）
pipe = r.pipeline(transaction=True)
pipe.multi()
pipe.set('account:A', 100)
pipe.set('account:B', 200)
pipe.decrby('account:A', 50)
pipe.incrby('account:B', 50)
results = pipe.execute()
print(results)  # [True, True, 50, 250]

# 使用 WATCH 实现乐观锁（转账示例）
def transfer(from_account, to_account, amount):
    """
    原子性转账（使用 WATCH + MULTI）
    """
    with r.pipeline() as pipe:
        while True:
            try:
                # 监控余额
                pipe.watch(from_account, to_account)

                # 检查余额
                balance = int(pipe.get(from_account) or 0)
                if balance < amount:
                    pipe.unwatch()
                    return False, "余额不足"

                # 执行转账
                pipe.multi()
                pipe.decrby(from_account, amount)
                pipe.incrby(to_account, amount)
                pipe.execute()

                return True, "转账成功"

            except redis.WatchError:
                # 如果 key 被修改，重试
                print("⚠️ 检测到并发修改，重试中...")
                continue

# 使用示例
r.set('account:A', 1000)
r.set('account:B', 500)
success, msg = transfer('account:A', 'account:B', 100)
print(f"{msg}: A={r.get('account:A')}, B={r.get('account:B')}")
```

**4. Lua 脚本**

```bash
# Redis 命令行执行 Lua 脚本
redis-cli> EVAL "return redis.call('SET', KEYS[1], ARGV[1])" 1 mykey myvalue
OK

# 复杂 Lua 脚本：原子性扣减库存
redis-cli> EVAL "
local stock = redis.call('GET', KEYS[1])
if not stock then
    return -1
end
stock = tonumber(stock)
if stock < tonumber(ARGV[1]) then
    return 0
end
redis.call('DECRBY', KEYS[1], ARGV[1])
return 1
" 1 product:1000:stock 10

# 返回值：
# -1：库存不存在
#  0：库存不足
#  1：扣减成功
```

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# 方式 1：直接执行 Lua 脚本
lua_script = """
local current = redis.call('GET', KEYS[1])
if not current then
    current = 0
else
    current = tonumber(current)
end
current = current + tonumber(ARGV[1])
redis.call('SET', KEYS[1], current)
return current
"""

# KEYS=[counter], ARGV=[10]
result = r.eval(lua_script, 1, 'counter', 10)
print(f"计数器值：{result}")

# 方式 2：注册 Lua 脚本（推荐，避免重复传输）
script_sha = r.script_load(lua_script)
result = r.evalsha(script_sha, 1, 'counter', 5)
print(f"计数器值：{result}")

# 实战案例：秒杀库存扣减（原子性 + 条件判断）
deduct_stock_script = """
local stock_key = KEYS[1]
local order_key = KEYS[2]
local user_id = ARGV[1]
local quantity = tonumber(ARGV[2])

-- 检查库存
local stock = tonumber(redis.call('GET', stock_key) or 0)
if stock < quantity then
    return {-1, 'Stock insufficient'}
end

-- 检查用户是否已购买（防重复下单）
local has_ordered = redis.call('SISMEMBER', order_key, user_id)
if has_ordered == 1 then
    return {-2, 'Already ordered'}
end

-- 扣减库存 + 记录订单
redis.call('DECRBY', stock_key, quantity)
redis.call('SADD', order_key, user_id)

return {1, 'Success'}
"""

# 注册脚本
deduct_script_sha = r.script_load(deduct_stock_script)

# 初始化库存
r.set('product:1000:stock', 100)

# 用户秒杀
def seckill(user_id, quantity):
    result = r.evalsha(
        deduct_script_sha,
        2,  # KEYS 数量
        'product:1000:stock',    # KEYS[1]
        'product:1000:orders',   # KEYS[2]
        user_id,                 # ARGV[1]
        quantity                 # ARGV[2]
    )
    code, msg = result
    if code == 1:
        print(f"✅ 用户 {user_id} 秒杀成功")
    elif code == -1:
        print(f"❌ 库存不足")
    elif code == -2:
        print(f"⚠️ 用户 {user_id} 已购买，禁止重复下单")

# 模拟秒杀
seckill('user:1', 1)
seckill('user:1', 1)  # 重复下单
seckill('user:2', 1)
```

**5. 批量操作选择指南**

| 场景 | 推荐方案 | 原因 |
|-----|---------|------|
| **简单批量读写**（如批量获取用户信息） | 原生批量命令（MGET/MSET） | 性能最优，代码简洁 |
| **大批量操作**（如导入 10000 条数据） | Pipeline（分批 1000 条） | 减少 RTT，避免阻塞 |
| **需要原子性**（如转账、库存扣减） | Lua 脚本 | 服务端原子执行，支持条件判断 |
| **简单事务**（无条件判断） | MULTI/EXEC | 事务隔离，原子性保证 |
| **乐观锁**（如秒杀、抢购） | WATCH + MULTI/EXEC 或 Lua | 防止并发冲突 |
| **复杂业务逻辑**（如多条件判断） | Lua 脚本 | 支持完整编程逻辑 |

**6. 批量操作最佳实践**

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# 1. 大批量操作分批处理（避免阻塞）
def batch_insert(data_dict, batch_size=1000):
    """
    分批插入数据
    """
    keys = list(data_dict.keys())
    for i in range(0, len(keys), batch_size):
        batch_keys = keys[i:i + batch_size]
        batch_data = {k: data_dict[k] for k in batch_keys}

        # 使用 Pipeline 批量插入
        pipe = r.pipeline()
        for key, value in batch_data.items():
            pipe.set(key, value)
        pipe.execute()

        print(f"✅ 已插入 {len(batch_data)} 条数据")

# 使用示例
large_data = {f'key:{i}': f'value:{i}' for i in range(10000)}
batch_insert(large_data, batch_size=1000)


# 2. Pipeline 错误处理
def safe_pipeline_execute(commands):
    """
    安全的 Pipeline 执行（带错误处理）
    """
    pipe = r.pipeline()

    for cmd, args in commands:
        getattr(pipe, cmd)(*args)

    try:
        results = pipe.execute()
        return results, None
    except redis.exceptions.ResponseError as e:
        return None, str(e)

# 使用示例
commands = [
    ('set', ['key1', 'value1']),
    ('incr', ['key1']),  # 错误：key1 不是整数
    ('set', ['key2', 'value2'])
]

results, error = safe_pipeline_execute(commands)
if error:
    print(f"❌ Pipeline 执行失败：{error}")
else:
    print(f"✅ Pipeline 执行成功：{results}")
```

#### 关键要点

1. **优先级**：原生批量命令 > Pipeline > Lua 脚本 > MULTI/EXEC
2. **性能对比**：
   - 原生批量命令：最快（单条命令，服务端优化）
   - Pipeline：快（减少网络 RTT）
   - Lua 脚本：快（服务端执行，无网络开销）
   - MULTI/EXEC：较快（2 次 RTT）
3. **原子性选择**：
   - 无原子性要求 → Pipeline
   - 简单原子性 → MULTI/EXEC
   - 复杂原子性 + 条件判断 → Lua 脚本
4. **分批策略**：大批量操作分批执行（1000-5000 条/批），避免阻塞
5. **错误处理**：
   - Pipeline：逐条失败，需检查每个返回值
   - 事务：全部回滚（DISCARD）
   - Lua：全部失败，需在脚本内处理错误

#### 记忆口诀

> **批量操作四大类，原生 Pipeline 事务 Lua**
> 简单批量用原生，大批量用 Pipeline
> 原子性用事务，复杂逻辑 Lua 好
> 分批执行防阻塞，千条为宜不过万
55. 如何优化 Redis 的内存使用？

### 55. 如何优化 Redis 的内存使用？

#### 核心答案

Redis 内存优化有五个方向：**1. 数据结构优化**（选择合适编码、压缩列表）；**2. 淘汰策略**（LRU/LFU/TTL）；**3. 内存碎片整理**（activedefrag）；**4. Key 设计优化**（缩短 key 名、合并小 key）；**5. 持久化优化**（禁用或优化 RDB/AOF）。核心目标：减少内存占用、提高内存利用率、避免内存碎片。

#### 详细说明

<svg viewBox="0 0 900 750" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="memGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.3"/>
    </linearGradient>
  </defs>
  <text x="450" y="25" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">Redis 内存优化全景</text>
  <g transform="translate(50, 50)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#8b5cf6">1. 数据结构优化</text>
    <rect x="0" y="15" width="800" height="120" fill="url(#memGrad1)" stroke="#8b5cf6" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#6b21a8">ziplist 编码</tspan>：Hash/List/ZSet 元素少时使用压缩列表（节省 50%-70% 内存）</text>
    <text x="30" y="58" font-size="10" fill="#6b7280">hash-max-ziplist-entries 512, list-max-ziplist-size -2</text>
    <text x="20" y="78" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#6b21a8">intset 编码</tspan>：Set 全是整数时使用整数集合（节省 80% 内存）</text>
    <text x="30" y="96" font-size="10" fill="#6b7280">set-max-intset-entries 512</text>
    <text x="20" y="116" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#6b21a8">embstr 编码</tspan>：String 小于 44 字节使用嵌入式字符串（节省指针开销）</text>
  </g>
  <g transform="translate(50, 190)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#059669">2. 淘汰策略优化</text>
    <rect x="0" y="15" width="800" height="120" fill="#d1fae5" stroke="#059669" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">allkeys-lru</tspan>：所有 key 中淘汰最久未使用（适合缓存场景）</text>
    <text x="20" y="60" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">allkeys-lfu</tspan>：所有 key 中淘汰最少使用（Redis 4.0+，更精准）</text>
    <text x="20" y="80" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#065f46">volatile-ttl</tspan>：淘汰最早过期的 key（有 TTL 的 key）</text>
    <text x="20" y="100" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#dc2626">noeviction</tspan>：不淘汰，内存满时返回错误（默认，不推荐）</text>
    <text x="30" y="118" font-size="10" fill="#6b7280">配置：maxmemory-policy allkeys-lru</text>
  </g>
  <g transform="translate(50, 330)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#f59e0b">3. 内存碎片整理</text>
    <rect x="0" y="15" width="800" height="100" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#92400e">主动碎片整理</tspan>：activedefrag yes（Redis 4.0+）</text>
    <text x="30" y="58" font-size="10" fill="#6b7280">碎片率 > 10% 时自动整理，避免内存浪费</text>
    <text x="20" y="78" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#92400e">监控指标</tspan>：mem_fragmentation_ratio（碎片率）</text>
    <text x="30" y="96" font-size="10" fill="#6b7280">正常范围 1.0-1.5，> 1.5 需整理，< 1.0 说明使用了 swap</text>
  </g>
  <g transform="translate(50, 450)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#3b82f6">4. Key 设计优化</text>
    <rect x="0" y="15" width="800" height="120" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#1e40af">缩短 Key 名</tspan>：user:profile:1000 → u:p:1000（节省 50% key 内存）</text>
    <text x="20" y="60" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#1e40af">合并小 Key</tspan>：100 个小 String → 1 个 Hash（节省元数据开销）</text>
    <text x="30" y="78" font-size="10" fill="#6b7280">每个 key 有 ~90 字节元数据（dictEntry + redisObject）</text>
    <text x="20" y="98" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#1e40af">设置过期时间</tspan>：避免无用数据长期占用内存</text>
    <text x="30" y="116" font-size="10" fill="#6b7280">EXPIRE key 3600 或 SET key value EX 3600</text>
  </g>
  <g transform="translate(50, 590)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#dc2626">5. 持久化优化</text>
    <rect x="0" y="15" width="800" height="120" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
    <text x="20" y="40" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#991b1b">禁用持久化</tspan>：纯缓存场景，关闭 RDB 和 AOF（节省 fork 内存）</text>
    <text x="30" y="58" font-size="10" fill="#6b7280">save "" 和 appendonly no</text>
    <text x="20" y="78" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#991b1b">优化 RDB</tspan>：降低 save 频率，减少 fork 开销</text>
    <text x="30" y="96" font-size="10" fill="#6b7280">save 900 1 (15 分钟至少 1 次修改才保存)</text>
    <text x="20" y="116" font-size="11" fill="#374151"><tspan font-weight="bold" fill="#991b1b">优化 AOF</tspan>：使用 everysec，控制重写频率</text>
  </g>
</svg>

**1. 数据结构优化配置**

```bash
# redis.conf 配置

# Hash 优化（ziplist 编码阈值）
hash-max-ziplist-entries 512        # Hash 字段数 < 512 使用 ziplist
hash-max-ziplist-value 64           # Hash 单个值 < 64 字节使用 ziplist

# List 优化（quicklist + ziplist）
list-max-ziplist-size -2            # 单节点最大 8KB（-1=4KB, -2=8KB, -3=16KB）
list-compress-depth 1               # 两端各 1 个节点不压缩，中间压缩

# Set 优化（intset 编码阈值）
set-max-intset-entries 512          # Set 元素数 < 512 且全是整数时使用 intset

# ZSet 优化（ziplist 编码阈值）
zset-max-ziplist-entries 128        # ZSet 成员数 < 128 使用 ziplist
zset-max-ziplist-value 64           # ZSet 单个值 < 64 字节使用 ziplist
```

**查看编码类型**

```bash
# Redis 命令
redis-cli> OBJECT ENCODING mykey

# 输出示例：
"ziplist"       # 压缩列表（节省内存）
"hashtable"     # 哈希表（正常编码）
"intset"        # 整数集合（节省内存）
"skiplist"      # 跳表（正常编码）
"embstr"        # 嵌入式字符串（String < 44 字节）
"raw"           # 原始字符串（String >= 44 字节）
```

**2. 淘汰策略配置**

```bash
# redis.conf 配置

maxmemory 4gb                       # 最大内存限制（必须设置）
maxmemory-policy allkeys-lru        # 淘汰策略

# 淘汰策略选项：
# noeviction：不淘汰，内存满时返回错误（默认，不推荐）
# allkeys-lru：所有 key 中淘汰最久未使用（推荐缓存场景）
# allkeys-lfu：所有 key 中淘汰最少使用（Redis 4.0+，更精准）
# allkeys-random：所有 key 中随机淘汰
# volatile-lru：有 TTL 的 key 中淘汰最久未使用
# volatile-lfu：有 TTL 的 key 中淘汰最少使用
# volatile-random：有 TTL 的 key 中随机淘汰
# volatile-ttl：淘汰最早过期的 key

maxmemory-samples 5                 # LRU/LFU 采样数（越大越精确，越慢）

# LFU 参数（Redis 4.0+）
lfu-log-factor 10                   # 访问频率对数增长因子
lfu-decay-time 1                    # 频率衰减时间（分钟）
```

**3. 内存碎片整理配置**

```bash
# redis.conf 配置（Redis 4.0+）

activedefrag yes                    # 启用主动碎片整理
active-defrag-ignore-bytes 100mb    # 碎片 < 100MB 不整理
active-defrag-threshold-lower 10    # 碎片率 < 10% 不整理
active-defrag-threshold-upper 100   # 碎片率 > 100% 强制整理
active-defrag-cycle-min 1           # 最小 CPU 占用百分比
active-defrag-cycle-max 25          # 最大 CPU 占用百分比
```

**查看内存碎片率**

```bash
redis-cli> INFO memory

# 关键指标：
used_memory:4194304000              # 已使用内存（4GB）
used_memory_rss:5242880000          # 物理内存占用（5GB）
mem_fragmentation_ratio:1.25        # 碎片率 = used_memory_rss / used_memory

# 碎片率分析：
# 1.0-1.5：正常范围
# > 1.5：碎片较多，需整理
# < 1.0：使用了 swap（严重问题，检查系统内存）
```

**手动触发碎片整理**

```bash
redis-cli> MEMORY PURGE             # 手动触发碎片整理
```

**4. Key 设计优化**

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# ❌ 不推荐：Key 名过长
r.set('application:user:profile:information:user_id:1000', 'Alice')

# ✅ 推荐：缩短 Key 名（节省 50% 内存）
r.set('app:u:p:1000', 'Alice')

# ❌ 不推荐：大量小 String key（元数据开销大）
for i in range(1000):
    r.set(f'user:1000:field_{i}', f'value_{i}')
# 每个 key 约 90 字节元数据，1000 个 key = 90KB 元数据开销

# ✅ 推荐：合并为 Hash（共享元数据）
user_data = {f'field_{i}': f'value_{i}' for i in range(1000)}
r.hset('user:1000', mapping=user_data)
# 只有 1 个 key，元数据开销仅 90 字节

# 内存对比
print(f"❌ 1000 个 String key 内存：{r.memory_usage('user:1000:field_0') * 1000 / 1024:.2f} KB")
print(f"✅ 1 个 Hash 内存：{r.memory_usage('user:1000') / 1024:.2f} KB")
```

**Key 命名规范**

```bash
# ❌ 不推荐
application:user:profile:information:1000    # 太长
u1000                                        # 不清晰
user_profile_1000                            # 不使用冒号分隔

# ✅ 推荐
app:u:p:1000                                 # 简短清晰
u:p:1000                                     # 更简短
user:1000:profile                            # 清晰分层
```

**5. 内存监控脚本**

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

def analyze_memory():
    """
    分析 Redis 内存使用情况
    """
    info = r.info('memory')

    used_memory = info['used_memory']
    used_memory_rss = info['used_memory_rss']
    mem_fragmentation_ratio = info['mem_fragmentation_ratio']
    maxmemory = info['maxmemory']

    print("📊 Redis 内存分析报告")
    print("=" * 60)
    print(f"已使用内存：{used_memory / 1024 / 1024:.2f} MB")
    print(f"物理内存占用：{used_memory_rss / 1024 / 1024:.2f} MB")
    print(f"最大内存限制：{maxmemory / 1024 / 1024:.2f} MB" if maxmemory > 0 else "无限制（⚠️ 建议设置）")
    print(f"内存使用率：{used_memory / maxmemory * 100:.2f}%" if maxmemory > 0 else "N/A")
    print(f"内存碎片率：{mem_fragmentation_ratio:.2f}")

    if mem_fragmentation_ratio > 1.5:
        print("⚠️ 内存碎片率过高，建议执行 MEMORY PURGE")
    elif mem_fragmentation_ratio < 1.0:
        print("🚨 内存碎片率 < 1.0，可能使用了 swap，检查系统内存")
    else:
        print("✅ 内存碎片率正常")

    # 统计各类型 key 数量
    print("\n📈 Key 统计：")
    key_count = r.dbsize()
    print(f"总 key 数量：{key_count}")

    # 统计编码类型（采样 100 个 key）
    encoding_stats = {}
    cursor = 0
    sample_count = 0

    while sample_count < 100:
        cursor, keys = r.scan(cursor, count=10)
        for key in keys:
            encoding = r.object('encoding', key)
            encoding_stats[encoding] = encoding_stats.get(encoding, 0) + 1
            sample_count += 1
            if sample_count >= 100:
                break
        if cursor == 0:
            break

    print("\n📦 编码类型分布（采样 100 个）：")
    for encoding, count in sorted(encoding_stats.items(), key=lambda x: x[1], reverse=True):
        print(f"  {encoding}: {count} 个")

# 使用示例
analyze_memory()
```

**6. 内存优化最佳实践**

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# 1. 使用 Hash 代替多个 String（节省元数据）
def optimize_user_storage():
    """
    优化用户数据存储
    """
    user_id = 1000

    # ❌ 方式 1：多个 String key（元数据开销大）
    # r.set(f'user:{user_id}:name', 'Alice')
    # r.set(f'user:{user_id}:age', 25)
    # r.set(f'user:{user_id}:email', 'alice@example.com')

    # ✅ 方式 2：单个 Hash（共享元数据）
    r.hset(f'u:{user_id}', mapping={
        'name': 'Alice',
        'age': 25,
        'email': 'alice@example.com'
    })

# 2. 设置合理的过期时间
def set_with_ttl():
    """
    为数据设置过期时间
    """
    # 缓存用户信息（1 小时）
    r.setex('cache:user:1000', 3600, 'user_data')

    # 会话 token（30 分钟）
    r.setex('session:token:abc123', 1800, 'session_data')

    # 验证码（5 分钟）
    r.setex('captcha:123456', 300, 'verify_code')

# 3. 定期清理过期 key
def cleanup_expired_keys():
    """
    定期清理过期 key（Redis 会自动清理，这里是主动触发）
    """
    # Redis 默认每秒检查 10 次，每次随机检查 20 个 key
    # 可以通过 hz 参数调整频率（默认 10）
    info = r.info('stats')
    expired_keys = info['expired_keys']
    print(f"✅ 已清理过期 key 数量：{expired_keys}")

# 4. 监控并告警
def memory_alert():
    """
    内存监控与告警
    """
    info = r.info('memory')
    used_memory = info['used_memory']
    maxmemory = info['maxmemory']

    if maxmemory > 0:
        usage_rate = used_memory / maxmemory

        if usage_rate > 0.9:
            print("🚨 高危告警：内存使用率 > 90%，请立即扩容或清理")
        elif usage_rate > 0.8:
            print("⚠️ 警告：内存使用率 > 80%，请关注")
        elif usage_rate > 0.7:
            print("⚠️ 提醒：内存使用率 > 70%")
        else:
            print("✅ 内存使用率正常")

# 使用示例
optimize_user_storage()
set_with_ttl()
memory_alert()
```

**7. 内存优化效果对比**

| 优化项 | 优化前 | 优化后 | 节省比例 |
|-------|--------|--------|---------|
| **Key 命名** | `application:user:profile:1000` (32 字节) | `u:p:1000` (8 字节) | 75% |
| **数据结构** | 1000 个 String | 1 个 Hash | 50%-70% |
| **编码优化** | hashtable | ziplist/intset | 50%-80% |
| **过期清理** | 永久保存 | TTL 1 小时 | 自动回收 |

#### 关键要点

1. **优先级**：数据结构优化 > Key 设计 > 淘汰策略 > 碎片整理 > 持久化优化
2. **数据结构选择**：
   - 小数据量（< 512 元素）优先使用压缩编码（ziplist/intset）
   - 多个小 String → 合并为 Hash
   - 大集合分批读取（SCAN 系列命令）
3. **监控指标**：
   - `used_memory`：实际使用内存
   - `mem_fragmentation_ratio`：碎片率（1.0-1.5 正常）
   - `maxmemory`：最大内存限制（必须设置）
   - `evicted_keys`：淘汰 key 数量
4. **淘汰策略**：
   - 纯缓存 → `allkeys-lru` 或 `allkeys-lfu`
   - 部分缓存 + 部分持久 → `volatile-lru`
   - 不允许淘汰 → `noeviction`（需保证内存充足）
5. **定期巡检**：
   - 每周检查内存使用率和碎片率
   - 每月分析 key 数量和大 key
   - 每季度评估淘汰策略有效性

#### 记忆口诀

> **内存优化五方向，结构淘汰碎片 Key 持久**
> 压缩编码省一半，Hash 合并减元数
> 淘汰策略选 LRU，碎片整理防浪费
> Key 命名要简短，过期时间必设置
> 监控指标常检查，内存优化保性能
