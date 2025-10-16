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
