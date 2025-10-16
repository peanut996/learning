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
