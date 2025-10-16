## 字符串

### 8. String 为什么设计成不可变的？

String 被设计为**不可变类**（Immutable Class），一旦创建就无法修改其内容。这是一个经过深思熟虑的设计决策，带来了多方面的优势。

#### 不可变的含义

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">String 不可变示意</text>
  <rect x="50" y="70" width="320" height="180" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="210" y="100" font-size="14" font-weight="bold" text-anchor="middle" fill="#C62828">❌ 错误理解</text>
  <text x="70" y="130" font-size="12" text-anchor="start" fill="#333">String str = "Hello";</text>
  <text x="70" y="150" font-size="12" text-anchor="start" fill="#333">str = str + " World";</text>
  <text x="70" y="180" font-size="12" text-anchor="start" fill="#666">误解：修改了原字符串</text>
  <text x="70" y="200" font-size="12" text-anchor="start" fill="#666">实际：创建了新字符串对象</text>
  <text x="70" y="220" font-size="12" text-anchor="start" fill="#666">原 "Hello" 对象仍在堆中</text>
  <rect x="430" y="70" width="320" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="590" y="100" font-size="14" font-weight="bold" text-anchor="middle" fill="#2E7D32">✓ 正确理解</text>
  <text x="450" y="130" font-size="12" text-anchor="start" fill="#333">final char[] value = {'H','e','l','l','o'};</text>
  <text x="450" y="160" font-size="12" text-anchor="start" fill="#666">• value 引用不可变（final）</text>
  <text x="450" y="180" font-size="12" text-anchor="start" fill="#666">• 数组内容不可修改（private）</text>
  <text x="450" y="200" font-size="12" text-anchor="start" fill="#666">• 无 public 修改方法</text>
  <text x="450" y="220" font-size="12" text-anchor="start" fill="#666">• 任何"修改"都创建新对象</text>
</svg>

#### 设计为不可变的六大原因

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">String 不可变的原因</text>
  <circle cx="400" cy="250" r="70" fill="#FFF9E6" stroke="#FFC107" stroke-width="3"/>
  <text x="400" y="245" font-size="13" font-weight="bold" text-anchor="middle" fill="#F57C00">String</text>
  <text x="400" y="265" font-size="12" text-anchor="middle" fill="#F57C00">不可变</text>
  <rect x="50" y="80" width="200" height="100" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="150" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#1565C0">1️⃣ 字符串常量池</text>
  <text x="60" y="130" font-size="11" text-anchor="start" fill="#333">• 多个引用共享同一对象</text>
  <text x="60" y="150" font-size="11" text-anchor="start" fill="#333">• 节省内存空间</text>
  <text x="60" y="170" font-size="11" text-anchor="start" fill="#333">• 若可变会影响所有引用</text>
  <path d="M 250 130 L 340 210" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow1)"/>
  <rect x="550" y="80" width="200" height="100" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
  <text x="650" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#6A1B9A">2️⃣ 线程安全</text>
  <text x="560" y="130" font-size="11" text-anchor="start" fill="#333">• 多线程共享无需同步</text>
  <text x="560" y="150" font-size="11" text-anchor="start" fill="#333">• 避免竞态条件</text>
  <text x="560" y="170" font-size="11" text-anchor="start" fill="#333">• 天然线程安全</text>
  <path d="M 550 130 L 460 210" stroke="#9C27B0" stroke-width="2" marker-end="url(#arrow2)"/>
  <rect x="50" y="220" width="200" height="100" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="150" y="245" font-size="13" font-weight="bold" text-anchor="middle" fill="#2E7D32">3️⃣ 安全性</text>
  <text x="60" y="270" font-size="11" text-anchor="start" fill="#333">• 用作 HashMap 键安全</text>
  <text x="60" y="290" font-size="11" text-anchor="start" fill="#333">• hashCode 可缓存</text>
  <text x="60" y="310" font-size="11" text-anchor="start" fill="#333">• 防止恶意修改</text>
  <path d="M 250 270 L 340 260" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow3)"/>
  <rect x="550" y="220" width="200" height="100" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="650" y="245" font-size="13" font-weight="bold" text-anchor="middle" fill="#E65100">4️⃣ hashCode 缓存</text>
  <text x="560" y="270" font-size="11" text-anchor="start" fill="#333">• 不可变保证 hash 不变</text>
  <text x="560" y="290" font-size="11" text-anchor="start" fill="#333">• 只需计算一次</text>
  <text x="560" y="310" font-size="11" text-anchor="start" fill="#333">• 提升 HashMap 性能</text>
  <path d="M 550 270 L 460 260" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow4)"/>
  <rect x="50" y="360" width="200" height="100" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="150" y="385" font-size="13" font-weight="bold" text-anchor="middle" fill="#C62828">5️⃣ 类加载安全</text>
  <text x="60" y="410" font-size="11" text-anchor="start" fill="#333">• 类名用 String 存储</text>
  <text x="60" y="430" font-size="11" text-anchor="start" fill="#333">• 若可变会破坏类加载</text>
  <text x="60" y="450" font-size="11" text-anchor="start" fill="#333">• 安全机制基础</text>
  <path d="M 250 410 L 340 290" stroke="#F44336" stroke-width="2" marker-end="url(#arrow5)"/>
  <rect x="550" y="360" width="200" height="100" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
  <text x="650" y="385" font-size="13" font-weight="bold" text-anchor="middle" fill="#00695C">6️⃣ 性能优化</text>
  <text x="560" y="410" font-size="11" text-anchor="start" fill="#333">• JIT 编译器优化</text>
  <text x="560" y="430" font-size="11" text-anchor="start" fill="#333">• 逃逸分析优化</text>
  <text x="560" y="450" font-size="11" text-anchor="start" fill="#333">• 减少防御性拷贝</text>
  <path d="M 550 410 L 460 290" stroke="#009688" stroke-width="2" marker-end="url(#arrow6)"/>
  <defs>
    <marker id="arrow1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#2196F3"/></marker>
    <marker id="arrow2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#9C27B0"/></marker>
    <marker id="arrow3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#4CAF50"/></marker>
    <marker id="arrow4" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#FF9800"/></marker>
    <marker id="arrow5" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#F44336"/></marker>
    <marker id="arrow6" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#009688"/></marker>
  </defs>
</svg>

#### 详细解析

**1. 字符串常量池优化**

字符串常量池允许相同内容的字符串共享同一个对象：
- `String a = "Hello"` 和 `String b = "Hello"` 指向同一对象
- 如果 String 可变，修改 `a` 会影响 `b`，导致不可预测的结果
- 不可变性保证了共享的安全性

**2. 线程安全**

多个线程可以安全地共享同一个 String 对象：
- 无需担心并发修改问题
- 不需要额外的同步机制
- 避免了 ConcurrentModificationException

**3. 作为 HashMap 键的安全性**

String 常用作 HashMap 的键：
- hashCode 一旦计算就不会改变
- 如果可变，修改后 hashCode 改变会导致无法找到键值对
- 不可变性保证了集合框架的正确性

**4. hashCode 缓存**

String 内部缓存了 hashCode：
```java
private int hash; // 默认为 0，计算后缓存
```
- 第一次调用 hashCode() 时计算并缓存
- 后续调用直接返回缓存值
- 不可变性保证缓存永远有效

**5. 安全性考虑**

String 用于存储敏感信息：
- 网络连接地址
- 文件路径
- 类加载器中的类名
- 数据库连接 URL
- 如果可变，恶意代码可能在传递过程中修改这些值

**6. 性能优化**

不可变性带来多种优化可能：
- JIT 编译器可以更激进地优化
- 字符串常量可以在编译期折叠
- 减少防御性拷贝的需求

#### 如何保证不可变

String 类通过以下机制保证不可变：

1. **类声明为 final**：无法被继承
2. **内部数组 private final**：无法从外部访问和修改
3. **无修改方法**：所有看似"修改"的方法都返回新对象
4. **防御性拷贝**：构造函数接收字符数组时会拷贝一份

#### 关键要点

1. **不可变 ≠ 引用不变**
   - `String s = "Hello"; s = "World";` 改变的是引用，不是对象

2. **修改操作创建新对象**
   - `str.toUpperCase()` 返回新字符串
   - 频繁修改使用 StringBuilder

3. **安全性和性能的完美平衡**
   - 常量池节省内存
   - 线程安全无需同步
   - hashCode 缓存提升性能

4. **设计模式体现**
   - 典型的不可变对象模式
   - 享元模式（字符串常量池）

5. **最佳实践**
   - 大量字符串拼接用 StringBuilder
   - 敏感信息用完后清理（但 String 无法真正清除）
   - 尽量重用字符串字面量

### 9. == 和 equals() 的区别？

`==` 和 `equals()` 是 Java 中两种完全不同的比较方式，理解它们的区别是避免常见 bug 的关键。

#### 核心区别

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">== vs equals() 核心区别</text>
  <rect x="50" y="70" width="320" height="300" fill="#E3F2FD" stroke="#2196F3" stroke-width="3" rx="8"/>
  <text x="210" y="105" font-size="16" font-weight="bold" text-anchor="middle" fill="#1565C0">== 运算符</text>
  <text x="210" y="135" font-size="13" font-weight="bold" text-anchor="middle" fill="#1976D2">比较内存地址（引用）</text>
  <rect x="70" y="160" width="260" height="80" fill="#BBDEFB" stroke="#1976D2" stroke-width="2" rx="5"/>
  <text x="200" y="185" font-size="12" font-weight="bold" text-anchor="middle" fill="#0D47A1">基本类型</text>
  <text x="80" y="210" font-size="11" text-anchor="start" fill="#333">比较值是否相等</text>
  <text x="80" y="230" font-size="11" text-anchor="start" fill="#666">例: 10 == 10 → true</text>
  <rect x="70" y="250" width="260" height="100" fill="#90CAF9" stroke="#1976D2" stroke-width="2" rx="5"/>
  <text x="200" y="275" font-size="12" font-weight="bold" text-anchor="middle" fill="#0D47A1">引用类型</text>
  <text x="80" y="300" font-size="11" text-anchor="start" fill="#333">比较引用是否指向同一对象</text>
  <text x="80" y="320" font-size="11" text-anchor="start" fill="#666">判断：是否同一个内存地址</text>
  <text x="80" y="340" font-size="11" text-anchor="start" fill="#666">例: str1 == str2</text>
  <rect x="430" y="70" width="320" height="300" fill="#E8F5E9" stroke="#4CAF50" stroke-width="3" rx="8"/>
  <text x="590" y="105" font-size="16" font-weight="bold" text-anchor="middle" fill="#2E7D32">equals() 方法</text>
  <text x="590" y="135" font-size="13" font-weight="bold" text-anchor="middle" fill="#388E3C">比较对象内容（值）</text>
  <rect x="450" y="160" width="260" height="80" fill="#C8E6C9" stroke="#388E3C" stroke-width="2" rx="5"/>
  <text x="580" y="185" font-size="12" font-weight="bold" text-anchor="middle" fill="#1B5E20">Object 默认实现</text>
  <text x="460" y="210" font-size="11" text-anchor="start" fill="#333">等同于 ==（比较引用）</text>
  <text x="460" y="230" font-size="11" text-anchor="start" fill="#666">this == obj</text>
  <rect x="450" y="250" width="260" height="100" fill="#A5D6A7" stroke="#388E3C" stroke-width="2" rx="5"/>
  <text x="580" y="275" font-size="12" font-weight="bold" text-anchor="middle" fill="#1B5E20">重写后</text>
  <text x="460" y="300" font-size="11" text-anchor="start" fill="#333">比较对象的逻辑内容</text>
  <text x="460" y="320" font-size="11" text-anchor="start" fill="#666">String: 比较字符序列</text>
  <text x="460" y="340" font-size="11" text-anchor="start" fill="#666">Integer: 比较数值</text>
</svg>

#### 详细对比

| 对比维度 | == | equals() |
|---------|-----|----------|
| **性质** | 运算符 | 方法（来自 Object 类） |
| **基本类型** | 比较值 | 不可用（基本类型无方法） |
| **引用类型** | 比较引用（地址） | 比较内容（可重写） |
| **null 比较** | 可以（null == null 为 true） | 调用方为 null 会抛 NPE |
| **性能** | 快（直接比较地址） | 慢（需要方法调用和逻辑判断） |
| **可重写** | 不可以 | 可以 |

#### 内存示意图

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">引用类型的 == 和 equals() 比较</text>
  <rect x="50" y="60" width="350" height="280" fill="#FFF9E6" stroke="#FFC107" stroke-width="2" rx="5"/>
  <text x="225" y="85" font-size="14" font-weight="bold" text-anchor="middle" fill="#F57C00">栈内存（引用）</text>
  <rect x="80" y="100" width="120" height="40" fill="#FFE082" stroke="#F57C00" stroke-width="2"/>
  <text x="140" y="125" font-size="12" text-anchor="middle" fill="#333">str1 → 0x1000</text>
  <rect x="80" y="160" width="120" height="40" fill="#FFE082" stroke="#F57C00" stroke-width="2"/>
  <text x="140" y="185" font-size="12" text-anchor="middle" fill="#333">str2 → 0x1000</text>
  <rect x="80" y="220" width="120" height="40" fill="#FFE082" stroke="#F57C00" stroke-width="2"/>
  <text x="140" y="245" font-size="12" text-anchor="middle" fill="#333">str3 → 0x2000</text>
  <text x="70" y="295" font-size="11" fill="#666">str1 == str2 → true</text>
  <text x="70" y="310" font-size="11" fill="#666">str1 == str3 → false</text>
  <rect x="450" y="60" width="300" height="280" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="600" y="85" font-size="14" font-weight="bold" text-anchor="middle" fill="#2E7D32">堆内存（对象）</text>
  <rect x="480" y="100" width="240" height="60" fill="#81C784" stroke="#388E3C" stroke-width="2" rx="5"/>
  <text x="600" y="120" font-size="11" font-weight="bold" text-anchor="middle" fill="white">对象 0x1000</text>
  <text x="600" y="140" font-size="12" text-anchor="middle" fill="white">value: "Hello"</text>
  <path d="M 200 120 L 480 130" stroke="#F57C00" stroke-width="2" marker-end="url(#arrow7)"/>
  <path d="M 200 180 L 480 135" stroke="#F57C00" stroke-width="2" marker-end="url(#arrow7)"/>
  <rect x="480" y="180" width="240" height="60" fill="#81C784" stroke="#388E3C" stroke-width="2" rx="5"/>
  <text x="600" y="200" font-size="11" font-weight="bold" text-anchor="middle" fill="white">对象 0x2000</text>
  <text x="600" y="220" font-size="12" text-anchor="middle" fill="white">value: "Hello"</text>
  <path d="M 200 240 L 480 210" stroke="#F57C00" stroke-width="2" marker-end="url(#arrow7)"/>
  <text x="470" y="270" font-size="11" fill="#2E7D32">str1.equals(str3) → true</text>
  <text x="470" y="285" font-size="11" fill="#666">（比较内容，都是 "Hello"）</text>
  <text x="470" y="305" font-size="11" fill="#C62828">str1 == str3 → false</text>
  <text x="470" y="320" font-size="11" fill="#666">（比较地址，不同对象）</text>
  <defs>
    <marker id="arrow7" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#F57C00"/></marker>
  </defs>
</svg>

#### String 中的特殊情况

String 是面试中最常考的场景，需要特别注意字符串常量池：

**1. 字面量创建（常量池）**
```java
String s1 = "Hello";
String s2 = "Hello";
// s1 == s2 → true（指向常量池同一对象）
// s1.equals(s2) → true（内容相同）
```

**2. new 创建（堆内存）**
```java
String s3 = new String("Hello");
String s4 = new String("Hello");
// s3 == s4 → false（堆中不同对象）
// s3.equals(s4) → true（内容相同）
// s1 == s3 → false（常量池 vs 堆）
```

**3. 混合情况**
```java
String s5 = "Hel" + "lo";  // 编译期优化为 "Hello"
// s1 == s5 → true（都在常量池）

String s6 = new String("Hel") + "lo";  // 运行期拼接
// s1 == s6 → false（s6 在堆中）
```

#### equals() 方法重写规范

重写 equals() 必须遵循的约定：

1. **自反性**：`x.equals(x)` 必须返回 true
2. **对称性**：`x.equals(y)` 和 `y.equals(x)` 结果相同
3. **传递性**：若 `x.equals(y)` 且 `y.equals(z)`，则 `x.equals(z)`
4. **一致性**：多次调用结果不变（对象未修改的情况下）
5. **非空性**：`x.equals(null)` 必须返回 false

#### 常见陷阱

**陷阱 1：NullPointerException**
```java
String str = null;
// str.equals("test")  // NPE!
// "test".equals(str)  // 推荐：返回 false
```

**陷阱 2：包装类型比较**
```java
Integer a = 128;
Integer b = 128;
a == b           // false（超出缓存范围）
a.equals(b)      // true（正确方式）
```

**陷阱 3：重写 equals 不重写 hashCode**
```java
// 违反约定：equals 相等的对象 hashCode 必须相等
// 会导致 HashMap/HashSet 中出现重复的"相等"对象
```

#### 关键要点

1. **基本原则**
   - == 比引用，equals() 比内容
   - 基本类型只能用 ==
   - 对象比较优先用 equals()

2. **String 特殊性**
   - 字面量在常量池，== 可能为 true
   - new 创建的在堆中，== 必为 false
   - 永远用 equals() 比较字符串内容

3. **null 安全**
   - 常量.equals(变量) 避免 NPE
   - Objects.equals(a, b) 更安全

4. **性能考虑**
   - == 最快，但只能比较引用
   - equals() 需要方法调用和逻辑判断
   - 先用 == 快速判断可以优化性能

5. **最佳实践**
   - 重写 equals() 必须重写 hashCode()
   - 使用 Objects.equals() 处理 null
   - 集合中的对象务必正确实现 equals()

### 10. String、StringBuilder 和 StringBuffer 的区别？

这三个类都用于处理字符串，但在**可变性、线程安全性、性能**等方面存在显著差异。

#### 核心区别对比

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">String vs StringBuilder vs StringBuffer</text>
  <rect x="30" y="70" width="230" height="300" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="145" y="100" font-size="15" font-weight="bold" text-anchor="middle" fill="#C62828">String</text>
  <text x="145" y="125" font-size="12" font-weight="bold" text-anchor="middle" fill="#D32F2F">不可变</text>
  <rect x="50" y="140" width="180" height="40" fill="#FFCDD2" stroke="#E57373" stroke-width="1"/>
  <text x="60" y="160" font-size="11" text-anchor="start" fill="#333">✗ 线程安全</text>
  <text x="60" y="175" font-size="10" text-anchor="start" fill="#666">（不可变天然安全）</text>
  <rect x="50" y="190" width="180" height="40" fill="#FFCDD2" stroke="#E57373" stroke-width="1"/>
  <text x="60" y="210" font-size="11" text-anchor="start" fill="#333">✗ 性能</text>
  <text x="60" y="225" font-size="10" text-anchor="start" fill="#666">拼接创建大量对象</text>
  <rect x="50" y="240" width="180" height="40" fill="#FFCDD2" stroke="#E57373" stroke-width="1"/>
  <text x="60" y="260" font-size="11" text-anchor="start" fill="#333">✓ 常量池优化</text>
  <text x="60" y="275" font-size="10" text-anchor="start" fill="#666">节省内存</text>
  <rect x="50" y="290" width="180" height="60" fill="#EF9A9A" stroke="#E57373" stroke-width="1"/>
  <text x="140" y="310" font-size="11" font-weight="bold" text-anchor="middle" fill="#B71C1C">使用场景</text>
  <text x="60" y="330" font-size="10" text-anchor="start" fill="#333">• 字符串常量</text>
  <text x="60" y="345" font-size="10" text-anchor="start" fill="#333">• 少量操作</text>
  <rect x="285" y="70" width="230" height="300" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="400" y="100" font-size="15" font-weight="bold" text-anchor="middle" fill="#2E7D32">StringBuilder</text>
  <text x="400" y="125" font-size="12" font-weight="bold" text-anchor="middle" fill="#388E3C">可变（推荐）</text>
  <rect x="305" y="140" width="180" height="40" fill="#C8E6C9" stroke="#81C784" stroke-width="1"/>
  <text x="315" y="160" font-size="11" text-anchor="start" fill="#333">✗ 非线程安全</text>
  <text x="315" y="175" font-size="10" text-anchor="start" fill="#666">（无同步开销）</text>
  <rect x="305" y="190" width="180" height="40" fill="#C8E6C9" stroke="#81C784" stroke-width="1"/>
  <text x="315" y="210" font-size="11" text-anchor="start" fill="#333">✓ 性能最高</text>
  <text x="315" y="225" font-size="10" text-anchor="start" fill="#666">单线程首选</text>
  <rect x="305" y="240" width="180" height="40" fill="#C8E6C9" stroke="#81C784" stroke-width="1"/>
  <text x="315" y="260" font-size="11" text-anchor="start" fill="#333">✓ 原地修改</text>
  <text x="315" y="275" font-size="10" text-anchor="start" fill="#666">避免创建新对象</text>
  <rect x="305" y="290" width="180" height="60" fill="#A5D6A7" stroke="#81C784" stroke-width="1"/>
  <text x="395" y="310" font-size="11" font-weight="bold" text-anchor="middle" fill="#1B5E20">使用场景</text>
  <text x="315" y="330" font-size="10" text-anchor="start" fill="#333">• 单线程拼接</text>
  <text x="315" y="345" font-size="10" text-anchor="start" fill="#333">• 循环构建字符串</text>
  <rect x="540" y="70" width="230" height="300" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="655" y="100" font-size="15" font-weight="bold" text-anchor="middle" fill="#1565C0">StringBuffer</text>
  <text x="655" y="125" font-size="12" font-weight="bold" text-anchor="middle" fill="#1976D2">可变（线程安全）</text>
  <rect x="560" y="140" width="180" height="40" fill="#BBDEFB" stroke="#64B5F6" stroke-width="1"/>
  <text x="570" y="160" font-size="11" text-anchor="start" fill="#333">✓ 线程安全</text>
  <text x="570" y="175" font-size="10" text-anchor="start" fill="#666">（synchronized 同步）</text>
  <rect x="560" y="190" width="180" height="40" fill="#BBDEFB" stroke="#64B5F6" stroke-width="1"/>
  <text x="570" y="210" font-size="11" text-anchor="start" fill="#333">△ 性能较低</text>
  <text x="570" y="225" font-size="10" text-anchor="start" fill="#666">同步有开销</text>
  <rect x="560" y="240" width="180" height="40" fill="#BBDEFB" stroke="#64B5F6" stroke-width="1"/>
  <text x="570" y="260" font-size="11" text-anchor="start" fill="#333">✓ 原地修改</text>
  <text x="570" y="275" font-size="10" text-anchor="start" fill="#666">避免创建新对象</text>
  <rect x="560" y="290" width="180" height="60" fill="#90CAF9" stroke="#64B5F6" stroke-width="1"/>
  <text x="650" y="310" font-size="11" font-weight="bold" text-anchor="middle" fill="#0D47A1">使用场景</text>
  <text x="570" y="330" font-size="10" text-anchor="start" fill="#333">• 多线程拼接</text>
  <text x="570" y="345" font-size="10" text-anchor="start" fill="#333">• 遗留代码（少用）</text>
</svg>

#### 详细对比表

| 特性 | String | StringBuilder | StringBuffer |
|------|--------|---------------|--------------|
| **可变性** | 不可变 | 可变 | 可变 |
| **线程安全** | 安全（不可变） | 不安全 | 安全（synchronized） |
| **性能** | 拼接慢 | 快 | 较快（有同步开销） |
| **内存** | 每次拼接创建新对象 | 原地修改 | 原地修改 |
| **JDK 版本** | 1.0 | 1.5 | 1.0 |
| **适用场景** | 字符串常量 | 单线程频繁拼接 | 多线程频繁拼接 |
| **方法同步** | 无需 | 无 | 所有方法 synchronized |

#### 性能差异示意

<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">字符串拼接性能对比（10000次循环）</text>
  <rect x="50" y="70" width="200" height="220" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="150" y="95" font-size="13" font-weight="bold" text-anchor="middle" fill="#C62828">String</text>
  <rect x="70" y="110" width="160" height="170" fill="#EF5350" stroke="#C62828" stroke-width="2"/>
  <text x="150" y="195" font-size="16" font-weight="bold" text-anchor="middle" fill="white">~1000ms</text>
  <text x="150" y="250" font-size="11" text-anchor="middle" fill="#333">创建 10000 个对象</text>
  <text x="150" y="270" font-size="11" text-anchor="middle" fill="#333">❌ 性能最差</text>
  <rect x="300" y="70" width="200" height="220" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="400" y="95" font-size="13" font-weight="bold" text-anchor="middle" fill="#2E7D32">StringBuilder</text>
  <text x="400" y="225" font-size="11" text-anchor="middle" fill="#333">单个对象原地修改</text>
  <text x="400" y="242" font-size="11" text-anchor="middle" fill="#2E7D32">✓ 性能最优</text>
  <rect x="320" y="250" width="160" height="20" fill="#66BB6A" stroke="#388E3C" stroke-width="2"/>
  <text x="400" y="265" font-size="16" font-weight="bold" text-anchor="middle" fill="white">~1ms</text>
  <rect x="550" y="70" width="200" height="220" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="650" y="95" font-size="13" font-weight="bold" text-anchor="middle" fill="#1565C0">StringBuffer</text>
  <text x="650" y="225" font-size="11" text-anchor="middle" fill="#333">同步有轻微开销</text>
  <text x="650" y="242" font-size="11" text-anchor="middle" fill="#1976D2">△ 性能略低</text>
  <rect x="570" y="248" width="160" height="22" fill="#42A5F5" stroke="#1976D2" stroke-width="2"/>
  <text x="650" y="263" font-size="16" font-weight="bold" text-anchor="middle" fill="white">~2ms</text>
</svg>

#### 底层实现原理

**1. String 不可变**
```java
// String 内部结构（简化）
public final class String {
    private final char[] value;  // 不可修改
}
```
- 每次"修改"都创建新对象
- `str = str + "x"` 会产生临时对象

**2. StringBuilder/StringBuffer 可变**
```java
// 内部使用可变字符数组
abstract class AbstractStringBuilder {
    char[] value;  // 可修改
    int count;     // 当前长度
}
```
- 原地修改字符数组
- 容量不足时扩容（通常翻倍）

**3. 同步机制差异**
```java
// StringBuffer：方法加锁
public synchronized StringBuffer append(String str) {
    super.append(str);
    return this;
}

// StringBuilder：无锁
public StringBuilder append(String str) {
    super.append(str);
    return this;
}
```

#### 使用场景选择

**使用 String 的场景：**
1. 字符串常量或很少修改
2. 作为 Map 的键
3. 多线程共享且只读

**使用 StringBuilder 的场景（90% 情况）：**
1. 单线程内频繁拼接
2. 循环中构建字符串
3. 临时字符串构建

**使用 StringBuffer 的场景（很少）：**
1. 多线程共享且需要修改
2. 遗留代码维护
3. **注意**：现代开发中很少使用，通常用其他并发工具替代

#### 常见误区

**误区 1：循环中使用 String 拼接**
```java
// ❌ 错误：产生大量临时对象
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i;  // 每次创建新 String
}

// ✓ 正确：使用 StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i);
}
String result = sb.toString();
```

**误区 2：认为 StringBuffer 总是必要的**
```java
// ❌ 过度设计：局部变量无需 StringBuffer
public String buildMessage() {
    StringBuffer sb = new StringBuffer();  // 不必要
    sb.append("Hello");
    return sb.toString();
}

// ✓ 正确：局部变量用 StringBuilder
public String buildMessage() {
    StringBuilder sb = new StringBuilder();
    sb.append("Hello");
    return sb.toString();
}
```

**误区 3：忽略编译器优化**
```java
// 简单拼接编译器会优化
String s = "Hello" + " " + "World";  // 编译期合并
// 等价于：String s = "Hello World";

// 但变量拼接不会优化
String a = "Hello", b = "World";
String s = a + b;  // 运行期使用 StringBuilder
```

#### 关键要点

1. **性能排序**
   - StringBuilder > StringBuffer >> String（拼接场景）
   - 单次赋值：差异不明显

2. **线程安全**
   - String：不可变天然线程安全
   - StringBuilder：非线程安全
   - StringBuffer：线程安全但性能差

3. **选择原则**
   - **优先 String**：字符串不变或很少改变
   - **推荐 StringBuilder**：单线程拼接（99% 情况）
   - **避免 StringBuffer**：现代开发中很少需要

4. **容量优化**
   - 创建时指定初始容量避免扩容
   - `new StringBuilder(100)` 预分配容量

5. **编译器优化**
   - 字面量拼接编译器自动优化
   - 循环、条件分支中的拼接不会优化

### 11. String 的 intern() 方法？

`intern()` 方法是 String 类提供的一个**本地方法**，用于将字符串手动放入**字符串常量池**，实现字符串的**复用**，从而节省内存。

#### 工作原理

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">intern() 方法工作流程</text>
  <rect x="50" y="70" width="700" height="300" fill="#FFF9E6" stroke="#FFC107" stroke-width="2" rx="5"/>
  <rect x="100" y="100" width="250" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="225" y="130" font-size="13" font-weight="bold" text-anchor="middle" fill="#1565C0">步骤 1：调用 intern()</text>
  <text x="110" y="155" font-size="11" text-anchor="start" fill="#333">String s = new String("hello");</text>
  <text x="110" y="170" font-size="11" text-anchor="start" fill="#333">String interned = s.intern();</text>
  <path d="M 225 180 L 225 210" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow8)"/>
  <rect x="100" y="210" width="250" height="100" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="225" y="240" font-size="13" font-weight="bold" text-anchor="middle" fill="#2E7D32">步骤 2：检查常量池</text>
  <text x="110" y="265" font-size="11" text-anchor="start" fill="#333">常量池中是否存在 "hello"？</text>
  <rect x="120" y="275" width="90" height="25" fill="#C8E6C9" stroke="#66BB6A" stroke-width="1"/>
  <text x="165" y="292" font-size="10" text-anchor="middle" fill="#1B5E20">存在</text>
  <rect x="230" y="275" width="90" height="25" fill="#FFCDD2" stroke="#EF5350" stroke-width="1"/>
  <text x="275" y="292" font-size="10" text-anchor="middle" fill="#B71C1C">不存在</text>
  <path d="M 210 287 L 450 280" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow9)"/>
  <path d="M 320 287 L 450 140" stroke="#F44336" stroke-width="2" marker-end="url(#arrow10)"/>
  <rect x="450" y="100" width="250" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="575" y="125" font-size="12" font-weight="bold" text-anchor="middle" fill="#C62828">情况 A：不存在</text>
  <text x="460" y="145" font-size="10" text-anchor="start" fill="#333">1. 将字符串对象放入常量池</text>
  <text x="460" y="165" font-size="10" text-anchor="start" fill="#333">2. 返回常量池中的引用</text>
  <rect x="450" y="240" width="250" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="575" y="265" font-size="12" font-weight="bold" text-anchor="middle" fill="#2E7D32">情况 B：已存在</text>
  <text x="460" y="285" font-size="10" text-anchor="start" fill="#333">1. 不创建新对象</text>
  <text x="460" y="305" font-size="10" text-anchor="start" fill="#333">2. 直接返回常量池中的引用</text>
  <text x="400" y="360" font-size="12" font-weight="bold" text-anchor="middle" fill="#F57C00">结果：多个引用指向常量池同一对象，节省内存</text>
  <defs>
    <marker id="arrow8" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#4CAF50"/></marker>
    <marker id="arrow9" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#4CAF50"/></marker>
    <marker id="arrow10" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#F44336"/></marker>
  </defs>
</svg>

#### 内存示意图

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">intern() 内存分布</text>
  <rect x="50" y="60" width="300" height="260" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="200" y="85" font-size="14" font-weight="bold" text-anchor="middle" fill="#1565C0">堆内存</text>
  <rect x="80" y="100" width="240" height="60" fill="#BBDEFB" stroke="#1976D2" stroke-width="2" rx="5"/>
  <text x="200" y="125" font-size="12" text-anchor="middle" fill="#0D47A1">new String("hello")</text>
  <text x="200" y="145" font-size="11" text-anchor="middle" fill="#1976D2">地址: 0x1000</text>
  <rect x="80" y="180" width="240" height="60" fill="#90CAF9" stroke="#1976D2" stroke-width="2" rx="5"/>
  <text x="200" y="205" font-size="12" text-anchor="middle" fill="#0D47A1">new String("world")</text>
  <text x="200" y="225" font-size="11" text-anchor="middle" fill="#1976D2">地址: 0x2000</text>
  <text x="200" y="270" font-size="11" text-anchor="middle" fill="#666">调用 intern() 前</text>
  <text x="200" y="285" font-size="11" text-anchor="middle" fill="#666">堆中有独立对象</text>
  <rect x="450" y="60" width="300" height="260" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="600" y="85" font-size="14" font-weight="bold" text-anchor="middle" fill="#2E7D32">字符串常量池</text>
  <rect x="480" y="100" width="240" height="50" fill="#A5D6A7" stroke="#66BB6A" stroke-width="2" rx="5"/>
  <text x="600" y="130" font-size="12" text-anchor="middle" fill="#1B5E20">"hello"</text>
  <rect x="480" y="170" width="240" height="50" fill="#C8E6C9" stroke="#81C784" stroke-width="2" rx="5"/>
  <text x="600" y="200" font-size="12" text-anchor="middle" fill="#1B5E20">"world"</text>
  <path d="M 320 130 L 480 125" stroke="#FF9800" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow11)"/>
  <text x="400" y="120" font-size="10" fill="#FF9800">intern()</text>
  <path d="M 320 210 L 480 195" stroke="#FF9800" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow11)"/>
  <text x="400" y="200" font-size="10" fill="#FF9800">intern()</text>
  <text x="600" y="260" font-size="11" text-anchor="middle" fill="#2E7D32">✓ 去重复用</text>
  <text x="600" y="280" font-size="11" text-anchor="middle" fill="#666">所有相同字符串</text>
  <text x="600" y="295" font-size="11" text-anchor="middle" fill="#666">指向同一对象</text>
  <defs>
    <marker id="arrow11" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#FF9800"/></marker>
  </defs>
</svg>

#### 使用场景和效果

**使用场景：**
1. **大量重复字符串**：如日志中的级别标识（INFO、ERROR）
2. **数据库查询结果**：相同值的字段
3. **配置文件读取**：重复的配置项
4. **URL 或路径字符串**：相同路径被多次引用

**内存优化效果：**
```java
// 场景：处理 100 万条日志，只有 5 种日志级别
// 不使用 intern()：100 万个 String 对象
// 使用 intern()：5 个 String 对象 + 100 万个引用
```

#### 版本差异（重要）

**JDK 6 及之前：**
- 常量池在**永久代**（PermGen）
- 永久代空间有限（默认几十 MB）
- 大量 intern() 可能导致 `OutOfMemoryError: PermGen space`

**JDK 7 及之后：**
- 常量池移至**堆内存**
- 空间限制大幅放宽
- intern() 更安全可用

**JDK 7+ 的优化：**
```java
String s1 = new String("hello");
String s2 = s1.intern();
// JDK 6：常量池中创建新对象
// JDK 7+：常量池存储堆中对象的引用（更高效）
```

#### 典型应用示例

**示例 1：基本用法**
```java
String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1 == s2);  // false（不同对象）

String s3 = s1.intern();
String s4 = s2.intern();
System.out.println(s3 == s4);  // true（同一对象）
System.out.println(s3 == "hello");  // true（字面量本就在常量池）
```

**示例 2：性能优化**
```java
// 场景：处理大量重复字符串
List<String> statuses = new ArrayList<>();
for (int i = 0; i < 1000000; i++) {
    String status = getStatus();  // 返回 "SUCCESS"/"FAILED"
    statuses.add(status.intern());  // 复用常量池对象
}
// 内存占用：~2 个 String 对象 vs 100 万个对象
```

**示例 3：== 比较优化**
```java
// 利用 intern() 可以用 == 快速比较
String level1 = logEntry1.getLevel().intern();
String level2 = logEntry2.getLevel().intern();
if (level1 == level2) {  // 比 equals() 更快
    // 同一日志级别
}
```

#### 性能考虑

**优点：**
- 节省内存（大量重复字符串场景）
- == 比较比 equals() 快

**缺点：**
- intern() 方法本身有性能开销（需要查找/插入常量池）
- 字符串过多会导致常量池膨胀
- JDK 6 中有 PermGen 溢出风险

**性能对比：**
```
操作耗时：
== 比较：        O(1)
equals() 比较：  O(n)（n 为字符串长度）
intern() 调用：  O(log n)（哈希表查找）
```

#### 常见陷阱

**陷阱 1：滥用 intern()**
```java
// ❌ 错误：对唯一字符串使用 intern()
for (User user : users) {
    String name = user.getName().intern();  // 每个名字都不同，无意义
}
```

**陷阱 2：JDK 6 中的内存泄漏**
```java
// JDK 6 中危险
for (String line : millionsOfUniqueLines) {
    line.intern();  // 可能导致 PermGen 溢出
}
```

**陷阱 3：误解返回值**
```java
String s = new String("hello");
s.intern();  // ❌ 错误：未使用返回值
// 应该：s = s.intern();
```

#### 关键要点

1. **核心作用**
   - 将字符串放入常量池
   - 实现字符串去重复用
   - 节省内存空间

2. **使用原则**
   - **适用**：大量重复字符串（如枚举值、状态码）
   - **不适用**：唯一字符串或少量字符串

3. **版本注意**
   - JDK 6：谨慎使用，防止 PermGen 溢出
   - JDK 7+：更安全，常量池在堆中

4. **性能权衡**
   - intern() 有调用开销
   - 适合读多写少的场景
   - 重复度高才有优化效果

5. **最佳实践**
   - 评估字符串重复度（重复率 > 50% 才考虑）
   - 避免对动态生成的唯一字符串使用
   - 结合 == 比较提升性能

### 12. 字符串常量池是什么？

字符串常量池（String Pool/String Constant Pool）是 JVM 为了优化字符串存储而设计的一块**特殊内存区域**，用于存储字符串字面量，实现字符串的**共享和复用**。

#### 字符串常量池的位置

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">字符串常量池在 JVM 中的位置演变</text>
  <rect x="50" y="70" width="330" height="300" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="215" y="100" font-size="15" font-weight="bold" text-anchor="middle" fill="#C62828">JDK 6 及之前</text>
  <rect x="80" y="120" width="260" height="100" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="210" y="145" font-size="13" font-weight="bold" text-anchor="middle" fill="#1565C0">永久代 (PermGen)</text>
  <rect x="100" y="160" width="220" height="45" fill="#90CAF9" stroke="#1976D2" stroke-width="1"/>
  <text x="210" y="188" font-size="12" text-anchor="middle" fill="#0D47A1">字符串常量池</text>
  <text x="90" y="240" font-size="11" text-anchor="start" fill="#666">❌ 空间有限（默认 64MB）</text>
  <text x="90" y="260" font-size="11" text-anchor="start" fill="#666">❌ 容易 PermGen OOM</text>
  <text x="90" y="280" font-size="11" text-anchor="start" fill="#666">❌ Full GC 才回收</text>
  <rect x="80" y="300" width="260" height="50" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="210" y="330" font-size="11" text-anchor="middle" fill="#E65100">-XX:PermSize / MaxPermSize</text>
  <rect x="420" y="70" width="330" height="300" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="585" y="100" font-size="15" font-weight="bold" text-anchor="middle" fill="#2E7D32">JDK 7+</text>
  <rect x="450" y="120" width="260" height="180" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="580" y="145" font-size="13" font-weight="bold" text-anchor="middle" fill="#1565C0">堆内存 (Heap)</text>
  <rect x="470" y="160" width="220" height="45" fill="#81C784" stroke="#388E3C" stroke-width="2"/>
  <text x="580" y="188" font-size="12" text-anchor="middle" fill="white">字符串常量池</text>
  <rect x="470" y="220" width="220" height="65" fill="#A5D6A7" stroke="#66BB6A" stroke-width="1"/>
  <text x="580" y="245" font-size="11" text-anchor="middle" fill="#1B5E20">其他对象</text>
  <text x="580" y="265" font-size="10" text-anchor="middle" fill="#2E7D32">new String(...)</text>
  <text x="460" y="320" font-size="11" text-anchor="start" fill="#2E7D32">✓ 空间更大（堆内存）</text>
  <text x="460" y="340" font-size="11" text-anchor="start" fill="#2E7D32">✓ 可被 GC 回收</text>
  <text x="460" y="360" font-size="11" text-anchor="start" fill="#2E7D32">✓ 更灵活安全</text>
</svg>

#### 常量池的工作机制

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">字符串常量池工作机制</text>
  <rect x="50" y="70" width="700" height="250" fill="#FFF9E6" stroke="#FFC107" stroke-width="2" rx="5"/>
  <rect x="80" y="100" width="180" height="180" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="170" y="125" font-size="13" font-weight="bold" text-anchor="middle" fill="#1565C0">代码</text>
  <text x="90" y="155" font-size="11" text-anchor="start" fill="#333">String s1 = "hello";</text>
  <text x="90" y="175" font-size="11" text-anchor="start" fill="#333">String s2 = "hello";</text>
  <text x="90" y="195" font-size="11" text-anchor="start" fill="#333">String s3 = "world";</text>
  <text x="90" y="225" font-size="10" text-anchor="start" fill="#666">字面量自动进入常量池</text>
  <text x="90" y="245" font-size="10" text-anchor="start" fill="#666">相同内容共享对象</text>
  <path d="M 260 150 L 340 150" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow12)"/>
  <rect x="340" y="100" width="180" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="430" y="125" font-size="13" font-weight="bold" text-anchor="middle" fill="#2E7D32">字符串常量池</text>
  <rect x="360" y="140" width="140" height="35" fill="#81C784" stroke="#388E3C" stroke-width="2" rx="3"/>
  <text x="430" y="163" font-size="11" text-anchor="middle" fill="white">"hello" (0x1000)</text>
  <rect x="360" y="190" width="140" height="35" fill="#81C784" stroke="#388E3C" stroke-width="2" rx="3"/>
  <text x="430" y="213" font-size="11" text-anchor="middle" fill="white">"world" (0x2000)</text>
  <text x="350" y="250" font-size="10" text-anchor="start" fill="#2E7D32">✓ 只存一份 "hello"</text>
  <text x="350" y="265" font-size="10" text-anchor="start" fill="#2E7D32">✓ s1 和 s2 指向同一对象</text>
  <path d="M 520 160 L 570 160" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow13)"/>
  <rect x="570" y="100" width="150" height="180" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="645" y="125" font-size="13" font-weight="bold" text-anchor="middle" fill="#E65100">引用关系</text>
  <text x="580" y="155" font-size="10" text-anchor="start" fill="#333">s1 → 0x1000</text>
  <text x="580" y="175" font-size="10" text-anchor="start" fill="#333">s2 → 0x1000</text>
  <text x="580" y="195" font-size="10" text-anchor="start" fill="#333">s3 → 0x2000</text>
  <text x="580" y="225" font-size="10" text-anchor="start" fill="#F57C00">s1 == s2 ✓</text>
  <text x="580" y="245" font-size="10" text-anchor="start" fill="#F57C00">s1 == s3 ✗</text>
  <defs>
    <marker id="arrow12" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#4CAF50"/></marker>
    <marker id="arrow13" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#FF9800"/></marker>
  </defs>
</svg>

#### 进入常量池的方式

**1. 字符串字面量（编译期）**
```java
String s1 = "hello";  // 编译期进入常量池
```

**2. 编译期常量表达式**
```java
String s2 = "hel" + "lo";  // 编译期优化为 "hello"
final String prefix = "hel";
String s3 = prefix + "lo";  // 编译期优化为 "hello"
```

**3. 显式调用 intern()（运行期）**
```java
String s4 = new String("hello").intern();  // 运行期放入常量池
```

**不会进入常量池的情况：**
```java
String s5 = new String("hello");  // 在堆中创建新对象
String s6 = s1 + s2;              // 运行期拼接，在堆中
StringBuilder sb = new StringBuilder("hello");
String s7 = sb.toString();        // 在堆中
```

#### 常量池的特点

| 特性 | 说明 |
|------|------|
| **存储内容** | 字符串字面量和运行时 intern() 的字符串 |
| **去重机制** | 相同内容只存一份 |
| **查找方式** | 哈希表（快速查找） |
| **内存节省** | 避免重复对象 |
| **线程安全** | JVM 保证线程安全 |
| **GC 回收** | JDK 7+ 可被垃圾回收 |

#### 常量池的优势

**1. 节省内存**
```java
// 假设程序中有 1000 个地方使用 "SUCCESS"
// 没有常量池：1000 个对象，每个约 50 字节 = 50KB
// 有常量池：1 个对象 50 字节 + 1000 个引用 8KB = 约 8KB
```

**2. 提高性能**
- 字符串比较可以用 == （引用比较）
- 避免重复创建对象的开销

**3. 字符串共享**
- 多处使用相同字符串时自动共享

#### 常量池大小调整

**查看和调整常量池大小：**
```bash
# JDK 7+：常量池在堆中，由堆大小控制
-Xms512m -Xmx1024m

# 调整字符串常量池表大小（哈希表桶数）
-XX:StringTableSize=100003  # 默认 60013（JDK 8）

# 打印字符串常量池统计信息
-XX:+PrintStringTableStatistics
```

#### 与 new String() 的对比

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">字符串创建方式对比</text>
  <rect x="50" y="70" width="330" height="200" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="215" y="100" font-size="14" font-weight="bold" text-anchor="middle" fill="#2E7D32">字面量方式</text>
  <text x="70" y="130" font-size="12" text-anchor="start" fill="#333">String s = "hello";</text>
  <text x="70" y="160" font-size="11" text-anchor="start" fill="#2E7D32">✓ 在常量池中</text>
  <text x="70" y="180" font-size="11" text-anchor="start" fill="#2E7D32">✓ 自动共享复用</text>
  <text x="70" y="200" font-size="11" text-anchor="start" fill="#2E7D32">✓ 内存占用小</text>
  <text x="70" y="220" font-size="11" text-anchor="start" fill="#2E7D32">✓ 性能最优</text>
  <text x="70" y="250" font-size="11" font-weight="bold" text-anchor="start" fill="#1B5E20">推荐使用</text>
  <rect x="420" y="70" width="330" height="200" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="585" y="100" font-size="14" font-weight="bold" text-anchor="middle" fill="#C62828">new 方式</text>
  <text x="440" y="130" font-size="12" text-anchor="start" fill="#333">String s = new String("hello");</text>
  <text x="440" y="160" font-size="11" text-anchor="start" fill="#C62828">✗ 在堆中创建新对象</text>
  <text x="440" y="180" font-size="11" text-anchor="start" fill="#C62828">✗ 不会自动共享</text>
  <text x="440" y="200" font-size="11" text-anchor="start" fill="#C62828">✗ 浪费内存</text>
  <text x="440" y="220" font-size="11" text-anchor="start" fill="#C62828">✗ 性能较差</text>
  <text x="440" y="250" font-size="11" font-weight="bold" text-anchor="start" fill="#B71C1C">避免使用</text>
</svg>

#### 关键要点

1. **本质**
   - JVM 维护的特殊内存区域
   - 存储字符串字面量
   - 实现字符串去重和共享

2. **位置变迁**
   - JDK 6：永久代（PermGen），空间有限
   - JDK 7+：堆内存，空间更大更灵活

3. **进入方式**
   - 字面量自动进入（编译期）
   - intern() 方法主动放入（运行期）
   - new 创建的不会自动进入

4. **优势**
   - 节省内存（避免重复对象）
   - 提高性能（== 比较、避免创建开销）
   - 线程安全（JVM 管理）

5. **最佳实践**
   - 优先使用字面量创建字符串
   - 避免不必要的 new String()
   - 大量重复字符串考虑 intern()
   - 注意 JDK 6 中 PermGen 溢出风险

### 13. String str = "hello" 和 String str = new String("hello") 的区别？

这两种创建字符串的方式在**内存分配、对象创建数量、性能**等方面存在显著差异。

#### 核心区别

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">两种创建方式的内存分布</text>
  <rect x="50" y="70" width="330" height="320" fill="#E8F5E9" stroke="#4CAF50" stroke-width="3" rx="8"/>
  <text x="215" y="105" font-size="16" font-weight="bold" text-anchor="middle" fill="#2E7D32">方式 1：字面量</text>
  <text x="215" y="135" font-size="13" text-anchor="middle" fill="#333">String s = "hello";</text>
  <rect x="80" y="160" width="260" height="80" fill="#C8E6C9" stroke="#66BB6A" stroke-width="2" rx="5"/>
  <text x="210" y="185" font-size="12" font-weight="bold" text-anchor="middle" fill="#1B5E20">字符串常量池</text>
  <rect x="100" y="200" width="220" height="30" fill="#81C784" stroke="#388E3C" stroke-width="2"/>
  <text x="210" y="220" font-size="11" text-anchor="middle" fill="white">"hello" (0x1000)</text>
  <rect x="100" y="270" width="220" height="60" fill="#A5D6A7" stroke="#66BB6A" stroke-width="1" rx="3"/>
  <text x="210" y="295" font-size="11" font-weight="bold" text-anchor="middle" fill="#1B5E20">变量 s</text>
  <text x="210" y="315" font-size="10" text-anchor="middle" fill="#333">引用 → 0x1000</text>
  <rect x="420" y="70" width="330" height="320" fill="#FFEBEE" stroke="#F44336" stroke-width="3" rx="8"/>
  <text x="585" y="105" font-size="16" font-weight="bold" text-anchor="middle" fill="#C62828">方式 2：new</text>
  <text x="585" y="135" font-size="13" text-anchor="middle" fill="#333">String s = new String("hello");</text>
  <rect x="450" y="160" width="260" height="80" fill="#FFCDD2" stroke="#EF5350" stroke-width="2" rx="5"/>
  <text x="580" y="185" font-size="12" font-weight="bold" text-anchor="middle" fill="#B71C1C">字符串常量池</text>
  <rect x="470" y="200" width="220" height="30" fill="#E57373" stroke="#D32F2F" stroke-width="2"/>
  <text x="580" y="220" font-size="11" text-anchor="middle" fill="white">"hello" (0x1000)</text>
  <rect x="450" y="260" width="260" height="60" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="580" y="285" font-size="12" font-weight="bold" text-anchor="middle" fill="#E65100">堆内存</text>
  <rect x="470" y="295" width="220" height="15" fill="#FFB74D" stroke="#F57C00" stroke-width="1"/>
  <text x="580" y="306" font-size="9" text-anchor="middle" fill="white">new String (0x2000)</text>
  <rect x="470" y="330" width="220" height="50" fill="#FFCCBC" stroke="#FF5722" stroke-width="1" rx="3"/>
  <text x="580" y="352" font-size="11" font-weight="bold" text-anchor="middle" fill="#BF360C">变量 s</text>
  <text x="580" y="370" font-size="10" text-anchor="middle" fill="#333">引用 → 0x2000</text>
  <rect x="50" y="410" width="330" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="60" y="430" font-size="11" text-anchor="start" fill="#2E7D32">✓ 创建 1 个对象</text>
  <text x="60" y="450" font-size="11" text-anchor="start" fill="#2E7D32">✓ 在常量池，可复用</text>
  <text x="60" y="470" font-size="11" text-anchor="start" fill="#2E7D32">✓ 性能高，内存占用小</text>
  <rect x="420" y="410" width="330" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="430" y="430" font-size="11" text-anchor="start" fill="#C62828">✗ 创建 2 个对象</text>
  <text x="430" y="450" font-size="11" text-anchor="start" fill="#C62828">✗ 一个在常量池，一个在堆</text>
  <text x="430" y="470" font-size="11" text-anchor="start" fill="#C62828">✗ 性能低，浪费内存</text>
</svg>

#### 详细对比

| 对比维度 | String s = "hello" | String s = new String("hello") |
|---------|-------------------|--------------------------------|
| **创建对象数** | 1 个（常量池） | 2 个（常量池 + 堆） |
| **内存位置** | 字符串常量池 | 堆内存 |
| **引用指向** | 指向常量池对象 | 指向堆中对象 |
| **可复用性** | 自动复用 | 不会自动复用 |
| **== 比较** | 相同字面量 == 返回 true | 返回 false（不同对象） |
| **性能** | 快（直接引用） | 慢（需要创建对象） |
| **内存占用** | 小 | 大（多一个对象） |
| **推荐程度** | ✓ 推荐 | ✗ 不推荐 |

#### new String() 创建几个对象？

**关键问题**：`new String("hello")` 到底创建了几个对象？

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">new String("hello") 对象创建过程</text>
  <rect x="50" y="70" width="250" height="180" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="175" y="100" font-size="13" font-weight="bold" text-anchor="middle" fill="#1565C0">步骤 1：编译期</text>
  <text x="70" y="130" font-size="11" text-anchor="start" fill="#333">字面量 "hello" 进入常量池</text>
  <rect x="80" y="145" width="180" height="30" fill="#90CAF9" stroke="#1976D2" stroke-width="2"/>
  <text x="170" y="165" font-size="11" text-anchor="middle" fill="#0D47A1">常量池："hello"</text>
  <text x="70" y="200" font-size="10" text-anchor="start" fill="#666">如果常量池已有 "hello"</text>
  <text x="70" y="220" font-size="10" text-anchor="start" fill="#666">则不创建新对象（0 个）</text>
  <path d="M 300 150 L 370 150" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow14)"/>
  <rect x="370" y="70" width="250" height="180" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="495" y="100" font-size="13" font-weight="bold" text-anchor="middle" fill="#2E7D32">步骤 2：运行期</text>
  <text x="390" y="130" font-size="11" text-anchor="start" fill="#333">new 关键字在堆中创建对象</text>
  <rect x="400" y="145" width="180" height="30" fill="#81C784" stroke="#388E3C" stroke-width="2"/>
  <text x="490" y="165" font-size="11" text-anchor="middle" fill="white">堆：new String</text>
  <text x="390" y="200" font-size="10" text-anchor="start" fill="#2E7D32">✓ 必定创建 1 个对象</text>
  <text x="390" y="220" font-size="10" text-anchor="start" fill="#2E7D32">✓ 复制常量池字符串内容</text>
  <rect x="650" y="70" width="130" height="180" fill="#FFF9E6" stroke="#FFC107" stroke-width="2" rx="5"/>
  <text x="715" y="100" font-size="12" font-weight="bold" text-anchor="middle" fill="#F57C00">结论</text>
  <text x="660" y="130" font-size="11" text-anchor="start" fill="#333">常量池已存在：</text>
  <text x="670" y="150" font-size="11" font-weight="bold" text-anchor="start" fill="#E65100">1 个对象</text>
  <text x="660" y="180" font-size="11" text-anchor="start" fill="#333">常量池不存在：</text>
  <text x="670" y="200" font-size="11" font-weight="bold" text-anchor="start" fill="#E65100">2 个对象</text>
  <defs>
    <marker id="arrow14" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#4CAF50"/></marker>
  </defs>
</svg>

**答案**：
- **常量池中已有**该字符串：创建 **1 个对象**（堆中）
- **常量池中没有**该字符串：创建 **2 个对象**（常量池 + 堆）

#### 实际场景对比

**场景 1：多次使用相同字符串**
```java
// 字面量方式：复用同一对象
String s1 = "hello";
String s2 = "hello";
String s3 = "hello";
System.out.println(s1 == s2);  // true
System.out.println(s1 == s3);  // true
// 内存：1 个对象 + 3 个引用

// new 方式：每次创建新对象
String s4 = new String("hello");
String s5 = new String("hello");
String s6 = new String("hello");
System.out.println(s4 == s5);  // false
System.out.println(s4 == s6);  // false
// 内存：4 个对象（1 个常量池 + 3 个堆）
```

**场景 2：性能差异**
```java
// 字面量：快速引用
long start = System.nanoTime();
for (int i = 0; i < 10000; i++) {
    String s = "hello";
}
long end = System.nanoTime();
// 耗时：约 0.1ms（几乎无开销）

// new：每次创建对象
start = System.nanoTime();
for (int i = 0; i < 10000; i++) {
    String s = new String("hello");
}
end = System.nanoTime();
// 耗时：约 5ms（有对象创建开销）
```

#### 常见误区

**误区 1：认为 new 总是创建 2 个对象**
```java
// 如果常量池已有 "hello"（如前面用过字面量）
String s1 = "hello";          // 常量池已有
String s2 = new String("hello");  // 只创建 1 个对象（堆中）
```

**误区 2：认为 new 方式更安全**
```java
// ❌ 错误理解：担心字面量被修改
String s = new String("hello");  // 毫无必要

// ✓ String 不可变，字面量完全安全
String s = "hello";  // 推荐
```

**误区 3：使用 new 避免常量池**
```java
// ❌ 即使用 new，字面量仍会进常量池
String s = new String("hello");  // "hello" 仍在常量池

// ✓ 如果真的想避免常量池
char[] chars = {'h', 'e', 'l', 'l', 'o'};
String s = new String(chars);  // 不会产生常量池字符串
```

#### 何时使用 new String()？

**几乎不需要使用 new String("...")**，极少数场景：

1. **需要独立对象**（非常罕见）
```java
// 某些老旧 API 可能需要不同对象实例
String s1 = new String("data");
String s2 = new String("data");
// s1 和 s2 是不同对象，intern() 前 s1 != s2
```

2. **字符数组构造**（这是合理用法）
```java
char[] chars = getCharArrayFromSomewhere();
String s = new String(chars);  // 合理：从字符数组创建
```

3. **解码字节数组**（这是合理用法）
```java
byte[] bytes = readBytesFromFile();
String s = new String(bytes, StandardCharsets.UTF_8);  // 合理
```

**推荐做法**：
```java
// ✓ 99.9% 的情况使用字面量
String s = "hello";

// ✓ 动态构建用 StringBuilder
String s = new StringBuilder().append("hel").append("lo").toString();

// ✗ 避免 new String("字面量")
String s = new String("hello");  // 不推荐！
```

#### 关键要点

1. **对象创建数量**
   - 字面量：1 个（常量池）
   - new：1~2 个（取决于常量池是否已存在）

2. **内存位置**
   - 字面量：直接在常量池
   - new：堆中新对象，引用常量池内容

3. **性能差异**
   - 字面量：快，无对象创建开销
   - new：慢，需要分配堆内存

4. **复用性**
   - 字面量：自动复用，节省内存
   - new：每次创建新对象，浪费内存

5. **最佳实践**
   - **优先使用字面量**：`String s = "hello"`
   - **避免 new String("字面量")**：毫无必要
   - **new 用于构造**：`new String(char[])` 或 `new String(byte[])`

### 14. 如何判断两个字符串是否相等？

判断字符串相等有多种方法，但**推荐使用 `equals()` 方法**。不同方法的适用场景和注意事项各不相同。

#### 核心方法对比

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">字符串比较方法</text>
  <rect x="50" y="70" width="220" height="140" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="160" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#2E7D32">equals()</text>
  <text x="60" y="120" font-size="11" text-anchor="start" fill="#333">str1.equals(str2)</text>
  <text x="60" y="145" font-size="10" text-anchor="start" fill="#2E7D32">✓ 比较内容</text>
  <text x="60" y="165" font-size="10" text-anchor="start" fill="#2E7D32">✓ 最常用</text>
  <text x="60" y="185" font-size="10" text-anchor="start" fill="#C62828">✗ 需判空</text>
  <rect x="290" y="70" width="220" height="140" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="400" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#1565C0">equalsIgnoreCase()</text>
  <text x="300" y="120" font-size="11" text-anchor="start" fill="#333">str1.equalsIgnoreCase(str2)</text>
  <text x="300" y="145" font-size="10" text-anchor="start" fill="#1565C0">✓ 忽略大小写</text>
  <text x="300" y="165" font-size="10" text-anchor="start" fill="#1565C0">✓ 适合用户输入</text>
  <text x="300" y="185" font-size="10" text-anchor="start" fill="#C62828">✗ 需判空</text>
  <rect x="530" y="70" width="220" height="140" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="640" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#E65100">Objects.equals()</text>
  <text x="540" y="120" font-size="11" text-anchor="start" fill="#333">Objects.equals(str1, str2)</text>
  <text x="540" y="145" font-size="10" text-anchor="start" fill="#E65100">✓ 自动处理 null</text>
  <text x="540" y="165" font-size="10" text-anchor="start" fill="#E65100">✓ 最安全</text>
  <text x="540" y="185" font-size="10" text-anchor="start" fill="#2E7D32">✓ 推荐使用</text>
  <rect x="50" y="230" width="220" height="140" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="160" y="255" font-size="14" font-weight="bold" text-anchor="middle" fill="#C62828">== 运算符</text>
  <text x="60" y="280" font-size="11" text-anchor="start" fill="#333">str1 == str2</text>
  <text x="60" y="305" font-size="10" text-anchor="start" fill="#C62828">✗ 比较引用</text>
  <text x="60" y="325" font-size="10" text-anchor="start" fill="#C62828">✗ 不比较内容</text>
  <text x="60" y="345" font-size="10" text-anchor="start" fill="#C62828">✗ 避免使用</text>
  <rect x="290" y="230" width="220" height="140" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
  <text x="400" y="255" font-size="14" font-weight="bold" text-anchor="middle" fill="#6A1B9A">compareTo()</text>
  <text x="300" y="280" font-size="11" text-anchor="start" fill="#333">str1.compareTo(str2)</text>
  <text x="300" y="305" font-size="10" text-anchor="start" fill="#6A1B9A">✓ 字典序比较</text>
  <text x="300" y="325" font-size="10" text-anchor="start" fill="#6A1B9A">✓ 排序场景</text>
  <text x="300" y="345" font-size="10" text-anchor="start" fill="#666">返回 int 值</text>
  <rect x="530" y="230" width="220" height="140" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
  <text x="640" y="255" font-size="14" font-weight="bold" text-anchor="middle" fill="#00695C">contentEquals()</text>
  <text x="540" y="280" font-size="11" text-anchor="start" fill="#333">str1.contentEquals(str2)</text>
  <text x="540" y="305" font-size="10" text-anchor="start" fill="#00695C">✓ 比较 CharSequence</text>
  <text x="540" y="325" font-size="10" text-anchor="start" fill="#00695C">✓ 灵活性高</text>
  <text x="540" y="345" font-size="10" text-anchor="start" fill="#666">少用</text>
</svg>

#### 详细说明

**1. equals() - 标准比较方法**

最常用的字符串内容比较方法：

```java
String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");

s1.equals(s2);  // true
s1.equals(s3);  // true
```

**注意事项**：
- 调用方可能为 null，导致 NullPointerException
- 区分大小写
- 推荐常量在前：`"expected".equals(actual)` 避免空指针

**2. equalsIgnoreCase() - 忽略大小写**

适合用户输入、配置项等不区分大小写的场景：

```java
String s1 = "Hello";
String s2 = "hello";

s1.equals(s2);              // false
s1.equalsIgnoreCase(s2);    // true
```

**3. Objects.equals() - 最安全（推荐）**

JDK 7 引入，自动处理 null 情况：

```java
String s1 = null;
String s2 = "hello";

// s1.equals(s2);           // NullPointerException!
Objects.equals(s1, s2);     // false，安全

Objects.equals(null, null); // true
Objects.equals("a", "a");   // true
```

**源码实现**：
```java
public static boolean equals(Object a, Object b) {
    return (a == b) || (a != null && a.equals(b));
}
```

**4. == 运算符 - 比较引用（避免）**

比较的是对象引用，不是内容：

```java
String s1 = new String("hello");
String s2 = new String("hello");

s1 == s2;        // false（不同对象）
s1.equals(s2);   // true（内容相同）
```

**唯一适用场景**：检查是否为同一对象实例（很少需要）

**5. compareTo() - 字典序比较**

返回 int 值，用于排序：

```java
String s1 = "abc";
String s2 = "abd";

s1.compareTo(s2);  // 负数（s1 < s2）
s2.compareTo(s1);  // 正数（s2 > s1）
s1.compareTo("abc"); // 0（相等）
```

**6. contentEquals() - 比较 CharSequence**

可以比较 String、StringBuilder、StringBuffer 等：

```java
String s = "hello";
StringBuilder sb = new StringBuilder("hello");

s.contentEquals(sb);  // true
```

#### 最佳实践

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">字符串比较最佳实践</text>
  <rect x="50" y="60" width="700" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="70" y="85" font-size="13" font-weight="bold" text-anchor="start" fill="#2E7D32">✓ 推荐做法</text>
  <text x="70" y="105" font-size="11" text-anchor="start" fill="#333">1. 优先使用 Objects.equals(str1, str2) - 最安全</text>
  <text x="70" y="125" font-size="11" text-anchor="start" fill="#333">2. 常量在前：'expected'.equals(variable) - 避免 NPE</text>
  <rect x="50" y="150" width="700" height="100" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="70" y="175" font-size="13" font-weight="bold" text-anchor="start" fill="#C62828">✗ 避免做法</text>
  <text x="70" y="195" font-size="11" text-anchor="start" fill="#333">1. 不要用 == 比较字符串内容</text>
  <text x="70" y="215" font-size="11" text-anchor="start" fill="#333">2. 不要忘记判空：if (str != null && str.equals(...))</text>
  <text x="70" y="235" font-size="11" text-anchor="start" fill="#333">3. 注意大小写：根据业务需求选择 equals() 或 equalsIgnoreCase()</text>
  <rect x="50" y="260" width="700" height="80" fill="#FFF9E6" stroke="#FFC107" stroke-width="2" rx="5"/>
  <text x="70" y="285" font-size="13" font-weight="bold" text-anchor="start" fill="#F57C00">💡 特殊场景</text>
  <text x="70" y="305" font-size="11" text-anchor="start" fill="#333">• 排序场景：使用 compareTo() 或 Comparator</text>
  <text x="70" y="325" font-size="11" text-anchor="start" fill="#333">• 性能要求极高：先用 == 快速判断，再用 equals()</text>
</svg>

#### 关键要点

1. **标准比较**
   - 首选 `Objects.equals()`（自动处理 null）
   - 或使用常量在前的 `"constant".equals(variable)`

2. **null 安全**
   - `Objects.equals()` 最安全
   - 避免 `variable.equals("constant")`（可能 NPE）

3. **大小写处理**
   - 区分大小写：`equals()`
   - 不区分大小写：`equalsIgnoreCase()`

4. **避免误区**
   - 永远不要用 `==` 比较字符串内容
   - 记住 String 是对象，不是基本类型

5. **性能优化**
   - `equals()` 内部已优化（先比较引用，再比较内容）
   - 大量比较考虑先用 `==` 快速过滤

### 15. String 的常用方法有哪些？

String 类提供了丰富的方法用于字符串操作，可以分为**长度与检查、查找与判断、截取与拆分、转换与替换、比较与其他**五大类。

#### 方法分类总览

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">String 常用方法分类</text>
  <circle cx="400" cy="225" r="60" fill="#FFF9E6" stroke="#FFC107" stroke-width="3"/>
  <text x="400" y="220" font-size="13" font-weight="bold" text-anchor="middle" fill="#F57C00">String</text>
  <text x="400" y="240" font-size="11" text-anchor="middle" fill="#F57C00">常用方法</text>
  <rect x="50" y="80" width="180" height="120" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="140" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#1565C0">长度与检查</text>
  <text x="60" y="130" font-size="10" text-anchor="start" fill="#333">• length()</text>
  <text x="60" y="150" font-size="10" text-anchor="start" fill="#333">• isEmpty()</text>
  <text x="60" y="170" font-size="10" text-anchor="start" fill="#333">• isBlank()</text>
  <text x="60" y="190" font-size="10" text-anchor="start" fill="#333">• charAt()</text>
  <path d="M 230 140 L 350 200" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow15)"/>
  <rect x="570" y="80" width="180" height="120" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="660" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#2E7D32">查找与判断</text>
  <text x="580" y="130" font-size="10" text-anchor="start" fill="#333">• indexOf()</text>
  <text x="580" y="150" font-size="10" text-anchor="start" fill="#333">• lastIndexOf()</text>
  <text x="580" y="170" font-size="10" text-anchor="start" fill="#333">• contains()</text>
  <text x="580" y="190" font-size="10" text-anchor="start" fill="#333">• startsWith() / endsWith()</text>
  <path d="M 570 140 L 450 200" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow16)"/>
  <rect x="50" y="250" width="180" height="120" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="140" y="275" font-size="13" font-weight="bold" text-anchor="middle" fill="#E65100">截取与拆分</text>
  <text x="60" y="300" font-size="10" text-anchor="start" fill="#333">• substring()</text>
  <text x="60" y="320" font-size="10" text-anchor="start" fill="#333">• split()</text>
  <text x="60" y="340" font-size="10" text-anchor="start" fill="#333">• trim() / strip()</text>
  <path d="M 230 310 L 350 270" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow17)"/>
  <rect x="310" y="270" width="180" height="120" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
  <text x="400" y="295" font-size="13" font-weight="bold" text-anchor="middle" fill="#6A1B9A">转换与替换</text>
  <text x="320" y="320" font-size="10" text-anchor="start" fill="#333">• toUpperCase() / toLowerCase()</text>
  <text x="320" y="340" font-size="10" text-anchor="start" fill="#333">• replace() / replaceAll()</text>
  <text x="320" y="360" font-size="10" text-anchor="start" fill="#333">• concat() / join()</text>
  <rect x="570" y="250" width="180" height="120" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="660" y="275" font-size="13" font-weight="bold" text-anchor="middle" fill="#C62828">比较与其他</text>
  <text x="580" y="300" font-size="10" text-anchor="start" fill="#333">• equals() / equalsIgnoreCase()</text>
  <text x="580" y="320" font-size="10" text-anchor="start" fill="#333">• compareTo()</text>
  <text x="580" y="340" font-size="10" text-anchor="start" fill="#333">• matches() / format()</text>
  <path d="M 570 310 L 450 250" stroke="#F44336" stroke-width="2" marker-end="url(#arrow18)"/>
  <defs>
    <marker id="arrow15" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#2196F3"/></marker>
    <marker id="arrow16" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#4CAF50"/></marker>
    <marker id="arrow17" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#FF9800"/></marker>
    <marker id="arrow18" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#F44336"/></marker>
  </defs>
</svg>

#### 详细方法说明

**1. 长度与检查**

| 方法 | 说明 | 示例 |
|------|------|------|
| `length()` | 返回字符串长度 | `"hello".length()` → 5 |
| `isEmpty()` | 判断是否为空串（长度为0） | `"".isEmpty()` → true |
| `isBlank()` | 判断是否为空白（JDK 11+） | `"  ".isBlank()` → true |
| `charAt(int)` | 获取指定位置字符 | `"hello".charAt(1)` → 'e' |

**2. 查找与判断**

| 方法 | 说明 | 示例 |
|------|------|------|
| `indexOf(String)` | 查找子串首次出现位置 | `"hello".indexOf("l")` → 2 |
| `lastIndexOf(String)` | 查找子串最后出现位置 | `"hello".lastIndexOf("l")` → 3 |
| `contains(String)` | 判断是否包含子串 | `"hello".contains("ell")` → true |
| `startsWith(String)` | 判断是否以指定前缀开始 | `"hello".startsWith("he")` → true |
| `endsWith(String)` | 判断是否以指定后缀结束 | `"hello".endsWith("lo")` → true |

**3. 截取与拆分**

| 方法 | 说明 | 示例 |
|------|------|------|
| `substring(int)` | 从指定位置截取到末尾 | `"hello".substring(2)` → "llo" |
| `substring(int, int)` | 截取指定范围 | `"hello".substring(1, 4)` → "ell" |
| `split(String)` | 按正则拆分为数组 | `"a,b,c".split(",")` → ["a","b","c"] |
| `trim()` | 去除首尾空格 | `" hello ".trim()` → "hello" |
| `strip()` | 去除首尾空白（JDK 11+） | `" hello ".strip()` → "hello" |

**4. 转换与替换**

| 方法 | 说明 | 示例 |
|------|------|------|
| `toUpperCase()` | 转大写 | `"hello".toUpperCase()` → "HELLO" |
| `toLowerCase()` | 转小写 | `"HELLO".toLowerCase()` → "hello" |
| `replace(char, char)` | 替换字符 | `"hello".replace('l', 'r')` → "herro" |
| `replace(String, String)` | 替换子串 | `"hello".replace("ll", "rr")` → "herro" |
| `replaceAll(String, String)` | 正则替换 | `"a1b2".replaceAll("\\d", "")` → "ab" |
| `concat(String)` | 拼接字符串 | `"hello".concat(" world")` → "hello world" |
| `join(CharSequence, CharSequence...)` | 静态方法，连接多个字符串 | `String.join("-", "a", "b")` → "a-b" |

**5. 比较与其他**

| 方法 | 说明 | 示例 |
|------|------|------|
| `equals(Object)` | 比较内容是否相等 | `"a".equals("a")` → true |
| `equalsIgnoreCase(String)` | 忽略大小写比较 | `"A".equalsIgnoreCase("a")` → true |
| `compareTo(String)` | 字典序比较 | `"a".compareTo("b")` → -1 |
| `matches(String)` | 正则匹配 | `"123".matches("\\d+")` → true |
| `format(String, Object...)` | 格式化字符串 | `String.format("%s-%d", "id", 1)` → "id-1" |
| `valueOf(...)` | 静态方法，转换为字符串 | `String.valueOf(123)` → "123" |

#### 常见使用场景

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">String 方法使用场景</text>
  <rect x="50" y="60" width="340" height="150" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="220" y="85" font-size="13" font-weight="bold" text-anchor="middle" fill="#2E7D32">字符串验证</text>
  <text x="60" y="110" font-size="11" text-anchor="start" fill="#333">• 判空：isEmpty() / isBlank()</text>
  <text x="60" y="130" font-size="11" text-anchor="start" fill="#333">• 格式检查：matches(正则)</text>
  <text x="60" y="150" font-size="11" text-anchor="start" fill="#333">• 前后缀验证：startsWith() / endsWith()</text>
  <text x="60" y="170" font-size="11" text-anchor="start" fill="#333">• 包含关系：contains()</text>
  <text x="60" y="190" font-size="11" text-anchor="start" fill="#333">示例：邮箱、手机号、URL 验证</text>
  <rect x="410" y="60" width="340" height="150" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="580" y="85" font-size="13" font-weight="bold" text-anchor="middle" fill="#1565C0">数据处理</text>
  <text x="420" y="110" font-size="11" text-anchor="start" fill="#333">• 解析分隔数据：split()</text>
  <text x="420" y="130" font-size="11" text-anchor="start" fill="#333">• 提取子串：substring()</text>
  <text x="420" y="150" font-size="11" text-anchor="start" fill="#333">• 去除空白：trim() / strip()</text>
  <text x="420" y="170" font-size="11" text-anchor="start" fill="#333">• 大小写转换：toUpperCase() / toLowerCase()</text>
  <text x="420" y="190" font-size="11" text-anchor="start" fill="#333">示例：CSV 解析、日志处理</text>
  <rect x="50" y="230" width="340" height="150" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="220" y="255" font-size="13" font-weight="bold" text-anchor="middle" fill="#E65100">文本替换</text>
  <text x="60" y="280" font-size="11" text-anchor="start" fill="#333">• 简单替换：replace()</text>
  <text x="60" y="300" font-size="11" text-anchor="start" fill="#333">• 正则替换：replaceAll() / replaceFirst()</text>
  <text x="60" y="320" font-size="11" text-anchor="start" fill="#333">• 字符串拼接：concat() / join()</text>
  <text x="60" y="340" font-size="11" text-anchor="start" fill="#333">示例：敏感词过滤、模板替换</text>
  <rect x="410" y="230" width="340" height="150" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
  <text x="580" y="255" font-size="13" font-weight="bold" text-anchor="middle" fill="#6A1B9A">搜索定位</text>
  <text x="420" y="280" font-size="11" text-anchor="start" fill="#333">• 查找位置：indexOf() / lastIndexOf()</text>
  <text x="420" y="300" font-size="11" text-anchor="start" fill="#333">• 获取字符：charAt()</text>
  <text x="420" y="320" font-size="11" text-anchor="start" fill="#333">• 比较排序：compareTo()</text>
  <text x="420" y="340" font-size="11" text-anchor="start" fill="#333">示例：关键词搜索、排序算法</text>
</svg>

#### 关键要点

1. **字符串不可变**
   - 所有方法都返回新字符串，不修改原字符串
   - 频繁修改使用 StringBuilder

2. **索引从 0 开始**
   - `charAt(0)` 获取第一个字符
   - `substring(0, 3)` 截取前 3 个字符（不含索引 3）

3. **null 安全**
   - 方法调用前需判空
   - 或使用 `Objects.equals()` / `Optional`

4. **性能考虑**
   - `split()` 使用正则，性能较低
   - 大量拼接避免使用 `+` 或 `concat()`

5. **JDK 版本差异**
   - `isBlank()`, `strip()` 等方法需 JDK 11+
   - `repeat()`, `lines()` 等方法需 JDK 11+
