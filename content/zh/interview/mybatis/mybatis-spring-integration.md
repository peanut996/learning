## Spring 整合

### 81. MyBatis 如何与 Spring 整合？

**核心答案**

MyBatis 通过 **mybatis-spring** 整合包与 Spring 集成，主要通过 `SqlSessionFactoryBean` 创建 SqlSessionFactory、使用 `SqlSessionTemplate` 管理 SqlSession、通过 `MapperScannerConfigurer` 自动扫描 Mapper 接口，并将其注册为 Spring Bean，实现事务由 Spring 统一管理。

**详细说明**

**1. 整合架构图**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:12px monospace;fill:#0066cc}.small{font:11px sans-serif;fill:#666}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">MyBatis-Spring 整合架构</text>
<rect x="50" y="60" width="700" height="420" fill="#f5f5f5" stroke="#9e9e9e" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" class="label">Spring 容器</text>
<rect x="100" y="110" width="250" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="225" y="135" text-anchor="middle" class="label">数据源配置</text>
<text x="120" y="160" class="code">DataSource</text>
<text x="120" y="180" class="small">数据库连接池</text>
<rect x="450" y="110" width="250" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="575" y="135" text-anchor="middle" class="label">MyBatis 配置</text>
<text x="470" y="160" class="code">mybatis-config.xml</text>
<text x="470" y="180" class="small">类型别名、插件等</text>
<rect x="225" y="220" width="350" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="245" text-anchor="middle" class="label">SqlSessionFactoryBean</text>
<text x="245" y="270" class="code">创建 SqlSessionFactory</text>
<text x="245" y="290" class="small">整合核心组件</text>
<rect x="100" y="330" width="250" height="80" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="225" y="355" text-anchor="middle" class="label">SqlSessionTemplate</text>
<text x="120" y="380" class="code">线程安全的 SqlSession</text>
<text x="120" y="400" class="small">自动提交/事务管理</text>
<rect x="450" y="330" width="250" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="575" y="355" text-anchor="middle" class="label">MapperScannerConfigurer</text>
<text x="470" y="380" class="code">扫描并注册 Mapper</text>
<text x="470" y="400" class="small">动态代理 Bean</text>
<rect x="225" y="430" width="350" height="40" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="455" text-anchor="middle" class="label">Mapper 接口 (Spring Bean)</text>
<path d="M 225 190 L 350 220" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 575 190 L 450 220" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 400 300 L 225 330" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 400 300 L 575 330" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 225 410 L 350 430" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 575 410 L 450 430" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs>
</svg>

**2. 整合步骤**

**步骤 1: 添加依赖**

```xml
<!-- MyBatis 核心包 -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.13</version>
</dependency>

<!-- MyBatis-Spring 整合包 -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>3.0.3</version>
</dependency>

<!-- Spring JDBC (事务管理) -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>6.0.11</version>
</dependency>
```

**步骤 2: 配置数据源**

```xml
<!-- applicationContext.xml -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx">

    <!-- 配置数据源 -->
    <bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/test"/>
        <property name="username" value="root"/>
        <property name="password" value="password"/>
    </bean>
</beans>
```

**步骤 3: 配置 SqlSessionFactory**

```xml
<!-- 配置 SqlSessionFactoryBean -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <!-- 注入数据源 -->
    <property name="dataSource" ref="dataSource"/>

    <!-- 指定 MyBatis 配置文件位置 -->
    <property name="configLocation" value="classpath:mybatis-config.xml"/>

    <!-- 指定 Mapper XML 文件位置 -->
    <property name="mapperLocations" value="classpath:mapper/*.xml"/>

    <!-- 配置类型别名包 -->
    <property name="typeAliasesPackage" value="com.example.entity"/>
</bean>
```

**步骤 4: 配置 SqlSessionTemplate**

```xml
<!-- 配置 SqlSessionTemplate (可选) -->
<bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
    <constructor-arg ref="sqlSessionFactory"/>
</bean>
```

**步骤 5: 配置 Mapper 扫描**

```xml
<!-- 方式 1: 使用 MapperScannerConfigurer -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="com.example.mapper"/>
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
</bean>

<!-- 方式 2: 使用 @MapperScan 注解 (Java 配置) -->
```

**步骤 6: 配置事务管理器**

```xml
<!-- 配置事务管理器 -->
<bean id="transactionManager"
      class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>

<!-- 开启注解事务 -->
<tx:annotation-driven transaction-manager="transactionManager"/>
```

**3. Java 配置方式**

```java
@Configuration
@MapperScan("com.example.mapper")  // 扫描 Mapper 接口
@EnableTransactionManagement       // 开启事务管理
public class MyBatisConfig {

    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setUsername("root");
        dataSource.setPassword("password");
        return dataSource;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);

        // 设置 MyBatis 配置
        org.apache.ibatis.session.Configuration configuration =
            new org.apache.ibatis.session.Configuration();
        configuration.setMapUnderscoreToCamelCase(true);
        factoryBean.setConfiguration(configuration);

        // 设置 Mapper XML 位置
        factoryBean.setMapperLocations(
            new PathMatchingResourcePatternResolver()
                .getResources("classpath:mapper/*.xml"));

        return factoryBean.getObject();
    }

    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
```

**4. 使用 Mapper**

```java
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;  // 自动注入 Mapper

    @Transactional  // Spring 事务管理
    public void saveUser(User user) {
        userMapper.insert(user);
    }

    public User getUserById(Long id) {
        return userMapper.selectById(id);
    }
}
```

**5. 整合的核心组件**

| 组件 | 作用 | 说明 |
|------|------|------|
| **SqlSessionFactoryBean** | 创建 SqlSessionFactory | Spring 工厂 Bean，整合核心 |
| **SqlSessionTemplate** | 线程安全的 SqlSession | 替代原生 SqlSession |
| **MapperScannerConfigurer** | 扫描并注册 Mapper | 自动创建 Mapper 代理 Bean |
| **DataSourceTransactionManager** | 事务管理器 | 统一管理事务 |

**6. 整合的优势**

1. **统一事务管理**: 由 Spring 管理事务，支持声明式事务
2. **自动资源管理**: SqlSession 自动关闭，无需手动管理
3. **依赖注入**: Mapper 作为 Spring Bean，直接注入使用
4. **线程安全**: SqlSessionTemplate 保证线程安全
5. **配置集中**: 数据源、事务等统一在 Spring 中配置

**关键要点**

1. **核心依赖**: mybatis + mybatis-spring + spring-jdbc
2. **三大组件**: SqlSessionFactoryBean、SqlSessionTemplate、MapperScannerConfigurer
3. **事务管理**: 使用 Spring 的 DataSourceTransactionManager
4. **Mapper 注入**: 通过 @Autowired 直接注入 Mapper 接口
5. **配置方式**: 支持 XML 配置和 Java 配置两种方式

**记忆口诀**

```
MyBatis 整合 Spring，三大组件要记清
FactoryBean 造工厂，Template 管会话
MapperScanner 扫接口，注册 Bean 到容器
事务交给 Spring 管，@Transactional 加方法
配置集中好维护，依赖注入更优雅
```
### 82. 什么是 SqlSessionTemplate？

**核心答案**

`SqlSessionTemplate` 是 MyBatis-Spring 提供的线程安全的 SqlSession 实现，用于替代原生的 SqlSession。它是 Spring 管理的 Bean，可以直接注入使用，自动处理 SqlSession 的打开、关闭、提交、回滚，并与 Spring 的事务管理器集成。

**详细说明**

**1. SqlSessionTemplate 的作用**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:12px monospace;fill:#0066cc}.small{font:11px sans-serif;fill:#666}.highlight{font:bold 13px sans-serif;fill:#d32f2f}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">SqlSessionTemplate vs 原生 SqlSession</text>
<rect x="50" y="60" width="300" height="300" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="200" y="85" text-anchor="middle" class="label">原生 SqlSession</text>
<text x="70" y="120" class="code">SqlSession session =</text>
<text x="70" y="140" class="code">  factory.openSession();</text>
<text x="70" y="165" class="code">try {</text>
<text x="70" y="185" class="code">  user = mapper.selectById(1);</text>
<text x="70" y="205" class="code">  session.commit();</text>
<text x="70" y="225" class="code">} catch(Exception e) {</text>
<text x="70" y="245" class="code">  session.rollback();</text>
<text x="70" y="265" class="code">} finally {</text>
<text x="70" y="285" class="code">  session.close();</text>
<text x="70" y="305" class="code">}</text>
<text x="200" y="340" text-anchor="middle" class="highlight">✗ 需要手动管理</text>
<rect x="450" y="60" width="300" height="300" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="600" y="85" text-anchor="middle" class="label">SqlSessionTemplate</text>
<text x="470" y="120" class="code">@Autowired</text>
<text x="470" y="140" class="code">SqlSessionTemplate template;</text>
<text x="470" y="180" class="code">// 直接使用，无需关闭</text>
<text x="470" y="200" class="code">User user =</text>
<text x="470" y="220" class="code">  template.selectOne(</text>
<text x="470" y="240" class="code">    "selectById", 1);</text>
<text x="470" y="280" class="code">// 自动管理生命周期</text>
<text x="470" y="300" class="code">// 事务由 Spring 控制</text>
<text x="600" y="340" text-anchor="middle" class="highlight">✓ 自动管理</text>
</svg>

**2. 核心特性**

**线程安全**
- SqlSessionTemplate 是线程安全的
- 可以被多个 DAO 或 Mapper 共享
- 内部使用 ThreadLocal 保证每个线程独立的 SqlSession

**自动资源管理**
- 自动打开和关闭 SqlSession
- 无需手动调用 close() 方法
- 异常时自动回滚

**Spring 事务集成**
- 参与 Spring 管理的事务
- 支持声明式事务 @Transactional
- 自动提交或回滚

**3. 配置方式**

**XML 配置**

```xml
<!-- 配置 SqlSessionTemplate -->
<bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
    <constructor-arg index="0" ref="sqlSessionFactory"/>
</bean>

<!-- 可选：指定执行器类型 -->
<bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
    <constructor-arg index="0" ref="sqlSessionFactory"/>
    <constructor-arg index="1" value="BATCH"/>
    <!-- SIMPLE, REUSE, BATCH -->
</bean>
```

**Java 配置**

```java
@Configuration
public class MyBatisConfig {

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(
            SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

    // 批量执行器版本
    @Bean
    public SqlSessionTemplate batchSqlSessionTemplate(
            SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(
            sqlSessionFactory,
            ExecutorType.BATCH
        );
    }
}
```

**4. 使用方式**

**方式 1: 直接注入使用**

```java
@Repository
public class UserDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public User selectById(Long id) {
        return sqlSessionTemplate.selectOne(
            "com.example.mapper.UserMapper.selectById",
            id
        );
    }

    public List<User> selectAll() {
        return sqlSessionTemplate.selectList(
            "com.example.mapper.UserMapper.selectAll"
        );
    }

    public int insert(User user) {
        return sqlSessionTemplate.insert(
            "com.example.mapper.UserMapper.insert",
            user
        );
    }

    public int update(User user) {
        return sqlSessionTemplate.update(
            "com.example.mapper.UserMapper.update",
            user
        );
    }

    public int delete(Long id) {
        return sqlSessionTemplate.delete(
            "com.example.mapper.UserMapper.delete",
            id
        );
    }
}
```

**方式 2: 继承 SqlSessionDaoSupport（已过时）**

```java
@Repository
public class UserDao extends SqlSessionDaoSupport {

    @Autowired
    public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
        super.setSqlSessionFactory(sqlSessionFactory);
    }

    public User selectById(Long id) {
        // 通过 getSqlSession() 获取 SqlSessionTemplate
        return getSqlSession().selectOne(
            "com.example.mapper.UserMapper.selectById",
            id
        );
    }
}
```

**方式 3: 获取 Mapper（推荐）**

```java
@Service
public class UserService {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public User getUserById(Long id) {
        // 通过 SqlSessionTemplate 获取 Mapper
        UserMapper mapper = sqlSessionTemplate.getMapper(UserMapper.class);
        return mapper.selectById(id);
    }
}
```

**5. 内部实现原理**

```java
public class SqlSessionTemplate implements SqlSession {

    private final SqlSessionFactory sqlSessionFactory;
    private final ExecutorType executorType;
    private final SqlSessionProxy sqlSessionProxy;

    public SqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        this(sqlSessionFactory, sqlSessionFactory.getConfiguration()
            .getDefaultExecutorType());
    }

    public SqlSessionTemplate(
            SqlSessionFactory sqlSessionFactory,
            ExecutorType executorType) {
        this.sqlSessionFactory = sqlSessionFactory;
        this.executorType = executorType;

        // 创建动态代理，拦截所有方法调用
        this.sqlSessionProxy = (SqlSessionProxy) Proxy.newProxyInstance(
            SqlSessionFactory.class.getClassLoader(),
            new Class[] { SqlSession.class },
            new SqlSessionInterceptor()  // 核心拦截器
        );
    }

    // SqlSessionInterceptor 负责管理 SqlSession 生命周期
    private class SqlSessionInterceptor implements InvocationHandler {
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) {
            // 获取与当前 Spring 事务绑定的 SqlSession
            SqlSession sqlSession = getSqlSession(
                SqlSessionTemplate.this.sqlSessionFactory,
                SqlSessionTemplate.this.executorType,
                SqlSessionTemplate.this.exceptionTranslator
            );

            try {
                // 执行实际的数据库操作
                Object result = method.invoke(sqlSession, args);

                // 如果不在 Spring 事务中，自动提交
                if (!isSqlSessionTransactional(sqlSession)) {
                    sqlSession.commit(true);
                }

                return result;
            } catch (Throwable t) {
                // 异常处理和转换
                throw unwrapThrowable(t);
            } finally {
                // 关闭 SqlSession（如果不在事务中）
                closeSqlSession(sqlSession);
            }
        }
    }
}
```

**6. 与 Spring 事务的集成**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:11px monospace;fill:#0066cc}.step{font:12px sans-serif;fill:#1976d2}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">SqlSessionTemplate 事务流程</text>
<rect x="50" y="60" width="180" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="95" text-anchor="middle" class="label">@Transactional</text>
<rect x="50" y="150" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="140" y="185" text-anchor="middle" class="label">Spring 开启事务</text>
<rect x="50" y="240" width="180" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="140" y="275" text-anchor="middle" class="label">获取 SqlSession</text>
<rect x="310" y="60" width="180" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="400" y="95" text-anchor="middle" class="label">绑定到事务</text>
<rect x="310" y="150" width="180" height="60" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="400" y="185" text-anchor="middle" class="label">执行 SQL</text>
<rect x="310" y="240" width="180" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="275" text-anchor="middle" class="label">Spring 提交/回滚</text>
<rect x="570" y="150" width="180" height="60" fill="#e0f2f1" stroke="#00695c" stroke-width="2" rx="5"/>
<text x="660" y="185" text-anchor="middle" class="label">关闭 SqlSession</text>
<path d="M 140 120 L 140 150" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 140 210 L 140 240" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 230 270 L 310 270" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 400 120 L 400 150" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 400 210 L 400 240" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 490 180 L 570 180" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker></defs>
<text x="140" y="140" text-anchor="middle" class="step">1</text>
<text x="140" y="230" text-anchor="middle" class="step">2</text>
<text x="270" y="265" text-anchor="middle" class="step">3</text>
<text x="400" y="50" text-anchor="middle" class="step">4</text>
<text x="400" y="230" text-anchor="middle" class="step">5</text>
<text x="530" y="175" text-anchor="middle" class="step">6</text>
</svg>

**7. 主要方法**

| 方法 | 说明 |
|------|------|
| `selectOne(String, Object)` | 查询单个对象 |
| `selectList(String, Object)` | 查询列表 |
| `selectMap(String, String)` | 查询 Map |
| `insert(String, Object)` | 插入数据 |
| `update(String, Object)` | 更新数据 |
| `delete(String, Object)` | 删除数据 |
| `commit()` | 提交事务（通常由 Spring 管理） |
| `rollback()` | 回滚事务（通常由 Spring 管理） |
| `getMapper(Class<T>)` | 获取 Mapper 接口 |

**关键要点**

1. **线程安全**: 可以被多个线程并发访问，内部使用动态代理
2. **自动管理**: 无需手动关闭 SqlSession，自动处理资源
3. **事务集成**: 与 Spring 事务无缝集成，支持 @Transactional
4. **执行器类型**: 支持 SIMPLE、REUSE、BATCH 三种执行器
5. **替代方案**: 现在更推荐直接使用 @MapperScan + @Autowired Mapper

**记忆口诀**

```
SqlSessionTemplate 线程安全，Spring 整合核心组件
自动管理生命周期，无需手动关闭会话
参与 Spring 事务管理，@Transactional 控制
动态代理拦截调用，获取绑定 SqlSession
提交回滚由 Spring 管，异常处理更优雅
```
### 83. 什么是 MapperScannerConfigurer？

**核心答案**

`MapperScannerConfigurer` 是 MyBatis-Spring 提供的一个 BeanDefinitionRegistryPostProcessor，用于自动扫描指定包下的 Mapper 接口，并将它们注册为 Spring 的 Bean（MapperFactoryBean），使得 Mapper 接口可以通过 @Autowired 注入使用。

**详细说明**

**1. MapperScannerConfigurer 的作用**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:11px monospace;fill:#0066cc}.small{font:10px sans-serif;fill:#666}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">MapperScannerConfigurer 工作流程</text>
<rect x="50" y="60" width="200" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="85" text-anchor="middle" class="label">扫描目标包</text>
<text x="70" y="110" class="code">com.example.mapper</text>
<text x="70" y="130" class="code">├─ UserMapper.java</text>
<text x="70" y="145" class="code">├─ OrderMapper.java</text>
<rect x="300" y="60" width="200" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" class="label">识别 Mapper 接口</text>
<text x="320" y="110" class="code">interface UserMapper {</text>
<text x="320" y="130" class="code">  User selectById(Long id);</text>
<text x="320" y="145" class="code">}</text>
<rect x="550" y="60" width="200" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="650" y="85" text-anchor="middle" class="label">创建动态代理</text>
<text x="570" y="110" class="code">MapperFactoryBean</text>
<text x="570" y="130" class="code">  ↓</text>
<text x="570" y="145" class="code">MapperProxy</text>
<rect x="175" y="200" width="450" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="400" y="225" text-anchor="middle" class="label">注册到 Spring 容器</text>
<text x="195" y="250" class="code">beanName: userMapper</text>
<text x="195" y="270" class="code">beanClass: MapperFactoryBean&lt;UserMapper&gt;</text>
<rect x="175" y="310" width="450" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="335" text-anchor="middle" class="label">依赖注入使用</text>
<text x="195" y="360" class="code">@Autowired</text>
<text x="195" y="380" class="code">private UserMapper userMapper;</text>
<path d="M 150 160 L 300 110" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 500 110 L 550 110" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 650 160 L 500 200" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 400 280 L 400 310" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker></defs>
<text x="220" y="135" text-anchor="middle" class="small">1. 扫描</text>
<text x="525" y="100" text-anchor="middle" class="small">2. 识别</text>
<text x="575" y="180" text-anchor="middle" class="small">3. 创建</text>
<text x="400" y="300" text-anchor="middle" class="small">4. 注册</text>
<rect x="50" y="410" width="700" height="30" fill="#ffebee" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="400" y="430" text-anchor="middle" class="code">核心：将 Mapper 接口自动注册为 Spring Bean</text>
</svg>

**2. 配置方式**

**方式 1: XML 配置**

```xml
<!-- 基本配置 -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <!-- 指定扫描的包 -->
    <property name="basePackage" value="com.example.mapper"/>

    <!-- 指定 SqlSessionFactory（可选） -->
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
</bean>

<!-- 高级配置 -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <!-- 扫描多个包，用逗号或分号分隔 -->
    <property name="basePackage"
              value="com.example.mapper,com.example.dao"/>

    <!-- 指定 SqlSessionTemplate（与 sqlSessionFactory 二选一） -->
    <property name="sqlSessionTemplateBeanName" value="sqlSessionTemplate"/>

    <!-- 指定标注了特定注解的接口才扫描 -->
    <property name="annotationClass" value="org.apache.ibatis.annotations.Mapper"/>

    <!-- 指定实现了特定接口的才扫描 -->
    <property name="markerInterface" value="com.example.BaseMapper"/>

    <!-- 指定 Mapper Bean 的命名策略 -->
    <property name="nameGenerator" ref="beanNameGenerator"/>
</bean>
```

**方式 2: Java 配置（使用 @MapperScan）**

```java
@Configuration
@MapperScan(
    basePackages = "com.example.mapper",        // 扫描的包
    sqlSessionFactoryRef = "sqlSessionFactory", // SqlSessionFactory Bean 名称
    annotationClass = Mapper.class,             // 指定注解
    markerInterface = BaseMapper.class          // 指定父接口
)
public class MyBatisConfig {
    // 配置其他 Bean
}

// 扫描多个包
@Configuration
@MapperScan(basePackages = {"com.example.mapper", "com.example.dao"})
public class MyBatisConfig {
    // ...
}
```

**3. 核心属性**

| 属性 | 类型 | 说明 | 必填 |
|------|------|------|------|
| **basePackage** | String | 要扫描的包路径，多个用逗号分隔 | ✓ |
| **sqlSessionFactoryBeanName** | String | SqlSessionFactory Bean 名称 | ✗ |
| **sqlSessionTemplateBeanName** | String | SqlSessionTemplate Bean 名称 | ✗ |
| **annotationClass** | Class | 只扫描标注了指定注解的接口 | ✗ |
| **markerInterface** | Class | 只扫描继承了指定接口的接口 | ✗ |
| **nameGenerator** | BeanNameGenerator | Bean 命名策略 | ✗ |

**4. 工作原理**

```java
public class MapperScannerConfigurer
    implements BeanDefinitionRegistryPostProcessor, BeanFactoryAware {

    private String basePackage;
    private String sqlSessionFactoryBeanName;

    @Override
    public void postProcessBeanDefinitionRegistry(
            BeanDefinitionRegistry registry) {

        // 创建 ClassPathMapperScanner 扫描器
        ClassPathMapperScanner scanner =
            new ClassPathMapperScanner(registry);

        // 设置过滤器（注解、父接口等）
        if (annotationClass != null) {
            scanner.setAnnotationClass(annotationClass);
        }
        if (markerInterface != null) {
            scanner.setMarkerInterface(markerInterface);
        }

        // 设置 SqlSessionFactory
        scanner.setSqlSessionFactoryBeanName(
            this.sqlSessionFactoryBeanName);

        // 注册过滤器（只扫描接口）
        scanner.registerFilters();

        // 执行扫描并注册 BeanDefinition
        scanner.scan(
            StringUtils.tokenizeToStringArray(
                this.basePackage,
                ConfigurableApplicationContext.CONFIG_LOCATION_DELIMITERS
            )
        );
    }
}

// ClassPathMapperScanner 核心逻辑
public class ClassPathMapperScanner extends ClassPathBeanDefinitionScanner {

    @Override
    protected Set<BeanDefinitionHolder> doScan(String... basePackages) {
        // 扫描指定包下的所有接口
        Set<BeanDefinitionHolder> beanDefinitions = super.doScan(basePackages);

        if (beanDefinitions.isEmpty()) {
            logger.warn("No MyBatis mapper was found in '"
                + Arrays.toString(basePackages) + "' package.");
        } else {
            // 处理扫描到的每个 Mapper 接口
            processBeanDefinitions(beanDefinitions);
        }

        return beanDefinitions;
    }

    private void processBeanDefinitions(Set<BeanDefinitionHolder> holders) {
        for (BeanDefinitionHolder holder : holders) {
            GenericBeanDefinition definition =
                (GenericBeanDefinition) holder.getBeanDefinition();

            // 获取 Mapper 接口的全限定名
            String beanClassName = definition.getBeanClassName();

            // 将 BeanClass 修改为 MapperFactoryBean
            definition.setBeanClass(MapperFactoryBean.class);

            // 将 Mapper 接口作为构造函数参数
            definition.getConstructorArgumentValues()
                .addGenericArgumentValue(beanClassName);

            // 设置 SqlSessionFactory 属性
            definition.getPropertyValues()
                .add("sqlSessionFactory",
                    new RuntimeBeanReference(
                        this.sqlSessionFactoryBeanName));

            // 设置自动装配模式
            definition.setAutowireMode(
                AbstractBeanDefinition.AUTOWIRE_BY_TYPE);
        }
    }
}
```

**5. 过滤规则示例**

**只扫描带 @Mapper 注解的接口**

```java
@Configuration
@MapperScan(
    basePackages = "com.example.mapper",
    annotationClass = Mapper.class
)
public class MyBatisConfig {
    // 只有标注了 @Mapper 的接口才会被扫描
}

// Mapper 接口
@Mapper
public interface UserMapper {
    User selectById(Long id);
}
```

**只扫描继承特定接口的 Mapper**

```java
// 定义基础 Mapper 接口
public interface BaseMapper<T> {
    int insert(T entity);
    int update(T entity);
    int delete(Long id);
}

@Configuration
@MapperScan(
    basePackages = "com.example.mapper",
    markerInterface = BaseMapper.class
)
public class MyBatisConfig {
    // 只有继承 BaseMapper 的接口才会被扫描
}

// 具体 Mapper 接口
public interface UserMapper extends BaseMapper<User> {
    User selectById(Long id);
}
```

**6. 与 @MapperScan 的关系**

`@MapperScan` 是对 `MapperScannerConfigurer` 的封装，底层仍然使用 MapperScannerConfigurer：

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Import(MapperScannerRegistrar.class)  // 导入注册器
public @interface MapperScan {
    String[] basePackages() default {};
    String sqlSessionFactoryRef() default "";
    Class<? extends Annotation> annotationClass() default Annotation.class;
    // ...
}

// MapperScannerRegistrar 内部创建 MapperScannerConfigurer
class MapperScannerRegistrar implements ImportBeanDefinitionRegistrar {
    @Override
    public void registerBeanDefinitions(
            AnnotationMetadata metadata,
            BeanDefinitionRegistry registry) {

        AnnotationAttributes attrs = AnnotationAttributes.fromMap(
            metadata.getAnnotationAttributes(MapperScan.class.getName()));

        // 创建 MapperScannerConfigurer 的 BeanDefinition
        BeanDefinitionBuilder builder =
            BeanDefinitionBuilder.genericBeanDefinition(
                MapperScannerConfigurer.class);

        builder.addPropertyValue("basePackage",
            StringUtils.collectionToCommaDelimitedString(
                attrs.getStringArray("basePackages")));

        // 注册到容器
        registry.registerBeanDefinition(
            beanName, builder.getBeanDefinition());
    }
}
```

**7. MapperFactoryBean 的作用**

MapperScannerConfigurer 扫描后，每个 Mapper 接口都会被包装为 MapperFactoryBean：

```java
public class MapperFactoryBean<T> implements FactoryBean<T> {

    private Class<T> mapperInterface;
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public T getObject() throws Exception {
        // 通过 SqlSession 获取 Mapper 代理对象
        return getSqlSession().getMapper(this.mapperInterface);
    }

    @Override
    public Class<T> getObjectType() {
        return this.mapperInterface;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
```

**关键要点**

1. **自动扫描**: 无需手动配置每个 Mapper Bean，自动扫描注册
2. **包路径配置**: 支持扫描多个包，用逗号或分号分隔
3. **过滤机制**: 支持按注解、父接口过滤需要扫描的接口
4. **Bean 名称**: 默认使用接口名首字母小写作为 Bean 名称
5. **推荐使用 @MapperScan**: Java 配置方式更简洁，与 @Configuration 配合使用

**记忆口诀**

```
MapperScannerConfigurer 扫描器，自动注册 Mapper 接口
指定包路径 basePackage，多包扫描逗号隔
SqlSessionFactory 要注入，可用 Bean 名来引用
annotationClass 按注解过滤，markerInterface 按接口
扫描后创建 FactoryBean，动态代理注入容器
@MapperScan 更简洁，Java 配置推荐用
```
### 84. MyBatis-Spring 的工作原理是什么？

**核心答案**

MyBatis-Spring 的工作原理是通过 **SqlSessionFactoryBean** 创建 SqlSessionFactory，使用 **SqlSessionTemplate** 提供线程安全的 SqlSession，通过 **MapperScannerConfigurer** 扫描 Mapper 接口并创建动态代理对象注册为 Spring Bean，最后利用 Spring 的事务管理器统一管理事务，实现 MyBatis 与 Spring 的无缝整合。

**详细说明**

**1. 整体架构流程**

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:11px monospace;fill:#0066cc}.small{font:10px sans-serif;fill:#666}.step{font:bold 14px sans-serif;fill:#fff}</style></defs>
<text x="425" y="30" text-anchor="middle" class="title">MyBatis-Spring 工作原理</text>
<rect x="50" y="60" width="750" height="520" fill="#f5f5f5" stroke="#757575" stroke-width="2" rx="5"/>
<text x="425" y="85" text-anchor="middle" class="label">Spring 容器启动</text>
<circle cx="150" cy="140" r="40" fill="#1976d2" stroke="#0d47a1" stroke-width="2"/>
<text x="150" y="148" text-anchor="middle" class="step">1</text>
<text x="150" y="195" text-anchor="middle" class="label">SqlSessionFactoryBean</text>
<text x="150" y="210" text-anchor="middle" class="small">创建 SqlSessionFactory</text>
<circle cx="425" cy="140" r="40" fill="#388e3c" stroke="#1b5e20" stroke-width="2"/>
<text x="425" y="148" text-anchor="middle" class="step">2</text>
<text x="425" y="195" text-anchor="middle" class="label">MapperScannerConfigurer</text>
<text x="425" y="210" text-anchor="middle" class="small">扫描 Mapper 接口</text>
<circle cx="700" cy="140" r="40" fill="#f57c00" stroke="#e65100" stroke-width="2"/>
<text x="700" y="148" text-anchor="middle" class="step">3</text>
<text x="700" y="195" text-anchor="middle" class="label">MapperFactoryBean</text>
<text x="700" y="210" text-anchor="middle" class="small">创建 Mapper 代理</text>
<rect x="275" y="250" width="300" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="425" y="275" text-anchor="middle" class="label">Service 层注入 Mapper</text>
<text x="295" y="300" class="code">@Autowired</text>
<text x="295" y="320" class="code">private UserMapper userMapper;</text>
<circle cx="150" cy="390" r="40" fill="#7b1fa2" stroke="#4a148c" stroke-width="2"/>
<text x="150" y="398" text-anchor="middle" class="step">4</text>
<text x="150" y="445" text-anchor="middle" class="label">调用 Mapper 方法</text>
<text x="150" y="460" text-anchor="middle" class="small">userMapper.selectById(1)</text>
<circle cx="425" cy="390" r="40" fill="#c62828" stroke="#b71c1c" stroke-width="2"/>
<text x="425" y="398" text-anchor="middle" class="step">5</text>
<text x="425" y="445" text-anchor="middle" class="label">SqlSessionTemplate</text>
<text x="425" y="460" text-anchor="middle" class="small">获取 SqlSession</text>
<circle cx="700" cy="390" r="40" fill="#00695c" stroke="#004d40" stroke-width="2"/>
<text x="700" y="398" text-anchor="middle" class="step">6</text>
<text x="700" y="445" text-anchor="middle" class="label">执行 SQL</text>
<text x="700" y="460" text-anchor="middle" class="small">查询数据库</text>
<rect x="275" y="500" width="300" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="425" y="525" text-anchor="middle" class="label">Spring 事务管理</text>
<text x="295" y="545" class="code">提交/回滚事务，关闭 SqlSession</text>
<path d="M 190 140 L 385 140" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 465 140 L 660 140" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 575 210 L 425 250" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 275 330 L 190 390" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 190 390 L 385 390" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 465 390 L 660 390" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 575 460 L 425 500" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs>
</svg>

**2. 核心组件及工作流程**

**阶段 1: 容器启动阶段**

**SqlSessionFactoryBean 初始化**

```java
public class SqlSessionFactoryBean implements FactoryBean<SqlSessionFactory>,
        InitializingBean {

    private DataSource dataSource;
    private Resource configLocation;
    private Resource[] mapperLocations;

    @Override
    public void afterPropertiesSet() throws Exception {
        // 创建 SqlSessionFactory
        this.sqlSessionFactory = buildSqlSessionFactory();
    }

    protected SqlSessionFactory buildSqlSessionFactory() throws Exception {
        // 1. 创建 Configuration 对象
        Configuration configuration = new Configuration();

        // 2. 加载 mybatis-config.xml
        if (this.configLocation != null) {
            XMLConfigBuilder xmlConfigBuilder =
                new XMLConfigBuilder(this.configLocation.getInputStream());
            configuration = xmlConfigBuilder.parse();
        }

        // 3. 设置数据源（关键：与 Spring 集成）
        Environment environment = new Environment(
            "development",
            new SpringManagedTransactionFactory(),  // Spring 事务工厂
            this.dataSource
        );
        configuration.setEnvironment(environment);

        // 4. 解析 Mapper XML 文件
        if (this.mapperLocations != null) {
            for (Resource mapperLocation : this.mapperLocations) {
                XMLMapperBuilder xmlMapperBuilder =
                    new XMLMapperBuilder(mapperLocation.getInputStream(),
                        configuration, mapperLocation.toString());
                xmlMapperBuilder.parse();
            }
        }

        // 5. 构建 SqlSessionFactory
        return new SqlSessionFactoryBuilder().build(configuration);
    }

    @Override
    public SqlSessionFactory getObject() {
        return this.sqlSessionFactory;
    }
}
```

**MapperScannerConfigurer 扫描注册**

```java
public class MapperScannerConfigurer
        implements BeanDefinitionRegistryPostProcessor {

    @Override
    public void postProcessBeanDefinitionRegistry(
            BeanDefinitionRegistry registry) {

        // 1. 创建 Mapper 扫描器
        ClassPathMapperScanner scanner =
            new ClassPathMapperScanner(registry);

        // 2. 扫描指定包下的所有接口
        scanner.scan(basePackage);

        // 3. 为每个 Mapper 接口创建 MapperFactoryBean
        // 将 BeanClass 设置为 MapperFactoryBean
        // 将 Mapper 接口类型作为构造参数
    }
}
```

**阶段 2: Mapper 代理创建**

**MapperFactoryBean 创建代理对象**

```java
public class MapperFactoryBean<T> implements FactoryBean<T> {

    private Class<T> mapperInterface;
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public T getObject() throws Exception {
        // 通过 SqlSessionTemplate 获取 Mapper 代理对象
        return getSqlSession().getMapper(this.mapperInterface);
    }

    private SqlSession getSqlSession() {
        // 返回 SqlSessionTemplate（线程安全）
        return this.sqlSessionTemplate;
    }
}

// MyBatis 内部创建动态代理
public class MapperProxy<T> implements InvocationHandler {

    private final SqlSession sqlSession;
    private final Class<T> mapperInterface;

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) {
        // 拦截 Mapper 接口方法调用
        // 转换为 SqlSession 的方法调用
        MapperMethod mapperMethod =
            new MapperMethod(mapperInterface, method, sqlSession);
        return mapperMethod.execute(sqlSession, args);
    }
}
```

**阶段 3: SQL 执行阶段**

**SqlSessionTemplate 管理 SqlSession**

```java
public class SqlSessionTemplate implements SqlSession {

    private final SqlSessionFactory sqlSessionFactory;
    private final ExecutorType executorType;
    private final SqlSession sqlSessionProxy;

    public SqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        // 创建动态代理
        this.sqlSessionProxy = (SqlSession) Proxy.newProxyInstance(
            SqlSessionFactory.class.getClassLoader(),
            new Class[] { SqlSession.class },
            new SqlSessionInterceptor()  // 拦截器
        );
    }

    private class SqlSessionInterceptor implements InvocationHandler {
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) {
            // 1. 获取与 Spring 事务绑定的 SqlSession
            SqlSession sqlSession = getSqlSession(
                SqlSessionTemplate.this.sqlSessionFactory,
                SqlSessionTemplate.this.executorType
            );

            try {
                // 2. 执行实际的 SQL 操作
                Object result = method.invoke(sqlSession, args);

                // 3. 如果不在 Spring 事务中，自动提交
                if (!isSqlSessionTransactional(sqlSession)) {
                    sqlSession.commit(true);
                }

                return result;
            } catch (Throwable t) {
                // 4. 异常处理
                throw unwrapThrowable(t);
            } finally {
                // 5. 关闭 SqlSession（如果不在事务中）
                closeSqlSession(sqlSession);
            }
        }
    }

    // 获取 SqlSession（关键方法）
    public static SqlSession getSqlSession(
            SqlSessionFactory sessionFactory,
            ExecutorType executorType) {

        // 从 Spring 事务管理器获取 SqlSession
        SqlSessionHolder holder = (SqlSessionHolder)
            TransactionSynchronizationManager.getResource(sessionFactory);

        // 如果存在，返回事务中的 SqlSession
        if (holder != null && holder.isSynchronizedWithTransaction()) {
            return holder.getSqlSession();
        }

        // 否则创建新的 SqlSession
        SqlSession session = sessionFactory.openSession(executorType);

        // 如果在 Spring 事务中，注册同步器
        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            holder = new SqlSessionHolder(session, executorType);
            TransactionSynchronizationManager.bindResource(
                sessionFactory, holder);

            // 注册事务同步回调
            TransactionSynchronizationManager.registerSynchronization(
                new SqlSessionSynchronization(holder, sessionFactory));
        }

        return session;
    }
}
```

**阶段 4: 事务管理**

**Spring 事务管理器整合**

```java
public class DataSourceTransactionManager extends AbstractPlatformTransactionManager {

    @Override
    protected void doBegin(Object transaction, TransactionDefinition definition) {
        // 1. 开启数据库连接
        Connection con = dataSource.getConnection();

        // 2. 设置自动提交为 false
        con.setAutoCommit(false);

        // 3. 将连接绑定到当前线程
        TransactionSynchronizationManager.bindResource(
            dataSource, new ConnectionHolder(con));
    }

    @Override
    protected void doCommit(DefaultTransactionStatus status) {
        // 提交事务
        Connection con = getConnection();
        con.commit();
    }

    @Override
    protected void doRollback(DefaultTransactionStatus status) {
        // 回滚事务
        Connection con = getConnection();
        con.rollback();
    }
}

// MyBatis-Spring 的事务工厂
public class SpringManagedTransactionFactory implements TransactionFactory {

    @Override
    public Transaction newTransaction(DataSource dataSource, ...) {
        // 返回由 Spring 管理的事务对象
        return new SpringManagedTransaction(dataSource);
    }
}

public class SpringManagedTransaction implements Transaction {

    @Override
    public Connection getConnection() {
        // 从 Spring 事务管理器获取连接
        ConnectionHolder holder = (ConnectionHolder)
            TransactionSynchronizationManager.getResource(dataSource);
        return holder.getConnection();
    }

    @Override
    public void commit() {
        // 空实现，由 Spring 管理
    }

    @Override
    public void rollback() {
        // 空实现，由 Spring 管理
    }
}
```

**3. 关键技术点**

| 技术点 | 实现方式 | 作用 |
|--------|----------|------|
| **线程安全** | ThreadLocal + 动态代理 | 保证 SqlSession 线程安全 |
| **事务绑定** | TransactionSynchronizationManager | SqlSession 与 Spring 事务绑定 |
| **自动关闭** | 动态代理 + finally 块 | 自动关闭 SqlSession |
| **Mapper 注入** | FactoryBean + 动态代理 | Mapper 接口作为 Spring Bean |
| **事务同步** | TransactionSynchronization | 事务提交/回滚时回调 |

**4. 执行流程时序图**

```
用户代码                    Spring                MyBatis-Spring              MyBatis
   |                          |                         |                         |
   |--@Transactional--------->|                         |                         |
   |                          |--开启事务--------------->|                         |
   |                          |                         |--创建 Connection-------->|
   |                          |                         |<-绑定到 ThreadLocal------|
   |                          |                         |                         |
   |--userMapper.select()---->|                         |                         |
   |                          |--调用代理方法---------->|                         |
   |                          |                         |--getSqlSession()------->|
   |                          |                         |<-从 ThreadLocal 获取-----|
   |                          |                         |--execute SQL----------->|
   |                          |                         |<-返回结果---------------|
   |<-返回结果----------------|<------------------------|                         |
   |                          |                         |                         |
   |--方法结束--------------->|                         |                         |
   |                          |--提交事务-------------->|                         |
   |                          |                         |--commit()-------------->|
   |                          |                         |--close()--------------->|
```

**关键要点**

1. **FactoryBean 模式**: 使用 SqlSessionFactoryBean 和 MapperFactoryBean 创建对象
2. **动态代理**: SqlSessionTemplate 和 Mapper 都使用动态代理
3. **线程绑定**: 通过 TransactionSynchronizationManager 实现线程绑定
4. **事务集成**: 使用 SpringManagedTransactionFactory 整合事务
5. **自动管理**: 自动管理 SqlSession 生命周期，无需手动关闭

**记忆口诀**

```
MyBatis-Spring 三大宝，FactoryBean 全用到
SqlSessionFactory 先创建，数据源事务都配好
MapperScanner 扫接口，动态代理 Bean 注册
SqlSessionTemplate 线程安全，ThreadLocal 来绑定
Spring 事务管理器，统一提交和回滚
动态代理加拦截，自动关闭 SqlSession
三个组件紧配合，无缝整合真优雅
```
### 85. 如何在 Spring Boot 中使用 MyBatis？

**核心答案**

在 Spring Boot 中使用 MyBatis 非常简单，只需添加 **mybatis-spring-boot-starter** 依赖，配置数据源和 MyBatis 属性，使用 **@MapperScan** 或 **@Mapper** 注解扫描 Mapper 接口即可。Spring Boot 自动配置会自动创建 SqlSessionFactory、SqlSessionTemplate 等核心组件。

**详细说明**

**1. 快速开始步骤**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:11px monospace;fill:#0066cc}.step{font:bold 18px sans-serif;fill:#fff}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">Spring Boot 整合 MyBatis 步骤</text>
<rect x="100" y="70" width="150" height="80" fill="#1976d2" stroke="#0d47a1" stroke-width="2" rx="5"/>
<circle cx="175" cy="95" r="18" fill="#fff"/>
<text x="175" y="103" text-anchor="middle" class="step">1</text>
<text x="175" y="135" text-anchor="middle" class="label" fill="#fff">添加依赖</text>
<rect x="325" y="70" width="150" height="80" fill="#388e3c" stroke="#1b5e20" stroke-width="2" rx="5"/>
<circle cx="400" cy="95" r="18" fill="#fff"/>
<text x="400" y="103" text-anchor="middle" class="step">2</text>
<text x="400" y="135" text-anchor="middle" class="label" fill="#fff">配置数据源</text>
<rect x="550" y="70" width="150" height="80" fill="#f57c00" stroke="#e65100" stroke-width="2" rx="5"/>
<circle cx="625" cy="95" r="18" fill="#fff"/>
<text x="625" y="103" text-anchor="middle" class="step">3</text>
<text x="625" y="135" text-anchor="middle" class="label" fill="#fff">创建 Mapper</text>
<rect x="212" y="200" width="150" height="80" fill="#7b1fa2" stroke="#4a148c" stroke-width="2" rx="5"/>
<circle cx="287" cy="225" r="18" fill="#fff"/>
<text x="287" y="233" text-anchor="middle" class="step">4</text>
<text x="287" y="265" text-anchor="middle" class="label" fill="#fff">使用 @MapperScan</text>
<rect x="438" y="200" width="150" height="80" fill="#c62828" stroke="#b71c1c" stroke-width="2" rx="5"/>
<circle cx="513" cy="225" r="18" fill="#fff"/>
<text x="513" y="233" text-anchor="middle" class="step">5</text>
<text x="513" y="265" text-anchor="middle" class="label" fill="#fff">注入使用</text>
<path d="M 250 110 L 325 110" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 475 110 L 550 110" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 400 150 L 310 200" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 600 150 L 540 200" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 362 240 L 438 240" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs>
<rect x="200" y="320" width="400" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="345" text-anchor="middle" class="label">✓ Spring Boot 自动配置完成</text>
<text x="400" y="365" text-anchor="middle" class="code">无需手动配置 SqlSessionFactory</text>
</svg>

**2. 步骤 1: 添加依赖**

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- MyBatis Spring Boot Starter（核心） -->
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>3.0.3</version>
    </dependency>

    <!-- 数据库驱动 -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- 连接池（可选，推荐 HikariCP） -->
    <dependency>
        <groupId>com.zaxxer</groupId>
        <artifactId>HikariCP</artifactId>
    </dependency>
</dependencies>
```

**3. 步骤 2: 配置数据源**

**application.yml 配置**

```yaml
spring:
  datasource:
    # 数据源配置
    url: jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver

    # HikariCP 连接池配置（可选）
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000

# MyBatis 配置
mybatis:
  # MyBatis 配置文件位置（可选）
  config-location: classpath:mybatis-config.xml

  # Mapper XML 文件位置
  mapper-locations: classpath:mapper/*.xml

  # 类型别名包
  type-aliases-package: com.example.entity

  # MyBatis Configuration 配置
  configuration:
    # 开启驼峰命名转换
    map-underscore-to-camel-case: true
    # 日志实现
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    # 开启二级缓存
    cache-enabled: true
    # 延迟加载
    lazy-loading-enabled: true
    aggressive-lazy-loading: false
```

**application.properties 配置**

```properties
# 数据源配置
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# MyBatis 配置
mybatis.mapper-locations=classpath:mapper/*.xml
mybatis.type-aliases-package=com.example.entity
mybatis.configuration.map-underscore-to-camel-case=true
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

**4. 步骤 3: 创建实体类和 Mapper**

**实体类**

```java
package com.example.entity;

public class User {
    private Long id;
    private String username;
    private String email;
    private Integer age;

    // Getters and Setters
}
```

**Mapper 接口**

```java
package com.example.mapper;

import com.example.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper  // 方式 1: 使用 @Mapper 注解（推荐）
public interface UserMapper {

    // 注解方式
    @Select("SELECT * FROM user WHERE id = #{id}")
    User selectById(Long id);

    @Select("SELECT * FROM user")
    List<User> selectAll();

    @Insert("INSERT INTO user(username, email, age) VALUES(#{username}, #{email}, #{age})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(User user);

    @Update("UPDATE user SET username=#{username}, email=#{email}, age=#{age} WHERE id=#{id}")
    int update(User user);

    @Delete("DELETE FROM user WHERE id = #{id}")
    int delete(Long id);

    // XML 方式
    User selectByIdXml(Long id);
    List<User> selectAllXml();
}
```

**Mapper XML 文件**

```xml
<!-- src/main/resources/mapper/UserMapper.xml -->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.mapper.UserMapper">

    <select id="selectByIdXml" resultType="User">
        SELECT * FROM user WHERE id = #{id}
    </select>

    <select id="selectAllXml" resultType="User">
        SELECT * FROM user
    </select>

</mapper>
```

**5. 步骤 4: 配置 Mapper 扫描**

**方式 1: 使用 @MapperScan（推荐）**

```java
package com.example;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.mapper")  // 扫描 Mapper 接口
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

**方式 2: 在每个 Mapper 接口上使用 @Mapper**

```java
// 无需 @MapperScan，在每个 Mapper 接口上加 @Mapper
@Mapper
public interface UserMapper {
    // ...
}
```

**6. 步骤 5: 在 Service 中使用**

```java
package com.example.service;

import com.example.entity.User;
import com.example.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public User getUserById(Long id) {
        return userMapper.selectById(id);
    }

    public List<User> getAllUsers() {
        return userMapper.selectAll();
    }

    @Transactional  // Spring 事务管理
    public void saveUser(User user) {
        userMapper.insert(user);
    }

    @Transactional
    public void updateUser(User user) {
        userMapper.update(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        userMapper.delete(id);
    }
}
```

**7. Controller 层使用**

```java
package com.example.controller;

import com.example.entity.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public String createUser(@RequestBody User user) {
        userService.saveUser(user);
        return "User created successfully";
    }

    @PutMapping
    public String updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return "User updated successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }
}
```

**8. Spring Boot 自动配置原理**

**MybatisAutoConfiguration 自动配置类**

```java
@Configuration
@ConditionalOnClass({ SqlSessionFactory.class, SqlSessionFactoryBean.class })
@ConditionalOnSingleCandidate(DataSource.class)
@EnableConfigurationProperties(MybatisProperties.class)
@AutoConfigureAfter({ DataSourceAutoConfiguration.class, ... })
public class MybatisAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        // 自动创建 SqlSessionFactory
        SqlSessionFactoryBean factory = new SqlSessionFactoryBean();
        factory.setDataSource(dataSource);

        // 设置配置
        if (properties.getConfigLocation() != null) {
            factory.setConfigLocation(properties.getConfigLocation());
        }

        // 设置 Mapper 位置
        if (properties.getMapperLocations() != null) {
            factory.setMapperLocations(properties.getMapperLocations());
        }

        return factory.getObject();
    }

    @Bean
    @ConditionalOnMissingBean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        // 自动创建 SqlSessionTemplate
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
```

**9. 配置属性对照表**

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `mybatis.config-location` | MyBatis 配置文件位置 | `classpath:mybatis-config.xml` |
| `mybatis.mapper-locations` | Mapper XML 文件位置 | `classpath:mapper/*.xml` |
| `mybatis.type-aliases-package` | 类型别名包 | `com.example.entity` |
| `mybatis.type-handlers-package` | 类型处理器包 | `com.example.handler` |
| `mybatis.configuration.*` | MyBatis Configuration 配置 | 见下表 |

**Configuration 配置项**

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `map-underscore-to-camel-case` | 驼峰命名转换 | `false` |
| `cache-enabled` | 二级缓存 | `true` |
| `lazy-loading-enabled` | 延迟加载 | `false` |
| `log-impl` | 日志实现 | - |
| `default-executor-type` | 执行器类型 | `SIMPLE` |

**10. 多数据源配置（进阶）**

```java
@Configuration
@MapperScan(
    basePackages = "com.example.mapper.primary",
    sqlSessionFactoryRef = "primarySqlSessionFactory"
)
public class PrimaryDataSourceConfig {

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource.primary")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    @Primary
    public SqlSessionFactory primarySqlSessionFactory(
            @Qualifier("primaryDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        return bean.getObject();
    }
}
```

**关键要点**

1. **Starter 依赖**: 使用 mybatis-spring-boot-starter 简化配置
2. **自动配置**: Spring Boot 自动创建 SqlSessionFactory 和 SqlSessionTemplate
3. **配置文件**: 在 application.yml 中配置数据源和 MyBatis 属性
4. **Mapper 扫描**: 使用 @MapperScan 或 @Mapper 注解
5. **零 XML**: 可以使用纯注解方式，无需 XML 配置

**记忆口诀**

```
Spring Boot 整合 MyBatis，starter 依赖先添加
application.yml 配数据源，mybatis 配置一起写
创建 Mapper 接口加注解，@Mapper 或 @MapperScan
自动配置全搞定，SqlSessionFactory 不用管
Service 注入 Mapper 用，@Transactional 加事务
简单方便零配置，开箱即用真优雅
```





**核心答案**

MyBatis 缓存失效的常见场景包括:**增删改操作**、**SqlSession 关闭**、**手动清除**、**缓存过期**、**参数变化**等。一级和二级缓存的失效时机略有差异。

**详细说明**

1. **缓存失效场景总览**

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead85" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/></marker><style>.title85{font:bold 18px sans-serif;fill:#1e293b}.label85{font:14px sans-serif;fill:#334155}.code85{font:12px monospace;fill:#059669}.invalid{fill:#fee2e2;stroke:#ef4444;stroke-width:2}.valid{fill:#dcfce7;stroke:#22c55e;stroke-width:2}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title85">缓存失效场景</text>
<rect x="50" y="60" width="700" height="60" class="invalid" rx="8"/><text x="70" y="85" class="label85" font-weight="bold">场景 1: 增删改操作</text><text x="70" y="105" class="code85">执行 INSERT、UPDATE、DELETE 后清空缓存</text>
<rect x="50" y="140" width="700" height="60" class="invalid" rx="8"/><text x="70" y="165" class="label85" font-weight="bold">场景 2: SqlSession 关闭/提交</text><text x="70" y="185" class="code85">一级缓存:关闭清空 | 二级缓存:提交写入</text>
<rect x="50" y="220" width="700" height="60" class="invalid" rx="8"/><text x="70" y="245" class="label85" font-weight="bold">场景 3: 手动清除</text><text x="70" y="265" class="code85">调用 clearCache() 方法</text>
<rect x="50" y="300" width="700" height="60" class="invalid" rx="8"/><text x="70" y="325" class="label85" font-weight="bold">场景 4: 缓存过期</text><text x="70" y="345" class="code85">达到 flushInterval 配置的时间间隔</text>
<rect x="50" y="380" width="700" height="60" class="invalid" rx="8"/><text x="70" y="405" class="label85" font-weight="bold">场景 5: 参数变化</text><text x="70" y="425" class="code85">查询参数、SQL 语句、分页参数任一变化</text>
<rect x="50" y="460" width="700" height="60" class="invalid" rx="8"/><text x="70" y="485" class="label85" font-weight="bold">场景 6: 缓存容量满</text><text x="70" y="505" class="code85">达到 size 上限,按回收策略(LRU/FIFO)清理</text>
<rect x="50" y="540" width="700" height="60" class="invalid" rx="8"/><text x="70" y="565" class="label85" font-weight="bold">场景 7: 跨命名空间操作</text><text x="70" y="585" class="code85">其他 Mapper 修改了相同表的数据</text>
</svg>

2. **详细失效场景分析**

**场景1:增删改操作(最常见)**

- **行为**:执行 INSERT、UPDATE、DELETE 语句后,MyBatis 会自动清空对应 namespace 的缓存
- **原因**:保证数据一致性,避免读取到过期数据
- **作用范围**:
  - 一级缓存:清空当前 SqlSession 的所有缓存
  - 二级缓存:清空整个 namespace 的缓存

```java
SqlSession session = factory.openSession();
UserMapper mapper = session.getMapper(UserMapper.class);

// 第一次查询,缓存结果
User user1 = mapper.selectById(1); // 查数据库

// 执行更新操作,清空缓存
mapper.updateUser(user1);

// 第二次查询,缓存失效,重新查询
User user2 = mapper.selectById(1); // 再次查数据库
```

**场景2:SqlSession 关闭/提交**

- **一级缓存**:SqlSession 关闭时清空
- **二级缓存**:SqlSession 提交时写入,回滚时丢弃

```java
SqlSession session = factory.openSession();
User user = mapper.selectById(1); // 查询并缓存

session.close(); // 一级缓存清空
// 或
session.commit(); // 一级缓存数据写入二级缓存
```

**场景3:手动清除**

```java
SqlSession session = factory.openSession();
UserMapper mapper = session.getMapper(UserMapper.class);

User user1 = mapper.selectById(1); // 查询并缓存

// 手动清空一级缓存
session.clearCache();

User user2 = mapper.selectById(1); // 重新查询数据库
```

**场景4:缓存过期(仅二级缓存)**

```xml
<cache flushInterval="60000"/> <!-- 60秒后自动刷新 -->
```

- 达到 `flushInterval` 设置的时间后,缓存自动失效
- 仅对二级缓存有效,一级缓存无超时机制

**场景5:参数变化**

缓存 Key 由以下因素组成,任一变化都会导致缓存失效:

| 组成部分 | 说明 | 示例 |
|----------|------|------|
| MappedStatement ID | namespace + SQL ID | `UserMapper.selectById` |
| SQL 语句 | 原始 SQL | `SELECT * FROM user WHERE id = ?` |
| 参数值 | 传入的参数 | `id=1` vs `id=2` |
| RowBounds | 分页参数 | `offset=0, limit=10` |

```java
User user1 = mapper.selectById(1);   // 缓存 key1
User user2 = mapper.selectById(2);   // 不同参数,缓存 key2
```

**场景6:缓存容量满**

```xml
<cache size="512" eviction="LRU"/>
```

- 当缓存对象数量达到 `size` 上限时,按回收策略移除旧数据
- **LRU**:移除最久未使用的对象
- **FIFO**:移除最早进入的对象

**场景7:跨命名空间操作(脏读问题)**

```java
// UserMapper 查询并缓存
User user = userMapper.selectById(1);

// 其他 Mapper 修改了 user 表
orderMapper.updateUserStatus(1, "inactive");

// UserMapper 再次查询,仍然命中缓存(数据不一致)
User cachedUser = userMapper.selectById(1); // 脏读!
```

**解决方案**:使用 `<cache-ref>` 共享缓存或禁用二级缓存

3. **一级缓存 vs 二级缓存失效对比**

| 失效场景 | 一级缓存 | 二级缓存 |
|----------|----------|----------|
| **增删改操作** | ✓ 清空 | ✓ 清空 |
| **SqlSession 关闭** | ✓ 清空 | ✗ 不影响 |
| **SqlSession 提交** | ✓ 清空(写入二级) | ✓ 接收一级数据 |
| **SqlSession 回滚** | ✓ 清空 | ✓ 不接收数据 |
| **手动清除** | ✓ clearCache() | ✓ 清空 namespace |
| **缓存超时** | ✗ 无超时机制 | ✓ flushInterval |
| **容量限制** | ✗ 无限制 | ✓ size 限制 |
| **参数变化** | ✓ 不同 key | ✓ 不同 key |

4. **避免缓存失效的最佳实践**

1. **分离读写操作**:将查询和修改操作放在不同的 SqlSession
2. **及时提交事务**:确保修改操作尽快生效
3. **使用 cache-ref**:多个 Mapper 操作同一表时共享缓存
4. **合理配置过期时间**:根据数据更新频率设置 flushInterval
5. **禁用不必要的缓存**:频繁更新的数据不适合缓存

```xml
<!-- 禁用特定 SQL 的缓存 -->
<select id="selectRealTimeData" useCache="false">
    SELECT * FROM stock_price WHERE symbol = #{symbol}
</select>

<!-- 修改操作不清空缓存(慎用) -->
<update id="updateLog" flushCache="false">
    UPDATE access_log SET count = count + 1
</update>
```

**关键要点**

1. 🔄 **增删改清空**:任何写操作都会清空缓存
2. 🔒 **会话关闭失效**:一级缓存随 SqlSession 关闭而清空
3. ⏱️ **超时失效**:二级缓存可配置自动过期时间
4. ⚠️ **脏读风险**:跨 namespace 操作可能导致数据不一致

**记忆口诀**

```
增删改后缓存清,
关闭提交需留意,
参数变化 Key 不同,
超时容量也失效。
```
