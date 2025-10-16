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
