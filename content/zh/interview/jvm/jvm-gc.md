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
