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
