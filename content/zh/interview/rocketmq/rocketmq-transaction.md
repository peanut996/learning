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
