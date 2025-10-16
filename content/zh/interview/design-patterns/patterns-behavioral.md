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
