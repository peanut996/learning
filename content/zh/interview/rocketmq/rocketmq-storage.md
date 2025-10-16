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
