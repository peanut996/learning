# Java 集合面试题

## List

### 1. ArrayList 和 LinkedList 的区别？

**底层数据结构：**
- **ArrayList**：动态数组，元素在内存中连续存储
- **LinkedList**：双向链表，每个节点存储数据和前后指针

**访问性能：**
- **ArrayList**：随机访问快 O(1)，通过索引直接定位
- **LinkedList**：随机访问慢 O(n)，需要从头或尾遍历

**插入/删除性能：**
- **ArrayList**：
  - 尾部操作：O(1)（不扩容时）
  - 中间/头部：O(n)（需要移动后续元素）
- **LinkedList**：
  - 头尾操作：O(1)
  - 中间操作：O(n)（需要先定位再修改指针）

**内存占用：**
- **ArrayList**：只存储元素，空间连续，缓存友好
- **LinkedList**：每个节点额外存储两个指针，内存开销更大

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;}.label{font:14px sans-serif;}.code{font:12px monospace;fill:#666;}</style></defs>
<text x="100" y="25" class="title">ArrayList (数组)</text>
<rect x="50" y="40" width="60" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<rect x="110" y="40" width="60" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<rect x="170" y="40" width="60" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<rect x="230" y="40" width="60" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="80" y="65" class="label">A</text>
<text x="140" y="65" class="label">B</text>
<text x="200" y="65" class="label">C</text>
<text x="260" y="65" class="label">D</text>
<text x="70" y="100" class="code">[0]</text>
<text x="130" y="100" class="code">[1]</text>
<text x="190" y="100" class="code">[2]</text>
<text x="250" y="100" class="code">[3]</text>
<text x="50" y="130" class="code">随机访问: O(1)</text>
<text x="50" y="150" class="code">中间插入: O(n)</text>
<text x="420" y="25" class="title">LinkedList (双向链表)</text>
<rect x="380" y="50" width="50" height="30" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="400" y="70" class="label">A</text>
<line x1="430" y1="65" x2="460" y2="65" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="460" y="50" width="50" height="30" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="480" y="70" class="label">B</text>
<line x1="510" y1="65" x2="540" y2="65" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="540" y="50" width="50" height="30" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="560" y="70" class="label">C</text>
<line x1="590" y1="65" x2="620" y2="65" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="620" y="50" width="50" height="30" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="640" y="70" class="label">D</text>
<line x1="460" y1="75" x2="430" y2="75" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="540" y1="75" x2="510" y2="75" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="620" y1="75" x2="590" y2="75" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow)"/>
<text x="380" y="110" class="code">随机访问: O(n)</text>
<text x="380" y="130" class="code">头尾插入: O(1)</text>
<rect x="50" y="180" width="600" height="100" fill="#f5f5f5" stroke="#999" stroke-width="1" rx="5"/>
<text x="60" y="200" class="title">选择建议</text>
<text x="60" y="225" class="code">✓ ArrayList: 频繁随机访问、遍历、尾部添加</text>
<text x="60" y="245" class="code">✓ LinkedList: 频繁头部插入/删除、队列场景</text>
<text x="60" y="265" class="code">✗ LinkedList: 几乎不适合随机访问场景</text>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker></defs>
</svg>

**使用场景：**
- **ArrayList**：适合查询多、修改少的场景
- **LinkedList**：适合频繁插入删除、实现队列/栈

### 2. ArrayList 的扩容机制是什么？

**初始容量：**
- 无参构造：初始容量为 0，首次添加元素时扩容为 10
- 有参构造：可指定初始容量

**扩容触发：**
- 当 `size == capacity` 时触发扩容

**扩容大小：**
- 新容量 = 旧容量 × 1.5（右移1位：`oldCapacity + (oldCapacity >> 1)`）
- 如果新容量仍不够，直接使用所需的最小容量

**扩容步骤：**
1. 计算新容量（1.5倍）
2. 创建新数组
3. 使用 `Arrays.copyOf()` 复制元素
4. 替换原数组引用

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:13px sans-serif;}.code{font:11px monospace;fill:#444;}.step{font:12px sans-serif;fill:#1976d2;font-weight:bold;}</style></defs>
<text x="10" y="20" class="title">ArrayList 扩容流程</text>
<rect x="10" y="35" width="680" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="55" class="step">初始状态 (capacity=4, size=4)</text>
<rect x="20" y="65" width="40" height="25" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="60" y="65" width="40" height="25" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="100" y="65" width="40" height="25" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="140" y="65" width="40" height="25" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<text x="35" y="82" class="label">1</text>
<text x="75" y="82" class="label">2</text>
<text x="115" y="82" class="label">3</text>
<text x="155" y="82" class="label">4</text>
<text x="190" y="82" class="code">← 数组已满</text>
<rect x="10" y="110" width="680" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="20" y="130" class="step">步骤1: 计算新容量</text>
<text x="20" y="150" class="code">oldCapacity = 4</text>
<text x="20" y="170" class="code">newCapacity = oldCapacity + (oldCapacity >> 1) = 4 + 2 = 6</text>
<rect x="10" y="205" width="680" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="20" y="225" class="step">步骤2: 创建新数组并复制</text>
<rect x="20" y="235" width="40" height="25" fill="#fff" stroke="#388e3c" stroke-width="1.5"/>
<rect x="60" y="235" width="40" height="25" fill="#fff" stroke="#388e3c" stroke-width="1.5"/>
<rect x="100" y="235" width="40" height="25" fill="#fff" stroke="#388e3c" stroke-width="1.5"/>
<rect x="140" y="235" width="40" height="25" fill="#fff" stroke="#388e3c" stroke-width="1.5"/>
<rect x="180" y="235" width="40" height="25" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5" stroke-dasharray="3,3"/>
<rect x="220" y="235" width="40" height="25" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5" stroke-dasharray="3,3"/>
<text x="35" y="252" class="label">1</text>
<text x="75" y="252" class="label">2</text>
<text x="115" y="252" class="label">3</text>
<text x="155" y="252" class="label">4</text>
<text x="270" y="252" class="code">← 新容量=6</text>
<rect x="10" y="280" width="680" height="100" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="300" class="title">关键源码 (JDK 8)</text>
<text x="20" y="320" class="code" style="fill:#000;">private void grow(int minCapacity) {</text>
<text x="30" y="335" class="code" style="fill:#000;">  int oldCapacity = elementData.length;</text>
<text x="30" y="350" class="code" style="fill:#d32f2f;">  int newCapacity = oldCapacity + (oldCapacity >> 1); // 1.5倍</text>
<text x="30" y="365" class="code" style="fill:#000;">  elementData = Arrays.copyOf(elementData, newCapacity);</text>
<text x="20" y="380" class="code" style="fill:#000;">}</text>
</svg>

**性能考虑：**
- 扩容需要复制数组，时间复杂度 O(n)
- 建议：已知容量时使用 `ArrayList(int initialCapacity)` 避免多次扩容
- 可使用 `ensureCapacity()` 手动扩容

**记忆要点：**
- **1.5倍扩容** —— 通过右移1位实现
- **首次添加变10** —— 无参构造首次扩容至10
- **复制迁移** —— 使用 Arrays.copyOf()

### 3. ArrayList 如何实现线程安全？

**三种常用方式：**

**1. Collections.synchronizedList()**
```java
List<String> list = Collections.synchronizedList(new ArrayList<>());
```
- 原理：使用 synchronized 关键字包装每个方法
- 缺点：性能较差，所有操作都需要获取锁

**2. CopyOnWriteArrayList**
```java
List<String> list = new CopyOnWriteArrayList<>();
```
- 原理：写时复制，读操作无锁
- 优点：读性能高，适合读多写少场景
- 缺点：写操作开销大，内存占用高

**3. 使用 Lock 手动加锁**
```java
List<String> list = new ArrayList<>();
ReentrantLock lock = new ReentrantLock();

lock.lock();
try {
    list.add("item");
} finally {
    lock.unlock();
}
```
- 优点：灵活控制锁粒度
- 缺点：代码复杂，容易出错

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}.perf{font:11px sans-serif;}</style></defs>
<text x="10" y="20" class="title">三种线程安全方式对比</text>
<rect x="10" y="35" width="220" height="130" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="55" class="title" fill="#1976d2">Collections.synchronizedList</text>
<text x="20" y="75" class="code">synchronized (mutex) {</text>
<text x="30" y="90" class="code">  return list.add(e);</text>
<text x="20" y="105" class="code">}</text>
<text x="20" y="125" class="perf" fill="#f57c00">性能: ★☆☆</text>
<text x="20" y="140" class="perf" fill="#388e3c">读多写少: ✗</text>
<text x="20" y="155" class="perf" fill="#1976d2">适用: 并发低</text>
<rect x="240" y="35" width="220" height="130" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="250" y="55" class="title" fill="#f57c00">CopyOnWriteArrayList</text>
<text x="250" y="75" class="code">写: 复制新数组</text>
<text x="250" y="90" class="code">读: 无锁直接访问</text>
<text x="250" y="105" class="code">适合读>>写场景</text>
<text x="250" y="125" class="perf" fill="#388e3c">性能: ★★★ (读)</text>
<text x="250" y="140" class="perf" fill="#388e3c">读多写少: ✓</text>
<text x="250" y="155" class="perf" fill="#1976d2">适用: 监听器列表</text>
<rect x="470" y="35" width="220" height="130" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="480" y="55" class="title" fill="#388e3c">ReentrantLock</text>
<text x="480" y="75" class="code">lock.lock();</text>
<text x="480" y="90" class="code">try {</text>
<text x="490" y="105" class="code">  list.add(e);</text>
<text x="480" y="120" class="code">} finally { lock.unlock(); }</text>
<text x="480" y="140" class="perf" fill="#f57c00">性能: ★★☆</text>
<text x="480" y="155" class="perf" fill="#1976d2">适用: 需要灵活控制</text>
<rect x="10" y="180" width="680" height="130" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="200" class="title">选择建议</text>
<text x="20" y="220" class="code">1. 读多写少 → CopyOnWriteArrayList (事件监听、配置列表)</text>
<text x="20" y="240" class="code">2. 并发低、简单场景 → Collections.synchronizedList</text>
<text x="20" y="260" class="code">3. 需要批量操作 → 手动加锁 (ReentrantLock)</text>
<text x="20" y="280" class="code">4. 高并发写 → 考虑使用 ConcurrentLinkedQueue 等并发容器</text>
<text x="20" y="300" class="code" fill="#d32f2f">⚠️  避免: 不要在遍历时修改集合 (可能抛 ConcurrentModificationException)</text>
</svg>

**记忆要点：**
- **synchronized包装** —— 简单但性能差
- **写时复制** —— 读快写慢，适合读多写少
- **手动加锁** —— 灵活但易错

### 4. CopyOnWriteArrayList 的实现原理？

**核心思想：写时复制（Copy-On-Write）**

**读操作：**
- 不加锁，直接读取原数组
- 多个线程可以同时读取
- 性能极高，适合读多写少场景

**写操作：**
1. 获取 ReentrantLock 独占锁
2. 复制原数组到新数组
3. 在新数组上执行修改操作
4. 将数组引用指向新数组
5. 释放锁

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}.step{font:12px sans-serif;fill:#1976d2;font-weight:bold;}</style></defs>
<text x="10" y="20" class="title">CopyOnWriteArrayList 写操作流程</text>
<rect x="10" y="35" width="680" height="70" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="55" class="step">步骤1: 原数组 (读线程仍可访问)</text>
<rect x="20" y="65" width="40" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="65" y="65" width="40" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<rect x="110" y="65" width="40" height="30" fill="#fff" stroke="#1976d2" stroke-width="1.5"/>
<text x="35" y="85" class="label">A</text>
<text x="80" y="85" class="label">B</text>
<text x="125" y="85" class="label">C</text>
<text x="160" y="85" class="code">← 原数组,读线程无锁访问</text>
<rect x="10" y="120" width="680" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="20" y="140" class="step">步骤2: 获取锁,复制数组</text>
<rect x="20" y="150" width="40" height="30" fill="#ffe0b2" stroke="#f57c00" stroke-width="1.5"/>
<rect x="65" y="150" width="40" height="30" fill="#ffe0b2" stroke="#f57c00" stroke-width="1.5"/>
<rect x="110" y="150" width="40" height="30" fill="#ffe0b2" stroke="#f57c00" stroke-width="1.5"/>
<rect x="155" y="150" width="40" height="30" fill="#ffccbc" stroke="#f57c00" stroke-width="1.5" stroke-dasharray="3,3"/>
<text x="35" y="170" class="label">A</text>
<text x="80" y="170" class="label">B</text>
<text x="125" y="170" class="label">C</text>
<text x="170" y="170" class="label">?</text>
<text x="205" y="170" class="code">← 新数组,容量+1</text>
<rect x="10" y="205" width="680" height="70" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="20" y="225" class="step">步骤3: 修改新数组,更新引用</text>
<rect x="20" y="235" width="40" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<rect x="65" y="235" width="40" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<rect x="110" y="235" width="40" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<rect x="155" y="235" width="40" height="30" fill="#a5d6a7" stroke="#388e3c" stroke-width="2"/>
<text x="35" y="255" class="label">A</text>
<text x="80" y="255" class="label">B</text>
<text x="125" y="255" class="label">C</text>
<text x="170" y="255" class="label">D</text>
<text x="205" y="255" class="code">← array引用指向新数组</text>
<rect x="10" y="290" width="330" height="150" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="310" class="title">核心源码</text>
<text x="20" y="330" class="code" style="fill:#000;">public boolean add(E e) {</text>
<text x="30" y="345" class="code" style="fill:#1976d2;">  final ReentrantLock lock = this.lock;</text>
<text x="30" y="360" class="code" style="fill:#1976d2;">  lock.lock(); // 获取锁</text>
<text x="30" y="375" class="code" style="fill:#000;">  try {</text>
<text x="40" y="390" class="code" style="fill:#f57c00;">    Object[] newElements = Arrays.copyOf(elements, len+1);</text>
<text x="40" y="405" class="code" style="fill:#388e3c;">    newElements[len] = e;</text>
<text x="40" y="420" class="code" style="fill:#d32f2f;">    setArray(newElements); // 更新引用</text>
<text x="30" y="435" class="code" style="fill:#000;">  } finally { lock.unlock(); }</text>
<rect x="350" y="290" width="340" height="150" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="5"/>
<text x="360" y="310" class="title">优缺点</text>
<text x="360" y="330" class="code" fill="#388e3c">✓ 读操作无锁,性能极高</text>
<text x="360" y="350" class="code" fill="#388e3c">✓ 线程安全,无需额外同步</text>
<text x="360" y="370" class="code" fill="#388e3c">✓ 适合读多写少场景</text>
<text x="360" y="395" class="code" fill="#d32f2f">✗ 写操作开销大(复制数组)</text>
<text x="360" y="415" class="code" fill="#d32f2f">✗ 内存占用高(两份数组)</text>
<text x="360" y="435" class="code" fill="#d32f2f">✗ 不保证实时一致性</text>
</svg>

**适用场景：**
- 事件监听器列表
- 配置信息列表
- 黑白名单
- 缓存数据

**不适用场景：**
- 写操作频繁
- 对数据实时性要求高
- 内存敏感的应用

**记忆要点：**
- **读不加锁** —— 多线程并发读
- **写时复制** —— 修改时创建新数组
- **最终一致** —— 读可能获取旧数据

### 5. Vector 和 ArrayList 的区别？

**线程安全：**
- **Vector**：线程安全，所有方法都用 `synchronized` 修饰
- **ArrayList**：线程不安全，没有同步机制

**扩容机制：**
- **Vector**：默认扩容 2 倍（可通过 capacityIncrement 指定增量）
- **ArrayList**：扩容 1.5 倍

**性能：**
- **Vector**：较慢（因为方法级别的 synchronized 锁）
- **ArrayList**：较快（无锁开销）

**历史：**
- **Vector**：JDK 1.0 引入，遗留类
- **ArrayList**：JDK 1.2 引入，推荐使用

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">Vector vs ArrayList</text>
<rect x="50" y="50" width="280" height="220" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="140" y="75" class="title" fill="#c62828">Vector (遗留类)</text>
<text x="60" y="100" class="code">线程安全: ✓ (synchronized)</text>
<text x="60" y="120" class="code">扩容倍数: 2倍</text>
<text x="60" y="140" class="code">性能: ★☆☆ (锁开销)</text>
<text x="60" y="160" class="code">引入版本: JDK 1.0</text>
<text x="60" y="185" class="code" fill="#c62828">public synchronized boolean add(E e)</text>
<text x="60" y="210" class="code" fill="#666">推荐: 不推荐使用</text>
<text x="60" y="230" class="code" fill="#666">替代: CopyOnWriteArrayList</text>
<text x="60" y="250" class="code" fill="#666">      Collections.synchronizedList</text>
<rect x="370" y="50" width="280" height="220" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="435" y="75" class="title" fill="#2e7d32">ArrayList (推荐)</text>
<text x="380" y="100" class="code">线程安全: ✗ (非同步)</text>
<text x="380" y="120" class="code">扩容倍数: 1.5倍</text>
<text x="380" y="140" class="code">性能: ★★★ (无锁)</text>
<text x="380" y="160" class="code">引入版本: JDK 1.2</text>
<text x="380" y="185" class="code" fill="#2e7d32">public boolean add(E e)</text>
<text x="380" y="210" class="code" fill="#2e7d32">推荐: 优先使用</text>
<text x="380" y="230" class="code" fill="#666">单线程: 直接使用</text>
<text x="380" y="250" class="code" fill="#666">多线程: 需额外同步</text>
</svg>

**使用建议：**
- **单线程场景**：使用 ArrayList
- **多线程场景**：
  - 读多写少：CopyOnWriteArrayList
  - 一般并发：Collections.synchronizedList(new ArrayList<>())
  - 避免使用 Vector（已过时）

**记忆要点：**
- **Vector 过时** —— 方法级 synchronized，性能差
- **ArrayList 主流** —— 1.5倍扩容，性能好
- **Vector 2倍扩** —— ArrayList 1.5倍扩

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

## Queue

### 21. Queue 和 Deque 的区别？

**Queue（队列）：**
- 单向队列，FIFO（先进先出）
- 只能从队尾添加，队头删除
- 主要方法：`offer()`, `poll()`, `peek()`

**Deque（双端队列）：**
- 双向队列，两端都可操作
- 可作为队列（FIFO）或栈（LIFO）使用
- 主要方法：`offerFirst/Last()`, `pollFirst/Last()`, `peekFirst/Last()`

**关系：**
- Deque 继承 Queue
- Deque 功能更强大，可替代 Queue 和 Stack

**常用实现类：**
- **Queue**：LinkedList, ArrayDeque, PriorityQueue
- **Deque**：ArrayDeque, LinkedList

**记忆要点：**
- **Queue 单向** —— FIFO，一端进一端出
- **Deque 双向** —— 两端都可进出，可当栈用
- **ArrayDeque 推荐** —— 比 LinkedList 快，比 Stack 好

### 22. ArrayDeque 和 LinkedList 的区别？

| 特性 | ArrayDeque | LinkedList |
|------|-----------|------------|
| **底层结构** | 循环数组 | 双向链表 |
| **随机访问** | 不支持（没有 get(index)） | 支持但慢 O(n) |
| **头尾操作** | O(1) | O(1) |
| **内存占用** | 连续内存，缓存友好 | 额外存储指针 |
| **扩容** | 需要复制数组 | 不需要 |
| **性能** | 更快 | 较慢 |
| **null 元素** | 不允许 | 允许 |

**ArrayDeque 优势：**
- 基于数组，缓存局部性好
- 无需额外指针，内存效率高
- 作为栈和队列性能都更好

**选择建议：**
- **ArrayDeque**：实现栈/队列的首选
- **LinkedList**：需要在中间插入删除时使用

**记忆要点：**
- **ArrayDeque 更快** —— 循环数组，缓存友好
- **不允许 null** —— ArrayDeque 的限制
- **替代 Stack** —— ArrayDeque 性能更好

### 23. PriorityQueue 的实现原理？

**核心原理：**
PriorityQueue 基于 **二叉堆**（完全二叉树）实现，默认**小顶堆**（最小元素在堆顶）。

**底层结构：**
- 使用**数组**存储堆
- 逻辑上是完全二叉树
- 父节点索引 = `(i-1)/2`，左子节点 = `2*i+1`，右子节点 = `2*i+2`

**关键特性：**
- **优先级排序**：每次取出最小（或最大）元素
- **不允许 null**：无法比较
- **非线程安全**
- **时间复杂度**：插入 O(log n)，取出 O(log n)，查看堆顶 O(1)

**排序方式：**
1. **自然排序**：元素实现 Comparable
2. **自定义排序**：传入 Comparator（如实现大顶堆）

**常用方法：**
- `offer(e)`：插入元素
- `poll()`：取出并删除堆顶元素
- `peek()`：查看堆顶元素（不删除）

**应用场景：**
- Top K 问题
- 任务调度（优先级队列）
- Dijkstra 算法

**记忆要点：**
- **二叉堆实现** —— 数组存储，O(log n) 操作
- **默认小顶堆** —— 最小元素优先出队
- **Top K 问题** —— 经典应用

### 24. BlockingQueue 有哪些实现类？

**主要实现类：**

**1. ArrayBlockingQueue**
- 底层：**有界数组**
- 锁：一把 ReentrantLock
- 特点：FIFO，容量固定

**2. LinkedBlockingQueue**
- 底层：**有界链表**（默认 Integer.MAX_VALUE）
- 锁：两把锁（takeLock, putLock）
- 特点：FIFO，吞吐量高

**3. PriorityBlockingQueue**
- 底层：**无界二叉堆**
- 特点：优先级排序，支持扩容

**4. DelayQueue**
- 底层：PriorityQueue + 延迟获取
- 特点：元素到期后才能取出

**5. SynchronousQueue**
- 底层：无存储空间
- 特点：直接传递，生产者必须等待消费者

**6. LinkedTransferQueue**
- 底层：链表
- 特点：transfer() 方法，更高效

**记忆要点：**
- **ArrayBlockingQueue** —— 有界数组，一把锁
- **LinkedBlockingQueue** —— 有界链表，两把锁，吞吐量高
- **生产者-消费者** —— BlockingQueue 典型应用

### 25. ArrayBlockingQueue 和 LinkedBlockingQueue 的区别？

| 特性 | ArrayBlockingQueue | LinkedBlockingQueue |
|------|-------------------|---------------------|
| **底层结构** | 数组 | 链表 |
| **容量** | 必须指定，有界 | 可选（默认 Integer.MAX_VALUE） |
| **锁** | 一把 ReentrantLock | 两把锁（takeLock, putLock） |
| **并发度** | 读写互斥 | 读写可并发 |
| **内存占用** | 固定，预分配 | 动态分配，节点对象 |
| **性能** | 写入快（无对象创建） | 吞吐量高（读写分离） |

**ArrayBlockingQueue：**
- 适合：已知容量上限，内存敏感
- 缺点：读写互斥，并发度低

**LinkedBlockingQueue：**
- 适合：高吞吐量场景
- 优点：读写分离，并发度高
- 缺点：每个元素需额外节点对象

**选择建议：**
- **高吞吐量** → LinkedBlockingQueue
- **固定容量、低内存** → ArrayBlockingQueue
- **线程池** → LinkedBlockingQueue（Executors 默认使用）

**记忆要点：**
- **Array 一把锁** —— 读写互斥
- **Linked 两把锁** —— 读写分离，吞吐量高
- **线程池默认** —— LinkedBlockingQueue

## 其他问题

### 26. 什么是快速失败（fail-fast）？

**定义：**
快速失败（fail-fast）是一种错误检测机制，当检测到集合在迭代过程中被修改时，立即抛出 `ConcurrentModificationException`。

**实现原理：**
- 集合维护一个 `modCount`（修改计数器）
- 每次结构性修改（add/remove）时 `modCount++`
- 迭代器创建时记录 `expectedModCount = modCount`
- 每次迭代检查：`if (modCount != expectedModCount) throw ConcurrentModificationException`

**触发场景：**
```java
List<String> list = new ArrayList<>();
for (String s : list) {
    list.remove(s); // 抛出 ConcurrentModificationException
}
```

**解决方案：**
1. 使用迭代器的 remove() 方法
2. 使用并发集合（如 CopyOnWriteArrayList）
3. 使用传统 for 循环（从后往前删除）

**记忆要点：**
- **modCount 检测** —— 修改计数器不一致抛异常
- **遍历时不可修改** —— 使用迭代器的 remove()
- **非线程安全** —— 单线程也会触发（遍历时修改）

### 27. 什么是安全失败（fail-safe）？

**定义：**
安全失败（fail-safe）是在迭代时操作集合的副本，不会抛出 `ConcurrentModificationException`。

**实现原理：**
- 迭代时使用集合的快照/副本
- 修改不影响正在进行的迭代
- 不检查 modCount

**典型实现：**
- `CopyOnWriteArrayList`
- `CopyOnWriteArraySet`
- `ConcurrentHashMap`

**特点：**
- **线程安全**：允许并发修改
- **弱一致性**：迭代器看到的可能不是最新数据
- **内存开销**：需要复制数据（CopyOnWrite）

**fail-fast vs fail-safe：**

| 特性 | fail-fast | fail-safe |
|------|-----------|-----------|
| **异常** | 抛出 ConcurrentModificationException | 不抛异常 |
| **数据** | 原集合 | 集合副本/快照 |
| **一致性** | 强一致 | 弱一致（最终一致） |
| **性能** | 快 | 慢（复制开销） |
| **代表** | ArrayList, HashMap | CopyOnWriteArrayList, ConcurrentHashMap |

**记忆要点：**
- **fail-safe 不抛异常** —— 操作副本，允许并发修改
- **弱一致性** —— 可能读到旧数据
- **CopyOnWrite** —— 典型 fail-safe 实现

### 28. Iterator 和 ListIterator 的区别？

| 特性 | Iterator | ListIterator |
|------|----------|--------------|
| **适用范围** | 所有 Collection | 仅 List |
| **遍历方向** | 单向（向后） | 双向（向前/向后） |
| **方法** | hasNext(), next(), remove() | 继承 Iterator，增加 hasPrevious(), previous(), add(), set() |
| **添加元素** | 不支持 | 支持 add() |
| **修改元素** | 不支持 | 支持 set() |
| **索引** | 无 | nextIndex(), previousIndex() |

**Iterator 示例：**
```java
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    it.remove(); // 只能删除
}
```

**ListIterator 示例：**
```java
ListIterator<String> lit = list.listIterator();
while (lit.hasNext()) {
    String s = lit.next();
    lit.set("new"); // 可以修改
    lit.add("add"); // 可以添加
}
while (lit.hasPrevious()) { // 可以反向遍历
    lit.previous();
}
```

**记忆要点：**
- **Iterator 通用单向** —— 所有集合，只能向后
- **ListIterator 双向增强** —— 仅 List，支持双向+增删改
- **List 专用** —— ListIterator 功能更强大

### 29. Comparable 和 Comparator 的区别？

| 特性 | Comparable | Comparator |
|------|------------|------------|
| **位置** | 内部排序（修改类） | 外部排序（不修改类） |
| **方法** | `int compareTo(T o)` | `int compare(T o1, T o2)` |
| **包** | java.lang | java.util |
| **使用** | 类实现接口 | 创建比较器对象 |
| **灵活性** | 固定一种排序 | 可定义多种排序 |

**Comparable 示例（自然排序）：**
```java
class Student implements Comparable<Student> {
    int age;
    @Override
    public int compareTo(Student o) {
        return this.age - o.age; // 按年龄升序
    }
}
Collections.sort(list); // 使用 compareTo
```

**Comparator 示例（自定义排序）：**
```java
// 按姓名排序
Comparator<Student> nameComparator = (s1, s2) -> s1.name.compareTo(s2.name);
Collections.sort(list, nameComparator);

// 按年龄降序
Comparator<Student> ageComparator = (s1, s2) -> s2.age - s1.age;
Collections.sort(list, ageComparator);
```

**使用场景：**
- **Comparable**：类有明确的默认排序规则（如学号、ID）
- **Comparator**：需要多种排序方式，或无法修改类代码

**记忆要点：**
- **Comparable 内部一种** —— compareTo，修改类，固定排序
- **Comparator 外部多种** —— compare，灵活排序
- **策略模式** —— Comparator 是策略模式的应用

### 30. 如何实现集合的线程安全？

**主要方法：**

**1. 使用并发集合（推荐）**
- **CopyOnWriteArrayList**：读多写少的 List
- **CopyOnWriteArraySet**：读多写少的 Set
- **ConcurrentHashMap**：高并发 Map
- **ConcurrentSkipListMap**：有序 Map
- **BlockingQueue 系列**：生产者-消费者

**2. Collections 同步包装**
```java
List<String> list = Collections.synchronizedList(new ArrayList<>());
Set<String> set = Collections.synchronizedSet(new HashSet<>());
Map<String, String> map = Collections.synchronizedMap(new HashMap<>());
```
- 优点：简单方便
- 缺点：性能差（方法级锁），遍历时需手动同步

**3. 手动加锁**
```java
List<String> list = new ArrayList<>();
ReentrantLock lock = new ReentrantLock();

lock.lock();
try {
    list.add("item");
} finally {
    lock.unlock();
}
```

**性能对比：**
1. **并发集合**：最快（细粒度锁、无锁读）
2. **手动加锁**：中等（可控制粒度）
3. **synchronized 包装**：最慢（粗粒度锁）

**选择建议：**
- **List**：
  - 读多写少 → CopyOnWriteArrayList
  - 一般并发 → Collections.synchronizedList
- **Map**：
  - 高并发 → ConcurrentHashMap
  - 一般并发 → Collections.synchronizedMap
- **Queue**：
  - 生产者-消费者 → BlockingQueue 系列

**记忆要点：**
- **优先并发集合** —— ConcurrentHashMap, CopyOnWriteArrayList
- **避免 synchronized 包装** —— 性能差
- **遍历需同步** —— synchronizedXxx 遍历时需额外加锁
