## 过期策略与淘汰机制

### 21. Redis 的过期键删除策略有哪些？

**核心答案：**

Redis 采用 **惰性删除（Lazy Deletion）** + **定期删除（Periodic Deletion）** 的组合策略来删除过期键。

**详细说明：**

Redis 有三种理论上的过期键删除策略：

**1. 定时删除（Timer Deletion）**
- 为每个设置了过期时间的键创建一个定时器
- 到期时立即删除键
- ✅ 优点：内存友好，能及时释放内存空间
- ❌ 缺点：CPU 不友好，大量定时器会消耗大量 CPU 资源

**2. 惰性删除（Lazy Deletion）**
- 键过期后不立即删除
- 只有在访问键时才检查是否过期，如果过期则删除
- ✅ 优点：CPU 友好，删除操作只在需要时发生
- ❌ 缺点：内存不友好，过期键可能长期占用内存

**3. 定期删除（Periodic Deletion）**
- 每隔一段时间执行一次删除过期键操作
- 随机检查一定数量的键，删除其中的过期键
- ✅ 优点：通过限制操作的时长和频率，平衡 CPU 和内存使用
- ❌ 缺点：难以确定最优的执行时长和频率

**Redis 的实际实现：**

Redis 同时使用 **惰性删除** 和 **定期删除** 的组合策略：

| 策略 | 触发时机 | 工作方式 |
|-----|---------|---------|
| 惰性删除 | 读/写操作时 | 访问键时检查是否过期，过期则删除 |
| 定期删除 | 周期性执行 | 默认每秒 10 次，每次随机检查 20 个键 |

**定期删除的具体流程：**

1. 从设置了过期时间的键集合中随机选取 20 个键
2. 删除所有已过期的键
3. 如果超过 25% 的键已过期，重复步骤 1
4. 限制单次执行时间不超过 25ms

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="400" y="25" text-anchor="middle" font-size="18" font-weight="bold">Redis 过期键删除策略对比</text>
<rect x="20" y="50" width="230" height="320" fill="#f0f8ff" stroke="#4682b4" stroke-width="2" rx="5"/>
<text x="135" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#4682b4">定时删除</text>
<text x="135" y="100" text-anchor="middle" font-size="12">为每个键创建定时器</text>
<circle cx="135" cy="140" r="25" fill="#ffd700" stroke="#ff8c00" stroke-width="2"/>
<text x="135" y="145" text-anchor="middle" font-size="14">Key1</text>
<line x1="135" y1="165" x2="135" y2="190" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="195" width="70" height="35" fill="#90ee90" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="135" y="217" text-anchor="middle" font-size="12">立即删除</text>
<text x="135" y="250" font-size="11" text-anchor="middle" fill="#228b22">✅ 内存友好</text>
<text x="135" y="265" font-size="11" text-anchor="middle" fill="#dc143c">❌ CPU 开销大</text>
<text x="135" y="285" font-size="10" text-anchor="middle" fill="#666">大量定时器</text>
<text x="135" y="300" font-size="10" text-anchor="middle" fill="#666">消耗 CPU</text>
<rect x="275" y="50" width="230" height="320" fill="#fff0f5" stroke="#db7093" stroke-width="2" rx="5"/>
<text x="390" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#db7093">惰性删除</text>
<text x="390" y="100" text-anchor="middle" font-size="12">访问时才检查</text>
<circle cx="390" cy="140" r="25" fill="#ffd700" stroke="#ff8c00" stroke-width="2"/>
<text x="390" y="145" text-anchor="middle" font-size="14">Key2</text>
<rect x="355" y="175" width="70" height="30" fill="#add8e6" stroke="#4169e1" stroke-width="2" rx="5"/>
<text x="390" y="195" text-anchor="middle" font-size="11">GET Key2</text>
<line x1="390" y1="205" x2="390" y2="225" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="355" y="230" width="70" height="35" fill="#90ee90" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="390" y="252" text-anchor="middle" font-size="12">检查并删除</text>
<text x="390" y="280" font-size="11" text-anchor="middle" fill="#228b22">✅ CPU 友好</text>
<text x="390" y="295" font-size="11" text-anchor="middle" fill="#dc143c">❌ 内存浪费</text>
<text x="390" y="315" font-size="10" text-anchor="middle" fill="#666">可能长期占用</text>
<rect x="530" y="50" width="250" height="320" fill="#f0fff0" stroke="#32cd32" stroke-width="2" rx="5"/>
<text x="655" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#32cd32">定期删除</text>
<text x="655" y="100" text-anchor="middle" font-size="12">周期性随机检查</text>
<g transform="translate(605, 110)">
<circle cx="25" cy="25" r="15" fill="#ffd700" stroke="#ff8c00" stroke-width="1.5"/><text x="25" y="30" text-anchor="middle" font-size="10">K1</text>
<circle cx="75" cy="25" r="15" fill="#ffd700" stroke="#ff8c00" stroke-width="1.5"/><text x="75" y="30" text-anchor="middle" font-size="10">K2</text>
<circle cx="25" cy="65" r="15" fill="#ffd700" stroke="#ff8c00" stroke-width="1.5"/><text x="25" y="70" text-anchor="middle" font-size="10">K3</text>
<circle cx="75" cy="65" r="15" fill="#ffd700" stroke="#ff8c00" stroke-width="1.5"/><text x="75" y="70" text-anchor="middle" font-size="10">K4</text>
</g>
<line x1="655" y1="195" x2="655" y2="215" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="605" y="220" width="100" height="30" fill="#add8e6" stroke="#4169e1" stroke-width="2" rx="5"/>
<text x="655" y="240" text-anchor="middle" font-size="11">随机抽取 20 个</text>
<line x1="655" y1="250" x2="655" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="605" y="275" width="100" height="30" fill="#90ee90" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="655" y="295" text-anchor="middle" font-size="11">删除过期键</text>
<text x="655" y="320" font-size="11" text-anchor="middle" fill="#32cd32">✅ 平衡方案</text>
<text x="655" y="335" font-size="10" text-anchor="middle" fill="#666">每秒 10 次</text>
<text x="655" y="350" font-size="10" text-anchor="middle" fill="#666">每次 20 个键</text>
</svg>

**关键要点：**

1. Redis 不使用定时删除，因为定时器开销太大
2. 惰性删除保证了 CPU 效率，但可能造成内存浪费
3. 定期删除作为补充，周期性清理过期键
4. 定期删除有时间和数量限制，避免阻塞主线程
5. 如果过期键过多，还会触发内存淘汰策略

**记忆口诀：**

> **"懒人定期打扫房间"**
> 懒人（惰性删除）：用到时才收拾
> 定期（定期删除）：每天固定时间打扫
> 两者结合，既省力又干净
### 22. 什么是惰性删除和定期删除？

**核心答案：**

- **惰性删除（Lazy Deletion）**：在访问键时检查是否过期，过期则删除并返回 nil
- **定期删除（Periodic Deletion）**：Redis 定时随机检查部分设置了过期时间的键，删除过期键

**详细说明：**

#### 惰性删除（Lazy Deletion）

**工作原理：**

1. 客户端尝试访问一个键（如 GET、SET 等操作）
2. Redis 检查该键是否设置了过期时间
3. 如果设置了过期时间，检查当前时间是否超过过期时间
4. 如果已过期，删除该键并返回 nil
5. 如果未过期，正常返回键值

**实现细节：**
- 源码位置：`db.c` 中的 `expireIfNeeded()` 函数
- 所有读写命令执行前都会调用此函数
- 主从模式下只在主节点执行删除，从节点等待删除命令

**优缺点：**
- ✅ CPU 友好：只在访问时检查，不消耗额外 CPU 资源
- ✅ 实现简单：逻辑清晰，易于维护
- ❌ 内存不友好：如果某些键长期不被访问，会一直占用内存
- ❌ 可能导致内存泄漏：大量过期但未访问的键持续占用内存

#### 定期删除（Periodic Deletion）

**工作原理：**

1. Redis 在服务器初始化时创建时间事件
2. 默认每秒执行 10 次 `activeExpireCycle()` 函数（每 100ms 一次）
3. 每次执行的具体步骤：
   - 从过期字典（expires dict）中随机选取 20 个键
   - 检查这些键是否过期，删除所有已过期的键
   - 如果超过 25% 的键已过期，重复步骤 1
   - 单次执行时间不超过 25ms，避免阻塞主线程

**执行模式：**

| 模式 | 触发时机 | 时间限制 | 用途 |
|-----|---------|---------|------|
| 慢模式（Slow） | 定时事件，每秒 10 次 | 25ms | 常规清理 |
| 快模式（Fast） | 事件循环前 | 1ms | 快速清理 |

**算法特点：**
- 自适应：过期键越多，检查次数越多
- 时间限制：避免长时间阻塞
- 随机采样：保证公平性，避免集中检查某些键

**实现细节：**
- 源码位置：`expire.c` 中的 `activeExpireCycle()` 函数
- 使用全局变量记录上次检查的数据库位置
- 支持多数据库，轮流检查每个数据库

**优缺点：**
- ✅ 弥补惰性删除的不足，主动清理过期键
- ✅ 通过随机抽样和时间限制平衡 CPU 和内存
- ✅ 自适应算法，过期键多时会增加检查频率
- ❌ 随机性可能导致某些过期键延迟删除
- ❌ 需要占用一定的 CPU 时间片

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="400" y="25" text-anchor="middle" font-size="18" font-weight="bold">惰性删除 vs 定期删除</text>
<rect x="20" y="50" width="360" height="210" fill="#fff5ee" stroke="#ff6347" stroke-width="2" rx="8"/>
<text x="200" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#ff6347">惰性删除流程</text>
<rect x="150" y="90" width="100" height="35" fill="#87ceeb" stroke="#4682b4" stroke-width="2" rx="5"/>
<text x="200" y="112" text-anchor="middle" font-size="13">客户端请求</text>
<text x="200" y="125" text-anchor="middle" font-size="11">GET key</text>
<line x1="200" y1="125" x2="200" y2="145" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 200 145 L 140 145 L 140 195 L 180 195" fill="none" stroke="#666" stroke-width="2"/>
<path d="M 200 145 L 260 145 L 260 195 L 220 195" fill="none" stroke="#666" stroke-width="2"/>
<text x="100" y="175" font-size="11" fill="#228b22">未过期</text>
<text x="280" y="175" font-size="11" fill="#dc143c">已过期</text>
<rect x="50" y="195" width="130" height="30" fill="#90ee90" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="115" y="215" text-anchor="middle" font-size="12">返回键值</text>
<rect x="220" y="195" width="130" height="30" fill="#ffb6c1" stroke="#dc143c" stroke-width="2" rx="5"/>
<text x="285" y="215" text-anchor="middle" font-size="12">删除并返回 nil</text>
<line x1="115" y1="225" x2="115" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="285" y1="225" x2="285" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<ellipse cx="200" cy="245" rx="150" ry="10" fill="#d3d3d3" stroke="#999" stroke-width="1"/>
<text x="200" y="250" text-anchor="middle" font-size="11" fill="#333">被动触发，访问时检查</text>
<rect x="420" y="50" width="360" height="440" fill="#f0fff0" stroke="#32cd32" stroke-width="2" rx="8"/>
<text x="600" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#32cd32">定期删除流程</text>
<rect x="550" y="90" width="100" height="30" fill="#ffd700" stroke="#ff8c00" stroke-width="2" rx="5"/>
<text x="600" y="110" text-anchor="middle" font-size="12">时间事件触发</text>
<line x1="600" y1="120" x2="600" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="530" y="140" width="140" height="30" fill="#add8e6" stroke="#4169e1" stroke-width="2" rx="5"/>
<text x="600" y="160" text-anchor="middle" font-size="11">随机选取 20 个键</text>
<line x1="600" y1="170" x2="600" y2="190" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="530" y="190" width="140" height="30" fill="#dda0dd" stroke="#9370db" stroke-width="2" rx="5"/>
<text x="600" y="210" text-anchor="middle" font-size="11">检查是否过期</text>
<line x1="600" y1="220" x2="600" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="530" y="240" width="140" height="30" fill="#ffb6c1" stroke="#dc143c" stroke-width="2" rx="5"/>
<text x="600" y="260" text-anchor="middle" font-size="11">删除过期键</text>
<line x1="600" y1="270" x2="600" y2="290" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 600 290 Q 690 290 690 230 Q 690 170 670 170" fill="none" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow)"/>
<text x="700" y="230" font-size="10" fill="#dc143c">过期率 &gt; 25%</text>
<text x="700" y="245" font-size="10" fill="#dc143c">继续抽样</text>
<rect x="530" y="295" width="140" height="30" fill="#98fb98" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="600" y="315" text-anchor="middle" font-size="11">完成本轮清理</text>
<line x1="600" y1="325" x2="600" y2="345" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="510" y="345" width="180" height="60" fill="#fffacd" stroke="#ffd700" stroke-width="2" rx="5"/>
<text x="600" y="365" text-anchor="middle" font-size="12" font-weight="bold">限制条件</text>
<text x="600" y="382" text-anchor="middle" font-size="10">⏱️ 单次执行 ≤ 25ms</text>
<text x="600" y="397" text-anchor="middle" font-size="10">🔄 每秒执行 10 次</text>
<ellipse cx="600" cy="425" rx="160" ry="10" fill="#d3d3d3" stroke="#999" stroke-width="1"/>
<text x="600" y="430" text-anchor="middle" font-size="11" fill="#333">主动触发，周期性执行</text>
<rect x="40" y="280" width="320" height="140" fill="#f5f5f5" stroke="#888" stroke-width="2" rx="5"/>
<text x="200" y="300" text-anchor="middle" font-size="14" font-weight="bold">两种策略的配合</text>
<text x="50" y="325" font-size="11" fill="#333">1. 惰性删除：保证访问时的数据正确性</text>
<text x="50" y="345" font-size="11" fill="#333">2. 定期删除：清理未访问的过期键</text>
<text x="50" y="365" font-size="11" fill="#333">3. 二者互补：既保证性能又节省内存</text>
<text x="50" y="385" font-size="11" fill="#333">4. 极端情况：触发内存淘汰策略</text>
<text x="200" y="405" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc143c">过期删除 ≠ 立即删除</text>
<rect x="40" y="435" width="320" height="55" fill="#ffe4e1" stroke="#ff6347" stroke-width="2" rx="5"/>
<text x="200" y="455" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc143c">⚠️ 注意事项</text>
<text x="50" y="473" font-size="10" fill="#333">• 过期键可能不会立即被删除</text>
<text x="50" y="485" font-size="10" fill="#333">• 极端情况下可能占用大量内存</text>
</svg>

**两种策略的配合：**

```
时间轴：0ms ───────→ 100ms ──────→ 200ms ──────→ ...

惰性：   [访问时]      [访问时]     [访问时]    ← 被动

定期：   [后台扫描] → [后台扫描] → [后台扫描]  ← 主动
```

**关键要点：**

1. **惰性删除**：
   - 被动策略，只在访问时触发
   - 100% 准确：访问的键一定不会是过期键
   - 可能造成内存浪费：不访问就不删除

2. **定期删除**：
   - 主动策略，定时批量清理
   - 随机抽样：每次检查 20 个键
   - 自适应：过期率高时会持续抽样
   - 有时间限制：避免阻塞太久

3. **两者配合**：
   - 互为补充，缺一不可
   - 惰性删除保证访问时的正确性
   - 定期删除主动清理冷数据
   - 仍可能有漏网之鱼，需要内存淘汰策略兜底

**记忆口诀：**

> **"访问检查 + 定时清扫"**
> 惰性删除：访客来了才打扫房间（被动）
> 定期删除：每天定时清理垃圾（主动）
> 双管齐下：既不累死自己，也不让垃圾堆积
### 23. Redis 的内存淘汰策略有哪些？

**核心答案：**

Redis 有 **8 种内存淘汰策略**，分为三大类：
1. **不淘汰**：noeviction
2. **全部键淘汰**：allkeys-lru、allkeys-lfu、allkeys-random
3. **过期键淘汰**：volatile-lru、volatile-lfu、volatile-random、volatile-ttl

**详细说明：**

当 Redis 内存达到 `maxmemory` 限制时，会根据配置的淘汰策略选择删除哪些键。

#### 8 种内存淘汰策略

| 策略 | 作用范围 | 淘汰算法 | 说明 |
|-----|---------|---------|------|
| **noeviction** | - | 不淘汰 | 默认策略，内存满时拒绝写入，返回错误 |
| **allkeys-lru** | 所有键 | LRU | 淘汰最近最少使用的键 |
| **allkeys-lfu** | 所有键 | LFU | 淘汰最少使用频率的键（Redis 4.0+） |
| **allkeys-random** | 所有键 | 随机 | 随机淘汰任意键 |
| **volatile-lru** | 过期键 | LRU | 在设置了过期时间的键中淘汰最近最少使用的 |
| **volatile-lfu** | 过期键 | LFU | 在设置了过期时间的键中淘汰最少使用频率的（Redis 4.0+） |
| **volatile-random** | 过期键 | 随机 | 在设置了过期时间的键中随机淘汰 |
| **volatile-ttl** | 过期键 | TTL | 淘汰剩余 TTL 最短的键 |

#### 详细说明

**1. noeviction（不淘汰）**
- 默认策略
- 内存满时，所有写入命令（SET、LPUSH 等）返回错误
- 只读命令（GET、LRANGE 等）仍可正常执行
- 适用场景：数据不能丢失，宁愿拒绝服务

**2. allkeys-lru（全部键 LRU）**
- 在所有键中使用 LRU（Least Recently Used）算法
- 淘汰最久未被访问的键
- 适用场景：所有键都有可能被访问，希望保留热点数据

**3. allkeys-lfu（全部键 LFU）**
- 在所有键中使用 LFU（Least Frequently Used）算法
- 淘汰访问频率最低的键
- 相比 LRU，更能体现键的真实热度
- 适用场景：数据访问有明显的热点，希望保留高频访问的数据

**4. allkeys-random（全部键随机）**
- 在所有键中随机选择键进行淘汰
- 性能最好，但没有策略性
- 适用场景：所有键同等重要，或者用于测试

**5. volatile-lru（过期键 LRU）**
- 只在设置了过期时间的键中使用 LRU 算法
- 如果没有设置过期时间的键，等同于 noeviction
- 适用场景：区分持久数据和缓存数据

**6. volatile-lfu（过期键 LFU）**
- 只在设置了过期时间的键中使用 LFU 算法
- 如果没有设置过期时间的键，等同于 noeviction
- 适用场景：缓存数据有明显的访问频率差异

**7. volatile-random（过期键随机）**
- 在设置了过期时间的键中随机淘汰
- 如果没有设置过期时间的键，等同于 noeviction
- 适用场景：过期键同等重要

**8. volatile-ttl（最短 TTL）**
- 优先淘汰剩余 TTL（Time To Live）最短的键
- 如果没有设置过期时间的键，等同于 noeviction
- 适用场景：希望快要过期的数据提前清理

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="450" y="25" text-anchor="middle" font-size="20" font-weight="bold">Redis 内存淘汰策略决策树</text>
<rect x="350" y="45" width="200" height="45" fill="#ff6347" stroke="#dc143c" stroke-width="3" rx="8"/>
<text x="450" y="65" text-anchor="middle" font-size="14" font-weight="bold" fill="white">内存达到上限</text>
<text x="450" y="82" text-anchor="middle" font-size="12" fill="white">maxmemory</text>
<line x1="450" y1="90" x2="450" y2="120" stroke="#666" stroke-width="3" marker-end="url(#arrow2)"/>
<rect x="330" y="120" width="240" height="40" fill="#ffd700" stroke="#ff8c00" stroke-width="2" rx="8"/>
<text x="450" y="145" text-anchor="middle" font-size="13" font-weight="bold">选择淘汰策略</text>
<line x1="450" y1="160" x2="450" y2="190" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 190 L 150 190 L 150 220" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 190 L 450 220" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 190 L 750 190 L 750 220" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<rect x="30" y="220" width="240" height="45" fill="#ffe4e1" stroke="#ff69b4" stroke-width="2" rx="8"/>
<text x="150" y="238" text-anchor="middle" font-size="14" font-weight="bold" fill="#dc143c">不淘汰</text>
<text x="150" y="254" text-anchor="middle" font-size="11">noeviction</text>
<rect x="330" y="220" width="240" height="45" fill="#e0f7fa" stroke="#00acc1" stroke-width="2" rx="8"/>
<text x="450" y="238" text-anchor="middle" font-size="14" font-weight="bold" fill="#00695c">全部键淘汰</text>
<text x="450" y="254" text-anchor="middle" font-size="11">allkeys-*</text>
<rect x="630" y="220" width="240" height="45" fill="#fff9c4" stroke="#f9a825" stroke-width="2" rx="8"/>
<text x="750" y="238" text-anchor="middle" font-size="14" font-weight="bold" fill="#f57f17">过期键淘汰</text>
<text x="750" y="254" text-anchor="middle" font-size="11">volatile-*</text>
<line x1="150" y1="265" x2="150" y2="295" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<rect x="50" y="295" width="200" height="50" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="150" y="315" text-anchor="middle" font-size="12" font-weight="bold">拒绝写入</text>
<text x="150" y="332" text-anchor="middle" font-size="10">返回错误</text>
<line x1="450" y1="265" x2="450" y2="295" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 295 L 300 295 L 300 325" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 295 L 450 325" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 450 295 L 600 295 L 600 325" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<rect x="210" y="325" width="180" height="50" fill="#b2ebf2" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="300" y="345" text-anchor="middle" font-size="12" font-weight="bold">allkeys-lru</text>
<text x="300" y="362" text-anchor="middle" font-size="10">最近最少使用</text>
<rect x="360" y="325" width="180" height="50" fill="#b2ebf2" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="450" y="345" text-anchor="middle" font-size="12" font-weight="bold">allkeys-lfu</text>
<text x="450" y="362" text-anchor="middle" font-size="10">最少使用频率</text>
<rect x="510" y="325" width="180" height="50" fill="#b2ebf2" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="600" y="345" text-anchor="middle" font-size="12" font-weight="bold">allkeys-random</text>
<text x="600" y="362" text-anchor="middle" font-size="10">随机淘汰</text>
<line x1="750" y1="265" x2="750" y2="295" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 750 295 L 570 295 L 570 410" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 750 295 L 680 295 L 680 410" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 750 295 L 790 295 L 790 410" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<path d="M 750 295 L 870 295 L 870 410" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
<rect x="490" y="410" width="160" height="50" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="570" y="430" text-anchor="middle" font-size="12" font-weight="bold">volatile-lru</text>
<text x="570" y="447" text-anchor="middle" font-size="10">过期键 LRU</text>
<rect x="600" y="410" width="160" height="50" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="680" y="430" text-anchor="middle" font-size="12" font-weight="bold">volatile-lfu</text>
<text x="680" y="447" text-anchor="middle" font-size="10">过期键 LFU</text>
<rect x="710" y="410" width="160" height="50" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="790" y="430" text-anchor="middle" font-size="12" font-weight="bold">volatile-random</text>
<text x="790" y="447" text-anchor="middle" font-size="10">过期键随机</text>
<rect x="20" y="390" width="210" height="140" fill="#f0f8ff" stroke="#4682b4" stroke-width="2" rx="8"/>
<text x="125" y="410" text-anchor="middle" font-size="14" font-weight="bold" fill="#4682b4">LRU vs LFU</text>
<text x="30" y="435" font-size="11" fill="#333">LRU (Least Recently Used):</text>
<text x="30" y="450" font-size="10" fill="#666">• 淘汰最久未访问的键</text>
<text x="30" y="463" font-size="10" fill="#666">• 关注时间维度</text>
<text x="30" y="476" font-size="10" fill="#666">• 实现：近似 LRU 算法</text>
<text x="30" y="495" font-size="11" fill="#333">LFU (Least Frequently Used):</text>
<text x="30" y="510" font-size="10" fill="#666">• 淘汰访问频率最低的键</text>
<text x="30" y="523" font-size="10" fill="#666">• 关注频率维度</text>
<rect x="790" y="480" width="100" height="50" fill="#ffe4b5" stroke="#ff8c00" stroke-width="2" rx="5"/>
<text x="840" y="500" text-anchor="middle" font-size="12" font-weight="bold">volatile-ttl</text>
<text x="840" y="517" text-anchor="middle" font-size="10">最短 TTL</text>
<line x1="870" y1="460" x2="870" y2="475" stroke="#666" stroke-width="2"/>
<line x1="870" y1="475" x2="840" y2="475" stroke="#666" stroke-width="2"/>
<line x1="840" y1="475" x2="840" y2="480" stroke="#666" stroke-width="2" marker-end="url(#arrow2)"/>
</svg>

#### LRU vs LFU 对比

**LRU（Least Recently Used - 最近最少使用）**
- 关注时间维度：最久未被访问的数据被淘汰
- 实现：Redis 使用近似 LRU 算法（随机采样）
- 优点：实现简单，性能好
- 缺点：可能淘汰掉偶尔访问但很重要的数据

**LFU（Least Frequently Used - 最少使用频率）**
- 关注频率维度：访问次数最少的数据被淘汰
- 实现：使用计数器记录访问频率
- 优点：更准确反映数据的重要性
- 缺点：实现复杂，需要额外内存存储计数

#### 配置方式

```bash
# redis.conf 配置文件
maxmemory 1gb                      # 设置最大内存
maxmemory-policy allkeys-lru       # 设置淘汰策略

# 运行时动态修改
CONFIG SET maxmemory 1gb
CONFIG SET maxmemory-policy allkeys-lru
```

#### 策略选择建议

| 场景 | 推荐策略 | 理由 |
|-----|---------|------|
| 所有数据同等重要 | allkeys-lru | 保留最近访问的数据 |
| 明显的热点数据 | allkeys-lfu | 保留高频访问的数据 |
| 区分缓存和持久数据 | volatile-lru | 只淘汰临时数据 |
| 数据不能丢失 | noeviction | 拒绝写入，保证数据完整 |
| 快要过期的数据提前清理 | volatile-ttl | 减少无效数据占用 |

**关键要点：**

1. **默认策略是 noeviction**，内存满时会拒绝写入
2. **生产环境建议设置淘汰策略**，避免服务不可用
3. **allkeys-*** 作用于所有键，**volatile-*** 只作用于设置了过期时间的键
4. **LFU 比 LRU 更智能**，但需要 Redis 4.0+ 版本
5. **近似 LRU**：Redis 不是真正的 LRU，而是随机采样后选择最久未使用的
6. **volatile-*** 策略下如果没有过期键，等同于 noeviction

**记忆口诀：**

> **"三类八策略，全过期要分清"**
> - 不淘汰（1）：noeviction 拒绝写
> - 全部键（3）：allkeys + LRU/LFU/Random
> - 过期键（4）：volatile + LRU/LFU/Random/TTL
> LRU 看时间，LFU 看频率，TTL 看剩余
### 24. 如何设置键的过期时间？

**核心答案：**

Redis 提供多种命令设置键的过期时间：
- **EXPIRE**：设置秒级过期时间
- **PEXPIRE**：设置毫秒级过期时间
- **EXPIREAT**：设置 Unix 时间戳过期
- **SETEX**：设置值的同时设置过期时间（原子操作）

**详细说明：**

#### 设置过期时间的命令

**1. EXPIRE - 设置相对过期时间（秒）**
```bash
EXPIRE key seconds

# 示例
SET user:1000 "张三"
EXPIRE user:1000 60           # 60 秒后过期
```

**2. EXPIREAT - 设置绝对过期时间（Unix 时间戳，秒）**
```bash
EXPIREAT key timestamp

# 示例
SET session:abc "token"
EXPIREAT session:abc 1735689600   # 2025-01-01 00:00:00 过期
```

**3. PEXPIRE - 设置相对过期时间（毫秒）**
```bash
PEXPIRE key milliseconds

# 示例
SET cache:item "data"
PEXPIRE cache:item 60000      # 60000 毫秒（60 秒）后过期
```

**4. PEXPIREAT - 设置绝对过期时间（Unix 时间戳，毫秒）**
```bash
PEXPIREAT key milliseconds-timestamp

# 示例
SET temp:data "value"
PEXPIREAT temp:data 1735689600000
```

**5. SET 命令带过期参数**
```bash
# EX 秒级过期
SET key value EX seconds

# PX 毫秒级过期
SET key value PX milliseconds

# EXAT Unix 时间戳过期（秒）
SET key value EXAT timestamp

# PXAT Unix 时间戳过期（毫秒）
SET key value PXAT milliseconds-timestamp

# 示例
SET cache:user "data" EX 3600       # 1 小时后过期
SET token:abc "jwt" PX 86400000     # 24 小时后过期
```

**6. SETEX - 设置字符串并设置过期时间（原子操作）**
```bash
SETEX key seconds value

# 示例
SETEX session:123 3600 "user_token"
# 等价于
SET session:123 "user_token"
EXPIRE session:123 3600
```

#### 查询过期时间的命令

**1. TTL - 查看剩余生存时间（秒）**
```bash
TTL key

# 返回值
# 正整数：剩余秒数
# -1：键存在但没有设置过期时间
# -2：键不存在
```

**2. PTTL - 查看剩余生存时间（毫秒）**
```bash
PTTL key

# 返回值同 TTL，单位为毫秒
```

#### 移除过期时间的命令

**PERSIST - 移除过期时间，使键永久保存**
```bash
PERSIST key

# 示例
SET temp:data "value" EX 60
PERSIST temp:data              # 移除过期时间，变为持久键
```

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="425" y="25" text-anchor="middle" font-size="20" font-weight="bold">Redis 过期时间命令全景图</text>
<rect x="20" y="50" width="810" height="160" fill="#f0f8ff" stroke="#4169e1" stroke-width="2" rx="8"/>
<text x="425" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#4169e1">设置过期时间</text>
<rect x="40" y="90" width="180" height="100" fill="#ffe4e1" stroke="#ff6347" stroke-width="2" rx="5"/>
<text x="130" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc143c">相对时间</text>
<text x="50" y="135" font-size="11" fill="#333" font-family="monospace">EXPIRE key 60</text>
<text x="50" y="150" font-size="10" fill="#666">秒级</text>
<text x="50" y="170" font-size="11" fill="#333" font-family="monospace">PEXPIRE key 60000</text>
<text x="50" y="185" font-size="10" fill="#666">毫秒级</text>
<rect x="240" y="90" width="180" height="100" fill="#fff0f5" stroke="#ff1493" stroke-width="2" rx="5"/>
<text x="330" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#c71585">绝对时间</text>
<text x="250" y="135" font-size="11" fill="#333" font-family="monospace">EXPIREAT key ts</text>
<text x="250" y="150" font-size="10" fill="#666">秒级时间戳</text>
<text x="250" y="170" font-size="11" fill="#333" font-family="monospace">PEXPIREAT key ts</text>
<text x="250" y="185" font-size="10" fill="#666">毫秒级时间戳</text>
<rect x="440" y="90" width="180" height="100" fill="#f0fff0" stroke="#32cd32" stroke-width="2" rx="5"/>
<text x="530" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#228b22">SET 带选项</text>
<text x="450" y="135" font-size="11" fill="#333" font-family="monospace">SET k v EX 60</text>
<text x="450" y="150" font-size="10" fill="#666">秒级</text>
<text x="450" y="170" font-size="11" fill="#333" font-family="monospace">SET k v PX 60000</text>
<text x="450" y="185" font-size="10" fill="#666">毫秒级</text>
<rect x="640" y="90" width="180" height="100" fill="#fffacd" stroke="#ffd700" stroke-width="2" rx="5"/>
<text x="730" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#ff8c00">原子操作</text>
<text x="650" y="135" font-size="11" fill="#333" font-family="monospace">SETEX k 60 v</text>
<text x="650" y="150" font-size="10" fill="#666">设置+过期（秒）</text>
<text x="650" y="170" font-size="11" fill="#333" font-family="monospace">PSETEX k 60000 v</text>
<text x="650" y="185" font-size="10" fill="#666">设置+过期（毫秒）</text>
<rect x="20" y="230" width="400" height="160" fill="#fff5ee" stroke="#ff8c00" stroke-width="2" rx="8"/>
<text x="220" y="255" text-anchor="middle" font-size="16" font-weight="bold" fill="#ff6347">查询过期时间</text>
<rect x="40" y="270" width="170" height="100" fill="#ffe4b5" stroke="#daa520" stroke-width="2" rx="5"/>
<text x="125" y="290" text-anchor="middle" font-size="13" font-weight="bold">TTL key</text>
<text x="50" y="315" font-size="11" fill="#333">返回值（秒）：</text>
<text x="50" y="332" font-size="10" fill="#228b22" font-family="monospace">&gt; 0</text>
<text x="95" y="332" font-size="10" fill="#666">剩余秒数</text>
<text x="50" y="347" font-size="10" fill="#dc143c" font-family="monospace">-1</text>
<text x="80" y="347" font-size="10" fill="#666">无过期时间</text>
<text x="50" y="362" font-size="10" fill="#dc143c" font-family="monospace">-2</text>
<text x="80" y="362" font-size="10" fill="#666">键不存在</text>
<rect x="230" y="270" width="170" height="100" fill="#ffe4b5" stroke="#daa520" stroke-width="2" rx="5"/>
<text x="315" y="290" text-anchor="middle" font-size="13" font-weight="bold">PTTL key</text>
<text x="240" y="315" font-size="11" fill="#333">返回值（毫秒）：</text>
<text x="240" y="332" font-size="10" fill="#228b22" font-family="monospace">&gt; 0</text>
<text x="285" y="332" font-size="10" fill="#666">剩余毫秒数</text>
<text x="240" y="347" font-size="10" fill="#dc143c" font-family="monospace">-1</text>
<text x="270" y="347" font-size="10" fill="#666">无过期时间</text>
<text x="240" y="362" font-size="10" fill="#dc143c" font-family="monospace">-2</text>
<text x="270" y="362" font-size="10" fill="#666">键不存在</text>
<rect x="430" y="230" width="400" height="160" fill="#f0f8ff" stroke="#4682b4" stroke-width="2" rx="8"/>
<text x="630" y="255" text-anchor="middle" font-size="16" font-weight="bold" fill="#4169e1">移除过期时间</text>
<rect x="470" y="270" width="320" height="100" fill="#e0ffff" stroke="#5f9ea0" stroke-width="2" rx="5"/>
<text x="630" y="295" text-anchor="middle" font-size="13" font-weight="bold">PERSIST key</text>
<text x="480" y="320" font-size="11" fill="#333">作用：移除键的过期时间</text>
<text x="480" y="340" font-size="11" fill="#333">结果：键变为永久保存</text>
<text x="480" y="360" font-size="11" fill="#228b22" font-family="monospace">返回 1</text>
<text x="540" y="360" font-size="11" fill="#666">成功移除</text>
<rect x="20" y="410" width="810" height="180" fill="#fafafa" stroke="#888" stroke-width="2" rx="8"/>
<text x="425" y="435" text-anchor="middle" font-size="16" font-weight="bold">完整示例</text>
<g font-family="monospace" font-size="11">
<text x="40" y="460" fill="#0066cc">127.0.0.1:6379&gt;</text>
<text x="160" y="460" fill="#333">SET user:1000 "张三" EX 60</text>
<text x="40" y="477" fill="#228b22">OK</text>
<text x="40" y="497" fill="#0066cc">127.0.0.1:6379&gt;</text>
<text x="160" y="497" fill="#333">TTL user:1000</text>
<text x="40" y="514" fill="#228b22">(integer) 57</text>
<text x="480" y="514" fill="#999">← 剩余 57 秒</text>
<text x="40" y="534" fill="#0066cc">127.0.0.1:6379&gt;</text>
<text x="160" y="534" fill="#333">PERSIST user:1000</text>
<text x="40" y="551" fill="#228b22">(integer) 1</text>
<text x="480" y="551" fill="#999">← 成功移除过期时间</text>
<text x="40" y="571" fill="#0066cc">127.0.0.1:6379&gt;</text>
<text x="160" y="571" fill="#333">TTL user:1000</text>
<text x="40" y="588" fill="#228b22">(integer) -1</text>
<text x="480" y="588" fill="#999">← -1 表示无过期时间</text>
</g>
</svg>

#### 命令对比表

| 命令 | 单位 | 时间类型 | 原子性 | 用途 |
|------|-----|---------|--------|------|
| EXPIRE | 秒 | 相对 | 否 | 最常用的过期设置 |
| PEXPIRE | 毫秒 | 相对 | 否 | 需要毫秒级精度 |
| EXPIREAT | 秒 | 绝对 | 否 | 指定具体过期时刻 |
| PEXPIREAT | 毫秒 | 绝对 | 否 | 毫秒级时间戳 |
| SET...EX | 秒 | 相对 | 是 | 设置值和过期时间 |
| SET...PX | 毫秒 | 相对 | 是 | 设置值和过期时间 |
| SETEX | 秒 | 相对 | 是 | 专门用于字符串 |

#### 注意事项

**1. 过期时间的更新**
```bash
# 重新设置键会移除过期时间
SET user:1000 "张三" EX 60
SET user:1000 "李四"          # 过期时间被移除！

# 正确做法：重新设置过期时间
SET user:1000 "李四" EX 60
```

**2. 过期时间的精度**
- 过期时间的精度可以是 1 毫秒
- 但是过期删除可能有延迟（惰性删除 + 定期删除）
- 不保证键在过期时刻立即被删除

**3. 持久化的影响**
- **RDB**：保存时会检查键是否过期，过期的不会保存
- **AOF**：过期删除会追加 DEL 命令
- **主从复制**：从节点不会自己删除过期键，等待主节点的 DEL 命令

**4. 时钟依赖**
- 过期时间依赖系统时钟
- 如果系统时间回退，可能导致键提前或延迟过期
- 分布式环境需要保证时钟同步（NTP）

**关键要点：**

1. **推荐使用 SET...EX/PX**：原子操作，避免竞态条件
2. **相对时间 vs 绝对时间**：
   - 相对时间：EXPIRE/PEXPIRE，从当前时间开始计算
   - 绝对时间：EXPIREAT/PEXPIREAT，指定具体时间戳
3. **秒 vs 毫秒**：根据业务需求选择精度
4. **TTL 返回值**：
   - 正整数：剩余时间
   - -1：键存在但无过期时间
   - -2：键不存在
5. **PERSIST 场景**：将临时数据转为永久数据
6. **重新设置键会清除过期时间**，需要重新设置

**记忆口诀：**

> **"设查移三大类，秒毫相绝要分清"**
> - 设置：EXPIRE/PEXPIRE（相对）、EXPIREAT/PEXPIREAT（绝对）
> - 查询：TTL/PTTL（-1 无期，-2 不在）
> - 移除：PERSIST（变永久）
> - 原子：SETEX、SET...EX（推荐用）
### 25. 过期的 key 会被立即删除吗？

**核心答案：**

**不会**。过期的 key 不会被立即删除。Redis 采用 **惰性删除 + 定期删除** 的策略，过期键可能在过期后的一段时间内仍然存在于内存中。

**详细说明：**

#### 为什么不立即删除？

**性能考虑：**
- 如果每个键过期时都立即删除（定时删除），需要为每个键创建定时器
- 大量定时器会消耗大量 CPU 资源
- Redis 是单线程模型，删除操作会阻塞主线程
- 立即删除的性价比很低，不适合高性能场景

**Redis 的实际策略：**
1. **惰性删除**：访问时才检查，过期则删除
2. **定期删除**：后台定期随机抽样检查并删除
3. **内存淘汰**：内存不足时触发淘汰策略

#### 过期键的生命周期

```
设置过期时间              过期时刻              实际删除
     |                      |                     |
     v                      v                     v
[SET key EX 60] ----60秒---→ [键已过期] ----?秒---→ [被删除]
                                    ↑
                            但仍在内存中！
```

#### 三种删除时机

**1. 访问时删除（惰性删除）**
```bash
# 10:00:00 - 设置键，60 秒后过期
SET session:123 "token" EX 60

# 10:01:01 - 键已过期（过期 1 秒）
# 此时键仍在内存中

# 10:01:05 - 尝试访问
GET session:123
# Redis 检查发现已过期，立即删除并返回 nil
```

**2. 定期删除（周期性清理）**
```bash
# Redis 每秒 10 次执行定期删除
# 随机抽取 20 个过期键
# 删除其中已过期的键
# 如果超过 25% 的键过期，继续抽取
```

**3. 内存淘汰（被动触发）**
```bash
# 当内存达到 maxmemory 限制
# 触发配置的内存淘汰策略
# 可能会删除过期键（取决于策略）
```

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="425" y="25" text-anchor="middle" font-size="20" font-weight="bold">过期键的删除时机</text>
<rect x="50" y="50" width="750" height="480" fill="#fafafa" stroke="#888" stroke-width="2" rx="8"/>
<line x1="100" y1="100" x2="750" y2="100" stroke="#333" stroke-width="2"/>
<text x="90" y="105" text-anchor="end" font-size="12">时间轴</text>
<circle cx="150" cy="100" r="8" fill="#32cd32" stroke="#228b22" stroke-width="2"/>
<text x="150" y="85" text-anchor="middle" font-size="11" font-weight="bold">T0</text>
<text x="150" y="130" text-anchor="middle" font-size="10" fill="#228b22">设置键</text>
<text x="150" y="145" text-anchor="middle" font-size="9" font-family="monospace">SET k "v"</text>
<text x="150" y="160" text-anchor="middle" font-size="9" font-family="monospace">EX 60</text>
<line x1="150" y1="100" x2="350" y2="100" stroke="#ffa500" stroke-width="3" stroke-dasharray="5,5"/>
<circle cx="350" cy="100" r="8" fill="#ff6347" stroke="#dc143c" stroke-width="2"/>
<text x="350" y="85" text-anchor="middle" font-size="11" font-weight="bold">T0+60s</text>
<text x="350" y="130" text-anchor="middle" font-size="10" fill="#dc143c" font-weight="bold">⚠️ 键已过期</text>
<text x="350" y="145" text-anchor="middle" font-size="9" fill="#666">但仍在内存中</text>
<rect x="380" y="70" width="360" height="420" fill="#fff9f0" stroke="#ff8c00" stroke-width="2" rx="5"/>
<text x="560" y="95" text-anchor="middle" font-size="14" font-weight="bold" fill="#ff6347">可能的删除时机</text>
<rect x="400" y="110" width="320" height="110" fill="#f0fff0" stroke="#32cd32" stroke-width="2" rx="5"/>
<text x="560" y="130" text-anchor="middle" font-size="13" font-weight="bold" fill="#228b22">① 惰性删除</text>
<text x="410" y="150" font-size="10" fill="#333">触发条件：客户端访问该键</text>
<text x="410" y="170" font-size="10" fill="#333" font-family="monospace">GET key / SET key / EXISTS key</text>
<text x="410" y="190" font-size="10" fill="#228b22">✅ 删除时机：访问时立即删除</text>
<text x="410" y="210" font-size="10" fill="#dc143c">❌ 问题：不访问则一直占用内存</text>
<rect x="400" y="230" width="320" height="110" fill="#fffacd" stroke="#ffd700" stroke-width="2" rx="5"/>
<text x="560" y="250" text-anchor="middle" font-size="13" font-weight="bold" fill="#ff8c00">② 定期删除</text>
<text x="410" y="270" font-size="10" fill="#333">触发条件：定时事件（每秒 10 次）</text>
<text x="410" y="290" font-size="10" fill="#333">随机抽取 20 个键检查</text>
<text x="410" y="310" font-size="10" fill="#228b22">✅ 删除时机：后台周期性删除</text>
<text x="410" y="330" font-size="10" fill="#dc143c">❌ 问题：随机性，可能延迟删除</text>
<rect x="400" y="350" width="320" height="130" fill="#ffe4e1" stroke="#ff69b4" stroke-width="2" rx="5"/>
<text x="560" y="370" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc143c">③ 内存淘汰</text>
<text x="410" y="390" font-size="10" fill="#333">触发条件：内存达到 maxmemory</text>
<text x="410" y="410" font-size="10" fill="#333">根据淘汰策略选择删除的键</text>
<text x="410" y="430" font-size="10" fill="#228b22">✅ 删除时机：内存不足时强制删除</text>
<text x="410" y="450" font-size="10" fill="#dc143c">❌ 问题：可能删除未过期的键</text>
<text x="410" y="470" font-size="9" fill="#666">（如果策略是 allkeys-*）</text>
<rect x="70" y="180" width="280" height="150" fill="#f0f8ff" stroke="#4682b4" stroke-width="2" rx="5"/>
<text x="210" y="205" text-anchor="middle" font-size="14" font-weight="bold" fill="#4169e1">实际场景示例</text>
<g font-family="monospace" font-size="10">
<text x="80" y="230" fill="#666">10:00:00</text>
<text x="145" y="230" fill="#333">SET session "abc" EX 60</text>
<text x="80" y="250" fill="#666">10:01:00</text>
<text x="145" y="250" fill="#dc143c">← 键已过期</text>
<text x="80" y="270" fill="#666">10:01:05</text>
<text x="145" y="270" fill="#999">键仍在内存中...</text>
<text x="80" y="290" fill="#666">10:01:30</text>
<text x="145" y="290" fill="#228b22">GET session → nil</text>
<text x="145" y="305" fill="#999">（访问时被删除）</text>
<text x="80" y="325" fill="#999">或</text>
<text x="80" y="320" fill="#666">10:01:10</text>
<text x="145" y="320" fill="#ffa500">定期删除扫描到</text>
</g>
<rect x="70" y="350" width="280" height="140" fill="#fff5f5" stroke="#dc143c" stroke-width="2" rx="5"/>
<text x="210" y="375" text-anchor="middle" font-size="14" font-weight="bold" fill="#dc143c">⚠️ 潜在问题</text>
<text x="80" y="400" font-size="10" fill="#333">1. <tspan font-weight="bold">内存占用</tspan>：过期键占用内存</text>
<text x="80" y="420" font-size="10" fill="#333">2. <tspan font-weight="bold">数据一致性</tspan>：主从可能不一致</text>
<text x="80" y="440" font-size="10" fill="#333">3. <tspan font-weight="bold">业务风险</tspan>：依赖立即删除的</text>
<text x="95" y="455" font-size="10" fill="#333">业务逻辑可能出错</text>
<text x="80" y="475" font-size="9" fill="#666">（如：限流、防重放等）</text>
</svg>

#### 潜在问题和影响

**1. 内存占用问题**
```bash
# 场景：大量键同时过期
# 100万个键在 10:00:00 同时过期
# 但这些键可能在几秒甚至几分钟后才被删除
# 期间占用大量内存

# 影响
- 内存使用率虚高
- 可能触发内存告警
- 可能影响其他业务
```

**2. 主从复制的延迟**
```bash
# 主从模式下的问题
主节点：过期键被删除，发送 DEL 命令
从节点：等待 DEL 命令，期间过期键仍然存在

# 可能导致
- 从节点返回已过期的数据
- 主从数据短暂不一致
```

**3. 业务逻辑风险**
```bash
# 错误的依赖方式
# ❌ 错误：依赖键过期后立即消失
SET rate_limit:user:123 1 EX 1
# ... 1 秒后
EXISTS rate_limit:user:123  # 可能仍返回 1！

# ✅ 正确：检查 TTL
ttl = TTL rate_limit:user:123
if ttl > 0:
    # 键仍有效
else:
    # 键已过期或不存在
```

#### 最佳实践

**1. 不要依赖立即删除**
```bash
# 错误做法
SET lock:resource 1 EX 10
# 期望 10 秒后锁自动释放并立即可用

# 正确做法
# 使用 SET NX 检查锁是否存在
# 或使用专门的分布式锁（如 Redlock）
```

**2. 合理设置过期时间**
```bash
# 避免大量键同时过期
# 在过期时间上增加随机值
expire_time = 3600 + random(0, 60)
SET key value EX $expire_time
```

**3. 监控内存使用**
```bash
# 监控指标
INFO memory
INFO stats

# 关注
- used_memory：实际使用内存
- expired_keys：过期键删除数量
- evicted_keys：淘汰键数量
```

**4. 配置合理的淘汰策略**
```bash
# redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru

# 避免使用 noeviction（默认）
# 生产环境建议使用 allkeys-lru 或 volatile-lru
```

**关键要点：**

1. **过期 ≠ 立即删除**：过期键可能在内存中存在一段时间
2. **删除时机不确定**：取决于是否被访问、定期删除的随机性
3. **内存占用风险**：大量过期键可能占用大量内存
4. **主从不一致**：从节点的过期键删除有延迟
5. **不要依赖立即删除**：业务逻辑不应假设键过期后立即消失
6. **使用 TTL 检查**：而不是依赖键是否存在
7. **配置淘汰策略**：避免内存耗尽导致服务不可用

**实际案例：**

```bash
# 场景：Redis 内存占用异常高
# 原因：大量过期键未被及时清理

# 排查
INFO keyspace
# 发现大量带过期时间的键

# 解决方案
1. 手动触发 SCAN + DEL 清理过期键
2. 调整定期删除的参数（不推荐）
3. 配置合理的内存淘汰策略
4. 业务层面避免大量键同时过期
```

**记忆口诀：**

> **"过期不删，等你来拿"**
> - 过期键不会立即删除
> - 访问时删除（惰性）
> - 定期抽查删除（定期）
> - 内存不足强制删除（淘汰）
> - 业务不要依赖立即删除
