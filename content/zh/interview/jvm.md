# JVM 面试题

## JVM 内存结构

### 1. JVM 的内存区域是如何划分的？

JVM 内存主要分为以下几个区域：

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="400" fill="none" stroke="#333" stroke-width="2"/>
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">JVM 运行时数据区</text>
<rect x="80" y="80" width="300" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="230" y="110" text-anchor="middle" font-size="16" font-weight="bold">堆（Heap）</text>
<text x="230" y="135" text-anchor="middle" font-size="12">线程共享</text>
<text x="230" y="155" text-anchor="middle" font-size="12">存储对象实例和数组</text>
<text x="230" y="175" text-anchor="middle" font-size="12">垃圾回收的主要区域</text>
<rect x="80" y="250" width="300" height="150" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="230" y="280" text-anchor="middle" font-size="16" font-weight="bold">方法区（Method Area）</text>
<text x="230" y="305" text-anchor="middle" font-size="12">线程共享</text>
<text x="230" y="325" text-anchor="middle" font-size="12">存储类信息、常量、静态变量</text>
<text x="230" y="345" text-anchor="middle" font-size="12">JDK 8+ 使用元空间（Metaspace）</text>
<rect x="420" y="80" width="300" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="570" y="110" text-anchor="middle" font-size="16" font-weight="bold">虚拟机栈（VM Stack）</text>
<text x="570" y="135" text-anchor="middle" font-size="12">线程私有，存储局部变量等</text>
<rect x="420" y="180" width="300" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
<text x="570" y="210" text-anchor="middle" font-size="16" font-weight="bold">本地方法栈（Native Method Stack）</text>
<text x="570" y="235" text-anchor="middle" font-size="12">线程私有，为 Native 方法服务</text>
<rect x="420" y="280" width="300" height="80" fill="#fce4ec" stroke="#c2185b" stroke-width="2"/>
<text x="570" y="310" text-anchor="middle" font-size="16" font-weight="bold">程序计数器（PC Register）</text>
<text x="570" y="335" text-anchor="middle" font-size="12">线程私有，记录当前执行位置</text>
</svg>

**记忆口诀：一堆（堆）方法（方法区）要计数（程序计数器），两栈（虚拟机栈和本地方法栈）来帮忙**

**关键点：**
1. **线程共享区**：堆和方法区，所有线程共享数据
2. **线程私有区**：虚拟机栈、本地方法栈、程序计数器，每个线程独立拥有
3. **垃圾回收**：主要发生在堆和方法区
4. **异常情况**：
   - StackOverflowError：栈深度超过限制
   - OutOfMemoryError：堆、方法区、直接内存不足

### 2. 堆和栈的区别？

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold">堆 vs 栈</text>
<line x1="400" y1="50" x2="400" y2="380" stroke="#666" stroke-width="2"/>
<text x="200" y="70" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">堆（Heap）</text>
<text x="600" y="70" text-anchor="middle" font-size="18" font-weight="bold" fill="#7b1fa2">栈（Stack）</text>
<rect x="50" y="90" width="300" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="1"/>
<text x="70" y="110" font-size="13" font-weight="bold">作用域</text>
<text x="70" y="128" font-size="12">线程共享，全局访问</text>
<rect x="450" y="90" width="300" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1"/>
<text x="470" y="110" font-size="13" font-weight="bold">作用域</text>
<text x="470" y="128" font-size="12">线程私有，局部访问</text>
<rect x="50" y="150" width="300" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="1"/>
<text x="70" y="170" font-size="13" font-weight="bold">存储内容</text>
<text x="70" y="188" font-size="12">对象实例、数组</text>
<rect x="450" y="150" width="300" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1"/>
<text x="470" y="170" font-size="13" font-weight="bold">存储内容</text>
<text x="470" y="188" font-size="12">基本类型变量、对象引用</text>
<rect x="50" y="210" width="300" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="1"/>
<text x="70" y="230" font-size="13" font-weight="bold">生命周期</text>
<text x="70" y="248" font-size="12">对象生存期，由 GC 管理</text>
<rect x="450" y="210" width="300" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1"/>
<text x="470" y="230" font-size="13" font-weight="bold">生命周期</text>
<text x="470" y="248" font-size="12">方法执行期，自动回收</text>
<rect x="50" y="270" width="300" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="1"/>
<text x="70" y="290" font-size="13" font-weight="bold">空间大小</text>
<text x="70" y="308" font-size="12">较大，可配置（-Xmx）</text>
<rect x="450" y="270" width="300" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1"/>
<text x="470" y="290" font-size="13" font-weight="bold">空间大小</text>
<text x="470" y="308" font-size="12">较小，可配置（-Xss）</text>
<rect x="50" y="330" width="300" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="1"/>
<text x="70" y="350" font-size="13" font-weight="bold">异常</text>
<text x="70" y="368" font-size="12">OutOfMemoryError</text>
<rect x="450" y="330" width="300" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1"/>
<text x="470" y="350" font-size="13" font-weight="bold">异常</text>
<text x="470" y="368" font-size="12">StackOverflowError</text>
</svg>

**核心区别总结：**
1. **管理方式**：堆需要 GC，栈自动管理
2. **访问速度**：栈比堆快（直接访问 vs 间接引用）
3. **碎片问题**：堆有碎片，栈无碎片
4. **分配方式**：堆动态分配，栈静态分配

### 3. 什么是方法区?元空间和永久代的区别？

**方法区（Method Area）** 是 JVM 规范中定义的一块逻辑区域，用于存储：
- 类的结构信息（字段、方法、构造器等）
- 运行时常量池
- 静态变量
- JIT 编译后的代码缓存

**永久代 vs 元空间：**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold">永久代 vs 元空间</text>
<rect x="50" y="60" width="330" height="360" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="215" y="90" text-anchor="middle" font-size="18" font-weight="bold">永久代（PermGen）</text>
<text x="215" y="115" text-anchor="middle" font-size="13">JDK 7 及之前</text>
<rect x="70" y="130" width="290" height="60" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="90" y="150" font-size="12" font-weight="bold">位置</text>
<text x="90" y="168" font-size="12">JVM 堆内存的一部分</text>
<rect x="70" y="200" width="290" height="60" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="90" y="220" font-size="12" font-weight="bold">大小限制</text>
<text x="90" y="238" font-size="12">固定大小（-XX:MaxPermSize）</text>
<text x="90" y="253" font-size="11">容易 OutOfMemoryError</text>
<rect x="70" y="270" width="290" height="60" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="90" y="290" font-size="12" font-weight="bold">垃圾回收</text>
<text x="90" y="308" font-size="12">Full GC 时回收</text>
<text x="90" y="323" font-size="11">效率较低</text>
<rect x="70" y="340" width="290" height="60" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="90" y="360" font-size="12" font-weight="bold">问题</text>
<text x="90" y="378" font-size="11">大小难以确定，易溢出</text>
<text x="90" y="393" font-size="11">字符串常量池在此（JDK 7 前）</text>
<rect x="420" y="60" width="330" height="360" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
<text x="585" y="90" text-anchor="middle" font-size="18" font-weight="bold">元空间（Metaspace）</text>
<text x="585" y="115" text-anchor="middle" font-size="13">JDK 8 及之后</text>
<rect x="440" y="130" width="290" height="60" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
<text x="460" y="150" font-size="12" font-weight="bold">位置</text>
<text x="460" y="168" font-size="12">本地内存（Native Memory）</text>
<rect x="440" y="200" width="290" height="60" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
<text x="460" y="220" font-size="12" font-weight="bold">大小限制</text>
<text x="460" y="238" font-size="12">默认无限制（-XX:MaxMetaspaceSize）</text>
<text x="460" y="253" font-size="11">受系统内存限制</text>
<rect x="440" y="270" width="290" height="60" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
<text x="460" y="290" font-size="12" font-weight="bold">垃圾回收</text>
<text x="460" y="308" font-size="12">自动触发类卸载</text>
<text x="460" y="323" font-size="11">效率更高</text>
<rect x="440" y="340" width="290" height="60" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
<text x="460" y="360" font-size="12" font-weight="bold">优势</text>
<text x="460" y="378" font-size="11">自动扩展，溢出风险低</text>
<text x="460" y="393" font-size="11">字符串常量池已移至堆</text>
</svg>

**为什么要用元空间替代永久代？**
1. **永久代大小难以确定**：类数量、常量池大小难以预估
2. **GC 效率问题**：永久代的回收效率低，Full GC 代价大
3. **融合 HotSpot 与 JRockit**：JRockit 没有永久代概念
4. **更灵活的内存管理**：元空间使用本地内存，自动扩展

**关键变化（JDK 8）：**
- 字符串常量池：永久代 → 堆
- 类元信息：永久代 → 元空间（本地内存）
- 静态变量：永久代 → 堆

### 4. 什么是程序计数器？

**程序计数器（Program Counter Register）**是一块较小的内存空间，可以看作当前线程所执行的字节码的**行号指示器**。

**核心特点：**

<svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="30" width="600" height="280" fill="#fce4ec" stroke="#c2185b" stroke-width="2"/>
<text x="350" y="60" text-anchor="middle" font-size="18" font-weight="bold">程序计数器（PC Register）</text>
<rect x="80" y="80" width="260" height="80" fill="#f8bbd0" stroke="#880e4f" stroke-width="1"/>
<text x="100" y="105" font-size="14" font-weight="bold">1. 线程私有</text>
<text x="100" y="125" font-size="12">每个线程独立拥有</text>
<text x="100" y="143" font-size="12">切换线程后能恢复到正确位置</text>
<rect x="360" y="80" width="260" height="80" fill="#f8bbd0" stroke="#880e4f" stroke-width="1"/>
<text x="380" y="105" font-size="14" font-weight="bold">2. 记录执行位置</text>
<text x="380" y="125" font-size="12">Java 方法：字节码行号</text>
<text x="380" y="143" font-size="12">Native 方法：undefined</text>
<rect x="80" y="175" width="260" height="80" fill="#f8bbd0" stroke="#880e4f" stroke-width="1"/>
<text x="100" y="200" font-size="14" font-weight="bold">3. 唯一无 OOM 区域</text>
<text x="100" y="220" font-size="12">不会发生内存溢出</text>
<text x="100" y="238" font-size="12">不需要垃圾回收</text>
<rect x="360" y="175" width="260" height="80" fill="#f8bbd0" stroke="#880e4f" stroke-width="1"/>
<text x="380" y="200" font-size="14" font-weight="bold">4. 占用内存极小</text>
<text x="380" y="220" font-size="12">只存储一个地址值</text>
<text x="380" y="238" font-size="12">可忽略不计</text>
<text x="350" y="285" text-anchor="middle" font-size="13" font-style="italic">作用：线程切换后能恢复到正确的执行位置</text>
</svg>

**工作原理：**
1. **执行 Java 方法**：PC 寄存器记录正在执行的字节码指令地址
2. **执行 Native 方法**：PC 寄存器值为 undefined（空）
3. **线程切换**：保存当前 PC 值，切换回来时恢复，继续执行

**实际应用场景：**
- 多线程环境下保证线程执行的连续性
- 支持线程切换和恢复
- 实现分支、循环、跳转等流程控制

### 5. 什么是虚拟机栈？栈帧包含哪些内容？

**虚拟机栈（VM Stack）**是线程私有的，生命周期与线程相同。每个方法执行时都会创建一个**栈帧（Stack Frame）**，用于存储局部变量、操作数栈、动态链接、方法返回地址等信息。

**栈帧结构：**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold">虚拟机栈与栈帧结构</text>
<rect x="50" y="60" width="280" height="460" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="190" y="90" text-anchor="middle" font-size="16" font-weight="bold">虚拟机栈</text>
<rect x="70" y="110" width="240" height="90" fill="#e1bee7" stroke="#6a1b9a" stroke-width="1"/>
<text x="190" y="135" text-anchor="middle" font-size="13">栈帧 3（栈顶）</text>
<text x="190" y="155" text-anchor="middle" font-size="11">method3()</text>
<text x="190" y="172" text-anchor="middle" font-size="11">正在执行</text>
<path d="M 310 155 L 360 155" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrowred)"/>
<rect x="70" y="210" width="240" height="90" fill="#ce93d8" stroke="#6a1b9a" stroke-width="1"/>
<text x="190" y="235" text-anchor="middle" font-size="13">栈帧 2</text>
<text x="190" y="255" text-anchor="middle" font-size="11">method2()</text>
<text x="190" y="272" text-anchor="middle" font-size="11">等待中</text>
<rect x="70" y="310" width="240" height="90" fill="#ba68c8" stroke="#6a1b9a" stroke-width="1"/>
<text x="190" y="335" text-anchor="middle" font-size="13">栈帧 1（栈底）</text>
<text x="190" y="355" text-anchor="middle" font-size="11">method1()</text>
<text x="190" y="372" text-anchor="middle" font-size="11">等待中</text>
<text x="190" y="430" text-anchor="middle" font-size="12" font-style="italic">方法调用：压栈</text>
<text x="190" y="450" text-anchor="middle" font-size="12" font-style="italic">方法返回：出栈</text>
<defs><marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#d32f2f"/></marker></defs>
<rect x="370" y="60" width="380" height="460" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
<text x="560" y="90" text-anchor="middle" font-size="16" font-weight="bold">栈帧内部结构</text>
<rect x="390" y="110" width="340" height="85" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
<text x="410" y="135" font-size="14" font-weight="bold">1. 局部变量表</text>
<text x="410" y="155" font-size="11">存储方法参数和局部变量</text>
<text x="410" y="172" font-size="11">基本类型、对象引用、returnAddress</text>
<text x="410" y="188" font-size="11">容量单位：Slot（32/64 位）</text>
<rect x="390" y="205" width="340" height="70" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
<text x="410" y="230" font-size="14" font-weight="bold">2. 操作数栈</text>
<text x="410" y="250" font-size="11">执行字节码指令时的工作区</text>
<text x="410" y="267" font-size="11">存储计算的中间结果</text>
<rect x="390" y="285" width="340" height="70" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
<text x="410" y="310" font-size="14" font-weight="bold">3. 动态链接</text>
<text x="410" y="330" font-size="11">指向运行时常量池的方法引用</text>
<text x="410" y="347" font-size="11">支持动态链接（多态）</text>
<rect x="390" y="365" width="340" height="70" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
<text x="410" y="390" font-size="14" font-weight="bold">4. 方法返回地址</text>
<text x="410" y="410" font-size="11">正常返回：下一条指令地址</text>
<text x="410" y="427" font-size="11">异常返回：异常处理器位置</text>
<rect x="390" y="445" width="340" height="65" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
<text x="410" y="470" font-size="14" font-weight="bold">5. 附加信息</text>
<text x="410" y="490" font-size="11">调试信息、性能监控信息等</text>
</svg>

**关键概念：**

1. **局部变量表**：
   - 索引从 0 开始，实例方法的 slot 0 存储 this
   - long 和 double 占用 2 个 slot，其他类型占 1 个
   - 变量槽可重用，节省空间

2. **操作数栈**：
   - 后进先出（LIFO）结构
   - 最大深度在编译时确定
   - 用于字节码指令的操作数传递

3. **动态链接**：
   - 将符号引用转换为直接引用
   - 支持方法的动态绑定（晚期绑定）

**异常情况：**
- **StackOverflowError**：栈深度超过限制（如递归调用过深）
- **OutOfMemoryError**：动态扩展时无法申请到足够内存

### 6. 什么是本地方法栈？

**本地方法栈（Native Method Stack）** 与虚拟机栈作用类似，区别在于：
- **虚拟机栈**：为 Java 方法服务
- **本地方法栈**：为 Native 方法（C/C++ 实现）服务

**核心特点：**
1. **线程私有**：每个线程独立拥有
2. **存储内容**：Native 方法的局部变量、操作数等
3. **实现灵活**：JVM 规范未强制规定实现方式
4. **HotSpot VM**：将本地方法栈和虚拟机栈合二为一

**示例场景：**
```java
// Java 中的 Native 方法声明
public class Object {
    public native int hashCode();  // 由 C/C++ 实现
    public native Class<?> getClass();
}
```

**异常情况：**
- **StackOverflowError**：栈深度超限
- **OutOfMemoryError**：栈扩展失败

### 7. 直接内存是什么？

**直接内存（Direct Memory）** 不是 JVM 运行时数据区的一部分，也不是 JVM 规范定义的内存区域，但在 NIO 中被频繁使用。

**核心特点：**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="30" text-anchor="middle" font-size="20" font-weight="bold">直接内存 vs 堆内存</text>
<rect x="50" y="60" width="280" height="310" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="190" y="90" text-anchor="middle" font-size="16" font-weight="bold">堆内存（传统方式）</text>
<rect x="70" y="110" width="100" height="60" fill="#90caf9" stroke="#1565c0" stroke-width="1"/>
<text x="120" y="135" text-anchor="middle" font-size="12">Java 堆</text>
<text x="120" y="152" text-anchor="middle" font-size="11">byte[]</text>
<path d="M 170 140 L 210 140" stroke="#666" stroke-width="2" marker-end="url(#arrow1)"/>
<text x="190" y="130" text-anchor="middle" font-size="10">复制</text>
<rect x="210" y="110" width="100" height="60" fill="#64b5f6" stroke="#1565c0" stroke-width="1"/>
<text x="260" y="135" text-anchor="middle" font-size="12">OS 内核</text>
<text x="260" y="152" text-anchor="middle" font-size="11">缓冲区</text>
<text x="190" y="195" text-anchor="middle" font-size="12" font-weight="bold">缺点：</text>
<text x="70" y="220" font-size="11">• 数据需要复制两次</text>
<text x="70" y="240" font-size="11">• 性能开销大</text>
<text x="70" y="260" font-size="11">• 受 GC 影响</text>
<text x="70" y="280" font-size="11">• 适合小数据量</text>
<defs><marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs>
<rect x="370" y="60" width="280" height="310" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
<text x="510" y="90" text-anchor="middle" font-size="16" font-weight="bold">直接内存（NIO）</text>
<rect x="430" y="110" width="160" height="60" fill="#81c784" stroke="#2e7d32" stroke-width="1"/>
<text x="510" y="135" text-anchor="middle" font-size="12">OS 本地内存</text>
<text x="510" y="152" text-anchor="middle" font-size="11">DirectByteBuffer</text>
<text x="510" y="195" text-anchor="middle" font-size="12" font-weight="bold">优点：</text>
<text x="390" y="220" font-size="11">• 零拷贝，无需复制</text>
<text x="390" y="240" font-size="11">• 性能更高</text>
<text x="390" y="260" font-size="11">• 不受 GC 影响</text>
<text x="390" y="280" font-size="11">• 适合大数据量 I/O</text>
<text x="390" y="310" font-size="10" fill="#d32f2f">注意：不受 -Xmx 限制</text>
<text x="390" y="330" font-size="10" fill="#d32f2f">受 -XX:MaxDirectMemorySize 限制</text>
</svg>

**使用场景：**
```java
// NIO 中使用直接内存
ByteBuffer buffer = ByteBuffer.allocateDirect(1024);  // 分配直接内存
FileChannel channel = new FileInputStream(file).getChannel();
channel.read(buffer);  // 直接读取到本地内存，避免复制
```

**优势：**
1. **零拷贝**：避免 Java 堆与本地内存之间的数据复制
2. **高性能 I/O**：适合频繁的 I/O 操作
3. **不受 GC 影响**：减少 GC 压力

**劣势：**
1. **分配和释放成本高**：相比堆内存更昂贵
2. **难以管理**：需要手动释放，容易造成内存泄漏
3. **OutOfMemoryError**：超过 MaxDirectMemorySize 会抛出异常

**关键配置：**
```bash
-XX:MaxDirectMemorySize=512m  # 设置直接内存最大值
```

## 垃圾回收

### 8. 什么是垃圾回收？

**垃圾回收（Garbage Collection, GC）** 是 Java 自动内存管理的核心机制，负责识别和回收不再使用的对象，释放内存空间。

**为什么需要垃圾回收？**
1. **自动内存管理**：开发者无需手动释放内存（不像 C/C++ 需要 free/delete）
2. **防止内存泄漏**：自动回收不再使用的对象
3. **提高开发效率**：减少内存管理的复杂性

**垃圾回收的基本流程：**

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold">垃圾回收流程</text>
<rect x="50" y="60" width="180" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="10"/>
<text x="140" y="95" text-anchor="middle" font-size="16" font-weight="bold">1. 标记阶段</text>
<text x="140" y="118" text-anchor="middle" font-size="12">识别哪些对象</text>
<text x="140" y="133" text-anchor="middle" font-size="12">是垃圾</text>
<path d="M 230 100 L 280 100" stroke="#388e3c" stroke-width="3" marker-end="url(#arrowgreen)"/>
<rect x="280" y="60" width="180" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="10"/>
<text x="370" y="95" text-anchor="middle" font-size="16" font-weight="bold">2. 清除阶段</text>
<text x="370" y="118" text-anchor="middle" font-size="12">回收垃圾对象</text>
<text x="370" y="133" text-anchor="middle" font-size="12">占用的内存</text>
<path d="M 460 100 L 510 100" stroke="#388e3c" stroke-width="3" marker-end="url(#arrowgreen)"/>
<rect x="510" y="60" width="180" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="10"/>
<text x="600" y="95" text-anchor="middle" font-size="16" font-weight="bold">3. 整理阶段</text>
<text x="600" y="118" text-anchor="middle" font-size="12">（可选）整理内存</text>
<text x="600" y="133" text-anchor="middle" font-size="12">消除碎片</text>
<defs><marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#388e3c"/></marker></defs>
<rect x="50" y="170" width="340" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1"/>
<text x="220" y="195" text-anchor="middle" font-size="14" font-weight="bold">判断对象是否为垃圾的方法</text>
<text x="220" y="220" text-anchor="middle" font-size="12">• 引用计数法（有缺陷）</text>
<text x="220" y="240" text-anchor="middle" font-size="12">• 可达性分析算法（主流）</text>
<rect x="410" y="170" width="340" height="100" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="580" y="195" text-anchor="middle" font-size="14" font-weight="bold">GC 发生的区域</text>
<text x="580" y="220" text-anchor="middle" font-size="12">• 堆（主要）</text>
<text x="580" y="240" text-anchor="middle" font-size="12">• 方法区/元空间（较少）</text>
</svg>

**GC 的关键目标：**
1. **正确性**：不回收存活对象，不遗漏垃圾对象
2. **高效性**：回收速度快，减少停顿时间
3. **低开销**：GC 本身占用资源少

### 9. 如何判断对象是否可以回收？

判断对象是否可回收有两种主要方法：

**1. 引用计数法（Reference Counting）**

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="30" text-anchor="middle" font-size="18" font-weight="bold">引用计数法示例</text>
<circle cx="150" cy="120" r="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="150" y="115" text-anchor="middle" font-size="14">对象 A</text>
<text x="150" y="135" text-anchor="middle" font-size="12" font-weight="bold">计数: 1</text>
<circle cx="350" cy="120" r="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="350" y="115" text-anchor="middle" font-size="14">对象 B</text>
<text x="350" y="135" text-anchor="middle" font-size="12" font-weight="bold">计数: 1</text>
<circle cx="550" cy="120" r="50" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
<text x="550" y="115" text-anchor="middle" font-size="14">对象 C</text>
<text x="550" y="135" text-anchor="middle" font-size="12" font-weight="bold">计数: 0</text>
<text x="550" y="155" text-anchor="middle" font-size="11" fill="#d32f2f">可回收</text>
<path d="M 80 60 L 120 90" stroke="#388e3c" stroke-width="2" marker-end="url(#arrowgreen2)"/>
<text x="70" y="50" font-size="12">引用 1</text>
<path d="M 280 60 L 320 90" stroke="#388e3c" stroke-width="2" marker-end="url(#arrowgreen2)"/>
<text x="270" y="50" font-size="12">引用 1</text>
<defs><marker id="arrowgreen2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#388e3c"/></marker></defs>
<rect x="50" y="200" width="280" height="80" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
<text x="190" y="225" text-anchor="middle" font-size="13" font-weight="bold">优点</text>
<text x="190" y="245" text-anchor="middle" font-size="11">• 实现简单</text>
<text x="190" y="262" text-anchor="middle" font-size="11">• 回收及时</text>
<rect x="370" y="200" width="280" height="80" fill="#ffcdd2" stroke="#c62828" stroke-width="1"/>
<text x="510" y="225" text-anchor="middle" font-size="13" font-weight="bold">缺点（致命）</text>
<text x="510" y="245" text-anchor="middle" font-size="11">• 无法解决循环引用问题</text>
<text x="510" y="262" text-anchor="middle" font-size="11">• 每次引用变化都要更新计数</text>
</svg>

**循环引用问题示例：**
```java
// 对象 A 和 B 互相引用，但外部无引用
A.ref = B;
B.ref = A;
// A 和 B 的引用计数都是 1，但实际上都是垃圾
// 引用计数法无法回收！
```

**2. 可达性分析算法（Reachability Analysis）** —— Java 采用的方法

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">可达性分析算法</text>

<!-- GC Roots -->
<rect x="350" y="50" width="100" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" font-size="13" font-weight="bold" fill="white">GC Roots</text>

<!-- 可达对象 -->
<circle cx="250" cy="160" r="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="250" y="165" text-anchor="middle" font-size="12">对象 A</text>

<circle cx="400" cy="160" r="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="400" y="165" text-anchor="middle" font-size="12">对象 B</text>

<circle cx="550" cy="160" r="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="550" y="165" text-anchor="middle" font-size="12">对象 C</text>

<!-- 不可达对象 -->
<circle cx="200" cy="280" r="40" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
<text x="200" y="285" text-anchor="middle" font-size="12">对象 D</text>

<circle cx="350" cy="280" r="40" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
<text x="350" y="285" text-anchor="middle" font-size="12">对象 E</text>

<!-- 箭头定义 -->
<defs>
  <marker id="arrowgreen3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L9,3 z" fill="#4caf50"/>
  </marker>
  <marker id="arrowred2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L9,3 z" fill="#d32f2f"/>
  </marker>
</defs>

<!-- GC Roots 到可达对象的箭头（修复后） -->
<!-- GC Roots 到 A：从(380,90)到A的边缘(285,141) -->
<path d="M 380 90 L 285 141" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowgreen3)"/>

<!-- GC Roots 到 B：从(400,90)到B的顶部边缘(400,120) -->
<path d="M 400 90 L 400 120" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowgreen3)"/>

<!-- GC Roots 到 C：从(420,90)到C的边缘(515,141) -->
<path d="M 420 90 L 515 141" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowgreen3)"/>

<!-- 不可达对象之间的引用（循环引用） -->
<path d="M 210 240 L 230 200" stroke="#d32f2f" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowred2)"/>
<path d="M 310 280 L 240 280" stroke="#d32f2f" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowred2)"/>

<!-- 标注 -->
<text x="150" y="180" font-size="11" fill="#2e7d32">可达</text>
<text x="600" y="180" font-size="11" fill="#2e7d32">可达</text>
<text x="150" y="300" font-size="11" fill="#d32f2f">不可达 → 垃圾</text>
<text x="380" y="300" font-size="11" fill="#d32f2f">不可达 → 垃圾</text>

<!-- 说明框 -->
<rect x="50" y="340" width="700" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="400" y="362" text-anchor="middle" font-size="12" font-weight="bold">
  核心思想：从 GC Roots 出发，能到达的对象是存活的，不能到达的是垃圾
</text>
<text x="400" y="380" text-anchor="middle" font-size="11">
  可以解决循环引用问题
</text>
</svg>

**对比总结：**
- **引用计数法**：简单但有缺陷（循环引用），几乎不被主流 JVM 采用
- **可达性分析**：Java 的主流方案，能正确处理循环引用

### 10. 什么是 GC Roots？哪些对象可以作为 GC Roots？

**GC Roots** 是可达性分析的起点，从这些根对象出发，通过引用链能到达的对象都是存活的。

**可以作为 GC Roots 的对象：**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold">GC Roots 对象类型</text>
<rect x="350" y="50" width="100" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" font-size="14" font-weight="bold" fill="white">GC Roots</text>
<rect x="80" y="120" width="280" height="70" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="220" y="145" text-anchor="middle" font-size="14" font-weight="bold">1. 虚拟机栈中的引用</text>
<text x="220" y="167" text-anchor="middle" font-size="11">局部变量表中引用的对象</text>
<text x="220" y="182" text-anchor="middle" font-size="11">例如：方法中的局部变量</text>
<rect x="440" y="120" width="280" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="580" y="145" text-anchor="middle" font-size="14" font-weight="bold">2. 方法区中的静态变量</text>
<text x="580" y="167" text-anchor="middle" font-size="11">类静态属性引用的对象</text>
<text x="580" y="182" text-anchor="middle" font-size="11">例如：static Object obj</text>
<rect x="80" y="210" width="280" height="70" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="220" y="235" text-anchor="middle" font-size="14" font-weight="bold">3. 方法区中的常量引用</text>
<text x="220" y="257" text-anchor="middle" font-size="11">常量池中引用的对象</text>
<text x="220" y="272" text-anchor="middle" font-size="11">例如：final static Object obj</text>
<rect x="440" y="210" width="280" height="70" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
<text x="580" y="235" text-anchor="middle" font-size="14" font-weight="bold">4. 本地方法栈中的引用</text>
<text x="580" y="257" text-anchor="middle" font-size="11">JNI 引用的对象</text>
<text x="580" y="272" text-anchor="middle" font-size="11">Native 方法中的对象</text>
<rect x="80" y="300" width="280" height="70" fill="#fce4ec" stroke="#c2185b" stroke-width="2"/>
<text x="220" y="325" text-anchor="middle" font-size="14" font-weight="bold">5. 被同步锁持有的对象</text>
<text x="220" y="347" text-anchor="middle" font-size="11">synchronized 关键字</text>
<text x="220" y="362" text-anchor="middle" font-size="11">持有的对象</text>
<rect x="440" y="300" width="280" height="70" fill="#fff9c4" stroke="#f9a825" stroke-width="2"/>
<text x="580" y="325" text-anchor="middle" font-size="14" font-weight="bold">6. JVM 内部引用</text>
<text x="580" y="347" text-anchor="middle" font-size="11">基本类型的 Class 对象</text>
<text x="580" y="362" text-anchor="middle" font-size="11">异常对象、类加载器等</text>
<path d="M 370 90 L 220 120" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<path d="M 430 90 L 580 120" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<path d="M 350 90 L 220 210" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<path d="M 450 90 L 580 210" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<path d="M 370 90 L 220 300" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<path d="M 430 90 L 580 300" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<rect x="50" y="395" width="700" height="80" fill="#e0f7fa" stroke="#00838f" stroke-width="1"/>
<text x="400" y="420" text-anchor="middle" font-size="13" font-weight="bold">记忆技巧：栈（虚拟机栈、本地方法栈）+ 静（静态变量）+ 常（常量）+ 锁 + JVM内部</text>
<text x="400" y="442" text-anchor="middle" font-size="12">核心原则：在任何时刻都不会被回收的对象</text>
<text x="400" y="462" text-anchor="middle" font-size="11">这些对象要么正在使用，要么是系统必需的</text>
</svg>

**实际示例：**
```java
public class GCRootsDemo {
    private static Object staticObj = new Object();  // GC Root: 静态变量
    private static final Object CONST_OBJ = new Object();  // GC Root: 常量

    public void method() {
        Object localObj = new Object();  // GC Root: 局部变量（方法执行期间）
        // localObj 在方法执行期间是 GC Root
        // 方法结束后，localObj 不再是 GC Root
    }
}
```

### 11. 什么是引用计数法？有什么缺点？

**引用计数法**：给对象添加一个引用计数器，每当有地方引用它时计数器 +1，引用失效时 -1，计数器为 0 的对象可被回收。

**缺点：**（已在问题 9 中详细说明）
1. **无法解决循环引用**：A 引用 B，B 引用 A，即使外部无引用，计数器也不为 0
2. **性能开销**：每次引用变化都要更新计数器
3. **线程安全**：多线程环境下需要同步，影响性能

**Python 的解决方案：**
Python 使用引用计数 + 循环检测机制组合使用。

### 12. 什么是可达性分析算法？

**可达性分析算法**通过从 GC Roots 出发，沿着引用链向下搜索，能够到达的对象标记为存活，无法到达的对象标记为垃圾。

**算法流程：**
1. 从 GC Roots 开始遍历对象图
2. 标记所有可达对象
3. 未被标记的对象即为垃圾

**优势：**
- 能正确处理循环引用
- 是 Java、C#、Go 等现代语言的主流方案

（已在问题 9 中有详细图示）

### 13. Java 中的引用类型有哪些？

Java 中有 **4 种引用类型**，按强度从强到弱排序：

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold">Java 引用类型层次</text>
<rect x="50" y="60" width="700" height="80" fill="#1b5e20" stroke="#2e7d32" stroke-width="2"/>
<text x="400" y="95" text-anchor="middle" font-size="16" font-weight="bold" fill="white">强引用（Strong Reference）</text>
<text x="400" y="120" text-anchor="middle" font-size="12" fill="white">最强，永不回收（除非显式置为 null）</text>
<rect x="50" y="150" width="700" height="60" fill="#558b2f" stroke="#689f38" stroke-width="2"/>
<text x="400" y="175" text-anchor="middle" font-size="16" font-weight="bold" fill="white">软引用（Soft Reference）</text>
<text x="400" y="195" text-anchor="middle" font-size="11" fill="white">内存不足时回收</text>
<rect x="50" y="220" width="700" height="60" fill="#9ccc65" stroke="#aed581" stroke-width="2"/>
<text x="400" y="245" text-anchor="middle" font-size="16" font-weight="bold">弱引用（Weak Reference）</text>
<text x="400" y="265" text-anchor="middle" font-size="11">下次 GC 时回收</text>
<rect x="50" y="290" width="700" height="60" fill="#c5e1a5" stroke="#dce775" stroke-width="2"/>
<text x="400" y="315" text-anchor="middle" font-size="16" font-weight="bold">虚引用（Phantom Reference）</text>
<text x="400" y="335" text-anchor="middle" font-size="11">最弱，随时可能被回收，用于跟踪对象回收</text>
</svg>

### 14. 强引用、软引用、弱引用、虚引用的区别？

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="20" font-weight="bold">四种引用类型对比</text>

<!-- 表头 -->
<rect x="30" y="50" width="160" height="50" fill="#455a64" stroke="#263238" stroke-width="1"/>
<text x="110" y="80" text-anchor="middle" font-size="13" font-weight="bold" fill="white">类型</text>

<rect x="200" y="50" width="150" height="50" fill="#455a64" stroke="#263238" stroke-width="1"/>
<text x="275" y="80" text-anchor="middle" font-size="13" font-weight="bold" fill="white">回收时机</text>

<rect x="360" y="50" width="200" height="50" fill="#455a64" stroke="#263238" stroke-width="1"/>
<text x="460" y="80" text-anchor="middle" font-size="13" font-weight="bold" fill="white">使用场景</text>

<rect x="570" y="50" width="250" height="50" fill="#455a64" stroke="#263238" stroke-width="1"/>
<text x="695" y="80" text-anchor="middle" font-size="13" font-weight="bold" fill="white">代码示例</text>

<!-- 强引用 -->
<rect x="30" y="100" width="160" height="100" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
<text x="110" y="125" text-anchor="middle" font-size="14" font-weight="bold">强引用</text>
<text x="110" y="145" text-anchor="middle" font-size="11">Strong</text>
<text x="110" y="162" text-anchor="middle" font-size="11">Reference</text>

<rect x="200" y="100" width="150" height="100" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1"/>
<text x="210" y="125" font-size="11">永不回收</text>
<text x="210" y="142" font-size="10">（除非置 null</text>
<text x="210" y="157" font-size="10">或离开作用域）</text>

<rect x="360" y="100" width="200" height="100" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1"/>
<text x="370" y="125" font-size="11">普通对象引用</text>
<text x="370" y="142" font-size="10">99% 的场景</text>

<rect x="570" y="100" width="250" height="100" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1"/>
<text x="580" y="125" font-size="9" font-family="monospace">Object obj = </text>
<text x="580" y="140" font-size="9" font-family="monospace">  new Object();</text>
<text x="580" y="160" font-size="9" font-family="monospace">// 强引用</text>
<text x="580" y="180" font-size="9" font-family="monospace">obj = null; // 解除</text>

<!-- 软引用 -->
<rect x="30" y="200" width="160" height="100" fill="#fff9c4" stroke="#f9a825" stroke-width="1"/>
<text x="110" y="225" text-anchor="middle" font-size="14" font-weight="bold">软引用</text>
<text x="110" y="245" text-anchor="middle" font-size="11">Soft</text>
<text x="110" y="262" text-anchor="middle" font-size="11">Reference</text>

<rect x="200" y="200" width="150" height="100" fill="#fffde7" stroke="#f9a825" stroke-width="1"/>
<text x="210" y="225" font-size="11">内存不足时</text>
<text x="210" y="242" font-size="11">才回收</text>

<rect x="360" y="200" width="200" height="100" fill="#fffde7" stroke="#f9a825" stroke-width="1"/>
<text x="370" y="225" font-size="11">缓存</text>
<text x="370" y="242" font-size="10">内存敏感的缓存</text>
<text x="370" y="257" font-size="10">图片缓存等</text>

<rect x="570" y="200" width="250" height="100" fill="#fffde7" stroke="#f9a825" stroke-width="1"/>
<text x="580" y="220" font-size="9" font-family="monospace">SoftReference&lt;Obj&gt; s</text>
<text x="580" y="235" font-size="9" font-family="monospace"> = new SoftRef...(o);</text>
<text x="580" y="255" font-size="9" font-family="monospace">Object o = s.get();</text>
<text x="580" y="275" font-size="9" font-family="monospace">// OOM 前回收</text>

<!-- 弱引用 -->
<rect x="30" y="300" width="160" height="100" fill="#e1bee7" stroke="#7b1fa2" stroke-width="1"/>
<text x="110" y="325" text-anchor="middle" font-size="14" font-weight="bold">弱引用</text>
<text x="110" y="345" text-anchor="middle" font-size="11">Weak</text>
<text x="110" y="362" text-anchor="middle" font-size="11">Reference</text>

<rect x="200" y="300" width="150" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1"/>
<text x="210" y="325" font-size="11">下次 GC 时</text>
<text x="210" y="342" font-size="11">一定回收</text>

<rect x="360" y="300" width="200" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1"/>
<text x="370" y="325" font-size="11">短期缓存</text>
<text x="370" y="342" font-size="10">ThreadLocalMap</text>
<text x="370" y="357" font-size="10">WeakHashMap</text>

<rect x="570" y="300" width="250" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1"/>
<text x="580" y="320" font-size="9" font-family="monospace">WeakReference&lt;Obj&gt; w</text>
<text x="580" y="335" font-size="9" font-family="monospace"> = new WeakRef...(o);</text>
<text x="580" y="355" font-size="9" font-family="monospace">Object o = w.get();</text>
<text x="580" y="375" font-size="9" font-family="monospace">// 下次 GC 回收</text>

<!-- 虚引用 -->
<rect x="30" y="400" width="160" height="100" fill="#ffccbc" stroke="#d84315" stroke-width="1"/>
<text x="110" y="425" text-anchor="middle" font-size="14" font-weight="bold">虚引用</text>
<text x="110" y="445" text-anchor="middle" font-size="11">Phantom</text>
<text x="110" y="462" text-anchor="middle" font-size="11">Reference</text>

<rect x="200" y="400" width="150" height="100" fill="#fbe9e7" stroke="#d84315" stroke-width="1"/>
<text x="210" y="425" font-size="11">任何时候</text>
<text x="210" y="442" font-size="11">都可能被回收</text>
<text x="210" y="457" font-size="10">get() 返回 null</text>

<rect x="360" y="400" width="200" height="100" fill="#fbe9e7" stroke="#d84315" stroke-width="1"/>
<text x="370" y="425" font-size="11">跟踪对象回收</text>
<text x="370" y="442" font-size="10">管理堆外内存</text>
<text x="370" y="457" font-size="10">NIO DirectBuffer</text>

<rect x="570" y="400" width="250" height="100" fill="#fbe9e7" stroke="#d84315" stroke-width="1"/>
<text x="580" y="418" font-size="8.5" font-family="monospace">ReferenceQueue&lt;Obj&gt; q</text>
<text x="580" y="433" font-size="8.5" font-family="monospace"> = new RefQueue&lt;&gt;();</text>
<text x="580" y="453" font-size="8.5" font-family="monospace">PhantomRef&lt;Obj&gt; p = </text>
<text x="580" y="473" font-size="8.5" font-family="monospace"> new PhantomRef...(o,q);</text>
</svg>

**记忆技巧：强软弱虚**
1. **强**：强制保留，不回收
2. **软**：软性要求，内存不足才回收（像缓存）
3. **弱**：弱不禁风，GC 就回收
4. **虚**：虚无缥缈，get() 都是 null

**实际应用场景：**
```java
// 1. 软引用 - 图片缓存
Map<String, SoftReference<Bitmap>> imageCache = new HashMap<>();
imageCache.put("key", new SoftReference<>(bitmap));
// 内存不足时自动清理缓存

// 2. 弱引用 - ThreadLocal
// ThreadLocalMap 的 Entry 继承 WeakReference
// key 是弱引用，防止内存泄漏

// 3. 虚引用 - DirectByteBuffer 清理
// 用于跟踪堆外内存的回收
```

## 垃圾回收算法

### 15. 标记-清除算法的原理？优缺点？

**标记-清除算法（Mark-Sweep）**是最基础的垃圾收集算法，分为两个阶段：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">标记-清除算法</text>
<text x="200" y="60" text-anchor="middle" font-size="16" font-weight="bold">阶段 1：标记</text>
<rect x="50" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="80" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="120" y="80" width="60" height="50" fill="#f44336" stroke="#c62828" stroke-width="2"/>
<text x="150" y="110" text-anchor="middle" font-size="11" fill="white">垃圾</text>
<rect x="190" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="220" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="260" y="80" width="60" height="50" fill="#f44336" stroke="#c62828" stroke-width="2"/>
<text x="290" y="110" text-anchor="middle" font-size="11" fill="white">垃圾</text>
<rect x="330" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="360" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<path d="M 200 150 L 200 180" stroke="#666" stroke-width="3" marker-end="url(#arrowdown)"/>
<text x="200" y="205" text-anchor="middle" font-size="14">清除垃圾对象</text>
<text x="600" y="60" text-anchor="middle" font-size="16" font-weight="bold">阶段 2：清除</text>
<rect x="450" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="480" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="520" y="80" width="60" height="50" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1" stroke-dasharray="3,3"/>
<text x="550" y="110" text-anchor="middle" font-size="11" fill="#666">空闲</text>
<rect x="590" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="620" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="660" y="80" width="60" height="50" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1" stroke-dasharray="3,3"/>
<text x="690" y="110" text-anchor="middle" font-size="11" fill="#666">空闲</text>
<rect x="730" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="760" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<text x="640" y="155" text-anchor="middle" font-size="12" fill="#d32f2f" font-weight="bold">⚠ 产生内存碎片</text>
<defs><marker id="arrowdown" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto"><path d="M0,0 L10,0 L5,9 z" fill="#666"/></marker></defs>
<rect x="50" y="240" width="340" height="140" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
<text x="220" y="265" text-anchor="middle" font-size="14" font-weight="bold">优点</text>
<text x="220" y="290" text-anchor="middle" font-size="12">• 实现简单</text>
<text x="220" y="310" text-anchor="middle" font-size="12">• 不需要移动对象</text>
<text x="220" y="330" text-anchor="middle" font-size="12">• 适合存活对象多的场景</text>
<text x="220" y="350" text-anchor="middle" font-size="12">（老年代）</text>
<rect x="410" y="240" width="340" height="140" fill="#ffcdd2" stroke="#c62828" stroke-width="2"/>
<text x="580" y="265" text-anchor="middle" font-size="14" font-weight="bold">缺点</text>
<text x="580" y="290" text-anchor="middle" font-size="12">• 效率不稳定（对象多时慢）</text>
<text x="580" y="310" text-anchor="middle" font-size="12">• 产生内存碎片</text>
<text x="580" y="330" text-anchor="middle" font-size="12">• 需要维护空闲列表</text>
<text x="580" y="350" text-anchor="middle" font-size="12">• 分配大对象时可能失败</text>
</svg>

**核心问题：内存碎片**
- 清除后内存不连续，出现很多小的空闲区域
- 即使总空闲空间足够，也可能无法分配大对象
- 需要额外的空闲列表维护成本

### 16. 标记-复制算法的原理？优缺点？

**标记-复制算法（Mark-Copy）**将内存分为两块，每次只使用其中一块。GC 时将存活对象复制到另一块，然后清空当前块。

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">标记-复制算法（新生代）</text>
<text x="200" y="60" text-anchor="middle" font-size="16" font-weight="bold">GC 前</text>
<rect x="50" y="80" width="300" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="200" y="100" text-anchor="middle" font-size="13" font-weight="bold">Eden 区（使用中）</text>
<rect x="70" y="110" width="40" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/>
<text x="90" y="135" text-anchor="middle" font-size="10" fill="white">存活</text>
<rect x="120" y="110" width="40" height="40" fill="#f44336" stroke="#c62828" stroke-width="1"/>
<text x="140" y="135" text-anchor="middle" font-size="10" fill="white">垃圾</text>
<rect x="170" y="110" width="40" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/>
<text x="190" y="135" text-anchor="middle" font-size="10" fill="white">存活</text>
<rect x="220" y="110" width="40" height="40" fill="#f44336" stroke="#c62828" stroke-width="1"/>
<text x="240" y="135" text-anchor="middle" font-size="10" fill="white">垃圾</text>
<rect x="270" y="110" width="40" height="40" fill="#f44336" stroke="#c62828" stroke-width="1"/>
<text x="290" y="135" text-anchor="middle" font-size="10" fill="white">垃圾</text>
<text x="200" y="180" text-anchor="middle" font-size="11">8 个对象，2 个存活，6 个垃圾</text>
<rect x="50" y="220" width="140" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
<text x="120" y="240" text-anchor="middle" font-size="13" font-weight="bold">Survivor 0（空闲）</text>
<rect x="210" y="220" width="140" height="80" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1"/>
<text x="280" y="240" text-anchor="middle" font-size="13" font-weight="bold">Survivor 1（空闲）</text>
<path d="M 350 180 L 400 180" stroke="#388e3c" stroke-width="3" marker-end="url(#arrowright)"/>
<text x="375" y="170" text-anchor="middle" font-size="12" fill="#d32f2f" font-weight="bold">复制存活对象</text>
<text x="600" y="60" text-anchor="middle" font-size="16" font-weight="bold">GC 后</text>
<rect x="450" y="80" width="300" height="120" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1" stroke-dasharray="5,5"/>
<text x="600" y="100" text-anchor="middle" font-size="13" font-weight="bold">Eden 区（清空）</text>
<text x="600" y="125" text-anchor="middle" font-size="11" fill="#666">全部清空，无碎片</text>
<rect x="450" y="220" width="140" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="520" y="240" text-anchor="middle" font-size="13" font-weight="bold">Survivor 0（使用中）</text>
<rect x="470" y="250" width="40" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/>
<text x="490" y="275" text-anchor="middle" font-size="10" fill="white">存活</text>
<rect x="520" y="250" width="40" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/>
<text x="540" y="275" text-anchor="middle" font-size="10" fill="white">存活</text>
<rect x="610" y="220" width="140" height="80" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1"/>
<text x="680" y="240" text-anchor="middle" font-size="13" font-weight="bold">Survivor 1（空闲）</text>
<text x="600" y="180" text-anchor="middle" font-size="11" fill="#2e7d32" font-weight="bold">✓ 只保留存活对象，无碎片</text>
<defs><marker id="arrowright" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0,0 L0,10 L9,5 z" fill="#388e3c"/></marker></defs>
<rect x="50" y="330" width="340" height="110" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
<text x="220" y="355" text-anchor="middle" font-size="14" font-weight="bold">优点</text>
<text x="220" y="377" text-anchor="middle" font-size="12">• 无内存碎片</text>
<text x="220" y="397" text-anchor="middle" font-size="12">• 效率高（只复制存活对象）</text>
<text x="220" y="417" text-anchor="middle" font-size="12">• 适合存活对象少的场景（新生代）</text>
<rect x="410" y="330" width="340" height="110" fill="#ffcdd2" stroke="#c62828" stroke-width="2"/>
<text x="580" y="355" text-anchor="middle" font-size="14" font-weight="bold">缺点</text>
<text x="580" y="377" text-anchor="middle" font-size="12">• 浪费一半内存（实际只用 10%）</text>
<text x="580" y="397" text-anchor="middle" font-size="12">• 存活对象多时效率低</text>
<text x="580" y="417" text-anchor="middle" font-size="12">• 需要额外的空间担保</text>
</svg>

**HotSpot 的优化：Eden + 2个Survivor（8:1:1）**
- Eden : Survivor0 : Survivor1 = 8 : 1 : 1
- 每次使用 Eden + 1个Survivor，利用率 90%
- GC 时将存活对象复制到另一个 Survivor
- 如果 Survivor 放不下，则直接进入老年代（空间担保）

**适用场景：新生代**（对象存活率低，通常 < 10%）

### 17. 标记-整理算法的原理？优缺点？

**标记-整理算法（Mark-Compact）**标记后不是直接清理，而是让所有存活对象向内存一端移动，然后清理边界外的内存。

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">标记-整理算法</text>
<text x="200" y="60" text-anchor="middle" font-size="16" font-weight="bold">整理前</text>
<rect x="50" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="80" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="120" y="80" width="60" height="50" fill="#f44336" stroke="#c62828" stroke-width="2"/>
<text x="150" y="110" text-anchor="middle" font-size="11" fill="white">垃圾</text>
<rect x="190" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="220" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="260" y="80" width="60" height="50" fill="#f44336" stroke="#c62828" stroke-width="2"/>
<text x="290" y="110" text-anchor="middle" font-size="11" fill="white">垃圾</text>
<rect x="330" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="360" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<text x="200" y="155" text-anchor="middle" font-size="11">内存碎片化</text>
<path d="M 200 170 L 200 200" stroke="#666" stroke-width="3" marker-end="url(#arrowdown2)"/>
<text x="200" y="225" text-anchor="middle" font-size="13" fill="#d32f2f" font-weight="bold">压缩整理</text>
<text x="200" y="245" text-anchor="middle" font-size="11">移动存活对象到一端</text>
<defs><marker id="arrowdown2" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto"><path d="M0,0 L10,0 L5,9 z" fill="#666"/></marker></defs>
<text x="600" y="60" text-anchor="middle" font-size="16" font-weight="bold">整理后</text>
<rect x="450" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="480" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="520" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="550" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="590" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="620" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="660" y="80" width="130" height="50" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1" stroke-dasharray="3,3"/>
<text x="725" y="110" text-anchor="middle" font-size="11" fill="#666">清空区域</text>
<text x="600" y="155" text-anchor="middle" font-size="11" fill="#2e7d32" font-weight="bold">✓ 连续内存，无碎片</text>
<rect x="50" y="280" width="340" height="110" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
<text x="220" y="305" text-anchor="middle" font-size="14" font-weight="bold">优点</text>
<text x="220" y="327" text-anchor="middle" font-size="12">• 无内存碎片</text>
<text x="220" y="347" text-anchor="middle" font-size="12">• 内存利用率高（无需预留空间）</text>
<text x="220" y="367" text-anchor="middle" font-size="12">• 适合存活对象多的场景（老年代）</text>
<rect x="410" y="280" width="340" height="110" fill="#ffcdd2" stroke="#c62828" stroke-width="2"/>
<text x="580" y="305" text-anchor="middle" font-size="14" font-weight="bold">缺点</text>
<text x="580" y="327" text-anchor="middle" font-size="12">• 移动对象开销大</text>
<text x="580" y="347" text-anchor="middle" font-size="12">• 需要暂停用户线程（STW）</text>
<text x="580" y="367" text-anchor="middle" font-size="12">• 更新所有引用，效率较低</text>
</svg>

**三种算法对比：**

| 算法 | 速度 | 空间利用率 | 是否移动对象 | 适用场景 |
|------|------|-----------|-------------|----------|
| 标记-清除 | 中等 | 低（碎片） | 否 | 老年代 |
| 标记-复制 | 快 | 低（50%或90%） | 是 | 新生代 |
| 标记-整理 | 慢 | 高 | 是 | 老年代 |

**记忆技巧：**
- **清除**：最简单，但有碎片（像扫地，不整理）
- **复制**：最快，但浪费空间（像搬家，只带走有用的）
- **整理**：最慢，但最节省（像整理书架，移动归位）

### 18. 分代收集算法是什么？

**分代收集（Generational Collection）**根据对象存活周期的不同，将堆分为新生代和老年代，针对不同代使用不同的收集算法。

**理论基础：弱分代假说（Weak Generational Hypothesis）**
1. **大部分对象朝生夕死**：98% 的对象在创建后很快死亡
2. **熬过多次 GC 的对象难以消亡**：存活时间长的对象会继续存活很久

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">分代收集模型</text>
<rect x="50" y="50" width="700" height="370" fill="#f5f5f5" stroke="#333" stroke-width="2"/>
<text x="400" y="75" text-anchor="middle" font-size="16" font-weight="bold">Java 堆</text>
<rect x="80" y="100" width="640" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="400" y="125" text-anchor="middle" font-size="15" font-weight="bold">新生代（Young Generation）1/3</text>
<rect x="100" y="140" width="400" height="90" fill="#81c784" stroke="#388e3c" stroke-width="1"/>
<text x="300" y="165" text-anchor="middle" font-size="13">Eden 区（80%）</text>
<text x="300" y="185" text-anchor="middle" font-size="11">对象首次分配的区域</text>
<text x="300" y="203" text-anchor="middle" font-size="11">存活率：< 10%</text>
<rect x="520" y="140" width="90" height="90" fill="#a5d6a7" stroke="#66bb6a" stroke-width="1"/>
<text x="565" y="165" text-anchor="middle" font-size="12">Survivor 0</text>
<text x="565" y="185" text-anchor="middle" font-size="11">(10%)</text>
<rect x="620" y="140" width="90" height="90" fill="#a5d6a7" stroke="#66bb6a" stroke-width="1"/>
<text x="665" y="165" text-anchor="middle" font-size="12">Survivor 1</text>
<text x="665" y="185" text-anchor="middle" font-size="11">(10%)</text>
<text x="565" y="210" text-anchor="middle" font-size="10">两个 Survivor</text>
<text x="565" y="223" text-anchor="middle" font-size="10">交替使用</text>
<rect x="80" y="270" width="640" height="130" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="400" y="295" text-anchor="middle" font-size="15" font-weight="bold">老年代（Old Generation）2/3</text>
<text x="400" y="320" text-anchor="middle" font-size="12">存放长期存活的对象</text>
<text x="400" y="340" text-anchor="middle" font-size="12">对象经过多次 Minor GC 后晋升到这里</text>
<text x="400" y="360" text-anchor="middle" font-size="12">存活率：> 90%</text>
<text x="400" y="380" text-anchor="middle" font-size="11" fill="#d32f2f">大对象直接分配到老年代</text>
</svg>

### 19. 新生代和老年代使用什么垃圾回收算法？

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">分代与算法对应关系</text>
<rect x="50" y="60" width="330" height="260" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="215" y="90" text-anchor="middle" font-size="16" font-weight="bold">新生代</text>
<text x="215" y="115" text-anchor="middle" font-size="13">特点：对象朝生夕死</text>
<text x="215" y="140" text-anchor="middle" font-size="13" fill="#d32f2f" font-weight="bold">标记-复制算法</text>
<rect x="80" y="160" width="270" height="140" fill="#bbdefb" stroke="#1565c0" stroke-width="1"/>
<text x="215" y="185" text-anchor="middle" font-size="12" font-weight="bold">为什么选择复制算法？</text>
<text x="215" y="210" text-anchor="middle" font-size="11">• 存活对象少（< 10%）</text>
<text x="215" y="230" text-anchor="middle" font-size="11">• 复制成本低</text>
<text x="215" y="250" text-anchor="middle" font-size="11">• 无内存碎片</text>
<text x="215" y="270" text-anchor="middle" font-size="11">• 效率高，适合频繁 GC</text>
<rect x="420" y="60" width="330" height="260" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="585" y="90" text-anchor="middle" font-size="16" font-weight="bold">老年代</text>
<text x="585" y="115" text-anchor="middle" font-size="13">特点：对象存活率高</text>
<text x="585" y="140" text-anchor="middle" font-size="13" fill="#d32f2f" font-weight="bold">标记-清除 或 标记-整理</text>
<rect x="450" y="160" width="270" height="140" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="585" y="185" text-anchor="middle" font-size="12" font-weight="bold">为什么不用复制算法？</text>
<text x="585" y="210" text-anchor="middle" font-size="11">• 存活对象多（> 90%）</text>
<text x="585" y="230" text-anchor="middle" font-size="11">• 复制成本高</text>
<text x="585" y="250" text-anchor="middle" font-size="11">• 没有额外空间做担保</text>
<text x="585" y="270" text-anchor="middle" font-size="11">• GC 频率低，容忍整理开销</text>
</svg>

**对象晋升规则（新生代 → 老年代）：**
1. **年龄达标**：经过 15 次 Minor GC 仍存活（-XX:MaxTenuringThreshold）
2. **动态年龄判定**：Survivor 中相同年龄对象大小总和 > Survivor 空间一半
3. **大对象直接进入**：大对象（如大数组）直接分配到老年代
4. **空间担保失败**：Survivor 放不下时，直接进入老年代

**记忆技巧：**
- **新生代**：年轻人流动性大 → 复制算法（搬家）
- **老年代**：老年人稳定不动 → 清除/整理算法（原地整理）

### 20. 什么是 Minor GC、Major GC 和 Full GC？

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">GC 类型对比</text>
<rect x="50" y="60" width="230" height="360" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="165" y="90" text-anchor="middle" font-size="16" font-weight="bold">Minor GC</text>
<text x="165" y="115" text-anchor="middle" font-size="13">(Young GC)</text>
<rect x="70" y="130" width="190" height="270" fill="#bbdefb" stroke="#1565c0" stroke-width="1"/>
<text x="165" y="155" text-anchor="middle" font-size="13" font-weight="bold">发生区域</text>
<text x="165" y="175" text-anchor="middle" font-size="12">新生代</text>
<text x="165" y="205" text-anchor="middle" font-size="13" font-weight="bold">触发条件</text>
<text x="165" y="225" text-anchor="middle" font-size="11">Eden 区满</text>
<text x="165" y="255" text-anchor="middle" font-size="13" font-weight="bold">频率</text>
<text x="165" y="275" text-anchor="middle" font-size="11" fill="#d32f2f">非常频繁</text>
<text x="165" y="305" text-anchor="middle" font-size="13" font-weight="bold">停顿时间</text>
<text x="165" y="325" text-anchor="middle" font-size="11" fill="#4caf50">短（几十毫秒）</text>
<text x="165" y="355" text-anchor="middle" font-size="13" font-weight="bold">算法</text>
<text x="165" y="375" text-anchor="middle" font-size="11">标记-复制</text>
<rect x="295" y="60" width="230" height="360" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="410" y="90" text-anchor="middle" font-size="16" font-weight="bold">Major GC</text>
<text x="410" y="115" text-anchor="middle" font-size="13">(Old GC)</text>
<rect x="315" y="130" width="190" height="270" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="410" y="155" text-anchor="middle" font-size="13" font-weight="bold">发生区域</text>
<text x="410" y="175" text-anchor="middle" font-size="12">老年代</text>
<text x="410" y="205" text-anchor="middle" font-size="13" font-weight="bold">触发条件</text>
<text x="410" y="225" text-anchor="middle" font-size="11">老年代满</text>
<text x="410" y="245" text-anchor="middle" font-size="11">晋升失败</text>
<text x="410" y="275" text-anchor="middle" font-size="13" font-weight="bold">频率</text>
<text x="410" y="295" text-anchor="middle" font-size="11">较少</text>
<text x="410" y="325" text-anchor="middle" font-size="13" font-weight="bold">停顿时间</text>
<text x="410" y="345" text-anchor="middle" font-size="11" fill="#d32f2f">长（数秒）</text>
<text x="410" y="375" text-anchor="middle" font-size="13" font-weight="bold">算法</text>
<text x="410" y="395" text-anchor="middle" font-size="11">标记-清除/整理</text>
<rect x="540" y="60" width="230" height="360" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
<text x="655" y="90" text-anchor="middle" font-size="16" font-weight="bold">Full GC</text>
<text x="655" y="115" text-anchor="middle" font-size="13" fill="#d32f2f">(最重量级)</text>
<rect x="560" y="130" width="190" height="270" fill="#ffcdd2" stroke="#c62828" stroke-width="1"/>
<text x="655" y="155" text-anchor="middle" font-size="13" font-weight="bold">发生区域</text>
<text x="655" y="175" text-anchor="middle" font-size="12">整个堆 + 元空间</text>
<text x="655" y="205" text-anchor="middle" font-size="13" font-weight="bold">触发条件</text>
<text x="655" y="225" text-anchor="middle" font-size="10">System.gc()</text>
<text x="655" y="242" text-anchor="middle" font-size="10">老年代空间不足</text>
<text x="655" y="259" text-anchor="middle" font-size="10">元空间不足</text>
<text x="655" y="285" text-anchor="middle" font-size="13" font-weight="bold">频率</text>
<text x="655" y="305" text-anchor="middle" font-size="11">很少</text>
<text x="655" y="335" text-anchor="middle" font-size="13" font-weight="bold">停顿时间</text>
<text x="655" y="355" text-anchor="middle" font-size="11" fill="#d32f2f">最长（数秒到数十秒）</text>
<text x="655" y="385" text-anchor="middle" font-size="13" font-weight="bold">影响</text>
<text x="655" y="405" text-anchor="middle" font-size="11" fill="#d32f2f">Stop The World</text>
</svg>

**关键区别：**

| 类型 | 作用范围 | 速度 | 是否 STW | 触发频率 |
|------|---------|------|---------|---------|
| Minor GC | 新生代 | 快 | 是（短） | 非常高 |
| Major GC | 老年代 | 慢 | 是（长） | 较低 |
| Full GC | 整个堆+元空间 | 最慢 | 是（最长） | 很低 |

**注意事项：**
1. **Minor GC 不一定触发 Major GC**，但 Major GC 往往伴随至少一次 Minor GC
2. **Full GC = Minor GC + Major GC + 元空间 GC**
3. **CMS 收集器**中，Major GC 指单独收集老年代，与 Full GC 有区别
4. **G1 收集器**中，Mixed GC 同时回收新生代和部分老年代

**记忆技巧：小少中大全**
- **Minor**：小范围（新生代），少停顿
- **Major**：中范围（老年代），大停顿
- **Full**：全范围（整个堆），全停顿

## 垃圾回收器

### 21. 常见的垃圾回收器有哪些？

Java 有 7 款经典的垃圾回收器，按代际和并发性分类：

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">垃圾回收器全景图</text>
<rect x="50" y="50" width="700" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="400" y="80" text-anchor="middle" font-size="16" font-weight="bold">新生代回收器</text>
<rect x="80" y="100" width="150" height="140" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
<text x="155" y="125" text-anchor="middle" font-size="14" font-weight="bold">Serial</text>
<text x="155" y="145" text-anchor="middle" font-size="11">单线程</text>
<text x="155" y="160" text-anchor="middle" font-size="11">STW</text>
<text x="155" y="175" text-anchor="middle" font-size="11">复制算法</text>
<text x="155" y="195" text-anchor="middle" font-size="10">客户端模式</text>
<text x="155" y="210" text-anchor="middle" font-size="10">JDK 1.3 前</text>
<rect x="250" y="100" width="150" height="140" fill="#fff9c4" stroke="#f9a825" stroke-width="2"/>
<text x="325" y="125" text-anchor="middle" font-size="14" font-weight="bold">ParNew</text>
<text x="325" y="145" text-anchor="middle" font-size="11">多线程</text>
<text x="325" y="160" text-anchor="middle" font-size="11">STW</text>
<text x="325" y="175" text-anchor="middle" font-size="11">复制算法</text>
<text x="325" y="195" text-anchor="middle" font-size="10">Serial 多线程版</text>
<text x="325" y="210" text-anchor="middle" font-size="10">配合 CMS</text>
<rect x="420" y="100" width="150" height="140" fill="#ffe0b2" stroke="#ef6c00" stroke-width="2"/>
<text x="495" y="125" text-anchor="middle" font-size="14" font-weight="bold">Parallel Scavenge</text>
<text x="495" y="145" text-anchor="middle" font-size="11">多线程</text>
<text x="495" y="160" text-anchor="middle" font-size="11">STW</text>
<text x="495" y="175" text-anchor="middle" font-size="11">复制算法</text>
<text x="495" y="195" text-anchor="middle" font-size="10">吞吐量优先</text>
<text x="495" y="210" text-anchor="middle" font-size="10">JDK 8 默认</text>
<rect x="590" y="100" width="140" height="140" fill="#e1bee7" stroke="#7b1fa2" stroke-width="2"/>
<text x="660" y="125" text-anchor="middle" font-size="14" font-weight="bold">G1</text>
<text x="660" y="145" text-anchor="middle" font-size="11">（新生代部分）</text>
<text x="660" y="165" text-anchor="middle" font-size="10">并行+并发</text>
<text x="660" y="182" text-anchor="middle" font-size="10">分区算法</text>
<text x="660" y="200" text-anchor="middle" font-size="10">停顿可控</text>
<text x="660" y="218" text-anchor="middle" font-size="10">JDK 9 默认</text>
<rect x="50" y="290" width="700" height="220" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="400" y="320" text-anchor="middle" font-size="16" font-weight="bold">老年代回收器</text>
<rect x="80" y="340" width="150" height="140" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
<text x="155" y="365" text-anchor="middle" font-size="14" font-weight="bold">Serial Old</text>
<text x="155" y="385" text-anchor="middle" font-size="11">单线程</text>
<text x="155" y="400" text-anchor="middle" font-size="11">STW</text>
<text x="155" y="415" text-anchor="middle" font-size="11">标记-整理</text>
<text x="155" y="435" text-anchor="middle" font-size="10">CMS 后备方案</text>
<rect x="250" y="340" width="150" height="140" fill="#ffe0b2" stroke="#ef6c00" stroke-width="2"/>
<text x="325" y="365" text-anchor="middle" font-size="14" font-weight="bold">Parallel Old</text>
<text x="325" y="385" text-anchor="middle" font-size="11">多线程</text>
<text x="325" y="400" text-anchor="middle" font-size="11">STW</text>
<text x="325" y="415" text-anchor="middle" font-size="11">标记-整理</text>
<text x="325" y="435" text-anchor="middle" font-size="10">吞吐量优先</text>
<rect x="420" y="340" width="150" height="140" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="495" y="365" text-anchor="middle" font-size="14" font-weight="bold">CMS</text>
<text x="495" y="385" text-anchor="middle" font-size="11">并发</text>
<text x="495" y="400" text-anchor="middle" font-size="11">低停顿</text>
<text x="495" y="415" text-anchor="middle" font-size="11">标记-清除</text>
<text x="495" y="435" text-anchor="middle" font-size="10">JDK 9 弃用</text>
<text x="495" y="450" text-anchor="middle" font-size="10">JDK 14 移除</text>
<rect x="590" y="340" width="140" height="140" fill="#e1bee7" stroke="#7b1fa2" stroke-width="2"/>
<text x="660" y="365" text-anchor="middle" font-size="14" font-weight="bold">G1</text>
<text x="660" y="385" text-anchor="middle" font-size="11">（老年代部分）</text>
<text x="660" y="405" text-anchor="middle" font-size="10">混合收集</text>
<text x="660" y="422" text-anchor="middle" font-size="10">全功能</text>
<text x="660" y="440" text-anchor="middle" font-size="10">面向服务端</text>
</svg>

**新一代低延迟 GC（JDK 11+）：**
- **ZGC**：超低延迟（< 10ms），JDK 11 引入，JDK 15 转正
- **Shenandoah**：超低延迟，Red Hat 主导

**组合搭配：**
- Serial + Serial Old：客户端模式
- ParNew + CMS：低延迟场景（已弃用）
- Parallel Scavenge + Parallel Old：高吞吐量场景
- G1：JDK 9+ 默认，平衡吞吐量和延迟
- ZGC / Shenandoah：超大堆、超低延迟场景

### 22. Serial 垃圾回收器的特点？

**Serial** 是最古老的垃圾回收器，单线程收集，GC 时必须暂停所有用户线程（STW）。

**特点：**
- ✅ **简单高效**：单线程无需线程交互开销
- ✅ **内存占用小**：适合客户端应用
- ❌ **STW 时间长**：不适合大堆内存
- **算法**：新生代用复制，老年代（Serial Old）用标记-整理
- **适用场景**：单核 CPU、小内存（几十 MB）的客户端应用

**启用参数：**`-XX:+UseSerialGC`

### 23. ParNew 垃圾回收器的特点？

**ParNew** 是 Serial 的多线程版本，是 CMS 的默认新生代收集器。

**特点：**
- ✅ **多线程并行**：充分利用多核 CPU
- ✅ **配合 CMS**：唯一能与 CMS 配合的新生代收集器
- ❌ **单核性能不如 Serial**：线程切换开销
- **算法**：标记-复制
- **适用场景**：多核服务器、配合 CMS 使用

**启用参数：**`-XX:+UseParNewGC`（JDK 9 后弃用，被 G1 替代）

### 24. Parallel Scavenge 垃圾回收器的特点？

**Parallel Scavenge** 关注**吞吐量优先**，适合后台运算不需要太多交互的场景。

**特点：**
- ✅ **高吞吐量**：最大化 CPU 利用率
- ✅ **自适应调节**：根据运行情况自动调整参数
- ❌ **停顿时间不可控**：可能较长
- **算法**：标记-复制
- **适用场景**：批处理、科学计算、后台任务

**核心参数：**
- `-XX:MaxGCPauseMillis`：最大 GC 停顿时间
- `-XX:GCTimeRatio`：吞吐量大小（默认99，即 GC 时间占 1%）
- `-XX:+UseAdaptiveSizePolicy`：自适应调节策略

**吞吐量 = 运行用户代码时间 / (运行用户代码时间 + GC 时间)**

### 25. CMS 垃圾回收器的工作流程？优缺点？

**CMS（Concurrent Mark Sweep）**以获取**最短停顿时间**为目标，适合重视响应速度的场景。

**工作流程（4个阶段）：**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">CMS 工作流程</text>
<rect x="50" y="60" width="160" height="100" fill="#ffcdd2" stroke="#c62828" stroke-width="2"/>
<text x="130" y="85" text-anchor="middle" font-size="13" font-weight="bold">1. 初始标记</text>
<text x="130" y="105" text-anchor="middle" font-size="11">(STW)</text>
<text x="130" y="125" text-anchor="middle" font-size="10">标记 GC Roots</text>
<text x="130" y="143" text-anchor="middle" font-size="10">直接关联对象</text>
<rect x="230" y="60" width="160" height="100" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
<text x="310" y="85" text-anchor="middle" font-size="13" font-weight="bold">2. 并发标记</text>
<text x="310" y="105" text-anchor="middle" font-size="11">(并发)</text>
<text x="310" y="125" text-anchor="middle" font-size="10">从 GC Roots</text>
<text x="310" y="143" text-anchor="middle" font-size="10">遍历对象图</text>
<rect x="410" y="60" width="160" height="100" fill="#ffcdd2" stroke="#c62828" stroke-width="2"/>
<text x="490" y="85" text-anchor="middle" font-size="13" font-weight="bold">3. 重新标记</text>
<text x="490" y="105" text-anchor="middle" font-size="11">(STW)</text>
<text x="490" y="125" text-anchor="middle" font-size="10">修正并发标记期间</text>
<text x="490" y="143" text-anchor="middle" font-size="10">变动的对象</text>
<rect x="590" y="60" width="160" height="100" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
<text x="670" y="85" text-anchor="middle" font-size="13" font-weight="bold">4. 并发清除</text>
<text x="670" y="105" text-anchor="middle" font-size="11">(并发)</text>
<text x="670" y="125" text-anchor="middle" font-size="10">清理垃圾对象</text>
<text x="670" y="143" text-anchor="middle" font-size="10">用户线程继续运行</text>
<rect x="50" y="190" width="340" height="140" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1"/>
<text x="220" y="215" text-anchor="middle" font-size="14" font-weight="bold">优点</text>
<text x="220" y="240" text-anchor="middle" font-size="12">• 并发收集，低停顿</text>
<text x="220" y="260" text-anchor="middle" font-size="12">• 响应速度快</text>
<text x="220" y="280" text-anchor="middle" font-size="12">• 适合 Web 应用</text>
<rect x="410" y="190" width="340" height="140" fill="#ffebee" stroke="#c62828" stroke-width="1"/>
<text x="580" y="215" text-anchor="middle" font-size="14" font-weight="bold">缺点</text>
<text x="580" y="240" text-anchor="middle" font-size="11">• CPU 敏感（占用资源）</text>
<text x="580" y="260" text-anchor="middle" font-size="11">• 浮动垃圾（无法清理并发期间产生的垃圾）</text>
<text x="580" y="280" text-anchor="middle" font-size="11">• 内存碎片（标记-清除算法）</text>
<text x="580" y="300" text-anchor="middle" font-size="11">• Concurrent Mode Failure → Full GC</text>
</svg>

**启用参数：**`-XX:+UseConcMarkSweepGC`

**注意：** JDK 9 标记弃用，JDK 14 删除，被 G1 替代

### 26. G1 垃圾回收器的工作原理？优缺点？

**G1（Garbage First）**是面向服务端的垃圾回收器，JDK 9+ 默认 GC，兼顾吞吐量和低延迟。

**核心特点：**
1. **分区（Region）设计**：将堆划分为多个大小相等的独立区域
2. **优先回收价值最大的 Region**：Garbage First 的由来
3. **可预测的停顿时间**：可设置期望停顿时间

<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">G1 堆结构</text>
<rect x="60" y="50" width="80" height="80" fill="#81c784" stroke="#388e3c" stroke-width="1"/>
<text x="100" y="95" text-anchor="middle" font-size="11">Eden</text>
<rect x="150" y="50" width="80" height="80" fill="#81c784" stroke="#388e3c" stroke-width="1"/>
<text x="190" y="95" text-anchor="middle" font-size="11">Eden</text>
<rect x="240" y="50" width="80" height="80" fill="#a5d6a7" stroke="#66bb6a" stroke-width="1"/>
<text x="280" y="95" text-anchor="middle" font-size="11">Survivor</text>
<rect x="330" y="50" width="80" height="80" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="370" y="95" text-anchor="middle" font-size="11">Old</text>
<rect x="420" y="50" width="80" height="80" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="460" y="95" text-anchor="middle" font-size="11">Old</text>
<rect x="510" y="50" width="80" height="80" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1"/>
<text x="550" y="95" text-anchor="middle" font-size="11">Free</text>
<rect x="600" y="50" width="80" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1"/>
<text x="640" y="95" text-anchor="middle" font-size="11">Humongous</text>
<text x="400" y="155" text-anchor="middle" font-size="12">每个 Region 大小 1-32MB，动态分配角色</text>
<rect x="50" y="180" width="340" height="120" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1"/>
<text x="220" y="205" text-anchor="middle" font-size="14" font-weight="bold">优点</text>
<text x="220" y="228" text-anchor="middle" font-size="11">• 停顿时间可控</text>
<text x="220" y="248" text-anchor="middle" font-size="11">• 无内存碎片（整理）</text>
<text x="220" y="268" text-anchor="middle" font-size="11">• 并行并发收集</text>
<text x="220" y="288" text-anchor="middle" font-size="11">• 适合大堆（> 6GB）</text>
<rect x="410" y="180" width="340" height="120" fill="#ffebee" stroke="#c62828" stroke-width="1"/>
<text x="580" y="205" text-anchor="middle" font-size="14" font-weight="bold">缺点</text>
<text x="580" y="228" text-anchor="middle" font-size="11">• 内存占用高（需要额外内存记录）</text>
<text x="580" y="248" text-anchor="middle" font-size="11">• 小堆性能不如 CMS</text>
<text x="580" y="268" text-anchor="middle" font-size="11">• 额外的卡表维护</text>
</svg>

**启用参数：**`-XX:+UseG1GC`（JDK 9+ 默认）

**Young GC → Mixed GC → Full GC**（逐渐升级）

### 27. ZGC 和 Shenandoah GC 的特点？

**ZGC**（JDK 11+）和 **Shenandoah**（JDK 12+）都是超低延迟垃圾回收器。

**ZGC：**
- **目标**：停顿时间 < 10ms，不随堆大小增加
- **支持堆大小**：TB 级别（最大 16TB）
- **核心技术**：
  - 颜色指针（Colored Pointers）
  - 读屏障（Load Barrier）
  - 并发整理
- **适用**：大内存、低延迟场景（金融、实时系统）

**Shenandoah：**
- **目标**：停顿时间 < 10ms
- **核心技术**：
  - Brooks Pointers（转发指针）
  - 并发整理
  - 无分代设计
- **特点**：Red Hat 主导，不在 Oracle JDK 中

**两者对比：**
- ZGC：Oracle 官方，支持更大堆
- Shenandoah：开源社区，更早成熟

**启用参数：**
- ZGC：`-XX:+UseZGC`
- Shenandoah：`-XX:+UseShenandoahGC`

### 28. 如何选择合适的垃圾回收器？

**选择决策树：**

| 场景 | 推荐 GC | 原因 |
|------|---------|------|
| 客户端应用 | Serial | 简单高效，内存占用小 |
| 服务端，重吞吐量 | Parallel Scavenge + Parallel Old | 高吞吐量，批处理场景 |
| 服务端，重响应 | G1 | 平衡吞吐量和延迟 |
| 大堆（> 100GB），超低延迟 | ZGC / Shenandoah | 停顿时间 < 10ms |
| 遗留系统 | CMS（已弃用） | 低延迟，但有碎片问题 |

**关键指标：**
1. **停顿时间**：用户体验优先 → G1 / ZGC
2. **吞吐量**：计算密集型 → Parallel
3. **堆大小**：< 4GB → G1，> 100GB → ZGC
4. **JDK 版本**：
   - JDK 8：Parallel（默认）或 G1
   - JDK 11+：G1（默认）或 ZGC

**通用建议：**
- **默认选择**：JDK 9+ 使用 G1
- **特殊优化**：根据实际测试调整
- **监控调优**：结合 GC 日志分析

## 类加载

### 29. 类加载的过程？

类加载是指将 `.class` 文件加载到内存，经过验证、准备、解析、初始化等步骤，最终形成可被 JVM 直接使用的 Java 类型。

**类加载的 5 个阶段：**

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">类加载过程</text>
<rect x="30" y="60" width="120" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="90" y="90" text-anchor="middle" font-size="13" font-weight="bold">1. 加载</text>
<text x="90" y="108" text-anchor="middle" font-size="10">Loading</text>
<text x="90" y="125" text-anchor="middle" font-size="9">读取字节流</text>
<path d="M 150 100 L 180 100" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="180" y="60" width="120" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="240" y="90" text-anchor="middle" font-size="13" font-weight="bold">2. 验证</text>
<text x="240" y="108" text-anchor="middle" font-size="10">Verification</text>
<text x="240" y="125" text-anchor="middle" font-size="9">确保安全性</text>
<path d="M 300 100 L 330 100" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="330" y="60" width="120" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="390" y="90" text-anchor="middle" font-size="13" font-weight="bold">3. 准备</text>
<text x="390" y="108" text-anchor="middle" font-size="10">Preparation</text>
<text x="390" y="125" text-anchor="middle" font-size="9">分配内存</text>
<path d="M 450 100 L 480 100" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="480" y="60" width="120" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
<text x="540" y="90" text-anchor="middle" font-size="13" font-weight="bold">4. 解析</text>
<text x="540" y="108" text-anchor="middle" font-size="10">Resolution</text>
<text x="540" y="125" text-anchor="middle" font-size="9">符号→直接引用</text>
<path d="M 600 100 L 630 100" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="630" y="60" width="120" height="80" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
<text x="690" y="90" text-anchor="middle" font-size="13" font-weight="bold">5. 初始化</text>
<text x="690" y="108" text-anchor="middle" font-size="10">Initialization</text>
<text x="690" y="125" text-anchor="middle" font-size="9">执行 < clinit ></text>
<defs><marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0,0 L0,10 L9,5 z" fill="#388e3c"/></marker></defs>
<rect x="30" y="170" width="720" height="110" fill="#e0f7fa" stroke="#00838f" stroke-width="1"/>
<text x="390" y="195" text-anchor="middle" font-size="13" font-weight="bold">关键点说明</text>
<text x="100" y="220" font-size="11"><tspan font-weight="bold">加载：</tspan>通过类名获取二进制字节流</text>
<text x="100" y="240" font-size="11"><tspan font-weight="bold">验证：</tspan>文件格式、元数据、字节码、符号引用验证</text>
<text x="100" y="260" font-size="11"><tspan font-weight="bold">准备：</tspan>为静态变量分配内存，设置默认值（0/null/false）</text>
<text x="480" y="220" font-size="11"><tspan font-weight="bold">解析：</tspan>将符号引用替换为直接引用</text>
<text x="480" y="240" font-size="11"><tspan font-weight="bold">初始化：</tspan>执行类构造器 &lt;clinit&gt;()，赋予真实初始值</text>
<text x="480" y="260" font-size="11">初始化是类加载的最后一步，线程安全</text>
</svg>

**记忆口诀：加验准解初**（加载→验证→准备→解析→初始化）

**初始化时机（6种情况）：**
1. new、getstatic、putstatic、invokestatic 指令
2. 反射调用
3. 初始化子类时，父类未初始化
4. 虚拟机启动时的主类
5. 动态语言支持（MethodHandle）
6. 接口中定义了默认方法（JDK 8+）

### 30. 什么是双亲委派模型？为什么要使用双亲委派模型？

**双亲委派模型**：当一个类加载器收到类加载请求时，首先委派给父类加载器加载，只有父类加载器无法加载时，子类加载器才尝试加载。

<svg viewBox="0 0 600 350" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" font-size="18" font-weight="bold">双亲委派模型</text>
<rect x="200" y="50" width="200" height="50" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
<text x="300" y="80" text-anchor="middle" font-size="13">启动类加载器</text>
<text x="300" y="95" text-anchor="middle" font-size="10">(Bootstrap)</text>
<path d="M 300 100 L 300 130" stroke="#666" stroke-width="2" marker-end="url(#arrow4)"/>
<rect x="200" y="130" width="200" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="300" y="160" text-anchor="middle" font-size="13">扩展类加载器</text>
<text x="300" y="175" text-anchor="middle" font-size="10">(Extension)</text>
<path d="M 300 180 L 300 210" stroke="#666" stroke-width="2" marker-end="url(#arrow4)"/>
<rect x="200" y="210" width="200" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="300" y="240" text-anchor="middle" font-size="13">应用类加载器</text>
<text x="300" y="255" text-anchor="middle" font-size="10">(Application)</text>
<path d="M 300 260 L 300 290" stroke="#666" stroke-width="2" marker-end="url(#arrow4)"/>
<rect x="200" y="290" width="200" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
<text x="300" y="320" text-anchor="middle" font-size="13">自定义类加载器</text>
<defs><marker id="arrow4" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto"><path d="M0,0 L10,0 L5,9 z" fill="#666"/></marker></defs>
<text x="450" y="80" font-size="11">加载 JDK 核心类</text>
<text x="450" y="160" font-size="11">加载扩展类</text>
<text x="450" y="240" font-size="11">加载应用类</text>
<text x="450" y="320" font-size="11">用户自定义</text>
</svg>

**为什么使用双亲委派？**
1. **避免类重复加载**：确保一个类只被加载一次
2. **保证核心 API 安全**：防止核心类被篡改
   - 例如：自定义 `java.lang.String` 类，双亲委派确保加载的是 JDK 的 String
3. **保证类的唯一性**：同一个类由不同加载器加载是不同的类

**加载过程：**
```
自定义ClassLoader → Application → Extension → Bootstrap
                                           ↓（找不到）
                                  Extension尝试加载
                                           ↓（找不到）
                          Application尝试加载
                                           ↓（找不到）
                  自定义ClassLoader加载
```

### 31. 如何打破双亲委派模型？

**三种打破方式：**

1. **重写 `loadClass()` 方法**（不推荐）
   - 双亲委派逻辑在 `loadClass()` 中
   - 重写可以改变委派逻辑

2. **线程上下文类加载器（TCCI）**
   - JDBC、JNDI 等 SPI 机制使用
   - 核心类需要加载应用类时使用

3. **OSGi 模块化**
   - 复杂的类加载架构
   - 支持模块热插拔

**实际案例：Tomcat**
- Tomcat 有自己的类加载器体系
- 不同 Web 应用隔离，避免冲突
- 打破双亲委派，优先加载 Web 应用的类

### 32. 什么是类加载器？有哪些类加载器？

**类加载器**负责读取 `.class` 文件，将其转换为 `Class` 对象。

**JVM 提供的类加载器：**

| 类加载器 | 加载路径 | 说明 |
|---------|---------|------|
| **启动类加载器** | `$JAVA_HOME/jre/lib` | C++ 实现，加载核心类库 |
| **扩展类加载器** | `$JAVA_HOME/jre/lib/ext` | Java 实现，加载扩展类库 |
| **应用类加载器** | classpath | Java 实现，加载应用类 |

**关键特性：**
- **唯一性**：类的唯一性由类本身 + 类加载器决定
- **可见性**：子加载器可见父加载器加载的类，反之不行
- **单一性**：一个类只被加载一次（同一个加载器）

### 33. 什么是自定义类加载器？如何实现？

**自定义类加载器**用于加载非标准位置的类（如网络、数据库、加密的 class 文件）。

**实现步骤：**
1. 继承 `ClassLoader`
2. 重写 `findClass()` 方法（推荐，保留双亲委派）
3. 在 `findClass()` 中调用 `defineClass()` 将字节码转换为 Class 对象

**示例代码：**
```java
public class MyClassLoader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        // 1. 根据类名获取字节码（从文件、网络等）
        byte[] classData = loadClassData(name);

        if (classData == null) {
            throw new ClassNotFoundException(name);
        }

        // 2. 将字节码转换为 Class 对象
        return defineClass(name, classData, 0, classData.length);
    }

    private byte[] loadClassData(String className) {
        // 从自定义位置加载 .class 文件
        // 例如：网络、数据库、解密文件等
        String path = className.replace('.', '/') + ".class";
        try (InputStream is = getClass().getResourceAsStream(path)) {
            return is.readAllBytes();
        } catch (IOException e) {
            return null;
        }
    }
}
```

**使用场景：**
- **热部署**：动态加载新版本的类
- **代码加密**：加载加密的 class 文件
- **隔离性**：不同模块使用不同的类加载器

## 性能调优

### 34. 常用的 JVM 参数有哪些？

**JVM 参数分为三类：**
- **标准参数（-）**：所有 JVM 都支持，如 `-version`
- **X 参数（-X）**：非标准，如 `-Xms`、`-Xmx`
- **XX 参数（-XX）**：不稳定，如 `-XX:+UseG1GC`

**常用参数：**

| 类别 | 参数 | 说明 | 示例 |
|------|------|------|------|
| **堆内存** | `-Xms` | 初始堆大小 | `-Xms512m` |
| | `-Xmx` | 最大堆大小 | `-Xmx2g` |
| | `-Xmn` | 新生代大小 | `-Xmn256m` |
| | `-XX:NewRatio` | 老年代/新生代比例 | `-XX:NewRatio=2`（2:1） |
| | `-XX:SurvivorRatio` | Eden/Survivor比例 | `-XX:SurvivorRatio=8`（8:1:1） |
| **栈** | `-Xss` | 栈大小 | `-Xss256k` |
| **元空间** | `-XX:MetaspaceSize` | 初始元空间大小 | `-XX:MetaspaceSize=128m` |
| | `-XX:MaxMetaspaceSize` | 最大元空间大小 | `-XX:MaxMetaspaceSize=512m` |
| **GC** | `-XX:+UseG1GC` | 使用 G1 收集器 | - |
| | `-XX:+UseSerialGC` | 使用 Serial 收集器 | - |
| | `-XX:MaxGCPauseMillis` | 最大 GC 停顿时间 | `-XX:MaxGCPauseMillis=200` |
| | `-XX:GCTimeRatio` | 吞吐量大小 | `-XX:GCTimeRatio=99` |
| **日志** | `-Xlog:gc*` | GC 日志（JDK 9+） | `-Xlog:gc*:file=gc.log` |
| | `-XX:+PrintGCDetails` | 打印 GC 详情（JDK 8） | - |
| **调试** | `-XX:+HeapDumpOnOutOfMemoryError` | OOM 时 Dump 堆 | - |
| | `-XX:HeapDumpPath` | Dump 文件路径 | `-XX:HeapDumpPath=/logs/` |

**生产环境推荐配置：**
```bash
java -Xms4g -Xmx4g -Xmn2g -Xss256k \
     -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=512m \
     -XX:+UseG1GC -XX:MaxGCPauseMillis=200 \
     -XX:+HeapDumpOnOutOfMemoryError \
     -XX:HeapDumpPath=/logs/heapdump.hprof \
     -Xlog:gc*:file=/logs/gc.log \
     -jar myapp.jar
```

### 35. 如何分析 GC 日志？

**GC 日志关键信息：**
1. **GC 类型**：Minor GC / Major GC / Full GC
2. **GC 原因**：Allocation Failure、System.gc()等
3. **内存变化**：GC 前后的堆大小
4. **停顿时间**：GC 耗时

**示例日志（G1 GC）：**
```
[GC pause (G1 Evacuation Pause) (young), 0.0234567 secs]
   [Parallel Time: 21.5 ms, GC Workers: 4]
   [Eden: 512M(512M)->0B(480M) Survivors: 32M->64M Heap: 1G(4G)->600M(4G)]
   [Times: user=0.08 sys=0.00, real=0.02 secs]
```

**分析要点：**
- **频率**：GC 过于频繁 → 堆太小或对象创建过多
- **停顿时间**：超过目标 → 调整 `-XX:MaxGCPauseMillis`
- **内存回收效果**：回收率低 → 可能有内存泄漏
- **晋升速率**：老年代增长快 → 对象存活时间长

**分析工具：**
- **GCEasy**：在线分析 GC 日志
- **GCViewer**：可视化 GC 日志
- **JVM Profiler**：实时监控

### 36. 什么是内存泄漏？如何排查？

**内存泄漏（Memory Leak）**：对象无法被 GC 回收，但实际上已不再使用，导致可用内存逐渐减少。

**常见原因：**
1. **集合类未清理**：HashMap、List 持续添加，不删除
2. **静态集合**：静态变量引用的集合
3. **监听器未注销**：事件监听器、回调函数
4. **线程未关闭**：ThreadLocal、线程池
5. **资源未释放**：IO流、数据库连接

**排查步骤：**
1. **监控内存趋势**：观察堆内存持续增长
2. **Dump 堆快照**：`jmap -dump:format=b,file=heap.hprof <pid>`
3. **分析快照**：使用 MAT（Memory Analyzer Tool）
4. **定位问题对象**：找到占用内存最多的对象
5. **追溯引用链**：分析 GC Roots 到对象的引用路径

**预防措施：**
- 使用完资源及时关闭（try-with-resources）
- 避免在静态集合中存放大对象
- 及时清理ThreadLocal
- 使用弱引用（WeakReference）

### 37. 什么是内存溢出？常见的内存溢出有哪些？

**内存溢出（OutOfMemoryError, OOM）**：程序申请内存时，没有足够的内存空间供其使用。

**常见的 OOM 类型：**

| 类型 | 原因 | 解决方案 |
|------|------|---------|
| **Java heap space** | 堆内存不足 | 增大 `-Xmx`，检查内存泄漏 |
| **GC overhead limit exceeded** | GC 时间占比 > 98% | 增大堆，优化代码 |
| **Metaspace** | 元空间不足（类太多） | 增大 `-XX:MaxMetaspaceSize` |
| **Unable to create new native thread** | 线程过多 | 减少线程数，增大 `-Xss` |
| **Direct buffer memory** | 直接内存不足（NIO） | 增大 `-XX:MaxDirectMemorySize` |
| **Requested array size exceeds VM limit** | 数组太大 | 拆分数组 |

**示例：**
```
// 堆内存溢出
java.lang.OutOfMemoryError: Java heap space

// 元空间溢出
java.lang.OutOfMemoryError: Metaspace

// 无法创建线程
java.lang.OutOfMemoryError: unable to create new native thread
```

### 38. 如何排查 OOM 问题？

**排查流程：**

1. **获取堆 Dump**
   ```bash
   # OOM 时自动 Dump
   -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/logs/

   # 手动 Dump
   jmap -dump:live,format=b,file=heap.hprof <pid>
   ```

2. **使用 MAT 分析**
   - 打开 heap.hprof
   - 查看 Leak Suspects（泄漏嫌疑）
   - 分析 Dominator Tree（支配树）
   - 查看 GC Roots 引用链

3. **定位问题代码**
   - 找到占用内存最多的类
   - 分析对象的引用路径
   - 检查业务代码

4. **验证修复**
   - 修改代码
   - 压测验证
   - 监控内存趋势

**快速排查命令：**
```bash
# 查看堆内存使用
jmap -heap <pid>

# 查看对象统计
jmap -histo:live <pid> | head -20

# 查看线程栈
jstack <pid> > thread.txt
```

### 39. 常用的 JVM 诊断工具有哪些？

**JDK 自带工具：**
- **jps**：查看 Java 进程
- **jinfo**：查看/修改 JVM 参数
- **jstat**：监控 GC 和堆内存
- **jmap**：生成堆 Dump、查看内存
- **jstack**：生成线程 Dump
- **jcmd**：综合诊断工具（JDK 7+）

**可视化工具：**
- **JConsole**：JDK 自带，监控内存、线程、类
- **VisualVM**：功能强大的性能分析工具
- **JMC（Java Mission Control）**：Oracle 官方工具
- **Arthas**：阿里开源，线上诊断神器

**第三方工具：**
- **MAT（Memory Analyzer Tool）**：Eclipse 出品，分析堆 Dump
- **GCViewer / GCEasy**：GC 日志分析
- **JProfiler / YourKit**：商业性能分析工具
- **Async-profiler**：低开销的性能分析工具

### 40. jmap、jstat、jstack、jinfo 的作用？

| 工具 | 作用 | 常用命令 |
|------|------|---------|
| **jmap** | 内存映射工具 | `jmap -heap <pid>` - 查看堆信息<br>`jmap -histo <pid>` - 对象统计<br>`jmap -dump:format=b,file=heap.hprof <pid>` - Dump 堆 |
| **jstat** | 统计信息监控 | `jstat -gc <pid> 1000 10` - 每秒GC统计，共10次<br>`jstat -gcutil <pid>` - GC 百分比<br>`jstat -gccause <pid>` - GC 原因 |
| **jstack** | 线程堆栈分析 | `jstack <pid>` - 打印线程栈<br>`jstack -l <pid>` - 额外锁信息<br>用于死锁检测、CPU 飙高分析 |
| **jinfo** | 配置信息工具 | `jinfo -flags <pid>` - 查看 JVM 参数<br>`jinfo -flag PrintGC <pid>` - 查看单个参数<br>`jinfo -flag +PrintGC <pid>` - 动态开启参数 |

**实战案例：**
```bash
# 1. CPU 飙高排查
top -Hp <pid>  # 找到占用 CPU 高的线程 ID
printf "%x\n" <线程ID>  # 转换为 16 进制
jstack <pid> | grep <16进制线程ID> -A 20  # 查看线程栈

# 2. 内存泄漏排查
jmap -histo:live <pid> | head -20  # 查看内存占用 Top 20
jmap -dump:live,format=b,file=heap.hprof <pid>  # Dump 堆
# 使用 MAT 分析 heap.hprof

# 3. GC 问题排查
jstat -gcutil <pid> 1000  # 实时监控 GC
jinfo -flag UseG1GC <pid>  # 查看 GC 类型
```

**记忆技巧：**
- **jmap**：map → 内存映射
- **jstat**：stat → 统计
- **jstack**：stack → 栈
- **jinfo**：info → 信息
