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
