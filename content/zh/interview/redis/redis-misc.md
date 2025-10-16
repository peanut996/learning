## 其他特性

### 56. 什么是发布订阅（Pub/Sub）？

**核心答案**：Redis 发布订阅（Pub/Sub）是一种消息通信模式，发送者（发布者）发送消息，订阅者接收消息。它实现了消息的发布与订阅解耦，支持一对多的消息分发。

**详细说明**：

Pub/Sub 的核心概念：

1. **发布者（Publisher）**
   - 向指定频道发送消息
   - 不关心有多少订阅者
   - 发送即忘（fire-and-forget）

2. **订阅者（Subscriber）**
   - 订阅一个或多个频道
   - 接收频道的所有消息
   - 可以使用模式匹配订阅

3. **频道（Channel）**
   - 消息的传输通道
   - 命名空间隔离
   - 支持通配符模式

**基本命令**：

```bash
# 发布消息
PUBLISH channel message

# 订阅频道
SUBSCRIBE channel1 channel2 ...

# 模式订阅（通配符）
PSUBSCRIBE pattern1 pattern2 ...

# 取消订阅
UNSUBSCRIBE channel1 channel2 ...
PUNSUBSCRIBE pattern1 pattern2 ...

# 查看订阅信息
PUBSUB CHANNELS [pattern]  # 列出活跃频道
PUBSUB NUMSUB channel      # 查看频道订阅数
PUBSUB NUMPAT              # 查看模式订阅数
```

**工作流程图**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead-pub" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<rect x="50" y="50" width="120" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
<text x="110" y="95" text-anchor="middle" font-size="16" font-weight="bold">Publisher 1</text>
<rect x="50" y="270" width="120" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
<text x="110" y="315" text-anchor="middle" font-size="16" font-weight="bold">Publisher 2</text>
<rect x="340" y="160" width="120" height="80" fill="#fef3c7" stroke="#f59e0b" stroke-width="3" rx="5"/>
<text x="400" y="195" text-anchor="middle" font-size="18" font-weight="bold">Redis</text>
<text x="400" y="215" text-anchor="middle" font-size="14">Channel: news</text>
<rect x="630" y="30" width="120" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="690" y="75" text-anchor="middle" font-size="16" font-weight="bold">Subscriber 1</text>
<rect x="630" y="160" width="120" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="690" y="205" text-anchor="middle" font-size="16" font-weight="bold">Subscriber 2</text>
<rect x="630" y="290" width="120" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="690" y="335" text-anchor="middle" font-size="16" font-weight="bold">Subscriber 3</text>
<line x1="170" y1="90" x2="335" y2="185" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead-pub)"/>
<text x="250" y="130" font-size="12" fill="#2563eb">PUBLISH</text>
<line x1="170" y1="310" x2="335" y2="215" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead-pub)"/>
<text x="250" y="270" font-size="12" fill="#2563eb">PUBLISH</text>
<line x1="465" y1="180" x2="625" y2="70" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowhead-pub)"/>
<text x="550" y="120" font-size="12" fill="#16a34a">消息推送</text>
<line x1="465" y1="200" x2="625" y2="200" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowhead-pub)"/>
<text x="540" y="195" font-size="12" fill="#16a34a">消息推送</text>
<line x1="465" y1="220" x2="625" y2="330" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowhead-pub)"/>
<text x="540" y="280" font-size="12" fill="#16a34a">消息推送</text>
</svg>

**使用场景**：

| 场景 | 说明 | 示例 |
|------|------|------|
| **实时消息推送** | 新消息通知用户 | 聊天室、评论通知 |
| **事件通知** | 系统事件广播 | 缓存失效通知、配置更新 |
| **日志收集** | 分布式日志聚合 | ELK 日志收集 |
| **实时分析** | 数据流处理 | 实时监控、告警 |

**优点与局限**：

**优点**：
- ✅ 实时性好，毫秒级延迟
- ✅ 解耦发布者和订阅者
- ✅ 支持多对多通信
- ✅ 实现简单，性能高

**局限**：
- ❌ 消息不持久化（订阅者离线则丢失消息）
- ❌ 无消息确认机制
- ❌ 订阅者必须在线才能接收消息
- ❌ 不支持消息回溯
- ❌ 不保证消息可靠性

**模式匹配示例**：

```bash
# 订阅所有 news 开头的频道
PSUBSCRIBE news.*

# 可以匹配：
# news.tech
# news.sports
# news.finance

# 订阅所有频道
PSUBSCRIBE *
```

#### 关键要点

1. **即时通信**：适合实时性要求高的场景
2. **不可靠性**：消息可能丢失，不适合重要业务
3. **解耦性**：发布者和订阅者完全解耦
4. **无持久化**：消息不落盘，仅内存传输

#### 记忆口诀

> **发布订阅三要素，发布订阅加频道**
> 实时推送无持久，订阅离线消息丢
> 模式匹配用通配，一对多时最合适
> 适合通知和广播，重要消息别用它

57. 什么是 Redis Stream？

### 57. 什么是 Redis Stream？

**核心答案**：Redis Stream 是 Redis 5.0 引入的持久化消息队列数据结构，类似 Kafka，支持消息持久化、消费组、消息确认、消息回溯等高级特性，解决了 Pub/Sub 不可靠的问题。

**详细说明**：

Stream 是 Redis 中最完善的消息队列解决方案，具备以下核心特性：

1. **持久化存储**
   - 消息写入磁盘
   - 支持 AOF 和 RDB
   - 消费者离线不丢消息

2. **消费组（Consumer Group）**
   - 多个消费者协同工作
   - 自动负载均衡
   - 类似 Kafka 的消费组机制

3. **消息确认（ACK）**
   - 显式确认消息已处理
   - 未确认消息会重新投递
   - 保证 at-least-once 语义

4. **消息回溯**
   - 可以从任意位置读取
   - 支持按 ID 或时间戳查询
   - 历史消息可重复消费

**核心命令**：

```bash
# 添加消息
XADD stream_key * field1 value1 field2 value2
# * 表示自动生成消息ID：timestamp-sequence

# 读取消息
XREAD COUNT 10 STREAMS stream_key 0  # 从头读取
XREAD BLOCK 5000 STREAMS stream_key $  # 阻塞读取新消息

# 创建消费组
XGROUP CREATE stream_key group_name 0  # 0表示从头消费

# 消费组读取
XREADGROUP GROUP group_name consumer_name COUNT 10 STREAMS stream_key >

# 确认消息
XACK stream_key group_name message_id

# 查看待处理消息
XPENDING stream_key group_name

# 获取 Stream 信息
XINFO STREAM stream_key
XINFO GROUPS stream_key
XINFO CONSUMERS stream_key group_name

# 裁剪 Stream（限制长度）
XTRIM stream_key MAXLEN 1000
```

**Stream 结构图**：

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-stream" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<rect x="50" y="50" width="800" height="120" fill="#fef3c7" stroke="#f59e0b" stroke-width="3" rx="5"/>
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">Redis Stream (持久化消息队列)</text>
<rect x="70" y="70" width="150" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="145" y="95" text-anchor="middle" font-size="14" font-weight="bold">消息1</text>
<text x="145" y="115" text-anchor="middle" font-size="11">ID: 1234-0</text>
<text x="145" y="130" text-anchor="middle" font-size="11">data: {...}</text>
<rect x="240" y="70" width="150" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="315" y="95" text-anchor="middle" font-size="14" font-weight="bold">消息2</text>
<text x="315" y="115" text-anchor="middle" font-size="11">ID: 1234-1</text>
<text x="315" y="130" text-anchor="middle" font-size="11">data: {...}</text>
<rect x="410" y="70" width="150" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="485" y="95" text-anchor="middle" font-size="14" font-weight="bold">消息3</text>
<text x="485" y="115" text-anchor="middle" font-size="11">ID: 1235-0</text>
<text x="485" y="130" text-anchor="middle" font-size="11">data: {...}</text>
<rect x="580" y="70" width="150" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="655" y="95" text-anchor="middle" font-size="14" font-weight="bold">消息4</text>
<text x="655" y="115" text-anchor="middle" font-size="11">ID: 1235-1</text>
<text x="655" y="130" text-anchor="middle" font-size="11">data: {...}</text>
<text x="780" y="110" text-anchor="middle" font-size="16">→</text>
<rect x="100" y="220" width="280" height="100" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="240" y="245" text-anchor="middle" font-size="16" font-weight="bold">消费组 A</text>
<ellipse cx="160" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="160" y="285" text-anchor="middle" font-size="12">Consumer 1</text>
<ellipse cx="240" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="240" y="285" text-anchor="middle" font-size="12">Consumer 2</text>
<ellipse cx="320" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="320" y="285" text-anchor="middle" font-size="12">Consumer 3</text>
<rect x="520" y="220" width="280" height="100" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="660" y="245" text-anchor="middle" font-size="16" font-weight="bold">消费组 B</text>
<ellipse cx="580" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="580" y="285" text-anchor="middle" font-size="12">Consumer 1</text>
<ellipse cx="660" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="660" y="285" text-anchor="middle" font-size="12">Consumer 2</text>
<ellipse cx="740" cy="280" rx="50" ry="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
<text x="740" y="285" text-anchor="middle" font-size="12">Consumer 3</text>
<line x1="145" y1="170" x2="160" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<line x1="315" y1="170" x2="240" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<line x1="485" y1="170" x2="320" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<line x1="315" y1="170" x2="580" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<line x1="485" y1="170" x2="660" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<line x1="655" y1="170" x2="740" y2="255" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-stream)" stroke-dasharray="5,5"/>
<rect x="150" y="380" width="180" height="80" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="240" y="410" text-anchor="middle" font-size="14" font-weight="bold">Pending List</text>
<text x="240" y="430" text-anchor="middle" font-size="11">未确认的消息</text>
<text x="240" y="445" text-anchor="middle" font-size="11">等待 ACK 或重试</text>
<line x1="240" y1="305" x2="240" y2="375" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-stream)"/>
</svg>

**消息 ID 格式**：

```
timestamp-sequence
例如: 1526919030474-0
     │              │
     │              └─ 序列号（同毫秒内递增）
     └──────────────── 毫秒时间戳
```

**Stream vs Pub/Sub 对比**：

| 特性 | Stream | Pub/Sub |
|------|--------|---------|
| **持久化** | ✅ 支持 | ❌ 不支持 |
| **消息可靠性** | ✅ 高（ACK机制） | ❌ 低（可能丢失） |
| **消息回溯** | ✅ 支持 | ❌ 不支持 |
| **消费组** | ✅ 支持 | ❌ 不支持 |
| **离线消费** | ✅ 支持 | ❌ 不支持 |
| **性能** | 中等 | 极高 |
| **适用场景** | 可靠消息队列 | 实时广播 |

**使用场景**：

1. **订单处理**：保证订单消息不丢失
2. **日志收集**：可靠的日志传输
3. **任务队列**：分布式任务调度
4. **事件溯源**：需要回溯历史事件
5. **实时数据管道**：数据流处理

**最佳实践**：

```bash
# 1. 创建 Stream 并设置最大长度
XADD orders * order_id 123 amount 99.9 MAXLEN ~ 10000
# ~ 表示近似裁剪，性能更好

# 2. 创建消费组（从最新消息开始）
XGROUP CREATE orders order_processors $

# 3. 消费者读取消息
XREADGROUP GROUP order_processors worker1 COUNT 10 BLOCK 2000 STREAMS orders >
# > 表示读取未被消费的新消息

# 4. 处理完成后确认
XACK orders order_processors 1526919030474-0

# 5. 处理失败的消息（Pending List）
XPENDING orders order_processors - + 10
# 获取待处理消息列表

# 6. 转移超时消息给其他消费者
XCLAIM orders order_processors worker2 3600000 1526919030474-0
# 将超过1小时未确认的消息转给 worker2
```

#### 关键要点

1. **可靠性**：消息持久化 + ACK 机制，保证不丢失
2. **扩展性**：消费组支持水平扩展
3. **灵活性**：支持单播、广播、回溯等多种模式
4. **性能**：比 Pub/Sub 慢，但比 Kafka 快

#### 记忆口诀

> **Stream 队列真可靠，持久消费带确认**
> 消费组内分任务，Pending List 防丢失
> 消息回溯能重放，ID 递增好排序
> 比 Pub/Sub 更靠谱，轻量级的 Kafka**

58. Redis 如何实现延迟队列？

### 58. Redis 如何实现延迟队列？

**核心答案**：Redis 实现延迟队列主要有两种方案：①使用 Sorted Set（ZSet）+ 定时轮询，将时间戳作为 score；②使用 Redis 6.2+ 的 ZADD GT/LT 选项配合 Lua 脚本。延迟队列用于延迟执行任务，如订单超时取消、定时提醒等。

**详细说明**：

**方案一：Sorted Set + 轮询（最常用）**

核心思想：
- 使用 ZSet 存储延迟任务
- score = 执行时间戳
- member = 任务数据（JSON）
- 定时扫描到期任务并执行

```bash
# 添加延迟任务（30分钟后执行）
ZADD delay_queue 1640000000 '{"order_id":"123","action":"cancel"}'
# score 是未来的时间戳

# 获取到期的任务（当前时间之前的）
ZRANGEBYSCORE delay_queue 0 1640000000 LIMIT 0 10

# 删除已处理的任务
ZREM delay_queue '{"order_id":"123","action":"cancel"}'
```

**完整实现（Lua 脚本保证原子性）**：

```lua
-- 原子地获取并删除到期任务
local tasks = redis.call('ZRANGEBYSCORE', KEYS[1], 0, ARGV[1], 'LIMIT', 0, ARGV[2])
if #tasks > 0 then
    redis.call('ZREM', KEYS[1], unpack(tasks))
end
return tasks
```

**延迟队列工作流程**：

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-delay" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="20" font-weight="bold">延迟队列实现流程</text>
<rect x="50" y="60" width="180" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
<text x="140" y="90" text-anchor="middle" font-size="14" font-weight="bold">生产者</text>
<text x="140" y="110" text-anchor="middle" font-size="12">添加延迟任务</text>
<text x="140" y="125" text-anchor="middle" font-size="11">ZADD + timestamp</text>
<rect x="360" y="60" width="180" height="200" fill="#fef3c7" stroke="#f59e0b" stroke-width="3" rx="5"/>
<text x="450" y="85" text-anchor="middle" font-size="16" font-weight="bold">Redis Sorted Set</text>
<text x="450" y="105" text-anchor="middle" font-size="13">(delay_queue)</text>
<rect x="380" y="120" width="140" height="30" fill="#fef2f2" stroke="#dc2626" stroke-width="1" rx="3"/>
<text x="390" y="138" font-size="11">score:1640000300 任务A</text>
<rect x="380" y="155" width="140" height="30" fill="#fef2f2" stroke="#dc2626" stroke-width="1" rx="3"/>
<text x="390" y="173" font-size="11">score:1640000600 任务B</text>
<rect x="380" y="190" width="140" height="30" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="3"/>
<text x="390" y="208" font-size="11">score:1639999900 任务C ✓</text>
<rect x="380" y="225" width="140" height="30" fill="#fef2f2" stroke="#dc2626" stroke-width="1" rx="3"/>
<text x="390" y="243" font-size="11">score:1640001000 任务D</text>
<rect x="670" y="60" width="180" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="760" y="90" text-anchor="middle" font-size="14" font-weight="bold">消费者（轮询）</text>
<text x="760" y="110" text-anchor="middle" font-size="12">扫描到期任务</text>
<text x="760" y="125" text-anchor="middle" font-size="11">ZRANGEBYSCORE</text>
<line x1="230" y1="100" x2="355" y2="130" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-delay)"/>
<text x="285" y="110" font-size="12" fill="#2563eb">ZADD</text>
<line x1="545" y1="130" x2="665" y2="100" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-delay)"/>
<text x="600" y="110" font-size="12" fill="#16a34a">获取到期</text>
<rect x="360" y="320" width="180" height="80" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="450" y="345" text-anchor="middle" font-size="14" font-weight="bold">定时器</text>
<text x="450" y="365" text-anchor="middle" font-size="12">每秒检查一次</text>
<text x="450" y="385" text-anchor="middle" font-size="11">now = time()</text>
<line x1="450" y1="260" x2="450" y2="315" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow-delay)"/>
<text x="465" y="290" font-size="12" fill="#6366f1">定时扫描</text>
<rect x="50" y="460" width="800" height="70" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="60" y="485" font-size="14" font-weight="bold">时间轴示例：</text>
<line x1="60" y1="505" x2="840" y2="505" stroke="#374151" stroke-width="2"/>
<circle cx="200" cy="505" r="8" fill="#16a34a"/>
<text x="200" y="495" text-anchor="middle" font-size="11">now</text>
<text x="200" y="522" text-anchor="middle" font-size="10">1640000000</text>
<circle cx="400" cy="505" r="6" fill="#f59e0b"/>
<text x="400" y="522" text-anchor="middle" font-size="10">+5min</text>
<circle cx="600" cy="505" r="6" fill="#f59e0b"/>
<text x="600" y="522" text-anchor="middle" font-size="10">+10min</text>
<circle cx="750" cy="505" r="6" fill="#f59e0b"/>
<text x="750" y="522" text-anchor="middle" font-size="10">+15min</text>
<path d="M 200 505 L 150 480" stroke="#16a34a" stroke-width="2" fill="none"/>
<text x="120" y="475" font-size="10" fill="#16a34a">可执行</text>
<path d="M 400 505 L 420 480" stroke="#dc2626" stroke-width="2" fill="none"/>
<text x="425" y="475" font-size="10" fill="#dc2626">等待中</text>
</svg>

**方案二：使用键过期事件（不推荐）**

```bash
# 开启键空间通知
CONFIG SET notify-keyspace-events Ex

# 设置带过期时间的键
SETEX task:123 1800 '{"order_id":"123"}'

# 监听过期事件
SUBSCRIBE __keyevent@0__:expired
```

**局限**：
- ❌ 过期事件不保证实时（懒删除 + 定期删除）
- ❌ 消息可能丢失（持久化问题）
- ❌ 不支持消息确认
- ❌ 主从切换可能丢事件

**方案对比**：

| 特性 | ZSet方案 | 键过期方案 |
|------|----------|-----------|
| **可靠性** | ✅ 高 | ❌ 低 |
| **精确度** | ✅ 毫秒级 | ❌ 不精确 |
| **实现难度** | 中等 | 简单 |
| **扩展性** | ✅ 好 | ❌ 差 |
| **推荐度** | ⭐⭐⭐⭐⭐ | ⭐⭐ |

**Java 实现示例（ZSet方案）**：

```java
public class RedisDelayQueue {
    private final RedisTemplate<String, String> redis;
    private static final String QUEUE_KEY = "delay_queue";

    // 添加延迟任务
    public void addTask(String taskId, String data, long delaySeconds) {
        long executeTime = System.currentTimeMillis() / 1000 + delaySeconds;
        String task = JSON.toJSONString(Map.of("id", taskId, "data", data));
        redis.opsForZSet().add(QUEUE_KEY, task, executeTime);
    }

    // 消费到期任务（原子操作）
    @Scheduled(fixedRate = 1000) // 每秒执行
    public void consumeTasks() {
        long now = System.currentTimeMillis() / 1000;

        // Lua脚本保证原子性
        String luaScript =
            "local tasks = redis.call('ZRANGEBYSCORE', KEYS[1], 0, ARGV[1], 'LIMIT', 0, 10) " +
            "if #tasks > 0 then " +
            "    redis.call('ZREM', KEYS[1], unpack(tasks)) " +
            "end " +
            "return tasks";

        List<String> tasks = redis.execute(
            new DefaultRedisScript<>(luaScript, List.class),
            Collections.singletonList(QUEUE_KEY),
            String.valueOf(now)
        );

        // 处理任务
        tasks.forEach(this::handleTask);
    }

    private void handleTask(String task) {
        // 业务逻辑
        System.out.println("执行任务: " + task);
    }
}
```

**实际应用场景**：

1. **订单超时取消**
   ```
   用户下单 → 30分钟后检查 → 未支付则取消
   ```

2. **定时消息推送**
   ```
   预约提醒 → 提前1小时推送通知
   ```

3. **会员到期提醒**
   ```
   会员即将到期 → 提前3天发送续费提醒
   ```

4. **延迟重试**
   ```
   API调用失败 → 5秒后重试 → 指数退避
   ```

**优化建议**：

1. **使用Lua脚本**：保证获取+删除的原子性
2. **分片队列**：按业务类型分多个队列，降低竞争
3. **批量处理**：一次获取多个任务，提高吞吐量
4. **幂等处理**：任务可能重复执行，需保证幂等性
5. **监控告警**：监控队列堆积情况

#### 关键要点

1. **ZSet方案**：score存时间戳，定时扫描，可靠性高
2. **原子操作**：使用Lua脚本保证获取+删除原子性
3. **幂等性**：任务可能重复，需保证幂等处理
4. **不适合超大延迟**：适合分钟/小时级，不适合天/月级

#### 记忆口诀

> **延迟队列用 ZSet，时间戳当 score 设**
> 定时扫描到期任务，Lua 脚本保原子
> 键过期不靠谱，生产环境别选它
> 订单超时和提醒，延迟队列最合适

59. 什么是 Lua 脚本？在 Redis 中如何使用？

### 59. 什么是 Lua 脚本？在 Redis 中如何使用？

**核心答案**：Lua 是一种轻量级脚本语言，Redis 支持在服务器端执行 Lua 脚本。Lua 脚本在 Redis 中的最大优势是**原子性**——整个脚本作为一个原子操作执行，不会被其他命令打断，常用于实现分布式锁、限流、复杂的原子操作等场景。

**详细说明**：

**Lua 脚本的核心特性**：

1. **原子性**
   - 整个脚本作为单个原子操作
   - 执行过程中不会插入其他命令
   - 类似事务但更灵活

2. **减少网络开销**
   - 多个命令一次提交
   - 减少客户端与服务器的往返
   - 提高性能

3. **可复用性**
   - 通过 SHA1 缓存脚本
   - EVALSHA 重复调用
   - 节省带宽

4. **服务器端计算**
   - 复杂逻辑在服务器执行
   - 减少数据传输
   - 提高效率

**基本命令**：

```bash
# 执行 Lua 脚本
EVAL script numkeys key [key ...] arg [arg ...]

# 加载脚本获取 SHA1
SCRIPT LOAD script

# 通过 SHA1 执行脚本
EVALSHA sha1 numkeys key [key ...] arg [arg ...]

# 查看已加载的脚本
SCRIPT EXISTS sha1 [sha1 ...]

# 清除所有脚本缓存
SCRIPT FLUSH

# 杀死正在运行的脚本
SCRIPT KILL
```

**脚本结构**：

```lua
-- KEYS[1], KEYS[2], ... 键名参数
-- ARGV[1], ARGV[2], ... 其他参数

-- 调用 Redis 命令
redis.call('SET', KEYS[1], ARGV[1])  -- 出错会中断
redis.pcall('SET', KEYS[1], ARGV[1]) -- 出错不中断

-- 返回结果
return result
```

**典型应用场景**：

**1. 分布式锁（原子加锁）**

```lua
-- 加锁脚本
-- KEYS[1]: 锁的key
-- ARGV[1]: 锁的value（唯一标识）
-- ARGV[2]: 过期时间（秒）

if redis.call('EXISTS', KEYS[1]) == 0 then
    redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2])
    return 1  -- 加锁成功
else
    return 0  -- 锁已存在
end
```

调用方式：
```bash
EVAL "if redis.call('EXISTS',KEYS[1])==0 then redis.call('SET',KEYS[1],ARGV[1],'EX',ARGV[2]) return 1 else return 0 end" 1 mylock uuid123 30
```

**2. 原子解锁（防止误删）**

```lua
-- 解锁脚本
-- KEYS[1]: 锁的key
-- ARGV[1]: 锁的value

if redis.call('GET', KEYS[1]) == ARGV[1] then
    return redis.call('DEL', KEYS[1])
else
    return 0  -- 不是自己的锁
end
```

**3. 限流（令牌桶/漏桶）**

```lua
-- 滑动窗口限流
-- KEYS[1]: 限流key
-- ARGV[1]: 窗口时间（秒）
-- ARGV[2]: 最大请求数
-- ARGV[3]: 当前时间戳（毫秒）

local key = KEYS[1]
local window = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

-- 移除窗口外的记录
redis.call('ZREMRANGEBYSCORE', key, 0, now - window * 1000)

-- 统计当前窗口内的请求数
local current = redis.call('ZCARD', key)

if current < limit then
    -- 添加当前请求
    redis.call('ZADD', key, now, now)
    redis.call('EXPIRE', key, window)
    return 1  -- 允许通过
else
    return 0  -- 限流
end
```

**4. 库存扣减（防止超卖）**

```lua
-- 扣减库存
-- KEYS[1]: 库存key
-- ARGV[1]: 扣减数量

local stock = tonumber(redis.call('GET', KEYS[1]) or "0")
local quantity = tonumber(ARGV[1])

if stock >= quantity then
    redis.call('DECRBY', KEYS[1], quantity)
    return 1  -- 扣减成功
else
    return 0  -- 库存不足
end
```

**Lua 脚本执行流程**：

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-lua" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="20" font-weight="bold">Lua 脚本执行流程</text>
<rect x="50" y="70" width="160" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
<text x="130" y="100" text-anchor="middle" font-size="14" font-weight="bold">客户端</text>
<text x="130" y="120" text-anchor="middle" font-size="12">发送 EVAL</text>
<text x="130" y="135" text-anchor="middle" font-size="11">+ Lua 脚本</text>
<rect x="300" y="70" width="250" height="350" fill="#fef3c7" stroke="#f59e0b" stroke-width="3" rx="5"/>
<text x="425" y="95" text-anchor="middle" font-size="16" font-weight="bold">Redis 服务器</text>
<rect x="320" y="120" width="210" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="3"/>
<text x="425" y="145" text-anchor="middle" font-size="13" font-weight="bold">1. 解析脚本</text>
<text x="425" y="165" text-anchor="middle" font-size="11">检查语法，生成 SHA1</text>
<rect x="320" y="195" width="210" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="3"/>
<text x="425" y="220" text-anchor="middle" font-size="13" font-weight="bold">2. 加载到 Lua 环境</text>
<text x="425" y="240" text-anchor="middle" font-size="11">初始化 KEYS/ARGV</text>
<rect x="320" y="270" width="210" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="3"/>
<text x="425" y="295" text-anchor="middle" font-size="13" font-weight="bold">3. 原子执行</text>
<text x="425" y="315" text-anchor="middle" font-size="11">调用 redis.call/pcall</text>
<rect x="320" y="345" width="210" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="3"/>
<text x="425" y="370" text-anchor="middle" font-size="13" font-weight="bold">4. 返回结果</text>
<text x="425" y="390" text-anchor="middle" font-size="11">序列化为 Redis 协议</text>
<rect x="640" y="70" width="210" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="745" y="100" text-anchor="middle" font-size="14" font-weight="bold">脚本缓存</text>
<text x="745" y="120" text-anchor="middle" font-size="12">SHA1 → 脚本</text>
<text x="745" y="135" text-anchor="middle" font-size="11">后续用 EVALSHA</text>
<line x1="210" y1="110" x2="295" y2="140" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-lua)"/>
<text x="250" y="120" font-size="12" fill="#2563eb">EVAL</text>
<line x1="530" y1="150" x2="635" y2="110" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-lua)" stroke-dasharray="5,5"/>
<text x="575" y="125" font-size="11" fill="#16a34a">缓存</text>
<line x1="300" y1="375" x2="215" y2="110" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-lua)"/>
<text x="240" y="250" font-size="12" fill="#16a34a">返回</text>
<rect x="50" y="280" width="160" height="120" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="130" y="305" text-anchor="middle" font-size="14" font-weight="bold">重要特性</text>
<text x="60" y="330" font-size="11">✅ 原子性保证</text>
<text x="60" y="350" font-size="11">✅ 无竞态条件</text>
<text x="60" y="370" font-size="11">✅ 减少网络IO</text>
<text x="60" y="390" font-size="11">⚠️  执行时阻塞</text>
</svg>

**Java 使用示例**：

```java
public class RedisLuaExample {
    private final RedisTemplate<String, String> redis;

    // 1. 使用 EVAL 直接执行
    public Long acquireLock(String lockKey, String uniqueId, int expireSeconds) {
        String script =
            "if redis.call('EXISTS', KEYS[1]) == 0 then " +
            "    redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2]) " +
            "    return 1 " +
            "else " +
            "    return 0 " +
            "end";

        return redis.execute(
            new DefaultRedisScript<>(script, Long.class),
            Collections.singletonList(lockKey),
            uniqueId, String.valueOf(expireSeconds)
        );
    }

    // 2. 预加载脚本（推荐）
    private static final String UNLOCK_SCRIPT =
        "if redis.call('GET', KEYS[1]) == ARGV[1] then " +
        "    return redis.call('DEL', KEYS[1]) " +
        "else " +
        "    return 0 " +
        "end";

    private static final DefaultRedisScript<Long> UNLOCK_SCRIPT_OBJ =
        new DefaultRedisScript<>(UNLOCK_SCRIPT, Long.class);

    public boolean releaseLock(String lockKey, String uniqueId) {
        Long result = redis.execute(
            UNLOCK_SCRIPT_OBJ,
            Collections.singletonList(lockKey),
            uniqueId
        );
        return result != null && result == 1;
    }
}
```

**最佳实践**：

1. **控制脚本复杂度**
   - 避免耗时操作
   - 避免死循环
   - 超过 5 秒会被 SCRIPT KILL

2. **使用 EVALSHA**
   - 预加载脚本
   - 使用 SHA1 调用
   - 节省网络带宽

3. **错误处理**
   - redis.call：出错中断
   - redis.pcall：出错返回错误

4. **参数化**
   - 使用 KEYS 和 ARGV
   - 提高脚本复用性
   - 便于缓存

5. **避免副作用**
   - 不要使用随机函数
   - 不要使用系统时间
   - 保证幂等性

**常见陷阱**：

| 问题 | 说明 | 解决方案 |
|------|------|---------|
| **长时间运行** | 阻塞 Redis | 限制脚本复杂度，超时用 SCRIPT KILL |
| **写随机数据** | 主从不一致 | 由客户端生成传入 |
| **依赖时间** | 主从时间差 | 客户端传入时间戳 |
| **访问外部资源** | 不支持 | 仅操作 Redis 数据 |

#### 关键要点

1. **原子性**：整个脚本作为原子操作，无竞态条件
2. **性能**：减少网络往返，服务器端计算
3. **场景**：分布式锁、限流、库存扣减等原子操作
4. **限制**：避免长时间运行，不支持访问外部资源

#### 记忆口诀

> **Lua 脚本保原子，复杂操作一次过**
> KEYS ARGV 要分清，call pcall 看需求
> 分布式锁和限流，库存扣减防超卖
> 避免死循环耗时，五秒超时会被杀

60. Redis 6.0 引入了哪些新特性？

### 60. Redis 6.0 引入了哪些新特性？

**核心答案**：Redis 6.0 是一个重大版本更新，主要引入了**多线程 I/O**、**ACL 访问控制列表**、**RESP3 协议**、**客户端缓存**、**SSL/TLS 支持**等关键特性，显著提升了性能、安全性和可用性。

**详细说明**：

**1. 多线程 I/O（最重要特性）**

**核心变化**：
- Redis 6.0 之前：单线程处理网络 I/O 和命令执行
- Redis 6.0 之后：多线程处理网络 I/O，单线程执行命令

**工作原理**：

<svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-v6" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">Redis 6.0 多线程 I/O 模型</text>
<rect x="50" y="80" width="300" height="280" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="200" y="105" text-anchor="middle" font-size="14" font-weight="bold">Redis 6.0 之前（单线程）</text>
<rect x="80" y="120" width="240" height="50" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="200" y="150" text-anchor="middle" font-size="12">主线程</text>
<text x="100" y="195" font-size="11">① 网络 I/O（读取请求）</text>
<text x="100" y="215" font-size="11">② 命令解析</text>
<text x="100" y="235" font-size="11">③ 命令执行</text>
<text x="100" y="255" font-size="11">④ 网络 I/O（发送响应）</text>
<text x="100" y="280" font-size="11" fill="#dc2626">⚠️ 全部串行，成为瓶颈</text>
<rect x="420" y="80" width="420" height="280" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
<text x="630" y="105" text-anchor="middle" font-size="14" font-weight="bold">Redis 6.0（多线程 I/O）</text>
<rect x="450" y="120" width="150" height="50" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="3"/>
<text x="525" y="150" text-anchor="middle" font-size="12">I/O 线程池</text>
<rect x="660" y="120" width="150" height="50" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="3"/>
<text x="735" y="150" text-anchor="middle" font-size="12">主线程</text>
<text x="460" y="195" font-size="11">① 多线程并发读取请求</text>
<line x1="600" y1="200" x2="655" y2="200" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-v6)"/>
<text x="670" y="215" font-size="11">② 命令解析</text>
<text x="670" y="235" font-size="11">③ 命令执行</text>
<text x="670" y="255" font-size="11" fill="#16a34a">（单线程保证）</text>
<line x1="660" y1="270" x2="605" y2="270" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-v6)"/>
<text x="460" y="285" font-size="11">④ 多线程并发发送响应</text>
<text x="460" y="310" font-size="11" fill="#16a34a">✅ I/O 并行，性能提升</text>
</svg>

**配置方式**：

```bash
# redis.conf 配置
io-threads 4                    # I/O 线程数（建议 CPU 核心数）
io-threads-do-reads yes         # 启用读多线程（默认只有写多线程）
```

**性能提升**：
- 读写 QPS 提升 1 倍左右
- 大 value 场景提升更明显
- 4 核 CPU 下推荐 4 个 I/O 线程

**注意**：
- 命令执行仍然是单线程
- 保证了数据的原子性
- 不需要加锁

---

**2. ACL（Access Control List）访问控制**

Redis 6.0 之前只有 `requirepass` 简单密码认证，现在支持细粒度的权限控制。

**核心功能**：
- 多用户管理
- 命令级别权限
- Key 级别权限
- 频道级别权限

**常用命令**：

```bash
# 创建用户
ACL SETUSER alice on >password123 ~cached:* +get +set

# 参数说明：
# on: 启用用户
# >password123: 设置密码
# ~cached:*: 只能访问 cached: 开头的 key
# +get +set: 只允许 GET 和 SET 命令

# 查看所有用户
ACL LIST

# 查看当前用户权限
ACL WHOAMI

# 查看用户详细信息
ACL GETUSER alice

# 删除用户
ACL DELUSER alice

# 保存 ACL 到文件
ACL SAVE
```

**示例场景**：

```bash
# 只读用户
ACL SETUSER readonly on >pass ~* +@read -@write

# 管理员用户
ACL SETUSER admin on >adminpass ~* +@all

# 应用用户（只能操作 app: 前缀的 key）
ACL SETUSER appuser on >apppass ~app:* +@all -@dangerous

# 监控用户（只能执行监控命令）
ACL SETUSER monitor on >monitorpass ~* +info +slowlog +client +ping
```

---

**3. RESP3 协议（Redis Serialization Protocol 3）**

新的客户端-服务器通信协议，功能更强大。

**新特性**：
- 支持更多数据类型（布尔、双精度浮点）
- 支持字典类型（有序键值对）
- 支持流式数据
- 更好的客户端缓存支持

**启用方式**：

```bash
# 客户端升级到 RESP3
HELLO 3

# 使用新类型
HGETALL user:1  # 返回字典类型而不是平坦数组
```

---

**4. 客户端缓存（Client-side Caching）**

服务器主动通知客户端缓存失效，提升性能。

**工作原理**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-cache" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#2563eb"/></marker></defs>
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">客户端缓存机制</text>
<rect x="50" y="70" width="180" height="100" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="5"/>
<text x="140" y="95" text-anchor="middle" font-size="14" font-weight="bold">客户端</text>
<text x="140" y="115" text-anchor="middle" font-size="12">本地缓存</text>
<text x="140" y="135" text-anchor="middle" font-size="11">user:1 = "Alice"</text>
<rect x="350" y="70" width="180" height="100" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
<text x="440" y="95" text-anchor="middle" font-size="14" font-weight="bold">Redis 服务器</text>
<text x="440" y="115" text-anchor="middle" font-size="12">追踪 key</text>
<text x="440" y="135" text-anchor="middle" font-size="11">user:1 被客户端缓存</text>
<rect x="620" y="70" width="150" height="100" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="695" y="95" text-anchor="middle" font-size="14" font-weight="bold">其他客户端</text>
<text x="695" y="115" text-anchor="middle" font-size="12">修改数据</text>
<text x="695" y="135" text-anchor="middle" font-size="11">SET user:1 "Bob"</text>
<line x1="230" y1="100" x2="345" y2="100" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-cache)"/>
<text x="280" y="95" font-size="11" fill="#2563eb">① TRACKING</text>
<line x1="620" y1="130" x2="535" y2="130" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-cache)"/>
<text x="570" y="125" font-size="11" fill="#dc2626">② 修改</text>
<line x1="350" y1="160" x2="235" y2="180" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-cache)"/>
<text x="285" y="175" font-size="11" fill="#16a34a">③ 失效通知</text>
<rect x="50" y="220" width="700" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="70" y="245" font-size="12" font-weight="bold">优点：</text>
<text x="70" y="265" font-size="11">✅ 减少 Redis 访问压力   ✅ 降低延迟   ✅ 服务器主动推送失效</text>
</svg>

**启用方式**：

```bash
# 启用客户端缓存追踪
CLIENT TRACKING ON

# 读取数据（会被追踪）
GET user:1

# 其他客户端修改数据时，服务器会发送失效通知
# 收到通知：INVALIDATE user:1
```

---

**5. SSL/TLS 支持**

**功能**：
- 加密客户端与服务器之间的通信
- 防止中间人攻击
- 保护敏感数据

**配置**：

```bash
# redis.conf
port 0                              # 禁用普通端口
tls-port 6380                       # 启用 TLS 端口
tls-cert-file /path/to/redis.crt    # 证书
tls-key-file /path/to/redis.key     # 私钥
tls-ca-cert-file /path/to/ca.crt    # CA 证书
```

---

**6. 其他改进**

| 特性 | 说明 |
|------|------|
| **STRALGO** | 字符串算法（LCS 最长公共子序列） |
| **Disque 功能** | 部分消息队列功能合并到 Redis |
| **RDB 改进** | 更快的 RDB 加载速度 |
| **过期字典优化** | 更高效的过期键删除 |
| **INFO 增强** | 更详细的服务器信息 |

---

**版本对比总结**：

| 特性 | Redis 5.x | Redis 6.0 |
|------|-----------|-----------|
| **I/O 模型** | 单线程 | 多线程 I/O |
| **权限控制** | 简单密码 | ACL 细粒度权限 |
| **协议** | RESP2 | RESP3 |
| **客户端缓存** | ❌ | ✅ |
| **SSL/TLS** | ❌ | ✅ |
| **性能** | 基准 | 提升 1-2 倍 |

#### 关键要点

1. **多线程 I/O**：I/O 并行，命令执行单线程，性能大幅提升
2. **ACL**：企业级权限管理，支持多用户和细粒度控制
3. **客户端缓存**：服务器主动推送失效，减少延迟
4. **向后兼容**：Redis 6.0 完全兼容旧版本

#### 记忆口诀

> **Redis 6.0 五大特性，多线程 ACL 和协议**
> I/O 并行性能翻倍，权限控制更细致
> 客户端缓存推失效，SSL 加密保安全
> RESP3 协议更强大，企业生产首选它
