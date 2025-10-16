## 有序性

### 13. 什么是指令重排序？

**核心答案**：指令重排序是指编译器和处理器为了优化性能，改变指令的执行顺序。

**详细说明**：

**重排序的三个层次**：

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">指令重排序的三个层次</text>
<rect x="50" y="60" width="230" height="330" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="165" y="90" text-anchor="middle" font-size="13" font-weight="bold">1️⃣ 编译器重排序</text>
<text x="70" y="120" font-size="11" font-weight="bold">阶段：编译期</text>
<text x="70" y="145" font-size="10">• 编译器优化</text>
<text x="70" y="165" font-size="10">• 不改变单线程语义</text>
<text x="70" y="190" font-size="11" font-weight="bold">示例：</text>
<text x="80" y="215" font-family="monospace" font-size="10">int a = 1;  // 1</text>
<text x="80" y="235" font-family="monospace" font-size="10">int b = 2;  // 2</text>
<text x="80" y="255" font-family="monospace" font-size="10">int c = a + b; // 3</text>
<text x="70" y="280" font-size="10">可能重排为：2 → 1 → 3</text>
<text x="70" y="310" font-size="10" fill="#1976d2" font-weight="bold">目的：提高指令并行度</text>
<rect x="290" y="60" width="230" height="330" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="405" y="90" text-anchor="middle" font-size="13" font-weight="bold">2️⃣ 处理器重排序</text>
<text x="310" y="120" font-size="11" font-weight="bold">阶段：执行期</text>
<text x="310" y="145" font-size="10">• 指令级并行</text>
<text x="310" y="165" font-size="10">• 乱序执行</text>
<text x="310" y="190" font-size="11" font-weight="bold">类型：</text>
<text x="320" y="215" font-size="10">• 指令并行重排</text>
<text x="320" y="235" font-size="10">• 流水线优化</text>
<text x="310" y="260" font-size="11" font-weight="bold">特点：</text>
<text x="320" y="285" font-size="10">• CPU 动态调度</text>
<text x="320" y="305" font-size="10">• 保证数据依赖</text>
<text x="310" y="335" font-size="10" fill="#388e3c" font-weight="bold">目的：提高 CPU 利用率</text>
<rect x="530" y="60" width="230" height="330" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="645" y="90" text-anchor="middle" font-size="13" font-weight="bold">3️⃣ 内存系统重排序</text>
<text x="550" y="120" font-size="11" font-weight="bold">阶段：内存访问</text>
<text x="550" y="145" font-size="10">• 写缓冲区</text>
<text x="550" y="165" font-size="10">• 缓存不一致</text>
<text x="550" y="190" font-size="11" font-weight="bold">现象：</text>
<text x="560" y="215" font-size="10">• 写操作延迟</text>
<text x="560" y="235" font-size="10">• 读可能先完成</text>
<text x="550" y="260" font-size="11" font-weight="bold">原因：</text>
<text x="560" y="285" font-size="10">• Store Buffer</text>
<text x="560" y="305" font-size="10">• 缓存一致性协议</text>
<text x="550" y="335" font-size="10" fill="#f57c00" font-weight="bold">目的：隐藏内存延迟</text>
<text x="50" y="415" font-size="11" fill="#d32f2f" font-weight="bold">⚠️ 三种重排序都可能导致多线程程序出现问题</text>
</svg>

**重排序示例**：

```java
// 原始代码顺序
int a = 1;  // ①
int b = 2;  // ②
int c = a;  // ③

// 可能的重排序（不影响单线程结果）
int a = 1;  // ①
int c = a;  // ③ (先执行)
int b = 2;  // ② (后执行)
```

**as-if-serial 语义**：
- 不管怎么重排序，**单线程**执行结果不能改变
- 存在**数据依赖**的操作不会被重排序

**关键要点**：
- ✓ **三个层次**：编译器、处理器、内存系统
- ✓ **目的**：提高性能
- ✓ **保证**：单线程语义不变
- ⚠ **问题**：多线程可能出现异常

**记忆口诀**：三层重排序优化，编译处理加内存，单线程语义保，多线程要小心

### 14. 为什么会发生指令重排序？

**核心答案**：为了提高程序执行性能，充分利用 CPU 和内存资源。

**详细说明**：

**重排序的目的**：

| 层次 | 目的 | 收益 |
|-----|------|------|
| **编译器** | 优化指令顺序 | 减少指令数、提高并行度 |
| **CPU** | 流水线优化、乱序执行 | 提高 CPU 利用率 |
| **内存** | 隐藏内存延迟 | 提高内存访问效率 |

**具体原因**：

1. **CPU 流水线**：现代 CPU 使用流水线技术，重排序可以让流水线更饱和
2. **多核并行**：重排序可以让多个 CPU 核心更好地并行执行
3. **缓存优化**：调整访问顺序可以提高缓存命中率
4. **减少等待**：在等待内存数据时，先执行其他指令

**性能提升**：
- **编译器重排序**：可提升 5-10% 性能
- **处理器重排序**：可提升 10-30% 性能
- **内存重排序**：可隐藏 50-100 个时钟周期的延迟

**关键要点**：
- ✓ **核心目标**：提高性能
- ✓ **单线程安全**：保证 as-if-serial 语义
- ⚠ **多线程风险**：需要同步机制

**记忆口诀**：重排为了提性能，流水并行加缓存，单线程安全保，多线程要防范

### 15. 如何禁止指令重排序？

**核心答案**：使用 volatile、synchronized、happens-before 规则、内存屏障来禁止指令重排序。

**详细说明**：

**四种方式**：

| 方式 | 作用 | 适用场景 |
|-----|------|---------|
| **volatile** | 禁止变量的读写重排 | 状态标志、双重检查锁 |
| **synchronized** | 临界区内禁止重排 | 临界区保护 |
| **happens-before** | JMM 语义保证 | 多线程顺序保证 |
| **内存屏障** | 底层指令保证 | 底层实现 |

**1. volatile 关键字**：
```java
volatile boolean flag = false;
int data = 0;

// 写线程
data = 100;        // ①
flag = true;       // ② volatile 写

// volatile 保证：① 不会重排到 ② 之后

// 读线程
if (flag) {        // ③ volatile 读
    int i = data;  // ④
}
// volatile 保证：④ 不会重排到 ③ 之前
```

**2. synchronized**：
```java
synchronized(lock) {
    // 临界区内的代码不会重排到临界区外
    a = 1;
    b = 2;
}
```

**3. final 关键字**：
```java
class Foo {
    final int x;
    int y;

    public Foo() {
        x = 1;  // final 变量
        y = 2;  // 普通变量
    }
}
// JMM 保证：x 的赋值不会重排到构造函数之外
```

**关键要点**：
- ✓ **volatile**：最轻量，禁止特定重排
- ✓ **synchronized**：最全面，保护临界区
- ✓ **final**：构造函数内不重排
- ⚠ **根据场景选择**：权衡性能和安全

**记忆口诀**：volatile 禁重排，synchronized 全保护，final 构造安全，happens-before 有规则

### 16. happens-before 原则是什么？

**核心答案**：happens-before 是 JMM 定义的一种偏序关系，用于描述两个操作之间的内存可见性。

**详细说明**：

**定义**：
- 如果操作 A happens-before 操作 B
- 那么 A 的结果对 B 可见
- 且 A 的执行顺序在 B 之前

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">happens-before 原则</text>
<rect x="50" y="60" width="300" height="200" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="200" y="90" text-anchor="middle" font-size="13" font-weight="bold">操作 A</text>
<text x="70" y="120" font-size="11">• 写入共享变量</text>
<text x="70" y="140" font-size="11">• 释放锁</text>
<text x="70" y="160" font-size="11">• volatile 写</text>
<text x="70" y="190" font-size="11" fill="#388e3c" font-weight="bold">happens-before</text>
<text x="70" y="230" font-size="10" fill="#388e3c">✓ 结果对 B 可见</text>
<text x="70" y="245" font-size="10" fill="#388e3c">✓ 执行顺序在 B 前</text>
<rect x="450" y="60" width="300" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="600" y="90" text-anchor="middle" font-size="13" font-weight="bold">操作 B</text>
<text x="470" y="120" font-size="11">• 读取共享变量</text>
<text x="470" y="140" font-size="11">• 获取锁</text>
<text x="470" y="160" font-size="11">• volatile 读</text>
<text x="470" y="190" font-size="11" fill="#1976d2" font-weight="bold">能看到 A 的结果</text>
<text x="470" y="230" font-size="10" fill="#1976d2">✓ 可见性保证</text>
<text x="470" y="245" font-size="10" fill="#1976d2">✓ 有序性保证</text>
<path d="M 350 150 L 450 150" stroke="#f57c00" stroke-width="3" marker-end="url(#arrow-hb)"/>
<text x="370" y="145" font-size="12" fill="#f57c00" font-weight="bold">happens-before</text>
<defs>
<marker id="arrow-hb" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/>
</marker>
</defs>
</svg>

**重要性**：
1. **无需同步**：满足 happens-before 关系，无需额外同步
2. **可见性保证**：前一个操作的结果对后一个操作可见
3. **有序性保证**：禁止特定的指令重排序

**关键要点**：
- ✓ **定义**：A happens-before B → A 对 B 可见
- ✓ **作用**：无需同步也能保证可见性
- ✓ **传递性**：A hb B, B hb C → A hb C
- ⚠ **不是时间顺序**：是可见性关系

**记忆口诀**：happens-before 不是时间，而是可见性保证，满足规则即可见，无需额外同步

### 17. happens-before 的常见规则有哪些？

**核心答案**：程序顺序规则、锁规则、volatile 规则、传递性规则、线程启动/终止规则等 8 大规则。

**详细说明**：

**8 大 happens-before 规则**：

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">happens-before 八大规则</text>
<rect x="30" y="60" width="390" height="110" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="225" y="85" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 程序顺序规则</text>
<text x="45" y="110" font-size="10">单线程中，前面的操作 happens-before 后面的操作</text>
<text x="45" y="130" font-family="monospace" font-size="10">int a = 1;  // A</text>
<text x="45" y="150" font-family="monospace" font-size="10">int b = a;  // B，能看到 A 的结果</text>
<rect x="430" y="60" width="390" height="110" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="625" y="85" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 锁规则</text>
<text x="445" y="110" font-size="10">解锁 happens-before 后续的加锁</text>
<text x="445" y="130" font-family="monospace" font-size="10">unlock(lock);  // 线程 A</text>
<text x="445" y="150" font-family="monospace" font-size="10">lock(lock);    // 线程 B，能看到 A 的修改</text>
<rect x="30" y="185" width="390" height="110" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="225" y="210" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ volatile 规则</text>
<text x="45" y="235" font-size="10">volatile 写 happens-before 后续的 volatile 读</text>
<text x="45" y="255" font-family="monospace" font-size="10">flag = true;   // volatile 写，线程 A</text>
<text x="45" y="275" font-family="monospace" font-size="10">if(flag) {...} // volatile 读，线程 B</text>
<rect x="430" y="185" width="390" height="110" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="625" y="210" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 传递性规则</text>
<text x="445" y="235" font-size="10">A hb B, B hb C → A hb C</text>
<text x="445" y="255" font-family="monospace" font-size="10">A happens-before B</text>
<text x="445" y="275" font-family="monospace" font-size="10">B happens-before C  →  A hb C</text>
<rect x="30" y="310" width="390" height="110" fill="#ede7f6" stroke="#673ab7" stroke-width="2" rx="5"/>
<text x="225" y="335" text-anchor="middle" font-size="12" font-weight="bold">5️⃣ 线程启动规则</text>
<text x="45" y="360" font-size="10">start() happens-before 该线程的所有操作</text>
<text x="45" y="380" font-family="monospace" font-size="10">thread.start();  // 主线程</text>
<text x="45" y="400" font-family="monospace" font-size="10">// 新线程能看到 start() 前的修改</text>
<rect x="430" y="310" width="390" height="110" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="625" y="335" text-anchor="middle" font-size="12" font-weight="bold">6️⃣ 线程终止规则</text>
<text x="445" y="360" font-size="10">线程所有操作 happens-before join() 返回</text>
<text x="445" y="380" font-family="monospace" font-size="10">thread.join();  // 主线程</text>
<text x="445" y="400" font-family="monospace" font-size="10">// join 后能看到线程内的所有修改</text>
<rect x="30" y="435" width="390" height="90" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="225" y="460" text-anchor="middle" font-size="12" font-weight="bold">7️⃣ 线程中断规则</text>
<text x="45" y="485" font-size="10">interrupt() happens-before 检测到中断</text>
<text x="45" y="505" font-family="monospace" font-size="10">thread.interrupt(); → isInterrupted()</text>
<rect x="430" y="435" width="390" height="90" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="625" y="460" text-anchor="middle" font-size="12" font-weight="bold">8️⃣ 对象终结规则</text>
<text x="445" y="485" font-size="10">构造函数 happens-before finalize() 开始</text>
<text x="445" y="505" font-family="monospace" font-size="10">new Obj() → finalize()</text>
</svg>

**最常用的三个规则**：
1. **程序顺序规则**：单线程内代码按顺序执行
2. **锁规则**：解锁 → 加锁
3. **volatile 规则**：volatile 写 → volatile 读

**关键要点**：
- ✓ **8 大规则**：覆盖常见并发场景
- ✓ **传递性**：规则可以组合传递
- ✓ **无需显式同步**：满足规则即可见
- ⚠ **理解应用**：正确使用避免同步

**记忆口诀**：程序顺序单线程，锁和 volatile 多线程，线程启动和终止，传递中断加终结
