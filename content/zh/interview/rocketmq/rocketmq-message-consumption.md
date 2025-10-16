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
