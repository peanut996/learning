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



12. 什么是 Bitmap？有什么应用场景？
13. 什么是 HyperLogLog？有什么应用场景？
14. 什么是 GEO？有什么应用场景？

## 持久化

15. Redis 的持久化机制有哪些？
16. 什么是 RDB？RDB 的工作原理是什么？
17. 什么是 AOF？AOF 的工作原理是什么？
18. RDB 和 AOF 的区别是什么？如何选择？
19. 什么是 AOF 重写？
20. Redis 如何实现数据恢复？

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