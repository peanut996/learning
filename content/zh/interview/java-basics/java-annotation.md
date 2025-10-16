## 注解

### 68. 什么是注解？注解的作用是什么？

**注解**（Annotation）是一种**元数据**，为代码提供附加信息，不直接影响代码逻辑。

**作用**：
- **编译检查**：`@Override`、`@Deprecated`
- **配置信息**：Spring 的 `@Component`、`@Autowired`
- **代码生成**：Lombok 的 `@Data`

### 69. 常见的注解有哪些？

**内置注解**：
```java
@Override        // 重写方法
@Deprecated      // 已过时
@SuppressWarnings("unchecked")  // 抑制警告
@FunctionalInterface  // 函数式接口
```

**框架注解**：
```java
// Spring
@Component, @Service, @Repository, @Controller
@Autowired, @Value
@RequestMapping, @GetMapping

// JPA
@Entity, @Table, @Id, @Column

// Lombok
@Data, @Getter, @Setter, @ToString
```

### 70. 如何自定义注解？

```java
@Target(ElementType.METHOD)  // 作用在方法上
@Retention(RetentionPolicy.RUNTIME)  // 运行时可见
public @interface MyAnnotation {
    String value() default "";
    int count() default 0;
}

// 使用
@MyAnnotation(value = "test", count = 3)
public void myMethod() { }
```

### 71. 元注解有哪些？

元注解用于**修饰注解**：

```java
@Target      // 指定注解的使用位置（类、方法、字段等）
@Retention   // 指定注解的生命周期（SOURCE/CLASS/RUNTIME）
@Documented  // 注解是否包含在 JavaDoc 中
@Inherited   // 注解是否可被继承
@Repeatable  // 注解是否可重复使用（Java 8+）
```

### 72. 注解的应用场景有哪些？

1. **配置替代 XML**：Spring Boot 注解配置
2. **AOP 切面**：`@Transactional`、`@Async`
3. **数据校验**：`@NotNull`、`@Email`
4. **序列化控制**：Jackson 的 `@JsonProperty`
5. **测试框架**：JUnit 的 `@Test`、`@Before`
