# Java 基础面试题

## 数据类型

### 1. Java 的基本数据类型有哪些？各占多少字节？

Java 有 8 种基本数据类型：

| 类型 | 字节数 | 位数 | 取值范围 | 默认值 |
|------|--------|------|----------|--------|
| byte | 1 | 8 | -128 ~ 127 | 0 |
| short | 2 | 16 | -32768 ~ 32767 | 0 |
| int | 4 | 32 | -2^31 ~ 2^31-1 | 0 |
| long | 8 | 64 | -2^63 ~ 2^63-1 | 0L |
| float | 4 | 32 | IEEE 754 | 0.0f |
| double | 8 | 64 | IEEE 754 | 0.0d |
| char | 2 | 16 | 0 ~ 65535 | '\u0000' |
| boolean | 1 | 8 | true/false | false |

### 2. 自动装箱和拆箱是什么？

- **自动装箱（Autoboxing）**：基本类型自动转换为包装类型
- **自动拆箱（Unboxing）**：包装类型自动转换为基本类型

```java
// 自动装箱
Integer i = 10;  // 相当于 Integer i = Integer.valueOf(10);

// 自动拆箱
int n = i;  // 相当于 int n = i.intValue();
```

**注意事项**：
- 包装类型可能为 null，拆箱时会抛出 NullPointerException
- 频繁的装箱拆箱会影响性能

### 3. Integer 缓存机制？

Integer 对 -128 ~ 127 之间的整数进行了缓存：

```java
Integer a = 127;
Integer b = 127;
System.out.println(a == b);  // true，使用缓存

Integer c = 128;
Integer d = 128;
System.out.println(c == d);  // false，超出缓存范围
```

其他包装类也有类似缓存：
- Byte、Short、Long：-128 ~ 127
- Character：0 ~ 127
- Boolean：true 和 false

## 字符串

### 4. String 为什么设计成不可变的？

1. **安全性**：String 常用作 HashMap 的 key、参数等，不可变保证了 hashCode 不变
2. **线程安全**：不可变对象天然线程安全，无需同步
3. **字符串常量池优化**：相同内容的字符串可以共享内存
4. **防止被修改**：避免 URL、文件路径等关键参数被篡改

### 5. == 和 equals() 的区别？

- `==`：
  - 基本类型：比较值是否相等
  - 引用类型：比较内存地址是否相同

- `equals()`：
  - Object 默认实现是 ==
  - String、Integer 等重写了 equals()，比较内容

```java
String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1 == s2);        // false，不同对象
System.out.println(s1.equals(s2));   // true，内容相同

String s3 = "hello";
String s4 = "hello";
System.out.println(s3 == s4);        // true，字符串常量池
```

### 6. String、StringBuilder 和 StringBuffer 的区别？

| 特性 | String | StringBuilder | StringBuffer |
|------|--------|---------------|--------------|
| 可变性 | 不可变 | 可变 | 可变 |
| 线程安全 | 安全 | 不安全 | 安全（synchronized） |
| 性能 | 低 | 高 | 中 |
| 使用场景 | 少量字符串操作 | 单线程大量拼接 | 多线程大量拼接 |

性能对比：StringBuilder > StringBuffer > String

```java
// String 拼接（不推荐）
String s = "hello";
for (int i = 0; i < 1000; i++) {
    s += i;  // 每次都创建新对象
}

// StringBuilder 拼接（推荐）
StringBuilder sb = new StringBuilder("hello");
for (int i = 0; i < 1000; i++) {
    sb.append(i);  // 在原对象上修改
}
```

### 7. String 的 intern() 方法？

`intern()` 方法会将字符串放入字符串常量池：

```java
String s1 = new String("hello");
String s2 = s1.intern();
String s3 = "hello";

System.out.println(s1 == s2);  // false
System.out.println(s2 == s3);  // true，都指向常量池
```

## 面向对象

### 8. 面向对象的三大特性？

1. **封装（Encapsulation）**
   - 隐藏对象的属性和实现细节
   - 对外提供公共访问方式（getter/setter）
   - 提高安全性和可维护性

2. **继承（Inheritance）**
   - 子类继承父类的特征和行为
   - 实现代码复用
   - Java 只支持单继承

3. **多态（Polymorphism）**
   - 同一个行为具有多个不同表现形式
   - 编译时多态：方法重载（Overload）
   - 运行时多态：方法重写（Override）

### 9. 重载（Overload）和重写（Override）的区别？

**方法重载（Overload）**：
- 同一个类中，方法名相同，参数列表不同
- 与返回值类型无关
- 编译时多态

```java
public class Math {
    public int add(int a, int b) { return a + b; }
    public double add(double a, double b) { return a + b; }
    public int add(int a, int b, int c) { return a + b + c; }
}
```

**方法重写（Override）**：
- 子类重写父类的方法
- 方法名、参数列表必须相同
- 返回值类型相同或是其子类
- 访问权限不能更严格
- 运行时多态

```java
class Animal {
    public void makeSound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof");
    }
}
```

### 10. 抽象类和接口的区别？

| 特性 | 抽象类 | 接口 |
|------|--------|------|
| 关键字 | abstract class | interface |
| 继承/实现 | 单继承（extends） | 多实现（implements） |
| 成员变量 | 任意修饰符 | public static final |
| 方法 | 可以有抽象和非抽象方法 | JDK8前只有抽象方法<br>JDK8+可以有default和static方法<br>JDK9+可以有private方法 |
| 构造方法 | 可以有 | 不能有 |
| 访问修饰符 | 可以有public、protected | 方法默认public |

**使用场景**：
- 抽象类：表示"is-a"关系，有共同的属性和行为
- 接口：表示"can-do"关系，定义能力和规范

```java
// 抽象类示例
abstract class Animal {
    private String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public abstract void makeSound();
    
    public void sleep() {
        System.out.println("Sleeping...");
    }
}

// 接口示例
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

// 类可以继承一个抽象类，实现多个接口
class Duck extends Animal implements Flyable, Swimmable {
    public Duck(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println("Quack");
    }
    
    @Override
    public void fly() {
        System.out.println("Duck flying");
    }
    
    @Override
    public void swim() {
        System.out.println("Duck swimming");
    }
}
```

## 其他基础

### 11. Java 中的值传递和引用传递？

**Java 只有值传递，没有引用传递**。

- **基本类型**：传递的是值的副本
- **引用类型**：传递的是引用的副本（地址值）

```java
public void test() {
    int a = 10;
    changeValue(a);
    System.out.println(a);  // 10，不变
    
    Person p = new Person("Tom");
    changeName(p);
    System.out.println(p.name);  // "Jerry"，改变了
    
    changeReference(p);
    System.out.println(p.name);  // "Jerry"，不变
}

void changeValue(int x) {
    x = 20;  // 修改的是副本
}

void changeName(Person person) {
    person.name = "Jerry";  // 通过引用修改对象
}

void changeReference(Person person) {
    person = new Person("Alice");  // 修改的是引用的副本
}
```

### 12. final、finally、finalize 的区别？

- **final**：
  - 修饰类：类不能被继承
  - 修饰方法：方法不能被重写
  - 修饰变量：变量不能被修改（常量）

- **finally**：
  - try-catch-finally 中的 finally 块
  - 无论是否发生异常，finally 都会执行
  - 常用于资源释放

- **finalize**：
  - Object 类的方法，GC 回收对象前调用
  - 不推荐使用，使用 try-with-resources 代替

### 13. static 关键字的作用？

- **静态变量**：类变量，所有实例共享
- **静态方法**：类方法，通过类名调用
- **静态代码块**：类加载时执行，只执行一次
- **静态内部类**：不持有外部类的引用

```java
public class Demo {
    private static int count = 0;  // 静态变量
    
    static {  // 静态代码块
        System.out.println("Static block");
    }
    
    public static void increment() {  // 静态方法
        count++;
    }
    
    static class Inner {  // 静态内部类
        // ...
    }
}
```

**注意**：
- 静态方法不能访问非静态成员
- 静态方法中不能使用 this 和 super

### 14. 异常处理机制？

**异常层次结构**：
```
Throwable
├── Error（错误，程序无法处理）
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception（异常，程序可以处理）
    ├── RuntimeException（运行时异常，非受检异常）
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   └── ClassCastException
    └── IOException（受检异常，必须处理）
        ├── FileNotFoundException
        └── SQLException
```

**try-catch-finally**：
```java
try {
    // 可能抛出异常的代码
} catch (SpecificException e) {
    // 处理特定异常
} catch (Exception e) {
    // 处理其他异常
} finally {
    // 总是执行的代码
}
```

**try-with-resources**（推荐）：
```java
try (FileInputStream fis = new FileInputStream("file.txt")) {
    // 使用资源
} catch (IOException e) {
    // 处理异常
}
// 资源自动关闭
```
