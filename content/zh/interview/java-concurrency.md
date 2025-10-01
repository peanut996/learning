# Java 并发面试题

## 并发基础

### 1. 什么是并发和并行？

**并发（Concurrency）：**
- 多个任务在**同一时间段内**交替执行
- 单核 CPU 通过时间片轮转实现
- 宏观上同时执行，微观上串行执行

**并行（Parallelism）：**
- 多个任务在**同一时刻**同时执行
- 需要多核 CPU 支持
- 真正的同时执行

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">并发 vs 并行</text>
<rect x="10" y="45" width="330" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="120" y="70" class="title" fill="#1976d2">并发 (Concurrency)</text>
<text x="20" y="95" class="label">单核 CPU - 时间片轮转</text>
<rect x="20" y="105" width="100" height="20" fill="#ff9800" stroke="#e65100" stroke-width="1"/>
<text x="50" y="120" class="code" fill="#fff">任务A</text>
<rect x="125" y="105" width="100" height="20" fill="#2196f3" stroke="#0d47a1" stroke-width="1"/>
<text x="155" y="120" class="code" fill="#fff">任务B</text>
<rect x="230" y="105" width="100" height="20" fill="#ff9800" stroke="#e65100" stroke-width="1"/>
<text x="260" y="120" class="code" fill="#fff">任务A</text>
<text x="20" y="145" class="code">时间 →</text>
<text x="20" y="160" class="code" fill="#d32f2f">微观: 串行执行 (交替)</text>
<rect x="360" y="45" width="330" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="460" y="70" class="title" fill="#f57c00">并行 (Parallelism)</text>
<text x="370" y="95" class="label">多核 CPU - 同时执行</text>
<rect x="370" y="105" width="140" height="20" fill="#ff9800" stroke="#e65100" stroke-width="1"/>
<text x="420" y="120" class="code" fill="#fff">核1: 任务A</text>
<rect x="370" y="130" width="140" height="20" fill="#2196f3" stroke="#0d47a1" stroke-width="1"/>
<text x="420" y="145" class="code" fill="#fff">核2: 任务B</text>
<text x="520" y="120" class="code">同时</text>
<text x="520" y="145" class="code">执行</text>
<text x="370" y="160" class="code" fill="#388e3c">微观: 真正同时</text>
<rect x="10" y="180" width="680" height="110" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="200" class="title">关键区别</text>
<text x="20" y="220" class="code">• 并发: 一个 CPU 处理多个任务 (看起来同时)</text>
<text x="20" y="240" class="code">• 并行: 多个 CPU 同时处理多个任务 (真正同时)</text>
<text x="20" y="265" class="code" fill="#1976d2">类比: 并发像一个人同时做多件事 (快速切换)</text>
<text x="20" y="285" class="code" fill="#f57c00">      并行像多个人同时做多件事</text>
</svg>

**记忆要点：**
- **并发是交替** —— 时间片轮转，单核也能实现
- **并行是同时** —— 需要多核支持
- **并发≠并行** —— 并发程序在多核上可以并行执行

### 2. 什么是线程安全？

**定义：**
当多个线程访问同一个对象时，无需额外的同步控制或协调，都能得到正确的结果，这个对象就是线程安全的。

**线程不安全的表现：**
1. **数据不一致**：多线程修改共享变量导致结果错误
2. **可见性问题**：一个线程的修改对其他线程不可见
3. **有序性问题**：指令重排导致执行顺序混乱

**实现线程安全的方法：**

**1. 互斥同步（悲观锁）**
- `synchronized` 关键字
- `ReentrantLock` 等锁

**2. 非阻塞同步（乐观锁）**
- CAS 操作
- `AtomicInteger` 等原子类

**3. 无同步方案**
- 栈封闭（局部变量）
- ThreadLocal
- 不可变对象（final）

**4. 使用线程安全的类**
- `ConcurrentHashMap`
- `CopyOnWriteArrayList`
- `AtomicXxx` 原子类

**典型的线程不安全示例：**
```java
// 线程不安全
class Counter {
    private int count = 0;
    public void increment() {
        count++; // 非原子操作
    }
}
```

**记忆要点：**
- **核心是正确性** —— 多线程访问不出错
- **三大问题** —— 原子性、可见性、有序性
- **实现方式** —— 同步、原子类、不可变、ThreadLocal

### 3. 什么是死锁？如何避免死锁？

**死锁定义：**
两个或多个线程互相持有对方需要的资源，导致所有线程都无法继续执行。

**死锁的四个必要条件：**
1. **互斥条件**：资源只能被一个线程占用
2. **请求与保持**：持有资源的同时请求新资源
3. **不可剥夺**：资源不能被强制抢占
4. **循环等待**：形成环形等待链

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="280" y="25" class="title">死锁示意图</text>
<rect x="10" y="45" width="680" height="150" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<circle cx="150" cy="120" r="40" fill="#2196f3" stroke="#0d47a1" stroke-width="2"/>
<text x="130" y="125" class="label" fill="#fff">线程A</text>
<circle cx="550" cy="120" r="40" fill="#4caf50" stroke="#1b5e20" stroke-width="2"/>
<text x="530" y="125" class="label" fill="#fff">线程B</text>
<rect x="250" y="60" width="80" height="40" fill="#ff9800" stroke="#e65100" stroke-width="2" rx="5"/>
<text x="270" y="85" class="label">锁A</text>
<rect x="370" y="140" width="80" height="40" fill="#9c27b0" stroke="#4a148c" stroke-width="2" rx="5"/>
<text x="390" y="165" class="label">锁B</text>
<line x1="190" y1="110" x2="250" y2="80" stroke="#2196f3" stroke-width="3" marker-end="url(#arrow-blue)"/>
<text x="200" y="90" class="code" fill="#2196f3">持有</text>
<line x1="510" y1="130" x2="450" y2="160" stroke="#4caf50" stroke-width="3" marker-end="url(#arrow-green)"/>
<text x="460" y="150" class="code" fill="#4caf50">持有</text>
<path d="M 150 150 Q 200 200 290 180" stroke="#d32f2f" stroke-width="3" stroke-dasharray="5,5" marker-end="url(#arrow-red)" fill="none"/>
<text x="180" y="190" class="code" fill="#d32f2f">等待锁B</text>
<path d="M 550 90 Q 500 50 330 70" stroke="#d32f2f" stroke-width="3" stroke-dasharray="5,5" marker-end="url(#arrow-red)" fill="none"/>
<text x="400" y="50" class="code" fill="#d32f2f">等待锁A</text>
<text x="280" y="220" class="code" fill="#d32f2f" style="font-weight:bold;">死锁: 互相等待,都无法继续!</text>
<rect x="10" y="210" width="330" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="1" rx="5"/>
<text x="20" y="230" class="title">避免死锁的方法</text>
<text x="20" y="250" class="code" fill="#1976d2">1. 破坏互斥条件</text>
<text x="30" y="265" class="code">使用无锁算法 (CAS)</text>
<text x="20" y="285" class="code" fill="#1976d2">2. 破坏请求与保持</text>
<text x="30" y="300" class="code">一次性获取所有资源</text>
<text x="20" y="320" class="code" fill="#1976d2">3. 破坏不可剥夺</text>
<text x="30" y="335" class="code">超时释放 (tryLock)</text>
<text x="20" y="355" class="code" fill="#1976d2">4. 破坏循环等待</text>
<text x="30" y="370" class="code">按顺序加锁 (最常用!)</text>
<rect x="350" y="210" width="340" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="5"/>
<text x="360" y="230" class="title">代码示例</text>
<text x="360" y="250" class="code" style="fill:#d32f2f;">// 错误: 可能死锁</text>
<text x="360" y="265" class="code" style="fill:#000;">synchronized(lockA) {</text>
<text x="370" y="280" class="code" style="fill:#000;">  synchronized(lockB) { }</text>
<text x="360" y="295" class="code" style="fill:#000;">}</text>
<text x="360" y="315" class="code" style="fill:#388e3c;">// 正确: 统一加锁顺序</text>
<text x="360" y="330" class="code" style="fill:#000;">if (lockA.hashCode() < lockB.hashCode()) {</text>
<text x="370" y="345" class="code" style="fill:#000;">  synchronized(lockA) {</text>
<text x="380" y="360" class="code" style="fill:#000;">    synchronized(lockB) { }</text>
<text x="370" y="375" class="code" style="fill:#000;">  }</text>
<text x="360" y="385" class="code" style="fill:#000;">}</text>
<defs>
<marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#2196f3"/></marker>
<marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#4caf50"/></marker>
<marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#d32f2f"/></marker>
</defs>
</svg>

**记忆要点：**
- **四个条件缺一不可** —— 破坏任一条件即可避免
- **统一加锁顺序** —— 最实用的避免方法
- **tryLock 超时** —— 避免无限等待

### 4. 什么是活锁和饥饿？

**活锁（Livelock）：**
- 线程不断重复执行相同的操作，但无法前进
- 与死锁区别：线程仍在运行（占用 CPU），但没有进展
- 类比：两人在走廊相遇，都想让对方先过，结果不停地左右移动

**典型场景：**
- 消息重试机制导致死循环
- 事务冲突后不断回滚重试

**解决方法：**
- 引入随机性（随机等待时间）
- 限制重试次数

**饥饿（Starvation）：**
- 线程长期无法获取所需资源，一直等待
- 原因：优先级低、其他线程一直占用资源

**典型场景：**
- 低优先级线程得不到 CPU 时间
- 读写锁中，写线程一直得不到机会

**解决方法：**
- 使用公平锁
- 设置合理的优先级
- 避免长时间持有锁

**三者对比：**

| 问题 | 状态 | 原因 | 解决 |
|------|------|------|------|
| **死锁** | 阻塞，不运行 | 循环等待资源 | 破坏死锁条件 |
| **活锁** | 运行，无进展 | 不断重复无效操作 | 随机性 |
| **饥饿** | 长期等待 | 资源被其他线程占用 | 公平锁 |

**记忆要点：**
- **死锁不动** —— 线程阻塞
- **活锁空转** —— 线程忙碌但无进展
- **饥饿等待** —— 长期得不到资源

### 5. 进程和线程的区别？

| 特性 | 进程（Process） | 线程（Thread） |
|------|----------------|---------------|
| **定义** | 资源分配的基本单位 | CPU 调度的基本单位 |
| **资源** | 独立的内存空间 | 共享进程的内存空间 |
| **开销** | 创建/切换开销大 | 创建/切换开销小 |
| **通信** | IPC（管道、消息队列等） | 共享内存，直接通信 |
| **影响** | 一个进程崩溃不影响其他进程 | 一个线程崩溃可能导致整个进程崩溃 |
| **地址空间** | 独立地址空间 | 共享进程地址空间 |

**关系：**
- 一个进程可以包含多个线程
- 线程是进程的子集
- 同一进程的线程共享进程资源（堆、方法区）
- 每个线程有独立的栈、程序计数器、本地变量

**记忆要点：**
- **进程独立重** —— 独立资源，开销大
- **线程共享轻** —— 共享内存，开销小
- **进程间隔离好** —— 线程间通信快

### 6. 协程和线程的区别？

| 特性 | 线程（Thread） | 协程（Coroutine） |
|------|---------------|------------------|
| **调度** | 内核级，抢占式调度 | 用户级，协作式调度 |
| **开销** | 较大（MB级栈空间） | 很小（KB级栈空间） |
| **切换** | 内核态切换，耗时 | 用户态切换，快速 |
| **并发数** | 受系统资源限制（数千） | 可支持百万级 |
| **阻塞** | 阻塞会让出 CPU | 阻塞不影响其他协程 |
| **实现** | OS 原生支持 | 语言/库实现 |

**协程的优势：**
- **轻量级**：创建百万协程不成问题
- **高效切换**：用户态切换，无需陷入内核
- **同步写法，异步执行**：避免回调地狱

**Java 中的协程：**
- Java 19+ 引入虚拟线程（Virtual Thread / Project Loom）
- 类似协程的轻量级线程
- 适合 I/O 密集型任务

**使用场景：**
- **线程**：计算密集型、需要OS调度
- **协程**：I/O密集型、大量并发连接（如Web服务器）

**记忆要点：**
- **协程更轻** —— KB级内存，百万并发
- **用户态调度** —— 切换快，无内核开销
- **Java 虚拟线程** —— JDK 19+ 的协程实现

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

## volatile

### 12. volatile 关键字的作用？

**核心作用：**
volatile 是 Java 提供的**轻量级同步机制**，保证**可见性**和**有序性**，但**不保证原子性**。

**三大作用：**

**1. 保证可见性（Visibility）**
- 一个线程修改 volatile 变量后，其他线程能立即看到最新值
- 原理：强制从主内存读取，写入后立即刷新到主内存

**2. 禁止指令重排序（Ordering）**
- 通过内存屏障防止编译器和 CPU 重排序
- 保证有序性

**3. 不保证原子性（Non-Atomic）**
- 复合操作（如 i++）不是原子的
- 需要原子性应使用 `synchronized` 或 `AtomicXxx`

<svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">volatile 可见性原理</text>
<rect x="10" y="45" width="680" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">无 volatile - 可能不可见</text>
<rect x="30" y="80" width="150" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="60" y="100" class="label">线程A</text>
<text x="40" y="120" class="code">工作内存</text>
<text x="40" y="140" class="code" fill="#f57c00">flag = true</text>
<line x1="105" y1="160" x2="105" y2="180" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow9)"/>
<text x="90" y="175" class="code" fill="#d32f2f">可能不写回</text>
<rect x="30" y="180" width="150" height="50" fill="#fff" stroke="#666" stroke-width="1.5"/>
<text x="60" y="200" class="label">主内存</text>
<text x="40" y="220" class="code" fill="#666">flag = false</text>
<rect x="210" y="80" width="150" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="240" y="100" class="label">线程B</text>
<text x="220" y="120" class="code">工作内存</text>
<text x="220" y="140" class="code" fill="#666">flag = false</text>
<line x1="285" y1="160" x2="285" y2="180" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow9)"/>
<text x="265" y="175" class="code" fill="#d32f2f">读不到最新值</text>
<text x="380" y="135" class="code" fill="#d32f2f">✗ 线程B看不到线程A的修改</text>
<rect x="400" y="80" width="280" height="150" fill="#ffebee" stroke="#d32f2f" stroke-width="1" rx="5"/>
<text x="410" y="100" class="title" fill="#d32f2f">问题示例</text>
<text x="410" y="120" class="code" style="fill:#000;">boolean flag = false;</text>
<text x="410" y="145" class="code" style="fill:#000;">// 线程A</text>
<text x="410" y="165" class="code" style="fill:#f57c00;">flag = true; // 写入工作内存</text>
<text x="410" y="190" class="code" style="fill:#000;">// 线程B</text>
<text x="410" y="210" class="code" style="fill:#666;">while (!flag) {} // 可能死循环</text>
<rect x="10" y="260" width="680" height="220" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="20" y="280" class="title" fill="#388e3c">有 volatile - 保证可见</text>
<rect x="30" y="295" width="150" height="80" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="60" y="315" class="label">线程A</text>
<text x="40" y="335" class="code">工作内存</text>
<text x="40" y="355" class="code" fill="#388e3c">flag = true</text>
<line x1="105" y1="375" x2="105" y2="395" stroke="#388e3c" stroke-width="3" marker-end="url(#arrow-green4)"/>
<text x="85" y="390" class="code" fill="#388e3c">立即写回</text>
<rect x="30" y="395" width="150" height="50" fill="#fff" stroke="#666" stroke-width="1.5"/>
<text x="60" y="415" class="label">主内存</text>
<text x="40" y="435" class="code" fill="#388e3c">flag = true</text>
<rect x="210" y="295" width="150" height="80" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="240" y="315" class="label">线程B</text>
<text x="220" y="335" class="code">工作内存</text>
<text x="220" y="355" class="code" fill="#388e3c">flag = true</text>
<line x1="285" y1="375" x2="285" y2="395" stroke="#388e3c" stroke-width="3" marker-end="url(#arrow-green4)"/>
<text x="265" y="390" class="code" fill="#388e3c">强制重新读</text>
<text x="380" y="340" class="code" fill="#388e3c">✓ 线程B立即看到最新值</text>
<rect x="400" y="295" width="280" height="150" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="5"/>
<text x="410" y="315" class="title" fill="#388e3c">解决方案</text>
<text x="410" y="335" class="code" style="fill:#388e3c;">volatile boolean flag = false;</text>
<text x="410" y="360" class="code" style="fill:#000;">// 线程A</text>
<text x="410" y="380" class="code" style="fill:#388e3c;">flag = true; // 立即刷新到主内存</text>
<text x="410" y="405" class="code" style="fill:#000;">// 线程B</text>
<text x="410" y="425" class="code" style="fill:#388e3c;">while (!flag) {} // 立即退出循环</text>
<defs>
<marker id="arrow9" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
<marker id="arrow-green4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#388e3c"/></marker>
</defs>
</svg>

**典型应用场景：**

**1. 状态标志位**
```java
volatile boolean shutdown = false;

// 线程A
public void shutdown() {
    shutdown = true;
}

// 线程B
public void doWork() {
    while (!shutdown) {
        // 工作...
    }
}
```

**2. 双重检查锁定（DCL）单例模式**
```java
class Singleton {
    private volatile static Singleton instance; // 必须 volatile

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton(); // 防止指令重排
                }
            }
        }
        return instance;
    }
}
```

**记忆要点：**
- **保证可见性** —— 一个线程修改，其他线程立即看到
- **禁止重排序** —— 通过内存屏障
- **不保证原子性** —— i++ 等复合操作不安全
- **适用场景** —— 状态标志位、DCL单例

### 13. volatile 的实现原理？（内存屏障）

**核心原理：**
volatile 通过**内存屏障（Memory Barrier）**实现可见性和有序性。

**底层实现：**

**1. 汇编层面**
- volatile 变量的写操作后会插入一条 **Lock 前缀指令**
- Lock 指令作用：
  - 将当前处理器缓存行的数据写回主内存
  - 使其他处理器的缓存失效（MESI 协议）

**2. 内存屏障类型**

JMM（Java Memory Model）定义了四种内存屏障：

| 屏障类型 | 指令示例 | 说明 |
|---------|---------|------|
| **LoadLoad** | Load1; LoadLoad; Load2 | 确保 Load1 在 Load2 前完成 |
| **StoreStore** | Store1; StoreStore; Store2 | 确保 Store1 在 Store2 前刷新到主存 |
| **LoadStore** | Load1; LoadStore; Store2 | 确保 Load1 在 Store2 前完成 |
| **StoreLoad** | Store1; StoreLoad; Load2 | 确保 Store1 刷新后再 Load2 |

**3. volatile 的内存屏障插入策略**

- **写操作**：
  1. StoreStore 屏障
  2. volatile 写
  3. StoreLoad 屏障

- **读操作**：
  1. volatile 读
  2. LoadLoad 屏障
  3. LoadStore 屏障

<svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="200" y="25" class="title">volatile 内存屏障插入位置</text>
<rect x="10" y="45" width="330" height="220" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="100" y="70" class="title" fill="#f57c00">volatile 写操作</text>
<rect x="30" y="85" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="40" y="105" class="code">普通写操作 (x = 1)</text>
<rect x="30" y="120" width="280" height="30" fill="#ffe0b2" stroke="#f57c00" stroke-width="2"/>
<text x="40" y="140" class="code" fill="#f57c00">StoreStore 屏障</text>
<rect x="30" y="155" width="280" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="40" y="175" class="code" fill="#388e3c">volatile 写 (flag = true)</text>
<rect x="30" y="190" width="280" height="30" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="40" y="210" class="code" fill="#d32f2f">StoreLoad 屏障 (开销最大)</text>
<rect x="30" y="225" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="40" y="245" class="code">普通读/写操作</text>
<rect x="360" y="45" width="330" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="70" class="title" fill="#1976d2">volatile 读操作</text>
<rect x="380" y="85" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="390" y="105" class="code">普通读/写操作</text>
<rect x="380" y="120" width="280" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="390" y="140" class="code" fill="#388e3c">volatile 读 (if (flag))</text>
<rect x="380" y="155" width="280" height="30" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="390" y="175" class="code" fill="#1976d2">LoadLoad 屏障</text>
<rect x="380" y="190" width="280" height="30" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="390" y="210" class="code" fill="#1976d2">LoadStore 屏障</text>
<rect x="380" y="225" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="390" y="245" class="code">普通读操作 (y = x)</text>
<rect x="10" y="280" width="680" height="110" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="300" class="title">Lock 前缀指令</text>
<text x="20" y="320" class="code">volatile 写操作会在汇编代码中生成 Lock 前缀指令:</text>
<text x="20" y="340" class="code" style="fill:#f57c00;">movl $0x1, flag  // 普通写</text>
<text x="20" y="360" class="code" style="fill:#d32f2f;">lock addl $0x0, (%rsp)  // volatile 写 (Lock指令)</text>
<text x="20" y="385" class="code">Lock 指令作用:</text>
<text x="30" y="405" class="code">• 锁定缓存行，写回主内存</text>
<text x="30" y="425" class="code">• 触发 MESI 协议，使其他 CPU 缓存失效</text>
<text x="30" y="445" class="code">• 禁止该指令与前后指令重排序</text>
<rect x="10" y="460" width="330" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="5"/>
<text x="20" y="480" class="title" fill="#388e3c">可见性保证</text>
<text x="20" y="500" class="code">写: 立即刷新到主内存</text>
<text x="160" y="500" class="code">读: 强制从主内存读取</text>
<rect x="350" y="460" width="340" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="5"/>
<text x="360" y="480" class="title" fill="#f57c00">有序性保证</text>
<text x="360" y="500" class="code">内存屏障禁止重排序 (前后操作不能越过屏障)</text>
</svg>

**happens-before 规则：**

volatile 相关的 happens-before 规则：
- 对 volatile 变量的写操作 happens-before 后续对该变量的读操作
- 保证写操作对读操作可见

**示例说明重排序问题：**

```java
// 不使用 volatile 可能重排序
class Example {
    int x = 0;
    boolean flag = false;

    // 线程A
    void writer() {
        x = 1;           // 1
        flag = true;     // 2  可能被重排序到 1 之前
    }

    // 线程B
    void reader() {
        if (flag) {      // 3
            int y = x;   // 4  可能读到 x=0（因为重排序）
        }
    }
}

// 使用 volatile 保证有序
class Example {
    int x = 0;
    volatile boolean flag = false; // volatile 变量

    // 线程A
    void writer() {
        x = 1;           // 1  保证在 2 之前执行
        flag = true;     // 2  StoreStore 屏障，禁止重排序
    }

    // 线程B
    void reader() {
        if (flag) {      // 3  LoadLoad/LoadStore 屏障
            int y = x;   // 4  一定能读到 x=1
        }
    }
}
```

**记忆要点：**
- **Lock 前缀指令** —— volatile 写操作的汇编实现
- **四种屏障** —— LoadLoad、StoreStore、LoadStore、StoreLoad
- **写两屏障** —— StoreStore + StoreLoad
- **读两屏障** —— LoadLoad + LoadStore
- **MESI 协议** —— 缓存一致性协议

### 14. volatile 能保证原子性吗？

**答案：不能。**

**原因分析：**

volatile 只能保证**可见性**和**有序性**，**不能保证原子性**。

**经典反例：i++**

```java
volatile int count = 0;

// 100个线程同时执行
public void increment() {
    count++; // 非原子操作！
}
```

**i++ 的字节码分解：**
```
1. GETFIELD count     // 读取 count
2. ICONST_1           // 常量 1
3. IADD               // 加法
4. PUTFIELD count     // 写入 count
```

**问题所在：**
- i++ 实际是三个操作：读取 → 计算 → 写入
- volatile 只保证单次读/写的可见性
- 无法保证复合操作的原子性

<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="200" y="25" class="title">volatile 不保证原子性示例</text>
<rect x="10" y="45" width="680" height="180" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#d32f2f">并发问题: volatile int count = 0</text>
<rect x="30" y="80" width="200" height="130" fill="#fff" stroke="#d32f2f" stroke-width="1.5"/>
<text x="80" y="100" class="label">线程A</text>
<text x="40" y="120" class="code">1. 读 count = 0</text>
<text x="40" y="140" class="code">2. 计算 0 + 1 = 1</text>
<text x="40" y="160" class="code">3. 写 count = 1</text>
<text x="40" y="185" class="code" fill="#d32f2f">问题: 步骤2时被中断</text>
<text x="40" y="205" class="code" fill="#d32f2f">写回的可能是旧值</text>
<rect x="250" y="80" width="200" height="130" fill="#fff" stroke="#d32f2f" stroke-width="1.5"/>
<text x="300" y="100" class="label">线程B</text>
<text x="260" y="120" class="code">1. 读 count = 0</text>
<text x="260" y="140" class="code">2. 计算 0 + 1 = 1</text>
<text x="260" y="160" class="code">3. 写 count = 1</text>
<text x="260" y="185" class="code" fill="#d32f2f">问题: 也读到旧值0</text>
<text x="260" y="205" class="code" fill="#d32f2f">最终结果 = 1 (丢失更新!)</text>
<text x="470" y="140" class="code" fill="#d32f2f" style="font-size:13px;">✗ 预期: count=2</text>
<text x="470" y="165" class="code" fill="#d32f2f" style="font-size:13px;">✗ 实际: count=1</text>
<rect x="10" y="240" width="330" height="170" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="260" class="title">解决方案</text>
<text x="20" y="285" class="code" fill="#1976d2">1. synchronized</text>
<text x="20" y="305" class="code" style="fill:#000;">synchronized(this) {</text>
<text x="30" y="320" class="code" style="fill:#000;">  count++;</text>
<text x="20" y="335" class="code" style="fill:#000;">}</text>
<text x="20" y="360" class="code" fill="#1976d2">2. AtomicInteger (推荐)</text>
<text x="20" y="380" class="code" style="fill:#000;">AtomicInteger count = new AtomicInteger(0);</text>
<text x="20" y="395" class="code" style="fill:#388e3c;">count.incrementAndGet(); // CAS原子操作</text>
<rect x="350" y="240" width="340" height="170" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="5"/>
<text x="360" y="260" class="title" fill="#388e3c">volatile 适用场景</text>
<text x="360" y="285" class="code" fill="#388e3c">✓ 1. 状态标志位</text>
<text x="370" y="305" class="code">volatile boolean flag;</text>
<text x="370" y="320" class="code">flag = true; // 单次写，原子</text>
<text x="360" y="345" class="code" fill="#388e3c">✓ 2. 双重检查锁定</text>
<text x="370" y="365" class="code">volatile static Singleton instance;</text>
<text x="360" y="390" class="code" fill="#d32f2f">✗ 3. 计数器 count++</text>
<text x="370" y="405" class="code" fill="#d32f2f">需要 synchronized 或 Atomic</text>
</svg>

**为什么 AtomicInteger 可以？**

```java
// AtomicInteger 内部使用 CAS
public final int incrementAndGet() {
    return unsafe.getAndAddInt(this, valueOffset, 1) + 1;
}

// CAS 循环直到成功
public final int getAndAddInt(Object o, long offset, int delta) {
    int v;
    do {
        v = getIntVolatile(o, offset); // 读取当前值
    } while (!compareAndSwapInt(o, offset, v, v + delta)); // CAS更新
    return v;
}
```

**总结对比：**

| 操作 | volatile | synchronized | AtomicInteger |
|------|----------|--------------|---------------|
| **i++** | ✗ 不安全 | ✓ 安全 | ✓ 安全 |
| **flag = true** | ✓ 安全 | ✓ 安全 | ✓ 安全 |
| **性能** | 最快 | 较慢 | 快 |

**记忆要点：**
- **volatile 不保证原子性** —— 复合操作不安全
- **i++ 三步骤** —— 读取、计算、写入
- **用 AtomicInteger** —— CAS 保证原子性
- **适用单次操作** —— flag = true 这种单次写

### 15. volatile 和 synchronized 的区别？

| 特性 | volatile | synchronized |
|------|----------|--------------|
| **作用** | 轻量级同步 | 重量级同步 |
| **原子性** | ✗ 不保证 | ✓ 保证 |
| **可见性** | ✓ 保证 | ✓ 保证 |
| **有序性** | ✓ 保证（禁止重排序） | ✓ 保证 |
| **阻塞** | 不阻塞 | 可能阻塞 |
| **使用范围** | 只能修饰变量 | 可修饰方法、代码块 |
| **编译器优化** | 禁止重排序 | 禁止重排序 |
| **性能** | 高 | 较低（JDK 6+ 优化后提升） |

**详细对比：**

**1. 作用范围**
```java
// volatile - 只能修饰变量
volatile int count;
volatile boolean flag;

// synchronized - 可修饰方法和代码块
synchronized void method() { }
synchronized(lock) { }
```

**2. 原子性**
```java
volatile int count = 0;
count++;  // ✗ 非原子，不安全

synchronized(this) {
    count++;  // ✓ 原子，安全
}
```

**3. 性能**
- **volatile**：无锁，读写无开销
- **synchronized**：
  - JDK 5：较慢
  - JDK 6+：锁优化后性能提升（偏向锁、轻量级锁）

**使用场景：**

**volatile 适用：**
1. 状态标志位
2. 双重检查锁定（DCL）
3. 独立观察（一写多读）

**synchronized 适用：**
1. 复合操作（i++）
2. 多个变量需要同步
3. 需要阻塞等待

**组合使用示例：**

```java
class Example {
    private volatile boolean ready = false;
    private int data = 0;

    // 线程A
    public void writer() {
        data = 100;       // 普通写
        ready = true;     // volatile 写（内存屏障保证 data 可见）
    }

    // 线程B
    public void reader() {
        if (ready) {      // volatile 读
            int x = data; // 一定能看到 data=100
        }
    }
}
```

**记忆要点：**
- **volatile 轻量快** —— 不保证原子性，不阻塞
- **synchronized 重量全** —— 保证原子性，可能阻塞
- **volatile 变量级** —— synchronized 方法/代码块级
- **单写多读用 volatile** —— 复合操作用 synchronized

## CAS

### 16. 什么是 CAS？

**定义：**
CAS（Compare And Swap，比较并交换）是一种**无锁的原子操作**，用于实现多线程环境下的同步。

**核心思想：**
- 比较内存中的值与预期值是否相等
- 如果相等，则更新为新值
- 如果不等，则不更新（说明已被其他线程修改）

**CAS 的三个操作数：**
1. **V（内存地址）**：要更新的变量
2. **E（预期值 Expected）**：预期的旧值
3. **N（新值 New）**：要设置的新值

**伪代码：**
```java
boolean compareAndSwap(V, E, N) {
    if (V == E) {     // 比较
        V = N;        // 交换
        return true;  // 成功
    }
    return false;     // 失败
}
```

**Java 中的 CAS：**
- 由 `Unsafe` 类提供（sun.misc.Unsafe）
- 底层调用 CPU 的原子指令（x86: CMPXCHG）
- JDK 的 Atomic 系列类基于 CAS 实现

<svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">CAS 操作流程</text>
<rect x="10" y="45" width="680" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">CAS 成功案例</text>
<rect x="30" y="80" width="200" height="50" fill="#fff" stroke="#666" stroke-width="1.5"/>
<text x="80" y="100" class="label">主内存</text>
<text x="40" y="120" class="code">value = 5</text>
<line x1="130" y1="130" x2="250" y2="150" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow10)"/>
<text x="160" y="145" class="code" fill="#1976d2">读取</text>
<rect x="250" y="80" width="200" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="300" y="100" class="label">线程A</text>
<text x="260" y="120" class="code">expected = 5, new = 6</text>
<line x1="350" y1="130" x2="470" y2="150" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange5)"/>
<text x="380" y="145" class="code" fill="#f57c00">CAS(5, 6)</text>
<rect x="470" y="80" width="200" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="520" y="100" class="label">比较</text>
<text x="480" y="120" class="code" fill="#388e3c">5 == 5 ✓</text>
<line x1="570" y1="130" x2="130" y2="180" stroke="#388e3c" stroke-width="3" marker-end="url(#arrow-green5)"/>
<text x="330" y="165" class="code" fill="#388e3c">更新成功</text>
<rect x="30" y="185" width="200" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="80" y="205" class="label">主内存</text>
<text x="40" y="225" class="code" fill="#388e3c">value = 6 ✓</text>
<rect x="10" y="260" width="680" height="200" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="20" y="280" class="title" fill="#d32f2f">CAS 失败案例 (已被其他线程修改)</text>
<rect x="30" y="295" width="200" height="50" fill="#fff" stroke="#666" stroke-width="1.5"/>
<text x="80" y="315" class="label">主内存</text>
<text x="40" y="335" class="code">value = 7 (被线程B改了)</text>
<line x1="130" y1="345" x2="250" y2="365" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow10)"/>
<text x="160" y="360" class="code" fill="#666">读取(旧值5)</text>
<rect x="250" y="295" width="200" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="300" y="315" class="label">线程A</text>
<text x="260" y="335" class="code">expected = 5, new = 6</text>
<line x1="350" y1="345" x2="470" y2="365" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange5)"/>
<text x="380" y="360" class="code" fill="#f57c00">CAS(5, 6)</text>
<rect x="470" y="295" width="200" height="50" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="520" y="315" class="label">比较</text>
<text x="480" y="335" class="code" fill="#d32f2f">5 != 7 ✗</text>
<line x1="570" y1="345" x2="350" y2="395" stroke="#d32f2f" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow-red3)"/>
<text x="450" y="375" class="code" fill="#d32f2f">更新失败</text>
<rect x="250" y="390" width="200" height="50" fill="#ffcdd2" stroke="#d32f2f" stroke-width="1.5"/>
<text x="300" y="410" class="label">线程A</text>
<text x="260" y="430" class="code" fill="#d32f2f">重新读取,重试 CAS</text>
<defs>
<marker id="arrow10" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
<marker id="arrow-orange5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
<marker id="arrow-green5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#388e3c"/></marker>
<marker id="arrow-red3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#d32f2f"/></marker>
</defs>
</svg>

**Java 示例：**

```java
import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger count = new AtomicInteger(5);

// 期望值是 5，更新为 6
boolean success = count.compareAndSet(5, 6);
// success = true, count = 6

// 期望值是 5（已经是6了），更新为 7
success = count.compareAndSet(5, 7);
// success = false, count 仍为 6

// 期望值是 6，更新为 7
success = count.compareAndSet(6, 7);
// success = true, count = 7
```

**优缺点：**

**优点：**
- **无锁**：避免线程阻塞，性能高
- **乐观锁**：适合竞争不激烈的场景

**缺点：**
1. **ABA 问题**：值从 A 变成 B 再变回 A，CAS 误认为没变
2. **自旋开销**：失败后循环重试，CPU 空转
3. **只能保证一个变量**：多个变量需要额外处理

**记忆要点：**
- **CAS 三要素** —— 内存地址 V、预期值 E、新值 N
- **比较并交换** —— V == E 则更新为 N
- **无锁乐观** —— 失败重试，不阻塞线程
- **底层原子指令** —— CPU 指令保证原子性

### 17. CAS 的实现原理？

**底层实现：**
CAS 的原子性由 **CPU 硬件指令**保证，不同架构有不同的指令。

**1. CPU 指令层面**

| 架构 | 指令 | 说明 |
|------|------|------|
| **x86** | CMPXCHG | Compare and Exchange |
| **ARM** | LDREX/STREX | Load-Exclusive/Store-Exclusive |
| **PowerPC** | lwarx/stwcx | Load-Word-And-Reserve/Store-Conditional |

**2. Java 层面：Unsafe 类**

```java
// Unsafe 类提供 CAS 操作
public final class Unsafe {
    // CAS 操作
    public native boolean compareAndSwapInt(
        Object o,      // 对象
        long offset,   // 字段偏移量
        int expected,  // 期望值
        int x          // 新值
    );

    public native boolean compareAndSwapLong(...);
    public native boolean compareAndSwapObject(...);
}
```

**3. AtomicInteger 源码分析：**

```java
public class AtomicInteger {
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    private static final long valueOffset; // value 字段的内存偏移量

    static {
        try {
            // 获取 value 字段的偏移量
            valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }

    private volatile int value; // 使用 volatile 保证可见性

    public final boolean compareAndSet(int expect, int update) {
        return unsafe.compareAndSwapInt(this, valueOffset, expect, update);
    }

    public final int incrementAndGet() {
        return unsafe.getAndAddInt(this, valueOffset, 1) + 1;
    }
}

// Unsafe 的 getAndAddInt 实现（JDK 8+）
public final int getAndAddInt(Object o, long offset, int delta) {
    int v;
    do {
        v = getIntVolatile(o, offset); // 读取当前值（volatile读）
    } while (!compareAndSwapInt(o, offset, v, v + delta)); // CAS更新
    return v;
}
```

**4. x86 CMPXCHG 指令**

```assembly
; CMPXCHG 指令格式
CMPXCHG [dest], src

; 操作流程：
; 1. 比较 EAX 寄存器的值与 dest 的值
; 2. 如果相等，将 src 的值写入 dest，并设置 ZF=1
; 3. 如果不等，将 dest 的值写入 EAX，并设置 ZF=0

; 加上 LOCK 前缀保证原子性
LOCK CMPXCHG [memory], register
```

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">CAS 实现原理层次</text>
<rect x="150" y="45" width="400" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="280" y="75" class="label">Java 层: AtomicInteger.compareAndSet()</text>
<line x1="350" y1="95" x2="350" y2="115" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow11)"/>
<rect x="150" y="115" width="400" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="245" y="145" class="label">JVM 层: Unsafe.compareAndSwapInt()</text>
<line x1="350" y1="165" x2="350" y2="185" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange6)"/>
<rect x="150" y="185" width="400" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="290" y="215" class="label">Native 方法 (C++ 实现)</text>
<line x1="350" y1="235" x2="350" y2="255" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange6)"/>
<rect x="150" y="255" width="400" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="260" y="285" class="label">CPU 指令: LOCK CMPXCHG (x86)</text>
<rect x="10" y="330" width="330" height="110" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="350" class="title">关键技术</text>
<text x="20" y="370" class="code" fill="#1976d2">1. volatile 保证可见性</text>
<text x="30" y="390" class="code">private volatile int value;</text>
<text x="20" y="410" class="code" fill="#1976d2">2. Unsafe 提供原子操作</text>
<text x="30" y="430" class="code">unsafe.compareAndSwapInt(...)</text>
<rect x="350" y="330" width="340" height="110" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="5"/>
<text x="360" y="350" class="title">LOCK 前缀作用</text>
<text x="360" y="370" class="code">• 锁定总线或缓存行</text>
<text x="360" y="390" class="code">• 保证指令原子性</text>
<text x="360" y="410" class="code">• 禁止指令重排序</text>
<text x="360" y="430" class="code">• 触发缓存一致性协议 (MESI)</text>
<defs>
<marker id="arrow11" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
<marker id="arrow-orange6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
</defs>
</svg>

**为什么 CAS 是原子的？**

1. **硬件支持**：CPU 提供原子指令（CMPXCHG）
2. **LOCK 前缀**：锁定总线或缓存行，其他 CPU 无法访问
3. **单一指令**：比较和交换在一条指令中完成，不可分割

**CAS 自旋示例：**

```java
// 典型的 CAS 自旋模式
public final int incrementAndGet() {
    for (;;) {  // 无限循环，直到成功
        int current = get();  // 读取当前值
        int next = current + 1;  // 计算新值
        if (compareAndSet(current, next)) {  // CAS 更新
            return next;  // 成功，返回
        }
        // 失败，继续循环重试
    }
}
```

**记忆要点：**
- **Unsafe 类** —— Java 提供的底层 CAS 操作
- **CPU 原子指令** —— CMPXCHG（x86）
- **LOCK 前缀** —— 保证指令原子性
- **自旋重试** —— CAS 失败后循环重试
- **volatile 配合** —— 保证变量可见性

### 18. CAS 有什么问题？（ABA 问题、循环开销、只能保证一个变量）

**CAS 的三大问题：**

**1. ABA 问题**

**问题描述：**
- 线程 A 读取值为 A
- 线程 B 将值从 A 改为 B，再改回 A
- 线程 A 执行 CAS 时发现值仍是 A，误以为没被修改
- 但实际上值已经被改变过了

**典型场景：**
```java
// 栈操作示例
AtomicReference<Node> top = new AtomicReference<>(nodeA);

// 线程1: 准备 pop A
Node oldTop = top.get(); // A
Node newTop = oldTop.next; // B

// 线程2: pop A, push A (此时 A.next 可能已改变)
top.set(nodeB);
top.set(nodeA);

// 线程1: CAS 成功，但 A.next 已被修改！
top.compareAndSet(oldTop, newTop); // 成功，但可能出错
```

**解决方案：**
- **版本号/时间戳**：AtomicStampedReference
- **布尔标记**：AtomicMarkableReference

```java
// 使用 AtomicStampedReference 解决 ABA
AtomicStampedReference<Integer> asr = new AtomicStampedReference<>(100, 0);

int stamp = asr.getStamp(); // 获取版本号
int value = asr.getReference(); // 获取值

// CAS 时同时检查值和版本号
boolean success = asr.compareAndSet(
    100,      // 期望值
    101,      // 新值
    stamp,    // 期望版本号
    stamp+1   // 新版本号
);
```

**2. 循环开销（自旋问题）**

**问题描述：**
- CAS 失败后不断重试（自旋）
- 高竞争场景下，大量线程自旋消耗 CPU
- 长时间自旋可能导致 CPU 空转

**示例：**
```java
// 高竞争场景
AtomicInteger count = new AtomicInteger(0);

// 1000个线程同时执行
for (int i = 0; i < 1000; i++) {
    new Thread(() -> {
        for (;;) {  // 可能循环很多次
            int current = count.get();
            if (count.compareAndSet(current, current + 1)) {
                break;
            }
            // 失败，继续循环（消耗 CPU）
        }
    }).start();
}
```

**解决方案：**
- **限制重试次数**：超过次数后使用 synchronized
- **分段 CAS**：LongAdder（分散热点）
- **退避策略**：自旋失败后休眠一段时间

```java
// LongAdder 解决高并发问题
LongAdder adder = new LongAdder();
adder.increment(); // 内部分散到多个 Cell，减少竞争
```

**3. 只能保证一个变量的原子性**

**问题描述：**
- CAS 只能对单个共享变量进行操作
- 多个变量需要同时更新时，CAS 无能为力

**错误示例：**
```java
class Account {
    AtomicInteger balance = new AtomicInteger(100);
    AtomicInteger count = new AtomicInteger(0);

    void transfer(int amount) {
        // ✗ 无法保证两个操作的原子性
        balance.addAndGet(-amount);
        count.incrementAndGet();
        // 中间可能被其他线程看到中间状态
    }
}
```

**解决方案：**

**方案1：封装成对象**
```java
class AccountState {
    final int balance;
    final int count;
    AccountState(int balance, int count) {
        this.balance = balance;
        this.count = count;
    }
}

AtomicReference<AccountState> state =
    new AtomicReference<>(new AccountState(100, 0));

// CAS 更新整个对象
for (;;) {
    AccountState current = state.get();
    AccountState next = new AccountState(
        current.balance - amount,
        current.count + 1
    );
    if (state.compareAndSet(current, next)) {
        break;
    }
}
```

**方案2：使用 synchronized**
```java
synchronized(this) {
    balance -= amount;
    count++;
}
```

<svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">CAS 三大问题</text>
<rect x="10" y="45" width="680" height="150" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#d32f2f">1. ABA 问题</text>
<text x="20" y="85" class="code">问题: A → B → A, CAS误认为没变</text>
<text x="20" y="105" class="code" fill="#388e3c">解决: AtomicStampedReference (版本号)</text>
<text x="30" y="125" class="code">int stamp = asr.getStamp();</text>
<text x="30" y="145" class="code">asr.compareAndSet(100, 101, stamp, stamp+1);</text>
<text x="30" y="165" class="code" fill="#666">同时比较值和版本号，版本号始终递增</text>
<text x="30" y="185" class="code" fill="#666">B→A时版本号会变，CAS能检测到</text>
<rect x="10" y="205" width="680" height="130" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="20" y="225" class="title" fill="#f57c00">2. 循环开销 (自旋)</text>
<text x="20" y="245" class="code">问题: 高竞争下大量失败重试,CPU空转</text>
<text x="20" y="265" class="code" fill="#388e3c">解决1: 限制重试次数</text>
<text x="30" y="285" class="code">for (int i = 0; i < MAX_RETRY; i++) { CAS... }</text>
<text x="20" y="305" class="code" fill="#388e3c">解决2: LongAdder 分段 CAS</text>
<text x="30" y="325" class="code">LongAdder adder = new LongAdder(); // 分散热点</text>
<rect x="10" y="345" width="680" height="165" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="365" class="title" fill="#1976d2">3. 只能保证一个变量</text>
<text x="20" y="385" class="code">问题: 多变量无法保证整体原子性</text>
<text x="20" y="405" class="code" fill="#388e3c">解决1: 封装成对象 AtomicReference</text>
<text x="30" y="425" class="code">class State { int a; int b; }</text>
<text x="30" y="445" class="code">AtomicReference<State> ref = new AtomicReference<>();</text>
<text x="20" y="465" class="code" fill="#388e3c">解决2: synchronized 加锁</text>
<text x="30" y="485" class="code">synchronized(this) { a++; b++; }</text>
</svg>

**记忆要点：**
- **ABA 问题** —— 值变了又变回，用版本号解决
- **自旋开销** —— 高竞争下 CPU 空转，用 LongAdder
- **单变量限制** —— 多变量封装成对象或用锁
- **AtomicStampedReference** —— 版本号防 ABA

### 19. 如何解决 ABA 问题？

**解决方案总结：**

**1. AtomicStampedReference（版本号机制）**

**原理：**
- 为每个值关联一个**版本号（stamp）**
- CAS 时同时比较**值和版本号**
- 每次更新版本号递增，即使值相同也能检测到变化

**使用示例：**
```java
// 初始值 100，版本号 0
AtomicStampedReference<Integer> asr =
    new AtomicStampedReference<>(100, 0);

// 读取当前值和版本号
int[] stampHolder = new int[1];
Integer value = asr.get(stampHolder);
int stamp = stampHolder[0];

// CAS 更新：值100→101，版本号0→1
boolean success = asr.compareAndSet(
    100,      // 期望值
    101,      // 新值
    stamp,    // 期望版本号
    stamp+1   // 新版本号
);
```

**完整示例：**
```java
class Example {
    AtomicStampedReference<Integer> money =
        new AtomicStampedReference<>(100, 0);

    // 线程A：转账
    void transfer() {
        int[] stampHolder = new int[1];
        Integer balance = money.get(stampHolder);
        int stamp = stampHolder[0];

        // 模拟业务处理...
        Thread.sleep(1000);

        // CAS 更新
        boolean success = money.compareAndSet(
            balance,
            balance - 50,
            stamp,
            stamp + 1  // 版本号递增
        );
        System.out.println("转账" + (success ? "成功" : "失败"));
    }

    // 线程B：ABA 操作
    void aba() {
        int[] stampHolder = new int[1];
        Integer balance = money.get(stampHolder);
        int stamp = stampHolder[0];

        // 100 → 50
        money.compareAndSet(100, 50, stamp, stamp + 1);
        // 50 → 100 (值变回100，但版本号变了)
        money.compareAndSet(50, 100, stamp + 1, stamp + 2);
    }
}

// 结果：线程A 的 CAS 会失败，因为版本号已改变
```

**2. AtomicMarkableReference（布尔标记）**

**原理：**
- 为值关联一个**布尔标记（mark）**
- 适用于只关心**是否被修改过**，不关心修改了几次

**使用示例：**
```java
AtomicMarkableReference<Integer> amr =
    new AtomicMarkableReference<>(100, false);

// 读取值和标记
boolean[] markHolder = new boolean[1];
Integer value = amr.get(markHolder);
boolean mark = markHolder[0];

// CAS 更新
boolean success = amr.compareAndSet(
    100,     // 期望值
    101,     // 新值
    false,   // 期望标记
    true     // 新标记
);
```

**3. 不可变对象**

**原理：**
- 每次更新创建新对象，而不是修改原对象
- 天然避免 ABA 问题

```java
class ImmutableAccount {
    private final AtomicReference<Account> accountRef;

    static class Account {
        final int balance;
        Account(int balance) { this.balance = balance; }
    }

    void transfer(int amount) {
        for (;;) {
            Account current = accountRef.get();
            Account newAccount = new Account(current.balance - amount);
            if (accountRef.compareAndSet(current, newAccount)) {
                break;  // 每次都是新对象，不存在 ABA
            }
        }
    }
}
```

**对比总结：**

| 方案 | 适用场景 | 优点 | 缺点 |
|------|---------|------|------|
| **AtomicStampedReference** | 需要追踪修改次数 | 精确检测变化 | 版本号可能溢出（实际很少见） |
| **AtomicMarkableReference** | 只关心是否修改过 | 简单 | 信息量少 |
| **不可变对象** | 对象更新不频繁 | 天然线程安全 | 创建对象开销 |

**实际应用建议：**
- **通用场景**：AtomicStampedReference
- **简单标记**：AtomicMarkableReference
- **无 ABA 风险场景**：直接使用 Atomic 系列类（如 AtomicInteger）

**记忆要点：**
- **版本号机制** —— AtomicStampedReference
- **布尔标记** —— AtomicMarkableReference
- **同时比较** —— 值 + 版本号/标记
- **新对象避免ABA** —— 不可变对象模式

## 锁

### 20. 什么是乐观锁和悲观锁？

**定义：**

**悲观锁（Pessimistic Lock）：**
- 假设会发生并发冲突，每次访问数据都会加锁
- **先取锁，再访问**
- 适用于写操作频繁的场景

**乐观锁（Optimistic Lock）：**
- 假设不会发生并发冲突，访问数据时不加锁
- **先修改，提交时检查是否冲突**
- 适用于读操作频繁的场景

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">悲观锁 vs 乐观锁</text>
<rect x="10" y="45" width="330" height="180" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="100" y="70" class="title" fill="#d32f2f">悲观锁 (Pessimistic)</text>
<text x="20" y="95" class="code">核心: 先加锁,再操作</text>
<rect x="30" y="105" width="280" height="30" fill="#ffcdd2" stroke="#d32f2f" stroke-width="1.5"/>
<text x="40" y="125" class="code">1. 获取锁 (阻塞等待)</text>
<line x1="170" y1="135" x2="170" y2="145" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow12)"/>
<rect x="30" y="145" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="40" y="165" class="code">2. 读取/修改数据</text>
<line x1="170" y1="175" x2="170" y2="185" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow12)"/>
<rect x="30" y="185" width="280" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<text x="40" y="205" class="code">3. 释放锁</text>
<rect x="360" y="45" width="330" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="70" class="title" fill="#388e3c">乐观锁 (Optimistic)</text>
<text x="370" y="95" class="code">核心: 先操作,提交时检查</text>
<rect x="380" y="105" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="390" y="125" class="code">1. 读取数据 + 版本号</text>
<line x1="520" y1="135" x2="520" y2="145" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green6)"/>
<rect x="380" y="145" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="390" y="165" class="code">2. 修改数据 (不加锁)</text>
<line x1="520" y1="175" x2="520" y2="185" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green6)"/>
<rect x="380" y="185" width="280" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<text x="390" y="205" class="code">3. CAS提交 (检查版本号)</text>
<rect x="10" y="240" width="330" height="200" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="260" class="title">悲观锁实现</text>
<text x="20" y="285" class="code" fill="#d32f2f">1. synchronized</text>
<text x="20" y="305" class="code" style="fill:#000;">synchronized(lock) {</text>
<text x="30" y="320" class="code" style="fill:#000;">  // 操作数据</text>
<text x="20" y="335" class="code" style="fill:#000;">}</text>
<text x="20" y="360" class="code" fill="#d32f2f">2. ReentrantLock</text>
<text x="20" y="380" class="code" style="fill:#000;">lock.lock();</text>
<text x="20" y="395" class="code" style="fill:#000;">try { /* 操作 */ }</text>
<text x="20" y="410" class="code" style="fill:#000;">finally { lock.unlock(); }</text>
<text x="20" y="430" class="code" fill="#d32f2f">3. 数据库悲观锁</text>
<rect x="350" y="240" width="340" height="200" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="360" y="260" class="title">乐观锁实现</text>
<text x="360" y="285" class="code" fill="#388e3c">1. CAS (AtomicInteger)</text>
<text x="360" y="305" class="code" style="fill:#000;">AtomicInteger count = new AtomicInteger(0);</text>
<text x="360" y="320" class="code" style="fill:#388e3c;">count.incrementAndGet(); // CAS</text>
<text x="360" y="345" class="code" fill="#388e3c">2. 版本号机制</text>
<text x="360" y="365" class="code" style="fill:#000;">UPDATE table SET value=2, version=version+1</text>
<text x="360" y="380" class="code" style="fill:#000;">WHERE id=1 AND version=1;</text>
<text x="360" y="405" class="code" fill="#388e3c">3. 时间戳</text>
<text x="360" y="425" class="code" style="fill:#000;">WHERE id=1 AND update_time='2024-01-01'</text>
<defs>
<marker id="arrow12" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#d32f2f"/></marker>
<marker id="arrow-green6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#388e3c"/></marker>
</defs>
</svg>

**对比总结：**

| 特性 | 悲观锁 | 乐观锁 |
|------|--------|--------|
| **假设** | 会发生冲突 | 不会发生冲突 |
| **策略** | 先加锁再访问 | 先访问再检查 |
| **阻塞** | 会阻塞 | 不阻塞 |
| **性能** | 高并发下性能差 | 高并发下性能好 |
| **适用** | 写多读少 | 读多写少 |
| **实现** | synchronized、Lock | CAS、版本号 |

**使用场景：**

**悲观锁适用：**
- 写操作频繁，冲突概率高
- 数据一致性要求严格
- 例如：银行转账、库存扣减

**乐观锁适用：**
- 读操作频繁，冲突概率低
- 对响应时间要求高
- 例如：缓存更新、统计计数

**记忆要点：**
- **悲观先锁** —— 假设冲突，先加锁
- **乐观后检** —— 假设无冲突，提交时检查
- **写多用悲观** —— 读多用乐观
- **CAS 是乐观锁** —— synchronized 是悲观锁

### 21. 什么是公平锁和非公平锁？

**定义：**

**公平锁（Fair Lock）：**
- 按照线程请求锁的顺序获取锁（FIFO）
- **先来先得**
- 等待时间最长的线程优先获取锁

**非公平锁（Nonfair Lock）：**
- 不保证线程获取锁的顺序
- **抢占式**
- 可能导致某些线程长期得不到锁（饥饿）

<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">公平锁 vs 非公平锁</text>
<rect x="10" y="45" width="330" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="110" y="70" class="title" fill="#1976d2">公平锁 (Fair)</text>
<text x="20" y="90" class="code">核心: FIFO 队列,先来先得</text>
<rect x="30" y="105" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="50" y="125" class="label">持有锁</text>
<rect x="30" y="145" width="80" height="20" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="45" y="160" class="code">线程A</text>
<line x1="70" y1="165" x2="70" y2="175" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow13)"/>
<rect x="30" y="175" width="80" height="20" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="45" y="190" class="code">线程B</text>
<line x1="70" y1="195" x2="70" y2="205" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow13)"/>
<rect x="30" y="205" width="80" height="20" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="45" y="220" class="code">线程C</text>
<text x="120" y="170" class="code" fill="#388e3c">✓ 顺序获取</text>
<text x="120" y="190" class="code" fill="#388e3c">✓ 无饥饿</text>
<text x="120" y="210" class="code" fill="#d32f2f">✗ 吞吐量低</text>
<rect x="360" y="45" width="330" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="440" y="70" class="title" fill="#f57c00">非公平锁 (Nonfair)</text>
<text x="370" y="90" class="code">核心: 抢占式,可能插队</text>
<rect x="380" y="105" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="400" y="125" class="label">持有锁</text>
<rect x="380" y="145" width="80" height="20" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="395" y="160" class="code">线程A</text>
<rect x="380" y="175" width="80" height="20" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="395" y="190" class="code">线程B</text>
<rect x="500" y="105" width="80" height="30" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="515" y="125" class="code">新线程D</text>
<line x1="500" y1="120" x2="460" y2="120" stroke="#d32f2f" stroke-width="3" marker-end="url(#arrow-red4)" stroke-dasharray="5,5"/>
<text x="470" y="110" class="code" fill="#d32f2f">插队!</text>
<text x="485" y="160" class="code" fill="#388e3c">✓ 吞吐量高</text>
<text x="485" y="180" class="code" fill="#d32f2f">✗ 可能饥饿</text>
<rect x="10" y="240" width="330" height="170" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="260" class="title">公平锁示例</text>
<text x="20" y="280" class="code" style="fill:#1976d2;">// ReentrantLock 公平锁</text>
<text x="20" y="300" class="code" style="fill:#000;">Lock lock = new ReentrantLock(true); // true=公平</text>
<text x="20" y="325" class="code" style="fill:#000;">特点:</text>
<text x="30" y="345" class="code">• 线程按申请顺序获取锁</text>
<text x="30" y="365" class="code">• 避免线程饥饿</text>
<text x="30" y="385" class="code">• 需要维护队列,性能略低</text>
<rect x="350" y="240" width="340" height="170" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="360" y="260" class="title">非公平锁示例</text>
<text x="360" y="280" class="code" style="fill:#f57c00;">// ReentrantLock 非公平锁 (默认)</text>
<text x="360" y="300" class="code" style="fill:#000;">Lock lock = new ReentrantLock(); // 默认非公平</text>
<text x="360" y="320" class="code" style="fill:#000;">Lock lock = new ReentrantLock(false); // 显式非公平</text>
<text x="360" y="345" class="code" style="fill:#000;">特点:</text>
<text x="370" y="365" class="code">• 新线程可能直接获取锁</text>
<text x="370" y="385" class="code">• 吞吐量更高</text>
<text x="370" y="405" class="code">• 可能导致线程饥饿</text>
<defs>
<marker id="arrow13" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
<marker id="arrow-red4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#d32f2f"/></marker>
</defs>
</svg>

**实现对比：**

```java
// 1. ReentrantLock - 可选公平/非公平
Lock fairLock = new ReentrantLock(true);     // 公平锁
Lock unfairLock = new ReentrantLock(false);  // 非公平锁（默认）

// 2. synchronized - 非公平锁
synchronized(lock) {
    // 始终是非公平的
}

// 3. ReentrantReadWriteLock - 可选公平/非公平
ReadWriteLock rwLock = new ReentrantReadWriteLock(true); // 公平
```

**性能对比：**

| 指标 | 公平锁 | 非公平锁 |
|------|--------|----------|
| **吞吐量** | 低 | 高 |
| **响应时间** | 稳定 | 不稳定 |
| **饥饿风险** | 无 | 有 |
| **线程切换** | 多 | 少 |

**为什么非公平锁性能更好？**

1. **减少线程切换**：
   - 公平锁：必须唤醒队首线程（可能刚被挂起）
   - 非公平锁：新线程可直接获取锁，避免挂起/唤醒开销

2. **更好的 CPU 缓存利用**：
   - 刚释放锁的线程的数据还在 CPU 缓存中
   - 新线程立即获取锁，可利用热缓存

**使用建议：**

**使用公平锁：**
- 需要严格按顺序处理
- 避免线程饥饿
- 对响应时间稳定性要求高

**使用非公平锁（默认）：**
- 追求高吞吐量
- 允许一定的不公平性
- 大多数场景

**记忆要点：**
- **公平 FIFO** —— 先来先得，队列排队
- **非公平抢占** —— 新线程可插队
- **公平慢但稳** —— 非公平快但可能饥饿
- **默认非公平** —— ReentrantLock 默认非公平

### 22. 什么是共享锁和独占锁？

**定义：**

**独占锁（Exclusive Lock）：**
- 也叫**排他锁、写锁**
- 同一时刻只能有一个线程持有锁
- 其他线程必须等待
- 例如：synchronized、ReentrantLock

**共享锁（Shared Lock）：**
- 也叫**读锁**
- 同一时刻可以被多个线程同时持有
- 适用于读多写少的场景
- 例如：ReentrantReadWriteLock 的读锁

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">独占锁 vs 共享锁</text>
<rect x="10" y="45" width="330" height="180" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="100" y="70" class="title" fill="#d32f2f">独占锁 (Exclusive)</text>
<text x="20" y="90" class="code">核心: 同时只有一个线程持有</text>
<rect x="120" y="105" width="100" height="40" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="145" y="130" class="label">线程A</text>
<text x="130" y="145" class="code" fill="#d32f2f">持有锁</text>
<rect x="40" y="155" width="80" height="30" fill="#e0e0e0" stroke="#666" stroke-width="1.5"/>
<text x="55" y="175" class="code">线程B</text>
<text x="50" y="190" class="code" fill="#666">阻塞</text>
<rect x="200" y="155" width="80" height="30" fill="#e0e0e0" stroke="#666" stroke-width="1.5"/>
<text x="215" y="175" class="code">线程C</text>
<text x="210" y="190" class="code" fill="#666">阻塞</text>
<text x="20" y="215" class="code" fill="#d32f2f">✗ 读读互斥 ✗ 读写互斥 ✗ 写写互斥</text>
<rect x="360" y="45" width="330" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="460" y="70" class="title" fill="#388e3c">共享锁 (Shared)</text>
<text x="370" y="90" class="code">核心: 多个线程可同时持有 (读)</text>
<rect x="380" y="105" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="395" y="125" class="code">线程A 读</text>
<rect x="470" y="105" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="485" y="125" class="code">线程B 读</text>
<rect x="560" y="105" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="575" y="125" class="code">线程C 读</text>
<text x="420" y="150" class="code" fill="#388e3c">同时持有读锁</text>
<rect x="450" y="165" width="100" height="40" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="475" y="190" class="label">线程D 写</text>
<text x="470" y="205" class="code" fill="#d32f2f">阻塞</text>
<text x="370" y="220" class="code" fill="#388e3c">✓ 读读共享 ✗ 读写互斥 ✗ 写写互斥</text>
<rect x="10" y="240" width="680" height="200" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="260" class="title">ReadWriteLock 示例</text>
<text x="20" y="280" class="code" style="fill:#000;">ReadWriteLock rwLock = new ReentrantReadWriteLock();</text>
<text x="20" y="295" class="code" style="fill:#000;">Lock readLock = rwLock.readLock();   // 共享锁</text>
<text x="20" y="310" class="code" style="fill:#000;">Lock writeLock = rwLock.writeLock(); // 独占锁</text>
<text x="20" y="335" class="code" style="fill:#388e3c;">// 读操作 - 可并发</text>
<text x="20" y="355" class="code" style="fill:#000;">readLock.lock();</text>
<text x="20" y="370" class="code" style="fill:#000;">try {</text>
<text x="30" y="385" class="code" style="fill:#388e3c;">  return data; // 多线程可同时读</text>
<text x="20" y="400" class="code" style="fill:#000;">} finally { readLock.unlock(); }</text>
<text x="360" y="335" class="code" style="fill:#d32f2f;">// 写操作 - 独占</text>
<text x="360" y="355" class="code" style="fill:#000;">writeLock.lock();</text>
<text x="360" y="370" class="code" style="fill:#000;">try {</text>
<text x="370" y="385" class="code" style="fill:#d32f2f;">  data = newValue; // 独占写</text>
<text x="360" y="400" class="code" style="fill:#000;">} finally { writeLock.unlock(); }</text>
<text x="360" y="425" class="code" style="fill:#666;">适用: 读多写少的场景</text>
</svg>

**锁的兼容性：**

|  | 读锁 | 写锁 |
|---|------|------|
| **读锁** | ✓ 兼容 | ✗ 互斥 |
| **写锁** | ✗ 互斥 | ✗ 互斥 |

**Java 实现：**

**1. ReentrantReadWriteLock**
```java
class Cache {
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
    private final Map<String, Object> cache = new HashMap<>();

    // 读操作 - 共享锁
    public Object get(String key) {
        rwLock.readLock().lock();
        try {
            return cache.get(key); // 多线程可同时读
        } finally {
            rwLock.readLock().unlock();
        }
    }

    // 写操作 - 独占锁
    public void put(String key, Object value) {
        rwLock.writeLock().lock();
        try {
            cache.put(key, value); // 独占写
        } finally {
            rwLock.writeLock().unlock();
        }
    }
}
```

**2. StampedLock（JDK 8+）**
```java
class Point {
    private final StampedLock sl = new StampedLock();
    private double x, y;

    // 乐观读
    double distanceFromOrigin() {
        long stamp = sl.tryOptimisticRead(); // 乐观读
        double currentX = x, currentY = y;
        if (!sl.validate(stamp)) { // 检查是否被写
            stamp = sl.readLock(); // 升级为悲观读
            try {
                currentX = x;
                currentY = y;
            } finally {
                sl.unlockRead(stamp);
            }
        }
        return Math.sqrt(currentX * currentX + currentY * currentY);
    }

    // 写锁
    void move(double deltaX, double deltaY) {
        long stamp = sl.writeLock();
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            sl.unlockWrite(stamp);
        }
    }
}
```

**性能对比：**

| 场景 | 独占锁 | 读写锁 |
|------|--------|--------|
| **读多写少** | 慢（读读也互斥） | 快（读读共享） |
| **写多读少** | 适中 | 慢（锁升级开销） |
| **读写均衡** | 适中 | 适中 |

**记忆要点：**
- **独占排他** —— 同时只有一个线程
- **共享并发** —— 多个线程可同时读
- **读读共享** —— 读写、写写互斥
- **读多用读写锁** —— 写多用独占锁

### 23. 什么是自旋锁？

**定义：**
自旋锁（Spin Lock）是指线程在获取锁失败时，不立即阻塞，而是**循环检查锁是否释放**，直到获取锁成功。

**核心思想：**
- 用 **CPU 时间换取阻塞/唤醒的开销**
- 适用于锁持有时间很短的场景
- 避免线程上下文切换

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">自旋锁 vs 阻塞锁</text>
<rect x="10" y="45" width="330" height="160" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="110" y="70" class="title" fill="#f57c00">自旋锁 (Spin Lock)</text>
<text x="20" y="90" class="code">核心: 循环检查,不阻塞</text>
<rect x="30" y="105" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="40" y="125" class="code">尝试获取锁</text>
<line x1="285" y1="120" x2="310" y2="120" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow14)"/>
<text x="290" y="115" class="code" fill="#d32f2f">失败</text>
<line x1="310" y1="120" x2="310" y2="150" stroke="#f57c00" stroke-width="2"/>
<line x1="310" y1="150" x2="25" y2="150" stroke="#f57c00" stroke-width="2"/>
<line x1="25" y1="150" x2="25" y2="120" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange7)"/>
<text x="120" y="165" class="code" fill="#f57c00">循环重试 (自旋)</text>
<text x="20" y="190" class="code" fill="#388e3c">✓ 无上下文切换</text>
<text x="180" y="190" class="code" fill="#d32f2f">✗ CPU空转</text>
<rect x="360" y="45" width="330" height="160" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="70" class="title" fill="#1976d2">阻塞锁 (Blocking)</text>
<text x="370" y="90" class="code">核心: 获取失败则阻塞</text>
<rect x="380" y="105" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="390" y="125" class="code">尝试获取锁</text>
<line x1="520" y1="135" x2="520" y2="145" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow-blue4)"/>
<text x="530" y="143" class="code" fill="#d32f2f">失败</text>
<rect x="380" y="145" width="280" height="30" fill="#e0e0e0" stroke="#666" stroke-width="1.5"/>
<text x="390" y="165" class="code">线程阻塞 (挂起)</text>
<text x="370" y="190" class="code" fill="#388e3c">✓ 不占CPU</text>
<text x="520" y="190" class="code" fill="#d32f2f">✗ 上下文切换</text>
<rect x="10" y="220" width="680" height="170" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="240" class="title">自旋锁实现</text>
<text x="20" y="260" class="code" style="fill:#f57c00;">// 简单自旋锁实现</text>
<text x="20" y="280" class="code" style="fill:#000;">class SpinLock {</text>
<text x="30" y="295" class="code" style="fill:#000;">  private AtomicReference<Thread> owner = new AtomicReference<>();</text>
<text x="30" y="315" class="code" style="fill:#000;">  public void lock() {</text>
<text x="40" y="330" class="code" style="fill:#000;">    Thread current = Thread.currentThread();</text>
<text x="40" y="345" class="code" style="fill:#f57c00;">    while (!owner.compareAndSet(null, current)) {</text>
<text x="50" y="360" class="code" style="fill:#f57c00;">      // 自旋等待 (空循环)</text>
<text x="40" y="375" class="code" style="fill:#000;">    }</text>
<text x="30" y="385" class="code" style="fill:#000;">  }</text>
<defs>
<marker id="arrow14" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
<marker id="arrow-orange7" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
<marker id="arrow-blue4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
</defs>
</svg>

**自旋锁的优化：**

**1. 限制自旋次数**
```java
// 自适应自旋
int retries = 0;
while (!tryLock()) {
    if (++retries > MAX_RETRIES) {
        // 超过次数，改为阻塞
        park();
        break;
    }
}
```

**2. 自适应自旋（JDK 6+）**
- 根据上次自旋成功率动态调整自旋次数
- 上次成功 → 增加自旋次数
- 上次失败 → 减少自旋次数

**3. 退避策略**
```java
// 指数退避
int delay = 1;
while (!tryLock()) {
    Thread.sleep(delay);
    delay *= 2; // 逐渐增加等待时间
    if (delay > MAX_DELAY) delay = MAX_DELAY;
}
```

**Java 中的自旋锁：**

**1. synchronized 的轻量级锁**
- 使用 CAS 自旋获取锁
- 默认自旋 10 次（-XX:PreBlockSpin）
- 失败后升级为重量级锁

**2. AtomicXxx 的 CAS 循环**
```java
// AtomicInteger 的自旋
public final int incrementAndGet() {
    for (;;) { // 无限自旋
        int current = get();
        int next = current + 1;
        if (compareAndSet(current, next)) {
            return next; // 成功退出
        }
        // 失败继续自旋
    }
}
```

**优缺点：**

**优点：**
- **无线程切换开销**：避免用户态/内核态切换
- **响应快**：适合短临界区
- **简单**：实现简单

**缺点：**
- **CPU 空转**：浪费 CPU 资源
- **不公平**：可能导致饥饿
- **不适合长临界区**：自旋时间长

**使用场景：**

**适用：**
- 锁持有时间很短（微秒级）
- CPU 核心数多（单核自旋无意义）
- 锁竞争不激烈

**不适用：**
- 锁持有时间长
- 高竞争场景
- 单核 CPU

**记忆要点：**
- **自旋循环等** —— 不阻塞，用 CPU 换时间
- **适合短临界区** —— 锁持有时间短
- **限制自旋次数** —— 避免无限空转
- **轻量级锁用自旋** —— synchronized 优化之一

### 24. ReentrantLock 的实现原理？

**核心原理：**
ReentrantLock 基于 **AQS（AbstractQueuedSynchronizer）**实现，通过 CAS + 队列实现锁的获取和释放。

**关键组件：**

1. **AQS 的 state 字段**
   - state = 0：锁未被占用
   - state > 0：锁被占用，值为重入次数

2. **同步队列（CLH 队列）**
   - 等待锁的线程组成的双向链表
   - 公平锁按 FIFO 顺序获取

3. **独占模式**
   - 同一时刻只有一个线程持有锁

<svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">ReentrantLock 实现原理</text>
<rect x="10" y="45" width="680" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">AQS 同步队列 (CLH)</text>
<rect x="30" y="80" width="100" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="55" y="100" class="label">Head</text>
<text x="45" y="115" class="code">哨兵节点</text>
<line x1="130" y1="105" x2="160" y2="105" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow15)"/>
<rect x="160" y="80" width="100" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="180" y="100" class="label">Thread-1</text>
<text x="170" y="115" class="code">WAITING</text>
<line x1="260" y1="105" x2="290" y2="105" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow15)"/>
<rect x="290" y="80" width="100" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="310" y="100" class="label">Thread-2</text>
<text x="300" y="115" class="code">WAITING</text>
<line x1="390" y1="105" x2="420" y2="105" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow15)"/>
<rect x="420" y="80" width="100" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="440" y="100" class="label">Thread-3</text>
<text x="430" y="115" class="code">WAITING</text>
<line x1="520" y1="105" x2="550" y2="105" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow15)"/>
<rect x="550" y="80" width="100" height="50" fill="#e0e0e0" stroke="#666" stroke-width="1"/>
<text x="580" y="110" class="label">Tail</text>
<text x="30" y="155" class="code">持有锁的线程: Thread-0 (state=1)</text>
<text x="30" y="175" class="code">等待队列: 按顺序唤醒</text>
<text x="30" y="195" class="code" fill="#1976d2">公平锁: 严格按队列顺序</text>
<text x="30" y="215" class="code" fill="#f57c00">非公平锁: 新线程可插队</text>
<rect x="10" y="260" width="330" height="250" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="280" class="title">加锁流程 lock()</text>
<text x="20" y="305" class="code" style="fill:#388e3c;">1. CAS 尝试获取锁</text>
<text x="30" y="325" class="code">if (CAS(state, 0, 1)) {</text>
<text x="40" y="340" class="code">  setOwner(currentThread);</text>
<text x="40" y="355" class="code">  return; // 成功</text>
<text x="30" y="370" class="code">}</text>
<text x="20" y="395" class="code" style="fill:#f57c00;">2. 已持有锁 - 重入</text>
<text x="30" y="415" class="code">if (owner == currentThread) {</text>
<text x="40" y="430" class="code">  state++; // 重入计数</text>
<text x="40" y="445" class="code">  return;</text>
<text x="30" y="460" class="code">}</text>
<text x="20" y="485" class="code" style="fill:#d32f2f;">3. 加入等待队列</text>
<text x="30" y="505" class="code">enqueue() + park(); // 阻塞</text>
<rect x="350" y="260" width="340" height="250" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="360" y="280" class="title">释放锁流程 unlock()</text>
<text x="360" y="305" class="code" style="fill:#388e3c;">1. 减少重入计数</text>
<text x="370" y="325" class="code">int c = state - 1;</text>
<text x="370" y="340" class="code">if (owner != currentThread) {</text>
<text x="380" y="355" class="code">  throw new IllegalMonitorStateException();</text>
<text x="370" y="370" class="code">}</text>
<text x="360" y="395" class="code" style="fill:#1976d2;">2. 完全释放锁</text>
<text x="370" y="415" class="code">if (c == 0) {</text>
<text x="380" y="430" class="code">  setOwner(null);</text>
<text x="380" y="445" class="code">  state = 0;</text>
<text x="380" y="460" class="code" fill="#388e3c">  unparkSuccessor(); // 唤醒后继</text>
<text x="370" y="475" class="code">}</text>
<text x="360" y="500" class="code" style="fill:#666;">state > 0 时不释放,继续持有</text>
<defs>
<marker id="arrow15" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
</defs>
</svg>

**核心源码分析：**

```java
public class ReentrantLock {
    private final Sync sync;

    // 内部类 - 基于 AQS
    abstract static class Sync extends AbstractQueuedSynchronizer {
        // 加锁
        final boolean tryAcquire(int acquires) {
            Thread current = Thread.currentThread();
            int c = getState();

            // 1. 锁未被占用
            if (c == 0) {
                // 公平锁: 检查队列是否有人等待
                // 非公平锁: 直接 CAS
                if (compareAndSetState(0, acquires)) {
                    setExclusiveOwnerThread(current);
                    return true;
                }
            }
            // 2. 重入
            else if (current == getExclusiveOwnerThread()) {
                int nextc = c + acquires;
                setState(nextc);
                return true;
            }
            return false;
        }

        // 释放锁
        protected final boolean tryRelease(int releases) {
            int c = getState() - releases;
            if (Thread.currentThread() != getExclusiveOwnerThread())
                throw new IllegalMonitorStateException();

            boolean free = false;
            if (c == 0) {
                free = true;
                setExclusiveOwnerThread(null);
            }
            setState(c);
            return free;
        }
    }

    // 公平锁实现
    static final class FairSync extends Sync {
        final boolean tryAcquire(int acquires) {
            if (hasQueuedPredecessors()) // 检查队列
                return false;
            // ... CAS 获取锁
        }
    }

    // 非公平锁实现
    static final class NonfairSync extends Sync {
        final boolean tryAcquire(int acquires) {
            // 直接 CAS，不检查队列
            return nonfairTryAcquire(acquires);
        }
    }
}
```

**公平锁 vs 非公平锁实现差异：**

| 特性 | 公平锁 | 非公平锁 |
|------|--------|----------|
| **获取锁** | 先检查队列 `hasQueuedPredecessors()` | 直接 CAS |
| **性能** | 较慢 | 较快 |
| **默认** | false | true |

**记忆要点：**
- **基于 AQS** —— state 表示重入次数
- **CLH 队列** —— 等待线程的双向链表
- **可重入** —— state 计数 +1/-1
- **公平/非公平** —— 是否检查队列

### 25. ReentrantReadWriteLock 的实现原理？

**核心原理：**
ReentrantReadWriteLock 使用**一个 int 型 state 字段**同时表示读锁和写锁的状态。

**state 的巧妙设计：**
- **高 16 位**：读锁持有次数
- **低 16 位**：写锁重入次数

<svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="180" y="25" class="title">ReentrantReadWriteLock 实现原理</text>
<rect x="10" y="45" width="680" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">state 字段设计 (32位 int)</text>
<rect x="50" y="80" width="300" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="140" y="100" class="label">高 16 位</text>
<text x="120" y="120" class="code">读锁持有次数 (共享)</text>
<rect x="350" y="80" width="300" height="50" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="440" y="100" class="label">低 16 位</text>
<text x="420" y="120" class="code">写锁重入次数 (独占)</text>
<text x="20" y="155" class="code">读锁数 = state >>> 16  |  写锁数 = state & 0xFFFF</text>
<rect x="10" y="180" width="330" height="290" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="200" class="title">读锁 (共享锁)</text>
<text x="20" y="225" class="code" style="fill:#388e3c;">获取读锁:</text>
<text x="30" y="245" class="code">1. 检查是否有写锁</text>
<text x="40" y="260" class="code">if (写锁被占用 && 持有者!=当前线程)</text>
<text x="50" y="275" class="code">  阻塞;</text>
<text x="30" y="295" class="code">2. CAS 增加读锁计数</text>
<text x="40" y="310" class="code">state += (1 << 16); // 高16位+1</text>
<text x="30" y="330" class="code">3. 记录线程重入次数</text>
<text x="40" y="345" class="code">ThreadLocal 记录当前线程读锁数</text>
<text x="20" y="370" class="code" style="fill:#1976d2;">释放读锁:</text>
<text x="30" y="390" class="code">1. 减少读锁计数</text>
<text x="40" y="405" class="code">state -= (1 << 16); // 高16位-1</text>
<text x="30" y="425" class="code">2. 最后一个读线程唤醒写线程</text>
<text x="40" y="440" class="code">if (读锁数 == 0)</text>
<text x="50" y="455" class="code">  unparkSuccessor(); // 唤醒写</text>
<rect x="350" y="180" width="340" height="290" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="360" y="200" class="title">写锁 (独占锁)</text>
<text x="360" y="225" class="code" style="fill:#d32f2f;">获取写锁:</text>
<text x="370" y="245" class="code">1. 检查读锁和写锁</text>
<text x="380" y="260" class="code">if (state != 0) { // 有锁</text>
<text x="390" y="275" class="code">  if (读锁数 > 0) 阻塞; // 有读</text>
<text x="390" y="290" class="code">  if (写锁被其他线程占用) 阻塞;</text>
<text x="380" y="305" class="code">}</text>
<text x="370" y="325" class="code">2. CAS 获取写锁</text>
<text x="380" y="340" class="code">state += 1; // 低16位+1</text>
<text x="370" y="360" class="code">3. 锁降级支持</text>
<text x="380" y="375" class="code">持有写锁时可获取读锁</text>
<text x="360" y="400" class="code" style="fill:#1976d2;">释放写锁:</text>
<text x="370" y="420" class="code">1. 减少写锁计数</text>
<text x="380" y="435" class="code">state -= 1; // 低16位-1</text>
<text x="370" y="455" class="code">2. 完全释放时唤醒等待线程</text>
</svg>

**核心源码分析：**

```java
abstract static class Sync extends AbstractQueuedSynchronizer {
    static final int SHARED_SHIFT   = 16;
    static final int SHARED_UNIT    = (1 << SHARED_SHIFT); // 0x10000
    static final int MAX_COUNT      = (1 << SHARED_SHIFT) - 1; // 0xFFFF
    static final int EXCLUSIVE_MASK = (1 << SHARED_SHIFT) - 1; // 0xFFFF

    // 读锁持有次数
    static int sharedCount(int c)    { return c >>> SHARED_SHIFT; }
    // 写锁持有次数
    static int exclusiveCount(int c) { return c & EXCLUSIVE_MASK; }

    // 获取写锁
    protected final boolean tryAcquire(int acquires) {
        Thread current = Thread.currentThread();
        int c = getState();
        int w = exclusiveCount(c); // 写锁数

        if (c != 0) {
            // 有读锁 或 写锁被其他线程占用
            if (w == 0 || current != getExclusiveOwnerThread())
                return false;
            // 写锁重入
            setState(c + acquires);
            return true;
        }
        // CAS 获取写锁
        if (compareAndSetState(c, c + acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
        return false;
    }

    // 获取读锁
    protected final int tryAcquireShared(int acquires) {
        Thread current = Thread.currentThread();
        int c = getState();

        // 写锁被其他线程占用
        if (exclusiveCount(c) != 0 &&
            getExclusiveOwnerThread() != current)
            return -1;

        int r = sharedCount(c);
        // CAS 增加读锁
        if (compareAndSetState(c, c + SHARED_UNIT)) {
            // 记录线程读锁重入次数（ThreadLocal）
            return 1;
        }
        return -1;
    }
}
```

**锁降级示例：**

```java
class CachedData {
    Object data;
    volatile boolean cacheValid;
    final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();

    void processCachedData() {
        rwl.readLock().lock();
        if (!cacheValid) {
            // 必须先释放读锁
            rwl.readLock().unlock();

            // 获取写锁
            rwl.writeLock().lock();
            try {
                if (!cacheValid) {
                    data = loadData();
                    cacheValid = true;
                }
                // 锁降级：持有写锁的同时获取读锁
                rwl.readLock().lock();
            } finally {
                rwl.writeLock().unlock(); // 释放写锁，保留读锁
            }
        }

        try {
            use(data);
        } finally {
            rwl.readLock().unlock();
        }
    }
}
```

**为什么支持锁降级，不支持锁升级？**

- **锁降级**（写→读）：✓ 支持
  - 持有写锁时，可以获取读锁
  - 保证数据一致性

- **锁升级**（读→写）：✗ 不支持
  - 会导致死锁
  - 多个读线程同时升级，互相等待

**记忆要点：**
- **state 分两半** —— 高 16 位读，低 16 位写
- **读共享写独占** —— 读读可并发
- **支持锁降级** —— 写→读，防止数据不一致
- **不支持锁升级** —— 读→写会死锁

### 26. StampedLock 是什么？

**定义：**
StampedLock 是 JDK 8 引入的高性能锁，提供三种锁模式：**写锁、悲观读锁、乐观读**。

**核心特性：**
- **乐观读（Optimistic Read）**：不加锁，读后验证
- **比 ReadWriteLock 更快**：读操作几乎无锁开销
- **不可重入**：与 ReentrantLock 不同

<svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">StampedLock 三种模式</text>
<rect x="10" y="45" width="220" height="150" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="70" y="70" class="title" fill="#d32f2f">写锁 (Write)</text>
<text x="20" y="95" class="code">独占锁</text>
<text x="20" y="115" class="code">与读锁互斥</text>
<text x="20" y="140" class="code" style="fill:#388e3c;">✓ 保证独占写</text>
<text x="20" y="160" class="code" style="fill:#d32f2f;">✗ 阻塞所有读</text>
<text x="20" y="180" class="code">stamp = lock.writeLock()</text>
<rect x="240" y="45" width="220" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="280" y="70" class="title" fill="#1976d2">悲观读 (Read)</text>
<text x="250" y="95" class="code">共享锁</text>
<text x="250" y="115" class="code">与写锁互斥</text>
<text x="250" y="140" class="code" style="fill:#388e3c;">✓ 读读并发</text>
<text x="250" y="160" class="code" style="fill:#d32f2f;">✗ 阻塞写</text>
<text x="250" y="180" class="code">stamp = lock.readLock()</text>
<rect x="470" y="45" width="220" height="150" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="500" y="70" class="title" fill="#388e3c">乐观读 (Optimistic)</text>
<text x="480" y="95" class="code">不加锁</text>
<text x="480" y="115" class="code">读后验证</text>
<text x="480" y="140" class="code" style="fill:#388e3c;">✓ 性能最高</text>
<text x="480" y="160" class="code" style="fill:#f57c00;">⚠ 需验证</text>
<text x="480" y="180" class="code">stamp = tryOptimisticRead()</text>
<rect x="10" y="210" width="680" height="280" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="230" class="title">使用示例</text>
<text x="20" y="255" class="code" style="fill:#000;">class Point {</text>
<text x="30" y="270" class="code" style="fill:#000;">  private final StampedLock sl = new StampedLock();</text>
<text x="30" y="285" class="code" style="fill:#000;">  private double x, y;</text>
<text x="30" y="310" class="code" style="fill:#388e3c;">  // 乐观读 - 高性能</text>
<text x="30" y="330" class="code" style="fill:#000;">  double distanceFromOrigin() {</text>
<text x="40" y="345" class="code" style="fill:#388e3c;">    long stamp = sl.tryOptimisticRead(); // 乐观读</text>
<text x="40" y="360" class="code" style="fill:#000;">    double currentX = x, currentY = y;</text>
<text x="40" y="375" class="code" style="fill:#f57c00;">    if (!sl.validate(stamp)) { // 验证</text>
<text x="50" y="390" class="code" style="fill:#1976d2;">      stamp = sl.readLock(); // 升级为悲观读</text>
<text x="50" y="405" class="code" style="fill:#000;">      try {</text>
<text x="60" y="420" class="code" style="fill:#000;">        currentX = x; currentY = y;</text>
<text x="50" y="435" class="code" style="fill:#000;">      } finally { sl.unlockRead(stamp); }</text>
<text x="40" y="450" class="code" style="fill:#000;">    }</text>
<text x="40" y="465" class="code" style="fill:#000;">    return Math.sqrt(currentX * currentX + currentY * currentY);</text>
<text x="30" y="480" class="code" style="fill:#000;">  }</text>
</svg>

**完整示例：**

```java
class Point {
    private final StampedLock sl = new StampedLock();
    private double x, y;

    // 乐观读
    double distanceFromOrigin() {
        long stamp = sl.tryOptimisticRead(); // 获取乐观读戳
        double currentX = x, currentY = y;    // 读取数据

        if (!sl.validate(stamp)) {            // 验证是否被写
            stamp = sl.readLock();            // 升级为悲观读
            try {
                currentX = x;
                currentY = y;
            } finally {
                sl.unlockRead(stamp);
            }
        }
        return Math.sqrt(currentX * currentX + currentY * currentY);
    }

    // 悲观读
    double[] read() {
        long stamp = sl.readLock();
        try {
            return new double[]{x, y};
        } finally {
            sl.unlockRead(stamp);
        }
    }

    // 写锁
    void move(double deltaX, double deltaY) {
        long stamp = sl.writeLock();
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            sl.unlockWrite(stamp);
        }
    }

    // 锁升级：悲观读 → 写
    void moveIfAtOrigin(double newX, double newY) {
        long stamp = sl.readLock();
        try {
            while (x == 0.0 && y == 0.0) {
                long ws = sl.tryConvertToWriteLock(stamp); // 尝试升级
                if (ws != 0L) {
                    stamp = ws;
                    x = newX;
                    y = newY;
                    break;
                } else {
                    sl.unlockRead(stamp);
                    stamp = sl.writeLock(); // 重新获取写锁
                }
            }
        } finally {
            sl.unlock(stamp);
        }
    }
}
```

**StampedLock vs ReadWriteLock：**

| 特性 | StampedLock | ReadWriteLock |
|------|-------------|---------------|
| **乐观读** | ✓ 支持 | ✗ 不支持 |
| **性能** | 更快 | 较慢 |
| **可重入** | ✗ 不支持 | ✓ 支持 |
| **Condition** | ✗ 不支持 | ✓ 支持 |
| **锁升级** | ✓ 支持 | ✗ 不支持 |

**注意事项：**

1. **不可重入**
```java
StampedLock lock = new StampedLock();
long stamp = lock.writeLock();
lock.writeLock(); // 死锁！不可重入
```

2. **不支持 Condition**
```java
// ✗ StampedLock 没有 newCondition()
```

3. **适用场景**
   - 读多写少
   - 读操作很快
   - 不需要可重入

**记忆要点：**
- **三种模式** —— 写锁、悲观读、乐观读
- **乐观读最快** —— 不加锁，读后验证
- **不可重入** —— 与 ReentrantLock 不同
- **读多写少** —— 性能优于 ReadWriteLock

## AQS

### 27. 什么是 AQS？

**定义：**
AQS（AbstractQueuedSynchronizer，抽象队列同步器）是 JUC 包的**核心基础框架**，用于构建锁和同步器。

**核心思想：**
- **模板方法模式**：定义同步器框架，子类实现具体逻辑
- **状态管理**：维护同步状态（state）
- **等待队列**：管理等待线程的 FIFO 队列

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="250" y="25" class="title">AQS 核心组件</text>
<rect x="10" y="45" width="680" height="160" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">1. 核心字段</text>
<rect x="30" y="80" width="200" height="40" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<text x="40" y="105" class="code">volatile int state</text>
<text x="40" y="120" class="code" fill="#666">同步状态</text>
<rect x="250" y="80" width="200" height="40" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="260" y="105" class="code">Node head, tail</text>
<text x="260" y="120" class="code" fill="#666">等待队列头尾</text>
<rect x="470" y="80" width="200" height="40" fill="#ffcdd2" stroke="#d32f2f" stroke-width="1.5"/>
<text x="480" y="105" class="code">Thread exclusiveOwnerThread</text>
<text x="480" y="120" class="code" fill="#666">独占线程</text>
<text x="20" y="145" class="code">• state=0: 未锁定  state>0: 已锁定/重入次数</text>
<text x="20" y="165" class="code">• head/tail: CLH 队列头尾节点</text>
<text x="20" y="185" class="code">• exclusiveOwnerThread: 当前持有锁的线程</text>
<rect x="10" y="220" width="330" height="220" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="240" class="title">2. 模板方法 (子类实现)</text>
<text x="20" y="265" class="code" style="fill:#388e3c;">独占模式:</text>
<text x="30" y="285" class="code">• tryAcquire(int arg)</text>
<text x="40" y="300" class="code" fill="#666">尝试获取锁</text>
<text x="30" y="320" class="code">• tryRelease(int arg)</text>
<text x="40" y="335" class="code" fill="#666">尝试释放锁</text>
<text x="20" y="360" class="code" style="fill:#1976d2;">共享模式:</text>
<text x="30" y="380" class="code">• tryAcquireShared(int arg)</text>
<text x="40" y="395" class="code" fill="#666">尝试获取共享锁</text>
<text x="30" y="415" class="code">• tryReleaseShared(int arg)</text>
<text x="40" y="430" class="code" fill="#666">尝试释放共享锁</text>
<rect x="350" y="220" width="340" height="220" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="360" y="240" class="title">3. 框架方法 (AQS 实现)</text>
<text x="360" y="265" class="code" style="fill:#388e3c;">获取锁:</text>
<text x="370" y="285" class="code">• acquire(int arg)</text>
<text x="380" y="300" class="code" fill="#666">独占获取,失败入队</text>
<text x="370" y="320" class="code">• acquireShared(int arg)</text>
<text x="380" y="335" class="code" fill="#666">共享获取</text>
<text x="360" y="360" class="code" style="fill:#1976d2;">释放锁:</text>
<text x="370" y="380" class="code">• release(int arg)</text>
<text x="380" y="395" class="code" fill="#666">独占释放,唤醒后继</text>
<text x="370" y="415" class="code">• releaseShared(int arg)</text>
<text x="380" y="430" class="code" fill="#666">共享释放</text>
</svg>

**AQS 的两种模式：**

**1. 独占模式（Exclusive）**
- 同一时刻只有一个线程持有锁
- 例如：ReentrantLock

**2. 共享模式（Shared）**
- 同一时刻可以有多个线程持有锁
- 例如：Semaphore、CountDownLatch、ReentrantReadWriteLock 的读锁

**核心方法：**

```java
public abstract class AbstractQueuedSynchronizer {
    // 同步状态
    private volatile int state;

    // 模板方法 - 子类实现
    protected boolean tryAcquire(int arg) {
        throw new UnsupportedOperationException();
    }

    protected boolean tryRelease(int arg) {
        throw new UnsupportedOperationException();
    }

    protected int tryAcquireShared(int arg) {
        throw new UnsupportedOperationException();
    }

    protected boolean tryReleaseShared(int arg) {
        throw new UnsupportedOperationException();
    }

    // 框架方法 - AQS 实现
    public final void acquire(int arg) {
        if (!tryAcquire(arg))
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg);
    }

    public final boolean release(int arg) {
        if (tryRelease(arg)) {
            unparkSuccessor(head);
            return true;
        }
        return false;
    }
}
```

**使用 AQS 自定义锁示例：**

```java
class Mutex {
    private static class Sync extends AbstractQueuedSynchronizer {
        // 是否被独占
        protected boolean isHeldExclusively() {
            return getState() == 1;
        }

        // 尝试获取锁
        public boolean tryAcquire(int acquires) {
            if (compareAndSetState(0, 1)) {
                setExclusiveOwnerThread(Thread.currentThread());
                return true;
            }
            return false;
        }

        // 尝试释放锁
        protected boolean tryRelease(int releases) {
            if (getState() == 0)
                throw new IllegalMonitorStateException();
            setExclusiveOwnerThread(null);
            setState(0);
            return true;
        }
    }

    private final Sync sync = new Sync();

    public void lock()   { sync.acquire(1); }
    public void unlock() { sync.release(1); }
}
```

**记忆要点：**
- **同步器基础框架** —— JUC 的核心
- **state + 队列** —— 状态 + CLH 队列
- **模板方法** —— 子类实现 try 方法
- **两种模式** —— 独占和共享

### 28. AQS 的实现原理？

**核心原理：**
AQS 使用 **CAS + volatile state + CLH 队列**实现同步。

**1. CLH 队列（双向链表）**

CLH（Craig, Landin, and Hagersten）队列是一个虚拟的双向队列，用于管理等待线程。

<svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">AQS 实现原理</text>
<rect x="10" y="45" width="680" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">CLH 队列结构</text>
<rect x="30" y="80" width="100" height="70" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="55" y="105" class="label">Head</text>
<text x="40" y="125" class="code">thread=null</text>
<text x="40" y="140" class="code" fill="#666">哨兵节点</text>
<line x1="130" y1="115" x2="160" y2="115" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow16)"/>
<line x1="160" y1="115" x2="130" y2="105" stroke="#666" stroke-width="1" marker-end="url(#arrow-gray)"/>
<rect x="160" y="80" width="100" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="180" y="105" class="label">Node</text>
<text x="170" y="125" class="code">Thread-1</text>
<text x="170" y="140" class="code" fill="#f57c00">SIGNAL</text>
<line x1="260" y1="115" x2="290" y2="115" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow16)"/>
<line x1="290" y1="115" x2="260" y2="105" stroke="#666" stroke-width="1" marker-end="url(#arrow-gray)"/>
<rect x="290" y="80" width="100" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="310" y="105" class="label">Node</text>
<text x="300" y="125" class="code">Thread-2</text>
<text x="300" y="140" class="code" fill="#f57c00">SIGNAL</text>
<line x1="390" y1="115" x2="420" y2="115" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow16)"/>
<line x1="420" y1="115" x2="390" y2="105" stroke="#666" stroke-width="1" marker-end="url(#arrow-gray)"/>
<rect x="420" y="80" width="100" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="440" y="105" class="label">Tail</text>
<text x="430" y="125" class="code">Thread-3</text>
<text x="430" y="140" class="code" fill="#f57c00">SIGNAL</text>
<text x="30" y="170" class="code">waitStatus:</text>
<text x="30" y="190" class="code">0=初始  SIGNAL=-1=需唤醒后继  CANCELLED=1=已取消</text>
<text x="30" y="210" class="code">CONDITION=-2=在条件队列  PROPAGATE=-3=共享传播</text>
<rect x="10" y="260" width="330" height="250" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="280" class="title">独占获取流程 acquire()</text>
<text x="20" y="305" class="code" style="fill:#388e3c;">1. 尝试获取</text>
<text x="30" y="325" class="code">if (tryAcquire(arg)) return;</text>
<text x="20" y="350" class="code" style="fill:#f57c00;">2. 入队</text>
<text x="30" y="370" class="code">Node node = addWaiter(EXCLUSIVE);</text>
<text x="30" y="385" class="code">// CAS 插入队尾</text>
<text x="20" y="410" class="code" style="fill:#1976d2;">3. 自旋 + park</text>
<text x="30" y="430" class="code">for (;;) {</text>
<text x="40" y="445" class="code">  if (前驱是head && tryAcquire())</text>
<text x="50" y="460" class="code">    return; // 获取成功</text>
<text x="40" y="475" class="code">  park(); // 阻塞</text>
<text x="30" y="490" class="code">}</text>
<rect x="350" y="260" width="340" height="250" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="360" y="280" class="title">独占释放流程 release()</text>
<text x="360" y="305" class="code" style="fill:#388e3c;">1. 尝试释放</text>
<text x="370" y="325" class="code">if (!tryRelease(arg)) return false;</text>
<text x="360" y="350" class="code" style="fill:#1976d2;">2. 唤醒后继节点</text>
<text x="370" y="370" class="code">Node h = head;</text>
<text x="370" y="385" class="code">if (h != null && h.waitStatus != 0) {</text>
<text x="380" y="400" class="code">  Node s = h.next; // 后继节点</text>
<text x="380" y="415" class="code">  if (s != null && s.waitStatus <= 0)</text>
<text x="390" y="430" class="code" fill="#388e3c">    unpark(s.thread); // 唤醒</text>
<text x="370" y="445" class="code">}</text>
<text x="360" y="470" class="code" style="fill:#666;">关键点:</text>
<text x="370" y="490" class="code">• 只有前驱是 head 才尝试获取</text>
<text x="370" y="505" class="code">• 保证 FIFO (公平锁)</text>
<defs>
<marker id="arrow16" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
<marker id="arrow-gray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker>
</defs>
</svg>

**核心源码分析：**

```java
public abstract class AbstractQueuedSynchronizer {
    // Node 节点定义
    static final class Node {
        volatile Node prev;       // 前驱
        volatile Node next;       // 后继
        volatile Thread thread;   // 线程
        volatile int waitStatus;  // 等待状态

        static final int CANCELLED =  1;  // 取消
        static final int SIGNAL    = -1;  // 需要唤醒后继
        static final int CONDITION = -2;  // 在条件队列
        static final int PROPAGATE = -3;  // 共享传播
    }

    // 独占获取
    public final void acquire(int arg) {
        if (!tryAcquire(arg) &&
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
            selfInterrupt();
    }

    // 入队
    private Node addWaiter(Node mode) {
        Node node = new Node(Thread.currentThread(), mode);
        // CAS 快速入队
        Node pred = tail;
        if (pred != null) {
            node.prev = pred;
            if (compareAndSetTail(pred, node)) {
                pred.next = node;
                return node;
            }
        }
        enq(node); // 完整入队逻辑（自旋）
        return node;
    }

    // 自旋获取锁
    final boolean acquireQueued(final Node node, int arg) {
        boolean failed = true;
        try {
            boolean interrupted = false;
            for (;;) {  // 自旋
                final Node p = node.predecessor();
                // 前驱是 head 且获取成功
                if (p == head && tryAcquire(arg)) {
                    setHead(node);  // 设为新 head
                    p.next = null;  // help GC
                    failed = false;
                    return interrupted;
                }
                // 检查是否需要 park
                if (shouldParkAfterFailedAcquire(p, node) &&
                    parkAndCheckInterrupt())
                    interrupted = true;
            }
        } finally {
            if (failed)
                cancelAcquire(node);
        }
    }

    // 释放锁
    public final boolean release(int arg) {
        if (tryRelease(arg)) {
            Node h = head;
            if (h != null && h.waitStatus != 0)
                unparkSuccessor(h);  // 唤醒后继
            return true;
        }
        return false;
    }

    // 唤醒后继节点
    private void unparkSuccessor(Node node) {
        int ws = node.waitStatus;
        if (ws < 0)
            compareAndSetWaitStatus(node, ws, 0);

        Node s = node.next;
        if (s == null || s.waitStatus > 0) {
            s = null;
            // 从尾向前找第一个有效节点
            for (Node t = tail; t != null && t != node; t = t.prev)
                if (t.waitStatus <= 0)
                    s = t;
        }
        if (s != null)
            LockSupport.unpark(s.thread);
    }
}
```

**关键优化：**

**1. 自旋 + park**
- 先自旋几次尝试获取锁
- 失败后 park 阻塞，减少 CPU 消耗

**2. 为什么从尾向前遍历？**
```java
// enq() 中的 CAS 操作顺序：
node.prev = tail;              // 1
compareAndSetTail(tail, node); // 2
tail.next = node;              // 3

// 2和3之间可能被中断，此时 next 为 null
// 但 prev 一定有效，所以从尾向前遍历
```

**3. head 是哨兵节点**
- head 不存储线程信息
- 简化逻辑，避免空指针

**记忆要点：**
- **CAS + CLH 队列** —— 核心实现
- **自旋 + park** —— 先尝试后阻塞
- **FIFO 公平** —— 队列保证顺序
- **从尾向前遍历** —— 保证找到有效节点

### 29. AQS 有哪些应用？

**JUC 包中基于 AQS 的同步器：**

| 同步器 | 模式 | state 含义 | 用途 |
|--------|------|------------|------|
| **ReentrantLock** | 独占 | 重入次数 | 可重入锁 |
| **ReentrantReadWriteLock** | 共享+独占 | 高16位读锁数<br>低16位写锁数 | 读写锁 |
| **Semaphore** | 共享 | 许可证数量 | 限流 |
| **CountDownLatch** | 共享 | 计数器 | 等待多线程完成 |
| **CyclicBarrier** | - | - | 循环栅栏 |
| **StampedLock** | - | - | 乐观读锁 |

<svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">AQS 应用示例</text>
<rect x="10" y="45" width="330" height="140" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="100" y="70" class="title" fill="#1976d2">ReentrantLock</text>
<text x="20" y="95" class="code">模式: 独占</text>
<text x="20" y="115" class="code">state: 0=未锁 >0=重入次数</text>
<text x="20" y="140" class="code" style="fill:#388e3c;">tryAcquire():</text>
<text x="30" y="160" class="code">CAS(state, 0, 1) 或重入</text>
<text x="20" y="175" class="code" style="fill:#1976d2;">tryRelease():</text>
<rect x="360" y="45" width="330" height="140" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="460" y="70" class="title" fill="#f57c00">Semaphore</text>
<text x="370" y="95" class="code">模式: 共享</text>
<text x="370" y="115" class="code">state: 剩余许可证数</text>
<text x="370" y="140" class="code" style="fill:#388e3c;">tryAcquireShared():</text>
<text x="380" y="160" class="code">CAS(state, c, c-1)</text>
<text x="370" y="175" class="code" style="fill:#1976d2;">tryReleaseShared():</text>
<rect x="10" y="200" width="330" height="140" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="90" y="225" class="title" fill="#388e3c">CountDownLatch</text>
<text x="20" y="250" class="code">模式: 共享</text>
<text x="20" y="270" class="code">state: 计数器 (倒数)</text>
<text x="20" y="295" class="code" style="fill:#388e3c;">tryAcquireShared():</text>
<text x="30" y="315" class="code">state == 0 ? 1 : -1</text>
<text x="20" y="330" class="code" style="fill:#1976d2;">tryReleaseShared():</text>
<rect x="360" y="200" width="330" height="140" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="410" y="225" class="title" fill="#d32f2f">ReadWriteLock</text>
<text x="370" y="250" class="code">模式: 共享 + 独占</text>
<text x="370" y="270" class="code">state: 高16位读 低16位写</text>
<text x="370" y="295" class="code" style="fill:#388e3c;">读: tryAcquireShared()</text>
<text x="380" y="315" class="code">CAS(state, c, c+(1<<16))</text>
<text x="370" y="330" class="code" style="fill:#d32f2f;">写: tryAcquire()</text>
<rect x="10" y="355" width="680" height="135" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="375" class="title">使用示例对比</text>
<text x="20" y="400" class="code" style="fill:#1976d2;">// ReentrantLock - 独占</text>
<text x="20" y="420" class="code">lock.lock(); try { } finally { lock.unlock(); }</text>
<text x="360" y="400" class="code" style="fill:#f57c00;">// Semaphore - 限流</text>
<text x="360" y="420" class="code">sem.acquire(); try { } finally { sem.release(); }</text>
<text x="20" y="445" class="code" style="fill:#388e3c;">// CountDownLatch - 等待</text>
<text x="20" y="465" class="code">latch.await(); ... latch.countDown();</text>
<text x="360" y="445" class="code" style="fill:#d32f2f;">// ReadWriteLock - 读写</text>
<text x="360" y="465" class="code">rLock.lock(); ... rLock.unlock();</text>
</svg>

**详细示例：**

**1. Semaphore（信号量）**
```java
class Pool {
    private final Semaphore available = new Semaphore(10); // 10个许可

    public Object getItem() throws InterruptedException {
        available.acquire();  // 获取许可，state-1
        return getNextAvailableItem();
    }

    public void putItem(Object x) {
        if (markAsUnused(x))
            available.release();  // 释放许可，state+1
    }
}
```

**2. CountDownLatch（倒计时门栓）**
```java
class Driver {
    void main() throws InterruptedException {
        CountDownLatch startSignal = new CountDownLatch(1);
        CountDownLatch doneSignal = new CountDownLatch(N);

        for (int i = 0; i < N; ++i)
            new Thread(new Worker(startSignal, doneSignal)).start();

        doSomethingElse();
        startSignal.countDown();   // 开始信号
        doSomethingElse();
        doneSignal.await();        // 等待所有线程完成
    }
}

class Worker implements Runnable {
    private final CountDownLatch startSignal;
    private final CountDownLatch doneSignal;

    public void run() {
        startSignal.await();       // 等待开始
        doWork();
        doneSignal.countDown();    // 完成计数
    }
}
```

**3. CyclicBarrier（循环栅栏）**
```java
class Solver {
    final int N;
    final CyclicBarrier barrier;

    Solver(Matrix matrix) {
        N = matrix.getSize();
        barrier = new CyclicBarrier(N,
            () -> mergeRows());  // 所有线程到达后执行

        for (int i = 0; i < N; i++)
            new Thread(new Worker(i)).start();
    }

    class Worker implements Runnable {
        public void run() {
            while (!done()) {
                processRow();
                barrier.await();  // 等待其他线程
            }
        }
    }
}
```

**记忆要点：**
- **ReentrantLock** —— 独占锁，state = 重入次数
- **Semaphore** —— 共享锁，state = 许可证数
- **CountDownLatch** —— 倒计时，state = 计数器
- **ReadWriteLock** —— 读写分离，state 分两半

### 30. CountDownLatch、CyclicBarrier 和 Semaphore 的区别？

| 特性 | CountDownLatch | CyclicBarrier | Semaphore |
|------|----------------|---------------|-----------|
| **用途** | 等待多个线程完成 | 多线程互相等待 | 限制并发数 |
| **计数** | 递减（countDown） | 递增（await） | 获取/释放许可 |
| **复用** | ✗ 不可复用 | ✓ 可复用 | ✓ 可复用 |
| **等待方向** | 主线程等工作线程 | 工作线程互等 | - |
| **AQS** | 共享模式 | - | 共享模式 |

<svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="180" y="25" class="title">CountDownLatch vs CyclicBarrier vs Semaphore</text>
<rect x="10" y="45" width="220" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="60" y="70" class="title" fill="#1976d2">CountDownLatch</text>
<text x="20" y="95" class="code">倒计时门栓</text>
<rect x="30" y="110" width="60" height="25" fill="#fff3e0" stroke="#f57c00" stroke-width="1"/>
<text x="45" y="127" class="code">主线程</text>
<text x="30" y="155" class="code" fill="#f57c00">await()</text>
<line x1="90" y1="122" x2="120" y2="122" stroke="#1976d2" stroke-width="2"/>
<text x="100" y="115" class="code" fill="#388e3c">等待</text>
<rect x="120" y="110" width="60" height="25" fill="#c8e6c9" stroke="#388e3c" stroke-width="1"/>
<text x="130" y="127" class="code">工作线程</text>
<text x="120" y="155" class="code" fill="#388e3c">countDown()</text>
<text x="20" y="180" class="code" fill="#d32f2f">✗ 不可复用</text>
<rect x="240" y="45" width="220" height="150" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="300" y="70" class="title" fill="#f57c00">CyclicBarrier</text>
<text x="250" y="95" class="code">循环栅栏</text>
<rect x="260" y="110" width="60" height="25" fill="#c8e6c9" stroke="#388e3c" stroke-width="1"/>
<text x="270" y="127" class="code">线程1</text>
<line x1="320" y1="122" x2="340" y2="122" stroke="#f57c00" stroke-width="2"/>
<text x="320" y="115" class="code" fill="#f57c00">互等</text>
<rect x="340" y="110" width="60" height="25" fill="#c8e6c9" stroke="#388e3c" stroke-width="1"/>
<text x="350" y="127" class="code">线程2</text>
<text x="260" y="155" class="code" fill="#388e3c">await()</text>
<text x="340" y="155" class="code" fill="#388e3c">await()</text>
<text x="250" y="180" class="code" fill="#388e3c">✓ 可复用</text>
<rect x="470" y="45" width="220" height="150" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="540" y="70" class="title" fill="#388e3c">Semaphore</text>
<text x="480" y="95" class="code">信号量 (限流)</text>
<rect x="490" y="110" width="80" height="25" fill="#fff3e0" stroke="#f57c00" stroke-width="1"/>
<text x="500" y="127" class="code">许可池(10)</text>
<line x1="530" y1="135" x2="530" y2="150" stroke="#388e3c" stroke-width="2"/>
<text x="485" y="165" class="code" fill="#388e3c">acquire()</text>
<text x="545" y="165" class="code" fill="#1976d2">release()</text>
<text x="480" y="180" class="code" fill="#388e3c">✓ 可复用</text>
<rect x="10" y="210" width="330" height="145" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="230" class="title">使用场景</text>
<text x="20" y="255" class="code" style="fill:#1976d2;">CountDownLatch:</text>
<text x="30" y="275" class="code">• 主线程等待所有子线程初始化完成</text>
<text x="30" y="290" class="code">• 等待多个服务启动</text>
<text x="20" y="315" class="code" style="fill:#f57c00;">CyclicBarrier:</text>
<text x="30" y="335" class="code">• 多线程分段计算,每段结束同步</text>
<text x="30" y="350" class="code">• 多玩家游戏等待所有人准备</text>
<rect x="350" y="210" width="340" height="145" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="360" y="230" class="title">核心区别</text>
<text x="360" y="255" class="code" style="fill:#388e3c;">Semaphore:</text>
<text x="370" y="275" class="code">• 限制同时访问资源的线程数</text>
<text x="370" y="290" class="code">• 数据库连接池、线程池</text>
<text x="360" y="315" class="code" style="fill:#d32f2f;">关键差异:</text>
<text x="370" y="335" class="code">• CountDownLatch: N→0 (递减,不可复用)</text>
<text x="370" y="350" class="code">• CyclicBarrier: 0→N→0 (可复用,循环)</text>
<rect x="10" y="370" width="680" height="140" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="390" class="title">代码示例对比</text>
<text x="20" y="415" class="code">// CountDownLatch - 主等子</text>
<text x="20" y="435" class="code">CountDownLatch latch = new CountDownLatch(3);</text>
<text x="20" y="450" class="code">// 工作线程: latch.countDown();</text>
<text x="20" y="465" class="code">// 主线程: latch.await(); // 等3个线程完成</text>
<text x="20" y="490" class="code" fill="#d32f2f">一次性使用,计数归0后无法重置</text>
<text x="360" y="415" class="code">// CyclicBarrier - 子互等</text>
<text x="360" y="435" class="code">CyclicBarrier barrier = new CyclicBarrier(3);</text>
<text x="360" y="450" class="code">// 每个线程: barrier.await();</text>
<text x="360" y="465" class="code">// 3个线程都到达后,自动重置,可继续使用</text>
<text x="360" y="490" class="code" fill="#388e3c">可重复使用,自动重置计数</text>
</svg>

**详细对比：**

**1. CountDownLatch**
```java
// 场景：等待所有服务启动
CountDownLatch latch = new CountDownLatch(3);

// 服务线程
new Thread(() -> {
    startService();
    latch.countDown();  // 计数 -1
}).start();

// 主线程等待
latch.await();  // 阻塞，直到计数为 0
System.out.println("所有服务已启动");
```

**2. CyclicBarrier**
```java
// 场景：多线程分段计算
CyclicBarrier barrier = new CyclicBarrier(3, () -> {
    System.out.println("所有线程到达栅栏");
});

// 工作线程
new Thread(() -> {
    for (int i = 0; i < 3; i++) {
        计算();
        barrier.await();  // 等待其他线程
        // 所有线程到达后继续
    }
}).start();
```

**3. Semaphore**
```java
// 场景：限制并发数
Semaphore semaphore = new Semaphore(3);  // 最多3个线程

// 工作线程
new Thread(() -> {
    semaphore.acquire();  // 获取许可
    try {
        访问资源();
    } finally {
        semaphore.release();  // 释放许可
    }
}).start();
```

**记忆要点：**
- **CountDownLatch** —— 主等子，N→0，不可复用
- **CyclicBarrier** —— 子互等，0→N→0，可复用
- **Semaphore** —— 限流，许可证池
- **Latch 倒数** —— Barrier 循环 —— Semaphore 池
