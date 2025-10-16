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
