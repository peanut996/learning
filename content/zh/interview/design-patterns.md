# 设计模式面试题

## 设计模式基础

### 1. 什么是设计模式？设计模式的作用是什么？

**核心答案**

设计模式（Design Pattern）是在软件设计过程中，针对特定问题或场景的、经过反复验证的、可复用的解决方案。它不是一个具体的类或代码，而是一种思想、一种设计经验的总结。

**详细说明**

1.  **作用与价值**:
    *   **提高代码复用性**: 模式化的解决方案可以被应用到不同的项目中。
    *   **提高代码可读性**: 使用通用的设计模式可以让其他开发者更快地理解代码的意图和结构。
    *   **提高代码可扩展性**: 设计模式通常遵循 SOLID 原则，使得系统更容易扩展和维护，能够更好地应对需求变化。
    *   **提高系统健壮性**: 这些模式是经过大量实践验证的，可以帮助我们避免一些常见的设计陷阱，构建更可靠的系统。
    *   **促进开发者沟通**: 设计模式提供了通用的设计词汇，让开发者之间可以更高效地交流设计思想。

2.  **记忆口诀**:
    *   **复用、可读、扩展好，健壮、沟通不可少。**

### 2. 设计模式有哪些分类？

**核心答案**

根据目的和用途，设计模式通常分为三大类：创建型模式、结构型模式和行为型模式。

**详细说明**

1.  **创建型模式 (Creational Patterns)**:
    *   **关注点**: 对象的创建过程。
    *   **目标**: 将对象的创建与使用解耦，使得系统在创建对象时有更大的灵活性。
    *   **包含模式**: 单例模式、工厂方法模式、抽象工厂模式、建造者模式、原型模式。

2.  **结构型模式 (Structural Patterns)**:
    *   **关注点**: 类和对象的组合。
    *   **目标**: 通过组合类和对象来形成更大的结构，同时保持结构的灵活性和效率。
    *   **包含模式**: 适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。

3.  **行为型模式 (Behavioral Patterns)**:
    *   **关注点**: 对象之间的通信和职责分配。
    *   **目标**: 描述对象如何协作完成单个对象无法独立完成的任务。
    *   **包含模式**: 策略模式、模板方法模式、观察者模式、责任链模式、命令模式、迭代器模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。

### 3. 什么是创建型模式、结构型模式、行为型模式？

**核心答案**

*   **创建型模式**：专注于“如何创建对象”，将对象的创建过程封装起来，使代码不依赖于具体的创建细节。
*   **结构型模式**：专注于“如何组合对象”，通过组合类和对象来构建更大、更灵活的结构。
*   **行为型模式**：专注于“对象如何交互和分配职责”，有效地组织对象之间的通信。

**详细说明**

*   **创建型模式 (How to create objects?)**: 像一个“采购部”，负责根据需求生产（创建）合适的对象，而使用者（客户端）无需关心生产细节。
*   **结构型模式 (How to assemble objects?)**: 像一个“建筑师”，负责将不同的组件（类和对象）搭建成一个功能完整的建筑（系统结构）。
*   **行为型模式 (How to coordinate objects?)**: 像一个“交通指挥”，负责协调不同车辆（对象）的行为，确保它们能够高效、有序地通信和协作。

### 4. 设计模式的六大原则是什么？

**核心答案**

设计模式的六大原则是指导我们进行面向对象设计的通用准则，它们是优秀设计的基础。通常被称为 **SOLID** 原则，外加迪米特法则。

1.  **S - 单一职责原则 (Single Responsibility Principle, SRP)**
2.  **O - 开闭原则 (Open/Closed Principle, OCP)**
3.  **L - 里氏替换原则 (Liskov Substitution Principle, LSP)**
4.  **I - 接口隔离原则 (Interface Segregation Principle, ISP)**
5.  **D - 依赖倒置原则 (Dependency Inversion Principle, DIP)**
6.  **迪米特法则 (Law of Demeter, LoD)**

### 5. 什么是单一职责原则（SRP）？

**核心答案**

一个类或模块应该只负责一项职责，或者说，引起类变化的**原因**应该只有一个。

**详细说明**

*   **目的**: 降低类的复杂度，提高类的内聚性，降低耦合度，使得代码更易于理解和维护。
*   **例子**: 一个 `User` 类不应该既负责用户信息的管理，又负责用户数据的持久化（如保存到数据库）。应该将持久化的功能分离到另一个专门的类中，如 `UserRepository`。
*   **违反示例**:
    ```java
    class Order {
        void calculateTotal() { /* ... */ }
        void printOrder() { /* ... */ }
        void saveToDatabase() { /* ... */ }
    }
    ```
*   **遵循示例**:
    ```java
    class Order {
        void calculateTotal() { /* ... */ }
    }
    class OrderPrinter {
        void print(Order order) { /* ... */ }
    }
    class OrderRepository {
        void save(Order order) { /* ... */ }
    }
    ```

### 6. 什么是开闭原则（OCP）？

**核心答案**

软件实体（类、模块、函数等）应该对**扩展开放**，对**修改关闭**。

**详细说明**

*   **核心思想**: 当需求变化时，我们应该通过**增加新代码**来扩展功能，而不是修改已有的、稳定的代码。
*   **目的**: 提高系统的可扩展性和可维护性，降低引入新风险的可能性。
*   **实现方式**: 通常通过抽象（接口、抽象类）和多态来实现。定义一个稳定的抽象层，而将易变的部分封装在具体的实现类中。
*   **例子**: 计算不同形状的面积。不应该使用 `if-else` 判断形状类型，而应该定义一个 `Shape` 接口和 `getArea()` 方法，让圆形 `Circle`、正方形 `Square` 等具体形状去实现它。当需要新增三角形时，只需添加一个 `Triangle` 类，而无需修改原有的计算逻辑。

<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
    <rect x="50" y="20" width="200" height="40" rx="5" class="box"/><text x="150" y="45" text-anchor="middle" class="text">AreaCalculator (稳定)</text>
    <rect x="10" y="140" width="80" height="40" rx="5" class="box"/><text x="50" y="165" text-anchor="middle" class="text">Circle</text>
    <rect x="110" y="140" width="80" height="40" rx="5" class="box"/><text x="150" y="165" text-anchor="middle" class="text">Square</text>
    <rect x="210" y="140" width="80"height="40" rx="5" class="box" stroke-dasharray="4"/><text x="250" y="165" text-anchor="middle" class="text" fill="#999">Triangle (新增)</text>
    <path class="arrow" d="M150,60 v40 l-100,20"/>
    <path class="arrow" d="M150,60 v60"/>
    <path class="arrow" d="M150,60 v40 l100,20" stroke-dasharray="4"/>
    <text x="150" y="95" text-anchor="middle" class="text" font-style="italic">依赖抽象</text>
</svg>

### 7. 什么是里氏替换原则（LSP）？

**核心答案**

所有引用基类的地方，必须能够**透明地使用其子类的对象**，而不会出现任何错误。简单来说，子类对象能够替换父类对象，并且程序的行为不会改变。

**详细说明**

*   **核心思想**: 子类应该完全实现父类的方法，并且不能改变父类声明的原有的功能和意图。
*   **目的**: 保证继承的正确性，确保基于基类构建的系统在引入子类后仍然能够稳定工作。
*   **两个关键点**:
    1.  **子类可以有自己的新方法**，但不能改变父类方法的行为。
    2.  **子类重写父类方法时**，方法的输入参数类型应该比父类更宽松（逆变），返回类型应该比父类更严格（协变）。（但在 Java 等语言中，参数类型必须完全一致）。
*   **经典反例**: 正方形继承长方形。
    *   `Rectangle` 类有 `setWidth` 和 `setHeight` 方法。
    *   `Square` 继承 `Rectangle`，为了保持“正方形”的特性，重写 `setWidth` 时会同时修改 `height`。
    *   一段期望操作 `Rectangle` 的代码，如果传入一个 `Square` 对象，其行为可能会出错（比如设置完宽度后，发现高度也被改变了）。

### 8. 什么是依赖倒置原则（DIP）？

**核心答案**

**高层模块不应该依赖于低层模块，两者都应该依赖于抽象**。抽象不应该依赖于细节，细节应该依赖于抽象。

**详细说明**

*   **核心思想**: 面向接口编程，而不是面向实现编程。
*   **目的**: 解耦高层和低层模块，使得系统更加灵活，易于扩展和维护。
*   **例子**: 开车。
    *   **不好的设计**: “人”这个高层模块，直接依赖“奔驰车”这个低层模块。如果想换成“宝马车”，就需要修改“人”的代码。
    *   **好的设计**: “人”依赖一个“车”的接口（抽象），“奔驰车”和“宝马车”都去实现这个接口。这样，“人”只需要知道如何“开车”，而不用关心开的是什么具体的车。更换车辆时，“人”的代码完全不需要改动。

<svg width="350" height="150" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.abox{stroke:#666;stroke-width:1;fill:#e0f7fa;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
    <rect x="135" y="10" width="80" height="30" rx="5" class="box"/><text x="175" y="30" text-anchor="middle" class="text">Driver</text>
    <rect x="30" y="110" width="100" height="30" rx="5" class="box"/><text x="80" y="130" text-anchor="middle" class="text">BenzCar</text>
    <rect x="220" y="110" width="100" height="30" rx="5" class="box"/><text x="270" y="130" text-anchor="middle" class="text">BmwCar</text>
    <rect x="125" y="60" width="100" height="30" rx="5" class="abox"/><text x="175" y="80" text-anchor="middle" class="text">&lt;interface&gt; Car</text>
    <path class="arrow" d="M175,40 v20"/>
    <path class="arrow" d="M80,110 v-15 c0,-15 45,-15 95,-15"/>
    <path class="arrow" d="M270,110 v-15 c0,-15 -45,-15 -95,-15"/>
    <text x="175" y="55" text-anchor="middle" class="text" font-size="10" fill="#0277bd">依赖</text>
    <text x="50" y="80" text-anchor="middle" class="text" font-size="10" fill="#0277bd">实现</text>
    <text x="300" y="80" text-anchor="middle" class="text" font-size="10" fill="#0277bd">实现</text>
</svg>

### 9. 什么是接口隔离原则（ISP）？

**核心答案**

客户端不应该被强迫依赖于它们不使用的方法。一个类对另一个类的依赖应该建立在最小的接口上。

**详细说明**

*   **核心思想**: 接口应该小而专，而不是大而全。
*   **目的**: 降低耦合度，提高内聚性。防止客户端因为接口中某个不相关方法的改动而被迫重新编译。
*   **例子**: 一个“智能手机”接口，如果包含了 `call()`、`sendSms()`、`playGame()`、`officeWork()` 等所有方法，那么对于一个只需要打电话的“老年机”实现类来说，后两个方法就是多余的，它被迫要去实现自己用不到的功能。
*   **解决方案**: 将大接口拆分成更小的、更具体的接口，如 `ICallable`、`ISmsable`、`IGamePlayer` 等。实现类按需实现自己需要的接口即可。

### 10. 什么是迪米特法则（LoD）？

**核心答案**

一个对象应该对其他对象有最少的了解。也被称为“最少知识原则”（Least Knowledge Principle）。

**详细说明**

*   **核心思想**: 只与你的直接朋友交谈，不要和陌生人说话。
*   **“朋友”的定义**:
    1.  当前对象本身 (`this`)
    2.  当前方法的参数
    3.  当前方法中创建的对象
    4.  当前对象的成员变量
*   **目的**: 降低类之间的耦合度，限制知识的传播范围，从而提高模块的独立性。
*   **例子**:
    *   **不好的设计**: `A` 调用 `B` 的方法，该方法返回一个 `C` 对象，然后 `A` 再去调用 `C` 的方法（如 `a.getB().getC().doSomething()`）。这使得 `A` 依赖了 `B` 和 `C`。
    *   **好的设计**: 在 `B` 中封装一个方法，直接完成 `A` 的需求，而不需要把 `C` 暴露给 `A`。`A` 只需要与它的直接朋友 `B` 交互。

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

## 结构型模式

### 代理模式

### 35. 什么是代理模式？代理模式的作用是什么？

**核心答案**

代理模式（Proxy Pattern）是指为一个对象提供一个代理（或占位符），以控制对这个对象的访问。代理对象和目标对象通常实现相同的接口，客户端通过访问代理对象来间接访问目标对象。

**详细说明**

1.  **核心思想**:
    *   **引入间接层**: 在客户端和目标对象之间增加一个代理对象，客户端的所有请求都先经过代理。
    *   **控制与增强**: 代理对象可以在将请求转发给目标对象之前或之后，执行一些额外的操作。这使得我们可以在不修改目标对象代码的前提下，对其功能进行增强或控制。

2.  **生活中的类比**:
    *   **明星与经纪人**: 你（客户端）想找明星（目标对象）拍电影，通常不会直接联系明星，而是联系其经纪人（代理对象）。经纪人会负责处理合同、档期、过滤不合适的请求等（增强和控制），最后再将合适的请求传达给明星。

3.  **UML 结构与角色**:
    *   `Subject` (抽象主题): 定义了代理对象和真实主题的共同接口，这样任何使用真实主题的地方都可以使用代理对象。
    *   `RealSubject` (真实主题): 定义了代理所代表的真实实体，是最终执行业务逻辑的对象。
    *   `Proxy` (代理): 内部持有一个 `RealSubject` 的引用，实现了 `Subject` 接口。它可以在调用 `RealSubject` 的相应方法前后执行预处理和后处理操作。

4.  **作用与价值**:
    *   **功能增强**: 可以在不侵入原代码的情况下，为目标对象添加额外的功能，如日志记录、性能监控、事务管理。
    *   **访问控制**: 代理可以根据条件决定是否将请求转发给目标对象，实现权限校验、黑白名单过滤等。
    *   **职责分离**: 代理类负责非核心业务逻辑（如日志、事务），真实主题类只负责核心业务逻辑，符合单一职责原则。
    *   **远程代理**: 可以隐藏一个对象存在于不同地址空间的事实，如 RPC 框架。
    *   **虚拟代理**: 可以延迟重量级对象的初始化，在真正需要时才创建它。

<svg width="450" height="200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.abox{stroke:#666;stroke-width:1;fill:#e0f7fa;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}.darrow{stroke:#999;stroke-width:1;fill:none;stroke-dasharray:4;marker-end:url(#darrowhead);}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker><marker id="darrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#999"/></marker></defs>
    <rect x="20" y="80" width="100" height="40" rx="5" class="box"/><text x="70" y="105" text-anchor="middle" class="text">Client</text>
    <rect x="170" y="20" width="120" height="40" rx="5" class="abox"/><text x="230" y="45" text-anchor="middle" class="text">&lt;interface&gt; Subject</text>
    <rect x="170" y="140" width="120" height="40" rx="5" class="box"/><text x="230" y="165" text-anchor="middle" class="text">Proxy</text>
    <rect x="310" y="140" width="120" height="40" rx="5" class="box"/><text x="370" y="165" text-anchor="middle" class="text">RealSubject</text>
    <path class="arrow" d="M230,60 v60"/><path class="arrow" d="M370,140 v-65 c0,-15 -60,-15 -140,-15"/>
    <path class="darrow" d="M120,100 h50"/><text x="145" y="95" class="text" font-size="10" fill="#777">调用</text>
    <path class="darrow" d="M290,160 h20"/><text x="300" y="155" class="text" font-size="10" fill="#777">引用</text>
</svg>

### 36. 代理模式有哪些分类？

**核心答案**

根据代理类的**创建时机**，代理模式主要分为两大类：

1.  **静态代理 (Static Proxy)**: 代理类是在**编译时**就已经创建好的。程序员需要手动为每一个目标类编写一个对应的代理类。
2.  **动态代理 (Dynamic Proxy)**: 代理类是在**运行时**动态生成的。不需要手动编写代理类，代理类由程序在运行时根据需要自动创建。

**详细说明**

*   **静态代理**:
    *   **特点**: 代理类（`.java` 文件）是实实在在存在的，它和目标类都实现了同一个接口。在编码阶段，我们就知道代理的是谁，以及要怎么代理。
    *   **优点**: 实现简单，容易理解。
    *   **缺点**: 非常不灵活。如果接口发生变化，目标类和代理类都需要修改。并且，每增加一个目标类，就需要增加一个代理类，导致类数量急剧膨胀，难以维护。

*   **动态代理**:
    *   **特点**: 没有现成的代理类 `.java` 文件。代理对象是在程序运行时，通过反射或字节码技术动态地在内存中构建出来的。
    *   **优点**: 解决了静态代理的缺点，实现了通用性。一个动态代理的处理器可以代理多个不同的目标对象，大大减少了代码量，并且增强了可扩展性。
    *   **主要实现方式 (在 Java 中)**:
        *   **JDK 动态代理**: Java 官方提供的，基于**接口**实现。
        *   **CGLIB 动态代理**: 第三方库，基于**继承**实现。

### 37. 什么是静态代理？优缺点是什么？

**核心答案**

静态代理是指代理类由程序员手动编写，在编译期间就已经确定了其代理关系。代理类和被代理类（目标类）通常需要实现相同的接口。

**示例代码**

```java
// 1. 抽象主题接口
interface IUserService {
    void findUser();
}

// 2. 真实主题：目标类
class UserServiceImpl implements IUserService {
    @Override
    public void findUser() {
        System.out.println("查询数据库，找到用户...");
    }
}

// 3. 代理类
class UserServiceProxy implements IUserService {
    private IUserService target;

    public UserServiceProxy(IUserService target) {
        this.target = target;
    }

    @Override
    public void findUser() {
        System.out.println("--- 开启事务 ---"); // 增强功能
        target.findUser(); // 调用目标方法
        System.out.println("--- 提交事务 ---"); // 增强功能
    }
}

// 4. 客户端调用
public class StaticProxyDemo {
    public static void main(String[] args) {
        IUserService target = new UserServiceImpl();
        IUserService proxy = new UserServiceProxy(target);
        proxy.findUser();
    }
}
```

**优缺点**

*   **优点**:
    *   **实现简单**: 结构清晰，代码逻辑直接，容易理解和实现。
    *   **无缝增强**: 可以在不修改目标对象功能的前提下，对目标功能进行扩展。

*   **缺点**:
    *   **违反开闭原则**: 如果接口 `IUserService` 增加了一个新方法，那么目标类和代理类都需要进行修改，这不符合“对修改关闭”的原则。
    *   **代码冗余 (Boilerplate)**: 如果需要代理的类很多，就需要编写大量的代理类，它们的代码结构大多是重复的。
    *   **类爆炸**: 每一个目标类都需要一个对应的代理类，如果系统中有几十上百个类需要代理，那么代理类的数量会急剧膨胀，难以管理和维护。

### 38. 什么是动态代理？有哪些实现方式？

**核心答案**

动态代理是指代理类不是由程序员手动编写的，而是在**程序运行时**，由框架或库根据目标对象的接口或类动态地在内存中创建出来的代理对象。

**详细说明**

动态代理的核心优势在于其**通用性**。我们只需要编写一个通用的“调用处理器” (Invocation Handler) 或“方法拦截器” (Method Interceptor)，就可以为实现了相同接口或继承了相同父类的任意目标对象创建代理，而无需为每个目标对象都编写一个具体的代理类。这极大地提高了代码的复用性和灵活性。

**在 Java 中，主要有两种主流的实现方式**：

1.  **JDK 动态代理 (JDK Dynamic Proxy)**:
    *   **来源**: Java 官方 `java.lang.reflect` 包提供。
    *   **核心组件**: `Proxy` 类和 `InvocationHandler` 接口。
    *   **实现原理**: 基于**接口**和**反射**。它要求被代理的目标对象必须实现至少一个接口。在运行时，它会动态生成一个实现了目标对象所有接口的代理类，并将所有方法调用都转发给 `InvocationHandler` 的 `invoke` 方法进行统一处理。

2.  **CGLIB 动态代理 (Code Generation Library)**:
    *   **来源**: 一个强大的、高性能的第三方代码生成库。
    *   **核心组件**: `Enhancer` 类和 `MethodInterceptor` 接口。
    *   **实现原理**: 基于**继承**和**字节码技术** (ASM)。它不要求目标对象实现接口。在运行时，它会动态生成一个目标类的**子类**作为代理，并重写父类中所有非 `final` 的方法。所有对代理方法的调用都会被转发给 `MethodInterceptor` 的 `intercept` 方法进行处理。

### 39. JDK 动态代理的实现原理是什么？

**核心答案**

JDK 动态代理的核心原理是：通过 `java.lang.reflect.Proxy` 类的 `newProxyInstance()` 方法，在运行时动态地创建一个**实现了目标对象所实现的所有接口**的代理类的实例。所有对代理对象方法的调用，都会被转发到与该代理实例关联的 `InvocationHandler` 接口的 `invoke()` 方法中进行处理。

**详细步骤**

1.  **编写 `InvocationHandler`**: 创建一个实现了 `InvocationHandler` 接口的类。这个类的 `invoke()` 方法是代理逻辑的核心，所有的增强操作（如日志、事务）都在这里编写。`invoke` 方法有三个参数：
    *   `Object proxy`: 动态生成的代理对象本身。
    *   `Method method`: 正在被调用的方法（`findUser()`）。
    *   `Object[] args`: 调用方法时传入的参数。

2.  **调用 `Proxy.newProxyInstance()`**: 使用这个静态方法来创建代理对象。它需要三个参数：
    *   `ClassLoader loader`: 指定当前目标对象使用的类加载器。
    *   `Class<?>[] interfaces`: 目标对象所实现的所有接口的 `Class` 数组。这是告诉 `Proxy` 要为哪些接口创建代理。
    *   `InvocationHandler h`: 上一步中创建的 `InvocationHandler` 实例。

3.  **工作流程**:
    *   客户端调用代理对象的 `findUser()` 方法。
    *   这个调用被 JVM 转发到 `InvocationHandler` 的 `invoke()` 方法。
    *   在 `invoke()` 方法中，我们可以执行“前置增强”逻辑。
    *   通过反射调用 `method.invoke(target, args)` 来执行原始目标对象的 `findUser()` 方法。
    *   执行“后置增强”逻辑。
    *   返回结果。

**可视化流程**

<svg width="550" height="250" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.proc{stroke:#0277bd;stroke-width:1.5;fill:#e1f5fe;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
    <rect x="20" y="100" width="100" height="40" rx="5" class="box"/><text x="70" y="125" text-anchor="middle" class="text">Client</text>
    <rect x="170" y="100" width="120" height="40" rx="5" class="proc"/><text x="230" y="125" text-anchor="middle" class="text">Proxy Object</text>
    <rect x="340" y="100" width="160" height="40" rx="5" class="box"/><text x="420" y="125" text-anchor="middle" class="text">MyInvocationHandler</text>
    <rect x="340" y="200" width="160" height="40" rx="5" class="box"/><text x="420" y="225" text-anchor="middle" class="text">Target Object</text>
    <path class="arrow" d="M120,120 h50"/><text x="140" y="115" class="text" font-size="10">1. method()</text>
    <path class="arrow" d="M290,120 h50"/><text x="310" y="115" class="text" font-size="10">2. invoke()</text>
    <path class="arrow" d="M420,140 v40"/><text x="425" y="170" class="text" font-size="10">3. method.invoke(target)</text>
    <path class="arrow" d="M420,200 v-40" stroke-dasharray="4"/><text x="380" y="170" class="text" font-size="10">4. return</text>
    <path class="arrow" d="M340,120 h-50" stroke-dasharray="4"/><text x="300" y="135" class="text" font-size="10">5. return</text>
    <path class="arrow" d="M170,120 h-50" stroke-dasharray="4"/><text x="130" y="135" class="text" font-size="10">6. return</text>
    <text x="340" y="30" font-weight="bold">核心: 所有调用都转向 InvocationHandler</text>
</svg>

### 40. CGLIB 动态代理的实现原理是什么？

**核心答案**

CGLIB 动态代理的核心原理是：通过 `Enhancer` 类，在运行时利用 **ASM 字节码技术**动态地创建一个**被代理类的子类**。当调用代理对象的任何非 `final` 方法时，都会被 `MethodInterceptor` 接口的 `intercept()` 方法所拦截，从而可以在此方法中实现增强逻辑。

**详细步骤**

1.  **创建 `Enhancer` 实例**: `Enhancer` 是 CGLIB 的字节码增强器，它可以动态地创建类的子类。
2.  **设置父类**: 调用 `enhancer.setSuperclass()` 方法，将目标类的 `Class` 对象设置进去。这是告诉 `Enhancer` 要为哪个类创建子类。
3.  **设置回调**: 调用 `enhancer.setCallback()` 方法，传入一个实现了 `MethodInterceptor` 接口的实例。这个拦截器就是代理逻辑的核心。
4.  **创建代理对象**: 调用 `enhancer.create()` 方法生成代理对象，这个对象就是目标类的子类实例。

5.  **工作流程**:
    *   客户端调用代理对象（子类）的 `findUser()` 方法。
    *   由于子类重写了父类的 `findUser()` 方法，这个调用被 `MethodInterceptor` 的 `intercept()` 方法拦截。
    *   在 `intercept()` 方法中，我们可以执行“前置增强”逻辑。
    *   通过调用 `methodProxy.invokeSuper(obj, args)` 来执行原始父类的 `findUser()` 方法。
    *   执行“后置增强”逻辑。
    *   返回结果。

### 41. JDK 动态代理和 CGLIB 代理的区别是什么？

**核心答案**

最核心的区别在于：**JDK 动态代理是基于接口实现的，而 CGLIB 动态代理是基于继承实现的。**

**详细对比**

| 特性 / 维度 | JDK 动态代理 | CGLIB 动态代理 |
| :--- | :--- | :--- |
| **实现原理** | 基于**接口**和 Java **反射**机制。 | 基于**继承**和 **ASM 字节码**技术。 |
| **目标对象要求** | 目标对象**必须实现**至少一个接口。 | 目标对象**无需实现**接口。 |
| **限制** | 只能代理接口中定义的方法。 | 不能代理 `final` 修饰的类和 `final`、`private`、`static` 修饰的方法。 |
| **代理对象** | 代理对象与目标对象**实现相同的接口**，是兄弟关系。 | 代理对象是目标对象的**子类**，是父子关系。 |
| **性能** | 在 JDK 1.8 之后，经过优化，两者性能差距很小。在重复调用、方法数量少的情况下，JDK 代理可能稍快。 | 在早期版本中，由于 CGLIB 直接操作字节码，性能通常优于基于反射的 JDK 代理。在方法数量多、启动慢但后续调用快的情况下有优势。 |
| **依赖** | JDK 自带，无需额外依赖。 | 需要引入第三方 CGLIB 库。 |
| **核心组件** | `java.lang.reflect.Proxy`, `InvocationHandler` | `net.sf.cglib.proxy.Enhancer`, `MethodInterceptor` |

**如何选择？**

*   如果目标对象实现了接口，或者你希望面向接口编程，优先选择 **JDK 动态代理**。
*   如果目标对象没有实现接口，只能选择 **CGLIB 动态代理**。
*   **Spring AOP** 会自动选择：如果目标类实现了接口，默认使用 JDK 动态代理；如果未实现接口，则使用 CGLIB 代理。

### 42. Spring AOP 使用了什么设计模式？

**核心答案**

Spring AOP 的核心实现主要使用了**代理模式 (Proxy Pattern)**，并且综合运用了**工厂模式 (Factory Pattern)** 和 **策略模式 (Strategy Pattern)**。

**详细说明**

1.  **代理模式 (核心)**:
    *   Spring AOP 的根本就是为需要被增强的目标 Bean 创建一个代理对象。这个代理对象封装了切面逻辑（如 `@Before`, `@After` 等通知 Advice）。
    *   当客户端请求目标 Bean 的方法时，实际上是请求的代理对象的方法。
    *   代理对象会在调用真实目标方法之前或之后，执行切面中定义的增强逻辑。
    *   Spring 会智能地在 **JDK 动态代理** 和 **CGLIB 代理** 之间进行选择。

2.  **工厂模式**:
    *   Spring 的 `IoC` 容器本身就是一个巨大的工厂。当容器启动并解析 Bean 定义时，如果发现某个 Bean 配置了 AOP 切面，`BeanPostProcessor`（特别是 `AnnotationAwareAspectJAutoProxyCreator`）就会介入。
    *   这个过程就像一个“代理工厂”，它接收原始的 Bean 对象，然后生产并返回一个经过 AOP 增强的代理 Bean 对象。最终存入容器供应用程序使用的是这个代理对象。

3.  **策略模式**:
    *   Spring AOP 在决定使用哪种代理技术（JDK 或 CGLIB）时，就体现了策略模式的思想。
    *   `DefaultAopProxyFactory` 会检查目标对象的特性（是否实现了接口），然后根据不同的情况（策略），选择创建 `JdkDynamicAopProxy` (JDK 代理策略) 还是 `ObjenesisCglibAopProxy` (CGLIB 代理策略)。这使得代理的创建方式可以灵活地切换，而对上层调用者透明。

### 43. 代理模式的应用场景有哪些？

**核心答案**

代理模式的应用场景极其广泛，几乎所有需要在不改变原有代码基础上增加控制或附加功能的场景都可以使用。

**详细说明**

1.  **Spring AOP**: 这是最经典的应用。
    *   **声明式事务管理**: `@Transactional` 注解通过代理模式实现。代理在方法调用前开启事务，在方法成功结束后提交事务，在出现异常时回滚事务。
    *   **统一日志记录**: 在方法调用前后记录入参、出参和耗时。
    *   **权限控制**: 在方法执行前检查用户是否有权限访问。
    *   **缓存**: 在方法执行前检查缓存，如果命中则直接返回，否则执行方法并将结果存入缓存。

2.  **RPC 框架 (远程过程调用)**:
    *   如 Dubbo、gRPC 等框架，客户端持有的服务接口实例实际上是一个代理对象。
    *   当你调用这个代理的方法时，代理会将方法名、参数等信息序列化，并通过网络发送给远程的服务提供者。接收到结果后再反序列化返回给你。这个过程对调用者是完全透明的，使其感觉就像在调用一个本地方法。

3.  **MyBatis 框架**:
    *   MyBatis 的 Mapper 接口并没有实现类。当你注入一个 `UserMapper` 时，MyBatis 通过 JDK 动态代理为你创建了一个代理对象。
    *   当你调用 `userMapper.selectById(1)` 时，代理对象的 `InvocationHandler` 会拦截这个调用，解析方法名和注解（或 XML），找到对应的 SQL 语句，然后通过 JDBC 执行数据库查询，最后将结果封装成对象返回。

4.  **数据库连接池**:
    *   当你从连接池（如 HikariCP, Druid）获取一个 `Connection` 对象时，很多时候拿到的是一个代理对象。
    *   当你调用 `connection.close()` 方法时，代理并不会真的关闭物理连接，而是将这个连接“归还”给连接池，以便复用。

5.  **延迟加载 (虚拟代理)**:
    *   当一个对象的创建成本很高时（如加载一张高清大图），可以先创建一个代理对象。代理对象在初始时只保存了真实对象的引用信息。
    *   只有当客户端第一次真正需要使用这个对象的方法时，代理对象才会去创建和加载真实的重量级对象。Hibernate 等 ORM 框架中的懒加载（Lazy Loading）就使用了这种思想。

好的。

一次性输出剩余的所有（约 67 个）问题的详细答案会产生非常长的文本，可能会超出单次响应的长度限制，导致内容被截断。

为了保证您能收到**完整且高质量**的答案，我建议采用分段的方式。我将首先完成 **“结构型模式”** 的所有问题，然后继续 **“行为型模式”**，最后是 **“综合问题”**。这样可以确保每个部分的答案都详尽、准确且不会丢失。

现在，我将从第 44 题开始，完成剩余的“结构型模式”部分。

---

### 适配器模式

### 44. 什么是适配器模式？适配器模式的作用是什么？

**核心答案**

适配器模式（Adapter Pattern）是一种结构型设计模式，它扮演着两个不兼容接口之间的桥梁。它能将一个类的接口转换成客户端期望的另一个接口，从而使得原本因接口不匹配而无法在一起工作的两个类可以协同工作。

**详细说明**

1.  **核心思想**:
    *   **接口转换**: 适配器模式的核心是“转换”。它不改变原有类的功能，只是在外部套上一层“壳”，让这个壳的接口符合客户端的要求。
    *   **解决不兼容**: 当你有一个现成的、功能完善的类（Adaptee），但它的接口与你当前系统要求的接口（Target）不一致时，适配器模式就能派上用场。

2.  **生活中的类比**:
    *   **电源适配器/转换插头**: 最经典的例子。你的笔记本电脑充电器是美式两脚插头（Adaptee），但酒店的墙上是欧式圆孔插座（客户端期望的接口）。你需要一个转换插头（Adapter），它的一端能插入欧式插座，另一端能让你的美式插头插进去。这个转换插头本身不发电，它只负责接口转换。

3.  **UML 结构与角色**:
    *   `Target` (目标接口): 客户端所期待和直接使用的接口。
    *   `Adaptee` (被适配者): 已存在的、接口不兼容的类。
    *   `Adapter` (适配器): 负责将 `Adaptee` 的接口转换成 `Target` 接口。它需要持有 `Adaptee` 的引用（或继承它），并实现 `Target` 接口。
    *   `Client` (客户端): 通过 `Target` 接口与 `Adapter` 进行交互。

4.  **作用与价值**:
    *   **提高类的复用性**: 可以让现有的类在新的环境中被复用，而无需修改其源代码。
    *   **增强灵活性和扩展性**: 解耦了客户端和被适配者。未来可以方便地更换或增加新的被适配者，只需为其提供一个新的适配器即可。
    *   **兼容旧系统/第三方库**: 在系统升级或集成第三方库时，适配器模式是解决接口兼容性问题的利器。

### 45. 适配器模式有哪些分类？

**核心答案**

根据适配器与被适配者之间的实现关系，适配器模式主要分为两种：

1.  **类适配器模式 (Class Adapter Pattern)**: 基于**继承**实现。
2.  **对象适配器模式 (Object Adapter Pattern)**: 基于**组合（或关联）**实现。

**详细说明**

1.  **类适配器模式**:
    *   **实现方式**: `Adapter` 类**同时继承** `Adaptee` 类并**实现** `Target` 接口。
    *   **UML 结构**: `Adapter` 有两条线，一条指向 `Adaptee`（继承），一条指向 `Target`（实现）。
    *   **优点**:
        *   由于是继承，`Adapter` 可以重写 `Adaptee` 的部分方法，具有更高的灵活性。
    *   **缺点**:
        *   **耦合度高**: `Adapter` 和 `Adaptee` 的耦合度很高。
        *   **语言限制**: 受到编程语言的限制，比如 Java 不支持多重继承，所以 `Adapter` 无法同时继承多个 `Adaptee`。
        *   **暴露 `Adaptee`**: 将 `Adaptee` 的方法都暴露给了子类。

2.  **对象适配器模式**:
    *   **实现方式**: `Adapter` 类**实现** `Target` 接口，并在内部**持有**一个 `Adaptee` 类的实例。
    *   **UML 结构**: `Adapter` 指向 `Target`（实现），同时包含一个指向 `Adaptee` 的引用（组合）。
    *   **优点**:
        *   **耦合度低**: `Adapter` 和 `Adaptee` 是组合关系，耦合松散。
        *   **灵活性高**: 可以适配 `Adaptee` 及其所有子类。
        *   **推荐使用**: 这种方式更符合“合成复用原则”，是**实际开发中更常用**的一种方式。
    *   **缺点**:
        *   如果想重写 `Adaptee` 的方法，需要 `Adaptee` 本身提供支持，不如类适配器直接。

<svg width="500" height="250" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.abox{stroke:#666;stroke-width:1;fill:#e0f7fa;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
    <text x="125" y="20" text-anchor="middle" font-weight="bold">类适配器 (继承)</text>
    <rect x="25" y="50" width="100" height="40" rx="5" class="abox"/><text x="75" y="75" text-anchor="middle" class="text">&lt;interface&gt; Target</text>
    <rect x="150" y="50" width="100" height="40" rx="5" class="box"/><text x="200" y="75" text-anchor="middle" class="text">Adaptee</text>
    <rect x="87.5" y="150" width="100" height="40" rx="5" class="box"/><text x="137.5" y="175" text-anchor="middle" class="text">Adapter</text>
    <path class="arrow" d="M137.5,150 v-45 l-62.5,-25"/>
    <path class="arrow" d="M137.5,150 v-45 l62.5,-25"/>

    <text x="375" y="20" text-anchor="middle" font-weight="bold">对象适配器 (组合)</text>
    <rect x="275" y="50" width="100" height="40" rx="5" class="abox"/><text x="325" y="75" text-anchor="middle" class="text">&lt;interface&gt; Target</text>
    <rect x="400" y="50" width="100" height="40" rx="5" class="box"/><text x="450" y="75" text-anchor="middle" class="text">Adaptee</text>
    <rect x="337.5" y="150" width="100" height="40" rx="5" class="box"/><text x="387.5" y="175" text-anchor="middle" class="text">Adapter</text>
    <path class="arrow" d="M387.5,150 v-60 l-62.5,-15"/>
    <path class="arrow" d="M387.5,150 h-50 l-50,-25 v-10" marker-start="url(#diamond)"><path d="M-5,0 L0,3 L5,0 L0,-3 Z" fill="#fff" stroke="#333" transform="translate(337.5, 175) rotate(180)"/></path>
</svg>

### 46. 适配器模式和装饰器模式的区别是什么？

**核心答案**

最核心的区别在于它们的**意图**：

*   **适配器模式 (Adapter)**: 旨在**转换接口**，让两个不兼容的接口能够协同工作。它关注的是“补救”和“兼容”。
*   **装饰器模式 (Decorator)**: 旨在**增强功能**，在不改变原有接口的前提下，为对象动态地添加新的职责。它关注的是“增强”和“扩展”。

**详细对比**

| 维度 | 适配器模式 | 装饰器模式 |
| :--- | :--- | :--- |
| **设计意图** | **改变**并统一接口，解决**接口不兼容**问题。 | **不改变**接口，动态地为对象**添加功能**。 |
| **与原对象关系** | 适配器与被适配者是两个独立的概念。 | 装饰器与被装饰者实现**相同的接口**，是**is-a**关系。 |
| **使用时机** | 通常在系统后期，需要集成现有组件时使用。 | 通常在系统设计初期，就预料到功能需要灵活扩展时使用。 |
| **对接口的影响** | 产生一个**新**的、符合期望的接口。 | **保持**原有接口不变。 |
| **结构** | 适配器包装一个**完全不同**的接口。 | 装饰器包装一个**类型相同**的接口。 |
| **类比** | 转换插头 (Adapter) | 穿衣服 (Decorator)，给“人”这个对象添加保暖、美观等功能。 |

### 47. 适配器模式的应用场景有哪些？

**核心答案**

1.  **系统集成与兼容**: 当需要集成一个功能强大但接口不符的第三方库或遗留系统时。
2.  **统一不同来源的数据**: 当需要处理来自不同数据源（如 XML, JSON, 数据库）的数据，并将其转换为统一的格式时。
3.  **日志框架适配**: 在不同的日志实现（如 Log4j, Logback）之上提供一个统一的门面（如 SLF4J）。

**具体例子**

*   **Java IO**: `java.io.InputStreamReader` 就是一个适配器，它将字节输入流 `InputStream` (Adaptee) 适配成了字符输入流 `Reader` (Target)。
*   **Java Util**: `java.util.Arrays.asList()` 方法，它将一个数组 (Adaptee) 适配成了一个 `List` (Target)，让你可以用 `List` 的方式操作数组。
*   **SLF4J (Simple Logging Facade for Java)**: SLF4J 本身定义了一套日志接口 (Target)，然后通过提供不同的“桥接包”（如 `slf4j-log4j12`），将对 SLF4J 接口的调用适配到底层的具体日志框架 (Adaptee) 上。
*   **Spring AOP**: `AdvisorAdapter` 接口，用于将不同类型的 `Advice` (如 `MethodBeforeAdvice`, `AfterReturningAdvice`) 适配成 AOP 框架内部统一使用的 `Interceptor`。

### 48. Spring MVC 中的 HandlerAdapter 使用了什么模式？

**核心答案**

Spring MVC 中的 `HandlerAdapter` 完美地应用了**适配器模式 (Adapter Pattern)**。

**详细说明**

1.  **面临的问题**: 在 Spring MVC 框架中，`DispatcherServlet` 是前端控制器，负责接收所有请求并将其分发给对应的处理器（Handler）。但是，处理器的类型多种多样，例如：
    *   实现了 `Controller` 接口的类。
    *   实现了 `HttpRequestHandler` 接口的类。
    *   使用 `@RequestMapping` 注解的普通 Controller 方法。
        这些不同类型的 Handler，其被调用的方式和方法签名都完全不同。`DispatcherServlet` 如果要自己去判断并调用每一种 Handler，代码将会变得极其复杂和臃肿（充满了 `if-else`）。

2.  **适配器模式的解决方案**:
    *   `DispatcherServlet` (客户端) 定义了一个统一的 `HandlerAdapter` 接口 (Target)，这个接口有一个核心方法，如 `handle(...)`。
    *   Spring 为每一种 Handler 类型都提供了一个对应的 `HandlerAdapter` 实现：
        *   `SimpleControllerHandlerAdapter` 适配 `Controller` 接口。
        *   `HttpRequestHandlerAdapter` 适配 `HttpRequestHandler` 接口。
        *   `RequestMappingHandlerAdapter` 适配 `@RequestMapping` 注解的方法。
    *   `DispatcherServlet` 的工作流程变为：
        1.  找到匹配请求的 Handler。
        2.  遍历容器中所有的 `HandlerAdapter`，找到那个**支持（`supports()`）**当前 Handler 类型的 `HandlerAdapter`。
        3.  调用这个 `HandlerAdapter` 的 `handle()` 方法。
        4.  这个 `Adapter` 内部会用该 Handler 类型特有的方式去真正执行业务逻辑，然后返回一个统一的 `ModelAndView` 对象给 `DispatcherServlet`。

**总结**: `HandlerAdapter` 作为一个适配器，成功地将各种不同接口的 Handler (Adaptee) 适配给了 `DispatcherServlet` (Client) 所期望的统一调用接口 (Target)，极大地解耦了框架的核心调度逻辑与具体的业务处理器实现。

### 装饰器模式

### 49. 什么是装饰器模式？装饰器模式的作用是什么？

**核心答案**

装饰器模式（Decorator Pattern）是一种结构型设计模式，它允许向一个现有的对象**动态地**、**透明地**添加新的功能，同时又不改变其结构。就增加功能而言，装饰器模式比生成子类更为灵活。

**详细说明**

1.  **核心思想**:
    *   **包装 (Wrapping)**: 装饰器模式通过创建一个包装对象（装饰器）来包裹真实的对象。
    *   **链式组合**: 多个装饰器可以像套娃一样层层包裹，每个装饰器都添加一项新的职责。
    *   **接口一致**: 装饰器类和被装饰的原始类都实现同一个接口，这保证了对于客户端来说，无论是使用原始对象还是装饰后的对象，方式都是一样的（透明性）。

2.  **生活中的类比**:
    *   **咖啡与调料**: 一杯原味咖啡（被装饰对象）是基础。你可以加糖（装饰器），再加牛奶（另一个装饰器），再加奶油（再一个装饰器）。每加一种调料，都是在不改变“它是一杯咖啡”这个本质的前提下，为它增加了新的风味（功能）。而且加调料的顺序和种类可以任意组合。

3.  **UML 结构与角色**:
    *   `Component` (抽象组件): 定义了原始对象和装饰器对象的共同接口。
    *   `ConcreteComponent` (具体组件): `Component` 接口的实现，即被装饰的原始对象。
    *   `Decorator` (抽象装饰器): 同样实现 `Component` 接口，并且内部持有一个 `Component` 对象的引用。它是一个抽象类，定义了装饰器的基本结构。
    *   `ConcreteDecorator` (具体装饰器): `Decorator` 的子类，负责向 `Component` 对象添加具体的职责。

4.  **作用与价值**:
    *   **遵循开闭原则**: 可以在不修改现有代码的情况下，为对象扩展功能。
    *   **灵活性高**: 比继承更灵活。继承是静态的，在编译时就确定了；而装饰器可以在运行时动态地组合和添加功能。
    *   **避免类爆炸**: 使用继承来扩展功能，每一种功能的组合都需要一个子类，容易导致子类数量爆炸。装饰器模式用少量的类就可以实现多种功能的自由组合。

### 50. 装饰器模式和继承的区别是什么？

**核心答案**

最主要的区别在于**功能扩展的时机和灵活性**：

*   **继承**是在**编译时**静态地为类添加功能，一旦确定，运行时无法改变。
*   **装饰器模式**是在**运行时**动态地为对象添加功能，可以根据需要任意组合。

**详细对比**

| 维度 | 继承 | 装饰器模式 |
| :--- | :--- | :--- |
| **时机** | **静态**的，在编译期就已经确定。 | **动态**的，在运行期可以按需添加。 |
| **粒度** | 对**类**进行扩展。一个子类会继承父类所有的功能。 | 对**对象**进行扩展。可以只为某一个对象实例添加功能。 |
| **灵活性** | 较差。功能的组合需要创建新的子类，易导致类爆炸。 | 很高。可以通过组合不同的装饰器实现功能的任意排列组合。 |
| **耦合度** | 较高。子类与父类紧密耦合。 | 较低。装饰器与组件之间通过接口松散耦合。 |
| **示例** | `Dog` 继承 `Animal`。 | `BufferedInputStream` 装饰 `FileInputStream`。 |

### 51. 装饰器模式的应用场景有哪些？

**核心答案**

1.  **IO 流的增强**: 当需要为输入/输出流添加缓冲、压缩、加密等功能时。
2.  **数据源包装**: 为数据源对象添加缓存、权限校验、读写分离等功能。
3.  **GUI 组件扩展**: 为窗口、按钮等图形界面组件添加边框、滚动条等功能。

**具体例子**

*   **Java IO (最经典)**:
    *   `BufferedInputStream` 装饰 `FileInputStream`，为其增加缓冲功能，提高读取效率。
    *   `DataInputStream` 装饰其他输入流，为其增加读取基本数据类型（如 `readInt()`, `readDouble()`）的功能。
    *   整个 `java.io` 包的设计就是装饰器模式的教科书级案例。
*   **Java Collections**:
    *   `Collections.synchronizedList(new ArrayList<>())` 返回一个线程安全的 `List`。`SynchronizedList` 就是一个装饰器，它包装了原始的 `ArrayList`，并在所有方法上添加了 `synchronized` 锁。
*   **MyBatis**:
    *   MyBatis 的二级缓存实现中，`CachingExecutor` 装饰了 `SimpleExecutor`。当查询请求到来时，`CachingExecutor` 会先检查二级缓存，如果缓存未命中，再调用 `SimpleExecutor` 去查询数据库。
*   **Spring**:
    *   Spring 中大量使用了 `BeanWrapper` 接口，它也是一种装饰器，用于包装 Bean 对象，方便地进行属性的获取和设置。

### 52. Java I/O 流使用了什么设计模式？

**核心答案**

Java I/O 流的设计主要、也是最经典地使用了**装饰器模式 (Decorator Pattern)**，同时也结合了**适配器模式 (Adapter Pattern)** 和**工厂模式 (Factory Pattern)**。

**详细说明**

1.  **装饰器模式 (核心)**:
    *   这是 I/O 库的支柱。整个体系以 `InputStream`, `OutputStream`, `Reader`, `Writer` 等抽象基类（`Component`）为核心。
    *   像 `FileInputStream` 和 `ByteArrayInputStream` 是具体的节点流（`ConcreteComponent`），它们直接与数据源（文件、内存）交互。
    *   而像 `BufferedInputStream`, `DataInputStream`, `GZIPOutputStream` 等都是处理流（`Decorator`），它们接收一个已存在的流对象作为构造参数，并对其进行包装，以增加如“缓冲”、“读写基本类型”、“压缩”等新功能。
    *   **示例**: `new DataInputStream(new BufferedInputStream(new FileInputStream("data.txt")))`
        *   `FileInputStream` 是被装饰的原始对象。
        *   `BufferedInputStream` 是第一个装饰器，增加了缓冲功能。
        *   `DataInputStream` 是第二个装饰器，在缓冲的基础上又增加了读写基本数据类型的功能。

2.  **适配器模式**:
    *   `InputStreamReader` 和 `OutputStreamWriter` 是典型的适配器。
    *   `InputStreamReader` 将一个基于字节的 `InputStream` (Adaptee) 适配成一个基于字符的 `Reader` (Target)。
    *   `OutputStreamWriter` 将一个基于字符的 `Writer` (Target) 适配成一个基于字节的 `OutputStream` (Adaptee)。
    *   它们解决了字节流和字符流之间接口不兼容的问题。

3.  **工厂模式**:
    *   虽然不那么明显，但 `Files.newInputStream(path)` 和 `Files.newBufferedReader(path)` 等 `java.nio.file.Files` 工具类中的方法，可以看作是工厂方法的应用。你不需要关心底层具体创建的是哪种流，工厂方法会为你选择最优的实现。

### 桥接模式

### 53. 什么是桥接模式？桥接模式的作用是什么？

**核心答案**

桥接模式（Bridge Pattern）是一种结构型设计模式，其主旨是**将抽象部分与它的实现部分分离，使它们都可以独立地变化**。它通过提供一个“桥梁”结构，将继承关系转换为组合关系，从而降低系统的耦合度，应对多维度的变化。

**详细说明**

1.  **核心思想**:
    *   **识别变化维度**: 桥接模式通常用于处理具有两个或多个独立变化维度的情况。例如，一个“形状”可以有“圆形”、“方形”等变化，同时它的“颜色”可以有“红色”、“蓝色”等变化。
    *   **分离维度**: 与其使用多层继承（如 `RedCircle`, `BlueCircle`, `RedSquare`, `BlueSquare`...）导致类爆炸，不如将“形状”和“颜色”这两个维度分离。
    *   **组合代替继承**: “形状”类（抽象部分）内部持有一个“颜色”接口（实现部分）的引用。这样，形状和颜色就可以各自独立地扩展，而不会相互影响。

2.  **生活中的类比**:
    *   **遥控器与电视机**: 遥控器（抽象部分）和电视机（实现部分）是分离的。你可以有多种遥控器（如普通遥控器、智能语音遥控器），也可以有多种电视机（如索尼电视、三星电视）。任何一个遥控器都可以通过标准的红外/蓝牙协议（桥梁）去控制任何一个品牌的电视机。遥控器的升级（增加新按钮）和电视机的升级（增加新功能）是独立进行的。

3.  **UML 结构与角色**:
    *   `Abstraction` (抽象类): 定义了抽象部分的接口，并持有一个 `Implementor` 接口的引用。
    *   `RefinedAbstraction` (扩充抽象类): 继承 `Abstraction`，扩展抽象部分的接口。
    *   `Implementor` (实现类接口): 定义了实现部分的接口，这个接口不一定要与 `Abstraction` 的接口完全一致。
    *   `ConcreteImplementor` (具体实现类): 实现了 `Implementor` 接口，是实现部分的具体实现。

4.  **作用与价值**:
    *   **分离抽象与实现**: 这是桥接模式最核心的作用，使得两者可以独立演化。
    *   **避免类爆炸**: 有效地减少了子类的数量，避免了因多维度变化而导致的多层继承问题。
    *   **提高扩展性**: 抽象部分和实现部分都可以非常方便地进行扩展，符合开闭原则。
    *   **解耦**: 将紧密的继承关系转换为松散的组合关系。

<svg width="450" height="250" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.abox{stroke:#666;stroke-width:1;fill:#e0f7fa;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker><marker id="diamond" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M4,0 L8,4 L4,8 L0,4 Z" fill="#fff" stroke="#333"/></marker></defs>
    <rect x="20" y="50" width="120" height="40" rx="5" class="abox"/><text x="80" y="75" text-anchor="middle" class="text">Abstraction</text>
    <rect x="20" y="150" width="120" height="40" rx="5" class="box"/><text x="80" y="175" text-anchor="middle" class="text">RefinedAbstraction</text>
    <rect x="300" y="50" width="120" height="40" rx="5" class="abox"/><text x="360" y="75" text-anchor="middle" class="text">&lt;interface&gt; Implementor</text>
    <rect x="300" y="150" width="120" height="40" rx="5" class="box"/><text x="360" y="175" text-anchor="middle" class="text">ConcreteImplementor</text>
    <path class="arrow" d="M80,150 v-60"/>
    <path class="arrow" d="M360,150 v-60"/>
    <path class="arrow" d="M140,70 h160" marker-start="url(#diamond)"/><text x="220" y="65" class="text" font-size="10">持有(桥梁)</text>
</svg>

### 54. 桥接模式的应用场景有哪些？

**核心答案**

1.  **JDBC 驱动架构**: 当一个系统需要在多个数据库平台（如 MySQL, Oracle, SQL Server）上运行时。
2.  **跨平台 GUI 开发**: 当需要在不同的操作系统（如 Windows, macOS, Linux）上提供一套统一的图形界面时。
3.  **多维度变化的业务场景**: 当一个业务对象有两个或更多独立变化的维度，且不希望使用多层继承时。

**具体例子**

*   **JDBC (最经典)**:
    *   `java.sql` 包中的 `Connection`, `Statement`, `ResultSet` 等接口构成了**抽象部分**，这是 Java 提供给应用程序开发者的统一 API。
    *   各大数据库厂商（MySQL, Oracle 等）提供的具体 `Driver` 实现构成了**实现部分**。
    *   `DriverManager` 通过“桥梁”机制，根据连接字符串加载并使用了正确的数据库驱动。这样，Java 应用程序代码（抽象）和具体的数据库实现（实现）就解耦了，可以独立变化。你的 Java 代码无需为更换数据库而做任何修改。

*   **AWT (Java 早期的 GUI 库)**:
    *   AWT 试图为所有 Java 组件（如 `Button`, `TextField`）提供一套抽象接口。
    *   在不同的操作系统下，这些组件的绘制和行为由底层的操作系统原生组件（Peer）来实现。`Button` 是抽象，`WindowsButtonPeer` 和 `MacButtonPeer` 就是具体实现。

*   **支付场景**:
    *   假设一个支付系统需要支持多种**支付方式**（支付宝、微信支付、银行卡）和多种**支付模式**（密码支付、指纹支付、扫脸支付）。
    *   这里，“支付方式”和“支付模式”就是两个独立变化的维度。我们可以将“支付模式”作为**抽象部分**（如 `AbstractPaymentMode`），它持有一个“支付方式”接口（`IPaymentGateway`）的引用。这样，`FingerprintPayment` 就可以组合 `AlipayGateway` 或 `WechatPayGateway`，而无需创建 `AlipayFingerprintPayment` 这样的子类。

### 55. JDBC 驱动使用了什么设计模式？

**核心答案**

JDBC 驱动的整体架构主要使用了**桥接模式 (Bridge Pattern)**，同时也体现了**工厂模式 (Factory Pattern)** 的思想。

**详细说明**

1.  **桥接模式 (核心架构)**:
    *   **抽象部分**: `java.sql` 包提供的一系列标准接口，如 `Connection`, `Statement`, `Driver`。这些是 Sun 公司制定的、独立于任何具体数据库的 Java 数据库连接规范。
    *   **实现部分**: 各个数据库厂商根据这套规范编写的具体驱动包，如 MySQL 的 `mysql-connector-java.jar`。这里面的 `com.mysql.cj.jdbc.Driver` 类就是 `java.sql.Driver` 的具体实现。
    *   **桥梁**: `DriverManager` 类充当了这个桥梁。它负责管理所有注册的 `Driver` 实现。当应用程序调用 `DriverManager.getConnection(url, ...)` 时，`DriverManager` 会根据传入的 `url`（如 `jdbc:mysql://...`）去查找并委托合适的 `Driver` 实现来创建一个具体的 `Connection` 对象（如 `com.mysql.cj.jdbc.ConnectionImpl`）。
    *   **效果**: 这种设计完美地将**Java 应用程序的数据库操作（抽象）**与**特定数据库的底层实现（实现）**分离开来。开发者只需要面向 `java.sql` 的标准接口编程，而无需关心底层用的是 MySQL 还是 Oracle。更换数据库时，只需更换驱动包和连接字符串即可，应用代码无需变动。

2.  **工厂模式**:
    *   `DriverManager.getConnection(...)` 方法的行为非常像一个工厂方法。客户端（应用程序）向这个“工厂”提供一个标识（连接字符串 `url`），工厂内部根据这个标识去生产出相应的产品（一个具体的 `Connection` 实现）。
    *   同样，`Connection` 对象本身也可以看作一个工厂，它提供了 `createStatement()`、`prepareStatement()` 等方法来创建 `Statement` 对象。

### 外观模式

### 56. 什么是外观模式（门面模式）？外观模式的作用是什么？

**核心答案**

外观模式（Facade Pattern），也叫门面模式，是一种结构型设计模式。它为子系统中的一组复杂接口提供一个**统一的、简化的、高层的接口**，使得子系统更加易于使用。

**详细说明**

1.  **核心思想**:
    *   **封装复杂性**: 当一个系统或模块内部非常复杂，包含了大量的类和交互时，直接让外部客户端去了解和调用这些内部细节会非常困难和混乱。
    *   **提供单一入口**: 外观模式通过创建一个 `Facade` 类，将这些复杂的内部调用流程封装起来，并向外提供一个或几个简单的方法。客户端只需要与这个 `Facade` 类交互，而无需关心子系统内部是如何运作的。

2.  **生活中的类比**:
    *   **一键启动家庭影院**: 一个家庭影院系统可能包含投影仪、幕布、DVD 播放器、音响、灯光等多个设备（子系统）。如果每次看电影都需要你手动按顺序打开每个设备并进行设置，会非常繁琐。一个“智能中控”（Facade）提供了一个“观影模式”按钮，你只需按一下，它就会自动帮你完成所有复杂的操作：降下幕布、打开投影仪、启动 DVD、打开音响、调暗灯光。

3.  **UML 结构与角色**:
    *   `Facade` (外观类): 核心角色。它知道所有子系统的功能和职责，并将客户端的请求委托给适当的子系统对象来处理。
    *   `SubSystem classes` (子系统类集合): 实现子系统的功能，处理 `Facade` 对象指派的任务。它们不了解 `Facade` 的存在。

4.  **作用与价值**:
    *   **简化客户端使用**: 为复杂的子系统提供了一个简单的接口，降低了客户端的使用难度。
    *   **降低耦合度**: 实现了客户端与子系统之间的解耦。客户端只依赖于 `Facade` 接口，子系统的内部变化（如类的增删、关系的改变）不会影响到客户端。
    *   **划分访问层次**: 对于一个大型系统，可以使用外观模式将其划分为多个子系统，并为每个子系统设计一个 `Facade`，从而形成清晰的层次结构。

### 57. 外观模式的应用场景有哪些？

**核心答案**

1.  **简化复杂接口**: 当需要为一个复杂的模块或子系统提供一个简单的接口时。
2.  **构建分层结构**: 当需要构建一个层次化的系统结构，通过外观模式定义每一层的入口点。
3.  **封装遗留系统或第三方库**: 当需要封装一个设计粗糙、接口复杂的旧系统或第三方库时。

**具体例子**

*   **SLF4J (Simple Logging Facade for Java)**: SLF4J 本身就是一套日志外观，它为多种日志实现（Log4j, Logback, JUL）提供了一套统一的、简单的 API。你的应用程序只需要面向 SLF4J 编程，就可以在不修改代码的情况下，灵活地切换底层的日志框架。
*   **MyBatis**: `SqlSession` 接口可以被看作是 MyBatis 核心功能的一个外观。它封装了内部复杂的 `Executor`, `StatementHandler`, `ParameterHandler`, `ResultSetHandler` 等组件的交互过程，为用户提供了简洁的 `selectOne()`, `insert()`, `update()` 等数据库操作方法。
*   **Tomcat**: Tomcat 对外暴露的 `Request` 和 `Response` 对象，实际上是 `RequestFacade` 和 `ResponseFacade`。它们封装了内部复杂的 `CoyoteRequest` 等对象的实现细节，只暴露了 `HttpServletRequest` 和 `HttpServletResponse` 规范中定义的标准方法，既简化了 Servlet 开发者的使用，又保证了内部实现的安全性。
*   **Spring JDBC**: `JdbcTemplate` 是 Spring 对原生 JDBC 操作的一个外观封装。它封装了创建连接、创建 `Statement`、处理异常、关闭资源等所有繁琐的模板化代码，让开发者只需要专注于提供 SQL 和处理结果集。

### 58. 外观模式的优缺点是什么？

**核心答案**

*   **优点**:
    1.  **简化接口，易于使用**: 降低了客户端与复杂子系统之间的交互难度。
    2.  **降低耦合**: 客户端与子系统解耦，提高了系统的独立性和可移植性。
    3.  **提高安全性**: 可以只暴露必要的功能给外部，隐藏内部实现细节。
    4.  **符合迪米特法则**: 客户端只与它的直接朋友 `Facade` 交互。

*   **缺点**:
    1.  **可能不符合开闭原则**: 当子系统的功能发生变化时，可能需要修改 `Facade` 类的代码。如果 `Facade` 变得过于庞大，维护成本会增加。
    2.  **可能隐藏底层细节**: 过度依赖外观可能会让开发者对底层实现一无所知，不利于问题排查和性能优化。
    3.  **可能成为“上帝类” (God Class)**: 如果一个 `Facade` 封装了过多的功能，它可能会变成一个无所不包的“上帝类”，违反单一职责原则。

**补充说明**: 外观模式并不限制客户端直接访问子系统。如果客户端有特殊需求，仍然可以直接调用子系统的类。外观模式只是提供了一个便捷的“快捷方式”。


### 组合模式

### 59. 什么是组合模式？组合模式的作用是什么？

**核心答案**

组合模式（Composite Pattern）是一种结构型设计模式，它允许你将对象组合成**树形结构**来表示“部分-整体”的层次关系。组合模式使得客户端可以**统一地对待单个对象（叶子节点）和组合对象（容器节点）**，无需区分它们，从而简化了客户端代码。

**详细说明**

1.  **核心思想**:
    *   **树形结构**: 该模式非常适合用来表示具有层级结构的数据，例如文件系统（文件夹包含文件和其他文件夹）、组织架构（部门包含员工和其他子部门）。
    *   **一致性对待**: 组合模式的核心在于定义一个抽象组件（Component）接口，这个接口同时被“叶子”对象和“容器”对象实现。这样一来，客户端代码就可以通过这个统一的接口来操作树中的任何节点，而不需要用 `if-else` 来判断当前处理的是叶子还是容器。

2.  **生活中的类比**:
    *   **军队编制**: 一个军队（Composite）由多个军（Composite）组成，一个军由多个师（Composite）组成，一个师由多个旅（Composite）组成，直到最小单位士兵（Leaf）。对于“执行命令”这个操作，上级可以对整个军下达，也可以对某个士兵下达，操作方式是一致的。

3.  **UML 结构与角色**:
    *   `Component` (抽象组件): 是组合中所有对象的抽象基类（或接口）。它声明了叶子节点和容器节点共有的接口，如 `add`, `remove`, `getChild`, 以及业务方法 `operation()`。
    *   `Leaf` (叶子节点): 表示树形结构中的末端节点，它没有子节点。它实现了 `Component` 接口中定义的业务方法，但对于 `add`, `remove` 等管理子节点的方法，通常会抛出异常或空实现。
    *   `Composite` (容器/组合节点): 表示树中的分支节点，可以包含子节点（`Leaf` 或 `Composite`）。它实现了 `Component` 接口中所有的方法，包括管理子节点的方法和业务方法。它的业务方法通常会委托给其子节点来执行。
    *   `Client` (客户端): 通过 `Component` 接口与组合结构中的对象交互。

4.  **作用与价值**:
    *   **简化客户端代码**: 客户端可以忽略组合对象和单个对象的差异，以统一的方式处理所有对象。
    *   **易于扩展**: 可以很方便地增加新的 `Leaf` 或 `Composite` 类，而无需修改现有代码，符合开闭原则。
    *   **清晰的层次结构**: 可以清晰地定义对象的层次结构。

<svg width="450" height="250" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.abox{stroke:#666;stroke-width:1;fill:#e0f7fa;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker><marker id="diamond" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M4,0 L8,4 L4,8 L0,4 Z" fill="#fff" stroke="#333"/></marker></defs>
    <rect x="165" y="20" width="120" height="40" rx="5" class="abox"/><text x="225" y="45" text-anchor="middle" class="text">Component</text>
    <rect x="50" y="150" width="120" height="40" rx="5" class="box"/><text x="110" y="175" text-anchor="middle" class="text">Leaf</text>
    <rect x="280" y="150" width="120" height="40" rx="5" class="box"/><text x="340" y="175" text-anchor="middle" class="text">Composite</text>
    <path class="arrow" d="M110,150 v-95 c0,-15 55,-15 115,-15"/>
    <path class="arrow" d="M340,150 v-95 c0,-15 -55,-15 -115,-15"/>
    <path class="arrow" d="M340,150 c60,0 60,-80 0,-80" marker-start="url(#diamond)"/><text x="400" y="100" class="text" font-size="10">children</text>
</svg>

### 60. 组合模式的应用场景有哪些？

**核心答案**

凡是需要表示“部分-整体”的、具有**树形层级结构**的场景，并且希望以统一的方式处理层级中的所有对象时，都应该考虑使用组合模式。

**具体例子**

1.  **图形用户界面 (GUI)**:
    *   一个窗口 (`JFrame`) 是一个容器 (`Composite`)，它可以包含面板 (`JPanel`)。
    *   一个面板 (`JPanel`) 也是一个容器 (`Composite`)，它可以包含按钮 (`JButton`)、文本框 (`JTextField`) 等叶子组件，也可以包含其他面板。
    *   对于“绘制”（`paint()`）或“设置可见性”（`setVisible()`）等操作，你可以对整个窗口执行，它会自动递归地对其所有子组件执行相同的操作。

2.  **文件系统**:
    *   文件夹 (`Folder`) 是一个容器 (`Composite`)，可以包含文件 (`File`) 和其他文件夹。
    *   文件 (`File`) 是一个叶子节点 (`Leaf`)。
    *   对于“计算大小”、“删除”或“搜索”等操作，无论是针对单个文件还是整个文件夹，调用的方式都是一致的。

3.  **组织架构与菜单系统**:
    *   公司（Composite）下有部门（Composite），部门下有小组（Composite）和员工（Leaf）。
    *   网站的菜单栏（Composite）下有主菜单项（Composite），主菜单项下有子菜单项（Leaf 或 Composite）。

4.  **抽象语法树 (AST)**:
    *   在编译器或解释器中，源代码被解析成一棵抽象语法树。树中的每个节点，无论是表示一个表达式（Composite）还是一个操作数（Leaf），都继承自同一个 `Node` 基类。

5.  **MyBatis 框架**:
    *   MyBatis 的动态 SQL 功能中，`<if>`, `<where>`, `<foreach>` 等标签的解析过程就用到了组合模式。
    *   每个 SQL 节点（如静态文本、`<if>` 标签）都实现了 `SqlNode` 接口。像 `<if>` 这样的节点就是一个 `Composite`，它内部包含了其他 `SqlNode`。当最终拼接 SQL 语句时，会从根节点开始递归调用每个节点的 `apply()` 方法，从而组合出完整的 SQL。

### 61. 文件系统使用了什么设计模式？

**核心答案**

文件系统的设计和操作，最核心、最典型地体现了**组合模式 (Composite Pattern)**。

**详细说明**

让我们以 Java 的 `java.io.File` 类（虽然其设计不完美，但能说明思想）或更现代的文件系统 API 为例，来分析组合模式的应用：

1.  **抽象组件 (Component)**: 我们可以想象一个抽象的 `FileSystemNode` 接口或类，它定义了所有文件系统对象的共同行为，例如：
    *   `getName()`: 获取名称
    *   `getSize()`: 计算大小
    *   `delete()`: 删除
    *   `getPath()`: 获取路径

2.  **叶子节点 (Leaf)**: **文件 (File)** 就是叶子节点。
    *   它实现了 `FileSystemNode` 的所有方法。
    *   `getSize()` 直接返回文件的大小。
    *   它没有子节点，所以如果调用 `getChildren()` 或 `add()` 等方法会返回空或抛出异常。

3.  **容器节点 (Composite)**: **文件夹/目录 (Directory)** 就是容器节点。
    *   它也实现了 `FileSystemNode` 的所有方法。
    *   它可以包含子节点（其他文件或文件夹）。
    *   它的 `getSize()` 方法实现会比较特殊：它会**遍历其所有子节点**，并**递归地调用**每个子节点的 `getSize()` 方法，然后将结果累加起来返回。
    *   `delete()` 方法同样会递归删除其下的所有内容。

**效果**:
正是因为文件和文件夹都遵循了同一个“组件”接口，所以客户端（比如你的文件管理器或者一段代码）可以完全不用区分它们。当你想计算一个目录的总大小时，你只需对该目录对象调用 `getSize()` 即可，你完全不必关心它内部有多少层嵌套、哪些是文件、哪些是子目录。组合模式的递归结构已经帮你处理了这一切复杂性。

### 享元模式

### 62. 什么是享元模式？享元模式的作用是什么？

**核心答案**

享元模式（Flyweight Pattern）是一种结构型设计模式，它旨在通过**共享技术**来有效地支持大量**细粒度**的对象，以**最大限度地减少内存使用和对象创建的数量**。

**详细说明**

1.  **核心思想**:
    *   **分离内外状态**: 享元模式的关键在于将一个对象的状态划分为两部分：
        *   **内部状态 (Intrinsic State)**: 这部分状态是**可以共享**的、不随外部环境改变而改变的。它被存储在享元对象内部。例如，字符 'A' 的字形、字体、大小。
        *   **外部状态 (Extrinsic State)**: 这部分状态是**不可以共享**的、随外部环境改变而改变的。它由客户端在使用享元对象时传入。例如，字符 'A' 在文档中出现的**位置** (x, y 坐标)。
    *   **享元工厂**: 创建一个工厂类，该工厂类维护一个“池”或“缓存”，用于存储已经创建的享元对象。当客户端请求一个对象时，工厂会先检查池中是否已存在具有相同内部状态的对象，如果存在，则直接返回共享的实例；如果不存在，则创建一个新的实例，存入池中，然后返回。

2.  **作用与价值**:
    *   **大幅减少内存占用**: 如果一个系统中存在大量相似或重复的对象，通过共享可以显著减少对象的总数，从而节省内存。
    *   **提高性能**: 减少了对象的创建和销毁次数，减轻了垃圾回收（GC）的压力，从而提升了系统性能。

3.  **UML 结构与角色**:
    *   `Flyweight` (抽象享元): 定义了享元对象的接口，通过这个接口，`Flyweight` 可以接受并作用于外部状态。
    *   `ConcreteFlyweight` (具体享元): 实现了 `Flyweight` 接口，并为内部状态增加存储空间。
    *   `UnsharedConcreteFlyweight` (非共享具体享元): 少数不需要共享的享元子类。
    *   `FlyweightFactory` (享元工厂): 负责创建和管理享元对象。
    *   `Client` (客户端): 维持一个对享元的引用，并计算或存储享元的外部状态。

### 63. 享元模式如何减少内存占用？

**核心答案**

享元模式通过**共享具有相同内部状态的对象实例**来减少内存占用。

**详细说明**

假设我们要开发一个文本编辑器，文档中有 100 万个字符。

*   **不使用享元模式**:
    *   每个字符都创建一个 `Character` 对象。
    *   每个对象都包含：`char value` (如 'A'), `Font font`, `int size` (内部状态) 和 `int x, int y` (外部状态)。
    *   如果文档中有 10,000 个字母 'A'，即使它们的字体和大小都一样，我们也会创建 10,000 个独立的 `Character` 对象。
    *   总对象数 = 100 万个。

*   **使用享元模式**:
    1.  **状态分离**:
        *   **内部状态**: `char value`, `Font font`, `int size`。这些是可以共享的。
        *   **外部状态**: `int x`, `int y`。这些是每个字符独有的。
    2.  **创建享元对象**: 我们只为具有**唯一内部状态组合**的字符创建对象。例如，所有字体为“宋体”、大小为“12”的字母 'A'，在内存中**只会有一个**共享的 `FlyweightCharacter` 对象。
    3.  **享元工厂**: 工厂维护一个 `Map<String, FlyweightCharacter>`，其中 `key` 可以是 "A_宋体_12" 这样的字符串，`value` 就是那个共享的享元对象。
    4.  **客户端使用**:
        *   客户端在绘制文档时，需要绘制字母 'A'。
        *   它向工厂请求 `getFlyweight("A_宋体_12")`。工厂返回共享的 'A' 对象。
        *   客户端调用 `sharedA.draw(x, y)`，将外部状态（坐标）传进去。
    *   **结果**: 如果文档中有 10,000 个字母 'A'（同字体同大小），内存中只有一个 'A' 的享元对象。假设整个文档只有几百种“字符-字体-大小”的组合，那么最终内存中的享元对象也只有几百个。
    *   总对象数 ≈ 几百个，而不是 100 万个。内存占用得到极大优化。

### 64. 享元模式的应用场景有哪些？

**核心答案**

1.  **大量相似对象**: 系统中存在大量相似或相同的对象，导致内存开销巨大。
2.  **对象状态可分离**: 大部分对象的状态可以被外部化，剥离为外部状态。
3.  **性能要求高**: 对象的创建和销毁对性能影响较大。

**具体例子**

*   **Java String 常量池**: 这是最经典的享元模式应用。字符串是不可变的，相同的字符串字面量在内存中只会有一个实例。
*   **Java Integer/Long 缓存**: `Integer.valueOf(int)` 会缓存 -128 到 127 之间的整数对象，避免重复创建。
*   **数据库连接池/线程池**: 连接池和线程池中的“连接”和“线程”对象就是被共享的享元对象。它们被创建后放入池中，供多个客户端重复使用，避免了频繁创建和销毁这些重量级资源的开销。虽然它们有状态（如连接是否被占用），但其核心资源是可以复用的。
*   **围棋棋子**: 一个棋盘上有 361 个位置，但棋子只有两种：黑子和白子。在程序实现中，我们完全不需要创建 361 个棋子对象，只需要一个黑子对象和一个白子对象（享元）。棋盘 `Board` 类负责存储每个位置上是哪种颜色的棋子（外部状态）。绘制棋盘时，根据位置信息获取共享的黑/白子对象，并调用其 `draw(x, y)` 方法即可。

### 65. String 的常量池使用了什么设计模式？

**核心答案**

Java 中 `String` 的常量池（String Constant Pool）是**享元模式 (Flyweight Pattern)** 的一个完美实践。

**详细说明**

1.  **内部状态**: 字符串的**字符序列**本身就是它的内部状态。由于 `String` 对象是**不可变的 (immutable)**，所以它的内部状态一旦创建就永远不会改变，这为共享提供了完美的先决条件。

2.  **享元工厂**: JVM 中的字符串常量池就扮演了**享元工厂**的角色。

3.  **工作机制**:
    *   当你通过**字面量**的方式创建一个字符串时，如 `String s1 = "hello";`，JVM 会首先检查字符串常量池中是否已经存在一个值为 "hello" 的字符串对象。
    *   **如果存在**，JVM 会直接返回池中该对象的引用给 `s1`，而不会创建新的对象。
    *   **如果不存在**，JVM 会在池中创建一个新的 "hello" 对象，然后将其引用返回给 `s1`。
    *   因此，当你再写 `String s2 = "hello";` 时，`s1` 和 `s2` 会指向常量池中**完全相同**的那个 "hello" 对象，即 `s1 == s2` 会返回 `true`。
    *   而通过 `new String("hello")` 创建的字符串，总是在堆内存中创建一个新对象，它不直接使用常量池（虽然它引用的字符数组可能来自常量池）。

**效果**:
通过共享不可变的字符串对象，JVM 极大地节省了内存。在一个大型应用中，可能会有成千上万个内容相同的字符串，享元模式避免了为它们每一个都分配独立的内存空间。

### 66. Integer 的缓存使用了什么设计模式？

**核心答案**

Java 中 `Integer` 类的缓存机制同样应用了**享元模式 (Flyweight Pattern)**。

**详细说明**

1.  **内部状态**: 整数的 `int` 值就是它的内部状态。`Integer` 对象也是**不可变的**，为其共享提供了基础。

2.  **享元工厂与池**: `Integer` 类本身，特别是其静态内部类 `IntegerCache`，扮演了**享元工厂和池**的角色。

3.  **工作机制**:
    *   `Integer` 类在加载时，会通过其静态内部类 `IntegerCache` 提前创建并缓存一个范围内的 `Integer` 对象。在标准的 HotSpot JVM 中，这个范围默认是 **-128 到 127**。
    *   当你调用静态工厂方法 `Integer.valueOf(int i)` 时（注意：自动装箱 `Integer i = 10;` 编译后也是调用的这个方法），它会进行判断：
        *   **如果 `i` 在缓存范围内** (-128 <= i <= 127)，方法会直接从 `IntegerCache` 中返回已经创建好的那个共享实例。
        *   **如果 `i` 超出缓存范围**，方法才会 `new Integer(i)` 创建一个新的对象。
    *   **示例**:
        ```java
        Integer a = 100;
        Integer b = 100;
        System.out.println(a == b); // 输出: true (因为 100 在缓存范围内，a 和 b 指向同一个对象)

        Integer c = 200;
        Integer d = 200;
        System.out.println(c == d); // 输出: false (因为 200 超出缓存范围，c 和 d 是两个不同的 new 出来的对象)
        ```

**效果**:
由于小程序中经常使用范围较小的整数，通过缓存常用整数对象，`Integer` 的享元模式减少了大量不必要的对象创建，优化了内存使用和性能。类似地，`Byte`, `Short`, `Long`, `Character` 也都有类似的缓存机制。




## 行为型模式

行为型模式专注于对象之间的**通信、协作和职责分配**。它们描述的不仅仅是类或对象的模式，更多的是这些类或对象之间相互交互的模式。

### 模板方法模式

### 67. 什么是模板方法模式？模板方法模式的作用是什么？

**核心答案**

模板方法模式（Template Method Pattern）是一种行为设计模式，它在一个抽象类中**定义一个操作的算法骨架（即模板方法）**，而将算法中一些可变的步骤**延迟到子类中去实现**。模板方法模式使得子类可以在不改变算法整体结构的情况下，重新定义算法中的某些特定步骤。

**详细说明**

1.  **核心思想**:
    *   **封装固定部分，扩展可变部分**: 该模式的核心在于将一个算法流程中的**不变部分**封装在父类的模板方法中，而将**可变的部分**抽象出来，定义成抽象方法或钩子方法，交由子类去实现。
    *   **控制反转 (Inversion of Control - IoC)**: 这是一种典型的“好莱坞原则”——“不要打电话给我们，我们会打给你”。父类（框架）调用子类（自定义实现）的方法来完成整个算法，而不是子类去调用父类。父类控制了整个流程的执行顺序。

2.  **生活中的类比**:
    *   **食谱/菜谱 (Recipe)**: 做一道菜的流程是固定的：准备食材 -> 具体烹饪 -> 装盘。这个流程就是一个**模板方法**。
        *   **准备食材**和**装盘**对于大部分菜肴来说可能是相似的（不变部分）。
        *   **具体烹饪**则是每道菜都不同的（可变部分）。《宫保鸡丁》的菜谱（子类）和《麻婆豆腐》的菜谱（子类）都需要遵循这个流程，但它们会具体实现自己的“烹饪”步骤。

3.  **UML 结构与角色**:
    *   `AbstractClass` (抽象类):
        *   定义了一个或多个**抽象方法（`abstractPrimitiveOperation`）**，这些是算法中可变的部分，必须由子类实现。
        *   可以定义一个或多个**具体方法（`concreteOperation`）**，这些是算法中的不变部分，由父类实现，子类可继承。
        *   可以定义一个或多个**钩子方法（`hook`）**，这是一种特殊的可变部分，父类提供一个默认实现（通常是空实现或返回 `true/false`），子类可以根据需要选择性地重写它，用来影响模板方法的执行流程。
        *   定义了一个**模板方法（`templateMethod`）**，这是一个 `final` 的具体方法，它定义了整个算法的骨架，按顺序调用上述的抽象方法、具体方法和钩子方法。
    *   `ConcreteClass` (具体子类):
        *   继承 `AbstractClass`，并实现父类中定义的抽象方法。
        *   可以根据需要重写钩子方法。

4.  **作用与价值**:
    *   **代码复用**: 将算法中公共的、不变的部分提取到父类中，避免了代码重复。
    *   **封装算法结构**: 将算法的核心逻辑和执行顺序固定在父类的模板方法中，防止子类意外修改，保证了算法的稳定性。
    *   **扩展性好**: 算法的可变部分通过子类进行扩展，符合开闭原则。
    *   **框架设计的基石**: 模板方法模式是许多框架（如 Spring, JUnit）中用来提供扩展点的常用技术。

### 68. 模板方法模式的应用场景有哪些？

**核心答案**

1.  **固定流程、步骤可变的场景**: 当多个子类有共同的执行流程，但某些具体的步骤在不同子类中有不同的实现时。
2.  **框架与扩展点**: 在框架设计中，用于定义核心流程，并向用户开放特定的扩展点。
3.  **重构“重复代码”**: 当发现多个类中存在完全相同的代码逻辑，只是个别细节不同时，可以将其重构为模板方法模式。

**具体例子**

*   **Java `AbstractList` (最经典)**:
    *   `java.util.AbstractList` 是 `ArrayList` 和 `LinkedList` 的父类。它提供了 `add`, `remove`, `contains` 等方法的**通用实现**（模板方法）。
    *   例如，`add(E element)` 方法的逻辑是固定的：`add(size(), element)`。
    *   但是，具体的 `add(int index, E element)` 和 `size()` 方法则被定义为**抽象方法**，必须由 `ArrayList`（基于数组实现）和 `LinkedList`（基于链表实现）等子类去具体实现。
*   **Servlet 的 `service` 方法**:
    *   在 `HttpServlet` 中，`service()` 方法就是一个模板方法。它的骨架是：解析 `HttpServletRequest` 的请求类型（GET, POST 等），然后调用对应的 `doGet()`, `doPost()` 等方法。
    *   `doGet()`, `doPost()` 等就是留给子类（我们自己编写的 Servlet）去实现的钩子方法。我们只需要重写我们关心的请求方法，而无需关心请求是如何被分发的。
*   **Spring `JdbcTemplate`**:
    *   `JdbcTemplate` 中的 `execute()`, `query()` 等方法封装了数据库操作的固定流程：获取连接 -> 创建 `Statement` -> 执行 SQL -> 处理结果集 -> 关闭连接。
    *   而“设置 SQL 参数”和“映射结果集”这些可变的部分，则通过回调接口（如 `PreparedStatementSetter`, `RowMapper`）交由用户去实现。这虽然不是严格的继承关系，但其思想与模板方法模式完全一致，是一种基于回调的变体。
*   **JUnit 单元测试**:
    *   JUnit 框架中，一个测试用例的执行流程是：`@BeforeAll` -> (`@BeforeEach` -> `@Test` -> `@AfterEach`) -> `@AfterAll`。这个流程就是模板。我们开发者只需要填充 `@Test`（核心步骤）以及可选的 `@Before/After`（钩子）方法即可。

### 69. AbstractList 使用了什么设计模式？

**核心答案**

`java.util.AbstractList` 主要使用了**模板方法模式 (Template Method Pattern)**。它为 `List` 接口的实现提供了一个骨架。

**详细说明**

`List` 接口定义了大量的方法，如 `add`, `remove`, `get`, `set`, `indexOf`, `subList` 等。如果每个 `List` 的实现类（如 `ArrayList`, `LinkedList`）都去完整实现所有这些方法，会有大量的重复代码。

`AbstractList` 的作用就是解决这个问题：

1.  **定义抽象的、必须实现的方法**:
    *   `AbstractList` 将最核心、最基础的、与底层数据结构紧密相关的方法定义为**抽象方法**，强制子类必须实现。这两个核心方法是：
        *   `public abstract E get(int index);`
        *   `public abstract int size();`
    *   只要子类实现了这两个方法，`AbstractList` 就能基于它们提供许多其他方法的默认实现。

2.  **提供模板化的默认实现**:
    *   `AbstractList` 提供了 `Iterator`, `indexOf`, `lastIndexOf`, `clear` 等方法的**具体实现**。
    *   例如，`indexOf(Object o)` 方法的实现逻辑（模板）就是：遍历整个列表（通过调用子类实现的 `size()` 和 `get()`），然后比较元素。
        ```java
        // AbstractList.java (源码简化)
        public int indexOf(Object o) {
            ListIterator<E> it = listIterator();
            if (o==null) {
                while (it.hasNext())
                    if (it.next()==null)
                        return it.previousIndex();
            } else {
                while (it.hasNext())
                    if (o.equals(it.next()))
                        return it.previousIndex();
            }
            return -1;
        }
        ```
    *   这个实现不关心底层是数组还是链表，它只依赖于子类必须提供的 `get()` 和 `size()`。

3.  **提供可选的、可重写的方法**:
    *   对于修改操作，如 `add(int index, E element)`, `remove(int index)`, `set(int index, E element)`，`AbstractList` 提供了一个**默认的、会抛出 `UnsupportedOperationException`** 的实现。
    *   这相当于**钩子方法**。如果子类希望支持修改操作（例如 `ArrayList`），它就必须**重写**这些方法。如果子类是只读的，那它就不用管这些方法。

**总结**: `AbstractList` 通过模板方法模式，极大地简化了自定义 `List` 的实现过程。开发者只需要继承 `AbstractList` 并实现最核心的 `get()` 和 `size()` 方法，就能立即得到一个功能基本完整的、只读的 `List`。如果需要支持修改，再按需重写 `add()`, `remove()` 等方法即可。

### 70. Spring 中哪些地方使用了模板方法模式？

**核心答案**

Spring 框架中广泛地使用了模板方法模式（及其基于回调的变体），这是其实现“高内聚、低耦合”和提供强大扩展性的关键。

**具体例子**

1.  **`JdbcTemplate` (最经典)**:
    *   如前所述，`JdbcTemplate` 封装了 JDBC 操作的固定流程（获取连接、关闭资源、异常处理）。
    *   它将可变部分（设置 SQL 参数、处理结果集）通过 `PreparedStatementCreator`, `RowMapper` 等**回调接口**暴露给用户。用户通过匿名内部类或 Lambda 表达式传入具体的实现。这被看作是**模板方法模式的变体**，用组合和回调代替了继承。

2.  **`RestTemplate`**:
    *   与 `JdbcTemplate` 类似，`RestTemplate` 封装了执行 HTTP 请求的通用流程。
    *   它提供了 `execute(String url, HttpMethod method, RequestCallback requestCallback, ResponseExtractor<T> responseExtractor)` 这样的模板方法。
    *   用户通过实现 `RequestCallback` 来准备请求（如设置请求头），通过实现 `ResponseExtractor` 来处理响应，而无需关心 HTTP 连接的创建、执行和关闭等细节。

3.  **Spring `Bean` 的初始化过程**:
    *   Spring IoC 容器在创建和初始化 Bean 的过程中，遵循一个固定的生命周期流程。这个流程本身就是一个模板。
    *   其中，`InitializingBean` 接口的 `afterPropertiesSet()` 方法和 `@PostConstruct` 注解的方法，以及 `DisposableBean` 接口的 `destroy()` 方法和 `@PreDestroy` 注解的方法，都可以看作是这个模板流程中暴露给开发者的**钩子方法**。开发者可以在这些钩子方法中编写自定义的初始化和销毁逻辑。

4.  **`AbstractApplicationContext` 的 `refresh()` 方法**:
    *   `refresh()` 方法是 Spring IoC 容器启动的核心。它定义了容器启动的整个**算法骨架**，包含了 13 个精确的步骤，如 `prepareRefresh()`, `obtainFreshBeanFactory()`, `invokeBeanFactoryPostProcessors()`, `registerBeanPostProcessors()`, `finishRefresh()` 等。
    *   这个 `refresh()` 方法本身就是一个巨大的模板方法。其中一些方法是具体实现，而另一些（如 `postProcessBeanFactory()`）则是留给子类（如 `GenericApplicationContext`）去实现的钩子。

5.  **Spring Security**:
    *   在 Spring Security 中，`AbstractAuthenticationProcessingFilter` 也是模板方法模式的应用。它定义了认证处理的流程：从请求中提取凭证 -> 尝试认证 -> 认证成功/失败处理。而具体的“如何从请求中提取凭证”（`attemptAuthentication` 方法）则被定义为抽象方法，由子类（如 `UsernamePasswordAuthenticationFilter`）去实现。

---

### 策略模式

### 71. 什么是策略模式？策略模式的作用是什么？

**核心答案**

策略模式（Strategy Pattern）是一种行为设计模式，它**定义了一系列算法（策略），将每一个算法都封装成独立的对象，并使它们之间可以相互替换**。策略模式让算法的变化独立于使用算法的客户端。

**详细说明**

1.  **核心思想**:
    *   **封装变化**: 当一个任务有多种不同的处理方式或算法时，不要使用冗长的 `if-else` 或 `switch-case` 结构。而是将每一种算法都封装到一个独立的策略类中。
    *   **统一接口**: 所有的策略类都实现同一个策略接口。
    *   **委托执行**: 持有策略对象的上下文（Context）类，不亲自执行任务，而是将任务委托给它所持有的策略对象来执行。
    *   **动态切换**: 上下文类可以在运行时动态地改变它所持有的策略对象，从而改变其行为。

2.  **生活中的类比**:
    *   **出行旅游**: 你要去一个目的地，可以选择多种出行策略：乘坐飞机（速度快、价格高）、乘坐火车（速度居中、价格适中）、自己开车（灵活性高、可能劳累）。
        *   **上下文 (Context)**: 你（`Person`）。
        *   **策略接口 (Strategy)**: `TravelStrategy` 接口，有一个 `travel()` 方法。
        *   **具体策略 (ConcreteStrategy)**: `ByAirStrategy`, `ByTrainStrategy`, `ByCarStrategy`。
        *   你（`Person`）会根据时间、预算等情况，选择一个具体的出行策略，并执行它。你可以在去程选择飞机，返程选择火车，动态切换策略。

3.  **UML 结构与角色**:
    *   `Context` (上下文): 维护一个对 `Strategy` 对象的引用。它不实现任何具体的算法，而是调用策略接口来执行算法。它可以提供一个 `setStrategy()` 方法来动态切换策略。
    *   `Strategy` (抽象策略): 通常是一个接口或抽象类，定义了所有支持的算法的公共接口。
    *   `ConcreteStrategy` (具体策略): 实现了 `Strategy` 接口，封装了具体的算法或行为。

4.  **作用与价值**:
    *   **消除 `if-else` / `switch-case`**: 将算法的逻辑与客户端代码分离开来，使代码更清晰、更易于维护。
    *   **算法易于扩展**: 增加一个新的算法（策略）非常容易，只需添加一个新的具体策略类即可，符合开闭原则。
    *   **自由切换算法**: 客户端可以在运行时根据需要动态地切换算法。
    *   **复用性**: 策略可以被多个上下文共享。

<svg width="450" height="250" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.abox{stroke:#666;stroke-width:1;fill:#e0f7fa;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker><marker id="diamond" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M4,0 L8,4 L4,8 L0,4 Z" fill="#fff" stroke="#333"/></marker></defs>
    <rect x="20" y="80" width="120" height="40" rx="5" class="box"/><text x="80" y="105" text-anchor="middle" class="text">Context</text>
    <rect x="280" y="20" width="150" height="40" rx="5" class="abox"/><text x="355" y="45" text-anchor="middle" class="text">&lt;interface&gt; Strategy</text>
    <rect x="200" y="150" width="150" height="40" rx="5" class="box"/><text x="275" y="175" text-anchor="middle" class="text">ConcreteStrategyA</text>
    <rect x="360" y="150" width="150" height="40" rx="5" class="box"/><text x="435" y="175" text-anchor="middle" class="text">ConcreteStrategyB</text>
    <path class="arrow" d="M275,150 v-95 c0,-15 30,-15 80,-15"/>
    <path class="arrow" d="M435,150 v-95 c0,-15 -30,-15 -80,-15"/>
    <path class="arrow" d="M140,100 h140 l50,-40" marker-start="url(#diamond)"/><text x="220" y="80" class="text" font-size="10">持有(strategy)</text>
</svg>

### 72. 策略模式和简单工厂模式的区别是什么？

**核心答案**

虽然两者有时可以结合使用来消除 `if-else`，但它们的**设计意图**和**关注点**是完全不同的。

*   **简单工厂模式**: 是一种**创建型**模式。它的核心职责是**创建对象**。它封装了对象的创建过程，客户端向工厂请求一个对象，而无需关心这个对象是如何被 `new` 出来的。
*   **策略模式**: 是一种**行为型**模式。它的核心职责是**封装行为（算法）**。它不关心对象如何创建，而是关心对象的**行为**如何能够在运行时动态地改变和替换。

**详细对比**

| 维度 | 简单工厂模式 | 策略模式 |
| :--- | :--- | :--- |
| **模式类型** | 创建型 (Creational) | 行为型 (Behavioral) |
| **核心职责** | **创建**不同类型的对象。 | **封装**和**替换**不同的行为/算法。 |
| **关注点** | 关注“**谁来创建**”和“**如何创建**”。 | 关注“**做什么**”和“**如何做**”。 |
| **解决问题** | 解决**对象创建**的耦合问题。 | 解决**算法选择**和**扩展**的耦合问题。 |
| **客户端交互** | 客户端向工厂**请求一个产品**，然后**调用产品的方法**。 | 客户端将一个**策略对象设置**到上下文中，然后**调用上下文的方法**（上下文内部会委托给策略）。 |
| **结合使用** | 简单工厂可以用来**创建具体策略的对象**。`Context` 类可以内部持有一个工厂，根据传入的参数向工厂请求一个策略实例来使用。这被称为“策略工厂”模式。 | - |

**总结**:
*   简单工厂是“我要一个能飞的东西”，工厂给你一个 `Bird` 对象。
*   策略模式是“我要飞”，`Context` 拿着 `FlyStrategy` 对象，然后 `context.execute()`，内部调用 `flyStrategy.doAction()`。

### 73. 策略模式的应用场景有哪些？

**核心答案**

1.  **多种算法选择**: 当一个功能有多种实现方式，需要在运行时根据不同条件选择其中一种时。
2.  **消除 `if-else`**: 当系统中有大量与算法选择相关的 `if-else` 或 `switch-case` 语句时。
3.  **算法需要保密**: 当不希望客户端代码了解算法的具体实现细节时。

**具体例子**

*   **`java.util.Comparator` (最经典)**:
    *   `Collections.sort(list, comparator)` 或 `Arrays.sort(array, comparator)` 方法就是策略模式的绝佳体现。
    *   **上下文 (Context)**: `Collections` 或 `Arrays` 类中的 `sort` 方法。
    *   **策略接口 (Strategy)**: `Comparator` 接口，定义了 `compare(T o1, T o2)` 这个算法。
    *   **具体策略 (ConcreteStrategy)**: 我们可以传入各种 `Comparator` 的实现，比如 `IdComparator`, `NameComparator`, `AgeComparator` 等。
    *   `sort` 方法的排序逻辑（如快速排序、归并排序）是固定的，但“如何比较两个元素的大小”这个**策略**是可以由调用者动态传入的。

*   **Spring 框架的 `Resource` 加载**:
    *   Spring 定义了 `Resource` 接口来统一表示各种资源（文件、类路径、URL）。
    *   `ResourceLoader` 是上下文，当你调用 `resourceLoader.getResource("classpath:config.xml")` 或 `resourceLoader.getResource("file:/data/config.xml")` 时。
    *   它内部会根据资源路径的前缀（`classpath:`, `file:`, `http:`）来选择一个具体的 `Resource` 实现（策略），如 `ClassPathResource`, `FileSystemResource`, `UrlResource`。

*   **电商网站的促销活动**:
    *   一个订单在结算时，可以应用不同的促销策略。
    *   **上下文 (Context)**: `Order` 类。
    *   **策略接口 (Strategy)**: `PromotionStrategy` 接口，有 `calculatePrice(Order order)` 方法。
    *   **具体策略 (ConcreteStrategy)**: `FullDiscountStrategy` (满减), `PercentageDiscountStrategy` (打折), `CouponStrategy` (优惠券)。
    *   `Order` 类可以持有一个 `PromotionStrategy` 对象，在计算总价时调用它。可以根据用户的选择或系统规则，动态地为订单设置不同的促销策略。

*   **线程池的拒绝策略**:
    *   Java 的 `ThreadPoolExecutor` 在任务队列已满且无法创建新线程时，会执行拒绝策略。
    *   **策略接口**: `RejectedExecutionHandler`。
    *   **具体策略**: `AbortPolicy` (抛异常), `CallerRunsPolicy` (调用者线程执行), `DiscardPolicy` (直接丢弃), `DiscardOldestPolicy` (丢弃最老的任务)。
    *   我们可以在创建线程池时，为其指定不同的拒绝策略。

### 74. 如何消除 if-else？

**核心答案**

消除 `if-else` 是代码重构的一个重要目标，可以显著提高代码的可读性、可维护性和可扩展性。除了策略模式，还有多种设计模式和技巧可以用来实现这一目标。

**主要方法**

1.  **策略模式 (Strategy Pattern)**:
    *   **适用场景**: 当 `if-else` 的分支代表的是**不同的算法或行为**时。
    *   **做法**: 将每个分支的逻辑封装成一个独立的策略类，并让他们实现同一个接口。使用一个 `Map` 将条件和策略对象关联起来，通过条件直接获取对应的策略并执行。
    *   **示例**:
        ```java
        // 重构前
        if ("typeA".equals(type)) {
            // 逻辑 A
        } else if ("typeB".equals(type)) {
            // 逻辑 B
        }

        // 重构后
        // 1. 定义策略接口和实现
        interface Handler { void handle(); }
        class HandlerA implements Handler { ... }
        class HandlerB implements Handler { ... }
        // 2. 使用 Map 存储策略
        Map<String, Handler> strategyMap = new HashMap<>();
        strategyMap.put("typeA", new HandlerA());
        strategyMap.put("typeB", new HandlerB());
        // 3. 调用
        strategyMap.get(type).handle();
        ```

2.  **状态模式 (State Pattern)**:
    *   **适用场景**: 当 `if-else` 的分支是根据一个对象的**不同状态**来决定其不同行为时，特别是这些行为还会导致状态的变迁。
    *   **做法**: 将每个状态封装成一个独立的类，这个类包含了在该状态下的所有行为。上下文对象持有当前的状态对象，并将行为委托给它。当行为执行后，状态对象内部可以决定如何转换到下一个状态。
    *   **示例**: 订单状态流转（待支付 -> 已支付 -> 已发货 -> 已完成）。

3.  **责任链模式 (Chain of Responsibility Pattern)**:
    *   **适用场景**: 当一个请求需要被多个对象依次处理，但具体由哪个对象处理在运行时决定时。
    *   **做法**: 创建一个处理器链，每个处理器都持有下一个处理器的引用。请求在链上传递，直到有一个处理器能够处理它，或者传递到链的末尾。
    *   **示例**: Java Servlet 的 Filter 链，Spring 的拦截器链。

4.  **查表法 / Map 映射**:
    *   **适用场景**: 最简单的场景，当 `if-else` 只是用于根据一个 key 返回一个 value 时。
    *   **做法**: 直接用 `Map` 来代替。这可以看作是策略模式的简化版，其中“策略”只是一个简单的值或函数。

5.  **多态 (Polymorphism)**:
    *   **适用场景**: 当 `if-else` 是根据对象的**类型**来执行不同操作时。
    *   **做法**: 定义一个共同的父类或接口，并让不同的子类去实现那个操作方法。客户端直接调用父类/接口的方法，JVM 会根据对象的实际类型自动选择正确的实现。这是面向对象最基本的消除 `if-else` 的方式。

### 75. Comparator 使用了什么设计模式？

**核心答案**

`java.util.Comparator` 接口是**策略模式 (Strategy Pattern)** 的一个教科书级别的经典应用。

**详细说明**

让我们以 `Collections.sort(List<T> list, Comparator<? super T> c)` 方法为例来分析：

1.  **上下文 (Context)**: `Collections` 类中的 `sort` 方法。这个方法封装了排序的主要算法逻辑（例如，它内部可能会选择归并排序或 TimSort）。这个主算法是固定的，但它依赖一个可变的部分。

2.  **策略接口 (Strategy)**: `Comparator` 接口本身。它定义了一个抽象的算法或行为，即 `int compare(T o1, T o2)`。这个方法的职责是**定义“如何比较两个对象的大小”这一策略**。

3.  **具体策略 (ConcreteStrategy)**: 任何实现了 `Comparator` 接口的类都是一个具体策略。
    *   我们可以创建一个 `IdComparator` 来按 ID 排序。
    *   我们可以创建一个 `NameComparator` 来按名称排序。
    *   我们可以使用 Lambda 表达式 `(p1, p2) -> p1.getAge() - p2.getAge()` 来创建一个按年龄排序的临时策略。

4.  **工作流程**:
    *   客户端（我们写的代码）在调用 `sort` 方法时，将一个具体的 `Comparator` 实例（一个具体策略）传递给 `sort` 方法（上下文）。
    *   `sort` 方法在执行其内部排序算法的过程中，每当需要比较两个元素大小时，就会**委托**给我们传入的 `Comparator` 策略，调用其 `compare` 方法来获取比较结果。
    *   `sort` 方法本身并不知道，也不关心比较的细节。它只负责排序的宏观流程，而具体的比较逻辑则完全由外部注入的策略决定。

**结论**: 通过策略模式，`Comparator` 成功地将**排序算法的框架**与**元素比较的具体逻辑**解耦。这使得 `sort` 方法可以非常通用，能够对任何类型的对象列表进行排序，只要调用者能提供相应的比较策略即可。这极大地提高了代码的灵活性和复用性。


好的，遵照您的指示，我将继续回答下一部分的行为型模式。

---

### 观察者模式

### 76. 什么是观察者模式？观察者模式的作用是什么？

**核心答案**

观察者模式（Observer Pattern）是一种行为设计模式，它定义了一种**一对多**的依赖关系。当一个对象（被称为“主题”或“被观察者”）的状态发生改变时，所有依赖于它的对象（被称为“观察者”）都会得到**自动通知并更新**。

**详细说明**

1.  **核心思想**:
    *   **解耦**: 观察者模式的核心目标是解耦“主题”（事件的发布者）和“观察者”（事件的订阅者）。
    *   **发布-订阅模型**: 主题维护一个观察者列表。当其状态变化时，它会遍历这个列表，调用每个观察者的更新方法。
    *   **推拉模型**:
        *   **推模型**: 主题在通知观察者时，主动将变化的数据（状态）推送给观察者。
        *   **拉模型**: 主题只通知观察者“我变了”，观察者在接收到通知后，自己主动去主题那里拉取所需的数据。

2.  **生活中的类比**:
    *   **报纸/杂志订阅**:
        *   **主题 (Subject)**: 报社/出版社。
        *   **观察者 (Observer)**: 订阅报纸的读者。
        *   读者（观察者）在报社（主题）那里登记订阅。当新一期的报纸出版时（主题状态改变），报社会自动将报纸派送给所有订阅的读者（通知所有观察者）。读者和报社之间没有紧密的耦合关系，读者可以随时订阅或退订。

3.  **UML 结构与角色**:
    *   `Subject` (抽象主题): 定义了管理观察者的接口，通常包括 `attach()` (注册观察者)、`detach()` (移除观察者) 和 `notify()` (通知观察者) 等方法。
    *   `ConcreteSubject` (具体主题): 实现了 `Subject` 接口。它维护自身的状态，并在状态改变时调用 `notify()` 方法通知所有注册的观察者。
    *   `Observer` (抽象观察者): 定义了一个更新接口（通常是 `update()` 方法），当接收到主题的通知时，该方法被调用。
    *   `ConcreteObserver` (具体观察者): 实现了 `Observer` 接口。它维护一个对 `ConcreteSubject` 的引用，以便在接到更新通知后能够获取所需的状态。

4.  **作用与价值**:
    *   **松散耦合**: 主题和观察者之间是松散耦合的。主题只知道它有一系列的观察者，但不需要知道它们是谁，具体做什么。观察者也可以独立地变化和复用。
    *   **广播通信**: 支持广播式的通信机制。一个事件可以触发一系列的响应。
    *   **符合开闭原则**: 可以轻松地增加新的观察者，而无需修改主题的代码。

<svg width="500" height="250" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.abox{stroke:#666;stroke-width:1;fill:#e0f7fa;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}.darrow{stroke:#999;stroke-width:1;fill:none;stroke-dasharray:4;}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
    <rect x="20" y="50" width="150" height="40" rx="5" class="abox"/><text x="95" y="75" text-anchor="middle" class="text">&lt;interface&gt; Subject</text>
    <rect x="20" y="150" width="150" height="40" rx="5" class="box"/><text x="95" y="175" text-anchor="middle" class="text">ConcreteSubject</text>
    <rect x="330" y="50" width="150" height="40" rx="5" class="abox"/><text x="405" y="75" text-anchor="middle" class="text">&lt;interface&gt; Observer</text>
    <rect x="330" y="150" width="150" height="40" rx="5" class="box"/><text x="405" y="175" text-anchor="middle" class="text">ConcreteObserver</text>
    <path class="arrow" d="M95,150 v-60"/>
    <path class="arrow" d="M405,150 v-60"/>
    <path class="darrow" d="M170,170 h160"/><text x="250" y="165" class="text" font-size="10" fill="#777">拉取状态</text>
    <path class="darrow" d="M330,70 h-160"/><text x="250" y="65" class="text" font-size="10" fill="#777">通知更新 (notify)</text>
</svg>

### 77. 观察者模式有哪些角色？

**核心答案**

观察者模式主要包含以下四个核心角色：

1.  **抽象主题 (Subject)**:
    *   **职责**: 提供一个用于**管理观察者**的接口。
    *   **核心方法**:
        *   `attach(Observer observer)`: 注册（添加）一个观察者。
        *   `detach(Observer observer)`: 移除一个观察者。
        *   `notifyObservers()`: 通知所有已注册的观察者。
    *   它是一个接口或抽象类，定义了主题的基本功能，使得具体主题可以被统一对待。

2.  **具体主题 (ConcreteSubject)**:
    *   **职责**: **维护自身的状态**，并在状态发生变化时通知所有观察者。
    *   **实现**: 实现了 `Subject` 接口。它内部通常包含一个**集合**（如 `List`）来存储所有注册的 `Observer` 对象。
    *   **行为**: 当自身的业务状态（`state`）通过某个方法（如 `setState()`）发生改变时，它会调用从父类继承来的 `notifyObservers()` 方法，遍历观察者集合，并调用每个观察者的 `update()` 方法。

3.  **抽象观察者 (Observer)**:
    *   **职责**: 定义一个**更新接口**，供主题在状态变化时调用。
    *   **核心方法**:
        *   `update()`: 当接收到主题的通知时，此方法被调用，观察者可以在此方法中执行相应的更新逻辑。
    *   它也是一个接口或抽象类，使得所有具体观察者都能被主题统一通知。

4.  **具体观察者 (ConcreteObserver)**:
    *   **职责**: **实现具体的更新逻辑**。
    *   **实现**: 实现了 `Observer` 接口。
    *   **行为**: 在 `update()` 方法中，它会执行对自身状态的更新。通常，它会持有对具体主题 (`ConcreteSubject`) 的引用，以便在接到通知后，可以主动从主题那里拉取所需的数据（`subject.getState()`），然后根据这些数据来更新自己。

### 78. 观察者模式的应用场景有哪些？

**核心答案**

1.  **联动更新场景**: 当一个对象的变化需要触发一个或多个其他对象的联动变化，但又不希望这些对象之间形成紧耦合时。
2.  **事件驱动系统**: 在事件处理系统中，事件的产生方（发布者）和事件的处理方（订阅者）需要解耦。
3.  **GUI 事件处理**: 图形用户界面中的组件事件监听。
4.  **消息队列/中间件**: 发布-订阅（Pub/Sub）模型的消息中间件。

**具体例子**

*   **Java GUI (Swing, AWT)**:
    *   **主题**: 按钮 (`JButton`)、文本框 (`JTextField`) 等组件。
    *   **观察者**: 事件监听器，如 `ActionListener`, `MouseListener`。
    *   当你给一个按钮添加 `ActionListener` (`button.addActionListener(...)`) 时，你就是在将一个观察者注册到主题上。当你点击按钮时（主题状态改变），按钮会通知所有注册的 `ActionListener`，调用它们的 `actionPerformed()` 方法（相当于 `update()`）。

*   **Java Beans / JavaFX Properties**:
    *   Java Beans 的属性变更事件 (`PropertyChangeEvent`) 和监听器 (`PropertyChangeListener`) 也是观察者模式。
    *   JavaFX 的属性绑定机制 (`Property` 和 `Binding`) 将观察者模式应用到了极致，可以轻松实现一个值的变化自动触发另一个值的更新。

*   **ServletContext 事件监听**:
    *   在 Java Web 应用中，`ServletContext` 是一个主题。你可以注册 `ServletContextListener` (观察者) 来监听应用的启动和销毁事件。

*   **消息中间件 (MQ)**:
    *   像 RabbitMQ, Kafka, RocketMQ 中的 **发布-订阅 (Publish/Subscribe)** 模型就是观察者模式的分布式、大规模实现。
    *   **主题 (Subject)**: 在 MQ 中通常被称为 **Topic** 或 **Exchange**。
    *   **观察者 (Observer)**: 被称为 **Subscriber** 或 **Consumer**。
    *   生产者向 Topic 发布消息，所有订阅了该 Topic 的消费者都会收到这条消息的副本并进行处理。

*   **各种框架中的事件机制** (如 Spring Events, Guava EventBus)。

### 79. Spring 的事件机制使用了什么设计模式？

**核心答案**

Spring 的事件（Application Event）机制是**观察者模式**的一个经典实现和应用。它提供了一种在 Spring 应用内解耦组件之间通信的方式。

**详细说明**

Spring 的事件机制主要由以下几个角色构成，完美对应了观察者模式的四个角色：

1.  **事件 (ApplicationEvent)**:
    *   这个角色在经典的观察者模式中没有直接对应，但可以看作是主题（`Subject`）状态变化的**载体**。
    *   所有 Spring 事件都需要继承 `ApplicationEvent` 类。我们可以自定义事件类，并在其中携带事件相关的数据。
    *   例如，可以创建一个 `OrderCreatedEvent`，其中包含新创建的订单对象。

2.  **事件发布者 (ApplicationEventPublisher)**:
    *   对应**具体主题 (ConcreteSubject)**。
    *   `ApplicationContext` 接口继承了 `ApplicationEventPublisher` 接口，所以 Spring 容器本身就是一个事件发布者。
    *   我们可以在任何 Spring Bean 中注入 `ApplicationEventPublisher`，然后调用其 `publishEvent(ApplicationEvent event)` 方法来发布一个事件。
    *   发布者负责将事件广播给所有对此事件感兴趣的监听器。

3.  **事件监听器接口 (ApplicationListener)**:
    *   对应**抽象观察者 (Observer)**。
    *   这是一个泛型接口 `ApplicationListener<E extends ApplicationEvent>`。
    *   它定义了一个核心方法 `onApplicationEvent(E event)`，这相当于观察者模式中的 `update()` 方法。

4.  **具体的事件监听器 (Bean implements ApplicationListener or uses @EventListener)**:
    *   对应**具体观察者 (ConcreteObserver)**。
    *   开发者可以通过两种方式创建监听器：
        *   **实现接口**: 创建一个 Bean 并实现 `ApplicationListener<MyEvent>` 接口。
        *   **使用注解 (更常用)**: 在任何 Bean 的一个方法上标注 `@EventListener` 注解。Spring 会自动识别这些方法并将其注册为监听器。`@EventListener` 注解还可以通过 `classes` 属性或方法参数类型来指定监听的事件类型。
    *   当事件被发布时，Spring 会找到所有匹配该事件类型的监听器，并调用它们的方法。

**工作流程**:
1.  一个业务组件（如 `OrderService`）在完成某个操作（如创建订单）后，通过注入的 `ApplicationEventPublisher` 发布一个 `OrderCreatedEvent`。
2.  `ApplicationContext`（事件发布者）接收到这个事件。
3.  `ApplicationContext` 查找其内部维护的所有监听器，找到所有对 `OrderCreatedEvent` 感兴趣的监听器（如 `CouponServiceListener`, `NotificationServiceListener`）。
4.  `ApplicationContext` 依次调用这些监听器的 `onApplicationEvent` 方法或被 `@EventListener` 注解的方法，并将事件对象传递过去。
5.  各个监听器执行各自的业务逻辑（如发优惠券、发邮件通知）。

通过这种方式，`OrderService` 与 `CouponService`、`NotificationService` 之间完全解耦，`OrderService` 无需知道它们的存在，大大提高了系统的可维护性和可扩展性。

### 80. MVC 模式中使用了什么设计模式？

**核心答案**

MVC (Model-View-Controller) 本身是一种**架构模式**，而不是一个单一的设计模式。但它在其内部结构和实现中，经典地运用了多种设计模式，其中最核心的是**观察者模式 (Observer Pattern)**，并且常常结合**策略模式 (Strategy Pattern)** 和 **组合模式 (Composite Pattern)** 等。

**详细说明**

1.  **观察者模式 (核心)**:
    *   这是实现 **Model 和 View 分离**的关键。
    *   **Model (模型)** 扮演**主题 (Subject)** 的角色。它包含了应用的核心数据和业务逻辑。
    *   **View (视图)** 扮演**观察者 (Observer)** 的角色。它负责展示数据。
    *   **工作流程**:
        1.  多个 View 可以注册（订阅）到同一个 Model 上。
        2.  当 Model 的数据发生变化时（通常由 Controller 操作导致），Model 会**通知**所有注册的 View。
        3.  View 在接收到通知后，会主动从 Model 中**拉取**最新的数据来更新自身的显示。
    *   **效果**: 通过这种方式，Model 不关心数据将如何被展示，View 也不关心数据从何而来，它们只通过观察者模式进行通信。一个 Model 的变化可以自动更新多个不同的 View（例如，一个数据可以同时在表格和图表中展示）。

2.  **策略模式 (Strategy Pattern)**:
    *   **Controller (控制器)** 的实现中常常体现策略模式。
    *   Controller 负责接收用户输入（HTTP 请求、鼠标点击等）并决定如何处理。
    *   一个请求可以被看作是一个上下文（Context），而处理这个请求的具体业务逻辑就是一个策略（Strategy）。
    *   在 Web 框架（如 Spring MVC）中，URL 映射到不同的 Controller 方法，每个方法封装了一种处理策略。`DispatcherServlet` 根据 URL 选择合适的 Controller 策略来执行。

3.  **组合模式 (Composite Pattern)**:
    *   **View (视图)** 的组织通常使用组合模式。
    *   一个复杂的界面（如一个窗口）是一个**容器 (Composite)**，它可以包含其他更小的组件，如面板（也是 Composite）和按钮、文本框（Leaf）。
    *   这种树形结构使得对界面的渲染和事件处理可以递归地进行，简化了代码。

4.  **其他模式**:
    *   **工厂模式 (Factory Pattern)**: 可能用于创建 Model 或 View 对象。
    *   **门面模式 (Facade Pattern)**: Model 可能会作为后端复杂子系统的一个门面。
    *   **命令模式 (Command Pattern)**: 可以用来封装用户的操作，实现撤销/重做等功能。

**总结**: MVC 模式通过巧妙地组合使用观察者、策略、组合等多种设计模式，成功地实现了**职责分离 (Separation of Concerns)**，将业务逻辑、数据展示和用户输入处理分离开来，从而提高了应用的模块化、可维护性和可扩展性。


### 责任链模式

### 81. 什么是责任链模式？责任链模式的作用是什么？

**核心答案**

责任链模式（Chain of Responsibility Pattern）是一种行为设计模式，它旨在**为请求的发送者和接收者之间解耦**。该模式通过将多个能够处理请求的对象连接成一条**链**，并让请求沿着这条链进行传递，直到链上有一个对象能够处理它为止。

**详细说明**

1.  **核心思想**:
    *   **链式结构**: 将一系列处理器（Handler）对象串联起来，形成一条处理链。每个处理器都持有对链中下一个处理器的引用。
    *   **逐级传递**: 一个请求从链的头部进入，然后沿着链逐个传递给每个处理器。
    *   **处理或传递**: 每个处理器在接收到请求时，有两个选择：
        1.  如果自己能够处理该请求，就处理它，并且处理流程可以到此结束（也可以选择继续传递）。
        2.  如果自己不能处理，就将请求**转发**给链中的下一个处理器。
    *   **解耦**: 请求的发送者不需要知道哪个对象会最终处理这个请求，它只需要将请求发送到链的头部即可。

2.  **生活中的类比**:
    *   **公司审批流程**:
        *   你（请求发送者）需要报销一笔费用（请求）。
        *   你将报销单提交给你的直接主管（Handler 1）。
        *   如果金额在主管的权限范围内，他/她就批准了（处理请求），流程结束。
        *   如果金额超出了主管的权限，他/她会将报销单上交（传递请求）给部门经理（Handler 2）。
        *   部门经理再根据自己的权限决定是批准还是继续上交给财务总监（Handler 3）。
        *   这个“主管 -> 经理 -> 总监”的审批路径就构成了一条责任链。

3.  **UML 结构与角色**:
    *   `Handler` (抽象处理器): 定义了一个处理请求的接口，通常包含一个 `handleRequest()` 方法。同时，它还维护一个对下一个处理器（`successor`）的引用。
    *   `ConcreteHandler` (具体处理器): 实现了 `Handler` 接口。它负责处理自己能处理的请求；对于不能处理的请求，它会将其转发给后继者。
    *   `Client` (客户端): 创建并组装责任链，然后将请求发送给链的第一个处理器。

4.  **作用与价值**:
    *   **降低耦合度**: 请求的发送方和接收方彻底解耦。发送方无需知道链的结构，接收方也无需知道发送方的存在。
    *   **增强灵活性**: 可以随时动态地增加、删除或重新排列链中的处理器，而无需修改客户端代码。
    *   **符合开闭原则**: 增加新的处理器非常方便，只需创建一个新的 `ConcreteHandler` 类并将其加入链中即可。
    *   **单一职责原则**: 每个处理器都只关心自己的职责范围，代码结构更清晰。

### 82. 责任链模式的应用场景有哪些？

**核心答案**

1.  **多条件顺序判断**: 当一个请求的处理需要经过多个条件判断，且这些判断有优先级或顺序时。
2.  **工作流/审批流**: 在 OA 系统中实现请假、报销等审批流程。
3.  **Web 请求过滤**: 对 HTTP 请求进行一系列的预处理，如认证、授权、日志、数据校验等。
4.  **异常处理机制**: Java 的 `try-catch` 块的异常捕获机制。

**具体例子**

*   **Java Servlet Filter (最经典)**:
    *   `Filter` 接口就是抽象处理器 (`Handler`)。
    *   我们编写的各种 `Filter` 实现（如 `CharacterEncodingFilter`, `SecurityFilter`）就是具体处理器 (`ConcreteHandler`)。
    *   这些 `Filter` 在 `web.xml` 或通过注解配置的顺序，构成了一条 `FilterChain`（责任链）。
    *   当一个 HTTP 请求到来时，它会依次穿过链上的每一个 `Filter`。每个 `Filter` 都可以对请求进行处理（`chain.doFilter(request, response)` 之前的代码），然后决定是**放行**（调用 `chain.doFilter()`）还是**拦截**（不调用 `chain.doFilter()`）。

*   **Spring Interceptor**:
    *   与 Servlet Filter 类似，Spring MVC 的 `HandlerInterceptor` 也构成了责任链。
    *   拦截器链用于在 Controller 的方法执行前后进行预处理和后处理。
    *   `preHandle` 方法在链上顺序执行，`postHandle` 和 `afterCompletion` 方法则在链上逆序执行。

*   **MyBatis Plugin**:
    *   MyBatis 的插件机制（`Interceptor`）也使用了责任链模式。
    *   MyBatis 的四大核心对象 (`Executor`, `StatementHandler`, `ParameterHandler`, `ResultSetHandler`) 都可以被插件拦截。
    *   你可以编写多个插件，它们会形成一个拦截器链，依次对核心对象的特定方法（如 `Executor.query()`）进行增强。

*   **Java 异常处理机制**:
    *   `try-catch-finally` 结构在内部形成了一个隐式的责任链。
    *   当 `try` 块中抛出一个异常时，JVM 会寻找第一个能处理该异常类型（或其父类型）的 `catch` 块。
    *   如果第一个 `catch` 不匹配，请求（异常）就被传递给下一个 `catch` 块，直到找到匹配的处理器或最终抛出到方法之外。

### 83. Servlet 的 Filter 使用了什么设计模式？

**核心答案**

Servlet 的 `Filter` 机制是**责任链模式 (Chain of Responsibility Pattern)** 的一个教科书级别的应用。

**详细说明**

让我们来详细拆解 `Filter` 是如何体现责任链模式的：

1.  **抽象处理器 (Handler)**:
    *   `javax.servlet.Filter` 接口扮演了这个角色。它定义了所有处理器都需要实现的核心方法：`doFilter(ServletRequest request, ServletResponse response, FilterChain chain)`。

2.  **具体处理器 (ConcreteHandler)**:
    *   我们自己编写的每一个实现了 `Filter` 接口的类，都是一个具体处理器。例如：
        *   `CharacterEncodingFilter`: 负责处理字符编码。
        *   `AuthenticationFilter`: 负责用户认证。
        *   `LoggingFilter`: 负责记录请求日志。
    *   每个 `Filter` 都在 `doFilter` 方法中实现自己的处理逻辑。

3.  **链 (Chain)**:
    *   `javax.servlet.FilterChain` 接口扮演了“链”本身的角色。它代表了剩余的过滤器链。
    *   其核心方法是 `doFilter(ServletRequest request, ServletResponse response)`，调用这个方法就意味着将请求传递给链上的**下一个**过滤器。

4.  **客户端 (Client) 与链的组装**:
    *   Web 容器（如 Tomcat）是客户端。
    *   当容器启动时，它会根据 `web.xml` 文件中 `<filter-mapping>` 的配置顺序（或者基于 `@WebFilter` 注解的顺序），将所有 `Filter` 实例组装成一条有序的链。

**工作流程**:
1.  一个 HTTP 请求到达 Web 容器。
2.  容器创建一个 `FilterChain` 实例，并将链中第一个 `Filter` 设置为当前处理器。
3.  容器调用第一个 `Filter` 的 `doFilter` 方法。
4.  在第一个 `Filter` (例如 `CharacterEncodingFilter`) 中：
    *   执行前置处理逻辑（如 `request.setCharacterEncoding("UTF-8")`）。
    *   **关键点**: 调用 `chain.doFilter(request, response)`。这个调用会触发 `FilterChain` 将请求传递给**第二个** `Filter`。
    *   等待链上后续所有 `Filter` 和目标 Servlet 执行完毕后，代码会返回到这里。
    *   执行后置处理逻辑（例如记录响应时间）。
5.  请求在链上依次传递（`Filter1` -> `Filter2` -> `Filter3`...），直到链的末端。
6.  `FilterChain` 的最后一个环节会调用目标 `Servlet` 的 `service()` 方法。
7.  响应会沿着链**反向**回传，每个 `Filter` 的后置处理逻辑会依次执行。

**结论**: `Filter` 机制通过责任链模式，优雅地将多个独立的、可插拔的功能（如编码、安全、日志）串联起来，对请求进行层层处理，实现了高度的解耦和灵活性。

### 84. Spring 的拦截器使用了什么设计模式？

**核心答案**

Spring 的拦截器 (`HandlerInterceptor`) 机制同样是**责任链模式 (Chain of Responsibility Pattern)** 的应用，但它相比 Servlet Filter 提供了更细粒度的控制，并且在执行流程上是一个**变种的责任链**。

**详细说明**

1.  **抽象处理器 (Handler)**:
    *   `org.springframework.web.servlet.HandlerInterceptor` 接口扮演了这个角色。
    *   它定义了三个方法，提供了在请求处理的不同阶段进行拦截的能力：
        *   `preHandle(...)`: 在 Controller 方法执行**之前**调用。
        *   `postHandle(...)`: 在 Controller 方法执行**之后**，视图渲染**之前**调用。
        *   `afterCompletion(...)`: 在整个请求完成（视图渲染**之后**）调用。

2.  **具体处理器 (ConcreteHandler)**:
    *   我们自定义的、实现了 `HandlerInterceptor` 接口的类就是具体处理器。我们可以创建 `LoginInterceptor`, `PermissionInterceptor` 等。

3.  **链的管理者与执行者**:
    *   `DispatcherServlet` 和 `HandlerExecutionChain` 类共同管理和执行这条拦截器链。
    *   `DispatcherServlet` 会根据请求找到对应的 `HandlerMapping`，`HandlerMapping` 会返回一个 `HandlerExecutionChain` 对象，这个对象内部包含了一个 `List<HandlerInterceptor>`，即拦截器链。

**特殊的执行流程 (变种责任链)**:

Spring 拦截器链的执行顺序非常特殊，体现了责任链的一种高级用法：

1.  **`preHandle` 顺序执行**:
    *   `DispatcherServlet` 会**按顺序**遍历拦截器链，并调用每个拦截器的 `preHandle` 方法。
    *   **关键点**: 如果任何一个 `preHandle` 方法返回 `false`，则请求处理将**立即中断**，并且 `DispatcherServlet` 会**逆序**调用所有**已经执行过 `preHandle` 并返回 `true`** 的拦截器的 `afterCompletion` 方法，然后请求结束。后续的 `preHandle` 和 Controller 方法都不会被执行。
    *   如果所有 `preHandle` 都返回 `true`，则请求会继续，执行 Controller 方法。

2.  **`postHandle` 和 `afterCompletion` 逆序执行**:
    *   在 Controller 方法成功执行后，`DispatcherServlet` 会**按逆序**遍历拦截器链，调用每个拦截器的 `postHandle` 方法。
    *   无论 Controller 方法是否抛出异常，在视图渲染完毕后，`DispatcherServlet` 都会**按逆序**遍历拦截器链，调用每个拦截器的 `afterCompletion` 方法，用于资源清理。

**与 Servlet Filter 的对比**:
*   **粒度**: `Filter` 工作在 Servlet 容器层面，能拦截所有请求。`Interceptor` 工作在 Spring MVC 层面，只能拦截进入 `DispatcherServlet` 的请求，并且可以知道将要执行的 `Handler` (Controller 方法)。
*   **控制力**: `Interceptor` 提供了更精细的控制点（`preHandle`, `postHandle`, `afterCompletion`）。
*   **依赖**: `Filter` 依赖 Servlet API。`Interceptor` 只依赖 Spring 容器。

**结论**: Spring 拦截器通过一个双向执行（`preHandle` 顺序，`postHandle`/`afterCompletion` 逆序）的责任链模式，为开发者提供了在 Spring MVC 请求生命周期中进行精细化控制的强大能力。

---

### 迭代器模式

### 85. 什么是迭代器模式？迭代器模式的作用是什么？

**核心答案**

迭代器模式（Iterator Pattern）是一种行为设计模式，它提供了一种**顺序访问一个聚合对象（如列表、集合）中各个元素的方法，而又无需暴露该对象的内部表示**。

**详细说明**

1.  **核心思想**:
    *   **遍历与实现分离**: 迭代器模式的核心在于将**遍历聚合对象的职责**从聚合对象本身中分离出来，封装到一个独立的**迭代器（Iterator）**对象中。
    *   **统一遍历接口**: 迭代器提供了一套统一的、简单的接口（如 `hasNext()`, `next()`）来遍历聚合对象，无论这个聚合对象的底层数据结构是数组、链表还是哈希表。

2.  **生活中的类比**:
    *   **电视遥控器**:
        *   **聚合对象**: 电视机（内部有上百个频道）。
        *   **迭代器**: 遥控器。
        *   你（客户端）不需要打开电视机后盖去了解它的频道是如何存储和组织的。你只需要使用遥控器上的“下一个频道”（`next()`）和“上一个频道”按钮，就可以顺序地浏览所有频道。遥控器为你封装了遍历的细节。

3.  **UML 结构与角色**:
    *   `Iterator` (抽象迭代器): 定义了访问和遍历元素所需的核心接口，如 `hasNext()`, `next()`, `remove()`。
    *   `ConcreteIterator` (具体迭代器): 实现了 `Iterator` 接口，并维护着遍历过程中的当前位置。它与一个具体的聚合对象相关联。
    *   `Aggregate` (抽象聚合): 定义了创建相应迭代器对象的接口，通常是一个 `createIterator()` 工厂方法。
    *   `ConcreteAggregate` (具体聚合): 实现了 `Aggregate` 接口，并返回一个 `ConcreteIterator` 的实例。它包含了聚合的实际数据。

4.  **作用与价值**:
    *   **封装内部结构**: 隐藏了聚合对象的复杂内部结构（如数组、链表），客户端无需关心这些细节。
    *   **提供统一接口**: 为不同类型的聚合对象提供了统一的遍历方式。
    *   **支持多种遍历**: 一个聚合对象可以同时拥有多个独立的迭代器，每个迭代器维护自己的遍历状态。
    *   **单一职责**: 聚合对象只负责存储数据，迭代器只负责遍历，符合单一职责原则。

### 86. 迭代器模式的应用场景有哪些？

**核心答案**

1.  **统一遍历**: 当你需要为不同数据结构的聚合对象（如数组、链表、树）提供一个统一的遍历接口时。
2.  **隐藏实现**: 当你不希望暴露聚合对象的内部数据结构，但又需要让外部能够遍历其元素时。
3.  **并行遍历**: 当需要对同一个聚合对象进行多种方式的遍历，或者有多个客户端需要同时遍历该对象时。

**具体例子**

*   **Java 集合框架 (最经典)**:
    *   `java.util.Collection` 接口继承了 `java.lang.Iterable` 接口，`Iterable` 接口中定义了 `iterator()` 工厂方法，这就是**抽象聚合**。
    *   `ArrayList`, `LinkedList`, `HashSet` 等都是**具体聚合**，它们都实现了自己的 `iterator()` 方法，返回一个针对自身数据结构（数组、链表、哈希表）的**具体迭代器**。
    *   `java.util.Iterator` 接口是**抽象迭代器**，定义了 `hasNext()`, `next()`, `remove()`。
    *   `ArrayList` 内部的 `Itr` 类，`LinkedList` 内部的 `ListItr` 类等，都是**具体迭代器**的实现。
    *   因为有了迭代器模式，我们可以用完全相同的方式（`for-each` 循环或 `while` 循环）来遍历任何 `Collection`，而无需关心它是 `ArrayList` 还是 `HashSet`。
        ```java
        List<String> list = new ArrayList<>();
        Set<String> set = new HashSet<>();
        // ... 添加元素
        
        // 统一的遍历方式
        for (String s : list) { ... }
        for (String s : set) { ... }
        ```
        `for-each` 循环在底层就是通过调用 `iterator()` 方法和使用 `Iterator` 对象来实现的。

*   **数据库查询结果集**:
    *   JDBC 的 `ResultSet` 对象也可以看作是一种迭代器。你通过调用 `rs.next()` 来移动到下一条记录，通过 `rs.getString("column")` 等方法来获取当前记录的元素。它封装了从数据库游标中读取数据的复杂过程。

*   **流式 API (Stream API)**:
    *   Java 8 的 `Stream` API 也是迭代器模式的一种演进和增强，被称为“外部迭代”与“内部迭代”的区别。`Iterator` 是外部迭代（由客户端控制何时 `next()`), `Stream` 的 `forEach` 等操作是内部迭代（由库来控制遍历）。

### 87. Java 集合框架使用了什么设计模式？

**核心答案**

Java 集合框架 (Java Collections Framework, JCF) 是一个设计模式的集大成者，它综合运用了多种设计模式来构建其优雅、可扩展的体系结构。其中最核心、最明显的包括：

1.  **迭代器模式 (Iterator Pattern)**:
    *   **核心应用**: 这是整个集合框架的基石。通过 `Iterable` 和 `Iterator` 接口，为所有集合提供了统一的、与其内部实现解耦的遍历方式。这是 `for-each` 循环能够通用于所有集合的根本原因。

2.  **策略模式 (Strategy Pattern)**:
    *   **核心应用**: `Comparator` 和 `Comparable` 接口是策略模式的完美体现。
    *   `Collections.sort()` 或 `List.sort()` 方法接受一个 `Comparator` 作为参数，这个 `Comparator` 就是一个“比较策略”，它决定了集合将如何排序，而排序算法本身与比较策略解耦。

3.  **模板方法模式 (Template Method Pattern)**:
    *   **核心应用**: `AbstractCollection`, `AbstractList`, `AbstractSet`, `AbstractMap` 等抽象基类使用了模板方法模式。
    *   它们为集合接口中的大部分方法提供了通用的、基于核心抽象方法（如 `iterator()`, `size()`, `get()`）的实现骨架，使得开发者在创建自定义集合时，只需实现少数几个核心方法即可。

4.  **适配器模式 (Adapter Pattern)**:
    *   **核心应用**: `Arrays.asList()` 方法是一个适配器，它将一个数组适配成 `List` 接口。
    *   `Collections.synchronized...()` 和 `Collections.unmodifiable...()` 等方法返回的是包装类，这些类通过包装原始集合，为其添加线程安全或不可修改的特性，这既可以看作是**装饰器模式**，也可以理解为一种功能的适配。

5.  **装饰器模式 (Decorator Pattern)**:
    *   **核心应用**: 上述的 `Collections.synchronizedList()` 等方法返回的同步集合包装器，以及 `Collections.unmodifiableList()` 返回的不可修改集合包装器，都是典型的装饰器。它们在不改变原始集合接口的情况下，为其添加了新的行为（同步控制、访问控制）。

6.  **工厂模式 (Factory Pattern)**:
    *   **核心应用**: `Collections` 工具类中包含了大量的静态工厂方法，如 `emptyList()`, `singleton()`, `nCopies()` 等，用于创建特定类型的集合实例。
    *   Java 9 之后引入的 `List.of()`, `Set.of()`, `Map.of()` 也是工厂方法的应用，用于方便地创建不可变集合。



### 命令模式

### 88. 什么是命令模式？命令模式的作用是什么？

**核心答案**

命令模式（Command Pattern）是一种行为设计模式，它将一个**请求封装成一个独立的对象**。这个对象（即“命令对象”）包含了与请求相关的所有信息（例如，请求的接收者、要执行的操作、操作所需的参数）。通过这种方式，命令模式可以对请求进行参数化、排队、记录日志，以及支持可撤销的操作。

**详细说明**

1.  **核心思想**:
    *   **请求对象化**: 核心在于将“请求”这个行为本身，从发送者和接收者中抽离出来，变成一个具体的 `Command` 对象。
    *   **解耦**: 实现了请求的**发送者**和**接收者**之间的解耦。发送者不再需要知道接收者是谁，也不需要知道请求是如何被执行的。发送者只需要创建一个命令对象并执行它。
    *   **传递与存储**: 因为请求被对象化了，所以命令对象可以像普通对象一样被存储、传递，以及序列化。

2.  **生活中的类比**:
    *   **餐厅点餐**:
        *   **调用者 (Invoker)**: 你（顾客）。
        *   **命令 (Command)**: 订单（Order）。订单上写清楚了要做什么菜（`execute` 方法）、需要什么原料（参数）。
        *   **接收者 (Receiver)**: 厨师（Chef）。
        *   **客户端 (Client)**: 服务员（Waiter）。
        *   **流程**: 你（`Invoker`）告诉服务员（`Client`）你要点菜。服务员将你的请求（如“一份宫保鸡丁”）封装成一个订单（`Command` 对象），然后将订单贴在厨房的订单栏上。你不需要直接跟厨师交流。厨师（`Receiver`）看到订单后，就知道要做什么菜，然后开始烹饪。服务员也可以将多个订单排队处理。

3.  **UML 结构与角色**:
    *   `Command` (命令接口): 定义了一个执行操作的接口，通常只有一个方法，如 `execute()`。
    *   `ConcreteCommand` (具体命令): 实现了 `Command` 接口。它内部持有一个 `Receiver` 对象的引用，并在 `execute()` 方法中调用 `Receiver` 的某个方法来完成真正的操作。
    *   `Receiver` (接收者): 知道如何执行与请求相关的具体操作，是真正干活的对象。
    *   `Invoker` (调用者/请求者): 持有一个 `Command` 对象，并可以在需要时调用其 `execute()` 方法来发起请求。`Invoker` 不知道 `Receiver` 的存在。
    *   `Client` (客户端): 负责创建 `ConcreteCommand` 对象，并将其与一个 `Receiver` 关联起来，最后再将这个命令对象设置给 `Invoker`。

4.  **作用与价值**:
    *   **解耦**: 将请求的发送者和接收者完全解耦。
    *   **可扩展性**: 增加新的命令非常容易，只需创建新的 `ConcreteCommand` 类即可，符合开闭原则。
    *   **实现宏命令**: 可以将多个命令组合成一个复合命令（`MacroCommand`），一次性执行一系列操作。
    *   **支持队列和日志**: 命令对象可以被轻松地放入队列中等待执行，或者被序列化以记录日志。
    *   **支持撤销和重做 (Undo/Redo)**: 这是命令模式最强大的功能之一。可以在 `Command` 接口中增加一个 `unexecute()` 方法，并在 `ConcreteCommand` 中实现与 `execute()` 相反的操作。通过一个命令历史栈，就可以轻松实现撤销和重做。

### 89. 命令模式的应用场景有哪些？

**核心答案**

1.  **GUI 按钮与菜单项**: 图形界面中按钮点击、菜单项选择等操作的响应。
2.  **实现撤销与重做**: 在文本编辑器、绘图软件等应用中实现 Undo/Redo 功能。
3.  **任务队列系统**: 将任务封装成命令对象，放入队列中，由工作线程池异步执行。
4.  **宏命令录制与回放**: 记录用户的一系列操作，并能在之后回放。

**具体例子**

*   **`java.lang.Runnable` (最经典)**:
    *   `Runnable` 接口可以看作是一个简化版的**命令接口**，其 `run()` 方法就相当于 `execute()`。
    *   **具体命令**: 任何实现了 `Runnable` 接口的类。
    *   **接收者**: `run()` 方法内部具体执行的业务逻辑。
    *   **调用者**: `Thread` 类。
    *   `Thread` 类（调用者）接收一个 `Runnable` 对象（命令），但它不关心 `run` 方法里面到底执行什么。当你调用 `thread.start()` 时，最终会执行 `runnable.run()`。这实现了线程调度与具体任务执行的解耦。

*   **数据库事务**:
    *   可以将一系列数据库操作（INSERT, UPDATE, DELETE）封装成命令对象。
    *   将这些命令对象添加到一个列表中，然后依次执行。如果中途发生错误，可以依次调用每个已执行命令的 `unexecute()` 方法（如执行相反的 SQL）来进行事务回滚。

*   **Struts2 框架**:
    *   Struts2 对 Action 的调用就体现了命令模式的思想。HTTP 请求被封装，最终路由到一个 `Action` 类，框架调用其 `execute()` 方法。`Action` 扮演了命令的角色。

*   **安装/卸载向导**:
    *   软件安装过程中的每一步（如解压文件、创建快捷方式、写入注册表）都可以被封装成一个命令。
    *   安装程序（`Invoker`）按顺序执行这些命令。
    *   如果需要卸载，只需按相反的顺序执行每个命令的“撤销”操作即可。

### 90. Runnable 接口使用了什么设计模式？

**核心答案**

`java.lang.Runnable` 接口是**命令模式 (Command Pattern)** 的一个经典应用。

**详细说明**

让我们来分析 `Runnable` 和 `Thread` 的关系是如何符合命令模式的各个角色的：

1.  **命令接口 (Command)**:
    *   `Runnable` 接口本身就是命令接口。它定义了一个统一的执行入口：`void run()`，这完全等同于命令模式中的 `execute()` 方法。

2.  **具体命令 (ConcreteCommand)**:
    *   任何实现了 `Runnable` 接口的类（包括使用 Lambda 表达式 `() -> { ... }` 创建的实例）都是一个具体命令。
    *   `run()` 方法内部封装了要执行的具体任务逻辑。

3.  **调用者 (Invoker)**:
    *   `Thread` 类是典型的调用者。`Thread` 的构造函数可以接收一个 `Runnable` 对象 (`Thread(Runnable target)`)。
    *   `Thread` 类负责启动和管理线程的生命周期，但它完全**不关心** `Runnable` 对象内部的 `run()` 方法究竟做了什么。它的职责就是在合适的时机（当 `start()` 方法被调用后，由 JVM 调度）去调用这个 `run()` 方法。

4.  **接收者 (Receiver)**:
    *   在 `Runnable` 的场景中，接收者是被封装在 `run()` 方法内部的业务逻辑对象。例如，如果 `run()` 方法调用了 `printer.print()`，那么 `printer` 对象就是接收者。`Runnable` 作为一个命令，起到了连接 `Thread` 和 `printer` 的作用。

5.  **客户端 (Client)**:
    *   创建 `Thread` 和 `Runnable` 实例的代码就是客户端。
    *   客户端负责组装：创建具体的任务（`ConcreteCommand`），创建调用者（`Thread`），并将任务交给调用者。
        ```java
        // Client code
        Runnable task = () -> System.out.println("Hello from a thread!"); // ConcreteCommand
        Thread worker = new Thread(task); // Invoker
        worker.start(); // Invoker initiates the command execution
        ```

**结论**:
通过使用命令模式，`Runnable` 成功地将**任务的定义**（你想做什么）与**任务的执行**（何时、在哪个线程中做）彻底解耦。这使得 Java 的并发编程模型非常灵活，例如，同一个 `Runnable` 任务可以被一个新 `Thread` 执行，也可以被提交到 `ExecutorService`（线程池，另一个调用者）中执行，而任务代码本身无需任何改动。

---

### 状态模式

### 91. 什么是状态模式？状态模式的作用是什么？

**核心答案**

状态模式（State Pattern）是一种行为设计模式，它**允许一个对象在其内部状态改变时，改变它的行为**。从外部看，就好像这个对象的类发生了改变一样。

**详细说明**

1.  **核心思想**:
    *   **状态对象化**: 状态模式的核心是将对象的每一种可能的状态都封装到一个独立的**状态类**中。
    *   **行为封装在状态中**: 将与特定状态相关的行为（方法）都放在对应的状态类里，而不是在原始对象中使用大量的 `if-else` 或 `switch-case` 来判断当前状态。
    *   **委托与切换**: 原始对象（被称为“上下文”，Context）持有一个对当前状态对象的引用。当需要执行某个行为时，上下文会把这个行为**委托**给当前的状态对象。状态对象在执行完自己的行为后，还可以负责将上下文的当前状态切换到下一个状态。

2.  **生活中的类比**:
    *   **自动售货机**:
        *   **上下文 (Context)**: 自动售货机 (`VendingMachine`)。
        *   **状态接口 (State)**: `State` 接口，定义了 `insertCoin()`, `ejectCoin()`, `pressButton()`, `dispense()` 等行为。
        *   **具体状态 (ConcreteState)**: `NoCoinState` (未投币状态), `HasCoinState` (已投币状态), `SoldState` (售出状态), `SoldOutState` (售罄状态)。
        *   **流程**:
            *   初始时，售货机处于 `NoCoinState`。此时你按购买按钮是无效的。
            *   当你投币后 (`insertCoin()`)，`NoCoinState` 对象会执行“接收硬币”的逻辑，并**将售货机的状态切换**到 `HasCoinState`。
            *   现在售货机处于 `HasCoinState`，你再按购买按钮 (`pressButton()`) 就是有效的。`HasCoinState` 对象会执行“准备出货”的逻辑，并将状态切换到 `SoldState`。
            *   在 `SoldState` 中，`dispense()` 方法会真正地弹出商品，然后根据剩余商品数量，将状态切换回 `NoCoinState` 或 `SoldOutState`。

3.  **UML 结构与角色**:
    *   `Context` (上下文): 维护一个 `State` 子类的实例，这个实例就是对象的当前状态。它将所有与状态相关的行为都委托给当前的状态对象。
    *   `State` (状态接口/抽象状态): 定义了一个接口，用于封装与 `Context` 的一个特定状态相关的行为。
    *   `ConcreteState` (具体状态): 实现了 `State` 接口，封装了在特定状态下的具体行为，并负责在适当的时候进行状态转换。

4.  **作用与价值**:
    *   **消除 `if-else` / `switch-case`**: 将与状态相关的逻辑分布到各个状态类中，避免了庞大而复杂的条件判断语句，使代码更清晰。
    *   **封装状态行为**: 将每个状态的行为集中在一个类中，使得状态和行为的对应关系一目了然，易于理解和维护。
    *   **状态转换清晰**: 状态之间的转换逻辑被封装在状态类内部，使得状态转换规则更加明确。
    *   **符合开闭原则**: 增加新的状态非常容易，只需创建一个新的 `ConcreteState` 类即可，而无需修改现有代码。

### 92. 状态模式和策略模式的区别是什么？

**核心答案**

状态模式和策略模式在 UML 结构上几乎完全相同，但它们的**意图**和**应用场景**截然不同。

*   **策略模式 (Strategy)**: 关注的是**封装可替换的算法或行为**。客户端**主动选择**并设置要使用的策略。策略之间通常是平行的、独立的，它们自己不知道也不负责状态的转换。
*   **状态模式 (State)**: 关注的是**对象在不同状态下的行为切换**。状态的切换通常是**被动**的、由内部逻辑决定的。各个状态类之间是相互关联的，一个状态的行为可能会导致上下文切换到另一个状态。

**详细对比**

| 维度 | 策略模式 | 状态模式 |
| :--- | :--- | :--- |
| **设计意图** | 提供一组可**互换**的算法，让客户端**主动选择**。 | 封装对象的**状态**，让对象的行为随状态**自动改变**。 |
| **行为的改变者** | **客户端**或外部调用者主动 `setStrategy()`。 | **上下文**或**状态对象**自身，根据内部逻辑自动转换状态。 |
| **状态/策略间的关系** | 各个策略类之间通常是**独立**的，彼此不知道对方的存在。 | 各个状态类之间是**相互感知**的，它们封装了状态转换的逻辑。 |
| **客户端的认知** | 客户端通常**知道**存在多种策略，并需要根据情况进行选择。 | 客户端通常**不知道**对象内部的状态变化，它只是调用上下文的通用方法。 |
| **关注点** | 解决了**算法选择**的问题，提供了多种“做事方式”。 | 解决了**状态流转**的问题，管理了“何时做什么事”。 |
| **类比** | **出行方式**: 客户端根据需求选择飞机、火车或汽车策略。 | **红绿灯**: 灯的状态（红、黄、绿）根据时间自动切换，其行为（`display()`）也随之改变。 |
| **目的** | 让“做什么”变得可插拔。 | 让“是什么”决定“做什么”。 |

### 93. 状态模式的应用场景有哪些？

**核心答案**

1.  **状态驱动行为**: 当一个对象的行为取决于它的状态，并且它必须在运行时根据状态改变其行为时。
2.  **复杂的状态流转**: 当操作中含有大量的、与对象状态相关的条件分支语句（`if-else` 或 `switch-case`）时。
3.  **工作流引擎**: 用于实现流程的流转，如订单处理、审批流程等。

**具体例子**

*   **订单系统状态机**:
    *   一个订单有“待支付”、“已支付”、“已发货”、“已完成”、“已取消”等多种状态。
    *   在“待支付”状态下，可以执行“支付”和“取消”操作。
    *   在“已支付”状态下，可以执行“发货”操作。
    *   在“已发货”状态下，可以执行“确认收货”操作。
    *   使用状态模式，可以为每种状态创建一个 `State` 类，将允许的操作和状态转换逻辑封装在其中，使整个订单流程非常清晰。

*   **网络连接状态**:
    *   一个 TCP 连接有 `CLOSED`, `LISTEN`, `SYN_SENT`, `ESTABLISHED`, `FIN_WAIT` 等状态。
    *   在不同状态下，对接收到的数据包的处理行为是完全不同的。每个状态都可以被建模成一个状态类。

*   **游戏角色的状态**:
    *   游戏中的角色可以有“正常”、“中毒”、“冰冻”、“眩晕”等状态。
    *   在不同状态下，角色的行为（移动、攻击、被攻击的伤害计算）会受到影响。例如，“眩晕”状态下无法移动和攻击。

*   **UI 控件的状态**:
    *   一个按钮可以有“正常”、“悬浮”、“按下”、“禁用”等状态，每种状态下的外观和行为都不同。

### 94. 订单状态流转可以使用什么设计模式？

**核心答案**

订单状态流转最适合、最经典的设计模式是**状态模式 (State Pattern)**。

**详细说明**

为什么状态模式是处理订单流转的最佳选择：

1.  **明确的状态**: 订单的生命周期具有非常明确、有限的状态集合，如：
    *   `PendingPaymentState` (待支付)
    *   `PaidState` (已支付/待发货)
    *   `ShippedState` (已发货/待收货)
    *   `CompletedState` (已完成)
    *   `CancelledState` (已取消)

2.  **状态驱动的行为**: 订单在不同状态下，可以执行的操作是严格受限的。
    *   在 `PendingPaymentState`，用户可以 `pay()` 或 `cancel()`。但不能 `ship()` (发货)。
    *   在 `PaidState`，商家可以 `ship()`。但用户不能再次 `pay()`。
    *   在 `CompletedState`，很多操作都不能再进行。

3.  **清晰的状态转换**: 操作会导致状态发生明确的转换。
    *   `pay()` 操作会使状态从 `PendingPaymentState` 转换为 `PaidState`。
    *   `ship()` 操作会使状态从 `PaidState` 转换为 `ShippedState`。

**使用状态模式的实现思路**:

1.  **创建上下文 (Context)**: 创建一个 `OrderContext` 类，它持有订单数据和**一个当前状态对象**的引用。
    ```java
    public class OrderContext {
        private OrderState currentState;
        // ... order data ...
        
        public void setState(OrderState state) {
            this.currentState = state;
        }
        
        public void pay() { currentState.pay(this); }
        public void ship() { currentState.ship(this); }
        // ... other actions
    }
    ```

2.  **创建状态接口 (State)**: 创建一个 `OrderState` 接口或抽象类，定义所有可能的操作。
    ```java
    public interface OrderState {
        void pay(OrderContext context);
        void ship(OrderContext context);
        void confirmReceipt(OrderContext context);
        // ...
    }
    ```

3.  **创建具体状态类 (ConcreteState)**: 为每一种订单状态创建一个类，实现 `OrderState` 接口。
    ```java
    // 待支付状态
    public class PendingPaymentState implements OrderState {
        @Override
        public void pay(OrderContext context) {
            System.out.println("支付成功！");
            // 关键：转换订单的状态到下一个状态
            context.setState(new PaidState());
        }

        @Override
        public void ship(OrderContext context) {
            System.out.println("错误：订单尚未支付，无法发货。");
            // 状态不转换
        }
        // ...
    }

    // 已支付状态
    public class PaidState implements OrderState {
        @Override
        public void pay(OrderContext context) {
            System.out.println("错误：订单已支付，请勿重复支付。");
        }

        @Override
        public void ship(OrderContext context) {
            System.out.println("发货成功！");
            context.setState(new ShippedState());
        }
        // ...
    }
    ```

**带来的好处**:
*   `OrderContext` 类非常稳定，它只是委托行为，不包含任何 `if-else` 逻辑。
*   所有的状态逻辑和转换规则都被清晰地隔离在各自的状态类中，非常易于理解和修改。
*   如果需要增加一个新的状态（例如“退款中”），只需创建一个新的 `RefundingState` 类，并在相关状态中加入转换逻辑即可，完全符合开闭原则。

### 备忘录模式

### 95. 什么是备忘录模式？备忘录模式的作用是什么？

**核心答案**

备忘录模式（Memento Pattern）是一种行为设计模式，它在**不破坏封装性**的前提下，捕获一个对象的**内部状态**，并在该对象之外保存这个状态的快照。这样以后就可以随时将该对象恢复到之前保存的状态。

**详细说明**

1.  **核心思想**:
    *   **状态快照**: 核心是创建一个“备忘录”（Memento）对象，用来存储另一个对象（“发起人”，Originator）在某一时刻的内部状态。
    *   **封装性保护**: 发起人（Originator）的内部状态应该是私有的，不能直接暴露给外部。备忘录模式巧妙地解决了这个问题：只有发起人自己能够创建备忘录和从备忘录中恢复状态，而其他对象（如“负责人”，Caretaker）只能负责**保存和传递**备忘-录，但不能访问其内部内容。
    *   **外部存储**: 状态的快照（备忘录）被存储在发起人对象之外，通常由一个“负责人”（Caretaker）对象来管理。

2.  **生活中的类比**:
    *   **游戏存档**:
        *   **发起人 (Originator)**: 游戏角色（`GameCharacter`），它有生命值、魔法值、装备等内部状态。
        *   **备忘录 (Memento)**: 游戏存档文件（`GameSaveFile`），它记录了角色在存档那一刻的所有状态。
        *   **负责人 (Caretaker)**: 游戏系统或存档管理器，它负责管理多个存档文件（比如你有存档1、存档2）。
        *   **流程**: 当你想存档时，游戏角色（Originator）会创建一个包含其当前状态的存档文件（Memento）。你（`Client`）将这个存档文件交给存档管理器（Caretaker）保管。当你游戏失败后，你从存档管理器中取出之前的存档文件，并让游戏角色读取这个文件来恢复到当时的状态。存档管理器只负责保管文件，它打不开也看不懂文件里的具体内容。

3.  **UML 结构与角色**:
    *   `Originator` (发起人):
        *   是需要被保存状态的业务对象。
        *   它有一个 `createMemento()` 方法，用于创建一个包含其当前内部状态的 `Memento` 对象。
        *   它有一个 `restoreFromMemento(Memento m)` 方法，用于从一个 `Memento` 对象中恢复其内部状态。
    *   `Memento` (备忘录):
        *   负责存储 `Originator` 的内部状态。
        *   它的设计是关键：它对 `Originator` 应该是**宽接口**，允许 `Originator` 访问其所有内部数据。但对 `Caretaker` 和其他对象，它应该是**窄接口**，隐藏所有内部数据，防止外部篡改。在 Java 中，这通常通过将 `Memento` 作为 `Originator` 的**内部类**来实现，这样 `Originator` 就可以访问其私有成员。
    *   `Caretaker` (负责人/管理者):
        *   负责保存 `Memento` 对象。它不关心 `Memento` 的内部结构。
        *   它可以存储一个或多个 `Memento` 对象，比如使用一个 `Stack` 来管理历史记录，以实现撤销/重做。
    *   `Client` (客户端): 触发状态的保存和恢复操作。

4.  **作用与价值**:
    *   **提供撤销/重做机制**: 是实现 Undo/Redo 功能的标准模式。
    *   **维护封装性**: 可以在不暴露对象内部实现细节的情况下，实现状态的保存和恢复。
    *   **简化发起人**: 将状态管理的复杂逻辑（如历史记录）从业务对象（`Originator`）中分离出去，由 `Caretaker` 负责，使 `Originator` 更专注于其自身的核心职责。
    *   **实现“快照”功能**: 可以随时对系统关键数据进行快照，用于故障恢复或数据回滚。

### 96. 备忘录模式的应用场景有哪些？

**核心答案**

1.  **需要实现撤销/重做 (Undo/Redo) 功能的场景**。
2.  **需要“快照”或“检查点”功能的场景**，以便在系统出错或操作失败时能恢复到某个稳定状态。
3.  **需要封装对象状态，但又希望在对象外部管理这些状态历史的场景**。

**具体例子**

*   **文本编辑器/绘图软件**:
    *   每当用户执行一个操作（如输入文字、画一条线），编辑器（`Originator`）就会创建一个包含当前文档内容的备忘录（`Memento`）。
    *   这些备忘录被一个命令历史管理器（`Caretaker`）存储在一个栈里。
    *   当用户点击“撤销”按钮时，`Caretaker` 从栈顶弹出一个备忘录，并让编辑器从中恢复状态。

*   **数据库事务**:
    *   在事务开始时，可以为要修改的数据创建一个备忘录。
    *   如果在事务执行过程中发生错误，可以通过备忘录将数据恢复到事务开始前的状态，实现事务的回滚（Rollback）。

*   **Web 浏览器的“后退”功能**:
    *   浏览器可以为用户访问的每个页面状态（URL、滚动位置等）创建一个备忘录。
    *   这些备忘录被存储在一个历史栈中。点击“后退”按钮时，就从栈中取出上一个页面的备忘录并恢复。

*   **配置管理**:
    *   当用户修改系统配置时，可以在保存新配置前，为旧的配置创建一个备忘录。
    *   如果新配置导致系统出现问题，用户可以选择“恢复到上一次的配置”。

*   **游戏存档/读档**: 如前所述，这是备忘录模式最直观的应用。

### 97. 如何实现撤销和恢复功能？

**核心答案**

撤销（Undo）和恢复（Redo，也叫重做）功能通常是通过结合**命令模式 (Command Pattern)** 和**备忘录模式 (Memento Pattern)** 来实现的。

**详细实现思路**

1.  **命令模式负责封装操作**:
    *   将用户的每一个操作（如“输入文本”、“删除文本”、“画圆”）都封装成一个具体的**命令对象** (`Command`)。
    *   这个命令对象不仅需要一个 `execute()` 方法来执行操作，还需要一个 `unexecute()` 方法来**撤销**这个操作。

2.  **备忘录模式负责保存状态 (可选但推荐)**:
    *   对于复杂的操作，`unexecute()` 的逻辑可能很难写（例如，“删除”的逆操作是“插入”，但你需要知道被删除的内容、位置等所有信息）。
    *   更好的方法是，在命令的 `execute()` 方法执行**之前**，使用备忘录模式为接收者（如 `Document` 对象）创建一个**状态快照 (Memento)**。
    *   `unexecute()` 方法的实现就变得非常简单：直接让接收者从这个备忘录中恢复状态即可。

3.  **使用两个栈来管理历史记录 (Caretaker)**:
    *   需要一个**撤销栈 (Undo Stack)**: 用于存放所有已执行的命令。
    *   需要一个**恢复栈 (Redo Stack)**: 用于存放所有已被撤销的命令。

**工作流程**:

*   **执行一个新操作**:
    1.  创建一个新的命令对象（如 `InsertTextCommand`）。
    2.  调用该命令的 `execute()` 方法。
    3.  将该命令对象**压入 `undoStack`**。
    4.  **清空 `redoStack`** (因为新的操作使得之前的“恢复”历史失效了)。

*   **执行撤销 (Undo)**:
    1.  检查 `undoStack` 是否为空。如果为空，则无法撤销。
    2.  从 `undoStack` 中**弹出一个**命令对象。
    3.  调用该命令的 `unexecute()` 方法。
    4.  将被撤销的这个命令对象**压入 `redoStack`**。

*   **执行恢复 (Redo)**:
    1.  检查 `redoStack` 是否为空。如果为空，则无法恢复。
    2.  从 `redoStack` 中**弹出一个**命令对象。
    3.  调用该命令的 `execute()` 方法。
    4.  将恢复的这个命令对象再次**压入 `undoStack`**。

**可视化流程**

<svg width="550" height="300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="12">
    <style>.text{fill:#333;}.box{stroke:#666;stroke-width:1;fill:#fff;}.stack{stroke:#0277bd;stroke-width:1.5;fill:#e1f5fe;}.arrow{stroke:#333;stroke-width:1.5;fill:none;marker-end:url(#arrowhead);}</style>
    <defs><marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#333"/></marker></defs>
    <rect x="50" y="120" width="100" height="40" rx="5" class="stack"/><text x="100" y="145" text-anchor="middle">Undo Stack</text>
    <rect x="400" y="120" width="100" height="40" rx="5" class="stack"/><text x="450" y="145" text-anchor="middle">Redo Stack</text>
    <rect x="70" y="170" width="60" height="25" rx="3" class="box"/><text x="100" y="185" text-anchor="middle">Cmd3</text>
    <rect x="70" y="195" width="60" height="25" rx="3" class="box"/><text x="100" y="210" text-anchor="middle">Cmd2</text>
    <rect x="70" y="220" width="60" height="25" rx="3" class="box"/><text x="100" y="235" text-anchor="middle">Cmd1</text>

    <text x="275" y="30" text-anchor="middle" font-weight="bold">1. 执行新操作 (Cmd4)</text>
    <path class="arrow" d="M275,50 v100 l-145,20"/><text x="180" y="100" fill="#2e7d32">push(Cmd4)</text>
    <path class="arrow" d="M450,110 c50,-30 50,30 0,0" transform="rotate(90 450 110)"/><text x="480" y="90" fill="#d32f2f">clear()</text>

    <text x="275" y="180" text-anchor="middle" font-weight="bold">2. 撤销 (Undo)</text>
    <path class="arrow" d="M150,145 h100"/><text x="200" y="140">pop()</text>
    <path class="arrow" d="M300,145 h100"/><text x="350" y="140" fill="#2e7d32">push()</text>

    <text x="275" y="250" text-anchor="middle" font-weight="bold">3. 恢复 (Redo)</text>
    <path class="arrow" d="M400,145 h-100"/><text x="350" y="160">pop()</text>
    <path class="arrow" d="M250,145 h-100"/><text x="200" y="160" fill="#2e7d32">push()</text>
</svg>

这种“命令模式 + 备忘录模式 + 双栈”的组合是实现可撤销操作的最经典、最强大的解决方案。

---

### 中介者模式

### 98. 什么是中介者模式？中介者模式的作用是什么？

**核心答案**

中介者模式（Mediator Pattern）是一种行为设计模式，它旨在通过引入一个**中介者（Mediator）对象**来**封装一系列对象之间的复杂交互**。该模式使得各个对象（被称为“同事”，Colleague）之间不再直接相互引用，而是都只与中介者通信，从而将原来复杂的**网状**交互结构转变为**星型**结构。

**详细说明**

1.  **核心思想**:
    *   **集中控制**: 当系统中对象之间的通信关系变得复杂如蛛网时，维护成本会急剧上升。中介者模式通过创建一个中心化的协调者，来接管这些对象之间的通信。
    *   **解耦同事**: “同事”对象之间不再有直接的依赖关系，它们只需要知道中介者的存在即可。当一个同事对象需要与其他同事通信时，它会通知中介者，由中介者负责将消息转发给正确的同事。

2.  **生活中的类比**:
    *   **机场塔台**:
        *   **中介者 (Mediator)**: 机场的控制塔台。
        *   **同事 (Colleague)**: 每一架飞机。
        *   如果没有塔台，每架飞机起飞或降落前，都需要与其他所有飞机进行通信，以避免碰撞，这将是一个极其混乱和危险的“网状”通信。
        *   有了塔台后，所有飞机都只与塔台通信。飞行员（`Colleague`）向塔台（`Mediator`）报告自己的状态和意图（如“请求降落”），由塔台根据全局情况，协调指挥其他飞机，并向该飞机发出指令（如“可以在3号跑道降落”）。

3.  **UML 结构与角色**:
    *   `Mediator` (抽象中介者): 定义了同事对象到中介者对象的接口，通常包含一个用于通信的方法。
    *   `ConcreteMediator` (具体中介者): 实现了 `Mediator` 接口。它了解并维护所有的 `Colleague` 对象，并负责协调它们之间的交互。
    *   `Colleague` (抽象同事类): 定义了每个同事类都具有的接口，它通常持有一个对 `Mediator` 对象的引用。
    *   `ConcreteColleague` (具体同事类): 实现了 `Colleague` 接口。每个同事对象都知道自己的业务行为，但当需要与其他同事交互时，它会通知中介者。

4.  **作用与价值**:
    *   **降低耦合度**: 将多对多的网状依赖关系转变为一对多的星型依赖关系，极大地降低了类之间的耦合。
    *   **集中交互逻辑**: 将对象之间复杂的交互逻辑从各个同事类中抽取出来，集中到中介者中，使得交互逻辑更清晰、更易于管理和维护。
    *   **符合迪米特法则**: 同事对象之间不直接通信，只与中介者这个“朋友”通信。
    *   **提高复用性**: 同事类因为不依赖其他同事，所以更容易被复用。

### 99. 中介者模式的应用场景有哪些？

**核心答案**

1.  **网状结构**: 当一组对象以复杂的方式相互关联，形成网状结构，导致难以理解和维护时。
2.  **集中控制**: 当需要将系统中对象间的复杂交互行为进行抽象和集中控制时。
3.  **避免过度继承**: 当一个类需要引用许多其他类，并且这些引用使得该类难以复用时。

**具体例子**

*   **GUI 对话框 (Dialog Box)**:
    *   一个复杂的对话框中可能包含多个控件，如文本框、复选框、列表框、按钮等。这些控件之间常常存在复杂的联动关系。
    *   例如，当用户在列表框中选择某一项时，文本框的内容可能需要更新，同时某个按钮可能从禁用状态变为可用状态。
    *   如果让这些控件之间直接相互引用和通信，代码会变得一团糟。
    *   更好的方法是让对话框本身（或一个专门的 Controller 类）扮演**中介者**的角色。所有控件（**同事**）都只与对话框通信，由对话框来协调它们之间的联动。

*   **MVC 框架**:
    *   在某种程度上，MVC 模式中的 **Controller（控制器）**就扮演了中介者的角色。
    *   `Model` 和 `View` 不直接通信，它们都通过 `Controller` 来协调。`Controller` 接收 `View` 的用户输入，更新 `Model`；当 `Model` 变化时，`Controller` 负责通知 `View` 更新。

*   **`java.util.Timer`**:
    *   `Timer` 类可以被看作一个中介者。
    *   多个 `TimerTask`（同事）可以被调度，但它们之间不互相通信。
    *   `Timer`（中介者）负责管理一个后台线程，在指定的时间到达时，负责调用相应 `TimerTask` 的 `run()` 方法。它协调了“时间”和“任务”这两个同事。

*   **聊天室系统**:
    *   **中介者**: 聊天室服务器。
    *   **同事**: 每一个用户客户端。
    *   用户发送消息时，不是直接发给另一个用户，而是先发给聊天室服务器。由服务器负责将消息广播给聊天室里的所有其他用户。

### 100. MQ 消息队列使用了什么设计模式思想？

**核心答案**

MQ（Message Queue，消息队列）的架构和工作模式，尤其是其中的**发布-订阅 (Publish-Subscribe)** 模型，是**观察者模式 (Observer Pattern)** 和**中介者模式 (Mediator Pattern)** 的一个宏观、分布式、异步化的体现。

**详细说明**

1.  **观察者模式的体现 (发布-订阅)**:
    *   **主题 (Subject)**: 在 MQ 中，这通常对应于一个 **Topic** 或 **Exchange**。这是一个逻辑上的实体，用于接收消息。
    *   **观察者 (Observer)**: 在 MQ 中，这对应于 **Consumer** 或 **Subscriber**。
    *   **发布 (Publish/Notify)**: 生产者（Producer）将消息发送到 Topic，这个行为就相当于主题状态改变并**通知**所有观察者。
    *   **订阅 (Subscribe/Attach)**: 消费者通过订阅一个 Topic 来表达对这类消息的兴趣，这相当于观察者在主题上**注册**自己。
    *   **解耦**: 生产者和消费者之间完全解耦。生产者不关心谁在消费消息，有多少消费者。消费者也不关心消息是谁生产的。它们只通过共同关注的 Topic 进行通信。这是观察者模式的核心优点。

2.  **中介者模式的体现 (Broker)**:
    *   **中介者 (Mediator)**: 整个 **MQ 服务器（或集群），通常被称为 Broker**，完美地扮演了中介者的角色。
    *   **同事 (Colleague)**: 所有的**生产者 (Producer)** 和**消费者 (Consumer)** 都是同事。
    *   **星型结构**: 在没有 MQ 的情况下，如果一个服务需要通知多个其他服务，它可能需要维护所有这些服务的地址并直接调用它们，形成复杂的**网状**结构。
    *   引入 MQ (Broker) 后，所有的生产者和消费者都只与 Broker 这一个中心节点进行通信。
        *   生产者将消息发送给 Broker。
        *   消费者从 Broker 拉取或接收消息。
    *   **集中控制**: Broker 承担了消息的**路由、存储、分发、负载均衡、可靠性保证**等所有复杂的协调工作。它彻底解耦了生产者和消费者，使得它们可以独立地扩展和演进。

**总结**:
*   从**事件通知和解耦**的角度看，MQ 是**观察者模式**。
*   从**系统架构和集中协调**的角度看，MQ 是**中介者模式**。

MQ 将这两种模式的思想从单体应用内部，提升到了分布式系统架构的层面，并增加了**异步化**和**可靠性**的特性，是现代微服务架构中不可或缺的核心组件。


### 访问者模式

### 101. 什么是访问者模式？访问者模式的作用是什么？

**核心答案**

访问者模式（Visitor Pattern）是一种行为设计模式，它的核心思想是**将数据结构和作用于该结构上的操作分离开来**。它允许在不改变数据结构（元素类）的前提下，为这些元素定义新的操作。

**详细说明**

1.  **核心思想**:
    *   **双分派 (Double Dispatch)**: 访问者模式是双分派技术的一个典型应用。一个操作的最终执行，既取决于**操作的类型（访问者）**，也取决于**元素的类型（被访问的数据）**。
    *   **操作与数据分离**: 当你有一个相对稳定的数据结构（如员工的层级、文档的段落和图片），但需要频繁地为其增加新的、与数据本身不直接相关的操作（如计算工资、生成年度报告、导出为 PDF）时，此模式非常有用。
    *   **流程**:
        1.  为数据结构中的每一种元素类型（`ElementA`, `ElementB`）定义一个 `accept(Visitor v)` 方法。
        2.  定义一个 `Visitor` 接口，其中为每一种元素类型都提供一个对应的 `visit(ElementA e)` 和 `visit(ElementB e)` 方法。
        3.  当客户端需要对一个元素执行操作时，它调用元素的 `accept(visitor)` 方法，并将具体的访问者（操作）传进去。
        4.  元素在其 `accept` 方法中，会反过来调用访问者的 `visit(this)` 方法，将自己作为参数传回。
        5.  这样，访问者就知道了当前正在访问的元素的具体类型，从而可以执行针对该类型的特定操作。

2.  **UML 结构与角色**:
    *   `Visitor` (抽象访问者): 声明了一组访问方法（`visit`），为数据结构中的每一个具体元素类都提供一个对应的重载方法。
    *   `ConcreteVisitor` (具体访问者): 实现了 `Visitor` 接口，封装了一种对数据结构中元素的新操作。
    *   `Element` (抽象元素): 定义了一个 `accept(Visitor v)` 方法，它以一个访问者为参数。
    *   `ConcreteElement` (具体元素): 实现了 `Element` 接口，在其 `accept` 方法中调用访问者的 `visit` 方法，并将自身 `this` 传进去。
    *   `ObjectStructure` (对象结构): 一个元素的容器，通常包含多种不同类型的元素。它提供了一个接口，允许访问者遍历其所有元素。

3.  **作用与价值**:
    *   **符合开闭原则**: 增加新的操作非常容易。只需要创建一个新的 `ConcreteVisitor` 类即可，无需修改任何现有的元素类。
    *   **集中相关操作**: 将所有与某个特定功能相关的行为都集中在一个访问者类中，而不是分散在各个元素类里。
    *   **操作与结构解耦**: 将数据结构和作用于其上的算法解耦。

### 102. 访问者模式的应用场景有哪些？

**核心答案**

1.  **稳定的数据结构，多变的操作**: 当一个对象结构包含多种类型的对象，并且你希望对这些对象执行多种不同的、将来可能需要扩展的操作时。
2.  **需要对一个组合结构中的对象执行操作**: 特别适合用于遍历一个复杂的树形结构（如组合模式构成的结构），并对不同类型的节点执行不同的操作。
3.  **分离核心业务与附加功能**: 当需要将一些次要的、不稳定的功能从核心的、稳定的业务类中分离出去时。

**具体例子**

*   **编译器中的抽象语法树 (AST)**:
    *   **数据结构**: AST 本身是一个由不同类型节点（如 `AssignmentNode`, `VariableNode`, `ExpressionNode`）组成的树形结构。这个结构在语言语法确定后是相对稳定的。
    *   **操作 (访问者)**:
        *   `TypeCheckingVisitor`: 遍历 AST，检查类型是否匹配。
        *   `CodeGenerationVisitor`: 遍历 AST，生成目标代码（如字节码或机器码）。
        *   `PrettyPrintVisitor`: 遍历 AST，将其格式化输出为可读的代码。
    *   每增加一种对 AST 的处理方式，只需增加一个新的 `Visitor` 即可，而 AST 节点类无需任何改动。

*   **企业报表系统**:
    *   **数据结构**: 公司的员工层级（`Employee`），分为正式工（`FullTimeEmployee`）和临时工（`PartTimeEmployee`）。
    *   **操作 (访问者)**:
        *   `SalaryReportVisitor`: 遍历所有员工，计算并生成薪资报表（正式工和临时工的计算方法不同）。
        *   `HRReportVisitor`: 遍历所有员工，统计工时、假期等信息，生成人力资源报表。

*   **文件系统处理**:
    *   **数据结构**: 文件和文件夹（组合模式）。
    *   **操作 (访问者)**:
        *   `CompressVisitor`: 遍历文件系统，将每个文件和文件夹压缩。
        *   `SearchVisitor`: 遍历文件系统，查找符合特定条件的文件。

**访问者模式的缺点**:
*   **违反开闭原则（对数据结构而言）**: 如果数据结构（元素类）经常发生变化，比如需要增加一个新的 `ConcreteElement` 类，那么你就必须修改所有 `Visitor` 接口和所有 `ConcreteVisitor` 类，为这个新元素增加一个 `visit` 方法。因此，它只适用于数据结构稳定的场景。

---

### 解释器模式

### 103. 什么是解释器模式？解释器模式的作用是什么？

**核心答案**

解释器模式（Interpreter Pattern）是一种行为设计模式，它为一种**语言**定义一个**解释器**，该解释器使用一个表达式接口来表示语言中的每条语法规则。通过构建一个代表句子（表达式）的抽象语法树 (AST)，解释器可以解释并执行这个句子。

**详细说明**

1.  **核心思想**:
    *   **定义语言**: 首先，你需要定义一套简单的语言（语法规则）。
    *   **语法类化**: 为语言中的每条语法规则（无论是终结符还是非终结符）都创建一个对应的类。
    *   **构建 AST**: 对于一个给定的句子（符合该语言语法的字符串），通过这些类构建一棵抽象语法树。
    *   **解释执行**: 定义一个解释（`interpret`）操作，它在 AST 的所有节点上递归地执行，最终得出结果。

2.  **UML 结构与角色**:
    *   `AbstractExpression` (抽象表达式): 声明一个 `interpret()` 接口，所有具体表达式类都要实现它。
    *   `TerminalExpression` (终结符表达式): 实现了 `AbstractExpression` 接口，代表语言中的基本元素（如变量、常量）。一个句子中的每个终结符都需要一个该类的实例。
    *   `NonterminalExpression` (非终结符表达式): 实现了 `AbstractExpression` 接口，代表语言中的语法规则（如加、减、与、或）。它通常包含对其他 `AbstractExpression` 对象的引用。
    *   `Context` (上下文): 包含解释器之外的一些全局信息。
    *   `Client` (客户端): 构建（或由解析器构建）一个代表特定句子的抽象语法树，并调用 `interpret()` 操作。

3.  **作用与价值**:
    *   **易于扩展语法**: 当需要扩展语言的语法时，只需增加新的 `AbstractExpression` 子类即可，符合开闭原则。
    *   **灵活性高**: 通过用类来表示语法规则，可以方便地改变或扩展语言。
    *   **实现简单语言**: 对于一些重复性高、可以用简单语法规则描述的问题，使用解释器模式可以使解决方案变得优雅。

### 104. 解释器模式的应用场景有哪些？

**核心答案**

解释器模式是一种**不常用**的设计模式，主要适用于以下场景：

1.  **简单语言**: 当你需要实现一个简单的语言，并且可以轻松地将该语言中的句子表示为抽象语法树时。
2.  **效率不是关键**: 解释器模式通常会导致执行效率较低，因此不适用于对性能要求极高的场景。
3.  **重复性问题**: 当某个特定领域的问题，其解决方案可以被归纳为一套语法规则，并且这类问题频繁出现时。

**具体例子**

*   **正则表达式引擎**:
    *   `java.util.regex.Pattern` 就是一个解释器。
    *   当你编译一个正则表达式（如 `a*b`）时，`Pattern` 类会在内部将其解析成一棵语法树（或类似的状态机结构）。
    *   然后 `Matcher` 对象利用这个结构去解释（匹配）输入的字符串。

*   **SQL 解析**:
    *   数据库系统在执行 SQL 查询时，首先需要解析 SQL 语句，将其转换成一棵抽象语法树。然后，查询优化器和执行引擎会“解释”这棵树来执行查询。

*   **各种表达式求值**:
    *   可以用来实现一个简单的数学表达式计算器（如计算 "a+b-c"）。`a`, `b`, `c` 是终结符，`+`, `-` 是非终结符。
    *   搜索引擎中的语法分析，如解析 "design pattern NOT visitor"。

*   **Spring 表达式语言 (SpEL)**: 这是一个典型的应用。

### 105. Spring 的 EL 表达式使用了什么设计模式？

**核心答案**

Spring 的表达式语言 (Expression Language, SpEL) 是**解释器模式 (Interpreter Pattern)** 的一个强大而复杂的实现。

**详细说明**

1.  **语言 (Language)**:
    *   SpEL 定义了一套丰富的语法，用于在运行时查询和操作对象图。例如：
        *   `'Hello World'.concat('!')` (方法调用)
        *   `myBean.myProperty` (属性访问)
        *   `1 + 2` (数学运算)
        *   `myList[0]` (列表访问)
        *   `#root.name == 'admin'` (布尔逻辑和变量)

2.  **抽象语法树 (AST)**:
    *   当你提供一个 SpEL 表达式字符串时，Spring 的 `SpelExpressionParser` 会首先将其**解析 (Parse)** 成一棵 AST。
    *   这棵树由各种 `SpelNode` 的子类构成，每个子类都对应一种语法规则：
        *   `Literal` (字面量) -> **终结符**
        *   `VariableReference` (变量引用) -> **终结符**
        *   `OpPlus`, `OpMinus` (加减运算符) -> **非终结符**
        *   `MethodReference` (方法引用) -> **非终结符**
        *   `PropertyOrFieldReference` (属性/字段访问) -> **非终结符**

3.  **解释器 (Interpreter)**:
    *   `SpelExpression` 对象封装了这棵 AST。它的 `getValue()` 方法就是解释器的入口。
    *   当 `getValue()` 被调用时，它会从 AST 的根节点开始，**递归地调用**每个节点的 `getValueInternal()` 方法。
    *   每个节点都知道如何解释自己：
        *   `Literal` 节点直接返回其值。
        *   `OpPlus` 节点会先递归调用其左右子节点的 `getValueInternal()` 方法，获取两个操作数，然后执行加法运算并返回结果。
        *   `PropertyOrFieldReference` 节点会先获取其左侧对象，然后通过反射来访问该对象的属性。

**结论**:
SpEL 完美地遵循了解释器模式的流程：定义一套语言 -> 将表达式字符串解析为 AST -> 通过递归遍历 AST 来解释并计算表达式的值。它是一个工业级的、功能完备的解释器模式应用范例。

---

## 综合问题

### 106. 在实际项目中，你用过哪些设计模式？

**回答策略**:
这个问题考察的是你的实际经验和对设计模式的理解深度。不要只罗列模式名称，而要**结合具体的业务场景**来讲述，说清楚**“遇到了什么问题”、“为什么选择这个模式”、“如何应用的”、“带来了什么好处”**。

**示例回答**:

“在我的项目中，设计模式的应用非常广泛。我举几个印象比较深刻的例子：

1.  **策略模式 + 工厂模式**: 在一个电商项目中，我们需要处理多种支付方式，如支付宝、微信支付、银行卡支付。起初代码里有很多 `if-else` 来判断支付类型。为了优化，我们引入了**策略模式**。
    *   **问题**: `if-else` 结构导致代码臃肿，每次增加新的支付方式都要修改核心业务代码，违反了开闭原则。
    *   **应用**: 我们定义了一个 `PaymentStrategy` 接口，有 `pay()` 方法。然后创建了 `AlipayStrategy`, `WechatPayStrategy` 等具体实现。同时，我们用一个**简单工厂**（或者一个 `Map`）来根据支付类型 `String`（如 "ALIPAY"）创建并返回对应的策略对象。
    *   **好处**: 彻底消除了 `if-else`，代码结构变得非常清晰。新增支付方式时，只需添加一个新的策略类并在工厂中注册即可，完全不需要改动原有逻辑。

2.  **模板方法模式**: 我们有一个数据导出的功能，需要支持导出为 Excel 和 CSV 两种格式。
    *   **问题**: 两种导出方式的流程非常相似：查询数据 -> 格式化数据 -> 写入文件。只是“格式化数据”和“写入文件”这两步的具体实现不同。
    *   **应用**: 我们创建了一个 `AbstractExportTemplate` 抽象类，在里面定义了一个 `export()` **模板方法**，固化了整个流程。其中，“查询数据”是公共逻辑，直接实现；而“格式化”和“写入”则定义为**抽象方法**，由 `ExcelExporter` 和 `CsvExporter` 两个子类去具体实现。
    *   **好处**: 复用了公共的数据查询逻辑，避免了代码重复，并且整个导出流程被固定下来，不易出错。

3.  **观察者模式 (通过 Spring Events)**: 在用户注册成功后，我们需要执行一系列后续操作，比如发送欢迎邮件、发放新用户优惠券、初始化用户积分等。
    *   **问题**: 如果把这些逻辑都写在用户注册的主流程代码里，会导致注册方法非常臃肿，并且与邮件、优惠券等模块紧密耦合。
    *   **应用**: 我们使用了 Spring 的事件机制，也就是**观察者模式**。在用户注册成功后，我们发布一个 `UserRegisteredEvent` 事件。然后创建了 `EmailListener`, `CouponListener` 等多个监听器（观察者），它们分别订阅这个事件并执行各自的业务。
    *   **好处**: 实现了主流程与后续操作的完全解耦。未来如果需要增加新的后续操作（比如“发送短信通知”），只需要增加一个新的监听器即可，注册逻辑完全不受影响。

4.  **建造者模式**: 在构建一个复杂的查询对象时，该对象有十多个查询参数，其中一些是必填的，一些是可选的，并且参数之间还有一些组合约束。
    *   **问题**: 如果用构造函数，参数列表会非常长，难以维护；如果用 Setter 方法，则无法保证对象在构建过程中的一致性。
    *   **应用**: 我们为这个查询对象引入了**建造者模式**（使用了 Lombok 的 `@Builder` 注解，它就是建造者模式的实现）。通过链式调用 `builder().paramA(...).paramB(...).build()` 来创建对象。
    *   **好处**: 代码可读性极高，可以清晰地看到设置了哪些参数。同时，可以在 `build()` 方法中进行参数的最终校验，保证了创建出的对象是合法的。”

### 107. 如何选择合适的设计模式？

**回答策略**:
这个问题考察你的设计思维和权衡能力。说明选择设计模式不是为了用而用，而是为了解决实际问题。

**示例回答**:

“选择合适的设计模式是一个需要综合考虑多种因素的决策过程，我的思路通常是这样的：

1.  **明确设计意图，从“目的”出发**: 首先，我会分析当前面临的核心问题是什么。
    *   是为了**创建对象**更灵活吗？（考虑**创建型模式**：单例、工厂、建造者...）
    *   是为了**组织类和对象**的结构，解决耦合问题吗？（考虑**结构型模式**：适配器、代理、装饰器...）
    *   是为了**协调对象之间的行为和通信**吗？（考虑**行为型模式**：策略、观察者、责任链...）
    *   比如，遇到大量的 `if-else`，我就会想，这是基于**类型**的判断（可能用多态），还是基于**算法/行为**的判断（策略模式），还是基于**状态**的判断（状态模式）？

2.  **理解每个模式的“问题-解决方案”**: 我会回顾每个设计模式的核心是用来解决什么特定问题的。
    *   **适配器**: 解决接口不兼容问题。
    *   **装饰器**: 在不改变接口的情况下增加功能。
    *   **外观**: 简化一个复杂子系统的接口。
    *   **责任链**: 解耦请求发送者和接收者，实现请求的链式处理。
    *   ... 我会像这样在脑中形成一个索引，将问题与模式的解决方案进行匹配。

3.  **考虑设计的六大原则 (SOLID)**: 设计模式是这些原则的体现。在选择时，我会思考哪个模式最能帮助我遵循这些原则。
    *   例如，为了遵循**开闭原则**（对扩展开放，对修改关闭），当我需要增加新功能时，策略模式、观察者模式、装饰器模式通常是很好的选择。
    *   为了遵循**单一职责原则**，命令模式可以把“请求”这个职责分离出来，责任链模式可以把不同的处理职责分离到不同的处理器中。

4.  **分析复杂性与收益**: 设计模式并非银弹，过度使用会增加不必要的复杂性。
    *   如果一个问题很简单，用一个简单的 `if-else` 就能清晰地解决，并且未来也不太可能扩展，那么我可能就不会强行使用策略模式。
    *   我会权衡引入一个模式所带来的**代码结构复杂性**与它所解决的**维护性、扩展性问题**之间的收益。只有当收益明显大于成本时，才是合适的选择。

5.  **借鉴成熟框架和经验**: 我会参考一些优秀的开源框架（如 Spring, JDK）是如何在类似场景下使用设计模式的。它们的实践是经过千锤百炼的，非常有借鉴意义。例如，看到 JDK 的 `Comparator`，就会加深对策略模式的理解。

总而言之，选择设计模式是一个**从问题出发，匹配解决方案，并结合设计原则进行权衡**的过程，目标永远是让软件更健壮、更易于理解和维护。”

### 108. 过度使用设计模式会有什么问题？

**回答策略**:
这个问题考察你是否对设计模式有辩证的看法，而不是盲目崇拜。

**示例回答**:

“过度使用设计模式，也就是所谓的“过度设计”（Over-engineering），会带来一系列严重的问题：

1.  **不必要的复杂性**: 这是最直接的问题。为了使用某个设计模式，可能会引入许多额外的类和接口，使得原本简单的逻辑变得复杂和难以理解。一个新手接手代码时，可能需要花很长时间才能弄清楚这些类之间的关系，而不是业务逻辑本身。

2.  **性能下降**: 一些设计模式会增加间接调用的层次，可能会对性能产生轻微影响。例如，过多的装饰器嵌套，或者在简单场景下使用命令模式，都可能增加方法调用的开销和内存占用。虽然在大多数业务场景下这种影响可以忽略不计，但在高性能要求的系统中， это需要被考虑。

3.  **开发效率降低**: 编写和维护遵循特定模式的代码，通常需要更多的时间和精力。如果在一个简单的 CRUD 项目中，到处都使用复杂的模式，会极大地拖慢开发进度。

4.  **灵活性陷阱**: 设计模式的初衷是为了提高灵活性，但过度设计有时会适得其反。一个过于“灵活”的设计，可能为了应对各种“未来可能”的需求而变得非常抽象和复杂，但如果这些需求最终没有出现，这种灵活性就成了纯粹的负担。

5.  **增加学习成本**: 团队成员需要理解并遵循这些设计模式。如果团队成员对某些模式不熟悉，很容易导致误用，反而使代码质量下降。

**我的看法是**，我们应该遵循 **YAGNI 原则（You Aren't Gonna Need It - 你不会需要它）** 和 **KISS 原则（Keep It Simple, Stupid - 保持简单）**。设计模式是解决特定问题的“药方”，我们应该在“病症”出现时才“对症下药”，而不是把所有“药”都吃一遍来“预防”所有“可能”的病。好的设计应该是**恰如其分**的，既能解决当前的问题，又为未来的合理扩展留有余地，而不是一味地追求模式的堆砌。”

### 109. 设计模式和架构模式的区别是什么？

**回答策略**:
这个问题考察你对软件设计层次的理解，能否区分微观设计和宏观设计。

**示例回答**:

“设计模式和架构模式是软件设计中两个不同层次的概念，它们的主要区别在于**规模**、**抽象层次**和**关注点**。

| 维度 | 设计模式 (Design Pattern) | 架构模式 (Architectural Pattern) |
| :--- | :--- | :--- |
| **规模与范围** | **微观层面**。通常关注**一小组类和对象**的结构和协作问题。它解决的是一个局部、具体的设计问题。 | **宏观层面**。关注整个系统的**高层结构、模块划分和组织方式**。它定义了系统的基本骨架。 |
| **抽象层次** | **更具体**。设计模式的实现通常可以直接映射到代码中的类和接口。 | **更抽象**。架构模式描述的是一种高层次的组织原则，它的实现方式可以有多种，不直接对应到某个类。 |
| **关注点** | 关注**代码级的复用性、灵活性和解耦**。例如，如何灵活地创建对象（工厂模式），如何给对象动态添加功能（装饰器模式）。 | 关注**系统级的特性**，如性能、可伸缩性、可靠性、模块间的依赖关系和通信机制。例如，如何组织前后端分离（MVC/MVVM），如何构建分布式系统（微服务）。 |
| **影响** | 影响一个模块或一个功能点的内部设计。 | 影响整个应用程序或系统的结构。一旦确定，后期修改成本极高。 |
| **例子** | 单例模式、策略模式、观察者模式、代理模式等。 | MVC、MVVM、分层架构（三层架构）、微服务架构、事件驱动架构、客户端-服务器架构等。 |

**简单来说**，如果把构建一个软件比作建造一座大楼：
*   **架构模式**就是大楼的**总体设计蓝图**，它决定了这是住宅楼还是办公楼，有多少层，承重结构是什么样的（钢结构还是混凝土结构）。
*   **设计模式**就是处理具体建筑问题的**施工工艺和技巧**，比如如何设计一个既能承重又美观的窗户（可能是桥接模式），如何设计一个可以灵活开关的门（可能是命令模式），如何铺设可以方便维修的水管（可能是代理模式）。

在实际开发中，我们首先会选择一个合适的**架构模式**来搭建系统的整体框架，然后在实现各个具体模块时，再运用各种**设计模式**来优化代码的细节，解决局部问题。”

### 110. 在 Spring 框架中使用了哪些设计模式？

**回答策略**:
这个问题是前面很多问题的总结，考察你对 Spring 框架的理解深度和设计模式的掌握广度。尽量多说一些，并简要说明其应用场景。

**示例回答**:

“Spring 框架本身就是一个设计模式的“集大成者”，它通过巧妙地运用各种模式，实现了其强大的功能和灵活性。我理解其中比较核心和常见的应用有：

1.  **工厂模式 (Factory Pattern)**: 这是 Spring 的核心。整个 Spring IoC 容器就是一个巨大的工厂。`BeanFactory` 和 `ApplicationContext` 负责创建、管理和装配我们定义的 Bean。我们通过 `getBean()` 获取对象，而无需关心其创建细节。

2.  **单例模式 (Singleton Pattern)**: Spring 中管理的 Bean 默认都是**单例**的。Spring 容器通过一个内部的 Map 来维护这些单例 Bean，确保在整个应用生命周期中，每个 Bean 只有一个实例，这大大节省了资源。

3.  **代理模式 (Proxy Pattern)**: 这是 Spring AOP 的基石。无论是实现声明式事务（`@Transactional`）、日志记录还是权限控制，Spring 都会为目标 Bean 创建一个代理对象（JDK 动态代理或 CGLIB 代理），在代理中织入增强逻辑。

4.  **模板方法模式 (Template Method Pattern)**: Spring 中有大量的以 `...Template` 命名的类，它们都使用了模板方法模式（或其变体）。比如 `JdbcTemplate`, `RestTemplate`, `RedisTemplate`。它们封装了资源操作的固定流程（如获取连接、关闭连接、异常处理），而将可变的部分（如设置 SQL、处理结果）通过回调接口暴露给开发者。

5.  **策略模式 (Strategy Pattern)**: Spring 中随处可见。例如，`InstantiationStrategy` 用于决定如何实例化 Bean；`ResourceLoader` 根据不同的资源路径前缀（`classpath:`, `file:`）选择不同的 `Resource` 实现策略来加载资源。

6.  **观察者模式 (Observer Pattern)**: Spring 的事件驱动模型 (`ApplicationEvent` 和 `ApplicationListener`) 就是观察者模式的实现。通过发布事件和监听事件，实现了组件间的松散耦合。

7.  **适配器模式 (Adapter Pattern)**: Spring MVC 中的 `HandlerAdapter` 是最经典的例子。它使得 `DispatcherServlet` 可以用统一的方式调用各种不同类型（不同接口、不同注解）的 Handler (Controller)。

8.  **装饰器模式 (Decorator Pattern)**: 在 Spring 中，这个模式通常以“包装器”（Wrapper）的形式出现。例如，在创建 `DataSource` 时，可能会有多层包装，一层负责监控，一层负责代理。Spring Session 对 `HttpServletRequest` 的包装也是一个例子。

9.  **责任链模式 (Chain of Responsibility Pattern)**: Spring AOP 的调用链、Spring MVC 的拦截器链（`HandlerInterceptor`）、以及更底层的 Servlet `Filter` 链，都是责任链模式的应用。

10. **建造者模式 (Builder Pattern)**: 在 Spring 5.x 之后，函数式 Bean 注册 (`BeanDefinitionBuilder`) 和一些配置类中可以看到建造者模式的影子，它提供了流式 API 来构建和配置对象，比如 `org.springframework.web.util.UriComponentsBuilder`。

可以说，深入理解这些设计模式在 Spring 中的应用，是真正掌握 Spring 框架设计思想的关键。”