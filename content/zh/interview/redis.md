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

### 21. Redis 的过期键删除策略有哪些？

**核心答案：**

Redis 采用 **惰性删除（Lazy Deletion）** + **定期删除（Periodic Deletion）** 的组合策略来删除过期键。

**详细说明：**

Redis 有三种理论上的过期键删除策略：

**1. 定时删除（Timer Deletion）**
- 为每个设置了过期时间的键创建一个定时器
- 到期时立即删除键
- ✅ 优点：内存友好，能及时释放内存空间
- ❌ 缺点：CPU 不友好，大量定时器会消耗大量 CPU 资源

**2. 惰性删除（Lazy Deletion）**
- 键过期后不立即删除
- 只有在访问键时才检查是否过期，如果过期则删除
- ✅ 优点：CPU 友好，删除操作只在需要时发生
- ❌ 缺点：内存不友好，过期键可能长期占用内存

**3. 定期删除（Periodic Deletion）**
- 每隔一段时间执行一次删除过期键操作
- 随机检查一定数量的键，删除其中的过期键
- ✅ 优点：通过限制操作的时长和频率，平衡 CPU 和内存使用
- ❌ 缺点：难以确定最优的执行时长和频率

**Redis 的实际实现：**

Redis 同时使用 **惰性删除** 和 **定期删除** 的组合策略：

| 策略 | 触发时机 | 工作方式 |
|-----|---------|---------|
| 惰性删除 | 读/写操作时 | 访问键时检查是否过期，过期则删除 |
| 定期删除 | 周期性执行 | 默认每秒 10 次，每次随机检查 20 个键 |

**定期删除的具体流程：**

1. 从设置了过期时间的键集合中随机选取 20 个键
2. 删除所有已过期的键
3. 如果超过 25% 的键已过期，重复步骤 1
4. 限制单次执行时间不超过 25ms

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="400" y="25" text-anchor="middle" font-size="18" font-weight="bold">Redis 过期键删除策略对比</text>
<rect x="20" y="50" width="230" height="320" fill="#f0f8ff" stroke="#4682b4" stroke-width="2" rx="5"/>
<text x="135" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#4682b4">定时删除</text>
<text x="135" y="100" text-anchor="middle" font-size="12">为每个键创建定时器</text>
<circle cx="135" cy="140" r="25" fill="#ffd700" stroke="#ff8c00" stroke-width="2"/>
<text x="135" y="145" text-anchor="middle" font-size="14">Key1</text>
<line x1="135" y1="165" x2="135" y2="190" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="195" width="70" height="35" fill="#90ee90" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="135" y="217" text-anchor="middle" font-size="12">立即删除</text>
<text x="135" y="250" font-size="11" text-anchor="middle" fill="#228b22">✅ 内存友好</text>
<text x="135" y="265" font-size="11" text-anchor="middle" fill="#dc143c">❌ CPU 开销大</text>
<text x="135" y="285" font-size="10" text-anchor="middle" fill="#666">大量定时器</text>
<text x="135" y="300" font-size="10" text-anchor="middle" fill="#666">消耗 CPU</text>
<rect x="275" y="50" width="230" height="320" fill="#fff0f5" stroke="#db7093" stroke-width="2" rx="5"/>
<text x="390" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#db7093">惰性删除</text>
<text x="390" y="100" text-anchor="middle" font-size="12">访问时才检查</text>
<circle cx="390" cy="140" r="25" fill="#ffd700" stroke="#ff8c00" stroke-width="2"/>
<text x="390" y="145" text-anchor="middle" font-size="14">Key2</text>
<rect x="355" y="175" width="70" height="30" fill="#add8e6" stroke="#4169e1" stroke-width="2" rx="5"/>
<text x="390" y="195" text-anchor="middle" font-size="11">GET Key2</text>
<line x1="390" y1="205" x2="390" y2="225" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="355" y="230" width="70" height="35" fill="#90ee90" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="390" y="252" text-anchor="middle" font-size="12">检查并删除</text>
<text x="390" y="280" font-size="11" text-anchor="middle" fill="#228b22">✅ CPU 友好</text>
<text x="390" y="295" font-size="11" text-anchor="middle" fill="#dc143c">❌ 内存浪费</text>
<text x="390" y="315" font-size="10" text-anchor="middle" fill="#666">可能长期占用</text>
<rect x="530" y="50" width="250" height="320" fill="#f0fff0" stroke="#32cd32" stroke-width="2" rx="5"/>
<text x="655" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#32cd32">定期删除</text>
<text x="655" y="100" text-anchor="middle" font-size="12">周期性随机检查</text>
<g transform="translate(605, 110)">
<circle cx="25" cy="25" r="15" fill="#ffd700" stroke="#ff8c00" stroke-width="1.5"/><text x="25" y="30" text-anchor="middle" font-size="10">K1</text>
<circle cx="75" cy="25" r="15" fill="#ffd700" stroke="#ff8c00" stroke-width="1.5"/><text x="75" y="30" text-anchor="middle" font-size="10">K2</text>
<circle cx="25" cy="65" r="15" fill="#ffd700" stroke="#ff8c00" stroke-width="1.5"/><text x="25" y="70" text-anchor="middle" font-size="10">K3</text>
<circle cx="75" cy="65" r="15" fill="#ffd700" stroke="#ff8c00" stroke-width="1.5"/><text x="75" y="70" text-anchor="middle" font-size="10">K4</text>
</g>
<line x1="655" y1="195" x2="655" y2="215" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="605" y="220" width="100" height="30" fill="#add8e6" stroke="#4169e1" stroke-width="2" rx="5"/>
<text x="655" y="240" text-anchor="middle" font-size="11">随机抽取 20 个</text>
<line x1="655" y1="250" x2="655" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="605" y="275" width="100" height="30" fill="#90ee90" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="655" y="295" text-anchor="middle" font-size="11">删除过期键</text>
<text x="655" y="320" font-size="11" text-anchor="middle" fill="#32cd32">✅ 平衡方案</text>
<text x="655" y="335" font-size="10" text-anchor="middle" fill="#666">每秒 10 次</text>
<text x="655" y="350" font-size="10" text-anchor="middle" fill="#666">每次 20 个键</text>
</svg>

**关键要点：**

1. Redis 不使用定时删除，因为定时器开销太大
2. 惰性删除保证了 CPU 效率，但可能造成内存浪费
3. 定期删除作为补充，周期性清理过期键
4. 定期删除有时间和数量限制，避免阻塞主线程
5. 如果过期键过多，还会触发内存淘汰策略

**记忆口诀：**

> **"懒人定期打扫房间"**
> 懒人（惰性删除）：用到时才收拾
> 定期（定期删除）：每天固定时间打扫
> 两者结合，既省力又干净
### 22. 什么是惰性删除和定期删除？

**核心答案：**

- **惰性删除（Lazy Deletion）**：在访问键时检查是否过期，过期则删除并返回 nil
- **定期删除（Periodic Deletion）**：Redis 定时随机检查部分设置了过期时间的键，删除过期键

**详细说明：**

#### 惰性删除（Lazy Deletion）

**工作原理：**

1. 客户端尝试访问一个键（如 GET、SET 等操作）
2. Redis 检查该键是否设置了过期时间
3. 如果设置了过期时间，检查当前时间是否超过过期时间
4. 如果已过期，删除该键并返回 nil
5. 如果未过期，正常返回键值

**实现细节：**
- 源码位置：`db.c` 中的 `expireIfNeeded()` 函数
- 所有读写命令执行前都会调用此函数
- 主从模式下只在主节点执行删除，从节点等待删除命令

**优缺点：**
- ✅ CPU 友好：只在访问时检查，不消耗额外 CPU 资源
- ✅ 实现简单：逻辑清晰，易于维护
- ❌ 内存不友好：如果某些键长期不被访问，会一直占用内存
- ❌ 可能导致内存泄漏：大量过期但未访问的键持续占用内存

#### 定期删除（Periodic Deletion）

**工作原理：**

1. Redis 在服务器初始化时创建时间事件
2. 默认每秒执行 10 次 `activeExpireCycle()` 函数（每 100ms 一次）
3. 每次执行的具体步骤：
   - 从过期字典（expires dict）中随机选取 20 个键
   - 检查这些键是否过期，删除所有已过期的键
   - 如果超过 25% 的键已过期，重复步骤 1
   - 单次执行时间不超过 25ms，避免阻塞主线程

**执行模式：**

| 模式 | 触发时机 | 时间限制 | 用途 |
|-----|---------|---------|------|
| 慢模式（Slow） | 定时事件，每秒 10 次 | 25ms | 常规清理 |
| 快模式（Fast） | 事件循环前 | 1ms | 快速清理 |

**算法特点：**
- 自适应：过期键越多，检查次数越多
- 时间限制：避免长时间阻塞
- 随机采样：保证公平性，避免集中检查某些键

**实现细节：**
- 源码位置：`expire.c` 中的 `activeExpireCycle()` 函数
- 使用全局变量记录上次检查的数据库位置
- 支持多数据库，轮流检查每个数据库

**优缺点：**
- ✅ 弥补惰性删除的不足，主动清理过期键
- ✅ 通过随机抽样和时间限制平衡 CPU 和内存
- ✅ 自适应算法，过期键多时会增加检查频率
- ❌ 随机性可能导致某些过期键延迟删除
- ❌ 需要占用一定的 CPU 时间片

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="400" y="25" text-anchor="middle" font-size="18" font-weight="bold">惰性删除 vs 定期删除</text>
<rect x="20" y="50" width="360" height="210" fill="#fff5ee" stroke="#ff6347" stroke-width="2" rx="8"/>
<text x="200" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#ff6347">惰性删除流程</text>
<rect x="150" y="90" width="100" height="35" fill="#87ceeb" stroke="#4682b4" stroke-width="2" rx="5"/>
<text x="200" y="112" text-anchor="middle" font-size="13">客户端请求</text>
<text x="200" y="125" text-anchor="middle" font-size="11">GET key</text>
<line x1="200" y1="125" x2="200" y2="145" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 200 145 L 140 145 L 140 195 L 180 195" fill="none" stroke="#666" stroke-width="2"/>
<path d="M 200 145 L 260 145 L 260 195 L 220 195" fill="none" stroke="#666" stroke-width="2"/>
<text x="100" y="175" font-size="11" fill="#228b22">未过期</text>
<text x="280" y="175" font-size="11" fill="#dc143c">已过期</text>
<rect x="50" y="195" width="130" height="30" fill="#90ee90" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="115" y="215" text-anchor="middle" font-size="12">返回键值</text>
<rect x="220" y="195" width="130" height="30" fill="#ffb6c1" stroke="#dc143c" stroke-width="2" rx="5"/>
<text x="285" y="215" text-anchor="middle" font-size="12">删除并返回 nil</text>
<line x1="115" y1="225" x2="115" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="285" y1="225" x2="285" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<ellipse cx="200" cy="245" rx="150" ry="10" fill="#d3d3d3" stroke="#999" stroke-width="1"/>
<text x="200" y="250" text-anchor="middle" font-size="11" fill="#333">被动触发，访问时检查</text>
<rect x="420" y="50" width="360" height="440" fill="#f0fff0" stroke="#32cd32" stroke-width="2" rx="8"/>
<text x="600" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#32cd32">定期删除流程</text>
<rect x="550" y="90" width="100" height="30" fill="#ffd700" stroke="#ff8c00" stroke-width="2" rx="5"/>
<text x="600" y="110" text-anchor="middle" font-size="12">时间事件触发</text>
<line x1="600" y1="120" x2="600" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="530" y="140" width="140" height="30" fill="#add8e6" stroke="#4169e1" stroke-width="2" rx="5"/>
<text x="600" y="160" text-anchor="middle" font-size="11">随机选取 20 个键</text>
<line x1="600" y1="170" x2="600" y2="190" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="530" y="190" width="140" height="30" fill="#dda0dd" stroke="#9370db" stroke-width="2" rx="5"/>
<text x="600" y="210" text-anchor="middle" font-size="11">检查是否过期</text>
<line x1="600" y1="220" x2="600" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="530" y="240" width="140" height="30" fill="#ffb6c1" stroke="#dc143c" stroke-width="2" rx="5"/>
<text x="600" y="260" text-anchor="middle" font-size="11">删除过期键</text>
<line x1="600" y1="270" x2="600" y2="290" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 600 290 Q 690 290 690 230 Q 690 170 670 170" fill="none" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow)"/>
<text x="700" y="230" font-size="10" fill="#dc143c">过期率 &gt; 25%</text>
<text x="700" y="245" font-size="10" fill="#dc143c">继续抽样</text>
<rect x="530" y="295" width="140" height="30" fill="#98fb98" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="600" y="315" text-anchor="middle" font-size="11">完成本轮清理</text>
<line x1="600" y1="325" x2="600" y2="345" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="510" y="345" width="180" height="60" fill="#fffacd" stroke="#ffd700" stroke-width="2" rx="5"/>
<text x="600" y="365" text-anchor="middle" font-size="12" font-weight="bold">限制条件</text>
<text x="600" y="382" text-anchor="middle" font-size="10">⏱️ 单次执行 ≤ 25ms</text>
<text x="600" y="397" text-anchor="middle" font-size="10">🔄 每秒执行 10 次</text>
<ellipse cx="600" cy="425" rx="160" ry="10" fill="#d3d3d3" stroke="#999" stroke-width="1"/>
<text x="600" y="430" text-anchor="middle" font-size="11" fill="#333">主动触发，周期性执行</text>
<rect x="40" y="280" width="320" height="140" fill="#f5f5f5" stroke="#888" stroke-width="2" rx="5"/>
<text x="200" y="300" text-anchor="middle" font-size="14" font-weight="bold">两种策略的配合</text>
<text x="50" y="325" font-size="11" fill="#333">1. 惰性删除：保证访问时的数据正确性</text>
<text x="50" y="345" font-size="11" fill="#333">2. 定期删除：清理未访问的过期键</text>
<text x="50" y="365" font-size="11" fill="#333">3. 二者互补：既保证性能又节省内存</text>
<text x="50" y="385" font-size="11" fill="#333">4. 极端情况：触发内存淘汰策略</text>
<text x="200" y="405" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc143c">过期删除 ≠ 立即删除</text>
<rect x="40" y="435" width="320" height="55" fill="#ffe4e1" stroke="#ff6347" stroke-width="2" rx="5"/>
<text x="200" y="455" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc143c">⚠️ 注意事项</text>
<text x="50" y="473" font-size="10" fill="#333">• 过期键可能不会立即被删除</text>
<text x="50" y="485" font-size="10" fill="#333">• 极端情况下可能占用大量内存</text>
</svg>

**两种策略的配合：**

```
时间轴：0ms ───────→ 100ms ──────→ 200ms ──────→ ...

惰性：   [访问时]      [访问时]     [访问时]    ← 被动

定期：   [后台扫描] → [后台扫描] → [后台扫描]  ← 主动
```

**关键要点：**

1. **惰性删除**：
   - 被动策略，只在访问时触发
   - 100% 准确：访问的键一定不会是过期键
   - 可能造成内存浪费：不访问就不删除

2. **定期删除**：
   - 主动策略，定时批量清理
   - 随机抽样：每次检查 20 个键
   - 自适应：过期率高时会持续抽样
   - 有时间限制：避免阻塞太久

3. **两者配合**：
   - 互为补充，缺一不可
   - 惰性删除保证访问时的正确性
   - 定期删除主动清理冷数据
   - 仍可能有漏网之鱼，需要内存淘汰策略兜底

**记忆口诀：**

> **"访问检查 + 定时清扫"**
> 惰性删除：访客来了才打扫房间（被动）
> 定期删除：每天定时清理垃圾（主动）
> 双管齐下：既不累死自己，也不让垃圾堆积
### 23. Redis 的内存淘汰策略有哪些？

**核心答案：**

Redis 有 **8 种内存淘汰策略**，分为三大类：
1. **不淘汰**：noeviction
2. **全部键淘汰**：allkeys-lru、allkeys-lfu、allkeys-random
3. **过期键淘汰**：volatile-lru、volatile-lfu、volatile-random、volatile-ttl

**详细说明：**

当 Redis 内存达到 `maxmemory` 限制时，会根据配置的淘汰策略选择删除哪些键。

#### 8 种内存淘汰策略

| 策略 | 作用范围 | 淘汰算法 | 说明 |
|-----|---------|---------|------|
| **noeviction** | - | 不淘汰 | 默认策略，内存满时拒绝写入，返回错误 |
| **allkeys-lru** | 所有键 | LRU | 淘汰最近最少使用的键 |
| **allkeys-lfu** | 所有键 | LFU | 淘汰最少使用频率的键（Redis 4.0+） |
| **allkeys-random** | 所有键 | 随机 | 随机淘汰任意键 |
| **volatile-lru** | 过期键 | LRU | 在设置了过期时间的键中淘汰最近最少使用的 |
| **volatile-lfu** | 过期键 | LFU | 在设置了过期时间的键中淘汰最少使用频率的（Redis 4.0+） |
| **volatile-random** | 过期键 | 随机 | 在设置了过期时间的键中随机淘汰 |
| **volatile-ttl** | 过期键 | TTL | 淘汰剩余 TTL 最短的键 |

#### 详细说明

**1. noeviction（不淘汰）**
- 默认策略
- 内存满时，所有写入命令（SET、LPUSH 等）返回错误
- 只读命令（GET、LRANGE 等）仍可正常执行
- 适用场景：数据不能丢失，宁愿拒绝服务

**2. allkeys-lru（全部键 LRU）**
- 在所有键中使用 LRU（Least Recently Used）算法
- 淘汰最久未被访问的键
- 适用场景：所有键都有可能被访问，希望保留热点数据

**3. allkeys-lfu（全部键 LFU）**
- 在所有键中使用 LFU（Least Frequently Used）算法
- 淘汰访问频率最低的键
- 相比 LRU，更能体现键的真实热度
- 适用场景：数据访问有明显的热点，希望保留高频访问的数据

**4. allkeys-random（全部键随机）**
- 在所有键中随机选择键进行淘汰
- 性能最好，但没有策略性
- 适用场景：所有键同等重要，或者用于测试

**5. volatile-lru（过期键 LRU）**
- 只在设置了过期时间的键中使用 LRU 算法
- 如果没有设置过期时间的键，等同于 noeviction
- 适用场景：区分持久数据和缓存数据

**6. volatile-lfu（过期键 LFU）**
- 只在设置了过期时间的键中使用 LFU 算法
- 如果没有设置过期时间的键，等同于 noeviction
- 适用场景：缓存数据有明显的访问频率差异

**7. volatile-random（过期键随机）**
- 在设置了过期时间的键中随机淘汰
- 如果没有设置过期时间的键，等同于 noeviction
- 适用场景：过期键同等重要

**8. volatile-ttl（最短 TTL）**
- 优先淘汰剩余 TTL（Time To Live）最短的键
- 如果没有设置过期时间的键，等同于 noeviction
- 适用场景：希望快要过期的数据提前清理

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="450" y="25" text-anchor="middle" font-size="20" font-weight="bold">Redis 内存淘汰策略决策树</text>
<rect x="350" y="45" width="200" height="45" fill="#ff6347" stroke="#dc143c" stroke-width="3" rx="8"/>
<text x="450" y="65" text-anchor="middle" font-size="14" font-weight="bold" fill="white">内存达到上限</text>
<text x="450" y="82" text-anchor="middle" font-size="12" fill="white">maxmemory</text>
<line x1="450" y1="90" x2="450" y2="120" stroke="#666" stroke-width="3" marker-end="url(#arrow2)"/>
<rect x="330" y="120" width="240" height="40" fill="#ffd700" stroke="#ff8c00" stroke-width="2" rx="8"/>
<text x="450" y="145" text-anchor="middle" font-size="13" font-weight="bold">选择淘汰策略</text>
<line x1="450" y1="160" x2="450" y2="190" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 190 L 150 190 L 150 220" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 190 L 450 220" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 190 L 750 190 L 750 220" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<rect x="30" y="220" width="240" height="45" fill="#ffe4e1" stroke="#ff69b4" stroke-width="2" rx="8"/>
<text x="150" y="238" text-anchor="middle" font-size="14" font-weight="bold" fill="#dc143c">不淘汰</text>
<text x="150" y="254" text-anchor="middle" font-size="11">noeviction</text>
<rect x="330" y="220" width="240" height="45" fill="#e0f7fa" stroke="#00acc1" stroke-width="2" rx="8"/>
<text x="450" y="238" text-anchor="middle" font-size="14" font-weight="bold" fill="#00695c">全部键淘汰</text>
<text x="450" y="254" text-anchor="middle" font-size="11">allkeys-*</text>
<rect x="630" y="220" width="240" height="45" fill="#fff9c4" stroke="#f9a825" stroke-width="2" rx="8"/>
<text x="750" y="238" text-anchor="middle" font-size="14" font-weight="bold" fill="#f57f17">过期键淘汰</text>
<text x="750" y="254" text-anchor="middle" font-size="11">volatile-*</text>
<line x1="150" y1="265" x2="150" y2="295" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<rect x="50" y="295" width="200" height="50" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="150" y="315" text-anchor="middle" font-size="12" font-weight="bold">拒绝写入</text>
<text x="150" y="332" text-anchor="middle" font-size="10">返回错误</text>
<line x1="450" y1="265" x2="450" y2="295" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 295 L 300 295 L 300 325" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 295 L 450 325" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 295 L 600 295 L 600 325" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<rect x="210" y="325" width="180" height="50" fill="#b2ebf2" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="300" y="345" text-anchor="middle" font-size="12" font-weight="bold">allkeys-lru</text>
<text x="300" y="362" text-anchor="middle" font-size="10">最近最少使用</text>
<rect x="360" y="325" width="180" height="50" fill="#b2ebf2" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="450" y="345" text-anchor="middle" font-size="12" font-weight="bold">allkeys-lfu</text>
<text x="450" y="362" text-anchor="middle" font-size="10">最少使用频率</text>
<rect x="510" y="325" width="180" height="50" fill="#b2ebf2" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="600" y="345" text-anchor="middle" font-size="12" font-weight="bold">allkeys-random</text>
<text x="600" y="362" text-anchor="middle" font-size="10">随机淘汰</text>
<line x1="750" y1="265" x2="750" y2="295" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 750 295 L 570 295 L 570 410" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 750 295 L 680 295 L 680 410" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 750 295 L 790 295 L 790 410" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 750 295 L 870 295 L 870 410" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<rect x="490" y="410" width="160" height="50" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="570" y="430" text-anchor="middle" font-size="12" font-weight="bold">volatile-lru</text>
<text x="570" y="447" text-anchor="middle" font-size="10">过期键 LRU</text>
<rect x="600" y="410" width="160" height="50" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="680" y="430" text-anchor="middle" font-size="12" font-weight="bold">volatile-lfu</text>
<text x="680" y="447" text-anchor="middle" font-size="10">过期键 LFU</text>
<rect x="710" y="410" width="160" height="50" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="790" y="430" text-anchor="middle" font-size="12" font-weight="bold">volatile-random</text>
<text x="790" y="447" text-anchor="middle" font-size="10">过期键随机</text>
<rect x="20" y="390" width="210" height="140" fill="#f0f8ff" stroke="#4682b4" stroke-width="2" rx="8"/>
<text x="125" y="410" text-anchor="middle" font-size="14" font-weight="bold" fill="#4682b4">LRU vs LFU</text>
<text x="30" y="435" font-size="11" fill="#333">LRU (Least Recently Used):</text>
<text x="30" y="450" font-size="10" fill="#666">• 淘汰最久未访问的键</text>
<text x="30" y="463" font-size="10" fill="#666">• 关注时间维度</text>
<text x="30" y="476" font-size="10" fill="#666">• 实现：近似 LRU 算法</text>
<text x="30" y="495" font-size="11" fill="#333">LFU (Least Frequently Used):</text>
<text x="30" y="510" font-size="10" fill="#666">• 淘汰访问频率最低的键</text>
<text x="30" y="523" font-size="10" fill="#666">• 关注频率维度</text>
<rect x="790" y="480" width="100" height="50" fill="#ffe4b5" stroke="#ff8c00" stroke-width="2" rx="5"/>
<text x="840" y="500" text-anchor="middle" font-size="12" font-weight="bold">volatile-ttl</text>
<text x="840" y="517" text-anchor="middle" font-size="10">最短 TTL</text>
<line x1="870" y1="460" x2="870" y2="475" stroke="#666" stroke-width="2"/>
<line x1="870" y1="475" x2="840" y2="475" stroke="#666" stroke-width="2"/>
<line x1="840" y1="475" x2="840" y2="480" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
</svg>

#### LRU vs LFU 对比

**LRU（Least Recently Used - 最近最少使用）**
- 关注时间维度：最久未被访问的数据被淘汰
- 实现：Redis 使用近似 LRU 算法（随机采样）
- 优点：实现简单，性能好
- 缺点：可能淘汰掉偶尔访问但很重要的数据

**LFU（Least Frequently Used - 最少使用频率）**
- 关注频率维度：访问次数最少的数据被淘汰
- 实现：使用计数器记录访问频率
- 优点：更准确反映数据的重要性
- 缺点：实现复杂，需要额外内存存储计数

#### 配置方式

```bash
# redis.conf 配置文件
maxmemory 1gb                      # 设置最大内存
maxmemory-policy allkeys-lru       # 设置淘汰策略

# 运行时动态修改
CONFIG SET maxmemory 1gb
CONFIG SET maxmemory-policy allkeys-lru
```

#### 策略选择建议

| 场景 | 推荐策略 | 理由 |
|-----|---------|------|
| 所有数据同等重要 | allkeys-lru | 保留最近访问的数据 |
| 明显的热点数据 | allkeys-lfu | 保留高频访问的数据 |
| 区分缓存和持久数据 | volatile-lru | 只淘汰临时数据 |
| 数据不能丢失 | noeviction | 拒绝写入，保证数据完整 |
| 快要过期的数据提前清理 | volatile-ttl | 减少无效数据占用 |

**关键要点：**

1. **默认策略是 noeviction**，内存满时会拒绝写入
2. **生产环境建议设置淘汰策略**，避免服务不可用
3. **allkeys-*** 作用于所有键，**volatile-*** 只作用于设置了过期时间的键
4. **LFU 比 LRU 更智能**，但需要 Redis 4.0+ 版本
5. **近似 LRU**：Redis 不是真正的 LRU，而是随机采样后选择最久未使用的
6. **volatile-*** 策略下如果没有过期键，等同于 noeviction

**记忆口诀：**

> **"三类八策略，全过期要分清"**
> - 不淘汰（1）：noeviction 拒绝写
> - 全部键（3）：allkeys + LRU/LFU/Random
> - 过期键（4）：volatile + LRU/LFU/Random/TTL
> LRU 看时间，LFU 看频率，TTL 看剩余
### 24. 如何设置键的过期时间？

**核心答案：**

Redis 提供多种命令设置键的过期时间：
- **EXPIRE**：设置秒级过期时间
- **PEXPIRE**：设置毫秒级过期时间
- **EXPIREAT**：设置 Unix 时间戳过期
- **SETEX**：设置值的同时设置过期时间（原子操作）

**详细说明：**

#### 设置过期时间的命令

**1. EXPIRE - 设置相对过期时间（秒）**
```bash
EXPIRE key seconds

# 示例
SET user:1000 "张三"
EXPIRE user:1000 60           # 60 秒后过期
```

**2. EXPIREAT - 设置绝对过期时间（Unix 时间戳，秒）**
```bash
EXPIREAT key timestamp

# 示例
SET session:abc "token"
EXPIREAT session:abc 1735689600   # 2025-01-01 00:00:00 过期
```

**3. PEXPIRE - 设置相对过期时间（毫秒）**
```bash
PEXPIRE key milliseconds

# 示例
SET cache:item "data"
PEXPIRE cache:item 60000      # 60000 毫秒（60 秒）后过期
```

**4. PEXPIREAT - 设置绝对过期时间（Unix 时间戳，毫秒）**
```bash
PEXPIREAT key milliseconds-timestamp

# 示例
SET temp:data "value"
PEXPIREAT temp:data 1735689600000
```

**5. SET 命令带过期参数**
```bash
# EX 秒级过期
SET key value EX seconds

# PX 毫秒级过期
SET key value PX milliseconds

# EXAT Unix 时间戳过期（秒）
SET key value EXAT timestamp

# PXAT Unix 时间戳过期（毫秒）
SET key value PXAT milliseconds-timestamp

# 示例
SET cache:user "data" EX 3600       # 1 小时后过期
SET token:abc "jwt" PX 86400000     # 24 小时后过期
```

**6. SETEX - 设置字符串并设置过期时间（原子操作）**
```bash
SETEX key seconds value

# 示例
SETEX session:123 3600 "user_token"
# 等价于
SET session:123 "user_token"
EXPIRE session:123 3600
```

#### 查询过期时间的命令

**1. TTL - 查看剩余生存时间（秒）**
```bash
TTL key

# 返回值
# 正整数：剩余秒数
# -1：键存在但没有设置过期时间
# -2：键不存在
```

**2. PTTL - 查看剩余生存时间（毫秒）**
```bash
PTTL key

# 返回值同 TTL，单位为毫秒
```

#### 移除过期时间的命令

**PERSIST - 移除过期时间，使键永久保存**
```bash
PERSIST key

# 示例
SET temp:data "value" EX 60
PERSIST temp:data              # 移除过期时间，变为持久键
```

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="425" y="25" text-anchor="middle" font-size="20" font-weight="bold">Redis 过期时间命令全景图</text>
<rect x="20" y="50" width="810" height="160" fill="#f0f8ff" stroke="#4169e1" stroke-width="2" rx="8"/>
<text x="425" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#4169e1">设置过期时间</text>
<rect x="40" y="90" width="180" height="100" fill="#ffe4e1" stroke="#ff6347" stroke-width="2" rx="5"/>
<text x="130" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc143c">相对时间</text>
<text x="50" y="135" font-size="11" fill="#333" font-family="monospace">EXPIRE key 60</text>
<text x="50" y="150" font-size="10" fill="#666">秒级</text>
<text x="50" y="170" font-size="11" fill="#333" font-family="monospace">PEXPIRE key 60000</text>
<text x="50" y="185" font-size="10" fill="#666">毫秒级</text>
<rect x="240" y="90" width="180" height="100" fill="#fff0f5" stroke="#ff1493" stroke-width="2" rx="5"/>
<text x="330" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#c71585">绝对时间</text>
<text x="250" y="135" font-size="11" fill="#333" font-family="monospace">EXPIREAT key ts</text>
<text x="250" y="150" font-size="10" fill="#666">秒级时间戳</text>
<text x="250" y="170" font-size="11" fill="#333" font-family="monospace">PEXPIREAT key ts</text>
<text x="250" y="185" font-size="10" fill="#666">毫秒级时间戳</text>
<rect x="440" y="90" width="180" height="100" fill="#f0fff0" stroke="#32cd32" stroke-width="2" rx="5"/>
<text x="530" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#228b22">SET 带选项</text>
<text x="450" y="135" font-size="11" fill="#333" font-family="monospace">SET k v EX 60</text>
<text x="450" y="150" font-size="10" fill="#666">秒级</text>
<text x="450" y="170" font-size="11" fill="#333" font-family="monospace">SET k v PX 60000</text>
<text x="450" y="185" font-size="10" fill="#666">毫秒级</text>
<rect x="640" y="90" width="180" height="100" fill="#fffacd" stroke="#ffd700" stroke-width="2" rx="5"/>
<text x="730" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#ff8c00">原子操作</text>
<text x="650" y="135" font-size="11" fill="#333" font-family="monospace">SETEX k 60 v</text>
<text x="650" y="150" font-size="10" fill="#666">设置+过期（秒）</text>
<text x="650" y="170" font-size="11" fill="#333" font-family="monospace">PSETEX k 60000 v</text>
<text x="650" y="185" font-size="10" fill="#666">设置+过期（毫秒）</text>
<rect x="20" y="230" width="400" height="160" fill="#fff5ee" stroke="#ff8c00" stroke-width="2" rx="8"/>
<text x="220" y="255" text-anchor="middle" font-size="16" font-weight="bold" fill="#ff6347">查询过期时间</text>
<rect x="40" y="270" width="170" height="100" fill="#ffe4b5" stroke="#daa520" stroke-width="2" rx="5"/>
<text x="125" y="290" text-anchor="middle" font-size="13" font-weight="bold">TTL key</text>
<text x="50" y="315" font-size="11" fill="#333">返回值（秒）：</text>
<text x="50" y="332" font-size="10" fill="#228b22" font-family="monospace">&gt; 0</text>
<text x="95" y="332" font-size="10" fill="#666">剩余秒数</text>
<text x="50" y="347" font-size="10" fill="#dc143c" font-family="monospace">-1</text>
<text x="80" y="347" font-size="10" fill="#666">无过期时间</text>
<text x="50" y="362" font-size="10" fill="#dc143c" font-family="monospace">-2</text>
<text x="80" y="362" font-size="10" fill="#666">键不存在</text>
<rect x="230" y="270" width="170" height="100" fill="#ffe4b5" stroke="#daa520" stroke-width="2" rx="5"/>
<text x="315" y="290" text-anchor="middle" font-size="13" font-weight="bold">PTTL key</text>
<text x="240" y="315" font-size="11" fill="#333">返回值（毫秒）：</text>
<text x="240" y="332" font-size="10" fill="#228b22" font-family="monospace">&gt; 0</text>
<text x="285" y="332" font-size="10" fill="#666">剩余毫秒数</text>
<text x="240" y="347" font-size="10" fill="#dc143c" font-family="monospace">-1</text>
<text x="270" y="347" font-size="10" fill="#666">无过期时间</text>
<text x="240" y="362" font-size="10" fill="#dc143c" font-family="monospace">-2</text>
<text x="270" y="362" font-size="10" fill="#666">键不存在</text>
<rect x="430" y="230" width="400" height="160" fill="#f0f8ff" stroke="#4682b4" stroke-width="2" rx="8"/>
<text x="630" y="255" text-anchor="middle" font-size="16" font-weight="bold" fill="#4169e1">移除过期时间</text>
<rect x="470" y="270" width="320" height="100" fill="#e0ffff" stroke="#5f9ea0" stroke-width="2" rx="5"/>
<text x="630" y="295" text-anchor="middle" font-size="13" font-weight="bold">PERSIST key</text>
<text x="480" y="320" font-size="11" fill="#333">作用：移除键的过期时间</text>
<text x="480" y="340" font-size="11" fill="#333">结果：键变为永久保存</text>
<text x="480" y="360" font-size="11" fill="#228b22" font-family="monospace">返回 1</text>
<text x="540" y="360" font-size="11" fill="#666">成功移除</text>
<rect x="20" y="410" width="810" height="180" fill="#fafafa" stroke="#888" stroke-width="2" rx="8"/>
<text x="425" y="435" text-anchor="middle" font-size="16" font-weight="bold">完整示例</text>
<g font-family="monospace" font-size="11">
<text x="40" y="460" fill="#0066cc">127.0.0.1:6379&gt;</text>
<text x="160" y="460" fill="#333">SET user:1000 "张三" EX 60</text>
<text x="40" y="477" fill="#228b22">OK</text>
<text x="40" y="497" fill="#0066cc">127.0.0.1:6379&gt;</text>
<text x="160" y="497" fill="#333">TTL user:1000</text>
<text x="40" y="514" fill="#228b22">(integer) 57</text>
<text x="480" y="514" fill="#999">← 剩余 57 秒</text>
<text x="40" y="534" fill="#0066cc">127.0.0.1:6379&gt;</text>
<text x="160" y="534" fill="#333">PERSIST user:1000</text>
<text x="40" y="551" fill="#228b22">(integer) 1</text>
<text x="480" y="551" fill="#999">← 成功移除过期时间</text>
<text x="40" y="571" fill="#0066cc">127.0.0.1:6379&gt;</text>
<text x="160" y="571" fill="#333">TTL user:1000</text>
<text x="40" y="588" fill="#228b22">(integer) -1</text>
<text x="480" y="588" fill="#999">← -1 表示无过期时间</text>
</g>
</svg>

#### 命令对比表

| 命令 | 单位 | 时间类型 | 原子性 | 用途 |
|------|-----|---------|--------|------|
| EXPIRE | 秒 | 相对 | 否 | 最常用的过期设置 |
| PEXPIRE | 毫秒 | 相对 | 否 | 需要毫秒级精度 |
| EXPIREAT | 秒 | 绝对 | 否 | 指定具体过期时刻 |
| PEXPIREAT | 毫秒 | 绝对 | 否 | 毫秒级时间戳 |
| SET...EX | 秒 | 相对 | 是 | 设置值和过期时间 |
| SET...PX | 毫秒 | 相对 | 是 | 设置值和过期时间 |
| SETEX | 秒 | 相对 | 是 | 专门用于字符串 |

#### 注意事项

**1. 过期时间的更新**
```bash
# 重新设置键会移除过期时间
SET user:1000 "张三" EX 60
SET user:1000 "李四"          # 过期时间被移除！

# 正确做法：重新设置过期时间
SET user:1000 "李四" EX 60
```

**2. 过期时间的精度**
- 过期时间的精度可以是 1 毫秒
- 但是过期删除可能有延迟（惰性删除 + 定期删除）
- 不保证键在过期时刻立即被删除

**3. 持久化的影响**
- **RDB**：保存时会检查键是否过期，过期的不会保存
- **AOF**：过期删除会追加 DEL 命令
- **主从复制**：从节点不会自己删除过期键，等待主节点的 DEL 命令

**4. 时钟依赖**
- 过期时间依赖系统时钟
- 如果系统时间回退，可能导致键提前或延迟过期
- 分布式环境需要保证时钟同步（NTP）

**关键要点：**

1. **推荐使用 SET...EX/PX**：原子操作，避免竞态条件
2. **相对时间 vs 绝对时间**：
   - 相对时间：EXPIRE/PEXPIRE，从当前时间开始计算
   - 绝对时间：EXPIREAT/PEXPIREAT，指定具体时间戳
3. **秒 vs 毫秒**：根据业务需求选择精度
4. **TTL 返回值**：
   - 正整数：剩余时间
   - -1：键存在但无过期时间
   - -2：键不存在
5. **PERSIST 场景**：将临时数据转为永久数据
6. **重新设置键会清除过期时间**，需要重新设置

**记忆口诀：**

> **"设查移三大类，秒毫相绝要分清"**
> - 设置：EXPIRE/PEXPIRE（相对）、EXPIREAT/PEXPIREAT（绝对）
> - 查询：TTL/PTTL（-1 无期，-2 不在）
> - 移除：PERSIST（变永久）
> - 原子：SETEX、SET...EX（推荐用）
### 25. 过期的 key 会被立即删除吗？

**核心答案：**

**不会**。过期的 key 不会被立即删除。Redis 采用 **惰性删除 + 定期删除** 的策略，过期键可能在过期后的一段时间内仍然存在于内存中。

**详细说明：**

#### 为什么不立即删除？

**性能考虑：**
- 如果每个键过期时都立即删除（定时删除），需要为每个键创建定时器
- 大量定时器会消耗大量 CPU 资源
- Redis 是单线程模型，删除操作会阻塞主线程
- 立即删除的性价比很低，不适合高性能场景

**Redis 的实际策略：**
1. **惰性删除**：访问时才检查，过期则删除
2. **定期删除**：后台定期随机抽样检查并删除
3. **内存淘汰**：内存不足时触发淘汰策略

#### 过期键的生命周期

```
设置过期时间              过期时刻              实际删除
     |                      |                     |
     v                      v                     v
[SET key EX 60] ----60秒---→ [键已过期] ----?秒---→ [被删除]
                                    ↑
                            但仍在内存中！
```

#### 三种删除时机

**1. 访问时删除（惰性删除）**
```bash
# 10:00:00 - 设置键，60 秒后过期
SET session:123 "token" EX 60

# 10:01:01 - 键已过期（过期 1 秒）
# 此时键仍在内存中

# 10:01:05 - 尝试访问
GET session:123
# Redis 检查发现已过期，立即删除并返回 nil
```

**2. 定期删除（周期性清理）**
```bash
# Redis 每秒 10 次执行定期删除
# 随机抽取 20 个过期键
# 删除其中已过期的键
# 如果超过 25% 的键过期，继续抽取
```

**3. 内存淘汰（被动触发）**
```bash
# 当内存达到 maxmemory 限制
# 触发配置的内存淘汰策略
# 可能会删除过期键（取决于策略）
```

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="425" y="25" text-anchor="middle" font-size="20" font-weight="bold">过期键的删除时机</text>
<rect x="50" y="50" width="750" height="480" fill="#fafafa" stroke="#888" stroke-width="2" rx="8"/>
<line x1="100" y1="100" x2="750" y2="100" stroke="#333" stroke-width="2"/>
<text x="90" y="105" text-anchor="end" font-size="12">时间轴</text>
<circle cx="150" cy="100" r="8" fill="#32cd32" stroke="#228b22" stroke-width="2"/>
<text x="150" y="85" text-anchor="middle" font-size="11" font-weight="bold">T0</text>
<text x="150" y="130" text-anchor="middle" font-size="10" fill="#228b22">设置键</text>
<text x="150" y="145" text-anchor="middle" font-size="9" font-family="monospace">SET k "v"</text>
<text x="150" y="160" text-anchor="middle" font-size="9" font-family="monospace">EX 60</text>
<line x1="150" y1="100" x2="350" y2="100" stroke="#ffa500" stroke-width="3" stroke-dasharray="5,5"/>
<circle cx="350" cy="100" r="8" fill="#ff6347" stroke="#dc143c" stroke-width="2"/>
<text x="350" y="85" text-anchor="middle" font-size="11" font-weight="bold">T0+60s</text>
<text x="350" y="130" text-anchor="middle" font-size="10" fill="#dc143c" font-weight="bold">⚠️ 键已过期</text>
<text x="350" y="145" text-anchor="middle" font-size="9" fill="#666">但仍在内存中</text>
<rect x="380" y="70" width="360" height="420" fill="#fff9f0" stroke="#ff8c00" stroke-width="2" rx="5"/>
<text x="560" y="95" text-anchor="middle" font-size="14" font-weight="bold" fill="#ff6347">可能的删除时机</text>
<rect x="400" y="110" width="320" height="110" fill="#f0fff0" stroke="#32cd32" stroke-width="2" rx="5"/>
<text x="560" y="130" text-anchor="middle" font-size="13" font-weight="bold" fill="#228b22">① 惰性删除</text>
<text x="410" y="150" font-size="10" fill="#333">触发条件：客户端访问该键</text>
<text x="410" y="170" font-size="10" fill="#333" font-family="monospace">GET key / SET key / EXISTS key</text>
<text x="410" y="190" font-size="10" fill="#228b22">✅ 删除时机：访问时立即删除</text>
<text x="410" y="210" font-size="10" fill="#dc143c">❌ 问题：不访问则一直占用内存</text>
<rect x="400" y="230" width="320" height="110" fill="#fffacd" stroke="#ffd700" stroke-width="2" rx="5"/>
<text x="560" y="250" text-anchor="middle" font-size="13" font-weight="bold" fill="#ff8c00">② 定期删除</text>
<text x="410" y="270" font-size="10" fill="#333">触发条件：定时事件（每秒 10 次）</text>
<text x="410" y="290" font-size="10" fill="#333">随机抽取 20 个键检查</text>
<text x="410" y="310" font-size="10" fill="#228b22">✅ 删除时机：后台周期性删除</text>
<text x="410" y="330" font-size="10" fill="#dc143c">❌ 问题：随机性，可能延迟删除</text>
<rect x="400" y="350" width="320" height="130" fill="#ffe4e1" stroke="#ff69b4" stroke-width="2" rx="5"/>
<text x="560" y="370" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc143c">③ 内存淘汰</text>
<text x="410" y="390" font-size="10" fill="#333">触发条件：内存达到 maxmemory</text>
<text x="410" y="410" font-size="10" fill="#333">根据淘汰策略选择删除的键</text>
<text x="410" y="430" font-size="10" fill="#228b22">✅ 删除时机：内存不足时强制删除</text>
<text x="410" y="450" font-size="10" fill="#dc143c">❌ 问题：可能删除未过期的键</text>
<text x="410" y="470" font-size="9" fill="#666">（如果策略是 allkeys-*）</text>
<rect x="70" y="180" width="280" height="150" fill="#f0f8ff" stroke="#4682b4" stroke-width="2" rx="5"/>
<text x="210" y="205" text-anchor="middle" font-size="14" font-weight="bold" fill="#4169e1">实际场景示例</text>
<g font-family="monospace" font-size="10">
<text x="80" y="230" fill="#666">10:00:00</text>
<text x="145" y="230" fill="#333">SET session "abc" EX 60</text>
<text x="80" y="250" fill="#666">10:01:00</text>
<text x="145" y="250" fill="#dc143c">← 键已过期</text>
<text x="80" y="270" fill="#666">10:01:05</text>
<text x="145" y="270" fill="#999">键仍在内存中...</text>
<text x="80" y="290" fill="#666">10:01:30</text>
<text x="145" y="290" fill="#228b22">GET session → nil</text>
<text x="145" y="305" fill="#999">（访问时被删除）</text>
<text x="80" y="325" fill="#999">或</text>
<text x="80" y="320" fill="#666">10:01:10</text>
<text x="145" y="320" fill="#ffa500">定期删除扫描到</text>
</g>
<rect x="70" y="350" width="280" height="140" fill="#fff5f5" stroke="#dc143c" stroke-width="2" rx="5"/>
<text x="210" y="375" text-anchor="middle" font-size="14" font-weight="bold" fill="#dc143c">⚠️ 潜在问题</text>
<text x="80" y="400" font-size="10" fill="#333">1. <tspan font-weight="bold">内存占用</tspan>：过期键占用内存</text>
<text x="80" y="420" font-size="10" fill="#333">2. <tspan font-weight="bold">数据一致性</tspan>：主从可能不一致</text>
<text x="80" y="440" font-size="10" fill="#333">3. <tspan font-weight="bold">业务风险</tspan>：依赖立即删除的</text>
<text x="95" y="455" font-size="10" fill="#333">业务逻辑可能出错</text>
<text x="80" y="475" font-size="9" fill="#666">（如：限流、防重放等）</text>
</svg>

#### 潜在问题和影响

**1. 内存占用问题**
```bash
# 场景：大量键同时过期
# 100万个键在 10:00:00 同时过期
# 但这些键可能在几秒甚至几分钟后才被删除
# 期间占用大量内存

# 影响
- 内存使用率虚高
- 可能触发内存告警
- 可能影响其他业务
```

**2. 主从复制的延迟**
```bash
# 主从模式下的问题
主节点：过期键被删除，发送 DEL 命令
从节点：等待 DEL 命令，期间过期键仍然存在

# 可能导致
- 从节点返回已过期的数据
- 主从数据短暂不一致
```

**3. 业务逻辑风险**
```bash
# 错误的依赖方式
# ❌ 错误：依赖键过期后立即消失
SET rate_limit:user:123 1 EX 1
# ... 1 秒后
EXISTS rate_limit:user:123  # 可能仍返回 1！

# ✅ 正确：检查 TTL
ttl = TTL rate_limit:user:123
if ttl > 0:
    # 键仍有效
else:
    # 键已过期或不存在
```

#### 最佳实践

**1. 不要依赖立即删除**
```bash
# 错误做法
SET lock:resource 1 EX 10
# 期望 10 秒后锁自动释放并立即可用

# 正确做法
# 使用 SET NX 检查锁是否存在
# 或使用专门的分布式锁（如 Redlock）
```

**2. 合理设置过期时间**
```bash
# 避免大量键同时过期
# 在过期时间上增加随机值
expire_time = 3600 + random(0, 60)
SET key value EX $expire_time
```

**3. 监控内存使用**
```bash
# 监控指标
INFO memory
INFO stats

# 关注
- used_memory：实际使用内存
- expired_keys：过期键删除数量
- evicted_keys：淘汰键数量
```

**4. 配置合理的淘汰策略**
```bash
# redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru

# 避免使用 noeviction（默认）
# 生产环境建议使用 allkeys-lru 或 volatile-lru
```

**关键要点：**

1. **过期 ≠ 立即删除**：过期键可能在内存中存在一段时间
2. **删除时机不确定**：取决于是否被访问、定期删除的随机性
3. **内存占用风险**：大量过期键可能占用大量内存
4. **主从不一致**：从节点的过期键删除有延迟
5. **不要依赖立即删除**：业务逻辑不应假设键过期后立即消失
6. **使用 TTL 检查**：而不是依赖键是否存在
7. **配置淘汰策略**：避免内存耗尽导致服务不可用

**实际案例：**

```bash
# 场景：Redis 内存占用异常高
# 原因：大量过期键未被及时清理

# 排查
INFO keyspace
# 发现大量带过期时间的键

# 解决方案
1. 手动触发 SCAN + DEL 清理过期键
2. 调整定期删除的参数（不推荐）
3. 配置合理的内存淘汰策略
4. 业务层面避免大量键同时过期
```

**记忆口诀：**

> **"过期不删，等你来拿"**
> - 过期键不会立即删除
> - 访问时删除（惰性）
> - 定期抽查删除（定期）
> - 内存不足强制删除（淘汰）
> - 业务不要依赖立即删除


## 缓存问题

### 26. 什么是缓存穿透？如何解决？

**核心答案：**

**缓存穿透**是指查询一个**不存在的数据**，由于缓存和数据库都没有该数据，导致每次请求都会穿透缓存直接查询数据库，给数据库带来巨大压力。

**解决方案：**
1. **布隆过滤器（推荐）**：在缓存前增加一层布隆过滤器，快速判断数据是否存在
2. **缓存空值**：将不存在的数据也缓存起来，设置较短的过期时间
3. **参数校验**：在接口层对参数进行合法性校验

**详细说明：**

#### 问题场景

**正常请求流程：**
```
客户端 → 缓存（有数据）→ 返回
客户端 → 缓存（无数据）→ 数据库（有数据）→ 写缓存 → 返回
```

**缓存穿透流程：**
```
客户端 → 缓存（无数据）→ 数据库（无数据）→ 返回空
客户端 → 缓存（无数据）→ 数据库（无数据）→ 返回空  ← 持续穿透！
```

**典型场景：**
```bash
# 恶意查询不存在的用户
GET /user/999999999  # 用户不存在
GET /user/888888888  # 用户不存在
GET /user/777777777  # 用户不存在
# 每次都会查询缓存（miss）→ 查询数据库（miss）
```

**危害：**
1. 大量请求直接打到数据库
2. 数据库压力剧增，可能被打垮
3. 缓存完全失去作用
4. 系统响应变慢或不可用
5. 容易被恶意攻击利用

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="450" y="25" text-anchor="middle" font-size="20" font-weight="bold">缓存穿透问题示意图</text>
<rect x="50" y="50" width="800" height="240" fill="#ffe4e1" stroke="#dc143c" stroke-width="3" rx="8"/>
<text x="450" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc143c">❌ 缓存穿透场景</text>
<rect x="100" y="100" width="120" height="80" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="5"/>
<text x="160" y="130" text-anchor="middle" font-size="14" font-weight="bold">客户端</text>
<text x="160" y="150" text-anchor="middle" font-size="11">查询 user:999</text>
<text x="160" y="165" text-anchor="middle" font-size="10" fill="#dc143c">(不存在)</text>
<rect x="320" y="100" width="120" height="80" fill="#ffd700" stroke="#ff8c00" stroke-width="2" rx="5"/>
<text x="380" y="130" text-anchor="middle" font-size="14" font-weight="bold">Redis</text>
<text x="380" y="150" text-anchor="middle" font-size="11">缓存</text>
<text x="380" y="165" text-anchor="middle" font-size="10" fill="#dc143c">❌ 不存在</text>
<rect x="540" y="100" width="120" height="80" fill="#90ee90" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="600" y="130" text-anchor="middle" font-size="14" font-weight="bold">MySQL</text>
<text x="600" y="150" text-anchor="middle" font-size="11">数据库</text>
<text x="600" y="165" text-anchor="middle" font-size="10" fill="#dc143c">❌ 不存在</text>
<line x1="220" y1="130" x2="310" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="265" y="120" text-anchor="middle" font-size="10" fill="#333">① 查询缓存</text>
<line x1="440" y1="130" x2="530" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="485" y="120" text-anchor="middle" font-size="10" fill="#333">② 缓存未命中</text>
<text x="485" y="133" text-anchor="middle" font-size="10" fill="#333">查询数据库</text>
<line x1="530" y1="150" x2="450" y2="150" stroke="#dc143c" stroke-width="2" marker-end="url(#arrow5)" stroke-dasharray="5,5"/>
<text x="490" y="143" text-anchor="middle" font-size="10" fill="#dc143c">③ 数据不存在</text>
<line x1="320" y1="150" x2="230" y2="150" stroke="#dc143c" stroke-width="2" marker-end="url(#arrow5)" stroke-dasharray="5,5"/>
<text x="275" y="143" text-anchor="middle" font-size="10" fill="#dc143c">④ 返回空</text>
<text x="160" y="210" text-anchor="middle" font-size="11" fill="#dc143c" font-weight="bold">⚠️ 下次请求重复上述流程</text>
<text x="160" y="225" text-anchor="middle" font-size="10" fill="#666">大量不存在的数据请求</text>
<text x="160" y="240" text-anchor="middle" font-size="10" fill="#666">持续穿透到数据库</text>
<ellipse cx="600" cy="220" rx="80" ry="40" fill="none" stroke="#dc143c" stroke-width="3" stroke-dasharray="10,5"/>
<text x="600" y="215" text-anchor="middle" font-size="12" fill="#dc143c" font-weight="bold">数据库压力</text>
<text x="600" y="230" text-anchor="middle" font-size="11" fill="#dc143c">持续增加 ↑↑↑</text>
<rect x="50" y="310" width="800" height="270" fill="#f0fff0" stroke="#32cd32" stroke-width="3" rx="8"/>
<text x="450" y="335" text-anchor="middle" font-size="16" font-weight="bold" fill="#228b22">✅ 解决方案对比</text>
<rect x="80" y="355" width="230" height="200" fill="#e0f7fa" stroke="#00acc1" stroke-width="2" rx="5"/>
<text x="195" y="380" text-anchor="middle" font-size="14" font-weight="bold" fill="#00695c">① 布隆过滤器</text>
<text x="90" y="405" font-size="11" fill="#333">原理：</text>
<text x="95" y="422" font-size="10" fill="#666">• 初始化时加载所有数据 ID</text>
<text x="95" y="437" font-size="10" fill="#666">• 请求先经过布隆过滤器</text>
<text x="95" y="452" font-size="10" fill="#666">• 不存在直接拒绝</text>
<text x="90" y="475" font-size="11" fill="#228b22">优点：</text>
<text x="95" y="490" font-size="10" fill="#666">• 内存占用极小</text>
<text x="95" y="505" font-size="10" fill="#666">• 查询速度快 O(k)</text>
<text x="90" y="528" font-size="11" fill="#dc143c">缺点：</text>
<text x="95" y="543" font-size="10" fill="#666">• 存在误判率（约 1%）</text>
<rect x="330" y="355" width="230" height="200" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="445" y="380" text-anchor="middle" font-size="14" font-weight="bold" fill="#f57f17">② 缓存空值</text>
<text x="340" y="405" font-size="11" fill="#333">原理：</text>
<text x="345" y="422" font-size="10" fill="#666">• 数据库无数据时</text>
<text x="345" y="437" font-size="10" fill="#666">• 缓存设置空值标记</text>
<text x="345" y="452" font-size="10" fill="#666">• 下次直接返回空</text>
<text x="340" y="475" font-size="11" fill="#228b22">优点：</text>
<text x="345" y="490" font-size="10" fill="#666">• 实现简单</text>
<text x="345" y="505" font-size="10" fill="#666">• 完全避免穿透</text>
<text x="340" y="528" font-size="11" fill="#dc143c">缺点：</text>
<text x="345" y="543" font-size="10" fill="#666">• 占用缓存空间</text>
<rect x="580" y="355" width="230" height="200" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="695" y="380" text-anchor="middle" font-size="14" font-weight="bold" fill="#7b1fa2">③ 参数校验</text>
<text x="590" y="405" font-size="11" fill="#333">原理：</text>
<text x="595" y="422" font-size="10" fill="#666">• 接口层参数验证</text>
<text x="595" y="437" font-size="10" fill="#666">• 非法参数直接拒绝</text>
<text x="595" y="452" font-size="10" fill="#666">• 限制请求频率</text>
<text x="590" y="475" font-size="11" fill="#228b22">优点：</text>
<text x="595" y="490" font-size="10" fill="#666">• 简单有效</text>
<text x="595" y="505" font-size="10" fill="#666">• 防止恶意攻击</text>
<text x="590" y="528" font-size="11" fill="#dc143c">缺点：</text>
<text x="595" y="543" font-size="10" fill="#666">• 无法完全避免</text>
</svg>

#### 解决方案详解

**方案一：布隆过滤器（推荐）**

**原理：**
- 布隆过滤器是一种空间效率极高的概率型数据结构
- 用于判断一个元素是否在集合中
- 可能有误判（False Positive），但不会漏判（False Negative）

**实现步骤：**
```java
// 1. 初始化布隆过滤器
BloomFilter<Long> bloomFilter = BloomFilter.create(
    Funnels.longFunnel(),
    100000000,  // 预期数据量
    0.01        // 误判率 1%
);

// 2. 启动时加载所有有效 ID
List<Long> userIds = userDao.getAllUserIds();
for (Long userId : userIds) {
    bloomFilter.put(userId);
}

// 3. 查询时先过滤
public User getUser(Long userId) {
    // 先查布隆过滤器
    if (!bloomFilter.mightContain(userId)) {
        return null;  // 一定不存在，直接返回
    }

    // 可能存在，继续查询缓存和数据库
    User user = redis.get("user:" + userId);
    if (user == null) {
        user = db.getUser(userId);
        if (user != null) {
            redis.set("user:" + userId, user);
        }
    }
    return user;
}
```

**优点：**
- 内存占用极小（1 亿数据约 12MB）
- 查询速度极快（O(k)，k 为哈希函数个数）
- 可以过滤绝大部分不存在的请求

**缺点：**
- 存在误判率（约 1%），但可以接受
- 不支持删除（可使用 Counting Bloom Filter）
- 需要定期更新（新增数据时需要添加到过滤器）

**方案二：缓存空值**

**实现步骤：**
```java
public User getUser(Long userId) {
    // 1. 查询缓存
    String cacheKey = "user:" + userId;
    String value = redis.get(cacheKey);

    // 2. 缓存命中
    if (value != null) {
        if ("NULL".equals(value)) {
            return null;  // 空值标记
        }
        return JSON.parseObject(value, User.class);
    }

    // 3. 查询数据库
    User user = db.getUser(userId);

    // 4. 数据库也没有，缓存空值
    if (user == null) {
        redis.setex(cacheKey, 300, "NULL");  // 5 分钟过期
        return null;
    }

    // 5. 正常缓存数据
    redis.setex(cacheKey, 3600, JSON.toJSONString(user));
    return user;
}
```

**优点：**
- 实现简单，易于理解
- 完全避免了缓存穿透
- 不存在误判

**缺点：**
- 占用缓存空间
- 短期数据不一致（空值过期前，新增数据无法查到）
- 恶意攻击时，大量不同的不存在 ID 会占满缓存

**优化：**
- 空值设置较短的过期时间（5-10 分钟）
- 结合布隆过滤器使用

**方案三：参数校验 + 限流**

**实现步骤：**
```java
@RestController
public class UserController {

    @GetMapping("/user/{userId}")
    @RateLimit(limit = 100, period = 60)  // 限流
    public User getUser(@PathVariable Long userId) {
        // 1. 参数校验
        if (userId == null || userId <= 0 || userId > 10000000) {
            throw new IllegalArgumentException("非法的用户 ID");
        }

        // 2. IP 黑名单检查
        if (isBlacklisted(getClientIp())) {
            throw new ForbiddenException("IP 已被封禁");
        }

        // 3. 正常查询
        return userService.getUser(userId);
    }
}
```

**优点：**
- 在入口处拦截非法请求
- 防止恶意攻击
- 保护后端服务

**缺点：**
- 无法完全避免缓存穿透
- 需要维护黑名单
- 限流可能影响正常用户

#### 综合方案（推荐）

**多层防护：**
```
1. 接口层：参数校验 + 限流
2. 缓存前：布隆过滤器快速过滤
3. 缓存层：缓存空值（短期）
4. 监控层：异常请求告警
```

**实现代码：**
```java
public User getUser(Long userId) {
    // 第一层：参数校验
    if (userId == null || userId <= 0) {
        return null;
    }

    // 第二层：布隆过滤器
    if (!bloomFilter.mightContain(userId)) {
        return null;  // 一定不存在
    }

    // 第三层：查询缓存
    String cacheKey = "user:" + userId;
    String value = redis.get(cacheKey);
    if (value != null) {
        return "NULL".equals(value) ? null : JSON.parseObject(value, User.class);
    }

    // 第四层：查询数据库
    User user = db.getUser(userId);

    // 第五层：缓存结果（包括空值）
    if (user == null) {
        redis.setex(cacheKey, 300, "NULL");  // 空值缓存 5 分钟
    } else {
        redis.setex(cacheKey, 3600, JSON.toJSONString(user));
    }

    return user;
}
```

**关键要点：**

1. **缓存穿透的本质**：查询不存在的数据，缓存失去作用
2. **危害严重**：大量请求直接打到数据库，可能导致数据库崩溃
3. **布隆过滤器是最优解**：空间小、速度快、效果好
4. **缓存空值简单有效**：但要注意过期时间和空间占用
5. **多层防护最安全**：参数校验 + 布隆过滤器 + 缓存空值
6. **监控很重要**：及时发现异常请求，快速响应
7. **定期更新过滤器**：新增数据时要同步更新布隆过滤器

**实际案例：**

```bash
# 场景：电商系统遭受缓存穿透攻击
# 攻击者使用不存在的商品 ID 疯狂请求

# 问题现象
- 数据库 CPU 100%
- 查询响应时间从 10ms 上升到 5s
- 正常用户无法访问

# 解决方案
1. 紧急限流，封禁攻击 IP
2. 增加参数校验（商品 ID 范围）
3. 部署布隆过滤器
4. 缓存空值，过期时间 5 分钟

# 效果
- 数据库压力降低 95%
- 响应时间恢复到 20ms
- 成功防御攻击
```

**记忆口诀：**

> **"不存在的数据，穿透到数据库"**
> - 穿透原因：数据不存在，缓存和数据库都没有
> - 布隆过滤：提前拦截，不存在的不让过
> - 缓存空值：查过一次，空结果也缓存
> - 参数校验：入口拦截，非法请求不接受
> - 多层防护：层层把关，确保万无一失

### 27. 什么是缓存击穿？如何解决？

**核心答案：**

**缓存击穿**是指一个**热点 key** 在缓存过期的瞬间，有大量并发请求同时访问这个 key，导致所有请求都打到数据库，造成数据库瞬时压力骤增。

**解决方案：**
1. **互斥锁（Mutex）**：只让一个线程查询数据库，其他线程等待
2. **逻辑过期**：不设置物理过期时间，用逻辑字段标记过期
3. **提前更新**：在key快过期前主动刷新

**详细说明：**

#### 问题场景

**正常情况：**
```
时刻 1: key 存在 → 100 个请求 → 全部命中缓存 ✅
时刻 2: key 过期 → 第1个请求 → 查DB → 写缓存 → 返回 ✅
时刻 3: key 存在 → 99 个请求 → 全部命中缓存 ✅
```

**缓存击穿情况：**
```
时刻 1: key 存在 → 100 个请求 → 全部命中缓存 ✅
时刻 2: key 过期 → 100 个请求同时到达 → 全部查DB ❌
       ↓
       数据库瞬间压力激增！
```

**典型场景：**
```bash
# 热门商品详情在高峰期过期
商品ID: product:hot_item_001
访问量: 10万 QPS
过期时间: 正好在秒杀活动期间过期
结果: 10万个请求同时查询数据库
```

**缓存击穿 vs 缓存穿透 vs 缓存雪崩：**

| 维度 | 缓存击穿 | 缓存穿透 | 缓存雪崩 |
|-----|---------|---------|---------|
| 问题 | 热点key过期 | 查询不存在的数据 | 大量key同时过期 |
| 影响 | 单个热点key | 任意不存在的key | 大量key |
| 频率 | 低（偶发） | 持续 | 低（偶发） |
| 危害 | 数据库瞬时压力大 | 数据库持续压力 | 数据库雪崩 |

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow6" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="450" y="25" text-anchor="middle" font-size="20" font-weight="bold">缓存击穿问题示意图</text>
<rect x="50" y="50" width="800" height="250" fill="#ffe4e1" stroke="#dc143c" stroke-width="3" rx="8"/>
<text x="450" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc143c">❌ 缓存击穿场景</text>
<rect x="100" y="100" width="650" height="40" fill="#ffd700" stroke="#ff8c00" stroke-width="2" rx="5"/>
<text x="425" y="125" text-anchor="middle" font-size="13" font-weight="bold">热点 key (product:1000) 过期时刻</text>
<g transform="translate(100, 150)">
<rect x="0" y="0" width="80" height="45" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="3"/>
<text x="40" y="25" text-anchor="middle" font-size="11">请求1</text>
<rect x="95" y="0" width="80" height="45" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="3"/>
<text x="135" y="25" text-anchor="middle" font-size="11">请求2</text>
<rect x="190" y="0" width="80" height="45" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="3"/>
<text x="230" y="25" text-anchor="middle" font-size="11">请求3</text>
<rect x="285" y="0" width="80" height="45" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="3"/>
<text x="325" y="25" text-anchor="middle" font-size="11">...</text>
<rect x="380" y="0" width="80" height="45" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="3"/>
<text x="420" y="25" text-anchor="middle" font-size="11">请求100</text>
</g>
<line x1="425" y1="205" x2="425" y2="230" stroke="#dc143c" stroke-width="3" marker-end="url(#arrow6)"/>
<text x="450" y="225" font-size="12" fill="#dc143c" font-weight="bold">同时</text>
<rect x="320" y="235" width="210" height="50" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="425" y="255" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc143c">Redis 缓存 miss!</text>
<text x="425" y="275" text-anchor="middle" font-size="11" fill="#666">所有请求同时查询数据库</text>
<ellipse cx="425" cy="250" rx="160" ry="60" fill="none" stroke="#dc143c" stroke-width="3" stroke-dasharray="10,5"/>
<rect x="50" y="320" width="800" height="310" fill="#f0fff0" stroke="#32cd32" stroke-width="3" rx="8"/>
<text x="450" y="345" text-anchor="middle" font-size="16" font-weight="bold" fill="#228b22">✅ 解决方案对比</text>
<rect x="80" y="365" width="230" height="240" fill="#e0f7fa" stroke="#00acc1" stroke-width="2" rx="5"/>
<text x="195" y="390" text-anchor="middle" font-size="14" font-weight="bold" fill="#00695c">① 互斥锁（推荐）</text>
<text x="90" y="415" font-size="11" fill="#333">原理：</text>
<text x="95" y="432" font-size="10" fill="#666">• 第一个请求加锁查DB</text>
<text x="95" y="447" font-size="10" fill="#666">• 其他请求等待或重试</text>
<text x="95" y="462" font-size="10" fill="#666">• 查完释放锁，写缓存</text>
<text x="90" y="485" font-size="11" fill="#228b22">优点：</text>
<text x="95" y="500" font-size="10" fill="#666">• 实现简单</text>
<text x="95" y="515" font-size="10" fill="#666">• 完全避免击穿</text>
<text x="95" y="530" font-size="10" fill="#666">• 保证数据一致性</text>
<text x="90" y="553" font-size="11" fill="#dc143c">缺点：</text>
<text x="95" y="568" font-size="10" fill="#666">• 等待可能超时</text>
<text x="95" y="583" font-size="10" fill="#666">• 吞吐量略降</text>
<rect x="330" y="365" width="230" height="240" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="445" y="390" text-anchor="middle" font-size="14" font-weight="bold" fill="#f57f17">② 逻辑过期</text>
<text x="340" y="415" font-size="11" fill="#333">原理：</text>
<text x="345" y="432" font-size="10" fill="#666">• 不设物理过期时间</text>
<text x="345" y="447" font-size="10" fill="#666">• 添加逻辑过期字段</text>
<text x="345" y="462" font-size="10" fill="#666">• 过期后异步更新</text>
<text x="340" y="485" font-size="11" fill="#228b22">优点：</text>
<text x="345" y="500" font-size="10" fill="#666">• 高可用，无阻塞</text>
<text x="345" y="515" font-size="10" fill="#666">• 性能好</text>
<text x="345" y="530" font-size="10" fill="#666">• 用户体验佳</text>
<text x="340" y="553" font-size="11" fill="#dc143c">缺点：</text>
<text x="345" y="568" font-size="10" fill="#666">• 短暂数据不一致</text>
<text x="345" y="583" font-size="10" fill="#666">• 实现复杂</text>
<rect x="580" y="365" width="230" height="240" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="695" y="390" text-anchor="middle" font-size="14" font-weight="bold" fill="#7b1fa2">③ 提前更新</text>
<text x="590" y="415" font-size="11" fill="#333">原理：</text>
<text x="595" y="432" font-size="10" fill="#666">• 监控 key 的 TTL</text>
<text x="595" y="447" font-size="10" fill="#666">• 过期前主动刷新</text>
<text x="595" y="462" font-size="10" fill="#666">• 定时任务更新</text>
<text x="590" y="485" font-size="11" fill="#228b22">优点：</text>
<text x="595" y="500" font-size="10" fill="#666">• 避免过期</text>
<text x="595" y="515" font-size="10" fill="#666">• 数据一致</text>
<text x="590" y="553" font-size="11" fill="#dc143c">缺点：</text>
<text x="595" y="568" font-size="10" fill="#666">• 需要额外任务</text>
<text x="595" y="583" font-size="10" fill="#666">• 可能更新过于频繁</text>
</svg>

#### 解决方案详解

**方案一：互斥锁（Mutex Key）**

**原理：**
- 使用 Redis 的 SETNX 命令实现分布式锁
- 只有获得锁的线程才能查询数据库
- 其他线程等待或重试

**实现步骤：**
```java
public Product getProduct(Long productId) {
    String cacheKey = "product:" + productId;
    String lockKey = "lock:product:" + productId;

    // 1. 查询缓存
    Product product = redis.get(cacheKey);
    if (product != null) {
        return product;
    }

    // 2. 缓存未命中，尝试获取互斥锁
    String lockValue = UUID.randomUUID().toString();
    boolean getLock = redis.setNX(lockKey, lockValue, 10);  // 10秒超时

    if (getLock) {
        // 3. 获得锁，查询数据库
        try {
            // 双重检查：可能其他线程已经写入缓存
            product = redis.get(cacheKey);
            if (product != null) {
                return product;
            }

            // 查询数据库
            product = db.getProduct(productId);

            // 写入缓存
            if (product != null) {
                redis.setex(cacheKey, 3600, product);
            } else {
                redis.setex(cacheKey, 60, "NULL");  // 空值缓存
            }

            return product;
        } finally {
            // 4. 释放锁
            redis.del(lockKey, lockValue);  // 使用 Lua 脚本确保原子性
        }
    } else {
        // 5. 未获得锁，等待后重试
        Thread.sleep(50);
        return getProduct(productId);  // 递归重试
    }
}
```

**Lua 脚本安全释放锁：**
```lua
-- 只有持有锁的线程才能删除锁
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end
```

**优点：**
- 完全避免缓存击穿
- 实现相对简单
- 保证数据一致性

**缺点：**
- 未获得锁的线程需要等待，可能超时
- 会降低系统吞吐量
- 需要处理锁的超时和释放问题

**方案二：逻辑过期（永不过期）**

**原理：**
- 不设置 Redis 的 TTL
- 在缓存数据中添加逻辑过期时间字段
- 查询时检查逻辑过期时间
- 过期后异步更新，先返回旧数据

**实现步骤：**
```java
// 缓存数据结构
@Data
public class CacheData<T> {
    private T data;           // 实际数据
    private Long expireTime;  // 逻辑过期时间
}

public Product getProduct(Long productId) {
    String cacheKey = "product:" + productId;

    // 1. 查询缓存（永远不会过期）
    CacheData<Product> cacheData = redis.get(cacheKey);

    if (cacheData == null) {
        // 初次查询，需要加载数据
        return loadDataWithMutex(productId);
    }

    // 2. 检查逻辑过期时间
    if (cacheData.getExpireTime() > System.currentTimeMillis()) {
        // 未过期，直接返回
        return cacheData.getData();
    }

    // 3. 已过期，尝试获取锁
    String lockKey = "lock:product:" + productId;
    boolean getLock = redis.setNX(lockKey, "1", 10);

    if (getLock) {
        // 4. 获得锁，异步更新缓存
        threadPool.submit(() -> {
            try {
                Product product = db.getProduct(productId);
                CacheData<Product> newData = new CacheData<>();
                newData.setData(product);
                newData.setExpireTime(System.currentTimeMillis() + 3600000);
                redis.set(cacheKey, newData);  // 永不过期
            } finally {
                redis.del(lockKey);
            }
        });
    }

    // 5. 先返回旧数据
    return cacheData.getData();
}
```

**优点：**
- 高可用，不会阻塞请求
- 性能好，用户体验佳
- 避免缓存击穿

**缺点：**
- 短暂的数据不一致（返回旧数据）
- 实现较复杂
- 需要维护逻辑过期时间

**方案三：提前更新（双缓存）**

**原理：**
- 监控热点 key 的 TTL
- 在 key 过期前主动刷新
- 使用定时任务或缓存预热

**实现步骤：**
```java
// 方式1：读取时检查 TTL
public Product getProduct(Long productId) {
    String cacheKey = "product:" + productId;

    Product product = redis.get(cacheKey);
    if (product != null) {
        // 检查剩余 TTL
        long ttl = redis.ttl(cacheKey);
        if (ttl < 300) {  // 剩余时间小于 5 分钟
            // 异步刷新缓存
            threadPool.submit(() -> refreshCache(productId));
        }
        return product;
    }

    // 缓存不存在，正常加载
    return loadDataWithMutex(productId);
}

// 方式2：定时任务刷新热点数据
@Scheduled(fixedDelay = 60000)  // 每分钟执行一次
public void refreshHotKeys() {
    List<Long> hotProductIds = getHotProductIds();  // 获取热点商品ID

    for (Long productId : hotProductIds) {
        Product product = db.getProduct(productId);
        redis.setex("product:" + productId, 3600, product);
    }
}
```

**优点：**
- 完全避免 key 过期
- 数据始终保持最新
- 用户体验好

**缺点：**
- 需要额外的定时任务
- 可能更新过于频繁，浪费资源
- 需要识别热点 key

#### 三种方案对比

| 方案 | 实时性 | 性能 | 复杂度 | 推荐场景 |
|-----|-------|------|-------|---------|
| 互斥锁 | 高 | 中 | 低 | 数据一致性要求高 |
| 逻辑过期 | 中 | 高 | 高 | 高并发，可容忍短暂不一致 |
| 提前更新 | 高 | 高 | 中 | 已知热点数据 |

**关键要点：**

1. **缓存击穿的特点**：热点 key 过期，大量并发打到数据库
2. **与穿透的区别**：击穿是 key 存在但过期，穿透是 key 不存在
3. **互斥锁最常用**：实现简单，保证一致性
4. **逻辑过期适合高并发**：性能最好，但数据可能短暂不一致
5. **提前更新最优**：但需要识别热点 key
6. **锁的超时时间要合理**：避免死锁和超时
7. **双重检查必不可少**：防止重复查询数据库

**实际案例：**

```bash
# 场景：电商秒杀活动
商品: iPhone 15 Pro Max
并发: 10万 QPS
缓存过期: 正好在开抢时过期

# 使用互斥锁方案
第 1 个请求: 获得锁 → 查询 DB → 写缓存 → 释放锁
第 2-10万个请求: 等待 50ms → 重试 → 命中缓存 → 返回

# 效果
- 只有 1 次数据库查询
- 数据库压力可控
- 响应时间略增（50-100ms）
- 成功抗住 10万 QPS
```

**记忆口诀：**

> **"热点过期，大量击穿"**
> - 击穿特点：热点 key 过期，并发量大
> - 互斥锁：一个查库，其他等待
> - 逻辑过期：永不过期，逻辑判断
> - 提前更新：未到过期，主动刷新
> - 核心思想：减少并发查库

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
60. Redis 6.0 引入了哪些新特性？### 28. 什么是缓存雪崩？如何解决？

**核心答案**：缓存雪崩是指大量缓存key在同一时间失效，导致请求全部打到数据库，造成数据库压力骤增甚至宕机的现象。

**详细说明**：

缓存雪崩的两种典型场景：
1. **大量key同时过期**：大批量数据设置了相同的过期时间
2. **Redis服务宕机**：整个缓存服务不可用

**雪崩过程流程**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-avalanche" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#e74c3c"/>
    </marker>
  </defs>
  <rect x="50" y="50" width="120" height="60" fill="#3498db" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="110" y="85" text-anchor="middle" fill="white" font-size="14" font-weight="bold">应用服务器</text>
  <rect x="340" y="50" width="120" height="60" fill="#e74c3c" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="400" y="75" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Redis</text>
  <text x="400" y="95" text-anchor="middle" fill="white" font-size="12">(大量key失效)</text>
  <rect x="630" y="50" width="120" height="60" fill="#e67e22" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="690" y="75" text-anchor="middle" fill="white" font-size="14" font-weight="bold">MySQL</text>
  <text x="690" y="95" text-anchor="middle" fill="white" font-size="12">(压力骤增)</text>
  <line x1="170" y1="80" x2="330" y2="80" stroke="#34495e" stroke-width="2" marker-end="url(#arrowhead-avalanche)"/>
  <text x="250" y="70" text-anchor="middle" fill="#2c3e50" font-size="12">1. 查询缓存</text>
  <line x1="400" y1="110" x2="400" y2="140" stroke="#e74c3c" stroke-width="3"/>
  <line x1="380" y1="140" x2="420" y2="140" stroke="#e74c3c" stroke-width="3"/>
  <text x="400" y="165" text-anchor="middle" fill="#e74c3c" font-size="14" font-weight="bold">缓存未命中</text>
  <line x1="170" y1="90" x2="200" y2="180" stroke="#e74c3c" stroke-width="2"/>
  <line x1="200" y1="180" x2="620" y2="180" stroke="#e74c3c" stroke-width="2" marker-end="url(#arrowhead-avalanche)"/>
  <text x="410" y="170" text-anchor="middle" fill="#e74c3c" font-size="12">2. 大量请求直达DB</text>
  <rect x="550" y="230" width="280" height="80" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="690" y="255" text-anchor="middle" fill="#c0392b" font-size="13" font-weight="bold">雪崩效应</text>
  <text x="690" y="275" text-anchor="middle" fill="#e74c3c" font-size="11">• 数据库连接耗尽</text>
  <text x="690" y="293" text-anchor="middle" fill="#e74c3c" font-size="11">• 响应时间暴增</text>
  <line x1="690" y1="110" x2="690" y2="220" stroke="#e74c3c" stroke-width="3" marker-end="url(#arrowhead-avalanche)" stroke-dasharray="5,5"/>
  <circle cx="110" cy="320" r="8" fill="#e74c3c"/>
  <text x="130" y="325" fill="#2c3e50" font-size="12">请求峰值：10000 QPS</text>
  <circle cx="400" cy="320" r="8" fill="#e74c3c"/>
  <text x="420" y="325" fill="#2c3e50" font-size="12">缓存miss率：100%</text>
  <circle cx="690" cy="355" r="8" fill="#e74c3c"/>
  <text x="710" y="360" fill="#2c3e50" font-size="12">数据库负载：崩溃</text>
</svg>

**解决方案**：

| 方案 | 说明 | 优点 | 缺点 |
|------|------|------|------|
| **随机过期时间** | 在基础过期时间上增加随机值(如30min+random(5min)) | 简单有效，避免集中失效 | 无法完全避免 |
| **热点数据永不过期** | 关键数据设置为永久，通过后台更新 | 高可用性 | 需维护更新逻辑 |
| **多级缓存** | 本地缓存+Redis+数据库 | 多重保护 | 架构复杂 |
| **互斥锁** | 缓存失效时，只让一个线程查DB并重建缓存 | 减少DB压力 | 并发性能下降 |
| **限流降级** | 对数据库访问进行限流和熔断 | 保护数据库 | 部分请求失败 |
| **Redis高可用** | 主从+哨兵/集群，保证服务可用 | 避免服务雪崩 | 运维成本高 |

**实现示例（随机过期时间）**：

```java
// 设置随机过期时间，避免同时失效
public void setWithRandomExpire(String key, Object value, long baseTime) {
    // 基础过期时间 + 随机时间(0-300秒)
    long expire = baseTime + new Random().nextInt(300);
    redisTemplate.opsForValue().set(key, value, expire, TimeUnit.SECONDS);
}

// 互斥锁方案
public Object getData(String key) {
    Object data = redisTemplate.opsForValue().get(key);
    if (data == null) {
        String lockKey = "lock:" + key;
        // 尝试获取锁
        if (redisTemplate.opsForValue().setIfAbsent(lockKey, "1", 10, TimeUnit.SECONDS)) {
            try {
                // 再次检查缓存
                data = redisTemplate.opsForValue().get(key);
                if (data == null) {
                    // 查询数据库
                    data = getFromDB(key);
                    // 重建缓存（随机过期）
                    setWithRandomExpire(key, data, 1800);
                }
            } finally {
                redisTemplate.delete(lockKey);
            }
        } else {
            // 未获取到锁，等待后重试
            Thread.sleep(50);
            return getData(key);
        }
    }
    return data;
}
```

**关键要点**：
- 雪崩本质：大量缓存同时失效 → 流量全部冲击数据库
- 预防为主：随机过期时间 + 热点数据永不过期
- 应急措施：限流降级 + 互斥锁
- 架构保障：Redis高可用 + 多级缓存

**记忆口诀**：
> **"雪崩三板斧，随机锁限流"**
> - 随机：过期时间加随机值
> - 锁：互斥锁重建缓存
> - 限流：保护数据库
### 29. 什么是缓存预热？

**核心答案**：缓存预热是指在系统启动或流量到来之前，提前将热点数据加载到缓存中，避免冷启动时大量请求打到数据库。

**详细说明**：

**为什么需要预热**：
- **冷启动问题**：系统刚启动时，缓存为空，所有请求都会访问数据库
- **流量冲击**：高峰期突然到来，数据库可能承受不住压力
- **性能下降**：首次访问响应慢，影响用户体验

**预热时机场景**：

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-warmup" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#27ae60"/>
    </marker>
  </defs>
  <rect x="50" y="40" width="680" height="280" fill="#ecf9f2" stroke="#27ae60" stroke-width="2" rx="8"/>
  <text x="390" y="70" text-anchor="middle" fill="#27ae60" font-size="16" font-weight="bold">缓存预热生命周期</text>
  <rect x="80" y="100" width="150" height="70" fill="#3498db" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="155" y="125" text-anchor="middle" fill="white" font-size="13" font-weight="bold">系统启动</text>
  <text x="155" y="145" text-anchor="middle" fill="white" font-size="11">• 服务重启</text>
  <text x="155" y="160" text-anchor="middle" fill="white" font-size="11">• 版本发布</text>
  <rect x="280" y="100" width="150" height="70" fill="#27ae60" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="355" y="120" text-anchor="middle" fill="white" font-size="13" font-weight="bold">预热阶段</text>
  <text x="355" y="140" text-anchor="middle" fill="white" font-size="11">加载热点数据</text>
  <text x="355" y="160" text-anchor="middle" fill="white" font-size="11">预计算结果</text>
  <rect x="480" y="100" width="150" height="70" fill="#e67e22" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="555" y="125" text-anchor="middle" fill="white" font-size="13" font-weight="bold">正常服务</text>
  <text x="555" y="145" text-anchor="middle" fill="white" font-size="11">• 缓存命中高</text>
  <text x="555" y="160" text-anchor="middle" fill="white" font-size="11">• 性能稳定</text>
  <line x1="230" y1="135" x2="270" y2="135" stroke="#2c3e50" stroke-width="2" marker-end="url(#arrowhead-warmup)"/>
  <line x1="430" y1="135" x2="470" y2="135" stroke="#2c3e50" stroke-width="2" marker-end="url(#arrowhead-warmup)"/>
  <rect x="80" y="200" width="150" height="90" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="155" y="220" text-anchor="middle" fill="#c0392b" font-size="12" font-weight="bold">❌ 不预热</text>
  <text x="155" y="240" text-anchor="middle" fill="#e74c3c" font-size="10">缓存miss率: 100%</text>
  <text x="155" y="255" text-anchor="middle" fill="#e74c3c" font-size="10">数据库压力: 极高</text>
  <text x="155" y="270" text-anchor="middle" fill="#e74c3c" font-size="10">响应时间: 慢</text>
  <text x="155" y="285" text-anchor="middle" fill="#e74c3c" font-size="10">可能导致: 雪崩</text>
  <rect x="280" y="200" width="150" height="90" fill="#e6ffe6" stroke="#27ae60" stroke-width="2" rx="5"/>
  <text x="355" y="220" text-anchor="middle" fill="#27ae60" font-size="12" font-weight="bold">✓ 预热后</text>
  <text x="355" y="240" text-anchor="middle" fill="#27ae60" font-size="10">缓存miss率: 低</text>
  <text x="355" y="255" text-anchor="middle" fill="#27ae60" font-size="10">数据库压力: 正常</text>
  <text x="355" y="270" text-anchor="middle" fill="#27ae60" font-size="10">响应时间: 快</text>
  <text x="355" y="285" text-anchor="middle" fill="#27ae60" font-size="10">服务稳定</text>
  <rect x="480" y="200" width="220" height="90" fill="#fff9e6" stroke="#f39c12" stroke-width="2" rx="5"/>
  <text x="590" y="220" text-anchor="middle" fill="#d68910" font-size="12" font-weight="bold">典型预热场景</text>
  <text x="590" y="240" text-anchor="middle" fill="#e67e22" font-size="10">• 秒杀活动前</text>
  <text x="590" y="255" text-anchor="middle" fill="#e67e22" font-size="10">• 大促销前</text>
  <text x="590" y="270" text-anchor="middle" fill="#e67e22" font-size="10">• 热点新闻发布前</text>
  <text x="590" y="285" text-anchor="middle" fill="#e67e22" font-size="10">• 定时任务执行前</text>
</svg>

**预热方法对比**：

| 方法 | 适用场景 | 优点 | 缺点 |
|------|---------|------|------|
| **全量预热** | 数据量小，全部为热点 | 简单直接，覆盖全面 | 耗时长，资源消耗大 |
| **热点预热** | 热点数据明确（如Top100商品） | 快速高效，针对性强 | 需识别热点数据 |
| **定时预热** | 定期更新（如每日排行榜） | 自动化，保持新鲜度 | 需维护定时任务 |
| **懒加载预热** | 首次访问时触发 | 按需加载，节省资源 | 首次访问慢 |
| **渐进式预热** | 大数据量场景 | 分批加载，平稳启动 | 实现复杂 |

**实现示例**：

```java
@Component
public class CacheWarmUpService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductService productService;

    // 1. 启动时预热热点商品
    @PostConstruct
    public void warmUpHotProducts() {
        log.info("开始预热热点商品缓存...");

        // 查询热点商品ID列表（如销量Top100）
        List<Long> hotProductIds = productService.getHotProductIds(100);

        // 分批加载，避免数据库压力过大
        int batchSize = 10;
        for (int i = 0; i < hotProductIds.size(); i += batchSize) {
            List<Long> batch = hotProductIds.subList(i,
                Math.min(i + batchSize, hotProductIds.size()));

            // 批量查询数据库
            List<Product> products = productService.getByIds(batch);

            // 写入缓存
            products.forEach(product -> {
                String key = "product:" + product.getId();
                redisTemplate.opsForValue().set(key, product,
                    1800 + new Random().nextInt(300), TimeUnit.SECONDS);
            });

            // 控制预热速度，避免冲击数据库
            Thread.sleep(100);
        }

        log.info("热点商品缓存预热完成，共{}个商品", hotProductIds.size());
    }

    // 2. 定时预热（每天凌晨3点）
    @Scheduled(cron = "0 0 3 * * ?")
    public void scheduledWarmUp() {
        warmUpHotProducts();
    }

    // 3. 活动前预热
    public void warmUpForPromotion(Long promotionId) {
        // 获取活动商品列表
        List<Product> promotionProducts =
            productService.getPromotionProducts(promotionId);

        // 预热活动商品
        promotionProducts.forEach(product -> {
            String key = "product:" + product.getId();
            // 活动期间设置更长的过期时间
            redisTemplate.opsForValue().set(key, product,
                3600, TimeUnit.SECONDS);
        });

        log.info("活动商品预热完成，活动ID: {}", promotionId);
    }
}
```

**预热最佳实践**：
1. **分批加载**：避免一次性加载过多数据
2. **限流控制**：控制预热速度，防止数据库压力过大
3. **监控进度**：记录预热进度和成功率
4. **异常处理**：预热失败不应影响系统启动
5. **优先级排序**：优先预热最热点的数据
6. **健康检查**：预热完成后才对外提供服务

**关键要点**：
- 预热目的：避免冷启动，减少数据库压力
- 预热时机：系统启动、大促前、定时任务
- 预热策略：全量 vs 热点，同步 vs 异步
- 注意事项：分批加载、限流控制、异常处理

**记忆口诀**：
> **"预热三要素，热点分批控"**
> - 热点：优先预热热门数据
> - 分批：避免一次性加载过多
> - 控：控制速度和异常
### 30. 什么是缓存降级？

**核心答案**：缓存降级是指当系统压力过大或缓存服务出现故障时，暂时关闭部分非核心功能的缓存，或直接返回默认值/降级数据，以保证核心业务正常运行的一种保护策略。

**详细说明**：

**降级的核心思想**：牺牲次要功能，保证核心服务

**降级触发场景**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-degrade" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#e67e22"/>
    </marker>
  </defs>
  <rect x="50" y="30" width="700" height="340" fill="#fff9f0" stroke="#e67e22" stroke-width="2" rx="8"/>
  <text x="400" y="60" text-anchor="middle" fill="#d68910" font-size="16" font-weight="bold">缓存降级触发条件与策略</text>
  <rect x="80" y="90" width="200" height="120" fill="#e74c3c" stroke="#c0392b" stroke-width="2" rx="5"/>
  <text x="180" y="115" text-anchor="middle" fill="white" font-size="14" font-weight="bold">系统异常</text>
  <text x="180" y="140" text-anchor="middle" fill="white" font-size="11">• Redis宕机</text>
  <text x="180" y="158" text-anchor="middle" fill="white" font-size="11">• 缓存响应超时</text>
  <text x="180" y="176" text-anchor="middle" fill="white" font-size="11">• 网络故障</text>
  <text x="180" y="194" text-anchor="middle" fill="white" font-size="11">触发: 自动降级</text>
  <rect x="300" y="90" width="200" height="120" fill="#e67e22" stroke="#d68910" stroke-width="2" rx="5"/>
  <text x="400" y="115" text-anchor="middle" fill="white" font-size="14" font-weight="bold">性能压力</text>
  <text x="400" y="140" text-anchor="middle" fill="white" font-size="11">• 请求量暴增</text>
  <text x="400" y="158" text-anchor="middle" fill="white" font-size="11">• CPU/内存告警</text>
  <text x="400" y="176" text-anchor="middle" fill="white" font-size="11">• 响应时间过长</text>
  <text x="400" y="194" text-anchor="middle" fill="white" font-size="11">触发: 动态降级</text>
  <rect x="520" y="90" width="200" height="120" fill="#f39c12" stroke="#e67e22" stroke-width="2" rx="5"/>
  <text x="620" y="115" text-anchor="middle" fill="white" font-size="14" font-weight="bold">预期活动</text>
  <text x="620" y="140" text-anchor="middle" fill="white" font-size="11">• 大促活动</text>
  <text x="620" y="158" text-anchor="middle" fill="white" font-size="11">• 秒杀场景</text>
  <text x="620" y="176" text-anchor="middle" fill="white" font-size="11">• 流量高峰</text>
  <text x="620" y="194" text-anchor="middle" fill="white" font-size="11">触发: 人工降级</text>
  <line x1="180" y1="210" x2="180" y2="240" stroke="#e67e22" stroke-width="3" marker-end="url(#arrowhead-degrade)"/>
  <line x1="400" y1="210" x2="400" y2="240" stroke="#e67e22" stroke-width="3" marker-end="url(#arrowhead-degrade)"/>
  <line x1="620" y1="210" x2="620" y2="240" stroke="#e67e22" stroke-width="3" marker-end="url(#arrowhead-degrade)"/>
  <rect x="80" y="240" width="640" height="110" fill="#27ae60" stroke="#229954" stroke-width="2" rx="5"/>
  <text x="400" y="265" text-anchor="middle" fill="white" font-size="15" font-weight="bold">降级策略执行</text>
  <rect x="100" y="280" width="140" height="55" fill="#2ecc71" stroke="#27ae60" stroke-width="1" rx="3"/>
  <text x="170" y="300" text-anchor="middle" fill="white" font-size="11" font-weight="bold">返回默认值</text>
  <text x="170" y="318" text-anchor="middle" fill="white" font-size="9">返回固定内容</text>
  <text x="170" y="330" text-anchor="middle" fill="white" font-size="9">如: 空列表、0</text>
  <rect x="255" y="280" width="140" height="55" fill="#2ecc71" stroke="#27ae60" stroke-width="1" rx="3"/>
  <text x="325" y="300" text-anchor="middle" fill="white" font-size="11" font-weight="bold">返回降级数据</text>
  <text x="325" y="318" text-anchor="middle" fill="white" font-size="9">返回兜底数据</text>
  <text x="325" y="330" text-anchor="middle" fill="white" font-size="9">如: 静态推荐</text>
  <rect x="410" y="280" width="140" height="55" fill="#2ecc71" stroke="#27ae60" stroke-width="1" rx="3"/>
  <text x="480" y="300" text-anchor="middle" fill="white" font-size="11" font-weight="bold">关闭非核心</text>
  <text x="480" y="318" text-anchor="middle" fill="white" font-size="9">停止缓存更新</text>
  <text x="480" y="330" text-anchor="middle" fill="white" font-size="9">如: 评论、点赞</text>
  <rect x="565" y="280" width="140" height="55" fill="#2ecc71" stroke="#27ae60" stroke-width="1" rx="3"/>
  <text x="635" y="300" text-anchor="middle" fill="white" font-size="11" font-weight="bold">简化响应</text>
  <text x="635" y="318" text-anchor="middle" fill="white" font-size="9">减少字段</text>
  <text x="635" y="330" text-anchor="middle" fill="white" font-size="9">如: 仅返回必要</text>
</svg>

**降级层级策略**：

| 层级 | 业务类型 | 降级策略 | 示例 |
|------|---------|---------|------|
| **核心业务** | 不可降级 | 全力保障 | 登录、支付、下单 |
| **重要业务** | 部分降级 | 简化功能、返回缓存数据 | 商品详情(减少推荐)、购物车 |
| **一般业务** | 优先降级 | 返回默认值或降级数据 | 评论列表、浏览历史 |
| **次要业务** | 完全降级 | 直接关闭功能 | 猜你喜欢、相关推荐 |

**降级 vs 限流 vs 熔断对比**：

| 维度 | 降级 | 限流 | 熔断 |
|------|------|------|------|
| **目的** | 保证核心功能 | 控制流量 | 快速失败 |
| **触发** | 系统压力/故障 | 请求量超阈值 | 错误率超阈值 |
| **作用范围** | 功能级别 | 接口级别 | 服务级别 |
| **恢复方式** | 手动/自动恢复 | 流量下降后自动恢复 | 半开状态探测 |

**实现示例**：

```java
@Service
public class ProductService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    // 降级开关配置（可通过配置中心动态调整）
    @Value("${degrade.product.recommend:false}")
    private boolean degradeRecommend;

    @Value("${degrade.product.comment:false}")
    private boolean degradeComment;

    // 获取商品详情（核心业务，不降级）
    public ProductVO getProductDetail(Long productId) {
        // 1. 查询商品基本信息（必须保证）
        Product product = getProductFromCache(productId);

        ProductVO vo = new ProductVO();
        vo.setBasicInfo(product);

        // 2. 推荐商品（可降级）
        if (degradeRecommend) {
            // 降级：返回默认推荐或空列表
            vo.setRecommendList(getDefaultRecommendList());
        } else {
            vo.setRecommendList(getRecommendProducts(productId));
        }

        // 3. 评论列表（可降级）
        if (degradeComment) {
            // 降级：返回空评论或只返回缓存的热门评论
            vo.setComments(getCachedHotComments(productId));
        } else {
            vo.setComments(getComments(productId));
        }

        return vo;
    }

    // 带熔断降级的缓存查询
    @HystrixCommand(
        fallbackMethod = "getProductFallback",
        commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "1000"),
            @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "50")
        }
    )
    public Product getProductFromCache(Long productId) {
        try {
            // 尝试从缓存获取
            Product product = (Product) redisTemplate.opsForValue()
                .get("product:" + productId);

            if (product == null) {
                // 缓存未命中，查询数据库
                product = productMapper.selectById(productId);
                redisTemplate.opsForValue().set("product:" + productId,
                    product, 30, TimeUnit.MINUTES);
            }
            return product;
        } catch (Exception e) {
            // Redis异常，触发降级
            log.warn("Redis异常，降级查询数据库, productId: {}", productId, e);
            throw e; // 抛出异常触发Hystrix降级
        }
    }

    // 降级方法：缓存失败时直接查询数据库
    public Product getProductFallback(Long productId, Throwable e) {
        log.error("缓存降级，直接查询数据库, productId: {}", productId);
        return productMapper.selectById(productId);
    }

    // 默认推荐列表（降级数据）
    private List<Product> getDefaultRecommendList() {
        // 返回预设的热门商品或空列表
        return Collections.emptyList();
    }

    // 只返回缓存的热门评论（降级策略）
    private List<Comment> getCachedHotComments(Long productId) {
        try {
            return (List<Comment>) redisTemplate.opsForValue()
                .get("hot_comments:" + productId);
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}

// 降级配置管理
@Component
public class DegradeManager {

    @Autowired
    private ConfigService configService; // 配置中心

    // 动态调整降级开关
    public void updateDegradeSwitch(String key, boolean value) {
        configService.updateConfig(key, String.valueOf(value));
        log.info("降级开关更新: {} = {}", key, value);
    }

    // 监控指标，自动降级
    @Scheduled(fixedRate = 5000)
    public void autoDegrade() {
        // 获取系统指标
        double cpuUsage = SystemMonitor.getCpuUsage();
        long redisLatency = RedisMonitor.getAvgLatency();

        // CPU使用率超过80%，自动降级非核心功能
        if (cpuUsage > 0.8) {
            updateDegradeSwitch("degrade.product.recommend", true);
            updateDegradeSwitch("degrade.product.comment", true);
            log.warn("CPU使用率过高 {}%, 触发自动降级", cpuUsage * 100);
        }

        // Redis延迟超过100ms，降级
        if (redisLatency > 100) {
            updateDegradeSwitch("degrade.cache.all", true);
            log.warn("Redis延迟过高 {}ms, 触发缓存降级", redisLatency);
        }
    }
}
```

**降级最佳实践**：
1. **分级管理**：核心、重要、一般、次要业务分级
2. **开关控制**：可通过配置中心动态控制降级开关
3. **自动降级**：根据监控指标自动触发降级
4. **降级预案**：提前准备降级数据和策略
5. **快速恢复**：降级后能快速恢复正常服务
6. **监控告警**：降级后及时通知相关人员

**关键要点**：
- 降级本质：牺牲次要功能，保证核心服务
- 降级时机：系统异常、性能压力、预期高峰
- 降级策略：默认值、降级数据、关闭功能、简化响应
- 降级层级：核心不降、重要部分降、一般优先降、次要完全降

**记忆口诀**：
> **"降级保核心，分级开关控"**
> - 保：保证核心业务
> - 分级：业务分级管理
> - 开关控：动态开关控制
### 31. 如何保证缓存与数据库的数据一致性？

**核心答案**：缓存与数据库的一致性无法做到强一致，只能做到最终一致。常见策略包括：Cache Aside模式（旁路缓存）、Read/Write Through模式、Write Behind模式，实际应用中多采用"先更新数据库，再删除缓存"的方案，配合延迟双删、MQ异步补偿等机制。

**详细说明**：

**一致性问题根源**：缓存和数据库是两个独立系统，更新无法保证原子性

**常见的缓存更新策略对比**：

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-consistency" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#3498db"/>
    </marker>
    <marker id="arrowhead-error" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#e74c3c"/>
    </marker>
  </defs>
  <rect x="30" y="20" width="740" height="410" fill="#f8f9fa" stroke="#34495e" stroke-width="2" rx="8"/>
  <text x="400" y="50" text-anchor="middle" fill="#2c3e50" font-size="16" font-weight="bold">四种缓存更新策略对比</text>
  <rect x="60" y="80" width="160" height="330" fill="#e8f5e9" stroke="#27ae60" stroke-width="2" rx="5"/>
  <text x="140" y="105" text-anchor="middle" fill="#27ae60" font-size="13" font-weight="bold">① 先删缓存后更新DB</text>
  <rect x="75" y="115" width="130" height="45" fill="#fff" stroke="#27ae60" stroke-width="1" rx="3"/>
  <text x="140" y="133" text-anchor="middle" fill="#2c3e50" font-size="10">1. 删除缓存</text>
  <text x="140" y="148" text-anchor="middle" fill="#2c3e50" font-size="10">2. 更新数据库</text>
  <line x1="140" y1="160" x2="140" y2="175" stroke="#27ae60" stroke-width="2" marker-end="url(#arrowhead-consistency)"/>
  <rect x="75" y="175" width="130" height="55" fill="#fff9e6" stroke="#f39c12" stroke-width="1" rx="3"/>
  <text x="140" y="193" text-anchor="middle" fill="#d68910" font-size="10" font-weight="bold">问题场景</text>
  <text x="140" y="207" text-anchor="middle" fill="#e67e22" font-size="9">并发读取到旧数据</text>
  <text x="140" y="220" text-anchor="middle" fill="#e67e22" font-size="9">并写入缓存→脏数据</text>
  <rect x="75" y="240" width="130" height="75" fill="#e6f7ff" stroke="#3498db" stroke-width="1" rx="3"/>
  <text x="140" y="258" text-anchor="middle" fill="#2980b9" font-size="10" font-weight="bold">优点</text>
  <text x="140" y="272" text-anchor="middle" fill="#34495e" font-size="9">• 实现简单</text>
  <text x="140" y="285" text-anchor="middle" fill="#34495e" font-size="9">• 性能较好</text>
  <rect x="75" y="325" width="130" height="75" fill="#ffe6e6" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="140" y="343" text-anchor="middle" fill="#c0392b" font-size="10" font-weight="bold">缺点</text>
  <text x="140" y="357" text-anchor="middle" fill="#e74c3c" font-size="9">• 并发易产生脏数据</text>
  <text x="140" y="370" text-anchor="middle" fill="#e74c3c" font-size="9">• DB更新失败缓存空</text>
  <text x="140" y="383" text-anchor="middle" fill="#e74c3c" font-size="9">• 不推荐使用</text>
  <rect x="240" y="80" width="160" height="330" fill="#e8f8f5" stroke="#16a085" stroke-width="2" rx="5"/>
  <text x="320" y="105" text-anchor="middle" fill="#16a085" font-size="13" font-weight="bold">② 先更新DB后删缓存</text>
  <rect x="255" y="115" width="130" height="45" fill="#fff" stroke="#16a085" stroke-width="1" rx="3"/>
  <text x="320" y="133" text-anchor="middle" fill="#2c3e50" font-size="10">1. 更新数据库</text>
  <text x="320" y="148" text-anchor="middle" fill="#2c3e50" font-size="10">2. 删除缓存</text>
  <line x1="320" y1="160" x2="320" y2="175" stroke="#16a085" stroke-width="2" marker-end="url(#arrowhead-consistency)"/>
  <rect x="255" y="175" width="130" height="55" fill="#fff9e6" stroke="#f39c12" stroke-width="1" rx="3"/>
  <text x="320" y="193" text-anchor="middle" fill="#d68910" font-size="10" font-weight="bold">问题场景</text>
  <text x="320" y="207" text-anchor="middle" fill="#e67e22" font-size="9">删缓存失败→不一致</text>
  <text x="320" y="220" text-anchor="middle" fill="#e67e22" font-size="9">(极小概率)</text>
  <rect x="255" y="240" width="130" height="75" fill="#e6f7ff" stroke="#3498db" stroke-width="1" rx="3"/>
  <text x="320" y="258" text-anchor="middle" fill="#2980b9" font-size="10" font-weight="bold">优点</text>
  <text x="320" y="272" text-anchor="middle" fill="#34495e" font-size="9">• 不一致概率低</text>
  <text x="320" y="285" text-anchor="middle" fill="#34495e" font-size="9">• 性能好</text>
  <text x="320" y="298" text-anchor="middle" fill="#27ae60" font-size="9">• ✓ 推荐方案</text>
  <rect x="255" y="325" width="130" height="75" fill="#ffe6e6" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="320" y="343" text-anchor="middle" fill="#c0392b" font-size="10" font-weight="bold">缺点</text>
  <text x="320" y="357" text-anchor="middle" fill="#e74c3c" font-size="9">• 删缓存可能失败</text>
  <text x="320" y="370" text-anchor="middle" fill="#e74c3c" font-size="9">• 需补偿机制</text>
  <rect x="420" y="80" width="160" height="330" fill="#fef5e7" stroke="#d68910" stroke-width="2" rx="5"/>
  <text x="500" y="105" text-anchor="middle" fill="#d68910" font-size="13" font-weight="bold">③ 先更新DB后更新缓存</text>
  <rect x="435" y="115" width="130" height="45" fill="#fff" stroke="#d68910" stroke-width="1" rx="3"/>
  <text x="500" y="133" text-anchor="middle" fill="#2c3e50" font-size="10">1. 更新数据库</text>
  <text x="500" y="148" text-anchor="middle" fill="#2c3e50" font-size="10">2. 更新缓存</text>
  <line x1="500" y1="160" x2="500" y2="175" stroke="#d68910" stroke-width="2" marker-end="url(#arrowhead-consistency)"/>
  <rect x="435" y="175" width="130" height="55" fill="#ffe6e6" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="500" y="193" text-anchor="middle" fill="#c0392b" font-size="10" font-weight="bold">问题场景</text>
  <text x="500" y="207" text-anchor="middle" fill="#e74c3c" font-size="9">并发时顺序错乱</text>
  <text x="500" y="220" text-anchor="middle" fill="#e74c3c" font-size="9">→缓存是旧值</text>
  <rect x="435" y="240" width="130" height="75" fill="#e6f7ff" stroke="#3498db" stroke-width="1" rx="3"/>
  <text x="500" y="258" text-anchor="middle" fill="#2980b9" font-size="10" font-weight="bold">优点</text>
  <text x="500" y="272" text-anchor="middle" fill="#34495e" font-size="9">• 缓存一直有效</text>
  <text x="500" y="285" text-anchor="middle" fill="#34495e" font-size="9">• 读性能好</text>
  <rect x="435" y="325" width="130" height="75" fill="#ffe6e6" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="500" y="343" text-anchor="middle" fill="#c0392b" font-size="10" font-weight="bold">缺点</text>
  <text x="500" y="357" text-anchor="middle" fill="#e74c3c" font-size="9">• 并发易不一致</text>
  <text x="500" y="370" text-anchor="middle" fill="#e74c3c" font-size="9">• 浪费资源</text>
  <text x="500" y="383" text-anchor="middle" fill="#e74c3c" font-size="9">• 不推荐</text>
  <rect x="600" y="80" width="160" height="330" fill="#fdeef4" stroke="#8e44ad" stroke-width="2" rx="5"/>
  <text x="680" y="105" text-anchor="middle" fill="#8e44ad" font-size="13" font-weight="bold">④ 延迟双删</text>
  <rect x="615" y="115" width="130" height="60" fill="#fff" stroke="#8e44ad" stroke-width="1" rx="3"/>
  <text x="680" y="130" text-anchor="middle" fill="#2c3e50" font-size="10">1. 删除缓存</text>
  <text x="680" y="143" text-anchor="middle" fill="#2c3e50" font-size="10">2. 更新数据库</text>
  <text x="680" y="156" text-anchor="middle" fill="#2c3e50" font-size="10">3. 延迟后再删缓存</text>
  <text x="680" y="169" text-anchor="middle" fill="#8e44ad" font-size="9">(sleep 500ms)</text>
  <line x1="680" y1="175" x2="680" y2="190" stroke="#8e44ad" stroke-width="2" marker-end="url(#arrowhead-consistency)"/>
  <rect x="615" y="190" width="130" height="40" fill="#fff9e6" stroke="#f39c12" stroke-width="1" rx="3"/>
  <text x="680" y="207" text-anchor="middle" fill="#d68910" font-size="10" font-weight="bold">解决问题</text>
  <text x="680" y="221" text-anchor="middle" fill="#e67e22" font-size="9">消除脏数据</text>
  <rect x="615" y="240" width="130" height="75" fill="#e6f7ff" stroke="#3498db" stroke-width="1" rx="3"/>
  <text x="680" y="258" text-anchor="middle" fill="#2980b9" font-size="10" font-weight="bold">优点</text>
  <text x="680" y="272" text-anchor="middle" fill="#34495e" font-size="9">• 一致性更高</text>
  <text x="680" y="285" text-anchor="middle" fill="#34495e" font-size="9">• 适合读多写少</text>
  <rect x="615" y="325" width="130" height="75" fill="#ffe6e6" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="680" y="343" text-anchor="middle" fill="#c0392b" font-size="10" font-weight="bold">缺点</text>
  <text x="680" y="357" text-anchor="middle" fill="#e74c3c" font-size="9">• 延迟时间难确定</text>
  <text x="680" y="370" text-anchor="middle" fill="#e74c3c" font-size="9">• 影响吞吐量</text>
</svg>

**推荐方案：先更新数据库，后删除缓存 + 补偿机制**

| 组件 | 作用 | 实现方式 |
|------|------|---------|
| **主流程** | 先更新DB，后删缓存 | 同步操作 |
| **重试机制** | 删缓存失败时重试 | 消息队列异步重试 |
| **延迟双删** | 防止并发脏数据 | 延迟后再次删除 |
| **订阅binlog** | 最终一致性保障 | Canal监听MySQL binlog异步删缓存 |
| **设置过期时间** | 兜底方案 | 即使不一致，过期后也会恢复 |

**实现示例**：

```java
@Service
public class CacheConsistencyService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    // 方案1: 先更新DB，后删缓存（推荐）
    @Transactional
    public void updateProduct(Product product) {
        // 1. 更新数据库
        productMapper.updateById(product);

        // 2. 删除缓存
        String cacheKey = "product:" + product.getId();
        try {
            redisTemplate.delete(cacheKey);
        } catch (Exception e) {
            // 删除失败，发送MQ消息异步重试
            log.error("删除缓存失败，发送MQ重试, productId: {}", product.getId(), e);
            rabbitTemplate.convertAndSend("cache.delete.exchange",
                "cache.delete.key", cacheKey);
        }
    }

    // 方案2: 延迟双删（提高一致性）
    @Transactional
    public void updateProductWithDelayedDoubleDelete(Product product) {
        String cacheKey = "product:" + product.getId();

        // 1. 先删除缓存
        redisTemplate.delete(cacheKey);

        // 2. 更新数据库
        productMapper.updateById(product);

        // 3. 延迟后再次删除缓存
        CompletableFuture.runAsync(() -> {
            try {
                // 延迟500ms（根据业务读取数据库的平均时间调整）
                Thread.sleep(500);
                redisTemplate.delete(cacheKey);
            } catch (Exception e) {
                log.error("延迟删除缓存失败, productId: {}", product.getId(), e);
            }
        });
    }

    // MQ消费者：异步重试删除缓存
    @RabbitListener(queues = "cache.delete.queue")
    public void retryDeleteCache(String cacheKey) {
        int maxRetry = 3;
        for (int i = 0; i < maxRetry; i++) {
            try {
                redisTemplate.delete(cacheKey);
                log.info("异步删除缓存成功: {}, 重试次数: {}", cacheKey, i);
                return;
            } catch (Exception e) {
                log.warn("异步删除缓存失败: {}, 重试次数: {}", cacheKey, i, e);
                if (i == maxRetry - 1) {
                    // 多次重试失败，记录告警
                    log.error("异步删除缓存最终失败: {}", cacheKey);
                }
                try {
                    Thread.sleep(1000 * (i + 1)); // 递增延迟
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }

    // 方案3: 基于Canal监听binlog（终极方案）
    // Canal监听MySQL binlog，异步删除缓存
    @Component
    public class CanalBinlogListener {

        @Autowired
        private RedisTemplate<String, Object> redisTemplate;

        // Canal客户端监听product表的update事件
        public void onProductUpdate(CanalEntry.RowData rowData) {
            // 获取更新的商品ID
            Long productId = getProductIdFromRowData(rowData);

            // 删除缓存
            String cacheKey = "product:" + productId;
            try {
                redisTemplate.delete(cacheKey);
                log.info("Canal监听到product更新，删除缓存: {}", cacheKey);
            } catch (Exception e) {
                log.error("Canal删除缓存失败: {}", cacheKey, e);
                // 可以再次发送MQ重试
            }
        }
    }
}
```

**方案选型建议**：

| 场景 | 推荐方案 | 理由 |
|------|---------|------|
| **一般业务** | 先更新DB后删缓存 + 设置过期时间 | 简单高效，过期时间兜底 |
| **高一致性要求** | 延迟双删 + MQ异步补偿 | 多重保障 |
| **核心业务** | Canal binlog + MQ重试 + 过期时间 | 终极方案，多层保障 |
| **读多写少** | 延迟双删 | 减少脏数据概率 |
| **写多读少** | 先更新DB后删缓存 | 性能优先 |

**关键要点**：
- 一致性目标：强一致不可能，只能追求最终一致
- 推荐策略：先更新DB，后删缓存
- 补偿机制：MQ异步重试 + binlog监听
- 兜底方案：设置合理的过期时间
- 延迟双删：提高一致性，但影响性能

**记忆口诀**：
> **"先更库后删缓，消息队列来补偿，binlog监听保兜底，过期时间是保障"**
> - 先更库后删缓：推荐的主策略
> - 消息队列来补偿：删除失败时异步重试
> - binlog监听保兜底：Canal监听最终保障
> - 过期时间是保障：最后的兜底方案
### 32. 什么是双写一致性问题？

**核心答案**：双写一致性问题是指在更新数据时需要同时写缓存和数据库，由于两个系统的写操作无法保证原子性，可能因为并发、网络延迟、写入顺序等原因导致缓存和数据库的数据不一致。

**详细说明**：

**双写一致性的核心矛盾**：无法保证缓存和数据库的原子性更新

**双写一致性的四种典型问题场景**：

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-dual" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#e74c3c"/>
    </marker>
    <marker id="arrowhead-ok" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#27ae60"/>
    </marker>
  </defs>
  <rect x="20" y="20" width="810" height="460" fill="#fef9f3" stroke="#e67e22" stroke-width="2" rx="8"/>
  <text x="425" y="50" text-anchor="middle" fill="#d68910" font-size="16" font-weight="bold">双写一致性四大典型问题</text>
  <rect x="50" y="80" width="380" height="180" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="240" y="105" text-anchor="middle" fill="#c0392b" font-size="14" font-weight="bold">问题1: 先删缓存，后更新DB的并发问题</text>
  <rect x="70" y="120" width="160" height="130" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="150" y="138" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程A（写）</text>
  <text x="150" y="155" text-anchor="middle" fill="#34495e" font-size="10">t1: 删除缓存 ✓</text>
  <text x="150" y="175" text-anchor="middle" fill="#95a5a6" font-size="10">t2: (等待中...)</text>
  <text x="150" y="205" text-anchor="middle" fill="#95a5a6" font-size="10">t3: (等待中...)</text>
  <text x="150" y="235" text-anchor="middle" fill="#34495e" font-size="10">t4: 更新DB=新值 ✓</text>
  <rect x="250" y="120" width="160" height="130" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="330" y="138" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程B（读）</text>
  <text x="330" y="155" text-anchor="middle" fill="#95a5a6" font-size="10">t1: (未启动)</text>
  <text x="330" y="175" text-anchor="middle" fill="#e74c3c" font-size="10">t2: 读缓存miss</text>
  <text x="330" y="195" text-anchor="middle" fill="#e74c3c" font-size="10">t3: 查DB=旧值</text>
  <text x="330" y="215" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">写入缓存=旧值 ✗</text>
  <text x="330" y="235" text-anchor="middle" fill="#95a5a6" font-size="10">t4: (已完成)</text>
  <line x1="150" y1="155" x2="330" y2="175" stroke="#e74c3c" stroke-width="2" stroke-dasharray="3,3"/>
  <text x="240" y="165" text-anchor="middle" fill="#e74c3c" font-size="9">窗口期</text>
  <rect x="450" y="80" width="360" height="180" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="630" y="105" text-anchor="middle" fill="#c0392b" font-size="14" font-weight="bold">问题2: 先更新DB，后删缓存的并发问题</text>
  <rect x="470" y="120" width="160" height="130" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="550" y="138" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程A（读）</text>
  <text x="550" y="155" text-anchor="middle" fill="#e74c3c" font-size="10">t1: 读缓存miss</text>
  <text x="550" y="175" text-anchor="middle" fill="#e74c3c" font-size="10">t2: 查DB=旧值</text>
  <text x="550" y="195" text-anchor="middle" fill="#95a5a6" font-size="10">t3: (慢查询...)</text>
  <text x="550" y="225" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">t5: 写缓存=旧值 ✗</text>
  <rect x="650" y="120" width="140" height="130" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="720" y="138" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程B（写）</text>
  <text x="720" y="165" text-anchor="middle" fill="#95a5a6" font-size="10">t2: (未启动)</text>
  <text x="720" y="185" text-anchor="middle" fill="#34495e" font-size="10">t3: 更新DB新值</text>
  <text x="720" y="205" text-anchor="middle" fill="#34495e" font-size="10">t4: 删缓存 ✓</text>
  <text x="720" y="225" text-anchor="middle" fill="#95a5a6" font-size="10">t5: (已完成)</text>
  <line x1="550" y1="175" x2="720" y2="185" stroke="#e74c3c" stroke-width="2" stroke-dasharray="3,3"/>
  <text x="635" y="172" text-anchor="middle" fill="#e74c3c" font-size="9">窗口期</text>
  <rect x="50" y="280" width="380" height="190" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="240" y="305" text-anchor="middle" fill="#c0392b" font-size="14" font-weight="bold">问题3: 先更新DB，后更新缓存的顺序问题</text>
  <rect x="70" y="320" width="160" height="140" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="150" y="338" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程A（写value=1）</text>
  <text x="150" y="358" text-anchor="middle" fill="#34495e" font-size="10">t1: 更新DB=1 ✓</text>
  <text x="150" y="378" text-anchor="middle" fill="#95a5a6" font-size="10">t2: (网络延迟...)</text>
  <text x="150" y="398" text-anchor="middle" fill="#95a5a6" font-size="10">t3: (延迟中...)</text>
  <text x="150" y="428" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">t4: 更新缓存=1 ✗</text>
  <text x="150" y="448" text-anchor="middle" fill="#c0392b" font-size="9">(覆盖了value=2)</text>
  <rect x="250" y="320" width="160" height="140" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="330" y="338" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程B（写value=2）</text>
  <text x="330" y="358" text-anchor="middle" fill="#95a5a6" font-size="10">t1: (未启动)</text>
  <text x="330" y="378" text-anchor="middle" fill="#34495e" font-size="10">t2: 更新DB=2 ✓</text>
  <text x="330" y="398" text-anchor="middle" fill="#34495e" font-size="10">t3: 更新缓存=2 ✓</text>
  <text x="330" y="418" text-anchor="middle" fill="#95a5a6" font-size="10">t4: (已完成)</text>
  <text x="240" y="395" text-anchor="middle" fill="#e74c3c" font-size="10">结果: DB=2, Cache=1</text>
  <rect x="450" y="280" width="360" height="190" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="630" y="305" text-anchor="middle" fill="#c0392b" font-size="14" font-weight="bold">问题4: 缓存或DB写入失败</text>
  <rect x="470" y="320" width="330" height="140" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="635" y="345" text-anchor="middle" fill="#2c3e50" font-size="12" font-weight="bold">写入失败场景</text>
  <rect x="490" y="360" width="140" height="85" fill="#fff9e6" stroke="#f39c12" stroke-width="1" rx="3"/>
  <text x="560" y="378" text-anchor="middle" fill="#d68910" font-size="10" font-weight="bold">场景A</text>
  <text x="560" y="395" text-anchor="middle" fill="#e67e22" font-size="9">1. 更新DB成功 ✓</text>
  <text x="560" y="410" text-anchor="middle" fill="#e74c3c" font-size="9">2. 删缓存失败 ✗</text>
  <text x="560" y="425" text-anchor="middle" fill="#c0392b" font-size="9">→ 缓存是旧数据</text>
  <text x="560" y="437" text-anchor="middle" fill="#c0392b" font-size="8">(网络/Redis故障)</text>
  <rect x="650" y="360" width="140" height="85" fill="#fff9e6" stroke="#f39c12" stroke-width="1" rx="3"/>
  <text x="720" y="378" text-anchor="middle" fill="#d68910" font-size="10" font-weight="bold">场景B</text>
  <text x="720" y="395" text-anchor="middle" fill="#e74c3c" font-size="9">1. 更新缓存成功 ✓</text>
  <text x="720" y="410" text-anchor="middle" fill="#e74c3c" font-size="9">2. 更新DB失败 ✗</text>
  <text x="720" y="425" text-anchor="middle" fill="#c0392b" font-size="9">→ 数据不一致</text>
  <text x="720" y="437" text-anchor="middle" fill="#c0392b" font-size="8">(事务回滚)</text>
</svg>

**双写一致性问题分类**：

| 问题类型 | 原因 | 影响 | 解决方案 |
|---------|------|------|---------|
| **并发读写** | 删缓存后，并发读查到旧值并写缓存 | 缓存脏数据 | 延迟双删 |
| **并发写写** | 两个写操作顺序错乱 | 缓存与DB不一致 | 分布式锁、串行化 |
| **写入失败** | 删缓存/更新DB失败 | 不一致 | 重试机制、MQ补偿 |
| **网络延迟** | 更新顺序颠倒 | 脏数据 | 版本号、时间戳 |

**解决双写一致性的核心策略**：

**1. 推荐方案：先更新DB，后删缓存**
- 不一致概率最低（需要极端并发+慢查询）
- 配合重试机制和MQ补偿

**2. 延迟双删（解决并发读写问题）**
```
删除缓存 → 更新DB → 延迟N毫秒 → 再删除缓存
```

**3. 分布式锁（解决并发写写问题）**
```
获取锁 → 更新DB → 删除缓存 → 释放锁
```

**4. 订阅binlog（最终一致性保障）**
```
Canal监听MySQL binlog → 异步删除缓存
```

**实现示例**：

```java
@Service
public class DualWriteConsistencyService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private RedissonClient redissonClient;

    @Autowired
    private ProductMapper productMapper;

    // 解决方案1: 延迟双删（处理并发读写）
    @Transactional
    public void updateWithDelayedDoubleDelete(Product product) {
        String cacheKey = "product:" + product.getId();

        // 第一次删除缓存
        redisTemplate.delete(cacheKey);

        // 更新数据库
        productMapper.updateById(product);

        // 延迟后再次删除（清除并发读产生的脏数据）
        CompletableFuture.runAsync(() -> {
            try {
                Thread.sleep(500); // 延迟时间 > 业务读取DB的时间
                redisTemplate.delete(cacheKey);
            } catch (Exception e) {
                log.error("延迟双删失败", e);
            }
        });
    }

    // 解决方案2: 分布式锁（处理并发写写）
    @Transactional
    public void updateWithDistributedLock(Product product) {
        String lockKey = "lock:product:" + product.getId();
        RLock lock = redissonClient.getLock(lockKey);

        try {
            // 获取分布式锁，等待最多10秒，锁30秒后自动释放
            if (lock.tryLock(10, 30, TimeUnit.SECONDS)) {
                try {
                    // 更新数据库
                    productMapper.updateById(product);

                    // 删除缓存
                    String cacheKey = "product:" + product.getId();
                    redisTemplate.delete(cacheKey);
                } finally {
                    lock.unlock();
                }
            } else {
                throw new RuntimeException("获取锁失败");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("获取锁被中断", e);
        }
    }

    // 解决方案3: 版本号机制（处理写顺序问题）
    @Transactional
    public void updateWithVersion(Product product) {
        String cacheKey = "product:" + product.getId();
        String versionKey = "product:version:" + product.getId();

        // 更新数据库（乐观锁，version字段+1）
        int updated = productMapper.updateByIdWithVersion(product);
        if (updated == 0) {
            throw new RuntimeException("版本冲突，更新失败");
        }

        // 获取新版本号
        long newVersion = product.getVersion();

        // 使用Lua脚本，只有当版本号更大时才删除缓存
        String script =
            "local currentVersion = redis.call('GET', KEYS[1]) " +
            "if not currentVersion or tonumber(ARGV[1]) > tonumber(currentVersion) then " +
            "  redis.call('SET', KEYS[1], ARGV[1]) " +
            "  redis.call('DEL', KEYS[2]) " +
            "  return 1 " +
            "else " +
            "  return 0 " +
            "end";

        redisTemplate.execute(
            new DefaultRedisScript<>(script, Long.class),
            Arrays.asList(versionKey, cacheKey),
            String.valueOf(newVersion)
        );
    }

    // 解决方案4: 先更新DB后删缓存 + MQ重试（生产推荐）
    @Transactional
    public void updateWithMQRetry(Product product) {
        String cacheKey = "product:" + product.getId();

        try {
            // 1. 更新数据库
            productMapper.updateById(product);

            // 2. 发送删除缓存消息到MQ
            CacheDeleteMessage message = new CacheDeleteMessage();
            message.setCacheKey(cacheKey);
            message.setRetryCount(0);
            message.setMaxRetry(3);

            rabbitTemplate.convertAndSend(
                "cache.delete.exchange",
                "cache.delete.routing.key",
                message
            );

        } catch (Exception e) {
            // 数据库更新失败，事务回滚
            log.error("更新失败", e);
            throw e;
        }
    }

    // MQ消费者: 删除缓存并重试
    @RabbitListener(queues = "cache.delete.queue")
    public void deleteCache(CacheDeleteMessage message) {
        try {
            redisTemplate.delete(message.getCacheKey());
            log.info("删除缓存成功: {}", message.getCacheKey());
        } catch (Exception e) {
            // 删除失败，重试
            if (message.getRetryCount() < message.getMaxRetry()) {
                message.setRetryCount(message.getRetryCount() + 1);
                // 延迟后重新发送到MQ
                rabbitTemplate.convertAndSend(
                    "cache.delete.exchange",
                    "cache.delete.routing.key",
                    message,
                    msg -> {
                        msg.getMessageProperties().setDelay(
                            1000 * message.getRetryCount()
                        );
                        return msg;
                    }
                );
            } else {
                log.error("删除缓存最终失败: {}", message.getCacheKey());
            }
        }
    }
}
```

**方案对比与选型**：

| 方案 | 一致性 | 性能 | 复杂度 | 适用场景 |
|------|--------|------|--------|---------|
| **先更新DB后删缓存** | ★★★☆☆ | ★★★★★ | ★☆☆☆☆ | 一般业务 |
| **延迟双删** | ★★★★☆ | ★★★☆☆ | ★★☆☆☆ | 读多写少 |
| **分布式锁** | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | 并发写多 |
| **版本号机制** | ★★★★☆ | ★★★★☆ | ★★★☆☆ | 需要顺序保证 |
| **Canal binlog** | ★★★★★ | ★★★★☆ | ★★★★☆ | 核心业务 |

**关键要点**：
- 双写本质：缓存和数据库两个系统无法原子更新
- 核心矛盾：一致性 vs 性能 vs 复杂度的权衡
- 推荐策略：先更新DB后删缓存 + MQ重试
- 高级方案：延迟双删 + 分布式锁 + binlog监听
- 兜底保障：设置合理的缓存过期时间

**记忆口诀**：
> **"双写难一致，策略分场景，先库后删缓，延迟锁版本"**
> - 双写难一致：双写天然存在一致性问题
> - 策略分场景：根据业务场景选择方案
> - 先库后删缓：推荐的基础策略
> - 延迟锁版本：三种增强方案

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

45. Redis 集群的数据分片策略是什么？
46. 什么是哈希槽？

### 45-46. Redis 集群的数据分片策略 & 哈希槽

**核心答案：**
Redis Cluster 采用**哈希槽（Hash Slot）**分片策略，将整个数据空间划分为 **16384** 个槽位，通过 `CRC16(key) % 16384` 计算 key 所属的槽，每个主节点负责一部分槽。

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

47. Redis 集群如何实现故障转移？

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
## 其他特性

### 56. 什么是发布订阅（Pub/Sub）？

**核心答案**：Redis 发布订阅（Pub/Sub）是一种消息通信模式，发送者（发布者）发送消息，订阅者接收消息。它实现了消息的发布与订阅解耦，支持一对多的消息分发。

**详细说明**：

Pub/Sub 的核心概念：

1. **发布者（Publisher）**
   - 向指定频道发送消息
   - 不关心有多少订阅者
   - 发送即忘（fire-and-forget）

2. **订阅者（Subscriber）**
   - 订阅一个或多个频道
   - 接收频道的所有消息
   - 可以使用模式匹配订阅

3. **频道（Channel）**
   - 消息的传输通道
   - 命名空间隔离
   - 支持通配符模式

**基本命令**：

```bash
# 发布消息
PUBLISH channel message

# 订阅频道
SUBSCRIBE channel1 channel2 ...

# 模式订阅（通配符）
PSUBSCRIBE pattern1 pattern2 ...

# 取消订阅
UNSUBSCRIBE channel1 channel2 ...
PUNSUBSCRIBE pattern1 pattern2 ...

# 查看订阅信息
PUBSUB CHANNELS [pattern]  # 列出活跃频道
PUBSUB NUMSUB channel      # 查看频道订阅数
PUBSUB NUMPAT              # 查看模式订阅数
```

**工作流程图**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead-pub" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<rect x="50" y="50" width="120" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
<text x="110" y="95" text-anchor="middle" font-size="16" font-weight="bold">Publisher 1</text>
<rect x="50" y="270" width="120" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
<text x="110" y="315" text-anchor="middle" font-size="16" font-weight="bold">Publisher 2</text>
<rect x="340" y="160" width="120" height="80" fill="#fef3c7" stroke="#f59e0b" stroke-width="3" rx="5"/>
<text x="400" y="195" text-anchor="middle" font-size="18" font-weight="bold">Redis</text>
<text x="400" y="215" text-anchor="middle" font-size="14">Channel: news</text>
<rect x="630" y="30" width="120" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="690" y="75" text-anchor="middle" font-size="16" font-weight="bold">Subscriber 1</text>
<rect x="630" y="160" width="120" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="690" y="205" text-anchor="middle" font-size="16" font-weight="bold">Subscriber 2</text>
<rect x="630" y="290" width="120" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="690" y="335" text-anchor="middle" font-size="16" font-weight="bold">Subscriber 3</text>
<line x1="170" y1="90" x2="335" y2="185" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead-pub)"/>
<text x="250" y="130" font-size="12" fill="#2563eb">PUBLISH</text>
<line x1="170" y1="310" x2="335" y2="215" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead-pub)"/>
<text x="250" y="270" font-size="12" fill="#2563eb">PUBLISH</text>
<line x1="465" y1="180" x2="625" y2="70" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowhead-pub)"/>
<text x="550" y="120" font-size="12" fill="#16a34a">消息推送</text>
<line x1="465" y1="200" x2="625" y2="200" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowhead-pub)"/>
<text x="540" y="195" font-size="12" fill="#16a34a">消息推送</text>
<line x1="465" y1="220" x2="625" y2="330" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowhead-pub)"/>
<text x="540" y="280" font-size="12" fill="#16a34a">消息推送</text>
</svg>

**使用场景**：

| 场景 | 说明 | 示例 |
|------|------|------|
| **实时消息推送** | 新消息通知用户 | 聊天室、评论通知 |
| **事件通知** | 系统事件广播 | 缓存失效通知、配置更新 |
| **日志收集** | 分布式日志聚合 | ELK 日志收集 |
| **实时分析** | 数据流处理 | 实时监控、告警 |

**优点与局限**：

**优点**：
- ✅ 实时性好，毫秒级延迟
- ✅ 解耦发布者和订阅者
- ✅ 支持多对多通信
- ✅ 实现简单，性能高

**局限**：
- ❌ 消息不持久化（订阅者离线则丢失消息）
- ❌ 无消息确认机制
- ❌ 订阅者必须在线才能接收消息
- ❌ 不支持消息回溯
- ❌ 不保证消息可靠性

**模式匹配示例**：

```bash
# 订阅所有 news 开头的频道
PSUBSCRIBE news.*

# 可以匹配：
# news.tech
# news.sports
# news.finance

# 订阅所有频道
PSUBSCRIBE *
```

#### 关键要点

1. **即时通信**：适合实时性要求高的场景
2. **不可靠性**：消息可能丢失，不适合重要业务
3. **解耦性**：发布者和订阅者完全解耦
4. **无持久化**：消息不落盘，仅内存传输

#### 记忆口诀

> **发布订阅三要素，发布订阅加频道**
> 实时推送无持久，订阅离线消息丢
> 模式匹配用通配，一对多时最合适
> 适合通知和广播，重要消息别用它

57. 什么是 Redis Stream？

### 57. 什么是 Redis Stream？

**核心答案**：Redis Stream 是 Redis 5.0 引入的持久化消息队列数据结构，类似 Kafka，支持消息持久化、消费组、消息确认、消息回溯等高级特性，解决了 Pub/Sub 不可靠的问题。

**详细说明**：

Stream 是 Redis 中最完善的消息队列解决方案，具备以下核心特性：

1. **持久化存储**
   - 消息写入磁盘
   - 支持 AOF 和 RDB
   - 消费者离线不丢消息

2. **消费组（Consumer Group）**
   - 多个消费者协同工作
   - 自动负载均衡
   - 类似 Kafka 的消费组机制

3. **消息确认（ACK）**
   - 显式确认消息已处理
   - 未确认消息会重新投递
   - 保证 at-least-once 语义

4. **消息回溯**
   - 可以从任意位置读取
   - 支持按 ID 或时间戳查询
   - 历史消息可重复消费

**核心命令**：

```bash
# 添加消息
XADD stream_key * field1 value1 field2 value2
# * 表示自动生成消息ID：timestamp-sequence

# 读取消息
XREAD COUNT 10 STREAMS stream_key 0  # 从头读取
XREAD BLOCK 5000 STREAMS stream_key $  # 阻塞读取新消息

# 创建消费组
XGROUP CREATE stream_key group_name 0  # 0表示从头消费

# 消费组读取
XREADGROUP GROUP group_name consumer_name COUNT 10 STREAMS stream_key >

# 确认消息
XACK stream_key group_name message_id

# 查看待处理消息
XPENDING stream_key group_name

# 获取 Stream 信息
XINFO STREAM stream_key
XINFO GROUPS stream_key
XINFO CONSUMERS stream_key group_name

# 裁剪 Stream（限制长度）
XTRIM stream_key MAXLEN 1000
```

**Stream 结构图**：

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-stream" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<rect x="50" y="50" width="800" height="120" fill="#fef3c7" stroke="#f59e0b" stroke-width="3" rx="5"/>
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">Redis Stream (持久化消息队列)</text>
<rect x="70" y="70" width="150" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="145" y="95" text-anchor="middle" font-size="14" font-weight="bold">消息1</text>
<text x="145" y="115" text-anchor="middle" font-size="11">ID: 1234-0</text>
<text x="145" y="130" text-anchor="middle" font-size="11">data: {...}</text>
<rect x="240" y="70" width="150" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="315" y="95" text-anchor="middle" font-size="14" font-weight="bold">消息2</text>
<text x="315" y="115" text-anchor="middle" font-size="11">ID: 1234-1</text>
<text x="315" y="130" text-anchor="middle" font-size="11">data: {...}</text>
<rect x="410" y="70" width="150" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="485" y="95" text-anchor="middle" font-size="14" font-weight="bold">消息3</text>
<text x="485" y="115" text-anchor="middle" font-size="11">ID: 1235-0</text>
<text x="485" y="130" text-anchor="middle" font-size="11">data: {...}</text>
<rect x="580" y="70" width="150" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="655" y="95" text-anchor="middle" font-size="14" font-weight="bold">消息4</text>
<text x="655" y="115" text-anchor="middle" font-size="11">ID: 1235-1</text>
<text x="655" y="130" text-anchor="middle" font-size="11">data: {...}</text>
<text x="780" y="110" text-anchor="middle" font-size="16">→</text>
<rect x="100" y="220" width="280" height="100" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="240" y="245" text-anchor="middle" font-size="16" font-weight="bold">消费组 A</text>
<ellipse cx="160" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="160" y="285" text-anchor="middle" font-size="12">Consumer 1</text>
<ellipse cx="240" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="240" y="285" text-anchor="middle" font-size="12">Consumer 2</text>
<ellipse cx="320" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="320" y="285" text-anchor="middle" font-size="12">Consumer 3</text>
<rect x="520" y="220" width="280" height="100" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="660" y="245" text-anchor="middle" font-size="16" font-weight="bold">消费组 B</text>
<ellipse cx="580" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="580" y="285" text-anchor="middle" font-size="12">Consumer 1</text>
<ellipse cx="660" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="660" y="285" text-anchor="middle" font-size="12">Consumer 2</text>
<ellipse cx="740" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="740" y="285" text-anchor="middle" font-size="12">Consumer 3</text>
<line x1="145" y1="170" x2="160" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<line x1="315" y1="170" x2="240" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<line x1="485" y1="170" x2="320" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<line x1="315" y1="170" x2="580" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<line x1="485" y1="170" x2="660" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<line x1="655" y1="170" x2="740" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<rect x="150" y="380" width="180" height="80" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="240" y="410" text-anchor="middle" font-size="14" font-weight="bold">Pending List</text>
<text x="240" y="430" text-anchor="middle" font-size="11">未确认的消息</text>
<text x="240" y="445" text-anchor="middle" font-size="11">等待 ACK 或重试</text>
<line x1="240" y1="305" x2="240" y2="375" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-stream)"/>
</svg>

**消息 ID 格式**：

```
timestamp-sequence
例如: 1526919030474-0
     │              │
     │              └─ 序列号（同毫秒内递增）
     └──────────────── 毫秒时间戳
```

**Stream vs Pub/Sub 对比**：

| 特性 | Stream | Pub/Sub |
|------|--------|---------|
| **持久化** | ✅ 支持 | ❌ 不支持 |
| **消息可靠性** | ✅ 高（ACK机制） | ❌ 低（可能丢失） |
| **消息回溯** | ✅ 支持 | ❌ 不支持 |
| **消费组** | ✅ 支持 | ❌ 不支持 |
| **离线消费** | ✅ 支持 | ❌ 不支持 |
| **性能** | 中等 | 极高 |
| **适用场景** | 可靠消息队列 | 实时广播 |

**使用场景**：

1. **订单处理**：保证订单消息不丢失
2. **日志收集**：可靠的日志传输
3. **任务队列**：分布式任务调度
4. **事件溯源**：需要回溯历史事件
5. **实时数据管道**：数据流处理

**最佳实践**：

```bash
# 1. 创建 Stream 并设置最大长度
XADD orders * order_id 123 amount 99.9 MAXLEN ~ 10000
# ~ 表示近似裁剪，性能更好

# 2. 创建消费组（从最新消息开始）
XGROUP CREATE orders order_processors $

# 3. 消费者读取消息
XREADGROUP GROUP order_processors worker1 COUNT 10 BLOCK 2000 STREAMS orders >
# > 表示读取未被消费的新消息

# 4. 处理完成后确认
XACK orders order_processors 1526919030474-0

# 5. 处理失败的消息（Pending List）
XPENDING orders order_processors - + 10
# 获取待处理消息列表

# 6. 转移超时消息给其他消费者
XCLAIM orders order_processors worker2 3600000 1526919030474-0
# 将超过1小时未确认的消息转给 worker2
```

#### 关键要点

1. **可靠性**：消息持久化 + ACK 机制，保证不丢失
2. **扩展性**：消费组支持水平扩展
3. **灵活性**：支持单播、广播、回溯等多种模式
4. **性能**：比 Pub/Sub 慢，但比 Kafka 快

#### 记忆口诀

> **Stream 队列真可靠，持久消费带确认**
> 消费组内分任务，Pending List 防丢失
> 消息回溯能重放，ID 递增好排序
> 比 Pub/Sub 更靠谱，轻量级的 Kafka**

58. Redis 如何实现延迟队列？

### 58. Redis 如何实现延迟队列？

**核心答案**：Redis 实现延迟队列主要有两种方案：①使用 Sorted Set（ZSet）+ 定时轮询，将时间戳作为 score；②使用 Redis 6.2+ 的 ZADD GT/LT 选项配合 Lua 脚本。延迟队列用于延迟执行任务，如订单超时取消、定时提醒等。

**详细说明**：

**方案一：Sorted Set + 轮询（最常用）**

核心思想：
- 使用 ZSet 存储延迟任务
- score = 执行时间戳
- member = 任务数据（JSON）
- 定时扫描到期任务并执行

```bash
# 添加延迟任务（30分钟后执行）
ZADD delay_queue 1640000000 '{"order_id":"123","action":"cancel"}'
# score 是未来的时间戳

# 获取到期的任务（当前时间之前的）
ZRANGEBYSCORE delay_queue 0 1640000000 LIMIT 0 10

# 删除已处理的任务
ZREM delay_queue '{"order_id":"123","action":"cancel"}'
```

**完整实现（Lua 脚本保证原子性）**：

```lua
-- 原子地获取并删除到期任务
local tasks = redis.call('ZRANGEBYSCORE', KEYS[1], 0, ARGV[1], 'LIMIT', 0, ARGV[2])
if #tasks > 0 then
    redis.call('ZREM', KEYS[1], unpack(tasks))
end
return tasks
```

**延迟队列工作流程**：

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-delay" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="20" font-weight="bold">延迟队列实现流程</text>
<rect x="50" y="60" width="180" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
<text x="140" y="90" text-anchor="middle" font-size="14" font-weight="bold">生产者</text>
<text x="140" y="110" text-anchor="middle" font-size="12">添加延迟任务</text>
<text x="140" y="125" text-anchor="middle" font-size="11">ZADD + timestamp</text>
<rect x="360" y="60" width="180" height="200" fill="#fef3c7" stroke="#f59e0b" stroke-width="3" rx="5"/>
<text x="450" y="85" text-anchor="middle" font-size="16" font-weight="bold">Redis Sorted Set</text>
<text x="450" y="105" text-anchor="middle" font-size="13">(delay_queue)</text>
<rect x="380" y="120" width="140" height="30" fill="#fef2f2" stroke="#dc2626" stroke-width="1" rx="3"/>
<text x="390" y="138" font-size="11">score:1640000300 任务A</text>
<rect x="380" y="155" width="140" height="30" fill="#fef2f2" stroke="#dc2626" stroke-width="1" rx="3"/>
<text x="390" y="173" font-size="11">score:1640000600 任务B</text>
<rect x="380" y="190" width="140" height="30" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="3"/>
<text x="390" y="208" font-size="11">score:1639999900 任务C ✓</text>
<rect x="380" y="225" width="140" height="30" fill="#fef2f2" stroke="#dc2626" stroke-width="1" rx="3"/>
<text x="390" y="243" font-size="11">score:1640001000 任务D</text>
<rect x="670" y="60" width="180" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="760" y="90" text-anchor="middle" font-size="14" font-weight="bold">消费者（轮询）</text>
<text x="760" y="110" text-anchor="middle" font-size="12">扫描到期任务</text>
<text x="760" y="125" text-anchor="middle" font-size="11">ZRANGEBYSCORE</text>
<line x1="230" y1="100" x2="355" y2="130" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-delay)"/>
<text x="285" y="110" font-size="12" fill="#2563eb">ZADD</text>
<line x1="545" y1="130" x2="665" y2="100" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-delay)"/>
<text x="600" y="110" font-size="12" fill="#16a34a">获取到期</text>
<rect x="360" y="320" width="180" height="80" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="450" y="345" text-anchor="middle" font-size="14" font-weight="bold">定时器</text>
<text x="450" y="365" text-anchor="middle" font-size="12">每秒检查一次</text>
<text x="450" y="385" text-anchor="middle" font-size="11">now = time()</text>
<line x1="450" y1="260" x2="450" y2="315" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-delay)"/>
<text x="465" y="290" font-size="12" fill="#6366f1">定时扫描</text>
<rect x="50" y="460" width="800" height="70" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="60" y="485" font-size="14" font-weight="bold">时间轴示例：</text>
<line x1="60" y1="505" x2="840" y2="505" stroke="#374151" stroke-width="2"/>
<circle cx="200" cy="505" r="8" fill="#16a34a"/>
<text x="200" y="495" text-anchor="middle" font-size="11">now</text>
<text x="200" y="522" text-anchor="middle" font-size="10">1640000000</text>
<circle cx="400" cy="505" r="6" fill="#f59e0b"/>
<text x="400" y="522" text-anchor="middle" font-size="10">+5min</text>
<circle cx="600" cy="505" r="6" fill="#f59e0b"/>
<text x="600" y="522" text-anchor="middle" font-size="10">+10min</text>
<circle cx="750" cy="505" r="6" fill="#f59e0b"/>
<text x="750" y="522" text-anchor="middle" font-size="10">+15min</text>
<path d="M 200 505 L 150 480" stroke="#16a34a" stroke-width="2" fill="none"/>
<text x="120" y="475" font-size="10" fill="#16a34a">可执行</text>
<path d="M 400 505 L 420 480" stroke="#dc2626" stroke-width="2" fill="none"/>
<text x="425" y="475" font-size="10" fill="#dc2626">等待中</text>
</svg>

**方案二：使用键过期事件（不推荐）**

```bash
# 开启键空间通知
CONFIG SET notify-keyspace-events Ex

# 设置带过期时间的键
SETEX task:123 1800 '{"order_id":"123"}'

# 监听过期事件
SUBSCRIBE __keyevent@0__:expired
```

**局限**：
- ❌ 过期事件不保证实时（懒删除 + 定期删除）
- ❌ 消息可能丢失（持久化问题）
- ❌ 不支持消息确认
- ❌ 主从切换可能丢事件

**方案对比**：

| 特性 | ZSet方案 | 键过期方案 |
|------|----------|-----------|
| **可靠性** | ✅ 高 | ❌ 低 |
| **精确度** | ✅ 毫秒级 | ❌ 不精确 |
| **实现难度** | 中等 | 简单 |
| **扩展性** | ✅ 好 | ❌ 差 |
| **推荐度** | ⭐⭐⭐⭐⭐ | ⭐⭐ |

**Java 实现示例（ZSet方案）**：

```java
public class RedisDelayQueue {
    private final RedisTemplate<String, String> redis;
    private static final String QUEUE_KEY = "delay_queue";

    // 添加延迟任务
    public void addTask(String taskId, String data, long delaySeconds) {
        long executeTime = System.currentTimeMillis() / 1000 + delaySeconds;
        String task = JSON.toJSONString(Map.of("id", taskId, "data", data));
        redis.opsForZSet().add(QUEUE_KEY, task, executeTime);
    }

    // 消费到期任务（原子操作）
    @Scheduled(fixedRate = 1000) // 每秒执行
    public void consumeTasks() {
        long now = System.currentTimeMillis() / 1000;

        // Lua脚本保证原子性
        String luaScript =
            "local tasks = redis.call('ZRANGEBYSCORE', KEYS[1], 0, ARGV[1], 'LIMIT', 0, 10) " +
            "if #tasks > 0 then " +
            "    redis.call('ZREM', KEYS[1], unpack(tasks)) " +
            "end " +
            "return tasks";

        List<String> tasks = redis.execute(
            new DefaultRedisScript<>(luaScript, List.class),
            Collections.singletonList(QUEUE_KEY),
            String.valueOf(now)
        );

        // 处理任务
        tasks.forEach(this::handleTask);
    }

    private void handleTask(String task) {
        // 业务逻辑
        System.out.println("执行任务: " + task);
    }
}
```

**实际应用场景**：

1. **订单超时取消**
   ```
   用户下单 → 30分钟后检查 → 未支付则取消
   ```

2. **定时消息推送**
   ```
   预约提醒 → 提前1小时推送通知
   ```

3. **会员到期提醒**
   ```
   会员即将到期 → 提前3天发送续费提醒
   ```

4. **延迟重试**
   ```
   API调用失败 → 5秒后重试 → 指数退避
   ```

**优化建议**：

1. **使用Lua脚本**：保证获取+删除的原子性
2. **分片队列**：按业务类型分多个队列，降低竞争
3. **批量处理**：一次获取多个任务，提高吞吐量
4. **幂等处理**：任务可能重复执行，需保证幂等性
5. **监控告警**：监控队列堆积情况

#### 关键要点

1. **ZSet方案**：score存时间戳，定时扫描，可靠性高
2. **原子操作**：使用Lua脚本保证获取+删除原子性
3. **幂等性**：任务可能重复，需保证幂等处理
4. **不适合超大延迟**：适合分钟/小时级，不适合天/月级

#### 记忆口诀

> **延迟队列用 ZSet，时间戳当 score 设**
> 定时扫描到期任务，Lua 脚本保原子
> 键过期不靠谱，生产环境别选它
> 订单超时和提醒，延迟队列最合适

59. 什么是 Lua 脚本？在 Redis 中如何使用？

### 59. 什么是 Lua 脚本？在 Redis 中如何使用？

**核心答案**：Lua 是一种轻量级脚本语言，Redis 支持在服务器端执行 Lua 脚本。Lua 脚本在 Redis 中的最大优势是**原子性**——整个脚本作为一个原子操作执行，不会被其他命令打断，常用于实现分布式锁、限流、复杂的原子操作等场景。

**详细说明**：

**Lua 脚本的核心特性**：

1. **原子性**
   - 整个脚本作为单个原子操作
   - 执行过程中不会插入其他命令
   - 类似事务但更灵活

2. **减少网络开销**
   - 多个命令一次提交
   - 减少客户端与服务器的往返
   - 提高性能

3. **可复用性**
   - 通过 SHA1 缓存脚本
   - EVALSHA 重复调用
   - 节省带宽

4. **服务器端计算**
   - 复杂逻辑在服务器执行
   - 减少数据传输
   - 提高效率

**基本命令**：

```bash
# 执行 Lua 脚本
EVAL script numkeys key [key ...] arg [arg ...]

# 加载脚本获取 SHA1
SCRIPT LOAD script

# 通过 SHA1 执行脚本
EVALSHA sha1 numkeys key [key ...] arg [arg ...]

# 查看已加载的脚本
SCRIPT EXISTS sha1 [sha1 ...]

# 清除所有脚本缓存
SCRIPT FLUSH

# 杀死正在运行的脚本
SCRIPT KILL
```

**脚本结构**：

```lua
-- KEYS[1], KEYS[2], ... 键名参数
-- ARGV[1], ARGV[2], ... 其他参数

-- 调用 Redis 命令
redis.call('SET', KEYS[1], ARGV[1])  -- 出错会中断
redis.pcall('SET', KEYS[1], ARGV[1]) -- 出错不中断

-- 返回结果
return result
```

**典型应用场景**：

**1. 分布式锁（原子加锁）**

```lua
-- 加锁脚本
-- KEYS[1]: 锁的key
-- ARGV[1]: 锁的value（唯一标识）
-- ARGV[2]: 过期时间（秒）

if redis.call('EXISTS', KEYS[1]) == 0 then
    redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2])
    return 1  -- 加锁成功
else
    return 0  -- 锁已存在
end
```

调用方式：
```bash
EVAL "if redis.call('EXISTS',KEYS[1])==0 then redis.call('SET',KEYS[1],ARGV[1],'EX',ARGV[2]) return 1 else return 0 end" 1 mylock uuid123 30
```

**2. 原子解锁（防止误删）**

```lua
-- 解锁脚本
-- KEYS[1]: 锁的key
-- ARGV[1]: 锁的value

if redis.call('GET', KEYS[1]) == ARGV[1] then
    return redis.call('DEL', KEYS[1])
else
    return 0  -- 不是自己的锁
end
```

**3. 限流（令牌桶/漏桶）**

```lua
-- 滑动窗口限流
-- KEYS[1]: 限流key
-- ARGV[1]: 窗口时间（秒）
-- ARGV[2]: 最大请求数
-- ARGV[3]: 当前时间戳（毫秒）

local key = KEYS[1]
local window = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

-- 移除窗口外的记录
redis.call('ZREMRANGEBYSCORE', key, 0, now - window * 1000)

-- 统计当前窗口内的请求数
local current = redis.call('ZCARD', key)

if current < limit then
    -- 添加当前请求
    redis.call('ZADD', key, now, now)
    redis.call('EXPIRE', key, window)
    return 1  -- 允许通过
else
    return 0  -- 限流
end
```

**4. 库存扣减（防止超卖）**

```lua
-- 扣减库存
-- KEYS[1]: 库存key
-- ARGV[1]: 扣减数量

local stock = tonumber(redis.call('GET', KEYS[1]) or "0")
local quantity = tonumber(ARGV[1])

if stock >= quantity then
    redis.call('DECRBY', KEYS[1], quantity)
    return 1  -- 扣减成功
else
    return 0  -- 库存不足
end
```

**Lua 脚本执行流程**：

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-lua" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="20" font-weight="bold">Lua 脚本执行流程</text>
<rect x="50" y="70" width="160" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
<text x="130" y="100" text-anchor="middle" font-size="14" font-weight="bold">客户端</text>
<text x="130" y="120" text-anchor="middle" font-size="12">发送 EVAL</text>
<text x="130" y="135" text-anchor="middle" font-size="11">+ Lua 脚本</text>
<rect x="300" y="70" width="250" height="350" fill="#fef3c7" stroke="#f59e0b" stroke-width="3" rx="5"/>
<text x="425" y="95" text-anchor="middle" font-size="16" font-weight="bold">Redis 服务器</text>
<rect x="320" y="120" width="210" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="3"/>
<text x="425" y="145" text-anchor="middle" font-size="13" font-weight="bold">1. 解析脚本</text>
<text x="425" y="165" text-anchor="middle" font-size="11">检查语法，生成 SHA1</text>
<rect x="320" y="195" width="210" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="3"/>
<text x="425" y="220" text-anchor="middle" font-size="13" font-weight="bold">2. 加载到 Lua 环境</text>
<text x="425" y="240" text-anchor="middle" font-size="11">初始化 KEYS/ARGV</text>
<rect x="320" y="270" width="210" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="3"/>
<text x="425" y="295" text-anchor="middle" font-size="13" font-weight="bold">3. 原子执行</text>
<text x="425" y="315" text-anchor="middle" font-size="11">调用 redis.call/pcall</text>
<rect x="320" y="345" width="210" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="3"/>
<text x="425" y="370" text-anchor="middle" font-size="13" font-weight="bold">4. 返回结果</text>
<text x="425" y="390" text-anchor="middle" font-size="11">序列化为 Redis 协议</text>
<rect x="640" y="70" width="210" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="745" y="100" text-anchor="middle" font-size="14" font-weight="bold">脚本缓存</text>
<text x="745" y="120" text-anchor="middle" font-size="12">SHA1 → 脚本</text>
<text x="745" y="135" text-anchor="middle" font-size="11">后续用 EVALSHA</text>
<line x1="210" y1="110" x2="295" y2="140" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-lua)"/>
<text x="250" y="120" font-size="12" fill="#2563eb">EVAL</text>
<line x1="530" y1="150" x2="635" y2="110" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-lua)" stroke-dasharray="5,5"/>
<text x="575" y="125" font-size="11" fill="#16a34a">缓存</text>
<line x1="300" y1="375" x2="215" y2="110" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-lua)"/>
<text x="240" y="250" font-size="12" fill="#16a34a">返回</text>
<rect x="50" y="280" width="160" height="120" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="130" y="305" text-anchor="middle" font-size="14" font-weight="bold">重要特性</text>
<text x="60" y="330" font-size="11">✅ 原子性保证</text>
<text x="60" y="350" font-size="11">✅ 无竞态条件</text>
<text x="60" y="370" font-size="11">✅ 减少网络IO</text>
<text x="60" y="390" font-size="11">⚠️  执行时阻塞</text>
</svg>

**Java 使用示例**：

```java
public class RedisLuaExample {
    private final RedisTemplate<String, String> redis;

    // 1. 使用 EVAL 直接执行
    public Long acquireLock(String lockKey, String uniqueId, int expireSeconds) {
        String script =
            "if redis.call('EXISTS', KEYS[1]) == 0 then " +
            "    redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2]) " +
            "    return 1 " +
            "else " +
            "    return 0 " +
            "end";

        return redis.execute(
            new DefaultRedisScript<>(script, Long.class),
            Collections.singletonList(lockKey),
            uniqueId, String.valueOf(expireSeconds)
        );
    }

    // 2. 预加载脚本（推荐）
    private static final String UNLOCK_SCRIPT =
        "if redis.call('GET', KEYS[1]) == ARGV[1] then " +
        "    return redis.call('DEL', KEYS[1]) " +
        "else " +
        "    return 0 " +
        "end";

    private static final DefaultRedisScript<Long> UNLOCK_SCRIPT_OBJ =
        new DefaultRedisScript<>(UNLOCK_SCRIPT, Long.class);

    public boolean releaseLock(String lockKey, String uniqueId) {
        Long result = redis.execute(
            UNLOCK_SCRIPT_OBJ,
            Collections.singletonList(lockKey),
            uniqueId
        );
        return result != null && result == 1;
    }
}
```

**最佳实践**：

1. **控制脚本复杂度**
   - 避免耗时操作
   - 避免死循环
   - 超过 5 秒会被 SCRIPT KILL

2. **使用 EVALSHA**
   - 预加载脚本
   - 使用 SHA1 调用
   - 节省网络带宽

3. **错误处理**
   - redis.call：出错中断
   - redis.pcall：出错返回错误

4. **参数化**
   - 使用 KEYS 和 ARGV
   - 提高脚本复用性
   - 便于缓存

5. **避免副作用**
   - 不要使用随机函数
   - 不要使用系统时间
   - 保证幂等性

**常见陷阱**：

| 问题 | 说明 | 解决方案 |
|------|------|---------|
| **长时间运行** | 阻塞 Redis | 限制脚本复杂度，超时用 SCRIPT KILL |
| **写随机数据** | 主从不一致 | 由客户端生成传入 |
| **依赖时间** | 主从时间差 | 客户端传入时间戳 |
| **访问外部资源** | 不支持 | 仅操作 Redis 数据 |

#### 关键要点

1. **原子性**：整个脚本作为原子操作，无竞态条件
2. **性能**：减少网络往返，服务器端计算
3. **场景**：分布式锁、限流、库存扣减等原子操作
4. **限制**：避免长时间运行，不支持访问外部资源

#### 记忆口诀

> **Lua 脚本保原子，复杂操作一次过**
> KEYS ARGV 要分清，call pcall 看需求
> 分布式锁和限流，库存扣减防超卖
> 避免死循环耗时，五秒超时会被杀

60. Redis 6.0 引入了哪些新特性？

### 60. Redis 6.0 引入了哪些新特性？

**核心答案**：Redis 6.0 是一个重大版本更新，主要引入了**多线程 I/O**、**ACL 访问控制列表**、**RESP3 协议**、**客户端缓存**、**SSL/TLS 支持**等关键特性，显著提升了性能、安全性和可用性。

**详细说明**：

**1. 多线程 I/O（最重要特性）**

**核心变化**：
- Redis 6.0 之前：单线程处理网络 I/O 和命令执行
- Redis 6.0 之后：多线程处理网络 I/O，单线程执行命令

**工作原理**：

<svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-v6" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">Redis 6.0 多线程 I/O 模型</text>
<rect x="50" y="80" width="300" height="280" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="200" y="105" text-anchor="middle" font-size="14" font-weight="bold">Redis 6.0 之前（单线程）</text>
<rect x="80" y="120" width="240" height="50" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="200" y="150" text-anchor="middle" font-size="12">主线程</text>
<text x="100" y="195" font-size="11">① 网络 I/O（读取请求）</text>
<text x="100" y="215" font-size="11">② 命令解析</text>
<text x="100" y="235" font-size="11">③ 命令执行</text>
<text x="100" y="255" font-size="11">④ 网络 I/O（发送响应）</text>
<text x="100" y="280" font-size="11" fill="#dc2626">⚠️ 全部串行，成为瓶颈</text>
<rect x="420" y="80" width="420" height="280" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="630" y="105" text-anchor="middle" font-size="14" font-weight="bold">Redis 6.0（多线程 I/O）</text>
<rect x="450" y="120" width="150" height="50" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="3"/>
<text x="525" y="150" text-anchor="middle" font-size="12">I/O 线程池</text>
<rect x="660" y="120" width="150" height="50" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="735" y="150" text-anchor="middle" font-size="12">主线程</text>
<text x="460" y="195" font-size="11">① 多线程并发读取请求</text>
<line x1="600" y1="200" x2="655" y2="200" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-v6)"/>
<text x="670" y="215" font-size="11">② 命令解析</text>
<text x="670" y="235" font-size="11">③ 命令执行</text>
<text x="670" y="255" font-size="11" fill="#16a34a">（单线程保证）</text>
<line x1="660" y1="270" x2="605" y2="270" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-v6)"/>
<text x="460" y="285" font-size="11">④ 多线程并发发送响应</text>
<text x="460" y="310" font-size="11" fill="#16a34a">✅ I/O 并行，性能提升</text>
</svg>

**配置方式**：

```bash
# redis.conf 配置
io-threads 4                    # I/O 线程数（建议 CPU 核心数）
io-threads-do-reads yes         # 启用读多线程（默认只有写多线程）
```

**性能提升**：
- 读写 QPS 提升 1 倍左右
- 大 value 场景提升更明显
- 4 核 CPU 下推荐 4 个 I/O 线程

**注意**：
- 命令执行仍然是单线程
- 保证了数据的原子性
- 不需要加锁

---

**2. ACL（Access Control List）访问控制**

Redis 6.0 之前只有 `requirepass` 简单密码认证，现在支持细粒度的权限控制。

**核心功能**：
- 多用户管理
- 命令级别权限
- Key 级别权限
- 频道级别权限

**常用命令**：

```bash
# 创建用户
ACL SETUSER alice on >password123 ~cached:* +get +set

# 参数说明：
# on: 启用用户
# >password123: 设置密码
# ~cached:*: 只能访问 cached: 开头的 key
# +get +set: 只允许 GET 和 SET 命令

# 查看所有用户
ACL LIST

# 查看当前用户权限
ACL WHOAMI

# 查看用户详细信息
ACL GETUSER alice

# 删除用户
ACL DELUSER alice

# 保存 ACL 到文件
ACL SAVE
```

**示例场景**：

```bash
# 只读用户
ACL SETUSER readonly on >pass ~* +@read -@write

# 管理员用户
ACL SETUSER admin on >adminpass ~* +@all

# 应用用户（只能操作 app: 前缀的 key）
ACL SETUSER appuser on >apppass ~app:* +@all -@dangerous

# 监控用户（只能执行监控命令）
ACL SETUSER monitor on >monitorpass ~* +info +slowlog +client +ping
```

---

**3. RESP3 协议（Redis Serialization Protocol 3）**

新的客户端-服务器通信协议，功能更强大。

**新特性**：
- 支持更多数据类型（布尔、双精度浮点）
- 支持字典类型（有序键值对）
- 支持流式数据
- 更好的客户端缓存支持

**启用方式**：

```bash
# 客户端升级到 RESP3
HELLO 3

# 使用新类型
HGETALL user:1  # 返回字典类型而不是平坦数组
```

---

**4. 客户端缓存（Client-side Caching）**

服务器主动通知客户端缓存失效，提升性能。

**工作原理**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-cache" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">客户端缓存机制</text>
<rect x="50" y="70" width="180" height="100" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
<text x="140" y="95" text-anchor="middle" font-size="14" font-weight="bold">客户端</text>
<text x="140" y="115" text-anchor="middle" font-size="12">本地缓存</text>
<text x="140" y="135" text-anchor="middle" font-size="11">user:1 = "Alice"</text>
<rect x="350" y="70" width="180" height="100" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
<text x="440" y="95" text-anchor="middle" font-size="14" font-weight="bold">Redis 服务器</text>
<text x="440" y="115" text-anchor="middle" font-size="12">追踪 key</text>
<text x="440" y="135" text-anchor="middle" font-size="11">user:1 被客户端缓存</text>
<rect x="620" y="70" width="150" height="100" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="695" y="95" text-anchor="middle" font-size="14" font-weight="bold">其他客户端</text>
<text x="695" y="115" text-anchor="middle" font-size="12">修改数据</text>
<text x="695" y="135" text-anchor="middle" font-size="11">SET user:1 "Bob"</text>
<line x1="230" y1="100" x2="345" y2="100" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-cache)"/>
<text x="280" y="95" font-size="11" fill="#2563eb">① TRACKING</text>
<line x1="620" y1="130" x2="535" y2="130" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-cache)"/>
<text x="570" y="125" font-size="11" fill="#dc2626">② 修改</text>
<line x1="350" y1="160" x2="235" y2="180" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-cache)"/>
<text x="285" y="175" font-size="11" fill="#16a34a">③ 失效通知</text>
<rect x="50" y="220" width="700" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="70" y="245" font-size="12" font-weight="bold">优点：</text>
<text x="70" y="265" font-size="11">✅ 减少 Redis 访问压力   ✅ 降低延迟   ✅ 服务器主动推送失效</text>
</svg>

**启用方式**：

```bash
# 启用客户端缓存追踪
CLIENT TRACKING ON

# 读取数据（会被追踪）
GET user:1

# 其他客户端修改数据时，服务器会发送失效通知
# 收到通知：INVALIDATE user:1
```

---

**5. SSL/TLS 支持**

**功能**：
- 加密客户端与服务器之间的通信
- 防止中间人攻击
- 保护敏感数据

**配置**：

```bash
# redis.conf
port 0                              # 禁用普通端口
tls-port 6380                       # 启用 TLS 端口
tls-cert-file /path/to/redis.crt    # 证书
tls-key-file /path/to/redis.key     # 私钥
tls-ca-cert-file /path/to/ca.crt    # CA 证书
```

---

**6. 其他改进**

| 特性 | 说明 |
|------|------|
| **STRALGO** | 字符串算法（LCS 最长公共子序列） |
| **Disque 功能** | 部分消息队列功能合并到 Redis |
| **RDB 改进** | 更快的 RDB 加载速度 |
| **过期字典优化** | 更高效的过期键删除 |
| **INFO 增强** | 更详细的服务器信息 |

---

**版本对比总结**：

| 特性 | Redis 5.x | Redis 6.0 |
|------|-----------|-----------|
| **I/O 模型** | 单线程 | 多线程 I/O |
| **权限控制** | 简单密码 | ACL 细粒度权限 |
| **协议** | RESP2 | RESP3 |
| **客户端缓存** | ❌ | ✅ |
| **SSL/TLS** | ❌ | ✅ |
| **性能** | 基准 | 提升 1-2 倍 |

#### 关键要点

1. **多线程 I/O**：I/O 并行，命令执行单线程，性能大幅提升
2. **ACL**：企业级权限管理，支持多用户和细粒度控制
3. **客户端缓存**：服务器主动推送失效，减少延迟
4. **向后兼容**：Redis 6.0 完全兼容旧版本

#### 记忆口诀

> **Redis 6.0 五大特性，多线程 ACL 和协议**
> I/O 并行性能翻倍，权限控制更细致
> 客户端缓存推失效，SSL 加密保安全
> RESP3 协议更强大，企业生产首选它

