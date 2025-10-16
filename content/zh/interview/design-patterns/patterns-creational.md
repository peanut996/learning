## 创建型模式

### 单例模式

### 11. 什么是单例模式？单例模式的应用场景有哪些？

**核心答案**

单例模式（Singleton Pattern）是一种保证一个类在任何情况下都绝对只有一个实例，并提供一个全局访问点的创建型模式。

**详细说明**

1.  **三大要点**:
    *   **私有构造函数**: 防止外部通过 `new` 来创建多个实例。
    *   **私有静态实例**: 在类的内部自行创建一个唯一的实例。
    *   **公共静态访问方法**: 提供一个全局唯一的访问点（通常是 `getInstance()`）来获取这个实例。

2.  **应用场景**:
    *   **需要频繁创建和销毁，但实例是无状态或状态可共享的**：如线程池、数据库连接池、日志对象、Spring 中的 Bean 等。
    *   **需要保证全局唯一性的资源**: 如网站的计数器、应用程序的配置对象、操作系统的任务管理器（Task Manager）。
    *   **重量级对象，创建耗时耗资源**: 避免重复创建，节省系统资源，如读取配置文件的类。

### 12. 单例模式有哪些实现方式？

**核心答案**

主要有五种经典的实现方式：

1.  **饿汉式 (Eager Initialization)**: 类加载时就创建实例，线程安全。
2.  **懒汉式 (Lazy Initialization)**: 第一次调用 `getInstance()` 时才创建实例。
3.  **双重检查锁定 (Double-Checked Locking, DCL)**: 懒汉式的优化，兼顾性能和线程安全。
4.  **静态内部类 (Static Inner Class)**: 利用 JVM 类加载机制保证线程安全，实现懒加载。
5.  **枚举 (Enum)**: 最简洁、最安全的方式，能天然防止反射和序列化攻击。

### 13. 什么是饿汉式单例？优缺点是什么？

**核心答案**

饿汉式单例是在类加载时就立即初始化并创建单例对象的方式。

```java
public class EagerSingleton {
    // 1. 类加载时就创建实例
    private static final EagerSingleton INSTANCE = new EagerSingleton();

    // 2. 私有构造函数
    private EagerSingleton() {}

    // 3. 公共静态访问方法
    public static EagerSingleton getInstance() {
        return INSTANCE;
    }
}
```

**优缺点**

*   **优点**:
    *   **线程安全**: 实例在类加载时就创建好了，由 JVM 保证线程安全，不存在多线程同步问题。
    *   **实现简单**: 代码编写非常简单。
*   **缺点**:
    *   **不支持懒加载**: 无论是否使用该实例，它都会在类加载时被创建，可能造成内存浪费，尤其是在实例创建成本很高的情况下。

### 14. 什么是懒汉式单例？如何实现线程安全？

**核心答案**

懒汉式单例是在第一次被调用 `getInstance()` 方法时才创建实例。这种方式实现了延迟加载（Lazy Loading）。

**基础实现 (线程不安全)**

```java
public class LazySingleton {
    private static LazySingleton instance;
    private LazySingleton() {}

    public static LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
}
```

**如何实现线程安全**

1.  **使用 `synchronized` 关键字**: 最简单直接的方法是在 `getInstance()` 方法上加锁。
    ```java
    public static synchronized LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
    ```
    *   **缺点**: 性能开销大。每次调用 `getInstance()` 都会进行同步，但实际上只有第一次创建实例时才需要同步。

2.  **双重检查锁定 (DCL)**: 见下一个问题。

### 15. 什么是双重检查锁定（DCL）单例？为什么要用 volatile？

**核心答案**

双重检查锁定（Double-Checked Locking, DCL）是对懒汉式的一种优化，它通过在同步代码块内外进行两次 `null` 检查，来减少不必要的同步开销，从而提高性能。

```java
public class DCLSingleton {
    // 必须使用 volatile
    private static volatile DCLSingleton instance;
    private DCLSingleton() {}

    public static DCLSingleton getInstance() {
        // 第一次检查：如果实例已存在，则直接返回，无需加锁
        if (instance == null) {
            // 同步块：只有在实例为 null 时才进入，保证只有一个线程能创建实例
            synchronized (DCLSingleton.class) {
                // 第二次检查：防止多个线程同时通过第一次检查，只有一个能创建
                if (instance == null) {
                    instance = new DCLSingleton();
                }
            }
        }
        return instance;
    }
}
```

**为什么要用 `volatile`？**

*   **防止指令重排序**。
*   对象的创建过程 `instance = new DCLSingleton()` 在 JVM 中大致分为三步：
    1.  `memory = allocate()`: 分配对象的内存空间。
    2.  `ctorInstance(memory)`: 初始化对象。
    3.  `instance = memory`: 将 `instance` 引用指向分配的内存地址。
*   如果没有 `volatile`，JVM 可能会进行指令重排序，执行顺序可能变成 1 -> 3 -> 2。
*   **场景**: 线程 A 执行到第 3 步，`instance` 已经不为 `null`，但对象还未初始化。此时线程 B 调用 `getInstance()`，发现 `instance` 不为 `null`，就直接返回一个**未完全初始化**的对象，使用时就会出错。
*   `volatile` 关键字可以禁止指令重排序，确保对象的创建过程（1-2-3）是有序的，从而保证 DCL 的正确性。

### 16. 什么是静态内部类单例？

**核心答案**

静态内部类单例是利用 Java 的类加载机制来保证线程安全和懒加载的一种实现方式。它被认为是实现单例模式的最佳方式之一。

```java
public class StaticInnerClassSingleton {
    private StaticInnerClassSingleton() {}

    // 静态内部类
    private static class SingletonHolder {
        private static final StaticInnerClassSingleton INSTANCE = new StaticInnerClassSingleton();
    }

    public static StaticInnerClassSingleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```

**工作原理**

1.  **懒加载**: 只要不访问 `SingletonHolder` 内部类，它就不会被加载，因此其内部的 `INSTANCE` 也不会被创建。只有当 `getInstance()` 方法被第一次调用时，JVM 才会加载 `SingletonHolder` 类，从而创建实例。
2.  **线程安全**: 类的加载过程是由 JVM 保证线程安全的。当一个线程正在加载 `SingletonHolder` 类时，其他线程会阻塞等待，确保 `INSTANCE` 只会被初始化一次。

### 17. 什么是枚举单例？为什么推荐使用枚举实现单例？

**核心答案**

枚举单例是利用枚举类型天然的单例特性来实现的单例模式。这是《Effective Java》作者 Joshua Bloch 极力推荐的方式。

```java
public enum EnumSingleton {
    INSTANCE;

    public void doSomething() {
        System.out.println("Doing something...");
    }
}
```

**为什么推荐使用？**

1.  **实现极其简单**: 代码量最少，可读性好。
2.  **线程安全**: 由 JVM 保证，绝对线程安全。
3.  **防止反射攻击**: 枚举类的构造函数是私有的，并且在 `java.lang.reflect.Constructor` 类的源码中，明确禁止通过反射创建枚举实例。
4.  **防止序列化攻击**: Java 的序列化机制对枚举类型有特殊处理，在反序列化时不会创建新的实例，而是返回已有的枚举实例。

### 18. 如何防止单例模式被反射破坏？

**核心答案**

除了枚举单例天然防反射外，其他单例模式可以通过在**私有构造函数中添加检查逻辑**来防止反射攻击。

**实现方式**

在私有构造函数中判断实例是否已经存在，如果存在，则直接抛出异常。

```java
public class EagerSingleton {
    private static final EagerSingleton INSTANCE = new EagerSingleton();

    private EagerSingleton() {
        // 防止反射攻击
        if (INSTANCE != null) {
            throw new RuntimeException("单例模式禁止反射调用构造函数!");
        }
    }

    public static EagerSingleton getInstance() {
        return INSTANCE;
    }
}
```
*   **注意**: 这种方式对懒汉式（包括DCL）无效，因为在反射调用构造函数时，`instance` 仍然是 `null`。

### 19. 如何防止单例模式被序列化破坏？

**核心答案**

除了枚举单例天然防序列化外，其他单例模式可以通过在类中定义一个 `readResolve()` 方法来防止序列化攻击。

**实现方式**

在反序列化时，如果类中定义了 `readResolve()` 方法，JVM 会调用该方法并返回其结果，而不是创建一个新的对象。

```java
import java.io.Serializable;

public class SerializableSingleton implements Serializable {
    private static final SerializableSingleton INSTANCE = new SerializableSingleton();
    private SerializableSingleton() {}

    public static SerializableSingleton getInstance() {
        return INSTANCE;
    }

    // 在反序列化时，直接返回已有的单例对象
    private Object readResolve() {
        return INSTANCE;
    }
}
```

### 20. Spring 中的单例 Bean 是线程安全的吗？

**核心答案**

**Bean 本身不是线程安全的**。Spring 框架中的单例 Bean 默认是“单例”的，但这仅表示在整个 Spring IoC 容器中，该 Bean **只有一个实例**。线程安全问题需要开发者自己来保证。

**详细说明**

1.  **无状态 Bean**: 如果 Bean 是无状态的（Stateless），即它没有任何成员变量，或者成员变量都是不可变的（如 `final` 常量、`String`、`Integer`），那么它就是线程安全的。例如，Controller、Service、DAO 等通常设计为无状态的。
2.  **有状态 Bean**: 如果 Bean 是有状态的（Stateful），即它拥有可变的成员变量，并且这些变量在多线程环境下会被修改，那么它就是线程不安全的。
3.  **如何保证线程安全**:
    *   **改变作用域**: 将 Bean 的作用域从 `singleton` 改为 `prototype`，这样每次请求都会创建一个新的 Bean 实例，但会牺牲性能。
    *   **使用 `ThreadLocal`**: 为每个线程维护一个独立的变量副本，避免线程间共享。
    *   **加锁**: 使用 `synchronized` 或 `ReentrantLock` 等同步机制来保护共享资源。
    *   **避免使用成员变量**: 尽量不要在 Bean 中定义可变的成员变量。

---

### 工厂模式

### 21. 什么是简单工厂模式？优缺点是什么？

**核心答案**

简单工厂模式（Simple Factory Pattern）定义了一个工厂类，它可以根据传入的参数来动态决定创建哪一个产品类的实例。它不属于 GoF 23 种设计模式，但被广泛使用。

**详细说明**

1.  **角色**:
    *   `Factory` (工厂类): 负责实现创建所有实例的内部逻辑。
    *   `Product` (抽象产品): 所有被创建对象的父类，封装了这些对象的公共方法。
    *   `ConcreteProduct` (具体产品): 实现了抽象产品接口，是工厂类创建的目标。

2.  **优缺点**:
    *   **优点**: 实现简单，客户端可以免除直接创建对象的责任，实现了创建和使用的分离。
    *   **缺点**:
        *   **违反开闭原则**: 当需要增加新的产品时，必须修改工厂类中的判断逻辑（通常是 `if-else` 或 `switch-case`），这不符合“对修改关闭”的原则。
        *   **职责过重**: 工厂类集中了所有产品的创建逻辑，如果产品种类非常多，工厂类的代码会变得非常臃ăpadă和难以维护。

**示例代码**

```java
// 工厂类
public class ShapeFactory {
    public Shape getShape(String shapeType) {
        if ("CIRCLE".equalsIgnoreCase(shapeType)) {
            return new Circle();
        } else if ("SQUARE".equalsIgnoreCase(shapeType)) {
            return new Square();
        }
        return null;
    }
}
```

### 22. 什么是工厂方法模式？与简单工厂的区别是什么？

**核心答案**

工厂方法模式（Factory Method Pattern）定义了一个用于创建对象的接口，但让子类决定实例化哪一个类。它将对象的创建延迟到子类中进行。

**详细说明**

1.  **角色**:
    *   `AbstractFactory` (抽象工厂): 声明了创建产品的工厂方法。
    *   `ConcreteFactory` (具体工厂): 实现了抽象工厂的接口，负责创建具体的产品对象。
    *   `Product` (抽象产品): 同简单工厂。
    *   `ConcreteProduct` (具体产品): 同简单工厂。

2.  **与简单工厂的区别**:
    *   **核心区别**: 简单工厂只有一个工厂类，负责所有产品的创建；而工厂方法模式为每一种产品都提供一个专门的工厂，形成了一个工厂的“族系”。
    *   **原则**: 简单工厂违反了开闭原则，而工厂方法模式遵循了开闭原则。当需要新增产品时，只需增加一个新的具体产品类和一个对应的具体工厂类即可，无需修改任何现有代码。

<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.abox{stroke:#666;stroke-width:1;fill:#e0f7fa;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}.darrow{stroke:#999;stroke-width:1;fill:none;stroke-dasharray:4;}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
    <rect x="20" y="20" width="120" height="40" rx="5" class="abox"/><text x="80" y="45" text-anchor="middle" class="text">&lt;interface&gt; Factory</text>
    <rect x="20" y="140" width="120" height="40" rx="5" class="box"/><text x="80" y="165" text-anchor="middle" class="text">CircleFactory</text>
    <rect x="260" y="20" width="120" height="40" rx="5" class="abox"/><text x="320" y="45" text-anchor="middle" class="text">&lt;interface&gt; Shape</text>
    <rect x="260" y="140" width="120" height="40" rx="5" class="box"/><text x="320" y="165" text-anchor="middle" class="text">Circle</text>
    <path class="arrow" d="M80,60 v60"/><text x="95" y="100" class="text" font-size="10">实现</text>
    <path class="arrow" d="M320,60 v60"/><text x="335" y="100" class="text" font-size="10">实现</text>
    <path class="darrow" d="M140,160 h120"/><text x="200" y="155" class="text" font-size="10" fill="#777">创建</text>
</svg>

### 23. 什么是抽象工厂模式？与工厂方法的区别是什么？

**核心答案**

抽象工厂模式（Abstract Factory Pattern）提供一个接口，用于创建**一系列相关或相互依赖的对象**（即产品族），而无需指定它们具体的类。

**详细说明**

1.  **产品族 (Product Family)**: 指的是位于不同产品等级结构中，功能相关联的产品组成的集合。例如，一个 UI 皮肤库，包含 `Button`、`TextField`、`Checkbox`，那么 "蓝色主题" 就是一个产品族，包含 `BlueButton`、`BlueTextField`、`BlueCheckbox`；"红色主题"是另一个产品族。

2.  **与工厂方法的区别**:
    *   **关注点不同**:
        *   **工厂方法模式**: 关注的是**单个产品**的创建。一个具体工厂只生产一种具体的产品。
        *   **抽象工厂模式**: 关注的是**多个产品族**的创建。一个具体工厂生产一整套（一个家族）的产品。
    *   **复杂度**: 抽象工厂模式通常比工厂方法模式更复杂，因为它处理的是产品族。可以说，当工厂方法模式中需要创建的对象变得更多、更复杂时，就可以考虑升级为抽象工厂模式。

### 24. 工厂模式的应用场景有哪些？

**核心答案**

*   **简单工厂**: 当需要创建的对象较少，且不经常变化时。
*   **工厂方法**: 当一个类不知道它所需要的对象的类，或者希望由子类来指定创建的对象时。例如，日志记录器，可以有文件日志工厂、数据库日志工厂等。
*   **抽象工厂**: 当系统需要与多个产品系列中的一个进行配置，且不依赖于这些产品的具体类时。例如，切换应用的 UI 主题（如暗黑模式/明亮模式）、更换数据库访问层（从 MySQL 切换到 Oracle）。

**通用场景**

*   任何需要将对象的创建和使用解耦的地方。
*   JDK 中的 `Calendar.getInstance()`、`NumberFormat.getInstance()`。
*   Spring 中的 `BeanFactory`。
*   JDBC 中的 `Connection` 对象的获取。

### 25. Spring 中哪些地方使用了工厂模式？

**核心答案**

Spring 框架的核心就是一个巨大的工厂。最典型的应用是 `BeanFactory` 和 `ApplicationContext`。

**详细说明**

1.  **`BeanFactory`**: 这是 Spring IoC 容器的顶层接口，是典型的工厂模式。它负责创建和管理在 Spring 容器中注册的所有 Bean。开发者通过 `getBean()` 方法向工厂索要对象，而无需关心 Bean 是如何创建和装配的。
2.  **`ApplicationContext`**: `BeanFactory` 的子接口，提供了更高级的功能，如事件发布、国际化支持等，但其核心职责仍然是作为 Bean 的工厂。
3.  **FactoryBean 接口**: 这是一个特殊的 Bean，当你在容器中请求这个 Bean 时，Spring 返回的不是 `FactoryBean` 本身，而是它内部 `getObject()` 方法所创建的对象。这是一种可以自定义 Bean 创建过程的工厂模式应用。

### 建造者模式

### 26. 什么是建造者模式？建造者模式的作用是什么？

**核心答案**

建造者模式（Builder Pattern）将一个复杂对象的构建过程与其表示分离，使得同样的构建过程可以创建不同的表示。

**详细说明**

1.  **核心思想**: 一步一步地创建一个复杂的对象。它允许用户只通过指定复杂对象的类型和内容就可以构建它们，用户不需要知道内部的具体构建细节。

2.  **角色**:
    *   `Product` (产品): 最终要创建的复杂对象。
    *   `Builder` (抽象建造者): 为创建一个 `Product` 对象的各个部件指定抽象接口。
    *   `ConcreteBuilder` (具体建造者): 实现 `Builder` 接口，构造和装配产品的各个部件。
    *   `Director` (指挥者): 构造一个使用 `Builder` 接口的对象。它负责安排构建的顺序，隔离了客户与对象的生产过程。

3.  **作用**:
    *   **封装性好**: 将构建代码与表示代码分离。
    *   **易于扩展**: 可以方便地增加新的具体建造者，而无需修改已有代码。
    *   **更好的控制**: 客户端可以更好地控制构建过程，因为 `Director` 封装了构建顺序。

### 27. 建造者模式和工厂模式的区别是什么？

**核心答案**

*   **建造者模式**：关注的是**分步构建**一个复杂对象，强调的是构建的过程。同一个构建过程可以得到不同的产品。
*   **工厂模式**：关注的是**直接创建**一个完整的对象，强调的是创建的结果。

**详细对比**

| 特性 | 建造者模式 | 工厂模式 |
| --- | --- | --- |
| **关注点** | 创建复杂对象的**过程** | 创建对象的**结果** |
| **粒度** | 更细，一步步构建 | 更粗，一次性创建 |
| **产品** | 对象的各个部分不同，但最终结构相似 | 各个产品实现同一接口，但内部实现不同 |
| **典型场景** | `StringBuilder`、MyBatis 的 `SqlSessionFactoryBuilder` | Spring `BeanFactory`、`Calendar.getInstance()` |

### 28. 建造者模式的应用场景有哪些？

**核心答案**

*   当需要创建的对象具有很多部分，且这些部分的装配顺序或方式可以变化时。
*   当一个对象的构建过程非常复杂，需要将其与它的表示分离开来时。
*   当需要创建的对象属性之间有依赖关系或约束条件时。

**具体例子**

*   `StringBuilder` 或 `StringBuffer` 的 `append()` 方法。
*   Lombok 的 `@Builder` 注解。
*   MyBatis 的 `SqlSessionFactoryBuilder` 用于构建 `SqlSessionFactory`。
*   Spring Boot 中的 `SpringApplicationBuilder`。
*   构建复杂的查询 SQL 语句。

### 29. StringBuilder 使用了什么设计模式？

**核心答案**

`StringBuilder` 主要使用了**建造者模式**。

**详细说明**

`StringBuilder` 的 `append()` 方法返回 `this` (即 `StringBuilder` 对象本身)，这使得我们可以进行链式调用，如 `new StringBuilder().append("a").append("b").append("c")`。

这个过程完美符合建造者模式的特点：
1.  **分步构建**: 每次 `append` 都是在构建最终字符串的一部分。
2.  **链式调用**: 返回自身，方便连续构建。
3.  **构建与表示分离**: 用户只管调用 `append`，无需关心内部 `char` 数组的扩容等复杂细节。
4.  **最终获取结果**: 最后通过 `toString()` 方法得到最终的 `String` 产品。


### 原型模式

### 30. 什么是原型模式？原型模式的作用是什么？

**核心答案**

原型模式（Prototype Pattern）是一种创建型设计模式，它允许我们通过复制一个已经存在的实例（称为“原型”）来创建新的对象，而无需关心其具体的创建细节。简而言之，就是“克隆一个对象，而不是从头 `new` 一个”。

**详细说明**

1.  **核心思想**:
    *   不通过调用构造函数来创建对象，而是通过 `clone` 方法从一个原型对象中复制出一个一模一样的新对象。
    *   被复制的对象就是“原型”，它需要实现一个 `clone` 接口，用于返回自身的克隆。

2.  **UML 结构与角色**:
    *   `Prototype` (抽象原型类): 声明一个克隆自身的接口，通常是 `clone()` 方法。在 Java 中，可以通过实现 `Cloneable` 接口来标记该类是可克隆的。
    *   `ConcretePrototype` (具体原型类): 实现 `Prototype` 接口，重写 `clone()` 方法，完成具体的克隆操作。
    *   `Client` (客户端): 让一个原型对象克隆自身，从而获得一个新的对象。

3.  **作用与价值**:
    *   **提升性能**: 当对象的创建过程非常复杂或耗时（例如，需要访问数据库、RPC 调用、复杂的计算等），直接克隆一个已有的对象会比重新 `new` 一个并进行初始化快得多。
    *   **简化对象创建**: 避免了重复的初始化代码，并且可以动态地获取对象的运行时状态进行克隆。
    *   **解耦**: 客户端代码无需知道具体的子类名，只需通过抽象原型接口来克隆对象即可。

<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.abox{stroke:#666;stroke-width:1;fill:#e0f7fa;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}.darrow{stroke:#999;stroke-width:1;fill:none;stroke-dasharray:4;marker-end:url(#darrowhead);}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker><marker id="darrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#999"/></marker></defs>
    <rect x="20" y="80" width="100" height="40" rx="5" class="box"/><text x="70" y="105" text-anchor="middle" class="text">Client</text>
    <rect x="170" y="20" width="160" height="40" rx="5" class="abox"/><text x="250" y="45" text-anchor="middle" class="text">&lt;interface&gt; Prototype</text>
    <rect x="170" y="140" width="160" height="40" rx="5" class="box"/><text x="250" y="165" text-anchor="middle" class="text">ConcretePrototype</text>
    <path class="arrow" d="M250,60 v60"/><text x="265" y="100" class="text" font-size="10">实现</text>
    <path class="darrow" d="M120,100 h50"/><text x="145" y="95" class="text" font-size="10" fill="#777">使用</text>
    <path class="darrow" d="M250,140 c-100,-20 -100,-100 0,-120" stroke-dasharray="4 2"/><text x="310" y="80" class="text" font-size="10" fill="#777">clone()</text>
</svg>

4.  **记忆口诀**:
    *   **克隆代替构造，省时又高效。**

### 31. 什么是浅拷贝和深拷贝？

**核心答案**

*   **浅拷贝 (Shallow Copy)**: 只复制对象本身及其包含的基本数据类型的值。对于对象中的引用类型成员，只复制其**引用地址**，而不复制引用所指向的对象。因此，原对象和克隆对象会共享同一个引用类型的成员对象。
*   **深拷贝 (Deep Copy)**: 除了复制对象本身，还会**递归地复制**对象中所包含的所有引用类型的成员对象。最终，原对象和克隆对象是完全独立的，没有任何共享的成员对象。

**详细说明与图解**

假设有一个 `Order` 对象，它包含一个基本类型 `id` 和一个引用类型 `Address`。

*   **浅拷贝之后**:
    *   会创建一个新的 `Order` 对象。
    *   新 `Order` 对象的 `id` 字段会被赋予和原对象相同的值。
    *   新 `Order` 对象的 `address` 字段会指向**和原对象完全相同的 `Address` 对象**。
    *   **后果**: 如果你修改了原 `Order` 的地址信息（`order.getAddress().setCity("New York")`），那么克隆出来的 `Order` 的地址信息也会随之改变，因为它们共享同一个 `Address` 实例。

*   **深拷贝之后**:
    *   会创建一个新的 `Order` 对象。
    *   会创建一个新的 `Address` 对象，其内容和原 `Address` 对象完全相同。
    *   新 `Order` 对象的 `id` 字段会被赋予和原对象相同的值。
    *   新 `Order` 对象的 `address` 字段会指向**这个新创建的 `Address` 对象**。
    *   **后果**: 两个 `Order` 对象完全独立。修改其中一个的地址信息，不会影响另一个。

**可视化对比**

<svg width="500" height="250" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.mem{stroke:#ccc;stroke-width:1;fill:#f9f9f9;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
    <text x="125" y="20" text-anchor="middle" font-weight="bold">浅拷贝 (Shallow Copy)</text>
    <rect x="25" y="40" width="100" height="50" rx="5" class="box"/><text x="75" y="60" text-anchor="middle" class="text">Original Order</text><text x="40" y="80" class="text">id: 101</text>
    <rect x="125" y="40" width="100" height="50" rx="5" class="box"/><text x="175" y="60" text-anchor="middle" class="text">Cloned Order</text><text x="140" y="80" class="text">id: 101</text>
    <rect x="75" y="150" width="100" height="40" rx="5" class="mem"/><text x="125" y="175" text-anchor="middle" class="text">Address Object</text>
    <path class="arrow" d="M75,90 v45 l25,15"/><path class="arrow" d="M175,90 v45 l-25,15"/>
    <text x="170" y="125" text-anchor="middle" class="text" fill="#d32f2f" font-weight="bold">共享引用</text>

    <text x="375" y="20" text-anchor="middle" font-weight="bold">深拷贝 (Deep Copy)</text>
    <rect x="275" y="40" width="100" height="50" rx="5" class="box"/><text x="325" y="60" text-anchor="middle" class="text">Original Order</text><text x="290" y="80" class="text">id: 101</text>
    <rect x="400" y="40" width="100" height="50" rx="5" class="box"/><text x="450" y="60" text-anchor="middle" class="text">Cloned Order</text><text x="415" y="80" class="text">id: 101</text>
    <rect x="275" y="150" width="100" height="40" rx="5" class="mem"/><text x="325" y="175" text-anchor="middle" class="text">Address Obj 1</text>
    <rect x="400" y="150" width="100" height="40" rx="5" class="mem"/><text x="450" y="175" text-anchor="middle" class="text">Address Obj 2</text>
    <path class="arrow" d="M325,90 v60"/><path class="arrow" d="M450,90 v60"/>
    <text x="390" y="125" text-anchor="middle" class="text" fill="#2e7d32" font-weight="bold">独立对象</text>
</svg>

### 32. 如何实现深拷贝？

**核心答案**

实现深拷贝主要有三种方式：

1.  **递归克隆 (Recursive Cloning)**: 重写 `clone()` 方法，在方法内部不仅克隆当前对象，还手动克隆其包含的所有引用类型对象。
2.  **序列化 (Serialization)**: 将对象写入字节流再从中读出，利用 Java 的序列化机制来创建一个全新的对象图。
3.  **第三方库 (Third-party Libraries)**: 使用如 Apache Commons Lang, Gson, Jackson 等库提供的工具类来简化深拷贝过程。

**详细说明**

1.  **方法一：递归克隆**
    *   **步骤**:
        1.  让需要被拷贝的类（包括其成员引用类型）都实现 `Cloneable` 接口。
        2.  重写 `clone()` 方法。
        3.  在 `clone()` 方法中，首先调用 `super.clone()` 来获得一个当前对象的浅拷贝。
        4.  然后，对该对象中的每一个引用类型成员，都手动调用其 `clone()` 方法，并将返回的新对象赋值给拷贝出对象的对应成员。
    *   **示例**:
        ```java
        class Address implements Cloneable {
            // ...
            @Override
            public Object clone() throws CloneNotSupportedException {
                return super.clone();
            }
        }

        class Order implements Cloneable {
            private int id;
            private Address address;
            // ...
            @Override
            public Object clone() throws CloneNotSupportedException {
                // 1. 先进行浅拷贝
                Order clonedOrder = (Order) super.clone();
                // 2. 对引用类型成员进行深拷贝
                clonedOrder.address = (Address) this.address.clone();
                return clonedOrder;
            }
        }
        ```
    *   **优缺点**: 性能最高，但实现复杂，容易出错（例如忘记克隆某个字段）。

2.  **方法二：序列化**
    *   **步骤**:
        1.  让需要被拷贝的类（包括其所有成员引用类型）都实现 `Serializable` 接口。
        2.  使用 `ObjectOutputStream` 将原始对象写入一个 `ByteArrayOutputStream`（内存中的字节数组输出流）。
        3.  使用 `ObjectInputStream` 从这个 `ByteArrayOutputStream` 中读取字节，并反序列化成一个新的对象。
    *   **示例工具类**:
        ```java
        public class CloneUtils {
            public static <T extends Serializable> T clone(T obj) {
                try {
                    ByteArrayOutputStream bout = new ByteArrayOutputStream();
                    ObjectOutputStream oos = new ObjectOutputStream(bout);
                    oos.writeObject(obj);

                    ByteArrayInputStream bin = new ByteArrayInputStream(bout.toByteArray());
                    ObjectInputStream ois = new ObjectInputStream(bin);
                    return (T) ois.readObject();
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }
        ```
    *   **优缺点**: 实现简单，不易出错，是真正的深拷贝。但性能开销比递归克隆大，并且要求所有相关类都必须实现 `Serializable` 接口。

3.  **方法三：第三方库**
    *   **示例 (Gson)**: 利用 JSON 序列化和反序列化来实现。
        ```java
        Gson gson = new Gson();
        String json = gson.toJson(originalObject);
        MyClass clonedObject = gson.fromJson(json, MyClass.class);
        ```
    *   **优缺点**: 非常方便，代码简洁。但性能通常不如前两种，且对对象的构造函数有一定要求（如需要无参构造函数）。

### 33. 原型模式的应用场景有哪些？

**核心答案**

原型模式主要适用于以下三大场景：

1.  **创建成本高昂**: 当一个对象的创建需要消耗大量资源，如复杂的计算、数据库查询、网络I/O等。
2.  **批量创建相似对象**: 当需要在一个循环中创建大量结构相同或相似的对象。
3.  **状态复杂的对象复制**: 当需要保存对象的某个特定时刻的状态，并基于这个状态创建新对象时，例如撤销/重做、游戏存档等。

**详细说明**

*   **场景一：创建成本高昂**
    *   **例子**: 假设有一个 `Report` 对象，它的生成需要从多个数据源拉取数据，并进行复杂的统计分析，整个过程可能耗时数秒。如果需要基于这份报告做一些微调，生成多份相似的报告，那么每次都重新生成就太浪费时间了。此时，可以先生成一个“模板报告”（原型），然后通过 `clone()` 快速复制多份，再在新对象上进行微调。

*   **场景二：批量创建相似对象**
    *   **例子**: 在一个游戏中，需要在一瞬间生成 100 个属性完全相同的“小兵”敌人。如果使用 `new` 关键字循环 100 次，会频繁地调用构造函数和进行初始化。更好的方法是先创建一个“小兵原型”，然后循环调用 `clone()` 方法 100 次，性能会得到显著提升。
    *   **框架应用**: Spring 框架中的 Bean 作用域 `scope="prototype"` 就应用了原型模式。当你向 Spring 容器请求一个 prototype 作用域的 Bean 时，容器会返回一个新的实例。虽然 Spring 的实现不一定是直接调用 `clone()`，但其核心思想是一致的：提供一个原型，每次请求都返回一个新的、独立的对象副本。

*   **场景三：状态复杂的对象复制**
    *   **例子**: 在一个绘图软件中，用户可以复制（Ctrl+C）一个复杂的组合图形，然后粘贴（Ctrl+V）多次。这个复制操作就可以通过原型模式实现。组合图形对象作为一个原型，`clone()` 方法会深拷贝它包含的所有子图形和属性，从而创建一个一模一样的副本。
    *   `java.util.ArrayList` 的 `clone()` 方法就是一个很好的例子，它返回一个列表的浅拷贝副本，这也是原型模式的一种体现。

### 34. Object 的 clone() 方法是深拷贝还是浅拷贝？

**核心答案**

`java.lang.Object` 类提供的 `clone()` 方法执行的是**浅拷贝 (Shallow Copy)**。

**详细说明**

1.  **实现机制**: `Object.clone()` 是一个 `native` 方法，它的底层实现是直接在内存中对对象的二进制数据进行逐位复制（bitwise copy）。

2.  **复制效果**:
    *   **对于基本数据类型 (primitive types)**: 如 `int`, `double`, `boolean` 等，直接复制它们的值。因此，克隆对象和原对象中的基本类型字段是相互独立的。
    *   **对于引用类型 (reference types)**: 如 `String`, `Object`, `Array` 等，只复制**引用的值**，也就是内存地址。它并不会去复制引用所指向的那个对象。结果就是，克隆对象和原对象中的引用类型字段将指向**堆内存中完全相同的对象**。

3.  **重要推论**:
    *   如果一个类只包含基本数据类型和不可变对象（如 `String`, `Integer`），那么即使使用 `Object.clone()` 进行浅拷贝，其效果也和深拷贝一样，因为不可变对象无法被修改，所以不存在共享状态被篡改的风险。
    *   但是，只要类中包含**任何一个可变对象的引用**（例如，一个 `ArrayList` 或者一个自定义的可变类 `Address`），`Object.clone()` 的浅拷贝特性就会导致原对象和克隆对象共享这个可变对象，从而可能引发意外的副作用。

4.  **正确用法**:
    *   要想在一个类中实现深拷贝，你必须重写 `clone()` 方法。在方法内部，首先调用 `super.clone()` 得到一个浅拷贝的副本，然后对副本中的所有可变引用类型字段，手动调用它们的 `clone()` 方法，以实现递归复制。

**代码验证**
```java
class Wallet {
    public int money;
    public Wallet(int money) { this.money = money; }
}

class Person implements Cloneable {
    public String name;
    public Wallet wallet; // 可变引用类型

    public Person(String name, Wallet wallet) {
        this.name = name;
        this.wallet = wallet;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone(); // 执行 Object.clone()，即浅拷贝
    }
}

public class CloneTest {
    public static void main(String[] args) throws CloneNotSupportedException {
        Person p1 = new Person("Alice", new Wallet(100));
        Person p2 = (Person) p1.clone();

        System.out.println("p1.wallet == p2.wallet: " + (p1.wallet == p2.wallet)); // 输出 true

        // 修改 p1 的钱包，p2 的钱包也跟着变了
        p1.wallet.money = 200;
        System.out.println("p1's money: " + p1.wallet.money); // 输出 200
        System.out.println("p2's money: " + p2.wallet.money); // 输出 200，说明是浅拷贝
    }
}
```
这个例子清晰地证明了 `Object.clone()` 是浅拷贝，因为克隆后的 `p2` 和 `p1` 共享同一个 `Wallet` 对象。


Of course. Here are the detailed answers for the next section, starting with the Proxy Pattern.
