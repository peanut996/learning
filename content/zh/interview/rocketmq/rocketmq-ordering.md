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
