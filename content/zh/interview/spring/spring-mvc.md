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
