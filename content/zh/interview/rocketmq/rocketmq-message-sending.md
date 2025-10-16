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
