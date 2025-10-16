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
