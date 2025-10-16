## 架构设计

### 6. RocketMQ 的整体架构是怎样的？

**核心答案：**
RocketMQ 采用分布式架构，由 NameServer、Broker、Producer、Consumer 四大核心组件组成，通过主从复制、路由中心实现高可用和高性能。

**详细说明：**

**整体架构图：**

<svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="ar" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<text x="500" y="30" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">RocketMQ 整体架构</text>
<rect x="50" y="80" width="200" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="8"/>
<text x="150" y="115" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">Producer 集群</text>
<text x="150" y="145" text-anchor="middle" font-size="13">• 发送消息</text>
<text x="150" y="165" text-anchor="middle" font-size="13">• 负载均衡</text>
<text x="150" y="185" text-anchor="middle" font-size="13">• 失败重试</text>
<rect x="750" y="80" width="200" height="120" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="3" rx="8"/>
<text x="850" y="115" text-anchor="middle" font-size="18" font-weight="bold" fill="#7b1fa2">Consumer 集群</text>
<text x="850" y="145" text-anchor="middle" font-size="13">• 拉取消息</text>
<text x="850" y="165" text-anchor="middle" font-size="13">• 负载均衡</text>
<text x="850" y="185" text-anchor="middle" font-size="13">• 消费重试</text>
<rect x="350" y="60" width="300" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="8"/>
<text x="500" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#f57c00">NameServer 集群</text>
<text x="500" y="120" text-anchor="middle" font-size="13">• 路由注册与发现</text>
<text x="500" y="140" text-anchor="middle" font-size="13">• 无状态，节点独立</text>
<rect x="100" y="300" width="180" height="200" fill="#e8f5e9" stroke="#388e3c" stroke-width="3" rx="8"/>
<text x="190" y="335" text-anchor="middle" font-size="18" font-weight="bold" fill="#388e3c">Broker Master</text>
<text x="190" y="365" text-anchor="middle" font-size="13">• 读写消息</text>
<text x="190" y="385" text-anchor="middle" font-size="13">• 存储消息</text>
<text x="190" y="405" text-anchor="middle" font-size="13">• 主从同步</text>
<rect x="120" y="430" width="140" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="190" y="465" text-anchor="middle" font-size="14">CommitLog</text>
<rect x="330" y="300" width="180" height="200" fill="#e1f5fe" stroke="#0277bd" stroke-width="3" rx="8" stroke-dasharray="5,5"/>
<text x="420" y="335" text-anchor="middle" font-size="18" font-weight="bold" fill="#0277bd">Broker Slave</text>
<text x="420" y="365" text-anchor="middle" font-size="13">• 只读消息</text>
<text x="420" y="385" text-anchor="middle" font-size="13">• 备份消息</text>
<text x="420" y="405" text-anchor="middle" font-size="13">• 同步数据</text>
<rect x="350" y="430" width="140" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5" stroke-dasharray="5,5"/>
<text x="420" y="465" text-anchor="middle" font-size="14">CommitLog</text>
<rect x="570" y="300" width="180" height="200" fill="#e8f5e9" stroke="#388e3c" stroke-width="3" rx="8"/>
<text x="660" y="335" text-anchor="middle" font-size="18" font-weight="bold" fill="#388e3c">Broker Master</text>
<text x="660" y="365" text-anchor="middle" font-size="13">• 读写消息</text>
<text x="660" y="385" text-anchor="middle" font-size="13">• 存储消息</text>
<text x="660" y="405" text-anchor="middle" font-size="13">• 主从同步</text>
<rect x="590" y="430" width="140" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="660" y="465" text-anchor="middle" font-size="14">CommitLog</text>
<rect x="800" y="300" width="180" height="200" fill="#e1f5fe" stroke="#0277bd" stroke-width="3" rx="8" stroke-dasharray="5,5"/>
<text x="890" y="335" text-anchor="middle" font-size="18" font-weight="bold" fill="#0277bd">Broker Slave</text>
<text x="890" y="365" text-anchor="middle" font-size="13">• 只读消息</text>
<text x="890" y="385" text-anchor="middle" font-size="13">• 备份消息</text>
<text x="890" y="405" text-anchor="middle" font-size="13">• 同步数据</text>
<rect x="820" y="430" width="140" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5" stroke-dasharray="5,5"/>
<text x="890" y="465" text-anchor="middle" font-size="14">CommitLog</text>
<line x1="150" y1="200" x2="420" y2="160" stroke="#999" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#ar)"/>
<text x="260" y="170" font-size="12" fill="#666">①获取路由</text>
<line x1="150" y1="210" x2="150" y2="295" stroke="#1976d2" stroke-width="3" marker-end="url(#ar)"/>
<text x="170" y="250" font-size="13" fill="#1976d2" font-weight="bold">②发送消息</text>
<line x1="280" y1="350" x2="325" y2="350" stroke="#388e3c" stroke-width="2" marker-end="url(#ar)"/>
<text x="300" y="340" font-size="11" fill="#388e3c">主从同步</text>
<line x1="750" y1="350" x2="795" y2="350" stroke="#388e3c" stroke-width="2" marker-end="url(#ar)"/>
<text x="770" y="340" font-size="11" fill="#388e3c">主从同步</text>
<line x1="280" y1="380" x2="565" y2="380" stroke="#999" stroke-width="1.5" stroke-dasharray="3,3"/>
<text x="420" y="375" font-size="11" fill="#666">Broker 集群</text>
<line x1="850" y1="200" x2="580" y2="160" stroke="#999" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#ar)"/>
<text x="700" y="170" font-size="12" fill="#666">③获取路由</text>
<line x1="850" y1="210" x2="750" y2="350" stroke="#7b1fa2" stroke-width="3" marker-end="url(#ar)"/>
<text x="780" y="270" font-size="13" fill="#7b1fa2" font-weight="bold">④拉取消息</text>
<line x1="190" y1="300" x2="400" y2="165" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#ar)"/>
<line x1="420" y1="300" x2="490" y2="165" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#ar)"/>
<line x1="660" y1="300" x2="510" y2="165" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#ar)"/>
<line x1="890" y1="300" x2="600" y2="165" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#ar)"/>
<text x="300" y="230" font-size="11" fill="#f57c00">⑤心跳/路由上报</text>
<rect x="50" y="560" width="900" height="120" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="8"/>
<text x="500" y="590" text-anchor="middle" font-size="16" font-weight="bold" fill="#333">架构特点</text>
<text x="80" y="620" font-size="13" fill="#333">• 分布式：所有组件都支持集群部署</text>
<text x="80" y="645" font-size="13" fill="#333">• 高可用：Broker 主从架构，自动切换</text>
<text x="80" y="670" font-size="13" fill="#333">• 无状态：NameServer 节点独立，易扩展</text>
<text x="520" y="620" font-size="13" fill="#333">• 高性能：顺序写、零拷贝、批量处理</text>
<text x="520" y="645" font-size="13" fill="#333">• 可靠性：同步/异步刷盘、主从复制</text>
<text x="520" y="670" font-size="13" fill="#333">• 可扩展：Broker 横向扩展，动态上下线</text>
</svg>

**架构分层：**

| 层次 | 组件 | 职责 |
|------|------|------|
| **路由层** | NameServer 集群 | 管理 Broker 路由信息，提供服务发现 |
| **服务层** | Broker 集群 | 消息存储、转发、主从复制 |
| **客户端层** | Producer/Consumer | 消息生产与消费 |
| **存储层** | CommitLog/ConsumeQueue | 消息持久化存储 |

**工作流程：**

1. **Broker 启动**
   - 向所有 NameServer 注册路由信息
   - 建立主从关系（Master-Slave）
   - 定期发送心跳保持连接

2. **Producer 启动**
   - 从 NameServer 获取 Broker 路由信息
   - 建立与 Broker 的连接
   - 定期更新路由信息

3. **消息发送**
   - Producer 选择合适的 Broker 和 Queue
   - 发送消息到 Master Broker
   - Master 写入 CommitLog 并同步给 Slave

4. **Consumer 启动**
   - 从 NameServer 获取 Broker 路由信息
   - 订阅 Topic 并进行负载均衡
   - 建立与 Broker 的长连接

5. **消息消费**
   - Consumer 从 Broker 拉取消息
   - 支持从 Master 或 Slave 读取
   - 提交消费进度到 Broker

6. **故障切换**
   - Master 故障时，Slave 继续提供读服务
   - NameServer 检测到 Broker 下线，更新路由
   - Producer/Consumer 自动切换到可用 Broker

**关键要点：**
- 四层架构：路由层、服务层、客户端层、存储层
- Broker 采用主从架构保证高可用
- NameServer 无状态设计，节点独立
- Producer/Consumer 通过 NameServer 实现服务发现

**记忆口诀：**
"路由服务客户端存储，四层架构各司其职；主从复制保可用，无状态设计易扩展"

---

### 7. NameServer 的作用是什么？为什么不使用 ZooKeeper？

**核心答案：**
NameServer 是 RocketMQ 的路由注册中心，提供轻量级的服务发现功能。相比 ZooKeeper，NameServer 更简单、高效，无需强一致性，更适合消息队列场景。

**详细说明：**

#### NameServer 的作用

**1. 路由注册与管理**
- Broker 启动时向所有 NameServer 注册
- 维护 Broker 地址、Topic、Queue 等路由信息
- 定期接收 Broker 心跳，更新路由表

**2. 路由信息查询**
- Producer 查询 Topic 的路由信息
- Consumer 查询订阅 Topic 的路由信息
- 提供快速的路由查询服务

**3. Broker 存活检测**
- 通过心跳机制检测 Broker 状态
- 超时未收到心跳则剔除 Broker
- 自动更新路由信息

#### NameServer vs ZooKeeper 对比

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">NameServer vs ZooKeeper</text>
<rect x="50" y="60" width="350" height="200" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="8"/>
<text x="225" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#f57c00">NameServer</text>
<text x="80" y="130" font-size="14" fill="#333">✅ 无状态设计</text>
<text x="80" y="155" font-size="14" fill="#333">✅ 节点独立，互不通信</text>
<text x="80" y="180" font-size="14" fill="#333">✅ 轻量级，内存占用小</text>
<text x="80" y="205" font-size="14" fill="#333">✅ 最终一致性</text>
<text x="80" y="230" font-size="14" fill="#333">✅ 部署简单，无依赖</text>
<text x="80" y="255" font-size="14" fill="#333">⚠️ 不保证强一致性</text>
<rect x="500" y="60" width="350" height="200" fill="#e0f2f1" stroke="#00796b" stroke-width="3" rx="8"/>
<text x="675" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#00796b">ZooKeeper</text>
<text x="530" y="130" font-size="14" fill="#333">✅ 强一致性保证</text>
<text x="530" y="155" font-size="14" fill="#333">✅ 功能丰富（分布式锁等）</text>
<text x="530" y="180" font-size="14" fill="#333">✅ 生态成熟</text>
<text x="530" y="205" font-size="14" fill="#333">⚠️ 重量级，资源占用大</text>
<text x="530" y="230" font-size="14" fill="#333">⚠️ 需要选举，复杂度高</text>
<text x="530" y="255" font-size="14" fill="#333">⚠️ 性能开销较大</text>
<rect x="50" y="300" width="800" height="230" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="8"/>
<text x="450" y="330" text-anchor="middle" font-size="16" font-weight="bold" fill="#333">为什么不使用 ZooKeeper？</text>
<text x="80" y="365" font-size="14" fill="#333">1. <text font-weight="bold">简单性</text>：消息队列不需要强一致性，NameServer 更简单轻量</text>
<text x="80" y="395" font-size="14" fill="#333">2. <text font-weight="bold">性能</text>：无需节点间通信和选举，读写性能更高</text>
<text x="80" y="425" font-size="14" fill="#333">3. <text font-weight="bold">可用性</text>：单个 NameServer 故障不影响其他节点，可用性更高</text>
<text x="80" y="455" font-size="14" fill="#333">4. <text font-weight="bold">部署</text>：不依赖外部组件，部署运维更简单</text>
<text x="80" y="485" font-size="14" fill="#333">5. <text font-weight="bold">成本</text>：资源占用少，降低运维成本</text>
<text x="80" y="515" font-size="14" fill="#333">6. <text font-weight="bold">CAP 选择</text>：RocketMQ 选择 AP（可用性+分区容错），ZooKeeper 是 CP（一致性+分区容错）</text>
</svg>

**NameServer 工作原理：**

<svg viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="a7" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#333">NameServer 工作流程</text>
<rect x="50" y="70" width="150" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="125" y="110" text-anchor="middle" font-size="16" font-weight="bold">NameServer-1</text>
<rect x="250" y="70" width="150" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="325" y="110" text-anchor="middle" font-size="16" font-weight="bold">NameServer-2</text>
<rect x="450" y="70" width="150" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="525" y="110" text-anchor="middle" font-size="16" font-weight="bold">NameServer-3</text>
<rect x="150" y="250" width="150" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="225" y="285" text-anchor="middle" font-size="16" font-weight="bold">Broker-A</text>
<text x="225" y="310" text-anchor="middle" font-size="12">Master</text>
<rect x="350" y="250" width="150" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="425" y="285" text-anchor="middle" font-size="16" font-weight="bold">Broker-B</text>
<text x="425" y="310" text-anchor="middle" font-size="12">Master</text>
<line x1="125" y1="150" x2="200" y2="245" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#a7)"/>
<line x1="325" y1="150" x2="250" y2="245" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#a7)"/>
<line x1="325" y1="150" x2="400" y2="245" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#a7)"/>
<line x1="525" y1="150" x2="450" y2="245" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#a7)"/>
<text x="160" y="190" font-size="11" fill="#f57c00">路由上报</text>
<text x="280" y="190" font-size="11" fill="#f57c00">心跳</text>
<rect x="650" y="150" width="200" height="200" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="8"/>
<text x="750" y="180" text-anchor="middle" font-size="14" font-weight="bold">特性</text>
<text x="670" y="210" font-size="12">• 节点独立</text>
<text x="670" y="235" font-size="12">• 互不通信</text>
<text x="670" y="260" font-size="12">• 最终一致</text>
<text x="670" y="285" font-size="12">• 数据冗余</text>
<text x="670" y="310" font-size="12">• 单点故障不影响</text>
<text x="670" y="335" font-size="12">• 快速路由查询</text>
<rect x="50" y="380" width="600" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="350" y="410" text-anchor="middle" font-size="13">① Broker 向所有 NameServer 注册路由信息</text>
<text x="350" y="430" text-anchor="middle" font-size="13">② NameServer 维护路由表，各节点数据一致</text>
</svg>

**对比总结表：**

| 特性 | NameServer | ZooKeeper |
|------|-----------|-----------|
| **一致性** | 最终一致 | 强一致（CP） |
| **节点通信** | 无 | 有（选举、同步） |
| **复杂度** | 简单 | 复杂 |
| **资源占用** | 小 | 大 |
| **性能** | 高 | 中等 |
| **功能** | 专注路由 | 功能丰富 |
| **部署** | 简单 | 复杂 |
| **适用场景** | 消息队列 | 分布式协调 |

**关键要点：**
- NameServer 提供轻量级的路由注册和发现服务
- 无状态设计，节点独立，易于扩展
- 不需要强一致性，追求高可用和高性能
- 相比 ZooKeeper 更简单、高效、易维护

**记忆口诀：**
"无状态独立不通信，最终一致性能高；不用 ZK 因简单，消息队列恰恰好"

---

### 8. Broker 的作用是什么？Master 和 Slave 的区别是什么？

**核心答案：**
Broker 是消息服务器，负责消息的存储、转发和管理。Master 负责读写，Slave 负责备份和读，通过主从架构实现高可用。

**详细说明：**

#### Broker 的作用

**1. 消息存储**
- 接收 Producer 发送的消息
- 将消息持久化到磁盘（CommitLog）
- 维护消息索引（ConsumeQueue）

**2. 消息转发**
- 处理 Consumer 的拉取请求
- 根据订阅关系推送消息
- 支持消息过滤

**3. 路由管理**
- 向 NameServer 注册路由信息
- 定期发送心跳保持在线状态
- 上报 Topic、Queue 配置信息

**4. 主从复制**
- Master 同步数据到 Slave
- 支持同步/异步复制模式
- 保证数据可靠性

**5. 消息清理**
- 定期清理过期消息
- 管理磁盘空间
- 维护消息索引

#### Master 和 Slave 的区别

**主从架构图：**

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="a8" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">Broker 主从架构</text>
<rect x="100" y="80" width="250" height="300" fill="#e8f5e9" stroke="#388e3c" stroke-width="3" rx="8"/>
<text x="225" y="115" text-anchor="middle" font-size="18" font-weight="bold" fill="#388e3c">Broker Master</text>
<rect x="120" y="140" width="210" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="225" y="170" text-anchor="middle" font-size="14" font-weight="bold">读写服务</text>
<text x="140" y="200" font-size="12">✅ 接收 Producer 写入</text>
<text x="140" y="220" font-size="12">✅ 处理 Consumer 读取</text>
<text x="140" y="240" font-size="12">✅ 消息持久化</text>
<text x="140" y="260" font-size="12">✅ 主动同步到 Slave</text>
<text x="140" y="280" font-size="12">✅ 路由注册</text>
<rect x="130" y="300" width="190" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="225" y="335" text-anchor="middle" font-size="14" font-weight="bold">CommitLog（主）</text>
<rect x="550" y="80" width="250" height="300" fill="#e1f5fe" stroke="#0277bd" stroke-width="3" rx="8" stroke-dasharray="8,4"/>
<text x="675" y="115" text-anchor="middle" font-size="18" font-weight="bold" fill="#0277bd">Broker Slave</text>
<rect x="570" y="140" width="210" height="50" fill="#b3e5fc" stroke="#0277bd" stroke-width="2" rx="5"/>
<text x="675" y="170" text-anchor="middle" font-size="14" font-weight="bold">只读服务</text>
<text x="590" y="200" font-size="12">❌ 不接收 Producer 写入</text>
<text x="590" y="220" font-size="12">✅ 处理 Consumer 读取</text>
<text x="590" y="240" font-size="12">✅ 备份消息</text>
<text x="590" y="260" font-size="12">✅ 从 Master 同步数据</text>
<text x="590" y="280" font-size="12">✅ 路由注册</text>
<rect x="580" y="300" width="190" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5" stroke-dasharray="5,5"/>
<text x="675" y="335" text-anchor="middle" font-size="14" font-weight="bold">CommitLog（备）</text>
<line x1="350" y1="330" x2="545" y2="330" stroke="#f57c00" stroke-width="3" marker-end="url(#a8)"/>
<text x="430" y="320" font-size="13" fill="#f57c00" font-weight="bold">数据同步</text>
<rect x="50" y="410" width="400" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="250" y="440" text-anchor="middle" font-size="14" font-weight="bold">同步模式</text>
<text x="70" y="465" font-size="12">• <text font-weight="bold">同步复制</text>：Master 等待 Slave 确认后返回</text>
<text x="70" y="485" font-size="12">• <text font-weight="bold">异步复制</text>：Master 不等待 Slave，直接返回</text>
<rect x="480" y="410" width="400" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="680" y="440" text-anchor="middle" font-size="14" font-weight="bold">故障切换</text>
<text x="500" y="465" font-size="12">• Master 故障：Slave 继续提供读服务</text>
<text x="500" y="485" font-size="12">• Dledger 模式：支持自动主从切换</text>
</svg>

**对比表格：**

| 特性 | Master | Slave |
|------|--------|-------|
| **读操作** | ✅ 支持 | ✅ 支持 |
| **写操作** | ✅ 支持 | ❌ 不支持 |
| **消息持久化** | ✅ 主存储 | ✅ 备份存储 |
| **数据同步** | 主动同步到 Slave | 从 Master 接收同步 |
| **路由注册** | ✅ 注册为可写 | ✅ 注册为只读 |
| **故障处理** | 故障后无法写入 | 故障后不影响 Master |
| **BrokerId** | 0 | 非0（1、2、3...） |

**工作流程：**

1. **正常工作**
   - Producer 写入 Master
   - Master 将消息写入 CommitLog
   - Master 同步数据到 Slave
   - Consumer 可从 Master 或 Slave 读取

2. **主从同步**
   - **同步复制**：Master 等待 Slave 复制成功后才返回成功（可靠性高，性能低）
   - **异步复制**：Master 写入成功立即返回（性能高，可能丢数据）

3. **故障场景**
   - **Master 故障**：Slave 继续提供读服务，但无法写入新消息
   - **Slave 故障**：不影响 Master，仅失去备份和读分担
   - **Dledger 模式**：支持自动选主和主从切换

**部署模式：**

| 模式 | 说明 | 优点 | 缺点 |
|------|------|------|------|
| **单 Master** | 只有一个 Master | 简单，无复制开销 | 无备份，可用性低 |
| **多 Master** | 多个 Master，无 Slave | 高性能，高吞吐 | Master 故障数据丢失 |
| **多 Master 多 Slave（异步）** | 每个 Master 配 Slave，异步复制 | 高性能，有备份 | 异步复制可能丢数据 |
| **多 Master 多 Slave（同步）** | 每个 Master 配 Slave，同步复制 | 高可靠，不丢数据 | 性能稍低 |
| **Dledger 模式** | 基于 Raft 协议自动选主 | 自动切换，高可用 | 复杂度高，至少3节点 |

**关键要点：**
- Broker 负责消息存储、转发和管理
- Master 支持读写，Slave 只支持读
- 主从复制保证数据可靠性和高可用
- 支持同步/异步复制和自动切换模式

**记忆口诀：**
"主负读写从只读，主从复制保可靠；同步异步两模式，故障切换保可用"

---

### 9. 什么是 Topic 和 Queue？它们之间的关系是什么？

**核心答案：**
Topic 是消息的逻辑分类，Queue 是消息的物理存储队列。一个 Topic 包含多个 Queue，Queue 分布在不同的 Broker 上，实现负载均衡和并发消费。

**详细说明：**

#### Topic（主题）

**定义**：消息的逻辑分类标识，用于区分不同类型的消息。

**特点**：
- 消息发送和订阅的基本单位
- 一个 Topic 可以有多个 Queue
- Topic 可以分布在多个 Broker 上
- 支持权限控制和配额管理

**示例**：
- `OrderTopic`：订单相关消息
- `PaymentTopic`：支付相关消息
- `LogTopic`：日志相关消息

#### Queue（队列）

**定义**：消息的物理存储单元，也称为 Message Queue。

**特点**：
- 是消息的实际存储和消费单位
- 每个 Queue 属于一个 Topic
- Queue 是顺序的，FIFO
- 支持并发消费

#### Topic 和 Queue 的关系图

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="a9" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">Topic 与 Queue 的关系</text>
<rect x="300" y="60" width="300" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="8"/>
<text x="450" y="105" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">Topic: OrderTopic</text>
<text x="450" y="125" text-anchor="middle" font-size="13" fill="#666">（逻辑分类）</text>
<line x1="450" y1="140" x2="150" y2="195" stroke="#1976d2" stroke-width="2" marker-end="url(#a9)"/>
<line x1="450" y1="140" x2="450" y2="195" stroke="#1976d2" stroke-width="2" marker-end="url(#a9)"/>
<line x1="450" y1="140" x2="750" y2="195" stroke="#1976d2" stroke-width="2" marker-end="url(#a9)"/>
<rect x="50" y="200" width="200" height="150" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="150" y="230" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">Broker-A</text>
<rect x="70" y="250" width="160" height="35" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="3"/>
<text x="150" y="272" text-anchor="middle" font-size="13">Queue-0</text>
<rect x="70" y="295" width="160" height="35" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="3"/>
<text x="150" y="317" text-anchor="middle" font-size="13">Queue-1</text>
<rect x="350" y="200" width="200" height="150" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="450" y="230" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">Broker-B</text>
<rect x="370" y="250" width="160" height="35" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="3"/>
<text x="450" y="272" text-anchor="middle" font-size="13">Queue-2</text>
<rect x="370" y="295" width="160" height="35" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="3"/>
<text x="450" y="317" text-anchor="middle" font-size="13">Queue-3</text>
<rect x="650" y="200" width="200" height="150" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="750" y="230" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">Broker-C</text>
<rect x="670" y="250" width="160" height="35" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="3"/>
<text x="750" y="272" text-anchor="middle" font-size="13">Queue-4</text>
<rect x="670" y="295" width="160" height="35" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="3"/>
<text x="750" y="317" text-anchor="middle" font-size="13">Queue-5</text>
<rect x="100" y="400" width="150" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="175" y="430" text-anchor="middle" font-size="14" font-weight="bold">Producer</text>
<text x="175" y="455" text-anchor="middle" font-size="11">负载均衡</text>
<text x="175" y="470" text-anchor="middle" font-size="11">选择 Queue</text>
<rect x="350" y="400" width="150" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="425" y="430" text-anchor="middle" font-size="14" font-weight="bold">Consumer-1</text>
<text x="425" y="455" text-anchor="middle" font-size="11">消费 Q0,Q1,Q2</text>
<rect x="550" y="400" width="150" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="625" y="430" text-anchor="middle" font-size="14" font-weight="bold">Consumer-2</text>
<text x="625" y="455" text-anchor="middle" font-size="11">消费 Q3,Q4,Q5</text>
<line x1="175" y1="400" x2="150" y2="355" stroke="#388e3c" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#a9)"/>
<line x1="425" y1="400" x2="150" y2="355" stroke="#7b1fa2" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#a9)"/>
<line x1="425" y1="400" x2="450" y2="355" stroke="#7b1fa2" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#a9)"/>
<line x1="625" y1="400" x2="750" y2="355" stroke="#7b1fa2" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#a9)"/>
<rect x="50" y="520" width="800" height="70" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="8"/>
<text x="450" y="545" text-anchor="middle" font-size="13" fill="#333">• 一个 Topic 包含多个 Queue</text>
<text x="450" y="565" text-anchor="middle" font-size="13" fill="#333">• Queue 分布在不同 Broker 上，实现横向扩展</text>
<text x="450" y="585" text-anchor="middle" font-size="13" fill="#333">• Producer 和 Consumer 通过 Queue 实现并发和负载均衡</text>
</svg>

**关系说明：**

| 维度 | Topic | Queue |
|------|-------|-------|
| **层次** | 逻辑层 | 物理层 |
| **作用** | 消息分类 | 消息存储和消费单位 |
| **数量关系** | 1 个 Topic 包含 N 个 Queue | N 个 Queue 属于 1 个 Topic |
| **分布** | 可跨多个 Broker | 属于一个 Broker |
| **并发** | - | 支持多个 Consumer 并发消费不同 Queue |
| **顺序** | 不保证全局顺序 | 单个 Queue 内保证顺序 |

**典型配置示例：**

```
Topic: OrderTopic
├── Broker-A
│   ├── Queue-0  (读写队列)
│   └── Queue-1  (读写队列)
├── Broker-B
│   ├── Queue-2  (读写队列)
│   └── Queue-3  (读写队列)
└── Broker-C
    ├── Queue-4  (读写队列)
    └── Queue-5  (读写队列)
```

**Queue 的作用：**

1. **负载均衡**
   - Producer 轮询选择 Queue 发送消息
   - 分散消息到不同 Broker
   - 提高系统吞吐量

2. **并发消费**
   - 多个 Consumer 可以并行消费不同 Queue
   - Consumer 数量 ≤ Queue 数量时，每个 Consumer 独享 Queue
   - Consumer 数量 > Queue 数量时，部分 Consumer 空闲

3. **顺序保证**
   - 单个 Queue 内的消息严格有序
   - 通过指定 Queue 发送可实现顺序消息

4. **故障隔离**
   - 某个 Broker 故障只影响该 Broker 上的 Queue
   - 其他 Queue 继续正常工作

**关键要点：**
- Topic 是逻辑概念，Queue 是物理实现
- 一个 Topic 包含多个 Queue，分布在不同 Broker
- Queue 是消息存储和消费的基本单位
- 通过 Queue 实现负载均衡和并发消费

**记忆口诀：**
"Topic 分类 Queue 存储，一对多关系分布；负载并发靠 Queue，顺序消息单队列"

---

### 10. 什么是 Message Queue？

**核心答案：**
Message Queue（消息队列）就是 Queue，是消息的物理存储单元。在 RocketMQ 中，Queue 和 Message Queue 是同一个概念，特指 Topic 下的实际存储队列。

**详细说明：**

Message Queue 在 RocketMQ 中就是指 Queue，前面第9题已经详细介绍。这里补充一些实际应用细节：

**Queue 的标识：**
```
MessageQueue 由三部分组成：
- Topic: 消息主题名称
- BrokerName: Broker 名称
- QueueId: 队列编号（从0开始）

示例: MessageQueue [topic=OrderTopic, brokerName=broker-a, queueId=0]
```

**Queue 的类型：**

1. **读队列（Read Queue）**
   - Consumer 可以从中拉取消息
   - 数量由 `readQueueNums` 配置

2. **写队列（Write Queue）**
   - Producer 可以向其发送消息
   - 数量由 `writeQueueNums` 配置

3. **读写队列配置**
   - 通常 `readQueueNums = writeQueueNums`
   - 可以通过调整实现队列的平滑扩缩容

**关键要点：**
- Message Queue 就是 Queue 的完整称呼
- 由 Topic、BrokerName、QueueId 三部分唯一标识
- 区分读队列和写队列，支持平滑扩缩容

**记忆口诀：**
"Message Queue 就是 Queue，三元组标识不会错"

---

### 11. RocketMQ 如何实现路由发现？

**核心答案：**
RocketMQ 通过 NameServer 实现路由发现。Broker 向 NameServer 注册路由信息，Producer/Consumer 从 NameServer 获取路由信息，定期更新维护。

**详细说明：**

**路由发现流程图：**

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="a11" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">路由发现流程</text>
<rect x="350" y="70" width="200" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="8"/>
<text x="450" y="105" text-anchor="middle" font-size="18" font-weight="bold" fill="#f57c00">NameServer</text>
<text x="450" y="130" text-anchor="middle" font-size="13">路由表</text>
<rect x="100" y="230" width="200" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="200" y="265" text-anchor="middle" font-size="16" font-weight="bold" fill="#388e3c">Broker</text>
<text x="200" y="290" text-anchor="middle" font-size="12">• Topic 信息</text>
<text x="200" y="310" text-anchor="middle" font-size="12">• Queue 配置</text>
<rect x="600" y="230" width="200" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="700" y="265" text-anchor="middle" font-size="16" font-weight="bold" fill="#1976d2">Producer/Consumer</text>
<text x="700" y="290" text-anchor="middle" font-size="12">• 获取路由</text>
<text x="700" y="310" text-anchor="middle" font-size="12">• 本地缓存</text>
<line x1="200" y1="230" x2="380" y2="155" stroke="#388e3c" stroke-width="3" marker-end="url(#a11)"/>
<text x="270" y="180" font-size="13" fill="#388e3c" font-weight="bold">①注册路由</text>
<text x="270" y="200" font-size="11" fill="#666">(30s心跳)</text>
<line x1="520" y1="130" x2="595" y2="230" stroke="#1976d2" stroke-width="3" marker-end="url(#a11)"/>
<text x="550" y="170" font-size="13" fill="#1976d2" font-weight="bold">②获取路由</text>
<text x="550" y="190" font-size="11" fill="#666">(30s更新)</text>
<line x1="700" y1="330" x2="300" y2="330" stroke="#7b1fa2" stroke-width="3" marker-end="url(#a11)"/>
<text x="480" y="350" font-size="13" fill="#7b1fa2" font-weight="bold">③发送/消费消息</text>
<rect x="50" y="380" width="800" height="160" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="8"/>
<text x="450" y="410" text-anchor="middle" font-size="16" font-weight="bold" fill="#333">路由发现机制</text>
<text x="80" y="440" font-size="13"><text font-weight="bold">1. Broker 注册</text></text>
<text x="100" y="460" font-size="12">• Broker 启动时向所有 NameServer 注册路由信息</text>
<text x="100" y="480" font-size="12">• 每 30 秒发送心跳，更新路由信息</text>
<text x="480" y="440" font-size="13"><text font-weight="bold">2. 客户端获取</text></text>
<text x="500" y="460" font-size="12">• Producer/Consumer 启动时获取路由信息</text>
<text x="500" y="480" font-size="12">• 每 30 秒从 NameServer 更新路由信息</text>
<text x="80" y="510" font-size="13"><text font-weight="bold">3. 路由剔除</text></text>
<text x="100" y="530" font-size="12">• NameServer 每 10 秒扫描 Broker 存活状态</text>
<text x="100" y="5 50" font-size="12">• 超过 120 秒无心跳则剔除 Broker</text>
</svg>

**路由信息内容：**

```
路由表包含：
1. Broker 基本信息
   - Broker 名称
   - Broker 地址（IP:Port）
   - Broker 集群名称

2. Topic 配置信息
   - Topic 名称
   - 读写队列数量
   - 权限信息
   - Topic 在哪些 Broker 上

3. Queue 信息
   - 每个 Broker 上的 Queue 数量
   - Queue 的读写属性

4. 过滤服务器信息
   - 消息过滤服务器地址
```

**路由更新时机：**

| 场景 | 操作 | 周期/触发条件 |
|------|------|--------------|
| **Broker 上报** | 向 NameServer 注册 | 启动时 + 每 30 秒 |
| **Producer 拉取** | 从 NameServer 获取 | 启动时 + 每 30 秒 + 发送失败时 |
| **Consumer 拉取** | 从 NameServer 获取 | 启动时 + 每 30 秒 + 拉取失败时 |
| **NameServer 清理** | 剔除失效 Broker | 每 10 秒扫描，超时 120 秒剔除 |

**路由发现特点：**

1. **最终一致性**
   - NameServer 节点间不通信
   - 各节点最终数据一致
   - 容忍短暂的数据不一致

2. **客户端缓存**
   - Producer/Consumer 本地缓存路由
   - 减少对 NameServer 的访问压力
   - NameServer 不可用时仍可工作

3. **定期更新**
   - 定时更新机制保证路由新鲜度
   - 自动感知 Broker 上下线
   - 故障时快速切换

4. **多副本容错**
   - 向所有 NameServer 注册
   - 从任一 NameServer 获取路由即可
   - 单个 NameServer 故障不影响服务

**关键要点：**
- Broker 定期向 NameServer 注册路由信息
- Producer/Consumer 定期从 NameServer 拉取路由
- 采用最终一致性模型，客户端本地缓存
- 通过心跳和超时机制实现故障检测

**记忆口诀：**
"Broker 注册 30 秒心跳，客户端拉取 30 秒更新；NameServer 扫描 10 秒一次，超时 120 秒即剔除"

---

### 12. Producer 如何知道向哪个 Broker 发送消息？

**核心答案：**
Producer 从 NameServer 获取 Topic 的路由信息，根据负载均衡策略选择 Queue，然后向该 Queue 所在的 Broker 发送消息。

**详细说明：**

**消息发送流程：**

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="a12" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">Producer 发送消息流程</text>
<rect x="50" y="70" width="200" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="8"/>
<text x="150" y="110" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">Producer</text>
<text x="150" y="135" text-anchor="middle" font-size="12">路由表缓存</text>
<rect x="350" y="70" width="200" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="450" y="110" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">NameServer</text>
<text x="450" y="135" text-anchor="middle" font-size="12">路由信息</text>
<rect x="650" y="70" width="200" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="750" y="110" text-anchor="middle" font-size="16" font-weight="bold" fill="#388e3c">Broker</text>
<text x="750" y="135" text-anchor="middle" font-size="12">Queue 0-N</text>
<line x1="250" y1="120" x2="345" y2="120" stroke="#1976d2" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#a12)"/>
<text x="280" y="110" font-size="11" fill="#1976d2">①获取路由</text>
<rect x="50" y="220" width="800" height="260" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="8"/>
<text x="450" y="250" text-anchor="middle" font-size="16" font-weight="bold">发送步骤</text>
<rect x="70" y="270" width="200" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="170" y="295" text-anchor="middle" font-size="13" font-weight="bold">Step 1: 查找路由</text>
<text x="170" y="315" text-anchor="middle" font-size="11">从本地缓存或 NameServer</text>
<rect x="300" y="270" width="200" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="295" text-anchor="middle" font-size="13" font-weight="bold">Step 2: 选择 Queue</text>
<text x="400" y="315" text-anchor="middle" font-size="11">负载均衡策略</text>
<rect x="530" y="270" width="200" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="630" y="295" text-anchor="middle" font-size="13" font-weight="bold">Step 3: 发送消息</text>
<text x="630" y="315" text-anchor="middle" font-size="11">向 Queue 所在 Broker</text>
<line x1="170" y1="330" x2="170" y2="355" stroke="#1976d2" stroke-width="2" marker-end="url(#a12)"/>
<line x1="400" y1="330" x2="400" y2="355" stroke="#f57c00" stroke-width="2" marker-end="url(#a12)"/>
<line x1="630" y1="330" x2="630" y2="355" stroke="#388e3c" stroke-width="2" marker-end="url(#a12)"/>
<text x="80" y="375" font-size="12">• 优先使用本地缓存</text>
<text x="80" y="395" font-size="12">• 缓存没有则请求 NameServer</text>
<text x="80" y="415" font-size="12">• 每 30 秒定期更新</text>
<text x="310" y="375" font-size="12">• 轮询（默认）</text>
<text x="310" y="395" font-size="12">• 指定 Queue（顺序消息）</text>
<text x="310" y="415" font-size="12">• 故障规避</text>
<text x="540" y="375" font-size="12">• 建立 TCP 连接</text>
<text x="540" y="395" font-size="12">• 发送消息到 Master</text>
<text x="540" y="415" font-size="12">• 失败重试其他 Broker</text>
<line x1="170" y1="430" x2="400" y2="430" stroke="#333" stroke-width="1"/>
<line x1="400" y1="430" x2="630" y2="430" stroke="#333" stroke-width="1"/>
<text x="270" y="450" font-size="11" fill="#333">步骤1</text>
<text x="500" y="450" font-size="11" fill="#333">步骤2</text>
<text x="630" y="450" font-size="11" fill="#333">步骤3</text>
<text x="270" y="470" font-size="11" fill="#333">→</text>
<text x="500" y="470" font-size="11" fill="#333">→</text>
</svg>

**Queue 选择策略：**

1. **轮询策略（默认）**
   ```
   算法：递增取模
   示例：
   第1条消息 → Queue 0
   第2条消息 → Queue 1
   第3条消息 → Queue 2
   第4条消息 → Queue 0
   ...
   ```

2. **故障规避策略**
   ```
   - 记录发送失败的 Broker
   - 下次发送跳过该 Broker 的 Queue
   - 一定时间后再尝试
   ```

3. **指定 Queue 策略**
   ```
   - 用于顺序消息
   - 根据业务 key（如订单ID）选择固定 Queue
   - 保证相同 key 的消息发送到同一 Queue
   ```

**路由选择示例：**

```
假设 Topic: OrderTopic 有如下路由：
├── Broker-A
│   ├── Queue-0
│   └── Queue-1
├── Broker-B
│   ├── Queue-2
│   └── Queue-3

Producer 发送流程：
1. 查找 OrderTopic 路由 → 得到 4 个 Queue
2. 选择 Queue（轮询）→ 选中 Queue-2
3. 找到 Queue-2 所在 Broker → Broker-B
4. 向 Broker-B 发送消息
```

**关键点：**

1. **路由缓存**
   - 减少 NameServer 访问压力
   - 提高发送性能
   - 定期刷新保证及时性

2. **负载均衡**
   - 默认轮询，平均分配
   - 支持自定义策略
   - 自动规避故障 Broker

3. **故障处理**
   - 发送失败自动重试其他 Broker
   - 重试次数可配置（默认2次）
   - 超时时间可配置（默认3秒）

4. **动态感知**
   - 定期更新路由信息
   - 自动感知 Broker 上下线
   - 无需手动干预

**关键要点：**
- Producer 从 NameServer 获取并缓存路由信息
- 根据负载均衡策略选择 Queue
- 通过 Queue 找到对应的 Broker
- 支持故障规避和自动重试

**记忆口诀：**
"获取路由选队列，队列找到 Broker 位；轮询策略做负载，故障规避自动退"

---

13. RocketMQ 有哪些消息发送方式？
14. 什么是同步发送、异步发送、单向发送？
15. 如何保证消息发送成功？
16. 什么是消息发送的重试机制？
17. 消息发送失败如何处理？
18. 什么是批量消息？如何发送批量消息？
19. 如何选择 Message Queue 进行发送？
