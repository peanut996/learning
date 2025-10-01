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

好的，遵照您的指示，我将从第 30 题开始，继续以高质量、不精简篇幅的方式提供答案。

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
