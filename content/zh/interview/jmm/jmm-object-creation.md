## 对象创建

### 25. 对象的创建过程是怎样的？

**核心答案**：对象创建包括类加载检查、分配内存、初始化零值、设置对象头、执行初始化方法五个步骤。

**详细说明**：

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">对象创建的五个步骤</text>
<rect x="100" y="60" width="600" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="120" y="90" font-size="13" font-weight="bold">1️⃣ 类加载检查</text>
<text x="120" y="115" font-size="10">• 检查类是否已加载、解析、初始化</text>
<text x="120" y="135" font-size="10">• 如果没有，先执行类加载过程</text>
<path d="M 400 160 L 400 180" stroke="#666" stroke-width="2" marker-end="url(#arrow-obj)"/>
<rect x="100" y="180" width="600" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="120" y="210" font-size="13" font-weight="bold">2️⃣ 分配内存</text>
<text x="120" y="235" font-size="10">• 指针碰撞（Bump the Pointer）：内存规整</text>
<text x="120" y="255" font-size="10">• 空闲列表（Free List）：内存不规整</text>
<text x="120" y="275" font-size="10">• 并发安全：CAS + 失败重试 或 TLAB</text>
<path d="M 400 280 L 400 300" stroke="#666" stroke-width="2" marker-end="url(#arrow-obj)"/>
<rect x="100" y="300" width="600" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="120" y="330" font-size="13" font-weight="bold">3️⃣ 初始化零值</text>
<text x="120" y="355" font-size="10">• 将分配的内存初始化为零值（不包括对象头）</text>
<text x="120" y="375" font-size="10">• int = 0, boolean = false, 引用 = null</text>
<path d="M 400 380 L 400 400" stroke="#666" stroke-width="2" marker-end="url(#arrow-obj)"/>
<rect x="100" y="400" width="600" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="120" y="430" font-size="13" font-weight="bold">4️⃣ 设置对象头</text>
<text x="120" y="455" font-size="10">• 设置对象是哪个类的实例</text>
<text x="120" y="475" font-size="10">• 对象哈希码、GC 分代年龄、锁信息等</text>
<text x="120" y="495" font-size="10">• 存储在 Mark Word 和 Class Pointer 中</text>
<path d="M 400 500 L 400 520" stroke="#666" stroke-width="2" marker-end="url(#arrow-obj)"/>
<rect x="100" y="520" width="600" height="100" fill="#ffe0b2" stroke="#ff6f00" stroke-width="2" rx="5"/>
<text x="120" y="550" font-size="13" font-weight="bold">5️⃣ 执行初始化方法</text>
<text x="120" y="575" font-size="10">• 执行 &lt;init&gt; 方法（构造方法）</text>
<text x="120" y="595" font-size="10">• 初始化实例变量</text>
<text x="120" y="615" font-size="10">• 执行构造代码块和构造函数</text>
<defs>
<marker id="arrow-obj" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M0,0 L10,5 L0,10 z" fill="#666"/>
</marker>
</defs>
</svg>

**关键步骤详解**：

**1. 类加载检查**：
- 检查类的符号引用是否在常量池中
- 检查类是否已经被加载、解析、初始化

**2. 分配内存**：
- **指针碰撞**：内存规整（Serial、ParNew GC）
- **空闲列表**：内存不规整（CMS GC）
- **并发安全**：CAS 或 TLAB（Thread Local Allocation Buffer）

**3. 初始化零值**：
- 实例字段赋默认值
- 保证对象字段可以不赋初值就使用

**4. 设置对象头**：
- **Mark Word**：哈希码、锁信息、GC 年龄
- **Class Pointer**：指向类元数据

**5. 执行 `<init>` 方法**：
- 初始化实例变量
- 执行构造代码块
- 执行构造函数

**关键要点**：
- ✓ **五个步骤**：检查、分配、零值、对象头、初始化
- ✓ **并发安全**：CAS 或 TLAB
- ✓ **先零值后初始化**：保证字段有默认值
- ⚠ **半初始化状态**：对象头设置完但未执行构造函数

**记忆口诀**：检查加载分配内存，初始化零值设对象头，最后执行构造方法，五步创建对象完成

### 26. 对象的内存布局是怎样的？

**核心答案**：Java 对象在内存中分为对象头、实例数据、对齐填充三部分。

**详细说明**：

**Java 对象内存布局**：

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">Java 对象内存布局</text>
<rect x="100" y="60" width="600" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="400" y="90" text-anchor="middle" font-size="14" font-weight="bold">1️⃣ 对象头 (Header)</text>
<rect x="120" y="100" width="260" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="250" y="125" text-anchor="middle" font-size="12" font-weight="bold">Mark Word</text>
<text x="250" y="145" text-anchor="middle" font-size="10">8 字节（64位）</text>
<text x="140" y="165" font-size="9">哈希码、GC年龄、锁信息</text>
<rect x="400" y="100" width="260" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="530" y="125" text-anchor="middle" font-size="12" font-weight="bold">Class Pointer</text>
<text x="530" y="145" text-anchor="middle" font-size="10">4/8 字节</text>
<text x="420" y="165" font-size="9">指向类元数据的指针</text>
<rect x="100" y="190" width="600" height="120" fill="#e8f5e9" stroke="#388e3c" stroke-width="3" rx="5"/>
<text x="400" y="220" text-anchor="middle" font-size="14" font-weight="bold">2️⃣ 实例数据 (Instance Data)</text>
<text x="120" y="250" font-size="11">• 对象的实例字段</text>
<text x="120" y="270" font-size="11">• 包括父类继承的字段</text>
<text x="120" y="290" font-size="11">• 按字段类型大小排列（相同宽度的字段分配在一起）</text>
<rect x="100" y="320" width="600" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="400" y="350" text-anchor="middle" font-size="14" font-weight="bold">3️⃣ 对齐填充 (Padding)</text>
<text x="120" y="380" font-size="11">• JVM 要求对象大小必须是 8 字节的整数倍</text>
<text x="120" y="400" font-size="11">• 如果对象头+实例数据不是 8 的倍数，则填充对齐</text>
</svg>

**三部分详解**：

**1. 对象头（Header）**：
- **Mark Word**（8 字节）：
  - 哈希码（HashCode）
  - GC 分代年龄（Age）
  - 锁状态标志（Lock）
  - 线程持有的锁（偏向线程ID）
  - 偏向时间戳
- **Class Pointer**（4/8 字节）：
  - 指向类元数据的指针
  - 开启指针压缩时为 4 字节，否则 8 字节
- **Array Length**（数组对象专有，4 字节）：
  - 数组长度

**2. 实例数据（Instance Data）**：
- 对象真正存储的有效信息
- 包括从父类继承的字段
- 字段排列顺序：
  - **相同宽度字段**分配在一起
  - **父类字段**在子类字段之前
  - **顺序**：long/double(8) > int/float(4) > short/char(2) > byte/boolean(1) > reference

**3. 对齐填充（Padding）**：
- 不是必然存在的
- 起占位符作用
- JVM 要求对象起始地址必须是 8 字节的整数倍

**内存布局示例**：

```java
class MyObject {
    int a;        // 4 字节
    byte b;       // 1 字节
    long c;       // 8 字节
    String d;     // 4 字节（压缩指针）
}

// 内存布局（64位JVM，开启指针压缩）：
// 对象头：12 字节（Mark Word 8 + Class Pointer 4）
// 实例数据：
//   long c:    8 字节
//   int a:     4 字节
//   String d:  4 字节（引用）
//   byte b:    1 字节
// 对齐填充：3 字节（使总大小为 32 字节，8 的倍数）
// 总大小：32 字节
```

**不同对象的大小**：

| 对象类型 | 对象头 | 实例数据 | 总大小（最小） |
|---------|-------|---------|--------------|
| **空对象** | 12 字节 | 0 字节 | 16 字节（含4字节填充） |
| **new Object()** | 12 字节 | 0 字节 | 16 字节 |
| **数组对象** | 16 字节 | 元素大小×长度 | ≥16 字节 |

**关键要点**：
- ✓ **三部分**：对象头、实例数据、对齐填充
- ✓ **对象头**：Mark Word + Class Pointer（数组还有长度）
- ✓ **8 字节对齐**：对象大小必须是 8 的倍数
- ✓ **字段排序**：相同宽度分配在一起
- ⚠ **空对象 16 字节**：最小对象大小

**记忆口诀**：对象头加实例数据，对齐填充凑八倍，Mark Word 和类指针，字段排序看宽度

### 27. 什么是对象头？包含哪些信息？

**核心答案**：对象头是对象在内存中的元数据区域，包含 Mark Word、Class Pointer 和数组长度（数组对象）。

**详细说明**：

**对象头结构**：

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">对象头结构详解</text>
<rect x="50" y="60" width="700" height="440" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"/>
<rect x="70" y="80" width="660" height="140" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="110" text-anchor="middle" font-size="14" font-weight="bold">1️⃣ Mark Word（8 字节 / 64 位）</text>
<text x="90" y="140" font-size="11" font-weight="bold">存储内容（动态变化）：</text>
<text x="110" y="165" font-size="10">• 对象哈希码（HashCode）：31 位</text>
<text x="110" y="185" font-size="10">• GC 分代年龄（Age）：4 位（最大 15）</text>
<text x="110" y="205" font-size="10">• 锁标志位（Lock）：2 位（无锁、偏向、轻量级、重量级）</text>
<rect x="70" y="230" width="660" height="120" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="260" text-anchor="middle" font-size="14" font-weight="bold">2️⃣ Class Pointer（4/8 字节）</text>
<text x="90" y="290" font-size="11" font-weight="bold">存储内容：</text>
<text x="110" y="315" font-size="10">• 指向类元数据的指针（方法区中的 Klass）</text>
<text x="110" y="335" font-size="10">• 开启指针压缩：4 字节（默认开启）</text>
<rect x="70" y="360" width="660" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="390" text-anchor="middle" font-size="14" font-weight="bold">3️⃣ Array Length（4 字节，仅数组对象）</text>
<text x="90" y="420" font-size="11" font-weight="bold">存储内容：</text>
<text x="110" y="445" font-size="10">• 数组的长度（int 类型）</text>
<text x="110" y="465" font-size="10">• 只有数组对象才有这个字段</text>
<text x="70" y="520" font-size="11" font-weight="bold">总大小：</text>
<text x="90" y="540" font-size="10">• 普通对象：12 字节（Mark Word 8 + Class Pointer 4）</text>
<text x="90" y="560" font-size="10">• 数组对象：16 字节（Mark Word 8 + Class Pointer 4 + Length 4）</text>
</svg>

**Mark Word 的不同状态**：

<svg viewBox="0 0 850 400" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Mark Word 在不同锁状态下的存储内容</text>
<rect x="30" y="60" width="390" height="150" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="225" y="90" text-anchor="middle" font-size="13" font-weight="bold">无锁状态（001）</text>
<text x="50" y="120" font-size="10">• 对象哈希码：25 位</text>
<text x="50" y="140" font-size="10">• 未使用：4 位</text>
<text x="50" y="160" font-size="10">• 分代年龄：4 位</text>
<text x="50" y="180" font-size="10">• 偏向锁标志：1 位（0）</text>
<text x="50" y="200" font-size="10">• 锁标志位：2 位（01）</text>
<rect x="430" y="60" width="390" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="625" y="90" text-anchor="middle" font-size="13" font-weight="bold">偏向锁状态（101）</text>
<text x="450" y="120" font-size="10">• 线程 ID：54 位</text>
<text x="450" y="140" font-size="10">• Epoch：2 位</text>
<text x="450" y="160" font-size="10">• 分代年龄：4 位</text>
<text x="450" y="180" font-size="10">• 偏向锁标志：1 位（1）</text>
<text x="450" y="200" font-size="10">• 锁标志位：2 位（01）</text>
<rect x="30" y="220" width="390" height="140" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="225" y="250" text-anchor="middle" font-size="13" font-weight="bold">轻量级锁状态（00）</text>
<text x="50" y="280" font-size="10">• 指向栈中锁记录的指针：62 位</text>
<text x="50" y="300" font-size="10">• 锁标志位：2 位（00）</text>
<text x="50" y="330" font-size="10" fill="#f57c00">CAS 竞争，自旋获取锁</text>
<rect x="430" y="220" width="390" height="140" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="625" y="250" text-anchor="middle" font-size="13" font-weight="bold">重量级锁状态（10）</text>
<text x="450" y="280" font-size="10">• 指向互斥量（重量级锁）的指针：62 位</text>
<text x="450" y="300" font-size="10">• 锁标志位：2 位（10）</text>
<text x="450" y="330" font-size="10" fill="#d32f2f">Monitor 重量级锁，线程阻塞</text>
</svg>

**Class Pointer**：
- **作用**：指向方法区中的类元数据（InstanceKlass）
- **内容**：类的方法、字段、继承关系等信息
- **压缩指针**：
  - 开启（默认）：4 字节，支持最大 32GB 堆内存
  - 关闭：8 字节，支持更大堆内存
  - JVM 参数：`-XX:+UseCompressedOops`（默认开启）

**Array Length（数组专有）**：
- 只有数组对象才有
- 记录数组的长度
- 4 字节 int 类型

**对象头大小对比**：

| 对象类型 | Mark Word | Class Pointer | Array Length | 总大小 |
|---------|-----------|---------------|--------------|-------|
| **普通对象** | 8 字节 | 4 字节 | - | 12 字节 |
| **数组对象** | 8 字节 | 4 字节 | 4 字节 | 16 字节 |
| **关闭压缩指针** | 8 字节 | 8 字节 | - | 16 字节 |

**关键要点**：
- ✓ **三部分**：Mark Word + Class Pointer + Array Length（数组）
- ✓ **Mark Word**：动态变化，存储运行时数据
- ✓ **Class Pointer**：指向类元数据
- ✓ **普通对象 12 字节**：开启指针压缩
- ✓ **数组对象 16 字节**：多了数组长度字段
- ⚠ **锁状态影响**：Mark Word 内容随锁状态变化

**记忆口诀**：Mark Word 八字节，存哈希码锁信息，Class Pointer 指元数据，数组对象多长度

### 28. 什么是半初始化状态？

**核心答案**：半初始化状态是指对象内存已分配、对象头已设置，但构造函数还未执行完成的状态。

**详细说明**：

**对象创建的关键时刻**：

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">对象的半初始化状态</text>
<rect x="100" y="60" width="600" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="90" text-anchor="middle" font-size="13" font-weight="bold">步骤 1-3：分配内存、初始化零值、设置对象头</text>
<text x="120" y="115" font-size="11">✓ 内存已分配</text>
<text x="120" y="135" font-size="11">✓ 字段已赋零值（int=0, boolean=false, 引用=null）</text>
<path d="M 400 140 L 400 160" stroke="#666" stroke-width="2" marker-end="url(#arrow-half)"/>
<rect x="100" y="160" width="600" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="400" y="190" text-anchor="middle" font-size="14" font-weight="bold" fill="#f57c00">【半初始化状态】</text>
<text x="120" y="220" font-size="11">⚠️ 对象引用已指向内存（instance != null）</text>
<text x="120" y="240" font-size="11">⚠️ 但构造函数还未执行</text>
<text x="120" y="260" font-size="11" fill="#d32f2f" font-weight="bold">⚠️ 字段还是默认零值，不是构造函数赋的值</text>
<path d="M 400 280 L 400 300" stroke="#666" stroke-width="2" marker-end="url(#arrow-half)"/>
<rect x="100" y="300" width="600" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="330" text-anchor="middle" font-size="13" font-weight="bold">步骤 5：执行 &lt;init&gt; 方法（构造函数）</text>
<text x="120" y="355" font-size="11">✓ 执行构造代码块</text>
<text x="120" y="375" font-size="11">✓ 字段赋值为构造函数中的值</text>
<text x="100" y="410" font-size="13" font-weight="bold">半初始化状态的危险：</text>
<rect x="100" y="420" width="600" height="60" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="120" y="445" font-size="11" fill="#d32f2f">如果其他线程在半初始化状态访问对象，会读到默认零值，而不是预期的初始化值</text>
<text x="120" y="465" font-size="11" fill="#d32f2f">这就是 DCL 单例模式必须使用 volatile 的原因</text>
<defs>
<marker id="arrow-half" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
<path d="M0,0 L10,5 L0,10 z" fill="#666"/>
</marker>
</defs>
</svg>

**半初始化问题示例**：

```java
public class HalfInitExample {
    private int value = 100;  // 实例字段
    private String name = "initialized";

    public HalfInitExample() {
        value = 100;
        name = "initialized";
    }
}

// 对象创建过程：
// 1. 分配内存
// 2. 初始化零值：value = 0, name = null
// 3. 设置对象头
// 4. instance 指向内存 ← 半初始化状态开始
//    ⚠️ 此时 instance != null，但 value = 0, name = null
// 5. 执行构造函数：value = 100, name = "initialized"
//    ✓ 完全初始化完成

// 线程 A 创建对象时发生指令重排序：
// 步骤 4 和步骤 5 可能重排

// 线程 B 访问：
if (instance != null) {  // ✓ 不为 null
    int v = instance.value;  // ❌ 可能读到 0 而不是 100
    String n = instance.name;  // ❌ 可能读到 null
}
```

**DCL 单例中的半初始化问题**：

```java
public class Singleton {
    private static Singleton instance;  // 没有 volatile
    private int config = 100;

    public static Singleton getInstance() {
        if (instance == null) {  // 检查 1
            synchronized (Singleton.class) {
                if (instance == null) {  // 检查 2
                    instance = new Singleton();  // 问题所在
                    // 可能重排序为：
                    // 1. 分配内存
                    // 2. instance 指向内存（半初始化）
                    // 3. 执行构造函数
                }
            }
        }
        return instance;  // 可能返回半初始化对象
    }
}

// 线程 A：执行到步骤 2，instance != null 但未初始化
// 线程 B：通过检查 1，拿到半初始化对象
int value = instance.config;  // 可能是 0 而不是 100
```

**如何避免半初始化问题**：

| 方法 | 原理 | 效果 |
|-----|------|------|
| **volatile** | 禁止指令重排序 | 保证引用赋值在初始化之后 |
| **synchronized** | 内存屏障 | 保证可见性和有序性 |
| **final** | 构造函数内不重排 | final 字段不会半初始化 |
| **静态内部类** | 类加载机制 | JVM 保证初始化完成 |

**关键要点**：
- ✗ **半初始化状态**：对象引用已设置但构造函数未完成
- ✗ **危险时刻**：对象头设置完 → 构造函数执行前
- ✓ **表现**：字段值是默认零值，不是预期值
- ✓ **原因**：指令重排序（引用赋值提前）
- ✓ **解决**：volatile 禁止重排序
- ⚠ **DCL 必须加 volatile**：防止返回半初始化对象

**记忆口诀**：半初始化状态危险，引用已设构造未完，字段零值非预期，volatile 禁重排保安全
