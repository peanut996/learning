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
