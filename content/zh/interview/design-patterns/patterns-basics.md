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
