# Java 基础面试题

## 数据类型

### 1. Java 的基本数据类型有哪些？各占多少字节？

Java 有 **8 种基本数据类型**，可以记忆为"字节短整长，单双布字符"（byte, short, int, long, float, double, boolean, char）。

#### 数据类型表格

| 类型 | 字节数 | 位数 | 取值范围 | 默认值 | 包装类 |
|------|--------|------|----------|--------|--------|
| byte | 1 | 8 | -128 ~ 127 | 0 | Byte |
| short | 2 | 16 | -32,768 ~ 32,767 | 0 | Short |
| int | 4 | 32 | -2³¹ ~ 2³¹-1 | 0 | Integer |
| long | 8 | 64 | -2⁶³ ~ 2⁶³-1 | 0L | Long |
| float | 4 | 32 | 约 ±3.4E38 (IEEE 754) | 0.0f | Float |
| double | 8 | 64 | 约 ±1.8E308 (IEEE 754) | 0.0d | Double |
| boolean | - | - | true / false | false | Boolean |
| char | 2 | 16 | 0 ~ 65,535 (Unicode) | '\u0000' | Character |

#### 记忆技巧

**整数类型**（从小到大）：
- byte（1字节）→ short（2字节）→ int（4字节）→ long（8字节）
- 记忆口诀：**1、2、4、8 翻倍增长**

**浮点类型**：
- float（4字节）→ double（8字节）
- 记忆：double 是"双倍精度"，所以字节数也是 float 的两倍

**特殊类型**：
- char：2字节（支持 Unicode 字符集）
- boolean：理论上只需 1 位，但 JVM 实现中通常占用 1 字节

#### 可视化内存占用

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <!-- Title -->
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">Java 基本数据类型内存占用</text>

  <!-- byte: 1 byte -->
  <rect x="50" y="60" width="40" height="40" fill="#FF6B6B" stroke="#333" stroke-width="2"/>
  <text x="70" y="85" font-size="14" font-weight="bold" text-anchor="middle" fill="white">byte</text>
  <text x="70" y="120" font-size="12" text-anchor="middle" fill="#333">1 字节</text>

  <!-- short: 2 bytes -->
  <rect x="130" y="60" width="80" height="40" fill="#4ECDC4" stroke="#333" stroke-width="2"/>
  <text x="170" y="85" font-size="14" font-weight="bold" text-anchor="middle" fill="white">short</text>
  <text x="170" y="120" font-size="12" text-anchor="middle" fill="#333">2 字节</text>

  <!-- int: 4 bytes -->
  <rect x="250" y="60" width="160" height="40" fill="#95E1D3" stroke="#333" stroke-width="2"/>
  <text x="330" y="85" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">int</text>
  <text x="330" y="120" font-size="12" text-anchor="middle" fill="#333">4 字节</text>

  <!-- long: 8 bytes -->
  <rect x="450" y="60" width="320" height="40" fill="#F38181" stroke="#333" stroke-width="2"/>
  <text x="610" y="85" font-size="14" font-weight="bold" text-anchor="middle" fill="white">long</text>
  <text x="610" y="120" font-size="12" text-anchor="middle" fill="#333">8 字节</text>

  <!-- float: 4 bytes -->
  <rect x="50" y="160" width="160" height="40" fill="#AA96DA" stroke="#333" stroke-width="2"/>
  <text x="130" y="185" font-size="14" font-weight="bold" text-anchor="middle" fill="white">float</text>
  <text x="130" y="220" font-size="12" text-anchor="middle" fill="#333">4 字节</text>

  <!-- double: 8 bytes -->
  <rect x="250" y="160" width="320" height="40" fill="#FCBAD3" stroke="#333" stroke-width="2"/>
  <text x="410" y="185" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">double</text>
  <text x="410" y="220" font-size="12" text-anchor="middle" fill="#333">8 字节</text>

  <!-- char: 2 bytes -->
  <rect x="610" y="160" width="80" height="40" fill="#FFFFD2" stroke="#333" stroke-width="2"/>
  <text x="650" y="185" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">char</text>
  <text x="650" y="220" font-size="12" text-anchor="middle" fill="#333">2 字节</text>

  <!-- boolean: special -->
  <rect x="50" y="250" width="60" height="30" fill="#C7CEEA" stroke="#333" stroke-width="2"/>
  <text x="80" y="270" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">boolean</text>
  <text x="150" y="270" font-size="11" text-anchor="start" fill="#666">(JVM 实现相关，通常 1 字节)</text>
</svg>

#### 代码示例

```java
public class PrimitiveTypesDemo {
    public static void main(String[] args) {
        // 整数类型
        byte b = 127;                    // 最大值
        short s = 32767;                 // 最大值
        int i = 2147483647;              // 最大值
        long l = 9223372036854775807L;  // 最大值，注意 L 后缀

        // 浮点类型
        float f = 3.14f;                 // 注意 f 后缀
        double d = 3.14159265359;        // 默认类型

        // 字符类型
        char c = 'A';                    // 单引号
        char unicode = '\u4E2D';         // Unicode: 中

        // 布尔类型
        boolean flag = true;

        // 打印字节数
        System.out.println("byte:    " + Byte.BYTES + " 字节");
        System.out.println("short:   " + Short.BYTES + " 字节");
        System.out.println("int:     " + Integer.BYTES + " 字节");
        System.out.println("long:    " + Long.BYTES + " 字节");
        System.out.println("float:   " + Float.BYTES + " 字节");
        System.out.println("double:  " + Double.BYTES + " 字节");
        System.out.println("char:    " + Character.BYTES + " 字节");
    }
}
```

#### 关键要点

1. **int 是默认整数类型**，long 需要加 `L` 后缀
2. **double 是默认浮点类型**，float 需要加 `f` 后缀
3. **char 使用 Unicode**，可以表示中文等字符
4. **boolean 的大小依赖 JVM 实现**，单独使用通常是 1 字节，在数组中可能是 1 字节
5. **基本类型存储在栈中**（局部变量），速度快且占用空间小

### 2. 自动装箱和拆箱是什么？

**自动装箱（Autoboxing）**和**自动拆箱（Unboxing）**是 Java 5 引入的特性，用于基本类型和包装类型之间的自动转换。

#### 核心概念

- **自动装箱**：基本类型自动转换为对应的包装类型
- **自动拆箱**：包装类型自动转换为对应的基本类型

#### 类型对应关系

| 基本类型 | 包装类型 |
|---------|---------|
| byte | Byte |
| short | Short |
| int | Integer |
| long | Long |
| float | Float |
| double | Double |
| char | Character |
| boolean | Boolean |

#### 装箱和拆箱的本质

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">自动装箱和拆箱过程</text>
  <g id="boxing">
    <rect x="50" y="80" width="150" height="60" fill="#FFE5E5" stroke="#FF6B6B" stroke-width="2" rx="5"/>
    <text x="125" y="105" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">基本类型</text>
    <text x="125" y="125" font-size="16" font-weight="bold" text-anchor="middle" fill="#FF6B6B">int num = 10</text>
    <path d="M 200 110 L 280 110" stroke="#4CAF50" stroke-width="3" fill="none" marker-end="url(#arrowgreen)"/>
    <text x="240" y="100" font-size="12" font-weight="bold" text-anchor="middle" fill="#4CAF50">自动装箱</text>
    <rect x="280" y="80" width="200" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
    <text x="380" y="105" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">包装类型</text>
    <text x="380" y="125" font-size="16" font-weight="bold" text-anchor="middle" fill="#4CAF50">Integer obj = 10</text>
    <text x="380" y="155" font-size="11" text-anchor="middle" fill="#666">Integer.valueOf(10)</text>
  </g>
  <g id="unboxing">
    <rect x="280" y="220" width="200" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
    <text x="380" y="245" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">包装类型</text>
    <text x="380" y="265" font-size="16" font-weight="bold" text-anchor="middle" fill="#4CAF50">Integer obj = 10</text>
    <path d="M 280 250 L 200 250" stroke="#2196F3" stroke-width="3" fill="none" marker-end="url(#arrowblue)"/>
    <text x="240" y="240" font-size="12" font-weight="bold" text-anchor="middle" fill="#2196F3">自动拆箱</text>
    <rect x="50" y="220" width="150" height="60" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
    <text x="125" y="245" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">基本类型</text>
    <text x="125" y="265" font-size="16" font-weight="bold" text-anchor="middle" fill="#2196F3">int num = obj</text>
    <text x="125" y="295" font-size="11" text-anchor="middle" fill="#666">obj.intValue()</text>
  </g>
  <defs>
    <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#4CAF50"/>
    </marker>
    <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#2196F3"/>
    </marker>
  </defs>
  <rect x="520" y="80" width="250" height="220" fill="#FFF9E6" stroke="#FFC107" stroke-width="2" rx="5"/>
  <text x="645" y="105" font-size="14" font-weight="bold" text-anchor="middle" fill="#F57C00">⚠️ 注意事项</text>
  <text x="530" y="135" font-size="12" text-anchor="start" fill="#333">1. 装箱可能创建新对象</text>
  <text x="545" y="155" font-size="11" text-anchor="start" fill="#666">→ 影响性能</text>
  <text x="530" y="180" font-size="12" text-anchor="start" fill="#333">2. 拆箱前需判空</text>
  <text x="545" y="200" font-size="11" text-anchor="start" fill="#666">→ 避免 NullPointerException</text>
  <text x="530" y="225" font-size="12" text-anchor="start" fill="#333">3. 频繁装拆箱影响性能</text>
  <text x="545" y="245" font-size="11" text-anchor="start" fill="#666">→ 尽量使用基本类型</text>
  <text x="530" y="270" font-size="12" text-anchor="start" fill="#333">4. 注意缓存范围</text>
  <text x="545" y="290" font-size="11" text-anchor="start" fill="#666">→ Integer 缓存 -128~127</text>
</svg>

#### 代码示例

```java
public class AutoBoxingDemo {
    public static void main(String[] args) {
        // ============ 自动装箱 ============
        // 编译前：Integer obj = 10;
        // 编译后：Integer obj = Integer.valueOf(10);
        Integer obj = 10;

        // ============ 自动拆箱 ============
        // 编译前：int num = obj;
        // 编译后：int num = obj.intValue();
        int num = obj;

        // ============ 隐式的装箱拆箱 ============
        // 1. 方法参数
        printInteger(100);  // 自动装箱

        // 2. 集合操作
        List<Integer> list = new ArrayList<>();
        list.add(1);        // 自动装箱
        int value = list.get(0);  // 自动拆箱

        // 3. 运算操作
        Integer a = 10;
        Integer b = 20;
        int sum = a + b;    // 先拆箱，再运算

        // ============ 常见陷阱 ============
        // 陷阱1：空指针异常
        Integer nullValue = null;
        // int n = nullValue;  // NullPointerException!

        // 陷阱2：性能问题
        Integer sumSlow = 0;
        for (int i = 0; i < 1000; i++) {
            sumSlow += i;  // 每次循环都装箱拆箱！
        }

        // 正确做法：使用基本类型
        int sumFast = 0;
        for (int i = 0; i < 1000; i++) {
            sumFast += i;  // 无装箱拆箱
        }

        // 陷阱3：相等性比较
        Integer x = 128;
        Integer y = 128;
        System.out.println(x == y);      // false (超出缓存范围)
        System.out.println(x.equals(y)); // true (正确比较方式)
    }

    static void printInteger(Integer num) {
        System.out.println(num);
    }
}
```

#### 底层原理

**装箱过程**（以 Integer 为例）：
```java
// 源代码
Integer i = 10;

// 编译后等价于
Integer i = Integer.valueOf(10);
```

**拆箱过程**：
```java
// 源代码
int n = i;

// 编译后等价于
int n = i.intValue();
```

#### 关键要点

1. **自动装箱会调用 `valueOf()` 方法**
   - 可能使用缓存（如 Integer 缓存 -128~127）
   - 可能创建新对象

2. **自动拆箱会调用 `xxxValue()` 方法**
   - intValue(), doubleValue() 等
   - **拆箱前必须判空**，否则抛出 NullPointerException

3. **性能考虑**
   - 装箱拆箱有性能开销
   - 循环中避免频繁装拆箱
   - 优先使用基本类型

4. **相等性比较**
   - 包装类型用 `equals()` 比较值
   - `==` 比较的是对象引用

5. **适用场景**
   - 集合框架（只能存对象）
   - 泛型（需要类型参数）
   - 需要 null 值表示"无值"的情况

### 3. Integer 缓存机制？

Integer 类内部维护了一个**缓存池**，对于 **-128 到 127** 之间的整数，会复用缓存对象而不是创建新对象。这是一种常见的**享元模式**优化。

#### 为什么要有缓存？

1. **节省内存**：避免重复创建相同值的对象
2. **提高性能**：直接返回缓存对象，无需 new
3. **常用数值优化**：小整数在程序中使用频率高

#### 缓存机制演示

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">Integer 缓存机制</text>
  <rect x="50" y="60" width="700" height="180" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="400" y="85" font-size="16" font-weight="bold" text-anchor="middle" fill="#1976D2">缓存区间：-128 ~ 127</text>
  <text x="80" y="115" font-size="13" text-anchor="start" fill="#333">Integer a = 127;</text>
  <text x="80" y="135" font-size="13" text-anchor="start" fill="#333">Integer b = 127;</text>
  <text x="80" y="165" font-size="14" font-weight="bold" text-anchor="start" fill="#4CAF50">✓ a == b  →  true</text>
  <text x="80" y="185" font-size="12" text-anchor="start" fill="#666">（使用缓存，指向同一对象）</text>
  <rect x="420" y="100" width="300" height="130" fill="#FFF9E6" stroke="#FFC107" stroke-width="2" rx="5"/>
  <text x="570" y="125" font-size="13" font-weight="bold" text-anchor="middle" fill="#F57C00">内存示意</text>
  <rect x="440" y="140" width="120" height="30" fill="#81C784" stroke="#4CAF50" stroke-width="2"/>
  <text x="500" y="160" font-size="12" text-anchor="middle" fill="white">Integer(127)</text>
  <path d="M 250 125 L 440 155" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow1)"/>
  <text x="350" y="135" font-size="11" fill="#4CAF50">a 和 b 都指向</text>
  <rect x="50" y="270" width="700" height="160" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="400" y="295" font-size="16" font-weight="bold" text-anchor="middle" fill="#C62828">非缓存区间：超出 -128 ~ 127</text>
  <text x="80" y="325" font-size="13" text-anchor="start" fill="#333">Integer c = 128;</text>
  <text x="80" y="345" font-size="13" text-anchor="start" fill="#333">Integer d = 128;</text>
  <text x="80" y="375" font-size="14" font-weight="bold" text-anchor="start" fill="#F44336">✗ c == d  →  false</text>
  <text x="80" y="395" font-size="12" text-anchor="start" fill="#666">（创建新对象，不同引用）</text>
  <rect x="420" y="310" width="300" height="110" fill="#FFF9E6" stroke="#FFC107" stroke-width="2" rx="5"/>
  <text x="570" y="335" font-size="13" font-weight="bold" text-anchor="middle" fill="#F57C00">内存示意</text>
  <rect x="440" y="350" width="120" height="30" fill="#E57373" stroke="#F44336" stroke-width="2"/>
  <text x="500" y="370" font-size="12" text-anchor="middle" fill="white">Integer(128)</text>
  <rect x="580" y="350" width="120" height="30" fill="#E57373" stroke="#F44336" stroke-width="2"/>
  <text x="640" y="370" font-size="12" text-anchor="middle" fill="white">Integer(128)</text>
  <path d="M 250 335 L 440 365" stroke="#F44336" stroke-width="2" marker-end="url(#arrow2)"/>
  <path d="M 250 355 L 580 365" stroke="#F44336" stroke-width="2" marker-end="url(#arrow2)"/>
  <text x="350" y="340" font-size="11" fill="#F44336">c</text>
  <text x="350" y="365" font-size="11" fill="#F44336">d</text>
  <defs>
    <marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#4CAF50"/>
    </marker>
    <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#F44336"/>
    </marker>
  </defs>
</svg>

#### 代码示例

```java
public class IntegerCacheDemo {
    public static void main(String[] args) {
        // ============ 缓存范围内（-128 ~ 127）============
        Integer a = 127;
        Integer b = 127;
        System.out.println(a == b);        // true，使用缓存
        System.out.println(a.equals(b));   // true

        Integer x = -128;
        Integer y = -128;
        System.out.println(x == y);        // true，使用缓存

        // ============ 超出缓存范围 ============
        Integer c = 128;
        Integer d = 128;
        System.out.println(c == d);        // false，创建新对象
        System.out.println(c.equals(d));   // true，值相等

        Integer e = -129;
        Integer f = -129;
        System.out.println(e == f);        // false，超出下界

        // ============ 手动装箱 vs 自动装箱 ============
        Integer g = new Integer(100);      // 强制创建新对象
        Integer h = 100;                   // 使用缓存
        System.out.println(g == h);        // false

        // ============ valueOf() 显式调用 ============
        Integer i = Integer.valueOf(100);  // 使用缓存
        Integer j = Integer.valueOf(100);
        System.out.println(i == j);        // true
    }
}
```

#### 源码解析

```java
public final class Integer {
    // 缓存数组，存储 -128 到 127 的 Integer 对象
    private static class IntegerCache {
        static final int low = -128;
        static final int high;
        static final Integer cache[];

        static {
            // 默认 high = 127，可通过 JVM 参数调整
            int h = 127;
            String integerCacheHighPropValue =
                VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
            if (integerCacheHighPropValue != null) {
                int i = parseInt(integerCacheHighPropValue);
                i = Math.max(i, 127);
                h = Math.min(i, Integer.MAX_VALUE - 129);
            }
            high = h;

            // 创建缓存数组
            cache = new Integer[(high - low) + 1];
            int j = low;
            for(int k = 0; k < cache.length; k++)
                cache[k] = new Integer(j++);
        }
    }

    // valueOf 方法使用缓存
    public static Integer valueOf(int i) {
        if (i >= IntegerCache.low && i <= IntegerCache.high)
            return IntegerCache.cache[i + (-IntegerCache.low)];
        return new Integer(i);
    }
}
```

#### 其他包装类的缓存

| 包装类型 | 缓存范围 | 说明 |
|---------|---------|------|
| **Byte** | -128 ~ 127 | 全部值都缓存（byte 范围就是 -128~127） |
| **Short** | -128 ~ 127 | 同 Integer |
| **Integer** | -128 ~ 127 | 可通过 JVM 参数调整上限 |
| **Long** | -128 ~ 127 | 同 Integer |
| **Character** | 0 ~ 127 | ASCII 字符范围 |
| **Boolean** | true, false | 只有两个值，都缓存 |
| **Float** | 无缓存 | 浮点数不缓存 |
| **Double** | 无缓存 | 浮点数不缓存 |

#### 调整缓存范围

可以通过 JVM 参数调整 Integer 缓存的**上限**（下限固定为 -128）：

```bash
java -XX:AutoBoxCacheMax=1000 MyApp
# 或
java -Djava.lang.Integer.IntegerCache.high=1000 MyApp
```

#### 关键要点

1. **缓存范围：-128 ~ 127**
   - 这是 Java 规范要求的最小范围
   - Integer 上限可调，但下限固定

2. **valueOf() 使用缓存，new Integer() 不使用**
   - 自动装箱底层调用 valueOf()
   - 手动 new 强制创建新对象（已废弃）

3. **== 比较引用，equals() 比较值**
   - 缓存内：== 返回 true（同一对象）
   - 缓存外：== 返回 false（不同对象）
   - 任何情况：equals() 比较值

4. **为什么是 -128 ~ 127？**
   - 这个范围覆盖了最常用的小整数
   - 一个字节有符号数的范围正好是 -128 ~ 127

5. **面试陷阱**
   ```java
   Integer a = 1000, b = 1000;
   System.out.println(a == b);  // false，新手容易答错！
   ```

### 4. 基本类型和包装类型的区别？

基本类型和包装类型是 Java 中两种不同的数据表示方式，它们在**存储位置、默认值、使用场景**等方面存在显著差异。

#### 核心区别对比

| 对比维度 | 基本类型 | 包装类型 |
|---------|---------|---------|
| **本质** | 原始数据类型 | 对象（引用类型） |
| **存储位置** | 栈内存（局部变量） | 堆内存 |
| **默认值** | 有默认值（如 int 默认 0） | null |
| **比较方式** | 用 == 比较值 | == 比较引用，equals() 比较值 |
| **可否为 null** | 不可以 | 可以 |
| **性能** | 高（直接操作值） | 低（需要对象创建和访问） |
| **泛型支持** | 不支持 | 支持 |
| **集合框架** | 不能直接放入集合 | 可以 |
| **占用空间** | 小（固定字节） | 大（对象头 + 数据） |

#### 内存结构对比

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">基本类型 vs 包装类型 内存结构</text>
  <rect x="50" y="70" width="320" height="320" fill="#E8F5E9" stroke="#4CAF50" stroke-width="3" rx="8"/>
  <text x="210" y="100" font-size="16" font-weight="bold" text-anchor="middle" fill="#2E7D32">基本类型（栈内存）</text>
  <text x="80" y="140" font-size="14" text-anchor="start" fill="#333">int num = 100;</text>
  <rect x="80" y="160" width="240" height="80" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="200" y="185" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">栈帧</text>
  <rect x="100" y="195" width="80" height="30" fill="#81C784" stroke="#388E3C" stroke-width="2"/>
  <text x="140" y="215" font-size="12" text-anchor="middle" fill="white">num</text>
  <rect x="200" y="195" width="100" height="30" fill="#66BB6A" stroke="#388E3C" stroke-width="2"/>
  <text x="250" y="215" font-size="12" text-anchor="middle" fill="white">100</text>
  <text x="200" y="265" font-size="13" text-anchor="middle" fill="#2E7D32">✓ 直接存储值</text>
  <text x="200" y="285" font-size="13" text-anchor="middle" fill="#2E7D32">✓ 访问速度快</text>
  <text x="200" y="305" font-size="13" text-anchor="middle" fill="#2E7D32">✓ 占用空间小（4字节）</text>
  <text x="200" y="325" font-size="13" text-anchor="middle" fill="#2E7D32">✓ 不能为 null</text>
  <rect x="430" y="70" width="320" height="320" fill="#E3F2FD" stroke="#2196F3" stroke-width="3" rx="8"/>
  <text x="590" y="100" font-size="16" font-weight="bold" text-anchor="middle" fill="#1565C0">包装类型（堆内存）</text>
  <text x="460" y="140" font-size="14" text-anchor="start" fill="#333">Integer obj = 100;</text>
  <rect x="460" y="160" width="120" height="60" fill="#BBDEFB" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="520" y="180" font-size="13" font-weight="bold" text-anchor="middle" fill="#0D47A1">栈</text>
  <rect x="470" y="190" width="40" height="20" fill="#64B5F6" stroke="#1976D2" stroke-width="2"/>
  <text x="490" y="205" font-size="11" text-anchor="middle" fill="white">obj</text>
  <rect x="520" y="190" width="50" height="20" fill="#42A5F5" stroke="#1976D2" stroke-width="2"/>
  <text x="545" y="205" font-size="11" text-anchor="middle" fill="white">0x1234</text>
  <path d="M 570 200 Q 600 200, 610 240" stroke="#FF5722" stroke-width="2" fill="none" marker-end="url(#arrow3)"/>
  <rect x="610" y="240" width="120" height="100" fill="#90CAF9" stroke="#1976D2" stroke-width="2" rx="5"/>
  <text x="670" y="260" font-size="13" font-weight="bold" text-anchor="middle" fill="#0D47A1">堆中的对象</text>
  <rect x="625" y="270" width="90" height="25" fill="#1976D2" stroke="#0D47A1" stroke-width="1"/>
  <text x="670" y="287" font-size="11" text-anchor="middle" fill="white">对象头（8字节）</text>
  <rect x="625" y="300" width="90" height="25" fill="#42A5F5" stroke="#1976D2" stroke-width="1"/>
  <text x="670" y="317" font-size="11" text-anchor="middle" fill="white">value: 100</text>
  <text x="590" y="360" font-size="13" text-anchor="middle" fill="#1565C0">✓ 可以为 null</text>
  <text x="590" y="380" font-size="13" text-anchor="middle" fill="#1565C0">✗ 占用空间大（~16字节）</text>
  <defs>
    <marker id="arrow3" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#FF5722"/>
    </marker>
  </defs>
</svg>

#### 代码示例

```java
public class PrimitiveVsWrapperDemo {
    public static void main(String[] args) {
        // ============ 1. 默认值 ============
        int primitive;               // 局部变量必须初始化
        Integer wrapper = null;      // 可以为 null

        // 成员变量的默认值
        class Demo {
            int primitiveField;      // 默认 0
            Integer wrapperField;    // 默认 null
        }

        // ============ 2. 比较方式 ============
        int a = 100;
        int b = 100;
        System.out.println(a == b);  // true，比较值

        Integer x = 100;
        Integer y = 100;
        System.out.println(x == y);  // true，缓存范围内

        Integer m = 1000;
        Integer n = 1000;
        System.out.println(m == n);      // false，不同对象
        System.out.println(m.equals(n)); // true，比较值

        // ============ 3. null 值处理 ============
        Integer nullValue = null;
        // int result = nullValue;  // NullPointerException!

        // 正确做法：判空
        if (nullValue != null) {
            int result = nullValue;
        }

        // ============ 4. 性能差异 ============
        long start, end;

        // 基本类型：快
        start = System.nanoTime();
        int sum1 = 0;
        for (int i = 0; i < 10000000; i++) {
            sum1 += i;
        }
        end = System.nanoTime();
        System.out.println("基本类型耗时: " + (end - start) + "ns");

        // 包装类型：慢（频繁装拆箱）
        start = System.nanoTime();
        Integer sum2 = 0;
        for (int i = 0; i < 10000000; i++) {
            sum2 += i;  // 每次都装拆箱！
        }
        end = System.nanoTime();
        System.out.println("包装类型耗时: " + (end - start) + "ns");

        // ============ 5. 泛型和集合 ============
        // List<int> list1 = new ArrayList<>();  // 编译错误！
        List<Integer> list2 = new ArrayList<>();  // 正确
        list2.add(100);  // 自动装箱

        // ============ 6. 方法重载 ============
        process(100);       // 调用 process(int)
        process(Integer.valueOf(100));  // 调用 process(Integer)
    }

    static void process(int num) {
        System.out.println("基本类型: " + num);
    }

    static void process(Integer num) {
        System.out.println("包装类型: " + num);
    }
}
```

#### 内存占用详解

**基本类型 int**：
- 在栈上直接占用 **4 字节**

**包装类型 Integer**：
- 对象头：8 字节（Mark Word）
- 类型指针：4 字节（压缩指针）或 8 字节（未压缩）
- int value 字段：4 字节
- 对齐填充：可能需要
- **总计约 16 字节**（开启指针压缩）

**性能影响**：
```java
// 1000万次循环
int[] primitiveArray = new int[10000000];     // 约 40 MB
Integer[] wrapperArray = new Integer[10000000]; // 约 160+ MB
```

#### 使用场景选择

**优先使用基本类型的场景**：
1. **局部变量计算**：性能要求高
2. **循环计数器**：避免频繁装拆箱
3. **数组元素**：节省内存
4. **算法实现**：如排序、查找

**必须使用包装类型的场景**：
1. **集合框架**：`List<Integer>` 不能用 `List<int>`
2. **泛型类型参数**：`Optional<Integer>`
3. **需要 null 值**：表示"无值"或"未设置"
4. **反射和注解**：如 `@RequestParam Integer id`
5. **POJO 类属性**：数据库字段可能为 NULL

#### 关键要点

1. **基本类型更高效**
   - 直接存储在栈上，访问速度快
   - 占用空间小，无对象开销
   - 适合大量数值计算

2. **包装类型更灵活**
   - 可以表示 null（"无值"语义）
   - 支持泛型和集合框架
   - 提供实用方法（如 parseInt）

3. **自动装拆箱的代价**
   - 有性能开销
   - 可能导致 NullPointerException
   - 循环中避免隐式装拆箱

4. **比较陷阱**
   ```java
   Integer a = 128, b = 128;
   System.out.println(a == b);  // false！应该用 equals()
   ```

5. **选择原则**
   - 能用基本类型就用基本类型
   - 需要对象特性时才用包装类型
   - 注意装拆箱的性能影响

### 5. 为什么要有包装类型？

Java 设计包装类型是为了解决**基本类型的局限性**，让基本类型能够像对象一样使用，从而支持面向对象的完整体系。

#### 主要原因

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">为什么需要包装类型？</text>
  <circle cx="400" cy="240" r="80" fill="#FFF9E6" stroke="#FFC107" stroke-width="3"/>
  <text x="400" y="235" font-size="14" font-weight="bold" text-anchor="middle" fill="#F57C00">包装类型</text>
  <text x="400" y="255" font-size="12" text-anchor="middle" fill="#F57C00">解决方案</text>
  <rect x="50" y="80" width="200" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="150" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#C62828">1. 泛型需要对象</text>
  <text x="150" y="125" font-size="11" text-anchor="middle" fill="#333">List&lt;int&gt; ❌</text>
  <text x="150" y="145" font-size="11" text-anchor="middle" fill="#4CAF50">List&lt;Integer&gt; ✓</text>
  <rect x="300" y="80" width="200" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="400" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#2E7D32">2. 需要 null 值</text>
  <text x="400" y="125" font-size="11" text-anchor="middle" fill="#333">数据库字段为 NULL</text>
  <text x="400" y="145" font-size="11" text-anchor="middle" fill="#333">表示"未设置"状态</text>
  <rect x="550" y="80" width="200" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="650" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#1565C0">3. 集合框架</text>
  <text x="650" y="125" font-size="11" text-anchor="middle" fill="#333">集合只能存对象</text>
  <text x="650" y="145" font-size="11" text-anchor="middle" fill="#333">HashMap, ArrayList等</text>
  <rect x="50" y="320" width="200" height="80" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
  <text x="150" y="345" font-size="13" font-weight="bold" text-anchor="middle" fill="#6A1B9A">4. 工具方法</text>
  <text x="150" y="365" font-size="11" text-anchor="middle" fill="#333">Integer.parseInt()</text>
  <text x="150" y="385" font-size="11" text-anchor="middle" fill="#333">Double.isNaN()</text>
  <rect x="300" y="320" width="200" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
  <text x="400" y="345" font-size="13" font-weight="bold" text-anchor="middle" fill="#E65100">5. 反射 API</text>
  <text x="400" y="365" font-size="11" text-anchor="middle" fill="#333">Method.invoke()</text>
  <text x="400" y="385" font-size="11" text-anchor="middle" fill="#333">Field.get()</text>
  <rect x="550" y="320" width="200" height="80" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
  <text x="650" y="345" font-size="13" font-weight="bold" text-anchor="middle" fill="#00695C">6. 同步锁</text>
  <text x="650" y="365" font-size="11" text-anchor="middle" fill="#333">synchronized 需要对象</text>
  <text x="650" y="385" font-size="11" text-anchor="middle" fill="#333">基本类型不能作为锁</text>
  <path d="M 150 160 L 350 200" stroke="#666" stroke-width="2" marker-end="url(#arrow4)"/>
  <path d="M 400 160 L 400 200" stroke="#666" stroke-width="2" marker-end="url(#arrow4)"/>
  <path d="M 650 160 L 450 200" stroke="#666" stroke-width="2" marker-end="url(#arrow4)"/>
  <path d="M 150 320 L 350 280" stroke="#666" stroke-width="2" marker-end="url(#arrow4)"/>
  <path d="M 400 320 L 400 280" stroke="#666" stroke-width="2" marker-end="url(#arrow4)"/>
  <path d="M 650 320 L 450 280" stroke="#666" stroke-width="2" marker-end="url(#arrow4)"/>
  <defs>
    <marker id="arrow4" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#666"/>
    </marker>
  </defs>
</svg>

#### 代码示例

```java
public class WhyWrapperDemo {
    public static void main(String[] args) {
        // ============ 1. 泛型需要对象 ============
        // List<int> list = new ArrayList<>();  // 编译错误！
        List<Integer> list = new ArrayList<>();   // 正确

        // ============ 2. null 值表示 ============
        Integer age = null;  // 表示年龄未设置
        // int primitiveAge = null;  // 编译错误！

        // 数据库查询结果可能为 NULL
        Integer count = getCountFromDB();  // 可能返回 null
        if (count != null) {
            System.out.println("Count: " + count);
        }

        // ============ 3. 集合框架 ============
        Map<String, Integer> map = new HashMap<>();
        map.put("score", 100);  // 自动装箱

        Set<Double> set = new HashSet<>();
        set.add(3.14);  // 自动装箱

        // ============ 4. 工具方法 ============
        String str = "123";
        int num = Integer.parseInt(str);  // 字符串转整数
        String binary = Integer.toBinaryString(10);  // 转二进制
        String hex = Integer.toHexString(255);  // 转十六进制

        // 比较方法
        int result = Integer.compare(10, 20);  // -1
        int max = Integer.max(10, 20);  // 20

        // ============ 5. 反射 API ============
        Class<?> clazz = Integer.class;
        Method[] methods = clazz.getMethods();

        // ============ 6. 同步锁 ============
        Integer lock = Integer.valueOf(1);
        synchronized (lock) {  // 基本类型不能作为锁
            // 临界区代码
        }

        // ============ 7. 常量定义 ============
        System.out.println(Integer.MAX_VALUE);  // 2147483647
        System.out.println(Double.POSITIVE_INFINITY);  // Infinity
        System.out.println(Float.NaN);  // NaN
    }

    static Integer getCountFromDB() {
        // 模拟数据库查询，可能返回 null
        return Math.random() > 0.5 ? 100 : null;
    }
}
```

#### 关键要点

1. **统一类型体系**：让基本类型融入 Java 面向对象体系
2. **支持泛型**：泛型只能使用引用类型
3. **表示 null**：基本类型无法表示"无值"状态
4. **提供工具方法**：类型转换、进制转换、比较等
5. **面向对象特性**：继承 Object，可以调用 toString()、hashCode() 等方法

### 6. float 和 double 的区别？如何比较两个浮点数是否相等？

#### float 和 double 的区别

| 特性 | float | double |
|------|-------|--------|
| **字节数** | 4 字节 | 8 字节 |
| **位数** | 32 位 | 64 位 |
| **精度** | 约 7 位有效数字 | 约 15 位有效数字 |
| **范围** | ±3.4E38 | ±1.8E308 |
| **后缀** | f 或 F | d 或 D（可省略） |
| **默认类型** | 不是 | 是（浮点字面量默认 double） |
| **IEEE 标准** | IEEE 754 单精度 | IEEE 754 双精度 |

#### 浮点数精度问题

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">浮点数精度问题示例</text>
  <rect x="50" y="60" width="700" height="120" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
  <text x="400" y="90" font-size="14" font-weight="bold" text-anchor="middle" fill="#C62828">问题：0.1 + 0.2 ≠ 0.3</text>
  <text x="80" y="120" font-size="13" text-anchor="start" fill="#333">double a = 0.1;</text>
  <text x="80" y="140" font-size="13" text-anchor="start" fill="#333">double b = 0.2;</text>
  <text x="80" y="160" font-size="13" text-anchor="start" fill="#333">System.out.println(a + b == 0.3);  // false!</text>
  <text x="400" y="120" font-size="13" text-anchor="middle" fill="#F44336">实际结果：0.30000000000000004</text>
  <text x="400" y="150" font-size="12" text-anchor="middle" fill="#666">原因：二进制无法精确表示 0.1 和 0.2</text>
  <rect x="50" y="200" width="340" height="130" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="220" y="230" font-size="14" font-weight="bold" text-anchor="middle" fill="#2E7D32">✓ 正确比较方法 1：误差范围</text>
  <text x="70" y="260" font-size="12" text-anchor="start" fill="#333">double EPSILON = 1e-9;</text>
  <text x="70" y="280" font-size="12" text-anchor="start" fill="#333">if (Math.abs(a + b - 0.3) &lt; EPSILON) {</text>
  <text x="70" y="300" font-size="12" text-anchor="start" fill="#333">    // 认为相等</text>
  <text x="70" y="320" font-size="12" text-anchor="start" fill="#333">}</text>
  <rect x="410" y="200" width="340" height="130" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
  <text x="580" y="230" font-size="14" font-weight="bold" text-anchor="middle" fill="#1565C0">✓ 正确比较方法 2：BigDecimal</text>
  <text x="430" y="260" font-size="12" text-anchor="start" fill="#333">BigDecimal a = new BigDecimal("0.1");</text>
  <text x="430" y="280" font-size="12" text-anchor="start" fill="#333">BigDecimal b = new BigDecimal("0.2");</text>
  <text x="430" y="300" font-size="12" text-anchor="start" fill="#333">BigDecimal c = new BigDecimal("0.3");</text>
  <text x="430" y="320" font-size="12" text-anchor="start" fill="#333">a.add(b).equals(c)  // true</text>
</svg>

#### 代码示例

```java
public class FloatDoubleDemo {
    public static void main(String[] args) {
        // ============ 1. 基本区别 ============
        float f1 = 3.14f;      // 必须加 f 后缀
        double d1 = 3.14;      // 默认类型，后缀可省略

        // 精度差异
        float f2 = 1234567.1234567f;
        double d2 = 1234567.1234567;
        System.out.println("float:  " + f2);  // 1234567.1 (精度丢失)
        System.out.println("double: " + d2);  // 1234567.1234567

        // ============ 2. 精度问题 ============
        double a = 0.1;
        double b = 0.2;
        System.out.println(a + b);           // 0.30000000000000004
        System.out.println(a + b == 0.3);    // false!

        // ============ 3. 正确的比较方法 ============

        // 方法1：使用误差范围（推荐）
        double EPSILON = 1e-9;  // 误差阈值
        if (Math.abs(a + b - 0.3) < EPSILON) {
            System.out.println("相等（误差范围内）");
        }

        // 方法2：使用 BigDecimal（精确计算）
        BigDecimal bd1 = new BigDecimal("0.1");
        BigDecimal bd2 = new BigDecimal("0.2");
        BigDecimal bd3 = new BigDecimal("0.3");
        System.out.println(bd1.add(bd2).equals(bd3));  // true

        // ============ 4. 特殊值 ============
        double inf = Double.POSITIVE_INFINITY;
        double negInf = Double.NEGATIVE_INFINITY;
        double nan = Double.NaN;

        // NaN 的特殊性
        System.out.println(nan == nan);        // false!
        System.out.println(Double.isNaN(nan)); // true (正确判断方法)

        // 无穷大的运算
        System.out.println(1.0 / 0.0);         // Infinity
        System.out.println(-1.0 / 0.0);        // -Infinity
        System.out.println(0.0 / 0.0);         // NaN

        // ============ 5. 比较工具方法 ============
        double x = 0.1 + 0.2;
        double y = 0.3;

        // 使用 Double.compare()
        int result = Double.compare(x, y);
        System.out.println(result);  // 1 (x > y，因为精度问题)

        // 自定义比较方法
        System.out.println(areEqual(x, y, EPSILON));  // true
    }

    // 自定义浮点数比较方法
    public static boolean areEqual(double a, double b, double epsilon) {
        if (a == b) return true;  // 处理无穷大等特殊情况
        return Math.abs(a - b) < epsilon;
    }
}
```

#### 关键要点

1. **永远不要用 == 直接比较浮点数**
2. **使用误差范围（EPSILON）比较**
3. **金融计算使用 BigDecimal**
4. **注意 NaN 的特殊性**（NaN != NaN）
5. **float 精度不够时使用 double**

### 7. 什么是类型转换？自动类型转换和强制类型转换的区别？

#### 类型转换概念

类型转换是将一种数据类型的值转换为另一种数据类型的过程。Java 支持两种类型转换：**自动（隐式）类型转换**和**强制（显式）类型转换**。

#### 转换规则图

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">Java 类型转换规则</text>
  <text x="400" y="60" font-size="14" font-weight="bold" text-anchor="middle" fill="#4CAF50">自动转换（向上，安全）</text>
  <rect x="50" y="80" width="60" height="40" fill="#FFCDD2" stroke="#F44336" stroke-width="2"/>
  <text x="80" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#B71C1C">byte</text>
  <path d="M 110 100 L 140 100" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrowGreen)"/>
  <rect x="140" y="80" width="60" height="40" fill="#F8BBD0" stroke="#E91E63" stroke-width="2"/>
  <text x="170" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#880E4F">short</text>
  <path d="M 200 100 L 230 100" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrowGreen)"/>
  <rect x="230" y="80" width="60" height="40" fill="#E1BEE7" stroke="#9C27B0" stroke-width="2"/>
  <text x="260" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#4A148C">int</text>
  <path d="M 290 100 L 320 100" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrowGreen)"/>
  <rect x="320" y="80" width="60" height="40" fill="#C5CAE9" stroke="#3F51B5" stroke-width="2"/>
  <text x="350" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#1A237E">long</text>
  <path d="M 380 100 L 410 100" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrowGreen)"/>
  <rect x="410" y="80" width="60" height="40" fill="#B3E5FC" stroke="#03A9F4" stroke-width="2"/>
  <text x="440" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#01579B">float</text>
  <path d="M 470 100 L 500 100" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrowGreen)"/>
  <rect x="500" y="80" width="70" height="40" fill="#B2DFDB" stroke="#009688" stroke-width="2"/>
  <text x="535" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#004D40">double</text>
  <rect x="650" y="80" width="60" height="40" fill="#FFE0B2" stroke="#FF9800" stroke-width="2"/>
  <text x="680" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#E65100">char</text>
  <path d="M 650 100 L 290 100" stroke="#FFB74D" stroke-width="2" stroke-dasharray="5,5"/>
  <text x="470" y="95" font-size="11" text-anchor="middle" fill="#FF9800">char → int</text>
  <text x="400" y="160" font-size="14" font-weight="bold" text-anchor="middle" fill="#F44336">强制转换（向下，可能丢失数据）</text>
  <path d="M 500 120 L 470 150" stroke="#F44336" stroke-width="3" marker-end="url(#arrowRed)"/>
  <path d="M 410 120 L 380 150" stroke="#F44336" stroke-width="3" marker-end="url(#arrowRed)"/>
  <path d="M 320 120 L 290 150" stroke="#F44336" stroke-width="3" marker-end="url(#arrowRed)"/>
  <path d="M 230 120 L 200 150" stroke="#F44336" stroke-width="3" marker-end="url(#arrowRed)"/>
  <path d="M 140 120 L 110 150" stroke="#F44336" stroke-width="3" marker-end="url(#arrowRed)"/>
  <rect x="50" y="200" width="700" height="180" fill="#FFF9E6" stroke="#FFC107" stroke-width="2" rx="5"/>
  <text x="400" y="230" font-size="14" font-weight="bold" text-anchor="middle" fill="#F57C00">转换示例</text>
  <text x="70" y="260" font-size="13" font-weight="bold" text-anchor="start" fill="#4CAF50">自动转换（小→大）：</text>
  <text x="70" y="280" font-size="12" text-anchor="start" fill="#333">int i = 100;</text>
  <text x="70" y="300" font-size="12" text-anchor="start" fill="#333">long l = i;     // 自动转换</text>
  <text x="70" y="320" font-size="12" text-anchor="start" fill="#333">double d = i;   // 自动转换</text>
  <text x="420" y="260" font-size="13" font-weight="bold" text-anchor="start" fill="#F44336">强制转换（大→小）：</text>
  <text x="420" y="280" font-size="12" text-anchor="start" fill="#333">double d = 3.14;</text>
  <text x="420" y="300" font-size="12" text-anchor="start" fill="#333">int i = (int) d;    // 强制转换，结果为 3</text>
  <text x="420" y="320" font-size="12" text-anchor="start" fill="#333">byte b = (byte) 300; // 溢出，结果为 44</text>
  <text x="70" y="350" font-size="12" text-anchor="start" fill="#666">✓ 不需要强制类型转换符</text>
  <text x="70" y="370" font-size="12" text-anchor="start" fill="#666">✓ 不会丢失精度</text>
  <text x="420" y="350" font-size="12" text-anchor="start" fill="#666">✗ 需要强制类型转换符 (type)</text>
  <text x="420" y="370" font-size="12" text-anchor="start" fill="#666">✗ 可能丢失精度或溢出</text>
  <defs>
    <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="4" orient="auto">
      <path d="M0,0 L0,8 L9,4 z" fill="#4CAF50"/>
    </marker>
    <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="4" orient="auto">
      <path d="M0,0 L0,8 L9,4 z" fill="#F44336"/>
    </marker>
  </defs>
</svg>

#### 代码示例

```java
public class TypeConversionDemo {
    public static void main(String[] args) {
        // ============ 自动类型转换（隐式）============
        // 小类型 → 大类型，自动进行
        byte b1 = 10;
        short s1 = b1;    // byte → short
        int i1 = s1;      // short → int
        long l1 = i1;     // int → long
        float f1 = l1;    // long → float
        double d1 = f1;   // float → double

        // char 可以自动转换为 int
        char c1 = 'A';
        int i2 = c1;      // 65 (ASCII 值)

        // ============ 强制类型转换（显式）============
        // 大类型 → 小类型，需要强制转换
        double d2 = 100.99;
        int i3 = (int) d2;        // 100（小数部分丢失）

        // 溢出示例
        int i4 = 300;
        byte b2 = (byte) i4;      // 44（溢出）
        System.out.println("300 转 byte: " + b2);  // 44

        // ============ 表达式中的类型提升 ============
        byte b3 = 10;
        byte b4 = 20;
        // byte b5 = b3 + b4;     // 编译错误！
        byte b5 = (byte)(b3 + b4); // 需要强制转换
        int i5 = b3 + b4;         // 自动提升为 int

        // 混合运算的类型提升
        int i6 = 10;
        double d3 = 20.5;
        double result = i6 + d3;  // int 自动提升为 double

        // ============ 特殊情况 ============
        // 1. 字面量赋值的特殊处理
        byte b6 = 100;            // 合法，虽然 100 是 int 字面量
        // byte b7 = 128;         // 编译错误！超出 byte 范围

        // 2. final 变量的特殊处理
        final int i7 = 100;
        byte b8 = i7;             // 合法，因为 i7 是常量

        // ============ 引用类型转换 ============
        Object obj = "Hello";     // 向上转型（自动）
        String str = (String)obj; // 向下转型（强制）

        // instanceof 检查
        if (obj instanceof String) {
            String s = (String) obj;  // 安全的转换
        }

        // ============ 数据丢失示例 ============
        System.out.println("\n=== 数据丢失示例 ===");
        double d4 = 1234567890.123456789;
        float f2 = (float) d4;
        System.out.println("double: " + d4);  // 1.234567890123457E9
        System.out.println("float:  " + f2);  // 1.23456794E9（精度丢失）

        // 大整数转小整数
        long l2 = 10000000000L;
        int i8 = (int) l2;
        System.out.println("long: " + l2);    // 10000000000
        System.out.println("int:  " + i8);    // 1410065408（溢出）
    }
}
```

#### 关键要点

1. **自动转换条件**
   - 两种类型兼容
   - 目标类型大于源类型
   - 不会丢失信息

2. **强制转换风险**
   - 精度丢失（double → int）
   - 数据溢出（int → byte）
   - 需要显式转换符

3. **表达式类型提升**
   - byte、short、char 运算时自动提升为 int
   - 不同类型混合运算，提升为较大类型

4. **最佳实践**
   - 尽量避免强制类型转换
   - 转换前检查数据范围
   - 使用合适的数据类型

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

## 面向对象

### 16. 面向对象的三大特性？

面向对象编程（Object-Oriented Programming, OOP）的三大基本特性是**封装（Encapsulation）**、**继承（Inheritance）**和**多态（Polymorphism）**。这三者共同构成了 OOP 的基石。

#### 三大特性概览

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">面向对象三大特性</text>
  <rect x="50" y="70" width="220" height="200" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="8"/>
  <text x="160" y="100" font-size="16" font-weight="bold" text-anchor="middle" fill="#1565C0">封装</text>
  <text x="160" y="125" font-size="12" text-anchor="middle" fill="#1976D2">(Encapsulation)</text>
  <path d="M 110 140 L 110 180 L 150 180 L 150 140 Z" fill="#BBDEFB" stroke="#1976D2"/>
  <text x="130" y="165" font-size="11" fill="#0D47A1">数据</text>
  <path d="M 160 140 L 210 160 L 160 180 Z" fill="#90CAF9" stroke="#1976D2"/>
  <text x="180" y="165" font-size="11" fill="#0D47A1">方法</text>
  <text x="160" y="210" font-size="11" text-anchor="middle" fill="#333">隐藏内部，暴露接口</text>
  <text x="160" y="230" font-size="11" text-anchor="middle" fill="#333">保证安全，简化使用</text>

  <rect x="290" y="70" width="220" height="200" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="8"/>
  <text x="400" y="100" font-size="16" font-weight="bold" text-anchor="middle" fill="#2E7D32">继承</text>
  <text x="400" y="125" font-size="12" text-anchor="middle" fill="#388E3C">(Inheritance)</text>
  <rect x="350" y="140" width="100" height="30" fill="#A5D6A7" stroke="#388E3C"/>
  <text x="400" y="160" font-size="11" text-anchor="middle" fill="#1B5E20">父类</text>
  <path d="M 400 170 L 370 200" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <path d="M 400 170 L 430 200" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <rect x="330" y="200" width="80" height="30" fill="#C8E6C9" stroke="#388E3C"/>
  <text x="370" y="220" font-size="11" text-anchor="middle" fill="#1B5E20">子类A</text>
  <rect x="390" y="200" width="80" height="30" fill="#C8E6C9" stroke="#388E3C"/>
  <text x="430" y="220" font-size="11" text-anchor="middle" fill="#1B5E20">子类B</text>
  <text x="400" y="250" font-size="11" text-anchor="middle" fill="#333">代码复用，扩展功能</text>

  <rect x="530" y="70" width="220" height="200" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="8"/>
  <text x="640" y="100" font-size="16" font-weight="bold" text-anchor="middle" fill="#E65100">多态</text>
  <text x="640" y="125" font-size="12" text-anchor="middle" fill="#F57C00">(Polymorphism)</text>
  <text x="640" y="150" font-size="11" text-anchor="middle" fill="#333">父类引用 ref;</text>
  <text x="640" y="170" font-size="11" text-anchor="middle" fill="#333">ref = new 子类A();</text>
  <text x="640" y="190" font-size="11" text-anchor="middle" fill="#333">ref = new 子类B();</text>
  <text x="640" y="210" font-size="11" text-anchor="middle" fill="#333">ref.method();</text>
  <text x="640" y="240" font-size="11" text-anchor="middle" fill="#333">同一接口，多种实现</text>
  <text x="640" y="260" font-size="11" text-anchor="middle" fill="#333">提高灵活性和可扩展性</text>
  <defs>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#4CAF50"/></marker>
  </defs>
</svg>

---

### 1. 封装 (Encapsulation)

**定义**：将对象的**数据（属性）**和**行为（方法）**捆绑在一起，并对数据的访问进行限制，只通过公共的接口（方法）暴露给外部。简单来说，就是**隐藏内部细节，对外提供公共访问方式**。

**生活比喻**：就像一台自动售货机。你只需要知道按哪个按钮（公共接口），就能得到想要的饮料（结果），而不需要关心机器内部复杂的制冷、存储、掉落机制（内部细节）。

<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>.text{font-family:sans-serif;}.title{font-size:18px;font-weight:bold;text-anchor:middle;}.subtitle{font-size:14px;font-weight:bold;text-anchor:middle;}.label{font-size:12px;text-anchor:middle;}.small-label{font-size:10px;text-anchor:middle;}</style>
  </defs>
  <rect x="1" y="1" width="498" height="298" fill="#F7F9FA" stroke="#D0D7DE" stroke-width="1" rx="15" />

  <!-- Main Capsule -->
  <rect x="20" y="50" width="400" height="200" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="20"/>
  <text x="250" y="35" class="title" fill="#1565C0">封装 (Encapsulation)</text>

  <!-- Inner Data Core -->
  <rect x="150" y="80" width="200" height="140" fill="#BBDEFB" stroke="#1976D2" stroke-width="1.5" rx="10"/>
  <text x="250" y="100" class="subtitle" fill="#0D47A1">内部数据 (Private)</text>
  <text x="250" y="130" class="label" fill="#333">- String name</text>
  <text x="250" y="150" class="label" fill="#333">- int age</text>
  <text x="250" y="170" class="label" fill="#333">- double balance</text>
  <text x="250" y="200" class="small-label" fill="#666">(外界无法直接访问)</text>

  <!-- Public Methods (Gates) -->
  <g>
    <rect x="50" y="90" width="80" height="30" fill="#FFFFFF" stroke="#4CAF50" stroke-width="2" rx="5"/>
    <text x="90" y="110" class="label" fill="#2E7D32">+ getName()</text>
    <path d="M130 105 L 150 105" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow)"/>
  </g>
  <g>
    <rect x="50" y="140" width="80" height="30" fill="#FFFFFF" stroke="#4CAF50" stroke-width="2" rx="5"/>
    <text x="90" y="160" class="label" fill="#2E7D32">+ setAge()</text>
    <path d="M130 155 L 150 155" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow)"/>
  </g>
  <g>
    <rect x="50" y="190" width="80" height="30" fill="#FFFFFF" stroke="#4CAF50" stroke-width="2" rx="5"/>
    <text x="90" y="210" class="label" fill="#2E7D32">+ deposit()</text>
    <path d="M130 205 L 150 205" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow)"/>
  </g>
  <text x="90" y="75" class="subtitle" fill="#2E7D32">公共接口 (Public)</text>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#4CAF50" />
    </marker>
  </defs>
</svg>

**代码示例**：
```java
public class Person {
    // 1. 私有化属性，隐藏内部数据
    private String name;
    private int age;

    // 2. 提供公共的 getter/setter 方法作为访问接口
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    // 3. 在方法中可以加入控制逻辑，保证数据安全
    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            System.out.println("年龄不合法！");
        }
    }
}
```

**优点**：
- **安全性**：保护内部数据不被外部随意修改。
- **简化使用**：调用者只需关心公共接口，无需了解复杂实现。
- **高内聚，低耦合**：内部修改不影响外部调用者。

---

### 2. 继承 (Inheritance)

**定义**：允许一个类（子类）**继承**另一个类（父类）的属性和方法。子类可以复用父类的代码，并可以添加自己独有的特性或重写父类的方法。

**生活比喻**：就像生物界的“遗传”。“猫”和“狗”都继承自“动物”类。“动物”有“吃”、“睡”等通用行为，而“猫”有独特的“抓老鼠”行为，“狗”有独特的“看家”行为。

<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
  <rect x="100" y="30" width="200" height="50" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="200" y="50" font-size="14" font-weight="bold" text-anchor="middle" fill="#2E7D32">父类：Animal</text>
  <text x="200" y="70" font-size="11" text-anchor="middle" fill="#388E3C">+ eat()</text>
  <path d="M 200 80 L 150 130" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <path d="M 200 80 L 250 130" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <rect x="80" y="130" width="140" height="70" fill="#C8E6C9" stroke="#66BB6A" stroke-width="2" rx="5"/>
  <text x="150" y="150" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">子类：Dog</text>
  <text x="150" y="170" font-size="11" text-anchor="middle" fill="#333">（继承 eat()）</text>
  <text x="150" y="190" font-size="11" text-anchor="middle" fill="#1B5E20">+ bark()</text>
  <rect x="230" y="130" width="140" height="70" fill="#C8E6C9" stroke="#66BB6A" stroke-width="2" rx="5"/>
  <text x="300" y="150" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">子类：Cat</text>
  <text x="300" y="170" font-size="11" text-anchor="middle" fill="#333">（继承 eat()）</text>
  <text x="300" y="190" font-size="11" text-anchor="middle" fill="#1B5E20">+ catchMouse()</text>
</svg>

**代码示例**：
```java
// 父类
class Animal {
    public void eat() {
        System.out.println("动物在吃东西...");
    }
}

// 子类 Dog 继承 Animal
class Dog extends Animal {
    public void bark() {
        System.out.println("狗在汪汪叫...");
    }
}

// 子类 Cat 继承 Animal
class Cat extends Animal {
    public void catchMouse() {
        System.out.println("猫在抓老鼠...");
    }
}

public class Test {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();  // 调用从父类继承的方法
        dog.bark(); // 调用自己的方法
    }
}
```

**优点**：
- **代码复用**：减少重复代码，提高开发效率。
- **易于扩展**：可以在不修改父类的情况下，扩展新的功能。
- **构建层次结构**：形成清晰的类层次关系，符合人类认知。

---

### 3. 多态 (Polymorphism)

**定义**：指**同一行为**，作用于**不同对象**上时，会产生**不同效果**。多态的前提是**继承**和**方法重写**，以及**父类引用指向子类对象**。

**生活比喻**：按下“开”按钮（同一行为），对于电视机（对象1），是打开屏幕；对于收音机（对象2），是开始播放声音。同一个“开”的行为，产生了不同的结果。

<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
  <text x="200" y="30" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">Animal ref = ?</text>
  <path d="M 200 40 L 120 80" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange)"/>
  <path d="M 200 40 L 280 80" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange)"/>
  <rect x="70" y="80" width="100" height="50" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2" rx="5"/>
  <text x="120" y="100" font-size="12" font-weight="bold" text-anchor="middle" fill="#E65100">new Dog()</text>
  <text x="120" y="120" font-size="11" text-anchor="middle" fill="#333">汪汪叫</text>
  <rect x="230" y="80" width="100" height="50" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2" rx="5"/>
  <text x="280" y="100" font-size="12" font-weight="bold" text-anchor="middle" fill="#E65100">new Cat()</text>
  <text x="280" y="120" font-size="11" text-anchor="middle" fill="#333">喵喵叫</text>
  <text x="200" y="170" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">ref.makeSound();</text>
  <text x="200" y="200" font-size="12" text-anchor="middle" fill="#F57C00">编译时：调用 Animal 的方法</text>
  <text x="200" y="220" font-size="12" text-anchor="middle" fill="#F57C00">运行时：执行具体子类的方法</text>
  <defs>
    <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#FF9800"/></marker>
  </defs>
</svg>

**代码示例**：
```java
// 父类
class Animal {
    public void makeSound() {
        System.out.println("动物发出声音...");
    }
}

// 子类 Dog 重写方法
class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("汪汪汪！");
    }
}

// 子类 Cat 重写方法
class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("喵喵喵！");
    }
}

public class Test {
    public static void main(String[] args) {
        // 父类引用指向子类对象
        Animal myDog = new Dog();
        Animal myCat = new Cat();

        // 调用同样的方法，表现出不同行为
        myDog.makeSound(); // 输出: 汪汪汪！
        myCat.makeSound(); // 输出: 喵喵喵！
    }
}
```

**优点**：
- **灵活性**：允许将子类对象视为父类类型，屏蔽了不同子类之间的差异。
- **可扩展性**：增加新的子类无需修改现有代码，符合“开闭原则”。
- **可维护性**：代码更简洁，逻辑更清晰。

#### 总结对比

| 特性 | 核心思想 | 目的 | 关键字 |
|---|---|---|---|
| **封装** | 隐藏细节 | 保护数据、简化使用 | `private` |
| **继承** | 代码复用 | 扩展功能、构建层次 | `extends` |
| **多态** | 同一接口，多种实现 | 提高灵活性和可扩展性 | `implements`, `@Override` |

### 17. 重载（Overload）和重写（Override）的区别？

重载和重写是 Java 多态性中两个非常重要且容易混淆的概念。它们在定义、规则和作用上都有本质的区别。

#### 核心区别图示

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">重载 (Overload) vs 重写 (Override)</text>

  <!-- Overload Panel -->
  <rect x="50" y="70" width="330" height="360" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="8"/>
  <text x="215" y="100" font-size="18" font-weight="bold" text-anchor="middle" fill="#1565C0">重载 (Overload)</text>
  <text x="215" y="125" font-size="12" text-anchor="middle" fill="#1976D2">编译时多态</text>
  <rect x="80" y="150" width="270" height="200" fill="#BBDEFB" stroke="#1976D2" stroke-width="1.5" rx="5"/>
  <text x="215" y="170" font-size="13" font-weight="bold" text-anchor="middle" fill="#0D47A1">同一个类 (e.g., Calculator)</text>
  <text x="90" y="200" font-size="12" text-anchor="start" fill="#333">+ add(int a, int b)</text>
  <text x="90" y="230" font-size="12" text-anchor="start" fill="#333">+ add(int a, int b, int c)</text>
  <text x="90" y="260" font-size="12" text-anchor="start" fill="#333">+ add(double a, double b)</text>
  <text x="215" y="300" font-size="11" font-weight="bold" text-anchor="middle" fill="#0D47A1">方法名相同，参数列表不同</text>
  <text x="215" y="320" font-size="11" text-anchor="middle" fill="#666">(类型、数量、顺序不同)</text>
  <text x="215" y="380" font-size="12" font-weight="bold" text-anchor="middle" fill="#1565C0">“同名不同参，方法在同类”</text>

  <!-- Override Panel -->
  <rect x="420" y="70" width="330" height="360" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="8"/>
  <text x="585" y="100" font-size="18" font-weight="bold" text-anchor="middle" fill="#2E7D32">重写 (Override)</text>
  <text x="585" y="125" font-size="12" text-anchor="middle" fill="#388E3C">运行时多态</text>
  <rect x="450" y="150" width="270" height="80" fill="#C8E6C9" stroke="#66BB6A" stroke-width="1.5" rx="5"/>
  <text x="585" y="170" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">父类 (Animal)</text>
  <text x="460" y="200" font-size="12" text-anchor="start" fill="#333">+ makeSound()</text>
  <path d="M 585 230 L 585 250" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <rect x="450" y="250" width="270" height="80" fill="#A5D6A7" stroke="#66BB6A" stroke-width="1.5" rx="5"/>
  <text x="585" y="270" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">子类 (Dog)</text>
  <text x="460" y="300" font-size="12" text-anchor="start" fill="#333">+ makeSound()  <tspan fill="#FF9800">@Override</tspan></text>
  <text x="585" y="380" font-size="12" font-weight="bold" text-anchor="middle" fill="#2E7D32">“同名同参，方法在子类”</text>

  <defs>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto"><path d="M0,4 L8,4 L4,8 z" fill="#4CAF50"/></marker>
  </defs>
</svg>

#### 详细对比表

| 对比维度 | 重载 (Overload) | 重写 (Override) |
|---|---|---|
| **发生位置** | 同一个类中 | 父子类之间 |
| **方法签名** | **方法名必须相同，参数列表必须不同**（类型、数量、顺序） | **方法名和参数列表必须完全相同** |
| **返回类型** | 可以不同，但仅返回类型不同不足以构成重载 | 必须相同或是父类返回类型的子类（协变返回类型） |
| **访问修饰符** | 无要求 | 子类方法的访问权限**不能严于**父类（只能更宽松或相同） |
| **抛出异常** | 无要求 | 子类方法抛出的异常**不能比**父类更宽泛（可以是父类异常的子类或不抛出） |
| **多态性** | **编译时多态**（静态绑定） | **运行时多态**（动态绑定） |
| **英文** | Overload | Override |
| **关系** | 无继承关系 | 必须有继承或实现关系 |

#### 代码示例

**重载 (Overload) 示例：**
```java
class Calculator {
    // 重载 add 方法
    public int add(int a, int b) {
        System.out.println("调用 add(int, int)");
        return a + b;
    }

    public int add(int a, int b, int c) {
        System.out.println("调用 add(int, int, int)");
        return a + b + c;
    }

    public double add(double a, double b) {
        System.out.println("调用 add(double, double)");
        return a + b;
    }\n}

public class OverloadTest {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        calc.add(1, 2);       // 编译时确定调用第一个 add
        calc.add(1, 2, 3);    // 编译时确定调用第二个 add
        calc.add(1.0, 2.0);   // 编译时确定调用第三个 add
    }
}
```

**重写 (Override) 示例：**
```java
class Animal {
    public void makeSound() {
        System.out.println("动物发出声音");
    }
}

class Dog extends Animal {
    // 重写父类的 makeSound 方法
    @Override
    public void makeSound() {
        System.out.println("汪汪汪！");
    }
}

public class OverrideTest {
    public static void main(String[] args) {
        Animal animal = new Animal();
        Animal dog = new Dog(); // 父类引用指向子类对象

        animal.makeSound(); // 运行时调用 Animal 的方法
        dog.makeSound();    // 运行时确定调用 Dog 的方法
    }
}
```

#### 关键要点

1.  **“两同两小一大”原则（重写）**
    *   **两同**：方法名相同，参数列表相同。
    *   **两小**：子类返回类型小于等于父类；子类抛出异常小于等于父类。
    *   **一大**：子类访问修饰符大于等于父类。

2.  **绑定时机不同**
    *   **重载**是**静态绑定**或**编译时绑定**。编译器根据方法的参数列表在编译时就能确定调用哪个方法。
    *   **重写**是**动态绑定**或**运行时绑定**。运行时JVM根据对象的实际类型来确定调用哪个方法。

3.  **目的不同**
    *   **重载**是为了提供功能相似但参数不同的多个方法，方便调用者。
    *   **重写**是为了让子类根据需要实现自己独特的行为，实现多态。

4.  **记忆口诀**
    *   **重载**：“同名不同参，方法在同类”。
    *   **重写**：“同名同参，方法在子类”。

### 18. 抽象类和接口的区别？

抽象类和接口是 Java 中实现抽象的两种核心机制，它们都用于定义规范，但设计理念和使用场景有很大不同。

#### 核心区别图示

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">抽象类 (Abstract Class) vs 接口 (Interface)</text>

  <!-- Abstract Class Panel -->
  <rect x="50" y="70" width="330" height="330" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="8"/>
  <text x="215" y="100" font-size="18" font-weight="bold" text-anchor="middle" fill="#1565C0">抽象类</text>
  <text x="215" y="125" font-size="12" text-anchor="middle" fill="#1976D2">“is-a” 关系 (是一个...)</text>
  <rect x="80" y="150" width="270" height="150" fill="#BBDEFB" stroke="#1976D2" stroke-width="1.5" rx="5" stroke-dasharray="4"/>
  <text x="215" y="170" font-size="13" font-weight="bold" text-anchor="middle" fill="#0D47A1">abstract class Shape</text>
  <text x="90" y="200" font-size="12" text-anchor="start" fill="#333">+ String color;</text>
  <text x="90" y="220" font-size="12" text-anchor="start" fill="#333">+ getColor(); // 普通方法</text>
  <text x="90" y="240" font-size="12" text-anchor="start" fill="#333">+ abstract draw(); // 抽象方法</text>
  <path d="M 215 300 L 215 320" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue)"/>
  <text x="215" y="315" font-size="11" text-anchor="middle" fill="#1976D2">extends</text>
  <rect x="140" y="320" width="150" height="50" fill="#FFFFFF" stroke="#1976D2" stroke-width="1.5" rx="5"/>
  <text x="215" y="340" font-size="13" font-weight="bold" text-anchor="middle" fill="#0D47A1">Circle</text>
  <text x="215" y="360" font-size="11" text-anchor="middle" fill="#666">“圆形是一个形状”</text>

  <!-- Interface Panel -->
  <rect x="420" y="70" width="330" height="330" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="8"/>
  <text x="585" y="100" font-size="18" font-weight="bold" text-anchor="middle" fill="#2E7D32">接口</text>
  <text x="585" y="125" font-size="12" text-anchor="middle" fill="#388E3C">“can-do” 关系 (能做...)</text>
  <rect x="450" y="150" width="270" height="80" fill="#C8E6C9" stroke="#66BB6A" stroke-width="1.5" rx="5"/>
  <text x="585" y="170" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">interface Flyable</text>
  <text x="460" y="200" font-size="12" text-anchor="start" fill="#333">+ fly(); // 默认 public abstract</text>
  <path d="M 515 230 L 515 250" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <path d="M 655 230 L 655 250" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <text x="515" y="245" font-size="11" text-anchor="middle" fill="#388E3C">implements</text>
  <text x="655" y="245" font-size="11" text-anchor="middle" fill="#388E3C">implements</text>
  <rect x="450" y="250" width="130" height="50" fill="#FFFFFF" stroke="#388E3C" stroke-width="1.5" rx="5"/>
  <text x="515" y="270" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">Bird</text>
  <text x="515" y="290" font-size="11" text-anchor="middle" fill="#666">“鸟能飞”</text>
  <rect x="590" y="250" width="130" height="50" fill="#FFFFFF" stroke="#388E3C" stroke-width="1.5" rx="5"/>
  <text x="655" y="270" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">Airplane</text>
  <text x="655" y="290" font-size="11" text-anchor="middle" fill="#666">“飞机能飞”</text>

  <defs>
    <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto"><path d="M0,4 L8,4 L4,8 z" fill="#2196F3"/></marker>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto"><path d="M0,4 L8,4 L4,8 z" fill="#4CAF50"/></marker>
  </defs>
</svg>

#### 详细对比表

| 对比维度 | 抽象类 (Abstract Class) | 接口 (Interface) |
|---|---|---|
| **关键字** | `abstract class` | `interface` |
| **继承/实现** | **单继承** (`extends`) | **多实现** (`implements`) |
| **设计理念** | **is-a** (是什么)，体现继承关系，强调“属于...类” | **can-do** (能做什么)，体现能力，强调“具备...能力” |
| **构造方法** | **有** (用于子类初始化) | **没有** |
| **成员变量** | 可以是各种类型 (普通变量、常量) | 默认 `public static final` (常量) |
| **成员方法** | 可包含**抽象方法**和**普通方法** | JDK 8 前只能有**抽象方法**<br>JDK 8+ 可有 `default` 和 `static` 方法<br>JDK 9+ 可有 `private` 方法 |
| **方法访问权限** | `public`, `protected`, `default` | 默认 `public` (JDK 9+ `private` 除外) |
| **代码共享** | 适合共享**代码和状态** (成员变量) | 适合共享**行为规范** (JDK 8+ 可共享默认实现) |

#### 代码示例

**抽象类示例：**
```java
// 抽象类：定义了“形状”的通用属性和行为
abstract class Shape {
    protected String color; // 共享状态

    public Shape(String color) { // 构造方法
        this.color = color;
    }

    public String getColor() { // 普通方法，共享代码
        return color;
    }

    public abstract double getArea(); // 抽象方法，由子类实现
}

// 子类：圆形是一个形状
class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color); // 调用父类构造
        this.radius = radius;
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}
```

**接口示例：**
```java
// 接口：定义了“可飞行的”能力
interface Flyable {
    void fly(); // 行为规范

    // JDK 8+ 默认方法
    default void takeOff() {
        System.out.println("正在起飞...");
    }
}

// 实现类：鸟能飞
class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鸟在扇动翅膀飞行...");
    }
}

// 实现类：飞机也能飞
class Airplane implements Flyable {
    @Override
    public void fly() {
        System.out.println("飞机依靠引擎飞行...");
    }
}
```

#### 如何选择？

- **优先使用接口**：接口更加灵活，因为它允许一个类实现多个接口，解耦性更好。

- **使用抽象类的场景**：
    1.  **共享代码**：当多个子类有共同的代码或成员变量时。
    2.  **定义模板**：使用模板方法设计模式，定义一个算法的骨架，而将一些步骤延迟到子类中实现。
    3.  **强烈的 `is-a` 关系**：当子类和父类之间存在明显的“是一个”关系时。
    4.  **需要非 `public` 方法**：当需要定义 `protected` 或 `default` 的抽象方法时。

#### 关键要点

1.  **继承限制**：类只能单继承抽象类，但可以多实现接口。这是最核心的区别。
2.  **设计目的**：抽象类用于**抽象事物**（is-a），接口用于**定义能力**（can-do）。
3.  **成员类型**：抽象类可以有状态（成员变量）和构造方法，接口不能。
4.  **JDK 8+ 的变化**：接口引入了 `default` 和 `static` 方法，使其也能包含具体实现，缩小了与抽象类的部分差距，但设计理念的根本区别依然存在。

### 19. 什么是构造方法？构造方法的特点是什么？

**构造方法**（Constructor）是一种特殊的成员方法，它的核心作用是在创建对象时**初始化对象的状态**（即为成员变量赋初始值）。

#### 构造方法的核心特点

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">构造方法的特点</text>

  <rect x="50" y="60" width="700" height="320" fill="#F7F9FA" stroke="#D0D7DE" stroke-width="1" rx="10"/>

  <!-- Code Block -->
  <g>
    <text x="80" y="90" font-family="monospace" font-size="12">public class <tspan font-weight="bold" fill="#2196F3">Person</tspan> {</text>
    <text x="100" y="110" font-family="monospace" font-size="12">private String name;</text>
    <text x="100" y="130" font-family="monospace" font-size="12">private int age;</text>
    <text x="80" y="150" font-family="monospace" font-size="12"></text>
    <text x="100" y="170" font-family="monospace" font-size="12">public <tspan font-weight="bold" fill="#2196F3">Person</tspan>(String name, int age) {</text>
    <text x="120" y="190" font-family="monospace" font-size="12">this.name = name;</text>
    <text x="120" y="210" font-family="monospace" font-size="12">this.age = age;</text>
    <text x="100" y="230" font-family="monospace" font-size="12">}</text>
    <text x="80" y="250" font-family="monospace" font-size="12">}</text>
  </g>

  <!-- Annotations -->
  <g fill="#C62828" font-size="12" font-family="sans-serif">
    <path d="M 320 170 L 360 170" stroke="#C62828" stroke-width="2" marker-end="url(#arrowRed)"/>
    <text x="365" y="165">1. 方法名与类名完全相同</text>
    <path d="M 200 160 L 200 140 L 360 110" stroke="#C62828" stroke-width="2" marker-end="url(#arrowRed)"/>
    <text x="365" y="105">2. 没有任何返回类型 (连 void 都没有)</text>
  </g>

  <!-- Invocation -->
  <g>
    <text x="80" y="300" font-family="monospace" font-size="12"><tspan fill="#2196F3">Person</tspan> p = <tspan fill="#E65100">new</tspan> <tspan fill="#2196F3">Person</tspan>("张三", 25);</text>
    <path d="M 200 285 Q 250 260, 290 240" stroke="#4CAF50" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrowGreen)"/>
    <text x="150" y="270" fill="#2E7D32" font-size="12">3. 使用 new 关键字自动调用</text>
  </g>

  <!-- Other Characteristics -->
  <g x="450" y="200" fill="#0D47A1" font-size="12" font-family="sans-serif">
    <text y="0">4. 主要作用是初始化成员变量。</text>
    <text y="20">5. 每个类都有构造方法，如果没有显式定义，</text>
    <text y="35" x="10">编译器会提供一个无参的默认构造方法。</text>
    <text y="55">6. 一旦定义了任何构造方法，编译器就不再提供默认的。</text>
    <text y="75">7. 构造方法可以重载 (Overload)。</text>
    <text y="95">8. 构造方法不能被 `static`, `final`, `abstract` 修饰。</text>
  </g>

  <defs>
    <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#C62828"/></marker>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#4CAF50"/></marker>
  </defs>
</svg>

#### 代码示例

```java
public class Car {
    private String brand;
    private int speed;

    // 1. 无参构造方法 (默认构造方法)
    // 如果不写任何构造方法，编译器会自动生成一个这样的方法
    public Car() {
        this.brand = "未知品牌"; // 为成员变量提供默认值
        System.out.println("无参构造方法被调用！");
    }

    // 2. 有参构造方法 (重载)
    public Car(String brand) {
        this.brand = brand;
        System.out.println("有参构造方法(String)被调用！");
    }

    // 3. 多个参数的构造方法 (重载)
    public Car(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
        System.out.println("有参构造方法(String, int)被调用！");
    }

    public void showInfo() {
        System.out.println("品牌: " + this.brand + ", 速度: " + this.speed);
    }

    public static void main(String[] args) {
        // 使用 new 关键字自动调用构造方法
        Car car1 = new Car(); // 调用无参构造
        car1.showInfo();

        Car car2 = new Car("特斯拉"); // 调用有参构造
        car2.showInfo();

        Car car3 = new Car("比亚迪", 120); // 调用多参数构造
        car3.showInfo();
    }
}
```

#### 默认构造方法陷阱

如果一个类**没有**显式定义任何构造方法，Java 编译器会为其提供一个公开的、无参数的默认构造方法。

```java
class MyClass { 
    // 编译器自动添加 public MyClass() {}
}
MyClass obj = new MyClass(); // 合法
```

但是，如果**已经**定义了任何构造方法（无论有参还是无参），编译器就**不再**提供默认构造方法。

```java
class AnotherClass {
    private String name;

    // 只定义了有参构造
    public AnotherClass(String name) {
        this.name = name;
    }
}

// AnotherClass obj = new AnotherClass(); // 编译错误！
// 错误信息: The constructor AnotherClass() is undefined
// 因为已经定义了有参构造，编译器不再提供无参的默认构造了。
```

#### 关键要点

1.  **名称必须与类名相同**。
2.  **没有返回类型**，连 `void` 也不行。
3.  **核心作用**是**初始化对象**，为成员变量赋初始值。
4.  通过 `new` 关键字在创建对象时被**自动调用**。
5.  如果程序员不提供，编译器会提供一个**默认的无参构造方法**。
6.  如果程序员提供了任何构造方法，编译器就**不再提供**默认的。
7.  构造方法可以**重载**，以提供多种对象初始化方式。
8.  构造方法不能被 `static`, `final`, `abstract` 等关键字修饰。

### 20. 什么是 this 关键字？this 的作用是什么？

`this` 是 Java 的一个关键字，代表**当前对象的引用**。它指向正在调用方法或构造器的那个对象实例。

#### this 的主要作用

1. **区分成员变量和局部变量**
   ```java
   public class Person {
       private String name;

       public void setName(String name) {
           this.name = name;  // this.name 是成员变量，name 是参数
       }
   }
   ```

2. **调用本类的其他构造方法**
   ```java
   public class Person {
       private String name;
       private int age;

       public Person() {
           this("未知", 0);  // 调用另一个构造方法
       }

       public Person(String name, int age) {
           this.name = name;
           this.age = age;
       }
   }
   ```

3. **返回当前对象（支持链式调用）**
   ```java
   public class Builder {
       private String name;

       public Builder setName(String name) {
           this.name = name;
           return this;  // 返回当前对象
       }

       // 使用：new Builder().setName("Tom").setAge(20)
   }
   ```

4. **将当前对象作为参数传递**
   ```java
   public class Button {
       public void onClick() {
           eventHandler.handle(this);  // 将当前按钮对象传递给处理器
       }
   }
   ```

#### 关键要点

- **this 不能在静态方法中使用**（静态方法属于类，不属于对象）
- **this() 调用构造方法必须放在第一行**
- **this 本质上是一个引用变量**，存储当前对象的内存地址

### 21. 什么是 super 关键字？super 的作用是什么？

`super` 是 Java 的一个关键字，代表**父类对象的引用**。它用于在子类中访问父类的成员（属性、方法、构造方法）。

#### super 的主要作用

1. **访问父类的成员变量**
   ```java
   class Parent {
       protected String name = "父类";
   }

   class Child extends Parent {
       private String name = "子类";

       public void display() {
           System.out.println(super.name);  // 输出：父类
           System.out.println(this.name);   // 输出：子类
       }
   }
   ```

2. **调用父类的方法**
   ```java
   class Parent {
       public void show() {
           System.out.println("父类方法");
       }
   }

   class Child extends Parent {
       @Override
       public void show() {
           super.show();  // 调用父类的 show 方法
           System.out.println("子类方法");
       }
   }
   ```

3. **调用父类的构造方法**
   ```java
   class Parent {
       public Parent(String name) {
           System.out.println("父类构造：" + name);
       }
   }

   class Child extends Parent {
       public Child() {
           super("参数");  // 必须放在第一行
           System.out.println("子类构造");
       }
   }
   ```

#### this 和 super 的区别

| 特性 | this | super |
|------|------|-------|
| **代表对象** | 当前对象 | 父类对象 |
| **访问成员** | 本类成员 | 父类成员 |
| **构造调用** | 本类其他构造方法 | 父类构造方法 |
| **使用位置** | 任意位置 | 任意位置 |
| **构造调用位置** | 必须第一行 | 必须第一行 |

#### 关键要点

- **super() 必须是子类构造方法的第一条语句**
- 如果没有显式调用 `super()`，编译器会自动添加 `super()`（无参构造）
- **super 不能在静态方法中使用**
- **this() 和 super() 不能同时出现**在同一个构造方法中

### 22. 什么是内部类？内部类有哪些分类？

**内部类**（Inner Class）是定义在另一个类内部的类。内部类可以访问外部类的所有成员（包括私有成员）。

#### 内部类的四种分类

1. **成员内部类**（Member Inner Class）
   - 定义在外部类的成员位置
   - 可以访问外部类的所有成员
   - 依赖于外部类实例

   ```java
   public class Outer {
       private int x = 10;

       class Inner {  // 成员内部类
           public void show() {
               System.out.println(x);  // 可以访问外部类成员
           }
       }

       public void test() {
           Inner inner = new Inner();  // 创建内部类实例
           inner.show();
       }
   }
   ```

2. **静态内部类**（Static Nested Class）
   - 使用 `static` 修饰的内部类
   - 不依赖外部类实例
   - 只能访问外部类的静态成员

   ```java
   public class Outer {
       private static int x = 10;

       static class StaticInner {  // 静态内部类
           public void show() {
               System.out.println(x);  // 只能访问静态成员
           }
       }
   }

   // 使用：Outer.StaticInner inner = new Outer.StaticInner();
   ```

3. **局部内部类**（Local Inner Class）
   - 定义在方法或代码块中
   - 只能在定义它的方法/代码块中使用
   - 可以访问外部类成员和方法的 final/effectively final 变量

   ```java
   public class Outer {
       public void method() {
           final int y = 20;

           class LocalInner {  // 局部内部类
               public void show() {
                   System.out.println(y);
               }
           }

           LocalInner inner = new LocalInner();
           inner.show();
       }
   }
   ```

4. **匿名内部类**（Anonymous Inner Class）
   - 没有名字的内部类
   - 通常用于实现接口或继承类的一次性使用
   - 常用于事件监听、线程创建等场景

   ```java
   // 实现接口
   Runnable runnable = new Runnable() {
       @Override
       public void run() {
           System.out.println("匿名内部类");
       }
   };

   // 继承类
   Thread thread = new Thread() {
       @Override
       public void run() {
           System.out.println("匿名内部类继承");
       }
   };
   ```

#### 内部类的优点

- **封装性更好**：可以隐藏实现细节
- **可以访问外部类私有成员**：增强了类之间的关联
- **实现多重继承**：一个类可以有多个内部类分别继承不同的类

### 23. 静态内部类和非静态内部类的区别？

| 特性 | 非静态内部类（成员内部类） | 静态内部类 |
|------|------------------------|-----------|
| **修饰符** | 无 static | 有 static |
| **依赖外部类实例** | 是 | 否 |
| **创建方式** | `Outer.Inner inner = outer.new Inner()` | `Outer.Inner inner = new Outer.Inner()` |
| **访问外部类成员** | 可以访问所有成员（包括实例和静态） | 只能访问静态成员 |
| **持有外部类引用** | 是（隐式持有 Outer.this） | 否 |
| **可以定义静态成员** | 否（除了 static final 常量） | 是 |
| **内存占用** | 较大（持有外部类引用） | 较小 |

#### 代码示例

```java
public class Outer {
    private int instanceVar = 10;
    private static int staticVar = 20;

    // 非静态内部类
    class Inner {
        public void show() {
            System.out.println(instanceVar);  // ✓ 可以访问实例变量
            System.out.println(staticVar);    // ✓ 可以访问静态变量
        }
    }

    // 静态内部类
    static class StaticInner {
        public void show() {
            // System.out.println(instanceVar);  // ✗ 不能访问实例变量
            System.out.println(staticVar);       // ✓ 可以访问静态变量
        }
    }
}

// 使用
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();              // 非静态需要外部类实例
Outer.StaticInner staticInner = new Outer.StaticInner();  // 静态不需要
```

#### 关键要点

- **静态内部类性能更好**：不持有外部类引用，避免内存泄漏
- **非静态内部类适合需要访问外部类实例成员的场景**
- **静态内部类类似于静态方法**：属于类而非实例

### 24. 匿名内部类是什么？如何使用？

**匿名内部类**是一种没有名字的内部类，主要用于**创建某个接口或抽象类的临时实现**。它在定义的同时就创建了对象，通常用于一次性使用的场景。

#### 使用场景

1. **实现接口**
   ```java
   // 传统方式
   class MyRunnable implements Runnable {
       public void run() {
           System.out.println("线程执行");
       }
   }
   Thread t = new Thread(new MyRunnable());

   // 匿名内部类方式
   Thread t = new Thread(new Runnable() {
       @Override
       public void run() {
           System.out.println("线程执行");
       }
   });

   // Lambda 表达式（Java 8+，函数式接口）
   Thread t = new Thread(() -> System.out.println("线程执行"));
   ```

2. **继承抽象类**
   ```java
   abstract class Animal {
       abstract void makeSound();
   }

   Animal dog = new Animal() {
       @Override
       void makeSound() {
           System.out.println("汪汪汪");
       }
   };
   dog.makeSound();
   ```

3. **事件监听（GUI 编程常见）**
   ```java
   button.addActionListener(new ActionListener() {
       @Override
       public void actionPerformed(ActionEvent e) {
           System.out.println("按钮被点击");
       }
   });
   ```

#### 匿名内部类的特点

- **没有类名**，在定义时直接创建对象
- **没有构造方法**（因为没有类名）
- **只能使用一次**，不能重复创建实例
- 可以访问外部类成员和方法的 **final 或 effectively final 变量**
- **不能定义静态成员**（除了 static final 常量）

#### 关键要点

- 匿名内部类适合**简单、临时**的实现
- 对于函数式接口，**优先使用 Lambda 表达式**（Java 8+）
- 复杂逻辑建议**定义具名类**，提高代码可读性

### 25. 什么是多态？多态的实现方式有哪些？

**多态**（Polymorphism）是指**同一个行为具有多种不同的表现形式**。在 Java 中，多态允许父类引用指向子类对象，并在运行时根据实际对象类型调用相应的方法。

#### 多态的两种实现方式

1. **编译时多态（静态多态）**
   - 通过**方法重载**（Overload）实现
   - 编译期确定调用哪个方法

   ```java
   public class Calculator {
       public int add(int a, int b) {
           return a + b;
       }

       public double add(double a, double b) {
           return a + b;
       }

       public int add(int a, int b, int c) {
           return a + b + c;
       }
   }
   ```

2. **运行时多态（动态多态）**
   - 通过**方法重写**（Override）和**继承/接口实现**
   - 运行时根据实际对象类型确定调用哪个方法

   ```java
   class Animal {
       public void makeSound() {
           System.out.println("动物叫");
       }
   }

   class Dog extends Animal {
       @Override
       public void makeSound() {
           System.out.println("汪汪汪");
       }
   }

   class Cat extends Animal {
       @Override
       public void makeSound() {
           System.out.println("喵喵喵");
       }
   }

   // 使用多态
   Animal animal1 = new Dog();  // 父类引用指向子类对象
   Animal animal2 = new Cat();
   animal1.makeSound();  // 输出：汪汪汪（运行时确定）
   animal2.makeSound();  // 输出：喵喵喵
   ```

#### 多态的三个必要条件

1. **继承**：必须有子类继承父类或实现接口
2. **重写**：子类重写父类的方法
3. **向上转型**：父类引用指向子类对象（`Animal animal = new Dog()`）

#### 多态的优点

- **扩展性好**：添加新的子类不需要修改现有代码
- **代码复用**：通过父类引用操作不同的子类对象
- **降低耦合度**：面向接口编程，提高灵活性

### 26. 什么是向上转型和向下转型？

**向上转型**和**向下转型**是 Java 中对象类型转换的两种方式，用于处理继承关系中父类和子类引用之间的转换。

#### 1. 向上转型（Upcasting）

**定义**：子类对象转换为父类引用，**自动进行，无需强制类型转换**。

```java
class Animal {
    public void eat() {
        System.out.println("动物吃东西");
    }
}

class Dog extends Animal {
    public void bark() {
        System.out.println("汪汪汪");
    }
}

// 向上转型（自动）
Animal animal = new Dog();  // Dog 对象转为 Animal 引用
animal.eat();   // ✓ 可以调用父类方法
// animal.bark();  // ✗ 不能调用子类特有方法（编译错误）
```

**特点**：
- **自动、安全**，不需要强制转换
- 只能访问**父类定义的方法**，子类特有方法不可见
- **多态的基础**

#### 2. 向下转型（Downcasting）

**定义**：父类引用转换为子类引用，**需要强制类型转换**。

```java
Animal animal = new Dog();  // 向上转型

// 向下转型（强制转换）
Dog dog = (Dog) animal;
dog.bark();  // ✓ 可以调用子类方法

// 错误示例：实际对象不是 Cat
Animal animal2 = new Dog();
Cat cat = (Cat) animal2;  // 运行时抛出 ClassCastException
```

**特点**：
- 需要**显式强制转换**：`(SubClass) parentRef`
- **可能抛出 ClassCastException**，需要先用 `instanceof` 判断
- 转换后可以访问**子类特有方法**

#### 安全的向下转型

```java
Animal animal = new Dog();

// 推荐：先用 instanceof 判断
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.bark();  // 安全
}
```

#### 关键对比

| 特性 | 向上转型 | 向下转型 |
|------|---------|---------|
| **转换方向** | 子类 → 父类 | 父类 → 子类 |
| **是否需要强制转换** | 否（自动） | 是（必须） |
| **安全性** | 100% 安全 | 可能失败（ClassCastException） |
| **访问范围** | 只能访问父类成员 | 可以访问子类成员 |
| **使用场景** | 多态、统一处理 | 需要访问子类特有功能 |

#### 关键要点

- **向上转型是多态的基础**，编译时自动完成
- **向下转型需谨慎**，务必用 `instanceof` 检查类型
- 转型不会改变对象本身，只改变引用的**访问能力**

### 27. 什么是 instanceof 关键字？

`instanceof` 是 Java 的一个**二元运算符**，用于**判断对象是否是某个类的实例**，或者是否是该类的子类实例。返回 `boolean` 类型。

#### 语法

```java
object instanceof ClassName
```

#### 基本使用

```java
class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

Dog dog = new Dog();
Animal animal = new Dog();

System.out.println(dog instanceof Dog);      // true
System.out.println(dog instanceof Animal);   // true（子类是父类实例）
System.out.println(dog instanceof Cat);      // false
System.out.println(animal instanceof Dog);   // true（实际对象是 Dog）

// null 检查
Animal nullAnimal = null;
System.out.println(nullAnimal instanceof Animal);  // false（null 不是任何类的实例）
```

#### 主要用途

1. **安全的向下转型前检查**
   ```java
   Animal animal = getAnimal();  // 不确定具体类型

   if (animal instanceof Dog) {
       Dog dog = (Dog) animal;  // 安全转型
       dog.bark();
   } else if (animal instanceof Cat) {
       Cat cat = (Cat) animal;
       cat.meow();
   }
   ```

2. **多态场景中的类型判断**
   ```java
   public void handleAnimal(Animal animal) {
       if (animal instanceof Dog) {
           System.out.println("处理狗");
       } else if (animal instanceof Cat) {
           System.out.println("处理猫");
       }
   }
   ```

3. **接口实现检查**
   ```java
   Object obj = "Hello";
   if (obj instanceof Comparable) {
       Comparable c = (Comparable) obj;
       // 安全使用 Comparable 方法
   }
   ```

#### 注意事项

- **null 永远返回 false**：`null instanceof AnyClass` 总是 false
- **编译时检查**：如果类型完全无关（不在继承树上），编译器会报错
- **接口检查**：可以用于检查是否实现了某个接口

#### Java 14+ 模式匹配增强

```java
// 传统方式
if (obj instanceof String) {
    String str = (String) obj;
    System.out.println(str.length());
}

// Java 14+ 模式匹配
if (obj instanceof String str) {
    System.out.println(str.length());  // 自动转型
}
```

#### 关键要点

- **instanceof 是向下转型前的必备检查**，避免 ClassCastException
- **null 检查**：`instanceof` 会自动处理 null，无需额外判断
- **优先考虑多态设计**，减少对 instanceof 的依赖

## 访问修饰符

### 28. Java 有哪些访问修饰符？它们的区别是什么？

Java 有 **4 种访问修饰符**，用于控制类、方法、变量的访问权限：

| 修饰符 | 说明 | 适用范围 |
|-------|------|---------|
| **private** | 私有的，只能在本类中访问 | 成员变量、方法、内部类 |
| **default**（无修饰符） | 包级私有，同一包内可访问 | 类、成员变量、方法 |
| **protected** | 受保护的，同包或子类可访问 | 成员变量、方法 |
| **public** | 公开的，任何地方都可访问 | 类、成员变量、方法 |

#### 访问权限从小到大

```
private < default < protected < public
```

### 29. public、protected、default、private 的访问范围是什么？

| 访问修饰符 | 本类 | 同包 | 子类（不同包） | 其他包 |
|-----------|------|------|--------------|--------|
| **private** | ✓ | ✗ | ✗ | ✗ |
| **default** | ✓ | ✓ | ✗ | ✗ |
| **protected** | ✓ | ✓ | ✓ | ✗ |
| **public** | ✓ | ✓ | ✓ | ✓ |

#### 代码示例

```java
// 包 com.example.a
public class Parent {
    private int privateVar = 1;      // 只能在 Parent 类中访问
    int defaultVar = 2;              // 同包可访问
    protected int protectedVar = 3;  // 同包 + 子类可访问
    public int publicVar = 4;        // 任何地方可访问
}

// 包 com.example.a（同包）
class SamePackage {
    void test() {
        Parent p = new Parent();
        // p.privateVar;     // ✗ 编译错误
        p.defaultVar;        // ✓
        p.protectedVar;      // ✓
        p.publicVar;         // ✓
    }
}

// 包 com.example.b（不同包）
class Child extends Parent {
    void test() {
        // this.privateVar;     // ✗ 编译错误
        // this.defaultVar;     // ✗ 编译错误
        this.protectedVar;      // ✓ 子类可访问
        this.publicVar;         // ✓
    }
}

// 包 com.example.b（不同包，非子类）
class Other {
    void test() {
        Parent p = new Parent();
        // p.privateVar;     // ✗
        // p.defaultVar;     // ✗
        // p.protectedVar;   // ✗
        p.publicVar;         // ✓
    }
}
```

#### 关键要点

- **顶层类**只能用 `public` 或 `default`
- **成员变量**推荐使用 `private`，提供 getter/setter 方法
- **protected** 主要用于继承场景，允许子类访问

## 关键字

### 30. final、finally、finalize 的区别？

这三个关键字虽然拼写相似，但用途完全不同：

| 关键字 | 类型 | 作用 | 使用场景 |
|-------|------|------|---------|
| **final** | 修饰符 | 表示"最终的、不可改变的" | 修饰类、方法、变量 |
| **finally** | 代码块 | 异常处理中必定执行的代码 | try-catch-finally 结构 |
| **finalize** | 方法 | 对象被 GC 回收前调用（已废弃） | 垃圾回收机制 |

#### 1. final

```java
// final 类：不能被继承
final class FinalClass {}

// final 方法：不能被重写
class Parent {
    final void show() {}
}

// final 变量：常量，不能修改
final int MAX = 100;
final List<String> list = new ArrayList<>();
list.add("item");  // ✓ 可以修改内容
// list = new ArrayList<>();  // ✗ 不能重新赋值
```

#### 2. finally

```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("捕获异常");
} finally {
    System.out.println("无论是否异常都会执行");
    // 通常用于关闭资源
}
```

#### 3. finalize（已废弃）

```java
@Override
protected void finalize() throws Throwable {
    // 对象被 GC 回收前调用
    // Java 9+ 已废弃，推荐使用 try-with-resources
    super.finalize();
}
```

#### 关键要点

- **final**：保证不可变性和安全性
- **finally**：保证资源释放，无论是否异常
- **finalize**：已废弃，不要使用

### 31. static 关键字的作用？

`static` 表示**静态的**，修饰的成员**属于类本身，而不属于某个对象实例**。所有实例共享静态成员。

#### 主要用途

1. **静态变量**：类级别的共享变量
2. **静态方法**：不依赖对象实例的方法
3. **静态代码块**：类加载时执行一次的初始化代码
4. **静态内部类**：不依赖外部类实例的嵌套类
5. **静态导入**：`import static` 导入静态成员

#### 关键特点

- 属于**类**，不属于对象
- 通过**类名**直接访问（也可通过对象访问，但不推荐）
- **类加载时初始化**，只有一份
- 所有实例**共享**静态成员

### 32. 什么是静态变量、静态方法、静态代码块？

```java
public class StaticDemo {
    // 1. 静态变量（类变量）
    private static int count = 0;

    // 2. 实例变量
    private int id;

    // 3. 静态代码块（类加载时执行一次）
    static {
        System.out.println("静态代码块执行");
        count = 10;
    }

    // 4. 实例代码块（每次创建对象时执行）
    {
        System.out.println("实例代码块执行");
    }

    // 5. 静态方法
    public static void staticMethod() {
        System.out.println("静态方法，count = " + count);
        // System.out.println(id);  // ✗ 不能访问实例变量
        // this.id = 1;             // ✗ 不能使用 this
    }

    // 6. 实例方法
    public void instanceMethod() {
        System.out.println("实例方法");
        System.out.println(count);  // ✓ 可以访问静态变量
        System.out.println(id);     // ✓ 可以访问实例变量
    }

    public static void main(String[] args) {
        // 调用静态方法（推荐用类名）
        StaticDemo.staticMethod();

        // 创建对象
        StaticDemo obj1 = new StaticDemo();
        StaticDemo obj2 = new StaticDemo();

        // 修改静态变量
        obj1.count = 100;
        System.out.println(obj2.count);  // 100（共享）
    }
}
```

#### 执行顺序

```
静态代码块 → 实例代码块 → 构造方法
```

### 33. 静态方法和实例方法的区别？

| 特性 | 静态方法 | 实例方法 |
|------|---------|---------|
| **修饰符** | static | 无 static |
| **调用方式** | `类名.方法名()` | `对象.方法名()` |
| **依赖对象** | 否 | 是 |
| **访问实例成员** | 不能 | 能 |
| **访问静态成员** | 能 | 能 |
| **使用 this/super** | 不能 | 能 |
| **重写** | 不能（可以隐藏） | 能 |

### 34. 能否在静态方法中访问非静态成员？

**不能**。静态方法属于类，加载时就存在，而非静态成员属于对象，需要创建对象后才存在。

```java
public class Demo {
    private int instanceVar = 10;
    private static int staticVar = 20;

    public static void staticMethod() {
        // System.out.println(instanceVar);  // ✗ 编译错误
        System.out.println(staticVar);       // ✓

        // 如果必须访问，需要创建对象
        Demo obj = new Demo();
        System.out.println(obj.instanceVar);  // ✓
    }
}
```

### 35. 什么是 transient 关键字？

`transient` 用于**修饰变量**，表示该变量**不参与序列化**。

```java
public class User implements Serializable {
    private String username;
    private transient String password;  // 不会被序列化

    // 序列化时，password 不会被保存
}
```

**使用场景**：敏感信息（密码）、派生字段、临时缓存数据。

### 36. 什么是 volatile 关键字？

`volatile` 用于**修饰变量**，保证多线程环境下的**可见性**和**有序性**（但不保证原子性）。

```java
public class VolatileDemo {
    private volatile boolean flag = false;

    // 线程 1
    public void writer() {
        flag = true;  // 修改立即对其他线程可见
    }

    // 线程 2
    public void reader() {
        while (!flag) {
            // 能及时看到 flag 的变化
        }
    }
}
```

**作用**：
- 保证**可见性**：一个线程修改后，其他线程立即能看到
- 禁止**指令重排序**
- **不保证原子性**：`volatile int count++` 不是线程安全的

**使用场景**：状态标志、双重检查锁定（DCL）。

### 37. 什么是 native 关键字？

`native` 用于修饰方法，表示该方法由**非 Java 代码实现**（通常是 C/C++），通过 JNI（Java Native Interface）调用。

```java
public class NativeDemo {
    // 本地方法声明（无方法体）
    public native void nativeMethod();

    static {
        // 加载本地库
        System.loadLibrary("nativeLib");
    }
}
```

**使用场景**：调用操作系统底层功能、性能优化、硬件交互。

**例子**：`Object.hashCode()` 是 native 方法。

### 38. 什么是 strictfp 关键字？

`strictfp`（strict floating-point）用于**修饰类或方法**，强制浮点运算**严格遵循 IEEE 754 标准**，保证跨平台结果一致。

```java
public strictfp class StrictDemo {
    public void calculate() {
        double result = 1.0 / 3.0;
        // 在不同平台上结果完全一致
    }
}
```

**作用**：消除不同硬件平台的浮点运算差异。

**注意**：Java 17+ 中，所有浮点运算默认严格，`strictfp` 变为可选。

## 异常处理

### 39. 异常处理机制？

Java 使用**异常对象**来表示程序运行时的错误，通过 `try-catch-finally` 机制处理异常。

#### 异常体系结构

```
Throwable
├── Error（错误，程序无法处理）
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── ...
└── Exception（异常，程序可以处理）
    ├── 受检异常（Checked Exception）
    │   ├── IOException
    │   ├── SQLException
    │   └── ...
    └── RuntimeException（非受检异常）
        ├── NullPointerException
        ├── ArrayIndexOutOfBoundsException
        └── ...
```

#### 异常处理方式

1. **try-catch**：捕获并处理异常
2. **throws**：声明方法可能抛出的异常
3. **throw**：主动抛出异常
4. **finally**：无论是否异常都执行的代码块

```java
try {
    // 可能抛出异常的代码
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // 捕获并处理异常
    System.out.println("除数不能为0");
} finally {
    // 总是执行（资源清理）
    System.out.println("finally 块执行");
}
```

### 40. Error 和 Exception 的区别？

| 特性 | Error | Exception |
|------|-------|-----------|
| **定义** | 严重的系统错误 | 程序可以处理的异常 |
| **是否可恢复** | 不可恢复 | 可恢复 |
| **是否需要捕获** | 不需要 | 受检异常必须捕获 |
| **典型例子** | OutOfMemoryError, StackOverflowError | IOException, SQLException |
| **处理方式** | 程序无法处理，应该终止 | 应该捕获并处理 |

```java
// Error 示例（不应该捕获）
public class ErrorDemo {
    public static void main(String[] args) {
        recursiveMethod();  // StackOverflowError
    }

    static void recursiveMethod() {
        recursiveMethod();  // 无限递归
    }
}

// Exception 示例（应该捕获）
public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            FileReader fr = new FileReader("file.txt");  // IOException
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 41. 受检异常和非受检异常的区别？

| 特性 | 受检异常（Checked） | 非受检异常（Unchecked） |
|------|-------------------|----------------------|
| **父类** | Exception（除 RuntimeException） | RuntimeException 及其子类 |
| **检查时机** | 编译时检查 | 运行时检查 |
| **是否必须处理** | 必须捕获或声明 | 不强制处理 |
| **典型例子** | IOException, SQLException | NullPointerException, IllegalArgumentException |
| **发生原因** | 外部因素（文件、网络） | 编程错误 |

```java
// 受检异常：必须处理
public void readFile() throws IOException {  // 必须声明
    FileReader fr = new FileReader("file.txt");
}

// 或者捕获
public void readFile() {
    try {
        FileReader fr = new FileReader("file.txt");
    } catch (IOException e) {
        e.printStackTrace();
    }
}

// 非受检异常：不强制处理
public void divideNumbers(int a, int b) {
    int result = a / b;  // 可能抛出 ArithmeticException，但不强制处理
}
```

### 42. throw 和 throws 的区别？

| 特性 | throw | throws |
|------|-------|--------|
| **位置** | 方法体内部 | 方法声明处 |
| **作用** | 抛出具体的异常对象 | 声明方法可能抛出的异常类型 |
| **数量** | 一次只能抛出一个异常对象 | 可以声明多个异常类型 |
| **语法** | `throw new Exception()` | `void method() throws Exception` |

```java
// throw：抛出异常对象
public void withdraw(double amount) {
    if (amount < 0) {
        throw new IllegalArgumentException("金额不能为负数");
    }
}

// throws：声明异常
public void readFile() throws IOException, FileNotFoundException {
    FileReader fr = new FileReader("file.txt");
}

// 组合使用
public void processFile() throws IOException {
    if (!fileExists()) {
        throw new FileNotFoundException("文件不存在");
    }
}
```

### 43. try-catch-finally 的执行顺序？

```java
public static int test() {
    try {
        System.out.println("1. try 块");
        return 1;  // 先暂存返回值
    } catch (Exception e) {
        System.out.println("2. catch 块");
        return 2;
    } finally {
        System.out.println("3. finally 块");
        // return 3;  // 不推荐：会覆盖 try/catch 的返回值
    }
}

// 输出：
// 1. try 块
// 3. finally 块
// 返回值：1
```

#### 执行顺序

1. **执行 try 块**
2. 如果有异常，**执行对应的 catch 块**
3. **一定执行 finally 块**（除非 JVM 退出）
4. **返回值**：
   - try/catch 中的 return 值会**先暂存**
   - finally 执行完后再返回
   - finally 中的 return 会**覆盖** try/catch 的返回值（不推荐）

### 44. finally 块一定会执行吗？

**几乎总是执行**，但有以下例外：

1. **JVM 提前退出**：`System.exit(0)`
2. **守护线程**：所有非守护线程结束时，守护线程的 finally 可能不执行
3. **死循环**：try 块中的死循环
4. **断电/kill 进程**：操作系统强制终止

```java
// 示例 1：正常执行
try {
    return 1;
} finally {
    System.out.println("finally 执行");  // ✓ 会执行
}

// 示例 2：JVM 退出，finally 不执行
try {
    System.exit(0);  // JVM 立即退出
} finally {
    System.out.println("finally 执行");  // ✗ 不会执行
}
```

### 45. try-with-resources 是什么？

Java 7 引入的**自动资源管理**机制，自动关闭实现了 `AutoCloseable` 接口的资源。

```java
// 传统方式（繁琐）
FileReader fr = null;
try {
    fr = new FileReader("file.txt");
    // 读取文件
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fr != null) {
        try {
            fr.close();  // 手动关闭
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// try-with-resources（推荐）
try (FileReader fr = new FileReader("file.txt")) {
    // 读取文件
} catch (IOException e) {
    e.printStackTrace();
}  // 自动调用 fr.close()
```

#### 特点

- **自动关闭资源**：退出 try 块时自动调用 `close()`
- **多资源管理**：可以同时管理多个资源
- **异常处理更简洁**：避免 finally 中的嵌套 try-catch

```java
// 多资源管理
try (FileInputStream fis = new FileInputStream("input.txt");
     FileOutputStream fos = new FileOutputStream("output.txt")) {
    // 操作两个流
}  // 自动关闭，关闭顺序与声明顺序相反
```

### 46. 如何自定义异常？

继承 `Exception`（受检异常）或 `RuntimeException`（非受检异常）。

```java
// 自定义受检异常
public class InsufficientBalanceException extends Exception {
    private double amount;

    public InsufficientBalanceException(String message, double amount) {
        super(message);
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }
}

// 自定义非受检异常
public class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(String message) {
        super(message);
    }
}

// 使用
public void withdraw(double amount) throws InsufficientBalanceException {
    if (balance < amount) {
        throw new InsufficientBalanceException("余额不足", amount - balance);
    }
}
```

#### 最佳实践

1. **命名**：以 `Exception` 结尾
2. **提供多个构造方法**：无参、带 message、带 cause
3. **选择父类**：外部因素用 Exception，编程错误用 RuntimeException
4. **添加必要字段**：保存异常相关的上下文信息

## 对象和类

### 47. 什么是对象？什么是类？

**类**是对象的**模板/蓝图**，定义了对象的属性和行为。
**对象**是类的**具体实例**，拥有实际的数据和状态。

```java
// 类：模板
public class Car {
    String brand;   // 属性
    int speed;

    void run() {    // 行为
        System.out.println("汽车在行驶");
    }
}

// 对象：实例
Car myCar = new Car();  // 创建对象
myCar.brand = "Tesla";
myCar.speed = 100;
myCar.run();
```

**类是对象的抽象，对象是类的具体化。**

### 48. 如何创建对象？

Java 有 **4 种**创建对象的方式：

```java
// 1. new 关键字（最常用）
Car car1 = new Car();

// 2. 反射
Class<?> clazz = Class.forName("Car");
Car car2 = (Car) clazz.newInstance();

// 3. clone() 方法
Car car3 = (Car) car1.clone();

// 4. 反序列化
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("car.obj"));
Car car4 = (Car) ois.readObject();
```

### 49. 对象的生命周期是怎样的？

1. **创建阶段**：通过 new 关键字分配内存，调用构造方法初始化
2. **使用阶段**：对象被引用，执行方法，访问属性
3. **不可达阶段**：没有任何引用指向该对象
4. **回收阶段**：GC 标记并回收内存

```java
Car car = new Car();  // 1. 创建
car.run();            // 2. 使用
car = null;           // 3. 不可达
// 4. 等待 GC 回收
```

### 50. 什么是方法签名？

方法签名 = **方法名 + 参数列表**（类型、顺序、数量）

**不包括**：返回值类型、访问修饰符、异常声明。

```java
// 方法签名：add(int, int)
public int add(int a, int b) { }

// 方法签名：add(double, double) - 不同签名，可以重载
public double add(double a, double b) { }

// ✗ 编译错误：签名相同，返回值不同
// public double add(int a, int b) { }
```

### 51. 什么是可变参数？如何使用？

可变参数允许方法接受**不定数量的参数**，本质是**数组**。

```java
// 语法：type... paramName
public static int sum(int... numbers) {
    int total = 0;
    for (int num : numbers) {
        total += num;
    }
    return total;
}

// 调用
sum(1, 2, 3);       // 传入 3 个参数
sum(1, 2, 3, 4, 5); // 传入 5 个参数
sum();              // 传入 0 个参数
```

**注意**：
- 可变参数必须是**最后一个参数**
- 一个方法**最多只能有一个**可变参数

### 52. Java 中参数传递是值传递还是引用传递？

Java **只有值传递**（pass by value）。

- **基本类型**：传递值的副本
- **引用类型**：传递引用的副本（对象地址的副本）

```java
public static void main(String[] args) {
    int num = 10;
    modify(num);
    System.out.println(num);  // 10（未改变）

    Person p = new Person("Tom");
    modifyPerson(p);
    System.out.println(p.name);  // "Jerry"（改变了）

    reassignPerson(p);
    System.out.println(p.name);  // "Jerry"（未改变）
}

static void modify(int n) {
    n = 20;  // 修改的是副本
}

static void modifyPerson(Person person) {
    person.name = "Jerry";  // 通过引用修改对象
}

static void reassignPerson(Person person) {
    person = new Person("Alice");  // 重新赋值的是副本
}
```

**关键**：传递的是引用的副本，不是引用本身。

### 53. 什么是浅拷贝和深拷贝？

| 特性 | 浅拷贝（Shallow Copy） | 深拷贝（Deep Copy） |
|------|---------------------|-------------------|
| **基本类型** | 复制值 | 复制值 |
| **引用类型** | 复制引用（共享对象） | 复制对象（新对象） |
| **独立性** | 修改会互相影响 | 完全独立 |

```java
class Person implements Cloneable {
    String name;
    Address address;  // 引用类型

    // 浅拷贝
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();  // 只复制引用，不复制 address 对象
    }

    // 深拷贝
    public Person deepClone() {
        Person copy = new Person();
        copy.name = this.name;
        copy.address = new Address(this.address.city);  // 复制新对象
        return copy;
    }
}
```

### 54. 如何实现对象克隆？

实现 `Cloneable` 接口，重写 `clone()` 方法。

```java
public class Person implements Cloneable {
    private String name;
    private int age;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();  // 浅拷贝
    }

    // 使用
    public static void main(String[] args) throws CloneNotSupportedException {
        Person p1 = new Person("Tom", 20);
        Person p2 = (Person) p1.clone();
    }
}
```

### 55. Object 类有哪些方法？

Object 是所有类的父类，主要方法：

```java
public class Object {
    // 1. 对象比较
    public boolean equals(Object obj) { }
    public int hashCode() { }

    // 2. 对象字符串表示
    public String toString() { }

    // 3. 对象克隆
    protected Object clone() throws CloneNotSupportedException { }

    // 4. 获取运行时类
    public final Class<?> getClass() { }

    // 5. 多线程相关
    public final void wait() throws InterruptedException { }
    public final void notify() { }
    public final void notifyAll() { }

    // 6. 垃圾回收（已废弃）
    protected void finalize() throws Throwable { }
}
```

### 56. hashCode() 和 equals() 的关系？

**关系**：
1. 两个对象 `equals()` 返回 true，`hashCode()` **必须相同**
2. 两个对象 `hashCode()` 相同，`equals()` **不一定** true（哈希冲突）
3. 重写 `equals()` **必须同时重写** `hashCode()`

```java
Person p1 = new Person("Tom", 20);
Person p2 = new Person("Tom", 20);

// 正确实现
p1.equals(p2);     // true
p1.hashCode() == p2.hashCode();  // true
```

### 57. 为什么重写 equals() 必须重写 hashCode()？

**原因**：保证对象在 `HashMap`、`HashSet` 等集合中的正确性。

```java
Person p1 = new Person("Tom", 20);
Person p2 = new Person("Tom", 20);

// 只重写 equals，不重写 hashCode
Set<Person> set = new HashSet<>();
set.add(p1);
set.add(p2);  // ✗ 会添加成功（hashCode 不同）

System.out.println(set.size());  // 2（错误！应该是 1）
```

**正确做法**：同时重写两个方法。

```java
@Override
public boolean equals(Object obj) {
    if (this == obj) return true;
    if (!(obj instanceof Person)) return false;
    Person p = (Person) obj;
    return age == p.age && Objects.equals(name, p.name);
}

@Override
public int hashCode() {
    return Objects.hash(name, age);
}
```

### 58. toString() 方法的作用是什么？

返回对象的**字符串表示**，用于调试和日志输出。

```java
// 默认实现：类名@哈希码
Person p = new Person("Tom", 20);
System.out.println(p);  // Person@15db9742

// 重写 toString
@Override
public String toString() {
    return "Person{name='" + name + "', age=" + age + "}";
}

System.out.println(p);  // Person{name='Tom', age=20}
```

**最佳实践**：使用 IDE 自动生成或 Lombok 的 `@ToString`。

## 反射

### 59. 什么是反射？反射的作用是什么？

**反射**（Reflection）是 Java 在**运行时**动态获取类信息、创建对象、调用方法的机制。

```java
// 普通方式：编译时确定
Person p = new Person();
p.setName("Tom");

// 反射方式：运行时动态
Class<?> clazz = Class.forName("Person");
Object obj = clazz.newInstance();
Method method = clazz.getMethod("setName", String.class);
method.invoke(obj, "Tom");
```

**作用**：
- 动态加载类
- 运行时获取类的结构（方法、字段、构造器）
- 动态创建对象和调用方法
- 突破访问权限限制

### 60. 如何获取 Class 对象？

```java
// 方式 1：Class.forName()
Class<?> clazz1 = Class.forName("java.lang.String");

// 方式 2：类名.class
Class<?> clazz2 = String.class;

// 方式 3：对象.getClass()
String str = "hello";
Class<?> clazz3 = str.getClass();

// 方式 4：类加载器
Class<?> clazz4 = ClassLoader.getSystemClassLoader().loadClass("java.lang.String");
```

### 61. 反射的优缺点是什么？

**优点**：
- **灵活性**：运行时动态操作类
- **扩展性**：实现插件化、框架开发

**缺点**：
- **性能开销**：比直接调用慢 10-100 倍
- **安全问题**：可以访问私有成员
- **代码可读性差**：不利于维护

### 62. 反射的应用场景有哪些？

1. **框架开发**：Spring 的依赖注入、Mybatis 的 ORM 映射
2. **动态代理**：AOP 实现
3. **序列化/反序列化**：JSON 转换
4. **JDBC**：根据配置加载数据库驱动
5. **单元测试**：JUnit 动态调用测试方法

## 泛型

### 63. 什么是泛型？泛型的作用是什么？

**泛型**允许在定义类、接口、方法时使用**类型参数**，实现代码复用和类型安全。

```java
// 不使用泛型
List list = new ArrayList();
list.add("hello");
list.add(123);  // 可以添加任意类型
String str = (String) list.get(1);  // 运行时 ClassCastException

// 使用泛型
List<String> list = new ArrayList<>();
list.add("hello");
// list.add(123);  // 编译错误
String str = list.get(0);  // 无需强转
```

**作用**：
- **类型安全**：编译时检查类型
- **消除强制类型转换**
- **代码复用**：一套代码适用多种类型

### 64. 泛型的类型参数有哪些？

常见命名约定：
- **T**：Type（类型）
- **E**：Element（元素）
- **K**：Key（键）
- **V**：Value（值）
- **N**：Number（数值）

```java
// 泛型类
class Box<T> {
    private T value;
}

// 泛型接口
interface List<E> {
    void add(E element);
}

// 泛型方法
public <T> T getFirst(List<T> list) {
    return list.get(0);
}
```

### 65. 什么是类型擦除？

Java 泛型在**编译后会被擦除**，运行时不存在泛型信息。

```java
List<String> list1 = new ArrayList<>();
List<Integer> list2 = new ArrayList<>();

// 编译后都变成 List，类型参数被擦除
list1.getClass() == list2.getClass();  // true
```

**原因**：保证与旧版本 Java 的兼容性。

**影响**：
- 不能创建泛型数组：`new T[10]` ✗
- 不能使用 instanceof：`obj instanceof List<String>` ✗

### 66. 泛型中的 extends 和 super 的区别？

| 特性 | extends（上界） | super（下界） |
|------|---------------|--------------|
| **语法** | `<? extends T>` | `<? super T>` |
| **含义** | T 或 T 的子类 | T 或 T 的父类 |
| **读取** | 可以（作为 T 读取） | 不安全（只能作为 Object） |
| **写入** | 不安全 | 可以（写入 T 及其子类） |
| **助记** | Producer Extends | Consumer Super |

```java
// extends：适合读取
List<? extends Number> list1 = new ArrayList<Integer>();
Number num = list1.get(0);  // ✓ 读取安全
// list1.add(123);  // ✗ 写入不安全

// super：适合写入
List<? super Integer> list2 = new ArrayList<Number>();
list2.add(123);  // ✓ 写入安全
Object obj = list2.get(0);  // ✓ 只能作为 Object 读取
```

**PECS 原则**：Producer Extends, Consumer Super

### 67. 什么是泛型通配符？

`?` 表示**未知类型**。

```java
// 无界通配符
List<?> list = new ArrayList<String>();

// 上界通配符
List<? extends Number> numbers = new ArrayList<Integer>();

// 下界通配符
List<? super Integer> integers = new ArrayList<Number>();
```

## 注解

### 68. 什么是注解？注解的作用是什么？

**注解**（Annotation）是一种**元数据**，为代码提供附加信息，不直接影响代码逻辑。

**作用**：
- **编译检查**：`@Override`、`@Deprecated`
- **配置信息**：Spring 的 `@Component`、`@Autowired`
- **代码生成**：Lombok 的 `@Data`

### 69. 常见的注解有哪些？

**内置注解**：
```java
@Override        // 重写方法
@Deprecated      // 已过时
@SuppressWarnings("unchecked")  // 抑制警告
@FunctionalInterface  // 函数式接口
```

**框架注解**：
```java
// Spring
@Component, @Service, @Repository, @Controller
@Autowired, @Value
@RequestMapping, @GetMapping

// JPA
@Entity, @Table, @Id, @Column

// Lombok
@Data, @Getter, @Setter, @ToString
```

### 70. 如何自定义注解？

```java
@Target(ElementType.METHOD)  // 作用在方法上
@Retention(RetentionPolicy.RUNTIME)  // 运行时可见
public @interface MyAnnotation {
    String value() default "";
    int count() default 0;
}

// 使用
@MyAnnotation(value = "test", count = 3)
public void myMethod() { }
```

### 71. 元注解有哪些？

元注解用于**修饰注解**：

```java
@Target      // 指定注解的使用位置（类、方法、字段等）
@Retention   // 指定注解的生命周期（SOURCE/CLASS/RUNTIME）
@Documented  // 注解是否包含在 JavaDoc 中
@Inherited   // 注解是否可被继承
@Repeatable  // 注解是否可重复使用（Java 8+）
```

### 72. 注解的应用场景有哪些？

1. **配置替代 XML**：Spring Boot 注解配置
2. **AOP 切面**：`@Transactional`、`@Async`
3. **数据校验**：`@NotNull`、`@Email`
4. **序列化控制**：Jackson 的 `@JsonProperty`
5. **测试框架**：JUnit 的 `@Test`、`@Before`

## 枚举

### 73. 什么是枚举？枚举的作用是什么？

**枚举**（Enum）是一种特殊的类，用于定义**一组固定的常量**。

```java
public enum Season {
    SPRING, SUMMER, AUTUMN, WINTER
}

// 使用
Season season = Season.SPRING;
```

**作用**：
- **类型安全**：不能赋值为枚举外的值
- **可读性强**：比整数常量更清晰
- **功能丰富**：可以有字段、方法

### 74. 如何定义枚举？

```java
// 简单枚举
public enum Color {
    RED, GREEN, BLUE
}

// 带字段和方法的枚举
public enum Status {
    SUCCESS(200, "成功"),
    ERROR(500, "失败");

    private int code;
    private String message;

    Status(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }
}
```

### 75. 枚举的特点是什么？

1. 枚举是 **final 类**，不能被继承
2. 构造器默认 **private**
3. 每个枚举常量是该类的 **static final 实例**
4. 自动继承 `java.lang.Enum`
5. 可以实现接口，但不能继承类
6. 支持 **switch** 语句

### 76. 枚举可以实现接口吗？

**可以**。

```java
interface Describable {
    String describe();
}

public enum Color implements Describable {
    RED {
        @Override
        public String describe() {
            return "红色";
        }
    },
    GREEN {
        @Override
        public String describe() {
            return "绿色";
        }
    }
}
```

## I/O 流

### 77. Java 中有哪些 I/O 流？

Java I/O 流分为两大类：**字节流**和**字符流**。

**字节流**（处理二进制数据）：
```
InputStream / OutputStream
├── FileInputStream / FileOutputStream
├── BufferedInputStream / BufferedOutputStream
├── DataInputStream / DataOutputStream
└── ObjectInputStream / ObjectOutputStream
```

**字符流**（处理文本数据）：
```
Reader / Writer
├── FileReader / FileWriter
├── BufferedReader / BufferedWriter
├── InputStreamReader / OutputStreamWriter
└── StringReader / StringWriter
```

### 78. 字节流和字符流的区别？

| 特性 | 字节流 | 字符流 |
|------|-------|-------|
| **基类** | InputStream / OutputStream | Reader / Writer |
| **处理单位** | 字节（8 bit） | 字符（16 bit） |
| **适用场景** | 所有类型文件（图片、视频、音频） | 文本文件 |
| **编码** | 无需考虑编码 | 需要处理字符编码 |
| **缓冲区** | 无默认缓冲 | 有默认缓冲 |

```java
// 字节流：复制图片
try (FileInputStream fis = new FileInputStream("image.jpg");
     FileOutputStream fos = new FileOutputStream("copy.jpg")) {
    byte[] buffer = new byte[1024];
    int len;
    while ((len = fis.read(buffer)) != -1) {
        fos.write(buffer, 0, len);
    }
}

// 字符流：读取文本
try (FileReader fr = new FileReader("test.txt");
     BufferedReader br = new BufferedReader(fr)) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}
```

### 79. 什么是缓冲流？为什么要使用缓冲流？

**缓冲流**在内存中提供缓冲区，减少 I/O 次数，提高效率。

```java
// 不使用缓冲流（效率低）
FileInputStream fis = new FileInputStream("file.txt");
int data;
while ((data = fis.read()) != -1) {  // 每次读 1 字节，频繁 I/O
    // 处理数据
}

// 使用缓冲流（效率高）
BufferedInputStream bis = new BufferedInputStream(new FileInputStream("file.txt"));
int data;
while ((data = bis.read()) != -1) {  // 内部批量读取到缓冲区
    // 处理数据
}
```

**优势**：
- **提高性能**：批量读写，减少系统调用
- **提供额外方法**：`BufferedReader.readLine()`

### 80. 什么是序列化和反序列化？

**序列化**：将对象转换为字节流，用于存储或网络传输。
**反序列化**：将字节流恢复为对象。

```java
// 序列化
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.ser"))) {
    Person p = new Person("Tom", 20);
    oos.writeObject(p);
}

// 反序列化
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.ser"))) {
    Person p = (Person) ois.readObject();
}
```

**应用场景**：
- 对象持久化（保存到文件/数据库）
- 网络传输（RPC、缓存）
- 深拷贝

### 81. 如何实现序列化？

实现 `Serializable` 接口（标记接口，无需实现方法）。

```java
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
    private transient String password;  // 不序列化

    // getter/setter
}
```

### 82. serialVersionUID 的作用是什么？

`serialVersionUID` 用于**验证序列化版本的一致性**。

```java
// 序列化时的版本
class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
}

// 反序列化时，如果类结构改变（添加字段）但 serialVersionUID 相同，可以兼容
class Person implements Serializable {
    private static final long serialVersionUID = 1L;  // 相同
    private String name;
    private int age;  // 新增字段
}

// 如果不指定 serialVersionUID，JVM 会自动生成
// 类结构改变后，自动生成的 ID 会变化，导致 InvalidClassException
```

**最佳实践**：显式声明 `serialVersionUID`。

### 83. 什么是 NIO？NIO 和 IO 的区别？

**NIO**（New I/O）是 Java 1.4 引入的新 I/O API，提供更高效的 I/O 操作。

| 特性 | 传统 I/O | NIO |
|------|---------|-----|
| **阻塞性** | 阻塞（Blocking） | 非阻塞（Non-blocking） |
| **面向** | 流（Stream） | 缓冲区（Buffer） + 通道（Channel） |
| **选择器** | 无 | Selector（多路复用） |
| **性能** | 较低 | 高（适合高并发） |
| **使用复杂度** | 简单 | 复杂 |

```java
// 传统 I/O
InputStream is = socket.getInputStream();
is.read(bytes);  // 阻塞直到数据到达

// NIO
Selector selector = Selector.open();
channel.register(selector, SelectionKey.OP_READ);
selector.select();  // 非阻塞，可以同时监听多个 channel
```

**应用场景**：
- **I/O**：少量连接，数据量大
- **NIO**：大量连接，数据量小（高并发服务器）

## 其他

### 84. Java 中的基本数据结构有哪些？

- **数组**：固定大小，随机访问
- **List**：ArrayList（动态数组）、LinkedList（双向链表）
- **Set**：HashSet（哈希表）、TreeSet（红黑树）
- **Map**：HashMap（哈希表）、TreeMap（红黑树）
- **Queue**：LinkedList、PriorityQueue（优先队列）
- **Stack**：栈（LIFO）

### 85. 数组和集合的区别？

| 特性 | 数组 | 集合 |
|------|-----|------|
| **长度** | 固定 | 动态 |
| **类型** | 基本类型 + 引用类型 | 只能存储引用类型（包装类） |
| **功能** | 简单 | 丰富（排序、查找等） |
| **性能** | 略高 | 略低 |

```java
// 数组
int[] arr = new int[10];  // 固定长度
arr[0] = 1;

// 集合
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
list.remove(0);
```

### 86. JDK、JRE、JVM 的区别？

```
JDK (Java Development Kit) - 开发工具包
├── JRE (Java Runtime Environment) - 运行环境
│   ├── JVM (Java Virtual Machine) - 虚拟机
│   └── Java 核心类库
└── 开发工具（javac、jar、javadoc 等）
```

- **JDK**：开发 Java 程序（包含 JRE + 编译器）
- **JRE**：运行 Java 程序（包含 JVM + 类库）
- **JVM**：执行字节码，跨平台核心

### 87. Java 是编译型语言还是解释型语言？

**两者都有**。

1. **.java → .class**：编译（javac）
2. **.class → 机器码**：JVM 解释执行 + JIT 编译优化

```
源代码(.java) → 编译 → 字节码(.class) → JVM 解释/JIT → 机器码
```

### 88. Java 的跨平台性是如何实现的？

通过 **JVM**（Java Virtual Machine）实现。

```
源代码 → 字节码（.class）→ JVM（不同平台）→ 机器码

Windows JVM、Linux JVM、Mac JVM 都能执行相同的字节码
```

**口号**："Write Once, Run Anywhere"（一次编写，到处运行）

### 89. 什么是字节码？

**字节码**（Bytecode）是 Java 编译后的中间代码（.class 文件），由 JVM 执行。

```
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}

// 编译后的字节码（部分）
0: getstatic     #2   // Field java/lang/System.out
3: ldc           #3   // String Hello
5: invokevirtual #4   // Method println
8: return
```

**特点**：
- **平台无关**：不是机器码，需要 JVM 翻译
- **可优化**：JIT 可以优化热点代码

### 90. Java 8 有哪些新特性？

1. **Lambda 表达式**：函数式编程
   ```java
   list.forEach(item -> System.out.println(item));
   ```

2. **Stream API**：流式操作集合
   ```java
   list.stream().filter(x -> x > 10).map(x -> x * 2).collect(Collectors.toList());
   ```

3. **Optional**：避免空指针
   ```java
   Optional<String> opt = Optional.ofNullable(str);
   opt.ifPresent(System.out::println);
   ```

4. **接口默认方法**：接口可以有实现
   ```java
   interface MyInterface {
       default void defaultMethod() {
           System.out.println("默认方法");
       }
   }
   ```

5. **新的日期时间 API**：LocalDate、LocalTime、LocalDateTime

6. **方法引用**：`System.out::println`

7. **CompletableFuture**：异步编程

8. **Nashorn JavaScript 引擎**：在 JVM 上运行 JS

---

**恭喜！Java 基础 90 题全部完成！🎉**
