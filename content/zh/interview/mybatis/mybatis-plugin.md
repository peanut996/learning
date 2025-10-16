## 插件机制
### 63. 什么是 MyBatis 插件？

**核心答案**

MyBatis 插件是基于 JDK 动态代理和拦截器模式实现的扩展机制，允许在 SQL 执行的特定时机拦截并修改 MyBatis 的核心对象方法调用，实现日志记录、性能监控、分页、数据加密等功能。

**详细说明**

1. **插件的本质**
   - **拦截器模式**：通过 @Intercepts 注解声明拦截点
   - **动态代理**：使用 JDK 动态代理包装目标对象
   - **责任链模式**：多个插件形成拦截器链
   - **AOP 思想**：在方法执行前后插入自定义逻辑

2. **插件架构**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="490" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">MyBatis 插件工作原理</text>
<rect x="300" y="90" width="200" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">SqlSessionFactory</text>
<line x1="400" y1="140" x2="400" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="170" width="200" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="200" text-anchor="middle" font-size="14" font-weight="bold" fill="#e65100">拦截器链</text>
<line x1="400" y1="220" x2="400" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="80" y="250" width="160" height="60" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="160" y="275" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">Plugin 1</text>
<text x="160" y="295" text-anchor="middle" font-size="11" fill="#4a148c">日志插件</text>
<rect x="280" y="250" width="160" height="60" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="360" y="275" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">Plugin 2</text>
<text x="360" y="295" text-anchor="middle" font-size="11" fill="#4a148c">分页插件</text>
<rect x="480" y="250" width="160" height="60" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="560" y="275" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">Plugin 3</text>
<text x="560" y="295" text-anchor="middle" font-size="11" fill="#4a148c">性能监控</text>
<line x1="320" y1="220" x2="160" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="220" x2="360" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="480" y1="220" x2="560" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="160" y1="310" x2="160" y2="340" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="360" y1="310" x2="360" y2="340" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="560" y1="310" x2="560" y2="340" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="340" width="200" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="370" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">目标对象</text>
<line x1="240" y1="365" x2="300" y2="365" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="440" y1="365" x2="500" y2="365" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="120" y="420" width="140" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="190" y="450" text-anchor="middle" font-size="13" font-weight="bold" fill="#c62828">Executor</text>
<rect x="290" y="420" width="140" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="360" y="435" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">Statement</text>
<text x="360" y="455" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">Handler</text>
<rect x="460" y="420" width="140" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="530" y="435" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">Parameter</text>
<text x="530" y="455" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">Handler</text>
<rect x="630" y="420" width="140" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="700" y="435" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">ResultSet</text>
<text x="700" y="455" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">Handler</text>
<line x1="330" y1="390" x2="190" y2="420" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="360" y1="390" x2="360" y2="420" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="420" y1="390" x2="530" y2="420" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="470" y1="390" x2="700" y2="420" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
</svg>

3. **可拦截的四大对象**

| 对象 | 作用 | 可拦截方法 |
|------|------|-----------|
| **Executor** | SQL 执行器 | update、query、commit、rollback 等 |
| **StatementHandler** | SQL 语句处理 | prepare、parameterize、batch、update、query |
| **ParameterHandler** | 参数处理 | getParameterObject、setParameters |
| **ResultSetHandler** | 结果集处理 | handleResultSets、handleOutputParameters |

4. **插件执行流程**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="340" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">插件执行流程</text>
<rect x="100" y="90" width="150" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="175" y="120" text-anchor="middle" font-size="13" fill="#1976d2">1. 创建目标对象</text>
<line x1="250" y1="115" x2="300" y2="115" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="90" width="150" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="375" y="120" text-anchor="middle" font-size="13" fill="#e65100">2. 遍历拦截器链</text>
<line x1="450" y1="115" x2="500" y2="115" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="500" y="90" width="150" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="575" y="120" text-anchor="middle" font-size="13" fill="#7b1fa2">3. 创建代理对象</text>
<line x1="175" y1="140" x2="175" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="180" width="150" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="175" y="210" text-anchor="middle" font-size="13" fill="#2e7d32">4. 调用方法</text>
<line x1="250" y1="205" x2="300" y2="205" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="180" width="150" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="375" y="210" text-anchor="middle" font-size="13" fill="#c62828">5. 拦截器处理</text>
<line x1="450" y1="205" x2="500" y2="205" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="500" y="180" width="150" height="50" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="575" y="210" text-anchor="middle" font-size="13" fill="#f57f17">6. 执行目标方法</text>
<line x1="575" y1="140" x2="575" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="375" y1="230" x2="375" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="270" width="150" height="50" fill="#e1f5fe" stroke="#03a9f4" stroke-width="2" rx="5"/>
<text x="375" y="300" text-anchor="middle" font-size="13" fill="#01579b">7. 返回结果</text>
</svg>

5. **插件示例**

```java
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class,
                RowBounds.class, ResultHandler.class}
    )
})
public class ExamplePlugin implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 执行前处理
        System.out.println("Before query...");

        // 执行目标方法
        Object result = invocation.proceed();

        // 执行后处理
        System.out.println("After query...");

        return result;
    }

    @Override
    public Object plugin(Object target) {
        // 使用 Plugin.wrap 创建代理对象
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
        // 获取配置参数
        String param = properties.getProperty("param");
    }
}
```

6. **常见应用场景**

| 场景 | 说明 | 示例 |
|------|------|------|
| **性能监控** | 记录 SQL 执行时间 | 慢查询日志 |
| **SQL 改写** | 动态修改 SQL | 多租户、分页 |
| **数据加密** | 敏感字段加解密 | 身份证号、手机号 |
| **权限控制** | 数据权限过滤 | 行级权限 |
| **日志记录** | 记录完整 SQL | SQL 审计 |

**关键要点**

1. **动态代理**：插件基于 JDK 动态代理实现
2. **四大对象**：只能拦截 Executor、StatementHandler、ParameterHandler、ResultSetHandler
3. **执行顺序**：多个插件按配置顺序形成责任链
4. **性能影响**：每个插件增加一层代理，注意性能开销
5. **线程安全**：插件实例是单例，需保证线程安全

**记忆口诀**

"四大对象可拦截，动态代理做增强，责任链式顺序执行，监控分页都能干"

### 64. MyBatis 插件的原理是什么？

**核心答案**

MyBatis 插件原理基于 JDK 动态代理和责任链模式。在创建四大核心对象（Executor、StatementHandler、ParameterHandler、ResultSetHandler）时，通过 InterceptorChain 遍历所有插件，使用 Plugin.wrap() 方法层层包装目标对象，生成代理对象。当调用目标方法时，会先经过代理对象的 invoke 方法，执行插件的 intercept 方法。

**详细说明**

1. **核心组件**
   - **Interceptor 接口**：定义插件规范
   - **InterceptorChain**：管理所有插件的责任链
   - **Plugin 类**：提供代理对象创建的工具方法
   - **@Intercepts/@Signature**：声明拦截点

2. **工作流程**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="540" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">MyBatis 插件原理详解</text>
<rect x="100" y="90" width="600" height="70" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="110" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">1. 初始化阶段</text>
<text x="120" y="135" font-size="12" fill="#424242">• 解析配置文件中的 &lt;plugins&gt; 标签</text>
<text x="120" y="152" font-size="12" fill="#424242">• 创建 Interceptor 实例并加入 InterceptorChain</text>
<line x1="400" y1="160" x2="400" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="180" width="600" height="90" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="200" text-anchor="middle" font-size="14" font-weight="bold" fill="#e65100">2. 对象创建阶段</text>
<text x="120" y="225" font-size="12" fill="#424242">• 创建四大核心对象（Executor/StatementHandler/...）</text>
<text x="120" y="242" font-size="12" fill="#424242">• 调用 interceptorChain.pluginAll(target)</text>
<text x="120" y="259" font-size="12" fill="#424242">• 遍历所有插件，调用 plugin(target) 方法</text>
<line x1="400" y1="270" x2="400" y2="290" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="290" width="280" height="90" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="240" y="310" text-anchor="middle" font-size="14" font-weight="bold" fill="#7b1fa2">3a. 匹配拦截点</text>
<text x="120" y="335" font-size="12" fill="#424242">• 检查插件的 @Signature</text>
<text x="120" y="352" font-size="12" fill="#424242">• 匹配目标对象和方法</text>
<text x="120" y="369" font-size="12" fill="#424242">• 不匹配则返回原对象</text>
<rect x="420" y="290" width="280" height="90" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="560" y="310" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">3b. 创建代理</text>
<text x="440" y="335" font-size="12" fill="#424242">• 匹配则调用 Plugin.wrap()</text>
<text x="440" y="352" font-size="12" fill="#424242">• 使用 JDK 动态代理</text>
<text x="440" y="369" font-size="12" fill="#424242">• 返回代理对象</text>
<line x1="380" y1="335" x2="420" y2="335" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="560" y1="380" x2="560" y2="400" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="400" width="600" height="90" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="400" y="420" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">4. 方法调用阶段</text>
<text x="120" y="445" font-size="12" fill="#424242">• 调用代理对象的方法</text>
<text x="120" y="462" font-size="12" fill="#424242">• 触发 InvocationHandler.invoke()</text>
<text x="120" y="479" font-size="12" fill="#424242">• 执行插件的 intercept() 方法</text>
<line x1="400" y1="490" x2="400" y2="510" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="510" width="600" height="50" fill="#e1f5fe" stroke="#03a9f4" stroke-width="2" rx="5"/>
<text x="400" y="530" text-anchor="middle" font-size="14" font-weight="bold" fill="#01579b">5. 执行目标方法</text>
<text x="120" y="550" font-size="12" fill="#424242">• 调用 invocation.proceed() 执行真正的业务逻辑</text>
</svg>

3. **核心代码分析**

**InterceptorChain（拦截器链）：**
```java
public class InterceptorChain {
    // 存储所有插件
    private final List<Interceptor> interceptors = new ArrayList<>();

    // 对目标对象应用所有插件
    public Object pluginAll(Object target) {
        for (Interceptor interceptor : interceptors) {
            // 每个插件包装一次，形成代理链
            target = interceptor.plugin(target);
        }
        return target;
    }

    public void addInterceptor(Interceptor interceptor) {
        interceptors.add(interceptor);
    }
}
```

**Plugin（代理工具类）：**
```java
public class Plugin implements InvocationHandler {
    private final Object target;
    private final Interceptor interceptor;
    private final Map<Class<?>, Set<Method>> signatureMap;

    // 创建代理对象
    public static Object wrap(Object target, Interceptor interceptor) {
        // 获取插件声明的拦截点
        Map<Class<?>, Set<Method>> signatureMap =
            getSignatureMap(interceptor);

        Class<?> type = target.getClass();
        // 获取目标对象实现的所有被拦截的接口
        Class<?>[] interfaces = getAllInterfaces(type, signatureMap);

        if (interfaces.length > 0) {
            // 创建 JDK 动态代理
            return Proxy.newProxyInstance(
                type.getClassLoader(),
                interfaces,
                new Plugin(target, interceptor, signatureMap)
            );
        }
        return target;
    }

    // InvocationHandler 接口方法
    @Override
    public Object invoke(Object proxy, Method method, Object[] args)
            throws Throwable {
        try {
            // 检查是否需要拦截该方法
            Set<Method> methods = signatureMap.get(method.getDeclaringClass());
            if (methods != null && methods.contains(method)) {
                // 执行插件的拦截逻辑
                return interceptor.intercept(
                    new Invocation(target, method, args)
                );
            }
            // 不拦截则直接执行
            return method.invoke(target, args);
        } catch (Exception e) {
            throw ExceptionUtil.unwrapThrowable(e);
        }
    }
}
```

**Executor 创建过程（示例）：**
```java
public Executor newExecutor(Transaction transaction) {
    // 创建基础 Executor
    Executor executor = new SimpleExecutor(this, transaction);

    // 应用所有插件
    executor = (Executor) interceptorChain.pluginAll(executor);

    return executor;
}
```

4. **代理链结构**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="290" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">多层代理结构</text>
<rect x="100" y="100" width="120" height="60" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="160" y="125" text-anchor="middle" font-size="12" fill="#1976d2">Plugin3</text>
<text x="160" y="145" text-anchor="middle" font-size="11" fill="#424242">代理对象</text>
<line x1="220" y1="130" x2="260" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="260" y="100" width="120" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="320" y="125" text-anchor="middle" font-size="12" fill="#e65100">Plugin2</text>
<text x="320" y="145" text-anchor="middle" font-size="11" fill="#424242">代理对象</text>
<line x1="380" y1="130" x2="420" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="420" y="100" width="120" height="60" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="480" y="125" text-anchor="middle" font-size="12" fill="#7b1fa2">Plugin1</text>
<text x="480" y="145" text-anchor="middle" font-size="11" fill="#424242">代理对象</text>
<line x1="540" y1="130" x2="580" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="580" y="100" width="120" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="640" y="125" text-anchor="middle" font-size="12" fill="#2e7d32">Target</text>
<text x="640" y="145" text-anchor="middle" font-size="11" fill="#424242">目标对象</text>
<text x="100" y="200" font-size="13" font-weight="bold" fill="#212529">调用顺序：</text>
<rect x="100" y="210" width="600" height="90" fill="#fff" stroke="#ccc" stroke-width="1" rx="3"/>
<text x="120" y="235" font-size="12" fill="#424242">1. 客户端调用 Plugin3.method()</text>
<text x="120" y="255" font-size="12" fill="#424242">2. Plugin3.intercept() → invocation.proceed() → Plugin2.method()</text>
<text x="120" y="275" font-size="12" fill="#424242">3. Plugin2.intercept() → invocation.proceed() → Plugin1.method()</text>
<text x="120" y="295" font-size="12" fill="#424242">4. Plugin1.intercept() → invocation.proceed() → Target.method()</text>
</svg>

5. **关键机制对比**

| 特性 | 说明 |
|------|------|
| **代理方式** | JDK 动态代理（基于接口） |
| **代理层数** | 每个插件一层，形成代理链 |
| **执行顺序** | 配置顺序的倒序执行 |
| **方法匹配** | 基于 @Signature 注解配置 |
| **性能开销** | 每层代理增加方法调用开销 |

**关键要点**

1. **JDK 动态代理**：必须基于接口，这就是为什么只能拦截四大对象
2. **责任链模式**：多个插件形成链式调用
3. **层层包装**：每个插件都包装前一个对象
4. **签名匹配**：通过 @Signature 精确匹配拦截点
5. **执行顺序**：先配置的插件在外层，后执行拦截逻辑

**记忆口诀**

"动态代理做包装，责任链式层层套，签名匹配定拦截，先配置的后执行"

### 65. 如何自定义 MyBatis 插件？

**核心答案**

自定义 MyBatis 插件需要：1) 实现 Interceptor 接口的三个方法；2) 使用 @Intercepts 和 @Signature 注解声明拦截点；3) 在配置文件中注册插件或使用 @Component 自动注册。核心是实现 intercept() 方法编写拦截逻辑。

**详细说明**

1. **实现步骤**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="390" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">自定义插件步骤</text>
<rect x="250" y="90" width="300" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="14" fill="#1976d2">1. 实现 Interceptor 接口</text>
<line x1="400" y1="140" x2="400" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="160" width="300" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="190" text-anchor="middle" font-size="14" fill="#e65100">2. 添加 @Intercepts 注解</text>
<line x1="400" y1="210" x2="400" y2="230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="230" width="300" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="260" text-anchor="middle" font-size="14" fill="#7b1fa2">3. 实现三个核心方法</text>
<line x1="400" y1="280" x2="400" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="300" width="200" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="200" y="330" text-anchor="middle" font-size="13" fill="#2e7d32">intercept()</text>
<rect x="320" y="300" width="160" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="330" text-anchor="middle" font-size="13" fill="#2e7d32">plugin()</text>
<rect x="500" y="300" width="200" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="600" y="330" text-anchor="middle" font-size="13" fill="#2e7d32">setProperties()</text>
<line x1="350" y1="280" x2="200" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="280" x2="400" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="280" x2="600" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="350" x2="400" y2="370" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="370" width="300" height="40" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="400" y="395" text-anchor="middle" font-size="14" fill="#c62828">4. 注册插件</text>
</svg>

2. **完整示例：SQL 执行时间监控插件**

```java
/**
 * SQL 执行时间监控插件
 */
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "update",
        args = {MappedStatement.class, Object.class}
    ),
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class,
                RowBounds.class, ResultHandler.class}
    )
})
@Component  // Spring 环境下自动注册
public class SqlTimingPlugin implements Interceptor {

    // 慢查询阈值（毫秒）
    private long slowSqlThreshold = 1000;

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 记录开始时间
        long startTime = System.currentTimeMillis();

        // 获取拦截的对象和参数
        MappedStatement mappedStatement =
            (MappedStatement) invocation.getArgs()[0];
        Object parameter = invocation.getArgs()[1];

        try {
            // 执行目标方法
            Object result = invocation.proceed();

            // 计算执行时间
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;

            // 记录日志
            logSqlTiming(mappedStatement, parameter, duration);

            return result;
        } catch (Exception e) {
            // 异常也要记录
            long endTime = System.currentTimeMillis();
            logSqlError(mappedStatement, parameter,
                       endTime - startTime, e);
            throw e;
        }
    }

    @Override
    public Object plugin(Object target) {
        // 使用 Plugin.wrap 创建代理对象
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
        // 读取配置参数
        String threshold = properties.getProperty("slowSqlThreshold");
        if (threshold != null) {
            this.slowSqlThreshold = Long.parseLong(threshold);
        }
    }

    private void logSqlTiming(MappedStatement ms,
                             Object parameter,
                             long duration) {
        if (duration > slowSqlThreshold) {
            String sqlId = ms.getId();
            String sql = getSql(ms, parameter);
            log.warn("慢查询 [{}ms] {}: {}", duration, sqlId, sql);
        } else {
            log.debug("SQL执行 [{}ms] {}", duration, ms.getId());
        }
    }

    private void logSqlError(MappedStatement ms,
                            Object parameter,
                            long duration,
                            Exception e) {
        String sqlId = ms.getId();
        String sql = getSql(ms, parameter);
        log.error("SQL执行失败 [{}ms] {}: {}, 异常: {}",
                 duration, sqlId, sql, e.getMessage());
    }

    private String getSql(MappedStatement ms, Object parameter) {
        BoundSql boundSql = ms.getBoundSql(parameter);
        return boundSql.getSql().replaceAll("\\s+", " ");
    }
}
```

3. **更多实用插件示例**

**分页插件（简化版）：**
```java
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class,
                RowBounds.class, ResultHandler.class}
    )
})
public class PagePlugin implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object[] args = invocation.getArgs();
        MappedStatement ms = (MappedStatement) args[0];
        Object parameter = args[1];
        RowBounds rowBounds = (RowBounds) args[2];

        // 如果需要分页
        if (rowBounds != RowBounds.DEFAULT) {
            // 修改 SQL，添加 LIMIT 子句
            BoundSql boundSql = ms.getBoundSql(parameter);
            String sql = boundSql.getSql();
            String pageSql = sql + " LIMIT " + rowBounds.getOffset()
                           + ", " + rowBounds.getLimit();

            // 创建新的 MappedStatement
            MappedStatement newMs = copyMappedStatement(ms, pageSql);
            args[0] = newMs;
        }

        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
        // 可配置数据库方言等
    }
}
```

**数据脱敏插件：**
```java
@Intercepts({
    @Signature(
        type = ResultSetHandler.class,
        method = "handleResultSets",
        args = {Statement.class}
    )
})
public class DataMaskingPlugin implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 获取原始结果
        Object result = invocation.proceed();

        // 对结果进行脱敏处理
        if (result instanceof List) {
            List<?> list = (List<?>) result;
            for (Object item : list) {
                maskSensitiveData(item);
            }
        }

        return result;
    }

    private void maskSensitiveData(Object obj) {
        if (obj == null) return;

        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field : fields) {
            // 检查是否有 @Sensitive 注解
            if (field.isAnnotationPresent(Sensitive.class)) {
                field.setAccessible(true);
                try {
                    Object value = field.get(obj);
                    if (value instanceof String) {
                        String masked = maskString((String) value);
                        field.set(obj, masked);
                    }
                } catch (Exception e) {
                    log.error("数据脱敏失败", e);
                }
            }
        }
    }

    private String maskString(String str) {
        if (str == null || str.length() < 2) return str;
        // 保留首尾字符
        return str.charAt(0) + "***" + str.charAt(str.length() - 1);
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {}
}
```

4. **插件注册方式**

**XML 配置方式：**
```xml
<configuration>
    <plugins>
        <plugin interceptor="com.example.plugin.SqlTimingPlugin">
            <property name="slowSqlThreshold" value="2000"/>
        </plugin>
    </plugins>
</configuration>
```

**Spring Boot 配置方式：**
```java
@Configuration
public class MyBatisConfig {

    @Bean
    public SqlTimingPlugin sqlTimingPlugin() {
        SqlTimingPlugin plugin = new SqlTimingPlugin();
        Properties properties = new Properties();
        properties.setProperty("slowSqlThreshold", "1000");
        plugin.setProperties(properties);
        return plugin;
    }
}
```

5. **开发注意事项**

| 注意点 | 说明 |
|--------|------|
| **性能影响** | 避免在 intercept() 中执行耗时操作 |
| **异常处理** | 必须正确处理异常，避免影响主流程 |
| **线程安全** | 插件是单例，注意共享状态的线程安全 |
| **签名准确** | @Signature 的参数必须与目标方法完全匹配 |
| **插件顺序** | 多个插件的顺序很重要，后配置的先执行 |

**关键要点**

1. **三个方法**：intercept（核心逻辑）、plugin（创建代理）、setProperties（参数配置）
2. **注解声明**：@Intercepts 和 @Signature 准确声明拦截点
3. **代理创建**：通常使用 Plugin.wrap() 简化代理创建
4. **参数获取**：通过 invocation.getArgs() 获取方法参数
5. **执行目标**：调用 invocation.proceed() 继续执行

**记忆口诀**

"实现接口三方法，注解声明拦截点，wrap 包装成代理，proceed 执行真逻辑"

### 66. MyBatis 可以拦截哪些对象的方法？

**核心答案**

MyBatis 插件只能拦截四大核心对象：Executor（执行器）、StatementHandler（语句处理器）、ParameterHandler（参数处理器）、ResultSetHandler（结果集处理器）。这是因为插件基于 JDK 动态代理实现，只有这四个对象在创建时会被 InterceptorChain 包装。

**详细说明**

1. **四大可拦截对象**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="490" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">MyBatis 四大可拦截对象</text>
<rect x="100" y="100" width="280" height="100" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="240" y="125" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976d2">Executor (执行器)</text>
<text x="120" y="150" font-size="12" fill="#424242">• update()</text>
<text x="120" y="170" font-size="12" fill="#424242">• query()</text>
<text x="120" y="190" font-size="12" fill="#424242">• commit() / rollback()</text>
<rect x="420" y="100" width="280" height="100" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="560" y="125" text-anchor="middle" font-size="15" font-weight="bold" fill="#e65100">StatementHandler (语句处理)</text>
<text x="440" y="150" font-size="12" fill="#424242">• prepare()</text>
<text x="440" y="170" font-size="12" fill="#424242">• parameterize()</text>
<text x="440" y="190" font-size="12" fill="#424242">• query() / update()</text>
<rect x="100" y="230" width="280" height="100" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="240" y="255" text-anchor="middle" font-size="15" font-weight="bold" fill="#7b1fa2">ParameterHandler (参数处理)</text>
<text x="120" y="280" font-size="12" fill="#424242">• getParameterObject()</text>
<text x="120" y="300" font-size="12" fill="#424242">• setParameters()</text>
<rect x="420" y="230" width="280" height="100" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="560" y="255" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">ResultSetHandler (结果处理)</text>
<text x="440" y="280" font-size="12" fill="#424242">• handleResultSets()</text>
<text x="440" y="300" font-size="12" fill="#424242">• handleOutputParameters()</text>
<rect x="100" y="360" width="600" height="140" fill="#fff" stroke="#ccc" stroke-width="1" rx="3"/>
<text x="120" y="385" font-size="13" font-weight="bold" fill="#212529">拦截时机：</text>
<text x="140" y="410" font-size="12" fill="#424242">1. Executor: SQL 执行前后（缓存、事务、批量操作）</text>
<text x="140" y="430" font-size="12" fill="#424242">2. StatementHandler: SQL 预编译和执行（SQL 改写、分页）</text>
<text x="140" y="450" font-size="12" fill="#424242">3. ParameterHandler: 参数设置（参数加密、类型转换）</text>
<text x="140" y="470" font-size="12" fill="#424242">4. ResultSetHandler: 结果映射（数据脱敏、结果转换）</text>
</svg>

2. **各对象详细说明**

**Executor（执行器）**
- **职责**：SQL 执行的总调度器，管理缓存和事务
- **拦截时机**：SQL 执行的最早阶段
- **常见用途**：
  - 慢查询监控
  - SQL 日志记录
  - 分布式事务
  - 自定义缓存

**可拦截方法签名：**
```java
@Signature(
    type = Executor.class,
    method = "update",
    args = {MappedStatement.class, Object.class}
)

@Signature(
    type = Executor.class,
    method = "query",
    args = {MappedStatement.class, Object.class,
            RowBounds.class, ResultHandler.class}
)

@Signature(
    type = Executor.class,
    method = "query",
    args = {MappedStatement.class, Object.class,
            RowBounds.class, ResultHandler.class,
            CacheKey.class, BoundSql.class}
)

@Signature(
    type = Executor.class,
    method = "commit",
    args = {boolean.class}
)

@Signature(
    type = Executor.class,
    method = "rollback",
    args = {boolean.class}
)
```

**StatementHandler（语句处理器）**
- **职责**：处理 JDBC Statement，设置参数、执行 SQL
- **拦截时机**：SQL 预编译和执行阶段
- **常见用途**：
  - SQL 改写（分页、多租户）
  - SQL 统计分析
  - 动态表名替换

**可拦截方法签名：**
```java
@Signature(
    type = StatementHandler.class,
    method = "prepare",
    args = {Connection.class, Integer.class}
)

@Signature(
    type = StatementHandler.class,
    method = "parameterize",
    args = {Statement.class}
)

@Signature(
    type = StatementHandler.class,
    method = "batch",
    args = {Statement.class}
)

@Signature(
    type = StatementHandler.class,
    method = "update",
    args = {Statement.class}
)

@Signature(
    type = StatementHandler.class,
    method = "query",
    args = {Statement.class, ResultHandler.class}
)
```

**ParameterHandler（参数处理器）**
- **职责**：设置 PreparedStatement 的参数
- **拦截时机**：参数绑定阶段
- **常见用途**：
  - 参数加密
  - 参数类型转换
  - 参数校验

**可拦截方法签名：**
```java
@Signature(
    type = ParameterHandler.class,
    method = "getParameterObject",
    args = {}
)

@Signature(
    type = ParameterHandler.class,
    method = "setParameters",
    args = {PreparedStatement.class}
)
```

**ResultSetHandler（结果集处理器）**
- **职责**：处理 JDBC ResultSet，映射为 Java 对象
- **拦截时机**：结果集映射阶段
- **常见用途**：
  - 数据脱敏
  - 结果转换
  - 字段解密

**可拦截方法签名：**
```java
@Signature(
    type = ResultSetHandler.class,
    method = "handleResultSets",
    args = {Statement.class}
)

@Signature(
    type = ResultSetHandler.class,
    method = "handleOutputParameters",
    args = {CallableStatement.class}
)
```

3. **执行顺序关系**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="340" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">SQL 执行流程与拦截点</text>
<rect x="300" y="100" width="200" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="130" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">1. Executor</text>
<line x1="400" y1="150" x2="400" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="170" width="200" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="200" text-anchor="middle" font-size="14" font-weight="bold" fill="#e65100">2. StatementHandler</text>
<line x1="400" y1="220" x2="400" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="240" width="200" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="270" text-anchor="middle" font-size="14" font-weight="bold" fill="#7b1fa2">3. ParameterHandler</text>
<line x1="400" y1="290" x2="400" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<ellipse cx="400" cy="330" rx="80" ry="25" fill="#ffebee" stroke="#f44336" stroke-width="2"/>
<text x="400" y="338" text-anchor="middle" font-size="13" font-weight="bold" fill="#c62828">执行 SQL</text>
<line x1="480" y1="330" x2="560" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="560" y="240" width="200" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="660" y="270" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">4. ResultSetHandler</text>
<text x="100" y="130" font-size="11" fill="#666">缓存、事务</text>
<text x="100" y="200" font-size="11" fill="#666">SQL 准备</text>
<text x="100" y="270" font-size="11" fill="#666">参数绑定</text>
<text x="660" y="230" font-size="11" fill="#666" text-anchor="middle">结果映射</text>
</svg>

4. **不能拦截的对象**

MyBatis 中以下对象**不能**直接拦截：
- Configuration
- SqlSessionFactory
- SqlSession
- Mapper 接口（但可以拦截其底层的 Executor）
- TypeHandler
- ObjectFactory

5. **选择拦截点的建议**

| 需求 | 推荐拦截点 | 原因 |
|------|----------|------|
| SQL 监控 | Executor | 最早阶段，可获取完整 SQL 信息 |
| 分页改写 | StatementHandler | 可直接修改 SQL 语句 |
| 参数加密 | ParameterHandler | 参数设置阶段处理 |
| 结果脱敏 | ResultSetHandler | 结果返回前处理 |
| 多租户 | StatementHandler | 可改写 SQL 添加租户条件 |
| 性能分析 | Executor | 可统计完整执行时间 |

**关键要点**

1. **四大对象**：只能拦截 Executor、StatementHandler、ParameterHandler、ResultSetHandler
2. **拦截原因**：因为只有这四个对象在创建时会被 InterceptorChain 包装
3. **执行顺序**：按照 SQL 执行流程顺序调用
4. **方法签名**：@Signature 必须准确匹配方法签名
5. **选择原则**：根据需求选择最合适的拦截点

**记忆口诀**

"执行语句参结果，四大对象能拦截，SQL 流程有顺序，选对位置是关键"

### 67. 常用的 MyBatis 插件有哪些？

**核心答案**

常用的 MyBatis 插件主要有：PageHelper（分页插件）、MyBatis-Plus（增强工具）、通用 Mapper（简化 CRUD）、MyBatis Generator（代码生成）、P6Spy（SQL 监控）、Dynamic Datasource（多数据源）等。其中 PageHelper 是使用最广泛的分页解决方案。

**详细说明**

1. **主流插件分类**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="440" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">常用 MyBatis 插件分类</text>
<rect x="320" y="90" width="160" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">MyBatis 插件</text>
<line x1="300" y1="140" x2="150" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="140" x2="400" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="500" y1="140" x2="650" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="80" y="180" width="140" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="150" y="210" text-anchor="middle" font-size="13" font-weight="bold" fill="#e65100">分页类</text>
<rect x="330" y="180" width="140" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="210" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">增强类</text>
<rect x="580" y="180" width="140" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="650" y="210" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">工具类</text>
<line x1="150" y1="230" x2="150" y2="260" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="230" x2="400" y2="260" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="650" y1="230" x2="650" y2="260" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="80" y="260" width="140" height="40" fill="#fff9c4" stroke="#fbc02d" stroke-width="1" rx="3"/>
<text x="150" y="285" text-anchor="middle" font-size="12" fill="#f57f17">PageHelper</text>
<rect x="80" y="310" width="140" height="40" fill="#fff9c4" stroke="#fbc02d" stroke-width="1" rx="3"/>
<text x="150" y="335" text-anchor="middle" font-size="12" fill="#f57f17">JSqlParser</text>
<rect x="330" y="260" width="140" height="40" fill="#e1bee7" stroke="#ab47bc" stroke-width="1" rx="3"/>
<text x="400" y="285" text-anchor="middle" font-size="12" fill="#6a1b9a">MyBatis-Plus</text>
<rect x="330" y="310" width="140" height="40" fill="#e1bee7" stroke="#ab47bc" stroke-width="1" rx="3"/>
<text x="400" y="335" text-anchor="middle" font-size="12" fill="#6a1b9a">通用 Mapper</text>
<rect x="580" y="260" width="140" height="40" fill="#c8e6c9" stroke="#66bb6a" stroke-width="1" rx="3"/>
<text x="650" y="285" text-anchor="middle" font-size="12" fill="#2e7d32">P6Spy</text>
<rect x="580" y="310" width="140" height="40" fill="#c8e6c9" stroke="#66bb6a" stroke-width="1" rx="3"/>
<text x="650" y="335" text-anchor="middle" font-size="12" fill="#2e7d32">MBG</text>
<rect x="580" y="360" width="140" height="40" fill="#c8e6c9" stroke="#66bb6a" stroke-width="1" rx="3"/>
<text x="650" y="385" text-anchor="middle" font-size="12" fill="#2e7d32">Dynamic DS</text>
<rect x="80" y="420" width="640" height="40" fill="#ffebee" stroke="#f44336" stroke-width="1" rx="3"/>
<text x="400" y="445" text-anchor="middle" font-size="13" fill="#c62828">监控类：Druid Filter、MyBatis Log Plugin</text>
</svg>

2. **重点插件详解**

**PageHelper（分页插件）⭐⭐⭐⭐⭐**

最流行的 MyBatis 分页插件，支持多种数据库。

```xml
<!-- Maven 依赖 -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.4.6</version>
</dependency>
```

```java
// 使用示例
// 方式1：使用 PageHelper.startPage
PageHelper.startPage(1, 10);
List<User> users = userMapper.selectAll();
PageInfo<User> pageInfo = new PageInfo<>(users);

// 方式2：使用 PageHelper.offsetPage
PageHelper.offsetPage(0, 10);
List<User> users = userMapper.selectAll();
```

**特点：**
- 支持 MySQL、Oracle、PostgreSQL 等多种数据库
- 自动识别数据库方言
- 支持物理分页和逻辑分页
- 线程安全，使用 ThreadLocal 存储分页参数

---

**MyBatis-Plus（增强工具）⭐⭐⭐⭐⭐**

提供强大的 CRUD 操作增强，无需编写 XML。

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.3</version>
</dependency>
```

```java
// Mapper 接口继承 BaseMapper
public interface UserMapper extends BaseMapper<User> {
    // 自动拥有 CRUD 方法
}

// 使用示例
// 1. 基础 CRUD
userMapper.insert(user);
userMapper.selectById(1);
userMapper.updateById(user);
userMapper.deleteById(1);

// 2. 条件构造器
QueryWrapper<User> wrapper = new QueryWrapper<>();
wrapper.eq("status", 1)
       .like("name", "张")
       .orderByDesc("create_time");
List<User> users = userMapper.selectList(wrapper);

// 3. Lambda 方式
LambdaQueryWrapper<User> lambda = new LambdaQueryWrapper<>();
lambda.eq(User::getStatus, 1)
      .like(User::getName, "张");

// 4. 分页查询
Page<User> page = new Page<>(1, 10);
userMapper.selectPage(page, wrapper);
```

**特点：**
- 内置 CRUD 操作，减少代码量
- 强大的条件构造器
- 内置分页插件
- 自动填充、逻辑删除
- 乐观锁插件
- SQL 性能分析

---

**通用 Mapper（tk.mybatis）⭐⭐⭐⭐**

提供通用的 CRUD 操作，简化开发。

```xml
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper-spring-boot-starter</artifactId>
    <version>4.2.1</version>
</dependency>
```

```java
// 继承 Mapper 接口
public interface UserMapper extends Mapper<User> {
}

// 使用示例
userMapper.selectByPrimaryKey(1);
userMapper.selectAll();
userMapper.insert(user);

// 条件查询
Example example = new Example(User.class);
example.createCriteria()
       .andEqualTo("status", 1)
       .andLike("name", "%张%");
List<User> users = userMapper.selectByExample(example);
```

---

**MyBatis Generator（MBG）⭐⭐⭐⭐**

代码生成器，根据数据库表自动生成实体类、Mapper 接口和 XML。

```xml
<dependency>
    <groupId>org.mybatis.generator</groupId>
    <artifactId>mybatis-generator-core</artifactId>
    <version>1.4.1</version>
</dependency>
```

```xml
<!-- generatorConfig.xml -->
<generatorConfiguration>
    <context id="DB2Tables" targetRuntime="MyBatis3">
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                       connectionURL="jdbc:mysql://localhost:3306/db"
                       userId="root"
                       password="password"/>

        <javaModelGenerator targetPackage="com.example.entity"
                           targetProject="src/main/java"/>

        <sqlMapGenerator targetPackage="mapper"
                        targetProject="src/main/resources"/>

        <javaClientGenerator type="XMLMAPPER"
                            targetPackage="com.example.mapper"
                            targetProject="src/main/java"/>

        <table tableName="user" domainObjectName="User"/>
    </context>
</generatorConfiguration>
```

---

**P6Spy（SQL 监控）⭐⭐⭐**

监控和记录所有 JDBC 操作，输出完整 SQL。

```xml
<dependency>
    <groupId>p6spy</groupId>
    <artifactId>p6spy</artifactId>
    <version>3.9.1</version>
</dependency>
```

```properties
# spy.properties
driverlist=com.mysql.cj.jdbc.Driver
logMessageFormat=com.p6spy.engine.spy.appender.CustomLineFormat
customLogMessageFormat=执行时间: %(executionTime)ms | SQL: %(sql)
```

---

**Dynamic Datasource（多数据源）⭐⭐⭐⭐**

动态数据源切换，支持主从、读写分离。

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
    <version>3.6.1</version>
</dependency>
```

```java
// 使用注解切换数据源
@DS("slave")
public List<User> selectUsers() {
    return userMapper.selectAll();
}
```

3. **插件对比**

| 插件 | 主要功能 | 使用难度 | 推荐指数 |
|------|---------|---------|---------|
| PageHelper | 分页 | ⭐ | ⭐⭐⭐⭐⭐ |
| MyBatis-Plus | 增强 CRUD | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 通用 Mapper | 通用 CRUD | ⭐⭐ | ⭐⭐⭐⭐ |
| MBG | 代码生成 | ⭐⭐ | ⭐⭐⭐⭐ |
| P6Spy | SQL 监控 | ⭐ | ⭐⭐⭐ |
| Dynamic DS | 多数据源 | ⭐⭐⭐ | ⭐⭐⭐⭐ |

**关键要点**

1. **PageHelper**：分页必备，简单易用，支持多种数据库
2. **MyBatis-Plus**：功能最强大，推荐新项目使用
3. **通用 Mapper**：适合老项目改造，侵入性小
4. **选择建议**：新项目推荐 MyBatis-Plus，老项目可用 PageHelper + 通用 Mapper
5. **组合使用**：多个插件可以同时使用，但注意配置顺序

**记忆口诀**

"分页用 PageHelper，增强选 Plus，代码生成 MBG，监控有 P6Spy"

### 68. 什么是分页插件 PageHelper？如何使用？

**核心答案**

PageHelper 是 MyBatis 最流行的物理分页插件，通过拦截 Executor 的 query 方法，在 SQL 执行前自动改写 SQL 添加分页语句（如 LIMIT），并在执行后进行 count 查询获取总数。使用时只需在查询前调用 `PageHelper.startPage(pageNum, pageSize)` 即可。

**详细说明**

1. **PageHelper 工作原理**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="490" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">PageHelper 工作原理</text>
<rect x="250" y="90" width="300" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="14" fill="#1976d2">1. 调用 startPage(pageNum, pageSize)</text>
<line x1="400" y1="140" x2="400" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="170" width="300" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="200" text-anchor="middle" font-size="14" fill="#e65100">2. 分页参数存入 ThreadLocal</text>
<line x1="400" y1="220" x2="400" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="250" width="300" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="280" text-anchor="middle" font-size="14" fill="#7b1fa2">3. 执行查询方法</text>
<line x1="400" y1="300" x2="400" y2="330" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="330" width="300" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="360" text-anchor="middle" font-size="14" fill="#2e7d32">4. 拦截器拦截 Executor.query</text>
<line x1="400" y1="380" x2="200" y2="410" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="380" x2="600" y2="410" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="80" y="410" width="240" height="50" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="200" y="440" text-anchor="middle" font-size="13" fill="#f57f17">5a. 改写 SQL 添加 LIMIT</text>
<rect x="480" y="410" width="240" height="50" fill="#ffccbc" stroke="#ff7043" stroke-width="2" rx="5"/>
<text x="600" y="440" text-anchor="middle" font-size="13" fill="#d84315">5b. 执行 COUNT 查询</text>
<line x1="200" y1="460" x2="200" y2="480" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="600" y1="460" x2="600" y2="480" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="480" width="300" height="30" fill="#e1f5fe" stroke="#03a9f4" stroke-width="2" rx="5"/>
<text x="400" y="500" text-anchor="middle" font-size="13" fill="#01579b">6. 返回 Page 对象（含总数）</text>
</svg>

2. **快速开始**

**添加依赖（Spring Boot）：**
```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.4.6</version>
</dependency>
```

**基础使用：**
```java
// 方式1：基础分页
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public PageInfo<User> getUserList(int pageNum, int pageSize) {
        // 1. 设置分页参数（必须紧跟查询）
        PageHelper.startPage(pageNum, pageSize);

        // 2. 执行查询（第一个 SELECT 会被分页）
        List<User> users = userMapper.selectAll();

        // 3. 用 PageInfo 包装结果（包含总数、总页数等）
        PageInfo<User> pageInfo = new PageInfo<>(users);

        return pageInfo;
    }
}
```

**PageInfo 包含的信息：**
```java
pageInfo.getTotal();       // 总记录数
pageInfo.getPages();       // 总页数
pageInfo.getPageNum();     // 当前页码
pageInfo.getPageSize();    // 每页数量
pageInfo.getList();        // 数据列表
pageInfo.isHasPreviousPage(); // 是否有上一页
pageInfo.isHasNextPage();     // 是否有下一页
```

3. **高级用法**

**排序查询：**
```java
// 按字段排序
PageHelper.startPage(1, 10, "create_time desc, id asc");
List<User> users = userMapper.selectAll();

// 或使用 OrderBy
PageHelper.orderBy("create_time desc");
List<User> users = userMapper.selectAll();
```

**合理化分页（页码越界处理）：**
```java
// reasonable=true：pageNum<=0 查第一页，pageNum>pages 查最后一页
PageHelper.startPage(pageNum, pageSize, true);
```

**支持多种参数传递方式：**
```java
// 方式1：startPage
PageHelper.startPage(1, 10);

// 方式2：offsetPage（基于 offset）
PageHelper.offsetPage(0, 10);

// 方式3：使用 Page 对象
Page<User> page = PageHelper.startPage(1, 10);

// 方式4：RowBounds（不推荐，逻辑分页）
List<User> users = userMapper.selectAll(new RowBounds(0, 10));
```

**只查询部分信息：**
```java
// 只需要数据列表，不需要总数
Page<User> page = PageHelper.startPage(1, 10)
                            .setCount(false);
List<User> users = userMapper.selectAll();

// 只需要总数，不需要数据
Page<User> page = PageHelper.startPage(1, 10)
                            .count();
Long total = page.getTotal();
```

4. **配置选项**

**application.yml 配置：**
```yaml
pagehelper:
  # 数据库方言（自动检测）
  helper-dialect: mysql
  # 合理化分页参数
  reasonable: true
  # 支持通过参数传递分页参数
  support-methods-arguments: true
  # 分页参数
  params: count=countSql
  # 自动识别数据库
  auto-runtime-dialect: true
```

**XML 配置方式：**
```xml
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor">
        <property name="helperDialect" value="mysql"/>
        <property name="reasonable" value="true"/>
        <property name="supportMethodsArguments" value="true"/>
    </plugin>
</plugins>
```

5. **多数据库支持**

PageHelper 自动识别数据库方言，支持：

| 数据库 | 分页语法 |
|--------|---------|
| MySQL | `LIMIT #{offset}, #{limit}` |
| Oracle | `ROWNUM` 或 `ROW_NUMBER()` |
| PostgreSQL | `LIMIT #{limit} OFFSET #{offset}` |
| SQL Server | `OFFSET #{offset} ROWS FETCH NEXT #{limit} ROWS ONLY` |
| H2 | `LIMIT #{limit} OFFSET #{offset}` |
| SQLite | `LIMIT #{limit} OFFSET #{offset}` |

6. **使用注意事项**

**避免的错误用法：**
```java
// ❌ 错误：startPage 和查询之间有其他查询
PageHelper.startPage(1, 10);
int count = userMapper.count();  // 这个查询会被分页！
List<User> users = userMapper.selectAll();  // 这个不会分页

// ✅ 正确：startPage 紧跟查询
PageHelper.startPage(1, 10);
List<User> users = userMapper.selectAll();

// ❌ 错误：在循环中使用
for (int i = 0; i < 10; i++) {
    PageHelper.startPage(i, 10);
    userMapper.selectAll();  // 只有第一次生效
}

// ✅ 正确：每次都要设置
for (int i = 0; i < 10; i++) {
    PageHelper.startPage(i, 10);
    List<User> users = userMapper.selectAll();
    // 使用 users
}
```

**ThreadLocal 清理：**
```java
// PageHelper 会自动清理 ThreadLocal
// 但在异步、线程池场景需要手动清理
try {
    PageHelper.startPage(1, 10);
    return userMapper.selectAll();
} finally {
    PageHelper.clearPage();  // 手动清理
}
```

7. **性能优化**

```java
// 1. 不需要 count 查询时关闭
PageHelper.startPage(1, 10, false);

// 2. 大数据量时使用游标
Page<User> page = PageHelper.startPage(1, 10)
                            .setCount(false);  // 关闭 count

// 3. 使用缓存（查询条件相同时）
@Cacheable("users")
public PageInfo<User> getUserList(int pageNum, int pageSize) {
    PageHelper.startPage(pageNum, pageSize);
    List<User> users = userMapper.selectAll();
    return new PageInfo<>(users);
}
```

**关键要点**

1. **使用简单**：只需在查询前调用 startPage，无需修改 SQL
2. **ThreadLocal**：使用 ThreadLocal 存储分页参数，线程安全
3. **自动识别**：自动识别数据库方言，无需手动配置
4. **物理分页**：改写 SQL 实现物理分页，性能好
5. **紧跟原则**：startPage 必须紧跟第一个 SELECT 查询

**记忆口诀**

"查询之前先 startPage，紧跟查询不能乱，PageInfo 包装拿结果，物理分页性能好"
