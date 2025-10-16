## JMM 基础

### 1. 什么是 Java 内存模型（JMM）？

**核心答案**：JMM（Java Memory Model）是一种规范，定义了多线程环境下如何读写共享变量，保证可见性、有序性、原子性。

**详细说明**：

JMM 不是物理上的内存模型，而是一套**并发编程规范**，解决多线程并发访问共享内存时的问题。

**JMM 抽象模型**：

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg"><text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">Java 内存模型（JMM）</text><rect x="250" y="60" width="300" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/><text x="400" y="95" text-anchor="middle" font-size="14" font-weight="bold">主内存 (Main Memory)</text><text x="400" y="115" text-anchor="middle" font-size="11">所有线程共享的变量</text><text x="400" y="130" text-anchor="middle" font-size="11">堆内存、方法区</text><rect x="50" y="200" width="200" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/><text x="150" y="230" text-anchor="middle" font-size="13" font-weight="bold">线程 A</text><rect x="70" y="250" width="160" height="110" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/><text x="150" y="275" text-anchor="middle" font-size="12">工作内存</text><text x="80" y="300" font-size="10">• 变量副本</text><text x="80" y="320" font-size="10">• 本地缓存</text><text x="80" y="340" font-size="10">• CPU缓存/寄存器</text><rect x="300" y="200" width="200" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/><text x="400" y="230" text-anchor="middle" font-size="13" font-weight="bold">线程 B</text><rect x="320" y="250" width="160" height="110" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/><text x="400" y="275" text-anchor="middle" font-size="12">工作内存</text><text x="330" y="300" font-size="10">• 变量副本</text><text x="330" y="320" font-size="10">• 本地缓存</text><text x="330" y="340" font-size="10">• CPU缓存/寄存器</text><rect x="550" y="200" width="200" height="180" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/><text x="650" y="230" text-anchor="middle" font-size="13" font-weight="bold">线程 C</text><rect x="570" y="250" width="160" height="110" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/><text x="650" y="275" text-anchor="middle" font-size="12">工作内存</text><text x="580" y="300" font-size="10">• 变量副本</text><text x="580" y="320" font-size="10">• 本地缓存</text><text x="580" y="340" font-size="10">• CPU缓存/寄存器</text><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs><path d="M 145 200 L 300 140" stroke="#388e3c" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/><text x="225" y="155" text-anchor="middle" font-size="10" fill="#388e3c">read/write</text><path d="M 310 140 L 155 200" stroke="#1976d2" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/><path d="M 395 200 L 395 140" stroke="#f57c00" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/><text x="435" y="165" text-anchor="middle" font-size="10" fill="#f57c00">read/write</text><path d="M 405 140 L 405 200" stroke="#1976d2" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/><path d="M 645 200 L 490 140" stroke="#7b1fa2" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/><text x="570" y="155" text-anchor="middle" font-size="10" fill="#7b1fa2">read/write</text><path d="M 500 140 L 655 200" stroke="#1976d2" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/><text x="50" y="410" font-size="12" font-weight="bold">核心问题：</text><text x="50" y="430" font-size="11">线程间通过主内存通信，工作内存的变量副本可能不一致，需要 JMM 规范保证正确性</text></svg>

**JMM 解决的核心问题**：

1. **可见性**：一个线程修改的变量，其他线程能否立即看到
2. **有序性**：程序执行的顺序是否按代码顺序执行
3. **原子性**：操作是否不可分割

**JMM 的作用**：
- 屏蔽硬件和操作系统的内存访问差异
- 让 Java 程序在各平台上达到一致的内存访问效果
- 定义线程安全的规范

**关键要点**：
- ✓ **JMM 是规范**：不是具体实现，是抽象模型
- ✓ **主内存+工作内存**：线程间通过主内存通信
- ✓ **三大特性**：可见性、有序性、原子性
- ⚠ **不等于 JVM 内存结构**：两者是不同的概念

**记忆口诀**：JMM 是规范不是硬件，主内存工作内存要分清，可见有序原子是三性

### 2. JMM 和 JVM 内存结构的区别？

**核心答案**：JMM 是并发编程规范（抽象概念），JVM 内存结构是运行时数据区域（物理结构）。

**详细对比**：

| 对比项 | JMM（Java 内存模型） | JVM 内存结构 |
|-------|-------------------|-------------|
| **概念层次** | 抽象规范 | 具体实现 |
| **目的** | 定义多线程如何访问共享变量 | 定义 JVM 运行时内存布局 |
| **主要内容** | 主内存、工作内存、happens-before | 堆、栈、方法区、程序计数器等 |
| **关注点** | 可见性、有序性、原子性 | 内存分配、垃圾回收 |
| **应用场景** | 多线程并发编程 | JVM 运行时管理 |

**对应关系**：
- **JMM 的主内存** ≈ JVM 的堆内存 + 方法区
- **JMM 的工作内存** ≈ JVM 的栈 + CPU 缓存/寄存器

**关键要点**：
- ✓ **JMM**：抽象的并发模型
- ✓ **JVM 内存结构**：具体的内存布局
- ⚠ **不要混淆**：一个是规范，一个是实现

**记忆口诀**：JMM 管并发规范，JVM 管内存布局

### 3. 什么是主内存和工作内存？

**核心答案**：主内存存储所有线程共享的变量，工作内存是每个线程私有的变量副本缓存。

**详细说明**：

**主内存（Main Memory）**：
- 所有线程共享
- 存储实例变量、静态变量、数组元素
- 对应 JVM 的堆内存和方法区

**工作内存（Working Memory）**：
- 线程私有
- 存储主内存变量的副本
- 对应 CPU 缓存、寄存器、JVM 栈

**交互过程**：

1. 线程读取变量：主内存 → 工作内存
2. 线程修改变量：在工作内存中修改
3. 线程写回变量：工作内存 → 主内存

**关键要点**：
- ✓ **主内存**：共享变量，所有线程可见
- ✓ **工作内存**：变量副本，线程私有
- ⚠ **同步问题**：工作内存的修改需要同步回主内存
- ⚠ **可见性问题**：其他线程看不到工作内存的修改

**记忆口诀**：主内存共享全局变量，工作内存私有副本缓存

### 4. JMM 的三大特性是什么？

**核心答案**：可见性、有序性、原子性是 JMM 的三大核心特性。

**详细说明**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">JMM 三大特性</text>
<rect x="50" y="60" width="220" height="300" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="160" y="90" text-anchor="middle" font-size="14" font-weight="bold">1️⃣ 可见性 (Visibility)</text>
<text x="70" y="120" font-size="11" font-weight="bold">定义：</text>
<text x="70" y="140" font-size="10">一个线程修改的变量</text>
<text x="70" y="155" font-size="10">其他线程能立即看到</text>
<text x="70" y="180" font-size="11" font-weight="bold">问题：</text>
<text x="70" y="200" font-size="10">CPU 缓存导致不可见</text>
<text x="70" y="225" font-size="11" font-weight="bold">解决：</text>
<text x="70" y="245" font-size="10">• volatile</text>
<text x="70" y="265" font-size="10">• synchronized</text>
<text x="70" y="285" font-size="10">• final</text>
<text x="70" y="305" font-size="10">• Lock</text>
<text x="70" y="340" font-size="10" fill="#1976d2" font-weight="bold">保证：线程间变量修改可见</text>
<rect x="290" y="60" width="220" height="300" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="90" text-anchor="middle" font-size="14" font-weight="bold">2️⃣ 有序性 (Ordering)</text>
<text x="310" y="120" font-size="11" font-weight="bold">定义：</text>
<text x="310" y="140" font-size="10">程序执行按代码顺序</text>
<text x="310" y="155" font-size="10">不会被重排序</text>
<text x="310" y="180" font-size="11" font-weight="bold">问题：</text>
<text x="310" y="200" font-size="10">指令重排序导致乱序</text>
<text x="310" y="225" font-size="11" font-weight="bold">解决：</text>
<text x="310" y="245" font-size="10">• volatile (禁止重排)</text>
<text x="310" y="265" font-size="10">• synchronized</text>
<text x="310" y="285" font-size="10">• happens-before</text>
<text x="310" y="305" font-size="10">• 内存屏障</text>
<text x="310" y="340" font-size="10" fill="#388e3c" font-weight="bold">保证：指令按预期顺序执行</text>
<rect x="530" y="60" width="220" height="300" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="640" y="90" text-anchor="middle" font-size="14" font-weight="bold">3️⃣ 原子性 (Atomicity)</text>
<text x="550" y="120" font-size="11" font-weight="bold">定义：</text>
<text x="550" y="140" font-size="10">操作不可分割</text>
<text x="550" y="155" font-size="10">要么全部成功，要么全部失败</text>
<text x="550" y="180" font-size="11" font-weight="bold">问题：</text>
<text x="550" y="200" font-size="10">复合操作被打断</text>
<text x="550" y="225" font-size="11" font-weight="bold">解决：</text>
<text x="550" y="245" font-size="10">• synchronized</text>
<text x="550" y="265" font-size="10">• Lock</text>
<text x="550" y="285" font-size="10">• Atomic 类</text>
<text x="550" y="305" font-size="10">• CAS</text>
<text x="550" y="340" font-size="10" fill="#f57c00" font-weight="bold">保证：操作不被中断</text>
</svg>

**1. 可见性（Visibility）**：
- **问题**：线程 A 修改变量，线程 B 看不到
- **原因**：CPU 缓存
- **解决**：volatile、synchronized、final

**2. 有序性（Ordering）**：
- **问题**：代码执行顺序被打乱
- **原因**：指令重排序
- **解决**：volatile、synchronized、happens-before

**3. 原子性（Atomicity）**：
- **问题**：操作被中断，出现中间状态
- **原因**：复合操作（如 i++）
- **解决**：synchronized、Lock、Atomic 类

**关键要点**：
- ✓ **可见性**：变量修改对其他线程立即可见
- ✓ **有序性**：禁止指令重排序
- ✓ **原子性**：操作不可分割
- ⚠ **volatile 不保证原子性**：只保证可见性和有序性

**记忆口诀**：可见性看得到，有序性不乱跑，原子性不分割
