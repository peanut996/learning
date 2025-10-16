## synchronized

### 7. synchronized 的实现原理？

**核心机制：**
基于 JVM 的**监视器锁（Monitor）**实现，底层依赖**操作系统的互斥锁（Mutex）**。

**字节码层面：**
- **同步代码块**：`monitorenter` 和 `monitorexit` 指令
- **同步方法**：`ACC_SYNCHRONIZED` 标志

**对象头结构（Mark Word）：**
存储锁状态信息（无锁、偏向锁、轻量级锁、重量级锁）

**Monitor 对象：**
- 每个Java对象都关联一个 Monitor
- Monitor 包含：
  - Owner：持有锁的线程
  - EntryList：等待获取锁的线程队列
  - WaitSet：调用 wait() 的线程队列

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">synchronized 原理</text>
<rect x="10" y="45" width="680" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">Monitor 监视器</text>
<rect x="280" y="80" width="140" height="50" fill="#4caf50" stroke="#1b5e20" stroke-width="2" rx="5"/>
<text x="310" y="110" class="label" fill="#fff">Owner: Thread-1</text>
<text x="300" y="55" class="code" fill="#388e3c">持有锁的线程</text>
<rect x="30" y="160" width="200" height="50" fill="#ff9800" stroke="#e65100" stroke-width="2" rx="5"/>
<text x="60" y="190" class="label" fill="#fff">EntryList (等待队列)</text>
<text x="50" y="145" class="code" fill="#f57c00">Thread-2, Thread-3...</text>
<rect x="470" y="160" width="200" height="50" fill="#9c27b0" stroke="#4a148c" stroke-width="2" rx="5"/>
<text x="510" y="190" class="label" fill="#fff">WaitSet (等待集合)</text>
<text x="490" y="145" class="code" fill="#9c27b0">调用 wait() 的线程</text>
<line x1="230" y1="185" x2="280" y2="105" stroke="#ff9800" stroke-width="2" marker-end="url(#arrow-orange)" stroke-dasharray="5,5"/>
<text x="240" y="145" class="code" fill="#f57c00">竞争锁</text>
<line x1="420" y1="105" x2="470" y2="185" stroke="#9c27b0" stroke-width="2" marker-end="url(#arrow-purple)" stroke-dasharray="5,5"/>
<text x="430" y="145" class="code" fill="#9c27b0">wait()</text>
<line x1="470" y1="175" x2="420" y2="115" stroke="#4caf50" stroke-width="2" marker-end="url(#arrow-green2)" stroke-dasharray="5,5"/>
<text x="430" y="165" class="code" fill="#388e3c">notify()</text>
<rect x="10" y="240" width="330" height="200" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="260" class="title">字节码示例</text>
<text x="20" y="280" class="code" style="fill:#000;">synchronized(obj) {</text>
<text x="30" y="295" class="code" style="fill:#000;">  // 临界区代码</text>
<text x="20" y="310" class="code" style="fill:#000;">}</text>
<text x="20" y="335" class="code" style="fill:#1976d2;">// 字节码:</text>
<text x="20" y="355" class="code" style="fill:#f57c00;">monitorenter // 获取锁</text>
<text x="20" y="370" class="code" style="fill:#000;">  // 临界区指令</text>
<text x="20" y="385" class="code" style="fill:#f57c00;">monitorexit  // 释放锁</text>
<text x="20" y="405" class="code" style="fill:#f57c00;">monitorexit  // 异常时释放</text>
<text x="20" y="425" class="code" style="fill:#666;">(try-finally 保证释放)</text>
<rect x="350" y="240" width="340" height="200" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="5"/>
<text x="360" y="260" class="title">锁升级过程</text>
<text x="360" y="285" class="code">1. 无锁 → 偏向锁</text>
<text x="370" y="300" class="code" fill="#666">线程第一次获取锁</text>
<text x="360" y="320" class="code">2. 偏向锁 → 轻量级锁</text>
<text x="370" y="335" class="code" fill="#666">其他线程竞争</text>
<text x="360" y="355" class="code">3. 轻量级锁 → 重量级锁</text>
<text x="370" y="370" class="code" fill="#666">CAS自旋失败,阻塞线程</text>
<text x="360" y="395" class="code" fill="#d32f2f">特点: 锁只能升级,不能降级</text>
<text x="360" y="415" class="code" fill="#d32f2f">(JDK 15+ 支持锁降级)</text>
<defs>
<marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#ff9800"/></marker>
<marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#9c27b0"/></marker>
<marker id="arrow-green2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#4caf50"/></marker>
</defs>
</svg>

**记忆要点：**
- **Monitor 监视器** —— 每个对象都有，包含 Owner、EntryList、WaitSet
- **字节码指令** —— monitorenter/monitorexit
- **锁升级** —— 无锁→偏向→轻量级→重量级

### 8. synchronized 作用在不同位置的区别？

| 位置 | 锁对象 | 作用范围 | 示例 |
|------|--------|---------|------|
| **实例方法** | this（当前实例） | 整个方法 | `synchronized void method()` |
| **静态方法** | Class对象（类锁） | 整个方法 | `static synchronized void method()` |
| **代码块-实例** | 指定对象 | 代码块 | `synchronized(this)` |
| **代码块-类** | Class对象 | 代码块 | `synchronized(Xxx.class)` |

**重要区别：**

1. **实例锁 vs 类锁**
   - 实例锁：不同实例的锁互不影响
   - 类锁：全局唯一，所有实例共享

2. **粒度控制**
   - 方法级：锁整个方法
   - 代码块：只锁必要部分（推荐）

```java
class Example {
    // 1. 实例方法 - 锁 this
    synchronized void method1() { }

    // 2. 静态方法 - 锁 Example.class
    static synchronized void method2() { }

    // 3. 代码块 - 锁指定对象
    void method3() {
        synchronized(lock) { }
    }
}
```

**记忆要点：**
- **实例方法锁 this** —— 不同对象不互斥
- **静态方法锁 Class** —— 全局唯一
- **代码块更灵活** —— 可指定锁对象，减小粒度

### 9. synchronized 的锁优化机制？（偏向锁、轻量级锁、重量级锁）

**核心思想：**
JDK 6 引入锁优化机制，根据竞争情况动态升级锁，减少重量级锁的性能开销。

**锁的四种状态：**
1. **无锁（Unlocked）**
2. **偏向锁（Biased Lock）**
3. **轻量级锁（Lightweight Lock）**
4. **重量级锁（Heavyweight Lock）**

**状态标识：**
存储在对象头的 Mark Word 中，通过锁标志位区分。

<svg viewBox="0 0 700 550" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">synchronized 锁升级过程</text>
<rect x="10" y="45" width="680" height="240" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">锁升级流程</text>
<rect x="50" y="80" width="140" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="90" y="110" class="label">1. 无锁状态</text>
<text x="60" y="125" class="code" fill="#666">对象刚创建</text>
<line x1="190" y1="105" x2="230" y2="105" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow7)"/>
<text x="195" y="95" class="code" fill="#1976d2">首次访问</text>
<rect x="230" y="80" width="140" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="265" y="110" class="label">2. 偏向锁</text>
<text x="240" y="125" class="code" fill="#666">单线程重入</text>
<line x1="370" y1="105" x2="410" y2="105" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow7)"/>
<text x="375" y="95" class="code" fill="#f57c00">其他线程</text>
<text x="375" y="120" class="code" fill="#f57c00">竞争</text>
<rect x="410" y="80" width="140" height="50" fill="#ffe0b2" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="435" y="110" class="label">3. 轻量级锁</text>
<text x="420" y="125" class="code" fill="#666">CAS自旋</text>
<line x1="550" y1="105" x2="590" y2="105" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow7)"/>
<text x="555" y="95" class="code" fill="#d32f2f">自旋</text>
<text x="555" y="120" class="code" fill="#d32f2f">失败</text>
<rect x="590" y="80" width="90" height="50" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="600" y="105" class="label">4. 重量级</text>
<text x="595" y="120" class="code" fill="#666">阻塞等待</text>
<rect x="30" y="150" width="160" height="125" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="40" y="170" class="title">偏向锁</text>
<text x="40" y="190" class="code">适用: 单线程重入</text>
<text x="40" y="210" class="code">原理: 记录线程ID</text>
<text x="40" y="230" class="code">优点: 几乎无开销</text>
<text x="40" y="250" class="code" fill="#d32f2f">撤销: 有竞争时</text>
<text x="40" y="270" class="code" fill="#666">→ 升级为轻量级锁</text>
<rect x="200" y="150" width="160" height="125" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="210" y="170" class="title">轻量级锁</text>
<text x="210" y="190" class="code">适用: 短时间竞争</text>
<text x="210" y="210" class="code">原理: CAS自旋</text>
<text x="210" y="230" class="code">优点: 避免阻塞</text>
<text x="210" y="250" class="code" fill="#d32f2f">升级: 自旋失败</text>
<text x="210" y="270" class="code" fill="#666">→ 升级为重量级锁</text>
<rect x="370" y="150" width="160" height="125" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="380" y="170" class="title">重量级锁</text>
<text x="380" y="190" class="code">适用: 长时间竞争</text>
<text x="380" y="210" class="code">原理: Monitor锁</text>
<text x="380" y="230" class="code">缺点: 线程阻塞</text>
<text x="380" y="250" class="code" fill="#d32f2f">开销: 用户态→内核态</text>
<text x="380" y="270" class="code" fill="#666">线程挂起/唤醒</text>
<rect x="540" y="150" width="140" height="125" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="5"/>
<text x="550" y="170" class="title" fill="#f57c00">锁降级</text>
<text x="550" y="190" class="code">JDK 15 前:</text>
<text x="550" y="210" class="code" fill="#d32f2f">✗ 只升级不降级</text>
<text x="550" y="235" class="code">JDK 15+ :</text>
<text x="550" y="255" class="code" fill="#388e3c">✓ 支持锁降级</text>
<text x="550" y="270" class="code" fill="#666">GC时降级</text>
<rect x="10" y="300" width="330" height="240" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="320" class="title">各级锁对比</text>
<text x="20" y="345" class="code" fill="#388e3c">偏向锁:</text>
<text x="30" y="365" class="code">• 场景: 单线程多次获取同一锁</text>
<text x="30" y="380" class="code">• 操作: 检查线程ID,无需CAS</text>
<text x="30" y="395" class="code">• 性能: ★★★★★ (最快)</text>
<text x="20" y="420" class="code" fill="#f57c00">轻量级锁:</text>
<text x="30" y="440" class="code">• 场景: 交替执行,竞争少</text>
<text x="30" y="455" class="code">• 操作: CAS自旋(默认10次)</text>
<text x="30" y="470" class="code">• 性能: ★★★★☆</text>
<text x="20" y="495" class="code" fill="#d32f2f">重量级锁:</text>
<text x="30" y="515" class="code">• 场景: 竞争激烈,持有时间长</text>
<text x="30" y="530" class="code">• 操作: Monitor,线程阻塞</text>
<rect x="350" y="300" width="340" height="240" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="5"/>
<text x="360" y="320" class="title">关键优化</text>
<text x="360" y="345" class="code" fill="#1976d2">1. 锁消除 (Lock Elimination)</text>
<text x="370" y="365" class="code">JIT检测到不可能被共享的对象</text>
<text x="370" y="380" class="code">→ 消除synchronized,提升性能</text>
<text x="360" y="405" class="code" fill="#1976d2">2. 锁粗化 (Lock Coarsening)</text>
<text x="370" y="425" class="code">多次连续加锁/解锁 → 合并为一次</text>
<text x="370" y="440" class="code">例: 循环内加锁 → 移到循环外</text>
<text x="360" y="465" class="code" fill="#1976d2">3. 自适应自旋 (Adaptive Spinning)</text>
<text x="370" y="485" class="code">根据历史自旋成功率动态调整次数</text>
<text x="370" y="500" class="code">上次成功 → 增加自旋次数</text>
<text x="370" y="515" class="code">上次失败 → 减少自旋次数</text>
<defs>
<marker id="arrow7" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
</defs>
</svg>

**详细说明：**

**1. 偏向锁（Biased Lock）**
- **场景**：大多数情况下，锁不仅不存在多线程竞争，而且总是由同一线程多次获得
- **原理**：在对象头中记录获取锁的线程 ID，后续该线程进入同步块时，只需检查线程 ID，无需 CAS
- **优点**：几乎没有额外开销
- **撤销**：当其他线程尝试竞争时，需要撤销偏向锁

**2. 轻量级锁（Lightweight Lock）**
- **场景**：多个线程交替执行同步块，竞争不激烈
- **原理**：使用 CAS 操作尝试获取锁，失败则自旋等待（默认 10 次）
- **优点**：避免线程阻塞的开销
- **升级**：自旋超过一定次数仍未获取锁，升级为重量级锁

**3. 重量级锁（Heavyweight Lock）**
- **场景**：竞争激烈或持有锁时间长
- **原理**：基于 Monitor 实现，未获取锁的线程进入阻塞状态
- **缺点**：涉及用户态和内核态切换，性能开销大

**锁升级是单向的吗？**
- **JDK 15 之前**：只能升级，不能降级（避免频繁升降级的开销）
- **JDK 15+**：支持锁降级（在 GC 的 Safe Point 时降级）

**记忆要点：**
- **三级升级** —— 偏向锁 → 轻量级锁 → 重量级锁
- **偏向单线程** —— 记录线程 ID，几乎无开销
- **轻量自旋** —— CAS 自旋，避免阻塞
- **重量阻塞** —— Monitor 锁，线程挂起
- **只升不降** —— JDK 15 前锁不降级

### 10. synchronized 和 ReentrantLock 的区别？

| 特性 | synchronized | ReentrantLock |
|------|-------------|---------------|
| **层级** | JVM 层面（字节码） | API 层面（java.util.concurrent） |
| **锁释放** | 自动释放（代码块结束） | 必须手动释放（finally） |
| **锁类型** | 非公平锁（JDK 6+可优化） | 支持公平锁和非公平锁 |
| **灵活性** | 固定用法 | 可中断、可超时、可尝试 |
| **条件变量** | 一个（wait/notify） | 多个（Condition） |
| **可重入** | 支持 | 支持 |
| **性能** | JDK 6+ 优化后相当 | 相当 |

**详细对比：**

**1. 使用方式**

```java
// synchronized - 自动释放
synchronized(lock) {
    // 临界区
} // 自动释放锁

// ReentrantLock - 手动释放
Lock lock = new ReentrantLock();
lock.lock();
try {
    // 临界区
} finally {
    lock.unlock(); // 必须在 finally 中释放
}
```

**2. 高级功能**

**ReentrantLock 独有功能：**

- **可中断等待**：`lockInterruptibly()`
```java
try {
    lock.lockInterruptibly(); // 可被中断
} catch (InterruptedException e) {
    // 处理中断
}
```

- **尝试获取锁**：`tryLock()`
```java
if (lock.tryLock()) { // 尝试获取，立即返回
    try {
        // 临界区
    } finally {
        lock.unlock();
    }
}
```

- **超时等待**：`tryLock(timeout, unit)`
```java
if (lock.tryLock(3, TimeUnit.SECONDS)) { // 等待3秒
    try {
        // 临界区
    } finally {
        lock.unlock();
    }
}
```

- **公平锁**：
```java
Lock lock = new ReentrantLock(true); // 公平锁
```

- **多个条件变量**：
```java
Condition c1 = lock.newCondition();
Condition c2 = lock.newCondition();
c1.await();  // 类似 wait()
c1.signal(); // 类似 notify()
```

**3. 性能对比**

- **JDK 5**：ReentrantLock 性能更好
- **JDK 6+**：synchronized 锁优化后性能相当
- **推荐**：优先使用 synchronized（简单、自动释放）

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="200" y="25" class="title">synchronized vs ReentrantLock</text>
<rect x="10" y="45" width="330" height="170" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="100" y="70" class="title" fill="#1976d2">synchronized</text>
<text x="20" y="95" class="code" fill="#388e3c">✓ 简单易用,自动释放</text>
<text x="20" y="115" class="code" fill="#388e3c">✓ JVM优化(锁升级)</text>
<text x="20" y="135" class="code" fill="#388e3c">✓ 不会忘记释放锁</text>
<text x="20" y="160" class="code" fill="#d32f2f">✗ 无法中断等待</text>
<text x="20" y="180" class="code" fill="#d32f2f">✗ 无法尝试获取锁</text>
<text x="20" y="200" class="code" fill="#d32f2f">✗ 只有一个条件队列</text>
<rect x="360" y="45" width="330" height="170" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="445" y="70" class="title" fill="#f57c00">ReentrantLock</text>
<text x="370" y="95" class="code" fill="#388e3c">✓ 可中断 lockInterruptibly()</text>
<text x="370" y="115" class="code" fill="#388e3c">✓ 可超时 tryLock(timeout)</text>
<text x="370" y="135" class="code" fill="#388e3c">✓ 可尝试 tryLock()</text>
<text x="370" y="155" class="code" fill="#388e3c">✓ 公平/非公平可选</text>
<text x="370" y="175" class="code" fill="#388e3c">✓ 多个条件变量 Condition</text>
<text x="370" y="200" class="code" fill="#d32f2f">✗ 必须手动释放(易出错)</text>
<rect x="10" y="230" width="680" height="160" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="250" class="title">使用建议</text>
<text x="20" y="275" class="code" fill="#1976d2">1. 默认选择 synchronized</text>
<text x="30" y="295" class="code">• 代码简洁,不易出错</text>
<text x="30" y="310" class="code">• JVM自动优化</text>
<text x="30" y="325" class="code">• 性能已足够好(JDK 6+)</text>
<text x="20" y="350" class="code" fill="#f57c00">2. 需要高级功能时用 ReentrantLock</text>
<text x="30" y="370" class="code">• 需要可中断、超时、尝试获取锁</text>
<text x="30" y="385" class="code">• 需要公平锁</text>
</svg>

**记忆要点：**
- **synchronized 简单** —— 自动释放，JVM 优化
- **ReentrantLock 灵活** —— 可中断、可超时、可公平
- **优先 synchronized** —— 简单不易错，性能已够好
- **高级需求用 Lock** —— 需要特殊功能时选择

### 11. 什么是可重入锁？

**定义：**
可重入锁（Reentrant Lock）也叫递归锁，是指同一个线程在外层方法获取锁之后，进入内层方法会自动获取锁，不会因为之前已经获取过锁而阻塞。

**核心特性：**
- 同一线程可以多次获取同一把锁
- 每次 lock() 后必须对应一次 unlock()
- 避免死锁：防止自己锁死自己

**Java 中的可重入锁：**
- `synchronized`：可重入
- `ReentrantLock`：可重入（名字就表明了）
- `ReentrantReadWriteLock`：可重入

**实现原理：**
- 记录持有锁的线程 ID
- 维护一个计数器（state）
- 同一线程重入时，计数器 +1
- 释放锁时，计数器 -1
- 计数器为 0 时，完全释放锁

**示例：**

```java
// synchronized 可重入示例
class Example {
    synchronized void method1() {
        System.out.println("method1");
        method2(); // 可重入，不会阻塞
    }

    synchronized void method2() {
        System.out.println("method2");
    }
}

// ReentrantLock 可重入示例
Lock lock = new ReentrantLock();

lock.lock(); // 计数器: 0 → 1
try {
    System.out.println("第一次获取锁");

    lock.lock(); // 计数器: 1 → 2 (可重入)
    try {
        System.out.println("第二次获取锁");
    } finally {
        lock.unlock(); // 计数器: 2 → 1
    }
} finally {
    lock.unlock(); // 计数器: 1 → 0 (完全释放)
}
```

**如果不可重入会怎样？**

```java
// 假设锁不可重入
class DeadlockExample {
    NonReentrantLock lock = new NonReentrantLock();

    void method1() {
        lock.lock();
        method2(); // 尝试再次获取锁，但锁已被自己持有
                   // 造成死锁！
        lock.unlock();
    }

    void method2() {
        lock.lock();  // 阻塞，等待锁释放
        // ...
        lock.unlock();
    }
}
```

<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">可重入锁原理</text>
<rect x="10" y="45" width="330" height="160" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="100" y="70" class="title" fill="#1976d2">线程重入过程</text>
<rect x="30" y="85" width="280" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<text x="40" y="105" class="code">lock.lock()  → state: 0→1, owner: Thread-A</text>
<line x1="170" y1="115" x2="170" y2="125" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow8)"/>
<rect x="30" y="125" width="280" height="30" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="40" y="145" class="code">lock.lock()  → state: 1→2 (重入)</text>
<line x1="170" y1="155" x2="170" y2="165" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange4)"/>
<rect x="30" y="165" width="280" height="30" fill="#ffe0b2" stroke="#f57c00" stroke-width="1.5"/>
<text x="40" y="185" class="code">lock.unlock() → state: 2→1</text>
<line x1="170" y1="195" x2="170" y2="205" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green3)"/>
<rect x="30" y="205" width="280" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<text x="40" y="225" class="code">lock.unlock() → state: 1→0, owner: null</text>
<text x="30" y="255" class="code" fill="#666">关键: state计数器 + owner线程ID</text>
<text x="30" y="275" class="code" fill="#666">每次lock +1, unlock -1</text>
<text x="30" y="295" class="code" fill="#666">state=0 时完全释放</text>
<rect x="360" y="45" width="330" height="160" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="430" y="70" class="title">核心实现</text>
<text x="370" y="95" class="code" style="fill:#000;">// ReentrantLock 实现</text>
<text x="370" y="115" class="code" style="fill:#1976d2;">final boolean tryAcquire(int acquires) {</text>
<text x="380" y="135" class="code" style="fill:#000;">  Thread current = Thread.currentThread();</text>
<text x="380" y="155" class="code" style="fill:#f57c00;">  if (current == getExclusiveOwnerThread()) {</text>
<text x="390" y="175" class="code" style="fill:#388e3c;">    setState(getState() + acquires); // +1</text>
<text x="390" y="195" class="code" style="fill:#000;">    return true;</text>
<text x="380" y="215" class="code" style="fill:#000;">  }</text>
<text x="370" y="235" class="code" style="fill:#000;">}</text>
<rect x="10" y="240" width="680" height="130" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="5"/>
<text x="20" y="260" class="title">为什么需要可重入？</text>
<text x="20" y="285" class="code">1. 避免死锁</text>
<text x="30" y="305" class="code">• 递归调用时不会锁死自己</text>
<text x="30" y="320" class="code">• 方法间调用不会阻塞</text>
<text x="20" y="345" class="code">2. 简化编程</text>
<text x="30" y="365" class="code">• 不需要关心调用链是否已持有锁</text>
<defs>
<marker id="arrow8" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
<marker id="arrow-orange4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
<marker id="arrow-green3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#388e3c"/></marker>
</defs>
</svg>

**记忆要点：**
- **可多次获取** —— 同一线程可重复获取同一锁
- **计数器机制** —— state 计数，每次 +1/-1
- **避免死锁** —— 防止自己锁死自己
- **Java 都可重入** —— synchronized 和 ReentrantLock 都支持
