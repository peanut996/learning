# Redis 面试题

## 基础概念

### 1. 什么是 Redis？Redis 的特点是什么？

**核心答案**：Redis（Remote Dictionary Server）是一个开源的高性能键值对（key-value）内存数据库，支持多种数据结构，常用于缓存、消息队列、分布式锁等场景。

**详细说明**：

**Redis 的定义**：
- **名称**：Remote Dictionary Server（远程字典服务器）
- **类型**：NoSQL 键值对数据库
- **存储**：主要基于内存存储
- **开源**：BSD 协议，由 Salvatore Sanfilippo 创建

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis 核心特点</text>
<rect x="50" y="60" width="220" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="160" y="90" text-anchor="middle" font-size="13" font-weight="bold">1️⃣ 高性能</text>
<text x="70" y="120" font-size="10">• 基于内存存储</text>
<text x="70" y="140" font-size="10">• 读：110000 次/秒</text>
<text x="70" y="160" font-size="10">• 写：81000 次/秒</text>
<text x="70" y="180" font-size="10">• 单线程模型</text>
<text x="70" y="200" font-size="10">• IO 多路复用</text>
<text x="70" y="225" font-size="10" fill="#1976d2" font-weight="bold">✓ 性能极高</text>
<rect x="290" y="60" width="220" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="90" text-anchor="middle" font-size="13" font-weight="bold">2️⃣ 丰富的数据类型</text>
<text x="310" y="120" font-size="10">• String（字符串）</text>
<text x="310" y="140" font-size="10">• List（列表）</text>
<text x="310" y="160" font-size="10">• Hash（哈希）</text>
<text x="310" y="180" font-size="10">• Set（集合）</text>
<text x="310" y="200" font-size="10">• ZSet（有序集合）</text>
<text x="310" y="225" font-size="10" fill="#388e3c" font-weight="bold">✓ 功能强大</text>
<rect x="530" y="60" width="220" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="640" y="90" text-anchor="middle" font-size="13" font-weight="bold">3️⃣ 持久化</text>
<text x="550" y="120" font-size="10">• RDB 快照</text>
<text x="550" y="140" font-size="10">• AOF 日志</text>
<text x="550" y="160" font-size="10">• 混合持久化</text>
<text x="550" y="180" font-size="10">• 数据不丢失</text>
<text x="550" y="200" font-size="10">• 灾难恢复</text>
<text x="550" y="225" font-size="10" fill="#f57c00" font-weight="bold">✓ 数据安全</text>
<rect x="50" y="260" width="220" height="180" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="160" y="290" text-anchor="middle" font-size="13" font-weight="bold">4️⃣ 原子操作</text>
<text x="70" y="320" font-size="10">• 所有操作原子性</text>
<text x="70" y="340" font-size="10">• 支持事务</text>
<text x="70" y="360" font-size="10">• Lua 脚本</text>
<text x="70" y="380" font-size="10">• CAS 操作</text>
<text x="70" y="400" font-size="10">• WATCH 乐观锁</text>
<text x="70" y="425" font-size="10" fill="#7b1fa2" font-weight="bold">✓ 线程安全</text>
<rect x="290" y="260" width="220" height="180" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="400" y="290" text-anchor="middle" font-size="13" font-weight="bold">5️⃣ 高可用</text>
<text x="310" y="320" font-size="10">• 主从复制</text>
<text x="310" y="340" font-size="10">• 哨兵模式</text>
<text x="310" y="360" font-size="10">• 集群模式</text>
<text x="310" y="380" font-size="10">• 自动故障转移</text>
<text x="310" y="400" font-size="10">• 读写分离</text>
<text x="310" y="425" font-size="10" fill="#c2185b" font-weight="bold">✓ 稳定可靠</text>
<rect x="530" y="260" width="220" height="180" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="640" y="290" text-anchor="middle" font-size="13" font-weight="bold">6️⃣ 多种特性</text>
<text x="550" y="320" font-size="10">• 发布订阅</text>
<text x="550" y="340" font-size="10">• 过期策略</text>
<text x="550" y="360" font-size="10">• 分布式锁</text>
<text x="550" y="380" font-size="10">• 消息队列</text>
<text x="550" y="400" font-size="10">• 地理位置</text>
<text x="550" y="425" font-size="10" fill="#00796b" font-weight="bold">✓ 应用广泛</text>
</svg>

**Redis 的六大特点**：

**1. 高性能**：
- **内存存储**：数据存储在内存中，读写速度极快
- **性能指标**：读 110000 次/秒，写 81000 次/秒
- **单线程**：避免线程切换和锁竞争开销
- **IO 多路复用**：高效处理并发连接

**2. 丰富的数据类型**：
- **基本类型**：String、List、Hash、Set、ZSet
- **高级类型**：Bitmap、HyperLogLog、GEO、Stream
- **灵活使用**：不同场景选择合适的数据结构

**3. 持久化机制**：
- **RDB**：快照持久化，适合备份
- **AOF**：日志持久化，数据更安全
- **混合持久化**：结合 RDB 和 AOF 优点

**4. 原子操作**：
- 所有单个命令都是原子性的
- 支持事务（MULTI/EXEC）
- Lua 脚本保证原子性
- WATCH 命令实现乐观锁

**5. 高可用**：
- **主从复制**：数据备份，读写分离
- **哨兵模式**：自动故障转移
- **集群模式**：数据分片，水平扩展

**6. 多种特性**：
- **发布订阅**：消息通信
- **过期策略**：自动清理过期数据
- **分布式锁**：跨进程同步
- **Lua 脚本**：复杂逻辑原子执行

**Redis 的应用优势**：

| 优势 | 说明 | 适用场景 |
|-----|------|---------|
| **速度快** | 内存操作，性能极高 | 缓存、实时统计 |
| **数据结构丰富** | 5+ 种数据类型 | 多种业务场景 |
| **简单易用** | 命令简单，API 友好 | 快速开发 |
| **支持持久化** | RDB + AOF | 数据安全 |
| **原子性** | 单命令原子性 | 计数器、锁 |
| **高可用** | 集群、哨兵 | 生产环境 |

**关键要点**：
- ✓ **定义**：高性能键值对内存数据库
- ✓ **核心优势**：快速、丰富、可靠
- ✓ **六大特点**：性能、数据类型、持久化、原子性、高可用、多特性
- ✓ **应用广泛**：缓存、队列、锁、计数器、排行榜
- ⚠ **内存限制**：受物理内存限制
- ⚠ **单线程**：CPU 密集型操作会阻塞

**记忆口诀**：Redis 远程字典快如飞，内存存储性能高，五种数据类型全，持久原子高可用


### 2. Redis 为什么这么快？

**核心答案**：Redis 快的主要原因是基于内存操作、单线程避免上下文切换、IO 多路复用、高效的数据结构和优化的底层实现。

**详细说明**：

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis 高性能的五大原因</text>
<rect x="50" y="60" width="340" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="220" y="90" text-anchor="middle" font-size="13" font-weight="bold">1️⃣ 纯内存操作</text>
<text x="70" y="120" font-size="11" font-weight="bold">内存 vs 磁盘：</text>
<text x="90" y="145" font-size="10">• 内存读写：100,000+ ops/s</text>
<text x="90" y="165" font-size="10">• 磁盘读写：100-200 ops/s</text>
<text x="90" y="185" font-size="10">• 性能差距：500-1000 倍</text>
<text x="70" y="215" font-size="11" font-weight="bold">内存访问速度：</text>
<text x="90" y="240" font-size="10">• L1 缓存：~1 纳秒</text>
<text x="90" y="260" font-size="10">• 内存：~100 纳秒</text>
<text x="70" y="285" font-size="10" fill="#1976d2" font-weight="bold">✓ 数据存储在内存，访问极快</text>
<rect x="410" y="60" width="340" height="220" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="580" y="90" text-anchor="middle" font-size="13" font-weight="bold">2️⃣ 单线程模型</text>
<text x="430" y="120" font-size="11" font-weight="bold">避免的开销：</text>
<text x="450" y="145" font-size="10">• 线程创建和销毁</text>
<text x="450" y="165" font-size="10">• 线程上下文切换</text>
<text x="450" y="185" font-size="10">• 锁竞争和死锁</text>
<text x="450" y="205" font-size="10">• CPU 缓存失效</text>
<text x="430" y="235" font-size="11" font-weight="bold">单线程优势：</text>
<text x="450" y="260" font-size="10">• 代码简单，易维护</text>
<text x="430" y="285" font-size="10" fill="#388e3c" font-weight="bold">✓ 单线程避免并发开销</text>
<rect x="50" y="300" width="340" height="220" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="220" y="330" text-anchor="middle" font-size="13" font-weight="bold">3️⃣ IO 多路复用</text>
<text x="70" y="360" font-size="11" font-weight="bold">技术实现：</text>
<text x="90" y="385" font-size="10">• Linux：epoll</text>
<text x="90" y="405" font-size="10">• macOS：kqueue</text>
<text x="90" y="425" font-size="10">• Windows：IOCP</text>
<text x="70" y="455" font-size="11" font-weight="bold">优势：</text>
<text x="90" y="480" font-size="10">• 单线程处理多连接</text>
<text x="90" y="500" font-size="10">• 非阻塞 IO</text>
<text x="70" y="525" font-size="10" fill="#f57c00" font-weight="bold">✓ 高效处理并发连接</text>
<rect x="410" y="300" width="340" height="220" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="580" y="330" text-anchor="middle" font-size="13" font-weight="bold">4️⃣ 高效的数据结构</text>
<text x="430" y="360" font-size="11" font-weight="bold">优化的实现：</text>
<text x="450" y="385" font-size="10">• SDS（简单动态字符串）</text>
<text x="450" y="405" font-size="10">• ziplist（压缩列表）</text>
<text x="450" y="425" font-size="10">• skiplist（跳表）</text>
<text x="450" y="445" font-size="10">• intset（整数集合）</text>
<text x="430" y="475" font-size="11" font-weight="bold">特点：</text>
<text x="450" y="500" font-size="10">• 时间复杂度低</text>
<text x="430" y="525" font-size="10" fill="#7b1fa2" font-weight="bold">✓ 底层数据结构高效</text>
</svg>

**Redis 高性能的五大原因**：

**1. 纯内存操作**：
- **存储位置**：所有数据存储在内存中
- **访问速度**：
  - 内存访问：~100 纳秒
  - 磁盘访问：~10 毫秒
  - **速度差距**：100,000 倍
- **性能指标**：
  - 读操作：110,000 次/秒
  - 写操作：81,000 次/秒

**2. 单线程模型**：
- **避免的开销**：
  - 线程创建和销毁的时间开销
  - 线程上下文切换的 CPU 开销
  - 多线程的锁竞争和死锁问题
  - CPU 缓存失效（多核情况下）
- **单线程优势**：
  - 代码实现简单，易维护
  - 不需要各种锁机制
  - 避免上下文切换开销

**为什么单线程还这么快**？
- Redis 的瓶颈不是 CPU，而是**网络 IO 和内存**
- 单线程避免了多线程的各种开销
- 配合 IO 多路复用，可以高效处理大量并发连接

**3. IO 多路复用**：
- **技术选择**：
  - Linux：epoll
  - macOS/BSD：kqueue
  - Windows：select（或 IOCP）
- **工作原理**：
  - 单线程监听多个 socket
  - 有事件发生时才处理
  - 非阻塞 IO，不等待

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">IO 多路复用工作原理</text>
<rect x="50" y="60" width="200" height="260" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="150" y="90" text-anchor="middle" font-size="13" font-weight="bold">Redis 主线程</text>
<rect x="70" y="110" width="160" height="180" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="150" y="135" text-anchor="middle" font-size="11">epoll_wait()</text>
<text x="80" y="160" font-size="10">监听所有连接</text>
<text x="80" y="185" font-size="10">有事件才处理</text>
<text x="80" y="210" font-size="10">处理完继续监听</text>
<text x="80" y="250" font-size="10" fill="#388e3c" font-weight="bold">单线程</text>
<text x="80" y="270" font-size="10" fill="#388e3c" font-weight="bold">处理多连接</text>
<rect x="300" y="60" width="450" height="260" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="525" y="90" text-anchor="middle" font-size="13" font-weight="bold">多个客户端连接</text>
<rect x="320" y="110" width="120" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="380" y="145" text-anchor="middle" font-size="10">客户端 1</text>
<rect x="460" y="110" width="120" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="520" y="145" text-anchor="middle" font-size="10">客户端 2</text>
<rect x="600" y="110" width="120" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="660" y="145" text-anchor="middle" font-size="10">客户端 3</text>
<rect x="320" y="190" width="120" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="380" y="225" text-anchor="middle" font-size="10">客户端 N</text>
<path d="M 250 180 L 320 140" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-io)"/>
<path d="M 250 180 L 460 140" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-io)"/>
<path d="M 250 180 L 600 140" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-io)"/>
<path d="M 250 200 L 320 220" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-io)"/>
<text x="320" y="300" font-size="10" fill="#1976d2" font-weight="bold">同时监听多个连接，哪个有事件就处理哪个</text>
<defs>
<marker id="arrow-io" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/>
</marker>
</defs>
</svg>

**4. 高效的数据结构**：

| 数据结构 | 说明 | 时间复杂度 |
|---------|------|-----------|
| **SDS** | 简单动态字符串 | O(1) 获取长度 |
| **ziplist** | 压缩列表，节省内存 | O(N) 但 N 很小 |
| **skiplist** | 跳表，有序集合实现 | O(log N) 查找 |
| **dict** | 哈希表 | O(1) 增删改查 |
| **intset** | 整数集合，节省内存 | O(log N) 查找 |

**5. 简洁的协议**：
- **RESP 协议**：Redis Serialization Protocol
- **特点**：
  - 实现简单
  - 解析速度快
  - 人类可读
  - 支持二进制安全

**性能对比**：

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis vs 传统数据库性能对比</text>
<rect x="50" y="60" width="340" height="200" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="220" y="90" text-anchor="middle" font-size="13" font-weight="bold">Redis</text>
<text x="70" y="120" font-size="11">• QPS：100,000+</text>
<text x="70" y="145" font-size="11">• 延迟：< 1ms</text>
<text x="70" y="170" font-size="11">• 存储：内存</text>
<text x="70" y="195" font-size="11">• 并发：IO 多路复用</text>
<text x="70" y="220" font-size="11">• 线程：单线程</text>
<text x="70" y="245" font-size="11" fill="#388e3c" font-weight="bold">✓ 性能极高</text>
<rect x="410" y="60" width="340" height="200" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="580" y="90" text-anchor="middle" font-size="13" font-weight="bold">传统数据库（MySQL）</text>
<text x="430" y="120" font-size="11">• QPS：1,000-10,000</text>
<text x="430" y="145" font-size="11">• 延迟：10-100ms</text>
<text x="430" y="170" font-size="11">• 存储：磁盘</text>
<text x="430" y="195" font-size="11">• 并发：多线程</text>
<text x="430" y="220" font-size="11">• 线程：多线程池</text>
<text x="430" y="245" font-size="11" fill="#d32f2f">相对较慢</text>
</svg>

**关键要点**：
- ✓ **内存操作**：速度快 100,000 倍
- ✓ **单线程**：避免上下文切换和锁竞争
- ✓ **IO 多路复用**：单线程处理多连接
- ✓ **高效数据结构**：O(1) 或 O(log N) 操作
- ✓ **简洁协议**：RESP 协议解析快
- ⚠ **单线程限制**：CPU 密集型操作会阻塞
- ⚠ **内存限制**：数据量受内存大小限制

**记忆口诀**：内存操作快如飞，单线程模型无竞争，IO 多路复用强，数据结构高效优，协议简洁易解析


### 3. Redis 是单线程还是多线程？

**核心答案**：Redis 的核心网络模型是单线程的，但从 Redis 4.0 开始引入了多线程来处理一些后台任务，Redis 6.0 引入了多线程 IO。

**详细说明**：

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis 线程模型演进</text>
<rect x="50" y="60" width="220" height="320" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="160" y="90" text-anchor="middle" font-size="13" font-weight="bold">Redis 3.x 及之前</text>
<text x="70" y="120" font-size="11" font-weight="bold">完全单线程</text>
<text x="70" y="145" font-size="10">• 网络 IO：单线程</text>
<text x="70" y="165" font-size="10">• 命令执行：单线程</text>
<text x="70" y="185" font-size="10">• 持久化：单线程</text>
<text x="70" y="210" font-size="11" font-weight="bold">优点：</text>
<text x="70" y="230" font-size="10">✓ 实现简单</text>
<text x="70" y="250" font-size="10">✓ 无锁竞争</text>
<text x="70" y="275" font-size="11" font-weight="bold">缺点：</text>
<text x="70" y="295" font-size="10">✗ 持久化阻塞主线程</text>
<text x="70" y="315" font-size="10">✗ 大数据删除阻塞</text>
<text x="70" y="360" font-size="10" fill="#1976d2" font-weight="bold">单线程模型</text>
<rect x="290" y="60" width="220" height="320" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="90" text-anchor="middle" font-size="13" font-weight="bold">Redis 4.0 - 5.0</text>
<text x="310" y="120" font-size="11" font-weight="bold">引入后台线程</text>
<text x="310" y="145" font-size="10">• 网络 IO：单线程</text>
<text x="310" y="165" font-size="10">• 命令执行：单线程</text>
<text x="310" y="185" font-size="10">• 后台任务：多线程</text>
<text x="310" y="210" font-size="11" font-weight="bold">后台线程处理：</text>
<text x="310" y="230" font-size="10">• UNLINK 异步删除</text>
<text x="310" y="250" font-size="10">• FLUSHALL ASYNC</text>
<text x="310" y="270" font-size="10">• AOF 重写</text>
<text x="310" y="290" font-size="10">• RDB 持久化</text>
<text x="310" y="320" font-size="10" fill="#388e3c" font-weight="bold">✓ 避免阻塞主线程</text>
<text x="310" y="360" font-size="10" fill="#388e3c" font-weight="bold">混合模型</text>
<rect x="530" y="60" width="220" height="320" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="640" y="90" text-anchor="middle" font-size="13" font-weight="bold">Redis 6.0+</text>
<text x="550" y="120" font-size="11" font-weight="bold">多线程 IO</text>
<text x="550" y="145" font-size="10">• 网络 IO：多线程</text>
<text x="550" y="165" font-size="10">• 命令执行：单线程</text>
<text x="550" y="185" font-size="10">• 后台任务：多线程</text>
<text x="550" y="210" font-size="11" font-weight="bold">多线程 IO：</text>
<text x="550" y="230" font-size="10">• 读取 socket 数据</text>
<text x="550" y="250" font-size="10">• 解析请求</text>
<text x="550" y="270" font-size="10">• 写回响应</text>
<text x="550" y="295" font-size="11" font-weight="bold">命令执行仍单线程</text>
<text x="550" y="320" font-size="10" fill="#f57c00" font-weight="bold">✓ 提高 IO 性能</text>
<text x="550" y="340" font-size="10" fill="#f57c00" font-weight="bold">✓ 保持单线程优势</text>
<text x="550" y="360" font-size="10" fill="#f57c00" font-weight="bold">最佳方案</text>
</svg>

**Redis 的线程模型**：

**1. 核心执行是单线程**：
- **命令执行**：所有命令在单线程中顺序执行
- **数据操作**：读写数据在单线程中完成
- **原子性保证**：单线程天然保证命令的原子性
- **为什么单线程**：
  - Redis 的瓶颈是内存和网络 IO，不是 CPU
  - 避免多线程的锁竞争和上下文切换
  - 代码实现简单，易维护

**2. Redis 4.0 引入后台线程**：

| 功能 | 处理线程 | 说明 |
|-----|---------|------|
| **异步删除** | 后台线程 | UNLINK 命令 |
| **异步清空** | 后台线程 | FLUSHALL/FLUSHDB ASYNC |
| **AOF 重写** | 后台线程 | 避免阻塞主线程 |
| **RDB 持久化** | 后台线程 | fork 子进程 |

**3. Redis 6.0 多线程 IO**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis 6.0 多线程 IO 模型</text>
<rect x="50" y="60" width="180" height="300" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="90" text-anchor="middle" font-size="12" font-weight="bold">IO 线程池</text>
<rect x="70" y="110" width="140" height="50" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="140" text-anchor="middle" font-size="10">IO 线程 1</text>
<rect x="70" y="170" width="140" height="50" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="200" text-anchor="middle" font-size="10">IO 线程 2</text>
<rect x="70" y="230" width="140" height="50" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="260" text-anchor="middle" font-size="10">IO 线程 N</text>
<text x="70" y="310" font-size="10">读取请求</text>
<text x="70" y="330" font-size="10">解析协议</text>
<text x="70" y="350" font-size="10">写回响应</text>
<rect x="270" y="60" width="200" height="300" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="370" y="90" text-anchor="middle" font-size="12" font-weight="bold">主线程</text>
<rect x="290" y="110" width="160" height="230" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="370" y="140" text-anchor="middle" font-size="11" font-weight="bold">命令执行</text>
<text x="300" y="170" font-size="10">1. 接收已解析的命令</text>
<text x="300" y="195" font-size="10">2. 单线程执行</text>
<text x="300" y="220" font-size="10">3. 生成响应</text>
<text x="300" y="245" font-size="10">4. 交给 IO 线程发送</text>
<text x="300" y="280" font-size="10" fill="#388e3c" font-weight="bold">✓ 保证原子性</text>
<text x="300" y="300" font-size="10" fill="#388e3c" font-weight="bold">✓ 无需加锁</text>
<text x="300" y="320" font-size="10" fill="#388e3c" font-weight="bold">✓ 顺序执行</text>
<rect x="510" y="60" width="240" height="300" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="630" y="90" text-anchor="middle" font-size="12" font-weight="bold">客户端连接</text>
<rect x="530" y="110" width="200" height="50" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="630" y="140" text-anchor="middle" font-size="10">客户端 1</text>
<rect x="530" y="170" width="200" height="50" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="630" y="200" text-anchor="middle" font-size="10">客户端 2</text>
<rect x="530" y="230" width="200" height="50" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="630" y="260" text-anchor="middle" font-size="10">客户端 N</text>
<text x="530" y="310" font-size="10">发送命令</text>
<text x="530" y="330" font-size="10">等待响应</text>
<path d="M 230 185 L 270 185" stroke="#666" stroke-width="2" marker-end="url(#arrow-thread)"/>
<path d="M 470 185 L 510 185" stroke="#666" stroke-width="2" marker-end="url(#arrow-thread)"/>
<text x="240" y="180" font-size="9">已解析命令</text>
<text x="475" y="180" font-size="9">响应数据</text>
<defs>
<marker id="arrow-thread" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**多线程 IO 的工作流程**：
1. **IO 线程读取**：多个 IO 线程并发读取 socket 数据
2. **IO 线程解析**：解析 RESP 协议请求
3. **主线程执行**：主线程单线程执行命令（保证原子性）
4. **IO 线程写回**：多个 IO 线程并发写回响应

**配置多线程 IO**：
```bash
# redis.conf 配置
io-threads 4              # IO 线程数量（建议与 CPU 核心数相同）
io-threads-do-reads yes   # 启用多线程读取
```

**单线程 vs 多线程对比**：

| 特性 | 单线程（命令执行） | 多线程（IO） |
|-----|------------------|--------------|
| **原子性** | ✓ 天然保证 | ✗ 需要加锁 |
| **实现复杂度** | ✓ 简单 | ✗ 复杂 |
| **性能** | 中等 | ✓ 高（高并发） |
| **锁竞争** | ✓ 无锁 | ✗ 可能有锁 |
| **适用场景** | 命令执行 | 网络 IO |

**为什么命令执行仍然单线程**？
1. **保证原子性**：单线程天然保证命令的原子性
2. **避免锁竞争**：不需要复杂的锁机制
3. **简化实现**：代码逻辑简单，易于维护
4. **CPU 不是瓶颈**：Redis 的瓶颈是内存和网络，不是 CPU

**关键要点**：
- ✓ **命令执行**：单线程，保证原子性
- ✓ **后台任务**：多线程（4.0+），避免阻塞
- ✓ **网络 IO**：多线程（6.0+），提高并发
- ✓ **最佳实践**：核心单线程 + 辅助多线程
- ⚠ **配置建议**：io-threads 设置为 CPU 核心数
- ⚠ **单机瓶颈**：超高并发建议使用集群

**记忆口诀**：命令执行单线程保原子，后台任务多线程不阻塞，IO 多线程提并发，核心单线程是关键


### 4. Redis 支持哪些数据类型？

**核心答案**：Redis 支持 5 种基本数据类型（String、List、Hash、Set、ZSet）和 5 种高级数据类型（Bitmap、HyperLogLog、GEO、Stream、Bitfield）。

**详细说明**：

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis 数据类型全景图</text>
<rect x="30" y="60" width="390" height="240" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="225" y="90" text-anchor="middle" font-size="14" font-weight="bold">五种基本数据类型</text>
<rect x="50" y="110" width="170" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="135" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ String 字符串</text>
<text x="60" y="160" font-size="10">• 最基础的类型</text>
<text x="60" y="180" font-size="10">• 可存储：字符串、数字</text>
<text x="60" y="200" font-size="10">• 最大：512MB</text>
<text x="60" y="220" font-size="10">• 场景：缓存、计数器</text>
<text x="60" y="245" font-size="10">• 命令：SET、GET、INCR</text>
<text x="60" y="265" font-size="10" fill="#1976d2" font-weight="bold">✓ 最常用</text>
<rect x="240" y="110" width="170" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="325" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ List 列表</text>
<text x="250" y="160" font-size="10">• 有序的字符串列表</text>
<text x="250" y="180" font-size="10">• 底层：链表/ziplist</text>
<text x="250" y="200" font-size="10">• 支持：头尾操作</text>
<text x="250" y="220" font-size="10">• 场景：消息队列</text>
<text x="250" y="245" font-size="10">• 命令：LPUSH、RPOP</text>
<text x="250" y="265" font-size="10" fill="#388e3c" font-weight="bold">✓ 队列神器</text>
<rect x="430" y="60" width="390" height="240" fill="#e8f5e9" stroke="#388e3c" stroke-width="3" rx="5"/>
<text x="625" y="90" text-anchor="middle" font-size="14" font-weight="bold">基本类型（续）</text>
<rect x="450" y="110" width="110" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="505" y="130" text-anchor="middle" font-size="11" font-weight="bold">3️⃣ Hash</text>
<text x="455" y="150" font-size="9">• 键值对集合</text>
<text x="455" y="168" font-size="9">• 类似：Java Map</text>
<text x="455" y="186" font-size="9">• 场景：对象存储</text>
<text x="455" y="204" font-size="9">• 命令：HSET</text>
<text x="455" y="230" font-size="9" fill="#f57c00" font-weight="bold">✓ 对象神器</text>
<rect x="575" y="110" width="110" height="170" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="630" y="130" text-anchor="middle" font-size="11" font-weight="bold">4️⃣ Set</text>
<text x="580" y="150" font-size="9">• 无序不重复</text>
<text x="580" y="168" font-size="9">• 支持：集合运算</text>
<text x="580" y="186" font-size="9">• 场景：标签、好友</text>
<text x="580" y="204" font-size="9">• 命令：SADD</text>
<text x="580" y="230" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 去重神器</text>
<rect x="700" y="110" width="110" height="170" fill="#fff" stroke="#c2185b" stroke-width="1" rx="3"/>
<text x="755" y="130" text-anchor="middle" font-size="11" font-weight="bold">5️⃣ ZSet</text>
<text x="705" y="150" font-size="9">• 有序集合</text>
<text x="705" y="168" font-size="9">• 每个成员有分数</text>
<text x="705" y="186" font-size="9">• 场景：排行榜</text>
<text x="705" y="204" font-size="9">• 命令：ZADD</text>
<text x="705" y="230" font-size="9" fill="#c2185b" font-weight="bold">✓ 排序神器</text>
<rect x="30" y="320" width="790" height="250" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="350" text-anchor="middle" font-size="14" font-weight="bold">五种高级数据类型（特殊用途）</text>
<rect x="50" y="370" width="150" height="180" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="125" y="395" text-anchor="middle" font-size="11" font-weight="bold">Bitmap 位图</text>
<text x="60" y="420" font-size="9">• 位数组</text>
<text x="60" y="438" font-size="9">• 节省空间</text>
<text x="60" y="456" font-size="9">• 场景：签到、在线状态</text>
<text x="60" y="474" font-size="9">• 命令：SETBIT、GETBIT</text>
<text x="60" y="500" font-size="9">• 1亿用户仅需12MB</text>
<text x="60" y="530" font-size="9" fill="#f57c00" font-weight="bold">✓ 节省内存</text>
<rect x="215" y="370" width="150" height="180" fill="#fff" stroke="#00796b" stroke-width="1" rx="3"/>
<text x="290" y="395" text-anchor="middle" font-size="11" font-weight="bold">HyperLogLog</text>
<text x="225" y="420" font-size="9">• 基数统计</text>
<text x="225" y="438" font-size="9">• 极省内存（12KB）</text>
<text x="225" y="456" font-size="9">• 场景：UV统计</text>
<text x="225" y="474" font-size="9">• 命令：PFADD</text>
<text x="225" y="500" font-size="9">• 误差率：0.81%</text>
<text x="225" y="530" font-size="9" fill="#00796b" font-weight="bold">✓ 去重计数</text>
<rect x="380" y="370" width="150" height="180" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="455" y="395" text-anchor="middle" font-size="11" font-weight="bold">GEO 地理位置</text>
<text x="390" y="420" font-size="9">• 经纬度存储</text>
<text x="390" y="438" font-size="9">• 底层：ZSet</text>
<text x="390" y="456" font-size="9">• 场景：附近的人</text>
<text x="390" y="474" font-size="9">• 命令：GEOADD</text>
<text x="390" y="500" font-size="9">• 支持：距离计算</text>
<text x="390" y="530" font-size="9" fill="#1976d2" font-weight="bold">✓ 地理应用</text>
<rect x="545" y="370" width="130" height="180" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="610" y="395" text-anchor="middle" font-size="11" font-weight="bold">Stream</text>
<text x="555" y="420" font-size="9">• 消息队列</text>
<text x="555" y="438" font-size="9">• 持久化</text>
<text x="555" y="456" font-size="9">• 消费者组</text>
<text x="555" y="474" font-size="9">• 5.0+ 版本</text>
<text x="555" y="500" font-size="9">• 命令：XADD</text>
<text x="555" y="530" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 专业MQ</text>
<rect x="690" y="370" width="120" height="180" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="750" y="395" text-anchor="middle" font-size="11" font-weight="bold">Bitfield</text>
<text x="700" y="420" font-size="9">• 位域操作</text>
<text x="700" y="438" font-size="9">• 自定义位</text>
<text x="700" y="456" font-size="9">• 场景：复杂</text>
<text x="700" y="474" font-size="9">  位运算</text>
<text x="700" y="500" font-size="9">• 高级用法</text>
<text x="700" y="530" font-size="9" fill="#388e3c" font-weight="bold">✓ 灵活强大</text>
</svg>

**五种基本数据类型**：

**1. String（字符串）**：
- **特点**：最基础、最常用的类型
- **存储内容**：
  - 字符串（文本、JSON、XML）
  - 数字（整数、浮点数）
  - 二进制数据（图片、序列化对象）
- **最大大小**：512MB
- **常用命令**：
  ```bash
  SET key value        # 设置值
  GET key             # 获取值
  INCR key            # 自增
  DECR key            # 自减
  APPEND key value    # 追加
  STRLEN key          # 获取长度
  ```
- **应用场景**：
  - 缓存（session、页面缓存）
  - 计数器（点赞数、访问量）
  - 分布式锁
  - 限流

**2. List（列表）**：
- **特点**：有序的字符串列表
- **底层实现**：
  - 元素少：ziplist（压缩列表）
  - 元素多：linkedlist（双向链表）或 quicklist
- **常用命令**：
  ```bash
  LPUSH key value     # 左侧插入
  RPUSH key value     # 右侧插入
  LPOP key            # 左侧弹出
  RPOP key            # 右侧弹出
  LRANGE key 0 -1     # 获取所有元素
  LLEN key            # 获取长度
  ```
- **应用场景**：
  - 消息队列（生产者-消费者）
  - 最新动态（朋友圈、微博）
  - 栈和队列

**3. Hash（哈希）**：
- **特点**：键值对集合，类似 Java 的 HashMap
- **适合存储对象**
- **常用命令**：
  ```bash
  HSET key field value    # 设置字段
  HGET key field          # 获取字段
  HMSET key f1 v1 f2 v2   # 批量设置
  HGETALL key             # 获取所有字段
  HDEL key field          # 删除字段
  HLEN key                # 字段数量
  ```
- **应用场景**：
  - 存储对象（用户信息、商品信息）
  - 购物车

**4. Set（集合）**：
- **特点**：无序、不重复的字符串集合
- **支持集合运算**：交集、并集、差集
- **常用命令**：
  ```bash
  SADD key member         # 添加元素
  SREM key member         # 删除元素
  SMEMBERS key            # 获取所有元素
  SISMEMBER key member    # 判断是否存在
  SINTER key1 key2        # 交集
  SUNION key1 key2        # 并集
  SDIFF key1 key2         # 差集
  ```
- **应用场景**：
  - 标签系统（文章标签）
  - 共同好友
  - 去重（抽奖）

**5. ZSet（有序集合）**：
- **特点**：有序、不重复，每个元素关联一个分数（score）
- **按分数排序**
- **常用命令**：
  ```bash
  ZADD key score member   # 添加元素
  ZREM key member         # 删除元素
  ZSCORE key member       # 获取分数
  ZRANGE key 0 -1         # 按分数升序
  ZREVRANGE key 0 -1      # 按分数降序
  ZRANK key member        # 获取排名
  ```
- **应用场景**：
  - 排行榜（游戏、销量）
  - 延迟队列（按时间排序）
  - 优先级队列

**五种高级数据类型**：

**1. Bitmap（位图）**：
- **本质**：String 类型的扩展
- **特点**：每个 bit 代表一个状态（0 或 1）
- **极省内存**：1 亿用户签到仅需 12MB
- **应用场景**：
  - 用户签到
  - 在线状态
  - 布隆过滤器

**2. HyperLogLog**：
- **特点**：基数统计（统计不重复元素个数）
- **内存占用**：固定 12KB
- **误差率**：0.81%
- **应用场景**：
  - UV 统计（独立访客）
  - 大数据去重计数

**3. GEO（地理位置）**：
- **底层**：基于 ZSet 实现
- **特点**：存储经纬度，支持距离计算
- **应用场景**：
  - 附近的人/店铺
  - 打车距离计算
  - 地图应用

**4. Stream（流）**：
- **版本**：Redis 5.0+ 引入
- **特点**：专业的消息队列，支持消费者组
- **应用场景**：
  - 消息队列
  - 事件溯源
  - 日志收集

**5. Bitfield（位域）**：
- **特点**：操作字符串中的任意位
- **应用场景**：
  - 复杂的位运算
  - 自定义数据结构

**数据类型选择建议**：

| 场景 | 推荐类型 | 原因 |
|-----|---------|------|
| **缓存** | String | 简单快速 |
| **计数器** | String（INCR） | 原子操作 |
| **对象存储** | Hash | 结构清晰 |
| **消息队列** | List 或 Stream | 先进先出 |
| **排行榜** | ZSet | 自动排序 |
| **标签/去重** | Set | 自动去重 |
| **签到** | Bitmap | 极省内存 |
| **UV 统计** | HyperLogLog | 固定内存 |
| **LBS** | GEO | 地理计算 |

**关键要点**：
- ✓ **基本类型**：String、List、Hash、Set、ZSet
- ✓ **高级类型**：Bitmap、HyperLogLog、GEO、Stream、Bitfield
- ✓ **选择原则**：根据业务场景选择合适的数据类型
- ✓ **内存优化**：合理使用 Bitmap、HyperLogLog
- ⚠ **不要滥用**：简单场景用简单类型
- ⚠ **大 key 问题**：单个 key 不要存储过多数据

**记忆口诀**：五基本三高级，String List Hash Set ZSet，Bitmap HyperLogLog GEO Stream Bitfield，按需选择最合适


### 5. Redis 的应用场景有哪些？

**核心答案**：Redis 主要应用于缓存、会话存储、排行榜、计数器、消息队列、分布式锁、实时分析等场景。

**详细说明**：

<svg viewBox="0 0 850 700" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis 八大应用场景</text>
<rect x="30" y="60" width="190" height="280" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="90" text-anchor="middle" font-size="13" font-weight="bold">1️⃣ 缓存</text>
<text x="45" y="120" font-size="10" font-weight="bold">最常见场景</text>
<text x="45" y="145" font-size="9">• 页面缓存</text>
<text x="45" y="165" font-size="9">• 对象缓存</text>
<text x="45" y="185" font-size="9">• SQL 查询缓存</text>
<text x="45" y="205" font-size="9">• 热点数据缓存</text>
<text x="45" y="230" font-size="10" font-weight="bold">优势：</text>
<text x="45" y="250" font-size="9">✓ 减轻数据库压力</text>
<text x="45" y="270" font-size="9">✓ 提升响应速度</text>
<text x="45" y="290" font-size="9">✓ 降低成本</text>
<text x="45" y="315" font-size="9" fill="#1976d2" font-weight="bold">数据类型：String、Hash</text>
<rect x="235" y="60" width="190" height="280" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="330" y="90" text-anchor="middle" font-size="13" font-weight="bold">2️⃣ 排行榜</text>
<text x="250" y="120" font-size="10" font-weight="bold">有序排名</text>
<text x="250" y="145" font-size="9">• 游戏排行榜</text>
<text x="250" y="165" font-size="9">• 商品销量排行</text>
<text x="250" y="185" font-size="9">• 热搜榜</text>
<text x="250" y="205" font-size="9">• 实时排名</text>
<text x="250" y="230" font-size="10" font-weight="bold">优势：</text>
<text x="250" y="250" font-size="9">✓ 自动排序</text>
<text x="250" y="270" font-size="9">✓ 快速查询</text>
<text x="250" y="290" font-size="9">✓ 支持范围查询</text>
<text x="250" y="315" font-size="9" fill="#388e3c" font-weight="bold">数据类型：ZSet</text>
<rect x="440" y="60" width="190" height="280" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="535" y="90" text-anchor="middle" font-size="13" font-weight="bold">3️⃣ 计数器</text>
<text x="455" y="120" font-size="10" font-weight="bold">原子计数</text>
<text x="455" y="145" font-size="9">• 点赞数</text>
<text x="455" y="165" font-size="9">• 访问量统计</text>
<text x="455" y="185" font-size="9">• 库存数量</text>
<text x="455" y="205" font-size="9">• 限流计数</text>
<text x="455" y="230" font-size="10" font-weight="bold">优势：</text>
<text x="455" y="250" font-size="9">✓ 原子操作</text>
<text x="455" y="270" font-size="9">✓ 高性能</text>
<text x="455" y="290" font-size="9">✓ 支持自增自减</text>
<text x="455" y="315" font-size="9" fill="#f57c00" font-weight="bold">数据类型：String(INCR)</text>
<rect x="645" y="60" width="190" height="280" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="740" y="90" text-anchor="middle" font-size="13" font-weight="bold">4️⃣ 会话存储</text>
<text x="660" y="120" font-size="10" font-weight="bold">分布式Session</text>
<text x="660" y="145" font-size="9">• 用户登录状态</text>
<text x="660" y="165" font-size="9">• Session 共享</text>
<text x="660" y="185" font-size="9">• Token 存储</text>
<text x="660" y="205" font-size="9">• 购物车</text>
<text x="660" y="230" font-size="10" font-weight="bold">优势：</text>
<text x="660" y="250" font-size="9">✓ 支持过期时间</text>
<text x="660" y="270" font-size="9">✓ 集群共享</text>
<text x="660" y="290" font-size="9">✓ 高可用</text>
<text x="660" y="315" font-size="9" fill="#7b1fa2" font-weight="bold">数据类型：String、Hash</text>
<rect x="30" y="360" width="190" height="280" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="125" y="390" text-anchor="middle" font-size="13" font-weight="bold">5️⃣ 消息队列</text>
<text x="45" y="420" font-size="10" font-weight="bold">异步处理</text>
<text x="45" y="445" font-size="9">• 订单处理</text>
<text x="45" y="465" font-size="9">• 日志收集</text>
<text x="45" y="485" font-size="9">• 邮件发送</text>
<text x="45" y="505" font-size="9">• 异步任务</text>
<text x="45" y="530" font-size="10" font-weight="bold">优势：</text>
<text x="45" y="550" font-size="9">✓ 解耦</text>
<text x="45" y="570" font-size="9">✓ 削峰填谷</text>
<text x="45" y="590" font-size="9">✓ 异步处理</text>
<text x="45" y="615" font-size="9" fill="#c2185b" font-weight="bold">数据类型：List、Stream</text>
<rect x="235" y="360" width="190" height="280" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="330" y="390" text-anchor="middle" font-size="13" font-weight="bold">6️⃣ 分布式锁</text>
<text x="250" y="420" font-size="10" font-weight="bold">跨进程同步</text>
<text x="250" y="445" font-size="9">• 防止重复提交</text>
<text x="250" y="465" font-size="9">• 秒杀库存控制</text>
<text x="250" y="485" font-size="9">• 定时任务互斥</text>
<text x="250" y="505" font-size="9">• 资源竞争</text>
<text x="250" y="530" font-size="10" font-weight="bold">优势：</text>
<text x="250" y="550" font-size="9">✓ 跨服务器</text>
<text x="250" y="570" font-size="9">✓ 原子性</text>
<text x="250" y="590" font-size="9">✓ 支持超时</text>
<text x="250" y="615" font-size="9" fill="#00796b" font-weight="bold">实现：SETNX + 过期时间</text>
<rect x="440" y="360" width="190" height="280" fill="#e1bee7" stroke="#8e24aa" stroke-width="2" rx="5"/>
<text x="535" y="390" text-anchor="middle" font-size="13" font-weight="bold">7️⃣ 实时分析</text>
<text x="455" y="420" font-size="10" font-weight="bold">数据统计</text>
<text x="455" y="445" font-size="9">• UV/PV 统计</text>
<text x="455" y="465" font-size="9">• 在线用户数</text>
<text x="455" y="485" font-size="9">• 活跃用户</text>
<text x="455" y="505" font-size="9">• 实时监控</text>
<text x="455" y="530" font-size="10" font-weight="bold">优势：</text>
<text x="455" y="550" font-size="9">✓ 实时性强</text>
<text x="455" y="570" font-size="9">✓ 高性能</text>
<text x="455" y="590" font-size="9">✓ 省内存</text>
<text x="455" y="615" font-size="9" fill="#8e24aa" font-weight="bold">数据类型：HyperLogLog</text>
<rect x="645" y="360" width="190" height="280" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="740" y="390" text-anchor="middle" font-size="13" font-weight="bold">8️⃣ 社交功能</text>
<text x="660" y="420" font-size="10" font-weight="bold">关系网络</text>
<text x="660" y="445" font-size="9">• 共同好友</text>
<text x="660" y="465" font-size="9">• 关注/粉丝</text>
<text x="660" y="485" font-size="9">• 点赞/收藏</text>
<text x="660" y="505" font-size="9">• 标签系统</text>
<text x="660" y="530" font-size="10" font-weight="bold">优势：</text>
<text x="660" y="550" font-size="9">✓ 集合运算</text>
<text x="660" y="570" font-size="9">✓ 去重</text>
<text x="660" y="590" font-size="9">✓ 快速查询</text>
<text x="660" y="615" font-size="9" fill="#f57f17" font-weight="bold">数据类型：Set</text>
</svg>

**Redis 的八大应用场景**：

**1. 缓存（最常见）**：
- **使用场景**：
  - 页面缓存（整页缓存、片段缓存）
  - 对象缓存（用户信息、商品详情）
  - 数据库查询结果缓存
  - API 响应缓存
- **实现方式**：
  ```bash
  # 缓存用户信息
  SET user:1001 '{"name":"张三","age":25}'
  EXPIRE user:1001 3600  # 过期时间 1 小时

  # 使用 Hash 缓存对象
  HMSET user:1001 name "张三" age 25
  ```
- **优势**：
  - 减少数据库访问，降低数据库压力
  - 提升响应速度（毫秒级）
  - 降低服务器成本
- **数据类型**：String、Hash

**2. 排行榜/排序**：
- **使用场景**：
  - 游戏排行榜（积分排名）
  - 商品销量排行
  - 热搜榜
  - 直播间礼物榜
- **实现方式**：
  ```bash
  # 添加用户分数
  ZADD game:rank 1000 "player1"
  ZADD game:rank 2000 "player2"

  # 获取前 10 名
  ZREVRANGE game:rank 0 9 WITHSCORES

  # 获取用户排名
  ZREVRANK game:rank "player1"
  ```
- **优势**：
  - 自动按分数排序
  - 支持范围查询
  - O(log N) 时间复杂度
- **数据类型**：ZSet

**3. 计数器**：
- **使用场景**：
  - 文章点赞数、阅读量
  - 网站访问量统计
  - 商品库存数量
  - 接口限流计数
- **实现方式**：
  ```bash
  # 文章阅读量自增
  INCR article:1001:views

  # 点赞数自增
  INCR article:1001:likes

  # 限流：1 分钟内最多 100 次
  INCR api:limit:user:1001
  EXPIRE api:limit:user:1001 60
  ```
- **优势**：
  - 原子操作，线程安全
  - 高性能（10 万+ QPS）
  - 支持自增、自减
- **数据类型**：String（INCR/DECR）

**4. 会话存储（Session）**：
- **使用场景**：
  - 分布式 Session 共享
  - 用户登录状态
  - Token 存储
  - 购物车数据
- **实现方式**：
  ```bash
  # 存储 Session
  SET session:abc123 '{"userId":1001,"username":"张三"}'
  EXPIRE session:abc123 1800  # 30 分钟过期

  # 使用 Hash 存储购物车
  HSET cart:1001 product:1 2  # 商品 1 数量 2
  HSET cart:1001 product:2 1
  ```
- **优势**：
  - 支持过期时间
  - 集群环境下共享
  - 高可用
- **数据类型**：String、Hash

**5. 消息队列**：
- **使用场景**：
  - 异步任务处理
  - 订单处理
  - 日志收集
  - 邮件/短信发送
- **实现方式**：
  ```bash
  # 生产者：发送消息
  LPUSH queue:order '{"orderId":1001,"amount":100}'

  # 消费者：接收消息
  BRPOP queue:order 0  # 阻塞式弹出

  # 使用 Stream（推荐）
  XADD stream:order * orderId 1001 amount 100
  XREAD BLOCK 0 STREAMS stream:order $
  ```
- **优势**：
  - 解耦生产者和消费者
  - 削峰填谷
  - 异步处理，提升性能
- **数据类型**：List、Stream（5.0+推荐）

**6. 分布式锁**：
- **使用场景**：
  - 防止重复提交
  - 秒杀活动库存控制
  - 定时任务互斥执行
  - 资源竞争控制
- **实现方式**：
  ```bash
  # 加锁（原子操作）
  SET lock:order:1001 "uuid123" NX EX 10

  # 释放锁（使用 Lua 脚本保证原子性）
  if redis.call("get",KEYS[1]) == ARGV[1] then
      return redis.call("del",KEYS[1])
  else
      return 0
  end
  ```
- **优势**：
  - 跨服务器、跨进程
  - 原子性操作
  - 支持超时自动释放
- **实现方式**：SETNX + 过期时间

**7. 实时分析/统计**：
- **使用场景**：
  - UV（独立访客）统计
  - 在线用户数
  - 日活/月活统计
  - 实时监控数据
- **实现方式**：
  ```bash
  # UV 统计（HyperLogLog）
  PFADD page:index:uv user1 user2 user3
  PFCOUNT page:index:uv  # 获取 UV 数量

  # 在线用户（Bitmap）
  SETBIT online:20250101 1001 1  # 用户 1001 在线
  BITCOUNT online:20250101  # 统计在线人数
  ```
- **优势**：
  - 实时性强
  - 高性能
  - 极省内存（HyperLogLog 仅 12KB）
- **数据类型**：HyperLogLog、Bitmap

**8. 社交功能**：
- **使用场景**：
  - 共同好友
  - 关注/粉丝列表
  - 点赞/收藏功能
  - 文章标签系统
- **实现方式**：
  ```bash
  # 用户 A 的关注列表
  SADD user:A:following user:B user:C

  # 用户 B 的粉丝列表
  SADD user:B:fans user:A

  # 共同好友（交集）
  SINTER user:A:following user:B:following

  # 可能认识的人（差集）
  SDIFF user:B:following user:A:following
  ```
- **优势**：
  - 支持集合运算（交集、并集、差集）
  - 自动去重
  - 快速查询
- **数据类型**：Set

**应用场景选择建议**：

| 场景 | 数据类型 | 关键特性 |
|-----|---------|---------|
| **缓存** | String/Hash | 过期时间 |
| **排行榜** | ZSet | 自动排序 |
| **计数器** | String | INCR 原子性 |
| **Session** | String/Hash | 过期时间 |
| **消息队列** | List/Stream | FIFO |
| **分布式锁** | String | SETNX + EX |
| **UV 统计** | HyperLogLog | 省内存 |
| **社交功能** | Set | 集合运算 |
| **签到** | Bitmap | 极省内存 |
| **地理位置** | GEO | 距离计算 |

**关键要点**：
- ✓ **八大场景**：缓存、排行榜、计数器、Session、MQ、分布式锁、统计、社交
- ✓ **选择原则**：根据业务需求选择合适的数据类型
- ✓ **高频场景**：缓存是最常见的应用
- ✓ **组合使用**：多种数据类型配合使用效果更好
- ⚠ **不是万能**：不适合复杂查询和事务场景
- ⚠ **内存限制**：注意数据量和过期策略

**记忆口诀**：缓存排行计数器，会话队列分布式锁，统计社交八场景，按需选型最合适



## 数据类型

### 6. String 类型的使用场景和常用命令有哪些？

**核心答案**：String 是 Redis 最基础的数据类型，可以存储字符串、数字、二进制数据，常用于缓存、计数器、分布式锁、限流等场景。

**详细说明**：

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">String 类型全景图</text>
<rect x="30" y="60" width="790" height="240" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">String 的四大使用场景</text>
<rect x="50" y="110" width="180" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 缓存</text>
<text x="60" y="160" font-size="10">• 用户信息缓存</text>
<text x="60" y="180" font-size="10">• 商品详情缓存</text>
<text x="60" y="200" font-size="10">• 页面缓存</text>
<text x="60" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="60" y="245" font-size="9" font-family="monospace">SET/GET/SETEX</text>
<text x="60" y="265" font-size="9" fill="#1976d2" font-weight="bold">✓ 最常用场景</text>
<rect x="245" y="110" width="180" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 计数器</text>
<text x="255" y="160" font-size="10">• 文章阅读量</text>
<text x="255" y="180" font-size="10">• 点赞数统计</text>
<text x="255" y="200" font-size="10">• 库存数量</text>
<text x="255" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="255" y="245" font-size="9" font-family="monospace">INCR/DECR/INCRBY</text>
<text x="255" y="265" font-size="9" fill="#388e3c" font-weight="bold">✓ 原子操作</text>
<rect x="440" y="110" width="180" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 分布式锁</text>
<text x="450" y="160" font-size="10">• 防止重复提交</text>
<text x="450" y="180" font-size="10">• 秒杀库存控制</text>
<text x="450" y="200" font-size="10">• 定时任务互斥</text>
<text x="450" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="450" y="245" font-size="9" font-family="monospace">SET NX EX</text>
<text x="450" y="265" font-size="9" fill="#f57c00" font-weight="bold">✓ 高可用</text>
<rect x="635" y="110" width="170" height="170" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 限流</text>
<text x="645" y="160" font-size="10">• API 限流</text>
<text x="645" y="180" font-size="10">• 滑动窗口</text>
<text x="645" y="200" font-size="10">• 令牌桶</text>
<text x="645" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="645" y="245" font-size="9" font-family="monospace">INCR + EXPIRE</text>
<text x="645" y="265" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 高性能</text>
<rect x="30" y="320" width="790" height="300" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="350" text-anchor="middle" font-size="14" font-weight="bold">常用命令详解</text>
<rect x="50" y="370" width="240" height="230" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="395" text-anchor="middle" font-size="11" font-weight="bold">基础操作</text>
<text x="60" y="420" font-size="10" font-family="monospace">SET key value</text>
<text x="60" y="440" font-size="10" font-family="monospace">GET key</text>
<text x="60" y="460" font-size="10" font-family="monospace">DEL key</text>
<text x="60" y="480" font-size="10" font-family="monospace">EXISTS key</text>
<text x="60" y="500" font-size="10" font-family="monospace">APPEND key value</text>
<text x="60" y="520" font-size="10" font-family="monospace">STRLEN key</text>
<text x="60" y="545" font-size="10" font-family="monospace">MSET k1 v1 k2 v2</text>
<text x="60" y="565" font-size="10" font-family="monospace">MGET k1 k2</text>
<rect x="305" y="370" width="240" height="230" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="395" text-anchor="middle" font-size="11" font-weight="bold">数值操作</text>
<text x="315" y="420" font-size="10" font-family="monospace">INCR key</text>
<text x="315" y="440" font-size="10" font-family="monospace">DECR key</text>
<text x="315" y="460" font-size="10" font-family="monospace">INCRBY key 10</text>
<text x="315" y="480" font-size="10" font-family="monospace">DECRBY key 10</text>
<text x="315" y="500" font-size="10" font-family="monospace">INCRBYFLOAT key 2.5</text>
<text x="315" y="530" font-size="9" fill="#388e3c">• 原子操作</text>
<text x="315" y="550" font-size="9" fill="#388e3c">• 自动转换数字</text>
<text x="315" y="570" font-size="9" fill="#388e3c">• 范围：-2^63 ~ 2^63-1</text>
<rect x="560" y="370" width="240" height="230" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="395" text-anchor="middle" font-size="11" font-weight="bold">高级操作</text>
<text x="570" y="420" font-size="10" font-family="monospace">SETEX key 60 value</text>
<text x="570" y="440" font-size="10" font-family="monospace">SETNX key value</text>
<text x="570" y="460" font-size="10" font-family="monospace">GETSET key newvalue</text>
<text x="570" y="480" font-size="10" font-family="monospace">SETRANGE key 0 abc</text>
<text x="570" y="500" font-size="10" font-family="monospace">GETRANGE key 0 10</text>
<text x="570" y="530" font-size="9" fill="#f57c00">• SETEX：设置+过期</text>
<text x="570" y="550" font-size="9" fill="#f57c00">• SETNX：不存在才设置</text>
<text x="570" y="570" font-size="9" fill="#f57c00">• GETSET：获取旧值并设置新值</text>
</svg>

**String 类型的特点**：

1. **最基础类型**：所有其他类型的基础
2. **二进制安全**：可以存储任意数据（图片、序列化对象等）
3. **最大大小**：512MB
4. **底层实现**：SDS（Simple Dynamic String）

**常用命令分类**：

**1. 基础操作**：
```bash
# 设置值
SET user:1001 "张三"
SET user:1001 "李四" EX 3600  # 设置并指定过期时间（秒）
SET user:1001 "王五" PX 3600000  # 过期时间（毫秒）
SETEX user:1001 3600 "赵六"  # 等价于 SET + EX

# 获取值
GET user:1001  # "赵六"

# 删除
DEL user:1001

# 检查存在
EXISTS user:1001  # 0（不存在）或 1（存在）

# 追加字符串
SET msg "Hello"
APPEND msg " World"  # "Hello World"

# 获取长度
STRLEN msg  # 11

# 批量操作
MSET k1 "v1" k2 "v2" k3 "v3"
MGET k1 k2 k3  # ["v1", "v2", "v3"]
```

**2. 数值操作**：
```bash
# 初始化计数器
SET article:1001:views 0

# 自增（+1）
INCR article:1001:views  # 1
INCR article:1001:views  # 2

# 自减（-1）
DECR article:1001:views  # 1

# 增加指定值
INCRBY article:1001:views 10  # 11

# 减少指定值
DECRBY article:1001:views 5  # 6

# 浮点数增加
SET price 10.5
INCRBYFLOAT price 2.3  # 12.8
```

**3. 分布式锁**：
```bash
# 加锁（SET key value NX EX seconds）
SET lock:order:1001 "uuid-12345" NX EX 10

# 释放锁（Lua 脚本保证原子性）
EVAL "if redis.call('get',KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end" 1 lock:order:1001 "uuid-12345"
```

**4. 限流**：
```bash
# 简单限流（1分钟内最多100次）
SET api:limit:user:1001 0 EX 60
INCR api:limit:user:1001
GET api:limit:user:1001  # 检查是否超过100

# 滑动窗口限流（使用 ZSet 更精确）
```

**5. 缓存**：
```bash
# 缓存对象（JSON）
SET user:1001 '{"name":"张三","age":25,"city":"北京"}' EX 3600

# 缓存页面
SET page:home "<html>...</html>" EX 300

# 缓存查询结果
SET cache:product:list:page1 "[{...},{...}]" EX 600
```

**6. 高级操作**：
```bash
# SETNX（不存在才设置）
SETNX lock:resource "locked"  # 1（成功）或 0（失败）

# GETSET（获取旧值并设置新值）
SET counter 100
GETSET counter 0  # 返回 100，counter 变为 0

# SETRANGE（替换部分字符串）
SET msg "Hello World"
SETRANGE msg 6 "Redis"  # "Hello Redis"

# GETRANGE（获取子串）
GETRANGE msg 0 4  # "Hello"
```

**String 类型的使用场景详解**：

| 场景 | 实现方式 | 优势 | 示例 |
|-----|---------|------|------|
| **缓存** | SET/GET + EXPIRE | 快速读写 | 用户信息、商品详情 |
| **计数器** | INCR/DECR | 原子性 | 阅读量、点赞数 |
| **分布式锁** | SET NX EX | 互斥性 | 防重复提交、秒杀 |
| **限流** | INCR + EXPIRE | 高性能 | API 限流 |
| **Session** | SET + EXPIRE | 支持过期 | 分布式 Session |
| **验证码** | SET + EXPIRE | 自动过期 | 短信验证码 |

**实际应用示例**：

**1. 缓存用户信息**：
```bash
# 设置缓存（1小时过期）
SET user:1001 '{"id":1001,"name":"张三","email":"zhangsan@example.com"}' EX 3600

# 读取缓存
GET user:1001

# 如果缓存不存在，从数据库加载并缓存
# 伪代码：
# if (redis.get(key) == null) {
#     data = db.query(...)
#     redis.set(key, data, 3600)
# }
```

**2. 文章阅读量统计**：
```bash
# 初始化
SET article:1001:views 0

# 每次阅读 +1
INCR article:1001:views

# 获取阅读量
GET article:1001:views  # 1523
```

**3. 分布式锁实现**：
```bash
# 加锁
SET lock:order:1001 "uuid-12345" NX EX 10

# 业务逻辑...

# 释放锁（使用 Lua 脚本保证原子性）
EVAL "if redis.call('get',KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end" 1 lock:order:1001 "uuid-12345"
```

**4. 接口限流**：
```bash
# 1分钟内最多100次
key="api:limit:user:1001"
count = INCR key
if count == 1 then
    EXPIRE key 60
end
if count > 100 then
    return "超过限流阈值"
end
```

**String 内部编码**：

| 编码类型 | 使用条件 | 特点 |
|---------|---------|------|
| **int** | 整数值且范围在 long 内 | 节省内存 |
| **embstr** | 字符串长度 ≤ 44 字节 | 一次分配，紧凑存储 |
| **raw** | 字符串长度 > 44 字节 | SDS 实现，可扩展 |

```bash
# 查看编码类型
OBJECT ENCODING key
```

**性能优化建议**：

1. **批量操作**：使用 MSET/MGET 减少网络往返
2. **合理设置过期**：避免内存浪费
3. **选择合适编码**：短字符串用 embstr
4. **避免大 value**：单个 value 不要超过 10KB
5. **使用 Pipeline**：批量命令一次发送

**关键要点**：
- ✓ **最基础类型**：Redis 最常用的数据类型
- ✓ **二进制安全**：可存储任意数据
- ✓ **原子操作**：INCR/DECR 线程安全
- ✓ **丰富命令**：基础、数值、高级操作
- ✓ **四大场景**：缓存、计数器、锁、限流
- ✓ **最大 512MB**：单个 value 限制
- ⚠ **避免大 value**：影响性能
- ⚠ **合理过期**：防止内存溢出

**记忆口诀**：String 基础最常用，缓存计数加分布式锁，INCR 原子保线程安全，SETEX 过期防内存溢出


### 7. List 类型的使用场景和常用命令有哪些？

**核心答案**：List 是有序的字符串列表，支持头尾操作，常用于消息队列、最新动态、栈和队列等场景。

**详细说明**：

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">List 类型全景图</text>
<rect x="30" y="60" width="790" height="240" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">List 的四大使用场景</text>
<rect x="50" y="110" width="180" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 消息队列</text>
<text x="60" y="160" font-size="10">• 生产者-消费者模式</text>
<text x="60" y="180" font-size="10">• 异步任务处理</text>
<text x="60" y="200" font-size="10">• 订单队列</text>
<text x="60" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="60" y="245" font-size="9" font-family="monospace">LPUSH/RPOP</text>
<text x="60" y="265" font-size="9" fill="#1976d2" font-weight="bold">✓ FIFO 先进先出</text>
<rect x="245" y="110" width="180" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 最新动态</text>
<text x="255" y="160" font-size="10">• 朋友圈/微博</text>
<text x="255" y="180" font-size="10">• 文章列表</text>
<text x="255" y="200" font-size="10">• 最新评论</text>
<text x="255" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="255" y="245" font-size="9" font-family="monospace">LPUSH/LRANGE</text>
<text x="255" y="265" font-size="9" fill="#388e3c" font-weight="bold">✓ 最新N条</text>
<rect x="440" y="110" width="180" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 栈/队列</text>
<text x="450" y="160" font-size="10">• 栈：LPUSH/LPOP</text>
<text x="450" y="180" font-size="10">• 队列：LPUSH/RPOP</text>
<text x="450" y="200" font-size="10">• 阻塞队列：BLPOP</text>
<text x="450" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="450" y="245" font-size="9" font-family="monospace">LPUSH/LPOP</text>
<text x="450" y="265" font-size="9" fill="#f57c00" font-weight="bold">✓ 数据结构</text>
<rect x="635" y="110" width="170" height="170" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 排行榜</text>
<text x="645" y="160" font-size="10">• 评论列表</text>
<text x="645" y="180" font-size="10">• 按时间排序</text>
<text x="645" y="200" font-size="10">• 分页显示</text>
<text x="645" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="645" y="245" font-size="9" font-family="monospace">LRANGE</text>
<text x="645" y="265" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 有序列表</text>
<rect x="30" y="320" width="790" height="300" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="350" text-anchor="middle" font-size="14" font-weight="bold">常用命令详解</text>
<rect x="50" y="370" width="240" height="230" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="395" text-anchor="middle" font-size="11" font-weight="bold">头尾操作</text>
<text x="60" y="420" font-size="10" font-family="monospace">LPUSH key value</text>
<text x="60" y="440" font-size="10" font-family="monospace">RPUSH key value</text>
<text x="60" y="460" font-size="10" font-family="monospace">LPOP key</text>
<text x="60" y="480" font-size="10" font-family="monospace">RPOP key</text>
<text x="60" y="500" font-size="10" font-family="monospace">BLPOP key timeout</text>
<text x="60" y="520" font-size="10" font-family="monospace">BRPOP key timeout</text>
<text x="60" y="545" font-size="10" font-family="monospace">LLEN key</text>
<text x="60" y="565" font-size="10" font-family="monospace">LTRIM key start stop</text>
<rect x="305" y="370" width="240" height="230" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="395" text-anchor="middle" font-size="11" font-weight="bold">查询操作</text>
<text x="315" y="420" font-size="10" font-family="monospace">LRANGE key 0 -1</text>
<text x="315" y="440" font-size="10" font-family="monospace">LINDEX key index</text>
<text x="315" y="460" font-size="10" font-family="monospace">LSET key index value</text>
<text x="315" y="490" font-size="9" fill="#388e3c">• LRANGE：获取范围元素</text>
<text x="315" y="510" font-size="9" fill="#388e3c">• LINDEX：获取指定位置</text>
<text x="315" y="530" font-size="9" fill="#388e3c">• 0是第一个，-1是最后</text>
<text x="315" y="560" font-size="9" fill="#388e3c">• 时间复杂度：O(N)</text>
<rect x="560" y="370" width="240" height="230" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="395" text-anchor="middle" font-size="11" font-weight="bold">修改操作</text>
<text x="570" y="420" font-size="10" font-family="monospace">LINSERT key BEFORE</text>
<text x="570" y="440" font-size="10" font-family="monospace">LREM key count value</text>
<text x="570" y="460" font-size="10" font-family="monospace">RPOPLPUSH src dest</text>
<text x="570" y="490" font-size="9" fill="#f57c00">• LINSERT：插入元素</text>
<text x="570" y="510" font-size="9" fill="#f57c00">• LREM：删除元素</text>
<text x="570" y="530" font-size="9" fill="#f57c00">• RPOPLPUSH：原子转移</text>
<text x="570" y="560" font-size="9" fill="#f57c00">• 支持原子操作</text>
</svg>

**List 类型的特点**：

1. **有序性**：元素按插入顺序排列
2. **可重复**：允许重复元素
3. **双端操作**：支持左右两端插入删除
4. **底层实现**：
   - 元素少：ziplist（压缩列表）
   - 元素多：quicklist（快速列表）

**常用命令分类**：

**1. 头尾操作（Push/Pop）**：
```bash
# 左侧插入（头部）
LPUSH mylist "first"
LPUSH mylist "second"  # ["second", "first"]

# 右侧插入（尾部）
RPUSH mylist "third"   # ["second", "first", "third"]

# 左侧弹出
LPOP mylist  # "second"

# 右侧弹出
RPOP mylist  # "third"

# 阻塞式弹出（超时时间单位：秒）
BLPOP mylist 10  # 等待10秒，如果为空则阻塞
BRPOP mylist 10

# 获取列表长度
LLEN mylist  # 1
```

**2. 范围查询**：
```bash
# 创建列表
RPUSH articles "article1" "article2" "article3" "article4" "article5"

# 获取所有元素
LRANGE articles 0 -1  # ["article1", "article2", ..., "article5"]

# 获取前3个
LRANGE articles 0 2   # ["article1", "article2", "article3"]

# 获取最后2个
LRANGE articles -2 -1 # ["article4", "article5"]

# 获取指定位置元素
LINDEX articles 0     # "article1"
LINDEX articles -1    # "article5"

# 修改指定位置元素
LSET articles 0 "new_article1"
```

**3. 修改操作**：
```bash
# 插入元素（在指定元素前/后）
LINSERT mylist BEFORE "article2" "new_article"
LINSERT mylist AFTER "article2" "another_article"

# 删除元素
# count > 0：从头到尾删除count个value
# count < 0：从尾到头删除count个value
# count = 0：删除所有value
LREM mylist 1 "article1"  # 删除1个article1
LREM mylist -2 "article2" # 从尾部删除2个article2
LREM mylist 0 "article3"  # 删除所有article3

# 保留范围内元素，删除其他
LTRIM mylist 0 99  # 只保留前100个元素

# 原子转移（从source右侧弹出，插入destination左侧）
RPOPLPUSH source destination
```

**4. 阻塞操作**：
```bash
# 阻塞式左侧弹出
BLPOP queue1 queue2 10
# 同时监听多个队列，哪个先有数据就从哪个弹出
# 10秒超时

# 阻塞式右侧弹出
BRPOP queue1 queue2 10

# 阻塞式转移
BRPOPLPUSH source destination 10
```

**实际应用场景**：

**1. 消息队列（生产者-消费者）**：
```bash
# 生产者：添加任务到队列
LPUSH task:queue "process_order:1001"
LPUSH task:queue "send_email:user@example.com"
LPUSH task:queue "generate_report:2023-12"

# 消费者：阻塞式获取任务
BRPOP task:queue 0  # 0表示无限等待
# 返回：["task:queue", "process_order:1001"]

# 处理任务...

# 继续获取下一个任务
BRPOP task:queue 0
```

**2. 最新动态（朋友圈/微博）**：
```bash
# 发布动态（始终插入头部）
LPUSH user:1001:posts "今天天气不错"
LPUSH user:1001:posts "刚吃了一顿大餐"
LPUSH user:1001:posts "分享一篇文章"

# 获取最新10条动态
LRANGE user:1001:posts 0 9

# 限制列表长度（只保留最新100条）
LTRIM user:1001:posts 0 99
```

**3. 评论列表**：
```bash
# 添加评论
RPUSH article:1001:comments "很棒的文章！"
RPUSH article:1001:comments "学到了很多"

# 获取所有评论
LRANGE article:1001:comments 0 -1

# 分页获取评论（每页10条）
# 第1页：0-9
LRANGE article:1001:comments 0 9
# 第2页：10-19
LRANGE article:1001:comments 10 19

# 获取评论总数
LLEN article:1001:comments
```

**4. 栈和队列**：
```bash
# 栈（LIFO：后进先出）
LPUSH stack "item1"
LPUSH stack "item2"
LPUSH stack "item3"
LPOP stack  # "item3"（最后进去的先出来）

# 队列（FIFO：先进先出）
LPUSH queue "task1"
LPUSH queue "task2"
LPUSH queue "task3"
RPOP queue  # "task1"（最先进去的先出来）
```

**5. 限流（滑动窗口）**：
```bash
# 记录用户请求时间戳
LPUSH user:1001:requests "1638000000"
LPUSH user:1001:requests "1638000001"
LPUSH user:1001:requests "1638000002"

# 保留最近60秒的请求
LTRIM user:1001:requests 0 99

# 获取请求数量
LLEN user:1001:requests

# 判断是否超过限流阈值（如100次/分钟）
```

**List 的底层实现**：

| 编码类型 | 使用条件 | 特点 |
|---------|---------|------|
| **ziplist** | 元素数量 < 512 且所有字符串长度 < 64字节 | 内存紧凑，连续存储 |
| **quicklist** | 不满足ziplist条件 | 双向链表 + ziplist，平衡性能和内存 |

```bash
# 查看编码类型
OBJECT ENCODING mylist
```

**性能特点**：

| 操作 | 时间复杂度 | 说明 |
|-----|-----------|------|
| **LPUSH/RPUSH** | O(1) | 头尾插入很快 |
| **LPOP/RPOP** | O(1) | 头尾删除很快 |
| **LINDEX** | O(N) | 访问中间元素较慢 |
| **LINSERT** | O(N) | 需要遍历查找 |
| **LREM** | O(N) | 需要遍历删除 |
| **LRANGE** | O(S+N) | S是偏移量，N是范围长度 |

**性能优化建议**：

1. **避免大列表**：单个列表不要超过10000个元素
2. **使用LTRIM**：定期清理旧数据，保持列表大小
3. **避免LINDEX**：尽量使用LRANGE批量获取
4. **分页合理**：每页不要超过100条
5. **考虑Stream**：复杂消息队列建议使用Redis Stream（5.0+）

**List vs 其他数据类型**：

| 特性 | List | Set | ZSet |
|-----|------|-----|------|
| **有序性** | ✓ | ✗ | ✓（按分数） |
| **可重复** | ✓ | ✗ | ✗ |
| **头尾操作** | ✓ | ✗ | ✗ |
| **范围查询** | ✓ | ✗ | ✓ |
| **典型场景** | 消息队列、最新动态 | 标签、去重 | 排行榜 |

**关键要点**：
- ✓ **有序列表**：按插入顺序排列
- ✓ **双端操作**：支持左右两端操作
- ✓ **消息队列**：LPUSH + BRPOP实现
- ✓ **最新动态**：LPUSH + LRANGE + LTRIM
- ✓ **栈和队列**：灵活实现LIFO和FIFO
- ⚠ **避免大列表**：影响性能
- ⚠ **中间操作慢**：LINDEX、LINSERT是O(N)
- ⚠ **考虑Stream**：复杂场景用Stream更好

**记忆口诀**：List 有序可重复，双端操作最灵活，LPUSH RPOP 做队列，LPUSH LPOP 做栈，消息队列最常用，LTRIM 控制列表长度


### 8. Hash 类型的使用场景和常用命令有哪些？

**核心答案**：Hash 是键值对集合，类似 Java 的 HashMap，常用于存储对象、用户信息、配置参数、购物车等场景。

**详细说明**：

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Hash 类型全景图</text>
<rect x="30" y="60" width="790" height="240" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">Hash 的四大使用场景</text>
<rect x="50" y="110" width="180" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 对象存储</text>
<text x="60" y="160" font-size="10">• 用户信息</text>
<text x="60" y="180" font-size="10">• 商品详情</text>
<text x="60" y="200" font-size="10">• 配置参数</text>
<text x="60" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="60" y="245" font-size="9" font-family="monospace">HSET/HGET/HGETALL</text>
<text x="60" y="265" font-size="9" fill="#1976d2" font-weight="bold">✓ 结构化存储</text>
<rect x="245" y="110" width="180" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 购物车</text>
<text x="255" y="160" font-size="10">• 商品ID为field</text>
<text x="255" y="180" font-size="10">• 数量为value</text>
<text x="255" y="200" font-size="10">• 增删改查方便</text>
<text x="255" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="255" y="245" font-size="9" font-family="monospace">HINCRBY/HDEL</text>
<text x="255" y="265" font-size="9" fill="#388e3c" font-weight="bold">✓ 高效操作</text>
<rect x="440" y="110" width="180" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 缓存对象</text>
<text x="450" y="160" font-size="10">• 减少序列化</text>
<text x="450" y="180" font-size="10">• 部分更新</text>
<text x="450" y="200" font-size="10">• 节省内存</text>
<text x="450" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="450" y="245" font-size="9" font-family="monospace">HMSET/HMGET</text>
<text x="450" y="265" font-size="9" fill="#f57c00" font-weight="bold">✓ 灵活缓存</text>
<rect x="635" y="110" width="170" height="170" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 计数统计</text>
<text x="645" y="160" font-size="10">• 文章统计</text>
<text x="645" y="180" font-size="10">• 访问计数</text>
<text x="645" y="200" font-size="10">• 多维度统计</text>
<text x="645" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="645" y="245" font-size="9" font-family="monospace">HINCRBY</text>
<text x="645" y="265" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 原子增减</text>
<rect x="30" y="320" width="790" height="300" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="350" text-anchor="middle" font-size="14" font-weight="bold">常用命令详解</text>
<rect x="50" y="370" width="240" height="230" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="395" text-anchor="middle" font-size="11" font-weight="bold">基础操作</text>
<text x="60" y="420" font-size="10" font-family="monospace">HSET key field value</text>
<text x="60" y="440" font-size="10" font-family="monospace">HGET key field</text>
<text x="60" y="460" font-size="10" font-family="monospace">HDEL key field</text>
<text x="60" y="480" font-size="10" font-family="monospace">HEXISTS key field</text>
<text x="60" y="500" font-size="10" font-family="monospace">HLEN key</text>
<text x="60" y="520" font-size="10" font-family="monospace">HKEYS key</text>
<text x="60" y="540" font-size="10" font-family="monospace">HVALS key</text>
<text x="60" y="560" font-size="10" font-family="monospace">HGETALL key</text>
<rect x="305" y="370" width="240" height="230" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="395" text-anchor="middle" font-size="11" font-weight="bold">批量操作</text>
<text x="315" y="420" font-size="10" font-family="monospace">HMSET key f1 v1 f2 v2</text>
<text x="315" y="440" font-size="10" font-family="monospace">HMGET key f1 f2</text>
<text x="315" y="470" font-size="9" fill="#388e3c">• 减少网络往返</text>
<text x="315" y="490" font-size="9" fill="#388e3c">• 提高性能</text>
<text x="315" y="510" font-size="9" fill="#388e3c">• 原子操作</text>
<text x="315" y="540" font-size="9" fill="#388e3c">• 批量设置多个字段</text>
<text x="315" y="560" font-size="9" fill="#388e3c">• 批量获取多个字段</text>
<rect x="560" y="370" width="240" height="230" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="395" text-anchor="middle" font-size="11" font-weight="bold">数值操作</text>
<text x="570" y="420" font-size="10" font-family="monospace">HINCRBY key field inc</text>
<text x="570" y="440" font-size="10" font-family="monospace">HINCRBYFLOAT key field</text>
<text x="570" y="470" font-size="9" fill="#f57c00">• 原子自增</text>
<text x="570" y="490" font-size="9" fill="#f57c00">• 支持负数（减）</text>
<text x="570" y="510" font-size="9" fill="#f57c00">• 浮点数增减</text>
<text x="570" y="540" font-size="9" fill="#f57c00">• 不存在则创建</text>
<text x="570" y="560" font-size="9" fill="#f57c00">• 线程安全</text>
</svg>

**Hash 类型的特点**：

1. **键值对集合**：一个 Hash 中可以存储多个 field-value 对
2. **类似 Java HashMap**：结构相同，操作类似
3. **适合对象存储**：可以将对象的各个属性作为 field 存储
4. **节省内存**：比多个 String key 更节省内存

**常用命令分类**：

**1. 基础操作（单字段）**：
```bash
# 设置单个字段
HSET user:1001 name "张三"
HSET user:1001 age 25
HSET user:1001 city "北京"

# 获取单个字段
HGET user:1001 name  # "张三"

# 删除字段
HDEL user:1001 age

# 检查字段是否存在
HEXISTS user:1001 name  # 1（存在）

# 获取字段数量
HLEN user:1001  # 2

# 获取所有字段名
HKEYS user:1001  # ["name", "city"]

# 获取所有字段值
HVALS user:1001  # ["张三", "北京"]

# 获取所有字段和值
HGETALL user:1001  # {"name": "张三", "city": "北京"}
```

**2. 批量操作**：
```bash
# 批量设置多个字段（推荐）
HMSET user:1002 name "李四" age 30 city "上海"

# 批量获取多个字段
HMGET user:1002 name age  # ["李四", "30"]

# 只在字段不存在时设置
HSETNX user:1002 email "lisi@example.com"
```

**3. 数值操作**：
```bash
# 字段值自增
HINCRBY user:1001 age 1  # 26

# 字段值减少（使用负数）
HINCRBY user:1001 age -1  # 25

# 浮点数增加
HINCRBYFLOAT user:1001 balance 10.5
```

**4. 扫描操作**：
```bash
# 扫描 Hash 中的字段（避免 HGETALL 阻塞）
HSCAN user:1001 0 COUNT 10
```

**实际应用场景**：

**1. 用户信息存储**：
```bash
# 存储用户信息
HMSET user:1001 \
    name "张三" \
    age 25 \
    email "zhangsan@example.com" \
    city "北京" \
    phone "13800138000"

# 获取用户信息
HGETALL user:1001

# 更新部分信息
HSET user:1001 city "上海"

# 获取特定字段
HMGET user:1001 name email
```

**2. 购物车实现**：
```bash
# 添加商品到购物车（商品ID:数量）
HSET cart:user1001 product:1 2    # 商品1，数量2
HSET cart:user1001 product:2 1    # 商品2，数量1

# 增加商品数量
HINCRBY cart:user1001 product:1 1  # 数量+1，变为3

# 减少商品数量
HINCRBY cart:user1001 product:1 -1  # 数量-1，变为2

# 删除商品
HDEL cart:user1001 product:2

# 获取购物车所有商品
HGETALL cart:user1001

# 获取购物车商品数量
HLEN cart:user1001
```

**3. 对象缓存**：
```bash
# 缓存商品信息
HMSET product:1001 \
    name "iPhone 15" \
    price 5999 \
    stock 100 \
    category "手机"

# 获取商品信息
HGETALL product:1001

# 更新库存（原子操作）
HINCRBY product:1001 stock -1  # 库存-1

# 只获取需要的字段
HMGET product:1001 name price
```

**4. 文章统计**：
```bash
# 文章多维度统计
HMSET article:1001:stats \
    views 1000 \
    likes 50 \
    comments 10 \
    shares 5

# 阅读量+1
HINCRBY article:1001:stats views 1

# 点赞+1
HINCRBY article:1001:stats likes 1

# 获取所有统计
HGETALL article:1001:stats
```

**5. 配置管理**：
```bash
# 应用配置
HMSET config:app \
    max_connections 1000 \
    timeout 30 \
    retry 3 \
    debug true

# 获取所有配置
HGETALL config:app

# 更新单个配置
HSET config:app timeout 60
```

**Hash 的底层实现**：

| 编码类型 | 使用条件 | 特点 |
|---------|---------|------|
| **ziplist** | 字段数 < 512 且所有值 < 64字节 | 内存紧凑，连续存储 |
| **hashtable** | 不满足ziplist条件 | 哈希表，O(1)查询 |

```bash
# 查看编码类型
OBJECT ENCODING user:1001
```

**性能特点**：

| 操作 | 时间复杂度 | 说明 |
|-----|-----------|------|
| **HSET/HGET** | O(1) | 单字段操作很快 |
| **HDEL** | O(N) | N是要删除的字段数 |
| **HGETALL** | O(N) | N是字段总数 |
| **HMSET/HMGET** | O(N) | N是操作的字段数 |
| **HINCRBY** | O(1) | 原子操作 |
| **HLEN** | O(1) | 获取字段数量 |

**Hash vs String 对比**：

**使用 String 存储对象**：
```bash
# 方式1：序列化整个对象
SET user:1001 '{"name":"张三","age":25,"city":"北京"}'

# 缺点：
# - 修改任意字段需要反序列化整个对象
# - 浪费带宽和CPU
# - 无法直接操作单个字段

# 方式2：每个字段一个key
SET user:1001:name "张三"
SET user:1001:age 25
SET user:1001:city "北京"

# 缺点：
# - 占用更多内存（key的元数据开销）
# - 无法原子操作多个字段
# - 管理复杂
```

**使用 Hash 存储对象**：
```bash
HMSET user:1001 name "张三" age 25 city "北京"

# 优点：
# ✓ 结构清晰
# ✓ 节省内存
# ✓ 部分更新方便
# ✓ 支持批量操作
# ✓ 原子性好
```

**性能优化建议**：

1. **避免大Hash**：单个Hash不要超过5000个字段
2. **合理使用批量操作**：用HMSET/HMGET减少网络往返
3. **避免HGETALL**：字段多时用HSCAN代替
4. **控制value大小**：单个value不要太大（建议< 1KB）
5. **利用ziplist**：保持字段数和值大小在阈值内

**Hash vs 其他类型**：

| 特性 | Hash | String | List |
|-----|------|--------|------|
| **结构** | 键值对集合 | 单个值 | 有序列表 |
| **适用** | 对象存储 | 简单值、序列化对象 | 队列、列表 |
| **内存** | 节省（相对多个String） | 单个占用少 | 中等 |
| **操作** | 字段级操作 | 整体操作 | 索引操作 |
| **典型场景** | 用户信息、购物车 | 缓存、计数 | 消息队列 |

**关键要点**：
- ✓ **键值对集合**：一个Hash存储多个field-value对
- ✓ **对象存储**：最适合存储对象信息
- ✓ **购物车神器**：field存商品ID，value存数量
- ✓ **部分更新**：无需反序列化整个对象
- ✓ **批量操作**：HMSET/HMGET提高性能
- ⚠ **避免大Hash**：字段数控制在5000以内
- ⚠ **HGETALL慎用**：字段多时用HSCAN

**记忆口诀**：Hash 键值对集合，对象存储最合适，购物车统计配置管理，HMSET批量更高效，字段级操作部分更新，避免大Hash防阻塞


### 9. Redis Set 数据类型的特点和使用场景是什么?

**核心答案**:Set 是无序、不重复的字符串集合,支持集合运算(交集、并集、差集),常用于标签系统、共同好友、去重、抽奖等场景。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Set 类型全景图</text>
<rect x="30" y="60" width="790" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">Set 的四大使用场景</text>
<rect x="50" y="110" width="180" height="150" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 标签系统</text>
<text x="60" y="160" font-size="10">• 文章标签</text>
<text x="60" y="178" font-size="10">• 用户兴趣</text>
<text x="60" y="196" font-size="10">• 商品分类</text>
<text x="60" y="220" font-size="9" font-family="monospace">SADD/SMEMBERS</text>
<text x="60" y="245" font-size="9" fill="#1976d2" font-weight="bold">✓ 自动去重</text>
<rect x="245" y="110" width="180" height="150" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 社交功能</text>
<text x="255" y="160" font-size="10">• 共同好友</text>
<text x="255" y="178" font-size="10">• 关注/粉丝</text>
<text x="255" y="196" font-size="10">• 可能认识</text>
<text x="255" y="220" font-size="9" font-family="monospace">SINTER/SUNION</text>
<text x="255" y="245" font-size="9" fill="#388e3c" font-weight="bold">✓ 集合运算</text>
<rect x="440" y="110" width="180" height="150" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 去重统计</text>
<text x="450" y="160" font-size="10">• 访客去重</text>
<text x="450" y="178" font-size="10">• IP去重</text>
<text x="450" y="196" font-size="10">• 数据去重</text>
<text x="450" y="220" font-size="9" font-family="monospace">SADD/SCARD</text>
<text x="450" y="245" font-size="9" fill="#f57c00" font-weight="bold">✓ 唯一性</text>
<rect x="635" y="110" width="170" height="150" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 抽奖活动</text>
<text x="645" y="160" font-size="10">• 随机抽取</text>
<text x="645" y="178" font-size="10">• 不重复</text>
<text x="645" y="196" font-size="10">• 参与管理</text>
<text x="645" y="220" font-size="9" font-family="monospace">SPOP</text>
<text x="645" y="245" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 随机获取</text>
<rect x="30" y="300" width="790" height="270" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="330" text-anchor="middle" font-size="14" font-weight="bold">常用命令详解</text>
<rect x="50" y="350" width="240" height="200" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="375" text-anchor="middle" font-size="11" font-weight="bold">基础操作</text>
<text x="60" y="400" font-size="10" font-family="monospace">SADD key member</text>
<text x="60" y="418" font-size="10" font-family="monospace">SREM key member</text>
<text x="60" y="436" font-size="10" font-family="monospace">SISMEMBER key member</text>
<text x="60" y="454" font-size="10" font-family="monospace">SMEMBERS key</text>
<text x="60" y="472" font-size="10" font-family="monospace">SCARD key</text>
<text x="60" y="500" font-size="9" fill="#1976d2">• 添加/删除元素</text>
<text x="60" y="520" font-size="9" fill="#1976d2">• 判断/获取/统计</text>
<rect x="305" y="350" width="240" height="200" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="375" text-anchor="middle" font-size="11" font-weight="bold">集合运算</text>
<text x="315" y="400" font-size="10" font-family="monospace">SINTER key1 key2</text>
<text x="315" y="418" font-size="10" font-family="monospace">SUNION key1 key2</text>
<text x="315" y="436" font-size="10" font-family="monospace">SDIFF key1 key2</text>
<text x="315" y="454" font-size="10" font-family="monospace">SINTERSTORE dest k1</text>
<text x="315" y="480" font-size="9" fill="#388e3c">• SINTER: 交集</text>
<text x="315" y="498" font-size="9" fill="#388e3c">• SUNION: 并集</text>
<text x="315" y="516" font-size="9" fill="#388e3c">• SDIFF: 差集</text>
<rect x="560" y="350" width="240" height="200" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="375" text-anchor="middle" font-size="11" font-weight="bold">随机操作</text>
<text x="570" y="400" font-size="10" font-family="monospace">SRANDMEMBER key count</text>
<text x="570" y="418" font-size="10" font-family="monospace">SPOP key count</text>
<text x="570" y="445" font-size="9" fill="#f57c00">• SRANDMEMBER: 随机</text>
<text x="570" y="463" font-size="9" fill="#f57c00">  返回(不删除)</text>
<text x="570" y="481" font-size="9" fill="#f57c00">• SPOP: 随机弹出</text>
<text x="570" y="499" font-size="9" fill="#f57c00">  (删除)</text>
</svg>

**Set 类型的特点**:

1. **无序性**:元素没有顺序
2. **唯一性**:自动去重,不允许重复
3. **集合运算**:支持交、并、差集
4. **底层实现**:整数集合(intset)或哈希表(hashtable)

**常用命令**:

```bash
# 基础操作
SADD tags "Redis" "NoSQL"      # 添加元素
SREM tags "Redis"               # 删除元素
SISMEMBER tags "NoSQL"          # 判断存在(1=存在)
SMEMBERS tags                   # 获取所有元素
SCARD tags                      # 获取元素数量

# 集合运算
SINTER set1 set2                # 交集
SUNION set1 set2                # 并集
SDIFF set1 set2                 # 差集

# 随机操作
SRANDMEMBER lottery 3           # 随机返回3个(不删除)
SPOP lottery 2                  # 随机弹出2个(删除)
```

**使用场景**:

| 场景 | 实现 | 示例 |
|-----|------|------|
| **标签系统** | SADD存储标签 | 文章标签、商品分类 |
| **共同好友** | SINTER求交集 | A和B的共同好友 |
| **点赞功能** | SADD/SREM | 点赞/取消点赞 |
| **抽奖活动** | SPOP随机弹出 | 不重复中奖 |

**关键要点**:
- ✓ **无序不重复**:自动去重
- ✓ **集合运算**:交并差集
- ✓ **随机抽取**:SPOP/SRANDMEMBER
- ⚠ **SMEMBERS慎用**:元素多时用SSCAN

**记忆口诀**:Set无序不重复,集合运算是特色,标签去重和抽奖


### 10. Redis ZSet（有序集合）的特点和使用场景是什么?

**核心答案**:ZSet是有序、不重复的集合,每个元素关联一个分数(score)用于排序,常用于排行榜、延迟队列、优先级队列等场景。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">ZSet 类型全景图</text>
<rect x="30" y="60" width="790" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">ZSet 的四大使用场景</text>
<rect x="50" y="110" width="180" height="150" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 排行榜</text>
<text x="60" y="160" font-size="10">• 游戏排行</text>
<text x="60" y="178" font-size="10">• 销量榜</text>
<text x="60" y="196" font-size="10">• 热搜榜</text>
<text x="60" y="220" font-size="9" font-family="monospace">ZADD/ZREVRANGE</text>
<text x="60" y="245" font-size="9" fill="#1976d2" font-weight="bold">✓ 自动排序</text>
<rect x="245" y="110" width="180" height="150" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 延迟队列</text>
<text x="255" y="160" font-size="10">• 定时任务</text>
<text x="255" y="178" font-size="10">• 订单超时</text>
<text x="255" y="196" font-size="10">• 消息延迟</text>
<text x="255" y="220" font-size="9" font-family="monospace">ZADD+ZRANGEBYSCORE</text>
<text x="255" y="245" font-size="9" fill="#388e3c" font-weight="bold">✓ 按时间排序</text>
<rect x="440" y="110" width="180" height="150" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 优先级队列</text>
<text x="450" y="160" font-size="10">• 任务优先级</text>
<text x="450" y="178" font-size="10">• VIP优先</text>
<text x="450" y="196" font-size="10">• 消息优先级</text>
<text x="450" y="220" font-size="9" font-family="monospace">ZADD+ZPOPMAX</text>
<text x="450" y="245" font-size="9" fill="#f57c00" font-weight="bold">✓ 按优先级</text>
<rect x="635" y="110" width="170" height="150" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 范围查询</text>
<text x="645" y="160" font-size="10">• 成绩排名</text>
<text x="645" y="178" font-size="10">• 价格区间</text>
<text x="645" y="196" font-size="10">• 时间范围</text>
<text x="645" y="220" font-size="9" font-family="monospace">ZRANGEBYSCORE</text>
<text x="645" y="245" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 分数区间</text>
<rect x="30" y="300" width="790" height="270" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="330" text-anchor="middle" font-size="14" font-weight="bold">常用命令详解</text>
<rect x="50" y="350" width="240" height="200" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="375" text-anchor="middle" font-size="11" font-weight="bold">基础操作</text>
<text x="60" y="400" font-size="10" font-family="monospace">ZADD key score member</text>
<text x="60" y="418" font-size="10" font-family="monospace">ZREM key member</text>
<text x="60" y="436" font-size="10" font-family="monospace">ZSCORE key member</text>
<text x="60" y="454" font-size="10" font-family="monospace">ZINCRBY key inc member</text>
<text x="60" y="472" font-size="10" font-family="monospace">ZCARD key</text>
<text x="60" y="500" font-size="9" fill="#1976d2">• 添加/删除/获取</text>
<text x="60" y="520" font-size="9" fill="#1976d2">• 分数增减/统计</text>
<rect x="305" y="350" width="240" height="200" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="375" text-anchor="middle" font-size="11" font-weight="bold">排名查询</text>
<text x="315" y="400" font-size="10" font-family="monospace">ZRANGE key 0 -1</text>
<text x="315" y="418" font-size="10" font-family="monospace">ZREVRANGE key 0 9</text>
<text x="315" y="436" font-size="10" font-family="monospace">ZRANK key member</text>
<text x="315" y="454" font-size="10" font-family="monospace">ZREVRANK key member</text>
<text x="315" y="480" font-size="9" fill="#388e3c">• ZRANGE: 升序</text>
<text x="315" y="498" font-size="9" fill="#388e3c">• ZREVRANGE: 降序</text>
<text x="315" y="516" font-size="9" fill="#388e3c">• RANK: 获取排名</text>
<rect x="560" y="350" width="240" height="200" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="375" text-anchor="middle" font-size="11" font-weight="bold">范围查询</text>
<text x="570" y="400" font-size="10" font-family="monospace">ZRANGEBYSCORE key min</text>
<text x="570" y="418" font-size="10" font-family="monospace">ZPOPMAX key count</text>
<text x="570" y="436" font-size="10" font-family="monospace">ZPOPMIN key count</text>
<text x="570" y="463" font-size="9" fill="#f57c00">• 按分数范围查询</text>
<text x="570" y="481" font-size="9" fill="#f57c00">• 弹出最高/最低分</text>
<text x="570" y="499" font-size="9" fill="#f57c00">• 支持LIMIT分页</text>
</svg>

**ZSet 类型的特点**:

1. **有序性**:按分数(score)自动排序
2. **唯一性**:成员不重复,分数可相同
3. **双索引**:可按分数或成员查询
4. **底层实现**:ziplist或skiplist+hashtable

**常用命令**:

```bash
# 基础操作
ZADD rank 100 "p1" 200 "p2"    # 添加(分数 成员)
ZSCORE rank "p1"                # 获取分数
ZINCRBY rank 50 "p1"            # 分数+50
ZCARD rank                      # 获取数量

# 排名查询
ZREVRANGE rank 0 9 WITHSCORES  # 降序前10名(带分数)
ZREVRANK rank "p1"              # 降序排名(0=第1名)

# 范围查询
ZRANGEBYSCORE rank 100 200     # 分数在[100,200]
ZPOPMAX rank 3                  # 弹出最高的3个(5.0+)
```

**使用场景**:

| 场景 | 实现 | 示例 |
|-----|------|------|
| **排行榜** | 分数=得分 | 游戏排行、销量榜 |
| **延迟队列** | 分数=时间戳 | 定时任务、订单超时 |
| **优先级队列** | 分数=优先级 | 任务优先级 |
| **热搜榜** | 分数=搜索次数 | 热门话题 |

**性能特点**:

| 操作 | 时间复杂度 |
|-----|-----------|
| ZADD/ZREM | O(log N) |
| ZSCORE | O(1) |
| ZRANGE | O(log N + M) |
| ZRANK | O(log N) |

**关键要点**:
- ✓ **有序不重复**:按分数排序
- ✓ **排行榜神器**:自动排序
- ✓ **延迟队列**:时间戳作分数
- ✓ **范围查询**:按分数区间
- ⚠ **操作O(log N)**:比Set慢

**记忆口诀**:ZSet有序不重复,分数排序是核心,排行榜是最佳场景,延迟队列优先级


### 11. Redis 5.0 新增了哪些数据类型?

**核心答案**:Redis 5.0 主要新增了 Stream 数据类型,这是一个专业的消息队列数据结构,支持消费者组、消息持久化、ACK确认等特性。

**详细说明**:

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis 5.0 Stream 核心特性</text>
<rect x="30" y="60" width="790" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">Stream 的四大核心能力</text>
<rect x="50" y="110" width="180" height="130" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 消费者组</text>
<text x="60" y="160" font-size="10">• 多消费者协作</text>
<text x="60" y="178" font-size="10">• 消息分发</text>
<text x="60" y="196" font-size="10">• 负载均衡</text>
<text x="60" y="220" font-size="9" fill="#1976d2" font-weight="bold">✓ 类似Kafka</text>
<rect x="245" y="110" width="180" height="130" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 消息持久化</text>
<text x="255" y="160" font-size="10">• 自动持久化</text>
<text x="255" y="178" font-size="10">• 可靠性高</text>
<text x="255" y="196" font-size="10">• 支持重复消费</text>
<text x="255" y="220" font-size="9" fill="#388e3c" font-weight="bold">✓ 不丢消息</text>
<rect x="440" y="110" width="180" height="130" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ ACK机制</text>
<text x="450" y="160" font-size="10">• 消息确认</text>
<text x="450" y="178" font-size="10">• 重试机制</text>
<text x="450" y="196" font-size="10">• 防止丢失</text>
<text x="450" y="220" font-size="9" fill="#f57c00" font-weight="bold">✓ 可靠消费</text>
<rect x="635" y="110" width="170" height="130" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 消息ID</text>
<text x="645" y="160" font-size="10">• 唯一标识</text>
<text x="645" y="178" font-size="10">• 时间戳</text>
<text x="645" y="196" font-size="10">• 自动生成</text>
<text x="645" y="220" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 有序消息</text>
<rect x="30" y="280" width="790" height="240" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="310" text-anchor="middle" font-size="14" font-weight="bold">Stream 常用命令</text>
<rect x="50" y="330" width="240" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="355" text-anchor="middle" font-size="11" font-weight="bold">生产消费</text>
<text x="60" y="380" font-size="10" font-family="monospace">XADD stream * k v</text>
<text x="60" y="398" font-size="10" font-family="monospace">XREAD COUNT 10</text>
<text x="60" y="416" font-size="10" font-family="monospace">XRANGE stream - +</text>
<text x="60" y="434" font-size="10" font-family="monospace">XLEN stream</text>
<text x="60" y="460" font-size="9" fill="#1976d2">• XADD: 添加消息</text>
<text x="60" y="478" font-size="9" fill="#1976d2">• XREAD: 读取消息</text>
<rect x="305" y="330" width="240" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="355" text-anchor="middle" font-size="11" font-weight="bold">消费者组</text>
<text x="315" y="380" font-size="10" font-family="monospace">XGROUP CREATE</text>
<text x="315" y="398" font-size="10" font-family="monospace">XREADGROUP GROUP</text>
<text x="315" y="416" font-size="10" font-family="monospace">XACK stream group id</text>
<text x="315" y="434" font-size="10" font-family="monospace">XPENDING stream group</text>
<text x="315" y="460" font-size="9" fill="#388e3c">• 创建消费者组</text>
<text x="315" y="478" font-size="9" fill="#388e3c">• 组内读取和确认</text>
<rect x="560" y="330" width="240" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="355" text-anchor="middle" font-size="11" font-weight="bold">管理命令</text>
<text x="570" y="380" font-size="10" font-family="monospace">XDEL stream id</text>
<text x="570" y="398" font-size="10" font-family="monospace">XTRIM stream MAXLEN</text>
<text x="570" y="416" font-size="10" font-family="monospace">XINFO STREAM stream</text>
<text x="570" y="434" font-size="10" font-family="monospace">XINFO GROUPS stream</text>
<text x="570" y="460" font-size="9" fill="#f57c00">• 删除/裁剪消息</text>
<text x="570" y="478" font-size="9" fill="#f57c00">• 查看Stream信息</text>
</svg>

**Stream 数据类型特点**:

1. **消息队列**:专业的消息队列实现
2. **持久化**:消息自动持久化
3. **消费者组**:支持多消费者协作
4. **消息ID**:时间戳+序列号,全局唯一有序
5. **ACK机制**:消息确认,防止丢失

**常用命令**:

```bash
# 生产消息
XADD mystream * name "张三" age 25  # *表示自动生成ID
# 返回: 1609459200000-0 (时间戳-序列号)

# 读取消息
XREAD COUNT 2 STREAMS mystream 0   # 从头开始读2条
XREAD BLOCK 0 STREAMS mystream $   # 阻塞读取新消息

# 范围查询
XRANGE mystream - +                 # 查询所有消息
XRANGE mystream 1609459200000 +    # 从指定ID开始

# 获取长度
XLEN mystream

# 创建消费者组
XGROUP CREATE mystream group1 0    # 从头开始消费

# 消费者组读取
XREADGROUP GROUP group1 consumer1 COUNT 1 STREAMS mystream >

# 确认消息
XACK mystream group1 1609459200000-0

# 查看待处理消息
XPENDING mystream group1

# 删除消息
XDEL mystream 1609459200000-0

# 裁剪消息(保留最新1000条)
XTRIM mystream MAXLEN 1000
```

**Stream vs List 对比**:

| 特性 | Stream | List |
|-----|--------|------|
| **消费者组** | ✓ 支持 | ✗ 不支持 |
| **消息ID** | ✓ 唯一ID | ✗ 无ID |
| **ACK确认** | ✓ 支持 | ✗ 不支持 |
| **重复消费** | ✓ 支持 | ✗ 困难 |
| **消息持久化** | ✓ 自动 | ✓ 自动 |
| **使用场景** | 专业MQ | 简单队列 |

**Stream 消息ID格式**:

```
1609459200000-0
    ↓         ↓
  时间戳    序列号

- 时间戳: 毫秒级Unix时间戳
- 序列号: 同一毫秒内的序列号(从0开始)
- 保证全局唯一且有序
```

**使用场景**:

**1. 消息队列**:
```bash
# 生产者
XADD orders * orderId 1001 amount 100

# 消费者
XREAD COUNT 10 BLOCK 1000 STREAMS orders $
```

**2. 事件溯源**:
```bash
# 记录用户行为
XADD user:1001:events * action "login" time 1609459200
XADD user:1001:events * action "view" page "home"
XADD user:1001:events * action "purchase" productId 101

# 查看所有行为
XRANGE user:1001:events - +
```

**3. 日志收集**:
```bash
# 应用日志
XADD app:logs * level "error" msg "Connection timeout"

# 查询最近100条
XREVRANGE app:logs + - COUNT 100
```

**4. 消费者组协作**:
```bash
# 创建消费者组
XGROUP CREATE tasks task-workers 0

# 多个消费者并行处理
# 消费者1
XREADGROUP GROUP task-workers worker1 COUNT 1 STREAMS tasks >
# 消费者2
XREADGROUP GROUP task-workers worker2 COUNT 1 STREAMS tasks >

# 处理完成后确认
XACK tasks task-workers <message-id>
```

**Redis 5.0 其他改进**:

| 特性 | 说明 |
|-----|------|
| **新的 ZPOPMIN/ZPOPMAX** | ZSet弹出最小/最大元素 |
| **ZPOPMIN/ZPOPMAX** | 支持阻塞版本BZPOPMIN/BZPOPMAX |
| **Stream** | 全新的消息队列数据类型 |
| **新模块API** | 更强大的模块系统 |

**关键要点**:
- ✓ **Stream核心**:Redis 5.0最重要的新特性
- ✓ **专业MQ**:消费者组、ACK、持久化
- ✓ **消息ID**:时间戳+序列号,全局有序
- ✓ **可靠性高**:支持重复消费和ACK确认
- ✓ **替代List**:复杂消息队列场景优先使用Stream
- ⚠ **版本要求**:需要Redis 5.0+

**记忆口诀**:Redis 5.0 Stream登场,消费者组加ACK,消息持久化可靠,专业消息队列强



### 12. 什么是 Bitmap？有什么应用场景？

**核心答案**:Bitmap(位图)是基于 String 类型的位操作,通过操作二进制位来存储信息,每个位只占1bit,极其节省内存,常用于签到、在线状态、布隆过滤器等场景。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Bitmap 位图全景图</text>
<rect x="30" y="60" width="790" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">Bitmap 的四大使用场景</text>
<rect x="50" y="110" width="180" height="150" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 用户签到</text>
<text x="60" y="160" font-size="10">• 连续签到统计</text>
<text x="60" y="178" font-size="10">• 签到记录</text>
<text x="60" y="196" font-size="10">• 打卡系统</text>
<text x="60" y="220" font-size="9" font-family="monospace">SETBIT/GETBIT</text>
<text x="60" y="245" font-size="9" fill="#1976d2" font-weight="bold">✓ 每天1bit</text>
<rect x="245" y="110" width="180" height="150" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 在线状态</text>
<text x="255" y="160" font-size="10">• 用户在线</text>
<text x="255" y="178" font-size="10">• 活跃统计</text>
<text x="255" y="196" font-size="10">• 实时状态</text>
<text x="255" y="220" font-size="9" font-family="monospace">SETBIT/BITCOUNT</text>
<text x="255" y="245" font-size="9" fill="#388e3c" font-weight="bold">✓ 1亿用户12MB</text>
<rect x="440" y="110" width="180" height="150" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 权限控制</text>
<text x="450" y="160" font-size="10">• 功能权限</text>
<text x="450" y="178" font-size="10">• 开关配置</text>
<text x="450" y="196" font-size="10">• 二值状态</text>
<text x="450" y="220" font-size="9" font-family="monospace">GETBIT判断权限</text>
<text x="450" y="245" font-size="9" fill="#f57c00" font-weight="bold">✓ 高效判断</text>
<rect x="635" y="110" width="170" height="150" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 布隆过滤器</text>
<text x="645" y="160" font-size="10">• 去重判断</text>
<text x="645" y="178" font-size="10">• 缓存穿透</text>
<text x="645" y="196" font-size="10">• 黑名单</text>
<text x="645" y="220" font-size="9" font-family="monospace">多次SETBIT</text>
<text x="645" y="245" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 快速过滤</text>
<rect x="30" y="300" width="790" height="270" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="330" text-anchor="middle" font-size="14" font-weight="bold">Bitmap 常用命令详解</text>
<rect x="50" y="350" width="240" height="200" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="375" text-anchor="middle" font-size="11" font-weight="bold">位操作</text>
<text x="60" y="400" font-size="10" font-family="monospace">SETBIT key offset val</text>
<text x="60" y="418" font-size="10" font-family="monospace">GETBIT key offset</text>
<text x="60" y="436" font-size="10" font-family="monospace">BITCOUNT key</text>
<text x="60" y="454" font-size="10" font-family="monospace">BITPOS key 0/1</text>
<text x="60" y="480" font-size="9" fill="#1976d2">• offset: 位偏移</text>
<text x="60" y="498" font-size="9" fill="#1976d2">• val: 0或1</text>
<text x="60" y="516" font-size="9" fill="#1976d2">• 返回1的个数</text>
<rect x="305" y="350" width="240" height="200" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="375" text-anchor="middle" font-size="11" font-weight="bold">位运算</text>
<text x="315" y="400" font-size="10" font-family="monospace">BITOP AND dest k1 k2</text>
<text x="315" y="418" font-size="10" font-family="monospace">BITOP OR dest k1 k2</text>
<text x="315" y="436" font-size="10" font-family="monospace">BITOP XOR dest k1 k2</text>
<text x="315" y="454" font-size="10" font-family="monospace">BITOP NOT dest key</text>
<text x="315" y="480" font-size="9" fill="#388e3c">• AND: 与运算</text>
<text x="315" y="498" font-size="9" fill="#388e3c">• OR: 或运算</text>
<text x="315" y="516" font-size="9" fill="#388e3c">• XOR: 异或运算</text>
<rect x="560" y="350" width="240" height="200" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="375" text-anchor="middle" font-size="11" font-weight="bold">内存对比</text>
<text x="570" y="400" font-size="10">1亿用户 vs 传统存储:</text>
<text x="570" y="425" font-size="9">• Bitmap: 12MB</text>
<text x="570" y="443" font-size="9">• Set: 约400MB</text>
<text x="570" y="461" font-size="9">• String: 约800MB</text>
<text x="570" y="490" font-size="9" fill="#f57c00" font-weight="bold">✓ 节省98%内存</text>
<text x="570" y="510" font-size="9" fill="#f57c00">• 1 bit vs 32+ bytes</text>
</svg>

**Bitmap 的特点**:

1. **本质**:基于 String 类型,最大512MB
2. **极省内存**:每个状态只占1bit(0或1)
3. **位操作**:支持按位设置、获取、统计
4. **位运算**:支持 AND、OR、XOR、NOT

**常用命令**:

```bash
# 基础操作
SETBIT user:sign:1001 0 1      # 设置第0位为1(第1天签到)
SETBIT user:sign:1001 1 1      # 设置第1位为1(第2天签到)
GETBIT user:sign:1001 0        # 获取第0位(1=已签到)

# 统计签到天数
BITCOUNT user:sign:1001        # 统计1的个数(签到天数)

# 查找第一个0或1
BITPOS user:sign:1001 0        # 找到第一个未签到的天
BITPOS user:sign:1001 1        # 找到第一个签到的天

# 位运算(交集、并集)
BITOP AND result key1 key2     # 两个位图的交集
BITOP OR result key1 key2      # 两个位图的并集
```

**实际应用场景**:

**1. 用户签到系统**:

```bash
# 用户1001在2025年1月的签到记录
# offset 0 代表1月1日,1代表1月2日,以此类推

# 1月1日签到
SETBIT user:sign:1001:202501 0 1

# 1月3日签到
SETBIT user:sign:1001:202501 2 1

# 1月5日签到
SETBIT user:sign:1001:202501 4 1

# 查询1月3日是否签到
GETBIT user:sign:1001:202501 2  # 返回1(已签到)

# 统计1月签到天数
BITCOUNT user:sign:1001:202501  # 返回3

# 查询连续签到
# 需要配合程序逻辑,从offset 0开始依次GETBIT判断
```

**2. 在线用户统计**:

```bash
# 用户ID作为offset
# 1=在线,0=离线

# 用户1001上线
SETBIT online:20250101 1001 1

# 用户1002上线
SETBIT online:20250101 1002 1

# 统计在线人数
BITCOUNT online:20250101

# 判断用户1001是否在线
GETBIT online:20250101 1001  # 返回1(在线)

# 1亿用户只需12MB内存
# 计算: 100,000,000 bits ÷ 8 ÷ 1024 ÷ 1024 ≈ 11.92 MB
```

**3. 活跃用户统计(连续N天活跃)**:

```bash
# 1月1日活跃用户
SETBIT active:20250101 1001 1
SETBIT active:20250101 1002 1
SETBIT active:20250101 1003 1

# 1月2日活跃用户
SETBIT active:20250102 1001 1
SETBIT active:20250102 1002 1

# 1月3日活跃用户
SETBIT active:20250103 1001 1

# 统计3天都活跃的用户(交集)
BITOP AND active:3days active:20250101 active:20250102 active:20250103
BITCOUNT active:3days  # 返回1(只有用户1001)

# 统计3天有任意一天活跃的用户(并集)
BITOP OR active:any3days active:20250101 active:20250102 active:20250103
BITCOUNT active:any3days  # 返回3
```

**4. 用户权限管理**:

```bash
# offset代表不同权限
# 0=读,1=写,2=删除,3=管理员

# 设置用户1001的权限
SETBIT user:perm:1001 0 1  # 有读权限
SETBIT user:perm:1001 1 1  # 有写权限

# 判断是否有删除权限
GETBIT user:perm:1001 2    # 返回0(无删除权限)

# 判断是否有写权限
GETBIT user:perm:1001 1    # 返回1(有写权限)
```

**5. 布隆过滤器实现**:

```bash
# 使用多个hash函数计算多个offset
# 判断元素是否可能存在

# 添加元素(使用3个hash函数)
SETBIT bloom:filter hash1(element) 1
SETBIT bloom:filter hash2(element) 1
SETBIT bloom:filter hash3(element) 1

# 判断元素是否存在
# 如果3个位置都是1,则可能存在
# 如果任意位置是0,则一定不存在
```

**Bitmap 的内存优势**:

| 场景 | 传统方式 | Bitmap | 节省比例 |
|-----|---------|--------|---------|
| **1亿用户在线状态** | Set: 400MB | 12MB | 97% |
| **1亿用户签到(30天)** | Hash: 12GB | 360MB | 97% |
| **1000万用户权限(8位)** | String: 160MB | 10MB | 94% |

**计算方式**:
```
用户数 = 100,000,000
所需bit = 100,000,000
所需字节 = 100,000,000 ÷ 8 = 12,500,000 bytes
所需MB = 12,500,000 ÷ 1024 ÷ 1024 ≈ 11.92 MB
```

**性能特点**:

| 操作 | 时间复杂度 | 说明 |
|-----|-----------|------|
| **SETBIT** | O(1) | 设置位很快 |
| **GETBIT** | O(1) | 获取位很快 |
| **BITCOUNT** | O(N) | N是字节数,不是bit数 |
| **BITPOS** | O(N) | 查找第一个0/1 |
| **BITOP** | O(N) | N是最长字符串长度 |

**使用注意事项**:

1. **offset不能太大**:
   - offset太大会造成内存浪费
   - 例如:SETBIT key 4294967295 1 会分配512MB

2. **连续的ID更适合**:
   - 用户ID: 1, 2, 3, 4... (连续) ✓
   - UUID: 随机字符串 ✗ (不适合)

3. **首次SETBIT会分配内存**:
   - SETBIT key 1000000 1
   - 会立即分配约122KB内存

4. **避免大offset跳跃**:
   ```bash
   # 不好的做法
   SETBIT users 1 1
   SETBIT users 999999999 1  # 会分配约119MB

   # 好的做法:使用Hash+模运算
   # 将大offset映射到小范围
   ```

**Bitmap vs 其他类型对比**:

| 特性 | Bitmap | Set | Hash |
|-----|--------|-----|------|
| **内存占用** | ✓ 极小 | 中等 | 较大 |
| **适用ID类型** | 连续整数 | 任意 | 任意 |
| **查询速度** | ✓ O(1) | O(1) | O(1) |
| **统计功能** | ✓ 强 | 中等 | 弱 |
| **典型场景** | 签到、在线状态 | 标签、去重 | 对象存储 |

**关键要点**:
- ✓ **极省内存**:1亿用户仅12MB
- ✓ **高效统计**:BITCOUNT统计个数
- ✓ **位运算**:AND/OR/XOR支持复杂查询
- ✓ **签到神器**:每天1bit,一年365bit
- ✓ **在线状态**:实时统计在线用户
- ⚠ **适合连续ID**:不连续会浪费内存
- ⚠ **offset限制**:不要设置过大的offset
- ⚠ **二值状态**:只能表示0或1

**记忆口诀**:Bitmap位图占内存少,签到在线状态好,连续ID最适合,offset别设太大了,BITCOUNT统计快,BITOP运算交并差
### 13. 什么是 HyperLogLog？有什么应用场景？

**核心答案**:HyperLogLog 是一种概率统计算法,用于基数统计(统计不重复元素个数),占用内存极小(固定12KB),误差率约0.81%,常用于 UV 统计、大数据去重计数等场景。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">HyperLogLog 全景图</text>
<rect x="30" y="60" width="790" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">HyperLogLog 的四大使用场景</text>
<rect x="50" y="110" width="180" height="150" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ UV统计</text>
<text x="60" y="160" font-size="10">• 独立访客</text>
<text x="60" y="178" font-size="10">• 日活用户</text>
<text x="60" y="196" font-size="10">• 去重计数</text>
<text x="60" y="220" font-size="9" font-family="monospace">PFADD/PFCOUNT</text>
<text x="60" y="245" font-size="9" fill="#1976d2" font-weight="bold">✓ 固定12KB</text>
<rect x="245" y="110" width="180" height="150" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 大数据去重</text>
<text x="255" y="160" font-size="10">• 亿级数据</text>
<text x="255" y="178" font-size="10">• 内存有限</text>
<text x="255" y="196" font-size="10">• 允许误差</text>
<text x="255" y="220" font-size="9" font-family="monospace">海量数据统计</text>
<text x="255" y="245" font-size="9" fill="#388e3c" font-weight="bold">✓ 误差0.81%</text>
<rect x="440" y="110" width="180" height="150" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 搜索推荐</text>
<text x="450" y="160" font-size="10">• 搜索词统计</text>
<text x="450" y="178" font-size="10">• 热门内容</text>
<text x="450" y="196" font-size="10">• 推荐去重</text>
<text x="450" y="220" font-size="9" font-family="monospace">PFMERGE合并</text>
<text x="450" y="245" font-size="9" fill="#f57c00" font-weight="bold">✓ 多维统计</text>
<rect x="635" y="110" width="170" height="150" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 实时统计</text>
<text x="645" y="160" font-size="10">• 实时UV</text>
<text x="645" y="178" font-size="10">• IP去重</text>
<text x="645" y="196" font-size="10">• 快速统计</text>
<text x="645" y="220" font-size="9" font-family="monospace">实时计数</text>
<text x="645" y="245" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 性能高</text>
<rect x="30" y="300" width="790" height="270" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="330" text-anchor="middle" font-size="14" font-weight="bold">HyperLogLog 核心特性</text>
<rect x="50" y="350" width="240" height="200" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="375" text-anchor="middle" font-size="11" font-weight="bold">内存优势</text>
<text x="60" y="405" font-size="10">统计1亿数据:</text>
<text x="60" y="430" font-size="9">• HyperLogLog: 12KB</text>
<text x="60" y="448" font-size="9">• Set: 约400MB</text>
<text x="60" y="466" font-size="9">• Hash: 约800MB</text>
<text x="60" y="495" font-size="9" fill="#1976d2" font-weight="bold">✓ 节省99.997%内存</text>
<text x="60" y="520" font-size="9">• 固定12KB不随数据增长</text>
<rect x="305" y="350" width="240" height="200" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="375" text-anchor="middle" font-size="11" font-weight="bold">误差特性</text>
<text x="315" y="405" font-size="10">标准误差率: 0.81%</text>
<text x="315" y="430" font-size="9">• 统计100万: ±810</text>
<text x="315" y="448" font-size="9">• 统计1亿: ±81000</text>
<text x="315" y="475" font-size="9" fill="#388e3c">• 概率算法,不精确</text>
<text x="315" y="493" font-size="9" fill="#388e3c">• 牺牲精度换内存</text>
<text x="315" y="520" font-size="9" fill="#388e3c" font-weight="bold">✓ UV统计可接受</text>
<rect x="560" y="350" width="240" height="200" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="375" text-anchor="middle" font-size="11" font-weight="bold">常用命令</text>
<text x="570" y="400" font-size="10" font-family="monospace">PFADD key element</text>
<text x="570" y="418" font-size="10" font-family="monospace">PFCOUNT key</text>
<text x="570" y="436" font-size="10" font-family="monospace">PFMERGE dest k1 k2</text>
<text x="570" y="463" font-size="9" fill="#f57c00">• PFADD: 添加元素</text>
<text x="570" y="481" font-size="9" fill="#f57c00">• PFCOUNT: 获取基数</text>
<text x="570" y="499" font-size="9" fill="#f57c00">• PFMERGE: 合并统计</text>
<text x="570" y="525" font-size="9" fill="#f57c00" font-weight="bold">✓ 操作简单</text>
</svg>

**HyperLogLog 的特点**:

1. **固定内存**:无论统计多少数据,始终占用12KB
2. **概率算法**:基于概率统计,有0.81%的误差
3. **去重计数**:自动去重,统计不重复元素个数
4. **不可获取元素**:只能统计数量,不能获取具体元素

**工作原理简述**:

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">HyperLogLog 工作原理</text>
<rect x="50" y="60" width="240" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="170" y="90" text-anchor="middle" font-size="13" font-weight="bold">1. Hash 映射</text>
<text x="60" y="120" font-size="10">元素 → Hash值</text>
<text x="60" y="145" font-size="9" font-family="monospace">"user1" → 010110...</text>
<text x="60" y="165" font-size="9" font-family="monospace">"user2" → 110010...</text>
<text x="60" y="190" font-size="9">前几位决定桶编号</text>
<text x="60" y="210" font-size="9">后续位统计前导0</text>
<text x="60" y="240" font-size="9" fill="#1976d2" font-weight="bold">✓ 均匀分布</text>
<rect x="310" y="60" width="220" height="200" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="420" y="90" text-anchor="middle" font-size="13" font-weight="bold">2. 分桶统计</text>
<text x="320" y="120" font-size="10">16384个桶</text>
<text x="320" y="145" font-size="9">桶0: 最大前导0=3</text>
<text x="320" y="165" font-size="9">桶1: 最大前导0=5</text>
<text x="320" y="185" font-size="9">桶2: 最大前导0=2</text>
<text x="320" y="205" font-size="9">...</text>
<text x="320" y="240" font-size="9" fill="#388e3c" font-weight="bold">✓ 记录最大值</text>
<rect x="550" y="60" width="220" height="200" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="660" y="90" text-anchor="middle" font-size="13" font-weight="bold">3. 调和平均</text>
<text x="560" y="120" font-size="10">基于所有桶的</text>
<text x="560" y="140" font-size="10">最大前导0数</text>
<text x="560" y="165" font-size="9">使用调和平均数</text>
<text x="560" y="185" font-size="9">+ 修正常数</text>
<text x="560" y="205" font-size="9">→ 估算基数</text>
<text x="560" y="240" font-size="9" fill="#f57c00" font-weight="bold">✓ 概率估算</text>
</svg>

**常用命令**:

```bash
# 添加元素
PFADD page:uv user1 user2 user3
# 返回值: 1(添加成功,基数发生变化) 或 0(基数未变化)

# 获取基数(不重复元素个数)
PFCOUNT page:uv
# 返回: 3

# 添加重复元素(不会增加基数)
PFADD page:uv user1
PFCOUNT page:uv  # 仍然是3

# 合并多个HyperLogLog
PFADD page1:uv user1 user2
PFADD page2:uv user2 user3
PFMERGE page:total:uv page1:uv page2:uv
PFCOUNT page:total:uv  # 返回3(user1, user2, user3去重后)
```

**实际应用场景**:

**1. 网站 UV 统计**:

```bash
# 每天的UV统计
# 用户访问时添加
PFADD uv:20250101 user1001
PFADD uv:20250101 user1002
PFADD uv:20250101 user1001  # 重复访问,不重复计数

# 获取当天UV
PFCOUNT uv:20250101  # 返回2

# 统计本周UV(合并7天的数据)
PFMERGE uv:week1 uv:20250101 uv:20250102 uv:20250103 uv:20250104 uv:20250105 uv:20250106 uv:20250107
PFCOUNT uv:week1

# 优势:
# - 1天UV数据只占12KB
# - 7天合并后仍然只占12KB
# - 传统Set存储1亿用户需要400MB
```

**2. 页面访问去重统计**:

```bash
# 统计不同页面的独立访客

# 首页UV
PFADD page:home:uv user1 user2 user3

# 商品页UV
PFADD page:product:uv user2 user3 user4

# 统计访问过首页或商品页的总UV
PFMERGE page:total:uv page:home:uv page:product:uv
PFCOUNT page:total:uv  # 返回4(user1,2,3,4去重)

# 无法直接求交集(HyperLogLog限制)
# 如需交集,建议使用Set
```

**3. 搜索关键词去重统计**:

```bash
# 统计每个关键词的搜索用户数

# 用户搜索"Redis"
PFADD search:redis user1001
PFADD search:redis user1002
PFADD search:redis user1001  # 同一用户重复搜索

# 获取搜索"Redis"的独立用户数
PFCOUNT search:redis  # 返回2

# 用户搜索"MySQL"
PFADD search:mysql user1002
PFADD search:mysql user1003

# 统计搜索Redis或MySQL的总用户数
PFMERGE search:database search:redis search:mysql
PFCOUNT search:database
```

**4. 实时在线用户数统计**:

```bash
# 实时统计在线用户(每分钟更新)

# 当前分钟在线用户
PFADD online:current user1 user2 user3

# 获取在线人数
PFCOUNT online:current  # 返回3

# 下一分钟,清空重新统计
DEL online:current
PFADD online:current user1 user4 user5

# 或者使用时间戳作为key
PFADD online:202501011430 user1 user2
```

**5. IP 地址去重统计**:

```bash
# 统计不同IP访问数

PFADD ip:visits 192.168.1.1
PFADD ip:visits 192.168.1.2
PFADD ip:visits 192.168.1.1  # 重复IP

PFCOUNT ip:visits  # 返回2
```

**HyperLogLog vs 其他方式对比**:

| 方式 | 内存占用 | 精确度 | 适用场景 |
|-----|---------|--------|---------|
| **HyperLogLog** | 12KB(固定) | 99.19% | 大数据UV统计 |
| **Set** | ~400MB(1亿) | 100% | 精确去重,数据量小 |
| **Bitmap** | ~12MB(1亿) | 100% | 连续ID,二值状态 |
| **Hash** | ~800MB(1亿) | 100% | 需要元素详情 |

**内存对比示例**:

```
统计1亿用户的UV:

HyperLogLog:
- 内存: 12KB
- 误差: ±81万(0.81%)
- 适用: UV统计(允许误差)

Set:
- 内存: 约400MB
- 误差: 0
- 适用: 精确统计,数据量不大

节省内存比例: 99.997%
```

**性能特点**:

| 操作 | 时间复杂度 | 说明 |
|-----|-----------|------|
| **PFADD** | O(1) | 添加元素很快 |
| **PFCOUNT** | O(1) | 获取基数很快 |
| **PFMERGE** | O(N) | N是HyperLogLog数量 |

**使用限制**:

1. **只能计数,不能获取元素**:
   ```bash
   PFADD users user1 user2 user3
   PFCOUNT users  # 可以:返回3
   # 不能:获取user1, user2, user3具体是谁
   ```

2. **有误差(0.81%)**:
   ```bash
   # 真实UV: 1,000,000
   # HyperLogLog: 991,900 ~ 1,008,100
   # 误差范围: ±8,100
   ```

3. **不能删除元素**:
   ```bash
   PFADD users user1 user2
   # 无法单独删除user1
   # 只能DEL整个key重新统计
   ```

4. **无法求交集**:
   ```bash
   # 只支持PFMERGE(并集)
   # 不支持交集、差集运算
   ```

**适用与不适用场景**:

**✓ 适用场景**:
- UV(独立访客)统计
- DAU(日活用户)统计
- 搜索关键词去重计数
- IP地址访问统计
- 大数据去重计数(可接受误差)

**✗ 不适用场景**:
- 需要精确计数(如金额统计)
- 需要获取具体元素
- 需要删除单个元素
- 需要交集/差集运算
- 数据量小且要求精确(用Set更好)

**HyperLogLog vs Bitmap 选择**:

| 对比项 | HyperLogLog | Bitmap |
|-------|-------------|--------|
| **内存** | 固定12KB | 取决于最大ID |
| **ID类型** | 任意 | 必须连续整数 |
| **精确度** | 99.19% | 100% |
| **获取元素** | ✗ 不支持 | ✓ 支持 |
| **统计功能** | 基数统计 | 位统计、位运算 |
| **典型场景** | UV统计 | 签到、在线状态 |

**选择建议**:
- **ID连续 + 需要精确** → Bitmap
- **ID任意 + 允许误差 + 数据量大** → HyperLogLog
- **需要元素详情** → Set
- **需要精确 + 数据量小** → Set

**关键要点**:
- ✓ **固定12KB**:无论多少数据都是12KB
- ✓ **去重计数**:自动去重统计基数
- ✓ **UV统计神器**:大数据去重首选
- ✓ **支持合并**:PFMERGE合并多个统计
- ✓ **性能极高**:O(1)添加和计数
- ⚠ **有误差**:0.81%标准误差
- ⚠ **不可逆**:不能获取具体元素
- ⚠ **不能删除**:无法删除单个元素
- ⚠ **无交集**:只支持并集PFMERGE

**记忆口诀**:HyperLogLog固定十二K,基数统计去重强,误差零点八一可接受,UV统计是专长,只能计数不存元素,合并并集用PFMERGE
### 14. 什么是 GEO？有什么应用场景？

**核心答案**:GEO(Geographic)是 Redis 3.2+ 引入的地理位置数据类型,底层基于 ZSet 实现,用于存储和查询地理坐标(经纬度),支持计算距离、范围查询等,常用于附近的人/店铺、打车、外卖配送等 LBS 场景。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">GEO 地理位置全景图</text>
<rect x="30" y="60" width="790" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">GEO 的四大使用场景</text>
<rect x="50" y="110" width="180" height="150" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 附近的人</text>
<text x="60" y="160" font-size="10">• 社交应用</text>
<text x="60" y="178" font-size="10">• 查找附近</text>
<text x="60" y="196" font-size="10">• 距离排序</text>
<text x="60" y="220" font-size="9" font-family="monospace">GEORADIUS</text>
<text x="60" y="245" font-size="9" fill="#1976d2" font-weight="bold">✓ 按距离查询</text>
<rect x="245" y="110" width="180" height="150" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 附近商家</text>
<text x="255" y="160" font-size="10">• 外卖配送</text>
<text x="255" y="178" font-size="10">• 店铺推荐</text>
<text x="255" y="196" font-size="10">• 范围搜索</text>
<text x="255" y="220" font-size="9" font-family="monospace">GEORADIUSBYMEMBER</text>
<text x="255" y="245" font-size="9" fill="#388e3c" font-weight="bold">✓ LBS应用</text>
<rect x="440" y="110" width="180" height="150" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 打车距离</text>
<text x="450" y="160" font-size="10">• 计算距离</text>
<text x="450" y="178" font-size="10">• 司机匹配</text>
<text x="450" y="196" font-size="10">• 路程计算</text>
<text x="450" y="220" font-size="9" font-family="monospace">GEODIST</text>
<text x="450" y="245" font-size="9" fill="#f57c00" font-weight="bold">✓ 距离计算</text>
<rect x="635" y="110" width="170" height="150" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 位置追踪</text>
<text x="645" y="160" font-size="10">• 物流追踪</text>
<text x="645" y="178" font-size="10">• 车辆定位</text>
<text x="645" y="196" font-size="10">• 实时位置</text>
<text x="645" y="220" font-size="9" font-family="monospace">GEOPOS</text>
<text x="645" y="245" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 坐标获取</text>
<rect x="30" y="300" width="790" height="270" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="330" text-anchor="middle" font-size="14" font-weight="bold">GEO 常用命令详解</text>
<rect x="50" y="350" width="240" height="200" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="375" text-anchor="middle" font-size="11" font-weight="bold">添加与查询</text>
<text x="60" y="400" font-size="10" font-family="monospace">GEOADD key lng lat m</text>
<text x="60" y="418" font-size="10" font-family="monospace">GEOPOS key member</text>
<text x="60" y="436" font-size="10" font-family="monospace">GEODIST key m1 m2</text>
<text x="60" y="463" font-size="9" fill="#1976d2">• 添加位置</text>
<text x="60" y="481" font-size="9" fill="#1976d2">• 获取坐标</text>
<text x="60" y="499" font-size="9" fill="#1976d2">• 计算距离</text>
<text x="60" y="525" font-size="9" fill="#1976d2" font-weight="bold">✓ 基础操作</text>
<rect x="305" y="350" width="240" height="200" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="375" text-anchor="middle" font-size="11" font-weight="bold">范围查询</text>
<text x="315" y="400" font-size="10" font-family="monospace">GEORADIUS key lng</text>
<text x="315" y="418" font-size="10" font-family="monospace">  lat radius unit</text>
<text x="315" y="436" font-size="10" font-family="monospace">GEORADIUSBYMEMBER</text>
<text x="315" y="463" font-size="9" fill="#388e3c">• 按坐标查范围</text>
<text x="315" y="481" font-size="9" fill="#388e3c">• 按成员查范围</text>
<text x="315" y="499" font-size="9" fill="#388e3c">• 支持排序</text>
<text x="315" y="525" font-size="9" fill="#388e3c" font-weight="bold">✓ 核心功能</text>
<rect x="560" y="350" width="240" height="200" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="375" text-anchor="middle" font-size="11" font-weight="bold">底层实现</text>
<text x="570" y="405" font-size="10">基于 ZSet(有序集合)</text>
<text x="570" y="430" font-size="9">• GeoHash编码</text>
<text x="570" y="448" font-size="9">• 52位整数score</text>
<text x="570" y="466" font-size="9">• 支持ZSet命令</text>
<text x="570" y="493" font-size="9" fill="#f57c00">• 可用ZREM删除</text>
<text x="570" y="520" font-size="9" fill="#f57c00" font-weight="bold">✓ 高效存储</text>
</svg>

**GEO 的特点**:

1. **底层实现**:基于 ZSet,使用 GeoHash 编码
2. **坐标系统**:WGS84 坐标系(经度-180~180,纬度-85.05~85.05)
3. **距离计算**:基于球面距离公式
4. **范围查询**:支持按距离、按坐标查询

**常用命令**:

```bash
# 添加位置(经度 纬度 名称)
GEOADD cities 116.404 39.915 "北京"
GEOADD cities 121.472 31.231 "上海"
GEOADD cities 113.264 23.129 "广州"

# 批量添加
GEOADD cities 114.057 22.543 "深圳" 120.153 30.287 "杭州"

# 获取位置坐标
GEOPOS cities "北京"
# 返回: 116.40400022268295288, 39.91499993026033138

# 计算两地距离
GEODIST cities "北京" "上海" km
# 返回: 1067.5980(公里)

# 单位: m(米), km(千米), mi(英里), ft(英尺)

# 查找附近的位置(按坐标)
GEORADIUS cities 116.404 39.915 1000 km
# 返回北京周围1000公里内的城市

# 查找附近的位置(按成员)
GEORADIUSBYMEMBER cities "北京" 1000 km
# 返回北京周围1000公里内的其他城市

# 带距离和坐标
GEORADIUSBYMEMBER cities "北京" 1000 km WITHDIST WITHCOORD ASC COUNT 5
# WITHDIST: 返回距离
# WITHCOORD: 返回坐标
# ASC: 由近到远排序(DESC由远到近)
# COUNT 5: 限制返回5条

# 获取GeoHash
GEOHASH cities "北京" "上海"
# 返回GeoHash字符串

# 删除位置(使用ZSet的ZREM命令)
ZREM cities "北京"
```

**实际应用场景**:

**1. 附近的人(社交应用)**:

```bash
# 用户上线时更新位置
GEOADD online:users 116.404 39.915 "user1001"
GEOADD online:users 116.405 39.916 "user1002"

# 查找user1001附近5公里内的人
GEORADIUSBYMEMBER online:users "user1001" 5 km WITHDIST ASC

# 返回:
# 1) "user1001"
#    "0.0000"
# 2) "user1002"
#    "0.1234"

# 查找指定坐标附近的人
GEORADIUS online:users 116.404 39.915 5 km WITHDIST COUNT 10
```

**2. 附近的商家(外卖/O2O)**:

```bash
# 商家入驻时添加位置
GEOADD restaurants 116.404 39.915 "麦当劳(国贸店)"
GEOADD restaurants 116.405 39.916 "肯德基(CBD店)"
GEOADD restaurants 116.410 39.920 "海底捞(三里屯店)"

# 用户搜索附近3公里的餐厅
GEORADIUS restaurants 116.404 39.915 3 km WITHDIST ASC COUNT 20

# 按距离排序,只返回前20家
```

**3. 打车/网约车**:

```bash
# 司机上线,添加位置
GEOADD drivers 116.404 39.915 "driver001"
GEOADD drivers 116.408 39.918 "driver002"
GEOADD drivers 116.402 39.913 "driver003"

# 乘客叫车,查找附近5公里内的司机
GEORADIUS drivers 116.405 39.916 5 km WITHDIST ASC COUNT 5

# 返回最近的5个司机及距离

# 计算乘客到司机的距离
GEOADD passengers 116.405 39.916 "passenger001"
GEODIST drivers "driver001" passengers "passenger001" m
```

**4. 物流配送**:

```bash
# 配送站点
GEOADD stations 116.404 39.915 "站点A"
GEOADD stations 116.450 39.950 "站点B"

# 计算订单配送地址到最近站点的距离
GEOADD orders 116.410 39.920 "order12345"
GEORADIUSBYMEMBER orders "order12345" 50 km WITHDIST ASC
# 找到最近的站点进行配送
```

**5. 车辆定位追踪**:

```bash
# 实时更新车辆位置
GEOADD vehicles 116.404 39.915 "car001"

# 每隔几秒更新一次
GEOADD vehicles 116.405 39.916 "car001"  # 位置更新

# 查询车辆当前位置
GEOPOS vehicles "car001"

# 查看车辆周围的其他车辆
GEORADIUSBYMEMBER vehicles "car001" 1 km
```

**GeoHash 原理**:

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">GeoHash 编码原理</text>
<rect x="50" y="60" width="220" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="160" y="90" text-anchor="middle" font-size="13" font-weight="bold">1. 经纬度</text>
<text x="60" y="120" font-size="10">北京坐标:</text>
<text x="60" y="145" font-size="9">经度: 116.404</text>
<text x="60" y="165" font-size="9">纬度: 39.915</text>
<text x="60" y="195" font-size="9">范围:</text>
<text x="60" y="215" font-size="9">经度: -180~180</text>
<text x="60" y="235" font-size="9">纬度: -90~90</text>
<rect x="290" y="60" width="220" height="200" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="90" text-anchor="middle" font-size="13" font-weight="bold">2. 二进制编码</text>
<text x="300" y="120" font-size="10">区间二分编码:</text>
<text x="300" y="145" font-size="9">经度 > 0: 1</text>
<text x="300" y="165" font-size="9">纬度 > 0: 1</text>
<text x="300" y="185" font-size="9">...</text>
<text x="300" y="210" font-size="9">交织编码</text>
<text x="300" y="230" font-size="9">→ 52位整数</text>
<rect x="530" y="60" width="220" height="200" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="640" y="90" text-anchor="middle" font-size="13" font-weight="bold">3. ZSet存储</text>
<text x="540" y="120" font-size="10">member: 北京</text>
<text x="540" y="145" font-size="9">score: GeoHash值</text>
<text x="540" y="165" font-size="9">(52位整数)</text>
<text x="540" y="195" font-size="9">优势:</text>
<text x="540" y="215" font-size="9">• 附近的点score接近</text>
<text x="540" y="235" font-size="9">• 范围查询高效</text>
</svg>

**GeoHash 编码特点**:
- 将二维坐标转换为一维整数
- 相邻的位置GeoHash值接近
- 支持不同精度(字符串长度)
- Redis内部使用52位整数

**性能特点**:

| 操作 | 时间复杂度 | 说明 |
|-----|-----------|------|
| **GEOADD** | O(log N) | 基于ZSet |
| **GEOPOS** | O(log N) | 查找成员 |
| **GEODIST** | O(log N) | 两次查找 |
| **GEORADIUS** | O(N+log M) | N是半径内元素,M是总数 |

**使用注意事项**:

1. **坐标范围限制**:
   - 经度: -180 ~ 180
   - 纬度: -85.05112878 ~ 85.05112878
   - 超出范围会返回错误

2. **精度问题**:
   - 误差约0.5米
   - 基于球面距离,非精确计算
   - 适合大多数LBS场景

3. **大量数据性能**:
   - 百万级数据可能较慢
   - 建议分区存储(如按城市)
   - 或使用专业GIS数据库

4. **删除操作**:
   ```bash
   # GEO没有GEODEL命令
   # 使用ZSet的ZREM删除
   ZREM cities "北京"
   ```

**GEO vs 其他方案对比**:

| 方案 | 优势 | 劣势 | 适用场景 |
|-----|------|------|---------|
| **Redis GEO** | 简单易用,实时性好 | 功能有限,大数据慢 | 中小规模LBS |
| **MySQL空间索引** | 功能完整,支持复杂查询 | 性能一般 | 传统应用 |
| **MongoDB GEO** | 功能丰富,性能好 | 学习成本高 | 大规模GIS |
| **Elasticsearch** | 强大的地理查询 | 资源占用大 | 复杂搜索 |
| **专业GIS** | 功能最强 | 成本高,复杂 | 专业地图应用 |

**底层实现细节**:

```bash
# GEO本质是ZSet
# 可以使用ZSet命令操作

# 查看所有位置
ZRANGE cities 0 -1

# 删除位置
ZREM cities "北京"

# 统计数量
ZCARD cities

# 但score是GeoHash编码,不要直接修改
```

**关键要点**:
- ✓ **底层ZSet**:基于有序集合实现
- ✓ **GeoHash编码**:二维转一维,高效存储
- ✓ **距离计算**:球面距离公式
- ✓ **范围查询**:GEORADIUS核心功能
- ✓ **LBS场景**:附近的人/店铺首选
- ✓ **实时性好**:适合动态位置更新
- ⚠ **精度有限**:约0.5米误差
- ⚠ **大数据慢**:百万级建议分区
- ⚠ **功能简单**:复杂GIS用专业方案

**记忆口诀**:GEO地理位置基于ZSet,GeoHash编码经纬度,GEORADIUS查附近,距离计算用GEODIST,附近的人和商家,打车外卖都靠它


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
- **方式**:定期生成数据快照
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
- **方式**:记录每个写命令
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
- ✓ **RDB特点**:快照,恢复快,可能丢数据
- ✓ **AOF特点**:日志,数据全,文件大
- ✓ **混合最优**:4.0+推荐,兼顾优点
- ✓ **恢复优先级**:AOF > RDB
- ⚠ **性能影响**:持久化会影响性能
- ⚠ **磁盘空间**:AOF文件可能很大
- ⚠ **fork阻塞**:数据量大时注意

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
- **本质**:内存数据的全量快照
- **格式**:二进制文件(dump.rdb)
- **时机**:某个时间点的完整数据副本
- **恢复**:直接加载到内存即可

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
- ✓ **全量快照**:完整数据副本
- ✓ **二进制格式**:紧凑、恢复快
- ✓ **Fork机制**:子进程异步持久化
- ✓ **COW优化**:节省内存
- ✓ **适合备份**:定期备份、灾难恢复
- ⚠ **可能丢失数据**:最后一次快照后的数据
- ⚠ **Fork阻塞**:数据量大时注意
- ⚠ **内存翻倍**:大量写入时预留内存

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
- **本质**:记录每个写命令的日志
- **格式**:文本文件(appendonly.aof)
- **方式**:追加写入(append)
- **恢复**:重新执行所有命令

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
- ✓ **日志持久化**:记录每个写命令
- ✓ **数据完整**:最多丢失1秒(everysec)
- ✓ **文本格式**:可读、易分析
- ✓ **支持重写**:压缩文件大小
- ✓ **三种策略**:always/everysec/no
- ✓ **适合实时**:对数据安全要求高的场景
- ⚠ **文件大**:比RDB大很多
- ⚠ **恢复慢**:需要重新执行所有命令
- ⚠ **性能影响**:略低于RDB

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

1. **生产环境标配**:混合持久化 + everysec
2. **监控**:定期检查`INFO persistence`
3. **备份**:RDB定期备份 + AOF实时保护
4. **恢复优先级**:优先加载AOF(数据更完整)
5. **容量规划**:磁盘 ≥ 内存 × 10

**关键要点**:
- ✓ **RDB**:快照、恢复快、分钟级丢失
- ✓ **AOF**:日志、数据完整、恢复慢
- ✓ **推荐**:混合持久化(4.0+)
- ✓ **标准**:RDB+AOF,everysec
- ✓ **高安全**:AOF always
- ✓ **高性能**:RDB only
- ✓ **监控**:定期检查状态
- ✓ **备份**:多重保障

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
- ✓ **目的**:压缩AOF文件,去除冗余
- ✓ **原理**:重新生成最少命令集
- ✓ **方式**:fork子进程,后台执行
- ✓ **缓冲区**:主进程双写,保证数据完整
- ✓ **混合持久化**:RDB+AOF,兼顾优点
- ✓ **自动触发**:增长100%且>=64MB
- ✓ **手动触发**:BGREWRITEAOF
- ⚠ **性能影响**:fork时短暂阻塞
- ⚠ **内存占用**:重写期间可能翻倍
- ⚠ **避免高峰**:在低峰期执行

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
- ✓ **AOF 恢复**:重新执行命令,慢但完整
- ✓ **RDB 恢复**:直接加载快照,快但可能丢数据
- ✓ **混合持久化**:先 RDB 再 AOF,最优方案
- ✓ **自动检测**:启动时自动选择恢复方式
- ✓ **错误处理**:支持跳过损坏命令
- ✓ **备份重要**:定期备份,多地存储
- ✓ **验证恢复**:定期演练恢复流程
- ⚠ **恢复时间**:数据量大时需要较长时间
- ⚠ **文件完整性**:使用 redis-check-* 工具验证

**记忆口诀**:Redis恢复AOF优先,RDB备用速度快,混合持久最佳选,启动自动检测加载,重放命令或载快照,过期键处理别忘了,定期备份多地存,演练恢复保平安

## 过期策略与淘汰机制

21. Redis 的过期键删除策略有哪些？
22. 什么是惰性删除和定期删除？
23. Redis 的内存淘汰策略有哪些？
24. 如何设置键的过期时间？
25. 过期的 key 会被立即删除吗？

## 缓存问题

26. 什么是缓存穿透？如何解决？
27. 什么是缓存击穿？如何解决？
28. 什么是缓存雪崩？如何解决？
29. 什么是缓存预热？
30. 什么是缓存降级？
31. 如何保证缓存与数据库的数据一致性？
32. 什么是双写一致性问题？

## 事务与锁

33. Redis 支持事务吗？如何实现？
34. Redis 事务的特性是什么？
35. 什么是 WATCH 命令？
36. Redis 如何实现分布式锁？
37. 分布式锁的实现有哪些问题？如何解决？
38. 什么是 Redlock？
39. Redis 的事务和 MySQL 的事务有什么区别？

## 高可用

40. 什么是主从复制？如何实现？
41. 主从复制的原理是什么？
42. 什么是哨兵模式（Sentinel）？
43. 哨兵模式的工作原理是什么？
44. 什么是 Redis 集群？
45. Redis 集群的数据分片策略是什么？
46. 什么是哈希槽？
47. Redis 集群如何实现故障转移？
48. 主从复制、哨兵、集群的区别是什么？

## 性能优化

49. 如何提高 Redis 的性能？
50. 什么是管道（Pipeline）？
51. 什么是 Redis 的慢查询？如何分析？
52. 大 key 问题是什么？如何解决？
53. 热 key 问题是什么？如何解决？
54. Redis 的批量操作有哪些？
55. 如何优化 Redis 的内存使用？

## 其他特性

56. 什么是发布订阅（Pub/Sub）？
57. 什么是 Redis Stream？
58. Redis 如何实现延迟队列？
59. 什么是 Lua 脚本？在 Redis 中如何使用？
60. Redis 6.0 引入了哪些新特性？