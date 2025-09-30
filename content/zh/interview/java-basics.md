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

### 15. String 的常用方法有哪些？

## 面向对象

### 16. 面向对象的三大特性？

### 17. 重载（Overload）和重写（Override）的区别？

### 18. 抽象类和接口的区别？

### 19. 什么是构造方法？构造方法的特点是什么？

### 20. 什么是 this 关键字？this 的作用是什么？

### 21. 什么是 super 关键字？super 的作用是什么？

### 22. 什么是内部类？内部类有哪些分类？

### 23. 静态内部类和非静态内部类的区别？

### 24. 匿名内部类是什么？如何使用？

### 25. 什么是多态？多态的实现方式有哪些？

### 26. 什么是向上转型和向下转型？

### 27. 什么是 instanceof 关键字？

## 访问修饰符

### 28. Java 有哪些访问修饰符？它们的区别是什么？

### 29. public、protected、default、private 的访问范围是什么？

## 关键字

### 30. final、finally、finalize 的区别？

### 31. static 关键字的作用？

### 32. 什么是静态变量、静态方法、静态代码块？

### 33. 静态方法和实例方法的区别？

### 34. 能否在静态方法中访问非静态成员？

### 35. 什么是 transient 关键字？

### 36. 什么是 volatile 关键字？

### 37. 什么是 native 关键字？

### 38. 什么是 strictfp 关键字？

## 异常处理

### 39. 异常处理机制？

### 40. Error 和 Exception 的区别？

### 41. 受检异常和非受检异常的区别？

### 42. throw 和 throws 的区别？

### 43. try-catch-finally 的执行顺序？

### 44. finally 块一定会执行吗？

### 45. try-with-resources 是什么？

### 46. 如何自定义异常？

## 对象和类

### 47. 什么是对象？什么是类？

### 48. 如何创建对象？

### 49. 对象的生命周期是怎样的？

### 50. 什么是方法签名？

### 51. 什么是可变参数？如何使用？

### 52. Java 中参数传递是值传递还是引用传递？

### 53. 什么是浅拷贝和深拷贝？

### 54. 如何实现对象克隆？

### 55. Object 类有哪些方法？

### 56. hashCode() 和 equals() 的关系？

### 57. 为什么重写 equals() 必须重写 hashCode()？

### 58. toString() 方法的作用是什么？

## 反射

### 59. 什么是反射？反射的作用是什么？

### 60. 如何获取 Class 对象？

### 61. 反射的优缺点是什么？

### 62. 反射的应用场景有哪些？

## 泛型

### 63. 什么是泛型？泛型的作用是什么？

### 64. 泛型的类型参数有哪些？

### 65. 什么是类型擦除？

### 66. 泛型中的 extends 和 super 的区别？

### 67. 什么是泛型通配符？

## 注解

### 68. 什么是注解？注解的作用是什么？

### 69. 常见的注解有哪些？

### 70. 如何自定义注解？

### 71. 元注解有哪些？

### 72. 注解的应用场景有哪些？

## 枚举

### 73. 什么是枚举？枚举的作用是什么？

### 74. 如何定义枚举？

### 75. 枚举的特点是什么？

### 76. 枚举可以实现接口吗？

## I/O 流

### 77. Java 中有哪些 I/O 流？

### 78. 字节流和字符流的区别？

### 79. 什么是缓冲流？为什么要使用缓冲流？

### 80. 什么是序列化和反序列化？

### 81. 如何实现序列化？

### 82. serialVersionUID 的作用是什么？

### 83. 什么是 NIO？NIO 和 IO 的区别？

## 其他

### 84. Java 中的基本数据结构有哪些？

### 85. 数组和集合的区别？

### 86. JDK、JRE、JVM 的区别？

### 87. Java 是编译型语言还是解释型语言？

### 88. Java 的跨平台性是如何实现的？

### 89. 什么是字节码？

### 90. Java 8 有哪些新特性？
