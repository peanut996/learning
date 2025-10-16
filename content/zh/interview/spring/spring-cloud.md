## Spring Cloud

### 66. 什么是 Spring Cloud？

**1. 核心定义**

Spring Cloud 是一套基于 Spring Boot 的**微服务开发工具集**，它为开发者提供了在分布式系统（如配置管理、服务发现、熔断器、智能路由、微代理、控制总线、全局锁、分布式会话等）中快速构建一些常见模式的工具。

**简单来说**：Spring Cloud = 一站式微服务解决方案

**2. Spring Cloud 架构图**

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring Cloud 微服务架构</text>
<rect x="50" y="70" width="800" height="450" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"/>
<text x="450" y="100" text-anchor="middle" font-size="14" fill="#666">Spring Cloud 生态</text>
<rect x="80" y="130" width="180" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="170" y="155" text-anchor="middle" font-size="13" font-weight="bold">服务注册与发现</text>
<text x="100" y="180" font-size="11">Eureka / Consul</text>
<text x="100" y="195" font-size="11">Nacos / Zookeeper</text>
<rect x="280" y="130" width="180" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="370" y="155" text-anchor="middle" font-size="13" font-weight="bold">负载均衡</text>
<text x="300" y="180" font-size="11">Ribbon</text>
<text x="300" y="195" font-size="11">Spring Cloud LoadBalancer</text>
<rect x="480" y="130" width="180" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="570" y="155" text-anchor="middle" font-size="13" font-weight="bold">服务调用</text>
<text x="500" y="180" font-size="11">Feign / OpenFeign</text>
<text x="500" y="195" font-size="11">RestTemplate</text>
<rect x="680" y="130" width="150" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="755" y="155" text-anchor="middle" font-size="13" font-weight="bold">API 网关</text>
<text x="700" y="180" font-size="11">Gateway</text>
<text x="700" y="195" font-size="11">Zuul (停更)</text>
<rect x="80" y="240" width="180" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="170" y="265" text-anchor="middle" font-size="13" font-weight="bold">配置中心</text>
<text x="100" y="290" font-size="11">Config</text>
<text x="100" y="305" font-size="11">Nacos Config</text>
<rect x="280" y="240" width="180" height="80" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="370" y="265" text-anchor="middle" font-size="13" font-weight="bold">熔断降级</text>
<text x="300" y="290" font-size="11">Hystrix (停更)</text>
<text x="300" y="305" font-size="11">Sentinel / Resilience4j</text>
<rect x="480" y="240" width="180" height="80" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="570" y="265" text-anchor="middle" font-size="13" font-weight="bold">链路追踪</text>
<text x="500" y="290" font-size="11">Sleuth + Zipkin</text>
<text x="500" y="305" font-size="11">Skywalking</text>
<rect x="680" y="240" width="150" height="80" fill="#fff8e1" stroke="#f9a825" stroke-width="2" rx="5"/>
<text x="755" y="265" text-anchor="middle" font-size="13" font-weight="bold">消息总线</text>
<text x="700" y="290" font-size="11">Bus</text>
<text x="700" y="305" font-size="11">Stream</text>
<rect x="80" y="350" width="380" height="70" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/>
<text x="270" y="380" text-anchor="middle" font-size="13" font-weight="bold">Spring Boot（基础框架）</text>
<text x="100" y="405" font-size="11">提供自动配置、快速开发能力</text>
<rect x="480" y="350" width="350" height="70" fill="#ede7f6" stroke="#5e35b1" stroke-width="2" rx="5"/>
<text x="655" y="380" text-anchor="middle" font-size="13" font-weight="bold">其他组件</text>
<text x="500" y="400" font-size="11">Security / OAuth2 / Task / ...</text>
<rect x="250" y="450" width="400" height="50" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="450" y="480" text-anchor="middle" font-size="13" font-weight="bold">基础设施：数据库、缓存、消息队列、监控...</text>
</svg>

**3. Spring Cloud 核心组件**

| 组件类型 | 功能 | 主要实现 | 状态 |
|---------|------|---------|------|
| **服务注册与发现** | 服务的注册、发现、健康检查 | Eureka、Consul、Nacos | ✓ 活跃 |
| **负载均衡** | 客户端负载均衡 | Ribbon、LoadBalancer | ✓ 活跃 |
| **服务调用** | HTTP 客户端封装 | Feign、OpenFeign | ✓ 活跃 |
| **API 网关** | 统一入口、路由、过滤 | Gateway、Zuul | Gateway 活跃 |
| **配置中心** | 集中化配置管理 | Config、Nacos | ✓ 活跃 |
| **熔断降级** | 服务容错保护 | Hystrix、Sentinel | Sentinel 活跃 |
| **链路追踪** | 分布式追踪 | Sleuth + Zipkin | ✓ 活跃 |
| **消息总线** | 事件、消息广播 | Bus、Stream | ✓ 活跃 |

**4. Spring Cloud 版本关系**

Spring Cloud 采用**伦敦地铁站命名**（按字母顺序）：

```
Angel → Brixton → Camden → Dalston → Edgware → Finchley
→ Greenwich → Hoxton → Ilford → 2020.0.x → 2021.0.x → 2022.0.x
```

**版本对应关系**：

| Spring Cloud 版本 | Spring Boot 版本 | 发布时间 | 状态 |
|------------------|-----------------|---------|------|
| 2023.0.x (Leyton) | 3.2.x | 2023 | ✓ 最新 |
| 2022.0.x (Kilburn) | 3.0.x, 3.1.x | 2022 | ✓ 维护中 |
| 2021.0.x (Jubilee) | 2.6.x, 2.7.x | 2021 | ✓ 维护中 |
| 2020.0.x (Ilford) | 2.4.x, 2.5.x | 2020 | 停止维护 |
| Hoxton | 2.2.x, 2.3.x | 2019 | 停止维护 |
| Greenwich | 2.1.x | 2019 | 停止维护 |
| Finchley | 2.0.x | 2018 | 停止维护 |

**5. Spring Cloud 与微服务架构**

<svg viewBox="0 0 850 450" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring Cloud 微服务调用流程</text>
<rect x="350" y="60" width="150" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">API Gateway</text>
<rect x="100" y="160" width="120" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="160" y="185" text-anchor="middle" font-size="13">服务 A</text>
<text x="160" y="205" text-anchor="middle" font-size="11">用户服务</text>
<rect x="365" y="160" width="120" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="425" y="185" text-anchor="middle" font-size="13">服务 B</text>
<text x="425" y="205" text-anchor="middle" font-size="11">订单服务</text>
<rect x="630" y="160" width="120" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="690" y="185" text-anchor="middle" font-size="13">服务 C</text>
<text x="690" y="205" text-anchor="middle" font-size="11">商品服务</text>
<rect x="300" y="280" width="250" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="425" y="305" text-anchor="middle" font-size="14" font-weight="bold">注册中心</text>
<text x="425" y="325" text-anchor="middle" font-size="12">Eureka / Nacos</text>
<text x="425" y="345" text-anchor="middle" font-size="11">服务注册、发现、健康检查</text>
<rect x="100" y="390" width="120" height="40" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="160" y="415" text-anchor="middle" font-size="12">配置中心</text>
<rect x="365" y="390" width="120" height="40" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="425" y="415" text-anchor="middle" font-size="12">链路追踪</text>
<rect x="630" y="390" width="120" height="40" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="690" y="415" text-anchor="middle" font-size="12">熔断降级</text>
<line x1="425" y1="110" x2="160" y2="160" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="425" y1="110" x2="425" y2="160" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="425" y1="110" x2="690" y2="160" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="160" y1="220" x2="350" y2="280" stroke="#666" stroke-width="1" stroke-dasharray="5,5"/>
<line x1="425" y1="220" x2="425" y2="280" stroke="#666" stroke-width="1" stroke-dasharray="5,5"/>
<line x1="690" y1="220" x2="500" y2="280" stroke="#666" stroke-width="1" stroke-dasharray="5,5"/>
<text x="230" y="245" font-size="10" fill="#666">注册</text>
<text x="425" y="245" font-size="10" fill="#666">注册</text>
<text x="580" y="245" font-size="10" fill="#666">注册</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976d2"/>
</marker>
</defs>
</svg>

**6. Spring Cloud 核心特性**

**① 服务注册与发现**

```yaml
# application.yml
spring:
  application:
    name: user-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848

# 服务自动注册到 Nacos
# 其他服务可以通过服务名调用
```

**② 服务间调用**

```java
// 使用 OpenFeign 声明式调用
@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/users/{id}")
    User getUserById(@PathVariable Long id);
}

// 使用
@Autowired
private UserClient userClient;

User user = userClient.getUserById(1L);
```

**③ 负载均衡**

```java
// Ribbon/LoadBalancer 自动提供负载均衡
// 默认轮询策略，可配置随机、加权等
@LoadBalanced
@Bean
public RestTemplate restTemplate() {
    return new RestTemplate();
}

// 调用时使用服务名
restTemplate.getForObject("http://user-service/users/1", User.class);
```

**④ API 网关**

```yaml
# Gateway 路由配置
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/users/**
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/orders/**
```

**⑤ 配置中心**

```yaml
# bootstrap.yml
spring:
  cloud:
    config:
      uri: http://localhost:8888
      profile: dev
      label: master

# 配置从 Config Server 统一获取
# 支持动态刷新（配合 Bus）
```

**⑥ 熔断降级**

```java
// 使用 Sentinel
@SentinelResource(value = "getUser", fallback = "getUserFallback")
public User getUser(Long id) {
    return userService.getById(id);
}

// 降级方法
public User getUserFallback(Long id, Throwable e) {
    return new User(id, "降级用户", null);
}
```

**7. Spring Cloud 与 Spring Boot 的关系**

```
┌─────────────────────────────────────┐
│         Spring Cloud                │  ← 微服务解决方案
│  (服务注册、网关、配置、熔断...)      │
└─────────────────┬───────────────────┘
                  │ 基于
┌─────────────────▼───────────────────┐
│         Spring Boot                 │  ← 快速开发框架
│  (自动配置、内嵌容器、Starter...)     │
└─────────────────┬───────────────────┘
                  │ 基于
┌─────────────────▼───────────────────┐
│         Spring Framework            │  ← 基础框架
│  (IOC、AOP、事务...)                 │
└─────────────────────────────────────┘
```

**关系说明**：
- Spring Framework：基础，提供 IOC、AOP 等核心功能
- Spring Boot：简化配置，快速开发单体应用
- Spring Cloud：基于 Spring Boot，提供微服务全套解决方案

**8. Spring Cloud 优势**

**① 开箱即用**
```xml
<!-- 只需引入依赖，配置即可使用 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

**② 生态完善**
- 服务治理全覆盖
- 社区活跃
- 文档完善
- 与 Spring 生态无缝集成

**③ 约定优于配置**
- 默认配置合理
- 特殊需求可定制
- 学习成本低

**④ 可选组件丰富**
- 多种实现可选（Eureka/Consul/Nacos）
- 灵活替换
- 不绑定特定技术

**9. Spring Cloud 适用场景**

**✓ 适合使用**：
- 中大型企业级应用
- 复杂业务系统
- 需要快速迭代
- 团队熟悉 Java/Spring 技术栈
- 需要完整的微服务治理

**✗ 不太适合**：
- 简单小型应用（杀鸡用牛刀）
- 性能要求极致（相比 Go/Rust 有差距）
- 团队不熟悉 Spring
- 硬件资源有限（每个服务独立部署，资源消耗大）

**10. Spring Cloud 典型架构**

```
用户请求
    ↓
[Nginx / LVS]
    ↓
[API Gateway (Spring Cloud Gateway)]
    ↓
┌───────────┬─────────────┬─────────────┐
│  用户服务  │   订单服务   │   商品服务   │
│  (多实例)  │   (多实例)  │   (多实例)   │
└─────┬─────┴──────┬──────┴──────┬──────┘
      │            │             │
      └────────────┼─────────────┘
                   ↓
         [注册中心 (Nacos)]
                   ↓
         ┌─────────┴─────────┐
    [配置中心]          [链路追踪]
    [熔断降级]          [监控告警]
```

**11. Spring Cloud 与其他微服务框架对比**

| 对比维度 | Spring Cloud | Dubbo | Service Mesh (Istio) |
|---------|-------------|-------|---------------------|
| **语言** | Java | Java | 多语言 |
| **通信协议** | HTTP/REST | RPC (Dubbo) | HTTP/gRPC |
| **服务治理** | ✓✓ 完善 | ✓✓ 完善 | ✓✓✓ 最完善 |
| **学习成本** | 中 | 中 | 高 |
| **性能** | 中等 | 高 | 中高 |
| **生态** | ✓✓✓ Spring 生态 | ✓✓ 阿里生态 | ✓✓ Cloud Native |
| **适用场景** | Java 微服务 | Java RPC | 多语言微服务 |

**12. Spring Cloud 快速入门**

**步骤 1：创建父 POM**

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2023.0.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

**步骤 2：创建注册中心**

```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
```

**步骤 3：创建服务提供者**

```java
@SpringBootApplication
@EnableDiscoveryClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
```

**步骤 4：创建服务消费者**

```java
@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}
```

**13. 注意事项**

**① 版本兼容**
- Spring Cloud 与 Spring Boot 版本必须匹配
- 查看官方兼容性矩阵

**② 组件选择**
- Hystrix 已停更，建议用 Sentinel/Resilience4j
- Zuul 已停更,建议用 Gateway
- Ribbon 进入维护,建议用 LoadBalancer

**③ 资源消耗**
- 每个服务独立部署
- 注意内存、CPU 资源规划

**④ 网络通信**
- 服务间通信依赖网络
- 做好超时、重试配置

**关键要点**

1. Spring Cloud 是基于 Spring Boot 的一站式微服务解决方案
2. 核心组件：注册中心、网关、配置中心、熔断降级、负载均衡、服务调用
3. 版本采用伦敦地铁站命名，需匹配 Spring Boot 版本
4. 优势：开箱即用、生态完善、约定优于配置
5. 适合中大型企业级微服务架构
6. 注意组件选型（避免使用停更组件）

**记忆口诀**：Spring Cloud 微服务，注册发现配置中心，网关负载熔断降级，链路追踪消息总线

### 67. 什么是微服务？

**1. 核心定义**

微服务（Microservices）是一种**软件架构风格**，它将一个大型单体应用拆分成多个小型、独立的服务。每个服务运行在自己的进程中，服务之间通过轻量级通信机制（通常是 HTTP RESTful API）进行交互，每个服务围绕具体业务能力构建，可以独立部署、独立扩展。

**2. 单体架构 vs 微服务架构**

<svg viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">单体架构 vs 微服务架构</text>
<text x="200" y="70" text-anchor="middle" font-size="15" font-weight="bold">单体架构 (Monolithic)</text>
<rect x="80" y="90" width="240" height="320" fill="#ffebee" stroke="#c62828" stroke-width="3" rx="5"/>
<text x="200" y="120" text-anchor="middle" font-size="13" font-weight="bold">单一应用</text>
<rect x="110" y="140" width="180" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="200" y="170" text-anchor="middle" font-size="12">UI 层</text>
<rect x="110" y="200" width="180" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="200" y="230" text-anchor="middle" font-size="12">业务逻辑层</text>
<rect x="110" y="260" width="180" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="3"/>
<text x="200" y="290" text-anchor="middle" font-size="12">数据访问层</text>
<rect x="110" y="320" width="180" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="3"/>
<text x="200" y="350" text-anchor="middle" font-size="12">数据库</text>
<text x="200" y="430" text-anchor="middle" font-size="11" fill="#c62828">• 所有功能打包部署</text>
<text x="700" y="70" text-anchor="middle" font-size="15" font-weight="bold">微服务架构 (Microservices)</text>
<rect x="580" y="90" width="240" height="320" fill="#e8f5e9" stroke="#388e3c" stroke-width="3" rx="5"/>
<text x="700" y="120" text-anchor="middle" font-size="13" font-weight="bold">多个独立服务</text>
<rect x="600" y="140" width="90" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="645" y="165" text-anchor="middle" font-size="11" font-weight="bold">用户服务</text>
<text x="645" y="185" font-size="9">用户管理</text>
<text x="645" y="200" font-size="9">认证授权</text>
<rect x="710" y="140" width="90" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="755" y="165" text-anchor="middle" font-size="11" font-weight="bold">订单服务</text>
<text x="755" y="185" font-size="9">订单管理</text>
<text x="755" y="200" font-size="9">订单查询</text>
<rect x="600" y="240" width="90" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="3"/>
<text x="645" y="265" text-anchor="middle" font-size="11" font-weight="bold">商品服务</text>
<text x="645" y="285" font-size="9">商品管理</text>
<text x="645" y="300" font-size="9">库存管理</text>
<rect x="710" y="240" width="90" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="3"/>
<text x="755" y="265" text-anchor="middle" font-size="11" font-weight="bold">支付服务</text>
<text x="755" y="285" font-size="9">支付处理</text>
<text x="755" y="300" font-size="9">退款</text>
<text x="645" y="345" font-size="10">DB1</text>
<text x="755" y="345" font-size="10">DB2</text>
<text x="645" y="365" font-size="10">DB3</text>
<text x="755" y="365" font-size="10">DB4</text>
<text x="700" y="400" text-anchor="middle" font-size="11" fill="#388e3c">• 按业务拆分服务</text>
<text x="700" y="420" text-anchor="middle" font-size="11" fill="#388e3c">• 独立部署、独立数据库</text>
<line x1="320" y1="250" x2="370" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arw)"/>
<text x="345" y="240" font-size="12" fill="#666">演进</text>
<defs>
<marker id="arw" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
</svg>

**3. 微服务核心特征**

**① 按业务能力拆分**

```
单体应用：所有功能在一个项目中
微服务：
  ├── user-service     (用户服务)
  ├── order-service    (订单服务)
  ├── product-service  (商品服务)
  ├── payment-service  (支付服务)
  └── ...
```

**② 独立部署**

每个服务可以独立部署、升级，不影响其他服务。

```bash
# 单体应用：修改任何一个功能都要重新部署整个应用
./deploy-all.sh

# 微服务：只需要部署修改的服务
./deploy-user-service.sh
```

**③ 轻量级通信**

服务之间通过 HTTP REST/gRPC 等轻量级协议通信。

```java
// 用户服务调用订单服务
@FeignClient("order-service")
public interface OrderClient {
    @GetMapping("/orders/{userId}")
    List<Order> getOrdersByUserId(@PathVariable Long userId);
}
```

**④ 独立数据存储**

每个服务拥有自己的数据库，数据隔离。

```
user-service    → user_db
order-service   → order_db
product-service → product_db
```

**⑤ 去中心化治理**

每个服务可以选择最适合的技术栈。

```
user-service:    Java + MySQL
order-service:   Go + PostgreSQL
product-service: Node.js + MongoDB
```

**⑥ 容错设计**

服务失败不影响整个系统，通过熔断、降级等机制保证可用性。

```java
// 熔断降级
@HystrixCommand(fallbackMethod = "getUserFallback")
public User getUser(Long id) {
    return userClient.getUser(id);
}

public User getUserFallback(Long id) {
    return new User(id, "默认用户");
}
```

**4. 微服务架构组件**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">微服务架构核心组件</text>
<rect x="300" y="60" width="200" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="90" text-anchor="middle" font-size="14" font-weight="bold">API 网关</text>
<rect x="100" y="160" width="150" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="175" y="185" text-anchor="middle" font-size="12">服务 A</text>
<text x="175" y="205" text-anchor="middle" font-size="10">(用户服务)</text>
<rect x="325" y="160" width="150" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="185" text-anchor="middle" font-size="12">服务 B</text>
<text x="400" y="205" text-anchor="middle" font-size="10">(订单服务)</text>
<rect x="550" y="160" width="150" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="625" y="185" text-anchor="middle" font-size="12">服务 C</text>
<text x="625" y="205" text-anchor="middle" font-size="10">(商品服务)</text>
<rect x="250" y="270" width="300" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="295" text-anchor="middle" font-size="13" font-weight="bold">注册中心</text>
<text x="400" y="315" text-anchor="middle" font-size="11">(服务注册与发现)</text>
<rect x="50" y="380" width="130" height="50" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="115" y="410" text-anchor="middle" font-size="11">配置中心</text>
<rect x="210" y="380" width="130" height="50" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="275" y="410" text-anchor="middle" font-size="11">链路追踪</text>
<rect x="370" y="380" width="130" height="50" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="435" y="410" text-anchor="middle" font-size="11">熔断降级</text>
<rect x="530" y="380" width="130" height="50" fill="#ede7f6" stroke="#5e35b1" stroke-width="2" rx="5"/>
<text x="595" y="410" text-anchor="middle" font-size="11">负载均衡</text>
<rect x="680" y="380" width="100" height="50" fill="#fff8e1" stroke="#f9a825" stroke-width="2" rx="5"/>
<text x="730" y="410" text-anchor="middle" font-size="11">消息队列</text>
<line x1="400" y1="110" x2="175" y2="160" stroke="#1976d2" stroke-width="2"/>
<line x1="400" y1="110" x2="400" y2="160" stroke="#1976d2" stroke-width="2"/>
<line x1="400" y1="110" x2="625" y2="160" stroke="#1976d2" stroke-width="2"/>
<line x1="175" y1="220" x2="300" y2="270" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="400" y1="220" x2="400" y2="270" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="625" y1="220" x2="500" y2="270" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<text x="220" y="250" font-size="9" fill="#666">注册</text>
<text x="400" y="250" font-size="9" fill="#666">注册</text>
<text x="545" y="250" font-size="9" fill="#666">注册</text>
<rect x="250" y="450" width="300" height="35" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/>
<text x="400" y="472" text-anchor="middle" font-size="11">基础设施：容器、K8s、监控、日志...</text>
</svg>

**5. 微服务优势**

**① 独立部署、快速迭代**

```
单体应用：
  修改一个功能 → 整个应用重新部署 → 停机时间长

微服务：
  修改用户服务 → 只部署用户服务 → 不影响其他服务
```

**② 技术栈灵活**

```java
// 用户服务 - Java
@RestController
public class UserController {
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) { ... }
}
```

```go
// 订单服务 - Go
func GetOrder(w http.ResponseWriter, r *http.Request) {
    // ...
}
```

**③ 按需扩展**

```bash
# 订单服务压力大，只扩展订单服务
kubectl scale deployment order-service --replicas=10

# 不需要扩展整个应用
```

**④ 故障隔离**

```
支付服务宕机 ✗
    ↓
其他服务正常运行 ✓ (用户服务、订单服务、商品服务)
    ↓
系统部分可用 (降级支付功能)
```

**⑤ 团队自治**

```
团队A: 负责用户服务
团队B: 负责订单服务
团队C: 负责商品服务

各团队独立开发、测试、部署，互不干扰
```

**6. 微服务挑战**

**① 分布式系统复杂性**

| 问题 | 说明 | 解决方案 |
|-----|------|---------|
| **网络延迟** | 服务间调用依赖网络 | 异步通信、缓存 |
| **分布式事务** | 跨服务事务难保证 | Saga、TCC、消息最终一致性 |
| **数据一致性** | 多个数据库数据同步 | 事件驱动、CDC |
| **服务治理** | 服务数量多，管理复杂 | 服务网格、注册中心 |

**② 运维复杂度**

```
单体应用：1 个应用
微服务：  10+ 个服务
  → 部署、监控、日志、配置管理 × 10+
```

**③ 分布式追踪**

```
请求链路：
  用户请求 → 网关 → 用户服务 → 订单服务 → 商品服务
           ↓       ↓          ↓          ↓
        链路追踪系统（Zipkin/Skywalking）
```

**④ 测试难度增加**

```
单体应用：单元测试 + 集成测试
微服务：
  - 单元测试（单个服务）
  - 集成测试（服务间交互）
  - 契约测试（API 契约）
  - 端到端测试（全链路）
```

**7. 微服务拆分原则**

**① 单一职责原则**

```
✓ 用户服务：只负责用户管理
✓ 订单服务：只负责订单管理

✗ 用户订单服务：用户 + 订单（职责不单一）
```

**② 按业务能力拆分**

```
电商系统拆分：
  - 用户服务（注册、登录、用户信息）
  - 商品服务（商品管理、库存）
  - 订单服务（下单、订单查询）
  - 支付服务（支付、退款）
  - 物流服务（发货、物流跟踪）
```

**③ 避免过度拆分**

```
✗ 过度拆分：
  - 用户注册服务
  - 用户登录服务
  - 用户信息服务
  → 服务间调用频繁，性能差

✓ 合理拆分：
  - 用户服务（包含注册、登录、信息管理）
```

**④ 数据独立性**

```
✓ 每个服务有自己的数据库
user-service    → user_db
order-service   → order_db

✗ 多个服务共享一个数据库
user-service  ↘
               → shared_db
order-service ↗
```

**8. 微服务通信方式**

**① 同步通信（HTTP REST）**

```java
// RestTemplate
String url = "http://order-service/orders/" + userId;
List<Order> orders = restTemplate.getForObject(url, List.class);

// Feign
@FeignClient("order-service")
public interface OrderClient {
    @GetMapping("/orders/{userId}")
    List<Order> getOrders(@PathVariable Long userId);
}
```

**② 同步通信（gRPC）**

```protobuf
// user.proto
service UserService {
  rpc GetUser(UserRequest) returns (UserResponse);
}
```

**③ 异步通信（消息队列）**

```java
// 生产者（订单服务）
rabbitTemplate.convertAndSend("order-exchange", "order.created", order);

// 消费者（库存服务）
@RabbitListener(queues = "inventory-queue")
public void handleOrderCreated(Order order) {
    // 扣减库存
}
```

**9. 微服务与单体应用对比**

| 对比维度 | 单体应用 | 微服务 |
|---------|---------|--------|
| **架构** | 单一应用 | 多个独立服务 |
| **部署** | 整体部署 | 独立部署 |
| **扩展** | 整体扩展 | 按需扩展 |
| **技术栈** | 统一技术栈 | 灵活选择 |
| **开发** | 简单 | 复杂 |
| **运维** | 简单 | 复杂 |
| **故障隔离** | ✗ 差 | ✓ 好 |
| **性能** | 高（本地调用） | 中（网络调用） |
| **适用场景** | 小型应用、MVP | 大型应用、复杂业务 |

**10. 微服务最佳实践**

**① API 网关**

```
所有请求先到网关，统一处理：
  - 路由
  - 认证授权
  - 限流
  - 日志
```

**② 服务注册与发现**

```java
// 服务注册
@EnableDiscoveryClient
@SpringBootApplication
public class UserServiceApplication { }

// 服务发现（自动）
@FeignClient("user-service")
public interface UserClient { }
```

**③ 熔断降级**

```java
@HystrixCommand(fallbackMethod = "fallback")
public User getUser(Long id) {
    return userClient.getUser(id);
}

public User fallback(Long id) {
    return new User(id, "降级用户");
}
```

**④ 链路追踪**

```
请求ID (Trace ID) 贯穿整个调用链：
  网关 [trace-123]
    → 用户服务 [trace-123, span-1]
      → 订单服务 [trace-123, span-2]
```

**⑤ 日志聚合**

```
各服务日志统一收集到 ELK：
  user-service.log   ↘
  order-service.log  → Elasticsearch → Kibana
  product-service.log↗
```

**11. 微服务适用场景**

**✓ 适合使用微服务**：
- 大型复杂系统
- 团队规模大（多团队协作）
- 业务变化快，需要快速迭代
- 不同模块有不同的性能要求
- 需要技术栈灵活性

**✗ 不适合微服务**：
- 小型应用（增加不必要的复杂度）
- 团队规模小（运维成本高）
- 业务简单稳定（收益小）
- 初创公司 MVP（快速上线优先）

**12. 从单体到微服务的演进**

```
阶段 1：单体应用
  └── monolith-app

阶段 2：垂直拆分（按功能模块）
  ├── web-module
  ├── service-module
  └── dao-module

阶段 3：服务化（SOA）
  ├── user-service
  └── order-service

阶段 4：微服务
  ├── user-service
  ├── order-service
  ├── product-service
  ├── payment-service
  └── ...

阶段 5：Service Mesh（服务网格）
  ├── services (业务逻辑)
  └── sidecar (服务治理)
```

**关键要点**

1. 微服务是将大型应用拆分成多个小型独立服务的架构风格
2. 核心特征：独立部署、按业务拆分、轻量级通信、独立数据存储
3. 优势：快速迭代、技术灵活、按需扩展、故障隔离、团队自治
4. 挑战：分布式复杂性、运维难度、分布式事务、数据一致性
5. 适合大型复杂系统，不适合小型简单应用
6. 需要配套服务治理组件：注册中心、网关、配置中心、链路追踪等

**记忆口诀**：微服务小而美，独立部署易扩展，按需拆分业务能力，轻量通信REST为先，故障隔离容错设计，服务治理不可缺

### 68. 什么是 Eureka？

**1. 核心定义**

Eureka 是 Netflix 开源的一款**服务注册与发现**组件，是 Spring Cloud 体系中实现服务治理的核心组件之一。Eureka 采用 **CS（Client-Server）架构**，分为 Eureka Server（注册中心）和 Eureka Client（服务提供者和消费者）。

**2. Eureka 架构图**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">Eureka 服务注册与发现架构</text>
<rect x="325" y="70" width="200" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="105" text-anchor="middle" font-size="16" font-weight="bold">Eureka Server</text>
<text x="425" y="130" text-anchor="middle" font-size="13">注册中心</text>
<rect x="100" y="220" width="150" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="175" y="250" text-anchor="middle" font-size="14" font-weight="bold">服务提供者 A</text>
<text x="175" y="275" text-anchor="middle" font-size="11">(user-service)</text>
<text x="110" y="295" font-size="10">① 注册</text>
<text x="110" y="310" font-size="10">② 续约 (心跳)</text>
<rect x="350" y="220" width="150" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="425" y="250" text-anchor="middle" font-size="14" font-weight="bold">服务提供者 B</text>
<text x="425" y="275" text-anchor="middle" font-size="11">(order-service)</text>
<text x="360" y="295" font-size="10">① 注册</text>
<text x="360" y="310" font-size="10">② 续约 (心跳)</text>
<rect x="600" y="220" width="150" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="675" y="250" text-anchor="middle" font-size="14" font-weight="bold">服务消费者</text>
<text x="675" y="275" text-anchor="middle" font-size="11">(gateway)</text>
<text x="610" y="295" font-size="10">③ 获取服务列表</text>
<text x="610" y="310" font-size="10">④ 调用服务</text>
<line x1="175" y1="220" x2="375" y2="150" stroke="#f57c00" stroke-width="2" marker-end="url(#ar1)"/>
<line x1="425" y1="220" x2="425" y2="150" stroke="#388e3c" stroke-width="2" marker-end="url(#ar2)"/>
<line x1="600" y1="250" x2="525" y2="140" stroke="#7b1fa2" stroke-width="2" marker-end="url(#ar3)"/>
<text x="250" y="180" font-size="11" fill="#f57c00">注册</text>
<text x="435" y="180" font-size="11" fill="#388e3c">注册</text>
<text x="550" y="180" font-size="11" fill="#7b1fa2">拉取</text>
<line x1="600" y1="270" x2="500" y2="270" stroke="#7b1fa2" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#ar4)"/>
<text x="545" y="265" font-size="10" fill="#7b1fa2">调用</text>
<rect x="250" y="370" width="350" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="425" y="400" text-anchor="middle" font-size="13" font-weight="bold">核心机制</text>
<text x="270" y="425" font-size="11">• 服务注册 (Register)</text>
<text x="270" y="440" font-size="11">• 服务续约 (Renew)</text>
<text x="450" y="425" font-size="11">• 服务下线 (Cancel)</text>
<text x="450" y="440" font-size="11">• 服务剔除 (Evict)</text>
<defs>
<marker id="ar1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#f57c00"/>
</marker>
<marker id="ar2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#388e3c"/>
</marker>
<marker id="ar3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#7b1fa2"/>
</marker>
<marker id="ar4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#7b1fa2"/>
</marker>
</defs>
</svg>

**3. Eureka 核心概念**

**① Eureka Server（服务端）**

- **作用**：服务注册中心
- **功能**：
  - 接收服务注册
  - 保存服务实例信息
  - 提供服务发现
  - 服务健康检查

**② Eureka Client（客户端）**

- **作用**：服务提供者和消费者
- **功能**：
  - 注册到 Eureka Server
  - 定时发送心跳（续约）
  - 获取服务列表
  - 调用其他服务

**③ 服务注册表（Registry）**

```
服务注册表结构：
{
  "user-service": [
    {"instanceId": "user-service-1", "host": "192.168.1.10", "port": 8081},
    {"instanceId": "user-service-2", "host": "192.168.1.11", "port": 8081}
  ],
  "order-service": [
    {"instanceId": "order-service-1", "host": "192.168.1.20", "port": 8082}
  ]
}
```

**4. Eureka 工作流程**

**① 服务注册**

```java
// 服务启动时自动注册到 Eureka Server
@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
```

```yaml
# application.yml
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
spring:
  application:
    name: user-service
```

**流程**：
1. 服务启动
2. 向 Eureka Server 发送 **POST /eureka/apps/{appName}**
3. Eureka Server 保存服务实例信息

**② 服务续约（心跳）**

```yaml
eureka:
  instance:
    lease-renewal-interval-in-seconds: 30  # 心跳间隔（默认30秒）
```

**流程**：
1. 服务每 30 秒发送一次心跳到 Eureka Server
2. Eureka Server 更新服务最后心跳时间
3. 如果 90 秒内没有收到心跳，服务会被剔除

**③ 服务发现**

```java
// 方式 1：通过 DiscoveryClient
@Autowired
private DiscoveryClient discoveryClient;

public List<ServiceInstance> getInstances(String serviceName) {
    return discoveryClient.getInstances(serviceName);
}

// 方式 2：通过 @LoadBalanced RestTemplate
@LoadBalanced
@Bean
public RestTemplate restTemplate() {
    return new RestTemplate();
}

// 使用服务名调用
String url = "http://user-service/users/1";
User user = restTemplate.getForObject(url, User.class);
```

**④ 服务下线**

```java
// 服务正常关闭时，会发送下线请求
// DELETE /eureka/apps/{appName}/{instanceId}
```

**⑤ 服务剔除**

```yaml
eureka:
  server:
    eviction-interval-timer-in-ms: 60000  # 剔除间隔（默认60秒）
```

**流程**：
1. Eureka Server 每 60 秒检查一次服务状态
2. 如果服务超过 90 秒没有心跳，从注册表中剔除

**5. Eureka Server 搭建**

**① 添加依赖**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

**② 启动类**

```java
@SpringBootApplication
@EnableEurekaServer  // 开启 Eureka Server
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
```

**③ 配置文件**

```yaml
server:
  port: 8761

eureka:
  instance:
    hostname: localhost
  client:
    register-with-eureka: false  # 不注册自己
    fetch-registry: false         # 不拉取注册表
    service-url:
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```

**访问控制台**：http://localhost:8761

**6. Eureka Client 配置**

**① 服务提供者**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

```java
@SpringBootApplication
@EnableEurekaClient  // 或 @EnableDiscoveryClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
```

```yaml
spring:
  application:
    name: user-service

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true  # 使用 IP 注册
    instance-id: ${spring.cloud.client.ip-address}:${server.port}
```

**② 服务消费者**

```java
@SpringBootApplication
@EnableEurekaClient
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}

@Configuration
public class RestConfig {
    @LoadBalanced  // 开启负载均衡
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

```java
@Service
public class OrderService {
    @Autowired
    private RestTemplate restTemplate;

    public User getUserById(Long userId) {
        // 使用服务名调用
        String url = "http://user-service/users/" + userId;
        return restTemplate.getForObject(url, User.class);
    }
}
```

**7. Eureka 高可用（集群）**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">Eureka 集群架构</text>
<rect x="120" y="80" width="180" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="210" y="115" text-anchor="middle" font-size="14" font-weight="bold">Eureka Server 1</text>
<text x="210" y="140" text-anchor="middle" font-size="11">peer1:8761</text>
<rect x="500" y="80" width="180" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="590" y="115" text-anchor="middle" font-size="14" font-weight="bold">Eureka Server 2</text>
<text x="590" y="140" text-anchor="middle" font-size="11">peer2:8762</text>
<line x1="300" y1="120" x2="500" y2="120" stroke="#1976d2" stroke-width="2"/>
<line x1="500" y1="140" x2="300" y2="140" stroke="#1976d2" stroke-width="2"/>
<text x="400" y="115" text-anchor="middle" font-size="10" fill="#1976d2">相互注册</text>
<text x="400" y="155" text-anchor="middle" font-size="10" fill="#1976d2">数据同步</text>
<rect x="100" y="240" width="140" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="170" y="270" text-anchor="middle" font-size="12">服务 A-1</text>
<rect x="260" y="240" width="140" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="330" y="270" text-anchor="middle" font-size="12">服务 A-2</text>
<rect x="420" y="240" width="140" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="490" y="270" text-anchor="middle" font-size="12">服务 B-1</text>
<rect x="580" y="240" width="140" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="650" y="270" text-anchor="middle" font-size="12">服务 B-2</text>
<line x1="170" y1="240" x2="200" y2="160" stroke="#f57c00" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="330" y1="240" x2="220" y2="160" stroke="#f57c00" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="490" y1="240" x2="580" y2="160" stroke="#388e3c" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="650" y1="240" x2="600" y2="160" stroke="#388e3c" stroke-width="1" stroke-dasharray="3,3"/>
<text x="400" y="350" text-anchor="middle" font-size="13" fill="#666">各服务可以注册到任一 Eureka Server，集群自动同步数据</text>
</svg>

**配置示例**：

**Server 1 配置：**
```yaml
server:
  port: 8761

eureka:
  instance:
    hostname: peer1
  client:
    service-url:
      defaultZone: http://peer2:8762/eureka/
```

**Server 2 配置：**
```yaml
server:
  port: 8762

eureka:
  instance:
    hostname: peer2
  client:
    service-url:
      defaultZone: http://peer1:8761/eureka/
```

**8. Eureka 自我保护机制**

**① 什么是自我保护？**

当 Eureka Server 在短时间内丢失过多客户端时（网络故障或服务大量下线），会进入自我保护模式，不再剔除任何服务。

**② 触发条件**

```
每分钟心跳次数 < (服务总数 × 2) × 0.85
```

**③ 保护模式现象**

- Eureka Server 首页出现红色警告
- 不再剔除任何服务（即使没有心跳）

**④ 配置**

```yaml
eureka:
  server:
    enable-self-preservation: true  # 是否开启自我保护（默认true）
    renewal-percent-threshold: 0.85  # 触发阈值（默认0.85）
```

**⑤ 是否关闭？**

```yaml
# 开发环境：建议关闭（方便测试）
eureka:
  server:
    enable-self-preservation: false

# 生产环境：建议开启（防止网络抖动导致服务被错误剔除）
eureka:
  server:
    enable-self-preservation: true
```

**9. Eureka 核心配置**

**① Server 端配置**

```yaml
eureka:
  server:
    enable-self-preservation: true             # 自我保护
    eviction-interval-timer-in-ms: 60000       # 剔除间隔（60秒）
    renewal-percent-threshold: 0.85            # 触发自我保护阈值
    response-cache-update-interval-ms: 30000   # 缓存更新间隔（30秒）
```

**② Client 端配置**

```yaml
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/  # 注册中心地址
    register-with-eureka: true                     # 是否注册
    fetch-registry: true                           # 是否拉取注册表
    registry-fetch-interval-seconds: 30            # 拉取间隔（30秒）
  instance:
    prefer-ip-address: true                        # 使用IP注册
    lease-renewal-interval-in-seconds: 30          # 心跳间隔（30秒）
    lease-expiration-duration-in-seconds: 90       # 过期时间（90秒）
    instance-id: ${spring.cloud.client.ip-address}:${server.port}
```

**10. Eureka vs 其他注册中心**

| 对比维度 | Eureka | Consul | Nacos | Zookeeper |
|---------|--------|--------|-------|-----------|
| **语言** | Java | Go | Java | Java |
| **CAP** | AP（可用性优先） | CP | AP/CP可选 | CP |
| **健康检查** | Client心跳 | TCP/HTTP/gRPC | TCP/HTTP/MySQL | Keep Alive |
| **负载均衡** | Ribbon | Fabio | 内置 | - |
| **界面** | ✓ | ✓ | ✓✓ | ✗ |
| **Spring Cloud** | ✓✓ | ✓ | ✓✓ | ✓ |
| **维护状态** | 停止更新 | ✓ 活跃 | ✓✓ 活跃 | ✓ 活跃 |

**11. Eureka 优缺点**

**优点**：
- ✓ 与 Spring Cloud 无缝集成
- ✓ 配置简单，开箱即用
- ✓ AP 架构，可用性高
- ✓ 自我保护机制

**缺点**：
- ✗ Netflix 已停止维护（2.x 版本）
- ✗ 服务信息同步有延迟（最长 90 秒）
- ✗ 功能相对简单（仅服务注册发现）
- ✗ 不支持配置中心

**12. Eureka 替代方案**

```
Eureka (停更) → 迁移选择：

① Nacos (推荐)
  - 阿里开源
  - 注册中心 + 配置中心
  - 活跃维护
  - 功能强大

② Consul
  - HashiCorp 开源
  - 多数据中心支持
  - 健康检查丰富

③ Zookeeper
  - Apache 项目
  - 强一致性 (CP)
  - 功能简单
```

**13. Eureka 典型问题**

**① 服务下线延迟**

```
问题：服务已停止，但消费者仍能获取到该实例

原因：
  - 心跳间隔 30 秒
  - 剔除检查 60 秒
  - 缓存更新 30 秒

最长延迟 = 30 + 60 + 30 = 120 秒

解决：
  - 缩短心跳间隔
  - 缩短剔除间隔
  - 使用健康检查
```

**② 自我保护导致无法剔除**

```
问题：服务已停止，但长时间不剔除

原因：触发自我保护模式

解决：
  - 开发环境关闭自我保护
  - 生产环境适当调整阈值
```

**③ 集群数据不一致**

```
问题：不同 Eureka Server 数据不一致

原因：AP 架构，最终一致性

解决：等待数据同步完成（通常 30-60 秒）
```

**关键要点**

1. Eureka 是 Netflix 开源的服务注册与发现组件
2. 采用 CS 架构：Server（注册中心）+ Client（服务）
3. 核心机制：服务注册、续约（心跳）、下线、剔除
4. 支持集群部署，相互注册，数据同步
5. AP 架构，优先保证可用性
6. 自我保护机制防止网络故障导致服务误剔除
7. 已停止维护，推荐迁移到 Nacos 或 Consul

**记忆口诀**：Eureka 注册中心，服务注册与发现，心跳续约自我保护，AP架构可用优先，Netflix停更选Nacos

### 69. 什么是 Ribbon？

**1. 核心定义**

Ribbon 是 Netflix 开源的一款**客户端负载均衡**组件，它是一个基于 HTTP 和 TCP 的客户端负载均衡器。在 Spring Cloud 中，Ribbon 与 Eureka、RestTemplate 配合使用,实现服务间调用的负载均衡。

**简单来说**：Ribbon = 客户端负载均衡 + 服务调用

**2. 负载均衡分类**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">服务端负载均衡 vs 客户端负载均衡</text>
<text x="200" y="70" text-anchor="middle" font-size="15" font-weight="bold">服务端负载均衡</text>
<rect x="150" y="100" width="100" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="200" y="130" text-anchor="middle" font-size="12">客户端</text>
<rect x="150" y="200" width="100" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="200" y="225" text-anchor="middle" font-size="12">负载均衡器</text>
<text x="200" y="245" text-anchor="middle" font-size="10">(Nginx/LVS)</text>
<rect x="80" y="310" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="120" y="340" text-anchor="middle" font-size="11">服务1</text>
<rect x="170" y="310" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="210" y="340" text-anchor="middle" font-size="11">服务2</text>
<rect x="260" y="310" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="300" y="340" text-anchor="middle" font-size="11">服务3</text>
<line x1="200" y1="150" x2="200" y2="200" stroke="#1976d2" stroke-width="2" marker-end="url(#a1)"/>
<line x1="180" y1="260" x2="120" y2="310" stroke="#f57c00" stroke-width="2" marker-end="url(#a2)"/>
<line x1="200" y1="260" x2="210" y2="310" stroke="#f57c00" stroke-width="2" marker-end="url(#a2)"/>
<line x1="220" y1="260" x2="300" y2="310" stroke="#f57c00" stroke-width="2" marker-end="url(#a2)"/>
<text x="200" y="175" font-size="10" fill="#666">请求</text>
<text x="200" y="420" text-anchor="middle" font-size="11" fill="#c62828">• 负载均衡器统一分发</text>
<text x="200" y="440" text-anchor="middle" font-size="11" fill="#c62828">• 需要额外硬件/软件</text>
<text x="650" y="70" text-anchor="middle" font-size="15" font-weight="bold">客户端负载均衡 (Ribbon)</text>
<rect x="600" y="100" width="100" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="650" y="130" text-anchor="middle" font-size="12">客户端</text>
<text x="650" y="150" text-anchor="middle" font-size="11">(内置Ribbon)</text>
<text x="650" y="165" text-anchor="middle" font-size="10">负载均衡</text>
<rect x="530" y="240" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="570" y="270" text-anchor="middle" font-size="11">服务1</text>
<rect x="620" y="240" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="660" y="270" text-anchor="middle" font-size="11">服务2</text>
<rect x="710" y="240" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="750" y="270" text-anchor="middle" font-size="11">服务3</text>
<line x1="630" y1="180" x2="570" y2="240" stroke="#1976d2" stroke-width="2" marker-end="url(#a3)"/>
<line x1="650" y1="180" x2="660" y2="240" stroke="#1976d2" stroke-width="2" marker-end="url(#a3)"/>
<line x1="670" y1="180" x2="750" y2="240" stroke="#1976d2" stroke-width="2" marker-end="url(#a3)"/>
<text x="590" y="215" font-size="10" fill="#1976d2">选择</text>
<text x="650" y="420" text-anchor="middle" font-size="11" fill="#388e3c">• 客户端自己选择服务</text>
<text x="650" y="440" text-anchor="middle" font-size="11" fill="#388e3c">• 无需额外组件</text>
<rect x="500" y="320" width="300" height="40" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="650" y="345" text-anchor="middle" font-size="11" font-weight="bold">从注册中心获取服务列表</text>
<line x1="650" y1="290" x2="650" y2="320" stroke="#f57f17" stroke-width="1" stroke-dasharray="3,3"/>
<defs>
<marker id="a1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976d2"/>
</marker>
<marker id="a2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#f57c00"/>
</marker>
<marker id="a3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976d2"/>
</marker>
</defs>
</svg>

**3. Ribbon 工作原理**

<svg viewBox="0 0 850 450" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">Ribbon 负载均衡流程</text>
<rect x="50" y="80" width="150" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="110" text-anchor="middle" font-size="13" font-weight="bold">① 发起请求</text>
<text x="70" y="135" font-size="10">RestTemplate</text>
<text x="70" y="150" font-size="10">.getForObject(...)</text>
<rect x="250" y="80" width="150" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="325" y="110" text-anchor="middle" font-size="13" font-weight="bold">② 拦截请求</text>
<text x="270" y="135" font-size="10">LoadBalancer</text>
<text x="270" y="150" font-size="10">Interceptor</text>
<rect x="450" y="80" width="150" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="525" y="110" text-anchor="middle" font-size="13" font-weight="bold">③ 获取服务列表</text>
<text x="470" y="135" font-size="10">从 Eureka</text>
<text x="470" y="150" font-size="10">获取实例列表</text>
<rect x="650" y="80" width="150" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="725" y="110" text-anchor="middle" font-size="13" font-weight="bold">④ 负载均衡</text>
<text x="670" y="135" font-size="10">根据策略</text>
<text x="670" y="150" font-size="10">选择实例</text>
<rect x="350" y="220" width="150" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="425" y="250" text-anchor="middle" font-size="13" font-weight="bold">⑤ 发送请求</text>
<text x="370" y="275" font-size="10">真实 IP:PORT</text>
<text x="370" y="290" font-size="10">发起 HTTP 调用</text>
<rect x="250" y="350" width="350" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="425" y="375" text-anchor="middle" font-size="12" font-weight="bold">服务实例列表</text>
<text x="270" y="395" font-size="10">192.168.1.10:8081  192.168.1.11:8081  192.168.1.12:8081</text>
<line x1="200" y1="120" x2="250" y2="120" stroke="#666" stroke-width="2" marker-end="url(#ar1)"/>
<line x1="400" y1="120" x2="450" y2="120" stroke="#666" stroke-width="2" marker-end="url(#ar1)"/>
<line x1="600" y1="120" x2="650" y2="120" stroke="#666" stroke-width="2" marker-end="url(#ar1)"/>
<line x1="725" y1="160" x2="500" y2="220" stroke="#666" stroke-width="2" marker-end="url(#ar1)"/>
<line x1="425" y1="300" x2="425" y2="350" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<defs>
<marker id="ar1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
</svg>

**4. Ribbon 核心组件**

**① IRule（负载均衡策略）**

| 策略类 | 策略说明 |
|--------|---------|
| **RoundRobinRule** | 轮询策略（默认） |
| **RandomRule** | 随机策略 |
| **RetryRule** | 重试策略（先轮询，失败后重试） |
| **WeightedResponseTimeRule** | 响应时间加权策略 |
| **BestAvailableRule** | 最小并发策略 |
| **AvailabilityFilteringRule** | 可用过滤策略 |
| **ZoneAvoidanceRule** | 区域权衡策略 |

**② ServerList（服务列表）**

从注册中心获取服务实例列表。

**③ ServerListFilter（服务过滤）**

过滤不可用的服务实例。

**④ ILoadBalancer（负载均衡器）**

核心负载均衡器，协调各组件工作。

**5. Ribbon 使用方式**

**方式一：@LoadBalanced + RestTemplate**

```java
@Configuration
public class RestConfig {

    @LoadBalanced  // 开启负载均衡
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

```java
@Service
public class OrderService {

    @Autowired
    private RestTemplate restTemplate;

    public User getUserById(Long userId) {
        // 使用服务名调用，Ribbon 自动负载均衡
        String url = "http://user-service/users/" + userId;
        return restTemplate.getForObject(url, User.class);
    }
}
```

**方式二：Feign（内置 Ribbon）**

```java
@FeignClient(name = "user-service")  // Feign 内部使用 Ribbon
public interface UserClient {
    @GetMapping("/users/{id}")
    User getUserById(@PathVariable Long id);
}
```

**6. Ribbon 负载均衡策略**

**① 轮询策略（默认）**

```java
@Configuration
public class RibbonConfig {
    @Bean
    public IRule ribbonRule() {
        return new RoundRobinRule();  // 轮询
    }
}
```

**流程**：
```
请求1 → 实例1
请求2 → 实例2
请求3 → 实例3
请求4 → 实例1  (循环)
```

**② 随机策略**

```java
@Bean
public IRule ribbonRule() {
    return new RandomRule();  // 随机
}
```

**③ 重试策略**

```java
@Bean
public IRule ribbonRule() {
    return new RetryRule();  // 失败后重试
}
```

**④ 响应时间加权策略**

```java
@Bean
public IRule ribbonRule() {
    return new WeightedResponseTimeRule();  // 响应时间短的权重高
}
```

**⑤ 最小并发策略**

```java
@Bean
public IRule ribbonRule() {
    return new BestAvailableRule();  // 选择并发最小的实例
}
```

**⑥ 自定义策略**

```java
public class MyRule extends AbstractLoadBalancerRule {
    @Override
    public Server choose(Object key) {
        // 自定义负载均衡逻辑
        List<Server> servers = getLoadBalancer().getReachableServers();
        // 自定义选择逻辑
        return servers.get(0);
    }
}

@Bean
public IRule ribbonRule() {
    return new MyRule();
}
```

**7. Ribbon 配置方式**

**方式一：全局配置**

```yaml
# application.yml
ribbon:
  ConnectTimeout: 1000          # 连接超时（毫秒）
  ReadTimeout: 3000             # 读取超时（毫秒）
  OkToRetryOnAllOperations: false  # 是否对所有操作重试
  MaxAutoRetries: 0             # 同一实例最大重试次数
  MaxAutoRetriesNextServer: 1   # 切换实例重试次数
  NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
```

**方式二：针对特定服务配置**

```yaml
# 针对 user-service 的配置
user-service:
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
    ConnectTimeout: 500
    ReadTimeout: 2000
```

**方式三：Java 配置类**

```java
@Configuration
public class RibbonConfig {

    @Bean
    public IRule ribbonRule() {
        return new RandomRule();  // 负载均衡策略
    }

    @Bean
    public IClientConfig ribbonClientConfig() {
        DefaultClientConfigImpl config = new DefaultClientConfigImpl();
        config.set(CommonClientConfigKey.ConnectTimeout, 1000);
        config.set(CommonClientConfigKey.ReadTimeout, 3000);
        return config;
    }
}
```

**8. Ribbon 与 Eureka 集成**

```java
// 服务消费者
@SpringBootApplication
@EnableEurekaClient
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}

@Configuration
public class RestConfig {
    @LoadBalanced
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

**流程**：
```
1. 订单服务从 Eureka 获取 user-service 的实例列表
   → [192.168.1.10:8081, 192.168.1.11:8081, 192.168.1.12:8081]

2. Ribbon 根据负载均衡策略选择一个实例
   → 192.168.1.10:8081

3. RestTemplate 发起请求
   → http://192.168.1.10:8081/users/1
```

**9. Ribbon 饥饿加载**

**默认行为**：Ribbon 首次调用时才初始化，导致第一次请求慢。

**解决方案**：启用饥饿加载

```yaml
ribbon:
  eager-load:
    enabled: true  # 开启饥饿加载
    clients:       # 指定需要饥饿加载的服务
      - user-service
      - order-service
```

**10. Ribbon 重试机制**

```yaml
user-service:
  ribbon:
    # 同一实例重试次数（不包括首次）
    MaxAutoRetries: 1
    # 切换实例重试次数
    MaxAutoRetriesNextServer: 2
    # 对所有操作重试（GET/POST）
    OkToRetryOnAllOperations: false
    # 连接超时
    ConnectTimeout: 1000
    # 读取超时
    ReadTimeout: 3000
```

**重试流程**：
```
请求实例1 失败
  ↓
重试实例1 (MaxAutoRetries=1)
  ↓ 失败
切换到实例2 (MaxAutoRetriesNextServer=2)
  ↓ 失败
切换到实例3
  ↓ 成功
```

**11. Ribbon 核心源码**

**LoadBalancerInterceptor（拦截器）**

```java
public class LoadBalancerInterceptor implements ClientHttpRequestInterceptor {

    private LoadBalancerClient loadBalancer;

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body,
                                       ClientHttpRequestExecution execution) throws IOException {
        final URI originalUri = request.getURI();
        String serviceName = originalUri.getHost();  // 获取服务名

        // 选择服务实例
        ServiceInstance instance = loadBalancer.choose(serviceName);

        // 替换为真实 IP:PORT
        URI uri = loadBalancer.reconstructURI(instance, originalUri);

        // 发起请求
        return execution.execute(new RequestWrapper(request, uri), body);
    }
}
```

**IRule（负载均衡策略接口）**

```java
public interface IRule {
    // 选择服务实例
    Server choose(Object key);

    void setLoadBalancer(ILoadBalancer lb);

    ILoadBalancer getLoadBalancer();
}
```

**12. Ribbon vs Spring Cloud LoadBalancer**

| 对比维度 | Ribbon | Spring Cloud LoadBalancer |
|---------|--------|---------------------------|
| **开发方** | Netflix | Spring Cloud |
| **维护状态** | ✗ 停止维护 | ✓ 活跃 |
| **功能** | 丰富（多种策略） | 简单（轮询、随机） |
| **依赖** | 重（依赖多） | 轻（依赖少） |
| **性能** | 中等 | 较好 |
| **推荐度** | ✗ 不推荐 | ✓✓ 推荐 |

**迁移方案**：

```xml
<!-- 移除 Ribbon -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
    <exclusions>
        <exclusion>
            <groupId>com.netflix.ribbon</groupId>
            <artifactId>ribbon</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- 引入 Spring Cloud LoadBalancer -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
```

**13. Ribbon 常见问题**

**① 超时配置不生效**

```yaml
# ✗ 错误：配置位置错误
ribbon:
  ReadTimeout: 3000

# ✓ 正确：针对特定服务
user-service:
  ribbon:
    ReadTimeout: 3000
```

**② 负载均衡策略不生效**

```java
// ✗ 错误：配置类被 @ComponentScan 扫描到
@Configuration
public class RibbonConfig {
    @Bean
    public IRule ribbonRule() {
        return new RandomRule();
    }
}

// ✓ 正确：配置类不要被扫描到，通过 @RibbonClient 指定
@Configuration
@RibbonClient(name = "user-service", configuration = RibbonConfig.class)
public class MyRibbonConfig { }
```

**③ 第一次请求超时**

```yaml
# 解决：开启饥饿加载
ribbon:
  eager-load:
    enabled: true
    clients:
      - user-service
```

**14. Ribbon 最佳实践**

**① 合理设置超时时间**

```yaml
user-service:
  ribbon:
    ConnectTimeout: 1000  # 连接超时1秒
    ReadTimeout: 3000     # 读取超时3秒
```

**② 根据业务选择策略**

```
读多写少 → WeightedResponseTimeRule (响应时间加权)
均衡访问 → RoundRobinRule (轮询)
快速测试 → RandomRule (随机)
```

**③ 启用饥饿加载**

```yaml
ribbon:
  eager-load:
    enabled: true
    clients: [user-service, order-service]
```

**④ 合理配置重试**

```yaml
user-service:
  ribbon:
    MaxAutoRetries: 0  # 同实例重试0次（避免POST重复提交）
    MaxAutoRetriesNextServer: 1  # 切换实例重试1次
    OkToRetryOnAllOperations: false  # 只重试GET
```

**关键要点**

1. Ribbon 是 Netflix 开源的客户端负载均衡组件
2. 核心功能：从注册中心获取服务列表，根据策略选择实例
3. 支持多种负载均衡策略：轮询、随机、重试、响应时间加权等
4. 通过 @LoadBalanced 注解与 RestTemplate 配合使用
5. 已停止维护，推荐迁移到 Spring Cloud LoadBalancer
6. 支持超时、重试、饥饿加载等配置

**记忆口诀**：Ribbon 客户端负载，轮询随机多策略,从Eureka获取列表,选择实例发请求,Netflix停更要迁移


### 70. 什么是 Feign？

**1. 核心定义**

Feign 是 Netflix 开源的一款**声明式 HTTP 客户端**，它使编写 HTTP 客户端变得更加简单。在 Spring Cloud 中，Feign 集成了 Ribbon（负载均衡）和 Hystrix（熔断），提供了声明式的 REST 客户端调用方式。

**简单来说**：Feign = 声明式 HTTP 客户端 = 用接口 + 注解定义 HTTP 请求

**2. RestTemplate vs Feign**

<svg viewBox="0 0 850 450" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">RestTemplate vs Feign</text>
<text x="200" y="70" text-anchor="middle" font-size="15" font-weight="bold">RestTemplate（编程式）</text>
<rect x="50" y="100" width="300" height="300" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="200" y="130" text-anchor="middle" font-size="13" font-weight="bold">代码示例</text>
<text x="70" y="160" font-size="11" font-family="monospace">String url = "http://</text>
<text x="70" y="180" font-size="11" font-family="monospace">  user-service/users/" + id;</text>
<text x="70" y="200" font-size="11" font-family="monospace">User user = restTemplate</text>
<text x="70" y="220" font-size="11" font-family="monospace">  .getForObject(url,</text>
<text x="70" y="240" font-size="11" font-family="monospace">    User.class);</text>
<text x="200" y="280" text-anchor="middle" font-size="12" font-weight="bold">特点</text>
<text x="70" y="305" font-size="11">✗ URL 拼接繁琐</text>
<text x="70" y="325" font-size="11">✗ 参数手动处理</text>
<text x="70" y="345" font-size="11">✗ 代码冗余</text>
<text x="70" y="365" font-size="11">✓ 灵活度高</text>
<text x="650" y="70" text-anchor="middle" font-size="15" font-weight="bold">Feign（声明式）</text>
<rect x="500" y="100" width="300" height="300" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="650" y="130" text-anchor="middle" font-size="13" font-weight="bold">代码示例</text>
<text x="520" y="160" font-size="11" font-family="monospace">@FeignClient("user-service")</text>
<text x="520" y="180" font-size="11" font-family="monospace">public interface UserClient {</text>
<text x="530" y="200" font-size="11" font-family="monospace">@GetMapping("/users/{id}")</text>
<text x="530" y="220" font-size="11" font-family="monospace">User getUser(</text>
<text x="540" y="240" font-size="11" font-family="monospace">@PathVariable Long id);</text>
<text x="520" y="260" font-size="11" font-family="monospace">}</text>
<text x="650" y="300" text-anchor="middle" font-size="12" font-weight="bold">特点</text>
<text x="520" y="325" font-size="11">✓ 接口定义简洁</text>
<text x="520" y="345" font-size="11">✓ 自动负载均衡</text>
<text x="520" y="365" font-size="11">✓ 集成熔断降级</text>
<text x="520" y="385" font-size="11">✓ 推荐使用</text>
</svg>

**3. Feign 架构**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">Feign 调用流程</text>
<rect x="100" y="80" width="150" height="70" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="175" y="110" text-anchor="middle" font-size="13" font-weight="bold">① 定义接口</text>
<text x="120" y="135" font-size="10">@FeignClient</text>
<rect x="300" y="80" width="150" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="375" y="110" text-anchor="middle" font-size="13" font-weight="bold">② 动态代理</text>
<text x="320" y="135" font-size="10">JDK Proxy</text>
<rect x="500" y="80" width="150" height="70" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="575" y="110" text-anchor="middle" font-size="13" font-weight="bold">③ Ribbon</text>
<text x="520" y="135" font-size="10">负载均衡</text>
<rect x="700" y="80" width="120" height="70" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="760" y="110" text-anchor="middle" font-size="13" font-weight="bold">④ HTTP</text>
<text x="720" y="135" font-size="10">发送请求</text>
<rect x="150" y="200" width="550" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="425" y="230" text-anchor="middle" font-size="13" font-weight="bold">核心组件</text>
<text x="170" y="255" font-size="11">• Encoder/Decoder (编解码器)</text>
<text x="450" y="255" font-size="11">• Contract (契约解析)</text>
<text x="170" y="270" font-size="11">• Logger (日志)</text>
<text x="450" y="270" font-size="11">• Retryer (重试器)</text>
<rect x="200" y="330" width="150" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="275" y="355" text-anchor="middle" font-size="12">Eureka</text>
<text x="275" y="375" text-anchor="middle" font-size="10">服务发现</text>
<rect x="500" y="330" width="150" height="60" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="575" y="355" text-anchor="middle" font-size="12">Hystrix</text>
<text x="575" y="375" text-anchor="middle" font-size="10">熔断降级</text>
<line x1="250" y1="115" x2="300" y2="115" stroke="#666" stroke-width="2" marker-end="url(#a1)"/>
<line x1="450" y1="115" x2="500" y2="115" stroke="#666" stroke-width="2" marker-end="url(#a1)"/>
<line x1="650" y1="115" x2="700" y2="115" stroke="#666" stroke-width="2" marker-end="url(#a1)"/>
<line x1="275" y1="280" x2="275" y2="330" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="575" y1="280" x2="575" y2="330" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<rect x="300" y="430" width="250" height="50" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/>
<text x="425" y="460" text-anchor="middle" font-size="12">目标服务：user-service</text>
<line x1="760" y1="150" x2="525" y2="430" stroke="#7b1fa2" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#a2)"/>
<defs>
<marker id="a1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
<marker id="a2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#7b1fa2"/>
</marker>
</defs>
</svg>

**4. Feign 基本使用**

**① 添加依赖**

```xml
<!-- Spring Cloud OpenFeign -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

**② 启动类开启 Feign**

```java
@SpringBootApplication
@EnableFeignClients  // 开启 Feign 客户端
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}
```

**③ 定义 Feign 接口**

```java
@FeignClient(name = "user-service")  // 指定服务名
public interface UserClient {

    // GET 请求
    @GetMapping("/users/{id}")
    User getUserById(@PathVariable("id") Long id);

    // POST 请求
    @PostMapping("/users")
    User createUser(@RequestBody User user);

    // DELETE 请求
    @DeleteMapping("/users/{id}")
    void deleteUser(@PathVariable("id") Long id);

    // PUT 请求
    @PutMapping("/users/{id}")
    User updateUser(@PathVariable("id") Long id, @RequestBody User user);
}
```

**④ 使用 Feign 客户端**

```java
@Service
public class OrderService {

    @Autowired
    private UserClient userClient;

    public Order createOrder(Long userId) {
        // 调用远程服务
        User user = userClient.getUserById(userId);

        // 业务逻辑
        Order order = new Order();
        order.setUserId(user.getId());
        order.setUsername(user.getUsername());
        // ...
        return order;
    }
}
```

**5. Feign 常用注解**

**① @FeignClient 属性**

```java
@FeignClient(
    name = "user-service",           // 服务名（必填）
    url = "http://localhost:8081",   // 直接指定URL（可选，指定后不走注册中心）
    path = "/api",                   // 统一前缀
    fallback = UserClientFallback.class,  // 降级类
    fallbackFactory = UserClientFallbackFactory.class,  // 降级工厂
    configuration = FeignConfig.class  // 自定义配置
)
public interface UserClient {
    // ...
}
```

**② 请求参数注解**

```java
@FeignClient("user-service")
public interface UserClient {

    // 路径参数
    @GetMapping("/users/{id}")
    User getUser(@PathVariable("id") Long id);

    // 查询参数
    @GetMapping("/users")
    List<User> getUsers(@RequestParam("age") Integer age,
                        @RequestParam("status") String status);

    // 请求体
    @PostMapping("/users")
    User createUser(@RequestBody User user);

    // 请求头
    @GetMapping("/users/{id}")
    User getUser(@PathVariable Long id,
                 @RequestHeader("Authorization") String token);
}
```

**6. Feign 配置**

**① 全局配置（application.yml）**

```yaml
feign:
  client:
    config:
      default:  # 全局配置
        connectTimeout: 5000      # 连接超时（毫秒）
        readTimeout: 10000        # 读取超时（毫秒）
        loggerLevel: full         # 日志级别：NONE/BASIC/HEADERS/FULL
```

**② 针对特定服务配置**

```yaml
feign:
  client:
    config:
      user-service:  # 针对 user-service 的配置
        connectTimeout: 3000
        readTimeout: 5000
        loggerLevel: basic
```

**③ Java 配置类**

```java
@Configuration
public class FeignConfig {

    // 日志级别
    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;  // NONE, BASIC, HEADERS, FULL
    }

    // 超时配置
    @Bean
    public Request.Options options() {
        return new Request.Options(5000, 10000);
    }

    // 拦截器
    @Bean
    public RequestInterceptor requestInterceptor() {
        return template -> {
            // 添加统一请求头
            template.header("Authorization", "Bearer token");
        };
    }

    // 编码器
    @Bean
    public Encoder encoder() {
        return new SpringEncoder(new ObjectFactory<HttpMessageConverters>() {
            @Override
            public HttpMessageConverters getObject() {
                return new HttpMessageConverters(new MappingJackson2HttpMessageConverter());
            }
        });
    }

    // 解码器
    @Bean
    public Decoder decoder() {
        return new SpringDecoder(new ObjectFactory<HttpMessageConverters>() {
            @Override
            public HttpMessageConverters getObject() {
                return new HttpMessageConverters(new MappingJackson2HttpMessageConverter());
            }
        });
    }
}
```

**7. Feign 日志配置**

**① 配置日志级别**

```yaml
# application.yml
logging:
  level:
    com.example.client.UserClient: debug  # 开启 Feign 接口日志

feign:
  client:
    config:
      default:
        loggerLevel: full  # NONE/BASIC/HEADERS/FULL
```

**② 日志级别说明**

| 级别 | 说明 |
|-----|------|
| **NONE** | 不记录任何日志（默认） |
| **BASIC** | 记录请求方法、URL、响应状态码、执行时间 |
| **HEADERS** | 记录 BASIC + 请求和响应头 |
| **FULL** | 记录 HEADERS + 请求和响应体 |

**8. Feign 集成 Hystrix（降级）**

**① 添加依赖**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
```

**② 开启 Hystrix**

```yaml
feign:
  hystrix:
    enabled: true  # 开启 Hystrix
```

**③ 定义降级类**

```java
@Component
public class UserClientFallback implements UserClient {

    @Override
    public User getUserById(Long id) {
        // 降级逻辑
        return new User(id, "降级用户", "fallback@example.com");
    }

    @Override
    public User createUser(User user) {
        throw new RuntimeException("服务降级，无法创建用户");
    }

    @Override
    public void deleteUser(Long id) {
        // 降级：什么都不做
    }

    @Override
    public User updateUser(Long id, User user) {
        throw new RuntimeException("服务降级，无法更新用户");
    }
}
```

**④ 指定降级类**

```java
@FeignClient(name = "user-service", fallback = UserClientFallback.class)
public interface UserClient {
    @GetMapping("/users/{id}")
    User getUserById(@PathVariable Long id);
}
```

**⑤ 降级工厂（获取异常信息）**

```java
@Component
public class UserClientFallbackFactory implements FallbackFactory<UserClient> {

    @Override
    public UserClient create(Throwable cause) {
        return new UserClient() {
            @Override
            public User getUserById(Long id) {
                // 可以获取异常信息
                System.err.println("降级原因：" + cause.getMessage());
                return new User(id, "降级用户", null);
            }

            // 其他方法...
        };
    }
}
```

```java
@FeignClient(name = "user-service", fallbackFactory = UserClientFallbackFactory.class)
public interface UserClient {
    @GetMapping("/users/{id}")
    User getUserById(@PathVariable Long id);
}
```

**9. Feign 文件上传**

```java
@FeignClient(name = "file-service", configuration = MultipartSupportConfig.class)
public interface FileClient {

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    String uploadFile(@RequestPart("file") MultipartFile file);
}
```

**配置类**：

```java
@Configuration
public class MultipartSupportConfig {

    @Bean
    public Encoder feignFormEncoder() {
        return new SpringFormEncoder(new SpringEncoder(new ObjectFactory<HttpMessageConverters>() {
            @Override
            public HttpMessageConverters getObject() {
                return new HttpMessageConverters(new RestTemplate().getMessageConverters());
            }
        }));
    }
}
```

**10. Feign 拦截器**

**① 统一添加请求头**

```java
@Component
public class FeignAuthInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        // 从上下文获取 token
        String token = TokenContext.getToken();

        // 添加到请求头
        if (token != null) {
            template.header("Authorization", "Bearer " + token);
        }
    }
}
```

**② 配置拦截器**

```java
@Configuration
public class FeignConfig {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return new FeignAuthInterceptor();
    }
}
```

**11. Feign 重试机制**

**默认重试器**：

```java
@Bean
public Retryer retryer() {
    // 参数：初始间隔、最大间隔、最大重试次数
    return new Retryer.Default(100, 1000, 3);
}
```

**禁用重试**：

```java
@Bean
public Retryer retryer() {
    return Retryer.NEVER_RETRY;  // 不重试
}
```

**12. Feign vs OpenFeign**

| 对比维度 | Feign | OpenFeign |
|---------|-------|-----------|
| **开发方** | Netflix | Spring Cloud |
| **依赖** | spring-cloud-starter-feign | spring-cloud-starter-openfeign |
| **注解支持** | Feign 注解 | Spring MVC 注解 |
| **维护状态** | ✗ 停止维护 | ✓ 活跃 |
| **推荐度** | ✗ | ✓✓ 推荐 |

**OpenFeign 优势**：
- ✓ 支持 Spring MVC 注解（@GetMapping、@PostMapping 等）
- ✓ Spring Cloud 官方维护
- ✓ 功能更完善

**13. Feign 性能优化**

**① 使用 HTTP 连接池**

```xml
<!-- 添加 Apache HttpClient -->
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-httpclient</artifactId>
</dependency>
```

```yaml
feign:
  httpclient:
    enabled: true               # 启用 HttpClient
    max-connections: 200        # 最大连接数
    max-connections-per-route: 50  # 每个路由最大连接数
```

**② 使用 OkHttp**

```xml
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-okhttp</artifactId>
</dependency>
```

```yaml
feign:
  okhttp:
    enabled: true
  httpclient:
    enabled: false  # 禁用默认的 HttpClient
```

**③ 合理设置超时**

```yaml
feign:
  client:
    config:
      default:
        connectTimeout: 2000  # 连接超时2秒
        readTimeout: 5000     # 读取超时5秒
```

**④ 启用 GZIP 压缩**

```yaml
feign:
  compression:
    request:
      enabled: true              # 启用请求压缩
      mime-types: text/xml,application/xml,application/json  # 压缩类型
      min-request-size: 2048     # 最小压缩大小（字节）
    response:
      enabled: true              # 启用响应压缩
```

**14. Feign 常见问题**

**① 超时问题**

```yaml
# ✗ 错误：只配置了 Feign 超时，Ribbon 超时更短
feign:
  client:
    config:
      default:
        readTimeout: 10000

# ✓ 正确：Ribbon 超时要大于 Feign
feign:
  client:
    config:
      default:
        readTimeout: 10000

ribbon:
  ReadTimeout: 15000
```

**② 日志不生效**

```yaml
# ✗ 错误：没有开启 debug 日志
feign:
  client:
    config:
      default:
        loggerLevel: full

# ✓ 正确：需要同时配置
feign:
  client:
    config:
      default:
        loggerLevel: full

logging:
  level:
    com.example.client: debug  # 开启 Feign 接口日志
```

**③ 降级不生效**

```yaml
# ✗ 错误：没有开启 Hystrix
feign:
  hystrix:
    enabled: false

# ✓ 正确
feign:
  hystrix:
    enabled: true
```

**15. Feign 最佳实践**

**① 单独模块定义 Feign 接口**

```
project-api/        # API 模块
  └── UserClient    # Feign 接口

project-service/    # 服务实现
  └── UserService   # 业务逻辑

project-consumer/   # 消费者
  └── OrderService  # 调用 UserClient
```

**② 统一异常处理**

```java
@Component
public class FeignErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String methodKey, Response response) {
        if (response.status() == 404) {
            return new NotFoundException("资源不存在");
        }
        if (response.status() == 500) {
            return new InternalServerException("服务器错误");
        }
        return new Default().decode(methodKey, response);
    }
}
```

**③ 合理使用降级**

```java
// ✓ 推荐：查询操作返回默认值
@Override
public User getUserById(Long id) {
    return new User(id, "降级用户", null);
}

// ✗ 不推荐：重要操作（如支付）直接降级
@Override
public void pay(PayRequest request) {
    // 应该抛出异常，让上层处理
    throw new ServiceUnavailableException("支付服务不可用");
}
```

**关键要点**

1. Feign 是声明式 HTTP 客户端，通过接口 + 注解定义 HTTP 请求
2. 自动集成 Ribbon（负载均衡）和 Hystrix（熔断降级）
3. 支持多种配置：超时、日志、重试、压缩等
4. OpenFeign 是 Spring Cloud 官方维护的 Feign 实现，推荐使用
5. 可以通过 fallback 或 fallbackFactory 实现降级
6. 性能优化：使用连接池（HttpClient/OkHttp）、压缩、合理设置超时

**记忆口诀**：Feign声明式客户端，接口注解定义请求，集成Ribbon和Hystrix，负载均衡加降级，OpenFeign官方推荐用

### 71. 什么是 Gateway？

**1. 核心定义**

Spring Cloud Gateway 是 Spring Cloud 官方推出的**第二代网关**，基于 Spring 5、Spring Boot 2 和 Project Reactor 构建，提供了一种简单而有效的方式来路由到 API，并为它们提供横切关注点，如：安全性、监控/指标和弹性。

**简单来说**：Gateway = API 网关 = 微服务统一入口 + 路由 + 过滤

**2. 为什么需要网关？**

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">无网关 vs 有网关</text>
<text x="200" y="70" text-anchor="middle" font-size="15" font-weight="bold">无网关</text>
<rect x="80" y="100" width="100" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="130" y="130" text-anchor="middle" font-size="12">客户端</text>
<rect x="80" y="200" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="120" y="230" text-anchor="middle" font-size="10">用户服务</text>
<rect x="180" y="200" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="220" y="230" text-anchor="middle" font-size="10">订单服务</text>
<rect x="280" y="200" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="320" y="230" text-anchor="middle" font-size="10">商品服务</text>
<line x1="110" y1="150" x2="100" y2="200" stroke="#1976d2" stroke-width="2"/>
<line x1="130" y1="150" x2="220" y2="200" stroke="#1976d2" stroke-width="2"/>
<line x1="150" y1="150" x2="320" y2="200" stroke="#1976d2" stroke-width="2"/>
<text x="200" y="300" text-anchor="middle" font-size="11" fill="#c62828">✗ 客户端直连服务</text>
<text x="200" y="320" text-anchor="middle" font-size="11" fill="#c62828">✗ 每个服务独立认证</text>
<text x="200" y="340" text-anchor="middle" font-size="11" fill="#c62828">✗ 跨域问题复杂</text>
<text x="200" y="360" text-anchor="middle" font-size="11" fill="#c62828">✗ 无法统一限流</text>
<text x="650" y="70" text-anchor="middle" font-size="15" font-weight="bold">有网关</text>
<rect x="600" y="100" width="100" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="650" y="130" text-anchor="middle" font-size="12">客户端</text>
<rect x="580" y="200" width="140" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="650" y="225" text-anchor="middle" font-size="13" font-weight="bold">API Gateway</text>
<text x="650" y="245" text-anchor="middle" font-size="10">统一入口</text>
<rect x="510" y="310" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="550" y="340" text-anchor="middle" font-size="10">用户服务</text>
<rect x="610" y="310" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="650" y="340" text-anchor="middle" font-size="10">订单服务</text>
<rect x="710" y="310" width="80" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="750" y="340" text-anchor="middle" font-size="10">商品服务</text>
<line x1="650" y1="150" x2="650" y2="200" stroke="#1976d2" stroke-width="2" marker-end="url(#a1)"/>
<line x1="630" y1="260" x2="550" y2="310" stroke="#f57c00" stroke-width="2"/>
<line x1="650" y1="260" x2="650" y2="310" stroke="#f57c00" stroke-width="2"/>
<line x1="670" y1="260" x2="750" y2="310" stroke="#f57c00" stroke-width="2"/>
<text x="650" y="410" text-anchor="middle" font-size="11" fill="#388e3c">✓ 统一入口</text>
<text x="650" y="430" text-anchor="middle" font-size="11" fill="#388e3c">✓ 统一认证</text>
<text x="650" y="450" text-anchor="middle" font-size="11" fill="#388e3c">✓ 统一限流</text>
<text x="650" y="470" text-anchor="middle" font-size="11" fill="#388e3c">✓ 路由转发</text>
<rect x="500" y="490" width="300" height="40" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="650" y="515" text-anchor="middle" font-size="11">认证、限流、日志、监控...</text>
<line x1="650" y1="260" x2="650" y2="490" stroke="#f57f17" stroke-width="1" stroke-dasharray="3,3"/>
<defs>
<marker id="a1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976d2"/>
</marker>
</defs>
</svg>

**3. Gateway 核心功能**

<svg viewBox="0 0 850 450" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring Cloud Gateway 核心功能</text>
<rect x="325" y="70" width="200" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="105" text-anchor="middle" font-size="16" font-weight="bold">Gateway</text>
<rect x="100" y="180" width="150" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="175" y="210" text-anchor="middle" font-size="13" font-weight="bold">① 路由</text>
<text x="120" y="235" font-size="10">根据规则转发</text>
<rect x="280" y="180" width="150" height="70" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="355" y="210" text-anchor="middle" font-size="13" font-weight="bold">② 断言</text>
<text x="300" y="235" font-size="10">匹配条件</text>
<rect x="460" y="180" width="150" height="70" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="535" y="210" text-anchor="middle" font-size="13" font-weight="bold">③ 过滤</text>
<text x="480" y="235" font-size="10">请求/响应处理</text>
<rect x="640" y="180" width="150" height="70" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="715" y="210" text-anchor="middle" font-size="13" font-weight="bold">④ 限流</text>
<text x="660" y="235" font-size="10">流量控制</text>
<line x1="375" y1="130" x2="175" y2="180" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
<line x1="405" y1="130" x2="355" y2="180" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
<line x1="445" y1="130" x2="535" y2="180" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
<line x1="475" y1="130" x2="715" y2="180" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
<rect x="100" y="300" width="150" height="70" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="175" y="330" text-anchor="middle" font-size="13" font-weight="bold">⑤ 认证授权</text>
<text x="120" y="355" font-size="10">统一鉴权</text>
<rect x="280" y="300" width="150" height="70" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="355" y="330" text-anchor="middle" font-size="13" font-weight="bold">⑥ 监控</text>
<text x="300" y="355" font-size="10">日志、指标</text>
<rect x="460" y="300" width="150" height="70" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="535" y="330" text-anchor="middle" font-size="13" font-weight="bold">⑦ 跨域</text>
<text x="480" y="355" font-size="10">CORS 处理</text>
<rect x="640" y="300" width="150" height="70" fill="#ede7f6" stroke="#5e35b1" stroke-width="2" rx="5"/>
<text x="715" y="330" text-anchor="middle" font-size="13" font-weight="bold">⑧ 熔断</text>
<text x="660" y="355" font-size="10">故障隔离</text>
<line x1="375" y1="130" x2="175" y2="300" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
<line x1="405" y1="130" x2="355" y2="300" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
<line x1="445" y1="130" x2="535" y2="300" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
<line x1="475" y1="130" x2="715" y2="300" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
</svg>

**4. Gateway 核心概念**

**① Route（路由）**

路由是网关的基本组件，由 ID、目标 URI、断言集合、过滤器集合组成。

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service         # 路由ID
          uri: lb://user-service   # 目标URI（lb = LoadBalanced）
          predicates:              # 断言
            - Path=/users/**
          filters:                 # 过滤器
            - StripPrefix=1
```

**② Predicate（断言）**

断言用于匹配 HTTP 请求，决定是否路由到目标服务。

```yaml
predicates:
  - Path=/users/**            # 路径匹配
  - Method=GET,POST           # 请求方法
  - Header=X-Request-Id,\d+   # 请求头
  - Query=name,value          # 查询参数
  - After=2023-01-01T00:00:00.000+08:00  # 时间
```

**③ Filter（过滤器）**

过滤器可以修改请求和响应。

```yaml
filters:
  - AddRequestHeader=X-Request-Color,blue  # 添加请求头
  - AddResponseHeader=X-Response-Color,red # 添加响应头
  - StripPrefix=1                          # 去除路径前缀
  - PrefixPath=/api                        # 添加路径前缀
```

**5. Gateway 基本使用**

**① 添加依赖**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>

<!-- 注册中心（可选） -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

**② 配置路由**

```yaml
server:
  port: 8080

spring:
  application:
    name: gateway-service
  cloud:
    gateway:
      routes:
        # 用户服务路由
        - id: user-service
          uri: lb://user-service  # 从注册中心获取服务
          predicates:
            - Path=/users/**

        # 订单服务路由
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/orders/**

        # 商品服务路由
        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/products/**

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

**③ 启动类**

```java
@SpringBootApplication
@EnableDiscoveryClient  // 开启服务发现
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}
```

**6. Gateway 断言工厂**

**① Path 路径匹配**

```yaml
predicates:
  - Path=/users/**        # 匹配 /users/ 开头的路径
  - Path=/api/v1/**       # 匹配 /api/v1/ 开头
  - Path=/users/{id}      # 路径变量
```

**② Method 方法匹配**

```yaml
predicates:
  - Method=GET            # 只匹配 GET 请求
  - Method=GET,POST       # 匹配 GET 或 POST
```

**③ Header 请求头匹配**

```yaml
predicates:
  - Header=X-Request-Id,\d+  # 请求头存在且值为数字
  - Header=Authorization     # 请求头存在
```

**④ Query 查询参数匹配**

```yaml
predicates:
  - Query=name               # 必须有 name 参数
  - Query=name,zhangsan      # name=zhangsan
  - Query=age,\d+            # age 为数字
```

**⑤ Cookie 匹配**

```yaml
predicates:
  - Cookie=session,abc.*     # Cookie 中 session 的值匹配 abc.*
```

**⑥ Host 主机匹配**

```yaml
predicates:
  - Host=**.example.com      # 主机名匹配
```

**⑦ RemoteAddr IP 匹配**

```yaml
predicates:
  - RemoteAddr=192.168.1.1/24  # IP 地址匹配
```

**⑧ After/Before/Between 时间匹配**

```yaml
predicates:
  - After=2023-01-01T00:00:00.000+08:00   # 2023年后
  - Before=2024-12-31T23:59:59.999+08:00  # 2024年前
  - Between=2023-01-01T00:00:00.000+08:00,2024-12-31T23:59:59.999+08:00
```

**7. Gateway 过滤器工厂**

**① AddRequestHeader/AddResponseHeader**

```yaml
filters:
  - AddRequestHeader=X-Request-Color,blue   # 添加请求头
  - AddResponseHeader=X-Response-Color,red  # 添加响应头
```

**② RemoveRequestHeader/RemoveResponseHeader**

```yaml
filters:
  - RemoveRequestHeader=X-Request-Foo  # 移除请求头
  - RemoveResponseHeader=X-Response-Foo
```

**③ SetRequestHeader/SetResponseHeader**

```yaml
filters:
  - SetRequestHeader=X-Request-Color,blue  # 设置请求头（覆盖）
```

**④ StripPrefix**

```yaml
# 请求：/api/users/1
filters:
  - StripPrefix=1  # 去除第一级路径
# 转发：/users/1
```

**⑤ PrefixPath**

```yaml
# 请求：/users/1
filters:
  - PrefixPath=/api  # 添加路径前缀
# 转发：/api/users/1
```

**⑥ RewritePath**

```yaml
filters:
  - RewritePath=/api/(?<segment>.*), /$\{segment}  # 路径重写
```

**⑦ RedirectTo**

```yaml
filters:
  - RedirectTo=302, https://www.example.com  # 重定向
```

**⑧ RequestRateLimiter（限流）**

```yaml
filters:
  - name: RequestRateLimiter
    args:
      redis-rate-limiter.replenishRate: 10  # 每秒填充速率
      redis-rate-limiter.burstCapacity: 20  # 令牌桶容量
      key-resolver: "#{@ipKeyResolver}"     # key解析器
```

**8. 自定义全局过滤器**

```java
@Component
@Order(-1)  // 优先级（数字越小优先级越高）
public class AuthGlobalFilter implements GlobalFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 获取请求
        ServerHttpRequest request = exchange.getRequest();

        // 获取 token
        String token = request.getHeaders().getFirst("Authorization");

        // 验证 token
        if (token == null || !token.startsWith("Bearer ")) {
            // 认证失败
            ServerHttpResponse response = exchange.getResponse();
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }

        // 认证成功，继续执行
        return chain.filter(exchange);
    }
}
```

**9. 自定义局部过滤器**

```java
@Component
public class CustomGatewayFilterFactory
    extends AbstractGatewayFilterFactory<CustomGatewayFilterFactory.Config> {

    public CustomGatewayFilterFactory() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            // 前置处理
            System.out.println("自定义过滤器：" + config.getName());

            // 继续执行
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                // 后置处理
                System.out.println("响应处理");
            }));
        };
    }

    // 配置类
    public static class Config {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
```

**配置使用**：

```yaml
filters:
  - name: Custom
    args:
      name: myFilter
```

**10. Gateway 限流**

**① 添加 Redis 依赖**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis-reactive</artifactId>
</dependency>
```

**② 配置限流**

```yaml
spring:
  redis:
    host: localhost
    port: 6379
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/users/**
          filters:
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10    # 每秒填充10个令牌
                redis-rate-limiter.burstCapacity: 20    # 令牌桶容量20
                redis-rate-limiter.requestedTokens: 1   # 每次请求消耗1个令牌
                key-resolver: "#{@ipKeyResolver}"       # 按IP限流
```

**③ 定义 KeyResolver**

```java
@Configuration
public class KeyResolverConfig {

    // 按 IP 限流
    @Bean
    public KeyResolver ipKeyResolver() {
        return exchange -> Mono.just(
            exchange.getRequest()
                    .getRemoteAddress()
                    .getAddress()
                    .getHostAddress()
        );
    }

    // 按用户限流
    @Bean
    public KeyResolver userKeyResolver() {
        return exchange -> Mono.just(
            exchange.getRequest()
                    .getHeaders()
                    .getFirst("userId")
        );
    }

    // 按 API 限流
    @Bean
    public KeyResolver apiKeyResolver() {
        return exchange -> Mono.just(
            exchange.getRequest().getPath().value()
        );
    }
}
```

**11. Gateway 跨域配置**

```yaml
spring:
  cloud:
    gateway:
      globalcors:
        cors-configurations:
          '[/**]':
            allowed-origins: "*"              # 允许的源
            allowed-methods:                  # 允许的方法
              - GET
              - POST
              - PUT
              - DELETE
            allowed-headers: "*"              # 允许的请求头
            allow-credentials: true           # 允许携带 Cookie
            max-age: 3600                     # 预检请求缓存时间（秒）
```

**Java 配置方式**：

```java
@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }
}
```

**12. Gateway 熔断**

**① 添加依赖**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-circuitbreaker-reactor-resilience4j</artifactId>
</dependency>
```

**② 配置熔断**

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/users/**
          filters:
            - name: CircuitBreaker
              args:
                name: userServiceCircuitBreaker
                fallbackUri: forward:/fallback/user
```

**③ 定义降级接口**

```java
@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/user")
    public Mono<Map<String, Object>> userFallback() {
        Map<String, Object> result = new HashMap<>();
        result.put("code", 500);
        result.put("message", "用户服务暂时不可用");
        return Mono.just(result);
    }
}
```

**13. Gateway vs Zuul**

| 对比维度 | Gateway | Zuul 1.x |
|---------|---------|----------|
| **底层** | Netty + WebFlux | Servlet |
| **模型** | 异步非阻塞 | 同步阻塞 |
| **性能** | ✓✓ 高 | 中等 |
| **Spring** | 原生支持 | Netflix |
| **维护** | ✓ 活跃 | ✗ 停更 |
| **推荐度** | ✓✓✓ 推荐 | ✗ 不推荐 |

**14. Gateway 最佳实践**

**① 合理使用断言组合**

```yaml
predicates:
  - Path=/api/**
  - Method=GET,POST
  - Header=Authorization
```

**② 统一异常处理**

```java
@Component
@Order(-1)
public class GlobalExceptionHandler implements ErrorWebExceptionHandler {

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        String body = "{\"code\":500,\"message\":\"" + ex.getMessage() + "\"}";
        return response.writeWith(Mono.just(
            response.bufferFactory().wrap(body.getBytes())
        ));
    }
}
```

**③ 日志记录**

```java
@Component
public class LogGlobalFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        long startTime = System.currentTimeMillis();
        String path = exchange.getRequest().getPath().value();

        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            long endTime = System.currentTimeMillis();
            log.info("请求路径：{}，耗时：{}ms", path, endTime - startTime);
        }));
    }

    @Override
    public int getOrder() {
        return -100;
    }
}
```

**关键要点**

1. Gateway 是 Spring Cloud 官方推出的第二代网关，基于 WebFlux
2. 核心概念：Route（路由）、Predicate（断言）、Filter（过滤器）
3. 功能：路由转发、负载均衡、限流、熔断、认证、跨域等
4. 异步非阻塞，性能优于 Zuul
5. 支持多种断言：路径、方法、请求头、查询参数、IP、时间等
6. 支持全局过滤器和局部过滤器
7. 推荐使用，已替代 Zuul

**记忆口诀**：Gateway网关统一入口，路由断言加过滤器，异步非阻塞高性能，限流熔断认证跨域，官方推荐替代Zuul

### 72. 什么是配置中心？Spring Cloud Config 的作用是什么?

**1. 核心定义**

配置中心是微服务架构中用于**集中管理配置**的组件,解决了传统配置管理的痛点。Spring Cloud Config 是 Spring Cloud 官方提供的配置中心解决方案,支持配置的**集中管理、版本控制、动态刷新**。

**简单来说**:配置中心 = 集中存储 + 版本管理 + 动态刷新 + 环境隔离

**2. 为什么需要配置中心?**

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">传统配置 vs 配置中心</text>
<text x="200" y="70" text-anchor="middle" font-size="15" font-weight="bold">传统配置方式</text>
<rect x="60" y="100" width="100" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="110" y="130" text-anchor="middle" font-size="11">用户服务</text>
<rect x="70" y="110" width="80" height="15" fill="#fff9c4" stroke="#f57f17" stroke-width="1" rx="3"/>
<text x="110" y="121" text-anchor="middle" font-size="8">config</text>
<rect x="180" y="100" width="100" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="230" y="130" text-anchor="middle" font-size="11">订单服务</text>
<rect x="190" y="110" width="80" height="15" fill="#fff9c4" stroke="#f57f17" stroke-width="1" rx="3"/>
<text x="230" y="121" text-anchor="middle" font-size="8">config</text>
<rect x="300" y="100" width="100" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="350" y="130" text-anchor="middle" font-size="11">商品服务</text>
<rect x="310" y="110" width="80" height="15" fill="#fff9c4" stroke="#f57f17" stroke-width="1" rx="3"/>
<text x="350" y="121" text-anchor="middle" font-size="8">config</text>
<text x="210" y="180" text-anchor="middle" font-size="11" fill="#c62828">✗ 配置分散在各个服务</text>
<text x="210" y="200" text-anchor="middle" font-size="11" fill="#c62828">✗ 修改需要重启服务</text>
<text x="210" y="220" text-anchor="middle" font-size="11" fill="#c62828">✗ 无版本管理</text>
<text x="210" y="240" text-anchor="middle" font-size="11" fill="#c62828">✗ 环境管理混乱</text>
<text x="210" y="260" text-anchor="middle" font-size="11" fill="#c62828">✗ 敏感信息不安全</text>
<text x="640" y="70" text-anchor="middle" font-size="15" font-weight="bold">配置中心方式</text>
<rect x="560" y="100" width="160" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="640" y="130" text-anchor="middle" font-size="14" font-weight="bold">Config Server</text>
<text x="640" y="148" text-anchor="middle" font-size="10">配置中心</text>
<rect x="480" y="200" width="100" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="530" y="230" text-anchor="middle" font-size="11">用户服务</text>
<rect x="600" y="200" width="100" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="650" y="230" text-anchor="middle" font-size="11">订单服务</text>
<rect x="720" y="200" width="100" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="770" y="230" text-anchor="middle" font-size="11">商品服务</text>
<line x1="600" y1="160" x2="530" y2="200" stroke="#1976d2" stroke-width="2" marker-start="url(#ar1)"/>
<line x1="640" y1="160" x2="650" y2="200" stroke="#1976d2" stroke-width="2" marker-start="url(#ar1)"/>
<line x1="680" y1="160" x2="770" y2="200" stroke="#1976d2" stroke-width="2" marker-start="url(#ar1)"/>
<rect x="560" y="300" width="160" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="640" y="325" text-anchor="middle" font-size="13" font-weight="bold">Git Repository</text>
<text x="640" y="343" text-anchor="middle" font-size="10">版本控制仓库</text>
<line x1="640" y1="160" x2="640" y2="300" stroke="#f57c00" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#ar2)"/>
<text x="640" y="400" text-anchor="middle" font-size="11" fill="#388e3c">✓ 集中管理配置</text>
<text x="640" y="420" text-anchor="middle" font-size="11" fill="#388e3c">✓ 动态刷新无需重启</text>
<text x="640" y="440" text-anchor="middle" font-size="11" fill="#388e3c">✓ Git版本管理</text>
<text x="640" y="460" text-anchor="middle" font-size="11" fill="#388e3c">✓ 环境隔离(dev/test/prod)</text>
<text x="640" y="480" text-anchor="middle" font-size="11" fill="#388e3c">✓ 权限控制</text>
<defs>
<marker id="ar1" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto">
<polygon points="10 0, 10 6, 0 3" fill="#1976d2"/>
</marker>
<marker id="ar2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#f57c00"/>
</marker>
</defs>
</svg>

**3. Spring Cloud Config 架构**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring Cloud Config 架构</text>
<rect x="50" y="80" width="150" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="125" y="110" text-anchor="middle" font-size="14" font-weight="bold">Git Repository</text>
<text x="125" y="130" text-anchor="middle" font-size="10">配置文件仓库</text>
<text x="70" y="150" font-size="9">• user-service.yml</text>
<text x="70" y="163" font-size="9">• order-service.yml</text>
<rect x="325" y="80" width="200" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="110" text-anchor="middle" font-size="14" font-weight="bold">Config Server</text>
<text x="425" y="130" text-anchor="middle" font-size="10">配置服务端</text>
<text x="345" y="150" font-size="9">• 读取Git配置</text>
<text x="345" y="163" font-size="9">• 提供HTTP接口</text>
<rect x="650" y="80" width="150" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="725" y="110" text-anchor="middle" font-size="14" font-weight="bold">Config Client</text>
<text x="725" y="130" text-anchor="middle" font-size="10">配置客户端</text>
<text x="670" y="150" font-size="9">• 用户服务</text>
<text x="670" y="163" font-size="9">• 订单服务</text>
<line x1="200" y1="120" x2="325" y2="120" stroke="#f57c00" stroke-width="2" marker-end="url(#ar3)"/>
<text x="262" y="110" text-anchor="middle" font-size="9">① 读取配置</text>
<line x1="525" y1="120" x2="650" y2="120" stroke="#1976d2" stroke-width="2" marker-end="url(#ar4)"/>
<text x="587" y="110" text-anchor="middle" font-size="9">② 获取配置</text>
<rect x="250" y="220" width="350" height="240" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"/>
<text x="425" y="245" text-anchor="middle" font-size="14" font-weight="bold">配置刷新机制</text>
<rect x="270" y="260" width="130" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="335" y="285" text-anchor="middle" font-size="12" font-weight="bold">Spring Cloud Bus</text>
<text x="290" y="305" font-size="9">消息总线</text>
<rect x="440" y="260" width="140" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="510" y="285" text-anchor="middle" font-size="12" font-weight="bold">Actuator</text>
<text x="460" y="305" font-size="9">/actuator/refresh</text>
<rect x="270" y="350" width="130" height="60" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="335" y="375" text-anchor="middle" font-size="12" font-weight="bold">Webhook</text>
<text x="290" y="395" font-size="9">Git推送触发</text>
<rect x="440" y="350" width="140" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="510" y="375" text-anchor="middle" font-size="12" font-weight="bold">@RefreshScope</text>
<text x="460" y="395" font-size="9">动态刷新Bean</text>
<line x1="335" y1="320" x2="335" y2="350" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="510" y1="320" x2="510" y2="350" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<defs>
<marker id="ar3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#f57c00"/>
</marker>
<marker id="ar4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976d2"/>
</marker>
</defs>
</svg>

**4. Config Server 搭建**

**① 添加依赖**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>

<!-- 服务发现(可选) -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

**② 启动类**

```java
@SpringBootApplication
@EnableConfigServer  // 开启配置服务
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
```

**③ 配置文件**

```yaml
server:
  port: 8888

spring:
  application:
    name: config-server
  cloud:
    config:
      server:
        git:
          uri: https://github.com/xxx/config-repo  # Git仓库地址
          username: xxx                             # Git用户名
          password: xxx                             # Git密码
          default-label: master                     # 默认分支
          search-paths: config                      # 搜索路径
          clone-on-start: true                      # 启动时克隆
```

**5. Config Client 配置**

**① 添加依赖**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>

<!-- 动态刷新 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

**② bootstrap.yml 配置**

```yaml
spring:
  application:
    name: user-service         # 服务名
  cloud:
    config:
      uri: http://localhost:8888    # Config Server地址
      label: master                  # 分支
      profile: dev                   # 环境(dev/test/prod)

# 暴露刷新端点
management:
  endpoints:
    web:
      exposure:
        include: refresh
```

**③ 使用配置**

```java
@RestController
@RefreshScope  // 支持动态刷新
public class UserController {

    @Value("${user.name}")
    private String userName;

    @Value("${user.age}")
    private Integer userAge;

    @GetMapping("/user/info")
    public String getUserInfo() {
        return "name=" + userName + ", age=" + userAge;
    }
}
```

**6. 配置文件命名规则**

Git 仓库中的配置文件命名遵循以下规则:

```
{application}-{profile}.yml
{application}-{profile}.properties
```

**示例**:

```
config-repo/
├── application.yml           # 所有服务的默认配置
├── user-service.yml          # user-service的默认配置
├── user-service-dev.yml      # user-service的dev环境配置
├── user-service-test.yml     # user-service的test环境配置
├── user-service-prod.yml     # user-service的prod环境配置
└── order-service-dev.yml     # order-service的dev环境配置
```

**7. Config Server HTTP 接口**

Config Server 提供以下 HTTP 接口获取配置:

**① 获取配置内容**

```
GET /{application}/{profile}/{label}
GET /{application}-{profile}.yml
GET /{application}-{profile}.properties
GET /{label}/{application}-{profile}.yml
```

**示例**:

```bash
# 获取 user-service 在 dev 环境 master 分支的配置
http://localhost:8888/user-service/dev/master
http://localhost:8888/user-service-dev.yml
http://localhost:8888/master/user-service-dev.yml
```

**响应格式**:

```json
{
  "name": "user-service",
  "profiles": ["dev"],
  "label": "master",
  "version": "abc123",
  "propertySources": [
    {
      "name": "https://github.com/xxx/config-repo/user-service-dev.yml",
      "source": {
        "user.name": "zhangsan",
        "user.age": 18
      }
    }
  ]
}
```

**8. 配置优先级**

配置的优先级从高到低:

**1.** `{application}-{profile}.yml` (特定服务+特定环境)
**2.** `{application}.yml` (特定服务)
**3.** `application-{profile}.yml` (所有服务+特定环境)
**4.** `application.yml` (所有服务)

**示例**:

```
user-service-dev.yml  >  user-service.yml  >  application-dev.yml  >  application.yml
```

**9. 动态刷新配置**

**① 手动刷新**

修改 Git 配置后,通过 POST 请求刷新:

```bash
curl -X POST http://localhost:8080/actuator/refresh
```

**② 自动刷新 - Spring Cloud Bus**

**添加依赖**:

```xml
<!-- Config Server 端 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>

<!-- Config Client 端 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
```

**Config Server 配置**:

```yaml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest

management:
  endpoints:
    web:
      exposure:
        include: bus-refresh  # 暴露总线刷新端点
```

**触发全局刷新**:

```bash
# 刷新所有服务
curl -X POST http://localhost:8888/actuator/bus-refresh

# 刷新指定服务
curl -X POST http://localhost:8888/actuator/bus-refresh/user-service:9001
```

**③ Webhook 自动刷新**

配置 Git Webhook,在代码提交时自动触发刷新:

```
Webhook URL: http://config-server/actuator/bus-refresh
Method: POST
```

**10. 加密敏感配置**

**① 对称加密**

**配置密钥**:

```yaml
encrypt:
  key: mysecretkey  # 对称加密密钥
```

**加密配置**:

```bash
# 加密
curl http://localhost:8888/encrypt -d "mysecret"
# 返回: 682bc583f421682f079ae6be594afefdf...

# 解密
curl http://localhost:8888/decrypt -d "682bc583f421682f079ae6be594afefdf..."
# 返回: mysecret
```

**使用加密配置**:

```yaml
# 配置文件中使用 {cipher} 前缀
spring:
  datasource:
    password: '{cipher}682bc583f421682f079ae6be594afefdf...'
```

**② 非对称加密(RSA)**

**生成密钥对**:

```bash
keytool -genkeypair -alias config-server -keyalg RSA \
  -keystore config-server.jks -storepass password
```

**配置**:

```yaml
encrypt:
  key-store:
    location: classpath:config-server.jks
    password: password
    alias: config-server
    secret: password
```

**11. 高可用配置**

**① Config Server 集群**

```yaml
# Config Server 1
server:
  port: 8888

# Config Server 2
server:
  port: 8889
```

**② 服务发现 + 负载均衡**

**Config Server 注册到 Eureka**:

```yaml
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

**Config Client 通过服务名访问**:

```yaml
spring:
  cloud:
    config:
      discovery:
        enabled: true                   # 启用服务发现
        service-id: config-server       # Config Server服务名
      profile: dev
```

**12. 配置中心对比**

| 功能 | Spring Cloud Config | Apollo | Nacos |
|-----|-------------------|--------|-------|
| **配置存储** | Git/SVN/本地 | 数据库 | 数据库 |
| **管理界面** | ✗ 无 | ✓✓ 优秀 | ✓ 良好 |
| **动态刷新** | ✓ 支持 | ✓ 支持 | ✓ 支持 |
| **版本管理** | ✓✓ Git原生 | ✓ 支持 | ✓ 支持 |
| **灰度发布** | ✗ 不支持 | ✓ 支持 | ✓ 支持 |
| **权限控制** | Git权限 | ✓✓ 细粒度 | ✓ 支持 |
| **学习成本** | ✓ 低 | 中 | ✓ 低 |
| **社区活跃度** | 中 | ✓ 高 | ✓✓ 很高 |

**13. 最佳实践**

**① 环境隔离**

```
config-repo/
├── dev/
│   ├── user-service.yml
│   └── order-service.yml
├── test/
│   ├── user-service.yml
│   └── order-service.yml
└── prod/
    ├── user-service.yml
    └── order-service.yml
```

**② 敏感信息加密**

```yaml
# 数据库密码加密
spring:
  datasource:
    password: '{cipher}AQA...'

# Redis密码加密
spring:
  redis:
    password: '{cipher}AQB...'
```

**③ 本地配置优先**

```yaml
# bootstrap.yml
spring:
  cloud:
    config:
      allow-override: true        # 允许本地覆盖
      override-none: false        # 不允许覆盖none
      override-system-properties: false  # 不允许覆盖系统属性
```

**④ 配置分类管理**

```yaml
# 公共配置
application.yml:
  logging:
    level:
      root: INFO

# 服务配置
user-service.yml:
  server:
    port: 8081

# 环境配置
user-service-dev.yml:
  spring:
    datasource:
      url: jdbc:mysql://localhost:3306/dev_db
```

**⑤ 失败快速响应**

```yaml
spring:
  cloud:
    config:
      fail-fast: true  # 配置中心不可用时快速失败
      retry:
        max-attempts: 6        # 最大重试次数
        initial-interval: 1000 # 初始重试间隔
        max-interval: 2000     # 最大重试间隔
```

**14. 配置刷新流程**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">配置动态刷新流程</text>
<rect x="50" y="70" width="120" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="110" y="100" text-anchor="middle" font-size="12" font-weight="bold">Git 仓库</text>
<rect x="240" y="70" width="120" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="300" y="100" text-anchor="middle" font-size="12" font-weight="bold">Config Server</text>
<rect x="430" y="70" width="120" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="490" y="100" text-anchor="middle" font-size="12" font-weight="bold">RabbitMQ</text>
<rect x="620" y="70" width="120" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="680" y="100" text-anchor="middle" font-size="12" font-weight="bold">微服务</text>
<text x="40" y="170" font-size="11" font-weight="bold">步骤1:</text>
<line x1="110" y1="120" x2="110" y2="160" stroke="#f57c00" stroke-width="2" marker-end="url(#ar5)"/>
<text x="120" y="145" font-size="10">修改配置文件</text>
<text x="40" y="210" font-size="11" font-weight="bold">步骤2:</text>
<line x1="110" y1="180" x2="240" y2="95" stroke="#f57c00" stroke-width="2" marker-end="url(#ar5)"/>
<text x="150" y="175" font-size="10">Webhook通知</text>
<text x="40" y="250" font-size="11" font-weight="bold">步骤3:</text>
<line x1="300" y1="120" x2="300" y2="230" stroke="#1976d2" stroke-width="2" marker-end="url(#ar6)"/>
<text x="310" y="180" font-size="10">拉取最新配置</text>
<line x1="300" y1="250" x2="170" y2="195" stroke="#1976d2" stroke-width="2" marker-end="url(#ar6)"/>
<text x="40" y="290" font-size="11" font-weight="bold">步骤4:</text>
<line x1="360" y1="95" x2="430" y2="95" stroke="#1976d2" stroke-width="2" marker-end="url(#ar6)"/>
<text x="380" y="85" font-size="10">发送刷新消息</text>
<text x="40" y="330" font-size="11" font-weight="bold">步骤5:</text>
<line x1="550" y1="95" x2="620" y2="95" stroke="#7b1fa2" stroke-width="2" marker-end="url(#ar7)"/>
<text x="570" y="85" font-size="10">广播消息</text>
<text x="40" y="370" font-size="11" font-weight="bold">步骤6:</text>
<line x1="680" y1="120" x2="680" y2="350" stroke="#388e3c" stroke-width="2" marker-end="url(#ar8)"/>
<text x="690" y="240" font-size="10">接收消息</text>
<text x="690" y="255" font-size="10">拉取配置</text>
<text x="690" y="270" font-size="10">刷新Bean</text>
<rect x="50" y="400" width="700" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="425" text-anchor="middle" font-size="13" font-weight="bold">关键点</text>
<text x="70" y="445" font-size="10">• Webhook触发:Git提交后自动通知Config Server</text>
<text x="70" y="460" font-size="10">• 消息总线:通过RabbitMQ/Kafka广播刷新事件到所有服务</text>
<text x="70" y="475" font-size="10">• @RefreshScope:标注的Bean会重新初始化,实现配置动态更新</text>
<defs>
<marker id="ar5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#f57c00"/>
</marker>
<marker id="ar6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976d2"/>
</marker>
<marker id="ar7" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#7b1fa2"/>
</marker>
<marker id="ar8" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#388e3c"/>
</marker>
</defs>
</svg>

**关键要点**

**1.** 配置中心用于集中管理微服务配置,解决配置分散、难维护的问题
**2.** Spring Cloud Config 基于 Git 实现版本管理,支持多环境、多服务配置
**3.** 核心组件:Config Server(配置服务端) + Config Client(配置客户端)
**4.** 支持动态刷新:通过 /actuator/refresh 手动刷新或 Spring Cloud Bus 自动刷新
**5.** 配置优先级:{application}-{profile}.yml > {application}.yml > application.yml
**6.** 支持配置加密:对称加密(encrypt.key)或非对称加密(RSA)
**7.** 高可用方案:Config Server 集群 + 服务发现 + 负载均衡
**8.** 最佳实践:环境隔离、敏感信息加密、失败快速响应

**记忆口诀**:配置中心集中管理,Git版本动态刷新,Server提供Client获取,环境隔离敏感加密,Bus总线自动推送,RefreshScope支持更新

### 73. 什么是链路追踪？常用的组件有哪些？

**1. 核心定义**

链路追踪(Distributed Tracing)是一种用于**跟踪和分析分布式系统中请求调用链路**的技术,能够记录一个请求从进入系统到返回的完整路径,包括经过的所有服务、耗时、状态等信息。

**简单来说**:链路追踪 = 请求全链路监控 + 性能分析 + 故障定位

**2. 为什么需要链路追踪?**

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">微服务调用链路复杂性</text>
<rect x="350" y="70" width="150" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="425" y="100" text-anchor="middle" font-size="13" font-weight="bold">用户请求</text>
<rect x="350" y="160" width="150" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="425" y="190" text-anchor="middle" font-size="11">API 网关</text>
<rect x="100" y="260" width="120" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="160" y="290" text-anchor="middle" font-size="11">用户服务</text>
<rect x="280" y="260" width="120" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="340" y="290" text-anchor="middle" font-size="11">订单服务</text>
<rect x="460" y="260" width="120" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="520" y="290" text-anchor="middle" font-size="11">商品服务</text>
<rect x="640" y="260" width="120" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="700" y="290" text-anchor="middle" font-size="11">库存服务</text>
<rect x="100" y="360" width="120" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="160" y="390" text-anchor="middle" font-size="11">支付服务</text>
<rect x="280" y="360" width="120" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="340" y="390" text-anchor="middle" font-size="11">消息服务</text>
<rect x="460" y="360" width="120" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="520" y="390" text-anchor="middle" font-size="11">积分服务</text>
<line x1="425" y1="120" x2="425" y2="160" stroke="#1976d2" stroke-width="2" marker-end="url(#ar1)"/>
<line x1="380" y1="210" x2="160" y2="260" stroke="#388e3c" stroke-width="2" marker-end="url(#ar2)"/>
<line x1="405" y1="210" x2="340" y2="260" stroke="#388e3c" stroke-width="2" marker-end="url(#ar2)"/>
<line x1="445" y1="210" x2="520" y2="260" stroke="#388e3c" stroke-width="2" marker-end="url(#ar2)"/>
<line x1="470" y1="210" x2="700" y2="260" stroke="#388e3c" stroke-width="2" marker-end="url(#ar2)"/>
<line x1="340" y1="310" x2="160" y2="360" stroke="#f57c00" stroke-width="2" marker-end="url(#ar3)"/>
<line x1="340" y1="310" x2="340" y2="360" stroke="#f57c00" stroke-width="2" marker-end="url(#ar3)"/>
<line x1="340" y1="310" x2="520" y2="360" stroke="#f57c00" stroke-width="2" marker-end="url(#ar3)"/>
<rect x="50" y="460" width="750" height="80" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="425" y="485" text-anchor="middle" font-size="13" font-weight="bold">无链路追踪的问题</text>
<text x="70" y="505" font-size="11" fill="#c62828">✗ 请求经过了哪些服务？</text>
<text x="270" y="505" font-size="11" fill="#c62828">✗ 哪个服务响应慢？</text>
<text x="450" y="505" font-size="11" fill="#c62828">✗ 错误发生在哪里？</text>
<text x="70" y="525" font-size="11" fill="#c62828">✗ 服务依赖关系如何？</text>
<text x="270" y="525" font-size="11" fill="#c62828">✗ 性能瓶颈在哪？</text>
<text x="450" y="525" font-size="11" fill="#c62828">✗ 如何优化调用链？</text>
<defs>
<marker id="ar1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976d2"/>
</marker>
<marker id="ar2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#388e3c"/>
</marker>
<marker id="ar3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#f57c00"/>
</marker>
</defs>
</svg>

**3. 链路追踪核心概念**

<svg viewBox="0 0 850 450" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">链路追踪核心概念</text>
<rect x="50" y="70" width="750" height="340" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"/>
<text x="425" y="95" text-anchor="middle" font-size="15" font-weight="bold">Trace (追踪)</text>
<rect x="80" y="110" width="690" height="280" fill="white" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="100" y="135" font-size="12" font-weight="bold">TraceId: abc123</text>
<text x="650" y="135" font-size="11">总耗时: 850ms</text>
<rect x="100" y="150" width="650" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="120" y="170" font-size="11" font-weight="bold">Span 1: API Gateway</text>
<text x="120" y="185" font-size="9">SpanId: span-1</text>
<text x="120" y="198" font-size="9">开始: 0ms  结束: 850ms  耗时: 850ms</text>
<rect x="120" y="220" width="300" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="140" y="240" font-size="11" font-weight="bold">Span 2: 订单服务</text>
<text x="140" y="255" font-size="9">SpanId: span-2  ParentId: span-1</text>
<text x="140" y="268" font-size="9">开始: 10ms  结束: 800ms  耗时: 790ms</text>
<rect x="450" y="220" width="280" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="470" y="240" font-size="11" font-weight="bold">Span 5: 用户服务</text>
<text x="470" y="255" font-size="9">SpanId: span-5  ParentId: span-1</text>
<text x="470" y="268" font-size="9">开始: 800ms  结束: 840ms  耗时: 40ms</text>
<rect x="140" y="290" width="130" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="160" y="310" font-size="10" font-weight="bold">Span 3: 库存服务</text>
<text x="160" y="325" font-size="8">SpanId: span-3</text>
<text x="160" y="337" font-size="8">ParentId: span-2</text>
<text x="160" y="347" font-size="8">耗时: 300ms</text>
<rect x="280" y="290" width="130" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="300" y="310" font-size="10" font-weight="bold">Span 4: 支付服务</text>
<text x="300" y="325" font-size="8">SpanId: span-4</text>
<text x="300" y="337" font-size="8">ParentId: span-2</text>
<text x="300" y="347" font-size="8">耗时: 450ms</text>
<line x1="270" y1="210" x2="205" y2="220" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="270" y1="210" x2="345" y2="220" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<line x1="590" y1="210" x2="590" y2="220" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
<defs>
<marker id="ar4" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
<polygon points="0 0, 8 3, 0 6" fill="#666"/>
</marker>
</defs>
</svg>

**① Trace (追踪)**

一次完整的请求调用链路,从请求进入到响应返回,包含多个 Span。每个 Trace 有唯一的 TraceId。

**② Span (跨度)**

一次服务调用,是 Trace 的基本组成单元。每个 Span 包含:
- **SpanId**: 当前 Span 的唯一标识
- **ParentId**: 父 Span 的 ID
- **TraceId**: 所属 Trace 的 ID
- **开始时间、结束时间**: 用于计算耗时
- **标签(Tags)**: 业务标签,如服务名、方法名
- **日志(Logs)**: 事件日志

**③ Annotation (注解)**

标记事件发生的时间点:
- **CS (Client Send)**: 客户端发起请求
- **SR (Server Receive)**: 服务端接收请求
- **SS (Server Send)**: 服务端返回响应
- **CR (Client Receive)**: 客户端接收响应

**4. 常用链路追踪组件**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">链路追踪组件对比</text>
<rect x="100" y="70" width="180" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="190" y="105" text-anchor="middle" font-size="15" font-weight="bold">Zipkin</text>
<text x="120" y="130" font-size="10">• Twitter开源</text>
<text x="120" y="145" font-size="10">• 简单易用</text>
<text x="120" y="160" font-size="10">• UI界面友好</text>
<rect x="335" y="70" width="180" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="105" text-anchor="middle" font-size="15" font-weight="bold">SkyWalking</text>
<text x="355" y="130" font-size="10">• 国产(Apache)</text>
<text x="355" y="145" font-size="10">• 功能强大</text>
<text x="355" y="160" font-size="10">• 支持多语言</text>
<rect x="570" y="70" width="180" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="3" rx="5"/>
<text x="660" y="105" text-anchor="middle" font-size="15" font-weight="bold">Jaeger</text>
<text x="590" y="130" font-size="10">• Uber开源</text>
<text x="590" y="145" font-size="10">• CNCF项目</text>
<text x="590" y="160" font-size="10">• 性能优秀</text>
<rect x="100" y="200" width="180" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="3" rx="5"/>
<text x="190" y="235" text-anchor="middle" font-size="15" font-weight="bold">Sleuth</text>
<text x="120" y="260" font-size="10">• Spring Cloud</text>
<text x="120" y="275" font-size="10">• 数据收集</text>
<text x="120" y="290" font-size="10">• 需搭配Zipkin</text>
<rect x="335" y="200" width="180" height="100" fill="#fff9c4" stroke="#f57f17" stroke-width="3" rx="5"/>
<text x="425" y="235" text-anchor="middle" font-size="15" font-weight="bold">Pinpoint</text>
<text x="355" y="260" font-size="10">• 韩国开源</text>
<text x="355" y="275" font-size="10">• 无侵入</text>
<text x="355" y="290" font-size="10">• 代码级追踪</text>
<rect x="570" y="200" width="180" height="100" fill="#ffebee" stroke="#c62828" stroke-width="3" rx="5"/>
<text x="660" y="235" text-anchor="middle" font-size="15" font-weight="bold">CAT</text>
<text x="590" y="260" font-size="10">• 美团开源</text>
<text x="590" y="275" font-size="10">• 实时监控</text>
<text x="590" y="290" font-size="10">• 高性能</text>
<rect x="50" y="340" width="750" height="140" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="425" y="365" text-anchor="middle" font-size="14" font-weight="bold">对比维度</text>
<text x="80" y="390" font-size="11" font-weight="bold">侵入性:</text>
<text x="180" y="390" font-size="10">Zipkin(低) < Sleuth(低) < SkyWalking(无) < Pinpoint(无)</text>
<text x="80" y="410" font-size="11" font-weight="bold">功能:</text>
<text x="180" y="410" font-size="10">SkyWalking(✓✓✓) > Pinpoint(✓✓) > Jaeger(✓✓) > Zipkin(✓)</text>
<text x="80" y="430" font-size="11" font-weight="bold">性能:</text>
<text x="180" y="430" font-size="10">Jaeger(✓✓✓) > CAT(✓✓) > SkyWalking(✓✓) > Zipkin(✓)</text>
<text x="80" y="450" font-size="11" font-weight="bold">易用性:</text>
<text x="180" y="450" font-size="10">Zipkin(✓✓✓) > Sleuth+Zipkin(✓✓) > SkyWalking(✓✓) > Pinpoint(✓)</text>
<text x="80" y="470" font-size="11" font-weight="bold">推荐:</text>
<text x="180" y="470" font-size="10" font-weight="bold">Spring Cloud → Sleuth+Zipkin   综合场景 → SkyWalking</text>
</svg>

**5. Sleuth + Zipkin 使用**

**① 搭建 Zipkin Server**

```bash
# 下载 Zipkin Server
curl -sSL https://zipkin.io/quickstart.sh | bash -s

# 启动 Zipkin (默认端口 9411)
java -jar zipkin.jar
```

**访问 UI**: http://localhost:9411

**② Spring Boot 集成 Sleuth**

**添加依赖**:

```xml
<!-- Sleuth -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>

<!-- Zipkin -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-sleuth-zipkin</artifactId>
</dependency>
```

**配置**:

```yaml
spring:
  application:
    name: user-service
  sleuth:
    sampler:
      probability: 1.0  # 采样率 0.0-1.0 (1.0表示100%采样)
  zipkin:
    base-url: http://localhost:9411  # Zipkin地址
    sender:
      type: web  # 发送方式: web(HTTP) / rabbit(MQ) / kafka
```

**③ 使用示例**

```java
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private RestTemplate restTemplate;

    // Sleuth 自动添加 TraceId 和 SpanId
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        // 调用订单服务
        String url = "http://order-service/orders/user/" + id;
        List<Order> orders = restTemplate.getForObject(url, List.class);

        User user = userService.getById(id);
        user.setOrders(orders);
        return user;
    }
}
```

**④ 日志输出**

Sleuth 会自动在日志中添加追踪信息:

```
2024-01-01 10:00:00.123 INFO [user-service,abc123,span-1,true] UserController: 查询用户信息
```

格式: `[应用名,TraceId,SpanId,是否导出到Zipkin]`

**⑤ 自定义 Span**

```java
@Service
public class UserService {

    @Autowired
    private Tracer tracer;

    public User getById(Long id) {
        // 创建自定义 Span
        Span span = tracer.nextSpan().name("getUserById").start();
        try (Tracer.SpanInScope ws = tracer.withSpan(span)) {
            // 添加标签
            span.tag("userId", id.toString());
            span.tag("method", "getById");

            // 业务逻辑
            User user = userMapper.selectById(id);

            // 添加事件
            span.event("user.found");

            return user;
        } catch (Exception e) {
            // 记录异常
            span.error(e);
            throw e;
        } finally {
            // 结束 Span
            span.end();
        }
    }
}
```

**6. SkyWalking 使用**

**① 下载 SkyWalking**

```bash
# 下载
wget https://archive.apache.org/dist/skywalking/8.9.1/apache-skywalking-apm-8.9.1.tar.gz
tar -zxvf apache-skywalking-apm-8.9.1.tar.gz

# 启动 OAP Server (后端服务)
cd apache-skywalking-apm-bin/bin
./oapService.sh

# 启动 UI (默认端口 8080)
./webappService.sh
```

**访问 UI**: http://localhost:8080

**② Java Agent 接入**

**下载 Agent**:

```bash
# Agent 在 SkyWalking 包的 agent 目录
apache-skywalking-apm-bin/agent/
```

**启动应用时添加 Agent**:

```bash
java -javaagent:/path/to/skywalking-agent.jar \
     -Dskywalking.agent.service_name=user-service \
     -Dskywalking.collector.backend_service=localhost:11800 \
     -jar user-service.jar
```

**或配置环境变量**:

```bash
export SW_AGENT_NAME=user-service
export SW_AGENT_COLLECTOR_BACKEND_SERVICES=localhost:11800
java -javaagent:/path/to/skywalking-agent.jar -jar user-service.jar
```

**③ 配置文件方式**

修改 `agent/config/agent.config`:

```properties
# 服务名
agent.service_name=${SW_AGENT_NAME:user-service}

# OAP Server地址
collector.backend_service=${SW_AGENT_COLLECTOR_BACKEND_SERVICES:localhost:11800}

# 采样率
agent.sample_n_per_3_secs=${SW_AGENT_SAMPLE:-1}
```

**④ Spring Boot 集成**

**添加依赖**:

```xml
<dependency>
    <groupId>org.apache.skywalking</groupId>
    <artifactId>apm-toolkit-trace</artifactId>
    <version>8.9.0</version>
</dependency>
```

**使用注解**:

```java
@RestController
public class UserController {

    // 自定义 Span
    @Trace
    @Tag(key = "method", value = "arg[0]")  // 添加标签
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getById(id);
    }

    // 获取 TraceId
    @GetMapping("/trace")
    public String getTraceId() {
        return TraceContext.traceId();
    }
}
```

**⑤ 日志集成**

**Logback 配置**:

```xml
<configuration>
    <!-- SkyWalking 日志格式 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="org.apache.skywalking.apm.toolkit.log.logback.v1.x.TraceIdPatternLogbackLayout">
                <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%tid] [%thread] %-5level %logger - %msg%n</pattern>
            </layout>
        </encoder>
    </appender>
</configuration>
```

日志输出包含 TraceId:

```
2024-01-01 10:00:00.123 [abc123] [http-nio-8080-exec-1] INFO  UserController - 查询用户信息
```

**7. Jaeger 使用**

**① 启动 Jaeger (Docker)**

```bash
docker run -d --name jaeger \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  jaegertracing/all-in-one:latest
```

**访问 UI**: http://localhost:16686

**② Spring Boot 集成**

**添加依赖**:

```xml
<dependency>
    <groupId>io.opentracing.contrib</groupId>
    <artifactId>opentracing-spring-jaeger-cloud-starter</artifactId>
    <version>3.3.1</version>
</dependency>
```

**配置**:

```yaml
opentracing:
  jaeger:
    service-name: user-service
    udp-sender:
      host: localhost
      port: 6831
    probabilistic-sampler:
      sampling-rate: 1.0  # 采样率
```

**8. 链路追踪数据流程**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">链路追踪数据流程</text>
<rect x="100" y="70" width="140" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="170" y="95" text-anchor="middle" font-size="12" font-weight="bold">① 应用服务</text>
<text x="120" y="115" font-size="9">生成追踪数据</text>
<rect x="300" y="70" width="140" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="370" y="95" text-anchor="middle" font-size="12" font-weight="bold">② Agent</text>
<text x="320" y="115" font-size="9">收集&上报</text>
<rect x="500" y="70" width="140" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="570" y="95" text-anchor="middle" font-size="12" font-weight="bold">③ Collector</text>
<text x="520" y="115" font-size="9">接收&处理</text>
<rect x="200" y="190" width="140" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="270" y="215" text-anchor="middle" font-size="12" font-weight="bold">④ 存储</text>
<text x="220" y="235" font-size="9">ES/MySQL/...</text>
<rect x="500" y="190" width="140" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="570" y="215" text-anchor="middle" font-size="12" font-weight="bold">⑤ UI</text>
<text x="520" y="235" font-size="9">可视化展示</text>
<line x1="240" y1="100" x2="300" y2="100" stroke="#1976d2" stroke-width="2" marker-end="url(#ar5)"/>
<line x1="440" y1="100" x2="500" y2="100" stroke="#f57c00" stroke-width="2" marker-end="url(#ar6)"/>
<line x1="570" y1="130" x2="570" y2="190" stroke="#388e3c" stroke-width="2" marker-end="url(#ar7)"/>
<line x1="540" y1="220" x2="340" y2="220" stroke="#7b1fa2" stroke-width="2" marker-end="url(#ar8)"/>
<line x1="500" y1="220" x2="500" y2="220" stroke="#f57f17" stroke-width="2"/>
<rect x="50" y="300" width="750" height="180" fill="#e0f7fa" stroke="#00838f" stroke-width="2" rx="5"/>
<text x="425" y="325" text-anchor="middle" font-size="14" font-weight="bold">关键步骤说明</text>
<text x="70" y="350" font-size="11" font-weight="bold">1. 数据生成:</text>
<text x="150" y="350" font-size="10">应用通过埋点或Agent自动生成 Span 数据(TraceId/SpanId/时间戳/标签等)</text>
<text x="70" y="375" font-size="11" font-weight="bold">2. 数据收集:</text>
<text x="150" y="375" font-size="10">Agent通过HTTP/gRPC/消息队列等方式上报到 Collector</text>
<text x="70" y="400" font-size="11" font-weight="bold">3. 数据处理:</text>
<text x="150" y="400" font-size="10">Collector 接收数据,进行聚合、分析、计算(如依赖关系、拓扑图)</text>
<text x="70" y="425" font-size="11" font-weight="bold">4. 数据存储:</text>
<text x="150" y="425" font-size="10">持久化到 Elasticsearch、MySQL、Cassandra 等存储</text>
<text x="70" y="450" font-size="11" font-weight="bold">5. 数据展示:</text>
<text x="150" y="450" font-size="10">通过 UI 查询和展示调用链路、性能指标、拓扑图等</text>
<text x="70" y="470" font-size="10" font-weight="bold" fill="#d32f2f">关键点: 异步上报避免影响业务性能,采样率控制数据量</text>
<defs>
<marker id="ar5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976d2"/>
</marker>
<marker id="ar6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#f57c00"/>
</marker>
<marker id="ar7" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#388e3c"/>
</marker>
<marker id="ar8" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#7b1fa2"/>
</marker>
</defs>
</svg>

**9. 采样策略**

**① 固定采样**

```yaml
# Sleuth
spring:
  sleuth:
    sampler:
      probability: 0.1  # 10%采样率
```

**② 速率限制采样**

```properties
# SkyWalking
agent.sample_n_per_3_secs=3  # 每3秒采样3个请求
```

**③ 自适应采样**

根据系统负载动态调整采样率。

**10. 链路追踪最佳实践**

**① 合理设置采样率**

```yaml
# 开发环境: 100%
spring.sleuth.sampler.probability=1.0

# 生产环境: 5-10%
spring.sleuth.sampler.probability=0.1
```

**② 添加业务标签**

```java
Span span = tracer.currentSpan();
span.tag("userId", userId);
span.tag("orderId", orderId);
span.tag("amount", amount.toString());
```

**③ 异步处理追踪**

```java
@Async
@NewSpan  // 创建新 Span
public void asyncTask() {
    // 异步任务
}
```

**④ 数据库查询追踪**

大多数链路追踪组件自动支持,也可手动添加:

```java
@Around("execution(* com.example.mapper.*.*(..))")
public Object traceMapper(ProceedingJoinPoint pjp) throws Throwable {
    Span span = tracer.nextSpan().name("db." + pjp.getSignature().getName()).start();
    try (Tracer.SpanInScope ws = tracer.withSpan(span)) {
        span.tag("sql", getSql(pjp));
        return pjp.proceed();
    } finally {
        span.end();
    }
}
```

**⑤ 消息队列追踪**

```java
// 发送消息时传递 TraceId
message.setProperty("traceId", TraceContext.traceId());
message.setProperty("spanId", TraceContext.spanId());

// 接收消息时恢复 Trace 上下文
String traceId = message.getProperty("traceId");
String spanId = message.getProperty("spanId");
```

**关键要点**

**1.** 链路追踪用于跟踪分布式系统中请求的完整调用链路
**2.** 核心概念:Trace(追踪)、Span(跨度)、TraceId/SpanId、Annotation(注解)
**3.** 常用组件:Zipkin(简单易用)、SkyWalking(功能强大)、Jaeger(高性能)
**4.** Spring Cloud 推荐:Sleuth(数据收集) + Zipkin(展示分析)
**5.** SkyWalking 优势:无侵入、功能全面、支持多语言、中文友好
**6.** 采样策略:开发环境100%,生产环境5-10%,避免性能影响
**7.** 数据流程:生成 → Agent收集 → Collector处理 → 存储 → UI展示
**8.** 最佳实践:合理采样、添加业务标签、异步上报、异常追踪

**记忆口诀**:链路追踪全链路,TraceId串起来,Span记录调用点,Sleuth收集Zipkin展,SkyWalking无侵入,采样策略要合理,性能故障快定位

### 74. 什么是分布式事务？如何解决？

**1. 核心定义**

分布式事务是指事务的操作分布在**多个不同的节点**上,需要保证这些操作要么全部成功,要么全部失败。与本地事务不同,分布式事务涉及跨服务、跨数据库、跨网络的协调问题。

**简单来说**:分布式事务 = 多个服务的操作 + 要么全成功要么全失败 + 数据一致性保证

**2. 为什么会有分布式事务问题？**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">单体应用 vs 微服务事务</text>
<text x="200" y="70" text-anchor="middle" font-size="15" font-weight="bold">单体应用(本地事务)</text>
<rect x="100" y="100" width="200" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="200" y="125" text-anchor="middle" font-size="12" font-weight="bold">单体应用</text>
<rect x="120" y="140" width="160" height="90" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="200" y="160" text-anchor="middle" font-size="11" font-weight="bold">数据库</text>
<text x="140" y="185" font-size="9">用户表</text>
<text x="140" y="200" font-size="9">订单表</text>
<text x="140" y="215" font-size="9">库存表</text>
<rect x="100" y="270" width="200" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="200" y="295" text-anchor="middle" font-size="11" font-weight="bold">@Transactional</text>
<text x="120" y="315" font-size="9">一个事务管理所有操作</text>
<text x="200" y="360" text-anchor="middle" font-size="11" fill="#388e3c">✓ 简单可靠</text>
<text x="200" y="380" text-anchor="middle" font-size="11" fill="#388e3c">✓ ACID保证</text>
<text x="640" y="70" text-anchor="middle" font-size="15" font-weight="bold">微服务(分布式事务)</text>
<rect x="460" y="100" width="120" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="520" y="125" text-anchor="middle" font-size="11" font-weight="bold">用户服务</text>
<rect x="470" y="145" width="100" height="25" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="520" y="161" text-anchor="middle" font-size="8">用户DB</text>
<rect x="600" y="100" width="120" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="660" y="125" text-anchor="middle" font-size="11" font-weight="bold">订单服务</text>
<rect x="610" y="145" width="100" height="25" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="660" y="161" text-anchor="middle" font-size="8">订单DB</text>
<rect x="740" y="100" width="120" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="800" y="125" text-anchor="middle" font-size="11" font-weight="bold">库存服务</text>
<rect x="750" y="145" width="100" height="25" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="800" y="161" text-anchor="middle" font-size="8">库存DB</text>
<rect x="530" y="220" width="260" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="660" y="245" text-anchor="middle" font-size="11" font-weight="bold">问题场景</text>
<text x="550" y="265" font-size="9">订单创建成功,库存扣减失败</text>
<text x="640" y="310" text-anchor="middle" font-size="11" fill="#c62828">✗ 数据不一致</text>
<text x="640" y="330" text-anchor="middle" font-size="11" fill="#c62828">✗ 跨库事务</text>
<text x="640" y="350" text-anchor="middle" font-size="11" fill="#c62828">✗ 网络不可靠</text>
<text x="640" y="370" text-anchor="middle" font-size="11" fill="#c62828">✗ 性能开销大</text>
<rect x="50" y="420" width="750" height="60" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="425" y="445" text-anchor="middle" font-size="12" font-weight="bold">典型场景</text>
<text x="70" y="465" font-size="10">• 下单扣减库存和积分  • 转账(A扣款+B加钱)  • 订单支付(订单+支付+物流)</text>
</svg>

**3. CAP 理论与 BASE 理论**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">CAP 理论</text>
<rect x="200" y="70" width="140" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="270" y="100" text-anchor="middle" font-size="13" font-weight="bold">C - Consistency</text>
<text x="220" y="125" font-size="10">一致性</text>
<text x="220" y="140" font-size="9">所有节点数据相同</text>
<rect x="360" y="70" width="140" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="430" y="100" text-anchor="middle" font-size="13" font-weight="bold">A - Availability</text>
<text x="380" y="125" font-size="10">可用性</text>
<text x="380" y="140" font-size="9">服务一直可用</text>
<rect x="520" y="70" width="140" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="590" y="100" text-anchor="middle" font-size="13" font-weight="bold">P - Partition</text>
<text x="540" y="125" font-size="10">分区容错性</text>
<text x="540" y="140" font-size="9">网络分区仍可用</text>
<line x1="270" y1="70" x2="430" y2="70" stroke="#666" stroke-width="2"/>
<line x1="430" y1="70" x2="590" y2="70" stroke="#666" stroke-width="2"/>
<line x1="590" y1="70" x2="270" y2="70" stroke="#666" stroke-width="2"/>
<text x="425" y="190" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">最多满足两个!</text>
<rect x="100" y="220" width="200" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="200" y="245" text-anchor="middle" font-size="12" font-weight="bold">CP - 一致性+分区容错</text>
<text x="120" y="265" font-size="9">• 牺牲可用性</text>
<text x="120" y="280" font-size="9">• 例如:Zookeeper</text>
<text x="120" y="295" font-size="9">• 强一致性场景</text>
<text x="120" y="310" font-size="9">• 金融系统</text>
<rect x="330" y="220" width="200" height="100" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="430" y="245" text-anchor="middle" font-size="12" font-weight="bold">AP - 可用性+分区容错</text>
<text x="350" y="265" font-size="9">• 牺牲一致性</text>
<text x="350" y="280" font-size="9">• 例如:Eureka</text>
<text x="350" y="295" font-size="9">• 最终一致性</text>
<text x="350" y="310" font-size="9">• 互联网应用</text>
<rect x="560" y="220" width="200" height="100" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="660" y="245" text-anchor="middle" font-size="12" font-weight="bold">CA - 一致性+可用性</text>
<text x="580" y="265" font-size="9">• 牺牲分区容错</text>
<text x="580" y="280" font-size="9">• 例如:单机数据库</text>
<text x="580" y="295" font-size="9">• 分布式不适用</text>
<text x="580" y="310" font-size="9">• 理论场景</text>
<text x="425" y="350" text-anchor="middle" font-size="16" font-weight="bold">BASE 理论(弱一致性)</text>
<rect x="100" y="370" width="650" height="110" fill="#e0f2f1" stroke="#00796b" stroke-width="2" rx="5"/>
<text x="120" y="395" font-size="11" font-weight="bold">BA - Basically Available (基本可用)</text>
<text x="140" y="413" font-size="9">允许损失部分可用性,如响应时间增加、功能降级</text>
<text x="120" y="435" font-size="11" font-weight="bold">S - Soft State (软状态)</text>
<text x="140" y="453" font-size="9">允许系统存在中间状态,如数据同步中</text>
<text x="120" y="470" font-size="11" font-weight="bold">E - Eventually Consistent (最终一致性)</text>
<text x="140" y="488" font-size="9">经过一段时间后,数据最终达到一致</text>
</svg>

**4. 分布式事务解决方案**

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">分布式事务解决方案</text>
<rect x="100" y="70" width="180" height="90" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="190" y="100" text-anchor="middle" font-size="13" font-weight="bold">2PC 两阶段提交</text>
<text x="120" y="120" font-size="9">• 强一致性</text>
<text x="120" y="135" font-size="9">• 性能差、阻塞</text>
<text x="120" y="150" font-size="9">• 不推荐</text>
<rect x="300" y="70" width="180" height="90" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="390" y="100" text-anchor="middle" font-size="13" font-weight="bold">3PC 三阶段提交</text>
<text x="320" y="120" font-size="9">• 2PC改进版</text>
<text x="320" y="135" font-size="9">• 减少阻塞</text>
<text x="320" y="150" font-size="9">• 复杂度高</text>
<rect x="500" y="70" width="180" height="90" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="590" y="100" text-anchor="middle" font-size="13" font-weight="bold">TCC</text>
<text x="520" y="120" font-size="9">• Try-Confirm-Cancel</text>
<text x="520" y="135" font-size="9">• 性能好、侵入性强</text>
<text x="520" y="150" font-size="9">✓ 推荐</text>
<rect x="100" y="180" width="180" height="90" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="190" y="210" text-anchor="middle" font-size="13" font-weight="bold">可靠消息最终一致性</text>
<text x="120" y="230" font-size="9">• 基于MQ</text>
<text x="120" y="245" font-size="9">• 最终一致</text>
<text x="120" y="260" font-size="9">✓✓ 推荐</text>
<rect x="300" y="180" width="180" height="90" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="390" y="210" text-anchor="middle" font-size="13" font-weight="bold">本地消息表</text>
<text x="320" y="230" font-size="9">• 消息+DB事务</text>
<text x="320" y="245" font-size="9">• 最终一致</text>
<text x="320" y="260" font-size="9">✓ 推荐</text>
<rect x="500" y="180" width="180" height="90" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="590" y="210" text-anchor="middle" font-size="13" font-weight="bold">Saga 模式</text>
<text x="520" y="230" font-size="9">• 长事务分解</text>
<text x="520" y="245" font-size="9">• 补偿机制</text>
<text x="520" y="260" font-size="9">✓✓ 推荐</text>
<rect x="50" y="300" width="750" height="230" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5"/>
<text x="425" y="325" text-anchor="middle" font-size="14" font-weight="bold">方案选择建议</text>
<text x="70" y="350" font-size="11" font-weight="bold">强一致性场景:</text>
<text x="180" y="350" font-size="10">2PC/3PC (不推荐,性能差)</text>
<text x="70" y="375" font-size="11" font-weight="bold">弱一致性场景(最终一致):</text>
<text x="80" y="395" font-size="10">• 核心业务: TCC (性能好但侵入性强)</text>
<text x="80" y="415" font-size="10">• 一般业务: 可靠消息 / 本地消息表 (解耦好但延迟)</text>
<text x="80" y="435" font-size="10">• 长事务: Saga (适合复杂流程)</text>
<text x="70" y="460" font-size="11" font-weight="bold">推荐组合:</text>
<text x="80" y="480" font-size="10">• 互联网应用: 可靠消息 + Saga</text>
<text x="80" y="500" font-size="10">• 金融系统: TCC</text>
<text x="80" y="520" font-size="10">• 电商系统: 可靠消息 + 本地消息表</text>
</svg>

**5. 2PC 两阶段提交**

**① 原理**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">2PC 两阶段提交流程</text>
<rect x="320" y="70" width="160" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="100" text-anchor="middle" font-size="13" font-weight="bold">事务协调者(TC)</text>
<rect x="80" y="180" width="120" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="140" y="210" text-anchor="middle" font-size="11">参与者1</text>
<rect x="340" y="180" width="120" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="210" text-anchor="middle" font-size="11">参与者2</text>
<rect x="600" y="180" width="120" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="660" y="210" text-anchor="middle" font-size="11">参与者3</text>
<text x="40" y="270" font-size="13" font-weight="bold">阶段1: 准备</text>
<line x1="380" y1="120" x2="140" y2="180" stroke="#1976d2" stroke-width="2" marker-end="url(#ar1)"/>
<text x="220" y="145" font-size="9">CanCommit?</text>
<line x1="400" y1="120" x2="400" y2="180" stroke="#1976d2" stroke-width="2" marker-end="url(#ar1)"/>
<text x="410" y="155" font-size="9">CanCommit?</text>
<line x1="420" y1="120" x2="660" y2="180" stroke="#1976d2" stroke-width="2" marker-end="url(#ar1)"/>
<text x="560" y="145" font-size="9">CanCommit?</text>
<line x1="160" y1="230" x2="380" y2="290" stroke="#388e3c" stroke-width="2" marker-end="url(#ar2)"/>
<text x="240" y="265" font-size="9">Yes</text>
<line x1="400" y1="230" x2="400" y2="290" stroke="#388e3c" stroke-width="2" marker-end="url(#ar2)"/>
<text x="410" y="265" font-size="9">Yes</text>
<line x1="640" y1="230" x2="420" y2="290" stroke="#388e3c" stroke-width="2" marker-end="url(#ar2)"/>
<text x="560" y="265" font-size="9">Yes</text>
<text x="40" y="320" font-size="13" font-weight="bold">阶段2: 提交</text>
<line x1="380" y1="310" x2="140" y2="370" stroke="#f57c00" stroke-width="2" marker-end="url(#ar3)"/>
<text x="220" y="335" font-size="9">DoCommit</text>
<line x1="400" y1="310" x2="400" y2="370" stroke="#f57c00" stroke-width="2" marker-end="url(#ar3)"/>
<text x="410" y="345" font-size="9">DoCommit</text>
<line x1="420" y1="310" x2="660" y2="370" stroke="#f57c00" stroke-width="2" marker-end="url(#ar3)"/>
<text x="560" y="335" font-size="9">DoCommit</text>
<rect x="80" y="370" width="120" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="140" y="400" text-anchor="middle" font-size="11">Commit✓</text>
<rect x="340" y="370" width="120" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="400" text-anchor="middle" font-size="11">Commit✓</text>
<rect x="600" y="370" width="120" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="660" y="400" text-anchor="middle" font-size="11">Commit✓</text>
<defs>
<marker id="ar1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976d2"/>
</marker>
<marker id="ar2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#388e3c"/>
</marker>
<marker id="ar3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#f57c00"/>
</marker>
</defs>
</svg>

**② 问题**

**1.** 同步阻塞:所有参与者等待协调者指令
**2.** 单点故障:协调者宕机导致参与者一直阻塞
**3.** 数据不一致:第二阶段网络分区可能导致部分提交部分未提交

**6. TCC 模式**

**① 原理**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">TCC 三阶段</text>
<rect x="50" y="80" width="220" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="160" y="110" text-anchor="middle" font-size="14" font-weight="bold">Try - 尝试</text>
<text x="70" y="135" font-size="10">• 预留资源</text>
<text x="70" y="155" font-size="10">• 检查约束</text>
<text x="70" y="175" font-size="10">• 冻结资源不执行</text>
<rect x="290" y="80" width="220" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="110" text-anchor="middle" font-size="14" font-weight="bold">Confirm - 确认</text>
<text x="310" y="135" font-size="10">• 执行业务</text>
<text x="310" y="155" font-size="10">• 提交事务</text>
<text x="310" y="175" font-size="10">• 不会失败</text>
<rect x="530" y="80" width="220" height="100" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="640" y="110" text-anchor="middle" font-size="14" font-weight="bold">Cancel - 取消</text>
<text x="550" y="135" font-size="10">• 释放资源</text>
<text x="550" y="155" font-size="10">• 回滚操作</text>
<text x="550" y="175" font-size="10">• 补偿Try</text>
<line x1="270" y1="130" x2="290" y2="130" stroke="#666" stroke-width="2" marker-end="url(#ar4)"/>
<text x="275" y="120" font-size="9">成功</text>
<line x1="270" y1="150" x2="510" y2="150" stroke="#666" stroke-width="2"/>
<line x1="510" y1="150" x2="530" y2="130" stroke="#666" stroke-width="2" marker-end="url(#ar5)"/>
<text x="380" y="140" font-size="9">失败</text>
<rect x="50" y="220" width="700" height="210" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"/>
<text x="400" y="245" text-anchor="middle" font-size="13" font-weight="bold">示例: 转账(A转100给B)</text>
<text x="70" y="275" font-size="11" font-weight="bold">Try阶段:</text>
<text x="80" y="295" font-size="9">• A账户: 冻结100元 (余额1000 → 可用900,冻结100)</text>
<text x="80" y="313" font-size="9">• B账户: 预留100元接收额度</text>
<text x="70" y="340" font-size="11" font-weight="bold">Confirm阶段(Try成功):</text>
<text x="80" y="360" font-size="9">• A账户: 扣减冻结的100元 (余额1000 → 900)</text>
<text x="80" y="378" font-size="9">• B账户: 增加100元 (余额500 → 600)</text>
<text x="70" y="405" font-size="11" font-weight="bold">Cancel阶段(Try失败):</text>
<text x="80" y="420" font-size="9">• A账户: 解冻100元 (可用900+冻结100 → 可用1000)</text>
<defs>
<marker id="ar4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#388e3c"/>
</marker>
<marker id="ar5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#c62828"/>
</marker>
</defs>
</svg>

**② 代码实现(Seata TCC)**

**添加依赖**:

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>1.5.2</version>
</dependency>
```

**TCC 接口定义**:

```java
@LocalTCC
public interface AccountService {

    // Try - 预留资源
    @TwoPhaseBusinessAction(
        name = "accountTry",
        commitMethod = "commit",
        rollbackMethod = "rollback"
    )
    boolean try(@BusinessActionContextParameter(paramName = "userId") Long userId,
                @BusinessActionContextParameter(paramName = "amount") BigDecimal amount);

    // Confirm - 确认提交
    boolean commit(BusinessActionContext context);

    // Cancel - 取消回滚
    boolean rollback(BusinessActionContext context);
}
```

**TCC 实现**:

```java
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountMapper accountMapper;

    @Override
    @Transactional
    public boolean try(Long userId, BigDecimal amount) {
        // 1. 检查余额
        Account account = accountMapper.selectById(userId);
        if (account.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("余额不足");
        }

        // 2. 冻结金额(不扣减,只冻结)
        account.setFrozen(account.getFrozen().add(amount));
        accountMapper.updateById(account);

        return true;
    }

    @Override
    @Transactional
    public boolean commit(BusinessActionContext context) {
        // 从上下文获取参数
        Long userId = Long.valueOf(context.getActionContext("userId").toString());
        BigDecimal amount = new BigDecimal(context.getActionContext("amount").toString());

        // 扣减余额,解冻金额
        Account account = accountMapper.selectById(userId);
        account.setBalance(account.getBalance().subtract(amount));
        account.setFrozen(account.getFrozen().subtract(amount));
        accountMapper.updateById(account);

        return true;
    }

    @Override
    @Transactional
    public boolean rollback(BusinessActionContext context) {
        // 从上下文获取参数
        Long userId = Long.valueOf(context.getActionContext("userId").toString());
        BigDecimal amount = new BigDecimal(context.getActionContext("amount").toString());

        // 解冻金额
        Account account = accountMapper.selectById(userId);
        account.setFrozen(account.getFrozen().subtract(amount));
        accountMapper.updateById(account);

        return true;
    }
}
```

**使用TCC**:

```java
@Service
public class TransferService {

    @Autowired
    private AccountService accountService;

    @GlobalTransactional  // Seata全局事务
    public void transfer(Long fromUserId, Long toUserId, BigDecimal amount) {
        // Try阶段会自动执行
        accountService.try(fromUserId, amount);

        // 如果这里抛异常,会自动执行rollback
        // 如果正常结束,会自动执行commit
    }
}
```

**7. 可靠消息最终一致性**

**① 原理**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">可靠消息最终一致性流程</text>
<rect x="100" y="80" width="140" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="170" y="115" text-anchor="middle" font-size="12" font-weight="bold">订单服务</text>
<rect x="350" y="80" width="140" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="420" y="115" text-anchor="middle" font-size="12" font-weight="bold">消息队列</text>
<rect x="600" y="80" width="140" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="670" y="115" text-anchor="middle" font-size="12" font-weight="bold">库存服务</text>
<text x="50" y="185" font-size="11" font-weight="bold">步骤1:</text>
<line x1="170" y1="140" x2="170" y2="180" stroke="#1976d2" stroke-width="2" marker-end="url(#ar6)"/>
<text x="180" y="165" font-size="9">开启本地事务</text>
<text x="180" y="178" font-size="9">创建订单</text>
<text x="50" y="225" font-size="11" font-weight="bold">步骤2:</text>
<line x1="240" y1="110" x2="350" y2="110" stroke="#1976d2" stroke-width="2" marker-end="url(#ar6)"/>
<text x="270" y="100" font-size="9">发送消息</text>
<text x="50" y="265" font-size="11" font-weight="bold">步骤3:</text>
<line x1="420" y1="140" x2="420" y2="180" stroke="#f57c00" stroke-width="2" marker-end="url(#ar7)"/>
<text x="430" y="165" font-size="9">消息持久化</text>
<text x="50" y="305" font-size="11" font-weight="bold">步骤4:</text>
<line x1="350" y1="260" x2="240" y2="260" stroke="#f57c00" stroke-width="2" marker-end="url(#ar7)"/>
<text x="270" y="250" font-size="9">返回成功</text>
<text x="50" y="345" font-size="11" font-weight="bold">步骤5:</text>
<line x1="170" y1="280" x2="170" y2="320" stroke="#1976d2" stroke-width="2" marker-end="url(#ar6)"/>
<text x="180" y="305" font-size="9">提交本地事务</text>
<text x="50" y="385" font-size="11" font-weight="bold">步骤6:</text>
<line x1="490" y1="110" x2="600" y2="110" stroke="#388e3c" stroke-width="2" marker-end="url(#ar8)"/>
<text x="520" y="100" font-size="9">消费消息</text>
<text x="50" y="425" font-size="11" font-weight="bold">步骤7:</text>
<line x1="670" y1="140" x2="670" y2="400" stroke="#388e3c" stroke-width="2" marker-end="url(#ar8)"/>
<text x="680" y="270" font-size="9">扣减库存</text>
<rect x="600" y="400" width="140" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="670" y="435" text-anchor="middle" font-size="11">库存扣减完成</text>
<defs>
<marker id="ar6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976d2"/>
</marker>
<marker id="ar7" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#f57c00"/>
</marker>
<marker id="ar8" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#388e3c"/>
</marker>
</defs>
</svg>

**② 实现(RocketMQ 事务消息)**

**生产者**:

```java
@Service
public class OrderService {

    @Autowired
    private TransactionMQProducer producer;

    @Autowired
    private OrderMapper orderMapper;

    public void createOrder(Order order) {
        // 发送事务消息
        Message message = new Message("order_topic", JSON.toJSONString(order).getBytes());

        producer.sendMessageInTransaction(message, order);
    }

    // 本地事务执行
    @TransactionalEventListener
    public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        try {
            Order order = (Order) arg;

            // 执行本地事务
            orderMapper.insert(order);

            // 本地事务成功,提交消息
            return LocalTransactionState.COMMIT_MESSAGE;
        } catch (Exception e) {
            // 本地事务失败,回滚消息
            return LocalTransactionState.ROLLBACK_MESSAGE;
        }
    }

    // 事务状态回查
    public LocalTransactionState checkLocalTransaction(MessageExt msg) {
        // 查询本地事务执行结果
        String orderId = new String(msg.getBody());
        Order order = orderMapper.selectById(orderId);

        if (order != null) {
            return LocalTransactionState.COMMIT_MESSAGE;
        }
        return LocalTransactionState.ROLLBACK_MESSAGE;
    }
}
```

**消费者**:

```java
@Component
@RocketMQMessageListener(
    topic = "order_topic",
    consumerGroup = "stock_consumer_group"
)
public class StockConsumer implements RocketMQListener<String> {

    @Autowired
    private StockService stockService;

    @Override
    public void onMessage(String message) {
        Order order = JSON.parseObject(message, Order.class);

        // 扣减库存
        stockService.deduct(order.getProductId(), order.getQuantity());
    }
}
```

**8. 本地消息表**

**① 原理**

在本地数据库创建消息表,与业务操作在同一个事务中,保证消息发送的可靠性。

**消息表**:

```sql
CREATE TABLE local_message (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    message_id VARCHAR(64) UNIQUE,
    content TEXT,
    status INT,  -- 0:待发送 1:已发送 2:发送失败
    retry_count INT DEFAULT 0,
    create_time DATETIME,
    update_time DATETIME
);
```

**② 实现**:

```java
@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private LocalMessageMapper messageMapper;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Transactional
    public void createOrder(Order order) {
        // 1. 插入订单
        orderMapper.insert(order);

        // 2. 插入消息记录(同一个事务)
        LocalMessage message = new LocalMessage();
        message.setMessageId(UUID.randomUUID().toString());
        message.setContent(JSON.toJSONString(order));
        message.setStatus(0);  // 待发送
        messageMapper.insert(message);
    }
}

// 定时任务发送消息
@Component
public class MessageSendTask {

    @Autowired
    private LocalMessageMapper messageMapper;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Scheduled(fixedDelay = 5000)  // 每5秒执行一次
    public void sendMessage() {
        // 查询待发送的消息
        List<LocalMessage> messages = messageMapper.selectByStatus(0);

        for (LocalMessage message : messages) {
            try {
                // 发送消息
                rabbitTemplate.convertAndSend("order.exchange", "order.create", message.getContent());

                // 更新消息状态
                message.setStatus(1);
                messageMapper.updateById(message);
            } catch (Exception e) {
                // 发送失败,增加重试次数
                message.setRetryCount(message.getRetryCount() + 1);
                if (message.getRetryCount() >= 3) {
                    message.setStatus(2);  // 发送失败
                }
                messageMapper.updateById(message);
            }
        }
    }
}
```

**9. Saga 模式**

**① 原理**

将长事务拆分成多个本地短事务,每个本地事务都有对应的补偿操作。如果某个步骤失败,执行之前所有成功步骤的补偿操作。

<svg viewBox="0 0 850 400" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">Saga 模式 - 订单流程</text>
<text x="425" y="70" text-anchor="middle" font-size="14" font-weight="bold">正向流程(全部成功)</text>
<rect x="80" y="90" width="140" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="120" text-anchor="middle" font-size="11">1. 创建订单</text>
<rect x="260" y="90" width="140" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="330" y="120" text-anchor="middle" font-size="11">2. 扣减库存</text>
<rect x="440" y="90" width="140" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="510" y="120" text-anchor="middle" font-size="11">3. 扣减积分</text>
<rect x="620" y="90" width="140" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="690" y="120" text-anchor="middle" font-size="11">4. 支付</text>
<line x1="220" y1="115" x2="260" y2="115" stroke="#1976d2" stroke-width="2" marker-end="url(#ar9)"/>
<line x1="400" y1="115" x2="440" y2="115" stroke="#1976d2" stroke-width="2" marker-end="url(#ar9)"/>
<line x1="580" y1="115" x2="620" y2="115" stroke="#1976d2" stroke-width="2" marker-end="url(#ar9)"/>
<text x="425" y="190" text-anchor="middle" font-size="14" font-weight="bold">补偿流程(步骤3失败)</text>
<rect x="80" y="210" width="140" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="150" y="240" text-anchor="middle" font-size="11">1. 创建订单✓</text>
<rect x="260" y="210" width="140" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="330" y="240" text-anchor="middle" font-size="11">2. 扣减库存✓</text>
<rect x="440" y="210" width="140" height="50" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="510" y="240" text-anchor="middle" font-size="11">3. 扣减积分✗</text>
<line x1="220" y1="235" x2="260" y2="235" stroke="#388e3c" stroke-width="2" marker-end="url(#ar10)"/>
<line x1="400" y1="235" x2="440" y2="235" stroke="#388e3c" stroke-width="2" marker-end="url(#ar10)"/>
<rect x="260" y="290" width="140" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="330" y="315" text-anchor="middle" font-size="10">补偿:恢复库存</text>
<rect x="80" y="290" width="140" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="150" y="315" text-anchor="middle" font-size="10">补偿:取消订单</text>
<line x1="510" y1="260" x2="400" y2="290" stroke="#c62828" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#ar11)"/>
<line x1="260" y1="315" x2="220" y2="315" stroke="#f57c00" stroke-width="2" marker-end="url(#ar12)"/>
<defs>
<marker id="ar9" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#1976d2"/>
</marker>
<marker id="ar10" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#388e3c"/>
</marker>
<marker id="ar11" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#c62828"/>
</marker>
<marker id="ar12" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#f57c00"/>
</marker>
</defs>
</svg>

**② 实现(Seata Saga)**

**状态机定义(JSON)**:

```json
{
  "Name": "orderSaga",
  "Nodes": [
    {
      "ServiceName": "orderService",
      "ServiceMethod": "createOrder",
      "CompensateMethod": "cancelOrder",
      "Next": "ReduceStock"
    },
    {
      "ServiceName": "stockService",
      "ServiceMethod": "reduceStock",
      "CompensateMethod": "restoreStock",
      "Next": "ReducePoints"
    },
    {
      "ServiceName": "pointService",
      "ServiceMethod": "reducePoints",
      "CompensateMethod": "restorePoints",
      "Next": "Pay"
    },
    {
      "ServiceName": "payService",
      "ServiceMethod": "pay",
      "CompensateMethod": "refund"
    }
  ]
}
```

**服务实现**:

```java
@Service
public class OrderService {

    // 正向操作
    public boolean createOrder(Order order) {
        orderMapper.insert(order);
        return true;
    }

    // 补偿操作
    public boolean cancelOrder(Order order) {
        order.setStatus("CANCELLED");
        orderMapper.updateById(order);
        return true;
    }
}

@Service
public class StockService {

    public boolean reduceStock(Long productId, Integer quantity) {
        stockMapper.reduce(productId, quantity);
        return true;
    }

    public boolean restoreStock(Long productId, Integer quantity) {
        stockMapper.increase(productId, quantity);
        return true;
    }
}
```

**10. Seata 分布式事务框架**

**① Seata 架构**

Seata 支持多种模式:AT、TCC、Saga、XA

**添加依赖**:

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>1.5.2</version>
</dependency>
```

**配置**:

```yaml
seata:
  application-id: order-service
  tx-service-group: my_test_tx_group
  registry:
    type: nacos
    nacos:
      server-addr: localhost:8848
      group: SEATA_GROUP
  config:
    type: nacos
    nacos:
      server-addr: localhost:8848
      group: SEATA_GROUP
```

**使用(AT模式)**:

```java
@Service
public class OrderService {

    @Autowired
    private StockFeignClient stockClient;

    @GlobalTransactional  // 全局事务
    public void createOrder(Order order) {
        // 1. 创建订单
        orderMapper.insert(order);

        // 2. 远程调用库存服务
        stockClient.deduct(order.getProductId(), order.getQuantity());

        // 如果抛异常,会自动回滚
    }
}
```

**关键要点**

**1.** 分布式事务是跨多个服务、数据库的事务,需要保证数据一致性
**2.** CAP理论:最多满足两个(一致性、可用性、分区容错性)
**3.** BASE理论:基本可用、软状态、最终一致性
**4.** 强一致性方案:2PC/3PC(不推荐,性能差)
**5.** 弱一致性方案(推荐):TCC、可靠消息、本地消息表、Saga
**6.** TCC:Try-Confirm-Cancel,性能好但侵入性强,适合核心业务
**7.** 可靠消息:基于MQ的最终一致性,解耦好但有延迟,适合一般业务
**8.** Saga:长事务拆分+补偿,适合复杂流程
**9.** Seata:阿里开源的分布式事务框架,支持AT/TCC/Saga/XA
**10.** 实际场景:优先考虑业务补偿和幂等性,避免强一致性

**记忆口诀**:分布式事务跨服务,CAP理论二选一,BASE最终一致性,TCC预留再确认,可靠消息MQ保证,本地消息表同步,Saga补偿长事务,Seata框架全支持
