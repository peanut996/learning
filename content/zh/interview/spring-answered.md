# Spring 面试题答案

## Spring 基础

### 1. 什么是 Spring 框架？Spring 的特点是什么？

**核心答案：**
Spring 是一个轻量级的开源 Java 应用框架，用于简化企业级应用开发。它提供了 IoC（控制反转）和 AOP（面向切面编程）等核心特性。

**详细说明：**

Spring 框架的核心特点：

1. **轻量级**：Spring 框架本身很小，不依赖于特定的应用服务器
2. **IoC 容器**：通过依赖注入管理对象，降低耦合
3. **AOP 支持**：支持面向切面编程，实现横切关注点的模块化
4. **事务管理**：提供声明式事务管理，简化事务处理
5. **MVC 框架**：提供 Web 应用开发框架
6. **易于集成**：可以轻松集成其他优秀框架（MyBatis、Hibernate 等）
7. **非侵入性**：使用 Spring 不需要继承特定的类或实现特定的接口

**Spring 框架架构：**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="400" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="80" text-anchor="middle" font-size="24" font-weight="bold" fill="#333">Spring 框架架构</text>
<rect x="100" y="120" width="150" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="175" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">Core Container</text>
<text x="175" y="165" text-anchor="middle" font-size="12" fill="#333">IoC / DI</text>
<text x="175" y="183" text-anchor="middle" font-size="12" fill="#333">BeanFactory</text>
<rect x="280" y="120" width="150" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="355" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#388e3c">AOP</text>
<text x="355" y="165" text-anchor="middle" font-size="12" fill="#333">面向切面编程</text>
<text x="355" y="183" text-anchor="middle" font-size="12" fill="#333">代理机制</text>
<rect x="460" y="120" width="150" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="535" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#f57c00">Data Access</text>
<text x="535" y="165" text-anchor="middle" font-size="12" fill="#333">JDBC / ORM</text>
<text x="535" y="183" text-anchor="middle" font-size="12" fill="#333">事务管理</text>
<rect x="100" y="230" width="150" height="80" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="175" y="255" text-anchor="middle" font-size="14" font-weight="bold" fill="#c2185b">Web</text>
<text x="175" y="275" text-anchor="middle" font-size="12" fill="#333">Spring MVC</text>
<text x="175" y="293" text-anchor="middle" font-size="12" fill="#333">WebFlux</text>
<rect x="280" y="230" width="150" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="355" y="255" text-anchor="middle" font-size="14" font-weight="bold" fill="#7b1fa2">Test</text>
<text x="355" y="275" text-anchor="middle" font-size="12" fill="#333">JUnit 集成</text>
<text x="355" y="293" text-anchor="middle" font-size="12" fill="#333">Mock 对象</text>
<rect x="460" y="230" width="150" height="80" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="535" y="255" text-anchor="middle" font-size="14" font-weight="bold" fill="#00796b">Integration</text>
<text x="535" y="275" text-anchor="middle" font-size="12" fill="#333">远程调用</text>
<text x="535" y="293" text-anchor="middle" font-size="12" fill="#333">消息队列</text>
<rect x="190" y="340" width="150" height="80" fill="#ede7f6" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="265" y="365" text-anchor="middle" font-size="14" font-weight="bold" fill="#512da8">Spring Boot</text>
<text x="265" y="385" text-anchor="middle" font-size="12" fill="#333">自动配置</text>
<text x="265" y="403" text-anchor="middle" font-size="12" fill="#333">快速开发</text>
<rect x="370" y="340" width="150" height="80" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/>
<text x="445" y="365" text-anchor="middle" font-size="14" font-weight="bold" fill="#0277bd">Spring Cloud</text>
<text x="445" y="385" text-anchor="middle" font-size="12" fill="#333">微服务</text>
<text x="445" y="403" text-anchor="middle" font-size="12" fill="#333">分布式系统</text>
</svg>

**关键要点：**
- Spring 是一个分层架构，每层都有特定的功能
- 核心容器是基础，其他模块都依赖于它
- Spring Boot 简化了 Spring 应用的开发和部署
- Spring Cloud 为微服务架构提供了完整的解决方案

**记忆口诀：**
"**轻量控切事，集成易测试**"（轻量级、IoC、AOP、事务、集成、易于测试）

---

### 2. Spring 有哪些核心模块？

**核心答案：**
Spring 框架包含 7 大核心模块：Core Container（核心容器）、AOP、Data Access/Integration（数据访问/集成）、Web、Test（测试）、Messaging（消息）、Instrumentation（仪器）。

**详细说明：**

| 模块分类 | 主要组件 | 功能描述 |
|---------|---------|---------|
| **Core Container** | spring-core, spring-beans, spring-context, spring-expression | 提供 IoC 和 DI 功能，是框架的基础 |
| **AOP** | spring-aop, spring-aspects | 提供面向切面编程实现 |
| **Data Access** | spring-jdbc, spring-tx, spring-orm, spring-oxm, spring-jms | 数据访问和事务管理 |
| **Web** | spring-web, spring-webmvc, spring-websocket, spring-webflux | Web 应用开发支持 |
| **Test** | spring-test | 测试支持（JUnit、TestNG） |
| **Messaging** | spring-messaging | 消息传递支持 |
| **Instrumentation** | spring-instrument | 类加载器实现和服务器支持 |

**模块依赖关系图：**

<svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="50" width="600" height="400" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="350" y="80" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">Spring 模块依赖关系</text>
<ellipse cx="350" cy="380" rx="100" ry="40" fill="#1976d2" stroke="#0d47a1" stroke-width="2"/>
<text x="350" y="390" text-anchor="middle" font-size="16" font-weight="bold" fill="white">Core Container</text>
<rect x="120" y="260" width="120" height="60" fill="#4caf50" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="180" y="280" text-anchor="middle" font-size="14" font-weight="bold" fill="white">AOP</text>
<text x="180" y="300" text-anchor="middle" font-size="12" fill="white">切面编程</text>
<rect x="290" y="260" width="120" height="60" fill="#ff9800" stroke="#ef6c00" stroke-width="2" rx="5"/>
<text x="350" y="280" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Data Access</text>
<text x="350" y="300" text-anchor="middle" font-size="12" fill="white">数据访问</text>
<rect x="460" y="260" width="120" height="60" fill="#e91e63" stroke="#ad1457" stroke-width="2" rx="5"/>
<text x="520" y="280" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Web</text>
<text x="520" y="300" text-anchor="middle" font-size="12" fill="white">Web 层</text>
<rect x="120" y="140" width="120" height="60" fill="#9c27b0" stroke="#6a1b9a" stroke-width="2" rx="5"/>
<text x="180" y="160" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Test</text>
<text x="180" y="180" text-anchor="middle" font-size="12" fill="white">测试支持</text>
<rect x="290" y="140" width="120" height="60" fill="#00bcd4" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="350" y="160" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Messaging</text>
<text x="350" y="180" text-anchor="middle" font-size="12" fill="white">消息传递</text>
<rect x="460" y="140" width="120" height="60" fill="#607d8b" stroke="#455a64" stroke-width="2" rx="5"/>
<text x="520" y="160" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Instrumentation</text>
<text x="520" y="180" text-anchor="middle" font-size="12" fill="white">类加载器</text>
<line x1="180" y1="340" x2="300" y2="360" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="350" y1="340" x2="350" y2="320" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="520" y1="340" x2="400" y2="360" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="180" y1="220" x2="300" y2="360" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="350" y1="220" x2="350" y2="340" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="520" y1="220" x2="400" y2="360" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
</svg>

**关键要点：**
- Core Container 是所有模块的基础，其他模块都依赖它
- 模块之间相对独立，可以根据需要选择使用
- Spring Boot 进一步简化了模块的集成和配置

**记忆口诀：**
"**核心切数网，测消仪器帮**"（核心容器、AOP、数据访问、Web、测试、消息、仪器）

---

### 3. 什么是 Spring IoC（控制反转）？

**核心答案：**
IoC（Inversion of Control，控制反转）是一种设计思想，将对象的创建和依赖关系的管理从应用程序代码中转移到 IoC 容器中，由容器负责对象的生命周期管理。

**详细说明：**

**传统方式 vs IoC 方式：**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="300" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="80" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">控制反转对比</text>
<g id="traditional">
<rect x="100" y="120" width="280" height="180" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="240" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#c62828">传统方式</text>
<rect x="140" y="170" width="80" height="50" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="180" y="200" text-anchor="middle" font-size="14" fill="#333">对象 A</text>
<rect x="260" y="170" width="80" height="50" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="300" y="195" text-anchor="middle" font-size="12" fill="#333">new</text>
<text x="300" y="210" text-anchor="middle" font-size="12" fill="#333">对象 B</text>
<path d="M 220 195 L 260 195" stroke="#c62828" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<text x="240" y="260" text-anchor="middle" font-size="13" fill="#666">程序主动创建对象</text>
<text x="240" y="280" text-anchor="middle" font-size="13" fill="#666">耦合度高</text>
</g>
<g id="ioc">
<rect x="420" y="120" width="280" height="180" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="560" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">IoC 方式</text>
<rect x="460" y="170" width="80" height="50" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="500" y="200" text-anchor="middle" font-size="14" fill="#333">对象 A</text>
<rect x="580" y="170" width="80" height="50" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="620" y="200" text-anchor="middle" font-size="14" fill="#333">对象 B</text>
<ellipse cx="560" cy="250" rx="60" ry="30" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="560" y="257" text-anchor="middle" font-size="12" font-weight="bold" fill="white">IoC 容器</text>
<path d="M 520 220 L 540 250" stroke="#2e7d32" stroke-width="2" fill="none" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>
<path d="M 600 220 L 580 250" stroke="#2e7d32" stroke-width="2" fill="none" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>
<text x="430" y="260" text-anchor="start" font-size="11" fill="#666">容器注入</text>
<text x="650" y="260" text-anchor="end" font-size="11" fill="#666">容器注入</text>
</g>
</svg>

**IoC 的核心概念：**

1. **控制权转移**：对象创建的控制权从程序代码转移到外部容器
2. **依赖注入（DI）**：容器负责将依赖对象注入到需要它的对象中
3. **解耦**：对象之间不直接依赖，而是依赖于抽象（接口）
4. **生命周期管理**：容器负责对象的创建、初始化、销毁等

**传统方式示例：**
```java
public class UserService {
    // 直接创建依赖对象
    private UserDao userDao = new UserDaoImpl();

    public void saveUser(User user) {
        userDao.save(user);
    }
}
```

**IoC 方式示例：**
```java
public class UserService {
    // 依赖由容器注入
    @Autowired
    private UserDao userDao;

    public void saveUser(User user) {
        userDao.save(user);
    }
}
```

**关键要点：**
- IoC 是一种设计思想，不是具体的实现技术
- 控制权的"反转"：从程序代码反转到容器
- 核心目的是降低耦合度，提高代码的可维护性和可测试性
- Spring IoC 容器负责管理 Bean 的整个生命周期

**记忆口诀：**
"**控制反转容器管，依赖注入解耦联**"

---

### 4. 什么是 Spring DI（依赖注入）？

**核心答案：**
DI（Dependency Injection，依赖注入）是 IoC 的一种实现方式，通过容器动态地将依赖对象注入到目标对象中，而不是由目标对象主动创建依赖对象。

**详细说明：**

**依赖注入的三种主要方式：**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="350" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="80" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">依赖注入的三种方式</text>
<rect x="100" y="120" width="180" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="190" y="145" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976d2">构造器注入</text>
<text x="190" y="170" text-anchor="middle" font-size="12" fill="#333">(Constructor Injection)</text>
<rect x="130" y="190" width="120" height="40" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="190" y="205" text-anchor="middle" font-size="11" fill="#333">public class A {</text>
<text x="190" y="220" text-anchor="middle" font-size="11" fill="#333">A(B b) {...}</text>
<text x="190" y="250" text-anchor="middle" font-size="11" fill="#2e7d32">✓ 推荐使用</text>
<text x="190" y="265" text-anchor="middle" font-size="11" fill="#333">强制依赖</text>
<text x="190" y="280" text-anchor="middle" font-size="11" fill="#333">保证不可变性</text>
<text x="190" y="295" text-anchor="middle" font-size="11" fill="#333">线程安全</text>
<text x="190" y="310" text-anchor="middle" font-size="11" fill="#333">防止循环依赖</text>
<rect x="310" y="120" width="180" height="220" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="145" text-anchor="middle" font-size="15" font-weight="bold" fill="#f57c00">Setter 注入</text>
<text x="400" y="170" text-anchor="middle" font-size="12" fill="#333">(Setter Injection)</text>
<rect x="340" y="190" width="120" height="40" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="400" y="205" text-anchor="middle" font-size="11" fill="#333">public class A {</text>
<text x="400" y="220" text-anchor="middle" font-size="11" fill="#333">setB(B b) {...}</text>
<text x="400" y="250" text-anchor="middle" font-size="11" fill="#1976d2">◐ 常用</text>
<text x="400" y="265" text-anchor="middle" font-size="11" fill="#333">可选依赖</text>
<text x="400" y="280" text-anchor="middle" font-size="11" fill="#333">灵活性高</text>
<text x="400" y="295" text-anchor="middle" font-size="11" fill="#333">支持循环依赖</text>
<text x="400" y="310" text-anchor="middle" font-size="11" fill="#333">可重新注入</text>
<rect x="520" y="120" width="180" height="220" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="610" y="145" text-anchor="middle" font-size="15" font-weight="bold" fill="#c2185b">字段注入</text>
<text x="610" y="170" text-anchor="middle" font-size="12" fill="#333">(Field Injection)</text>
<rect x="550" y="190" width="120" height="40" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="610" y="205" text-anchor="middle" font-size="11" fill="#333">public class A {</text>
<text x="610" y="220" text-anchor="middle" font-size="11" fill="#333">@Autowired B b;</text>
<text x="610" y="250" text-anchor="middle" font-size="11" fill="#c62828">✗ 不推荐</text>
<text x="610" y="265" text-anchor="middle" font-size="11" fill="#333">代码简洁</text>
<text x="610" y="280" text-anchor="middle" font-size="11" fill="#333">难以测试</text>
<text x="610" y="295" text-anchor="middle" font-size="11" fill="#333">违反封装性</text>
<text x="610" y="310" text-anchor="middle" font-size="11" fill="#333">无法注入 final</text>
</svg>

**三种注入方式对比：**

| 注入方式 | 适用场景 | 优点 | 缺点 | 推荐度 |
|---------|---------|------|------|--------|
| **构造器注入** | 强制依赖、不可变对象 | 保证依赖完整性、支持 final、线程安全 | 参数过多时不便 | ⭐⭐⭐⭐⭐ |
| **Setter 注入** | 可选依赖、需要重新注入 | 灵活、支持循环依赖 | 无法保证依赖完整性 | ⭐⭐⭐⭐ |
| **字段注入** | 快速原型开发 | 代码简洁 | 难以测试、违反封装 | ⭐⭐ |

**代码示例：**

```java
// 1. 构造器注入（推荐）
@Service
public class UserService {
    private final UserDao userDao;
    private final UserCache userCache;

    @Autowired
    public UserService(UserDao userDao, UserCache userCache) {
        this.userDao = userDao;
        this.userCache = userCache;
    }
}

// 2. Setter 注入
@Service
public class UserService {
    private UserDao userDao;

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}

// 3. 字段注入（不推荐）
@Service
public class UserService {
    @Autowired
    private UserDao userDao;
}
```

**关键要点：**
- DI 是实现 IoC 的一种具体手段
- 优先使用构造器注入，保证对象的不可变性和完整性
- Setter 注入适用于可选依赖和需要重新配置的场景
- 避免使用字段注入，因为它降低了代码的可测试性

**记忆口诀：**
"**构造强依赖，Setter 可选配，字段虽简洁，测试难把控**"

---

### 5. IoC 和 DI 的区别是什么？

**核心答案：**
IoC 是一种设计思想（What），强调控制权的反转；DI 是实现 IoC 的一种具体方式（How），通过注入依赖来实现控制反转。

**详细说明：**

**IoC 和 DI 的关系图：**

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="600" height="350" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="350" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">IoC 与 DI 的关系</text>
<ellipse cx="350" cy="200" rx="220" ry="140" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" stroke-dasharray="10,5"/>
<text x="350" y="130" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">IoC (设计思想)</text>
<text x="350" y="155" text-anchor="middle" font-size="14" fill="#333">控制权反转：从程序到容器</text>
<rect x="240" y="190" width="220" height="140" fill="#fff" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="350" y="215" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">DI (实现方式)</text>
<text x="350" y="240" text-anchor="middle" font-size="13" fill="#333">依赖注入的具体手段</text>
<rect x="260" y="255" width="180" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="350" y="275" text-anchor="middle" font-size="12" fill="#333">• 构造器注入</text>
<text x="350" y="292" text-anchor="middle" font-size="12" fill="#333">• Setter 注入</text>
<text x="350" y="309" text-anchor="middle" font-size="12" fill="#333">• 字段注入</text>
<g transform="translate(80, 340)">
<rect x="0" y="0" width="160" height="40" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="80" y="15" text-anchor="middle" font-size="13" font-weight="bold" fill="#f57c00">思想层面</text>
<text x="80" y="30" text-anchor="middle" font-size="11" fill="#333">What (是什么)</text>
</g>
<g transform="translate(360, 340)">
<rect x="0" y="0" width="160" height="40" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="80" y="15" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">实现层面</text>
<text x="80" y="30" text-anchor="middle" font-size="11" fill="#333">How (怎么做)</text>
</g>
<path d="M 240 360 L 360 360" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
</svg>

**核心区别：**

| 维度 | IoC（控制反转） | DI（依赖注入） |
|------|---------------|---------------|
| **本质** | 设计思想/原则 | 实现方式/技术 |
| **层次** | 抽象层面（What） | 具体层面（How） |
| **关注点** | 控制权的转移 | 依赖关系的建立 |
| **范围** | 更广泛，包含多种实现 | IoC 的一种具体实现 |
| **目标** | 降低耦合、提高灵活性 | 通过注入管理依赖 |

**类比理解：**

```
IoC 就像"外包"的思想：
- 以前：自己做饭（程序自己创建对象）
- 现在：点外卖（容器提供对象）

DI 就像"外卖配送"的方式：
- 构造器注入：下单时必须指定（强制依赖）
- Setter 注入：可以后续更换配菜（可选依赖）
- 字段注入：直接送到手里（简单但不透明）
```

**代码理解：**

```java
// IoC 思想：控制权反转
// 传统方式：程序控制对象创建
class OrderService {
    private PaymentService payment = new AlipayService(); // 主动创建
}

// IoC 方式：容器控制对象创建和管理
@Service
class OrderService {
    // 不关心 PaymentService 如何创建，由容器管理
}

// DI 实现：具体的注入方式
@Service
class OrderService {
    private final PaymentService payment;

    // 构造器注入：DI 的一种实现方式
    @Autowired
    public OrderService(PaymentService payment) {
        this.payment = payment;
    }
}
```

**关键要点：**
- IoC 是"思想"，回答"为什么要这样设计"
- DI 是"手段"，回答"如何实现这个设计"
- DI 是实现 IoC 的主要方式，但不是唯一方式
- 其他实现 IoC 的方式还有：依赖查找（Dependency Lookup）、模板方法、策略模式等

**记忆口诀：**
"**IoC 是思想，DI 是手段；控制要反转，依赖靠注入**"

---

### 6. Spring IoC 容器是什么？有哪些实现？

**核心答案：**
Spring IoC 容器是 Spring 框架的核心，负责管理 Bean 的生命周期和依赖关系。主要有两种实现：BeanFactory（基础容器）和 ApplicationContext（高级容器）。

**详细说明：**

**Spring IoC 容器层次结构：**

<svg viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="50" width="650" height="400" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="375" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">Spring IoC 容器体系</text>
<rect x="280" y="120" width="190" height="50" fill="#1976d2" stroke="#0d47a1" stroke-width="2" rx="5"/>
<text x="375" y="150" text-anchor="middle" font-size="15" font-weight="bold" fill="white">BeanFactory (接口)</text>
<rect x="100" y="210" width="190" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="195" y="230" text-anchor="middle" font-size="14" font-weight="bold" fill="white">DefaultListableBeanFactory</text>
<text x="195" y="248" text-anchor="middle" font-size="11" fill="white">最常用的实现类</text>
<rect x="460" y="210" width="190" height="50" fill="#ff9800" stroke="#ef6c00" stroke-width="2" rx="5"/>
<text x="555" y="230" text-anchor="middle" font-size="14" font-weight="bold" fill="white">ApplicationContext (接口)</text>
<text x="555" y="248" text-anchor="middle" font-size="11" fill="white">高级容器</text>
<rect x="100" y="310" width="180" height="70" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="190" y="330" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">特点</text>
<text x="190" y="348" text-anchor="middle" font-size="11" fill="#333">✓ 延迟初始化</text>
<text x="190" y="363" text-anchor="middle" font-size="11" fill="#333">✓ 手动注册 Bean</text>
<text x="190" y="378" text-anchor="middle" font-size="11" fill="#333">✓ 轻量级</text>
<rect x="320" y="300" width="150" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="395" y="320" text-anchor="middle" font-size="12" font-weight="bold" fill="#f57c00">ClassPathXml...</text>
<text x="395" y="335" text-anchor="middle" font-size="10" fill="#333">从 classpath 加载</text>
<text x="395" y="350" text-anchor="middle" font-size="12" font-weight="bold" fill="#f57c00">FileSystemXml...</text>
<text x="395" y="365" text-anchor="middle" font-size="10" fill="#333">从文件系统加载</text>
<text x="395" y="378" text-anchor="middle" font-size="12" font-weight="bold" fill="#f57c00">AnnotationConfig...</text>
<rect x="500" y="310" width="180" height="70" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="590" y="330" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976d2">特点</text>
<text x="590" y="348" text-anchor="middle" font-size="11" fill="#333">✓ 立即初始化</text>
<text x="590" y="363" text-anchor="middle" font-size="11" fill="#333">✓ 自动注册 Bean</text>
<text x="590" y="378" text-anchor="middle" font-size="11" fill="#333">✓ 功能丰富</text>
<line x1="340" y1="170" x2="195" y2="210" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="410" y1="170" x2="555" y2="210" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="555" y1="260" x2="470" y2="340" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>
<text x="375" y="430" text-anchor="middle" font-size="13" fill="#c62828" font-weight="bold">推荐使用 ApplicationContext</text>
</svg>

**BeanFactory vs ApplicationContext：**

| 特性 | BeanFactory | ApplicationContext |
|------|------------|-------------------|
| **功能** | 基础容器 | 高级容器（继承 BeanFactory） |
| **初始化** | 延迟初始化（lazy）| 立即初始化（eager） |
| **国际化** | 不支持 | 支持 |
| **事件发布** | 不支持 | 支持 |
| **AOP** | 手动处理 | 自动处理 |
| **资源访问** | 不支持 | 支持 |
| **适用场景** | 资源受限环境（如移动设备）| 企业级应用（推荐） |

**主要实现类：**

1. **BeanFactory 实现：**
   - `DefaultListableBeanFactory`：最常用的 BeanFactory 实现

2. **ApplicationContext 实现：**
   - `ClassPathXmlApplicationContext`：从类路径加载 XML 配置
   - `FileSystemXmlApplicationContext`：从文件系统加载 XML 配置
   - `AnnotationConfigApplicationContext`：基于注解的配置（推荐）
   - `WebApplicationContext`：Web 应用专用

**使用示例：**

```java
// 1. BeanFactory 方式
BeanFactory factory = new DefaultListableBeanFactory();
// 需要手动加载配置
XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader((DefaultListableBeanFactory) factory);
reader.loadBeanDefinitions(new ClassPathResource("spring-config.xml"));
// 延迟加载：只有调用 getBean 时才创建对象
UserService userService = factory.getBean(UserService.class);

// 2. ApplicationContext 方式（推荐）
// 基于 XML
ApplicationContext context = new ClassPathXmlApplicationContext("spring-config.xml");

// 基于注解（最常用）
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

// 立即加载：容器启动时就创建所有单例 Bean
UserService userService = context.getBean(UserService.class);
```

**ApplicationContext 的额外功能：**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="600" height="300" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="350" y="85" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">ApplicationContext 扩展功能</text>
<rect x="100" y="120" width="120" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="160" y="140" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976d2">国际化</text>
<text x="160" y="160" text-anchor="middle" font-size="11" fill="#333">MessageSource</text>
<rect x="250" y="120" width="120" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="310" y="140" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">事件发布</text>
<text x="310" y="160" text-anchor="middle" font-size="11" fill="#333">ApplicationEvent</text>
<rect x="400" y="120" width="120" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="460" y="140" text-anchor="middle" font-size="13" font-weight="bold" fill="#f57c00">资源访问</text>
<text x="460" y="160" text-anchor="middle" font-size="11" fill="#333">ResourceLoader</text>
<rect x="175" y="210" width="120" height="60" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="235" y="230" text-anchor="middle" font-size="13" font-weight="bold" fill="#c2185b">环境抽象</text>
<text x="235" y="250" text-anchor="middle" font-size="11" fill="#333">Environment</text>
<rect x="325" y="210" width="120" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="385" y="230" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">AOP 支持</text>
<text x="385" y="250" text-anchor="middle" font-size="11" fill="#333">自动代理</text>
<ellipse cx="350" cy="310" rx="100" ry="25" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="350" y="318" text-anchor="middle" font-size="14" font-weight="bold" fill="white">BeanFactory 基础功能</text>
</svg>

**关键要点：**
- ApplicationContext 是 BeanFactory 的子接口，功能更强大
- ApplicationContext 会在启动时初始化所有单例 Bean（可以提前发现配置问题）
- 实际开发中几乎都使用 ApplicationContext
- Spring Boot 默认使用 AnnotationConfigApplicationContext

**记忆口诀：**
"**BeanFactory 是基础，ApplicationContext 更高级；延迟变立即，功能更丰富**"

---

### 7. BeanFactory 和 ApplicationContext 的区别是什么？

**核心答案：**
BeanFactory 是 Spring 的基础容器，提供基本的 IoC 功能；ApplicationContext 是 BeanFactory 的子接口，提供更多企业级功能，如国际化、事件发布、AOP 等，是实际开发中的首选。

**详细说明：**

**对比示意图：**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="450" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">BeanFactory vs ApplicationContext</text>
<g id="beanfactory">
<rect x="100" y="120" width="280" height="330" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="240" y="150" text-anchor="middle" font-size="18" font-weight="bold" fill="#c62828">BeanFactory</text>
<rect x="130" y="170" width="220" height="260" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="240" y="195" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">基础功能</text>
<text x="140" y="220" text-anchor="start" font-size="12" fill="#333">• Bean 的创建和管理</text>
<text x="140" y="240" text-anchor="start" font-size="12" fill="#333">• 依赖注入</text>
<text x="140" y="260" text-anchor="start" font-size="12" fill="#333">• Bean 的生命周期管理</text>
<text x="240" y="290" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">特点</text>
<text x="140" y="315" text-anchor="start" font-size="12" fill="#333">• 延迟加载 (lazy)</text>
<text x="140" y="335" text-anchor="start" font-size="12" fill="#333">• 内存占用小</text>
<text x="140" y="355" text-anchor="start" font-size="12" fill="#333">• 启动速度快</text>
<text x="140" y="375" text-anchor="start" font-size="12" fill="#333">• 功能简单</text>
<text x="240" y="405" text-anchor="middle" font-size="13" font-style="italic" fill="#666">适用于资源受限环境</text>
</g>
<g id="applicationcontext">
<rect x="420" y="120" width="280" height="330" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="560" y="150" text-anchor="middle" font-size="18" font-weight="bold" fill="#2e7d32">ApplicationContext</text>
<rect x="450" y="170" width="220" height="260" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="560" y="195" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">继承 BeanFactory + 扩展</text>
<text x="460" y="220" text-anchor="start" font-size="12" fill="#2e7d32">✓ BeanFactory 所有功能</text>
<text x="460" y="240" text-anchor="start" font-size="12" fill="#333">• 国际化 (i18n)</text>
<text x="460" y="260" text-anchor="start" font-size="12" fill="#333">• 事件发布机制</text>
<text x="460" y="280" text-anchor="start" font-size="12" fill="#333">• 资源访问 (Resource)</text>
<text x="460" y="300" text-anchor="start" font-size="12" fill="#333">• 环境抽象 (Environment)</text>
<text x="560" y="325" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">特点</text>
<text x="460" y="350" text-anchor="start" font-size="12" fill="#333">• 立即加载 (eager)</text>
<text x="460" y="370" text-anchor="start" font-size="12" fill="#333">• 功能丰富</text>
<text x="460" y="390" text-anchor="start" font-size="12" fill="#333">• 自动装配增强</text>
<text x="560" y="420" text-anchor="middle" font-size="13" font-style="italic" fill="#666">企业级应用首选 ⭐</text>
</g>
<path d="M 380 285 L 420 285" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="400" y="275" text-anchor="middle" font-size="12" fill="#666">继承扩展</text>
</svg>

**核心区别总结表：**

| 对比维度 | BeanFactory | ApplicationContext |
|----------|-------------|-------------------|
| **继承关系** | 顶层接口 | 继承 BeanFactory |
| **Bean 加载** | 延迟加载（调用 `getBean()` 时创建）| 立即加载（容器启动时创建）|
| **创建方式** | 手动创建 | 多种方式（XML、注解、Java 配置）|
| **国际化** | ❌ 不支持 | ✅ 支持 MessageSource |
| **事件机制** | ❌ 不支持 | ✅ 支持 ApplicationEvent |
| **AOP** | ❌ 需手动配置 | ✅ 自动代理 |
| **BeanPostProcessor** | ❌ 需手动注册 | ✅ 自动注册 |
| **资源访问** | ❌ 不支持 | ✅ 支持 ResourceLoader |
| **环境抽象** | ❌ 不支持 | ✅ 支持 Environment |
| **启动速度** | 快 | 相对慢 |
| **内存占用** | 小 | 相对大 |
| **使用场景** | 资源受限（如移动设备）| 企业级应用（推荐）⭐ |

**加载时机对比：**

```java
// BeanFactory - 延迟加载
BeanFactory factory = new XmlBeanFactory(new ClassPathResource("beans.xml"));
// 此时 Bean 还未创建
System.out.println("容器创建完成");
// 调用 getBean 时才创建 Bean
UserService service = factory.getBean(UserService.class);

// ApplicationContext - 立即加载
ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
// 容器启动时，所有单例 Bean 已经创建完成
System.out.println("容器创建完成"); // 此时 Bean 已存在
UserService service = context.getBean(UserService.class); // 直接获取
```

**功能对比示意图：**

<svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="600" height="250" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="350" y="85" text-anchor="middle" font-size="18" font-weight="bold" fill="#333">功能范围对比</text>
<ellipse cx="350" cy="180" rx="250" ry="100" fill="#e8f5e9" stroke="#2e7d32" stroke-width="3"/>
<text x="350" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">ApplicationContext</text>
<ellipse cx="350" cy="200" rx="150" ry="60" fill="#ffebee" stroke="#c62828" stroke-width="3"/>
<text x="350" y="195" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">BeanFactory</text>
<text x="350" y="215" text-anchor="middle" font-size="12" fill="#333">基础 IoC 功能</text>
<text x="150" y="140" text-anchor="start" font-size="11" fill="#2e7d32">• 国际化</text>
<text x="150" y="160" text-anchor="start" font-size="11" fill="#2e7d32">• 事件发布</text>
<text x="150" y="180" text-anchor="start" font-size="11" fill="#2e7d32">• 资源访问</text>
<text x="480" y="140" text-anchor="start" font-size="11" fill="#2e7d32">• 环境抽象</text>
<text x="480" y="160" text-anchor="start" font-size="11" fill="#2e7d32">• AOP 支持</text>
<text x="480" y="180" text-anchor="start" font-size="11" fill="#2e7d32">• 自动装配</text>
</svg>

**实际开发建议：**

1. **优先使用 ApplicationContext**
   - 功能更完整，满足企业级需求
   - 立即加载可以在启动时发现配置错误
   - Spring Boot 默认使用 ApplicationContext

2. **使用 BeanFactory 的场景**
   - 极度受限的资源环境（如嵌入式系统）
   - 需要精确控制 Bean 的加载时机
   - 特定的性能优化需求

**关键要点：**
- ApplicationContext 是 BeanFactory 的超集，包含所有 BeanFactory 功能并扩展
- 延迟加载 vs 立即加载是最明显的区别
- ApplicationContext 提供了更多企业级特性，是实际开发的标准选择
- 99% 的场景都应该使用 ApplicationContext

**记忆口诀：**
"**Factory 是基础，Context 是加强；延迟变立即，功能更完善**"

---

### 8. Spring 的优点和缺点是什么？

**核心答案：**
Spring 的优点包括轻量级、低耦合、AOP 支持、事务管理等；缺点包括配置复杂、学习曲线陡峭、运行时开销等。Spring Boot 的出现很大程度上解决了配置复杂的问题。

**详细说明：**

**优缺点对比图：**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="500" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">Spring 框架优缺点</text>
<rect x="100" y="120" width="280" height="380" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="240" y="150" text-anchor="middle" font-size="18" font-weight="bold" fill="#2e7d32">优点 ✓</text>
<g id="advantages">
<rect x="130" y="170" width="220" height="45" fill="#fff" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="240" y="190" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">轻量级</text>
<text x="240" y="207" text-anchor="middle" font-size="11" fill="#333">非侵入式，不依赖特定服务器</text>
<rect x="130" y="225" width="220" height="45" fill="#fff" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="240" y="245" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">低耦合</text>
<text x="240" y="262" text-anchor="middle" font-size="11" fill="#333">IoC/DI 降低组件依赖</text>
<rect x="130" y="280" width="220" height="45" fill="#fff" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="240" y="300" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">AOP 支持</text>
<text x="240" y="317" text-anchor="middle" font-size="11" fill="#333">横切关注点统一管理</text>
<rect x="130" y="335" width="220" height="45" fill="#fff" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="240" y="355" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">事务管理</text>
<text x="240" y="372" text-anchor="middle" font-size="11" fill="#333">声明式事务，简化开发</text>
<rect x="130" y="390" width="220" height="45" fill="#fff" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="240" y="410" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">生态丰富</text>
<text x="240" y="427" text-anchor="middle" font-size="11" fill="#333">易于集成各种框架</text>
<rect x="130" y="445" width="220" height="45" fill="#fff" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="240" y="465" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">社区活跃</text>
<text x="240" y="482" text-anchor="middle" font-size="11" fill="#333">文档完善，持续更新</text>
</g>
<rect x="420" y="120" width="280" height="380" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="560" y="150" text-anchor="middle" font-size="18" font-weight="bold" fill="#c62828">缺点 ✗</text>
<g id="disadvantages">
<rect x="450" y="170" width="220" height="55" fill="#fff" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="560" y="190" text-anchor="middle" font-size="13" font-weight="bold" fill="#c62828">配置复杂</text>
<text x="560" y="207" text-anchor="middle" font-size="11" fill="#333">XML 配置繁琐</text>
<text x="560" y="220" text-anchor="middle" font-size="10" fill="#2e7d32">(Spring Boot 已解决)</text>
<rect x="450" y="235" width="220" height="45" fill="#fff" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="560" y="255" text-anchor="middle" font-size="13" font-weight="bold" fill="#c62828">学习曲线陡</text>
<text x="560" y="272" text-anchor="middle" font-size="11" fill="#333">概念多，需要时间掌握</text>
<rect x="450" y="290" width="220" height="45" fill="#fff" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="560" y="310" text-anchor="middle" font-size="13" font-weight="bold" fill="#c62828">运行时开销</text>
<text x="560" y="327" text-anchor="middle" font-size="11" fill="#333">反射、代理影响性能</text>
<rect x="450" y="345" width="220" height="45" fill="#fff" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="560" y="365" text-anchor="middle" font-size="13" font-weight="bold" fill="#c62828">依赖管理</text>
<text x="560" y="382" text-anchor="middle" font-size="11" fill="#333">jar 包冲突问题</text>
<rect x="450" y="400" width="220" height="45" fill="#fff" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="560" y="420" text-anchor="middle" font-size="13" font-weight="bold" fill="#c62828">过度设计</text>
<text x="560" y="437" text-anchor="middle" font-size="11" fill="#333">小项目可能显得笨重</text>
<rect x="450" y="455" width="220" height="35" fill="#fff" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="560" y="475" text-anchor="middle" font-size="13" font-weight="bold" fill="#c62828">调试困难</text>
<text x="560" y="487" text-anchor="middle" font-size="11" fill="#333">代理链路复杂</text>
</g>
<rect x="250" y="520" width="300" height="20" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="400" y="535" text-anchor="middle" font-size="12" fill="#f57c00">💡 Spring Boot 大幅简化了配置和使用</text>
</svg>

**详细优缺点分析：**

**优点详解：**

1. **轻量级与非侵入式**
   - 框架本身很小（约 2MB）
   - 无需继承特定类或实现特定接口
   - POJO 编程，代码无框架痕迹

2. **IoC/DI 降低耦合**
   - 对象创建由容器管理
   - 依赖通过注入提供
   - 提高代码可维护性和可测试性

3. **AOP 支持**
   - 横切关注点集中管理（日志、事务、安全等）
   - 减少重复代码
   - 业务逻辑更清晰

4. **声明式事务**
   - 简化事务管理
   - 通过注解即可实现
   - 支持多种事务管理器

5. **丰富的生态**
   - 易于集成 MyBatis、Hibernate、Redis 等
   - Spring Data、Spring Security 等子项目
   - Spring Boot、Spring Cloud 微服务全家桶

6. **优秀的设计模式**
   - 单例、工厂、代理、模板方法等
   - 可作为设计模式学习范例

**缺点详解：**

1. **配置复杂（已改善）**
   - XML 配置繁琐且容易出错
   - 配置文件庞大，维护困难
   - **Spring Boot 通过约定优于配置解决了这个问题**

2. **学习曲线陡峭**
   - IoC、AOP、事务等概念需要理解
   - 注解众多，需要时间掌握
   - 需要理解底层原理才能用好

3. **运行时性能开销**
   - 反射机制影响性能
   - 动态代理增加调用链
   - 容器初始化耗时（大型应用）

4. **依赖管理问题**
   - jar 包版本冲突
   - 传递依赖复杂
   - **Spring Boot 的 Starter 机制简化了这个问题**

5. **过度设计风险**
   - 小型项目使用 Spring 可能过于笨重
   - 简单功能可能变复杂
   - 需要权衡项目规模

6. **调试困难**
   - AOP 代理链路复杂
   - 异常堆栈深
   - 需要理解框架原理

**适用场景评估：**

| 项目类型 | 是否适合 Spring | 建议 |
|---------|----------------|------|
| 企业级应用 | ✅ 非常适合 | 使用 Spring Boot |
| 中大型项目 | ✅ 适合 | 完整 Spring 生态 |
| 微服务架构 | ✅ 非常适合 | Spring Cloud |
| 小型项目 | ⚠️ 可选 | 考虑轻量级框架 |
| 性能敏感应用 | ⚠️ 需评估 | 优化配置 |
| 快速原型 | ✅ 适合 | Spring Boot |

**关键要点：**
- Spring 的优点远大于缺点，是企业级开发的首选
- Spring Boot 的出现极大改善了配置复杂的问题
- 了解 Spring 原理可以更好地使用和调优
- 选择框架要根据项目规模和需求权衡

**记忆口诀：**
"**优点：轻量低耦 AOP 事务，生态丰富社区好；缺点：配置学习需时间，性能调试要技巧**"（Spring Boot 让配置简单了）

---

## Spring Bean

### 9. 什么是 Spring Bean？

**核心答案：**
Spring Bean 是由 Spring IoC 容器管理的对象。它是应用程序的核心组件，由容器负责创建、配置、装配和管理其生命周期。

**详细说明：**

**Bean 的核心概念：**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="350" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">Spring Bean 核心概念</text>
<ellipse cx="400" cy="230" rx="280" ry="140" fill="#e3f2fd" stroke="#1976d2" stroke-width="3"/>
<text x="400" y="150" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">Spring IoC 容器</text>
<rect x="200" y="190" width="120" height="80" fill="#fff" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="260" y="215" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">Bean A</text>
<text x="260" y="235" text-anchor="middle" font-size="11" fill="#333">UserService</text>
<text x="260" y="255" text-anchor="middle" font-size="10" fill="#666">@Service</text>
<rect x="340" y="190" width="120" height="80" fill="#fff" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="215" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">Bean B</text>
<text x="400" y="235" text-anchor="middle" font-size="11" fill="#333">UserDao</text>
<text x="400" y="255" text-anchor="middle" font-size="10" fill="#666">@Repository</text>
<rect x="480" y="190" width="120" height="80" fill="#fff" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="540" y="215" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">Bean C</text>
<text x="540" y="235" text-anchor="middle" font-size="11" fill="#333">UserCache</text>
<text x="540" y="255" text-anchor="middle" font-size="10" fill="#666">@Component</text>
<g transform="translate(100, 300)">
<rect x="0" y="0" width="140" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="70" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e7d32">容器管理</text>
<text x="70" y="38" text-anchor="middle" font-size="10" fill="#333">创建</text>
<text x="70" y="52" text-anchor="middle" font-size="10" fill="#333">配置</text>
</g>
<g transform="translate(280, 300)">
<rect x="0" y="0" width="140" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="70" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#f57c00">依赖注入</text>
<text x="70" y="38" text-anchor="middle" font-size="10" fill="#333">装配</text>
<text x="70" y="52" text-anchor="middle" font-size="10" fill="#333">管理关系</text>
</g>
<g transform="translate(460, 300)">
<rect x="0" y="0" width="140" height="60" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="70" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#c2185b">生命周期</text>
<text x="70" y="38" text-anchor="middle" font-size="10" fill="#333">初始化</text>
<text x="70" y="52" text-anchor="middle" font-size="10" fill="#333">销毁</text>
</g>
</svg>

**Bean vs 普通 Java 对象：**

| 特性 | 普通 Java 对象 | Spring Bean |
|------|--------------|------------|
| **创建方式** | new 关键字 | IoC 容器创建 |
| **生命周期** | 程序员控制 | 容器管理 |
| **依赖关系** | 手动管理 | 自动注入 |
| **作用域** | 无概念 | 多种作用域（singleton、prototype 等）|
| **管理成本** | 高 | 低（容器自动管理）|

**Bean 的定义方式：**

```java
// 1. 使用注解定义 Bean（推荐）
@Component  // 通用组件
public class UserCache {
    // ...
}

@Service  // 业务逻辑层
public class UserService {
    // ...
}

@Repository  // 数据访问层
public class UserDao {
    // ...
}

@Controller  // 表现层（Web）
public class UserController {
    // ...
}

// 2. 使用 @Bean 注解（用于配置类）
@Configuration
public class AppConfig {
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}

// 3. XML 配置（传统方式，不推荐）
// <bean id="userService" class="com.example.UserService"/>
```

**Bean 的核心属性：**

1. **id/name**：Bean 的唯一标识符
2. **class**：Bean 的全限定类名
3. **scope**：Bean 的作用域（singleton、prototype 等）
4. **constructor-arg**：构造函数参数
5. **property**：属性值
6. **init-method**：初始化方法
7. **destroy-method**：销毁方法

**获取 Bean 的方式：**

```java
// 方式1：按类型获取（推荐）
UserService userService = context.getBean(UserService.class);

// 方式2：按名称获取
UserService userService = (UserService) context.getBean("userService");

// 方式3：按名称和类型获取
UserService userService = context.getBean("userService", UserService.class);

// 方式4：通过依赖注入自动获取（最常用）
@Autowired
private UserService userService;
```

**关键要点：**
- Bean 是 Spring 管理的对象，不是普通的 Java 对象
- Bean 由 IoC 容器负责创建、配置和管理
- 实际开发中主要使用注解方式定义 Bean
- Bean 之间的依赖关系由容器自动处理

**记忆口诀：**
"**容器管理的对象就是 Bean，创建配置装配全托管**"

---


### 10. Spring Bean 的作用域有哪些？

**核心答案：**
Spring Bean 有 6 种作用域：singleton（单例，默认）、prototype（原型）、request（请求）、session（会话）、application（应用）、websocket（WebSocket）。

**详细说明：**

**Bean 作用域全景图：**

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="750" height="500" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="425" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">Spring Bean 作用域</text>
<g id="singleton">
<rect x="100" y="120" width="300" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="250" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#1976d2">singleton（单例）</text>
<text x="250" y="168" text-anchor="middle" font-size="12" fill="#333">默认作用域，容器中只有一个实例</text>
<ellipse cx="250" cy="195" rx="35" ry="15" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="250" y="200" text-anchor="middle" font-size="11" fill="white">Bean</text>
</g>
<g id="prototype">
<rect x="450" y="120" width="300" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="600" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">prototype（原型）</text>
<text x="600" y="168" text-anchor="middle" font-size="12" fill="#333">每次请求都创建新实例</text>
<ellipse cx="560" cy="195" rx="30" ry="15" fill="#ff9800" stroke="#ef6c00" stroke-width="2"/>
<text x="560" y="200" text-anchor="middle" font-size="10" fill="white">Bean1</text>
<ellipse cx="600" cy="195" rx="30" ry="15" fill="#ff9800" stroke="#ef6c00" stroke-width="2"/>
<text x="600" y="200" text-anchor="middle" font-size="10" fill="white">Bean2</text>
<ellipse cx="640" cy="195" rx="30" ry="15" fill="#ff9800" stroke="#ef6c00" stroke-width="2"/>
<text x="640" y="200" text-anchor="middle" font-size="10" fill="white">Bean3</text>
</g>
<g id="request">
<rect x="100" y="250" width="220" height="90" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="210" y="275" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">request（请求）</text>
<text x="210" y="295" text-anchor="middle" font-size="11" fill="#333">每个 HTTP 请求一个实例</text>
<text x="210" y="315" text-anchor="middle" font-size="10" fill="#666">仅 Web 应用可用</text>
</g>
<g id="session">
<rect x="350" y="250" width="220" height="90" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="460" y="275" text-anchor="middle" font-size="15" font-weight="bold" fill="#c2185b">session（会话）</text>
<text x="460" y="295" text-anchor="middle" font-size="11" fill="#333">每个 HTTP 会话一个实例</text>
<text x="460" y="315" text-anchor="middle" font-size="10" fill="#666">仅 Web 应用可用</text>
</g>
<g id="application">
<rect x="100" y="370" width="220" height="90" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="210" y="395" text-anchor="middle" font-size="15" font-weight="bold" fill="#7b1fa2">application（应用）</text>
<text x="210" y="415" text-anchor="middle" font-size="11" fill="#333">整个 ServletContext 一个实例</text>
<text x="210" y="435" text-anchor="middle" font-size="10" fill="#666">仅 Web 应用可用</text>
</g>
<g id="websocket">
<rect x="350" y="370" width="220" height="90" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="460" y="395" text-anchor="middle" font-size="15" font-weight="bold" fill="#00796b">websocket</text>
<text x="460" y="415" text-anchor="middle" font-size="11" fill="#333">每个 WebSocket 会话一个实例</text>
<text x="460" y="435" text-anchor="middle" font-size="10" fill="#666">仅 Web 应用可用</text>
</g>
<rect x="100" y="480" width="650" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="425" y="505" text-anchor="middle" font-size="13" fill="#333">💡 常用：singleton（默认）、prototype</text>
<text x="425" y="522" text-anchor="middle" font-size="12" fill="#666">Web 专用：request、session、application、websocket</text>
</svg>

**作用域详细对比：**

| 作用域 | 说明 | 生命周期 | 线程安全 | 使用场景 |
|--------|------|---------|---------|---------|
| **singleton** | 单例（默认） | 容器启动到关闭 | ⚠️ 需注意 | 无状态 Bean（Service、Dao） |
| **prototype** | 原型 | 获取到使用完毕 | ✅ 安全 | 有状态 Bean、需要独立实例 |
| **request** | 请求 | HTTP 请求周期 | ✅ 安全 | Web 层，请求相关数据 |
| **session** | 会话 | HTTP 会话周期 | ✅ 安全 | 用户会话数据（购物车） |
| **application** | 应用 | ServletContext 周期 | ⚠️ 需注意 | 全局共享数据 |
| **websocket** | WebSocket | WebSocket 会话周期 | ✅ 安全 | WebSocket 通信 |

**配置示例：**

```java
// 1. 使用注解配置作用域
@Component
@Scope("singleton")  // 默认，可省略
public class SingletonBean {
    // 单例 Bean，容器中只有一个实例
}

@Component
@Scope("prototype")  // 每次获取都创建新实例
public class PrototypeBean {
    // 原型 Bean
}

// 2. Web 相关作用域
@Component
@Scope("request")
public class RequestBean {
    // 每个 HTTP 请求一个实例
}

@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class SessionBean {
    // 每个 HTTP 会话一个实例
    // proxyMode 用于解决单例 Bean 注入会话 Bean 的问题
}

// 3. 使用 @Bean 配置
@Configuration
public class AppConfig {

    @Bean
    @Scope("singleton")
    public UserService userService() {
        return new UserService();
    }

    @Bean
    @Scope("prototype")
    public UserTask userTask() {
        return new UserTask();
    }
}
```

**singleton vs prototype 对比：**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="300" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">singleton vs prototype</text>
<g id="singleton-demo">
<rect x="100" y="120" width="280" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="240" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#1976d2">singleton（单例）</text>
<ellipse cx="240" cy="190" rx="50" ry="30" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="240" y="197" text-anchor="middle" font-size="13" font-weight="bold" fill="white">Bean实例</text>
<text x="130" y="240" text-anchor="start" font-size="12" fill="#333">请求1 →</text>
<text x="130" y="260" text-anchor="start" font-size="12" fill="#333">请求2 →</text>
<text x="130" y="280" text-anchor="start" font-size="12" fill="#333">请求3 →</text>
<path d="M 190 240 L 210 190" stroke="#1976d2" stroke-width="2" fill="none"/>
<path d="M 190 260 L 210 190" stroke="#1976d2" stroke-width="2" fill="none"/>
<path d="M 190 280 L 210 190" stroke="#1976d2" stroke-width="2" fill="none"/>
<text x="310" y="240" text-anchor="start" font-size="11" fill="#666">← 同一实例</text>
<text x="310" y="260" text-anchor="start" font-size="11" fill="#666">← 同一实例</text>
<text x="310" y="280" text-anchor="start" font-size="11" fill="#666">← 同一实例</text>
</g>
<g id="prototype-demo">
<rect x="420" y="120" width="280" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="560" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">prototype（原型）</text>
<ellipse cx="530" cy="175" rx="40" ry="20" fill="#ff9800" stroke="#ef6c00" stroke-width="2"/>
<text x="530" y="180" text-anchor="middle" font-size="10" fill="white">实例1</text>
<ellipse cx="590" cy="205" rx="40" ry="20" fill="#ff9800" stroke="#ef6c00" stroke-width="2"/>
<text x="590" y="210" text-anchor="middle" font-size="10" fill="white">实例2</text>
<ellipse cx="530" cy="235" rx="40" ry="20" fill="#ff9800" stroke="#ef6c00" stroke-width="2"/>
<text x="530" y="240" text-anchor="middle" font-size="10" fill="white">实例3</text>
<text x="450" y="180" text-anchor="start" font-size="12" fill="#333">请求1 →</text>
<text x="450" y="210" text-anchor="start" font-size="12" fill="#333">请求2 →</text>
<text x="450" y="240" text-anchor="start" font-size="12" fill="#333">请求3 →</text>
<text x="620" y="180" text-anchor="start" font-size="11" fill="#666">← 新实例</text>
<text x="620" y="210" text-anchor="start" font-size="11" fill="#666">← 新实例</text>
<text x="620" y="240" text-anchor="start" font-size="11" fill="#666">← 新实例</text>
</g>
</svg>

**代码示例：**

```java
// 演示 singleton 和 prototype 的区别
@Service
@Scope("singleton")
public class SingletonService {
    private int counter = 0;

    public int increment() {
        return ++counter;  // 多次调用会累加（同一实例）
    }
}

@Service
@Scope("prototype")
public class PrototypeService {
    private int counter = 0;

    public int increment() {
        return ++counter;  // 每次都是 1（新实例）
    }
}

// 测试
@RestController
public class TestController {

    @Autowired
    private SingletonService singletonService;

    @Autowired
    private ApplicationContext context;

    @GetMapping("/singleton")
    public int testSingleton() {
        // 每次调用都是同一个实例，counter 会累加
        return singletonService.increment();  // 1, 2, 3, 4...
    }

    @GetMapping("/prototype")
    public int testPrototype() {
        // 每次获取都是新实例，counter 始终是 1
        PrototypeService service = context.getBean(PrototypeService.class);
        return service.increment();  // 始终返回 1
    }
}
```

**使用建议：**

1. **singleton（默认）**
   - ✅ 适用于无状态的 Bean（Service、Dao、Controller）
   - ⚠️ 注意线程安全问题（不要使用可变的成员变量）
   - 💡 性能最好，推荐默认使用

2. **prototype**
   - ✅ 适用于有状态的 Bean
   - ✅ 需要独立实例的场景（如线程不安全的对象）
   - ⚠️ 每次创建新实例，性能开销大
   - ⚠️ 容器不负责销毁，需要手动管理

3. **request/session**
   - ✅ Web 应用专用，自动管理生命周期
   - 💡 需要使用代理模式解决注入问题

**注意事项：**

```java
// ❌ 错误：singleton Bean 中注入 prototype Bean
@Service
@Scope("singleton")
public class SingletonService {
    @Autowired
    private PrototypeService prototypeService;  // 只注入一次！

    public void doSomething() {
        // 每次调用都是同一个 prototypeService 实例
        // 失去了 prototype 的意义
        prototypeService.increment();
    }
}

// ✅ 解决方案1：使用 ApplicationContext 手动获取
@Service
@Scope("singleton")
public class SingletonService {
    @Autowired
    private ApplicationContext context;

    public void doSomething() {
        // 每次都获取新实例
        PrototypeService service = context.getBean(PrototypeService.class);
        service.increment();
    }
}

// ✅ 解决方案2：使用 @Lookup 方法注入
@Service
@Scope("singleton")
public abstract class SingletonService {

    @Lookup
    public abstract PrototypeService getPrototypeService();

    public void doSomething() {
        // Spring 会动态实现这个方法，每次返回新实例
        PrototypeService service = getPrototypeService();
        service.increment();
    }
}
```

**关键要点：**
- singleton 是默认作用域，容器中只有一个实例
- prototype 每次获取都创建新实例
- request、session、application、websocket 仅在 Web 环境可用
- singleton Bean 注入 prototype Bean 需要特殊处理

**记忆口诀：**
"**单例默认最常用，原型每次都新建；请求会话应用网，Web 专用记心间**"

---

### 11. Spring Bean 的生命周期是怎样的？

**核心答案：**
Spring Bean 的生命周期包括：实例化 → 属性赋值 → 初始化 → 使用 → 销毁。初始化阶段会经过 Aware 接口回调、BeanPostProcessor 前置处理、初始化方法、BeanPostProcessor 后置处理。

**详细说明：**

**Bean 生命周期完整流程图：**

<svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="50" width="700" height="800" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">Spring Bean 生命周期</text>
<rect x="250" y="120" width="300" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="150" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976d2">1. 实例化 (Instantiation)</text>
<text x="620" y="150" text-anchor="start" font-size="11" fill="#666">createBeanInstance()</text>
<rect x="250" y="190" width="300" height="50" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="220" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">2. 属性赋值 (Populate)</text>
<text x="620" y="220" text-anchor="start" font-size="11" fill="#666">populateBean()</text>
<rect x="150" y="260" width="500" height="360" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="285" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">3. 初始化 (Initialization)</text>
<rect x="180" y="300" width="440" height="45" fill="#fff" stroke="#00796b" stroke-width="1" rx="3"/>
<text x="400" y="328" text-anchor="middle" font-size="13" fill="#00796b">3.1 Aware 接口回调</text>
<rect x="180" y="355" width="440" height="45" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="400" y="383" text-anchor="middle" font-size="13" fill="#7b1fa2">3.2 BeanPostProcessor.postProcessBeforeInitialization()</text>
<rect x="180" y="410" width="440" height="90" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="400" y="435" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976d2">3.3 初始化方法</text>
<text x="190" y="460" text-anchor="start" font-size="11" fill="#333">① @PostConstruct 注解方法</text>
<text x="190" y="478" text-anchor="start" font-size="11" fill="#333">② InitializingBean.afterPropertiesSet()</text>
<text x="190" y="496" text-anchor="start" font-size="11" fill="#333">③ init-method 指定方法</text>
<rect x="180" y="510" width="440" height="45" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="400" y="538" text-anchor="middle" font-size="13" fill="#7b1fa2">3.4 BeanPostProcessor.postProcessAfterInitialization()</text>
<rect x="180" y="565" width="440" height="45" fill="#fff" stroke="#4caf50" stroke-width="1" rx="3"/>
<text x="400" y="593" text-anchor="middle" font-size="13" fill="#4caf50">✅ 初始化完成，生成代理对象（AOP）</text>
<rect x="250" y="640" width="300" height="50" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="670" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">4. 使用 (In Use)</text>
<rect x="250" y="710" width="300" height="50" fill="#ffcdd2" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="400" y="740" text-anchor="middle" font-size="15" font-weight="bold" fill="#c62828">5. 销毁 (Destruction)</text>
<rect x="180" y="780" width="440" height="60" fill="#fff" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="190" y="805" text-anchor="start" font-size="12" fill="#333">① @PreDestroy 注解方法</text>
<text x="190" y="823" text-anchor="start" font-size="12" fill="#333">② DisposableBean.destroy()</text>
<text x="450" y="805" text-anchor="start" font-size="12" fill="#333">③ destroy-method</text>
<line x1="400" y1="170" x2="400" y2="190" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="400" y1="240" x2="400" y2="260" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="400" y1="620" x2="400" y2="640" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="400" y1="690" x2="400" y2="710" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="400" y1="760" x2="400" y2="780" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
</svg>

**生命周期各阶段详解：**

**1. 实例化（Instantiation）**
```java
// Spring 调用构造函数创建 Bean 实例
public class UserService {
    public UserService() {
        System.out.println("1. 构造函数：Bean 实例化");
    }
}
```

**2. 属性赋值（Populate）**
```java
@Service
public class UserService {

    @Autowired
    private UserDao userDao;  // 依赖注入

    @Value("${app.name}")
    private String appName;  // 属性注入

    // Spring 调用 setter 或直接赋值
}
```

**3. 初始化（Initialization）**

**3.1 Aware 接口回调**
```java
@Service
public class UserService implements BeanNameAware, ApplicationContextAware {

    private String beanName;
    private ApplicationContext context;

    @Override
    public void setBeanName(String name) {
        this.beanName = name;
        System.out.println("3.1 BeanNameAware：Bean 名称 = " + name);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        this.context = applicationContext;
        System.out.println("3.1 ApplicationContextAware：获取容器");
    }
}
```

**常用 Aware 接口：**

| Aware 接口 | 作用 | 使用场景 |
|-----------|------|---------|
| `BeanNameAware` | 获取 Bean 名称 | 日志记录 |
| `BeanFactoryAware` | 获取 BeanFactory | 手动获取 Bean |
| `ApplicationContextAware` | 获取 ApplicationContext | 访问容器功能 |
| `EnvironmentAware` | 获取环境变量 | 读取配置 |
| `ResourceLoaderAware` | 获取资源加载器 | 加载外部资源 |

**3.2 BeanPostProcessor 前置处理**
```java
@Component
public class MyBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        System.out.println("3.2 BeanPostProcessor 前置处理：" + beanName);
        // 可以在这里修改 Bean 或返回代理对象
        return bean;
    }
}
```

**3.3 初始化方法（按顺序执行）**
```java
@Service
public class UserService implements InitializingBean {

    // ① @PostConstruct 注解（推荐）
    @PostConstruct
    public void postConstruct() {
        System.out.println("3.3.1 @PostConstruct：初始化");
    }

    // ② InitializingBean 接口
    @Override
    public void afterPropertiesSet() {
        System.out.println("3.3.2 afterPropertiesSet：初始化");
    }

    // ③ init-method 指定方法
    public void initMethod() {
        System.out.println("3.3.3 initMethod：初始化");
    }
}

// XML 配置 init-method
// <bean id="userService" class="..." init-method="initMethod"/>

// 注解配置 init-method
@Bean(initMethod = "initMethod")
public UserService userService() {
    return new UserService();
}
```

**3.4 BeanPostProcessor 后置处理**
```java
@Component
public class MyBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        System.out.println("3.4 BeanPostProcessor 后置处理：" + beanName);
        // AOP 代理对象就是在这里创建的
        return bean;
    }
}
```

**4. 使用（In Use）**
```java
// Bean 初始化完成，可以正常使用
@Autowired
private UserService userService;

public void test() {
    userService.saveUser(user);  // 正常使用
}
```

**5. 销毁（Destruction）**
```java
@Service
public class UserService implements DisposableBean {

    // ① @PreDestroy 注解（推荐）
    @PreDestroy
    public void preDestroy() {
        System.out.println("5.1 @PreDestroy：销毁前清理");
    }

    // ② DisposableBean 接口
    @Override
    public void destroy() {
        System.out.println("5.2 destroy：销毁");
    }

    // ③ destroy-method 指定方法
    public void destroyMethod() {
        System.out.println("5.3 destroyMethod：销毁");
    }
}

// XML 配置 destroy-method
// <bean id="userService" class="..." destroy-method="destroyMethod"/>

// 注解配置 destroy-method
@Bean(destroyMethod = "destroyMethod")
public UserService userService() {
    return new UserService();
}
```

**完整示例代码：**

```java
@Component
public class LifecycleBean implements BeanNameAware, ApplicationContextAware,
        InitializingBean, DisposableBean {

    private String beanName;
    private ApplicationContext context;

    // 1. 构造函数
    public LifecycleBean() {
        System.out.println("1. 构造函数：实例化 Bean");
    }

    // 2. 属性赋值（依赖注入）
    @Autowired
    public void setDependency(SomeDependency dependency) {
        System.out.println("2. 属性赋值：依赖注入");
    }

    // 3.1 Aware 接口回调
    @Override
    public void setBeanName(String name) {
        this.beanName = name;
        System.out.println("3.1.1 BeanNameAware：" + name);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        this.context = applicationContext;
        System.out.println("3.1.2 ApplicationContextAware：获取容器");
    }

    // 3.2 BeanPostProcessor.postProcessBeforeInitialization() 由 Spring 调用

    // 3.3 初始化方法
    @PostConstruct
    public void postConstruct() {
        System.out.println("3.3.1 @PostConstruct：初始化");
    }

    @Override
    public void afterPropertiesSet() {
        System.out.println("3.3.2 InitializingBean.afterPropertiesSet：初始化");
    }

    public void customInit() {
        System.out.println("3.3.3 custom init-method：初始化");
    }

    // 3.4 BeanPostProcessor.postProcessAfterInitialization() 由 Spring 调用

    // 4. Bean 可以使用了

    // 5. 销毁方法
    @PreDestroy
    public void preDestroy() {
        System.out.println("5.1 @PreDestroy：销毁前清理");
    }

    @Override
    public void destroy() {
        System.out.println("5.2 DisposableBean.destroy：销毁");
    }

    public void customDestroy() {
        System.out.println("5.3 custom destroy-method：销毁");
    }
}

// 配置类
@Configuration
public class AppConfig {
    @Bean(initMethod = "customInit", destroyMethod = "customDestroy")
    public LifecycleBean lifecycleBean() {
        return new LifecycleBean();
    }
}
```

**输出结果：**
```
1. 构造函数：实例化 Bean
2. 属性赋值：依赖注入
3.1.1 BeanNameAware：lifecycleBean
3.1.2 ApplicationContextAware：获取容器
3.2 BeanPostProcessor 前置处理：lifecycleBean
3.3.1 @PostConstruct：初始化
3.3.2 InitializingBean.afterPropertiesSet：初始化
3.3.3 custom init-method：初始化
3.4 BeanPostProcessor 后置处理：lifecycleBean
--- Bean 可以使用了 ---
--- 容器关闭 ---
5.1 @PreDestroy：销毁前清理
5.2 DisposableBean.destroy：销毁
5.3 custom destroy-method：销毁
```

**关键要点：**
- Bean 生命周期：实例化 → 属性赋值 → 初始化 → 使用 → 销毁
- 初始化方法执行顺序：@PostConstruct → afterPropertiesSet → init-method
- 销毁方法执行顺序：@PreDestroy → destroy → destroy-method
- BeanPostProcessor 可以在初始化前后插入自定义逻辑（AOP 就是在这里实现）
- 推荐使用 @PostConstruct 和 @PreDestroy 注解

**记忆口诀：**
"**实例化，赋属性，初始化（Aware、前处理、初始化方法、后处理），能使用，再销毁**"

---

### 12. 如何定义 Spring Bean？

**核心答案：**
定义 Spring Bean 有 4 种主要方式：组件扫描（@Component 等）、@Bean 注解、XML 配置、@Import 注解。推荐使用注解方式。

**详细说明：**

**Bean 定义方式全景：**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="450" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">定义 Spring Bean 的方式</text>
<rect x="100" y="120" width="280" height="140" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="240" y="150" text-anchor="middle" font-size="16" font-weight="bold" fill="#1976d2">1. 组件扫描 ⭐⭐⭐⭐⭐</text>
<text x="110" y="175" text-anchor="start" font-size="13" fill="#333">@Component</text>
<text x="110" y="195" text-anchor="start" font-size="13" fill="#333">@Service</text>
<text x="110" y="215" text-anchor="start" font-size="13" fill="#333">@Repository</text>
<text x="110" y="235" text-anchor="start" font-size="13" fill="#333">@Controller</text>
<text x="280" y="175" text-anchor="start" font-size="11" fill="#666">通用组件</text>
<text x="280" y="195" text-anchor="start" font-size="11" fill="#666">业务层</text>
<text x="280" y="215" text-anchor="start" font-size="11" fill="#666">数据层</text>
<text x="280" y="235" text-anchor="start" font-size="11" fill="#666">控制层</text>
<text x="240" y="255" text-anchor="middle" font-size="12" fill="#2e7d32" font-weight="bold">最常用，推荐！</text>
<rect x="420" y="120" width="280" height="140" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="560" y="150" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">2. @Bean 注解 ⭐⭐⭐⭐</text>
<text x="430" y="180" text-anchor="start" font-size="12" fill="#333">在 @Configuration 类中</text>
<text x="430" y="200" text-anchor="start" font-size="12" fill="#333">方法返回值作为 Bean</text>
<text x="430" y="225" text-anchor="start" font-size="12" fill="#2e7d32" font-weight="bold">适用场景：</text>
<text x="430" y="243" text-anchor="start" font-size="11" fill="#666">• 第三方类（无法添加注解）</text>
<rect x="100" y="280" width="280" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="240" y="310" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">3. XML 配置 ⭐</text>
<text x="110" y="335" text-anchor="start" font-size="12" fill="#333">&lt;bean id="..." class="..."/&gt;</text>
<text x="240" y="365" text-anchor="middle" font-size="11" fill="#c62828">不推荐（传统方式）</text>
<rect x="420" y="280" width="280" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="560" y="310" text-anchor="middle" font-size="16" font-weight="bold" fill="#7b1fa2">4. @Import 注解 ⭐⭐⭐</text>
<text x="430" y="335" text-anchor="start" font-size="12" fill="#333">导入配置类或组件</text>
<text x="430" y="355" text-anchor="start" font-size="11" fill="#666">常用于框架集成</text>
<rect x="100" y="400" width="600" height="80" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/>
<text x="400" y="425" text-anchor="middle" font-size="14" font-weight="bold" fill="#0277bd">推荐组合：</text>
<text x="400" y="448" text-anchor="middle" font-size="13" fill="#333">自定义类用 @Component，第三方类用 @Bean</text>
<text x="400" y="468" text-anchor="middle" font-size="12" fill="#666">避免 XML，优先使用注解</text>
</svg>

**方式 1：组件扫描（推荐）**

```java
// 1. 启用组件扫描
@SpringBootApplication  // 包含 @ComponentScan
// 或
@Configuration
@ComponentScan(basePackages = "com.example")
public class AppConfig {
}

// 2. 使用组件注解
@Component  // 通用组件
public class UserCache {
    public void cache(String key, Object value) {
        // ...
    }
}

@Service  // 业务逻辑层
public class UserService {
    @Autowired
    private UserDao userDao;

    public void saveUser(User user) {
        userDao.save(user);
    }
}

@Repository  // 数据访问层
public class UserDao {
    public void save(User user) {
        // ...
    }
}

@Controller  // 表现层（Web）
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}

// 3. 自定义 Bean 名称
@Component("myUserService")  // 指定 Bean 名称
public class UserService {
}

// 4. 条件注册
@Component
@ConditionalOnProperty(name = "feature.enabled", havingValue = "true")
public class FeatureService {
    // 只有配置文件中 feature.enabled=true 时才注册
}
```

**方式 2：@Bean 注解**

```java
@Configuration
public class AppConfig {

    // 1. 基本用法
    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setUsername("root");
        dataSource.setPassword("password");
        return dataSource;
    }

    // 2. 指定 Bean 名称
    @Bean(name = "myDataSource")
    // 或
    @Bean("myDataSource")
    public DataSource dataSource2() {
        return new HikariDataSource();
    }

    // 3. 指定初始化和销毁方法
    @Bean(initMethod = "init", destroyMethod = "close")
    public DataSource dataSource3() {
        return new HikariDataSource();
    }

    // 4. 依赖其他 Bean
    @Bean
    public UserService userService(UserDao userDao) {
        // 方法参数自动注入
        return new UserService(userDao);
    }

    // 5. 条件注册
    @Bean
    @ConditionalOnMissingBean(DataSource.class)
    public DataSource defaultDataSource() {
        // 只有当容器中没有 DataSource 时才创建
        return new HikariDataSource();
    }

    // 6. 作用域
    @Bean
    @Scope("prototype")
    public UserTask userTask() {
        return new UserTask();
    }
}
```

**方式 3：XML 配置（不推荐）**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 1. 基本定义 -->
    <bean id="userService" class="com.example.UserService"/>

    <!-- 2. 构造函数注入 -->
    <bean id="userService" class="com.example.UserService">
        <constructor-arg ref="userDao"/>
    </bean>

    <!-- 3. Setter 注入 -->
    <bean id="userService" class="com.example.UserService">
        <property name="userDao" ref="userDao"/>
    </bean>

    <!-- 4. 指定作用域 -->
    <bean id="userService" class="com.example.UserService" scope="prototype"/>

    <!-- 5. 初始化和销毁方法 -->
    <bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource"
          init-method="init" destroy-method="close"/>
</beans>

// Java 代码加载 XML
ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
```

**方式 4：@Import 注解**

```java
// 1. 导入配置类
@Configuration
@Import({DatabaseConfig.class, CacheConfig.class})
public class AppConfig {
}

// 2. 导入普通类（会自动注册为 Bean）
@Configuration
@Import({UserService.class, UserDao.class})
public class AppConfig {
}

// 3. 使用 ImportSelector（高级用法）
public class MyImportSelector implements ImportSelector {
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        // 返回要导入的类的全限定名
        return new String[]{
            "com.example.UserService",
            "com.example.UserDao"
        };
    }
}

@Configuration
@Import(MyImportSelector.class)
public class AppConfig {
}

// 4. 使用 ImportBeanDefinitionRegistrar（最灵活）
public class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
    @Override
    public void registerBeanDefinitions(AnnotationMetadata metadata,
                                       BeanDefinitionRegistry registry) {
        // 手动注册 BeanDefinition
        BeanDefinition beanDefinition = BeanDefinitionBuilder
            .genericBeanDefinition(UserService.class)
            .getBeanDefinition();
        registry.registerBeanDefinition("userService", beanDefinition);
    }
}
```

**各方式对比：**

| 方式 | 优点 | 缺点 | 适用场景 | 推荐度 |
|------|-----|------|---------|-------|
| **组件扫描** | 简单、自动化 | 无法注册第三方类 | 自定义类 | ⭐⭐⭐⭐⭐ |
| **@Bean** | 灵活、可配置 | 需手动编写 | 第三方类、复杂配置 | ⭐⭐⭐⭐ |
| **XML** | 无需修改代码 | 繁琐、易出错 | 遗留项目 | ⭐ |
| **@Import** | 模块化、清晰 | 相对复杂 | 框架集成、条件导入 | ⭐⭐⭐ |

**实际开发建议：**

```java
// 推荐的配置方式
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 1. 自定义类：使用组件注解
@Service
public class UserService {
    // ...
}

// 2. 第三方类：使用 @Bean
@Configuration
public class ThirdPartyConfig {

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

// 3. 条件配置：使用 @Conditional
@Configuration
@ConditionalOnProperty(name = "cache.enabled", havingValue = "true")
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager();
    }
}

// 4. 模块导入：使用 @Import
@Configuration
@Import({DatabaseConfig.class, SecurityConfig.class})
public class AppConfig {
}
```

**关键要点：**
- 优先使用组件扫描（@Component 等）定义自定义类
- 使用 @Bean 注册第三方类或需要复杂初始化的 Bean
- 避免使用 XML 配置（除非维护遗留项目）
- @Import 用于模块化配置和框架集成

**记忆口诀：**
"**组件扫描自动化，@Bean 配置第三方；XML 已经不推荐，@Import 用于模块化**"

---

### 13. 什么是 Bean 的装配？有哪些方式？

**核心答案：**
Bean 装配是指建立 Bean 之间依赖关系的过程。主要有 3 种方式：手动装配（XML 或 @Bean）、自动装配（@Autowired、@Resource）、Java 配置装配。

**详细说明：**

**Bean 装配概念图：**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="50" width="700" height="400" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">Bean 装配方式</text>
<rect x="250" y="120" width="300" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="155" text-anchor="middle" font-size="16" font-weight="bold" fill="#1976d2">Bean 装配</text>
<text x="400" y="180" text-anchor="middle" font-size="13" fill="#333">建立 Bean 之间的依赖关系</text>
<g id="manual">
<rect x="100" y="240" width="180" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="190" y="265" text-anchor="middle" font-size="15" font-weight="bold" fill="#f57c00">手动装配</text>
<text x="110" y="290" text-anchor="start" font-size="12" fill="#333">• XML 配置</text>
<text x="110" y="310" text-anchor="start" font-size="12" fill="#333">• @Bean 方法</text>
<text x="110" y="330" text-anchor="start" font-size="12" fill="#333">• 构造器/Setter</text>
<text x="190" y="350" text-anchor="middle" font-size="11" fill="#666">显式指定依赖</text>
</g>
<g id="auto">
<rect x="310" y="240" width="180" height="120" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="265" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">自动装配 ⭐</text>
<text x="320" y="290" text-anchor="start" font-size="12" fill="#333">• @Autowired</text>
<text x="320" y="310" text-anchor="start" font-size="12" fill="#333">• @Resource</text>
<text x="320" y="330" text-anchor="start" font-size="12" fill="#333">• @Inject</text>
<text x="400" y="350" text-anchor="middle" font-size="11" fill="#2e7d32" font-weight="bold">推荐使用</text>
</g>
<g id="java-config">
<rect x="520" y="240" width="180" height="120" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="610" y="265" text-anchor="middle" font-size="15" font-weight="bold" fill="#c2185b">Java 配置</text>
<text x="530" y="290" text-anchor="start" font-size="12" fill="#333">• @Configuration</text>
<text x="530" y="310" text-anchor="start" font-size="12" fill="#333">• @Bean 依赖</text>
<text x="530" y="330" text-anchor="start" font-size="12" fill="#333">• 方法参数注入</text>
<text x="610" y="350" text-anchor="middle" font-size="11" fill="#666">灵活可控</text>
</g>
<line x1="400" y1="200" x2="190" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arr)"/>
<line x1="400" y1="200" x2="400" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arr)"/>
<line x1="400" y1="200" x2="610" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arr)"/>
<rect x="100" y="380" width="600" height="50" fill="#e1f5fe" stroke="#0277bd" stroke-width="1" rx="3"/>
<text x="400" y="410" text-anchor="middle" font-size="13" fill="#0277bd" font-weight="bold">现代开发首选自动装配（@Autowired）</text>
</svg>

**方式1：手动装配**

```java
// 1.1 XML 配置（传统方式）
<bean id="userService" class="com.example.UserService">
    <!-- 构造器注入 -->
    <constructor-arg ref="userDao"/>

    <!-- Setter 注入 -->
    <property name="userCache" ref="userCache"/>
</bean>

<bean id="userDao" class="com.example.UserDao"/>
<bean id="userCache" class="com.example.UserCache"/>

// 1.2 @Bean 方法装配
@Configuration
public class AppConfig {

    @Bean
    public UserDao userDao() {
        return new UserDao();
    }

    @Bean
    public UserService userService() {
        // 手动装配依赖
        UserService service = new UserService();
        service.setUserDao(userDao());
        return service;
    }
}

// 1.3 构造器装配
@Service
public class UserService {
    private final UserDao userDao;

    // 手动通过构造器装配
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }
}
```

**方式2：自动装配（推荐）**

```java
// 2.1 @Autowired（Spring 注解，最常用）
@Service
public class UserService {

    // 字段注入（不推荐）
    @Autowired
    private UserDao userDao;

    // 构造器注入（推荐）
    private final UserCache userCache;

    @Autowired  // 单个构造器可省略
    public UserService(UserCache userCache) {
        this.userCache = userCache;
    }

    // Setter 注入
    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}

// 2.2 @Resource（JSR-250 注解）
@Service
public class UserService {

    // 按名称装配
    @Resource(name = "userDao")
    private UserDao userDao;

    // 按类型装配
    @Resource
    private UserCache userCache;
}

// 2.3 @Inject（JSR-330 注解，需要额外依赖）
@Service
public class UserService {

    @Inject
    private UserDao userDao;

    @Inject
    public UserService(UserCache userCache) {
        this.userCache = userCache;
    }
}
```

**方式3：Java 配置装配**

```java
@Configuration
public class AppConfig {

    // 方式1：调用其他 @Bean 方法
    @Bean
    public UserService userService() {
        return new UserService(userDao());
    }

    @Bean
    public UserDao userDao() {
        return new UserDao();
    }

    // 方式2：方法参数自动注入（推荐）
    @Bean
    public UserService userService(UserDao userDao, UserCache userCache) {
        // Spring 会自动注入参数
        return new UserService(userDao, userCache);
    }

    @Bean
    public UserCache userCache() {
        return new UserCache();
    }
}
```

**装配方式对比：**

| 装配方式 | 优点 | 缺点 | 适用场景 | 推荐度 |
|---------|------|------|---------|-------|
| **XML 手动装配** | 无需修改代码 | 繁琐、易出错、维护困难 | 遗留项目 | ⭐ |
| **@Bean 手动装配** | 灵活、可控 | 需要手动编写 | 复杂依赖关系 | ⭐⭐⭐ |
| **@Autowired** | 自动化、简洁 | 依赖 Spring | 绝大多数场景 | ⭐⭐⭐⭐⭐ |
| **@Resource** | JSR-250 标准 | 功能相对简单 | 需要标准化 | ⭐⭐⭐⭐ |
| **@Inject** | JSR-330 标准 | 需要额外依赖 | 需要标准化 | ⭐⭐⭐ |
| **Java 配置参数注入** | 类型安全、清晰 | 仅适用于 @Bean | 第三方 Bean | ⭐⭐⭐⭐ |

**自动装配示意图：**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="600" height="300" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="350" y="85" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">自动装配流程</text>
<rect x="150" y="120" width="140" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="220" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">UserService</text>
<text x="220" y="165" text-anchor="middle" font-size="11" fill="#333">@Autowired</text>
<text x="220" y="183" text-anchor="middle" font-size="11" fill="#333">UserDao userDao</text>
<rect x="410" y="120" width="140" height="80" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="480" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">UserDao</text>
<text x="480" y="165" text-anchor="middle" font-size="11" fill="#333">@Repository</text>
<ellipse cx="350" cy="270" rx="100" ry="40" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="350" y="270" text-anchor="middle" font-size="13" font-weight="bold" fill="white">Spring 容器</text>
<text x="350" y="287" text-anchor="middle" font-size="11" fill="white">自动装配</text>
<path d="M 290 170 L 410 160" stroke="#f57c00" stroke-width="3" marker-end="url(#arr)" stroke-dasharray="8,4"/>
<text x="350" y="150" text-anchor="middle" font-size="12" fill="#f57c00" font-weight="bold">自动注入</text>
<path d="M 220 200 L 320 240" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
<path d="M 480 200 L 380 240" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
<text x="250" y="230" text-anchor="start" font-size="10" fill="#666">容器管理</text>
<text x="430" y="230" text-anchor="end" font-size="10" fill="#666">容器管理</text>
</svg>

**实际使用建议：**

```java
// ✅ 推荐：构造器注入 + @Autowired（或省略）
@Service
public class UserService {
    private final UserDao userDao;
    private final UserCache userCache;

    // Spring 4.3+ 单个构造器可省略 @Autowired
    public UserService(UserDao userDao, UserCache userCache) {
        this.userDao = userDao;
        this.userCache = userCache;
    }
}

// ✅ 可选：Setter 注入（可选依赖）
@Service
public class UserService {
    private UserDao userDao;
    private UserCache userCache;

    @Autowired(required = false)  // 可选依赖
    public void setUserCache(UserCache userCache) {
        this.userCache = userCache;
    }

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}

// ⚠️ 不推荐：字段注入（难以测试）
@Service
public class UserService {
    @Autowired
    private UserDao userDao;  // 难以单元测试
}

// ✅ 第三方 Bean：使用 Java 配置
@Configuration
public class ThirdPartyConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public MyService myService(RestTemplate restTemplate) {
        // 自动注入 restTemplate
        return new MyService(restTemplate);
    }
}
```

**关键要点：**
- Bean 装配是建立依赖关系的过程
- 现代开发首选自动装配（@Autowired）
- 构造器注入优于字段注入
- Java 配置适用于第三方 Bean

**记忆口诀：**
"**手动 XML 已过时，自动装配是主流；构造注入最安全，字段注入需谨慎**"

---

### 14. 什么是自动装配？有哪些方式？

**核心答案：**
自动装配是 Spring 自动查找并注入依赖 Bean 的机制。主要方式：byType（按类型）、byName（按名称）、constructor（构造器）、@Autowired 注解（最常用）。

**详细说明：**

**自动装配方式概览：**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="500" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">自动装配方式</text>
<rect x="150" y="120" width="500" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="155" text-anchor="middle" font-size="16" font-weight="bold" fill="#1976d2">自动装配（Autowiring）</text>
<g id="xml-autowire">
<rect x="100" y="200" width="250" height="150" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="225" y="225" text-anchor="middle" font-size="15" font-weight="bold" fill="#f57c00">XML 自动装配 ⭐</text>
<rect x="120" y="240" width="210" height="90" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="130" y="260" text-anchor="start" font-size="12" fill="#333">• no（默认，不自动装配）</text>
<text x="130" y="280" text-anchor="start" font-size="12" fill="#333">• byType（按类型匹配）</text>
<text x="130" y="300" text-anchor="start" font-size="12" fill="#333">• byName（按名称匹配）</text>
<text x="130" y="320" text-anchor="start" font-size="12" fill="#333">• constructor（构造器）</text>
</g>
<g id="annotation-autowire">
<rect x="400" y="200" width="300" height="150" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="550" y="225" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">注解自动装配 ⭐⭐⭐⭐⭐</text>
<rect x="420" y="240" width="260" height="90" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="430" y="260" text-anchor="start" font-size="12" fill="#333">• @Autowired（Spring）</text>
<text x="430" y="280" text-anchor="start" font-size="12" fill="#333">• @Resource（JSR-250）</text>
<text x="430" y="300" text-anchor="start" font-size="12" fill="#333">• @Inject（JSR-330）</text>
<text x="550" y="340" text-anchor="middle" font-size="11" fill="#2e7d32" font-weight="bold">推荐使用</text>
</g>
<rect x="100" y="370" width="600" height="150" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="400" y="395" text-anchor="middle" font-size="15" font-weight="bold" fill="#c2185b">@Autowired 装配策略</text>
<g id="autowired-modes">
<rect x="120" y="410" width="170" height="90" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="205" y="430" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976d2">按类型匹配</text>
<text x="130" y="450" text-anchor="start" font-size="11" fill="#333">1. 找到唯一类型 ✓</text>
<text x="130" y="468" text-anchor="start" font-size="11" fill="#333">2. 找到多个 → @Primary</text>
<text x="130" y="486" text-anchor="start" font-size="11" fill="#333">3. 仍多个 → @Qualifier</text>
<rect x="315" y="410" width="170" height="90" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="400" y="430" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">处理集合</text>
<text x="325" y="450" text-anchor="start" font-size="11" fill="#333">List<T> → 所有类型 T</text>
<text x="325" y="468" text-anchor="start" font-size="11" fill="#333">Map<String,T> → Bean</text>
<text x="325" y="486" text-anchor="start" font-size="11" fill="#333">名称作为 key</text>
<rect x="510" y="410" width="170" height="90" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="595" y="430" text-anchor="middle" font-size="13" font-weight="bold" fill="#f57c00">可选依赖</text>
<text x="520" y="450" text-anchor="start" font-size="11" fill="#333">required=false</text>
<text x="520" y="468" text-anchor="start" font-size="11" fill="#333">Optional<T></text>
<text x="520" y="486" text-anchor="start" font-size="11" fill="#333">@Nullable</text>
</g>
</svg>

**1. XML 自动装配（传统方式）**

```xml
<!-- 1.1 no（默认，不自动装配） -->
<bean id="userService" class="com.example.UserService">
    <property name="userDao" ref="userDao"/>
</bean>

<!-- 1.2 byType（按类型自动装配） -->
<bean id="userService" class="com.example.UserService" autowire="byType">
    <!-- Spring 自动查找 UserDao 类型的 Bean 并注入 -->
</bean>
<bean id="userDao" class="com.example.UserDao"/>

<!-- 1.3 byName（按名称自动装配） -->
<bean id="userService" class="com.example.UserService" autowire="byName">
    <!-- Spring 根据属性名 userDao 查找同名 Bean -->
</bean>
<bean id="userDao" class="com.example.UserDao"/>

<!-- 1.4 constructor（通过构造器自动装配） -->
<bean id="userService" class="com.example.UserService" autowire="constructor">
    <!-- Spring 根据构造器参数类型自动装配 -->
</bean>

<!-- 1.5 全局默认装配模式 -->
<beans default-autowire="byType">
    <!-- 所有 Bean 默认使用 byType 装配 -->
</beans>
```

**2. 注解自动装配（推荐）**

**2.1 @Autowired（Spring 注解）**

```java
@Service
public class UserService {

    // 方式1：字段注入
    @Autowired
    private UserDao userDao;

    // 方式2：构造器注入（推荐）
    private final UserCache userCache;

    @Autowired
    public UserService(UserCache userCache) {
        this.userCache = userCache;
    }

    // 方式3：Setter 注入
    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    // 方式4：普通方法注入
    @Autowired
    public void init(UserDao userDao, UserCache userCache) {
        this.userDao = userDao;
        this.userCache = userCache;
    }
}

// 处理多个候选 Bean
@Service
public class UserService {

    // 方式1：使用 @Primary（在 Bean 定义处）
    @Autowired
    private UserDao userDao;  // 注入标记 @Primary 的 Bean
}

@Repository
@Primary  // 优先选择此 Bean
public class MySqlUserDao implements UserDao {
}

@Repository
public class MongoUserDao implements UserDao {
}

// 方式2：使用 @Qualifier 指定名称
@Service
public class UserService {

    @Autowired
    @Qualifier("mySqlUserDao")
    private UserDao userDao;  // 明确指定使用 mySqlUserDao
}

// 方式3：注入集合（获取所有实现）
@Service
public class UserService {

    @Autowired
    private List<UserDao> userDaos;  // 注入所有 UserDao 实现

    @Autowired
    private Map<String, UserDao> userDaoMap;  // key 为 Bean 名称
}

// 方式4：可选依赖
@Service
public class UserService {

    // 方式4.1：required = false
    @Autowired(required = false)
    private UserCache userCache;  // 找不到不报错

    // 方式4.2：Optional
    @Autowired
    private Optional<UserCache> optionalCache;

    // 方式4.3：@Nullable
    @Autowired
    public void setUserCache(@Nullable UserCache userCache) {
        this.userCache = userCache;
    }
}
```

**2.2 @Resource（JSR-250 标准）**

```java
@Service
public class UserService {

    // 按名称装配
    @Resource(name = "mySqlUserDao")
    private UserDao userDao;

    // 按类型装配（未指定 name）
    @Resource
    private UserCache userCache;
}

// @Resource 装配规则：
// 1. 如果指定 name，按名称查找
// 2. 如果未指定 name，先按字段名查找
// 3. 找不到再按类型查找
// 4. 找到多个报错
```

**2.3 @Inject（JSR-330 标准）**

```java
// 需要添加依赖
// <dependency>
//     <groupId>javax.inject</groupId>
//     <artifactId>javax.inject</artifactId>
//     <version>1</version>
// </dependency>

@Service
public class UserService {

    @Inject
    private UserDao userDao;

    @Inject
    @Named("mySqlUserDao")  // 等同于 @Qualifier
    private UserDao specificDao;
}
```

**@Autowired vs @Resource vs @Inject 对比：**

| 特性 | @Autowired | @Resource | @Inject |
|------|-----------|-----------|---------|
| **来源** | Spring 框架 | JSR-250（Java EE） | JSR-330（Java） |
| **装配方式** | 按类型 | 按名称 → 按类型 | 按类型 |
| **指定名称** | @Qualifier | name 属性 | @Named |
| **可选依赖** | required=false | - | - |
| **作用位置** | 字段、方法、构造器、参数 | 字段、Setter | 字段、方法、构造器 |
| **依赖** | Spring | Java EE | 需额外依赖 |
| **推荐度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

**自动装配流程图：**

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="a" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="50" width="600" height="350" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="350" y="85" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">@Autowired 装配流程</text>
<rect x="250" y="110" width="200" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="350" y="135" text-anchor="middle" font-size="13" fill="#1976d2">发现 @Autowired</text>
<rect x="250" y="170" width="200" height="40" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="350" y="195" text-anchor="middle" font-size="13" fill="#f57c00">按类型查找 Bean</text>
<rect x="100" y="240" width="150" height="50" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="175" y="260" text-anchor="middle" font-size="12" fill="#2e7d32">找到唯一</text>
<text x="175" y="278" text-anchor="middle" font-size="11" fill="#2e7d32">✓ 直接注入</text>
<rect x="275" y="240" width="150" height="50" fill="#fff9c4" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="350" y="260" text-anchor="middle" font-size="12" fill="#f57c00">找到多个</text>
<text x="350" y="278" text-anchor="middle" font-size="11" fill="#f57c00">→ @Primary</text>
<rect x="450" y="240" width="150" height="50" fill="#ffcdd2" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="525" y="260" text-anchor="middle" font-size="12" fill="#c62828">找不到</text>
<text x="525" y="278" text-anchor="middle" font-size="11" fill="#c62828">✗ 报错</text>
<rect x="275" y="310" width="150" height="50" fill="#ffe0b2" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="350" y="330" text-anchor="middle" font-size="12" fill="#f57c00">仍有多个</text>
<text x="350" y="348" text-anchor="middle" font-size="11" fill="#f57c00">→ @Qualifier</text>
<line x1="350" y1="150" x2="350" y2="170" stroke="#666" stroke-width="2" marker-end="url(#a)"/>
<line x1="350" y1="210" x2="175" y2="240" stroke="#666" stroke-width="2" marker-end="url(#a)"/>
<line x1="350" y1="210" x2="350" y2="240" stroke="#666" stroke-width="2" marker-end="url(#a)"/>
<line x1="350" y1="210" x2="525" y2="240" stroke="#666" stroke-width="2" marker-end="url(#a)"/>
<line x1="350" y1="290" x2="350" y2="310" stroke="#666" stroke-width="2" marker-end="url(#a)"/>
<text x="120" y="225" text-anchor="start" font-size="10" fill="#666">1个</text>
<text x="350" y="225" text-anchor="middle" font-size="10" fill="#666">&gt;1个</text>
<text x="560" y="225" text-anchor="end" font-size="10" fill="#666">0个</text>
</svg>

**最佳实践：**

```java
// ✅ 推荐：构造器注入 + @Autowired
@Service
public class UserService {
    private final UserDao userDao;

    @Autowired  // 单构造器可省略
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }
}

// ✅ 处理多个实现：@Primary
@Repository
@Primary
public class MySqlUserDao implements UserDao {
    // 优先注入这个
}

// ✅ 指定具体实现：@Qualifier
@Service
public class UserService {
    @Autowired
    @Qualifier("mongoUserDao")
    private UserDao userDao;
}

// ✅ 可选依赖
@Service
public class UserService {
    @Autowired(required = false)
    private UserCache userCache;  // 可以为 null
}

// ✅ 注入所有实现
@Service
public class UserService {
    @Autowired
    private List<PaymentService> paymentServices;

    public void processPayment(Order order) {
        for (PaymentService service : paymentServices) {
            if (service.support(order)) {
                service.pay(order);
                break;
            }
        }
    }
}
```

**关键要点：**
- 自动装配是 Spring 自动注入依赖的机制
- @Autowired 按类型装配，@Resource 按名称装配
- 使用 @Primary 或 @Qualifier 处理多个候选 Bean
- 推荐构造器注入 + @Autowired

**记忆口诀：**
"**类型匹配 Autowired，名称匹配 Resource；多个用 Primary，指定用 Qualifier**"

---

### 15. @Autowired 和 @Resource 的区别是什么？

**核心答案：**
@Autowired 是 Spring 注解，按类型装配；@Resource 是 JSR-250 标准注解，按名称装配。@Autowired 功能更强大，@Resource 更符合 Java 规范。

**详细说明：**

**核心区别对比图：**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="450" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">@Autowired vs @Resource</text>
<g id="autowired">
<rect x="100" y="120" width="280" height="330" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="240" y="150" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">@Autowired</text>
<rect x="120" y="170" width="240" height="260" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="240" y="195" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976d2">来源</text>
<text x="240" y="213" text-anchor="middle" font-size="12" fill="#333">Spring 框架</text>
<text x="240" y="240" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976d2">装配方式</text>
<text x="240" y="258" text-anchor="middle" font-size="12" fill="#333">按类型（byType）</text>
<text x="240" y="285" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976d2">指定名称</text>
<text x="240" y="303" text-anchor="middle" font-size="12" fill="#333">@Qualifier("name")</text>
<text x="240" y="330" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976d2">可选依赖</text>
<text x="240" y="348" text-anchor="middle" font-size="12" fill="#333">required=false</text>
<text x="240" y="375" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976d2">作用位置</text>
<text x="240" y="393" text-anchor="middle" font-size="11" fill="#333">字段/构造器/方法/参数</text>
<text x="240" y="420" text-anchor="middle" font-size="12" fill="#2e7d32" font-weight="bold">推荐使用 ⭐⭐⭐⭐⭐</text>
</g>
<g id="resource">
<rect x="420" y="120" width="280" height="330" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="560" y="150" text-anchor="middle" font-size="18" font-weight="bold" fill="#2e7d32">@Resource</text>
<rect x="440" y="170" width="240" height="260" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="560" y="195" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">来源</text>
<text x="560" y="213" text-anchor="middle" font-size="12" fill="#333">JSR-250 (Java EE)</text>
<text x="560" y="240" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">装配方式</text>
<text x="560" y="258" text-anchor="middle" font-size="12" fill="#333">按名称（byName）</text>
<text x="560" y="273" text-anchor="middle" font-size="11" fill="#666">找不到按类型</text>
<text x="560" y="300" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">指定名称</text>
<text x="560" y="318" text-anchor="middle" font-size="12" fill="#333">name 属性</text>
<text x="560" y="345" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">可选依赖</text>
<text x="560" y="363" text-anchor="middle" font-size="12" fill="#333">不支持</text>
<text x="560" y="390" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">作用位置</text>
<text x="560" y="408" text-anchor="middle" font-size="11" fill="#333">字段/Setter 方法</text>
<text x="560" y="435" text-anchor="middle" font-size="12" fill="#1976d2" font-weight="bold">符合 Java 规范 ⭐⭐⭐⭐</text>
</g>
</svg>

**详细对比：**

| 对比维度 | @Autowired | @Resource |
|---------|-----------|-----------|
| **来源** | Spring 框架 | JSR-250（Java EE 标准）|
| **默认装配方式** | 按类型（byType）| 按名称（byName），找不到按类型 |
| **指定名称** | `@Qualifier("name")` | `@Resource(name="name")` |
| **可选依赖** | `required=false` 或 `Optional<T>` | 不支持 |
| **作用位置** | 字段、构造器、方法、参数 | 字段、Setter 方法 |
| **多个匹配处理** | @Primary + @Qualifier | 直接报错 |
| **注入集合** | 支持 List、Map | 不支持 |
| **是否依赖 Spring** | 是 | 否（Java 标准）|
| **推荐度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**装配流程对比：**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="ar" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="50" width="700" height="400" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">装配流程对比</text>
<g id="autowired-flow">
<rect x="100" y="110" width="260" height="300" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="230" y="135" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976d2">@Autowired 流程</text>
<rect x="120" y="150" width="220" height="40" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="230" y="175" text-anchor="middle" font-size="12" fill="#333">1. 按类型查找</text>
<rect x="120" y="200" width="220" height="40" fill="#fff" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="230" y="225" text-anchor="middle" font-size="12" fill="#333">2. 找到唯一 → 注入</text>
<rect x="120" y="250" width="220" height="40" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="230" y="275" text-anchor="middle" font-size="12" fill="#333">3. 多个 → @Primary</text>
<rect x="120" y="300" width="220" height="40" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="230" y="325" text-anchor="middle" font-size="12" fill="#333">4. 仍多个 → @Qualifier</text>
<rect x="120" y="350" width="220" height="40" fill="#fff" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="230" y="375" text-anchor="middle" font-size="12" fill="#333">5. 找不到 → 报错/null</text>
</g>
<g id="resource-flow">
<rect x="440" y="110" width="260" height="300" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="570" y="135" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">@Resource 流程</text>
<rect x="460" y="150" width="220" height="40" fill="#fff" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="570" y="175" text-anchor="middle" font-size="12" fill="#333">1. 指定 name？按名称</text>
<rect x="460" y="200" width="220" height="40" fill="#fff" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="570" y="225" text-anchor="middle" font-size="12" fill="#333">2. 未指定 → 按字段名</text>
<rect x="460" y="250" width="220" height="40" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="570" y="275" text-anchor="middle" font-size="12" fill="#333">3. 找不到 → 按类型</text>
<rect x="460" y="300" width="220" height="40" fill="#fff" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="570" y="325" text-anchor="middle" font-size="12" fill="#333">4. 找到唯一 → 注入</text>
<rect x="460" y="350" width="220" height="40" fill="#fff" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="570" y="375" text-anchor="middle" font-size="12" fill="#333">5. 多个/不存在 → 报错</text>
</g>
</svg>

**代码示例对比：**

```java
// 示例1：按类型 vs 按名称
public interface UserDao {
}

@Repository("mySqlUserDao")
public class MySqlUserDao implements UserDao {
}

@Repository("mongoUserDao")
public class MongoUserDao implements UserDao {
}

// @Autowired：按类型（找到多个会报错）
@Service
public class UserService1 {
    @Autowired
    private UserDao userDao;  // ❌ 报错：找到 2 个 UserDao 类型
}

// @Autowired + @Qualifier：指定名称
@Service
public class UserService2 {
    @Autowired
    @Qualifier("mySqlUserDao")
    private UserDao userDao;  // ✅ 注入 MySqlUserDao
}

// @Resource：按名称
@Service
public class UserService3 {
    @Resource(name = "mySqlUserDao")
    private UserDao userDao;  // ✅ 按名称注入 MySqlUserDao
}

// @Resource：按字段名
@Service
public class UserService4 {
    @Resource
    private UserDao mySqlUserDao;  // ✅ 字段名匹配 Bean 名称
}

// 示例2：可选依赖
@Service
public class UserService {

    // @Autowired：支持可选
    @Autowired(required = false)
    private UserCache userCache1;  // ✅ 找不到设为 null

    @Autowired
    private Optional<UserCache> userCache2;  // ✅ 用 Optional 包装

    // @Resource：不支持可选
    @Resource
    private UserCache userCache3;  // ❌ 找不到直接报错
}

// 示例3：构造器注入
@Service
public class UserService {

    private final UserDao userDao;

    // @Autowired：支持构造器
    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    // @Resource：不支持构造器
    // 无法在构造器上使用 @Resource
}

// 示例4：注入集合
@Service
public class UserService {

    // @Autowired：支持集合
    @Autowired
    private List<UserDao> userDaos;  // ✅ 注入所有 UserDao

    @Autowired
    private Map<String, UserDao> userDaoMap;  // ✅ key 为 Bean 名称

    // @Resource：不支持集合
    @Resource
    private List<UserDao> userDaos2;  // ❌ 不支持
}

// 示例5：多个匹配的处理
@Repository
@Primary  // 优先选择
public class MySqlUserDao implements UserDao {
}

@Repository
public class MongoUserDao implements UserDao {
}

@Service
public class UserService {

    // @Autowired + @Primary
    @Autowired
    private UserDao userDao;  // ✅ 注入 MySqlUserDao（@Primary）

    // @Resource：不支持 @Primary
    @Resource
    private UserDao userDao2;  // ❌ 报错：找到多个
}
```

**使用建议：**

```java
// ✅ 推荐：@Autowired + 构造器注入
@Service
public class UserService {
    private final UserDao userDao;

    @Autowired  // 可省略
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }
}

// ✅ 多个实现：@Primary
@Repository
@Primary
public class MySqlUserDao implements UserDao {
}

// ✅ 指定实现：@Qualifier
@Service
public class UserService {
    @Autowired
    @Qualifier("mongoUserDao")
    private UserDao userDao;
}

// ⚠️ @Resource：仅在需要 Java EE 标准时使用
@Service
public class UserService {
    @Resource(name = "mySqlUserDao")
    private UserDao userDao;
}

// ❌ 不推荐：混用
@Service
public class UserService {
    @Autowired
    private UserDao userDao1;

    @Resource
    private UserCache userCache;  // 不要混用
}
```

**选择建议：**

1. **优先使用 @Autowired**
   - 功能更强大（支持构造器、集合、Optional）
   - Spring 项目的标准做法
   - 更灵活的依赖处理

2. **使用 @Resource 的场景**
   - 需要符合 Java EE 规范
   - 优先按名称装配的场景
   - 跨框架移植

3. **不要混用**
   - 保持代码风格一致
   - 避免团队困惑

**关键要点：**
- @Autowired 按类型装配，@Resource 按名称装配
- @Autowired 功能更强大，支持构造器、集合、可选依赖
- @Resource 是 Java 标准，但功能相对简单
- 现代 Spring 开发推荐使用 @Autowired

**记忆口诀：**
"**Autowired 按类型，Resource 按名称；Spring 用前者，标准用后者**"

---

### 16. @Component、@Service、@Repository、@Controller 的区别是什么？

**核心答案：**
这四个注解都用于将类注册为 Spring Bean，本质上功能相同，区别在于语义和使用场景。@Component 是通用注解，其他三个是特定层的派生注解，分别用于业务层、数据层、表现层。

**详细说明：**

**注解层次结构：**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow-marker" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="50" width="700" height="450" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">组件注解层次结构</text>
<rect x="300" y="120" width="200" height="60" fill="#1976d2" stroke="#0d47a1" stroke-width="3" rx="5"/>
<text x="400" y="145" text-anchor="middle" font-size="18" font-weight="bold" fill="white">@Component</text>
<text x="400" y="165" text-anchor="middle" font-size="12" fill="white">通用组件注解（基类）</text>
<g id="service">
<rect x="100" y="230" width="180" height="120" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="190" y="260" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">@Service</text>
<text x="190" y="285" text-anchor="middle" font-size="13" fill="#333">业务逻辑层</text>
<text x="190" y="305" text-anchor="middle" font-size="11" fill="#666">Service Layer</text>
<text x="190" y="325" text-anchor="middle" font-size="10" fill="#333">• 业务处理</text>
<text x="190" y="340" text-anchor="middle" font-size="10" fill="#333">• 事务管理</text>
</g>
<g id="repository">
<rect x="310" y="230" width="180" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="260" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">@Repository</text>
<text x="400" y="285" text-anchor="middle" font-size="13" fill="#333">数据访问层</text>
<text x="400" y="305" text-anchor="middle" font-size="11" fill="#666">DAO Layer</text>
<text x="400" y="325" text-anchor="middle" font-size="10" fill="#333">• 数据库操作</text>
<text x="400" y="340" text-anchor="middle" font-size="10" fill="#333">• 异常转换</text>
</g>
<g id="controller">
<rect x="520" y="230" width="180" height="120" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="610" y="260" text-anchor="middle" font-size="16" font-weight="bold" fill="#c2185b">@Controller</text>
<text x="610" y="285" text-anchor="middle" font-size="13" fill="#333">表现层</text>
<text x="610" y="305" text-anchor="middle" font-size="11" fill="#666">Web Layer</text>
<text x="610" y="325" text-anchor="middle" font-size="10" fill="#333">• 请求处理</text>
<text x="610" y="340" text-anchor="middle" font-size="10" fill="#333">• 视图返回</text>
</g>
<line x1="400" y1="180" x2="190" y2="230" stroke="#666" stroke-width="2" marker-end="url(#arrow-marker)" stroke-dasharray="5,5"/>
<line x1="400" y1="180" x2="400" y2="230" stroke="#666" stroke-width="2" marker-end="url(#arrow-marker)" stroke-dasharray="5,5"/>
<line x1="400" y1="180" x2="610" y2="230" stroke="#666" stroke-width="2" marker-end="url(#arrow-marker)" stroke-dasharray="5,5"/>
<text x="250" y="210" text-anchor="middle" font-size="11" fill="#666">继承</text>
<text x="400" y="210" text-anchor="middle" font-size="11" fill="#666">继承</text>
<text x="550" y="210" text-anchor="middle" font-size="11" fill="#666">继承</text>
<rect x="100" y="380" width="600" height="100" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/>
<text x="400" y="405" text-anchor="middle" font-size="14" font-weight="bold" fill="#0277bd">三层架构对应关系</text>
<text x="400" y="430" text-anchor="middle" font-size="12" fill="#333">Controller（表现层）→ Service（业务层）→ Repository（数据层）</text>
<text x="400" y="450" text-anchor="middle" font-size="11" fill="#666">请求处理 → 业务逻辑 → 数据库访问</text>
<text x="400" y="468" text-anchor="middle" font-size="10" fill="#c62828">💡 使用特定注解提高代码可读性和语义清晰度</text>
</svg>

**详细对比：**

| 注解 | 层次 | 语义 | 特殊功能 | 使用场景 |
|------|-----|------|---------|---------|
| **@Component** | 通用 | 通用组件 | 无 | 不属于明确层次的组件 |
| **@Service** | 业务层 | 业务逻辑 | 标识业务层，便于 AOP | Service 类 |
| **@Repository** | 数据层 | 数据访问 | **异常转换**（JDBC → Spring） | DAO/Mapper 类 |
| **@Controller** | 表现层 | 请求处理 | 配合 @RequestMapping | MVC 控制器 |

**代码示例：**

```java
// 1. @Component（通用组件）
@Component
public class EmailSender {
    public void sendEmail(String to, String subject, String content) {
        // 发送邮件逻辑
    }
}

@Component
public class RedisCache {
    public void set(String key, Object value) {
        // Redis 缓存操作
    }
}

// 2. @Service（业务逻辑层）
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailSender emailSender;

    @Transactional
    public void registerUser(User user) {
        // 业务逻辑：注册用户
        userRepository.save(user);
        emailSender.sendEmail(user.getEmail(), "欢迎注册", "注册成功");
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("用户不存在"));
    }
}

// 3. @Repository（数据访问层）
@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public User findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        try {
            return jdbcTemplate.queryForObject(sql,
                new BeanPropertyRowMapper<>(User.class), id);
        } catch (EmptyResultDataAccessException e) {
            // Spring 会自动将 JDBC 异常转换为 DataAccessException
            return null;
        }
    }

    public void save(User user) {
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        jdbcTemplate.update(sql, user.getName(), user.getEmail());
    }
}

// 4. @Controller（表现层）
@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    @ResponseBody
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    @ResponseBody
    public String createUser(@RequestBody User user) {
        userService.registerUser(user);
        return "success";
    }

    // 返回视图
    @GetMapping("/list")
    public String listUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "user-list";  // 返回视图名称
    }
}

// 5. @RestController（@Controller + @ResponseBody）
@RestController  // 等同于 @Controller + @ResponseBody
@RequestMapping("/api/users")
public class UserRestController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);  // 自动转 JSON
    }
}
```

**@Repository 的特殊功能：异常转换**

```java
// @Repository 会自动将数据库异常转换为 Spring 的 DataAccessException

@Repository
public class UserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public User findById(Long id) {
        try {
            // JDBC 原始异常：SQLException
            return jdbcTemplate.queryForObject(
                "SELECT * FROM users WHERE id = ?",
                new BeanPropertyRowMapper<>(User.class),
                id
            );
        } catch (EmptyResultDataAccessException e) {
            // Spring 自动转换的异常
            // JDBC SQLException → Spring DataAccessException
            return null;
        }
    }
}

// 异常转换的好处：
// 1. 统一异常体系（不同数据库的异常统一为 Spring 异常）
// 2. 降低与具体数据库技术的耦合
// 3. 便于异常处理和 AOP 切面
```

**实际应用示例：**

<svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="600" height="400" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="350" y="85" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">典型三层架构</text>
<rect x="200" y="120" width="300" height="60" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="350" y="145" text-anchor="middle" font-size="15" font-weight="bold" fill="#c2185b">@Controller</text>
<text x="350" y="165" text-anchor="middle" font-size="12" fill="#333">UserController</text>
<rect x="200" y="210" width="300" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="350" y="235" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">@Service</text>
<text x="350" y="255" text-anchor="middle" font-size="12" fill="#333">UserService</text>
<rect x="200" y="300" width="300" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="350" y="325" text-anchor="middle" font-size="15" font-weight="bold" fill="#f57c00">@Repository</text>
<text x="350" y="345" text-anchor="middle" font-size="12" fill="#333">UserRepository</text>
<rect x="200" y="390" width="300" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="350" y="415" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">Database</text>
<line x1="350" y1="180" x2="350" y2="210" stroke="#666" stroke-width="2" marker-end="url(#arrow-marker)"/>
<line x1="350" y1="270" x2="350" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrow-marker)"/>
<line x1="350" y1="360" x2="350" y2="390" stroke="#666" stroke-width="2" marker-end="url(#arrow-marker)"/>
<text x="380" y="195" text-anchor="start" font-size="11" fill="#666">调用</text>
<text x="380" y="285" text-anchor="start" font-size="11" fill="#666">调用</text>
<text x="380" y="375" text-anchor="start" font-size="11" fill="#666">访问</text>
<g transform="translate(80, 150)">
<text x="0" y="0" text-anchor="end" font-size="11" fill="#c2185b">HTTP 请求</text>
<text x="0" y="90" text-anchor="end" font-size="11" fill="#2e7d32">业务逻辑</text>
<text x="0" y="180" text-anchor="end" font-size="11" fill="#f57c00">数据操作</text>
</g>
</svg>

**本质相同示例：**

```java
// 这四个注解在功能上完全等价
@Component
public class MyComponent1 { }

@Service
public class MyComponent2 { }

@Repository
public class MyComponent3 { }

@Controller
public class MyComponent4 { }

// Spring 都会将它们注册为 Bean
// 区别仅在于语义和某些特殊处理（如 @Repository 的异常转换）

// 源码验证（简化）：
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component  // @Service 本质上是 @Component
public @interface Service {
    @AliasFor(annotation = Component.class)
    String value() default "";
}

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component  // @Repository 本质上是 @Component
public @interface Repository {
    @AliasFor(annotation = Component.class)
    String value() default "";
}

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component  // @Controller 本质上是 @Component
public @interface Controller {
    @AliasFor(annotation = Component.class)
    String value() default "";
}
```

**使用建议：**

```java
// ✅ 推荐：根据层次使用合适的注解（提高可读性）

// 表现层
@Controller  // 或 @RestController
public class UserController {
    // 处理 HTTP 请求
}

// 业务层
@Service
public class UserService {
    // 业务逻辑处理
}

// 数据层
@Repository
public class UserRepository {
    // 数据库访问
}

// 工具类、缓存等通用组件
@Component
public class RedisCache {
    // 通用组件
}

// ❌ 不推荐：混用（虽然功能相同，但降低可读性）
@Component  // 不清晰
public class UserService {  // 应该用 @Service
    // ...
}

@Service  // 语义不符
public class UserRepository {  // 应该用 @Repository
    // ...
}
```

**Spring Boot 中的额外注解：**

```java
// @RestController = @Controller + @ResponseBody
@RestController
@RequestMapping("/api")
public class ApiController {
    // 所有方法默认返回 JSON
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
}

// @ControllerAdvice：全局异常处理
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFound(NotFoundException e) {
        return ResponseEntity.status(404).body(e.getMessage());
    }
}

// @Configuration：配置类（也是 @Component 的派生）
@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

**关键要点：**
- 四个注解本质功能相同，都是注册 Bean
- 区别在于语义和使用场景（提高代码可读性）
- @Repository 有额外功能：数据库异常转换
- 推荐按层次使用：Controller → Service → Repository
- @Component 用于通用组件

**记忆口诀：**
"**Component 是基础，三层各有注解；Controller 接请求，Service 处业务，Repository 访数据**"

---

### 17. 什么是 Bean 的循环依赖？Spring 如何解决？

**核心答案：**
循环依赖是指两个或多个 Bean 互相依赖形成闭环。Spring 通过三级缓存解决单例 Bean 的循环依赖：提前暴露未完全初始化的 Bean 引用，允许其他 Bean 注入。构造器循环依赖无法解决。

**详细说明：**

**循环依赖类型：**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arr-marker" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="50" width="700" height="450" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">循环依赖类型</text>
<g id="field-circular">
<rect x="100" y="120" width="280" height="140" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="240" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">字段/Setter 循环依赖</text>
<ellipse cx="180" cy="200" rx="50" ry="30" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="180" y="205" text-anchor="middle" font-size="13" fill="white">Bean A</text>
<ellipse cx="300" cy="200" rx="50" ry="30" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="300" y="205" text-anchor="middle" font-size="13" fill="white">Bean B</text>
<path d="M 230 195 L 250 195" stroke="#2e7d32" stroke-width="2" marker-end="url(#arr-marker)"/>
<path d="M 250 205 L 230 205" stroke="#2e7d32" stroke-width="2" marker-end="url(#arr-marker)"/>
<text x="240" y="235" text-anchor="middle" font-size="12" fill="#2e7d32" font-weight="bold">✅ 可以解决</text>
</g>
<g id="constructor-circular">
<rect x="420" y="120" width="280" height="140" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="560" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#c62828">构造器循环依赖</text>
<ellipse cx="500" cy="200" rx="50" ry="30" fill="#e57373" stroke="#c62828" stroke-width="2"/>
<text x="500" y="205" text-anchor="middle" font-size="13" fill="white">Bean A</text>
<ellipse cx="620" cy="200" rx="50" ry="30" fill="#e57373" stroke="#c62828" stroke-width="2"/>
<text x="620" y="205" text-anchor="middle" font-size="13" fill="white">Bean B</text>
<path d="M 550 195 L 570 195" stroke="#c62828" stroke-width="2" marker-end="url(#arr-marker)"/>
<path d="M 570 205 L 550 205" stroke="#c62828" stroke-width="2" marker-end="url(#arr-marker)"/>
<text x="560" y="235" text-anchor="middle" font-size="12" fill="#c62828" font-weight="bold">❌ 无法解决</text>
</g>
<g id="prototype-circular">
<rect x="100" y="290" width="280" height="140" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="240" y="315" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">prototype 循环依赖</text>
<ellipse cx="180" cy="370" rx="50" ry="30" fill="#ffb74d" stroke="#f57c00" stroke-width="2"/>
<text x="180" y="375" text-anchor="middle" font-size="13" fill="white">Bean A</text>
<ellipse cx="300" cy="370" rx="50" ry="30" fill="#ffb74d" stroke="#f57c00" stroke-width="2"/>
<text x="300" y="375" text-anchor="middle" font-size="13" fill="white">Bean B</text>
<path d="M 230 365 L 250 365" stroke="#f57c00" stroke-width="2" marker-end="url(#arr-marker)"/>
<path d="M 250 375 L 230 375" stroke="#f57c00" stroke-width="2" marker-end="url(#arr-marker)"/>
<text x="240" y="405" text-anchor="middle" font-size="12" fill="#f57c00" font-weight="bold">❌ 无法解决</text>
</g>
<rect x="420" y="290" width="280" height="140" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/>
<text x="560" y="320" text-anchor="middle" font-size="14" font-weight="bold" fill="#0277bd">解决方案</text>
<text x="430" y="345" text-anchor="start" font-size="12" fill="#333">✅ 单例 + 字段/Setter</text>
<text x="430" y="365" text-anchor="start" font-size="12" fill="#333">✅ @Lazy 延迟加载</text>
<text x="430" y="385" text-anchor="start" font-size="12" fill="#333">✅ 重构代码（最佳）</text>
<text x="430" y="405" text-anchor="start" font-size="12" fill="#333">❌ 构造器依赖</text>
<text x="430" y="420" text-anchor="start" font-size="12" fill="#333">❌ prototype 作用域</text>
</svg>

**循环依赖示例：**

```java
// 1. 字段循环依赖（✅ 可以解决）
@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;  // 依赖 ServiceB
}

@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA;  // 依赖 ServiceA
}

// 2. Setter 循环依赖（✅ 可以解决）
@Service
public class ServiceA {
    private ServiceB serviceB;

    @Autowired
    public void setServiceB(ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}

@Service
public class ServiceB {
    private ServiceA serviceA;

    @Autowired
    public void setServiceA(ServiceA serviceA) {
        this.serviceA = serviceA;
    }
}

// 3. 构造器循环依赖（❌ 无法解决）
@Service
public class ServiceA {
    private final ServiceB serviceB;

    @Autowired
    public ServiceA(ServiceB serviceB) {  // 构造器依赖
        this.serviceB = serviceB;
    }
}

@Service
public class ServiceB {
    private final ServiceA serviceA;

    @Autowired
    public ServiceB(ServiceA serviceA) {  // 构造器依赖
        this.serviceA = serviceA;
    }
}
// 启动报错：BeanCurrentlyInCreationException

// 4. prototype 循环依赖（❌ 无法解决）
@Service
@Scope("prototype")
public class ServiceA {
    @Autowired
    private ServiceB serviceB;
}

@Service
@Scope("prototype")
public class ServiceB {
    @Autowired
    private ServiceA serviceA;
}
// 启动报错或运行时错误
```

**Spring 如何解决循环依赖？**

**三级缓存机制：**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="500" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">Spring 三级缓存</text>
<rect x="150" y="120" width="500" height="100" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">一级缓存：singletonObjects</text>
<text x="400" y="168" text-anchor="middle" font-size="13" fill="#333">存放完全初始化好的单例 Bean</text>
<text x="400" y="190" text-anchor="middle" font-size="12" fill="#666">Map&lt;String, Object&gt; - 成品对象</text>
<text x="660" y="170" text-anchor="start" font-size="14" fill="#2e7d32" font-weight="bold">✓</text>
<rect x="150" y="240" width="500" height="100" fill="#fff9c4" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="265" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">二级缓存：earlySingletonObjects</text>
<text x="400" y="288" text-anchor="middle" font-size="13" fill="#333">存放提前暴露的单例 Bean（未完全初始化）</text>
<text x="400" y="310" text-anchor="middle" font-size="12" fill="#666">Map&lt;String, Object&gt; - 半成品对象</text>
<text x="660" y="290" text-anchor="start" font-size="14" fill="#f57c00" font-weight="bold">◐</text>
<rect x="150" y="360" width="500" height="100" fill="#ffcdd2" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="400" y="385" text-anchor="middle" font-size="16" font-weight="bold" fill="#c62828">三级缓存：singletonFactories</text>
<text x="400" y="408" text-anchor="middle" font-size="13" fill="#333">存放单例 Bean 的工厂对象</text>
<text x="400" y="430" text-anchor="middle" font-size="12" fill="#666">Map&lt;String, ObjectFactory&gt; - 对象工厂</text>
<text x="660" y="410" text-anchor="start" font-size="14" fill="#c62828" font-weight="bold">↻</text>
<rect x="100" y="480" width="600" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="400" y="510" text-anchor="middle" font-size="13" fill="#1976d2" font-weight="bold">核心思想：提前暴露未完全初始化的对象引用，打破循环</text>
</svg>

**解决过程图解：**

```java
// 假设：A 依赖 B，B 依赖 A

// 创建流程：
// 1. 创建 A 实例（实例化，未完成属性注入）
//    - 将 A 的工厂放入三级缓存
// 2. 填充 A 的属性，发现需要 B
// 3. 创建 B 实例（实例化，未完成属性注入）
//    - 将 B 的工厂放入三级缓存
// 4. 填充 B 的属性，发现需要 A
//    - 从三级缓存获取 A 的工厂，创建 A 的早期引用
//    - 将 A 的早期引用放入二级缓存
//    - B 成功注入 A 的早期引用
// 5. B 完成初始化，放入一级缓存
// 6. A 成功注入 B
// 7. A 完成初始化，放入一级缓存

// 源码简化示例（DefaultSingletonBeanRegistry）
public class DefaultSingletonBeanRegistry {

    // 一级缓存：完整对象
    private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>();

    // 二级缓存：早期对象（半成品）
    private final Map<String, Object> earlySingletonObjects = new HashMap<>();

    // 三级缓存：对象工厂
    private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<>();

    protected Object getSingleton(String beanName) {
        // 1. 从一级缓存获取
        Object singletonObject = this.singletonObjects.get(beanName);
        if (singletonObject == null) {
            // 2. 从二级缓存获取
            singletonObject = this.earlySingletonObjects.get(beanName);
            if (singletonObject == null) {
                // 3. 从三级缓存获取工厂，创建对象
                ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);
                if (singletonFactory != null) {
                    singletonObject = singletonFactory.getObject();
                    // 放入二级缓存
                    this.earlySingletonObjects.put(beanName, singletonObject);
                    // 移除三级缓存
                    this.singletonFactories.remove(beanName);
                }
            }
        }
        return singletonObject;
    }
}
```

**解决方案：**

```java
// 方案1：使用字段/Setter 注入（推荐，Spring 自动处理）
@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;  // ✅ Spring 通过三级缓存解决
}

@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA;
}

// 方案2：使用 @Lazy 延迟加载
@Service
public class ServiceA {
    private final ServiceB serviceB;

    @Autowired
    public ServiceA(@Lazy ServiceB serviceB) {  // ✅ 延迟注入 B
        this.serviceB = serviceB;
    }
}

@Service
public class ServiceB {
    private final ServiceA serviceA;

    @Autowired
    public ServiceB(ServiceA serviceA) {
        this.serviceA = serviceA;
    }
}

// 方案3：使用 @PostConstruct 延后注入
@Service
public class ServiceA {
    private ServiceB serviceB;

    @Autowired
    private ApplicationContext context;

    @PostConstruct
    public void init() {
        this.serviceB = context.getBean(ServiceB.class);
    }
}

// 方案4：重构代码（最佳方案）
// 循环依赖通常说明设计有问题，应该重构

// 方式1：提取公共依赖
@Service
public class ServiceA {
    @Autowired
    private CommonService commonService;
}

@Service
public class ServiceB {
    @Autowired
    private CommonService commonService;
}

@Service
public class CommonService {
    // A 和 B 的共同逻辑
}

// 方式2：使用事件机制解耦
@Service
public class ServiceA {
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public void doSomething() {
        // 发布事件而不是直接调用 ServiceB
        eventPublisher.publishEvent(new CustomEvent());
    }
}

@Service
public class ServiceB {
    @EventListener
    public void handleEvent(CustomEvent event) {
        // 处理事件
    }
}
```

**为什么构造器循环依赖无法解决？**

```java
// 构造器依赖的问题：
// 创建 A 需要 B 的实例 → 创建 B 需要 A 的实例 → 死循环

@Service
public class ServiceA {
    @Autowired
    public ServiceA(ServiceB serviceB) {
        // 必须先有 B 的完整实例才能创建 A
    }
}

@Service
public class ServiceB {
    @Autowired
    public ServiceB(ServiceA serviceA) {
        // 必须先有 A 的完整实例才能创建 B
    }
}

// 为什么无法通过三级缓存解决？
// - 构造器注入要求在对象实例化时就提供依赖
// - 但此时对象还未实例化，无法提前暴露引用
// - 三级缓存只能解决"实例化后、初始化前"的循环依赖
```

**关键要点：**
- 循环依赖是指 Bean 之间互相依赖形成闭环
- Spring 通过三级缓存解决单例 Bean 的字段/Setter 循环依赖
- 构造器循环依赖和 prototype 循环依赖无法解决
- 最佳实践：重构代码避免循环依赖

**记忆口诀：**
"**三级缓存解循环，字段 Setter 都能行；构造器和 prototype，无法解决需重构**"

---

### 18. 什么是三级缓存？

**核心答案：**
三级缓存是 Spring 解决单例 Bean 循环依赖的机制，包括：一级缓存（singletonObjects，成品对象）、二级缓存（earlySingletonObjects，半成品对象）、三级缓存（singletonFactories，对象工厂）。

**详细说明：**

**三级缓存详解：**

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="750" height="550" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="425" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">Spring 三级缓存详解</text>
<g id="level1">
<rect x="100" y="120" width="650" height="120" fill="#c8e6c9" stroke="#2e7d32" stroke-width="3" rx="5"/>
<text x="425" y="150" text-anchor="middle" font-size="18" font-weight="bold" fill="#2e7d32">一级缓存：singletonObjects</text>
<rect x="120" y="165" width="610" height="60" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="130" y="185" text-anchor="start" font-size="13" fill="#333">类型：Map&lt;String, Object&gt;</text>
<text x="130" y="205" text-anchor="start" font-size="13" fill="#333">存储：完全初始化的单例 Bean（成品）</text>
<text x="130" y="220" text-anchor="start" font-size="12" fill="#666">获取 Bean 时优先从这里取</text>
</g>
<g id="level2">
<rect x="100" y="260" width="650" height="120" fill="#fff9c4" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="290" text-anchor="middle" font-size="18" font-weight="bold" fill="#f57c00">二级缓存：earlySingletonObjects</text>
<rect x="120" y="305" width="610" height="60" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="130" y="325" text-anchor="start" font-size="13" fill="#333">类型：Map&lt;String, Object&gt;</text>
<text x="130" y="345" text-anchor="start" font-size="13" fill="#333">存储：提前暴露的 Bean（半成品，已实例化未初始化）</text>
<text x="130" y="360" text-anchor="start" font-size="12" fill="#666">用于解决循环依赖</text>
</g>
<g id="level3">
<rect x="100" y="400" width="650" height="120" fill="#ffcdd2" stroke="#c62828" stroke-width="3" rx="5"/>
<text x="425" y="430" text-anchor="middle" font-size="18" font-weight="bold" fill="#c62828">三级缓存：singletonFactories</text>
<rect x="120" y="445" width="610" height="60" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="130" y="465" text-anchor="start" font-size="13" fill="#333">类型：Map&lt;String, ObjectFactory&lt;?&gt;&gt;</text>
<text x="130" y="485" text-anchor="start" font-size="13" fill="#333">存储：Bean 的工厂对象（用于创建早期引用）</text>
<text x="130" y="500" text-anchor="start" font-size="12" fill="#666">支持 AOP 代理的创建</text>
</g>
<rect x="100" y="540" width="650" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="425" y="570" text-anchor="middle" font-size="14" fill="#1976d2" font-weight="bold">获取顺序：一级缓存 → 二级缓存 → 三级缓存（创建并移至二级）</text>
</svg>

**三级缓存源码（简化）：**

```java
// 源码位置：org.springframework.beans.factory.support.DefaultSingletonBeanRegistry

public class DefaultSingletonBeanRegistry {

    // ========== 三级缓存 ==========

    /** 一级缓存：存放完全初始化好的单例 Bean */
    private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);

    /** 二级缓存：存放早期暴露的单例 Bean（实例化但未初始化）*/
    private final Map<String, Object> earlySingletonObjects = new HashMap<>(16);

    /** 三级缓存：存放单例 Bean 的工厂 */
    private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<>(16);

    // ========== 获取单例 Bean ==========

    @Nullable
    protected Object getSingleton(String beanName, boolean allowEarlyReference) {
        // 1. 从一级缓存获取（完整对象）
        Object singletonObject = this.singletonObjects.get(beanName);

        // 2. 一级缓存没有，且正在创建中
        if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {
            synchronized (this.singletonObjects) {
                // 3. 从二级缓存获取（早期对象）
                singletonObject = this.earlySingletonObjects.get(beanName);

                // 4. 二级缓存也没有，且允许早期引用
                if (singletonObject == null && allowEarlyReference) {
                    // 5. 从三级缓存获取工厂
                    ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);
                    if (singletonFactory != null) {
                        // 6. 通过工厂创建对象（可能是代理对象）
                        singletonObject = singletonFactory.getObject();

                        // 7. 放入二级缓存
                        this.earlySingletonObjects.put(beanName, singletonObject);

                        // 8. 从三级缓存移除
                        this.singletonFactories.remove(beanName);
                    }
                }
            }
        }
        return singletonObject;
    }

    // ========== 添加单例 Bean 工厂 ==========

    protected void addSingletonFactory(String beanName, ObjectFactory<?> singletonFactory) {
        synchronized (this.singletonObjects) {
            if (!this.singletonObjects.containsKey(beanName)) {
                // 放入三级缓存
                this.singletonFactories.put(beanName, singletonFactory);
                // 从二级缓存移除
                this.earlySingletonObjects.remove(beanName);
            }
        }
    }

    // ========== 添加完整的单例 Bean ==========

    protected void addSingleton(String beanName, Object singletonObject) {
        synchronized (this.singletonObjects) {
            // 放入一级缓存
            this.singletonObjects.put(beanName, singletonObject);
            // 从三级缓存移除
            this.singletonFactories.remove(beanName);
            // 从二级缓存移除
            this.earlySingletonObjects.remove(beanName);
        }
    }
}
```

**循环依赖解决流程（A 依赖 B，B 依赖 A）：**

<svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="flow-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="50" width="700" height="600" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">循环依赖解决流程（A → B → A）</text>
<rect x="100" y="110" width="600" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="140" text-anchor="middle" font-size="14" fill="#1976d2">1. 创建 A：实例化 A，放入三级缓存</text>
<rect x="100" y="175" width="600" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="205" text-anchor="middle" font-size="14" fill="#f57c00">2. 填充 A 的属性：发现需要 B，开始创建 B</text>
<rect x="100" y="240" width="600" height="50" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="270" text-anchor="middle" font-size="14" fill="#2e7d32">3. 创建 B：实例化 B，放入三级缓存</text>
<rect x="100" y="305" width="600" height="50" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="400" y="335" text-anchor="middle" font-size="14" fill="#c2185b">4. 填充 B 的属性：发现需要 A</text>
<rect x="100" y="370" width="600" height="70" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="400" y="395" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">5. 获取 A（关键步骤）</text>
<text x="110" y="415" text-anchor="start" font-size="12" fill="#333">• 从三级缓存获取 A 的工厂</text>
<text x="110" y="432" text-anchor="start" font-size="12" fill="#333">• 创建 A 的早期引用，放入二级缓存</text>
<rect x="100" y="455" width="600" height="50" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="485" text-anchor="middle" font-size="14" fill="#2e7d32">6. B 注入 A 的早期引用，B 初始化完成</text>
<rect x="100" y="520" width="600" height="50" fill="#dcedc8" stroke="#689f38" stroke-width="2" rx="5"/>
<text x="400" y="550" text-anchor="middle" font-size="14" fill="#689f38">7. B 放入一级缓存，从三级缓存移除</text>
<rect x="100" y="585" width="600" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="3" rx="5"/>
<text x="400" y="615" text-anchor="middle" font-size="14" font-weight="bold" fill="white">8. A 注入 B，A 初始化完成，放入一级缓存 ✓</text>
<line x1="400" y1="160" x2="400" y2="175" stroke="#666" stroke-width="2" marker-end="url(#flow-arrow)"/>
<line x1="400" y1="225" x2="400" y2="240" stroke="#666" stroke-width="2" marker-end="url(#flow-arrow)"/>
<line x1="400" y1="290" x2="400" y2="305" stroke="#666" stroke-width="2" marker-end="url(#flow-arrow)"/>
<line x1="400" y1="355" x2="400" y2="370" stroke="#666" stroke-width="2" marker-end="url(#flow-arrow)"/>
<line x1="400" y1="440" x2="400" y2="455" stroke="#666" stroke-width="2" marker-end="url(#flow-arrow)"/>
<line x1="400" y1="505" x2="400" y2="520" stroke="#666" stroke-width="2" marker-end="url(#flow-arrow)"/>
<line x1="400" y1="570" x2="400" y2="585" stroke="#666" stroke-width="2" marker-end="url(#flow-arrow)"/>
</svg>

**为什么需要三级缓存？两级不够吗？**

```java
// 问题：为什么不直接用两级缓存（一级：完整对象，二级：早期对象）？

// 答案：三级缓存支持 AOP 代理的创建

// 场景：如果 Bean 需要被 AOP 代理

@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;

    @Transactional  // 需要 AOP 代理
    public void doSomething() {
        // ...
    }
}

// 三级缓存的作用：
// 1. 二级缓存：存放原始对象或代理对象
// 2. 三级缓存：存放 ObjectFactory，可以决定返回原始对象还是代理对象
//    - 如果没有循环依赖：在完全初始化后创建代理
//    - 如果有循环依赖：提前创建代理对象

// 三级缓存中的 ObjectFactory：
() -> getEarlyBeanReference(beanName, mbd, bean)

// getEarlyBeanReference 方法：
protected Object getEarlyBeanReference(String beanName, RootBeanDefinition mbd, Object bean) {
    Object exposedObject = bean;
    if (!mbd.isSynthetic() && hasInstantiationAwareBeanPostProcessors()) {
        for (BeanPostProcessor bp : getBeanPostProcessors()) {
            if (bp instanceof SmartInstantiationAwareBeanPostProcessor) {
                SmartInstantiationAwareBeanPostProcessor ibp =
                    (SmartInstantiationAwareBeanPostProcessor) bp;
                // 如果需要 AOP，这里会创建代理对象
                exposedObject = ibp.getEarlyBeanReference(exposedObject, beanName);
            }
        }
    }
    return exposedObject;
}
```

**实际代码示例：**

```java
// 示例：带 AOP 的循环依赖

@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;

    @Transactional  // 需要 AOP 代理
    public void methodA() {
        System.out.println("ServiceA.methodA()");
        serviceB.methodB();
    }
}

@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA;  // 注入的是 ServiceA 的代理对象

    public void methodB() {
        System.out.println("ServiceB.methodB()");
        serviceA.methodA();  // 调用代理对象的方法，事务生效
    }
}

// Spring 的处理：
// 1. 创建 ServiceA 原始对象，放入三级缓存
// 2. 填充 ServiceA 属性，需要 ServiceB
// 3. 创建 ServiceB 原始对象，放入三级缓存
// 4. 填充 ServiceB 属性，需要 ServiceA
// 5. 从三级缓存获取 ServiceA 的工厂
// 6. 工厂创建 ServiceA 的代理对象（因为有 @Transactional）
// 7. 代理对象放入二级缓存
// 8. ServiceB 注入 ServiceA 的代理对象
// 9. ServiceB 初始化完成，放入一级缓存
// 10. ServiceA 注入 ServiceB
// 11. ServiceA 的代理对象放入一级缓存
```

**三级缓存总结表：**

| 缓存 | 名称 | 类型 | 存储内容 | 作用 |
|------|------|------|---------|------|
| **一级** | singletonObjects | Map<String, Object> | 完全初始化的 Bean | 存放成品对象，直接可用 |
| **二级** | earlySingletonObjects | Map<String, Object> | 早期暴露的 Bean | 解决循环依赖，存放半成品 |
| **三级** | singletonFactories | Map<String, ObjectFactory<?>> | Bean 工厂 | 支持 AOP 代理，延迟创建 |

**关键要点：**
- 三级缓存是 Spring 解决单例循环依赖的核心机制
- 一级缓存存完整对象，二级存半成品，三级存工厂
- 三级缓存支持 AOP 代理的创建
- 获取顺序：一级 → 二级 → 三级（创建并升级到二级）

**记忆口诀：**
"**一级成品直接用，二级半成品解循环，三级工厂造代理**"

---


## Spring AOP

### 19. 什么是 AOP(面向切面编程)?

**核心答案:**
AOP(Aspect-Oriented Programming,面向切面编程)是一种编程范式,通过预编译方式和运行期动态代理实现程序功能的统一维护。它将横切关注点(cross-cutting concerns)与业务逻辑分离,提高代码的模块化程度。

**详细说明:**

**AOP 核心概念图:**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="450" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">AOP 面向切面编程</text>
<g id="traditional">
<rect x="100" y="120" width="280" height="180" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="240" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#c62828">传统 OOP 方式</text>
<rect x="120" y="160" width="240" height="120" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="240" y="185" text-anchor="middle" font-size="13" fill="#333">业务方法 A</text>
<text x="130" y="205" text-anchor="start" font-size="11" fill="#666">- 日志记录</text>
<text x="130" y="220" text-anchor="start" font-size="11" fill="#666">- 权限检查</text>
<text x="130" y="235" text-anchor="start" font-size="11" fill="#2e7d32">- 业务逻辑</text>
<text x="130" y="250" text-anchor="start" font-size="11" fill="#666">- 事务管理</text>
<text x="130" y="265" text-anchor="start" font-size="11" fill="#666">- 性能监控</text>
<text x="240" y="290" text-anchor="middle" font-size="12" fill="#c62828" font-weight="bold">❌ 代码重复,难以维护</text>
</g>
<g id="aop">
<rect x="420" y="120" width="280" height="180" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="560" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">AOP 方式</text>
<rect x="440" y="160" width="240" height="50" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2" rx="3"/>
<text x="560" y="185" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">业务逻辑</text>
<text x="560" y="200" text-anchor="middle" font-size="11" fill="#333">纯粹的业务代码</text>
<rect x="440" y="225" width="240" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="560" y="245" text-anchor="middle" font-size="12" fill="#f57c00">横切关注点(Aspects)</text>
<text x="450" y="263" text-anchor="start" font-size="10" fill="#666">日志 | 权限 | 事务 | 监控</text>
<text x="450" y="277" text-anchor="start" font-size="10" fill="#666">统一管理,动态织入</text>
<text x="560" y="300" text-anchor="middle" font-size="12" fill="#2e7d32" font-weight="bold">✅ 代码解耦,易于维护</text>
</g>
<rect x="100" y="320" width="600" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="345" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976d2">AOP 解决的问题</text>
<g id="problems">
<rect x="120" y="360" width="170" height="90" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="205" y="380" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">代码重复</text>
<text x="130" y="398" text-anchor="start" font-size="10" fill="#333">同样的日志、权限</text>
<text x="130" y="413" text-anchor="start" font-size="10" fill="#333">检查代码散落在</text>
<text x="130" y="428" text-anchor="start" font-size="10" fill="#333">各个业务方法中</text>
<rect x="315" y="360" width="170" height="90" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="400" y="380" text-anchor="middle" font-size="12" font-weight="bold" fill="#f57c00">关注点分散</text>
<text x="325" y="398" text-anchor="start" font-size="10" fill="#333">横切关注点与业务</text>
<text x="325" y="413" text-anchor="start" font-size="10" fill="#333">逻辑混在一起</text>
<text x="325" y="428" text-anchor="start" font-size="10" fill="#333">难以维护和修改</text>
<rect x="510" y="360" width="170" height="90" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="595" y="380" text-anchor="middle" font-size="12" font-weight="bold" fill="#7b1fa2">耦合度高</text>
<text x="520" y="398" text-anchor="start" font-size="10" fill="#333">业务代码与系统</text>
<text x="520" y="413" text-anchor="start" font-size="10" fill="#333">服务代码紧密耦合</text>
<text x="520" y="428" text-anchor="start" font-size="10" fill="#333">不利于复用</text>
</g>
<rect x="100" y="480" width="600" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="400" y="510" text-anchor="middle" font-size="13" fill="#f57c00" font-weight="bold">💡 AOP 让你在不修改源代码的情况下,给程序动态添加功能</text>
</svg>

**什么是横切关注点?**

横切关注点(Cross-cutting Concerns)是指那些影响应用多个模块的功能,它们无法通过传统的 OOP 方式进行模块化。

常见的横切关注点:
- **日志记录** (Logging)
- **权限检查** (Security)
- **事务管理** (Transaction)
- **性能监控** (Performance Monitoring)
- **异常处理** (Exception Handling)
- **缓存** (Caching)

**AOP 的优势:**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="600" height="300" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="350" y="85" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">AOP 的优势</text>
<rect x="100" y="120" width="220" height="80" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="210" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">代码解耦</text>
<text x="110" y="165" text-anchor="start" font-size="11" fill="#333">业务逻辑与系统服务</text>
<text x="110" y="182" text-anchor="start" font-size="11" fill="#333">分离,降低耦合度</text>
<rect x="360" y="120" width="220" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="470" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">提高复用</text>
<text x="370" y="165" text-anchor="start" font-size="11" fill="#333">横切关注点集中管理</text>
<text x="370" y="182" text-anchor="start" font-size="11" fill="#333">可在多处复用</text>
<rect x="100" y="220" width="220" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="210" y="245" text-anchor="middle" font-size="14" font-weight="bold" fill="#f57c00">易于维护</text>
<text x="110" y="265" text-anchor="start" font-size="11" fill="#333">修改横切逻辑只需</text>
<text x="110" y="282" text-anchor="start" font-size="11" fill="#333">改一处,影响全局</text>
<rect x="360" y="220" width="220" height="80" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="470" y="245" text-anchor="middle" font-size="14" font-weight="bold" fill="#c2185b">动态增强</text>
<text x="370" y="265" text-anchor="start" font-size="11" fill="#333">无需修改源代码</text>
<text x="370" y="282" text-anchor="start" font-size="11" fill="#333">即可增强功能</text>
</svg>

**代码示例:**

**传统 OOP 方式(存在问题):**
```java
public class UserService {

    public void saveUser(User user) {
        // 1. 日志记录 - 重复代码
        System.out.println("开始保存用户: " + user.getName());

        // 2. 权限检查 - 重复代码
        if (!SecurityContext.hasPermission("user:save")) {
            throw new SecurityException("无权限");
        }

        // 3. 事务开始 - 重复代码
        Transaction tx = beginTransaction();

        try {
            // 4. 业务逻辑 - 真正需要关心的代码
            userDao.save(user);

            // 5. 事务提交 - 重复代码
            tx.commit();

            // 6. 日志记录 - 重复代码
            System.out.println("保存用户成功");
        } catch (Exception e) {
            // 7. 事务回滚 - 重复代码
            tx.rollback();

            // 8. 异常处理 - 重复代码
            System.err.println("保存用户失败: " + e.getMessage());
            throw e;
        }
    }

    public void deleteUser(Long id) {
        // 同样需要重复上面 1-8 的代码
        System.out.println("开始删除用户: " + id);
        if (!SecurityContext.hasPermission("user:delete")) {
            throw new SecurityException("无权限");
        }
        // ... 重复的事务、异常处理代码
        userDao.delete(id);
    }
}
```

**AOP 方式(解决问题):**
```java
// 业务类: 只关注核心业务逻辑
@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    // 纯粹的业务逻辑,没有任何横切关注点代码
    public void saveUser(User user) {
        userDao.save(user);
    }

    public void deleteUser(Long id) {
        userDao.delete(id);
    }
}

// 切面类: 统一管理横切关注点
@Aspect
@Component
public class SystemAspect {

    // 日志切面
    @Around("execution(* com.example.service.*.*(..))")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("开始执行方法: " + methodName);

        long startTime = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long endTime = System.currentTimeMillis();

        System.out.println("方法 " + methodName + " 执行完成,耗时: " + (endTime - startTime) + "ms");
        return result;
    }

    // 权限切面
    @Before("execution(* com.example.service.*.save*(..)) || " +
            "execution(* com.example.service.*.delete*(..))")
    public void checkPermission(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String permission = methodName.startsWith("save") ? "user:save" : "user:delete";

        if (!SecurityContext.hasPermission(permission)) {
            throw new SecurityException("无权限执行: " + methodName);
        }
    }

    // 异常处理切面
    @AfterThrowing(pointcut = "execution(* com.example.service.*.*(..))",
                   throwing = "ex")
    public void handleException(JoinPoint joinPoint, Exception ex) {
        String methodName = joinPoint.getSignature().getName();
        System.err.println("方法 " + methodName + " 执行失败: " + ex.getMessage());
        // 可以记录到日志系统,发送告警等
    }
}

// 事务管理: 使用 Spring 的声明式事务
@Service
public class UserService {

    @Transactional  // AOP 实现的事务管理
    public void saveUser(User user) {
        userDao.save(user);
        // 事务自动管理,无需手动开始/提交/回滚
    }
}
```

**AOP 与 OOP 的关系:**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="600" height="300" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="350" y="85" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">AOP 与 OOP 的关系</text>
<ellipse cx="250" cy="200" rx="120" ry="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="250" y="195" text-anchor="middle" font-size="16" font-weight="bold" fill="#1976d2">OOP</text>
<text x="250" y="215" text-anchor="middle" font-size="12" fill="#333">纵向继承</text>
<text x="250" y="235" text-anchor="middle" font-size="11" fill="#666">封装、继承、多态</text>
<rect x="420" y="120" width="180" height="40" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="510" y="145" text-anchor="middle" font-size="13" fill="#2e7d32">AOP 横切</text>
<rect x="420" y="180" width="180" height="40" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="510" y="205" text-anchor="middle" font-size="13" fill="#2e7d32">AOP 横切</text>
<rect x="420" y="240" width="180" height="40" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="510" y="265" text-anchor="middle" font-size="13" fill="#2e7d32">AOP 横切</text>
<path d="M 370 200 L 420 140" stroke="#2e7d32" stroke-width="2" stroke-dasharray="5,5"/>
<path d="M 370 200 L 420 200" stroke="#2e7d32" stroke-width="2" stroke-dasharray="5,5"/>
<path d="M 370 200 L 420 260" stroke="#2e7d32" stroke-width="2" stroke-dasharray="5,5"/>
<text x="350" y="310" text-anchor="middle" font-size="13" fill="#333">OOP 负责纵向抽象</text>
<text x="350" y="330" text-anchor="middle" font-size="13" fill="#333">AOP 负责横向抽取</text>
</svg>

**AOP 的应用场景:**

| 场景 | 说明 | 示例 |
|------|------|------|
| **日志记录** | 统一记录方法执行信息 | 记录方法入参、返回值、执行时间 |
| **权限控制** | 统一检查用户权限 | 检查是否有操作权限 |
| **事务管理** | 统一管理事务边界 | @Transactional 注解 |
| **性能监控** | 统计方法执行时间 | 性能分析、慢方法告警 |
| **异常处理** | 统一异常捕获和处理 | 记录异常、返回友好提示 |
| **缓存** | 统一管理缓存逻辑 | @Cacheable 注解 |
| **数据校验** | 统一参数校验 | 参数非空、格式校验 |
| **分布式追踪** | 记录请求链路 | 生成 traceId、spanId |

**Spring AOP 实现原理(简介):**

Spring AOP 基于代理模式实现:
- **JDK 动态代理**: 针对实现了接口的类
- **CGLIB 代理**: 针对没有接口的类

```java
// 原始对象
public class UserService {
    public void saveUser(User user) {
        // 业务逻辑
    }
}

// Spring AOP 生成的代理对象(伪代码)
public class UserService$Proxy extends UserService {
    private UserService target;
    private List<Interceptor> interceptors;

    @Override
    public void saveUser(User user) {
        // 前置通知
        interceptors.forEach(i -> i.before());

        try {
            // 调用目标方法
            target.saveUser(user);

            // 后置通知
            interceptors.forEach(i -> i.after());
        } catch (Exception e) {
            // 异常通知
            interceptors.forEach(i -> i.afterThrowing(e));
        } finally {
            // 最终通知
            interceptors.forEach(i -> i.afterReturning());
        }
    }
}
```

**关键要点:**
- AOP 是一种编程范式,解决横切关注点的问题
- 通过将横切关注点与业务逻辑分离,提高代码的模块化
- Spring AOP 基于代理模式,在运行时动态织入
- 主要应用场景: 日志、权限、事务、监控、异常处理等
- AOP 是 OOP 的补充,不是替代

**记忆口诀:**
"**横切关注点,AOP 来管理;业务逻辑清,系统更解耦**"

---


### 20. AOP 的核心概念有哪些(切面、连接点、切入点、通知等)?

**核心答案:**
AOP 的核心概念包括:切面(Aspect)、连接点(Join Point)、切入点(Pointcut)、通知(Advice)、目标对象(Target)、织入(Weaving)、代理(Proxy)。这些概念共同构成了 AOP 的完整体系。

**详细说明:**

**AOP 核心概念全景图:**

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="50" width="750" height="550" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="425" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">AOP 核心概念体系</text>
<rect x="300" y="120" width="250" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="150" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">切面 (Aspect)</text>
<text x="425" y="175" text-anchor="middle" font-size="13" fill="#333">横切关注点的模块化</text>
<text x="425" y="192" text-anchor="middle" font-size="12" fill="#666">= 切入点 + 通知</text>
<g id="target">
<rect x="100" y="230" width="200" height="120" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="200" y="255" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">目标对象 (Target)</text>
<text x="200" y="280" text-anchor="middle" font-size="12" fill="#333">被增强的对象</text>
<ellipse cx="200" cy="315" rx="50" ry="25" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="200" y="320" text-anchor="middle" font-size="12" fill="white">UserService</text>
</g>
<g id="joinpoint">
<rect x="330" y="230" width="190" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="425" y="255" text-anchor="middle" font-size="15" font-weight="bold" fill="#f57c00">连接点 (Join Point)</text>
<text x="425" y="280" text-anchor="middle" font-size="12" fill="#333">可以插入切面的位置</text>
<text x="340" y="300" text-anchor="start" font-size="11" fill="#666">• 方法执行</text>
<text x="340" y="317" text-anchor="start" font-size="11" fill="#666">• 方法调用</text>
<text x="340" y="334" text-anchor="start" font-size="11" fill="#666">• 字段访问...</text>
</g>
<g id="pointcut">
<rect x="550" y="230" width="200" height="120" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="650" y="255" text-anchor="middle" font-size="15" font-weight="bold" fill="#c2185b">切入点 (Pointcut)</text>
<text x="650" y="280" text-anchor="middle" font-size="12" fill="#333">匹配连接点的表达式</text>
<text x="560" y="300" text-anchor="start" font-size="11" fill="#666">execution(...)</text>
<text x="560" y="317" text-anchor="start" font-size="11" fill="#666">@annotation(...)</text>
<text x="560" y="334" text-anchor="start" font-size="11" fill="#666">within(...)</text>
</g>
<g id="advice">
<rect x="100" y="370" width="280" height="150" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="240" y="395" text-anchor="middle" font-size="15" font-weight="bold" fill="#7b1fa2">通知 (Advice)</text>
<text x="240" y="418" text-anchor="middle" font-size="12" fill="#333">在切入点执行的动作</text>
<rect x="120" y="430" width="240" height="75" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="130" y="448" text-anchor="start" font-size="11" fill="#333">• Before (前置)</text>
<text x="130" y="463" text-anchor="start" font-size="11" fill="#333">• After (后置)</text>
<text x="130" y="478" text-anchor="start" font-size="11" fill="#333">• Around (环绕)</text>
<text x="130" y="493" text-anchor="start" font-size="11" fill="#333">• AfterReturning, AfterThrowing</text>
</g>
<g id="weaving">
<rect x="410" y="370" width="160" height="70" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="490" y="395" text-anchor="middle" font-size="15" font-weight="bold" fill="#00796b">织入 (Weaving)</text>
<text x="490" y="420" text-anchor="middle" font-size="11" fill="#333">将切面应用到目标对象</text>
<text x="490" y="433" text-anchor="middle" font-size="11" fill="#666">创建代理对象的过程</text>
</g>
<g id="proxy">
<rect x="410" y="460" width="160" height="60" fill="#ede7f6" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="490" y="485" text-anchor="middle" font-size="15" font-weight="bold" fill="#512da8">代理 (Proxy)</text>
<text x="490" y="508" text-anchor="middle" font-size="11" fill="#333">增强后的对象</text>
</g>
<rect x="100" y="540" width="650" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="425" y="570" text-anchor="middle" font-size="13" fill="#f57c00" font-weight="bold">💡 记忆: 切面找切入点,通知在连接点,织入生代理,增强目标对象</text>
<line x1="425" y1="200" x2="200" y2="230" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="425" y1="200" x2="425" y2="230" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="425" y1="200" x2="650" y2="230" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
</svg>

**核心概念详解:**

**1. 切面 (Aspect)**

切面是横切关注点的模块化,是切入点和通知的结合。

```java
// @Aspect 标注的类就是一个切面
@Aspect
@Component
public class LoggingAspect {

    // 切入点 + 通知 = 切面
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("执行方法: " + joinPoint.getSignature().getName());
    }
}
```

**2. 连接点 (Join Point)**

连接点是程序执行过程中能够应用通知的点。在 Spring AOP 中,连接点总是方法的执行。

```java
@Aspect
@Component
public class LoggingAspect {

    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        // joinPoint 代表被拦截的连接点(方法执行点)

        // 获取方法签名
        Signature signature = joinPoint.getSignature();
        String methodName = signature.getName();
        String className = signature.getDeclaringTypeName();

        // 获取方法参数
        Object[] args = joinPoint.getArgs();

        // 获取目标对象
        Object target = joinPoint.getTarget();

        System.out.println("方法: " + className + "." + methodName);
        System.out.println("参数: " + Arrays.toString(args));
    }
}
```

**3. 切入点 (Pointcut)**

切入点是匹配连接点的表达式,定义了在哪些连接点上应用通知。

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="400" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">切入点表达式类型</text>
<rect x="100" y="120" width="280" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="240" y="145" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976d2">execution</text>
<text x="240" y="168" text-anchor="middle" font-size="12" fill="#333">匹配方法执行</text>
<text x="110" y="190" text-anchor="start" font-size="11" fill="#666">execution(修饰符? 返回类型</text>
<text x="110" y="205" text-anchor="start" font-size="11" fill="#666">包名.类名.方法名(参数) 异常?)</text>
<rect x="420" y="120" width="280" height="100" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="560" y="145" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">@annotation</text>
<text x="560" y="168" text-anchor="middle" font-size="12" fill="#333">匹配带特定注解的方法</text>
<text x="430" y="190" text-anchor="start" font-size="11" fill="#666">@annotation(注解类型)</text>
<text x="430" y="205" text-anchor="start" font-size="11" fill="#666">例: @annotation(Log)</text>
<rect x="100" y="240" width="280" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="240" y="265" text-anchor="middle" font-size="15" font-weight="bold" fill="#f57c00">within</text>
<text x="240" y="288" text-anchor="middle" font-size="12" fill="#333">匹配指定类型内的方法</text>
<text x="110" y="310" text-anchor="start" font-size="11" fill="#666">within(包名.类名)</text>
<text x="110" y="325" text-anchor="start" font-size="11" fill="#666">例: within(com.example..*)</text>
<rect x="420" y="240" width="280" height="100" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="560" y="265" text-anchor="middle" font-size="15" font-weight="bold" fill="#c2185b">@within</text>
<text x="560" y="288" text-anchor="middle" font-size="12" fill="#333">匹配带特定注解的类</text>
<text x="430" y="310" text-anchor="start" font-size="11" fill="#666">@within(注解类型)</text>
<text x="430" y="325" text-anchor="start" font-size="11" fill="#666">例: @within(Service)</text>
<rect x="100" y="360" width="600" height="70" fill="#e1f5fe" stroke="#0277bd" stroke-width="1" rx="3"/>
<text x="400" y="385" text-anchor="middle" font-size="13" font-weight="bold" fill="#0277bd">其他常用</text>
<text x="110" y="405" text-anchor="start" font-size="11" fill="#333">args(...) - 匹配参数类型 | this(...) - 匹配代理对象类型</text>
<text x="110" y="420" text-anchor="start" font-size="11" fill="#333">target(...) - 匹配目标对象类型 | bean(...) - 匹配 Bean 名称</text>
</svg>

```java
@Aspect
@Component
public class PointcutExamples {

    // 1. execution: 最常用,匹配方法执行
    @Pointcut("execution(public * com.example.service.*.*(..))")
    public void serviceLayer() {}

    // 2. execution 详细语法
    // execution(修饰符? 返回类型 包名.类名.方法名(参数) 异常?)
    @Pointcut("execution(public String com.example.service.UserService.getUser(Long))")
    public void specificMethod() {}

    // 3. 通配符使用
    @Pointcut("execution(* com.example.service..*.*(..))")  // service 包及子包所有方法
    public void allServiceMethods() {}

    @Pointcut("execution(* com.example.service.*.get*(..))")  // 所有 get 开头的方法
    public void allGetterMethods() {}

    // 4. @annotation: 匹配带特定注解的方法
    @Pointcut("@annotation(com.example.annotation.Log)")
    public void logAnnotation() {}

    // 5. within: 匹配指定类型内的所有方法
    @Pointcut("within(com.example.service..*)")
    public void inServicePackage() {}

    // 6. @within: 匹配带特定注解的类中的所有方法
    @Pointcut("@within(org.springframework.stereotype.Service)")
    public void inServiceClasses() {}

    // 7. args: 匹配参数类型
    @Pointcut("args(Long, String)")
    public void twoArgs() {}

    // 8. bean: 匹配 Bean 名称
    @Pointcut("bean(userService)")
    public void userServiceBean() {}

    // 9. 组合切入点 (AND, OR, NOT)
    @Pointcut("serviceLayer() && logAnnotation()")
    public void serviceWithLog() {}

    @Pointcut("execution(* com.example.service.*.*(..)) && !execution(* com.example.service.*.get*(..))")
    public void nonGetterServiceMethods() {}
}
```

**4. 通知 (Advice)**

通知是在切入点执行的动作,定义了"何时"和"做什么"。

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="450" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="400" y="85" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">通知类型与执行时机</text>
<rect x="100" y="120" width="600" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="145" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976d2">@Before (前置通知)</text>
<text x="400" y="167" text-anchor="middle" font-size="12" fill="#333">在目标方法执行之前执行</text>
<rect x="100" y="195" width="600" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="220" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">@AfterReturning (返回通知)</text>
<text x="400" y="242" text-anchor="middle" font-size="12" fill="#333">在目标方法正常返回后执行</text>
<rect x="100" y="270" width="600" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="400" y="295" text-anchor="middle" font-size="15" font-weight="bold" fill="#c62828">@AfterThrowing (异常通知)</text>
<text x="400" y="317" text-anchor="middle" font-size="12" fill="#333">在目标方法抛出异常后执行</text>
<rect x="100" y="345" width="600" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="370" text-anchor="middle" font-size="15" font-weight="bold" fill="#f57c00">@After (后置通知)</text>
<text x="400" y="392" text-anchor="middle" font-size="12" fill="#333">在目标方法执行后执行(无论是否异常)</text>
<rect x="100" y="420" width="600" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="400" y="445" text-anchor="middle" font-size="15" font-weight="bold" fill="#7b1fa2">@Around (环绕通知) ⭐</text>
<text x="400" y="467" text-anchor="middle" font-size="12" fill="#333">包围目标方法,最强大,可控制方法执行</text>
</svg>

```java
@Aspect
@Component
public class AdviceExample {

    // 1. @Before: 前置通知
    @Before("execution(* com.example.service.UserService.save*(..))")
    public void beforeAdvice(JoinPoint joinPoint) {
        System.out.println("【前置通知】方法执行前");
        System.out.println("方法名: " + joinPoint.getSignature().getName());
        System.out.println("参数: " + Arrays.toString(joinPoint.getArgs()));
    }

    // 2. @AfterReturning: 返回通知
    @AfterReturning(
        pointcut = "execution(* com.example.service.UserService.get*(..))",
        returning = "result"  // 绑定返回值
    )
    public void afterReturningAdvice(JoinPoint joinPoint, Object result) {
        System.out.println("【返回通知】方法正常返回");
        System.out.println("返回值: " + result);
    }

    // 3. @AfterThrowing: 异常通知
    @AfterThrowing(
        pointcut = "execution(* com.example.service.*.*(..))",
        throwing = "ex"  // 绑定异常
    )
    public void afterThrowingAdvice(JoinPoint joinPoint, Exception ex) {
        System.out.println("【异常通知】方法执行异常");
        System.out.println("异常信息: " + ex.getMessage());
        // 可以记录日志、发送告警等
    }

    // 4. @After: 后置通知 (finally)
    @After("execution(* com.example.service.*.*(..))")
    public void afterAdvice(JoinPoint joinPoint) {
        System.out.println("【后置通知】方法执行后(无论是否异常)");
        // 类似 finally,常用于资源清理
    }

    // 5. @Around: 环绕通知 (最强大)
    @Around("execution(* com.example.service.*.*(..))")
    public Object aroundAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("【环绕通知】方法执行前");

        long startTime = System.currentTimeMillis();

        Object result = null;
        try {
            // 执行目标方法
            result = joinPoint.proceed();

            System.out.println("【环绕通知】方法正常返回");
            return result;
        } catch (Exception e) {
            System.out.println("【环绕通知】方法执行异常: " + e.getMessage());
            throw e;
        } finally {
            long endTime = System.currentTimeMillis();
            System.out.println("【环绕通知】方法执行耗时: " + (endTime - startTime) + "ms");
        }
    }
}
```

**通知执行顺序:**

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="50" width="600" height="350" fill="#f8f9fa" stroke="#333" stroke-width="2" rx="10"/>
<text x="350" y="85" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">通知执行顺序</text>
<rect x="100" y="120" width="200" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="200" y="145" text-anchor="middle" font-size="13" fill="#1976d2">@Around (前半部分)</text>
<rect x="100" y="175" width="200" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="200" y="200" text-anchor="middle" font-size="13" fill="#1976d2">@Before</text>
<rect x="100" y="230" width="200" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="3" rx="5"/>
<text x="200" y="255" text-anchor="middle" font-size="14" font-weight="bold" fill="white">目标方法执行</text>
<rect x="100" y="285" width="200" height="40" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="200" y="310" text-anchor="middle" font-size="13" fill="#2e7d32">@AfterReturning / @AfterThrowing</text>
<rect x="100" y="340" width="200" height="40" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="200" y="365" text-anchor="middle" font-size="13" fill="#f57c00">@After</text>
<rect x="400" y="120" width="200" height="40" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="500" y="145" text-anchor="middle" font-size="13" fill="#7b1fa2">@Around (后半部分)</text>
<line x1="200" y1="160" x2="200" y2="175" stroke="#666" stroke-width="2" marker-end="url(#arr)"/>
<line x1="200" y1="215" x2="200" y2="230" stroke="#666" stroke-width="2" marker-end="url(#arr)"/>
<line x1="200" y1="270" x2="200" y2="285" stroke="#666" stroke-width="2" marker-end="url(#arr)"/>
<line x1="200" y1="325" x2="200" y2="340" stroke="#666" stroke-width="2" marker-end="url(#arr)"/>
<line x1="300" y1="140" x2="400" y2="140" stroke="#7b1fa2" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="300" y1="360" x2="400" y2="140" stroke="#7b1fa2" stroke-width="2" stroke-dasharray="5,5"/>
<text x="350" y="130" text-anchor="middle" font-size="11" fill="#7b1fa2">环绕通知包裹全过程</text>
</svg>

**5. 目标对象 (Target)**

被一个或多个切面增强的对象。

```java
// 目标对象
@Service
public class UserService {
    public void saveUser(User user) {
        System.out.println("保存用户: " + user);
    }
}
```

**6. 织入 (Weaving)**

将切面应用到目标对象创建代理对象的过程。

- **编译期织入**: AspectJ 编译器
- **类加载期织入**: AspectJ 类加载器
- **运行期织入**: Spring AOP (动态代理)

**7. 代理 (Proxy)**

AOP 创建的增强对象,包含了目标对象的功能和切面逻辑。

```java
// 目标对象
UserService target = new UserService();

// AOP 创建的代理对象
UserService proxy = createProxy(target, aspects);

// 使用代理对象
proxy.saveUser(user);  // 会执行切面逻辑 + 目标方法
```

**完整示例:**

```java
// 1. 定义切面
@Aspect
@Component
public class LoggingAspect {

    // 定义切入点
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceLayer() {}

    // 定义通知
    @Around("serviceLayer()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        // 获取连接点信息
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();

        System.out.println("执行方法: " + methodName);
        System.out.println("参数: " + Arrays.toString(args));

        long startTime = System.currentTimeMillis();

        // 执行目标方法
        Object result = joinPoint.proceed();

        long endTime = System.currentTimeMillis();
        System.out.println("耗时: " + (endTime - startTime) + "ms");

        return result;
    }
}

// 2. 目标对象
@Service
public class UserService {
    public User getUserById(Long id) {
        // 业务逻辑
        return new User(id, "张三");
    }
}

// 3. 使用
@RestController
public class UserController {

    @Autowired
    private UserService userService;  // 注入的是代理对象

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        // 调用代理对象的方法
        // 会自动执行切面逻辑
        return userService.getUserById(id);
    }
}
```

**概念关系总结表:**

| 概念 | 英文 | 说明 | 类比 |
|------|------|------|------|
| **切面** | Aspect | 横切关注点的模块化 | 安保部门 |
| **连接点** | Join Point | 可以插入切面的点 | 所有出入口 |
| **切入点** | Pointcut | 真正插入切面的点 | 需要检查的出入口 |
| **通知** | Advice | 切面的具体动作 | 检查身份证的动作 |
| **目标对象** | Target | 被增强的对象 | 办公楼 |
| **织入** | Weaving | 应用切面的过程 | 安装门禁系统 |
| **代理** | Proxy | 增强后的对象 | 带门禁的办公楼 |

**关键要点:**
- 切面 = 切入点 + 通知,是 AOP 的基本单元
- 连接点是所有可能的点,切入点是实际选中的点
- 通知有 5 种类型,@Around 最强大
- Spring AOP 在运行时通过动态代理实现织入
- 客户端使用的是代理对象,不是目标对象

**记忆口诀:**
"**切面找切入点,通知在连接点;织入生代理,增强目标对象**"

---



### 21. Spring AOP 和 AspectJ 的区别是什么？

**核心答案**

**Spring AOP** 和 **AspectJ** 都是 AOP 的实现框架，但它们在实现方式、功能强度、性能和使用复杂度上有明显区别：

| 对比维度 | Spring AOP | AspectJ |
| :--- | :--- | :--- |
| **实现方式** | 基于动态代理（JDK 或 CGLIB） | 基于字节码织入（编译期/加载期） |
| **织入时机** | 运行时织入 | 编译时、编译后、加载时织入 |
| **功能强度** | 仅支持方法级别的拦截 | 支持字段、方法、构造器等全方位拦截 |
| **连接点** | 仅支持方法执行连接点 | 支持所有连接点（方法、字段访问、构造器等） |
| **性能** | 性能略低（运行时创建代理） | 性能更高（编译期织入，无需运行时代理） |
| **依赖** | 依赖 Spring 容器 | 独立框架，不依赖 Spring |
| **学习曲线** | 简单易用，配置简单 | 功能强大但相对复杂 |
| **使用场景** | 适合 Spring 项目的常见切面需求 | 适合复杂的 AOP 需求和非 Spring 项目 |

**详细说明**

**(1) 实现方式对比**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"></polygon>
</marker>
</defs>
<rect x="50" y="50" width="300" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="200" y="80" font-size="18" font-weight="bold" text-anchor="middle" fill="#1976d2">Spring AOP</text>
<text x="200" y="110" font-size="14" text-anchor="middle" fill="#333">运行时动态代理</text>
<rect x="80" y="130" width="100" height="40" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"></rect>
<text x="130" y="155" font-size="12" text-anchor="middle" fill="#333">JDK Proxy</text>
<rect x="220" y="130" width="100" height="40" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"></rect>
<text x="270" y="155" font-size="12" text-anchor="middle" fill="#333">CGLIB Proxy</text>
<rect x="450" y="50" width="300" height="150" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"></rect>
<text x="600" y="80" font-size="18" font-weight="bold" text-anchor="middle" fill="#f57c00">AspectJ</text>
<text x="600" y="110" font-size="14" text-anchor="middle" fill="#333">字节码织入</text>
<rect x="470" y="130" width="80" height="40" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"></rect>
<text x="510" y="155" font-size="12" text-anchor="middle" fill="#333">编译时</text>
<rect x="565" y="130" width="80" height="40" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"></rect>
<text x="605" y="155" font-size="12" text-anchor="middle" fill="#333">编译后</text>
<rect x="660" y="130" width="80" height="40" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"></rect>
<text x="700" y="155" font-size="12" text-anchor="middle" fill="#333">加载时</text>
<text x="400" y="250" font-size="16" font-weight="bold" text-anchor="middle" fill="#333">织入时机对比</text>
<line x1="200" y1="210" x2="200" y2="270" stroke="#1976d2" stroke-width="2" marker-end="url(#arrowhead)"></line>
<text x="200" y="295" font-size="14" text-anchor="middle" fill="#1976d2">运行时</text>
<text x="200" y="315" font-size="12" text-anchor="middle" fill="#666">Spring 容器启动后</text>
<line x1="600" y1="210" x2="600" y2="270" stroke="#f57c00" stroke-width="2" marker-end="url(#arrowhead)"></line>
<text x="600" y="295" font-size="14" text-anchor="middle" fill="#f57c00">编译/加载时</text>
<text x="600" y="315" font-size="12" text-anchor="middle" fill="#666">应用运行前</text>
<rect x="50" y="340" width="700" height="50" fill="#f5f5f5" stroke="#999" stroke-width="1" rx="3"></rect>
<text x="400" y="365" font-size="13" text-anchor="middle" fill="#333">Spring AOP 在运行时创建代理对象，AspectJ 在编译或加载时直接修改字节码</text>
</svg>

**Spring AOP 实现方式**
```java
// Spring AOP 使用动态代理
@Service
public class UserService {
    public void saveUser(User user) {
        // 业务逻辑
    }
}

@Aspect
@Component
public class LogAspect {
    // Spring 在运行时为 UserService 创建代理对象
    @Before("execution(* com.example.service.UserService.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("执行方法: " + joinPoint.getSignature().getName());
    }
}

// Spring 容器中实际存储的是代理对象，而非原始对象
// UserService$$EnhancerBySpringCGLIB$$xxxxx (CGLIB 代理)
// 或 $Proxy123 (JDK 代理)
```

**AspectJ 实现方式**
```java
// AspectJ 直接修改字节码
@Aspect
public class LogAspect {
    // AspectJ 编译器会在编译时将切面逻辑织入到目标类的字节码中
    @Before("execution(* com.example.service.UserService.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("执行方法: " + joinPoint.getSignature().getName());
    }
}

// 编译后的 UserService.class 已经包含了切面逻辑
// 类似于：
public class UserService {
    public void saveUser(User user) {
        System.out.println("执行方法: saveUser"); // AspectJ 织入的代码
        // 原始业务逻辑
    }
}
```

**(2) 功能强度对比**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">支持的连接点类型对比</text>
<rect x="50" y="60" width="300" height="400" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="200" y="90" font-size="16" font-weight="bold" text-anchor="middle" fill="#1976d2">Spring AOP</text>
<text x="200" y="115" font-size="13" text-anchor="middle" fill="#666">(仅支持方法级别)</text>
<rect x="80" y="140" width="240" height="40" fill="#fff" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="200" y="165" font-size="14" text-anchor="middle" fill="#333">✓ 方法执行</text>
<rect x="80" y="195" width="240" height="40" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="200" y="220" font-size="14" text-anchor="middle" fill="#999">✗ 字段访问</text>
<rect x="80" y="250" width="240" height="40" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="200" y="275" font-size="14" text-anchor="middle" fill="#999">✗ 构造器执行</text>
<rect x="80" y="305" width="240" height="40" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="200" y="330" font-size="14" text-anchor="middle" fill="#999">✗ 静态初始化</text>
<rect x="80" y="360" width="240" height="40" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="200" y="385" font-size="14" text-anchor="middle" fill="#999">✗ 字段修改</text>
<text x="200" y="430" font-size="12" text-anchor="middle" fill="#666">适合 80% 的常见场景</text>
<rect x="450" y="60" width="300" height="400" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"></rect>
<text x="600" y="90" font-size="16" font-weight="bold" text-anchor="middle" fill="#f57c00">AspectJ</text>
<text x="600" y="115" font-size="13" text-anchor="middle" fill="#666">(全方位支持)</text>
<rect x="480" y="140" width="240" height="40" fill="#fff" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="600" y="165" font-size="14" text-anchor="middle" fill="#333">✓ 方法执行</text>
<rect x="480" y="195" width="240" height="40" fill="#fff" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="600" y="220" font-size="14" text-anchor="middle" fill="#333">✓ 字段访问</text>
<rect x="480" y="250" width="240" height="40" fill="#fff" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="600" y="275" font-size="14" text-anchor="middle" fill="#333">✓ 构造器执行</text>
<rect x="480" y="305" width="240" height="40" fill="#fff" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="600" y="330" font-size="14" text-anchor="middle" fill="#333">✓ 静态初始化</text>
<rect x="480" y="360" width="240" height="40" fill="#fff" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="600" y="385" font-size="14" text-anchor="middle" fill="#333">✓ 字段修改</text>
<text x="600" y="430" font-size="12" text-anchor="middle" fill="#666">功能全面但相对复杂</text>
</svg>

**Spring AOP 限制示例**
```java
@Aspect
@Component
public class SpringAopLimitations {

    // ✓ 支持：方法执行
    @Before("execution(* com.example.service.UserService.saveUser(..))")
    public void beforeMethod(JoinPoint joinPoint) {
        System.out.println("方法执行前");
    }

    // ✗ 不支持：字段访问（无法拦截）
    // @Before("get(* com.example.model.User.name)")  // 不支持
    // public void beforeFieldAccess() {}

    // ✗ 不支持：构造器执行（无法拦截）
    // @Before("execution(com.example.model.User.new(..))")  // 不支持
    // public void beforeConstructor() {}

    // ✗ 不支持：静态方法（需要特殊配置）
    // 只能通过 @Aspect("perthis(...)") 等高级特性实现
}
```

**AspectJ 完整支持示例**
```java
@Aspect
public class AspectJFullSupport {

    // ✓ 方法执行
    @Before("execution(* com.example.service.UserService.saveUser(..))")
    public void beforeMethod(JoinPoint joinPoint) {
        System.out.println("方法执行前");
    }

    // ✓ 字段访问
    @Before("get(* com.example.model.User.name)")
    public void beforeFieldGet(JoinPoint joinPoint) {
        System.out.println("字段读取前");
    }

    // ✓ 字段修改
    @Before("set(* com.example.model.User.name)")
    public void beforeFieldSet(JoinPoint joinPoint) {
        System.out.println("字段修改前");
    }

    // ✓ 构造器执行
    @Before("execution(com.example.model.User.new(..))")
    public void beforeConstructor(JoinPoint joinPoint) {
        System.out.println("对象创建前");
    }

    // ✓ 静态初始化
    @Before("staticinitialization(com.example.model.User)")
    public void beforeStaticInit(JoinPoint joinPoint) {
        System.out.println("静态初始化前");
    }
}
```

**(3) 性能对比**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">性能对比（执行时间）</text>
<line x1="100" y1="300" x2="700" y2="300" stroke="#333" stroke-width="2"></line>
<line x1="100" y1="80" x2="100" y2="300" stroke="#333" stroke-width="2"></line>
<text x="90" y="85" font-size="12" text-anchor="end" fill="#666">快</text>
<text x="90" y="305" font-size="12" text-anchor="end" fill="#666">慢</text>
<text x="250" y="330" font-size="14" font-weight="bold" text-anchor="middle" fill="#1976d2">Spring AOP</text>
<rect x="150" y="150" width="200" height="145" fill="#1976d2" opacity="0.7"></rect>
<text x="250" y="230" font-size="12" text-anchor="middle" fill="#fff">运行时代理创建</text>
<text x="250" y="250" font-size="12" text-anchor="middle" fill="#fff">+ 方法调用开销</text>
<text x="550" y="330" font-size="14" font-weight="bold" text-anchor="middle" fill="#f57c00">AspectJ</text>
<rect x="450" y="100" width="200" height="195" fill="#f57c00" opacity="0.7"></rect>
<text x="550" y="200" font-size="12" text-anchor="middle" fill="#fff">编译时织入</text>
<text x="550" y="220" font-size="12" text-anchor="middle" fill="#fff">无运行时开销</text>
<text x="250" y="180" font-size="24" font-weight="bold" text-anchor="middle" fill="#fff">~100ms</text>
<text x="550" y="130" font-size="24" font-weight="bold" text-anchor="middle" fill="#fff">~50ms</text>
<path d="M 350 225 L 440 180" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)" fill="none"></path>
<text x="395" y="195" font-size="12" fill="#4caf50" font-weight="bold">性能提升约 2倍</text>
</svg>

**性能差异原因：**

1.  **Spring AOP (运行时开销)**
    *   每次 Spring 容器启动时创建代理对象
    *   每次方法调用都经过代理层（额外的方法调用）
    *   JDK 代理：通过反射调用，性能损耗较大
    *   CGLIB 代理：通过子类继承，性能稍好但仍有开销

2.  **AspectJ (无运行时开销)**
    *   编译时或加载时就已完成织入
    *   切面代码直接嵌入到目标类中
    *   运行时无需代理，直接执行
    *   性能接近原生代码

**(4) 使用复杂度对比**

**Spring AOP (简单易用)**
```xml
<!-- Maven 依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

```java
// 只需两步即可使用
// 1. 启用 AOP
@SpringBootApplication
@EnableAspectJAutoProxy  // 可选，Spring Boot 自动配置
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 2. 创建切面
@Aspect
@Component
public class LogAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("执行方法: " + joinPoint.getSignature().getName());
    }
}
```

**AspectJ (功能强大但复杂)**
```xml
<!-- Maven 依赖 -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjrt</artifactId>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
</dependency>

<!-- Maven 插件配置（编译时织入） -->
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>aspectj-maven-plugin</artifactId>
    <version>1.14.0</version>
    <configuration>
        <complianceLevel>1.8</complianceLevel>
        <source>1.8</source>
        <target>1.8</target>
    </configuration>
    <executions>
        <execution>
            <goals>
                <goal>compile</goal>
                <goal>test-compile</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

```java
// 创建切面（语法相同，但配置复杂）
@Aspect
public class LogAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("执行方法: " + joinPoint.getSignature().getName());
    }
}

// 需要额外的编译配置或运行时参数
// 加载时织入需要 Java Agent：
// java -javaagent:path/to/aspectjweaver.jar -jar myapp.jar
```

**(5) 使用场景选择**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">使用场景选择指南</text>
<rect x="50" y="60" width="300" height="300" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"></rect>
<text x="200" y="90" font-size="16" font-weight="bold" text-anchor="middle" fill="#4caf50">选择 Spring AOP</text>
<text x="200" y="130" font-size="13" text-anchor="start" fill="#333">✓ 项目使用 Spring 框架</text>
<text x="200" y="160" font-size="13" text-anchor="start" fill="#333">✓ 仅需方法级别的拦截</text>
<text x="200" y="190" font-size="13" text-anchor="start" fill="#333">✓ 快速开发，无需复杂配置</text>
<text x="200" y="220" font-size="13" text-anchor="start" fill="#333">✓ 性能要求不是极致</text>
<text x="200" y="250" font-size="13" text-anchor="start" fill="#333">✓ 团队对 AOP 不太熟悉</text>
<rect x="70" y="280" width="260" height="60" fill="#fff" stroke="#4caf50" stroke-width="1" rx="3"></rect>
<text x="200" y="305" font-size="12" font-weight="bold" text-anchor="middle" fill="#4caf50">典型场景</text>
<text x="200" y="325" font-size="11" text-anchor="middle" fill="#333">日志记录、权限校验、事务管理</text>
<rect x="450" y="60" width="300" height="300" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"></rect>
<text x="600" y="90" font-size="16" font-weight="bold" text-anchor="middle" fill="#ff9800">选择 AspectJ</text>
<text x="600" y="130" font-size="13" text-anchor="start" fill="#333">✓ 需要字段/构造器拦截</text>
<text x="600" y="160" font-size="13" text-anchor="start" fill="#333">✓ 性能要求极高</text>
<text x="600" y="190" font-size="13" text-anchor="start" fill="#333">✓ 非 Spring 项目</text>
<text x="600" y="220" font-size="13" text-anchor="start" fill="#333">✓ 需要私有方法拦截</text>
<text x="600" y="250" font-size="13" text-anchor="start" fill="#333">✓ 复杂的切面逻辑</text>
<rect x="470" y="280" width="260" height="60" fill="#fff" stroke="#ff9800" stroke-width="1" rx="3"></rect>
<text x="600" y="305" font-size="12" font-weight="bold" text-anchor="middle" fill="#ff9800">典型场景</text>
<text x="600" y="325" font-size="11" text-anchor="middle" fill="#333">性能监控、对象追踪、安全框架</text>
</svg>

**(6) 完整对比示例**

```java
// ========== Spring AOP 示例 ==========
@SpringBootApplication
@EnableAspectJAutoProxy
public class SpringAopExample {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(SpringAopExample.class, args);
        UserService userService = context.getBean(UserService.class);

        // Spring AOP 通过代理实现
        System.out.println("代理类: " + userService.getClass().getName());
        // 输出：UserService$$EnhancerBySpringCGLIB$$xxxxx

        userService.saveUser(new User("张三"));
    }
}

@Aspect
@Component
class LogAspect {
    @Around("execution(* com.example.service.UserService.*(..))")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();
        System.out.println("Spring AOP - 耗时: " + (end - start) + "ms");
        return result;
    }
}

@Service
class UserService {
    public void saveUser(User user) {
        System.out.println("保存用户: " + user.getName());
    }
}

// ========== AspectJ 示例 ==========
// 需要配置 AspectJ 编译器或加载时织入
public class AspectJExample {
    public static void main(String[] args) {
        UserService userService = new UserService();

        // AspectJ 直接修改字节码，无代理
        System.out.println("类名: " + userService.getClass().getName());
        // 输出：UserService（原始类）

        userService.saveUser(new User("李四"));
    }
}

@Aspect
class LogAspect {
    @Around("execution(* com.example.service.UserService.*(..))")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();
        System.out.println("AspectJ - 耗时: " + (end - start) + "ms");
        return result;
    }
}

class UserService {
    public void saveUser(User user) {
        System.out.println("保存用户: " + user.getName());
    }
}
```

**(7) 混合使用 (Spring AOP + AspectJ)**

Spring 也支持使用 AspectJ 的语法和特性：

```java
// 方式 1：使用 AspectJ 的切点表达式语法（仍使用 Spring AOP 代理）
@Aspect
@Component
public class MixedAspect {
    // 使用 AspectJ 的 @within 注解
    @Before("@within(org.springframework.stereotype.Service)")
    public void beforeServiceMethod(JoinPoint joinPoint) {
        System.out.println("Service 方法执行前");
    }
}

// 方式 2：启用 AspectJ 的加载时织入（LTW）
@Configuration
@EnableLoadTimeWeaving(aspectjWeaving = EnableLoadTimeWeaving.AspectJWeaving.ENABLED)
public class AspectJConfig {
    // 需要配置 javaagent 参数：
    // java -javaagent:path/to/spring-instrument.jar -jar myapp.jar
}
```

**关键要点**

1.  **实现方式**
    *   Spring AOP：运行时动态代理（JDK 或 CGLIB）
    *   AspectJ：编译时或加载时字节码织入

2.  **功能范围**
    *   Spring AOP：仅支持方法级别的拦截
    *   AspectJ：支持字段、构造器、静态初始化等全方位拦截

3.  **性能**
    *   Spring AOP：有运行时代理开销，性能稍低
    *   AspectJ：无运行时开销，性能接近原生

4.  **依赖**
    *   Spring AOP：依赖 Spring 容器
    *   AspectJ：独立框架，可用于任何 Java 项目

5.  **易用性**
    *   Spring AOP：配置简单，开箱即用
    *   AspectJ：功能强大但配置复杂

6.  **选择建议**
    *   80% 的场景使用 Spring AOP 即可满足需求
    *   需要高性能或非方法级别拦截时选择 AspectJ
    *   Spring 项目可以混合使用两者的优点

**记忆口诀**

**"Spring 代理运行时，AspectJ 编译早织入；方法拦截 Spring 行，全面功能 AspectJ 强"**

*   **Spring 代理运行时**：Spring AOP 使用动态代理，运行时生效
*   **AspectJ 编译早织入**：AspectJ 在编译或加载时就完成织入
*   **方法拦截 Spring 行**：Spring AOP 仅支持方法级别拦截
*   **全面功能 AspectJ 强**：AspectJ 功能更全面强大

**实际项目选择口诀：**
*   **"Spring 项目用 Spring AOP，性能要求用 AspectJ"**
*   **"方法拦截够用就 Spring，字段构造选 AspectJ"**


### 22. Spring AOP 有哪些通知类型？

**核心答案**

Spring AOP 提供了 **5 种通知（Advice）类型**，用于在不同的时机执行切面逻辑：

| 通知类型 | 注解 | 执行时机 | 特点 | 常见用途 |
| :--- | :--- | :--- | :--- | :--- |
| **前置通知** | `@Before` | 方法执行前 | 无法阻止方法执行 | 参数校验、权限检查 |
| **后置通知** | `@After` | 方法执行后（finally） | 无论是否异常都会执行 | 资源释放、日志记录 |
| **返回通知** | `@AfterReturning` | 方法正常返回后 | 可以获取返回值 | 结果处理、缓存更新 |
| **异常通知** | `@AfterThrowing` | 方法抛出异常后 | 可以获取异常对象 | 异常处理、告警通知 |
| **环绕通知** | `@Around` | 方法执行前后 | 功能最强大，可控制方法执行 | 性能监控、事务管理 |

**详细说明**

**1. 通知类型执行流程图**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"></polygon>
</marker>
</defs>
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring AOP 通知执行流程</text>
<rect x="330" y="60" width="140" height="50" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="400" y="90" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">@Around 开始</text>
<line x1="400" y1="110" x2="400" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="330" y="140" width="140" height="50" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"></rect>
<text x="400" y="170" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">@Before</text>
<line x1="400" y1="190" x2="400" y2="220" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="330" y="220" width="140" height="50" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"></rect>
<text x="400" y="250" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">目标方法执行</text>
<line x1="470" y1="245" x2="520" y2="245" stroke="#666" stroke-width="2"></line>
<text x="495" y="240" font-size="12" text-anchor="middle" fill="#4caf50">成功</text>
<line x1="520" y1="245" x2="520" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="500" y="310" width="180" height="50" fill="#8bc34a" stroke="#689f38" stroke-width="2" rx="5"></rect>
<text x="590" y="340" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">@AfterReturning</text>
<line x1="330" y1="245" x2="280" y2="245" stroke="#666" stroke-width="2"></line>
<text x="305" y="240" font-size="12" text-anchor="middle" fill="#f44336">异常</text>
<line x1="280" y1="245" x2="280" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="120" y="310" width="180" height="50" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"></rect>
<text x="210" y="340" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">@AfterThrowing</text>
<line x1="590" y1="360" x2="590" y2="400" stroke="#666" stroke-width="2"></line>
<line x1="210" y1="360" x2="210" y2="400" stroke="#666" stroke-width="2"></line>
<line x1="210" y1="400" x2="590" y2="400" stroke="#666" stroke-width="2"></line>
<line x1="400" y1="400" x2="400" y2="430" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="330" y="430" width="140" height="50" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"></rect>
<text x="400" y="460" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">@After (finally)</text>
<line x1="400" y1="480" x2="400" y2="510" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="330" y="510" width="140" height="50" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="400" y="540" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">@Around 结束</text>
<rect x="50" y="50" width="220" height="100" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"></rect>
<text x="160" y="75" font-size="13" font-weight="bold" text-anchor="middle" fill="#f57c00">执行顺序</text>
<text x="160" y="100" font-size="11" text-anchor="middle" fill="#333">1. @Around (前)</text>
<text x="160" y="120" font-size="11" text-anchor="middle" fill="#333">2. @Before</text>
<text x="160" y="140" font-size="11" text-anchor="middle" fill="#333">3. 目标方法</text>
</svg>

**2. 各种通知类型详解**

**(1) @Before - 前置通知**

**执行时机：** 目标方法执行前

**特点：**
- 无法阻止目标方法的执行（除非抛出异常）
- 无法修改目标方法的参数
- 常用于参数校验、权限检查

```java
@Aspect
@Component
public class BeforeAdviceExample {

    /**
     * 前置通知 - 方法执行前记录日志
     */
    @Before("execution(* com.example.service.UserService.saveUser(..))")
    public void beforeSaveUser(JoinPoint joinPoint) {
        // 获取方法名
        String methodName = joinPoint.getSignature().getName();

        // 获取参数
        Object[] args = joinPoint.getArgs();

        System.out.println("【前置通知】准备执行方法: " + methodName);
        System.out.println("【前置通知】方法参数: " + Arrays.toString(args));
    }

    /**
     * 前置通知 - 权限校验
     */
    @Before("@annotation(com.example.annotation.RequirePermission)")
    public void checkPermission(JoinPoint joinPoint) {
        // 获取当前用户
        User currentUser = SecurityContextHolder.getCurrentUser();

        // 权限校验
        if (!currentUser.hasPermission("USER_SAVE")) {
            throw new PermissionDeniedException("无权限执行该操作");
        }

        System.out.println("【前置通知】权限校验通过");
    }

    /**
     * 前置通知 - 参数校验
     */
    @Before("execution(* com.example.service.*.save*(..)) && args(user)")
    public void validateUser(JoinPoint joinPoint, User user) {
        if (user == null) {
            throw new IllegalArgumentException("用户对象不能为空");
        }

        if (user.getName() == null || user.getName().isEmpty()) {
            throw new IllegalArgumentException("用户名不能为空");
        }

        System.out.println("【前置通知】参数校验通过");
    }
}
```

**(2) @After - 后置通知（最终通知）**

**执行时机：** 目标方法执行后（无论是否抛出异常）

**特点：**
- 类似于 finally 块，无论是否异常都会执行
- 无法获取方法返回值
- 无法获取异常对象
- 常用于资源释放、清理工作

```java
@Aspect
@Component
public class AfterAdviceExample {

    /**
     * 后置通知 - 清理资源
     */
    @After("execution(* com.example.service.*.*(..))")
    public void cleanupResources(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("【后置通知】方法 " + methodName + " 执行完成，清理资源");

        // 清理 ThreadLocal
        ThreadLocalContext.clear();

        // 关闭数据库连接（示例）
        // ConnectionHolder.releaseConnection();
    }

    /**
     * 后置通知 - 记录方法执行完成
     */
    @After("@annotation(com.example.annotation.Loggable)")
    public void logMethodComplete(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("【后置通知】方法 " + methodName + " 已执行完成（无论成功或失败）");
    }

    /**
     * 后置通知 - 统计方法调用次数
     */
    private final Map<String, AtomicInteger> methodCallCount = new ConcurrentHashMap<>();

    @After("execution(* com.example.service.*.*(..))")
    public void countMethodCalls(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().toShortString();

        methodCallCount.computeIfAbsent(methodName, k -> new AtomicInteger(0))
                       .incrementAndGet();

        System.out.println("【后置通知】方法 " + methodName + " 已被调用 "
                + methodCallCount.get(methodName) + " 次");
    }
}
```

**(3) @AfterReturning - 返回通知**

**执行时机：** 目标方法正常返回后（没有抛出异常）

**特点：**
- 可以获取方法的返回值
- 只有方法正常返回时才会执行
- 无法修改返回值（但可以对返回对象进行操作）
- 常用于结果处理、缓存更新

```java
@Aspect
@Component
public class AfterReturningAdviceExample {

    /**
     * 返回通知 - 获取方法返回值
     */
    @AfterReturning(
        pointcut = "execution(* com.example.service.UserService.getUser(..))",
        returning = "result"
    )
    public void afterReturningGetUser(JoinPoint joinPoint, Object result) {
        System.out.println("【返回通知】方法返回值: " + result);

        if (result instanceof User) {
            User user = (User) result;
            System.out.println("【返回通知】查询到用户: " + user.getName());
        }
    }

    /**
     * 返回通知 - 更新缓存
     */
    @Autowired
    private CacheManager cacheManager;

    @AfterReturning(
        pointcut = "execution(* com.example.service.UserService.saveUser(..))",
        returning = "savedUser"
    )
    public void updateCacheAfterSave(JoinPoint joinPoint, User savedUser) {
        System.out.println("【返回通知】用户保存成功，更新缓存");

        // 将新保存的用户放入缓存
        cacheManager.put("user:" + savedUser.getId(), savedUser);
    }

    /**
     * 返回通知 - 记录操作日志
     */
    @AfterReturning(
        pointcut = "execution(* com.example.service.UserService.deleteUser(..))",
        returning = "deleted"
    )
    public void logAfterDelete(JoinPoint joinPoint, boolean deleted) {
        if (deleted) {
            Object[] args = joinPoint.getArgs();
            Long userId = (Long) args;

            System.out.println("【返回通知】用户 " + userId + " 删除成功");

            // 记录操作日志
            operationLogService.log("删除用户", "用户ID: " + userId);
        }
    }

    /**
     * 返回通知 - 数据脱敏（修改返回对象的属性）
     */
    @AfterReturning(
        pointcut = "execution(* com.example.service.UserService.getUserList(..))",
        returning = "userList"
    )
    public void maskSensitiveData(JoinPoint joinPoint, List<User> userList) {
        System.out.println("【返回通知】对返回的用户列表进行脱敏处理");

        for (User user : userList) {
            // 手机号脱敏：138****1234
            if (user.getPhone() != null) {
                String phone = user.getPhone();
                user.setPhone(phone.substring(0, 3) + "****" + phone.substring(7));
            }

            // 身份证号脱敏：110************123
            if (user.getIdCard() != null) {
                String idCard = user.getIdCard();
                user.setIdCard(idCard.substring(0, 3) + "************" + idCard.substring(15));
            }
        }
    }
}
```

**(4) @AfterThrowing - 异常通知**

**执行时机：** 目标方法抛出异常后

**特点：**
- 只有方法抛出异常时才会执行
- 可以获取异常对象
- 可以根据异常类型进行不同处理
- 常用于异常处理、告警通知

```java
@Aspect
@Component
public class AfterThrowingAdviceExample {

    /**
     * 异常通知 - 捕获所有异常
     */
    @AfterThrowing(
        pointcut = "execution(* com.example.service.*.*(..))",
        throwing = "ex"
    )
    public void handleException(JoinPoint joinPoint, Exception ex) {
        String methodName = joinPoint.getSignature().toShortString();
        System.err.println("【异常通知】方法 " + methodName + " 抛出异常: " + ex.getMessage());

        // 记录异常日志
        logger.error("方法执行异常", ex);
    }

    /**
     * 异常通知 - 捕获特定类型异常
     */
    @AfterThrowing(
        pointcut = "execution(* com.example.service.UserService.*(..))",
        throwing = "ex"
    )
    public void handleBusinessException(JoinPoint joinPoint, BusinessException ex) {
        System.err.println("【异常通知】业务异常: " + ex.getErrorCode() + " - " + ex.getMessage());

        // 发送告警通知
        alertService.sendAlert("业务异常", ex.getMessage());
    }

    /**
     * 异常通知 - 数据库异常处理
     */
    @AfterThrowing(
        pointcut = "execution(* com.example.service.*.*(..))",
        throwing = "ex"
    )
    public void handleDataAccessException(JoinPoint joinPoint, DataAccessException ex) {
        System.err.println("【异常通知】数据库操作异常");

        String methodName = joinPoint.getSignature().getName();

        // 根据异常类型进行不同处理
        if (ex instanceof DuplicateKeyException) {
            System.err.println("【异常通知】数据重复");
        } else if (ex instanceof DataIntegrityViolationException) {
            System.err.println("【异常通知】数据完整性约束违反");
        }

        // 发送告警邮件
        emailService.sendAlert("数据库异常", methodName, ex);
    }

    /**
     * 异常通知 - 异常统计
     */
    private final Map<String, AtomicInteger> exceptionCount = new ConcurrentHashMap<>();

    @AfterThrowing(
        pointcut = "execution(* com.example.service.*.*(..))",
        throwing = "ex"
    )
    public void countExceptions(JoinPoint joinPoint, Throwable ex) {
        String exceptionType = ex.getClass().getSimpleName();

        exceptionCount.computeIfAbsent(exceptionType, k -> new AtomicInteger(0))
                      .incrementAndGet();

        System.err.println("【异常通知】异常类型 " + exceptionType + " 已发生 "
                + exceptionCount.get(exceptionType) + " 次");
    }
}
```

**(5) @Around - 环绕通知**

**执行时机：** 目标方法执行前后

**特点：**
- 功能最强大，可以完全控制方法的执行
- 可以决定是否执行目标方法
- 可以修改方法参数和返回值
- 必须调用 `ProceedingJoinPoint.proceed()` 来执行目标方法
- 必须返回方法的执行结果
- 常用于性能监控、事务管理、缓存处理

```java
@Aspect
@Component
public class AroundAdviceExample {

    /**
     * 环绕通知 - 性能监控
     */
    @Around("execution(* com.example.service.*.*(..))")
    public Object monitorPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().toShortString();

        // 方法执行前
        System.out.println("【环绕通知】开始执行方法: " + methodName);
        long startTime = System.currentTimeMillis();

        Object result = null;
        try {
            // 执行目标方法
            result = joinPoint.proceed();

            // 方法执行后
            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;

            System.out.println("【环绕通知】方法 " + methodName + " 执行成功，耗时: " + executionTime + "ms");

            // 性能告警：超过 1 秒
            if (executionTime > 1000) {
                System.err.println("【环绕通知】警告：方法执行时间过长！");
            }

        } catch (Throwable ex) {
            long endTime = System.currentTimeMillis();
            System.err.println("【环绕通知】方法 " + methodName + " 执行失败，耗时: "
                    + (endTime - startTime) + "ms");
            throw ex;
        }

        return result;
    }

    /**
     * 环绕通知 - 缓存处理
     */
    @Autowired
    private CacheManager cacheManager;

    @Around("@annotation(com.example.annotation.Cacheable)")
    public Object cacheAround(ProceedingJoinPoint joinPoint) throws Throwable {
        // 生成缓存 key
        String cacheKey = generateCacheKey(joinPoint);

        // 先查缓存
        Object cachedResult = cacheManager.get(cacheKey);
        if (cachedResult != null) {
            System.out.println("【环绕通知】缓存命中: " + cacheKey);
            return cachedResult;
        }

        // 缓存未命中，执行方法
        System.out.println("【环绕通知】缓存未命中，执行方法");
        Object result = joinPoint.proceed();

        // 将结果放入缓存
        cacheManager.put(cacheKey, result);
        System.out.println("【环绕通知】结果已缓存: " + cacheKey);

        return result;
    }

    /**
     * 环绕通知 - 参数修改
     */
    @Around("execution(* com.example.service.UserService.saveUser(..)) && args(user)")
    public Object modifyArguments(ProceedingJoinPoint joinPoint, User user) throws Throwable {
        System.out.println("【环绕通知】修改参数前: " + user.getName());

        // 修改参数：去除用户名两端空格
        if (user.getName() != null) {
            user.setName(user.getName().trim());
        }

        // 设置默认值
        if (user.getCreateTime() == null) {
            user.setCreateTime(new Date());
        }

        System.out.println("【环绕通知】修改参数后: " + user.getName());

        // 执行方法
        return joinPoint.proceed(new Object[]{user});
    }

    /**
     * 环绕通知 - 返回值修改
     */
    @Around("execution(* com.example.service.UserService.getUser(..))")
    public Object modifyReturnValue(ProceedingJoinPoint joinPoint) throws Throwable {
        // 执行目标方法
        Object result = joinPoint.proceed();

        if (result instanceof User) {
            User user = (User) result;
            System.out.println("【环绕通知】原始返回值: " + user);

            // 修改返回值：脱敏处理
            if (user.getPhone() != null) {
                user.setPhone(maskPhone(user.getPhone()));
            }

            System.out.println("【环绕通知】修改后返回值: " + user);
        }

        return result;
    }

    /**
     * 环绕通知 - 控制方法执行（权限校验）
     */
    @Around("@annotation(com.example.annotation.RequirePermission)")
    public Object checkPermissionAndExecute(ProceedingJoinPoint joinPoint) throws Throwable {
        // 获取当前用户
        User currentUser = SecurityContextHolder.getCurrentUser();

        // 权限校验
        if (!currentUser.hasPermission("ADMIN")) {
            System.err.println("【环绕通知】权限不足，拒绝执行方法");
            throw new PermissionDeniedException("无权限执行该操作");
        }

        System.out.println("【环绕通知】权限校验通过，执行方法");

        // 执行目标方法
        return joinPoint.proceed();
    }

    /**
     * 环绕通知 - 重试机制
     */
    @Around("@annotation(com.example.annotation.Retry)")
    public Object retryOnFailure(ProceedingJoinPoint joinPoint) throws Throwable {
        int maxRetries = 3;
        int retryCount = 0;

        while (retryCount < maxRetries) {
            try {
                System.out.println("【环绕通知】第 " + (retryCount + 1) + " 次尝试执行方法");

                // 执行目标方法
                Object result = joinPoint.proceed();

                System.out.println("【环绕通知】方法执行成功");
                return result;

            } catch (Exception ex) {
                retryCount++;

                if (retryCount >= maxRetries) {
                    System.err.println("【环绕通知】重试 " + maxRetries + " 次后仍然失败");
                    throw ex;
                }

                System.err.println("【环绕通知】执行失败，" + (maxRetries - retryCount) + " 次重试机会");

                // 等待一段时间后重试
                Thread.sleep(1000 * retryCount);
            }
        }

        throw new RuntimeException("方法执行失败");
    }
}```

**3. 通知执行顺序验证**

```java
@Aspect
@Component
@Order(1)  // 设置切面优先级
public class AdviceOrderExample {

    @Around("execution(* com.example.service.UserService.testOrder(..))")
    public Object aroundAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("1. 【环绕通知】方法执行前");

        Object result = joinPoint.proceed();

        System.out.println("5. 【环绕通知】方法执行后");
        return result;
    }

    @Before("execution(* com.example.service.UserService.testOrder(..))")
    public void beforeAdvice(JoinPoint joinPoint) {
        System.out.println("2. 【前置通知】方法执行前");
    }

    @AfterReturning("execution(* com.example.service.UserService.testOrder(..))")
    public void afterReturningAdvice(JoinPoint joinPoint) {
        System.out.println("3. 【返回通知】方法正常返回后");
    }

    @After("execution(* com.example.service.UserService.testOrder(..))")
    public void afterAdvice(JoinPoint joinPoint) {
        System.out.println("4. 【后置通知】方法执行后（finally）");
    }

    @AfterThrowing("execution(* com.example.service.UserService.testOrder(..))")
    public void afterThrowingAdvice(JoinPoint joinPoint) {
        System.out.println("X. 【异常通知】方法抛出异常后（本例不会执行）");
    }
}

@Service
public class UserService {
    public void testOrder() {
        System.out.println("   ========== 目标方法执行 ==========");
    }
}

// 输出结果：
// 1. 【环绕通知】方法执行前
// 2. 【前置通知】方法执行前
//    ========== 目标方法执行 ==========
// 3. 【返回通知】方法正常返回后
// 4. 【后置通知】方法执行后（finally）
// 5. 【环绕通知】方法执行后
```

**4. 通知类型对比表**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">5 种通知类型功能对比</text>
<rect x="50" y="60" width="700" height="50" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="3"></rect>
<text x="120" y="90" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">通知类型</text>
<text x="270" y="90" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">获取参数</text>
<text x="390" y="90" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">获取返回值</text>
<text x="510" y="90" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">获取异常</text>
<text x="630" y="90" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">控制执行</text>
<rect x="50" y="110" width="700" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="1"></rect>
<text x="120" y="145" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">@Before</text>
<text x="270" y="145" font-size="12" text-anchor="middle" fill="#4caf50">✓</text>
<text x="390" y="145" font-size="12" text-anchor="middle" fill="#f44336">✗</text>
<text x="510" y="145" font-size="12" text-anchor="middle" fill="#f44336">✗</text>
<text x="630" y="145" font-size="12" text-anchor="middle" fill="#f44336">✗</text>
<rect x="50" y="170" width="700" height="60" fill="#fff" stroke="#1976d2" stroke-width="1"></rect>
<text x="120" y="205" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">@After</text>
<text x="270" y="205" font-size="12" text-anchor="middle" fill="#4caf50">✓</text>
<text x="390" y="205" font-size="12" text-anchor="middle" fill="#f44336">✗</text>
<text x="510" y="205" font-size="12" text-anchor="middle" fill="#f44336">✗</text>
<text x="630" y="205" font-size="12" text-anchor="middle" fill="#f44336">✗</text>
<rect x="50" y="230" width="700" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="1"></rect>
<text x="120" y="265" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">@AfterReturning</text>
<text x="270" y="265" font-size="12" text-anchor="middle" fill="#4caf50">✓</text>
<text x="390" y="265" font-size="12" text-anchor="middle" fill="#4caf50">✓</text>
<text x="510" y="265" font-size="12" text-anchor="middle" fill="#f44336">✗</text>
<text x="630" y="265" font-size="12" text-anchor="middle" fill="#f44336">✗</text>
<rect x="50" y="290" width="700" height="60" fill="#fff" stroke="#1976d2" stroke-width="1"></rect>
<text x="120" y="325" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">@AfterThrowing</text>
<text x="270" y="325" font-size="12" text-anchor="middle" fill="#4caf50">✓</text>
<text x="390" y="325" font-size="12" text-anchor="middle" fill="#f44336">✗</text>
<text x="510" y="325" font-size="12" text-anchor="middle" fill="#4caf50">✓</text>
<text x="630" y="325" font-size="12" text-anchor="middle" fill="#f44336">✗</text>
<rect x="50" y="350" width="700" height="60" fill="#fff9c4" stroke="#fbc02d" stroke-width="2"></rect>
<text x="120" y="385" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">@Around</text>
<text x="270" y="385" font-size="12" text-anchor="middle" fill="#4caf50">✓</text>
<text x="390" y="385" font-size="12" text-anchor="middle" fill="#4caf50">✓</text>
<text x="510" y="385" font-size="12" text-anchor="middle" fill="#4caf50">✓</text>
<text x="630" y="385" font-size="12" text-anchor="middle" fill="#4caf50">✓</text>
<text x="400" y="430" font-size="12" text-anchor="middle" fill="#f57c00" font-weight="bold">@Around 是功能最强大的通知类型</text>
</svg>

**5. 实际应用示例**

```java
/**
 * 综合示例：用户服务切面
 */
@Aspect
@Component
@Slf4j
public class UserServiceAspect {

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private OperationLogService operationLogService;

    // 1. 前置通知 - 参数校验
    @Before("execution(* com.example.service.UserService.save*(..)) && args(user)")
    public void validateUser(User user) {
        log.info("【前置通知】校验用户参数");

        if (user.getName() == null || user.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("用户名不能为空");
        }

        if (user.getAge() != null && (user.getAge() < 0 || user.getAge() > 150)) {
            throw new IllegalArgumentException("年龄必须在 0-150 之间");
        }
    }

    // 2. 环绕通知 - 性能监控 + 缓存
    @Around("execution(* com.example.service.UserService.getUserById(..))")
    public Object getUserWithCache(ProceedingJoinPoint joinPoint) throws Throwable {
        Long userId = (Long) joinPoint.getArgs();
        String cacheKey = "user:" + userId;

        // 性能监控 - 开始
        long startTime = System.currentTimeMillis();

        // 缓存处理
        Object cachedUser = cacheManager.get(cacheKey);
        if (cachedUser != null) {
            log.info("【环绕通知】缓存命中，耗时: {}ms",
                    System.currentTimeMillis() - startTime);
            return cachedUser;
        }

        // 执行方法
        Object result = joinPoint.proceed();

        // 缓存结果
        cacheManager.put(cacheKey, result);

        // 性能监控 - 结束
        long executionTime = System.currentTimeMillis() - startTime;
        log.info("【环绕通知】方法执行完成，耗时: {}ms", executionTime);

        return result;
    }

    // 3. 返回通知 - 记录操作日志
    @AfterReturning(
        pointcut = "execution(* com.example.service.UserService.save*(..))",
        returning = "savedUser"
    )
    public void logAfterSave(JoinPoint joinPoint, User savedUser) {
        log.info("【返回通知】用户保存成功: {}", savedUser);

        // 记录操作日志
        operationLogService.log(
            "保存用户",
            "用户ID: " + savedUser.getId() + ", 用户名: " + savedUser.getName()
        );

        // 清除相关缓存
        cacheManager.evict("userList");
    }

    // 4. 异常通知 - 异常处理 + 告警
    @AfterThrowing(
        pointcut = "execution(* com.example.service.UserService.*(..))",
        throwing = "ex"
    )
    public void handleException(JoinPoint joinPoint, Exception ex) {
        String methodName = joinPoint.getSignature().toShortString();
        log.error("【异常通知】方法 {} 执行异常", methodName, ex);

        // 发送告警
        if (ex instanceof DataAccessException) {
            alertService.sendAlert("数据库异常", methodName + ": " + ex.getMessage());
        }
    }

    // 5. 后置通知 - 清理资源
    @After("execution(* com.example.service.UserService.*(..))")
    public void cleanup(JoinPoint joinPoint) {
        log.info("【后置通知】清理资源");

        // 清理 ThreadLocal
        UserContext.clear();
    }
}
```

**关键要点**

1.  **5 种通知类型**
    *   `@Before`：前置通知，方法执行前
    *   `@After`：后置通知，方法执行后（finally）
    *   `@AfterReturning`：返回通知，方法正常返回后
    *   `@AfterThrowing`：异常通知，方法抛出异常后
    *   `@Around`：环绕通知，方法执行前后

2.  **执行顺序**
    *   @Around（前） → @Before → 目标方法 → @AfterReturning/@AfterThrowing → @After → @Around（后）

3.  **功能强度**
    *   `@Around` 最强大：可控制方法执行、修改参数和返回值
    *   `@AfterReturning` 可获取返回值
    *   `@AfterThrowing` 可获取异常对象
    *   `@Before` 和 `@After` 功能相对简单

4.  **使用建议**
    *   简单场景用 `@Before`、`@After`
    *   需要处理返回值用 `@AfterReturning`
    *   需要处理异常用 `@AfterThrowing`
    *   复杂场景（性能监控、缓存、事务）用 `@Around`

5.  **注意事项**
    *   `@Around` 必须调用 `proceed()` 并返回结果
    *   `@After` 类似 finally，无论是否异常都会执行
    *   `@AfterReturning` 和 `@AfterThrowing` 互斥（只会执行一个）
    *   多个切面时可以用 `@Order` 控制优先级

**记忆口诀**

**"前置校验在开头，后置清理是 finally；返回处理拿结果，异常通知捕错误；环绕通知最强大，性能监控它最佳"**

-   **前置校验在开头**：@Before 用于参数校验、权限检查
-   **后置清理是 finally**：@After 无论如何都会执行，用于资源清理
-   **返回处理拿结果**：@AfterReturning 可以获取方法返回值
-   **异常通知捕错误**：@AfterThrowing 捕获异常进行处理
-   **环绕通知最强大**：@Around 功能最全，可控制整个方法执行流程
-   **性能监控它最佳**：性能监控、缓存、事务等复杂场景首选 @Around

**执行顺序口诀：**
-   **"环前前，中间转，返异后，环后完"**
    -   环前：@Around 前半部分
    -   前：@Before
    -   中间转：目标方法
    -   返异：@AfterReturning 或 @AfterThrowing（二选一）
    -   后：@After
    -   环后完：@Around 后半部分


### 23. Spring AOP 的实现原理是什么？

**核心答案**

Spring AOP 的实现原理基于 **动态代理模式**，在运行时为目标对象创建代理对象，通过代理对象来拦截方法调用并执行切面逻辑。

**核心机制：**

| 实现方式 | 使用条件 | 代理对象 | 原理 |
| :--- | :--- | :--- | :--- |
| **JDK 动态代理** | 目标对象实现了接口 | 实现相同接口的代理类 | 基于 Java 反射机制 |
| **CGLIB 代理** | 目标对象没有实现接口或强制使用 | 目标类的子类 | 基于字节码生成技术（ASM） |

**实现流程：**
1. Spring 容器启动时，扫描所有带有 `@Aspect` 注解的切面类。
2. 解析切面类中的切点表达式（Pointcut）和通知（Advice）。
3. 为匹配切点表达式的 Bean 创建代理对象。
4. 将代理对象放入 Spring 容器，替换原始 Bean。
5. 当调用代理对象的方法时，先执行切面逻辑，再调用目标方法。

**详细说明**

**1. Spring AOP 整体架构**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"></polygon>
</marker>
</defs>
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring AOP 实现原理架构图</text>
<rect x="50" y="60" width="700" height="500" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="5"></rect>
<rect x="80" y="90" width="200" height="80" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"></rect>
<text x="180" y="120" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">1. 切面定义</text>
<text x="180" y="145" font-size="12" text-anchor="middle" fill="#fff">@Aspect</text>
<text x="180" y="165" font-size="12" text-anchor="middle" fill="#fff">Pointcut + Advice</text>
<rect x="320" y="90" width="200" height="80" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="420" y="120" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">2. 目标对象</text>
<text x="420" y="145" font-size="12" text-anchor="middle" fill="#fff">@Service / @Component</text>
<text x="420" y="165" font-size="12" text-anchor="middle" fill="#fff">业务 Bean</text>
<rect x="560" y="90" width="160" height="80" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"></rect>
<text x="640" y="120" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">3. Spring 容器</text>
<text x="640" y="145" font-size="12" text-anchor="middle" fill="#fff">BeanFactory</text>
<text x="640" y="165" font-size="12" text-anchor="middle" fill="#fff">BeanPostProcessor</text>
<line x1="280" y1="130" x2="310" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<line x1="520" y1="130" x2="550" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="200" y="220" width="400" height="100" fill="#fff3e0" stroke="#ff9800" stroke-width="3" rx="5"></rect>
<text x="400" y="250" font-size="16" font-weight="bold" text-anchor="middle" fill="#f57c00">代理对象创建过程</text>
<text x="400" y="275" font-size="13" text-anchor="middle" fill="#333">ProxyFactory.getProxy()</text>
<text x="250" y="300" font-size="12" text-anchor="middle" fill="#333">JDK Proxy</text>
<text x="400" y="300" font-size="12" text-anchor="middle" fill="#666">or</text>
<text x="550" y="300" font-size="12" text-anchor="middle" fill="#333">CGLIB Proxy</text>
<line x1="400" y1="170" x2="400" y2="210" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="150" y="360" width="200" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="250" y="390" font-size="14" font-weight="bold" text-anchor="middle" fill="#1976d2">JDK 动态代理</text>
<rect x="170" y="410" width="160" height="40" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"></rect>
<text x="250" y="435" font-size="11" text-anchor="middle" fill="#333">Proxy.newProxyInstance()</text>
<rect x="170" y="460" width="160" height="40" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"></rect>
<text x="250" y="485" font-size="11" text-anchor="middle" fill="#333">InvocationHandler</text>
<rect x="450" y="360" width="200" height="150" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"></rect>
<text x="550" y="390" font-size="14" font-weight="bold" text-anchor="middle" fill="#ff9800">CGLIB 代理</text>
<rect x="470" y="410" width="160" height="40" fill="#fff" stroke="#ff9800" stroke-width="1" rx="3"></rect>
<text x="550" y="435" font-size="11" text-anchor="middle" fill="#333">Enhancer.create()</text>
<rect x="470" y="460" width="160" height="40" fill="#fff" stroke="#ff9800" stroke-width="1" rx="3"></rect>
<text x="550" y="485" font-size="11" text-anchor="middle" fill="#333">MethodInterceptor</text>
<line x1="250" y1="320" x2="250" y2="350" stroke="#1976d2" stroke-width="2" marker-end="url(#arrowhead)"></line>
<line x1="550" y1="320" x2="550" y2="350" stroke="#ff9800" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="250" y="530" width="300" height="50" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"></rect>
<text x="400" y="560" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">代理对象放入 Spring 容器，替换原始 Bean</text>
<line x1="250" y1="510" x2="400" y2="520" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<line x1="550" y1="510" x2="400" y2="520" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
</svg>

**2. 核心组件说明**

**(1) ProxyFactory - 代理工厂**

ProxyFactory 是 Spring AOP 的核心类，负责创建代理对象。

```java
// ProxyFactory 的使用示例
public class ProxyFactoryExample {

    public static void main(String[] args) {
        // 1. 创建目标对象
        UserService target = new UserServiceImpl();

        // 2. 创建 ProxyFactory
        ProxyFactory proxyFactory = new ProxyFactory();
        proxyFactory.setTarget(target);

        // 3. 添加通知（Advice）
        proxyFactory.addAdvice(new MethodBeforeAdvice() {
            @Override
            public void before(Method method, Object[] args, Object target) throws Throwable {
                System.out.println("方法执行前: " + method.getName());
            }
        });

        // 4. 创建代理对象
        UserService proxy = (UserService) proxyFactory.getProxy();

        // 5. 调用代理对象的方法
        proxy.saveUser(new User("张三"));
    }
}
```

**(2) AdvisedSupport - 配置支持**

AdvisedSupport 是 ProxyFactory 的父类，存储 AOP 配置信息。

```java
public class AdvisedSupport {
    // 目标对象
    private Object target;

    // 目标类实现的接口
    private Class<?>[] interfaces;

    // 通知列表
    private List<Advisor> advisors = new ArrayList<>();

    // 是否使用 CGLIB 代理
    private boolean proxyTargetClass = false;

    // 是否优化代理
    private boolean optimize = false;

    // 是否暴露代理对象
    private boolean exposeProxy = false;

    // ... 其他配置
}
```

**(3) AopProxy - 代理接口**

AopProxy 是创建代理对象的接口，有两个实现类：

```java
/**
 * AOP 代理接口
 */
public interface AopProxy {
    /**
     * 创建代理对象
     */
    Object getProxy();

    /**
     * 创建代理对象（指定类加载器）
     */
    Object getProxy(ClassLoader classLoader);
}

/**
 * JDK 动态代理实现
 */
public class JdkDynamicAopProxy implements AopProxy, InvocationHandler {

    private final AdvisedSupport advised;

    public JdkDynamicAopProxy(AdvisedSupport config) {
        this.advised = config;
    }

    @Override
    public Object getProxy() {
        return getProxy(ClassUtils.getDefaultClassLoader());
    }

    @Override
    public Object getProxy(ClassLoader classLoader) {
        // 使用 JDK 动态代理创建代理对象
        return Proxy.newProxyInstance(
            classLoader,
            this.advised.getProxiedInterfaces(),
            this  // InvocationHandler
        );
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 获取拦截器链
        List<Object> chain = this.advised.getInterceptorsAndDynamicInterceptionAdvice(method);

        if (chain.isEmpty()) {
            // 没有拦截器，直接调用目标方法
            return method.invoke(this.advised.getTarget(), args);
        } else {
            // 创建方法调用对象
            MethodInvocation invocation = new ReflectiveMethodInvocation(
                proxy, this.advised.getTarget(), method, args, chain
            );

            // 执行拦截器链
            return invocation.proceed();
        }
    }
}

/**
 * CGLIB 代理实现
 */
public class CglibAopProxy implements AopProxy {

    private final AdvisedSupport advised;

    public CglibAopProxy(AdvisedSupport config) {
        this.advised = config;
    }

    @Override
    public Object getProxy() {
        return getProxy(ClassUtils.getDefaultClassLoader());
    }

    @Override
    public Object getProxy(ClassLoader classLoader) {
        // 创建 CGLIB Enhancer
        Enhancer enhancer = new Enhancer();

        // 设置父类（目标类）
        enhancer.setSuperclass(this.advised.getTargetClass());

        // 设置回调
        enhancer.setCallback(new DynamicAdvisedInterceptor(this.advised));

        // 创建代理对象
        return enhancer.create();
    }

    /**
     * CGLIB 方法拦截器
     */
    private static class DynamicAdvisedInterceptor implements MethodInterceptor {

        private final AdvisedSupport advised;

        public DynamicAdvisedInterceptor(AdvisedSupport advised) {
            this.advised = advised;
        }

        @Override
        public Object intercept(Object proxy, Method method, Object[] args,
                                MethodProxy methodProxy) throws Throwable {
            // 获取拦截器链
            List<Object> chain = this.advised.getInterceptorsAndDynamicInterceptionAdvice(method);

            if (chain.isEmpty()) {
                // 没有拦截器，直接调用目标方法
                return methodProxy.invoke(this.advised.getTarget(), args);
            } else {
                // 创建方法调用对象
                MethodInvocation invocation = new CglibMethodInvocation(
                    proxy, this.advised.getTarget(), method, args, chain, methodProxy
                );

                // 执行拦截器链
                return invocation.proceed();
            }
        }
    }
}```

**3. 代理对象创建流程**

<svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"></polygon>
</marker>
</defs>
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring AOP 代理对象创建流程</text>
<rect x="250" y="60" width="300" height="50" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"></rect>
<text x="400" y="90" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">1. Spring 容器启动</text>
<line x1="400" y1="110" x2="400" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="250" y="140" width="300" height="50" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="400" y="170" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">2. BeanPostProcessor 处理</text>
<line x1="400" y1="190" x2="400" y2="220" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="250" y="220" width="300" height="50" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"></rect>
<text x="400" y="250" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">3. 判断是否需要创建代理</text>
<line x1="400" y1="270" x2="400" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<path d="M 250 325 L 400 300 L 550 325 L 400 350 Z" fill="#fff9c4" stroke="#fbc02d" stroke-width="2"></path>
<text x="400" y="330" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">是否匹配切点表达式?</text>
<line x1="550" y1="325" x2="650" y2="325" stroke="#f44336" stroke-width="2"></line>
<text x="600" y="320" font-size="11" fill="#f44336">否</text>
<rect x="650" y="305" width="120" height="40" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="710" y="330" font-size="11" text-anchor="middle" fill="#333">返回原始 Bean</text>
<line x1="400" y1="350" x2="400" y2="380" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"></line>
<text x="450" y="370" font-size="11" fill="#4caf50">是</text>
<rect x="250" y="380" width="300" height="50" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"></rect>
<text x="400" y="410" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">4. 选择代理方式</text>
<line x1="400" y1="430" x2="400" y2="460" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<path d="M 250 485 L 400 460 L 550 485 L 400 510 Z" fill="#e1f5fe" stroke="#0277bd" stroke-width="2"></path>
<text x="400" y="490" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">是否实现接口?</text>
<line x1="250" y1="485" x2="150" y2="485" stroke="#1976d2" stroke-width="2"></line>
<text x="200" y="480" font-size="11" fill="#1976d2">是</text>
<rect x="30" y="550" width="240" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="150" y="575" font-size="13" font-weight="bold" text-anchor="middle" fill="#1976d2">5a. JDK 动态代理</text>
<text x="150" y="600" font-size="11" text-anchor="middle" fill="#333">Proxy.newProxyInstance()</text>
<text x="150" y="620" font-size="11" text-anchor="middle" fill="#333">实现 InvocationHandler</text>
<line x1="150" y1="485" x2="150" y2="540" stroke="#1976d2" stroke-width="2" marker-end="url(#arrowhead)"></line>
<line x1="550" y1="485" x2="650" y2="485" stroke="#ff9800" stroke-width="2"></line>
<text x="600" y="480" font-size="11" fill="#ff9800">否</text>
<rect x="530" y="550" width="240" height="80" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"></rect>
<text x="650" y="575" font-size="13" font-weight="bold" text-anchor="middle" fill="#ff9800">5b. CGLIB 代理</text>
<text x="650" y="600" font-size="11" text-anchor="middle" fill="#333">Enhancer.create()</text>
<text x="650" y="620" font-size="11" text-anchor="middle" fill="#333">实现 MethodInterceptor</text>
<line x1="650" y1="485" x2="650" y2="540" stroke="#ff9800" stroke-width="2" marker-end="url(#arrowhead)"></line>
<line x1="150" y1="630" x2="150" y2="660" stroke="#666" stroke-width="2"></line>
<line x1="650" y1="630" x2="650" y2="660" stroke="#666" stroke-width="2"></line>
<line x1="150" y1="660" x2="650" y2="660" stroke="#666" stroke-width="2"></line>
<line x1="400" y1="660" x2="400" y2="680" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="250" y="680" width="300" height="50" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"></rect>
<text x="400" y="710" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">6. 返回代理对象</text>
</svg>

**4. 关键代码实现**

**(1) AbstractAutoProxyCreator - 自动代理创建器**

这是 Spring AOP 最核心的类，负责在 Bean 初始化时创建代理对象。

```java
/**
 * 自动代理创建器（简化版）
 */
public abstract class AbstractAutoProxyCreator implements BeanPostProcessor {

    /**
     * Bean 初始化后处理
     */
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        if (bean != null) {
            // 1. 获取缓存的 key
            Object cacheKey = getCacheKey(bean.getClass(), beanName);

            // 2. 判断是否需要创建代理
            if (shouldProxy(bean, beanName)) {
                // 3. 创建代理对象
                return createProxy(bean.getClass(), beanName, null, new SingletonTargetSource(bean));
            }
        }

        // 不需要代理，返回原始 Bean
        return bean;
    }

    /**
     * 判断是否需要创建代理
     */
    protected boolean shouldProxy(Object bean, String beanName) {
        // 1. 是否是基础设施类（Advice、Pointcut 等）
        if (isInfrastructureClass(bean.getClass())) {
            return false;
        }

        // 2. 是否应该跳过
        if (shouldSkip(bean.getClass(), beanName)) {
            return false;
        }

        // 3. 获取所有的 Advisor（切面）
        Object[] specificInterceptors = getAdvicesAndAdvisorsForBean(bean.getClass(), beanName, null);

        // 4. 如果有匹配的 Advisor，则需要创建代理
        return specificInterceptors != DO_NOT_PROXY;
    }

    /**
     * 创建代理对象
     */
    protected Object createProxy(Class<?> beanClass, String beanName,
                                  Object[] specificInterceptors, TargetSource targetSource) {
        // 1. 创建 ProxyFactory
        ProxyFactory proxyFactory = new ProxyFactory();

        // 2. 复制配置
        proxyFactory.copyFrom(this);

        // 3. 判断是否使用 CGLIB 代理
        if (!proxyFactory.isProxyTargetClass()) {
            // 判断是否应该使用 CGLIB 代理
            if (shouldProxyTargetClass(beanClass, beanName)) {
                proxyFactory.setProxyTargetClass(true);
            } else {
                // 评估接口，决定使用哪种代理方式
                evaluateProxyInterfaces(beanClass, proxyFactory);
            }
        }

        // 4. 构建 Advisor 数组
        Advisor[] advisors = buildAdvisors(beanName, specificInterceptors);
        proxyFactory.addAdvisors(advisors);

        // 5. 设置目标源
        proxyFactory.setTargetSource(targetSource);

        // 6. 自定义 ProxyFactory（扩展点）
        customizeProxyFactory(proxyFactory);

        // 7. 创建代理对象
        return proxyFactory.getProxy(getProxyClassLoader());
    }

    /**
     * 获取适用于该 Bean 的所有 Advisor
     */
    protected abstract Object[] getAdvicesAndAdvisorsForBean(
            Class<?> beanClass, String beanName, TargetSource targetSource);
}
```

**(2) DefaultAopProxyFactory - 代理工厂**

决定使用 JDK 动态代理还是 CGLIB 代理。

```java
/**
 * 默认的 AOP 代理工厂
 */
public class DefaultAopProxyFactory implements AopProxyFactory {

    @Override
    public AopProxy createAopProxy(AdvisedSupport config) throws AopConfigException {
        // 判断使用哪种代理方式
        if (config.isOptimize() ||                        // 优化
            config.isProxyTargetClass() ||                // 强制使用 CGLIB
            hasNoUserSuppliedProxyInterfaces(config)) {   // 没有接口

            Class<?> targetClass = config.getTargetClass();

            if (targetClass == null) {
                throw new AopConfigException("TargetSource cannot determine target class");
            }

            // 如果目标类本身就是接口或者是 JDK 代理类，使用 JDK 代理
            if (targetClass.isInterface() || Proxy.isProxyClass(targetClass)) {
                return new JdkDynamicAopProxy(config);
            }

            // 使用 CGLIB 代理
            return new ObjenesisCglibAopProxy(config);

        } else {
            // 使用 JDK 动态代理
            return new JdkDynamicAopProxy(config);
        }
    }

    /**
     * 判断是否没有用户提供的代理接口
     */
    private boolean hasNoUserSuppliedProxyInterfaces(AdvisedSupport config) {
        Class<?>[] interfaces = config.getProxiedInterfaces();
        return (interfaces.length == 0 || (interfaces.length == 1 && SpringProxy.class.isAssignableFrom(interfaces)));
    }
}
```

**(3) 拦截器链执行**

```java
/**
 * 方法调用（简化版）
 */
public class ReflectiveMethodInvocation implements ProxyMethodInvocation {

    protected final Object proxy;
    protected final Object target;
    protected final Method method;
    protected Object[] arguments;
    protected final List<?> interceptorsAndDynamicMethodMatchers;
    private int currentInterceptorIndex = -1;

    public ReflectiveMethodInvocation(Object proxy, Object target, Method method,
                                      Object[] arguments, List<?> interceptorsAndDynamicMethodMatchers) {
        this.proxy = proxy;
        this.target = target;
        this.method = method;
        this.arguments = arguments;
        this.interceptorsAndDynamicMethodMatchers = interceptorsAndDynamicMethodMatchers;
    }

    @Override
    public Object proceed() throws Throwable {
        // 所有拦截器都执行完了，调用目标方法
        if (this.currentInterceptorIndex == this.interceptorsAndDynamicMethodMatchers.size() - 1) {
            return invokeJoinpoint();
        }

        // 获取下一个拦截器
        Object interceptorOrInterceptionAdvice =
                this.interceptorsAndDynamicMethodMatchers.get(++this.currentInterceptorIndex);

        if (interceptorOrInterceptionAdvice instanceof MethodInterceptor) {
            // 执行拦截器
            MethodInterceptor mi = (MethodInterceptor) interceptorOrInterceptionAdvice;
            return mi.invoke(this);
        } else {
            // 跳过，执行下一个
            return proceed();
        }
    }

    /**
     * 调用目标方法
     */
    protected Object invokeJoinpoint() throws Throwable {
        return this.method.invoke(this.target, this.arguments);
    }
}
```

**5. 方法调用流程**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"></polygon>
</marker>
</defs>
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">方法调用执行流程</text>
<rect x="100" y="60" width="120" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"></rect>
<text x="160" y="95" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">客户端调用</text>
<line x1="220" y1="90" x2="270" y2="90" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="270" y="60" width="120" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="330" y="95" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">代理对象</text>
<line x1="390" y1="90" x2="440" y2="90" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="440" y="60" width="140" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"></rect>
<text x="510" y="95" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">拦截器链</text>
<line x1="580" y1="90" x2="630" y2="90" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="630" y="60" width="120" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"></rect>
<text x="690" y="95" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">目标方法</text>
<rect x="200" y="160" width="400" height="400" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="5"></rect>
<text x="400" y="190" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">拦截器链执行详情</text>
<rect x="220" y="210" width="360" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="3"></rect>
<text x="400" y="240" font-size="12" text-anchor="middle" fill="#333">1. @Around 通知（前半部分）</text>
<line x1="400" y1="260" x2="400" y2="280" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="220" y="280" width="360" height="50" fill="#c8e6c9" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="400" y="310" font-size="12" text-anchor="middle" fill="#333">2. @Before 通知</text>
<line x1="400" y1="330" x2="400" y2="350" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="220" y="350" width="360" height="50" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="3"></rect>
<text x="400" y="380" font-size="12" text-anchor="middle" fill="#333">3. 执行目标方法</text>
<line x1="400" y1="400" x2="400" y2="420" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="220" y="420" width="360" height="50" fill="#c8e6c9" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="400" y="450" font-size="12" text-anchor="middle" fill="#333">4. @AfterReturning / @AfterThrowing 通知</text>
<line x1="400" y1="470" x2="400" y2="490" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="220" y="490" width="360" height="50" fill="#e1bee7" stroke="#9c27b0" stroke-width="2" rx="3"></rect>
<text x="400" y="520" font-size="12" text-anchor="middle" fill="#333">5. @After 通知（finally）</text>
<line x1="400" y1="540" x2="400" y2="560" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="220" y="560" width="360" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="3"></rect>
<text x="400" y="590" font-size="12" text-anchor="middle" fill="#333">6. @Around 通知（后半部分）</text>
</svg>

**6. 完整示例代码**

```java
/**
 * 模拟 Spring AOP 实现原理
 */
public class SpringAopPrincipleDemo {

    public static void main(String[] args) {
        // 1. 创建目标对象
        UserService target = new UserServiceImpl();

        // 2. 创建 ProxyFactory
        ProxyFactory proxyFactory = new ProxyFactory();
        proxyFactory.setTarget(target);

        // 3. 添加切面（Advisor）
        // 前置通知
        proxyFactory.addAdvice(new MethodBeforeAdvice() {
            @Override
            public void before(Method method, Object[] args, Object target) {
                System.out.println("【前置通知】方法执行前: " + method.getName());
            }
        });

        // 环绕通知
        proxyFactory.addAdvice(new MethodInterceptor() {
            @Override
            public Object invoke(MethodInvocation invocation) throws Throwable {
                System.out.println("【环绕通知】方法执行前");
                long startTime = System.currentTimeMillis();

                Object result = invocation.proceed();

                long endTime = System.currentTimeMillis();
                System.out.println("【环绕通知】方法执行后，耗时: " + (endTime - startTime) + "ms");

                return result;
            }
        });

        // 返回通知
        proxyFactory.addAdvice(new AfterReturningAdvice() {
            @Override
            public void afterReturning(Object returnValue, Method method, Object[] args, Object target) {
                System.out.println("【返回通知】方法返回值: " + returnValue);
            }
        });

        // 4. 创建代理对象
        UserService proxy = (UserService) proxyFactory.getProxy();

        // 5. 查看代理对象类型
        System.out.println("原始对象: " + target.getClass().getName());
        System.out.println("代理对象: " + proxy.getClass().getName());
        System.out.println("是否 JDK 代理: " + (proxy instanceof Proxy));
        System.out.println("是否 CGLIB 代理: " + proxy.getClass().getName().contains("$$"));

        // 6. 调用代理对象的方法
        System.out.println("\n========== 调用代理方法 ==========");
        User result = proxy.saveUser(new User("张三"));
        System.out.println("方法执行结果: " + result);
    }
}

// 输出示例：
// 原始对象: com.example.service.UserServiceImpl
// 代理对象: com.example.service.UserServiceImpl$$EnhancerBySpringCGLIB$$12345678
// 是否 JDK 代理: false
// 是否 CGLIB 代理: true
//
// ========== 调用代理方法 ==========
// 【环绕通知】方法执行前
// 【前置通知】方法执行前: saveUser
// 保存用户: 张三
// 【返回通知】方法返回值: User{name='张三'}
// 【环绕通知】方法执行后，耗时: 5ms
// 方法执行结果: User{name='张三'}
```

**关键要点**

1.  **核心原理**
    *   Spring AOP 基于动态代理模式实现。
    *   运行时为目标对象创建代理对象。
    *   通过代理对象拦截方法调用并执行切面逻辑。

2.  **两种代理方式**
    *   **JDK 动态代理**：目标对象实现了接口，基于反射机制。
    *   **CGLIB 代理**：目标对象没有实现接口，基于字节码生成技术。

3.  **核心组件**
    *   `ProxyFactory`：代理工厂，负责创建代理对象。
    *   `AdvisedSupport`：配置支持，存储 AOP 配置信息。
    *   `AopProxy`：代理接口，有 JdkDynamicAopProxy 和 CglibAopProxy 两个实现。
    *   `AbstractAutoProxyCreator`：自动代理创建器，BeanPostProcessor 实现。

4.  **创建流程**
    *   Spring 容器启动 → BeanPostProcessor 处理 → 判断是否匹配切点 → 选择代理方式 → 创建代理对象 → 返回代理对象。

5.  **方法调用流程**
    *   客户端调用 → 代理对象 → 拦截器链 → 目标方法 → 返回结果。

6.  **性能考虑**
    *   JDK 代理使用反射，性能略低。
    *   CGLIB 代理使用字节码生成，性能稍好。
    *   代理对象在容器启动时创建，运行时调用有一定开销。

**记忆口诀**

**"动态代理是核心，JDK CGLIB 两方式；容器启动创代理，拦截方法执切面；ProxyFactory 工厂造，拦截器链顺序调"**

-   **动态代理是核心**：Spring AOP 基于动态代理实现。
-   **JDK CGLIB 两方式**：有 JDK 动态代理和 CGLIB 代理两种方式。
-   **容器启动创代理**：容器启动时通过 BeanPostProcessor 创建代理对象。
-   **拦截方法执切面**：通过代理对象拦截方法调用并执行切面逻辑。
-   **ProxyFactory 工厂造**：ProxyFactory 是创建代理对象的工厂。
-   **拦截器链顺序调**：通过拦截器链按顺序执行各种通知。

### 24. 什么是 JDK 动态代理和 CGLIB 代理？

**核心答案**

**JDK 动态代理** 和 **CGLIB 代理** 是 Spring AOP 实现的两种代理方式：

| 特性 | JDK 动态代理 | CGLIB 代理 |
| :--- | :--- | :--- |
| **实现方式** | 基于 Java 反射机制 | 基于字节码生成技术（ASM） |
| **代理对象** | 实现目标对象的接口 | 继承目标类的子类 |
| **使用条件** | 目标对象必须实现接口 | 目标对象不需要实现接口 |
| **性能** | 相对较慢（反射调用） | 相对较快（直接调用） |
| **限制** | 只能代理接口方法 | 不能代理 final 类和 final 方法 |
| **依赖** | JDK 自带，无需额外依赖 | 需要引入 CGLIB 库 |
| **代理对象类型** | `$Proxy0`、`$Proxy1` 等 | `TargetClass$$EnhancerByCGLIB$$` |

**详细说明**

**1. JDK 动态代理**

**(1) 原理图解**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"></polygon>
</marker>
</defs>
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">JDK 动态代理原理</text>
<rect x="50" y="60" width="200" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="150" y="90" font-size="14" font-weight="bold" text-anchor="middle" fill="#1976d2">目标接口</text>
<text x="150" y="115" font-size="12" text-anchor="middle" fill="#333">UserService</text>
<rect x="70" y="130" width="160" height="35" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"></rect>
<text x="150" y="152" font-size="11" text-anchor="middle" fill="#333">+ saveUser(User)</text>
<rect x="300" y="60" width="200" height="120" fill="#c8e6c9" stroke="#4caf50" stroke-width="2" rx="5"></rect>
<text x="400" y="90" font-size="14" font-weight="bold" text-anchor="middle" fill="#4caf50">目标实现类</text>
<text x="400" y="115" font-size="12" text-anchor="middle" fill="#333">UserServiceImpl</text>
<rect x="320" y="130" width="160" height="35" fill="#fff" stroke="#4caf50" stroke-width="1" rx="3"></rect>
<text x="400" y="152" font-size="11" text-anchor="middle" fill="#333">+ saveUser(User)</text>
<line x1="250" y1="120" x2="290" y2="120" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<text x="270" y="115" font-size="10" text-anchor="middle" fill="#666">实现</text>
<rect x="550" y="60" width="200" height="120" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"></rect>
<text x="650" y="90" font-size="14" font-weight="bold" text-anchor="middle" fill="#f57c00">代理对象</text>
<text x="650" y="115" font-size="12" text-anchor="middle" fill="#333">$Proxy0</text>
<rect x="570" y="130" width="160" height="35" fill="#fff" stroke="#fbc02d" stroke-width="1" rx="3"></rect>
<text x="650" y="152" font-size="11" text-anchor="middle" fill="#333">+ saveUser(User)</text>
<line x1="650" y1="60" x2="150" y2="180" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5"></line>
<text x="380" y="100" font-size="10" text-anchor="middle" fill="#f57c00">实现</text>
<rect x="300" y="230" width="200" height="120" fill="#ffe0b2" stroke="#ff9800" stroke-width="2" rx="5"></rect>
<text x="400" y="260" font-size="14" font-weight="bold" text-anchor="middle" fill="#ff9800">InvocationHandler</text>
<text x="400" y="285" font-size="12" text-anchor="middle" fill="#333">MyInvocationHandler</text>
<rect x="320" y="300" width="160" height="35" fill="#fff" stroke="#ff9800" stroke-width="1" rx="3"></rect>
<text x="400" y="322" font-size="11" text-anchor="middle" fill="#333">+ invoke(...)</text>
<line x1="650" y1="180" x2="650" y2="210" stroke="#666" stroke-width="2"></line>
<line x1="650" y1="210" x2="500" y2="210" stroke="#666" stroke-width="2"></line>
<line x1="500" y1="210" x2="500" y2="220" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<text x="575" y="205" font-size="10" text-anchor="middle" fill="#666">方法调用</text>
<line x1="300" y1="290" x2="270" y2="290" stroke="#666" stroke-width="2"></line>
<line x1="270" y1="290" x2="270" y2="150" stroke="#666" stroke-width="2"></line>
<line x1="270" y1="150" x2="290" y2="150" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<text x="275" y="210" font-size="10" text-anchor="middle" fill="#666">调用</text>
<rect x="50" y="380" width="700" height="60" fill="#f5f5f5" stroke="#999" stroke-width="1" rx="3"></rect>
<text x="400" y="405" font-size="13" font-weight="bold" text-anchor="middle" fill="#333">JDK 动态代理流程</text>
<text x="400" y="425" font-size="11" text-anchor="middle" fill="#333">客户端 → 代理对象($Proxy0) → InvocationHandler.invoke() → 目标对象(UserServiceImpl)</text>
</svg>

**(2) 核心API**

```java
/**
 * JDK 动态代理核心 API
 */
public class Proxy {
    /**
     * 创建代理对象
     *
     * @param loader      类加载器
     * @param interfaces  目标对象实现的接口数组
     * @param h           InvocationHandler 实现
     * @return 代理对象
     */
    public static Object newProxyInstance(ClassLoader loader,
                                          Class<?>[] interfaces,
                                          InvocationHandler h) {
        // ...
    }
}

/**
 * 方法调用处理器接口
 */
public interface InvocationHandler {
    /**
     * 处理代理对象的方法调用
     *
     * @param proxy  代理对象本身
     * @param method 被调用的方法
     * @param args   方法参数
     * @return 方法返回值
     */
    Object invoke(Object proxy, Method method, Object[] args) throws Throwable;
}
```

**(3) 完整实现示例**

```java
/**
 * JDK 动态代理示例
 */
public class JdkDynamicProxyExample {

    public static void main(String[] args) {
        // 1. 创建目标对象
        UserService target = new UserServiceImpl();

        // 2. 创建代理对象
        UserService proxy = (UserService) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),   // 类加载器
            target.getClass().getInterfaces(),    // 接口数组
            new MyInvocationHandler(target)       // InvocationHandler
        );

        // 3. 查看代理对象信息
        System.out.println("目标对象: " + target.getClass().getName());
        System.out.println("代理对象: " + proxy.getClass().getName());
        System.out.println("是否是代理类: " + Proxy.isProxyClass(proxy.getClass()));
        System.out.println("代理对象实现的接口: " + Arrays.toString(proxy.getClass().getInterfaces()));

        // 4. 调用代理对象的方法
        System.out.println("\n========== 调用代理方法 ==========");
        User user = new User("张三", 25);
        User result = proxy.saveUser(user);
        System.out.println("返回结果: " + result);

        System.out.println("\n========== 调用另一个方法 ==========");
        User queryResult = proxy.getUserById(1L);
        System.out.println("查询结果: " + queryResult);
    }
}

/**
 * 自定义 InvocationHandler
 */
class MyInvocationHandler implements InvocationHandler {

    // 目标对象
    private final Object target;

    public MyInvocationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 方法执行前
        System.out.println("【前置】准备执行方法: " + method.getName());
        System.out.println("【前置】方法参数: " + Arrays.toString(args));
        long startTime = System.currentTimeMillis();

        // 执行目标方法
        Object result = method.invoke(target, args);

        // 方法执行后
        long endTime = System.currentTimeMillis();
        System.out.println("【后置】方法执行完成，耗时: " + (endTime - startTime) + "ms");
        System.out.println("【后置】方法返回值: " + result);

        return result;
    }
}

/**
 * 目标接口
 */
interface UserService {
    User saveUser(User user);
    User getUserById(Long id);
}

/**
 * 目标实现类
 */
class UserServiceImpl implements UserService {

    @Override
    public User saveUser(User user) {
        System.out.println("  → 执行保存用户: " + user.getName());
        user.setId(System.currentTimeMillis());
        return user;
    }

    @Override
    public User getUserById(Long id) {
        System.out.println("  → 执行查询用户: " + id);
        return new User("李四", 30);
    }
}

// 输出结果：
// 目标对象: com.example.UserServiceImpl
// 代理对象: com.sun.proxy.$Proxy0
// 是否是代理类: true
// 代理对象实现的接口: [interface com.example.UserService]
//
// ========== 调用代理方法 ==========
// 【前置】准备执行方法: saveUser
// 【前置】方法参数: [User{name='张三', age=25}]
//   → 执行保存用户: 张三
// 【后置】方法执行完成，耗时: 1ms
// 【后置】方法返回值: User{id=1234567890, name='张三', age=25}
// 返回结果: User{id=1234567890, name='张三', age=25}
//
// ========== 调用另一个方法 ==========
// 【前置】准备执行方法: getUserById
// 【前置】方法参数:
//   → 执行查询用户: 1
// 【后置】方法执行完成，耗时: 0ms
// 【后置】方法返回值: User{id=null, name='李四', age=30}
// 查询结果: User{id=null, name='李四', age=30}
```

**(4) JDK 动态代理的限制**

```java
/**
 * JDK 动态代理的限制示例
 */
public class JdkProxyLimitations {

    // ✗ 限制1：目标类必须实现接口
    class NoInterfaceService {
        public void doSomething() {
            System.out.println("执行操作");
        }
    }

    // 尝试为没有接口的类创建代理会失败
    public void test1() {
        NoInterfaceService target = new NoInterfaceService();

        try {
            Object proxy = Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),  // 空数组
                (proxy1, method, args) -> method.invoke(target, args)
            );
        } catch (IllegalArgumentException e) {
            System.err.println("✗ 错误：目标类必须实现至少一个接口");
        }
    }

    // ✗ 限制2：只能代理接口中定义的方法
    interface SimpleService {
        void interfaceMethod();
    }

    class SimpleServiceImpl implements SimpleService {
        @Override
        public void interfaceMethod() {
            System.out.println("接口方法");
        }

        public void publicMethod() {
            System.out.println("公共方法（不在接口中）");
        }
    }

    public void test2() {
        SimpleServiceImpl target = new SimpleServiceImpl();

        SimpleService proxy = (SimpleService) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            new Class[]{SimpleService.class},
            (proxy1, method, args) -> method.invoke(target, args)
        );

        proxy.interfaceMethod();  // ✓ 可以调用

        // proxy.publicMethod();  // ✗ 编译错误：代理对象只有接口方法
    }

    // ✗ 限制3：性能问题（反射调用）
    public void test3() throws Exception {
        UserService target = new UserServiceImpl();

        UserService proxy = (UserService) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),
            new InvocationHandler() {
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    // 使用反射调用目标方法（性能开销较大）
                    return method.invoke(target, args);
                }
            }
        );

        // 性能测试
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < 1000000; i++) {
            proxy.getUserById(1L);  // 通过代理调用（有反射开销）
        }
        long proxyTime = System.currentTimeMillis() - startTime;

        startTime = System.currentTimeMillis();
        for (int i = 0; i < 1000000; i++) {
            target.getUserById(1L);  // 直接调用
        }
        long directTime = System.currentTimeMillis() - startTime;

        System.out.println("代理调用耗时: " + proxyTime + "ms");
        System.out.println("直接调用耗时: " + directTime + "ms");
        System.out.println("性能损耗: " + (proxyTime - directTime) + "ms");
    }
}
```

**2. CGLIB 代理**

**(1) 原理图解**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"></polygon>
</marker>
</defs>
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">CGLIB 代理原理</text>
<rect x="250" y="60" width="300" height="120" fill="#c8e6c9" stroke="#4caf50" stroke-width="2" rx="5"></rect>
<text x="400" y="90" font-size="14" font-weight="bold" text-anchor="middle" fill="#4caf50">目标类（无需接口）</text>
<text x="400" y="115" font-size="12" text-anchor="middle" fill="#333">UserService</text>
<rect x="280" y="130" width="240" height="35" fill="#fff" stroke="#4caf50" stroke-width="1" rx="3"></rect>
<text x="400" y="152" font-size="11" text-anchor="middle" fill="#333">+ saveUser(User)</text>
<rect x="200" y="230" width="400" height="120" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"></rect>
<text x="400" y="260" font-size="14" font-weight="bold" text-anchor="middle" fill="#f57c00">代理对象（子类）</text>
<text x="400" y="285" font-size="12" text-anchor="middle" fill="#333">UserService$$EnhancerByCGLIB$$12345</text>
<rect x="230" y="300" width="340" height="35" fill="#fff" stroke="#fbc02d" stroke-width="1" rx="3"></rect>
<text x="400" y="322" font-size="11" text-anchor="middle" fill="#333">+ saveUser(User)  // 重写父类方法</text>
<line x1="400" y1="180" x2="400" y2="220" stroke="#f57c00" stroke-width="2" marker-end="url(#arrowhead)"></line>
<text x="450" y="205" font-size="10" text-anchor="middle" fill="#f57c00">继承</text>
<rect x="50" y="230" width="120" height="120" fill="#ffe0b2" stroke="#ff9800" stroke-width="2" rx="5"></rect>
<text x="110" y="260" font-size="13" font-weight="bold" text-anchor="middle" fill="#ff9800">Method</text>
<text x="110" y="280" font-size="13" font-weight="bold" text-anchor="middle" fill="#ff9800">Interceptor</text>
<text x="110" y="305" font-size="11" text-anchor="middle" fill="#333">intercept(...)</text>
<line x1="170" y1="290" x2="190" y2="290" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<text x="180" y="285" font-size="10" text-anchor="middle" fill="#666">回调</text>
<rect x="630" y="230" width="120" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="690" y="260" font-size="13" font-weight="bold" text-anchor="middle" fill="#1976d2">Method</text>
<text x="690" y="280" font-size="13" font-weight="bold" text-anchor="middle" fill="#1976d2">Proxy</text>
<text x="690" y="305" font-size="11" text-anchor="middle" fill="#333">invokeSuper(...)</text>
<line x1="600" y1="290" x2="620" y2="290" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<text x="610" y="285" font-size="10" text-anchor="middle" fill="#666">调用</text>
<line x1="690" y1="230" x2="690" y2="210" stroke="#666" stroke-width="2"></line>
<line x1="690" y1="210" x2="500" y2="210" stroke="#666" stroke-width="2"></line>
<line x1="500" y1="210" x2="500" y2="190" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<text x="595" y="205" font-size="10" text-anchor="middle" fill="#666">调用父类方法</text>
<rect x="50" y="380" width="700" height="60" fill="#f5f5f5" stroke="#999" stroke-width="1" rx="3"></rect>
<text x="400" y="405" font-size="13" font-weight="bold" text-anchor="middle" fill="#333">CGLIB 代理流程</text>
<text x="400" y="425" font-size="11" text-anchor="middle" fill="#333">客户端 → 代理对象(子类) → MethodInterceptor.intercept() → MethodProxy.invokeSuper() → 父类方法(UserService)</text>
</svg>

**(2) 核心API**

```java
/**
 * CGLIB 代理核心 API
 */
public class Enhancer {
    /**
     * 设置父类（目标类）
     */
    public void setSuperclass(Class superclass) { }

    /**
     * 设置回调（MethodInterceptor）
     */
    public void setCallback(Callback callback) { }

    /**
     * 设置多个回调
     */
    public void setCallbacks(Callback[] callbacks) { }

    /**
     * 创建代理对象
     */
    public Object create() { }

    /**
     * 创建代理对象（带构造参数）
     */
    public Object create(Class[] argumentTypes, Object[] arguments) { }
}

/**
 * 方法拦截器接口
 */
public interface MethodInterceptor extends Callback {
    /**
     * 拦截方法调用
     *
     * @param obj         代理对象本身
     * @param method      被拦截的方法
     * @param args        方法参数
     * @param proxy       方法代理对象（用于调用父类方法）
     * @return 方法返回值
     */
    Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable;
}```

**(3) 完整实现示例**

```java
/**
 * CGLIB 代理示例
 */
public class CglibProxyExample {

    public static void main(String[] args) {
        // 1. 创建 Enhancer 对象
        Enhancer enhancer = new Enhancer();

        // 2. 设置父类（目标类）
        enhancer.setSuperclass(UserService.class);

        // 3. 设置回调（MethodInterceptor）
        enhancer.setCallback(new MyMethodInterceptor());

        // 4. 创建代理对象
        UserService proxy = (UserService) enhancer.create();

        // 5. 查看代理对象信息
        System.out.println("目标类: " + UserService.class.getName());
        System.out.println("代理对象: " + proxy.getClass().getName());
        System.out.println("代理对象的父类: " + proxy.getClass().getSuperclass().getName());
        System.out.println("是否是 CGLIB 代理: " + proxy.getClass().getName().contains("$$"));

        // 6. 调用代理对象的方法
        System.out.println("\n========== 调用代理方法 ==========");
        User user = new User("张三", 25);
        User result = proxy.saveUser(user);
        System.out.println("返回结果: " + result);

        System.out.println("\n========== 调用另一个方法 ==========");
        User queryResult = proxy.getUserById(1L);
        System.out.println("查询结果: " + queryResult);
    }
}

/**
 * 自定义 MethodInterceptor
 */
class MyMethodInterceptor implements MethodInterceptor {

    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        // 方法执行前
        System.out.println("【前置】准备执行方法: " + method.getName());
        System.out.println("【前置】方法参数: " + Arrays.toString(args));
        long startTime = System.currentTimeMillis();

        // 执行父类方法（目标方法）
        // 注意：这里使用 proxy.invokeSuper() 而不是 method.invoke()
        Object result = proxy.invokeSuper(obj, args);

        // 方法执行后
        long endTime = System.currentTimeMillis();
        System.out.println("【后置】方法执行完成，耗时: " + (endTime - startTime) + "ms");
        System.out.println("【后置】方法返回值: " + result);

        return result;
    }
}

/**
 * 目标类（无需实现接口）
 */
class UserService {

    public User saveUser(User user) {
        System.out.println("  → 执行保存用户: " + user.getName());
        user.setId(System.currentTimeMillis());
        return user;
    }

    public User getUserById(Long id) {
        System.out.println("  → 执行查询用户: " + id);
        return new User("李四", 30);
    }
}

// 输出结果：
// 目标类: com.example.UserService
// 代理对象: com.example.UserService$$EnhancerByCGLIB$$12345678
// 代理对象的父类: com.example.UserService
// 是否是 CGLIB 代理: true
//
// ========== 调用代理方法 ==========
// 【前置】准备执行方法: saveUser
// 【前置】方法参数: [User{name='张三', age=25}]
//   → 执行保存用户: 张三
// 【后置】方法执行完成，耗时: 1ms
// 【后置】方法返回值: User{id=1234567890, name='张三', age=25}
// 返回结果: User{id=1234567890, name='张三', age=25}
//
// ========== 调用另一个方法 ==========
// 【前置】准备执行方法: getUserById
// 【前置】方法参数:
//   → 执行查询用户: 1
// 【后置】方法执行完成，耗时: 0ms
// 【后置】方法返回值: User{id=null, name='李四', age=30}
// 查询结果: User{id=null, name='李四', age=30}
```

**(4) CGLIB 代理的限制**

```java
/**
 * CGLIB 代理的限制示例
 */
public class CglibProxyLimitations {

    // ✗ 限制1：不能代理 final 类
    final class FinalClass {
        public void doSomething() {
            System.out.println("执行操作");
        }
    }

    public void test1() {
        try {
            Enhancer enhancer = new Enhancer();
            enhancer.setSuperclass(FinalClass.class);  // ✗ 错误：不能继承 final 类
            enhancer.setCallback((MethodInterceptor) (obj, method, args, proxy) ->
                proxy.invokeSuper(obj, args));
            Object proxy = enhancer.create();
        } catch (IllegalArgumentException e) {
            System.err.println("✗ 错误：不能代理 final 类");
        }
    }

    // ✗ 限制2：不能代理 final 方法
    class ServiceWithFinalMethod {
        public void normalMethod() {
            System.out.println("普通方法");
        }

        public final void finalMethod() {
            System.out.println("final 方法");
        }
    }

    public void test2() {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(ServiceWithFinalMethod.class);
        enhancer.setCallback(new MethodInterceptor() {
            @Override
            public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
                System.out.println("【拦截】" + method.getName());
                return proxy.invokeSuper(obj, args);
            }
        });

        ServiceWithFinalMethod proxy = (ServiceWithFinalMethod) enhancer.create();

        proxy.normalMethod();  // ✓ 会被拦截
        // 输出：【拦截】normalMethod
        //      普通方法

        proxy.finalMethod();   // ✗ 不会被拦截（final 方法不能被重写）
        // 输出：final 方法
    }

    // ✗ 限制3：不能代理 private 方法
    class ServiceWithPrivateMethod {
        public void publicMethod() {
            System.out.println("公共方法");
            privateMethod();  // 调用私有方法
        }

        private void privateMethod() {
            System.out.println("私有方法");
        }
    }

    public void test3() {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(ServiceWithPrivateMethod.class);
        enhancer.setCallback(new MethodInterceptor() {
            @Override
            public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
                System.out.println("【拦截】" + method.getName());
                return proxy.invokeSuper(obj, args);
            }
        });

        ServiceWithPrivateMethod proxy = (ServiceWithPrivateMethod) enhancer.create();

        proxy.publicMethod();
        // 输出：【拦截】publicMethod
        //      公共方法
        //      私有方法
        // 注意：privateMethod() 不会被拦截
    }

    // ✗ 限制4：构造方法不会被拦截
    class ServiceWithConstructor {
        public ServiceWithConstructor() {
            System.out.println("构造方法执行");
        }

        public void doSomething() {
            System.out.println("执行操作");
        }
    }

    public void test4() {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(ServiceWithConstructor.class);
        enhancer.setCallback(new MethodInterceptor() {
            @Override
            public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
                System.out.println("【拦截】" + method.getName());
                return proxy.invokeSuper(obj, args);
            }
        });

        ServiceWithConstructor proxy = (ServiceWithConstructor) enhancer.create();
        // 输出：构造方法执行（构造方法不会被拦截）

        proxy.doSomething();
        // 输出：【拦截】doSomething
        //      执行操作
    }
}
```

**3. 两种代理方式对比**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">JDK 动态代理 vs CGLIB 代理对比</text>
<rect x="50" y="60" width="330" height="500" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="215" y="90" font-size="16" font-weight="bold" text-anchor="middle" fill="#1976d2">JDK 动态代理</text>
<rect x="70" y="110" width="290" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"></rect>
<text x="215" y="130" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">实现方式</text>
<text x="215" y="150" font-size="11" text-anchor="middle" fill="#666">基于 Java 反射机制</text>
<text x="215" y="165" font-size="11" text-anchor="middle" fill="#666">Proxy.newProxyInstance()</text>
<rect x="70" y="180" width="290" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"></rect>
<text x="215" y="200" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">代理对象</text>
<text x="215" y="220" font-size="11" text-anchor="middle" fill="#666">实现目标对象的接口</text>
<text x="215" y="235" font-size="11" text-anchor="middle" fill="#666">$Proxy0, $Proxy1</text>
<rect x="70" y="250" width="290" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"></rect>
<text x="215" y="270" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">使用条件</text>
<text x="215" y="290" font-size="11" text-anchor="middle" fill="#666">✓ 目标对象必须实现接口</text>
<text x="215" y="305" font-size="11" text-anchor="middle" fill="#666">✗ 只能代理接口方法</text>
<rect x="70" y="320" width="290" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"></rect>
<text x="215" y="340" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">性能</text>
<text x="215" y="360" font-size="11" text-anchor="middle" fill="#666">相对较慢</text>
<text x="215" y="375" font-size="11" text-anchor="middle" fill="#666">（反射调用开销大）</text>
<rect x="70" y="390" width="290" height="60" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"></rect>
<text x="215" y="410" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">依赖</text>
<text x="215" y="430" font-size="11" text-anchor="middle" fill="#666">JDK 自带</text>
<text x="215" y="445" font-size="11" text-anchor="middle" fill="#666">无需额外依赖</text>
<rect x="70" y="460" width="290" height="90" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"></rect>
<text x="215" y="480" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">适用场景</text>
<text x="215" y="500" font-size="11" text-anchor="middle" fill="#666">• 目标对象实现了接口</text>
<text x="215" y="515" font-size="11" text-anchor="middle" fill="#666">• Spring AOP 默认方式</text>
<text x="215" y="530" font-size="11" text-anchor="middle" fill="#666">• 代理对象数量较少</text>
<rect x="420" y="60" width="330" height="500" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"></rect>
<text x="585" y="90" font-size="16" font-weight="bold" text-anchor="middle" fill="#ff9800">CGLIB 代理</text>
<rect x="440" y="110" width="290" height="60" fill="#fff" stroke="#ff9800" stroke-width="1" rx="3"></rect>
<text x="585" y="130" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">实现方式</text>
<text x="585" y="150" font-size="11" text-anchor="middle" fill="#666">基于字节码生成技术(ASM)</text>
<text x="585" y="165" font-size="11" text-anchor="middle" fill="#666">Enhancer.create()</text>
<rect x="440" y="180" width="290" height="60" fill="#fff" stroke="#ff9800" stroke-width="1" rx="3"></rect>
<text x="585" y="200" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">代理对象</text>
<text x="585" y="220" font-size="11" text-anchor="middle" fill="#666">继承目标类的子类</text>
<text x="585" y="235" font-size="11" text-anchor="middle" fill="#666">Target$$EnhancerByCGLIB$$</text>
<rect x="440" y="250" width="290" height="60" fill="#fff" stroke="#ff9800" stroke-width="1" rx="3"></rect>
<text x="585" y="270" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">使用条件</text>
<text x="585" y="290" font-size="11" text-anchor="middle" fill="#666">✓ 无需实现接口</text>
<text x="585" y="305" font-size="11" text-anchor="middle" fill="#666">✗ 不能代理 final 类/方法</text>
<rect x="440" y="320" width="290" height="60" fill="#fff" stroke="#ff9800" stroke-width="1" rx="3"></rect>
<text x="585" y="340" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">性能</text>
<text x="585" y="360" font-size="11" text-anchor="middle" fill="#666">相对较快</text>
<text x="585" y="375" font-size="11" text-anchor="middle" fill="#666">（直接调用，无反射开销）</text>
<rect x="440" y="390" width="290" height="60" fill="#fff" stroke="#ff9800" stroke-width="1" rx="3"></rect>
<text x="585" y="410" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">依赖</text>
<text x="585" y="430" font-size="11" text-anchor="middle" fill="#666">需要引入 CGLIB 库</text>
<text x="585" y="445" font-size="11" text-anchor="middle" fill="#666">（Spring 已内置）</text>
<rect x="440" y="460" width="290" height="90" fill="#fff" stroke="#ff9800" stroke-width="1" rx="3"></rect>
<text x="585" y="480" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">适用场景</text>
<text x="585" y="500" font-size="11" text-anchor="middle" fill="#666">• 目标对象没有实现接口</text>
<text x="585" y="515" font-size="11" text-anchor="middle" fill="#666">• 需要代理类本身的方法</text>
<text x="585" y="530" font-size="11" text-anchor="middle" fill="#666">• 性能要求较高</text>
</svg>

**4. 实际使用示例**

```java
/**
 * Spring AOP 中两种代理方式的实际应用
 */
@Configuration
@EnableAspectJAutoProxy  // 启用 AOP
public class AopConfig {

    // 示例1：有接口的类，默认使用 JDK 动态代理
    @Service
    class UserServiceImpl implements UserService {
        @Override
        public void saveUser(User user) {
            System.out.println("保存用户: " + user);
        }
    }

    // 示例2：无接口的类，自动使用 CGLIB 代理
    @Service
    class OrderService {
        public void createOrder(Order order) {
            System.out.println("创建订单: " + order);
        }
    }

    // 示例3：强制使用 CGLIB 代理（即使有接口）
    @Configuration
    @EnableAspectJAutoProxy(proxyTargetClass = true)  // 强制使用 CGLIB
    class ForceCglibConfig {
        // 所有 Bean 都使用 CGLIB 代理
    }

    // 切面
    @Aspect
    @Component
    class LogAspect {
        @Before("execution(* com.example.service.*.*(..))")
        public void logBefore(JoinPoint joinPoint) {
            Object target = joinPoint.getTarget();
            Object proxy = joinPoint.getThis();

            System.out.println("目标对象: " + target.getClass().getName());
            System.out.println("代理对象: " + proxy.getClass().getName());

            if (proxy.getClass().getName().contains("$$")) {
                System.out.println("使用 CGLIB 代理");
            } else {
                System.out.println("使用 JDK 动态代理");
            }
        }
    }
}
```

**关键要点**

1.  **JDK 动态代理**
    *   基于 Java 反射机制，使用 `Proxy.newProxyInstance()` 创建代理。
    *   代理对象实现目标对象的接口。
    *   必须要求目标对象实现接口。
    *   性能相对较慢（反射调用）。
    *   JDK 自带，无需额外依赖。

2.  **CGLIB 代理**
    *   基于字节码生成技术（ASM），使用 `Enhancer.create()` 创建代理。
    *   代理对象是目标类的子类。
    *   无需目标对象实现接口。
    *   性能相对较快（直接调用）。
    *   不能代理 final 类和 final 方法。

3.  **选择依据**
    *   有接口：默认使用 JDK 动态代理。
    *   无接口：自动使用 CGLIB 代理。
    *   可通过 `@EnableAspectJAutoProxy(proxyTargetClass = true)` 强制使用 CGLIB。

4.  **Spring AOP 默认策略**
    *   Spring AOP 会自动选择合适的代理方式。
    *   优先使用 JDK 动态代理。
    *   必要时自动切换到 CGLIB 代理。

**记忆口诀**

**"JDK 接口反射慢，CGLIB 子类字节快；接口用 JDK 代，无口 CGLIB 来；final 方法不能代，代理选择 Spring 排"**

-   **JDK 接口反射慢**：JDK 动态代理基于接口和反射，性能较慢。
-   **CGLIB 子类字节快**：CGLIB 代理基于子类和字节码，性能较快。
-   **接口用 JDK 代**：有接口的类使用 JDK 动态代理。
-   **无口 CGLIB 来**：没有接口的类使用 CGLIB 代理。
-   **final 方法不能代**：final 类和方法不能被 CGLIB 代理。
-   **代理选择 Spring 排**：Spring AOP 会自动选择合适的代理方式。

### 25. JDK 动态代理和 CGLIB 代理的区别是什么？

**核心答案**

JDK 动态代理和 CGLIB 代理是 Spring AOP 的两种代理实现方式，它们在实现原理、使用条件、性能表现等方面存在显著区别：

| 对比维度 | JDK 动态代理 | CGLIB 代理 |
| :--- | :--- | :--- |
| **实现原理** | 基于 Java 反射机制 | 基于 ASM 字节码生成框架 |
| **代理对象** | 实现目标对象的接口 | 继承目标类生成子类 |
| **使用条件** | 目标对象必须实现接口 | 目标对象不需要实现接口 |
| **代理方法** | 只能代理接口中定义的方法 | 可以代理类中所有非 final 的 public/protected 方法 |
| **性能** | 创建代理快，调用较慢（反射） | 创建代理慢，调用较快（直接调用） |
| **限制** | 必须有接口 | 不能代理 final 类和 final 方法 |
| **依赖** | JDK 原生支持，无需额外依赖 | 需要 CGLIB 库（Spring 已内置） |
| **类结构** | 代理类与目标类是兄弟关系 | 代理类是目标类的子类 |
| **适用场景** | 面向接口编程的场景 | 无接口或需要代理类本身方法的场景 |

**详细说明**

**1. 实现原理对比**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"></polygon>
</marker>
</defs>
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">实现原理对比</text>
<rect x="50" y="60" width="330" height="400" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="215" y="90" font-size="16" font-weight="bold" text-anchor="middle" fill="#1976d2">JDK 动态代理</text>
<rect x="80" y="110" width="120" height="60" fill="#fff" stroke="#1976d2" stroke-width="2" rx="3"></rect>
<text x="140" y="135" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">接口</text>
<text x="140" y="155" font-size="11" text-anchor="middle" fill="#666">UserService</text>
<rect x="230" y="110" width="120" height="60" fill="#fff" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="290" y="135" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">实现类</text>
<text x="290" y="155" font-size="11" text-anchor="middle" fill="#666">UserServiceImpl</text>
<line x1="200" y1="140" x2="220" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="80" y="200" width="120" height="60" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="3"></rect>
<text x="140" y="225" font-size="12" font-weight="bold" text-anchor="middle" fill="#f57c00">代理对象</text>
<text x="140" y="245" font-size="11" text-anchor="middle" fill="#666">$Proxy0</text>
<line x1="140" y1="110" x2="140" y2="190" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"></line>
<text x="100" y="155" font-size="10" fill="#f57c00">实现</text>
<rect x="230" y="200" width="120" height="60" fill="#ffe0b2" stroke="#ff9800" stroke-width="2" rx="3"></rect>
<text x="290" y="225" font-size="11" font-weight="bold" text-anchor="middle" fill="#ff9800">Invocation</text>
<text x="290" y="245" font-size="11" font-weight="bold" text-anchor="middle" fill="#ff9800">Handler</text>
<line x1="200" y1="230" x2="220" y2="230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"></line>
<rect x="80" y="290" width="270" height="150" fill="#f5f5f5" stroke="#999" stroke-width="1" rx="3"></rect>
<text x="215" y="315" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">工作流程</text>
<text x="215" y="340" font-size="10" text-anchor="middle" fill="#666">1. Proxy.newProxyInstance()</text>
<text x="215" y="360" font-size="10" text-anchor="middle" fill="#666">2. 生成代理类字节码</text>
<text x="215" y="380" font-size="10" text-anchor="middle" fill="#666">3. 加载代理类</text>
<text x="215" y="400" font-size="10" text-anchor="middle" fill="#666">4. 通过反射调用 invoke()</text>
<text x="215" y="420" font-size="10" text-anchor="middle" fill="#666">5. invoke() 调用目标方法</text>
<rect x="420" y="60" width="330" height="400" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"></rect>
<text x="585" y="90" font-size="16" font-weight="bold" text-anchor="middle" fill="#ff9800">CGLIB 代理</text>
<rect x="470" y="110" width="240" height="60" fill="#fff" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="590" y="135" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">目标类（无需接口）</text>
<text x="590" y="155" font-size="11" text-anchor="middle" fill="#666">UserService</text>
<rect x="470" y="200" width="240" height="60" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="3"></rect>
<text x="590" y="225" font-size="12" font-weight="bold" text-anchor="middle" fill="#f57c00">代理对象（子类）</text>
<text x="590" y="245" font-size="10" text-anchor="middle" fill="#666">UserService$$EnhancerByCGLIB$$</text>
<line x1="590" y1="170" x2="590" y2="190" stroke="#f57c00" stroke-width="2" marker-end="url(#arrowhead)"></line>
<text x="620" y="185" font-size="10" fill="#f57c00">继承</text>
<rect x="470" y="290" width="240" height="150" fill="#f5f5f5" stroke="#999" stroke-width="1" rx="3"></rect>
<text x="590" y="315" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">工作流程</text>
<text x="590" y="340" font-size="10" text-anchor="middle" fill="#666">1. Enhancer.create()</text>
<text x="590" y="360" font-size="10" text-anchor="middle" fill="#666">2. 使用 ASM 生成子类字节码</text>
<text x="590" y="380" font-size="10" text-anchor="middle" fill="#666">3. 加载代理类</text>
<text x="590" y="400" font-size="10" text-anchor="middle" fill="#666">4. 调用 MethodInterceptor.intercept()</text>
<text x="590" y="420" font-size="10" text-anchor="middle" fill="#666">5. 通过 FastClass 调用父类方法</text>
</svg>

**(1) JDK 动态代理实现原理**

```java
/**
 * JDK 动态代理底层实现原理
 */
public class JdkProxyPrinciple {

    public static void main(String[] args) {
        // 设置系统属性，生成代理类文件到磁盘（用于查看）
        System.setProperty("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");

        UserService target = new UserServiceImpl();

        // 创建代理对象
        UserService proxy = (UserService) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),
            new InvocationHandler() {
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    System.out.println("代理前置逻辑");
                    Object result = method.invoke(target, args);  // 反射调用
                    System.out.println("代理后置逻辑");
                    return result;
                }
            }
        );

        proxy.saveUser(new User("张三"));
    }
}

// JDK 生成的代理类（反编译后）大致结构：
public final class $Proxy0 extends Proxy implements UserService {

    private static Method m3;  // saveUser 方法

    static {
        try {
            // 初始化方法对象
            m3 = Class.forName("UserService").getMethod("saveUser", User.class);
        } catch (Exception e) {
            throw new NoSuchMethodError(e.getMessage());
        }
    }

    public $Proxy0(InvocationHandler h) {
        super(h);
    }

    @Override
    public User saveUser(User user) {
        try {
            // 调用 InvocationHandler.invoke()
            return (User) super.h.invoke(this, m3, new Object[]{user});
        } catch (Throwable e) {
            throw new UndeclaredThrowableException(e);
        }
    }
}

// 关键点：
// 1. 代理类继承 Proxy，实现 UserService 接口
// 2. 通过反射获取目标方法的 Method 对象
// 3. 调用 InvocationHandler.invoke() 方法
// 4. invoke() 内部通过 method.invoke() 反射调用目标方法
```

**(2) CGLIB 代理实现原理**

```java
/**
 * CGLIB 代理底层实现原理
 */
public class CglibProxyPrinciple {

    public static void main(String[] args) {
        // 设置系统属性，生成代理类文件到磁盘（用于查看）
        System.setProperty(DebuggingClassWriter.DEBUG_LOCATION_PROPERTY, "./cglib_classes");

        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(UserService.class);
        enhancer.setCallback(new MethodInterceptor() {
            @Override
            public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
                System.out.println("代理前置逻辑");
                // 通过 FastClass 调用父类方法（不使用反射）
                Object result = proxy.invokeSuper(obj, args);
                System.out.println("代理后置逻辑");
                return result;
            }
        });

        UserService proxy = (UserService) enhancer.create();
        proxy.saveUser(new User("张三"));
    }
}

// CGLIB 生成的代理类（简化后）大致结构：
public class UserService$$EnhancerByCGLIB$$12345 extends UserService {

    private MethodInterceptor CGLIB$CALLBACK_0;

    @Override
    public User saveUser(User user) {
        MethodInterceptor interceptor = CGLIB$CALLBACK_0;

        if (interceptor == null) {
            // 没有拦截器，直接调用父类方法
            return super.saveUser(user);
        } else {
            // 调用拦截器
            return (User) interceptor.intercept(
                this,                           // 代理对象
                CGLIB$saveUser$0$Method,       // 方法对象
                new Object[]{user},            // 参数
                CGLIB$saveUser$0$Proxy         // MethodProxy（FastClass 索引）
            );
        }
    }

    // CGLIB 生成的 FastClass 类
    // FastClass 通过索引直接调用方法，避免反射
    final User CGLIB$saveUser$0(User user) {
        return super.saveUser(user);
    }
}

// 关键点：
// 1. 代理类继承目标类 UserService
// 2. 使用 ASM 字节码框架生成子类
// 3. 通过 MethodInterceptor.intercept() 拦截方法调用
// 4. 通过 FastClass 机制避免反射，直接通过索引调用方法
// 5. 性能比 JDK 动态代理高
```

**2. 性能对比**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">性能对比（创建速度 vs 执行速度）</text>
<rect x="50" y="60" width="330" height="300" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="215" y="90" font-size="14" font-weight="bold" text-anchor="middle" fill="#1976d2">JDK 动态代理</text>
<rect x="80" y="110" width="270" height="100" fill="#fff" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="215" y="135" font-size="12" font-weight="bold" text-anchor="middle" fill="#4caf50">创建速度：快 ⚡⚡⚡</text>
<text x="215" y="160" font-size="11" text-anchor="middle" fill="#666">• 直接生成代理类字节码</text>
<text x="215" y="180" font-size="11" text-anchor="middle" fill="#666">• 字节码结构简单</text>
<text x="215" y="200" font-size="11" text-anchor="middle" fill="#666">• 约 1-2ms</text>
<rect x="80" y="230" width="270" height="110" fill="#fff" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="215" y="255" font-size="12" font-weight="bold" text-anchor="middle" fill="#f44336">执行速度：慢 🐌</text>
<text x="215" y="280" font-size="11" text-anchor="middle" fill="#666">• 每次调用都需要反射</text>
<text x="215" y="300" font-size="11" text-anchor="middle" fill="#666">• method.invoke() 开销大</text>
<text x="215" y="320" font-size="11" text-anchor="middle" fill="#666">• 约 0.1-0.2 微秒/次</text>
<rect x="420" y="60" width="330" height="300" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"></rect>
<text x="585" y="90" font-size="14" font-weight="bold" text-anchor="middle" fill="#ff9800">CGLIB 代理</text>
<rect x="450" y="110" width="270" height="100" fill="#fff" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="585" y="135" font-size="12" font-weight="bold" text-anchor="middle" fill="#f44336">创建速度：慢 🐌🐌</text>
<text x="585" y="160" font-size="11" text-anchor="middle" fill="#666">• 使用 ASM 生成字节码</text>
<text x="585" y="180" font-size="11" text-anchor="middle" fill="#666">• 生成 FastClass 类</text>
<text x="585" y="200" font-size="11" text-anchor="middle" fill="#666">• 约 10-20ms</text>
<rect x="450" y="230" width="270" height="110" fill="#fff" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="585" y="255" font-size="12" font-weight="bold" text-anchor="middle" fill="#4caf50">执行速度：快 ⚡⚡⚡</text>
<text x="585" y="280" font-size="11" text-anchor="middle" fill="#666">• FastClass 直接调用</text>
<text x="585" y="300" font-size="11" text-anchor="middle" fill="#666">• 无反射开销</text>
<text x="585" y="320" font-size="11" text-anchor="middle" fill="#666">• 约 0.05-0.1 微秒/次</text>
</svg>

**性能测试代码**

```java
/**
 * JDK 动态代理 vs CGLIB 代理性能测试
 */
public class ProxyPerformanceTest {

    private static final int ITERATIONS = 10_000_000;  // 1000 万次

    public static void main(String[] args) {
        testCreationTime();
        testExecutionTime();
    }

    /**
     * 测试代理对象创建时间
     */
    private static void testCreationTime() {
        System.out.println("========== 代理对象创建时间测试 ==========");

        // JDK 动态代理创建时间
        long jdkStart = System.currentTimeMillis();
        for (int i = 0; i < 1000; i++) {
            UserService target = new UserServiceImpl();
            UserService proxy = (UserService) Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                (p, m, a) -> m.invoke(target, a)
            );
        }
        long jdkTime = System.currentTimeMillis() - jdkStart;
        System.out.println("JDK 动态代理创建 1000 个代理对象耗时: " + jdkTime + "ms");

        // CGLIB 代理创建时间
        long cglibStart = System.currentTimeMillis();
        for (int i = 0; i < 1000; i++) {
            Enhancer enhancer = new Enhancer();
            enhancer.setSuperclass(UserService.class);
            enhancer.setCallback((MethodInterceptor) (obj, method, args, proxy) ->
                proxy.invokeSuper(obj, args));
            UserService proxy = (UserService) enhancer.create();
        }
        long cglibTime = System.currentTimeMillis() - cglibStart;
        System.out.println("CGLIB 代理创建 1000 个代理对象耗时: " + cglibTime + "ms");

        System.out.println("创建速度比: JDK 是 CGLIB 的 " + (cglibTime / jdkTime) + " 倍快\n");
    }

    /**
     * 测试方法调用执行时间
     */
    private static void testExecutionTime() {
        System.out.println("========== 方法调用执行时间测试 ==========");

        // 创建 JDK 代理
        UserService jdkTarget = new UserServiceImpl();
        UserService jdkProxy = (UserService) Proxy.newProxyInstance(
            jdkTarget.getClass().getClassLoader(),
            jdkTarget.getClass().getInterfaces(),
            (p, m, a) -> m.invoke(jdkTarget, a)
        );

        // 创建 CGLIB 代理
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(UserService.class);
        enhancer.setCallback((MethodInterceptor) (obj, method, args, proxy) ->
            proxy.invokeSuper(obj, args));
        UserService cglibProxy = (UserService) enhancer.create();

        User user = new User("张三");

        // 预热 JVM
        for (int i = 0; i < 10000; i++) {
            jdkProxy.saveUser(user);
            cglibProxy.saveUser(user);
        }

        // JDK 动态代理执行时间
        long jdkStart = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            jdkProxy.saveUser(user);
        }
        long jdkTime = System.nanoTime() - jdkStart;
        System.out.println("JDK 动态代理执行 " + ITERATIONS + " 次耗时: " + jdkTime / 1_000_000 + "ms");
        System.out.println("平均每次调用: " + jdkTime / ITERATIONS + " 纳秒");

        // CGLIB 代理执行时间
        long cglibStart = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            cglibProxy.saveUser(user);
        }
        long cglibTime = System.nanoTime() - cglibStart;
        System.out.println("CGLIB 代理执行 " + ITERATIONS + " 次耗时: " + cglibTime / 1_000_000 + "ms");
        System.out.println("平均每次调用: " + cglibTime / ITERATIONS + " 纳秒");

        System.out.println("执行速度比: CGLIB 比 JDK 快 " + (jdkTime / cglibTime) + " 倍\n");
    }
}

// 典型输出结果：
// ========== 代理对象创建时间测试 ==========
// JDK 动态代理创建 1000 个代理对象耗时: 50ms
// CGLIB 代理创建 1000 个代理对象耗时: 500ms
// 创建速度比: JDK 是 CGLIB 的 10 倍快
//
// ========== 方法调用执行时间测试 ==========
// JDK 动态代理执行 10000000 次耗时: 1200ms
// 平均每次调用: 120 纳秒
// CGLIB 代理执行 10000000 次耗时: 600ms
// 平均每次调用: 60 纳秒
// 执行速度比: CGLIB 比 JDK 快 2 倍
```

**3. 使用限制对比**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">使用限制对比</text>
<rect x="50" y="60" width="330" height="360" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="215" y="90" font-size="14" font-weight="bold" text-anchor="middle" fill="#1976d2">JDK 动态代理限制</text>
<rect x="70" y="110" width="290" height="70" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="215" y="135" font-size="12" font-weight="bold" text-anchor="middle" fill="#f44336">✗ 必须实现接口</text>
<text x="215" y="160" font-size="11" text-anchor="middle" fill="#666">没有接口的类无法使用</text>
<rect x="70" y="190" width="290" height="70" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="215" y="215" font-size="12" font-weight="bold" text-anchor="middle" fill="#f44336">✗ 只能代理接口方法</text>
<text x="215" y="240" font-size="11" text-anchor="middle" fill="#666">类中其他 public 方法无法代理</text>
<rect x="70" y="270" width="290" height="70" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="215" y="295" font-size="12" font-weight="bold" text-anchor="middle" fill="#f44336">✗ 性能开销大</text>
<text x="215" y="320" font-size="11" text-anchor="middle" fill="#666">反射调用，频繁调用性能差</text>
<rect x="70" y="350" width="290" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="215" y="375" font-size="12" font-weight="bold" text-anchor="middle" fill="#4caf50">✓ 无需额外依赖</text>
<text x="215" y="395" font-size="11" text-anchor="middle" fill="#666">JDK 原生支持</text>
<rect x="420" y="60" width="330" height="360" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"></rect>
<text x="585" y="90" font-size="14" font-weight="bold" text-anchor="middle" fill="#ff9800">CGLIB 代理限制</text>
<rect x="440" y="110" width="290" height="70" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="585" y="135" font-size="12" font-weight="bold" text-anchor="middle" fill="#f44336">✗ 不能代理 final 类</text>
<text x="585" y="160" font-size="11" text-anchor="middle" fill="#666">无法继承 final 类</text>
<rect x="440" y="190" width="290" height="70" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="585" y="215" font-size="12" font-weight="bold" text-anchor="middle" fill="#f44336">✗ 不能代理 final 方法</text>
<text x="585" y="240" font-size="11" text-anchor="middle" fill="#666">final 方法无法重写</text>
<rect x="440" y="270" width="290" height="70" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="3"></rect>
<text x="585" y="295" font-size="12" font-weight="bold" text-anchor="middle" fill="#f44336">✗ 创建代理慢</text>
<text x="585" y="320" font-size="11" text-anchor="middle" fill="#666">字节码生成耗时</text>
<rect x="440" y="350" width="290" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="3"></rect>
<text x="585" y="375" font-size="12" font-weight="bold" text-anchor="middle" fill="#4caf50">✓ 执行速度快</text>
<text x="585" y="395" font-size="11" text-anchor="middle" fill="#666">无反射开销</text>
</svg>

**限制示例代码**

```java
/**
 * 两种代理方式的限制对比
 */
public class ProxyLimitationsComparison {

    // ========== JDK 动态代理限制 ==========

    // ✗ JDK 限制1：必须实现接口
    class NoInterfaceService {
        public void doSomething() {
            System.out.println("执行操作");
        }
    }

    public void testJdkLimitation1() {
        NoInterfaceService target = new NoInterfaceService();

        try {
            // 尝试为没有接口的类创建 JDK 代理
            Object proxy = Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),  // 空数组
                (p, m, a) -> m.invoke(target, a)
            );
        } catch (IllegalArgumentException e) {
            System.err.println("✗ JDK 代理失败：目标类必须实现接口");
        }

        // ✓ CGLIB 可以代理
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(NoInterfaceService.class);
        enhancer.setCallback((MethodInterceptor) (obj, method, args, proxy) ->
            proxy.invokeSuper(obj, args));
        NoInterfaceService cglibProxy = (NoInterfaceService) enhancer.create();
        cglibProxy.doSomething();  // 成功
        System.out.println("✓ CGLIB 代理成功");
    }

    // ✗ JDK 限制2：只能代理接口方法
    interface SimpleService {
        void interfaceMethod();
    }

    class SimpleServiceImpl implements SimpleService {
        @Override
        public void interfaceMethod() {
            System.out.println("接口方法");
        }

        public void publicMethod() {
            System.out.println("公共方法（不在接口中）");
        }
    }

    public void testJdkLimitation2() {
        SimpleServiceImpl target = new SimpleServiceImpl();

        // JDK 代理只能访问接口方法
        SimpleService jdkProxy = (SimpleService) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            new Class[]{SimpleService.class},
            (p, m, a) -> m.invoke(target, a)
        );

        jdkProxy.interfaceMethod();  // ✓ 可以调用
        // jdkProxy.publicMethod();  // ✗ 编译错误：方法不存在

        // CGLIB 可以代理类中所有方法
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(SimpleServiceImpl.class);
        enhancer.setCallback((MethodInterceptor) (obj, method, args, proxy) ->
            proxy.invokeSuper(obj, args));
        SimpleServiceImpl cglibProxy = (SimpleServiceImpl) enhancer.create();

        cglibProxy.interfaceMethod();  // ✓ 可以调用
        cglibProxy.publicMethod();     // ✓ 也可以调用
    }

    // ========== CGLIB 代理限制 ==========

    // ✗ CGLIB 限制1：不能代理 final 类
    final class FinalClass {
        public void doSomething() {
            System.out.println("执行操作");
        }
    }

    public void testCglibLimitation1() {
        try {
            Enhancer enhancer = new Enhancer();
            enhancer.setSuperclass(FinalClass.class);  // ✗ 错误：不能继承 final 类
            enhancer.setCallback((MethodInterceptor) (obj, method, args, proxy) ->
                proxy.invokeSuper(obj, args));
            Object proxy = enhancer.create();
        } catch (IllegalArgumentException e) {
            System.err.println("✗ CGLIB 代理失败：不能代理 final 类");
        }
    }

    // ✗ CGLIB 限制2：不能代理 final 方法
    class ServiceWithFinalMethod {
        public void normalMethod() {
            System.out.println("普通方法");
        }

        public final void finalMethod() {
            System.out.println("final 方法");
        }
    }

    public void testCglibLimitation2() {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(ServiceWithFinalMethod.class);
        enhancer.setCallback(new MethodInterceptor() {
            @Override
            public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
                System.out.println("【拦截】" + method.getName());
                return proxy.invokeSuper(obj, args);
            }
        });

        ServiceWithFinalMethod proxy = (ServiceWithFinalMethod) enhancer.create();

        proxy.normalMethod();  // ✓ 会被拦截
        // 输出：【拦截】normalMethod
        //      普通方法

        proxy.finalMethod();   // ✗ 不会被拦截（final 方法不能被重写）
        // 输出：final 方法
    }
}
```

**4. 适用场景对比**

```java
/**
 * 两种代理方式的适用场景
 */
public class ProxyScenarios {

    // ========== JDK 动态代理适用场景 ==========

    // 场景1：面向接口编程（推荐）
    interface UserService {
        void saveUser(User user);
    }

    @Service
    class UserServiceImpl implements UserService {
        @Override
        public void saveUser(User user) {
            System.out.println("保存用户: " + user);
        }
    }

    // 场景2：DAO 层（通常有接口）
    interface UserDao {
        User findById(Long id);
        void save(User user);
    }

    // 场景3：第三方接口调用（如 Feign 客户端）
    @FeignClient("user-service")
    interface UserClient {
        @GetMapping("/users/{id}")
        User getUser(@PathVariable Long id);
    }

    // ========== CGLIB 代理适用场景 ==========

    // 场景1：没有实现接口的类
    @Service
    class OrderService {  // 没有接口
        public void createOrder(Order order) {
            System.out.println("创建订单: " + order);
        }
    }

    // 场景2：需要代理类本身的方法（不仅仅是接口方法）
    @Service
    class ProductService implements BaseService {
        @Override
        public void save() {
            System.out.println("保存");
        }

        // 这个方法不在接口中，只有 CGLIB 能代理
        public void batchSave(List<Product> products) {
            System.out.println("批量保存: " + products.size());
        }
    }

    // 场景3：性能要求高，方法调用频繁
    @Service
    class CacheService {
        // 频繁调用的方法，CGLIB 代理性能更好
        public String get(String key) {
            return cache.get(key);
        }

        public void put(String key, String value) {
            cache.put(key, value);
        }
    }

    // ========== Spring AOP 自动选择 ==========

    @Configuration
    @EnableAspectJAutoProxy  // 默认：有接口用 JDK，无接口用 CGLIB
    public class DefaultProxyConfig {
    }

    @Configuration
    @EnableAspectJAutoProxy(proxyTargetClass = true)  // 强制使用 CGLIB
    public class ForceCglibConfig {
    }
}
```

**关键要点**

1.  **实现原理**
    *   JDK 动态代理：基于 Java 反射机制，代理对象实现目标对象的接口。
    *   CGLIB 代理：基于 ASM 字节码生成框架，代理对象是目标类的子类。

2.  **使用条件**
    *   JDK 动态代理：目标对象必须实现接口。
    *   CGLIB 代理：目标对象不需要实现接口，但不能是 final 类。

3.  **性能表现**
    *   JDK 动态代理：创建快（1-2ms），执行慢（反射调用）。
    *   CGLIB 代理：创建慢（10-20ms），执行快（FastClass 直接调用）。

4.  **限制对比**
    *   JDK 动态代理：必须有接口，只能代理接口方法。
    *   CGLIB 代理：不能代理 final 类和 final 方法。

5.  **依赖要求**
    *   JDK 动态代理：JDK 原生支持，无需额外依赖。
    *   CGLIB 代理：需要 CGLIB 库（Spring 已内置）。

6.  **选择建议**
    *   面向接口编程：优先使用 JDK 动态代理。
    *   没有接口或需要代理类方法：使用 CGLIB 代理。
    *   方法调用频繁、性能要求高：使用 CGLIB 代理。
    *   Spring AOP 会自动选择合适的代理方式。

**记忆口诀**

**"JDK 接口反射慢，CGLIB 子类字节快；有口 JDK 来代理，无口 CGLIB 显神通；final 类方法不能代，Spring 自动选最佳"**

-   **JDK 接口反射慢**：JDK 基于接口和反射，执行较慢。
-   **CGLIB 子类字节快**：CGLIB 基于子类和字节码，执行较快。
-   **有口 JDK 来代理**：有接口优先用 JDK 动态代理。
-   **无口 CGLIB 显神通**：没有接口就用 CGLIB 代理。
-   **final 类方法不能代**：final 类和 final 方法无法被 CGLIB 代理。
-   **Spring 自动选最佳**：Spring AOP 会根据情况自动选择最合适的代理方式。

**性能记忆口诀：**
-   **"创建 JDK 快，执行 CGLIB 快；少量代理 JDK 好，频繁调用 CGLIB 妙"**

### 26. Spring 如何选择使用哪种代理方式？

**核心答案**

Spring AOP 会根据目标对象的特征**自动选择**使用 JDK 动态代理还是 CGLIB 代理,选择规则如下:

| 场景 | 代理方式 | 判断条件 |
|-----|---------|---------|
| **目标对象实现了接口** | JDK 动态代理 | 默认优先使用 |
| **目标对象没有实现接口** | CGLIB 代理 | 自动切换 |
| **强制使用 CGLIB** | CGLIB 代理 | `proxyTargetClass = true` |
| **目标对象是接口** | JDK 动态代理 | 接口本身只能用 JDK 代理 |
| **目标对象是 JDK 代理类** | JDK 动态代理 | 已经是代理类 |

**选择逻辑（伪代码）:**

```java
if (目标对象实现了接口 && proxyTargetClass == false) {
    使用 JDK 动态代理
} else if (目标对象是接口 || 目标对象是 JDK 代理类) {
    使用 JDK 动态代理
} else {
    使用 CGLIB 代理
}
```

**详细说明**

**(1) Spring AOP 代理选择流程**

<svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring AOP 代理方式选择流程</text>
<rect x="250" y="60" width="300" height="50" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="90" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">开始：需要为目标对象创建代理</text>
<line x1="400" y1="110" x2="400" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<path d="M 250 165 L 400 140 L 550 165 L 400 190 Z" fill="#fff9c4" stroke="#fbc02d" stroke-width="2"/>
<text x="400" y="172" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">是否配置了</text>
<text x="400" y="187" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">proxyTargetClass=true?</text>
<line x1="550" y1="165" x2="650" y2="165" stroke="#f44336" stroke-width="2"/>
<text x="600" y="160" font-size="11" fill="#f44336">是</text>
<rect x="650" y="145" width="120" height="40" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="710" y="170" font-size="12" text-anchor="middle" fill="#fff">使用 CGLIB</text>
<line x1="400" y1="190" x2="400" y2="220" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="450" y="210" font-size="11" fill="#4caf50">否</text>
<path d="M 250 245 L 400 220 L 550 245 L 400 270 Z" fill="#e1f5fe" stroke="#0277bd" stroke-width="2"/>
<text x="400" y="252" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">目标对象是否</text>
<text x="400" y="267" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">是接口?</text>
<line x1="550" y1="245" x2="650" y2="245" stroke="#1976d2" stroke-width="2"/>
<text x="600" y="240" font-size="11" fill="#1976d2">是</text>
<rect x="650" y="225" width="120" height="40" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="710" y="250" font-size="12" text-anchor="middle" fill="#fff">使用 JDK 代理</text>
<line x1="400" y1="270" x2="400" y2="300" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="450" y="290" font-size="11" fill="#4caf50">否</text>
<path d="M 250 325 L 400 300 L 550 325 L 400 350 Z" fill="#e1f5fe" stroke="#0277bd" stroke-width="2"/>
<text x="400" y="332" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">目标对象是否是</text>
<text x="400" y="347" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">JDK 代理类?</text>
<line x1="550" y1="325" x2="650" y2="325" stroke="#1976d2" stroke-width="2"/>
<text x="600" y="320" font-size="11" fill="#1976d2">是</text>
<rect x="650" y="305" width="120" height="40" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="710" y="330" font-size="12" text-anchor="middle" fill="#fff">使用 JDK 代理</text>
<line x1="400" y1="350" x2="400" y2="380" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="450" y="370" font-size="11" fill="#4caf50">否</text>
<path d="M 250 405 L 400 380 L 550 405 L 400 430 Z" fill="#e1f5fe" stroke="#0277bd" stroke-width="2"/>
<text x="400" y="412" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">目标对象是否</text>
<text x="400" y="427" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">实现了接口?</text>
<line x1="550" y1="405" x2="650" y2="405" stroke="#1976d2" stroke-width="2"/>
<text x="600" y="400" font-size="11" fill="#1976d2">是</text>
<rect x="650" y="385" width="120" height="40" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="710" y="410" font-size="12" text-anchor="middle" fill="#fff">使用 JDK 代理</text>
<line x1="400" y1="430" x2="400" y2="460" stroke="#f57c00" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="450" y="450" font-size="11" fill="#f57c00">否</text>
<rect x="340" y="460" width="120" height="40" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="400" y="485" font-size="12" text-anchor="middle" fill="#fff">使用 CGLIB</text>
<line x1="710" y1="185" x2="710" y2="520" stroke="#666" stroke-width="2"/>
<line x1="710" y1="265" x2="710" y2="520" stroke="#666" stroke-width="2"/>
<line x1="710" y1="345" x2="710" y2="520" stroke="#666" stroke-width="2"/>
<line x1="710" y1="425" x2="710" y2="520" stroke="#666" stroke-width="2"/>
<line x1="400" y1="500" x2="400" y2="520" stroke="#666" stroke-width="2"/>
<line x1="400" y1="520" x2="710" y2="520" stroke="#666" stroke-width="2"/>
<line x1="555" y1="520" x2="555" y2="550" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="495" y="550" width="120" height="50" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="555" y="580" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">创建代理对象</text>
<rect x="50" y="620" width="700" height="70" fill="#f5f5f5" stroke="#999" stroke-width="1" rx="3"/>
<text x="400" y="645" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">优先级总结</text>
<text x="400" y="665" font-size="11" text-anchor="middle" fill="#333">1. proxyTargetClass=true → CGLIB</text>
<text x="400" y="682" font-size="11" text-anchor="middle" fill="#333">2. 目标对象是接口/JDK代理类 → JDK   3. 目标对象有接口 → JDK   4. 其他 → CGLIB</text>
</svg>

**(2) DefaultAopProxyFactory 源码分析**

这是 Spring AOP 中负责选择代理方式的核心类:

```java
/**
 * Spring AOP 默认代理工厂
 * 负责决定使用 JDK 动态代理还是 CGLIB 代理
 */
public class DefaultAopProxyFactory implements AopProxyFactory, Serializable {

    @Override
    public AopProxy createAopProxy(AdvisedSupport config) throws AopConfigException {

        // 判断条件1: optimize（优化） 或
        // 判断条件2: proxyTargetClass（强制使用 CGLIB） 或
        // 判断条件3: 没有用户提供的代理接口
        if (config.isOptimize() ||
            config.isProxyTargetClass() ||
            hasNoUserSuppliedProxyInterfaces(config)) {

            Class<?> targetClass = config.getTargetClass();

            if (targetClass == null) {
                throw new AopConfigException(
                    "TargetSource cannot determine target class: " +
                    "Either an interface or a target is required for proxy creation.");
            }

            // 判断条件4: 目标类本身就是接口
            // 判断条件5: 目标类已经是 JDK 代理类
            if (targetClass.isInterface() || Proxy.isProxyClass(targetClass)) {
                return new JdkDynamicAopProxy(config);  // 使用 JDK 动态代理
            }

            // 使用 CGLIB 代理
            return new ObjenesisCglibAopProxy(config);

        } else {
            // 默认使用 JDK 动态代理（有接口的情况）
            return new JdkDynamicAopProxy(config);
        }
    }

    /**
     * 判断是否没有用户提供的代理接口
     */
    private boolean hasNoUserSuppliedProxyInterfaces(AdvisedSupport config) {
        Class<?>[] ifcs = config.getProxiedInterfaces();

        // 没有接口 或者 只有 SpringProxy 接口（Spring 内部接口）
        return (ifcs.length == 0 ||
                (ifcs.length == 1 && SpringProxy.class.isAssignableFrom(ifcs[0])));
    }
}
```

**关键判断逻辑:**

1. **强制使用 CGLIB 的条件（满足任一即可）:**
   - `optimize = true`（优化模式）
   - `proxyTargetClass = true`（强制使用 CGLIB）
   - `hasNoUserSuppliedProxyInterfaces = true`（没有接口）

2. **即使满足上述条件，仍然使用 JDK 代理的情况:**
   - 目标类本身是接口（`targetClass.isInterface()`）
   - 目标类已经是 JDK 代理类（`Proxy.isProxyClass(targetClass)`）

3. **默认情况（有接口）:**
   - 使用 JDK 动态代理

**(3) 配置代理方式的方法**

**方法 1: 全局配置（推荐）**

```java
/**
 * 方式 1: 通过 @EnableAspectJAutoProxy 注解配置
 */
@Configuration
@EnableAspectJAutoProxy(proxyTargetClass = true)  // 强制使用 CGLIB
public class AopConfig {
    // 所有 AOP 代理都使用 CGLIB
}

/**
 * 方式 2: 通过 application.properties 配置
 */
// application.properties
spring.aop.proxy-target-class=true  // 强制使用 CGLIB

/**
 * 方式 3: 通过 XML 配置
 */
// applicationContext.xml
<aop:aspectj-autoproxy proxy-target-class="true"/>
```

**方法 2: 针对特定 Bean 配置**

```java
/**
 * 针对特定 Bean 配置代理方式
 */
@Configuration
public class CustomProxyConfig {

    /**
     * 自定义 BeanPostProcessor，控制特定 Bean 的代理方式
     */
    @Bean
    public BeanPostProcessor customProxyBeanPostProcessor() {
        return new BeanPostProcessor() {
            @Override
            public Object postProcessAfterInitialization(Object bean, String beanName) {
                if (beanName.equals("userService")) {
                    // 为 userService 强制使用 CGLIB 代理
                    ProxyFactory proxyFactory = new ProxyFactory();
                    proxyFactory.setTarget(bean);
                    proxyFactory.setProxyTargetClass(true);  // 强制 CGLIB
                    proxyFactory.addAdvice(new MethodInterceptor() {
                        @Override
                        public Object invoke(MethodInvocation invocation) throws Throwable {
                            System.out.println("方法调用: " + invocation.getMethod().getName());
                            return invocation.proceed();
                        }
                    });
                    return proxyFactory.getProxy();
                }
                return bean;
            }
        };
    }
}
```

**方法 3: 编程式配置**

```java
/**
 * 编程式配置代理方式
 */
public class ProgrammaticProxyExample {

    public static void main(String[] args) {
        // 创建目标对象
        UserService target = new UserServiceImpl();

        // 创建 ProxyFactory
        ProxyFactory proxyFactory = new ProxyFactory();
        proxyFactory.setTarget(target);

        // 配置代理方式
        // 方式 1: 强制使用 CGLIB
        proxyFactory.setProxyTargetClass(true);

        // 方式 2: 设置优化模式（也会使用 CGLIB）
        // proxyFactory.setOptimize(true);

        // 方式 3: 明确设置接口（使用 JDK 代理）
        // proxyFactory.setInterfaces(UserService.class);

        // 添加通知
        proxyFactory.addAdvice(new MethodBeforeAdvice() {
            @Override
            public void before(Method method, Object[] args, Object target) {
                System.out.println("方法执行前: " + method.getName());
            }
        });

        // 创建代理对象
        UserService proxy = (UserService) proxyFactory.getProxy();

        // 查看代理类型
        System.out.println("代理对象类: " + proxy.getClass().getName());
        if (proxy.getClass().getName().contains("$$")) {
            System.out.println("使用 CGLIB 代理");
        } else {
            System.out.println("使用 JDK 动态代理");
        }

        // 调用方法
        proxy.saveUser(new User("张三"));
    }
}
```

**(4) 实际场景示例**

```java
/**
 * 不同场景下的代理方式选择示例
 */
@Configuration
@EnableAspectJAutoProxy  // 默认配置
public class ProxySelectionExamples {

    // ========== 场景 1: 有接口的类 → JDK 动态代理 ==========

    interface UserService {
        void saveUser(User user);
    }

    @Service
    class UserServiceImpl implements UserService {
        @Override
        public void saveUser(User user) {
            System.out.println("保存用户: " + user);
        }
    }
    // 结果: UserServiceImpl$$Proxy... (JDK 动态代理)

    // ========== 场景 2: 没有接口的类 → CGLIB 代理 ==========

    @Service
    class OrderService {  // 没有实现接口
        public void createOrder(Order order) {
            System.out.println("创建订单: " + order);
        }
    }
    // 结果: OrderService$$EnhancerBySpringCGLIB$$... (CGLIB 代理)

    // ========== 场景 3: 强制使用 CGLIB ==========

    @Configuration
    @EnableAspectJAutoProxy(proxyTargetClass = true)  // 强制 CGLIB
    class ForceCglibConfig {
    }

    @Service
    class ProductService implements BaseService {
        @Override
        public void save() {
            System.out.println("保存");
        }
    }
    // 结果: ProductService$$EnhancerBySpringCGLIB$$... (CGLIB 代理)
    // 即使实现了接口，也使用 CGLIB

    // ========== 场景 4: 目标对象是接口 → JDK 动态代理 ==========

    @Bean
    public UserService userService() {
        return (UserService) Proxy.newProxyInstance(
            getClass().getClassLoader(),
            new Class[]{UserService.class},
            (proxy, method, args) -> {
                System.out.println("代理方法: " + method.getName());
                return null;
            }
        );
    }
    // 结果: 即使配置了 proxyTargetClass=true，仍然使用 JDK 代理
    // 因为目标对象本身就是接口

    // ========== 场景 5: 混合使用 ==========

    @Service
    class MixedService implements ServiceA, ServiceB {
        @Override
        public void methodA() {
            System.out.println("方法 A");
        }

        @Override
        public void methodB() {
            System.out.println("方法 B");
        }

        public void methodC() {
            System.out.println("方法 C（不在接口中）");
        }
    }

    // 默认配置: JDK 动态代理
    // - 可以调用 methodA() 和 methodB()
    // - 无法调用 methodC()（不在接口中）

    // 强制 CGLIB: CGLIB 代理
    // - 可以调用 methodA()、methodB()、methodC()
}
```

**(5) 如何查看当前使用的代理方式**

```java
/**
 * 查看代理方式的工具方法
 */
@Component
public class ProxyChecker {

    @Autowired
    private ApplicationContext context;

    /**
     * 检查指定 Bean 的代理方式
     */
    public void checkProxyType(String beanName) {
        Object bean = context.getBean(beanName);
        Class<?> beanClass = bean.getClass();

        System.out.println("========== Bean 代理信息 ==========");
        System.out.println("Bean 名称: " + beanName);
        System.out.println("Bean 类: " + beanClass.getName());

        // 方法 1: 通过类名判断
        if (beanClass.getName().contains("$$EnhancerBySpringCGLIB$$")) {
            System.out.println("代理方式: CGLIB 代理");
        } else if (beanClass.getName().contains("$Proxy")) {
            System.out.println("代理方式: JDK 动态代理");
        } else {
            System.out.println("代理方式: 无代理（原始对象）");
        }

        // 方法 2: 通过 AopUtils 判断
        System.out.println("是否是 AOP 代理: " + AopUtils.isAopProxy(bean));
        System.out.println("是否是 JDK 代理: " + AopUtils.isJdkDynamicProxy(bean));
        System.out.println("是否是 CGLIB 代理: " + AopUtils.isCglibProxy(bean));

        // 方法 3: 通过 Proxy 类判断
        System.out.println("是否是 JDK Proxy 类: " + Proxy.isProxyClass(beanClass));

        // 方法 4: 查看实现的接口
        Class<?>[] interfaces = beanClass.getInterfaces();
        System.out.println("实现的接口数量: " + interfaces.length);
        for (Class<?> iface : interfaces) {
            System.out.println("  - " + iface.getName());
        }

        // 方法 5: 查看父类
        Class<?> superclass = beanClass.getSuperclass();
        System.out.println("父类: " + superclass.getName());
    }

    /**
     * 检查所有 Bean 的代理方式
     */
    public void checkAllBeans() {
        String[] beanNames = context.getBeanDefinitionNames();

        System.out.println("========== 所有 Bean 代理信息统计 ==========");
        int jdkProxyCount = 0;
        int cglibProxyCount = 0;
        int noProxyCount = 0;

        for (String beanName : beanNames) {
            try {
                Object bean = context.getBean(beanName);
                if (AopUtils.isJdkDynamicProxy(bean)) {
                    jdkProxyCount++;
                    System.out.println("[JDK 代理] " + beanName);
                } else if (AopUtils.isCglibProxy(bean)) {
                    cglibProxyCount++;
                    System.out.println("[CGLIB 代理] " + beanName);
                } else {
                    noProxyCount++;
                }
            } catch (Exception e) {
                // 忽略无法获取的 Bean
            }
        }

        System.out.println("\n========== 统计结果 ==========");
        System.out.println("JDK 动态代理: " + jdkProxyCount);
        System.out.println("CGLIB 代理: " + cglibProxyCount);
        System.out.println("无代理: " + noProxyCount);
        System.out.println("总计: " + (jdkProxyCount + cglibProxyCount + noProxyCount));
    }
}

// 使用示例
@SpringBootTest
public class ProxyTest {

    @Autowired
    private ProxyChecker proxyChecker;

    @Test
    public void testProxyType() {
        proxyChecker.checkProxyType("userService");
        proxyChecker.checkAllBeans();
    }
}
```

**(6) 代理方式选择的最佳实践**

```java
/**
 * 代理方式选择最佳实践
 */
public class ProxyBestPractices {

    /**
     * 实践 1: 优先面向接口编程（推荐）
     */
    // ✓ 推荐：定义接口
    interface UserService {
        void saveUser(User user);
        User getUserById(Long id);
    }

    @Service
    class UserServiceImpl implements UserService {
        @Override
        public void saveUser(User user) { }

        @Override
        public User getUserById(Long id) { return null; }
    }
    // 优点：
    // - 代码更灵活，易于测试和维护
    // - 默认使用 JDK 代理，性能开销小
    // - 符合 SOLID 原则

    /**
     * 实践 2: 需要代理类方法时使用 CGLIB
     */
    @Service
    class OrderService {
        public void createOrder(Order order) { }

        public void updateOrderStatus(Long orderId, String status) { }
    }

    @Configuration
    @EnableAspectJAutoProxy(proxyTargetClass = true)
    class CglibConfig { }
    // 使用场景：
    // - 无法定义接口的遗留代码
    // - 需要代理类中所有 public 方法
    // - 性能要求高，方法调用频繁

    /**
     * 实践 3: 混合使用（灵活配置）
     */
    @Configuration
    public class MixedProxyConfig {

        // 默认配置：有接口用 JDK，无接口用 CGLIB
        @EnableAspectJAutoProxy
        static class DefaultConfig { }

        // 特定场景：强制使用 CGLIB
        @Bean
        @Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)  // 强制 CGLIB
        public OrderService orderService() {
            return new OrderService();
        }
    }

    /**
     * 实践 4: 避免常见陷阱
     */
    @Service
    class UserService {
        // ✗ 错误：内部方法调用不会被代理
        public void methodA() {
            System.out.println("方法 A");
            this.methodB();  // 不会被代理拦截
        }

        public void methodB() {
            System.out.println("方法 B");
        }

        // ✓ 正确：通过代理对象调用
        @Autowired
        private ApplicationContext context;

        public void methodA_fixed() {
            System.out.println("方法 A");
            UserService proxy = context.getBean(UserService.class);
            proxy.methodB();  // 会被代理拦截
        }
    }

    /**
     * 实践 5: 性能优化建议
     */
    @Configuration
    public class PerformanceConfig {

        // 场景 1: 代理对象数量少，使用 JDK 代理
        // - 启动快
        // - 内存占用小

        // 场景 2: 方法调用频繁，使用 CGLIB 代理
        @EnableAspectJAutoProxy(proxyTargetClass = true)
        static class HighFrequencyCallConfig { }
        // - 执行快
        // - 适合热点方法

        // 场景 3: 混合使用
        // - 核心服务用 CGLIB
        // - 其他服务用 JDK 代理
    }
}
```

**关键要点**

1. **自动选择规则**
   - 有接口 → JDK 动态代理（默认）
   - 无接口 → CGLIB 代理（自动切换）
   - 强制配置 → CGLIB 代理（`proxyTargetClass=true`）

2. **配置方式**
   - 全局配置: `@EnableAspectJAutoProxy(proxyTargetClass = true)`
   - 属性配置: `spring.aop.proxy-target-class=true`
   - XML 配置: `<aop:aspectj-autoproxy proxy-target-class="true"/>`

3. **特殊情况**
   - 目标对象是接口: 始终使用 JDK 代理
   - 目标对象是 JDK 代理类: 始终使用 JDK 代理
   - 配置了 `optimize=true`: 使用 CGLIB 代理

4. **查看代理方式**
   - `AopUtils.isJdkDynamicProxy(bean)`: 是否是 JDK 代理
   - `AopUtils.isCglibProxy(bean)`: 是否是 CGLIB 代理
   - 类名包含 `$$EnhancerBySpringCGLIB$$`: CGLIB 代理
   - 类名包含 `$Proxy`: JDK 动态代理

5. **最佳实践**
   - 优先面向接口编程（灵活、易测试）
   - 无法定义接口时使用 CGLIB
   - 性能要求高时考虑 CGLIB
   - 避免内部方法调用（不会被代理）

**记忆口诀**

**"有口优先 JDK 代，无口自动 CGLIB 来；强制配置 proxyTargetClass，所有代理 CGLIB 带；接口代理还是 JDK，Spring 自动帮你选"**

- **有口优先 JDK 代**：有接口优先使用 JDK 动态代理
- **无口自动 CGLIB 来**：没有接口自动切换到 CGLIB 代理
- **强制配置 proxyTargetClass**：配置 `proxyTargetClass=true` 强制使用 CGLIB
- **所有代理 CGLIB 带**：强制配置后，所有代理都使用 CGLIB
- **接口代理还是 JDK**：目标对象本身是接口时，仍然使用 JDK 代理
- **Spring 自动帮你选**：大多数情况下，Spring 会自动选择合适的代理方式

### 27. AOP 的应用场景有哪些？

**核心答案**

AOP（面向切面编程）主要用于解决**横切关注点**（Cross-Cutting Concerns）问题,即那些分散在应用程序多个模块中的通用功能。常见的应用场景包括:

| 应用场景 | 说明 | 使用频率 | 典型实现 |
|---------|------|---------|---------|
| **日志记录** | 记录方法调用、参数、返回值、执行时间 | ⭐⭐⭐⭐⭐ | @Before, @Around |
| **性能监控** | 统计方法执行时间、性能分析 | ⭐⭐⭐⭐⭐ | @Around |
| **事务管理** | 声明式事务控制 | ⭐⭐⭐⭐⭐ | @Transactional |
| **权限控制** | 方法级别的权限校验 | ⭐⭐⭐⭐ | @Before |
| **异常处理** | 统一异常捕获和处理 | ⭐⭐⭐⭐ | @AfterThrowing |
| **缓存管理** | 方法结果缓存 | ⭐⭐⭐⭐ | @Around |
| **参数校验** | 方法参数合法性检查 | ⭐⭐⭐ | @Before |
| **数据脱敏** | 敏感数据处理 | ⭐⭐⭐ | @AfterReturning |
| **重试机制** | 失败自动重试 | ⭐⭐⭐ | @Around |
| **审计日志** | 记录用户操作轨迹 | ⭐⭐⭐ | @After |

**详细说明**

**(1) 日志记录（最常见）**

日志记录是 AOP 最典型的应用场景,用于记录方法的调用信息、参数、返回值和执行时间。

```java
/**
 * 日志记录切面
 */
@Aspect
@Component
@Slf4j
public class LoggingAspect {

    /**
     * 方法执行日志（记录入参、出参、耗时）
     */
    @Around("execution(* com.example.service.*.*(..))")
    public Object logMethodExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        // 获取方法信息
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();

        // 记录方法调用开始
        log.info("【方法调用】{}.{}() 开始执行", className, methodName);
        log.info("【方法参数】{}", Arrays.toString(args));

        long startTime = System.currentTimeMillis();

        try {
            // 执行目标方法
            Object result = joinPoint.proceed();

            // 记录方法执行成功
            long executionTime = System.currentTimeMillis() - startTime;
            log.info("【方法返回】{}.{}() 执行成功，耗时: {}ms", className, methodName, executionTime);
            log.info("【返回值】{}", result);

            return result;

        } catch (Exception e) {
            // 记录方法执行失败
            long executionTime = System.currentTimeMillis() - startTime;
            log.error("【方法异常】{}.{}() 执行失败，耗时: {}ms", className, methodName, executionTime, e);
            throw e;
        }
    }

    /**
     * Controller 层请求日志
     */
    @Around("@annotation(org.springframework.web.bind.annotation.RequestMapping) || " +
            "@annotation(org.springframework.web.bind.annotation.GetMapping) || " +
            "@annotation(org.springframework.web.bind.annotation.PostMapping)")
    public Object logControllerRequest(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request =
            ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        // 记录请求信息
        log.info("========== HTTP 请求 ==========");
        log.info("请求 URL: {}", request.getRequestURL());
        log.info("请求方法: {}", request.getMethod());
        log.info("请求 IP: {}", request.getRemoteAddr());
        log.info("控制器方法: {}.{}()",
                joinPoint.getTarget().getClass().getSimpleName(),
                joinPoint.getSignature().getName());

        long startTime = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long executionTime = System.currentTimeMillis() - startTime;

        log.info("响应结果: {}", result);
        log.info("执行耗时: {}ms", executionTime);
        log.info("==================================");

        return result;
    }

    /**
     * 自定义日志注解
     */
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface Log {
        String value() default "";
        String module() default "";
    }

    /**
     * 基于自定义注解的日志记录
     */
    @Around("@annotation(log)")
    public Object logWithAnnotation(ProceedingJoinPoint joinPoint, Log log) throws Throwable {
        log.info("========== {} - {} ==========", log.module(), log.value());

        long startTime = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long executionTime = System.currentTimeMillis() - startTime;

        log.info("操作完成，耗时: {}ms", executionTime);
        return result;
    }
}

// 使用示例
@Service
public class UserService {

    @Log(module = "用户管理", value = "保存用户")
    public void saveUser(User user) {
        // 业务逻辑
    }
}
```

**(2) 性能监控**

监控方法执行时间,识别性能瓶颈,进行性能分析和优化。

```java
/**
 * 性能监控切面
 */
@Aspect
@Component
@Slf4j
public class PerformanceMonitorAspect {

    // 性能统计数据
    private final ConcurrentHashMap<String, MethodStats> statsMap = new ConcurrentHashMap<>();

    /**
     * 方法性能监控
     */
    @Around("execution(* com.example.service.*.*(..))")
    public Object monitorPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodKey = joinPoint.getSignature().toShortString();

        long startTime = System.nanoTime();
        Object result = joinPoint.proceed();
        long executionTime = System.nanoTime() - startTime;

        // 更新统计数据
        statsMap.computeIfAbsent(methodKey, k -> new MethodStats())
                .recordExecution(executionTime);

        // 性能告警（超过阈值）
        if (executionTime > 1_000_000_000) {  // 1秒
            log.warn("【性能警告】方法 {} 执行时间过长: {}ms",
                    methodKey, executionTime / 1_000_000);
        }

        return result;
    }

    /**
     * 慢查询监控
     */
    @Around("execution(* com.example.dao.*.*(..))")
    public Object monitorSlowQuery(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long executionTime = System.currentTimeMillis() - startTime;

        // 慢查询告警（超过 100ms）
        if (executionTime > 100) {
            log.warn("【慢查询】{} 执行时间: {}ms",
                    joinPoint.getSignature().toShortString(), executionTime);
            log.warn("【参数】{}", Arrays.toString(joinPoint.getArgs()));
        }

        return result;
    }

    /**
     * 定时输出性能统计报告
     */
    @Scheduled(fixedRate = 60000)  // 每分钟
    public void printPerformanceReport() {
        log.info("========== 性能统计报告 ==========");

        statsMap.entrySet().stream()
                .sorted((e1, e2) -> Long.compare(e2.getValue().getAvgTime(), e1.getValue().getAvgTime()))
                .forEach(entry -> {
                    MethodStats stats = entry.getValue();
                    log.info("方法: {}", entry.getKey());
                    log.info("  调用次数: {}", stats.getCallCount());
                    log.info("  平均耗时: {}ms", stats.getAvgTime() / 1_000_000);
                    log.info("  最大耗时: {}ms", stats.getMaxTime() / 1_000_000);
                    log.info("  最小耗时: {}ms", stats.getMinTime() / 1_000_000);
                });
    }

    /**
     * 方法统计数据
     */
    @Data
    static class MethodStats {
        private AtomicLong callCount = new AtomicLong(0);
        private AtomicLong totalTime = new AtomicLong(0);
        private AtomicLong maxTime = new AtomicLong(0);
        private AtomicLong minTime = new AtomicLong(Long.MAX_VALUE);

        public void recordExecution(long time) {
            callCount.incrementAndGet();
            totalTime.addAndGet(time);
            maxTime.updateAndGet(max -> Math.max(max, time));
            minTime.updateAndGet(min -> Math.min(min, time));
        }

        public long getAvgTime() {
            long count = callCount.get();
            return count == 0 ? 0 : totalTime.get() / count;
        }
    }
}
```

**(3) 事务管理**

Spring 的声明式事务就是基于 AOP 实现的。

```java
/**
 * 事务管理（Spring 内置）
 */
@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    /**
     * Spring 的 @Transactional 注解基于 AOP 实现
     */
    @Transactional(rollbackFor = Exception.class)
    public void saveUser(User user) {
        userDao.insert(user);

        // 如果后续操作失败，会自动回滚
        if (user.getAge() < 0) {
            throw new BusinessException("年龄不能为负数");
        }
    }

    /**
     * 自定义事务切面（演示原理）
     */
    @Aspect
    @Component
    public class CustomTransactionAspect {

        @Autowired
        private PlatformTransactionManager transactionManager;

        @Around("@annotation(org.springframework.transaction.annotation.Transactional)")
        public Object handleTransaction(ProceedingJoinPoint joinPoint) throws Throwable {
            // 开启事务
            TransactionStatus status = transactionManager.getTransaction(
                new DefaultTransactionDefinition()
            );

            try {
                // 执行业务方法
                Object result = joinPoint.proceed();

                // 提交事务
                transactionManager.commit(status);

                return result;

            } catch (Exception e) {
                // 回滚事务
                transactionManager.rollback(status);
                throw e;
            }
        }
    }
}
```

**(4) 权限控制**

在方法执行前进行权限校验,未授权则拒绝访问。

```java
/**
 * 权限控制切面
 */
@Aspect
@Component
public class PermissionAspect {

    @Autowired
    private SecurityService securityService;

    /**
     * 自定义权限注解
     */
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface RequirePermission {
        String value();  // 需要的权限
        String message() default "无权限访问";
    }

    /**
     * 权限校验切面
     */
    @Before("@annotation(permission)")
    public void checkPermission(JoinPoint joinPoint, RequirePermission permission) {
        // 获取当前用户
        User currentUser = securityService.getCurrentUser();

        if (currentUser == null) {
            throw new UnauthorizedException("用户未登录");
        }

        // 校验权限
        if (!currentUser.hasPermission(permission.value())) {
            log.warn("【权限拒绝】用户 {} 尝试访问 {}，缺少权限: {}",
                    currentUser.getUsername(),
                    joinPoint.getSignature().toShortString(),
                    permission.value());

            throw new PermissionDeniedException(permission.message());
        }

        log.info("【权限通过】用户 {} 访问 {}",
                currentUser.getUsername(),
                joinPoint.getSignature().toShortString());
    }

    /**
     * 角色校验注解
     */
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface RequireRole {
        String[] value();  // 需要的角色
    }

    /**
     * 角色校验切面
     */
    @Before("@annotation(role)")
    public void checkRole(JoinPoint joinPoint, RequireRole role) {
        User currentUser = securityService.getCurrentUser();

        if (currentUser == null) {
            throw new UnauthorizedException("用户未登录");
        }

        // 检查是否拥有任一角色
        boolean hasRole = Arrays.stream(role.value())
                .anyMatch(currentUser::hasRole);

        if (!hasRole) {
            throw new PermissionDeniedException(
                    "需要以下角色之一: " + Arrays.toString(role.value()));
        }
    }
}

// 使用示例
@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping
    @RequirePermission(value = "user:create", message = "无权限创建用户")
    public Result createUser(@RequestBody User user) {
        // 业务逻辑
    }

    @DeleteMapping("/{id}")
    @RequireRole({"ADMIN", "SUPER_ADMIN"})
    public Result deleteUser(@PathVariable Long id) {
        // 业务逻辑
    }
}
```

**(5) 异常处理**

统一捕获和处理异常,记录错误日志,返回友好的错误信息。

```java
/**
 * 异常处理切面
 */
@Aspect
@Component
@Slf4j
public class ExceptionHandlingAspect {

    @Autowired
    private AlertService alertService;

    /**
     * 统一异常处理
     */
    @AfterThrowing(pointcut = "execution(* com.example.service.*.*(..))", throwing = "ex")
    public void handleException(JoinPoint joinPoint, Exception ex) {
        String methodName = joinPoint.getSignature().toShortString();
        Object[] args = joinPoint.getArgs();

        // 记录异常日志
        log.error("【异常捕获】方法 {} 执行失败", methodName, ex);
        log.error("【方法参数】{}", Arrays.toString(args));

        // 根据异常类型进行不同处理
        if (ex instanceof BusinessException) {
            log.warn("【业务异常】{}", ex.getMessage());
        } else if (ex instanceof DataAccessException) {
            log.error("【数据库异常】方法: {}", methodName, ex);
            // 发送告警
            alertService.sendAlert("数据库异常", methodName + ": " + ex.getMessage());
        } else if (ex instanceof NullPointerException) {
            log.error("【空指针异常】方法: {}, 参数: {}", methodName, Arrays.toString(args), ex);
            // 发送告警
            alertService.sendAlert("空指针异常", methodName);
        } else {
            log.error("【未知异常】方法: {}", methodName, ex);
        }

        // 记录异常到数据库
        saveExceptionLog(methodName, args, ex);
    }

    /**
     * 重试失败后的异常处理
     */
    @AfterThrowing(pointcut = "@annotation(com.example.annotation.Retry)", throwing = "ex")
    public void handleRetryFailure(JoinPoint joinPoint, Exception ex) {
        log.error("【重试失败】方法 {} 重试多次后仍然失败",
                joinPoint.getSignature().toShortString(), ex);

        // 发送告警
        alertService.sendCriticalAlert("重试失败", ex.getMessage());
    }

    private void saveExceptionLog(String methodName, Object[] args, Exception ex) {
        ExceptionLog exceptionLog = new ExceptionLog();
        exceptionLog.setMethodName(methodName);
        exceptionLog.setArgs(Arrays.toString(args));
        exceptionLog.setExceptionType(ex.getClass().getName());
        exceptionLog.setExceptionMessage(ex.getMessage());
        exceptionLog.setStackTrace(getStackTrace(ex));
        exceptionLog.setCreateTime(new Date());

        // 保存到数据库
        exceptionLogDao.insert(exceptionLog);
    }
}
```

**(6) 缓存管理**

缓存方法返回结果,提高性能。

```java
/**
 * 缓存管理切面
 */
@Aspect
@Component
public class CacheAspect {

    @Autowired
    private CacheManager cacheManager;

    /**
     * 自定义缓存注解
     */
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface Cacheable {
        String key() default "";
        int expire() default 3600;  // 过期时间（秒）
    }

    /**
     * 缓存切面
     */
    @Around("@annotation(cacheable)")
    public Object handleCache(ProceedingJoinPoint joinPoint, Cacheable cacheable) throws Throwable {
        // 生成缓存 key
        String cacheKey = generateCacheKey(joinPoint, cacheable.key());

        // 查询缓存
        Object cachedResult = cacheManager.get(cacheKey);
        if (cachedResult != null) {
            log.info("【缓存命中】key: {}", cacheKey);
            return cachedResult;
        }

        // 缓存未命中，执行方法
        log.info("【缓存未命中】key: {}, 执行方法", cacheKey);
        Object result = joinPoint.proceed();

        // 将结果放入缓存
        cacheManager.put(cacheKey, result, cacheable.expire());
        log.info("【缓存更新】key: {}", cacheKey);

        return result;
    }

    /**
     * 缓存清除注解
     */
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface CacheEvict {
        String key() default "";
        boolean allEntries() default false;
    }

    /**
     * 缓存清除切面
     */
    @After("@annotation(cacheEvict)")
    public void evictCache(JoinPoint joinPoint, CacheEvict cacheEvict) {
        if (cacheEvict.allEntries()) {
            // 清除所有缓存
            cacheManager.clear();
            log.info("【缓存清除】清除所有缓存");
        } else {
            // 清除指定缓存
            String cacheKey = generateCacheKey(joinPoint, cacheEvict.key());
            cacheManager.evict(cacheKey);
            log.info("【缓存清除】key: {}", cacheKey);
        }
    }

    private String generateCacheKey(JoinPoint joinPoint, String keyExpression) {
        if (keyExpression.isEmpty()) {
            // 默认：类名 + 方法名 + 参数
            return joinPoint.getSignature().toShortString() +
                   ":" + Arrays.toString(joinPoint.getArgs());
        } else {
            // 自定义 key 表达式
            return parseKeyExpression(keyExpression, joinPoint);
        }
    }
}

// 使用示例
@Service
public class UserService {

    @Cacheable(key = "user:#{args[0]}", expire = 600)
    public User getUserById(Long id) {
        // 查询数据库
        return userDao.findById(id);
    }

    @CacheEvict(key = "user:#{args[0].id}")
    public void updateUser(User user) {
        // 更新数据库
        userDao.update(user);
    }
}
```

**(7) 参数校验**

在方法执行前校验参数的合法性。

```java
/**
 * 参数校验切面
 */
@Aspect
@Component
public class ValidationAspect {

    /**
     * 参数校验注解
     */
    @Target({ElementType.METHOD, ElementType.PARAMETER})
    @Retention(RetentionPolicy.RUNTIME)
    public @interface Validate {
        boolean notNull() default false;
        boolean notEmpty() default false;
        int minLength() default 0;
        int maxLength() default Integer.MAX_VALUE;
        String pattern() default "";
    }

    /**
     * 参数校验切面
     */
    @Before("execution(* com.example.service.*.*(..)) && @annotation(validate)")
    public void validateParameters(JoinPoint joinPoint, Validate validate) {
        Object[] args = joinPoint.getArgs();

        for (Object arg : args) {
            // 非空校验
            if (validate.notNull() && arg == null) {
                throw new IllegalArgumentException("参数不能为 null");
            }

            // 非空字符串校验
            if (validate.notEmpty() && arg instanceof String) {
                String str = (String) arg;
                if (str.isEmpty()) {
                    throw new IllegalArgumentException("参数不能为空字符串");
                }

                // 长度校验
                if (str.length() < validate.minLength()) {
                    throw new IllegalArgumentException(
                            "参数长度不能小于 " + validate.minLength());
                }
                if (str.length() > validate.maxLength()) {
                    throw new IllegalArgumentException(
                            "参数长度不能大于 " + validate.maxLength());
                }

                // 正则校验
                if (!validate.pattern().isEmpty() && !str.matches(validate.pattern())) {
                    throw new IllegalArgumentException(
                            "参数格式不符合要求: " + validate.pattern());
                }
            }
        }
    }

    /**
     * JSR-303 参数校验
     */
    @Before("execution(* com.example.service.*.*(..))")
    public void validateJsr303(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        for (Object arg : args) {
            if (arg != null) {
                Set<ConstraintViolation<Object>> violations = validator.validate(arg);

                if (!violations.isEmpty()) {
                    StringBuilder sb = new StringBuilder();
                    for (ConstraintViolation<Object> violation : violations) {
                        sb.append(violation.getMessage()).append("; ");
                    }
                    throw new IllegalArgumentException("参数校验失败: " + sb);
                }
            }
        }
    }
}
```

**(8) 数据脱敏**

对敏感数据进行脱敏处理,保护用户隐私。

```java
/**
 * 数据脱敏切面
 */
@Aspect
@Component
public class DataMaskingAspect {

    /**
     * 脱敏注解
     */
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface DataMask {
        String[] fields() default {};
    }

    /**
     * 数据脱敏切面
     */
    @AfterReturning(pointcut = "@annotation(dataMask)", returning = "result")
    public void maskData(JoinPoint joinPoint, DataMask dataMask, Object result) {
        if (result == null) {
            return;
        }

        try {
            if (result instanceof List) {
                // 处理列表
                ((List<?>) result).forEach(this::maskObject);
            } else {
                // 处理单个对象
                maskObject(result);
            }
        } catch (Exception e) {
            log.error("数据脱敏失败", e);
        }
    }

    private void maskObject(Object obj) {
        if (obj == null) {
            return;
        }

        Class<?> clazz = obj.getClass();
        for (Field field : clazz.getDeclaredFields()) {
            Sensitive sensitive = field.getAnnotation(Sensitive.class);
            if (sensitive != null) {
                field.setAccessible(true);
                try {
                    Object value = field.get(obj);
                    if (value instanceof String) {
                        String maskedValue = maskString((String) value, sensitive.type());
                        field.set(obj, maskedValue);
                    }
                } catch (IllegalAccessException e) {
                    log.error("字段脱敏失败: {}", field.getName(), e);
                }
            }
        }
    }

    private String maskString(String value, SensitiveType type) {
        if (value == null || value.isEmpty()) {
            return value;
        }

        switch (type) {
            case MOBILE:
                // 手机号脱敏: 138****1234
                return value.replaceAll("(\\d{3})\\d{4}(\\d{4})", "$1****$2");

            case ID_CARD:
                // 身份证脱敏: 110************123
                return value.replaceAll("(\\d{3})\\d{12}(\\d{3})", "$1************$2");

            case EMAIL:
                // 邮箱脱敏: abc****@example.com
                return value.replaceAll("(\\w{3})\\w*(@.*)", "$1****$2");

            case NAME:
                // 姓名脱敏: 张*三
                if (value.length() <= 2) {
                    return value.charAt(0) + "*";
                }
                return value.charAt(0) + "*" + value.charAt(value.length() - 1);

            case BANK_CARD:
                // 银行卡脱敏: 6222 **** **** 1234
                return value.replaceAll("(\\d{4})\\d*(\\d{4})", "$1 **** **** $2");

            default:
                return value;
        }
    }

    /**
     * 敏感字段注解
     */
    @Target(ElementType.FIELD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface Sensitive {
        SensitiveType type();
    }

    public enum SensitiveType {
        MOBILE, ID_CARD, EMAIL, NAME, BANK_CARD
    }
}

// 使用示例
@Data
public class User {
    private Long id;

    @Sensitive(type = SensitiveType.NAME)
    private String name;

    @Sensitive(type = SensitiveType.MOBILE)
    private String phone;

    @Sensitive(type = SensitiveType.ID_CARD)
    private String idCard;

    @Sensitive(type = SensitiveType.EMAIL)
    private String email;
}

@Service
public class UserService {

    @DataMask
    public List<User> getUserList() {
        // 查询用户列表
        // 返回后会自动脱敏
    }
}
```

**(9) 重试机制**

失败后自动重试,提高系统容错能力。

```java
/**
 * 重试机制切面
 */
@Aspect
@Component
@Slf4j
public class RetryAspect {

    /**
     * 重试注解
     */
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface Retry {
        int maxAttempts() default 3;
        long delay() default 1000;  // 重试间隔（毫秒）
        Class<? extends Exception>[] retryFor() default {Exception.class};
    }

    /**
     * 重试切面
     */
    @Around("@annotation(retry)")
    public Object handleRetry(ProceedingJoinPoint joinPoint, Retry retry) throws Throwable {
        int attempts = 0;
        long delay = retry.delay();

        while (attempts < retry.maxAttempts()) {
            attempts++;

            try {
                log.info("【重试】第 {} 次尝试执行方法: {}",
                        attempts, joinPoint.getSignature().toShortString());

                // 执行目标方法
                Object result = joinPoint.proceed();

                if (attempts > 1) {
                    log.info("【重试成功】方法 {} 在第 {} 次尝试后成功",
                            joinPoint.getSignature().toShortString(), attempts);
                }

                return result;

            } catch (Exception e) {
                // 检查是否是需要重试的异常
                boolean shouldRetry = false;
                for (Class<? extends Exception> retryException : retry.retryFor()) {
                    if (retryException.isInstance(e)) {
                        shouldRetry = true;
                        break;
                    }
                }

                if (!shouldRetry || attempts >= retry.maxAttempts()) {
                    log.error("【重试失败】方法 {} 重试 {} 次后仍然失败",
                            joinPoint.getSignature().toShortString(), attempts, e);
                    throw e;
                }

                log.warn("【重试】第 {} 次尝试失败，{}ms 后重试", attempts, delay, e);

                // 等待后重试
                Thread.sleep(delay);

                // 指数退避（可选）
                delay *= 2;
            }
        }

        throw new RuntimeException("方法执行失败");
    }
}

// 使用示例
@Service
public class ExternalService {

    @Retry(maxAttempts = 5, delay = 2000, retryFor = {IOException.class, TimeoutException.class})
    public String callExternalApi(String params) throws IOException {
        // 调用外部 API
        // 网络异常时会自动重试
    }
}
```

**(10) 审计日志**

记录用户操作,用于审计和追溯。

```java
/**
 * 审计日志切面
 */
@Aspect
@Component
public class AuditAspect {

    @Autowired
    private AuditLogService auditLogService;

    /**
     * 审计注解
     */
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface Audit {
        String module();     // 模块名称
        String operation();  // 操作类型
        String description() default "";
    }

    /**
     * 审计日志切面
     */
    @After("@annotation(audit)")
    public void recordAudit(JoinPoint joinPoint, Audit audit) {
        try {
            // 获取当前用户
            User currentUser = SecurityContextHolder.getCurrentUser();

            // 获取请求信息
            HttpServletRequest request =
                ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

            // 构建审计日志
            AuditLog auditLog = new AuditLog();
            auditLog.setUserId(currentUser.getId());
            auditLog.setUsername(currentUser.getUsername());
            auditLog.setModule(audit.module());
            auditLog.setOperation(audit.operation());
            auditLog.setDescription(audit.description());
            auditLog.setMethod(joinPoint.getSignature().toShortString());
            auditLog.setParams(Arrays.toString(joinPoint.getArgs()));
            auditLog.setIp(request.getRemoteAddr());
            auditLog.setUserAgent(request.getHeader("User-Agent"));
            auditLog.setCreateTime(new Date());

            // 保存审计日志
            auditLogService.save(auditLog);

        } catch (Exception e) {
            log.error("记录审计日志失败", e);
        }
    }
}

// 使用示例
@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping
    @Audit(module = "用户管理", operation = "创建用户", description = "创建新用户")
    public Result createUser(@RequestBody User user) {
        // 业务逻辑
    }

    @DeleteMapping("/{id}")
    @Audit(module = "用户管理", operation = "删除用户", description = "删除用户")
    public Result deleteUser(@PathVariable Long id) {
        // 业务逻辑
    }
}
```

**关键要点**

1. **最常用场景（Top 5）**
   - 日志记录: 记录方法调用、参数、返回值
   - 性能监控: 统计方法执行时间、性能分析
   - 事务管理: Spring `@Transactional` 基于 AOP
   - 权限控制: 方法级别的权限校验
   - 异常处理: 统一捕获和处理异常

2. **其他重要场景**
   - 缓存管理: 方法结果缓存
   - 参数校验: 方法参数合法性检查
   - 数据脱敏: 敏感数据处理
   - 重试机制: 失败自动重试
   - 审计日志: 记录用户操作轨迹

3. **使用建议**
   - 简单场景用 `@Before`, `@After`, `@AfterReturning`
   - 复杂场景用 `@Around`（可控制方法执行）
   - 自定义注解 + AOP 实现更灵活的功能
   - 注意性能开销,避免在高频方法上使用复杂切面

4. **最佳实践**
   - 切面逻辑应该简单高效
   - 避免在切面中执行耗时操作
   - 异常要妥善处理,不要影响主业务
   - 使用异步处理非关键操作（如日志记录）

5. **实际项目经验**
   - 80% 的场景用于日志、性能监控、事务管理
   - 10% 用于权限控制、异常处理
   - 10% 用于其他场景（缓存、脱敏、重试等）

**记忆口诀**

**"日志性能最常见,事务权限紧相连;异常缓存也重要,参数脱敏审计全;重试机制保容错,AOP 场景记心间"**

- **日志性能最常见**：日志记录和性能监控是最常用的场景
- **事务权限紧相连**：事务管理和权限控制紧密相关
- **异常缓存也重要**：异常处理和缓存管理很重要
- **参数脱敏审计全**：参数校验、数据脱敏、审计日志要全面
- **重试机制保容错**：重试机制提高系统容错能力
- **AOP 场景记心间**：牢记 AOP 的各种应用场景

**场景选择口诀:**
- **"横切关注点,AOP 来处理;相同逻辑重复出现,切面统一管理"**


## Spring MVC

### 28. 什么是 Spring MVC？

**核心答案**

**Spring MVC** 是 Spring Framework 提供的一个基于 MVC（Model-View-Controller）设计模式的 Web 框架,用于构建 Web 应用程序。它是 Spring 框架的一个模块,提供了一套完整的 Web 开发解决方案。

**核心特点:**

| 特点 | 说明 |
|-----|------|
| **MVC 分层架构** | 模型(Model)、视图(View)、控制器(Controller) 清晰分离 |
| **前端控制器模式** | 基于 DispatcherServlet 统一处理请求 |
| **灵活的处理器映射** | 支持多种请求映射方式 |
| **强大的数据绑定** | 自动绑定请求参数到对象 |
| **类型转换和验证** | 内置类型转换器和数据验证 |
| **多种视图技术** | 支持 JSP、Thymeleaf、FreeMarker 等 |
| **RESTful 支持** | 原生支持 RESTful API 开发 |
| **易于测试** | 提供 MockMvc 进行单元测试 |

**MVC 架构图:**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring MVC 架构</text>
<rect x="50" y="60" width="700" height="350" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="5"/>
<rect x="100" y="100" width="200" height="80" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="200" y="130" font-size="16" font-weight="bold" text-anchor="middle" fill="#fff">Controller（控制器）</text>
<text x="200" y="155" font-size="12" text-anchor="middle" fill="#fff">处理请求，调用业务逻辑</text>
<text x="200" y="170" font-size="12" text-anchor="middle" fill="#fff">@Controller / @RestController</text>
<rect x="100" y="220" width="200" height="80" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="200" y="250" font-size="16" font-weight="bold" text-anchor="middle" fill="#fff">Model（模型）</text>
<text x="200" y="275" font-size="12" text-anchor="middle" fill="#fff">业务逻辑和数据</text>
<text x="200" y="290" font-size="12" text-anchor="middle" fill="#fff">Service + Entity</text>
<rect x="500" y="160" width="200" height="80" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="600" y="190" font-size="16" font-weight="bold" text-anchor="middle" fill="#fff">View（视图）</text>
<text x="600" y="215" font-size="12" text-anchor="middle" fill="#fff">展示数据</text>
<text x="600" y="230" font-size="12" text-anchor="middle" fill="#fff">JSP / Thymeleaf / JSON</text>
<line x1="300" y1="140" x2="490" y2="200" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="395" y="160" font-size="11" fill="#666">返回模型和视图</text>
<line x1="200" y1="180" x2="200" y2="210" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="230" y="200" font-size="11" fill="#666">调用</text>
<line x1="220" y1="220" x2="250" y2="190" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="260" y="210" font-size="11" fill="#666">返回数据</text>
<rect x="350" y="320" width="200" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="450" y="345" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">DispatcherServlet</text>
<text x="450" y="365" font-size="11" text-anchor="middle" fill="#fff">前端控制器（核心）</text>
<line x1="200" y1="100" x2="450" y2="330" stroke="#9c27b0" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="600" y1="240" x2="520" y2="330" stroke="#9c27b0" stroke-width="2" stroke-dasharray="5,5"/>
<text x="325" y="210" font-size="11" fill="#9c27b0">请求分发</text>
<text x="560" y="285" font-size="11" fill="#9c27b0">视图渲染</text>
</svg>

**详细说明**

**(1) Spring MVC 的核心组件**

```java
/**
 * Spring MVC 核心组件示例
 */

// 1. DispatcherServlet - 前端控制器（自动配置，无需手动编写）
// 所有请求都经过 DispatcherServlet 统一处理

// 2. Controller - 控制器
@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 处理请求，返回视图名称
     */
    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        return "user/detail";  // 返回视图名称
    }

    /**
     * RESTful API，直接返回数据
     */
    @GetMapping("/api/{id}")
    @ResponseBody
    public User getUserApi(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}

// 3. Model - 模型（业务逻辑 + 数据）
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("用户不存在"));
    }

    @Transactional
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private Integer age;

    // getters and setters
}

// 4. View - 视图（Thymeleaf 示例）
// user/detail.html
/*
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>用户详情</title>
</head>
<body>
    <h1>用户详情</h1>
    <p>用户名: <span th:text="${user.username}"></span></p>
    <p>邮箱: <span th:text="${user.email}"></span></p>
    <p>年龄: <span th:text="${user.age}"></span></p>
</body>
</html>
*/
```

**(2) Spring MVC vs 传统 Servlet**

**传统 Servlet 开发方式:**

```java
/**
 * 传统 Servlet 开发（繁琐）
 */
@WebServlet("/user")
public class UserServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. 手动获取参数
        String idStr = request.getParameter("id");
        Long id = Long.parseLong(idStr);

        // 2. 手动调用业务逻辑
        UserService userService = new UserService();
        User user = userService.getUserById(id);

        // 3. 手动设置数据到 request
        request.setAttribute("user", user);

        // 4. 手动转发到 JSP
        request.getRequestDispatcher("/WEB-INF/views/user.jsp")
               .forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. 手动获取参数
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String ageStr = request.getParameter("age");

        // 2. 手动类型转换
        Integer age = Integer.parseInt(ageStr);

        // 3. 手动创建对象
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setAge(age);

        // 4. 手动参数校验
        if (username == null || username.isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "用户名不能为空");
            return;
        }

        // 5. 调用业务逻辑
        UserService userService = new UserService();
        userService.saveUser(user);

        // 6. 重定向
        response.sendRedirect("/users");
    }
}
```

**Spring MVC 开发方式（简洁）:**

```java
/**
 * Spring MVC 开发（简洁高效）
 */
@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * GET 请求 - 自动参数绑定
     */
    @GetMapping
    public String getUser(@RequestParam Long id, Model model) {
        // 1. 参数自动绑定和类型转换
        // 2. 业务逻辑调用
        User user = userService.getUserById(id);

        // 3. 自动添加数据到 Model
        model.addAttribute("user", user);

        // 4. 返回视图名称，自动解析
        return "user/detail";
    }

    /**
     * POST 请求 - 对象自动绑定 + 参数校验
     */
    @PostMapping
    public String saveUser(@Valid @ModelAttribute User user,
                          BindingResult result,
                          RedirectAttributes redirectAttributes) {

        // 1. 对象自动绑定
        // 2. 自动参数校验
        if (result.hasErrors()) {
            return "user/form";
        }

        // 3. 业务逻辑
        userService.saveUser(user);

        // 4. 重定向，传递消息
        redirectAttributes.addFlashAttribute("message", "保存成功");
        return "redirect:/users";
    }
}
```

**(3) Spring MVC 的配置方式**

**方式 1: Spring Boot 自动配置（推荐）**

```java
/**
 * Spring Boot 自动配置 Spring MVC
 */
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// application.properties
/*
# 视图解析器配置
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp

# 静态资源配置
spring.mvc.static-path-pattern=/static/**

# 文件上传配置
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=50MB
*/
```

**方式 2: Java 配置**

```java
/**
 * Java 配置 Spring MVC
 */
@Configuration
@EnableWebMvc
@ComponentScan("com.example.web")
public class WebConfig implements WebMvcConfigurer {

    /**
     * 配置视图解析器
     */
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        return resolver;
    }

    /**
     * 配置静态资源处理
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("/static/");
    }

    /**
     * 配置拦截器
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/static/**");
    }

    /**
     * 配置消息转换器（JSON）
     */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(new ObjectMapper());
        converters.add(converter);
    }

    /**
     * 配置跨域
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .maxAge(3600);
    }
}
```

**方式 3: XML 配置（传统）**

```xml
<!-- web.xml -->
<web-app>
    <!-- 配置 DispatcherServlet -->
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>/WEB-INF/spring-mvc.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>

<!-- spring-mvc.xml -->
<beans>
    <!-- 启用注解驱动 -->
    <mvc:annotation-driven/>

    <!-- 配置组件扫描 -->
    <context:component-scan base-package="com.example.web"/>

    <!-- 配置视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/views/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <!-- 配置静态资源 -->
    <mvc:resources mapping="/static/**" location="/static/"/>
</beans>
```

**(4) Spring MVC 完整示例**

```java
/**
 * 完整的 Spring MVC 应用示例
 */

// 1. 实体类
@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 20, message = "用户名长度必须在 3-20 之间")
    private String username;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    @Min(value = 0, message = "年龄不能小于 0")
    @Max(value = 150, message = "年龄不能大于 150")
    private Integer age;

    @CreationTimestamp
    private LocalDateTime createTime;

    @UpdateTimestamp
    private LocalDateTime updateTime;
}

// 2. Repository 层
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findByAgeBetween(Integer minAge, Integer maxAge);
}

// 3. Service 层
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("用户不存在: " + id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        // 检查用户名是否已存在
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new BusinessException("用户名已存在");
        }
        return userRepository.save(user);
    }

    public User updateUser(Long id, User user) {
        User existingUser = getUserById(id);
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setAge(user.getAge());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("用户不存在: " + id);
        }
        userRepository.deleteById(id);
    }
}

// 4. Controller 层（传统视图）
@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户列表页
     */
    @GetMapping
    public String listUsers(Model model) {
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);
        return "user/list";
    }

    /**
     * 用户详情页
     */
    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        return "user/detail";
    }

    /**
     * 创建用户表单页
     */
    @GetMapping("/new")
    public String newUserForm(Model model) {
        model.addAttribute("user", new User());
        return "user/form";
    }

    /**
     * 提交创建用户
     */
    @PostMapping
    public String saveUser(@Valid @ModelAttribute User user,
                          BindingResult result,
                          RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "user/form";
        }

        userService.saveUser(user);
        redirectAttributes.addFlashAttribute("message", "用户创建成功");
        return "redirect:/users";
    }

    /**
     * 编辑用户表单页
     */
    @GetMapping("/{id}/edit")
    public String editUserForm(@PathVariable Long id, Model model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        return "user/form";
    }

    /**
     * 提交更新用户
     */
    @PostMapping("/{id}")
    public String updateUser(@PathVariable Long id,
                            @Valid @ModelAttribute User user,
                            BindingResult result,
                            RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "user/form";
        }

        userService.updateUser(id, user);
        redirectAttributes.addFlashAttribute("message", "用户更新成功");
        return "redirect:/users";
    }

    /**
     * 删除用户
     */
    @PostMapping("/{id}/delete")
    public String deleteUser(@PathVariable Long id,
                            RedirectAttributes redirectAttributes) {
        userService.deleteUser(id);
        redirectAttributes.addFlashAttribute("message", "用户删除成功");
        return "redirect:/users";
    }
}

// 5. RESTful API Controller
@RestController
@RequestMapping("/api/users")
public class UserApiController {

    @Autowired
    private UserService userService;

    /**
     * 获取所有用户
     */
    @GetMapping
    public Result<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return Result.success(users);
    }

    /**
     * 根据 ID 获取用户
     */
    @GetMapping("/{id}")
    public Result<User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return Result.success(user);
    }

    /**
     * 创建用户
     */
    @PostMapping
    public Result<User> createUser(@Valid @RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return Result.success(savedUser);
    }

    /**
     * 更新用户
     */
    @PutMapping("/{id}")
    public Result<User> updateUser(@PathVariable Long id,
                                   @Valid @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return Result.success(updatedUser);
    }

    /**
     * 删除用户
     */
    @DeleteMapping("/{id}")
    public Result<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return Result.success();
    }
}

// 6. 统一响应结果
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result<T> {
    private Integer code;
    private String message;
    private T data;

    public static <T> Result<T> success() {
        return new Result<>(200, "success", null);
    }

    public static <T> Result<T> success(T data) {
        return new Result<>(200, "success", data);
    }

    public static <T> Result<T> error(String message) {
        return new Result<>(500, message, null);
    }
}
```

**关键要点**

1. **Spring MVC 是什么**
   - Spring 框架的 Web 模块
   - 基于 MVC 设计模式
   - 前端控制器模式（DispatcherServlet）
   - 用于构建 Web 应用和 RESTful API

2. **核心特点**
   - 清晰的 MVC 分层架构
   - 自动参数绑定和类型转换
   - 强大的数据验证功能
   - 支持多种视图技术
   - 原生支持 RESTful API

3. **核心组件**
   - **DispatcherServlet**: 前端控制器,统一处理请求
   - **Controller**: 处理请求,调用业务逻辑
   - **Model**: 业务逻辑和数据
   - **View**: 展示数据（JSP、Thymeleaf、JSON 等）

4. **优势**
   - 开发效率高（自动化程度高）
   - 代码简洁（注解驱动）
   - 易于测试（支持 MockMvc）
   - 灵活可扩展（可自定义各种组件）

5. **适用场景**
   - Web 应用开发
   - RESTful API 开发
   - 微服务开发
   - 企业级应用

**记忆口诀**

**"MVC 三层分得清,前端控制统一行;参数绑定自动化,视图技术随便挑;注解驱动开发快,RESTful 支持原生好"**

- **MVC 三层分得清**: Model、View、Controller 清晰分离
- **前端控制统一行**: DispatcherServlet 统一处理所有请求
- **参数绑定自动化**: 自动绑定请求参数到方法参数或对象
- **视图技术随便挑**: 支持多种视图技术（JSP、Thymeleaf、JSON 等）
- **注解驱动开发快**: 基于注解的开发方式,简洁高效
- **RESTful 支持原生好**: 原生支持 RESTful API 开发
### 29. Spring MVC 的工作流程是怎样的？

**核心答案**

Spring MVC 的工作流程是一个完整的 **请求-响应** 处理过程,核心是 **DispatcherServlet** 作为前端控制器协调各个组件完成请求处理。完整流程包含 **9 个步骤**:

| 步骤 | 组件 | 作用 |
|-----|------|-----|
| **1** | DispatcherServlet | 接收 HTTP 请求 |
| **2** | HandlerMapping | 根据请求 URL 查找对应的 Handler（Controller） |
| **3** | HandlerAdapter | 调用 Handler 的方法处理请求 |
| **4** | Handler (Controller) | 执行业务逻辑,返回 ModelAndView |
| **5** | ViewResolver | 解析视图名称,找到对应的 View 对象 |
| **6** | View | 渲染视图,生成 HTML 响应 |
| **7** | DispatcherServlet | 将响应返回给客户端 |
| **8** | HandlerInterceptor | 在处理前后执行拦截器逻辑（可选） |
| **9** | ExceptionResolver | 处理执行过程中的异常（可选） |

**工作流程图:**

<svg viewBox="0 0 900 850" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring MVC 完整工作流程</text>
<rect x="50" y="60" width="800" height="750" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="5"/>
<rect x="100" y="100" width="200" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="200" y="125" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">1. 客户端发送请求</text>
<text x="200" y="145" font-size="12" text-anchor="middle" fill="#fff">HTTP Request</text>
<line x1="200" y1="160" x2="200" y2="190" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="190" width="200" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="200" y="215" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">2. DispatcherServlet</text>
<text x="200" y="235" font-size="12" text-anchor="middle" fill="#fff">接收请求（前端控制器）</text>
<line x1="300" y1="220" x2="390" y2="220" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="345" y="215" font-size="11" fill="#666">查找Handler</text>
<rect x="390" y="190" width="200" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="490" y="215" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">3. HandlerMapping</text>
<text x="490" y="235" font-size="12" text-anchor="middle" fill="#fff">根据URL映射Handler</text>
<line x1="490" y1="250" x2="490" y2="280" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="520" y="270" font-size="11" fill="#666">返回Handler</text>
<rect x="390" y="280" width="200" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="490" y="305" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">4. HandlerAdapter</text>
<text x="490" y="325" font-size="12" text-anchor="middle" fill="#fff">适配并调用Handler</text>
<line x1="590" y1="310" x2="680" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="635" y="305" font-size="11" fill="#666">调用方法</text>
<rect x="680" y="280" width="120" height="60" fill="#e91e63" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="740" y="305" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">5. Handler</text>
<text x="740" y="325" font-size="12" text-anchor="middle" fill="#fff">(Controller)</text>
<line x1="740" y1="340" x2="740" y2="380" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="680" y="380" width="120" height="60" fill="#00bcd4" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="740" y="405" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">6. 业务处理</text>
<text x="740" y="425" font-size="11" text-anchor="middle" fill="#fff">Service + DAO</text>
<line x1="680" y1="410" x2="600" y2="410" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="640" y="405" font-size="11" fill="#666">返回ModelAndView</text>
<rect x="390" y="380" width="210" height="60" fill="#8bc34a" stroke="#689f38" stroke-width="2" rx="5"/>
<text x="495" y="405" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">7. ModelAndView</text>
<text x="495" y="425" font-size="11" text-anchor="middle" fill="#fff">包含模型数据和视图名称</text>
<line x1="390" y1="410" x2="310" y2="410" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="350" y="405" font-size="11" fill="#666">返回</text>
<rect x="100" y="380" width="210" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="205" y="405" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">DispatcherServlet</text>
<text x="205" y="425" font-size="11" text-anchor="middle" fill="#fff">处理ModelAndView</text>
<line x1="205" y1="440" x2="205" y2="480" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="235" y="465" font-size="11" fill="#666">解析视图</text>
<rect x="100" y="480" width="210" height="60" fill="#ff5722" stroke="#d84315" stroke-width="2" rx="5"/>
<text x="205" y="505" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">8. ViewResolver</text>
<text x="205" y="525" font-size="11" text-anchor="middle" fill="#fff">解析视图名称→View对象</text>
<line x1="310" y1="510" x2="390" y2="510" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="350" y="505" font-size="11" fill="#666">返回View</text>
<rect x="390" y="480" width="210" height="60" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="495" y="505" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">9. View（视图）</text>
<text x="495" y="525" font-size="11" text-anchor="middle" fill="#fff">渲染视图，填充数据</text>
<line x1="495" y1="540" x2="495" y2="580" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="390" y="580" width="210" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="495" y="605" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">DispatcherServlet</text>
<text x="495" y="625" font-size="11" text-anchor="middle" fill="#fff">获取渲染结果</text>
<line x1="495" y1="640" x2="495" y2="680" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="390" y="680" width="210" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="495" y="705" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">10. 响应给客户端</text>
<text x="495" y="725" font-size="12" text-anchor="middle" fill="#fff">HTTP Response (HTML)</text>
<path d="M 80 120 L 80 730 L 380 730" stroke="#4caf50" stroke-width="3" stroke-dasharray="5,5" fill="none"/>
<polygon points="375 725, 390 730, 375 735" fill="#4caf50"/>
<text x="70" y="425" font-size="12" fill="#4caf50" transform="rotate(-90 70 425)">请求-响应流程</text>
</svg>

**详细说明**

**(1) 完整的 9 步工作流程**

```java
/**
 * Spring MVC 工作流程详解
 */

// ========== 步骤 1: 客户端发送请求 ==========
/*
 * 客户端发起 HTTP 请求
 * 例如: GET http://localhost:8080/users/123
 */

// ========== 步骤 2: DispatcherServlet 接收请求 ==========
public class DispatcherServlet extends FrameworkServlet {

    @Override
    protected void doDispatch(HttpServletRequest request, HttpServletResponse response) {
        HttpServletRequest processedRequest = request;
        HandlerExecutionChain mappedHandler = null;
        ModelAndView mv = null;

        try {
            // 步骤 3: 查找 Handler
            mappedHandler = getHandler(processedRequest);
            if (mappedHandler == null) {
                noHandlerFound(processedRequest, response);
                return;
            }

            // 步骤 4: 获取 HandlerAdapter
            HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());

            // 执行 Interceptor 的 preHandle 方法
            if (!mappedHandler.applyPreHandle(processedRequest, response)) {
                return;
            }

            // 步骤 5: 调用 Handler 方法（Controller 方法）
            mv = ha.handle(processedRequest, response, mappedHandler.getHandler());

            // 执行 Interceptor 的 postHandle 方法
            mappedHandler.applyPostHandle(processedRequest, response, mv);

            // 步骤 6-10: 处理结果（视图解析和渲染）
            processDispatchResult(processedRequest, response, mappedHandler, mv, null);

        } catch (Exception ex) {
            // 异常处理
            processHandlerException(processedRequest, response, mappedHandler, ex);
        }
    }
}

// ========== 步骤 3: HandlerMapping 查找 Handler ==========
protected HandlerExecutionChain getHandler(HttpServletRequest request) {
    for (HandlerMapping mapping : this.handlerMappings) {
        // 遍历所有 HandlerMapping，找到能处理该请求的 Handler
        HandlerExecutionChain handler = mapping.getHandler(request);
        if (handler != null) {
            return handler;
        }
    }
    return null;
}

// HandlerMapping 实现（RequestMappingHandlerMapping）
public class RequestMappingHandlerMapping extends AbstractHandlerMapping {

    @Override
    protected HandlerMethod getHandlerInternal(HttpServletRequest request) {
        // 获取请求路径
        String lookupPath = getUrlPathHelper().getLookupPathForRequest(request);

        // 根据路径查找 HandlerMethod
        HandlerMethod handlerMethod = lookupHandlerMethod(lookupPath, request);

        return handlerMethod;
    }
}

// ========== 步骤 4: HandlerAdapter 调用 Handler ==========
public class RequestMappingHandlerAdapter extends AbstractHandlerMethodAdapter {

    @Override
    protected ModelAndView handleInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            HandlerMethod handlerMethod) throws Exception {

        // 调用 Controller 方法
        ModelAndView mav = invokeHandlerMethod(request, response, handlerMethod);

        return mav;
    }

    protected ModelAndView invokeHandlerMethod(
            HttpServletRequest request,
            HttpServletResponse response,
            HandlerMethod handlerMethod) throws Exception {

        // 创建方法调用器
        ServletInvocableHandlerMethod invocableMethod =
            createInvocableHandlerMethod(handlerMethod);

        // 参数解析器（处理 @RequestParam、@PathVariable 等）
        invocableMethod.setHandlerMethodArgumentResolvers(this.argumentResolvers);

        // 返回值处理器（处理 @ResponseBody 等）
        invocableMethod.setHandlerMethodReturnValueHandlers(this.returnValueHandlers);

        // 调用方法
        invocableMethod.invokeAndHandle(request, response);

        return getModelAndView(...);
    }
}

// ========== 步骤 5: Controller 处理请求 ==========
@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Handler 方法
     * 处理 GET /users/{id} 请求
     */
    @GetMapping("/{id}")
    public ModelAndView getUser(@PathVariable Long id) {
        // 调用 Service 层处理业务逻辑
        User user = userService.getUserById(id);

        // 创建 ModelAndView
        ModelAndView mav = new ModelAndView();
        mav.addObject("user", user);        // 添加模型数据
        mav.setViewName("user/detail");    // 设置视图名称

        return mav;
    }
}

// ========== 步骤 6: 业务处理（Service + DAO） ==========
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("用户不存在"));
    }
}

// ========== 步骤 7: 返回 ModelAndView ==========
/*
 * ModelAndView 包含:
 * 1. Model: 模型数据（Map<String, Object>）
 * 2. View: 视图名称（String）或 View 对象
 */
public class ModelAndView {
    private Object view;              // 视图名称: "user/detail"
    private ModelMap model;           // 模型数据: {"user": User对象}
    private HttpStatus status;        // HTTP 状态码

    // ...
}

// ========== 步骤 8: ViewResolver 解析视图 ==========
private void processDispatchResult(
        HttpServletRequest request,
        HttpServletResponse response,
        HandlerExecutionChain mappedHandler,
        ModelAndView mv,
        Exception exception) throws Exception {

    // 渲染视图
    render(mv, request, response);
}

protected void render(ModelAndView mv, HttpServletRequest request,
                     HttpServletResponse response) throws Exception {

    View view;
    String viewName = mv.getViewName();

    if (viewName != null) {
        // 使用 ViewResolver 解析视图名称
        view = resolveViewName(viewName, mv.getModelMap(), request);
    } else {
        view = mv.getView();
    }

    // 渲染视图
    view.render(mv.getModelMap(), request, response);
}

// ViewResolver 实现
public class InternalResourceViewResolver extends UrlBasedViewResolver {

    @Override
    public View resolveViewName(String viewName, Locale locale) {
        // 拼接完整的视图路径
        // 例如: "user/detail" -> "/WEB-INF/views/user/detail.jsp"
        String url = getPrefix() + viewName + getSuffix();

        // 创建 View 对象
        return new InternalResourceView(url);
    }
}

// ========== 步骤 9: View 渲染视图 ==========
public class InternalResourceView extends AbstractView {

    @Override
    protected void renderMergedOutputModel(
            Map<String, Object> model,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        // 将模型数据设置到 request 中
        exposeModelAsRequestAttributes(model, request);

        // 转发到 JSP
        RequestDispatcher rd = request.getRequestDispatcher(getUrl());
        rd.forward(request, response);
    }
}

// ========== 步骤 10: DispatcherServlet 返回响应 ==========
/*
 * 视图渲染完成后，生成 HTML 响应
 * DispatcherServlet 将响应返回给客户端
 */
```

**(2) 流程示例:完整的请求处理过程**

```java
/**
 * 实际请求处理示例
 * 请求: GET http://localhost:8080/users/123
 */

// ========== 1. 定义 Controller ==========
@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 处理 GET /users/{id} 请求
     */
    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        System.out.println("========== 步骤 5: Controller 处理请求 ==========");
        System.out.println("接收到请求参数 id: " + id);

        // 调用 Service 层
        User user = userService.getUserById(id);
        System.out.println("查询到用户: " + user);

        // 添加模型数据
        model.addAttribute("user", user);

        // 返回视图名称
        System.out.println("返回视图名称: user/detail");
        return "user/detail";
    }
}

// ========== 2. Service 层 ==========
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        System.out.println("========== 步骤 6: Service 层处理业务逻辑 ==========");
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("用户不存在: " + id));
    }
}

// ========== 3. Repository 层 ==========
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}

// ========== 4. View 层（JSP） ==========
// /WEB-INF/views/user/detail.jsp
/*
<!DOCTYPE html>
<html>
<head>
    <title>用户详情</title>
</head>
<body>
    <h1>用户详情</h1>
    <p>用户 ID: ${user.id}</p>
    <p>用户名: ${user.username}</p>
    <p>邮箱: ${user.email}</p>
</body>
</html>
*/

// ========== 5. 配置 ViewResolver ==========
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");  // 前缀
        resolver.setSuffix(".jsp");             // 后缀
        return resolver;
    }
}

// ========== 6. 完整流程日志输出 ==========
/*
控制台输出:

========== 步骤 1: 客户端发送请求 ==========
GET http://localhost:8080/users/123

========== 步骤 2: DispatcherServlet 接收请求 ==========
DispatcherServlet.doDispatch() 开始处理请求

========== 步骤 3: HandlerMapping 查找 Handler ==========
RequestMappingHandlerMapping: 查找处理器
找到 Handler: UserController.getUser(Long)

========== 步骤 4: HandlerAdapter 适配 Handler ==========
RequestMappingHandlerAdapter: 调用处理器方法
参数解析: @PathVariable id = 123

========== 步骤 5: Controller 处理请求 ==========
接收到请求参数 id: 123

========== 步骤 6: Service 层处理业务逻辑 ==========
UserService.getUserById(123)
查询到用户: User{id=123, username='张三', email='zhangsan@example.com'}

========== 步骤 7: 返回 ModelAndView ==========
返回视图名称: user/detail
ModelAndView: {view="user/detail", model={"user": User对象}}

========== 步骤 8: ViewResolver 解析视图 ==========
InternalResourceViewResolver: 解析视图名称
视图名称: user/detail
完整路径: /WEB-INF/views/user/detail.jsp

========== 步骤 9: View 渲染视图 ==========
InternalResourceView: 渲染 JSP 视图
将模型数据设置到 request: {user=User对象}
转发到 JSP: /WEB-INF/views/user/detail.jsp

========== 步骤 10: DispatcherServlet 返回响应 ==========
生成 HTML 响应
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8

<!DOCTYPE html>
<html>
<head><title>用户详情</title></head>
<body>
    <h1>用户详情</h1>
    <p>用户 ID: 123</p>
    <p>用户名: 张三</p>
    <p>邮箱: zhangsan@example.com</p>
</body>
</html>
*/
```

**(3) 核心组件交互时序图**

<svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="500" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring MVC 组件交互时序图</text>
<text x="100" y="80" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">Client</text>
<line x1="100" y1="90" x2="100" y2="650" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
<text x="250" y="80" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">DispatcherServlet</text>
<line x1="250" y1="90" x2="250" y2="650" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
<text x="400" y="80" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">HandlerMapping</text>
<line x1="400" y1="90" x2="400" y2="650" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
<text x="550" y="80" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">HandlerAdapter</text>
<line x1="550" y1="90" x2="550" y2="650" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
<text x="700" y="80" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">Controller</text>
<line x1="700" y1="90" x2="700" y2="650" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
<text x="850" y="80" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">ViewResolver</text>
<line x1="850" y1="90" x2="850" y2="650" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="100" y1="120" x2="250" y2="120" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead2)"/>
<text x="175" y="115" font-size="10" text-anchor="middle" fill="#4caf50">1. HTTP请求</text>
<line x1="250" y1="150" x2="400" y2="150" stroke="#2196f3" stroke-width="2" marker-end="url(#arrowhead2)"/>
<text x="325" y="145" font-size="10" text-anchor="middle" fill="#2196f3">2. 查找Handler</text>
<line x1="400" y1="180" x2="250" y2="180" stroke="#2196f3" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead2)"/>
<text x="325" y="175" font-size="10" text-anchor="middle" fill="#2196f3">3. 返回Handler</text>
<line x1="250" y1="210" x2="550" y2="210" stroke="#ff9800" stroke-width="2" marker-end="url(#arrowhead2)"/>
<text x="400" y="205" font-size="10" text-anchor="middle" fill="#ff9800">4. 获取Adapter</text>
<line x1="550" y1="240" x2="700" y2="240" stroke="#9c27b0" stroke-width="2" marker-end="url(#arrowhead2)"/>
<text x="625" y="235" font-size="10" text-anchor="middle" fill="#9c27b0">5. 调用方法</text>
<rect x="695" y="260" width="10" height="80" fill="#e91e63" stroke="#c2185b" stroke-width="1"/>
<text x="760" y="300" font-size="10" fill="#e91e63">6. 执行业务逻辑</text>
<line x1="700" y1="340" x2="550" y2="340" stroke="#9c27b0" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead2)"/>
<text x="625" y="335" font-size="10" text-anchor="middle" fill="#9c27b0">7. 返回ModelAndView</text>
<line x1="550" y1="370" x2="250" y2="370" stroke="#ff9800" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead2)"/>
<text x="400" y="365" font-size="10" text-anchor="middle" fill="#ff9800">8. 返回ModelAndView</text>
<line x1="250" y1="400" x2="850" y2="400" stroke="#f44336" stroke-width="2" marker-end="url(#arrowhead2)"/>
<text x="550" y="395" font-size="10" text-anchor="middle" fill="#f44336">9. 解析视图名称</text>
<line x1="850" y1="430" x2="250" y2="430" stroke="#f44336" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead2)"/>
<text x="550" y="425" font-size="10" text-anchor="middle" fill="#f44336">10. 返回View对象</text>
<rect x="245" y="450" width="10" height="50" fill="#673ab7" stroke="#512da8" stroke-width="1"/>
<text x="300" y="480" font-size="10" fill="#673ab7">11. 渲染视图</text>
<line x1="250" y1="520" x2="100" y2="520" stroke="#4caf50" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead2)"/>
<text x="175" y="515" font-size="10" text-anchor="middle" fill="#4caf50">12. HTTP响应</text>
<rect x="50" y="570" width="900" height="80" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="500" y="595" font-size="13" font-weight="bold" text-anchor="middle" fill="#333">核心流程总结</text>
<text x="500" y="615" font-size="11" text-anchor="middle" fill="#333">客户端 → DispatcherServlet → HandlerMapping → HandlerAdapter → Controller</text>
<text x="500" y="635" font-size="11" text-anchor="middle" fill="#333">→ ModelAndView → ViewResolver → View → 渲染 → 响应</text>
</svg>

**(4) RESTful API 的工作流程（简化版）**

对于 RESTful API,工作流程更简单,因为不需要视图解析和渲染:

```java
/**
 * RESTful API 工作流程（无视图）
 */
@RestController  // = @Controller + @ResponseBody
@RequestMapping("/api/users")
public class UserApiController {

    @Autowired
    private UserService userService;

    /**
     * RESTful API: 直接返回 JSON
     * 流程: 客户端 → DispatcherServlet → HandlerMapping → HandlerAdapter
     *       → Controller → 直接返回对象 → JSON 转换 → 响应
     */
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        // 处理业务逻辑
        User user = userService.getUserById(id);

        // 直接返回对象，Spring MVC 自动转换为 JSON
        return user;
    }
}

// RESTful API 流程:
/*
1. 客户端发送请求: GET /api/users/123
2. DispatcherServlet 接收请求
3. HandlerMapping 查找 Handler: UserApiController.getUser()
4. HandlerAdapter 调用方法
5. Controller 执行业务逻辑，返回 User 对象
6. RequestResponseBodyMethodProcessor 处理 @ResponseBody
   - 使用 HttpMessageConverter 将 User 对象转换为 JSON
   - 默认使用 MappingJackson2HttpMessageConverter
7. DispatcherServlet 将 JSON 响应返回给客户端

跳过的步骤:
- 无需 ViewResolver（不需要解析视图）
- 无需 View 渲染（不需要生成 HTML）
- 直接将对象转换为 JSON 返回
*/
```

**(5) 拦截器的执行时机**

```java
/**
 * 拦截器在工作流程中的执行时机
 */
public interface HandlerInterceptor {

    /**
     * 在 Handler 执行前调用
     * 返回 false 会中断请求处理
     */
    default boolean preHandle(HttpServletRequest request,
                              HttpServletResponse response,
                              Object handler) {
        return true;
    }

    /**
     * 在 Handler 执行后、视图渲染前调用
     * 可以修改 ModelAndView
     */
    default void postHandle(HttpServletRequest request,
                           HttpServletResponse response,
                           Object handler,
                           ModelAndView modelAndView) {
    }

    /**
     * 在整个请求完成后调用（视图渲染后）
     * 常用于资源清理
     */
    default void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response,
                                Object handler,
                                Exception ex) {
    }
}

// 拦截器执行流程:
/*
DispatcherServlet.doDispatch() {

    // 1. 查找 Handler
    HandlerExecutionChain chain = getHandler(request);

    // 2. 执行拦截器的 preHandle（按顺序执行）
    if (!chain.applyPreHandle(request, response)) {
        return;  // preHandle 返回 false，中断请求
    }

    // 3. 调用 Handler 方法
    ModelAndView mv = adapter.handle(request, response, handler);

    // 4. 执行拦截器的 postHandle（逆序执行）
    chain.applyPostHandle(request, response, mv);

    // 5. 渲染视图
    processDispatchResult(request, response, chain, mv, null);

    // 6. 执行拦截器的 afterCompletion（逆序执行）
    chain.triggerAfterCompletion(request, response, null);
}
*/

// 示例：日志拦截器
@Component
public class LogInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request,
                            HttpServletResponse response,
                            Object handler) {
        System.out.println("【拦截器】preHandle - 请求开始");
        System.out.println("请求 URL: " + request.getRequestURI());
        request.setAttribute("startTime", System.currentTimeMillis());
        return true;  // 继续执行
    }

    @Override
    public void postHandle(HttpServletRequest request,
                          HttpServletResponse response,
                          Object handler,
                          ModelAndView modelAndView) {
        System.out.println("【拦截器】postHandle - Controller 执行完成");
        if (modelAndView != null) {
            System.out.println("视图名称: " + modelAndView.getViewName());
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                               HttpServletResponse response,
                               Object handler,
                               Exception ex) {
        long startTime = (Long) request.getAttribute("startTime");
        long endTime = System.currentTimeMillis();
        System.out.println("【拦截器】afterCompletion - 请求完成");
        System.out.println("总耗时: " + (endTime - startTime) + "ms");
    }
}
```

**(6) 异常处理流程**

```java
/**
 * 异常处理在工作流程中的位置
 */
public class DispatcherServlet {

    protected void doDispatch(HttpServletRequest request,
                             HttpServletResponse response) {
        HandlerExecutionChain mappedHandler = null;
        Exception dispatchException = null;

        try {
            // 正常流程
            mappedHandler = getHandler(request);
            HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());
            ModelAndView mv = ha.handle(request, response, mappedHandler.getHandler());
            processDispatchResult(request, response, mappedHandler, mv, null);

        } catch (Exception ex) {
            // 捕获异常
            dispatchException = ex;
        }

        // 异常处理
        processDispatchResult(request, response, mappedHandler, null, dispatchException);
    }

    private void processDispatchResult(
            HttpServletRequest request,
            HttpServletResponse response,
            HandlerExecutionChain mappedHandler,
            ModelAndView mv,
            Exception exception) {

        if (exception != null) {
            // 使用 HandlerExceptionResolver 处理异常
            mv = processHandlerException(request, response, handler, exception);
        }

        if (mv != null) {
            render(mv, request, response);
        }
    }
}

// 异常处理器示例
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 处理业务异常
     */
    @ExceptionHandler(BusinessException.class)
    public ModelAndView handleBusinessException(BusinessException ex) {
        ModelAndView mav = new ModelAndView("error");
        mav.addObject("error", ex.getMessage());
        return mav;
    }

    /**
     * 处理所有异常
     */
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Result handleException(Exception ex) {
        return Result.error("系统异常: " + ex.getMessage());
    }
}
```

**关键要点**

1. **核心流程（9 步）**
   - 接收请求 → 查找 Handler → 调用 Handler → 处理业务 → 返回 ModelAndView → 解析视图 → 渲染视图 → 返回响应

2. **核心组件**
   - **DispatcherServlet**: 前端控制器,统一接收和分发请求
   - **HandlerMapping**: 根据 URL 查找对应的 Handler
   - **HandlerAdapter**: 适配并调用 Handler 方法
   - **Controller**: 处理业务逻辑,返回 ModelAndView
   - **ViewResolver**: 解析视图名称,返回 View 对象
   - **View**: 渲染视图,生成 HTML 响应

3. **RESTful API 流程**
   - 简化流程:无需视图解析和渲染
   - 直接将对象转换为 JSON 返回
   - 使用 `@RestController` 和 `@ResponseBody`

4. **拦截器执行时机**
   - `preHandle`: Handler 执行前
   - `postHandle`: Handler 执行后、视图渲染前
   - `afterCompletion`: 整个请求完成后

5. **异常处理**
   - 使用 `HandlerExceptionResolver` 处理异常
   - `@ControllerAdvice` + `@ExceptionHandler` 全局异常处理

**记忆口诀**

**"请求到达前端控，映射查找处理器；适配调用控制器，业务逻辑返模视；解析视图成对象，渲染填充变响应；拦截异常贯始终，完整流程记心中"**

- **请求到达前端控**: 客户端请求到达 DispatcherServlet（前端控制器）
- **映射查找处理器**: HandlerMapping 根据 URL 查找 Handler
- **适配调用控制器**: HandlerAdapter 适配并调用 Controller 方法
- **业务逻辑返模视**: Controller 处理业务逻辑,返回 ModelAndView
- **解析视图成对象**: ViewResolver 解析视图名称,返回 View 对象
- **渲染填充变响应**: View 渲染视图,填充数据,生成 HTML 响应
- **拦截异常贯始终**: 拦截器和异常处理贯穿整个流程
- **完整流程记心中**: 牢记 Spring MVC 的完整工作流程

**核心流程口诀（9 步）:**
- **"接查调处返，解渲回，拦异全"**
  - 接: 接收请求（DispatcherServlet）
  - 查: 查找 Handler（HandlerMapping）
  - 调: 调用 Handler（HandlerAdapter）
  - 处: 处理业务（Controller）
  - 返: 返回 ModelAndView
  - 解: 解析视图（ViewResolver）
  - 渲: 渲染视图（View）
  - 回: 返回响应
  - 拦: 拦截器（preHandle, postHandle, afterCompletion）
  - 异: 异常处理（HandlerExceptionResolver）
  - 全: 全流程


### 30. 什么是 DispatcherServlet？

**核心答案**

**DispatcherServlet** 是 Spring MVC 的**前端控制器**（Front Controller），是整个 Spring MVC 框架的核心。它负责接收所有的 HTTP 请求，并协调各个组件完成请求处理。

**核心特点:**

| 特点 | 说明 |
|-----|------|
| **前端控制器** | 统一接收和分发所有请求 |
| **中央调度器** | 协调 HandlerMapping、HandlerAdapter、ViewResolver 等组件 |
| **继承 HttpServlet** | 本质上是一个 Servlet |
| **单例模式** | 每个 Web 应用只有一个实例 |
| **框架入口** | Spring MVC 的入口点 |
| **URL 映射** | 默认映射 `/`，处理所有请求 |

**DispatcherServlet 架构图:**

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">DispatcherServlet 架构</text>
<rect x="50" y="60" width="800" height="520" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="5"/>
<rect x="300" y="100" width="300" height="80" fill="#2196f3" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="450" y="135" font-size="16" font-weight="bold" text-anchor="middle" fill="#fff">DispatcherServlet</text>
<text x="450" y="160" font-size="13" text-anchor="middle" fill="#fff">前端控制器 (Front Controller)</text>
<rect x="100" y="250" width="160" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="180" y="275" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">HandlerMapping</text>
<text x="180" y="295" font-size="11" text-anchor="middle" fill="#fff">请求映射</text>
<rect x="290" y="250" width="160" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="370" y="275" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">HandlerAdapter</text>
<text x="370" y="295" font-size="11" text-anchor="middle" fill="#fff">处理器适配</text>
<rect x="480" y="250" width="160" height="60" fill="#e91e63" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="560" y="275" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">ViewResolver</text>
<text x="560" y="295" font-size="11" text-anchor="middle" fill="#fff">视图解析</text>
<rect x="670" y="250" width="160" height="60" fill="#00bcd4" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="750" y="275" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">ExceptionResolver</text>
<text x="750" y="295" font-size="11" text-anchor="middle" fill="#fff">异常处理</text>
<line x1="450" y1="180" x2="180" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="180" x2="370" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="180" x2="560" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="180" x2="750" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="370" width="160" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="180" y="395" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">MultipartResolver</text>
<text x="180" y="415" font-size="11" text-anchor="middle" fill="#fff">文件上传</text>
<rect x="290" y="370" width="160" height="60" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="370" y="395" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">LocaleResolver</text>
<text x="370" y="415" font-size="11" text-anchor="middle" fill="#fff">国际化</text>
<rect x="480" y="370" width="160" height="60" fill="#ff5722" stroke="#d84315" stroke-width="2" rx="5"/>
<text x="560" y="395" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">ThemeResolver</text>
<text x="560" y="415" font-size="11" text-anchor="middle" fill="#fff">主题解析</text>
<rect x="670" y="370" width="160" height="60" fill="#8bc34a" stroke="#689f38" stroke-width="2" rx="5"/>
<text x="750" y="395" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">Interceptors</text>
<text x="750" y="415" font-size="11" text-anchor="middle" fill="#fff">拦截器</text>
<line x1="450" y1="180" x2="180" y2="360" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
<line x1="450" y1="180" x2="370" y2="360" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
<line x1="450" y1="180" x2="560" y2="360" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
<line x1="450" y1="180" x2="750" y2="360" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
<rect x="300" y="490" width="300" height="60" fill="#ffeb3b" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="450" y="515" font-size="13" font-weight="bold" text-anchor="middle" fill="#333">ApplicationContext</text>
<text x="450" y="535" font-size="11" text-anchor="middle" fill="#333">WebApplicationContext (容器)</text>
<line x1="450" y1="180" x2="450" y2="480" stroke="#fbc02d" stroke-width="2" stroke-dasharray="5,5"/>
</svg>

**详细说明**

**(1) DispatcherServlet 的定义和作用**

```java
/**
 * DispatcherServlet 是什么？
 */

// DispatcherServlet 的继承体系
public class DispatcherServlet extends FrameworkServlet {
    // ...
}

public abstract class FrameworkServlet extends HttpServletBean {
    // ...
}

public abstract class HttpServletBean extends HttpServlet {
    // ...
}

// 继承关系:
// DispatcherServlet → FrameworkServlet → HttpServletBean → HttpServlet → GenericServlet → Servlet

/**
 * 核心作用:
 * 1. 统一接收所有 HTTP 请求
 * 2. 根据请求 URL 查找对应的 Handler（Controller）
 * 3. 调用 Handler 处理请求
 * 4. 处理视图渲染
 * 5. 返回响应给客户端
 */
```

**(2) DispatcherServlet 的核心职责**

```java
/**
 * DispatcherServlet 的核心职责
 */
public class DispatcherServlet extends FrameworkServlet {

    // ========== 核心组件（9 大组件） ==========

    /** 1. 文件上传解析器 */
    private MultipartResolver multipartResolver;

    /** 2. 国际化解析器 */
    private LocaleResolver localeResolver;

    /** 3. 主题解析器 */
    private ThemeResolver themeResolver;

    /** 4. Handler 映射器列表（处理 URL 到 Handler 的映射） */
    private List<HandlerMapping> handlerMappings;

    /** 5. Handler 适配器列表（调用 Handler） */
    private List<HandlerAdapter> handlerAdapters;

    /** 6. 异常解析器列表（处理异常） */
    private List<HandlerExceptionResolver> handlerExceptionResolvers;

    /** 7. 请求到视图名称的转换器 */
    private RequestToViewNameTranslator viewNameTranslator;

    /** 8. FlashMap 管理器（重定向时传递数据） */
    private FlashMapManager flashMapManager;

    /** 9. 视图解析器列表（解析视图名称） */
    private List<ViewResolver> viewResolvers;

    // ========== 核心方法: 处理请求 ==========

    /**
     * 处理 HTTP 请求的核心方法
     */
    @Override
    protected void doService(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        // 1. 保存请求属性快照（用于 include 请求）
        Map<String, Object> attributesSnapshot = null;
        if (WebUtils.isIncludeRequest(request)) {
            attributesSnapshot = new HashMap<>();
            // 保存现有属性
        }

        // 2. 将框架对象设置到 request 中，供 Handler 和 View 使用
        request.setAttribute(WEB_APPLICATION_CONTEXT_ATTRIBUTE, getWebApplicationContext());
        request.setAttribute(LOCALE_RESOLVER_ATTRIBUTE, this.localeResolver);
        request.setAttribute(THEME_RESOLVER_ATTRIBUTE, this.themeResolver);
        request.setAttribute(THEME_SOURCE_ATTRIBUTE, getThemeSource());

        // 3. 处理 FlashMap（重定向数据传递）
        FlashMap inputFlashMap = this.flashMapManager.retrieveAndUpdate(request, response);
        if (inputFlashMap != null) {
            request.setAttribute(INPUT_FLASH_MAP_ATTRIBUTE, Collections.unmodifiableMap(inputFlashMap));
        }
        request.setAttribute(OUTPUT_FLASH_MAP_ATTRIBUTE, new FlashMap());
        request.setAttribute(FLASH_MAP_MANAGER_ATTRIBUTE, this.flashMapManager);

        try {
            // 4. 核心处理方法
            doDispatch(request, response);
        } finally {
            // 5. 恢复原始属性（清理工作）
            if (attributesSnapshot != null) {
                restoreAttributesAfterInclude(request, attributesSnapshot);
            }
        }
    }

    /**
     * 请求分发的核心逻辑
     */
    protected void doDispatch(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        HttpServletRequest processedRequest = request;
        HandlerExecutionChain mappedHandler = null;
        boolean multipartRequestParsed = false;
        ModelAndView mv = null;
        Exception dispatchException = null;

        try {
            // 步骤 1: 检查是否是文件上传请求
            processedRequest = checkMultipart(request);
            multipartRequestParsed = (processedRequest != request);

            // 步骤 2: 根据请求 URL 查找 Handler（重要！）
            mappedHandler = getHandler(processedRequest);
            if (mappedHandler == null) {
                noHandlerFound(processedRequest, response);
                return;
            }

            // 步骤 3: 获取 HandlerAdapter（重要！）
            HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());

            // 步骤 4: 处理 last-modified 请求头
            String method = request.getMethod();
            boolean isGet = "GET".equals(method);
            if (isGet || "HEAD".equals(method)) {
                long lastModified = ha.getLastModified(request, mappedHandler.getHandler());
                if (new ServletWebRequest(request, response).checkNotModified(lastModified) && isGet) {
                    return;
                }
            }

            // 步骤 5: 执行拦截器的 preHandle 方法
            if (!mappedHandler.applyPreHandle(processedRequest, response)) {
                return;
            }

            // 步骤 6: 调用 Handler 方法（Controller 方法）（重要！）
            mv = ha.handle(processedRequest, response, mappedHandler.getHandler());

            // 步骤 7: 如果没有视图名称，设置默认视图名称
            if (mv != null && !mv.hasView()) {
                String defaultViewName = getDefaultViewName(request);
                if (defaultViewName != null) {
                    mv.setViewName(defaultViewName);
                }
            }

            // 步骤 8: 执行拦截器的 postHandle 方法
            mappedHandler.applyPostHandle(processedRequest, response, mv);

        } catch (Exception ex) {
            dispatchException = ex;
        }

        // 步骤 9: 处理结果（视图渲染或异常处理）（重要！）
        processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);
    }

    /**
     * 处理请求结果：渲染视图或处理异常
     */
    private void processDispatchResult(
            HttpServletRequest request,
            HttpServletResponse response,
            HandlerExecutionChain mappedHandler,
            ModelAndView mv,
            Exception exception) throws Exception {

        boolean errorView = false;

        // 1. 如果有异常，使用异常解析器处理
        if (exception != null) {
            if (exception instanceof ModelAndViewDefiningException) {
                mv = ((ModelAndViewDefiningException) exception).getModelAndView();
            } else {
                Object handler = (mappedHandler != null ? mappedHandler.getHandler() : null);
                mv = processHandlerException(request, response, handler, exception);
                errorView = (mv != null);
            }
        }

        // 2. 如果有视图，渲染视图
        if (mv != null && !mv.wasCleared()) {
            render(mv, request, response);
            if (errorView) {
                WebUtils.clearErrorRequestAttributes(request);
            }
        }

        // 3. 执行拦截器的 afterCompletion 方法
        if (mappedHandler != null) {
            mappedHandler.triggerAfterCompletion(request, response, null);
        }
    }

    /**
     * 渲染视图
     */
    protected void render(ModelAndView mv, HttpServletRequest request,
                         HttpServletResponse response) throws Exception {

        Locale locale = this.localeResolver.resolveLocale(request);
        response.setLocale(locale);

        View view;
        String viewName = mv.getViewName();

        if (viewName != null) {
            // 使用 ViewResolver 解析视图名称
            view = resolveViewName(viewName, mv.getModelMap(), locale, request);
            if (view == null) {
                throw new ServletException("无法解析视图: " + viewName);
            }
        } else {
            view = mv.getView();
            if (view == null) {
                throw new ServletException("ModelAndView 没有视图");
            }
        }

        // 渲染视图
        view.render(mv.getModelMap(), request, response);
    }
}
```

**(3) DispatcherServlet 的配置方式**

**方式 1: Spring Boot 自动配置（最常用）**

```java
/**
 * Spring Boot 自动配置 DispatcherServlet
 * 无需手动配置，开箱即用
 */
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// Spring Boot 自动配置的内容:
/*
 * 1. 自动创建 DispatcherServlet Bean
 * 2. 自动注册到 Servlet 容器
 * 3. 默认映射路径: /
 * 4. 自动配置各种 Resolver 和 Handler
 */

// application.properties 中的相关配置
/*
# DispatcherServlet 配置
spring.mvc.servlet.path=/           # 映射路径（默认 /）
spring.mvc.servlet.load-on-startup=1  # 启动时加载（默认 1）

# 其他相关配置
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
spring.mvc.static-path-pattern=/static/**
*/
```

**方式 2: Web.xml 配置（传统方式）**

```xml
<!-- web.xml -->
<web-app>
    <!-- 配置 DispatcherServlet -->
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>

        <!-- 指定 Spring MVC 配置文件位置 -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>/WEB-INF/spring-mvc.xml</param-value>
        </init-param>

        <!-- 启动时加载（数字越小优先级越高） -->
        <load-on-startup>1</load-on-startup>
    </servlet>

    <!-- URL 映射 -->
    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <!-- 方式 1: 拦截所有请求（推荐） -->
        <url-pattern>/</url-pattern>

        <!-- 方式 2: 拦截所有请求（包括静态资源，不推荐） -->
        <!-- <url-pattern>/*</url-pattern> -->

        <!-- 方式 3: 拦截特定后缀 -->
        <!-- <url-pattern>*.do</url-pattern> -->
    </servlet-mapping>

    <!-- 配置字符编码过滤器 -->
    <filter>
        <filter-name>characterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>characterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

**方式 3: Java 配置（WebApplicationInitializer）**

```java
/**
 * 通过 Java 代码配置 DispatcherServlet（替代 web.xml）
 */
public class MyWebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    /**
     * 指定 Root WebApplicationContext 的配置类
     * 通常是 Service、DAO 等配置
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[] { RootConfig.class };
    }

    /**
     * 指定 Servlet WebApplicationContext 的配置类
     * 通常是 Controller、ViewResolver 等配置
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { WebConfig.class };
    }

    /**
     * 指定 DispatcherServlet 的映射路径
     */
    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }

    /**
     * 自定义 DispatcherServlet 配置
     */
    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {
        // 设置 load-on-startup
        registration.setLoadOnStartup(1);

        // 设置初始化参数
        registration.setInitParameter("throwExceptionIfNoHandlerFound", "true");

        // 设置是否支持异步
        registration.setAsyncSupported(true);
    }

    /**
     * 配置 Filter
     */
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        encodingFilter.setForceEncoding(true);

        return new Filter[] { encodingFilter };
    }
}

// Root 配置类
@Configuration
@ComponentScan(basePackages = "com.example.service")
public class RootConfig {
    // Service、DAO 等配置
}

// Web 配置类
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.example.web")
public class WebConfig implements WebMvcConfigurer {
    // Controller、ViewResolver 等配置

    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        return resolver;
    }
}
```

**(4) DispatcherServlet 的初始化流程**

```java
/**
 * DispatcherServlet 的初始化流程
 */

// 继承关系中的初始化方法调用顺序:
/*
 * 1. GenericServlet.init(ServletConfig)
 * 2. HttpServletBean.init()
 * 3. FrameworkServlet.initServletBean()
 * 4. FrameworkServlet.initWebApplicationContext()
 * 5. DispatcherServlet.onRefresh(ApplicationContext)
 * 6. DispatcherServlet.initStrategies(ApplicationContext)
 */

public abstract class HttpServletBean extends HttpServlet {

    /**
     * 步骤 2: 初始化 Servlet
     */
    @Override
    public final void init() throws ServletException {
        // 1. 读取 init-param 配置
        PropertyValues pvs = new ServletConfigPropertyValues(getServletConfig(), this.requiredProperties);

        // 2. 将配置设置到 Bean 中
        BeanWrapper bw = PropertyAccessorFactory.forBeanPropertyAccess(this);
        bw.setPropertyValues(pvs, true);

        // 3. 模板方法：初始化 Bean
        initServletBean();
    }

    protected void initServletBean() throws ServletException {
        // 子类实现
    }
}

public abstract class FrameworkServlet extends HttpServletBean {

    /**
     * 步骤 3: 初始化 Servlet Bean
     */
    @Override
    protected final void initServletBean() throws ServletException {
        try {
            // 初始化 WebApplicationContext
            this.webApplicationContext = initWebApplicationContext();

            // 模板方法：初始化框架 Servlet
            initFrameworkServlet();
        } catch (Exception ex) {
            throw new ServletException("Context initialization failed", ex);
        }
    }

    /**
     * 步骤 4: 初始化 WebApplicationContext
     */
    protected WebApplicationContext initWebApplicationContext() {
        // 1. 获取 Root WebApplicationContext
        WebApplicationContext rootContext =
            WebApplicationContextUtils.getWebApplicationContext(getServletContext());

        WebApplicationContext wac = null;

        // 2. 如果已经通过构造函数注入了 WebApplicationContext
        if (this.webApplicationContext != null) {
            wac = this.webApplicationContext;
            if (wac instanceof ConfigurableWebApplicationContext) {
                ConfigurableWebApplicationContext cwac = (ConfigurableWebApplicationContext) wac;
                if (!cwac.isActive()) {
                    if (cwac.getParent() == null) {
                        cwac.setParent(rootContext);
                    }
                    configureAndRefreshWebApplicationContext(cwac);
                }
            }
        }

        // 3. 如果没有，从 ServletContext 中查找
        if (wac == null) {
            wac = findWebApplicationContext();
        }

        // 4. 如果还是没有，创建一个新的
        if (wac == null) {
            wac = createWebApplicationContext(rootContext);
        }

        // 5. 触发 onRefresh 回调
        if (!this.refreshEventReceived) {
            onRefresh(wac);
        }

        // 6. 将 WebApplicationContext 发布到 ServletContext
        if (this.publishContext) {
            String attrName = getServletContextAttributeName();
            getServletContext().setAttribute(attrName, wac);
        }

        return wac;
    }
}

public class DispatcherServlet extends FrameworkServlet {

    /**
     * 步骤 5: Spring 容器刷新时回调
     */
    @Override
    protected void onRefresh(ApplicationContext context) {
        initStrategies(context);
    }

    /**
     * 步骤 6: 初始化 Spring MVC 的各种策略组件
     */
    protected void initStrategies(ApplicationContext context) {
        // 1. 初始化文件上传解析器
        initMultipartResolver(context);

        // 2. 初始化国际化解析器
        initLocaleResolver(context);

        // 3. 初始化主题解析器
        initThemeResolver(context);

        // 4. 初始化 HandlerMapping（重要！）
        initHandlerMappings(context);

        // 5. 初始化 HandlerAdapter（重要！）
        initHandlerAdapters(context);

        // 6. 初始化异常解析器
        initHandlerExceptionResolvers(context);

        // 7. 初始化请求到视图名称的转换器
        initRequestToViewNameTranslator(context);

        // 8. 初始化视图解析器（重要！）
        initViewResolvers(context);

        // 9. 初始化 FlashMap 管理器
        initFlashMapManager(context);
    }

    /**
     * 初始化 HandlerMapping 示例
     */
    private void initHandlerMappings(ApplicationContext context) {
        this.handlerMappings = null;

        if (this.detectAllHandlerMappings) {
            // 从容器中查找所有 HandlerMapping Bean
            Map<String, HandlerMapping> matchingBeans =
                BeanFactoryUtils.beansOfTypeIncludingAncestors(
                    context, HandlerMapping.class, true, false);

            if (!matchingBeans.isEmpty()) {
                this.handlerMappings = new ArrayList<>(matchingBeans.values());
                // 排序（按 @Order 或 Ordered 接口）
                AnnotationAwareOrderComparator.sort(this.handlerMappings);
            }
        } else {
            // 只查找名为 "handlerMapping" 的 Bean
            try {
                HandlerMapping hm = context.getBean("handlerMapping", HandlerMapping.class);
                this.handlerMappings = Collections.singletonList(hm);
            } catch (NoSuchBeanDefinitionException ex) {
                // 忽略
            }
        }

        // 如果没有找到，使用默认策略
        if (this.handlerMappings == null) {
            this.handlerMappings = getDefaultStrategies(context, HandlerMapping.class);
        }
    }
}
```

**(5) DispatcherServlet 与 Servlet 容器的关系**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="400" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">DispatcherServlet 与 Servlet 容器的关系</text>
<rect x="50" y="60" width="700" height="420" fill="#f5f5f5" stroke="#999" stroke-width="2" rx="5"/>
<rect x="100" y="100" width="600" height="80" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="135" font-size="15" font-weight="bold" text-anchor="middle" fill="#fff">Servlet 容器 (Tomcat / Jetty / Undertow)</text>
<text x="400" y="160" font-size="12" text-anchor="middle" fill="#fff">管理所有 Servlet 的生命周期</text>
<rect x="150" y="220" width="200" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="250" y="245" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">Other Servlets</text>
<text x="250" y="265" font-size="11" text-anchor="middle" fill="#fff">(普通 Servlet)</text>
<rect x="450" y="220" width="200" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="3" rx="5"/>
<text x="550" y="245" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">DispatcherServlet</text>
<text x="550" y="265" font-size="11" text-anchor="middle" fill="#fff">(Spring MVC 入口)</text>
<line x1="400" y1="180" x2="250" y2="210" stroke="#666" stroke-width="2" marker-end="url(#arrowhead2)"/>
<line x1="400" y1="180" x2="550" y2="210" stroke="#666" stroke-width="2" marker-end="url(#arrowhead2)"/>
<text x="325" y="200" font-size="10" fill="#666">管理</text>
<text x="475" y="200" font-size="10" fill="#666">管理</text>
<rect x="450" y="320" width="200" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="550" y="345" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">Spring MVC 组件</text>
<text x="550" y="365" font-size="10" text-anchor="middle" fill="#333">• HandlerMapping</text>
<text x="550" y="385" font-size="10" text-anchor="middle" fill="#333">• HandlerAdapter</text>
<text x="550" y="405" font-size="10" text-anchor="middle" fill="#333">• ViewResolver</text>
<text x="550" y="425" font-size="10" text-anchor="middle" fill="#333">• Controllers</text>
<line x1="550" y1="280" x2="550" y2="310" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead2)"/>
<text x="575" y="300" font-size="10" fill="#4caf50">协调</text>
</svg>

**关键要点**

1. **定义**
   - DispatcherServlet 是 Spring MVC 的前端控制器
   - 继承自 HttpServlet，本质上是一个 Servlet
   - 是整个 Spring MVC 框架的入口和核心

2. **核心作用**
   - 统一接收所有 HTTP 请求
   - 协调各个组件完成请求处理
   - 查找 Handler、调用 Handler、渲染视图
   - 管理 Spring MVC 的 9 大核心组件

3. **9 大核心组件**
   - MultipartResolver（文件上传）
   - LocaleResolver（国际化）
   - ThemeResolver（主题）
   - HandlerMapping（URL 映射）
   - HandlerAdapter（Handler 适配）
   - HandlerExceptionResolver（异常处理）
   - RequestToViewNameTranslator（视图名称转换）
   - ViewResolver（视图解析）
   - FlashMapManager（重定向数据传递）

4. **配置方式**
   - Spring Boot: 自动配置，无需手动配置
   - web.xml: 传统 Servlet 配置
   - Java Config: WebApplicationInitializer

5. **初始化流程**
   - init() → initServletBean() → initWebApplicationContext() → onRefresh() → initStrategies()
   - 初始化时加载所有核心组件

**记忆口诀**

**"前端控制是核心,统一接收所有请求;查找适配调处理,视图解析返响应;九大组件全协调,Spring MVC 的大管家"**

- **前端控制是核心**: DispatcherServlet 是前端控制器，是核心
- **统一接收所有请求**: 所有请求都由它统一接收
- **查找适配调处理**: 查找 Handler、适配 Handler、调用处理
- **视图解析返响应**: 解析视图、渲染视图、返回响应
- **九大组件全协调**: 协调 9 大核心组件完成工作
- **Spring MVC 的大管家**: 管理整个 Spring MVC 的运行

### 31. 什么是 HandlerMapping、HandlerAdapter、ViewResolver？

**核心答案**

这三个是 Spring MVC 中最核心的组件,负责请求映射、处理器调用和视图解析:

| 组件 | 作用 | 输入 | 输出 | 核心实现类 |
|-----|------|-----|------|-----------|
| **HandlerMapping** | 根据请求 URL 查找对应的 Handler | HttpServletRequest | HandlerExecutionChain | RequestMappingHandlerMapping |
| **HandlerAdapter** | 适配并调用 Handler 方法 | Handler + Request | ModelAndView | RequestMappingHandlerAdapter |
| **ViewResolver** | 解析视图名称,返回 View 对象 | 视图名称 + Locale | View | InternalResourceViewResolver |

**三大组件关系图:**

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">HandlerMapping、HandlerAdapter、ViewResolver 关系图</text>
<rect x="350" y="70" width="200" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">DispatcherServlet</text>
<text x="450" y="115" font-size="11" text-anchor="middle" fill="#fff">前端控制器</text>
<line x1="350" y1="100" x2="200" y2="180" stroke="#ff9800" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="275" y="135" font-size="11" fill="#ff9800">1. 查找Handler</text>
<rect x="100" y="180" width="200" height="80" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="200" y="210" font-size="15" font-weight="bold" text-anchor="middle" fill="#fff">HandlerMapping</text>
<text x="200" y="235" font-size="12" text-anchor="middle" fill="#fff">请求映射器</text>
<text x="200" y="250" font-size="10" text-anchor="middle" fill="#fff">URL → Handler</text>
<line x1="200" y1="260" x2="350" y2="320" stroke="#ff9800" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead)"/>
<text x="275" y="295" font-size="11" fill="#ff9800">2. 返回Handler</text>
<line x1="450" y1="130" x2="450" y2="180" stroke="#9c27b0" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="160" font-size="11" fill="#9c27b0">3. 调用Handler</text>
<rect x="350" y="180" width="200" height="80" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="450" y="210" font-size="15" font-weight="bold" text-anchor="middle" fill="#fff">HandlerAdapter</text>
<text x="450" y="235" font-size="12" text-anchor="middle" fill="#fff">处理器适配器</text>
<text x="450" y="250" font-size="10" text-anchor="middle" fill="#fff">调用 Handler 方法</text>
<line x1="550" y1="220" x2="700" y2="220" stroke="#9c27b0" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="625" y="215" font-size="11" fill="#9c27b0">调用</text>
<rect x="700" y="190" width="140" height="60" fill="#e91e63" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="770" y="215" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">Controller</text>
<text x="770" y="235" font-size="11" text-anchor="middle" fill="#fff">(Handler)</text>
<line x1="700" y1="220" x2="560" y2="220" stroke="#9c27b0" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead)"/>
<text x="630" y="240" font-size="11" fill="#9c27b0">4. 返回ModelAndView</text>
<line x1="450" y1="260" x2="450" y2="310" stroke="#9c27b0" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead)"/>
<text x="480" y="290" font-size="11" fill="#9c27b0">ModelAndView</text>
<rect x="350" y="310" width="200" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="335" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">DispatcherServlet</text>
<text x="450" y="355" font-size="11" text-anchor="middle" fill="#fff">处理 ModelAndView</text>
<line x1="550" y1="340" x2="700" y2="410" stroke="#f44336" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="625" y="375" font-size="11" fill="#f44336">5. 解析视图</text>
<rect x="600" y="410" width="200" height="80" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="700" y="440" font-size="15" font-weight="bold" text-anchor="middle" fill="#fff">ViewResolver</text>
<text x="700" y="465" font-size="12" text-anchor="middle" fill="#fff">视图解析器</text>
<text x="700" y="480" font-size="10" text-anchor="middle" fill="#fff">视图名称 → View 对象</text>
<line x1="600" y1="450" x2="450" y2="380" stroke="#f44336" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead)"/>
<text x="525" y="420" font-size="11" fill="#f44336">6. 返回View</text>
<rect x="50" y="410" width="200" height="80" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="150" y="440" font-size="15" font-weight="bold" text-anchor="middle" fill="#fff">View</text>
<text x="150" y="465" font-size="12" text-anchor="middle" fill="#fff">视图对象</text>
<text x="150" y="480" font-size="10" text-anchor="middle" fill="#fff">渲染视图</text>
<line x1="350" y1="340" x2="260" y2="450" stroke="#673ab7" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="305" y="395" font-size="11" fill="#673ab7">7. 渲染</text>
<text x="450" y="530" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">完整流程：查找Handler → 调用Handler → 解析视图 → 渲染视图</text>
</svg>

**详细说明**

**(1) HandlerMapping - 请求映射器**

HandlerMapping 负责根据请求 URL 查找对应的 Handler（Controller）。

```java
/**
 * HandlerMapping 接口定义
 */
public interface HandlerMapping {

    /**
     * 根据请求查找 Handler
     * @param request HTTP 请求
     * @return HandlerExecutionChain（包含 Handler 和拦截器）
     */
    @Nullable
    HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception;
}

/**
 * HandlerExecutionChain: Handler 执行链
 * 包含 Handler 和拦截器列表
 */
public class HandlerExecutionChain {
    private final Object handler;                      // Handler（Controller）
    private HandlerInterceptor[] interceptors;         // 拦截器数组
    private List<HandlerInterceptor> interceptorList;  // 拦截器列表

    // 执行 preHandle
    boolean applyPreHandle(HttpServletRequest request, HttpServletResponse response) {
        HandlerInterceptor[] interceptors = getInterceptors();
        if (interceptors != null) {
            for (int i = 0; i < interceptors.length; i++) {
                HandlerInterceptor interceptor = interceptors[i];
                if (!interceptor.preHandle(request, response, this.handler)) {
                    return false;
                }
            }
        }
        return true;
    }

    // 执行 postHandle
    void applyPostHandle(HttpServletRequest request, HttpServletResponse response, ModelAndView mv) {
        HandlerInterceptor[] interceptors = getInterceptors();
        if (interceptors != null) {
            for (int i = interceptors.length - 1; i >= 0; i--) {
                HandlerInterceptor interceptor = interceptors[i];
                interceptor.postHandle(request, response, this.handler, mv);
            }
        }
    }
}

/**
 * 常用的 HandlerMapping 实现类
 */

// 1. RequestMappingHandlerMapping（最常用）
// 处理 @RequestMapping、@GetMapping、@PostMapping 等注解
public class RequestMappingHandlerMapping extends RequestMappingInfoHandlerMapping {

    @Override
    protected HandlerMethod getHandlerInternal(HttpServletRequest request) throws Exception {
        // 获取请求路径
        String lookupPath = getUrlPathHelper().getLookupPathForRequest(request);

        // 根据路径查找 HandlerMethod
        HandlerMethod handlerMethod = lookupHandlerMethod(lookupPath, request);

        return handlerMethod;
    }

    protected HandlerMethod lookupHandlerMethod(String lookupPath, HttpServletRequest request) {
        List<Match> matches = new ArrayList<>();

        // 从注册的映射中查找匹配的 HandlerMethod
        List<RequestMappingInfo> directPathMatches = this.mappingRegistry.getMappingsByUrl(lookupPath);
        if (directPathMatches != null) {
            addMatchingMappings(directPathMatches, matches, request);
        }

        if (matches.isEmpty()) {
            addMatchingMappings(this.mappingRegistry.getMappings().keySet(), matches, request);
        }

        if (!matches.isEmpty()) {
            Comparator<Match> comparator = new MatchComparator(getMappingComparator(request));
            matches.sort(comparator);

            Match bestMatch = matches.get(0);
            return bestMatch.handlerMethod;
        }

        return null;
    }
}

// 2. BeanNameUrlHandlerMapping
// 根据 Bean 名称匹配 URL（传统方式）
public class BeanNameUrlHandlerMapping extends AbstractDetectingUrlHandlerMapping {

    @Override
    protected String[] determineUrlsForHandler(String beanName) {
        List<String> urls = new ArrayList<>();
        // Bean 名称以 / 开头，则作为 URL
        if (beanName.startsWith("/")) {
            urls.add(beanName);
        }
        // 获取 Bean 的别名
        String[] aliases = obtainApplicationContext().getAliases(beanName);
        for (String alias : aliases) {
            if (alias.startsWith("/")) {
                urls.add(alias);
            }
        }
        return StringUtils.toStringArray(urls);
    }
}

// 3. SimpleUrlHandlerMapping
// 手动配置 URL 和 Handler 的映射关系
public class SimpleUrlHandlerMapping extends AbstractUrlHandlerMapping {

    private final Map<String, Object> urlMap = new LinkedHashMap<>();

    public void setMappings(Properties mappings) {
        CollectionUtils.mergePropertiesIntoMap(mappings, this.urlMap);
    }

    public void setUrlMap(Map<String, ?> urlMap) {
        this.urlMap.putAll(urlMap);
    }
}

// 使用示例
@Configuration
public class WebConfig {

    // 示例 1: RequestMappingHandlerMapping（Spring 自动配置，无需手动创建）
    @Controller
    @RequestMapping("/users")
    public class UserController {

        @GetMapping("/{id}")
        public String getUser(@PathVariable Long id) {
            // RequestMappingHandlerMapping 自动处理
            return "user/detail";
        }
    }

    // 示例 2: BeanNameUrlHandlerMapping
    @Bean("/legacy/users")  // Bean 名称作为 URL
    public Controller legacyUserController() {
        return new AbstractController() {
            @Override
            protected ModelAndView handleRequestInternal(
                    HttpServletRequest request,
                    HttpServletResponse response) {
                return new ModelAndView("user/list");
            }
        };
    }

    // 示例 3: SimpleUrlHandlerMapping
    @Bean
    public SimpleUrlHandlerMapping simpleUrlHandlerMapping() {
        SimpleUrlHandlerMapping mapping = new SimpleUrlHandlerMapping();

        Map<String, Object> urlMap = new HashMap<>();
        urlMap.put("/hello", helloController());
        urlMap.put("/goodbye", goodbyeController());

        mapping.setUrlMap(urlMap);
        mapping.setOrder(0);

        return mapping;
    }

    @Bean
    public Controller helloController() {
        return (request, response) -> new ModelAndView("hello");
    }

    @Bean
    public Controller goodbyeController() {
        return (request, response) -> new ModelAndView("goodbye");
    }
}
```

**(2) HandlerAdapter - 处理器适配器**

HandlerAdapter 负责适配并调用 Handler 方法,使用**适配器模式**支持不同类型的 Handler。

```java
/**
 * HandlerAdapter 接口定义
 */
public interface HandlerAdapter {

    /**
     * 判断是否支持该 Handler
     */
    boolean supports(Object handler);

    /**
     * 调用 Handler 处理请求
     * @return ModelAndView（模型和视图）
     */
    @Nullable
    ModelAndView handle(HttpServletRequest request,
                       HttpServletResponse response,
                       Object handler) throws Exception;

    /**
     * 获取资源的最后修改时间（用于缓存）
     */
    long getLastModified(HttpServletRequest request, Object handler);
}

/**
 * 常用的 HandlerAdapter 实现类
 */

// 1. RequestMappingHandlerAdapter（最常用）
// 处理 @RequestMapping 注解的方法
public class RequestMappingHandlerAdapter extends AbstractHandlerMethodAdapter {

    @Override
    protected ModelAndView handleInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            HandlerMethod handlerMethod) throws Exception {

        ModelAndView mav;

        // 调用 Controller 方法
        mav = invokeHandlerMethod(request, response, handlerMethod);

        return mav;
    }

    protected ModelAndView invokeHandlerMethod(
            HttpServletRequest request,
            HttpServletResponse response,
            HandlerMethod handlerMethod) throws Exception {

        ServletWebRequest webRequest = new ServletWebRequest(request, response);

        try {
            // 1. 创建数据绑定工厂
            WebDataBinderFactory binderFactory = getDataBinderFactory(handlerMethod);

            // 2. 创建模型工厂
            ModelFactory modelFactory = getModelFactory(handlerMethod, binderFactory);

            // 3. 创建可调用的 HandlerMethod
            ServletInvocableHandlerMethod invocableMethod =
                createInvocableHandlerMethod(handlerMethod);

            // 4. 设置参数解析器
            if (this.argumentResolvers != null) {
                invocableMethod.setHandlerMethodArgumentResolvers(this.argumentResolvers);
            }

            // 5. 设置返回值处理器
            if (this.returnValueHandlers != null) {
                invocableMethod.setHandlerMethodReturnValueHandlers(this.returnValueHandlers);
            }

            invocableMethod.setDataBinderFactory(binderFactory);
            invocableMethod.setParameterNameDiscoverer(this.parameterNameDiscoverer);

            // 6. 创建 ModelAndViewContainer
            ModelAndViewContainer mavContainer = new ModelAndViewContainer();
            mavContainer.addAllAttributes(RequestContextUtils.getInputFlashMap(request));
            modelFactory.initModel(webRequest, mavContainer, invocableMethod);
            mavContainer.setIgnoreDefaultModelOnRedirect(this.ignoreDefaultModelOnRedirect);

            // 7. 调用方法
            invocableMethod.invokeAndHandle(webRequest, mavContainer);

            // 8. 返回 ModelAndView
            return getModelAndView(mavContainer, modelFactory, webRequest);

        } finally {
            webRequest.requestCompleted();
        }
    }
}

// 2. HttpRequestHandlerAdapter
// 处理实现了 HttpRequestHandler 接口的 Handler
public class HttpRequestHandlerAdapter implements HandlerAdapter {

    @Override
    public boolean supports(Object handler) {
        return (handler instanceof HttpRequestHandler);
    }

    @Override
    public ModelAndView handle(HttpServletRequest request,
                              HttpServletResponse response,
                              Object handler) throws Exception {
        ((HttpRequestHandler) handler).handleRequest(request, response);
        return null;  // HttpRequestHandler 直接写响应，不需要视图
    }

    @Override
    public long getLastModified(HttpServletRequest request, Object handler) {
        if (handler instanceof LastModified) {
            return ((LastModified) handler).getLastModified(request);
        }
        return -1L;
    }
}

// 3. SimpleControllerHandlerAdapter
// 处理实现了 Controller 接口的 Handler（传统方式）
public class SimpleControllerHandlerAdapter implements HandlerAdapter {

    @Override
    public boolean supports(Object handler) {
        return (handler instanceof Controller);
    }

    @Override
    public ModelAndView handle(HttpServletRequest request,
                              HttpServletResponse response,
                              Object handler) throws Exception {
        return ((Controller) handler).handleRequest(request, response);
    }

    @Override
    public long getLastModified(HttpServletRequest request, Object handler) {
        if (handler instanceof LastModified) {
            return ((LastModified) handler).getLastModified(request);
        }
        return -1L;
    }
}

// 使用示例
@Controller
@RequestMapping("/users")
public class UserController {

    /**
     * RequestMappingHandlerAdapter 处理这个方法
     */
    @GetMapping("/{id}")
    public ModelAndView getUser(@PathVariable Long id) {
        // 1. 参数解析: @PathVariable 解析为 id
        // 2. 方法调用: 执行业务逻辑
        // 3. 返回值处理: 返回 ModelAndView

        User user = userService.getUserById(id);

        ModelAndView mav = new ModelAndView("user/detail");
        mav.addObject("user", user);

        return mav;
    }
}

// HttpRequestHandlerAdapter 示例
@Component("/download")
public class FileDownloadHandler implements HttpRequestHandler {

    @Override
    public void handleRequest(HttpServletRequest request,
                             HttpServletResponse response) throws IOException {
        // 直接写响应，不需要视图
        response.setContentType("application/octet-stream");
        response.getOutputStream().write("file content".getBytes());
    }
}

// SimpleControllerHandlerAdapter 示例
@Component("/legacy")
public class LegacyController implements Controller {

    @Override
    public ModelAndView handleRequest(HttpServletRequest request,
                                     HttpServletResponse response) {
        return new ModelAndView("legacy/page");
    }
}
```

**(3) ViewResolver - 视图解析器**

ViewResolver 负责将视图名称解析为具体的 View 对象。

```java
/**
 * ViewResolver 接口定义
 */
public interface ViewResolver {

    /**
     * 解析视图名称，返回 View 对象
     * @param viewName 视图名称（如 "user/detail"）
     * @param locale 国际化语言环境
     * @return View 对象（如 JstlView）
     */
    @Nullable
    View resolveViewName(String viewName, Locale locale) throws Exception;
}

/**
 * 常用的 ViewResolver 实现类
 */

// 1. InternalResourceViewResolver（最常用）
// 解析 JSP 视图
public class InternalResourceViewResolver extends UrlBasedViewResolver {

    /**
     * 解析视图名称
     */
    @Override
    public View resolveViewName(String viewName, Locale locale) throws Exception {
        // 处理重定向: redirect:
        if (viewName.startsWith(REDIRECT_URL_PREFIX)) {
            String redirectUrl = viewName.substring(REDIRECT_URL_PREFIX.length());
            RedirectView view = new RedirectView(redirectUrl);
            return applyLifecycleMethods(REDIRECT_URL_PREFIX, view);
        }

        // 处理转发: forward:
        if (viewName.startsWith(FORWARD_URL_PREFIX)) {
            String forwardUrl = viewName.substring(FORWARD_URL_PREFIX.length());
            InternalResourceView view = new InternalResourceView(forwardUrl);
            return applyLifecycleMethods(FORWARD_URL_PREFIX, view);
        }

        // 正常视图
        return super.resolveViewName(viewName, locale);
    }

    @Override
    protected View createView(String viewName, Locale locale) throws Exception {
        // 拼接完整路径: prefix + viewName + suffix
        // 例如: /WEB-INF/views/ + user/detail + .jsp
        //     = /WEB-INF/views/user/detail.jsp
        return super.createView(viewName, locale);
    }

    @Override
    protected AbstractUrlBasedView buildView(String viewName) throws Exception {
        InternalResourceView view = (InternalResourceView) super.buildView(viewName);
        // 设置 JSTL 支持
        if (this.alwaysInclude != null) {
            view.setAlwaysInclude(this.alwaysInclude);
        }
        view.setPreventDispatchLoop(true);
        return view;
    }
}

// 配置示例
@Configuration
public class WebConfig {

    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");  // 前缀
        resolver.setSuffix(".jsp");             // 后缀
        resolver.setViewClass(JstlView.class);  // 视图类
        resolver.setOrder(1);                   // 优先级
        return resolver;
    }
}

// 2. ThymeleafViewResolver
// 解析 Thymeleaf 模板视图
public class ThymeleafViewResolver extends AbstractCachingViewResolver {

    @Override
    protected View createView(String viewName, Locale locale) throws Exception {
        // 创建 ThymeleafView
        ThymeleafView view = new ThymeleafView();
        view.setTemplateEngine(this.templateEngine);
        view.setTemplateName(viewName);
        view.setLocale(locale);
        return view;
    }
}

// 配置示例
@Configuration
public class ThymeleafConfig {

    @Bean
    public SpringTemplateEngine templateEngine() {
        SpringTemplateEngine engine = new SpringTemplateEngine();
        engine.setTemplateResolver(templateResolver());
        return engine;
    }

    @Bean
    public ITemplateResolver templateResolver() {
        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
        resolver.setPrefix("classpath:/templates/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode(TemplateMode.HTML);
        resolver.setCharacterEncoding("UTF-8");
        return resolver;
    }

    @Bean
    public ThymeleafViewResolver viewResolver() {
        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
        resolver.setTemplateEngine(templateEngine());
        resolver.setCharacterEncoding("UTF-8");
        resolver.setOrder(1);
        return resolver;
    }
}

// 3. ContentNegotiatingViewResolver
// 根据内容协商选择视图（支持多种视图类型）
public class ContentNegotiatingViewResolver extends WebApplicationObjectSupport
        implements ViewResolver, Ordered, InitializingBean {

    @Override
    public View resolveViewName(String viewName, Locale locale) throws Exception {
        // 1. 获取请求的媒体类型
        RequestAttributes attrs = RequestContextHolder.getRequestAttributes();
        List<MediaType> requestedMediaTypes = getMediaTypes(((ServletRequestAttributes) attrs).getRequest());

        // 2. 获取所有候选视图
        List<View> candidateViews = getCandidateViews(viewName, locale, requestedMediaTypes);

        // 3. 根据媒体类型选择最佳视图
        View bestView = getBestView(candidateViews, requestedMediaTypes, attrs);

        return bestView;
    }

    private List<View> getCandidateViews(String viewName, Locale locale,
                                        List<MediaType> requestedMediaTypes) throws Exception {
        List<View> candidateViews = new ArrayList<>();

        // 遍历所有 ViewResolver
        for (ViewResolver viewResolver : this.viewResolvers) {
            View view = viewResolver.resolveViewName(viewName, locale);
            if (view != null) {
                candidateViews.add(view);
            }
        }

        // 添加默认视图
        if (!CollectionUtils.isEmpty(this.defaultViews)) {
            candidateViews.addAll(this.defaultViews);
        }

        return candidateViews;
    }
}

// 4. BeanNameViewResolver
// 根据视图名称查找 Bean
public class BeanNameViewResolver extends WebApplicationObjectSupport
        implements ViewResolver, Ordered {

    @Override
    public View resolveViewName(String viewName, Locale locale) throws BeansException {
        // 从 Spring 容器中查找名为 viewName 的 View Bean
        ApplicationContext context = obtainApplicationContext();
        if (!context.containsBean(viewName)) {
            return null;
        }
        if (!context.isTypeMatch(viewName, View.class)) {
            return null;
        }
        return context.getBean(viewName, View.class);
    }
}

// 使用示例
@Configuration
public class ViewConfig {

    // 配置多个 ViewResolver
    @Bean
    public ViewResolver jspViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        resolver.setOrder(2);  // 低优先级
        return resolver;
    }

    @Bean
    public ViewResolver thymeleafViewResolver() {
        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
        resolver.setTemplateEngine(templateEngine());
        resolver.setOrder(1);  // 高优先级
        return resolver;
    }

    @Bean
    public ViewResolver beanNameViewResolver() {
        BeanNameViewResolver resolver = new BeanNameViewResolver();
        resolver.setOrder(0);  // 最高优先级
        return resolver;
    }

    // 自定义 View Bean
    @Bean("pdfView")
    public View pdfView() {
        return new AbstractPdfView() {
            @Override
            protected void buildPdfDocument(Map<String, Object> model,
                                          Document document,
                                          PdfWriter writer,
                                          HttpServletRequest request,
                                          HttpServletResponse response) {
                // 生成 PDF
            }
        };
    }
}

// Controller 使用
@Controller
public class ReportController {

    @GetMapping("/report/pdf")
    public String generatePdf(Model model) {
        model.addAttribute("data", getData());
        return "pdfView";  // BeanNameViewResolver 解析为 pdfView Bean
    }

    @GetMapping("/report/html")
    public String generateHtml(Model model) {
        model.addAttribute("data", getData());
        return "report/html";  // ThymeleafViewResolver 解析
    }

    @GetMapping("/report/jsp")
    public String generateJsp(Model model) {
        model.addAttribute("data", getData());
        return "report/jsp";  // InternalResourceViewResolver 解析
    }
}
```

**(4) 三大组件的协作流程**

```java
/**
 * DispatcherServlet 中三大组件的协作
 */
public class DispatcherServlet extends FrameworkServlet {

    protected void doDispatch(HttpServletRequest request, HttpServletResponse response) {

        HandlerExecutionChain mappedHandler = null;
        ModelAndView mv = null;

        // ========== 1. HandlerMapping: 查找 Handler ==========
        mappedHandler = getHandler(request);
        if (mappedHandler == null) {
            noHandlerFound(request, response);
            return;
        }

        // ========== 2. HandlerAdapter: 调用 Handler ==========
        HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());
        mv = ha.handle(request, response, mappedHandler.getHandler());

        // ========== 3. ViewResolver: 解析视图 ==========
        if (mv != null && !mv.wasCleared()) {
            render(mv, request, response);
        }
    }

    /**
     * 使用 HandlerMapping 查找 Handler
     */
    protected HandlerExecutionChain getHandler(HttpServletRequest request) {
        if (this.handlerMappings != null) {
            for (HandlerMapping mapping : this.handlerMappings) {
                HandlerExecutionChain handler = mapping.getHandler(request);
                if (handler != null) {
                    return handler;
                }
            }
        }
        return null;
    }

    /**
     * 获取支持该 Handler 的 HandlerAdapter
     */
    protected HandlerAdapter getHandlerAdapter(Object handler) throws ServletException {
        if (this.handlerAdapters != null) {
            for (HandlerAdapter adapter : this.handlerAdapters) {
                if (adapter.supports(handler)) {
                    return adapter;
                }
            }
        }
        throw new ServletException("No adapter for handler: " + handler);
    }

    /**
     * 渲染视图
     */
    protected void render(ModelAndView mv, HttpServletRequest request,
                         HttpServletResponse response) throws Exception {
        View view;
        String viewName = mv.getViewName();

        if (viewName != null) {
            // 使用 ViewResolver 解析视图名称
            view = resolveViewName(viewName, mv.getModelMap(), request);
        } else {
            view = mv.getView();
        }

        // 渲染视图
        view.render(mv.getModelMap(), request, response);
    }

    /**
     * 使用 ViewResolver 解析视图
     */
    protected View resolveViewName(String viewName, Map<String, Object> model,
                                  HttpServletRequest request) throws Exception {
        if (this.viewResolvers != null) {
            for (ViewResolver viewResolver : this.viewResolvers) {
                View view = viewResolver.resolveViewName(viewName, locale);
                if (view != null) {
                    return view;
                }
            }
        }
        return null;
    }
}
```

**关键要点**

1. **HandlerMapping（请求映射器）**
   - 作用: 根据请求 URL 查找对应的 Handler
   - 输入: HttpServletRequest
   - 输出: HandlerExecutionChain（Handler + 拦截器）
   - 常用实现: RequestMappingHandlerMapping（处理 @RequestMapping）

2. **HandlerAdapter（处理器适配器）**
   - 作用: 适配并调用 Handler 方法（适配器模式）
   - 输入: Handler + HttpServletRequest
   - 输出: ModelAndView
   - 常用实现: RequestMappingHandlerAdapter（处理 @RequestMapping 方法）

3. **ViewResolver（视图解析器）**
   - 作用: 将视图名称解析为 View 对象
   - 输入: 视图名称 + Locale
   - 输出: View 对象
   - 常用实现: InternalResourceViewResolver（JSP）、ThymeleafViewResolver（Thymeleaf）

4. **协作流程**
   - HandlerMapping 查找 Handler
   - HandlerAdapter 调用 Handler,返回 ModelAndView
   - ViewResolver 解析视图名称,返回 View
   - View 渲染视图,生成响应

5. **设计模式**
   - HandlerMapping: 策略模式（不同的映射策略）
   - HandlerAdapter: 适配器模式（适配不同类型的 Handler）
   - ViewResolver: 策略模式（不同的视图解析策略）

**记忆口诀**

**"映射查找定位准,适配调用功能全;视图解析名变实,三大组件协作完"**

- **映射查找定位准**: HandlerMapping 根据 URL 精准查找 Handler
- **适配调用功能全**: HandlerAdapter 适配不同类型的 Handler 并调用
- **视图解析名变实**: ViewResolver 将视图名称解析为实际的 View 对象
- **三大组件协作完**: 三个组件协作完成请求处理

**组件职责口诀:**
- **"Mapping 负责找,Adapter 负责调,Resolver 负责视图造"**

### 33. @RequestParam 和 @PathVariable 的区别是什么？

**核心答案**

**@RequestParam** 和 **@PathVariable** 都是用于接收请求参数的注解,但它们的**来源不同**:

| 对比项 | @RequestParam | @PathVariable |
|-------|--------------|--------------|
| **参数来源** | 查询字符串（Query String）或表单参数 | URL 路径中的占位符 |
| **URL 格式** | `/users?id=123&name=zhangsan` | `/users/123` |
| **是否必需** | 默认必需（可设置 required=false） | 必需（路径的一部分） |
| **默认值** | 支持（defaultValue） | 不支持 |
| **RESTful 风格** | 不符合 | 符合 |
| **适用场景** | 查询、过滤、分页参数 | 资源标识符（ID） |
| **示例** | `@RequestParam Long id` | `@PathVariable Long id` |

**对比示意图:**

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">@RequestParam vs @PathVariable</text>
<rect x="100" y="80" width="300" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="250" y="110" font-size="15" font-weight="bold" text-anchor="middle" fill="#1976d2">@RequestParam</text>
<text x="250" y="140" font-size="13" text-anchor="middle" fill="#333">查询字符串参数</text>
<rect x="130" y="160" width="240" height="40" fill="#fff" stroke="#999" stroke-width="1" rx="3"/>
<text x="250" y="185" font-size="12" text-anchor="middle" fill="#333" font-family="monospace">/users?id=123&amp;name=zhangsan</text>
<text x="250" y="220" font-size="11" text-anchor="middle" fill="#666">• 可选参数（required=false）</text>
<text x="250" y="240" font-size="11" text-anchor="middle" fill="#666">• 支持默认值（defaultValue）</text>
<rect x="500" y="80" width="300" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="650" y="110" font-size="15" font-weight="bold" text-anchor="middle" fill="#f57c00">@PathVariable</text>
<text x="650" y="140" font-size="13" text-anchor="middle" fill="#333">URL 路径变量</text>
<rect x="530" y="160" width="240" height="40" fill="#fff" stroke="#999" stroke-width="1" rx="3"/>
<text x="650" y="185" font-size="12" text-anchor="middle" fill="#333" font-family="monospace">/users/123</text>
<text x="650" y="220" font-size="11" text-anchor="middle" fill="#666">• 必需参数（路径的一部分）</text>
<text x="650" y="240" font-size="11" text-anchor="middle" fill="#666">• 不支持默认值</text>
<rect x="100" y="300" width="300" height="150" fill="#f1f8e9" stroke="#689f38" stroke-width="2" rx="5"/>
<text x="250" y="330" font-size="14" font-weight="bold" text-anchor="middle" fill="#689f38">使用场景</text>
<text x="250" y="355" font-size="11" text-anchor="middle" fill="#333">• 查询条件</text>
<text x="250" y="375" font-size="11" text-anchor="middle" fill="#333">• 过滤参数</text>
<text x="250" y="395" font-size="11" text-anchor="middle" fill="#333">• 分页参数</text>
<text x="250" y="415" font-size="11" text-anchor="middle" fill="#333">• 排序参数</text>
<text x="250" y="435" font-size="11" text-anchor="middle" fill="#333">GET /users?page=1&amp;size=10</text>
<rect x="500" y="300" width="300" height="150" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="650" y="330" font-size="14" font-weight="bold" text-anchor="middle" fill="#c2185b">使用场景</text>
<text x="650" y="355" font-size="11" text-anchor="middle" fill="#333">• 资源标识（ID）</text>
<text x="650" y="375" font-size="11" text-anchor="middle" fill="#333">• RESTful 风格</text>
<text x="650" y="395" font-size="11" text-anchor="middle" fill="#333">• 层级资源</text>
<text x="650" y="415" font-size="11" text-anchor="middle" fill="#333">• 唯一定位资源</text>
<text x="650" y="435" font-size="11" text-anchor="middle" fill="#333">GET /users/123/orders/456</text>
</svg>

**详细说明**

**(1) @RequestParam - 查询字符串参数**

```java
/**
 * @RequestParam: 获取查询字符串参数或表单参数
 */
@RestController
@RequestMapping("/api/users")
public class RequestParamController {

    /**
     * 1. 基本用法
     * 请求: GET /api/users/search?keyword=张三
     */
    @GetMapping("/search")
    public List<User> search(@RequestParam String keyword) {
        return userService.searchByKeyword(keyword);
    }

    /**
     * 2. 指定参数名称
     * 请求: GET /api/users/search?q=张三
     * 参数名 q 映射到方法参数 keyword
     */
    @GetMapping("/search2")
    public List<User> search2(@RequestParam("q") String keyword) {
        return userService.searchByKeyword(keyword);
    }

    /**
     * 3. 可选参数（required = false）
     * 请求: GET /api/users/list
     * 或: GET /api/users/list?keyword=张三
     */
    @GetMapping("/list")
    public List<User> list(@RequestParam(required = false) String keyword) {
        if (keyword == null) {
            return userService.getAllUsers();
        }
        return userService.searchByKeyword(keyword);
    }

    /**
     * 4. 默认值（defaultValue）
     * 请求: GET /api/users/page
     * 或: GET /api/users/page?page=2&size=20
     */
    @GetMapping("/page")
    public Page<User> page(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return userService.getUsers(page, size);
    }

    /**
     * 5. 多个参数
     * 请求: GET /api/users/filter?name=张三&age=25&city=北京
     */
    @GetMapping("/filter")
    public List<User> filter(
        @RequestParam String name,
        @RequestParam Integer age,
        @RequestParam String city
    ) {
        return userService.filter(name, age, city);
    }

    /**
     * 6. 接收数组参数
     * 请求: GET /api/users/batch?ids=1&ids=2&ids=3
     * 或: GET /api/users/batch?ids=1,2,3
     */
    @GetMapping("/batch")
    public List<User> batchGet(@RequestParam List<Long> ids) {
        return userService.getUsersByIds(ids);
    }

    /**
     * 7. 接收所有参数（Map）
     * 请求: GET /api/users/all?name=张三&age=25&city=北京
     */
    @GetMapping("/all")
    public Map<String, Object> getAllParams(@RequestParam Map<String, Object> params) {
        // params = {name=张三, age=25, city=北京}
        return params;
    }

    /**
     * 8. 接收所有参数（MultiValueMap）
     * 请求: GET /api/users/multi?hobby=读书&hobby=运动&hobby=旅游
     */
    @GetMapping("/multi")
    public Map<String, List<String>> getMultiParams(
        @RequestParam MultiValueMap<String, String> params
    ) {
        // params = {hobby=[读书, 运动, 旅游]}
        return params.toSingleValueMap();
    }

    /**
     * 9. 表单提交（application/x-www-form-urlencoded）
     * 请求: POST /api/users/form
     * Content-Type: application/x-www-form-urlencoded
     * Body: username=zhangsan&password=123456
     */
    @PostMapping("/form")
    public String submitForm(
        @RequestParam String username,
        @RequestParam String password
    ) {
        return "username=" + username + ", password=" + password;
    }

    /**
     * 10. 类型转换
     * Spring 自动进行类型转换
     */
    @GetMapping("/convert")
    public String convert(
        @RequestParam int intValue,           // 字符串 → int
        @RequestParam Long longValue,         // 字符串 → Long
        @RequestParam boolean boolValue,      // 字符串 → boolean
        @RequestParam Date dateValue,         // 字符串 → Date
        @RequestParam LocalDate localDate     // 字符串 → LocalDate
    ) {
        return "converted";
    }
}
```

**(2) @PathVariable - URL 路径变量**

```java
/**
 * @PathVariable: 获取 URL 路径中的变量
 */
@RestController
@RequestMapping("/api")
public class PathVariableController {

    /**
     * 1. 基本用法
     * 请求: GET /api/users/123
     */
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    /**
     * 2. 指定变量名称
     * 请求: GET /api/users/123
     * 路径变量 id 映射到方法参数 userId
     */
    @GetMapping("/users/{id}")
    public User getUserWithName(@PathVariable("id") Long userId) {
        return userService.getUserById(userId);
    }

    /**
     * 3. 多个路径变量
     * 请求: GET /api/users/123/orders/456
     */
    @GetMapping("/users/{userId}/orders/{orderId}")
    public Order getUserOrder(
        @PathVariable Long userId,
        @PathVariable Long orderId
    ) {
        return orderService.getOrder(userId, orderId);
    }

    /**
     * 4. 路径变量 + 正则表达式
     * 请求: GET /api/users/123（id 必须是数字）
     * 不匹配: GET /api/users/abc
     */
    @GetMapping("/users/{id:\\d+}")
    public User getUserWithRegex(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    /**
     * 5. 可选路径变量（通过两个方法实现）
     * 请求: GET /api/books
     * 或: GET /api/books/123
     */
    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/books/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    /**
     * 6. 接收所有路径变量（Map）
     * 请求: GET /api/users/123/orders/456
     */
    @GetMapping("/users/{userId}/orders/{orderId}")
    public Map<String, String> getAllPathVariables(@PathVariable Map<String, String> pathVars) {
        // pathVars = {userId=123, orderId=456}
        return pathVars;
    }

    /**
     * 7. RESTful 风格的完整示例
     */
    @GetMapping("/users/{id}")  // 获取单个资源
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/users/{id}")  // 更新资源
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/users/{id}")  // 删除资源
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    /**
     * 8. 层级资源
     * 请求: GET /api/companies/1/departments/2/employees/3
     */
    @GetMapping("/companies/{companyId}/departments/{deptId}/employees/{empId}")
    public Employee getEmployee(
        @PathVariable Long companyId,
        @PathVariable Long deptId,
        @PathVariable Long empId
    ) {
        return employeeService.getEmployee(companyId, deptId, empId);
    }

    /**
     * 9. 类型转换
     */
    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable UUID id) {  // 字符串 → UUID
        return productService.getProductById(id);
    }

    /**
     * 10. 路径变量中的特殊字符
     * 请求: GET /api/files/folder1/file.txt
     * 注意: .txt 会被认为是文件扩展名，需要特殊处理
     */
    @GetMapping("/files/{fileName:.+}")  // .+ 匹配包含点的文件名
    public String getFile(@PathVariable String fileName) {
        return "fileName=" + fileName;
    }
}
```

**(3) 两者的组合使用**

```java
/**
 * @RequestParam 和 @PathVariable 组合使用
 */
@RestController
@RequestMapping("/api")
public class CombinedController {

    /**
     * 1. 组合使用：路径变量 + 查询参数
     * 请求: GET /api/users/123?includeOrders=true
     */
    @GetMapping("/users/{id}")
    public UserDTO getUser(
        @PathVariable Long id,
        @RequestParam(defaultValue = "false") boolean includeOrders
    ) {
        User user = userService.getUserById(id);
        if (includeOrders) {
            List<Order> orders = orderService.getOrdersByUserId(id);
            return new UserDTO(user, orders);
        }
        return new UserDTO(user);
    }

    /**
     * 2. 分页查询 + 过滤条件
     * 请求: GET /api/categories/1/products?page=1&size=10&sort=price&keyword=手机
     */
    @GetMapping("/categories/{categoryId}/products")
    public Page<Product> getProducts(
        @PathVariable Long categoryId,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String sort,
        @RequestParam(required = false) String keyword
    ) {
        return productService.getProducts(categoryId, page, size, sort, keyword);
    }

    /**
     * 3. RESTful + 查询参数
     * 请求: GET /api/users/123/orders?status=PAID&startDate=2024-01-01
     */
    @GetMapping("/users/{userId}/orders")
    public List<Order> getUserOrders(
        @PathVariable Long userId,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) LocalDate startDate,
        @RequestParam(required = false) LocalDate endDate
    ) {
        return orderService.getUserOrders(userId, status, startDate, endDate);
    }

    /**
     * 4. 多层级路径 + 多个查询参数
     * 请求: GET /api/projects/1/tasks/2/comments?page=1&size=20&sort=createdAt,desc
     */
    @GetMapping("/projects/{projectId}/tasks/{taskId}/comments")
    public Page<Comment> getComments(
        @PathVariable Long projectId,
        @PathVariable Long taskId,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "20") int size,
        @RequestParam(required = false) String sort
    ) {
        return commentService.getComments(projectId, taskId, page, size, sort);
    }

    /**
     * 5. 对比：相同功能的两种实现方式
     */

    // 方式 1: 使用 @RequestParam（不推荐）
    @GetMapping("/users/detail")
    public User getUserByRequestParam(@RequestParam Long id) {
        return userService.getUserById(id);
    }
    // 请求: GET /api/users/detail?id=123

    // 方式 2: 使用 @PathVariable（推荐，RESTful 风格）
    @GetMapping("/users/{id}")
    public User getUserByPathVariable(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    // 请求: GET /api/users/123
}
```

**(4) 使用建议和最佳实践**

```java
/**
 * 使用建议和最佳实践
 */
@RestController
@RequestMapping("/api")
public class BestPracticeController {

    /**
     * 1. RESTful 风格：优先使用 @PathVariable
     */

    // ✓ 推荐：使用路径变量标识资源
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // ✗ 不推荐：使用查询参数标识资源
    @GetMapping("/users")
    public User getUserBad(@RequestParam Long id) {
        return userService.getUserById(id);
    }

    /**
     * 2. 查询条件：使用 @RequestParam
     */

    // ✓ 推荐：查询条件用查询参数
    @GetMapping("/users")
    public List<User> searchUsers(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) Integer age,
        @RequestParam(required = false) String city
    ) {
        return userService.search(name, age, city);
    }

    /**
     * 3. 分页和排序：使用 @RequestParam
     */

    // ✓ 推荐
    @GetMapping("/users")
    public Page<User> listUsers(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String order
    ) {
        return userService.getUsers(page, size, sortBy, order);
    }

    /**
     * 4. 层级资源：使用 @PathVariable
     */

    // ✓ 推荐：清晰的层级关系
    @GetMapping("/users/{userId}/orders/{orderId}")
    public Order getOrder(
        @PathVariable Long userId,
        @PathVariable Long orderId
    ) {
        return orderService.getOrder(userId, orderId);
    }

    /**
     * 5. 可选参数：@RequestParam 更合适
     */

    // ✓ 推荐：可选的过滤条件
    @GetMapping("/products")
    public List<Product> getProducts(
        @RequestParam(required = false) String category,
        @RequestParam(required = false) BigDecimal minPrice,
        @RequestParam(required = false) BigDecimal maxPrice
    ) {
        return productService.search(category, minPrice, maxPrice);
    }

    /**
     * 6. 语义化 URL：@PathVariable
     */

    // ✓ 推荐：语义清晰的 URL
    @GetMapping("/users/{userId}/profile")
    public Profile getUserProfile(@PathVariable Long userId) {
        return profileService.getProfile(userId);
    }

    @GetMapping("/users/{userId}/settings")
    public Settings getUserSettings(@PathVariable Long userId) {
        return settingsService.getSettings(userId);
    }

    /**
     * 7. 批量操作：@RequestParam
     */

    // ✓ 推荐：批量删除用查询参数
    @DeleteMapping("/users")
    public void batchDelete(@RequestParam List<Long> ids) {
        userService.batchDelete(ids);
    }
    // 请求: DELETE /api/users?ids=1,2,3

    /**
     * 8. 避免混淆
     */

    // ✗ 不推荐：路径变量和查询参数同名
    @GetMapping("/users/{id}")
    public User confusing(
        @PathVariable Long id,
        @RequestParam Long id  // 错误：参数名重复
    ) {
        return null;
    }

    // ✓ 推荐：使用不同的名称
    @GetMapping("/users/{userId}")
    public User clear(
        @PathVariable Long userId,
        @RequestParam(required = false) Long relatedId
    ) {
        return userService.getUser(userId, relatedId);
    }
}
```

**关键要点**

1. **参数来源**
   - @RequestParam: 查询字符串（`?key=value`）或表单参数
   - @PathVariable: URL 路径中的占位符（`/users/{id}`）

2. **是否必需**
   - @RequestParam: 默认必需，可设置 `required=false`
   - @PathVariable: 必需（路径的一部分）

3. **默认值**
   - @RequestParam: 支持 `defaultValue` 属性
   - @PathVariable: 不支持默认值

4. **RESTful 风格**
   - @PathVariable: 符合 RESTful 规范，用于资源标识
   - @RequestParam: 不符合，用于查询条件和可选参数

5. **使用场景**
   - @PathVariable: 资源 ID、层级资源、RESTful API
   - @RequestParam: 查询条件、过滤参数、分页、排序

6. **最佳实践**
   - 资源标识用 @PathVariable
   - 查询条件用 @RequestParam
   - 优先使用 RESTful 风格
   - 避免参数名混淆

**记忆口诀**

**"路径标识用 Path,查询过滤用 Param;资源定位走路径,条件筛选带参数;RESTful 风格 Path 优先,可选默认 Param 方便"**

- **路径标识用 Path**: 路径变量用 @PathVariable
- **查询过滤用 Param**: 查询参数用 @RequestParam
- **资源定位走路径**: 资源标识走 URL 路径
- **条件筛选带参数**: 查询条件用查询参数
- **RESTful 风格 Path 优先**: RESTful API 优先使用 @PathVariable
- **可选默认 Param 方便**: 可选参数和默认值用 @RequestParam 更方便

**使用场景口诀:**
- **"ID 用 Path,条件用 Param;分页排序 Param 管,层级资源 Path 串"**


### 34. @RequestBody 和 @ResponseBody 的作用是什么？

**核心答案**

**@RequestBody** 和 **@ResponseBody** 是用于处理 **HTTP 请求体和响应体**的注解,主要用于 **RESTful API** 开发,实现 **JSON/XML** 等格式的数据交互。

| 注解 | 作用 | 数据流向 | 转换器 | 使用场景 |
|-----|------|---------|--------|---------|
| **@RequestBody** | 将 HTTP 请求体转换为 Java 对象 | 请求 → 对象 | HttpMessageConverter | 接收 JSON/XML 数据 |
| **@ResponseBody** | 将 Java 对象转换为 HTTP 响应体 | 对象 → 响应 | HttpMessageConverter | 返回 JSON/XML 数据 |

**工作原理:**

<svg viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">@RequestBody 和 @ResponseBody 工作原理</text>
<rect x="100" y="80" width="200" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="200" y="110" font-size="14" font-weight="bold" text-anchor="middle" fill="#1976d2">HTTP 请求</text>
<text x="200" y="135" font-size="11" text-anchor="middle" fill="#333">Content-Type:</text>
<text x="200" y="150" font-size="11" text-anchor="middle" fill="#333">application/json</text>
<line x1="300" y1="120" x2="360" y2="120" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="330" y="110" font-size="10" fill="#4caf50">@RequestBody</text>
<rect x="360" y="80" width="180" height="80" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="110" font-size="13" font-weight="bold" text-anchor="middle" fill="#2e7d32">消息转换器</text>
<text x="450" y="130" font-size="10" text-anchor="middle" fill="#333">HttpMessage</text>
<text x="450" y="145" font-size="10" text-anchor="middle" fill="#333">Converter</text>
<line x1="540" y1="120" x2="600" y2="120" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="570" y="110" font-size="10" fill="#4caf50">反序列化</text>
<rect x="600" y="80" width="200" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="700" y="110" font-size="14" font-weight="bold" text-anchor="middle" fill="#f57c00">Java 对象</text>
<text x="700" y="135" font-size="11" text-anchor="middle" fill="#333">User user = ...</text>
<rect x="600" y="280" width="200" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="700" y="310" font-size="14" font-weight="bold" text-anchor="middle" fill="#f57c00">Java 对象</text>
<text x="700" y="335" font-size="11" text-anchor="middle" fill="#333">return user;</text>
<line x1="600" y1="320" x2="540" y2="320" stroke="#9c27b0" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="570" y="340" font-size="10" fill="#9c27b0">序列化</text>
<rect x="360" y="280" width="180" height="80" fill="#e1bee7" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="450" y="310" font-size="13" font-weight="bold" text-anchor="middle" fill="#6a1b9a">消息转换器</text>
<text x="450" y="330" font-size="10" text-anchor="middle" fill="#333">HttpMessage</text>
<text x="450" y="345" font-size="10" text-anchor="middle" fill="#333">Converter</text>
<line x1="360" y1="320" x2="300" y2="320" stroke="#9c27b0" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="330" y="310" font-size="10" fill="#9c27b0">@ResponseBody</text>
<rect x="100" y="280" width="200" height="80" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="200" y="310" font-size="14" font-weight="bold" text-anchor="middle" fill="#9c27b0">HTTP 响应</text>
<text x="200" y="335" font-size="11" text-anchor="middle" fill="#333">Content-Type:</text>
<text x="200" y="350" font-size="11" text-anchor="middle" fill="#333">application/json</text>
<rect x="600" y="190" width="200" height="60" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="700" y="215" font-size="13" font-weight="bold" text-anchor="middle" fill="#c62828">Controller</text>
<text x="700" y="235" font-size="11" text-anchor="middle" fill="#333">处理业务逻辑</text>
<line x1="700" y1="160" x2="700" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="700" y1="250" x2="700" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
</svg>

**详细说明**

**(1) @RequestBody - 接收请求体数据**

```java
/**
 * @RequestBody: 将 HTTP 请求体转换为 Java 对象
 */
@RestController
@RequestMapping("/api/users")
public class RequestBodyController {

    /**
     * 1. 基本用法：接收 JSON 数据
     * 请求:
     * POST /api/users
     * Content-Type: application/json
     * Body: {"username":"zhangsan","email":"zhangsan@example.com","age":25}
     */
    @PostMapping
    public User createUser(@RequestBody User user) {
        // Spring 自动将 JSON 转换为 User 对象
        return userService.saveUser(user);
    }

    /**
     * 2. 接收 List
     * 请求:
     * POST /api/users/batch
     * Body: [{"username":"zhangsan",...}, {"username":"lisi",...}]
     */
    @PostMapping("/batch")
    public List<User> batchCreate(@RequestBody List<User> users) {
        return userService.batchSave(users);
    }

    /**
     * 3. 接收 Map
     * 请求:
     * POST /api/users/update
     * Body: {"id":123, "username":"zhangsan", "age":26}
     */
    @PostMapping("/update")
    public User updateUser(@RequestBody Map<String, Object> updates) {
        Long id = Long.valueOf(updates.get("id").toString());
        User user = userService.getUserById(id);

        if (updates.containsKey("username")) {
            user.setUsername(updates.get("username").toString());
        }
        if (updates.containsKey("age")) {
            user.setAge((Integer) updates.get("age"));
        }

        return userService.updateUser(user);
    }

    /**
     * 4. 参数校验（@Valid）
     * 结合 JSR-303 注解进行参数校验
     */
    @PostMapping("/validated")
    public User createUserValidated(@Valid @RequestBody User user) {
        // 如果校验失败，自动抛出 MethodArgumentNotValidException
        return userService.saveUser(user);
    }

    /**
     * 5. 接收嵌套对象
     */
    @PostMapping("/order")
    public Order createOrder(@RequestBody Order order) {
        // Order 包含 List<OrderItem>
        return orderService.createOrder(order);
    }

    /**
     * 6. required 属性（默认 true）
     * required = false: 允许请求体为空
     */
    @PostMapping("/optional")
    public String optionalBody(@RequestBody(required = false) User user) {
        if (user == null) {
            return "No body";
        }
        return "Body received";
    }
}

// 实体类示例
@Data
public class User {
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 20, message = "用户名长度必须在 3-20 之间")
    private String username;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    @Min(value = 0, message = "年龄不能小于 0")
    @Max(value = 150, message = "年龄不能大于 150")
    private Integer age;
}

@Data
public class Order {
    private Long id;
    private String orderNo;
    private BigDecimal totalAmount;
    private List<OrderItem> items;  // 嵌套对象
}

@Data
public class OrderItem {
    private Long productId;
    private String productName;
    private Integer quantity;
    private BigDecimal price;
}
```

**(2) @ResponseBody - 返回响应体数据**

```java
/**
 * @ResponseBody: 将 Java 对象转换为 HTTP 响应体
 */
@Controller  // 注意：这里是 @Controller，不是 @RestController
@RequestMapping("/api/users")
public class ResponseBodyController {

    /**
     * 1. 基本用法：返回 JSON
     * @ResponseBody 将 User 对象转换为 JSON
     */
    @GetMapping("/{id}")
    @ResponseBody
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    /**
     * 2. 返回 List
     */
    @GetMapping
    @ResponseBody
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * 3. 返回 Map
     */
    @GetMapping("/stats")
    @ResponseBody
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userService.countUsers());
        stats.put("activeUsers", userService.countActiveUsers());
        stats.put("timestamp", System.currentTimeMillis());
        return stats;
    }

    /**
     * 4. 返回统一响应结果
     */
    @GetMapping("/{id}/detail")
    @ResponseBody
    public Result<User> getUserDetail(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return Result.success(user);
    }

    /**
     * 5. 返回字符串（不经过视图解析器）
     */
    @GetMapping("/hello")
    @ResponseBody
    public String hello() {
        return "Hello, World!";  // 直接返回字符串，不解析为视图名称
    }

    /**
     * 6. 没有 @ResponseBody 的对比（返回视图名称）
     */
    @GetMapping("/page")
    public String getUserPage() {
        return "user/list";  // 返回视图名称，会被 ViewResolver 解析
    }
}

// 统一响应结果
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result<T> {
    private Integer code;
    private String message;
    private T data;

    public static <T> Result<T> success(T data) {
        return new Result<>(200, "success", data);
    }

    public static <T> Result<T> error(String message) {
        return new Result<>(500, message, null);
    }
}
```

**(3) @RestController - 组合注解**

```java
/**
 * @RestController = @Controller + @ResponseBody
 * 类级别的 @RestController 等于给所有方法加上 @ResponseBody
 */

// 方式 1: 传统方式（每个方法都要加 @ResponseBody）
@Controller
@RequestMapping("/api/users")
public class UserController1 {

    @GetMapping("/{id}")
    @ResponseBody  // 需要手动添加
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    @ResponseBody  // 需要手动添加
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
}

// 方式 2: @RestController（推荐，自动添加 @ResponseBody）
@RestController
@RequestMapping("/api/users")
public class UserController2 {

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
}
```

**(4) HttpMessageConverter - 消息转换器**

```java
/**
 * HttpMessageConverter: 负责 HTTP 消息的转换
 * @RequestBody 和 @ResponseBody 的底层实现
 */

// Spring 内置的常用消息转换器
/*
 * 1. MappingJackson2HttpMessageConverter
 *    - 处理 JSON 格式
 *    - 使用 Jackson 库
 *    - Content-Type: application/json
 *
 * 2. Jaxb2RootElementHttpMessageConverter
 *    - 处理 XML 格式
 *    - 使用 JAXB
 *    - Content-Type: application/xml
 *
 * 3. StringHttpMessageConverter
 *    - 处理字符串
 *    - Content-Type: text/plain
 *
 * 4. ByteArrayHttpMessageConverter
 *    - 处理字节数组
 *    - Content-Type: application/octet-stream
 *
 * 5. FormHttpMessageConverter
 *    - 处理表单数据
 *    - Content-Type: application/x-www-form-urlencoded
 */

// 自定义消息转换器
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * 配置消息转换器
     */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // 1. Jackson JSON 转换器
        MappingJackson2HttpMessageConverter jacksonConverter =
            new MappingJackson2HttpMessageConverter();

        // 配置 ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        // 忽略未知属性
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        // 日期格式
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        // null 值不序列化
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        jacksonConverter.setObjectMapper(objectMapper);
        converters.add(jacksonConverter);

        // 2. XML 转换器
        Jaxb2RootElementHttpMessageConverter xmlConverter =
            new Jaxb2RootElementHttpMessageConverter();
        converters.add(xmlConverter);

        // 3. 字符串转换器（解决中文乱码）
        StringHttpMessageConverter stringConverter =
            new StringHttpMessageConverter(StandardCharsets.UTF_8);
        converters.add(stringConverter);
    }

    /**
     * 扩展消息转换器（推荐，不会覆盖默认的）
     */
    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        // 在默认转换器列表中添加自定义转换器
        converters.add(0, new MyCustomHttpMessageConverter());
    }
}
```

**(5) 完整示例：RESTful API**

```java
/**
 * RESTful API 完整示例
 */
@RestController
@RequestMapping("/api/users")
public class UserRestController {

    @Autowired
    private UserService userService;

    /**
     * 获取所有用户
     * GET /api/users
     * 响应: [{"id":1,"username":"zhangsan",...}, ...]
     */
    @GetMapping
    public Result<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return Result.success(users);
    }

    /**
     * 根据 ID 获取用户
     * GET /api/users/123
     * 响应: {"id":123,"username":"zhangsan",...}
     */
    @GetMapping("/{id}")
    public Result<User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return Result.success(user);
    }

    /**
     * 创建用户
     * POST /api/users
     * 请求体: {"username":"zhangsan","email":"zhangsan@example.com","age":25}
     * 响应: {"id":124,"username":"zhangsan",...}
     */
    @PostMapping
    public Result<User> createUser(@Valid @RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return Result.success(savedUser);
    }

    /**
     * 更新用户
     * PUT /api/users/123
     * 请求体: {"username":"zhangsan_new","email":"new@example.com","age":26}
     * 响应: {"id":123,"username":"zhangsan_new",...}
     */
    @PutMapping("/{id}")
    public Result<User> updateUser(@PathVariable Long id,
                                   @Valid @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return Result.success(updatedUser);
    }

    /**
     * 部分更新用户
     * PATCH /api/users/123
     * 请求体: {"age":27}  // 只更新 age
     */
    @PatchMapping("/{id}")
    public Result<User> patchUser(@PathVariable Long id,
                                  @RequestBody Map<String, Object> updates) {
        User user = userService.patchUser(id, updates);
        return Result.success(user);
    }

    /**
     * 删除用户
     * DELETE /api/users/123
     * 响应: {"code":200,"message":"success","data":null}
     */
    @DeleteMapping("/{id}")
    public Result<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return Result.success();
    }

    /**
     * 批量创建
     * POST /api/users/batch
     * 请求体: [{"username":"user1",...}, {"username":"user2",...}]
     */
    @PostMapping("/batch")
    public Result<List<User>> batchCreate(@RequestBody List<User> users) {
        List<User> savedUsers = userService.batchSave(users);
        return Result.success(savedUsers);
    }

    /**
     * 搜索用户
     * POST /api/users/search
     * 请求体: {"keyword":"zhang","minAge":20,"maxAge":30}
     */
    @PostMapping("/search")
    public Result<List<User>> searchUsers(@RequestBody SearchRequest request) {
        List<User> users = userService.search(request);
        return Result.success(users);
    }
}

@Data
public class SearchRequest {
    private String keyword;
    private Integer minAge;
    private Integer maxAge;
    private String city;
}
```

**(6) 内容协商**

```java
/**
 * 内容协商：根据客户端 Accept 请求头返回不同格式
 */
@RestController
@RequestMapping("/api/users")
public class ContentNegotiationController {

    /**
     * 根据 Accept 请求头返回 JSON 或 XML
     *
     * 请求 1:
     * GET /api/users/123
     * Accept: application/json
     * 响应: JSON 格式
     *
     * 请求 2:
     * GET /api/users/123
     * Accept: application/xml
     * 响应: XML 格式
     */
    @GetMapping(
        value = "/{id}",
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    /**
     * 强制返回 JSON
     */
    @GetMapping(value = "/{id}/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUserJson(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    /**
     * 强制返回 XML
     */
    @GetMapping(value = "/{id}/xml", produces = MediaType.APPLICATION_XML_VALUE)
    public User getUserXml(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}

// XML 格式需要在实体类上添加 JAXB 注解
@Data
@XmlRootElement(name = "user")
public class User {
    @XmlElement
    private Long id;

    @XmlElement
    private String username;

    @XmlElement
    private String email;

    @XmlElement
    private Integer age;
}
```

**关键要点**

1. **@RequestBody**
   - 作用: 将 HTTP 请求体转换为 Java 对象
   - 数据流向: 请求 → 对象（反序列化）
   - 使用场景: 接收 JSON/XML 数据（POST/PUT 请求）
   - 默认必需（required=true）

2. **@ResponseBody**
   - 作用: 将 Java 对象转换为 HTTP 响应体
   - 数据流向: 对象 → 响应（序列化）
   - 使用场景: 返回 JSON/XML 数据（RESTful API）
   - 跳过视图解析器

3. **@RestController**
   - 组合注解: @Controller + @ResponseBody
   - 类级别注解，所有方法自动添加 @ResponseBody
   - RESTful API 开发推荐使用

4. **HttpMessageConverter**
   - 负责消息转换的核心组件
   - 常用: MappingJackson2HttpMessageConverter（JSON）
   - 可自定义配置 ObjectMapper

5. **内容协商**
   - 根据 Accept 请求头返回不同格式
   - produces 属性指定响应格式
   - consumes 属性指定接收格式

**记忆口诀**

**"RequestBody 收请求,ResponseBody 返响应;JSON 转换全自动,RESTful API 必备功;RestController 组合用,前后端分离好轻松"**

- **RequestBody 收请求**: @RequestBody 接收请求体数据
- **ResponseBody 返响应**: @ResponseBody 返回响应体数据
- **JSON 转换全自动**: 自动 JSON 序列化/反序列化
- **RESTful API 必备功**: RESTful API 开发必备
- **RestController 组合用**: @RestController 组合注解
- **前后端分离好轻松**: 实现前后端分离架构


### 35. 如何处理异常？什么是 @ExceptionHandler？

**核心答案**

Spring MVC 提供了多种**统一异常处理**机制,其中 **@ExceptionHandler** 是最常用的注解,用于定义**异常处理方法**。

**异常处理方式:**

| 方式 | 级别 | 注解 | 作用范围 | 优先级 |
|-----|------|-----|---------|-------|
| **@ExceptionHandler** | 方法级别 | `@ExceptionHandler` | 当前 Controller | 高 |
| **@ControllerAdvice** | 全局 | `@ControllerAdvice` + `@ExceptionHandler` | 所有 Controller | 中 |
| **HandlerExceptionResolver** | 全局 | 实现接口 | 所有 Controller | 低 |
| **@ResponseStatus** | 类/方法级别 | `@ResponseStatus` | 特定异常 | 中 |

**异常处理流程:**

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring MVC 异常处理流程</text>
<rect x="350" y="70" width="200" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Controller 方法</text>
<text x="450" y="115" font-size="11" text-anchor="middle" fill="#fff">执行业务逻辑</text>
<line x1="450" y1="130" x2="450" y2="170" stroke="#f44336" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="155" font-size="11" fill="#f44336">抛出异常</text>
<rect x="350" y="170" width="200" height="60" fill="#ff5722" stroke="#d84315" stroke-width="2" rx="5"/>
<text x="450" y="195" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">捕获异常</text>
<text x="450" y="215" font-size="11" text-anchor="middle" fill="#fff">DispatcherServlet</text>
<line x1="550" y1="200" x2="620" y2="200" stroke="#666" stroke-width="2"/>
<line x1="620" y1="200" x2="620" y2="280" stroke="#666" stroke-width="2"/>
<line x1="620" y1="280" x2="560" y2="280" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="360" y="250" width="200" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="460" y="275" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">@ExceptionHandler</text>
<text x="460" y="295" font-size="11" text-anchor="middle" fill="#fff">（当前 Controller）</text>
<text x="650" y="280" font-size="11" fill="#666">1. 优先查找</text>
<line x1="360" y1="280" x2="280" y2="280" stroke="#666" stroke-width="2"/>
<line x1="280" y1="280" x2="280" y2="360" stroke="#666" stroke-width="2"/>
<line x1="280" y1="360" x2="350" y2="360" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="350" y="330" width="200" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="450" y="355" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">@ControllerAdvice</text>
<text x="450" y="375" font-size="11" text-anchor="middle" fill="#fff">（全局异常处理）</text>
<text x="180" y="360" font-size="11" fill="#666">2. 未找到</text>
<line x1="450" y1="390" x2="450" y2="430" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="415" font-size="11" fill="#666">3. 仍未找到</text>
<rect x="300" y="430" width="300" height="60" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="450" y="455" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">HandlerExceptionResolver</text>
<text x="450" y="475" font-size="11" text-anchor="middle" fill="#fff">（默认异常处理器）</text>
<line x1="450" y1="490" x2="450" y2="520" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="350" y="520" width="200" height="20" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="3"/>
<text x="450" y="535" font-size="12" text-anchor="middle" fill="#fff">返回错误响应</text>
</svg>

**详细说明**

**(1) @ExceptionHandler - 方法级别异常处理**

```java
/**
 * @ExceptionHandler: 在 Controller 中处理异常
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 业务方法（可能抛出异常）
     */
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        // 可能抛出 ResourceNotFoundException
        return userService.getUserById(id);
    }

    /**
     * 1. 处理特定异常
     * 只在当前 Controller 中生效
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public Result<Void> handleResourceNotFound(ResourceNotFoundException ex) {
        return Result.error(404, ex.getMessage());
    }

    /**
     * 2. 处理多个异常
     */
    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class})
    public Result<Void> handleIllegalException(Exception ex) {
        return Result.error(400, "参数错误: " + ex.getMessage());
    }

    /**
     * 3. 处理所有异常（兜底）
     */
    @ExceptionHandler(Exception.class)
    public Result<Void> handleException(Exception ex) {
        ex.printStackTrace();
        return Result.error(500, "系统异常: " + ex.getMessage());
    }

    /**
     * 4. 获取更多信息
     */
    @ExceptionHandler(BusinessException.class)
    public Result<Void> handleBusinessException(
            BusinessException ex,
            HttpServletRequest request,
            HttpServletResponse response) {

        // 获取请求信息
        String requestUrl = request.getRequestURL().toString();
        String method = request.getMethod();

        // 记录日志
        log.error("业务异常: URL={}, Method={}, Message={}",
                requestUrl, method, ex.getMessage());

        // 设置响应状态码
        response.setStatus(HttpStatus.BAD_REQUEST.value());

        return Result.error(ex.getErrorCode(), ex.getMessage());
    }
}

// 自定义异常
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

public class BusinessException extends RuntimeException {
    private int errorCode;

    public BusinessException(int errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }
}
```

**(2) @ControllerAdvice - 全局异常处理**

```java
/**
 * @ControllerAdvice: 全局异常处理器
 * 对所有 Controller 生效
 */
@RestControllerAdvice  // = @ControllerAdvice + @ResponseBody
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 1. 处理资源未找到异常
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result<Void> handleResourceNotFound(ResourceNotFoundException ex) {
        log.error("资源未找到: {}", ex.getMessage());
        return Result.error(404, ex.getMessage());
    }

    /**
     * 2. 处理参数校验异常（@Valid）
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Map<String, String>> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        // 获取所有校验错误
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        log.error("参数校验失败: {}", errors);

        return Result.error(400, "参数校验失败", errors);
    }

    /**
     * 3. 处理参数绑定异常
     */
    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleBindException(BindException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining("; "));

        log.error("参数绑定失败: {}", message);

        return Result.error(400, "参数绑定失败: " + message);
    }

    /**
     * 4. 处理类型转换异常
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String message = String.format("参数 '%s' 的值 '%s' 类型错误，应该是 %s",
                ex.getName(), ex.getValue(), ex.getRequiredType().getSimpleName());

        log.error("类型转换失败: {}", message);

        return Result.error(400, message);
    }

    /**
     * 5. 处理 HTTP 请求方法不支持
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public Result<Void> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
        String message = String.format("不支持 %s 方法，支持的方法: %s",
                ex.getMethod(), Arrays.toString(ex.getSupportedMethods()));

        log.error("HTTP 方法不支持: {}", message);

        return Result.error(405, message);
    }

    /**
     * 6. 处理缺少请求参数
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleMissingParams(MissingServletRequestParameterException ex) {
        String message = String.format("缺少请求参数: %s (%s)",
                ex.getParameterName(), ex.getParameterType());

        log.error("缺少请求参数: {}", message);

        return Result.error(400, message);
    }

    /**
     * 7. 处理数据库异常
     */
    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Result<Void> handleDataAccessException(DataAccessException ex) {
        log.error("数据库异常", ex);

        // 根据不同的数据库异常类型返回不同的消息
        if (ex instanceof DuplicateKeyException) {
            return Result.error(500, "数据已存在");
        } else if (ex instanceof DataIntegrityViolationException) {
            return Result.error(500, "数据完整性约束违反");
        }

        return Result.error(500, "数据库操作失败");
    }

    /**
     * 8. 处理业务异常
     */
    @ExceptionHandler(BusinessException.class)
    public Result<Void> handleBusinessException(BusinessException ex) {
        log.warn("业务异常: code={}, message={}", ex.getErrorCode(), ex.getMessage());
        return Result.error(ex.getErrorCode(), ex.getMessage());
    }

    /**
     * 9. 处理所有未捕获的异常（兜底）
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Result<Void> handleException(Exception ex, HttpServletRequest request) {
        String requestUrl = request.getRequestURL().toString();
        String method = request.getMethod();

        log.error("未处理的异常: URL={}, Method={}", requestUrl, method, ex);

        // 生产环境不返回详细错误信息
        return Result.error(500, "系统繁忙，请稍后再试");
    }

    /**
     * 10. 限定作用范围（只对特定包或注解生效）
     */
    @RestControllerAdvice(basePackages = "com.example.admin")
    public class AdminExceptionHandler {
        // 只对 admin 包下的 Controller 生效
    }

    @RestControllerAdvice(annotations = RestController.class)
    public class RestExceptionHandler {
        // 只对标注了 @RestController 的类生效
    }

    @RestControllerAdvice(assignableTypes = {UserController.class, OrderController.class})
    public class SpecificExceptionHandler {
        // 只对指定的 Controller 生效
    }
}

// 统一响应结果（支持泛型）
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result<T> {
    private Integer code;
    private String message;
    private T data;

    public static <T> Result<T> success(T data) {
        return new Result<>(200, "success", data);
    }

    public static <T> Result<T> error(int code, String message) {
        return new Result<>(code, message, null);
    }

    public static <T> Result<T> error(int code, String message, T data) {
        return new Result<>(code, message, data);
    }
}
```

**(3) @ResponseStatus - 异常状态码**

```java
/**
 * @ResponseStatus: 指定异常的 HTTP 状态码
 */

// 方式 1: 标注在异常类上
@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "资源未找到")
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "参数错误")
public class InvalidParameterException extends RuntimeException {
    public InvalidParameterException(String message) {
        super(message);
    }
}

@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "权限不足")
public class PermissionDeniedException extends RuntimeException {
    public PermissionDeniedException(String message) {
        super(message);
    }
}

// 方式 2: 标注在 Controller 方法上
@Controller
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)  // 成功时返回 200
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)  // 创建成功返回 201
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)  // 删除成功返回 204
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}

// 方式 3: 标注在 @ExceptionHandler 方法上
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)  // 返回 404
    public Result<Void> handleNotFound(ResourceNotFoundException ex) {
        return Result.error(404, ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)  // 返回 400
    public Result<Void> handleBadRequest(IllegalArgumentException ex) {
        return Result.error(400, ex.getMessage());
    }
}
```

**(4) HandlerExceptionResolver - 自定义异常解析器**

```java
/**
 * HandlerExceptionResolver: 自定义异常解析器
 */
@Component
public class CustomExceptionResolver implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler,
            Exception ex) {

        ModelAndView mav = new ModelAndView();

        // 判断异常类型
        if (ex instanceof ResourceNotFoundException) {
            mav.setViewName("error/404");
            response.setStatus(HttpStatus.NOT_FOUND.value());
        } else if (ex instanceof BusinessException) {
            mav.setViewName("error/business");
            mav.addObject("errorMessage", ex.getMessage());
            response.setStatus(HttpStatus.BAD_REQUEST.value());
        } else {
            mav.setViewName("error/500");
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        }

        // 添加错误信息
        mav.addObject("exception", ex);
        mav.addObject("url", request.getRequestURL());

        return mav;
    }
}

// 配置自定义异常解析器
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureHandlerExceptionResolvers(
            List<HandlerExceptionResolver> resolvers) {
        resolvers.add(new CustomExceptionResolver());
    }

    // 或者扩展默认的异常解析器
    @Override
    public void extendHandlerExceptionResolvers(
            List<HandlerExceptionResolver> resolvers) {
        resolvers.add(0, new CustomExceptionResolver());
    }
}
```

**(5) 完整示例：异常处理体系**

```java
/**
 * 完整的异常处理体系
 */

// 1. 定义异常基类
public abstract class BaseException extends RuntimeException {
    private final int errorCode;

    public BaseException(int errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }
}

// 2. 定义具体异常
public class ResourceNotFoundException extends BaseException {
    public ResourceNotFoundException(String message) {
        super(404, message);
    }
}

public class BusinessException extends BaseException {
    public BusinessException(String message) {
        super(400, message);
    }

    public BusinessException(int errorCode, String message) {
        super(errorCode, message);
    }
}

public class UnauthorizedException extends BaseException {
    public UnauthorizedException(String message) {
        super(401, message);
    }
}

public class ForbiddenException extends BaseException {
    public ForbiddenException(String message) {
        super(403, message);
    }
}

// 3. Service 层抛出异常
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("用户不存在: " + id));
    }

    public User saveUser(User user) {
        // 检查用户名是否已存在
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new BusinessException("用户名已存在: " + user.getUsername());
        }

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("用户不存在: " + id);
        }

        // 检查是否有权限删除
        User currentUser = SecurityContextHolder.getCurrentUser();
        if (!currentUser.hasPermission("USER_DELETE")) {
            throw new ForbiddenException("无权限删除用户");
        }

        userRepository.deleteById(id);
    }
}

// 4. Controller 层调用
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public Result<User> getUser(@PathVariable Long id) {
        // 如果找不到，Service 会抛出 ResourceNotFoundException
        // 由全局异常处理器捕获
        User user = userService.getUserById(id);
        return Result.success(user);
    }

    @PostMapping
    public Result<User> createUser(@Valid @RequestBody User user) {
        // 如果用户名已存在，Service 会抛出 BusinessException
        User savedUser = userService.saveUser(user);
        return Result.success(savedUser);
    }

    @DeleteMapping("/{id}")
    public Result<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return Result.success();
    }
}

// 5. 全局异常处理器
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public Result<Void> handleBaseException(BaseException ex) {
        log.error("业务异常: code={}, message={}", ex.getErrorCode(), ex.getMessage());
        return Result.error(ex.getErrorCode(), ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));
        return Result.error(400, "参数校验失败", errors);
    }

    @ExceptionHandler(Exception.class)
    public Result<Void> handleException(Exception ex) {
        log.error("系统异常", ex);
        return Result.error(500, "系统繁忙，请稍后再试");
    }
}
```

**关键要点**

1. **@ExceptionHandler**
   - 方法级别异常处理
   - 只在当前 Controller 生效
   - 可处理多个异常类型
   - 优先级最高

2. **@ControllerAdvice**
   - 全局异常处理器
   - 对所有 Controller 生效
   - 配合 @ExceptionHandler 使用
   - 可限定作用范围

3. **@ResponseStatus**
   - 指定异常的 HTTP 状态码
   - 可标注在异常类或方法上
   - 简化状态码设置

4. **异常处理优先级**
   - @ExceptionHandler（当前 Controller）> @ControllerAdvice > HandlerExceptionResolver

5. **最佳实践**
   - 定义统一的异常体系
   - 使用 @RestControllerAdvice 全局处理
   - 记录详细的异常日志
   - 返回统一的响应格式
   - 生产环境不返回敏感信息

**记忆口诀**

**"ExceptionHandler 捕异常,ControllerAdvice 全局管;ResponseStatus 定状态,统一处理保安全;优先级别要记清,日志记录不能忘"**

- **ExceptionHandler 捕异常**: @ExceptionHandler 捕获异常
- **ControllerAdvice 全局管**: @ControllerAdvice 全局管理
- **ResponseStatus 定状态**: @ResponseStatus 定义状态码
- **统一处理保安全**: 统一处理保证系统安全
- **优先级别要记清**: 记住异常处理优先级
- **日志记录不能忘**: 记录详细日志便于排查

### 36. 如何实现文件上传？

**核心答案**

Spring MVC 提供了完整的**文件上传**支持,通过 **MultipartResolver** 接口解析 multipart 请求,使用 **MultipartFile** 接收上传的文件。

**文件上传核心组件:**

| 组件 | 作用 | 配置方式 | 常用实现 |
|-----|------|---------|----------|
| **MultipartResolver** | 解析 multipart 请求 | Bean 配置 | CommonsMultipartResolver、StandardServletMultipartResolver |
| **MultipartFile** | 表示上传的文件 | 方法参数 | StandardMultipartHttpServletRequest.StandardMultipartFile |
| **@RequestParam** | 绑定文件参数 | 方法参数注解 | - |

**文件上传流程:**

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring MVC 文件上传流程</text>
<rect x="350" y="70" width="200" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">客户端</text>
<text x="450" y="115" font-size="11" text-anchor="middle" fill="#fff">multipart/form-data</text>
<line x1="450" y1="130" x2="450" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="155" font-size="11" fill="#666">1. 发送请求</text>
<rect x="350" y="170" width="200" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="450" y="195" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">DispatcherServlet</text>
<text x="450" y="215" font-size="11" text-anchor="middle" fill="#fff">checkMultipart()</text>
<line x1="450" y1="230" x2="450" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="255" font-size="11" fill="#666">2. 检查请求</text>
<rect x="350" y="270" width="200" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="450" y="295" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">MultipartResolver</text>
<text x="450" y="315" font-size="11" text-anchor="middle" fill="#fff">解析文件</text>
<line x1="450" y1="330" x2="450" y2="370" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="355" font-size="11" fill="#666">3. 封装为 MultipartFile</text>
<rect x="350" y="370" width="200" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="395" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Controller</text>
<text x="450" y="415" font-size="11" text-anchor="middle" fill="#fff">处理文件</text>
<line x1="550" y1="400" x2="700" y2="400" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="625" y="395" font-size="11" fill="#666">4. 保存</text>
<rect x="700" y="370" width="140" height="60" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="770" y="395" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">文件系统</text>
<text x="770" y="415" font-size="11" text-anchor="middle" fill="#fff">保存文件</text>
<line x1="700" y1="400" x2="560" y2="400" stroke="#666" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead)"/>
<text x="630" y="420" font-size="11" fill="#666">5. 返回结果</text>
<text x="450" y="480" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">完整流程：请求 → 解析 → 封装 → 处理 → 保存</text>
</svg>

**详细说明**

**(1) MultipartResolver 配置**

```java
/**
 * MultipartResolver: 文件上传解析器
 */

// 方式 1: CommonsMultipartResolver（需要 commons-fileupload 依赖）
@Configuration
public class FileUploadConfig {

    /**
     * 配置 CommonsMultipartResolver
     */
    @Bean
    public MultipartResolver multipartResolver() {
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();

        // 设置默认编码
        resolver.setDefaultEncoding("UTF-8");

        // 设置最大上传大小（字节）: 10MB
        resolver.setMaxUploadSize(10 * 1024 * 1024);

        // 设置单个文件最大大小: 5MB
        resolver.setMaxUploadSizePerFile(5 * 1024 * 1024);

        // 设置内存临界值（超过此值写入磁盘）: 4KB
        resolver.setMaxInMemorySize(4096);

        return resolver;
    }
}

// 方式 2: StandardServletMultipartResolver（Spring Boot 默认，基于 Servlet 3.0）
@Configuration
public class FileUploadConfig {

    /**
     * 配置 StandardServletMultipartResolver
     */
    @Bean
    public MultipartResolver multipartResolver() {
        StandardServletMultipartResolver resolver = new StandardServletMultipartResolver();
        return resolver;
    }

    /**
     * 配置 Servlet 的 MultipartConfigElement
     */
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();

        // 单个文件最大大小
        factory.setMaxFileSize(DataSize.ofMegabytes(5));

        // 请求最大大小
        factory.setMaxRequestSize(DataSize.ofMegabytes(10));

        // 临时目录
        factory.setLocation("/tmp");

        return factory.createMultipartConfig();
    }
}

// 方式 3: Spring Boot 配置文件（最简单）
// application.yml
spring:
  servlet:
    multipart:
      enabled: true                      # 启用文件上传
      max-file-size: 5MB                # 单个文件最大大小
      max-request-size: 10MB            # 请求最大大小
      file-size-threshold: 0            # 文件大小阈值（0 表示直接写入磁盘）
      location: /tmp                    # 临时目录

// application.properties
spring.servlet.multipart.enabled=true
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=10MB
```

**(2) 单文件上传**

```java
/**
 * 单文件上传
 */
@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    /**
     * 1. 基本上传（使用 @RequestParam）
     * 请求: POST /api/files/upload
     * Content-Type: multipart/form-data
     * 参数: file（文件）
     */
    @PostMapping("/upload")
    public Result<String> uploadFile(@RequestParam("file") MultipartFile file) {

        // 检查文件是否为空
        if (file.isEmpty()) {
            return Result.error("文件为空");
        }

        try {
            // 获取文件信息
            String originalFilename = file.getOriginalFilename();  // 原始文件名
            String contentType = file.getContentType();           // 文件类型
            long size = file.getSize();                          // 文件大小（字节）

            // 生成保存的文件名（避免重名）
            String fileName = UUID.randomUUID().toString() + "_" + originalFilename;

            // 指定保存路径
            String uploadDir = "/var/uploads/";
            Path filePath = Paths.get(uploadDir + fileName);

            // 保存文件
            file.transferTo(filePath);

            // 返回文件访问 URL
            String fileUrl = "/uploads/" + fileName;
            return Result.success(fileUrl);

        } catch (IOException e) {
            e.printStackTrace();
            return Result.error("文件上传失败: " + e.getMessage());
        }
    }

    /**
     * 2. 带参数的文件上传
     * 请求: POST /api/files/upload-with-params
     * 参数: file（文件）, description（描述）, category（分类）
     */
    @PostMapping("/upload-with-params")
    public Result<FileInfo> uploadWithParams(
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String category) {

        if (file.isEmpty()) {
            return Result.error("文件为空");
        }

        try {
            // 保存文件
            String fileName = saveFile(file);

            // 保存文件信息到数据库
            FileInfo fileInfo = new FileInfo();
            fileInfo.setFileName(fileName);
            fileInfo.setOriginalName(file.getOriginalFilename());
            fileInfo.setFileSize(file.getSize());
            fileInfo.setContentType(file.getContentType());
            fileInfo.setDescription(description);
            fileInfo.setCategory(category);
            fileInfo.setUploadTime(LocalDateTime.now());

            fileInfoService.save(fileInfo);

            return Result.success(fileInfo);

        } catch (IOException e) {
            e.printStackTrace();
            return Result.error("文件上传失败: " + e.getMessage());
        }
    }

    /**
     * 3. 使用 MultipartHttpServletRequest 接收
     */
    @PostMapping("/upload-request")
    public Result<String> uploadWithRequest(MultipartHttpServletRequest request) {

        // 获取所有文件
        MultipartFile file = request.getFile("file");

        if (file == null || file.isEmpty()) {
            return Result.error("文件为空");
        }

        // 获取其他参数
        String description = request.getParameter("description");

        try {
            String fileName = saveFile(file);
            return Result.success(fileName);
        } catch (IOException e) {
            return Result.error("文件上传失败");
        }
    }

    /**
     * 4. 文件保存工具方法
     */
    private String saveFile(MultipartFile file) throws IOException {
        // 生成唯一文件名
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String fileName = UUID.randomUUID().toString() + extension;

        // 创建上传目录（如果不存在）
        String uploadDir = "/var/uploads/";
        Path directory = Paths.get(uploadDir);
        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }

        // 保存文件
        Path filePath = Paths.get(uploadDir + fileName);
        file.transferTo(filePath);

        return fileName;
    }
}

// 文件信息实体类
@Data
@Entity
@Table(name = "file_info")
public class FileInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;           // 保存的文件名
    private String originalName;       // 原始文件名
    private Long fileSize;             // 文件大小（字节）
    private String contentType;        // 文件类型
    private String description;        // 文件描述
    private String category;           // 文件分类
    private LocalDateTime uploadTime;  // 上传时间
    private String uploadPath;         // 保存路径
}
```

**(3) 多文件上传**

```java
/**
 * 多文件上传
 */
@RestController
@RequestMapping("/api/files")
public class MultiFileUploadController {

    /**
     * 1. 上传多个文件（同一个参数名）
     * 请求: POST /api/files/batch
     * 参数: files（多个文件）
     */
    @PostMapping("/batch")
    public Result<List<String>> uploadMultipleFiles(
            @RequestParam("files") List<MultipartFile> files) {

        if (files == null || files.isEmpty()) {
            return Result.error("请选择文件");
        }

        List<String> fileUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }

            try {
                String fileName = saveFile(file);
                String fileUrl = "/uploads/" + fileName;
                fileUrls.add(fileUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return Result.success(fileUrls);
    }

    /**
     * 2. 上传多个文件（不同参数名）
     * 请求: POST /api/files/multiple
     * 参数: avatar（头像）, background（背景图）
     */
    @PostMapping("/multiple")
    public Result<Map<String, String>> uploadMultipleDifferent(
            @RequestParam("avatar") MultipartFile avatar,
            @RequestParam("background") MultipartFile background) {

        Map<String, String> result = new HashMap<>();

        try {
            if (!avatar.isEmpty()) {
                String avatarUrl = saveFile(avatar);
                result.put("avatar", avatarUrl);
            }

            if (!background.isEmpty()) {
                String bgUrl = saveFile(background);
                result.put("background", bgUrl);
            }

            return Result.success(result);

        } catch (IOException e) {
            return Result.error("文件上传失败");
        }
    }

    /**
     * 3. 批量上传（带进度跟踪）
     */
    @PostMapping("/batch-with-progress")
    public Result<List<FileUploadResult>> uploadWithProgress(
            @RequestParam("files") List<MultipartFile> files) {

        List<FileUploadResult> results = new ArrayList<>();

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            FileUploadResult result = new FileUploadResult();
            result.setFileName(file.getOriginalFilename());

            try {
                if (file.isEmpty()) {
                    result.setSuccess(false);
                    result.setMessage("文件为空");
                } else {
                    String savedName = saveFile(file);
                    result.setSuccess(true);
                    result.setUrl("/uploads/" + savedName);
                    result.setSize(file.getSize());
                }
            } catch (IOException e) {
                result.setSuccess(false);
                result.setMessage("上传失败: " + e.getMessage());
            }

            results.add(result);
        }

        return Result.success(results);
    }
}

@Data
class FileUploadResult {
    private String fileName;    // 原始文件名
    private Boolean success;    // 是否成功
    private String message;     // 错误消息
    private String url;         // 文件 URL
    private Long size;          // 文件大小
}
```

**(4) 文件验证**

```java
/**
 * 文件上传验证
 */
@RestController
@RequestMapping("/api/files")
public class FileValidationController {

    // 允许的文件类型
    private static final List<String> ALLOWED_TYPES = Arrays.asList(
        "image/jpeg", "image/png", "image/gif"
    );

    // 允许的文件扩展名
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(
        ".jpg", ".jpeg", ".png", ".gif"
    );

    // 最大文件大小: 5MB
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    /**
     * 1. 带验证的文件上传
     */
    @PostMapping("/upload-validated")
    public Result<String> uploadValidated(@RequestParam("file") MultipartFile file) {

        // 验证文件
        String validationError = validateFile(file);
        if (validationError != null) {
            return Result.error(validationError);
        }

        try {
            String fileName = saveFile(file);
            return Result.success("/uploads/" + fileName);
        } catch (IOException e) {
            return Result.error("文件上传失败");
        }
    }

    /**
     * 2. 文件验证方法
     */
    private String validateFile(MultipartFile file) {
        // 检查文件是否为空
        if (file.isEmpty()) {
            return "文件为空";
        }

        // 检查文件大小
        if (file.getSize() > MAX_FILE_SIZE) {
            return "文件大小超过限制（最大 5MB）";
        }

        // 检查文件类型
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
            return "不支持的文件类型，只允许上传图片";
        }

        // 检查文件扩展名
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            return "无效的文件名";
        }

        String extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            return "不支持的文件扩展名";
        }

        // 检查文件名是否包含非法字符
        if (originalFilename.contains("..") || originalFilename.contains("/")) {
            return "文件名包含非法字符";
        }

        return null;  // 验证通过
    }

    /**
     * 3. 使用自定义注解验证
     */
    @PostMapping("/upload-annotation")
    public Result<String> uploadWithAnnotation(
            @ValidFile(
                maxSize = 5 * 1024 * 1024,
                allowedTypes = {"image/jpeg", "image/png"},
                allowedExtensions = {".jpg", ".png"}
            )
            @RequestParam("file") MultipartFile file) {

        try {
            String fileName = saveFile(file);
            return Result.success("/uploads/" + fileName);
        } catch (IOException e) {
            return Result.error("文件上传失败");
        }
    }
}

// 自定义文件验证注解
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FileValidator.class)
public @interface ValidFile {
    String message() default "文件验证失败";

    long maxSize() default 5 * 1024 * 1024;  // 默认 5MB

    String[] allowedTypes() default {};

    String[] allowedExtensions() default {};

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

// 文件验证器
public class FileValidator implements ConstraintValidator<ValidFile, MultipartFile> {

    private long maxSize;
    private List<String> allowedTypes;
    private List<String> allowedExtensions;

    @Override
    public void initialize(ValidFile annotation) {
        this.maxSize = annotation.maxSize();
        this.allowedTypes = Arrays.asList(annotation.allowedTypes());
        this.allowedExtensions = Arrays.asList(annotation.allowedExtensions());
    }

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file == null || file.isEmpty()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("文件为空")
                   .addConstraintViolation();
            return false;
        }

        // 验证文件大小
        if (file.getSize() > maxSize) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("文件大小超过限制")
                   .addConstraintViolation();
            return false;
        }

        // 验证文件类型
        if (!allowedTypes.isEmpty() && !allowedTypes.contains(file.getContentType())) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("不支持的文件类型")
                   .addConstraintViolation();
            return false;
        }

        // 验证文件扩展名
        String filename = file.getOriginalFilename();
        if (filename != null && !allowedExtensions.isEmpty()) {
            String extension = filename.substring(filename.lastIndexOf("."));
            if (!allowedExtensions.contains(extension)) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("不支持的文件扩展名")
                       .addConstraintViolation();
                return false;
            }
        }

        return true;
    }
}
```

**(5) 文件下载**

```java
/**
 * 文件下载
 */
@RestController
@RequestMapping("/api/files")
public class FileDownloadController {

    /**
     * 1. 基本下载
     */
    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {

        try {
            // 构建文件路径
            Path filePath = Paths.get("/var/uploads/" + fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                throw new FileNotFoundException("文件不存在: " + fileName);
            }

            // 设置响应头
            return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                       "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * 2. 下载（使用 HttpServletResponse）
     */
    @GetMapping("/download2/{fileName}")
    public void downloadFile2(@PathVariable String fileName,
                             HttpServletResponse response) throws IOException {

        // 构建文件路径
        Path filePath = Paths.get("/var/uploads/" + fileName);

        if (!Files.exists(filePath)) {
            response.sendError(HttpStatus.NOT_FOUND.value(), "文件不存在");
            return;
        }

        // 设置响应头
        response.setContentType("application/octet-stream");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
                          "attachment; filename=\"" + fileName + "\"");

        // 读取文件并写入响应
        try (InputStream inputStream = Files.newInputStream(filePath);
             OutputStream outputStream = response.getOutputStream()) {

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }

            outputStream.flush();
        }
    }

    /**
     * 3. 在线预览（图片、PDF 等）
     */
    @GetMapping("/preview/{fileName}")
    public ResponseEntity<Resource> previewFile(@PathVariable String fileName) {

        try {
            Path filePath = Paths.get("/var/uploads/" + fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // 根据文件类型设置 Content-Type
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            // 设置为 inline（在线预览）
            return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                       "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);

        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
```

**(6) 完整示例：文件上传服务**

```java
/**
 * 完整的文件上传服务
 */
@Service
public class FileService {

    @Value("${file.upload.dir:/var/uploads/}")
    private String uploadDir;

    @Value("${file.max-size:5242880}")  // 默认 5MB
    private long maxFileSize;

    /**
     * 保存文件
     */
    public FileInfo saveFile(MultipartFile file, String category) throws IOException {
        // 验证文件
        validateFile(file);

        // 创建上传目录
        createUploadDirectory();

        // 生成文件名
        String savedFileName = generateFileName(file.getOriginalFilename());

        // 保存文件
        Path targetPath = Paths.get(uploadDir, savedFileName);
        file.transferTo(targetPath);

        // 保存文件信息到数据库
        FileInfo fileInfo = new FileInfo();
        fileInfo.setFileName(savedFileName);
        fileInfo.setOriginalName(file.getOriginalFilename());
        fileInfo.setFileSize(file.getSize());
        fileInfo.setContentType(file.getContentType());
        fileInfo.setCategory(category);
        fileInfo.setUploadPath(uploadDir);
        fileInfo.setUploadTime(LocalDateTime.now());

        return fileInfo;
    }

    /**
     * 批量保存文件
     */
    public List<FileInfo> saveFiles(List<MultipartFile> files, String category) {
        return files.stream()
            .filter(file -> !file.isEmpty())
            .map(file -> {
                try {
                    return saveFile(file, category);
                } catch (IOException e) {
                    e.printStackTrace();
                    return null;
                }
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    }

    /**
     * 删除文件
     */
    public void deleteFile(String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir, fileName);
        Files.deleteIfExists(filePath);
    }

    /**
     * 获取文件
     */
    public Resource loadFile(String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir, fileName);
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            throw new FileNotFoundException("文件不存在: " + fileName);
        }

        return resource;
    }

    /**
     * 验证文件
     */
    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("文件为空");
        }

        if (file.getSize() > maxFileSize) {
            throw new IllegalArgumentException(
                "文件大小超过限制: " + maxFileSize + " 字节");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.contains("..")) {
            throw new IllegalArgumentException("无效的文件名");
        }
    }

    /**
     * 创建上传目录
     */
    private void createUploadDirectory() throws IOException {
        Path directory = Paths.get(uploadDir);
        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }
    }

    /**
     * 生成唯一文件名
     */
    private String generateFileName(String originalFilename) {
        String extension = "";
        int lastDotIndex = originalFilename.lastIndexOf(".");
        if (lastDotIndex > 0) {
            extension = originalFilename.substring(lastDotIndex);
        }

        return UUID.randomUUID().toString() + extension;
    }
}

// Controller 使用 Service
@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileService fileService;

    @Autowired
    private FileInfoRepository fileInfoRepository;

    /**
     * 上传文件
     */
    @PostMapping("/upload")
    public Result<FileInfo> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String category) {

        try {
            FileInfo fileInfo = fileService.saveFile(file, category);
            fileInfoRepository.save(fileInfo);
            return Result.success(fileInfo);
        } catch (IOException e) {
            return Result.error("文件上传失败: " + e.getMessage());
        }
    }

    /**
     * 批量上传
     */
    @PostMapping("/upload/batch")
    public Result<List<FileInfo>> uploadFiles(
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam(required = false) String category) {

        List<FileInfo> fileInfos = fileService.saveFiles(files, category);
        fileInfoRepository.saveAll(fileInfos);
        return Result.success(fileInfos);
    }

    /**
     * 下载文件
     */
    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Resource resource = fileService.loadFile(fileName);
            return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                       "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * 删除文件
     */
    @DeleteMapping("/{id}")
    public Result<Void> deleteFile(@PathVariable Long id) {
        FileInfo fileInfo = fileInfoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("文件不存在"));

        try {
            fileService.deleteFile(fileInfo.getFileName());
            fileInfoRepository.delete(fileInfo);
            return Result.success();
        } catch (IOException e) {
            return Result.error("文件删除失败");
        }
    }
}
```

**关键要点**

1. **MultipartResolver**
   - CommonsMultipartResolver: 基于 commons-fileupload
   - StandardServletMultipartResolver: 基于 Servlet 3.0（Spring Boot 默认）
   - 配置文件大小限制、编码等

2. **MultipartFile**
   - getOriginalFilename(): 获取原始文件名
   - getSize(): 获取文件大小
   - getContentType(): 获取文件类型
   - transferTo(): 保存文件
   - getInputStream(): 获取文件输入流

3. **文件上传配置**
   - max-file-size: 单个文件最大大小
   - max-request-size: 请求最大大小
   - file-size-threshold: 内存临界值
   - location: 临时目录

4. **文件验证**
   - 文件大小验证
   - 文件类型验证（MIME 类型）
   - 文件扩展名验证
   - 文件名安全性检查

5. **最佳实践**
   - 生成唯一文件名（UUID）
   - 创建上传目录
   - 验证文件类型和大小
   - 保存文件信息到数据库
   - 处理异常情况
   - 提供下载和预览功能

**记忆口诀**

**"MultipartResolver 解析文件,MultipartFile 接收存;配置限制防滥用,验证安全要谨慎;UUID 命名防重复,异常处理保稳定"**

- **MultipartResolver 解析文件**: MultipartResolver 解析 multipart 请求
- **MultipartFile 接收存**: MultipartFile 接收并保存文件
- **配置限制防滥用**: 配置文件大小限制防止滥用
- **验证安全要谨慎**: 验证文件类型和大小确保安全
- **UUID 命名防重复**: 使用 UUID 生成唯一文件名
- **异常处理保稳定**: 完善的异常处理保证系统稳定


### 37. 如何实现拦截器？拦截器和过滤器的区别是什么？

**核心答案**

**拦截器（Interceptor）**和**过滤器（Filter）**都是实现请求拦截的机制,但它们属于不同的层次:

| 对比项 | Filter（过滤器） | Interceptor（拦截器） |
|-------|-----------------|---------------------|
| **所属规范** | Servlet 规范 | Spring MVC 规范 |
| **依赖容器** | Servlet 容器 | Spring 容器 |
| **拦截范围** | 所有请求（包括静态资源） | 只拦截 Controller 请求 |
| **生命周期** | 随 Web 应用启动/销毁 | 随 Spring 容器启动/销毁 |
| **配置方式** | web.xml 或 @WebFilter | 实现 HandlerInterceptor |
| **拦截粒度** | URL 模式 | URL 模式 + 方法级别 |
| **访问 Spring Bean** | 需要手动获取 | 可直接注入 |
| **执行顺序** | Filter → Interceptor → Controller | preHandle → Controller → postHandle → afterCompletion |

**拦截器和过滤器的执行流程:**

<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Filter 和 Interceptor 执行流程对比</text>
<rect x="100" y="70" width="180" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="190" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">客户端请求</text>
<text x="190" y="115" font-size="11" text-anchor="middle" fill="#fff">HTTP Request</text>
<line x1="190" y1="130" x2="190" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="170" width="180" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="190" y="195" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Filter 1</text>
<text x="190" y="215" font-size="11" text-anchor="middle" fill="#fff">doFilter() 前置</text>
<line x1="190" y1="230" x2="190" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="270" width="180" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="190" y="295" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Filter 2</text>
<text x="190" y="315" font-size="11" text-anchor="middle" fill="#fff">doFilter() 前置</text>
<line x1="190" y1="330" x2="190" y2="370" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="370" width="180" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="190" y="395" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Interceptor 1</text>
<text x="190" y="415" font-size="11" text-anchor="middle" fill="#fff">preHandle()</text>
<line x1="190" y1="430" x2="190" y2="470" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="470" width="180" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="190" y="495" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Interceptor 2</text>
<text x="190" y="515" font-size="11" text-anchor="middle" fill="#fff">preHandle()</text>
<line x1="190" y1="530" x2="190" y2="570" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="570" width="180" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="190" y="595" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Controller</text>
<text x="190" y="615" font-size="11" text-anchor="middle" fill="#fff">处理业务逻辑</text>
<line x1="280" y1="600" x2="420" y2="600" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="350" y="595" font-size="11" fill="#666">返回</text>
<rect x="620" y="570" width="180" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="710" y="595" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Interceptor 2</text>
<text x="710" y="615" font-size="11" text-anchor="middle" fill="#fff">postHandle()</text>
<line x1="710" y1="570" x2="710" y2="530" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="620" y="470" width="180" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="710" y="495" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Interceptor 1</text>
<text x="710" y="515" font-size="11" text-anchor="middle" fill="#fff">postHandle()</text>
<line x1="710" y1="470" x2="710" y2="430" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="620" y="370" width="180" height="60" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="710" y="395" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">视图渲染</text>
<text x="710" y="415" font-size="11" text-anchor="middle" fill="#fff">View Render</text>
<line x1="710" y1="370" x2="710" y2="330" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="620" y="270" width="180" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="710" y="295" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Interceptor 2</text>
<text x="710" y="315" font-size="11" text-anchor="middle" fill="#fff">afterCompletion()</text>
<line x1="710" y1="270" x2="710" y2="230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="620" y="170" width="180" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="710" y="195" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Interceptor 1</text>
<text x="710" y="215" font-size="11" text-anchor="middle" fill="#fff">afterCompletion()</text>
<line x1="710" y1="170" x2="710" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="620" y="70" width="180" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="710" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Filter 2</text>
<text x="710" y="115" font-size="11" text-anchor="middle" fill="#fff">doFilter() 后置</text>
<line x1="620" y1="100" x2="290" y2="100" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="420" y="570" width="180" height="60" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="510" y="595" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">返回 ModelAndView</text>
<text x="510" y="615" font-size="11" text-anchor="middle" fill="#fff">或 @ResponseBody</text>
<line x1="600" y1="600" x2="610" y2="600" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="450" y="680" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">执行顺序：Filter → Interceptor.preHandle → Controller → Interceptor.postHandle → 渲染 → Interceptor.afterCompletion → Filter</text>
</svg>

**详细说明**

**(1) 拦截器的实现**

```java
/**
 * 拦截器接口: HandlerInterceptor
 */
public interface HandlerInterceptor {

    /**
     * 1. preHandle: 在 Controller 方法执行前调用
     * @return true: 继续执行后续拦截器和 Controller
     *         false: 中断请求，不再执行后续拦截器和 Controller
     */
    default boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {
        return true;
    }

    /**
     * 2. postHandle: 在 Controller 方法执行后、视图渲染前调用
     * 只有 preHandle 返回 true 时才会执行
     * 如果 Controller 抛出异常，不会执行此方法
     */
    default void postHandle(HttpServletRequest request,
                          HttpServletResponse response,
                          Object handler,
                          @Nullable ModelAndView modelAndView) throws Exception {
    }

    /**
     * 3. afterCompletion: 在视图渲染完成后调用（无论是否有异常）
     * 只有 preHandle 返回 true 时才会执行
     * 即使 Controller 或 postHandle 抛出异常，也会执行
     */
    default void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response,
                                Object handler,
                                @Nullable Exception ex) throws Exception {
    }
}

/**
 * 示例 1: 日志拦截器
 */
@Component
public class LoggingInterceptor implements HandlerInterceptor {

    private static final Logger log = LoggerFactory.getLogger(LoggingInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request,
                            HttpServletResponse response,
                            Object handler) {

        String requestURI = request.getRequestURI();
        String method = request.getMethod();

        log.info("===== 请求开始 =====");
        log.info("请求 URI: {}", requestURI);
        log.info("请求方法: {}", method);
        log.info("客户端 IP: {}", request.getRemoteAddr());

        // 记录请求开始时间
        request.setAttribute("startTime", System.currentTimeMillis());

        return true;  // 继续执行
    }

    @Override
    public void postHandle(HttpServletRequest request,
                          HttpServletResponse response,
                          Object handler,
                          ModelAndView modelAndView) {

        log.info("Controller 执行完成");
        if (modelAndView != null) {
            log.info("视图名称: {}", modelAndView.getViewName());
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                               HttpServletResponse response,
                               Object handler,
                               Exception ex) {

        long startTime = (Long) request.getAttribute("startTime");
        long endTime = System.currentTimeMillis();
        long executeTime = endTime - startTime;

        log.info("请求处理时间: {} ms", executeTime);
        log.info("响应状态码: {}", response.getStatus());

        if (ex != null) {
            log.error("请求处理异常: ", ex);
        }

        log.info("===== 请求结束 =====");
    }
}

/**
 * 示例 2: 登录认证拦截器
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request,
                            HttpServletResponse response,
                            Object handler) throws IOException {

        // 1. 从 Session 中获取用户信息
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            return true;  // 已登录，继续执行
        }

        // 2. 检查 Token（JWT）
        String token = request.getHeader("Authorization");
        if (token != null && isValidToken(token)) {
            return true;  // Token 有效，继续执行
        }

        // 3. 未登录，返回 401
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"code\":401,\"message\":\"未登录\"}");

        return false;  // 中断请求
    }

    private boolean isValidToken(String token) {
        // 验证 Token 逻辑
        return true;
    }
}

/**
 * 示例 3: 权限验证拦截器
 */
@Component
public class PermissionInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request,
                            HttpServletResponse response,
                            Object handler) throws IOException {

        // 只拦截 Controller 方法
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        HandlerMethod handlerMethod = (HandlerMethod) handler;

        // 获取方法上的权限注解
        RequirePermission annotation = handlerMethod.getMethodAnnotation(RequirePermission.class);
        if (annotation == null) {
            return true;  // 没有权限要求，继续执行
        }

        // 检查用户是否有权限
        String[] permissions = annotation.value();
        User currentUser = getCurrentUser(request);

        if (currentUser != null && hasPermissions(currentUser, permissions)) {
            return true;  // 有权限，继续执行
        }

        // 无权限，返回 403
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"code\":403,\"message\":\"无权限\"}");

        return false;
    }

    private User getCurrentUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null ? (User) session.getAttribute("user") : null;
    }

    private boolean hasPermissions(User user, String[] permissions) {
        // 检查用户权限
        return true;
    }
}

// 权限注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequirePermission {
    String[] value();
}
```

**(2) 拦截器配置**

```java
/**
 * 拦截器配置
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private LoggingInterceptor loggingInterceptor;

    @Autowired
    private LoginInterceptor loginInterceptor;

    @Autowired
    private PermissionInterceptor permissionInterceptor;

    /**
     * 注册拦截器
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        // 1. 日志拦截器（拦截所有请求）
        registry.addInterceptor(loggingInterceptor)
                .addPathPatterns("/**")                   // 拦截所有路径
                .order(1);                                // 优先级（数字越小优先级越高）

        // 2. 登录拦截器
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns("/api/**")               // 拦截 /api 下的所有请求
                .excludePathPatterns(                     // 排除不需要登录的路径
                    "/api/auth/login",
                    "/api/auth/register",
                    "/api/public/**"
                )
                .order(2);

        // 3. 权限拦截器
        registry.addInterceptor(permissionInterceptor)
                .addPathPatterns("/api/admin/**")         // 只拦截管理员接口
                .order(3);
    }

    /**
     * 配置静态资源不被拦截
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }
}
```

**(3) 过滤器的实现**

```java
/**
 * 过滤器接口: Filter
 */
public interface Filter {

    /**
     * 1. init: 过滤器初始化（只执行一次）
     */
    default void init(FilterConfig filterConfig) throws ServletException {
    }

    /**
     * 2. doFilter: 过滤请求（每次请求都执行）
     */
    void doFilter(ServletRequest request,
                 ServletResponse response,
                 FilterChain chain) throws IOException, ServletException;

    /**
     * 3. destroy: 过滤器销毁（只执行一次）
     */
    default void destroy() {
    }
}

/**
 * 示例 1: 编码过滤器
 */
@WebFilter(urlPatterns = "/*", filterName = "encodingFilter")
public class EncodingFilter implements Filter {

    private String encoding = "UTF-8";

    @Override
    public void init(FilterConfig filterConfig) {
        String configEncoding = filterConfig.getInitParameter("encoding");
        if (configEncoding != null) {
            this.encoding = configEncoding;
        }
    }

    @Override
    public void doFilter(ServletRequest request,
                        ServletResponse response,
                        FilterChain chain) throws IOException, ServletException {

        // 设置请求编码
        request.setCharacterEncoding(encoding);

        // 设置响应编码
        response.setCharacterEncoding(encoding);
        response.setContentType("text/html;charset=" + encoding);

        // 继续执行后续过滤器或目标资源
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // 清理资源
    }
}

/**
 * 示例 2: CORS 跨域过滤器
 */
@Component
@Order(1)  // 优先级（数字越小优先级越高）
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request,
                        ServletResponse response,
                        FilterChain chain) throws IOException, ServletException {

        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        // 设置 CORS 响应头
        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        httpResponse.setHeader("Access-Control-Max-Age", "3600");

        // OPTIONS 请求直接返回
        if ("OPTIONS".equals(httpRequest.getMethod())) {
            httpResponse.setStatus(HttpStatus.OK.value());
            return;
        }

        chain.doFilter(request, response);
    }
}

/**
 * 示例 3: 请求日志过滤器
 */
@Component
@Order(2)
public class RequestLoggingFilter implements Filter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    public void doFilter(ServletRequest request,
                        ServletResponse response,
                        FilterChain chain) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // 记录请求信息
        String method = httpRequest.getMethod();
        String uri = httpRequest.getRequestURI();
        String ip = httpRequest.getRemoteAddr();

        log.info(">>> 请求开始: {} {} from {}", method, uri, ip);

        long startTime = System.currentTimeMillis();

        try {
            // 继续执行
            chain.doFilter(request, response);
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            int status = httpResponse.getStatus();

            log.info("<<< 请求结束: {} {} - Status: {} - Duration: {}ms",
                    method, uri, status, duration);
        }
    }
}

/**
 * 示例 4: XSS 防护过滤器
 */
@Component
@Order(3)
public class XssFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request,
                        ServletResponse response,
                        FilterChain chain) throws IOException, ServletException {

        // 包装 Request，过滤 XSS 攻击
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        XssHttpServletRequestWrapper wrappedRequest = new XssHttpServletRequestWrapper(httpRequest);

        chain.doFilter(wrappedRequest, response);
    }
}

// XSS 请求包装器
class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {

    public XssHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
    }

    @Override
    public String getParameter(String name) {
        String value = super.getParameter(name);
        return cleanXss(value);
    }

    @Override
    public String[] getParameterValues(String name) {
        String[] values = super.getParameterValues(name);
        if (values == null) {
            return null;
        }

        String[] cleanValues = new String[values.length];
        for (int i = 0; i < values.length; i++) {
            cleanValues[i] = cleanXss(values[i]);
        }
        return cleanValues;
    }

    private String cleanXss(String value) {
        if (value == null) {
            return null;
        }

        // 移除 XSS 攻击代码
        value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        value = value.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
        value = value.replaceAll("'", "&#39;");
        value = value.replaceAll("eval\\((.*)\\)", "");
        value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
        value = value.replaceAll("script", "");

        return value;
    }
}
```

**(4) 过滤器配置**

```java
/**
 * 过滤器配置方式
 */

// 方式 1: 使用 @WebFilter 注解（需要 @ServletComponentScan）
@SpringBootApplication
@ServletComponentScan  // 扫描 @WebFilter 注解
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

@WebFilter(
    filterName = "customFilter",
    urlPatterns = {"/*"},
    initParams = {
        @WebInitParam(name = "encoding", value = "UTF-8")
    }
)
public class CustomFilter implements Filter {
    // ...
}

// 方式 2: 使用 FilterRegistrationBean（推荐）
@Configuration
public class FilterConfig {

    /**
     * 注册编码过滤器
     */
    @Bean
    public FilterRegistrationBean<EncodingFilter> encodingFilter() {
        FilterRegistrationBean<EncodingFilter> registration = new FilterRegistrationBean<>();

        registration.setFilter(new EncodingFilter());
        registration.addUrlPatterns("/*");              // URL 模式
        registration.setName("encodingFilter");         // 过滤器名称
        registration.setOrder(1);                       // 优先级

        // 初始化参数
        Map<String, String> initParams = new HashMap<>();
        initParams.put("encoding", "UTF-8");
        registration.setInitParameters(initParams);

        return registration;
    }

    /**
     * 注册 CORS 过滤器
     */
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        FilterRegistrationBean<CorsFilter> registration = new FilterRegistrationBean<>();

        registration.setFilter(new CorsFilter());
        registration.addUrlPatterns("/api/*");          // 只拦截 API 请求
        registration.setOrder(2);

        return registration;
    }
}

// 方式 3: 使用 @Component + @Order（Spring Boot 自动注册）
@Component
@Order(1)
public class MyFilter implements Filter {
    // 自动注册，拦截所有请求
}
```

**(5) 拦截器 vs 过滤器对比示例**

```java
/**
 * 完整示例：拦截器和过滤器的使用场景
 */

// ========== Filter 使用场景 ==========

/**
 * 1. 编码过滤器（Filter）
 * 原因: 需要在 Servlet 容器层面设置编码，在 Spring 之前执行
 */
@Component
@Order(1)
public class CharacterEncodingFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                        FilterChain chain) throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        chain.doFilter(request, response);
    }
}

/**
 * 2. CORS 过滤器（Filter）
 * 原因: 需要在所有请求（包括静态资源）上设置 CORS 头
 */
@Component
@Order(2)
public class CorsFilter implements Filter {
    // 省略具体实现
}

/**
 * 3. XSS 防护过滤器（Filter）
 * 原因: 需要在请求进入 Spring 前过滤恶意代码
 */
@Component
@Order(3)
public class XssFilter implements Filter {
    // 省略具体实现
}

// ========== Interceptor 使用场景 ==========

/**
 * 1. 登录验证拦截器（Interceptor）
 * 原因: 需要访问 Spring Bean（如 UserService），可以精确控制拦截路径
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Autowired
    private UserService userService;  // 可以直接注入 Spring Bean

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                            Object handler) {
        // 验证登录状态
        return true;
    }
}

/**
 * 2. 权限验证拦截器（Interceptor）
 * 原因: 需要获取 Controller 方法上的注解，精细化权限控制
 */
@Component
public class PermissionInterceptor implements HandlerInterceptor {

    @Autowired
    private PermissionService permissionService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                            Object handler) {

        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            // 获取方法上的权限注解
            RequirePermission annotation = handlerMethod.getMethodAnnotation(RequirePermission.class);
            if (annotation != null) {
                // 验证权限
                return permissionService.checkPermission(annotation.value());
            }
        }

        return true;
    }
}

/**
 * 3. 性能监控拦截器（Interceptor）
 * 原因: 需要在 Controller 执行前后记录时间，计算执行时长
 */
@Component
public class PerformanceInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                            Object handler) {
        request.setAttribute("startTime", System.currentTimeMillis());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                               Object handler, Exception ex) {
        long startTime = (Long) request.getAttribute("startTime");
        long duration = System.currentTimeMillis() - startTime;

        if (duration > 1000) {
            // 慢接口告警
            log.warn("慢接口: {} - {}ms", request.getRequestURI(), duration);
        }
    }
}

/**
 * 4. 日志拦截器（Interceptor）
 * 原因: 需要在 postHandle 中访问 ModelAndView，记录返回的视图信息
 */
@Component
public class LoggingInterceptor implements HandlerInterceptor {

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response,
                          Object handler, ModelAndView modelAndView) {
        if (modelAndView != null) {
            log.info("返回视图: {}, 模型数据: {}",
                    modelAndView.getViewName(),
                    modelAndView.getModel());
        }
    }
}

// ========== 配置 ==========

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private LoginInterceptor loginInterceptor;

    @Autowired
    private PermissionInterceptor permissionInterceptor;

    @Autowired
    private PerformanceInterceptor performanceInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 性能监控（拦截所有）
        registry.addInterceptor(performanceInterceptor)
                .addPathPatterns("/**")
                .order(1);

        // 登录验证
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/auth/**")
                .order(2);

        // 权限验证
        registry.addInterceptor(permissionInterceptor)
                .addPathPatterns("/api/admin/**")
                .order(3);
    }
}
```

**关键要点**

1. **拦截器（Interceptor）**
   - 基于 Spring MVC，属于 Spring 框架
   - 只拦截 Controller 请求（不拦截静态资源）
   - 可以访问 Spring 容器的 Bean（依赖注入）
   - 三个方法: preHandle、postHandle、afterCompletion
   - 可以获取 Handler 对象（方法、注解等）

2. **过滤器（Filter）**
   - 基于 Servlet 规范，属于 JavaEE 标准
   - 拦截所有请求（包括静态资源）
   - 需要手动获取 Spring Bean
   - 三个方法: init、doFilter、destroy
   - 不能直接访问 Handler 信息

3. **执行顺序**
   - 请求: Filter → Interceptor.preHandle → Controller → Interceptor.postHandle → 视图渲染 → Interceptor.afterCompletion → Filter
   - 多个拦截器/过滤器: 按注册顺序执行（责任链模式）

4. **使用场景**
   - **Filter**: 编码、CORS、XSS防护、日志记录（所有请求）
   - **Interceptor**: 登录验证、权限验证、性能监控、业务日志（Controller 请求）

5. **最佳实践**
   - 优先使用 Interceptor（Spring MVC 项目）
   - 需要拦截静态资源时使用 Filter
   - 需要依赖注入时使用 Interceptor
   - 使用 @Order 或 order() 设置执行顺序

**记忆口诀**

**"Filter 容器级,Interceptor 框架级;Filter 拦截广,Interceptor 控制细;Filter 难注入,Interceptor 易依赖;三个方法要记清,前中后各有时机"**

- **Filter 容器级**: Filter 属于 Servlet 容器级别
- **Interceptor 框架级**: Interceptor 属于 Spring 框架级别
- **Filter 拦截广**: Filter 拦截所有请求（包括静态资源）
- **Interceptor 控制细**: Interceptor 只拦截 Controller，控制更精细
- **Filter 难注入**: Filter 难以使用依赖注入
- **Interceptor 易依赖**: Interceptor 可以轻松使用依赖注入
- **三个方法要记清**: 两者都有三个核心方法
- **前中后各有时机**: preHandle（前）、postHandle（中）、afterCompletion（后）

**使用场景口诀:**
- **"编码 CORS 用 Filter,登录权限用 Interceptor;静态资源 Filter 拦,业务逻辑 Interceptor 管"**


## Spring Boot

### 38. 什么是 Spring Boot？Spring Boot 的特点是什么？

**核心答案**

**Spring Boot** 是基于 Spring 框架的快速开发脚手架,旨在**简化 Spring 应用的初始搭建和开发过程**。它通过"约定优于配置"的理念,提供了自动配置、起步依赖、内嵌服务器等特性,让开发者能够快速创建独立的、生产级别的 Spring 应用。

**Spring Boot 核心特点:**

| 特点 | 说明 | 优势 |
|-----|------|------|
| **自动配置** | 根据类路径自动配置 Spring | 减少大量 XML 配置 |
| **起步依赖（Starter）** | 预定义的依赖集合 | 简化依赖管理 |
| **内嵌服务器** | 内置 Tomcat/Jetty/Undertow | 无需部署 WAR 包 |
| **生产就绪** | 提供监控、健康检查等功能 | 开箱即用 |
| **无代码生成** | 不生成代码,不修改源码 | 保持代码简洁 |
| **独立运行** | 可打包成 JAR 独立运行 | 部署简单 |

**Spring Boot 架构图:**

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring Boot 核心架构</text>
<rect x="300" y="70" width="300" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="95" font-size="15" font-weight="bold" text-anchor="middle" fill="#fff">Spring Boot Application</text>
<text x="450" y="115" font-size="11" text-anchor="middle" fill="#fff">@SpringBootApplication</text>
<line x1="350" y1="130" x2="190" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="130" x2="450" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="550" y1="130" x2="710" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="180" width="180" height="80" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="190" y="210" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">自动配置</text>
<text x="190" y="230" font-size="11" text-anchor="middle" fill="#fff">Auto-Configuration</text>
<text x="190" y="245" font-size="10" text-anchor="middle" fill="#fff">@EnableAutoConfiguration</text>
<rect x="360" y="180" width="180" height="80" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="210" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">起步依赖</text>
<text x="450" y="230" font-size="11" text-anchor="middle" fill="#fff">Starter Dependencies</text>
<text x="450" y="245" font-size="10" text-anchor="middle" fill="#fff">spring-boot-starter-*</text>
<rect x="620" y="180" width="180" height="80" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="710" y="210" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">内嵌服务器</text>
<text x="710" y="230" font-size="11" text-anchor="middle" fill="#fff">Embedded Server</text>
<text x="710" y="245" font-size="10" text-anchor="middle" fill="#fff">Tomcat/Jetty/Undertow</text>
<line x1="190" y1="260" x2="190" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="260" x2="450" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="710" y1="260" x2="710" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="310" width="180" height="70" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="190" y="335" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">@Conditional</text>
<text x="190" y="355" font-size="10" text-anchor="middle" fill="#fff">条件装配</text>
<text x="190" y="370" font-size="10" text-anchor="middle" fill="#fff">按需加载配置</text>
<rect x="360" y="310" width="180" height="70" fill="#00bcd4" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="450" y="335" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">Dependency</text>
<text x="450" y="355" font-size="10" text-anchor="middle" fill="#fff">统一版本管理</text>
<text x="450" y="370" font-size="10" text-anchor="middle" fill="#fff">解决依赖冲突</text>
<rect x="620" y="310" width="180" height="70" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="710" y="335" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">JAR Package</text>
<text x="710" y="355" font-size="10" text-anchor="middle" fill="#fff">可执行 JAR</text>
<text x="710" y="370" font-size="10" text-anchor="middle" fill="#fff">java -jar app.jar</text>
<rect x="250" y="420" width="400" height="80" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="450" y="445" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">生产就绪特性</text>
<text x="450" y="465" font-size="11" text-anchor="middle" fill="#333">• Actuator（监控端点） • Metrics（指标收集）</text>
<text x="450" y="485" font-size="11" text-anchor="middle" fill="#333">• Health Check（健康检查） • 外部化配置</text>
<line x1="190" y1="380" x2="350" y2="440" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="380" x2="450" y2="410" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="710" y1="380" x2="550" y2="440" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="450" y="550" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">核心理念：约定优于配置（Convention over Configuration）</text>
</svg>

**详细说明**

**(1) Spring Boot 核心特点详解**

```java
/**
 * 1. 自动配置（Auto-Configuration）
 * Spring Boot 会根据类路径中的依赖自动配置 Spring 应用
 */

// 传统 Spring 配置（繁琐）
@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setUsername("root");
        dataSource.setPassword("password");
        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}

// Spring Boot 自动配置（简单）
// 只需要添加依赖和配置文件，Spring Boot 自动创建 DataSource 和 JdbcTemplate

// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

// application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver

// 直接使用
@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;  // 自动注入，无需配置

    public List<User> getAllUsers() {
        return jdbcTemplate.query("SELECT * FROM users",
            new BeanPropertyRowMapper<>(User.class));
    }
}

/**
 * 2. 起步依赖（Starter Dependencies）
 * Starter 是一组预定义的依赖集合
 */

// 传统 Spring（需要手动管理大量依赖）
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>5.3.10</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.10</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.12.5</version>
    </dependency>
    <!-- ... 还有很多依赖 -->
</dependencies>

// Spring Boot Starter（一个依赖搞定）
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
// spring-boot-starter-web 包含了:
// - spring-web
// - spring-webmvc
// - jackson
// - tomcat (内嵌)
// - validation
// 等所有 Web 开发需要的依赖

/**
 * 3. 内嵌服务器（Embedded Server）
 * 应用可以打包成 JAR 独立运行
 */

// 传统部署方式
// 1. 打包成 WAR
// 2. 安装 Tomcat
// 3. 部署 WAR 到 Tomcat
// 4. 启动 Tomcat

// Spring Boot 部署方式
// 1. 打包成 JAR: mvn clean package
// 2. 运行: java -jar myapp.jar
// 完成！应用已启动，内置 Tomcat 监听 8080 端口

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        // 自动启动内嵌 Tomcat，监听端口（默认 8080）
    }
}

/**
 * 4. 生产就绪特性（Production-Ready Features）
 */

// 添加 Actuator 依赖
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

// 自动获得以下端点:
// - /actuator/health       健康检查
// - /actuator/info         应用信息
// - /actuator/metrics      指标收集
// - /actuator/env          环境变量
// - /actuator/beans        所有 Bean
// - /actuator/mappings     请求映射

// 配置端点
spring:
  management:
    endpoints:
      web:
        exposure:
          include: health,info,metrics

/**
 * 5. 外部化配置
 * 支持多种配置源，优先级从高到低
 */

// 1. 命令行参数
java -jar myapp.jar --server.port=8081

// 2. 系统属性
System.setProperty("server.port", "8081");

// 3. 操作系统环境变量
export SERVER_PORT=8081

// 4. application.yml / application.properties
server:
  port: 8081

// 5. @PropertySource 指定的配置文件

// 6. 默认配置

/**
 * 6. 无代码生成和 XML 配置
 */

// Spring Boot 不生成代码，不需要 XML 配置
// 所有配置通过 Java Config 或 application.yml 完成

@SpringBootApplication
public class Application {
    // 无需继承、实现接口
    // 无需配置 web.xml
    // 无需配置 applicationContext.xml

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

**(2) Spring Boot 快速入门示例**

```java
/**
 * 快速创建 Spring Boot 应用
 */

// 1. pom.xml - 最小依赖
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>

    <dependencies>
        <!-- Web 开发 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- Spring Boot Maven 插件 -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>

// 2. 主启动类
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 3. Controller
@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}

// 4. 配置文件 application.yml
server:
  port: 8080
spring:
  application:
    name: demo-app

// 5. 运行
// mvn spring-boot:run
// 或
// mvn clean package
// java -jar target/demo-app.jar

// 访问: http://localhost:8080/api/hello
```

**(3) Spring Boot 的约定优于配置**

```java
/**
 * 约定优于配置（Convention over Configuration）
 */

// 1. 默认目录结构
src/
├── main/
│   ├── java/
│   │   └── com.example.demo/
│   │       ├── Application.java           # 主启动类
│   │       ├── controller/                # Controller 层
│   │       ├── service/                   # Service 层
│   │       ├── repository/                # Repository 层
│   │       ├── model/                     # 实体类
│   │       └── config/                    # 配置类
│   └── resources/
│       ├── application.yml                # 主配置文件
│       ├── application-dev.yml            # 开发环境配置
│       ├── application-prod.yml           # 生产环境配置
│       ├── static/                        # 静态资源（CSS/JS/图片）
│       └── templates/                     # 模板文件（Thymeleaf）
└── test/
    └── java/
        └── com.example.demo/
            └── ApplicationTests.java      # 测试类

// 2. 自动扫描
@SpringBootApplication  // 等同于以下三个注解
// = @Configuration       配置类
// + @EnableAutoConfiguration  启用自动配置
// + @ComponentScan      组件扫描（默认扫描主类所在包及子包）

// 主类放在根包下，自动扫描所有子包
package com.example.demo;  // 根包

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// Controller/Service/Repository 放在子包下，自动扫描
package com.example.demo.controller;

@RestController
public class UserController {
    // 自动被扫描并注册为 Bean
}

// 3. 默认配置
// 无需配置即可使用的默认值

// 服务器端口
server.port=8080  # 默认值

// 日志级别
logging.level.root=INFO  # 默认值

// 数据源连接池
spring.datasource.hikari.maximum-pool-size=10  # 默认值

// JSON 序列化
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss  # 可配置

// 4. 自动配置的判断条件
@Configuration
@ConditionalOnClass(DataSource.class)  // 类路径存在 DataSource 类
@ConditionalOnMissingBean(DataSource.class)  // 容器中不存在 DataSource Bean
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration {

    @Bean
    public DataSource dataSource(DataSourceProperties properties) {
        // 自动创建 DataSource
        return DataSourceBuilder.create()
            .url(properties.getUrl())
            .username(properties.getUsername())
            .password(properties.getPassword())
            .build();
    }
}
```

**(4) Spring Boot 完整示例**

```java
/**
 * 完整的 Spring Boot RESTful API 示例
 */

// 1. 主启动类
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 2. 实体类
@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String email;

    private Integer age;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}

// 3. Repository 层
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring Data JPA 自动实现
    Optional<User> findByUsername(String username);

    List<User> findByAgeGreaterThan(Integer age);

    @Query("SELECT u FROM User u WHERE u.email LIKE %:keyword%")
    List<User> searchByEmail(@Param("keyword") String keyword);
}

// 4. Service 层
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("用户不存在: " + id));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setAge(userDetails.getAge());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}

// 5. Controller 层
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@Valid @RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}

// 6. 全局异常处理
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleResourceNotFound(ResourceNotFoundException ex) {
        return new ErrorResponse(404, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage()));
        return new ErrorResponse(400, "参数校验失败", errors);
    }
}

// 7. 配置类
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("*")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*");
    }
}

// 8. 配置文件 application.yml
spring:
  application:
    name: user-service

  datasource:
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true

  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8

server:
  port: 8080

logging:
  level:
    com.example.demo: DEBUG
    org.hibernate.SQL: DEBUG

// 9. pom.xml
<dependencies>
    <!-- Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- MySQL -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>

    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>

    <!-- Test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

**关键要点**

1. **核心概念**
   - 快速开发脚手架，简化 Spring 应用开发
   - 约定优于配置（Convention over Configuration）
   - 开箱即用，生产就绪

2. **核心特点**
   - 自动配置: 根据类路径自动配置 Bean
   - 起步依赖: 预定义的依赖集合（Starter）
   - 内嵌服务器: Tomcat/Jetty/Undertow
   - 生产就绪: Actuator 提供监控端点
   - 独立运行: 打包成 JAR 即可运行

3. **设计理念**
   - 约定优于配置
   - 开箱即用
   - 零代码生成
   - 无 XML 配置
   - 快速开发

4. **主要优势**
   - 开发效率高: 减少配置工作量
   - 部署简单: 内嵌服务器，一个 JAR 搞定
   - 易于测试: 提供完整的测试支持
   - 监控完善: Actuator 提供生产级监控

5. **适用场景**
   - 微服务开发
   - RESTful API
   - Web 应用
   - 批处理任务
   - 定时任务

**记忆口诀**

**"Boot 快速搭建架,自动配置省时间;Starter 依赖一站齐,内嵌服务器独立跑;约定配置减繁琐,生产就绪监控强"**

- **Boot 快速搭建架**: Spring Boot 是快速开发脚手架
- **自动配置省时间**: 自动配置大幅减少配置工作
- **Starter 依赖一站齐**: 起步依赖统一管理相关依赖
- **内嵌服务器独立跑**: 内嵌服务器，应用可独立运行
- **约定配置减繁琐**: 约定优于配置，简化开发
- **生产就绪监控强**: 提供生产级监控和健康检查功能

### 39. Spring Boot 和 Spring 的区别是什么？

**核心答案**

Spring Boot 是基于 Spring 框架的**快速开发工具**,它**不是对 Spring 的替代,而是对 Spring 的增强和简化**。Spring Boot 通过自动配置、起步依赖等特性,让 Spring 应用的开发更加简单快捷。

**核心区别对比:**

| 对比项 | Spring Framework | Spring Boot |
|-------|------------------|-------------|
| **定位** | 企业级 Java 开发框架 | 快速开发脚手架 |
| **配置方式** | XML 配置或 Java Config | 自动配置 + 少量配置 |
| **依赖管理** | 手动管理依赖和版本 | Starter 统一管理 |
| **内嵌服务器** | 需要外部服务器 | 内置 Tomcat/Jetty |
| **部署方式** | WAR 包部署到服务器 | JAR 包独立运行 |
| **配置文件** | 多个 XML 文件 | 单个 application.yml |
| **开发效率** | 需要大量配置 | 开箱即用 |
| **学习曲线** | 较陡峭 | 平缓 |
| **监控支持** | 需要第三方集成 | Actuator 内置监控 |

**详细对比:**

**(1) 配置方式对比**

```java
/**
 * Spring Framework: 传统配置方式
 */

// 1. XML 配置方式
<!-- applicationContext.xml -->
<beans>
    <!-- 数据源配置 -->
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/test"/>
        <property name="username" value="root"/>
        <property name="password" value="password"/>
    </bean>

    <!-- JdbcTemplate 配置 -->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- 事务管理器 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- 启用注解事务 -->
    <tx:annotation-driven transaction-manager="transactionManager"/>

    <!-- 组件扫描 -->
    <context:component-scan base-package="com.example"/>
</beans>

// 2. Java Config 方式（Spring 3.0+）
@Configuration
@ComponentScan("com.example")
@EnableTransactionManagement
public class AppConfig {

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setUsername("root");
        dataSource.setPassword("password");
        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}

/**
 * Spring Boot: 自动配置
 */

// 1. pom.xml - 添加依赖
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

// 2. application.yml - 简单配置
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver

// 3. 直接使用 - DataSource、JdbcTemplate、TransactionManager 自动配置
@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;  // 自动注入

    @Transactional  // 事务自动配置
    public void saveUser(User user) {
        jdbcTemplate.update("INSERT INTO users (name, email) VALUES (?, ?)",
            user.getName(), user.getEmail());
    }
}
```

**(2) 依赖管理对比**

```xml
<!--
 * Spring Framework: 手动管理依赖
 -->

<!-- 需要手动指定每个依赖的版本 -->
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.3.20</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.20</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>5.3.20</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.20</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.13.3</version>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>
    <!-- 还需要配置很多其他依赖... -->
</dependencies>

<!--
 * Spring Boot: Starter 统一管理
 -->

<!-- 继承 spring-boot-starter-parent，自动管理版本 -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

<dependencies>
    <!-- 一个 Starter 包含所有相关依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- 无需指定版本，parent 统一管理 -->
    </dependency>
</dependencies>
```

**(3) 部署方式对比**

```java
/**
 * Spring Framework: WAR 部署
 */

// 1. 配置 web.xml
<web-app>
    <!-- Spring MVC DispatcherServlet -->
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>/WEB-INF/spring/dispatcher-servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <!-- Spring 上下文监听器 -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/spring/applicationContext.xml</param-value>
    </context-param>
</web-app>

// 2. 打包成 WAR
<packaging>war</packaging>

// 3. 部署步骤
// a. 安装 Tomcat
// b. 将 WAR 放到 tomcat/webapps/ 目录
// c. 启动 Tomcat
// d. 访问 http://localhost:8080/myapp/

/**
 * Spring Boot: JAR 独立运行
 */

// 1. 主类
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 2. 打包成 JAR
<packaging>jar</packaging>

<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>

// 3. 运行
// mvn clean package
// java -jar myapp.jar

// 访问 http://localhost:8080/
```

**(4) 监控支持对比**

```java
/**
 * Spring Framework: 需要手动集成监控
 */

// 1. 添加 Spring Boot Admin 或其他监控工具
// 2. 配置 JMX
// 3. 集成 Metrics 库
// 4. 编写自定义监控端点

/**
 * Spring Boot: 内置 Actuator
 */

// 1. 添加依赖
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

// 2. 配置
management:
  endpoints:
    web:
      exposure:
        include: "*"  # 暴露所有端点

// 3. 自动获得监控端点
// - /actuator/health       健康检查
// - /actuator/info         应用信息
// - /actuator/metrics      指标监控
// - /actuator/env          环境变量
// - /actuator/beans        所有 Bean
// - /actuator/mappings     URL 映射
// - /actuator/threaddump   线程转储
// - /actuator/heapdump     堆转储
```

**核心区别总结:**

| 维度 | Spring | Spring Boot |
|-----|--------|-------------|
| **启动方式** | 需要配置 web.xml、applicationContext.xml | main 方法启动 |
| **配置文件** | 多个 XML 文件 | application.yml/properties |
| **自动配置** | ❌ 需要手动配置所有 Bean | ✅ 根据依赖自动配置 |
| **内嵌容器** | ❌ 需要外部 Tomcat | ✅ 内置 Tomcat/Jetty |
| **依赖管理** | ❌ 手动管理版本 | ✅ Starter 统一管理 |
| **监控** | ❌ 需要手动集成 | ✅ Actuator 内置 |
| **开发效率** | 低（配置繁琐） | 高（开箱即用） |
| **学习成本** | 高 | 低 |

**关键要点**

1. **本质关系**
   - Spring Boot 基于 Spring Framework
   - Spring Boot 不是替代，而是增强
   - Spring Boot 简化了 Spring 的使用

2. **主要区别**
   - 配置: Spring 需要大量配置，Spring Boot 自动配置
   - 依赖: Spring 手动管理，Spring Boot 使用 Starter
   - 部署: Spring 需要外部服务器，Spring Boot 内嵌服务器
   - 监控: Spring 需要集成，Spring Boot 内置 Actuator

3. **适用场景**
   - Spring: 需要高度定制化的大型项目
   - Spring Boot: 快速开发、微服务、中小型项目

4. **学习路径**
   - 先学 Spring 核心概念（IoC、AOP）
   - 再学 Spring Boot（自动配置、Starter）
   - 最后学 Spring Cloud（微服务）

**记忆口诀**

**"Boot 基于 Spring 造,简化配置效率高;Starter 依赖一站齐,内嵌服务器独立跑;自动配置省时间,开箱即用开发快"**

- **Boot 基于 Spring 造**: Spring Boot 基于 Spring Framework
- **简化配置效率高**: 大幅简化配置，提高开发效率
- **Starter 依赖一站齐**: 起步依赖统一管理
- **内嵌服务器独立跑**: 内嵌服务器，独立运行
- **自动配置省时间**: 自动配置减少手动配置
- **开箱即用开发快**: 开箱即用，快速开发

### 40. 什么是自动配置？Spring Boot 如何实现自动配置？

**核心答案**

**自动配置（Auto-Configuration）**是 Spring Boot 的核心特性,它能够**根据类路径中的依赖自动配置 Spring 应用**,无需手动编写大量配置代码。Spring Boot 通过 **@EnableAutoConfiguration** 注解和 **spring.factories** 文件实现自动配置机制。

**自动配置核心组件:**

| 组件 | 作用 | 位置 |
|-----|------|------|
| **@EnableAutoConfiguration** | 启用自动配置 | 主启动类 |
| **spring.factories** | 定义自动配置类列表 | META-INF/spring.factories |
| **@Conditional** | 条件装配 | 自动配置类 |
| **AutoConfigurationImportSelector** | 加载自动配置类 | Spring Boot 核心 |
| **@ConfigurationProperties** | 绑定配置属性 | 配置类 |

**自动配置原理流程:**

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring Boot 自动配置原理</text>
<rect x="300" y="70" width="300" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">@SpringBootApplication</text>
<text x="450" y="115" font-size="11" text-anchor="middle" fill="#fff">启动类</text>
<line x1="450" y1="130" x2="450" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="155" font-size="11" fill="#666">1. 包含</text>
<rect x="300" y="170" width="300" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="450" y="195" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">@EnableAutoConfiguration</text>
<text x="450" y="215" font-size="11" text-anchor="middle" fill="#fff">启用自动配置</text>
<line x1="450" y1="230" x2="450" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="255" font-size="11" fill="#666">2. @Import</text>
<rect x="250" y="270" width="400" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="450" y="295" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">AutoConfigurationImportSelector</text>
<text x="450" y="315" font-size="11" text-anchor="middle" fill="#fff">选择并导入自动配置类</text>
<line x1="450" y1="330" x2="450" y2="370" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="355" font-size="11" fill="#666">3. 读取</text>
<rect x="300" y="370" width="300" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="395" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">spring.factories</text>
<text x="450" y="415" font-size="11" text-anchor="middle" fill="#fff">META-INF/spring.factories</text>
<line x1="450" y1="430" x2="450" y2="470" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="480" y="455" font-size="11" fill="#666">4. 加载配置类</text>
<rect x="100" y="470" width="240" height="80" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="220" y="500" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">条件判断</text>
<text x="220" y="520" font-size="10" text-anchor="middle" fill="#fff">@ConditionalOnClass</text>
<text x="220" y="535" font-size="10" text-anchor="middle" fill="#fff">@ConditionalOnMissingBean</text>
<rect x="360" y="470" width="240" height="80" fill="#00bcd4" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="480" y="500" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">属性绑定</text>
<text x="480" y="520" font-size="10" text-anchor="middle" fill="#fff">@ConfigurationProperties</text>
<text x="480" y="535" font-size="10" text-anchor="middle" fill="#fff">读取 application.yml</text>
<rect x="620" y="470" width="240" height="80" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="740" y="500" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">创建 Bean</text>
<text x="740" y="520" font-size="10" text-anchor="middle" fill="#fff">@Bean</text>
<text x="740" y="535" font-size="10" text-anchor="middle" fill="#fff">注册到容器</text>
<line x1="220" y1="550" x2="220" y2="580" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="480" y1="550" x2="480" y2="580" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="740" y1="550" x2="740" y2="580" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="580" width="400" height="50" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="610" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">自动配置完成，Bean 注入到 Spring 容器</text>
</svg>

**详细说明**

**(1) @EnableAutoConfiguration 注解**

```java
/**
 * @EnableAutoConfiguration 注解源码
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage  // 自动配置包
@Import(AutoConfigurationImportSelector.class)  // 导入自动配置选择器
public @interface EnableAutoConfiguration {

    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

    /**
     * 排除指定的自动配置类
     */
    Class<?>[] exclude() default {};

    /**
     * 排除指定的自动配置类名
     */
    String[] excludeName() default {};
}

/**
 * @SpringBootApplication 包含 @EnableAutoConfiguration
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration  // = @Configuration
@EnableAutoConfiguration  // 启用自动配置
@ComponentScan(excludeFilters = {
    @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
    @Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class)
})
public @interface SpringBootApplication {
    // 省略其他属性
}

/**
 * 使用示例
 */
@SpringBootApplication  // 包含了 @EnableAutoConfiguration
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 排除指定的自动配置
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Application {
    // 排除数据源自动配置
}
```

**(2) AutoConfigurationImportSelector 源码分析**

```java
/**
 * AutoConfigurationImportSelector: 自动配置导入选择器
 * 负责加载所有自动配置类
 */
public class AutoConfigurationImportSelector implements DeferredImportSelector {

    /**
     * 选择需要导入的配置类
     */
    @Override
    public String[] selectImports(AnnotationMetadata annotationMetadata) {
        if (!isEnabled(annotationMetadata)) {
            return NO_IMPORTS;
        }

        // 1. 获取自动配置的元数据
        AutoConfigurationEntry autoConfigurationEntry =
            getAutoConfigurationEntry(annotationMetadata);

        // 2. 返回自动配置类的全限定名数组
        return StringUtils.toStringArray(
            autoConfigurationEntry.getConfigurations());
    }

    /**
     * 获取自动配置条目
     */
    protected AutoConfigurationEntry getAutoConfigurationEntry(
            AnnotationMetadata annotationMetadata) {

        if (!isEnabled(annotationMetadata)) {
            return EMPTY_ENTRY;
        }

        // 1. 获取 @EnableAutoConfiguration 的属性
        AnnotationAttributes attributes = getAttributes(annotationMetadata);

        // 2. 从 spring.factories 获取所有候选配置类
        List<String> configurations = getCandidateConfigurations(
            annotationMetadata, attributes);

        // 3. 去重
        configurations = removeDuplicates(configurations);

        // 4. 获取需要排除的配置类
        Set<String> exclusions = getExclusions(annotationMetadata, attributes);

        // 5. 检查排除的类是否存在
        checkExcludedClasses(configurations, exclusions);

        // 6. 移除排除的配置类
        configurations.removeAll(exclusions);

        // 7. 过滤（根据条件注解）
        configurations = getConfigurationClassFilter()
            .filter(configurations);

        // 8. 触发自动配置导入事件
        fireAutoConfigurationImportEvents(configurations, exclusions);

        // 9. 返回自动配置条目
        return new AutoConfigurationEntry(configurations, exclusions);
    }

    /**
     * 从 spring.factories 加载候选配置类
     */
    protected List<String> getCandidateConfigurations(
            AnnotationMetadata metadata, AnnotationAttributes attributes) {

        // 读取 META-INF/spring.factories 文件
        List<String> configurations = SpringFactoriesLoader.loadFactoryNames(
            getSpringFactoriesLoaderFactoryClass(),  // EnableAutoConfiguration.class
            getBeanClassLoader()
        );

        Assert.notEmpty(configurations,
            "No auto configuration classes found in META-INF/spring.factories.");

        return configurations;
    }

    protected Class<?> getSpringFactoriesLoaderFactoryClass() {
        return EnableAutoConfiguration.class;
    }
}
```

**(3) spring.factories 文件**

```properties
# META-INF/spring.factories
# Spring Boot 的自动配置类列表

# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,\
org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration,\
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration,\
org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration,\
org.springframework.boot.autoconfigure.context.ConfigurationPropertiesAutoConfiguration,\
org.springframework.boot.autoconfigure.context.LifecycleAutoConfiguration,\
org.springframework.boot.autoconfigure.context.MessageSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.context.PropertyPlaceholderAutoConfiguration,\
org.springframework.boot.autoconfigure.couchbase.CouchbaseAutoConfiguration,\
org.springframework.boot.autoconfigure.dao.PersistenceExceptionTranslationAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.jdbc.JdbcRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.ldap.LdapRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.r2dbc.R2dbcDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.r2dbc.R2dbcRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.rest.RepositoryRestMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.data.web.SpringDataWebAutoConfiguration,\
org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchRestClientAutoConfiguration,\
org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration,\
org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration,\
org.springframework.boot.autoconfigure.groovy.template.GroovyTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration,\
org.springframework.boot.autoconfigure.h2.H2ConsoleAutoConfiguration,\
org.springframework.boot.autoconfigure.hateoas.HypermediaAutoConfiguration,\
org.springframework.boot.autoconfigure.hazelcast.HazelcastAutoConfiguration,\
org.springframework.boot.autoconfigure.hazelcast.HazelcastJpaDependencyAutoConfiguration,\
org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration,\
org.springframework.boot.autoconfigure.http.codec.CodecsAutoConfiguration,\
org.springframework.boot.autoconfigure.influx.InfluxDbAutoConfiguration,\
org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration,\
org.springframework.boot.autoconfigure.integration.IntegrationAutoConfiguration,\
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JndiDataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.JmsAutoConfiguration,\
org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.JndiConnectionFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.artemis.ArtemisAutoConfiguration,\
org.springframework.boot.autoconfigure.json.JsonbAutoConfiguration,\
org.springframework.boot.autoconfigure.jsonb.JsonbAutoConfiguration,\
org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration,\
org.springframework.boot.autoconfigure.availability.ApplicationAvailabilityAutoConfiguration,\
org.springframework.boot.autoconfigure.ldap.embedded.EmbeddedLdapAutoConfiguration,\
org.springframework.boot.autoconfigure.ldap.LdapAutoConfiguration,\
org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration,\
org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration,\
org.springframework.boot.autoconfigure.mail.MailSenderValidatorAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.mustache.MustacheAutoConfiguration,\
org.springframework.boot.autoconfigure.neo4j.Neo4jAutoConfiguration,\
org.springframework.boot.autoconfigure.netty.NettyAutoConfiguration,\
org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,\
org.springframework.boot.autoconfigure.quartz.QuartzAutoConfiguration,\
org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration,\
org.springframework.boot.autoconfigure.r2dbc.R2dbcTransactionManagerAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketMessagingAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketRequesterAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketServerAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketStrategiesAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration,\
org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration,\
org.springframework.boot.autoconfigure.security.rsocket.RSocketSecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.saml2.Saml2RelyingPartyAutoConfiguration,\
org.springframework.boot.autoconfigure.sendgrid.SendGridAutoConfiguration,\
org.springframework.boot.autoconfigure.session.SessionAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.client.servlet.OAuth2ClientAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.client.reactive.ReactiveOAuth2ClientAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.resource.reactive.ReactiveOAuth2ResourceServerAutoConfiguration,\
org.springframework.boot.autoconfigure.solr.SolrAutoConfiguration,\
org.springframework.boot.autoconfigure.sql.init.SqlInitializationAutoConfiguration,\
org.springframework.boot.autoconfigure.task.TaskExecutionAutoConfiguration,\
org.springframework.boot.autoconfigure.task.TaskSchedulingAutoConfiguration,\
org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.jta.JtaAutoConfiguration,\
org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration,\
org.springframework.boot.autoconfigure.web.client.RestTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.web.embedded.EmbeddedWebServerFactoryCustomizerAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.HttpHandlerAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.ReactiveWebServerFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.WebFluxAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.error.ErrorWebFluxAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.function.client.ClientHttpConnectorAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.reactive.WebSocketReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketServletAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketMessagingAutoConfiguration,\
org.springframework.boot.autoconfigure.webservices.WebServicesAutoConfiguration,\
org.springframework.boot.autoconfigure.webservices.client.WebServiceTemplateAutoConfiguration
```

**(4) 条件注解 @Conditional**

```java
/**
 * @Conditional 系列注解：条件装配
 * 只有满足条件时才会进行自动配置
 */

// 1. @ConditionalOnClass - 类路径存在指定类时生效
@Configuration
@ConditionalOnClass(DataSource.class)  // 类路径存在 DataSource 类
public class DataSourceAutoConfiguration {
    // 只有引入了 jdbc 或 jpa 依赖时才会配置
}

// 2. @ConditionalOnMissingClass - 类路径不存在指定类时生效
@Configuration
@ConditionalOnMissingClass("org.springframework.data.redis.core.RedisTemplate")
public class CustomCacheConfiguration {
    // Redis 不存在时使用本地缓存
}

// 3. @ConditionalOnBean - 容器中存在指定 Bean 时生效
@Configuration
@ConditionalOnBean(DataSource.class)
public class JdbcTemplateAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean  // 容器中没有 JdbcTemplate 时才创建
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}

// 4. @ConditionalOnMissingBean - 容器中不存在指定 Bean 时生效
@Configuration
public class DefaultDataSourceConfiguration {

    @Bean
    @ConditionalOnMissingBean(DataSource.class)
    public DataSource defaultDataSource() {
        // 只有用户没有自定义 DataSource 时才创建默认的
        return new HikariDataSource();
    }
}

// 5. @ConditionalOnProperty - 配置属性存在且为指定值时生效
@Configuration
@ConditionalOnProperty(
    name = "spring.datasource.enabled",
    havingValue = "true",
    matchIfMissing = true  // 属性不存在时也匹配
)
public class DataSourceAutoConfiguration {
    // 只有 spring.datasource.enabled=true 时才配置
}

// 6. @ConditionalOnResource - 类路径存在指定资源时生效
@Configuration
@ConditionalOnResource(resources = "classpath:mybatis-config.xml")
public class MyBatisAutoConfiguration {
    // mybatis-config.xml 存在时才配置
}

// 7. @ConditionalOnWebApplication - Web 应用时生效
@Configuration
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class WebMvcAutoConfiguration {
    // Servlet Web 应用时才配置
}

// 8. @ConditionalOnNotWebApplication - 非 Web 应用时生效
@Configuration
@ConditionalOnNotWebApplication
public class BatchConfiguration {
    // 批处理应用（非 Web）时配置
}

// 9. @ConditionalOnExpression - SpEL 表达式为 true 时生效
@Configuration
@ConditionalOnExpression("${custom.enabled:false} && ${custom.debug:true}")
public class CustomConfiguration {
    // 满足 SpEL 表达式条件时才配置
}

// 10. @ConditionalOnJava - Java 版本满足条件时生效
@Configuration
@ConditionalOnJava(JavaVersion.ELEVEN)
public class Java11Configuration {
    // Java 11 及以上版本时才配置
}
```

**(5) 完整的自动配置类示例**

```java
/**
 * 完整的自动配置类示例：DataSourceAutoConfiguration
 */

@Configuration(proxyBeanMethods = false)
@ConditionalOnClass({DataSource.class, EmbeddedDatabaseType.class})
@ConditionalOnMissingBean(type = "io.r2dbc.spi.ConnectionFactory")
@EnableConfigurationProperties(DataSourceProperties.class)
@Import({DataSourcePoolMetadataProvidersConfiguration.class})
public class DataSourceAutoConfiguration {

    @Configuration(proxyBeanMethods = false)
    @Conditional(EmbeddedDatabaseCondition.class)
    @ConditionalOnMissingBean({DataSource.class, XADataSource.class})
    @Import(EmbeddedDataSourceConfiguration.class)
    protected static class EmbeddedDatabaseConfiguration {
        // 内嵌数据库配置
    }

    @Configuration(proxyBeanMethods = false)
    @Conditional(PooledDataSourceCondition.class)
    @ConditionalOnMissingBean({DataSource.class, XADataSource.class})
    @Import({
        DataSourceConfiguration.Hikari.class,
        DataSourceConfiguration.Tomcat.class,
        DataSourceConfiguration.Dbcp2.class,
        DataSourceConfiguration.OracleUcp.class,
        DataSourceConfiguration.Generic.class
    })
    protected static class PooledDataSourceConfiguration {
        // 连接池数据源配置
    }
}

/**
 * DataSourceProperties: 配置属性类
 */
@ConfigurationProperties(prefix = "spring.datasource")
public class DataSourceProperties implements BeanClassLoaderAware, InitializingBean {

    private ClassLoader classLoader;

    /**
     * JDBC URL
     */
    private String url;

    /**
     * 数据库用户名
     */
    private String username;

    /**
     * 数据库密码
     */
    private String password;

    /**
     * JDBC 驱动类名
     */
    private String driverClassName;

    /**
     * 连接池类型
     */
    private Class<? extends DataSource> type;

    // Getters and Setters
}

/**
 * Hikari 连接池配置
 */
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(HikariDataSource.class)
@ConditionalOnMissingBean(DataSource.class)
@ConditionalOnProperty(
    name = "spring.datasource.type",
    havingValue = "com.zaxxer.hikari.HikariDataSource",
    matchIfMissing = true
)
static class Hikari {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.hikari")
    HikariDataSource dataSource(DataSourceProperties properties) {
        HikariDataSource dataSource = createDataSource(
            properties, HikariDataSource.class);

        if (StringUtils.hasText(properties.getName())) {
            dataSource.setPoolName(properties.getName());
        }

        return dataSource;
    }

    protected static <T> T createDataSource(
            DataSourceProperties properties, Class<? extends DataSource> type) {

        return (T) properties.initializeDataSourceBuilder()
            .type(type)
            .build();
    }
}
```

**(6) 自定义自动配置类**

```java
/**
 * 自定义自动配置类示例
 */

// 1. 配置属性类
@ConfigurationProperties(prefix = "custom.service")
@Data
public class CustomServiceProperties {

    /**
     * 是否启用
     */
    private boolean enabled = true;

    /**
     * 服务 URL
     */
    private String url = "http://localhost:8080";

    /**
     * 超时时间（秒）
     */
    private int timeout = 30;

    /**
     * 重试次数
     */
    private int retryCount = 3;
}

// 2. 服务类
public class CustomService {

    private final CustomServiceProperties properties;

    public CustomService(CustomServiceProperties properties) {
        this.properties = properties;
    }

    public String doSomething() {
        return "CustomService: url=" + properties.getUrl() +
               ", timeout=" + properties.getTimeout();
    }
}

// 3. 自动配置类
@Configuration
@ConditionalOnClass(CustomService.class)  // 类路径存在 CustomService
@EnableConfigurationProperties(CustomServiceProperties.class)  // 启用配置属性
public class CustomServiceAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean  // 容器中没有 CustomService 时才创建
    @ConditionalOnProperty(
        prefix = "custom.service",
        name = "enabled",
        havingValue = "true",
        matchIfMissing = true
    )
    public CustomService customService(CustomServiceProperties properties) {
        return new CustomService(properties);
    }
}

// 4. 创建 spring.factories 文件
// META-INF/spring.factories
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.example.autoconfigure.CustomServiceAutoConfiguration

// 5. 使用自动配置
// application.yml
custom:
  service:
    enabled: true
    url: http://api.example.com
    timeout: 60
    retry-count: 5

// 直接使用，无需手动配置
@Service
public class BusinessService {

    @Autowired
    private CustomService customService;  // 自动注入

    public void doWork() {
        String result = customService.doSomething();
        System.out.println(result);
    }
}
```

**关键要点**

1. **自动配置原理**
   - @EnableAutoConfiguration 启用自动配置
   - AutoConfigurationImportSelector 选择配置类
   - spring.factories 定义配置类列表
   - @Conditional 条件装配

2. **核心组件**
   - @EnableAutoConfiguration: 启用自动配置
   - AutoConfigurationImportSelector: 导入选择器
   - spring.factories: 配置类列表
   - @Conditional: 条件注解
   - @ConfigurationProperties: 属性绑定

3. **条件注解**
   - @ConditionalOnClass: 类存在
   - @ConditionalOnMissingBean: Bean 不存在
   - @ConditionalOnProperty: 属性匹配
   - @ConditionalOnWebApplication: Web 应用

4. **配置优先级**
   - 用户自定义配置 > 自动配置
   - @ConditionalOnMissingBean 实现覆盖

5. **最佳实践**
   - 使用 @ConditionalOnMissingBean 允许用户覆盖
   - 使用 @ConfigurationProperties 外部化配置
   - 提供合理的默认值
   - 在 spring.factories 中注册

**记忆口诀**

**"Enable 启动配,Selector 来选择;factories 列清单,Conditional 判条件;Properties 绑属性,MissingBean 可覆盖"**

- **Enable 启动配**: @EnableAutoConfiguration 启用自动配置
- **Selector 来选择**: AutoConfigurationImportSelector 选择配置类
- **factories 列清单**: spring.factories 列出所有配置类
- **Conditional 判条件**: @Conditional 系列注解判断条件
- **Properties 绑属性**: @ConfigurationProperties 绑定配置属性
- **MissingBean 可覆盖**: @ConditionalOnMissingBean 允许用户覆盖


### 41. 什么是 @SpringBootApplication 注解？

**核心答案**

**@SpringBootApplication** 是 Spring Boot 的**核心注解**,标注在主启动类上。它是一个**组合注解**,等同于 **@SpringBootConfiguration + @EnableAutoConfiguration + @ComponentScan** 三个注解的组合,用于简化 Spring Boot 应用的配置。

**@SpringBootApplication 组成:**

| 注解 | 等价于 | 作用 |
|-----|-------|------|
| **@SpringBootConfiguration** | @Configuration | 标识为配置类 |
| **@EnableAutoConfiguration** | - | 启用自动配置 |
| **@ComponentScan** | - | 组件扫描 |

**@SpringBootApplication 源码:**

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration         // 1. 配置类
@EnableAutoConfiguration        // 2. 自动配置
@ComponentScan(                 // 3. 组件扫描
    excludeFilters = {
        @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
        @Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class)
    }
)
public @interface SpringBootApplication {

    /**
     * 排除指定的自动配置类（同 @EnableAutoConfiguration.exclude）
     */
    @AliasFor(annotation = EnableAutoConfiguration.class)
    Class<?>[] exclude() default {};

    /**
     * 排除指定的自动配置类名（同 @EnableAutoConfiguration.excludeName）
     */
    @AliasFor(annotation = EnableAutoConfiguration.class)
    String[] excludeName() default {};

    /**
     * 指定扫描的基础包（同 @ComponentScan.basePackages）
     */
    @AliasFor(annotation = ComponentScan.class, attribute = "basePackages")
    String[] scanBasePackages() default {};

    /**
     * 指定扫描的基础类（同 @ComponentScan.basePackageClasses）
     */
    @AliasFor(annotation = ComponentScan.class, attribute = "basePackageClasses")
    Class<?>[] scanBasePackageClasses() default {};

    /**
     * 指定 Bean 名称生成器（同 @ComponentScan.nameGenerator）
     */
    @AliasFor(annotation = ComponentScan.class, attribute = "nameGenerator")
    Class<? extends BeanNameGenerator> nameGenerator() default BeanNameGenerator.class;

    /**
     * 是否代理 @Bean 方法（同 @Configuration.proxyBeanMethods）
     */
    @AliasFor(annotation = Configuration.class)
    boolean proxyBeanMethods() default true;
}
```

**详细说明**

**(1) @SpringBootConfiguration**

```java
/**
 * @SpringBootConfiguration: 标识为 Spring Boot 配置类
 * 本质上就是 @Configuration
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration  // 等价于 @Configuration
@Indexed
public @interface SpringBootConfiguration {

    @AliasFor(annotation = Configuration.class)
    boolean proxyBeanMethods() default true;
}

/**
 * 使用示例
 */
@SpringBootApplication
public class Application {
    // 这个类本身就是一个配置类，可以定义 @Bean 方法

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    // 可以直接定义 Bean
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper;
    }
}
```

**(2) @EnableAutoConfiguration**

```java
/**
 * @EnableAutoConfiguration: 启用自动配置
 * 根据类路径中的依赖自动配置 Spring 应用
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {

    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

    /**
     * 排除指定的自动配置类
     */
    Class<?>[] exclude() default {};

    /**
     * 排除指定的自动配置类名
     */
    String[] excludeName() default {};
}

/**
 * 使用示例
 */
// 排除数据源自动配置
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 或使用配置文件排除
// application.yml
spring:
  autoconfigure:
    exclude:
      - org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
      - org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration
```

**(3) @ComponentScan**

```java
/**
 * @ComponentScan: 组件扫描
 * 扫描 @Component、@Service、@Repository、@Controller 等注解
 */

/**
 * 默认扫描规则
 */
// 主类放在根包下
package com.example.demo;

@SpringBootApplication  // 默认扫描 com.example.demo 及其子包
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 这些类会被自动扫描
package com.example.demo.controller;  // 子包 ✓
@RestController
public class UserController { }

package com.example.demo.service;     // 子包 ✓
@Service
public class UserService { }

package com.example.demo.repository;  // 子包 ✓
@Repository
public interface UserRepository { }

package com.example.other;            // 不在扫描范围 ✗
@Service
public class OtherService { }

/**
 * 自定义扫描路径
 */
// 方式 1: 指定包名
@SpringBootApplication(scanBasePackages = {
    "com.example.demo",
    "com.example.other"
})
public class Application {
    // 扫描多个包
}

// 方式 2: 指定类（扫描该类所在包）
@SpringBootApplication(scanBasePackageClasses = {
    UserController.class,
    OtherService.class
})
public class Application {
    // 扫描这些类所在的包
}

// 方式 3: 使用 @ComponentScan 注解
@SpringBootApplication
@ComponentScan(
    basePackages = {"com.example.demo", "com.example.other"},
    excludeFilters = @Filter(type = FilterType.REGEX, pattern = "com.example.demo.test.*")
)
public class Application {
    // 更灵活的扫描配置
}
```

**(4) @SpringBootApplication 完整使用示例**

```java
/**
 * 基本使用
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

/**
 * 排除自动配置
 */
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,      // 排除数据源自动配置
    HibernateJpaAutoConfiguration.class,   // 排除 JPA 自动配置
    RedisAutoConfiguration.class           // 排除 Redis 自动配置
})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

/**
 * 自定义扫描路径
 */
@SpringBootApplication(scanBasePackages = {
    "com.example.demo",
    "com.example.common",
    "com.example.service"
})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

/**
 * 完整配置示例
 */
@SpringBootApplication(
    // 排除自动配置
    exclude = {DataSourceAutoConfiguration.class},

    // 自定义扫描路径
    scanBasePackages = {"com.example.demo", "com.example.common"},

    // 关闭 Bean 方法代理（性能优化）
    proxyBeanMethods = false
)
public class Application {

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(Application.class);

        // 自定义启动配置
        application.setBannerMode(Banner.Mode.OFF);  // 关闭 Banner
        application.setWebApplicationType(WebApplicationType.SERVLET);  // Web 类型

        application.run(args);
    }

    // 定义 Bean
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-");
        executor.initialize();
        return executor;
    }
}
```

**(5) @SpringBootApplication 的等价写法**

```java
/**
 * @SpringBootApplication 的完整展开形式
 */

// 使用 @SpringBootApplication
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 等价于以下三个注解的组合
@SpringBootConfiguration  // = @Configuration
@EnableAutoConfiguration
@ComponentScan
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 进一步展开
@Configuration                // 配置类
@EnableAutoConfiguration      // 自动配置
@ComponentScan(               // 组件扫描
    basePackages = "com.example.demo"
)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

**(6) proxyBeanMethods 属性**

```java
/**
 * proxyBeanMethods: 是否代理 @Bean 方法
 * 默认 true，Spring 会为配置类创建 CGLIB 代理
 */

// proxyBeanMethods = true（默认，Full 模式）
@SpringBootApplication(proxyBeanMethods = true)
public class FullModeConfig {

    @Bean
    public ServiceA serviceA() {
        return new ServiceA();
    }

    @Bean
    public ServiceB serviceB() {
        // 多次调用 serviceA()，返回同一个实例（单例）
        return new ServiceB(serviceA());
    }

    @Bean
    public ServiceC serviceC() {
        // 返回同一个 serviceA 实例
        return new ServiceC(serviceA());
    }
}

// proxyBeanMethods = false（Lite 模式，性能更好）
@SpringBootApplication(proxyBeanMethods = false)
public class LiteModeConfig {

    @Bean
    public ServiceA serviceA() {
        return new ServiceA();
    }

    @Bean
    public ServiceB serviceB() {
        // 每次调用 serviceA() 都会创建新实例
        // 不推荐在 @Bean 方法内调用其他 @Bean 方法
        return new ServiceB(serviceA());  // 创建新的 ServiceA
    }

    @Bean
    public ServiceC serviceC(ServiceA serviceA) {  // 推荐：通过参数注入
        return new ServiceC(serviceA);
    }
}

/**
 * 性能对比
 */
// Full 模式（proxyBeanMethods = true）
// 优点：保证 @Bean 方法调用的单例特性
// 缺点：需要 CGLIB 代理，启动稍慢

// Lite 模式（proxyBeanMethods = false）
// 优点：不需要代理，启动更快，内存占用更小
// 缺点：@Bean 方法之间不能相互调用

/**
 * 使用建议
 */
// 1. 配置类中的 @Bean 方法之间有依赖关系 → proxyBeanMethods = true
@Configuration(proxyBeanMethods = true)
public class DependentBeansConfig {

    @Bean
    public DataSource dataSource() {
        return new HikariDataSource();
    }

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());  // 需要调用 dataSource()
    }
}

// 2. 配置类中的 @Bean 方法之间没有依赖关系 → proxyBeanMethods = false
@Configuration(proxyBeanMethods = false)
public class IndependentBeansConfig {

    @Bean
    public ServiceA serviceA() {
        return new ServiceA();
    }

    @Bean
    public ServiceB serviceB() {
        return new ServiceB();  // 不调用其他 @Bean 方法
    }
}

// 3. Spring Boot 自动配置类大多使用 Lite 模式
@Configuration(proxyBeanMethods = false)  // 性能优化
@ConditionalOnClass(DataSource.class)
public class DataSourceAutoConfiguration {
    // ...
}
```

**(7) 多模块项目中的使用**

```java
/**
 * 多模块项目结构
 */
// 项目结构
myapp/
├── myapp-common/       # 通用模块
│   └── com.example.common
│       ├── config/
│       └── util/
├── myapp-service/      # 服务模块
│   └── com.example.service
│       ├── UserService
│       └── OrderService
└── myapp-web/          # Web 模块
    └── com.example.web
        ├── Application.java
        └── controller/

// myapp-web 的主启动类
package com.example.web;

@SpringBootApplication(
    scanBasePackages = {
        "com.example.web",      // 扫描当前模块
        "com.example.service",  // 扫描 service 模块
        "com.example.common"    // 扫描 common 模块
    }
)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// 或者使用主包策略（推荐）
// 将主启动类放在最顶层包
package com.example;  // 根包

@SpringBootApplication  // 自动扫描 com.example 及其子包
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

**关键要点**

1. **组合注解**
   - @SpringBootConfiguration（配置类）
   - @EnableAutoConfiguration（自动配置）
   - @ComponentScan（组件扫描）

2. **主要属性**
   - exclude: 排除自动配置类
   - scanBasePackages: 指定扫描包
   - proxyBeanMethods: 是否代理 @Bean 方法

3. **扫描规则**
   - 默认扫描主类所在包及子包
   - 可通过 scanBasePackages 自定义扫描路径
   - 主类应放在根包下

4. **性能优化**
   - proxyBeanMethods = false（Lite 模式）
   - 减少自动配置的加载
   - 精确指定扫描路径

5. **最佳实践**
   - 主类放在根包下，利用默认扫描
   - 按需排除不需要的自动配置
   - 使用 Lite 模式优化性能

**记忆口诀**

**"SpringBootApplication 三合一,Configuration 配置类;EnableAuto 自动配,ComponentScan 扫组件;exclude 排不要,scanBase 定范围"**

- **SpringBootApplication 三合一**: 三个注解的组合
- **Configuration 配置类**: @SpringBootConfiguration 标识配置类
- **EnableAuto 自动配**: @EnableAutoConfiguration 启用自动配置
- **ComponentScan 扫组件**: @ComponentScan 扫描组件
- **exclude 排不要**: exclude 排除不需要的自动配置
- **scanBase 定范围**: scanBasePackages 定义扫描范围



### 42. 什么是 Starter？常用的 Starter 有哪些？

**核心答案**

**Starter** 是 Spring Boot 提供的**一组预定义的依赖描述符（Dependency Descriptor）**，它将某个功能所需的所有依赖打包在一起，让开发者只需添加一个 Starter 依赖，就能自动引入相关的所有 jar 包和自动配置类，极大简化了项目的依赖管理。

**Starter 核心特点:**

| 特点 | 说明 | 优势 |
|-----|------|------|
| **依赖聚合** | 将相关依赖打包在一起 | 一个依赖解决所有问题 |
| **版本管理** | 统一管理依赖版本 | 避免版本冲突 |
| **自动配置** | 包含自动配置类 | 开箱即用 |
| **约定优于配置** | 提供合理默认值 | 减少配置工作 |
| **按需引入** | 模块化设计 | 灵活组合 |

**Starter 依赖结构:**

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring Boot Starter 依赖结构</text>
<rect x="300" y="70" width="300" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="95" font-size="15" font-weight="bold" text-anchor="middle" fill="#fff">spring-boot-starter-web</text>
<text x="450" y="115" font-size="11" text-anchor="middle" fill="#fff">Web 开发 Starter</text>
<line x1="350" y1="130" x2="190" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="130" x2="450" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="550" y1="130" x2="710" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="180" width="180" height="80" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="190" y="210" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">spring-boot-starter</text>
<text x="190" y="230" font-size="10" text-anchor="middle" fill="#fff">核心 Starter</text>
<text x="190" y="245" font-size="9" text-anchor="middle" fill="#fff">自动配置 + 日志</text>
<rect x="360" y="180" width="180" height="80" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="210" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">spring-boot-starter</text>
<text x="450" y="230" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">-tomcat</text>
<text x="450" y="245" font-size="9" text-anchor="middle" fill="#fff">内嵌 Tomcat</text>
<rect x="620" y="180" width="180" height="80" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="710" y="210" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">spring-web</text>
<text x="710" y="230" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">spring-webmvc</text>
<text x="710" y="245" font-size="9" text-anchor="middle" fill="#fff">Spring MVC</text>
<line x1="190" y1="260" x2="190" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="260" x2="450" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="710" y1="260" x2="710" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="310" width="180" height="70" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="190" y="335" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">spring-boot</text>
<text x="190" y="350" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">spring-context</text>
<text x="190" y="365" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">logback</text>
<rect x="360" y="310" width="180" height="70" fill="#00bcd4" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="450" y="335" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">tomcat-embed-core</text>
<text x="450" y="350" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">tomcat-embed-el</text>
<text x="450" y="365" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">tomcat-embed</text>
<text x="450" y="375" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">-websocket</text>
<rect x="620" y="310" width="180" height="70" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="710" y="335" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">jackson-databind</text>
<text x="710" y="350" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">validation-api</text>
<text x="710" y="365" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">其他 Web 依赖</text>
<rect x="250" y="420" width="400" height="80" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="450" y="445" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">自动配置类（Auto-Configuration）</text>
<text x="450" y="465" font-size="11" text-anchor="middle" fill="#333">• WebMvcAutoConfiguration（Spring MVC 配置）</text>
<text x="450" y="485" font-size="11" text-anchor="middle" fill="#333">• DispatcherServletAutoConfiguration（DispatcherServlet 配置）</text>
<line x1="190" y1="380" x2="350" y2="440" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="380" x2="450" y2="410" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="710" y1="380" x2="550" y2="440" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="450" y="550" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">一个 Starter = 相关依赖 + 自动配置 + 默认配置</text>
</svg>

**详细说明**

**(1) Starter 的作用**

```xml
<!--
 * 传统 Spring 项目依赖管理（繁琐）
 -->

<!-- 需要手动添加所有依赖 -->
<dependencies>
    <!-- Spring MVC -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>5.3.20</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.20</version>
    </dependency>

    <!-- JSON -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.13.3</version>
    </dependency>

    <!-- Validation -->
    <dependency>
        <groupId>javax.validation</groupId>
        <artifactId>validation-api</artifactId>
        <version>2.0.1.Final</version>
    </dependency>
    <dependency>
        <groupId>org.hibernate.validator</groupId>
        <artifactId>hibernate-validator</artifactId>
        <version>6.2.3.Final</version>
    </dependency>

    <!-- Tomcat -->
    <dependency>
        <groupId>org.apache.tomcat.embed</groupId>
        <artifactId>tomcat-embed-core</artifactId>
        <version>9.0.62</version>
    </dependency>

    <!-- 还有很多其他依赖... -->
</dependencies>

<!--
 * Spring Boot Starter（简单）
 -->

<!-- 继承 spring-boot-starter-parent -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

<dependencies>
    <!-- 一个依赖搞定所有 Web 开发需要的 jar 包 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- 无需指定版本，parent 统一管理 -->
    </dependency>
</dependencies>

<!-- spring-boot-starter-web 自动引入:
     - spring-boot-starter (核心 Starter)
     - spring-boot-starter-tomcat (内嵌 Tomcat)
     - spring-web, spring-webmvc (Spring MVC)
     - jackson-databind (JSON 序列化)
     - hibernate-validator (参数校验)
     - 其他 Web 开发相关依赖
-->
```

**(2) 常用的官方 Starter**

```xml
/**
 * Spring Boot 官方 Starter 分类
 */

<!-- ========== 核心 Starter ========== -->

<!-- 1. spring-boot-starter -->
<!-- 核心 Starter，所有其他 Starter 都依赖它 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
</dependency>
<!-- 包含:
     - spring-boot (核心)
     - spring-boot-autoconfigure (自动配置)
     - spring-boot-starter-logging (日志)
     - spring-core, spring-context (Spring 核心)
     - snakeyaml (YAML 支持)
-->

<!-- ========== Web 开发 Starter ========== -->

<!-- 2. spring-boot-starter-web -->
<!-- Web 开发（Spring MVC + Tomcat） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<!-- 包含:
     - spring-boot-starter
     - spring-boot-starter-tomcat
     - spring-web, spring-webmvc
     - jackson (JSON)
     - validation (参数校验)
-->

<!-- 3. spring-boot-starter-webflux -->
<!-- 响应式 Web 开发（WebFlux + Netty） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>

<!-- 4. spring-boot-starter-websocket -->
<!-- WebSocket 支持 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>

<!-- ========== 模板引擎 Starter ========== -->

<!-- 5. spring-boot-starter-thymeleaf -->
<!-- Thymeleaf 模板引擎 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>

<!-- 6. spring-boot-starter-freemarker -->
<!-- FreeMarker 模板引擎 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-freemarker</artifactId>
</dependency>

<!-- ========== 数据访问 Starter ========== -->

<!-- 7. spring-boot-starter-data-jpa -->
<!-- JPA（Hibernate） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<!-- 包含:
     - spring-boot-starter-jdbc
     - hibernate-core (ORM)
     - spring-data-jpa
     - spring-orm
-->

<!-- 8. spring-boot-starter-jdbc -->
<!-- JDBC 支持（DataSource + JdbcTemplate） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<!-- 包含:
     - HikariCP (连接池)
     - spring-jdbc
-->

<!-- 9. spring-boot-starter-data-mongodb -->
<!-- MongoDB -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>

<!-- 10. spring-boot-starter-data-redis -->
<!-- Redis -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- 包含:
     - spring-data-redis
     - lettuce-core (Redis 客户端)
-->

<!-- 11. spring-boot-starter-data-elasticsearch -->
<!-- Elasticsearch -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>

<!-- ========== 消息队列 Starter ========== -->

<!-- 12. spring-boot-starter-amqp -->
<!-- RabbitMQ -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>

<!-- 13. spring-boot-starter-kafka -->
<!-- Kafka -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-kafka</artifactId>
</dependency>

<!-- 14. spring-boot-starter-artemis -->
<!-- Apache Artemis MQ -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-artemis</artifactId>
</dependency>

<!-- ========== 安全 Starter ========== -->

<!-- 15. spring-boot-starter-security -->
<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- 16. spring-boot-starter-oauth2-client -->
<!-- OAuth2 客户端 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>

<!-- 17. spring-boot-starter-oauth2-resource-server -->
<!-- OAuth2 资源服务器 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>

<!-- ========== 缓存 Starter ========== -->

<!-- 18. spring-boot-starter-cache -->
<!-- 缓存抽象（支持多种缓存实现） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>

<!-- ========== 测试 Starter ========== -->

<!-- 19. spring-boot-starter-test -->
<!-- 测试（JUnit + Mockito + AssertJ） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<!-- 包含:
     - JUnit 5
     - Spring Test
     - Mockito
     - AssertJ
     - Hamcrest
     - JSONassert
-->

<!-- ========== 监控 Starter ========== -->

<!-- 20. spring-boot-starter-actuator -->
<!-- 生产级监控（健康检查、指标收集） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!-- ========== 定时任务 Starter ========== -->

<!-- 21. spring-boot-starter-quartz -->
<!-- Quartz 定时任务 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-quartz</artifactId>
</dependency>

<!-- ========== 邮件 Starter ========== -->

<!-- 22. spring-boot-starter-mail -->
<!-- 邮件发送 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>

<!-- ========== 验证 Starter ========== -->

<!-- 23. spring-boot-starter-validation -->
<!-- Bean Validation（Hibernate Validator） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<!-- ========== AOP Starter ========== -->

<!-- 24. spring-boot-starter-aop -->
<!-- AOP（AspectJ） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>

<!-- ========== 日志 Starter ========== -->

<!-- 25. spring-boot-starter-logging -->
<!-- 默认日志（Logback） -->
<!-- 已包含在 spring-boot-starter 中，无需单独引入 -->

<!-- 26. spring-boot-starter-log4j2 -->
<!-- Log4j2 日志（替代 Logback） -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-log4j2</artifactId>
</dependency>
```

**(3) 常用 Starter 对比表**

| Starter | 功能 | 主要依赖 | 使用场景 |
|---------|------|----------|----------|
| **spring-boot-starter-web** | Web 开发 | Spring MVC + Tomcat + Jackson | RESTful API、Web 应用 |
| **spring-boot-starter-data-jpa** | JPA/Hibernate | Hibernate + Spring Data JPA | 关系型数据库 ORM |
| **spring-boot-starter-jdbc** | JDBC | DataSource + JdbcTemplate | 直接 JDBC 操作 |
| **spring-boot-starter-data-redis** | Redis | Lettuce + Spring Data Redis | 缓存、分布式锁 |
| **spring-boot-starter-data-mongodb** | MongoDB | MongoDB Driver + Spring Data | NoSQL 数据库 |
| **spring-boot-starter-amqp** | RabbitMQ | RabbitMQ Client + Spring AMQP | 消息队列 |
| **spring-boot-starter-security** | 安全认证 | Spring Security | 登录认证、权限控制 |
| **spring-boot-starter-test** | 测试 | JUnit 5 + Mockito | 单元测试、集成测试 |
| **spring-boot-starter-actuator** | 监控 | Micrometer + Actuator | 应用监控、健康检查 |
| **spring-boot-starter-aop** | AOP | AspectJ | 日志、事务、权限 |
| **spring-boot-starter-validation** | 参数校验 | Hibernate Validator | 参数验证 |
| **spring-boot-starter-cache** | 缓存 | Spring Cache | 方法缓存 |
| **spring-boot-starter-thymeleaf** | 模板引擎 | Thymeleaf | 服务端渲染 |
| **spring-boot-starter-webflux** | 响应式 Web | WebFlux + Netty | 高并发、异步处理 |

**(4) 完整项目示例：使用多个 Starter**

```xml
/**
 * 实战示例：完整的 Spring Boot 项目
 */

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <!-- 继承 Spring Boot Parent -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>demo-app</artifactId>
    <version>1.0.0</version>
    <name>Demo Application</name>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- 1. Web 开发 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- 2. JPA + MySQL -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>

        <!-- 3. Redis 缓存 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>

        <!-- 4. 安全认证 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <!-- 5. 参数校验 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- 6. AOP -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>

        <!-- 7. 监控 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!-- 8. 测试 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <!-- 9. Lombok（代码简化） -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- Spring Boot Maven 插件 -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

```yaml
# application.yml 配置

spring:
  application:
    name: demo-app

  # 数据源配置（spring-boot-starter-data-jpa 自动配置）
  datasource:
    url: jdbc:mysql://localhost:3306/demo?useSSL=false&serverTimezone=UTC
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5

  # JPA 配置（spring-boot-starter-data-jpa 自动配置）
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true

  # Redis 配置（spring-boot-starter-data-redis 自动配置）
  redis:
    host: localhost
    port: 6379
    password:
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0

  # 缓存配置（spring-boot-starter-cache 自动配置）
  cache:
    type: redis
    redis:
      time-to-live: 600000  # 10 分钟

  # Security 配置（spring-boot-starter-security 自动配置）
  security:
    user:
      name: admin
      password: admin123

# 监控配置（spring-boot-starter-actuator 自动配置）
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,env
  endpoint:
    health:
      show-details: always

# 服务器配置（spring-boot-starter-web 自动配置）
server:
  port: 8080
  tomcat:
    max-threads: 200

# 日志配置（spring-boot-starter-logging 自动配置）
logging:
  level:
    root: INFO
    com.example.demo: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
```

```java
// 主启动类
@SpringBootApplication
@EnableCaching  // 启用缓存（spring-boot-starter-cache）
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

// 实体类（spring-boot-starter-data-jpa）
@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "用户名不能为空")  // spring-boot-starter-validation
    @Column(nullable = false, unique = true)
    private String username;

    @Email(message = "邮箱格式不正确")  // spring-boot-starter-validation
    private String email;

    @Min(value = 0, message = "年龄不能小于0")
    private Integer age;
}

// Repository 层（spring-boot-starter-data-jpa）
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

// Service 层
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;  // spring-boot-starter-data-redis

    /**
     * 查询用户（带缓存）
     * spring-boot-starter-cache 自动配置
     */
    @Cacheable(value = "users", key = "#id")
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("用户不存在"));
    }

    /**
     * 创建用户
     */
    @CacheEvict(value = "users", allEntries = true)
    public User createUser(@Valid User user) {
        return userRepository.save(user);
    }
}

// Controller 层（spring-boot-starter-web）
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@Valid @RequestBody User user) {
        return userService.createUser(user);
    }
}

// AOP 日志切面（spring-boot-starter-aop）
@Aspect
@Component
public class LoggingAspect {

    @Around("execution(* com.example.demo.controller.*.*(..))")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();

        Object result = joinPoint.proceed();

        long duration = System.currentTimeMillis() - startTime;
        System.out.println("方法 " + joinPoint.getSignature() + " 执行时间: " + duration + "ms");

        return result;
    }
}

// 安全配置（spring-boot-starter-security）
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(Customizer.withDefaults());

        return http.build();
    }
}

// 测试类（spring-boot-starter-test）
@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    void testGetUserById() {
        User user = userService.getUserById(1L);
        assertNotNull(user);
        assertEquals("john", user.getUsername());
    }
}
```

**(5) Starter 的命名规范**

```java
/**
 * Starter 命名规范
 */

// 1. 官方 Starter 命名: spring-boot-starter-*
spring-boot-starter-web          // Web 开发
spring-boot-starter-data-jpa     // JPA
spring-boot-starter-security     // 安全

// 2. 第三方 Starter 命名: *-spring-boot-starter
mybatis-spring-boot-starter      // MyBatis
druid-spring-boot-starter        // Druid 连接池
pagehelper-spring-boot-starter   // PageHelper 分页

// 3. 自定义 Starter 命名（推荐使用第三方命名规范）
mycompany-spring-boot-starter    // 公司内部 Starter
```

**(6) 查看 Starter 包含的依赖**

```bash
# 方式 1: 使用 Maven 命令查看依赖树
mvn dependency:tree

# 示例输出:
# [INFO] +- org.springframework.boot:spring-boot-starter-web:jar:3.2.0:compile
# [INFO] |  +- org.springframework.boot:spring-boot-starter:jar:3.2.0:compile
# [INFO] |  |  +- org.springframework.boot:spring-boot:jar:3.2.0:compile
# [INFO] |  |  +- org.springframework.boot:spring-boot-autoconfigure:jar:3.2.0:compile
# [INFO] |  |  +- org.springframework.boot:spring-boot-starter-logging:jar:3.2.0:compile
# [INFO] |  +- org.springframework.boot:spring-boot-starter-tomcat:jar:3.2.0:compile
# [INFO] |  |  +- org.apache.tomcat.embed:tomcat-embed-core:jar:10.1.15:compile
# [INFO] |  +- org.springframework:spring-web:jar:6.1.1:compile
# [INFO] |  +- org.springframework:spring-webmvc:jar:6.1.1:compile

# 方式 2: 查看 Starter 的 pom.xml
# 访问 Maven 仓库查看 Starter 的完整依赖列表
# https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web

# 方式 3: 在 IDE 中查看
# IDEA: 右键项目 → Diagrams → Show Dependencies
# Eclipse: 右键 pom.xml → Maven → Show Dependency Hierarchy
```

**(7) Starter 的版本管理**

```xml
/**
 * Starter 版本管理机制
 */

<!-- 方式 1: 继承 spring-boot-starter-parent（推荐） -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

<dependencies>
    <!-- 无需指定版本，由 parent 统一管理 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>

<!-- 方式 2: 使用 dependencyManagement（parent 不能继承时） -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>3.2.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <!-- 同样无需指定版本 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>

<!-- 方式 3: 覆盖默认版本 -->
<properties>
    <!-- 覆盖 MySQL 驱动版本 -->
    <mysql.version>8.0.33</mysql.version>

    <!-- 覆盖 Tomcat 版本 -->
    <tomcat.version>10.1.15</tomcat.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- 明确指定版本（不推荐） -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.30</version>
    </dependency>
</dependencies>
```

**关键要点**

1. **Starter 定义**
   - 预定义的依赖描述符
   - 聚合相关依赖
   - 包含自动配置类
   - 提供默认配置

2. **主要优势**
   - 简化依赖管理（一个依赖解决所有问题）
   - 统一版本管理（避免版本冲突）
   - 自动配置（开箱即用）
   - 模块化设计（按需引入）

3. **常用 Starter**
   - Web: spring-boot-starter-web
   - 数据访问: spring-boot-starter-data-jpa
   - 缓存: spring-boot-starter-data-redis
   - 安全: spring-boot-starter-security
   - 测试: spring-boot-starter-test
   - 监控: spring-boot-starter-actuator

4. **命名规范**
   - 官方: spring-boot-starter-*
   - 第三方: *-spring-boot-starter
   - 自定义: 遵循第三方规范

5. **版本管理**
   - 继承 spring-boot-starter-parent
   - 或使用 spring-boot-dependencies
   - 通过 properties 覆盖版本
   - 避免手动指定版本

**记忆口诀**

**"Starter 依赖聚合器,一个引入全搞定;版本管理不用愁,自动配置开箱用;Web JPA Redis 常用,命名规范要遵守"**

- **Starter 依赖聚合器**: Starter 将相关依赖打包在一起
- **一个引入全搞定**: 一个 Starter 解决所有相关依赖
- **版本管理不用愁**: parent 统一管理版本
- **自动配置开箱用**: 包含自动配置类，开箱即用
- **Web JPA Redis 常用**: 常用的 Starter
- **命名规范要遵守**: 官方 spring-boot-starter-*，第三方 *-spring-boot-starter

### 43. 如何自定义 Starter？

**核心答案**

自定义 Starter 需要创建一个**独立的 Maven 模块**,包含**自动配置类**、**配置属性类**和 **spring.factories** 文件,让其他项目可以通过引入这个 Starter 依赖来自动集成功能。

**自定义 Starter 核心组件:**

| 组件 | 作用 | 必需 |
|-----|------|------|
| **pom.xml** | 定义依赖和打包方式 | ✓ |
| **spring.factories** | 注册自动配置类 | ✓ |
| **AutoConfiguration 类** | 自动配置逻辑 | ✓ |
| **Properties 类** | 外部化配置属性 | ✓ |
| **核心功能类** | 实际业务功能 | ✓ |
| **spring-configuration-metadata.json** | 配置提示（IDE 支持） | ✗ |

**自定义 Starter 创建流程:**

<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">自定义 Spring Boot Starter 创建流程</text>
<rect x="300" y="70" width="300" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">1. 创建 Maven 项目</text>
<text x="450" y="115" font-size="11" text-anchor="middle" fill="#fff">xxx-spring-boot-starter</text>
<line x1="450" y1="130" x2="450" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="170" width="300" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="450" y="195" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">2. 定义核心功能类</text>
<text x="450" y="215" font-size="11" text-anchor="middle" fill="#fff">Service、Client、Template 等</text>
<line x1="450" y1="230" x2="450" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="270" width="300" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="295" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">3. 创建 Properties 类</text>
<text x="450" y="315" font-size="11" text-anchor="middle" fill="#fff">@ConfigurationProperties</text>
<line x1="450" y1="330" x2="450" y2="370" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="370" width="300" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="450" y="395" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">4. 创建 AutoConfiguration 类</text>
<text x="450" y="415" font-size="11" text-anchor="middle" fill="#fff">@Configuration + @Conditional</text>
<line x1="450" y1="430" x2="450" y2="470" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="470" width="300" height="60" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="450" y="495" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">5. 创建 spring.factories</text>
<text x="450" y="515" font-size="11" text-anchor="middle" fill="#fff">META-INF/spring.factories</text>
<line x1="450" y1="530" x2="450" y2="570" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="570" width="300" height="60" fill="#00bcd4" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="450" y="595" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">6. 打包并使用</text>
<text x="450" y="615" font-size="11" text-anchor="middle" fill="#fff">mvn install → 引入依赖</text>
<rect x="100" y="370" width="180" height="60" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="190" y="395" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">可选:</text>
<text x="190" y="415" font-size="10" text-anchor="middle" fill="#fff">配置元数据文件</text>
<line x1="280" y1="400" x2="290" y2="400" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
<rect x="620" y="370" width="180" height="60" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="710" y="395" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">可选:</text>
<text x="710" y="415" font-size="10" text-anchor="middle" fill="#fff">单元测试</text>
<line x1="610" y1="400" x2="600" y2="400" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
<text x="450" y="680" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">命名规范: xxx-spring-boot-starter (第三方) 或 spring-boot-starter-xxx (官方)</text>
</svg>

**详细说明**

**(1) 创建 Starter 项目结构**

```bash
# Starter 项目目录结构
my-spring-boot-starter/
├── pom.xml                                          # Maven 配置
└── src/
    └── main/
        ├── java/
        │   └── com.example.starter/
        │       ├── MyServiceAutoConfiguration.java  # 自动配置类
        │       ├── MyServiceProperties.java         # 配置属性类
        │       └── MyService.java                   # 核心功能类
        └── resources/
            └── META-INF/
                ├── spring.factories                 # 自动配置注册
                └── spring-configuration-metadata.json  # 配置元数据(可选)
```

**(2) Step 1: 创建 pom.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <!-- 项目信息 -->
    <groupId>com.example</groupId>
    <artifactId>my-spring-boot-starter</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>My Spring Boot Starter</name>
    <description>Custom Spring Boot Starter for MyService</description>

    <!-- 继承 Spring Boot Parent（可选，但推荐） -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <properties>
        <java.version>17</java.version>
        <spring-boot.version>3.2.0</spring-boot.version>
    </properties>

    <dependencies>
        <!-- Spring Boot 自动配置核心依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-autoconfigure</artifactId>
        </dependency>

        <!-- 配置属性注解处理器（生成配置元数据，提供 IDE 提示） -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Lombok（可选，简化代码） -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- 你的业务依赖（示例：HTTP 客户端） -->
        <dependency>
            <groupId>org.apache.httpcomponents.client5</groupId>
            <artifactId>httpclient5</artifactId>
            <version>5.2.1</version>
        </dependency>

        <!-- 测试依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- 不需要 spring-boot-maven-plugin，因为这是 Starter，不是应用 -->
        </plugins>
    </build>
</project>
```

**(3) Step 2: 创建核心功能类**

```java
/**
 * 核心功能类：MyService
 * 提供实际业务功能
 */
package com.example.starter;

import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.io.entity.EntityUtils;

public class MyService {

    private final MyServiceProperties properties;
    private final CloseableHttpClient httpClient;

    public MyService(MyServiceProperties properties) {
        this.properties = properties;
        this.httpClient = HttpClients.createDefault();
    }

    /**
     * 发送 HTTP GET 请求
     */
    public String get(String path) {
        String url = properties.getBaseUrl() + path;

        try {
            HttpGet request = new HttpGet(url);

            // 设置超时
            request.setHeader("Connection", "timeout=" + properties.getTimeout());

            // 执行请求
            return httpClient.execute(request, response -> {
                int statusCode = response.getCode();

                if (statusCode >= 200 && statusCode < 300) {
                    return EntityUtils.toString(response.getEntity());
                } else {
                    throw new RuntimeException("HTTP Error: " + statusCode);
                }
            });

        } catch (Exception e) {
            throw new RuntimeException("Request failed: " + e.getMessage(), e);
        }
    }

    /**
     * 发送 HTTP POST 请求
     */
    public String post(String path, String body) {
        String url = properties.getBaseUrl() + path;
        // POST 实现...
        return "POST result from " + url;
    }

    /**
     * 健康检查
     */
    public boolean isHealthy() {
        try {
            String result = get("/health");
            return result != null && result.contains("OK");
        } catch (Exception e) {
            return false;
        }
    }
}
```

**(4) Step 3: 创建配置属性类**

```java
/**
 * 配置属性类：MyServiceProperties
 * 定义外部化配置
 */
package com.example.starter;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "myservice")
public class MyServiceProperties {

    /**
     * 是否启用 MyService
     */
    private boolean enabled = true;

    /**
     * 服务基础 URL
     */
    private String baseUrl = "http://localhost:8080";

    /**
     * 超时时间（毫秒）
     */
    private int timeout = 5000;

    /**
     * 重试次数
     */
    private int retryCount = 3;

    /**
     * 是否启用日志
     */
    private boolean logging = false;

    /**
     * 连接池配置
     */
    private Pool pool = new Pool();

    @Data
    public static class Pool {
        /**
         * 最大连接数
         */
        private int maxConnections = 10;

        /**
         * 最小空闲连接数
         */
        private int minIdle = 2;

        /**
         * 最大等待时间（毫秒）
         */
        private long maxWaitMillis = 3000;
    }
}
```

**(5) Step 4: 创建自动配置类**

```java
/**
 * 自动配置类：MyServiceAutoConfiguration
 * 核心自动配置逻辑
 */
package com.example.starter;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

/**
 * @AutoConfiguration: Spring Boot 3.x 新注解，替代 @Configuration
 * @ConditionalOnClass: 类路径存在 MyService 类时才配置
 * @ConditionalOnProperty: myservice.enabled=true 时才配置
 * @EnableConfigurationProperties: 启用 MyServiceProperties
 */
@AutoConfiguration
@ConditionalOnClass(MyService.class)
@ConditionalOnProperty(
    prefix = "myservice",
    name = "enabled",
    havingValue = "true",
    matchIfMissing = true  // 配置不存在时默认为 true
)
@EnableConfigurationProperties(MyServiceProperties.class)
public class MyServiceAutoConfiguration {

    /**
     * 创建 MyService Bean
     * @ConditionalOnMissingBean: 用户没有自定义 MyService 时才创建
     */
    @Bean
    @ConditionalOnMissingBean
    public MyService myService(MyServiceProperties properties) {
        MyService service = new MyService(properties);

        if (properties.isLogging()) {
            System.out.println("MyService initialized with baseUrl: " + properties.getBaseUrl());
        }

        return service;
    }

    /**
     * 可选: 创建其他相关 Bean
     */
    @Bean
    @ConditionalOnMissingBean
    @ConditionalOnProperty(prefix = "myservice", name = "health-check", havingValue = "true")
    public MyServiceHealthIndicator myServiceHealthIndicator(MyService myService) {
        return new MyServiceHealthIndicator(myService);
    }
}
```

```java
/**
 * 可选: 健康检查指示器
 */
package com.example.starter;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;

public class MyServiceHealthIndicator implements HealthIndicator {

    private final MyService myService;

    public MyServiceHealthIndicator(MyService myService) {
        this.myService = myService;
    }

    @Override
    public Health health() {
        try {
            boolean isHealthy = myService.isHealthy();

            if (isHealthy) {
                return Health.up()
                    .withDetail("service", "MyService is running")
                    .build();
            } else {
                return Health.down()
                    .withDetail("service", "MyService is not responding")
                    .build();
            }
        } catch (Exception e) {
            return Health.down()
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}
```

**(6) Step 5: 创建 spring.factories**

```properties
# src/main/resources/META-INF/spring.factories

# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.example.starter.MyServiceAutoConfiguration
```

**Spring Boot 3.x 新方式（推荐）:**

```
# src/main/resources/META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports

# 每行一个自动配置类
com.example.starter.MyServiceAutoConfiguration
```

**(7) Step 6: 创建配置元数据（可选，提供 IDE 提示）**

```json
{
  "groups": [
    {
      "name": "myservice",
      "type": "com.example.starter.MyServiceProperties",
      "sourceType": "com.example.starter.MyServiceProperties"
    },
    {
      "name": "myservice.pool",
      "type": "com.example.starter.MyServiceProperties$Pool",
      "sourceType": "com.example.starter.MyServiceProperties",
      "sourceMethod": "getPool()"
    }
  ],
  "properties": [
    {
      "name": "myservice.enabled",
      "type": "java.lang.Boolean",
      "description": "是否启用 MyService",
      "defaultValue": true
    },
    {
      "name": "myservice.base-url",
      "type": "java.lang.String",
      "description": "服务基础 URL",
      "defaultValue": "http://localhost:8080"
    },
    {
      "name": "myservice.timeout",
      "type": "java.lang.Integer",
      "description": "超时时间（毫秒）",
      "defaultValue": 5000
    },
    {
      "name": "myservice.retry-count",
      "type": "java.lang.Integer",
      "description": "重试次数",
      "defaultValue": 3
    },
    {
      "name": "myservice.logging",
      "type": "java.lang.Boolean",
      "description": "是否启用日志",
      "defaultValue": false
    },
    {
      "name": "myservice.pool.max-connections",
      "type": "java.lang.Integer",
      "description": "最大连接数",
      "defaultValue": 10
    },
    {
      "name": "myservice.pool.min-idle",
      "type": "java.lang.Integer",
      "description": "最小空闲连接数",
      "defaultValue": 2
    },
    {
      "name": "myservice.pool.max-wait-millis",
      "type": "java.lang.Long",
      "description": "最大等待时间（毫秒）",
      "defaultValue": 3000
    }
  ],
  "hints": []
}
```

**(8) Step 7: 打包和使用**

```bash
# 1. 打包 Starter
cd my-spring-boot-starter
mvn clean install

# 2. 在其他项目中使用
```

```xml
<!-- pom.xml -->
<dependencies>
    <!-- 引入自定义 Starter -->
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>my-spring-boot-starter</artifactId>
        <version>1.0.0</version>
    </dependency>
</dependencies>
```

```yaml
# application.yml
myservice:
  enabled: true
  base-url: https://api.example.com
  timeout: 10000
  retry-count: 5
  logging: true
  pool:
    max-connections: 20
    min-idle: 5
```

```java
/**
 * 使用 Starter
 */
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private MyService myService;  // 自动注入

    @GetMapping("/test")
    public String test() {
        // 使用 MyService
        String result = myService.get("/users");
        return result;
    }
}
```

**(9) 完整实战示例：SMS 短信 Starter**

```java
/**
 * 实战示例：创建 SMS 短信 Starter
 */

// 1. 核心功能类
package com.example.starter.sms;

public class SmsService {

    private final SmsProperties properties;

    public SmsService(SmsProperties properties) {
        this.properties = properties;
    }

    /**
     * 发送短信
     */
    public boolean sendSms(String phone, String message) {
        System.out.println("Sending SMS to " + phone);
        System.out.println("Provider: " + properties.getProvider());
        System.out.println("Message: " + message);

        // 根据不同的提供商发送短信
        switch (properties.getProvider()) {
            case ALIYUN:
                return sendByAliyun(phone, message);
            case TENCENT:
                return sendByTencent(phone, message);
            default:
                throw new UnsupportedOperationException("Provider not supported");
        }
    }

    /**
     * 发送验证码
     */
    public boolean sendVerifyCode(String phone, String code) {
        String template = properties.getTemplates().get("verify-code");
        String message = template.replace("{code}", code);
        return sendSms(phone, message);
    }

    private boolean sendByAliyun(String phone, String message) {
        // 阿里云短信发送逻辑
        return true;
    }

    private boolean sendByTencent(String phone, String message) {
        // 腾讯云短信发送逻辑
        return true;
    }
}

// 2. 配置属性类
package com.example.starter.sms;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import java.util.HashMap;
import java.util.Map;

@Data
@ConfigurationProperties(prefix = "sms")
public class SmsProperties {

    /**
     * 是否启用
     */
    private boolean enabled = true;

    /**
     * 服务提供商
     */
    private Provider provider = Provider.ALIYUN;

    /**
     * Access Key
     */
    private String accessKey;

    /**
     * Secret Key
     */
    private String secretKey;

    /**
     * 签名
     */
    private String signature;

    /**
     * 短信模板
     */
    private Map<String, String> templates = new HashMap<>();

    public enum Provider {
        ALIYUN,   // 阿里云
        TENCENT,  // 腾讯云
        HUAWEI    // 华为云
    }
}

// 3. 自动配置类
package com.example.starter.sms;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@AutoConfiguration
@ConditionalOnClass(SmsService.class)
@ConditionalOnProperty(prefix = "sms", name = "enabled", havingValue = "true", matchIfMissing = true)
@EnableConfigurationProperties(SmsProperties.class)
public class SmsAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public SmsService smsService(SmsProperties properties) {
        return new SmsService(properties);
    }
}

// 4. spring.factories 或 AutoConfiguration.imports
// META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports
com.example.starter.sms.SmsAutoConfiguration

// 5. 使用示例
// application.yml
sms:
  enabled: true
  provider: ALIYUN
  access-key: your-access-key
  secret-key: your-secret-key
  signature: 我的应用
  templates:
    verify-code: "您的验证码是{code},5分钟内有效"
    notice: "您有一条新消息:{message}"

// 业务代码
@Service
public class UserService {

    @Autowired
    private SmsService smsService;

    public void registerUser(String phone) {
        // 生成验证码
        String code = generateCode();

        // 发送短信
        smsService.sendVerifyCode(phone, code);
    }

    private String generateCode() {
        return String.valueOf((int)((Math.random() * 9 + 1) * 100000));
    }
}
```

**(10) 单元测试**

```java
/**
 * Starter 单元测试
 */
package com.example.starter;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigurations;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static org.assertj.core.api.Assertions.assertThat;

class MyServiceAutoConfigurationTest {

    private final ApplicationContextRunner contextRunner = new ApplicationContextRunner()
        .withConfiguration(AutoConfigurations.of(MyServiceAutoConfiguration.class));

    /**
     * 测试自动配置生效
     */
    @Test
    void testAutoConfiguration() {
        contextRunner
            .withPropertyValues("myservice.enabled=true")
            .run(context -> {
                assertThat(context).hasSingleBean(MyService.class);
                assertThat(context).hasSingleBean(MyServiceProperties.class);
            });
    }

    /**
     * 测试禁用配置
     */
    @Test
    void testDisabledConfiguration() {
        contextRunner
            .withPropertyValues("myservice.enabled=false")
            .run(context -> {
                assertThat(context).doesNotHaveBean(MyService.class);
            });
    }

    /**
     * 测试自定义配置
     */
    @Test
    void testCustomConfiguration() {
        contextRunner
            .withPropertyValues(
                "myservice.base-url=https://api.example.com",
                "myservice.timeout=10000"
            )
            .run(context -> {
                MyServiceProperties properties = context.getBean(MyServiceProperties.class);
                assertThat(properties.getBaseUrl()).isEqualTo("https://api.example.com");
                assertThat(properties.getTimeout()).isEqualTo(10000);
            });
    }

    /**
     * 测试用户自定义 Bean 优先级
     */
    @Test
    void testUserDefinedBeanTakesPrecedence() {
        contextRunner
            .withUserConfiguration(CustomConfig.class)
            .run(context -> {
                assertThat(context).hasSingleBean(MyService.class);
                MyService service = context.getBean(MyService.class);
                // 验证是自定义的 Bean
                assertThat(service).isNotNull();
            });
    }

    @Configuration
    static class CustomConfig {
        @Bean
        public MyService myService() {
            MyServiceProperties properties = new MyServiceProperties();
            properties.setBaseUrl("https://custom.example.com");
            return new MyService(properties);
        }
    }
}
```

**关键要点**

1. **Starter 组成**
   - pom.xml: 定义依赖
   - 核心功能类: 提供业务功能
   - Properties 类: 外部化配置
   - AutoConfiguration 类: 自动配置逻辑
   - spring.factories: 注册自动配置类

2. **命名规范**
   - 第三方 Starter: xxx-spring-boot-starter
   - 官方 Starter: spring-boot-starter-xxx
   - 不要使用官方命名模式

3. **关键注解**
   - @AutoConfiguration: 标识自动配置类
   - @ConditionalOnClass: 类存在时生效
   - @ConditionalOnMissingBean: Bean 不存在时创建
   - @ConditionalOnProperty: 配置属性匹配时生效
   - @EnableConfigurationProperties: 启用配置属性
   - @ConfigurationProperties: 绑定配置

4. **配置优先级**
   - 用户自定义 Bean > 自动配置 Bean
   - 使用 @ConditionalOnMissingBean 实现

5. **最佳实践**
   - 提供合理的默认值
   - 使用 @ConditionalOnMissingBean 允许覆盖
   - 提供配置元数据（IDE 提示）
   - 编写完善的单元测试
   - 提供详细的文档和示例

**记忆口诀**

**"自定义 Starter 六步走,功能类配置属性有;AutoConfig 条件装配,spring.factories 来注册;打包安装供人用,命名规范要遵守"**

- **自定义 Starter 六步走**: 创建项目、功能类、Properties、AutoConfiguration、spring.factories、打包
- **功能类配置属性有**: 核心功能类和配置属性类
- **AutoConfig 条件装配**: 使用 @AutoConfiguration 和 @Conditional 注解
- **spring.factories 来注册**: 在 spring.factories 中注册自动配置类
- **打包安装供人用**: mvn install 打包后供其他项目使用
- **命名规范要遵守**: 第三方使用 xxx-spring-boot-starter 命名

### 44. Spring Boot 的配置文件有哪些？application.properties 和 application.yml 的区别是什么？

**核心答案**

Spring Boot 支持多种配置文件格式,主要有 **application.properties** 和 **application.yml**（或 application.yaml）两种。yml 格式使用**层级结构**,更简洁易读;properties 格式使用 **key=value** 键值对,更传统直观。两者功能完全相同,可以互相转换,**优先级也相同**（同目录下按字母顺序,properties 在 yml 前面,所以 properties 优先级更高）。

**配置文件对比:**

| 对比项 | application.properties | application.yml |
|-------|------------------------|-----------------|
| **格式** | key=value 键值对 | YAML 层级结构 |
| **层级表示** | 用 `.` 分隔 | 用缩进表示 |
| **数组表示** | 用 `[0]`, `[1]` 索引 | 用 `-` 表示 |
| **可读性** | 配置多时较繁琐 | 结构清晰,易读 |
| **注释** | `#` 或 `!` | `#` |
| **大小写敏感** | ✓ | ✓ |
| **文件大小** | 相对较大 | 相对较小 |
| **IDE 支持** | 较好 | 很好 |
| **优先级** | 高（同目录下） | 低（同目录下） |

**配置文件加载顺序:**

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring Boot 配置文件加载顺序（优先级从高到低）</text>
<rect x="250" y="70" width="400" height="60" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="450" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">1. 命令行参数（最高优先级）</text>
<text x="450" y="115" font-size="11" text-anchor="middle" fill="#fff">--server.port=8081 --spring.profiles.active=prod</text>
<line x1="450" y1="130" x2="450" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="160" width="400" height="50" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="450" y="185" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">2. Java 系统属性（System.getProperties()）</text>
<text x="450" y="200" font-size="10" text-anchor="middle" fill="#fff">-Dserver.port=8081</text>
<line x1="450" y1="210" x2="450" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="240" width="400" height="50" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="450" y="265" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">3. 操作系统环境变量</text>
<text x="450" y="280" font-size="10" text-anchor="middle" fill="#fff">export SERVER_PORT=8081</text>
<line x1="450" y1="290" x2="450" y2="320" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="320" width="400" height="50" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="345" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">4. jar 包外的 application-{profile}.properties/yml</text>
<text x="450" y="360" font-size="10" text-anchor="middle" fill="#fff">./config/application-prod.yml</text>
<line x1="450" y1="370" x2="450" y2="400" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="400" width="400" height="50" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="425" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">5. jar 包外的 application.properties/yml</text>
<text x="450" y="440" font-size="10" text-anchor="middle" fill="#fff">./application.yml</text>
<line x1="450" y1="450" x2="450" y2="480" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="480" width="400" height="50" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="505" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">6. jar 包内的 application-{profile}.properties/yml</text>
<text x="450" y="520" font-size="10" text-anchor="middle" fill="#fff">classpath:/application-prod.yml</text>
<line x1="450" y1="530" x2="450" y2="560" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="560" width="400" height="50" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="585" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">7. jar 包内的 application.properties/yml（最低优先级）</text>
<text x="450" y="600" font-size="10" text-anchor="middle" fill="#fff">classpath:/application.yml</text>
<text x="450" y="635" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">配置合并原则：高优先级配置覆盖低优先级配置，未设置的属性互补</text>
</svg>

**详细说明**

**(1) application.properties 格式**

```properties
# application.properties

# ========== 服务器配置 ==========
server.port=8080
server.servlet.context-path=/api
server.tomcat.max-threads=200

# ========== 数据源配置 ==========
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# 连接池配置
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=20000

# ========== JPA 配置 ==========
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# ========== Redis 配置 ==========
spring.redis.host=localhost
spring.redis.port=6379
spring.redis.password=
spring.redis.lettuce.pool.max-active=8

# ========== 日志配置 ==========
logging.level.root=INFO
logging.level.com.example.demo=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n

# ========== 数组配置 ==========
my.servers[0]=dev.example.com
my.servers[1]=test.example.com
my.servers[2]=prod.example.com

# ========== Map 配置 ==========
my.users.admin=admin@example.com
my.users.developer=dev@example.com
```

**(2) application.yml 格式**

```yaml
# application.yml

# ========== 服务器配置 ==========
server:
  port: 8080
  servlet:
    context-path: /api
  tomcat:
    max-threads: 200

# ========== 数据源配置 ==========
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 20000

  # ========== JPA 配置 ==========
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true

  # ========== Redis 配置 ==========
  redis:
    host: localhost
    port: 6379
    password:
    lettuce:
      pool:
        max-active: 8

# ========== 日志配置 ==========
logging:
  level:
    root: INFO
    com.example.demo: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"

# ========== 数组配置 ==========
my:
  servers:
    - dev.example.com
    - test.example.com
    - prod.example.com

  # ========== Map 配置 ==========
  users:
    admin: admin@example.com
    developer: dev@example.com
```

**(3) properties 和 yml 对比示例**

```properties
# ========== properties 格式：复杂配置示例 ==========

# 1. 简单属性
app.name=MyApp
app.version=1.0.0

# 2. 嵌套属性（用 . 分隔）
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=root
spring.datasource.password=password

# 3. 数组/List（用索引）
app.hosts[0]=host1.example.com
app.hosts[1]=host2.example.com
app.hosts[2]=host3.example.com

# 4. Map（用 . 连接 key）
app.users.admin=admin@example.com
app.users.developer=dev@example.com
app.users.tester=test@example.com

# 5. 复杂对象
app.database.primary.host=localhost
app.database.primary.port=3306
app.database.primary.username=root
app.database.secondary.host=slave.example.com
app.database.secondary.port=3307
app.database.secondary.username=readonly

# 6. 多行文本（需要用反斜杠连接）
app.description=This is a long description \
  that spans multiple lines \
  in the properties file
```

```yaml
# ========== yml 格式：相同配置（更清晰） ==========

# 1. 简单属性
app:
  name: MyApp
  version: 1.0.0

  # 2. 嵌套属性（用缩进表示）
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: password

  # 3. 数组/List（用 - 表示）
app:
  hosts:
    - host1.example.com
    - host2.example.com
    - host3.example.com

  # 4. Map（直接键值对）
  users:
    admin: admin@example.com
    developer: dev@example.com
    tester: test@example.com

  # 5. 复杂对象
  database:
    primary:
      host: localhost
      port: 3306
      username: root
    secondary:
      host: slave.example.com
      port: 3307
      username: readonly

  # 6. 多行文本（使用 | 或 >）
  description: |
    This is a long description
    that spans multiple lines
    in the YAML file
```

**(4) 配置文件位置和优先级**

```java
/**
 * Spring Boot 配置文件加载位置（优先级从高到低）
 */

// 1. file:./config/          (项目根目录的 config 子目录)
// 2. file:./                 (项目根目录)
// 3. classpath:/config/      (类路径的 config 目录)
// 4. classpath:/             (类路径根目录)

// 项目结构示例:
myapp/
├── config/
│   └── application.yml         # 优先级 1 (最高)
├── application.yml             # 优先级 2
├── src/
│   └── main/
│       └── resources/
│           ├── config/
│           │   └── application.yml  # 优先级 3
│           └── application.yml      # 优先级 4 (最低)
└── pom.xml

/**
 * 同一目录下多个配置文件的优先级
 */

// 同一目录下:
// 1. application.properties   (优先级高)
// 2. application.yml          (优先级低)

// 原因: 按字母顺序加载，properties 在 yml 前面

/**
 * Profile 配置文件优先级
 */

// 激活 prod profile: --spring.profiles.active=prod

// 加载顺序:
// 1. application-prod.properties  (profile 专用配置，优先级高)
// 2. application-prod.yml
// 3. application.properties       (通用配置，优先级低)
// 4. application.yml
```

**(5) 多环境配置**

```yaml
# ========== application.yml (通用配置) ==========
spring:
  application:
    name: myapp

# 激活的 profile
spring:
  profiles:
    active: dev  # dev, test, prod

server:
  port: 8080

# ========== application-dev.yml (开发环境) ==========
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test_dev
    username: root
    password: dev123

  redis:
    host: localhost
    port: 6379

logging:
  level:
    root: DEBUG

# ========== application-test.yml (测试环境) ==========
spring:
  datasource:
    url: jdbc:mysql://test.example.com:3306/test_test
    username: test_user
    password: test123

  redis:
    host: redis-test.example.com
    port: 6379

logging:
  level:
    root: INFO

# ========== application-prod.yml (生产环境) ==========
spring:
  datasource:
    url: jdbc:mysql://prod.example.com:3306/test_prod
    username: prod_user
    password: prod_secure_password

  redis:
    host: redis-prod.example.com
    port: 6380
    password: redis_password

logging:
  level:
    root: WARN
```

```bash
# 启动时指定 profile
java -jar myapp.jar --spring.profiles.active=prod

# 或使用环境变量
export SPRING_PROFILES_ACTIVE=prod
java -jar myapp.jar

# 或使用 JVM 参数
java -Dspring.profiles.active=prod -jar myapp.jar
```

**(6) YAML 高级特性**

```yaml
# ========== 1. 多文档分隔（同一个文件中定义多个 profile） ==========

# 通用配置
spring:
  application:
    name: myapp

---
# dev 环境
spring:
  config:
    activate:
      on-profile: dev

  datasource:
    url: jdbc:mysql://localhost:3306/dev

---
# prod 环境
spring:
  config:
    activate:
      on-profile: prod

  datasource:
    url: jdbc:mysql://prod.example.com:3306/prod

# ========== 2. 锚点和引用（避免重复配置） ==========

# 定义锚点
defaults: &defaults
  timeout: 30
  retry: 3

# 引用锚点
service-a:
  <<: *defaults  # 继承 defaults
  name: ServiceA

service-b:
  <<: *defaults
  name: ServiceB
  timeout: 60  # 覆盖默认值

# ========== 3. 多行文本 ==========

# 保留换行符（literal style）
description: |
  This is line 1
  This is line 2
  This is line 3

# 折叠换行符（folded style）
summary: >
  This is a long text
  that will be folded
  into a single line

# ========== 4. 特殊字符 ==========

# 包含特殊字符时使用引号
password: "pass:word"
message: 'It''s a message'
path: "C:\\Windows\\System32"

# ========== 5. 布尔值 ==========

# YAML 支持多种布尔值表示
enabled: true      # true
disabled: false    # false
flag1: yes         # true
flag2: no          # false
flag3: on          # true
flag4: off         # false

# ========== 6. null 值 ==========

# 表示 null
value1: null
value2: ~
value3:           # 空值也表示 null
```

**(7) 读取配置属性**

```java
/**
 * 方式 1: @Value 注解（读取简单属性）
 */
@Component
public class AppConfig {

    @Value("${server.port}")
    private int port;

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${app.name:MyApp}")  // 提供默认值
    private String appName;

    // 数组
    @Value("${my.servers}")
    private List<String> servers;
}

/**
 * 方式 2: @ConfigurationProperties（读取复杂对象，推荐）
 */
@Data
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private String name;
    private String version;
    private List<String> hosts;
    private Map<String, String> users;
    private Database database;

    @Data
    public static class Database {
        private Primary primary;
        private Secondary secondary;

        @Data
        public static class Primary {
            private String host;
            private int port;
            private String username;
        }

        @Data
        public static class Secondary {
            private String host;
            private int port;
            private String username;
        }
    }
}

// 使用
@Service
public class MyService {

    @Autowired
    private AppProperties appProperties;

    public void doSomething() {
        String appName = appProperties.getName();
        String primaryHost = appProperties.getDatabase().getPrimary().getHost();
    }
}

/**
 * 方式 3: Environment（动态读取）
 */
@Component
public class ConfigReader {

    @Autowired
    private Environment env;

    public void readConfig() {
        String port = env.getProperty("server.port");
        String url = env.getProperty("spring.datasource.url");

        // 带默认值
        String appName = env.getProperty("app.name", "DefaultApp");

        // 读取并转换类型
        Integer timeout = env.getProperty("app.timeout", Integer.class, 30);
    }
}
```

**(8) 外部配置文件**

```java
/**
 * 指定外部配置文件
 */

// 方式 1: 命令行参数
java -jar myapp.jar --spring.config.location=file:/path/to/config/

// 方式 2: 环境变量
export SPRING_CONFIG_LOCATION=file:/path/to/config/
java -jar myapp.jar

// 方式 3: @PropertySource 注解
@Configuration
@PropertySource("classpath:custom.properties")
@PropertySource("file:/external/config.properties")
public class CustomConfig {
    // ...
}

// 方式 4: spring.config.additional-location（追加配置位置）
java -jar myapp.jar \
  --spring.config.additional-location=file:/path/to/additional/
```

**(9) 配置加密（敏感信息保护）**

```yaml
# 使用 jasypt-spring-boot-starter 加密敏感配置

# 1. 添加依赖
# <dependency>
#   <groupId>com.github.ulisesbocchio</groupId>
#   <artifactId>jasypt-spring-boot-starter</artifactId>
#   <version>3.0.5</version>
# </dependency>

# 2. 加密配置
spring:
  datasource:
    username: root
    password: ENC(encrypted_password_here)  # 加密后的密码

  redis:
    password: ENC(encrypted_redis_password)

# 3. 启动时提供密钥
java -jar myapp.jar --jasypt.encryptor.password=mySecretKey
```

**(10) 配置优先级完整示例**

```java
/**
 * 配置优先级完整示例
 */

// 假设以下配置同时存在:

// 1. classpath:/application.yml
server:
  port: 8080

// 2. classpath:/application-dev.yml
server:
  port: 8081

// 3. file:./config/application.yml
server:
  port: 8082

// 4. 命令行参数
--server.port=8083

// 5. 环境变量
export SERVER_PORT=8084

// 最终结果:
// - 如果有命令行参数: 8083 (最高优先级)
// - 如果没有命令行但有环境变量: 8084
// - 如果没有以上两者: 8082 (file:./config/)
// - 如果 config 目录不存在: 8081 (激活 dev profile)
// - 如果没有激活 profile: 8080 (默认配置)
```

**关键要点**

1. **配置文件格式**
   - properties: key=value 键值对格式
   - yml: 层级结构,使用缩进
   - yaml: yml 的另一种扩展名

2. **主要区别**
   - 可读性: yml 更清晰,层级分明
   - 数组表示: properties 用索引,yml 用 `-`
   - 文件大小: yml 相对更小
   - 优先级: 同目录下 properties > yml

3. **配置位置优先级**
   - file:./config/ (最高)
   - file:./
   - classpath:/config/
   - classpath:/ (最低)

4. **配置覆盖原则**
   - 命令行参数 > 系统属性 > 环境变量 > 配置文件
   - 外部配置文件 > 内部配置文件
   - profile 专用配置 > 通用配置

5. **最佳实践**
   - 开发环境推荐 yml（结构清晰）
   - 简单配置可用 properties
   - 敏感信息使用加密或环境变量
   - 使用 profile 管理多环境
   - 使用 @ConfigurationProperties 读取复杂配置

**记忆口诀**

**"properties 键值对,yml 层级更清晰;同目录 properties 优先,外部配置把内替;命令行参数最优先,Profile 专用胜通用"**

- **properties 键值对**: properties 使用 key=value 格式
- **yml 层级更清晰**: yml 使用缩进表示层级,更清晰
- **同目录 properties 优先**: 同目录下 properties 优先级高于 yml
- **外部配置把内替**: 外部配置文件优先级高于内部
- **命令行参数最优先**: 命令行参数优先级最高
- **Profile 专用胜通用**: Profile 专用配置优先于通用配置

### 45. 如何实现配置文件的热加载？

**核心答案**

Spring Boot 配置文件热加载可以通过以下方式实现：**Spring Cloud Config + Spring Cloud Bus**（分布式配置）、**@RefreshScope + Actuator**（单应用刷新）、**spring-boot-devtools**（开发环境自动重启）、或使用 **Nacos/Apollo** 等配置中心。最常用的是 **@RefreshScope + Actuator refresh 端点**，通过 POST 请求触发配置刷新。

**配置热加载方案对比:**

| 方案 | 适用场景 | 优点 | 缺点 |
|-----|---------|------|------|
| **@RefreshScope + Actuator** | 单应用 | 简单，无需额外组件 | 需要手动触发 |
| **Spring Cloud Config + Bus** | 微服务集群 | 自动推送，集中管理 | 需要额外组件 |
| **spring-boot-devtools** | 开发环境 | 自动重启 | 仅限开发，会重启应用 |
| **Nacos/Apollo** | 生产环境 | 功能强大，实时推送 | 需要部署配置中心 |
| **文件监听 + 手动刷新** | 简单场景 | 灵活 | 需要自己实现 |

**配置热加载原理:**

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring Boot 配置热加载流程（@RefreshScope）</text>
<rect x="100" y="70" width="180" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="190" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">1. 修改配置文件</text>
<text x="190" y="115" font-size="11" text-anchor="middle" fill="#fff">application.yml</text>
<line x1="280" y1="100" x2="350" y2="100" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="350" y="70" width="180" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="440" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">2. 触发刷新</text>
<text x="440" y="115" font-size="11" text-anchor="middle" fill="#fff">POST /actuator/refresh</text>
<line x1="530" y1="100" x2="600" y2="100" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="600" y="70" width="180" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="690" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">3. Environment 刷新</text>
<text x="690" y="115" font-size="11" text-anchor="middle" fill="#fff">重新加载配置</text>
<line x1="690" y1="130" x2="690" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="600" y="180" width="180" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="690" y="205" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">4. 发布 RefreshEvent</text>
<text x="690" y="225" font-size="11" text-anchor="middle" fill="#fff">EnvironmentChangeEvent</text>
<line x1="600" y1="210" x2="540" y2="210" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="350" y="180" width="180" height="60" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="440" y="205" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">5. 销毁 @RefreshScope Bean</text>
<text x="440" y="225" font-size="11" text-anchor="middle" fill="#fff">清除缓存</text>
<line x1="350" y1="210" x2="290" y2="210" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="180" width="180" height="60" fill="#00bcd4" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="190" y="205" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">6. 重新创建 Bean</text>
<text x="190" y="225" font-size="11" text-anchor="middle" fill="#fff">使用新配置</text>
<line x1="190" y1="240" x2="190" y2="290" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="290" width="180" height="60" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="190" y="315" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">7. 配置生效</text>
<text x="190" y="335" font-size="11" text-anchor="middle" fill="#fff">Bean 使用新配置</text>
<rect x="350" y="290" width="430" height="80" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="565" y="320" font-size="13" font-weight="bold" text-anchor="middle" fill="#333">@RefreshScope 作用域</text>
<text x="565" y="340" font-size="10" text-anchor="middle" fill="#333">• 标记的 Bean 会被代理</text>
<text x="565" y="355" font-size="10" text-anchor="middle" fill="#333">• RefreshEvent 触发时销毁并重新创建</text>
<rect x="100" y="390" width="680" height="80" fill="#e1f5fe" stroke="#01579b" stroke-width="2" rx="5"/>
<text x="440" y="420" font-size="13" font-weight="bold" text-anchor="middle" fill="#333">不支持热加载的场景</text>
<text x="440" y="440" font-size="10" text-anchor="middle" fill="#333">• @Value 注入的简单类型（需要配合 @RefreshScope）</text>
<text x="440" y="455" font-size="10" text-anchor="middle" fill="#333">• @ConfigurationProperties 在非 @RefreshScope Bean 中（需要添加 @RefreshScope）</text>
<rect x="100" y="490" width="680" height="80" fill="#fff3e0" stroke="#e65100" stroke-width="2" rx="5"/>
<text x="440" y="520" font-size="13" font-weight="bold" text-anchor="middle" fill="#333">注意事项</text>
<text x="440" y="540" font-size="10" text-anchor="middle" fill="#333">• 只能刷新配置文件中的配置，不能刷新 Java 代码</text>
<text x="440" y="555" font-size="10" text-anchor="middle" fill="#333">• @RefreshScope 会增加一定的性能开销（代理）</text>
<text x="450" y="620" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">核心机制：通过销毁并重新创建 Bean 来实现配置更新</text>
</svg>

**详细说明**

**(1) 方案 1: @RefreshScope + Actuator（推荐）**

```xml
<!-- pom.xml -->
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Actuator（提供 refresh 端点） -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>

    <!-- Spring Cloud Context（提供 @RefreshScope） -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-context</artifactId>
        <version>4.1.0</version>
    </dependency>
</dependencies>
```

```yaml
# application.yml

# 配置项（会被热加载）
app:
  name: MyApp
  version: 1.0.0
  timeout: 30
  max-retry: 3

# Actuator 配置
management:
  endpoints:
    web:
      exposure:
        include: refresh  # 暴露 refresh 端点
  endpoint:
    refresh:
      enabled: true
```

```java
/**
 * 使用 @RefreshScope 实现配置热加载
 */

// 1. 配置属性类（支持热加载）
@Data
@Component
@RefreshScope  // 关键注解：标记此 Bean 可以被刷新
@ConfigurationProperties(prefix = "app")
public class AppConfig {

    private String name;
    private String version;
    private int timeout;
    private int maxRetry;
}

// 2. 使用配置的 Bean（支持热加载）
@Service
@RefreshScope  // 关键注解：标记此 Bean 可以被刷新
public class AppService {

    @Value("${app.name}")
    private String appName;

    @Value("${app.timeout}")
    private int timeout;

    @Autowired
    private AppConfig appConfig;  // 也支持热加载

    public String getInfo() {
        return String.format("App: %s, Timeout: %d, Config: %s",
            appName, timeout, appConfig.getName());
    }
}

// 3. Controller（测试配置热加载）
@RestController
@RequestMapping("/api")
public class ConfigController {

    @Autowired
    private AppService appService;

    @GetMapping("/config")
    public String getConfig() {
        return appService.getInfo();
    }
}

// 4. 触发配置刷新
// 修改 application.yml 中的配置后，执行以下命令:
// curl -X POST http://localhost:8080/actuator/refresh

// 5. 响应示例
// [
//   "app.name",
//   "app.timeout"
// ]
// 返回的是发生变化的配置项
```

**(2) 方案 2: Spring Cloud Config + Spring Cloud Bus（微服务）**

```xml
<!-- pom.xml -->
<dependencies>
    <!-- Spring Cloud Config Client -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-config</artifactId>
    </dependency>

    <!-- Spring Cloud Bus（消息总线） -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-bus-amqp</artifactId>
    </dependency>

    <!-- RabbitMQ -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-amqp</artifactId>
    </dependency>
</dependencies>
```

```yaml
# bootstrap.yml（优先级高于 application.yml）

spring:
  application:
    name: myapp

  # Config Server 配置
  cloud:
    config:
      uri: http://localhost:8888  # Config Server 地址
      profile: dev
      label: master

  # RabbitMQ 配置（用于消息总线）
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest

# Actuator 配置
management:
  endpoints:
    web:
      exposure:
        include: bus-refresh  # 暴露 bus-refresh 端点
```

```java
/**
 * Spring Cloud Config + Bus 自动刷新
 */

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

@RestController
@RefreshScope  // 标记支持热加载
public class ConfigController {

    @Value("${app.name}")
    private String appName;

    @GetMapping("/config")
    public String getConfig() {
        return "App Name: " + appName;
    }
}

/**
 * 配置刷新流程:
 * 1. 修改 Config Server 中的配置文件（Git 仓库）
 * 2. 发送刷新请求到任意一个实例:
 *    POST http://any-instance:8080/actuator/bus-refresh
 * 3. Spring Cloud Bus 通过 RabbitMQ 广播刷新事件
 * 4. 所有实例收到事件后自动刷新配置
 */
```

**(3) 方案 3: spring-boot-devtools（开发环境）**

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

```yaml
# application.yml

spring:
  devtools:
    restart:
      enabled: true  # 启用自动重启
      additional-paths:
        - src/main/resources  # 监听的路径
    livereload:
      enabled: true  # 启用 LiveReload
```

```java
/**
 * spring-boot-devtools 特点:
 * 1. 自动重启应用（修改代码或配置文件时）
 * 2. LiveReload 支持（浏览器自动刷新）
 * 3. 仅在开发环境使用（打包后自动禁用）
 * 4. 重启速度快（使用双类加载器机制）
 */

// 使用方式:
// 1. 添加 devtools 依赖
// 2. 修改配置文件或代码
// 3. IDEA: Build → Recompile 或 Ctrl+F9
// 4. 应用自动重启，配置生效
```

**(4) 方案 4: Nacos 配置中心（生产推荐）**

```xml
<!-- pom.xml -->
<dependencies>
    <!-- Nacos Config -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        <version>2022.0.0.0</version>
    </dependency>
</dependencies>
```

```yaml
# bootstrap.yml

spring:
  application:
    name: myapp

  cloud:
    nacos:
      config:
        server-addr: localhost:8848  # Nacos 地址
        namespace: dev  # 命名空间
        group: DEFAULT_GROUP  # 分组
        file-extension: yml  # 配置文件格式
        refresh-enabled: true  # 启用自动刷新

  config:
    import:
      - optional:nacos:myapp.yml  # 导入 Nacos 配置
```

```java
/**
 * Nacos 配置热加载
 */

@Component
@RefreshScope  // 标记支持热加载
public class NacosConfig {

    @Value("${app.name}")
    private String appName;

    @NacosValue(value = "${app.timeout}", autoRefreshed = true)  // Nacos 专用注解
    private int timeout;

    public String getInfo() {
        return "App: " + appName + ", Timeout: " + timeout;
    }
}

/**
 * Nacos 配置刷新流程:
 * 1. 在 Nacos 控制台修改配置
 * 2. Nacos 客户端监听配置变化
 * 3. 自动推送配置到应用
 * 4. 应用自动刷新（无需手动触发）
 */
```

**(5) 方案 5: 自定义文件监听**

```java
/**
 * 自定义配置文件监听器
 */

@Component
public class ConfigFileWatcher implements ApplicationContextAware {

    private static final Logger log = LoggerFactory.getLogger(ConfigFileWatcher.class);

    private ApplicationContext applicationContext;
    private WatchService watchService;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    /**
     * 启动文件监听
     */
    @PostConstruct
    public void startWatching() throws IOException {
        // 获取配置文件路径
        String configPath = "config/application.yml";
        Path path = Paths.get(configPath).getParent();

        // 创建 WatchService
        watchService = FileSystems.getDefault().newWatchService();
        path.register(watchService, StandardWatchEventKinds.ENTRY_MODIFY);

        // 异步监听文件变化
        new Thread(() -> {
            try {
                while (true) {
                    WatchKey key = watchService.take();

                    for (WatchEvent<?> event : key.pollEvents()) {
                        Path changed = (Path) event.context();

                        if (changed.toString().equals("application.yml")) {
                            log.info("配置文件发生变化，开始刷新配置...");
                            refreshConfig();
                        }
                    }

                    key.reset();
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }

    /**
     * 刷新配置
     */
    private void refreshConfig() {
        // 发布 RefreshEvent
        applicationContext.publishEvent(new EnvironmentChangeEvent(
            applicationContext, Collections.emptySet()));

        log.info("配置刷新完成");
    }

    @PreDestroy
    public void stopWatching() throws IOException {
        if (watchService != null) {
            watchService.close();
        }
    }
}
```

**(6) 配置热加载监听器**

```java
/**
 * 监听配置刷新事件
 */

@Component
public class ConfigRefreshListener {

    private static final Logger log = LoggerFactory.getLogger(ConfigRefreshListener.class);

    /**
     * 监听环境变化事件
     */
    @EventListener
    public void onEnvironmentChange(EnvironmentChangeEvent event) {
        Set<String> keys = event.getKeys();
        log.info("配置发生变化，变化的 key: {}", keys);

        // 执行配置变化后的逻辑
        keys.forEach(key -> {
            log.info("配置项 {} 已更新", key);
        });
    }

    /**
     * 监听 RefreshScope 刷新事件
     */
    @EventListener
    public void onRefreshScope(RefreshScopeRefreshedEvent event) {
        log.info("RefreshScope Bean 已刷新");
    }
}
```

**(7) 不同场景的配置热加载方案选择**

```java
/**
 * 配置热加载方案选择指南
 */

// ========== 场景 1: 单体应用 ==========
// 推荐: @RefreshScope + Actuator
// 优点: 简单，无需额外组件
// 缺点: 需要手动触发（POST /actuator/refresh）

@Component
@RefreshScope
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    // ...
}

// ========== 场景 2: 微服务集群 ==========
// 推荐: Spring Cloud Config + Spring Cloud Bus
// 优点: 集中管理，自动推送到所有实例
// 缺点: 需要 Config Server 和消息中间件（RabbitMQ/Kafka）

spring:
  cloud:
    config:
      uri: http://config-server:8888
    bus:
      enabled: true

// ========== 场景 3: 生产环境 ==========
// 推荐: Nacos/Apollo 配置中心
// 优点: 功能强大，实时推送，版本管理，灰度发布
// 缺点: 需要部署配置中心

spring:
  cloud:
    nacos:
      config:
        server-addr: nacos-server:8848
        refresh-enabled: true

// ========== 场景 4: 开发环境 ==========
// 推荐: spring-boot-devtools
// 优点: 自动重启，无需配置
// 缺点: 会重启应用，仅限开发环境

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
</dependency>
```

**(8) 配置热加载最佳实践**

```java
/**
 * 配置热加载最佳实践
 */

// 1. 使用 @ConfigurationProperties 而不是 @Value
// 原因: @ConfigurationProperties 天然支持刷新，@Value 需要配合 @RefreshScope

// ❌ 不推荐
@Component
public class BadConfig {
    @Value("${app.name}")
    private String appName;  // 不会自动刷新
}

// ✅ 推荐
@Component
@ConfigurationProperties(prefix = "app")
public class GoodConfig {
    private String name;  // 自动刷新
}

// 2. 需要热加载的 Bean 添加 @RefreshScope
@Service
@RefreshScope  // 必须添加
public class MyService {

    @Autowired
    private GoodConfig config;

    public void doSomething() {
        // 使用最新配置
        String name = config.getName();
    }
}

// 3. 敏感配置不要放在配置文件中
// 使用环境变量或密钥管理服务（如 Vault）
spring:
  datasource:
    password: ${DB_PASSWORD}  # 从环境变量读取

// 4. 配置变化时执行额外逻辑
@Component
public class ConfigChangeHandler {

    @EventListener
    public void handleConfigChange(EnvironmentChangeEvent event) {
        if (event.getKeys().contains("app.timeout")) {
            // 超时配置变化时，重新初始化连接池
            reinitializeConnectionPool();
        }
    }

    private void reinitializeConnectionPool() {
        // 重新初始化逻辑
    }
}

// 5. 使用配置版本管理
app:
  version: v1.2.3  # 配置版本号
  last-updated: 2024-01-01 10:00:00

// 6. 集成监控和告警
management:
  endpoints:
    web:
      exposure:
        include: refresh,health,metrics
  endpoint:
    health:
      show-details: always

// 7. 配置刷新日志
@Component
public class RefreshLogger {

    @EventListener
    public void onRefresh(RefreshScopeRefreshedEvent event) {
        log.info("Configuration refreshed at {}", LocalDateTime.now());
        // 发送告警通知
        sendAlert("Configuration has been refreshed");
    }
}
```

**关键要点**

1. **热加载原理**
   - 通过销毁并重新创建 Bean 来实现
   - 需要 @RefreshScope 标记
   - 触发 EnvironmentChangeEvent 事件

2. **常用方案**
   - 单应用: @RefreshScope + Actuator
   - 微服务: Spring Cloud Config + Bus
   - 生产环境: Nacos/Apollo
   - 开发环境: spring-boot-devtools

3. **关键注解**
   - @RefreshScope: 标记 Bean 可刷新
   - @ConfigurationProperties: 配置属性类
   - @Value: 配合 @RefreshScope 使用

4. **触发方式**
   - 手动: POST /actuator/refresh
   - 自动: Config Server + Bus 推送
   - 监听: Nacos/Apollo 自动推送
   - 文件监听: 自定义实现

5. **注意事项**
   - 只能刷新配置，不能刷新代码
   - @RefreshScope 有性能开销
   - 敏感配置用环境变量
   - 配置变化需要测试

**记忆口诀**

**"RefreshScope 标记 Bean,Actuator 提供刷新点;Config 加 Bus 微服务,Nacos 推送更方便;devtools 开发自动重启,监听事件做处理"**

- **RefreshScope 标记 Bean**: 使用 @RefreshScope 标记需要热加载的 Bean
- **Actuator 提供刷新点**: Actuator 提供 /actuator/refresh 端点
- **Config 加 Bus 微服务**: Spring Cloud Config + Bus 适合微服务
- **Nacos 推送更方便**: Nacos 配置中心实时推送，更方便
- **devtools 开发自动重启**: spring-boot-devtools 开发环境自动重启
- **监听事件做处理**: 监听 EnvironmentChangeEvent 事件处理配置变化

### 46. 什么是 Profile？如何使用？

**核心答案**

**Profile** 是 Spring 提供的**环境配置隔离机制**,允许在不同环境（开发、测试、生产）下加载不同的配置和 Bean。通过 **spring.profiles.active** 指定激活的 Profile,可以实现一套代码在多个环境中运行,每个环境使用各自的配置。

**Profile 核心特性:**

| 特性 | 说明 | 示例 |
|-----|------|------|
| **环境隔离** | 不同环境使用不同配置 | dev, test, prod |
| **配置文件命名** | application-{profile}.yml | application-dev.yml |
| **Bean 条件装配** | @Profile 注解控制 Bean 加载 | @Profile("dev") |
| **多 Profile 激活** | 同时激活多个 Profile | dev,redis |
| **Profile 分组** | 逻辑分组多个 Profile | prod: db,mq |
| **默认 Profile** | 未指定时的默认环境 | default |

**Profile 工作原理:**

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring Boot Profile 工作流程</text>
<rect x="300" y="70" width="300" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">1. 应用启动</text>
<text x="450" y="115" font-size="11" text-anchor="middle" fill="#fff">SpringApplication.run()</text>
<line x1="450" y1="130" x2="450" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="170" width="300" height="60" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="450" y="195" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">2. 检测 active profile</text>
<text x="450" y="215" font-size="11" text-anchor="middle" fill="#fff">spring.profiles.active=prod</text>
<line x1="350" y1="230" x2="190" y2="280" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="550" y1="230" x2="710" y2="280" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="280" width="180" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="190" y="305" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">3a. 加载配置文件</text>
<text x="190" y="325" font-size="10" text-anchor="middle" fill="#fff">application-prod.yml</text>
<rect x="620" y="280" width="180" height="60" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="710" y="305" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">3b. 加载 @Profile Bean</text>
<text x="710" y="325" font-size="10" text-anchor="middle" fill="#fff">@Profile("prod")</text>
<line x1="190" y1="340" x2="190" y2="380" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="710" y1="340" x2="710" y2="380" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="380" width="180" height="60" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="190" y="405" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">配置合并</text>
<text x="190" y="425" font-size="9" text-anchor="middle" fill="#fff">application.yml</text>
<text x="190" y="435" font-size="9" text-anchor="middle" fill="#fff">+ application-prod.yml</text>
<rect x="620" y="380" width="180" height="60" fill="#00bcd4" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="710" y="405" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">Bean 注册</text>
<text x="710" y="425" font-size="9" text-anchor="middle" fill="#fff">@Profile("prod")</text>
<text x="710" y="435" font-size="9" text-anchor="middle" fill="#fff">Bean 注册到容器</text>
<line x1="190" y1="440" x2="350" y2="490" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="710" y1="440" x2="550" y2="490" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="490" width="300" height="60" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="450" y="515" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">4. 应用启动完成</text>
<text x="450" y="535" font-size="11" text-anchor="middle" fill="#fff">使用 prod 环境配置</text>
<rect x="100" y="570" width="700" height="60" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="450" y="595" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">配置优先级: Profile 专用配置 > 通用配置</text>
<text x="450" y="615" font-size="11" text-anchor="middle" fill="#333">application-prod.yml 覆盖 application.yml 中的同名配置</text>
</svg>

**详细说明**

**(1) Profile 基本使用**

```yaml
# ========== application.yml (通用配置) ==========
spring:
  application:
    name: myapp

# 默认 profile
spring:
  profiles:
    active: dev  # 激活 dev profile

server:
  port: 8080

# 通用日志配置
logging:
  level:
    root: INFO

# ========== application-dev.yml (开发环境) ==========
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test_dev
    username: root
    password: dev123

  redis:
    host: localhost
    port: 6379

# 开发环境日志级别
logging:
  level:
    root: DEBUG
    com.example: TRACE

server:
  port: 8081  # 覆盖通用配置

# ========== application-test.yml (测试环境) ==========
spring:
  datasource:
    url: jdbc:mysql://test.example.com:3306/test_test
    username: test_user
    password: test123

  redis:
    host: redis-test.example.com
    port: 6379

logging:
  level:
    root: INFO

server:
  port: 8082

# ========== application-prod.yml (生产环境) ==========
spring:
  datasource:
    url: jdbc:mysql://prod.example.com:3306/test_prod
    username: prod_user
    password: ${DB_PASSWORD}  # 从环境变量读取

  redis:
    host: redis-prod.example.com
    port: 6380
    password: ${REDIS_PASSWORD}

logging:
  level:
    root: WARN
    com.example: ERROR
  file:
    name: /var/log/myapp.log

server:
  port: 8080
```

**(2) 激活 Profile 的方式**

```java
/**
 * 方式 1: 配置文件指定（application.yml）
 */
spring:
  profiles:
    active: prod

/**
 * 方式 2: 命令行参数（推荐）
 */
// 启动时指定
java -jar myapp.jar --spring.profiles.active=prod

/**
 * 方式 3: 环境变量
 */
// Linux/Mac
export SPRING_PROFILES_ACTIVE=prod
java -jar myapp.jar

// Windows
set SPRING_PROFILES_ACTIVE=prod
java -jar myapp.jar

/**
 * 方式 4: JVM 系统属性
 */
java -Dspring.profiles.active=prod -jar myapp.jar

/**
 * 方式 5: 编程方式
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Application.class);

        // 设置默认 profile
        app.setAdditionalProfiles("prod");

        app.run(args);
    }
}

/**
 * 方式 6: Maven Profile 联动
 */
// pom.xml
<profiles>
    <profile>
        <id>dev</id>
        <properties>
            <spring.profiles.active>dev</spring.profiles.active>
        </properties>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
    </profile>
    <profile>
        <id>prod</id>
        <properties>
            <spring.profiles.active>prod</spring.profiles.active>
        </properties>
    </profile>
</profiles>

// 打包时指定
mvn clean package -Pprod
```

**(3) @Profile 注解使用**

```java
/**
 * 在 Bean 上使用 @Profile
 */

// ========== 1. 配置类上使用 @Profile ==========

@Configuration
@Profile("dev")  // 只在 dev profile 时加载
public class DevConfig {

    @Bean
    public DataSource devDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl("jdbc:mysql://localhost:3306/test_dev");
        dataSource.setUsername("root");
        dataSource.setPassword("dev123");
        return dataSource;
    }
}

@Configuration
@Profile("prod")  // 只在 prod profile 时加载
public class ProdConfig {

    @Bean
    public DataSource prodDataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:mysql://prod.example.com:3306/test_prod");
        dataSource.setUsername("prod_user");
        dataSource.setPassword(System.getenv("DB_PASSWORD"));
        dataSource.setMaximumPoolSize(50);
        return dataSource;
    }
}

// ========== 2. @Bean 方法上使用 @Profile ==========

@Configuration
public class DataSourceConfig {

    @Bean
    @Profile("dev")
    public DataSource devDataSource() {
        return new DriverManagerDataSource();
    }

    @Bean
    @Profile("prod")
    public DataSource prodDataSource() {
        return new HikariDataSource();
    }

    @Bean
    @Profile("default")  // 默认 profile
    public DataSource defaultDataSource() {
        return new DriverManagerDataSource();
    }
}

// ========== 3. @Component 上使用 @Profile ==========

@Service
@Profile("dev")
public class MockPaymentService implements PaymentService {

    @Override
    public boolean pay(BigDecimal amount) {
        System.out.println("Mock payment: " + amount);
        return true;  // 开发环境模拟支付成功
    }
}

@Service
@Profile("prod")
public class RealPaymentService implements PaymentService {

    @Override
    public boolean pay(BigDecimal amount) {
        // 真实支付逻辑
        return callPaymentGateway(amount);
    }

    private boolean callPaymentGateway(BigDecimal amount) {
        // 调用支付网关
        return true;
    }
}

// ========== 4. 多个 Profile ==========

@Configuration
@Profile({"dev", "test"})  // dev 或 test 时加载
public class NonProdConfig {

    @Bean
    public MockService mockService() {
        return new MockService();
    }
}

// ========== 5. Profile 表达式 ==========

@Configuration
@Profile("!prod")  // 非 prod 环境时加载
public class NonProdConfig {
    // ...
}

@Configuration
@Profile("prod & cloud")  // prod 且 cloud 时加载
public class ProdCloudConfig {
    // ...
}

@Configuration
@Profile("dev | test")  // dev 或 test 时加载
public class DevOrTestConfig {
    // ...
}
```

**(4) 多 Profile 激活**

```yaml
# ========== 激活多个 profile ==========

spring:
  profiles:
    active: dev,redis,h2  # 同时激活多个 profile

# 等价于命令行:
# --spring.profiles.active=dev,redis,h2

# ========== Profile 包含 ==========

# application-prod.yml
spring:
  profiles:
    include: db,cache,mq  # prod 包含其他 profile

# 当激活 prod 时，自动激活 db、cache、mq
```

```java
/**
 * 多 Profile 配置示例
 */

// application-db.yml (数据库配置)
spring:
  datasource:
    url: jdbc:mysql://db.example.com:3306/test
    username: db_user
    password: db_pass

// application-cache.yml (缓存配置)
spring:
  redis:
    host: redis.example.com
    port: 6379

// application-mq.yml (消息队列配置)
spring:
  rabbitmq:
    host: mq.example.com
    port: 5672

// application-prod.yml (生产环境，包含以上所有)
spring:
  profiles:
    include: db,cache,mq  # 包含其他 profile

// 启动命令
java -jar myapp.jar --spring.profiles.active=prod
// 自动加载: application.yml + application-prod.yml + application-db.yml + application-cache.yml + application-mq.yml
```

**(5) Profile 分组（Spring Boot 2.4+）**

```yaml
# ========== application.yml ==========

spring:
  profiles:
    group:
      # 定义 profile 组
      dev:
        - dev-db
        - dev-cache
        - mock-service

      test:
        - test-db
        - test-cache
        - real-service

      prod:
        - prod-db
        - prod-cache
        - real-service
        - monitoring

# 激活 profile 组
spring:
  profiles:
    active: dev  # 激活 dev 组，自动激活 dev-db, dev-cache, mock-service

# ========== 对应的配置文件 ==========

# application-dev-db.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/dev

# application-dev-cache.yml
spring:
  redis:
    host: localhost

# application-mock-service.yml
mock:
  enabled: true
```

**(6) 在同一文件中使用多个 Profile**

```yaml
# ========== application.yml (使用 --- 分隔多个文档) ==========

# 通用配置
spring:
  application:
    name: myapp

---
# dev 环境
spring:
  config:
    activate:
      on-profile: dev

  datasource:
    url: jdbc:mysql://localhost:3306/dev

server:
  port: 8081

---
# test 环境
spring:
  config:
    activate:
      on-profile: test

  datasource:
    url: jdbc:mysql://test.example.com:3306/test

server:
  port: 8082

---
# prod 环境
spring:
  config:
    activate:
      on-profile: prod

  datasource:
    url: jdbc:mysql://prod.example.com:3306/prod

server:
  port: 8080

---
# 默认 profile（未指定 profile 时使用）
spring:
  config:
    activate:
      on-profile: default

  datasource:
    url: jdbc:h2:mem:testdb

server:
  port: 8080
```

**(7) 编程方式获取当前 Profile**

```java
/**
 * 获取当前激活的 profile
 */

@Component
public class ProfileChecker {

    @Autowired
    private Environment environment;

    public void checkProfile() {
        // 获取激活的 profile
        String[] activeProfiles = environment.getActiveProfiles();
        System.out.println("Active Profiles: " + Arrays.toString(activeProfiles));

        // 获取默认 profile
        String[] defaultProfiles = environment.getDefaultProfiles();
        System.out.println("Default Profiles: " + Arrays.toString(defaultProfiles));

        // 检查是否激活了某个 profile
        boolean isDevActive = environment.acceptsProfiles(Profiles.of("dev"));
        System.out.println("Is dev profile active? " + isDevActive);

        // 检查复杂表达式
        boolean isDev = environment.acceptsProfiles(Profiles.of("dev & !prod"));
        System.out.println("Is dev and not prod? " + isDev);
    }
}

/**
 * 根据 profile 执行不同逻辑
 */
@Service
public class DataInitService implements CommandLineRunner {

    @Autowired
    private Environment environment;

    @Override
    public void run(String... args) {
        if (environment.acceptsProfiles(Profiles.of("dev | test"))) {
            // 开发或测试环境: 初始化测试数据
            initTestData();
        } else if (environment.acceptsProfiles(Profiles.of("prod"))) {
            // 生产环境: 不初始化测试数据
            System.out.println("Production environment, skip test data initialization");
        }
    }

    private void initTestData() {
        System.out.println("Initializing test data...");
        // 初始化测试数据
    }
}
```

**(8) Profile 最佳实践**

```java
/**
 * Profile 最佳实践
 */

// ========== 1. Profile 命名规范 ==========

// 环境相关
dev          // 开发环境
test         // 测试环境
staging      // 预发布环境
prod         // 生产环境

// 功能相关
mock         // 使用 Mock 服务
real         // 使用真实服务
h2           // 使用 H2 数据库
mysql        // 使用 MySQL 数据库
redis        // 启用 Redis
no-redis     // 禁用 Redis

// ========== 2. 配置文件组织 ==========

// 按环境分离
application.yml              # 通用配置
application-dev.yml          # 开发环境
application-test.yml         # 测试环境
application-prod.yml         # 生产环境

// 按功能分离
application-db.yml           # 数据库配置
application-cache.yml        # 缓存配置
application-mq.yml           # 消息队列配置

// 使用 profile 组
spring:
  profiles:
    group:
      dev: dev-env,h2,mock
      prod: prod-env,mysql,real,monitoring

// ========== 3. 敏感信息处理 ==========

// ❌ 不要直接写在配置文件中
spring:
  datasource:
    password: prod_password_123  # 不安全

// ✅ 使用环境变量
spring:
  datasource:
    password: ${DB_PASSWORD}

// ✅ 使用配置中心
spring:
  cloud:
    nacos:
      config:
        server-addr: nacos-server:8848

// ========== 4. 默认 Profile ==========

@Configuration
@Profile("default")  // 未指定 profile 时使用
public class DefaultConfig {

    @Bean
    public DataSource defaultDataSource() {
        // 使用 H2 内存数据库
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .build();
    }
}

// ========== 5. Profile 测试 ==========

@SpringBootTest
@ActiveProfiles("test")  // 指定测试使用的 profile
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    void testGetUser() {
        // 使用 test profile 的配置进行测试
        User user = userService.getUser(1L);
        assertNotNull(user);
    }
}

// ========== 6. 条件化配置 ==========

@Configuration
public class ConditionalConfig {

    @Bean
    @ConditionalOnProfile("dev")  // 自定义条件
    public DebugService debugService() {
        return new DebugService();
    }
}

// 自定义条件注解
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Conditional(OnProfileCondition.class)
public @interface ConditionalOnProfile {
    String value();
}
```

**(9) Profile 完整示例**

```java
/**
 * 完整的 Profile 使用示例
 */

// ========== 配置文件 ==========

// application.yml (通用配置)
spring:
  application:
    name: myapp
  profiles:
    active: ${SPRING_PROFILES_ACTIVE:dev}  # 从环境变量读取，默认 dev

server:
  servlet:
    context-path: /api

// application-dev.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/dev
    username: root
    password: dev123
  jpa:
    show-sql: true

server:
  port: 8081

// application-prod.yml
spring:
  datasource:
    url: jdbc:mysql://prod-db:3306/prod
    username: ${DB_USER}
    password: ${DB_PASSWORD}
  jpa:
    show-sql: false

server:
  port: 8080

// ========== Java 配置 ==========

// 开发环境配置
@Configuration
@Profile("dev")
public class DevConfig {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository) {
        return args -> {
            // 初始化测试数据
            userRepository.save(new User("test", "test@example.com"));
            System.out.println("Dev test data initialized");
        };
    }
}

// 生产环境配置
@Configuration
@Profile("prod")
public class ProdConfig {

    @Bean
    public CommandLineRunner checkHealth() {
        return args -> {
            // 生产环境健康检查
            System.out.println("Production environment health check");
        };
    }
}

// 服务类
@Service
@Profile("dev")
public class MockEmailService implements EmailService {

    @Override
    public void sendEmail(String to, String subject, String content) {
        System.out.println("Mock email sent to: " + to);
    }
}

@Service
@Profile("prod")
public class RealEmailService implements EmailService {

    @Override
    public void sendEmail(String to, String subject, String content) {
        // 真实邮件发送逻辑
        System.out.println("Real email sent to: " + to);
    }
}

// ========== 启动类 ==========

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// ========== 启动命令 ==========

// 开发环境
java -jar myapp.jar --spring.profiles.active=dev

// 生产环境
export DB_USER=prod_user
export DB_PASSWORD=prod_password
java -jar myapp.jar --spring.profiles.active=prod
```

**关键要点**

1. **Profile 定义**
   - 环境配置隔离机制
   - 支持多环境配置
   - 通过 spring.profiles.active 激活

2. **配置文件命名**
   - application.yml: 通用配置
   - application-{profile}.yml: 专用配置
   - Profile 专用配置覆盖通用配置

3. **激活方式**
   - 配置文件: spring.profiles.active
   - 命令行: --spring.profiles.active=prod
   - 环境变量: SPRING_PROFILES_ACTIVE
   - JVM 参数: -Dspring.profiles.active=prod

4. **@Profile 注解**
   - 标记在配置类或 Bean 上
   - 支持表达式: !, &, |
   - 支持多个 Profile

5. **最佳实践**
   - 敏感信息用环境变量
   - 使用 Profile 分组
   - 默认 Profile 配置
   - 测试时指定 @ActiveProfiles

**记忆口诀**

**"Profile 环境隔离器,dev test prod 分环境;配置文件 application 加横线,@Profile 注解控 Bean 装;active 激活 include 包含,分组管理更方便"**

- **Profile 环境隔离器**: Profile 用于隔离不同环境的配置
- **dev test prod 分环境**: 常见的三种环境
- **配置文件 application 加横线**: application-{profile}.yml 命名规则
- **@Profile 注解控 Bean 装**: @Profile 控制 Bean 的加载
- **active 激活 include 包含**: spring.profiles.active 激活，include 包含其他 profile
- **分组管理更方便**: 使用 profile 分组管理多个 profile

### 47. Spring Boot 如何集成第三方组件？

**核心答案**

Spring Boot 集成第三方组件主要通过以下方式：**1) 使用官方或第三方提供的 Starter**（最简单）、**2) 手动添加依赖并配置 Bean**（灵活）、**3) 自定义 Starter**（复用）、**4) 使用 @Import 导入配置类**。最常用的是直接使用 Starter 依赖，Spring Boot 的自动配置机制会自动装配组件。

**集成第三方组件的方式对比:**

| 方式 | 适用场景 | 优点 | 缺点 |
|-----|---------|------|------|
| **使用 Starter** | 有官方/第三方 Starter | 简单，自动配置 | 依赖 Starter 存在 |
| **手动配置** | 无 Starter 或需要定制 | 灵活，完全控制 | 配置复杂 |
| **自定义 Starter** | 多项目复用 | 统一管理，复用 | 开发成本高 |
| **@Import 导入** | 简单集成 | 快速集成 | 功能有限 |

**第三方组件集成流程:**

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
</marker>
</defs>
<text x="450" y="30" font-size="18" font-weight="bold" text-anchor="middle" fill="#333">Spring Boot 集成第三方组件流程</text>
<rect x="300" y="70" width="300" height="60" fill="#2196f3" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="95" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">1. 选择集成方式</text>
<text x="450" y="115" font-size="11" text-anchor="middle" fill="#fff">Starter / 手动配置 / 自定义</text>
<line x1="350" y1="130" x2="190" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="130" x2="450" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="550" y1="130" x2="710" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="180" width="180" height="80" fill="#ff9800" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="190" y="210" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">方式 1: Starter</text>
<text x="190" y="230" font-size="10" text-anchor="middle" fill="#fff">添加依赖</text>
<text x="190" y="245" font-size="10" text-anchor="middle" fill="#fff">自动配置生效</text>
<rect x="360" y="180" width="180" height="80" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="210" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">方式 2: 手动配置</text>
<text x="450" y="230" font-size="10" text-anchor="middle" fill="#fff">添加依赖</text>
<text x="450" y="245" font-size="10" text-anchor="middle" fill="#fff">创建配置类</text>
<rect x="620" y="180" width="180" height="80" fill="#9c27b0" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="710" y="210" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">方式 3: 自定义 Starter</text>
<text x="710" y="230" font-size="10" text-anchor="middle" fill="#fff">开发 Starter</text>
<text x="710" y="245" font-size="10" text-anchor="middle" fill="#fff">引入使用</text>
<line x1="190" y1="260" x2="190" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="260" x2="450" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="710" y1="260" x2="710" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="310" width="180" height="60" fill="#f44336" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="190" y="335" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">配置属性</text>
<text x="190" y="355" font-size="9" text-anchor="middle" fill="#fff">application.yml</text>
<rect x="360" y="310" width="180" height="60" fill="#00bcd4" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="450" y="335" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">注册 Bean</text>
<text x="450" y="355" font-size="9" text-anchor="middle" fill="#fff">@Bean / @Configuration</text>
<rect x="620" y="310" width="180" height="60" fill="#673ab7" stroke="#512da8" stroke-width="2" rx="5"/>
<text x="710" y="335" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">自动装配</text>
<text x="710" y="355" font-size="9" text-anchor="middle" fill="#fff">spring.factories</text>
<line x1="190" y1="370" x2="350" y2="420" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="370" x2="450" y2="410" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="710" y1="370" x2="550" y2="420" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="420" width="300" height="60" fill="#4caf50" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="445" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">3. 使用组件</text>
<text x="450" y="465" font-size="11" text-anchor="middle" fill="#fff">@Autowired 注入使用</text>
<rect x="100" y="500" width="700" height="60" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="450" y="525" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">常见第三方组件</text>
<text x="450" y="545" font-size="10" text-anchor="middle" fill="#333">MyBatis • Druid • Redis • RabbitMQ • Elasticsearch • Swagger • Lombok</text>
<text x="450" y="615" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">核心原则：优先使用 Starter，无 Starter 则手动配置</text>
</svg>

**详细说明**

**(1) 方式 1: 使用官方 Starter（最简单）**

```xml
<!-- ========== 集成 MyBatis Plus ========== -->

<!-- 1. 添加依赖 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.5</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

```yaml
# 2. 配置 application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver

# MyBatis Plus 配置
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      id-type: auto
```

```java
// 3. 使用 MyBatis Plus

// 实体类
@Data
@TableName("users")
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String username;
    private String email;
}

// Mapper 接口
@Mapper
public interface UserMapper extends BaseMapper<User> {
    // 继承 BaseMapper，自动拥有 CRUD 方法
}

// Service
@Service
public class UserService extends ServiceImpl<UserMapper, User> {

    public List<User> getAllUsers() {
        return list();  // 自动实现的方法
    }

    public User getUserById(Long id) {
        return getById(id);
    }
}

// Controller
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> list() {
        return userService.getAllUsers();
    }
}
```

**(2) 方式 2: 手动配置（无 Starter 或需要定制）**

```xml
<!-- ========== 集成 Druid 连接池 ========== -->

<!-- 1. 添加依赖 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.20</version>
</dependency>
```

```yaml
# 2. 配置 application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource

# Druid 连接池配置
druid:
  initial-size: 5
  min-idle: 5
  max-active: 20
  max-wait: 60000
  time-between-eviction-runs-millis: 60000
  min-evictable-idle-time-millis: 300000
  validation-query: SELECT 1
  test-while-idle: true
  test-on-borrow: false
  test-on-return: false
  # 监控配置
  stat-view-servlet:
    enabled: true
    url-pattern: /druid/*
    login-username: admin
    login-password: admin
  filter:
    stat:
      enabled: true
      log-slow-sql: true
      slow-sql-millis: 1000
```

```java
// 3. 创建配置类

@Configuration
public class DruidConfig {

    /**
     * 配置 Druid 数据源
     */
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource druidDataSource() {
        return new DruidDataSource();
    }

    /**
     * 配置 Druid 监控
     */
    @Bean
    public ServletRegistrationBean<StatViewServlet> druidStatViewServlet() {
        ServletRegistrationBean<StatViewServlet> registrationBean =
            new ServletRegistrationBean<>(new StatViewServlet(), "/druid/*");

        // 登录账号密码
        registrationBean.addInitParameter("loginUsername", "admin");
        registrationBean.addInitParameter("loginPassword", "admin");

        // IP 白名单（空表示允许所有）
        registrationBean.addInitParameter("allow", "");

        return registrationBean;
    }

    /**
     * 配置 Druid Web 监控 Filter
     */
    @Bean
    public FilterRegistrationBean<WebStatFilter> druidWebStatFilter() {
        FilterRegistrationBean<WebStatFilter> registrationBean =
            new FilterRegistrationBean<>(new WebStatFilter());

        // 拦截所有请求
        registrationBean.addUrlPatterns("/*");

        // 排除静态资源
        registrationBean.addInitParameter("exclusions",
            "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");

        return registrationBean;
    }
}

// 4. 访问监控页面: http://localhost:8080/druid/
```

**(3) 常见第三方组件集成示例**

```java
/**
 * ========== 1. 集成 Redis ==========
 */

// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

// application.yml
spring:
  redis:
    host: localhost
    port: 6379
    password:
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0

// 使用
@Service
public class CacheService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }
}

/**
 * ========== 2. 集成 RabbitMQ ==========
 */

// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>

// application.yml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest

// 配置
@Configuration
public class RabbitMQConfig {

    @Bean
    public Queue testQueue() {
        return new Queue("test.queue", true);
    }

    @Bean
    public DirectExchange testExchange() {
        return new DirectExchange("test.exchange");
    }

    @Bean
    public Binding binding(Queue testQueue, DirectExchange testExchange) {
        return BindingBuilder.bind(testQueue)
            .to(testExchange)
            .with("test.routing.key");
    }
}

// 生产者
@Service
public class MessageProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void send(String message) {
        rabbitTemplate.convertAndSend(
            "test.exchange",
            "test.routing.key",
            message);
    }
}

// 消费者
@Component
public class MessageConsumer {

    @RabbitListener(queues = "test.queue")
    public void receive(String message) {
        System.out.println("Received: " + message);
    }
}

/**
 * ========== 3. 集成 Elasticsearch ==========
 */

// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>

// application.yml
spring:
  elasticsearch:
    uris: http://localhost:9200
    username: elastic
    password: password

// 实体类
@Document(indexName = "products")
@Data
public class Product {

    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Keyword)
    private String category;

    @Field(type = FieldType.Double)
    private BigDecimal price;
}

// Repository
public interface ProductRepository extends ElasticsearchRepository<Product, String> {

    List<Product> findByName(String name);

    List<Product> findByCategory(String category);
}

// 使用
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public void save(Product product) {
        productRepository.save(product);
    }

    public List<Product> search(String name) {
        return productRepository.findByName(name);
    }
}

/**
 * ========== 4. 集成 Swagger/Knife4j（API 文档） ==========
 */

// pom.xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
    <version>4.5.0</version>
</dependency>

// 配置类
@Configuration
public class Knife4jConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("API 文档")
                .version("1.0")
                .description("Spring Boot 项目 API 文档")
                .contact(new Contact()
                    .name("开发者")
                    .email("dev@example.com")))
            .externalDocs(new ExternalDocumentation()
                .description("项目文档")
                .url("https://doc.example.com"));
    }
}

// Controller 使用
@RestController
@RequestMapping("/api/users")
@Tag(name = "用户管理", description = "用户相关接口")
public class UserController {

    @GetMapping("/{id}")
    @Operation(summary = "根据 ID 查询用户", description = "通过用户 ID 获取用户详细信息")
    @Parameter(name = "id", description = "用户 ID", required = true)
    public User getUser(@PathVariable Long id) {
        return new User();
    }

    @PostMapping
    @Operation(summary = "创建用户", description = "创建新用户")
    public User createUser(@RequestBody @Parameter(description = "用户信息") User user) {
        return user;
    }
}

// 访问文档: http://localhost:8080/doc.html

/**
 * ========== 5. 集成 Quartz（定时任务） ==========
 */

// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-quartz</artifactId>
</dependency>

// 配置
spring:
  quartz:
    job-store-type: jdbc  # 持久化到数据库
    properties:
      org:
        quartz:
          scheduler:
            instanceName: MyScheduler
          jobStore:
            class: org.quartz.impl.jdbcjobstore.JobStoreTX
            driverDelegateClass: org.quartz.impl.jdbcjobstore.StdJDBCDelegate
            tablePrefix: QRTZ_

// 定时任务类
@Component
public class MyJob extends QuartzJobBean {

    @Override
    protected void executeInternal(JobExecutionContext context) {
        System.out.println("定时任务执行: " + LocalDateTime.now());
    }
}

// 配置定时任务
@Configuration
public class QuartzConfig {

    @Bean
    public JobDetail myJobDetail() {
        return JobBuilder.newJob(MyJob.class)
            .withIdentity("myJob")
            .storeDurably()
            .build();
    }

    @Bean
    public Trigger myTrigger() {
        return TriggerBuilder.newTrigger()
            .forJob(myJobDetail())
            .withIdentity("myTrigger")
            .withSchedule(CronScheduleBuilder.cronSchedule("0/5 * * * * ?"))  // 每 5 秒执行
            .build();
    }
}

/**
 * ========== 6. 集成 MinIO（对象存储） ==========
 */

// pom.xml
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.5.7</version>
</dependency>

// 配置
minio:
  endpoint: http://localhost:9000
  access-key: minioadmin
  secret-key: minioadmin
  bucket-name: my-bucket

// 配置类
@Configuration
@ConfigurationProperties(prefix = "minio")
@Data
public class MinioConfig {

    private String endpoint;
    private String accessKey;
    private String secretKey;
    private String bucketName;

    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
            .endpoint(endpoint)
            .credentials(accessKey, secretKey)
            .build();
    }
}

// 服务类
@Service
public class MinioService {

    @Autowired
    private MinioClient minioClient;

    @Value("${minio.bucket-name}")
    private String bucketName;

    /**
     * 上传文件
     */
    public void uploadFile(String objectName, InputStream inputStream, String contentType)
            throws Exception {

        minioClient.putObject(
            PutObjectArgs.builder()
                .bucket(bucketName)
                .object(objectName)
                .stream(inputStream, inputStream.available(), -1)
                .contentType(contentType)
                .build());
    }

    /**
     * 下载文件
     */
    public InputStream downloadFile(String objectName) throws Exception {
        return minioClient.getObject(
            GetObjectArgs.builder()
                .bucket(bucketName)
                .object(objectName)
                .build());
    }
}

/**
 * ========== 7. 集成 XXL-Job（分布式任务调度） ==========
 */

// pom.xml
<dependency>
    <groupId>com.xuxueli</groupId>
    <artifactId>xxl-job-core</artifactId>
    <version>2.4.0</version>
</dependency>

// 配置
xxl:
  job:
    admin:
      addresses: http://localhost:8080/xxl-job-admin
    executor:
      appname: my-app
      port: 9999
      logpath: /data/applogs/xxl-job

// 配置类
@Configuration
public class XxlJobConfig {

    @Value("${xxl.job.admin.addresses}")
    private String adminAddresses;

    @Value("${xxl.job.executor.appname}")
    private String appname;

    @Value("${xxl.job.executor.port}")
    private int port;

    @Value("${xxl.job.executor.logpath}")
    private String logPath;

    @Bean
    public XxlJobSpringExecutor xxlJobExecutor() {
        XxlJobSpringExecutor executor = new XxlJobSpringExecutor();
        executor.setAdminAddresses(adminAddresses);
        executor.setAppname(appname);
        executor.setPort(port);
        executor.setLogPath(logPath);
        return executor;
    }
}

// 任务类
@Component
public class MyJobHandler {

    @XxlJob("myJobHandler")
    public void execute() {
        System.out.println("XXL-Job 任务执行");
    }
}
```

**(4) 集成第三方组件的通用步骤**

```java
/**
 * 通用集成步骤
 */

// Step 1: 添加依赖
// 查找官方 Starter 或核心依赖
<dependency>
    <groupId>com.example</groupId>
    <artifactId>component-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>

// Step 2: 配置属性
// application.yml 中配置组件属性
component:
  enabled: true
  config-key: config-value

// Step 3: 创建配置类（如果需要）
@Configuration
@ConditionalOnProperty(prefix = "component", name = "enabled", havingValue = "true")
public class ComponentConfig {

    @Bean
    public ComponentService componentService() {
        return new ComponentService();
    }
}

// Step 4: 使用组件
@Service
public class MyService {

    @Autowired
    private ComponentService componentService;

    public void doSomething() {
        componentService.execute();
    }
}

// Step 5: 测试
@SpringBootTest
class ComponentTest {

    @Autowired
    private ComponentService componentService;

    @Test
    void testComponent() {
        assertNotNull(componentService);
    }
}
```

**(5) 集成最佳实践**

```java
/**
 * 集成最佳实践
 */

// 1. 优先使用 Spring Boot Starter
// ✅ 推荐
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
</dependency>

// ❌ 不推荐（手动配置复杂）
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
</dependency>

// 2. 版本管理
// 使用 spring-boot-dependencies 统一管理版本
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>3.2.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

// 3. 配置外部化
// 使用 @ConfigurationProperties
@ConfigurationProperties(prefix = "component")
@Data
public class ComponentProperties {
    private boolean enabled = true;
    private String url;
    private int timeout;
}

// 4. 条件装配
@Configuration
@ConditionalOnClass(Component.class)
@ConditionalOnProperty(prefix = "component", name = "enabled")
@EnableConfigurationProperties(ComponentProperties.class)
public class ComponentAutoConfiguration {
    // ...
}

// 5. 提供默认配置
@Bean
@ConditionalOnMissingBean
public Component component(ComponentProperties properties) {
    return new Component(properties);
}

// 6. 健康检查
@Component
public class ComponentHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        // 检查组件健康状态
        return Health.up().build();
    }
}

// 7. 配置元数据
// 提供 spring-configuration-metadata.json
{
  "properties": [
    {
      "name": "component.enabled",
      "type": "java.lang.Boolean",
      "description": "是否启用组件",
      "defaultValue": true
    }
  ]
}
```

**关键要点**

1. **集成方式**
   - 使用 Starter: 最简单，推荐
   - 手动配置: 灵活，适合定制
   - 自定义 Starter: 复用，适合多项目
   - @Import 导入: 快速，功能有限

2. **通用步骤**
   - 添加依赖
   - 配置属性
   - 创建配置类（可选）
   - 注入使用
   - 编写测试

3. **常见组件**
   - 数据库: MyBatis, Druid, Elasticsearch
   - 缓存: Redis
   - 消息队列: RabbitMQ, Kafka
   - 任务调度: Quartz, XXL-Job
   - 文档: Swagger/Knife4j
   - 存储: MinIO

4. **最佳实践**
   - 优先使用 Starter
   - 版本统一管理
   - 配置外部化
   - 条件装配
   - 提供默认配置

5. **注意事项**
   - 注意版本兼容性
   - 配置要完整
   - 测试要充分
   - 文档要清晰

**记忆口诀**

**"集成组件首选 Starter,添加依赖配属性;无 Starter 手动配,创建 Bean 注册器;MyBatis Redis 常用组件,条件装配最佳实践"**

- **集成组件首选 Starter**: 优先使用官方或第三方 Starter
- **添加依赖配属性**: 添加依赖后在 application.yml 配置
- **无 Starter 手动配**: 没有 Starter 就手动配置
- **创建 Bean 注册器**: 通过 @Bean 或 @Configuration 注册 Bean
- **MyBatis Redis 常用组件**: 常见的第三方组件
- **条件装配最佳实践**: 使用 @Conditional 系列注解实现条件装配
