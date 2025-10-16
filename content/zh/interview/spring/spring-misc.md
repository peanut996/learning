## 其他
### 75. Spring 中使用了哪些设计模式？

**1. 工厂模式（Factory Pattern）**

BeanFactory 和 ApplicationContext 是工厂模式的典型应用，用于创建和管理 Bean 对象。

```java
// BeanFactory 示例
BeanFactory factory = new XmlBeanFactory(new ClassPathResource("beans.xml"));
UserService userService = (UserService) factory.getBean("userService");

// ApplicationContext 示例
ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
UserService userService = context.getBean(UserService.class);
```

**特点：**
- 将对象创建逻辑封装在工厂类中
- 客户端通过工厂获取对象，无需关心创建细节
- BeanFactory 是延迟加载，ApplicationContext 是立即加载

**2. 单例模式（Singleton Pattern）**

Spring Bean 默认作用域是 Singleton，容器中只存在一个实例。

```java
@Configuration
public class AppConfig {
    @Bean
    @Scope("singleton")  // 默认值，可省略
    public UserService userService() {
        return new UserService();
    }
}
```

**实现机制：**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="200" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="150" y="85" text-anchor="middle" font-size="16" font-weight="bold">Spring Container</text>
<text x="150" y="110" text-anchor="middle" font-size="14">singletonObjects</text>
<rect x="350" y="50" width="200" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="450" y="85" text-anchor="middle" font-size="16" font-weight="bold">Bean Instance</text>
<text x="450" y="110" text-anchor="middle" font-size="14">userService</text>
<path d="M 250 90 L 350 90" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="300" y="80" text-anchor="middle" font-size="12">缓存</text>
<rect x="350" y="200" width="200" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="450" y="225" text-anchor="middle" font-size="14">Request 1</text>
<text x="450" y="245" text-anchor="middle" font-size="12">getBean("userService")</text>
<rect x="350" y="280" width="200" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="450" y="305" text-anchor="middle" font-size="14">Request 2</text>
<text x="450" y="325" text-anchor="middle" font-size="12">getBean("userService")</text>
<path d="M 450 260 L 450 130" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>
<path d="M 450 280 L 450 130" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>
<text x="500" y="180" font-size="12" fill="#4caf50">返回同一实例</text>
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**3. 代理模式（Proxy Pattern）**

AOP 的核心实现方式，通过 JDK 动态代理或 CGLIB 代理增强目标对象。

```java
// JDK 动态代理示例
public class LoggingProxy implements InvocationHandler {
    private Object target;

    public Object bind(Object target) {
        this.target = target;
        return Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),
            this
        );
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("Before method: " + method.getName());
        Object result = method.invoke(target, args);
        System.out.println("After method: " + method.getName());
        return result;
    }
}

// CGLIB 代理示例（Spring AOP）
@Aspect
@Component
public class LoggingAspect {
    @Around("@annotation(com.example.Loggable)")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("Before: " + joinPoint.getSignature());
        Object result = joinPoint.proceed();
        System.out.println("After: " + joinPoint.getSignature());
        return result;
    }
}
```

**代理模式架构：**

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="100" width="150" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="125" y="135" text-anchor="middle" font-size="16" font-weight="bold">Client</text>
<rect x="325" y="100" width="150" height="80" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="400" y="125" text-anchor="middle" font-size="16" font-weight="bold">Proxy</text>
<text x="400" y="145" text-anchor="middle" font-size="12">(增强逻辑)</text>
<text x="400" y="165" text-anchor="middle" font-size="12">日志/事务/权限</text>
<rect x="600" y="100" width="150" height="80" fill="#e3f2fd" stroke="#2196f3" stroke-width="2"/>
<text x="675" y="125" text-anchor="middle" font-size="16" font-weight="bold">Target</text>
<text x="675" y="145" text-anchor="middle" font-size="12">(目标对象)</text>
<text x="675" y="165" text-anchor="middle" font-size="12">业务逻辑</text>
<path d="M 200 140 L 325 140" stroke="#333" stroke-width="2" marker-end="url(#arrowhead2)"/>
<text x="262" y="130" text-anchor="middle" font-size="12">调用</text>
<path d="M 475 140 L 600 140" stroke="#333" stroke-width="2" marker-end="url(#arrowhead2)"/>
<text x="537" y="130" text-anchor="middle" font-size="12">委托</text>
<defs>
<marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**4. 模板方法模式（Template Method Pattern）**

定义算法骨架，将某些步骤延迟到子类实现。典型应用：JdbcTemplate、RestTemplate、RedisTemplate。

```java
// JdbcTemplate 使用示例
@Repository
public class UserDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public User findById(Long id) {
        return jdbcTemplate.queryForObject(
            "SELECT * FROM user WHERE id = ?",
            new Object[]{id},
            new BeanPropertyRowMapper<>(User.class)
        );
    }

    public List<User> findAll() {
        return jdbcTemplate.query(
            "SELECT * FROM user",
            new BeanPropertyRowMapper<>(User.class)
        );
    }
}

// 自定义模板方法
public abstract class AbstractService {
    public final void execute() {
        validate();      // 模板方法定义流程
        doExecute();     // 子类实现具体逻辑
        logResult();     // 模板方法定义流程
    }

    protected abstract void doExecute();

    private void validate() {
        System.out.println("参数校验");
    }

    private void logResult() {
        System.out.println("记录日志");
    }
}
```

**5. 观察者模式（Observer Pattern）**

事件驱动模型，ApplicationContext 实现了 ApplicationEventPublisher 接口。

```java
// 自定义事件
public class UserRegisteredEvent extends ApplicationEvent {
    private String username;
    private String email;

    public UserRegisteredEvent(Object source, String username, String email) {
        super(source);
        this.username = username;
        this.email = email;
    }

    // getters
}

// 事件发布者
@Service
public class UserService {
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public void register(String username, String email) {
        // 注册逻辑
        saveUser(username, email);

        // 发布事件
        eventPublisher.publishEvent(
            new UserRegisteredEvent(this, username, email)
        );
    }
}

// 事件监听者1：发送欢迎邮件
@Component
public class EmailListener {
    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        System.out.println("发送欢迎邮件给: " + event.getEmail());
    }
}

// 事件监听者2：发送积分
@Component
public class PointListener {
    @EventListener
    @Async
    public void handleUserRegistered(UserRegisteredEvent event) {
        System.out.println("赠送新人积分给: " + event.getUsername());
    }
}
```

**事件驱动模型：**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="300" y="50" width="200" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="400" y="85" text-anchor="middle" font-size="16" font-weight="bold">Event Publisher</text>
<text x="400" y="110" text-anchor="middle" font-size="14">UserService</text>
<ellipse cx="400" cy="200" rx="80" ry="40" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="400" y="205" text-anchor="middle" font-size="14" font-weight="bold">Event</text>
<rect x="100" y="300" width="150" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="175" y="325" text-anchor="middle" font-size="14" font-weight="bold">Listener 1</text>
<text x="175" y="345" text-anchor="middle" font-size="12">EmailListener</text>
<rect x="325" y="300" width="150" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="400" y="325" text-anchor="middle" font-size="14" font-weight="bold">Listener 2</text>
<text x="400" y="345" text-anchor="middle" font-size="12">PointListener</text>
<rect x="550" y="300" width="150" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="625" y="325" text-anchor="middle" font-size="14" font-weight="bold">Listener 3</text>
<text x="625" y="345" text-anchor="middle" font-size="12">SMSListener</text>
<path d="M 400 130 L 400 160" stroke="#333" stroke-width="2" marker-end="url(#arrowhead3)"/>
<text x="420" y="150" font-size="12">发布事件</text>
<path d="M 350 230 L 200 300" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead3)"/>
<path d="M 400 240 L 400 300" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead3)"/>
<path d="M 450 230 L 600 300" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead3)"/>
<text x="250" y="270" font-size="12" fill="#4caf50">通知</text>
<defs>
<marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**6. 策略模式（Strategy Pattern）**

定义一系列算法，封装起来，使它们可以互相替换。典型应用：Resource 加载策略。

```java
// Resource 加载策略
ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
Resource resource1 = context.getResource("classpath:config.properties");
Resource resource2 = context.getResource("file:/path/to/config.properties");
Resource resource3 = context.getResource("https://example.com/config.properties");

// 自定义策略模式
public interface PaymentStrategy {
    void pay(BigDecimal amount);
}

@Component("alipay")
public class AlipayStrategy implements PaymentStrategy {
    @Override
    public void pay(BigDecimal amount) {
        System.out.println("支付宝支付: " + amount);
    }
}

@Component("wechat")
public class WechatPayStrategy implements PaymentStrategy {
    @Override
    public void pay(BigDecimal amount) {
        System.out.println("微信支付: " + amount);
    }
}

@Service
public class PaymentService {
    @Autowired
    private Map<String, PaymentStrategy> strategyMap;

    public void pay(String type, BigDecimal amount) {
        PaymentStrategy strategy = strategyMap.get(type);
        if (strategy != null) {
            strategy.pay(amount);
        }
    }
}
```

**7. 适配器模式（Adapter Pattern）**

将一个类的接口转换成客户希望的另一个接口。典型应用：HandlerAdapter、MethodBeforeAdviceAdapter。

```java
// Spring MVC HandlerAdapter
public interface HandlerAdapter {
    boolean supports(Object handler);
    ModelAndView handle(HttpServletRequest request,
                       HttpServletResponse response,
                       Object handler) throws Exception;
}

// RequestMappingHandlerAdapter 适配 @RequestMapping 注解的方法
// HttpRequestHandlerAdapter 适配 HttpRequestHandler 接口
// SimpleControllerHandlerAdapter 适配 Controller 接口

// AOP Advisor 适配器
@Component
public class MethodBeforeAdviceAdapter implements AdvisorAdapter {
    @Override
    public boolean supportsAdvice(Advice advice) {
        return (advice instanceof MethodBeforeAdvice);
    }

    @Override
    public MethodInterceptor getInterceptor(Advisor advisor) {
        MethodBeforeAdvice advice = (MethodBeforeAdvice) advisor.getAdvice();
        return new MethodBeforeAdviceInterceptor(advice);
    }
}
```

**8. 装饰器模式（Decorator Pattern）**

动态地给对象添加额外职责。典型应用：BeanWrapper、HttpRequestWrapper。

```java
// BeanWrapper 示例
BeanWrapper wrapper = new BeanWrapperImpl(new User());
wrapper.setPropertyValue("name", "张三");
wrapper.setPropertyValue("age", 25);
User user = (User) wrapper.getWrappedInstance();

// HttpServletRequestWrapper 示例
public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {
    public XssHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
    }

    @Override
    public String getParameter(String name) {
        String value = super.getParameter(name);
        return cleanXSS(value);
    }

    private String cleanXSS(String value) {
        if (value == null) return null;
        return value.replaceAll("<", "&lt;")
                   .replaceAll(">", "&gt;");
    }
}
```

**9. 责任链模式（Chain of Responsibility Pattern）**

为请求创建一个接收者对象链。典型应用：Filter Chain、Interceptor Chain。

```java
// Filter 责任链
@Component
public class AuthFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                        FilterChain chain) throws IOException, ServletException {
        System.out.println("认证过滤器");
        chain.doFilter(request, response);  // 传递给下一个过滤器
    }
}

@Component
public class LogFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                        FilterChain chain) throws IOException, ServletException {
        System.out.println("日志过滤器");
        chain.doFilter(request, response);
    }
}

// Interceptor 责任链
@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request,
                           HttpServletResponse response,
                           Object handler) throws Exception {
        System.out.println("登录拦截器");
        return true;  // 返回 true 继续执行，false 中断
    }
}
```

**责任链模式架构：**

<svg viewBox="0 0 900 250" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="80" width="120" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="110" y="110" text-anchor="middle" font-size="14" font-weight="bold">Filter 1</text>
<text x="110" y="135" text-anchor="middle" font-size="12">认证</text>
<rect x="230" y="80" width="120" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="290" y="110" text-anchor="middle" font-size="14" font-weight="bold">Filter 2</text>
<text x="290" y="135" text-anchor="middle" font-size="12">日志</text>
<rect x="410" y="80" width="120" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="470" y="110" text-anchor="middle" font-size="14" font-weight="bold">Filter 3</text>
<text x="470" y="135" text-anchor="middle" font-size="12">XSS</text>
<rect x="590" y="80" width="120" height="80" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="650" y="110" text-anchor="middle" font-size="14" font-weight="bold">Interceptor 1</text>
<text x="650" y="135" text-anchor="middle" font-size="12">权限</text>
<rect x="750" y="80" width="120" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="810" y="110" text-anchor="middle" font-size="14" font-weight="bold">Controller</text>
<text x="810" y="135" text-anchor="middle" font-size="12">业务处理</text>
<path d="M 170 120 L 230 120" stroke="#333" stroke-width="2" marker-end="url(#arrowhead4)"/>
<path d="M 350 120 L 410 120" stroke="#333" stroke-width="2" marker-end="url(#arrowhead4)"/>
<path d="M 530 120 L 590 120" stroke="#333" stroke-width="2" marker-end="url(#arrowhead4)"/>
<path d="M 710 120 L 750 120" stroke="#333" stroke-width="2" marker-end="url(#arrowhead4)"/>
<path d="M 30 120 L 50 120" stroke="#333" stroke-width="3" marker-end="url(#arrowhead4)"/>
<text x="30" y="110" font-size="14" font-weight="bold">Request</text>
<defs>
<marker id="arrowhead4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**10. 建造者模式（Builder Pattern）**

将复杂对象的构建与表示分离。典型应用：StringBuilder、UriComponentsBuilder、ResponseEntity.BodyBuilder。

```java
// UriComponentsBuilder 示例
URI uri = UriComponentsBuilder
    .fromUriString("https://api.example.com")
    .path("/users/{id}")
    .queryParam("type", "admin")
    .queryParam("status", "active")
    .buildAndExpand(123)
    .toUri();

// ResponseEntity 建造者
@GetMapping("/user/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    return ResponseEntity
        .ok()
        .header("X-Custom-Header", "value")
        .cacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS))
        .body(user);
}

// 自定义建造者
@Component
public class EmailBuilder {
    private String to;
    private String subject;
    private String content;
    private List<String> attachments = new ArrayList<>();

    public EmailBuilder to(String to) {
        this.to = to;
        return this;
    }

    public EmailBuilder subject(String subject) {
        this.subject = subject;
        return this;
    }

    public EmailBuilder content(String content) {
        this.content = content;
        return this;
    }

    public EmailBuilder attach(String file) {
        this.attachments.add(file);
        return this;
    }

    public Email build() {
        return new Email(to, subject, content, attachments);
    }
}

// 使用
Email email = emailBuilder
    .to("user@example.com")
    .subject("Welcome")
    .content("欢迎注册")
    .attach("guide.pdf")
    .build();
```

**11. 依赖注入模式（Dependency Injection）**

IoC（控制反转）的一种实现方式，Spring 的核心设计思想。

```java
// 构造器注入（推荐）
@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
}

// Setter 注入
@Service
public class OrderService {
    private PaymentService paymentService;

    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}

// 字段注入（不推荐）
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
}
```

**12. 前端控制器模式（Front Controller Pattern）**

提供一个集中的请求处理机制。典型应用：DispatcherServlet。

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="200" width="120" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="110" y="225" text-anchor="middle" font-size="14" font-weight="bold">Client</text>
<text x="110" y="245" text-anchor="middle" font-size="12">浏览器</text>
<rect x="300" y="180" width="200" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="3"/>
<text x="400" y="210" text-anchor="middle" font-size="16" font-weight="bold">DispatcherServlet</text>
<text x="400" y="235" text-anchor="middle" font-size="12">(前端控制器)</text>
<text x="400" y="255" text-anchor="middle" font-size="12">统一入口</text>
<rect x="300" y="350" width="90" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="345" y="375" text-anchor="middle" font-size="12" font-weight="bold">Controller A</text>
<text x="345" y="395" text-anchor="middle" font-size="10">/user/**</text>
<rect x="410" y="350" width="90" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="455" y="375" text-anchor="middle" font-size="12" font-weight="bold">Controller B</text>
<text x="455" y="395" text-anchor="middle" font-size="10">/order/**</text>
<rect x="520" y="350" width="90" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="565" y="375" text-anchor="middle" font-size="12" font-weight="bold">Controller C</text>
<text x="565" y="395" text-anchor="middle" font-size="10">/product/**</text>
<rect x="630" y="180" width="120" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="690" y="210" text-anchor="middle" font-size="14" font-weight="bold">View Resolver</text>
<text x="690" y="235" text-anchor="middle" font-size="12">视图解析器</text>
<path d="M 170 230 L 300 230" stroke="#333" stroke-width="2" marker-end="url(#arrowhead5)"/>
<text x="235" y="220" text-anchor="middle" font-size="12">1. 请求</text>
<path d="M 400 280 L 345 350" stroke="#333" stroke-width="2" marker-end="url(#arrowhead5)"/>
<path d="M 400 280 L 455 350" stroke="#333" stroke-width="2" marker-end="url(#arrowhead5)"/>
<path d="M 400 280 L 565 350" stroke="#333" stroke-width="2" marker-end="url(#arrowhead5)"/>
<text x="370" y="320" font-size="12">2. 路由</text>
<path d="M 500 230 L 630 230" stroke="#333" stroke-width="2" marker-end="url(#arrowhead5)"/>
<text x="565" y="220" text-anchor="middle" font-size="12">3. 解析视图</text>
<path d="M 630 250 L 500 250" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead5)"/>
<text x="565" y="270" text-anchor="middle" font-size="12" fill="#4caf50">4. 返回</text>
<path d="M 300 250 L 170 250" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead5)"/>
<text x="235" y="270" text-anchor="middle" font-size="12" fill="#4caf50">5. 响应</text>
<defs>
<marker id="arrowhead5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**13. Spring 设计模式总结表**

| 设计模式 | 典型应用 | 核心作用 |
|---------|---------|---------|
| 工厂模式 | BeanFactory、ApplicationContext | 创建和管理对象 |
| 单例模式 | Spring Bean 默认作用域 | 确保全局唯一实例 |
| 代理模式 | AOP、JDK 动态代理、CGLIB | 增强目标对象功能 |
| 模板方法模式 | JdbcTemplate、RestTemplate | 定义算法骨架 |
| 观察者模式 | ApplicationEvent、ApplicationListener | 事件驱动 |
| 策略模式 | Resource 加载策略 | 算法可替换 |
| 适配器模式 | HandlerAdapter、AdvisorAdapter | 接口转换 |
| 装饰器模式 | BeanWrapper、RequestWrapper | 动态增强职责 |
| 责任链模式 | Filter Chain、Interceptor Chain | 请求处理链 |
| 建造者模式 | UriComponentsBuilder、ResponseEntity | 复杂对象构建 |
| 依赖注入 | @Autowired、构造器注入 | 解耦和控制反转 |
| 前端控制器 | DispatcherServlet | 统一请求入口 |

**关键要点：**

1. **工厂模式**是 Spring 的基础，BeanFactory 和 ApplicationContext 是核心容器
2. **单例模式**确保 Bean 在容器中唯一，通过三级缓存解决循环依赖
3. **代理模式**是 AOP 的实现基础，分为 JDK 动态代理和 CGLIB 代理
4. **模板方法模式**封装通用流程，如 JdbcTemplate 处理资源管理和异常
5. **观察者模式**实现事件驱动，支持异步和解耦
6. **策略模式**提供多种实现方式，运行时动态选择
7. **适配器模式**统一不同接口，如 HandlerAdapter 适配多种 Controller
8. **装饰器模式**动态增强对象功能，不修改原始类
9. **责任链模式**实现过滤器和拦截器链，灵活组合处理逻辑
10. **建造者模式**简化复杂对象构建，提供流式 API
11. **依赖注入**是 Spring 的核心思想，实现 IoC 和解耦
12. **前端控制器模式**统一请求入口，DispatcherServlet 是 Spring MVC 的核心

**记忆口诀：**

工厂创建单例管，代理增强模板干。观察事件策略选，适配装饰责任链。建造复杂依赖注，前端控制统一管。

### 76. 什么是 Spring 的监听器？如何使用？

**1. 核心定义**

Spring 监听器（Listener）是基于观察者模式实现的事件驱动机制，用于监听和响应 Spring 容器中发生的各种事件。当特定事件触发时，监听器会自动执行相应的处理逻辑。

**监听器机制架构：**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="150" width="150" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="125" y="180" text-anchor="middle" font-size="16" font-weight="bold">Event Publisher</text>
<text x="125" y="205" text-anchor="middle" font-size="12">ApplicationContext</text>
<ellipse cx="350" cy="190" rx="70" ry="40" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="350" y="185" text-anchor="middle" font-size="14" font-weight="bold">Event</text>
<text x="350" y="203" text-anchor="middle" font-size="11">ApplicationEvent</text>
<rect x="550" y="50" width="180" height="70" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="640" y="75" text-anchor="middle" font-size="14" font-weight="bold">Listener 1</text>
<text x="640" y="95" text-anchor="middle" font-size="11">@EventListener</text>
<text x="640" y="110" text-anchor="middle" font-size="11">同步处理</text>
<rect x="550" y="150" width="180" height="70" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="640" y="175" text-anchor="middle" font-size="14" font-weight="bold">Listener 2</text>
<text x="640" y="195" text-anchor="middle" font-size="11">ApplicationListener</text>
<text x="640" y="210" text-anchor="middle" font-size="11">接口实现</text>
<rect x="550" y="250" width="180" height="70" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="640" y="275" text-anchor="middle" font-size="14" font-weight="bold">Listener 3</text>
<text x="640" y="295" text-anchor="middle" font-size="11">@Async @EventListener</text>
<text x="640" y="310" text-anchor="middle" font-size="11">异步处理</text>
<path d="M 200 190 L 280 190" stroke="#333" stroke-width="2" marker-end="url(#arrowhead6)"/>
<text x="240" y="180" text-anchor="middle" font-size="12">发布</text>
<path d="M 420 170 L 550 85" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead6)"/>
<path d="M 420 190 L 550 185" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead6)"/>
<path d="M 420 210 L 550 285" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead6)"/>
<text x="490" y="130" font-size="11" fill="#4caf50">通知</text>
<defs>
<marker id="arrowhead6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#4caf50"/>
</marker>
</defs>
</svg>

**2. Spring 监听器的三个核心组件**

- **ApplicationEvent（事件）**：事件源，继承自 `java.util.EventObject`
- **ApplicationListener（监听器）**：事件监听者，监听特定事件
- **ApplicationEventPublisher（事件发布者）**：发布事件到监听器

**3. Spring 内置事件**

Spring 容器在生命周期中会自动发布以下事件：

| 事件类型 | 触发时机 | 说明 |
|---------|---------|------|
| ContextRefreshedEvent | 容器初始化或刷新完成 | ApplicationContext 被初始化或刷新时 |
| ContextStartedEvent | 容器启动 | 调用 context.start() 时 |
| ContextStoppedEvent | 容器停止 | 调用 context.stop() 时 |
| ContextClosedEvent | 容器关闭 | 调用 context.close() 时 |
| RequestHandledEvent | HTTP 请求处理完成 | 仅限 Web 应用 |

```java
// 监听容器初始化完成事件
@Component
public class ApplicationStartListener {
    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        System.out.println("容器初始化完成，开始加载数据...");
        // 初始化缓存、加载配置等
    }
}

// 监听容器关闭事件
@Component
public class ApplicationShutdownListener {
    @EventListener
    public void handleContextClose(ContextClosedEvent event) {
        System.out.println("容器即将关闭，清理资源...");
        // 关闭连接池、保存状态等
    }
}
```

**4. 自定义事件和监听器**

**方式一：使用 @EventListener 注解（推荐）**

```java
// 1. 定义事件
public class UserRegisteredEvent extends ApplicationEvent {
    private String username;
    private String email;
    private LocalDateTime registerTime;

    public UserRegisteredEvent(Object source, String username, String email) {
        super(source);
        this.username = username;
        this.email = email;
        this.registerTime = LocalDateTime.now();
    }

    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public LocalDateTime getRegisterTime() { return registerTime; }
}

// 2. 发布事件
@Service
public class UserService {
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    private UserRepository userRepository;

    public void register(String username, String email, String password) {
        // 业务逻辑
        User user = new User(username, email, password);
        userRepository.save(user);

        // 发布事件
        UserRegisteredEvent event = new UserRegisteredEvent(this, username, email);
        eventPublisher.publishEvent(event);

        System.out.println("用户注册成功: " + username);
    }
}

// 3. 监听事件（方式一：@EventListener 注解）
@Component
public class EmailNotificationListener {

    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        System.out.println("发送欢迎邮件给: " + event.getEmail());
        sendWelcomeEmail(event.getEmail(), event.getUsername());
    }

    private void sendWelcomeEmail(String email, String username) {
        // 发送邮件逻辑
    }
}

@Component
public class PointRewardListener {

    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        System.out.println("赠送新人积分给: " + event.getUsername());
        rewardPoints(event.getUsername(), 100);
    }

    private void rewardPoints(String username, int points) {
        // 积分赠送逻辑
    }
}
```

**方式二：实现 ApplicationListener 接口**

```java
@Component
public class SMSNotificationListener implements ApplicationListener<UserRegisteredEvent> {

    @Override
    public void onApplicationEvent(UserRegisteredEvent event) {
        System.out.println("发送短信通知给: " + event.getUsername());
        sendSMS(event.getUsername(), "欢迎注册");
    }

    private void sendSMS(String username, String message) {
        // 发送短信逻辑
    }
}
```

**5. 异步监听器**

默认情况下，事件监听是同步的，会阻塞发布者线程。使用 `@Async` 注解可以实现异步监听。

```java
// 1. 启用异步支持
@Configuration
@EnableAsync
public class AsyncConfig {
    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-event-");
        executor.initialize();
        return executor;
    }
}

// 2. 异步监听器
@Component
public class AsyncEmailListener {

    @Async
    @EventListener
    public void handleUserRegistered(UserRegisteredEvent event) {
        System.out.println("异步发送邮件（线程: " +
            Thread.currentThread().getName() + "）");

        // 模拟耗时操作
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("邮件发送完成: " + event.getEmail());
    }
}
```

**同步 vs 异步监听器：**

<svg viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg">
<text x="150" y="30" text-anchor="middle" font-size="16" font-weight="bold">同步监听器</text>
<rect x="50" y="50" width="100" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="100" y="75" text-anchor="middle" font-size="12" font-weight="bold">Publisher</text>
<text x="100" y="95" text-anchor="middle" font-size="10">发布事件</text>
<rect x="200" y="50" width="100" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="250" y="75" text-anchor="middle" font-size="12" font-weight="bold">Listener 1</text>
<text x="250" y="95" text-anchor="middle" font-size="10">处理中...</text>
<rect x="200" y="130" width="100" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="250" y="155" text-anchor="middle" font-size="12" font-weight="bold">Listener 2</text>
<text x="250" y="175" text-anchor="middle" font-size="10">处理中...</text>
<rect x="50" y="210" width="100" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="100" y="235" text-anchor="middle" font-size="12" font-weight="bold">Publisher</text>
<text x="100" y="255" text-anchor="middle" font-size="10">继续执行</text>
<path d="M 150 80 L 200 80" stroke="#333" stroke-width="2" marker-end="url(#arrowhead7)"/>
<text x="175" y="95" text-anchor="middle" font-size="10">1</text>
<path d="M 250 110 L 250 130" stroke="#333" stroke-width="2" marker-end="url(#arrowhead7)"/>
<text x="265" y="125" font-size="10">2</text>
<path d="M 200 160 L 150 160 L 150 210" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead7)"/>
<text x="165" y="185" font-size="10" fill="#4caf50">3</text>
<text x="175" y="310" text-anchor="middle" font-size="11" fill="#d32f2f">❌ 阻塞发布者，处理完才能继续</text>
<text x="600" y="30" text-anchor="middle" font-size="16" font-weight="bold">异步监听器</text>
<rect x="500" y="50" width="100" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="550" y="75" text-anchor="middle" font-size="12" font-weight="bold">Publisher</text>
<text x="550" y="95" text-anchor="middle" font-size="10">发布事件</text>
<rect x="650" y="50" width="100" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="700" y="70" text-anchor="middle" font-size="12" font-weight="bold">Listener 1</text>
<text x="700" y="88" text-anchor="middle" font-size="9">（线程池）</text>
<text x="700" y="102" text-anchor="middle" font-size="10">处理中...</text>
<rect x="650" y="130" width="100" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="700" y="150" text-anchor="middle" font-size="12" font-weight="bold">Listener 2</text>
<text x="700" y="168" text-anchor="middle" font-size="9">（线程池）</text>
<text x="700" y="182" text-anchor="middle" font-size="10">处理中...</text>
<rect x="500" y="130" width="100" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="550" y="155" text-anchor="middle" font-size="12" font-weight="bold">Publisher</text>
<text x="550" y="175" text-anchor="middle" font-size="10">立即继续</text>
<path d="M 600 80 L 650 80" stroke="#333" stroke-width="2" marker-end="url(#arrowhead7)"/>
<text x="625" y="95" text-anchor="middle" font-size="10">1</text>
<path d="M 650 160 L 650 160" stroke="#333" stroke-width="2"/>
<path d="M 600 100 L 600 130 L 550 130" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead7)"/>
<text x="570" y="118" font-size="10" fill="#4caf50">2 立即返回</text>
<text x="625" y="310" text-anchor="middle" font-size="11" fill="#388e3c">✅ 不阻塞发布者，并行处理</text>
<defs>
<marker id="arrowhead7" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**6. 监听器排序**

使用 `@Order` 注解控制监听器的执行顺序（数字越小优先级越高）。

```java
@Component
@Order(1)
public class FirstListener {
    @EventListener
    public void handle(UserRegisteredEvent event) {
        System.out.println("第一个监听器执行");
    }
}

@Component
@Order(2)
public class SecondListener {
    @EventListener
    public void handle(UserRegisteredEvent event) {
        System.out.println("第二个监听器执行");
    }
}

// 使用 @EventListener 的 condition 属性（优先级更高）
@Component
public class ConditionalListener {
    @EventListener(condition = "#event.username == 'admin'")
    public void handle(UserRegisteredEvent event) {
        System.out.println("仅处理 admin 用户注册");
    }
}
```

**7. 条件监听**

使用 SpEL 表达式实现条件监听。

```java
@Component
public class ConditionalEventListener {

    // 仅监听 VIP 用户注册
    @EventListener(condition = "#event.userType == 'VIP'")
    public void handleVipUser(UserRegisteredEvent event) {
        System.out.println("VIP 用户注册，赠送额外礼包");
    }

    // 仅监听特定邮箱域名
    @EventListener(condition = "#event.email.endsWith('@company.com')")
    public void handleCompanyEmail(UserRegisteredEvent event) {
        System.out.println("企业邮箱注册，开通企业权限");
    }

    // 复杂条件
    @EventListener(condition = "#event.age >= 18 && #event.country == 'CN'")
    public void handleAdultChinese(UserRegisteredEvent event) {
        System.out.println("成年中国用户，推送特定内容");
    }
}
```

**8. 事务事件监听**

使用 `@TransactionalEventListener` 在事务的不同阶段监听事件。

```java
@Component
public class TransactionalEventListener {

    // 事务提交后执行（默认）
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAfterCommit(UserRegisteredEvent event) {
        System.out.println("事务提交成功后，发送欢迎邮件");
        // 此时数据库事务已提交，数据持久化完成
    }

    // 事务回滚后执行
    @TransactionalEventListener(phase = TransactionPhase.AFTER_ROLLBACK)
    public void handleAfterRollback(UserRegisteredEvent event) {
        System.out.println("事务回滚，记录失败日志");
    }

    // 事务完成后执行（无论提交还是回滚）
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMPLETION)
    public void handleAfterCompletion(UserRegisteredEvent event) {
        System.out.println("事务完成，清理临时资源");
    }

    // 事务提交前执行
    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleBeforeCommit(UserRegisteredEvent event) {
        System.out.println("事务提交前，执行额外校验");
    }
}
```

**事务事件监听流程：**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="150" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="125" y="75" text-anchor="middle" font-size="14" font-weight="bold">开始事务</text>
<text x="125" y="95" text-anchor="middle" font-size="11">@Transactional</text>
<rect x="50" y="150" width="150" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="125" y="175" text-anchor="middle" font-size="14" font-weight="bold">执行业务逻辑</text>
<text x="125" y="195" text-anchor="middle" font-size="11">发布事件</text>
<rect x="50" y="250" width="150" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="125" y="270" text-anchor="middle" font-size="12" font-weight="bold">BEFORE_COMMIT</text>
<text x="125" y="290" text-anchor="middle" font-size="10">提交前监听器</text>
<rect x="250" y="250" width="150" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="325" y="270" text-anchor="middle" font-size="12" font-weight="bold">AFTER_COMMIT</text>
<text x="325" y="290" text-anchor="middle" font-size="10">提交后监听器</text>
<rect x="450" y="250" width="150" height="60" fill="#ffebee" stroke="#f44336" stroke-width="2"/>
<text x="525" y="270" text-anchor="middle" font-size="12" font-weight="bold">AFTER_ROLLBACK</text>
<text x="525" y="290" text-anchor="middle" font-size="10">回滚后监听器</text>
<rect x="250" y="350" width="150" height="60" fill="#fce4ec" stroke="#e91e63" stroke-width="2"/>
<text x="325" y="370" text-anchor="middle" font-size="12" font-weight="bold">AFTER_COMPLETION</text>
<text x="325" y="390" text-anchor="middle" font-size="10">完成后监听器</text>
<path d="M 125 110 L 125 150" stroke="#333" stroke-width="2" marker-end="url(#arrowhead8)"/>
<path d="M 125 210 L 125 250" stroke="#333" stroke-width="2" marker-end="url(#arrowhead8)"/>
<path d="M 125 310 L 125 330 L 250 330 L 250 310" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead8)"/>
<text x="175" y="325" font-size="10" fill="#4caf50">提交成功</text>
<path d="M 125 310 L 125 330 L 450 330 L 450 310" stroke="#f44336" stroke-width="2" marker-end="url(#arrowhead8)" stroke-dasharray="5,5"/>
<text x="275" y="345" font-size="10" fill="#f44336">提交失败</text>
<path d="M 325 310 L 325 350" stroke="#333" stroke-width="2" marker-end="url(#arrowhead8)"/>
<path d="M 525 310 L 525 330 L 400 330 L 400 350" stroke="#333" stroke-width="2" marker-end="url(#arrowhead8)" stroke-dasharray="5,5"/>
<defs>
<marker id="arrowhead8" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**9. 泛型事件监听**

使用泛型可以监听特定类型的事件。

```java
// 泛型事件基类
public class EntityEvent<T> extends ApplicationEvent {
    private T entity;
    private String operation;

    public EntityEvent(Object source, T entity, String operation) {
        super(source);
        this.entity = entity;
        this.operation = operation;
    }

    public T getEntity() { return entity; }
    public String getOperation() { return operation; }
}

// 监听所有实体事件
@Component
public class GenericEntityListener {

    @EventListener
    public void handleUserEvent(EntityEvent<User> event) {
        System.out.println("User 实体操作: " + event.getOperation());
    }

    @EventListener
    public void handleOrderEvent(EntityEvent<Order> event) {
        System.out.println("Order 实体操作: " + event.getOperation());
    }
}

// 发布事件
@Service
public class UserService {
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public void createUser(User user) {
        // 创建用户
        userRepository.save(user);

        // 发布事件
        eventPublisher.publishEvent(new EntityEvent<>(this, user, "CREATE"));
    }
}
```

**10. 监听器的最佳实践**

```java
@Component
@Slf4j
public class BestPracticeListener {

    // 1. 异步处理耗时操作
    @Async
    @EventListener
    public void handleTimeConsuming(UserRegisteredEvent event) {
        log.info("异步处理邮件发送");
        sendEmail(event.getEmail());
    }

    // 2. 事务监听确保数据一致性
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAfterTransaction(UserRegisteredEvent event) {
        log.info("事务提交后，更新缓存");
        updateCache(event.getUsername());
    }

    // 3. 异常处理
    @EventListener
    public void handleWithErrorHandling(UserRegisteredEvent event) {
        try {
            processEvent(event);
        } catch (Exception e) {
            log.error("事件处理失败: {}", e.getMessage(), e);
            // 可以发布错误事件或记录到监控系统
        }
    }

    // 4. 条件监听避免不必要的处理
    @EventListener(condition = "#event.userType == 'VIP'")
    public void handleVipOnly(UserRegisteredEvent event) {
        log.info("仅处理 VIP 用户");
    }

    // 5. 使用 @Order 控制执行顺序
    @Order(1)
    @EventListener
    public void handleFirst(UserRegisteredEvent event) {
        log.info("优先执行的监听器");
    }
}
```

**11. 监听器 vs 观察者模式对比**

| 特性 | Spring 监听器 | 传统观察者模式 |
|-----|-------------|--------------|
| 耦合度 | 低（通过事件解耦） | 中（主题需维护观察者列表） |
| 实现方式 | 注解或接口 | 接口实现 |
| 异步支持 | 原生支持 @Async | 需自行实现 |
| 事务支持 | 原生支持 @TransactionalEventListener | 需自行实现 |
| 条件监听 | 支持 SpEL 表达式 | 需自行实现 |
| 排序 | 支持 @Order | 需自行实现 |
| 容器管理 | Spring 自动管理 | 手动管理 |

**关键要点：**

1. **监听器机制**基于观察者模式，实现事件驱动的解耦架构
2. **三个核心组件**：ApplicationEvent（事件）、ApplicationListener（监听器）、ApplicationEventPublisher（发布者）
3. **@EventListener** 注解是最简洁的监听器实现方式，推荐使用
4. **@Async** 注解实现异步监听，避免阻塞发布者线程
5. **@TransactionalEventListener** 在事务的不同阶段监听事件，确保数据一致性
6. **@Order** 注解控制监听器执行顺序
7. **condition** 属性支持 SpEL 表达式，实现条件监听
8. **内置事件**包括容器初始化、启动、停止、关闭等生命周期事件
9. **异常处理**应在监听器内部 try-catch，避免影响其他监听器
10. **最佳实践**：耗时操作异步处理、事务相关操作使用事务监听、添加异常处理、合理使用条件监听

**记忆口诀：**

事件监听三角色，发布监听加事件。异步注解不阻塞，事务监听保一致。条件排序灵活用，解耦增强好架构。

### 77. 什么是 Spring 的事件机制？

**1. 核心定义**

Spring 事件机制是基于观察者设计模式实现的一种应用内消息传递机制，允许 Bean 之间进行松耦合的通信。当某个事件发生时，事件发布者发布事件，所有订阅该事件的监听器会自动收到通知并执行相应的处理逻辑。

**事件机制架构图：**

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="200" width="180" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="3"/>
<text x="140" y="230" text-anchor="middle" font-size="16" font-weight="bold">ApplicationContext</text>
<text x="140" y="255" text-anchor="middle" font-size="12">(ApplicationEventPublisher)</text>
<text x="140" y="280" text-anchor="middle" font-size="12">事件发布器</text>
<ellipse cx="400" cy="250" rx="90" ry="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
<text x="400" y="240" text-anchor="middle" font-size="14" font-weight="bold">ApplicationEvent</text>
<text x="400" y="260" text-anchor="middle" font-size="12">事件对象</text>
<rect x="600" y="50" width="250" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="725" y="80" text-anchor="middle" font-size="14" font-weight="bold">ApplicationListener 1</text>
<text x="725" y="105" text-anchor="middle" font-size="11">邮件通知监听器</text>
<rect x="600" y="150" width="250" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="725" y="180" text-anchor="middle" font-size="14" font-weight="bold">ApplicationListener 2</text>
<text x="725" y="205" text-anchor="middle" font-size="11">积分奖励监听器</text>
<rect x="600" y="250" width="250" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="725" y="280" text-anchor="middle" font-size="14" font-weight="bold">ApplicationListener 3</text>
<text x="725" y="305" text-anchor="middle" font-size="11">短信通知监听器</text>
<rect x="600" y="350" width="250" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="725" y="380" text-anchor="middle" font-size="14" font-weight="bold">ApplicationListener N</text>
<text x="725" y="405" text-anchor="middle" font-size="11">日志记录监听器</text>
<path d="M 230 250 L 310 250" stroke="#333" stroke-width="3" marker-end="url(#arrowhead9)"/>
<text x="270" y="240" text-anchor="middle" font-size="12" font-weight="bold">发布</text>
<path d="M 490 230 L 600 90" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead9)"/>
<path d="M 490 245 L 600 190" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead9)"/>
<path d="M 490 260 L 600 290" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead9)"/>
<path d="M 490 275 L 600 390" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead9)"/>
<text x="550" y="150" font-size="12" fill="#4caf50" font-weight="bold">广播通知</text>
<rect x="50" y="50" width="180" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="140" y="80" text-anchor="middle" font-size="14" font-weight="bold">Event Publisher</text>
<text x="140" y="105" text-anchor="middle" font-size="11">业务服务层</text>
<path d="M 140 130 L 140 200" stroke="#333" stroke-width="2" marker-end="url(#arrowhead9)" stroke-dasharray="5,5"/>
<text x="160" y="170" font-size="11">注入</text>
<defs>
<marker id="arrowhead9" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**2. 事件机制的核心组件**

**（1）ApplicationEvent - 事件**

所有自定义事件必须继承 `ApplicationEvent` 类。

```java
// 抽象基类
public abstract class ApplicationEvent extends EventObject {
    private final long timestamp;

    public ApplicationEvent(Object source) {
        super(source);
        this.timestamp = System.currentTimeMillis();
    }

    public final long getTimestamp() {
        return this.timestamp;
    }
}

// 自定义事件示例
public class OrderCreatedEvent extends ApplicationEvent {
    private Long orderId;
    private BigDecimal amount;
    private String userId;

    public OrderCreatedEvent(Object source, Long orderId, BigDecimal amount, String userId) {
        super(source);
        this.orderId = orderId;
        this.amount = amount;
        this.userId = userId;
    }

    // getters
    public Long getOrderId() { return orderId; }
    public BigDecimal getAmount() { return amount; }
    public String getUserId() { return userId; }
}
```

**（2）ApplicationEventPublisher - 事件发布器**

`ApplicationContext` 实现了 `ApplicationEventPublisher` 接口，负责发布事件。

```java
public interface ApplicationEventPublisher {
    // 发布事件的核心方法
    void publishEvent(ApplicationEvent event);

    // Spring 4.2+ 支持发布任意对象作为事件
    void publishEvent(Object event);
}

// 使用示例
@Service
public class OrderService {
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public void createOrder(Order order) {
        // 1. 保存订单
        orderRepository.save(order);

        // 2. 发布订单创建事件
        OrderCreatedEvent event = new OrderCreatedEvent(
            this,
            order.getId(),
            order.getAmount(),
            order.getUserId()
        );
        eventPublisher.publishEvent(event);

        System.out.println("订单创建成功，事件已发布");
    }
}
```

**（3）ApplicationListener - 事件监听器**

监听器负责接收和处理事件。

```java
// 方式一：实现 ApplicationListener 接口
@Component
public class OrderCreatedListener implements ApplicationListener<OrderCreatedEvent> {

    @Override
    public void onApplicationEvent(OrderCreatedEvent event) {
        System.out.println("订单创建监听器收到事件:");
        System.out.println("  订单ID: " + event.getOrderId());
        System.out.println("  金额: " + event.getAmount());
        System.out.println("  用户ID: " + event.getUserId());
    }
}

// 方式二：使用 @EventListener 注解（推荐）
@Component
public class OrderNotificationListener {

    @EventListener
    public void handleOrderCreated(OrderCreatedEvent event) {
        System.out.println("发送订单通知给用户: " + event.getUserId());
    }

    @EventListener
    @Async
    public void sendEmailNotification(OrderCreatedEvent event) {
        System.out.println("异步发送邮件通知");
    }
}
```

**（4）ApplicationEventMulticaster - 事件广播器**

Spring 内部使用 `ApplicationEventMulticaster` 将事件分发给所有匹配的监听器。

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="150" width="150" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="125" y="180" text-anchor="middle" font-size="14" font-weight="bold">Publisher</text>
<text x="125" y="205" text-anchor="middle" font-size="11">发布事件</text>
<rect x="300" y="150" width="200" height="80" fill="#fff3e0" stroke="#ff9800" stroke-width="3"/>
<text x="400" y="175" text-anchor="middle" font-size="14" font-weight="bold">EventMulticaster</text>
<text x="400" y="200" text-anchor="middle" font-size="11">事件广播器</text>
<text x="400" y="220" text-anchor="middle" font-size="10">(内部组件)</text>
<rect x="600" y="50" width="150" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="675" y="75" text-anchor="middle" font-size="12">Listener 1</text>
<text x="675" y="95" text-anchor="middle" font-size="10">匹配类型</text>
<rect x="600" y="130" width="150" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="675" y="155" text-anchor="middle" font-size="12">Listener 2</text>
<text x="675" y="175" text-anchor="middle" font-size="10">匹配类型</text>
<rect x="600" y="210" width="150" height="60" fill="#ffebee" stroke="#f44336" stroke-width="2" stroke-dasharray="5,5"/>
<text x="675" y="235" text-anchor="middle" font-size="12">Listener 3</text>
<text x="675" y="255" text-anchor="middle" font-size="10">类型不匹配</text>
<rect x="600" y="290" width="150" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
<text x="675" y="315" text-anchor="middle" font-size="12">Listener N</text>
<text x="675" y="335" text-anchor="middle" font-size="10">匹配类型</text>
<path d="M 200 190 L 300 190" stroke="#333" stroke-width="2" marker-end="url(#arrowhead10)"/>
<text x="250" y="180" text-anchor="middle" font-size="11">发布</text>
<path d="M 500 170 L 600 80" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead10)"/>
<path d="M 500 185 L 600 160" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead10)"/>
<path d="M 500 200 L 600 320" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead10)"/>
<text x="550" y="120" font-size="11" fill="#4caf50">过滤+分发</text>
<defs>
<marker id="arrowhead10" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**3. Spring 内置事件**

Spring 框架在容器生命周期中会发布以下内置事件：

```java
// 1. ContextRefreshedEvent - 容器刷新完成
@Component
public class ContextRefreshedListener {
    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        System.out.println("容器刷新完成，可以执行初始化操作");
        // 加载缓存、预热数据等
    }
}

// 2. ContextStartedEvent - 容器启动
@Component
public class ContextStartedListener {
    @EventListener
    public void handleContextStart(ContextStartedEvent event) {
        System.out.println("容器启动");
        // context.start() 显式调用时触发
    }
}

// 3. ContextStoppedEvent - 容器停止
@Component
public class ContextStoppedListener {
    @EventListener
    public void handleContextStop(ContextStoppedEvent event) {
        System.out.println("容器停止");
        // context.stop() 显式调用时触发
    }
}

// 4. ContextClosedEvent - 容器关闭
@Component
public class ContextClosedListener {
    @EventListener
    public void handleContextClose(ContextClosedEvent event) {
        System.out.println("容器关闭，执行清理操作");
        // 关闭连接池、释放资源等
    }
}

// 5. RequestHandledEvent - HTTP 请求处理完成（仅 Web 应用）
@Component
public class RequestHandledListener {
    @EventListener
    public void handleRequestHandled(RequestHandledEvent event) {
        System.out.println("请求处理完成: " + event.getDescription());
    }
}
```

**4. 事件机制的工作流程**

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="200" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="85" text-anchor="middle" font-size="14" font-weight="bold">1. 业务触发</text>
<text x="150" y="110" text-anchor="middle" font-size="11">用户下单/注册等操作</text>
<rect x="50" y="180" width="200" height="80" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="150" y="215" text-anchor="middle" font-size="14" font-weight="bold">2. 创建事件对象</text>
<text x="150" y="240" text-anchor="middle" font-size="11">new OrderCreatedEvent(...)</text>
<rect x="50" y="310" width="200" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="150" y="345" text-anchor="middle" font-size="14" font-weight="bold">3. 发布事件</text>
<text x="150" y="370" text-anchor="middle" font-size="11">publishEvent(event)</text>
<rect x="350" y="180" width="200" height="80" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="450" y="215" text-anchor="middle" font-size="14" font-weight="bold">4. EventMulticaster</text>
<text x="450" y="240" text-anchor="middle" font-size="11">获取所有监听器</text>
<rect x="350" y="310" width="200" height="80" fill="#e8eaf6" stroke="#3f51b5" stroke-width="2" rx="5"/>
<text x="450" y="345" text-anchor="middle" font-size="14" font-weight="bold">5. 过滤监听器</text>
<text x="450" y="370" text-anchor="middle" font-size="11">匹配事件类型</text>
<rect x="650" y="50" width="200" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="750" y="85" text-anchor="middle" font-size="14" font-weight="bold">6. 调用监听器1</text>
<text x="750" y="110" text-anchor="middle" font-size="11">onApplicationEvent()</text>
<rect x="650" y="150" width="200" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="750" y="185" text-anchor="middle" font-size="14" font-weight="bold">7. 调用监听器2</text>
<text x="750" y="210" text-anchor="middle" font-size="11">onApplicationEvent()</text>
<rect x="650" y="250" width="200" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="750" y="285" text-anchor="middle" font-size="14" font-weight="bold">8. 调用监听器N</text>
<text x="750" y="310" text-anchor="middle" font-size="11">onApplicationEvent()</text>
<rect x="350" y="450" width="200" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="450" y="485" text-anchor="middle" font-size="14" font-weight="bold">9. 返回控制权</text>
<text x="450" y="510" text-anchor="middle" font-size="11">继续执行业务逻辑</text>
<path d="M 150 130 L 150 180" stroke="#333" stroke-width="2" marker-end="url(#arrowhead11)"/>
<path d="M 150 260 L 150 310" stroke="#333" stroke-width="2" marker-end="url(#arrowhead11)"/>
<path d="M 250 350 L 350 220" stroke="#333" stroke-width="2" marker-end="url(#arrowhead11)"/>
<path d="M 450 260 L 450 310" stroke="#333" stroke-width="2" marker-end="url(#arrowhead11)"/>
<path d="M 550 350 L 650 90" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead11)"/>
<path d="M 550 350 L 650 190" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead11)"/>
<path d="M 550 350 L 650 290" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead11)"/>
<path d="M 650 290 L 550 400 L 450 450" stroke="#333" stroke-width="2" marker-end="url(#arrowhead11)" stroke-dasharray="5,5"/>
<text x="280" y="290" font-size="11">发布</text>
<text x="600" y="200" font-size="11" fill="#4caf50">广播</text>
<text x="590" y="400" font-size="11">完成</text>
<defs>
<marker id="arrowhead11" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**5. 同步 vs 异步事件处理**

**同步模式（默认）**

```java
@Component
public class SyncEventListener {

    @EventListener
    public void handleSync(OrderCreatedEvent event) {
        System.out.println("同步处理：" + Thread.currentThread().getName());
        // 主线程执行，会阻塞发布者
        try {
            Thread.sleep(2000);  // 模拟耗时操作
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("同步处理完成");
    }
}
```

**异步模式**

```java
// 1. 启用异步支持
@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-event-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (ex, method, params) -> {
            System.err.println("异步异常: " + ex.getMessage());
        };
    }
}

// 2. 异步监听器
@Component
public class AsyncEventListener {

    @Async
    @EventListener
    public void handleAsync(OrderCreatedEvent event) {
        System.out.println("异步处理：" + Thread.currentThread().getName());
        // 独立线程执行，不阻塞发布者
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("异步处理完成");
    }
}
```

**6. 事务事件监听**

使用 `@TransactionalEventListener` 可以在事务的不同阶段监听事件。

```java
@Component
public class TransactionalListener {

    // 事务提交后执行（默认）
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAfterCommit(OrderCreatedEvent event) {
        System.out.println("事务提交后：发送订单确认邮件");
        // 此时数据库已提交，可以安全发送通知
    }

    // 事务回滚后执行
    @TransactionalEventListener(phase = TransactionPhase.AFTER_ROLLBACK)
    public void handleAfterRollback(OrderCreatedEvent event) {
        System.out.println("事务回滚后：记录订单创建失败日志");
    }

    // 事务完成后执行（无论成功或失败）
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMPLETION)
    public void handleAfterCompletion(OrderCreatedEvent event) {
        System.out.println("事务完成：清理临时数据");
    }

    // 事务提交前执行
    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleBeforeCommit(OrderCreatedEvent event) {
        System.out.println("事务提交前：执行额外的数据校验");
    }
}
```

**7. 泛型事件**

Spring 4.2+ 支持发布任意对象作为事件，无需继承 `ApplicationEvent`。

```java
// 1. 不继承 ApplicationEvent 的事件类
public class UserLoginEvent {
    private String username;
    private LocalDateTime loginTime;
    private String ip;

    public UserLoginEvent(String username, String ip) {
        this.username = username;
        this.loginTime = LocalDateTime.now();
        this.ip = ip;
    }

    // getters
}

// 2. 发布泛型事件
@Service
public class AuthService {
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public void login(String username, String ip) {
        // 登录逻辑
        authenticateUser(username);

        // 发布泛型事件（不需要继承 ApplicationEvent）
        eventPublisher.publishEvent(new UserLoginEvent(username, ip));
    }
}

// 3. 监听泛型事件
@Component
public class LoginListener {

    @EventListener
    public void handleUserLogin(UserLoginEvent event) {
        System.out.println("用户登录: " + event.getUsername());
        System.out.println("IP: " + event.getIp());
        System.out.println("时间: " + event.getLoginTime());
    }
}
```

**8. 条件监听**

使用 SpEL 表达式实现条件监听。

```java
@Component
public class ConditionalEventListener {

    // 仅处理金额大于1000的订单
    @EventListener(condition = "#event.amount > 1000")
    public void handleLargeOrder(OrderCreatedEvent event) {
        System.out.println("大额订单预警: " + event.getAmount());
    }

    // 仅处理特定用户的订单
    @EventListener(condition = "#event.userId == 'VIP001'")
    public void handleVipOrder(OrderCreatedEvent event) {
        System.out.println("VIP 用户订单，优先处理");
    }

    // 复合条件
    @EventListener(condition = "#event.amount > 500 && #event.userId.startsWith('VIP')")
    public void handleVipLargeOrder(OrderCreatedEvent event) {
        System.out.println("VIP 大额订单");
    }
}
```

**9. 监听器排序**

```java
@Component
@Order(1)
public class FirstListener {
    @EventListener
    public void handle(OrderCreatedEvent event) {
        System.out.println("第一个执行");
    }
}

@Component
@Order(2)
public class SecondListener {
    @EventListener
    public void handle(OrderCreatedEvent event) {
        System.out.println("第二个执行");
    }
}

@Component
@Order(3)
public class ThirdListener {
    @EventListener
    public void handle(OrderCreatedEvent event) {
        System.out.println("第三个执行");
    }
}
```

**10. 事件机制的应用场景**

**场景一：用户注册流程解耦**

```java
// 发布事件
@Service
public class UserService {
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public void register(User user) {
        // 1. 保存用户
        userRepository.save(user);

        // 2. 发布事件
        eventPublisher.publishEvent(
            new UserRegisteredEvent(this, user.getUsername(), user.getEmail())
        );
    }
}

// 多个监听器独立处理
@Component
public class WelcomeEmailListener {
    @EventListener
    public void sendWelcomeEmail(UserRegisteredEvent event) {
        emailService.send(event.getEmail(), "欢迎注册");
    }
}

@Component
public class PointRewardListener {
    @EventListener
    public void rewardPoints(UserRegisteredEvent event) {
        pointService.reward(event.getUsername(), 100);
    }
}

@Component
public class AnalyticsListener {
    @EventListener
    public void trackRegistration(UserRegisteredEvent event) {
        analyticsService.track("user_register", event.getUsername());
    }
}
```

**场景二：订单状态变更通知**

```java
// 订单状态变更事件
public class OrderStatusChangedEvent extends ApplicationEvent {
    private Long orderId;
    private OrderStatus oldStatus;
    private OrderStatus newStatus;

    // constructor and getters
}

// 发布事件
@Service
public class OrderService {
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public void updateStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId);
        OrderStatus oldStatus = order.getStatus();

        order.setStatus(newStatus);
        orderRepository.save(order);

        // 发布状态变更事件
        eventPublisher.publishEvent(
            new OrderStatusChangedEvent(this, orderId, oldStatus, newStatus)
        );
    }
}

// 监听器处理不同状态
@Component
public class OrderStatusListener {

    @EventListener(condition = "#event.newStatus.name() == 'PAID'")
    public void handlePaid(OrderStatusChangedEvent event) {
        System.out.println("订单已支付，开始发货准备");
    }

    @EventListener(condition = "#event.newStatus.name() == 'SHIPPED'")
    public void handleShipped(OrderStatusChangedEvent event) {
        System.out.println("订单已发货，发送物流通知");
    }

    @EventListener(condition = "#event.newStatus.name() == 'CANCELLED'")
    public void handleCancelled(OrderStatusChangedEvent event) {
        System.out.println("订单已取消，执行退款流程");
    }
}
```

**11. 事件机制的优缺点**

**优点：**
1. **解耦**：发布者和监听者无需直接依赖，降低耦合度
2. **扩展性强**：新增监听器无需修改发布者代码
3. **异步支持**：通过 @Async 实现非阻塞处理
4. **事务支持**：通过 @TransactionalEventListener 确保数据一致性
5. **灵活性高**：支持条件监听、排序、泛型事件等

**缺点：**
1. **调试困难**：事件流转不如直接调用直观
2. **性能开销**：事件创建和分发有一定开销
3. **异常处理**：监听器异常可能影响其他监听器
4. **事务传播**：同步监听器在同一事务中，需注意事务边界

**关键要点：**

1. **事件机制**基于观察者模式，实现应用内松耦合通信
2. **三大核心组件**：ApplicationEvent（事件）、ApplicationEventPublisher（发布器）、ApplicationListener（监听器）
3. **内部使用 ApplicationEventMulticaster** 进行事件广播和分发
4. **Spring 内置事件**包括容器刷新、启动、停止、关闭等生命周期事件
5. **@EventListener** 注解是推荐的监听器实现方式，简洁且功能强大
6. **@Async** 实现异步监听，避免阻塞主线程
7. **@TransactionalEventListener** 在事务的不同阶段监听事件
8. **泛型事件**无需继承 ApplicationEvent，更加灵活
9. **条件监听**使用 SpEL 表达式，实现精确过滤
10. **应用场景**包括用户注册、订单处理、消息通知等需要解耦的业务场景

**记忆口诀：**

事件机制三角色，发布监听加事件。广播器内部转，异步事务条件选。解耦扩展最核心，观察模式是基础。

### 78. 如何实现 Spring 的扩展点？

**1. 核心定义**

Spring 扩展点是框架提供的一系列接口和抽象类,允许开发者在 Spring 容器启动、Bean 创建、初始化等关键时刻介入,实现自定义逻辑。这些扩展点遵循"开闭原则",让开发者无需修改框架源码即可扩展功能。

**Spring 扩展点分类：**

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<rect x="300" y="20" width="300" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="450" y="55" text-anchor="middle" font-size="18" font-weight="bold">Spring 扩展点</text>
<rect x="50" y="130" width="200" height="80" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="150" y="160" text-anchor="middle" font-size="14" font-weight="bold">Bean 级别</text>
<text x="150" y="185" text-anchor="middle" font-size="11">BeanPostProcessor</text>
<text x="150" y="202" text-anchor="middle" font-size="11">InitializingBean</text>
<rect x="300" y="130" width="200" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="160" text-anchor="middle" font-size="14" font-weight="bold">容器级别</text>
<text x="400" y="185" text-anchor="middle" font-size="11">BeanFactoryPostProcessor</text>
<text x="400" y="202" text-anchor="middle" font-size="11">ApplicationContextAware</text>
<rect x="550" y="130" width="200" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="650" y="160" text-anchor="middle" font-size="14" font-weight="bold">生命周期</text>
<text x="650" y="185" text-anchor="middle" font-size="11">SmartLifecycle</text>
<text x="650" y="202" text-anchor="middle" font-size="11">ApplicationListener</text>
<rect x="50" y="260" width="200" height="80" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="150" y="290" text-anchor="middle" font-size="14" font-weight="bold">资源加载</text>
<text x="150" y="315" text-anchor="middle" font-size="11">ResourceLoader</text>
<text x="150" y="332" text-anchor="middle" font-size="11">PropertySource</text>
<rect x="300" y="260" width="200" height="80" fill="#fce4ec" stroke="#e91e63" stroke-width="2" rx="5"/>
<text x="400" y="290" text-anchor="middle" font-size="14" font-weight="bold">环境配置</text>
<text x="400" y="315" text-anchor="middle" font-size="11">EnvironmentAware</text>
<text x="400" y="332" text-anchor="middle" font-size="11">PropertySourcesProcessor</text>
<rect x="550" y="260" width="200" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="650" y="290" text-anchor="middle" font-size="14" font-weight="bold">AOP 相关</text>
<text x="650" y="315" text-anchor="middle" font-size="11">MethodInterceptor</text>
<text x="650" y="332" text-anchor="middle" font-size="11">Advisor</text>
<path d="M 450 80 L 150 130" stroke="#333" stroke-width="2" marker-end="url(#arrowhead12)"/>
<path d="M 450 80 L 400 130" stroke="#333" stroke-width="2" marker-end="url(#arrowhead12)"/>
<path d="M 450 80 L 650 130" stroke="#333" stroke-width="2" marker-end="url(#arrowhead12)"/>
<path d="M 450 80 L 150 260" stroke="#333" stroke-width="2" marker-end="url(#arrowhead12)"/>
<path d="M 450 80 L 400 260" stroke="#333" stroke-width="2" marker-end="url(#arrowhead12)"/>
<path d="M 450 80 L 650 260" stroke="#333" stroke-width="2" marker-end="url(#arrowhead12)"/>
<defs>
<marker id="arrowhead12" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**2. BeanPostProcessor - Bean 后置处理器**

在 Bean 初始化前后执行自定义逻辑,是最常用的扩展点。

```java
// 接口定义
public interface BeanPostProcessor {
    // Bean 初始化前调用
    default Object postProcessBeforeInitialization(Object bean, String beanName)
            throws BeansException {
        return bean;
    }

    // Bean 初始化后调用
    default Object postProcessAfterInitialization(Object bean, String beanName)
            throws BeansException {
        return bean;
    }
}

// 实现示例：自定义注解处理器
@Component
public class CustomAnnotationProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName)
            throws BeansException {
        // 扫描 Bean 中的自定义注解
        Class<?> clazz = bean.getClass();
        for (Field field : clazz.getDeclaredFields()) {
            if (field.isAnnotationPresent(CustomInject.class)) {
                field.setAccessible(true);
                try {
                    // 注入自定义值
                    field.set(bean, "Custom Value");
                    System.out.println("注入自定义值到: " + beanName + "." + field.getName());
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName)
            throws BeansException {
        System.out.println("Bean 初始化完成: " + beanName);
        return bean;
    }
}

// 自定义注解
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface CustomInject {
}

// 使用示例
@Component
public class UserService {
    @CustomInject
    private String customValue;

    public void printValue() {
        System.out.println("Custom Value: " + customValue);
    }
}
```

**BeanPostProcessor 执行流程：**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="180" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="80" text-anchor="middle" font-size="14" font-weight="bold">Bean 实例化</text>
<text x="140" y="98" text-anchor="middle" font-size="11">new Bean()</text>
<rect x="50" y="150" width="180" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="140" y="175" text-anchor="middle" font-size="12" font-weight="bold">postProcessBefore</text>
<text x="140" y="195" text-anchor="middle" font-size="10">Initialization</text>
<rect x="50" y="250" width="180" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="140" y="275" text-anchor="middle" font-size="14" font-weight="bold">初始化方法</text>
<text x="140" y="293" text-anchor="middle" font-size="10">@PostConstruct / init()</text>
<rect x="50" y="350" width="180" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="140" y="375" text-anchor="middle" font-size="12" font-weight="bold">postProcessAfter</text>
<text x="140" y="395" text-anchor="middle" font-size="10">Initialization</text>
<rect x="350" y="150" width="400" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="550" y="175" text-anchor="middle" font-size="12">扩展点1：属性注入、注解处理</text>
<text x="550" y="195" text-anchor="middle" font-size="11">可修改 Bean 属性</text>
<rect x="350" y="350" width="400" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="550" y="375" text-anchor="middle" font-size="12">扩展点2：AOP 代理、日志、监控</text>
<text x="550" y="395" text-anchor="middle" font-size="11">可返回代理对象</text>
<path d="M 140 110 L 140 150" stroke="#333" stroke-width="2" marker-end="url(#arrowhead13)"/>
<path d="M 140 210 L 140 250" stroke="#333" stroke-width="2" marker-end="url(#arrowhead13)"/>
<path d="M 140 310 L 140 350" stroke="#333" stroke-width="2" marker-end="url(#arrowhead13)"/>
<path d="M 230 180 L 350 180" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead13)" stroke-dasharray="5,5"/>
<path d="M 230 380 L 350 380" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead13)" stroke-dasharray="5,5"/>
<defs>
<marker id="arrowhead13" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**3. BeanFactoryPostProcessor - 容器后置处理器**

在 Bean 实例化之前修改 BeanDefinition,可以修改 Bean 的元数据。

```java
// 接口定义
@FunctionalInterface
public interface BeanFactoryPostProcessor {
    void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException;
}

// 实现示例：修改 Bean 的作用域
@Component
public class CustomBeanFactoryPostProcessor implements BeanFactoryPostProcessor {

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException {
        System.out.println("BeanFactoryPostProcessor 执行");

        // 获取所有 BeanDefinition
        String[] beanNames = beanFactory.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            BeanDefinition beanDefinition = beanFactory.getBeanDefinition(beanName);

            // 修改特定 Bean 的作用域
            if (beanName.equals("userService")) {
                beanDefinition.setScope(BeanDefinition.SCOPE_PROTOTYPE);
                System.out.println("修改 userService 作用域为 prototype");
            }

            // 修改 Bean 的属性值
            if (beanDefinition.hasPropertyValues()) {
                MutablePropertyValues propertyValues = beanDefinition.getPropertyValues();
                if (propertyValues.contains("serverName")) {
                    propertyValues.addPropertyValue("serverName", "Custom Server");
                }
            }
        }
    }
}

// 使用场景：属性占位符解析
@Component
public class PropertyPlaceholderProcessor implements BeanFactoryPostProcessor {

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException {
        // 解析 ${...} 占位符
        PropertySourcesPlaceholderConfigurer configurer =
            new PropertySourcesPlaceholderConfigurer();
        configurer.postProcessBeanFactory(beanFactory);
    }
}
```

**4. BeanDefinitionRegistryPostProcessor - Bean 定义注册后置处理器**

在 BeanFactoryPostProcessor 基础上,可以动态注册 Bean。

```java
// 接口定义
public interface BeanDefinitionRegistryPostProcessor extends BeanFactoryPostProcessor {
    void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry)
            throws BeansException;
}

// 实现示例：动态注册 Bean
@Component
public class CustomBeanDefinitionRegistryPostProcessor
        implements BeanDefinitionRegistryPostProcessor {

    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry)
            throws BeansException {
        System.out.println("动态注册 Bean");

        // 创建 BeanDefinition
        BeanDefinitionBuilder builder = BeanDefinitionBuilder
            .genericBeanDefinition(DynamicBean.class);
        builder.addPropertyValue("name", "Dynamic Name");
        builder.addPropertyValue("value", "Dynamic Value");
        builder.setScope(BeanDefinition.SCOPE_SINGLETON);

        // 注册到容器
        registry.registerBeanDefinition("dynamicBean", builder.getBeanDefinition());
        System.out.println("已注册 dynamicBean");
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException {
        System.out.println("BeanFactory 后置处理");
    }
}

// 动态 Bean 类
public class DynamicBean {
    private String name;
    private String value;

    // getters and setters
}
```

**5. Aware 接口系列 - 容器感知接口**

让 Bean 获取 Spring 容器的相关资源。

```java
// 1. ApplicationContextAware - 获取 ApplicationContext
@Component
public class ApplicationContextProvider implements ApplicationContextAware {
    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext context) throws BeansException {
        applicationContext = context;
        System.out.println("ApplicationContext 已注入");
    }

    public static <T> T getBean(Class<T> clazz) {
        return applicationContext.getBean(clazz);
    }

    public static Object getBean(String beanName) {
        return applicationContext.getBean(beanName);
    }
}

// 2. BeanFactoryAware - 获取 BeanFactory
@Component
public class BeanFactoryProvider implements BeanFactoryAware {
    private BeanFactory beanFactory;

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
        System.out.println("BeanFactory 已注入");
    }
}

// 3. BeanNameAware - 获取 Bean 名称
@Component
public class BeanNamePrinter implements BeanNameAware {
    @Override
    public void setBeanName(String name) {
        System.out.println("当前 Bean 名称: " + name);
    }
}

// 4. EnvironmentAware - 获取环境变量
@Component
public class EnvironmentProvider implements EnvironmentAware {
    private Environment environment;

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;
        System.out.println("Environment 已注入");
        System.out.println("激活的 Profile: " +
            String.join(",", environment.getActiveProfiles()));
    }
}

// 5. ResourceLoaderAware - 获取资源加载器
@Component
public class ResourceLoaderProvider implements ResourceLoaderAware {
    private ResourceLoader resourceLoader;

    @Override
    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
        System.out.println("ResourceLoader 已注入");
    }

    public Resource getResource(String location) {
        return resourceLoader.getResource(location);
    }
}
```

**Aware 接口调用顺序：**

<svg viewBox="0 0 700 600" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="30" text-anchor="middle" font-size="16" font-weight="bold">Aware 接口调用顺序</text>
<rect x="200" y="60" width="300" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="350" y="90" text-anchor="middle" font-size="13">1. BeanNameAware.setBeanName()</text>
<rect x="200" y="130" width="300" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="350" y="160" text-anchor="middle" font-size="13">2. BeanClassLoaderAware.setBeanClassLoader()</text>
<rect x="200" y="200" width="300" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="350" y="230" text-anchor="middle" font-size="13">3. BeanFactoryAware.setBeanFactory()</text>
<rect x="200" y="270" width="300" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="350" y="300" text-anchor="middle" font-size="13">4. EnvironmentAware.setEnvironment()</text>
<rect x="200" y="340" width="300" height="50" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="350" y="370" text-anchor="middle" font-size="13">5. ResourceLoaderAware.setResourceLoader()</text>
<rect x="200" y="410" width="300" height="50" fill="#fce4ec" stroke="#e91e63" stroke-width="2" rx="5"/>
<text x="350" y="440" text-anchor="middle" font-size="13">6. ApplicationContextAware.setApplicationContext()</text>
<rect x="200" y="480" width="300" height="50" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="350" y="510" text-anchor="middle" font-size="13">7. 其他 Aware 接口...</text>
<path d="M 350 110 L 350 130" stroke="#333" stroke-width="2" marker-end="url(#arrowhead14)"/>
<path d="M 350 180 L 350 200" stroke="#333" stroke-width="2" marker-end="url(#arrowhead14)"/>
<path d="M 350 250 L 350 270" stroke="#333" stroke-width="2" marker-end="url(#arrowhead14)"/>
<path d="M 350 320 L 350 340" stroke="#333" stroke-width="2" marker-end="url(#arrowhead14)"/>
<path d="M 350 390 L 350 410" stroke="#333" stroke-width="2" marker-end="url(#arrowhead14)"/>
<path d="M 350 460 L 350 480" stroke="#333" stroke-width="2" marker-end="url(#arrowhead14)"/>
<defs>
<marker id="arrowhead14" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**6. InitializingBean 和 DisposableBean - 生命周期接口**

```java
// InitializingBean - Bean 初始化回调
@Component
public class InitBean implements InitializingBean {

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("InitializingBean.afterPropertiesSet() 执行");
        // 属性设置完成后的初始化逻辑
        // 例如：连接池初始化、缓存预热等
    }
}

// DisposableBean - Bean 销毁回调
@Component
public class CleanupBean implements DisposableBean {

    @Override
    public void destroy() throws Exception {
        System.out.println("DisposableBean.destroy() 执行");
        // 容器关闭前的清理逻辑
        // 例如：关闭连接、释放资源等
    }
}

// 推荐使用 JSR-250 注解（更标准）
@Component
public class LifecycleBean {

    @PostConstruct
    public void init() {
        System.out.println("@PostConstruct 执行");
    }

    @PreDestroy
    public void cleanup() {
        System.out.println("@PreDestroy 执行");
    }
}
```

**7. SmartLifecycle - 智能生命周期接口**

控制 Bean 的启动和停止顺序。

```java
@Component
public class SmartLifecycleBean implements SmartLifecycle {
    private volatile boolean running = false;

    @Override
    public void start() {
        System.out.println("SmartLifecycle 启动");
        running = true;
        // 启动逻辑：如启动定时任务、监听器等
    }

    @Override
    public void stop() {
        System.out.println("SmartLifecycle 停止");
        running = false;
        // 停止逻辑
    }

    @Override
    public boolean isRunning() {
        return running;
    }

    @Override
    public boolean isAutoStartup() {
        // 返回 true 表示容器启动时自动调用 start()
        return true;
    }

    @Override
    public void stop(Runnable callback) {
        System.out.println("SmartLifecycle 异步停止");
        stop();
        callback.run();  // 回调通知容器停止完成
    }

    @Override
    public int getPhase() {
        // 返回值越小优先级越高
        // Integer.MAX_VALUE 最后启动，最先停止
        // Integer.MIN_VALUE 最先启动，最后停止
        return 0;
    }
}
```

**8. ApplicationListener - 事件监听器**

```java
// 监听容器刷新事件
@Component
public class ContextRefreshedListener
        implements ApplicationListener<ContextRefreshedEvent> {

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        System.out.println("容器刷新完成，执行初始化操作");
        // 加载缓存、预热数据、启动定时任务等
    }
}

// 使用 @EventListener 注解（推荐）
@Component
public class EventListenerDemo {

    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        System.out.println("容器刷新完成");
    }

    @EventListener
    public void handleContextClose(ContextClosedEvent event) {
        System.out.println("容器关闭");
    }
}
```

**9. FactoryBean - 工厂 Bean**

自定义 Bean 的创建逻辑。

```java
// FactoryBean 接口
public interface FactoryBean<T> {
    T getObject() throws Exception;  // 返回创建的对象
    Class<?> getObjectType();        // 返回对象类型
    default boolean isSingleton() {  // 是否单例
        return true;
    }
}

// 实现示例：创建代理对象
@Component
public class ProxyFactoryBean implements FactoryBean<UserService> {

    @Override
    public UserService getObject() throws Exception {
        System.out.println("FactoryBean 创建代理对象");

        // 创建 JDK 动态代理
        return (UserService) Proxy.newProxyInstance(
            UserService.class.getClassLoader(),
            new Class[]{UserService.class},
            (proxy, method, args) -> {
                System.out.println("代理方法调用: " + method.getName());
                // 原始逻辑
                Object result = method.invoke(new UserServiceImpl(), args);
                return result;
            }
        );
    }

    @Override
    public Class<?> getObjectType() {
        return UserService.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}

// 使用
@Autowired
private UserService userService;  // 注入的是 getObject() 返回的代理对象

@Autowired
private ProxyFactoryBean factoryBean;  // 使用 &beanName 可获取 FactoryBean 本身
```

**10. ImportBeanDefinitionRegistrar - 动态注册 Bean**

结合 `@Import` 注解动态注册 Bean。

```java
// 实现接口
public class MyImportBeanDefinitionRegistrar
        implements ImportBeanDefinitionRegistrar {

    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata,
                                       BeanDefinitionRegistry registry) {
        System.out.println("动态注册 Bean");

        // 检查是否存在特定注解
        if (importingClassMetadata.hasAnnotation(EnableCustomFeature.class.getName())) {
            // 创建 BeanDefinition
            RootBeanDefinition beanDefinition = new RootBeanDefinition(CustomBean.class);
            beanDefinition.setScope(BeanDefinition.SCOPE_SINGLETON);

            // 注册
            registry.registerBeanDefinition("customBean", beanDefinition);
            System.out.println("已注册 customBean");
        }
    }
}

// 自定义注解
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Import(MyImportBeanDefinitionRegistrar.class)
public @interface EnableCustomFeature {
}

// 使用
@Configuration
@EnableCustomFeature
public class AppConfig {
    // customBean 会被自动注册
}
```

**11. Spring 扩展点执行顺序**

<svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="16" font-weight="bold">Spring 扩展点执行顺序</text>
<rect x="50" y="60" width="700" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="90" text-anchor="middle" font-size="13">1. BeanDefinitionRegistryPostProcessor.postProcessBeanDefinitionRegistry()</text>
<rect x="50" y="130" width="700" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="160" text-anchor="middle" font-size="13">2. BeanFactoryPostProcessor.postProcessBeanFactory()</text>
<rect x="50" y="200" width="700" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="230" text-anchor="middle" font-size="13">3. Bean 实例化</text>
<rect x="50" y="270" width="700" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="400" y="300" text-anchor="middle" font-size="13">4. Aware 接口回调（BeanNameAware、BeanFactoryAware 等）</text>
<rect x="50" y="340" width="700" height="50" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="400" y="370" text-anchor="middle" font-size="13">5. BeanPostProcessor.postProcessBeforeInitialization()</text>
<rect x="50" y="410" width="700" height="50" fill="#fce4ec" stroke="#e91e63" stroke-width="2" rx="5"/>
<text x="400" y="440" text-anchor="middle" font-size="13">6. @PostConstruct / InitializingBean.afterPropertiesSet() / init-method</text>
<rect x="50" y="480" width="700" height="50" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="400" y="510" text-anchor="middle" font-size="13">7. BeanPostProcessor.postProcessAfterInitialization()</text>
<rect x="50" y="550" width="700" height="50" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="580" text-anchor="middle" font-size="13">8. SmartLifecycle.start()</text>
<rect x="50" y="620" width="700" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="400" y="650" text-anchor="middle" font-size="13">9. @PreDestroy / DisposableBean.destroy() / destroy-method（容器关闭时）</text>
<path d="M 400 110 L 400 130" stroke="#333" stroke-width="2" marker-end="url(#arrowhead15)"/>
<path d="M 400 180 L 400 200" stroke="#333" stroke-width="2" marker-end="url(#arrowhead15)"/>
<path d="M 400 250 L 400 270" stroke="#333" stroke-width="2" marker-end="url(#arrowhead15)"/>
<path d="M 400 320 L 400 340" stroke="#333" stroke-width="2" marker-end="url(#arrowhead15)"/>
<path d="M 400 390 L 400 410" stroke="#333" stroke-width="2" marker-end="url(#arrowhead15)"/>
<path d="M 400 460 L 400 480" stroke="#333" stroke-width="2" marker-end="url(#arrowhead15)"/>
<path d="M 400 530 L 400 550" stroke="#333" stroke-width="2" marker-end="url(#arrowhead15)"/>
<path d="M 400 600 L 400 620" stroke="#333" stroke-width="2" marker-end="url(#arrowhead15)"/>
<defs>
<marker id="arrowhead15" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**12. 扩展点应用场景**

| 扩展点 | 应用场景 |
|-------|---------|
| BeanPostProcessor | 属性注入、日志、监控、AOP 代理 |
| BeanFactoryPostProcessor | 修改 BeanDefinition、属性占位符解析 |
| BeanDefinitionRegistryPostProcessor | 动态注册 Bean、扫描自定义注解 |
| ApplicationContextAware | 获取 Spring 容器、动态获取 Bean |
| InitializingBean / @PostConstruct | 初始化连接池、缓存预热 |
| DisposableBean / @PreDestroy | 关闭连接、释放资源 |
| SmartLifecycle | 启动定时任务、监听器 |
| ApplicationListener | 监听容器事件、业务事件 |
| FactoryBean | 创建代理对象、复杂对象 |
| ImportBeanDefinitionRegistrar | 动态注册 Bean、自动配置 |

**关键要点：**

1. **BeanPostProcessor** 是最常用的扩展点，可在 Bean 初始化前后执行自定义逻辑
2. **BeanFactoryPostProcessor** 在 Bean 实例化前修改 BeanDefinition
3. **Aware 接口系列** 让 Bean 获取 Spring 容器的相关资源
4. **InitializingBean 和 DisposableBean** 提供生命周期回调，推荐使用 @PostConstruct 和 @PreDestroy
5. **SmartLifecycle** 控制 Bean 的启动停止顺序
6. **FactoryBean** 自定义 Bean 的创建逻辑，常用于创建代理对象
7. **ImportBeanDefinitionRegistrar** 结合 @Import 动态注册 Bean
8. **扩展点执行顺序**：BeanFactoryPostProcessor → 实例化 → Aware → BeanPostProcessor.before → 初始化 → BeanPostProcessor.after
9. **容器级别的扩展点先于 Bean 级别执行**
10. **扩展点的合理使用可以增强 Spring 的功能，但要避免过度使用导致复杂度增加**

**记忆口诀：**

容器扩展先执行，Bean 定义先修改。实例创建后感知，初始前后可增强。生命周期有回调,工厂模式创对象。扩展有序层次清，灵活运用功能强。


### 79. 什么是 BeanPostProcessor 和 BeanFactoryPostProcessor？

**1. 核心定义**

**BeanPostProcessor（Bean 后置处理器）**和 **BeanFactoryPostProcessor（BeanFactory 后置处理器）**是 Spring 提供的两个重要扩展点，用于在 Bean 的不同生命周期阶段执行自定义逻辑：

- **BeanPostProcessor**：作用于 Bean 实例化后，可以对 Bean 实例进行修改和增强
- **BeanFactoryPostProcessor**：作用于 Bean 实例化前，可以修改 BeanDefinition 元数据

**两者对比架构：**

<svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
<text x="200" y="30" text-anchor="middle" font-size="16" font-weight="bold">BeanFactoryPostProcessor</text>
<text x="200" y="55" text-anchor="middle" font-size="12">(容器级别)</text>
<rect x="50" y="80" width="300" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="200" y="110" text-anchor="middle" font-size="14" font-weight="bold">修改 BeanDefinition</text>
<text x="200" y="135" text-anchor="middle" font-size="11">Bean 实例化前执行</text>
<text x="200" y="152" text-anchor="middle" font-size="11">修改 Bean 元数据</text>
<rect x="50" y="200" width="300" height="100" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="200" y="230" text-anchor="middle" font-size="12">典型应用：</text>
<text x="200" y="250" text-anchor="middle" font-size="11">• 属性占位符解析 ${...}</text>
<text x="200" y="270" text-anchor="middle" font-size="11">• 修改 Bean 作用域</text>
<text x="200" y="290" text-anchor="middle" font-size="11">• 修改 Bean 属性值</text>
<text x="700" y="30" text-anchor="middle" font-size="16" font-weight="bold">BeanPostProcessor</text>
<text x="700" y="55" text-anchor="middle" font-size="12">(Bean 级别)</text>
<rect x="550" y="80" width="300" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="3" rx="5"/>
<text x="700" y="110" text-anchor="middle" font-size="14" font-weight="bold">修改 Bean 实例</text>
<text x="700" y="135" text-anchor="middle" font-size="11">Bean 初始化前后执行</text>
<text x="700" y="152" text-anchor="middle" font-size="11">可返回代理对象</text>
<rect x="550" y="200" width="300" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="700" y="230" text-anchor="middle" font-size="12">典型应用：</text>
<text x="700" y="250" text-anchor="middle" font-size="11">• AOP 代理创建</text>
<text x="700" y="270" text-anchor="middle" font-size="11">• @Autowired 注解处理</text>
<text x="700" y="290" text-anchor="middle" font-size="11">• 日志、监控、权限增强</text>
<path d="M 450 120 L 550 120" stroke="#333" stroke-width="3" marker-end="url(#arrowhead16)"/>
<text x="500" y="110" text-anchor="middle" font-size="13" font-weight="bold">时间线</text>
<defs>
<marker id="arrowhead16" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**2. BeanPostProcessor 详解**

**（1）接口定义**

```java
public interface BeanPostProcessor {
    /**
     * Bean 初始化前回调
     * @param bean 新创建的 Bean 实例
     * @param beanName Bean 的名称
     * @return 返回的对象将被 Spring 容器使用（可以是原始对象或代理对象）
     */
    @Nullable
    default Object postProcessBeforeInitialization(Object bean, String beanName)
            throws BeansException {
        return bean;
    }

    /**
     * Bean 初始化后回调
     * @param bean 新创建的 Bean 实例
     * @param beanName Bean 的名称
     * @return 返回的对象将被 Spring 容器使用（可以是原始对象或代理对象）
     */
    @Nullable
    default Object postProcessAfterInitialization(Object bean, String beanName)
            throws BeansException {
        return bean;
    }
}
```

**（2）执行时机**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="200" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="75" text-anchor="middle" font-size="14" font-weight="bold">1. Bean 实例化</text>
<text x="150" y="95" text-anchor="middle" font-size="11">new Bean()</text>
<rect x="50" y="150" width="200" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="150" y="175" text-anchor="middle" font-size="14" font-weight="bold">2. 属性赋值</text>
<text x="150" y="195" text-anchor="middle" font-size="11">populate properties</text>
<rect x="50" y="250" width="200" height="60" fill="#ffebee" stroke="#f44336" stroke-width="3" rx="5"/>
<text x="150" y="270" text-anchor="middle" font-size="13" font-weight="bold">3. postProcessBefore</text>
<text x="150" y="290" text-anchor="middle" font-size="11" font-weight="bold">Initialization</text>
<rect x="50" y="350" width="200" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="150" y="375" text-anchor="middle" font-size="14" font-weight="bold">4. 初始化方法</text>
<text x="150" y="395" text-anchor="middle" font-size="11">init-method</text>
<rect x="350" y="250" width="200" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="3" rx="5"/>
<text x="450" y="270" text-anchor="middle" font-size="13" font-weight="bold">5. postProcessAfter</text>
<text x="450" y="290" text-anchor="middle" font-size="11" font-weight="bold">Initialization</text>
<rect x="350" y="350" width="200" height="60" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="450" y="375" text-anchor="middle" font-size="14" font-weight="bold">6. Bean 就绪</text>
<text x="450" y="395" text-anchor="middle" font-size="11">可以使用</text>
<path d="M 150 110 L 150 150" stroke="#333" stroke-width="2" marker-end="url(#arrowhead17)"/>
<path d="M 150 210 L 150 250" stroke="#333" stroke-width="2" marker-end="url(#arrowhead17)"/>
<path d="M 150 310 L 150 350" stroke="#333" stroke-width="2" marker-end="url(#arrowhead17)"/>
<path d="M 250 280 L 350 280" stroke="#333" stroke-width="2" marker-end="url(#arrowhead17)"/>
<path d="M 450 310 L 450 350" stroke="#333" stroke-width="2" marker-end="url(#arrowhead17)"/>
<rect x="600" y="230" width="150" height="100" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="675" y="260" text-anchor="middle" font-size="12" font-weight="bold">扩展点</text>
<text x="675" y="280" text-anchor="middle" font-size="10">Before: 注解处理</text>
<text x="675" y="300" text-anchor="middle" font-size="10">After: AOP 代理</text>
<text x="675" y="320" text-anchor="middle" font-size="10">可返回代理对象</text>
<path d="M 250 280 L 600 280" stroke="#f57f17" stroke-width="2" stroke-dasharray="5,5"/>
<path d="M 550 280 L 600 280" stroke="#f57f17" stroke-width="2" stroke-dasharray="5,5"/>
<defs>
<marker id="arrowhead17" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**（3）实现示例**

```java
// 示例1：日志记录处理器
@Component
public class LoggingBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName)
            throws BeansException {
        if (bean.getClass().getPackage().getName().startsWith("com.example")) {
            System.out.println("Before Initialization: " + beanName);
        }
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName)
            throws BeansException {
        if (bean.getClass().getPackage().getName().startsWith("com.example")) {
            System.out.println("After Initialization: " + beanName);
        }
        return bean;
    }
}

// 示例2：自定义注解处理器
@Component
public class CustomAnnotationBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName)
            throws BeansException {
        // 扫描 Bean 中的 @CustomInject 注解
        Class<?> clazz = bean.getClass();
        for (Field field : clazz.getDeclaredFields()) {
            CustomInject annotation = field.getAnnotation(CustomInject.class);
            if (annotation != null) {
                field.setAccessible(true);
                try {
                    String value = annotation.value();
                    field.set(bean, value);
                    System.out.println("注入自定义值: " + beanName + "." +
                        field.getName() + " = " + value);
                } catch (IllegalAccessException e) {
                    throw new BeansException("注入失败", e) {};
                }
            }
        }
        return bean;
    }
}

// 自定义注解
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface CustomInject {
    String value() default "";
}

// 示例3：AOP 代理处理器（简化版）
@Component
public class ProxyBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName)
            throws BeansException {
        // 检查是否需要创建代理
        if (bean.getClass().isAnnotationPresent(EnableProxy.class)) {
            System.out.println("创建代理对象: " + beanName);

            // 创建 JDK 动态代理
            Class<?>[] interfaces = bean.getClass().getInterfaces();
            if (interfaces.length > 0) {
                return Proxy.newProxyInstance(
                    bean.getClass().getClassLoader(),
                    interfaces,
                    (proxy, method, args) -> {
                        System.out.println("代理方法调用: " + method.getName());
                        long start = System.currentTimeMillis();
                        Object result = method.invoke(bean, args);
                        long end = System.currentTimeMillis();
                        System.out.println("方法执行耗时: " + (end - start) + "ms");
                        return result;
                    }
                );
            }
        }
        return bean;
    }
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface EnableProxy {
}
```

**（4）Spring 内置的 BeanPostProcessor**

| BeanPostProcessor | 作用 |
|------------------|------|
| AutowiredAnnotationBeanPostProcessor | 处理 @Autowired、@Value、@Inject 注解 |
| CommonAnnotationBeanPostProcessor | 处理 @Resource、@PostConstruct、@PreDestroy |
| ApplicationContextAwareProcessor | 处理 Aware 接口回调 |
| AnnotationAwareAspectJAutoProxyCreator | 创建 AOP 代理 |
| AsyncAnnotationBeanPostProcessor | 处理 @Async 注解 |
| ScheduledAnnotationBeanPostProcessor | 处理 @Scheduled 注解 |

**3. BeanFactoryPostProcessor 详解**

**（1）接口定义**

```java
@FunctionalInterface
public interface BeanFactoryPostProcessor {
    /**
     * 在 Bean 实例化之前修改 BeanDefinition
     * @param beanFactory Bean 工厂
     */
    void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException;
}
```

**（2）执行时机**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="250" height="70" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="175" y="80" text-anchor="middle" font-size="14" font-weight="bold">1. 加载 BeanDefinition</text>
<text x="175" y="105" text-anchor="middle" font-size="11">XML / 注解扫描</text>
<rect x="50" y="160" width="250" height="70" fill="#ffebee" stroke="#f44336" stroke-width="3" rx="5"/>
<text x="175" y="185" text-anchor="middle" font-size="14" font-weight="bold">2. BeanFactoryPostProcessor</text>
<text x="175" y="210" text-anchor="middle" font-size="11" font-weight="bold">修改 BeanDefinition</text>
<rect x="50" y="270" width="250" height="70" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="175" y="300" text-anchor="middle" font-size="14" font-weight="bold">3. Bean 实例化</text>
<text x="175" y="325" text-anchor="middle" font-size="11">new Bean()</text>
<rect x="50" y="380" width="250" height="70" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="175" y="410" text-anchor="middle" font-size="14" font-weight="bold">4. Bean 初始化</text>
<text x="175" y="435" text-anchor="middle" font-size="11">BeanPostProcessor</text>
<path d="M 175 120 L 175 160" stroke="#333" stroke-width="2" marker-end="url(#arrowhead18)"/>
<path d="M 175 230 L 175 270" stroke="#333" stroke-width="2" marker-end="url(#arrowhead18)"/>
<path d="M 175 340 L 175 380" stroke="#333" stroke-width="2" marker-end="url(#arrowhead18)"/>
<rect x="400" y="140" width="350" height="110" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="575" y="170" text-anchor="middle" font-size="13" font-weight="bold">扩展点：修改 BeanDefinition</text>
<text x="575" y="195" text-anchor="middle" font-size="11">• 修改 Bean 作用域（singleton/prototype）</text>
<text x="575" y="215" text-anchor="middle" font-size="11">• 修改 Bean 属性值</text>
<text x="575" y="235" text-anchor="middle" font-size="11">• 动态注册新的 Bean</text>
<path d="M 300 195 L 400 195" stroke="#f57f17" stroke-width="2" stroke-dasharray="5,5"/>
<defs>
<marker id="arrowhead18" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**（3）实现示例**

```java
// 示例1：修改 Bean 作用域
@Component
public class ScopeModifyingBeanFactoryPostProcessor
        implements BeanFactoryPostProcessor {

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException {
        System.out.println("BeanFactoryPostProcessor 执行");

        String[] beanNames = beanFactory.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            BeanDefinition beanDefinition = beanFactory.getBeanDefinition(beanName);

            // 将特定包下的 Bean 改为 prototype
            if (beanDefinition.getBeanClassName() != null &&
                beanDefinition.getBeanClassName().startsWith("com.example.service")) {

                beanDefinition.setScope(BeanDefinition.SCOPE_PROTOTYPE);
                System.out.println("修改 " + beanName + " 为 prototype 作用域");
            }
        }
    }
}

// 示例2：修改 Bean 属性值
@Component
public class PropertyModifyingBeanFactoryPostProcessor
        implements BeanFactoryPostProcessor {

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException {
        BeanDefinition bd = beanFactory.getBeanDefinition("dataSource");

        // 修改属性值
        MutablePropertyValues propertyValues = bd.getPropertyValues();
        propertyValues.addPropertyValue("url", "jdbc:mysql://localhost:3306/test");
        propertyValues.addPropertyValue("username", "root");
        propertyValues.addPropertyValue("password", "123456");

        System.out.println("修改 dataSource 配置");
    }
}

// 示例3：属性占位符解析（Spring 内置）
@Component
public class PropertyPlaceholderBeanFactoryPostProcessor
        implements BeanFactoryPostProcessor {

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException {
        // Spring 内置的 PropertySourcesPlaceholderConfigurer 就是这样工作的
        // 它会解析 ${...} 占位符并替换为实际值

        String[] beanNames = beanFactory.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            BeanDefinition bd = beanFactory.getBeanDefinition(beanName);

            if (bd.hasPropertyValues()) {
                MutablePropertyValues pvs = bd.getPropertyValues();
                for (PropertyValue pv : pvs.getPropertyValueList()) {
                    Object value = pv.getValue();
                    if (value instanceof String) {
                        String strValue = (String) value;
                        // 解析 ${server.port} -> 8080
                        if (strValue.startsWith("${") && strValue.endsWith("}")) {
                            String placeholder = strValue.substring(2, strValue.length() - 1);
                            String resolvedValue = resolveProperty(placeholder);
                            pvs.addPropertyValue(pv.getName(), resolvedValue);
                            System.out.println("解析占位符: " + strValue +
                                " -> " + resolvedValue);
                        }
                    }
                }
            }
        }
    }

    private String resolveProperty(String key) {
        // 从环境变量或配置文件读取
        return System.getProperty(key, "default-value");
    }
}
```

**（4）Spring 内置的 BeanFactoryPostProcessor**

| BeanFactoryPostProcessor | 作用 |
|-------------------------|------|
| PropertySourcesPlaceholderConfigurer | 解析 ${...} 占位符 |
| PropertyOverrideConfigurer | 覆盖 Bean 的属性值 |
| CustomScopeConfigurer | 注册自定义作用域 |
| CustomEditorConfigurer | 注册自定义属性编辑器 |
| ConfigurationClassPostProcessor | 处理 @Configuration 类 |

**4. BeanDefinitionRegistryPostProcessor**

BeanDefinitionRegistryPostProcessor 是 BeanFactoryPostProcessor 的子接口,可以动态注册 BeanDefinition。

```java
public interface BeanDefinitionRegistryPostProcessor
        extends BeanFactoryPostProcessor {

    /**
     * 在标准初始化之后修改应用上下文的内部 Bean 定义注册表
     * 所有常规 Bean 定义都已加载，但还没有 Bean 被实例化
     */
    void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry)
            throws BeansException;
}

// 实现示例：动态注册 Bean
@Component
public class DynamicBeanRegistryPostProcessor
        implements BeanDefinitionRegistryPostProcessor {

    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry)
            throws BeansException {
        System.out.println("动态注册 Bean");

        // 方式1：使用 BeanDefinitionBuilder
        BeanDefinitionBuilder builder = BeanDefinitionBuilder
            .genericBeanDefinition(DynamicService.class);
        builder.addPropertyValue("name", "Dynamic Service");
        builder.setScope(BeanDefinition.SCOPE_SINGLETON);
        registry.registerBeanDefinition("dynamicService", builder.getBeanDefinition());

        // 方式2：使用 RootBeanDefinition
        RootBeanDefinition bd = new RootBeanDefinition(AnotherService.class);
        bd.setScope(BeanDefinition.SCOPE_PROTOTYPE);
        registry.registerBeanDefinition("anotherService", bd);

        System.out.println("已注册 dynamicService 和 anotherService");
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException {
        System.out.println("BeanFactory 后置处理");
    }
}

// 动态注册的 Bean
public class DynamicService {
    private String name;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

**5. 两者的区别总结**

<svg viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">BeanFactoryPostProcessor vs BeanPostProcessor</text>
<rect x="50" y="60" width="350" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="225" y="85" text-anchor="middle" font-size="14" font-weight="bold">BeanFactoryPostProcessor</text>
<text x="225" y="108" text-anchor="middle" font-size="12">(容器级别)</text>
<rect x="500" y="60" width="350" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="675" y="85" text-anchor="middle" font-size="14" font-weight="bold">BeanPostProcessor</text>
<text x="675" y="108" text-anchor="middle" font-size="12">(Bean 级别)</text>
<rect x="50" y="150" width="350" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="225" y="175" text-anchor="middle" font-size="13" font-weight="bold">执行时机</text>
<text x="225" y="198" text-anchor="middle" font-size="11">Bean 实例化前</text>
<rect x="500" y="150" width="350" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="675" y="175" text-anchor="middle" font-size="13" font-weight="bold">执行时机</text>
<text x="675" y="198" text-anchor="middle" font-size="11">Bean 初始化前后</text>
<rect x="50" y="230" width="350" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="225" y="255" text-anchor="middle" font-size="13" font-weight="bold">操作对象</text>
<text x="225" y="278" text-anchor="middle" font-size="11">BeanDefinition（Bean 元数据）</text>
<rect x="500" y="230" width="350" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="675" y="255" text-anchor="middle" font-size="13" font-weight="bold">操作对象</text>
<text x="675" y="278" text-anchor="middle" font-size="11">Bean 实例（对象）</text>
<rect x="50" y="310" width="350" height="60" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="225" y="335" text-anchor="middle" font-size="13" font-weight="bold">影响范围</text>
<text x="225" y="358" text-anchor="middle" font-size="11">影响所有 Bean 的定义</text>
<rect x="500" y="310" width="350" height="60" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="675" y="335" text-anchor="middle" font-size="13" font-weight="bold">影响范围</text>
<text x="675" y="358" text-anchor="middle" font-size="11">影响每个 Bean 实例</text>
<rect x="50" y="390" width="350" height="50" fill="#fce4ec" stroke="#e91e63" stroke-width="2" rx="5"/>
<text x="225" y="420" text-anchor="middle" font-size="11">修改作用域、属性值、注册 Bean</text>
<rect x="500" y="390" width="350" height="50" fill="#fce4ec" stroke="#e91e63" stroke-width="2" rx="5"/>
<text x="675" y="420" text-anchor="middle" font-size="11">属性注入、AOP 代理、日志监控</text>
<defs>
<marker id="arrowhead19" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**6. 执行顺序**

```java
// 完整的执行顺序
@Component
public class ExecutionOrderDemo
        implements BeanDefinitionRegistryPostProcessor, BeanPostProcessor {

    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry)
            throws BeansException {
        System.out.println("1. BeanDefinitionRegistryPostProcessor.postProcessBeanDefinitionRegistry()");
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException {
        System.out.println("2. BeanFactoryPostProcessor.postProcessBeanFactory()");
    }

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName)
            throws BeansException {
        System.out.println("5. BeanPostProcessor.postProcessBeforeInitialization() - " + beanName);
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName)
            throws BeansException {
        System.out.println("7. BeanPostProcessor.postProcessAfterInitialization() - " + beanName);
        return bean;
    }
}

// 测试 Bean
@Component
public class TestBean implements InitializingBean {

    public TestBean() {
        System.out.println("3. TestBean 构造函数");
    }

    @PostConstruct
    public void postConstruct() {
        System.out.println("6a. @PostConstruct");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("6b. InitializingBean.afterPropertiesSet()");
    }
}

/*
输出顺序：
1. BeanDefinitionRegistryPostProcessor.postProcessBeanDefinitionRegistry()
2. BeanFactoryPostProcessor.postProcessBeanFactory()
3. TestBean 构造函数
4. （属性赋值）
5. BeanPostProcessor.postProcessBeforeInitialization() - testBean
6a. @PostConstruct
6b. InitializingBean.afterPropertiesSet()
7. BeanPostProcessor.postProcessAfterInitialization() - testBean
*/
```

**7. 实际应用场景**

**场景1：属性加密解密**

```java
@Component
public class DecryptBeanFactoryPostProcessor
        implements BeanFactoryPostProcessor {

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException {
        String[] beanNames = beanFactory.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            BeanDefinition bd = beanFactory.getBeanDefinition(beanName);

            if (bd.hasPropertyValues()) {
                MutablePropertyValues pvs = bd.getPropertyValues();
                for (PropertyValue pv : pvs.getPropertyValueList()) {
                    Object value = pv.getValue();
                    if (value instanceof String) {
                        String strValue = (String) value;
                        // 解密 ENC(...) 加密的属性
                        if (strValue.startsWith("ENC(") && strValue.endsWith(")")) {
                            String encrypted = strValue.substring(4, strValue.length() - 1);
                            String decrypted = decrypt(encrypted);
                            pvs.addPropertyValue(pv.getName(), decrypted);
                            System.out.println("解密属性: " + pv.getName());
                        }
                    }
                }
            }
        }
    }

    private String decrypt(String encrypted) {
        // 解密逻辑
        return new StringBuilder(encrypted).reverse().toString();
    }
}
```

**场景2：接口耗时统计**

```java
@Component
public class PerformanceBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName)
            throws BeansException {
        // 为 Service 层创建性能监控代理
        if (bean.getClass().getSimpleName().endsWith("Service")) {
            return Proxy.newProxyInstance(
                bean.getClass().getClassLoader(),
                bean.getClass().getInterfaces(),
                (proxy, method, args) -> {
                    long start = System.currentTimeMillis();
                    Object result = method.invoke(bean, args);
                    long end = System.currentTimeMillis();

                    System.out.println(String.format("[性能监控] %s.%s() 耗时: %dms",
                        bean.getClass().getSimpleName(),
                        method.getName(),
                        end - start));

                    return result;
                }
            );
        }
        return bean;
    }
}
```

**关键要点：**

1. **BeanFactoryPostProcessor** 在 Bean 实例化前执行，修改 BeanDefinition 元数据
2. **BeanPostProcessor** 在 Bean 初始化前后执行，可修改或替换 Bean 实例
3. **执行顺序**：BeanFactoryPostProcessor → Bean 实例化 → BeanPostProcessor
4. **BeanDefinitionRegistryPostProcessor** 是 BeanFactoryPostProcessor 的子接口，可动态注册 Bean
5. **BeanFactoryPostProcessor 是容器级别**，影响所有 Bean 的定义
6. **BeanPostProcessor 是 Bean 级别**，影响每个 Bean 实例
7. **Spring 大量使用这两个扩展点**：AOP、@Autowired、占位符解析等都基于此实现
8. **BeanPostProcessor.postProcessAfterInitialization()** 可返回代理对象，是 AOP 的核心
9. **两者都可以有多个实现**，通过 @Order 或 PriorityOrdered 接口控制顺序
10. **不要在 BeanPostProcessor 中调用 getBean()**，会导致提前实例化和循环依赖

**记忆口诀：**

容器后置先执行，修改定义在实例前。Bean 后置分前后，实例增强代理返。Factory 改元数据，Post 改实例对象。顺序层次要记清，扩展增强功能强。


### 80. Spring 如何整合其他框架（如 MyBatis、Redis 等）？

**1. 核心定义**

Spring 通过 **依赖注入**、**自动配置**、**Starter 机制** 和 **扩展点** 等特性，实现了与各种第三方框架的无缝集成。Spring Boot 进一步简化了整合过程，通过约定优于配置的理念，让开发者只需添加依赖和少量配置即可完成框架整合。

**Spring 整合框架的核心机制：**

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<rect x="300" y="20" width="300" height="70" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="450" y="55" text-anchor="middle" font-size="18" font-weight="bold">Spring 整合机制</text>
<rect x="50" y="140" width="200" height="80" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="150" y="170" text-anchor="middle" font-size="14" font-weight="bold">依赖注入</text>
<text x="150" y="195" text-anchor="middle" font-size="11">@Bean / @Component</text>
<text x="150" y="212" text-anchor="middle" font-size="11">IoC 容器管理</text>
<rect x="300" y="140" width="200" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="170" text-anchor="middle" font-size="14" font-weight="bold">自动配置</text>
<text x="400" y="195" text-anchor="middle" font-size="11">@EnableAutoConfiguration</text>
<text x="400" y="212" text-anchor="middle" font-size="11">条件注解</text>
<rect x="550" y="140" width="200" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="650" y="170" text-anchor="middle" font-size="14" font-weight="bold">Starter 机制</text>
<text x="650" y="195" text-anchor="middle" font-size="11">spring-boot-starter-*</text>
<text x="650" y="212" text-anchor="middle" font-size="11">开箱即用</text>
<rect x="50" y="270" width="200" height="80" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="150" y="300" text-anchor="middle" font-size="14" font-weight="bold">扩展点</text>
<text x="150" y="325" text-anchor="middle" font-size="11">FactoryBean</text>
<text x="150" y="342" text-anchor="middle" font-size="11">BeanPostProcessor</text>
<rect x="300" y="270" width="200" height="80" fill="#fce4ec" stroke="#e91e63" stroke-width="2" rx="5"/>
<text x="400" y="300" text-anchor="middle" font-size="14" font-weight="bold">配置类</text>
<text x="400" y="325" text-anchor="middle" font-size="11">@Configuration</text>
<text x="400" y="342" text-anchor="middle" font-size="11">@EnableXxx</text>
<rect x="550" y="270" width="200" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="650" y="300" text-anchor="middle" font-size="14" font-weight="bold">属性绑定</text>
<text x="650" y="325" text-anchor="middle" font-size="11">@ConfigurationProperties</text>
<text x="650" y="342" text-anchor="middle" font-size="11">application.yml</text>
<path d="M 450 90 L 150 140" stroke="#333" stroke-width="2" marker-end="url(#arrowhead20)"/>
<path d="M 450 90 L 400 140" stroke="#333" stroke-width="2" marker-end="url(#arrowhead20)"/>
<path d="M 450 90 L 650 140" stroke="#333" stroke-width="2" marker-end="url(#arrowhead20)"/>
<path d="M 450 90 L 150 270" stroke="#333" stroke-width="2" marker-end="url(#arrowhead20)"/>
<path d="M 450 90 L 400 270" stroke="#333" stroke-width="2" marker-end="url(#arrowhead20)"/>
<path d="M 450 90 L 650 270" stroke="#333" stroke-width="2" marker-end="url(#arrowhead20)"/>
<defs>
<marker id="arrowhead20" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**2. Spring 整合 MyBatis**

**（1）添加依赖**

```xml
<!-- pom.xml -->
<dependencies>
    <!-- MyBatis Spring Boot Starter -->
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>3.0.0</version>
    </dependency>

    <!-- 数据库驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>

    <!-- 连接池 -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid-spring-boot-starter</artifactId>
        <version>1.2.16</version>
    </dependency>
</dependencies>
```

**（2）配置文件**

```yaml
# application.yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8
    username: root
    password: 123456
    type: com.alibaba.druid.pool.DruidDataSource

mybatis:
  # Mapper XML 文件位置
  mapper-locations: classpath:mapper/*.xml
  # 类型别名包
  type-aliases-package: com.example.entity
  configuration:
    # 驼峰命名转换
    map-underscore-to-camel-case: true
    # 日志实现
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

**（3）Mapper 接口**

```java
// UserMapper.java
@Mapper  // 方式1：在每个 Mapper 接口上加 @Mapper 注解
public interface UserMapper {
    User selectById(Long id);

    List<User> selectAll();

    int insert(User user);

    int update(User user);

    int deleteById(Long id);
}

// 方式2：在启动类上使用 @MapperScan
@SpringBootApplication
@MapperScan("com.example.mapper")  // 扫描指定包下的所有 Mapper 接口
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

**（4）Mapper XML 文件**

```xml
<!-- UserMapper.xml -->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mapper.UserMapper">

    <select id="selectById" resultType="User">
        SELECT * FROM user WHERE id = #{id}
    </select>

    <select id="selectAll" resultType="User">
        SELECT * FROM user
    </select>

    <insert id="insert" parameterType="User" useGeneratedKeys="true" keyProperty="id">
        INSERT INTO user (username, email, age)
        VALUES (#{username}, #{email}, #{age})
    </insert>

    <update id="update" parameterType="User">
        UPDATE user
        SET username = #{username}, email = #{email}, age = #{age}
        WHERE id = #{id}
    </update>

    <delete id="deleteById">
        DELETE FROM user WHERE id = #{id}
    </delete>

</mapper>
```

**（5）MyBatis 整合原理**

MyBatis-Spring 通过以下机制实现整合：

```java
// 核心组件1：SqlSessionFactoryBean（FactoryBean 扩展点）
@Configuration
public class MyBatisConfig {

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);
        factoryBean.setMapperLocations(
            new PathMatchingResourcePatternResolver().getResources("classpath:mapper/*.xml")
        );
        return factoryBean.getObject();
    }
}

// 核心组件2：MapperScannerConfigurer（BeanDefinitionRegistryPostProcessor 扩展点）
// 自动扫描 Mapper 接口并注册为 Spring Bean
@Configuration
public class MapperScanConfig {

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        MapperScannerConfigurer configurer = new MapperScannerConfigurer();
        configurer.setBasePackage("com.example.mapper");
        configurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
        return configurer;
    }
}

// 核心组件3：MapperFactoryBean（为每个 Mapper 接口创建代理）
// Spring 会为每个 Mapper 接口创建一个 MapperFactoryBean
public class MapperFactoryBean<T> extends SqlSessionDaoSupport implements FactoryBean<T> {

    private Class<T> mapperInterface;

    @Override
    public T getObject() throws Exception {
        // 返回 Mapper 接口的代理对象
        return getSqlSession().getMapper(this.mapperInterface);
    }

    @Override
    public Class<T> getObjectType() {
        return this.mapperInterface;
    }
}
```

**MyBatis 整合流程：**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="200" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="75" text-anchor="middle" font-size="14" font-weight="bold">1. SqlSessionFactory</text>
<text x="150" y="95" text-anchor="middle" font-size="11">创建 MyBatis 核心</text>
<rect x="300" y="50" width="200" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" font-size="14" font-weight="bold">2. MapperScanner</text>
<text x="400" y="95" text-anchor="middle" font-size="11">扫描 Mapper 接口</text>
<rect x="550" y="50" width="200" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="650" y="75" text-anchor="middle" font-size="14" font-weight="bold">3. MapperFactoryBean</text>
<text x="650" y="95" text-anchor="middle" font-size="11">创建 Mapper 代理</text>
<rect x="300" y="160" width="200" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="400" y="185" text-anchor="middle" font-size="14" font-weight="bold">4. Mapper 代理对象</text>
<text x="400" y="205" text-anchor="middle" font-size="11">注入到 Spring 容器</text>
<rect x="300" y="270" width="200" height="60" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="400" y="295" text-anchor="middle" font-size="14" font-weight="bold">5. @Autowired</text>
<text x="400" y="315" text-anchor="middle" font-size="11">注入到 Service</text>
<rect x="300" y="380" width="200" height="60" fill="#fce4ec" stroke="#e91e63" stroke-width="2" rx="5"/>
<text x="400" y="405" text-anchor="middle" font-size="14" font-weight="bold">6. 执行 SQL</text>
<text x="400" y="425" text-anchor="middle" font-size="11">调用 Mapper 方法</text>
<path d="M 250 80 L 300 80" stroke="#333" stroke-width="2" marker-end="url(#arrowhead21)"/>
<path d="M 500 80 L 550 80" stroke="#333" stroke-width="2" marker-end="url(#arrowhead21)"/>
<path d="M 650 110 L 650 140 L 500 140 L 500 160" stroke="#333" stroke-width="2" marker-end="url(#arrowhead21)"/>
<path d="M 400 220 L 400 270" stroke="#333" stroke-width="2" marker-end="url(#arrowhead21)"/>
<path d="M 400 330 L 400 380" stroke="#333" stroke-width="2" marker-end="url(#arrowhead21)"/>
<defs>
<marker id="arrowhead21" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**3. Spring 整合 Redis**

**（1）添加依赖**

```xml
<dependencies>
    <!-- Redis Spring Boot Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>

    <!-- Lettuce 客户端（默认） -->
    <dependency>
        <groupId>io.lettuce.core</groupId>
        <artifactId>lettuce-core</artifactId>
    </dependency>

    <!-- 可选：Jedis 客户端 -->
    <!--
    <dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
    </dependency>
    -->

    <!-- 对象序列化（可选） -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
    </dependency>
</dependencies>
```

**（2）配置文件**

```yaml
# application.yml
spring:
  redis:
    # 单机模式
    host: localhost
    port: 6379
    password: 123456
    database: 0

    # 连接池配置（Lettuce）
    lettuce:
      pool:
        max-active: 8     # 最大连接数
        max-idle: 8       # 最大空闲连接
        min-idle: 0       # 最小空闲连接
        max-wait: -1ms    # 连接超时时间

    # 集群模式
    # cluster:
    #   nodes:
    #     - 192.168.1.1:6379
    #     - 192.168.1.2:6379
    #     - 192.168.1.3:6379
    #   max-redirects: 3

    # 哨兵模式
    # sentinel:
    #   master: mymaster
    #   nodes:
    #     - 192.168.1.1:26379
    #     - 192.168.1.2:26379
    #     - 192.168.1.3:26379
```

**（3）配置类（可选）**

```java
@Configuration
public class RedisConfig {

    /**
     * 自定义 RedisTemplate
     * 使用 JSON 序列化代替默认的 JDK 序列化
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory connectionFactory) {

        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        // JSON 序列化配置
        Jackson2JsonRedisSerializer<Object> serializer =
            new Jackson2JsonRedisSerializer<>(Object.class);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        objectMapper.activateDefaultTyping(
            LaissezFaireSubTypeValidator.instance,
            ObjectMapper.DefaultTyping.NON_FINAL
        );
        serializer.setObjectMapper(objectMapper);

        // String 序列化
        StringRedisSerializer stringSerializer = new StringRedisSerializer();

        // key 采用 String 序列化
        template.setKeySerializer(stringSerializer);
        template.setHashKeySerializer(stringSerializer);

        // value 采用 JSON 序列化
        template.setValueSerializer(serializer);
        template.setHashValueSerializer(serializer);

        template.afterPropertiesSet();
        return template;
    }

    /**
     * 缓存配置（可选）
     */
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))  // 默认过期时间 10 分钟
            .serializeKeysWith(
                RedisSerializationContext.SerializationPair.fromSerializer(
                    new StringRedisSerializer()
                )
            )
            .serializeValuesWith(
                RedisSerializationContext.SerializationPair.fromSerializer(
                    new Jackson2JsonRedisSerializer<>(Object.class)
                )
            );

        return RedisCacheManager.builder(connectionFactory)
            .cacheDefaults(config)
            .build();
    }
}
```

**（4）使用示例**

```java
@Service
public class RedisService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    // String 操作
    public void setString(String key, String value) {
        stringRedisTemplate.opsForValue().set(key, value);
    }

    public String getString(String key) {
        return stringRedisTemplate.opsForValue().get(key);
    }

    // 对象操作
    public void setObject(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public Object getObject(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    // Hash 操作
    public void setHash(String key, String hashKey, Object value) {
        redisTemplate.opsForHash().put(key, hashKey, value);
    }

    public Object getHash(String key, String hashKey) {
        return redisTemplate.opsForHash().get(key, hashKey);
    }

    // List 操作
    public void pushList(String key, Object value) {
        redisTemplate.opsForList().rightPush(key, value);
    }

    public Object popList(String key) {
        return redisTemplate.opsForList().leftPop(key);
    }

    // Set 操作
    public void addSet(String key, Object... values) {
        redisTemplate.opsForSet().add(key, values);
    }

    public Set<Object> getSet(String key) {
        return redisTemplate.opsForSet().members(key);
    }

    // ZSet 操作
    public void addZSet(String key, Object value, double score) {
        redisTemplate.opsForZSet().add(key, value, score);
    }

    public Set<Object> rangeZSet(String key, long start, long end) {
        return redisTemplate.opsForZSet().range(key, start, end);
    }

    // 设置过期时间
    public void expire(String key, long timeout, TimeUnit unit) {
        redisTemplate.expire(key, timeout, unit);
    }

    // 删除
    public void delete(String key) {
        redisTemplate.delete(key);
    }
}

// 使用 @Cacheable 注解（需在启动类添加 @EnableCaching）
@Service
public class UserService {

    @Cacheable(value = "user", key = "#id")
    public User getUserById(Long id) {
        // 查询数据库
        return userRepository.findById(id).orElse(null);
    }

    @CachePut(value = "user", key = "#user.id")
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @CacheEvict(value = "user", key = "#id")
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
```

**（5）Redis 整合原理**

```java
// 核心自动配置类：RedisAutoConfiguration
@Configuration
@ConditionalOnClass(RedisOperations.class)
@EnableConfigurationProperties(RedisProperties.class)
public class RedisAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean(name = "redisTemplate")
    public RedisTemplate<Object, Object> redisTemplate(
            RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        return template;
    }

    @Bean
    @ConditionalOnMissingBean
    public StringRedisTemplate stringRedisTemplate(
            RedisConnectionFactory redisConnectionFactory) {
        return new StringRedisTemplate(redisConnectionFactory);
    }
}

// Lettuce 连接工厂配置
@Configuration
@ConditionalOnClass(RedisClient.class)
class LettuceConnectionConfiguration extends RedisConnectionConfiguration {

    @Bean
    @ConditionalOnMissingBean(RedisConnectionFactory.class)
    public LettuceConnectionFactory redisConnectionFactory() {
        LettuceClientConfiguration clientConfig = getLettuceClientConfiguration();
        return new LettuceConnectionFactory(getStandaloneConfig(), clientConfig);
    }
}
```

**4. Spring 整合其他常见框架**

**（1）整合 Kafka**

```yaml
# application.yml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: my-group
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
```

```java
@Service
public class KafkaService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    // 发送消息
    public void send(String topic, String message) {
        kafkaTemplate.send(topic, message);
    }

    // 消费消息
    @KafkaListener(topics = "my-topic", groupId = "my-group")
    public void consume(String message) {
        System.out.println("收到消息: " + message);
    }
}
```

**（2）整合 Elasticsearch**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>
```

```java
// Entity
@Document(indexName = "products")
public class Product {
    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Keyword)
    private String category;

    @Field(type = FieldType.Double)
    private Double price;

    // getters and setters
}

// Repository
public interface ProductRepository extends ElasticsearchRepository<Product, String> {
    List<Product> findByName(String name);
    List<Product> findByCategory(String category);
}

// Service
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
```

**（3）整合 MongoDB**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/test
      # 或者分开配置
      # host: localhost
      # port: 27017
      # database: test
      # username: admin
      # password: 123456
```

```java
// Document
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private Integer age;
    // getters and setters
}

// Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
    List<User> findByAgeBetween(Integer minAge, Integer maxAge);
}
```

**5. Spring 整合框架的通用模式**

**模式总结：**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring 整合框架通用模式</text>
<rect x="50" y="60" width="700" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="14" font-weight="bold">1. 添加 Starter 依赖</text>
<text x="400" y="105" text-anchor="middle" font-size="11">spring-boot-starter-xxx</text>
<rect x="50" y="140" width="700" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="165" text-anchor="middle" font-size="14" font-weight="bold">2. 自动配置生效</text>
<text x="400" y="185" text-anchor="middle" font-size="11">XxxAutoConfiguration + @ConditionalOnClass</text>
<rect x="50" y="220" width="700" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="245" text-anchor="middle" font-size="14" font-weight="bold">3. 创建核心对象</text>
<text x="400" y="265" text-anchor="middle" font-size="11">SqlSessionFactory / RedisTemplate / KafkaTemplate</text>
<rect x="50" y="300" width="700" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="400" y="325" text-anchor="middle" font-size="14" font-weight="bold">4. 注册到 Spring 容器</text>
<text x="400" y="345" text-anchor="middle" font-size="11">@Bean / FactoryBean / BeanDefinitionRegistry</text>
<rect x="50" y="380" width="700" height="60" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="400" y="405" text-anchor="middle" font-size="14" font-weight="bold">5. 属性绑定</text>
<text x="400" y="425" text-anchor="middle" font-size="11">@ConfigurationProperties → application.yml</text>
<rect x="50" y="460" width="700" height="60" fill="#fce4ec" stroke="#e91e63" stroke-width="2" rx="5"/>
<text x="400" y="485" text-anchor="middle" font-size="14" font-weight="bold">6. 依赖注入使用</text>
<text x="400" y="505" text-anchor="middle" font-size="11">@Autowired / @Resource</text>
<path d="M 400 120 L 400 140" stroke="#333" stroke-width="2" marker-end="url(#arrowhead22)"/>
<path d="M 400 200 L 400 220" stroke="#333" stroke-width="2" marker-end="url(#arrowhead22)"/>
<path d="M 400 280 L 400 300" stroke="#333" stroke-width="2" marker-end="url(#arrowhead22)"/>
<path d="M 400 360 L 400 380" stroke="#333" stroke-width="2" marker-end="url(#arrowhead22)"/>
<path d="M 400 440 L 400 460" stroke="#333" stroke-width="2" marker-end="url(#arrowhead22)"/>
<defs>
<marker id="arrowhead22" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**6. 自定义 Starter（高级）**

如果需要整合自己的框架或库，可以创建自定义 Starter。

```java
// 1. 定义属性配置类
@ConfigurationProperties(prefix = "my.framework")
public class MyFrameworkProperties {
    private String url;
    private int timeout = 30;
    private boolean enabled = true;

    // getters and setters
}

// 2. 定义自动配置类
@Configuration
@ConditionalOnClass(MyFrameworkClient.class)
@EnableConfigurationProperties(MyFrameworkProperties.class)
public class MyFrameworkAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public MyFrameworkClient myFrameworkClient(MyFrameworkProperties properties) {
        MyFrameworkClient client = new MyFrameworkClient();
        client.setUrl(properties.getUrl());
        client.setTimeout(properties.getTimeout());
        return client;
    }
}

// 3. 创建 spring.factories
// META-INF/spring.factories
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.example.autoconfigure.MyFrameworkAutoConfiguration
```

**关键要点：**

1. **Starter 机制**是 Spring Boot 整合框架的核心，通过依赖传递自动引入所需类库
2. **自动配置类**使用 @ConditionalOnClass 等条件注解，根据 classpath 决定是否生效
3. **@ConfigurationProperties** 将配置文件属性绑定到 Java 对象
4. **FactoryBean** 用于创建复杂对象（如 MyBatis 的 SqlSessionFactoryBean）
5. **BeanDefinitionRegistryPostProcessor** 用于动态注册 Bean（如 MyBatis 的 MapperScannerConfigurer）
6. **依赖注入**让框架对象成为 Spring Bean，可以通过 @Autowired 使用
7. **Spring Boot Actuator** 可为整合的框架提供健康检查和监控端点
8. **约定优于配置**，大多数情况下只需添加依赖和少量配置即可使用
9. **自定义 Starter** 遵循 spring-boot-starter-xxx 命名规范
10. **整合本质**是将第三方框架的核心对象纳入 Spring 容器管理

**记忆口诀：**

Starter 依赖自动配，条件注解判断加。核心对象创建好，容器管理统一调。属性绑定配置文件，依赖注入即可用。扩展点巧妙利用，整合框架如鱼得水。
