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
