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
