## 执行流程
### 69. MyBatis 的执行流程是怎样的？

**核心答案**

MyBatis 的执行流程：1) 加载配置文件创建 SqlSessionFactory；2) 通过 SqlSessionFactory 创建 SqlSession；3) SqlSession 获取 Mapper 代理对象；4) 通过 Executor 执行 SQL（经过 StatementHandler、ParameterHandler）；5) 使用 ResultSetHandler 处理结果集；6) 返回结果并关闭 SqlSession。

**详细说明**

1. **完整执行流程图**

<svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="640" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">MyBatis 完整执行流程</text>
<rect x="280" y="90" width="240" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="13" fill="#1976d2">1. 加载 mybatis-config.xml</text>
<line x1="400" y1="140" x2="400" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="160" width="240" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="190" text-anchor="middle" font-size="13" fill="#e65100">2. 创建 SqlSessionFactory</text>
<line x1="400" y1="210" x2="400" y2="230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="230" width="240" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="260" text-anchor="middle" font-size="13" fill="#7b1fa2">3. 创建 SqlSession</text>
<line x1="400" y1="280" x2="400" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="300" width="240" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="330" text-anchor="middle" font-size="13" fill="#2e7d32">4. 获取 Mapper 代理对象</text>
<line x1="400" y1="350" x2="400" y2="370" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="370" width="240" height="50" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="400" y="400" text-anchor="middle" font-size="13" fill="#f57f17">5. 调用 Mapper 方法</text>
<line x1="400" y1="420" x2="400" y2="440" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="440" width="240" height="50" fill="#ffccbc" stroke="#ff7043" stroke-width="2" rx="5"/>
<text x="400" y="470" text-anchor="middle" font-size="13" fill="#d84315">6. Executor 执行</text>
<line x1="400" y1="490" x2="200" y2="520" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="490" x2="600" y2="520" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="520" width="200" height="40" fill="#e1bee7" stroke="#ab47bc" stroke-width="1" rx="3"/>
<text x="200" y="545" text-anchor="middle" font-size="12" fill="#6a1b9a">7a. StatementHandler</text>
<rect x="500" y="520" width="200" height="40" fill="#b2dfdb" stroke="#26a69a" stroke-width="1" rx="3"/>
<text x="600" y="545" text-anchor="middle" font-size="12" fill="#00695c">7b. 缓存处理</text>
<line x1="200" y1="560" x2="200" y2="580" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="580" width="200" height="40" fill="#c8e6c9" stroke="#66bb6a" stroke-width="1" rx="3"/>
<text x="200" y="605" text-anchor="middle" font-size="12" fill="#2e7d32">8. ParameterHandler</text>
<line x1="200" y1="620" x2="400" y2="650" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="600" y1="560" x2="400" y2="650" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<ellipse cx="400" cy="660" rx="80" ry="25" fill="#ffebee" stroke="#f44336" stroke-width="2"/>
<text x="400" y="668" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">执行 SQL</text>
<line x1="400" y1="675" x2="400" y2="695" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="320" y1="685" x2="200" y2="705" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="705" width="200" height="40" fill="#b3e5fc" stroke="#29b6f6" stroke-width="1" rx="3"/>
<text x="200" y="730" text-anchor="middle" font-size="12" fill="#01579b">9. ResultSetHandler</text>
<line x1="300" y1="725" x2="380" y2="725" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="380" y="705" width="200" height="40" fill="#dcedc8" stroke="#9ccc65" stroke-width="1" rx="3"/>
<text x="480" y="730" text-anchor="middle" font-size="12" fill="#33691e">10. 返回结果</text>
</svg>

2. **分阶段详解**

**阶段一：初始化阶段**

```java
// 1. 读取配置文件
InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");

// 2. 创建 SqlSessionFactoryBuilder
SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();

// 3. 解析配置，创建 Configuration 对象
// 4. 构建 SqlSessionFactory（单例）
SqlSessionFactory factory = builder.build(inputStream);
```

**Configuration 对象包含：**
- 数据源配置
- Mapper 映射信息
- 类型处理器
- 插件拦截器
- 缓存配置
- 所有 SQL 语句（MappedStatement）

---

**阶段二：创建 SqlSession**

```java
// 1. 从 SqlSessionFactory 获取 SqlSession
SqlSession sqlSession = factory.openSession();

// 底层实现：
// - 从数据源获取 Connection
// - 创建 Transaction（事务管理器）
// - 创建 Executor（执行器）
// - 应用插件代理 Executor
```

**Executor 类型：**
- **SimpleExecutor**：默认，每次执行创建新的 Statement
- **ReuseExecutor**：重用 Statement
- **BatchExecutor**：批量执行

---

**阶段三：获取 Mapper 代理**

```java
// 1. 获取 Mapper 接口代理对象
UserMapper mapper = sqlSession.getMapper(UserMapper.class);

// 2. 底层使用 JDK 动态代理
// MapperProxyFactory.newInstance() 创建代理对象
```

**代理实现：**
```java
public class MapperProxy<T> implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) {
        // 1. 如果是 Object 方法（toString 等），直接执行
        if (Object.class.equals(method.getDeclaringClass())) {
            return method.invoke(this, args);
        }

        // 2. 获取 MapperMethod（封装了方法信息）
        MapperMethod mapperMethod = cachedMapperMethod(method);

        // 3. 执行 SQL
        return mapperMethod.execute(sqlSession, args);
    }
}
```

---

**阶段四：执行 SQL**

```java
// 1. 调用 Mapper 方法
User user = mapper.getUserById(1);

// 2. 转发到 SqlSession
// sqlSession.selectOne("com.example.UserMapper.getUserById", 1);

// 3. SqlSession 委托给 Executor
executor.query(ms, parameter, rowBounds, handler);
```

**Executor 执行流程：**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="390" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">Executor 执行细节</text>
<rect x="280" y="90" width="240" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="13" fill="#1976d2">1. 检查一级缓存</text>
<line x1="400" y1="140" x2="400" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="170" width="240" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="200" text-anchor="middle" font-size="13" fill="#e65100">2. 创建 StatementHandler</text>
<line x1="400" y1="220" x2="400" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="250" width="240" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="280" text-anchor="middle" font-size="13" fill="#7b1fa2">3. 预编译 SQL (prepare)</text>
<line x1="400" y1="300" x2="400" y2="330" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="330" width="240" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="360" text-anchor="middle" font-size="13" fill="#2e7d32">4. 设置参数 (setParameters)</text>
<line x1="280" y1="355" x2="200" y2="355" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="80" y="330" width="120" height="50" fill="#b3e5fc" stroke="#29b6f6" stroke-width="1" rx="3"/>
<text x="140" y="360" text-anchor="middle" font-size="12" fill="#01579b">Parameter</text>
<text x="140" y="375" text-anchor="middle" font-size="12" fill="#01579b">Handler</text>
<line x1="400" y1="380" x2="400" y2="400" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<ellipse cx="400" cy="410" rx="100" ry="20" fill="#ffebee" stroke="#f44336" stroke-width="2"/>
<text x="400" y="415" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">执行 SQL 查询</text>
<line x1="500" y1="410" x2="600" y2="355" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="600" y="330" width="120" height="50" fill="#dcedc8" stroke="#9ccc65" stroke-width="1" rx="3"/>
<text x="660" y="360" text-anchor="middle" font-size="12" fill="#33691e">ResultSet</text>
<text x="660" y="375" text-anchor="middle" font-size="12" fill="#33691e">Handler</text>
</svg>

**StatementHandler 职责：**
```java
// 1. 预编译 SQL
PreparedStatement stmt = connection.prepareStatement(sql);

// 2. 设置参数（委托给 ParameterHandler）
parameterHandler.setParameters(stmt);

// 3. 执行查询
ResultSet rs = stmt.executeQuery();

// 4. 处理结果（委托给 ResultSetHandler）
List<Object> result = resultSetHandler.handleResultSets(stmt);
```

---

**阶段五：结果映射**

```java
// ResultSetHandler 处理结果集
public class DefaultResultSetHandler {
    public List<Object> handleResultSets(Statement stmt) {
        // 1. 获取 ResultSet
        ResultSet rs = stmt.getResultSet();

        // 2. 根据 resultMap 或 resultType 映射
        while (rs.next()) {
            Object rowValue = createResultObject(rs);
            // 自动映射或手动映射字段
            applyAutomaticMappings(rs, rowValue);
            applyPropertyMappings(rs, rowValue);
            results.add(rowValue);
        }

        return results;
    }
}
```

3. **核心组件关系**

| 组件 | 职责 | 生命周期 |
|------|------|---------|
| SqlSessionFactory | 创建 SqlSession | 应用级别（单例） |
| SqlSession | 执行 SQL、管理事务 | 请求/方法级别 |
| Executor | 执行器，调度 SQL 执行 | SqlSession 级别 |
| StatementHandler | JDBC Statement 处理 | 方法级别 |
| ParameterHandler | 参数设置 | 方法级别 |
| ResultSetHandler | 结果集映射 | 方法级别 |

4. **代码示例**

```java
// 完整使用示例
public class MyBatisExample {
    public static void main(String[] args) {
        SqlSession sqlSession = null;
        try {
            // 1. 获取 SqlSession
            sqlSession = SqlSessionFactoryUtil.openSession();

            // 2. 获取 Mapper
            UserMapper mapper = sqlSession.getMapper(UserMapper.class);

            // 3. 执行查询
            User user = mapper.getUserById(1);

            // 4. 提交事务
            sqlSession.commit();

            System.out.println(user);
        } catch (Exception e) {
            // 5. 回滚事务
            if (sqlSession != null) {
                sqlSession.rollback();
            }
            e.printStackTrace();
        } finally {
            // 6. 关闭 SqlSession
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
    }
}
```

**关键要点**

1. **两阶段**：初始化阶段（创建 SqlSessionFactory）+ 执行阶段（执行 SQL）
2. **三层架构**：SqlSession → Executor → StatementHandler
3. **四大对象**：Executor、StatementHandler、ParameterHandler、ResultSetHandler
4. **动态代理**：Mapper 接口通过 JDK 动态代理实现
5. **缓存机制**：一级缓存在 Executor 中，二级缓存在 Configuration 中

**记忆口诀**

"配置工厂会话开，代理映射方法调，执行器调度四对象，结果映射终返回"

### 70. SqlSessionFactory 的作用是什么？

**核心答案**

SqlSessionFactory 是 MyBatis 的核心工厂类，负责创建 SqlSession 实例。它包含了 MyBatis 的所有配置信息（Configuration 对象），是应用级别的单例对象，线程安全。主要作用是：管理数据源和事务、创建 SqlSession、维护配置信息。

**详细说明**

1. **SqlSessionFactory 在架构中的位置**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="440" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">SqlSessionFactory 架构位置</text>
<rect x="100" y="90" width="600" height="80" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="115" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">应用层</text>
<text x="130" y="140" font-size="12" fill="#424242">• Service 层</text>
<text x="130" y="160" font-size="12" fill="#424242">• Controller 层</text>
<line x1="400" y1="170" x2="400" y2="200" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="200" width="300" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="3" rx="5"/>
<text x="400" y="225" text-anchor="middle" font-size="15" font-weight="bold" fill="#e65100">SqlSessionFactory</text>
<text x="400" y="245" text-anchor="middle" font-size="11" fill="#e65100">（单例、线程安全）</text>
<line x1="400" y1="260" x2="400" y2="290" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="290" width="240" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="320" text-anchor="middle" font-size="13" fill="#7b1fa2">SqlSession (多例)</text>
<line x1="350" y1="340" x2="200" y2="380" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="340" x2="600" y2="380" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="120" y="380" width="160" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="200" y="410" text-anchor="middle" font-size="13" fill="#2e7d32">Executor</text>
<rect x="520" y="380" width="160" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="600" y="410" text-anchor="middle" font-size="13" fill="#c62828">数据库连接</text>
</svg>

2. **主要作用**

**1. 创建 SqlSession**

SqlSessionFactory 最核心的功能是创建 SqlSession。

```java
// 创建 SqlSession 的多种方式
public interface SqlSessionFactory {

    // 1. 默认配置（自动提交=false）
    SqlSession openSession();

    // 2. 指定是否自动提交
    SqlSession openSession(boolean autoCommit);

    // 3. 指定 Connection
    SqlSession openSession(Connection connection);

    // 4. 指定事务隔离级别
    SqlSession openSession(TransactionIsolationLevel level);

    // 5. 指定 Executor 类型
    SqlSession openSession(ExecutorType execType);

    // 6. 组合配置
    SqlSession openSession(ExecutorType execType, boolean autoCommit);
}
```

**ExecutorType 类型：**
- **SIMPLE**：默认，每次执行创建新的 PreparedStatement
- **REUSE**：重用 PreparedStatement
- **BATCH**：批量执行，用于批量更新

---

**2. 管理 Configuration**

SqlSessionFactory 持有 Configuration 对象，包含所有配置信息。

```java
public class DefaultSqlSessionFactory implements SqlSessionFactory {
    private final Configuration configuration;

    public DefaultSqlSessionFactory(Configuration configuration) {
        this.configuration = configuration;
    }

    public Configuration getConfiguration() {
        return configuration;
    }
}
```

**Configuration 包含：**
- 环境配置（数据源、事务管理器）
- Mapper 注册信息
- TypeHandler 类型处理器
- 插件拦截器
- 缓存配置
- 所有 MappedStatement（SQL 映射）

---

**3. 维护数据源和事务管理器**

```java
public SqlSession openSession() {
    // 1. 从 Environment 获取数据源和事务工厂
    Environment environment = configuration.getEnvironment();
    TransactionFactory txFactory = environment.getTransactionFactory();

    // 2. 创建事务对象
    Transaction tx = txFactory.newTransaction(
        environment.getDataSource(),
        level,
        autoCommit
    );

    // 3. 创建 Executor
    Executor executor = configuration.newExecutor(tx, execType);

    // 4. 创建 SqlSession
    return new DefaultSqlSession(configuration, executor, autoCommit);
}
```

3. **创建方式**

**使用 SqlSessionFactoryBuilder（传统方式）：**

```java
public class SqlSessionFactoryUtil {

    private static SqlSessionFactory sqlSessionFactory;

    static {
        try {
            // 1. 读取配置文件
            InputStream inputStream = Resources.getResourceAsStream(
                "mybatis-config.xml"
            );

            // 2. 创建 SqlSessionFactoryBuilder
            SqlSessionFactoryBuilder builder =
                new SqlSessionFactoryBuilder();

            // 3. 构建 SqlSessionFactory（单例）
            sqlSessionFactory = builder.build(inputStream);

        } catch (IOException e) {
            throw new RuntimeException("初始化 SqlSessionFactory 失败", e);
        }
    }

    // 获取 SqlSession
    public static SqlSession openSession() {
        return sqlSessionFactory.openSession();
    }

    // 获取自动提交的 SqlSession
    public static SqlSession openSession(boolean autoCommit) {
        return sqlSessionFactory.openSession(autoCommit);
    }
}
```

**使用 Spring 集成（推荐）：**

```java
@Configuration
public class MyBatisConfig {

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource)
            throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();

        // 设置数据源
        factoryBean.setDataSource(dataSource);

        // 设置配置文件位置
        factoryBean.setConfigLocation(
            new ClassPathResource("mybatis-config.xml")
        );

        // 设置 Mapper 文件位置
        factoryBean.setMapperLocations(
            new PathMatchingResourcePatternResolver()
                .getResources("classpath:mapper/*.xml")
        );

        return factoryBean.getObject();
    }
}
```

**Spring Boot 自动配置：**

```yaml
# application.yml
mybatis:
  config-location: classpath:mybatis-config.xml
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.example.entity
  configuration:
    map-underscore-to-camel-case: true
```

```java
// Spring Boot 自动创建 SqlSessionFactory
@Autowired
private SqlSessionFactory sqlSessionFactory;
```

4. **与 SqlSession 的关系**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="340" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">SqlSessionFactory vs SqlSession</text>
<rect x="100" y="100" width="250" height="240" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="225" y="130" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976d2">SqlSessionFactory</text>
<text x="120" y="160" font-size="12" fill="#424242">• 应用级别（单例）</text>
<text x="120" y="185" font-size="12" fill="#424242">• 线程安全</text>
<text x="120" y="210" font-size="12" fill="#424242">• 包含 Configuration</text>
<text x="120" y="235" font-size="12" fill="#424242">• 创建 SqlSession</text>
<text x="120" y="260" font-size="12" fill="#424242">• 管理数据源</text>
<text x="120" y="285" font-size="12" fill="#424242">• 生命周期：整个应用</text>
<text x="120" y="310" font-size="12" fill="#424242">• 创建方式：Builder</text>
<rect x="450" y="100" width="250" height="240" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="575" y="130" text-anchor="middle" font-size="15" font-weight="bold" fill="#e65100">SqlSession</text>
<text x="470" y="160" font-size="12" fill="#424242">• 请求/方法级别（多例）</text>
<text x="470" y="185" font-size="12" fill="#424242">• 线程不安全</text>
<text x="470" y="210" font-size="12" fill="#424242">• 执行 SQL 操作</text>
<text x="470" y="235" font-size="12" fill="#424242">• 管理事务</text>
<text x="470" y="260" font-size="12" fill="#424242">• 管理一级缓存</text>
<text x="470" y="285" font-size="12" fill="#424242">• 生命周期：一次请求</text>
<text x="470" y="310" font-size="12" fill="#424242">• 创建方式：Factory</text>
<line x1="350" y1="220" x2="450" y2="220" stroke="#666" stroke-width="3" marker-end="url(#arrowhead)"/>
<text x="400" y="210" text-anchor="middle" font-size="12" fill="#666">创建</text>
</svg>

5. **最佳实践**

**1. 单例模式**
```java
// ✅ 正确：使用单例
public class MyBatisUtil {
    private static final SqlSessionFactory factory = buildFactory();

    public static SqlSession openSession() {
        return factory.openSession();
    }
}

// ❌ 错误：每次创建新的 Factory
public SqlSession getSession() {
    SqlSessionFactory factory = new SqlSessionFactoryBuilder()
        .build(inputStream);  // 错误！
    return factory.openSession();
}
```

**2. SqlSession 使用完必须关闭**
```java
// ✅ 正确：使用 try-with-resources
try (SqlSession session = factory.openSession()) {
    UserMapper mapper = session.getMapper(UserMapper.class);
    return mapper.getUserById(id);
}

// ❌ 错误：不关闭 SqlSession
SqlSession session = factory.openSession();
UserMapper mapper = session.getMapper(UserMapper.class);
return mapper.getUserById(id);  // 连接泄露！
```

**3. Spring 集成自动管理**
```java
// Spring 环境下，SqlSession 由 Spring 管理
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;  // Spring 自动注入

    public User getUser(Integer id) {
        return userMapper.getUserById(id);
        // 无需手动关闭，Spring 自动管理
    }
}
```

6. **核心属性对比**

| 特性 | SqlSessionFactory | SqlSession |
|------|------------------|------------|
| 作用域 | 应用级别（单例） | 请求/方法级别 |
| 线程安全 | 是 | 否 |
| 生命周期 | 整个应用运行期间 | 一次请求或方法调用 |
| 主要职责 | 创建 SqlSession | 执行 SQL、管理事务 |
| 是否可共享 | 可以（单例） | 不可以（线程不安全） |
| 关闭时机 | 应用停止时 | 使用完立即关闭 |

**关键要点**

1. **单例模式**：SqlSessionFactory 应该是应用级别的单例
2. **线程安全**：SqlSessionFactory 是线程安全的，可以被多个线程共享
3. **工厂职责**：负责创建 SqlSession，管理配置和数据源
4. **一次构建**：通过 SqlSessionFactoryBuilder 构建，之后重复使用
5. **Spring 集成**：推荐使用 Spring 管理，自动配置和注入

**记忆口诀**

"工厂单例线程安，创建会话管配置，数据源和事务管，Spring 集成更方便"

### 71. SqlSession 的作用是什么？

**核心答案**

SqlSession 是 MyBatis 的**核心接口**，代表和数据库的**一次会话**，提供了执行 SQL、获取 Mapper、管理事务的所有方法。就像 JDBC 中的 Connection，但功能更强大。

**详细说明**

**1. SqlSession 的核心职责**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="300" y="20" width="200" height="60" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="400" y="55" font-size="18" fill="white" text-anchor="middle" font-weight="bold">SqlSession</text>
<rect x="50" y="150" width="150" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="125" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">SQL 执行</text>
<text x="125" y="200" font-size="12" fill="#666" text-anchor="middle">select()</text>
<text x="125" y="218" font-size="12" fill="#666" text-anchor="middle">insert/update/delete</text>
<rect x="240" y="150" width="150" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="315" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">Mapper 获取</text>
<text x="315" y="200" font-size="12" fill="#666" text-anchor="middle">getMapper()</text>
<text x="315" y="218" font-size="12" fill="#666" text-anchor="middle">动态代理</text>
<rect x="430" y="150" width="150" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="505" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">事务管理</text>
<text x="505" y="200" font-size="12" fill="#666" text-anchor="middle">commit()</text>
<text x="505" y="218" font-size="12" fill="#666" text-anchor="middle">rollback()</text>
<rect x="620" y="150" width="150" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="695" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">缓存管理</text>
<text x="695" y="200" font-size="12" fill="#666" text-anchor="middle">clearCache()</text>
<text x="695" y="218" font-size="12" fill="#666" text-anchor="middle">一级缓存</text>
<path d="M 400 80 L 125 150" stroke="#4A90E2" stroke-width="2" fill="none" marker-end="url(#arrowblue)"/>
<path d="M 400 80 L 315 150" stroke="#4A90E2" stroke-width="2" fill="none" marker-end="url(#arrowblue)"/>
<path d="M 400 80 L 505 150" stroke="#4A90E2" stroke-width="2" fill="none" marker-end="url(#arrowblue)"/>
<path d="M 400 80 L 695 150" stroke="#4A90E2" stroke-width="2" fill="none" marker-end="url(#arrowblue)"/>
<rect x="50" y="280" width="720" height="120" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="410" y="305" font-size="14" fill="#E67E22" text-anchor="middle" font-weight="bold">⚠️ 重要特性</text>
<text x="70" y="330" font-size="13" fill="#666" text-anchor="start">• 线程不安全：每个线程应该有自己的 SqlSession 实例</text>
<text x="70" y="355" font-size="13" fill="#666" text-anchor="start">• 会话级别：一次会话一个 SqlSession，用完即关闭</text>
<text x="70" y="380" font-size="13" fill="#666" text-anchor="start">• 自动管理：一级缓存（Session Cache）作用域为 SqlSession 生命周期</text>
<rect x="250" y="430" width="300" height="50" fill="#E8F8E8" stroke="#52C41A" stroke-width="2" rx="5"/>
<text x="400" y="460" font-size="14" fill="#389E0D" text-anchor="middle" font-weight="bold">获取方式：sqlSessionFactory.openSession()</text>
<defs>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**2. SqlSession 的主要方法**

| 方法类别 | 主要方法 | 说明 |
|---------|---------|------|
| **查询操作** | `selectOne()` | 查询单条记录 |
| | `selectList()` | 查询多条记录 |
| | `selectMap()` | 查询结果转为 Map |
| **更新操作** | `insert()` | 插入数据 |
| | `update()` | 更新数据 |
| | `delete()` | 删除数据 |
| **事务操作** | `commit()` | 提交事务 |
| | `rollback()` | 回滚事务 |
| **Mapper 操作** | `getMapper()` | 获取 Mapper 接口代理对象 |
| **缓存操作** | `clearCache()` | 清空一级缓存 |
| **资源管理** | `close()` | 关闭 SqlSession |

**3. SqlSession 的生命周期**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="160" height="80" fill="#52C41A" stroke="#389E0D" stroke-width="2" rx="5"/>
<text x="130" y="85" font-size="14" fill="white" text-anchor="middle" font-weight="bold">1. 创建</text>
<text x="130" y="110" font-size="12" fill="white" text-anchor="middle">openSession()</text>
<rect x="250" y="50" width="160" height="80" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="330" y="85" font-size="14" fill="white" text-anchor="middle" font-weight="bold">2. 使用</text>
<text x="330" y="110" font-size="12" fill="white" text-anchor="middle">执行 SQL/事务</text>
<rect x="450" y="50" width="160" height="80" fill="#FA8C16" stroke="#D46B08" stroke-width="2" rx="5"/>
<text x="530" y="85" font-size="14" fill="white" text-anchor="middle" font-weight="bold">3. 提交/回滚</text>
<text x="530" y="110" font-size="12" fill="white" text-anchor="middle">commit/rollback</text>
<rect x="650" y="50" width="130" height="80" fill="#F5222D" stroke="#CF1322" stroke-width="2" rx="5"/>
<text x="715" y="85" font-size="14" fill="white" text-anchor="middle" font-weight="bold">4. 关闭</text>
<text x="715" y="110" font-size="12" fill="white" text-anchor="middle">close()</text>
<path d="M 210 90 L 250 90" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 410 90 L 450 90" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 610 90 L 650 90" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="50" y="180" width="730" height="180" fill="#F0F0F0" stroke="#999" stroke-width="2" rx="5"/>
<text x="415" y="210" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">典型使用模式（try-with-resources）</text>
<text x="70" y="240" font-size="12" fill="#333" font-family="monospace">try (SqlSession session = sqlSessionFactory.openSession()) {</text>
<text x="90" y="265" font-size="12" fill="#52C41A" font-family="monospace">// 1. 获取 Mapper</text>
<text x="90" y="285" font-size="12" fill="#333" font-family="monospace">UserMapper mapper = session.getMapper(UserMapper.class);</text>
<text x="90" y="305" font-size="12" fill="#52C41A" font-family="monospace">// 2. 执行操作</text>
<text x="90" y="325" font-size="12" fill="#333" font-family="monospace">User user = mapper.selectById(1);</text>
<text x="90" y="345" font-size="12" fill="#52C41A" font-family="monospace">// 3. 自动提交和关闭</text>
<text x="70" y="365" font-size="12" fill="#333" font-family="monospace">}</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
</defs>
</svg>

**4. SqlSession 的两种实现**

| 实现类 | 适用场景 | 特点 |
|-------|---------|------|
| **DefaultSqlSession** | 单独使用 MyBatis | 线程不安全，需手动管理 |
| **SqlSessionTemplate** | Spring 整合 | 线程安全，自动管理事务和生命周期 |

**关键要点**

1. **会话概念**：SqlSession = 一次数据库会话，包含连接、缓存、事务
2. **线程不安全**：不能在多线程间共享，每个线程独立使用
3. **及时关闭**：用完必须关闭，释放数据库连接（建议 try-with-resources）
4. **两种用法**：
   - 直接调用 `session.selectOne()` 等方法
   - 通过 `getMapper()` 获取接口代理对象（推荐）
5. **自动提交**：`openSession()` 默认不自动提交，`openSession(true)` 开启自动提交

**记忆口诀**

```
会话代表一次连 (会话)
SQL 执行全靠它 (执行)
Mapper 获取找代理 (代理)
事务缓存它管理 (管理)
线程不安用完关 (关闭)
```

### 72. Executor 的作用是什么？Executor 有哪些类型？

**核心答案**

Executor 是 MyBatis 的**核心执行器**，负责**真正执行 SQL 语句**、管理缓存和事务。SqlSession 只是门面，实际工作由 Executor 完成。有三种类型：**SimpleExecutor**（简单）、**ReuseExecutor**（复用）、**BatchExecutor**（批量）。

**详细说明**

**1. Executor 在 MyBatis 架构中的位置**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="300" y="20" width="200" height="60" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="400" y="55" font-size="18" fill="white" text-anchor="middle" font-weight="bold">SqlSession (门面)</text>
<path d="M 400 80 L 400 130" stroke="#333" stroke-width="3" marker-end="url(#arrow)"/>
<text x="480" y="110" font-size="13" fill="#999" font-style="italic">委托</text>
<rect x="300" y="130" width="200" height="60" fill="#FA541C" stroke="#D4380D" stroke-width="2" rx="5"/>
<text x="400" y="165" font-size="18" fill="white" text-anchor="middle" font-weight="bold">Executor (执行器)</text>
<path d="M 400 190 L 200 260" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 400 190 L 400 260" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 400 190 L 600 260" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<rect x="80" y="260" width="240" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="200" y="290" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">StatementHandler</text>
<text x="200" y="315" font-size="12" fill="#666" text-anchor="middle">SQL 语句处理</text>
<rect x="360" y="260" width="240" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="480" y="290" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">ParameterHandler</text>
<text x="480" y="315" font-size="12" fill="#666" text-anchor="middle">参数设置</text>
<rect x="640" y="260" width="150" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="715" y="290" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">ResultSetHandler</text>
<text x="715" y="315" font-size="12" fill="#666" text-anchor="middle">结果映射</text>
<rect x="200" y="370" width="400" height="60" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="400" y="395" font-size="14" fill="#E67E22" text-anchor="middle" font-weight="bold">核心职责：SQL 执行调度 + 缓存管理 + 事务控制</text>
<text x="400" y="415" font-size="12" fill="#999" text-anchor="middle">Executor 是 SqlSession 的"大脑"</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**2. Executor 的三种类型**

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<rect x="300" y="20" width="250" height="60" fill="#722ED1" stroke="#531DAB" stroke-width="2" rx="5"/>
<text x="425" y="55" font-size="18" fill="white" text-anchor="middle" font-weight="bold">Executor 三剑客</text>
<rect x="50" y="130" width="220" height="180" fill="#F0F5FF" stroke="#597EF7" stroke-width="2" rx="5"/>
<text x="160" y="160" font-size="16" fill="#1D39C4" text-anchor="middle" font-weight="bold">SimpleExecutor</text>
<text x="160" y="185" font-size="13" fill="#666" text-anchor="middle">(简单执行器)</text>
<line x1="60" y1="195" x2="260" y2="195" stroke="#D9D9D9" stroke-width="1"/>
<text x="70" y="220" font-size="12" fill="#333" text-anchor="start">• 默认类型</text>
<text x="70" y="240" font-size="12" fill="#333" text-anchor="start">• 每次执行创建新</text>
<text x="75" y="255" font-size="12" fill="#666" text-anchor="start">Statement</text>
<text x="70" y="275" font-size="12" fill="#333" text-anchor="start">• 用完立即关闭</text>
<text x="70" y="295" font-size="12" fill="#52C41A" text-anchor="start">✓ 简单可靠</text>
<rect x="315" y="130" width="220" height="180" fill="#FFF7E6" stroke="#FFA940" stroke-width="2" rx="5"/>
<text x="425" y="160" font-size="16" fill="#D46B08" text-anchor="middle" font-weight="bold">ReuseExecutor</text>
<text x="425" y="185" font-size="13" fill="#666" text-anchor="middle">(复用执行器)</text>
<line x1="325" y1="195" x2="525" y2="195" stroke="#D9D9D9" stroke-width="1"/>
<text x="335" y="220" font-size="12" fill="#333" text-anchor="start">• 复用 Statement</text>
<text x="335" y="240" font-size="12" fill="#333" text-anchor="start">• 缓存预编译的</text>
<text x="340" y="255" font-size="12" fill="#666" text-anchor="start">PreparedStatement</text>
<text x="335" y="275" font-size="12" fill="#333" text-anchor="start">• 减少编译次数</text>
<text x="335" y="295" font-size="12" fill="#52C41A" text-anchor="start">✓ 性能提升</text>
<rect x="580" y="130" width="220" height="180" fill="#F6FFED" stroke="#95DE64" stroke-width="2" rx="5"/>
<text x="690" y="160" font-size="16" fill="#389E0D" text-anchor="middle" font-weight="bold">BatchExecutor</text>
<text x="690" y="185" font-size="13" fill="#666" text-anchor="middle">(批量执行器)</text>
<line x1="590" y1="195" x2="790" y2="195" stroke="#D9D9D9" stroke-width="1"/>
<text x="600" y="220" font-size="12" fill="#333" text-anchor="start">• 批量执行 SQL</text>
<text x="600" y="240" font-size="12" fill="#333" text-anchor="start">• 使用 JDBC 批处理</text>
<text x="600" y="260" font-size="12" fill="#333" text-anchor="start">• 适合大量写操作</text>
<text x="600" y="280" font-size="12" fill="#333" text-anchor="start">• 需手动 flush</text>
<text x="600" y="300" font-size="12" fill="#52C41A" text-anchor="start">✓ 批量高效</text>
<path d="M 425 80 L 160 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<path d="M 425 80 L 425 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<path d="M 425 80 L 690 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<rect x="50" y="340" width="750" height="120" fill="#FFF" stroke="#999" stroke-width="2" rx="5"/>
<text x="425" y="370" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">性能对比（执行 1000 次 INSERT）</text>
<rect x="80" y="390" width="180" height="50" fill="#E6F7FF" stroke="#597EF7" stroke-width="1" rx="3"/>
<text x="170" y="415" font-size="12" fill="#1D39C4" text-anchor="middle">Simple: ~1000ms</text>
<text x="170" y="435" font-size="11" fill="#999" text-anchor="middle">1000 次编译</text>
<rect x="290" y="390" width="180" height="50" fill="#FFF7E6" stroke="#FFA940" stroke-width="1" rx="3"/>
<text x="380" y="415" font-size="12" fill="#D46B08" text-anchor="middle">Reuse: ~800ms</text>
<text x="380" y="435" font-size="11" fill="#999" text-anchor="middle">1 次编译</text>
<rect x="500" y="390" width="180" height="50" fill="#F6FFED" stroke="#95DE64" stroke-width="1" rx="3"/>
<text x="590" y="415" font-size="12" fill="#389E0D" text-anchor="middle">Batch: ~200ms</text>
<text x="590" y="435" font-size="11" fill="#999" text-anchor="middle">批量提交</text>
<rect x="150" y="490" width="550" height="140" fill="#F0F0F0" stroke="#999" stroke-width="2" rx="5"/>
<text x="425" y="520" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">配置方式</text>
<text x="170" y="550" font-size="12" fill="#333" font-family="monospace">&lt;setting name="defaultExecutorType" value="SIMPLE"/&gt;</text>
<text x="170" y="575" font-size="12" fill="#52C41A" font-family="monospace">// 或通过代码指定</text>
<text x="170" y="595" font-size="12" fill="#333" font-family="monospace">SqlSession session = factory.openSession(ExecutorType.BATCH);</text>
<text x="170" y="615" font-size="11" fill="#999">可选值：SIMPLE (默认) | REUSE | BATCH</text>
<defs>
<marker id="arrowpurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#722ED1"/>
</marker>
</defs>
</svg>

**3. Executor 的核心职责**

| 职责 | 说明 | 涉及方法 |
|-----|------|---------|
| **SQL 执行** | 调度 StatementHandler 执行 SQL | `query()`, `update()` |
| **缓存管理** | 管理一级缓存（本地缓存） | `createCacheKey()`, `clearLocalCache()` |
| **事务控制** | 协调事务提交和回滚 | `commit()`, `rollback()` |
| **批处理** | 处理批量操作（BatchExecutor） | `flushStatements()` |
| **延迟加载** | 支持关联查询的延迟加载 | `deferLoad()` |

**4. 三种 Executor 的使用场景**

<svg viewBox="0 0 750 400" xmlns="http://www.w3.org/2000/svg">
<text x="375" y="30" font-size="16" fill="#333" text-anchor="middle" font-weight="bold">选择决策树</text>
<rect x="300" y="50" width="150" height="50" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="375" y="80" font-size="14" fill="white" text-anchor="middle">需要批量操作？</text>
<path d="M 325 100 L 200 160" stroke="#52C41A" stroke-width="2" marker-end="url(#arrowgreen)"/>
<text x="250" y="135" font-size="13" fill="#52C41A" font-weight="bold">是</text>
<path d="M 425 100 L 550 160" stroke="#F5222D" stroke-width="2" marker-end="url(#arrowred)"/>
<text x="500" y="135" font-size="13" fill="#F5222D" font-weight="bold">否</text>
<rect x="100" y="160" width="200" height="60" fill="#52C41A" stroke="#389E0D" stroke-width="2" rx="5"/>
<text x="200" y="185" font-size="14" fill="white" text-anchor="middle" font-weight="bold">BatchExecutor</text>
<text x="200" y="205" font-size="12" fill="white" text-anchor="middle">大批量写入/更新</text>
<rect x="450" y="160" width="200" height="50" fill="#FFA940" stroke="#D46B08" stroke-width="2" rx="5"/>
<text x="550" y="190" font-size="14" fill="white" text-anchor="middle">相同 SQL 频繁执行？</text>
<path d="M 500 210 L 450 270" stroke="#52C41A" stroke-width="2" marker-end="url(#arrowgreen)"/>
<text x="465" y="245" font-size="13" fill="#52C41A" font-weight="bold">是</text>
<path d="M 600 210 L 650 270" stroke="#F5222D" stroke-width="2" marker-end="url(#arrowred)"/>
<text x="635" y="245" font-size="13" fill="#F5222D" font-weight="bold">否</text>
<rect x="350" y="270" width="200" height="60" fill="#FFA940" stroke="#D46B08" stroke-width="2" rx="5"/>
<text x="450" y="295" font-size="14" fill="white" text-anchor="middle" font-weight="bold">ReuseExecutor</text>
<text x="450" y="315" font-size="12" fill="white" text-anchor="middle">减少编译开销</text>
<rect x="570" y="270" width="160" height="60" fill="#597EF7" stroke="#1D39C4" stroke-width="2" rx="5"/>
<text x="650" y="295" font-size="14" fill="white" text-anchor="middle" font-weight="bold">SimpleExecutor</text>
<text x="650" y="315" font-size="12" fill="white" text-anchor="middle">默认选择</text>
<rect x="50" y="360" width="650" height="30" fill="#E6F7FF" stroke="#1890FF" stroke-width="1" rx="3"/>
<text x="375" y="380" font-size="12" fill="#096DD9" text-anchor="middle">💡 大多数场景使用 SimpleExecutor 即可，批量操作必选 BatchExecutor</text>
<defs>
<marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#52C41A"/>
</marker>
<marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#F5222D"/>
</marker>
</defs>
</svg>

**5. CachingExecutor 装饰器**

所有 Executor 都可以被 **CachingExecutor** 装饰，用于实现二级缓存：

```
CachingExecutor (二级缓存)
    ↓ 装饰
SimpleExecutor / ReuseExecutor / BatchExecutor
```

- 开启二级缓存后，自动使用 CachingExecutor 包装原始 Executor
- 先查二级缓存，未命中再委托给内部 Executor

**关键要点**

1. **核心作用**：Executor 是 MyBatis 的"发动机"，负责 SQL 执行的全流程
2. **三种类型**：
   - **Simple**：默认，简单直接
   - **Reuse**：复用 Statement，适合重复 SQL
   - **Batch**：批处理，适合大量写操作
3. **性能差异**：Batch > Reuse > Simple（批量场景下）
4. **配置灵活**：全局配置或单次 openSession 时指定
5. **装饰模式**：CachingExecutor 负责二级缓存，透明包装其他 Executor

**记忆口诀**

```
执行核心是 Executor (执行器)
Simple 简单是默认 (默认)
Reuse 复用省编译 (复用)
Batch 批量最高效 (批量)
缓存装饰二级开 (装饰)
```

### 73. StatementHandler 的作用是什么？

**核心答案**

StatementHandler 是 MyBatis 的**语句处理器**，负责**与 JDBC 打交道**，完成 SQL 语句的**准备、参数设置、执行和结果处理**。它是 MyBatis 和 JDBC 之间的桥梁，封装了所有 JDBC Statement 的操作。

**详细说明**

**1. StatementHandler 在执行流程中的位置**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="320" y="20" width="160" height="60" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="400" y="55" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Executor</text>
<path d="M 400 80 L 400 130" stroke="#333" stroke-width="3" marker-end="url(#arrow)"/>
<text x="320" y="110" font-size="13" fill="#999" font-style="italic">委托</text>
<rect x="280" y="130" width="240" height="70" fill="#FA541C" stroke="#D4380D" stroke-width="3" rx="5"/>
<text x="400" y="160" font-size="18" fill="white" text-anchor="middle" font-weight="bold">StatementHandler</text>
<text x="400" y="185" font-size="13" fill="white" text-anchor="middle">SQL 语句处理核心</text>
<rect x="50" y="250" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="150" y="275" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">1. 创建 Statement</text>
<text x="150" y="295" font-size="12" fill="#666" text-anchor="middle">prepare()</text>
<text x="150" y="315" font-size="11" fill="#999" text-anchor="middle">获取 JDBC Connection</text>
<rect x="280" y="250" width="240" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="400" y="275" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">2. 设置参数</text>
<text x="400" y="295" font-size="12" fill="#666" text-anchor="middle">parameterize()</text>
<text x="400" y="315" font-size="11" fill="#999" text-anchor="middle">委托 ParameterHandler</text>
<rect x="550" y="250" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="650" y="275" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">3. 执行 SQL</text>
<text x="650" y="295" font-size="12" fill="#666" text-anchor="middle">query() / update()</text>
<text x="650" y="315" font-size="11" fill="#999" text-anchor="middle">调用 Statement.execute()</text>
<rect x="165" y="370" width="470" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="400" y="395" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">4. 处理结果集</text>
<text x="400" y="415" font-size="12" fill="#666" text-anchor="middle">resultSetHandler.handleResultSets()</text>
<text x="400" y="435" font-size="11" fill="#999" text-anchor="middle">委托 ResultSetHandler 映射结果</text>
<path d="M 400 200 L 150 250" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 400 200 L 400 250" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 400 200 L 650 250" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 300 330 L 400 370" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 600 330 L 400 370" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<text x="250" y="360" font-size="11" fill="#999">查询</text>
<text x="550" y="360" font-size="11" fill="#999">更新</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**2. StatementHandler 的三种实现类型**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="280" y="20" width="240" height="60" fill="#722ED1" stroke="#531DAB" stroke-width="2" rx="5"/>
<text x="400" y="55" font-size="18" fill="white" text-anchor="middle" font-weight="bold">StatementHandler 类型</text>
<rect x="50" y="130" width="200" height="160" fill="#F0F5FF" stroke="#597EF7" stroke-width="2" rx="5"/>
<text x="150" y="160" font-size="15" fill="#1D39C4" text-anchor="middle" font-weight="bold">SimpleStatementHandler</text>
<line x1="60" y1="170" x2="240" y2="170" stroke="#D9D9D9" stroke-width="1"/>
<text x="70" y="195" font-size="12" fill="#333" text-anchor="start">对应 JDBC:</text>
<text x="70" y="215" font-size="12" fill="#666" text-anchor="start" font-weight="bold">Statement</text>
<line x1="60" y1="225" x2="240" y2="225" stroke="#D9D9D9" stroke-width="1"/>
<text x="70" y="245" font-size="12" fill="#333" text-anchor="start">• 无预编译</text>
<text x="70" y="265" font-size="12" fill="#333" text-anchor="start">• SQL 直接拼接</text>
<text x="70" y="280" font-size="11" fill="#F5222D" text-anchor="start">⚠️ SQL 注入风险</text>
<rect x="300" y="130" width="200" height="160" fill="#FFF7E6" stroke="#FFA940" stroke-width="2" rx="5"/>
<text x="400" y="160" font-size="15" fill="#D46B08" text-anchor="middle" font-weight="bold">PreparedStatementHandler</text>
<line x1="310" y1="170" x2="490" y2="170" stroke="#D9D9D9" stroke-width="1"/>
<text x="320" y="195" font-size="12" fill="#333" text-anchor="start">对应 JDBC:</text>
<text x="320" y="215" font-size="12" fill="#666" text-anchor="start" font-weight="bold">PreparedStatement</text>
<line x1="310" y1="225" x2="490" y2="225" stroke="#D9D9D9" stroke-width="1"/>
<text x="320" y="245" font-size="12" fill="#333" text-anchor="start">• 预编译 SQL</text>
<text x="320" y="265" font-size="12" fill="#333" text-anchor="start">• 参数占位符 ?</text>
<text x="320" y="280" font-size="11" fill="#52C41A" text-anchor="start">✓ 默认使用</text>
<rect x="550" y="130" width="200" height="160" fill="#F6FFED" stroke="#95DE64" stroke-width="2" rx="5"/>
<text x="650" y="160" font-size="15" fill="#389E0D" text-anchor="middle" font-weight="bold">CallableStatementHandler</text>
<line x1="560" y1="170" x2="740" y2="170" stroke="#D9D9D9" stroke-width="1"/>
<text x="570" y="195" font-size="12" fill="#333" text-anchor="start">对应 JDBC:</text>
<text x="570" y="215" font-size="12" fill="#666" text-anchor="start" font-weight="bold">CallableStatement</text>
<line x1="560" y1="225" x2="740" y2="225" stroke="#D9D9D9" stroke-width="1"/>
<text x="570" y="245" font-size="12" fill="#333" text-anchor="start">• 调用存储过程</text>
<text x="570" y="265" font-size="12" fill="#333" text-anchor="start">• 支持 OUT 参数</text>
<text x="570" y="280" font-size="11" fill="#1890FF" text-anchor="start">ℹ️ 特殊场景</text>
<path d="M 400 80 L 150 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<path d="M 400 80 L 400 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<path d="M 400 80 L 650 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<rect x="100" y="330" width="600" height="190" fill="#F0F0F0" stroke="#999" stroke-width="2" rx="5"/>
<text x="400" y="360" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">StatementHandler 核心方法</text>
<rect x="130" y="380" width="260" height="120" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="140" y="400" font-size="12" fill="#52C41A" font-family="monospace">// 1. 准备 Statement</text>
<text x="140" y="420" font-size="12" fill="#333" font-family="monospace">Statement prepare(Connection conn);</text>
<text x="140" y="445" font-size="12" fill="#52C41A" font-family="monospace">// 2. 设置参数</text>
<text x="140" y="465" font-size="12" fill="#333" font-family="monospace">void parameterize(Statement stmt);</text>
<text x="140" y="488" font-size="12" fill="#52C41A" font-family="monospace">// 3. 执行查询/更新</text>
<rect x="410" y="380" width="260" height="120" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="420" y="400" font-size="12" fill="#333" font-family="monospace">&lt;E&gt; List&lt;E&gt; query(</text>
<text x="430" y="420" font-size="12" fill="#333" font-family="monospace">Statement stmt,</text>
<text x="430" y="440" font-size="12" fill="#333" font-family="monospace">ResultHandler handler);</text>
<text x="420" y="465" font-size="12" fill="#333" font-family="monospace">int update(Statement stmt);</text>
<defs>
<marker id="arrowpurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#722ED1"/>
</marker>
</defs>
</svg>

**3. StatementHandler 与其他组件的协作**

<svg viewBox="0 0 750 400" xmlns="http://www.w3.org/2000/svg">
<rect x="275" y="20" width="200" height="60" fill="#FA541C" stroke="#D4380D" stroke-width="2" rx="5"/>
<text x="375" y="55" font-size="16" fill="white" text-anchor="middle" font-weight="bold">StatementHandler</text>
<rect x="50" y="150" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="150" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">ParameterHandler</text>
<text x="150" y="205" font-size="12" fill="#666" text-anchor="middle">设置 SQL 参数</text>
<rect x="275" y="150" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="375" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">ResultSetHandler</text>
<text x="375" y="205" font-size="12" fill="#666" text-anchor="middle">处理结果集映射</text>
<rect x="500" y="150" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="600" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">JDBC Statement</text>
<text x="600" y="205" font-size="12" fill="#666" text-anchor="middle">执行 SQL</text>
<path d="M 330 80 L 150 150" stroke="#4A90E2" stroke-width="2" stroke-dasharray="5,5"/>
<text x="230" y="120" font-size="12" fill="#999">调用</text>
<path d="M 420 80 L 375 150" stroke="#4A90E2" stroke-width="2" stroke-dasharray="5,5"/>
<text x="400" y="120" font-size="12" fill="#999">调用</text>
<path d="M 420 80 L 600 150" stroke="#4A90E2" stroke-width="2" stroke-dasharray="5,5"/>
<text x="520" y="120" font-size="12" fill="#999">使用</text>
<rect x="100" y="270" width="550" height="110" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="375" y="300" font-size="14" fill="#E67E22" text-anchor="middle" font-weight="bold">执行流程示例（PreparedStatement）</text>
<text x="120" y="325" font-size="12" fill="#666" text-anchor="start">1. prepare(): 从连接池获取 Connection，创建 PreparedStatement</text>
<text x="120" y="345" font-size="12" fill="#666" text-anchor="start">2. parameterize(): 调用 ParameterHandler 设置参数（ps.setString(1, "张三")）</text>
<text x="120" y="365" font-size="12" fill="#666" text-anchor="start">3. query(): 执行 ps.executeQuery()，获取 ResultSet，委托 ResultSetHandler 处理</text>
</svg>

**4. StatementHandler 的职责清单**

| 职责 | 具体操作 | 说明 |
|-----|---------|------|
| **创建 Statement** | 从 Connection 获取 Statement 对象 | 根据类型创建不同的 Statement |
| **SQL 预编译** | PreparedStatement 编译 SQL | 提高性能，防止 SQL 注入 |
| **参数设置** | 委托 ParameterHandler 设置参数 | 将 Java 对象转为 JDBC 参数 |
| **执行 SQL** | 调用 Statement.execute*() 方法 | query/update/batch 等 |
| **结果映射** | 委托 ResultSetHandler 处理结果集 | 将 ResultSet 转为 Java 对象 |
| **批处理** | addBatch() 和 executeBatch() | 批量执行提高性能 |

**5. RoutingStatementHandler 路由器**

实际使用中，MyBatis 创建的是 **RoutingStatementHandler**，它是一个路由器：

```
RoutingStatementHandler (路由)
    ↓ 根据 statementType 选择
    ├─ SimpleStatementHandler
    ├─ PreparedStatementHandler (默认)
    └─ CallableStatementHandler
```

- 在构造时根据 MappedStatement 的 `statementType` 属性选择实际处理器
- 所有方法调用都委托给内部的实际 StatementHandler

**关键要点**

1. **桥梁作用**：StatementHandler 是 MyBatis 和 JDBC 之间的桥梁
2. **核心流程**：prepare → parameterize → execute → handle results
3. **三种类型**：
   - **Simple**：对应 Statement，无预编译
   - **Prepared**：对应 PreparedStatement，预编译（默认）
   - **Callable**：对应 CallableStatement，存储过程
4. **协作模式**：与 ParameterHandler、ResultSetHandler 紧密配合
5. **路由设计**：RoutingStatementHandler 负责选择具体实现

**记忆口诀**

```
Statement 处理最前线 (前线)
准备参数再执行 (流程)
Simple 直接 Prepared 编译 (类型)
Callable 存储过程用 (特殊)
JDBC 桥梁全靠它 (桥梁)
```

### 74. ParameterHandler 的作用是什么？

**核心答案**

ParameterHandler 是 MyBatis 的**参数处理器**，负责将**用户传入的 Java 参数**转换为**JDBC Statement 可用的参数**。它通过 `setParameters()` 方法将参数按顺序设置到 PreparedStatement 的占位符（`?`）中。

**详细说明**

**1. ParameterHandler 在参数设置流程中的位置**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="100" y="30" width="150" height="60" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="175" y="65" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">用户传入参数</text>
<rect x="100" y="110" width="150" height="40" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="175" y="135" font-size="12" fill="#666" text-anchor="middle">userId = 123</text>
<path d="M 250 60 L 320 60" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="320" y="30" width="180" height="60" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="410" y="65" font-size="14" fill="white" text-anchor="middle" font-weight="bold">StatementHandler</text>
<path d="M 500 60 L 570 60" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<text x="535" y="50" font-size="12" fill="#999">委托</text>
<rect x="570" y="20" width="180" height="80" fill="#FA541C" stroke="#D4380D" stroke-width="3" rx="5"/>
<text x="660" y="55" font-size="18" fill="white" text-anchor="middle" font-weight="bold">ParameterHandler</text>
<text x="660" y="80" font-size="12" fill="white" text-anchor="middle">参数转换核心</text>
<path d="M 660 100 L 660 170" stroke="#52C41A" stroke-width="3" marker-end="url(#arrowgreen)"/>
<text x="690" y="140" font-size="12" fill="#52C41A" font-weight="bold">setParameters()</text>
<rect x="530" y="170" width="260" height="100" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="660" y="195" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">JDBC PreparedStatement</text>
<rect x="550" y="210" width="220" height="50" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="560" y="230" font-size="11" fill="#333" font-family="monospace">ps.setInt(1, 123);</text>
<text x="560" y="248" font-size="11" fill="#333" font-family="monospace">ps.setString(2, "张三");</text>
<rect x="50" y="310" width="700" height="120" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="400" y="340" font-size="14" fill="#E67E22" text-anchor="middle" font-weight="bold">核心职责</text>
<text x="70" y="365" font-size="13" fill="#666" text-anchor="start">1. 获取参数映射信息（ParameterMapping）</text>
<text x="70" y="390" font-size="13" fill="#666" text-anchor="start">2. 根据参数类型调用对应的 TypeHandler</text>
<text x="70" y="415" font-size="13" fill="#666" text-anchor="start">3. 按顺序将参数设置到 PreparedStatement 的 ? 占位符</text>
<rect x="100" y="180" width="380" height="100" fill="#F0F5FF" stroke="#597EF7" stroke-width="2" rx="5"/>
<text x="290" y="205" font-size="13" fill="#1D39C4" text-anchor="middle" font-weight="bold">参数类型转换（TypeHandler）</text>
<text x="120" y="230" font-size="11" fill="#666" text-anchor="start">Integer → setInt()</text>
<text x="120" y="250" font-size="11" fill="#666" text-anchor="start">String → setString()</text>
<text x="120" y="270" font-size="11" fill="#666" text-anchor="start">Date → setTimestamp()</text>
<text x="290" y="230" font-size="11" fill="#666" text-anchor="start">Boolean → setBoolean()</text>
<text x="290" y="250" font-size="11" fill="#666" text-anchor="start">BigDecimal → setBigDecimal()</text>
<text x="290" y="270" font-size="11" fill="#666" text-anchor="start">自定义 → custom handler</text>
<path d="M 480 230 L 530 230" stroke="#4A90E2" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowblue)"/>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
<marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#52C41A"/>
</marker>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**2. ParameterHandler 的工作流程**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" font-size="16" fill="#333" text-anchor="middle" font-weight="bold">参数设置流程（4 步骤）</text>
<rect x="50" y="60" width="180" height="100" fill="#E6F7FF" stroke="#1890FF" stroke-width="2" rx="5"/>
<text x="140" y="90" font-size="14" fill="#096DD9" text-anchor="middle" font-weight="bold">1. 获取参数对象</text>
<text x="70" y="115" font-size="12" fill="#666" text-anchor="start">• 从 BoundSql 中</text>
<text x="75" y="135" font-size="12" fill="#666" text-anchor="start">获取用户传入的</text>
<text x="75" y="150" font-size="12" fill="#666" text-anchor="start">参数对象</text>
<rect x="260" y="60" width="180" height="100" fill="#FFF7E6" stroke="#FFA940" stroke-width="2" rx="5"/>
<text x="350" y="90" font-size="14" fill="#D46B08" text-anchor="middle" font-weight="bold">2. 获取参数映射</text>
<text x="280" y="115" font-size="12" fill="#666" text-anchor="start">• 解析 SQL 中的</text>
<text x="285" y="135" font-size="12" fill="#666" text-anchor="start">#{} 占位符</text>
<text x="280" y="150" font-size="12" fill="#666" text-anchor="start">• ParameterMapping</text>
<rect x="470" y="60" width="180" height="100" fill="#F6FFED" stroke="#52C41A" stroke-width="2" rx="5"/>
<text x="560" y="90" font-size="14" fill="#389E0D" text-anchor="middle" font-weight="bold">3. 遍历设置参数</text>
<text x="490" y="115" font-size="12" fill="#666" text-anchor="start">• for 循环处理</text>
<text x="495" y="135" font-size="12" fill="#666" text-anchor="start">每个参数</text>
<text x="490" y="150" font-size="12" fill="#666" text-anchor="start">• 调用 TypeHandler</text>
<rect x="260" y="190" width="280" height="100" fill="#FFF1F0" stroke="#FF4D4F" stroke-width="2" rx="5"/>
<text x="400" y="220" font-size="14" fill="#CF1322" text-anchor="middle" font-weight="bold">4. 调用 JDBC 方法设置</text>
<text x="280" y="245" font-size="12" fill="#666" text-anchor="start">• ps.setInt(1, value);</text>
<text x="280" y="265" font-size="12" fill="#666" text-anchor="start">• ps.setString(2, value);</text>
<text x="280" y="280" font-size="12" fill="#666" text-anchor="start">• ...</text>
<path d="M 230 110 L 260 110" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 440 110 L 470 110" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 560 160 L 480 190" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 350 160 L 420 190" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="50" y="320" width="700" height="160" fill="#F0F0F0" stroke="#999" stroke-width="2" rx="5"/>
<text x="400" y="350" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">代码示例：ParameterHandler 内部逻辑（简化）</text>
<text x="70" y="375" font-size="11" fill="#333" font-family="monospace">public void setParameters(PreparedStatement ps) {</text>
<text x="90" y="395" font-size="11" fill="#52C41A" font-family="monospace">List&lt;ParameterMapping&gt; mappings = boundSql.getParameterMappings();</text>
<text x="90" y="415" font-size="11" fill="#333" font-family="monospace">for (int i = 0; i &lt; mappings.size(); i++) {</text>
<text x="110" y="435" font-size="11" fill="#1890FF" font-family="monospace">Object value = getValueFromParameter(parameterObject, mapping);</text>
<text x="110" y="455" font-size="11" fill="#FA541C" font-family="monospace">TypeHandler handler = mapping.getTypeHandler();</text>
<text x="110" y="470" font-size="11" fill="#FA541C" font-family="monospace">handler.setParameter(ps, i + 1, value, jdbcType); // 调用 JDBC</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
</defs>
</svg>

**3. 参数映射示例**

| SQL 中的占位符 | 参数对象 | TypeHandler | JDBC 方法 |
|---------------|---------|-------------|----------|
| `#{id}` | `userId = 123` | IntegerTypeHandler | `ps.setInt(1, 123)` |
| `#{name}` | `userName = "张三"` | StringTypeHandler | `ps.setString(2, "张三")` |
| `#{age}` | `userAge = null` | IntegerTypeHandler | `ps.setNull(3, Types.INTEGER)` |
| `#{createTime}` | `date = new Date()` | DateTypeHandler | `ps.setTimestamp(4, timestamp)` |

**4. ParameterHandler 的核心接口**

<svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg">
<rect x="200" y="30" width="300" height="80" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="350" y="60" font-size="16" fill="white" text-anchor="middle" font-weight="bold">ParameterHandler 接口</text>
<text x="350" y="90" font-size="13" fill="white" text-anchor="middle">(只有一个默认实现)</text>
<rect x="50" y="160" width="280" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="190" y="190" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">主要方法</text>
<text x="70" y="215" font-size="12" fill="#333" font-family="monospace">void setParameters(</text>
<text x="80" y="233" font-size="12" fill="#333" font-family="monospace">PreparedStatement ps);</text>
<rect x="370" y="160" width="280" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="510" y="190" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">其他方法</text>
<text x="390" y="215" font-size="12" fill="#333" font-family="monospace">Object getParameterObject();</text>
<text x="390" y="233" font-size="11" fill="#999">// 获取用户参数对象</text>
<path d="M 350 110 L 190 160" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 350 110 L 510 160" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<rect x="100" y="270" width="500" height="60" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="350" y="295" font-size="13" fill="#E67E22" text-anchor="middle" font-weight="bold">默认实现：DefaultParameterHandler</text>
<text x="350" y="315" font-size="12" fill="#666" text-anchor="middle">MyBatis 内置唯一实现，处理所有参数设置逻辑</text>
<defs>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**5. 与 TypeHandler 的关系**

<svg viewBox="0 0 750 350" xmlns="http://www.w3.org/2000/svg">
<rect x="250" y="30" width="250" height="60" fill="#FA541C" stroke="#D4380D" stroke-width="2" rx="5"/>
<text x="375" y="65" font-size="16" fill="white" text-anchor="middle" font-weight="bold">ParameterHandler</text>
<text x="375" y="125" font-size="13" fill="#999" font-style="italic">委托给</text>
<rect x="100" y="150" width="550" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="375" y="180" font-size="15" fill="#2E5C8A" text-anchor="middle" font-weight="bold">TypeHandler（类型处理器）</text>
<text x="120" y="210" font-size="12" fill="#666" text-anchor="start">IntegerTypeHandler | StringTypeHandler | DateTypeHandler | BooleanTypeHandler | ...</text>
<path d="M 375 90 L 375 150" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="50" y="270" width="650" height="60" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="375" y="295" font-size="13" fill="#E67E22" text-anchor="middle" font-weight="bold">⚠️ 关键理解</text>
<text x="375" y="315" font-size="12" fill="#666" text-anchor="middle">ParameterHandler 负责"调度"，TypeHandler 负责"执行"具体的类型转换</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
</defs>
</svg>

**关键要点**

1. **核心作用**：将 Java 参数转换为 JDBC PreparedStatement 可用的参数
2. **工作流程**：
   - 获取参数对象 → 解析参数映射 → 遍历设置 → 调用 JDBC 方法
3. **与 TypeHandler 配合**：
   - ParameterHandler：调度者，决定"哪个参数"、"哪个位置"
   - TypeHandler：执行者，决定"如何转换"
4. **处理特殊情况**：
   - null 值处理：`ps.setNull(index, jdbcType)`
   - 自定义类型：通过自定义 TypeHandler 扩展
5. **唯一实现**：DefaultParameterHandler 是 MyBatis 内置唯一实现

**记忆口诀**

```
参数转换找 Handler (作用)
Java 对象变 JDBC (转换)
TypeHandler 来帮忙 (协作)
顺序设置占位符 (流程)
PreparedStatement 调用它 (目标)
```

### 75. ResultSetHandler 的作用是什么？

**核心答案**

ResultSetHandler 是 MyBatis 的**结果集处理器**，负责将 **JDBC ResultSet（查询结果）**映射成 **Java 对象**。它是 MyBatis ORM 功能的核心，实现了从关系型数据到对象模型的转换。

**详细说明**

**1. ResultSetHandler 在查询流程中的位置**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="100" y="30" width="180" height="60" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="190" y="65" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">StatementHandler</text>
<path d="M 280 60 L 350 60" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<text x="315" y="50" font-size="12" fill="#999">执行</text>
<rect x="350" y="30" width="180" height="60" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="440" y="65" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">JDBC Statement</text>
<path d="M 440 90 L 440 150" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<text x="470" y="125" font-size="12" fill="#999">返回</text>
<rect x="340" y="150" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="440" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">JDBC ResultSet</text>
<rect x="355" y="200" width="170" height="20" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="365" y="214" font-size="10" fill="#666" font-family="monospace">id | name | age</text>
<path d="M 440 230 L 440 290" stroke="#52C41A" stroke-width="3" marker-end="url(#arrowgreen)"/>
<text x="470" y="265" font-size="13" fill="#52C41A" font-weight="bold">映射转换</text>
<rect x="300" y="290" width="280" height="80" fill="#FA541C" stroke="#D4380D" stroke-width="3" rx="5"/>
<text x="440" y="320" font-size="18" fill="white" text-anchor="middle" font-weight="bold">ResultSetHandler</text>
<text x="440" y="345" font-size="13" fill="white" text-anchor="middle">handleResultSets()</text>
<path d="M 440 370 L 440 430" stroke="#52C41A" stroke-width="3" marker-end="url(#arrowgreen)"/>
<rect x="320" y="430" width="240" height="60" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="440" y="455" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">Java 对象（List&lt;User&gt;）</text>
<text x="440" y="475" font-size="11" fill="#666" text-anchor="middle">User(id=1, name="张三", age=25)</text>
<rect x="50" y="160" width="250" height="120" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="175" y="190" font-size="13" fill="#E67E22" text-anchor="middle" font-weight="bold">核心职责</text>
<text x="70" y="215" font-size="12" fill="#666" text-anchor="start">1. 遍历 ResultSet 行</text>
<text x="70" y="235" font-size="12" fill="#666" text-anchor="start">2. 读取列值</text>
<text x="70" y="255" font-size="12" fill="#666" text-anchor="start">3. 类型转换（TypeHandler）</text>
<text x="70" y="270" font-size="12" fill="#666" text-anchor="start">4. 对象映射（反射/构造器）</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
<marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#52C41A"/>
</marker>
</defs>
</svg>

**2. ResultSetHandler 的映射流程**

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" font-size="16" fill="#333" text-anchor="middle" font-weight="bold">结果集映射流程（5 步骤）</text>
<rect x="50" y="60" width="160" height="90" fill="#E6F7FF" stroke="#1890FF" stroke-width="2" rx="5"/>
<text x="130" y="90" font-size="14" fill="#096DD9" text-anchor="middle" font-weight="bold">1. 遍历行</text>
<text x="70" y="115" font-size="11" fill="#666" text-anchor="start">while (rs.next()) {</text>
<text x="75" y="130" font-size="11" fill="#666" text-anchor="start">// 处理每一行</text>
<text x="70" y="145" font-size="11" fill="#666" text-anchor="start">}</text>
<rect x="240" y="60" width="160" height="90" fill="#FFF7E6" stroke="#FFA940" stroke-width="2" rx="5"/>
<text x="320" y="90" font-size="14" fill="#D46B08" text-anchor="middle" font-weight="bold">2. 读取列值</text>
<text x="260" y="115" font-size="11" fill="#666" text-anchor="start">rs.getInt("id")</text>
<text x="260" y="130" font-size="11" fill="#666" text-anchor="start">rs.getString("name")</text>
<text x="260" y="145" font-size="11" fill="#666" text-anchor="start">rs.getInt("age")</text>
<rect x="430" y="60" width="160" height="90" fill="#F6FFED" stroke="#52C41A" stroke-width="2" rx="5"/>
<text x="510" y="90" font-size="14" fill="#389E0D" text-anchor="middle" font-weight="bold">3. 类型转换</text>
<text x="450" y="115" font-size="11" fill="#666" text-anchor="start">TypeHandler</text>
<text x="450" y="130" font-size="11" fill="#666" text-anchor="start">getResult(rs,</text>
<text x="455" y="145" font-size="11" fill="#666" text-anchor="start">"columnName")</text>
<rect x="620" y="60" width="180" height="90" fill="#FFF1F0" stroke="#FF4D4F" stroke-width="2" rx="5"/>
<text x="710" y="90" font-size="14" fill="#CF1322" text-anchor="middle" font-weight="bold">4. 创建对象</text>
<text x="640" y="115" font-size="11" fill="#666" text-anchor="start">反射创建实例</text>
<text x="640" y="130" font-size="11" fill="#666" text-anchor="start">user = new User();</text>
<text x="640" y="145" font-size="11" fill="#666" text-anchor="start">或构造器初始化</text>
<rect x="290" y="180" width="270" height="90" fill="#F0F5FF" stroke="#597EF7" stroke-width="2" rx="5"/>
<text x="425" y="210" font-size="14" fill="#1D39C4" text-anchor="middle" font-weight="bold">5. 属性赋值</text>
<text x="310" y="235" font-size="11" fill="#666" text-anchor="start">user.setId(id);</text>
<text x="310" y="250" font-size="11" fill="#666" text-anchor="start">user.setName(name);</text>
<text x="310" y="265" font-size="11" fill="#666" text-anchor="start">user.setAge(age);</text>
<path d="M 210 105 L 240 105" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 400 105 L 430 105" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 590 105 L 620 105" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 710 150 L 500 180" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 320 150 L 380 180" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="50" y="310" width="750" height="220" fill="#F0F0F0" stroke="#999" stroke-width="2" rx="5"/>
<text x="425" y="340" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">映射策略（根据 resultType 或 resultMap）</text>
<rect x="80" y="360" width="320" height="150" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="240" y="385" font-size="13" fill="#1890FF" text-anchor="middle" font-weight="bold">resultType（简单映射）</text>
<text x="100" y="410" font-size="11" fill="#666" text-anchor="start">• 自动映射：列名 = 属性名</text>
<text x="100" y="430" font-size="11" fill="#666" text-anchor="start">• 驼峰转换：user_name → userName</text>
<text x="100" y="450" font-size="11" fill="#666" text-anchor="start">• 适合简单 POJO</text>
<text x="100" y="470" font-size="11" fill="#333" font-family="monospace">&lt;select resultType="User"&gt;</text>
<text x="105" y="490" font-size="11" fill="#333" font-family="monospace">SELECT * FROM user</text>
<rect x="440" y="360" width="340" height="150" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="610" y="385" font-size="13" fill="#FA541C" text-anchor="middle" font-weight="bold">resultMap（复杂映射）</text>
<text x="460" y="410" font-size="11" fill="#666" text-anchor="start">• 自定义映射规则</text>
<text x="460" y="430" font-size="11" fill="#666" text-anchor="start">• 处理嵌套对象（association/collection）</text>
<text x="460" y="450" font-size="11" fill="#666" text-anchor="start">• 适合复杂关联查询</text>
<text x="460" y="470" font-size="11" fill="#333" font-family="monospace">&lt;resultMap id="userMap"&gt;</text>
<text x="465" y="490" font-size="11" fill="#333" font-family="monospace">&lt;id column="id" property="userId"/&gt;</text>
<text x="465" y="505" font-size="11" fill="#333" font-family="monospace">&lt;result column="name".../&gt;</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
</defs>
</svg>

**3. ResultSetHandler 的核心接口**

<svg viewBox="0 0 750 350" xmlns="http://www.w3.org/2000/svg">
<rect x="200" y="30" width="350" height="80" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="375" y="60" font-size="16" fill="white" text-anchor="middle" font-weight="bold">ResultSetHandler 接口</text>
<text x="375" y="90" font-size="13" fill="white" text-anchor="middle">(唯一实现：DefaultResultSetHandler)</text>
<rect x="100" y="160" width="250" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="225" y="190" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">主要方法</text>
<text x="120" y="215" font-size="11" fill="#333" font-family="monospace">&lt;E&gt; List&lt;E&gt; handleResultSets(</text>
<text x="125" y="235" font-size="11" fill="#333" font-family="monospace">Statement stmt);</text>
<rect x="390" y="160" width="280" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="530" y="190" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">其他方法</text>
<text x="410" y="215" font-size="11" fill="#333" font-family="monospace">void handleOutputParameters(</text>
<text x="415" y="235" font-size="11" fill="#333" font-family="monospace">CallableStatement cs);</text>
<text x="410" y="250" font-size="10" fill="#999">// 处理存储过程 OUT 参数</text>
<path d="M 375 110 L 225 160" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 375 110 L 530 160" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<rect x="100" y="270" width="550" height="60" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="375" y="295" font-size="13" fill="#E67E22" text-anchor="middle" font-weight="bold">核心实现：DefaultResultSetHandler</text>
<text x="375" y="315" font-size="12" fill="#666" text-anchor="middle">处理简单映射、嵌套查询、嵌套结果映射、延迟加载等所有场景</text>
<defs>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**4. ResultSetHandler 处理的场景**

| 场景 | 说明 | 示例 |
|-----|------|------|
| **简单类型映射** | 基本类型、String、Date 等 | `Integer count = selectOne()` |
| **POJO 映射** | JavaBean 对象 | `User user = selectOne()` |
| **Map 映射** | 键值对 | `Map<String, Object> map` |
| **集合映射** | List、Set 等 | `List<User> users` |
| **嵌套对象** | association（一对一） | User → Department |
| **嵌套集合** | collection（一对多） | Department → List<User> |
| **多结果集** | 存储过程返回多个 ResultSet | 同时处理多个查询结果 |
| **延迟加载** | 按需加载关联对象 | 访问时才查询关联数据 |

**5. 与 TypeHandler 的关系**

<svg viewBox="0 0 750 300" xmlns="http://www.w3.org/2000/svg">
<rect x="250" y="30" width="250" height="60" fill="#FA541C" stroke="#D4380D" stroke-width="2" rx="5"/>
<text x="375" y="65" font-size="16" fill="white" text-anchor="middle" font-weight="bold">ResultSetHandler</text>
<text x="375" y="125" font-size="13" fill="#999" font-style="italic">委托给</text>
<rect x="100" y="150" width="550" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="375" y="180" font-size="15" fill="#2E5C8A" text-anchor="middle" font-weight="bold">TypeHandler（类型处理器）</text>
<text x="120" y="210" font-size="12" fill="#666" text-anchor="start">getResult(ResultSet rs, String columnName) → 读取列值并转换为 Java 类型</text>
<path d="M 375 90 L 375 150" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="50" y="260" width="650" height="30" fill="#E6F7FF" stroke="#1890FF" stroke-width="1" rx="3"/>
<text x="375" y="280" font-size="12" fill="#096DD9" text-anchor="middle">💡 ResultSetHandler 读取列 → TypeHandler 转换类型 → 对象属性赋值</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
</defs>
</svg>

**关键要点**

1. **核心作用**：将 JDBC ResultSet 转换为 Java 对象（ORM 的核心）
2. **映射策略**：
   - **resultType**：简单自动映射，适合单表查询
   - **resultMap**：复杂自定义映射，适合关联查询
3. **处理流程**：
   - 遍历行 → 读取列 → 类型转换 → 创建对象 → 属性赋值
4. **与 TypeHandler 配合**：
   - ResultSetHandler：调度者，负责整体映射流程
   - TypeHandler：执行者，负责具体列值的类型转换
5. **支持复杂场景**：嵌套对象、嵌套集合、延迟加载、多结果集

**记忆口诀**

```
结果映射 ResultSetHandler (作用)
ResultSet 变 Java 对象 (转换)
TypeHandler 列转换 (协作)
resultMap 复杂映射 (策略)
ORM 核心全靠它 (地位)
```
