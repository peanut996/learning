## Set

### 6. HashSet 的实现原理？

**核心原理：**
HashSet 底层使用 **HashMap** 实现，元素作为 HashMap 的 key，value 是一个固定的 Object 对象（PRESENT）。

**关键特性：**
- **无序**：不保证元素顺序
- **唯一**：通过 HashMap 的 key 唯一性保证
- **允许 null**：最多一个 null 元素
- **非线程安全**：需要外部同步

**去重机制：**
1. 计算元素的 hashCode()
2. 根据哈希值定位到数组位置
3. 如果该位置为空，直接插入
4. 如果该位置有元素，调用 equals() 比较
5. 相同则不插入，不同则链接到链表/红黑树

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}.key{font:12px sans-serif;fill:#1976d2;font-weight:bold;}</style></defs>
<text x="10" y="20" class="title">HashSet 底层结构 (实际是 HashMap)</text>
<rect x="10" y="35" width="680" height="160" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="55" class="key">HashSet.add("A") → HashMap.put("A", PRESENT)</text>
<rect x="30" y="70" width="120" height="35" fill="#fff" stroke="#666" stroke-width="1.5"/>
<text x="40" y="85" class="label">hash(A) % 16</text>
<text x="40" y="100" class="label">index: 3</text>
<line x1="90" y1="105" x2="90" y2="135" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="30" y="135" width="100" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="40" y="155" class="code" fill="#000">Key: "A"</text>
<text x="40" y="170" class="code" fill="#666">Value: PRESENT</text>
<rect x="200" y="70" width="120" height="35" fill="#fff" stroke="#666" stroke-width="1.5"/>
<text x="210" y="85" class="label">hash(B) % 16</text>
<text x="210" y="100" class="label">index: 7</text>
<line x1="260" y1="105" x2="260" y2="135" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="200" y="135" width="100" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="210" y="155" class="code" fill="#000">Key: "B"</text>
<text x="210" y="170" class="code" fill="#666">Value: PRESENT</text>
<rect x="370" y="70" width="120" height="35" fill="#fff" stroke="#666" stroke-width="1.5"/>
<text x="380" y="85" class="label">hash(A) % 16</text>
<text x="380" y="100" class="label">index: 3 (重复)</text>
<line x1="430" y1="105" x2="430" y2="135" stroke="#d32f2f" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow-red)"/>
<rect x="370" y="135" width="100" height="50" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="380" y="155" class="code" fill="#000">Key: "A"</text>
<text x="380" y="170" class="code" fill="#d32f2f">已存在,不插入</text>
<rect x="540" y="70" width="140" height="115" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="5"/>
<text x="550" y="85" class="label" fill="#f57c00">PRESENT 对象:</text>
<text x="550" y="105" class="code">private static final</text>
<text x="550" y="120" class="code">Object PRESENT =</text>
<text x="550" y="135" class="code">  new Object();</text>
<text x="550" y="155" class="code" fill="#666">固定占位对象</text>
<text x="550" y="170" class="code" fill="#666">无实际意义</text>
<rect x="10" y="210" width="330" height="180" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="230" class="title">核心源码</text>
<text x="20" y="250" class="code" style="fill:#000;">public class HashSet&lt;E&gt; {</text>
<text x="30" y="265" class="code" style="fill:#1976d2;">  private transient HashMap&lt;E,Object&gt; map;</text>
<text x="30" y="280" class="code" style="fill:#f57c00;">  private static final Object PRESENT = new Object();</text>
<text x="30" y="300" class="code" style="fill:#000;">  public boolean add(E e) {</text>
<text x="40" y="315" class="code" style="fill:#388e3c;">    return map.put(e, PRESENT) == null;</text>
<text x="30" y="330" class="code" style="fill:#000;">  }</text>
<text x="30" y="350" class="code" style="fill:#000;">  public boolean contains(Object o) {</text>
<text x="40" y="365" class="code" style="fill:#388e3c;">    return map.containsKey(o);</text>
<text x="30" y="380" class="code" style="fill:#000;">  }</text>
<text x="20" y="390" class="code" style="fill:#000;">}</text>
<rect x="350" y="210" width="340" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="5"/>
<text x="360" y="230" class="title">关键点</text>
<text x="360" y="250" class="code">1. 底层是 HashMap</text>
<text x="360" y="270" class="code">2. 元素存储在 key,value 固定为 PRESENT</text>
<text x="360" y="290" class="code">3. 去重依赖 hashCode() + equals()</text>
<text x="360" y="310" class="code">4. 时间复杂度: O(1) (平均)</text>
<text x="360" y="335" class="code" fill="#d32f2f">重写 equals() 必须重写 hashCode()</text>
<text x="360" y="355" class="code" fill="#d32f2f">hashCode() 相同不代表对象相同</text>
<text x="360" y="375" class="code" fill="#d32f2f">equals() 相同则 hashCode() 必须相同</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
<marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#d32f2f"/></marker>
</defs>
</svg>

**记忆要点：**
- **底层 HashMap** —— 元素是 key，value 是 PRESENT
- **去重靠哈希** —— hashCode() + equals() 双重检查
- **必须成对重写** —— equals() 和 hashCode() 要一起重写

### 7. LinkedHashSet 和 HashSet 的区别？

**底层实现：**
- **HashSet**：基于 HashMap
- **LinkedHashSet**：基于 LinkedHashMap（HashMap + 双向链表）

**元素顺序：**
- **HashSet**：无序，不保证元素顺序
- **LinkedHashSet**：有序，保持插入顺序

**性能：**
- **HashSet**：略快（无需维护链表）
- **LinkedHashSet**：略慢（需要维护链表）

**内存占用：**
- **HashSet**：较小
- **LinkedHashSet**：较大（额外的链表指针）

<svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">HashSet vs LinkedHashSet</text>
<rect x="30" y="50" width="300" height="140" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="120" y="75" class="title" fill="#1976d2">HashSet (无序)</text>
<text x="40" y="100" class="code">add("C"); add("A"); add("B");</text>
<rect x="50" y="115" width="40" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="100" y="115" width="40" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="150" y="115" width="40" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<text x="65" y="135" class="label">C</text>
<text x="115" y="135" class="label">B</text>
<text x="165" y="135" class="label">A</text>
<text x="40" y="165" class="code" fill="#666">顺序: 由哈希值决定</text>
<text x="40" y="180" class="code" fill="#666">遍历: C → B → A</text>
<rect x="370" y="50" width="300" height="140" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="430" y="75" class="title" fill="#f57c00">LinkedHashSet (有序)</text>
<text x="380" y="100" class="code">add("C"); add("A"); add("B");</text>
<rect x="390" y="115" width="40" height="30" fill="#fff" stroke="#f57c00" stroke-width="1.5"/>
<rect x="450" y="115" width="40" height="30" fill="#fff" stroke="#f57c00" stroke-width="1.5"/>
<rect x="510" y="115" width="40" height="30" fill="#fff" stroke="#f57c00" stroke-width="1.5"/>
<text x="405" y="135" class="label">C</text>
<text x="465" y="135" class="label">A</text>
<text x="525" y="135" class="label">B</text>
<line x1="430" y1="130" x2="450" y2="130" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow2)"/>
<line x1="490" y1="130" x2="510" y2="130" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow2)"/>
<text x="380" y="165" class="code" fill="#388e3c">顺序: 保持插入顺序</text>
<text x="380" y="180" class="code" fill="#388e3c">遍历: C → A → B</text>
<rect x="30" y="210" width="640" height="130" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="40" y="235" class="title">对比总结</text>
<rect x="50" y="250" width="280" height="80" fill="#fff" stroke="#1976d2" stroke-width="1"/>
<text x="60" y="270" class="code">HashSet</text>
<text x="60" y="290" class="code">• 底层: HashMap</text>
<text x="60" y="305" class="code">• 顺序: 无序</text>
<text x="60" y="320" class="code">• 性能: ★★★ (略快)</text>
<rect x="340" y="250" width="320" height="80" fill="#fff" stroke="#f57c00" stroke-width="1"/>
<text x="350" y="270" class="code">LinkedHashSet</text>
<text x="350" y="290" class="code">• 底层: LinkedHashMap (哈希表+链表)</text>
<text x="350" y="305" class="code">• 顺序: 插入顺序</text>
<text x="350" y="320" class="code">• 性能: ★★☆ (略慢,需维护链表)</text>
<defs><marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker></defs>
</svg>

**使用场景：**
- **HashSet**：不关心元素顺序，追求性能
- **LinkedHashSet**：需要保持插入顺序（如记录操作历史）

**记忆要点：**
- **HashSet 无序快** —— 纯哈希表
- **LinkedHashSet 有序慢** —— 哈希表 + 链表维护顺序
- **插入顺序** —— LinkedHashSet 的特色

### 8. TreeSet 的实现原理？

**核心原理：**
TreeSet 底层使用 **TreeMap** 实现（红黑树），元素作为 TreeMap 的 key。

**关键特性：**
- **有序**：自然排序或自定义 Comparator 排序
- **唯一**：通过 compare/compareTo 比较去重
- **不允许 null**：无法比较大小
- **非线程安全**：需要外部同步

**时间复杂度：**
- 插入/删除/查找：O(log n)（红黑树保证）

<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}.node{font:13px sans-serif;}</style></defs>
<text x="10" y="20" class="title">TreeSet 底层结构 (红黑树)</text>
<rect x="10" y="35" width="680" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="55" class="title" fill="#1976d2">插入过程: add(5), add(3), add(7), add(1), add(9)</text>
<circle cx="350" cy="100" r="25" fill="#fff" stroke="#1976d2" stroke-width="2"/>
<text x="343" y="107" class="node">5</text>
<line x1="325" y1="115" x2="280" y2="140" stroke="#1976d2" stroke-width="2"/>
<line x1="375" y1="115" x2="420" y2="140" stroke="#1976d2" stroke-width="2"/>
<circle cx="280" cy="150" r="25" fill="#fff" stroke="#388e3c" stroke-width="2"/>
<text x="273" y="157" class="node">3</text>
<circle cx="420" cy="150" r="25" fill="#fff" stroke="#388e3c" stroke-width="2"/>
<text x="413" y="157" class="node">7</text>
<line x1="255" y1="165" x2="220" y2="185" stroke="#388e3c" stroke-width="2"/>
<line x1="445" y1="165" x2="480" y2="185" stroke="#388e3c" stroke-width="2"/>
<circle cx="220" cy="195" r="25" fill="#fff" stroke="#f57c00" stroke-width="2"/>
<text x="213" y="202" class="node">1</text>
<circle cx="480" cy="195" r="25" fill="#fff" stroke="#f57c00" stroke-width="2"/>
<text x="473" y="202" class="node">9</text>
<text x="550" y="110" class="code">根节点: 5</text>
<text x="550" y="130" class="code">左子树 < 5</text>
<text x="550" y="150" class="code">右子树 > 5</text>
<text x="550" y="175" class="code">中序遍历:</text>
<text x="550" y="195" class="code" fill="#388e3c">1→3→5→7→9</text>
<rect x="10" y="230" width="330" height="180" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="250" class="title">核心源码</text>
<text x="20" y="270" class="code" style="fill:#000;">public class TreeSet&lt;E&gt; {</text>
<text x="30" y="285" class="code" style="fill:#1976d2;">  private transient NavigableMap&lt;E,Object&gt; m;</text>
<text x="30" y="300" class="code" style="fill:#f57c00;">  private static final Object PRESENT = new Object();</text>
<text x="30" y="320" class="code" style="fill:#000;">  public boolean add(E e) {</text>
<text x="40" y="335" class="code" style="fill:#388e3c;">    return m.put(e, PRESENT) == null;</text>
<text x="30" y="350" class="code" style="fill:#000;">  }</text>
<text x="30" y="370" class="code" style="fill:#000;">  // 构造器可传入 Comparator</text>
<text x="30" y="385" class="code" style="fill:#000;">  public TreeSet(Comparator&lt;? super E&gt; c) {</text>
<text x="40" y="400" class="code" style="fill:#1976d2;">    this.m = new TreeMap&lt;&gt;(c);</text>
<text x="30" y="410" class="code" style="fill:#000;">  }</text>
<rect x="350" y="230" width="340" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="5"/>
<text x="360" y="250" class="title">特点</text>
<text x="360" y="270" class="code" fill="#388e3c">✓ 自动排序 (升序)</text>
<text x="360" y="290" class="code" fill="#388e3c">✓ 去重依赖 compareTo/Comparator</text>
<text x="360" y="310" class="code" fill="#388e3c">✓ 时间复杂度 O(log n)</text>
<text x="360" y="330" class="code" fill="#388e3c">✓ 支持范围查询 (subSet/headSet/tailSet)</text>
<text x="360" y="355" class="code" fill="#d32f2f">✗ 不允许 null</text>
<text x="360" y="375" class="code" fill="#d32f2f">✗ 比 HashSet 慢</text>
<text x="360" y="395" class="code" fill="#666">适用: 需要有序集合、范围查询</text>
</svg>

**两种排序方式：**

1. **自然排序（元素实现 Comparable）**
```java
TreeSet<Integer> set = new TreeSet<>();
set.add(5); set.add(1); set.add(9);
// 输出: [1, 5, 9]
```

2. **自定义排序（传入 Comparator）**
```java
TreeSet<String> set = new TreeSet<>((a, b) -> b.compareTo(a)); // 降序
set.add("C"); set.add("A"); set.add("B");
// 输出: [C, B, A]
```

**记忆要点：**
- **底层红黑树** —— TreeMap 实现，保证有序
- **自动排序** —— 升序排列，O(log n) 复杂度
- **不允许 null** —— 无法比较大小

### 9. 如何保证 Set 中元素不重复？

**不同 Set 实现的去重机制：**

**1. HashSet 去重：**
- 依赖 `hashCode()` 和 `equals()` 方法
- 流程：
  1. 计算元素的 hashCode()
  2. 定位到数组位置
  3. 若位置为空，直接插入
  4. 若位置有元素，调用 equals() 比较
  5. equals() 返回 true 则不插入

**2. TreeSet 去重：**
- 依赖 `Comparator` 或 `Comparable` 的比较方法
- 流程：通过 compare/compareTo 返回 0 判断重复

**3. LinkedHashSet 去重：**
- 与 HashSet 相同（底层是 LinkedHashMap）

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}.step{font:12px sans-serif;}</style></defs>
<text x="250" y="25" class="title">Set 去重机制对比</text>
<rect x="10" y="45" width="330" height="190" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="100" y="70" class="title" fill="#1976d2">HashSet / LinkedHashSet</text>
<rect x="20" y="85" width="300" height="30" fill="#fff" stroke="#1976d2" stroke-width="1"/>
<text x="30" y="105" class="step">1. 计算 hashCode()</text>
<line x1="170" y1="115" x2="170" y2="125" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="20" y="125" width="300" height="30" fill="#fff" stroke="#1976d2" stroke-width="1"/>
<text x="30" y="145" class="step">2. 定位数组位置</text>
<line x1="170" y1="155" x2="170" y2="165" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="20" y="165" width="300" height="30" fill="#fff" stroke="#1976d2" stroke-width="1"/>
<text x="30" y="185" class="step">3. 若有冲突,调用 equals()</text>
<line x1="170" y1="195" x2="170" y2="205" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="20" y="205" width="145" height="25" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="30" y="222" class="code" fill="#000">equals()=false</text>
<text x="50" y="237" class="code" fill="#388e3c">→ 插入</text>
<rect x="175" y="205" width="145" height="25" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="185" y="222" class="code" fill="#000">equals()=true</text>
<text x="200" y="237" class="code" fill="#d32f2f">→ 不插入</text>
<rect x="360" y="45" width="330" height="190" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="470" y="70" class="title" fill="#f57c00">TreeSet</text>
<rect x="370" y="85" width="310" height="30" fill="#fff" stroke="#f57c00" stroke-width="1"/>
<text x="380" y="105" class="step">1. 调用 compareTo() / compare()</text>
<line x1="525" y1="115" x2="525" y2="125" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange)"/>
<rect x="370" y="125" width="310" height="30" fill="#fff" stroke="#f57c00" stroke-width="1"/>
<text x="380" y="145" class="step">2. 比较结果</text>
<line x1="525" y1="155" x2="525" y2="165" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange)"/>
<rect x="370" y="165" width="150" height="25" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="380" y="182" class="code" fill="#000">返回 != 0</text>
<text x="395" y="197" class="code" fill="#388e3c">→ 插入</text>
<rect x="530" y="165" width="150" height="25" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="540" y="182" class="code" fill="#000">返回 == 0</text>
<text x="550" y="197" class="code" fill="#d32f2f">→ 不插入</text>
<text x="380" y="220" class="code" fill="#666">注意: 不依赖 equals()</text>
<rect x="10" y="250" width="680" height="190" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="270" class="title">重写规则 (重要!)</text>
<text x="20" y="295" class="code" fill="#d32f2f">1. 使用 HashSet 必须重写 hashCode() 和 equals()</text>
<text x="30" y="315" class="code">• equals() 相同 → hashCode() 必须相同</text>
<text x="30" y="330" class="code">• hashCode() 相同 ✗ equals() 不一定相同 (哈希冲突)</text>
<text x="20" y="355" class="code" fill="#d32f2f">2. 使用 TreeSet 必须实现 Comparable 或提供 Comparator</text>
<text x="30" y="375" class="code">• compareTo/compare 返回 0 表示重复</text>
<text x="30" y="390" class="code">• 不调用 equals() 方法</text>
<text x="20" y="415" class="code" fill="#388e3c">最佳实践: equals() 和 compareTo() 保持一致</text>
<text x="30" y="430" class="code">例如: a.equals(b) == true 时, a.compareTo(b) 应该返回 0</text>
<defs>
<marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
<marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
</defs>
</svg>

**记忆要点：**
- **HashSet 双检查** —— hashCode() + equals()
- **TreeSet 比较法** —— compare/compareTo 返回 0 即重复
- **重写要成对** —— equals() 和 hashCode() 必须一起重写
