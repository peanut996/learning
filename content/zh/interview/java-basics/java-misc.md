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
