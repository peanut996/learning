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
