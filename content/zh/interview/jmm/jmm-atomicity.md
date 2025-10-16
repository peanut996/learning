## 原子性

### 9. 什么是原子性？

**核心答案**：原子性是指一个操作不可分割，要么全部执行成功，要么全部不执行。

**详细说明**：

**原子性的定义**：
- 操作在执行过程中**不会被中断**
- 对其他线程来说，要么看到**完成前状态**，要么看到**完成后状态**
- **没有中间状态**

**Java 中的原子操作**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">原子性操作分类</text>
<rect x="50" y="60" width="340" height="150" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="220" y="90" text-anchor="middle" font-size="13" font-weight="bold">✓ 原子操作</text>
<text x="70" y="120" font-size="11">• 基本类型读写（除 long/double）</text>
<text x="70" y="140" font-size="11">• 引用类型读写</text>
<text x="70" y="160" font-size="11">• volatile 变量读写</text>
<text x="70" y="180" font-size="11">• AtomicXxx 类的操作</text>
<text x="70" y="195" font-size="10" fill="#388e3c" font-weight="bold">这些操作不会被线程调度打断</text>
<rect x="410" y="60" width="340" height="150" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="580" y="90" text-anchor="middle" font-size="13" font-weight="bold">✗ 非原子操作</text>
<text x="430" y="120" font-size="11">• i++、i--（复合操作）</text>
<text x="430" y="140" font-size="11">• long/double 赋值（32位JVM）</text>
<text x="430" y="160" font-size="11">• 复合操作（check-then-act）</text>
<text x="430" y="180" font-size="11">• 多个变量的联合操作</text>
<text x="430" y="195" font-size="10" fill="#d32f2f" font-weight="bold">这些操作可能被线程调度打断</text>
<text x="50" y="240" font-size="13" font-weight="bold">i++ 为什么不是原子的？</text>
<rect x="50" y="260" width="700" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="70" y="290" font-family="monospace" font-size="11">i++  分解为 3 个步骤：</text>
<text x="90" y="315" font-size="11">1️⃣ <tspan font-family="monospace" fill="#f57c00">读取</tspan> i 的值到寄存器  (load)</text>
<text x="90" y="340" font-size="11">2️⃣ <tspan font-family="monospace" fill="#f57c00">计算</tspan> i + 1           (add)</text>
<text x="90" y="365" font-size="11">3️⃣ <tspan font-family="monospace" fill="#f57c00">写回</tspan> i 的新值        (store)</text>
<text x="420" y="315" font-size="10" fill="#666">← 可能在这里被打断</text>
<text x="420" y="340" font-size="10" fill="#666">← 可能在这里被打断</text>
</svg>

**原子性的重要性**：

```java
// 示例：多线程环境下 i++ 的问题
int i = 0;

// 线程 A 和 B 同时执行 i++
// 期望结果：i = 2
// 实际结果：可能是 1（丢失更新）

// 原因：
// 线程 A：读 i=0 → 计算 0+1 → [被打断]
// 线程 B：读 i=0 → 计算 0+1 → 写 i=1
// 线程 A：[继续] → 写 i=1
// 结果：i=1（丢失了线程 B 的更新）
```

**关键要点**：
- ✓ **定义**：不可分割的操作单元
- ✓ **表现**：要么全成功，要么全不执行
- ✓ **基本类型**：读写是原子的（long/double 除外）
- ⚠ **复合操作**：i++ 不是原子的
- ⚠ **需要保护**：临界区需要同步机制

**记忆口诀**：原子操作不可分，中间状态不可见，复合操作要小心，同步机制来保护

### 10. 如何保证原子性？

**核心答案**：使用 synchronized、Lock、Atomic 类来保证原子性。

**详细说明**：

| 方式 | 原理 | 优点 | 缺点 | 适用场景 |
|-----|------|------|------|---------|
| **synchronized** | 互斥锁 | 简单、可靠 | 性能开销大 | 临界区、复合操作 |
| **Lock (ReentrantLock)** | 显式锁 | 灵活、功能丰富 | 需手动释放 | 复杂同步逻辑 |
| **Atomic 类** | CAS 无锁 | 性能好、无阻塞 | 只支持单变量 | 计数器、标志位 |

**1. synchronized 关键字**：
```java
private int count = 0;
public synchronized void increment() {
    count++; // 保证原子性
}
```

**2. ReentrantLock**：
```java
private int count = 0;
private Lock lock = new ReentrantLock();
public void increment() {
    lock.lock();
    try {
        count++; // 保证原子性
    } finally {
        lock.unlock();
    }
}
```

**3. Atomic 类**：
```java
private AtomicInteger count = new AtomicInteger(0);
public void increment() {
    count.incrementAndGet(); // 原子操作
}
```

**关键要点**：
- ✓ **synchronized**：简单可靠，适合复合操作
- ✓ **Lock**：灵活强大，适合复杂逻辑
- ✓ **Atomic**：性能最好，适合简单计数
- ⚠ **选择合适的方式**：根据场景权衡

**记忆口诀**：synchronized 简单锁，Lock 显式更灵活，Atomic 无锁最快速

### 11. i++ 操作是原子的吗？为什么？

**核心答案**：i++ 不是原子操作，因为它包含读取、计算、写入三个步骤。

**详细说明**：

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">i++ 非原子性分析</text>
<rect x="50" y="60" width="700" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="70" y="90" font-size="13" font-weight="bold">i++ 的三个步骤：</text>
<text x="90" y="115" font-family="monospace" font-size="11">1. temp = i;        // 读取 (load)</text>
<text x="90" y="135" font-family="monospace" font-size="11">2. temp = temp + 1; // 计算 (add)</text>
<text x="90" y="155" font-family="monospace" font-size="11">3. i = temp;        // 写回 (store)</text>
<text x="50" y="190" font-size="13" font-weight="bold">多线程执行时间线：</text>
<rect x="50" y="210" width="700" height="260" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="70" y="235" font-size="12" font-weight="bold">初始值：i = 0</text>
<text x="70" y="265" font-size="11" fill="#388e3c" font-weight="bold">线程 A：</text>
<text x="130" y="265" font-size="10">读取 i=0</text>
<path d="M 210 262 L 280 262" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-a)"/>
<text x="290" y="265" font-size="10">计算 0+1</text>
<path d="M 360 262 L 430 262" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-a)"/>
<text x="440" y="265" font-size="10" fill="#d32f2f">【被打断】</text>
<text x="70" y="295" font-size="11" fill="#f57c00" font-weight="bold">线程 B：</text>
<text x="290" y="295" font-size="10">读取 i=0</text>
<path d="M 360 292 L 430 292" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-b)"/>
<text x="440" y="295" font-size="10">计算 0+1</text>
<path d="M 510 292 L 580 292" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-b)"/>
<text x="590" y="295" font-size="10" fill="#f57c00" font-weight="bold">写入 i=1 ✓</text>
<text x="70" y="325" font-size="11" fill="#388e3c" font-weight="bold">线程 A：</text>
<text x="290" y="325" font-size="10" fill="#388e3c">【继续执行】</text>
<path d="M 380 322 L 450 322" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-a)"/>
<text x="460" y="325" font-size="10" fill="#388e3c" font-weight="bold">写入 i=1 ✓</text>
<rect x="70" y="350" width="660" height="100" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="90" y="380" font-size="12" font-weight="bold" fill="#d32f2f">❌ 问题：</text>
<text x="90" y="405" font-size="11">• 期望结果：i = 2（两个线程各自 +1）</text>
<text x="90" y="425" font-size="11" fill="#d32f2f" font-weight="bold">• 实际结果：i = 1（线程 B 的更新被覆盖）</text>
<text x="90" y="440" font-size="10">• 原因：线程 A 读取时 i=0，写入时覆盖了线程 B 的修改</text>
<defs>
<marker id="arrow-a" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#388e3c"/>
</marker>
<marker id="arrow-b" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/>
</marker>
</defs>
</svg>

**解决方案**：

```java
// 方案 1：synchronized
private int i = 0;
public synchronized void increment() {
    i++;
}

// 方案 2：AtomicInteger（推荐）
private AtomicInteger i = new AtomicInteger(0);
public void increment() {
    i.incrementAndGet();
}

// 方案 3：Lock
private int i = 0;
private Lock lock = new ReentrantLock();
public void increment() {
    lock.lock();
    try {
        i++;
    } finally {
        lock.unlock();
    }
}
```

**关键要点**：
- ✗ **i++ 不是原子的**：包含读、算、写三步
- ✓ **问题**：多线程并发导致更新丢失
- ✓ **解决**：使用同步机制或 Atomic 类
- ⚠ **性能**：AtomicInteger 性能最好

**记忆口诀**：i++ 三步骤，中间会被打断，更新可能丢失，同步机制来解决

### 12. long 和 double 的赋值是原子的吗？

**核心答案**：long 和 double 的赋值在 32 位 JVM 上不是原子的，在 64 位 JVM 上是原子的。

**详细说明**：

**问题原因**：
- long 和 double 是 **64 位**数据类型
- 32 位 JVM 需要**两次 32 位操作**来完成读写
- 第一次操作和第二次操作之间可能被打断

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">long/double 在 32 位 JVM 的非原子性</text>
<rect x="50" y="60" width="340" height="250" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="220" y="90" text-anchor="middle" font-size="13" font-weight="bold">32 位 JVM（非原子）</text>
<text x="70" y="120" font-size="11" font-weight="bold">写入 long = 0x123456789ABCDEF0</text>
<text x="70" y="150" font-size="10">步骤 1：写入高 32 位</text>
<text x="90" y="170" font-family="monospace" font-size="10">0x12345678</text>
<text x="70" y="200" font-size="10" fill="#d32f2f">← 可能在这里被打断！</text>
<text x="70" y="230" font-size="10">步骤 2：写入低 32 位</text>
<text x="90" y="250" font-family="monospace" font-size="10">0x9ABCDEF0</text>
<text x="70" y="285" font-size="10" fill="#d32f2f" font-weight="bold">⚠️ 其他线程可能读到中间状态</text>
<rect x="410" y="60" width="340" height="250" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="580" y="90" text-anchor="middle" font-size="13" font-weight="bold">64 位 JVM（原子）</text>
<text x="430" y="120" font-size="11" font-weight="bold">写入 long = 0x123456789ABCDEF0</text>
<text x="430" y="150" font-size="10">一次性写入 64 位</text>
<text x="450" y="170" font-family="monospace" font-size="10">0x123456789ABCDEF0</text>
<text x="430" y="230" font-size="10" fill="#388e3c" font-weight="bold">✓ 不会被打断</text>
<text x="430" y="250" font-size="10" fill="#388e3c" font-weight="bold">✓ 保证原子性</text>
<text x="430" y="285" font-size="10" fill="#388e3c" font-weight="bold">✓ 线程安全</text>
</svg>

**解决方案**：

```java
// 方案 1：使用 volatile（推荐）
private volatile long value = 0L;
private volatile double price = 0.0;

// 方案 2：使用 synchronized
private long value = 0L;
public synchronized long getValue() {
    return value;
}
public synchronized void setValue(long value) {
    this.value = value;
}

// 方案 3：使用 AtomicLong
private AtomicLong value = new AtomicLong(0L);
```

**对比表**：

| 数据类型 | 32 位 JVM | 64 位 JVM | 解决方案 |
|---------|-----------|-----------|---------|
| **int** | 原子 ✓ | 原子 ✓ | 无需处理 |
| **long** | 非原子 ✗ | 原子 ✓ | volatile/synchronized |
| **float** | 原子 ✓ | 原子 ✓ | 无需处理 |
| **double** | 非原子 ✗ | 原子 ✓ | volatile/synchronized |

**关键要点**：
- ✗ **32 位 JVM**：long/double 不是原子的
- ✓ **64 位 JVM**：long/double 是原子的
- ✓ **volatile 关键字**：保证 long/double 原子性
- ⚠ **向后兼容**：建议总是使用 volatile

**记忆口诀**：long double 六十四位，三十二位分两步，volatile 保原子，六十四位天然好
