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
