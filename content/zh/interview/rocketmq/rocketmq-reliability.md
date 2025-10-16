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
