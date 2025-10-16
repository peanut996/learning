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
