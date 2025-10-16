## 反射

### 59. 什么是反射？反射的作用是什么？

**反射**（Reflection）是 Java 在**运行时**动态获取类信息、创建对象、调用方法的机制。

```java
// 普通方式：编译时确定
Person p = new Person();
p.setName("Tom");

// 反射方式：运行时动态
Class<?> clazz = Class.forName("Person");
Object obj = clazz.newInstance();
Method method = clazz.getMethod("setName", String.class);
method.invoke(obj, "Tom");
```

**作用**：
- 动态加载类
- 运行时获取类的结构（方法、字段、构造器）
- 动态创建对象和调用方法
- 突破访问权限限制

### 60. 如何获取 Class 对象？

```java
// 方式 1：Class.forName()
Class<?> clazz1 = Class.forName("java.lang.String");

// 方式 2：类名.class
Class<?> clazz2 = String.class;

// 方式 3：对象.getClass()
String str = "hello";
Class<?> clazz3 = str.getClass();

// 方式 4：类加载器
Class<?> clazz4 = ClassLoader.getSystemClassLoader().loadClass("java.lang.String");
```

### 61. 反射的优缺点是什么？

**优点**：
- **灵活性**：运行时动态操作类
- **扩展性**：实现插件化、框架开发

**缺点**：
- **性能开销**：比直接调用慢 10-100 倍
- **安全问题**：可以访问私有成员
- **代码可读性差**：不利于维护

### 62. 反射的应用场景有哪些？

1. **框架开发**：Spring 的依赖注入、Mybatis 的 ORM 映射
2. **动态代理**：AOP 实现
3. **序列化/反序列化**：JSON 转换
4. **JDBC**：根据配置加载数据库驱动
5. **单元测试**：JUnit 动态调用测试方法
