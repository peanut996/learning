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
