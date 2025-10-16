## 消息过滤

### 52. RocketMQ 支持哪些消息过滤方式？

**核心答案:**

RocketMQ 支持 **3 种消息过滤方式**：
1. **Tag 过滤** - 基于消息标签的简单过滤
2. **SQL92 过滤** - 基于 SQL 语法的属性过滤
3. **Filter Server 过滤** - 自定义过滤逻辑（已废弃）

**详细说明:**

**1. 三种过滤方式对比**

<svg viewBox="0 0 850 380" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 消息过滤方式</text>
<rect x="50" y="60" width="240" height="280" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="170" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976D2">1. Tag 过滤</text>
<text x="170" y="110" font-size="10" fill="#424242" font-weight="bold">特点:</text>
<text x="170" y="130" font-size="9" fill="#424242">• 简单高效</text>
<text x="170" y="146" font-size="9" fill="#424242">• 支持单 Tag 或多 Tag</text>
<text x="170" y="162" font-size="9" fill="#424242">• Broker 端过滤</text>
<text x="170" y="178" font-size="9" fill="#424242">• 性能最好</text>
<text x="170" y="202" font-size="10" fill="#424242" font-weight="bold">使用场景:</text>
<text x="170" y="222" font-size="9" fill="#424242">• 按业务类型过滤</text>
<text x="170" y="238" font-size="9" fill="#424242">• 订单状态分类</text>
<text x="170" y="254" font-size="9" fill="#424242">• 消息级别划分</text>
<text x="170" y="278" font-size="10" fill="#1976D2" font-weight="bold">推荐指数: ★★★★★</text>
<text x="170" y="298" font-size="8" fill="#7F8C8D">最常用，性能最优</text>
<text x="170" y="320" font-size="9" fill="#2E7D32" font-weight="bold">✓ 推荐使用</text>
<rect x="310" y="60" width="240" height="280" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="430" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">2. SQL92 过滤</text>
<text x="430" y="110" font-size="10" fill="#424242" font-weight="bold">特点:</text>
<text x="430" y="130" font-size="9" fill="#424242">• 功能强大灵活</text>
<text x="430" y="146" font-size="9" fill="#424242">• 支持复杂条件</text>
<text x="430" y="162" font-size="9" fill="#424242">• Broker 端过滤</text>
<text x="430" y="178" font-size="9" fill="#424242">• 需开启配置</text>
<text x="430" y="202" font-size="10" fill="#424242" font-weight="bold">使用场景:</text>
<text x="430" y="222" font-size="9" fill="#424242">• 多条件组合过滤</text>
<text x="430" y="238" font-size="9" fill="#424242">• 数值范围判断</text>
<text x="430" y="254" font-size="9" fill="#424242">• 复杂业务逻辑</text>
<text x="430" y="278" font-size="10" fill="#2E7D32" font-weight="bold">推荐指数: ★★★★☆</text>
<text x="430" y="298" font-size="8" fill="#7F8C8D">功能强大，略耗性能</text>
<text x="430" y="320" font-size="9" fill="#FF9800" font-weight="bold">⚡ 按需使用</text>
<rect x="570" y="60" width="240" height="280" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="690" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#F57C00">3. Filter Server</text>
<text x="690" y="110" font-size="10" fill="#424242" font-weight="bold">特点:</text>
<text x="690" y="130" font-size="9" fill="#424242">• 完全自定义逻辑</text>
<text x="690" y="146" font-size="9" fill="#424242">• 独立进程过滤</text>
<text x="690" y="162" font-size="9" fill="#424242">• 部署复杂</text>
<text x="690" y="178" font-size="9" fill="#424242">• 性能开销大</text>
<text x="690" y="202" font-size="10" fill="#424242" font-weight="bold">使用场景:</text>
<text x="690" y="222" font-size="9" fill="#424242">• 极复杂过滤逻辑</text>
<text x="690" y="238" font-size="9" fill="#424242">• 需要远程调用</text>
<text x="690" y="254" font-size="9" fill="#424242">• 特殊业务需求</text>
<text x="690" y="278" font-size="10" fill="#F57C00" font-weight="bold">推荐指数: ★☆☆☆☆</text>
<text x="690" y="298" font-size="8" fill="#7F8C8D">已废弃，不推荐</text>
<text x="690" y="320" font-size="9" fill="#E74C3C" font-weight="bold">✗ 已废弃</text>
</svg>

**2. 过滤方式详细对比**

| 对比维度 | Tag 过滤 | SQL92 过滤 | Filter Server |
|---------|---------|-----------|---------------|
| **过滤位置** | Broker 端 | Broker 端 | 独立进程 |
| **性能** | 高 ⚡⚡⚡ | 中 ⚡⚡ | 低 ⚡ |
| **灵活性** | 低 | 高 | 极高 |
| **实现复杂度** | 简单 | 中等 | 复杂 |
| **网络开销** | 小 | 小 | 大 |
| **配置要求** | 无 | 需开启 | 需部署 |
| **维护成本** | 低 | 低 | 高 |
| **推荐程度** | ★★★★★ | ★★★★☆ | ✗ 已废弃 |

**3. 过滤流程对比**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="ar" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#34495E"/>
</marker>
</defs>
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">消息过滤执行流程</text>
<rect x="50" y="60" width="340" height="140" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="220" y="82" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">Tag 过滤流程</text>
<rect x="70" y="95" width="90" height="40" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="115" y="118" text-anchor="middle" font-size="9" fill="#0D47A1">Producer 发送</text>
<rect x="175" y="95" width="90" height="40" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="220" y="110" text-anchor="middle" font-size="9" fill="#0D47A1">Broker 存储</text>
<text x="220" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(带 Tag)</text>
<rect x="280" y="95" width="90" height="40" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="325" y="110" text-anchor="middle" font-size="9" fill="#0D47A1">Consumer 拉取</text>
<text x="325" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(指定 Tag)</text>
<path d="M 160 115 L 170 115" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<path d="M 265 115 L 275 115" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<text x="220" y="160" text-anchor="middle" font-size="9" fill="#2E7D32" font-weight="bold">✓ Broker 端 HashCode 匹配，快速过滤</text>
<text x="220" y="178" text-anchor="middle" font-size="8" fill="#7F8C8D">只返回匹配 Tag 的消息</text>
<rect x="410" y="60" width="340" height="140" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="580" y="82" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">SQL92 过滤流程</text>
<rect x="430" y="95" width="90" height="40" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="475" y="110" text-anchor="middle" font-size="9" fill="#1B5E20">Producer 发送</text>
<text x="475" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(设置属性)</text>
<rect x="535" y="95" width="90" height="40" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="580" y="110" text-anchor="middle" font-size="9" fill="#1B5E20">Broker 存储</text>
<text x="580" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(带属性)</text>
<rect x="640" y="95" width="90" height="40" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="685" y="110" text-anchor="middle" font-size="9" fill="#1B5E20">Consumer 拉取</text>
<text x="685" y="125" text-anchor="middle" font-size="8" fill="#7F8C8D">(SQL 表达式)</text>
<path d="M 520 115 L 530 115" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<path d="M 625 115 L 635 115" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<text x="580" y="160" text-anchor="middle" font-size="9" fill="#2E7D32" font-weight="bold">✓ Broker 端 SQL 表达式计算</text>
<text x="580" y="178" text-anchor="middle" font-size="8" fill="#7F8C8D">只返回满足条件的消息</text>
<rect x="50" y="220" width="700" height="160" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="242" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">Filter Server 过滤流程 (已废弃)</text>
<rect x="70" y="255" width="80" height="40" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="110" y="278" text-anchor="middle" font-size="9" fill="#E65100">Producer</text>
<rect x="170" y="255" width="80" height="40" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="210" y="278" text-anchor="middle" font-size="9" fill="#E65100">Broker</text>
<rect x="270" y="255" width="80" height="40" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="310" y="270" text-anchor="middle" font-size="9" fill="#E65100">Filter Server</text>
<text x="310" y="285" text-anchor="middle" font-size="7" fill="#7F8C8D">(独立进程)</text>
<rect x="370" y="255" width="80" height="40" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="410" y="270" text-anchor="middle" font-size="9" fill="#E65100">执行自定义</text>
<text x="410" y="285" text-anchor="middle" font-size="7" fill="#7F8C8D">过滤逻辑</text>
<rect x="470" y="255" width="80" height="40" fill="#FFE0B2" stroke="#F57C00" stroke-width="1" rx="3"/>
<text x="510" y="278" text-anchor="middle" font-size="9" fill="#E65100">Consumer</text>
<path d="M 150 275 L 165 275" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<path d="M 250 275 L 265 275" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<path d="M 350 275 L 365 275" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<path d="M 450 275 L 465 275" stroke="#34495E" stroke-width="2" marker-end="url(#ar)"/>
<text x="400" y="320" text-anchor="middle" font-size="9" fill="#E74C3C" font-weight="bold">✗ 性能差，部署复杂，已废弃</text>
<text x="400" y="338" text-anchor="middle" font-size="8" fill="#7F8C8D">需要额外部署 Filter Server 进程</text>
<text x="400" y="356" text-anchor="middle" font-size="8" fill="#7F8C8D">建议使用 SQL92 过滤替代</text>
</svg>

**4. 选择建议**

<svg viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg">
<text x="375" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">过滤方式选择指南</text>
<rect x="50" y="50" width="650" height="70" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="375" y="72" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">优先使用 Tag 过滤</text>
<text x="375" y="92" font-size="9" fill="#424242">• 简单场景，按单一维度过滤 (如订单类型、消息级别)</text>
<text x="375" y="108" font-size="9" fill="#424242">• 性能要求高，需要快速过滤大量消息</text>
<rect x="50" y="135" width="650" height="70" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="375" y="157" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57F17">复杂场景使用 SQL92</text>
<text x="375" y="177" font-size="9" fill="#424242">• 需要多条件组合过滤 (如 price > 100 AND region = 'CN')</text>
<text x="375" y="193" font-size="9" fill="#424242">• 需要数值比较、范围判断等复杂逻辑</text>
<rect x="50" y="220" width="650" height="50" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="375" y="242" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">避免使用 Filter Server</text>
<text x="375" y="260" font-size="9" fill="#424242">• 已废弃，不推荐使用，使用 SQL92 替代</text>
</svg>

**5. 代码示例**

```java
// 1. Tag 过滤
// Producer 发送
Message msg = new Message("OrderTopic", "TagA", "订单消息".getBytes());
producer.send(msg);

// Consumer 订阅
consumer.subscribe("OrderTopic", "TagA || TagB");  // 订阅 TagA 或 TagB

// 2. SQL92 过滤
// Producer 发送
Message msg = new Message("OrderTopic", "订单消息".getBytes());
msg.putUserProperty("price", "150");
msg.putUserProperty("region", "CN");
producer.send(msg);

// Consumer 订阅 (需要开启 Broker SQL 过滤配置)
consumer.subscribe("OrderTopic",
    MessageSelector.bySql("price > 100 AND region = 'CN'"));
```

**关键要点:**

1. **Tag 过滤**: 最常用，性能最好，适合简单场景
2. **SQL92 过滤**: 功能强大，适合复杂条件组合
3. **过滤位置**: 都在 Broker 端过滤，减少网络传输
4. **Filter Server**: 已废弃，不推荐使用
5. **选择原则**: 优先 Tag，复杂场景用 SQL92

**记忆口诀:**

```
三种过滤要分清
Tag简单又高效
SQL功能很强大
Filter已废弃掉
Broker端来过滤
减少网络传输量
按需选择最适当
```

### 53. 什么是 Tag 过滤和 SQL92 过滤？

**核心答案:**

- **Tag 过滤**: 基于消息标签的简单字符串匹配过滤，通过 HashCode 快速匹配，性能高
- **SQL92 过滤**: 基于 SQL 语法的属性过滤，支持复杂表达式和多条件组合，功能强大

**详细说明:**

**1. Tag 过滤详解**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Tag 过滤机制</text>
<rect x="50" y="60" width="700" height="120" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">Tag 过滤核心特点</text>
<rect x="80" y="100" width="200" height="60" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="180" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">HashCode 匹配</text>
<text x="180" y="138" font-size="8" fill="#424242">• Tag 转为 HashCode</text>
<text x="180" y="152" font-size="8" fill="#424242">• O(1) 时间复杂度</text>
<rect x="300" y="100" width="200" height="60" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="400" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">Broker 端过滤</text>
<text x="400" y="138" font-size="8" fill="#424242">• 减少网络传输</text>
<text x="400" y="152" font-size="8" fill="#424242">• 提高消费效率</text>
<rect x="520" y="100" width="200" height="60" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="620" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">支持多 Tag</text>
<text x="620" y="138" font-size="8" fill="#424242">• || 表示 OR 关系</text>
<text x="620" y="152" font-size="8" fill="#424242">• * 表示订阅所有</text>
<rect x="50" y="200" width="340" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="220" y="225" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">Tag 过滤工作原理</text>
<text x="220" y="250" font-size="9" fill="#424242">① Producer 发送消息时设置 Tag</text>
<text x="220" y="268" font-size="9" fill="#424242">② Broker 计算 Tag 的 HashCode</text>
<text x="220" y="286" font-size="9" fill="#424242">③ 存储在 ConsumeQueue 索引中</text>
<text x="220" y="304" font-size="9" fill="#424242">④ Consumer 订阅时指定 Tag</text>
<text x="220" y="322" font-size="9" fill="#424242">⑤ Broker 根据 HashCode 快速匹配</text>
<text x="220" y="340" font-size="9" fill="#424242">⑥ 只返回匹配的消息</text>
<text x="220" y="365" font-size="9" fill="#2E7D32" font-weight="bold">✓ 性能: O(1) 快速查找</text>
<rect x="410" y="200" width="340" height="180" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="580" y="225" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">Tag 过滤限制</text>
<text x="580" y="250" font-size="9" fill="#424242">• 只支持单一维度过滤</text>
<text x="580" y="268" font-size="9" fill="#424242">• 不支持 AND 逻辑</text>
<text x="580" y="286" font-size="9" fill="#424242">• 不支持数值比较</text>
<text x="580" y="304" font-size="9" fill="#424242">• 不支持范围查询</text>
<text x="580" y="330" font-size="9" fill="#E74C3C" font-weight="bold">示例:</text>
<text x="580" y="348" font-size="8" fill="#7F8C8D">✓ 支持: TagA || TagB</text>
<text x="580" y="363" font-size="8" fill="#7F8C8D">✗ 不支持: TagA &amp;&amp; TagB</text>
</svg>

**2. SQL92 过滤详解**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">SQL92 过滤机制</text>
<rect x="50" y="60" width="700" height="140" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">SQL92 过滤核心特点</text>
<rect x="80" y="100" width="200" height="80" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="180" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#1B5E20">SQL 语法</text>
<text x="180" y="138" font-size="8" fill="#424242">• 支持 AND/OR/NOT</text>
<text x="180" y="152" font-size="8" fill="#424242">• 支持比较运算符</text>
<text x="180" y="166" font-size="8" fill="#424242">• 支持 IN/BETWEEN</text>
<rect x="300" y="100" width="200" height="80" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="400" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#1B5E20">属性过滤</text>
<text x="400" y="138" font-size="8" fill="#424242">• 用户自定义属性</text>
<text x="400" y="152" font-size="8" fill="#424242">• 数值/字符串比较</text>
<text x="400" y="166" font-size="8" fill="#424242">• 复杂条件组合</text>
<rect x="520" y="100" width="200" height="80" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1" rx="3"/>
<text x="620" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#1B5E20">Broker 计算</text>
<text x="620" y="138" font-size="8" fill="#424242">• 表达式预编译</text>
<text x="620" y="152" font-size="8" fill="#424242">• 运行时计算</text>
<text x="620" y="166" font-size="8" fill="#424242">• 布尔值判断</text>
<rect x="50" y="220" width="340" height="180" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="220" y="245" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">SQL92 过滤工作原理</text>
<text x="220" y="270" font-size="9" fill="#424242">① Producer 设置用户属性</text>
<text x="220" y="288" font-size="9" fill="#424242">② Broker 存储消息和属性</text>
<text x="220" y="306" font-size="9" fill="#424242">③ Consumer 指定 SQL 表达式</text>
<text x="220" y="324" font-size="9" fill="#424242">④ Broker 编译 SQL 表达式</text>
<text x="220" y="342" font-size="9" fill="#424242">⑤ 逐条计算消息是否匹配</text>
<text x="220" y="360" font-size="9" fill="#424242">⑥ 返回满足条件的消息</text>
<text x="220" y="385" font-size="9" fill="#9C27B0" font-weight="bold">✓ 功能: 支持复杂逻辑</text>
<rect x="410" y="220" width="340" height="180" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="580" y="245" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57F17">SQL92 支持的语法</text>
<text x="580" y="270" font-size="9" fill="#424242">• 逻辑运算: AND, OR, NOT</text>
<text x="580" y="288" font-size="9" fill="#424242">• 比较运算: &gt;, &gt;=, &lt;, &lt;=, =, !=</text>
<text x="580" y="306" font-size="9" fill="#424242">• 范围判断: BETWEEN...AND</text>
<text x="580" y="324" font-size="9" fill="#424242">• 集合判断: IN (val1, val2)</text>
<text x="580" y="342" font-size="9" fill="#424242">• NULL 判断: IS NULL, IS NOT NULL</text>
<text x="580" y="368" font-size="9" fill="#F57F17" font-weight="bold">示例:</text>
<text x="580" y="386" font-size="8" fill="#7F8C8D">price &gt; 100 AND region = 'CN'</text>
</svg>

**3. Tag 与 SQL92 对比**

| 对比维度 | Tag 过滤 | SQL92 过滤 |
|---------|---------|-----------|
| **匹配方式** | HashCode 匹配 | SQL 表达式计算 |
| **时间复杂度** | O(1) | O(n) n=属性数量 |
| **性能** | 极高 | 中等 |
| **支持逻辑** | OR (用 \|\|) | AND, OR, NOT |
| **比较运算** | 不支持 | 支持 >, <, =, != 等 |
| **范围查询** | 不支持 | 支持 BETWEEN, IN |
| **配置要求** | 无 | 需开启配置 |
| **使用场景** | 简单分类过滤 | 复杂条件组合 |
| **典型示例** | TagA \|\| TagB | price > 100 AND region = 'CN' |

**4. 使用场景对比**

<svg viewBox="0 0 750 350" xmlns="http://www.w3.org/2000/svg">
<text x="375" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Tag 与 SQL92 场景选择</text>
<rect x="50" y="60" width="650" height="130" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="375" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">Tag 过滤适用场景</text>
<text x="375" y="105" font-size="9" fill="#424242">• 订单类型分类: 普通订单、会员订单、秒杀订单</text>
<text x="375" y="122" font-size="9" fill="#424242">• 消息级别划分: INFO、WARN、ERROR</text>
<text x="375" y="139" font-size="9" fill="#424242">• 业务模块分类: 支付、物流、库存</text>
<text x="375" y="156" font-size="9" fill="#424242">• 用户分组: VIP、普通用户</text>
<text x="375" y="175" font-size="9" fill="#2E7D32" font-weight="bold">✓ 特点: 单一维度，简单分类</text>
<rect x="50" y="210" width="650" height="130" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="375" y="232" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">SQL92 过滤适用场景</text>
<text x="375" y="255" font-size="9" fill="#424242">• 价格范围筛选: price &gt; 100 AND price &lt; 500</text>
<text x="375" y="272" font-size="9" fill="#424242">• 区域+级别组合: region = 'CN' AND level &gt;= 3</text>
<text x="375" y="289" font-size="9" fill="#424242">• 时间范围过滤: timestamp BETWEEN 1000 AND 2000</text>
<text x="375" y="306" font-size="9" fill="#424242">• 多条件组合: age &gt; 18 AND city IN ('Beijing', 'Shanghai')</text>
<text x="375" y="325" font-size="9" fill="#2E7D32" font-weight="bold">✓ 特点: 多维度，复杂逻辑</text>
</svg>

**5. 代码示例对比**

```java
// Tag 过滤示例
// Producer
Message msg = new Message("OrderTopic", "VIP_ORDER", "订单数据".getBytes());
producer.send(msg);

// Consumer
consumer.subscribe("OrderTopic", "VIP_ORDER || NORMAL_ORDER");

// SQL92 过滤示例
// Producer
Message msg = new Message("OrderTopic", "订单数据".getBytes());
msg.putUserProperty("price", "150");
msg.putUserProperty("region", "CN");
msg.putUserProperty("vipLevel", "3");
producer.send(msg);

// Consumer (需要开启 Broker 配置: enablePropertyFilter=true)
consumer.subscribe("OrderTopic",
    MessageSelector.bySql("price > 100 AND region = 'CN' AND vipLevel >= 2"));
```

**关键要点:**

1. **Tag 过滤**: HashCode 快速匹配，性能最优，适合简单分类
2. **SQL92 过滤**: SQL 表达式计算，功能强大，适合复杂条件
3. **过滤位置**: 都在 Broker 端过滤，减少网络传输
4. **选择原则**: 能用 Tag 就用 Tag，复杂需求才用 SQL92
5. **配置要求**: SQL92 需要开启 Broker 配置 enablePropertyFilter=true

**记忆口诀:**

```
Tag过滤哈希快
SQL语法功能强
简单场景用Tag
复杂逻辑SQL上
Broker端来过滤
性能网络都优良
```

### 54. 如何使用 Tag 进行消息过滤？

**核心答案:**

Tag 过滤分为三步：
1. **Producer 发送时设置 Tag**
2. **Consumer 订阅时指定 Tag 表达式**
3. **Broker 根据 HashCode 快速匹配返回**

**详细说明:**

**1. Producer 发送消息设置 Tag**

```java
// 方式1: 构造函数设置 Tag
Message msg = new Message(
    "OrderTopic",        // Topic
    "VIP_ORDER",         // Tag
    "订单数据".getBytes() // Body
);
producer.send(msg);

// 方式2: setTags 方法设置
Message msg = new Message("OrderTopic", "订单数据".getBytes());
msg.setTags("VIP_ORDER");
producer.send(msg);
```

**2. Consumer 订阅时指定 Tag**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Tag 订阅语法</text>
<rect x="50" y="60" width="700" height="140" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">Tag 订阅表达式</text>
<rect x="80" y="105" width="200" height="75" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="180" y="125" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">单个 Tag</text>
<text x="180" y="145" font-family="monospace" font-size="9" fill="#C62828">"TagA"</text>
<text x="180" y="163" font-size="8" fill="#7F8C8D">只订阅 TagA 消息</text>
<rect x="300" y="105" width="200" height="75" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="400" y="125" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">多个 Tag (OR)</text>
<text x="400" y="145" font-family="monospace" font-size="9" fill="#C62828">"TagA || TagB"</text>
<text x="400" y="163" font-size="8" fill="#7F8C8D">订阅 TagA 或 TagB</text>
<rect x="520" y="105" width="200" height="75" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="620" y="125" text-anchor="middle" font-size="10" font-weight="bold" fill="#0D47A1">订阅所有</text>
<text x="620" y="145" font-family="monospace" font-size="9" fill="#C62828">"*" 或 null</text>
<text x="620" y="163" font-size="8" fill="#7F8C8D">订阅所有 Tag</text>
<rect x="50" y="220" width="340" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="220" y="245" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">订阅代码示例</text>
<text x="220" y="270" font-family="monospace" font-size="9" fill="#424242">// 订阅单个 Tag</text>
<text x="220" y="286" font-family="monospace" font-size="9" fill="#2E7D32">consumer.subscribe("OrderTopic", "VIP");</text>
<text x="220" y="310" font-family="monospace" font-size="9" fill="#424242">// 订阅多个 Tag</text>
<text x="220" y="326" font-family="monospace" font-size="9" fill="#2E7D32">consumer.subscribe("OrderTopic",</text>
<text x="220" y="342" font-family="monospace" font-size="9" fill="#2E7D32">  "VIP || NORMAL || SECKILL");</text>
<text x="220" y="366" font-family="monospace" font-size="9" fill="#424242">// 订阅所有 Tag</text>
<text x="220" y="382" font-family="monospace" font-size="9" fill="#2E7D32">consumer.subscribe("OrderTopic", "*");</text>
<rect x="410" y="220" width="340" height="180" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="580" y="245" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">注意事项</text>
<text x="580" y="270" font-size="9" fill="#424242">✓ 支持: || (OR 逻辑)</text>
<text x="580" y="288" font-size="9" fill="#424242">✗ 不支持: &amp;&amp; (AND 逻辑)</text>
<text x="580" y="306" font-size="9" fill="#424242">✗ 不支持: ! (NOT 逻辑)</text>
<text x="580" y="324" font-size="9" fill="#424242">✗ 不支持: 正则表达式</text>
<text x="580" y="350" font-size="9" fill="#E74C3C" font-weight="bold">错误示例:</text>
<text x="580" y="368" font-family="monospace" font-size="8" fill="#7F8C8D">"TagA &amp;&amp; TagB" // 错误!</text>
<text x="580" y="383" font-family="monospace" font-size="8" fill="#7F8C8D">"!TagA" // 错误!</text>
</svg>

**3. 完整使用示例**

```java
// ========== Producer 端 ==========
public class TagProducer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        // 发送不同 Tag 的消息
        // VIP 订单
        Message vipMsg = new Message("OrderTopic", "VIP_ORDER",
            "VIP用户订单数据".getBytes());
        producer.send(vipMsg);

        // 普通订单
        Message normalMsg = new Message("OrderTopic", "NORMAL_ORDER",
            "普通用户订单数据".getBytes());
        producer.send(normalMsg);

        // 秒杀订单
        Message seckillMsg = new Message("OrderTopic", "SECKILL_ORDER",
            "秒杀订单数据".getBytes());
        producer.send(seckillMsg);

        producer.shutdown();
    }
}

// ========== Consumer 端 ==========
public class TagConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");

        // 场景1: 只消费 VIP 订单
        consumer.subscribe("OrderTopic", "VIP_ORDER");

        // 场景2: 消费 VIP 和秒杀订单
        // consumer.subscribe("OrderTopic", "VIP_ORDER || SECKILL_ORDER");

        // 场景3: 消费所有订单
        // consumer.subscribe("OrderTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    String tag = msg.getTags();
                    String body = new String(msg.getBody());
                    System.out.println("接收到 Tag=" + tag + ", 内容=" + body);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("Consumer 启动成功");
    }
}
```

**4. Tag 过滤实战场景**

<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Tag 过滤实战场景</text>
<rect x="50" y="50" width="700" height="420" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">场景1: 订单系统</text>
<rect x="80" y="90" width="200" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="180" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">Producer</text>
<text x="180" y="128" font-size="8" fill="#424242">VIP_ORDER</text>
<text x="180" y="142" font-size="8" fill="#424242">NORMAL_ORDER</text>
<text x="180" y="156" font-size="8" fill="#424242">SECKILL_ORDER</text>
<rect x="300" y="90" width="200" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="400" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Consumer1</text>
<text x="400" y="128" font-size="8" fill="#424242">订阅: VIP_ORDER</text>
<text x="400" y="142" font-size="8" fill="#7F8C8D">只处理 VIP 订单</text>
<text x="400" y="156" font-size="8" fill="#7F8C8D">优先发货</text>
<rect x="520" y="90" width="200" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="620" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="#F57C00">Consumer2</text>
<text x="620" y="128" font-size="8" fill="#424242">订阅: *</text>
<text x="620" y="142" font-size="8" fill="#7F8C8D">处理所有订单</text>
<text x="620" y="156" font-size="8" fill="#7F8C8D">统计分析</text>
<text x="400" y="195" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">场景2: 日志系统</text>
<rect x="80" y="210" width="200" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="180" y="230" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">Producer</text>
<text x="180" y="248" font-size="8" fill="#424242">INFO</text>
<text x="180" y="262" font-size="8" fill="#424242">WARN</text>
<text x="180" y="276" font-size="8" fill="#424242">ERROR</text>
<rect x="300" y="210" width="200" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="1" rx="3"/>
<text x="400" y="230" text-anchor="middle" font-size="10" font-weight="bold" fill="#C62828">Consumer1</text>
<text x="400" y="248" font-size="8" fill="#424242">订阅: ERROR</text>
<text x="400" y="262" font-size="8" fill="#7F8C8D">只处理错误日志</text>
<text x="400" y="276" font-size="8" fill="#7F8C8D">发送告警</text>
<rect x="520" y="210" width="200" height="80" fill="#FFF9C4" stroke="#FBC02D" stroke-width="1" rx="3"/>
<text x="620" y="230" text-anchor="middle" font-size="10" font-weight="bold" fill="#F57F17">Consumer2</text>
<text x="620" y="248" font-size="8" fill="#424242">订阅: WARN || ERROR</text>
<text x="620" y="262" font-size="8" fill="#7F8C8D">处理警告和错误</text>
<text x="620" y="276" font-size="8" fill="#7F8C8D">记录到数据库</text>
<text x="400" y="315" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">场景3: 支付系统</text>
<rect x="80" y="330" width="200" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="180" y="350" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">Producer</text>
<text x="180" y="368" font-size="8" fill="#424242">PAY_SUCCESS</text>
<text x="180" y="382" font-size="8" fill="#424242">PAY_FAIL</text>
<text x="180" y="396" font-size="8" fill="#424242">REFUND</text>
<rect x="300" y="330" width="200" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="400" y="350" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Consumer1</text>
<text x="400" y="368" font-size="8" fill="#424242">订阅: PAY_SUCCESS</text>
<text x="400" y="382" font-size="8" fill="#7F8C8D">发货通知</text>
<text x="400" y="396" font-size="8" fill="#7F8C8D">增加积分</text>
<rect x="520" y="330" width="200" height="80" fill="#F3E5F5" stroke="#9C27B0" stroke-width="1" rx="3"/>
<text x="620" y="350" text-anchor="middle" font-size="10" font-weight="bold" fill="#7B1FA2">Consumer2</text>
<text x="620" y="368" font-size="8" fill="#424242">订阅: PAY_FAIL</text>
<text x="620" y="382" font-size="8" fill="#7F8C8D">重试支付</text>
<text x="620" y="396" font-size="8" fill="#7F8C8D">通知用户</text>
<text x="400" y="435" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">✓ Tag 过滤适合按业务类型分类的场景</text>
<text x="400" y="455" text-anchor="middle" font-size="9" fill="#7F8C8D">简单、高效、易于维护</text>
</svg>

**5. Tag 过滤最佳实践**

| 最佳实践 | 说明 | 示例 |
|---------|------|------|
| **Tag 命名规范** | 使用大写+下划线，语义清晰 | VIP_ORDER, PAY_SUCCESS |
| **Tag 不宜过多** | 建议单个 Topic 不超过 10 个 Tag | 避免管理混乱 |
| **避免动态 Tag** | Tag 应该是预定义的常量 | 不要用 userId 作为 Tag |
| **订阅使用常量** | 避免硬编码字符串 | `static final String TAG_VIP = "VIP_ORDER"` |
| **合理使用 * ** | 只在真正需要所有消息时使用 | 统计、监控场景 |
| **Consumer 区分** | 不同消费逻辑用不同 ConsumerGroup | 避免相互影响 |

**关键要点:**

1. **发送设置**: Message 构造函数或 setTags() 方法设置 Tag
2. **订阅语法**: 单 Tag 直接字符串，多 Tag 用 || 分隔，* 表示所有
3. **过滤位置**: Broker 端根据 HashCode 快速过滤
4. **性能最优**: O(1) 时间复杂度，适合高并发场景
5. **局限性**: 只支持 OR 逻辑，不支持 AND/NOT

**记忆口诀:**

```
Producer设Tag
Consumer订阅它
单个直接写
多个竖线连
星号订全部
Broker快速滤
哈希O(1)查
性能最优化
```

### 55. 如何使用 SQL92 进行消息过滤？
**核心答案:**

SQL92 过滤分为四步：
1. **Broker 开启 SQL 过滤配置**
2. **Producer 设置消息属性**
3. **Consumer 使用 SQL 表达式订阅**
4. **Broker 计算表达式返回匹配消息**

**详细说明:**

**1. Broker 开启 SQL 过滤配置**

```properties
# broker.conf 配置文件
# 开启 SQL92 过滤支持
enablePropertyFilter=true
```

```bash
# 启动 Broker 时指定配置
sh bin/mqbroker -n localhost:9876 -c conf/broker.conf
```

**2. Producer 设置消息属性**

```java
Message msg = new Message("OrderTopic", "订单数据".getBytes());

// 设置用户自定义属性
msg.putUserProperty("price", "150");           // 价格
msg.putUserProperty("region", "CN");           // 区域
msg.putUserProperty("vipLevel", "3");          // VIP 等级
msg.putUserProperty("category", "electronics"); // 类别

producer.send(msg);
```

**3. SQL92 支持的语法**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">SQL92 过滤语法</text>
<rect x="50" y="60" width="750" height="420" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="425" y="85" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">支持的运算符和语法</text>
<rect x="80" y="100" width="330" height="170" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="245" y="122" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">比较运算符</text>
<text x="245" y="145" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">&gt;</text> 大于: price &gt; 100</text>
<text x="245" y="163" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">&gt;=</text> 大于等于: age &gt;= 18</text>
<text x="245" y="181" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">&lt;</text> 小于: stock &lt; 10</text>
<text x="245" y="199" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">&lt;=</text> 小于等于: discount &lt;= 0.5</text>
<text x="245" y="217" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">=</text> 等于: region = 'CN'</text>
<text x="245" y="235" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">!=</text> 或 <text font-weight="bold" fill="#C62828">&lt;&gt;</text> 不等于: status != 'closed'</text>
<text x="245" y="258" font-size="8" fill="#2E7D32" font-weight="bold">✓ 支持数值和字符串比较</text>
<rect x="440" y="100" width="330" height="170" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="605" y="122" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">逻辑运算符</text>
<text x="605" y="145" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">AND</text> 与: price &gt; 100 AND region = 'CN'</text>
<text x="605" y="163" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">OR</text> 或: level = 1 OR level = 2</text>
<text x="605" y="181" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">NOT</text> 非: NOT (status = 'closed')</text>
<text x="605" y="207" font-size="9" fill="#424242">括号优先级:</text>
<text x="605" y="225" font-family="monospace" font-size="8" fill="#9C27B0">(price&gt;100 AND region='CN')</text>
<text x="605" y="243" font-family="monospace" font-size="8" fill="#9C27B0">OR vipLevel &gt;= 3</text>
<rect x="80" y="290" width="330" height="140" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="245" y="312" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">范围和集合</text>
<text x="245" y="335" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">BETWEEN...AND</text> 范围:</text>
<text x="245" y="351" font-family="monospace" font-size="8" fill="#9C27B0">price BETWEEN 100 AND 500</text>
<text x="245" y="375" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">IN</text> 集合:</text>
<text x="245" y="391" font-family="monospace" font-size="8" fill="#9C27B0">region IN ('CN', 'US', 'JP')</text>
<text x="245" y="415" font-size="8" fill="#F57C00" font-weight="bold">✓ 简化多条件判断</text>
<rect x="440" y="290" width="330" height="140" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="605" y="312" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">NULL 判断</text>
<text x="605" y="335" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">IS NULL</text> 为空:</text>
<text x="605" y="351" font-family="monospace" font-size="8" fill="#9C27B0">remark IS NULL</text>
<text x="605" y="375" font-size="9" fill="#424242">• <text font-weight="bold" fill="#C62828">IS NOT NULL</text> 非空:</text>
<text x="605" y="391" font-family="monospace" font-size="8" fill="#9C27B0">phone IS NOT NULL</text>
<text x="605" y="415" font-size="8" fill="#7B1FA2" font-weight="bold">✓ 检查属性是否存在</text>
<text x="425" y="460" text-anchor="middle" font-size="10" fill="#E74C3C" font-weight="bold">⚠️ 注意: 不支持 LIKE、JOIN、子查询等复杂 SQL 语法</text>
</svg>

**4. Consumer 使用 SQL 订阅**

```java
import org.apache.rocketmq.client.consumer.MessageSelector;

public class SQL92Consumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");

        // 使用 SQL92 表达式订阅
        consumer.subscribe("OrderTopic",
            MessageSelector.bySql("price > 100 AND region = 'CN'"));

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    // 获取消息属性
                    String price = msg.getUserProperty("price");
                    String region = msg.getUserProperty("region");
                    String body = new String(msg.getBody());
                    System.out.println("Price=" + price + ", Region=" + region + ", Body=" + body);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }
}
```

**5. 完整使用示例**

```java
// ========== Producer 端 ==========
public class SQL92Producer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        // 发送不同属性的消息
        for (int i = 0; i < 10; i++) {
            Message msg = new Message("OrderTopic",
                ("订单数据-" + i).getBytes());

            // 设置消息属性
            msg.putUserProperty("price", String.valueOf(50 + i * 20));
            msg.putUserProperty("region", i % 2 == 0 ? "CN" : "US");
            msg.putUserProperty("vipLevel", String.valueOf(i % 4));

            SendResult result = producer.send(msg);
            System.out.println("发送消息: price=" + msg.getUserProperty("price")
                + ", region=" + msg.getUserProperty("region"));
        }

        producer.shutdown();
    }
}

// ========== Consumer 端 ==========
public class SQL92Consumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");

        // 场景1: 价格大于100且区域为CN的订单
        String sql1 = "price > 100 AND region = 'CN'";

        // 场景2: VIP等级大于等于2或价格大于150
        String sql2 = "vipLevel >= 2 OR price > 150";

        // 场景3: 价格在100-200之间且不是US区域
        String sql3 = "price BETWEEN 100 AND 200 AND region != 'US'";

        // 场景4: 区域在指定列表中且VIP等级非空
        String sql4 = "region IN ('CN', 'JP', 'KR') AND vipLevel IS NOT NULL";

        consumer.subscribe("OrderTopic", MessageSelector.bySql(sql1));

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
    }
}
```

**6. 实战场景示例**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">SQL92 过滤实战场景</text>
<rect x="50" y="50" width="700" height="360" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">电商场景: 订单过滤</text>
<rect x="70" y="90" width="660" height="70" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="400" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">Consumer1: 高价值订单处理</text>
<text x="400" y="128" font-family="monospace" font-size="8" fill="#C62828">price &gt; 1000 AND region = 'CN' AND vipLevel &gt;= 3</text>
<text x="400" y="146" font-size="8" fill="#7F8C8D">处理国内高价值VIP订单,优先发货</text>
<rect x="70" y="175" width="660" height="70" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="400" y="195" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Consumer2: 促销订单监控</text>
<text x="400" y="213" font-family="monospace" font-size="8" fill="#C62828">price BETWEEN 100 AND 500 AND category IN ('electronics', 'clothing')</text>
<text x="400" y="231" font-size="8" fill="#7F8C8D">监控促销商品订单,统计分析</text>
<text x="400" y="270" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">金融场景: 风控过滤</text>
<rect x="70" y="285" width="660" height="55" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="400" y="305" text-anchor="middle" font-size="10" font-weight="bold" fill="#F57C00">Consumer1: 大额交易监控</text>
<text x="400" y="323" font-family="monospace" font-size="8" fill="#C62828">amount &gt; 50000 AND (type = 'transfer' OR type = 'withdraw')</text>
<rect x="70" y="350" width="660" height="55" fill="#FCE4EC" stroke="#E91E63" stroke-width="1" rx="3"/>
<text x="400" y="370" text-anchor="middle" font-size="10" font-weight="bold" fill="#C2185B">Consumer2: 异常交易告警</text>
<text x="400" y="388" font-family="monospace" font-size="8" fill="#C62828">riskLevel &gt;= 3 AND frequency &gt; 10 AND NOT (region = 'trusted')</text>
</svg>

**7. SQL92 过滤最佳实践**

| 最佳实践 | 说明 | 示例 |
|---------|------|------|
| **属性命名规范** | 使用驼峰命名,语义清晰 | price, vipLevel, orderStatus |
| **数据类型统一** | 数值用数值,字符串用字符串 | price=100 而非 price="100" |
| **避免过于复杂** | 表达式不超过5个条件 | 太复杂考虑拆分多个 Consumer |
| **性能考虑** | SQL 计算比 Tag 慢,合理使用 | 简单场景优先用 Tag |
| **测试验证** | 上线前充分测试表达式 | 避免过滤逻辑错误 |
| **开启配置** | 确保 Broker 开启支持 | enablePropertyFilter=true |

**8. SQL92 vs Tag 选择指南**

```
使用 Tag:
✓ 简单分类 (订单类型、消息级别)
✓ 单一维度
✓ 性能要求极高
✓ 不需要数值比较

使用 SQL92:
✓ 多维度组合 (价格+区域+等级)
✓ 需要数值比较 (price > 100)
✓ 需要范围判断 (BETWEEN, IN)
✓ 复杂业务逻辑
```

**关键要点:**

1. **开启配置**: Broker 必须配置 enablePropertyFilter=true
2. **设置属性**: Producer 使用 putUserProperty 设置属性
3. **SQL 订阅**: Consumer 使用 MessageSelector.bySql() 订阅
4. **支持语法**: 比较、逻辑、范围、NULL 判断，不支持 LIKE 等
5. **性能权衡**: 比 Tag 慢，但比客户端过滤快很多

**记忆口诀:**

```
开启配置第一步
Producer设属性
Consumer写SQL
AND OR NOT 逻辑
大于小于等于比
BETWEEN IN 范围查
Broker端来计算
复杂过滤它最佳
```

### 56. 如何提高 RocketMQ 的性能？

**核心答案:**

提高 RocketMQ 性能从五个维度优化：
1. **Producer 优化**：批量发送、异步发送、压缩消息
2. **Broker 优化**：调整刷盘策略、增加内存、优化存储
3. **Consumer 优化**：并发消费、批量拉取、异步消费
4. **网络优化**：调整缓冲区、使用高速网络、减少序列化
5. **系统优化**：JVM 调优、操作系统参数、硬件升级

**详细说明:**

**1. Producer 端性能优化**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Producer 性能优化策略</text>
<rect x="50" y="50" width="700" height="340" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="80" y="70" width="210" height="140" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="185" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">批量发送</text>
<text x="95" y="115" font-size="9" fill="#424242">• 使用 sendBatch() 方法</text>
<text x="95" y="133" font-size="9" fill="#424242">• 每批 32-128 条消息</text>
<text x="95" y="151" font-size="9" fill="#424242">• 减少网络IO次数</text>
<text x="185" y="175" font-size="10" font-weight="bold" fill="#2E7D32">提升 10-30%</text>
<text x="185" y="195" font-size="8" fill="#7F8C8D">适用场景: 高吞吐量</text>
<rect x="310" y="70" width="210" height="140" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="415" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">异步发送</text>
<text x="325" y="115" font-size="9" fill="#424242">• sendAsync() 方法</text>
<text x="325" y="133" font-size="9" fill="#424242">• 不阻塞主线程</text>
<text x="325" y="151" font-size="9" fill="#424242">• 使用回调处理结果</text>
<text x="415" y="175" font-size="10" font-weight="bold" fill="#2E7D32">提升 50-100%</text>
<text x="415" y="195" font-size="8" fill="#7F8C8D">适用场景: 低延迟要求</text>
<rect x="540" y="70" width="210" height="140" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="645" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">消息压缩</text>
<text x="555" y="115" font-size="9" fill="#424242">• 启用压缩: Gzip/LZ4</text>
<text x="555" y="133" font-size="9" fill="#424242">• 减少网络传输量</text>
<text x="555" y="151" font-size="9" fill="#424242">• 适用大消息体</text>
<text x="645" y="175" font-size="10" font-weight="bold" fill="#2E7D32">减少 50-70%</text>
<text x="645" y="195" font-size="8" fill="#7F8C8D">适用场景: 大消息传输</text>
<rect x="80" y="230" width="320" height="140" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="240" y="252" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">单向发送</text>
<text x="95" y="275" font-size="9" fill="#424242">• sendOneway() 方法</text>
<text x="95" y="293" font-size="9" fill="#424242">• 不等待响应</text>
<text x="95" y="311" font-size="9" fill="#424242">• 最高吞吐量</text>
<text x="95" y="329" font-size="9" fill="#424242">⚠️ 可能丢失消息</text>
<text x="240" y="355" font-size="8" fill="#7F8C8D">适用场景: 日志、监控数据</text>
<rect x="420" y="230" width="330" height="140" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="585" y="252" text-anchor="middle" font-size="11" font-weight="bold" fill="#C2185B">线程池调优</text>
<text x="435" y="275" font-size="9" fill="#424242">• 调整发送线程数</text>
<text x="435" y="293" font-size="9" fill="#424242">• 异步发送队列大小</text>
<text x="435" y="311" font-size="9" fill="#424242">• 超时时间合理设置</text>
<text x="585" y="335" font-family="monospace" font-size="8" fill="#9C27B0">sendThreadPoolNums=4</text>
<text x="585" y="355" font-family="monospace" font-size="8" fill="#9C27B0">sendMsgTimeout=3000</text>
</svg>

**2. Broker 端性能优化**

| 优化项 | 配置参数 | 推荐值 | 说明 |
|-------|---------|--------|------|
| **刷盘策略** | flushDiskType | ASYNC_FLUSH | 异步刷盘,提升10倍性能 |
| **堆内存** | -Xms, -Xmx | 8-16GB | 增加PageCache命中率 |
| **直接内存** | -XX:MaxDirectMemorySize | 16GB | 零拷贝缓冲区 |
| **页缓存** | transientStorePoolEnable | true | 启用堆外内存池 |
| **IO线程** | sendMessageThreadPoolNums | 16-32 | 增加并发处理能力 |
| **磁盘** | - | SSD | 降低IO延迟 |

```properties
# broker.conf 性能优化配置
# 刷盘策略
flushDiskType=ASYNC_FLUSH

# 异步刷盘间隔(毫秒)
flushIntervalCommitLog=200

# 启用堆外内存池
transientStorePoolEnable=true
transientStorePoolSize=10

# 发送消息线程数
sendMessageThreadPoolNums=32

# 消费消息线程数
pullMessageThreadPoolNums=32

# 文件预热
warmMapedFileEnable=true

# 使用mmap预读取
transferMsgByHeap=false
```

**3. Consumer 端性能优化**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Consumer 性能优化策略</text>
<rect x="50" y="50" width="700" height="290" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="80" y="70" width="210" height="120" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="185" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">并发消费</text>
<text x="95" y="115" font-size="9" fill="#424242">• 增加消费线程数</text>
<text x="185" y="135" font-family="monospace" font-size="8" fill="#9C27B0">setConsumeThreadMin(20)</text>
<text x="185" y="153" font-family="monospace" font-size="8" fill="#9C27B0">setConsumeThreadMax(64)</text>
<text x="185" y="177" font-size="9" fill="#2E7D32" font-weight="bold">线性提升吞吐量</text>
<rect x="310" y="70" width="210" height="120" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="415" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">批量拉取</text>
<text x="325" y="115" font-size="9" fill="#424242">• 增加拉取批次大小</text>
<text x="415" y="135" font-family="monospace" font-size="8" fill="#9C27B0">setPullBatchSize(64)</text>
<text x="415" y="153" font-family="monospace" font-size="8" fill="#9C27B0">setConsumeMessageBatchMaxSize(16)</text>
<text x="415" y="177" font-size="9" fill="#2E7D32" font-weight="bold">减少拉取次数</text>
<rect x="540" y="70" width="210" height="120" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="645" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#F57C00">优化消费逻辑</text>
<text x="555" y="115" font-size="9" fill="#424242">• 减少业务处理时间</text>
<text x="555" y="133" font-size="9" fill="#424242">• 异步处理耗时操作</text>
<text x="555" y="151" font-size="9" fill="#424242">• 批量处理数据库写入</text>
<text x="645" y="177" font-size="9" fill="#2E7D32" font-weight="bold">提升消费速度</text>
<rect x="80" y="210" width="320" height="110" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="240" y="232" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">增加消费者实例</text>
<text x="95" y="255" font-size="9" fill="#424242">• 横向扩展消费者数量</text>
<text x="95" y="273" font-size="9" fill="#424242">• 每个队列至少一个消费者</text>
<text x="95" y="291" font-size="9" fill="#424242">• 注意: 消费者数 ≤ 队列数</text>
<rect x="420" y="210" width="330" height="110" fill="#FCE4EC" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="585" y="232" text-anchor="middle" font-size="11" font-weight="bold" fill="#C2185B">流量控制</text>
<text x="435" y="255" font-size="9" fill="#424242">• 限制单次拉取数量</text>
<text x="435" y="273" font-size="9" fill="#424242">• 控制拉取频率</text>
<text x="585" y="295" font-family="monospace" font-size="8" fill="#9C27B0">setPullThresholdForQueue(1000)</text>
</svg>

**4. 网络优化**

```java
// Producer 网络优化
DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");

// 增大发送缓冲区
producer.setClientCallbackExecutorThreads(4);

// 压缩消息体
producer.setCompressMsgBodyOverHowmuch(4096); // 超过4KB压缩

// 最大消息大小
producer.setMaxMessageSize(4 * 1024 * 1024); // 4MB

// 发送超时
producer.setSendMsgTimeout(3000); // 3秒
```

```java
// Consumer 网络优化
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");

// 拉取批次大小
consumer.setPullBatchSize(64);

// 拉取间隔
consumer.setPullInterval(0); // 立即拉取

// 拉取阈值(每个队列最大缓存消息数)
consumer.setPullThresholdForQueue(1000);

// 拉取阈值(每个队列最大缓存消息大小MB)
consumer.setPullThresholdSizeForQueue(100);
```

**5. JVM 调优**

```bash
# Broker JVM 参数推荐
-server
-Xms8g -Xmx8g -Xmn4g

# 使用G1收集器
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200

# 直接内存
-XX:MaxDirectMemorySize=16g

# GC日志
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
-Xloggc:/dev/shm/mq_gc_%p.log

# 优化参数
-XX:+DisableExplicitGC
-XX:+AlwaysPreTouch
-XX:-OmitStackTraceInFastThrow
```

**6. 操作系统优化**

```bash
# 增加文件描述符限制
ulimit -n 1000000

# 调整TCP参数
echo "net.ipv4.tcp_max_syn_backlog = 8192" >> /etc/sysctl.conf
echo "net.core.somaxconn = 8192" >> /etc/sysctl.conf
echo "net.ipv4.tcp_tw_reuse = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_fin_timeout = 30" >> /etc/sysctl.conf

# 磁盘调度算法(SSD使用noop或deadline)
echo deadline > /sys/block/sda/queue/scheduler

# 关闭swap
swapoff -a

# 应用配置
sysctl -p
```

**7. 性能提升对比**

| 优化措施 | 优化前 TPS | 优化后 TPS | 提升比例 |
|---------|-----------|-----------|---------|
| 批量发送 | 10,000 | 15,000 | +50% |
| 异步发送 | 10,000 | 20,000 | +100% |
| 异步刷盘 | 5,000 | 50,000 | +900% |
| 消息压缩 | 8,000(大消息) | 15,000 | +87% |
| 并发消费 | 5,000 | 20,000 | +300% |
| **综合优化** | **10,000** | **100,000+** | **+900%** |

**8. 性能优化检查清单**

<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">性能优化检查清单</text>
<rect x="50" y="50" width="600" height="360" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="80" y="80" font-size="11" font-weight="bold" fill="#1976D2">□ Producer 层</text>
<text x="100" y="100" font-size="9" fill="#424242">□ 使用批量发送(batch size 32-128)</text>
<text x="100" y="118" font-size="9" fill="#424242">□ 使用异步发送(低延迟场景)</text>
<text x="100" y="136" font-size="9" fill="#424242">□ 启用消息压缩(大消息场景)</text>
<text x="80" y="165" font-size="11" font-weight="bold" fill="#2E7D32">□ Broker 层</text>
<text x="100" y="185" font-size="9" fill="#424242">□ 使用异步刷盘(可容忍极少丢失)</text>
<text x="100" y="203" font-size="9" fill="#424242">□ 增大JVM堆内存(8-16GB)</text>
<text x="100" y="221" font-size="9" fill="#424242">□ 启用堆外内存池(transientStorePoolEnable)</text>
<text x="100" y="239" font-size="9" fill="#424242">□ 使用SSD存储</text>
<text x="80" y="268" font-size="11" font-weight="bold" fill="#F57C00">□ Consumer 层</text>
<text x="100" y="288" font-size="9" fill="#424242">□ 增加消费线程(20-64)</text>
<text x="100" y="306" font-size="9" fill="#424242">□ 增大批量拉取大小(64)</text>
<text x="100" y="324" font-size="9" fill="#424242">□ 优化业务逻辑(异步处理)</text>
<text x="80" y="353" font-size="11" font-weight="bold" fill="#7B1FA2">□ 系统层</text>
<text x="100" y="373" font-size="9" fill="#424242">□ JVM调优(G1收集器)</text>
<text x="100" y="391" font-size="9" fill="#424242">□ 操作系统参数优化(文件描述符、TCP)</text>
</svg>

**关键要点:**

1. **Producer优化**: 批量、异步、压缩是三大利器
2. **Broker优化**: 异步刷盘提升最明显(10倍+)
3. **Consumer优化**: 并发消费和批量拉取提升吞吐
4. **系统优化**: JVM、OS参数也很重要
5. **综合考虑**: 根据场景选择合适的优化策略

**记忆口诀:**

```
Producer三板斧
批量异步和压缩
Broker两关键
异步刷盘加内存
Consumer抓两点
并发拉取要增大
系统别忘记
JVM调优TCP参数
组合使用后
百万TPS不是梦
```



### 57. 如何优化 Producer 的性能?

**核心答案:**

Producer 性能优化六大策略:
1. **批量发送**: 使用 sendBatch() 减少网络 IO
2. **异步发送**: 使用 sendAsync() 提高吞吐量
3. **单向发送**: 使用 sendOneway() 最大化性能
4. **消息压缩**: 启用压缩减少网络传输
5. **连接池优化**: 调整线程池和超时参数
6. **合理分区**: 使用 MessageQueue 均衡负载

**详细说明:**

**1. 批量发送优化**

<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">批量发送 vs 单条发送</text>
<rect x="50" y="50" width="350" height="300" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="225" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#C62828">单条发送(低效)</text>
<rect x="80" y="90" width="290" height="35" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="95" y="110" font-size="9" fill="#1976D2">消息1 → 网络IO → Broker</text>
<rect x="80" y="135" width="290" height="35" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="95" y="155" font-size="9" fill="#1976D2">消息2 → 网络IO → Broker</text>
<rect x="80" y="180" width="290" height="35" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="95" y="200" font-size="9" fill="#1976D2">消息3 → 网络IO → Broker</text>
<text x="225" y="235" font-size="10" fill="#C62828">网络IO: 100次</text>
<text x="225" y="255" font-size="10" fill="#C62828">TPS: 10,000</text>
<text x="225" y="275" font-size="10" fill="#C62828">延迟: 10ms/条</text>
<text x="225" y="330" font-size="11" fill="#E53935" font-weight="bold">❌ 频繁网络IO</text>
<rect x="420" y="50" width="350" height="300" fill="#E8F5E9" stroke="#43A047" stroke-width="2" rx="5"/>
<text x="595" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">批量发送(高效)</text>
<rect x="450" y="90" width="290" height="110" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="595" y="110" text-anchor="middle" font-size="9" fill="#1976D2">批量消息包</text>
<text x="465" y="135" font-size="9" fill="#424242">• 消息1</text>
<text x="465" y="155" font-size="9" fill="#424242">• 消息2</text>
<text x="465" y="175" font-size="9" fill="#424242">• 消息3</text>
<text x="465" y="190" font-size="8" fill="#7F8C8D">... (32-128条)</text>
<path d="M 595 210 L 595 240" stroke="#43A047" stroke-width="2" marker-end="url(#arrowGreen)"/>
<text x="595" y="260" text-anchor="middle" font-size="9" fill="#2E7D32">一次网络IO → Broker</text>
<text x="595" y="285" font-size="10" fill="#2E7D32">网络IO: 1次</text>
<text x="595" y="305" font-size="10" fill="#2E7D32">TPS: 30,000+</text>
<text x="595" y="325" font-size="10" fill="#2E7D32">延迟: 3ms/批</text>
<text x="595" y="348" font-size="11" fill="#43A047" font-weight="bold">✓ 提升3倍性能</text>
<defs>
<marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#43A047"/>
</marker>
</defs>
</svg>

```java
// 方式1: 单条发送(低效)
public void sendOneByOne() throws Exception {
    DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
    producer.setNamesrvAddr("localhost:9876");
    producer.start();

    long start = System.currentTimeMillis();

    // 发送100条消息
    for (int i = 0; i < 100; i++) {
        Message msg = new Message("BatchTopic",
            ("消息-" + i).getBytes());
        producer.send(msg);  // 每次一个网络IO
    }

    long cost = System.currentTimeMillis() - start;
    System.out.println("单条发送耗时: " + cost + "ms");
    // 输出: 单条发送耗时: 1000ms

    producer.shutdown();
}

// 方式2: 批量发送(高效)
public void sendBatch() throws Exception {
    DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
    producer.setNamesrvAddr("localhost:9876");
    producer.start();

    long start = System.currentTimeMillis();

    // 准备批量消息
    List<Message> messages = new ArrayList<>();
    for (int i = 0; i < 100; i++) {
        Message msg = new Message("BatchTopic",
            ("消息-" + i).getBytes());
        messages.add(msg);
    }

    // 批量发送(一次网络IO)
    producer.send(messages);

    long cost = System.currentTimeMillis() - start;
    System.out.println("批量发送耗时: " + cost + "ms");
    // 输出: 批量发送耗时: 50ms (提升20倍)

    producer.shutdown();
}
```

**批量发送最佳实践:**

```java
public class BatchProducer {
    private static final int BATCH_SIZE = 64;  // 每批64条
    private static final int MAX_BATCH_BYTES = 4 * 1024 * 1024; // 4MB限制

    public void sendInBatch(List<Message> messages) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        // 自动分批
        List<List<Message>> batches = splitBatch(messages);

        for (List<Message> batch : batches) {
            try {
                SendResult result = producer.send(batch);
                System.out.println("批次发送成功: " + result.getMsgId());
            } catch (Exception e) {
                // 批次失败,可单独重试
                retryBatch(batch);
            }
        }

        producer.shutdown();
    }

    // 消息分批(考虑大小限制)
    private List<List<Message>> splitBatch(List<Message> messages) {
        List<List<Message>> batches = new ArrayList<>();
        List<Message> currentBatch = new ArrayList<>();
        int currentSize = 0;

        for (Message msg : messages) {
            int msgSize = msg.getBody().length + 100; // 估算大小

            // 判断是否需要新批次
            if (currentBatch.size() >= BATCH_SIZE ||
                currentSize + msgSize > MAX_BATCH_BYTES) {
                batches.add(currentBatch);
                currentBatch = new ArrayList<>();
                currentSize = 0;
            }

            currentBatch.add(msg);
            currentSize += msgSize;
        }

        if (!currentBatch.isEmpty()) {
            batches.add(currentBatch);
        }

        return batches;
    }

    private void retryBatch(List<Message> batch) {
        // 重试逻辑
    }
}
```

**2. 异步发送优化**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">同步 vs 异步发送对比</text>
<rect x="50" y="50" width="350" height="340" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="225" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#C62828">同步发送(阻塞)</text>
<rect x="80" y="95" width="290" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="225" y="115" text-anchor="middle" font-size="9" fill="#1976D2">业务线程</text>
<text x="95" y="133" font-size="8" fill="#424242">发送消息1...</text>
<rect x="110" y="155" width="230" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="175" text-anchor="middle" font-size="9" fill="#F57C00">⏳ 等待Broker响应</text>
<text x="225" y="200" font-size="8" fill="#C62828">阻塞10ms</text>
<rect x="80" y="215" width="290" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="95" y="235" font-size="8" fill="#424242">发送消息2...</text>
<rect x="110" y="255" width="230" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="275" text-anchor="middle" font-size="9" fill="#F57C00">⏳ 等待Broker响应</text>
<text x="225" y="295" font-size="8" fill="#C62828">阻塞10ms</text>
<text x="225" y="325" font-size="10" fill="#C62828">总耗时: 20ms</text>
<text x="225" y="345" font-size="10" fill="#C62828">TPS: 50/线程</text>
<text x="225" y="375" font-size="11" fill="#E53935" font-weight="bold">❌ 线程阻塞</text>
<rect x="420" y="50" width="350" height="340" fill="#E8F5E9" stroke="#43A047" stroke-width="2" rx="5"/>
<text x="595" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">异步发送(非阻塞)</text>
<rect x="450" y="95" width="290" height="240" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="595" y="115" text-anchor="middle" font-size="9" fill="#1976D2">业务线程</text>
<text x="465" y="135" font-size="8" fill="#424242">发送消息1(异步) ✓ 立即返回</text>
<text x="465" y="155" font-size="8" fill="#424242">发送消息2(异步) ✓ 立即返回</text>
<text x="465" y="175" font-size="8" fill="#424242">发送消息3(异步) ✓ 立即返回</text>
<text x="465" y="195" font-size="8" fill="#424242">继续其他业务...</text>
<path d="M 480 210 L 710 210" stroke="#9E9E9E" stroke-width="1" stroke-dasharray="3,3"/>
<rect x="465" y="225" width="260" height="95" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="595" y="245" text-anchor="middle" font-size="9" fill="#F57C00">回调线程(独立)</text>
<text x="480" y="265" font-size="8" fill="#424242">回调1: 成功 ✓</text>
<text x="480" y="283" font-size="8" fill="#424242">回调2: 成功 ✓</text>
<text x="480" y="301" font-size="8" fill="#424242">回调3: 成功 ✓</text>
<text x="595" y="345" font-size="10" fill="#2E7D32">总耗时: 1ms</text>
<text x="595" y="365" font-size="10" fill="#2E7D32">TPS: 1000/线程</text>
<text x="595" y="383" font-size="11" fill="#43A047" font-weight="bold">✓ 提升20倍性能</text>
</svg>

```java
// 同步发送(低效)
public void syncSend() throws Exception {
    DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
    producer.setNamesrvAddr("localhost:9876");
    producer.start();

    long start = System.currentTimeMillis();

    for (int i = 0; i < 100; i++) {
        Message msg = new Message("AsyncTopic",
            ("消息-" + i).getBytes());

        // 同步发送,阻塞等待
        SendResult result = producer.send(msg);
        // 阻塞10ms,直到Broker响应
    }

    long cost = System.currentTimeMillis() - start;
    System.out.println("同步发送耗时: " + cost + "ms");
    // 输出: 同步发送耗时: 1000ms

    producer.shutdown();
}

// 异步发送(高效)
public void asyncSend() throws Exception {
    DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
    producer.setNamesrvAddr("localhost:9876");

    // 设置异步发送线程数
    producer.setAsyncSenderExecutor(new ThreadPoolExecutor(
        4, 8, 60, TimeUnit.SECONDS,
        new LinkedBlockingQueue<>(10000),
        new ThreadFactory() {
            private AtomicInteger index = new AtomicInteger(0);
            @Override
            public Thread newThread(Runnable r) {
                return new Thread(r, "AsyncSender-" + index.getAndIncrement());
            }
        }
    ));

    producer.start();

    long start = System.currentTimeMillis();
    final CountDownLatch latch = new CountDownLatch(100);

    for (int i = 0; i < 100; i++) {
        Message msg = new Message("AsyncTopic",
            ("消息-" + i).getBytes());

        // 异步发送,立即返回
        producer.send(msg, new SendCallback() {
            @Override
            public void onSuccess(SendResult result) {
                System.out.println("发送成功: " + result.getMsgId());
                latch.countDown();
            }

            @Override
            public void onException(Throwable e) {
                System.err.println("发送失败: " + e.getMessage());
                latch.countDown();
            }
        });
        // 立即返回,不阻塞
    }

    long cost = System.currentTimeMillis() - start;
    System.out.println("异步发送耗时: " + cost + "ms");
    // 输出: 异步发送耗时: 50ms (提升20倍)

    latch.await(); // 等待所有回调完成
    producer.shutdown();
}
```

**3. 单向发送优化(极致性能)**

```java
public void onewaySend() throws Exception {
    DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
    producer.setNamesrvAddr("localhost:9876");
    producer.start();

    long start = System.currentTimeMillis();

    for (int i = 0; i < 100; i++) {
        Message msg = new Message("OnewayTopic",
            ("日志-" + i).getBytes());

        // 单向发送,不等待任何响应
        producer.sendOneway(msg);
        // 立即返回,性能最高
    }

    long cost = System.currentTimeMillis() - start;
    System.out.println("单向发送耗时: " + cost + "ms");
    // 输出: 单向发送耗时: 10ms (提升100倍)

    producer.shutdown();
}

// 使用场景: 日志收集、监控数据
public class LogProducer {
    private DefaultMQProducer producer;

    public void init() throws Exception {
        producer = new DefaultMQProducer("LogProducerGroup");
        producer.setNamesrvAddr("localhost:9876");
        producer.setRetryTimesWhenSendFailed(0); // 不重试
        producer.start();
    }

    // 发送日志(可以容忍少量丢失)
    public void sendLog(String log) {
        try {
            Message msg = new Message("LogTopic", log.getBytes());
            producer.sendOneway(msg); // 最快
        } catch (Exception e) {
            // 忽略异常
        }
    }
}
```

**4. 消息压缩优化**

```java
public class CompressProducer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("localhost:9876");

        // 设置压缩阈值(字节)
        // 消息体超过4KB自动压缩
        producer.setCompressMsgBodyOverHowmuch(4 * 1024);

        // 设置最大消息大小
        producer.setMaxMessageSize(4 * 1024 * 1024); // 4MB

        producer.start();

        // 发送大消息
        String largeContent = generateLargeContent(100 * 1024); // 100KB
        Message msg = new Message("CompressTopic", largeContent.getBytes());

        long start = System.currentTimeMillis();
        SendResult result = producer.send(msg);
        long cost = System.currentTimeMillis() - start;

        System.out.println("原始大小: " + largeContent.getBytes().length + " bytes");
        System.out.println("压缩后网络传输时间: " + cost + "ms");
        // 压缩率约50-70%,传输时间减少一半

        producer.shutdown();
    }

    private static String generateLargeContent(int size) {
        StringBuilder sb = new StringBuilder(size);
        for (int i = 0; i < size; i++) {
            sb.append('A');
        }
        return sb.toString();
    }
}
```

**5. Producer 参数优化**

```java
public class OptimizedProducer {
    public static void main(String[] args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
        producer.setNamesrvAddr("localhost:9876");

        // ========== 性能优化参数 ==========

        // 1. 发送超时(毫秒)
        producer.setSendMsgTimeout(3000); // 3秒

        // 2. 失败重试次数
        producer.setRetryTimesWhenSendFailed(2); // 同步发送重试2次
        producer.setRetryTimesWhenSendAsyncFailed(0); // 异步发送不重试

        // 3. 压缩阈值
        producer.setCompressMsgBodyOverHowmuch(4096); // 4KB

        // 4. 最大消息大小
        producer.setMaxMessageSize(4 * 1024 * 1024); // 4MB

        // 5. 客户端回调线程数
        producer.setClientCallbackExecutorThreads(
            Runtime.getRuntime().availableProcessors() * 2
        );

        // 6. VIP通道(默认开启,端口号-2)
        producer.setVipChannelEnabled(true);

        // 7. 默认Topic队列数
        producer.setDefaultTopicQueueNums(4);

        // 8. 心跳间隔(毫秒)
        producer.setHeartbeatBrokerInterval(30000); // 30秒

        producer.start();

        // 使用优化后的Producer
        asyncBatchSend(producer);

        producer.shutdown();
    }

    // 结合异步+批量
    private static void asyncBatchSend(DefaultMQProducer producer) throws Exception {
        List<Message> batch = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            Message msg = new Message("OptimizedTopic",
                ("消息-" + i).getBytes());
            batch.add(msg);

            // 每64条发送一次
            if (batch.size() == 64) {
                sendBatchAsync(producer, new ArrayList<>(batch));
                batch.clear();
            }
        }

        // 发送剩余
        if (!batch.isEmpty()) {
            sendBatchAsync(producer, batch);
        }
    }

    private static void sendBatchAsync(DefaultMQProducer producer,
                                        List<Message> batch) {
        producer.send(batch, new SendCallback() {
            @Override
            public void onSuccess(SendResult result) {
                System.out.println("批次发送成功: " + result.getMsgId());
            }

            @Override
            public void onException(Throwable e) {
                System.err.println("批次发送失败: " + e.getMessage());
                // 重试逻辑
            }
        });
    }
}
```

**6. 性能对比总结**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">不同发送方式性能对比</text>
<rect x="50" y="50" width="700" height="280" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="150" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">发送方式</text>
<text x="300" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">TPS</text>
<text x="450" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">延迟</text>
<text x="600" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">可靠性</text>
<path d="M 70 95 L 730 95" stroke="#607D8B" stroke-width="1"/>
<rect x="70" y="105" width="660" height="35" fill="#FFEBEE" stroke="#E53935" stroke-width="1" rx="3"/>
<text x="150" y="127" text-anchor="middle" font-size="9" fill="#424242">同步单条</text>
<text x="300" y="127" text-anchor="middle" font-size="9" fill="#C62828">1万/秒</text>
<text x="450" y="127" text-anchor="middle" font-size="9" fill="#C62828">10ms</text>
<text x="600" y="127" text-anchor="middle" font-size="9" fill="#2E7D32">⭐⭐⭐⭐⭐</text>
<rect x="70" y="145" width="660" height="35" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="150" y="167" text-anchor="middle" font-size="9" fill="#424242">同步批量</text>
<text x="300" y="167" text-anchor="middle" font-size="9" fill="#F57C00">3万/秒</text>
<text x="450" y="167" text-anchor="middle" font-size="9" fill="#F57C00">3ms</text>
<text x="600" y="167" text-anchor="middle" font-size="9" fill="#2E7D32">⭐⭐⭐⭐⭐</text>
<rect x="70" y="185" width="660" height="35" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="150" y="207" text-anchor="middle" font-size="9" fill="#424242">异步单条</text>
<text x="300" y="207" text-anchor="middle" font-size="9" fill="#1976D2">5万/秒</text>
<text x="450" y="207" text-anchor="middle" font-size="9" fill="#1976D2">2ms</text>
<text x="600" y="207" text-anchor="middle" font-size="9" fill="#2E7D32">⭐⭐⭐⭐</text>
<rect x="70" y="225" width="660" height="35" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="150" y="247" text-anchor="middle" font-size="9" fill="#424242">异步批量</text>
<text x="300" y="247" text-anchor="middle" font-size="9" fill="#2E7D32">10万/秒</text>
<text x="450" y="247" text-anchor="middle" font-size="9" fill="#2E7D32">1ms</text>
<text x="600" y="247" text-anchor="middle" font-size="9" fill="#2E7D32">⭐⭐⭐⭐</text>
<rect x="70" y="265" width="660" height="35" fill="#F3E5F5" stroke="#9C27B0" stroke-width="1" rx="3"/>
<text x="150" y="287" text-anchor="middle" font-size="9" fill="#424242">单向发送</text>
<text x="300" y="287" text-anchor="middle" font-size="9" fill="#7B1FA2">20万/秒</text>
<text x="450" y="287" text-anchor="middle" font-size="9" fill="#7B1FA2">&lt;1ms</text>
<text x="600" y="287" text-anchor="middle" font-size="9" fill="#F57C00">⭐⭐</text>
<text x="400" y="320" text-anchor="middle" font-size="10" fill="#E74C3C" font-weight="bold">推荐: 异步批量发送(性能与可靠性平衡)</text>
</svg>

**关键要点:**

1. **批量发送**: 减少网络 IO,提升 3-5 倍
2. **异步发送**: 避免线程阻塞,提升 5-10 倍
3. **组合优化**: 异步+批量,可提升 10-20 倍
4. **单向发送**: 极致性能场景(日志),提升 20 倍+
5. **消息压缩**: 大消息场景,减少 50-70% 传输量
6. **参数调优**: 合理设置超时、重试、线程数

**记忆口诀:**

```
优化Producer抓三点
批量异步加压缩
批量减少IO次数
异步避免线程等
压缩节省带宽用
参数调优别忽略
组合使用效果好
十万TPS轻松跑
```


### 58. 如何优化 Consumer 的性能?

**核心答案:**

Consumer 性能优化七大策略:
1. **并发消费**: 增加消费线程数量
2. **批量消费**: 一次处理多条消息
3. **增加实例**: 横向扩展消费者数量
4. **消费逻辑优化**: 异步处理耗时操作
5. **拉取参数优化**: 调整批量拉取大小
6. **消息过滤**: 减少不必要的消费
7. **负载均衡**: 合理分配队列

**详细说明:**

**1. 并发消费优化**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">单线程 vs 多线程消费</text>
<rect x="50" y="50" width="350" height="320" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="225" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#C62828">单线程消费(慢)</text>
<rect x="80" y="95" width="290" height="240" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="225" y="115" text-anchor="middle" font-size="10" fill="#1976D2">消费线程-1</text>
<rect x="100" y="130" width="250" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="150" text-anchor="middle" font-size="8" fill="#424242">消息1 (100ms)</text>
<path d="M 225 165 L 225 175" stroke="#9E9E9E" stroke-width="1" marker-end="url(#arrowGray)"/>
<rect x="100" y="180" width="250" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="200" text-anchor="middle" font-size="8" fill="#424242">消息2 (100ms)</text>
<path d="M 225 215 L 225 225" stroke="#9E9E9E" stroke-width="1" marker-end="url(#arrowGray)"/>
<rect x="100" y="230" width="250" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="250" text-anchor="middle" font-size="8" fill="#424242">消息3 (100ms)</text>
<path d="M 225 265 L 225 275" stroke="#9E9E9E" stroke-width="1" marker-end="url(#arrowGray)"/>
<rect x="100" y="280" width="250" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="225" y="300" text-anchor="middle" font-size="8" fill="#424242">消息4 (100ms)</text>
<text x="225" y="348" font-size="10" fill="#C62828">总耗时: 400ms</text>
<text x="225" y="365" font-size="11" fill="#E53935" font-weight="bold">TPS: 10条/秒</text>
<rect x="420" y="50" width="350" height="320" fill="#E8F5E9" stroke="#43A047" stroke-width="2" rx="5"/>
<text x="595" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">多线程并发(快)</text>
<rect x="450" y="95" width="130" height="240" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="515" y="115" text-anchor="middle" font-size="9" fill="#1976D2">线程-1</text>
<rect x="460" y="130" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="512" y="147" text-anchor="middle" font-size="7" fill="#424242">消息1</text>
<rect x="460" y="165" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="512" y="182" text-anchor="middle" font-size="7" fill="#424242">消息5</text>
<rect x="590" y="95" width="130" height="240" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="655" y="115" text-anchor="middle" font-size="9" fill="#1976D2">线程-2</text>
<rect x="600" y="130" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="652" y="147" text-anchor="middle" font-size="7" fill="#424242">消息2</text>
<rect x="600" y="165" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="652" y="182" text-anchor="middle" font-size="7" fill="#424242">消息6</text>
<rect x="450" y="200" width="130" height="135" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="515" y="220" text-anchor="middle" font-size="9" fill="#1976D2">线程-3</text>
<rect x="460" y="235" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="512" y="252" text-anchor="middle" font-size="7" fill="#424242">消息3</text>
<rect x="460" y="270" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="512" y="287" text-anchor="middle" font-size="7" fill="#424242">消息7</text>
<rect x="590" y="200" width="130" height="135" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="655" y="220" text-anchor="middle" font-size="9" fill="#1976D2">线程-4</text>
<rect x="600" y="235" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="652" y="252" text-anchor="middle" font-size="7" fill="#424242">消息4</text>
<rect x="600" y="270" width="105" height="25" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="2"/>
<text x="652" y="287" text-anchor="middle" font-size="7" fill="#424242">消息8</text>
<text x="595" y="348" font-size="10" fill="#2E7D32">总耗时: 100ms</text>
<text x="595" y="365" font-size="11" fill="#43A047" font-weight="bold">TPS: 80条/秒 (提升8倍)</text>
<defs>
<marker id="arrowGray" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
<path d="M 0 0 L 8 4 L 0 8 Z" fill="#9E9E9E"/>
</marker>
</defs>
</svg>

```java
// 方式1: 单线程消费(默认,低效)
public class SingleThreadConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("TestTopic", "*");

        // 默认线程数: 20
        // consumer.setConsumeThreadMin(20);
        // consumer.setConsumeThreadMax(20);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    // 模拟耗时操作(100ms)
                    processMessage(msg);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("单线程消费者启动...");
        // TPS: 约 200条/秒 (20线程 * 10条/秒)
    }

    private static void processMessage(MessageExt msg) {
        try {
            Thread.sleep(100); // 模拟业务处理
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

// 方式2: 多线程并发消费(高效)
public class MultiThreadConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("TestTopic", "*");

        // ========== 关键优化: 增加消费线程数 ==========
        // 最小消费线程数
        consumer.setConsumeThreadMin(64);
        // 最大消费线程数
        consumer.setConsumeThreadMax(128);

        // 线程池队列大小(消息缓冲)
        consumer.setPullThresholdForQueue(1000);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                for (MessageExt msg : msgs) {
                    processMessage(msg);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("多线程消费者启动...");
        // TPS: 约 1280条/秒 (128线程 * 10条/秒, 提升6倍)
    }

    private static void processMessage(MessageExt msg) {
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

**线程数计算公式:**

```
推荐线程数 = (单条消息处理时间ms / 目标消息处理间隔ms) × 并发度

示例:
- 单条消息处理100ms
- 目标: 每秒处理1000条(即1ms处理1条)
- 推荐线程数 = (100 / 1) × 2 = 200

注意:
- 消费线程数 ≤ 队列数时,每个线程负责一个队列
- 消费线程数 > 队列数时,多个线程消费同一队列
- 过多线程会增加上下文切换开销
```

**2. 批量消费优化**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">单条 vs 批量消费对比</text>
<rect x="50" y="50" width="350" height="270" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="225" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#C62828">单条消费</text>
<rect x="80" y="95" width="290" height="45" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="100" y="115" font-size="8" fill="#424242">消息1 → 处理 → 提交offset</text>
<text x="100" y="130" font-size="7" fill="#F57C00">DB写入1次 + 网络IO1次</text>
<rect x="80" y="150" width="290" height="45" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="100" y="170" font-size="8" fill="#424242">消息2 → 处理 → 提交offset</text>
<text x="100" y="185" font-size="7" fill="#F57C00">DB写入1次 + 网络IO1次</text>
<rect x="80" y="205" width="290" height="45" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="100" y="225" font-size="8" fill="#424242">消息3 → 处理 → 提交offset</text>
<text x="100" y="240" font-size="7" fill="#F57C00">DB写入1次 + 网络IO1次</text>
<text x="225" y="275" font-size="10" fill="#C62828">DB写入: 100次</text>
<text x="225" y="295" font-size="10" fill="#C62828">网络IO: 100次</text>
<text x="225" y="313" font-size="11" fill="#E53935" font-weight="bold">❌ 频繁IO</text>
<rect x="420" y="50" width="350" height="270" fill="#E8F5E9" stroke="#43A047" stroke-width="2" rx="5"/>
<text x="595" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">批量消费</text>
<rect x="450" y="95" width="290" height="140" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="595" y="115" text-anchor="middle" font-size="9" fill="#1976D2">消息批次(32条)</text>
<text x="470" y="138" font-size="8" fill="#424242">消息1, 消息2, ... 消息32</text>
<path d="M 595 150 L 595 165" stroke="#43A047" stroke-width="2" marker-end="url(#arrowGreen)"/>
<text x="595" y="185" text-anchor="middle" font-size="8" fill="#424242">批量处理业务逻辑</text>
<path d="M 595 195 L 595 210" stroke="#43A047" stroke-width="2" marker-end="url(#arrowGreen)"/>
<text x="595" y="228" text-anchor="middle" font-size="8" fill="#424242">批量DB写入(1次)</text>
<text x="595" y="258" font-size="10" fill="#2E7D32">DB写入: 4次 (100÷32≈4)</text>
<text x="595" y="278" font-size="10" fill="#2E7D32">网络IO: 4次</text>
<text x="595" y="300" font-size="11" fill="#43A047" font-weight="bold">✓ 提升25倍</text>
<defs>
<marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#43A047"/>
</marker>
</defs>
</svg>

```java
// 单条消费(低效)
public class SingleConsumeConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        // 每次消费1条
        consumer.setConsumeMessageBatchMaxSize(1);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // msgs只有1条
                for (MessageExt msg : msgs) {
                    Order order = parseOrder(msg);
                    // 单条写入数据库
                    saveToDatabase(order);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static Order parseOrder(MessageExt msg) {
        // 解析消息
        return new Order();
    }

    private static void saveToDatabase(Order order) {
        // 单条写入,性能低
    }

    static class Order {}
}

// 批量消费(高效)
public class BatchConsumeConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        // ========== 关键优化: 批量消费 ==========
        // 设置每次消费的最大消息数
        consumer.setConsumeMessageBatchMaxSize(32);

        // 批量拉取大小
        consumer.setPullBatchSize(64);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // msgs可能有多条(最多32条)
                List<Order> orders = new ArrayList<>();

                for (MessageExt msg : msgs) {
                    Order order = parseOrder(msg);
                    orders.add(order);
                }

                // 批量写入数据库(减少DB连接开销)
                batchSaveToDatabase(orders);

                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static Order parseOrder(MessageExt msg) {
        return new Order();
    }

    private static void batchSaveToDatabase(List<Order> orders) {
        // JDBC批量插入
        // INSERT INTO orders VALUES (?,?), (?,?), (?,?)...
        // 性能提升10-20倍
    }

    static class Order {}
}
```

**3. 增加消费者实例(横向扩展)**

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">横向扩展消费者</text>
<rect x="50" y="50" width="600" height="250" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="350" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="#37474F">Broker (4个队列)</text>
<rect x="100" y="90" width="110" height="30" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="155" y="110" text-anchor="middle" font-size="9" fill="#1976D2">Queue-0</text>
<rect x="225" y="90" width="110" height="30" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="280" y="110" text-anchor="middle" font-size="9" fill="#1976D2">Queue-1</text>
<rect x="350" y="90" width="110" height="30" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="405" y="110" text-anchor="middle" font-size="9" fill="#1976D2">Queue-2</text>
<rect x="475" y="90" width="110" height="30" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="530" y="110" text-anchor="middle" font-size="9" fill="#1976D2">Queue-3</text>
<path d="M 155 130 L 155 160" stroke="#E53935" stroke-width="2" marker-end="url(#arrowRed)"/>
<path d="M 280 130 L 155 160" stroke="#E53935" stroke-width="2" marker-end="url(#arrowRed)"/>
<path d="M 405 130 L 405 160" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen2)"/>
<path d="M 530 130 L 405 160" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen2)"/>
<rect x="90" y="160" width="130" height="60" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="155" y="180" text-anchor="middle" font-size="10" font-weight="bold" fill="#C62828">Consumer-1</text>
<text x="155" y="200" text-anchor="middle" font-size="8" fill="#424242">处理 Queue-0</text>
<text x="155" y="215" text-anchor="middle" font-size="8" fill="#424242">处理 Queue-1</text>
<rect x="340" y="160" width="130" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="405" y="180" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Consumer-2</text>
<text x="405" y="200" text-anchor="middle" font-size="8" fill="#424242">处理 Queue-2</text>
<text x="405" y="215" text-anchor="middle" font-size="8" fill="#424242">处理 Queue-3</text>
<text x="350" y="250" text-anchor="middle" font-size="10" fill="#2E7D32" font-weight="bold">✓ 2个消费者,性能翻倍</text>
<text x="350" y="270" text-anchor="middle" font-size="9" fill="#F57C00">注意: 消费者数量 ≤ 队列数量</text>
<text x="350" y="288" text-anchor="middle" font-size="8" fill="#7F8C8D">(超过队列数的消费者会空闲)</text>
<defs>
<marker id="arrowRed" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E53935"/>
</marker>
<marker id="arrowGreen2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
</defs>
</svg>

```bash
# 启动多个Consumer实例
# 机器1
java -jar consumer.jar --instance=1

# 机器2
java -jar consumer.jar --instance=2

# 机器3
java -jar consumer.jar --instance=3

# 机器4
java -jar consumer.jar --instance=4

# 4个消费者实例,自动负载均衡到4个队列
```

**4. 消费逻辑优化(异步处理)**

```java
public class AsyncBusinessConsumer {
    // 异步处理线程池
    private static final ExecutorService executor = new ThreadPoolExecutor(
        32, 64, 60, TimeUnit.SECONDS,
        new LinkedBlockingQueue<>(10000),
        new ThreadFactory() {
            private AtomicInteger index = new AtomicInteger(0);
            @Override
            public Thread newThread(Runnable r) {
                return new Thread(r, "AsyncBusiness-" + index.getAndIncrement());
            }
        }
    );

    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {

                // 快速解析消息
                List<Order> orders = new ArrayList<>();
                for (MessageExt msg : msgs) {
                    Order order = fastParse(msg); // 轻量级解析
                    orders.add(order);
                }

                // 异步处理耗时业务(不阻塞消费线程)
                executor.submit(() -> {
                    try {
                        // 耗时操作: 调用外部API
                        callExternalAPI(orders);
                        // 耗时操作: 写入数据库
                        batchSaveToDatabase(orders);
                        // 耗时操作: 发送通知
                        sendNotifications(orders);
                    } catch (Exception e) {
                        // 异步处理失败,记录日志
                        System.err.println("异步处理失败: " + e.getMessage());
                    }
                });

                // 立即返回成功,不等待异步任务完成
                // 注意: 这种方式适合可以容忍少量失败的场景
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static Order fastParse(MessageExt msg) {
        // 快速解析
        return new Order();
    }

    private static void callExternalAPI(List<Order> orders) {
        // 调用外部API
    }

    private static void batchSaveToDatabase(List<Order> orders) {
        // 批量数据库写入
    }

    private static void sendNotifications(List<Order> orders) {
        // 发送通知
    }

    static class Order {}
}
```

**5. 拉取参数优化**

```java
public class OptimizedPullConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("TestTopic", "*");

        // ========== 拉取参数优化 ==========

        // 1. 批量拉取大小(默认32)
        consumer.setPullBatchSize(64);

        // 2. 每个队列最大缓存消息数(默认1000)
        consumer.setPullThresholdForQueue(2000);

        // 3. 每个队列最大缓存消息大小(MB,默认100MB)
        consumer.setPullThresholdSizeForQueue(200);

        // 4. 拉取间隔(毫秒,默认0立即拉取)
        consumer.setPullInterval(0);

        // 5. 单次消费最大消息数(默认1)
        consumer.setConsumeMessageBatchMaxSize(32);

        // 6. 消费超时时间(分钟,默认15分钟)
        consumer.setConsumeTimeout(30);

        // 7. 消费线程数
        consumer.setConsumeThreadMin(64);
        consumer.setConsumeThreadMax(128);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // 批量处理
                processBatch(msgs);
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("优化后的消费者启动完成");
    }

    private static void processBatch(List<MessageExt> msgs) {
        // 批量处理逻辑
    }
}
```

**6. 消息过滤优化**

```java
// 使用Tag过滤,减少不必要消费
public class FilterConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");

        // 只订阅VIP订单
        consumer.subscribe("OrderTopic", "VIP");
        // 订阅多个Tag: "VIP || SVIP"
        // consumer.subscribe("OrderTopic", "VIP || SVIP");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // 只处理VIP订单,减少无效消费
                for (MessageExt msg : msgs) {
                    processVIPOrder(msg);
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static void processVIPOrder(MessageExt msg) {
        // 处理VIP订单
    }
}
```

**7. 性能优化对比**

| 优化措施 | 优化前 TPS | 优化后 TPS | 提升倍数 |
|---------|-----------|-----------|---------|
| 增加消费线程(20→128) | 200 | 1,280 | 6.4x |
| 批量消费(1→32) | 500 | 5,000 | 10x |
| 增加实例(1→4) | 1,000 | 4,000 | 4x |
| 异步处理业务 | 2,000 | 10,000 | 5x |
| 批量拉取(32→64) | 5,000 | 8,000 | 1.6x |
| **综合优化** | **500** | **20,000+** | **40x** |

**关键要点:**

1. **并发消费**: 增加线程数是最直接的优化
2. **批量消费**: 减少 DB 和网络 IO 次数
3. **横向扩展**: 增加消费者实例数(≤队列数)
4. **异步处理**: 耗时业务异步化,加快消费速度
5. **拉取优化**: 调整批量拉取和缓存参数
6. **消息过滤**: 使用 Tag 减少无效消费
7. **业务优化**: 优化业务逻辑本身最重要

**记忆口诀:**

```
优化Consumer七板斧
线程批量加实例
异步拉取配过滤
业务优化是根本
线程数量要合理
批量减少IO次
实例扩展要适度
异步提升吞吐量
组合使用效果佳
万级TPS不是梦
```


### 59. 什么是消息堆积？如何处理消息堆积？

**核心答案:**

**消息堆积**是指生产速度 > 消费速度,导致消息在 Broker 中大量积压未被消费。

**处理消息堆积的六大策略:**
1. **扩容消费者**: 增加消费者实例和线程数
2. **临时扩队列**: 增加队列数量分散负载
3. **降级处理**: 丢弃或延迟处理部分消息
4. **批量消费**: 提升单次消费效率
5. **业务优化**: 优化消费逻辑减少耗时
6. **转移消息**: 将堆积消息转存到新 Topic

**详细说明:**

**1. 消息堆积的形成过程**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">消息堆积示意图</text>
<rect x="50" y="50" width="700" height="330" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="80" y="80" width="180" height="120" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="170" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">Producer</text>
<text x="170" y="130" text-anchor="middle" font-size="10" fill="#424242">发送速度</text>
<text x="170" y="155" text-anchor="middle" font-size="18" font-weight="bold" fill="#2E7D32">1万条/秒</text>
<text x="170" y="185" font-size="9" fill="#2E7D32">✓ 性能良好</text>
<path d="M 270 140 L 310 140" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrowGreen3)"/>
<rect x="310" y="80" width="180" height="270" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">Broker</text>
<rect x="330" y="120" width="140" height="210" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="400" y="140" text-anchor="middle" font-size="10" fill="#C62828">消息堆积区</text>
<rect x="340" y="155" width="120" height="18" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="400" y="168" text-anchor="middle" font-size="8" fill="#424242">消息1-1000</text>
<rect x="340" y="178" width="120" height="18" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="400" y="191" text-anchor="middle" font-size="8" fill="#424242">消息1001-2000</text>
<rect x="340" y="201" width="120" height="18" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="400" y="214" text-anchor="middle" font-size="8" fill="#424242">消息2001-3000</text>
<text x="400" y="240" text-anchor="middle" font-size="9" fill="#C62828">...</text>
<rect x="340" y="250" width="120" height="18" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="400" y="263" text-anchor="middle" font-size="8" fill="#424242">消息9001-10000</text>
<text x="400" y="290" text-anchor="middle" font-size="11" font-weight="bold" fill="#E53935">堆积: 1000万条</text>
<text x="400" y="310" text-anchor="middle" font-size="9" fill="#F57C00">磁盘占用: 10GB</text>
<path d="M 500 140 L 540 140" stroke="#E53935" stroke-width="3" marker-end="url(#arrowRed2)"/>
<text x="520" y="130" text-anchor="middle" font-size="8" fill="#C62828">慢</text>
<rect x="540" y="80" width="180" height="120" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="630" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">Consumer</text>
<text x="630" y="130" text-anchor="middle" font-size="10" fill="#424242">消费速度</text>
<text x="630" y="155" text-anchor="middle" font-size="18" font-weight="bold" fill="#C62828">100条/秒</text>
<text x="630" y="185" font-size="9" fill="#C62828">❌ 消费太慢</text>
<text x="400" y="365" text-anchor="middle" font-size="11" fill="#E74C3C" font-weight="bold">⚠️ 堆积原因: 消费速度 &lt;&lt; 生产速度 (100倍差距)</text>
<defs>
<marker id="arrowGreen3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
<marker id="arrowRed2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E53935"/>
</marker>
</defs>
</svg>

**消息堆积的危害:**

```
1. 消息延迟: 堆积1000万条,按100条/秒消费,需要27小时才能消费完
2. 磁盘占满: 大量消息占用磁盘空间,可能导致Broker无法接收新消息
3. 内存压力: PageCache被大量消息占用,影响系统性能
4. 消费超时: 消息存储时间超过retention,可能被清理导致消息丢失
5. 业务影响: 订单延迟处理,用户体验差
```

**2. 方案一: 扩容消费者(快速有效)**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">扩容消费者解决堆积</text>
<rect x="50" y="50" width="700" height="350" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="#37474F">扩容前 vs 扩容后</text>
<rect x="80" y="95" width="310" height="280" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="235" y="118" text-anchor="middle" font-size="11" font-weight="bold" fill="#C62828">扩容前(堆积)</text>
<rect x="110" y="135" width="110" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="165" y="155" text-anchor="middle" font-size="9" fill="#F57C00">Broker</text>
<text x="165" y="175" text-anchor="middle" font-size="10" font-weight="bold" fill="#E53935">堆积1000万条</text>
<path d="M 165 205 L 165 225" stroke="#E53935" stroke-width="2" marker-end="url(#arrowRed3)"/>
<rect x="110" y="230" width="110" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="3"/>
<text x="165" y="250" text-anchor="middle" font-size="9" fill="#1976D2">Consumer</text>
<text x="165" y="270" text-anchor="middle" font-size="9" fill="#C62828">100条/秒</text>
<text x="235" y="320" text-anchor="middle" font-size="10" fill="#C62828">消费时间: 27小时</text>
<text x="235" y="345" text-anchor="middle" font-size="11" font-weight="bold" fill="#E53935">❌ 堆积严重</text>
<rect x="410" y="95" width="310" height="280" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="565" y="118" text-anchor="middle" font-size="11" font-weight="bold" fill="#2E7D32">扩容后(快速消费)</text>
<rect x="440" y="135" width="110" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="495" y="155" text-anchor="middle" font-size="9" fill="#F57C00">Broker</text>
<text x="495" y="175" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">堆积快速下降</text>
<path d="M 450 205 L 450 225" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen4)"/>
<path d="M 495 205 L 495 225" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen4)"/>
<path d="M 540 205 L 540 225" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen4)"/>
<rect x="440" y="230" width="55" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="467" y="248" text-anchor="middle" font-size="8" fill="#1976D2">C1</text>
<text x="467" y="265" text-anchor="middle" font-size="8" fill="#2E7D32">1000</text>
<text x="467" y="277" text-anchor="middle" font-size="7" fill="#7F8C8D">条/秒</text>
<rect x="505" y="230" width="55" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="532" y="248" text-anchor="middle" font-size="8" fill="#1976D2">C2</text>
<text x="532" y="265" text-anchor="middle" font-size="8" fill="#2E7D32">1000</text>
<text x="532" y="277" text-anchor="middle" font-size="7" fill="#7F8C8D">条/秒</text>
<rect x="570" y="230" width="55" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="597" y="248" text-anchor="middle" font-size="8" fill="#1976D2">C3</text>
<text x="597" y="265" text-anchor="middle" font-size="8" fill="#2E7D32">1000</text>
<text x="597" y="277" text-anchor="middle" font-size="7" fill="#7F8C8D">条/秒</text>
<rect x="635" y="230" width="55" height="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="1" rx="2"/>
<text x="662" y="248" text-anchor="middle" font-size="8" fill="#1976D2">...</text>
<text x="662" y="265" text-anchor="middle" font-size="8" fill="#2E7D32">1000</text>
<text x="662" y="277" text-anchor="middle" font-size="7" fill="#7F8C8D">条/秒</text>
<text x="565" y="305" text-anchor="middle" font-size="9" fill="#2E7D32">总消费: 10000条/秒</text>
<text x="565" y="325" text-anchor="middle" font-size="10" fill="#2E7D32">消费时间: 16分钟</text>
<text x="565" y="348" text-anchor="middle" font-size="11" font-weight="bold" fill="#43A047">✓ 快速消费(提升100倍)</text>
<defs>
<marker id="arrowRed3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E53935"/>
</marker>
<marker id="arrowGreen4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
</defs>
</svg>

```java
// 扩容方案1: 增加消费者实例
public class ScaleConsumer {
    public static void main(String[] args) throws Exception {
        // 1. 检查当前Topic的队列数
        // sh bin/mqadmin topicStatus -t OrderTopic -n localhost:9876
        // 假设队列数为16

        // 2. 启动多个Consumer实例(与队列数相同)
        for (int i = 0; i < 16; i++) {
            startConsumerInstance(i);
        }

        // 3. 每个实例会自动负载均衡到不同队列
        // 消费速度 = 单实例速度 × 实例数
    }

    private static void startConsumerInstance(int instanceId) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.setInstanceName("Consumer-Instance-" + instanceId);

        // 增加消费线程数
        consumer.setConsumeThreadMin(64);
        consumer.setConsumeThreadMax(128);

        // 批量消费
        consumer.setConsumeMessageBatchMaxSize(32);

        consumer.subscribe("OrderTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // 快速消费
                batchProcess(msgs);
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
        System.out.println("消费者实例-" + instanceId + " 启动完成");
    }

    private static void batchProcess(List<MessageExt> msgs) {
        // 批量处理逻辑
    }
}

// 扩容方案2: 单机多实例部署脚本
```

```bash
#!/bin/bash
# scale_consumer.sh - 快速启动多个Consumer实例

INSTANCE_COUNT=16  # 实例数量

for i in $(seq 0 $((INSTANCE_COUNT-1))); do
    echo "启动Consumer实例-$i"
    nohup java -jar consumer.jar \
        -DinstanceId=$i \
        -DconsumerGroup=ConsumerGroup \
        -Xms2g -Xmx2g \
        > logs/consumer-$i.log 2>&1 &
done

echo "所有Consumer实例启动完成"
echo "查看消费进度: sh bin/mqadmin consumerProgress -g ConsumerGroup -n localhost:9876"
```

**3. 方案二: 临时扩队列(治标)**

```bash
# 步骤1: 创建临时Topic(更多队列)
sh bin/mqadmin updateTopic \
    -n localhost:9876 \
    -t OrderTopic_Temp \
    -c DefaultCluster \
    -r 64 -w 64  # 64个读写队列

# 步骤2: 将堆积消息转移到临时Topic
# 使用专门的消息转移Consumer
```

```java
// 消息转移Consumer
public class MessageTransferConsumer {
    public static void main(String[] args) throws Exception {
        // 从原Topic消费
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("TransferGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        // 转发到临时Topic
        DefaultMQProducer producer = new DefaultMQProducer("TransferProducer");
        producer.setNamesrvAddr("localhost:9876");
        producer.start();

        consumer.setConsumeThreadMin(128); // 快速转移
        consumer.setConsumeMessageBatchMaxSize(64);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                try {
                    // 批量转发到临时Topic
                    List<Message> transferMsgs = new ArrayList<>();
                    for (MessageExt msg : msgs) {
                        Message newMsg = new Message(
                            "OrderTopic_Temp", // 临时Topic
                            msg.getTags(),
                            msg.getBody()
                        );
                        transferMsgs.add(newMsg);
                    }
                    producer.send(transferMsgs);
                    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                } catch (Exception e) {
                    return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                }
            }
        });

        consumer.start();
    }
}

// 步骤3: 启动大量Consumer消费临时Topic
// 64个队列 + 64个Consumer实例 + 128消费线程 = 极快消费
```

**4. 方案三: 降级处理(紧急)**

```java
// 降级策略1: 丢弃低优先级消息
public class DegradeConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {

                for (MessageExt msg : msgs) {
                    String priority = msg.getUserProperty("priority");

                    // 降级: 只处理高优先级消息
                    if ("HIGH".equals(priority)) {
                        processMessage(msg);
                    } else {
                        // 低优先级消息直接丢弃或记录日志
                        System.out.println("降级丢弃消息: " + msg.getMsgId());
                    }
                }

                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static void processMessage(MessageExt msg) {
        // 处理消息
    }
}

// 降级策略2: 简化处理逻辑
public class SimplifiedConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {

                for (MessageExt msg : msgs) {
                    // 降级: 跳过耗时操作
                    // 原: 复杂业务处理 + 调用外部API + 发送通知
                    // 降级后: 仅核心数据入库
                    quickSaveToDatabase(msg);
                }

                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }

    private static void quickSaveToDatabase(MessageExt msg) {
        // 仅保存核心数据,跳过耗时操作
    }
}
```

**5. 监控消息堆积**

```bash
# 查看消费进度(堆积数量)
sh bin/mqadmin consumerProgress \
    -g ConsumerGroup \
    -n localhost:9876

# 输出示例:
#TOPIC            BROKER    QUEUE  CONSUMER_LAG
#OrderTopic       broker-a  0      10000000      ← 堆积1000万条
#OrderTopic       broker-a  1      10000000
#OrderTopic       broker-a  2      10000000
#OrderTopic       broker-a  3      10000000
```

```java
// Java API监控堆积
public class MessageBacklogMonitor {
    public static void main(String[] args) throws Exception {
        DefaultMQAdminExt admin = new DefaultMQAdminExt();
        admin.setNamesrvAddr("localhost:9876");
        admin.start();

        // 查询消费进度
        ConsumeStats stats = admin.examineConsumeStats("ConsumerGroup");

        long totalDiff = 0; // 总堆积数
        for (Map.Entry<MessageQueue, OffsetWrapper> entry : stats.getOffsetTable().entrySet()) {
            MessageQueue mq = entry.getKey();
            OffsetWrapper offset = entry.getValue();

            long brokerOffset = offset.getBrokerOffset(); // Broker最大offset
            long consumerOffset = offset.getConsumerOffset(); // Consumer当前offset
            long diff = brokerOffset - consumerOffset; // 堆积数量

            if (diff > 0) {
                System.out.println("队列: " + mq + ", 堆积: " + diff);
                totalDiff += diff;
            }
        }

        System.out.println("总堆积数: " + totalDiff);

        // 告警阈值
        if (totalDiff > 1000000) {
            sendAlert("消息堆积超过100万条!");
        }

        admin.shutdown();
    }

    private static void sendAlert(String message) {
        // 发送告警
    }
}
```

**6. 处理流程总结**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">消息堆积处理流程</text>
<rect x="50" y="50" width="700" height="430" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="300" y="80" width="200" height="45" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="108" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">发现消息堆积</text>
<path d="M 400 130 L 400 155" stroke="#607D8B" stroke-width="2" marker-end="url(#arrowGray2)"/>
<rect x="300" y="160" width="200" height="45" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="188" text-anchor="middle" font-size="10" fill="#F57C00">评估堆积程度</text>
<path d="M 400 210 L 400 235" stroke="#607D8B" stroke-width="2" marker-end="url(#arrowGray2)"/>
<rect x="80" y="240" width="200" height="55" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="180" y="260" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">轻度堆积</text>
<text x="180" y="278" text-anchor="middle" font-size="8" fill="#7F8C8D">堆积&lt;100万条</text>
<rect x="300" y="240" width="200" height="55" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="400" y="260" text-anchor="middle" font-size="10" font-weight="bold" fill="#F57C00">中度堆积</text>
<text x="400" y="278" text-anchor="middle" font-size="8" fill="#7F8C8D">100万-1000万条</text>
<rect x="520" y="240" width="200" height="55" fill="#FFEBEE" stroke="#E53935" stroke-width="2" rx="5"/>
<text x="620" y="260" text-anchor="middle" font-size="10" font-weight="bold" fill="#C62828">重度堆积</text>
<text x="620" y="278" text-anchor="middle" font-size="8" fill="#7F8C8D">堆积&gt;1000万条</text>
<path d="M 180 300 L 180 325" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen5)"/>
<path d="M 400 300 L 400 325" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange)"/>
<path d="M 620 300 L 620 325" stroke="#E53935" stroke-width="2" marker-end="url(#arrowRed4)"/>
<rect x="80" y="330" width="200" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="180" y="348" text-anchor="middle" font-size="9" fill="#2E7D32">方案一</text>
<text x="95" y="365" font-size="8" fill="#424242">• 增加消费线程</text>
<text x="95" y="380" font-size="8" fill="#424242">• 批量消费</text>
<rect x="300" y="330" width="200" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="1" rx="3"/>
<text x="400" y="348" text-anchor="middle" font-size="9" fill="#F57C00">方案二</text>
<text x="315" y="365" font-size="8" fill="#424242">• 扩容消费者实例</text>
<text x="315" y="380" font-size="8" fill="#424242">• 业务逻辑优化</text>
<rect x="520" y="330" width="200" height="60" fill="#FFEBEE" stroke="#E53935" stroke-width="1" rx="3"/>
<text x="620" y="348" text-anchor="middle" font-size="9" fill="#C62828">方案三(紧急)</text>
<text x="535" y="365" font-size="8" fill="#424242">• 临时扩队列转移</text>
<text x="535" y="380" font-size="8" fill="#424242">• 降级处理</text>
<path d="M 180 395 L 180 410" stroke="#4CAF50" stroke-width="1" marker-end="url(#arrowGreen5)"/>
<path d="M 400 395 L 400 410" stroke="#FF9800" stroke-width="1" marker-end="url(#arrowOrange)"/>
<path d="M 620 395 L 620 410" stroke="#E53935" stroke-width="1" marker-end="url(#arrowRed4)"/>
<rect x="250" y="415" width="300" height="45" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="400" y="443" text-anchor="middle" font-size="11" font-weight="bold" fill="#1976D2">监控堆积下降 → 恢复正常</text>
<defs>
<marker id="arrowGray2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#607D8B"/>
</marker>
<marker id="arrowGreen5" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
<marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#FF9800"/>
</marker>
<marker id="arrowRed4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#E53935"/>
</marker>
</defs>
</svg>

**7. 预防消息堆积**

```java
// 预防措施1: 消费限流
public class RateLimitConsumer {
    public static void main(String[] args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        // 设置拉取阈值(避免一次拉取过多)
        consumer.setPullThresholdForQueue(1000); // 每个队列最多1000条
        consumer.setPullThresholdSizeForQueue(100); // 每个队列最多100MB

        // 设置消费超时(避免单条消息阻塞过久)
        consumer.setConsumeTimeout(15); // 15分钟

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // 快速消费
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();
    }
}

// 预防措施2: 动态调整消费线程
public class DynamicThreadConsumer {
    private static DefaultMQPushConsumer consumer;

    public static void main(String[] args) throws Exception {
        consumer = new DefaultMQPushConsumer("ConsumerGroup");
        consumer.setNamesrvAddr("localhost:9876");
        consumer.subscribe("OrderTopic", "*");

        // 初始线程数
        consumer.setConsumeThreadMin(32);
        consumer.setConsumeThreadMax(64);

        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(
                List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });

        consumer.start();

        // 定期检测堆积,动态调整线程数
        scheduleThreadAdjustment();
    }

    private static void scheduleThreadAdjustment() {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(() -> {
            try {
                long backlog = getBacklogCount();
                if (backlog > 100000) {
                    // 堆积超过10万,增加线程
                    consumer.setConsumeThreadMax(128);
                    System.out.println("堆积增加,线程数调整为128");
                } else if (backlog < 10000) {
                    // 堆积少,减少线程
                    consumer.setConsumeThreadMax(64);
                    System.out.println("堆积减少,线程数调整为64");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }, 0, 30, TimeUnit.SECONDS);
    }

    private static long getBacklogCount() {
        // 查询堆积数量
        return 0;
    }
}
```

**关键要点:**

1. **发现堆积**: 监控消费进度,及时发现堆积
2. **快速扩容**: 增加消费者实例和线程数
3. **批量消费**: 减少 IO 开销,提升消费速度
4. **临时方案**: 扩队列转移消息,快速消化堆积
5. **降级处理**: 紧急情况下丢弃低优先级消息
6. **预防为主**: 合理规划消费能力,避免堆积发生
7. **业务优化**: 优化消费逻辑是根本

**记忆口诀:**

```
消息堆积莫慌张
监控发现定方案
轻度堆积增线程
中度堆积扩实例
重度堆积扩队列
降级处理保核心
批量消费提效率
预防为主最重要
消费能力要匹配
定期演练应急案
```

### 60. 如何监控 RocketMQ 的性能指标？

**核心答案:**

监控 RocketMQ 性能指标有五种方式:
1. **命令行工具**: mqadmin 命令查看实时状态
2. **Dashboard**: 官方可视化监控平台
3. **Metrics 埋点**: Prometheus + Grafana 监控
4. **JMX**: Java Management Extensions 监控
5. **日志分析**: 解析日志统计指标

**详细说明:**

**1. 核心性能指标**

<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">RocketMQ 核心监控指标</text>
<rect x="50" y="50" width="700" height="410" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="80" y="75" width="320" height="180" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="240" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">生产端指标</text>
<text x="100" y="125" font-size="9" fill="#424242" font-weight="bold">吞吐量指标:</text>
<text x="110" y="145" font-size="8" fill="#424242">• TPS (每秒发送消息数)</text>
<text x="110" y="163" font-size="8" fill="#424242">• 发送成功率 (%)</text>
<text x="110" y="181" font-size="8" fill="#424242">• 发送失败率 (%)</text>
<text x="100" y="205" font-size="9" fill="#424242" font-weight="bold">延迟指标:</text>
<text x="110" y="223" font-size="8" fill="#424242">• 发送平均耗时 (ms)</text>
<text x="110" y="241" font-size="8" fill="#424242">• 发送最大耗时 (ms)</text>
<rect x="420" y="75" width="320" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="580" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">消费端指标</text>
<text x="440" y="125" font-size="9" fill="#424242" font-weight="bold">吞吐量指标:</text>
<text x="450" y="145" font-size="8" fill="#424242">• TPS (每秒消费消息数)</text>
<text x="450" y="163" font-size="8" fill="#424242">• 消费成功率 (%)</text>
<text x="450" y="181" font-size="8" fill="#424242">• 消费失败率 (%)</text>
<text x="440" y="205" font-size="9" fill="#424242" font-weight="bold">延迟指标:</text>
<text x="450" y="223" font-size="8" fill="#424242">• 消费延迟 (ms)</text>
<text x="450" y="241" font-size="8" fill="#424242">• 消息堆积数量</text>
<rect x="80" y="270" width="320" height="175" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="240" y="295" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">Broker指标</text>
<text x="100" y="320" font-size="9" fill="#424242" font-weight="bold">存储指标:</text>
<text x="110" y="338" font-size="8" fill="#424242">• 磁盘使用率 (%)</text>
<text x="110" y="356" font-size="8" fill="#424242">• 消息存储量 (条/GB)</text>
<text x="100" y="378" font-size="9" fill="#424242" font-weight="bold">性能指标:</text>
<text x="110" y="396" font-size="8" fill="#424242">• PageCache命中率 (%)</text>
<text x="110" y="414" font-size="8" fill="#424242">• IO等待时间 (ms)</text>
<text x="110" y="432" font-size="8" fill="#424242">• 刷盘耗时 (ms)</text>
<rect x="420" y="270" width="320" height="175" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="580" y="295" text-anchor="middle" font-size="12" font-weight="bold" fill="#7B1FA2">系统指标</text>
<text x="440" y="320" font-size="9" fill="#424242" font-weight="bold">资源指标:</text>
<text x="450" y="338" font-size="8" fill="#424242">• CPU使用率 (%)</text>
<text x="450" y="356" font-size="8" fill="#424242">• 内存使用率 (%)</text>
<text x="450" y="374" font-size="8" fill="#424242">• 网络IO (MB/s)</text>
<text x="440" y="396" font-size="9" fill="#424242" font-weight="bold">JVM指标:</text>
<text x="450" y="414" font-size="8" fill="#424242">• GC频率和耗时</text>
<text x="450" y="432" font-size="8" fill="#424242">• 堆内存使用 (MB)</text>
</svg>

**2. 命令行监控(mqadmin)**

```bash
# 1. 查看集群状态
sh bin/mqadmin clusterList -n localhost:9876

# 输出:
#Cluster Name  Broker Name  BID  Addr              Version
#DefaultCluster broker-a     0    192.168.1.100:10911  V4_9_3
#DefaultCluster broker-a     1    192.168.1.101:10911  V4_9_3

# 2. 查看Topic统计信息
sh bin/mqadmin topicStatus -t OrderTopic -n localhost:9876

# 输出:
#BROKER_NAME  QUEUE_ID  MIN_OFFSET  MAX_OFFSET  LAST_UPDATE_TIME
#broker-a     0         0           1000000     2024-01-20 10:00:00
#broker-a     1         0           1000000     2024-01-20 10:00:00
#broker-a     2         0           1000000     2024-01-20 10:00:00
#broker-a     3         0           1000000     2024-01-20 10:00:00

# 3. 查看消费进度(重要!)
sh bin/mqadmin consumerProgress -g ConsumerGroup -n localhost:9876

# 输出:
#TOPIC      BROKER  QUEUE  BROKER_OFFSET  CONSUMER_OFFSET  DIFF    LAST_TIMESTAMP
#OrderTopic broker-a 0     1000000       950000           50000   2024-01-20 10:00:00
#OrderTopic broker-a 1     1000000       980000           20000   2024-01-20 10:00:01
#OrderTopic broker-a 2     1000000       990000           10000   2024-01-20 10:00:02
#OrderTopic broker-a 3     1000000       1000000          0       2024-01-20 10:00:03
#
#Consumer TPS: 1000  ← 消费速度
#Diff Total: 80000   ← 总堆积数

# 4. 查看Broker统计信息
sh bin/mqadmin brokerStatus -b 192.168.1.100:10911 -n localhost:9876

# 输出:
#bootTimestamp: 2024-01-20 08:00:00
#msgPutTotalTodayNow: 10000000      ← 今日发送消息数
#msgGetTotalTodayNow: 9500000       ← 今日消费消息数
#msgPutTotalTodayMorning: 3000000   ← 今日凌晨发送数
#msgGetTotalTodayMorning: 2900000   ← 今日凌晨消费数
#...

# 5. 查看消费者连接
sh bin/mqadmin consumerConnection -g ConsumerGroup -n localhost:9876

# 输出:
#CLIENT_ID                    VERSION  LANGUAGE  TPS
#192.168.1.200@12345          V4_9_3   JAVA      500
#192.168.1.201@12346          V4_9_3   JAVA      500

# 6. 查看Producer连接
sh bin/mqadmin producerConnection -g ProducerGroup -t OrderTopic -n localhost:9876

# 7. 监控脚本(定时采集)
```

```bash
#!/bin/bash
# monitor_rocketmq.sh - 定时监控脚本

NAMESRV="localhost:9876"
CONSUMER_GROUP="ConsumerGroup"
LOG_FILE="/var/log/rocketmq_monitor.log"

while true; do
    echo "========== $(date '+%Y-%m-%d %H:%M:%S') ==========" >> $LOG_FILE

    # 查询消费进度
    sh bin/mqadmin consumerProgress \
        -g $CONSUMER_GROUP \
        -n $NAMESRV >> $LOG_FILE 2>&1

    # 提取堆积数量
    DIFF_TOTAL=$(sh bin/mqadmin consumerProgress \
        -g $CONSUMER_GROUP -n $NAMESRV 2>/dev/null | \
        grep "Diff Total" | awk '{print $3}')

    echo "Total Backlog: $DIFF_TOTAL" >> $LOG_FILE

    # 告警(堆积超过100万)
    if [ $DIFF_TOTAL -gt 1000000 ]; then
        echo "ALERT: Message backlog exceeds 1 million!" >> $LOG_FILE
        # 发送告警
        # curl -X POST https://alert.example.com/api/alert \
        #     -d "message=RocketMQ backlog: $DIFF_TOTAL"
    fi

    sleep 60  # 每60秒采集一次
done
```

**3. Dashboard 可视化监控**

```bash
# 安装RocketMQ Dashboard(官方)
git clone https://github.com/apache/rocketmq-dashboard.git
cd rocketmq-dashboard

# 配置NameServer地址
vi src/main/resources/application.properties
# rocketmq.config.namesrvAddr=localhost:9876

# 编译运行
mvn clean package -Dmaven.test.skip=true
java -jar target/rocketmq-dashboard-1.0.0.jar

# 访问: http://localhost:8080
```

**Dashboard 功能:**
- 集群拓扑展示
- Topic/ConsumerGroup 管理
- 消息查询和追踪
- 消费进度实时监控
- Broker 运行状态
- 生产/消费 TPS 曲线

**4. Prometheus + Grafana 监控(推荐)**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2C3E50">Prometheus + Grafana 监控架构</text>
<rect x="50" y="50" width="700" height="280" fill="#ECEFF1" stroke="#607D8B" stroke-width="2" rx="5"/>
<rect x="100" y="80" width="150" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="175" y="100" text-anchor="middle" font-size="10" font-weight="bold" fill="#1976D2">RocketMQ Broker</text>
<text x="175" y="120" text-anchor="middle" font-size="8" fill="#424242">暴露Metrics接口</text>
<text x="175" y="133" text-anchor="middle" font-size="7" fill="#7F8C8D">:5557/metrics</text>
<path d="M 250 110 L 320 110" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen6)"/>
<text x="285" y="100" text-anchor="middle" font-size="8" fill="#2E7D32">拉取</text>
<rect x="320" y="80" width="150" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="395" y="100" text-anchor="middle" font-size="10" font-weight="bold" fill="#2E7D32">Prometheus</text>
<text x="395" y="120" text-anchor="middle" font-size="8" fill="#424242">时序数据库</text>
<text x="395" y="133" text-anchor="middle" font-size="7" fill="#7F8C8D">存储指标数据</text>
<path d="M 470 110 L 540 110" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange2)"/>
<text x="505" y="100" text-anchor="middle" font-size="8" fill="#F57C00">查询</text>
<rect x="540" y="80" width="150" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="615" y="100" text-anchor="middle" font-size="10" font-weight="bold" fill="#F57C00">Grafana</text>
<text x="615" y="120" text-anchor="middle" font-size="8" fill="#424242">可视化展示</text>
<text x="615" y="133" text-anchor="middle" font-size="7" fill="#7F8C8D">Dashboard</text>
<rect x="100" y="170" width="590" height="140" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="395" y="192" text-anchor="middle" font-size="11" font-weight="bold" fill="#7B1FA2">监控指标示例</text>
<text x="120" y="215" font-size="8" fill="#424242" font-weight="bold">生产指标:</text>
<text x="130" y="233" font-size="7" fill="#424242">• rocketmq_producer_tps: 生产TPS</text>
<text x="130" y="248" font-size="7" fill="#424242">• rocketmq_producer_message_size: 消息大小</text>
<text x="120" y="270" font-size="8" fill="#424242" font-weight="bold">消费指标:</text>
<text x="130" y="288" font-size="7" fill="#424242">• rocketmq_consumer_tps: 消费TPS</text>
<text x="130" y="303" font-size="7" fill="#424242">• rocketmq_consumer_lag: 消费延迟</text>
<text x="420" y="215" font-size="8" fill="#424242" font-weight="bold">Broker指标:</text>
<text x="430" y="233" font-size="7" fill="#424242">• rocketmq_broker_qps: Broker QPS</text>
<text x="430" y="248" font-size="7" fill="#424242">• rocketmq_broker_put_latency: 写入延迟</text>
<text x="420" y="270" font-size="8" fill="#424242" font-weight="bold">系统指标:</text>
<text x="430" y="288" font-size="7" fill="#424242">• process_cpu_seconds_total: CPU使用</text>
<text x="430" y="303" font-size="7" fill="#424242">• jvm_memory_bytes_used: 内存使用</text>
<defs>
<marker id="arrowGreen6" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#4CAF50"/>
</marker>
<marker id="arrowOrange2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M 0 0 L 10 5 L 0 10 Z" fill="#FF9800"/>
</marker>
</defs>
</svg>

```properties
# broker.conf - 开启Metrics导出
# 开启Prometheus Exporter
metricsExporterType=PROM
metricsPromExporterPort=5557
metricsPromExporterHost=0.0.0.0

# 指标采集间隔(秒)
metricsGrpcExporterTimerPeriod=60
```

```yaml
# prometheus.yml - Prometheus配置
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  # RocketMQ Broker监控
  - job_name: 'rocketmq-broker'
    static_configs:
      - targets:
        - '192.168.1.100:5557'  # Broker1
        - '192.168.1.101:5557'  # Broker2
    metrics_path: '/metrics'

  # RocketMQ NameServer监控
  - job_name: 'rocketmq-nameserver'
    static_configs:
      - targets:
        - '192.168.1.100:5558'
```

```yaml
# docker-compose.yml - 快速部署监控
version: '3'
services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-storage:/var/lib/grafana

volumes:
  grafana-storage:

# 启动: docker-compose up -d
# 访问Grafana: http://localhost:3000 (admin/admin)
```

**Grafana Dashboard 配置:**

```json
// dashboard.json - Grafana面板配置示例
{
  "dashboard": {
    "title": "RocketMQ监控",
    "panels": [
      {
        "title": "生产TPS",
        "targets": [
          {
            "expr": "rate(rocketmq_producer_message_total[1m])"
          }
        ]
      },
      {
        "title": "消费TPS",
        "targets": [
          {
            "expr": "rate(rocketmq_consumer_message_total[1m])"
          }
        ]
      },
      {
        "title": "消息堆积",
        "targets": [
          {
            "expr": "rocketmq_consumer_lag_total"
          }
        ]
      },
      {
        "title": "Broker延迟",
        "targets": [
          {
            "expr": "rocketmq_broker_put_message_latency"
          }
        ]
      }
    ]
  }
}
```

**5. Java API 监控**

```java
// 自定义监控采集器
public class RocketMQMonitor {
    private DefaultMQAdminExt admin;
    private ScheduledExecutorService scheduler;

    public void start() throws Exception {
        admin = new DefaultMQAdminExt();
        admin.setNamesrvAddr("localhost:9876");
        admin.start();

        // 定时采集指标
        scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(this::collectMetrics, 0, 30, TimeUnit.SECONDS);
    }

    private void collectMetrics() {
        try {
            // 1. 采集生产指标
            collectProducerMetrics();

            // 2. 采集消费指标
            collectConsumerMetrics();

            // 3. 采集Broker指标
            collectBrokerMetrics();

            // 4. 采集Topic指标
            collectTopicMetrics();

        } catch (Exception e) {
            System.err.println("采集指标失败: " + e.getMessage());
        }
    }

    // 采集生产指标
    private void collectProducerMetrics() throws Exception {
        TopicList topics = admin.fetchAllTopicList();

        for (String topic : topics.getTopicList()) {
            TopicStatsTable stats = admin.examineTopicStats(topic);

            long totalMessages = 0;
            for (MessageQueue mq : stats.getOffsetTable().keySet()) {
                TopicOffset offset = stats.getOffsetTable().get(mq);
                totalMessages += offset.getMaxOffset();
            }

            // 上报指标
            reportMetric("producer_total_messages", topic, totalMessages);
        }
    }

    // 采集消费指标
    private void collectConsumerMetrics() throws Exception {
        ConsumerConnection cc = admin.examineConsumerConnectionInfo("ConsumerGroup");

        for (Connection conn : cc.getConnectionSet()) {
            // 连接数
            reportMetric("consumer_connections", "ConsumerGroup", 1);
        }

        // 消费进度
        ConsumeStats stats = admin.examineConsumeStats("ConsumerGroup");
        long totalDiff = 0;

        for (Map.Entry<MessageQueue, OffsetWrapper> entry : stats.getOffsetTable().entrySet()) {
            OffsetWrapper offset = entry.getValue();
            long diff = offset.getBrokerOffset() - offset.getConsumerOffset();
            totalDiff += diff;
        }

        // 堆积数量
        reportMetric("consumer_lag", "ConsumerGroup", totalDiff);
    }

    // 采集Broker指标
    private void collectBrokerMetrics() throws Exception {
        ClusterInfo clusterInfo = admin.examineBrokerClusterInfo();

        for (String brokerName : clusterInfo.getBrokerAddrTable().keySet()) {
            HashMap<Long, String> brokerAddrs = clusterInfo.getBrokerAddrTable().get(brokerName);

            for (Map.Entry<Long, String> entry : brokerAddrs.entrySet()) {
                String addr = entry.getValue();

                // 查询Broker统计信息
                KVTable kvTable = admin.fetchBrokerRuntimeStats(addr);

                // 提取关键指标
                String msgPutTotal = kvTable.getTable().get("msgPutTotalTodayNow");
                String msgGetTotal = kvTable.getTable().get("msgGetTotalTodayNow");

                reportMetric("broker_put_total", brokerName, Long.parseLong(msgPutTotal));
                reportMetric("broker_get_total", brokerName, Long.parseLong(msgGetTotal));
            }
        }
    }

    // 采集Topic指标
    private void collectTopicMetrics() throws Exception {
        TopicList topics = admin.fetchAllTopicList();

        for (String topic : topics.getTopicList()) {
            TopicStatsTable stats = admin.examineTopicStats(topic);

            // 队列数量
            int queueCount = stats.getOffsetTable().size();
            reportMetric("topic_queue_count", topic, queueCount);

            // 总消息数
            long totalMessages = 0;
            for (TopicOffset offset : stats.getOffsetTable().values()) {
                totalMessages += offset.getMaxOffset();
            }
            reportMetric("topic_total_messages", topic, totalMessages);
        }
    }

    // 上报指标(对接Prometheus/InfluxDB等)
    private void reportMetric(String metricName, String label, long value) {
        // 推送到Prometheus Pushgateway
        // 或写入InfluxDB
        // 或输出到日志
        System.out.println(String.format("%s{label=\"%s\"} %d", metricName, label, value));
    }

    public void shutdown() {
        if (scheduler != null) {
            scheduler.shutdown();
        }
        if (admin != null) {
            admin.shutdown();
        }
    }

    public static void main(String[] args) throws Exception {
        RocketMQMonitor monitor = new RocketMQMonitor();
        monitor.start();

        // 保持运行
        Thread.sleep(Long.MAX_VALUE);
    }
}
```

**6. 告警规则配置**

```yaml
# prometheus_alerts.yml - Prometheus告警规则
groups:
  - name: rocketmq_alerts
    interval: 30s
    rules:
      # 消息堆积告警
      - alert: MessageBacklogHigh
        expr: rocketmq_consumer_lag_total > 1000000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "消息堆积超过100万条"
          description: "ConsumerGroup {{ $labels.group }} 堆积 {{ $value }} 条消息"

      # 消费速度过慢告警
      - alert: ConsumeTpsLow
        expr: rate(rocketmq_consumer_message_total[5m]) < 100
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "消费速度过慢"
          description: "消费TPS仅 {{ $value }} 条/秒"

      # Broker离线告警
      - alert: BrokerDown
        expr: up{job="rocketmq-broker"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Broker离线"
          description: "Broker {{ $labels.instance }} 已离线"

      # 磁盘使用率告警
      - alert: DiskUsageHigh
        expr: (1 - node_filesystem_avail_bytes / node_filesystem_size_bytes) > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "磁盘使用率超过80%"
          description: "磁盘使用率 {{ $value }}%"
```

**7. 监控最佳实践**

| 监控项 | 告警阈值 | 检查频率 | 处理动作 |
|-------|---------|---------|---------|
| 消息堆积 | > 100万条 | 1分钟 | 扩容消费者 |
| 消费TPS | < 目标值50% | 5分钟 | 检查消费逻辑 |
| Broker离线 | down | 30秒 | 紧急故障处理 |
| 磁盘使用率 | > 80% | 5分钟 | 清理旧消息/扩容 |
| JVM GC | 单次>1s | 5分钟 | JVM调优 |
| 网络IO | > 带宽80% | 5分钟 | 升级网络/限流 |

**关键要点:**

1. **核心指标**: TPS、堆积、延迟是最重要的三个指标
2. **实时监控**: 使用 Dashboard 或 Grafana 实时查看
3. **告警及时**: 设置合理阈值,及时发现问题
4. **历史数据**: Prometheus 保存历史数据,便于分析
5. **全链路监控**: 生产-存储-消费全链路
6. **定期演练**: 定期模拟故障,验证监控告警
7. **文档记录**: 记录历史故障和处理方案

**记忆口诀:**

```
监控RocketMQ六大招
命令Dashboard和Grafana
Prometheus采集指标
JMX查看JVM状
核心指标要盯紧
TPS堆积和延迟
告警阈值要合理
及时发现快响应
全链路监控不能少
生产消费加存储
定期演练保可靠
文档记录防遗忘
```
