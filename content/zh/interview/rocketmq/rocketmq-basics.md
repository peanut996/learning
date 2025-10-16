## 基础概念

### 1. 什么是 RocketMQ？RocketMQ 的特点是什么？

**核心答案：**
RocketMQ 是阿里巴巴开源的分布式消息中间件，用于实现系统间的异步通信、削峰填谷和解耦。

**详细说明：**

RocketMQ 是一个基于 Java 开发的高性能、高可靠、分布式的消息队列系统，最初由阿里巴巴研发，现已捐献给 Apache 基金会。

**主要特点：**

1. **高性能**
   - 单机支持万级消息并发
   - 毫秒级消息投递延迟
   - 支持亿级消息堆积能力

2. **高可靠性**
   - 同步刷盘、异步刷盘可选
   - 主从同步、异步复制可配置
   - 消息持久化到磁盘

3. **高可用**
   - 支持主从架构
   - 分布式集群部署
   - 故障自动恢复

4. **丰富的消息类型**
   - 普通消息
   - 顺序消息
   - 事务消息
   - 延迟消息
   - 批量消息

5. **灵活的消息过滤**
   - Tag 标签过滤
   - SQL92 表达式过滤

6. **完善的消息追踪**
   - 消息轨迹追踪
   - 消息查询功能

**架构简图：**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<rect x="50" y="150" width="120" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="110" y="195" text-anchor="middle" font-size="16" font-weight="bold">Producer</text>
<rect x="250" y="50" width="120" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="310" y="95" text-anchor="middle" font-size="16" font-weight="bold">NameServer</text>
<rect x="250" y="200" width="120" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="310" y="235" text-anchor="middle" font-size="16" font-weight="bold">Broker</text>
<text x="310" y="255" text-anchor="middle" font-size="12">(Master/Slave)</text>
<rect x="630" y="150" width="120" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="690" y="195" text-anchor="middle" font-size="16" font-weight="bold">Consumer</text>
<line x1="170" y1="180" x2="245" y2="100" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="200" y="130" font-size="12" fill="#666">注册/心跳</text>
<line x1="170" y1="200" x2="245" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="200" y="230" font-size="12" fill="#666">发送消息</text>
<line x1="370" y1="240" x2="625" y2="190" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="205" font-size="12" fill="#666">拉取消息</text>
<line x1="630" y1="170" x2="375" y2="100" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="125" font-size="12" fill="#666">注册/心跳</text>
<rect x="250" y="320" width="120" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="310" y="355" text-anchor="middle" font-size="14" font-weight="bold">存储层</text>
<line x1="310" y1="280" x2="310" y2="315" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="330" y="305" font-size="12" fill="#666">持久化</text>
</svg>

**关键要点：**
- RocketMQ 是高性能、高可靠、分布式的消息队列
- 支持多种消息类型（普通、顺序、事务、延迟）
- 核心组件：Producer、Consumer、Broker、NameServer
- 适用于异步通信、削峰填谷、系统解耦场景

**记忆口诀：**
"高性能、高可靠、高可用，四大组件协同配合，多种消息灵活使用"

---

### 2. RocketMQ 的核心组件有哪些？

**核心答案：**
RocketMQ 的核心组件包括：Producer（生产者）、Consumer（消费者）、Broker（消息服务器）、NameServer（名称服务）。

**详细说明：**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<rect x="50" y="200" width="150" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="8"/>
<text x="125" y="230" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">Producer</text>
<text x="125" y="255" text-anchor="middle" font-size="13">生产者</text>
<text x="125" y="280" text-anchor="middle" font-size="11">• 消息生产</text>
<rect x="600" y="200" width="150" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="3" rx="8"/>
<text x="675" y="230" text-anchor="middle" font-size="18" font-weight="bold" fill="#7b1fa2">Consumer</text>
<text x="675" y="255" text-anchor="middle" font-size="13">消费者</text>
<text x="675" y="280" text-anchor="middle" font-size="11">• 消息消费</text>
<rect x="300" y="50" width="200" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="8"/>
<text x="400" y="85" text-anchor="middle" font-size="18" font-weight="bold" fill="#f57c00">NameServer</text>
<text x="400" y="110" text-anchor="middle" font-size="13">名称服务</text>
<text x="400" y="130" text-anchor="middle" font-size="11">• 路由注册中心</text>
<rect x="300" y="250" width="200" height="150" fill="#e8f5e9" stroke="#388e3c" stroke-width="3" rx="8"/>
<text x="400" y="285" text-anchor="middle" font-size="18" font-weight="bold" fill="#388e3c">Broker</text>
<text x="400" y="310" text-anchor="middle" font-size="13">消息服务器</text>
<text x="400" y="335" text-anchor="middle" font-size="11">• 消息存储</text>
<text x="400" y="355" text-anchor="middle" font-size="11">• 消息投递</text>
<text x="400" y="375" text-anchor="middle" font-size="11">• 主从复制</text>
<line x1="200" y1="240" x2="295" y2="120" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow)"/>
<text x="240" y="170" font-size="12" fill="#666">①路由发现</text>
<line x1="200" y1="260" x2="295" y2="300" stroke="#1976d2" stroke-width="3" marker-end="url(#arrow)"/>
<text x="235" y="285" font-size="13" fill="#1976d2" font-weight="bold">②发送</text>
<line x1="500" y1="300" x2="595" y2="250" stroke="#7b1fa2" stroke-width="3" marker-end="url(#arrow)"/>
<text x="535" y="270" font-size="13" fill="#7b1fa2" font-weight="bold">③拉取</text>
<line x1="600" y1="240" x2="505" y2="120" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow)"/>
<text x="540" y="170" font-size="12" fill="#666">④路由发现</text>
<line x1="400" y1="150" x2="400" y2="245" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
<path d="M 400 245 L 395 235 L 400 240 L 405 235 Z" fill="#666"/>
<path d="M 400 150 L 395 160 L 400 155 L 405 160 Z" fill="#666"/>
<text x="420" y="200" font-size="12" fill="#666">⑤心跳注册</text>
</svg>

**组件职责：**

| 组件 | 职责 | 特点 |
|------|------|------|
| **Producer** | 消息生产者 | 向 Broker 发送消息，支持同步/异步/单向发送 |
| **Consumer** | 消息消费者 | 从 Broker 拉取消息消费，支持集群/广播消费 |
| **Broker** | 消息服务器 | 存储消息、转发消息、支持主从部署 |
| **NameServer** | 路由注册中心 | 管理 Broker 路由信息，无状态轻量级服务 |

**工作流程：**

1. **Broker 启动**：向所有 NameServer 注册自己的路由信息
2. **Producer 启动**：从 NameServer 获取 Broker 路由信息
3. **消息发送**：Producer 根据路由信息选择 Broker 发送消息
4. **Consumer 启动**：从 NameServer 获取 Broker 路由信息
5. **消息消费**：Consumer 从 Broker 拉取消息进行消费
6. **心跳维护**：Producer/Consumer/Broker 定期向 NameServer 发送心跳

**关键要点：**
- 四大核心组件：Producer、Consumer、Broker、NameServer
- Producer 负责生产，Consumer 负责消费
- Broker 负责存储和转发，NameServer 负责路由管理
- 组件之间通过网络通信协同工作

**记忆口诀：**
"生产消费两端点，服务器中转存储站，名称服务做路由，四大组件缺一不可"

---

### 3. 什么是 Producer、Consumer、Broker、NameServer？

**核心答案：**
- **Producer**：消息生产者，负责产生和发送消息
- **Consumer**：消息消费者，负责接收和消费消息
- **Broker**：消息服务器，负责存储、转发和管理消息
- **NameServer**：路由注册中心，提供 Broker 的路由信息

**详细说明：**

#### 1. Producer（消息生产者）

**职责：**
- 创建并发送消息到 Broker
- 根据路由信息选择目标 Broker
- 处理消息发送失败的重试逻辑

**特点：**
- 支持多种发送方式（同步、异步、单向）
- 自动进行负载均衡
- 支持消息失败重试机制
- 可配置发送超时时间

#### 2. Consumer（消息消费者）

**职责：**
- 从 Broker 拉取消息进行消费
- 维护消费进度（Offset）
- 处理消息消费失败的重试逻辑

**特点：**
- 支持集群消费和广播消费两种模式
- 支持 Push 和 Pull 两种消费方式
- 自动进行消费负载均衡
- 支持消息过滤功能

#### 3. Broker（消息服务器）

**职责：**
- 接收 Producer 发送的消息并持久化
- 处理 Consumer 的消息拉取请求
- 维护消息的元数据信息
- 执行主从数据同步

**特点：**
- 支持主从架构（Master-Slave）
- 提供多种刷盘策略（同步/异步）
- 支持多种消息类型存储
- 定期向 NameServer 上报路由信息

#### 4. NameServer（名称服务）

**职责：**
- 管理 Broker 的路由注册信息
- 提供路由信息查询服务
- 检测 Broker 存活状态

**特点：**
- 无状态设计，各节点独立
- 轻量级，不参与消息传输
- 每个节点维护完整的路由信息
- 不依赖第三方组件（如 ZooKeeper）

**组件协作关系图：**

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<rect x="50" y="250" width="180" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="280" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">Producer</text>
<text x="140" y="310" text-anchor="middle" font-size="12">• 创建消息</text>
<text x="140" y="330" text-anchor="middle" font-size="12">• 选择队列</text>
<text x="140" y="350" text-anchor="middle" font-size="12">• 发送消息</text>
<rect x="670" y="250" width="180" height="120" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="760" y="280" text-anchor="middle" font-size="18" font-weight="bold" fill="#7b1fa2">Consumer</text>
<text x="760" y="310" text-anchor="middle" font-size="12">• 拉取消息</text>
<text x="760" y="330" text-anchor="middle" font-size="12">• 消费消息</text>
<text x="760" y="350" text-anchor="middle" font-size="12">• 提交进度</text>
<rect x="350" y="50" width="200" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="450" y="80" text-anchor="middle" font-size="18" font-weight="bold" fill="#f57c00">NameServer</text>
<text x="450" y="105" text-anchor="middle" font-size="12">路由注册中心</text>
<text x="450" y="125" text-anchor="middle" font-size="11">• 管理 Broker 信息</text>
<rect x="350" y="300" width="200" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="330" text-anchor="middle" font-size="18" font-weight="bold" fill="#388e3c">Broker</text>
<text x="450" y="360" text-anchor="middle" font-size="12">• 消息存储</text>
<text x="450" y="380" text-anchor="middle" font-size="12">• 消息转发</text>
<text x="450" y="400" text-anchor="middle" font-size="12">• 路由上报</text>
<text x="450" y="420" text-anchor="middle" font-size="12">• 主从同步</text>
<text x="450" y="440" text-anchor="middle" font-size="11">(Master/Slave)</text>
<line x1="230" y1="280" x2="345" y2="110" stroke="#999" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arr)"/>
<text x="270" y="180" font-size="11" fill="#666">1. 获取路由</text>
<line x1="230" y1="330" x2="345" y2="360" stroke="#1976d2" stroke-width="2" marker-end="url(#arr)"/>
<text x="270" y="350" font-size="12" fill="#1976d2" font-weight="bold">2. 发送消息</text>
<line x1="550" y1="360" x2="665" y2="310" stroke="#7b1fa2" stroke-width="2" marker-end="url(#arr)"/>
<text x="590" y="330" font-size="12" fill="#7b1fa2" font-weight="bold">3. 拉取消息</text>
<line x1="670" y1="280" x2="555" y2="110" stroke="#999" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arr)"/>
<text x="590" y="180" font-size="11" fill="#666">4. 获取路由</text>
<line x1="450" y1="150" x2="450" y2="295" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5"/>
<path d="M 450 295 L 445 285 L 450 290 L 455 285 Z" fill="#f57c00"/>
<path d="M 450 150 L 445 160 L 450 155 L 455 160 Z" fill="#f57c00"/>
<text x="470" y="225" font-size="11" fill="#f57c00">5. 心跳/路由上报</text>
<rect x="380" y="500" width="140" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="450" y="535" text-anchor="middle" font-size="14" font-weight="bold">CommitLog</text>
<line x1="450" y1="480" x2="450" y2="495" stroke="#388e3c" stroke-width="2" marker-end="url(#arr)"/>
<text x="470" y="492" font-size="10" fill="#666">持久化</text>
</svg>

**关键要点：**
- Producer 专注于消息生产和发送
- Consumer 专注于消息拉取和消费
- Broker 是消息的核心存储和转发节点
- NameServer 提供轻量级的路由服务

**记忆口诀：**
"生产者生产，消费者消费；服务器存储，名称服务路由"

---

### 4. RocketMQ 和 Kafka 的区别是什么？

**核心答案：**
RocketMQ 和 Kafka 都是优秀的消息队列，但 RocketMQ 更注重业务可靠性和灵活性，Kafka 更注重高吞吐和流式处理。

**详细说明：**

| 对比维度 | RocketMQ | Kafka |
|---------|----------|-------|
| **定位** | 业务消息队列 | 分布式流处理平台 |
| **开发语言** | Java | Scala/Java |
| **消息模型** | Pull 模型 | Pull 模型 |
| **消息顺序** | 分区顺序、全局顺序 | 分区顺序 |
| **消息可靠性** | 同步刷盘、同步复制 | 异步刷盘为主 |
| **事务消息** | ✅ 支持 | ❌ 不支持 |
| **延迟消息** | ✅ 支持（18个级别） | ❌ 不支持 |
| **消息重试** | ✅ 自动重试 | ❌ 需要自己实现 |
| **死信队列** | ✅ 内置支持 | ❌ 需要自己实现 |
| **消息过滤** | Broker 端过滤（Tag/SQL） | Consumer 端过滤 |
| **协调服务** | NameServer（无状态） | ZooKeeper（有状态） |
| **消息查询** | 支持按 Key、ID 查询 | 按 Offset 查询 |
| **性能** | 单机万级 TPS | 单机十万级 TPS |
| **延迟** | 毫秒级 | 毫秒级 |
| **消息回溯** | 支持按时间回溯 | 支持按 Offset 回溯 |

**架构对比图：**

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<text x="200" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#f57c00">RocketMQ</text>
<rect x="50" y="50" width="100" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="100" y="85" text-anchor="middle" font-size="14" font-weight="bold">Producer</text>
<rect x="50" y="180" width="100" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="100" y="215" text-anchor="middle" font-size="14" font-weight="bold">Consumer</text>
<rect x="200" y="80" width="100" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="250" y="115" text-anchor="middle" font-size="13" font-weight="bold">NameServer</text>
<rect x="200" y="180" width="100" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="250" y="210" text-anchor="middle" font-size="14" font-weight="bold">Broker</text>
<text x="250" y="230" text-anchor="middle" font-size="11">Master</text>
<text x="250" y="250" text-anchor="middle" font-size="11">Slave</text>
<line x1="150" y1="80" x2="195" y2="110" stroke="#666" stroke-width="1.5"/>
<line x1="150" y1="210" x2="195" y2="110" stroke="#666" stroke-width="1.5"/>
<line x1="150" y1="80" x2="195" y2="230" stroke="#1976d2" stroke-width="2"/>
<line x1="200" y1="230" x2="155" y2="210" stroke="#7b1fa2" stroke-width="2"/>
<rect x="210" y="310" width="80" height="40" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="250" y="335" text-anchor="middle" font-size="12">事务消息</text>
<rect x="210" y="360" width="80" height="40" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="250" y="385" text-anchor="middle" font-size="12">延迟消息</text>
<text x="700" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#00796b">Kafka</text>
<rect x="550" y="50" width="100" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="600" y="85" text-anchor="middle" font-size="14" font-weight="bold">Producer</text>
<rect x="550" y="180" width="100" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="600" y="215" text-anchor="middle" font-size="14" font-weight="bold">Consumer</text>
<rect x="700" y="80" width="100" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="750" y="115" text-anchor="middle" font-size="13" font-weight="bold">ZooKeeper</text>
<rect x="700" y="180" width="100" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="750" y="220" text-anchor="middle" font-size="14" font-weight="bold">Broker</text>
<text x="750" y="240" text-anchor="middle" font-size="11">Leader</text>
<text x="750" y="260" text-anchor="middle" font-size="11">Follower</text>
<line x1="650" y1="80" x2="695" y2="110" stroke="#666" stroke-width="1.5"/>
<line x1="650" y1="210" x2="695" y2="110" stroke="#666" stroke-width="1.5"/>
<line x1="650" y1="80" x2="695" y2="230" stroke="#1976d2" stroke-width="2"/>
<line x1="700" y1="230" x2="655" y2="210" stroke="#7b1fa2" stroke-width="2"/>
<rect x="710" y="310" width="80" height="40" fill="#b2dfdb" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="750" y="335" text-anchor="middle" font-size="12">高吞吐</text>
<rect x="710" y="360" width="80" height="40" fill="#b2dfdb" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="750" y="385" text-anchor="middle" font-size="12">流处理</text>
<text x="450" y="460" text-anchor="middle" font-size="14" font-weight="bold" fill="#666">选型建议</text>
<text x="250" y="440" text-anchor="middle" font-size="12" fill="#f57c00">业务解耦、事务场景</text>
<text x="650" y="440" text-anchor="middle" font-size="12" fill="#00796b">日志收集、大数据场景</text>
</svg>

**主要区别总结：**

1. **功能丰富度**
   - RocketMQ：支持事务消息、延迟消息、死信队列、消息重试等
   - Kafka：专注于高吞吐、流式处理，业务特性较少

2. **协调服务**
   - RocketMQ：使用轻量级的 NameServer，无状态设计
   - Kafka：依赖 ZooKeeper，运维复杂度较高

3. **消息可靠性**
   - RocketMQ：提供同步刷盘、同步复制，可靠性更高
   - Kafka：主要使用异步刷盘，追求高吞吐

4. **消息过滤**
   - RocketMQ：在 Broker 端过滤，减少网络传输
   - Kafka：在 Consumer 端过滤，网络开销大

5. **应用场景**
   - RocketMQ：业务系统解耦、订单处理、支付回调
   - Kafka：日志收集、监控数据、大数据流式处理

**关键要点：**
- RocketMQ 更适合业务系统，功能丰富
- Kafka 更适合大数据场景，吞吐量高
- RocketMQ 支持事务和延迟消息
- Kafka 不依赖第三方服务做协调

**记忆口诀：**
"RocketMQ 重业务，Kafka 重吞吐；事务延迟前者有，流式处理后者强"

---

### 5. RocketMQ 的应用场景有哪些？

**核心答案：**
RocketMQ 适用于异步解耦、削峰填谷、分布式事务、消息通知等场景。

**详细说明：**

#### 1. 异步解耦

**场景**：订单系统需要通知库存、积分、短信等多个子系统

**问题**：同步调用导致响应慢、耦合度高、一个系统故障影响全局

**解决方案**：
<svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="a1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<rect x="50" y="120" width="120" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="110" y="155" text-anchor="middle" font-size="16" font-weight="bold">订单系统</text>
<rect x="290" y="120" width="120" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="350" y="155" text-anchor="middle" font-size="16" font-weight="bold">RocketMQ</text>
<rect x="530" y="30" width="100" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="580" y="60" text-anchor="middle" font-size="14">库存系统</text>
<rect x="530" y="100" width="100" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="580" y="130" text-anchor="middle" font-size="14">积分系统</text>
<rect x="530" y="170" width="100" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="580" y="200" text-anchor="middle" font-size="14">短信系统</text>
<rect x="530" y="240" width="100" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="580" y="270" text-anchor="middle" font-size="14">...</text>
<line x1="170" y1="150" x2="285" y2="150" stroke="#1976d2" stroke-width="3" marker-end="url(#a1)"/>
<text x="220" y="140" font-size="13" fill="#1976d2">发送消息</text>
<line x1="410" y1="140" x2="525" y2="55" stroke="#388e3c" stroke-width="2" marker-end="url(#a1)"/>
<line x1="410" y1="145" x2="525" y2="125" stroke="#388e3c" stroke-width="2" marker-end="url(#a1)"/>
<line x1="410" y1="155" x2="525" y2="195" stroke="#388e3c" stroke-width="2" marker-end="url(#a1)"/>
<line x1="410" y1="160" x2="525" y2="265" stroke="#388e3c" stroke-width="2" marker-end="url(#a1)"/>
<text x="450" y="90" font-size="11" fill="#666">订阅消费</text>
<circle cx="750" cy="150" r="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="750" y="140" text-anchor="middle" font-size="14" font-weight="bold" fill="#7b1fa2">优势</text>
<text x="750" y="165" text-anchor="middle" font-size="12">• 解耦</text>
<text x="750" y="185" text-anchor="middle" font-size="12">• 异步</text>
</svg>

#### 2. 削峰填谷

**场景**：秒杀、抢购活动，瞬时流量激增

**问题**：数据库压力过大，系统崩溃

**解决方案**：
<svg viewBox="0 0 900 320" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="a2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<rect x="50" y="100" width="120" height="120" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="110" y="140" text-anchor="middle" font-size="14" font-weight="bold">高峰流量</text>
<line x="60" y1="180" x2="80" y2="160" stroke="#c62828" stroke-width="3"/>
<line x="80" y1="160" x2="100" y2="165" stroke="#c62828" stroke-width="3"/>
<line x="100" y1="165" x2="120" y2="150" stroke="#c62828" stroke-width="3"/>
<line x="120" y1="150" x2="140" y2="160" stroke="#c62828" stroke-width="3"/>
<line x="140" y1="160" x2="160" y2="155" stroke="#c62828" stroke-width="3"/>
<text x="110" y="205" text-anchor="middle" font-size="12">瞬时大量请求</text>
<rect x="290" y="120" width="120" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="350" y="155" text-anchor="middle" font-size="16" font-weight="bold">RocketMQ</text>
<text x="350" y="175" text-anchor="middle" font-size="11">缓冲队列</text>
<rect x="530" y="100" width="120" height="120" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="590" y="140" text-anchor="middle" font-size="14" font-weight="bold">平稳处理</text>
<line x="560" y1="180" x2="580" y2="170" stroke="#388e3c" stroke-width="2"/>
<line x="580" y1="170" x2="600" y2="168" stroke="#388e3c" stroke-width="2"/>
<line x="600" y1="168" x2="620" y2="169" stroke="#388e3c" stroke-width="2"/>
<text x="590" y="205" text-anchor="middle" font-size="12">按能力消费</text>
<line x1="170" y1="160" x2="285" y2="160" stroke="#c62828" stroke-width="3" marker-end="url(#a2)"/>
<text x="220" y="150" font-size="12" fill="#c62828">削峰</text>
<line x1="410" y1="160" x2="525" y2="160" stroke="#388e3c" stroke-width="2" marker-end="url(#a2)"/>
<text x="460" y="150" font-size="12" fill="#388e3c">填谷</text>
<circle cx="750" cy="160" r="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="750" y="150" text-anchor="middle" font-size="14" font-weight="bold" fill="#7b1fa2">效果</text>
<text x="750" y="175" text-anchor="middle" font-size="12">保护系统</text>
<text x="750" y="195" text-anchor="middle" font-size="12">稳定运行</text>
</svg>

#### 3. 分布式事务

**场景**：订单系统下单后需要扣减库存、扣减账户余额，保证一致性

**解决方案**：使用 RocketMQ 的事务消息

<svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="a3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#333"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#666">事务消息流程</text>
<rect x="50" y="60" width="120" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="110" y="95" text-anchor="middle" font-size="14" font-weight="bold">订单服务</text>
<rect x="390" y="60" width="120" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="450" y="95" text-anchor="middle" font-size="14" font-weight="bold">RocketMQ</text>
<rect x="730" y="60" width="120" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="790" y="95" text-anchor="middle" font-size="14" font-weight="bold">库存服务</text>
<line x1="110" y1="120" x2="110" y2="350" stroke="#999" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="450" y1="120" x2="450" y2="350" stroke="#999" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="790" y1="120" x2="790" y2="350" stroke="#999" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="110" y1="150" x2="445" y2="150" stroke="#1976d2" stroke-width="2" marker-end="url(#a3)"/>
<text x="260" y="145" font-size="11" fill="#1976d2">①发送半消息</text>
<line x1="110" y1="180" x2="110" y2="200" stroke="#c62828" stroke-width="2"/>
<rect x="60" y="200" width="100" height="30" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="3"/>
<text x="110" y="220" text-anchor="middle" font-size="11" font-weight="bold">②执行本地事务</text>
<line x1="110" y1="230" x2="445" y2="250" stroke="#388e3c" stroke-width="2" marker-end="url(#a3)"/>
<text x="260" y="245" font-size="11" fill="#388e3c">③提交/回滚</text>
<line x1="450" y1="280" x2="785" y2="280" stroke="#7b1fa2" stroke-width="2" marker-end="url(#a3)"/>
<text x="600" y="275" font-size="11" fill="#7b1fa2">④投递消息</text>
<line x1="790" y1="310" x2="790" y2="330" stroke="#c62828" stroke-width="2"/>
<rect x="740" y="330" width="100" height="30" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="3"/>
<text x="790" y="350" text-anchor="middle" font-size="11" font-weight="bold">⑤扣减库存</text>
</svg>

#### 4. 消息通知

**场景**：系统状态变更、用户行为触发通知

**示例**：
- 订单状态变更通知
- 用户注册成功通知
- 支付成功通知
- 物流状态变更通知

#### 5. 数据同步

**场景**：多个系统之间需要同步数据

**示例**：
- 订单数据同步到数据仓库
- 用户数据同步到缓存
- 商品信息同步到搜索引擎

#### 6. 日志收集

**场景**：分布式系统的日志统一收集

**示例**：
- 应用日志收集
- 业务埋点数据收集
- 监控数据采集

**应用场景总结表：**

| 场景 | 典型应用 | 核心价值 |
|------|---------|---------|
| **异步解耦** | 订单处理、用户注册 | 降低耦合、提升性能 |
| **削峰填谷** | 秒杀、抢购 | 保护系统、稳定运行 |
| **分布式事务** | 订单+库存、支付+账户 | 保证最终一致性 |
| **消息通知** | 状态变更、事件通知 | 实时通知、异步处理 |
| **数据同步** | 数据库同步、缓存更新 | 数据一致性 |
| **日志收集** | 日志聚合、监控采集 | 统一管理、分析处理 |

**关键要点：**
- 异步解耦是最常用的场景
- 削峰填谷保护系统稳定
- 事务消息保证最终一致性
- 适用于各种消息驱动的场景

**记忆口诀：**
"解耦削峰事务三大法宝，通知同步日志样样精通"
