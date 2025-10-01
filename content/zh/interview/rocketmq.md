# RocketMQ 面试题

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

## 消息发送

13. RocketMQ 有哪些消息发送方式？

**核心答案：**
RocketMQ 提供三种消息发送方式：同步发送（Sync）、异步发送（Async）、单向发送（Oneway）。

**详细说明：**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
</marker>
</defs>
<rect x="50" y="50" width="200" height="280" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="80" text-anchor="middle" font-weight="bold" font-size="16">Producer</text>
<rect x="550" y="50" width="200" height="280" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="650" y="80" text-anchor="middle" font-weight="bold" font-size="16">Broker</text>
<g id="sync">
<rect x="70" y="100" width="160" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="2" rx="3"/>
<text x="150" y="125" text-anchor="middle" fill="white" font-weight="bold">同步发送</text>
<line x1="230" y1="120" x2="550" y2="120" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="390" y="110" text-anchor="middle" font-size="12">发送消息</text>
<line x1="550" y1="140" x2="230" y2="140" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="390" y="155" text-anchor="middle" font-size="12">等待响应</text>
</g>
<g id="async">
<rect x="70" y="170" width="160" height="40" fill="#2196f3" stroke="#1565c0" stroke-width="2" rx="3"/>
<text x="150" y="195" text-anchor="middle" fill="white" font-weight="bold">异步发送</text>
<line x1="230" y1="190" x2="550" y2="190" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="390" y="180" text-anchor="middle" font-size="12">发送消息</text>
<line x1="550" y1="210" x2="230" y2="210" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>
<text x="390" y="225" text-anchor="middle" font-size="12">回调通知</text>
</g>
<g id="oneway">
<rect x="70" y="240" width="160" height="40" fill="#ff9800" stroke="#e65100" stroke-width="2" rx="3"/>
<text x="150" y="265" text-anchor="middle" fill="white" font-weight="bold">单向发送</text>
<line x1="230" y1="260" x2="550" y2="260" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="390" y="250" text-anchor="middle" font-size="12">发送消息(无响应)</text>
</g>
<text x="150" y="315" text-anchor="middle" font-size="13" fill="#666">阻塞等待</text>
<text x="150" y="330" text-anchor="middle" font-size="13" fill="#666">可靠性最高</text>
<text x="400" y="350" text-anchor="middle" font-size="14" font-weight="bold" fill="#d32f2f">可靠性：同步 > 异步 > 单向</text>
<text x="400" y="370" text-anchor="middle" font-size="14" font-weight="bold" fill="#388e3c">性能：单向 > 异步 > 同步</text>
</svg>

**三种方式对比：**

| 发送方式 | 是否等待响应 | 可靠性 | 性能 | 适用场景 |
|---------|------------|--------|------|---------|
| 同步发送 | 是，阻塞等待 | 最高 | 较低 | 重要消息、订单、支付 |
| 异步发送 | 否，回调通知 | 高 | 较高 | 日志、监控、通知 |
| 单向发送 | 否，无响应 | 低 | 最高 | 心跳、日志采集 |

**关键要点：**
- 同步发送：等待结果，确保可靠，性能最低
- 异步发送：不阻塞，通过回调获取结果
- 单向发送：只管发送，不管结果

**记忆口诀：**
"**同步等结果，异步有回调，单向不管了**"

14. 什么是同步发送、异步发送、单向发送？

**核心答案：**
- **同步发送**：发送消息后阻塞等待 Broker 的响应结果
- **异步发送**：发送消息后立即返回，通过回调函数处理响应
- **单向发送**：只负责发送消息，不等待也不处理响应

**详细说明：**

**1. 同步发送（Sync Send）**

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
</marker>
</defs>
<rect x="50" y="50" width="150" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="80" text-anchor="middle" font-weight="bold">Producer</text>
<rect x="500" y="50" width="150" height="200" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="575" y="80" text-anchor="middle" font-weight="bold">Broker</text>
<line x1="200" y1="120" x2="500" y2="120" stroke="#4caf50" stroke-width="3" marker-end="url(#arrow1)"/>
<text x="350" y="110" text-anchor="middle" font-size="14" fill="#4caf50" font-weight="bold">1. send(msg)</text>
<rect x="70" y="135" width="110" height="35" fill="#ffeb3b" stroke="#f57f17" stroke-width="2" rx="3"/>
<text x="125" y="157" text-anchor="middle" font-size="13" font-weight="bold">阻塞等待</text>
<line x1="500" y1="180" x2="200" y2="180" stroke="#2196f3" stroke-width="3" marker-end="url(#arrow1)"/>
<text x="350" y="170" text-anchor="middle" font-size="14" fill="#2196f3" font-weight="bold">2. SendResult</text>
<rect x="70" y="195" width="110" height="35" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="3"/>
<text x="125" y="217" text-anchor="middle" font-size="13" font-weight="bold">继续执行</text>
<text x="350" y="270" text-anchor="middle" font-size="15" fill="#d32f2f" font-weight="bold">特点：可靠性高，吞吐量低</text>
</svg>

```java
// 同步发送示例
SendResult sendResult = producer.send(msg);
if (sendResult.getSendStatus() == SendStatus.SEND_OK) {
    // 发送成功
}
```

**2. 异步发送（Async Send）**

<svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
</marker>
</defs>
<rect x="50" y="50" width="150" height="250" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="80" text-anchor="middle" font-weight="bold">Producer</text>
<rect x="500" y="50" width="150" height="250" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="575" y="80" text-anchor="middle" font-weight="bold">Broker</text>
<line x1="200" y1="120" x2="500" y2="120" stroke="#4caf50" stroke-width="3" marker-end="url(#arrow2)"/>
<text x="350" y="110" text-anchor="middle" font-size="14" fill="#4caf50" font-weight="bold">1. send(msg, callback)</text>
<rect x="70" y="135" width="110" height="35" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="3"/>
<text x="125" y="157" text-anchor="middle" font-size="13" font-weight="bold">立即返回</text>
<rect x="70" y="175" width="110" height="35" fill="#e1bee7" stroke="#7b1fa2" stroke-width="2" rx="3"/>
<text x="125" y="197" text-anchor="middle" font-size="13" font-weight="bold">继续执行</text>
<line x1="500" y1="240" x2="200" y2="240" stroke="#2196f3" stroke-width="3" marker-end="url(#arrow2)" stroke-dasharray="5,5"/>
<text x="350" y="230" text-anchor="middle" font-size="14" fill="#2196f3" font-weight="bold">2. callback(result)</text>
<rect x="70" y="255" width="110" height="35" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="3"/>
<text x="125" y="277" text-anchor="middle" font-size="13" font-weight="bold">回调处理</text>
<text x="350" y="320" text-anchor="middle" font-size="15" fill="#d32f2f" font-weight="bold">特点：高吞吐，不阻塞</text>
</svg>

```java
// 异步发送示例
producer.send(msg, new SendCallback() {
    public void onSuccess(SendResult sendResult) {
        // 发送成功回调
    }
    public void onException(Throwable e) {
        // 发送失败回调
    }
});
// 立即返回，不阻塞
```

**3. 单向发送（Oneway Send）**

<svg viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
</marker>
</defs>
<rect x="50" y="50" width="150" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="80" text-anchor="middle" font-weight="bold">Producer</text>
<rect x="500" y="50" width="150" height="150" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="575" y="80" text-anchor="middle" font-weight="bold">Broker</text>
<line x1="200" y1="120" x2="500" y2="120" stroke="#ff9800" stroke-width="3" marker-end="url(#arrow3)"/>
<text x="350" y="110" text-anchor="middle" font-size="14" fill="#ff9800" font-weight="bold">sendOneway(msg)</text>
<rect x="70" y="135" width="110" height="35" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="3"/>
<text x="125" y="157" text-anchor="middle" font-size="13" font-weight="bold">立即返回</text>
<text x="350" y="170" text-anchor="middle" font-size="14" fill="#999" font-style="italic">无响应无回调</text>
<text x="350" y="220" text-anchor="middle" font-size="15" fill="#d32f2f" font-weight="bold">特点：最高性能，无可靠性保证</text>
</svg>

```java
// 单向发送示例
producer.sendOneway(msg);
// 立即返回，无响应
```

**对比总结：**

| 特性 | 同步发送 | 异步发送 | 单向发送 |
|-----|---------|---------|---------|
| 阻塞 | 是 | 否 | 否 |
| 响应 | 等待结果 | 回调通知 | 无响应 |
| 可靠性 | 高 | 中 | 低 |
| 性能 | 低 | 高 | 最高 |
| 超时时间 | 3秒（默认） | 支持设置 | 无 |
| 重试 | 支持 | 支持 | 不支持 |

**关键要点：**
- **同步**：线程阻塞，等待确认，适合重要业务
- **异步**：非阻塞，回调处理，适合高并发场景
- **单向**：发完即忘，适合日志、心跳等允许丢失的场景

**记忆口诀：**
"**同步等着看，异步回头叫，单向扭头走**"

15. 如何保证消息发送成功？

**核心答案：**
通过**同步发送 + 重试机制 + 状态检查 + 日志记录 + Broker 确认**的组合方式保证消息发送成功。

**详细说明：**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="500" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold">消息发送成功保障机制</text>
<g id="step1">
<rect x="80" y="90" width="640" height="70" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="100" y="115" font-weight="bold" font-size="15">1. 使用同步发送</text>
<text x="100" y="135" font-size="13">• 调用 send() 方法，等待 Broker 响应</text>
<text x="100" y="150" font-size="13">• 返回 SendResult，包含发送状态和消息 ID</text>
</g>
<g id="step2">
<rect x="80" y="175" width="640" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="100" y="200" font-weight="bold" font-size="15">2. 检查发送状态</text>
<text x="100" y="220" font-size="13">• SEND_OK：发送成功</text>
<text x="100" y="235" font-size="13">• FLUSH_DISK_TIMEOUT、FLUSH_SLAVE_TIMEOUT、SLAVE_NOT_AVAILABLE：需重试</text>
</g>
<g id="step3">
<rect x="80" y="260" width="640" height="70" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="100" y="285" font-weight="bold" font-size="15">3. 配置重试机制</text>
<text x="100" y="305" font-size="13">• setRetryTimesWhenSendFailed(3)：同步发送失败重试次数</text>
<text x="100" y="320" font-size="13">• setRetryTimesWhenSendAsyncFailed(3)：异步发送失败重试次数</text>
</g>
<g id="step4">
<rect x="80" y="345" width="640" height="70" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="100" y="370" font-weight="bold" font-size="15">4. 异常处理和日志</text>
<text x="100" y="390" font-size="13">• 捕获异常，记录失败日志</text>
<text x="100" y="405" font-size="13">• 失败消息存入本地数据库或文件，后续补偿</text>
</g>
<g id="step5">
<rect x="80" y="430" width="640" height="70" fill="#ffe0b2" stroke="#ef6c00" stroke-width="2" rx="5"/>
<text x="100" y="455" font-weight="bold" font-size="15">5. Broker 端保障</text>
<text x="100" y="475" font-size="13">• 同步刷盘：消息写入磁盘后才返回成功</text>
<text x="100" y="490" font-size="13">• 主从同步：消息同步到从节点后才返回成功</text>
</g>
</svg>

**代码示例：**

```java
DefaultMQProducer producer = new DefaultMQProducer("producer_group");

// 1. 配置重试次数
producer.setRetryTimesWhenSendFailed(3);        // 同步发送失败重试
producer.setRetryTimesWhenSendAsyncFailed(3);   // 异步发送失败重试

// 2. 设置发送超时时间
producer.setSendMsgTimeout(3000); // 3秒

producer.start();

try {
    Message msg = new Message("TopicTest", "TagA", "Hello RocketMQ".getBytes());

    // 3. 使用同步发送
    SendResult sendResult = producer.send(msg);

    // 4. 检查发送状态
    if (sendResult.getSendStatus() == SendStatus.SEND_OK) {
        System.out.println("发送成功：" + sendResult.getMsgId());
    } else {
        // 5. 记录失败日志，进行补偿
        logger.error("发送失败：" + sendResult.getSendStatus());
        saveToDB(msg); // 存入数据库，后续重试
    }

} catch (Exception e) {
    // 6. 异常处理
    logger.error("发送异常", e);
    saveToDB(msg); // 失败消息入库
}
```

**SendStatus 状态说明：**

| 状态 | 说明 | 是否成功 |
|-----|------|---------|
| SEND_OK | 发送成功 | ✅ 是 |
| FLUSH_DISK_TIMEOUT | 刷盘超时 | ❌ 否，需重试 |
| FLUSH_SLAVE_TIMEOUT | 同步到从节点超时 | ❌ 否，需重试 |
| SLAVE_NOT_AVAILABLE | 从节点不可用 | ❌ 否，需重试 |

**保障措施总结：**

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="150" height="60" fill="#4caf50" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="125" y="85" text-anchor="middle" fill="white" font-weight="bold">Producer</text>
<rect x="275" y="50" width="150" height="60" fill="#2196f3" stroke="#1565c0" stroke-width="2" rx="5"/>
<text x="350" y="75" text-anchor="middle" fill="white" font-size="12">同步发送</text>
<text x="350" y="95" text-anchor="middle" fill="white" font-size="12">+ 重试</text>
<rect x="500" y="50" width="150" height="60" fill="#ff9800" stroke="#e65100" stroke-width="2" rx="5"/>
<text x="575" y="85" text-anchor="middle" fill="white" font-weight="bold">Broker</text>
<rect x="50" y="140" width="150" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="125" y="165" text-anchor="middle" font-size="12">状态检查</text>
<text x="125" y="183" text-anchor="middle" font-size="12">异常捕获</text>
<rect x="275" y="140" width="150" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="350" y="165" text-anchor="middle" font-size="12">失败日志</text>
<text x="350" y="183" text-anchor="middle" font-size="12">补偿机制</text>
<rect x="500" y="140" width="150" height="60" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="3"/>
<text x="575" y="165" text-anchor="middle" font-size="12">同步刷盘</text>
<text x="575" y="183" text-anchor="middle" font-size="12">主从复制</text>
<text x="350" y="240" text-anchor="middle" font-size="16" font-weight="bold" fill="#d32f2f">层层保障，确保可靠</text>
<text x="350" y="265" text-anchor="middle" font-size="13" fill="#666">Producer 重试 + Broker 持久化 + 补偿机制</text>
</svg>

**关键要点：**
- **Producer 层**：同步发送 + 重试 + 状态检查
- **Broker 层**：同步刷盘 + 主从复制
- **应用层**：异常捕获 + 日志记录 + 失败补偿

**记忆口诀：**
"**同步等结果，重试加检查，失败有补偿，刷盘加复制**"

16. 什么是消息发送的重试机制？

**核心答案：**
RocketMQ 的消息发送重试机制是指当消息发送失败时，Producer 会**自动选择另一个 Broker 或 Queue 进行重试**，提高消息发送的成功率。

**详细说明：**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
</marker>
</defs>
<rect x="50" y="50" width="150" height="400" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="80" text-anchor="middle" font-weight="bold" font-size="16">Producer</text>
<rect x="300" y="50" width="150" height="150" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="375" y="80" text-anchor="middle" font-weight="bold">Broker-A</text>
<text x="375" y="100" text-anchor="middle" font-size="12">Queue-0</text>
<text x="375" y="120" text-anchor="middle" font-size="12">Queue-1</text>
<text x="375" y="140" text-anchor="middle" font-size="12">Queue-2</text>
<rect x="300" y="230" width="150" height="100" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="375" y="260" text-anchor="middle" font-weight="bold">Broker-B</text>
<text x="375" y="280" text-anchor="middle" font-size="12">Queue-0</text>
<text x="375" y="300" text-anchor="middle" font-size="12">Queue-1</text>
<rect x="300" y="360" width="150" height="90" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="375" y="390" text-anchor="middle" font-weight="bold">Broker-C</text>
<text x="375" y="410" text-anchor="middle" font-size="12">Queue-0</text>
<line x1="200" y1="150" x2="300" y2="120" stroke="#d32f2f" stroke-width="3" marker-end="url(#arrow5)"/>
<text x="250" y="130" text-anchor="middle" font-size="12" fill="#d32f2f" font-weight="bold">①发送失败</text>
<line x1="200" y1="250" x2="300" y2="270" stroke="#ff9800" stroke-width="3" marker-end="url(#arrow5)"/>
<text x="250" y="255" text-anchor="middle" font-size="12" fill="#ff9800" font-weight="bold">②重试1</text>
<line x1="200" y1="350" x2="300" y2="390" stroke="#4caf50" stroke-width="3" marker-end="url(#arrow5)"/>
<text x="250" y="365" text-anchor="middle" font-size="12" fill="#4caf50" font-weight="bold">③重试2成功</text>
<rect x="500" y="150" width="250" height="280" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="625" y="180" text-anchor="middle" font-weight="bold" font-size="15">重试策略</text>
<text x="520" y="210" font-size="13" font-weight="bold">1. 默认重试次数：</text>
<text x="530" y="230" font-size="12">• 同步发送：2次 (共3次)</text>
<text x="530" y="248" font-size="12">• 异步发送：2次 (共3次)</text>
<text x="530" y="266" font-size="12">• 单向发送：不重试</text>
<text x="520" y="295" font-size="13" font-weight="bold">2. 重试间隔：立即</text>
<text x="520" y="325" font-size="13" font-weight="bold">3. Broker 选择策略：</text>
<text x="530" y="345" font-size="12">• 避开上次失败的 Broker</text>
<text x="530" y="363" font-size="12">• 轮询选择可用的 Broker</text>
<text x="520" y="392" font-size="13" font-weight="bold">4. 超时控制：</text>
<text x="530" y="412" font-size="12">• 默认 3 秒超时</text>
</svg>

**重试机制配置：**

```java
DefaultMQProducer producer = new DefaultMQProducer("producer_group");

// 1. 配置同步发送失败重试次数 (默认2次，总共发送3次)
producer.setRetryTimesWhenSendFailed(2);

// 2. 配置异步发送失败重试次数 (默认2次)
producer.setRetryTimesWhenSendAsyncFailed(2);

// 3. 设置发送超时时间 (默认3000ms)
producer.setSendMsgTimeout(3000);

// 4. 是否在内部发送失败时重试另一个 Broker (默认false，同步模式下生效)
producer.setRetryAnotherBrokerWhenNotStoreOK(false);

producer.start();
```

**重试流程：**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="600" height="320" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"/>
<text x="350" y="85" text-anchor="middle" font-size="16" font-weight="bold">消息发送重试流程</text>
<circle cx="120" cy="140" r="35" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="120" y="150" text-anchor="middle" fill="white" font-weight="bold">开始</text>
<rect x="220" y="110" width="120" height="60" fill="#2196f3" stroke="#1565c0" stroke-width="2" rx="5"/>
<text x="280" y="135" text-anchor="middle" fill="white" font-size="13">选择 Broker</text>
<text x="280" y="153" text-anchor="middle" fill="white" font-size="13">发送消息</text>
<path d="M 155 140 L 220 140" stroke="#333" stroke-width="2" marker-end="url(#arrow5)"/>
<path d="M 340 140 L 400 140" stroke="#333" stroke-width="2" marker-end="url(#arrow5)"/>
<path d="M 280 170 Q 280 230 220 230 Q 160 230 160 170" stroke="#ff9800" stroke-width="2" fill="none" marker-end="url(#arrow5)"/>
<text x="160" y="220" font-size="12" fill="#ff9800" font-weight="bold">失败且未达重试上限</text>
<rect x="400" y="110" width="100" height="60" fill="#ffeb3b" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="450" y="135" text-anchor="middle" font-size="13">是否成功?</text>
<circle cx="450" cy="270" r="35" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="450" y="280" text-anchor="middle" fill="white" font-weight="bold">成功</text>
<path d="M 450 170 L 450 235" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="470" y="210" font-size="12" fill="#4caf50" font-weight="bold">是</text>
<circle cx="570" cy="270" r="35" fill="#f44336" stroke="#c62828" stroke-width="2"/>
<text x="570" y="280" text-anchor="middle" fill="white" font-weight="bold">失败</text>
<path d="M 500 140 Q 570 140 570 235" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="540" y="180" font-size="12" fill="#d32f2f" font-weight="bold">达到重试上限</text>
<text x="350" y="350" text-anchor="middle" font-size="13" fill="#666">重试时会选择不同的 Broker 或 Queue</text>
</svg>

**重试触发条件：**

| 异常类型 | 是否重试 | 说明 |
|---------|---------|------|
| RemotingException | ✅ 是 | 网络异常，重试其他 Broker |
| MQClientException | ✅ 是 | 客户端异常 |
| MQBrokerException | ✅ 是 | Broker 异常 |
| InterruptedException | ❌ 否 | 线程中断 |
| 超时 | ✅ 是 | 发送超时，重试 |
| Broker 返回非 SEND_OK | 可配置 | 根据配置决定 |

**关键要点：**
- **自动重试**：发送失败自动换 Broker 重试
- **默认 2 次**：同步和异步都支持重试
- **立即重试**：无延迟，快速切换
- **避坑策略**：重试时避开失败的 Broker

**记忆口诀：**
"**发送失败换个试，两次重试三次发，立即切换不延迟**"

17. 消息发送失败如何处理？

**核心答案：**
消息发送失败的处理采用**分层处理策略**：Producer 层自动重试 + 应用层日志记录 + 补偿机制。

**详细说明：**

<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow6" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="430" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold">消息发送失败处理方案</text>
<g id="layer1">
<rect x="80" y="90" width="640" height="90" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="100" y="115" font-weight="bold" font-size="15">第一层：Producer 自动重试（框架层）</text>
<text x="100" y="138" font-size="13">• 同步/异步发送失败，自动重试 2 次</text>
<text x="100" y="156" font-size="13">• 切换 Broker 或 Queue 重试</text>
<text x="100" y="174" font-size="13">• 仍失败则抛出异常</text>
</g>
<line x1="400" y1="180" x2="400" y2="200" stroke="#666" stroke-width="2" marker-end="url(#arrow6)"/>
<g id="layer2">
<rect x="80" y="200" width="640" height="90" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="100" y="225" font-weight="bold" font-size="15">第二层：应用层异常捕获（业务层）</text>
<text x="100" y="248" font-size="13">• try-catch 捕获发送异常</text>
<text x="100" y="266" font-size="13">• 记录失败日志（消息体、时间、异常）</text>
<text x="100" y="284" font-size="13">• 将失败消息存入本地数据库或 Redis</text>
</g>
<line x1="400" y1="290" x2="400" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrow6)"/>
<g id="layer3">
<rect x="80" y="310" width="640" height="90" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="100" y="335" font-weight="bold" font-size="15">第三层：补偿机制（恢复层）</text>
<text x="100" y="358" font-size="13">• 定时任务扫描失败消息表</text>
<text x="100" y="376" font-size="13">• 重新发送失败的消息</text>
<text x="100" y="394" font-size="13">• 超过重试次数后人工介入或告警</text>
</g>
<text x="400" y="435" text-anchor="middle" font-size="14" fill="#d32f2f" font-weight="bold">三层保障，确保消息不丢失</text>
</svg>

**处理方案代码示例：**

```java
// 1. 消息失败表结构
@Table(name = "message_send_fail_log")
public class MessageSendFailLog {
    private Long id;
    private String topic;
    private String tag;
    private String keys;
    private String body;            // 消息体
    private String errorMsg;        // 错误信息
    private Integer retryCount;     // 重试次数
    private Date createTime;
    private Date updateTime;
}

// 2. 发送消息时的异常处理
public class MessageProducer {

    @Autowired
    private MessageSendFailLogService failLogService;

    public void sendMessage(String topic, String tag, String keys, String body) {
        Message msg = new Message(topic, tag, keys, body.getBytes());

        try {
            // 同步发送
            SendResult result = producer.send(msg);

            // 检查发送状态
            if (result.getSendStatus() == SendStatus.SEND_OK) {
                logger.info("消息发送成功: {}", result.getMsgId());
            } else {
                // 发送状态异常，记录失败日志
                logger.error("消息发送状态异常: {}", result.getSendStatus());
                saveFailLog(topic, tag, keys, body, "发送状态异常: " + result.getSendStatus());
            }

        } catch (RemotingException | MQBrokerException |
                 InterruptedException | MQClientException e) {
            // 捕获异常，记录失败日志
            logger.error("消息发送失败", e);
            saveFailLog(topic, tag, keys, body, e.getMessage());

            // 根据业务需求，决定是否抛出异常
            throw new BusinessException("消息发送失败", e);
        }
    }

    // 保存失败日志
    private void saveFailLog(String topic, String tag, String keys,
                            String body, String errorMsg) {
        MessageSendFailLog failLog = new MessageSendFailLog();
        failLog.setTopic(topic);
        failLog.setTag(tag);
        failLog.setKeys(keys);
        failLog.setBody(body);
        failLog.setErrorMsg(errorMsg);
        failLog.setRetryCount(0);
        failLog.setCreateTime(new Date());

        failLogService.save(failLog);
    }
}

// 3. 定时补偿任务
@Component
public class MessageResendTask {

    @Autowired
    private MessageSendFailLogService failLogService;

    @Autowired
    private MessageProducer messageProducer;

    // 每 5 分钟执行一次
    @Scheduled(cron = "0 */5 * * * ?")
    public void resendFailedMessages() {
        // 查询待重试的失败消息（重试次数 < 3）
        List<MessageSendFailLog> failLogs =
            failLogService.findRetryableLogs(3);

        for (MessageSendFailLog log : failLogs) {
            try {
                // 重新发送
                messageProducer.sendMessage(
                    log.getTopic(),
                    log.getTag(),
                    log.getKeys(),
                    log.getBody()
                );

                // 发送成功，删除失败记录
                failLogService.deleteById(log.getId());

            } catch (Exception e) {
                // 发送仍失败，更新重试次数
                failLogService.incrementRetryCount(log.getId());

                // 如果重试次数 >= 3，发送告警
                if (log.getRetryCount() >= 2) {
                    alertService.sendAlert("消息重试失败", log);
                }
            }
        }
    }
}
```

**失败处理策略对比：**

| 策略 | 优点 | 缺点 | 适用场景 |
|-----|------|------|---------|
| 立即重试 | 简单快速 | 可能重复失败 | 临时性故障 |
| 延迟重试 | 避免频繁失败 | 增加复杂度 | 网络波动 |
| 数据库补偿 | 可靠性高 | 需要额外存储 | 关键业务 |
| MQ 补偿队列 | 解耦性好 | 增加依赖 | 高吞吐场景 |
| 人工介入 | 最终保障 | 成本高 | 多次失败后 |

**处理流程图：**

<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="40" width="100" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="100" y="70" text-anchor="middle" fill="white" font-weight="bold">发送消息</text>
<line x1="150" y1="65" x2="200" y2="65" stroke="#333" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="200" y="40" width="100" height="50" fill="#ffeb3b" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="250" y="65" text-anchor="middle" font-size="12">发送失败</text>
<text x="250" y="80" text-anchor="middle" font-size="12">自动重试</text>
<line x1="300" y1="65" x2="350" y2="65" stroke="#333" stroke-width="2" marker-end="url(#arrow6)"/>
<path d="M 250 40 Q 250 20 100 20 Q 100 40 100 40" stroke="#4caf50" stroke-width="2" fill="none" marker-end="url(#arrow6)"/>
<text x="175" y="15" font-size="11" fill="#4caf50" font-weight="bold">重试成功</text>
<rect x="350" y="40" width="100" height="50" fill="#ff9800" stroke="#e65100" stroke-width="2" rx="5"/>
<text x="400" y="65" text-anchor="middle" font-size="12">仍然失败</text>
<text x="400" y="80" text-anchor="middle" font-size="12">抛出异常</text>
<line x1="400" y1="90" x2="400" y2="140" stroke="#333" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="350" y="140" width="100" height="50" fill="#2196f3" stroke="#1565c0" stroke-width="2" rx="5"/>
<text x="400" y="165" text-anchor="middle" fill="white" font-size="12">记录日志</text>
<text x="400" y="180" text-anchor="middle" fill="white" font-size="12">存入数据库</text>
<line x1="400" y1="190" x2="400" y2="240" stroke="#333" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="350" y="240" width="100" height="50" fill="#9c27b0" stroke="#6a1b9a" stroke-width="2" rx="5"/>
<text x="400" y="265" text-anchor="middle" fill="white" font-size="12">定时任务</text>
<text x="400" y="280" text-anchor="middle" fill="white" font-size="12">补偿重发</text>
<line x1="350" y1="265" x2="150" y2="265" x2="150" y2="90" stroke="#9c27b0" stroke-width="2" marker-end="url(#arrow6)" stroke-dasharray="5,5"/>
<rect x="520" y="140" width="130" height="150" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="585" y="165" text-anchor="middle" font-weight="bold" font-size="14">补偿策略</text>
<text x="535" y="190" font-size="12">1. 重试3次</text>
<text x="535" y="210" font-size="12">2. 指数退避</text>
<text x="535" y="230" font-size="12">3. 超限告警</text>
<text x="535" y="250" font-size="12">4. 人工介入</text>
<text x="535" y="270" font-size="12">5. 业务补偿</text>
<text x="350" y="340" text-anchor="middle" font-size="14" fill="#666">失败不可怕，有补偿机制保底</text>
</svg>

**关键要点：**
- **Producer 层**：自动重试 2 次，切换 Broker
- **应用层**：异常捕获，失败消息入库
- **补偿层**：定时任务重试，超限告警
- **监控告警**：记录日志，及时发现问题

**记忆口诀：**
"**重试不成记日志，存库补偿定时跑，告警人工来兜底**"

18. 什么是批量消息?如何发送批量消息？

**核心答案：**
批量消息是指**一次性发送多条消息到同一个 Topic**，可以显著提高发送效率，减少网络开销。RocketMQ 支持通过 `send(Collection<Message>)` 方法发送批量消息。

**详细说明：**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow7" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
</marker>
</defs>
<rect x="50" y="100" width="200" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="130" text-anchor="middle" font-weight="bold" font-size="16">Producer</text>
<rect x="70" y="150" width="160" height="30" fill="#4caf50" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="150" y="170" text-anchor="middle" fill="white" font-size="12">Message 1</text>
<rect x="70" y="185" width="160" height="30" fill="#4caf50" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="150" y="205" text-anchor="middle" fill="white" font-size="12">Message 2</text>
<rect x="70" y="220" width="160" height="30" fill="#4caf50" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="150" y="240" text-anchor="middle" fill="white" font-size="12">Message 3</text>
<text x="150" y="270" text-anchor="middle" font-size="13" font-style="italic">批量打包</text>
<line x1="250" y1="200" x2="350" y2="200" stroke="#ff9800" stroke-width="5" marker-end="url(#arrow7)"/>
<text x="300" y="190" text-anchor="middle" font-size="14" font-weight="bold" fill="#ff9800">一次发送</text>
<rect x="350" y="100" width="200" height="200" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="450" y="130" text-anchor="middle" font-weight="bold" font-size="16">Broker</text>
<rect x="370" y="150" width="160" height="130" fill="#ffecb3" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="450" y="175" text-anchor="middle" font-size="13">批量存储</text>
<text x="380" y="200" font-size="11">Message 1</text>
<text x="380" y="220" font-size="11">Message 2</text>
<text x="380" y="240" font-size="11">Message 3</text>
<text x="380" y="265" font-size="11" fill="#666">原子性写入</text>
<rect x="600" y="100" width="150" height="200" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="675" y="130" text-anchor="middle" font-weight="bold" font-size="15">优势</text>
<text x="615" y="160" font-size="13">✓ 减少网络请求</text>
<text x="615" y="185" font-size="13">✓ 提高吞吐量</text>
<text x="615" y="210" font-size="13">✓ 降低延迟</text>
<text x="615" y="235" font-size="13">✓ 节省资源</text>
<text x="615" y="260" font-size="13">✓ 原子性保证</text>
<text x="400" y="350" text-anchor="middle" font-size="14" fill="#d32f2f" font-weight="bold">批量发送：一次网络请求，多条消息</text>
</svg>

**批量消息发送示例：**

```java
DefaultMQProducer producer = new DefaultMQProducer("batch_producer_group");
producer.start();

// 1. 创建批量消息列表（必须是同一个 Topic）
List<Message> messages = new ArrayList<>();
messages.add(new Message("TopicTest", "TagA", "OrderID001", "Hello 1".getBytes()));
messages.add(new Message("TopicTest", "TagA", "OrderID002", "Hello 2".getBytes()));
messages.add(new Message("TopicTest", "TagA", "OrderID003", "Hello 3".getBytes()));

// 2. 批量发送
try {
    SendResult sendResult = producer.send(messages);
    System.out.println("批量发送结果: " + sendResult);
} catch (Exception e) {
    e.printStackTrace();
}
```

**批量消息限制：**

| 限制项 | 说明 | 默认值 |
|-------|------|--------|
| 消息总大小 | 单次批量消息总大小不超过 4MB | 4MB (可配置) |
| 消息数量 | 建议单次不超过 1000 条 | 无硬性限制 |
| Topic 一致性 | 所有消息必须属于同一个 Topic | 必须 |
| 延迟消息 | 批量消息不支持延迟级别 | - |
| 事务消息 | 批量消息不支持事务 | - |

**大批量消息分割器：**

```java
// 消息分割器：当消息总大小超过限制时自动分割
public class ListSplitter implements Iterator<List<Message>> {
    private final int SIZE_LIMIT = 1024 * 1024 * 4; // 4MB
    private final List<Message> messages;
    private int currIndex;

    public ListSplitter(List<Message> messages) {
        this.messages = messages;
    }

    @Override
    public boolean hasNext() {
        return currIndex < messages.size();
    }

    @Override
    public List<Message> next() {
        int nextIndex = currIndex;
        int totalSize = 0;

        for (; nextIndex < messages.size(); nextIndex++) {
            Message message = messages.get(nextIndex);
            int tmpSize = message.getTopic().length() + message.getBody().length;

            // 消息本身超过限制
            if (tmpSize > SIZE_LIMIT) {
                if (nextIndex - currIndex == 0) {
                    nextIndex++;
                }
                break;
            }

            // 累计大小超过限制
            if (tmpSize + totalSize > SIZE_LIMIT) {
                break;
            }

            totalSize += tmpSize;
        }

        List<Message> subList = messages.subList(currIndex, nextIndex);
        currIndex = nextIndex;
        return subList;
    }
}

// 使用分割器发送大批量消息
List<Message> messages = ... // 10000条消息
ListSplitter splitter = new ListSplitter(messages);

while (splitter.hasNext()) {
    List<Message> batch = splitter.next();
    producer.send(batch);
}
```

**批量消息 vs 单条消息对比：**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="40" text-anchor="middle" font-size="18" font-weight="bold">批量 vs 单条性能对比</text>
<g id="single">
<rect x="80" y="80" width="280" height="220" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="220" y="110" text-anchor="middle" font-weight="bold" font-size="15">单条发送</text>
<text x="100" y="145" font-size="13">发送 1000 条消息：</text>
<rect x="100" y="160" width="240" height="30" fill="#ef5350" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="220" y="180" text-anchor="middle" fill="white" font-weight="bold">1000 次网络请求</text>
<text x="100" y="215" font-size="12">• 耗时：约 5 秒</text>
<text x="100" y="235" font-size="12">• 吞吐量：200 msg/s</text>
<text x="100" y="255" font-size="12">• CPU 占用：高</text>
<text x="100" y="275" font-size="12">• 网络带宽：高</text>
</g>
<g id="batch">
<rect x="440" y="80" width="280" height="220" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="580" y="110" text-anchor="middle" font-weight="bold" font-size="15">批量发送</text>
<text x="460" y="145" font-size="13">发送 1000 条消息（每批100条）：</text>
<rect x="460" y="160" width="240" height="30" fill="#66bb6a" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="580" y="180" text-anchor="middle" fill="white" font-weight="bold">10 次网络请求</text>
<text x="460" y="215" font-size="12">• 耗时：约 0.5 秒</text>
<text x="460" y="235" font-size="12">• 吞吐量：2000 msg/s</text>
<text x="460" y="255" font-size="12">• CPU 占用：低</text>
<text x="460" y="275" font-size="12">• 网络带宽：低</text>
</g>
<text x="400" y="330" text-anchor="middle" font-size="15" fill="#1976d2" font-weight="bold">批量发送性能提升 10 倍！</text>
</svg>

**使用场景：**
- ✅ **日志采集**：批量发送日志消息
- ✅ **数据同步**：批量同步数据库变更
- ✅ **订单处理**：批量发送订单消息
- ✅ **监控上报**：批量上报监控指标
- ❌ **延迟消息**：不支持批量延迟
- ❌ **事务消息**：不支持批量事务

**关键要点：**
- **同 Topic**：批量消息必须属于同一个 Topic
- **大小限制**：单次不超过 4MB，超过需分割
- **性能提升**：减少网络请求，大幅提升吞吐量
- **原子性**：批量消息要么全部成功，要么全部失败

**记忆口诀：**
"**同主题打包发，四兆以内效率高，分割器自动切，吞吐提升十倍好**"

19. 如何选择 Message Queue 进行发送？

**核心答案：**
RocketMQ 通过 **MessageQueueSelector** 接口选择队列，支持三种方式：**轮询（默认）、根据 Key Hash、自定义选择器**。

**详细说明：**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow8" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
</marker>
</defs>
<rect x="50" y="50" width="180" height="350" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="80" text-anchor="middle" font-weight="bold" font-size="16">Producer</text>
<rect x="70" y="100" width="140" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="2" rx="3"/>
<text x="140" y="125" text-anchor="middle" fill="white" font-weight="bold">消息</text>
<rect x="70" y="160" width="140" height="220" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="3"/>
<text x="140" y="185" text-anchor="middle" font-weight="bold" font-size="14">Queue 选择器</text>
<text x="80" y="210" font-size="12">1. 轮询</text>
<text x="80" y="230" font-size="12">2. Hash</text>
<text x="80" y="250" font-size="12">3. 自定义</text>
<line x1="230" y1="200" x2="320" y2="120" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow8)"/>
<line x1="230" y1="220" x2="320" y2="220" stroke="#2196f3" stroke-width="2" marker-end="url(#arrow8)"/>
<line x1="230" y1="240" x2="320" y2="320" stroke="#ff9800" stroke-width="2" marker-end="url(#arrow8)"/>
<rect x="320" y="50" width="230" height="350" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="435" y="80" text-anchor="middle" font-weight="bold" font-size="16">Broker (Topic)</text>
<rect x="340" y="100" width="190" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2" rx="3"/>
<text x="435" y="130" text-anchor="middle" fill="white" font-weight="bold">Queue 0</text>
<rect x="340" y="170" width="190" height="50" fill="#2196f3" stroke="#1565c0" stroke-width="2" rx="3"/>
<text x="435" y="200" text-anchor="middle" fill="white" font-weight="bold">Queue 1</text>
<rect x="340" y="240" width="190" height="50" fill="#ff9800" stroke="#e65100" stroke-width="2" rx="3"/>
<text x="435" y="270" text-anchor="middle" fill="white" font-weight="bold">Queue 2</text>
<rect x="340" y="310" width="190" height="50" fill="#9c27b0" stroke="#6a1b9a" stroke-width="2" rx="3"/>
<text x="435" y="340" text-anchor="middle" fill="white" font-weight="bold">Queue 3</text>
<rect x="580" y="100" width="180" height="260" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="670" y="130" text-anchor="middle" font-weight="bold" font-size="14">选择策略</text>
<text x="595" y="160" font-size="12" font-weight="bold">轮询（默认）：</text>
<text x="595" y="180" font-size="11">均匀分布，负载均衡</text>
<text x="595" y="210" font-size="12" font-weight="bold">Hash：</text>
<text x="595" y="230" font-size="11">相同 Key 进同一队列</text>
<text x="595" y="250" font-size="11">保证顺序消费</text>
<text x="595" y="280" font-size="12" font-weight="bold">自定义：</text>
<text x="595" y="300" font-size="11">业务逻辑选择</text>
<text x="595" y="320" font-size="11">灵活控制</text>
<text x="400" y="420" text-anchor="middle" font-size="14" fill="#d32f2f" font-weight="bold">不同场景选择不同策略</text>
</svg>

**1. 默认轮询选择**

```java
// 不指定队列选择器，使用默认轮询策略
Message msg = new Message("TopicTest", "TagA", "Hello RocketMQ".getBytes());
SendResult sendResult = producer.send(msg);
```

**2. Hash 选择（保证顺序）**

```java
// 根据 orderId 的 Hash 值选择队列，相同 orderId 的消息进入同一队列
Message msg = new Message("OrderTopic", "TagA", "order123", "订单信息".getBytes());

SendResult sendResult = producer.send(msg, new MessageQueueSelector() {
    @Override
    public MessageQueue select(List<MessageQueue> mqs, Message msg, Object arg) {
        // arg 是 orderId
        Long orderId = (Long) arg;
        // 根据 orderId 取模选择队列
        int index = (int) (orderId % mqs.size());
        return mqs.get(index);
    }
}, orderId); // orderId 作为选择参数
```

**3. 自定义选择器**

```java
// 根据业务逻辑自定义选择队列
Message msg = new Message("TopicTest", "TagA", "业务消息".getBytes());

SendResult sendResult = producer.send(msg, new MessageQueueSelector() {
    @Override
    public MessageQueue select(List<MessageQueue> mqs, Message msg, Object arg) {
        // 自定义逻辑：根据消息标签选择队列
        String tag = msg.getTags();

        if ("VIP".equals(tag)) {
            // VIP 消息发送到第一个队列
            return mqs.get(0);
        } else if ("NORMAL".equals(tag)) {
            // 普通消息均匀分布到其他队列
            int index = ThreadLocalRandom.current().nextInt(1, mqs.size());
            return mqs.get(index);
        }

        // 默认轮询
        return mqs.get((int) (System.currentTimeMillis() % mqs.size()));
    }
}, null);
```

**队列选择策略对比：**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="40" text-anchor="middle" font-size="18" font-weight="bold">队列选择策略对比</text>
<g id="strategy1">
<rect x="50" y="70" width="220" height="330" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="160" y="100" text-anchor="middle" font-weight="bold" font-size="15">轮询策略</text>
<rect x="70" y="120" width="180" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="160" y="145" text-anchor="middle" font-size="12">消息1 → Queue 0</text>
<rect x="70" y="170" width="180" height="40" fill="#2196f3" stroke="#1565c0" stroke-width="1" rx="3"/>
<text x="160" y="195" text-anchor="middle" font-size="12">消息2 → Queue 1</text>
<rect x="70" y="220" width="180" height="40" fill="#ff9800" stroke="#e65100" stroke-width="1" rx="3"/>
<text x="160" y="245" text-anchor="middle" font-size="12">消息3 → Queue 2</text>
<rect x="70" y="270" width="180" height="40" fill="#9c27b0" stroke="#6a1b9a" stroke-width="1" rx="3"/>
<text x="160" y="295" text-anchor="middle" font-size="12">消息4 → Queue 3</text>
<text x="160" y="330" text-anchor="middle" font-size="12" fill="#388e3c" font-weight="bold">✓ 负载均衡</text>
<text x="160" y="350" text-anchor="middle" font-size="12" fill="#d32f2f">✗ 无顺序保证</text>
<text x="160" y="375" text-anchor="middle" font-size="13" font-weight="bold">适用：高吞吐</text>
</g>
<g id="strategy2">
<rect x="290" y="70" width="220" height="330" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="100" text-anchor="middle" font-weight="bold" font-size="15">Hash 策略</text>
<rect x="310" y="120" width="180" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="400" y="145" text-anchor="middle" font-size="12">订单A → Queue 1</text>
<rect x="310" y="170" width="180" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="400" y="195" text-anchor="middle" font-size="12">订单A → Queue 1</text>
<rect x="310" y="220" width="180" height="40" fill="#2196f3" stroke="#1565c0" stroke-width="1" rx="3"/>
<text x="400" y="245" text-anchor="middle" font-size="12">订单B → Queue 2</text>
<rect x="310" y="270" width="180" height="40" fill="#2196f3" stroke="#1565c0" stroke-width="1" rx="3"/>
<text x="400" y="295" text-anchor="middle" font-size="12">订单B → Queue 2</text>
<text x="400" y="330" text-anchor="middle" font-size="12" fill="#388e3c" font-weight="bold">✓ 顺序保证</text>
<text x="400" y="350" text-anchor="middle" font-size="12" fill="#d32f2f">✗ 可能不均衡</text>
<text x="400" y="375" text-anchor="middle" font-size="13" font-weight="bold">适用：顺序消息</text>
</g>
<g id="strategy3">
<rect x="530" y="70" width="220" height="330" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="640" y="100" text-anchor="middle" font-weight="bold" font-size="15">自定义策略</text>
<rect x="550" y="120" width="180" height="40" fill="#f44336" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="640" y="145" text-anchor="middle" fill="white" font-size="12">VIP → Queue 0</text>
<rect x="550" y="170" width="180" height="40" fill="#ff9800" stroke="#e65100" stroke-width="1" rx="3"/>
<text x="640" y="195" text-anchor="middle" font-size="12">普通 → Queue 1</text>
<rect x="550" y="220" width="180" height="40" fill="#ff9800" stroke="#e65100" stroke-width="1" rx="3"/>
<text x="640" y="245" text-anchor="middle" font-size="12">普通 → Queue 2</text>
<rect x="550" y="270" width="180" height="40" fill="#ff9800" stroke="#e65100" stroke-width="1" rx="3"/>
<text x="640" y="295" text-anchor="middle" font-size="12">普通 → Queue 3</text>
<text x="640" y="330" text-anchor="middle" font-size="12" fill="#388e3c" font-weight="bold">✓ 灵活控制</text>
<text x="640" y="350" text-anchor="middle" font-size="12" fill="#388e3c">✓ 业务优先</text>
<text x="640" y="375" text-anchor="middle" font-size="13" font-weight="bold">适用：复杂场景</text>
</g>
</svg>

**选择策略对比表：**

| 策略 | 实现方式 | 优点 | 缺点 | 适用场景 |
|-----|---------|------|------|---------|
| 轮询 | 默认，无需指定 | 负载均衡，简单高效 | 无顺序保证 | 高吞吐、无顺序要求 |
| Hash | 根据 Key Hash 取模 | 顺序保证，相同 Key 同队列 | 可能分布不均 | 顺序消息、用户/订单消息 |
| 自定义 | 实现 MessageQueueSelector | 灵活控制，业务定制 | 需要自己实现逻辑 | VIP 优先、按地域/业务分发 |

**使用建议：**
1. **默认轮询**：大部分场景，追求高吞吐和负载均衡
2. **Hash 选择**：需要保证消息顺序性（如订单状态变更）
3. **自定义选择**：复杂业务逻辑（如 VIP 优先、按地域分发）

**关键要点：**
- **轮询**：默认策略，负载均衡最好
- **Hash**：保证相同 Key 的消息进入同一队列
- **自定义**：灵活满足业务需求
- **顺序消费**：必须用 Hash 或自定义选择同一队列

**记忆口诀：**
"**轮询默认最均衡，哈希保序同队列，自定义灵活控业务**"


## 消息消费

### 20. RocketMQ 有哪些消费模式？

**核心答案**:
RocketMQ 提供了两种消费模式:集群消费(Clustering)和广播消费(Broadcasting)。

**详细说明**:

1. **集群消费(CLUSTERING)**
   - 同一个消费者组内的多个消费者共同消费一个Topic的消息
   - 每条消息只会被消费者组中的一个消费者消费
   - 默认的消费模式

2. **广播消费(BROADCASTING)**
   - 同一个消费者组内的每个消费者都会收到Topic的全部消息
   - 每条消息会被消费者组中的所有消费者消费
   - 适用于需要每个消费者都处理全量数据的场景

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.txt{font:14px sans-serif;}.title{font:16px sans-serif;font-weight:bold;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="30" width="300" height="160" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="200" y="55" class="title" text-anchor="middle" fill="#1976d2">集群消费模式</text>
<rect x="80" y="70" width="80" height="40" fill="#64b5f6" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="120" y="95" class="txt" text-anchor="middle" fill="white">Producer</text>
<rect x="80" y="130" width="80" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="120" y="155" class="txt" text-anchor="middle">Consumer1</text>
<rect x="180" y="130" width="80" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="220" y="155" class="txt" text-anchor="middle">Consumer2</text>
<line x1="120" y1="110" x2="120" y2="130" stroke="#333" stroke-width="2" marker-end="url(#arrowblue)"/>
<line x1="120" y1="110" x2="220" y2="130" stroke="#333" stroke-width="2" marker-end="url(#arrowblue)"/>
<text x="200" y="200" class="small" text-anchor="middle" fill="#666">消息被分配给不同Consumer</text>
<rect x="450" y="30" width="300" height="160" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="600" y="55" class="title" text-anchor="middle" fill="#f57c00">广播消费模式</text>
<rect x="480" y="70" width="80" height="40" fill="#64b5f6" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="520" y="95" class="txt" text-anchor="middle" fill="white">Producer</text>
<rect x="480" y="130" width="80" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="520" y="155" class="txt" text-anchor="middle">Consumer1</text>
<rect x="580" y="130" width="80" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="620" y="155" class="txt" text-anchor="middle">Consumer2</text>
<line x1="520" y1="110" x2="520" y2="130" stroke="#333" stroke-width="2" marker-end="url(#arrowblue)"/>
<line x1="520" y1="110" x2="620" y2="130" stroke="#333" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 520 110 Q 570 100 620 130" fill="none" stroke="#333" stroke-width="2" marker-end="url(#arrowblue)"/>
<text x="600" y="200" class="small" text-anchor="middle" fill="#666">每个Consumer都收到全部消息</text>
<defs><marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
<rect x="50" y="230" width="700" height="150" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="400" y="255" class="title" text-anchor="middle">对比说明</text>
<text x="70" y="280" class="small" fill="#333">集群消费:</text>
<text x="90" y="300" class="small" fill="#666">• 消息负载均衡,提高处理能力</text>
<text x="90" y="320" class="small" fill="#666">• 消费进度存储在Broker</text>
<text x="70" y="350" class="small" fill="#333">广播消费:</text>
<text x="90" y="370" class="small" fill="#666">• 每个消费者独立处理全部消息</text>
<text x="400" y="280" class="small" fill="#333">适用场景:</text>
<text x="420" y="300" class="small" fill="#666">• 集群:业务处理、数据分片</text>
<text x="420" y="320" class="small" fill="#666">• 广播:配置更新、缓存刷新</text>
</svg>

**代码示例**:

```java
// 集群消费模式(默认)
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("consumer_group");
consumer.setMessageModel(MessageModel.CLUSTERING);

// 广播消费模式
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("consumer_group");
consumer.setMessageModel(MessageModel.BROADCASTING);
```

**关键要点**:
1. 集群消费适合需要负载均衡的场景
2. 广播消费适合需要全量数据的场景
3. 集群消费的消费进度存储在Broker
4. 广播消费的消费进度存储在Consumer本地

**记忆口诀**: "集群分片高并发,广播全量同步忙"

---

21. 什么是集群消费和广播消费？

### 21. 什么是集群消费和广播消费？

**核心答案**:
集群消费是消息只被消费者组中的一个消费者消费;广播消费是消息被消费者组中的所有消费者消费。

**详细说明**:

**1. 集群消费(CLUSTERING)**

| 特性 | 说明 |
|------|------|
| 消费分配 | 消息只会被消费者组中的一个消费者消费 |
| 负载均衡 | 消费者组内自动负载均衡 |
| 消费进度 | 存储在Broker端 |
| 重试机制 | 支持重试,最终进入死信队列 |
| 适用场景 | 业务处理、订单处理、数据分片 |

**2. 广播消费(BROADCASTING)**

| 特性 | 说明 |
|------|------|
| 消费分配 | 消息会被消费者组中的每个消费者消费 |
| 负载均衡 | 不涉及负载均衡,每个消费者独立消费 |
| 消费进度 | 存储在Consumer本地 |
| 重试机制 | 不支持重试,消费失败需要应用层处理 |
| 适用场景 | 配置更新、缓存刷新、本地状态同步 |

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.txt{font:14px sans-serif;}.title{font:16px sans-serif;font-weight:bold;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="30" width="700" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" class="title" text-anchor="middle" fill="#1976d2">集群消费流程</text>
<rect x="80" y="80" width="100" height="50" fill="#64b5f6" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="130" y="100" class="txt" text-anchor="middle" fill="white">Broker</text>
<text x="130" y="118" class="small" text-anchor="middle" fill="white">Queue 1-4</text>
<rect x="250" y="70" width="90" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="295" y="95" class="txt" text-anchor="middle">Consumer1</text>
<rect x="250" y="120" width="90" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="295" y="145" class="txt" text-anchor="middle">Consumer2</text>
<rect x="250" y="170" width="90" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="295" y="195" class="txt" text-anchor="middle">Consumer3</text>
<line x1="180" y1="90" x2="250" y2="90" stroke="#333" stroke-width="2" marker-end="url(#arrow1)"/>
<text x="215" y="85" class="small" fill="#666">Q1,Q2</text>
<line x1="180" y1="105" x2="250" y2="140" stroke="#333" stroke-width="2" marker-end="url(#arrow1)"/>
<text x="215" y="118" class="small" fill="#666">Q3</text>
<line x1="180" y1="120" x2="250" y2="190" stroke="#333" stroke-width="2" marker-end="url(#arrow1)"/>
<text x="215" y="150" class="small" fill="#666">Q4</text>
<rect x="380" y="70" width="140" height="140" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="450" y="90" class="small" text-anchor="middle" fill="#333">Broker存储进度</text>
<text x="390" y="110" class="small" fill="#666">Consumer1: Q1-100</text>
<text x="390" y="130" class="small" fill="#666">Consumer1: Q2-200</text>
<text x="390" y="150" class="small" fill="#666">Consumer2: Q3-150</text>
<text x="390" y="170" class="small" fill="#666">Consumer3: Q4-180</text>
<text x="390" y="195" class="small" fill="#999">消费进度集中管理</text>
<rect x="50" y="270" width="700" height="220" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="295" class="title" text-anchor="middle" fill="#f57c00">广播消费流程</text>
<rect x="80" y="320" width="100" height="50" fill="#64b5f6" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="130" y="340" class="txt" text-anchor="middle" fill="white">Broker</text>
<text x="130" y="358" class="small" text-anchor="middle" fill="white">全量消息</text>
<rect x="250" y="310" width="90" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="295" y="335" class="txt" text-anchor="middle">Consumer1</text>
<rect x="250" y="360" width="90" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="295" y="385" class="txt" text-anchor="middle">Consumer2</text>
<rect x="250" y="410" width="90" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="295" y="435" class="txt" text-anchor="middle">Consumer3</text>
<line x1="180" y1="335" x2="250" y2="330" stroke="#333" stroke-width="2" marker-end="url(#arrow1)"/>
<text x="215" y="328" class="small" fill="#666">全量</text>
<line x1="180" y1="350" x2="250" y2="380" stroke="#333" stroke-width="2" marker-end="url(#arrow1)"/>
<text x="215" y="361" class="small" fill="#666">全量</text>
<line x1="180" y1="365" x2="250" y2="430" stroke="#333" stroke-width="2" marker-end="url(#arrow1)"/>
<text x="215" y="393" class="small" fill="#666">全量</text>
<rect x="380" y="310" width="140" height="140" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="450" y="330" class="small" text-anchor="middle" fill="#333">本地存储进度</text>
<text x="390" y="350" class="small" fill="#666">Consumer1本地:100</text>
<text x="390" y="370" class="small" fill="#666">Consumer2本地:95</text>
<text x="390" y="390" class="small" fill="#666">Consumer3本地:105</text>
<text x="390" y="415" class="small" fill="#999">各自独立管理</text>
<defs><marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
</svg>

**代码示例**:

```java
// 集群消费
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("consumer_group");
consumer.setNamesrvAddr("localhost:9876");
consumer.setMessageModel(MessageModel.CLUSTERING);  // 集群模式
consumer.subscribe("TopicTest", "*");
consumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        System.out.println("集群消费: " + new String(msgs.get(0).getBody()));
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});
consumer.start();

// 广播消费
DefaultMQPushConsumer broadcastConsumer = new DefaultMQPushConsumer("broadcast_group");
broadcastConsumer.setNamesrvAddr("localhost:9876");
broadcastConsumer.setMessageModel(MessageModel.BROADCASTING);  // 广播模式
broadcastConsumer.subscribe("TopicTest", "*");
broadcastConsumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        System.out.println("广播消费: " + new String(msgs.get(0).getBody()));
        // 广播模式下,返回失败也不会重试
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});
broadcastConsumer.start();
```

**关键要点**:
1. 集群消费实现负载均衡,提高处理能力
2. 广播消费保证每个消费者都处理全量数据
3. 集群消费的消费进度由Broker管理,支持重启恢复
4. 广播消费的消费进度由Consumer本地管理,重启可能丢失进度
5. 广播消费不支持重试和死信队列

**记忆口诀**: "集群一条分一人,广播全量人人收"

---

22. 什么是 Push 消费和 Pull 消费？

### 22. 什么是 Push 消费和 Pull 消费？

**核心答案**:
Push消费是Broker主动推送消息给Consumer;Pull消费是Consumer主动从Broker拉取消息。RocketMQ的Push消费本质上也是基于Pull实现的长轮询机制。

**详细说明**:

**1. Push消费(推模式)**
- Consumer注册监听器后,Broker有新消息时主动推送
- 实际是封装了长轮询的Pull模式
- 使用`DefaultMQPushConsumer`
- 适合实时性要求高的场景

**2. Pull消费(拉模式)**
- Consumer主动向Broker发起请求拉取消息
- Consumer可以控制拉取的频率和数量
- 使用`DefaultMQPullConsumer`
- 适合需要精确控制消费速度的场景

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs><style>.txt{font:14px sans-serif;}.title{font:16px sans-serif;font-weight:bold;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="30" width="700" height="260" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" class="title" text-anchor="middle" fill="#1976d2">Push消费模式(长轮询)</text>
<rect x="100" y="80" width="120" height="60" fill="#64b5f6" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="160" y="105" class="txt" text-anchor="middle" fill="white">Broker</text>
<text x="160" y="125" class="small" text-anchor="middle" fill="white">有新消息</text>
<rect x="500" y="80" width="120" height="60" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="560" y="105" class="txt" text-anchor="middle">Consumer</text>
<text x="560" y="125" class="small" text-anchor="middle">注册监听器</text>
<path d="M 220 100 L 480 100" stroke="#4caf50" stroke-width="3" marker-end="url(#arrow2)" stroke-dasharray="5,5"/>
<text x="350" y="95" class="small" fill="#4caf50">1. 长轮询请求</text>
<path d="M 480 120 L 220 120" stroke="#f57c00" stroke-width="3" marker-end="url(#arrow2)"/>
<text x="350" y="115" class="small" fill="#f57c00">2. 推送消息</text>
<rect x="100" y="170" width="600" height="110" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="400" y="190" class="small" text-anchor="middle" fill="#333" font-weight="bold">工作流程</text>
<text x="120" y="210" class="small" fill="#666">① Consumer启动后,向Broker发起长轮询请求</text>
<text x="120" y="230" class="small" fill="#666">② Broker如果有新消息,立即返回;没有则hold住请求</text>
<text x="120" y="250" class="small" fill="#666">③ 超时或有新消息时,Broker响应并"推送"消息</text>
<text x="120" y="270" class="small" fill="#666">④ Consumer处理消息,继续发起下一次长轮询</text>
<rect x="50" y="310" width="700" height="260" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="335" class="title" text-anchor="middle" fill="#f57c00">Pull消费模式(主动拉取)</text>
<rect x="100" y="360" width="120" height="60" fill="#64b5f6" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="160" y="385" class="txt" text-anchor="middle" fill="white">Broker</text>
<text x="160" y="405" class="small" text-anchor="middle" fill="white">等待请求</text>
<rect x="500" y="360" width="120" height="60" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="560" y="385" class="txt" text-anchor="middle">Consumer</text>
<text x="560" y="405" class="small" text-anchor="middle">主动控制</text>
<path d="M 500 380 L 220 380" stroke="#4caf50" stroke-width="3" marker-end="url(#arrow2)"/>
<text x="350" y="375" class="small" fill="#4caf50">1. 主动拉取</text>
<path d="M 220 400 L 500 400" stroke="#f57c00" stroke-width="3" marker-end="url(#arrow2)"/>
<text x="350" y="395" class="small" fill="#f57c00">2. 返回消息</text>
<rect x="100" y="450" width="600" height="110" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="400" y="470" class="small" text-anchor="middle" fill="#333" font-weight="bold">工作流程</text>
<text x="120" y="490" class="small" fill="#666">① Consumer主动调用pull()方法拉取消息</text>
<text x="120" y="510" class="small" fill="#666">② Broker立即响应,返回可用的消息</text>
<text x="120" y="530" class="small" fill="#666">③ Consumer处理消息</text>
<text x="120" y="550" class="small" fill="#666">④ Consumer根据业务需要,决定下次拉取时机</text>
<defs><marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
</svg>

**代码示例**:

```java
// Push消费模式
DefaultMQPushConsumer pushConsumer = new DefaultMQPushConsumer("push_consumer_group");
pushConsumer.setNamesrvAddr("localhost:9876");
pushConsumer.subscribe("TopicTest", "*");
// 注册消息监听器
pushConsumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        for (MessageExt msg : msgs) {
            System.out.println("Push消费: " + new String(msg.getBody()));
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});
pushConsumer.start();

// Pull消费模式
DefaultMQPullConsumer pullConsumer = new DefaultMQPullConsumer("pull_consumer_group");
pullConsumer.setNamesrvAddr("localhost:9876");
pullConsumer.start();

// 获取MessageQueue
Set<MessageQueue> mqs = pullConsumer.fetchSubscribeMessageQueues("TopicTest");
for (MessageQueue mq : mqs) {
    long offset = pullConsumer.fetchConsumeOffset(mq, false);
    while (true) {
        // 主动拉取消息
        PullResult pullResult = pullConsumer.pull(mq, "*", offset, 32);
        switch (pullResult.getPullStatus()) {
            case FOUND:
                List<MessageExt> msgs = pullResult.getMsgFoundList();
                for (MessageExt msg : msgs) {
                    System.out.println("Pull消费: " + new String(msg.getBody()));
                }
                offset = pullResult.getNextBeginOffset();
                break;
            case NO_NEW_MSG:
                Thread.sleep(1000);  // 没有新消息,等待
                break;
            case NO_MATCHED_MSG:
            case OFFSET_ILLEGAL:
                break;
        }
        pullConsumer.updateConsumeOffset(mq, offset);
    }
}
```

**对比表格**:

| 特性 | Push消费 | Pull消费 |
|------|----------|----------|
| 实现方式 | 长轮询封装 | 主动拉取 |
| API类 | DefaultMQPushConsumer | DefaultMQPullConsumer |
| 实时性 | 高(准实时) | 取决于拉取频率 |
| 复杂度 | 低(自动化) | 高(需手动控制) |
| 消费速度控制 | 由SDK控制 | 由应用控制 |
| 适用场景 | 通用场景,实时性要求高 | 需要精确控制消费节奏 |
| 消费进度管理 | 自动管理 | 需手动管理 |

**关键要点**:
1. RocketMQ的Push消费本质是Pull的封装,使用长轮询实现准实时推送
2. Push消费更简单易用,适合大多数场景
3. Pull消费提供更灵活的控制,但复杂度更高
4. 长轮询避免了频繁的Pull请求,提高了效率
5. Push消费会自动管理消费进度,Pull消费需要手动管理

**记忆口诀**: "Push长轮询很实时,Pull主控制需自理"

---

23. Consumer 如何实现负载均衡？

### 23. Consumer 如何实现负载均衡？

**核心答案**:
Consumer通过Rebalance(重新负载均衡)机制,在消费者组内动态分配MessageQueue给各个Consumer,实现消息消费的负载均衡。

**详细说明**:

**1. 负载均衡触发时机**
- Consumer启动或关闭
- Topic的Queue数量变化
- Consumer数量变化
- 默认每20秒执行一次Rebalance

**2. 负载均衡策略**

RocketMQ提供了多种负载均衡策略:

| 策略 | 说明 | 适用场景 |
|------|------|----------|
| AllocateMessageQueueAveragely | 平均分配(默认) | 通用场景 |
| AllocateMessageQueueAveragelyByCircle | 环形平均分配 | 需要均匀分布 |
| AllocateMessageQueueConsistentHash | 一致性Hash | 需要稳定分配 |
| AllocateMessageQueueByConfig | 手动配置 | 特殊需求 |
| AllocateMessageQueueByMachineRoom | 按机房分配 | 机房隔离 |

**3. 平均分配算法(默认)**
- Queue数量 % Consumer数量 = 余数
- 前余数个Consumer分配(Queue数量 / Consumer数量 + 1)个Queue
- 其余Consumer分配(Queue数量 / Consumer数量)个Queue

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs><style>.txt{font:14px sans-serif;}.title{font:16px sans-serif;font-weight:bold;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="30" width="700" height="240" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" class="title" text-anchor="middle" fill="#1976d2">Rebalance负载均衡流程</text>
<rect x="80" y="80" width="100" height="50" fill="#64b5f6" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="130" y="100" class="txt" text-anchor="middle" fill="white">Topic</text>
<text x="130" y="118" class="small" text-anchor="middle" fill="white">8个Queue</text>
<rect x="250" y="70" width="90" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="295" y="95" class="txt" text-anchor="middle">Consumer1</text>
<rect x="250" y="120" width="90" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="295" y="145" class="txt" text-anchor="middle">Consumer2</text>
<rect x="250" y="170" width="90" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="295" y="195" class="txt" text-anchor="middle">Consumer3</text>
<line x1="180" y1="95" x2="250" y2="90" stroke="#333" stroke-width="2" marker-end="url(#arrow3)"/>
<text x="215" y="88" class="small" fill="#666">Q0,Q1,Q2</text>
<line x1="180" y1="105" x2="250" y2="140" stroke="#333" stroke-width="2" marker-end="url(#arrow3)"/>
<text x="215" y="118" class="small" fill="#666">Q3,Q4,Q5</text>
<line x1="180" y1="115" x2="250" y2="190" stroke="#333" stroke-width="2" marker-end="url(#arrow3)"/>
<text x="215" y="148" class="small" fill="#666">Q6,Q7</text>
<rect x="400" y="70" width="320" height="140" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="560" y="90" class="small" text-anchor="middle" fill="#333" font-weight="bold">平均分配算法</text>
<text x="410" y="110" class="small" fill="#666">8个Queue ÷ 3个Consumer = 2余2</text>
<text x="410" y="130" class="small" fill="#666">前2个Consumer:2+1=3个Queue</text>
<text x="410" y="150" class="small" fill="#666">最后1个Consumer:2个Queue</text>
<text x="410" y="175" class="small" fill="#999">Consumer1:Q0,Q1,Q2 (3个)</text>
<text x="410" y="195" class="small" fill="#999">Consumer2:Q3,Q4,Q5 (3个)</text>
<text x="560" y="230" class="small" fill="#999">Consumer3:Q6,Q7 (2个)</text>
<rect x="50" y="290" width="700" height="240" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="315" class="title" text-anchor="middle" fill="#f57c00">Rebalance触发场景</text>
<rect x="80" y="340" width="200" height="180" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="180" y="360" class="small" text-anchor="middle" fill="#333" font-weight="bold">场景1:Consumer加入</text>
<text x="100" y="380" class="small" fill="#666">初始:3个Consumer</text>
<text x="100" y="400" class="small" fill="#666">新加入Consumer4</text>
<text x="100" y="420" class="small" fill="#666">触发Rebalance</text>
<text x="100" y="445" class="small" fill="#4caf50">结果:每个Consumer</text>
<text x="100" y="465" class="small" fill="#4caf50">分配2个Queue</text>
<text x="100" y="490" class="small" fill="#999">(8÷4=2,无余数)</text>
<rect x="300" y="340" width="200" height="180" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="400" y="360" class="small" text-anchor="middle" fill="#333" font-weight="bold">场景2:Consumer退出</text>
<text x="320" y="380" class="small" fill="#666">初始:4个Consumer</text>
<text x="320" y="400" class="small" fill="#666">Consumer4下线</text>
<text x="320" y="420" class="small" fill="#666">触发Rebalance</text>
<text x="320" y="445" class="small" fill="#f57c00">结果:Queue重新</text>
<text x="320" y="465" class="small" fill="#f57c00">分配给剩余3个</text>
<text x="320" y="490" class="small" fill="#999">(前2个3个,最后1个2个)</text>
<rect x="520" y="340" width="200" height="180" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="620" y="360" class="small" text-anchor="middle" fill="#333" font-weight="bold">场景3:Queue变化</text>
<text x="540" y="380" class="small" fill="#666">Topic扩容Queue</text>
<text x="540" y="400" class="small" fill="#666">从8个增加到12个</text>
<text x="540" y="420" class="small" fill="#666">触发Rebalance</text>
<text x="540" y="445" class="small" fill="#1976d2">结果:每个Consumer</text>
<text x="540" y="465" class="small" fill="#1976d2">分配4个Queue</text>
<text x="540" y="490" class="small" fill="#999">(12÷3=4,无余数)</text>
<defs><marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
</svg>

**代码示例**:

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("consumer_group");
consumer.setNamesrvAddr("localhost:9876");

// 设置负载均衡策略(可选,默认是平均分配)
// 1. 平均分配策略(默认)
consumer.setAllocateMessageQueueStrategy(new AllocateMessageQueueAveragely());

// 2. 环形平均分配
// consumer.setAllocateMessageQueueStrategy(new AllocateMessageQueueAveragelyByCircle());

// 3. 一致性Hash
// consumer.setAllocateMessageQueueStrategy(new AllocateMessageQueueConsistentHash());

// 4. 按机房分配
// consumer.setAllocateMessageQueueStrategy(new AllocateMessageQueueByMachineRoom());

consumer.subscribe("TopicTest", "*");
consumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        // 消费消息
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});
consumer.start();
```

**关键要点**:
1. Rebalance在Consumer端执行,默认每20秒触发一次
2. Consumer启动、关闭或Queue数量变化都会触发Rebalance
3. 默认使用平均分配策略,尽量均匀分配Queue
4. Rebalance过程中可能短暂影响消费,但能快速完成
5. 同一个Queue同一时刻只会分配给一个Consumer
6. Consumer数量大于Queue数量时,部分Consumer会空闲

**记忆口诀**: "队列平均分给人,动态调整保均衡"

---

24. 什么是消费位点（Offset）？

### 24. 什么是消费位点（Offset）？

**核心答案**:
Offset(消费位点)是Consumer在Queue中消费消息的位置标记,用于记录Consumer消费到哪条消息,保证消息不丢失、不重复消费。

**详细说明**:

**1. Offset的类型**

| 类型 | 说明 | 存储位置 |
|------|------|----------|
| 远程Offset | Broker存储的消费进度 | Broker磁盘 |
| 本地Offset | Consumer本地存储的消费进度 | Consumer本地文件 |
| Min Offset | Queue中最小的消息位点 | Broker |
| Max Offset | Queue中最大的消息位点 | Broker |

**2. Offset的管理方式**

- **集群消费模式**: Offset存储在Broker,Consumer定期同步到Broker
- **广播消费模式**: Offset存储在Consumer本地

**3. Offset的提交时机**

- Consumer消费成功后提交Offset
- 默认每5秒自动提交一次
- Consumer关闭时会提交Offset

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.txt{font:14px sans-serif;}.title{font:16px sans-serif;font-weight:bold;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="30" width="700" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" class="title" text-anchor="middle" fill="#1976d2">Offset在Queue中的位置</text>
<rect x="100" y="90" width="600" height="60" fill="#fff" stroke="#666" stroke-width="2" rx="3"/>
<text x="130" y="115" class="small" fill="#333">MessageQueue</text>
<rect x="150" y="100" width="40" height="40" fill="#e0e0e0" stroke="#999" stroke-width="1"/>
<text x="170" y="125" class="small" text-anchor="middle">0</text>
<rect x="200" y="100" width="40" height="40" fill="#e0e0e0" stroke="#999" stroke-width="1"/>
<text x="220" y="125" class="small" text-anchor="middle">1</text>
<rect x="250" y="100" width="40" height="40" fill="#e0e0e0" stroke="#999" stroke-width="1"/>
<text x="270" y="125" class="small" text-anchor="middle">2</text>
<rect x="300" y="100" width="40" height="40" fill="#e0e0e0" stroke="#999" stroke-width="1"/>
<text x="320" y="125" class="small" text-anchor="middle">3</text>
<rect x="350" y="100" width="40" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2"/>
<text x="370" y="125" class="small" text-anchor="middle">4</text>
<rect x="400" y="100" width="40" height="40" fill="#c5e1a5" stroke="#4caf50" stroke-width="2"/>
<text x="420" y="125" class="small" text-anchor="middle">5</text>
<rect x="450" y="100" width="40" height="40" fill="#c5e1a5" stroke="#4caf50" stroke-width="2"/>
<text x="470" y="125" class="small" text-anchor="middle">6</text>
<rect x="500" y="100" width="40" height="40" fill="#c5e1a5" stroke="#4caf50" stroke-width="2"/>
<text x="520" y="125" class="small" text-anchor="middle">7</text>
<rect x="550" y="100" width="40" height="40" fill="#c5e1a5" stroke="#4caf50" stroke-width="2"/>
<text x="570" y="125" class="small" text-anchor="middle">8</text>
<rect x="600" y="100" width="40" height="40" fill="#f5f5f5" stroke="#ccc" stroke-width="1" stroke-dasharray="3,3"/>
<text x="620" y="125" class="small" text-anchor="middle">...</text>
<line x1="150" y1="75" x2="150" y2="90" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow4)"/>
<text x="155" y="70" class="small" fill="#d32f2f">Min Offset</text>
<line x1="370" y1="160" x2="370" y2="145" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow4)"/>
<text x="330" y="180" class="small" fill="#f57c00">Consumer Offset</text>
<text x="330" y="195" class="small" fill="#999">(当前消费到4)</text>
<line x1="570" y1="75" x2="570" y2="90" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow4)"/>
<text x="575" y="70" class="small" fill="#4caf50">Max Offset</text>
<text x="150" y="225" class="small" fill="#666">已消费: 0-3(灰色)</text>
<text x="300" y="225" class="small" fill="#666">当前位置: 4(橙色)</text>
<text x="480" y="225" class="small" fill="#666">待消费: 5-8(绿色)</text>
<rect x="50" y="270" width="700" height="210" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="295" class="title" text-anchor="middle" fill="#f57c00">Offset的存储与同步</text>
<rect x="100" y="320" width="280" height="140" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="240" y="340" class="small" text-anchor="middle" fill="#333" font-weight="bold">集群消费模式</text>
<rect x="120" y="355" width="100" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="170" y="380" class="txt" text-anchor="middle">Consumer</text>
<rect x="240" y="355" width="100" height="40" fill="#64b5f6" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="290" y="380" class="txt" text-anchor="middle" fill="white">Broker</text>
<path d="M 220 375 L 240 375" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow4)"/>
<text x="145" y="420" class="small" fill="#666">消费成功</text>
<text x="250" y="420" class="small" fill="#666">存储Offset</text>
<text x="120" y="445" class="small" fill="#999">• 定期同步(默认5秒)</text>
<rect x="420" y="320" width="280" height="140" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="560" y="340" class="small" text-anchor="middle" fill="#333" font-weight="bold">广播消费模式</text>
<rect x="440" y="355" width="100" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="490" y="380" class="txt" text-anchor="middle">Consumer</text>
<rect x="560" y="355" width="100" height="40" fill="#e0e0e0" stroke="#999" stroke-width="2" rx="3"/>
<text x="610" y="380" class="txt" text-anchor="middle">本地文件</text>
<path d="M 540 375 L 560 375" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow4)"/>
<text x="465" y="420" class="small" fill="#666">消费成功</text>
<text x="570" y="420" class="small" fill="#666">本地存储</text>
<text x="440" y="445" class="small" fill="#999">• 每隔一定时间持久化</text>
<defs><marker id="arrow4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
</svg>

**代码示例**:

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("consumer_group");
consumer.setNamesrvAddr("localhost:9876");

// 设置从哪里开始消费
// CONSUME_FROM_LAST_OFFSET: 从最后一条消息开始消费(默认)
// CONSUME_FROM_FIRST_OFFSET: 从第一条消息开始消费
// CONSUME_FROM_TIMESTAMP: 从指定时间戳开始消费
consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_LAST_OFFSET);

// 如果是从指定时间戳开始,设置时间戳
// consumer.setConsumeTimestamp("20231201000000");

consumer.subscribe("TopicTest", "*");
consumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        for (MessageExt msg : msgs) {
            // 获取消息的Offset
            long queueOffset = msg.getQueueOffset();
            System.out.println("消费Offset: " + queueOffset);
            System.out.println("消息内容: " + new String(msg.getBody()));
        }
        // 返回SUCCESS后,RocketMQ会自动更新Offset
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});
consumer.start();

// 手动管理Offset(Pull消费模式)
DefaultMQPullConsumer pullConsumer = new DefaultMQPullConsumer("pull_consumer_group");
pullConsumer.start();
Set<MessageQueue> mqs = pullConsumer.fetchSubscribeMessageQueues("TopicTest");
for (MessageQueue mq : mqs) {
    // 获取当前Queue的Offset
    long offset = pullConsumer.fetchConsumeOffset(mq, false);
    System.out.println("当前Offset: " + offset);

    // 拉取消息
    PullResult pullResult = pullConsumer.pull(mq, "*", offset, 32);
    if (pullResult.getPullStatus() == PullStatus.FOUND) {
        // 处理消息...
        // 更新Offset
        offset = pullResult.getNextBeginOffset();
        pullConsumer.updateConsumeOffset(mq, offset);
    }
}
```

**关键要点**:
1. Offset是消息消费进度的位置标记
2. 集群消费的Offset存储在Broker,广播消费的Offset存储在Consumer本地
3. Consumer会定期同步Offset到存储位置(默认5秒)
4. Push消费模式自动管理Offset,Pull消费模式需要手动管理
5. 通过Offset可以实现消息的精确消费和重复消费控制
6. Offset管理不当可能导致消息重复消费或丢失

**记忆口诀**: "位点记录消费处,集群Broker广播本地储"

---

25. 消费失败如何处理？

### 25. 消费失败如何处理？

**核心答案**:
消费失败后,RocketMQ会将消息放入重试队列进行重试,重试达到最大次数后,消息会进入死信队列(DLQ)等待人工处理。

**详细说明**:

**1. 消费失败的情况**
- 返回`RECONSUME_LATER`状态
- 抛出异常未捕获
- 返回`null`
- 消费超时

**2. 集群消费模式的处理流程**

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | 消费失败 | Consumer返回RECONSUME_LATER |
| 2 | 发送到重试Topic | %RETRY%+ConsumerGroup |
| 3 | 延迟重试 | 按延迟级别递增重试 |
| 4 | 重试16次 | 默认最多重试16次 |
| 5 | 进入死信队列 | %DLQ%+ConsumerGroup |

**3. 广播消费模式**
- 不支持重试
- 失败后需要应用层自行处理
- 不会进入死信队列

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs><style>.txt{font:14px sans-serif;}.title{font:16px sans-serif;font-weight:bold;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="30" width="700" height="480" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" class="title" text-anchor="middle" fill="#1976d2">消费失败处理流程</text>
<rect x="100" y="80" width="120" height="50" fill="#64b5f6" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="160" y="100" class="txt" text-anchor="middle" fill="white">原始消息</text>
<text x="160" y="118" class="small" text-anchor="middle" fill="white">TopicTest</text>
<rect x="280" y="80" width="120" height="50" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="340" y="100" class="txt" text-anchor="middle">Consumer</text>
<text x="340" y="118" class="small" text-anchor="middle">消费处理</text>
<line x1="220" y1="105" x2="280" y2="105" stroke="#333" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="250" y="100" class="small" fill="#666">①消费</text>
<rect x="460" y="80" width="120" height="50" fill="#ef5350" stroke="#d32f2f" stroke-width="2" rx="3"/>
<text x="520" y="100" class="txt" text-anchor="middle" fill="white">消费失败</text>
<text x="520" y="118" class="small" text-anchor="middle" fill="white">异常/超时</text>
<line x1="400" y1="105" x2="460" y2="105" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="430" y="100" class="small" fill="#d32f2f">②失败</text>
<rect x="280" y="170" width="240" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="400" y="190" class="txt" text-anchor="middle" fill="#f57c00">重试Topic</text>
<text x="400" y="208" class="small" text-anchor="middle" fill="#999">%RETRY%+ConsumerGroup</text>
<line x1="520" y1="130" x2="400" y2="170" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="470" y="155" class="small" fill="#f57c00">③进入重试队列</text>
<rect x="100" y="260" width="600" height="120" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="400" y="280" class="small" text-anchor="middle" fill="#333" font-weight="bold">重试延迟时间表</text>
<text x="120" y="300" class="small" fill="#666">次数 1  2  3  4   5   6   7   8   9  10  11  12  13  14  15  16</text>
<text x="120" y="320" class="small" fill="#666">延迟 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m  9m 10m 20m 30m 1h  2h</text>
<text x="120" y="345" class="small" fill="#999">• 重试间隔逐渐增加,避免频繁重试</text>
<text x="120" y="365" class="small" fill="#999">• 总重试时间约4.8小时</text>
<rect x="280" y="400" width="120" height="50" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="340" y="420" class="txt" text-anchor="middle">Consumer</text>
<text x="340" y="438" class="small" text-anchor="middle">重新消费</text>
<line x1="400" y1="220" x2="340" y2="400" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="360" y="310" class="small" fill="#4caf50">④延迟后重试</text>
<rect x="460" y="400" width="120" height="50" fill="#e57373" stroke="#d32f2f" stroke-width="2" rx="3"/>
<text x="520" y="420" class="txt" text-anchor="middle" fill="white">仍然失败</text>
<text x="520" y="438" class="small" text-anchor="middle" fill="white">重试16次</text>
<line x1="400" y1="425" x2="460" y2="425" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="430" y="420" class="small" fill="#d32f2f">⑤仍失败</text>
<rect x="620" y="400" width="120" height="50" fill="#9e9e9e" stroke="#616161" stroke-width="2" rx="3"/>
<text x="680" y="420" class="txt" text-anchor="middle" fill="white">死信队列</text>
<text x="680" y="438" class="small" text-anchor="middle" fill="white">%DLQ%</text>
<line x1="580" y1="425" x2="620" y2="425" stroke="#616161" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="600" y="420" class="small" fill="#616161">⑥DLQ</text>
<text x="620" y="480" class="small" fill="#d32f2f">⚠ 需人工处理</text>
<defs><marker id="arrow5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
</svg>

**代码示例**:

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("consumer_group");
consumer.setNamesrvAddr("localhost:9876");

// 设置最大重试次数(默认16次)
consumer.setMaxReconsumeTimes(16);

consumer.subscribe("TopicTest", "*");
consumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        for (MessageExt msg : msgs) {
            try {
                // 获取重试次数
                int reconsumeTimes = msg.getReconsumeTimes();
                System.out.println("重试次数: " + reconsumeTimes);

                // 业务处理
                processMessage(msg);

            } catch (Exception e) {
                System.err.println("消费失败: " + e.getMessage());

                // 根据重试次数决定处理策略
                if (msg.getReconsumeTimes() >= 3) {
                    // 重试3次后记录日志,但仍返回成功避免继续重试
                    logError(msg, e);
                    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                }

                // 返回RECONSUME_LATER,消息会进入重试队列
                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
            }
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});
consumer.start();

// 监听死信队列
DefaultMQPushConsumer dlqConsumer = new DefaultMQPushConsumer("dlq_consumer_group");
dlqConsumer.setNamesrvAddr("localhost:9876");
// 订阅死信Topic: %DLQ% + 原ConsumerGroup
dlqConsumer.subscribe("%DLQ%consumer_group", "*");
dlqConsumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        for (MessageExt msg : msgs) {
            System.err.println("收到死信消息: " + new String(msg.getBody()));
            // 记录到数据库或发送告警
            saveToDB(msg);
            sendAlert(msg);
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});
dlqConsumer.start();
```

**关键要点**:
1. 集群消费支持自动重试,广播消费不支持
2. 重试消息会发送到特殊的重试Topic: `%RETRY%+ConsumerGroup`
3. 重试延迟逐级递增,避免频繁重试影响系统
4. 默认最多重试16次,总时长约4.8小时
5. 超过最大重试次数后进入死信队列
6. 可以通过监听死信队列进行人工处理
7. 建议根据业务场景设置合理的重试次数

**记忆口诀**: "失败重试有延迟,十六次后进死信"

---

26. 什么是消费重试机制？

### 26. 什么是消费重试机制？

**核心答案**:
消费重试机制是RocketMQ在消息消费失败时,自动将消息发送到重试Topic,按照延迟级别递增的方式重新投递消息,直到消费成功或达到最大重试次数。

**详细说明**:

**1. 重试机制的特点**

| 特性 | 说明 |
|------|------|
| 适用模式 | 仅集群消费模式支持 |
| 重试Topic | %RETRY%+ConsumerGroup |
| 最大次数 | 默认16次,可配置 |
| 延迟级别 | 16个延迟级别,逐级递增 |
| 总时长 | 约4.8小时 |

**2. 重试延迟级别详细表**

| 重试次数 | 延迟时间 | 重试次数 | 延迟时间 |
|---------|---------|---------|---------|
| 1 | 10秒 | 9 | 7分钟 |
| 2 | 30秒 | 10 | 8分钟 |
| 3 | 1分钟 | 11 | 9分钟 |
| 4 | 2分钟 | 12 | 10分钟 |
| 5 | 3分钟 | 13 | 20分钟 |
| 6 | 4分钟 | 14 | 30分钟 |
| 7 | 5分钟 | 15 | 1小时 |
| 8 | 6分钟 | 16 | 2小时 |

**3. 重试机制的工作流程**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.txt{font:14px sans-serif;}.title{font:16px sans-serif;font-weight:bold;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="30" width="700" height="440" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" class="title" text-anchor="middle" fill="#1976d2">重试机制工作流程</text>
<rect x="100" y="90" width="600" height="360" fill="#fff" stroke="#999" stroke-width="1" rx="3"/>
<rect x="150" y="110" width="100" height="40" fill="#64b5f6" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="200" y="135" class="txt" text-anchor="middle" fill="white">原始消息</text>
<rect x="350" y="110" width="100" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="400" y="135" class="txt" text-anchor="middle">第1次消费</text>
<line x1="250" y1="130" x2="350" y2="130" stroke="#333" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="550" y="110" width="100" height="40" fill="#ef5350" stroke="#d32f2f" stroke-width="2" rx="3"/>
<text x="600" y="135" class="txt" text-anchor="middle" fill="white">失败</text>
<line x1="450" y1="130" x2="550" y2="130" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="350" y="180" width="100" height="40" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="400" y="200" class="small" text-anchor="middle" fill="#f57c00">重试Topic</text>
<text x="400" y="213" class="small" text-anchor="middle" fill="#999">延迟10s</text>
<line x1="600" y1="150" x2="400" y2="180" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="550" y="180" width="100" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="600" y="205" class="txt" text-anchor="middle">第2次消费</text>
<line x1="450" y1="200" x2="550" y2="200" stroke="#333" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="550" y="240" width="100" height="40" fill="#ef5350" stroke="#d32f2f" stroke-width="2" rx="3"/>
<text x="600" y="265" class="txt" text-anchor="middle" fill="white">失败</text>
<line x1="600" y1="220" x2="600" y2="240" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="350" y="290" width="100" height="40" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="400" y="310" class="small" text-anchor="middle" fill="#f57c00">重试Topic</text>
<text x="400" y="323" class="small" text-anchor="middle" fill="#999">延迟30s</text>
<line x1="550" y1="260" x2="450" y2="290" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow6)"/>
<text x="270" y="310" class="small" fill="#666">...</text>
<rect x="150" y="360" width="100" height="40" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="200" y="380" class="small" text-anchor="middle" fill="#f57c00">第16次重试</text>
<text x="200" y="393" class="small" text-anchor="middle" fill="#999">延迟2h</text>
<rect x="350" y="360" width="100" height="40" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="400" y="385" class="txt" text-anchor="middle">最后消费</text>
<line x1="250" y1="380" x2="350" y2="380" stroke="#333" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="550" y="340" width="100" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="2" rx="3"/>
<text x="600" y="365" class="txt" text-anchor="middle" fill="white">成功✓</text>
<line x1="450" y1="375" x2="550" y2="360" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow6)"/>
<text x="500" y="368" class="small" fill="#4caf50">结束</text>
<rect x="550" y="390" width="100" height="40" fill="#9e9e9e" stroke="#616161" stroke-width="2" rx="3"/>
<text x="600" y="415" class="txt" text-anchor="middle" fill="white">死信队列</text>
<line x1="450" y1="385" x2="550" y2="410" stroke="#616161" stroke-width="2" marker-end="url(#arrow6)"/>
<text x="500" y="403" class="small" fill="#616161">或进DLQ</text>
<defs><marker id="arrow6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
</svg>

**代码示例**:

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("consumer_group");
consumer.setNamesrvAddr("localhost:9876");

// ========== 重试相关配置 ==========

// 1. 设置最大重试次数(默认16次)
consumer.setMaxReconsumeTimes(10);  // 改为10次

// 2. 设置消费超时时间(默认15分钟)
consumer.setConsumeTimeout(10);  // 10分钟超时

// 3. 设置并发消费线程数
consumer.setConsumeThreadMin(20);
consumer.setConsumeThreadMax(64);

consumer.subscribe("TopicTest", "*");
consumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        for (MessageExt msg : msgs) {
            try {
                // 获取消息重试次数
                int reconsumeTimes = msg.getReconsumeTimes();
                System.out.println("消息ID: " + msg.getMsgId());
                System.out.println("重试次数: " + reconsumeTimes);
                System.out.println("重试Topic: " + msg.getTopic());

                // 业务逻辑处理
                if (reconsumeTimes == 0) {
                    // 第一次消费
                    System.out.println("首次消费");
                } else {
                    // 重试消费
                    System.out.println("重试消费,第" + reconsumeTimes + "次");
                }

                // 模拟业务处理
                processMessage(msg);

                // 消费成功
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;

            } catch (Exception e) {
                System.err.println("消费异常: " + e.getMessage());

                // 可以根据异常类型和重试次数决定是否继续重试
                if (e instanceof NetworkException && msg.getReconsumeTimes() < 3) {
                    // 网络异常且重试次数少于3次,继续重试
                    System.out.println("网络异常,继续重试");
                    return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                } else if (e instanceof BusinessException) {
                    // 业务异常,不再重试,直接成功(避免进入死信队列)
                    System.out.println("业务异常,不再重试");
                    logError(msg, e);
                    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                } else {
                    // 其他异常,继续重试
                    return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                }
            }
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});
consumer.start();

// 手动发送消息到重试队列
DefaultMQProducer producer = new DefaultMQProducer("producer_group");
producer.start();

// 创建重试消息
Message retryMsg = new Message();
retryMsg.setTopic("%RETRY%consumer_group");  // 重试Topic
retryMsg.setBody("retry message".getBytes());
retryMsg.setDelayTimeLevel(3);  // 设置延迟级别3(1分钟)

producer.send(retryMsg);
```

**关键要点**:
1. 重试机制仅在集群消费模式下有效
2. 重试消息会发送到特殊的重试Topic: `%RETRY%+ConsumerGroup`
3. 重试延迟按照预设的16个级别递增,从10秒到2小时
4. 可以通过`setMaxReconsumeTimes`设置最大重试次数
5. 重试消息保留原消息的所有属性(包括MessageId、Keys等)
6. 合理使用重试机制可以提高系统的容错能力
7. 建议根据业务场景区分可重试和不可重试的异常

**记忆口诀**: "重试延迟有十六,逐级递增到两小时"

---

27. 什么是死信队列（Dead Letter Queue）？

### 27. 什么是死信队列（Dead Letter Queue）？

**核心答案**:
死信队列(DLQ)是RocketMQ用于存储消费失败且重试次数达到上限的消息的特殊队列,Topic名称为`%DLQ%+ConsumerGroup`,需要人工介入处理。

**详细说明**:

**1. 死信队列的特点**

| 特性 | 说明 |
|------|------|
| Topic命名 | %DLQ%+ConsumerGroup |
| 触发条件 | 重试次数达到最大限制 |
| 适用模式 | 仅集群消费模式 |
| 有效期 | 默认3天,可配置 |
| 处理方式 | 需要人工处理或监控告警 |

**2. 消息进入死信队列的场景**
- 消费失败且重试达到最大次数(默认16次)
- 消息过期(存储时间超过设置的保留期)

**3. 死信队列的作用**
- 隔离异常消息,避免影响正常消息消费
- 保留消费失败的消息,方便问题排查
- 提供人工补偿处理的机会

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs><style>.txt{font:14px sans-serif;}.title{font:16px sans-serif;font-weight:bold;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="30" width="700" height="490" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" class="title" text-anchor="middle" fill="#1976d2">死信队列处理流程</text>
<rect x="100" y="90" width="120" height="50" fill="#64b5f6" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="160" y="110" class="txt" text-anchor="middle" fill="white">原始消息</text>
<text x="160" y="128" class="small" text-anchor="middle" fill="white">TopicTest</text>
<rect x="280" y="90" width="120" height="50" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="340" y="110" class="txt" text-anchor="middle">Consumer</text>
<text x="340" y="128" class="small" text-anchor="middle">消费失败</text>
<line x1="220" y1="115" x2="280" y2="115" stroke="#333" stroke-width="2" marker-end="url(#arrow7)"/>
<text x="250" y="110" class="small" fill="#666">①</text>
<rect x="460" y="90" width="140" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="530" y="110" class="txt" text-anchor="middle" fill="#f57c00">重试队列</text>
<text x="530" y="128" class="small" text-anchor="middle" fill="#999">%RETRY%</text>
<line x1="400" y1="115" x2="460" y2="115" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow7)"/>
<text x="430" y="110" class="small" fill="#f57c00">②</text>
<rect x="280" y="180" width="120" height="50" fill="#fff176" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="340" y="200" class="txt" text-anchor="middle">重试消费</text>
<text x="340" y="218" class="small" text-anchor="middle">1-16次</text>
<line x1="530" y1="140" x2="340" y2="180" stroke="#333" stroke-width="2" marker-end="url(#arrow7)"/>
<text x="430" y="165" class="small" fill="#666">③</text>
<rect x="460" y="180" width="140" height="50" fill="#ef5350" stroke="#d32f2f" stroke-width="2" rx="3"/>
<text x="530" y="200" class="txt" text-anchor="middle" fill="white">仍然失败</text>
<text x="530" y="218" class="small" text-anchor="middle" fill="white">达到上限</text>
<line x1="400" y1="205" x2="460" y2="205" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow7)"/>
<text x="430" y="200" class="small" fill="#d32f2f">④</text>
<rect x="340" y="270" width="140" height="50" fill="#9e9e9e" stroke="#616161" stroke-width="2" rx="3"/>
<text x="410" y="290" class="txt" text-anchor="middle" fill="white">死信队列</text>
<text x="410" y="308" class="small" text-anchor="middle" fill="white">%DLQ%</text>
<line x1="530" y1="230" x2="410" y2="270" stroke="#616161" stroke-width="2" marker-end="url(#arrow7)"/>
<text x="475" y="255" class="small" fill="#616161">⑤</text>
<rect x="100" y="360" width="600" height="140" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="3"/>
<text x="400" y="385" class="small" text-anchor="middle" fill="#333" font-weight="bold">死信队列处理方式</text>
<rect x="130" y="400" width="180" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="220" y="420" class="small" text-anchor="middle" fill="#f57c00" font-weight="bold">方式1:监听消费</text>
<text x="140" y="440" class="small" fill="#666">• 创建专门Consumer</text>
<text x="140" y="460" class="small" fill="#666">• 订阅%DLQ%Topic</text>
<text x="140" y="475" class="small" fill="#666">• 记录日志/发送告警</text>
<rect x="340" y="400" width="180" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="430" y="420" class="small" text-anchor="middle" fill="#1976d2" font-weight="bold">方式2:人工补偿</text>
<text x="350" y="440" class="small" fill="#666">• 通过控制台查看</text>
<text x="350" y="460" class="small" fill="#666">• 分析失败原因</text>
<text x="350" y="475" class="small" fill="#666">• 重新发送或删除</text>
<rect x="550" y="400" width="130" height="80" fill="#ffebee" stroke="#d32f2f" stroke-width="1" rx="3"/>
<text x="615" y="420" class="small" text-anchor="middle" fill="#d32f2f" font-weight="bold">方式3:定时清理</text>
<text x="560" y="440" class="small" fill="#666">• 设置保留期</text>
<text x="560" y="460" class="small" fill="#666">• 自动过期删除</text>
<text x="560" y="475" class="small" fill="#666">• 默认3天</text>
<defs><marker id="arrow7" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
</svg>

**代码示例**:

```java
// ========== 方式1: 监听死信队列 ==========
DefaultMQPushConsumer dlqConsumer = new DefaultMQPushConsumer("dlq_monitor_group");
dlqConsumer.setNamesrvAddr("localhost:9876");

// 订阅原ConsumerGroup的死信Topic
// 格式: %DLQ% + 原ConsumerGroup名称
dlqConsumer.subscribe("%DLQ%consumer_group", "*");

dlqConsumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        for (MessageExt msg : msgs) {
            System.err.println("========== 发现死信消息 ==========");
            System.err.println("消息ID: " + msg.getMsgId());
            System.err.println("原始Topic: " + msg.getProperty("REAL_TOPIC"));
            System.err.println("消息内容: " + new String(msg.getBody()));
            System.err.println("重试次数: " + msg.getReconsumeTimes());
            System.err.println("消息Key: " + msg.getKeys());

            // 处理死信消息的几种方式:

            // 1. 记录到数据库
            saveDeadLetterToDatabase(msg);

            // 2. 发送告警通知
            sendAlert(msg);

            // 3. 尝试人工补偿逻辑
            try {
                manualCompensation(msg);
            } catch (Exception e) {
                System.err.println("补偿失败: " + e.getMessage());
            }

            // 4. 转发到其他系统处理
            forwardToOtherSystem(msg);
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});
dlqConsumer.start();

// ========== 方式2: 从死信队列重新发送 ==========
public void resendFromDLQ(String msgId) throws Exception {
    // 1. 通过msgId查询死信消息
    DefaultMQPullConsumer pullConsumer = new DefaultMQPullConsumer("dlq_resend_group");
    pullConsumer.setNamesrvAddr("localhost:9876");
    pullConsumer.start();

    // 2. 从死信Topic拉取消息
    Set<MessageQueue> mqs = pullConsumer.fetchSubscribeMessageQueues("%DLQ%consumer_group");
    for (MessageQueue mq : mqs) {
        PullResult pullResult = pullConsumer.pull(mq, "*", 0, 100);
        if (pullResult.getPullStatus() == PullStatus.FOUND) {
            for (MessageExt msg : pullResult.getMsgFoundList()) {
                if (msg.getMsgId().equals(msgId)) {
                    // 3. 重新发送到原Topic
                    DefaultMQProducer producer = new DefaultMQProducer("resend_producer");
                    producer.setNamesrvAddr("localhost:9876");
                    producer.start();

                    Message newMsg = new Message(
                        msg.getProperty("REAL_TOPIC"),  // 原始Topic
                        msg.getTags(),
                        msg.getBody()
                    );
                    newMsg.setKeys(msg.getKeys());

                    SendResult sendResult = producer.send(newMsg);
                    System.out.println("重新发送成功: " + sendResult.getMsgId());

                    producer.shutdown();
                    break;
                }
            }
        }
    }
    pullConsumer.shutdown();
}

// ========== 方式3: 配置死信队列保留期 ==========
// 在Broker配置文件中设置
// # 死信消息保留时间(小时), 默认72小时(3天)
// messageDelayLevel=1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h
```

**关键要点**:
1. 死信队列的Topic格式: `%DLQ%+ConsumerGroup`
2. 仅在集群消费模式下,消息才会进入死信队列
3. 死信消息默认保留3天,可以通过Broker配置修改
4. 死信消息保留了原消息的所有属性和内容
5. 建议监听死信队列并设置告警,及时发现和处理问题
6. 可以通过控制台或代码从死信队列重新发送消息
7. 死信队列中的消息需要人工介入处理,不会自动重试

**记忆口诀**: "重试失败进死信,人工处理要及时"

---

28. 如何保证消息被消费？

### 28. 如何保证消息被消费？

**核心答案**:
通过RocketMQ的重试机制、死信队列、消费进度管理和业务幂等性设计,可以保证消息最终被消费或得到妥善处理。

**详细说明**:

**1. RocketMQ机制层面保障**

| 机制 | 作用 | 说明 |
|------|------|------|
| 消费重试 | 自动重试失败消息 | 16次重试,延迟递增 |
| 死信队列 | 保留无法消费的消息 | 人工介入处理 |
| Offset管理 | 记录消费进度 | 防止消息丢失 |
| 负载均衡 | 自动分配Queue | 保证消费能力 |
| 消费确认 | ACK机制 | 确认消费成功 |

**2. 应用层保障措施**

- **业务幂等性**: 保证重复消费不会产生副作用
- **监控告警**: 监控消费延迟、死信消息
- **日志记录**: 记录消费过程和异常
- **补偿机制**: 提供人工或自动补偿

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs><style>.txt{font:14px sans-serif;}.title{font:16px sans-serif;font-weight:bold;}.small{font:12px sans-serif;}</style></defs>
<rect x="50" y="30" width="700" height="540" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" class="title" text-anchor="middle" fill="#1976d2">消息消费保障体系</text>
<rect x="100" y="80" width="600" height="220" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="105" class="txt" text-anchor="middle" fill="#f57c00" font-weight="bold">RocketMQ机制层</text>
<rect x="130" y="120" width="140" height="70" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="200" y="140" class="small" text-anchor="middle" fill="#f57c00">消费重试</text>
<text x="140" y="160" class="small" fill="#666">• 自动重试16次</text>
<text x="140" y="175" class="small" fill="#666">• 延迟递增</text>
<rect x="300" y="120" width="140" height="70" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="370" y="140" class="small" text-anchor="middle" fill="#f57c00">死信队列</text>
<text x="310" y="160" class="small" fill="#666">• 保留失败消息</text>
<text x="310" y="175" class="small" fill="#666">• 人工处理</text>
<rect x="470" y="120" width="140" height="70" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="540" y="140" class="small" text-anchor="middle" fill="#f57c00">Offset管理</text>
<text x="480" y="160" class="small" fill="#666">• 记录消费位置</text>
<text x="480" y="175" class="small" fill="#666">• 防止丢失</text>
<rect x="130" y="210" width="140" height="70" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="200" y="230" class="small" text-anchor="middle" fill="#f57c00">负载均衡</text>
<text x="140" y="250" class="small" fill="#666">• 动态分配</text>
<text x="140" y="265" class="small" fill="#666">• 保证消费能力</text>
<rect x="300" y="210" width="140" height="70" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="370" y="230" class="small" text-anchor="middle" fill="#f57c00">消费确认ACK</text>
<text x="310" y="250" class="small" fill="#666">• SUCCESS确认</text>
<text x="310" y="265" class="small" fill="#666">• LATER重试</text>
<rect x="100" y="320" width="600" height="220" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="345" class="txt" text-anchor="middle" fill="#4caf50" font-weight="bold">应用层保障</text>
<rect x="130" y="360" width="140" height="70" fill="#fff" stroke="#4caf50" stroke-width="1" rx="3"/>
<text x="200" y="380" class="small" text-anchor="middle" fill="#4caf50">幂等性设计</text>
<text x="140" y="400" class="small" fill="#666">• 去重判断</text>
<text x="140" y="415" class="small" fill="#666">• 重复消费安全</text>
<rect x="300" y="360" width="140" height="70" fill="#fff" stroke="#4caf50" stroke-width="1" rx="3"/>
<text x="370" y="380" class="small" text-anchor="middle" fill="#4caf50">监控告警</text>
<text x="310" y="400" class="small" fill="#666">• 消费延迟</text>
<text x="310" y="415" class="small" fill="#666">• 死信监控</text>
<rect x="470" y="360" width="140" height="70" fill="#fff" stroke="#4caf50" stroke-width="1" rx="3"/>
<text x="540" y="380" class="small" text-anchor="middle" fill="#4caf50">日志记录</text>
<text x="480" y="400" class="small" fill="#666">• 消费记录</text>
<text x="480" y="415" class="small" fill="#666">• 异常日志</text>
<rect x="215" y="450" width="140" height="70" fill="#fff" stroke="#4caf50" stroke-width="1" rx="3"/>
<text x="285" y="470" class="small" text-anchor="middle" fill="#4caf50">补偿机制</text>
<text x="225" y="490" class="small" fill="#666">• 人工补偿</text>
<text x="225" y="505" class="small" fill="#666">• 定时任务</text>
<rect x="385" y="450" width="140" height="70" fill="#fff" stroke="#4caf50" stroke-width="1" rx="3"/>
<text x="455" y="470" class="small" text-anchor="middle" fill="#4caf50">事务保障</text>
<text x="395" y="490" class="small" fill="#666">• 本地事务表</text>
<text x="395" y="505" class="small" fill="#666">• 最终一致性</text>
<defs><marker id="arrow8" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
</svg>

**代码示例**:

```java
// ========== 完整的消息消费保障实现 ==========
public class ReliableMessageConsumer {

    // 1. 消费者配置
    public void startConsumer() {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("reliable_consumer_group");
        consumer.setNamesrvAddr("localhost:9876");

        // 设置重试次数
        consumer.setMaxReconsumeTimes(16);

        // 设置消费超时时间
        consumer.setConsumeTimeout(15);

        consumer.subscribe("TopicTest", "*");
        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                    List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    try {
                        // 核心:保证消息被消费
                        return processMessageReliably(msg);
                    } catch (Exception e) {
                        log.error("消费异常", e);
                        return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                    }
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });
        consumer.start();
    }

    // 2. 可靠消费处理
    private ConsumeConcurrentlyStatus processMessageReliably(MessageExt msg) {
        String msgId = msg.getMsgId();
        String msgKey = msg.getKeys();

        try {
            // ① 幂等性检查:防止重复消费
            if (isMessageProcessed(msgKey)) {
                log.info("消息已处理,跳过: {}", msgKey);
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }

            // ② 记录消费开始
            logConsumeStart(msgId, msgKey);

            // ③ 业务处理
            boolean success = doBusinessLogic(msg);

            if (success) {
                // ④ 标记消息已处理(幂等性)
                markMessageProcessed(msgKey);

                // ⑤ 记录成功日志
                logConsumeSuccess(msgId, msgKey);

                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            } else {
                // 业务失败,判断是否需要重试
                int retryTimes = msg.getReconsumeTimes();
                if (retryTimes < 3) {
                    // 少于3次,继续重试
                    log.warn("业务处理失败,继续重试: {}, 次数: {}", msgKey, retryTimes);
                    return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                } else {
                    // 超过3次,记录日志但返回成功(避免进死信队列)
                    log.error("业务处理失败,放弃重试: {}", msgKey);
                    saveToFailureTable(msg);  // 保存到失败表,人工处理
                    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                }
            }

        } catch (Exception e) {
            log.error("消费异常: {}", msgKey, e);
            // 记录异常
            logConsumeError(msgId, msgKey, e);
            // 返回LATER,让RocketMQ重试
            return ConsumeConcurrentlyStatus.RECONSUME_LATER;
        }
    }

    // 3. 幂等性检查(Redis或DB)
    private boolean isMessageProcessed(String msgKey) {
        // 方式1: 使用Redis
        return redisTemplate.hasKey("msg:processed:" + msgKey);

        // 方式2: 使用数据库
        // return messageRecordDao.exists(msgKey);
    }

    // 4. 标记消息已处理
    private void markMessageProcessed(String msgKey) {
        // 方式1: Redis,设置过期时间防止内存泄漏
        redisTemplate.opsForValue().set(
            "msg:processed:" + msgKey,
            "1",
            7,
            TimeUnit.DAYS
        );

        // 方式2: 数据库
        // messageRecordDao.insert(msgKey, new Date());
    }

    // 5. 保存失败消息到数据库
    private void saveToFailureTable(MessageExt msg) {
        FailureMessage failureMsg = new FailureMessage();
        failureMsg.setMsgId(msg.getMsgId());
        failureMsg.setMsgKey(msg.getKeys());
        failureMsg.setTopic(msg.getTopic());
        failureMsg.setBody(new String(msg.getBody()));
        failureMsg.setRetryTimes(msg.getReconsumeTimes());
        failureMsg.setCreateTime(new Date());
        failureMsg.setStatus("FAILED");

        failureMessageDao.insert(failureMsg);

        // 发送告警
        sendAlert("消息消费失败", msg.getKeys());
    }

    // 6. 监听死信队列
    public void startDLQConsumer() {
        DefaultMQPushConsumer dlqConsumer = new DefaultMQPushConsumer("dlq_monitor_group");
        dlqConsumer.setNamesrvAddr("localhost:9876");
        dlqConsumer.subscribe("%DLQ%reliable_consumer_group", "*");

        dlqConsumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                    List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    log.error("发现死信消息: {}", msg.getKeys());

                    // 保存死信消息
                    saveToDeadLetterTable(msg);

                    // 发送告警
                    sendAlert("发现死信消息", msg.getKeys());
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });
        dlqConsumer.start();
    }

    // 7. 定时补偿任务
    @Scheduled(cron = "0 */10 * * * ?")  // 每10分钟执行一次
    public void compensateFailedMessages() {
        List<FailureMessage> failedMessages =
            failureMessageDao.findUnprocessed();

        for (FailureMessage msg : failedMessages) {
            try {
                // 重新发送消息
                Message retryMsg = new Message(
                    msg.getTopic(),
                    msg.getBody().getBytes()
                );
                retryMsg.setKeys(msg.getMsgKey());

                producer.send(retryMsg);

                // 更新状态
                msg.setStatus("COMPENSATED");
                failureMessageDao.update(msg);

            } catch (Exception e) {
                log.error("补偿失败: {}", msg.getMsgKey(), e);
            }
        }
    }
}
```

**关键要点**:
1. **重试机制**: RocketMQ自动重试16次,延迟递增
2. **死信队列**: 重试失败后进入DLQ,需监控和处理
3. **幂等性设计**: 通过Redis或DB去重,保证重复消费安全
4. **消费确认**: 正确返回ACK状态,SUCCESS或RECONSUME_LATER
5. **监控告警**: 监控消费延迟、死信消息,及时发现问题
6. **日志记录**: 记录消费过程,方便问题追踪
7. **补偿机制**: 提供定时任务或人工补偿
8. **事务保障**: 使用本地事务表保证最终一致性

**记忆口诀**: "重试加死信,幂等防重复,监控加补偿,消息必处理"

---
## 消息可靠性

29. 如何保证消息不丢失？

**核心答案**：
RocketMQ 通过三个环节保证消息不丢失：
- **Producer 端**：同步发送 + 重试机制 + 发送确认
- **Broker 端**：同步刷盘 + 主从同步复制
- **Consumer 端**：手动提交 offset + 消费确认

**详细说明**：

消息从发送到消费要经历三个环节，每个环节都可能丢失消息：

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="80" width="150" height="80" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="125" y="115" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Producer</text>
<text x="125" y="135" text-anchor="middle" fill="white" font-size="12">生产者端</text>
<rect x="325" y="80" width="150" height="80" fill="#E24A4A" stroke="#8A2E2E" stroke-width="2" rx="5"/>
<text x="400" y="115" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Broker</text>
<text x="400" y="135" text-anchor="middle" fill="white" font-size="12">消息存储</text>
<rect x="600" y="80" width="150" height="80" fill="#4AE290" stroke="#2E8A5C" stroke-width="2" rx="5"/>
<text x="675" y="115" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Consumer</text>
<text x="675" y="135" text-anchor="middle" fill="white" font-size="12">消费者端</text>
<path d="M 200 120 L 325 120" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<text x="262" y="110" text-anchor="middle" fill="#333" font-size="11">网络传输</text>
<path d="M 475 120 L 600 120" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<text x="537" y="110" text-anchor="middle" fill="#333" font-size="11">网络传输</text>
<rect x="50" y="200" width="150" height="120" fill="#E8F4FD" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="125" y="220" text-anchor="middle" fill="#2E5C8A" font-size="13" font-weight="bold">防丢失策略</text>
<text x="70" y="245" fill="#333" font-size="11">• 同步发送</text>
<text x="70" y="265" fill="#333" font-size="11">• 重试机制</text>
<text x="70" y="285" fill="#333" font-size="11">• 发送确认</text>
<text x="70" y="305" fill="#333" font-size="11">• 本地消息表</text>
<rect x="325" y="200" width="150" height="120" fill="#FDE8E8" stroke="#E24A4A" stroke-width="2" rx="5"/>
<text x="400" y="220" text-anchor="middle" fill="#8A2E2E" font-size="13" font-weight="bold">防丢失策略</text>
<text x="345" y="245" fill="#333" font-size="11">• 同步刷盘</text>
<text x="345" y="265" fill="#333" font-size="11">• 主从同步复制</text>
<text x="345" y="285" fill="#333" font-size="11">• 持久化存储</text>
<text x="345" y="305" fill="#333" font-size="11">• 高可用部署</text>
<rect x="600" y="200" width="150" height="120" fill="#E8FDF4" stroke="#4AE290" stroke-width="2" rx="5"/>
<text x="675" y="220" text-anchor="middle" fill="#2E8A5C" font-size="13" font-weight="bold">防丢失策略</text>
<text x="620" y="245" fill="#333" font-size="11">• 手动提交offset</text>
<text x="620" y="265" fill="#333" font-size="11">• 消费确认</text>
<text x="620" y="285" fill="#333" font-size="11">• 幂等处理</text>
<text x="620" y="305" fill="#333" font-size="11">• 异常重试</text>
<rect x="150" y="360" width="500" height="100" fill="#FFF9E6" stroke="#F5C842" stroke-width="2" rx="5"/>
<text x="400" y="385" text-anchor="middle" fill="#8A7020" font-size="14" font-weight="bold">完整的消息不丢失方案</text>
<text x="170" y="410" fill="#333" font-size="11">1. Producer 使用同步发送模式，设置合理的超时和重试参数</text>
<text x="170" y="430" fill="#333" font-size="11">2. Broker 配置同步刷盘 + 主从同步复制（双重保障）</text>
<text x="170" y="450" fill="#333" font-size="11">3. Consumer 消费成功后再提交 offset，失败则重试或进入死信队列</text>
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**三个环节的保障措施**：

| 环节 | 可能丢失的场景 | 保障措施 |
|------|---------------|---------|
| **Producer → Broker** | 网络故障、Broker 宕机 | 同步发送 + 重试机制 + 本地消息表 |
| **Broker 存储** | 机器断电、磁盘损坏 | 同步刷盘 + 主从同步复制 |
| **Broker → Consumer** | 消费失败、Consumer 宕机 | 手动提交 offset + 消费重试 |

**代码示例**：

```java
// ====== Producer 端保障 ======
public class ReliableProducer {
    public void sendMessage(String message) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("reliable_producer");
        producer.setNamesrvAddr("localhost:9876");

        // ① 配置发送参数
        producer.setSendMsgTimeout(10000);        // 发送超时时间
        producer.setRetryTimesWhenSendFailed(3);  // 同步发送失败重试次数

        producer.start();

        Message msg = new Message("ReliableTopic", message.getBytes());

        try {
            // ② 使用同步发送
            SendResult sendResult = producer.send(msg);

            // ③ 检查发送结果
            if (sendResult.getSendStatus() == SendStatus.SEND_OK) {
                System.out.println("消息发送成功: " + sendResult.getMsgId());
            } else {
                // 发送失败，记录到本地消息表，后续补偿
                saveToLocalMessageTable(msg, sendResult);
            }
        } catch (Exception e) {
            // 发送异常，记录并告警
            logError(msg, e);
            saveToLocalMessageTable(msg, null);
            throw e;
        }
    }
}

// ====== Broker 端保障（配置文件）======
// broker.conf
flushDiskType = SYNC_FLUSH              // 同步刷盘
brokerRole = SYNC_MASTER                // 同步主从复制
autoCreateTopicEnable = false

// ====== Consumer 端保障 ======
public class ReliableConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("reliable_consumer");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("ReliableTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                    List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    try {
                        // ① 幂等性检查
                        if (isProcessed(msg.getMsgId())) {
                            continue;
                        }

                        // ② 执行业务逻辑
                        processMessage(msg);

                        // ③ 标记已处理（数据库或Redis）
                        markAsProcessed(msg.getMsgId());

                    } catch (Exception e) {
                        // ④ 消费失败，返回RECONSUME_LATER，触发重试
                        System.err.println("消费失败: " + e.getMessage());
                        return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                    }
                }
                // ⑤ 消费成功，自动提交 offset
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }
}
```

**关键要点**：

1. **端到端保障**：三个环节都要采取措施，任何一个环节出问题都会导致消息丢失
2. **同步机制**：同步发送、同步刷盘、同步复制，虽然性能较差但可靠性最高
3. **确认机制**：Producer 发送确认、Broker 存储确认、Consumer 消费确认
4. **补偿机制**：本地消息表 + 定时任务补偿未发送成功的消息
5. **监控告警**：监控消息发送失败率、Broker 存储异常、Consumer 消费失败

**记忆口诀**：
```
消息不丢三保障，
生产同步加重试，
存储刷盘主从复，
消费确认再提交。
```
30. Producer 端如何保证消息不丢失？

**核心答案**：
Producer 端保证消息不丢失的关键措施：
1. **同步发送模式**：send() 方法会阻塞等待结果
2. **发送重试机制**：自动重试失败的发送操作
3. **发送结果确认**：检查 SendStatus 是否为 SEND_OK
4. **本地消息表**：记录未成功发送的消息，定时补偿

**详细说明**：

Producer 端主要通过以下机制保证消息不丢失：

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="480" fill="#F8F9FA" stroke="#DEE2E6" stroke-width="2" rx="5"/>
<text x="400" y="80" text-anchor="middle" fill="#212529" font-size="18" font-weight="bold">Producer 端消息不丢失保障机制</text>
<rect x="100" y="120" width="250" height="180" fill="#E3F2FD" stroke="#1976D2" stroke-width="2" rx="5"/>
<text x="225" y="145" text-anchor="middle" fill="#0D47A1" font-size="14" font-weight="bold">① 同步发送</text>
<text x="120" y="175" fill="#333" font-size="12">• 阻塞等待发送结果</text>
<text x="120" y="200" fill="#333" font-size="12">• 确保消息到达Broker</text>
<text x="120" y="225" fill="#333" font-size="12">• 返回SendResult</text>
<text x="120" y="255" fill="#666" font-size="11" font-style="italic">producer.send(msg)</text>
<text x="120" y="280" fill="#666" font-size="11" font-style="italic">// 阻塞直到返回结果</text>
<rect x="450" y="120" width="250" height="180" fill="#FFF3E0" stroke="#F57C00" stroke-width="2" rx="5"/>
<text x="575" y="145" text-anchor="middle" fill="#E65100" font-size="14" font-weight="bold">② 重试机制</text>
<text x="470" y="175" fill="#333" font-size="12">• 同步重试：默认2次</text>
<text x="470" y="200" fill="#333" font-size="12">• 异步重试：默认2次</text>
<text x="470" y="225" fill="#333" font-size="12">• Oneway：无重试</text>
<text x="470" y="255" fill="#666" font-size="11" font-style="italic">setRetryTimesWhenSendFailed(3)</text>
<text x="470" y="280" fill="#666" font-size="11" font-style="italic">setSendMsgTimeout(10000)</text>
<rect x="100" y="320" width="250" height="160" fill="#E8F5E9" stroke="#388E3C" stroke-width="2" rx="5"/>
<text x="225" y="345" text-anchor="middle" fill="#1B5E20" font-size="14" font-weight="bold">③ 结果确认</text>
<text x="120" y="375" fill="#333" font-size="12">• SEND_OK：发送成功</text>
<text x="120" y="400" fill="#333" font-size="12">• FLUSH_DISK_TIMEOUT：刷盘超时</text>
<text x="120" y="425" fill="#333" font-size="12">• FLUSH_SLAVE_TIMEOUT：同步超时</text>
<text x="120" y="450" fill="#333" font-size="12">• SLAVE_NOT_AVAILABLE：从节点不可用</text>
<rect x="450" y="320" width="250" height="160" fill="#FCE4EC" stroke="#C2185B" stroke-width="2" rx="5"/>
<text x="575" y="345" text-anchor="middle" fill="#880E4F" font-size="14" font-weight="bold">④ 本地消息表</text>
<text x="470" y="375" fill="#333" font-size="12">• 发送前记录消息</text>
<text x="470" y="400" fill="#333" font-size="12">• 发送成功后更新状态</text>
<text x="470" y="425" fill="#333" font-size="12">• 定时任务扫描未发送成功</text>
<text x="470" y="450" fill="#333" font-size="12">• 重新发送或告警</text>
<path d="M 225 300 L 225 320" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead2)"/>
<path d="M 575 300 L 575 320" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead2)"/>
<defs>
<marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**四大保障机制对比**：

| 机制 | 作用 | 配置方式 | 适用场景 |
|------|------|---------|---------|
| **同步发送** | 确保消息到达 | `send(msg)` | 重要消息 |
| **重试机制** | 自动重试失败 | `setRetryTimesWhenSendFailed(3)` | 网络不稳定 |
| **结果确认** | 检查发送状态 | 判断 `SendStatus` | 所有场景 |
| **本地消息表** | 持久化未发送 | 数据库或本地文件 | 高可靠要求 |

**代码示例**：

```java
public class ProducerReliability {

    // ① 基本的同步发送 + 重试
    public void basicReliableSend() throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("producer_group");
        producer.setNamesrvAddr("localhost:9876");

        // 配置发送参数
        producer.setSendMsgTimeout(10000);                    // 发送超时时间：10秒
        producer.setRetryTimesWhenSendFailed(3);             // 同步发送失败重试次数：3次
        producer.setRetryTimesWhenSendAsyncFailed(3);        // 异步发送失败重试次数：3次
        producer.setRetryAnotherBrokerWhenNotStoreOK(true);  // 存储失败时重试其他Broker

        producer.start();

        Message msg = new Message("Topic", "Tag", "Key", "消息内容".getBytes());

        try {
            // 同步发送，会阻塞等待结果
            SendResult result = producer.send(msg);

            // 检查发送结果
            if (result.getSendStatus() == SendStatus.SEND_OK) {
                System.out.println("消息发送成功: " + result.getMsgId());
            } else {
                System.err.println("消息发送未完全成功: " + result.getSendStatus());
                // 可能需要记录日志或告警
            }

        } catch (MQBrokerException e) {
            System.err.println("Broker异常: " + e.getMessage());
            throw e;
        } catch (MQClientException e) {
            System.err.println("客户端异常: " + e.getMessage());
            throw e;
        } catch (RemotingException e) {
            System.err.println("网络异常: " + e.getMessage());
            throw e;
        }
    }

    // ② 使用本地消息表保证可靠性
    @Autowired
    private LocalMessageMapper localMessageMapper;

    @Transactional
    public void sendWithLocalMessageTable(Order order) throws Exception {
        // 1. 保存业务数据 + 本地消息表（同一个事务）
        orderMapper.insert(order);

        LocalMessage localMsg = new LocalMessage();
        localMsg.setMessageId(UUID.randomUUID().toString());
        localMsg.setTopic("OrderTopic");
        localMsg.setContent(JSON.toJSONString(order));
        localMsg.setStatus("PENDING");  // 待发送
        localMsg.setCreateTime(new Date());
        localMessageMapper.insert(localMsg);

        // 2. 发送消息到RocketMQ
        Message msg = new Message(
            localMsg.getTopic(),
            localMsg.getContent().getBytes()
        );
        msg.setKeys(localMsg.getMessageId());

        try {
            SendResult result = producer.send(msg);

            if (result.getSendStatus() == SendStatus.SEND_OK) {
                // 3. 发送成功，更新本地消息状态
                localMsg.setStatus("SUCCESS");
                localMsg.setMsgId(result.getMsgId());
                localMsg.setSendTime(new Date());
                localMessageMapper.updateById(localMsg);
            } else {
                // 发送未完全成功，保持PENDING状态，等待定时任务重试
                System.err.println("消息发送未完全成功，等待重试");
            }

        } catch (Exception e) {
            // 发送失败，保持PENDING状态
            System.err.println("消息发送失败: " + e.getMessage());
            // 不抛出异常，避免业务回滚
        }
    }

    // ③ 定时任务：扫描并重试未发送成功的消息
    @Scheduled(fixedDelay = 60000)  // 每分钟执行一次
    public void retryFailedMessages() {
        // 查询5分钟前还未发送成功的消息
        Date fiveMinutesAgo = new Date(System.currentTimeMillis() - 5 * 60 * 1000);
        List<LocalMessage> pendingMessages = localMessageMapper.selectPendingMessages(fiveMinutesAgo);

        for (LocalMessage localMsg : pendingMessages) {
            try {
                Message msg = new Message(
                    localMsg.getTopic(),
                    localMsg.getContent().getBytes()
                );
                msg.setKeys(localMsg.getMessageId());

                SendResult result = producer.send(msg);

                if (result.getSendStatus() == SendStatus.SEND_OK) {
                    // 发送成功，更新状态
                    localMsg.setStatus("SUCCESS");
                    localMsg.setMsgId(result.getMsgId());
                    localMsg.setSendTime(new Date());
                    localMessageMapper.updateById(localMsg);
                } else {
                    // 增加重试次数
                    localMsg.setRetryCount(localMsg.getRetryCount() + 1);

                    // 如果重试次数超过阈值，标记为失败并告警
                    if (localMsg.getRetryCount() >= 10) {
                        localMsg.setStatus("FAILED");
                        sendAlert(localMsg);  // 发送告警
                    }

                    localMessageMapper.updateById(localMsg);
                }

            } catch (Exception e) {
                System.err.println("重试发送失败: " + e.getMessage());
            }
        }
    }
}

// 本地消息表结构
@Table(name = "local_message")
public class LocalMessage {
    private String messageId;      // 消息唯一ID
    private String topic;          // Topic
    private String content;        // 消息内容
    private String status;         // PENDING/SUCCESS/FAILED
    private String msgId;          // RocketMQ返回的MsgId
    private Date createTime;       // 创建时间
    private Date sendTime;         // 发送成功时间
    private Integer retryCount;    // 重试次数
}
```

**关键要点**：

1. **同步发送是基础**：只有同步发送才能确保消息到达，异步和 Oneway 都无法保证
2. **重试需要合理配置**：重试次数过多影响性能，过少可能导致丢失
3. **务必检查发送结果**：SendStatus 不是 SEND_OK 需要特殊处理
4. **本地消息表最可靠**：结合数据库事务，确保业务和消息的一致性
5. **定时补偿机制**：扫描未发送成功的消息，进行重试或告警

**记忆口诀**：
```
生产可靠四步走，
同步发送是基础，
重试机制做保障，
结果确认不能少，
本地消息做补偿。
```

31. Broker 端如何保证消息不丢失？

**核心答案**：
Broker 端通过两个核心机制保证消息不丢失：
1. **同步刷盘（Sync Flush）**：消息写入磁盘后才返回成功
2. **主从同步复制（Sync Replication）**：消息复制到从节点后才返回成功

双重保障：同步刷盘防止机器断电，主从复制防止磁盘损坏。

**详细说明**：

Broker 端的消息可靠性主要依赖存储机制：

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="530" fill="#F8F9FA" stroke="#DEE2E6" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" fill="#212529" font-size="18" font-weight="bold">Broker 端消息不丢失保障机制</text>
<rect x="100" y="120" width="280" height="200" fill="#E3F2FD" stroke="#1976D2" stroke-width="2" rx="5"/>
<text x="240" y="145" text-anchor="middle" fill="#0D47A1" font-size="15" font-weight="bold">① 同步刷盘机制</text>
<rect x="120" y="165" width="240" height="40" fill="white" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="240" y="190" text-anchor="middle" fill="#333" font-size="12">消息写入PageCache</text>
<path d="M 240 205 L 240 220" stroke="#1976D2" stroke-width="2" fill="none" marker-end="url(#arrowhead3)"/>
<rect x="120" y="220" width="240" height="40" fill="white" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="240" y="245" text-anchor="middle" fill="#333" font-size="12">调用fsync刷盘到磁盘</text>
<path d="M 240 260 L 240 275" stroke="#1976D2" stroke-width="2" fill="none" marker-end="url(#arrowhead3)"/>
<rect x="120" y="275" width="240" height="35" fill="#4CAF50" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="240" y="297" text-anchor="middle" fill="white" font-size="12" font-weight="bold">返回ACK给Producer</text>
<rect x="420" y="120" width="280" height="200" fill="#FFF3E0" stroke="#F57C00" stroke-width="2" rx="5"/>
<text x="560" y="145" text-anchor="middle" fill="#E65100" font-size="15" font-weight="bold">② 主从同步复制机制</text>
<rect x="440" y="165" width="240" height="40" fill="white" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="560" y="190" text-anchor="middle" fill="#333" font-size="12">Master写入CommitLog</text>
<path d="M 560 205 L 560 220" stroke="#F57C00" stroke-width="2" fill="none" marker-end="url(#arrowhead4)"/>
<rect x="440" y="220" width="240" height="40" fill="white" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="560" y="245" text-anchor="middle" fill="#333" font-size="12">同步复制到Slave节点</text>
<path d="M 560 260 L 560 275" stroke="#F57C00" stroke-width="2" fill="none" marker-end="url(#arrowhead4)"/>
<rect x="440" y="275" width="240" height="35" fill="#4CAF50" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="560" y="297" text-anchor="middle" fill="white" font-size="12" font-weight="bold">返回ACK给Producer</text>
<rect x="100" y="350" width="600" height="210" fill="#E8F5E9" stroke="#388E3C" stroke-width="2" rx="5"/>
<text x="400" y="375" text-anchor="middle" fill="#1B5E20" font-size="15" font-weight="bold">完整的存储流程（同步刷盘 + 主从复制）</text>
<rect x="120" y="395" width="140" height="50" fill="white" stroke="#388E3C" stroke-width="1" rx="3"/>
<text x="190" y="415" text-anchor="middle" fill="#333" font-size="11">Producer</text>
<text x="190" y="430" text-anchor="middle" fill="#333" font-size="11">发送消息</text>
<path d="M 260 420 L 295 420" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead3)"/>
<rect x="295" y="395" width="140" height="50" fill="#BBDEFB" stroke="#388E3C" stroke-width="1" rx="3"/>
<text x="365" y="410" text-anchor="middle" fill="#333" font-size="11">Master Broker</text>
<text x="365" y="425" text-anchor="middle" fill="#333" font-size="10">写入+同步刷盘</text>
<path d="M 365 445 L 365 475" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead3)"/>
<rect x="295" y="475" width="140" height="50" fill="#FFE082" stroke="#388E3C" stroke-width="1" rx="3"/>
<text x="365" y="495" text-anchor="middle" fill="#333" font-size="11">Slave Broker</text>
<text x="365" y="510" text-anchor="middle" fill="#333" font-size="10">同步复制</text>
<path d="M 435 500 L 540 500" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead3)"/>
<path d="M 540 420 L 475 420" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead3)"/>
<rect x="540" y="395" width="140" height="50" fill="#C8E6C9" stroke="#388E3C" stroke-width="1" rx="3"/>
<text x="610" y="415" text-anchor="middle" fill="#333" font-size="11">返回成功</text>
<text x="610" y="430" text-anchor="middle" fill="#333" font-size="10">双重确认</text>
<text x="365" y="555" text-anchor="middle" fill="#666" font-size="10" font-style="italic">只有刷盘成功 AND 复制成功，才返回SEND_OK</text>
<defs>
<marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
<marker id="arrowhead4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#F57C00"/>
</marker>
</defs>
</svg>

**两种机制对比**：

| 特性 | 同步刷盘 | 异步刷盘 | 同步复制 | 异步复制 |
|------|---------|---------|---------|---------|
| **可靠性** | 高（防断电） | 低 | 高（防磁盘损坏） | 低 |
| **性能** | 低（等待IO） | 高 | 低（网络延迟） | 高 |
| **数据丢失风险** | 无 | 断电丢失 | 无 | 主节点故障丢失 |
| **适用场景** | 金融、支付 | 日志、监控 | 核心业务 | 一般业务 |

**配置方式**：

```properties
# ====== broker.conf 配置文件 ======

# 1. 刷盘策略配置
# SYNC_FLUSH：同步刷盘（可靠性高，性能低）
# ASYNC_FLUSH：异步刷盘（性能高，可靠性低）
flushDiskType=SYNC_FLUSH

# 2. 主从复制策略配置
# SYNC_MASTER：同步主节点（Master等待Slave确认）
# ASYNC_MASTER：异步主节点（Master不等待Slave）
# SLAVE：从节点
brokerRole=SYNC_MASTER

# 3. Broker集群名称
brokerClusterName=DefaultCluster

# 4. Broker名称（主从使用相同名称）
brokerName=broker-a

# 5. BrokerId（0表示Master，>0表示Slave）
brokerId=0

# 6. 存储路径
storePathRootDir=/data/rocketmq/store
storePathCommitLog=/data/rocketmq/store/commitlog

# 7. 同步刷盘超时时间（毫秒）
syncFlushTimeout=5000

# 8. 主从同步超时时间（毫秒）
slaveReadEnable=false
```

**代码示例**：

```java
// ====== 启动Master Broker（同步刷盘 + 同步复制）======
public class MasterBrokerStarter {
    public static void main(String[] args) throws Exception {
        BrokerConfig brokerConfig = new BrokerConfig();
        brokerConfig.setBrokerClusterName("DefaultCluster");
        brokerConfig.setBrokerName("broker-a");
        brokerConfig.setBrokerId(0);  // Master

        // 消息存储配置
        MessageStoreConfig storeConfig = new MessageStoreConfig();
        storeConfig.setStorePathRootDir("/data/rocketmq/store");
        storeConfig.setStorePathCommitLog("/data/rocketmq/store/commitlog");

        // ① 配置同步刷盘
        storeConfig.setFlushDiskType(FlushDiskType.SYNC_FLUSH);
        storeConfig.setSyncFlushTimeout(5000);  // 5秒超时

        // ② 配置同步复制
        brokerConfig.setBrokerRole(BrokerRole.SYNC_MASTER);

        // 其他配置
        NettyServerConfig nettyServerConfig = new NettyServerConfig();
        nettyServerConfig.setListenPort(10911);

        NettyClientConfig nettyClientConfig = new NettyClientConfig();

        // 启动Broker
        BrokerController brokerController = new BrokerController(
            brokerConfig,
            nettyServerConfig,
            nettyClientConfig,
            storeConfig
        );

        brokerController.initialize();
        brokerController.start();

        System.out.println("Master Broker启动成功（同步刷盘 + 同步复制）");
    }
}

// ====== 启动Slave Broker（从节点）======
public class SlaveBrokerStarter {
    public static void main(String[] args) throws Exception {
        BrokerConfig brokerConfig = new BrokerConfig();
        brokerConfig.setBrokerClusterName("DefaultCluster");
        brokerConfig.setBrokerName("broker-a");  // 与Master相同
        brokerConfig.setBrokerId(1);  // Slave（>0）

        MessageStoreConfig storeConfig = new MessageStoreConfig();
        storeConfig.setStorePathRootDir("/data/rocketmq/store-slave");

        // Slave也可以配置同步刷盘
        storeConfig.setFlushDiskType(FlushDiskType.SYNC_FLUSH);

        // Slave角色
        brokerConfig.setBrokerRole(BrokerRole.SLAVE);

        NettyServerConfig nettyServerConfig = new NettyServerConfig();
        nettyServerConfig.setListenPort(10921);  // 不同端口

        NettyClientConfig nettyClientConfig = new NettyClientConfig();

        BrokerController brokerController = new BrokerController(
            brokerConfig,
            nettyServerConfig,
            nettyClientConfig,
            storeConfig
        );

        brokerController.initialize();
        brokerController.start();

        System.out.println("Slave Broker启动成功");
    }
}

// ====== 验证消息是否成功持久化 ======
public class MessagePersistenceVerifier {

    public void verifyMessagePersistence() throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("test_producer");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        Message msg = new Message("TestTopic", "测试消息".getBytes());

        try {
            SendResult result = producer.send(msg);

            // 检查发送结果
            switch (result.getSendStatus()) {
                case SEND_OK:
                    // 消息已成功刷盘并同步到Slave
                    System.out.println("✓ 消息已安全持久化");
                    break;

                case FLUSH_DISK_TIMEOUT:
                    // 刷盘超时，消息可能丢失（断电风险）
                    System.err.println("✗ 刷盘超时，存在丢失风险");
                    break;

                case FLUSH_SLAVE_TIMEOUT:
                    // 主从同步超时，消息已刷盘但未复制到Slave
                    System.err.println("⚠ 同步超时，主节点故障可能丢失");
                    break;

                case SLAVE_NOT_AVAILABLE:
                    // Slave不可用，消息只在Master
                    System.err.println("⚠ Slave不可用，单点风险");
                    break;
            }

        } catch (Exception e) {
            System.err.println("发送失败: " + e.getMessage());
            throw e;
        }
    }
}
```

**关键要点**：

1. **双重保障最可靠**：同步刷盘 + 主从同步复制，两个机制同时启用才能真正防止消息丢失
2. **性能与可靠性权衡**：同步机制可靠但性能差，根据业务重要性选择合适的策略
3. **配置要匹配**：Master 和 Slave 的 brokerName 必须相同，brokerId 必须不同
4. **监控SendStatus**：Producer 需要检查 SendStatus，只有 SEND_OK 才表示消息安全
5. **超时参数调优**：syncFlushTimeout 和主从同步超时时间需要根据硬件性能调整

**不同场景的配置建议**：

| 业务场景 | 刷盘策略 | 复制策略 | 说明 |
|---------|---------|---------|------|
| 金融支付 | SYNC_FLUSH | SYNC_MASTER | 最高可靠性，性能较低 |
| 订单系统 | SYNC_FLUSH | ASYNC_MASTER | 防断电，容忍主节点故障 |
| 日志采集 | ASYNC_FLUSH | ASYNC_MASTER | 性能优先，容忍少量丢失 |
| 实时通知 | ASYNC_FLUSH | SYNC_MASTER | 防主节点故障，容忍断电 |

**记忆口诀**：
```
Broker可靠两把锁，
同步刷盘防断电，
主从复制防损坏，
双重保障最牢靠。
```

32. Consumer 端如何保证消息不丢失？

**核心答案**：
Consumer 端保证消息不丢失的关键措施：
1. **消息消费成功后再提交 offset**：先处理业务，成功后返回 CONSUME_SUCCESS
2. **幂等性保障**：防止重复消费导致业务异常
3. **异常处理与重试**：消费失败返回 RECONSUME_LATER，触发重试
4. **死信队列监控**：监控重试多次失败的消息

**详细说明**：

Consumer 端的可靠性主要体现在正确的消费确认机制：

<svg viewBox="0 0 800 580" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="510" fill="#F8F9FA" stroke="#DEE2E6" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" fill="#212529" font-size="18" font-weight="bold">Consumer 端消息不丢失保障流程</text>
<rect x="325" y="120" width="150" height="50" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="400" y="140" text-anchor="middle" fill="white" font-size="13" font-weight="bold">接收消息</text>
<text x="400" y="158" text-anchor="middle" fill="white" font-size="11">从Broker拉取</text>
<path d="M 400 170 L 400 195" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead5)"/>
<rect x="325" y="195" width="150" height="50" fill="#FFB74D" stroke="#F57C00" stroke-width="2" rx="5"/>
<text x="400" y="215" text-anchor="middle" fill="white" font-size="13" font-weight="bold">① 幂等性检查</text>
<text x="400" y="233" text-anchor="middle" fill="white" font-size="11">已消费?跳过</text>
<path d="M 400 245 L 400 270" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead5)"/>
<rect x="325" y="270" width="150" height="50" fill="#66BB6A" stroke="#388E3C" stroke-width="2" rx="5"/>
<text x="400" y="290" text-anchor="middle" fill="white" font-size="13" font-weight="bold">② 执行业务逻辑</text>
<text x="400" y="308" text-anchor="middle" fill="white" font-size="11">处理消息</text>
<path d="M 400 320 L 400 345" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead5)"/>
<path d="M 475 295 L 550 295" stroke="#E53935" stroke-width="2" fill="none" marker-end="url(#arrowhead6)"/>
<text x="512" y="288" text-anchor="middle" fill="#E53935" font-size="10">失败</text>
<rect x="550" y="270" width="180" height="50" fill="#EF5350" stroke="#C62828" stroke-width="2" rx="5"/>
<text x="640" y="290" text-anchor="middle" fill="white" font-size="12" font-weight="bold">返回RECONSUME_LATER</text>
<text x="640" y="308" text-anchor="middle" fill="white" font-size="10">触发重试机制</text>
<rect x="100" y="345" width="180" height="50" fill="#42A5F5" stroke="#1976D2" stroke-width="2" rx="5"/>
<text x="190" y="365" text-anchor="middle" fill="white" font-size="12" font-weight="bold">③ 标记已处理</text>
<text x="190" y="383" text-anchor="middle" fill="white" font-size="10">Redis/DB记录</text>
<rect x="310" y="345" width="180" height="50" fill="#66BB6A" stroke="#2E7D32" stroke-width="2" rx="5"/>
<text x="400" y="365" text-anchor="middle" fill="white" font-size="12" font-weight="bold">④ 返回CONSUME_SUCCESS</text>
<text x="400" y="383" text-anchor="middle" fill="white" font-size="10">自动提交offset</text>
<rect x="520" y="345" width="180" height="50" fill="#9CCC65" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="610" y="365" text-anchor="middle" fill="white" font-size="12" font-weight="bold">⑤ Offset提交成功</text>
<text x="610" y="383" text-anchor="middle" fill="white" font-size="10">消息不会重复消费</text>
<path d="M 280 370 L 310 370" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead5)"/>
<path d="M 490 370 L 520 370" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead5)"/>
<rect x="100" y="430" width="600" height="110" fill="#FFF3E0" stroke="#F57C00" stroke-width="2" rx="5"/>
<text x="400" y="455" text-anchor="middle" fill="#E65100" font-size="14" font-weight="bold">⚠️ 错误的消费方式（会导致消息丢失）</text>
<text x="120" y="480" fill="#333" font-size="11">❌ 先提交offset，后处理业务 → 处理失败时消息已丢失</text>
<text x="120" y="500" fill="#333" font-size="11">❌ 不做幂等性检查 → 重复消费导致业务异常</text>
<text x="120" y="520" fill="#333" font-size="11">❌ 捕获异常后直接返回SUCCESS → 消费失败但offset已提交</text>
<defs>
<marker id="arrowhead5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
<marker id="arrowhead6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#E53935"/>
</marker>
</defs>
</svg>

**正确的消费流程**：

| 步骤 | 操作 | 目的 |
|------|-----|------|
| ① 幂等性检查 | 检查消息是否已处理 | 防止重复消费 |
| ② 执行业务逻辑 | 处理消息内容 | 完成业务操作 |
| ③ 标记已处理 | Redis/DB记录消息ID | 幂等性依据 |
| ④ 返回SUCCESS | 告知RocketMQ消费成功 | 触发offset提交 |
| ⑤ Offset提交 | 自动提交消费位点 | 下次不再消费该消息 |

**代码示例**：

```java
public class ConsumerReliability {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private OrderService orderService;

    // ① 正确的消费方式
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("consumer_group");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        // 配置消费参数
        consumer.setConsumeMessageBatchMaxSize(1);          // 每次消费1条
        consumer.setConsumeTimeout(15);                     // 消费超时时间15分钟
        consumer.setMaxReconsumeTimes(16);                  // 最大重试次数

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                    List<MessageExt> msgs, ConsumeConcurrentlyContext context) {

                for (MessageExt msg : msgs) {
                    String msgId = msg.getMsgId();
                    String messageKey = msg.getKeys();  // 业务唯一Key

                    try {
                        // ① 幂等性检查（使用Redis）
                        String consumedKey = "msg:consumed:" + messageKey;
                        Boolean isConsumed = redisTemplate.opsForValue()
                            .setIfAbsent(consumedKey, "1", 7, TimeUnit.DAYS);

                        if (Boolean.FALSE.equals(isConsumed)) {
                            // 消息已经被消费过，直接返回成功
                            System.out.println("消息已消费，跳过: " + messageKey);
                            continue;
                        }

                        // ② 执行业务逻辑
                        String body = new String(msg.getBody());
                        Order order = JSON.parseObject(body, Order.class);

                        boolean success = orderService.processOrder(order);

                        if (!success) {
                            // ③ 业务处理失败，删除Redis标记，返回RECONSUME_LATER
                            redisTemplate.delete(consumedKey);
                            System.err.println("业务处理失败，消息将重试: " + messageKey);
                            return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                        }

                        // ④ 业务处理成功，Redis中已有标记，返回SUCCESS
                        System.out.println("消息消费成功: " + messageKey);

                    } catch (Exception e) {
                        // ⑤ 异常处理：返回RECONSUME_LATER触发重试
                        System.err.println("消息消费异常: " + e.getMessage());

                        // 检查重试次数
                        int reconsumeTimes = msg.getReconsumeTimes();
                        if (reconsumeTimes >= 15) {
                            // 重试次数过多，记录到数据库，返回SUCCESS避免进入死信队列
                            saveFailedMessage(msg, e);
                            System.err.println("重试次数过多，记录失败消息: " + messageKey);
                            return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                        }

                        // 触发重试
                        return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                    }
                }

                // ⑥ 所有消息消费成功，RocketMQ会自动提交offset
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("Consumer启动成功");
    }

    // ② 使用数据库做幂等性控制（更可靠）
    @Transactional
    public ConsumeConcurrentlyStatus consumeWithDatabase(MessageExt msg) {
        String messageKey = msg.getKeys();

        try {
            // 查询消息是否已处理
            ConsumeRecord record = consumeRecordMapper.selectByMessageKey(messageKey);

            if (record != null && "SUCCESS".equals(record.getStatus())) {
                // 消息已处理，幂等返回
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }

            // 创建消费记录（状态为PROCESSING）
            if (record == null) {
                record = new ConsumeRecord();
                record.setMessageKey(messageKey);
                record.setMessageBody(new String(msg.getBody()));
                record.setStatus("PROCESSING");
                record.setCreateTime(new Date());
                consumeRecordMapper.insert(record);
            }

            // 执行业务逻辑
            String body = new String(msg.getBody());
            Order order = JSON.parseObject(body, Order.class);
            boolean success = orderService.processOrder(order);

            if (success) {
                // 更新消费记录状态为SUCCESS
                record.setStatus("SUCCESS");
                record.setUpdateTime(new Date());
                consumeRecordMapper.updateById(record);

                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            } else {
                // 业务失败，返回RECONSUME_LATER
                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
            }

        } catch (Exception e) {
            System.err.println("消费异常: " + e.getMessage());
            return ConsumeConcurrentlyStatus.RECONSUME_LATER;
        }
    }

    // ③ 监控死信队列
    public void monitorDeadLetterQueue() throws Exception {
        DefaultMQPushConsumer dlqConsumer = new DefaultMQPushConsumer("dlq_consumer");
        dlqConsumer.setNamesrvAddr("localhost:9876");

        // 订阅死信Topic：%DLQ% + 原ConsumerGroup名称
        dlqConsumer.subscribe("%DLQ%consumer_group", "*");

        dlqConsumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                    List<MessageExt> msgs, ConsumeConcurrentlyContext context) {

                for (MessageExt msg : msgs) {
                    // 记录死信消息
                    System.err.println("发现死信消息:");
                    System.err.println("  MsgId: " + msg.getMsgId());
                    System.err.println("  Key: " + msg.getKeys());
                    System.err.println("  Body: " + new String(msg.getBody()));
                    System.err.println("  重试次数: " + msg.getReconsumeTimes());

                    // 保存到数据库
                    saveDeadLetterMessage(msg);

                    // 发送告警
                    sendAlert("死信消息告警", msg);
                }

                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        dlqConsumer.start();
    }
}

// 消费记录表
@Table(name = "consume_record")
public class ConsumeRecord {
    private Long id;
    private String messageKey;      // 消息唯一Key
    private String messageBody;     // 消息内容
    private String status;          // PROCESSING/SUCCESS/FAILED
    private Date createTime;        // 创建时间
    private Date updateTime;        // 更新时间
}
```

**关键要点**：

1. **先消费后提交**：一定要业务处理成功后再返回 SUCCESS，否则消息丢失无法恢复
2. **幂等性是必须的**：RocketMQ 只保证 At Least Once，不保证 Exactly Once
3. **正确处理异常**：捕获异常后应返回 RECONSUME_LATER，而不是 SUCCESS
4. **合理设置重试次数**：避免无限重试，超过阈值后记录并告警
5. **监控死信队列**：定期检查死信队列，人工介入处理

**常见错误及避免方法**：

| 错误操作 | 后果 | 正确做法 |
|---------|-----|---------|
| 先提交offset再处理 | 处理失败时消息丢失 | 处理成功后自动提交 |
| 捕获异常返回SUCCESS | 消费失败但offset已提交 | 返回RECONSUME_LATER |
| 不做幂等性检查 | 重复消费导致业务异常 | Redis或DB记录消息ID |
| 无限重试 | 阻塞队列消费 | 设置最大重试次数 |

**记忆口诀**：
```
消费可靠五要素，
幂等检查第一位，
业务处理要成功，
成功再返SUCCESS，
异常务必要重试，
死信监控不能少。
```

33. 什么是消息刷盘机制？同步刷盘和异步刷盘的区别是什么？

**核心答案**：
**刷盘机制**是指 RocketMQ 将消息从内存持久化到磁盘的过程。

**两种刷盘方式**：
- **同步刷盘（SYNC_FLUSH）**：消息写入磁盘后才返回成功，可靠性高但性能低
- **异步刷盘（ASYNC_FLUSH）**：消息写入内存PageCache后就返回成功，性能高但可能丢失

**详细说明**：

消息刷盘是 Broker 端保证消息可靠性的第一道防线：

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="800" height="580" fill="#F8F9FA" stroke="#DEE2E6" stroke-width="2" rx="5"/>
<text x="450" y="85" text-anchor="middle" fill="#212529" font-size="18" font-weight="bold">同步刷盘 vs 异步刷盘</text>
<rect x="100" y="120" width="320" height="450" fill="#E3F2FD" stroke="#1976D2" stroke-width="2" rx="5"/>
<text x="260" y="150" text-anchor="middle" fill="#0D47A1" font-size="16" font-weight="bold">同步刷盘（SYNC_FLUSH）</text>
<rect x="130" y="175" width="260" height="50" fill="white" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="260" y="195" text-anchor="middle" fill="#333" font-size="12">① 消息到达Broker</text>
<text x="260" y="212" text-anchor="middle" fill="#666" font-size="10">Producer发送消息</text>
<path d="M 260 225 L 260 245" stroke="#1976D2" stroke-width="2" fill="none" marker-end="url(#arrowhead7)"/>
<rect x="130" y="245" width="260" height="50" fill="white" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="260" y="265" text-anchor="middle" fill="#333" font-size="12">② 写入PageCache</text>
<text x="260" y="282" text-anchor="middle" fill="#666" font-size="10">内存缓冲区</text>
<path d="M 260 295 L 260 315" stroke="#1976D2" stroke-width="2" fill="none" marker-end="url(#arrowhead7)"/>
<rect x="130" y="315" width="260" height="60" fill="#FFEB3B" stroke="#1976D2" stroke-width="2" rx="3"/>
<text x="260" y="335" text-anchor="middle" fill="#333" font-size="12" font-weight="bold">③ 调用fsync刷盘</text>
<text x="260" y="352" text-anchor="middle" fill="#666" font-size="10">阻塞等待磁盘IO完成</text>
<text x="260" y="367" text-anchor="middle" fill="#E65100" font-size="9" font-style="italic">⚠️ 性能瓶颈</text>
<path d="M 260 375 L 260 395" stroke="#1976D2" stroke-width="2" fill="none" marker-end="url(#arrowhead7)"/>
<rect x="130" y="395" width="260" height="50" fill="white" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="260" y="415" text-anchor="middle" fill="#333" font-size="12">④ 磁盘写入成功</text>
<text x="260" y="432" text-anchor="middle" fill="#666" font-size="10">数据持久化到磁盘</text>
<path d="M 260 445 L 260 465" stroke="#1976D2" stroke-width="2" fill="none" marker-end="url(#arrowhead7)"/>
<rect x="130" y="465" width="260" height="50" fill="#4CAF50" stroke="#1976D2" stroke-width="2" rx="3"/>
<text x="260" y="485" text-anchor="middle" fill="white" font-size="12" font-weight="bold">⑤ 返回SEND_OK</text>
<text x="260" y="502" text-anchor="middle" fill="white" font-size="10">告知Producer成功</text>
<text x="260" y="545" text-anchor="middle" fill="#0D47A1" font-size="11" font-weight="bold">优点：可靠性极高，断电不丢</text>
<text x="260" y="562" text-anchor="middle" fill="#C62828" font-size="11" font-weight="bold">缺点：性能较低，吞吐量受限</text>
<rect x="480" y="120" width="320" height="450" fill="#FFF3E0" stroke="#F57C00" stroke-width="2" rx="5"/>
<text x="640" y="150" text-anchor="middle" fill="#E65100" font-size="16" font-weight="bold">异步刷盘（ASYNC_FLUSH）</text>
<rect x="510" y="175" width="260" height="50" fill="white" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="640" y="195" text-anchor="middle" fill="#333" font-size="12">① 消息到达Broker</text>
<text x="640" y="212" text-anchor="middle" fill="#666" font-size="10">Producer发送消息</text>
<path d="M 640 225 L 640 245" stroke="#F57C00" stroke-width="2" fill="none" marker-end="url(#arrowhead8)"/>
<rect x="510" y="245" width="260" height="60" fill="white" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="640" y="265" text-anchor="middle" fill="#333" font-size="12">② 写入PageCache</text>
<text x="640" y="282" text-anchor="middle" fill="#666" font-size="10">内存缓冲区</text>
<path d="M 640 305 L 640 325" stroke="#F57C00" stroke-width="2" fill="none" marker-end="url(#arrowhead8)"/>
<rect x="510" y="325" width="260" height="50" fill="#4CAF50" stroke="#F57C00" stroke-width="2" rx="3"/>
<text x="640" y="345" text-anchor="middle" fill="white" font-size="12" font-weight="bold">③ 立即返回SEND_OK</text>
<text x="640" y="362" text-anchor="middle" fill="white" font-size="10">不等待磁盘IO</text>
<path d="M 640 375 L 640 395" stroke="#F57C00" stroke-width="2" stroke-dasharray="5,5" fill="none" marker-end="url(#arrowhead8)"/>
<text x="760" y="387" text-anchor="middle" fill="#F57C00" font-size="10">后台线程</text>
<rect x="510" y="395" width="260" height="60" fill="#FFF9C4" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="640" y="415" text-anchor="middle" fill="#333" font-size="12">④ 后台刷盘</text>
<text x="640" y="432" text-anchor="middle" fill="#666" font-size="10">定时(默认500ms)或</text>
<text x="640" y="447" text-anchor="middle" fill="#666" font-size="10">缓冲区满时刷盘</text>
<rect x="510" y="470" width="260" height="50" fill="white" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="640" y="490" text-anchor="middle" fill="#333" font-size="12">⑤ 磁盘写入完成</text>
<text x="640" y="507" text-anchor="middle" fill="#666" font-size="10">异步持久化</text>
<text x="640" y="545" text-anchor="middle" fill="#2E7D32" font-size="11" font-weight="bold">优点：性能高，吞吐量大</text>
<text x="640" y="562" text-anchor="middle" fill="#C62828" font-size="11" font-weight="bold">缺点：断电可能丢失未刷盘消息</text>
<defs>
<marker id="arrowhead7" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976D2"/>
</marker>
<marker id="arrowhead8" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#F57C00"/>
</marker>
</defs>
</svg>

**详细对比**：

| 特性 | 同步刷盘 | 异步刷盘 |
|------|---------|---------|
| **配置参数** | `flushDiskType=SYNC_FLUSH` | `flushDiskType=ASYNC_FLUSH`（默认） |
| **返回时机** | 磁盘写入完成后 | 写入PageCache后 |
| **IO方式** | 阻塞IO，等待fsync完成 | 非阻塞，后台线程刷盘 |
| **性能（TPS）** | 约1000-5000 TPS | 约10000-50000 TPS |
| **可靠性** | 极高，断电不丢 | 较低，断电丢失未刷盘数据 |
| **适用场景** | 金融支付、订单系统 | 日志采集、监控数据 |
| **磁盘压力** | 每条消息都有磁盘IO | 批量刷盘，压力较小 |
| **超时配置** | `syncFlushTimeout=5000` | `flushIntervalCommitLog=500` |

**刷盘相关配置**：

```properties
# ====== broker.conf 配置 ======

# 1. 刷盘类型
# SYNC_FLUSH：同步刷盘
# ASYNC_FLUSH：异步刷盘（默认）
flushDiskType=SYNC_FLUSH

# 2. 同步刷盘超时时间（毫秒）
# 超时后返回FLUSH_DISK_TIMEOUT状态
syncFlushTimeout=5000

# 3. 异步刷盘间隔时间（毫秒）
# 默认500ms刷一次
flushIntervalCommitLog=500

# 4. 异步刷盘最少脏页数
# PageCache中未刷盘的页数达到阈值时触发刷盘
flushCommitLogLeastPages=4

# 5. 强制刷盘间隔（毫秒）
# 无论脏页数量，定时强制刷盘
flushCommitLogThoroughInterval=10000
```

**代码示例**：

```java
// ====== 同步刷盘性能测试 ======
public class SyncFlushPerformanceTest {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("perf_test_producer");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        int messageCount = 1000;
        long startTime = System.currentTimeMillis();

        for (int i = 0; i < messageCount; i++) {
            Message msg = new Message(
                "PerfTestTopic",
                ("测试消息" + i).getBytes()
            );

            SendResult result = producer.send(msg);

            // 检查刷盘结果
            if (result.getSendStatus() == SendStatus.FLUSH_DISK_TIMEOUT) {
                System.err.println("刷盘超时: " + i);
            }
        }

        long endTime = System.currentTimeMillis();
        long totalTime = endTime - startTime;

        System.out.println("发送消息数: " + messageCount);
        System.out.println("总耗时: " + totalTime + "ms");
        System.out.println("TPS: " + (messageCount * 1000 / totalTime));
        System.out.println("平均延迟: " + (totalTime / messageCount) + "ms");

        producer.shutdown();
    }
}

// ====== 异步刷盘实现原理（源码简化版）======
public class AsyncFlushService {
    // PageCache缓冲区
    private MappedByteBuffer writeBuffer;

    // 后台刷盘线程
    private Thread flushThread;

    // 是否停止
    private volatile boolean stopped = false;

    public void start() {
        flushThread = new Thread(new FlushTask());
        flushThread.start();
    }

    // 后台刷盘任务
    class FlushTask implements Runnable {
        @Override
        public void run() {
            while (!stopped) {
                try {
                    // 1. 等待一定时间
                    Thread.sleep(500);  // flushIntervalCommitLog

                    // 2. 检查脏页数量
                    int dirtyPages = getDirtyPagesCount();
                    if (dirtyPages < 4) {  // flushCommitLogLeastPages
                        continue;
                    }

                    // 3. 执行刷盘
                    long startTime = System.currentTimeMillis();
                    writeBuffer.force();  // 调用系统fsync
                    long flushTime = System.currentTimeMillis() - startTime;

                    System.out.println("异步刷盘完成，耗时: " + flushTime + "ms");

                } catch (Exception e) {
                    System.err.println("刷盘异常: " + e.getMessage());
                }
            }
        }
    }
}

// ====== 刷盘状态监控 ======
public class FlushMonitor {
    public void monitorFlushStatus() throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("monitor_producer");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        Message msg = new Message("TestTopic", "测试消息".getBytes());
        SendResult result = producer.send(msg);

        // 监控刷盘状态
        switch (result.getSendStatus()) {
            case SEND_OK:
                System.out.println("✓ 消息已刷盘成功");
                break;

            case FLUSH_DISK_TIMEOUT:
                System.err.println("✗ 同步刷盘超时");
                System.err.println("  可能原因:");
                System.err.println("  1. 磁盘IO性能差");
                System.err.println("  2. syncFlushTimeout设置过小");
                System.err.println("  3. 磁盘写满或损坏");
                break;

            case FLUSH_SLAVE_TIMEOUT:
                System.err.println("⚠ 主从同步超时（刷盘成功）");
                break;

            case SLAVE_NOT_AVAILABLE:
                System.err.println("⚠ Slave不可用（刷盘成功）");
                break;
        }
    }
}
```

**关键要点**：

1. **PageCache 是关键**：消息先写入 PageCache（内存），刷盘是将 PageCache 内容写入磁盘
2. **fsync 系统调用**：Linux 系统调用，强制将数据从 PageCache 刷到磁盘
3. **同步刷盘性能瓶颈**：每条消息都要等待磁盘IO，受磁盘IOPS限制
4. **异步刷盘批量操作**：攒一批数据一起刷，大大提高吞吐量
5. **断电丢失窗口**：异步刷盘时，最多丢失最近 500ms（刷盘间隔）的消息

**性能优化建议**：

| 场景 | 建议 | 说明 |
|------|-----|------|
| **高可靠性要求** | 同步刷盘 + SSD | 使用SSD提升同步刷盘性能 |
| **高性能要求** | 异步刷盘 + RAID | 批量刷盘，RAID提高可靠性 |
| **折中方案** | 同步刷盘 + 主从异步复制 | 防断电，容忍主节点故障 |

**记忆口诀**：
```
刷盘机制两模式，
同步等待磁盘写，
异步先返后台刷，
可靠选同步，
性能选异步，
按需来取舍。
```

34. 什么是主从同步？同步复制和异步复制的区别是什么？

**核心答案**：
**主从同步**是指 Master Broker 将消息复制到 Slave Broker 的过程，用于数据备份和高可用。

**两种复制方式**：
- **同步复制（SYNC_MASTER）**：Master 等待 Slave 复制成功后才返回，可靠性高但性能低
- **异步复制（ASYNC_MASTER）**：Master 不等待 Slave，立即返回，性能高但 Master 故障时可能丢失

**详细说明**：

主从复制是 Broker 端保证消息可靠性的第二道防线（防磁盘损坏）：

<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="800" height="630" fill="#F8F9FA" stroke="#DEE2E6" stroke-width="2" rx="5"/>
<text x="450" y="85" text-anchor="middle" fill="#212529" font-size="18" font-weight="bold">同步复制 vs 异步复制</text>
<rect x="100" y="120" width="320" height="500" fill="#E3F2FD" stroke="#1976D2" stroke-width="2" rx="5"/>
<text x="260" y="150" text-anchor="middle" fill="#0D47A1" font-size="16" font-weight="bold">同步复制（SYNC_MASTER）</text>
<rect x="130" y="175" width="260" height="50" fill="white" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="260" y="195" text-anchor="middle" fill="#333" font-size="12">① Producer发送消息</text>
<text x="260" y="212" text-anchor="middle" fill="#666" font-size="10">到Master Broker</text>
<path d="M 260 225 L 260 245" stroke="#1976D2" stroke-width="2" fill="none" marker-end="url(#arrowhead9)"/>
<rect x="130" y="245" width="260" height="50" fill="white" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="260" y="265" text-anchor="middle" fill="#333" font-size="12">② Master写入CommitLog</text>
<text x="260" y="282" text-anchor="middle" fill="#666" font-size="10">本地持久化</text>
<path d="M 260 295 L 260 315" stroke="#1976D2" stroke-width="2" fill="none" marker-end="url(#arrowhead9)"/>
<rect x="130" y="315" width="260" height="60" fill="#FFEB3B" stroke="#1976D2" stroke-width="2" rx="3"/>
<text x="260" y="335" text-anchor="middle" fill="#333" font-size="12" font-weight="bold">③ 同步复制到Slave</text>
<text x="260" y="352" text-anchor="middle" fill="#666" font-size="10">通过网络传输</text>
<text x="260" y="367" text-anchor="middle" fill="#E65100" font-size="9" font-style="italic">⚠️ 网络延迟</text>
<path d="M 260 375 L 260 395" stroke="#1976D2" stroke-width="2" fill="none" marker-end="url(#arrowhead9)"/>
<rect x="130" y="395" width="260" height="60" fill="white" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="260" y="415" text-anchor="middle" fill="#333" font-size="12">④ Slave写入CommitLog</text>
<text x="260" y="432" text-anchor="middle" fill="#666" font-size="10">Slave持久化</text>
<text x="260" y="447" text-anchor="middle" fill="#666" font-size="10">返回ACK给Master</text>
<path d="M 260 455 L 260 475" stroke="#1976D2" stroke-width="2" fill="none" marker-end="url(#arrowhead9)"/>
<rect x="130" y="475" width="260" height="50" fill="white" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="260" y="495" text-anchor="middle" fill="#333" font-size="12">⑤ Master收到确认</text>
<text x="260" y="512" text-anchor="middle" fill="#666" font-size="10">Slave复制成功</text>
<path d="M 260 525 L 260 545" stroke="#1976D2" stroke-width="2" fill="none" marker-end="url(#arrowhead9)"/>
<rect x="130" y="545" width="260" height="50" fill="#4CAF50" stroke="#1976D2" stroke-width="2" rx="3"/>
<text x="260" y="565" text-anchor="middle" fill="white" font-size="12" font-weight="bold">⑥ 返回SEND_OK</text>
<text x="260" y="582" text-anchor="middle" fill="white" font-size="10">告知Producer成功</text>
<text x="260" y="625" text-anchor="middle" fill="#0D47A1" font-size="11" font-weight="bold">优点：Master故障不丢数据</text>
<text x="260" y="645" text-anchor="middle" fill="#C62828" font-size="11" font-weight="bold">缺点：受网络延迟影响，RT增加</text>
<rect x="480" y="120" width="320" height="500" fill="#FFF3E0" stroke="#F57C00" stroke-width="2" rx="5"/>
<text x="640" y="150" text-anchor="middle" fill="#E65100" font-size="16" font-weight="bold">异步复制（ASYNC_MASTER）</text>
<rect x="510" y="175" width="260" height="50" fill="white" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="640" y="195" text-anchor="middle" fill="#333" font-size="12">① Producer发送消息</text>
<text x="640" y="212" text-anchor="middle" fill="#666" font-size="10">到Master Broker</text>
<path d="M 640 225 L 640 245" stroke="#F57C00" stroke-width="2" fill="none" marker-end="url(#arrowhead10)"/>
<rect x="510" y="245" width="260" height="60" fill="white" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="640" y="265" text-anchor="middle" fill="#333" font-size="12">② Master写入CommitLog</text>
<text x="640" y="282" text-anchor="middle" fill="#666" font-size="10">本地持久化</text>
<path d="M 640 305 L 640 325" stroke="#F57C00" stroke-width="2" fill="none" marker-end="url(#arrowhead10)"/>
<rect x="510" y="325" width="260" height="50" fill="#4CAF50" stroke="#F57C00" stroke-width="2" rx="3"/>
<text x="640" y="345" text-anchor="middle" fill="white" font-size="12" font-weight="bold">③ 立即返回SEND_OK</text>
<text x="640" y="362" text-anchor="middle" fill="white" font-size="10">不等待Slave</text>
<path d="M 640 375 L 640 395" stroke="#F57C00" stroke-width="2" stroke-dasharray="5,5" fill="none" marker-end="url(#arrowhead10)"/>
<text x="760" y="387" text-anchor="middle" fill="#F57C00" font-size="10">后台线程</text>
<rect x="510" y="395" width="260" height="70" fill="#FFF9C4" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="640" y="415" text-anchor="middle" fill="#333" font-size="12">④ 后台异步复制</text>
<text x="640" y="432" text-anchor="middle" fill="#666" font-size="10">HAService后台线程</text>
<text x="640" y="447" text-anchor="middle" fill="#666" font-size="10">将数据推送到Slave</text>
<text x="640" y="462" text-anchor="middle" fill="#E65100" font-size="9" font-style="italic">不阻塞Producer</text>
<rect x="510" y="480" width="260" height="50" fill="white" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="640" y="500" text-anchor="middle" fill="#333" font-size="12">⑤ Slave写入CommitLog</text>
<text x="640" y="517" text-anchor="middle" fill="#666" font-size="10">异步持久化</text>
<rect x="510" y="545" width="260" height="50" fill="white" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="640" y="565" text-anchor="middle" fill="#333" font-size="12">⑥ 复制完成</text>
<text x="640" y="582" text-anchor="middle" fill="#666" font-size="10">Producer已收到成功响应</text>
<text x="640" y="625" text-anchor="middle" fill="#2E7D32" font-size="11" font-weight="bold">优点：性能高，RT低</text>
<text x="640" y="645" text-anchor="middle" fill="#C62828" font-size="11" font-weight="bold">缺点：Master故障可能丢数据</text>
<defs>
<marker id="arrowhead9" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976D2"/>
</marker>
<marker id="arrowhead10" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#F57C00"/>
</marker>
</defs>
</svg>

**详细对比**：

| 特性 | 同步复制 | 异步复制 |
|------|---------|---------|
| **配置参数** | `brokerRole=SYNC_MASTER` | `brokerRole=ASYNC_MASTER`（默认） |
| **返回时机** | Slave 复制成功后 | Master 写入成功后 |
| **网络影响** | 受网络延迟影响大 | 不受网络延迟影响 |
| **RT（延迟）** | 增加 5-20ms | 基本无影响 |
| **可靠性** | 极高，Master 故障不丢 | 较低，Master 故障丢失未复制数据 |
| **适用场景** | 金融、核心业务 | 一般业务、日志系统 |
| **Master 负载** | 需等待 Slave 响应 | 无需等待，负载低 |
| **Slave 作用** | 数据备份 + 读负载均衡 | 数据备份 + 读负载均衡 |

**主从架构配置**：

```properties
# ====== Master Broker 配置（broker-a.conf）======
# 集群名称
brokerClusterName=DefaultCluster

# Broker 名称（主从必须相同）
brokerName=broker-a

# BrokerId（0 表示 Master）
brokerId=0

# 主从复制策略
# SYNC_MASTER：同步复制
# ASYNC_MASTER：异步复制（默认）
brokerRole=SYNC_MASTER

# NameServer地址
namesrvAddr=localhost:9876

# 存储路径
storePathRootDir=/data/rocketmq/store-master
storePathCommitLog=/data/rocketmq/store-master/commitlog

# 监听端口
listenPort=10911

# ====== Slave Broker 配置（broker-a-slave.conf）======
# 集群名称（与 Master 相同）
brokerClusterName=DefaultCluster

# Broker 名称（与 Master 相同）
brokerName=broker-a

# BrokerId（>0 表示 Slave）
brokerId=1

# 角色：SLAVE
brokerRole=SLAVE

# NameServer地址
namesrvAddr=localhost:9876

# 存储路径（与 Master 不同）
storePathRootDir=/data/rocketmq/store-slave
storePathCommitLog=/data/rocketmq/store-slave/commitlog

# 监听端口（与 Master 不同）
listenPort=10921

# 是否允许从 Slave 读取消息（默认 false）
slaveReadEnable=true
```

**代码示例**：

```java
// ====== 主从复制性能测试 ======
public class ReplicationPerformanceTest {

    public static void main(String[] args) throws Exception {
        // 测试同步复制
        testReplication("SYNC_MASTER", "localhost:9876");

        // 测试异步复制（需修改 broker 配置后重启）
        // testReplication("ASYNC_MASTER", "localhost:9876");
    }

    private static void testReplication(String mode, String namesrvAddr) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("replication_test");
        producer.setNamesrvAddr(namesrvAddr);
        producer.start();

        System.out.println("===== 测试 " + mode + " 模式 =====");

        int messageCount = 1000;
        long startTime = System.currentTimeMillis();

        int sendOk = 0;
        int slaveTimeout = 0;
        int slaveNotAvailable = 0;

        for (int i = 0; i < messageCount; i++) {
            Message msg = new Message(
                "ReplicationTestTopic",
                ("测试消息" + i).getBytes()
            );

            SendResult result = producer.send(msg);

            // 统计不同状态
            switch (result.getSendStatus()) {
                case SEND_OK:
                    sendOk++;
                    break;
                case FLUSH_SLAVE_TIMEOUT:
                    slaveTimeout++;
                    System.err.println("Slave 同步超时: " + i);
                    break;
                case SLAVE_NOT_AVAILABLE:
                    slaveNotAvailable++;
                    System.err.println("Slave 不可用: " + i);
                    break;
                default:
                    break;
            }
        }

        long endTime = System.currentTimeMillis();
        long totalTime = endTime - startTime;

        System.out.println("发送总数: " + messageCount);
        System.out.println("SEND_OK: " + sendOk);
        System.out.println("FLUSH_SLAVE_TIMEOUT: " + slaveTimeout);
        System.out.println("SLAVE_NOT_AVAILABLE: " + slaveNotAvailable);
        System.out.println("总耗时: " + totalTime + "ms");
        System.out.println("平均 RT: " + (totalTime / messageCount) + "ms");
        System.out.println("TPS: " + (messageCount * 1000 / totalTime));

        producer.shutdown();
    }
}

// ====== 主从复制实现原理（简化版）======
public class HAService {
    // Master 端：HA 连接接受器
    private HAConnection haConnection;

    // Slave 端：HA 客户端
    private HAClient haClient;

    // 同步复制模式
    class SyncMaster {
        public SendResult send(Message msg) throws Exception {
            // 1. Master 写入本地 CommitLog
            long offset = commitLog.putMessage(msg);

            // 2. 等待 Slave 复制确认
            if (brokerRole == BrokerRole.SYNC_MASTER) {
                // 创建同步请求
                GroupCommitRequest request = new GroupCommitRequest(offset);

                // 加入同步队列，等待 Slave 确认
                groupTransferService.putRequest(request);

                // 阻塞等待（最多 5 秒）
                boolean syncOk = request.waitForFlush(5000);

                if (!syncOk) {
                    // Slave 同步超时
                    return new SendResult(SendStatus.FLUSH_SLAVE_TIMEOUT);
                }
            }

            // 3. 返回成功
            return new SendResult(SendStatus.SEND_OK);
        }
    }

    // 异步复制模式
    class AsyncMaster {
        public SendResult send(Message msg) throws Exception {
            // 1. Master 写入本地 CommitLog
            commitLog.putMessage(msg);

            // 2. 立即返回成功（不等待 Slave）
            return new SendResult(SendStatus.SEND_OK);
        }

        // 后台线程：异步推送数据到 Slave
        class WriteSocketService extends Thread {
            @Override
            public void run() {
                while (!stopped) {
                    try {
                        // 读取 Master CommitLog 中的新数据
                        SelectMappedBufferResult result =
                            commitLog.getData(nextTransferFromWhere);

                        if (result != null) {
                            // 通过网络发送到 Slave
                            socketChannel.write(result.getByteBuffer());

                            nextTransferFromWhere += result.getSize();
                        }

                        // 等待下次推送
                        Thread.sleep(100);

                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    // Slave 端：接收 Master 数据
    class HAClient extends Thread {
        @Override
        public void run() {
            while (!stopped) {
                try {
                    // 1. 连接 Master
                    connectMaster();

                    // 2. 接收 Master 推送的数据
                    int readSize = socketChannel.read(byteBufferRead);

                    if (readSize > 0) {
                        // 3. 写入 Slave 的 CommitLog
                        commitLog.appendData(byteBufferRead);

                        // 4. 返回 ACK 给 Master
                        reportSlaveMaxOffset();
                    }

                } catch (Exception e) {
                    System.err.println("Slave 连接 Master 失败");
                    // 重连
                    Thread.sleep(5000);
                }
            }
        }
    }
}

// ====== 主从切换（DLedger 模式）======
public class DLedgerExample {
    // DLedger 是 RocketMQ 4.5 引入的 Raft 协议实现
    // 支持自动故障转移和主从切换

    // Master 配置（启用 DLedger）
    public static void configureDLedgerMaster() {
        // broker.conf
        // enableDLedger=true
        // dLedgerGroup=broker-a
        // dLedgerPeers=n0-127.0.0.1:40911;n1-127.0.0.1:40912;n2-127.0.0.1:40913
        // dLedgerSelfId=n0
    }

    // 优点：
    // 1. 自动选主，无需人工干预
    // 2. 数据强一致，Raft 协议保证
    // 3. 故障自动转移，可用性高
}
```

**关键要点**：

1. **主从必须同名**：Master 和 Slave 的 brokerName 必须相同，brokerId 不同（Master=0，Slave>0）
2. **网络是关键**：同步复制的性能受网络延迟影响，建议 Master-Slave 部署在同机房
3. **Slave 可读**：设置 `slaveReadEnable=true`，Consumer 可以从 Slave 读取消息，分担 Master 压力
4. **故障切换**：传统主从需要手动切换，DLedger 模式支持自动切换
5. **数据同步延迟**：异步复制时，Slave 数据会有延迟（通常几十到几百毫秒）

**主从复制 + 刷盘组合方案**：

| 组合方案 | 可靠性 | 性能 | 适用场景 |
|---------|-------|------|---------|
| 同步刷盘 + 同步复制 | 最高 | 最低 | 金融支付、核心订单 |
| 同步刷盘 + 异步复制 | 高 | 中 | 重要业务（容忍 Master 故障丢失） |
| 异步刷盘 + 同步复制 | 中高 | 中 | 重要业务（容忍断电丢失） |
| 异步刷盘 + 异步复制 | 低 | 最高 | 日志采集、监控数据 |

**记忆口诀**：
```
主从复制两模式，
同步等待Slave确认，
异步立即就返回，
防损坏靠复制，
防断电靠刷盘，
双管齐下最安全。
```

## 消息顺序性
### 36. 什么是全局顺序消息和分区顺序消息？

**核心答案**

**全局顺序消息**：整个 Topic 内所有消息严格按照 FIFO 顺序发送和消费，需要单 MessageQueue。

**分区顺序消息**：将消息按业务标识（如订单 ID）分组，保证同一组消息在同一个 MessageQueue 中顺序消费，不同组并行处理。

**详细说明**

#### 全局顺序消息
- **特点**：所有消息全局有序
- **实现方式**：Topic 只能有 1 个 MessageQueue，1 个 Producer，1 个 Consumer
- **性能**：吞吐量极低，无法并行
- **适用场景**：极少使用，如关键日志顺序记录

#### 分区顺序消息
- **特点**：同一业务 Key 的消息有序
- **实现方式**：多个 MessageQueue，按 Key 路由到固定队列
- **性能**：支持并行，吞吐量高
- **适用场景**：大多数业务场景，如订单处理、库存更新

**对比图**

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.queue{fill:#e3f2fd;stroke:#1976d2;stroke-width:2}.msg{fill:#fff;stroke:#1976d2;stroke-width:1.5}.arrow{fill:none;stroke:#666;stroke-width:2;marker-end:url(#arrowhead)}.key{font:12px monospace;fill:#d32f2f}</style><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#666"/></marker></defs><text x="150" y="25" class="title">全局顺序消息</text><text x="550" y="25" class="title">分区顺序消息</text><text x="50" y="70" class="label">Producer</text><rect x="50" y="85" width="60" height="30" rx="4" fill="#4caf50"/><text x="80" y="105" text-anchor="middle" fill="#fff" font-size="14">发送者</text><path d="M110 100 L110 150" class="arrow"/><text x="50" y="180" class="label">Topic (1 Queue)</text><rect x="50" y="195" width="200" height="120" rx="6" class="queue"/><rect x="70" y="210" width="40" height="25" rx="3" class="msg"/><text x="90" y="227" text-anchor="middle" class="key">M1</text><rect x="70" y="245" width="40" height="25" rx="3" class="msg"/><text x="90" y="262" text-anchor="middle" class="key">M2</text><rect x="70" y="280" width="40" height="25" rx="3" class="msg"/><text x="90" y="297" text-anchor="middle" class="key">M3</text><path d="M250 255 L280 255" class="arrow"/><text x="310" y="180" class="label">Consumer</text><rect x="310" y="195" width="60" height="30" rx="4" fill="#ff9800"/><text x="340" y="215" text-anchor="middle" fill="#fff" font-size="14">消费者</text><text x="80" y="350" class="label" font-weight="bold">特点：全局有序，性能低</text><text x="450" y="70" class="label">Producer</text><rect x="450" y="85" width="60" height="30" rx="4" fill="#4caf50"/><text x="480" y="105" text-anchor="middle" fill="#fff" font-size="14">发送者</text><path d="M480 115 L480 145 M480 145 L430 195 M480 145 L530 195 M480 145 L630 195" class="arrow"/><text x="450" y="180" class="label">Topic (多 Queue)</text><rect x="430" y="195" width="80" height="100" rx="6" class="queue"/><text x="470" y="215" text-anchor="middle" class="label" font-size="12">Queue-0</text><rect x="440" y="225" width="30" height="20" rx="2" class="msg"/><text x="455" y="239" text-anchor="middle" class="key" font-size="11">A1</text><rect x="440" y="250" width="30" height="20" rx="2" class="msg"/><text x="455" y="264" text-anchor="middle" class="key" font-size="11">A2</text><rect x="440" y="275" width="30" height="20" rx="2" class="msg"/><text x="455" y="289" text-anchor="middle" class="key" font-size="11">A3</text><rect x="520" y="195" width="80" height="100" rx="6" class="queue"/><text x="560" y="215" text-anchor="middle" class="label" font-size="12">Queue-1</text><rect x="530" y="225" width="30" height="20" rx="2" class="msg"/><text x="545" y="239" text-anchor="middle" class="key" font-size="11">B1</text><rect x="530" y="250" width="30" height="20" rx="2" class="msg"/><text x="545" y="264" text-anchor="middle" class="key" font-size="11">B2</text><rect x="610" y="195" width="80" height="100" rx="6" class="queue"/><text x="650" y="215" text-anchor="middle" class="label" font-size="12">Queue-2</text><rect x="620" y="225" width="30" height="20" rx="2" class="msg"/><text x="635" y="239" text-anchor="middle" class="key" font-size="11">C1</text><rect x="620" y="250" width="30" height="20" rx="2" class="msg"/><text x="635" y="264" text-anchor="middle" class="key" font-size="11">C2</text><path d="M470 295 L470 325" class="arrow"/><path d="M560 295 L560 325" class="arrow"/><path d="M650 295 L650 325" class="arrow"/><rect x="440" y="330" width="60" height="30" rx="4" fill="#ff9800"/><text x="470" y="350" text-anchor="middle" fill="#fff" font-size="12">消费者1</text><rect x="530" y="330" width="60" height="30" rx="4" fill="#ff9800"/><text x="560" y="350" text-anchor="middle" fill="#fff" font-size="12">消费者2</text><rect x="620" y="330" width="60" height="30" rx="4" fill="#ff9800"/><text x="650" y="350" text-anchor="middle" fill="#fff" font-size="12">消费者3</text><text x="470" y="385" class="label" font-weight="bold">特点：分区有序，性能高，可并行</text></svg>

**应用场景对比**

| 类型 | 适用场景 | 性能 | 实现复杂度 |
|------|---------|------|----------|
| 全局顺序 | 关键日志、审计记录 | 低（单队列瓶颈） | 简单 |
| 分区顺序 | 订单处理、用户操作、库存变更 | 高（支持并行） | 中等 |

**关键要点**

1. **选择原则**：99% 的场景使用分区顺序消息即可
2. **全局顺序代价**：牺牲所有并行能力，生产环境极少使用
3. **分区顺序核心**：同一业务 Key（如 orderId）的消息保证有序
4. **性能差异**：分区顺序可达全局顺序的 N 倍（N = MessageQueue 数量）

**记忆口诀**

```
全局一条道，顺序最严苛；
分区按键走，并行又有序；
业务需求定，多数选分区。
```

### 37. 如何实现顺序消息？

**核心答案**

实现顺序消息需要**三个关键保证**：
1. **生产者端**：使用 MessageQueueSelector 将同一业务 Key 的消息发送到同一个 MessageQueue
2. **Broker 端**：单个 MessageQueue 内部保证 FIFO 顺序存储
3. **消费者端**：使用 MessageListenerOrderly 保证单线程顺序消费同一队列的消息

**详细说明**

#### 生产者实现（关键：队列选择）

生产者需要自定义 MessageQueueSelector，根据业务 Key（如订单 ID）将消息路由到固定队列：

```java
// 发送顺序消息
SendResult result = producer.send(message, new MessageQueueSelector() {
    @Override
    public MessageQueue select(List<MessageQueue> mqs, Message msg, Object arg) {
        // arg 是业务 Key（如 orderId）
        int index = arg.hashCode() % mqs.size();
        if (index < 0) index = Math.abs(index);
        return mqs.get(index);
    }
}, orderId); // orderId 作为路由 Key
```

#### 消费者实现（关键：顺序监听器）

消费者使用 MessageListenerOrderly 来保证顺序消费：

```java
consumer.registerMessageListener(new MessageListenerOrderly() {
    @Override
    public ConsumeOrderlyStatus consumeMessage(List<MessageExt> msgs,
                                                ConsumeOrderlyContext context) {
        // 消息按顺序逐条处理
        for (MessageExt msg : msgs) {
            // 业务逻辑处理
            processMessage(msg);
        }
        return ConsumeOrderlyStatus.SUCCESS;
    }
});
```

**实现流程图**

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500">
<defs><style>.box{fill:#e3f2fd;stroke:#1976d2;stroke-width:2;rx:6}.step{fill:#4caf50;stroke:#2e7d32;stroke-width:2}.consumer{fill:#ff9800;stroke:#e65100;stroke-width:2}.title{font:bold 14px sans-serif;fill:#333}.text{font:13px sans-serif;fill:#333}.code{font:11px monospace;fill:#d32f2f}.arrow{fill:none;stroke:#666;stroke-width:2;marker-end:url(#arrow)}</style><marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#666"/></marker></defs><text x="400" y="25" class="title" font-size="16" font-weight="bold">顺序消息实现流程</text><text x="50" y="65" class="title">1. 生产者端</text><rect x="50" y="80" width="250" height="140" class="box"/><rect x="70" y="95" width="210" height="35" class="step" rx="4"/><text x="175" y="112" class="text" text-anchor="middle" fill="#fff">发送消息 (orderId=123)</text><text x="175" y="126" class="code" text-anchor="middle" fill="#fff">Message msg</text><path d="M175 130 L175 155" class="arrow"/><rect x="70" y="155" width="210" height="50" class="step" rx="4"/><text x="175" y="172" class="text" text-anchor="middle" fill="#fff">MessageQueueSelector</text><text x="175" y="188" class="code" text-anchor="middle" fill="#fff">hash(orderId) % queueSize</text><text x="175" y="200" class="code" text-anchor="middle" fill="#fff">→ Queue-1</text><path d="M300 100 L380 100" class="arrow"/><text x="320" y="95" class="text" font-size="12">按 Key 路由</text><text x="400" y="65" class="title">2. Broker 存储</text><rect x="400" y="80" width="250" height="140" class="box"/><text x="525" y="105" class="title" font-size="13">Topic: OrderTopic</text><rect x="420" y="115" width="70" height="90" rx="4" fill="#fff" stroke="#1976d2" stroke-width="1.5"/><text x="455" y="133" class="text" text-anchor="middle" font-size="11">Queue-0</text><rect x="495" y="115" width="70" height="90" rx="4" fill="#ffe0b2" stroke="#ff6f00" stroke-width="2"/><text x="530" y="133" class="text" text-anchor="middle" font-size="11">Queue-1</text><rect x="505" y="140" width="50" height="18" rx="2" fill="#fff" stroke="#1976d2"/><text x="530" y="152" class="code" text-anchor="middle" font-size="10">M1-123</text><rect x="505" y="162" width="50" height="18" rx="2" fill="#fff" stroke="#1976d2"/><text x="530" y="174" class="code" text-anchor="middle" font-size="10">M2-123</text><rect x="505" y="184" width="50" height="18" rx="2" fill="#fff" stroke="#1976d2"/><text x="530" y="196" class="code" text-anchor="middle" font-size="10">M3-123</text><rect x="570" y="115" width="70" height="90" rx="4" fill="#fff" stroke="#1976d2" stroke-width="1.5"/><text x="605" y="133" class="text" text-anchor="middle" font-size="11">Queue-2</text><text x="525" y="225" class="text" font-size="11" text-anchor="middle">同一 orderId 的消息都在 Queue-1</text><path d="M530 220 L530 255" class="arrow"/><text x="50" y="280" class="title">3. 消费者端</text><rect x="50" y="295" width="800" height="180" class="box"/><rect x="70" y="315" width="180" height="60" class="consumer" rx="4"/><text x="160" y="335" class="text" text-anchor="middle" fill="#fff">Consumer (顺序监听)</text><text x="160" y="352" class="code" text-anchor="middle" fill="#fff">MessageListenerOrderly</text><text x="160" y="368" class="text" text-anchor="middle" fill="#fff" font-size="11">锁定 Queue-1</text><path d="M250 345 L290 345" class="arrow"/><rect x="290" y="315" width="160" height="60" rx="4" fill="#fff3e0" stroke="#ff6f00" stroke-width="2"/><text x="370" y="332" class="text" text-anchor="middle" font-size="12">顺序消费处理</text><text x="370" y="350" class="code" text-anchor="middle" font-size="10">1. M1-123 → 创建订单</text><text x="370" y="365" class="code" text-anchor="middle" font-size="10">2. M2-123 → 支付订单</text><path d="M450 345 L490 345" class="arrow"/><rect x="490" y="315" width="140" height="60" rx="4" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/><text x="560" y="335" class="text" text-anchor="middle" font-size="12">单线程串行</text><text x="560" y="352" class="text" text-anchor="middle" font-size="11">逐条处理</text><text x="560" y="367" class="text" text-anchor="middle" font-size="11">保证顺序</text><path d="M630 345 L670 345" class="arrow"/><rect x="670" y="315" width="150" height="60" rx="4" fill="#e1f5fe" stroke="#0277bd" stroke-width="2"/><text x="745" y="332" class="text" text-anchor="middle" font-size="12">消费成功</text><text x="745" y="349" class="code" text-anchor="middle" font-size="10">返回 SUCCESS</text><text x="745" y="365" class="text" text-anchor="middle" font-size="11">提交消费位点</text><text x="70" y="400" class="title" font-size="12">关键机制：</text><text x="70" y="420" class="text" font-size="11">• Consumer 启动时对 MessageQueue 加<tspan font-weight="bold" fill="#d32f2f">分布式锁</tspan>（Broker 端管理）</text><text x="70" y="438" class="text" font-size="11">• 同一时刻，一个 Queue 只能被<tspan font-weight="bold" fill="#d32f2f">一个 Consumer 消费</tspan></text><text x="70" y="456" class="text" font-size="11">• Consumer 内部对单个 Queue 使用<tspan font-weight="bold" fill="#d32f2f">单线程串行处理</tspan>消息</text></svg>

**关键技术点**

#### 1. 队列选择算法
```
队列索引 = hash(业务Key) % 队列总数
```
- 保证相同 Key 总是路由到同一队列
- 负载均衡：不同 Key 分散到不同队列

#### 2. 消费端锁机制
- **分布式锁**：Broker 端对 MessageQueue 加锁，防止多个 Consumer 同时消费
- **本地锁**：Consumer 内部对单个 Queue 使用单线程处理

#### 3. 两种消费模式对比

| 特性 | MessageListenerOrderly | MessageListenerConcurrently |
|------|----------------------|---------------------------|
| 消费顺序 | 保证顺序 | 不保证顺序 |
| 并发度 | Queue 级别并发 | 消息级别并发 |
| 性能 | 中等 | 高 |
| 锁机制 | Broker 锁 + 本地锁 | 无锁 |

**实现要点**

1. **生产者**：自定义 MessageQueueSelector，相同业务 Key 路由到相同队列
2. **消费者**：使用 MessageListenerOrderly，不要使用 MessageListenerConcurrently
3. **Topic 配置**：合理设置 MessageQueue 数量（建议 4-8 个）
4. **重试策略**：顺序消息失败会阻塞队列，需谨慎处理（见下一题）

**关键要点**

1. **三位一体**：生产路由 + Broker 存储 + 消费锁定，缺一不可
2. **Hash 一致性**：业务 Key 的 hashCode 必须稳定，不要用随机值
3. **队列数量**：影响并行度和负载均衡，需要权衡
4. **异常处理**：顺序消费中任何消息失败都会阻塞后续消息

**记忆口诀**

```
生产端选队列，Key 值来做主；
消费端加顺序，单线串行走；
分布锁队列，本地锁消息；
三环扣一起，顺序有保障。
```

### 38. 顺序消息在消费失败时如何处理？

**核心答案**

顺序消息失败时采用**阻塞式重试**策略：
1. 返回 `SUSPEND_CURRENT_QUEUE_A_MOMENT`（暂停消费）
2. Consumer 会**阻塞当前队列**，等待一段时间（默认 1 秒）后重试
3. **不会跳过失败消息**，也不会消费后续消息，保证顺序性
4. 达到最大重试次数后，需要人工介入处理

**详细说明**

#### 与普通消息重试的区别

| 特性 | 顺序消息 (Orderly) | 普通消息 (Concurrently) |
|------|-------------------|----------------------|
| 重试方式 | 原地阻塞式重试 | 发送到重试队列 |
| 是否跳过 | 不跳过，阻塞后续消息 | 跳过，继续消费其他消息 |
| 重试时间 | 固定间隔（默认 1s） | 延迟递增（1s, 5s, 10s...） |
| 影响范围 | 阻塞整个队列 | 不影响其他消息 |
| 消息顺序 | 严格保证 | 不保证 |

#### 消费状态返回值

```java
consumer.registerMessageListener(new MessageListenerOrderly() {
    @Override
    public ConsumeOrderlyStatus consumeMessage(List<MessageExt> msgs,
                                                ConsumeOrderlyContext context) {
        try {
            // 业务处理
            processMessage(msgs);
            return ConsumeOrderlyStatus.SUCCESS;  // 成功，继续消费下一条
        } catch (Exception e) {
            // 设置重试间隔（可选）
            context.setSuspendCurrentQueueTimeMillis(3000);  // 3秒后重试
            return ConsumeOrderlyStatus.SUSPEND_CURRENT_QUEUE_A_MOMENT;  // 暂停队列
        }
    }
});
```

**处理流程图**

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 550">
<defs><style>.box{fill:#e3f2fd;stroke:#1976d2;stroke-width:2;rx:6}.success{fill:#c8e6c9;stroke:#2e7d32;stroke-width:2}.fail{fill:#ffcdd2;stroke:#c62828;stroke-width:2}.warn{fill:#fff3e0;stroke:#ef6c00;stroke-width:2}.title{font:bold 14px sans-serif;fill:#333}.text{font:12px sans-serif;fill:#333}.code{font:11px monospace;fill:#1565c0}.arrow{fill:none;stroke:#666;stroke-width:2;marker-end:url(#arrow)}.darrow{stroke:#d32f2f;stroke-width:2.5;marker-end:url(#darrow)}</style><marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#666"/></marker><marker id="darrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#d32f2f"/></marker></defs><text x="400" y="25" class="title" font-size="16" text-anchor="middle">顺序消息失败处理流程</text><rect x="350" y="50" width="120" height="45" rx="6" class="box"/><text x="410" y="70" class="text" text-anchor="middle" font-weight="bold">队列消息</text><text x="410" y="86" class="code" text-anchor="middle" font-size="10">M1, M2, M3...</text><path d="M410 95 L410 125" class="arrow"/><rect x="330" y="125" width="160" height="50" rx="6" class="warn"/><text x="410" y="145" class="text" text-anchor="middle" font-weight="bold">消费消息 M1</text><text x="410" y="162" class="code" text-anchor="middle" font-size="10">consumeMessage(M1)</text><path d="M410 175 L410 205" class="arrow"/><path x="410" y="190" width="1" height="15" stroke="#333" stroke-width="2"/><rect x="190" y="205" width="100" height="40" rx="6" class="success"/><text x="240" y="222" class="text" text-anchor="middle">处理成功</text><text x="240" y="237" class="code" text-anchor="middle" font-size="10">SUCCESS</text><rect x="560" y="205" width="100" height="40" rx="6" class="fail"/><text x="610" y="222" class="text" text-anchor="middle">处理失败</text><text x="610" y="237" class="code" text-anchor="middle" font-size="10">Exception</text><path d="M365 190 L240 205" class="arrow"/><path d="M455 190 L610 205" class="darrow"/><text x="295" y="198" class="text" font-size="11" fill="#2e7d32">√</text><text x="530" y="198" class="text" font-size="11" fill="#c62828">✗</text><path d="M240 245 L240 285" class="arrow"/><rect x="180" y="285" width="120" height="50" rx="6" class="success"/><text x="240" y="305" class="text" text-anchor="middle" font-weight="bold">提交消费位点</text><text x="240" y="322" class="code" text-anchor="middle" font-size="10">offset++</text><path d="M240 335 L240 365" class="arrow"/><rect x="180" y="365" width="120" height="45" rx="6" class="box"/><text x="240" y="385" class="text" text-anchor="middle" font-weight="bold">消费下一条 M2</text><text x="240" y="400" class="code" text-anchor="middle" font-size="10">继续处理</text><path d="M610 245 L610 285" class="darrow"/><rect x="540" y="285" width="140" height="60" rx="6" class="fail"/><text x="610" y="305" class="text" text-anchor="middle" font-weight="bold">返回暂停状态</text><text x="610" y="320" class="code" text-anchor="middle" font-size="9">SUSPEND_CURRENT_</text><text x="610" y="333" class="code" text-anchor="middle" font-size="9">QUEUE_A_MOMENT</text><path d="M610 345 L610 375" class="darrow"/><rect x="540" y="375" width="140" height="50" rx="6" class="warn"/><text x="610" y="393" class="text" text-anchor="middle" font-weight="bold">阻塞队列</text><text x="610" y="408" class="code" text-anchor="middle" font-size="10">等待 1 秒（默认）</text><text x="610" y="420" class="text" text-anchor="middle" font-size="9">M2, M3 无法消费</text><path d="M680 400 L730 400 L730 155 L490 155" class="darrow"/><text x="745" y="275" class="text" font-size="11" fill="#c62828">重试</text><rect x="50" y="285" width="100" height="60" rx="6" fill="#ede7f6" stroke="#5e35b1" stroke-width="2"/><text x="100" y="305" class="text" text-anchor="middle" font-weight="bold" font-size="11">重试计数器</text><text x="100" y="322" class="code" text-anchor="middle" font-size="9">retryTimes++</text><text x="100" y="337" class="text" text-anchor="middle" font-size="9">达到上限?</text><path d="M150 315 L540 315" stroke="#5e35b1" stroke-width="1.5" stroke-dasharray="4,2" fill="none"/><rect x="50" y="460" width="750" height="70" rx="6" fill="#fff9c4" stroke="#f57f17" stroke-width="2"/><text x="425" y="480" class="title" text-anchor="middle" font-size="13">达到最大重试次数后</text><text x="70" y="500" class="text" font-size="11">• 消息仍然<tspan font-weight="bold" fill="#c62828">阻塞队列</tspan>，后续消息无法消费</text><text x="70" y="517" class="text" font-size="11">• 需要人工介入：修复问题 → 重启 Consumer / 跳过该消息 → 恢复消费</text></svg>

**核心机制解析**

#### 1. 阻塞式重试
```
消费失败 → 原地等待 → 重试 → 继续失败 → 再等待 → 再重试...
```
- **不发送到重试队列**：直接在原队列重试
- **阻塞后续消息**：保证顺序，但影响吞吐量
- **固定重试间隔**：默认 1 秒，可通过 `context.setSuspendCurrentQueueTimeMillis()` 调整

#### 2. 最大重试次数配置

```java
// 设置最大重试次数（默认 Integer.MAX_VALUE，即无限重试）
consumer.setMaxReconsumeTimes(3);
```

⚠️ **注意**：达到最大重试次数后，RocketMQ **不会自动跳过**，队列仍然阻塞！

#### 3. 失败处理策略

**策略一：业务降级（推荐）**
```java
public ConsumeOrderlyStatus consumeMessage(List<MessageExt> msgs,
                                            ConsumeOrderlyContext context) {
    try {
        processMessage(msgs);
        return ConsumeOrderlyStatus.SUCCESS;
    } catch (BusinessException e) {
        // 达到最大重试次数，降级处理
        if (msgs.get(0).getReconsumeTimes() >= MAX_RETRY) {
            log.error("消息处理失败，进行降级: {}", msgs.get(0).getMsgId());
            saveToFailedTable(msgs.get(0));  // 存入失败表，人工处理
            return ConsumeOrderlyStatus.SUCCESS;  // 跳过该消息
        }
        context.setSuspendCurrentQueueTimeMillis(2000);
        return ConsumeOrderlyStatus.SUSPEND_CURRENT_QUEUE_A_MOMENT;
    }
}
```

**策略二：快速失败**
```java
// 对于非关键消息，快速失败
if (isNonCriticalMessage(msg)) {
    try {
        processMessage(msg);
    } catch (Exception e) {
        log.warn("非关键消息处理失败，直接跳过");
        return ConsumeOrderlyStatus.SUCCESS;  // 直接跳过
    }
}
```

**最佳实践**

1. **设置合理的重试次数**
   ```java
   consumer.setMaxReconsumeTimes(3);  // 建议 3-5 次
   ```

2. **增加重试间隔**
   ```java
   context.setSuspendCurrentQueueTimeMillis(5000);  // 5秒重试
   ```

3. **快速失败机制**
   - 对于明确无法恢复的异常（如参数错误），立即返回 SUCCESS 跳过
   - 对于可恢复异常（如网络超时），返回 SUSPEND 重试

4. **监控告警**
   - 监控队列消费延迟
   - 监控重试次数异常的消息
   - 设置告警阈值，及时人工介入

5. **失败消息持久化**
   ```java
   // 将失败消息写入数据库/文件
   saveToFailedMessageTable(msg);
   // 然后跳过该消息
   return ConsumeOrderlyStatus.SUCCESS;
   ```

**风险与注意事项**

| 风险 | 说明 | 解决方案 |
|------|------|---------|
| 队列阻塞 | 一条消息失败导致整个队列停滞 | 设置最大重试次数 + 降级处理 |
| 消息堆积 | 失败消息重试期间，新消息不断积压 | 快速失败 + 异步补偿 |
| 消费延迟 | 重试导致后续消息处理延迟 | 调整重试间隔，缩短阻塞时间 |
| 死锁风险 | 消息永久失败，消费者卡死 | 监控告警 + 人工介入机制 |

**关键要点**

1. **原地重试**：顺序消息失败不发送到重试队列，在原队列阻塞重试
2. **必须设置上限**：`setMaxReconsumeTimes()` 避免无限重试
3. **业务降级**：达到最大重试次数后，保存失败消息并返回 SUCCESS 跳过
4. **监控至关重要**：实时监控消费延迟和重试异常

**记忆口诀**

```
顺序消息重试难，原地阻塞不跳转；
失败一条堵一队，后续消息全等待；
上限降级是关键，监控告警保平安；
快速失败别死等，异步补偿是妙招。
```



## 消息去重与幂等

### 39. RocketMQ 如何保证消息不重复？

**核心答案：**

RocketMQ **本身无法完全保证消息不重复**，只能保证"至少一次"（At Least Once）的消息投递语义。消息去重需要**在业务层面通过幂等性设计来保证**。

**详细说明：**

**1. RocketMQ 的投递语义**
- **At Least Once（至少一次）**：保证消息一定会被投递，但可能重复
- **At Most Once（至多一次）**：消息可能丢失，但不会重复（RocketMQ 不支持）
- **Exactly Once（精确一次）**：消息既不丢失也不重复（分布式系统中很难实现）

**2. RocketMQ 的设计选择**
```
为什么选择 At Least Once？
┌──────────────────────────────────────┐
│ 消息可能丢失 vs 消息可能重复         │
│                                      │
│ At Most Once     At Least Once       │
│     ❌ 丢失        ✅ 重复可控         │
│   不可恢复         可幂等处理         │
└──────────────────────────────────────┘

设计理念：宁可重复，不可丢失
- 消息丢失无法恢复，业务损失大
- 消息重复可通过幂等性处理
```

**3. RocketMQ 提供的辅助机制**

虽然不能完全保证不重复，但 RocketMQ 提供了一些辅助工具：

| 机制 | 说明 | 作用 |
|------|------|------|
| **MessageId** | 系统自动生成的唯一 ID | 可用于去重，但网络重传时会变化 |
| **Keys** | 业务自定义的唯一标识 | 更可靠的去重依据 |
| **事务消息** | 支持本地事务与消息发送的一致性 | 避免因回滚导致的重复 |

**4. 消息去重的实现方案**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;}.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<text x="400" y="25" text-anchor="middle" class="title">消息去重实现方案</text>
<rect x="50" y="50" width="200" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8"/>
<text x="150" y="75" text-anchor="middle" class="label" font-weight="bold">方案1: 数据库唯一索引</text>
<text x="150" y="100" text-anchor="middle" class="small">CREATE UNIQUE INDEX</text>
<text x="150" y="120" text-anchor="middle" class="small">ON message_record</text>
<text x="150" y="140" text-anchor="middle" class="small">(message_key)</text>
<text x="150" y="160" text-anchor="middle" class="small" fill="#2e7d32">✓ 可靠、简单</text>
<rect x="300" y="50" width="200" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="8"/>
<text x="400" y="75" text-anchor="middle" class="label" font-weight="bold">方案2: Redis SET</text>
<text x="400" y="100" text-anchor="middle" class="small">SETNX message_key</text>
<text x="400" y="120" text-anchor="middle" class="small">EXPIRE 3600</text>
<text x="400" y="140" text-anchor="middle" class="small" fill="#2e7d32">✓ 高性能</text>
<text x="400" y="160" text-anchor="middle" class="small" fill="#c62828">✗ 可能丢失</text>
<rect x="550" y="50" width="200" height="120" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="8"/>
<text x="650" y="75" text-anchor="middle" class="label" font-weight="bold">方案3: 业务状态机</text>
<text x="650" y="100" text-anchor="middle" class="small">订单状态：</text>
<text x="650" y="120" text-anchor="middle" class="small">待支付 → 已支付</text>
<text x="650" y="140" text-anchor="middle" class="small">已支付 → 已支付(幂等)</text>
<text x="650" y="160" text-anchor="middle" class="small" fill="#2e7d32">✓ 业务语义清晰</text>
<rect x="50" y="200" width="330" height="280" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="8"/>
<text x="215" y="225" text-anchor="middle" class="label" font-weight="bold">推荐方案：数据库唯一索引 + 业务逻辑</text>
<text x="70" y="255" class="small" font-weight="bold">1. 提取业务唯一键</text>
<text x="85" y="275" class="small">String bizKey = message.getKeys();</text>
<text x="85" y="295" class="small">// 或组合业务字段生成</text>
<text x="70" y="325" class="small" font-weight="bold">2. 查询是否已处理</text>
<text x="85" y="345" class="small">if (isProcessed(bizKey)) {</text>
<text x="100" y="365" class="small">return SUCCESS; // 幂等返回</text>
<text x="85" y="385" class="small">}</text>
<text x="70" y="415" class="small" font-weight="bold">3. 执行业务 + 记录处理状态（事务）</text>
<text x="85" y="435" class="small">@Transactional</text>
<text x="85" y="455" class="small">processBusiness(message);</text>
<text x="85" y="475" class="small">saveRecord(bizKey, processed);</text>
<rect x="420" y="200" width="330" height="280" fill="#fff9c4" stroke="#f9a825" stroke-width="2" rx="8"/>
<text x="585" y="225" text-anchor="middle" class="label" font-weight="bold">关键设计要点</text>
<circle cx="435" cy="250" r="4" fill="#f9a825"/><text x="450" y="255" class="small">查询和记录必须在同一事务</text>
<circle cx="435" cy="280" r="4" fill="#f9a825"/><text x="450" y="285" class="small">唯一键设计要考虑业务场景</text>
<text x="465" y="305" class="small" fill="#666">- 订单：orderId</text>
<text x="465" y="325" class="small" fill="#666">- 支付：paymentId</text>
<text x="465" y="345" class="small" fill="#666">- 组合：userId+timestamp</text>
<circle cx="435" cy="370" r="4" fill="#f9a825"/><text x="450" y="375" class="small">考虑性能：Redis缓存+DB持久化</text>
<text x="465" y="395" class="small" fill="#666">Redis判断快速返回</text>
<text x="465" y="415" class="small" fill="#666">DB保证数据可靠性</text>
<circle cx="435" cy="440" r="4" fill="#f9a825"/><text x="450" y="445" class="small">设置合理的过期时间</text>
<text x="465" y="465" class="small" fill="#666">避免数据无限增长</text>
</svg>

**5. 代码示例：消费者幂等处理**

```java
@Service
public class OrderMessageListener implements MessageListenerConcurrently {

    @Autowired
    private MessageRecordService messageRecordService;

    @Autowired
    private OrderService orderService;

    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs,
            ConsumeConcurrentlyContext context) {

        for (MessageExt msg : msgs) {
            try {
                // 1. 获取业务唯一键
                String orderId = msg.getKeys(); // 或从消息体中解析

                // 2. 幂等性检查
                if (messageRecordService.isProcessed(orderId)) {
                    log.info("消息已处理，跳过: {}", orderId);
                    continue; // 幂等返回
                }

                // 3. 处理业务逻辑（事务中同时记录处理状态）
                processOrder(orderId, msg);

            } catch (Exception e) {
                log.error("消息处理失败", e);
                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
            }
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }

    @Transactional(rollbackFor = Exception.class)
    public void processOrder(String orderId, MessageExt msg) {
        // 业务处理
        orderService.updateOrderStatus(orderId);

        // 记录消息已处理（防止重复）
        messageRecordService.saveRecord(orderId);
    }
}
```

**数据库去重表设计：**

```sql
CREATE TABLE message_record (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    message_key VARCHAR(128) NOT NULL COMMENT '业务唯一键',
    message_id VARCHAR(64) COMMENT 'RocketMQ消息ID',
    topic VARCHAR(64) NOT NULL,
    process_time DATETIME NOT NULL,
    INDEX idx_topic_time (topic, process_time),
    UNIQUE KEY uk_message_key (message_key) -- 唯一索引保证去重
) COMMENT '消息处理记录表';
```

**关键要点：**

1. ✅ **RocketMQ 保证至少一次投递，无法完全避免重复**
2. ✅ **消息去重必须在消费者端实现（业务幂等性）**
3. ✅ **优先使用业务唯一键（Keys）而非 MessageId**
4. ✅ **推荐方案：数据库唯一索引 + 事务保证**
5. ✅ **查询和记录处理状态必须在同一事务中**
6. ✅ **考虑性能：Redis 缓存 + DB 持久化**

**记忆口诀：**

```
消息重复很常见，RocketMQ 不保全
至少一次是保证，去重要靠消费端

业务唯一键最重要，数据库索引来护航
查询记录同事务，幂等设计保无恙
```

### 40. 什么情况下会出现重复消息？

**核心答案：**

消息重复主要发生在**三个阶段**：
1. **生产阶段**：Producer 发送消息后，因网络超时而重试
2. **存储阶段**：Broker 主从复制时可能重复
3. **消费阶段**：Consumer 消费后，ACK 确认失败导致重新投递

**详细说明：**

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;}.label{font:14px sans-serif;}.small{font:12px sans-serif;}.tiny{font:11px sans-serif;}</style><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
<text x="425" y="25" text-anchor="middle" class="title">消息重复产生的场景</text>
<rect x="30" y="50" width="260" height="180" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="8"/>
<text x="160" y="75" text-anchor="middle" class="label" font-weight="bold" fill="#c62828">场景1: 生产者发送重复</text>
<rect x="50" y="90" width="80" height="40" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="90" y="115" text-anchor="middle" class="small">Producer</text>
<rect x="190" y="90" width="80" height="40" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="230" y="115" text-anchor="middle" class="small">Broker</text>
<path d="M 130 110 L 185 110" stroke="#2e7d32" stroke-width="2" marker-end="url(#arrow)"/>
<text x="157" y="105" text-anchor="middle" class="tiny" fill="#2e7d32">①发送消息</text>
<path d="M 185 120 L 135 120" stroke="#c62828" stroke-width="2" stroke-dasharray="4"/>
<text x="160" y="135" text-anchor="middle" class="tiny" fill="#c62828">②响应超时</text>
<path d="M 130 150 L 185 150" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow)"/>
<text x="157" y="145" text-anchor="middle" class="tiny" fill="#f57c00">③重试发送</text>
<circle cx="210" cy="170" r="3" fill="#c62828"/>
<text x="50" y="175" class="tiny">结果：Broker存储了2条相同消息</text>
<text x="50" y="195" class="tiny" fill="#666">原因：网络抖动、Broker繁忙、超时设置过短</text>
<text x="50" y="210" class="tiny" fill="#1976d2" font-weight="bold">典型场景：sendTimeout=3s，实际处理4s</text>
<rect x="310" y="50" width="260" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="8"/>
<text x="440" y="75" text-anchor="middle" class="label" font-weight="bold" fill="#f57c00">场景2: Broker 主从复制重复</text>
<rect x="330" y="90" width="80" height="40" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="370" y="110" text-anchor="middle" class="tiny">Master</text>
<text x="370" y="125" text-anchor="middle" class="tiny">Broker</text>
<rect x="470" y="90" width="80" height="40" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="510" y="110" text-anchor="middle" class="tiny">Slave</text>
<text x="510" y="125" text-anchor="middle" class="tiny">Broker</text>
<path d="M 410 110 L 465 110" stroke="#2e7d32" stroke-width="2" marker-end="url(#arrow)"/>
<text x="437" y="105" text-anchor="middle" class="tiny" fill="#2e7d32">①主从复制</text>
<rect x="330" y="145" width="80" height="30" fill="#ffcdd2" stroke="#c62828" stroke-width="1" rx="4"/>
<text x="370" y="165" text-anchor="middle" class="tiny" fill="#c62828">Master宕机</text>
<path d="M 470 160 L 415 160" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<text x="442" y="155" text-anchor="middle" class="tiny" fill="#1976d2">②Slave升主</text>
<text x="330" y="195" class="tiny" fill="#666">如果复制有延迟，可能造成部分消息重复</text>
<text x="330" y="210" class="tiny" fill="#1976d2" font-weight="bold">同步复制可减少，异步复制风险大</text>
<rect x="590" y="50" width="240" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="8"/>
<text x="710" y="75" text-anchor="middle" class="label" font-weight="bold" fill="#388e3c">场景3: 消费者ACK失败</text>
<rect x="610" y="90" width="80" height="40" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="650" y="115" text-anchor="middle" class="small">Consumer</text>
<rect x="730" y="90" width="80" height="40" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="770" y="115" text-anchor="middle" class="small">Broker</text>
<path d="M 725 110 L 695 110" stroke="#2e7d32" stroke-width="2" marker-end="url(#arrow)"/>
<text x="710" y="105" text-anchor="middle" class="tiny" fill="#2e7d32">①拉取消息</text>
<circle cx="630" cy="150" r="3" fill="#2e7d32"/>
<text x="645" y="155" class="tiny" fill="#2e7d32">②处理成功</text>
<path d="M 690 155 L 725 155" stroke="#c62828" stroke-width="2" stroke-dasharray="4"/>
<text x="707" y="150" text-anchor="middle" class="tiny" fill="#c62828">③ACK失败</text>
<path d="M 725 180 L 695 180" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow)"/>
<text x="710" y="175" text-anchor="middle" class="tiny" fill="#f57c00">④重新投递</text>
<text x="610" y="205" class="tiny" fill="#666">原因：网络闪断、Consumer宕机</text>
<text x="610" y="220" class="tiny" fill="#1976d2" font-weight="bold">最常见的重复场景</text>
<rect x="30" y="250" width="390" height="190" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8"/>
<text x="225" y="275" text-anchor="middle" class="label" font-weight="bold" fill="#1976d2">场景4: 消费者负载均衡（Rebalance）</text>
<rect x="50" y="290" width="60" height="30" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="80" y="310" text-anchor="middle" class="tiny">Consumer1</text>
<rect x="130" y="290" width="60" height="30" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="160" y="310" text-anchor="middle" class="tiny">Consumer2</text>
<rect x="210" y="290" width="60" height="30" fill="#ffcdd2" stroke="#c62828" stroke-width="1" rx="4"/>
<text x="240" y="305" text-anchor="middle" class="tiny" fill="#c62828">Consumer3</text>
<text x="240" y="318" text-anchor="middle" class="tiny" fill="#c62828">宕机</text>
<text x="50" y="345" class="tiny" font-weight="bold">Rebalance触发条件：</text>
<circle cx="55" cy="362" r="2" fill="#666"/>
<text x="65" y="365" class="tiny">Consumer上线/下线</text>
<circle cx="55" cy="382" r="2" fill="#666"/>
<text x="65" y="385" class="tiny">Topic队列数量变化</text>
<circle cx="55" cy="402" r="2" fill="#666"/>
<text x="65" y="405" class="tiny">Consumer订阅信息变化</text>
<text x="210" y="345" class="tiny" font-weight="bold">可能导致重复：</text>
<circle cx="215" cy="362" r="2" fill="#c62828"/>
<text x="225" y="365" class="tiny" fill="#c62828">Consumer3 已消费但未提交offset</text>
<circle cx="215" cy="382" r="2" fill="#c62828"/>
<text x="225" y="385" class="tiny" fill="#c62828">队列重新分配给 Consumer1</text>
<circle cx="215" cy="402" r="2" fill="#c62828"/>
<text x="225" y="405" class="tiny" fill="#c62828">Consumer1 从旧offset开始消费</text>
<path d="M 270 315 L 290 330 L 310 280" stroke="#f57c00" stroke-width="3" fill="none"/>
<text x="290" y="345" text-anchor="middle" class="tiny" fill="#f57c00">重复消费</text>
<text x="50" y="430" class="tiny" fill="#1976d2" font-weight="bold">降低影响：减少Rebalance频率，及时提交offset</text>
<rect x="440" y="250" width="390" height="190" fill="#fff9c4" stroke="#f9a825" stroke-width="2" rx="8"/>
<text x="635" y="275" text-anchor="middle" class="label" font-weight="bold" fill="#f9a825">场景5: 消息重试机制导致</text>
<text x="460" y="300" class="tiny" font-weight="bold">正常重试流程：</text>
<text x="460" y="320" class="tiny">消费失败 → 返回 RECONSUME_LATER</text>
<text x="460" y="340" class="tiny">→ Broker 重新投递（延迟投递）</text>
<text x="460" y="360" class="tiny">→ 如果之前消费已部分成功...</text>
<circle cx="620" cy="375" r="3" fill="#c62828"/>
<text x="635" y="380" class="tiny" fill="#c62828" font-weight="bold">导致重复执行</text>
<text x="460" y="400" class="tiny" font-weight="bold" fill="#c62828">典型场景：</text>
<rect x="460" y="410" width="350" height="20" fill="#fff" stroke="#666" stroke-width="1" rx="2"/>
<text x="470" y="424" class="tiny">1. 扣减库存（成功）→ 2. 创建订单（失败）</text>
<text x="460" y="440" class="tiny" fill="#c62828">→ 重试时库存被扣减2次！</text>
<rect x="30" y="460" width="800" height="180" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="8"/>
<text x="430" y="485" text-anchor="middle" class="label" font-weight="bold" fill="#7b1fa2">总结：重复消息的根本原因</text>
<text x="50" y="510" class="small" font-weight="bold">1. 分布式系统的网络不可靠</text>
<text x="70" y="530" class="tiny">• 网络超时、丢包、重传是常态</text>
<text x="70" y="545" class="tiny">• 无法确定对方是否收到</text>
<text x="50" y="565" class="small" font-weight="bold">2. 异步处理的不确定性</text>
<text x="70" y="585" class="tiny">• 发送成功但响应未收到</text>
<text x="70" y="600" class="tiny">• 处理成功但确认失败</text>
<text x="450" y="510" class="small" font-weight="bold">3. 高可用架构的副作用</text>
<text x="470" y="530" class="tiny">• 主从切换可能导致重复</text>
<text x="470" y="545" class="tiny">• 负载均衡触发消息重新分配</text>
<text x="450" y="565" class="small" font-weight="bold">4. 重试机制的必要代价</text>
<text x="470" y="585" class="tiny">• 为保证消息不丢失而重试</text>
<text x="470" y="600" class="tiny">• At Least Once 的设计必然结果</text>
<text x="50" y="625" class="tiny" fill="#7b1fa2" font-weight="bold">核心理念：分布式系统中，消息重复是无法完全避免的正常现象，必须在应用层处理</text>
</svg>

**各场景的详细分析：**

**场景1：生产者发送重复**
```java
// Producer 发送超时重试
Message msg = new Message("TopicTest", "Hello".getBytes());
producer.send(msg);
// 3秒未收到响应，Producer 认为发送失败
// 自动重试（默认重试2次）
// 实际上 Broker 可能已经收到第一条消息

// 配置建议
producer.setSendMsgTimeout(5000);        // 合理的超时时间
producer.setRetryTimesWhenSendFailed(2); // 同步发送失败重试次数
```

**场景2：Broker 主从复制重复**
- **同步复制（SYNC_MASTER）**：Master 等待 Slave 复制成功后才返回，重复概率低
- **异步复制（ASYNC_MASTER）**：Master 立即返回，主从切换时可能丢失或重复

**场景3：消费者 ACK 失败（最常见）**
```java
// 消费成功但 ACK 失败的场景
public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs,
                                                 ConsumeConcurrentlyContext context) {
    try {
        // 业务处理成功
        processMessage(msgs.get(0));

        // 准备返回 CONSUME_SUCCESS
        // 但此时发生：网络闪断、Consumer 宕机、JVM GC 卡顿
        // Broker 未收到 ACK，认为消费失败
        // 一段时间后重新投递 → 重复消费
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;

    } catch (Exception e) {
        return ConsumeConcurrentlyStatus.RECONSUME_LATER;
    }
}
```

**场景4：Rebalance 导致重复**
```
时间线：
T1: Consumer3 消费 Queue3 的 offset 100-150
T2: Consumer3 业务处理成功
T3: Consumer3 准备提交 offset = 150
T4: Consumer3 宕机（offset 未提交）
T5: 触发 Rebalance，Queue3 分配给 Consumer1
T6: Consumer1 从 offset = 100 开始消费（重复消费 100-150）
```

**场景5：消息重试导致部分成功后重复**
```java
// 危险示例：非原子操作
public void processOrder(Message msg) {
    Order order = parseOrder(msg);

    // 第一步：扣减库存（成功）
    inventoryService.reduce(order.getProductId(), order.getQuantity());

    // 第二步：创建订单（失败，抛异常）
    orderService.create(order);  // 数据库连接超时

    // 返回 RECONSUME_LATER 触发重试
    // → 重试时库存又被扣减一次！
}

// 正确做法：要么全部成功，要么全部失败
@Transactional
public void processOrder(Message msg) {
    // 使用分布式事务或幂等性保证
}
```

**如何降低重复概率（但无法完全避免）：**

| 优化措施 | 说明 | 效果 |
|---------|------|------|
| **合理设置超时时间** | Producer 的 sendTimeout 不要太短 | 减少场景1 |
| **使用同步复制** | 设置 `brokerRole=SYNC_MASTER` | 减少场景2 |
| **及时提交 offset** | 避免大批量处理后一次性提交 | 减少场景4 |
| **减少 Rebalance** | Consumer 稳定运行，避免频繁上下线 | 减少场景4 |
| **幂等性设计** | 业务层面保证重复消费无影响 | 解决所有场景 |

**关键要点：**

1. ✅ **网络超时重试是最常见的重复原因**
2. ✅ **消费成功但 ACK 失败会导致重复投递**
3. ✅ **Rebalance 会导致消息被重新分配和消费**
4. ✅ **消息重试机制可能导致部分操作重复执行**
5. ✅ **主从切换和异步复制也可能产生重复**
6. ✅ **降低重复概率的措施只是缓解，无法根除**

**记忆口诀：**

```
三阶段五场景，重复无处不在
生产超时要重试，网络抖动是祸端

消费成功 ACK 断，Broker 以为没消费
Rebalance 队列换，旧消息又来一遍

主从切换有延迟，异步复制藏隐患
消息重试本为好，部分成功变灾难

根本原因是网络，分布式系统特点
接受重复做幂等，才是正确的观念
```

### 41. 如何实现消息的幂等性？

**核心答案：**

**幂等性**是指同一个操作执行一次和执行多次的结果完全相同。实现消息幂等性的核心思想是：**用业务唯一标识作为去重依据**，常见方案包括：
1. **数据库唯一索引**（推荐，最可靠）
2. **Redis 分布式锁**（高性能）
3. **业务状态机**（最优雅）
4. **Token 机制**（适合前端场景）

**详细说明：**

**1. 什么是幂等性？**

<svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;}.label{font:14px sans-serif;}.small{font:12px sans-serif;}</style></defs>
<text x="400" y="25" text-anchor="middle" class="title">幂等性 vs 非幂等性</text>
<rect x="50" y="50" width="330" height="130" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="8"/>
<text x="215" y="75" text-anchor="middle" class="label" font-weight="bold" fill="#388e3c">✓ 幂等操作（Idempotent）</text>
<text x="70" y="100" class="small">执行1次：余额 = 1000 - 100 = 900</text>
<text x="70" y="120" class="small">执行2次：余额 = 1000 - 100 = 900</text>
<text x="70" y="140" class="small">执行N次：余额 = 1000 - 100 = 900</text>
<text x="215" y="165" text-anchor="middle" class="small" fill="#2e7d32" font-weight="bold">结果始终一致，重复执行安全</text>
<rect x="420" y="50" width="330" height="130" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="8"/>
<text x="585" y="75" text-anchor="middle" class="label" font-weight="bold" fill="#c62828">✗ 非幂等操作</text>
<text x="440" y="100" class="small">执行1次：余额 = 1000 - 100 = 900</text>
<text x="440" y="120" class="small">执行2次：余额 = 900 - 100 = 800</text>
<text x="440" y="140" class="small">执行3次：余额 = 800 - 100 = 700</text>
<text x="585" y="165" text-anchor="middle" class="small" fill="#c62828" font-weight="bold">每次执行结果不同，重复执行有问题</text>
</svg>

**2. 幂等性实现方案对比**

<svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;}.label{font:14px sans-serif;}.small{font:12px sans-serif;}.tiny{font:11px sans-serif;}</style><marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
<text x="450" y="25" text-anchor="middle" class="title">消息幂等性实现方案</text>
<rect x="30" y="50" width="400" height="210" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8"/>
<text x="230" y="75" text-anchor="middle" class="label" font-weight="bold" fill="#1976d2">方案1: 数据库唯一索引（推荐）</text>
<rect x="50" y="90" width="360" height="80" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="60" y="108" class="tiny" font-family="monospace">CREATE TABLE idempotent_record (</text>
<text x="70" y="125" class="tiny" font-family="monospace">biz_key VARCHAR(128) PRIMARY KEY,</text>
<text x="70" y="142" class="tiny" font-family="monospace">status TINYINT,</text>
<text x="70" y="159" class="tiny" font-family="monospace">create_time DATETIME</text>
<text x="60" y="176" class="tiny" font-family="monospace">);</text>
<circle cx="60" cy="195" r="3" fill="#2e7d32"/>
<text x="70" y="200" class="tiny" fill="#2e7d32">✓ 可靠性最高（数据持久化）</text>
<circle cx="60" cy="215" r="3" fill="#2e7d32"/>
<text x="70" y="220" class="tiny" fill="#2e7d32">✓ 利用数据库约束天然防重</text>
<circle cx="60" cy="235" r="3" fill="#c62828"/>
<text x="70" y="240" class="tiny" fill="#c62828">✗ 性能相对较低（数据库IO）</text>
<rect x="470" y="50" width="400" height="210" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="8"/>
<text x="670" y="75" text-anchor="middle" class="label" font-weight="bold" fill="#f57c00">方案2: Redis 分布式锁</text>
<rect x="490" y="90" width="360" height="80" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="500" y="108" class="tiny" font-family="monospace">String key = "idempotent:" + bizKey;</text>
<text x="500" y="125" class="tiny" font-family="monospace">// SETNX + EXPIRE 原子操作</text>
<text x="500" y="142" class="tiny" font-family="monospace">Boolean success = redis.set(</text>
<text x="510" y="159" class="tiny" font-family="monospace">key, "1", "NX", "EX", 3600);</text>
<circle cx="500" cy="195" r="3" fill="#2e7d32"/>
<text x="510" y="200" class="tiny" fill="#2e7d32">✓ 性能高（内存操作）</text>
<circle cx="500" cy="215" r="3" fill="#2e7d32"/>
<text x="510" y="220" class="tiny" fill="#2e7d32">✓ 分布式环境适用</text>
<circle cx="500" cy="235" r="3" fill="#c62828"/>
<text x="510" y="240" class="tiny" fill="#c62828">✗ Redis 故障时可能失效</text>
<rect x="30" y="280" width="400" height="210" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="8"/>
<text x="230" y="305" text-anchor="middle" class="label" font-weight="bold" fill="#388e3c">方案3: 业务状态机（最优雅）</text>
<rect x="50" y="320" width="360" height="90" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="60" y="338" class="tiny">订单状态流转：</text>
<path d="M 70 350 L 130 350" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow2)"/>
<text x="100" y="345" text-anchor="middle" class="tiny">创建</text>
<rect x="130" y="340" width="60" height="20" fill="#fff9c4" stroke="#f9a825" rx="3"/>
<text x="160" y="354" text-anchor="middle" class="tiny">待支付</text>
<path d="M 190 350 L 250 350" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow2)"/>
<text x="220" y="345" text-anchor="middle" class="tiny">支付</text>
<rect x="250" y="340" width="60" height="20" fill="#c8e6c9" stroke="#388e3c" rx="3"/>
<text x="280" y="354" text-anchor="middle" class="tiny">已支付</text>
<path d="M 310 350 L 370 350" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow2)"/>
<text x="340" y="345" text-anchor="middle" class="tiny">发货</text>
<rect x="370" y="340" width="60" height="20" fill="#bbdefb" stroke="#1976d2" rx="3"/>
<text x="400" y="354" text-anchor="middle" class="tiny">已发货</text>
<path d="M 280 365 Q 280 380 280 365" stroke="#2e7d32" stroke-width="2" stroke-dasharray="3" marker-end="url(#arrow2)"/>
<text x="300" y="385" class="tiny" fill="#2e7d32">重复支付→状态不变（幂等）</text>
<circle cx="60" cy="425" r="3" fill="#2e7d32"/>
<text x="70" y="430" class="tiny" fill="#2e7d32">✓ 业务语义清晰</text>
<circle cx="60" cy="445" r="3" fill="#2e7d32"/>
<text x="70" y="450" class="tiny" fill="#2e7d32">✓ 天然幂等，无需额外存储</text>
<circle cx="60" cy="465" r="3" fill="#f57c00"/>
<text x="70" y="470" class="tiny" fill="#f57c00">△ 需要合理设计状态机</text>
<rect x="470" y="280" width="400" height="210" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="8"/>
<text x="670" y="305" text-anchor="middle" class="label" font-weight="bold" fill="#7b1fa2">方案4: Token 令牌机制</text>
<rect x="490" y="320" width="360" height="90" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="500" y="338" class="tiny">1. 请求前获取 Token：</text>
<text x="510" y="355" class="tiny" font-family="monospace">token = UUID.randomUUID();</text>
<text x="510" y="372" class="tiny" font-family="monospace">redis.set("token:" + token, "1");</text>
<text x="500" y="392" class="tiny">2. 请求时携带 Token，首次删除成功：</text>
<text x="510" y="409" class="tiny" font-family="monospace">if (redis.del("token:" + token) == 1)</text>
<circle cx="500" cy="425" r="3" fill="#2e7d32"/>
<text x="510" y="430" class="tiny" fill="#2e7d32">✓ 适合前端重复提交场景</text>
<circle cx="500" cy="445" r="3" fill="#2e7d32"/>
<text x="510" y="450" class="tiny" fill="#2e7d32">✓ 天然防并发</text>
<circle cx="500" cy="465" r="3" fill="#c62828"/>
<text x="510" y="470" class="tiny" fill="#c62828">✗ 需要额外接口获取 Token</text>
</svg>

**3. 推荐方案：数据库唯一索引 + Redis 缓存**

<svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;}.label{font:14px sans-serif;}.small{font:12px sans-serif;}.tiny{font:11px sans-serif;}</style><marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
<text x="450" y="25" text-anchor="middle" class="title">双重保障：Redis缓存 + 数据库兜底</text>
<rect x="50" y="50" width="180" height="60" fill="#fff9c4" stroke="#f9a825" stroke-width="2" rx="6"/>
<text x="140" y="75" text-anchor="middle" class="label" font-weight="bold">消息到达</text>
<text x="140" y="95" text-anchor="middle" class="small">bizKey = orderId</text>
<path d="M 230 80 L 290 80" stroke="#333" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="290" y="50" width="180" height="110" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="6"/>
<text x="380" y="75" text-anchor="middle" class="label" font-weight="bold">步骤1: Redis检查</text>
<text x="300" y="100" class="tiny">if (redis.exists(bizKey)) {</text>
<text x="310" y="118" class="tiny">return SUCCESS; // 已处理</text>
<text x="300" y="136" class="tiny">}</text>
<text x="380" y="153" text-anchor="middle" class="tiny" fill="#2e7d32">✓ 快速返回，99%请求拦截</text>
<path d="M 470 105 L 530 105" stroke="#333" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="530" y="50" width="320" height="300" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="6"/>
<text x="690" y="75" text-anchor="middle" class="label" font-weight="bold">步骤2: 数据库事务处理</text>
<rect x="550" y="90" width="280" height="180" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="560" y="108" class="tiny" font-weight="bold">@Transactional</text>
<text x="560" y="125" class="tiny">try {</text>
<text x="570" y="142" class="tiny">// 2.1 插入幂等记录（唯一索引）</text>
<text x="570" y="159" class="tiny">idempotentDao.insert(bizKey);</text>
<text x="570" y="180" class="tiny">// 2.2 执行业务逻辑</text>
<text x="570" y="197" class="tiny">processBusiness(message);</text>
<text x="570" y="218" class="tiny">// 2.3 写入 Redis 缓存</text>
<text x="570" y="235" class="tiny">redis.setex(bizKey, 3600, "1");</text>
<text x="570" y="256" class="tiny">return SUCCESS;</text>
<text x="560" y="273" class="tiny">} catch (DuplicateKeyException) {</text>
<text x="570" y="290" class="tiny">return SUCCESS; // 唯一索引冲突=已处理</text>
<text x="560" y="307" class="tiny">}</text>
<text x="690" y="330" text-anchor="middle" class="tiny" fill="#2e7d32">✓ 数据库兜底，确保100%可靠</text>
<rect x="50" y="200" width="180" height="140" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="6"/>
<text x="140" y="225" text-anchor="middle" class="label" font-weight="bold">方案优势</text>
<circle cx="65" cy="248" r="3" fill="#2e7d32"/>
<text x="75" y="252" class="tiny">性能：Redis 快速过滤</text>
<circle cx="65" cy="268" r="3" fill="#2e7d32"/>
<text x="75" y="272" class="tiny">可靠：DB 唯一索引保证</text>
<circle cx="65" cy="288" r="3" fill="#2e7d32"/>
<text x="75" y="292" class="tiny">容灾：Redis 挂了仍可用</text>
<circle cx="65" cy="308" r="3" fill="#2e7d32"/>
<text x="75" y="312" class="tiny">原子：事务保证一致性</text>
<circle cx="65" cy="328" r="3" fill="#2e7d32"/>
<text x="75" y="332" class="tiny">过期：Redis 自动清理缓存</text>
</svg>

**4. 完整代码示例**

**数据库表设计：**
```sql
-- 幂等记录表
CREATE TABLE idempotent_record (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    biz_key VARCHAR(128) NOT NULL COMMENT '业务唯一键',
    biz_type VARCHAR(32) NOT NULL COMMENT '业务类型：ORDER/PAYMENT',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '处理状态',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_biz_key (biz_key),           -- 核心：唯一索引
    INDEX idx_create_time (create_time)
) COMMENT='消息幂等记录表';
```

**消费者幂等处理实现：**
```java
@Service
@Slf4j
public class IdempotentMessageConsumer implements MessageListenerConcurrently {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private IdempotentRecordMapper idempotentRecordMapper;

    @Autowired
    private OrderService orderService;

    private static final String IDEMPOTENT_PREFIX = "idempotent:";
    private static final int CACHE_EXPIRE_SECONDS = 3600;

    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs,
            ConsumeConcurrentlyContext context) {

        for (MessageExt msg : msgs) {
            try {
                // 1. 提取业务唯一键
                String bizKey = extractBizKey(msg);
                if (bizKey == null) {
                    log.error("无法提取业务唯一键: {}", msg);
                    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS; // 无法重试，直接返回
                }

                // 2. 幂等性检查并处理
                if (processIdempotent(bizKey, msg)) {
                    log.info("消息处理成功: {}", bizKey);
                } else {
                    log.info("消息已处理过，幂等返回: {}", bizKey);
                }

            } catch (Exception e) {
                log.error("消息处理异常", e);
                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
            }
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }

    /**
     * 幂等性处理核心方法
     */
    private boolean processIdempotent(String bizKey, MessageExt msg) {
        String cacheKey = IDEMPOTENT_PREFIX + bizKey;

        // Step 1: Redis 快速检查（性能优化）
        if (Boolean.TRUE.equals(redisTemplate.hasKey(cacheKey))) {
            log.info("Redis 缓存命中，消息已处理: {}", bizKey);
            return false; // 已处理，幂等返回
        }

        // Step 2: 数据库事务处理（可靠性保证）
        return processWithTransaction(bizKey, msg, cacheKey);
    }

    /**
     * 数据库事务处理
     */
    @Transactional(rollbackFor = Exception.class)
    public boolean processWithTransaction(String bizKey, MessageExt msg, String cacheKey) {
        try {
            // 2.1 插入幂等记录（利用唯一索引防重）
            IdempotentRecord record = new IdempotentRecord();
            record.setBizKey(bizKey);
            record.setBizType("ORDER");
            record.setStatus(1);
            idempotentRecordMapper.insert(record);

            // 2.2 执行业务逻辑
            String body = new String(msg.getBody(), StandardCharsets.UTF_8);
            orderService.createOrder(body);

            // 2.3 写入 Redis 缓存（加速后续请求）
            redisTemplate.opsForValue().set(
                    cacheKey,
                    "1",
                    CACHE_EXPIRE_SECONDS,
                    TimeUnit.SECONDS
            );

            log.info("业务处理成功: {}", bizKey);
            return true;

        } catch (DuplicateKeyException e) {
            // 唯一索引冲突 = 已处理过
            log.info("唯一索引冲突，消息已处理: {}", bizKey);
            // 补偿：回填 Redis 缓存
            redisTemplate.opsForValue().set(
                    cacheKey,
                    "1",
                    CACHE_EXPIRE_SECONDS,
                    TimeUnit.SECONDS
            );
            return false;
        }
    }

    /**
     * 提取业务唯一键
     */
    private String extractBizKey(MessageExt msg) {
        // 方式1：从 Keys 获取
        String keys = msg.getKeys();
        if (keys != null && !keys.isEmpty()) {
            return keys;
        }

        // 方式2：从消息体解析
        try {
            String body = new String(msg.getBody(), StandardCharsets.UTF_8);
            JSONObject json = JSON.parseObject(body);
            return json.getString("orderId"); // 根据实际业务调整
        } catch (Exception e) {
            log.error("解析消息体失败", e);
            return null;
        }
    }
}
```

**方案3：业务状态机实现（最优雅）**

```java
@Service
@Slf4j
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    /**
     * 支付订单 - 利用状态机保证幂等性
     */
    @Transactional(rollbackFor = Exception.class)
    public boolean payOrder(String orderId, PaymentInfo payment) {
        // 查询订单当前状态
        Order order = orderMapper.selectById(orderId);
        if (order == null) {
            throw new BusinessException("订单不存在");
        }

        // 状态机校验：只有待支付状态才能支付
        if (order.getStatus() != OrderStatus.WAIT_PAY) {
            if (order.getStatus() == OrderStatus.PAID) {
                // 已支付状态，幂等返回成功
                log.info("订单已支付，幂等返回: {}", orderId);
                return true;
            } else {
                throw new BusinessException("订单状态不允许支付: " + order.getStatus());
            }
        }

        // 执行支付逻辑
        processPayment(payment);

        // 更新订单状态：待支付 → 已支付
        // 使用乐观锁：WHERE status = WAIT_PAY
        int updated = orderMapper.updateStatus(
                orderId,
                OrderStatus.PAID,
                OrderStatus.WAIT_PAY  // 只有当前状态是待支付才更新
        );

        if (updated == 0) {
            // 并发场景：其他线程已经支付成功
            log.info("订单已被其他线程支付: {}", orderId);
            return true; // 幂等返回
        }

        log.info("订单支付成功: {}", orderId);
        return true;
    }
}

// Mapper SQL
// UPDATE t_order SET status = #{newStatus}, update_time = NOW()
// WHERE order_id = #{orderId} AND status = #{oldStatus}
```

**5. 不同方案的选择建议**

| 场景 | 推荐方案 | 理由 |
|------|---------|------|
| **高并发支付、扣款** | 数据库唯一索引 + Redis | 可靠性第一，Redis 加速 |
| **订单状态流转** | 业务状态机 | 业务语义清晰，天然幂等 |
| **前端重复提交** | Token 令牌 | 防止用户重复点击 |
| **低并发场景** | 数据库唯一索引 | 简单可靠 |
| **超高并发（秒杀）** | Redis + 异步补偿 | 性能优先 |

**关键要点：**

1. ✅ **幂等性的核心是业务唯一标识（bizKey）**
2. ✅ **数据库唯一索引是最可靠的幂等性保证**
3. ✅ **Redis 缓存可以大幅提升性能（99% 请求快速返回）**
4. ✅ **业务状态机是最优雅的幂等性设计**
5. ✅ **查询和记录处理状态必须在同一事务中**
6. ✅ **幂等性检查应该尽早进行（拦截在最外层）**
7. ✅ **设置合理的缓存过期时间，避免数据无限增长**

**记忆口诀：**

```
幂等设计有四招，场景不同方案挑
唯一索引最可靠，数据库来做依靠

Redis 缓存速度快，高并发时不可少
双重保障配合用，性能可靠都做到

状态机设计最优雅，业务语义要清晰
Token 机制防重复，前端提交有奇效

核心要点记心间，业务唯一键为先
查询记录同事务，幂等设计才安全
```

### 42. 什么是消息的唯一标识（MessageId 和 Key）？

**核心答案：**

RocketMQ 提供了两种消息标识：

1. **MessageId（消息ID）**：
   - **系统自动生成**的全局唯一标识
   - 格式：`Broker地址 + 物理偏移量`
   - **不适合做业务去重**（网络重传时会变化）
   - 用于消息追踪和问题排查

2. **Keys（业务键）**：
   - **业务自定义**的唯一标识
   - 支持多个 Key（用空格分隔）
   - **适合做业务去重和消息查询**
   - RocketMQ 会为 Keys 建立哈希索引，支持快速查询

**详细说明：**

**1. MessageId 的生成机制**

<svg viewBox="0 0 850 280" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;}.label{font:14px sans-serif;}.small{font:12px sans-serif;}.tiny{font:11px sans-serif;}</style><marker id="arrow4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
<text x="425" y="25" text-anchor="middle" class="title">MessageId 生成流程</text>
<rect x="50" y="50" width="750" height="210" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8"/>
<text x="425" y="75" text-anchor="middle" class="label" font-weight="bold" fill="#1976d2">MessageId 组成：客户端地址 + 进程PID + 序列号 + 时间戳</text>
<rect x="70" y="90" width="710" height="40" fill="#fff9c4" stroke="#f9a825" stroke-width="1" rx="4"/>
<text x="80" y="110" class="tiny" font-family="monospace">MessageId: C0A8010F00002A9F0000000000000000</text>
<text x="80" y="125" class="tiny" font-family="monospace">         └─────┬─────┘└─┬─┘└────┬────┘</text>
<path d="M 150 130 L 150 150" stroke="#c62828" stroke-width="2" marker-end="url(#arrow4)"/>
<text x="150" y="170" text-anchor="middle" class="tiny" fill="#c62828">客户端IP</text>
<text x="150" y="185" text-anchor="middle" class="tiny" fill="#666">(C0A8010F=</text>
<text x="150" y="200" text-anchor="middle" class="tiny" fill="#666">192.168.1.15)</text>
<path d="M 350 130 L 350 150" stroke="#2e7d32" stroke-width="2" marker-end="url(#arrow4)"/>
<text x="350" y="170" text-anchor="middle" class="tiny" fill="#2e7d32">进程PID</text>
<text x="350" y="185" text-anchor="middle" class="tiny" fill="#666">(2A9F=</text>
<text x="350" y="200" text-anchor="middle" class="tiny" fill="#666">10911)</text>
<path d="M 550 130 L 550 150" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow4)"/>
<text x="550" y="170" text-anchor="middle" class="tiny" fill="#1976d2">自增序列号</text>
<text x="550" y="185" text-anchor="middle" class="tiny" fill="#666">(00000000=</text>
<text x="550" y="200" text-anchor="middle" class="tiny" fill="#666">第0条消息)</text>
<text x="70" y="230" class="small" font-weight="bold" fill="#c62828">⚠️ 关键问题：网络重传时 MessageId 会变化</text>
<text x="90" y="250" class="tiny">Producer 发送失败重试时，会生成新的 MessageId</text>
<text x="90" y="267" class="tiny">因此 MessageId 不适合用于业务去重！</text>
</svg>

**2. Keys 的使用方式**

<svg viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;}.label{font:14px sans-serif;}.small{font:12px sans-serif;}.tiny{font:11px sans-serif;}</style></defs>
<text x="450" y="25" text-anchor="middle" class="title">Keys（业务键）使用方式</text>
<rect x="30" y="50" width="410" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="8"/>
<text x="235" y="75" text-anchor="middle" class="label" font-weight="bold" fill="#388e3c">1. 单个 Key（推荐）</text>
<rect x="50" y="90" width="370" height="80" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="60" y="108" class="tiny" font-family="monospace">Message msg = new Message(</text>
<text x="70" y="125" class="tiny" font-family="monospace">"TopicOrder",</text>
<text x="70" y="142" class="tiny" font-family="monospace">"TagA",</text>
<text x="70" y="159" class="tiny" font-family="monospace">body</text>
<text x="60" y="176" class="tiny" font-family="monospace">);</text>
<text x="60" y="195" class="tiny" font-weight="bold">msg.setKeys("ORDER12345");  // 订单号</text>
<text x="235" y="220" text-anchor="middle" class="tiny" fill="#2e7d32">✓ 用于幂等性去重、消息查询</text>
<rect x="460" y="50" width="410" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="8"/>
<text x="665" y="75" text-anchor="middle" class="label" font-weight="bold" fill="#f57c00">2. 多个 Keys（可选）</text>
<rect x="480" y="90" width="370" height="100" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="490" y="108" class="tiny" font-family="monospace">// 使用空格分隔多个 Key</text>
<text x="490" y="125" class="tiny" font-family="monospace">String keys = orderId + " "</text>
<text x="510" y="142" class="tiny" font-family="monospace">+ userId + " "</text>
<text x="510" y="159" class="tiny" font-family="monospace">+ productId;</text>
<text x="490" y="180" class="tiny" font-family="monospace">msg.setKeys(keys);</text>
<text x="665" y="205" text-anchor="middle" class="tiny" fill="#666">// "ORD123 USER456 PROD789"</text>
<text x="665" y="222" text-anchor="middle" class="tiny" fill="#f57c00">支持多维度查询（按订单/用户/商品）</text>
<rect x="30" y="250" width="840" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8"/>
<text x="450" y="275" text-anchor="middle" class="label" font-weight="bold" fill="#1976d2">3. Keys 的索引机制（IndexFile）</text>
<rect x="50" y="290" width="380" height="120" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="60" y="310" class="tiny" font-weight="bold">存储层面：</text>
<text x="70" y="330" class="tiny">1. Broker 收到消息后，提取 Keys</text>
<text x="70" y="350" class="tiny">2. 为每个 Key 计算哈希值</text>
<text x="70" y="370" class="tiny">3. 写入 IndexFile（哈希索引文件）</text>
<text x="70" y="390" class="tiny">4. 支持通过 Key 快速定位消息</text>
<rect x="470" y="290" width="380" height="120" fill="#fff" stroke="#666" stroke-width="1" rx="4"/>
<text x="480" y="310" class="tiny" font-weight="bold">查询示例：</text>
<text x="490" y="330" class="tiny" font-family="monospace">// 控制台查询</text>
<text x="490" y="350" class="tiny" font-family="monospace">sh mqadmin queryMsgByKey \</text>
<text x="500" y="370" class="tiny" font-family="monospace">-n localhost:9876 \</text>
<text x="500" y="390" class="tiny" font-family="monospace">-t TopicOrder -k ORDER12345</text>
<text x="450" y="422" text-anchor="middle" class="tiny" fill="#2e7d32">✓ 毫秒级查询：在海量消息中快速定位</text>
</svg>

**3. MessageId vs Keys 对比**

<svg viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;}.label{font:14px sans-serif;}.small{font:12px sans-serif;}.tiny{font:11px sans-serif;}</style></defs>
<text x="450" y="25" text-anchor="middle" class="title">MessageId vs Keys 全面对比</text>
<rect x="50" y="50" width="800" height="40" fill="#1976d2" stroke="#1976d2" stroke-width="2" rx="4"/>
<text x="150" y="75" text-anchor="middle" class="label" fill="#fff" font-weight="bold">对比维度</text>
<text x="380" y="75" text-anchor="middle" class="label" fill="#fff" font-weight="bold">MessageId（系统生成）</text>
<text x="680" y="75" text-anchor="middle" class="label" fill="#fff" font-weight="bold">Keys（业务自定义）</text>
<rect x="50" y="90" width="200" height="40" fill="#f5f5f5" stroke="#ccc"/>
<text x="150" y="115" text-anchor="middle" class="small" font-weight="bold">生成方式</text>
<rect x="250" y="90" width="260" height="40" fill="#fff" stroke="#ccc"/>
<text x="380" y="115" text-anchor="middle" class="tiny">系统自动生成，无需干预</text>
<rect x="510" y="90" width="340" height="40" fill="#fff" stroke="#ccc"/>
<text x="680" y="115" text-anchor="middle" class="tiny">业务代码设置，需手动指定</text>
<rect x="50" y="130" width="200" height="40" fill="#f5f5f5" stroke="#ccc"/>
<text x="150" y="155" text-anchor="middle" class="small" font-weight="bold">唯一性</text>
<rect x="250" y="130" width="260" height="40" fill="#fff" stroke="#ccc"/>
<text x="380" y="155" text-anchor="middle" class="tiny">全局唯一（同一消息每次不同）</text>
<rect x="510" y="130" width="340" height="40" fill="#fff" stroke="#ccc"/>
<text x="680" y="155" text-anchor="middle" class="tiny">业务唯一（同一业务始终相同）</text>
<rect x="50" y="170" width="200" height="60" fill="#f5f5f5" stroke="#ccc"/>
<text x="150" y="195" text-anchor="middle" class="small" font-weight="bold">重传行为</text>
<text x="150" y="215" text-anchor="middle" class="tiny">(Producer 重试)</text>
<rect x="250" y="170" width="260" height="60" fill="#ffebee" stroke="#ccc"/>
<text x="380" y="195" text-anchor="middle" class="tiny" fill="#c62828">❌ 每次重传生成新 ID</text>
<text x="380" y="215" text-anchor="middle" class="tiny" fill="#c62828">不适合去重</text>
<rect x="510" y="170" width="340" height="60" fill="#e8f5e9" stroke="#ccc"/>
<text x="680" y="195" text-anchor="middle" class="tiny" fill="#2e7d32">✅ 重传时保持不变</text>
<text x="680" y="215" text-anchor="middle" class="tiny" fill="#2e7d32">适合去重</text>
<rect x="50" y="230" width="200" height="40" fill="#f5f5f5" stroke="#ccc"/>
<text x="150" y="255" text-anchor="middle" class="small" font-weight="bold">查询支持</text>
<rect x="250" y="230" width="260" height="40" fill="#fff" stroke="#ccc"/>
<text x="380" y="255" text-anchor="middle" class="tiny">✅ 支持精确查询</text>
<rect x="510" y="230" width="340" height="40" fill="#fff" stroke="#ccc"/>
<text x="680" y="255" text-anchor="middle" class="tiny">✅ 支持精确查询（哈希索引）</text>
<rect x="50" y="270" width="200" height="40" fill="#f5f5f5" stroke="#ccc"/>
<text x="150" y="295" text-anchor="middle" class="small" font-weight="bold">数量限制</text>
<rect x="250" y="270" width="260" height="40" fill="#fff" stroke="#ccc"/>
<text x="380" y="295" text-anchor="middle" class="tiny">每条消息 1 个</text>
<rect x="510" y="270" width="340" height="40" fill="#fff" stroke="#ccc"/>
<text x="680" y="295" text-anchor="middle" class="tiny">每条消息可设置多个（空格分隔）</text>
<rect x="50" y="310" width="200" height="60" fill="#f5f5f5" stroke="#ccc"/>
<text x="150" y="335" text-anchor="middle" class="small" font-weight="bold">主要用途</text>
<rect x="250" y="310" width="260" height="60" fill="#fff" stroke="#ccc"/>
<text x="380" y="330" text-anchor="middle" class="tiny">• 消息追踪</text>
<text x="380" y="350" text-anchor="middle" class="tiny">• 问题排查</text>
<rect x="510" y="310" width="340" height="60" fill="#fff" stroke="#ccc"/>
<text x="680" y="330" text-anchor="middle" class="tiny">• 业务去重（幂等性）</text>
<text x="680" y="350" text-anchor="middle" class="tiny">• 业务查询（订单号、用户ID）</text>
<rect x="50" y="370" width="200" height="60" fill="#f5f5f5" stroke="#ccc"/>
<text x="150" y="395" text-anchor="middle" class="small" font-weight="bold">推荐使用场景</text>
<rect x="250" y="370" width="260" height="60" fill="#fff3e0" stroke="#ccc"/>
<text x="380" y="390" text-anchor="middle" class="tiny">⚠️ 不推荐业务去重</text>
<text x="380" y="410" text-anchor="middle" class="tiny">仅用于监控和问题定位</text>
<rect x="510" y="370" width="340" height="60" fill="#e8f5e9" stroke="#ccc"/>
<text x="680" y="390" text-anchor="middle" class="tiny">✅ 强烈推荐业务去重</text>
<text x="680" y="410" text-anchor="middle" class="tiny">生产环境必须设置</text>
</svg>

**4. 代码示例**

**生产者设置 Keys：**

```java
@Service
@Slf4j
public class OrderMessageProducer {

    @Autowired
    private DefaultMQProducer producer;

    /**
     * 发送订单消息 - 正确设置 Keys
     */
    public SendResult sendOrderMessage(OrderDTO order) throws Exception {
        // 1. 构造消息体
        String body = JSON.toJSONString(order);

        Message msg = new Message(
                "TopicOrder",           // Topic
                "TagCreateOrder",       // Tag
                body.getBytes(StandardCharsets.UTF_8)
        );

        // 2. 设置业务唯一键（重要！）
        // 推荐：使用业务主键作为 Key
        msg.setKeys(order.getOrderId());

        // 3. 如果需要多维度查询，可以设置多个 Key
        // String keys = order.getOrderId() + " " + order.getUserId();
        // msg.setKeys(keys);

        // 4. 发送消息
        SendResult result = producer.send(msg);

        log.info("消息发送成功, MsgId={}, Keys={}, Status={}",
                result.getMsgId(),           // 系统生成的 MessageId
                msg.getKeys(),               // 业务设置的 Keys
                result.getSendStatus());

        return result;
    }
}
```

**消费者提取 Keys：**

```java
@Service
@Slf4j
public class OrderMessageConsumer implements MessageListenerConcurrently {

    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs,
            ConsumeConcurrentlyContext context) {

        for (MessageExt msg : msgs) {
            // 1. 获取系统 MessageId（用于日志追踪）
            String msgId = msg.getMsgId();

            // 2. 获取业务 Keys（用于幂等性去重）
            String bizKey = msg.getKeys();

            log.info("收到消息: MsgId={}, Keys={}", msgId, bizKey);

            try {
                // 3. 使用 Keys 进行幂等性检查
                if (isProcessed(bizKey)) {
                    log.info("消息已处理，幂等返回: {}", bizKey);
                    continue;
                }

                // 4. 处理业务逻辑
                processOrder(bizKey, msg);

            } catch (Exception e) {
                log.error("消息处理失败, MsgId={}, Keys={}", msgId, bizKey, e);
                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
            }
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
}
```

**通过 Keys 查询消息：**

```java
/**
 * 通过业务 Key 查询消息
 */
public void queryMessageByKey() {
    DefaultMQAdminExt admin = new DefaultMQAdminExt();
    admin.setNamesrvAddr("localhost:9876");

    try {
        admin.start();

        // 通过 Key 查询消息
        QueryResult result = admin.queryMessage(
                "TopicOrder",          // Topic
                "ORDER12345",          // Key
                32,                    // 最大返回条数
                0,                     // 开始时间（0表示不限）
                Long.MAX_VALUE         // 结束时间
        );

        log.info("查询到 {} 条消息", result.getMessageList().size());
        for (MessageExt msg : result.getMessageList()) {
            log.info("MsgId={}, Keys={}, Body={}",
                    msg.getMsgId(),
                    msg.getKeys(),
                    new String(msg.getBody()));
        }

    } catch (Exception e) {
        log.error("查询消息失败", e);
    } finally {
        admin.shutdown();
    }
}
```

**5. 最佳实践**

| 实践 | 说明 | 示例 |
|------|------|------|
| ✅ **必须设置 Keys** | 生产环境强制要求 | `msg.setKeys(orderId)` |
| ✅ **使用业务主键** | 订单号、支付流水号等 | `ORDER_20250101_123456` |
| ✅ **保证 Key 唯一** | 避免不同业务使用相同 Key | 加业务前缀：`ORDER_xxx` |
| ⚠️ **Keys 不要太长** | 建议不超过 128 字符 | 影响索引性能 |
| ⚠️ **多 Key 适度使用** | 太多会影响索引效率 | 建议不超过 3-5 个 |
| ❌ **不用 MessageId 去重** | 重传时会变化，不可靠 | 仅用于追踪和排查 |

**6. 实际场景示例**

```java
// 场景1：订单消息（单 Key）
msg.setKeys(order.getOrderId());
// Key: "ORDER20250101123456"

// 场景2：支付消息（单 Key）
msg.setKeys(payment.getPaymentId());
// Key: "PAY20250101234567"

// 场景3：用户行为消息（多 Key，支持多维度查询）
String keys = userId + " " + sessionId + " " + eventId;
msg.setKeys(keys);
// Keys: "USER123 SESSION456 EVENT789"
// 可以通过用户ID、会话ID、事件ID 任意一个查询

// 场景4：分布式事务消息（事务ID 作为 Key）
msg.setKeys(transactionId);
// Key: "TX20250101345678"
```

**关键要点：**

1. ✅ **MessageId 是系统生成的，网络重传时会变化，不适合业务去重**
2. ✅ **Keys 是业务自定义的，重传时不变，适合业务去重和查询**
3. ✅ **生产环境必须设置 Keys，使用业务唯一标识（如订单号）**
4. ✅ **Keys 支持多个（空格分隔），用于多维度查询**
5. ✅ **RocketMQ 为 Keys 建立哈希索引，支持毫秒级查询**
6. ✅ **幂等性去重应该使用 Keys，而不是 MessageId**
7. ✅ **Keys 的长度要适中，避免过长影响性能**

**记忆口诀：**

```
消息标识有两种，用途不同要分清
MessageId 系统生，重传变化不可靠

Keys 才是业务键，订单流水来充当
重传不变很可靠，去重查询都靠它

生产环境必须设，业务唯一是首选
多个 Key 空格分，查询索引毫秒间

MessageId 用追踪，Keys 用于去重行
搞清区别用对了，消息系统才安稳
```

**常见错误示例：**

```java
// ❌ 错误：使用 MessageId 去重（重传时会变化）
String messageId = msg.getMsgId();
if (isDuplicate(messageId)) {  // 无法防止重复！
    return;
}

// ✅ 正确：使用 Keys 去重
String bizKey = msg.getKeys();
if (isDuplicate(bizKey)) {     // 可以防止重复
    return;
}

// ❌ 错误：Keys 设置不当
msg.setKeys(UUID.randomUUID().toString());  // 每次都不同，失去意义

// ✅ 正确：Keys 使用业务唯一标识
msg.setKeys(order.getOrderId());  // 同一订单始终相同
```
## 事务消息

### 43. 什么是事务消息？

**核心答案**

事务消息是RocketMQ提供的一种**保证本地事务和消息发送最终一致性**的机制。它能确保：本地事务执行成功，消息一定能被发送；本地事务执行失败，消息一定不会被发送。

**详细说明**

1. **解决的问题**
   - 分布式事务的最终一致性问题
   - 避免"消息发送成功但本地事务失败"或"本地事务成功但消息发送失败"的情况

2. **实现原理**
   - 采用"半消息（Half Message）"机制
   - 消息先发送但对消费者不可见
   - 等待本地事务执行结果
   - 根据结果决定提交或回滚消息

3. **典型场景**

   <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
         <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb"/>
       </marker>
     </defs>
     <rect x="50" y="80" width="120" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
     <text x="110" y="125" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e40af">订单服务</text>
     <rect x="340" y="80" width="120" height="80" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
     <text x="400" y="115" text-anchor="middle" font-size="16" font-weight="bold" fill="#92400e">RocketMQ</text>
     <text x="400" y="135" text-anchor="middle" font-size="14" fill="#92400e">事务消息</text>
     <rect x="630" y="80" width="120" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
     <text x="690" y="125" text-anchor="middle" font-size="16" font-weight="bold" fill="#166534">库存服务</text>
     <line x1="170" y1="120" x2="330" y2="120" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead)"/>
     <text x="250" y="110" text-anchor="middle" font-size="14" fill="#1e40af">1. 发送半消息</text>
     <rect x="30" y="180" width="160" height="60" fill="#e0f2fe" stroke="#0284c7" stroke-width="1" rx="3"/>
     <text x="110" y="205" text-anchor="middle" font-size="14" fill="#0c4a6e">2. 执行本地事务</text>
     <text x="110" y="225" text-anchor="middle" font-size="13" fill="#0c4a6e">(扣减账户余额)</text>
     <line x1="170" y1="250" x2="330" y2="140" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowhead)"/>
     <text x="220" y="180" text-anchor="middle" font-size="14" fill="#166534">3. 提交/回滚</text>
     <line x1="460" y1="120" x2="620" y2="120" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowhead)"/>
     <text x="540" y="110" text-anchor="middle" font-size="14" fill="#166534">4. 消费消息</text>
     <rect x="610" y="180" width="160" height="60" fill="#dcfce7" stroke="#16a34a" stroke-width="1" rx="3"/>
     <text x="690" y="205" text-anchor="middle" font-size="14" fill="#166534">5. 执行业务逻辑</text>
     <text x="690" y="225" text-anchor="middle" font-size="13" fill="#166534">(扣减库存)</text>
     <rect x="300" y="280" width="200" height="80" fill="#fef9c3" stroke="#ca8a04" stroke-width="2" rx="5"/>
     <text x="400" y="310" text-anchor="middle" font-size="14" font-weight="bold" fill="#713f12">如果长时间未收到结果</text>
     <line x1="400" y1="160" x2="400" y2="270" stroke="#ca8a04" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
     <text x="420" y="225" text-anchor="start" font-size="13" fill="#713f12">触发回查</text>
     <line x1="300" y1="320" x2="180" y2="320" stroke="#ca8a04" stroke-width="2" marker-end="url(#arrowhead)"/>
     <text x="240" y="310" text-anchor="middle" font-size="13" fill="#713f12">6. 回查事务状态</text>
   </svg>

**关键要点**

- **两阶段提交**：先发半消息，再根据本地事务结果提交或回滚
- **回查机制**：若长时间未收到本地事务结果，Broker会主动回查
- **最终一致性**：保证本地事务和消息发送的一致性
- **异步解耦**：上游服务无需等待下游服务处理完成

**记忆口诀**

```
半消息先发不可见
本地事务来决断
成功提交失败滚
超时回查保平安
```

### 44. RocketMQ 如何实现事务消息？

**核心答案:**

RocketMQ 通过**半消息机制 + 本地事务 + 事务状态回查**实现事务消息,保证本地事务与消息发送的最终一致性。

**详细说明:**

事务消息实现分为三个关键阶段:

**1. 发送半消息(Half Message)**
- Producer 先发送一条半消息到 Broker
- 半消息对 Consumer 不可见,存储在系统特殊 Topic(RMQ_SYS_TRANS_HALF_TOPIC)
- Broker 返回发送结果给 Producer

**2. 执行本地事务**
- Producer 收到半消息发送成功响应后,执行本地事务
- 本地事务执行完成后返回三种状态之一:
  - **COMMIT_MESSAGE**: 提交事务,消息对 Consumer 可见
  - **ROLLBACK_MESSAGE**: 回滚事务,删除半消息
  - **UNKNOW**: 状态未知,等待回查

**3. 事务状态回查**
- 如果 Broker 长时间未收到事务状态(网络异常/Producer 宕机等)
- Broker 主动回查 Producer 的本地事务状态
- Producer 检查本地事务执行结果,返回 COMMIT 或 ROLLBACK
- 回查有最大次数限制(默认 15 次),超过则默认回滚

**执行流程图:**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
<rect x="50" y="50" width="120" height="60" fill="#4A90E2" stroke="#333" stroke-width="2" rx="5"/>
<text x="110" y="85" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Producer</text>
<rect x="340" y="50" width="120" height="60" fill="#50C878" stroke="#333" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Broker</text>
<rect x="630" y="50" width="120" height="60" fill="#E8B923" stroke="#333" stroke-width="2" rx="5"/>
<text x="690" y="85" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Consumer</text>
<line x1="170" y1="80" x2="335" y2="80" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="250" y="70" text-anchor="middle" font-size="12" fill="#E74C3C">①发送半消息</text>
<line x1="335" y1="100" x2="175" y2="100" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="255" y="120" text-anchor="middle" font-size="12" fill="#27AE60">②返回成功</text>
<rect x="50" y="150" width="120" height="80" fill="#F39C12" stroke="#333" stroke-width="2" rx="5"/>
<text x="110" y="175" text-anchor="middle" fill="white" font-size="12" font-weight="bold">执行本地事务</text>
<text x="110" y="195" text-anchor="middle" fill="white" font-size="11">扣款/订单等</text>
<text x="110" y="215" text-anchor="middle" fill="white" font-size="11">业务操作</text>
<line x1="170" y1="190" x2="335" y2="150" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="240" y="165" text-anchor="middle" font-size="11" fill="#8E44AD">③COMMIT</text>
<line x1="170" y1="190" x2="335" y2="190" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="250" y="185" text-anchor="middle" font-size="11" fill="#C0392B">④ROLLBACK</text>
<line x1="170" y1="210" x2="335" y2="230" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="240" y="235" text-anchor="middle" font-size="11" fill="#7F8C8D">⑤UNKNOWN</text>
<rect x="340" y="260" width="120" height="60" fill="#E67E22" stroke="#333" stroke-width="2" rx="5"/>
<text x="400" y="280" text-anchor="middle" fill="white" font-size="11" font-weight="bold">状态未知?</text>
<text x="400" y="300" text-anchor="middle" fill="white" font-size="10">启动回查</text>
<line x1="340" y1="290" x2="175" y2="290" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>
<text x="255" y="280" text-anchor="middle" font-size="11" fill="#2C3E50">⑥回查事务状态</text>
<line x1="170" y1="310" x2="335" y2="310" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>
<text x="250" y="330" text-anchor="middle" font-size="11" fill="#16A085">⑦返回状态</text>
<rect x="340" y="360" width="120" height="60" fill="#27AE60" stroke="#333" stroke-width="2" rx="5"/>
<text x="400" y="385" text-anchor="middle" fill="white" font-size="11" font-weight="bold">COMMIT</text>
<text x="400" y="405" text-anchor="middle" fill="white" font-size="10">消息可见</text>
<line x1="460" y1="390" x2="625" y2="390" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="540" y="380" text-anchor="middle" font-size="11" fill="#27AE60">⑧投递消息</text>
<rect x="340" y="450" width="120" height="60" fill="#C0392B" stroke="#333" stroke-width="2" rx="5"/>
<text x="400" y="475" text-anchor="middle" fill="white" font-size="11" font-weight="bold">ROLLBACK</text>
<text x="400" y="495" text-anchor="middle" fill="white" font-size="10">删除半消息</text>
<text x="50" y="550" font-size="12" fill="#7F8C8D">半消息 Topic: RMQ_SYS_TRANS_HALF_TOPIC (Consumer 不可见)</text>
<text x="50" y="575" font-size="12" fill="#7F8C8D">回查间隔: 60s, 最大次数: 15次</text>
</svg>

**关键要点:**

1. **半消息机制**: 消息先发送但对消费者不可见,保证先发后确认
2. **状态回查**: 解决网络异常、进程崩溃等导致的状态丢失问题
3. **最终一致性**: 通过重试回查机制保证事务状态最终确定
4. **三态设计**: COMMIT/ROLLBACK/UNKNOWN 覆盖所有事务执行场景
5. **特殊 Topic**: 半消息存储在系统 Topic,与普通消息隔离

**记忆口诀:**

```
半消息先发不可见
本地事务紧随后
状态返回三选一
回查机制兜底稳
```

### 45. 事务消息的执行流程是什么？

**核心答案:**

事务消息执行流程分为**正常流程**和**异常流程**两种场景,通过**发送半消息 → 执行本地事务 → 提交/回滚 → (异常时)回查补偿**四个步骤完成。

**详细说明:**

**正常流程(事务执行成功/失败):**

1. **发送半消息阶段**
   - Producer 调用 `sendMessageInTransaction()` 发送半消息
   - Broker 收到后存储到 `RMQ_SYS_TRANS_HALF_TOPIC`
   - 此时消息对 Consumer 不可见

2. **执行本地事务阶段**
   - Producer 收到半消息发送成功响应
   - 调用本地事务监听器 `executeLocalTransaction()` 方法
   - 执行业务逻辑(如扣款、创建订单等)

3. **提交事务状态阶段**
   - 本地事务执行成功:返回 `LocalTransactionState.COMMIT_MESSAGE`
   - 本地事务执行失败:返回 `LocalTransactionState.ROLLBACK_MESSAGE`
   - Broker 根据状态决定是否投递消息或删除半消息

**异常流程(网络故障/进程崩溃):**

4. **回查补偿阶段**
   - Broker 未收到事务状态确认(超时 6 秒)
   - 启动定时回查任务(默认 60 秒后开始)
   - 调用 `checkLocalTransaction()` 方法检查事务状态
   - Producer 查询本地事务表或业务状态,返回最终状态
   - 最多回查 15 次,超过则默认回滚

**时序图:**

<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
<marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#E74C3C"/>
</marker>
</defs>
<text x="450" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">事务消息完整执行流程</text>
<rect x="50" y="50" width="140" height="50" fill="#3498DB" stroke="#2C3E50" stroke-width="2" rx="5"/>
<text x="120" y="80" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Producer</text>
<rect x="280" y="50" width="140" height="50" fill="#2ECC71" stroke="#2C3E50" stroke-width="2" rx="5"/>
<text x="350" y="80" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Broker</text>
<rect x="510" y="50" width="140" height="50" fill="#9B59B6" stroke="#2C3E50" stroke-width="2" rx="5"/>
<text x="580" y="80" text-anchor="middle" fill="white" font-size="13" font-weight="bold">本地事务</text>
<rect x="740" y="50" width="140" height="50" fill="#E67E22" stroke="#2C3E50" stroke-width="2" rx="5"/>
<text x="810" y="80" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Consumer</text>
<line x1="120" y1="100" x2="120" y2="660" stroke="#3498DB" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="350" y1="100" x2="350" y2="660" stroke="#2ECC71" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="580" y1="100" x2="580" y2="660" stroke="#9B59B6" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="810" y1="100" x2="810" y2="660" stroke="#E67E22" stroke-width="2" stroke-dasharray="5,5"/>
<text x="20" y="140" font-size="12" font-weight="bold" fill="#E74C3C">阶段1</text>
<line x1="120" y1="150" x2="345" y2="150" stroke="#E74C3C" stroke-width="2" marker-end="url(#arrow-red)"/>
<text x="230" y="145" text-anchor="middle" font-size="11" fill="#E74C3C">①发送半消息</text>
<rect x="280" y="165" width="140" height="40" fill="#FFF5E6" stroke="#E67E22" stroke-width="1" rx="3"/>
<text x="350" y="185" text-anchor="middle" font-size="10" fill="#2C3E50">存储半消息到</text>
<text x="350" y="198" text-anchor="middle" font-size="9" fill="#E67E22">TRANS_HALF_TOPIC</text>
<line x1="345" y1="220" x2="125" y2="220" stroke="#27AE60" stroke-width="2" marker-end="url(#arrow)"/>
<text x="230" y="215" text-anchor="middle" font-size="11" fill="#27AE60">②返回发送成功</text>
<text x="20" y="260" font-size="12" font-weight="bold" fill="#9B59B6">阶段2</text>
<line x1="120" y1="270" x2="575" y2="270" stroke="#9B59B6" stroke-width="2" marker-end="url(#arrow)"/>
<text x="340" y="265" text-anchor="middle" font-size="11" fill="#9B59B6">③执行本地事务</text>
<rect x="510" y="285" width="140" height="60" fill="#F3E5F5" stroke="#9B59B6" stroke-width="1" rx="3"/>
<text x="580" y="305" text-anchor="middle" font-size="10" fill="#2C3E50">扣款/创建订单</text>
<text x="580" y="320" text-anchor="middle" font-size="10" fill="#2C3E50">写入事务记录表</text>
<text x="580" y="335" text-anchor="middle" font-size="10" fill="#9B59B6">返回 COMMIT/ROLLBACK</text>
<text x="20" y="380" font-size="12" font-weight="bold" fill="#27AE60">阶段3</text>
<line x1="575" y1="360" x2="125" y2="360" stroke="#8E44AD" stroke-width="2" marker-end="url(#arrow)"/>
<text x="340" y="355" text-anchor="middle" font-size="11" fill="#8E44AD">④返回事务状态</text>
<line x1="120" y1="390" x2="345" y2="390" stroke="#27AE60" stroke-width="2" marker-end="url(#arrow)"/>
<text x="230" y="385" text-anchor="middle" font-size="11" fill="#27AE60">⑤提交 COMMIT</text>
<rect x="280" y="405" width="140" height="40" fill="#E8F8F5" stroke="#27AE60" stroke-width="1" rx="3"/>
<text x="350" y="422" text-anchor="middle" font-size="10" fill="#2C3E50">转存到真实 Topic</text>
<text x="350" y="437" text-anchor="middle" font-size="10" fill="#27AE60">消息对 Consumer 可见</text>
<line x1="350" y1="460" x2="805" y2="460" stroke="#27AE60" stroke-width="2" marker-end="url(#arrow)"/>
<text x="570" y="455" text-anchor="middle" font-size="11" fill="#27AE60">⑥投递消息</text>
<rect x="50" y="490" width="800" height="2" fill="#BDC3C7"/>
<text x="20" y="525" font-size="12" font-weight="bold" fill="#E74C3C">异常流程</text>
<text x="450" y="525" text-anchor="middle" font-size="11" fill="#7F8C8D">(网络超时或进程崩溃,Broker 未收到状态)</text>
<rect x="280" y="540" width="140" height="40" fill="#FFEBEE" stroke="#E74C3C" stroke-width="1" rx="3"/>
<text x="350" y="558" text-anchor="middle" font-size="10" fill="#E74C3C">60秒后启动回查</text>
<text x="350" y="572" text-anchor="middle" font-size="9" fill="#7F8C8D">(最多回查15次)</text>
<line x1="350" y1="590" x2="125" y2="590" stroke="#E74C3C" stroke-width="2" marker-end="url(#arrow-red)" stroke-dasharray="5,5"/>
<text x="230" y="585" text-anchor="middle" font-size="11" fill="#E74C3C">⑦回查事务状态</text>
<line x1="120" y1="610" x2="575" y2="610" stroke="#95A5A6" stroke-width="2" marker-end="url(#arrow)" stroke-dasharray="5,5"/>
<text x="340" y="605" text-anchor="middle" font-size="11" fill="#95A5A6">⑧查询事务表</text>
<line x1="575" y1="635" x2="125" y2="635" stroke="#27AE60" stroke-width="2" marker-end="url(#arrow)" stroke-dasharray="5,5"/>
<text x="340" y="630" text-anchor="middle" font-size="11" fill="#27AE60">⑨返回最终状态</text>
</svg>

**关键要点:**

1. **半消息隔离**: 未确认的消息存储在系统 Topic,确保消费者不会提前消费
2. **状态三分法**: COMMIT(提交)、ROLLBACK(回滚)、UNKNOW(未知,触发回查)
3. **回查时机**: 首次回查间隔 60 秒,之后每 60 秒重试一次
4. **回查限制**: 最多回查 15 次,超过次数默认回滚并记录日志
5. **幂等保证**: 回查方法需要保证幂等性,多次调用返回相同结果

**记忆口诀:**

```
半消息发送先占位
本地事务紧跟随
状态提交二选一
回查机制保兜底
```

### 46. 什么是事务消息的回查机制？

**核心答案:**

回查机制是 RocketMQ 事务消息的**兜底补偿机制**,当 Broker 长时间未收到事务状态确认时,会主动回查 Producer 的本地事务执行结果,确保事务消息最终达到一致状态。

**详细说明:**

**1. 触发条件**

回查机制在以下情况下触发:
- **网络异常**: Producer 发送事务状态时网络中断
- **Producer 宕机**: 本地事务执行后进程崩溃
- **返回 UNKNOW**: Producer 主动返回未知状态
- **超时未响应**: Broker 6 秒内未收到任何状态响应

**2. 回查流程**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">事务消息回查机制</text>
<rect x="50" y="60" width="700" height="80" fill="#FFEBEE" stroke="#E74C3C" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#E74C3C">触发条件</text>
<text x="400" y="105" text-anchor="middle" font-size="11" fill="#2C3E50">Broker 6 秒内未收到事务状态 OR Producer 返回 UNKNOW</text>
<text x="400" y="125" text-anchor="middle" font-size="11" fill="#7F8C8D">→ 60 秒后启动首次回查</text>
<rect x="50" y="170" width="200" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="150" y="195" text-anchor="middle" font-size="12" font-weight="bold" fill="#2196F3">Broker</text>
<text x="150" y="215" text-anchor="middle" font-size="10" fill="#2C3E50">定时扫描半消息</text>
<path d="M 250 200 L 340 200" stroke="#E74C3C" stroke-width="2" marker-end="url(#arr)"/>
<text x="295" y="190" text-anchor="middle" font-size="10" fill="#E74C3C">回查请求</text>
<rect x="340" y="170" width="200" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="440" y="195" text-anchor="middle" font-size="12" font-weight="bold" fill="#FF9800">Producer</text>
<text x="440" y="215" text-anchor="middle" font-size="10" fill="#2C3E50">checkLocalTransaction()</text>
<path d="M 540 200 L 630 200" stroke="#9C27B0" stroke-width="2" marker-end="url(#arr)"/>
<text x="585" y="190" text-anchor="middle" font-size="10" fill="#9C27B0">查询事务表</text>
<rect x="630" y="170" width="120" height="60" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="690" y="195" text-anchor="middle" font-size="11" font-weight="bold" fill="#9C27B0">本地事务表</text>
<text x="690" y="215" text-anchor="middle" font-size="9" fill="#2C3E50">事务执行结果</text>
<path d="M 630 200 L 545 200" stroke="#4CAF50" stroke-width="2" marker-end="url(#arr)"/>
<text x="587" y="225" text-anchor="middle" font-size="10" fill="#4CAF50">返回状态</text>
<path d="M 340 200 L 255 200" stroke="#4CAF50" stroke-width="2" marker-end="url(#arr)"/>
<text x="297" y="225" text-anchor="middle" font-size="10" fill="#4CAF50">COMMIT/ROLLBACK</text>
<rect x="50" y="270" width="320" height="120" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="210" y="295" text-anchor="middle" font-size="12" font-weight="bold" fill="#4CAF50">回查成功</text>
<text x="210" y="315" text-anchor="middle" font-size="10" fill="#2C3E50">• COMMIT → 投递消息给 Consumer</text>
<text x="210" y="335" text-anchor="middle" font-size="10" fill="#2C3E50">• ROLLBACK → 删除半消息</text>
<text x="210" y="355" text-anchor="middle" font-size="10" fill="#2C3E50">• UNKNOW → 继续回查</text>
<text x="210" y="375" text-anchor="middle" font-size="9" fill="#7F8C8D">(60秒间隔,最多15次)</text>
<rect x="430" y="270" width="320" height="120" fill="#FFEBEE" stroke="#E74C3C" stroke-width="2" rx="5"/>
<text x="590" y="295" text-anchor="middle" font-size="12" font-weight="bold" fill="#E74C3C">回查失败</text>
<text x="590" y="315" text-anchor="middle" font-size="10" fill="#2C3E50">• 超过 15 次回查</text>
<text x="590" y="335" text-anchor="middle" font-size="10" fill="#2C3E50">• 默认执行 ROLLBACK</text>
<text x="590" y="355" text-anchor="middle" font-size="10" fill="#2C3E50">• 删除半消息</text>
<text x="590" y="375" text-anchor="middle" font-size="9" fill="#E74C3C">• 记录日志便于人工介入</text>
<rect x="50" y="420" width="700" height="100" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="400" y="445" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57F17">最佳实践</text>
<text x="400" y="465" text-anchor="middle" font-size="10" fill="#2C3E50">1. 本地事务必须记录到事务表(支持幂等查询)</text>
<text x="400" y="485" text-anchor="middle" font-size="10" fill="#2C3E50">2. checkLocalTransaction() 方法根据事务表返回状态</text>
<text x="400" y="505" text-anchor="middle" font-size="10" fill="#2C3E50">3. 避免在回查方法中执行耗时操作或重复执行业务逻辑</text>
</svg>

**3. 回查参数配置**

| 参数 | 默认值 | 说明 |
|-----|-------|------|
| `transactionTimeout` | 6秒 | 事务状态确认超时时间 |
| `transactionCheckInterval` | 60秒 | 回查间隔时间 |
| `transactionCheckMax` | 15次 | 最大回查次数 |

**4. 实现要点**

```java
// Producer 需要实现 TransactionListener 接口
public interface TransactionListener {
    // 执行本地事务(发送半消息后调用)
    LocalTransactionState executeLocalTransaction(Message msg, Object arg);

    // 回查本地事务状态(Broker 触发回查时调用)
    LocalTransactionState checkLocalTransaction(MessageExt msg);
}
```

**示例实现:**
```java
@Override
public LocalTransactionState checkLocalTransaction(MessageExt msg) {
    // 从消息中提取业务 ID
    String transId = msg.getTransactionId();

    // 查询本地事务表
    TransactionRecord record = transactionMapper.getByTransId(transId);

    if (record == null) {
        // 事务未执行或已回滚
        return LocalTransactionState.ROLLBACK_MESSAGE;
    }

    if (record.getStatus() == TransactionStatus.SUCCESS) {
        return LocalTransactionState.COMMIT_MESSAGE;
    } else if (record.getStatus() == TransactionStatus.FAILED) {
        return LocalTransactionState.ROLLBACK_MESSAGE;
    } else {
        // 事务执行中,继续回查
        return LocalTransactionState.UNKNOW;
    }
}
```

**关键要点:**

1. **兜底机制**: 解决网络异常、进程崩溃等导致的状态丢失问题
2. **定时回查**: 首次 60 秒后回查,之后每 60 秒重试,最多 15 次
3. **幂等性**: 回查方法必须幂等,不能重复执行业务逻辑
4. **事务表**: 需要本地事务表记录执行状态,支持回查
5. **兜底策略**: 超过最大回查次数默认回滚,需要人工介入

**记忆口诀:**

```
状态丢失不用慌
回查机制来补偿
六十秒后查一查
十五次后默认滚
事务表里记状态
幂等查询是关键
```

### 47. 事务消息的应用场景有哪些？

**核心答案:**

事务消息主要应用于**需要保证本地事务和消息发送原子性**的场景,典型应用包括:订单与支付、库存扣减与通知、积分赠送与记录、数据同步与审计等分布式事务场景。

**详细说明:**

**1. 电商订单场景**

**场景描述**: 用户下单后需要扣减库存并通知物流系统

<svg viewBox="0 0 850 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="a1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#E74C3C"/>
</marker>
<marker id="a2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#27AE60"/>
</marker>
</defs>
<text x="425" y="25" text-anchor="middle" font-size="15" font-weight="bold" fill="#2C3E50">场景1: 电商下单扣库存</text>
<rect x="50" y="60" width="180" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="140" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#2196F3">订单服务</text>
<text x="140" y="105" text-anchor="middle" font-size="10" fill="#2C3E50">本地事务:</text>
<text x="140" y="122" text-anchor="middle" font-size="9" fill="#2C3E50">1. 创建订单</text>
<text x="140" y="135" text-anchor="middle" font-size="9" fill="#2C3E50">2. 扣减库存</text>
<rect x="310" y="60" width="180" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#FF9800">RocketMQ</text>
<text x="400" y="105" text-anchor="middle" font-size="10" fill="#2C3E50">事务消息:</text>
<text x="400" y="122" text-anchor="middle" font-size="9" fill="#E74C3C">订单创建事件</text>
<rect x="570" y="60" width="180" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="660" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#4CAF50">物流服务</text>
<text x="660" y="105" text-anchor="middle" font-size="10" fill="#2C3E50">消费消息:</text>
<text x="660" y="122" text-anchor="middle" font-size="9" fill="#2C3E50">1. 创建物流单</text>
<text x="660" y="135" text-anchor="middle" font-size="9" fill="#2C3E50">2. 通知仓库发货</text>
<path d="M 230 100 L 305 100" stroke="#E74C3C" stroke-width="2" marker-end="url(#a1)"/>
<text x="267" y="90" text-anchor="middle" font-size="9" fill="#E74C3C">发送事务消息</text>
<path d="M 490 100 L 565 100" stroke="#27AE60" stroke-width="2" marker-end="url(#a2)"/>
<text x="527" y="90" text-anchor="middle" font-size="9" fill="#27AE60">订单创建成功</text>
<text x="140" y="165" font-size="10" fill="#E74C3C" font-weight="bold">✓ 保证一致性</text>
<text x="140" y="182" font-size="8" fill="#7F8C8D">库存扣减成功才发消息</text>
<text x="400" y="165" font-size="10" fill="#FF9800" font-weight="bold">✓ 可靠投递</text>
<text x="400" y="182" font-size="8" fill="#7F8C8D">消息不丢失</text>
<text x="660" y="165" font-size="10" fill="#4CAF50" font-weight="bold">✓ 异步解耦</text>
<text x="660" y="182" font-size="8" fill="#7F8C8D">不影响下单性能</text>
</svg>

**2. 支付与账户场景**

**场景描述**: 用户支付成功后扣减账户余额并发送支付成功通知

<svg viewBox="0 0 850 220" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="15" font-weight="bold" fill="#2C3E50">场景2: 支付扣款与通知</text>
<rect x="80" y="60" width="150" height="120" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="155" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#E91E63">支付服务</text>
<text x="155" y="102" text-anchor="middle" font-size="9" fill="#2C3E50">本地事务:</text>
<text x="155" y="118" text-anchor="middle" font-size="8" fill="#2C3E50">• 调用支付网关</text>
<text x="155" y="132" text-anchor="middle" font-size="8" fill="#2C3E50">• 扣减账户余额</text>
<text x="155" y="146" text-anchor="middle" font-size="8" fill="#2C3E50">• 记录支付流水</text>
<text x="155" y="165" text-anchor="middle" font-size="8" fill="#E91E63" font-weight="bold">↓ 事务消息</text>
<rect x="310" y="60" width="150" height="60" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="385" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#9C27B0">积分服务</text>
<text x="385" y="102" text-anchor="middle" font-size="9" fill="#2C3E50">消费消息:</text>
<text x="385" y="118" text-anchor="middle" font-size="8" fill="#2C3E50">• 赠送积分</text>
<rect x="310" y="135" width="150" height="60" fill="#E1F5FE" stroke="#03A9F4" stroke-width="2" rx="5"/>
<text x="385" y="157" text-anchor="middle" font-size="11" font-weight="bold" fill="#03A9F4">通知服务</text>
<text x="385" y="177" text-anchor="middle" font-size="9" fill="#2C3E50">消费消息:</text>
<text x="385" y="193" text-anchor="middle" font-size="8" fill="#2C3E50">• 发送短信/推送</text>
<rect x="540" y="60" width="150" height="60" fill="#FFF8E1" stroke="#FFC107" stroke-width="2" rx="5"/>
<text x="615" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#FFC107">营销服务</text>
<text x="615" y="102" text-anchor="middle" font-size="9" fill="#2C3E50">消费消息:</text>
<text x="615" y="118" text-anchor="middle" font-size="8" fill="#2C3E50">• 发放优惠券</text>
<rect x="540" y="135" width="150" height="60" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
<text x="615" y="157" text-anchor="middle" font-size="11" font-weight="bold" fill="#009688">风控服务</text>
<text x="615" y="177" text-anchor="middle" font-size="9" fill="#2C3E50">消费消息:</text>
<text x="615" y="193" text-anchor="middle" font-size="8" fill="#2C3E50">• 风险分析</text>
<path d="M 230 90 L 305 90" stroke="#9C27B0" stroke-width="2" marker-end="url(#a1)"/>
<path d="M 230 110 L 305 165" stroke="#03A9F4" stroke-width="2" marker-end="url(#a1)"/>
<path d="M 230 130 L 535 90" stroke="#FFC107" stroke-width="2" marker-end="url(#a1)"/>
<path d="M 230 150 L 535 165" stroke="#009688" stroke-width="2" marker-end="url(#a1)"/>
</svg>

**3. 数据同步场景**

| 场景 | 本地事务 | 事务消息 | 消费方 |
|------|---------|---------|--------|
| **用户注册** | 写入用户表 | 用户注册事件 | 权限服务初始化权限<br>积分服务创建账户<br>营销服务发送欢迎邮件 |
| **商品上架** | 更新商品状态 | 商品上架事件 | 搜索服务更新索引<br>推荐服务更新模型<br>缓存服务同步数据 |
| **价格变更** | 修改价格表 | 价格变更事件 | 促销服务调整策略<br>订单服务重新计算<br>通知服务推送用户 |

**4. 其他典型场景**

**分布式事务补偿**
- 跨服务的数据一致性保证
- 例: 转账场景(扣款成功后通知收款方)

**事件驱动架构**
- 核心业务变更触发多个下游系统响应
- 例: 订单状态变更(已支付 → 通知库存/物流/发票等)

**异步解耦**
- 主流程完成后异步触发其他操作
- 例: 文章发布(存储文章 → 生成索引/推送粉丝/统计分析)

**最佳实践建议:**

<svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#2C3E50">事务消息使用注意事项</text>
<rect x="50" y="50" width="700" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="400" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#4CAF50">✓ 适合场景</text>
<text x="400" y="90" text-anchor="middle" font-size="9" fill="#2C3E50">需要保证本地事务与消息发送原子性 | 允许消费端最终一致性 | 消费端支持幂等处理</text>
<rect x="50" y="125" width="700" height="60" fill="#FFEBEE" stroke="#E74C3C" stroke-width="2" rx="5"/>
<text x="400" y="145" text-anchor="middle" font-size="11" font-weight="bold" fill="#E74C3C">✗ 不适合场景</text>
<text x="400" y="165" text-anchor="middle" font-size="9" fill="#2C3E50">需要强一致性(实时同步) | 本地事务耗时过长(&gt;60秒) | 无法提供事务表支持回查</text>
<rect x="50" y="200" width="700" height="60" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="400" y="220" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57F17">⚠ 注意事项</text>
<text x="400" y="240" text-anchor="middle" font-size="9" fill="#2C3E50">本地事务记录到事务表 | 消费端实现幂等 | 回查方法不执行业务逻辑 | 监控回查失败率</text>
</svg>

**关键要点:**

1. **原子性保证**: 本地事务和消息发送要么都成功,要么都失败
2. **最终一致性**: 通过事务消息保证分布式系统数据最终一致
3. **异步解耦**: 主流程不阻塞,提升系统性能和可用性
4. **多方通知**: 一次本地事务可以触发多个下游系统处理
5. **可靠性**: 通过回查机制保证消息不丢失

**记忆口诀:**

```
订单支付要一致
库存扣减莫失误
事务消息来保证
本地消息都成功
异步通知多下游
最终一致有保障
```


## 延迟消息

### 48. 什么是延迟消息?

**核心答案:**

延迟消息是指消息发送到 Broker 后,不会立即被消费者消费,而是在指定的延迟时间后才能被消费的消息。

**详细说明:**

**1. 延迟消息特点**

<svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#34495E"/>
</marker>
</defs>
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">延迟消息执行流程</text>
<rect x="50" y="60" width="120" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="110" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">生产者</text>
<text x="110" y="105" text-anchor="middle" font-size="9" fill="#424242">发送延迟消息</text>
<rect x="240" y="60" width="140" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="310" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">Broker</text>
<text x="310" y="98" text-anchor="middle" font-size="9" fill="#424242">存储到延迟队列</text>
<text x="310" y="112" text-anchor="middle" font-size="9" fill="#D84315">⏱ 等待延迟时间</text>
<rect x="450" y="60" width="140" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="520" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">消费者</text>
<text x="520" y="98" text-anchor="middle" font-size="9" fill="#424242">延迟后消费</text>
<text x="520" y="112" text-anchor="middle" font-size="9" fill="#558B2F">处理业务逻辑</text>
<path d="M 170 90 L 235 90" stroke="#34495E" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="202" y="85" text-anchor="middle" font-size="9" fill="#E74C3C" font-weight="bold">t=0</text>
<path d="M 380 90 L 445 90" stroke="#34495E" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="412" y="85" text-anchor="middle" font-size="9" fill="#E74C3C" font-weight="bold">t=延迟时间</text>
<rect x="50" y="160" width="180" height="100" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="140" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#C2185B">特点1: 延迟投递</text>
<text x="140" y="200" font-size="9" fill="#424242">• 不立即投递给消费者</text>
<text x="140" y="216" font-size="9" fill="#424242">• 等待指定时间后投递</text>
<text x="140" y="232" font-size="9" fill="#424242">• 支持固定延迟级别</text>
<text x="140" y="248" font-size="9" fill="#424242">• 精确到秒级</text>
<rect x="270" y="160" width="180" height="100" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="360" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">特点2: 定时触发</text>
<text x="360" y="200" font-size="9" fill="#424242">• 适用于定时任务场景</text>
<text x="360" y="216" font-size="9" fill="#424242">• 订单超时取消</text>
<text x="360" y="232" font-size="9" fill="#424242">• 定时提醒通知</text>
<text x="360" y="248" font-size="9" fill="#424242">• 延迟重试</text>
<rect x="490" y="160" width="180" height="100" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
<text x="580" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#00695C">特点3: 存储隔离</text>
<text x="580" y="200" font-size="9" fill="#424242">• 独立的延迟队列</text>
<text x="580" y="216" font-size="9" fill="#424242">• 不占用正常队列</text>
<text x="580" y="232" font-size="9" fill="#424242">• 按时间排序</text>
<text x="580" y="248" font-size="9" fill="#424242">• 定时扫描投递</text>
</svg>

**2. 延迟消息 vs 普通消息**

| 对比维度 | 普通消息 | 延迟消息 |
|---------|---------|---------|
| **投递时机** | 立即投递 | 延迟后投递 |
| **存储位置** | CommitLog + ConsumeQueue | CommitLog + 延迟队列 |
| **消费时间** | 发送后立即可消费 | 延迟时间后可消费 |
| **应用场景** | 实时处理 | 定时任务、超时处理 |
| **实现复杂度** | 简单 | 需要定时调度 |
| **消息顺序** | 按发送顺序 | 按到期时间 |

**3. 延迟消息应用场景**

<svg viewBox="0 0 750 320" xmlns="http://www.w3.org/2000/svg">
<text x="375" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">延迟消息典型场景</text>
<rect x="40" y="50" width="200" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="140" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">场景1: 订单超时取消</text>
<text x="140" y="90" font-size="9" fill="#424242">• 用户下单后30分钟未支付</text>
<text x="140" y="105" font-size="9" fill="#424242">• 发送延迟30分钟的消息</text>
<text x="140" y="120" font-size="9" fill="#424242">• 到期检查订单状态并取消</text>
<rect x="270" y="50" width="200" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="370" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">场景2: 定时消息推送</text>
<text x="370" y="90" font-size="9" fill="#424242">• 预约提醒(提前15分钟)</text>
<text x="370" y="105" font-size="9" fill="#424242">• 会员到期提醒(提前3天)</text>
<text x="370" y="120" font-size="9" fill="#424242">• 活动开始通知</text>
<rect x="500" y="50" width="200" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="600" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">场景3: 失败重试</text>
<text x="600" y="90" font-size="9" fill="#424242">• 接口调用失败</text>
<text x="600" y="105" font-size="9" fill="#424242">• 延迟5秒后重试</text>
<text x="600" y="120" font-size="9" fill="#424242">• 避免立即重试雪崩</text>
<rect x="40" y="150" width="200" height="80" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="140" y="170" text-anchor="middle" font-size="12" font-weight="bold" fill="#C2185B">场景4: 延迟计费</text>
<text x="140" y="190" font-size="9" fill="#424242">• 订单完成后7天确认收货</text>
<text x="140" y="205" font-size="9" fill="#424242">• 发送延迟7天的计费消息</text>
<text x="140" y="220" font-size="9" fill="#424242">• 到期后扣款给商家</text>
<rect x="270" y="150" width="200" height="80" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="370" y="170" text-anchor="middle" font-size="12" font-weight="bold" fill="#7B1FA2">场景5: 数据过期处理</text>
<text x="370" y="190" font-size="9" fill="#424242">• 验证码5分钟后失效</text>
<text x="370" y="205" font-size="9" fill="#424242">• 临时数据定时清理</text>
<text x="370" y="220" font-size="9" fill="#424242">• 缓存延迟刷新</text>
<rect x="500" y="150" width="200" height="80" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
<text x="600" y="170" text-anchor="middle" font-size="12" font-weight="bold" fill="#00695C">场景6: 分级告警</text>
<text x="600" y="190" font-size="9" fill="#424242">• 异常发生后1分钟告警</text>
<text x="600" y="205" font-size="9" fill="#424242">• 5分钟未解决升级告警</text>
<text x="600" y="220" font-size="9" fill="#424242">• 30分钟仍未解决通知管理层</text>
<rect x="155" y="250" width="440" height="60" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="375" y="270" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57F17">延迟消息核心价值</text>
<text x="375" y="290" text-anchor="middle" font-size="9" fill="#424242">• 解耦定时任务,无需复杂的定时调度系统</text>
<text x="375" y="305" text-anchor="middle" font-size="9" fill="#424242">• 精确控制业务触发时间,提升用户体验</text>
</svg>

**4. 代码示例**

```java
// 发送延迟消息
Message message = new Message("OrderTopic", "订单30分钟超时检查消息".getBytes());
// 设置延迟级别: 1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h
// 这里设置为30分钟 (level 16)
message.setDelayTimeLevel(16);
producer.send(message);
```

**关键要点:**

1. **延迟投递**: 消息不立即可见,等待指定时间后才能被消费
2. **定时触发**: 适合需要延迟执行的业务场景
3. **存储隔离**: 延迟消息存储在专门的延迟队列中
4. **固定级别**: RocketMQ 支持18个固定的延迟级别
5. **应用广泛**: 订单超时、定时提醒、延迟重试等场景

**记忆口诀:**

```
延迟消息不立投
等待时间到了消
订单超时来取消
定时提醒别忘了
失败重试缓一缓
延迟级别要记牢
```

### 49. RocketMQ 如何实现延迟消息?

**核心答案:**

RocketMQ 通过 **SCHEDULE_TOPIC_XXXX** 临时 Topic 和 18 个延迟队列来实现延迟消息。消息先存入延迟队列,由定时任务扫描到期消息并投递到真实 Topic。

**详细说明:**

**1. 延迟消息实现流程**

<svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#34495E"/>
</marker>
</defs>
<text x="450" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 延迟消息实现机制</text>
<rect x="50" y="60" width="140" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="120" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">① 生产者发送</text>
<text x="120" y="100" font-size="9" fill="#424242">Topic: OrderTopic</text>
<text x="120" y="115" font-size="9" fill="#424242">DelayLevel: 16</text>
<text x="120" y="130" font-size="9" fill="#E74C3C" font-weight="bold">(30分钟延迟)</text>
<rect x="230" y="60" width="160" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="310" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">② Broker 接收</text>
<text x="310" y="100" font-size="9" fill="#424242">替换 Topic 为:</text>
<text x="310" y="115" font-size="8" fill="#D84315" font-weight="bold">SCHEDULE_TOPIC_XXXX</text>
<text x="310" y="130" font-size="9" fill="#424242">QueueId = Level - 1 = 15</text>
<rect x="430" y="60" width="160" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="510" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">③ 存入延迟队列</text>
<text x="510" y="100" font-size="9" fill="#424242">延迟队列 Queue-15</text>
<text x="510" y="115" font-size="9" fill="#424242">计算到期时间:</text>
<text x="510" y="130" font-size="8" fill="#558B2F">now + 30分钟</text>
<rect x="630" y="60" width="160" height="80" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="710" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#C2185B">④ 定时扫描</text>
<text x="710" y="100" font-size="9" fill="#424242">DeliverDelayedMessage</text>
<text x="710" y="115" font-size="9" fill="#424242">Service 每秒扫描</text>
<text x="710" y="130" font-size="9" fill="#424242">检查消息是否到期</text>
<path d="M 190 100 L 225 100" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 390 100 L 425 100" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 590 100 L 625 100" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<rect x="230" y="180" width="160" height="80" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="310" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#7B1FA2">⑤ 恢复真实 Topic</text>
<text x="310" y="220" font-size="9" fill="#424242">从延迟消息中读取</text>
<text x="310" y="235" font-size="9" fill="#424242">原始 Topic 和 QueueId</text>
<text x="310" y="250" font-size="9" fill="#D84315" font-weight="bold">OrderTopic</text>
<rect x="430" y="180" width="160" height="80" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
<text x="510" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#00695C">⑥ 投递到真实队列</text>
<text x="510" y="220" font-size="9" fill="#424242">写入 OrderTopic 的</text>
<text x="510" y="235" font-size="9" fill="#424242">ConsumeQueue</text>
<text x="510" y="250" font-size="9" fill="#424242">消费者可见</text>
<rect x="630" y="180" width="160" height="80" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="710" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57F17">⑦ 消费者消费</text>
<text x="710" y="220" font-size="9" fill="#424242">从 OrderTopic 拉取</text>
<text x="710" y="235" font-size="9" fill="#424242">处理订单超时逻辑</text>
<text x="710" y="250" font-size="9" fill="#424242">业务处理</text>
<path d="M 310 160 L 310 175" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 390 220 L 425 220" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 590 220 L 625 220" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 710 160 L 710 175" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 710 145 Q 820 100, 710 60" stroke="#E74C3C" stroke-width="2" fill="none" stroke-dasharray="5,5" marker-end="url(#arr)"/>
<text x="830" y="105" font-size="9" fill="#E74C3C" font-weight="bold">循环扫描</text>
<rect x="50" y="300" width="800" height="80" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="450" y="320" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">核心设计思想</text>
<text x="450" y="340" text-anchor="middle" font-size="9" fill="#424242">• 利用临时 Topic (SCHEDULE_TOPIC_XXXX) 暂存延迟消息,避免污染原始 Topic</text>
<text x="450" y="356" text-anchor="middle" font-size="9" fill="#424242">• 18 个延迟队列对应 18 个延迟级别,每个队列独立扫描</text>
<text x="450" y="372" text-anchor="middle" font-size="9" fill="#424242">• 定时任务按到期时间投递,保证延迟精度在秒级</text>
</svg>

**2. 延迟消息存储结构**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">延迟消息存储架构</text>
<rect x="50" y="60" width="700" height="50" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">CommitLog (所有消息统一存储)</text>
<rect x="50" y="140" width="220" height="180" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="160" y="160" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">SCHEDULE_TOPIC_XXXX</text>
<text x="160" y="178" text-anchor="middle" font-size="9" fill="#424242">(临时延迟 Topic)</text>
<rect x="70" y="190" width="160" height="25" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="150" y="207" text-anchor="middle" font-size="8" fill="#0D47A1">Queue-0 (1s延迟)</text>
<rect x="70" y="220" width="160" height="25" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="150" y="237" text-anchor="middle" font-size="8" fill="#0D47A1">Queue-1 (5s延迟)</text>
<rect x="70" y="250" width="160" height="25" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="150" y="267" text-anchor="middle" font-size="8" fill="#0D47A1">Queue-2 (10s延迟)</text>
<text x="150" y="290" text-anchor="middle" font-size="9" fill="#7B1FA2">...</text>
<rect x="70" y="295" width="160" height="25" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="150" y="312" text-anchor="middle" font-size="8" fill="#0D47A1">Queue-17 (2h延迟)</text>
<rect x="310" y="140" width="220" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="420" y="160" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">OrderTopic</text>
<text x="420" y="178" text-anchor="middle" font-size="9" fill="#424242">(真实业务 Topic)</text>
<rect x="330" y="190" width="160" height="40" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="410" y="207" text-anchor="middle" font-size="8" fill="#1B5E20">Queue-0</text>
<text x="410" y="220" text-anchor="middle" font-size="7" fill="#558B2F">(延迟消息到期后投递到这里)</text>
<rect x="330" y="235" width="160" height="25" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="410" y="252" text-anchor="middle" font-size="8" fill="#1B5E20">Queue-1</text>
<rect x="330" y="265" width="160" height="25" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="410" y="282" text-anchor="middle" font-size="8" fill="#1B5E20">Queue-2</text>
<text x="410" y="310" text-anchor="middle" font-size="9" fill="#7B1FA2">...</text>
<rect x="570" y="140" width="180" height="180" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="660" y="160" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">延迟消息元数据</text>
<text x="660" y="185" font-size="8" fill="#424242">• 原始 Topic: OrderTopic</text>
<text x="660" y="202" font-size="8" fill="#424242">• 原始 QueueId: 0</text>
<text x="660" y="219" font-size="8" fill="#424242">• 延迟级别: 16</text>
<text x="660" y="236" font-size="8" fill="#424242">• 投递时间: timestamp</text>
<text x="660" y="253" font-size="8" fill="#424242">• 消息体: 原始内容</text>
<text x="660" y="278" font-size="9" fill="#E74C3C" font-weight="bold">存储在 CommitLog 中</text>
<text x="660" y="293" font-size="8" fill="#7F8C8D">通过属性保存原始信息</text>
<text x="660" y="308" font-size="8" fill="#7F8C8D">到期后恢复并投递</text>
<path d="M 270 210 L 305 210" stroke="#9C27B0" stroke-width="2" marker-end="url(#arr)" stroke-dasharray="5,5"/>
<text x="287" y="205" text-anchor="middle" font-size="8" fill="#9C27B0" font-weight="bold">到期投递</text>
</svg>

**3. 定时扫描机制**

```
DeliverDelayedMessageTimerTask 定时任务:
┌─────────────────────────────────────┐
│ 每个延迟级别一个独立的定时任务      │
│ ├─ Level 1 (1s):  每100ms 扫描一次  │
│ ├─ Level 2 (5s):  每100ms 扫描一次  │
│ ├─ Level 3 (10s):每100ms 扫描一次  │
│ ├─ ...                              │
│ └─ Level 18 (2h): 每1s 扫描一次     │
└─────────────────────────────────────┘
         ↓
检查延迟队列头部消息的投递时间
         ↓
    到期了吗?
    ├─ 是 → 取出消息 → 恢复原始 Topic → 投递
    └─ 否 → 等待下次扫描
```

**4. 实现关键代码逻辑**

```java
// 1. 生产者设置延迟级别
Message msg = new Message("OrderTopic", "订单超时检查".getBytes());
msg.setDelayTimeLevel(16); // 30分钟

// 2. Broker 接收消息后的处理
// 替换 Topic 和 QueueId
String topic = msg.getTopic(); // 保存原始 Topic
int queueId = msg.getQueueId(); // 保存原始 QueueId
msg.setTopic("SCHEDULE_TOPIC_XXXX");
msg.setQueueId(delayLevel - 1); // 延迟级别对应队列ID
// 保存原始信息到消息属性
msg.putProperty("REAL_TOPIC", topic);
msg.putProperty("REAL_QID", String.valueOf(queueId));

// 3. 定时任务扫描到期消息
long deliverTime = calculateDeliverTime(msg, delayLevel);
if (System.currentTimeMillis() >= deliverTime) {
    // 到期,恢复原始 Topic 并投递
    String realTopic = msg.getProperty("REAL_TOPIC");
    int realQueueId = Integer.parseInt(msg.getProperty("REAL_QID"));
    msg.setTopic(realTopic);
    msg.setQueueId(realQueueId);
    // 投递到真实 Topic 的 ConsumeQueue
    putMessage(msg);
}
```

**5. 延迟消息流转时间线**

| 时间点 | 操作 | Topic | QueueId | 状态 |
|-------|------|-------|---------|------|
| t=0 | 生产者发送 | OrderTopic | 0 | 设置 DelayLevel=16 |
| t=0 | Broker 接收 | SCHEDULE_TOPIC_XXXX | 15 | 存入延迟队列 |
| t=1s~1799s | 定时扫描 | SCHEDULE_TOPIC_XXXX | 15 | 未到期,继续等待 |
| t=1800s | 扫描到期 | OrderTopic | 0 | 恢复原始 Topic |
| t=1800s | 投递到真实队列 | OrderTopic | 0 | 消费者可见 |
| t=1800s+ | 消费者消费 | OrderTopic | 0 | 处理业务逻辑 |

**关键要点:**

1. **临时 Topic**: 使用 SCHEDULE_TOPIC_XXXX 临时存储延迟消息
2. **18 个队列**: 对应 18 个固定延迟级别,每个队列独立扫描
3. **定时扫描**: DeliverDelayedMessageTimerTask 定时任务按秒级扫描
4. **元数据保存**: 在消息属性中保存原始 Topic 和 QueueId
5. **到期投递**: 到期后恢复原始 Topic 并投递到真实 ConsumeQueue

**记忆口诀:**

```
临时主题来暂存
十八队列分级管
定时扫描查到期
恢复主题再投递
元数据要保存
原始信息不能丢
```

### 48. 什么是延迟消息？

**核心答案:**

延迟消息是指消息发送到 Broker 后，不会立即被消费者消费，而是在指定的延迟时间后才能被消费的消息。

**详细说明:**

**1. 延迟消息特点**

<svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#34495E"/>
</marker>
</defs>
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">延迟消息执行流程</text>
<rect x="50" y="60" width="120" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="110" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">生产者</text>
<text x="110" y="105" text-anchor="middle" font-size="9" fill="#424242">发送延迟消息</text>
<rect x="240" y="60" width="140" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="310" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">Broker</text>
<text x="310" y="98" text-anchor="middle" font-size="9" fill="#424242">存储到延迟队列</text>
<text x="310" y="112" text-anchor="middle" font-size="9" fill="#D84315">⏱ 等待延迟时间</text>
<rect x="450" y="60" width="140" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="520" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">消费者</text>
<text x="520" y="98" text-anchor="middle" font-size="9" fill="#424242">延迟后消费</text>
<text x="520" y="112" text-anchor="middle" font-size="9" fill="#558B2F">处理业务逻辑</text>
<path d="M 170 90 L 235 90" stroke="#34495E" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="202" y="85" text-anchor="middle" font-size="9" fill="#E74C3C" font-weight="bold">t=0</text>
<path d="M 380 90 L 445 90" stroke="#34495E" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="412" y="85" text-anchor="middle" font-size="9" fill="#E74C3C" font-weight="bold">t=延迟时间</text>
<rect x="50" y="160" width="180" height="100" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="140" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#C2185B">特点1: 延迟投递</text>
<text x="140" y="200" font-size="9" fill="#424242">• 不立即投递给消费者</text>
<text x="140" y="216" font-size="9" fill="#424242">• 等待指定时间后投递</text>
<text x="140" y="232" font-size="9" fill="#424242">• 支持固定延迟级别</text>
<text x="140" y="248" font-size="9" fill="#424242">• 精确到秒级</text>
<rect x="270" y="160" width="180" height="100" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="360" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">特点2: 定时触发</text>
<text x="360" y="200" font-size="9" fill="#424242">• 适用于定时任务场景</text>
<text x="360" y="216" font-size="9" fill="#424242">• 订单超时取消</text>
<text x="360" y="232" font-size="9" fill="#424242">• 定时提醒通知</text>
<text x="360" y="248" font-size="9" fill="#424242">• 延迟重试</text>
<rect x="490" y="160" width="180" height="100" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
<text x="580" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#00695C">特点3: 存储隔离</text>
<text x="580" y="200" font-size="9" fill="#424242">• 独立的延迟队列</text>
<text x="580" y="216" font-size="9" fill="#424242">• 不占用正常队列</text>
<text x="580" y="232" font-size="9" fill="#424242">• 按时间排序</text>
<text x="580" y="248" font-size="9" fill="#424242">• 定时扫描投递</text>
</svg>

**2. 延迟消息 vs 普通消息**

| 对比维度 | 普通消息 | 延迟消息 |
|---------|---------|---------|
| **投递时机** | 立即投递 | 延迟后投递 |
| **存储位置** | CommitLog + ConsumeQueue | CommitLog + 延迟队列 |
| **消费时间** | 发送后立即可消费 | 延迟时间后可消费 |
| **应用场景** | 实时处理 | 定时任务、超时处理 |
| **实现复杂度** | 简单 | 需要定时调度 |
| **消息顺序** | 按发送顺序 | 按到期时间 |

**3. 延迟消息应用场景**

<svg viewBox="0 0 750 320" xmlns="http://www.w3.org/2000/svg">
<text x="375" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">延迟消息典型场景</text>
<rect x="40" y="50" width="200" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="140" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">场景1: 订单超时取消</text>
<text x="140" y="90" font-size="9" fill="#424242">• 用户下单后30分钟未支付</text>
<text x="140" y="105" font-size="9" fill="#424242">• 发送延迟30分钟的消息</text>
<text x="140" y="120" font-size="9" fill="#424242">• 到期检查订单状态并取消</text>
<rect x="270" y="50" width="200" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="370" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">场景2: 定时消息推送</text>
<text x="370" y="90" font-size="9" fill="#424242">• 预约提醒(提前15分钟)</text>
<text x="370" y="105" font-size="9" fill="#424242">• 会员到期提醒(提前3天)</text>
<text x="370" y="120" font-size="9" fill="#424242">• 活动开始通知</text>
<rect x="500" y="50" width="200" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="600" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">场景3: 失败重试</text>
<text x="600" y="90" font-size="9" fill="#424242">• 接口调用失败</text>
<text x="600" y="105" font-size="9" fill="#424242">• 延迟5秒后重试</text>
<text x="600" y="120" font-size="9" fill="#424242">• 避免立即重试雪崩</text>
<rect x="40" y="150" width="200" height="80" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="140" y="170" text-anchor="middle" font-size="12" font-weight="bold" fill="#C2185B">场景4: 延迟计费</text>
<text x="140" y="190" font-size="9" fill="#424242">• 订单完成后7天确认收货</text>
<text x="140" y="205" font-size="9" fill="#424242">• 发送延迟7天的计费消息</text>
<text x="140" y="220" font-size="9" fill="#424242">• 到期后扣款给商家</text>
<rect x="270" y="150" width="200" height="80" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="370" y="170" text-anchor="middle" font-size="12" font-weight="bold" fill="#7B1FA2">场景5: 数据过期处理</text>
<text x="370" y="190" font-size="9" fill="#424242">• 验证码5分钟后失效</text>
<text x="370" y="205" font-size="9" fill="#424242">• 临时数据定时清理</text>
<text x="370" y="220" font-size="9" fill="#424242">• 缓存延迟刷新</text>
<rect x="500" y="150" width="200" height="80" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
<text x="600" y="170" text-anchor="middle" font-size="12" font-weight="bold" fill="#00695C">场景6: 分级告警</text>
<text x="600" y="190" font-size="9" fill="#424242">• 异常发生后1分钟告警</text>
<text x="600" y="205" font-size="9" fill="#424242">• 5分钟未解决升级告警</text>
<text x="600" y="220" font-size="9" fill="#424242">• 30分钟仍未解决通知管理层</text>
<rect x="155" y="250" width="440" height="60" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="375" y="270" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57F17">延迟消息核心价值</text>
<text x="375" y="290" text-anchor="middle" font-size="9" fill="#424242">• 解耦定时任务,无需复杂的定时调度系统</text>
<text x="375" y="305" text-anchor="middle" font-size="9" fill="#424242">• 精确控制业务触发时间,提升用户体验</text>
</svg>

**4. 代码示例**

```java
// 发送延迟消息
Message message = new Message("OrderTopic", "订单30分钟超时检查消息".getBytes());
// 设置延迟级别: 1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h
// 这里设置为30分钟 (level 16)
message.setDelayTimeLevel(16);
producer.send(message);
```

**关键要点:**

1. **延迟投递**: 消息不立即可见,等待指定时间后才能被消费
2. **定时触发**: 适合需要延迟执行的业务场景
3. **存储隔离**: 延迟消息存储在专门的延迟队列中
4. **固定级别**: RocketMQ 支持18个固定的延迟级别
5. **应用广泛**: 订单超时、定时提醒、延迟重试等场景

**记忆口诀:**

```
延迟消息不立投
等待时间到了消
订单超时来取消
定时提醒别忘了
失败重试缓一缓
延迟级别要记牢
```

### 49. RocketMQ 如何实现延迟消息？

**核心答案:**

RocketMQ 通过 **SCHEDULE_TOPIC_XXXX** 临时 Topic 和 18 个延迟队列来实现延迟消息。消息先存入延迟队列，由定时任务扫描到期消息并投递到真实 Topic。

**详细说明:**

**1. 延迟消息实现流程**

<svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#34495E"/>
</marker>
</defs>
<text x="450" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 延迟消息实现机制</text>
<rect x="50" y="60" width="140" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="120" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">① 生产者发送</text>
<text x="120" y="100" font-size="9" fill="#424242">Topic: OrderTopic</text>
<text x="120" y="115" font-size="9" fill="#424242">DelayLevel: 16</text>
<text x="120" y="130" font-size="9" fill="#E74C3C" font-weight="bold">(30分钟延迟)</text>
<rect x="230" y="60" width="160" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="310" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">② Broker 接收</text>
<text x="310" y="100" font-size="9" fill="#424242">替换 Topic 为:</text>
<text x="310" y="115" font-size="8" fill="#D84315" font-weight="bold">SCHEDULE_TOPIC_XXXX</text>
<text x="310" y="130" font-size="9" fill="#424242">QueueId = Level - 1 = 15</text>
<rect x="430" y="60" width="160" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="510" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">③ 存入延迟队列</text>
<text x="510" y="100" font-size="9" fill="#424242">延迟队列 Queue-15</text>
<text x="510" y="115" font-size="9" fill="#424242">计算到期时间:</text>
<text x="510" y="130" font-size="8" fill="#558B2F">now + 30分钟</text>
<rect x="630" y="60" width="160" height="80" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="710" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#C2185B">④ 定时扫描</text>
<text x="710" y="100" font-size="9" fill="#424242">DeliverDelayedMessage</text>
<text x="710" y="115" font-size="9" fill="#424242">Service 每秒扫描</text>
<text x="710" y="130" font-size="9" fill="#424242">检查消息是否到期</text>
<path d="M 190 100 L 225 100" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 390 100 L 425 100" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 590 100 L 625 100" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<rect x="230" y="180" width="160" height="80" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="310" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#7B1FA2">⑤ 恢复真实 Topic</text>
<text x="310" y="220" font-size="9" fill="#424242">从延迟消息中读取</text>
<text x="310" y="235" font-size="9" fill="#424242">原始 Topic 和 QueueId</text>
<text x="310" y="250" font-size="9" fill="#D84315" font-weight="bold">OrderTopic</text>
<rect x="430" y="180" width="160" height="80" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
<text x="510" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#00695C">⑥ 投递到真实队列</text>
<text x="510" y="220" font-size="9" fill="#424242">写入 OrderTopic 的</text>
<text x="510" y="235" font-size="9" fill="#424242">ConsumeQueue</text>
<text x="510" y="250" font-size="9" fill="#424242">消费者可见</text>
<rect x="630" y="180" width="160" height="80" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="710" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57F17">⑦ 消费者消费</text>
<text x="710" y="220" font-size="9" fill="#424242">从 OrderTopic 拉取</text>
<text x="710" y="235" font-size="9" fill="#424242">处理订单超时逻辑</text>
<text x="710" y="250" font-size="9" fill="#424242">业务处理</text>
<path d="M 310 160 L 310 175" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 390 220 L 425 220" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 590 220 L 625 220" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 710 160 L 710 175" stroke="#34495E" stroke-width="2" marker-end="url(#arr)"/>
<path d="M 710 145 Q 820 100, 710 60" stroke="#E74C3C" stroke-width="2" fill="none" stroke-dasharray="5,5" marker-end="url(#arr)"/>
<text x="830" y="105" font-size="9" fill="#E74C3C" font-weight="bold">循环扫描</text>
<rect x="50" y="300" width="800" height="80" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="450" y="320" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">核心设计思想</text>
<text x="450" y="340" text-anchor="middle" font-size="9" fill="#424242">• 利用临时 Topic (SCHEDULE_TOPIC_XXXX) 暂存延迟消息,避免污染原始 Topic</text>
<text x="450" y="356" text-anchor="middle" font-size="9" fill="#424242">• 18 个延迟队列对应 18 个延迟级别,每个队列独立扫描</text>
<text x="450" y="372" text-anchor="middle" font-size="9" fill="#424242">• 定时任务按到期时间投递,保证延迟精度在秒级</text>
</svg>

**2. 延迟消息存储结构**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">延迟消息存储架构</text>
<rect x="50" y="60" width="700" height="50" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">CommitLog (所有消息统一存储)</text>
<rect x="50" y="140" width="220" height="180" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="160" y="160" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">SCHEDULE_TOPIC_XXXX</text>
<text x="160" y="178" text-anchor="middle" font-size="9" fill="#424242">(临时延迟 Topic)</text>
<rect x="70" y="190" width="160" height="25" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="150" y="207" text-anchor="middle" font-size="8" fill="#0D47A1">Queue-0 (1s延迟)</text>
<rect x="70" y="220" width="160" height="25" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="150" y="237" text-anchor="middle" font-size="8" fill="#0D47A1">Queue-1 (5s延迟)</text>
<rect x="70" y="250" width="160" height="25" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="150" y="267" text-anchor="middle" font-size="8" fill="#0D47A1">Queue-2 (10s延迟)</text>
<text x="150" y="290" text-anchor="middle" font-size="9" fill="#7B1FA2">...</text>
<rect x="70" y="295" width="160" height="25" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="150" y="312" text-anchor="middle" font-size="8" fill="#0D47A1">Queue-17 (2h延迟)</text>
<rect x="310" y="140" width="220" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="420" y="160" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">OrderTopic</text>
<text x="420" y="178" text-anchor="middle" font-size="9" fill="#424242">(真实业务 Topic)</text>
<rect x="330" y="190" width="160" height="40" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="410" y="207" text-anchor="middle" font-size="8" fill="#1B5E20">Queue-0</text>
<text x="410" y="220" text-anchor="middle" font-size="7" fill="#558B2F">(延迟消息到期后投递到这里)</text>
<rect x="330" y="235" width="160" height="25" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="410" y="252" text-anchor="middle" font-size="8" fill="#1B5E20">Queue-1</text>
<rect x="330" y="265" width="160" height="25" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="410" y="282" text-anchor="middle" font-size="8" fill="#1B5E20">Queue-2</text>
<text x="410" y="310" text-anchor="middle" font-size="9" fill="#7B1FA2">...</text>
<rect x="570" y="140" width="180" height="180" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="660" y="160" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">延迟消息元数据</text>
<text x="660" y="185" font-size="8" fill="#424242">• 原始 Topic: OrderTopic</text>
<text x="660" y="202" font-size="8" fill="#424242">• 原始 QueueId: 0</text>
<text x="660" y="219" font-size="8" fill="#424242">• 延迟级别: 16</text>
<text x="660" y="236" font-size="8" fill="#424242">• 投递时间: timestamp</text>
<text x="660" y="253" font-size="8" fill="#424242">• 消息体: 原始内容</text>
<text x="660" y="278" font-size="9" fill="#E74C3C" font-weight="bold">存储在 CommitLog 中</text>
<text x="660" y="293" font-size="8" fill="#7F8C8D">通过属性保存原始信息</text>
<text x="660" y="308" font-size="8" fill="#7F8C8D">到期后恢复并投递</text>
<path d="M 270 210 L 305 210" stroke="#9C27B0" stroke-width="2" marker-end="url(#arr)" stroke-dasharray="5,5"/>
<text x="287" y="205" text-anchor="middle" font-size="8" fill="#9C27B0" font-weight="bold">到期投递</text>
</svg>

**3. 定时扫描机制**

```
DeliverDelayedMessageTimerTask 定时任务:
┌─────────────────────────────────────┐
│ 每个延迟级别一个独立的定时任务      │
│ ├─ Level 1 (1s):  每100ms 扫描一次  │
│ ├─ Level 2 (5s):  每100ms 扫描一次  │
│ ├─ Level 3 (10s): 每100ms 扫描一次  │
│ ├─ ...                              │
│ └─ Level 18 (2h): 每1s 扫描一次     │
└─────────────────────────────────────┘
         ↓
检查延迟队列头部消息的投递时间
         ↓
    到期了吗?
    ├─ 是 → 取出消息 → 恢复原始 Topic → 投递
    └─ 否 → 等待下次扫描
```

**4. 实现关键代码逻辑**

```java
// 1. 生产者设置延迟级别
Message msg = new Message("OrderTopic", "订单超时检查".getBytes());
msg.setDelayTimeLevel(16); // 30分钟

// 2. Broker 接收消息后的处理
// 替换 Topic 和 QueueId
String topic = msg.getTopic(); // 保存原始 Topic
int queueId = msg.getQueueId(); // 保存原始 QueueId
msg.setTopic("SCHEDULE_TOPIC_XXXX");
msg.setQueueId(delayLevel - 1); // 延迟级别对应队列ID
// 保存原始信息到消息属性
msg.putProperty("REAL_TOPIC", topic);
msg.putProperty("REAL_QID", String.valueOf(queueId));

// 3. 定时任务扫描到期消息
long deliverTime = calculateDeliverTime(msg, delayLevel);
if (System.currentTimeMillis() >= deliverTime) {
    // 到期,恢复原始 Topic 并投递
    String realTopic = msg.getProperty("REAL_TOPIC");
    int realQueueId = Integer.parseInt(msg.getProperty("REAL_QID"));
    msg.setTopic(realTopic);
    msg.setQueueId(realQueueId);
    // 投递到真实 Topic 的 ConsumeQueue
    putMessage(msg);
}
```

**5. 延迟消息流转时间线**

| 时间点 | 操作 | Topic | QueueId | 状态 |
|-------|------|-------|---------|------|
| t=0 | 生产者发送 | OrderTopic | 0 | 设置 DelayLevel=16 |
| t=0 | Broker 接收 | SCHEDULE_TOPIC_XXXX | 15 | 存入延迟队列 |
| t=1s~1799s | 定时扫描 | SCHEDULE_TOPIC_XXXX | 15 | 未到期,继续等待 |
| t=1800s | 扫描到期 | OrderTopic | 0 | 恢复原始 Topic |
| t=1800s | 投递到真实队列 | OrderTopic | 0 | 消费者可见 |
| t=1800s+ | 消费者消费 | OrderTopic | 0 | 处理业务逻辑 |

**关键要点:**

1. **临时 Topic**: 使用 SCHEDULE_TOPIC_XXXX 临时存储延迟消息
2. **18 个队列**: 对应 18 个固定延迟级别,每个队列独立扫描
3. **定时扫描**: DeliverDelayedMessageTimerTask 定时任务按秒级扫描
4. **元数据保存**: 在消息属性中保存原始 Topic 和 QueueId
5. **到期投递**: 到期后恢复原始 Topic 并投递到真实 ConsumeQueue

**记忆口诀:**

```
临时主题来暂存
十八队列分级管
定时扫描查到期
恢复主题再投递
元数据要保存
原始信息不能丢
```

### 50. RocketMQ 支持哪些延迟级别？

**核心答案:**

RocketMQ 默认支持 **18 个固定的延迟级别**：1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h

**详细说明:**

**1. 18 个延迟级别详情**

<svg viewBox="0 0 850 480" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 18 个延迟级别</text>
<rect x="50" y="50" width="750" height="40" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="425" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">秒级延迟 (Level 1-4)</text>
<rect x="70" y="100" width="160" height="50" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="150" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">Level 1</text>
<text x="150" y="138" text-anchor="middle" font-size="9" fill="#424242">1秒 (1s)</text>
<rect x="250" y="100" width="160" height="50" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="330" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">Level 2</text>
<text x="330" y="138" text-anchor="middle" font-size="9" fill="#424242">5秒 (5s)</text>
<rect x="430" y="100" width="160" height="50" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="510" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">Level 3</text>
<text x="510" y="138" text-anchor="middle" font-size="9" fill="#424242">10秒 (10s)</text>
<rect x="610" y="100" width="160" height="50" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="690" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">Level 4</text>
<text x="690" y="138" text-anchor="middle" font-size="9" fill="#424242">30秒 (30s)</text>
<rect x="50" y="170" width="750" height="40" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="425" y="195" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">分钟级延迟 (Level 5-15)</text>
<rect x="70" y="220" width="130" height="50" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="135" y="240" text-anchor="middle" font-size="10" font-weight="bold" fill="#1B5E20">Level 5-6</text>
<text x="135" y="258" text-anchor="middle" font-size="9" fill="#424242">1m, 2m</text>
<rect x="220" y="220" width="130" height="50" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="285" y="240" text-anchor="middle" font-size="10" font-weight="bold" fill="#1B5E20">Level 7-9</text>
<text x="285" y="258" text-anchor="middle" font-size="9" fill="#424242">3m, 4m, 5m</text>
<rect x="370" y="220" width="130" height="50" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="435" y="240" text-anchor="middle" font-size="10" font-weight="bold" fill="#1B5E20">Level 10-14</text>
<text x="435" y="258" text-anchor="middle" font-size="9" fill="#424242">6m~10m</text>
<rect x="520" y="220" width="130" height="50" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="585" y="240" text-anchor="middle" font-size="10" font-weight="bold" fill="#1B5E20">Level 15</text>
<text x="585" y="258" text-anchor="middle" font-size="9" fill="#424242">20分钟 (20m)</text>
<rect x="670" y="220" width="130" height="50" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="735" y="240" text-anchor="middle" font-size="10" font-weight="bold" fill="#1B5E20">Level 16</text>
<text x="735" y="258" text-anchor="middle" font-size="9" fill="#424242">30分钟 (30m)</text>
<rect x="50" y="290" width="750" height="40" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="425" y="315" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">小时级延迟 (Level 17-18)</text>
<rect x="250" y="340" width="160" height="50" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="330" y="360" text-anchor="middle" font-size="10" font-weight="bold" fill="#E65100">Level 17</text>
<text x="330" y="378" text-anchor="middle" font-size="9" fill="#424242">1小时 (1h)</text>
<rect x="430" y="340" width="160" height="50" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="510" y="360" text-anchor="middle" font-size="10" font-weight="bold" fill="#E65100">Level 18</text>
<text x="510" y="378" text-anchor="middle" font-size="9" fill="#424242">2小时 (2h)</text>
<rect x="50" y="410" width="750" height="60" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="425" y="430" text-anchor="middle" font-size="11" font-weight="bold" fill="#C2185B">重要提示</text>
<text x="425" y="448" text-anchor="middle" font-size="9" fill="#424242">• 延迟级别从 1 开始,不是从 0 开始</text>
<text x="425" y="463" text-anchor="middle" font-size="9" fill="#424242">• 每个 Level 对应一个延迟队列: QueueId = Level - 1</text>
</svg>

**2. 延迟级别配置表**

| Level | 延迟时间 | 应用场景 | Queue ID |
|-------|---------|---------|----------|
| 1 | 1s | 快速重试 | 0 |
| 2 | 5s | 接口调用失败重试 | 1 |
| 3 | 10s | 短时重试 | 2 |
| 4 | 30s | 验证码超时 | 3 |
| 5 | 1m | 临时数据过期 | 4 |
| 6 | 2m | 短时提醒 | 5 |
| 7 | 3m | 业务超时检查 | 6 |
| 8 | 4m | 中等延迟任务 | 7 |
| 9 | 5m | 验证码失效 | 8 |
| 10 | 6m | 中等延迟 | 9 |
| 11 | 7m | 中等延迟 | 10 |
| 12 | 8m | 中等延迟 | 11 |
| 13 | 9m | 中等延迟 | 12 |
| 14 | 10m | 短会话超时 | 13 |
| 15 | 20m | 订单部分超时 | 14 |
| 16 | 30m | 订单支付超时 | 15 |
| 17 | 1h | 长时任务 | 16 |
| 18 | 2h | 最长延迟 | 17 |

**3. 延迟级别配置文件**

```properties
# Broker 配置文件 broker.conf
# 默认配置如下,可以修改
messageDelayLevel=1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h
```

**4. 常见业务场景与延迟级别对应**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">业务场景与延迟级别选择</text>
<rect x="50" y="50" width="350" height="170" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="225" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">电商场景</text>
<text x="225" y="95" font-size="9" fill="#424242">• 订单15分钟未支付提醒 → Level 15 (20m)</text>
<text x="225" y="113" font-size="9" fill="#424242">• 订单30分钟未支付取消 → Level 16 (30m)</text>
<text x="225" y="131" font-size="9" fill="#424242">• 订单1小时未支付关闭 → Level 17 (1h)</text>
<text x="225" y="149" font-size="9" fill="#424242">• 验证码5分钟失效 → Level 9 (5m)</text>
<text x="225" y="167" font-size="9" fill="#424242">• 购物车30秒自动刷新 → Level 4 (30s)</text>
<text x="225" y="185" font-size="9" fill="#424242">• 秒杀活动开始通知 → Level 3 (10s)</text>
<text x="225" y="203" font-size="9" fill="#424242">• 库存预占5分钟释放 → Level 9 (5m)</text>
<rect x="420" y="50" width="350" height="170" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="595" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">系统运维场景</text>
<text x="595" y="95" font-size="9" fill="#424242">• 接口调用失败5秒重试 → Level 2 (5s)</text>
<text x="595" y="113" font-size="9" fill="#424242">• 数据同步失败30秒重试 → Level 4 (30s)</text>
<text x="595" y="131" font-size="9" fill="#424242">• 告警1分钟后升级 → Level 5 (1m)</text>
<text x="595" y="149" font-size="9" fill="#424242">• 缓存10分钟后刷新 → Level 14 (10m)</text>
<text x="595" y="167" font-size="9" fill="#424242">• 日志1小时归档 → Level 17 (1h)</text>
<text x="595" y="185" font-size="9" fill="#424242">• 临时文件2小时清理 → Level 18 (2h)</text>
<text x="595" y="203" font-size="9" fill="#424242">• 健康检查30秒执行 → Level 4 (30s)</text>
<rect x="50" y="240" width="350" height="170" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="225" y="260" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">金融场景</text>
<text x="225" y="285" font-size="9" fill="#424242">• 交易确认30秒超时 → Level 4 (30s)</text>
<text x="225" y="303" font-size="9" fill="#424242">• 支付确认1分钟超时 → Level 5 (1m)</text>
<text x="225" y="321" font-size="9" fill="#424242">• 转账30分钟到账通知 → Level 16 (30m)</text>
<text x="225" y="339" font-size="9" fill="#424242">• 对账1小时执行 → Level 17 (1h)</text>
<text x="225" y="357" font-size="9" fill="#424242">• 风控规则5秒检查 → Level 2 (5s)</text>
<text x="225" y="375" font-size="9" fill="#424242">• 授权码5分钟失效 → Level 9 (5m)</text>
<text x="225" y="393" font-size="9" fill="#424242">• 交易凭证2小时归档 → Level 18 (2h)</text>
<rect x="420" y="240" width="350" height="170" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="595" y="260" text-anchor="middle" font-size="12" font-weight="bold" fill="#7B1FA2">社交场景</text>
<text x="595" y="285" font-size="9" fill="#424242">• 消息撤回1分钟内有效 → Level 5 (1m)</text>
<text x="595" y="303" font-size="9" fill="#424242">• 会话10分钟超时 → Level 14 (10m)</text>
<text x="595" y="321" font-size="9" fill="#424242">• 好友请求30分钟过期 → Level 16 (30m)</text>
<text x="595" y="339" font-size="9" fill="#424242">• 动态推送5秒延迟 → Level 2 (5s)</text>
<text x="595" y="357" font-size="9" fill="#424242">• 直播预告1小时前通知 → Level 17 (1h)</text>
<text x="595" y="375" font-size="9" fill="#424242">• 活动开始10秒倒计时 → Level 3 (10s)</text>
<text x="595" y="393" font-size="9" fill="#424242">• 群消息2小时禁言解除 → Level 18 (2h)</text>
</svg>

**5. 代码使用示例**

```java
// 示例1: 订单30分钟支付超时
Message msg = new Message("OrderTopic", "order-123".getBytes());
msg.setDelayTimeLevel(16);  // 30分钟 = Level 16
producer.send(msg);

// 示例2: 接口调用失败5秒重试
Message retryMsg = new Message("RetryTopic", "retry-task".getBytes());
retryMsg.setDelayTimeLevel(2);  // 5秒 = Level 2
producer.send(retryMsg);

// 示例3: 验证码5分钟失效
Message codeMsg = new Message("CodeTopic", "code-456".getBytes());
codeMsg.setDelayTimeLevel(9);  // 5分钟 = Level 9
producer.send(codeMsg);

// 示例4: 日志1小时归档
Message logMsg = new Message("LogTopic", "log-archive".getBytes());
logMsg.setDelayTimeLevel(17);  // 1小时 = Level 17
producer.send(logMsg);
```

**关键要点:**

1. **固定级别**: RocketMQ 只支持 18 个固定延迟级别,不支持任意延迟时间
2. **从 1 开始**: Level 从 1 开始编号,不是从 0 开始
3. **队列映射**: Level N 对应 Queue (N-1)
4. **时间范围**: 最小 1 秒,最大 2 小时
5. **业务选择**: 根据业务需求选择最接近的延迟级别

**记忆口诀:**

```
一五十三十秒级
一到十分钟常用
二十三十分订单
一小时二小时归档
十八级别要记牢
从一开始别搞错
```

### 51. 如何自定义延迟时间？

**核心答案:**

RocketMQ 默认不支持任意时间延迟，但可以通过以下方式实现自定义延迟：
1. **修改配置文件** messageDelayLevel 参数
2. **使用定时消息** (RocketMQ 5.0+)
3. **外部定时调度** 配合延迟消息
4. **多级延迟组合** 实现特殊时间

**详细说明:**

**1. 方法一：修改 Broker 配置文件**

<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">修改延迟级别配置</text>
<rect x="50" y="60" width="700" height="240" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">broker.conf 配置示例</text>
<rect x="80" y="100" width="640" height="180" fill="#FFFFFF" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="400" y="125" text-anchor="middle" font-family="monospace" font-size="10" fill="#C62828"># 默认配置 (18个级别)</text>
<text x="400" y="145" text-anchor="middle" font-family="monospace" font-size="9" fill="#424242">messageDelayLevel=1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h</text>
<text x="400" y="175" text-anchor="middle" font-family="monospace" font-size="10" fill="#2E7D32"># 自定义配置 (添加更多级别)</text>
<text x="400" y="195" text-anchor="middle" font-family="monospace" font-size="9" fill="#424242">messageDelayLevel=1s 5s 10s 15s 30s 45s 1m 2m 3m 4m 5m</text>
<text x="400" y="210" text-anchor="middle" font-family="monospace" font-size="9" fill="#424242">6m 7m 8m 9m 10m 15m 20m 30m 45m 1h 1.5h 2h 3h 6h 12h 24h</text>
<text x="400" y="240" text-anchor="middle" font-size="10" fill="#E74C3C" font-weight="bold">⚠️ 修改后需要重启 Broker</text>
<text x="400" y="260" text-anchor="middle" font-size="9" fill="#7F8C8D">新增的延迟级别从 Level 19 开始</text>
</svg>

**配置步骤:**

```bash
# 1. 编辑 Broker 配置文件
vim conf/broker.conf

# 2. 修改或添加 messageDelayLevel 配置
messageDelayLevel=1s 5s 10s 15s 30s 1m 2m 5m 10m 15m 20m 30m 1h 2h 3h 6h 12h 24h

# 3. 重启 Broker
sh bin/mqshutdown broker
sh bin/mqbroker -n localhost:9876 -c conf/broker.conf

# 4. 验证配置
# 使用新增的延迟级别发送消息
Message msg = new Message("TestTopic", "test".getBytes());
msg.setDelayTimeLevel(4);  // 使用新增的 15s 延迟
```

**2. 方法二：使用定时消息 (RocketMQ 5.0+)**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#34495E"/>
</marker>
</defs>
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 5.0 定时消息特性</text>
<rect x="50" y="60" width="200" height="100" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="150" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">任意时间延迟</text>
<text x="150" y="105" font-size="9" fill="#424242">• 支持精确到毫秒</text>
<text x="150" y="122" font-size="9" fill="#424242">• 最长40天延迟</text>
<text x="150" y="139" font-size="9" fill="#424242">• 无需固定级别</text>
<rect x="300" y="60" width="200" height="100" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">使用方式</text>
<text x="400" y="105" font-size="9" fill="#424242">• setDeliverTimeMs()</text>
<text x="400" y="122" font-size="9" fill="#424242">• 设置绝对时间戳</text>
<text x="400" y="139" font-size="9" fill="#424242">• 或相对延迟时间</text>
<rect x="550" y="60" width="200" height="100" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="650" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#7B1FA2">存储机制</text>
<text x="650" y="105" font-size="9" fill="#424242">• TimerWheel 时间轮</text>
<text x="650" y="122" font-size="9" fill="#424242">• 高效检索</text>
<text x="650" y="139" font-size="9" fill="#424242">• 持久化存储</text>
<rect x="100" y="190" width="600" height="140" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="400" y="215" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">代码示例 (RocketMQ 5.0+)</text>
<text x="400" y="240" text-anchor="middle" font-family="monospace" font-size="9" fill="#424242">Message msg = new Message("OrderTopic", "order-data".getBytes());</text>
<text x="400" y="258" text-anchor="middle" font-family="monospace" font-size="9" fill="#424242">// 方式1: 设置绝对投递时间 (时间戳)</text>
<text x="400" y="274" text-anchor="middle" font-family="monospace" font-size="9" fill="#2E7D32">msg.setDeliverTimeMs(System.currentTimeMillis() + 3600000); // 1小时后</text>
<text x="400" y="295" text-anchor="middle" font-family="monospace" font-size="9" fill="#424242">// 方式2: 也可以设置任意未来时间戳</text>
<text x="400" y="311" text-anchor="middle" font-family="monospace" font-size="9" fill="#9C27B0">long deliverTime = LocalDateTime.now().plusHours(2).toInstant();</text>
</svg>

**完整代码示例:**

```java
// RocketMQ 5.0+ 定时消息
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.common.message.Message;

public class TimerMessageExample {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        // 示例1: 3小时后投递
        Message msg1 = new Message("OrderTopic", "3小时后投递".getBytes());
        msg1.setDeliverTimeMs(System.currentTimeMillis() + 3 * 3600 * 1000L);
        producer.send(msg1);

        // 示例2: 45分钟后投递
        Message msg2 = new Message("OrderTopic", "45分钟后投递".getBytes());
        msg2.setDeliverTimeMs(System.currentTimeMillis() + 45 * 60 * 1000L);
        producer.send(msg2);

        // 示例3: 指定具体时间投递 (2024-12-25 00:00:00)
        Message msg3 = new Message("OrderTopic", "圣诞节投递".getBytes());
        LocalDateTime christmas = LocalDateTime.of(2024, 12, 25, 0, 0, 0);
        long timestamp = christmas.toInstant(ZoneOffset.ofHours(8)).toEpochMilli();
        msg3.setDeliverTimeMs(timestamp);
        producer.send(msg3);

        producer.shutdown();
    }
}
```

**3. 方法三：外部定时调度 + 延迟消息组合**

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">外部调度方案</text>
<rect x="50" y="60" width="220" height="220" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="160" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">方案1: 数据库 + 扫描</text>
<text x="160" y="110" font-size="9" fill="#424242">① 将任务存入数据库</text>
<text x="160" y="128" font-size="9" fill="#424242">② 记录触发时间</text>
<text x="160" y="146" font-size="9" fill="#424242">③ 定时扫描到期任务</text>
<text x="160" y="164" font-size="9" fill="#424242">④ 发送 MQ 消息执行</text>
<text x="160" y="190" font-size="9" fill="#E74C3C" font-weight="bold">优点: 灵活,任意时间</text>
<text x="160" y="208" font-size="9" fill="#E74C3C" font-weight="bold">缺点: 性能较低</text>
<text x="160" y="226" font-size="9" fill="#7F8C8D">适合任务量不大场景</text>
<rect x="290" y="60" width="220" height="220" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">方案2: Redis + ZSet</text>
<text x="400" y="110" font-size="9" fill="#424242">① 任务加入 ZSet</text>
<text x="400" y="128" font-size="9" fill="#424242">② Score 设为触发时间</text>
<text x="400" y="146" font-size="9" fill="#424242">③ ZRANGEBYSCORE 查询</text>
<text x="400" y="164" font-size="9" fill="#424242">④ 到期发送 MQ 消息</text>
<text x="400" y="190" font-size="9" fill="#2E7D32" font-weight="bold">优点: 性能好,实时</text>
<text x="400" y="208" font-size="9" fill="#2E7D32" font-weight="bold">缺点: 需要 Redis</text>
<text x="400" y="226" font-size="9" fill="#7F8C8D">适合高并发场景</text>
<rect x="530" y="60" width="220" height="220" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="640" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">方案3: 多级延迟组合</text>
<text x="640" y="110" font-size="9" fill="#424242">① 拆分大延迟时间</text>
<text x="640" y="128" font-size="9" fill="#424242">② 多次发送延迟消息</text>
<text x="640" y="146" font-size="9" fill="#424242">③ 例: 3小时 = 2h + 1h</text>
<text x="640" y="164" font-size="9" fill="#424242">④ 级联触发</text>
<text x="640" y="190" font-size="9" fill="#F57C00" font-weight="bold">优点: 无需额外组件</text>
<text x="640" y="208" font-size="9" fill="#F57C00" font-weight="bold">缺点: 实现复杂</text>
<text x="640" y="226" font-size="9" fill="#7F8C8D">适合时间可拆分场景</text>
</svg>

**Redis ZSet 实现示例:**

```java
// 使用 Redis ZSet 实现任意延迟
public class RedisDelayQueue {
    private RedisTemplate<String, String> redisTemplate;
    private DefaultMQProducer producer;

    // 添加延迟任务
    public void addDelayTask(String taskId, String taskData, long delayMs) {
        long executeTime = System.currentTimeMillis() + delayMs;
        // ZSet Score 设为执行时间戳
        redisTemplate.opsForZSet().add("delay_queue", taskId + ":" + taskData, executeTime);
    }

    // 定时扫描并执行到期任务
    @Scheduled(fixedDelay = 1000)  // 每秒扫描一次
    public void scanAndExecute() {
        long now = System.currentTimeMillis();
        // 查询 Score <= 当前时间的任务
        Set<String> tasks = redisTemplate.opsForZSet()
            .rangeByScore("delay_queue", 0, now);

        for (String task : tasks) {
            // 发送 MQ 消息
            Message msg = new Message("ExecuteTopic", task.getBytes());
            producer.send(msg);

            // 从 ZSet 中移除已执行任务
            redisTemplate.opsForZSet().remove("delay_queue", task);
        }
    }
}
```

**4. 各方案对比**

| 方案 | 灵活性 | 性能 | 实现复杂度 | 依赖 | 适用场景 |
|-----|--------|------|-----------|------|---------|
| **修改配置文件** | 低 | 高 | 低 | 无 | 固定延迟级别 |
| **RocketMQ 5.0** | 高 | 高 | 低 | RocketMQ 5.0+ | 任意时间,推荐 |
| **数据库扫描** | 高 | 低 | 中 | MySQL | 任务量少 |
| **Redis ZSet** | 高 | 高 | 中 | Redis | 高并发 |
| **多级组合** | 中 | 高 | 高 | 无 | 时间可拆分 |

**5. 最佳实践建议**

<svg viewBox="0 0 750 300" xmlns="http://www.w3.org/2000/svg">
<text x="375" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">选择建议</text>
<rect x="50" y="50" width="650" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="375" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">✓ 推荐方案</text>
<text x="375" y="95" font-size="9" fill="#424242">如果使用 RocketMQ 5.0+,优先使用定时消息特性 (setDeliverTimeMs)</text>
<rect x="50" y="130" width="650" height="60" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="375" y="155" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57F17">⚡ 次选方案</text>
<text x="375" y="175" font-size="9" fill="#424242">RocketMQ 4.x: 默认18级别足够 → 不够则修改配置 → 仍不够则 Redis ZSet</text>
<rect x="50" y="210" width="650" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="375" y="235" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">⚠️ 注意事项</text>
<text x="375" y="255" font-size="9" fill="#424242">• 修改配置后必须重启 Broker,会影响服务</text>
<text x="375" y="272" font-size="9" fill="#424242">• 延迟时间过长 (>24小时) 建议使用外部调度方案</text>
</svg>

**关键要点:**

1. **RocketMQ 5.0+**: 支持任意时间延迟,使用 setDeliverTimeMs() 方法
2. **修改配置**: 可以自定义延迟级别,但需重启 Broker
3. **外部调度**: Redis ZSet 或数据库扫描实现灵活延迟
4. **多级组合**: 将大延迟拆分为多个小延迟级联执行
5. **版本选择**: 优先升级到 RocketMQ 5.0 使用定时消息特性

**记忆口诀:**

```
五点零支持任意时
改配置文件重启忙
Redis加持性能好
数据库扫简单慢
多级组合复杂难
按需选择最适当
```

## 消息过滤

### 52. RocketMQ 支持哪些消息过滤方式？

**核心答案:**

RocketMQ 支持 **3 种消息过滤方式**：
1. **Tag 过滤** - 基于消息标签的简单过滤
2. **SQL92 过滤** - 基于 SQL 语法的属性过滤
3. **Filter Server 过滤** - 自定义过滤逻辑（已废弃）

**详细说明:**

**1. 三种过滤方式对比**

<svg viewBox="0 0 850 380" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 消息过滤方式</text>
<rect x="50" y="60" width="240" height="280" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="170" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976D2">1. Tag 过滤</text>
<text x="170" y="110" font-size="10" fill="#424242" font-weight="bold">特点:</text>
<text x="170" y="130" font-size="9" fill="#424242">• 简单高效</text>
<text x="170" y="146" font-size="9" fill="#424242">• 支持单 Tag 或多 Tag</text>
<text x="170" y="162" font-size="9" fill="#424242">• Broker 端过滤</text>
<text x="170" y="178" font-size="9" fill="#424242">• 性能最好</text>
<text x="170" y="202" font-size="10" fill="#424242" font-weight="bold">使用场景:</text>
<text x="170" y="222" font-size="9" fill="#424242">• 按业务类型过滤</text>
<text x="170" y="238" font-size="9" fill="#424242">• 订单状态分类</text>
<text x="170" y="254" font-size="9" fill="#424242">• 消息级别划分</text>
<text x="170" y="278" font-size="10" fill="#1976D2" font-weight="bold">推荐指数: ★★★★★</text>
<text x="170" y="298" font-size="8" fill="#7F8C8D">最常用，性能最优</text>
<text x="170" y="320" font-size="9" fill="#2E7D32" font-weight="bold">✓ 推荐使用</text>
<rect x="310" y="60" width="240" height="280" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="430" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">2. SQL92 过滤</text>
<text x="430" y="110" font-size="10" fill="#424242" font-weight="bold">特点:</text>
<text x="430" y="130" font-size="9" fill="#424242">• 功能强大灵活</text>
<text x="430" y="146" font-size="9" fill="#424242">• 支持复杂条件</text>
<text x="430" y="162" font-size="9" fill="#424242">• Broker 端过滤</text>
<text x="430" y="178" font-size="9" fill="#424242">• 需开启配置</text>
<text x="430" y="202" font-size="10" fill="#424242" font-weight="bold">使用场景:</text>
<text x="430" y="222" font-size="9" fill="#424242">• 多条件组合过滤</text>
<text x="430" y="238" font-size="9" fill="#424242">• 数值范围判断</text>
<text x="430" y="254" font-size="9" fill="#424242">• 复杂业务逻辑</text>
<text x="430" y="278" font-size="10" fill="#2E7D32" font-weight="bold">推荐指数: ★★★★☆</text>
<text x="430" y="298" font-size="8" fill="#7F8C8D">功能强大，略耗性能</text>
<text x="430" y="320" font-size="9" fill="#FF9800" font-weight="bold">⚡ 按需使用</text>
<rect x="570" y="60" width="240" height="280" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="690" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#F57C00">3. Filter Server</text>
<text x="690" y="110" font-size="10" fill="#424242" font-weight="bold">特点:</text>
<text x="690" y="130" font-size="9" fill="#424242">• 完全自定义逻辑</text>
<text x="690" y="146" font-size="9" fill="#424242">• 独立进程过滤</text>
<text x="690" y="162" font-size="9" fill="#424242">• 部署复杂</text>
<text x="690" y="178" font-size="9" fill="#424242">• 性能开销大</text>
<text x="690" y="202" font-size="10" fill="#424242" font-weight="bold">使用场景:</text>
<text x="690" y="222" font-size="9" fill="#424242">• 极复杂过滤逻辑</text>
<text x="690" y="238" font-size="9" fill="#424242">• 需要远程调用</text>
<text x="690" y="254" font-size="9" fill="#424242">• 特殊业务需求</text>
<text x="690" y="278" font-size="10" fill="#F57C00" font-weight="bold">推荐指数: ★☆☆☆☆</text>
<text x="690" y="298" font-size="8" fill="#7F8C8D">已废弃，不推荐</text>
<text x="690" y="320" font-size="9" fill="#E74C3C" font-weight="bold">✗ 已废弃</text>
</svg>

**2. 过滤方式详细对比**

| 对比维度 | Tag 过滤 | SQL92 过滤 | Filter Server |
|---------|---------|-----------|---------------|
| **过滤位置** | Broker 端 | Broker 端 | 独立进程 |
| **性能** | 高 ⚡⚡⚡ | 中 ⚡⚡ | 低 ⚡ |
| **灵活性** | 低 | 高 | 极高 |
| **实现复杂度** | 简单 | 中等 | 复杂 |
| **网络开销** | 小 | 小 | 大 |
| **配置要求** | 无 | 需开启 | 需部署 |
| **维护成本** | 低 | 低 | 高 |
| **推荐程度** | ★★★★★ | ★★★★☆ | ✗ 已废弃 |

**3. 过滤流程对比**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="ar" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#34495E"/>
</marker>
</defs>
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">消息过滤执行流程</text>
<rect x="50" y="60" width="340" height="140" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="220" y="82" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">Tag 过滤流程</text>
<rect x="70" y="95" width="90" height="40" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="115" y="118" text-anchor="middle" font-size="9" fill="#0D47A1">Producer 发送</text>
<rect x="175" y="95" width="90" height="40" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="220" y="110" text-anchor="middle" font-size="9" fill="#0D47A1">Broker 存储</text>
<text x="220" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(带 Tag)</text>
<rect x="280" y="95" width="90" height="40" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="325" y="110" text-anchor="middle" font-size="9" fill="#0D47A1">Consumer 拉取</text>
<text x="325" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(指定 Tag)</text>
<path d="M 160 115 L 170 115" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<path d="M 265 115 L 275 115" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<text x="220" y="160" text-anchor="middle" font-size="9" fill="#2E7D32" font-weight="bold">✓ Broker 端 HashCode 匹配，快速过滤</text>
<text x="220" y="178" text-anchor="middle" font-size="8" fill="#7F8C8D">只返回匹配 Tag 的消息</text>
<rect x="410" y="60" width="340" height="140" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="580" y="82" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">SQL92 过滤流程</text>
<rect x="430" y="95" width="90" height="40" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="475" y="110" text-anchor="middle" font-size="9" fill="#1B5E20">Producer 发送</text>
<text x="475" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(设置属性)</text>
<rect x="535" y="95" width="90" height="40" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="580" y="110" text-anchor="middle" font-size="9" fill="#1B5E20">Broker 存储</text>
<text x="580" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(带属性)</text>
<rect x="640" y="95" width="90" height="40" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="685" y="110" text-anchor="middle" font-size="9" fill="#1B5E20">Consumer 拉取</text>
<text x="685" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(SQL 表达式)</text>
<path d="M 520 115 L 530 115" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<path d="M 625 115 L 635 115" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<text x="580" y="160" text-anchor="middle" font-size="9" fill="#2E7D32" font-weight="bold">✓ Broker 端 SQL 表达式计算</text>
<text x="580" y="178" text-anchor="middle" font-size="8" fill="#7F8C8D">只返回满足条件的消息</text>
<rect x="50" y="220" width="700" height="160" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="242" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">Filter Server 过滤流程 (已废弃)</text>
<rect x="70" y="255" width="80" height="40" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="110" y="278" text-anchor="middle" font-size="9" fill="#E65100">Producer</text>
<rect x="170" y="255" width="80" height="40" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="210" y="278" text-anchor="middle" font-size="9" fill="#E65100">Broker</text>
<rect x="270" y="255" width="80" height="40" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="310" y="270" text-anchor="middle" font-size="9" fill="#E65100">Filter Server</text>
<text x="310" y="285" text-anchor="middle" font-size="7" fill="#7F8C8D">(独立进程)</text>
<rect x="370" y="255" width="80" height="40" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="410" y="270" text-anchor="middle" font-size="9" fill="#E65100">执行自定义</text>
<text x="410" y="285" text-anchor="middle" font-size="7" fill="#7F8C8D">过滤逻辑</text>
<rect x="470" y="255" width="80" height="40" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="510" y="278" text-anchor="middle" font-size="9" fill="#E65100">Consumer</text>
<path d="M 150 275 L 165 275" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<path d="M 250 275 L 265 275" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<path d="M 350 275 L 365 275" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<path d="M 450 275 L 465 275" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<text x="400" y="320" text-anchor="middle" font-size="9" fill="#E74C3C" font-weight="bold">✗ 性能差，部署复杂，已废弃</text>
<text x="400" y="338" text-anchor="middle" font-size="8" fill="#7F8C8D">需要额外部署 Filter Server 进程</text>
<text x="400" y="356" text-anchor="middle" font-size="8" fill="#7F8C8D">建议使用 SQL92 过滤替代</text>
</svg>

**4. 选择建议**

<svg viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg">
<text x="375" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">过滤方式选择指南</text>
<rect x="50" y="50" width="650" height="70" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="375" y="72" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">优先使用 Tag 过滤</text>
<text x="375" y="92" font-size="9" fill="#424242">• 简单场景，按单一维度过滤 (如订单类型、消息级别)</text>
<text x="375" y="108" font-size="9" fill="#424242">• 性能要求高，需要快速过滤大量消息</text>
<rect x="50" y="135" width="650" height="70" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="375" y="157" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57F17">复杂场景使用 SQL92</text>
<text x="375" y="177" font-size="9" fill="#424242">• 需要多条件组合过滤 (如 price > 100 AND region = 'CN')</text>
<text x="375" y="193" font-size="9" fill="#424242">• 需要数值比较、范围判断等复杂逻辑</text>
<rect x="50" y="220" width="650" height="50" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="375" y="242" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">避免使用 Filter Server</text>
<text x="375" y="260" font-size="9" fill="#424242">• 已废弃，不推荐使用，使用 SQL92 替代</text>
</svg>

**5. 代码示例**

```java
// 1. Tag 过滤
// Producer 发送
Message msg = new Message("OrderTopic", "TagA", "订单消息".getBytes());
producer.send(msg);

// Consumer 订阅
consumer.subscribe("OrderTopic", "TagA || TagB");  // 订阅 TagA 或 TagB

// 2. SQL92 过滤
// Producer 发送
Message msg = new Message("OrderTopic", "订单消息".getBytes());
msg.putUserProperty("price", "150");
msg.putUserProperty("region", "CN");
producer.send(msg);

// Consumer 订阅 (需要开启 Broker SQL 过滤配置)
consumer.subscribe("OrderTopic",
    MessageSelector.bySql("price > 100 AND region = 'CN'"));
```

**关键要点:**

1. **Tag 过滤**: 最常用，性能最好，适合简单场景
2. **SQL92 过滤**: 功能强大，适合复杂条件组合
3. **过滤位置**: 都在 Broker 端过滤，减少网络传输
4. **Filter Server**: 已废弃，不推荐使用
5. **选择原则**: 优先 Tag，复杂场景用 SQL92

**记忆口诀:**

```
三种过滤要分清
Tag简单又高效
SQL功能很强大
Filter已废弃掉
Broker端来过滤
减少网络传输量
按需选择最适当
```

### 53. 什么是 Tag 过滤和 SQL92 过滤？

**核心答案:**

- **Tag 过滤**: 基于消息标签的简单字符串匹配过滤，通过 HashCode 快速匹配，性能高
- **SQL92 过滤**: 基于 SQL 语法的属性过滤，支持复杂表达式和多条件组合，功能强大

**详细说明:**

**1. Tag 过滤详解**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Tag 过滤机制</text>
<rect x="50" y="60" width="700" height="120" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">Tag 过滤核心特点</text>
<rect x="80" y="100" width="200" height="60" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="180" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">HashCode 匹配</text>
<text x="180" y="138" font-size="8" fill="#424242">• Tag 转为 HashCode</text>
<text x="180" y="152" font-size="8" fill="#424242">• O(1) 时间复杂度</text>
<rect x="300" y="100" width="200" height="60" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="400" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">Broker 端过滤</text>
<text x="400" y="138" font-size="8" fill="#424242">• 减少网络传输</text>
<text x="400" y="152" font-size="8" fill="#424242">• 提高消费效率</text>
<rect x="520" y="100" width="200" height="60" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="620" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">支持多 Tag</text>
<text x="620" y="138" font-size="8" fill="#424242">• || 表示 OR 关系</text>
<text x="620" y="152" font-size="8" fill="#424242">• * 表示订阅所有</text>
<rect x="50" y="200" width="340" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="220" y="225" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">Tag 过滤工作原理</text>
<text x="220" y="250" font-size="9" fill="#424242">① Producer 发送消息时设置 Tag</text>
<text x="220" y="268" font-size="9" fill="#424242">② Broker 计算 Tag 的 HashCode</text>
<text x="220" y="286" font-size="9" fill="#424242">③ 存储在 ConsumeQueue 索引中</text>
<text x="220" y="304" font-size="9" fill="#424242">④ Consumer 订阅时指定 Tag</text>
<text x="220" y="322" font-size="9" fill="#424242">⑤ Broker 根据 HashCode 快速匹配</text>
<text x="220" y="340" font-size="9" fill="#424242">⑥ 只返回匹配的消息</text>
<text x="220" y="365" font-size="9" fill="#2E7D32" font-weight="bold">✓ 性能: O(1) 快速查找</text>
<rect x="410" y="200" width="340" height="180" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="580" y="225" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">Tag 过滤限制</text>
<text x="580" y="250" font-size="9" fill="#424242">• 只支持单一维度过滤</text>
<text x="580" y="268" font-size="9" fill="#424242">• 不支持 AND 逻辑</text>
<text x="580" y="286" font-size="9" fill="#424242">• 不支持数值比较</text>
<text x="580" y="304" font-size="9" fill="#424242">• 不支持范围查询</text>
<text x="580" y="330" font-size="9" fill="#E74C3C" font-weight="bold">示例:</text>
<text x="580" y="348" font-size="8" fill="#7F8C8D">✓ 支持: TagA || TagB</text>
<text x="580" y="363" font-size="8" fill="#7F8C8D">✗ 不支持: TagA &amp;&amp; TagB</text>
</svg>

**2. SQL92 过滤详解**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">SQL92 过滤机制</text>
<rect x="50" y="60" width="700" height="140" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">SQL92 过滤核心特点</text>
<rect x="80" y="100" width="200" height="80" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="180" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#1B5E20">SQL 语法</text>
<text x="180" y="138" font-size="8" fill="#424242">• 支持 AND/OR/NOT</text>
<text x="180" y="152" font-size="8" fill="#424242">• 支持比较运算符</text>
<text x="180" y="166" font-size="8" fill="#424242">• 支持 IN/BETWEEN</text>
<rect x="300" y="100" width="200" height="80" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="400" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#1B5E20">属性过滤</text>
<text x="400" y="138" font-size="8" fill="#424242">• 用户自定义属性</text>
<text x="400" y="152" font-size="8" fill="#424242">• 数值/字符串比较</text>
<text x="400" y="166" font-size="8" fill="#424242">• 复杂条件组合</text>
<rect x="520" y="100" width="200" height="80" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="620" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#1B5E20">Broker 计算</text>
<text x="620" y="138" font-size="8" fill="#424242">• 表达式预编译</text>
<text x="620" y="152" font-size="8" fill="#424242">• 运行时计算</text>
<text x="620" y="166" font-size="8" fill="#424242">• 布尔值判断</text>
<rect x="50" y="220" width="340" height="180" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="220" y="245" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">SQL92 过滤工作原理</text>
<text x="220" y="270" font-size="9" fill="#424242">① Producer 设置用户属性</text>
<text x="220" y="288" font-size="9" fill="#424242">② Broker 存储消息和属性</text>
<text x="220" y="306" font-size="9" fill="#424242">③ Consumer 指定 SQL 表达式</text>
<text x="220" y="324" font-size="9" fill="#424242">④ Broker 编译 SQL 表达式</text>
<text x="220" y="342" font-size="9" fill="#424242">⑤ 逐条计算消息是否匹配</text>
<text x="220" y="360" font-size="9" fill="#424242">⑥ 返回满足条件的消息</text>
<text x="220" y="385" font-size="9" fill="#9C27B0" font-weight="bold">✓ 功能: 支持复杂逻辑</text>
<rect x="410" y="220" width="340" height="180" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="580" y="245" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57F17">SQL92 支持的语法</text>
<text x="580" y="270" font-size="9" fill="#424242">• 逻辑运算: AND, OR, NOT</text>
<text x="580" y="288" font-size="9" fill="#424242">• 比较运算: &gt;, &gt;=, &lt;, &lt;=, =, !=</text>
<text x="580" y="306" font-size="9" fill="#424242">• 范围判断: BETWEEN...AND</text>
<text x="580" y="324" font-size="9" fill="#424242">• 集合判断: IN (val1, val2)</text>
<text x="580" y="342" font-size="9" fill="#424242">• NULL 判断: IS NULL, IS NOT NULL</text>
<text x="580" y="368" font-size="9" fill="#F57F17" font-weight="bold">示例:</text>
<text x="580" y="386" font-size="8" fill="#7F8C8D">price &gt; 100 AND region = 'CN'</text>
</svg>

**3. Tag 与 SQL92 对比**

| 对比维度 | Tag 过滤 | SQL92 过滤 |
|---------|---------|-----------|
| **匹配方式** | HashCode 匹配 | SQL 表达式计算 |
| **时间复杂度** | O(1) | O(n) n=属性数量 |
| **性能** | 极高 | 中等 |
| **支持逻辑** | OR (用 \|\|) | AND, OR, NOT |
| **比较运算** | 不支持 | 支持 >, <, =, != 等 |
| **范围查询** | 不支持 | 支持 BETWEEN, IN |
| **配置要求** | 无 | 需开启配置 |
| **使用场景** | 简单分类过滤 | 复杂条件组合 |
| **典型示例** | TagA \|\| TagB | price > 100 AND region = 'CN' |

**4. 使用场景对比**

<svg viewBox="0 0 750 350" xmlns="http://www.w3.org/2000/svg">
<text x="375" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Tag 与 SQL92 场景选择</text>
<rect x="50" y="60" width="650" height="130" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="375" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">Tag 过滤适用场景</text>
<text x="375" y="105" font-size="9" fill="#424242">• 订单类型分类: 普通订单、会员订单、秒杀订单</text>
<text x="375" y="122" font-size="9" fill="#424242">• 消息级别划分: INFO、WARN、ERROR</text>
<text x="375" y="139" font-size="9" fill="#424242">• 业务模块分类: 支付、物流、库存</text>
<text x="375" y="156" font-size="9" fill="#424242">• 用户分组: VIP、普通用户</text>
<text x="375" y="175" font-size="9" fill="#2E7D32" font-weight="bold">✓ 特点: 单一维度，简单分类</text>
<rect x="50" y="210" width="650" height="130" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="375" y="232" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">SQL92 过滤适用场景</text>
<text x="375" y="255" font-size="9" fill="#424242">• 价格范围筛选: price &gt; 100 AND price &lt; 500</text>
<text x="375" y="272" font-size="9" fill="#424242">• 区域+级别组合: region = 'CN' AND level &gt;= 3</text>
<text x="375" y="289" font-size="9" fill="#424242">• 时间范围过滤: timestamp BETWEEN 1000 AND 2000</text>
<text x="375" y="306" font-size="9" fill="#424242">• 多条件组合: age &gt; 18 AND city IN ('Beijing', 'Shanghai')</text>
<text x="375" y="325" font-size="9" fill="#2E7D32" font-weight="bold">✓ 特点: 多维度，复杂逻辑</text>
</svg>

**5. 代码示例对比**

```java
// Tag 过滤示例
// Producer
Message msg = new Message("OrderTopic", "VIP_ORDER", "订单数据".getBytes());
producer.send(msg);

// Consumer
consumer.subscribe("OrderTopic", "VIP_ORDER || NORMAL_ORDER");

// SQL92 过滤示例
// Producer
Message msg = new Message("OrderTopic", "订单数据".getBytes());
msg.putUserProperty("price", "150");
msg.putUserProperty("region", "CN");
msg.putUserProperty("vipLevel", "3");
producer.send(msg);

// Consumer (需要开启 Broker 配置: enablePropertyFilter=true)
consumer.subscribe("OrderTopic",
    MessageSelector.bySql("price > 100 AND region = 'CN' AND vipLevel >= 2"));
```

**关键要点:**

1. **Tag 过滤**: HashCode 快速匹配，性能最优，适合简单分类
2. **SQL92 过滤**: SQL 表达式计算，功能强大，适合复杂条件
3. **过滤位置**: 都在 Broker 端过滤，减少网络传输
4. **选择原则**: 能用 Tag 就用 Tag，复杂需求才用 SQL92
5. **配置要求**: SQL92 需要开启 Broker 配置 enablePropertyFilter=true

**记忆口诀:**

```
Tag过滤哈希快
SQL语法功能强
简单场景用Tag
复杂逻辑SQL上
Broker端来过滤
性能网络都优良
```

### 54. 如何使用 Tag 进行消息过滤？

**核心答案:**

Tag 过滤分为三步：
1. **Producer 发送时设置 Tag**
2. **Consumer 订阅时指定 Tag 表达式**
3. **Broker 根据 HashCode 快速匹配返回**

**详细说明:**

**1. Producer 发送消息设置 Tag**

```java
// 方式1: 构造函数设置 Tag
Message msg = new Message(
    "OrderTopic",        // Topic
    "VIP_ORDER",         // Tag
    "订单数据".getBytes() // Body
);
producer.send(msg);

// 方式2: setTags 方法设置
Message msg = new Message("OrderTopic", "订单数据".getBytes());
msg.setTags("VIP_ORDER");
producer.send(msg);
```

**2. Consumer 订阅时指定 Tag**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Tag 订阅语法</text>
<rect x="50" y="60" width="700" height="140" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">Tag 订阅表达式</text>
<rect x="80" y="105" width="200" height="75" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="180" y="125" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">单个 Tag</text>
<text x="180" y="145" font-family="monospace" font-size="9" fill="#C62828">"TagA"</text>
<text x="180" y="163" font-size="8" fill="#7F8C8D">只订阅 TagA 消息</text>
<rect x="300" y="105" width="200" height="75" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="400" y="125" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">多个 Tag (OR)</text>
<text x="400" y="145" font-family="monospace" font-size="9" fill="#C62828">"TagA || TagB"</text>
<text x="400" y="163" font-size="8" fill="#7F8C8D">订阅 TagA 或 TagB</text>
<rect x="520" y="105" width="200" height="75" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="620" y="125" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">订阅所有</text>
<text x="620" y="145" font-family="monospace" font-size="9" fill="#C62828">"*" 或 null</text>
<text x="620" y="163" font-size="8" fill="#7F8C8D">订阅所有 Tag</text>
<rect x="50" y="220" width="340" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="220" y="245" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">订阅代码示例</text>
<text x="220" y="270" font-family="monospace" font-size="9" fill="#424242">// 订阅单个 Tag</text>
<text x="220" y="286" font-family="monospace" font-size="9" fill="#2E7D32">consumer.subscribe("OrderTopic", "VIP");</text>
<text x="220" y="310" font-family="monospace" font-size="9" fill="#424242">// 订阅多个 Tag</text>
<text x="220" y="326" font-family="monospace" font-size="9" fill="#2E7D32">consumer.subscribe("OrderTopic",</text>
<text x="220" y="342" font-family="monospace" font-size="9" fill="#2E7D32">  "VIP || NORMAL || SECKILL");</text>
<text x="220" y="366" font-family="monospace" font-size="9" fill="#424242">// 订阅所有 Tag</text>
<text x="220" y="382" font-family="monospace" font-size="9" fill="#2E7D32">consumer.subscribe("OrderTopic", "*");</text>
<rect x="410" y="220" width="340" height="180" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="580" y="245" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">注意事项</text>
<text x="580" y="270" font-size="9" fill="#424242">✓ 支持: || (OR 逻辑)</text>
<text x="580" y="288" font-size="9" fill="#424242">✗ 不支持: &amp;&amp; (AND 逻辑)</text>
<text x="580" y="306" font-size="9" fill="#424242">✗ 不支持: ! (NOT 逻辑)</text>
<text x="580" y="324" font-size="9" fill="#424242">✗ 不支持: 正则表达式</text>
<text x="580" y="350" font-size="9" fill="#E74C3C" font-weight="bold">错误示例:</text>
<text x="580" y="368" font-family="monospace" font-size="8" fill="#7F8C8D">"TagA &amp;&amp; TagB" // 错误!</text>
<text x="580" y="383" font-family="monospace" font-size="8" fill="#7F8C8D">"!TagA" // 错误!</text>
</svg>

**3. 完整使用示例**

```java
// ========== Producer 端 ==========
public class TagProducer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        // 发送不同 Tag 的消息
        // VIP 订单
        Message vipMsg = new Message("OrderTopic", "VIP_ORDER",
            "VIP用户订单数据".getBytes());
        producer.send(vipMsg);

        // 普通订单
        Message normalMsg = new Message("OrderTopic", "NORMAL_ORDER",
            "普通用户订单数据".getBytes());
        producer.send(normalMsg);

        // 秒杀订单
        Message seckillMsg = new Message("OrderTopic", "SECKILL_ORDER",
            "秒杀订单数据".getBytes());
        producer.send(seckillMsg);

        producer.shutdown();
    }
}

// ========== Consumer 端 ==========
public class TagConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");

        // 场景1: 只消费 VIP 订单
        consumer.subscribe("OrderTopic", "VIP_ORDER");

        // 场景2: 消费 VIP 和秒杀订单
        // consumer.subscribe("OrderTopic", "VIP_ORDER || SECKILL_ORDER");

        // 场景3: 消费所有订单
        // consumer.subscribe("OrderTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    String tag = msg.getTags();
                    String body = new String(msg.getBody());
                    System.out.println("接收到 Tag=" + tag + ", 内容=" + body);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("Consumer 启动成功");
    }
}
```

**4. Tag 过滤实战场景**

<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Tag 过滤实战场景</text>
<rect x="50" y="50" width="700" height="420" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">场景1: 订单系统</text>
<rect x="80" y="90" width="200" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="180" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">Producer</text>
<text x="180" y="128" font-size="8" fill="#424242">VIP_ORDER</text>
<text x="180" y="142" font-size="8" fill="#424242">NORMAL_ORDER</text>
<text x="180" y="156" font-size="8" fill="#424242">SECKILL_ORDER</text>
<rect x="300" y="90" width="200" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="400" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Consumer1</text>
<text x="400" y="128" font-size="8" fill="#424242">订阅: VIP_ORDER</text>
<text x="400" y="142" font-size="8" fill="#7F8C8D">只处理 VIP 订单</text>
<text x="400" y="156" font-size="8" fill="#7F8C8D">优先发货</text>
<rect x="520" y="90" width="200" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="620" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="#F57C00">Consumer2</text>
<text x="620" y="128" font-size="8" fill="#424242">订阅: *</text>
<text x="620" y="142" font-size="8" fill="#7F8C8D">处理所有订单</text>
<text x="620" y="156" font-size="8" fill="#7F8C8D">统计分析</text>
<text x="400" y="195" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">场景2: 日志系统</text>
<rect x="80" y="210" width="200" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="180" y="230" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">Producer</text>
<text x="180" y="248" font-size="8" fill="#424242">INFO</text>
<text x="180" y="262" font-size="8" fill="#424242">WARN</text>
<text x="180" y="276" font-size="8" fill="#424242">ERROR</text>
<rect x="300" y="210" width="200" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="400" y="230" text-anchor="middle" font-size="10" font-weight="bold" fill="#C62828">Consumer1</text>
<text x="400" y="248" font-size="8" fill="#424242">订阅: ERROR</text>
<text x="400" y="262" font-size="8" fill="#7F8C8D">只处理错误日志</text>
<text x="400" y="276" font-size="8" fill="#7F8C8D">发送告警</text>
<rect x="520" y="210" width="200" height="80" fill="#FFF9C4" stroke="#FBC02D" stroke-width="1" rx="3"/>
<text x="620" y="230" text-anchor="middle" font-size="10" font-weight="bold" fill="#F57F17">Consumer2</text>
<text x="620" y="248" font-size="8" fill="#424242">订阅: WARN || ERROR</text>
<text x="620" y="262" font-size="8" fill="#7F8C8D">处理警告和错误</text>
<text x="620" y="276" font-size="8" fill="#7F8C8D">记录到数据库</text>
<text x="400" y="315" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">场景3: 支付系统</text>
<rect x="80" y="330" width="200" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="180" y="350" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">Producer</text>
<text x="180" y="368" font-size="8" fill="#424242">PAY_SUCCESS</text>
<text x="180" y="382" font-size="8" fill="#424242">PAY_FAIL</text>
<text x="180" y="396" font-size="8" fill="#424242">REFUND</text>
<rect x="300" y="330" width="200" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="400" y="350" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Consumer1</text>
<text x="400" y="368" font-size="8" fill="#424242">订阅: PAY_SUCCESS</text>
<text x="400" y="382" font-size="8" fill="#7F8C8D">发货通知</text>
<text x="400" y="396" font-size="8" fill="#7F8C8D">增加积分</text>
<rect x="520" y="330" width="200" height="80" fill="#F3E5F5" stroke="#9C27B0" stroke-width="1" rx="3"/>
<text x="620" y="350" text-anchor="middle" font-size="10" font-weight="bold" fill="#7B1FA2">Consumer2</text>
<text x="620" y="368" font-size="8" fill="#424242">订阅: PAY_FAIL</text>
<text x="620" y="382" font-size="8" fill="#7F8C8D">重试支付</text>
<text x="620" y="396" font-size="8" fill="#7F8C8D">通知用户</text>
<text x="400" y="435" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">✓ Tag 过滤适合按业务类型分类的场景</text>
<text x="400" y="455" text-anchor="middle" font-size="9" fill="#7F8C8D">简单、高效、易于维护</text>
</svg>

**5. Tag 过滤最佳实践**

| 最佳实践 | 说明 | 示例 |
|---------|------|------|
| **Tag 命名规范** | 使用大写+下划线，语义清晰 | VIP_ORDER, PAY_SUCCESS |
| **Tag 不宜过多** | 建议单个 Topic 不超过 10 个 Tag | 避免管理混乱 |
| **避免动态 Tag** | Tag 应该是预定义的常量 | 不要用 userId 作为 Tag |
| **订阅使用常量** | 避免硬编码字符串 | `static final String TAG_VIP = "VIP_ORDER"` |
| **合理使用 * ** | 只在真正需要所有消息时使用 | 统计、监控场景 |
| **Consumer 区分** | 不同消费逻辑用不同 ConsumerGroup | 避免相互影响 |

**关键要点:**

1. **发送设置**: Message 构造函数或 setTags() 方法设置 Tag
2. **订阅语法**: 单 Tag 直接字符串，多 Tag 用 || 分隔，* 表示所有
3. **过滤位置**: Broker 端根据 HashCode 快速过滤
4. **性能最优**: O(1) 时间复杂度，适合高并发场景
5. **局限性**: 只支持 OR 逻辑，不支持 AND/NOT

**记忆口诀:**

```
Producer设Tag
Consumer订阅它
单个直接写
多个竖线连
星号订全部
Broker快速滤
哈希O(1)查
性能最优化
```

### 55. 如何使用 SQL92 进行消息过滤？
**核心答案:**

SQL92 过滤分为四步：
1. **Broker 开启 SQL 过滤配置**
2. **Producer 设置消息属性**
3. **Consumer 使用 SQL 表达式订阅**
4. **Broker 计算表达式返回匹配消息**

**详细说明:**

**1. Broker 开启 SQL 过滤配置**

```properties
# broker.conf 配置文件
# 开启 SQL92 过滤支持
enablePropertyFilter=true
```

```bash
# 启动 Broker 时指定配置
sh bin/mqbroker -n localhost:9876 -c conf/broker.conf
```

**2. Producer 设置消息属性**

```java
Message msg = new Message("OrderTopic", "订单数据".getBytes());

// 设置用户自定义属性
msg.putUserProperty("price", "150");           // 价格
msg.putUserProperty("region", "CN");           // 区域
msg.putUserProperty("vipLevel", "3");          // VIP 等级
msg.putUserProperty("category", "electronics"); // 类别

producer.send(msg);
```

**3. SQL92 支持的语法**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">SQL92 过滤语法</text>
<rect x="50" y="60" width="750" height="420" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="425" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">支持的运算符和语法</text>
<rect x="80" y="100" width="330" height="170" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="245" y="122" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">比较运算符</text>
<text x="245" y="145" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">&gt;</text> 大于: price &gt; 100</text>
<text x="245" y="163" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">&gt;=</text> 大于等于: age &gt;= 18</text>
<text x="245" y="181" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">&lt;</text> 小于: stock &lt; 10</text>
<text x="245" y="199" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">&lt;=</text> 小于等于: discount &lt;= 0.5</text>
<text x="245" y="217" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">=</text> 等于: region = 'CN'</text>
<text x="245" y="235" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">!=</text> 或 <text font-weight="bold" fill="#C62828">&lt;&gt;</text> 不等于: status != 'closed'</text>
<text x="245" y="258" font-size="8" fill="#2E7D32" font-weight="bold">✓ 支持数值和字符串比较</text>
<rect x="440" y="100" width="330" height="170" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="605" y="122" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">逻辑运算符</text>
<text x="605" y="145" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">AND</text> 与: price &gt; 100 AND region = 'CN'</text>
<text x="605" y="163" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">OR</text> 或: level = 1 OR level = 2</text>
<text x="605" y="181" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">NOT</text> 非: NOT (status = 'closed')</text>
<text x="605" y="207" font-size="9" fill="#424242">括号优先级:</text>
<text x="605" y="225" font-family="monospace" font-size="8" fill="#9C27B0">(price&gt;100 AND region='CN')</text>
<text x="605" y="243" font-family="monospace" font-size="8" fill="#9C27B0">OR vipLevel &gt;= 3</text>
<rect x="80" y="290" width="330" height="140" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="245" y="312" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">范围和集合</text>
<text x="245" y="335" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">BETWEEN...AND</text> 范围:</text>
<text x="245" y="351" font-family="monospace" font-size="8" fill="#9C27B0">price BETWEEN 100 AND 500</text>
<text x="245" y="375" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">IN</text> 集合:</text>
<text x="245" y="391" font-family="monospace" font-size="8" fill="#9C27B0">region IN ('CN', 'US', 'JP')</text>
<text x="245" y="415" font-size="8" fill="#F57C00" font-weight="bold">✓ 简化多条件判断</text>
<rect x="440" y="290" width="330" height="140" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="605" y="312" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">NULL 判断</text>
<text x="605" y="335" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">IS NULL</text> 为空:</text>
<text x="605" y="351" font-family="monospace" font-size="8" fill="#9C27B0">remark IS NULL</text>
<text x="605" y="375" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">IS NOT NULL</text> 非空:</text>
<text x="605" y="391" font-family="monospace" font-size="8" fill="#9C27B0">phone IS NOT NULL</text>
<text x="605" y="415" font-size="8" fill="#7B1FA2" font-weight="bold">✓ 检查属性是否存在</text>
<text x="425" y="460" text-anchor="middle" font-size="10" fill="#E74C3C" font-weight="bold">⚠️ 注意: 不支持 LIKE、JOIN、子查询等复杂 SQL 语法</text>
</svg>

**4. Consumer 使用 SQL 订阅**

```java
import org.apache.rocketmq.client.consumer.MessageSelector;

public class SQL92Consumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");

        // 使用 SQL92 表达式订阅
        consumer.subscribe("OrderTopic",
            MessageSelector.bySql("price > 100 AND region = 'CN'"));

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    // 获取消息属性
                    String price = msg.getUserProperty("price");
                    String region = msg.getUserProperty("region");
                    String body = new String(msg.getBody());
                    System.out.println("Price=" + price + ", Region=" + region + ", Body=" + body);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }
}
```

**5. 完整使用示例**

```java
// ========== Producer 端 ==========
public class SQL92Producer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        // 发送不同属性的消息
        for (int i = 0; i < 10; i++) {
            Message msg = new Message("OrderTopic",
                ("订单数据-" + i).getBytes());

            // 设置消息属性
            msg.putUserProperty("price", String.valueOf(50 + i * 20));
            msg.putUserProperty("region", i % 2 == 0 ? "CN" : "US");
            msg.putUserProperty("vipLevel", String.valueOf(i % 4));

            SendResult result = producer.send(msg);
            System.out.println("发送消息: price=" + msg.getUserProperty("price")
                + ", region=" + msg.getUserProperty("region"));
        }

        producer.shutdown();
    }
}

// ========== Consumer 端 ==========
public class SQL92Consumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");

        // 场景1: 价格大于100且区域为CN的订单
        String sql1 = "price > 100 AND region = 'CN'";

        // 场景2: VIP等级大于等于2或价格大于150
        String sql2 = "vipLevel >= 2 OR price > 150";

        // 场景3: 价格在100-200之间且不是US区域
        String sql3 = "price BETWEEN 100 AND 200 AND region != 'US'";

        // 场景4: 区域在指定列表中且VIP等级非空
        String sql4 = "region IN ('CN', 'JP', 'KR') AND vipLevel IS NOT NULL";

        consumer.subscribe("OrderTopic", MessageSelector.bySql(sql1));

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    System.out.println("消费消息: " + new String(msg.getBody()));
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }
}
```

**6. 实战场景示例**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">SQL92 过滤实战场景</text>
<rect x="50" y="50" width="700" height="360" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">电商场景: 订单过滤</text>
<rect x="70" y="90" width="660" height="70" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="400" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">Consumer1: 高价值订单处理</text>
<text x="400" y="128" font-family="monospace" font-size="8" fill="#C62828">price &gt; 1000 AND region = 'CN' AND vipLevel &gt;= 3</text>
<text x="400" y="146" font-size="8" fill="#7F8C8D">处理国内高价值VIP订单,优先发货</text>
<rect x="70" y="175" width="660" height="70" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="400" y="195" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Consumer2: 促销订单监控</text>
<text x="400" y="213" font-family="monospace" font-size="8" fill="#C62828">price BETWEEN 100 AND 500 AND category IN ('electronics', 'clothing')</text>
<text x="400" y="231" font-size="8" fill="#7F8C8D">监控促销商品订单,统计分析</text>
<text x="400" y="270" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">金融场景: 风控过滤</text>
<rect x="70" y="285" width="660" height="55" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="400" y="305" text-anchor="middle" font-size="10" font-weight="bold" fill="#F57C00">Consumer1: 大额交易监控</text>
<text x="400" y="323" font-family="monospace" font-size="8" fill="#C62828">amount &gt; 50000 AND (type = 'transfer' OR type = 'withdraw')</text>
<rect x="70" y="350" width="660" height="55" fill="#FCE4EC" stroke="#E91E63" stroke-width="1" rx="3"/>
<text x="400" y="370" text-anchor="middle" font-size="10" font-weight="bold" fill="#C2185B">Consumer2: 异常交易告警</text>
<text x="400" y="388" font-family="monospace" font-size="8" fill="#C62828">riskLevel &gt;= 3 AND frequency &gt; 10 AND NOT (region = 'trusted')</text>
</svg>

**7. SQL92 过滤最佳实践**

| 最佳实践 | 说明 | 示例 |
|---------|------|------|
| **属性命名规范** | 使用驼峰命名,语义清晰 | price, vipLevel, orderStatus |
| **数据类型统一** | 数值用数值,字符串用字符串 | price=100 而非 price="100" |
| **避免过于复杂** | 表达式不超过5个条件 | 太复杂考虑拆分多个 Consumer |
| **性能考虑** | SQL 计算比 Tag 慢,合理使用 | 简单场景优先用 Tag |
| **测试验证** | 上线前充分测试表达式 | 避免过滤逻辑错误 |
| **开启配置** | 确保 Broker 开启支持 | enablePropertyFilter=true |

**8. SQL92 vs Tag 选择指南**

```
使用 Tag:
✓ 简单分类 (订单类型、消息级别)
✓ 单一维度
✓ 性能要求极高
✓ 不需要数值比较

使用 SQL92:
✓ 多维度组合 (价格+区域+等级)
✓ 需要数值比较 (price > 100)
✓ 需要范围判断 (BETWEEN, IN)
✓ 复杂业务逻辑
```

**关键要点:**

1. **开启配置**: Broker 必须配置 enablePropertyFilter=true
2. **设置属性**: Producer 使用 putUserProperty 设置属性
3. **SQL 订阅**: Consumer 使用 MessageSelector.bySql() 订阅
4. **支持语法**: 比较、逻辑、范围、NULL 判断，不支持 LIKE 等
5. **性能权衡**: 比 Tag 慢，但比客户端过滤快很多

**记忆口诀:**

```
开启配置第一步
Producer设属性
Consumer写SQL
AND OR NOT 逻辑
大于小于等于比
BETWEEN IN 范围查
Broker端来计算
复杂过滤它最佳
```

### 56. 如何提高 RocketMQ 的性能？

**核心答案:**

提高 RocketMQ 性能从五个维度优化：
1. **Producer 优化**：批量发送、异步发送、压缩消息
2. **Broker 优化**：调整刷盘策略、增加内存、优化存储
3. **Consumer 优化**：并发消费、批量拉取、异步消费
4. **网络优化**：调整缓冲区、使用高速网络、减少序列化
5. **系统优化**：JVM 调优、操作系统参数、硬件升级

**详细说明:**

**1. Producer 端性能优化**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Producer 性能优化策略</text>
<rect x="50" y="50" width="700" height="340" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="80" y="70" width="210" height="140" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="185" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">批量发送</text>
<text x="95" y="115" font-size="9" fill="#424242">• 使用 sendBatch() 方法</text>
<text x="95" y="133" font-size="9" fill="#424242">• 每批 32-128 条消息</text>
<text x="95" y="151" font-size="9" fill="#424242">• 减少网络IO次数</text>
<text x="185" y="175" font-size="10" font-weight="bold" fill="#2E7D32">提升 10-30%</text>
<text x="185" y="195" font-size="8" fill="#7F8C8D">适用场景: 高吞吐量</text>
<rect x="310" y="70" width="210" height="140" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="415" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">异步发送</text>
<text x="325" y="115" font-size="9" fill="#424242">• sendAsync() 方法</text>
<text x="325" y="133" font-size="9" fill="#424242">• 不阻塞主线程</text>
<text x="325" y="151" font-size="9" fill="#424242">• 使用回调处理结果</text>
<text x="415" y="175" font-size="10" font-weight="bold" fill="#2E7D32">提升 50-100%</text>
<text x="415" y="195" font-size="8" fill="#7F8C8D">适用场景: 低延迟要求</text>
<rect x="540" y="70" width="210" height="140" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="645" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">消息压缩</text>
<text x="555" y="115" font-size="9" fill="#424242">• 启用压缩: Gzip/LZ4</text>
<text x="555" y="133" font-size="9" fill="#424242">• 减少网络传输量</text>
<text x="555" y="151" font-size="9" fill="#424242">• 适用大消息体</text>
<text x="645" y="175" font-size="10" font-weight="bold" fill="#2E7D32">减少 50-70%</text>
<text x="645" y="195" font-size="8" fill="#7F8C8D">适用场景: 大消息传输</text>
<rect x="80" y="230" width="320" height="140" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="240" y="252" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">单向发送</text>
<text x="95" y="275" font-size="9" fill="#424242">• sendOneway() 方法</text>
<text x="95" y="293" font-size="9" fill="#424242">• 不等待响应</text>
<text x="95" y="311" font-size="9" fill="#424242">• 最高吞吐量</text>
<text x="95" y="329" font-size="9" fill="#424242">⚠️ 可能丢失消息</text>
<text x="240" y="355" font-size="8" fill="#7F8C8D">适用场景: 日志、监控数据</text>
<rect x="420" y="230" width="330" height="140" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="585" y="252" text-anchor="middle" font-size="11" font-weight="bold" fill="#C2185B">线程池调优</text>
<text x="435" y="275" font-size="9" fill="#424242">• 调整发送线程数</text>
<text x="435" y="293" font-size="9" fill="#424242">• 异步发送队列大小</text>
<text x="435" y="311" font-size="9" fill="#424242">• 超时时间合理设置</text>
<text x="585" y="335" font-family="monospace" font-size="8" fill="#9C27B0">sendThreadPoolNums=4</text>
<text x="585" y="355" font-family="monospace" font-size="8" fill="#9C27B0">sendMsgTimeout=3000</text>
</svg>

**2. Broker 端性能优化**

| 优化项 | 配置参数 | 推荐值 | 说明 |
|-------|---------|--------|------|
| **刷盘策略** | flushDiskType | ASYNC_FLUSH | 异步刷盘,提升10倍性能 |
| **堆内存** | -Xms, -Xmx | 8-16GB | 增加PageCache命中率 |
| **直接内存** | -XX:MaxDirectMemorySize | 16GB | 零拷贝缓冲区 |
| **页缓存** | transientStorePoolEnable | true | 启用堆外内存池 |
| **IO线程** | sendMessageThreadPoolNums | 16-32 | 增加并发处理能力 |
| **磁盘** | - | SSD | 降低IO延迟 |

```properties
# broker.conf 性能优化配置
# 刷盘策略
flushDiskType=ASYNC_FLUSH

# 异步刷盘间隔(毫秒)
flushIntervalCommitLog=200

# 启用堆外内存池
transientStorePoolEnable=true
transientStorePoolSize=10

# 发送消息线程数
sendMessageThreadPoolNums=32

# 消费消息线程数
pullMessageThreadPoolNums=32

# 文件预热
warmMapedFileEnable=true

# 使用mmap预读取
transferMsgByHeap=false
```

**3. Consumer 端性能优化**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Consumer 性能优化策略</text>
<rect x="50" y="50" width="700" height="290" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="80" y="70" width="210" height="120" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="185" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">并发消费</text>
<text x="95" y="115" font-size="9" fill="#424242">• 增加消费线程数</text>
<text x="185" y="135" font-family="monospace" font-size="8" fill="#9C27B0">setConsumeThreadMin(20)</text>
<text x="185" y="153" font-family="monospace" font-size="8" fill="#9C27B0">setConsumeThreadMax(64)</text>
<text x="185" y="177" font-size="9" fill="#2E7D32" font-weight="bold">线性提升吞吐量</text>
<rect x="310" y="70" width="210" height="120" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="415" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">批量拉取</text>
<text x="325" y="115" font-size="9" fill="#424242">• 增加拉取批次大小</text>
<text x="415" y="135" font-family="monospace" font-size="8" fill="#9C27B0">setPullBatchSize(64)</text>
<text x="415" y="153" font-family="monospace" font-size="8" fill="#9C27B0">setConsumeMessageBatchMaxSize(16)</text>
<text x="415" y="177" font-size="9" fill="#2E7D32" font-weight="bold">减少拉取次数</text>
<rect x="540" y="70" width="210" height="120" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="645" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">优化消费逻辑</text>
<text x="555" y="115" font-size="9" fill="#424242">• 减少业务处理时间</text>
<text x="555" y="133" font-size="9" fill="#424242">• 异步处理耗时操作</text>
<text x="555" y="151" font-size="9" fill="#424242">• 批量处理数据库写入</text>
<text x="645" y="177" font-size="9" fill="#2E7D32" font-weight="bold">提升消费速度</text>
<rect x="80" y="210" width="320" height="110" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="240" y="232" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">增加消费者实例</text>
<text x="95" y="255" font-size="9" fill="#424242">• 横向扩展消费者数量</text>
<text x="95" y="273" font-size="9" fill="#424242">• 每个队列至少一个消费者</text>
<text x="95" y="291" font-size="9" fill="#424242">• 注意: 消费者数 ≤ 队列数</text>
<rect x="420" y="210" width="330" height="110" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="585" y="232" text-anchor="middle" font-size="11" font-weight="bold" fill="#C2185B">流量控制</text>
<text x="435" y="255" font-size="9" fill="#424242">• 限制单次拉取数量</text>
<text x="435" y="273" font-size="9" fill="#424242">• 控制拉取频率</text>
<text x="585" y="295" font-family="monospace" font-size="8" fill="#9C27B0">setPullThresholdForQueue(1000)</text>
</svg>

**4. 网络优化**

```java
// Producer 网络优化
DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");

// 增大发送缓冲区
producer.setClientCallbackExecutorThreads(4);

// 压缩消息体
producer.setCompressMsgBodyOverHowmuch(4096); // 超过4KB压缩

// 最大消息大小
producer.setMaxMessageSize(4 * 1024 * 1024); // 4MB

// 发送超时
producer.setSendMsgTimeout(3000); // 3秒
```

```java
// Consumer 网络优化
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");

// 拉取批次大小
consumer.setPullBatchSize(64);

// 拉取间隔
consumer.setPullInterval(0); // 立即拉取

// 拉取阈值(每个队列最大缓存消息数)
consumer.setPullThresholdForQueue(1000);

// 拉取阈值(每个队列最大缓存消息大小MB)
consumer.setPullThresholdSizeForQueue(100);
```

**5. JVM 调优**

```bash
# Broker JVM 参数推荐
-server
-Xms8g -Xmx8g -Xmn4g

# 使用G1收集器
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200

# 直接内存
-XX:MaxDirectMemorySize=16g

# GC日志
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
-Xloggc:/dev/shm/mq_gc_%p.log

# 优化参数
-XX:+DisableExplicitGC
-XX:+AlwaysPreTouch
-XX:-OmitStackTraceInFastThrow
```

**6. 操作系统优化**

```bash
# 增加文件描述符限制
ulimit -n 1000000

# 调整TCP参数
echo "net.ipv4.tcp_max_syn_backlog = 8192" >> /etc/sysctl.conf
echo "net.core.somaxconn = 8192" >> /etc/sysctl.conf
echo "net.ipv4.tcp_tw_reuse = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_fin_timeout = 30" >> /etc/sysctl.conf

# 磁盘调度算法(SSD使用noop或deadline)
echo deadline > /sys/block/sda/queue/scheduler

# 关闭swap
swapoff -a

# 应用配置
sysctl -p
```

**7. 性能提升对比**

| 优化措施 | 优化前 TPS | 优化后 TPS | 提升比例 |
|---------|-----------|-----------|---------|
| 批量发送 | 10,000 | 15,000 | +50% |
| 异步发送 | 10,000 | 20,000 | +100% |
| 异步刷盘 | 5,000 | 50,000 | +900% |
| 消息压缩 | 8,000(大消息) | 15,000 | +87% |
| 并发消费 | 5,000 | 20,000 | +300% |
| **综合优化** | **10,000** | **100,000+** | **+900%** |

**8. 性能优化检查清单**

<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">性能优化检查清单</text>
<rect x="50" y="50" width="600" height="360" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="80" y="80" font-size="11" font-weight="bold" fill="#1976D2">□ Producer 层</text>
<text x="100" y="100" font-size="9" fill="#424242">□ 使用批量发送(batch size 32-128)</text>
<text x="100" y="118" font-size="9" fill="#424242">□ 使用异步发送(低延迟场景)</text>
<text x="100" y="136" font-size="9" fill="#424242">□ 启用消息压缩(大消息场景)</text>
<text x="80" y="165" font-size="11" font-weight="bold" fill="#2E7D32">□ Broker 层</text>
<text x="100" y="185" font-size="9" fill="#424242">□ 使用异步刷盘(可容忍极少丢失)</text>
<text x="100" y="203" font-size="9" fill="#424242">□ 增大JVM堆内存(8-16GB)</text>
<text x="100" y="221" font-size="9" fill="#424242">□ 启用堆外内存池(transientStorePoolEnable)</text>
<text x="100" y="239" font-size="9" fill="#424242">□ 使用SSD存储</text>
<text x="80" y="268" font-size="11" font-weight="bold" fill="#F57C00">□ Consumer 层</text>
<text x="100" y="288" font-size="9" fill="#424242">□ 增加消费线程(20-64)</text>
<text x="100" y="306" font-size="9" fill="#424242">□ 增大批量拉取大小(64)</text>
<text x="100" y="324" font-size="9" fill="#424242">□ 优化业务逻辑(异步处理)</text>
<text x="80" y="353" font-size="11" font-weight="bold" fill="#7B1FA2">□ 系统层</text>
<text x="100" y="373" font-size="9" fill="#424242">□ JVM调优(G1收集器)</text>
<text x="100" y="391" font-size="9" fill="#424242">□ 操作系统参数优化(文件描述符、TCP)</text>
</svg>

**关键要点:**

1. **Producer优化**: 批量、异步、压缩是三大利器
2. **Broker优化**: 异步刷盘提升最明显(10倍+)
3. **Consumer优化**: 并发消费和批量拉取提升吞吐
4. **系统优化**: JVM、OS参数也很重要
5. **综合考虑**: 根据场景选择合适的优化策略

**记忆口诀:**

```
Producer三板斧
批量异步和压缩
Broker两关键
异步刷盘加内存
Consumer抓两点
并发拉取要增大
系统别忘记
JVM调优TCP参数
组合使用后
百万TPS不是梦
```



### 57. 如何优化 Producer 的性能?

**核心答案:**

Producer 性能优化六大策略:
1. **批量发送**: 使用 sendBatch() 减少网络 IO
2. **异步发送**: 使用 sendAsync() 提高吞吐量
3. **单向发送**: 使用 sendOneway() 最大化性能
4. **消息压缩**: 启用压缩减少网络传输
5. **连接池优化**: 调整线程池和超时参数
6. **合理分区**: 使用 MessageQueue 均衡负载

**详细说明:**

**1. 批量发送优化**

<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">批量发送 vs 单条发送</text>
<rect x="50" y="50" width="350" height="300" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="225" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#C62828">单条发送(低效)</text>
<rect x="80" y="90" width="290" height="35" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="95" y="110" font-size="9" fill="#1976D2">消息1 → 网络IO → Broker</text>
<rect x="80" y="135" width="290" height="35" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="95" y="155" font-size="9" fill="#1976D2">消息2 → 网络IO → Broker</text>
<rect x="80" y="180" width="290" height="35" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="95" y="200" font-size="9" fill="#1976D2">消息3 → 网络IO → Broker</text>
<text x="225" y="235" font-size="10" fill="#C62828">网络IO: 100次</text>
<text x="225" y="255" font-size="10" fill="#C62828">TPS: 10,000</text>
<text x="225" y="275" font-size="10" fill="#C62828">延迟: 10ms/条</text>
<text x="225" y="330" font-size="11" fill="#E53935" font-weight="bold">❌ 频繁网络IO</text>
<rect x="420" y="50" width="350" height="300" fill="#E8F5E9" stroke="#43A047" stroke-width="2" rx="5"/>
<text x="595" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">批量发送(高效)</text>
<rect x="450" y="90" width="290" height="110" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="595" y="110" text-anchor="middle" font-size="9" fill="#1976D2">批量消息包</text>
<text x="465" y="135" font-size="9" fill="#424242">• 消息1</text>
<text x="465" y="155" font-size="9" fill="#424242">• 消息2</text>
<text x="465" y="175" font-size="9" fill="#424242">• 消息3</text>
<text x="465" y="190" font-size="8" fill="#7F8C8D">... (32-128条)</text>
<path d="M 595 210 L 595 240" stroke="#43A047" stroke-width="2" marker-end="url(#arrowGreen)"/>
<text x="595" y="260" text-anchor="middle" font-size="9" fill="#2E7D32">一次网络IO → Broker</text>
<text x="595" y="285" font-size="10" fill="#2E7D32">网络IO: 1次</text>
<text x="595" y="305" font-size="10" fill="#2E7D32">TPS: 30,000+</text>
<text x="595" y="325" font-size="10" fill="#2E7D32">延迟: 3ms/批</text>
<text x="595" y="348" font-size="11" fill="#43A047" font-weight="bold">✓ 提升3倍性能</text>
<defs>
<marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#43A047"/>
</marker>
</defs>
</svg>

```java
// 方式1: 单条发送(低效)
public void sendOneByOne() throws Exception {
    DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
    producer.setNamesrvAddr("localhost:9876");
    producer.start();

    long start = System.currentTimeMillis();

    // 发送100条消息
    for (int i = 0; i < 100; i++) {
        Message msg = new Message("BatchTopic",
            ("消息-" + i).getBytes());
        producer.send(msg);  // 每次一个网络IO
    }

    long cost = System.currentTimeMillis() - start;
    System.out.println("单条发送耗时: " + cost + "ms");
    // 输出: 单条发送耗时: 1000ms

    producer.shutdown();
}

// 方式2: 批量发送(高效)
public void sendBatch() throws Exception {
    DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
    producer.setNamesrvAddr("localhost:9876");
    producer.start();

    long start = System.currentTimeMillis();

    // 准备批量消息
    List<Message> messages = new ArrayList<>();
    for (int i = 0; i < 100; i++) {
        Message msg = new Message("BatchTopic",
            ("消息-" + i).getBytes());
        messages.add(msg);
    }

    // 批量发送(一次网络IO)
    producer.send(messages);

    long cost = System.currentTimeMillis() - start;
    System.out.println("批量发送耗时: " + cost + "ms");
    // 输出: 批量发送耗时: 50ms (提升20倍)

    producer.shutdown();
}
```

**批量发送最佳实践:**

```java
public class BatchProducer {
    private static final int BATCH_SIZE = 64;  // 每批64条
    private static final int MAX_BATCH_BYTES = 4 * 1024 * 1024; // 4MB限制

    public void sendInBatch(List<Message> messages) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        // 自动分批
        List<List<Message>> batches = splitBatch(messages);

        for (List<Message> batch : batches) {
            try {
                SendResult result = producer.send(batch);
                System.out.println("批次发送成功: " + result.getMsgId());
            } catch (Exception e) {
                // 批次失败,可单独重试
                retryBatch(batch);
            }
        }

        producer.shutdown();
    }

    // 消息分批(考虑大小限制)
    private List<List<Message>> splitBatch(List<Message> messages) {
        List<List<Message>> batches = new ArrayList<>();
        List<Message> currentBatch = new ArrayList<>();
        int currentSize = 0;

        for (Message msg : messages) {
            int msgSize = msg.getBody().length + 100; // 估算大小

            // 判断是否需要新批次
            if (currentBatch.size() >= BATCH_SIZE ||
                currentSize + msgSize > MAX_BATCH_BYTES) {
                batches.add(currentBatch);
                currentBatch = new ArrayList<>();
                currentSize = 0;
            }

            currentBatch.add(msg);
            currentSize += msgSize;
        }

        if (!currentBatch.isEmpty()) {
            batches.add(currentBatch);
        }

        return batches;
    }

    private void retryBatch(List<Message> batch) {
        // 重试逻辑
    }
}
```

**2. 异步发送优化**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">同步 vs 异步发送对比</text>
<rect x="50" y="50" width="350" height="340" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="225" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#C62828">同步发送(阻塞)</text>
<rect x="80" y="95" width="290" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="225" y="115" text-anchor="middle" font-size="9" fill="#1976D2">业务线程</text>
<text x="95" y="133" font-size="8" fill="#424242">发送消息1...</text>
<rect x="110" y="155" width="230" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="175" text-anchor="middle" font-size="9" fill="#F57C00">⏳ 等待Broker响应</text>
<text x="225" y="200" font-size="8" fill="#C62828">阻塞10ms</text>
<rect x="80" y="215" width="290" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="95" y="235" font-size="8" fill="#424242">发送消息2...</text>
<rect x="110" y="255" width="230" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="275" text-anchor="middle" font-size="9" fill="#F57C00">⏳ 等待Broker响应</text>
<text x="225" y="295" font-size="8" fill="#C62828">阻塞10ms</text>
<text x="225" y="325" font-size="10" fill="#C62828">总耗时: 20ms</text>
<text x="225" y="345" font-size="10" fill="#C62828">TPS: 50/线程</text>
<text x="225" y="375" font-size="11" fill="#E53935" font-weight="bold">❌ 线程阻塞</text>
<rect x="420" y="50" width="350" height="340" fill="#E8F5E9" stroke="#43A047" stroke-width="2" rx="5"/>
<text x="595" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">异步发送(非阻塞)</text>
<rect x="450" y="95" width="290" height="240" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="595" y="115" text-anchor="middle" font-size="9" fill="#1976D2">业务线程</text>
<text x="465" y="135" font-size="8" fill="#424242">发送消息1(异步) ✓ 立即返回</text>
<text x="465" y="155" font-size="8" fill="#424242">发送消息2(异步) ✓ 立即返回</text>
<text x="465" y="175" font-size="8" fill="#424242">发送消息3(异步) ✓ 立即返回</text>
<text x="465" y="195" font-size="8" fill="#424242">继续其他业务...</text>
<path d="M 480 210 L 710 210" stroke="#9E9E9E" stroke-width="1" stroke-dasharray="3,3"/>
<rect x="465" y="225" width="260" height="95" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="595" y="245" text-anchor="middle" font-size="9" fill="#F57C00">回调线程(独立)</text>
<text x="480" y="265" font-size="8" fill="#424242">回调1: 成功 ✓</text>
<text x="480" y="283" font-size="8" fill="#424242">回调2: 成功 ✓</text>
<text x="480" y="301" font-size="8" fill="#424242">回调3: 成功 ✓</text>
<text x="595" y="345" font-size="10" fill="#2E7D32">总耗时: 1ms</text>
<text x="595" y="365" font-size="10" fill="#2E7D32">TPS: 1000/线程</text>
<text x="595" y="383" font-size="11" fill="#43A047" font-weight="bold">✓ 提升20倍性能</text>
</svg>

```java
// 同步发送(低效)
public void syncSend() throws Exception {
    DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
    producer.setNamesrvAddr("localhost:9876");
    producer.start();

    long start = System.currentTimeMillis();

    for (int i = 0; i < 100; i++) {
        Message msg = new Message("AsyncTopic",
            ("消息-" + i).getBytes());

        // 同步发送,阻塞等待
        SendResult result = producer.send(msg);
        // 阻塞10ms,直到Broker响应
    }

    long cost = System.currentTimeMillis() - start;
    System.out.println("同步发送耗时: " + cost + "ms");
    // 输出: 同步发送耗时: 1000ms

    producer.shutdown();
}

// 异步发送(高效)
public void asyncSend() throws Exception {
    DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
    producer.setNamesrvAddr("localhost:9876");

    // 设置异步发送线程数
    producer.setAsyncSenderExecutor(new ThreadPoolExecutor(
        4, 8, 60, TimeUnit.SECONDS,
        new LinkedBlockingQueue<>(10000),
        new ThreadFactory() {
            private AtomicInteger index = new AtomicInteger(0);
            @Override
            public Thread newThread(Runnable r) {
                return new Thread(r, "AsyncSender-" + index.getAndIncrement());
            }
        }
    ));

    producer.start();

    long start = System.currentTimeMillis();
    final CountDownLatch latch = new CountDownLatch(100);

    for (int i = 0; i < 100; i++) {
        Message msg = new Message("AsyncTopic",
            ("消息-" + i).getBytes());

        // 异步发送,立即返回
        producer.send(msg, new SendCallback() {
            @Override
            public void onSuccess(SendResult result) {
                System.out.println("发送成功: " + result.getMsgId());
                latch.countDown();
            }

            @Override
            public void onException(Throwable e) {
                System.err.println("发送失败: " + e.getMessage());
                latch.countDown();
            }
        });
        // 立即返回,不阻塞
    }

    long cost = System.currentTimeMillis() - start;
    System.out.println("异步发送耗时: " + cost + "ms");
    // 输出: 异步发送耗时: 50ms (提升20倍)

    latch.await(); // 等待所有回调完成
    producer.shutdown();
}
```

**3. 单向发送优化(极致性能)**

```java
public void onewaySend() throws Exception {
    DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
    producer.setNamesrvAddr("localhost:9876");
    producer.start();

    long start = System.currentTimeMillis();

    for (int i = 0; i < 100; i++) {
        Message msg = new Message("OnewayTopic",
            ("日志-" + i).getBytes());

        // 单向发送,不等待任何响应
        producer.sendOneway(msg);
        // 立即返回,性能最高
    }

    long cost = System.currentTimeMillis() - start;
    System.out.println("单向发送耗时: " + cost + "ms");
    // 输出: 单向发送耗时: 10ms (提升100倍)

    producer.shutdown();
}

// 使用场景: 日志收集、监控数据
public class LogProducer {
    private DefaultMQProducer producer;

    public void init() throws Exception {
        producer = new DefaultMQProducer("LogProducerGroup");
        producer.setNamesrvAddr("localhost:9876");
        producer.setRetryTimesWhenSendFailed(0); // 不重试
        producer.start();
    }

    // 发送日志(可以容忍少量丢失)
    public void sendLog(String log) {
        try {
            Message msg = new Message("LogTopic", log.getBytes());
            producer.sendOneway(msg); // 最快
        } catch (Exception e) {
            // 忽略异常
        }
    }
}
```

**4. 消息压缩优化**

```java
public class CompressProducer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("localhost:9876");

        // 设置压缩阈值(字节)
        // 消息体超过4KB自动压缩
        producer.setCompressMsgBodyOverHowmuch(4 * 1024);

        // 设置最大消息大小
        producer.setMaxMessageSize(4 * 1024 * 1024); // 4MB

        producer.start();

        // 发送大消息
        String largeContent = generateLargeContent(100 * 1024); // 100KB
        Message msg = new Message("CompressTopic", largeContent.getBytes());

        long start = System.currentTimeMillis();
        SendResult result = producer.send(msg);
        long cost = System.currentTimeMillis() - start;

        System.out.println("原始大小: " + largeContent.getBytes().length + " bytes");
        System.out.println("压缩后网络传输时间: " + cost + "ms");
        // 压缩率约50-70%,传输时间减少一半

        producer.shutdown();
    }

    private static String generateLargeContent(int size) {
        StringBuilder sb = new StringBuilder(size);
        for (int i = 0; i < size; i++) {
            sb.append('A');
        }
        return sb.toString();
    }
}
```

**5. Producer 参数优化**

```java
public class OptimizedProducer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("localhost:9876");

        // ========== 性能优化参数 ==========

        // 1. 发送超时(毫秒)
        producer.setSendMsgTimeout(3000); // 3秒

        // 2. 失败重试次数
        producer.setRetryTimesWhenSendFailed(2); // 同步发送重试2次
        producer.setRetryTimesWhenSendAsyncFailed(0); // 异步发送不重试

        // 3. 压缩阈值
        producer.setCompressMsgBodyOverHowmuch(4096); // 4KB

        // 4. 最大消息大小
        producer.setMaxMessageSize(4 * 1024 * 1024); // 4MB

        // 5. 客户端回调线程数
        producer.setClientCallbackExecutorThreads(
            Runtime.getRuntime().availableProcessors() * 2
        );

        // 6. VIP通道(默认开启,端口号-2)
        producer.setVipChannelEnabled(true);

        // 7. 默认Topic队列数
        producer.setDefaultTopicQueueNums(4);

        // 8. 心跳间隔(毫秒)
        producer.setHeartbeatBrokerInterval(30000); // 30秒

        producer.start();

        // 使用优化后的Producer
        asyncBatchSend(producer);

        producer.shutdown();
    }

    // 结合异步+批量
    private static void asyncBatchSend(DefaultMQProducer producer) throws Exception {
        List<Message> batch = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            Message msg = new Message("OptimizedTopic",
                ("消息-" + i).getBytes());
            batch.add(msg);

            // 每64条发送一次
            if (batch.size() == 64) {
                sendBatchAsync(producer, new ArrayList<>(batch));
                batch.clear();
            }
        }

        // 发送剩余
        if (!batch.isEmpty()) {
            sendBatchAsync(producer, batch);
        }
    }

    private static void sendBatchAsync(DefaultMQProducer producer,
                                        List<Message> batch) {
        producer.send(batch, new SendCallback() {
            @Override
            public void onSuccess(SendResult result) {
                System.out.println("批次发送成功: " + result.getMsgId());
            }

            @Override
            public void onException(Throwable e) {
                System.err.println("批次发送失败: " + e.getMessage());
                // 重试逻辑
            }
        });
    }
}
```

**6. 性能对比总结**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">不同发送方式性能对比</text>
<rect x="50" y="50" width="700" height="280" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="150" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">发送方式</text>
<text x="300" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">TPS</text>
<text x="450" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">延迟</text>
<text x="600" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">可靠性</text>
<path d="M 70 95 L 730 95" stroke="#607D8B" stroke-width="1"/>
<rect x="70" y="105" width="660" height="35" fill="#FFEBEE" stroke="#E53935" stroke-width="1" rx="3"/>
<text x="150" y="127" text-anchor="middle" font-size="9" fill="#424242">同步单条</text>
<text x="300" y="127" text-anchor="middle" font-size="9" fill="#C62828">1万/秒</text>
<text x="450" y="127" text-anchor="middle" font-size="9" fill="#C62828">10ms</text>
<text x="600" y="127" text-anchor="middle" font-size="9" fill="#2E7D32">⭐⭐⭐⭐⭐</text>
<rect x="70" y="145" width="660" height="35" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="150" y="167" text-anchor="middle" font-size="9" fill="#424242">同步批量</text>
<text x="300" y="167" text-anchor="middle" font-size="9" fill="#F57C00">3万/秒</text>
<text x="450" y="167" text-anchor="middle" font-size="9" fill="#F57C00">3ms</text>
<text x="600" y="167" text-anchor="middle" font-size="9" fill="#2E7D32">⭐⭐⭐⭐⭐</text>
<rect x="70" y="185" width="660" height="35" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="150" y="207" text-anchor="middle" font-size="9" fill="#424242">异步单条</text>
<text x="300" y="207" text-anchor="middle" font-size="9" fill="#1976D2">5万/秒</text>
<text x="450" y="207" text-anchor="middle" font-size="9" fill="#1976D2">2ms</text>
<text x="600" y="207" text-anchor="middle" font-size="9" fill="#2E7D32">⭐⭐⭐⭐</text>
<rect x="70" y="225" width="660" height="35" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="150" y="247" text-anchor="middle" font-size="9" fill="#424242">异步批量</text>
<text x="300" y="247" text-anchor="middle" font-size="9" fill="#2E7D32">10万/秒</text>
<text x="450" y="247" text-anchor="middle" font-size="9" fill="#2E7D32">1ms</text>
<text x="600" y="247" text-anchor="middle" font-size="9" fill="#2E7D32">⭐⭐⭐⭐</text>
<rect x="70" y="265" width="660" height="35" fill="#F3E5F5" stroke="#9C27B0" stroke-width="1" rx="3"/>
<text x="150" y="287" text-anchor="middle" font-size="9" fill="#424242">单向发送</text>
<text x="300" y="287" text-anchor="middle" font-size="9" fill="#7B1FA2">20万/秒</text>
<text x="450" y="287" text-anchor="middle" font-size="9" fill="#7B1FA2">&lt;1ms</text>
<text x="600" y="287" text-anchor="middle" font-size="9" fill="#F57C00">⭐⭐</text>
<text x="400" y="320" text-anchor="middle" font-size="10" fill="#E74C3C" font-weight="bold">推荐: 异步批量发送(性能与可靠性平衡)</text>
</svg>

**关键要点:**

1. **批量发送**: 减少网络 IO,提升 3-5 倍
2. **异步发送**: 避免线程阻塞,提升 5-10 倍
3. **组合优化**: 异步+批量,可提升 10-20 倍
4. **单向发送**: 极致性能场景(日志),提升 20 倍+
5. **消息压缩**: 大消息场景,减少 50-70% 传输量
6. **参数调优**: 合理设置超时、重试、线程数

**记忆口诀:**

```
优化Producer抓三点
批量异步加压缩
批量减少IO次数
异步避免线程等
压缩节省带宽用
参数调优别忽略
组合使用效果好
十万TPS轻松跑
```


### 58. 如何优化 Consumer 的性能?

**核心答案:**

Consumer 性能优化七大策略:
1. **并发消费**: 增加消费线程数量
2. **批量消费**: 一次处理多条消息
3. **增加实例**: 横向扩展消费者数量
4. **消费逻辑优化**: 异步处理耗时操作
5. **拉取参数优化**: 调整批量拉取大小
6. **消息过滤**: 减少不必要的消费
7. **负载均衡**: 合理分配队列

**详细说明:**

**1. 并发消费优化**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">单线程 vs 多线程消费</text>
<rect x="50" y="50" width="350" height="320" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="225" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#C62828">单线程消费(慢)</text>
<rect x="80" y="95" width="290" height="240" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="225" y="115" text-anchor="middle" font-size="10" fill="#1976D2">消费线程-1</text>
<rect x="100" y="130" width="250" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="150" text-anchor="middle" font-size="8" fill="#424242">消息1 (100ms)</text>
<path d="M 225 165 L 225 175" stroke="#9E9E9E" stroke-width="1" marker-end="url(#arrowGray)"/>
<rect x="100" y="180" width="250" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="200" text-anchor="middle" font-size="8" fill="#424242">消息2 (100ms)</text>
<path d="M 225 215 L 225 225" stroke="#9E9E9E" stroke-width="1" marker-end="url(#arrowGray)"/>
<rect x="100" y="230" width="250" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="250" text-anchor="middle" font-size="8" fill="#424242">消息3 (100ms)</text>
<path d="M 225 265 L 225 275" stroke="#9E9E9E" stroke-width="1" marker-end="url(#arrowGray)"/>
<rect x="100" y="280" width="250" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="300" text-anchor="middle" font-size="8" fill="#424242">消息4 (100ms)</text>
<text x="225" y="348" font-size="10" fill="#C62828">总耗时: 400ms</text>
<text x="225" y="365" font-size="11" fill="#E53935" font-weight="bold">TPS: 10条/秒</text>
<rect x="420" y="50" width="350" height="320" fill="#E8F5E9" stroke="#43A047" stroke-width="2" rx="5"/>
<text x="595" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">多线程并发(快)</text>
<rect x="450" y="95" width="130" height="240" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="515" y="115" text-anchor="middle" font-size="9" fill="#1976D2">线程-1</text>
<rect x="460" y="130" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="512" y="147" text-anchor="middle" font-size="7" fill="#424242">消息1</text>
<rect x="460" y="165" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="512" y="182" text-anchor="middle" font-size="7" fill="#424242">消息5</text>
<rect x="590" y="95" width="130" height="240" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="655" y="115" text-anchor="middle" font-size="9" fill="#1976D2">线程-2</text>
<rect x="600" y="130" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="652" y="147" text-anchor="middle" font-size="7" fill="#424242">消息2</text>
<rect x="600" y="165" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="652" y="182" text-anchor="middle" font-size="7" fill="#424242">消息6</text>
<rect x="450" y="200" width="130" height="135" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="515" y="220" text-anchor="middle" font-size="9" fill="#1976D2">线程-3</text>
<rect x="460" y="235" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="512" y="252" text-anchor="middle" font-size="7" fill="#424242">消息3</text>
<rect x="460" y="270" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="512" y="287" text-anchor="middle" font-size="7" fill="#424242">消息7</text>
<rect x="590" y="200" width="130" height="135" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="655" y="220" text-anchor="middle" font-size="9" fill="#1976D2">线程-4</text>
<rect x="600" y="235" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="652" y="252" text-anchor="middle" font-size="7" fill="#424242">消息4</text>
<rect x="600" y="270" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="652" y="287" text-anchor="middle" font-size="7" fill="#424242">消息8</text>
<text x="595" y="348" font-size="10" fill="#2E7D32">总耗时: 100ms</text>
<text x="595" y="365" font-size="11" fill="#43A047" font-weight="bold">TPS: 80条/秒 (提升8倍)</text>
<defs>
<marker id="arrowGray" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
<path d="M 0 0 L 8 4 L 0 8 Z" fill="#9E9E9E"/>
</marker>
</defs>
</svg>

```java
// 方式1: 单线程消费(默认,低效)
public class SingleThreadConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("TestTopic", "*");

        // 默认线程数: 20
        // consumer.setConsumeThreadMin(20);
        // consumer.setConsumeThreadMax(20);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    // 模拟耗时操作(100ms)
                    processMessage(msg);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("单线程消费者启动...");
        // TPS: 约 200条/秒 (20线程 * 10条/秒)
    }

    private static void processMessage(MessageExt msg) {
        try {
            Thread.sleep(100); // 模拟业务处理
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

// 方式2: 多线程并发消费(高效)
public class MultiThreadConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("TestTopic", "*");

        // ========== 关键优化: 增加消费线程数 ==========
        // 最小消费线程数
        consumer.setConsumeThreadMin(64);
        // 最大消费线程数
        consumer.setConsumeThreadMax(128);

        // 线程池队列大小(消息缓冲)
        consumer.setPullThresholdForQueue(1000);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    processMessage(msg);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("多线程消费者启动...");
        // TPS: 约 1280条/秒 (128线程 * 10条/秒, 提升6倍)
    }

    private static void processMessage(MessageExt msg) {
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

**线程数计算公式:**

```
推荐线程数 = (单条消息处理时间ms / 目标消息处理间隔ms) × 并发度

示例:
- 单条消息处理100ms
- 目标: 每秒处理1000条(即1ms处理1条)
- 推荐线程数 = (100 / 1) × 2 = 200

注意:
- 消费线程数 ≤ 队列数时,每个线程负责一个队列
- 消费线程数 > 队列数时,多个线程消费同一队列
- 过多线程会增加上下文切换开销
```

**2. 批量消费优化**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">单条 vs 批量消费对比</text>
<rect x="50" y="50" width="350" height="270" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="225" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#C62828">单条消费</text>
<rect x="80" y="95" width="290" height="45" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="100" y="115" font-size="8" fill="#424242">消息1 → 处理 → 提交offset</text>
<text x="100" y="130" font-size="7" fill="#F57C00">DB写入1次 + 网络IO1次</text>
<rect x="80" y="150" width="290" height="45" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="100" y="170" font-size="8" fill="#424242">消息2 → 处理 → 提交offset</text>
<text x="100" y="185" font-size="7" fill="#F57C00">DB写入1次 + 网络IO1次</text>
<rect x="80" y="205" width="290" height="45" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="100" y="225" font-size="8" fill="#424242">消息3 → 处理 → 提交offset</text>
<text x="100" y="240" font-size="7" fill="#F57C00">DB写入1次 + 网络IO1次</text>
<text x="225" y="275" font-size="10" fill="#C62828">DB写入: 100次</text>
<text x="225" y="295" font-size="10" fill="#C62828">网络IO: 100次</text>
<text x="225" y="313" font-size="11" fill="#E53935" font-weight="bold">❌ 频繁IO</text>
<rect x="420" y="50" width="350" height="270" fill="#E8F5E9" stroke="#43A047" stroke-width="2" rx="5"/>
<text x="595" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">批量消费</text>
<rect x="450" y="95" width="290" height="140" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="595" y="115" text-anchor="middle" font-size="9" fill="#1976D2">消息批次(32条)</text>
<text x="470" y="138" font-size="8" fill="#424242">消息1, 消息2, ... 消息32</text>
<path d="M 595 150 L 595 165" stroke="#43A047" stroke-width="2" marker-end="url(#arrowGreen)"/>
<text x="595" y="185" text-anchor="middle" font-size="8" fill="#424242">批量处理业务逻辑</text>
<path d="M 595 195 L 595 210" stroke="#43A047" stroke-width="2" marker-end="url(#arrowGreen)"/>
<text x="595" y="228" text-anchor="middle" font-size="8" fill="#424242">批量DB写入(1次)</text>
<text x="595" y="258" font-size="10" fill="#2E7D32">DB写入: 4次 (100÷32≈4)</text>
<text x="595" y="278" font-size="10" fill="#2E7D32">网络IO: 4次</text>
<text x="595" y="300" font-size="11" fill="#43A047" font-weight="bold">✓ 提升25倍</text>
<defs>
<marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#43A047"/>
</marker>
</defs>
</svg>

```java
// 单条消费(低效)
public class SingleConsumeConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        // 每次消费1条
        consumer.setConsumeMessageBatchMaxSize(1);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // msgs只有1条
                for (MessageExt msg : msgs) {
                    Order order = parseOrder(msg);
                    // 单条写入数据库
                    saveToDatabase(order);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static Order parseOrder(MessageExt msg) {
        // 解析消息
        return new Order();
    }

    private static void saveToDatabase(Order order) {
        // 单条写入,性能低
    }

    static class Order {}
}

// 批量消费(高效)
public class BatchConsumeConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        // ========== 关键优化: 批量消费 ==========
        // 设置每次消费的最大消息数
        consumer.setConsumeMessageBatchMaxSize(32);

        // 批量拉取大小
        consumer.setPullBatchSize(64);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // msgs可能有多条(最多32条)
                List<Order> orders = new ArrayList<>();

                for (MessageExt msg : msgs) {
                    Order order = parseOrder(msg);
                    orders.add(order);
                }

                // 批量写入数据库(减少DB连接开销)
                batchSaveToDatabase(orders);

                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static Order parseOrder(MessageExt msg) {
        return new Order();
    }

    private static void batchSaveToDatabase(List<Order> orders) {
        // JDBC批量插入
        // INSERT INTO orders VALUES (?,?), (?,?), (?,?)...
        // 性能提升10-20倍
    }

    static class Order {}
}
```

**3. 增加消费者实例(横向扩展)**

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">横向扩展消费者</text>
<rect x="50" y="50" width="600" height="250" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="350" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">Broker (4个队列)</text>
<rect x="100" y="90" width="110" height="30" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="155" y="110" text-anchor="middle" font-size="9" fill="#1976D2">Queue-0</text>
<rect x="225" y="90" width="110" height="30" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="280" y="110" text-anchor="middle" font-size="9" fill="#1976D2">Queue-1</text>
<rect x="350" y="90" width="110" height="30" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="405" y="110" text-anchor="middle" font-size="9" fill="#1976D2">Queue-2</text>
<rect x="475" y="90" width="110" height="30" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="530" y="110" text-anchor="middle" font-size="9" fill="#1976D2">Queue-3</text>
<path d="M 155 130 L 155 160" stroke="#E53935" stroke-width="2" marker-end="url(#arrowRed)"/>
<path d="M 280 130 L 155 160" stroke="#E53935" stroke-width="2" marker-end="url(#arrowRed)"/>
<path d="M 405 130 L 405 160" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen2)"/>
<path d="M 530 130 L 405 160" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen2)"/>
<rect x="90" y="160" width="130" height="60" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="155" y="180" text-anchor="middle" font-size="10" font-weight="bold" fill="#C62828">Consumer-1</text>
<text x="155" y="200" text-anchor="middle" font-size="8" fill="#424242">处理 Queue-0</text>
<text x="155" y="215" text-anchor="middle" font-size="8" fill="#424242">处理 Queue-1</text>
<rect x="340" y="160" width="130" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="405" y="180" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Consumer-2</text>
<text x="405" y="200" text-anchor="middle" font-size="8" fill="#424242">处理 Queue-2</text>
<text x="405" y="215" text-anchor="middle" font-size="8" fill="#424242">处理 Queue-3</text>
<text x="350" y="250" text-anchor="middle" font-size="10" fill="#2E7D32" font-weight="bold">✓ 2个消费者,性能翻倍</text>
<text x="350" y="270" text-anchor="middle" font-size="9" fill="#F57C00">注意: 消费者数量 ≤ 队列数量</text>
<text x="350" y="288" text-anchor="middle" font-size="8" fill="#7F8C8D">(超过队列数的消费者会空闲)</text>
<defs>
<marker id="arrowRed" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E53935"/>
</marker>
<marker id="arrowGreen2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
</defs>
</svg>

```bash
# 启动多个Consumer实例
# 机器1
java -jar consumer.jar --instance=1

# 机器2
java -jar consumer.jar --instance=2

# 机器3
java -jar consumer.jar --instance=3

# 机器4
java -jar consumer.jar --instance=4

# 4个消费者实例,自动负载均衡到4个队列
```

**4. 消费逻辑优化(异步处理)**

```java
public class AsyncBusinessConsumer {
    // 异步处理线程池
    private static final ExecutorService executor = new ThreadPoolExecutor(
        32, 64, 60, TimeUnit.SECONDS,
        new LinkedBlockingQueue<>(10000),
        new ThreadFactory() {
            private AtomicInteger index = new AtomicInteger(0);
            @Override
            public Thread newThread(Runnable r) {
                return new Thread(r, "AsyncBusiness-" + index.getAndIncrement());
            }
        }
    );

    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {

                // 快速解析消息
                List<Order> orders = new ArrayList<>();
                for (MessageExt msg : msgs) {
                    Order order = fastParse(msg); // 轻量级解析
                    orders.add(order);
                }

                // 异步处理耗时业务(不阻塞消费线程)
                executor.submit(() -> {
                    try {
                        // 耗时操作: 调用外部API
                        callExternalAPI(orders);
                        // 耗时操作: 写入数据库
                        batchSaveToDatabase(orders);
                        // 耗时操作: 发送通知
                        sendNotifications(orders);
                    } catch (Exception e) {
                        // 异步处理失败,记录日志
                        System.err.println("异步处理失败: " + e.getMessage());
                    }
                });

                // 立即返回成功,不等待异步任务完成
                // 注意: 这种方式适合可以容忍少量失败的场景
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static Order fastParse(MessageExt msg) {
        // 快速解析
        return new Order();
    }

    private static void callExternalAPI(List<Order> orders) {
        // 调用外部API
    }

    private static void batchSaveToDatabase(List<Order> orders) {
        // 批量数据库写入
    }

    private static void sendNotifications(List<Order> orders) {
        // 发送通知
    }

    static class Order {}
}
```

**5. 拉取参数优化**

```java
public class OptimizedPullConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("TestTopic", "*");

        // ========== 拉取参数优化 ==========

        // 1. 批量拉取大小(默认32)
        consumer.setPullBatchSize(64);

        // 2. 每个队列最大缓存消息数(默认1000)
        consumer.setPullThresholdForQueue(2000);

        // 3. 每个队列最大缓存消息大小(MB,默认100MB)
        consumer.setPullThresholdSizeForQueue(200);

        // 4. 拉取间隔(毫秒,默认0立即拉取)
        consumer.setPullInterval(0);

        // 5. 单次消费最大消息数(默认1)
        consumer.setConsumeMessageBatchMaxSize(32);

        // 6. 消费超时时间(分钟,默认15分钟)
        consumer.setConsumeTimeout(30);

        // 7. 消费线程数
        consumer.setConsumeThreadMin(64);
        consumer.setConsumeThreadMax(128);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // 批量处理
                processBatch(msgs);
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("优化后的消费者启动完成");
    }

    private static void processBatch(List<MessageExt> msgs) {
        // 批量处理逻辑
    }
}
```

**6. 消息过滤优化**

```java
// 使用Tag过滤,减少不必要消费
public class FilterConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");

        // 只订阅VIP订单
        consumer.subscribe("OrderTopic", "VIP");
        // 订阅多个Tag: "VIP || SVIP"
        // consumer.subscribe("OrderTopic", "VIP || SVIP");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // 只处理VIP订单,减少无效消费
                for (MessageExt msg : msgs) {
                    processVIPOrder(msg);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static void processVIPOrder(MessageExt msg) {
        // 处理VIP订单
    }
}
```

**7. 性能优化对比**

| 优化措施 | 优化前 TPS | 优化后 TPS | 提升倍数 |
|---------|-----------|-----------|---------|
| 增加消费线程(20→128) | 200 | 1,280 | 6.4x |
| 批量消费(1→32) | 500 | 5,000 | 10x |
| 增加实例(1→4) | 1,000 | 4,000 | 4x |
| 异步处理业务 | 2,000 | 10,000 | 5x |
| 批量拉取(32→64) | 5,000 | 8,000 | 1.6x |
| **综合优化** | **500** | **20,000+** | **40x** |

**关键要点:**

1. **并发消费**: 增加线程数是最直接的优化
2. **批量消费**: 减少 DB 和网络 IO 次数
3. **横向扩展**: 增加消费者实例数(≤队列数)
4. **异步处理**: 耗时业务异步化,加快消费速度
5. **拉取优化**: 调整批量拉取和缓存参数
6. **消息过滤**: 使用 Tag 减少无效消费
7. **业务优化**: 优化业务逻辑本身最重要

**记忆口诀:**

```
优化Consumer七板斧
线程批量加实例
异步拉取配过滤
业务优化是根本
线程数量要合理
批量减少IO次
实例扩展要适度
异步提升吞吐量
组合使用效果佳
万级TPS不是梦
```


### 59. 什么是消息堆积？如何处理消息堆积？

**核心答案:**

**消息堆积**是指生产速度 > 消费速度,导致消息在 Broker 中大量积压未被消费。

**处理消息堆积的六大策略:**
1. **扩容消费者**: 增加消费者实例和线程数
2. **临时扩队列**: 增加队列数量分散负载
3. **降级处理**: 丢弃或延迟处理部分消息
4. **批量消费**: 提升单次消费效率
5. **业务优化**: 优化消费逻辑减少耗时
6. **转移消息**: 将堆积消息转存到新 Topic

**详细说明:**

**1. 消息堆积的形成过程**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">消息堆积示意图</text>
<rect x="50" y="50" width="700" height="330" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="80" y="80" width="180" height="120" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="170" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">Producer</text>
<text x="170" y="130" text-anchor="middle" font-size="10" fill="#424242">发送速度</text>
<text x="170" y="155" text-anchor="middle" font-size="18" font-weight="bold" fill="#2E7D32">1万条/秒</text>
<text x="170" y="185" font-size="9" fill="#2E7D32">✓ 性能良好</text>
<path d="M 270 140 L 310 140" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrowGreen3)"/>
<rect x="310" y="80" width="180" height="270" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">Broker</text>
<rect x="330" y="120" width="140" height="210" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="400" y="140" text-anchor="middle" font-size="10" fill="#C62828">消息堆积区</text>
<rect x="340" y="155" width="120" height="18" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="400" y="168" text-anchor="middle" font-size="8" fill="#424242">消息1-1000</text>
<rect x="340" y="178" width="120" height="18" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="400" y="191" text-anchor="middle" font-size="8" fill="#424242">消息1001-2000</text>
<rect x="340" y="201" width="120" height="18" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="400" y="214" text-anchor="middle" font-size="8" fill="#424242">消息2001-3000</text>
<text x="400" y="240" text-anchor="middle" font-size="9" fill="#C62828">...</text>
<rect x="340" y="250" width="120" height="18" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="400" y="263" text-anchor="middle" font-size="8" fill="#424242">消息9001-10000</text>
<text x="400" y="290" text-anchor="middle" font-size="11" font-weight="bold" fill="#E53935">堆积: 1000万条</text>
<text x="400" y="310" text-anchor="middle" font-size="9" fill="#F57C00">磁盘占用: 10GB</text>
<path d="M 500 140 L 540 140" stroke="#E53935" stroke-width="3" marker-end="url(#arrowRed2)"/>
<text x="520" y="130" text-anchor="middle" font-size="8" fill="#C62828">慢</text>
<rect x="540" y="80" width="180" height="120" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="630" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">Consumer</text>
<text x="630" y="130" text-anchor="middle" font-size="10" fill="#424242">消费速度</text>
<text x="630" y="155" text-anchor="middle" font-size="18" font-weight="bold" fill="#C62828">100条/秒</text>
<text x="630" y="185" font-size="9" fill="#C62828">❌ 消费太慢</text>
<text x="400" y="365" text-anchor="middle" font-size="11" fill="#E74C3C" font-weight="bold">⚠️ 堆积原因: 消费速度 &lt;&lt; 生产速度 (100倍差距)</text>
<defs>
<marker id="arrowGreen3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
<marker id="arrowRed2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E53935"/>
</marker>
</defs>
</svg>

**消息堆积的危害:**

```
1. 消息延迟: 堆积1000万条,按100条/秒消费,需要27小时才能消费完
2. 磁盘占满: 大量消息占用磁盘空间,可能导致Broker无法接收新消息
3. 内存压力: PageCache被大量消息占用,影响系统性能
4. 消费超时: 消息存储时间超过retention,可能被清理导致消息丢失
5. 业务影响: 订单延迟处理,用户体验差
```

**2. 方案一: 扩容消费者(快速有效)**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">扩容消费者解决堆积</text>
<rect x="50" y="50" width="700" height="350" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">扩容前 vs 扩容后</text>
<rect x="80" y="95" width="310" height="280" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="235" y="118" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">扩容前(堆积)</text>
<rect x="110" y="135" width="110" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="165" y="155" text-anchor="middle" font-size="9" fill="#F57C00">Broker</text>
<text x="165" y="175" text-anchor="middle" font-size="10" font-weight="bold" fill="#E53935">堆积1000万条</text>
<path d="M 165 205 L 165 225" stroke="#E53935" stroke-width="2" marker-end="url(#arrowRed3)"/>
<rect x="110" y="230" width="110" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="165" y="250" text-anchor="middle" font-size="9" fill="#1976D2">Consumer</text>
<text x="165" y="270" text-anchor="middle" font-size="9" fill="#C62828">100条/秒</text>
<text x="235" y="320" text-anchor="middle" font-size="10" fill="#C62828">消费时间: 27小时</text>
<text x="235" y="345" text-anchor="middle" font-size="11" font-weight="bold" fill="#E53935">❌ 堆积严重</text>
<rect x="410" y="95" width="310" height="280" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="565" y="118" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">扩容后(快速消费)</text>
<rect x="440" y="135" width="110" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="495" y="155" text-anchor="middle" font-size="9" fill="#F57C00">Broker</text>
<text x="495" y="175" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">堆积快速下降</text>
<path d="M 450 205 L 450 225" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen4)"/>
<path d="M 495 205 L 495 225" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen4)"/>
<path d="M 540 205 L 540 225" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen4)"/>
<rect x="440" y="230" width="55" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="467" y="248" text-anchor="middle" font-size="8" fill="#1976D2">C1</text>
<text x="467" y="265" text-anchor="middle" font-size="8" fill="#2E7D32">1000</text>
<text x="467" y="277" text-anchor="middle" font-size="7" fill="#7F8C8D">条/秒</text>
<rect x="505" y="230" width="55" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="532" y="248" text-anchor="middle" font-size="8" fill="#1976D2">C2</text>
<text x="532" y="265" text-anchor="middle" font-size="8" fill="#2E7D32">1000</text>
<text x="532" y="277" text-anchor="middle" font-size="7" fill="#7F8C8D">条/秒</text>
<rect x="570" y="230" width="55" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="597" y="248" text-anchor="middle" font-size="8" fill="#1976D2">C3</text>
<text x="597" y="265" text-anchor="middle" font-size="8" fill="#2E7D32">1000</text>
<text x="597" y="277" text-anchor="middle" font-size="7" fill="#7F8C8D">条/秒</text>
<rect x="635" y="230" width="55" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="662" y="248" text-anchor="middle" font-size="8" fill="#1976D2">...</text>
<text x="662" y="265" text-anchor="middle" font-size="8" fill="#2E7D32">1000</text>
<text x="662" y="277" text-anchor="middle" font-size="7" fill="#7F8C8D">条/秒</text>
<text x="565" y="305" text-anchor="middle" font-size="9" fill="#2E7D32">总消费: 10000条/秒</text>
<text x="565" y="325" text-anchor="middle" font-size="10" fill="#2E7D32">消费时间: 16分钟</text>
<text x="565" y="348" text-anchor="middle" font-size="11" font-weight="bold" fill="#43A047">✓ 快速消费(提升100倍)</text>
<defs>
<marker id="arrowRed3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E53935"/>
</marker>
<marker id="arrowGreen4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
</defs>
</svg>

```java
// 扩容方案1: 增加消费者实例
public class ScaleConsumer {
    public static void main(String[] args) throws Exception {
        // 1. 检查当前Topic的队列数
        // sh bin/mqadmin topicStatus -t OrderTopic -n localhost:9876
        // 假设队列数为16

        // 2. 启动多个Consumer实例(与队列数相同)
        for (int i = 0; i < 16; i++) {
            startConsumerInstance(i);
        }

        // 3. 每个实例会自动负载均衡到不同队列
        // 消费速度 = 单实例速度 × 实例数
    }

    private static void startConsumerInstance(int instanceId) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.setInstanceName("Consumer-Instance-" + instanceId);

        // 增加消费线程数
        consumer.setConsumeThreadMin(64);
        consumer.setConsumeThreadMax(128);

        // 批量消费
        consumer.setConsumeMessageBatchMaxSize(32);

        consumer.subscribe("OrderTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // 快速消费
                batchProcess(msgs);
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("消费者实例-" + instanceId + " 启动完成");
    }

    private static void batchProcess(List<MessageExt> msgs) {
        // 批量处理逻辑
    }
}

// 扩容方案2: 单机多实例部署脚本
```

```bash
#!/bin/bash
# scale_consumer.sh - 快速启动多个Consumer实例

INSTANCE_COUNT=16  # 实例数量

for i in $(seq 0 $((INSTANCE_COUNT-1))); do
    echo "启动Consumer实例-$i"
    nohup java -jar consumer.jar \
        -DinstanceId=$i \
        -DconsumerGroup=ConsumerGroup \
        -Xms2g -Xmx2g \
        > logs/consumer-$i.log 2>&1 &
done

echo "所有Consumer实例启动完成"
echo "查看消费进度: sh bin/mqadmin consumerProgress -g ConsumerGroup -n localhost:9876"
```

**3. 方案二: 临时扩队列(治标)**

```bash
# 步骤1: 创建临时Topic(更多队列)
sh bin/mqadmin updateTopic \
    -n localhost:9876 \
    -t OrderTopic_Temp \
    -c DefaultCluster \
    -r 64 -w 64  # 64个读写队列

# 步骤2: 将堆积消息转移到临时Topic
# 使用专门的消息转移Consumer
```

```java
// 消息转移Consumer
public class MessageTransferConsumer {
    public static void main(String[] args) throws Exception {
        // 从原Topic消费
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("TransferGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        // 转发到临时Topic
        DefaultMQProducer producer = new DefaultMQProducer("TransferProducer");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        consumer.setConsumeThreadMin(128); // 快速转移
        consumer.setConsumeMessageBatchMaxSize(64);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                try {
                    // 批量转发到临时Topic
                    List<Message> transferMsgs = new ArrayList<>();
                    for (MessageExt msg : msgs) {
                        Message newMsg = new Message(
                            "OrderTopic_Temp", // 临时Topic
                            msg.getTags(),
                            msg.getBody()
                        );
                        transferMsgs.add(newMsg);
                    }
                    producer.send(transferMsgs);
                    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                } catch (Exception e) {
                    return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                }
            }
        });

        consumer.start();
    }
}

// 步骤3: 启动大量Consumer消费临时Topic
// 64个队列 + 64个Consumer实例 + 128消费线程 = 极快消费
```

**4. 方案三: 降级处理(紧急)**

```java
// 降级策略1: 丢弃低优先级消息
public class DegradeConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {

                for (MessageExt msg : msgs) {
                    String priority = msg.getUserProperty("priority");

                    // 降级: 只处理高优先级消息
                    if ("HIGH".equals(priority)) {
                        processMessage(msg);
                    } else {
                        // 低优先级消息直接丢弃或记录日志
                        System.out.println("降级丢弃消息: " + msg.getMsgId());
                    }
                }

                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static void processMessage(MessageExt msg) {
        // 处理消息
    }
}

// 降级策略2: 简化处理逻辑
public class SimplifiedConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {

                for (MessageExt msg : msgs) {
                    // 降级: 跳过耗时操作
                    // 原: 复杂业务处理 + 调用外部API + 发送通知
                    // 降级后: 仅核心数据入库
                    quickSaveToDatabase(msg);
                }

                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static void quickSaveToDatabase(MessageExt msg) {
        // 仅保存核心数据,跳过耗时操作
    }
}
```

**5. 监控消息堆积**

```bash
# 查看消费进度(堆积数量)
sh bin/mqadmin consumerProgress \
    -g ConsumerGroup \
    -n localhost:9876

# 输出示例:
#TOPIC            BROKER    QUEUE  CONSUMER_LAG
#OrderTopic       broker-a  0      10000000      ← 堆积1000万条
#OrderTopic       broker-a  1      10000000
#OrderTopic       broker-a  2      10000000
#OrderTopic       broker-a  3      10000000
```

```java
// Java API监控堆积
public class MessageBacklogMonitor {
    public static void main(String[] args) throws Exception {
        DefaultMQAdminExt admin = new DefaultMQAdminExt();
        admin.setNamesrvAddr("localhost:9876");
        admin.start();

        // 查询消费进度
        ConsumeStats stats = admin.examineConsumeStats("ConsumerGroup");

        long totalDiff = 0; // 总堆积数
        for (Map.Entry<MessageQueue, OffsetWrapper> entry : stats.getOffsetTable().entrySet()) {
            MessageQueue mq = entry.getKey();
            OffsetWrapper offset = entry.getValue();

            long brokerOffset = offset.getBrokerOffset(); // Broker最大offset
            long consumerOffset = offset.getConsumerOffset(); // Consumer当前offset
            long diff = brokerOffset - consumerOffset; // 堆积数量

            if (diff > 0) {
                System.out.println("队列: " + mq + ", 堆积: " + diff);
                totalDiff += diff;
            }
        }

        System.out.println("总堆积数: " + totalDiff);

        // 告警阈值
        if (totalDiff > 1000000) {
            sendAlert("消息堆积超过100万条!");
        }

        admin.shutdown();
    }

    private static void sendAlert(String message) {
        // 发送告警
    }
}
```

**6. 处理流程总结**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">消息堆积处理流程</text>
<rect x="50" y="50" width="700" height="430" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="300" y="80" width="200" height="45" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="108" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">发现消息堆积</text>
<path d="M 400 130 L 400 155" stroke="#607D8B" stroke-width="2" marker-end="url(#arrowGray2)"/>
<rect x="300" y="160" width="200" height="45" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="188" text-anchor="middle" font-size="10" fill="#F57C00">评估堆积程度</text>
<path d="M 400 210 L 400 235" stroke="#607D8B" stroke-width="2" marker-end="url(#arrowGray2)"/>
<rect x="80" y="240" width="200" height="55" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="180" y="260" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">轻度堆积</text>
<text x="180" y="278" text-anchor="middle" font-size="8" fill="#7F8C8D">堆积&lt;100万条</text>
<rect x="300" y="240" width="200" height="55" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="260" text-anchor="middle" font-size="10" font-weight="bold" fill="#F57C00">中度堆积</text>
<text x="400" y="278" text-anchor="middle" font-size="8" fill="#7F8C8D">100万-1000万条</text>
<rect x="520" y="240" width="200" height="55" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="620" y="260" text-anchor="middle" font-size="10" font-weight="bold" fill="#C62828">重度堆积</text>
<text x="620" y="278" text-anchor="middle" font-size="8" fill="#7F8C8D">堆积&gt;1000万条</text>
<path d="M 180 300 L 180 325" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen5)"/>
<path d="M 400 300 L 400 325" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange)"/>
<path d="M 620 300 L 620 325" stroke="#E53935" stroke-width="2" marker-end="url(#arrowRed4)"/>
<rect x="80" y="330" width="200" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="180" y="348" text-anchor="middle" font-size="9" fill="#2E7D32">方案一</text>
<text x="95" y="365" font-size="8" fill="#424242">• 增加消费线程</text>
<text x="95" y="380" font-size="8" fill="#424242">• 批量消费</text>
<rect x="300" y="330" width="200" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="400" y="348" text-anchor="middle" font-size="9" fill="#F57C00">方案二</text>
<text x="315" y="365" font-size="8" fill="#424242">• 扩容消费者实例</text>
<text x="315" y="380" font-size="8" fill="#424242">• 业务逻辑优化</text>
<rect x="520" y="330" width="200" height="60" fill="#FFEBEE" stroke="#E53935" stroke-width="1" rx="3"/>
<text x="620" y="348" text-anchor="middle" font-size="9" fill="#C62828">方案三(紧急)</text>
<text x="535" y="365" font-size="8" fill="#424242">• 临时扩队列转移</text>
<text x="535" y="380" font-size="8" fill="#424242">• 降级处理</text>
<path d="M 180 395 L 180 410" stroke="#4CAF50" stroke-width="1" marker-end="url(#arrowGreen5)"/>
<path d="M 400 395 L 400 410" stroke="#FF9800" stroke-width="1" marker-end="url(#arrowOrange)"/>
<path d="M 620 395 L 620 410" stroke="#E53935" stroke-width="1" marker-end="url(#arrowRed4)"/>
<rect x="250" y="415" width="300" height="45" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="443" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">监控堆积下降 → 恢复正常</text>
<defs>
<marker id="arrowGray2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#607D8B"/>
</marker>
<marker id="arrowGreen5" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
<marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#FF9800"/>
</marker>
<marker id="arrowRed4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E53935"/>
</marker>
</defs>
</svg>

**7. 预防消息堆积**

```java
// 预防措施1: 消费限流
public class RateLimitConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        // 设置拉取阈值(避免一次拉取过多)
        consumer.setPullThresholdForQueue(1000); // 每个队列最多1000条
        consumer.setPullThresholdSizeForQueue(100); // 每个队列最多100MB

        // 设置消费超时(避免单条消息阻塞过久)
        consumer.setConsumeTimeout(15); // 15分钟

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // 快速消费
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }
}

// 预防措施2: 动态调整消费线程
public class DynamicThreadConsumer {
    private static DefaultMQPushConsumer consumer;

    public static void main(String[] args) throws Exception {
        consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        // 初始线程数
        consumer.setConsumeThreadMin(32);
        consumer.setConsumeThreadMax(64);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();

        // 定期检测堆积,动态调整线程数
        scheduleThreadAdjustment();
    }

    private static void scheduleThreadAdjustment() {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(() -> {
            try {
                long backlog = getBacklogCount();
                if (backlog > 100000) {
                    // 堆积超过10万,增加线程
                    consumer.setConsumeThreadMax(128);
                    System.out.println("堆积增加,线程数调整为128");
                } else if (backlog < 10000) {
                    // 堆积少,减少线程
                    consumer.setConsumeThreadMax(64);
                    System.out.println("堆积减少,线程数调整为64");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }, 0, 30, TimeUnit.SECONDS);
    }

    private static long getBacklogCount() {
        // 查询堆积数量
        return 0;
    }
}
```

**关键要点:**

1. **发现堆积**: 监控消费进度,及时发现堆积
2. **快速扩容**: 增加消费者实例和线程数
3. **批量消费**: 减少 IO 开销,提升消费速度
4. **临时方案**: 扩队列转移消息,快速消化堆积
5. **降级处理**: 紧急情况下丢弃低优先级消息
6. **预防为主**: 合理规划消费能力,避免堆积发生
7. **业务优化**: 优化消费逻辑是根本

**记忆口诀:**

```
消息堆积莫慌张
监控发现定方案
轻度堆积增线程
中度堆积扩实例
重度堆积扩队列
降级处理保核心
批量消费提效率
预防为主最重要
消费能力要匹配
定期演练应急案
```

### 60. 如何监控 RocketMQ 的性能指标？

**核心答案:**

监控 RocketMQ 性能指标有五种方式:
1. **命令行工具**: mqadmin 命令查看实时状态
2. **Dashboard**: 官方可视化监控平台
3. **Metrics 埋点**: Prometheus + Grafana 监控
4. **JMX**: Java Management Extensions 监控
5. **日志分析**: 解析日志统计指标

**详细说明:**

**1. 核心性能指标**

<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 核心监控指标</text>
<rect x="50" y="50" width="700" height="410" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="80" y="75" width="320" height="180" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="240" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">生产端指标</text>
<text x="100" y="125" font-size="9" fill="#424242" font-weight="bold">吞吐量指标:</text>
<text x="110" y="145" font-size="8" fill="#424242">• TPS (每秒发送消息数)</text>
<text x="110" y="163" font-size="8" fill="#424242">• 发送成功率 (%)</text>
<text x="110" y="181" font-size="8" fill="#424242">• 发送失败率 (%)</text>
<text x="100" y="205" font-size="9" fill="#424242" font-weight="bold">延迟指标:</text>
<text x="110" y="223" font-size="8" fill="#424242">• 发送平均耗时 (ms)</text>
<text x="110" y="241" font-size="8" fill="#424242">• 发送最大耗时 (ms)</text>
<rect x="420" y="75" width="320" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="580" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">消费端指标</text>
<text x="440" y="125" font-size="9" fill="#424242" font-weight="bold">吞吐量指标:</text>
<text x="450" y="145" font-size="8" fill="#424242">• TPS (每秒消费消息数)</text>
<text x="450" y="163" font-size="8" fill="#424242">• 消费成功率 (%)</text>
<text x="450" y="181" font-size="8" fill="#424242">• 消费失败率 (%)</text>
<text x="440" y="205" font-size="9" fill="#424242" font-weight="bold">延迟指标:</text>
<text x="450" y="223" font-size="8" fill="#424242">• 消费延迟 (ms)</text>
<text x="450" y="241" font-size="8" fill="#424242">• 消息堆积数量</text>
<rect x="80" y="270" width="320" height="175" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="240" y="295" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">Broker指标</text>
<text x="100" y="320" font-size="9" fill="#424242" font-weight="bold">存储指标:</text>
<text x="110" y="338" font-size="8" fill="#424242">• 磁盘使用率 (%)</text>
<text x="110" y="356" font-size="8" fill="#424242">• 消息存储量 (条/GB)</text>
<text x="100" y="378" font-size="9" fill="#424242" font-weight="bold">性能指标:</text>
<text x="110" y="396" font-size="8" fill="#424242">• PageCache命中率 (%)</text>
<text x="110" y="414" font-size="8" fill="#424242">• IO等待时间 (ms)</text>
<text x="110" y="432" font-size="8" fill="#424242">• 刷盘耗时 (ms)</text>
<rect x="420" y="270" width="320" height="175" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="580" y="295" text-anchor="middle" font-size="12" font-weight="bold" fill="#7B1FA2">系统指标</text>
<text x="440" y="320" font-size="9" fill="#424242" font-weight="bold">资源指标:</text>
<text x="450" y="338" font-size="8" fill="#424242">• CPU使用率 (%)</text>
<text x="450" y="356" font-size="8" fill="#424242">• 内存使用率 (%)</text>
<text x="450" y="374" font-size="8" fill="#424242">• 网络IO (MB/s)</text>
<text x="440" y="396" font-size="9" fill="#424242" font-weight="bold">JVM指标:</text>
<text x="450" y="414" font-size="8" fill="#424242">• GC频率和耗时</text>
<text x="450" y="432" font-size="8" fill="#424242">• 堆内存使用 (MB)</text>
</svg>

**2. 命令行监控(mqadmin)**

```bash
# 1. 查看集群状态
sh bin/mqadmin clusterList -n localhost:9876

# 输出:
#Cluster Name  Broker Name  BID  Addr              Version
#DefaultCluster broker-a     0    192.168.1.100:10911  V4_9_3
#DefaultCluster broker-a     1    192.168.1.101:10911  V4_9_3

# 2. 查看Topic统计信息
sh bin/mqadmin topicStatus -t OrderTopic -n localhost:9876

# 输出:
#BROKER_NAME  QUEUE_ID  MIN_OFFSET  MAX_OFFSET  LAST_UPDATE_TIME
#broker-a     0         0           1000000     2024-01-20 10:00:00
#broker-a     1         0           1000000     2024-01-20 10:00:00
#broker-a     2         0           1000000     2024-01-20 10:00:00
#broker-a     3         0           1000000     2024-01-20 10:00:00

# 3. 查看消费进度(重要!)
sh bin/mqadmin consumerProgress -g ConsumerGroup -n localhost:9876

# 输出:
#TOPIC      BROKER  QUEUE  BROKER_OFFSET  CONSUMER_OFFSET  DIFF    LAST_TIMESTAMP
#OrderTopic broker-a 0     1000000       950000           50000   2024-01-20 10:00:00
#OrderTopic broker-a 1     1000000       980000           20000   2024-01-20 10:00:01
#OrderTopic broker-a 2     1000000       990000           10000   2024-01-20 10:00:02
#OrderTopic broker-a 3     1000000       1000000          0       2024-01-20 10:00:03
#
#Consumer TPS: 1000  ← 消费速度
#Diff Total: 80000   ← 总堆积数

# 4. 查看Broker统计信息
sh bin/mqadmin brokerStatus -b 192.168.1.100:10911 -n localhost:9876

# 输出:
#bootTimestamp: 2024-01-20 08:00:00
#msgPutTotalTodayNow: 10000000      ← 今日发送消息数
#msgGetTotalTodayNow: 9500000       ← 今日消费消息数
#msgPutTotalTodayMorning: 3000000   ← 今日凌晨发送数
#msgGetTotalTodayMorning: 2900000   ← 今日凌晨消费数
#...

# 5. 查看消费者连接
sh bin/mqadmin consumerConnection -g ConsumerGroup -n localhost:9876

# 输出:
#CLIENT_ID                    VERSION  LANGUAGE  TPS
#192.168.1.200@12345          V4_9_3   JAVA      500
#192.168.1.201@12346          V4_9_3   JAVA      500

# 6. 查看Producer连接
sh bin/mqadmin producerConnection -g ProducerGroup -t OrderTopic -n localhost:9876

# 7. 监控脚本(定时采集)
```

```bash
#!/bin/bash
# monitor_rocketmq.sh - 定时监控脚本

NAMESRV="localhost:9876"
CONSUMER_GROUP="ConsumerGroup"
LOG_FILE="/var/log/rocketmq_monitor.log"

while true; do
    echo "========== $(date '+%Y-%m-%d %H:%M:%S') ==========" >> $LOG_FILE

    # 查询消费进度
    sh bin/mqadmin consumerProgress \
        -g $CONSUMER_GROUP \
        -n $NAMESRV >> $LOG_FILE 2>&1

    # 提取堆积数量
    DIFF_TOTAL=$(sh bin/mqadmin consumerProgress \
        -g $CONSUMER_GROUP -n $NAMESRV 2>/dev/null | \
        grep "Diff Total" | awk '{print $3}')

    echo "Total Backlog: $DIFF_TOTAL" >> $LOG_FILE

    # 告警(堆积超过100万)
    if [ $DIFF_TOTAL -gt 1000000 ]; then
        echo "ALERT: Message backlog exceeds 1 million!" >> $LOG_FILE
        # 发送告警
        # curl -X POST https://alert.example.com/api/alert \
        #     -d "message=RocketMQ backlog: $DIFF_TOTAL"
    fi

    sleep 60  # 每60秒采集一次
done
```

**3. Dashboard 可视化监控**

```bash
# 安装RocketMQ Dashboard(官方)
git clone https://github.com/apache/rocketmq-dashboard.git
cd rocketmq-dashboard

# 配置NameServer地址
vi src/main/resources/application.properties
# rocketmq.config.namesrvAddr=localhost:9876

# 编译运行
mvn clean package -Dmaven.test.skip=true
java -jar target/rocketmq-dashboard-1.0.0.jar

# 访问: http://localhost:8080
```

**Dashboard 功能:**
- 集群拓扑展示
- Topic/ConsumerGroup 管理
- 消息查询和追踪
- 消费进度实时监控
- Broker 运行状态
- 生产/消费 TPS 曲线

**4. Prometheus + Grafana 监控(推荐)**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Prometheus + Grafana 监控架构</text>
<rect x="50" y="50" width="700" height="280" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="150" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="175" y="100" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">RocketMQ Broker</text>
<text x="175" y="120" text-anchor="middle" font-size="8" fill="#424242">暴露Metrics接口</text>
<text x="175" y="133" text-anchor="middle" font-size="7" fill="#7F8C8D">:5557/metrics</text>
<path d="M 250 110 L 320 110" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen6)"/>
<text x="285" y="100" text-anchor="middle" font-size="8" fill="#2E7D32">拉取</text>
<rect x="320" y="80" width="150" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="395" y="100" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Prometheus</text>
<text x="395" y="120" text-anchor="middle" font-size="8" fill="#424242">时序数据库</text>
<text x="395" y="133" text-anchor="middle" font-size="7" fill="#7F8C8D">存储指标数据</text>
<path d="M 470 110 L 540 110" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange2)"/>
<text x="505" y="100" text-anchor="middle" font-size="8" fill="#F57C00">查询</text>
<rect x="540" y="80" width="150" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="615" y="100" text-anchor="middle" font-size="10" font-weight="bold" fill="#F57C00">Grafana</text>
<text x="615" y="120" text-anchor="middle" font-size="8" fill="#424242">可视化展示</text>
<text x="615" y="133" text-anchor="middle" font-size="7" fill="#7F8C8D">Dashboard</text>
<rect x="100" y="170" width="590" height="140" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="395" y="192" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">监控指标示例</text>
<text x="120" y="215" font-size="8" fill="#424242" font-weight="bold">生产指标:</text>
<text x="130" y="233" font-size="7" fill="#424242">• rocketmq_producer_tps: 生产TPS</text>
<text x="130" y="248" font-size="7" fill="#424242">• rocketmq_producer_message_size: 消息大小</text>
<text x="120" y="270" font-size="8" fill="#424242" font-weight="bold">消费指标:</text>
<text x="130" y="288" font-size="7" fill="#424242">• rocketmq_consumer_tps: 消费TPS</text>
<text x="130" y="303" font-size="7" fill="#424242">• rocketmq_consumer_lag: 消费延迟</text>
<text x="420" y="215" font-size="8" fill="#424242" font-weight="bold">Broker指标:</text>
<text x="430" y="233" font-size="7" fill="#424242">• rocketmq_broker_qps: Broker QPS</text>
<text x="430" y="248" font-size="7" fill="#424242">• rocketmq_broker_put_latency: 写入延迟</text>
<text x="420" y="270" font-size="8" fill="#424242" font-weight="bold">系统指标:</text>
<text x="430" y="288" font-size="7" fill="#424242">• process_cpu_seconds_total: CPU使用</text>
<text x="430" y="303" font-size="7" fill="#424242">• jvm_memory_bytes_used: 内存使用</text>
<defs>
<marker id="arrowGreen6" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
<marker id="arrowOrange2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#FF9800"/>
</marker>
</defs>
</svg>

```properties
# broker.conf - 开启Metrics导出
# 开启Prometheus Exporter
metricsExporterType=PROM
metricsPromExporterPort=5557
metricsPromExporterHost=0.0.0.0

# 指标采集间隔(秒)
metricsGrpcExporterTimerPeriod=60
```

```yaml
# prometheus.yml - Prometheus配置
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  # RocketMQ Broker监控
  - job_name: 'rocketmq-broker'
    static_configs:
      - targets:
        - '192.168.1.100:5557'  # Broker1
        - '192.168.1.101:5557'  # Broker2
    metrics_path: '/metrics'

  # RocketMQ NameServer监控
  - job_name: 'rocketmq-nameserver'
    static_configs:
      - targets:
        - '192.168.1.100:5558'
```

```yaml
# docker-compose.yml - 快速部署监控
version: '3'
services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-storage:/var/lib/grafana

volumes:
  grafana-storage:

# 启动: docker-compose up -d
# 访问Grafana: http://localhost:3000 (admin/admin)
```

**Grafana Dashboard 配置:**

```json
// dashboard.json - Grafana面板配置示例
{
  "dashboard": {
    "title": "RocketMQ监控",
    "panels": [
      {
        "title": "生产TPS",
        "targets": [
          {
            "expr": "rate(rocketmq_producer_message_total[1m])"
          }
        ]
      },
      {
        "title": "消费TPS",
        "targets": [
          {
            "expr": "rate(rocketmq_consumer_message_total[1m])"
          }
        ]
      },
      {
        "title": "消息堆积",
        "targets": [
          {
            "expr": "rocketmq_consumer_lag_total"
          }
        ]
      },
      {
        "title": "Broker延迟",
        "targets": [
          {
            "expr": "rocketmq_broker_put_message_latency"
          }
        ]
      }
    ]
  }
}
```

**5. Java API 监控**

```java
// 自定义监控采集器
public class RocketMQMonitor {
    private DefaultMQAdminExt admin;
    private ScheduledExecutorService scheduler;

    public void start() throws Exception {
        admin = new DefaultMQAdminExt();
        admin.setNamesrvAddr("localhost:9876");
        admin.start();

        // 定时采集指标
        scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(this::collectMetrics, 0, 30, TimeUnit.SECONDS);
    }

    private void collectMetrics() {
        try {
            // 1. 采集生产指标
            collectProducerMetrics();

            // 2. 采集消费指标
            collectConsumerMetrics();

            // 3. 采集Broker指标
            collectBrokerMetrics();

            // 4. 采集Topic指标
            collectTopicMetrics();

        } catch (Exception e) {
            System.err.println("采集指标失败: " + e.getMessage());
        }
    }

    // 采集生产指标
    private void collectProducerMetrics() throws Exception {
        TopicList topics = admin.fetchAllTopicList();

        for (String topic : topics.getTopicList()) {
            TopicStatsTable stats = admin.examineTopicStats(topic);

            long totalMessages = 0;
            for (MessageQueue mq : stats.getOffsetTable().keySet()) {
                TopicOffset offset = stats.getOffsetTable().get(mq);
                totalMessages += offset.getMaxOffset();
            }

            // 上报指标
            reportMetric("producer_total_messages", topic, totalMessages);
        }
    }

    // 采集消费指标
    private void collectConsumerMetrics() throws Exception {
        ConsumerConnection cc = admin.examineConsumerConnectionInfo("ConsumerGroup");

        for (Connection conn : cc.getConnectionSet()) {
            // 连接数
            reportMetric("consumer_connections", "ConsumerGroup", 1);
        }

        // 消费进度
        ConsumeStats stats = admin.examineConsumeStats("ConsumerGroup");
        long totalDiff = 0;

        for (Map.Entry<MessageQueue, OffsetWrapper> entry : stats.getOffsetTable().entrySet()) {
            OffsetWrapper offset = entry.getValue();
            long diff = offset.getBrokerOffset() - offset.getConsumerOffset();
            totalDiff += diff;
        }

        // 堆积数量
        reportMetric("consumer_lag", "ConsumerGroup", totalDiff);
    }

    // 采集Broker指标
    private void collectBrokerMetrics() throws Exception {
        ClusterInfo clusterInfo = admin.examineBrokerClusterInfo();

        for (String brokerName : clusterInfo.getBrokerAddrTable().keySet()) {
            HashMap<Long, String> brokerAddrs = clusterInfo.getBrokerAddrTable().get(brokerName);

            for (Map.Entry<Long, String> entry : brokerAddrs.entrySet()) {
                String addr = entry.getValue();

                // 查询Broker统计信息
                KVTable kvTable = admin.fetchBrokerRuntimeStats(addr);

                // 提取关键指标
                String msgPutTotal = kvTable.getTable().get("msgPutTotalTodayNow");
                String msgGetTotal = kvTable.getTable().get("msgGetTotalTodayNow");

                reportMetric("broker_put_total", brokerName, Long.parseLong(msgPutTotal));
                reportMetric("broker_get_total", brokerName, Long.parseLong(msgGetTotal));
            }
        }
    }

    // 采集Topic指标
    private void collectTopicMetrics() throws Exception {
        TopicList topics = admin.fetchAllTopicList();

        for (String topic : topics.getTopicList()) {
            TopicStatsTable stats = admin.examineTopicStats(topic);

            // 队列数量
            int queueCount = stats.getOffsetTable().size();
            reportMetric("topic_queue_count", topic, queueCount);

            // 总消息数
            long totalMessages = 0;
            for (TopicOffset offset : stats.getOffsetTable().values()) {
                totalMessages += offset.getMaxOffset();
            }
            reportMetric("topic_total_messages", topic, totalMessages);
        }
    }

    // 上报指标(对接Prometheus/InfluxDB等)
    private void reportMetric(String metricName, String label, long value) {
        // 推送到Prometheus Pushgateway
        // 或写入InfluxDB
        // 或输出到日志
        System.out.println(String.format("%s{label=\"%s\"} %d", metricName, label, value));
    }

    public void shutdown() {
        if (scheduler != null) {
            scheduler.shutdown();
        }
        if (admin != null) {
            admin.shutdown();
        }
    }

    public static void main(String[] args) throws Exception {
        RocketMQMonitor monitor = new RocketMQMonitor();
        monitor.start();

        // 保持运行
        Thread.sleep(Long.MAX_VALUE);
    }
}
```

**6. 告警规则配置**

```yaml
# prometheus_alerts.yml - Prometheus告警规则
groups:
  - name: rocketmq_alerts
    interval: 30s
    rules:
      # 消息堆积告警
      - alert: MessageBacklogHigh
        expr: rocketmq_consumer_lag_total > 1000000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "消息堆积超过100万条"
          description: "ConsumerGroup {{ $labels.group }} 堆积 {{ $value }} 条消息"

      # 消费速度过慢告警
      - alert: ConsumeTpsLow
        expr: rate(rocketmq_consumer_message_total[5m]) < 100
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "消费速度过慢"
          description: "消费TPS仅 {{ $value }} 条/秒"

      # Broker离线告警
      - alert: BrokerDown
        expr: up{job="rocketmq-broker"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Broker离线"
          description: "Broker {{ $labels.instance }} 已离线"

      # 磁盘使用率告警
      - alert: DiskUsageHigh
        expr: (1 - node_filesystem_avail_bytes / node_filesystem_size_bytes) > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "磁盘使用率超过80%"
          description: "磁盘使用率 {{ $value }}%"
```

**7. 监控最佳实践**

| 监控项 | 告警阈值 | 检查频率 | 处理动作 |
|-------|---------|---------|---------|
| 消息堆积 | > 100万条 | 1分钟 | 扩容消费者 |
| 消费TPS | < 目标值50% | 5分钟 | 检查消费逻辑 |
| Broker离线 | down | 30秒 | 紧急故障处理 |
| 磁盘使用率 | > 80% | 5分钟 | 清理旧消息/扩容 |
| JVM GC | 单次>1s | 5分钟 | JVM调优 |
| 网络IO | > 带宽80% | 5分钟 | 升级网络/限流 |

**关键要点:**

1. **核心指标**: TPS、堆积、延迟是最重要的三个指标
2. **实时监控**: 使用 Dashboard 或 Grafana 实时查看
3. **告警及时**: 设置合理阈值,及时发现问题
4. **历史数据**: Prometheus 保存历史数据,便于分析
5. **全链路监控**: 生产-存储-消费全链路
6. **定期演练**: 定期模拟故障,验证监控告警
7. **文档记录**: 记录历史故障和处理方案

**记忆口诀:**

```
监控RocketMQ六大招
命令Dashboard和Grafana
Prometheus采集指标
JMX查看JVM状
核心指标要盯紧
TPS堆积和延迟
告警阈值要合理
及时发现快响应
全链路监控不能少
生产消费加存储
定期演练保可靠
文档记录防遗忘
```



## 高可用

### 61. RocketMQ 如何实现高可用？

**核心答案:**

RocketMQ 通过五层高可用机制保障系统稳定性:
1. **NameServer 集群**: 无状态集群,任一节点可用即可
2. **Broker 主从复制**: Master-Slave 架构,数据冗余
3. **消息持久化**: 刷盘保证数据不丢失
4. **自动故障转移**: Dledger 模式支持自动主从切换
5. **Producer/Consumer 重试**: 客户端故障容错机制

**详细说明:**

**(1) RocketMQ 高可用架构**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 高可用架构</text>
<rect x="50" y="50" width="700" height="430" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="250" y="80" width="300" height="70" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">NameServer 集群(无状态)</text>
<rect x="280" y="120" width="70" height="20" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="315" y="135" text-anchor="middle" font-size="8" fill="#424242">NS-1</text>
<rect x="365" y="120" width="70" height="20" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="400" y="135" text-anchor="middle" font-size="8" fill="#424242">NS-2</text>
<rect x="450" y="120" width="70" height="20" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="485" y="135" text-anchor="middle" font-size="8" fill="#424242">NS-3</text>
<path d="M 315 165 L 180 195" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue)"/>
<path d="M 400 165 L 400 195" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue)"/>
<path d="M 485 165 L 620 195" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue)"/>
<text x="400" y="185" text-anchor="middle" font-size="8" fill="#7F8C8D">路由注册</text>
<rect x="80" y="200" width="240" height="130" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="200" y="220" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">Broker 集群 A</text>
<rect x="110" y="235" width="80" height="80" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2" rx="3"/>
<text x="150" y="253" text-anchor="middle" font-size="9" font-weight="bold" fill="#2E7D32">Master-A</text>
<text x="150" y="270" text-anchor="middle" font-size="7" fill="#424242">读写</text>
<text x="150" y="285" text-anchor="middle" font-size="7" fill="#424242">192.168.1.100</text>
<text x="150" y="302" text-anchor="middle" font-size="8" fill="#2E7D32">✓ 主节点</text>
<path d="M 150 235 L 150 225" stroke="#4CAF50" stroke-width="1"/>
<path d="M 195 265 L 205 265" stroke="#E53935" stroke-width="2" marker-end="url(#arrowRed5)"/>
<text x="200" y="255" font-size="6" fill="#E53935">同步</text>
<rect x="210" y="235" width="80" height="80" fill="#FFEBEE" stroke="#E53935" stroke-width="1" rx="3"/>
<text x="250" y="253" text-anchor="middle" font-size="9" fill="#C62828">Slave-A</text>
<text x="250" y="270" text-anchor="middle" font-size="7" fill="#424242">只读</text>
<text x="250" y="285" text-anchor="middle" font-size="7" fill="#424242">192.168.1.101</text>
<text x="250" y="302" text-anchor="middle" font-size="8" fill="#F57C00">备节点</text>
<rect x="480" y="200" width="240" height="130" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="600" y="220" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">Broker 集群 B</text>
<rect x="510" y="235" width="80" height="80" fill="#FFE0B2" stroke="#FF9800" stroke-width="2" rx="3"/>
<text x="550" y="253" text-anchor="middle" font-size="9" font-weight="bold" fill="#F57C00">Master-B</text>
<text x="550" y="270" text-anchor="middle" font-size="7" fill="#424242">读写</text>
<text x="550" y="285" text-anchor="middle" font-size="7" fill="#424242">192.168.1.102</text>
<text x="550" y="302" text-anchor="middle" font-size="8" fill="#F57C00">✓ 主节点</text>
<path d="M 550 235 L 550 225" stroke="#FF9800" stroke-width="1"/>
<path d="M 595 265 L 605 265" stroke="#E53935" stroke-width="2" marker-end="url(#arrowRed5)"/>
<text x="600" y="255" font-size="6" fill="#E53935">同步</text>
<rect x="610" y="235" width="80" height="80" fill="#FFEBEE" stroke="#E53935" stroke-width="1" rx="3"/>
<text x="650" y="253" text-anchor="middle" font-size="9" fill="#C62828">Slave-B</text>
<text x="650" y="270" text-anchor="middle" font-size="7" fill="#424242">只读</text>
<text x="650" y="285" text-anchor="middle" font-size="7" fill="#424242">192.168.1.103</text>
<text x="650" y="302" text-anchor="middle" font-size="8" fill="#F57C00">备节点</text>
<path d="M 150 335 L 150 365" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen7)"/>
<path d="M 250 335 L 250 365" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue2)"/>
<path d="M 550 335 L 550 365" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange3)"/>
<path d="M 650 335 L 650 365" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue2)"/>
<text x="130" y="355" font-size="7" fill="#2E7D32">写</text>
<text x="230" y="355" font-size="7" fill="#2196F3">读</text>
<text x="530" y="355" font-size="7" fill="#F57C00">写</text>
<text x="630" y="355" font-size="7" fill="#2196F3">读</text>
<rect x="80" y="370" width="140" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="150" y="390" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">Producer</text>
<text x="150" y="408" text-anchor="middle" font-size="7" fill="#7F8C8D">发送消息</text>
<rect x="580" y="370" width="140" height="50" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="650" y="390" text-anchor="middle" font-size="10" font-weight="bold" fill="#7B1FA2">Consumer</text>
<text x="650" y="408" text-anchor="middle" font-size="7" fill="#7F8C8D">消费消息</text>
<rect x="240" y="430" width="320" height="35" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="400" y="453" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">高可用保障: 任意节点故障,系统仍可用</text>
<defs>
<marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#2196F3"/>
</marker>
<marker id="arrowGreen7" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
<marker id="arrowOrange3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#FF9800"/>
</marker>
<marker id="arrowBlue2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#2196F3"/>
</marker>
<marker id="arrowRed5" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E53935"/>
</marker>
</defs>
</svg>

**(2) NameServer 高可用(无状态集群)**

```bash
# NameServer集群部署(3节点)
# 机器1: 192.168.1.10
nohup sh bin/mqnamesrv &

# 机器2: 192.168.1.11
nohup sh bin/mqnamesrv &

# 机器3: 192.168.1.12
nohup sh bin/mqnamesrv &

# Producer/Consumer配置多个NameServer地址(用分号分隔)
# 任意一个NameServer可用即可
```

```java
// 客户端配置多NameServer
public class HAProducer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");

        // 配置多个NameServer,用分号分隔
        // 客户端会随机选择一个连接,故障时自动切换
        producer.setNamesrvAddr("192.168.1.10:9876;192.168.1.11:9876;192.168.1.12:9876");

        producer.start();

        Message msg = new Message("TestTopic", "Hello".getBytes());
        SendResult result = producer.send(msg);

        System.out.println("发送成功: " + result.getMsgId());

        producer.shutdown();
    }
}
```

**NameServer 高可用特点:**
```
1. 无状态: 每个NameServer独立运行,不互相通信
2. 数据一致性: Broker向所有NameServer注册,最终一致
3. 故障容错: 客户端配置多个NameServer,任一可用即可
4. 自动切换: 客户端检测到NameServer不可用,自动切换
5. 部署简单: 无需主从配置,直接启动即可
```

**(3) Broker 主从高可用**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Broker 主从复制架构</text>
<rect x="50" y="50" width="700" height="350" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="250" height="280" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="225" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">Master Broker</text>
<text x="225" y="125" text-anchor="middle" font-size="9" fill="#7F8C8D">broker-a (BrokerId=0)</text>
<rect x="120" y="140" width="210" height="60" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="225" y="160" text-anchor="middle" font-size="9" fill="#424242">接收写请求</text>
<text x="135" y="180" font-size="8" fill="#424242">• 接收Producer消息</text>
<text x="135" y="195" font-size="8" fill="#424242">• 写入CommitLog</text>
<rect x="120" y="210" width="210" height="60" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="225" y="230" text-anchor="middle" font-size="9" fill="#424242">处理读请求</text>
<text x="135" y="250" font-size="8" fill="#424242">• Consumer拉取消息</text>
<text x="135" y="265" font-size="8" fill="#424242">• 返回消息数据</text>
<rect x="120" y="280" width="210" height="60" fill="#FFE0B2" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="300" text-anchor="middle" font-size="9" fill="#F57C00">同步数据到Slave</text>
<text x="135" y="320" font-size="8" fill="#424242">• 同步复制(SYNC_MASTER)</text>
<text x="135" y="335" font-size="8" fill="#424242">• 异步复制(ASYNC_MASTER)</text>
<path d="M 360 220 L 440 220" stroke="#E53935" stroke-width="3" marker-end="url(#arrowRed6)"/>
<text x="400" y="215" text-anchor="middle" font-size="9" fill="#E53935">数据同步</text>
<rect x="450" y="80" width="250" height="280" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="575" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">Slave Broker</text>
<text x="575" y="125" text-anchor="middle" font-size="9" fill="#7F8C8D">broker-a-s (BrokerId=1)</text>
<rect x="470" y="140" width="210" height="60" fill="#FFCDD2" stroke="#E53935" stroke-width="1" rx="3"/>
<text x="575" y="160" text-anchor="middle" font-size="9" fill="#424242">不接收写请求</text>
<text x="485" y="180" font-size="8" fill="#C62828">• Producer不写Slave</text>
<text x="485" y="195" font-size="8" fill="#C62828">• 只接收Master同步数据</text>
<rect x="470" y="210" width="210" height="60" fill="#FFCDD2" stroke="#E53935" stroke-width="1" rx="3"/>
<text x="575" y="230" text-anchor="middle" font-size="9" fill="#424242">处理读请求</text>
<text x="485" y="250" font-size="8" fill="#424242">• Consumer拉取消息</text>
<text x="485" y="265" font-size="8" fill="#424242">• 分担Master读压力</text>
<rect x="470" y="280" width="210" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="575" y="300" text-anchor="middle" font-size="9" fill="#F57C00">接收Master数据</text>
<text x="485" y="320" font-size="8" fill="#424242">• 实时接收同步数据</text>
<text x="485" y="335" font-size="8" fill="#424242">• 保持与Master一致</text>
<defs>
<marker id="arrowRed6" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E53935"/>
</marker>
</defs>
</svg>

```properties
# broker-a.conf - Master配置
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0  # 0表示Master
deleteWhen=04
fileReservedTime=48

# 主从复制模式
brokerRole=SYNC_MASTER  # 同步复制,可靠性高
# brokerRole=ASYNC_MASTER  # 异步复制,性能高

# 刷盘策略
flushDiskType=ASYNC_FLUSH

# NameServer地址
namesrvAddr=192.168.1.10:9876;192.168.1.11:9876

# 监听端口
listenPort=10911
```

```properties
# broker-a-s.conf - Slave配置
brokerClusterName=DefaultCluster
brokerName=broker-a  # 与Master相同
brokerId=1  # 非0表示Slave
deleteWhen=04
fileReservedTime=48

# Slave角色
brokerRole=SLAVE

# 刷盘策略
flushDiskType=ASYNC_FLUSH

# NameServer地址
namesrvAddr=192.168.1.10:9876;192.168.1.11:9876

# 监听端口
listenPort=10921
```

```bash
# 启动Master
nohup sh bin/mqbroker -c conf/broker-a.conf &

# 启动Slave
nohup sh bin/mqbroker -c conf/broker-a-s.conf &
```

**(4) 主从复制模式对比**

| 复制模式 | 可靠性 | 性能 | 适用场景 |
|---------|-------|------|---------|
| **SYNC_MASTER** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 金融、支付等对可靠性要求极高的场景 |
| **ASYNC_MASTER** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 一般业务场景,允许极少量数据丢失 |

```java
// 同步复制示例
public class SyncMasterProducer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("192.168.1.10:9876");
        producer.start();

        Message msg = new Message("OrderTopic", "订单数据".getBytes());

        // 同步发送到Master,Master会等待Slave同步成功后才返回
        SendResult result = producer.send(msg);

        // result.getSendStatus() == SEND_OK 表示:
        // 1. Master写入成功
        // 2. Slave同步成功(SYNC_MASTER模式)
        System.out.println("发送结果: " + result.getSendStatus());

        producer.shutdown();
    }
}
```

**(5) 自动故障转移(Dledger 模式)**

```properties
# broker-dledger.conf - Dledger配置
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0

# 启用Dledger
enableDLedgerCommitLog=true
dLedgerGroup=broker-a  # Dledger组名
dLedgerPeers=n0-192.168.1.100:40911;n1-192.168.1.101:40911;n2-192.168.1.102:40911
dLedgerSelfId=n0  # 本机ID

# NameServer地址
namesrvAddr=192.168.1.10:9876
```

**Dledger 自动故障转移流程:**

```
1. 初始状态: n0(Leader), n1(Follower), n2(Follower)
2. n0故障: n1和n2检测到Leader不可用
3. 选举: n1和n2通过Raft协议选举新Leader
4. n1当选: n1成为新的Leader,对外提供服务
5. n0恢复: n0以Follower身份重新加入集群
6. 数据同步: n0从n1同步数据,恢复数据一致性

优点:
✓ 自动故障转移,无需人工介入
✓ 数据强一致性(Raft协议保证)
✓ 支持动态扩缩容

缺点:
✗ 性能略低于传统主从模式
✗ 至少需要3个节点(保证多数派)
```

**(6) 客户端高可用**

```java
// Producer 高可用配置
public class HAProducerConfig {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");

        // 1. 配置多NameServer
        producer.setNamesrvAddr("192.168.1.10:9876;192.168.1.11:9876;192.168.1.12:9876");

        // 2. 发送失败重试次数
        producer.setRetryTimesWhenSendFailed(3);  // 同步发送失败重试3次
        producer.setRetryTimesWhenSendAsyncFailed(3);  // 异步发送失败重试3次

        // 3. 发送超时时间
        producer.setSendMsgTimeout(3000);  // 3秒超时

        // 4. 故障延迟(发送到故障Broker时等待时间)
        producer.setRetryAnotherBrokerWhenNotStoreOK(true);  // 存储失败重试其他Broker

        producer.start();

        // 发送消息,自动重试和故障转移
        Message msg = new Message("TestTopic", "Hello".getBytes());
        SendResult result = producer.send(msg);

        System.out.println("发送成功: " + result.getMsgId());

        producer.shutdown();
    }
}

// Consumer 高可用配置
public class HAConsumerConfig {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");

        // 1. 配置多NameServer
        consumer.setNamesrvAddr("192.168.1.10:9876;192.168.1.11:9876;192.168.1.12:9876");

        // 2. 消费失败重试次数
        consumer.setMaxReconsumeTimes(3);  // 最多重试3次

        // 3. 从Slave读取消息(分担Master压力)
        consumer.setMessageModel(MessageModel.CLUSTERING);  // 集群模式

        consumer.subscribe("TestTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {

                try {
                    // 处理消息
                    for (MessageExt msg : msgs) {
                        System.out.println("消费消息: " + new String(msg.getBody()));
                    }
                    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                } catch (Exception e) {
                    // 消费失败,返回RECONSUME_LATER会自动重试
                    return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                }
            }
        });

        consumer.start();
    }
}
```

**(7) 高可用测试**

```bash
# 测试1: NameServer故障
# 停止NameServer-1
sh bin/mqshutdown namesrv

# Producer/Consumer自动连接其他NameServer,服务不受影响

# 测试2: Master Broker故障
# 停止Master Broker
sh bin/mqshutdown broker

# Consumer自动从Slave读取消息(传统主从模式)
# 或者自动选举新Leader(Dledger模式)

# 测试3: 网络分区
# 模拟网络故障
iptables -A INPUT -s 192.168.1.100 -j DROP

# 系统自动故障转移,切换到其他节点
```

**(8) 高可用最佳实践**

```
部署建议:
1. NameServer: 至少2个节点,推荐3个
2. Broker: 至少2主2从,推荐多主多从
3. 硬件: 独立机器/机架,避免单点故障
4. 网络: 独立网络,避免网络拥塞

配置建议:
1. 同步复制: 重要业务使用SYNC_MASTER
2. 异步刷盘: 性能优先使用ASYNC_FLUSH
3. Dledger: 需要自动故障转移使用Dledger模式
4. 监控告警: 实时监控,及时发现故障

运维建议:
1. 定期备份: 定期备份数据和配置
2. 演练: 定期故障演练,验证高可用方案
3. 文档: 记录故障处理流程
4. 版本: 保持RocketMQ版本统一
```

**关键要点:**

1. **多层高可用**: NameServer集群 + Broker主从 + 客户端重试
2. **NameServer无状态**: 任一节点可用即可,部署简单
3. **Broker主从**: Master写,Slave读,数据冗余
4. **同步复制**: 可靠性优先选择SYNC_MASTER
5. **Dledger模式**: 自动故障转移,无需人工干预
6. **客户端容错**: 自动重试和故障转移
7. **监控告警**: 实时监控,及时处理故障

**记忆口诀:**

```
RocketMQ高可用
五层机制保平安
NameServer无状态
集群部署三节点
Broker主从复制
Master写Slave读
同步复制可靠性
异步复制高性能
Dledger自动切
Raft协议强一致
客户端有重试
故障转移自动化
监控告警不能少
定期演练保无忧
```

### 62. Broker 如何实现主从切换？

**核心答案:**

Broker 主从切换有两种方式:
1. **传统主从模式**: 手动切换，需人工介入
2. **Dledger 模式**: 基于 Raft 协议自动选举，无需人工干预

**详细说明:**

**(1) 传统主从模式的主从切换**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">传统主从切换流程(手动)</text>
<rect x="50" y="50" width="700" height="380" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="250" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="225" y="110" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">步骤1: 检测Master故障</text>
<text x="120" y="135" font-size="9" fill="#424242">• 监控系统发现Master不可用</text>
<text x="120" y="150" font-size="9" fill="#424242">• 或运维人员手动检查</text>
<path d="M 225 165 L 225 185" stroke="#607D8B" stroke-width="2" marker-end="url(#arrowGray3)"/>
<rect x="100" y="190" width="250" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="225" y="220" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">步骤2: 停止Slave同步</text>
<text x="120" y="245" font-size="9" fill="#424242">• 停止Slave Broker进程</text>
<text x="120" y="260" font-size="9" fill="#424242">• 或修改配置暂停同步</text>
<path d="M 225 275 L 225 295" stroke="#607D8B" stroke-width="2" marker-end="url(#arrowGray3)"/>
<rect x="100" y="300" width="250" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="225" y="330" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">步骤3: 修改Slave为Master</text>
<text x="120" y="355" font-size="9" fill="#424242">• 修改broker.conf配置</text>
<text x="120" y="370" font-size="9" fill="#424242">• brokerId=0, brokerRole=MASTER</text>
<path d="M 355 240 L 395 240" stroke="#607D8B" stroke-width="2" marker-end="url(#arrowGray3)"/>
<rect x="400" y="190" width="300" height="190" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="550" y="215" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">步骤4: 重启并更新路由</text>
<text x="420" y="240" font-size="9" fill="#424242">• 重启Broker(原Slave变为Master)</text>
<text x="420" y="260" font-size="9" fill="#424242">• 向NameServer注册新的Master信息</text>
<text x="420" y="280" font-size="9" fill="#424242">• 等待Producer/Consumer更新路由</text>
<rect x="420" y="300" width="260" height="60" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="550" y="325" text-anchor="middle" font-size="10" fill="#2E7D32">切换完成</text>
<text x="435" y="345" font-size="8" fill="#424242">✓ 新Master开始接收写请求</text>
<text x="435" y="360" font-size="8" fill="#424242">✓ 服务恢复正常</text>
<text x="400" y="415" text-anchor="middle" font-size="11" fill="#E74C3C" font-weight="bold">⚠️ 缺点: 需要人工介入,切换时间较长(分钟级)</text>
<defs>
<marker id="arrowGray3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#607D8B"/>
</marker>
</defs>
</svg>

**传统主从切换步骤:**

```bash
# 步骤1: 检测Master故障
# 假设Master(192.168.1.100)故障,Slave(192.168.1.101)正常

# 步骤2: 停止Slave
ssh 192.168.1.101
sh bin/mqshutdown broker

# 步骤3: 修改Slave配置为Master
vi conf/broker-a.conf

# 修改以下配置:
# brokerId=0           # 改为0表示Master
# brokerRole=ASYNC_MASTER  # 改为Master角色

# 步骤4: 启动新的Master
nohup sh bin/mqbroker -c conf/broker-a.conf &

# 步骤5: 验证
sh bin/mqadmin clusterList -n localhost:9876

# 输出应显示新Master已注册
#Cluster Name  Broker Name  BID  Addr              Version
#DefaultCluster broker-a     0    192.168.1.101:10911  V4_9_3

# 步骤6: 如果原Master恢复,可以作为Slave加入
# 在原Master机器上修改配置:
# brokerId=1           # 改为1表示Slave
# brokerRole=SLAVE     # 改为Slave角色
# 然后启动
```

**传统主从切换的缺点:**

```
1. 人工介入: 需要运维人员手动操作
2. 切换时间长: 通常需要几分钟
3. 容易出错: 配置修改可能出错
4. 写入中断: 切换期间无法写入
5. 运维成本高: 需要7x24小时值班
```

**(2) Dledger 模式的自动切换**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Dledger 自动主从切换(基于Raft)</text>
<rect x="50" y="50" width="700" height="430" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="400" y="80" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">初始状态: 3节点集群</text>
<rect x="100" y="95" width="150" height="70" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="175" y="120" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">n0 - Leader</text>
<text x="175" y="140" text-anchor="middle" font-size="9" fill="#424242">192.168.1.100</text>
<text x="175" y="155" text-anchor="middle" font-size="8" fill="#2E7D32">✓ 处理读写</text>
<rect x="325" y="95" width="150" height="70" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="11" fill="#1976D2">n1 - Follower</text>
<text x="400" y="140" text-anchor="middle" font-size="9" fill="#424242">192.168.1.101</text>
<text x="400" y="155" text-anchor="middle" font-size="8" fill="#7F8C8D">备份节点</text>
<rect x="550" y="95" width="150" height="70" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="5"/>
<text x="625" y="120" text-anchor="middle" font-size="11" fill="#1976D2">n2 - Follower</text>
<text x="625" y="140" text-anchor="middle" font-size="9" fill="#424242">192.168.1.102</text>
<text x="625" y="155" text-anchor="middle" font-size="8" fill="#7F8C8D">备份节点</text>
<path d="M 400 185 L 400 205" stroke="#E53935" stroke-width="2" marker-end="url(#arrowRed7)"/>
<text x="400" y="200" text-anchor="middle" font-size="10" fill="#E53935" font-weight="bold">n0 故障!</text>
<rect x="100" y="210" width="150" height="70" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="175" y="235" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">n0 - 故障</text>
<text x="175" y="255" text-anchor="middle" font-size="9" fill="#C62828">❌ 不可用</text>
<text x="175" y="270" text-anchor="middle" font-size="8" fill="#C62828">心跳超时</text>
<rect x="325" y="210" width="150" height="70" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="235" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">n1 - Candidate</text>
<text x="400" y="255" text-anchor="middle" font-size="9" fill="#424242">发起选举</text>
<text x="400" y="270" text-anchor="middle" font-size="8" fill="#F57C00">RequestVote</text>
<rect x="550" y="210" width="150" height="70" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="625" y="235" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">n2 - Candidate</text>
<text x="625" y="255" text-anchor="middle" font-size="9" fill="#424242">发起选举</text>
<text x="625" y="270" text-anchor="middle" font-size="8" fill="#F57C00">RequestVote</text>
<path d="M 400 290 L 625 290" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen8)"/>
<text x="512" y="285" text-anchor="middle" font-size="8" fill="#2E7D32">投票</text>
<path d="M 400 300 L 400 320" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen8)"/>
<text x="420" y="315" font-size="9" fill="#2E7D32" font-weight="bold">n1获得多数票</text>
<rect x="100" y="325" width="150" height="70" fill="#FFEBEE" stroke="#E53935" stroke-width="1" rx="5"/>
<text x="175" y="350" text-anchor="middle" font-size="11" fill="#C62828">n0 - 下线</text>
<text x="175" y="370" text-anchor="middle" font-size="9" fill="#C62828">❌ 故障</text>
<text x="175" y="385" text-anchor="middle" font-size="8" fill="#C62828">待修复</text>
<rect x="325" y="325" width="150" height="70" fill="#E8F5E9" stroke="#4CAF50" stroke-width="3" rx="5"/>
<text x="400" y="350" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">n1 - Leader</text>
<text x="400" y="370" text-anchor="middle" font-size="9" fill="#424242">192.168.1.101</text>
<text x="400" y="385" text-anchor="middle" font-size="8" fill="#2E7D32">✓ 新Leader</text>
<rect x="550" y="325" width="150" height="70" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="5"/>
<text x="625" y="350" text-anchor="middle" font-size="11" fill="#1976D2">n2 - Follower</text>
<text x="625" y="370" text-anchor="middle" font-size="9" fill="#424242">192.168.1.102</text>
<text x="625" y="385" text-anchor="middle" font-size="8" fill="#7F8C8D">跟随n1</text>
<rect x="200" y="410" width="400" height="50" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="400" y="435" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">自动切换完成! 秒级切换,无需人工介入</text>
<text x="400" y="450" text-anchor="middle" font-size="9" fill="#7F8C8D">切换时间 &lt; 10秒</text>
<defs>
<marker id="arrowRed7" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E53935"/>
</marker>
<marker id="arrowGreen8" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
</defs>
</svg>

**Dledger 配置和部署:**

```properties
# 节点n0配置 - broker-n0.conf
brokerClusterName=DefaultCluster
brokerName=broker-dledger
listenPort=30911

# 启用Dledger
enableDLedgerCommitLog=true

# Dledger组配置
dLedgerGroup=broker-dledger
dLedgerPeers=n0-192.168.1.100:40911;n1-192.168.1.101:40911;n2-192.168.1.102:40911
dLedgerSelfId=n0

# NameServer地址
namesrvAddr=localhost:9876

# 存储路径
storePathRootDir=/data/rocketmq/n0/store
storePathCommitLog=/data/rocketmq/n0/store/commitlog
```

```properties
# 节点n1配置 - broker-n1.conf
brokerClusterName=DefaultCluster
brokerName=broker-dledger
listenPort=30911

enableDLedgerCommitLog=true

dLedgerGroup=broker-dledger
dLedgerPeers=n0-192.168.1.100:40911;n1-192.168.1.101:40911;n2-192.168.1.102:40911
dLedgerSelfId=n1  # 区别在这里

namesrvAddr=localhost:9876

storePathRootDir=/data/rocketmq/n1/store
storePathCommitLog=/data/rocketmq/n1/store/commitlog
```

```properties
# 节点n2配置 - broker-n2.conf
brokerClusterName=DefaultCluster
brokerName=broker-dledger
listenPort=30911

enableDLedgerCommitLog=true

dLedgerGroup=broker-dledger
dLedgerPeers=n0-192.168.1.100:40911;n1-192.168.1.101:40911;n2-192.168.1.102:40911
dLedgerSelfId=n2  # 区别在这里

namesrvAddr=localhost:9876

storePathRootDir=/data/rocketmq/n2/store
storePathCommitLog=/data/rocketmq/n2/store/commitlog
```

```bash
# 在三台机器上分别启动Broker
# 机器1: 192.168.1.100
nohup sh bin/mqbroker -c conf/broker-n0.conf &

# 机器2: 192.168.1.101
nohup sh bin/mqbroker -c conf/broker-n1.conf &

# 机器3: 192.168.1.102
nohup sh bin/mqbroker -c conf/broker-n2.conf &

# 查看集群状态
sh bin/mqadmin clusterList -n localhost:9876
```

**(3) Dledger 选举过程详解**

```
Raft协议选举流程:

1. 初始状态: 所有节点都是Follower
   n0: Follower, n1: Follower, n2: Follower

2. Leader选举:
   - n0率先超时,转为Candidate,Term=1
   - n0向n1和n2发送RequestVote请求
   - n1和n2收到请求,投票给n0
   - n0获得多数票(3票中的2票),成为Leader

3. 正常运行:
   - n0(Leader): 处理所有写请求
   - n1,n2(Follower): 从Leader同步数据
   - Leader定期发送心跳,维持Leader地位

4. Leader故障:
   - n1和n2检测到Leader心跳超时
   - 选举超时后,n1和n2转为Candidate
   - 假设n1先发起RequestVote,Term=2
   - n2投票给n1
   - n1获得多数票(2票中的2票),成为新Leader

5. 新Leader上任:
   - n1成为Leader,开始处理写请求
   - n2继续作为Follower
   - 客户端自动连接新Leader

6. 旧Leader恢复:
   - n0恢复后,发现Term落后
   - n0自动转为Follower
   - n0从n1同步数据,追上进度
```

**(4) Dledger vs 传统主从对比**

| 对比项 | 传统主从 | Dledger模式 |
|-------|---------|------------|
| **切换方式** | 手动切换 | 自动选举 |
| **切换时间** | 分钟级(5-10分钟) | 秒级(5-10秒) |
| **人工介入** | 需要 | 不需要 |
| **数据一致性** | 最终一致性 | 强一致性(Raft) |
| **最少节点** | 2(1主1从) | 3(保证多数派) |
| **配置复杂度** | 简单 | 中等 |
| **资源消耗** | 低 | 中等(Raft协议开销) |
| **适用场景** | 一般业务 | 高可用要求场景 |

**(5) 主从切换验证测试**

```bash
# 测试Dledger自动切换

# 步骤1: 查看当前Leader
sh bin/mqadmin clusterList -n localhost:9876 | grep "broker-dledger"

# 输出示例:
# DefaultCluster broker-dledger 0 192.168.1.100:30911 V4_9_3  ← Leader

# 步骤2: 模拟Leader故障(停止n0)
ssh 192.168.1.100
sh bin/mqshutdown broker

# 步骤3: 等待10秒,观察自动切换
sleep 10

# 步骤4: 再次查看Leader
sh bin/mqadmin clusterList -n localhost:9876 | grep "broker-dledger"

# 输出示例:
# DefaultCluster broker-dledger 0 192.168.1.101:30911 V4_9_3  ← 新Leader(n1)

# 步骤5: 验证写入
# Producer可以正常发送消息到新Leader

# 步骤6: 恢复原Leader(n0)
ssh 192.168.1.100
nohup sh bin/mqbroker -c conf/broker-n0.conf &

# 步骤7: n0自动以Follower身份加入
# 查看日志:
tail -f ~/logs/rocketmqlogs/broker.log
# 看到类似日志: "Append as follower, term=2, leader=n1"
```

**(6) 主从切换最佳实践**

```
选择建议:
1. 一般业务: 使用传统主从,简单可靠,成本低
2. 核心业务: 使用Dledger,自动切换,可用性高
3. 金融/支付: 使用Dledger + 同步刷盘,保证数据安全

部署建议:
1. Dledger至少3节点: 保证多数派选举
2. 节点分布: 不同机器/机架,避免单点故障
3. 网络质量: 节点间低延迟网络,减少选举时间
4. 磁盘性能: 使用SSD,提升Raft日志写入性能

监控建议:
1. 监控Leader状态: 实时监控当前Leader节点
2. 监控切换频率: 频繁切换说明网络或配置有问题
3. 监控数据一致性: 定期校验主从数据一致性
4. 告警设置: 切换发生时立即告警通知
```

**关键要点:**

1. **传统主从**: 手动切换,需要运维介入,切换时间较长
2. **Dledger模式**: 基于Raft自动选举,秒级切换
3. **选举过程**: Leader故障 → Candidate竞选 → 多数派投票 → 新Leader
4. **配置要求**: Dledger至少3节点,保证多数派
5. **数据一致性**: Raft协议保证强一致性
6. **切换时间**: Dledger约5-10秒,传统主从5-10分钟
7. **场景选择**: 核心业务用Dledger,一般业务用传统主从

**记忆口诀:**

```
主从切换两模式
传统手动Dledger自动
传统模式配置简
停从改主再重启
人工介入时间长
分钟级别才完成
Dledger基于Raft
三节点保多数派
Leader故障自动选
秒级切换不用管
强一致性有保障
核心业务首选项
```

### 63. 什么是 Dledger 模式？

**核心答案:**

Dledger 是 RocketMQ 基于 Raft 协议实现的高可用分布式日志存储系统,用于替代传统的主从复制,实现:
1. **自动故障转移**: Leader 故障时自动选举新 Leader
2. **强一致性**: 基于 Raft 保证数据强一致性
3. **高可用**: 支持多节点集群,容忍少数节点故障

**详细说明:**

**(1) Dledger 架构**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Dledger 架构 (基于Raft协议)</text>
<rect x="50" y="50" width="700" height="380" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="600" height="120" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="400" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">Dledger Group (3节点)</text>
<rect x="130" y="120" width="150" height="60" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="205" y="145" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Node-0 (Leader)</text>
<text x="205" y="165" text-anchor="middle" font-size="8" fill="#424242">处理读写请求</text>
<rect x="325" y="120" width="150" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="5"/>
<text x="400" y="145" text-anchor="middle" font-size="10" fill="#1976D2">Node-1 (Follower)</text>
<text x="400" y="165" text-anchor="middle" font-size="8" fill="#424242">同步数据</text>
<rect x="520" y="120" width="150" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="5"/>
<text x="595" y="145" text-anchor="middle" font-size="10" fill="#1976D2">Node-2 (Follower)</text>
<text x="595" y="165" text-anchor="middle" font-size="8" fill="#424242">同步数据</text>
<path d="M 205 220 L 205 245" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen9)"/>
<path d="M 400 220 L 400 245" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue3)"/>
<path d="M 595 220 L 595 245" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue3)"/>
<rect x="100" y="250" width="600" height="160" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="275" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">Raft 核心机制</text>
<rect x="130" y="290" width="170" height="100" fill="#FFEBEE" stroke="#E53935" stroke-width="1" rx="3"/>
<text x="215" y="310" text-anchor="middle" font-size="10" font-weight="bold" fill="#C62828">Leader选举</text>
<text x="145" y="330" font-size="8" fill="#424242">• 心跳超时触发</text>
<text x="145" y="348" font-size="8" fill="#424242">• Candidate竞选</text>
<text x="145" y="366" font-size="8" fill="#424242">• 多数派投票</text>
<text x="145" y="384" font-size="8" fill="#424242">• 选出新Leader</text>
<rect x="320" y="290" width="170" height="100" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="405" y="310" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">日志复制</text>
<text x="335" y="330" font-size="8" fill="#424242">• Leader接收写请求</text>
<text x="335" y="348" font-size="8" fill="#424242">• 复制到Follower</text>
<text x="335" y="366" font-size="8" fill="#424242">• 多数派确认</text>
<text x="335" y="384" font-size="8" fill="#424242">• 提交并响应</text>
<rect x="510" y="290" width="170" height="100" fill="#F3E5F5" stroke="#9C27B0" stroke-width="1" rx="3"/>
<text x="595" y="310" text-anchor="middle" font-size="10" font-weight="bold" fill="#7B1FA2">安全性</text>
<text x="525" y="330" font-size="8" fill="#424242">• Term机制</text>
<text x="525" y="348" font-size="8" fill="#424242">• 日志一致性检查</text>
<text x="525" y="366" font-size="8" fill="#424242">• 强一致性保证</text>
<text x="525" y="384" font-size="8" fill="#424242">• 脑裂防止</text>
<defs>
<marker id="arrowGreen9" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
<marker id="arrowBlue3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#2196F3"/>
</marker>
</defs>
</svg>

**(2) Dledger 核心概念**

**Raft 协议三大核心:**

```
1. Leader选举 (Leader Election)
   - 每个节点维护Term(任期号)
   - Follower超时未收到心跳,转为Candidate
   - Candidate发起RequestVote请求投票
   - 获得多数派投票的Candidate成为Leader
   - Leader定期发送心跳维持地位

2. 日志复制 (Log Replication)
   - 所有写请求由Leader处理
   - Leader将日志复制到Follower
   - 多数派确认后,Leader提交日志
   - Leader通知Follower提交日志
   - 保证日志一致性

3. 安全性 (Safety)
   - 已提交的日志不会丢失
   - Leader完整性: 新Leader必须包含所有已提交日志
   - 状态机安全性: 日志应用顺序一致
```

**关键术语:**

| 术语 | 说明 | 示例 |
|-----|------|------|
| **Term** | 任期号,单调递增 | Term=1, Term=2, ... |
| **Leader** | 集群领导者,处理写请求 | Node-0 |
| **Follower** | 跟随者,从Leader同步 | Node-1, Node-2 |
| **Candidate** | 候选者,竞选Leader | Node-1(竞选中) |
| **Log Entry** | 日志条目,包含数据和Term | {term:1, index:1, data:"msg"} |
| **Commit Index** | 已提交日志索引 | commitIndex=100 |
| **Quorum** | 多数派,过半数节点 | 3节点需2个确认 |

**(3) Dledger 配置详解**

```properties
# broker-dledger.conf 完整配置

# ========== 基础配置 ==========
brokerClusterName=DefaultCluster
brokerName=broker-dledger

# ========== Dledger 配置 ==========
# 启用Dledger模式(核心开关)
enableDLedgerCommitLog=true

# Dledger组名(同一组节点使用相同名称)
dLedgerGroup=broker-dledger

# Dledger节点列表(格式: nodeId-host:port)
# 所有节点必须配置相同的peers列表
dLedgerPeers=n0-192.168.1.100:40911;n1-192.168.1.101:40911;n2-192.168.1.102:40911

# 当前节点ID(每个节点不同)
dLedgerSelfId=n0

# ========== Dledger 端口配置 ==========
# Dledger通信端口(用于Raft协议通信)
# 不同于Broker的listenPort(30911)
listenPort=30911

# ========== 选举参数 ==========
# 心跳间隔(毫秒,默认2000)
# Leader发送心跳的频率
heartBeatTimeIntervalMs=2000

# 选举超时基准(毫秒,默认1000)
# Follower未收到心跳,触发选举的时间
# 实际超时: base + random(0~base)
minElectTimeIntervalMs=1000
maxElectTimeIntervalMs=3000

# ========== 日志复制参数 ==========
# 日志文件大小(默认1GB)
mappedFileSizeCommitLog=1073741824

# 批量传输大小(默认4MB)
maxPushTimeOutMillis=3000

# ========== NameServer配置 ==========
namesrvAddr=192.168.1.10:9876;192.168.1.11:9876

# ========== 存储路径 ==========
storePathRootDir=/data/rocketmq/dledger/n0
storePathCommitLog=/data/rocketmq/dledger/n0/dledger-commitlog
```

**(4) Dledger 工作流程**

**写入流程:**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Dledger 写入流程</text>
<rect x="50" y="50" width="700" height="330" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="80" y="80" width="120" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="140" y="115" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">Producer</text>
<path d="M 205 110 L 275 110" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen10)"/>
<text x="240" y="105" text-anchor="middle" font-size="8" fill="#2E7D32">1.发送消息</text>
<rect x="280" y="80" width="120" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="340" y="105" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Leader</text>
<text x="340" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(Node-0)</text>
<path d="M="340" y1="145" x2="340" y2="175" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange4)"/>
<text x="360" y="165" font-size="8" fill="#F57C00">2.追加日志</text>
<rect x="280" y="180" width="120" height="50" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="340" y="210" text-anchor="middle" font-size="9" fill="#424242">日志: Entry[1]</text>
<path d="M 405 205 L 475 120" stroke="#9C27B0" stroke-width="2" marker-end="url(#arrowPurple)"/>
<path d="M 405 205 L 475 220" stroke="#9C27B0" stroke-width="2" marker-end="url(#arrowPurple)"/>
<text x="445" y="160" font-size="8" fill="#7B1FA2">3.复制</text>
<rect x="480" y="80" width="110" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="5"/>
<text x="535" y="105" text-anchor="middle" font-size="10" fill="#1976D2">Follower-1</text>
<text x="535" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(Node-1)</text>
<rect x="480" y="190" width="110" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="5"/>
<text x="535" y="215" text-anchor="middle" font-size="10" fill="#1976D2">Follower-2</text>
<text x="535" y="235" text-anchor="middle" font-size="8" fill="#7F8C8D">(Node-2)</text>
<path d="M 475 110 L 405 190" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen10)"/>
<path d="M 475 220 L 405 210" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen10)"/>
<text x="435" y="250" font-size="8" fill="#2E7D32">4.确认</text>
<rect x="280" y="270" width="120" height="50" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2" rx="3"/>
<text x="340" y="295" text-anchor="middle" font-size="9" font-weight="bold" fill="#2E7D32">提交日志</text>
<text x="340" y="310" text-anchor="middle" font-size="8" fill="#7F8C8D">多数派确认</text>
<path d="M 275 295 L 205 110" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue4)"/>
<text x="230" y="200" font-size="8" fill="#1976D2">5.响应</text>
<text x="100" y="355" font-size="10" fill="#E74C3C" font-weight="bold">关键: 多数派(2/3)确认后才提交</text>
<defs>
<marker id="arrowGreen10" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
<marker id="arrowOrange4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#FF9800"/>
</marker>
<marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#9C27B0"/>
</marker>
<marker id="arrowBlue4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#2196F3"/>
</marker>
</defs>
</svg>

```java
// Dledger 写入流程伪代码
public class DledgerWriteProcess {
    public void handleWrite(Message msg) {
        // 步骤1: Leader接收写请求
        if (!isLeader()) {
            // 转发到Leader
            redirectToLeader(msg);
            return;
        }

        // 步骤2: 追加到本地日志(未提交)
        LogEntry entry = new LogEntry(currentTerm, nextIndex++, msg);
        localLog.append(entry);

        // 步骤3: 并行复制到所有Follower
        List<Future<Boolean>> futures = new ArrayList<>();
        for (Follower follower : followers) {
            Future<Boolean> future = executor.submit(() -> {
                return follower.appendEntry(entry);
            });
            futures.add(future);
        }

        // 步骤4: 等待多数派确认
        int ackCount = 1; // Leader自己算1个
        for (Future<Boolean> future : futures) {
            try {
                if (future.get(timeout, TimeUnit.MILLISECONDS)) {
                    ackCount++;
                }
            } catch (TimeoutException e) {
                // 超时
            }
        }

        // 步骤5: 检查是否达到多数派
        if (ackCount >= (clusterSize / 2 + 1)) {
            // 多数派确认,提交日志
            commitIndex = entry.getIndex();
            // 应用到状态机
            applyToStateMachine(entry);
            // 响应客户端成功
            return new WriteResult(SUCCESS, entry.getIndex());
        } else {
            // 未达到多数派,失败
            return new WriteResult(FAIL, -1);
        }
    }
}
```

**(5) Dledger vs 传统主从**

| 对比维度 | 传统主从 | Dledger模式 |
|---------|---------|------------|
| **复制协议** | 简单主从复制 | Raft一致性协议 |
| **数据一致性** | 最终一致性 | 强一致性 |
| **故障切换** | 手动切换 | 自动选举(秒级) |
| **脑裂风险** | 存在 | 不存在(Term机制) |
| **最少节点** | 2(1主1从) | 3(保证多数派) |
| **性能** | 高(异步复制) | 中(需多数派确认) |
| **复杂度** | 低 | 中等 |
| **适用场景** | 一般业务 | 高可用要求 |
| **数据丢失** | 可能少量丢失 | 不丢失(已提交) |

**(6) Dledger 部署实践**

```bash
# 完整部署脚本
#!/bin/bash

# 节点信息
NODES=(
    "n0:192.168.1.100"
    "n1:192.168.1.101"
    "n2:192.168.1.102"
)

# Dledger组配置
DLEDGER_GROUP="broker-dledger"
DLEDGER_PEERS="n0-192.168.1.100:40911;n1-192.168.1.101:40911;n2-192.168.1.102:40911"
NAMESRV_ADDR="192.168.1.10:9876;192.168.1.11:9876"

# 在每个节点上部署
for node_info in "${NODES[@]}"; do
    IFS=':' read -r node_id node_ip <<< "$node_info"

    echo "部署节点: $node_id ($node_ip)"

    # 生成配置文件
    cat > broker-${node_id}.conf <<EOF
brokerClusterName=DefaultCluster
brokerName=${DLEDGER_GROUP}
listenPort=30911

enableDLedgerCommitLog=true
dLedgerGroup=${DLEDGER_GROUP}
dLedgerPeers=${DLEDGER_PEERS}
dLedgerSelfId=${node_id}

namesrvAddr=${NAMESRV_ADDR}

storePathRootDir=/data/rocketmq/dledger/${node_id}
storePathCommitLog=/data/rocketmq/dledger/${node_id}/commitlog

# 性能调优
sendMessageThreadPoolNums=16
pullMessageThreadPoolNums=16
diskMaxUsedSpaceRatio=85
EOF

    # 上传配置并启动(实际需要ssh到对应机器)
    # scp broker-${node_id}.conf ${node_ip}:/opt/rocketmq/conf/
    # ssh ${node_ip} "cd /opt/rocketmq && nohup sh bin/mqbroker -c conf/broker-${node_id}.conf &"

done

echo "Dledger集群部署完成"

# 验证集群状态
sleep 10
sh bin/mqadmin clusterList -n ${NAMESRV_ADDR}
```

**(7) Dledger 运维监控**

```bash
# 查看Dledger状态
sh bin/mqadmin clusterList -n localhost:9876 | grep "broker-dledger"

# 查看当前Leader
# 输出中 BID=0 的节点为Leader

# 查看日志文件
tail -f ~/logs/rocketmqlogs/broker.log | grep -i "dledger"

# 关键日志:
# - "Elected as leader, term=X" : 选举为Leader
# - "Append as follower, term=X" : 加入为Follower
# - "Request vote from X" : 发起投票请求
# - "Grant vote to X" : 投票给节点X
```

```java
// Java监控Dledger状态
public class DledgerMonitor {
    public void monitorDledgerCluster() throws Exception {
        DefaultMQAdminExt admin = new DefaultMQAdminExt();
        admin.setNamesrvAddr("localhost:9876");
        admin.start();

        ClusterInfo clusterInfo = admin.examineBrokerClusterInfo();

        for (String brokerName : clusterInfo.getBrokerAddrTable().keySet()) {
            if (brokerName.contains("dledger")) {
                HashMap<Long, String> brokerAddrs = clusterInfo.getBrokerAddrTable().get(brokerName);

                for (Map.Entry<Long, String> entry : brokerAddrs.entrySet()) {
                    Long brokerId = entry.getKey();
                    String addr = entry.getValue();

                    if (brokerId == 0L) {
                        System.out.println("Dledger Leader: " + addr);
                    } else {
                        System.out.println("Dledger Follower: " + addr);
                    }
                }
            }
        }

        admin.shutdown();
    }
}
```

**关键要点:**

1. **Dledger本质**: 基于Raft的分布式日志系统
2. **核心优势**: 自动故障转移 + 强一致性
3. **选举机制**: 心跳超时 → 竞选 → 投票 → 新Leader
4. **日志复制**: 多数派确认才提交,保证数据不丢
5. **配置要求**: 至少3节点,所有节点配置peers列表
6. **性能权衡**: 比传统主从略慢,但可靠性更高
7. **适用场景**: 核心业务、高可用要求场景

**记忆口诀:**

```
Dledger基于Raft
三节点保多数派
Leader选举自动化
故障转移秒级切
日志复制强一致
多数派确认提交
Term机制防脑裂
配置peers要一致
核心业务首选择
自动高可用无忧
```

### 64. NameServer 如何实现高可用？

**核心答案:**

NameServer 通过**无状态集群**实现高可用:
1. **无状态设计**: 每个 NameServer 独立运行,不互相通信
2. **数据一致性**: Broker 向所有 NameServer 注册,最终一致
3. **客户端容错**: 配置多个 NameServer,自动故障转移
4. **简单部署**: 无需选主,直接启动多个节点即可

**详细说明:**

**(1) NameServer 无状态架构**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">NameServer 无状态集群架构</text>
<rect x="50" y="50" width="700" height="380" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="150" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="175" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">NameServer-1</text>
<text x="175" y="130" text-anchor="middle" font-size="9" fill="#424242">192.168.1.10</text>
<text x="175" y="148" text-anchor="middle" font-size="8" fill="#2E7D32">✓ 独立运行</text>
<rect x="325" y="80" width="150" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">NameServer-2</text>
<text x="400" y="130" text-anchor="middle" font-size="9" fill="#424242">192.168.1.11</text>
<text x="400" y="148" text-anchor="middle" font-size="8" fill="#2E7D32">✓ 独立运行</text>
<rect x="550" y="80" width="150" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="625" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">NameServer-3</text>
<text x="625" y="130" text-anchor="middle" font-size="9" fill="#424242">192.168.1.12</text>
<text x="625" y="148" text-anchor="middle" font-size="8" fill="#2E7D32">✓ 独立运行</text>
<path d="M 175 175 L 240 215 M 400 175 L 400 215 M 625 175 L 560 215" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue5)"/>
<text x="400" y="200" text-anchor="middle" font-size="9" fill="#1976D2">Broker注册(全部)</text>
<rect x="250" y="220" width="300" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="400" y="245" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">Broker集群</text>
<rect x="270" y="260" width="110" height="30" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="325" y="280" text-anchor="middle" font-size="9" fill="#424242">Broker-A</text>
<rect x="420" y="260" width="110" height="30" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="475" y="280" text-anchor="middle" font-size="9" fill="#424242">Broker-B</text>
<path d="M 175 315 L 175 340 M 400 315 L 400 340 M 625 315 L 625 340" stroke="#9C27B0" stroke-width="2"/>
<text x="400" y="330" text-anchor="middle" font-size="9" fill="#7B1FA2">客户端连接(任意)</text>
<rect x="100" y="345" width="150" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="175" y="370" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">Producer</text>
<text x="175" y="390" text-anchor="middle" font-size="8" fill="#7F8C8D">连接NS-1</text>
<rect x="325" y="345" width="150" height="60" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="400" y="370" text-anchor="middle" font-size="10" font-weight="bold" fill="#7B1FA2">Consumer</text>
<text x="400" y="390" text-anchor="middle" font-size="8" fill="#7F8C8D">连接NS-2</text>
<rect x="550" y="345" width="150" height="60" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="625" y="370" text-anchor="middle" font-size="10" font-weight="bold" fill="#C2185B">Admin</text>
<text x="625" y="390" text-anchor="middle" font-size="8" fill="#7F8C8D">连接NS-3</text>
<defs>
<marker id="arrowBlue5" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#2196F3"/>
</marker>
</defs>
</svg>

**核心特点:**

```
1. 无状态: NameServer之间不通信,各自独立
2. 数据来源: 所有数据由Broker主动注册
3. 最终一致: Broker向所有NS注册,数据最终一致
4. 简单部署: 无需选主协调,启动即可
```

**(2) NameServer 数据同步机制**

```
Broker注册流程:
1. Broker启动后,向配置的所有NameServer发送注册请求
2. 每个NameServer独立处理注册请求,更新本地路由表
3. Broker定期(30秒)发送心跳,保持注册状态
4. NameServer检测心跳超时(120秒),移除失效Broker

数据一致性:
- Broker向所有NS注册 → 最终所有NS数据一致
- 单个NS故障 → 不影响其他NS
- NS恢复后 → Broker下次心跳时自动注册
```

**NameServer 存储的数据:**

| 数据类型 | 说明 | 示例 |
|---------|------|------|
| **Topic路由** | Topic与Broker的映射 | OrderTopic → Broker-A, Broker-B |
| **Broker信息** | Broker地址和状态 | Broker-A: 192.168.1.100:10911 |
| **集群信息** | 集群和Broker的关系 | DefaultCluster: [Broker-A, Broker-B] |
| **Producer组** | Producer组列表 | ProducerGroup1, ProducerGroup2 |
| **Consumer组** | Consumer组列表 | ConsumerGroup1, ConsumerGroup2 |

**(3) NameServer 部署配置**

```bash
# 方式1: 单机部署多个NameServer(测试用)

# NameServer-1
mkdir -p /data/namesrv1
nohup sh bin/mqnamesrv -p 9876 -h /data/namesrv1 > ns1.log 2>&1 &

# NameServer-2
mkdir -p /data/namesrv2
nohup sh bin/mqnamesrv -p 9877 -h /data/namesrv2 > ns2.log 2>&1 &

# NameServer-3
mkdir -p /data/namesrv3
nohup sh bin/mqnamesrv -p 9878 -h /data/namesrv3 > ns3.log 2>&1 &
```

```bash
# 方式2: 多机部署(生产推荐)

# 机器1: 192.168.1.10
nohup sh bin/mqnamesrv &

# 机器2: 192.168.1.11
nohup sh bin/mqnamesrv &

# 机器3: 192.168.1.12
nohup sh bin/mqnamesrv &

# Broker配置多个NameServer
vi conf/broker.conf
# namesrvAddr=192.168.1.10:9876;192.168.1.11:9876;192.168.1.12:9876

# 启动Broker
nohup sh bin/mqbroker -c conf/broker.conf &
```

**NameServer 配置文件(可选):**

```properties
# namesrv.properties (默认配置已足够,通常无需配置文件)

# 监听端口(默认9876)
listenPort=9876

# KV配置文件路径
kvConfigPath=/data/namesrv/kvConfig.json

# 心跳检测间隔(毫秒,默认10秒)
scanNotActiveBrokerInterval=10000

# Broker过期时间(毫秒,默认120秒)
brokerChannelExpiredTime=120000
```

**(4) 客户端高可用配置**

```java
// Producer配置多NameServer
public class HAProducerWithNS {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");

        // 配置多个NameServer地址(分号分隔)
        // 客户端会随机选择一个连接
        producer.setNamesrvAddr("192.168.1.10:9876;192.168.1.11:9876;192.168.1.12:9876");

        // 客户端定期从NameServer拉取路由(默认30秒)
        // producer.setPollNameServerInterval(30000);

        producer.start();

        // 发送消息
        Message msg = new Message("TestTopic", "Hello".getBytes());
        SendResult result = producer.send(msg);

        System.out.println("发送成功: " + result.getMsgId());

        producer.shutdown();
    }
}

// Consumer配置多NameServer
public class HAConsumerWithNS {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");

        // 配置多个NameServer地址
        consumer.setNamesrvAddr("192.168.1.10:9876;192.168.1.11:9876;192.168.1.12:9876");

        consumer.subscribe("TestTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    System.out.println("消费消息: " + new String(msg.getBody()));
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("Consumer启动成功");
    }
}
```

**客户端故障转移机制:**

```java
// RocketMQ客户端内部逻辑(简化版)
public class NameServerSelector {
    private List<String> namesrvAddrs; // NS地址列表
    private AtomicInteger index = new AtomicInteger(0);

    // 随机选择一个NameServer
    public String selectNameServer() {
        if (namesrvAddrs.isEmpty()) {
            return null;
        }

        // 轮询选择
        int idx = Math.abs(index.getAndIncrement() % namesrvAddrs.size());
        return namesrvAddrs.get(idx);
    }

    // 更新路由信息
    public void updateRouteInfo() {
        String addr = selectNameServer();
        try {
            // 从NameServer拉取最新路由
            TopicRouteData routeData = fetchRouteFromNameServer(addr);
            updateLocalRouteTable(routeData);
        } catch (Exception e) {
            // 当前NS不可用,标记并尝试下一个
            markNameServerUnavailable(addr);

            // 自动重试其他NS
            for (String otherAddr : namesrvAddrs) {
                if (!otherAddr.equals(addr)) {
                    try {
                        TopicRouteData routeData = fetchRouteFromNameServer(otherAddr);
                        updateLocalRouteTable(routeData);
                        return; // 成功
                    } catch (Exception ex) {
                        // 继续尝试下一个
                    }
                }
            }
        }
    }
}
```

**(5) NameServer 故障场景**

**场景1: 单个NameServer故障**

```
初始状态: NS-1, NS-2, NS-3 正常
故障: NS-1 宕机

影响:
- Broker继续向NS-2和NS-3发送心跳 → 无影响
- 客户端连接NS-1的会自动切换到NS-2或NS-3 → 无影响
- 新启动的客户端配置了3个NS → 连接NS-2或NS-3

结论: 单个NS故障不影响系统运行
```

**场景2: 多数NameServer故障**

```
初始状态: NS-1, NS-2, NS-3 正常
故障: NS-1和NS-2宕机,只剩NS-3

影响:
- Broker向NS-3发送心跳 → NS-3有完整路由信息
- 客户端切换到NS-3 → 可以正常工作
- 但可用性降低,NS-3也故障则系统不可用

建议: 保持至少2个NS正常运行
```

**场景3: 所有NameServer故障**

```
初始状态: NS-1, NS-2, NS-3 正常
故障: 所有NS宕机

影响:
- Broker无法注册和发送心跳 → 但仍可处理消息
- 已启动的客户端使用本地缓存路由 → 短期内可正常工作
- 新启动的客户端无法获取路由 → 无法工作
- Broker故障或新增Broker → 客户端无法感知

结论: 已有客户端短期内可工作,但需尽快恢复NS
```

**(6) NameServer 高可用最佳实践**

```
部署建议:
1. 节点数量: 至少2个,推荐3个(奇数个)
2. 机器分布: 不同机器/机架/机房,避免单点
3. 网络: 低延迟网络,减少心跳延迟
4. 资源: NameServer资源消耗很低,1核2G足够

配置建议:
1. 客户端配置: 所有客户端配置全部NS地址
2. Broker配置: 向所有NS注册
3. 心跳间隔: 保持默认(30秒),不要过大
4. 超时时间: 保持默认(120秒),不要过小

监控建议:
1. 健康检查: 定期telnet NS端口检测存活
2. 注册数量: 监控NS上注册的Broker数量
3. 响应时间: 监控NS响应延迟
4. 告警: NS不可用立即告警
```

**监控脚本:**

```bash
#!/bin/bash
# check_nameserver.sh - NameServer健康检查

NAMESRV_ADDRS=(
    "192.168.1.10:9876"
    "192.168.1.11:9876"
    "192.168.1.12:9876"
)

for addr in "${NAMESRV_ADDRS[@]}"; do
    IFS=':' read -r host port <<< "$addr"

    # 检查端口是否可达
    if timeout 3 bash -c "echo > /dev/tcp/${host}/${port}" 2>/dev/null; then
        echo "[OK] NameServer ${addr} is alive"

        # 查询Broker列表
        broker_count=$(sh bin/mqadmin clusterList -n ${addr} 2>/dev/null | grep -c "broker")
        echo "     Registered Brokers: ${broker_count}"
    else
        echo "[FAIL] NameServer ${addr} is down"
        # 发送告警
        # curl -X POST https://alert.example.com/api/alert \
        #     -d "message=NameServer ${addr} is down"
    fi
done
```

**(7) NameServer vs Zookeeper**

| 对比项 | NameServer | Zookeeper |
|-------|-----------|-----------|
| **架构** | 无状态AP | 有状态CP |
| **一致性** | 最终一致 | 强一致 |
| **复杂度** | 简单 | 复杂 |
| **性能** | 高 | 中 |
| **可用性** | 高(单点故障不影响) | 中(需过半节点) |
| **部署** | 简单(直接启动) | 复杂(需配置集群) |
| **依赖** | 无外部依赖 | 无外部依赖 |
| **适用场景** | 注册中心 | 配置中心/协调服务 |

**为什么RocketMQ选择NameServer而非Zookeeper?**

```
1. CAP选择: RocketMQ选择AP(可用性+分区容错),ZK是CP(一致性+分区容错)
2. 简单性: NS无状态,部署运维简单,ZK需要配置集群
3. 性能: NS性能更高,无复杂的选举和同步逻辑
4. 依赖: 减少外部依赖,RocketMQ更加轻量
5. 场景: 路由信息不需要强一致性,最终一致即可
```

**关键要点:**

1. **无状态设计**: NameServer之间不通信,各自独立
2. **最终一致性**: Broker向所有NS注册,数据最终一致
3. **客户端容错**: 配置多NS,自动故障转移
4. **简单部署**: 无需选主,直接启动多个节点
5. **高可用**: 单点故障不影响系统运行
6. **建议节点数**: 至少2个,推荐3个
7. **故障恢复**: NS故障后,已启动客户端可短期继续工作

**记忆口诀:**

```
NameServer无状态
集群部署保高可
节点独立不通信
Broker注册发全部
客户端配多地址
随机连接自动切
心跳超时移失效
最终一致已足够
简单轻量易部署
高可用靠多副本
```

### 65. 如何避免单点故障？

**核心答案:**

避免单点故障(SPOF)的核心策略:
1. **冗余部署**: 所有组件多副本部署
2. **故障检测**: 心跳监控+自动切换
3. **数据复制**: 主从同步或Raft复制
4. **客户端容错**: 自动重试+故障转移
5. **监控告警**: 实时监控+快速响应

**详细说明:**

**(1) RocketMQ 单点故障分析**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 单点故障风险与防护</text>
<rect x="50" y="50" width="700" height="430" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="200" height="100" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="200" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">NameServer单点</text>
<text x="200" y="130" text-anchor="middle" font-size="9" fill="#424242">风险: 无法获取路由</text>
<text x="200" y="150" text-anchor="middle" font-size="9" fill="#2E7D32">✓ 方案: 集群部署</text>
<text x="200" y="165" text-anchor="middle" font-size="8" fill="#1976D2">至少2个节点</text>
<rect x="500" y="80" width="200" height="100" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="600" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">Broker Master单点</text>
<text x="600" y="130" text-anchor="middle" font-size="9" fill="#424242">风险: 无法写入消息</text>
<text x="600" y="150" text-anchor="middle" font-size="9" fill="#2E7D32">✓ 方案: 主从复制</text>
<text x="600" y="165" text-anchor="middle" font-size="8" fill="#1976D2">或Dledger集群</text>
<rect x="100" y="210" width="200" height="100" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="200" y="235" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">Broker Slave单点</text>
<text x="200" y="260" text-anchor="middle" font-size="9" fill="#424242">风险: 无法读取消息</text>
<text x="200" y="280" text-anchor="middle" font-size="9" fill="#2E7D32">✓ 方案: 多Slave副本</text>
<text x="200" y="295" text-anchor="middle" font-size="8" fill="#1976D2">读负载均衡</text>
<rect x="500" y="210" width="200" height="100" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="600" y="235" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">磁盘单点</text>
<text x="600" y="260" text-anchor="middle" font-size="9" fill="#424242">风险: 数据丢失</text>
<text x="600" y="280" text-anchor="middle" font-size="9" fill="#2E7D32">✓ 方案: RAID磁盘阵列</text>
<text x="600" y="295" text-anchor="middle" font-size="8" fill="#1976D2">或分布式存储</text>
<rect x="100" y="340" width="200" height="100" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="200" y="365" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">网络单点</text>
<text x="200" y="390" text-anchor="middle" font-size="9" fill="#424242">风险: 网络分区</text>
<text x="200" y="410" text-anchor="middle" font-size="9" fill="#2E7D32">✓ 方案: 多网卡绑定</text>
<text x="200" y="425" text-anchor="middle" font-size="8" fill="#1976D2">双网关配置</text>
<rect x="500" y="340" width="200" height="100" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="600" y="365" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">机房单点</text>
<text x="600" y="390" text-anchor="middle" font-size="9" fill="#424242">风险: 机房故障</text>
<text x="600" y="410" text-anchor="middle" font-size="9" fill="#2E7D32">✓ 方案: 异地多活</text>
<text x="600" y="425" text-anchor="middle" font-size="8" fill="#1976D2">跨机房部署</text>
</svg>

**(2) NameServer 避免单点**

```
部署策略:
1. 集群部署: 至少2个节点,推荐3个
2. 无状态: 节点故障不影响其他节点
3. 客户端配置: 配置所有NS地址,自动故障转移

示例配置:
# 生产环境NameServer集群
NameServer-1: 192.168.1.10:9876
NameServer-2: 192.168.1.11:9876
NameServer-3: 192.168.1.12:9876

# Broker配置
namesrvAddr=192.168.1.10:9876;192.168.1.11:9876;192.168.1.12:9876

# 客户端配置
producer.setNamesrvAddr("192.168.1.10:9876;192.168.1.11:9876;192.168.1.12:9876");
```

**NameServer故障容错:**

| 故障场景 | 影响 | 容错机制 |
|---------|------|----------|
| **单个NS故障** | 无影响 | 客户端自动切换到其他NS |
| **多数NS故障** | 部分影响 | 剩余NS继续提供服务 |
| **全部NS故障** | 新客户端无法启动 | 已启动客户端使用本地缓存 |

**(3) Broker Master 避免单点**

**方案1: 主从复制(传统方案)**

```bash
# Master配置 (broker-a.properties)
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0                    # Master的brokerId=0
deleteWhen=04
fileReservedTime=48
brokerRole=SYNC_MASTER        # 同步复制
flushDiskType=SYNC_FLUSH      # 同步刷盘
namesrvAddr=192.168.1.10:9876;192.168.1.11:9876

# Slave配置 (broker-a-s.properties)
brokerClusterName=DefaultCluster
brokerName=broker-a           # 与Master相同
brokerId=1                    # Slave的brokerId>0
deleteWhen=04
fileReservedTime=48
brokerRole=SLAVE              # Slave角色
namesrvAddr=192.168.1.10:9876;192.168.1.11:9876

# 启动Master
nohup sh bin/mqbroker -c conf/broker-a.properties &

# 启动Slave
nohup sh bin/mqbroker -c conf/broker-a-s.properties &
```

**主从复制的限制:**

```
1. 手动切换: Master故障后需手动提升Slave
2. 数据风险: 切换时可能丢失未同步数据
3. 运维复杂: 需要监控+人工介入
4. 不推荐: 生产环境建议使用Dledger
```

**方案2: Dledger集群(推荐方案)**

```bash
# Dledger节点1配置
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0
enableDLegerCommitLog=true
dLegerGroup=broker-a
dLegerPeers=n0-192.168.1.100:40911;n1-192.168.1.101:40911;n2-192.168.1.102:40911
dLegerSelfId=n0
namesrvAddr=192.168.1.10:9876;192.168.1.11:9876

# Dledger节点2配置
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0
enableDLegerCommitLog=true
dLegerGroup=broker-a
dLegerPeers=n0-192.168.1.100:40911;n1-192.168.1.101:40911;n2-192.168.1.102:40911
dLegerSelfId=n1
namesrvAddr=192.168.1.10:9876;192.168.1.11:9876

# Dledger节点3配置
brokerClusterName=DefaultCluster
brokerName=broker-a
brokerId=0
enableDLegerCommitLog=true
dLegerGroup=broker-a
dLegerPeers=n0-192.168.1.100:40911;n1-192.168.1.101:40911;n2-192.168.1.102:40911
dLegerSelfId=n2
namesrvAddr=192.168.1.10:9876;192.168.1.11:9876

# 启动3个节点
nohup sh bin/mqbroker -c conf/dledger/broker-n0.conf &
nohup sh bin/mqbroker -c conf/dledger/broker-n1.conf &
nohup sh bin/mqbroker -c conf/dledger/broker-n2.conf &
```

**Dledger优势:**

```
1. 自动切换: Master故障后自动选举新Leader
2. 数据安全: Raft协议保证数据不丢失
3. 运维简单: 无需人工介入
4. 高可用: 过半节点存活即可提供服务
```

**(4) 多 Broker 分片避免单点**

```
部署策略:
1. 多Broker: 不同Topic分布在不同Broker
2. 多Queue: 一个Topic多个Queue分布式存储
3. 负载均衡: Producer随机选择Queue

示例架构:
Topic: OrderTopic
├── Broker-A: Queue0, Queue1, Queue2, Queue3
└── Broker-B: Queue4, Queue5, Queue6, Queue7

单个Broker故障影响:
- Broker-A故障 → Queue0-3不可用
- Broker-B正常 → Queue4-7继续服务
- 影响范围: 50%的Queue不可用,但系统仍可运行
```

**配置示例:**

```java
// Producer自动负载均衡
public class MultiQueueProducer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("192.168.1.10:9876;192.168.1.11:9876");
        producer.start();

        // 创建Topic时指定多个Queue
        producer.createTopic("OrderTopic", 8); // 8个Queue

        // 发送消息,Producer自动选择Queue
        for (int i = 0; i < 100; i++) {
            Message msg = new Message("OrderTopic",
                ("Order-" + i).getBytes());
            SendResult result = producer.send(msg);
            System.out.println("发送到: " + result.getMessageQueue());
        }

        producer.shutdown();
    }
}

// Consumer自动负载均衡
public class MultiQueueConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("192.168.1.10:9876;192.168.1.11:9876");
        consumer.subscribe("OrderTopic", "*");

        // 多个Consumer实例自动分配Queue
        // 例如: 8个Queue,4个Consumer,每个Consumer消费2个Queue
        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    System.out.println("消费: " + new String(msg.getBody())
                        + ", Queue: " + msg.getQueueId());
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }
}
```

**(5) 磁盘避免单点**

**方案1: RAID磁盘阵列**

```bash
# RAID 10配置(推荐生产环境)
# 优点: 兼顾性能和冗余
# 缺点: 磁盘利用率50%

# 假设4块磁盘: /dev/sdb, /dev/sdc, /dev/sdd, /dev/sde

# 创建RAID 10
mdadm --create /dev/md0 --level=10 --raid-devices=4 \
    /dev/sdb /dev/sdc /dev/sdd /dev/sde

# 格式化
mkfs.ext4 /dev/md0

# 挂载
mount /dev/md0 /data/rocketmq

# 开机自动挂载
echo '/dev/md0 /data/rocketmq ext4 defaults 0 0' >> /etc/fstab

# 查看RAID状态
cat /proc/mdstat
```

**RAID级别对比:**

| RAID级别 | 最少磁盘 | 容错能力 | 磁盘利用率 | 性能 | 推荐场景 |
|---------|---------|---------|-----------|------|---------|
| **RAID 0** | 2 | 无 | 100% | 高 | 不推荐(无冗余) |
| **RAID 1** | 2 | 1块 | 50% | 读高写中 | 小规模部署 |
| **RAID 5** | 3 | 1块 | (n-1)/n | 读高写低 | 读多写少 |
| **RAID 10** | 4 | 2块 | 50% | 高 | 生产推荐 |

**方案2: 分布式文件系统**

```bash
# Ceph分布式存储
# 优点: 高可用+可扩展
# 缺点: 复杂度高

# 挂载Ceph RBD
rbd map rocketmq-pool/rocketmq-data
mkfs.ext4 /dev/rbd0
mount /dev/rbd0 /data/rocketmq
```

**(6) 网络避免单点**

**方案1: 网卡绑定(Bond)**

```bash
# /etc/sysconfig/network-scripts/ifcfg-bond0
DEVICE=bond0
TYPE=Bond
BONDING_MASTER=yes
BOOTPROTO=static
IPADDR=192.168.1.100
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
BONDING_OPTS="mode=1 miimon=100"  # mode=1为主备模式

# /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
TYPE=Ethernet
MASTER=bond0
SLAVE=yes

# /etc/sysconfig/network-scripts/ifcfg-eth1
DEVICE=eth1
TYPE=Ethernet
MASTER=bond0
SLAVE=yes

# 重启网络
systemctl restart network
```

**Bond模式对比:**

| 模式 | 说明 | 容错 | 负载均衡 |
|-----|------|------|---------|
| **mode=0** | 轮询 | 否 | 是 |
| **mode=1** | 主备 | 是 | 否 |
| **mode=4** | LACP | 是 | 是 |

**方案2: 双网关配置**

```bash
# 配置主网关
route add default gw 192.168.1.1

# 配置备用网关(metric值大)
route add default gw 192.168.1.2 metric 10

# 查看路由
route -n
```

**(7) 机房避免单点(异地多活)**

```
架构设计:
1. 同城双中心: 两个机房部署完整集群
2. 两地三中心: A城2机房+B城1机房
3. 跨城部署: 多个城市部署

部署方案:
机房A: NameServer-1, Broker-A(Master), Broker-B(Slave)
机房B: NameServer-2, Broker-B(Master), Broker-A(Slave)
机房C: NameServer-3 (仲裁节点)

故障容错:
- 机房A故障 → 机房B的Broker-B升级为Master
- 机房B故障 → 机房A的Broker-A继续服务
- 单机房故障不影响整体服务
```

**网络延迟考虑:**

```
同城双中心: 延迟<5ms,可同步复制
两地三中心: 延迟10-30ms,建议异步复制
跨城部署: 延迟>50ms,只能异步复制

配置建议:
同城: brokerRole=SYNC_MASTER
跨城: brokerRole=ASYNC_MASTER
```

**(8) 客户端容错机制**

```java
// Producer容错配置
public class FaultTolerantProducer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");

        // 配置多个NameServer
        producer.setNamesrvAddr("192.168.1.10:9876;192.168.1.11:9876;192.168.1.12:9876");

        // 发送超时(默认3000ms)
        producer.setSendMsgTimeout(5000);

        // 重试次数(同步发送默认2次,异步默认0次)
        producer.setRetryTimesWhenSendFailed(3);          // 同步重试
        producer.setRetryTimesWhenSendAsyncFailed(3);     // 异步重试

        // 是否在其他Broker重试(默认false)
        producer.setRetryAnotherBrokerWhenNotStoreOK(true);

        producer.start();

        Message msg = new Message("TestTopic", "Hello".getBytes());

        try {
            // 发送消息,失败自动重试
            SendResult result = producer.send(msg);
            System.out.println("发送成功: " + result.getSendStatus());
        } catch (Exception e) {
            System.err.println("发送失败: " + e.getMessage());
            // 可以存入数据库等待人工处理
        }

        producer.shutdown();
    }
}

// Consumer容错配置
public class FaultTolerantConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");

        // 配置多个NameServer
        consumer.setNamesrvAddr("192.168.1.10:9876;192.168.1.11:9876;192.168.1.12:9876");

        // 消费失败重试次数(默认16次)
        consumer.setMaxReconsumeTimes(16);

        // 消费超时(默认15分钟)
        consumer.setConsumeTimeout(15);

        consumer.subscribe("TestTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    try {
                        // 业务处理
                        processMessage(msg);

                    } catch (Exception e) {
                        System.err.println("消费失败: " + e.getMessage());
                        // 返回RECONSUME_LATER触发重试
                        return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                    }
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static void processMessage(MessageExt msg) throws Exception {
        // 业务逻辑
        System.out.println("处理消息: " + new String(msg.getBody()));
    }
}
```

**(9) 监控与告警**

```bash
#!/bin/bash
# monitor_cluster.sh - RocketMQ集群监控脚本

NAMESRV_ADDRS="192.168.1.10:9876;192.168.1.11:9876;192.168.1.12:9876"
ALERT_URL="https://alert.example.com/api/send"

# 检查NameServer
check_nameserver() {
    IFS=';' read -ra ADDRS <<< "$NAMESRV_ADDRS"
    alive_count=0

    for addr in "${ADDRS[@]}"; do
        IFS=':' read -r host port <<< "$addr"
        if timeout 3 bash -c "echo > /dev/tcp/${host}/${port}" 2>/dev/null; then
            alive_count=$((alive_count + 1))
        else
            send_alert "NameServer ${addr} is down"
        fi
    done

    if [ $alive_count -lt 2 ]; then
        send_alert "CRITICAL: Only ${alive_count} NameServer alive"
    fi
}

# 检查Broker
check_broker() {
    broker_list=$(sh bin/mqadmin clusterList -n ${NAMESRV_ADDRS} 2>/dev/null)

    # 检查是否有Master不可用
    if echo "$broker_list" | grep -q "OFFLINE"; then
        send_alert "Broker is OFFLINE"
    fi

    # 检查主从延迟
    master_offset=$(sh bin/mqadmin brokerStatus -n ${NAMESRV_ADDRS} -b broker-a | grep maxOffset)
    slave_offset=$(sh bin/mqadmin brokerStatus -n ${NAMESRV_ADDRS} -b broker-a:1 | grep maxOffset)

    # 如果主从差距>10000条消息则告警
    if [ $((master_offset - slave_offset)) -gt 10000 ]; then
        send_alert "Master-Slave replication lag is too high"
    fi
}

# 发送告警
send_alert() {
    message=$1
    curl -X POST "$ALERT_URL" \
        -H "Content-Type: application/json" \
        -d "{\"message\":\"$message\",\"level\":\"CRITICAL\"}"
}

# 执行监控
check_nameserver
check_broker
```

**(10) 避免单点故障最佳实践**

```
部署建议:
1. NameServer: 至少2个节点,推荐3个,分布在不同机器/机架
2. Broker: 使用Dledger模式,至少3个节点
3. 机房: 同城双中心或两地三中心
4. 磁盘: RAID 10或分布式存储
5. 网络: 双网卡绑定+双网关

配置建议:
1. 同步复制: 重要业务使用SYNC_MASTER
2. 同步刷盘: 重要业务使用SYNC_FLUSH
3. 超时配置: 合理设置sendMsgTimeout
4. 重试配置: 开启retryAnotherBrokerWhenNotStoreOK

监控建议:
1. 心跳监控: 实时监控所有节点存活状态
2. 延迟监控: 监控主从复制延迟
3. 队列监控: 监控消息积压情况
4. 告警配置: 关键节点故障立即告警

演练建议:
1. 故障演练: 定期模拟各种故障场景
2. 切换演练: 验证自动切换是否正常
3. 恢复演练: 验证故障恢复流程
4. 文档化: 编写详细的故障处理手册
```

**避免单点故障检查清单:**

| 检查项 | 检查内容 | 标准 |
|-------|---------|------|
| **NameServer** | 节点数量 | ≥2个 |
| **Broker** | 主从部署 | 每个Master至少1个Slave |
| **Dledger** | 集群节点 | 3个或5个节点 |
| **磁盘** | RAID级别 | RAID 10 |
| **网络** | 网卡绑定 | Bond模式 |
| **机房** | 跨机房部署 | 同城双中心 |
| **客户端** | NameServer配置 | 配置所有NS地址 |
| **监控** | 告警配置 | 关键节点告警 |

**关键要点:**

1. **冗余部署**: 所有组件多副本,消除单点
2. **自动切换**: Dledger自动故障转移
3. **数据复制**: 同步复制保证数据安全
4. **客户端容错**: 配置多NS+自动重试
5. **监控告警**: 实时监控+快速响应
6. **磁盘冗余**: RAID 10或分布式存储
7. **网络冗余**: 双网卡+双网关
8. **机房冗余**: 同城双中心或两地三中心

**记忆口诀:**

```
单点故障要避免
冗余部署是关键
NameServer集群化
Broker主从或Dledger
磁盘RAID保数据
网卡绑定防断网
机房双活异地容灾
客户端配多地址
自动重试加容错
监控告警快响应
定期演练验可用
文档完善助恢复
```



## 存储机制

### 66. RocketMQ 的消息存储结构是怎样的？

**核心答案:**

RocketMQ 消息存储采用**三层存储结构**:
1. **CommitLog**: 所有消息顺序写入的物理文件
2. **ConsumeQueue**: 消息逻辑队列,存储消息在CommitLog的索引
3. **IndexFile**: 消息索引文件,支持按Key查询

**详细说明:**

**(1) RocketMQ 存储整体架构**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 消息存储架构</text>
<rect x="50" y="50" width="700" height="480" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="400" y="80" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976D2">消息写入流程</text>
<rect x="100" y="100" width="600" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="125" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">Producer 发送消息</text>
<text x="400" y="145" text-anchor="middle" font-size="9" fill="#424242">Topic: OrderTopic, QueueId: 2, Body: "Order-12345"</text>
<path d="M 400 160 L 400 190" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue6)"/>
<rect x="100" y="195" width="600" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="220" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">CommitLog (顺序写)</text>
<text x="400" y="240" text-anchor="middle" font-size="9" fill="#424242">物理文件: 00000000000000000000</text>
<text x="400" y="258" text-anchor="middle" font-size="8" fill="#2E7D32">Offset: 1024, Size: 256 bytes</text>
<path d="M 200 275 L 200 305 M 400 275 L 400 305 M 600 275 L 600 305" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen6)"/>
<text x="400" y="295" text-anchor="middle" font-size="9" fill="#2E7D32">异步构建索引</text>
<rect x="100" y="310" width="250" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="225" y="335" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">ConsumeQueue (消费索引)</text>
<text x="225" y="355" text-anchor="middle" font-size="8" fill="#424242">Topic: OrderTopic</text>
<text x="225" y="370" text-anchor="middle" font-size="8" fill="#424242">QueueId: 2</text>
<text x="225" y="385" text-anchor="middle" font-size="7" fill="#616161">存储: offset=1024, size=256</text>
<rect x="450" y="310" width="250" height="80" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="575" y="335" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">IndexFile (Key索引)</text>
<text x="575" y="355" text-anchor="middle" font-size="8" fill="#424242">Key: ORDER_12345</text>
<text x="575" y="370" text-anchor="middle" font-size="8" fill="#424242">Hash: 0x1A2B3C4D</text>
<text x="575" y="385" text-anchor="middle" font-size="7" fill="#616161">指向: offset=1024</text>
<text x="400" y="415" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976D2">消息读取流程</text>
<rect x="100" y="430" width="250" height="60" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="225" y="455" text-anchor="middle" font-size="10" font-weight="bold" fill="#C2185B">Consumer 消费</text>
<text x="225" y="475" text-anchor="middle" font-size="8" fill="#424242">1. 查询ConsumeQueue获取offset</text>
<path d="M 350 460 L 450 460" stroke="#E91E63" stroke-width="2" marker-end="url(#arrowPink6)"/>
<rect x="450" y="430" width="250" height="60" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="575" y="455" text-anchor="middle" font-size="10" font-weight="bold" fill="#C62828">从CommitLog读取</text>
<text x="575" y="475" text-anchor="middle" font-size="8" fill="#424242">2. 根据offset读取完整消息</text>
<text x="400" y="510" text-anchor="middle" font-size="9" fill="#7F8C8D">磁盘路径: $HOME/store/</text>
<defs>
<marker id="arrowBlue6" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#2196F3"/>
</marker>
<marker id="arrowGreen6" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
<marker id="arrowPink6" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E91E63"/>
</marker>
</defs>
</svg>

**存储目录结构:**

```bash
$HOME/store/
├── commitlog/                    # CommitLog文件目录
│   ├── 00000000000000000000     # 第1个文件(1GB)
│   ├── 00000000001073741824     # 第2个文件(1GB)
│   └── 00000000002147483648     # 第3个文件(1GB)
├── consumequeue/                 # ConsumeQueue目录
│   ├── OrderTopic/              # Topic名称
│   │   ├── 0/                   # Queue 0
│   │   │   ├── 00000000000000000000
│   │   │   └── 00000000000006000000
│   │   ├── 1/                   # Queue 1
│   │   └── 2/                   # Queue 2
│   └── PaymentTopic/
│       └── 0/
├── index/                        # IndexFile目录
│   ├── 20231201000000000        # 索引文件(时间戳命名)
│   └── 20231202000000000
├── config/                       # 配置文件
│   ├── consumerOffset.json      # 消费进度
│   ├── topics.json              # Topic配置
│   └── subscriptionGroup.json   # 订阅组配置
├── checkpoint                    # 检查点文件
└── abort                         # 异常退出标识
```

**(2) CommitLog 详细结构**

```
CommitLog特点:
1. 顺序写: 所有Topic的消息顺序追加,不分Topic和Queue
2. 固定大小: 每个文件默认1GB
3. 文件命名: 使用起始offset命名
4. 高性能: 顺序IO,充分利用磁盘性能

CommitLog文件格式:
┌──────────────────────────────────────────┐
│ Message 1 (256 bytes)                    │
├──────────────────────────────────────────┤
│ Message 2 (512 bytes)                    │
├──────────────────────────────────────────┤
│ Message 3 (128 bytes)                    │
├──────────────────────────────────────────┤
│ ...                                      │
└──────────────────────────────────────────┘

单条消息格式:
┌────────────┬──────────┬──────────┬──────────┬──────────┐
│ TotalSize  │ MagicCode│ BodyCRC  │ QueueId  │ Flag     │
│ 4 bytes    │ 4 bytes  │ 4 bytes  │ 4 bytes  │ 4 bytes  │
├────────────┼──────────┼──────────┼──────────┼──────────┤
│ QueueOffset│BornTime  │BornHost  │StoreTime │StoreHost │
│ 8 bytes    │ 8 bytes  │ 8 bytes  │ 8 bytes  │ 8 bytes  │
├────────────┼──────────┼──────────┼──────────┼──────────┤
│ ReconsumeTi│BodyLen   │ Body     │TopicLen  │ Topic    │
│ 4 bytes    │ 4 bytes  │ N bytes  │ 1 byte   │ N bytes  │
├────────────┼──────────┼──────────┼──────────┼──────────┤
│PropsLength │Properties│                                 │
│ 2 bytes    │ N bytes  │                                 │
└────────────┴──────────┴─────────────────────────────────┘
```

**CommitLog写入示例:**

```java
// CommitLog写入源码简化版
public class CommitLog {
    private final MappedFileQueue mappedFileQueue;
    private static final int FILE_SIZE = 1024 * 1024 * 1024; // 1GB

    // 追加消息
    public AppendMessageResult appendMessage(MessageExtBrokerInner msg) {
        // 获取最后一个MappedFile
        MappedFile mappedFile = mappedFileQueue.getLastMappedFile();

        // 如果文件不存在或已满,创建新文件
        if (mappedFile == null || mappedFile.isFull()) {
            mappedFile = mappedFileQueue.getLastMappedFile(0);
        }

        // 编码消息
        ByteBuffer msgBuffer = encodeMessage(msg);

        // 写入文件
        return mappedFile.appendMessage(msgBuffer);
    }

    // 编码消息
    private ByteBuffer encodeMessage(MessageExtBrokerInner msg) {
        ByteBuffer buffer = ByteBuffer.allocate(msg.getTotalSize());

        // 写入消息头
        buffer.putInt(msg.getTotalSize());           // 总大小
        buffer.putInt(MESSAGE_MAGIC_CODE);           // 魔数
        buffer.putInt(msg.getBodyCRC());             // Body CRC
        buffer.putInt(msg.getQueueId());             // Queue ID
        buffer.putInt(msg.getFlag());                // Flag
        buffer.putLong(msg.getQueueOffset());        // Queue Offset
        buffer.putLong(msg.getBornTimestamp());      // 创建时间
        buffer.putLong(msg.getBornHost());           // 创建主机
        buffer.putLong(msg.getStoreTimestamp());     // 存储时间
        buffer.putLong(msg.getStoreHost());          // 存储主机

        // 写入Body
        buffer.putInt(msg.getBody().length);
        buffer.put(msg.getBody());

        // 写入Topic
        buffer.put((byte) msg.getTopic().length());
        buffer.put(msg.getTopic().getBytes());

        // 写入Properties
        String properties = msg.getPropertiesString();
        buffer.putShort((short) properties.length());
        buffer.put(properties.getBytes());

        return buffer;
    }
}
```

**(3) ConsumeQueue 详细结构**

```
ConsumeQueue特点:
1. 逻辑队列: 按Topic和QueueId组织
2. 固定格式: 每条记录20字节
3. 索引作用: 指向CommitLog中的消息位置
4. 高效查询: 可快速定位消息

ConsumeQueue文件格式:
每条记录固定20字节:
┌──────────────┬──────────┬──────────┐
│ CommitLog    │ Size     │ Tag Hash │
│ Offset       │          │ Code     │
│ 8 bytes      │ 4 bytes  │ 8 bytes  │
└──────────────┴──────────┴──────────┘

示例:
记录1: offset=0000, size=256, taghash=0x12345678
记录2: offset=0256, size=512, taghash=0xABCDEF00
记录3: offset=0768, size=128, taghash=0x87654321

文件命名: 起始offset
默认大小: 600万条 * 20字节 = 114MB左右
```

**ConsumeQueue构建示例:**

```java
// ConsumeQueue异步构建源码简化版
public class ConsumeQueue {
    private final MappedFileQueue mappedFileQueue;
    private static final int CQ_STORE_UNIT_SIZE = 20; // 固定20字节

    // 从CommitLog构建ConsumeQueue
    public void putMessagePositionInfo(
        long commitLogOffset,  // CommitLog offset
        int size,             // 消息大小
        long tagsCode,        // Tag Hash
        long queueOffset) {   // ConsumeQueue offset

        // 获取当前MappedFile
        MappedFile mappedFile = mappedFileQueue.getLastMappedFile(queueOffset);

        if (mappedFile != null) {
            // 编码20字节数据
            ByteBuffer buffer = ByteBuffer.allocate(CQ_STORE_UNIT_SIZE);
            buffer.putLong(commitLogOffset);  // 8字节
            buffer.putInt(size);              // 4字节
            buffer.putLong(tagsCode);         // 8字节

            // 写入文件
            mappedFile.appendMessage(buffer.array());
        }
    }

    // 根据ConsumeQueue offset查询消息位置
    public SelectMappedBufferResult getIndexBuffer(long queueOffset) {
        // 计算文件位置
        long offset = queueOffset * CQ_STORE_UNIT_SIZE;

        MappedFile mappedFile = mappedFileQueue.findMappedFileByOffset(offset);
        if (mappedFile != null) {
            // 读取20字节
            int pos = (int) (offset % mappedFile.getFileSize());
            return mappedFile.selectMappedBuffer(pos);
        }
        return null;
    }
}

// ReputMessageService: 异步构建ConsumeQueue和IndexFile
public class ReputMessageService extends ServiceThread {
    private long reputFromOffset = 0;

    @Override
    public void run() {
        while (!this.isStopped()) {
            try {
                Thread.sleep(1); // 1ms检查一次

                // 从CommitLog读取消息
                SelectMappedBufferResult result =
                    commitLog.getData(reputFromOffset);

                if (result != null) {
                    try {
                        // 遍历消息
                        for (int i = 0; i < result.getSize(); ) {
                            DispatchRequest request =
                                checkMessageAndReturnSize(result.getByteBuffer());

                            // 分发到ConsumeQueue
                            doDispatch(request);

                            // 分发到IndexFile
                            buildIndex(request);

                            i += request.getMsgSize();
                            reputFromOffset += request.getMsgSize();
                        }
                    } finally {
                        result.release();
                    }
                }
            } catch (Exception e) {
                log.error("ReputMessageService error", e);
            }
        }
    }

    private void doDispatch(DispatchRequest request) {
        // 构建ConsumeQueue
        ConsumeQueue cq = findConsumeQueue(
            request.getTopic(), request.getQueueId());

        cq.putMessagePositionInfo(
            request.getCommitLogOffset(),
            request.getMsgSize(),
            request.getTagsCode(),
            request.getConsumeQueueOffset());
    }
}
```

**(4) IndexFile 详细结构**

```
IndexFile特点:
1. Hash索引: 使用Hash表存储Key
2. 可选索引: 仅在设置了Key时创建
3. 时间范围: 每个文件覆盖一定时间范围
4. 快速查询: 支持按Key快速查找消息

IndexFile文件格式:
┌─────────────────────────────────────────┐
│ IndexHeader (40字节)                    │
│ - beginTimestamp  (8字节)               │
│ - endTimestamp    (8字节)               │
│ - beginPhyOffset  (8字节)               │
│ - endPhyOffset    (8字节)               │
│ - hashSlotCount   (4字节) 默认500万     │
│ - indexCount      (4字节) 最多2000万    │
├─────────────────────────────────────────┤
│ Hash Slot Table (500万 * 4字节 = 20MB) │
│ slot[0] = 100  (指向第100个index)       │
│ slot[1] = -1   (空)                     │
│ slot[2] = 200  (指向第200个index)       │
│ ...                                     │
├─────────────────────────────────────────┤
│ Index Linked List (2000万 * 20字节)    │
│ Index[0]: hashcode, phyoffset, timedif,│
│           prevIndex                     │
│ Index[1]: ...                           │
│ ...                                     │
└─────────────────────────────────────────┘

单个Index条目格式(20字节):
┌──────────┬──────────┬──────────┬──────────┐
│ KeyHash  │ PhyOffset│ TimeDiff │ PrevIndex│
│ 4 bytes  │ 8 bytes  │ 4 bytes  │ 4 bytes  │
└──────────┴──────────┴──────────┴──────────┘
```

**IndexFile构建与查询:**

```java
// IndexFile源码简化版
public class IndexFile {
    private static final int HASH_SLOT_NUM = 5000000;  // 500万
    private static final int INDEX_NUM = 20000000;     // 2000万
    private static final int INDEX_SIZE = 20;          // 20字节

    private final MappedFile mappedFile;
    private final ByteBuffer byteBuffer;

    // 添加索引
    public boolean putKey(String key, long phyOffset, long storeTimestamp) {
        // 计算hash slot
        int keyHash = indexKeyHashMethod(key);
        int slotPos = keyHash % HASH_SLOT_NUM;

        // 读取slot当前值
        int absSlotPos = IndexHeader.INDEX_HEADER_SIZE + slotPos * 4;
        int slotValue = byteBuffer.getInt(absSlotPos);

        // 计算时间差
        long timeDiff = storeTimestamp - this.indexHeader.getBeginTimestamp();

        // 计算新index位置
        int absIndexPos = IndexHeader.INDEX_HEADER_SIZE
            + HASH_SLOT_NUM * 4
            + this.indexHeader.getIndexCount() * INDEX_SIZE;

        // 写入index
        byteBuffer.putInt(absIndexPos, keyHash);              // 4字节
        byteBuffer.putLong(absIndexPos + 4, phyOffset);       // 8字节
        byteBuffer.putInt(absIndexPos + 12, (int) timeDiff); // 4字节
        byteBuffer.putInt(absIndexPos + 16, slotValue);       // 4字节(链表)

        // 更新slot指向新index
        byteBuffer.putInt(absSlotPos, this.indexHeader.getIndexCount());

        // 更新header
        this.indexHeader.incIndexCount();
        return true;
    }

    // 查询索引
    public void selectPhyOffset(List<Long> phyOffsets, String key,
                                int maxNum, long begin, long end) {
        // 计算hash slot
        int keyHash = indexKeyHashMethod(key);
        int slotPos = keyHash % HASH_SLOT_NUM;

        // 读取slot
        int absSlotPos = IndexHeader.INDEX_HEADER_SIZE + slotPos * 4;
        int slotValue = byteBuffer.getInt(absSlotPos);

        if (slotValue <= 0 || slotValue > this.indexHeader.getIndexCount()) {
            return; // 未找到
        }

        // 遍历链表
        for (int nextIndexToRead = slotValue; ; ) {
            if (phyOffsets.size() >= maxNum) {
                break;
            }

            // 读取index
            int absIndexPos = IndexHeader.INDEX_HEADER_SIZE
                + HASH_SLOT_NUM * 4
                + nextIndexToRead * INDEX_SIZE;

            int keyHashRead = byteBuffer.getInt(absIndexPos);
            long phyOffsetRead = byteBuffer.getLong(absIndexPos + 4);
            int timeDiff = byteBuffer.getInt(absIndexPos + 12);
            int prevIndex = byteBuffer.getInt(absIndexPos + 16);

            // 检查时间范围
            long storeTimestamp = this.indexHeader.getBeginTimestamp() + timeDiff;
            if (storeTimestamp >= begin && storeTimestamp <= end) {
                if (keyHash == keyHashRead) {
                    phyOffsets.add(phyOffsetRead);
                }
            }

            if (prevIndex <= 0) {
                break; // 链表结束
            }
            nextIndexToRead = prevIndex;
        }
    }

    private int indexKeyHashMethod(String key) {
        int keyHash = key.hashCode();
        int keyHashPositive = Math.abs(keyHash);
        if (keyHashPositive < 0)
            keyHashPositive = 0;
        return keyHashPositive;
    }
}
```

**(5) 存储文件大小与配置**

**默认配置:**

| 文件类型 | 默认大小 | 配置项 | 说明 |
|---------|---------|--------|------|
| **CommitLog** | 1GB | mapedFileSizeCommitLog | 单个文件大小 |
| **ConsumeQueue** | ~114MB | mapedFileSizeConsumeQueue | 600万条*20字节 |
| **IndexFile** | ~420MB | maxIndexNum=2000万 | Header+Slot+Index |

**配置示例:**

```properties
# broker.conf

# CommitLog文件大小(默认1GB)
mapedFileSizeCommitLog=1073741824

# ConsumeQueue文件大小(默认600万条)
mapedFileSizeConsumeQueue=6000000

# 磁盘使用率告警阈值
diskMaxUsedSpaceRatio=75

# 磁盘使用率拒绝阈值
diskSpaceWarningLevelRatio=90
diskSpaceCleanForciblyRatio=85

# 文件保留时间(小时,默认72小时)
fileReservedTime=72

# 删除文件时间点(默认凌晨4点)
deleteWhen=04

# 是否强制删除(磁盘满时,默认true)
cleanFileForciblyEnable=true
```

**(6) 存储性能优化**

**1. 内存映射文件(MappedFile)**

```java
// MappedFile实现
public class MappedFile {
    private RandomAccessFile file;
    private FileChannel fileChannel;
    private MappedByteBuffer mappedByteBuffer;

    public void init(String fileName, long fileSize) throws IOException {
        this.file = new RandomAccessFile(fileName, "rw");
        this.fileChannel = file.getChannel();

        // mmap内存映射
        this.mappedByteBuffer = fileChannel.map(
            FileChannel.MapMode.READ_WRITE, 0, fileSize);
    }

    // 追加消息
    public AppendMessageResult appendMessage(byte[] data) {
        int currentPos = this.wrotePosition.get();

        // 直接写入mappedByteBuffer
        this.mappedByteBuffer.position(currentPos);
        this.mappedByteBuffer.put(data);

        this.wrotePosition.addAndGet(data.length);
        return AppendMessageResult.SUCCESS;
    }
}
```

**2. 文件预热(Warmup)**

```java
// 文件预热避免缺页中断
public void warmMappedFile() {
    ByteBuffer byteBuffer = this.mappedByteBuffer.slice();
    int pages = mappedByteBuffer.capacity() / OS_PAGE_SIZE;

    for (int i = 0; i < pages; i++) {
        // 每隔4KB读取一次,触发OS将页面加载到内存
        byteBuffer.position(i * OS_PAGE_SIZE);
        byteBuffer.get();
    }

    // mlock锁定内存,防止被swap
    if (this.mlock) {
        mlock(address, size);
    }
}
```

**3. 刷盘策略**

```properties
# 同步刷盘(安全,性能低)
flushDiskType=SYNC_FLUSH

# 异步刷盘(快速,有丢失风险)
flushDiskType=ASYNC_FLUSH

# 异步刷盘间隔(默认500ms)
flushIntervalCommitLog=500

# 异步刷盘页数(默认4页)
flushCommitLogLeastPages=4
```

**刷盘对比:**

| 刷盘方式 | 性能 | 可靠性 | 适用场景 |
|---------|------|--------|---------|
| **SYNC_FLUSH** | 低(1000 TPS) | 高(不丢消息) | 金融/支付 |
| **ASYNC_FLUSH** | 高(10万+ TPS) | 中(可能丢消息) | 日志/监控 |

**(7) 存储监控与维护**

**监控指标:**

```bash
# 查看CommitLog大小
du -sh $HOME/store/commitlog/

# 查看ConsumeQueue大小
du -sh $HOME/store/consumequeue/

# 查看磁盘使用率
df -h

# 实时监控写入速度
watch -n 1 'ls -lh $HOME/store/commitlog/ | tail -1'
```

**清理策略:**

```
自动清理条件(满足任一):
1. 文件过期: 超过fileReservedTime(默认72小时)
2. 磁盘满: 使用率超过diskMaxUsedSpaceRatio(默认75%)
3. 手动清理: deleteWhen指定时间(默认04:00)

清理优先级:
1. 最旧的CommitLog文件
2. 对应的ConsumeQueue文件
3. 对应的IndexFile文件
```

**关键要点:**

1. **三层存储**: CommitLog(物理) + ConsumeQueue(逻辑) + IndexFile(索引)
2. **顺序写入**: CommitLog顺序追加,性能极高
3. **异步构建**: ConsumeQueue和IndexFile异步构建
4. **内存映射**: 使用mmap零拷贝技术
5. **固定格式**: ConsumeQueue每条20字节,查询高效
6. **Hash索引**: IndexFile支持按Key快速查询
7. **文件管理**: 固定大小文件,便于清理和管理
8. **刷盘策略**: 同步刷盘安全,异步刷盘快速

**记忆口诀:**

```
三层存储要记牢
CommitLog顺序写
所有消息都追加
不分Topic和Queue
ConsumeQueue做索引
指向CommitLog位置
固定20字节一条
查询消费都高效
IndexFile做Key查
Hash表加链表
快速定位某消息
mmap内存映射
零拷贝高性能
文件预热防缺页
异步刷盘追求快
同步刷盘保安全
```


### 67. 什么是 CommitLog、ConsumeQueue、IndexFile？

**核心答案:**

RocketMQ 三大存储文件:
1. **CommitLog**: 消息存储的物理文件,所有消息顺序写入
2. **ConsumeQueue**: 消息消费队列,存储消息在CommitLog中的索引信息
3. **IndexFile**: 消息索引文件,支持通过Key或时间快速查询消息

**详细说明:**

**(1) CommitLog - 消息物理存储**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">CommitLog 顺序写入机制</text>
<rect x="50" y="50" width="700" height="330" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="150" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="175" y="105" text-anchor="middle" font-size="10" fill="#1976D2">OrderTopic-Q0</text>
<text x="175" y="120" text-anchor="middle" font-size="8" fill="#424242">Msg: Order-001</text>
<rect x="325" y="80" width="150" height="50" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="400" y="105" text-anchor="middle" font-size="10" fill="#7B1FA2">PayTopic-Q1</text>
<text x="400" y="120" text-anchor="middle" font-size="8" fill="#424242">Msg: Pay-001</text>
<rect x="550" y="80" width="150" height="50" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="625" y="105" text-anchor="middle" font-size="10" fill="#2E7D32">OrderTopic-Q1</text>
<text x="625" y="120" text-anchor="middle" font-size="8" fill="#424242">Msg: Order-002</text>
<path d="M 175 130 L 400 170 M 400 130 L 400 170 M 625 130 L 400 170" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange7)"/>
<text x="400" y="160" text-anchor="middle" font-size="9" fill="#F57C00">所有消息顺序追加</text>
<rect x="100" y="180" width="600" height="180" fill="#FFF3E0" stroke="#FF9800" stroke-width="3" rx="5"/>
<text x="400" y="205" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">CommitLog (00000000000000000000)</text>
<rect x="120" y="220" width="160" height="50" fill="#FFEBEE" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="200" y="240" text-anchor="middle" font-size="8" fill="#424242">Order-001 (256B)</text>
<text x="200" y="255" text-anchor="middle" font-size="7" fill="#616161">Offset: 0</text>
<rect x="300" y="220" width="160" height="50" fill="#FCE4EC" stroke="#E91E63" stroke-width="1" rx="3"/>
<text x="380" y="240" text-anchor="middle" font-size="8" fill="#424242">Pay-001 (512B)</text>
<text x="380" y="255" text-anchor="middle" font-size="7" fill="#616161">Offset: 256</text>
<rect x="480" y="220" width="160" height="50" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="560" y="240" text-anchor="middle" font-size="8" fill="#424242">Order-002 (128B)</text>
<text x="560" y="255" text-anchor="middle" font-size="7" fill="#616161">Offset: 768</text>
<rect x="120" y="290" width="560" height="50" fill="#E0E0E0" stroke="#9E9E9E" stroke-width="1" stroke-dasharray="5,5" rx="3"/>
<text x="400" y="315" text-anchor="middle" font-size="9" fill="#616161">... 更多消息继续追加 ...</text>
<text x="400" y="330" text-anchor="middle" font-size="8" fill="#616161">文件大小: 1GB (达到后创建新文件)</text>
<defs>
<marker id="arrowOrange7" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#FF9800"/>
</marker>
</defs>
</svg>

**CommitLog核心特性:**

```
1. 顺序写入:
   - 所有Topic和Queue的消息混合顺序写入同一个文件
   - 不论消息属于哪个Topic/Queue,都按到达顺序追加
   - 充分利用磁盘顺序IO性能(比随机IO快100倍以上)

2. 固定大小:
   - 每个CommitLog文件默认1GB
   - 文件写满后自动创建新文件
   - 文件名为起始物理偏移量(20位,前面补0)

3. 文件命名:
   00000000000000000000  (第1个文件,offset: 0 ~ 1GB-1)
   00000000001073741824  (第2个文件,offset: 1GB ~ 2GB-1)
   00000000002147483648  (第3个文件,offset: 2GB ~ 3GB-1)

4. 消息格式:
   变长消息,每条消息包含完整的元数据和Body
```

**CommitLog消息结构详解:**

```
┌─────────────── 消息头(固定字段) ───────────────┐
│ TOTALSIZE        4字节   消息总长度            │
│ MAGICCODE        4字节   魔数(0xdaa320a7)     │
│ BODYCRC          4字节   Body的CRC32校验      │
│ QUEUEID          4字节   Queue ID             │
│ FLAG             4字节   消息标志位            │
│ QUEUEOFFSET      8字节   在ConsumeQueue中的位置│
│ PHYSICALOFFSET   8字节   在CommitLog中的位置   │
│ SYSFLAG          4字节   系统标志              │
│ BORNTIMESTAMP    8字节   消息创建时间          │
│ BORNHOST         8字节   创建消息的主机地址    │
│ STORETIMESTAMP   8字节   消息存储时间          │
│ STOREHOSTADDRESS 8字节   存储消息的Broker地址  │
│ RECONSUMETIMES   4字节   重试次数              │
│ PreparedTransactionOffset 8字节 事务消息偏移   │
├─────────────── 消息体(变长字段) ───────────────┤
│ BodyLength       4字节   Body长度              │
│ Body             N字节   消息内容              │
├─────────────── Topic (变长) ──────────────────┤
│ TopicLength      1字节   Topic名称长度         │
│ Topic            N字节   Topic名称             │
├─────────────── Properties (变长) ─────────────┤
│ PropertiesLength 2字节   属性长度              │
│ Properties       N字节   消息属性(Key=Value)   │
└───────────────────────────────────────────────┘

示例:
Topic: OrderTopic, Body: "Order-12345", Key: "ORDER_12345"
总大小: 约200-300字节(根据Topic名和属性长度变化)
```

**CommitLog读写示例:**

```java
// 写入CommitLog
public class CommitLogWriter {
    public static void writeMessage(CommitLog commitLog, MessageExtBrokerInner msg) {
        // 消息追加到CommitLog
        PutMessageResult result = commitLog.putMessage(msg);

        if (result.getPutMessageStatus() == PutMessageStatus.PUT_OK) {
            System.out.println("写入成功, Offset: " + result.getAppendMessageResult().getWroteOffset());
        }
    }
}

// 从CommitLog读取
public class CommitLogReader {
    public static MessageExt readMessage(CommitLog commitLog, long offset) {
        // 根据物理偏移量读取消息
        SelectMappedBufferResult result = commitLog.getMessage(offset, 4);

        if (result != null) {
            try {
                // 读取消息总长度
                int totalSize = result.getByteBuffer().getInt();

                // 读取完整消息
                SelectMappedBufferResult message = commitLog.getMessage(offset, totalSize);
                return MessageDecoder.decode(message.getByteBuffer());
            } finally {
                result.release();
            }
        }
        return null;
    }
}
```

**(2) ConsumeQueue - 消息逻辑队列**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">ConsumeQueue 索引结构</text>
<rect x="50" y="50" width="700" height="380" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="250" height="130" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="225" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">OrderTopic/Queue-0</text>
<rect x="120" y="120" width="190" height="25" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="215" y="137" text-anchor="middle" font-size="8" fill="#424242">offset=0, size=256, tag=0x12</text>
<rect x="120" y="150" width="190" height="25" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="215" y="167" text-anchor="middle" font-size="8" fill="#424242">offset=768, size=128, tag=0x34</text>
<rect x="120" y="180" width="190" height="25" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="215" y="197" text-anchor="middle" font-size="8" fill="#424242">offset=2048, size=256, tag=0x56</text>
<rect x="450" y="80" width="250" height="130" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="575" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">PayTopic/Queue-1</text>
<rect x="470" y="120" width="190" height="25" fill="#BBDEFB" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="565" y="137" text-anchor="middle" font-size="8" fill="#424242">offset=256, size=512, tag=0xAB</text>
<rect x="470" y="150" width="190" height="25" fill="#BBDEFB" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="565" y="167" text-anchor="middle" font-size="8" fill="#424242">offset=1024, size=256, tag=0xCD</text>
<rect x="470" y="180" width="190" height="25" fill="#BBDEFB" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="565" y="197" text-anchor="middle" font-size="8" fill="#424242">offset=1280, size=384, tag=0xEF</text>
<path d="M 225 210 L 400 250 M 575 210 L 400 250" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange8)"/>
<text x="400" y="240" text-anchor="middle" font-size="9" fill="#F57C00">指向CommitLog</text>
<rect x="150" y="260" width="500" height="150" fill="#FFF3E0" stroke="#FF9800" stroke-width="3" rx="5"/>
<text x="400" y="285" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">CommitLog</text>
<rect x="180" y="300" width="100" height="40" fill="#FFEBEE" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="230" y="323" text-anchor="middle" font-size="7" fill="#424242">Order-001 @0</text>
<rect x="290" y="300" width="100" height="40" fill="#FCE4EC" stroke="#E91E63" stroke-width="1" rx="3"/>
<text x="340" y="323" text-anchor="middle" font-size="7" fill="#424242">Pay-001 @256</text>
<rect x="400" y="300" width="100" height="40" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="450" y="323" text-anchor="middle" font-size="7" fill="#424242">Order-002 @768</text>
<rect x="510" y="300" width="100" height="40" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="560" y="323" text-anchor="middle" font-size="7" fill="#424242">Pay-002 @1024</text>
<rect x="180" y="350" width="440" height="40" fill="#E0E0E0" stroke="#9E9E9E" stroke-width="1" stroke-dasharray="5,5" rx="3"/>
<text x="400" y="373" text-anchor="middle" font-size="8" fill="#616161">... 更多消息 ...</text>
<defs>
<marker id="arrowOrange8" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#FF9800"/>
</marker>
</defs>
</svg>

**ConsumeQueue核心特性:**

```
1. 逻辑队列:
   - 按Topic和QueueId组织
   - 不存储消息本体,只存储指向CommitLog的索引
   - 目录结构: consumequeue/{topic}/{queueId}/{fileName}

2. 固定格式:
   - 每条索引固定20字节
   - CommitLog Offset(8字节) + Size(4字节) + Tag HashCode(8字节)
   - 便于快速定位和二分查找

3. 文件大小:
   - 默认存储600万条索引
   - 600万 × 20字节 ≈ 114MB
   - 文件名为起始逻辑偏移量

4. 异步构建:
   - ReputMessageService从CommitLog异步构建
   - 延迟通常小于1ms
```

**ConsumeQueue索引格式:**

```
每条索引20字节:
┌────────────────────────────────────────┐
│ Offset 1 | Size 1 | TagHash 1         │ 20字节
├────────────────────────────────────────┤
│ Offset 2 | Size 2 | TagHash 2         │ 20字节
├────────────────────────────────────────┤
│ Offset 3 | Size 3 | TagHash 3         │ 20字节
└────────────────────────────────────────┘

详细字段:
┌──────────────┬──────────┬──────────────┐
│ CommitLog    │ Msg Size │ Tag HashCode │
│ Offset       │          │              │
│ 8 bytes      │ 4 bytes  │ 8 bytes      │
└──────────────┴──────────┴──────────────┘

示例:
索引1: offset=0000000000, size=256, taghash=0x0000001234567890
索引2: offset=0000000256, size=512, taghash=0x00000000ABCDEF12
索引3: offset=0000000768, size=128, taghash=0x0000000087654321
```

**ConsumeQueue使用示例:**

```java
// Consumer通过ConsumeQueue消费消息
public class ConsumeQueueUsage {
    public static void consumeMessage(
        String topic, int queueId, long offset) {

        // 1. 找到对应的ConsumeQueue
        ConsumeQueue cq = findConsumeQueue(topic, queueId);

        // 2. 从ConsumeQueue读取索引(20字节)
        SelectMappedBufferResult bufferCQ = cq.getIndexBuffer(offset);

        if (bufferCQ != null) {
            try {
                // 3. 解析索引
                long commitLogOffset = bufferCQ.getByteBuffer().getLong();  // 8字节
                int size = bufferCQ.getByteBuffer().getInt();               // 4字节
                long tagsCode = bufferCQ.getByteBuffer().getLong();         // 8字节

                // 4. Tag过滤
                if (!matchTag(tagsCode, subscription)) {
                    return; // 跳过不匹配的消息
                }

                // 5. 从CommitLog读取完整消息
                SelectMappedBufferResult bufferCL =
                    commitLog.getMessage(commitLogOffset, size);

                if (bufferCL != null) {
                    try {
                        // 6. 解码消息
                        MessageExt msg = MessageDecoder.decode(
                            bufferCL.getByteBuffer());

                        // 7. 消费消息
                        consumeMessageDirectly(msg);
                    } finally {
                        bufferCL.release();
                    }
                }
            } finally {
                bufferCQ.release();
            }
        }
    }
}

// Tag过滤
public class TagFilter {
    // 在ConsumeQueue层面进行Tag Hash过滤
    public static boolean matchTag(long tagsCode, SubscriptionData sub) {
        if (sub.getCodeSet().isEmpty()) {
            return true; // 订阅所有
        }

        // Hash匹配(快速过滤,可能误判)
        if (sub.getCodeSet().contains((int) tagsCode)) {
            return true;
        }

        return false;
    }

    // 在CommitLog层面进行精确Tag过滤
    public static boolean matchTagExactly(MessageExt msg, SubscriptionData sub) {
        String tag = msg.getTags();
        return sub.getTagsSet().contains(tag);
    }
}
```

**(3) IndexFile - Key索引文件**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">IndexFile Hash索引结构</text>
<rect x="50" y="50" width="700" height="430" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="600" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">IndexHeader (40字节)</text>
<text x="400" y="125" text-anchor="middle" font-size="8" fill="#424242">beginTime, endTime, slotCount=500万, indexCount</text>
<rect x="100" y="160" width="600" height="110" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="185" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">Hash Slot Table (500万 × 4字节 = 20MB)</text>
<rect x="130" y="205" width="150" height="25" fill="#FFE0B2" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="205" y="222" text-anchor="middle" font-size="8" fill="#424242">Slot[0] = 100</text>
<rect x="325" y="205" width="150" height="25" fill="#FFE0B2" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="400" y="222" text-anchor="middle" font-size="8" fill="#424242">Slot[1] = -1 (空)</text>
<rect x="520" y="205" width="150" height="25" fill="#FFE0B2" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="595" y="222" text-anchor="middle" font-size="8" fill="#424242">Slot[2] = 200</text>
<text x="400" y="250" text-anchor="middle" font-size="8" fill="#616161">... 共500万个slot ...</text>
<rect x="100" y="290" width="600" height="170" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="400" y="315" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">Index Linked List (2000万 × 20字节 = 380MB)</text>
<rect x="130" y="335" width="200" height="50" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="230" y="355" text-anchor="middle" font-size="8" fill="#424242">Index[100]</text>
<text x="230" y="370" text-anchor="middle" font-size="7" fill="#616161">hash, offset, time, prev=-1</text>
<rect x="370" y="335" width="200" height="50" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="470" y="355" text-anchor="middle" font-size="8" fill="#424242">Index[101]</text>
<text x="470" y="370" text-anchor="middle" font-size="7" fill="#616161">hash, offset, time, prev=100</text>
<path d="M 370 360 L 330 360" stroke="#F44336" stroke-width="2" marker-end="url(#arrowRed8)"/>
<text x="350" y="355" text-anchor="middle" font-size="7" fill="#C62828">链表</text>
<rect x="130" y="400" width="200" height="50" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="230" y="420" text-anchor="middle" font-size="8" fill="#424242">Index[200]</text>
<text x="230" y="435" text-anchor="middle" font-size="7" fill="#616161">hash, offset, time, prev=-1</text>
<rect x="370" y="400" width="200" height="50" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="470" y="420" text-anchor="middle" font-size="8" fill="#424242">Index[201]</text>
<text x="470" y="435" text-anchor="middle" font-size="7" fill="#616161">hash, offset, time, prev=200</text>
<path d="M 370 425 L 330 425" stroke="#F44336" stroke-width="2" marker-end="url(#arrowRed8)"/>
<defs>
<marker id="arrowRed8" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#F44336"/>
</marker>
</defs>
</svg>

**IndexFile核心特性:**

```
1. Hash索引:
   - 使用Hash表 + 链表解决冲突
   - 500万个Hash Slot
   - 最多2000万条Index

2. 可选索引:
   - 只有设置了Key的消息才会建立索引
   - 不影响正常消费,仅用于Key查询

3. 时间范围:
   - 每个IndexFile覆盖一定时间范围
   - 文件名为创建时的时间戳
   - 便于按时间范围查询

4. 文件大小:
   - Header: 40字节
   - Hash Slot: 500万 × 4字节 = 20MB
   - Index: 2000万 × 20字节 = 380MB
   - 总计: 约400MB
```

**IndexFile查询流程:**

```
查询Key="ORDER_12345"的消息:

1. 计算Hash:
   keyHash = "ORDER_12345".hashCode()
   slotPos = Math.abs(keyHash) % 5000000

2. 读取Slot:
   slotValue = readInt(slotPos * 4)  // 读取4字节
   if (slotValue == -1) return;      // 未找到

3. 遍历链表:
   indexPos = slotValue
   while (indexPos != -1) {
       // 读取Index(20字节)
       keyHashRead = readInt(indexPos * 20)
       phyOffset = readLong(indexPos * 20 + 4)
       timeDiff = readInt(indexPos * 20 + 12)
       prevIndex = readInt(indexPos * 20 + 16)

       // 比对Hash
       if (keyHash == keyHashRead) {
           // 从CommitLog读取消息验证Key
           msg = commitLog.getMessage(phyOffset)
           if (msg.getKeys().equals("ORDER_12345")) {
               return msg;  // 找到
           }
       }

       indexPos = prevIndex;  // 继续链表
   }

4. 返回结果:
   如果遍历完链表仍未找到,则消息不存在
```

**IndexFile使用示例:**

```java
// 通过Key查询消息
public class IndexFileQuery {
    public static List<MessageExt> queryMessageByKey(
        String topic, String key, int maxNum, long begin, long end) {

        List<Long> phyOffsets = new ArrayList<>();

        // 1. 查找所有IndexFile
        List<IndexFile> indexFiles = findIndexFiles(begin, end);

        // 2. 从每个IndexFile查询
        for (IndexFile indexFile : indexFiles) {
            indexFile.selectPhyOffset(phyOffsets, key, maxNum, begin, end);

            if (phyOffsets.size() >= maxNum) {
                break;
            }
        }

        // 3. 根据物理偏移量读取消息
        List<MessageExt> messages = new ArrayList<>();
        for (Long phyOffset : phyOffsets) {
            MessageExt msg = commitLog.lookMessageByOffset(phyOffset);

            // 4. 精确匹配Key(Hash可能冲突)
            if (msg != null && key.equals(msg.getKeys())) {
                messages.add(msg);
            }
        }

        return messages;
    }
}

// mqadmin命令查询
public class QueryByKey {
    public static void main(String[] args) {
        // 通过Key查询消息
        // sh mqadmin queryMsgByKey -n 127.0.0.1:9876 -t OrderTopic -k ORDER_12345

        // 输出:
        // OffsetID: C0A8010A00002A9F0000000000000000
        // MessageId: C0A8010A00002A9F0000000000000000
        // Topic: OrderTopic
        // Key: ORDER_12345
        // Body: {"orderId":"12345","amount":100.0}
        // QueueId: 0
        // QueueOffset: 100
        // CommitLogOffset: 1024
        // BornTimestamp: 2023-12-01 10:00:00
        // StoreTimestamp: 2023-12-01 10:00:00
    }
}
```

**(4) 三者关系与配合**

```
写入流程:
┌──────────┐
│ Producer │ 发送消息
└─────┬────┘
      │
      ▼
┌──────────────────┐
│   CommitLog      │ 1. 消息写入(同步)
│ 顺序追加到文件    │
└─────┬────────────┘
      │
      ▼ (异步,1ms内)
┌──────────────────┬──────────────────┐
│  ConsumeQueue    │   IndexFile      │
│ 2. 构建消费索引   │ 3. 构建Key索引    │
│   (必须)         │   (可选)         │
└──────────────────┴──────────────────┘

读取流程:
┌──────────┐
│ Consumer │ 消费消息
└─────┬────┘
      │
      ▼
┌──────────────────┐
│  ConsumeQueue    │ 1. 查询消息索引
│ 获取CommitLog位置 │
└─────┬────────────┘
      │
      ▼
┌──────────────────┐
│   CommitLog      │ 2. 读取完整消息
│ 返回消息内容      │
└──────────────────┘

Key查询流程:
┌──────────┐
│  Admin   │ 按Key查询
└─────┬────┘
      │
      ▼
┌──────────────────┐
│   IndexFile      │ 1. Hash查找Key
│ 获取CommitLog位置 │
└─────┬────────────┘
      │
      ▼
┌──────────────────┐
│   CommitLog      │ 2. 读取消息验证
│ 返回匹配的消息    │
└──────────────────┘
```

**三者对比:**

| 文件类型 | 作用 | 必需性 | 大小 | 格式 | 查询方式 |
|---------|------|--------|------|------|---------|
| **CommitLog** | 存储消息 | 必需 | 1GB/文件 | 变长 | 按offset |
| **ConsumeQueue** | 消费索引 | 必需 | ~114MB/文件 | 固定20字节 | 按逻辑offset |
| **IndexFile** | Key索引 | 可选 | ~400MB/文件 | 固定20字节 | 按Key Hash |

**关键要点:**

1. **CommitLog**: 消息物理存储,顺序写入,所有Topic混合
2. **ConsumeQueue**: 逻辑队列索引,固定20字节,快速定位
3. **IndexFile**: Key索引,Hash表+链表,支持Key查询
4. **异步构建**: ConsumeQueue和IndexFile异步构建,延迟<1ms
5. **读写分离**: 写入CommitLog,读取走ConsumeQueue
6. **Tag过滤**: ConsumeQueue存储Tag Hash,快速过滤
7. **可选索引**: IndexFile仅在有Key时创建
8. **文件管理**: 固定大小文件,便于清理

**记忆口诀:**

```
CommitLog是仓库
所有消息顺序存
不分Topic不分Queue
物理偏移来定位
ConsumeQueue是目录
指向CommitLog位置
固定20字节一条
逻辑偏移快查询
IndexFile是索引
Hash表加链表
按Key快速查
可选非必需
写入走CommitLog
顺序追加性能高
读取走ConsumeQueue
索引定位消息快
三者配合效率高
RocketMQ存储妙
```


### 68. RocketMQ 为什么这么快？

**核心答案:**

RocketMQ 高性能的核心原因:
1. **顺序写入**: CommitLog顺序追加,充分利用磁盘性能
2. **零拷贝**: mmap内存映射 + sendfile,减少数据拷贝
3. **页缓存**: 利用OS页缓存,读写都在内存
4. **异步刷盘**: 异步写磁盘,不阻塞消息写入
5. **批量操作**: 批量发送/批量拉取,减少网络开销

**详细说明:**

**(1) 顺序写入 vs 随机写入**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">顺序IO vs 随机IO性能对比</text>
<rect x="50" y="50" width="700" height="330" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="280" height="140" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="240" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">随机写入 (传统MQ)</text>
<rect x="130" y="120" width="60" height="30" fill="#EF9A9A" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="160" y="140" text-anchor="middle" font-size="8" fill="#424242">Queue1</text>
<rect x="210" y="120" width="60" height="30" fill="#EF9A9A" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="240" y="140" text-anchor="middle" font-size="8" fill="#424242">Queue2</text>
<rect x="290" y="120" width="60" height="30" fill="#EF9A9A" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="320" y="140" text-anchor="middle" font-size="8" fill="#424242">Queue3</text>
<path d="M 160 150 L 160 170 M 240 150 L 240 170 M 320 150 L 320 170" stroke="#F44336" stroke-width="2" stroke-dasharray="5,5"/>
<text x="240" y="190" text-anchor="middle" font-size="9" fill="#C62828">磁盘随机写入(多个文件)</text>
<text x="240" y="210" text-anchor="middle" font-size="10" font-weight="bold" fill="#D32F2F">性能: ~100 IOPS</text>
<rect x="420" y="80" width="280" height="140" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="560" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">顺序写入 (RocketMQ)</text>
<rect x="450" y="120" width="200" height="80" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2" rx="3"/>
<text x="550" y="145" text-anchor="middle" font-size="9" fill="#424242">CommitLog</text>
<text x="550" y="165" text-anchor="middle" font-size="8" fill="#424242">Q1→Q2→Q3→Q1→...</text>
<text x="550" y="185" text-anchor="middle" font-size="7" fill="#616161">顺序追加</text>
<text x="560" y="210" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">性能: ~3000+ IOPS</text>
<rect x="100" y="240" width="600" height="120" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="265" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">性能对比</text>
<rect x="130" y="280" width="250" height="30" fill="#FFCDD2" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="255" y="300" text-anchor="middle" font-size="9" fill="#424242">随机写: 100 IOPS (1x)</text>
<rect x="130" y="320" width="250" height="30" fill="#A5D6A7" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="255" y="340" text-anchor="middle" font-size="9" fill="#424242">顺序写: 3000+ IOPS (30x+)</text>
<rect x="420" y="280" width="250" height="70" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="3"/>
<text x="545" y="305" text-anchor="middle" font-size="9" font-weight="bold" fill="#F57C00">顺序写 ≈ 内存随机写</text>
<text x="545" y="325" text-anchor="middle" font-size="8" fill="#424242">SSD顺序写: 500MB/s</text>
<text x="545" y="340" text-anchor="middle" font-size="8" fill="#424242">HDD顺序写: 100MB/s</text>
</svg>

**顺序写入优势:**

```
磁盘IO性能对比:
┌──────────────┬──────────┬──────────────┐
│ 操作类型      │ IOPS     │ 吞吐量       │
├──────────────┼──────────┼──────────────┤
│ HDD随机读    │ 100      │ ~1MB/s       │
│ HDD随机写    │ 100      │ ~1MB/s       │
│ HDD顺序读    │ -        │ 100-200MB/s  │
│ HDD顺序写    │ -        │ 100-200MB/s  │
├──────────────┼──────────┼──────────────┤
│ SSD随机读    │ 10K-100K │ 200-500MB/s  │
│ SSD随机写    │ 10K-100K │ 200-500MB/s  │
│ SSD顺序读    │ -        │ 500-3000MB/s │
│ SSD顺序写    │ -        │ 500-3000MB/s │
└──────────────┴──────────┴──────────────┘

关键结论:
1. 顺序写比随机写快10-100倍
2. HDD顺序写(100MB/s) > SSD随机写(50MB/s)
3. RocketMQ顺序写CommitLog充分利用磁盘性能
```

**CommitLog顺序写入实现:**

```java
// CommitLog顺序写入
public class CommitLog {
    private final MappedFileQueue mappedFileQueue;

    // 所有消息追加到同一个文件
    public PutMessageResult putMessage(MessageExtBrokerInner msg) {
        // 1. 获取最后一个MappedFile
        MappedFile mappedFile = this.mappedFileQueue.getLastMappedFile();

        // 2. 如果文件不存在或已满,创建新文件
        if (null == mappedFile || mappedFile.isFull()) {
            mappedFile = this.mappedFileQueue.getLastMappedFile(0);
        }

        // 3. 顺序追加消息
        result = mappedFile.appendMessage(msg, this.appendMessageCallback);

        // 4. 更新写入位置(原子操作)
        this.mappedFileQueue.flush(0);

        return result;
    }
}

// 性能测试
public class SequentialWritePerf {
    public static void main(String[] args) throws Exception {
        int messageCount = 100000;
        int messageSize = 1024; // 1KB

        // 顺序写入测试
        long start = System.currentTimeMillis();
        for (int i = 0; i < messageCount; i++) {
            commitLog.putMessage(createMessage(messageSize));
        }
        long end = System.currentTimeMillis();

        // 统计
        long cost = end - start;
        long tps = messageCount * 1000L / cost;
        long throughput = messageCount * messageSize / cost / 1024; // MB/s

        System.out.println("消息数量: " + messageCount);
        System.out.println("耗时: " + cost + "ms");
        System.out.println("TPS: " + tps);
        System.out.println("吞吐量: " + throughput + " MB/s");

        // 输出示例:
        // 消息数量: 100000
        // 耗时: 2000ms
        // TPS: 50000
        // 吞吐量: 50 MB/s
    }
}
```

**(2) 零拷贝技术**

**传统IO vs 零拷贝:**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">传统IO vs 零拷贝</text>
<rect x="50" y="50" width="330" height="180" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="215" y="75" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">传统IO (4次拷贝)</text>
<rect x="80" y="90" width="120" height="30" fill="#FFCDD2" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="140" y="110" text-anchor="middle" font-size="9" fill="#424242">1. DMA→内核缓冲</text>
<rect x="230" y="90" width="120" height="30" fill="#FFCDD2" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="290" y="110" text-anchor="middle" font-size="9" fill="#424242">2. 内核→用户缓冲</text>
<rect x="80" y="130" width="120" height="30" fill="#FFCDD2" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="140" y="150" text-anchor="middle" font-size="9" fill="#424242">3. 用户→Socket缓冲</text>
<rect x="230" y="130" width="120" height="30" fill="#FFCDD2" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="290" y="150" text-anchor="middle" font-size="9" fill="#424242">4. Socket→网卡</text>
<text x="215" y="180" text-anchor="middle" font-size="9" fill="#C62828">4次拷贝 + 4次上下文切换</text>
<text x="215" y="200" text-anchor="middle" font-size="10" font-weight="bold" fill="#D32F2F">CPU占用高</text>
<rect x="420" y="50" width="330" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="585" y="75" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">零拷贝 (2次拷贝)</text>
<rect x="450" y="90" width="250" height="30" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="575" y="110" text-anchor="middle" font-size="9" fill="#424242">1. DMA→内核缓冲</text>
<rect x="450" y="130" width="250" height="30" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="575" y="150" text-anchor="middle" font-size="9" fill="#424242">2. 内核缓冲→网卡 (DMA)</text>
<text x="585" y="180" text-anchor="middle" font-size="9" fill="#2E7D32">2次拷贝 + 2次上下文切换</text>
<text x="585" y="200" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">CPU占用低</text>
<rect x="50" y="250" width="700" height="180" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="275" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">RocketMQ 零拷贝实现</text>
<rect x="100" y="295" width="300" height="60" fill="#BBDEFB" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="250" y="315" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">mmap (写入)</text>
<text x="250" y="335" text-anchor="middle" font-size="8" fill="#424242">内存映射,用户态直接操作内核缓冲</text>
<rect x="450" y="295" width="300" height="60" fill="#BBDEFB" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="600" y="315" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">sendfile (读取)</text>
<text x="600" y="335" text-anchor="middle" font-size="8" fill="#424242">直接从内核缓冲发送到网卡</text>
<rect x="100" y="370" width="600" height="45" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="3"/>
<text x="400" y="390" text-anchor="middle" font-size="10" font-weight="bold" fill="#F57C00">性能提升: 减少50%拷贝次数</text>
<text x="400" y="408" text-anchor="middle" font-size="9" fill="#424242">TPS提升20-30%, CPU使用率降低30-50%</text>
</svg>

**mmap 内存映射实现:**

```java
// MappedFile: 使用mmap映射文件
public class MappedFile {
    private FileChannel fileChannel;
    private MappedByteBuffer mappedByteBuffer;

    public void init(String fileName, int fileSize) throws IOException {
        File file = new File(fileName);
        this.fileChannel = new RandomAccessFile(file, "rw").getChannel();

        // mmap内存映射
        this.mappedByteBuffer = this.fileChannel.map(
            FileChannel.MapMode.READ_WRITE,
            0,
            fileSize
        );
    }

    // 写入消息
    public boolean appendMessage(byte[] data) {
        int currentPos = this.wrotePosition.get();

        // 直接写入mappedByteBuffer(零拷贝)
        // 不需要先写入用户态buffer再拷贝到内核态
        this.mappedByteBuffer.position(currentPos);
        this.mappedByteBuffer.put(data);

        this.wrotePosition.addAndGet(data.length);
        return true;
    }

    // 读取消息
    public SelectMappedBufferResult selectMappedBuffer(int pos, int size) {
        // 直接从mappedByteBuffer读取(零拷贝)
        ByteBuffer byteBuffer = this.mappedByteBuffer.slice();
        byteBuffer.position(pos);
        ByteBuffer byteBufferNew = byteBuffer.slice();
        byteBufferNew.limit(size);

        return new SelectMappedBufferResult(
            pos, byteBufferNew, size, this);
    }
}
```

**sendfile 零拷贝发送:**

```java
// TransferMsgByHeap vs TransferMsgByZeroCopy
public class HAConnection {
    private SocketChannel socketChannel;
    private SelectMappedBufferResult selectMappedBufferResult;

    // 传统方式: 拷贝到用户态buffer再发送
    private boolean transferMsgByHeap() throws IOException {
        ByteBuffer byteBuffer = selectMappedBufferResult.getByteBuffer();

        // 从MappedByteBuffer拷贝到HeapByteBuffer
        byte[] data = new byte[byteBuffer.remaining()];
        byteBuffer.get(data);

        // 从HeapByteBuffer写入Socket
        this.socketChannel.write(ByteBuffer.wrap(data));
        return true;
    }

    // 零拷贝方式: 直接从PageCache发送
    private boolean transferMsgByZeroCopy() throws IOException {
        // 使用FileChannel.transferTo (底层使用sendfile系统调用)
        long transferCount = this.fileChannel.transferTo(
            this.selectMappedBufferResult.getStartOffset(),
            this.selectMappedBufferResult.getSize(),
            this.socketChannel
        );

        return transferCount == this.selectMappedBufferResult.getSize();
    }
}

// 配置项
public class BrokerConfig {
    // 是否使用零拷贝(默认true)
    private boolean transferMsgByHeap = false;
}
```

**(3) 页缓存 (PageCache)**

```
PageCache工作原理:
┌─────────────────────────────────────┐
│          用户进程                    │
└──────────────┬──────────────────────┘
               │ read/write
               ▼
┌─────────────────────────────────────┐
│          PageCache (内存)            │
│  ┌─────┬─────┬─────┬─────┬─────┐   │
│  │ P1  │ P2  │ P3  │ P4  │ P5  │   │
│  └─────┴─────┴─────┴─────┴─────┘   │
└──────────────┬──────────────────────┘
               │ 异步刷盘
               ▼
┌─────────────────────────────────────┐
│          磁盘文件                    │
└─────────────────────────────────────┘

优势:
1. 读操作: 先查PageCache,命中则直接返回(无磁盘IO)
2. 写操作: 先写PageCache,异步刷盘(不阻塞)
3. 预读: OS自动预读后续页面到PageCache
4. 合并写: 多次写入合并后批量刷盘

RocketMQ利用PageCache:
1. 消息写入: Producer → PageCache → 异步刷盘
2. 消息读取: Consumer → PageCache (热数据命中率高)
3. 内存级性能: PageCache命中时,性能接近内存操作
```

**PageCache配置与监控:**

```bash
# 查看PageCache大小
free -h
#               total        used        free      shared  buff/cache   available
# Mem:           16Gi       2.0Gi       1.0Gi       100Mi        13Gi        14Gi
#                                                              ↑ PageCache

# 查看文件占用的PageCache
# Linux: pcstat工具
pcstat $HOME/store/commitlog/*

# 示例输出:
# |-------------------------------------------------+----------------+------------+-----------+---------|
# | Name                                            | Size (bytes)   | Pages      | Cached    | Percent |
# |-------------------------------------------------+----------------+------------+-----------+---------|
# | /home/rocketmq/store/commitlog/00000000000000000000 | 1073741824 | 262144 | 262144    | 100.0%  |
# |-------------------------------------------------+----------------+------------+-----------+---------|

# 手动清理PageCache (测试用,生产不要执行)
echo 3 > /proc/sys/vm/drop_caches

# PageCache配置优化
vi /etc/sysctl.conf
# 脏页比例(默认10%)
vm.dirty_ratio = 10
# 脏页后台刷新比例(默认5%)
vm.dirty_background_ratio = 5
# 脏页刷新间隔(毫秒,默认500ms)
vm.dirty_writeback_centisecs = 500
```

**(4) 异步刷盘**

**同步刷盘 vs 异步刷盘:**

```
同步刷盘流程:
Producer → Broker → CommitLog → PageCache → 强制刷盘(fsync) → 返回成功
                                           ↑ 阻塞等待(10ms+)

异步刷盘流程:
Producer → Broker → CommitLog → PageCache → 立即返回成功
                                           ↓ 后台异步刷盘(500ms)
                                          磁盘

性能对比:
┌──────────┬──────────┬──────────┬──────────┐
│ 刷盘方式  │ TPS      │ 延迟     │ 可靠性    │
├──────────┼──────────┼──────────┼──────────┤
│ 同步刷盘  │ ~1000    │ 10-50ms  │ 高(不丢) │
│ 异步刷盘  │ 10万+    │ 1-5ms    │ 中(可能丢)│
└──────────┴──────────┴──────────┴──────────┘
```

**异步刷盘实现:**

```java
// FlushRealTimeService: 实时刷盘服务
public class FlushRealTimeService extends FlushCommitLogService {
    private static final int RETRY_TIMES_OVER = 10;
    private long lastFlushTimestamp = 0;

    @Override
    public void run() {
        while (!this.isStopped()) {
            // 刷盘间隔(默认500ms)
            boolean flushCommitLogTimed =
                CommitLog.this.defaultMessageStore
                    .getMessageStoreConfig().isFlushCommitLogTimed();

            int interval = CommitLog.this.defaultMessageStore
                .getMessageStoreConfig().getFlushIntervalCommitLog();

            // 最少刷盘页数(默认4页,16KB)
            int flushPhysicQueueLeastPages = CommitLog.this.defaultMessageStore
                .getMessageStoreConfig().getFlushCommitLogLeastPages();

            // 刷盘超时时间(默认10秒)
            int flushPhysicQueueThoroughInterval = CommitLog.this.defaultMessageStore
                .getMessageStoreConfig().getFlushCommitLogThoroughInterval();

            long currentTimeMillis = System.currentTimeMillis();
            if (currentTimeMillis >= (this.lastFlushTimestamp +
                flushPhysicQueueThoroughInterval)) {
                this.lastFlushTimestamp = currentTimeMillis;
                flushPhysicQueueLeastPages = 0;
            }

            try {
                if (flushCommitLogTimed) {
                    Thread.sleep(interval);
                } else {
                    this.waitForRunning(interval);
                }

                // 执行刷盘
                long begin = System.currentTimeMillis();
                CommitLog.this.mappedFileQueue.flush(flushPhysicQueueLeastPages);
                long storeTimestamp = CommitLog.this.mappedFileQueue
                    .getStoreTimestamp();

                // 更新检查点
                if (storeTimestamp > 0) {
                    CommitLog.this.defaultMessageStore
                        .getStoreCheckpoint().setPhysicMsgTimestamp(storeTimestamp);
                }

                long past = System.currentTimeMillis() - begin;
                if (past > 500) {
                    log.info("Flush data to disk costs {} ms", past);
                }
            } catch (Throwable e) {
                log.warn("FlushRealTimeService error", e);
            }
        }
    }
}

// 刷盘配置
public class MessageStoreConfig {
    // 刷盘类型(默认异步)
    private FlushDiskType flushDiskType = FlushDiskType.ASYNC_FLUSH;

    // 刷盘间隔(毫秒,默认500ms)
    private int flushIntervalCommitLog = 500;

    // 最少刷盘页数(默认4页=16KB)
    private int flushCommitLogLeastPages = 4;

    // 强制刷盘间隔(毫秒,默认10秒)
    private int flushCommitLogThoroughInterval = 1000 * 10;
}
```

**(5) 批量操作**

**批量发送:**

```java
// Producer批量发送
public class BatchProducer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("BatchProducerGroup");
        producer.setNamesrvAddr("127.0.0.1:9876");
        producer.start();

        // 批量发送(一次网络请求发送多条消息)
        List<Message> messages = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            messages.add(new Message("BatchTopic",
                ("Batch-" + i).getBytes()));
        }

        // 单次批量发送(注意:批量总大小不能超过4MB)
        SendResult sendResult = producer.send(messages);

        System.out.println("批量发送成功: " + sendResult.getMsgId());

        producer.shutdown();
    }
}

// 批量拆分(超过4MB时)
public class MessageSplitter implements Iterator<List<Message>> {
    private final int SIZE_LIMIT = 4 * 1024 * 1024; // 4MB
    private final List<Message> messages;
    private int currIndex;

    public MessageSplitter(List<Message> messages) {
        this.messages = messages;
    }

    @Override
    public List<Message> next() {
        int nextIndex = currIndex;
        int totalSize = 0;

        for (; nextIndex < messages.size(); nextIndex++) {
            Message message = messages.get(nextIndex);
            int tmpSize = message.getTopic().length() + message.getBody().length;

            if (tmpSize > SIZE_LIMIT) {
                throw new RuntimeException("单条消息超过4MB");
            }

            if (tmpSize + totalSize > SIZE_LIMIT) {
                break;
            }

            totalSize += tmpSize;
        }

        List<Message> subList = messages.subList(currIndex, nextIndex);
        currIndex = nextIndex;
        return subList;
    }
}
```

**批量拉取:**

```java
// Consumer批量拉取
public class BatchConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("BatchConsumerGroup");
        consumer.setNamesrvAddr("127.0.0.1:9876");

        // 批量拉取大小(默认32条)
        consumer.setPullBatchSize(32);

        // 批量消费大小(默认1条)
        consumer.setConsumeMessageBatchMaxSize(10);

        consumer.subscribe("BatchTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {

                // 批量消费(一次处理多条消息)
                System.out.println("批量消费: " + msgs.size() + "条");
                for (MessageExt msg : msgs) {
                    System.out.println(new String(msg.getBody()));
                }

                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }
}

// 批量拉取配置
public class ConsumerConfig {
    // 单次拉取最大消息数(默认32)
    private int pullBatchSize = 32;

    // 单次消费最大消息数(默认1)
    private int consumeMessageBatchMaxSize = 1;

    // 拉取间隔(毫秒,默认0-立即拉取)
    private long pullInterval = 0;
}
```

**(6) 其他性能优化**

**1. 文件预热**

```java
// 文件预热,避免缺页中断
public void warmMappedFile(ByteBuffer byteBuffer, long size) {
    long beginTime = System.currentTimeMillis();

    // 每隔4KB触发一次缺页中断,将页面加载到内存
    for (long i = 0, j = 0; i < size; i += 4096, j++) {
        byteBuffer.put((int) i, (byte) 0);
    }

    // mlock锁定内存,防止被swap出去
    if (this.isLockMemory()) {
        mlock(address, size);
    }

    log.info("warmMappedFile cost: {} ms",
        System.currentTimeMillis() - beginTime);
}
```

**2. 内存预分配**

```bash
# 预分配CommitLog文件
# 默认在创建新文件时,后台线程预分配下一个文件

# AllocateMappedFileService
# 异步预分配,避免写入时等待
```

**3. 文件预读**

```properties
# 开启内核预读
madvise(addr, length, MADV_WILLNEED);

# RocketMQ配置
# 默认开启预读
warmMapedFileEnable=true
```

**性能测试结果:**

```
测试环境:
- CPU: 8核
- 内存: 16GB
- 磁盘: SSD 500GB
- 消息大小: 1KB

测试结果:
┌──────────────┬──────────┬──────────┬──────────┐
│ 场景          │ TPS      │ 延迟(P99)│ CPU使用率 │
├──────────────┼──────────┼──────────┼──────────┤
│ 同步刷盘      │ 1000     │ 50ms     │ 30%      │
│ 异步刷盘      │ 100000   │ 2ms      │ 60%      │
│ 批量发送(100) │ 200000   │ 1ms      │ 50%      │
└──────────────┴──────────┴──────────┴──────────┘
```

**关键要点:**

1. **顺序写入**: CommitLog顺序追加,性能提升30倍以上
2. **零拷贝**: mmap + sendfile,减少50%拷贝次数
3. **页缓存**: 充分利用PageCache,热数据无磁盘IO
4. **异步刷盘**: 后台刷盘不阻塞,TPS提升100倍
5. **批量操作**: 批量发送/拉取,减少网络开销
6. **文件预热**: 避免缺页中断,性能稳定
7. **内存预分配**: 异步预分配文件,无写入等待
8. **读写分离**: PageCache缓存热数据,读写互不影响

**记忆口诀:**

```
RocketMQ为何快
顺序写入是关键
所有消息同一文件
磁盘顺序IO胜随机
零拷贝减少数据移动
mmap映射文件到内存
sendfile直接发网卡
用户态内核态不切换
PageCache做缓存
读写都在内存中
热数据命中率高
性能接近纯内存
异步刷盘不阻塞
500毫秒批量刷
TPS提升百倍
可靠性可配置
批量发送批量拉
网络开销大幅减
文件预热避缺页
性能稳定无抖动
多重优化组合拳
十万TPS不是梦
```

### 69. 什么是零拷贝技术？RocketMQ 如何使用？

**核心答案:**

零拷贝(Zero-Copy)是指减少数据在**用户态**和**内核态**之间的拷贝次数:
1. **传统IO**: 4次拷贝 + 4次上下文切换
2. **mmap**: 3次拷贝,用户态直接访问内核缓冲区
3. **sendfile**: 2次拷贝,数据在内核态直接传输

RocketMQ使用场景:
- **mmap**: CommitLog文件映射,读写零拷贝
- **sendfile**: Consumer拉取消息,网络传输零拷贝

**详细说明:**

**(1) 传统IO的数据拷贝**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">传统IO的4次拷贝</text>
<rect x="50" y="50" width="700" height="430" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="250" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="225" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">磁盘</text>
<text x="225" y="125" text-anchor="middle" font-size="9" fill="#424242">文件数据</text>
<text x="225" y="145" text-anchor="middle" font-size="8" fill="#616161">data.bin</text>
<path d="M 225 160 L 225 195" stroke="#F44336" stroke-width="3" marker-end="url(#arrowRed9)"/>
<text x="270" y="180" text-anchor="start" font-size="9" fill="#C62828">① DMA拷贝</text>
<rect x="100" y="200" width="250" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="225" y="225" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">内核缓冲区 (Kernel Buffer)</text>
<text x="225" y="245" text-anchor="middle" font-size="8" fill="#424242">内核态</text>
<path d="M 225 260 L 225 295" stroke="#FF9800" stroke-width="3" marker-end="url(#arrowOrange9)"/>
<text x="270" y="280" text-anchor="start" font-size="9" fill="#F57C00">② CPU拷贝</text>
<rect x="100" y="300" width="250" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="225" y="325" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">用户缓冲区 (User Buffer)</text>
<text x="225" y="345" text-anchor="middle" font-size="8" fill="#424242">用户态 (应用程序)</text>
<path d="M 350 330 L 450 330" stroke="#2196F3" stroke-width="3" marker-end="url(#arrowBlue9)"/>
<text x="400" y="320" text-anchor="middle" font-size="9" fill="#1976D2">③ CPU拷贝</text>
<rect x="450" y="300" width="250" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="575" y="325" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">Socket缓冲区 (Socket Buffer)</text>
<text x="575" y="345" text-anchor="middle" font-size="8" fill="#424242">内核态</text>
<path d="M 575 360 L 575 395" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrowGreen9)"/>
<text x="620" y="380" text-anchor="start" font-size="9" fill="#2E7D32">④ DMA拷贝</text>
<rect x="450" y="400" width="250" height="60" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="575" y="425" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">网卡 (NIC)</text>
<text x="575" y="445" text-anchor="middle" font-size="8" fill="#424242">发送到网络</text>
<defs>
<marker id="arrowRed9" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#F44336"/>
</marker>
<marker id="arrowOrange9" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#FF9800"/>
</marker>
<marker id="arrowBlue9" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#2196F3"/>
</marker>
<marker id="arrowGreen9" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
</defs>
</svg>

**传统IO代码:**

```java
// 传统IO: 4次拷贝
public class TraditionalIO {
    public static void sendFile(String fileName, Socket socket) throws IOException {
        // 1. 打开文件
        FileInputStream fis = new FileInputStream(fileName);

        // 2. 读取文件到用户态buffer (拷贝1+2)
        byte[] buffer = new byte[4096];
        int bytesRead = fis.read(buffer);  // DMA→内核 + 内核→用户

        // 3. 写入Socket (拷贝3+4)
        OutputStream os = socket.getOutputStream();
        os.write(buffer, 0, bytesRead);    // 用户→Socket + Socket→网卡

        fis.close();
    }
}
```

**传统IO的问题:**

```
4次数据拷贝:
① DMA拷贝: 磁盘 → 内核缓冲区 (DMA,不占用CPU)
② CPU拷贝: 内核缓冲区 → 用户缓冲区 (CPU拷贝)
③ CPU拷贝: 用户缓冲区 → Socket缓冲区 (CPU拷贝)
④ DMA拷贝: Socket缓冲区 → 网卡 (DMA,不占用CPU)

4次上下文切换:
① read()系统调用: 用户态 → 内核态
② read()返回: 内核态 → 用户态
③ write()系统调用: 用户态 → 内核态
④ write()返回: 内核态 → 用户态

性能损耗:
- CPU占用高: 2次CPU拷贝消耗CPU资源
- 内存浪费: 用户态buffer额外占用内存
- 上下文切换: 4次切换有性能开销
```

**(2) mmap 内存映射**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">mmap 内存映射 (3次拷贝)</text>
<rect x="50" y="50" width="700" height="380" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="250" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="225" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">磁盘</text>
<text x="225" y="125" text-anchor="middle" font-size="9" fill="#424242">文件数据</text>
<path d="M 225 160 L 225 195" stroke="#F44336" stroke-width="3" marker-end="url(#arrowRed10)"/>
<text x="270" y="180" text-anchor="start" font-size="9" fill="#C62828">① DMA拷贝</text>
<rect x="100" y="200" width="600" height="100" fill="#FFF3E0" stroke="#FF9800" stroke-width="3" rx="5"/>
<text x="400" y="225" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">内核缓冲区 (PageCache)</text>
<text x="400" y="245" text-anchor="middle" font-size="9" fill="#424242">内核态空间</text>
<rect x="120" y="260" width="250" height="30" fill="#FFE0B2" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="245" y="280" text-anchor="middle" font-size="8" fill="#424242">物理内存页</text>
<rect x="430" y="260" width="250" height="30" fill="#BBDEFB" stroke="#2196F3" stroke-width="2" rx="3"/>
<text x="555" y="280" text-anchor="middle" font-size="8" fill="#1976D2">用户态虚拟地址映射 (无拷贝)</text>
<path d="M 370 275 L 430 275" stroke="#2196F3" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowBlue10)"/>
<text x="400" y="265" text-anchor="middle" font-size="8" fill="#1976D2">mmap映射</text>
<path d="M 575 290 L 575 325" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrowGreen10)"/>
<text x="620" y="310" text-anchor="start" font-size="9" fill="#2E7D32">② CPU拷贝</text>
<rect x="450" y="330" width="250" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="575" y="355" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">Socket缓冲区</text>
<text x="575" y="375" text-anchor="middle" font-size="8" fill="#424242">内核态</text>
<path d="M 575 390 L 575 425" stroke="#9C27B0" stroke-width="3" marker-end="url(#arrowPurple10)"/>
<text x="620" y="410" text-anchor="start" font-size="9" fill="#7B1FA2">③ DMA拷贝</text>
<rect x="450" y="430" width="250" height="60" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="575" y="455" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">网卡 (NIC)</text>
<defs>
<marker id="arrowRed10" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#F44336"/>
</marker>
<marker id="arrowBlue10" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#2196F3"/>
</marker>
<marker id="arrowGreen10" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
<marker id="arrowPurple10" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#9C27B0"/>
</marker>
</defs>
</svg>

**mmap工作原理:**

```
mmap特点:
1. 虚拟地址映射: 用户态地址直接映射到内核态的物理内存
2. 无需拷贝: 用户程序直接访问PageCache,无需拷贝到用户态buffer
3. 减少1次拷贝: 省去"内核→用户"的CPU拷贝

数据流程:
① DMA拷贝: 磁盘 → PageCache
② CPU拷贝: PageCache → Socket缓冲区 (用户态直接读PageCache)
③ DMA拷贝: Socket缓冲区 → 网卡

上下文切换: 4次 (与传统IO相同)

优势:
- 减少1次CPU拷贝
- 节省用户态buffer内存
- 读写共享PageCache
```

**mmap代码示例:**

```java
// Java NIO mmap
public class MmapExample {
    public static void main(String[] args) throws IOException {
        // 1. 打开文件
        RandomAccessFile file = new RandomAccessFile("data.bin", "rw");
        FileChannel channel = file.getChannel();

        // 2. mmap内存映射
        MappedByteBuffer buffer = channel.map(
            FileChannel.MapMode.READ_WRITE,
            0,              // 起始位置
            1024 * 1024     // 映射大小(1MB)
        );

        // 3. 直接读写MappedByteBuffer (无拷贝)
        buffer.put(0, (byte) 'A');        // 写入
        byte b = buffer.get(0);           // 读取

        // 4. 数据自动同步到磁盘(异步)
        buffer.force();  // 强制刷盘

        channel.close();
        file.close();
    }
}

// RocketMQ中的mmap
public class MappedFile {
    private FileChannel fileChannel;
    private MappedByteBuffer mappedByteBuffer;

    public void init(String fileName, int fileSize) throws IOException {
        File file = new File(fileName);
        this.fileChannel = new RandomAccessFile(file, "rw").getChannel();

        // mmap映射整个文件
        this.mappedByteBuffer = this.fileChannel.map(
            FileChannel.MapMode.READ_WRITE,
            0,
            fileSize
        );
    }

    // 写入消息(零拷贝)
    public boolean appendMessage(byte[] data) {
        int currentPos = this.wrotePosition.get();

        // 直接写入mappedByteBuffer
        // 用户态直接操作内核PageCache,无需拷贝
        this.mappedByteBuffer.position(currentPos);
        this.mappedByteBuffer.put(data);

        this.wrotePosition.addAndGet(data.length);
        return true;
    }

    // 读取消息(零拷贝)
    public SelectMappedBufferResult selectMappedBuffer(int pos, int size) {
        // 直接从mappedByteBuffer读取
        // 用户态直接访问内核PageCache,无需拷贝
        ByteBuffer byteBuffer = this.mappedByteBuffer.slice();
        byteBuffer.position(pos);

        ByteBuffer byteBufferNew = byteBuffer.slice();
        byteBufferNew.limit(size);

        return new SelectMappedBufferResult(pos, byteBufferNew, size, this);
    }
}
```

**(3) sendfile 零拷贝**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">sendfile 零拷贝 (2次拷贝)</text>
<rect x="50" y="50" width="700" height="330" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="250" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="225" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">磁盘</text>
<text x="225" y="125" text-anchor="middle" font-size="9" fill="#424242">文件数据</text>
<path d="M 225 160 L 225 195" stroke="#F44336" stroke-width="3" marker-end="url(#arrowRed11)"/>
<text x="270" y="180" text-anchor="start" font-size="9" fill="#C62828">① DMA拷贝</text>
<rect x="100" y="200" width="250" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="225" y="225" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">内核缓冲区 (PageCache)</text>
<text x="225" y="245" text-anchor="middle" font-size="8" fill="#424242">内核态</text>
<text x="225" y="265" text-anchor="middle" font-size="7" fill="#616161">数据保留在内核态</text>
<path d="M 350 240 L 450 240" stroke="#FF9800" stroke-width="3" marker-end="url(#arrowOrange11)"/>
<text x="400" y="230" text-anchor="middle" font-size="9" fill="#F57C00">② DMA拷贝</text>
<text x="400" y="255" text-anchor="middle" font-size="8" fill="#616161">(sendfile)</text>
<rect x="450" y="200" width="250" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="575" y="225" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">网卡 (NIC)</text>
<text x="575" y="245" text-anchor="middle" font-size="8" fill="#424242">直接发送到网络</text>
<text x="575" y="265" text-anchor="middle" font-size="7" fill="#616161">无用户态参与</text>
<rect x="150" y="300" width="500" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="325" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">用户态程序</text>
<text x="400" y="345" text-anchor="middle" font-size="9" fill="#424242">只发起sendfile()系统调用,数据不经过用户态</text>
<defs>
<marker id="arrowRed11" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#F44336"/>
</marker>
<marker id="arrowOrange11" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#FF9800"/>
</marker>
</defs>
</svg>

**sendfile工作原理:**

```
sendfile特点:
1. 内核态传输: 数据全程在内核态,不经过用户态
2. 最少拷贝: 只有2次拷贝(都是DMA)
3. 无CPU拷贝: CPU不参与数据拷贝

数据流程:
① DMA拷贝: 磁盘 → PageCache
② DMA拷贝: PageCache → 网卡 (gather copy,DMA直接从PageCache取数据)

上下文切换: 2次
① sendfile()系统调用: 用户态 → 内核态
② sendfile()返回: 内核态 → 用户态

优势:
- 只有2次拷贝,且都是DMA
- 无CPU拷贝,CPU占用极低
- 数据不经过用户态,节省内存
- 上下文切换减少50%
```

**sendfile代码示例:**

```java
// Java NIO sendfile (FileChannel.transferTo)
public class SendfileExample {
    public static void sendFile(String fileName, SocketChannel socketChannel)
        throws IOException {

        // 1. 打开文件
        FileChannel fileChannel = new FileInputStream(fileName).getChannel();

        // 2. sendfile零拷贝传输
        long position = 0;
        long count = fileChannel.size();

        // 底层调用sendfile()系统调用
        long transferred = fileChannel.transferTo(
            position,       // 文件起始位置
            count,          // 传输字节数
            socketChannel   // 目标Socket
        );

        System.out.println("传输字节数: " + transferred);

        fileChannel.close();
    }
}

// RocketMQ中的sendfile
public class HAConnection {
    private SocketChannel socketChannel;
    private SelectMappedBufferResult selectMappedBufferResult;

    // 使用sendfile发送消息给Slave
    private boolean transferData() throws Exception {
        int writeSizeZeroTimes = 0;

        // 使用FileChannel.transferTo (底层sendfile)
        while (this.selectMappedBufferResult.getByteBuffer().hasRemaining()) {
            // transferTo: PageCache → Socket → 网卡 (零拷贝)
            long transferCount = this.fileChannel.transferTo(
                this.selectMappedBufferResult.getStartOffset(),
                this.selectMappedBufferResult.getSize(),
                this.socketChannel
            );

            if (transferCount > 0) {
                // 更新传输进度
                this.selectMappedBufferResult.setByteBuffer(
                    this.selectMappedBufferResult.getByteBuffer()
                        .position((int) transferCount)
                );
                writeSizeZeroTimes = 0;
            } else {
                if (++writeSizeZeroTimes >= 3) {
                    break;
                }
            }
        }

        return !this.selectMappedBufferResult.getByteBuffer().hasRemaining();
    }
}

// Consumer拉取消息使用sendfile
public class PullMessageProcessor {
    // 处理Consumer拉取请求
    public RemotingCommand processRequest(ChannelHandlerContext ctx,
                                          RemotingCommand request) {
        // 1. 从CommitLog读取消息(mmap)
        GetMessageResult getMessageResult =
            this.brokerController.getMessageStore()
                .getMessage(group, topic, queueId, offset, maxMsgNums, subscriptionData);

        // 2. 使用sendfile发送给Consumer
        if (getMessageResult.getBufferTotalSize() > 0) {
            // FileRegion包装,使用sendfile传输
            FileRegion fileRegion = new DefaultFileRegion(
                getMessageResult.getMappedFile().getFileChannel(),
                getMessageResult.getStartOffset(),
                getMessageResult.getSize()
            );

            ctx.writeAndFlush(fileRegion);  // Netty使用sendfile
        }

        return response;
    }
}
```

**(4) 三种方式对比**

**性能对比:**

| 方式 | 拷贝次数 | CPU拷贝 | DMA拷贝 | 上下文切换 | CPU占用 | 适用场景 |
|-----|---------|--------|---------|-----------|---------|---------|
| **传统IO** | 4次 | 2次 | 2次 | 4次 | 高 | 需要修改数据 |
| **mmap** | 3次 | 1次 | 2次 | 4次 | 中 | 读写文件 |
| **sendfile** | 2次 | 0次 | 2次 | 2次 | 低 | 文件转发 |

**详细对比:**

```
┌──────────────┬──────────┬──────────┬──────────┬──────────┐
│ 指标          │ 传统IO   │ mmap     │ sendfile │ 说明     │
├──────────────┼──────────┼──────────┼──────────┼──────────┤
│ 拷贝次数      │ 4        │ 3        │ 2        │ 越少越好  │
│ CPU拷贝      │ 2        │ 1        │ 0        │ 最耗CPU  │
│ DMA拷贝      │ 2        │ 2        │ 2        │ 不占CPU  │
│ 上下文切换    │ 4        │ 4        │ 2        │ 越少越好  │
│ 用户态buffer  │ 需要     │ 不需要   │ 不需要   │ 节省内存  │
│ 可修改数据    │ 是       │ 是       │ 否       │ -        │
│ TPS提升      │ 1x       │ 1.3x     │ 1.5x     │ 相对值   │
│ CPU节省      │ 0%       │ 20%      │ 40%      │ 相对值   │
└──────────────┴──────────┴──────────┴──────────┴──────────┘
```

**(5) RocketMQ零拷贝应用场景**

**场景1: CommitLog读写 (mmap)**

```java
// CommitLog使用mmap
public class CommitLog {
    private MappedFileQueue mappedFileQueue;

    // 写入消息 (mmap零拷贝)
    public PutMessageResult putMessage(MessageExtBrokerInner msg) {
        // 获取MappedFile
        MappedFile mappedFile = this.mappedFileQueue.getLastMappedFile();

        // 通过mmap直接写入PageCache
        AppendMessageResult result = mappedFile.appendMessage(msg);

        return new PutMessageResult(PutMessageStatus.PUT_OK, result);
    }

    // 读取消息 (mmap零拷贝)
    public SelectMappedBufferResult getMessage(long offset, int size) {
        // 通过mmap直接从PageCache读取
        MappedFile mappedFile = this.mappedFileQueue.findMappedFileByOffset(offset);

        return mappedFile.selectMappedBuffer((int) (offset % mappedFile.getFileSize()), size);
    }
}
```

**场景2: Consumer拉取消息 (sendfile)**

```java
// Consumer拉取使用sendfile
public class PullMessageProcessor {
    public RemotingCommand processRequest(ChannelHandlerContext ctx,
                                          RemotingCommand request) {
        // 1. 从CommitLog读取(mmap)
        GetMessageResult result = this.messageStore.getMessage(...);

        // 2. 发送给Consumer(sendfile)
        if (this.brokerController.getBrokerConfig().isTransferMsgByHeap()) {
            // 传统方式: 拷贝到堆内存再发送
            byte[] data = new byte[result.getBufferTotalSize()];
            result.getMessageBufferList().get(0).get(data);
            ctx.writeAndFlush(data);
        } else {
            // 零拷贝方式: sendfile直接发送
            FileRegion fileRegion = new DefaultFileRegion(
                result.getMappedFile().getFileChannel(),
                result.getStartOffset(),
                result.getSize()
            );
            ctx.writeAndFlush(fileRegion);  // Netty使用sendfile
        }

        return response;
    }
}

// 配置项
public class BrokerConfig {
    // 是否使用堆内存传输(默认false,使用sendfile)
    private boolean transferMsgByHeap = false;
}
```

**场景3: 主从同步 (sendfile)**

```java
// Master向Slave同步CommitLog
public class HAConnection {
    private FileChannel fileChannel;
    private SocketChannel socketChannel;

    // 使用sendfile同步
    private boolean transferData() throws IOException {
        // sendfile: CommitLog → 网卡 → Slave
        long transferCount = this.fileChannel.transferTo(
            this.nextTransferFromWhere,
            this.selectMappedBufferResult.getSize(),
            this.socketChannel
        );

        if (transferCount > 0) {
            this.nextTransferFromWhere += transferCount;
        }

        return transferCount > 0;
    }
}
```

**(6) 零拷贝性能测试**

```java
// 性能测试
public class ZeroCopyBenchmark {
    private static final int FILE_SIZE = 100 * 1024 * 1024; // 100MB
    private static final int LOOP_COUNT = 100;

    // 传统IO
    public static long testTraditionalIO() throws IOException {
        long start = System.currentTimeMillis();

        for (int i = 0; i < LOOP_COUNT; i++) {
            FileInputStream fis = new FileInputStream("test.dat");
            OutputStream os = socket.getOutputStream();

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }

            fis.close();
        }

        return System.currentTimeMillis() - start;
    }

    // mmap
    public static long testMmap() throws IOException {
        long start = System.currentTimeMillis();

        for (int i = 0; i < LOOP_COUNT; i++) {
            FileChannel channel = new RandomAccessFile("test.dat", "r").getChannel();
            MappedByteBuffer buffer = channel.map(
                FileChannel.MapMode.READ_ONLY, 0, FILE_SIZE);

            OutputStream os = socket.getOutputStream();
            byte[] data = new byte[4096];
            while (buffer.hasRemaining()) {
                int len = Math.min(buffer.remaining(), 4096);
                buffer.get(data, 0, len);
                os.write(data, 0, len);
            }

            channel.close();
        }

        return System.currentTimeMillis() - start;
    }

    // sendfile
    public static long testSendfile() throws IOException {
        long start = System.currentTimeMillis();

        for (int i = 0; i < LOOP_COUNT; i++) {
            FileChannel fileChannel = new FileInputStream("test.dat").getChannel();
            SocketChannel socketChannel = SocketChannel.open(
                new InetSocketAddress("localhost", 8080));

            fileChannel.transferTo(0, FILE_SIZE, socketChannel);

            fileChannel.close();
            socketChannel.close();
        }

        return System.currentTimeMillis() - start;
    }

    public static void main(String[] args) throws IOException {
        long time1 = testTraditionalIO();
        long time2 = testMmap();
        long time3 = testSendfile();

        System.out.println("传统IO耗时: " + time1 + "ms");
        System.out.println("mmap耗时: " + time2 + "ms (提升" +
            (100 - time2 * 100 / time1) + "%)");
        System.out.println("sendfile耗时: " + time3 + "ms (提升" +
            (100 - time3 * 100 / time1) + "%)");

        // 示例输出:
        // 传统IO耗时: 15000ms
        // mmap耗时: 11000ms (提升26%)
        // sendfile耗时: 9000ms (提升40%)
    }
}
```

**关键要点:**

1. **零拷贝定义**: 减少用户态和内核态之间的数据拷贝
2. **传统IO**: 4次拷贝,CPU占用高
3. **mmap**: 3次拷贝,用户态直接访问PageCache
4. **sendfile**: 2次拷贝,数据全程在内核态
5. **RocketMQ应用**: CommitLog用mmap,网络传输用sendfile
6. **性能提升**: TPS提升20-50%,CPU使用率降低30-50%
7. **配置项**: transferMsgByHeap控制是否使用零拷贝
8. **适用场景**: 大文件传输,高吞吐量场景

**记忆口诀:**

```
零拷贝技术要记牢
减少数据来回跑
传统IO四次拷
用户内核来回倒
CPU拷贝占资源
上下文切换开销高
mmap内存来映射
用户直接访PageCache
三次拷贝省一次
读写共享性能好
sendfile更高效
数据不经用户态
内核直接发网卡
两次拷贝CPU不操
DMA拷贝硬件做
性能提升效果妙
RocketMQ两者用
CommitLog用mmap
Consumer拉取sendfile
主从同步也sendfile
零拷贝是快的道
```
### 70. RocketMQ 的消息存储如何清理？

**核心答案:**

RocketMQ消息清理策略:
1. **定时清理**: 每天固定时间(默认凌晨4点)清理过期文件
2. **磁盘压力清理**: 磁盘使用率超过阈值(默认75%)强制清理
3. **手动清理**: 通过mqadmin命令手动清理
4. **清理顺序**: CommitLog → ConsumeQueue → IndexFile

**详细说明:**

**(1) 文件清理触发条件**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 文件清理触发条件</text>
<rect x="50" y="50" width="700" height="380" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="280" height="100" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="240" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">条件1: 定时清理</text>
<text x="240" y="130" text-anchor="middle" font-size="9" fill="#424242">每天固定时间触发</text>
<text x="240" y="150" text-anchor="middle" font-size="8" fill="#616161">默认: 凌晨04:00</text>
<text x="240" y="165" text-anchor="middle" font-size="8" fill="#2E7D32">deleteWhen=04</text>
<rect x="420" y="80" width="280" height="100" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="560" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">条件2: 文件过期</text>
<text x="560" y="130" text-anchor="middle" font-size="9" fill="#424242">文件超过保留时间</text>
<text x="560" y="150" text-anchor="middle" font-size="8" fill="#616161">默认: 72小时</text>
<text x="560" y="165" text-anchor="middle" font-size="8" fill="#F57C00">fileReservedTime=72</text>
<rect x="100" y="200" width="280" height="100" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="240" y="225" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">条件3: 磁盘使用率</text>
<text x="240" y="250" text-anchor="middle" font-size="9" fill="#424242">磁盘空间不足</text>
<text x="240" y="270" text-anchor="middle" font-size="8" fill="#616161">告警: 75%, 强制: 85%</text>
<text x="240" y="285" text-anchor="middle" font-size="8" fill="#C62828">diskMaxUsedSpaceRatio</text>
<rect x="420" y="200" width="280" height="100" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="560" y="225" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">条件4: 手动清理</text>
<text x="560" y="250" text-anchor="middle" font-size="9" fill="#424242">通过命令触发</text>
<text x="560" y="270" text-anchor="middle" font-size="8" fill="#616161">mqadmin cleanExpiredCQ</text>
<text x="560" y="285" text-anchor="middle" font-size="8" fill="#1976D2">sh mqadmin cleanUnusedTopic</text>
<rect x="100" y="320" width="600" height="90" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="400" y="345" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">清理优先级</text>
<text x="400" y="370" text-anchor="middle" font-size="9" fill="#424242">1. 最旧的CommitLog文件</text>
<text x="400" y="390" text-anchor="middle" font-size="9" fill="#424242">2. 对应的ConsumeQueue文件</text>
<text x="400" y="405" text-anchor="middle" font-size="9" fill="#424242">3. 对应的IndexFile文件</text>
</svg>

**清理配置参数:**

```properties
# broker.conf

# ============ 定时清理 ============
# 删除文件时间点(小时,默认04)
# 表示凌晨4点开始清理
deleteWhen=04

# ============ 文件保留时间 ============
# 文件保留时间(小时,默认72小时=3天)
fileReservedTime=72

# 强制删除文件间隔(毫秒,默认120秒)
# 磁盘满时,每隔120秒强制删除一个文件
destroyMapedFileIntervalForcibly=120000

# ============ 磁盘使用率 ============
# 磁盘最大使用率(默认75%)
# 超过后触发清理
diskMaxUsedSpaceRatio=75

# 磁盘告警阈值(默认90%)
diskSpaceWarningLevelRatio=90

# 磁盘强制清理阈值(默认85%)
# 超过后立即强制清理,忽略保留时间
diskSpaceCleanForciblyRatio=85

# ============ 清理开关 ============
# 是否启用磁盘强制清理(默认true)
cleanFileForciblyEnable=true

# 是否手动触发清理(默认false)
# true: 只能手动清理, false: 自动清理
manualDeleteFileSeveralTimes=1
```

**(2) 定时清理机制**

```
定时清理流程:
┌─────────────────────────────────────┐
│     CleanCommitLogService           │
│     (后台线程,10秒检查一次)          │
└──────────────┬──────────────────────┘
               │ 每10秒检查
               ▼
┌─────────────────────────────────────┐
│ 判断是否到达清理时间?                │
│ currentHour == deleteWhen(04:00)    │
└──────────────┬──────────────────────┘
               │ 是
               ▼
┌─────────────────────────────────────┐
│ 遍历CommitLog文件                   │
│ 找到最旧的过期文件                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 判断文件是否过期?                    │
│ (当前时间 - 文件修改时间) > 72小时   │
└──────────────┬──────────────────────┘
               │ 是
               ▼
┌─────────────────────────────────────┐
│ 删除CommitLog文件                   │
│ 删除对应ConsumeQueue文件             │
│ 删除对应IndexFile文件                │
└─────────────────────────────────────┘
```

**定时清理源码:**

```java
// CleanCommitLogService: 定时清理服务
public class CleanCommitLogService {
    private final DefaultMessageStore messageStore;

    @Override
    public void run() {
        while (!this.isStopped()) {
            try {
                // 每10秒检查一次
                this.waitForRunning(10000);

                // 执行清理
                this.deleteExpiredFiles();

            } catch (Exception e) {
                log.error("CleanCommitLogService error", e);
            }
        }
    }

    private void deleteExpiredFiles() {
        // 1. 检查是否到达清理时间
        if (!this.isTimeToDelete()) {
            return;
        }

        // 2. 检查磁盘使用率
        if (this.isSpaceToDelete()) {
            return;
        }

        // 3. 获取过期文件保留时间
        int fileReservedTime = this.messageStore.getMessageStoreConfig()
            .getFileReservedTime();

        // 4. 删除CommitLog过期文件
        int deleteCount = this.messageStore.getCommitLog()
            .deleteExpiredFile(fileReservedTime * 3600 * 1000,
                               this.messageStore.getMessageStoreConfig()
                                   .getDeletePhysicFilesInterval(),
                               1.0,
                               this.messageStore.getMessageStoreConfig()
                                   .isCleanFileForciblyEnable());

        if (deleteCount > 0) {
            log.info("删除过期CommitLog文件: " + deleteCount + "个");
        }

        // 5. 删除ConsumeQueue过期文件
        this.messageStore.getConsumeQueueTable().values().forEach(cq -> {
            cq.deleteExpiredFile(fileReservedTime * 3600 * 1000);
        });

        // 6. 删除IndexFile过期文件
        this.messageStore.getIndexService()
            .deleteExpiredFile(fileReservedTime * 3600 * 1000);
    }

    // 检查是否到达清理时间
    private boolean isTimeToDelete() {
        String deleteWhen = this.messageStore.getMessageStoreConfig().getDeleteWhen();
        int currentHour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);

        // 例如: deleteWhen="04", currentHour=4, 则到达清理时间
        return Integer.parseInt(deleteWhen) == currentHour;
    }

    // 检查磁盘空间
    private boolean isSpaceToDelete() {
        String storePathPhysic = this.messageStore.getMessageStoreConfig()
            .getStorePathCommitLog();

        // 磁盘使用率
        double ratio = UtilAll.getDiskPartitionSpaceUsedPercent(storePathPhysic);

        // 超过阈值则需要清理
        return ratio > this.messageStore.getMessageStoreConfig()
            .getDiskMaxUsedSpaceRatio() / 100.0;
    }
}
```

**(3) 磁盘压力清理**

```
磁盘压力清理阈值:
┌──────────────────────────────────────┐
│ 磁盘使用率 < 75%                      │
│ 状态: 正常,按时间清理                 │
└──────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────┐
│ 磁盘使用率 75% ~ 85%                  │
│ 状态: 告警,加速清理(忽略保留时间10%)  │
└──────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────┐
│ 磁盘使用率 85% ~ 90%                  │
│ 状态: 强制清理,忽略保留时间            │
└──────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────┐
│ 磁盘使用率 > 90%                      │
│ 状态: 危险,拒绝写入新消息              │
└──────────────────────────────────────┘
```

**磁盘压力清理源码:**

```java
// 磁盘压力清理
public int deleteExpiredFile(
    long expiredTime,       // 过期时间(毫秒)
    int deleteFilesInterval,// 删除间隔
    double diskSpaceCleanForciblyRatio, // 强制清理阈值
    boolean cleanImmediately) {  // 是否立即清理

    // 1. 获取所有MappedFile
    List<MappedFile> files = this.mappedFiles;

    int deleteCount = 0;
    for (int i = 0; i < files.size(); i++) {
        MappedFile mappedFile = files.get(i);

        // 2. 计算文件存活时间
        long liveMaxTimestamp = mappedFile.getLastModifiedTimestamp() + expiredTime;

        // 3. 判断是否过期或磁盘满
        if (System.currentTimeMillis() >= liveMaxTimestamp || cleanImmediately) {

            // 4. 检查磁盘使用率
            String storePathPhysic = this.storePath;
            double diskUsedRatio = UtilAll.getDiskPartitionSpaceUsedPercent(storePathPhysic);

            // 磁盘使用率超过强制清理阈值,立即删除
            if (diskUsedRatio >= diskSpaceCleanForciblyRatio) {
                log.warn("磁盘使用率{}%,超过阈值{}%,强制删除文件: {}",
                    diskUsedRatio * 100, diskSpaceCleanForciblyRatio * 100,
                    mappedFile.getFileName());
            }

            // 5. 删除文件
            if (mappedFile.destroy(deleteFilesInterval)) {
                files.remove(i);
                i--;
                deleteCount++;

                log.info("删除过期文件: {}", mappedFile.getFileName());

                // 删除间隔,避免IO压力过大
                Thread.sleep(deleteFilesInterval);
            }
        }
    }

    return deleteCount;
}

// 检查磁盘使用率
public class CleanCommitLogService {
    private void deleteExpiredFiles() {
        // 计算磁盘使用率
        double diskSpaceUsedRatio = UtilAll.getDiskPartitionSpaceUsedPercent(storePath);

        // 根据磁盘使用率决定清理策略
        if (diskSpaceUsedRatio > 0.90) {
            // 超过90%: 拒绝写入
            this.messageStore.setOSPageCacheBusy(true);
            log.error("磁盘使用率{}%,超过90%,拒绝写入", diskSpaceUsedRatio * 100);

        } else if (diskSpaceUsedRatio > 0.85) {
            // 超过85%: 强制清理,忽略保留时间
            log.warn("磁盘使用率{}%,超过85%,强制清理", diskSpaceUsedRatio * 100);
            this.messageStore.getCommitLog().deleteExpiredFile(
                0,  // 忽略保留时间
                100,
                0.85,
                true  // 立即清理
            );

        } else if (diskSpaceUsedRatio > 0.75) {
            // 超过75%: 加速清理,保留时间减少10%
            log.info("磁盘使用率{}%,超过75%,加速清理", diskSpaceUsedRatio * 100);
            long fileReservedTime = this.messageStore.getMessageStoreConfig()
                .getFileReservedTime();
            this.messageStore.getCommitLog().deleteExpiredFile(
                (long) (fileReservedTime * 3600 * 1000 * 0.9),  // 保留时间减少10%
                100,
                0.75,
                false
            );
        }
    }
}
```

**(4) 手动清理命令**

**清理ConsumeQueue:**

```bash
# 清理过期ConsumeQueue
sh bin/mqadmin cleanExpiredCQ -n 127.0.0.1:9876

# 输出:
# clean expired consume queue, {
#   "OrderTopic":2,
#   "PayTopic":1
# }
# 说明: 清理了OrderTopic的2个过期Queue,PayTopic的1个
```

**清理未使用的Topic:**

```bash
# 清理未使用的Topic
sh bin/mqadmin cleanUnusedTopic -n 127.0.0.1:9876 -c DefaultCluster

# 输出:
# delete unused topic[TestTopic] in cluster[DefaultCluster] success

# 说明: 删除集群中未使用的Topic及其ConsumeQueue
```

**清理过期CommitLog:**

```bash
# 没有直接命令,可以通过修改配置触发
# 方式1: 修改fileReservedTime为更小值
vi conf/broker.conf
# fileReservedTime=1  (改为1小时)

# 重启Broker或等待下次清理时间

# 方式2: 修改deleteWhen为当前时间
vi conf/broker.conf
# deleteWhen=10  (改为当前小时)

# 等待10分钟,清理服务会自动触发
```

**(5) 清理流程与顺序**

```
完整清理流程:
┌─────────────────────────────────────┐
│ 1. 触发清理 (定时/磁盘压力/手动)     │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 2. 清理CommitLog                    │
│    - 找到最旧的过期文件              │
│    - 检查文件是否可删除              │
│    - 删除文件                        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 3. 清理ConsumeQueue                 │
│    - 根据CommitLog最小offset        │
│    - 删除对应的ConsumeQueue文件      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 4. 清理IndexFile                    │
│    - 根据时间范围                    │
│    - 删除过期的IndexFile             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 5. 更新元数据                        │
│    - 更新minOffset                  │
│    - 更新checkpoint                 │
└─────────────────────────────────────┘
```

**清理顺序源码:**

```java
// DefaultMessageStore: 协调清理
public class DefaultMessageStore {
    // 清理所有过期文件
    public void cleanFilesPeriodically() {
        // 1. 清理CommitLog
        this.cleanCommitLogService.run();

        // 2. 清理ConsumeQueue
        this.cleanConsumeQueueService.run();

        // 3. 清理IndexFile
        this.indexService.deleteExpiredFile();
    }
}

// CleanConsumeQueueService: 清理ConsumeQueue
public class CleanConsumeQueueService {
    @Override
    public void run() {
        while (!this.isStopped()) {
            try {
                this.waitForRunning(60000);  // 每60秒检查一次

                // 获取CommitLog最小offset
                long minCommitLogOffset = this.messageStore.getMinPhyOffset();

                // 遍历所有ConsumeQueue
                this.messageStore.getConsumeQueueTable().values().forEach(cq -> {
                    // 删除offset小于minCommitLogOffset的ConsumeQueue
                    cq.deleteExpiredFileByOffset(minCommitLogOffset);
                });

            } catch (Exception e) {
                log.error("CleanConsumeQueueService error", e);
            }
        }
    }
}

// IndexService: 清理IndexFile
public class IndexService {
    public void deleteExpiredFile(long offset) {
        List<IndexFile> files = this.indexFileList;

        for (int i = 0; i < files.size(); i++) {
            IndexFile indexFile = files.get(i);

            // IndexFile的endPhyOffset小于CommitLog最小offset则删除
            if (indexFile.getEndPhyOffset() < offset) {
                indexFile.destroy();
                this.indexFileList.remove(i);
                i--;

                log.info("删除过期IndexFile: {}", indexFile.getFileName());
            }
        }
    }
}
```

**(6) 清理监控与告警**

```bash
#!/bin/bash
# monitor_disk.sh - 磁盘清理监控脚本

STORE_PATH="$HOME/store"
ALERT_URL="https://alert.example.com/api/send"

# 检查磁盘使用率
check_disk_usage() {
    disk_usage=$(df -h $STORE_PATH | tail -1 | awk '{print $5}' | sed 's/%//')

    echo "磁盘使用率: ${disk_usage}%"

    if [ $disk_usage -gt 90 ]; then
        send_alert "CRITICAL: 磁盘使用率${disk_usage}%,超过90%"
    elif [ $disk_usage -gt 85 ]; then
        send_alert "WARNING: 磁盘使用率${disk_usage}%,超过85%"
    elif [ $disk_usage -gt 75 ]; then
        echo "INFO: 磁盘使用率${disk_usage}%,超过75%,开始加速清理"
    fi
}

# 检查CommitLog文件数
check_commitlog_files() {
    file_count=$(ls -1 $STORE_PATH/commitlog/ | wc -l)
    echo "CommitLog文件数: ${file_count}"

    if [ $file_count -gt 100 ]; then
        send_alert "WARNING: CommitLog文件数${file_count},过多"
    fi
}

# 检查最旧文件时间
check_oldest_file() {
    oldest_file=$(ls -t $STORE_PATH/commitlog/ | tail -1)
    if [ -n "$oldest_file" ]; then
        file_time=$(stat -c %Y $STORE_PATH/commitlog/$oldest_file)
        current_time=$(date +%s)
        age=$((($current_time - $file_time) / 3600))  # 小时

        echo "最旧文件: ${oldest_file}, 存活时间: ${age}小时"

        if [ $age -gt 168 ]; then  # 7天
            send_alert "INFO: 最旧文件存活${age}小时,超过7天"
        fi
    fi
}

# 发送告警
send_alert() {
    message=$1
    echo "[ALERT] $message"
    curl -X POST "$ALERT_URL" \
        -H "Content-Type: application/json" \
        -d "{\"message\":\"$message\",\"level\":\"WARNING\"}"
}

# 执行监控
check_disk_usage
check_commitlog_files
check_oldest_file
```

**(7) 最佳实践**

```
配置建议:
1. fileReservedTime: 根据业务需求设置
   - 低价值消息: 24小时
   - 普通消息: 72小时(默认)
   - 重要消息: 168小时(7天)

2. diskMaxUsedSpaceRatio: 保守设置
   - 生产环境: 70-75%
   - 测试环境: 85%

3. deleteWhen: 选择低峰期
   - 凌晨3-5点
   - 避免业务高峰期

监控建议:
1. 磁盘使用率: 实时监控,超过70%告警
2. 文件数量: 监控CommitLog文件数,异常增长告警
3. 清理日志: 监控清理日志,清理失败告警
4. 最旧文件: 监控最旧文件时间,超过预期告警

容量规划:
1. 计算每日消息量: 例如100万条/天,每条1KB = 1GB/天
2. 保留时间: 72小时 = 3GB
3. 预留空间: 3GB × 2(冗余) = 6GB
4. 磁盘容量: 至少10GB(考虑其他文件)

注意事项:
1. 删除不可逆: 删除的文件无法恢复
2. 保留时间: 确保Consumer消费完成后再删除
3. 磁盘监控: 定期检查磁盘使用率
4. 备份策略: 重要消息需要额外备份
```

**关键要点:**

1. **清理触发**: 定时清理、磁盘压力、手动清理
2. **保留时间**: 默认72小时,可配置
3. **磁盘阈值**: 75%告警,85%强制清理,90%拒绝写入
4. **清理顺序**: CommitLog → ConsumeQueue → IndexFile
5. **删除策略**: 从最旧文件开始删除
6. **监控告警**: 实时监控磁盘使用率
7. **容量规划**: 根据消息量和保留时间规划磁盘
8. **注意事项**: 删除不可逆,确保消费完成

**记忆口诀:**

```
RocketMQ文件清理
定时磁盘和手动
默认凌晨四点清
保留时间七十二
磁盘使用超七五
开始加速来清理
超过八五强制删
九十拒写很危险
清理顺序要记牢
CommitLog先删除
ConsumeQueue跟着删
IndexFile最后清
最旧文件先删掉
删除间隔避IO压
监控告警要及时
磁盘容量要规划
备份策略不可少
删除不可逆操作
```
