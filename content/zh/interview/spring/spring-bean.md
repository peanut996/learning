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
<text x="325" y="450" text-anchor="start" font-size="11" fill="#333">List&lt;T&gt; → 所有类型 T</text>
<text x="325" y="468" text-anchor="start" font-size="11" fill="#333">Map&lt;String,T&gt; → Bean</text>
<text x="325" y="486" text-anchor="start" font-size="11" fill="#333">名称作为 key</text>
<rect x="510" y="410" width="170" height="90" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="595" y="430" text-anchor="middle" font-size="13" font-weight="bold" fill="#f57c00">可选依赖</text>
<text x="520" y="450" text-anchor="start" font-size="11" fill="#333">required=false</text>
<text x="520" y="468" text-anchor="start" font-size="11" fill="#333">Optional&lt;T&gt;</text>
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
