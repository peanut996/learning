## Map

### 10. HashMap 的实现原理？

**核心原理：**
HashMap 基于 **数组 + 链表 + 红黑树**（JDK 8+）实现，使用哈希表存储键值对。

**底层数据结构：**
- **JDK 7**：数组 + 链表
- **JDK 8+**：数组 + 链表 + 红黑树（链表长度 ≥ 8 且数组长度 ≥ 64 时转为红黑树）

**关键参数：**
- **初始容量**：16（默认）
- **负载因子**：0.75（默认）
- **扩容阈值**：容量 × 负载因子（16 × 0.75 = 12）
- **树化阈值**：TREEIFY_THRESHOLD = 8
- **退化阈值**：UNTREEIFY_THRESHOLD = 6

**核心方法流程：**

**put 操作：**
1. 计算 key 的 hash 值
2. 根据 hash 值定位到数组索引：`(n-1) & hash`
3. 若该位置为空，直接插入
4. 若该位置有元素：
   - 链表结构：遍历链表，找到相同 key 则覆盖，否则尾插
   - 红黑树结构：按红黑树规则插入
5. 插入后检查是否需要扩容

**get 操作：**
1. 计算 key 的 hash 值
2. 定位到数组索引
3. 若首节点匹配，直接返回
4. 否则遍历链表/红黑树查找

<svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">HashMap 数据结构 (JDK 8)</text>
<rect x="10" y="45" width="680" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">数组 + 链表 + 红黑树</text>
<rect x="30" y="80" width="60" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="30" y="115" width="60" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="30" y="150" width="60" height="30" fill="#ffe0b2" stroke="#f57c00" stroke-width="2"/>
<rect x="30" y="185" width="60" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="30" y="220" width="60" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<text x="40" y="100" class="label">[0]</text>
<text x="40" y="135" class="label">[1]</text>
<text x="40" y="170" class="label">[2]</text>
<text x="40" y="205" class="label">[3]</text>
<text x="40" y="240" class="label">...</text>
<text x="100" y="100" class="code">null</text>
<line x1="90" y1="130" x2="120" y2="130" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow4)"/>
<rect x="120" y="115" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<text x="125" y="130" class="code">K1:V1</text>
<text x="125" y="143" class="code" fill="#666">hash:5</text>
<text x="210" y="130" class="code">→ null</text>
<line x1="90" y1="165" x2="120" y2="165" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange2)"/>
<rect x="120" y="150" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<text x="125" y="165" class="code">K2:V2</text>
<text x="125" y="178" class="code" fill="#666">hash:18</text>
<line x1="200" y1="165" x2="220" y2="165" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange2)"/>
<rect x="220" y="150" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<text x="225" y="165" class="code">K3:V3</text>
<text x="225" y="178" class="code" fill="#666">hash:34</text>
<line x1="300" y1="165" x2="320" y2="165" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange2)"/>
<text x="325" y="170" class="code">... (8个节点)</text>
<line x1="420" y1="165" x2="450" y2="165" stroke="#d32f2f" stroke-width="2" stroke-dasharray="5,5"/>
<text x="455" y="150" class="code" fill="#d32f2f">长度≥8 且</text>
<text x="455" y="165" class="code" fill="#d32f2f">数组≥64</text>
<text x="455" y="180" class="code" fill="#d32f2f">→ 红黑树</text>
<text x="100" y="205" class="code">null</text>
<rect x="370" y="80" width="310" height="110" fill="#ffebee" stroke="#d32f2f" stroke-width="1" rx="5"/>
<text x="380" y="100" class="title" fill="#d32f2f">红黑树转化条件</text>
<text x="380" y="120" class="code">1. 链表长度 ≥ 8</text>
<text x="380" y="140" class="code">2. 数组容量 ≥ 64</text>
<text x="380" y="160" class="code">满足条件 → 链表转红黑树</text>
<text x="380" y="180" class="code">红黑树节点 ≤ 6 → 退化为链表</text>
<rect x="370" y="200" width="310" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="5"/>
<text x="380" y="220" class="title" fill="#f57c00">为什么是 8 和 6?</text>
<text x="380" y="240" class="code">泊松分布: 链表长度达到8的概率极低</text>
<text x="380" y="255" class="code">6和8之间有缓冲,避免频繁转换</text>
<rect x="10" y="280" width="330" height="210" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="300" class="title">核心源码 (简化)</text>
<text x="20" y="320" class="code" style="fill:#000;">public V put(K key, V value) {</text>
<text x="30" y="335" class="code" style="fill:#1976d2;">  int hash = hash(key); // 计算hash</text>
<text x="30" y="350" class="code" style="fill:#f57c00;">  int i = (n - 1) & hash; // 定位索引</text>
<text x="30" y="365" class="code" style="fill:#000;">  if (tab[i] == null)</text>
<text x="40" y="380" class="code" style="fill:#388e3c;">    tab[i] = newNode(hash, key, value);</text>
<text x="30" y="395" class="code" style="fill:#000;">  else {</text>
<text x="40" y="410" class="code" style="fill:#666;">    // 遍历链表或红黑树</text>
<text x="40" y="425" class="code" style="fill:#666;">    // 找到相同key则覆盖</text>
<text x="40" y="440" class="code" style="fill:#666;">    // 否则插入新节点</text>
<text x="30" y="455" class="code" style="fill:#000;">  }</text>
<text x="30" y="470" class="code" style="fill:#d32f2f;">  if (++size > threshold) resize();</text>
<text x="20" y="485" class="code" style="fill:#000;">}</text>
<rect x="350" y="280" width="340" height="210" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="5"/>
<text x="360" y="300" class="title">关键特性</text>
<text x="360" y="320" class="code">• 允许 null key 和 null value</text>
<text x="360" y="340" class="code">• 非线程安全</text>
<text x="360" y="360" class="code">• 无序 (不保证遍历顺序)</text>
<text x="360" y="380" class="code">• 时间复杂度: O(1) 平均, O(log n) 最坏(树)</text>
<text x="360" y="405" class="code" fill="#d32f2f">哈希冲突解决:</text>
<text x="360" y="425" class="code">1. 链表法 (长度<8)</text>
<text x="360" y="445" class="code">2. 红黑树 (长度≥8 且容量≥64)</text>
<text x="360" y="465" class="code">3. 扩容 (size > threshold)</text>
<defs>
<marker id="arrow4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
<marker id="arrow-orange2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
</defs>
</svg>

**记忆要点：**
- **数组+链表+树** —— JDK 8 引入红黑树优化
- **8 和 6** —— 链表转树阈值 8，树退化阈值 6
- **0.75 负载因子** —— 时间和空间的权衡

### 11. HashMap 在 JDK7 和 JDK8 中的区别？

**主要区别总结：**

| 特性 | JDK 7 | JDK 8 |
|------|-------|-------|
| **数据结构** | 数组 + 链表 | 数组 + 链表 + 红黑树 |
| **插入方式** | 头插法 | 尾插法 |
| **扩容时机** | 插入前判断 | 插入后判断 |
| **hash 计算** | 9次扰动（4次位运算+5次异或） | 2次扰动（1次位运算+1次异或） |
| **并发问题** | 扩容时可能形成环形链表（死循环） | 扩容时不会形成环（但仍非线程安全） |

<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">JDK 7 vs JDK 8</text>
<rect x="10" y="45" width="330" height="170" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="120" y="70" class="title" fill="#c62828">JDK 7 (数组+链表)</text>
<rect x="30" y="90" width="60" height="30" fill="#fff" stroke="#c62828" stroke-width="1.5"/>
<text x="45" y="110" class="label">[i]</text>
<line x1="90" y1="105" x2="120" y2="105" stroke="#c62828" stroke-width="2" marker-end="url(#arrow-red)"/>
<rect x="120" y="90" width="60" height="30" fill="#fff" stroke="#c62828" stroke-width="1.5"/>
<text x="140" y="110" class="label">A</text>
<line x1="180" y1="105" x2="210" y2="105" stroke="#c62828" stroke-width="2" marker-end="url(#arrow-red)"/>
<rect x="210" y="90" width="60" height="30" fill="#fff" stroke="#c62828" stroke-width="1.5"/>
<text x="230" y="110" class="label">B</text>
<line x1="270" y1="105" x2="300" y2="105" stroke="#c62828" stroke-width="2" marker-end="url(#arrow-red)"/>
<text x="300" y="110" class="label">→null</text>
<text x="30" y="140" class="code">插入方式: 头插法</text>
<text x="30" y="160" class="code">新元素插入链表头部</text>
<text x="30" y="180" class="code" fill="#d32f2f">⚠ 并发扩容可能死循环</text>
<text x="30" y="200" class="code" fill="#666">hash扰动: 9次 (复杂)</text>
<rect x="360" y="45" width="330" height="170" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="450" y="70" class="title" fill="#2e7d32">JDK 8 (数组+链表+树)</text>
<rect x="380" y="90" width="60" height="30" fill="#fff" stroke="#2e7d32" stroke-width="1.5"/>
<text x="395" y="110" class="label">[i]</text>
<line x1="440" y1="105" x2="470" y2="105" stroke="#2e7d32" stroke-width="2" marker-end="url(#arrow-green)"/>
<rect x="470" y="90" width="60" height="30" fill="#fff" stroke="#2e7d32" stroke-width="1.5"/>
<text x="490" y="110" class="label">A</text>
<line x1="530" y1="105" x2="560" y2="105" stroke="#2e7d32" stroke-width="2" marker-end="url(#arrow-green)"/>
<rect x="560" y="90" width="60" height="30" fill="#fff" stroke="#2e7d32" stroke-width="1.5"/>
<text x="580" y="110" class="label">B</text>
<text x="630" y="110" class="label">→tree</text>
<text x="380" y="140" class="code">插入方式: 尾插法</text>
<text x="380" y="160" class="code">新元素插入链表尾部</text>
<text x="380" y="180" class="code" fill="#388e3c">✓ 避免死循环</text>
<text x="380" y="200" class="code" fill="#666">hash扰动: 2次 (简化)</text>
<rect x="10" y="230" width="330" height="180" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="250" class="title">JDK 7 死循环问题</text>
<text x="20" y="270" class="code">并发扩容时:</text>
<text x="20" y="290" class="code">1. 线程A扩容,遍历链表 A→B</text>
<text x="20" y="310" class="code">2. 线程B先完成,链表变 B→A</text>
<text x="20" y="330" class="code">3. 线程A继续执行,形成环</text>
<text x="20" y="350" class="code">   A→B→A (死循环)</text>
<text x="20" y="375" class="code" fill="#d32f2f">原因: 头插法导致链表倒置</text>
<text x="20" y="395" class="code" fill="#666">解决: JDK8改用尾插法</text>
<rect x="350" y="230" width="340" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="5"/>
<text x="360" y="250" class="title">为什么改用尾插法?</text>
<text x="360" y="275" class="code" fill="#388e3c">✓ 避免扩容时链表倒置</text>
<text x="360" y="295" class="code" fill="#388e3c">✓ 不会形成环形链表</text>
<text x="360" y="315" class="code" fill="#388e3c">✓ 保持插入顺序</text>
<text x="360" y="340" class="code" fill="#d32f2f">注意:</text>
<text x="360" y="360" class="code">• HashMap 仍然非线程安全</text>
<text x="360" y="380" class="code">• 并发环境请使用 ConcurrentHashMap</text>
<text x="360" y="400" class="code">• 尾插法需要遍历,但红黑树优化了性能</text>
<defs>
<marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#c62828"/></marker>
<marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#2e7d32"/></marker>
</defs>
</svg>

**记忆要点：**
- **JDK8 红黑树** —— 链表长度≥8且数组≥64时转树
- **尾插法安全** —— 避免死循环，但仍非线程安全
- **hash 简化** —— JDK8 优化了 hash 计算

### 12. HashMap 的扩容机制？

**扩容触发条件：**
- `size > threshold`（阈值 = 容量 × 负载因子）
- 默认：`size > 16 × 0.75 = 12`

**扩容规则：**
- 容量扩大为原来的 **2 倍**
- 容量始终保持 2 的幂次方

**扩容步骤：**
1. 创建新数组（容量 × 2）
2. 重新计算每个元素的位置（rehash）
3. 将元素从旧数组迁移到新数组

**JDK 8 优化：**
- 元素位置只有两种可能：
  - 保持原位置 `index`
  - 移动到 `index + oldCap`
- 判断依据：`hash & oldCap` 是否为 0

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}.step{font:12px sans-serif;fill:#1976d2;font-weight:bold;}</style></defs>
<text x="250" y="25" class="title">HashMap 扩容过程</text>
<rect x="10" y="45" width="680" height="90" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="step">扩容前 (capacity=4, threshold=3)</text>
<rect x="30" y="75" width="50" height="25" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="85" y="75" width="50" height="25" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="140" y="75" width="50" height="25" fill="#ffe0b2" stroke="#f57c00" stroke-width="2"/>
<rect x="195" y="75" width="50" height="25" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<text x="45" y="92" class="label">[0]</text>
<text x="100" y="92" class="label">[1]</text>
<text x="150" y="92" class="label">[2]</text>
<text x="210" y="92" class="label">[3]</text>
<text x="260" y="92" class="code">size=4 > threshold=3</text>
<line x1="155" y1="100" x2="155" y2="115" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="380" y="92" class="code" fill="#d32f2f">触发扩容!</text>
<rect x="10" y="150" width="680" height="90" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="20" y="170" class="step">扩容后 (capacity=8, threshold=6)</text>
<rect x="30" y="180" width="40" height="25" fill="#fff" stroke="#f57c00" stroke-width="1.5"/>
<rect x="73" y="180" width="40" height="25" fill="#fff" stroke="#f57c00" stroke-width="1.5"/>
<rect x="116" y="180" width="40" height="25" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<rect x="159" y="180" width="40" height="25" fill="#fff" stroke="#f57c00" stroke-width="1.5"/>
<rect x="202" y="180" width="40" height="25" fill="#fff" stroke="#f57c00" stroke-width="1.5"/>
<rect x="245" y="180" width="40" height="25" fill="#fff" stroke="#f57c00" stroke-width="1.5"/>
<rect x="288" y="180" width="40" height="25" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<rect x="331" y="180" width="40" height="25" fill="#fff" stroke="#f57c00" stroke-width="1.5"/>
<text x="42" y="197" class="label">[0]</text>
<text x="85" y="197" class="label">[1]</text>
<text x="128" y="197" class="label">[2]</text>
<text x="171" y="197" class="label">[3]</text>
<text x="214" y="197" class="label">[4]</text>
<text x="257" y="197" class="label">[5]</text>
<text x="300" y="197" class="label">[6]</text>
<text x="343" y="197" class="label">[7]</text>
<text x="380" y="197" class="code">容量翻倍: 4→8</text>
<text x="20" y="230" class="code" fill="#388e3c">元素重新分布: [2]和[6]有数据</text>
<rect x="10" y="255" width="330" height="190" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="275" class="title">JDK 8 扩容优化</text>
<text x="20" y="295" class="code">判断元素新位置:</text>
<text x="20" y="315" class="code" style="fill:#1976d2;">if ((hash & oldCap) == 0)</text>
<text x="30" y="335" class="code" style="fill:#388e3c;">  newIndex = oldIndex; // 保持原位</text>
<text x="20" y="355" class="code" style="fill:#1976d2;">else</text>
<text x="30" y="375" class="code" style="fill:#f57c00;">  newIndex = oldIndex + oldCap; // 偏移</text>
<text x="20" y="400" class="code" fill="#666">例如: oldCap=4, hash=6</text>
<text x="20" y="420" class="code" fill="#666">6 & 4 = 4 != 0 → 新位置 = 2+4 = 6</text>
<text x="20" y="435" class="code" fill="#d32f2f">避免重新计算hash,性能更好!</text>
<rect x="350" y="255" width="340" height="190" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="5"/>
<text x="360" y="275" class="title">为什么容量是2的幂?</text>
<text x="360" y="300" class="code" fill="#388e3c">1. 快速定位索引</text>
<text x="370" y="320" class="code">index = (n-1) & hash</text>
<text x="370" y="335" class="code">等价于 hash % n (但更快)</text>
<text x="360" y="360" class="code" fill="#388e3c">2. 扩容时快速重新分布</text>
<text x="370" y="380" class="code">只需判断 hash & oldCap</text>
<text x="360" y="405" class="code" fill="#388e3c">3. 减少哈希冲突</text>
<text x="370" y="425" class="code">2的幂能更均匀分布元素</text>
<defs><marker id="arrow5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker></defs>
</svg>

**记忆要点：**
- **2 倍扩容** —— 容量始终保持 2 的幂次方
- **0.75 负载因子** —— 空间与时间的平衡
- **JDK8 优化** —— 通过位运算快速确定新位置

### 13. HashMap 的 put 方法执行流程？

**完整执行流程：**

1. **计算 hash 值**：`hash(key)`
2. **定位数组索引**：`(n-1) & hash`
3. **判断位置状态**：
   - **位置为空**：直接插入新节点
   - **位置有元素**：进入步骤 4
4. **处理哈希冲突**：
   - **key 相同**：覆盖旧值，返回旧值
   - **key 不同**：
     - 链表结构：遍历链表，尾插新节点
     - 红黑树结构：按树规则插入
5. **检查树化**：链表长度 ≥ 8 且数组 ≥ 64 → 转红黑树
6. **检查扩容**：`size > threshold` → 扩容

<svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:10px monospace;fill:#444;}.box{font:11px sans-serif;}</style></defs>
<text x="280" y="20" class="title">HashMap.put() 流程图</text>
<rect x="250" y="35" width="200" height="35" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="310" y="57" class="box">1. 计算 hash(key)</text>
<line x1="350" y1="70" x2="350" y2="90" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow6)"/>
<rect x="250" y="90" width="200" height="35" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="280" y="112" class="box">2. 定位索引 (n-1)&hash</text>
<line x1="350" y1="125" x2="350" y2="145" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow6)"/>
<path d="M 350 145 L 290 170 L 410 170 Z" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="310" y="167" class="box">位置为空?</text>
<line x1="290" y1="170" x2="150" y2="200" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green2)"/>
<text x="190" y="185" class="code" fill="#388e3c">是</text>
<rect x="50" y="200" width="200" height="35" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="95" y="222" class="box">3a. 直接插入新节点</text>
<line x1="150" y1="235" x2="150" y2="490" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green2)"/>
<line x1="410" y1="170" x2="550" y2="200" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow-red2)"/>
<text x="480" y="185" class="code" fill="#d32f2f">否</text>
<path d="M 550 200 L 490 225 L 610 225 Z" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
<text x="515" y="222" class="box">key相同?</text>
<line x1="490" y1="225" x2="150" y2="255" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green2)"/>
<text x="300" y="240" class="code" fill="#388e3c">是</text>
<rect x="50" y="255" width="200" height="35" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="95" y="277" class="box">3b. 覆盖值,返回旧值</text>
<line x1="150" y1="290" x2="150" y2="490" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green2)"/>
<line x1="610" y1="225" x2="650" y2="255" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow-red2)"/>
<text x="630" y="240" class="code" fill="#d32f2f">否</text>
<path d="M 650 255 L 590 280 L 700 280 Z" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="615" y="277" class="box">红黑树?</text>
<line x1="590" y1="280" x2="480" y2="310" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow6)"/>
<text x="520" y="295" class="code">是</text>
<rect x="380" y="310" width="200" height="35" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="415" y="332" class="box">按树规则插入节点</text>
<line x1="480" y1="345" x2="480" y2="490" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow6)"/>
<line x1="700" y1="280" x2="150" y2="365" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange3)"/>
<text x="400" y="325" class="code" fill="#f57c00">否(链表)</text>
<rect x="50" y="365" width="200" height="35" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="85" y="387" class="box">遍历链表,尾插节点</text>
<line x1="150" y1="400" x2="150" y2="420" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange3)"/>
<rect x="50" y="420" width="200" height="35" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="65" y="442" class="box">链表长度≥8? → 树化</text>
<line x1="150" y1="455" x2="150" y2="490" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange3)"/>
<rect x="250" y="490" width="200" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="280" y="510" class="box">size > threshold? → 扩容</text>
<defs>
<marker id="arrow6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
<marker id="arrow-green2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#388e3c"/></marker>
<marker id="arrow-red2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#d32f2f"/></marker>
<marker id="arrow-orange3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
</defs>
</svg>

**记忆要点：**
- **hash定位** —— 计算hash值定位数组索引
- **冲突处理** —— 链表或红黑树
- **自动扩容** —— size超过阈值自动扩容

### 14. HashMap 为什么线程不安全？

**主要线程安全问题：**

**1. 数据覆盖（put 并发）**
- 两个线程同时 put，可能导致一个线程的数据被覆盖
- 原因：put 操作非原子性

**2. 扩容丢失数据**
- 线程 A 扩容时，线程 B 同时 put
- B 的数据可能写入旧数组，扩容后丢失

**3. 并发修改异常（fast-fail）**
- 遍历时其他线程修改 HashMap
- 抛出 `ConcurrentModificationException`

**4. JDK 7 死循环（已解决）**
- 多线程同时扩容可能形成环形链表
- JDK 8 改用尾插法解决

**解决方案：**
- `ConcurrentHashMap`：推荐，性能好
- `Collections.synchronizedMap()`：简单但性能差
- 手动加锁：灵活但复杂

**记忆要点：**
- **非原子操作** —— put/resize 非原子，可能数据覆盖
- **fast-fail** —— 遍历时修改抛异常
- **用 ConcurrentHashMap** —— 高并发场景首选

### 15. HashTable 和 HashMap 的区别？

| 特性 | Hashtable | HashMap |
|------|-----------|---------|
| **线程安全** | 安全（synchronized） | 不安全 |
| **null key/value** | 不允许 | 允许（key 最多 1 个 null） |
| **性能** | 较慢（锁开销） | 较快 |
| **初始容量** | 11 | 16 |
| **扩容倍数** | 2倍+1 | 2倍 |
| **继承** | Dictionary | AbstractMap |
| **版本** | JDK 1.0（遗留类） | JDK 1.2 |

**使用建议：**
- **不推荐** Hashtable（已过时）
- **单线程** 使用 HashMap
- **多线程** 使用 ConcurrentHashMap

**记忆要点：**
- **Hashtable 过时** —— 方法级 synchronized
- **HashMap 主流** —— 允许 null，性能好
- **用 ConcurrentHashMap** —— 替代 Hashtable

### 16. ConcurrentHashMap 的实现原理？

**JDK 8 实现（常考）：**

**核心机制：**
- **数组 + 链表 + 红黑树** 结构（同 HashMap）
- **CAS + synchronized** 保证线程安全

**并发控制：**
1. **数组初始化**：CAS 保证只初始化一次
2. **put 操作**：
   - 位置为空：CAS 插入
   - 位置有元素：synchronized 锁住该位置（**锁粒度：单个桶**）
3. **扩容**：多线程协助扩容（transfer）

**关键优化：**
- **分段锁思想**：锁住单个数组位置，不锁整个表
- **无锁读**：get 操作完全无锁
- **协助扩容**：多个线程共同完成扩容

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="200" y="25" class="title">ConcurrentHashMap (JDK 8)</text>
<rect x="10" y="45" width="680" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">并发 put 操作示意</text>
<rect x="30" y="80" width="60" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="100" y="80" width="60" height="30" fill="#ffe0b2" stroke="#f57c00" stroke-width="2"/>
<rect x="170" y="80" width="60" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="240" y="80" width="60" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="45" y="100" class="label">[0]</text>
<text x="115" y="100" class="label">[1]</text>
<text x="185" y="100" class="label">[2]</text>
<text x="255" y="100" class="label">[3]</text>
<text x="30" y="130" class="code" fill="#388e3c">线程A put [0] → CAS成功</text>
<text x="30" y="150" class="code" fill="#f57c00">线程B put [1] → synchronized锁[1]</text>
<text x="30" y="170" class="code" fill="#1976d2">线程C put [3] → synchronized锁[3]</text>
<text x="30" y="185" class="code" fill="#d32f2f">✓ 不同位置可并发,互不影响!</text>
<rect x="10" y="210" width="330" height="180" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="230" class="title">核心源码 (简化)</text>
<text x="20" y="250" class="code" style="fill:#000;">public V put(K key, V value) {</text>
<text x="30" y="265" class="code" style="fill:#1976d2;">  int hash = spread(key.hashCode());</text>
<text x="30" y="280" class="code" style="fill:#000;">  for (Node[] tab = table;;) {</text>
<text x="40" y="295" class="code" style="fill:#388e3c;">    if (tab[i] == null)</text>
<text x="50" y="310" class="code" style="fill:#388e3c;">      casTabAt(tab, i, new Node()); // CAS</text>
<text x="40" y="325" class="code" style="fill:#f57c00;">    else {</text>
<text x="50" y="340" class="code" style="fill:#f57c00;">      synchronized (tab[i]) { // 锁桶</text>
<text x="60" y="355" class="code" style="fill:#000;">        // 链表或树插入</text>
<text x="50" y="370" class="code" style="fill:#f57c00;">      }</text>
<text x="40" y="385" class="code" style="fill:#000;">    }</text>
<rect x="350" y="210" width="340" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="5"/>
<text x="360" y="230" class="title">关键特性</text>
<text x="360" y="250" class="code" fill="#388e3c">1. 锁粒度: 单个数组位置 (不是整表)</text>
<text x="360" y="270" class="code" fill="#388e3c">2. 读无锁: get 不加锁 (volatile保证)</text>
<text x="360" y="290" class="code" fill="#388e3c">3. CAS插入: 空位置用 CAS,失败重试</text>
<text x="360" y="310" class="code" fill="#388e3c">4. 协助扩容: 多线程并发扩容</text>
<text x="360" y="335" class="code" fill="#1976d2">性能:</text>
<text x="360" y="355" class="code">• 比 Hashtable 快 (细粒度锁)</text>
<text x="360" y="375" class="code">• 读写分离,读性能高</text>
</svg>

**记忆要点：**
- **CAS + synchronized** —— 空位置 CAS,冲突位置加锁
- **锁单个桶** —— 锁粒度小,并发度高
- **读无锁** —— volatile 数组,get 不加锁

### 17. ConcurrentHashMap 在 JDK7 和 JDK8 中的区别？

| 特性 | JDK 7 | JDK 8 |
|------|-------|-------|
| **数据结构** | Segment 数组 + HashEntry 数组 | Node 数组 + 链表 + 红黑树 |
| **锁机制** | Segment 分段锁（ReentrantLock） | synchronized + CAS |
| **锁粒度** | Segment（默认 16 个） | 单个数组位置（桶） |
| **并发度** | Segment 数量（默认 16） | 数组长度（默认 16，可扩容） |
| **扩容** | Segment 内部扩容 | 多线程协助扩容 |

**JDK 7 分段锁：**
- 将数组分成多个 Segment（默认 16 个）
- 每个 Segment 是一个 ReentrantLock
- 不同 Segment 可并发访问

**JDK 8 优化：**
- 取消 Segment，锁粒度更小
- synchronized 性能提升（JVM 优化）
- 多线程协助扩容，速度更快

**记忆要点：**
- **JDK7 Segment 锁** —— 分段锁，锁粒度较大
- **JDK8 CAS+synchronized** —— 锁单个桶，并发度更高
- **JDK8 更快** —— 协助扩容，锁优化

### 18. LinkedHashMap 的实现原理？

**核心原理：**
LinkedHashMap = **HashMap + 双向链表**

**数据结构：**
- 继承 HashMap，复用其哈希表结构
- 额外维护一个双向链表，记录插入/访问顺序

**两种顺序模式：**
1. **插入顺序**（默认）：`accessOrder = false`
2. **访问顺序**：`accessOrder = true`（可实现 LRU 缓存）

**Entry 节点：**
```java
static class Entry<K,V> extends HashMap.Node<K,V> {
    Entry<K,V> before, after; // 双向链表指针
}
```

**应用场景：**
- 保持插入顺序的 Map
- LRU 缓存（accessOrder = true + 重写 removeEldestEntry）

**记忆要点：**
- **HashMap + 双向链表** —— 哈希表保证性能，链表保证顺序
- **两种模式** —— 插入顺序/访问顺序
- **LRU 缓存** —— 访问顺序模式的典型应用

### 19. TreeMap 的实现原理？

**核心原理：**
TreeMap 基于 **红黑树**（自平衡二叉搜索树）实现。

**关键特性：**
- **有序**：按 key 自然排序或自定义 Comparator 排序
- **时间复杂度**：O(log n)
- **不允许 null key**：无法比较大小
- **非线程安全**

**排序方式：**
1. **自然排序**：key 实现 Comparable
2. **自定义排序**：传入 Comparator

**常用方法：**
- `firstKey() / lastKey()`：获取最小/最大 key
- `subMap(from, to)`：范围查询
- `headMap(to) / tailMap(from)`：获取子 Map

**记忆要点：**
- **红黑树实现** —— O(log n)，自动排序
- **有序 Map** —— 支持范围查询
- **不允许 null key** —— 需要比较大小

### 20. HashMap 和 TreeMap 的区别？

| 特性 | HashMap | TreeMap |
|------|---------|---------|
| **底层结构** | 数组+链表+红黑树（哈希表） | 红黑树 |
| **时间复杂度** | O(1) 平均，O(log n) 最坏 | O(log n) |
| **顺序** | 无序 | 有序（按 key 排序） |
| **null key** | 允许（最多 1 个） | 不允许 |
| **性能** | 快 | 较慢 |
| **适用场景** | 一般 key-value 存储 | 需要排序、范围查询 |

**选择建议：**
- **HashMap**：默认选择，性能好
- **TreeMap**：需要排序或范围查询时使用
- **LinkedHashMap**：需要保持插入顺序时使用

**记忆要点：**
- **HashMap 快无序** —— 哈希表，O(1)
- **TreeMap 慢有序** —— 红黑树，O(log n)，支持范围查询
- **根据需求选择** —— 一般用 HashMap，需要排序用 TreeMap
