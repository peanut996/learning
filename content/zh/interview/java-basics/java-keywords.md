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
