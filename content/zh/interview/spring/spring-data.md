## Spring Data

### 58. 什么是 Spring Data JPA？

**1. 核心定义**

Spring Data JPA 是 Spring Data 家族的一部分，它在 JPA（Java Persistence API）规范之上提供了一层抽象，极大简化了数据访问层的开发。通过约定优于配置的方式，开发者只需定义接口，Spring Data JPA 会自动生成实现代码。

**2. 核心特性**

- **自动实现 Repository**：只需定义接口，无需编写实现类
- **方法名查询**：根据方法名自动生成查询语句
- **自定义查询**：支持 JPQL 和原生 SQL
- **分页和排序**：内置分页和排序支持
- **审计功能**：自动记录创建时间、修改时间等
- **动态查询**：通过 Specification 实现复杂条件查询

**3. 技术栈关系图**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring Data JPA 技术栈</text>
<rect x="250" y="60" width="300" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="95" text-anchor="middle" font-size="16" font-weight="bold">Spring Data JPA</text>
<text x="400" y="112" text-anchor="middle" font-size="13">(Repository 抽象层)</text>
<rect x="250" y="150" width="300" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="185" text-anchor="middle" font-size="16" font-weight="bold">JPA 规范</text>
<text x="400" y="202" text-anchor="middle" font-size="13">(Java Persistence API)</text>
<rect x="100" y="240" width="250" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="225" y="275" text-anchor="middle" font-size="16" font-weight="bold">Hibernate</text>
<text x="225" y="292" text-anchor="middle" font-size="13">(JPA 实现，默认)</text>
<rect x="450" y="240" width="250" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="575" y="275" text-anchor="middle" font-size="16" font-weight="bold">EclipseLink</text>
<text x="575" y="292" text-anchor="middle" font-size="13">(JPA 实现，可选)</text>
<rect x="250" y="330" width="300" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="400" y="365" text-anchor="middle" font-size="16" font-weight="bold">数据库 (MySQL/PostgreSQL/...)</text>
<line x1="400" y1="120" x2="400" y2="150" stroke="#424242" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="350" y1="210" x2="225" y2="240" stroke="#424242" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="450" y1="210" x2="575" y2="240" stroke="#424242" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="225" y1="300" x2="350" y2="330" stroke="#424242" stroke-width="2" marker-end="url(#arrow)"/>
<line x1="575" y1="300" x2="450" y2="330" stroke="#424242" stroke-width="2" marker-end="url(#arrow)"/>
<text x="50" y="100" font-size="13" fill="#1565c0">最上层</text>
<text x="50" y="180" font-size="13" fill="#f57c00">规范层</text>
<text x="50" y="270" font-size="13" fill="#388e3c">实现层</text>
<text x="50" y="360" font-size="13" fill="#7b1fa2">数据层</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#424242"/>
</marker>
</defs>
</svg>

**4. 核心优势**

| 优势 | 说明 | 传统方式对比 |
|------|------|------------|
| **零实现代码** | 接口即可，无需写实现 | 需要写 DAO 实现类 |
| **方法名查询** | findByUsername 自动生成查询 | 需要手写 SQL/JPQL |
| **分页支持** | 内置 Pageable 接口 | 需要手动处理分页 |
| **通用 CRUD** | 继承接口即拥有 | 每个 DAO 都要实现 |
| **类型安全** | 编译期检查 | 运行时才发现错误 |
| **数据库无关** | 切换数据库无需改代码 | SQL 方言需要修改 |

**5. 主要组件**

**① Repository 接口体系**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<rect x="250" y="30" width="200" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="350" y="60" text-anchor="middle" font-size="15" font-weight="bold">Repository&lt;T, ID&gt;</text>
<rect x="250" y="110" width="200" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="350" y="140" text-anchor="middle" font-size="14" font-weight="bold">CrudRepository</text>
<rect x="250" y="190" width="200" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="350" y="220" text-anchor="middle" font-size="14" font-weight="bold">PagingAndSorting</text>
<text x="350" y="235" text-anchor="middle" font-size="14" font-weight="bold">Repository</text>
<rect x="250" y="270" width="200" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="350" y="300" text-anchor="middle" font-size="14" font-weight="bold">JpaRepository</text>
<line x1="350" y1="80" x2="350" y2="110" stroke="#424242" stroke-width="2" marker-end="url(#arrow2)"/>
<line x1="350" y1="160" x2="350" y2="190" stroke="#424242" stroke-width="2" marker-end="url(#arrow2)"/>
<line x1="350" y1="240" x2="350" y2="270" stroke="#424242" stroke-width="2" marker-end="url(#arrow2)"/>
<text x="520" y="60" font-size="12" fill="#1565c0">顶层接口</text>
<text x="520" y="140" font-size="12" fill="#f57c00">基础 CRUD</text>
<text x="520" y="220" font-size="12" fill="#388e3c">分页排序</text>
<text x="520" y="300" font-size="12" fill="#7b1fa2">JPA 增强（最常用）</text>
<defs>
<marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#424242"/>
</marker>
</defs>
</svg>

**② Entity（实体类）**
- 使用 `@Entity` 标注
- 映射到数据库表
- 定义字段和关系

**③ Repository（仓储接口）**
- 定义数据访问方法
- Spring Data JPA 自动实现

**6. 快速上手示例**

**步骤 1：定义实体类**

```java
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
```

**步骤 2：定义 Repository 接口**

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 1. 方法名查询（自动实现）
    User findByUsername(String username);
    List<User> findByAgeGreaterThan(Integer age);

    // 2. 自定义查询
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmail(String email);

    // 3. 分页查询
    Page<User> findByAge(Integer age, Pageable pageable);
}
```

**步骤 3：使用 Repository**

```java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void demo() {
        // 保存
        User user = new User();
        user.setUsername("zhangsan");
        userRepository.save(user);

        // 查询
        User found = userRepository.findByUsername("zhangsan");

        // 分页
        Pageable pageable = PageRequest.of(0, 10);
        Page<User> page = userRepository.findAll(pageable);
    }
}
```

**7. 与传统方式对比**

| 功能 | 传统 JDBC/MyBatis | Spring Data JPA |
|-----|------------------|----------------|
| **代码量** | 大量 SQL + DAO 实现 | 接口定义即可 |
| **CRUD** | 每个表都要写 | 继承接口自动拥有 |
| **分页** | 手动计算 offset/limit | Pageable 自动处理 |
| **动态查询** | 拼接 SQL 字符串 | Specification |
| **数据库切换** | 修改 SQL 方言 | 无需修改代码 |
| **学习曲线** | 较平缓 | 需要理解 JPA |

**8. 适用场景**

**✓ 适合使用：**
- 标准的 CRUD 操作
- 单表查询为主
- 希望快速开发
- 数据库可能切换

**✗ 不太适合：**
- 复杂的多表联查
- 性能要求极高
- 需要复杂的 SQL 优化
- 团队不熟悉 JPA

**9. 配置示例**

```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/testdb
spring.datasource.username=root
spring.datasource.password=123456

# JPA 配置
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

**关键要点**

1. Spring Data JPA 是在 JPA 规范之上的抽象层
2. 通过接口定义即可实现数据访问，无需编写实现代码
3. 支持方法名查询、自定义查询、分页排序等
4. 默认使用 Hibernate 作为 JPA 实现
5. 大幅简化了数据访问层开发，但需要理解 JPA 概念

**记忆口诀**：JPA 规范上抽象，接口定义自动实现，方法名查询很方便，分页排序都内置


### 59. JPA 和 Hibernate 的区别是什么？

**1. 核心关系**

JPA（Java Persistence API）是 **规范**，Hibernate 是 JPA 规范的一个 **实现**。这就像 JDBC 是规范，MySQL Driver 是实现一样。

**2. 关系图示**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">JPA 与 Hibernate 的关系</text>
<rect x="200" y="70" width="400" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="8"/>
<text x="400" y="105" text-anchor="middle" font-size="16" font-weight="bold">JPA (规范/接口)</text>
<text x="400" y="130" text-anchor="middle" font-size="13">定义了 ORM 的标准 API</text>
<rect x="80" y="200" width="200" height="140" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="180" y="230" text-anchor="middle" font-size="15" font-weight="bold">Hibernate</text>
<text x="180" y="250" text-anchor="middle" font-size="13">(JPA 实现)</text>
<text x="90" y="280" font-size="12">• 最流行的实现</text>
<text x="90" y="300" font-size="12">• 功能最强大</text>
<text x="90" y="320" font-size="12">• Spring 默认选择</text>
<rect x="310" y="200" width="200" height="140" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="410" y="230" text-anchor="middle" font-size="15" font-weight="bold">EclipseLink</text>
<text x="410" y="250" text-anchor="middle" font-size="13">(JPA 实现)</text>
<text x="320" y="280" font-size="12">• Eclipse 基金会</text>
<text x="320" y="300" font-size="12">• 官方参考实现</text>
<text x="320" y="320" font-size="12">• WebLogic 使用</text>
<rect x="540" y="200" width="200" height="140" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="640" y="230" text-anchor="middle" font-size="15" font-weight="bold">OpenJPA</text>
<text x="640" y="250" text-anchor="middle" font-size="13">(JPA 实现)</text>
<text x="550" y="280" font-size="12">• Apache 项目</text>
<text x="550" y="300" font-size="12">• 轻量级</text>
<text x="550" y="320" font-size="12">• 使用较少</text>
<line x1="350" y1="150" x2="180" y2="200" stroke="#424242" stroke-width="2" marker-end="url(#arr)"/>
<line x1="400" y1="150" x2="410" y2="200" stroke="#424242" stroke-width="2" marker-end="url(#arr)"/>
<line x1="450" y1="150" x2="640" y2="200" stroke="#424242" stroke-width="2" marker-end="url(#arr)"/>
<text x="250" y="175" font-size="12" fill="#666">实现</text>
<text x="405" y="175" font-size="12" fill="#666">实现</text>
<text x="520" y="175" font-size="12" fill="#666">实现</text>
<defs>
<marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#424242"/>
</marker>
</defs>
</svg>

**3. 详细对比**

| 对比维度 | JPA | Hibernate |
|---------|-----|-----------|
| **性质** | 规范/标准（接口） | 实现框架（实现类） |
| **制定者** | Java EE 规范组织 | Gavin King / Red Hat |
| **版本** | JPA 2.2 | Hibernate 5.x / 6.x |
| **功能** | 定义标准 API | 实现 + 扩展功能 |
| **包名** | javax.persistence.* | org.hibernate.* |
| **依赖** | 接口定义 | 完整实现 + 额外功能 |
| **切换性** | 可切换实现 | 锁定 Hibernate |
| **学习曲线** | 相对简单 | 更复杂（功能更多） |

**4. 关键区别**

**① 本质区别**

```
JPA = 接口规范（Interface）
Hibernate = 实现框架（Implementation）

类比：
JPA : Hibernate = JDBC : MySQL Driver
JPA : Hibernate = Servlet : Tomcat
```

**② 功能范围**

<svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg">
<rect x="100" y="50" width="500" height="250" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="8"/>
<text x="350" y="85" text-anchor="middle" font-size="16" font-weight="bold">Hibernate 功能范围</text>
<rect x="150" y="110" width="400" height="160" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="350" y="145" text-anchor="middle" font-size="15" font-weight="bold">JPA 标准功能</text>
<text x="170" y="175" font-size="13">• @Entity, @Table</text>
<text x="170" y="195" font-size="13">• @Id, @GeneratedValue</text>
<text x="170" y="215" font-size="13">• EntityManager</text>
<text x="170" y="235" font-size="13">• JPQL 查询</text>
<text x="170" y="255" font-size="13">• 基础映射关系</text>
<text x="110" y="185" font-size="12" fill="#f57c00">Hibernate 扩展：</text>
<text x="110" y="205" font-size="11" fill="#f57c00">• @Formula</text>
<text x="110" y="220" font-size="11" fill="#f57c00">• 二级缓存</text>
<text x="110" y="235" font-size="11" fill="#f57c00">• HQL</text>
<text x="110" y="250" font-size="11" fill="#f57c00">• Criteria API</text>
<text x="110" y="265" font-size="11" fill="#f57c00">• 性能优化</text>
</svg>

**③ 注解对比**

| 功能 | JPA 注解 | Hibernate 注解 |
|-----|---------|---------------|
| **实体标注** | @Entity | @Entity (继承) |
| **表映射** | @Table | @Table (继承) |
| **主键** | @Id | @Id (继承) |
| **主键生成** | @GeneratedValue | @GenericGenerator (扩展) |
| **列映射** | @Column | @Column (继承) |
| **动态更新** | ❌ 不支持 | @DynamicUpdate (扩展) |
| **动态插入** | ❌ 不支持 | @DynamicInsert (扩展) |
| **计算属性** | ❌ 不支持 | @Formula (扩展) |

**④ API 对比**

| 功能 | JPA | Hibernate |
|-----|-----|-----------|
| **核心接口** | EntityManager | Session (扩展 EntityManager) |
| **查询语言** | JPQL | HQL (Hibernate Query Language) |
| **Criteria** | JPA Criteria | Hibernate Criteria (更强大) |
| **二级缓存** | 定义规范 | 实现 + 扩展配置 |
| **批处理** | 基础支持 | StatelessSession (高性能) |

**5. 代码示例对比**

**JPA 标准代码**

```java
// 使用 JPA 标准 API
@PersistenceContext
private EntityManager entityManager;

public User findById(Long id) {
    return entityManager.find(User.class, id);
}

public List<User> findByName(String name) {
    return entityManager
        .createQuery("SELECT u FROM User u WHERE u.name = :name", User.class)
        .setParameter("name", name)
        .getResultList();
}
```

**Hibernate 扩展代码**

```java
// 使用 Hibernate 扩展 API
@Autowired
private SessionFactory sessionFactory;

public User findById(Long id) {
    Session session = sessionFactory.getCurrentSession();
    return session.get(User.class, id);
}

public List<User> findByName(String name) {
    Session session = sessionFactory.getCurrentSession();
    // 使用 HQL (Hibernate Query Language)
    return session.createQuery("FROM User WHERE name = :name", User.class)
        .setParameter("name", name)
        .list();
}

// Hibernate 特有功能：二级缓存
@Entity
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User {
    // ...
}
```

**6. 使用场景选择**

**使用 JPA 标准：**
- ✓ 追求标准化和可移植性
- ✓ 可能切换 ORM 实现
- ✓ 功能需求较简单
- ✓ 团队对 JPA 更熟悉

**使用 Hibernate 扩展：**
- ✓ 需要高级特性（二级缓存、批处理）
- ✓ 性能要求高
- ✓ 已确定长期使用 Hibernate
- ✓ 需要 Hibernate 特有功能

**7. Spring Data JPA 的选择**

Spring Data JPA 基于 JPA 标准，但默认使用 Hibernate 作为实现：

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
    <!-- 自动包含 Hibernate 依赖 -->
</dependency>
```

**你可以这样理解：**
- **编程时**：使用 JPA 标准 API
- **运行时**：由 Hibernate 提供实现
- **配置时**：可使用 Hibernate 特性

**8. 依赖关系**

```
应用代码
    ↓ (依赖)
Spring Data JPA
    ↓ (依赖)
JPA 规范 (javax.persistence.*)
    ↓ (实现)
Hibernate (默认) / EclipseLink / OpenJPA
    ↓ (依赖)
JDBC Driver
    ↓
数据库
```

**9. 切换实现示例**

```xml
<!-- 排除默认的 Hibernate -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- 使用 EclipseLink -->
<dependency>
    <groupId>org.eclipse.persistence</groupId>
    <artifactId>eclipselink</artifactId>
</dependency>
```

**关键要点**

1. JPA 是 ORM 规范，Hibernate 是 JPA 规范的实现
2. JPA 定义标准 API，Hibernate 实现并提供扩展功能
3. Spring Data JPA 基于 JPA 标准，默认使用 Hibernate
4. 使用 JPA 标准 API 可以在不同实现间切换
5. Hibernate 提供了更多高级功能和性能优化

**记忆口诀**：JPA 规范 Hibernate 实现，接口定义类来填，标准功能能切换，扩展特性绑实现

### 60. 什么是 Repository？有哪些类型？

**1. Repository 核心概念**

Repository（仓储）是 Spring Data 中的核心接口，它是一种 **领域驱动设计（DDD）模式**，用于封装数据访问逻辑。在 Spring Data JPA 中，Repository 提供了统一的数据访问抽象。

**2. Repository 接口继承体系**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">Repository 接口继承体系</text>
<rect x="250" y="60" width="300" height="70" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="400" y="95" text-anchor="middle" font-size="16" font-weight="bold">Repository&lt;T, ID&gt;</text>
<text x="400" y="115" text-anchor="middle" font-size="13">标记接口，无方法</text>
<rect x="250" y="160" width="300" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="195" text-anchor="middle" font-size="16" font-weight="bold">CrudRepository&lt;T, ID&gt;</text>
<text x="400" y="215" text-anchor="middle" font-size="13">提供基本 CRUD 方法</text>
<rect x="250" y="260" width="300" height="70" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="290" text-anchor="middle" font-size="16" font-weight="bold">PagingAndSortingRepository&lt;T, ID&gt;</text>
<text x="400" y="310" text-anchor="middle" font-size="13">增加分页和排序</text>
<rect x="250" y="360" width="300" height="70" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="400" y="395" text-anchor="middle" font-size="16" font-weight="bold">JpaRepository&lt;T, ID&gt;</text>
<text x="400" y="415" text-anchor="middle" font-size="13">JPA 特有增强（最常用）</text>
<rect x="250" y="460" width="300" height="70" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="495" text-anchor="middle" font-size="15" font-weight="bold">自定义 Repository</text>
<text x="400" y="515" text-anchor="middle" font-size="13">继承以上接口，添加自定义方法</text>
<line x1="400" y1="130" x2="400" y2="160" stroke="#424242" stroke-width="2" marker-end="url(#ar)"/>
<line x1="400" y1="230" x2="400" y2="260" stroke="#424242" stroke-width="2" marker-end="url(#ar)"/>
<line x1="400" y1="330" x2="400" y2="360" stroke="#424242" stroke-width="2" marker-end="url(#ar)"/>
<line x1="400" y1="430" x2="400" y2="460" stroke="#424242" stroke-width="2" marker-end="url(#ar)"/>
<text x="650" y="95" font-size="12" fill="#1565c0">层级 1</text>
<text x="650" y="195" font-size="12" fill="#f57c00">层级 2</text>
<text x="650" y="295" font-size="12" fill="#388e3c">层级 3</text>
<text x="650" y="395" font-size="12" fill="#7b1fa2">层级 4</text>
<text x="650" y="495" font-size="12" fill="#f57f00">应用层</text>
<defs>
<marker id="ar" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#424242"/>
</marker>
</defs>
</svg>

**3. 五种 Repository 类型详解**

**① Repository&lt;T, ID&gt;**

- **定义**：最顶层的标记接口
- **方法数**：0 个
- **作用**：作为基础类型，标识这是一个 Repository

```java
public interface Repository<T, ID> {
    // 空接口，仅作标记
}
```

**使用场景**：极少直接使用，通常用于自定义时选择性暴露方法

---

**② CrudRepository&lt;T, ID&gt;**

- **定义**：提供基础 CRUD 操作
- **方法数**：约 12 个
- **作用**：满足基本增删改查需求

**核心方法**：

| 方法 | 功能 |
|------|------|
| `save(S entity)` | 保存或更新 |
| `saveAll(Iterable<S>)` | 批量保存 |
| `findById(ID)` | 根据 ID 查询 |
| `existsById(ID)` | 判断是否存在 |
| `findAll()` | 查询所有 |
| `findAllById(Iterable<ID>)` | 根据 ID 列表查询 |
| `count()` | 统计总数 |
| `deleteById(ID)` | 根据 ID 删除 |
| `delete(T entity)` | 删除实体 |
| `deleteAll()` | 删除所有 |

```java
public interface UserRepository extends CrudRepository<User, Long> {
    // 自动拥有上述所有方法
}
```

**使用场景**：简单的 CRUD 场景，不需要分页和排序

---

**③ PagingAndSortingRepository&lt;T, ID&gt;**

- **定义**：继承 CrudRepository，增加分页和排序
- **新增方法**：2 个
- **作用**：支持分页查询和排序

**新增方法**：

```java
// 分页查询
Page<T> findAll(Pageable pageable);

// 排序查询
Iterable<T> findAll(Sort sort);
```

**示例**：

```java
public interface UserRepository
    extends PagingAndSortingRepository<User, Long> {

    // 使用分页
    Page<User> findAll(Pageable pageable);

    // 使用排序
    List<User> findAll(Sort sort);
}

// 使用
Pageable pageable = PageRequest.of(0, 10, Sort.by("age").descending());
Page<User> page = userRepository.findAll(pageable);
```

**使用场景**：需要分页展示数据，如列表页面

---

**④ JpaRepository&lt;T, ID&gt;（最常用）**

- **定义**：继承 PagingAndSortingRepository，提供 JPA 特有功能
- **新增方法**：约 8 个
- **作用**：JPA 增强功能，如批量操作、flush 等

**核心新增方法**：

| 方法 | 功能 |
|------|------|
| `flush()` | 强制同步到数据库 |
| `saveAndFlush(S)` | 保存并立即刷新 |
| `deleteInBatch(Iterable<T>)` | 批量删除（一条 SQL） |
| `deleteAllInBatch()` | 批量删除所有 |
| `getOne(ID)` | 获取引用（懒加载） |
| `findAll(Example<S>)` | 根据示例查询 |

```java
public interface UserRepository extends JpaRepository<User, Long> {
    // 拥有所有 CRUD + 分页 + JPA 增强方法
}
```

**优势**：
- 功能最完整
- 性能优化（批量操作）
- Spring Boot 推荐使用

**使用场景**：95% 的场景，推荐默认使用

---

**⑤ 自定义 Repository**

继承以上任一接口，添加自定义查询方法。

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 方法名查询
    User findByUsername(String username);
    List<User> findByAgeGreaterThan(Integer age);

    // @Query 自定义查询
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmail(String email);

    // 分页查询
    Page<User> findByAge(Integer age, Pageable pageable);
}
```

**4. Repository 类型对比表**

| Repository 类型 | 方法数 | 主要功能 | 使用频率 | 推荐度 |
|----------------|-------|---------|---------|-------|
| **Repository** | 0 | 标记接口 | ⭐ | ⭐ |
| **CrudRepository** | ~12 | 基础 CRUD | ⭐⭐⭐ | ⭐⭐⭐ |
| **PagingAndSortingRepository** | ~14 | CRUD + 分页排序 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **JpaRepository** | ~22 | 完整功能 + JPA 增强 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **自定义 Repository** | 自定义 | 业务定制 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**5. 方法继承关系图**

<svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">Repository 方法累积</text>
<rect x="50" y="70" width="180" height="280" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="100" text-anchor="middle" font-size="14" font-weight="bold">CrudRepository</text>
<text x="60" y="130" font-size="12">• save()</text>
<text x="60" y="150" font-size="12">• findById()</text>
<text x="60" y="170" font-size="12">• findAll()</text>
<text x="60" y="190" font-size="12">• count()</text>
<text x="60" y="210" font-size="12">• delete()</text>
<text x="60" y="230" font-size="12">• deleteAll()</text>
<text x="60" y="250" font-size="12">• ...</text>
<text x="140" y="280" text-anchor="middle" font-size="13" fill="#1565c0">约 12 个方法</text>
<rect x="260" y="70" width="180" height="280" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="350" y="100" text-anchor="middle" font-size="14" font-weight="bold">Paging&amp;Sorting</text>
<text x="270" y="130" font-size="12" fill="#999">继承 Crud 所有方法</text>
<text x="270" y="160" font-size="12" fill="#388e3c">新增：</text>
<text x="270" y="180" font-size="12">• findAll(Pageable)</text>
<text x="270" y="200" font-size="12">• findAll(Sort)</text>
<text x="350" y="280" text-anchor="middle" font-size="13" fill="#2e7d32">约 14 个方法</text>
<rect x="470" y="70" width="180" height="280" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="560" y="100" text-anchor="middle" font-size="14" font-weight="bold">JpaRepository</text>
<text x="480" y="130" font-size="12" fill="#999">继承所有方法</text>
<text x="480" y="160" font-size="12" fill="#7b1fa2">新增：</text>
<text x="480" y="180" font-size="12">• flush()</text>
<text x="480" y="200" font-size="12">• saveAndFlush()</text>
<text x="480" y="220" font-size="12">• deleteInBatch()</text>
<text x="480" y="240" font-size="12">• getOne()</text>
<text x="480" y="260" font-size="12">• ...</text>
<text x="560" y="300" text-anchor="middle" font-size="13" fill="#6a1b9a">约 22 个方法</text>
<rect x="680" y="70" width="180" height="280" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="770" y="100" text-anchor="middle" font-size="14" font-weight="bold">自定义</text>
<text x="690" y="130" font-size="12" fill="#999">继承所有方法</text>
<text x="690" y="160" font-size="12" fill="#f57f00">自定义：</text>
<text x="690" y="180" font-size="11">• findByUsername()</text>
<text x="690" y="200" font-size="11">• findByAge()</text>
<text x="690" y="220" font-size="11">• @Query 查询</text>
<text x="690" y="240" font-size="11">• Specification</text>
<text x="690" y="260" font-size="11">• ...</text>
<text x="770" y="300" text-anchor="middle" font-size="13" fill="#f57f00">22 + N 个方法</text>
</svg>

**6. 选择建议**

**场景 1：简单 CRUD**
```java
// 使用 CrudRepository
public interface UserRepository extends CrudRepository<User, Long> {
}
```

**场景 2：需要分页**
```java
// 使用 PagingAndSortingRepository
public interface UserRepository
    extends PagingAndSortingRepository<User, Long> {
}
```

**场景 3：JPA 项目（推荐）**
```java
// 使用 JpaRepository（最常用）
public interface UserRepository extends JpaRepository<User, Long> {
}
```

**场景 4：自定义查询**
```java
// 继承 JpaRepository + 自定义方法
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.age > ?1")
    List<User> findAdults(Integer age);
}
```

**7. 最佳实践**

**① 默认使用 JpaRepository**
```java
// 推荐：功能最全
public interface UserRepository extends JpaRepository<User, Long> {
}
```

**② 命名规范**
```java
// 实体名 + Repository
public interface UserRepository extends JpaRepository<User, Long> {}
public interface OrderRepository extends JpaRepository<Order, Long> {}
```

**③ 泛型参数**
```java
// <实体类型, 主键类型>
JpaRepository<User, Long>
JpaRepository<Order, String>  // 字符串主键
```

**关键要点**

1. Repository 是 Spring Data 的核心抽象，封装数据访问逻辑
2. 继承体系：Repository → CrudRepository → PagingAndSortingRepository → JpaRepository
3. JpaRepository 是最常用的接口，提供完整功能
4. 实际开发推荐直接继承 JpaRepository
5. 可在自定义 Repository 中添加业务方法

**记忆口诀**：Repository 仓储抽象，Crud 基础 Paging 分页，Jpa 增强最常用，自定义方法随便加

### 61. 如何自定义查询方法？

**1. 核心概念**

Spring Data JPA 提供了多种自定义查询方法的方式，让开发者可以灵活地定义数据访问逻辑，无需编写实现代码。

**2. 四种自定义查询方式**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring Data JPA 自定义查询方式</text>
<rect x="40" y="70" width="380" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="230" y="100" text-anchor="middle" font-size="15" font-weight="bold">① 方法名查询（最常用）</text>
<text x="60" y="130" font-size="13">• 根据方法名自动生成查询</text>
<text x="60" y="150" font-size="13">• 无需写 SQL/JPQL</text>
<text x="60" y="170" font-size="12" font-family="monospace">findByUsername(String username)</text>
<text x="60" y="190" font-size="12" font-family="monospace">findByAgeGreaterThan(Integer age)</text>
<text x="60" y="220" font-size="13" fill="#388e3c" font-weight="bold">✓ 简单、直观、类型安全</text>
<rect x="430" y="70" width="380" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="620" y="100" text-anchor="middle" font-size="15" font-weight="bold">② @Query 注解</text>
<text x="450" y="130" font-size="13">• 使用 JPQL 或原生 SQL</text>
<text x="450" y="150" font-size="13">• 支持复杂查询</text>
<text x="450" y="170" font-size="12" font-family="monospace">@Query("SELECT u FROM User u")</text>
<text x="450" y="190" font-size="12" font-family="monospace">@Query(nativeQuery = true)</text>
<text x="450" y="220" font-size="13" fill="#388e3c" font-weight="bold">✓ 灵活、强大、可读性好</text>
<rect x="40" y="270" width="380" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="230" y="300" text-anchor="middle" font-size="15" font-weight="bold">③ Specification（动态查询）</text>
<text x="60" y="330" font-size="13">• JPA Criteria API 封装</text>
<text x="60" y="350" font-size="13">• 动态拼接查询条件</text>
<text x="60" y="370" font-size="12" font-family="monospace">JpaSpecificationExecutor</text>
<text x="60" y="390" font-size="12" font-family="monospace">Specification.where()</text>
<text x="60" y="420" font-size="13" fill="#388e3c" font-weight="bold">✓ 适合复杂动态条件</text>
<rect x="430" y="270" width="380" height="180" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="620" y="300" text-anchor="middle" font-size="15" font-weight="bold">④ 自定义 Repository 实现</text>
<text x="450" y="330" font-size="13">• 完全自定义实现</text>
<text x="450" y="350" font-size="13">• 使用 EntityManager</text>
<text x="450" y="370" font-size="12" font-family="monospace">UserRepositoryImpl</text>
<text x="450" y="390" font-size="12" font-family="monospace">entityManager.createQuery()</text>
<text x="450" y="420" font-size="13" fill="#388e3c" font-weight="bold">✓ 极端复杂场景使用</text>
</svg>

**3. 方法一：方法名查询（推荐）**

Spring Data JPA 会根据方法名自动解析生成查询语句。

**命名规则：**

```
find + By + 属性名 + 条件关键字
```

**示例：**

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 1. 简单查询
    User findByUsername(String username);
    List<User> findByAge(Integer age);

    // 2. And 条件
    User findByUsernameAndEmail(String username, String email);

    // 3. Or 条件
    List<User> findByUsernameOrEmail(String username, String email);

    // 4. 比较运算
    List<User> findByAgeGreaterThan(Integer age);          // age > ?
    List<User> findByAgeLessThanEqual(Integer age);        // age <= ?
    List<User> findByAgeBetween(Integer start, Integer end); // age BETWEEN ? AND ?

    // 5. 模糊查询
    List<User> findByUsernameLike(String pattern);         // LIKE %pattern%
    List<User> findByUsernameStartingWith(String prefix);  // LIKE prefix%
    List<User> findByUsernameEndingWith(String suffix);    // LIKE %suffix
    List<User> findByUsernameContaining(String keyword);   // LIKE %keyword%

    // 6. 空值判断
    List<User> findByEmailIsNull();
    List<User> findByEmailIsNotNull();

    // 7. 集合查询
    List<User> findByAgeIn(Collection<Integer> ages);
    List<User> findByAgeNotIn(Collection<Integer> ages);

    // 8. 排序
    List<User> findByAgeOrderByUsernameAsc(Integer age);
    List<User> findByAgeOrderByUsernameDesc(Integer age);

    // 9. 限制结果数量
    User findFirstByOrderByAgeDesc();
    List<User> findTop3ByOrderByAgeDesc();

    // 10. 忽略大小写
    User findByUsernameIgnoreCase(String username);

    // 11. 分页
    Page<User> findByAge(Integer age, Pageable pageable);
}
```

**支持的关键字对照表：**

| 关键字 | 示例 | JPQL 片段 |
|-------|------|-----------|
| **And** | findByNameAndAge | where name = ? and age = ? |
| **Or** | findByNameOrAge | where name = ? or age = ? |
| **Is, Equals** | findByName, findByNameIs | where name = ? |
| **Between** | findByAgeBetween | where age between ? and ? |
| **LessThan** | findByAgeLessThan | where age < ? |
| **LessThanEqual** | findByAgeLessThanEqual | where age <= ? |
| **GreaterThan** | findByAgeGreaterThan | where age > ? |
| **GreaterThanEqual** | findByAgeGreaterThanEqual | where age >= ? |
| **After** | findByCreateTimeAfter | where createTime > ? |
| **Before** | findByCreateTimeBefore | where createTime < ? |
| **IsNull** | findByAgeIsNull | where age is null |
| **IsNotNull** | findByAgeIsNotNull | where age is not null |
| **Like** | findByNameLike | where name like ? |
| **NotLike** | findByNameNotLike | where name not like ? |
| **StartingWith** | findByNameStartingWith | where name like ?% |
| **EndingWith** | findByNameEndingWith | where name like %? |
| **Containing** | findByNameContaining | where name like %?% |
| **In** | findByAgeIn | where age in (?) |
| **NotIn** | findByAgeNotIn | where age not in (?) |
| **OrderBy** | findByAgeOrderByNameAsc | order by name asc |
| **Not** | findByAgeNot | where age <> ? |
| **True** | findByActiveTrue | where active = true |
| **False** | findByActiveFalse | where active = false |
| **IgnoreCase** | findByNameIgnoreCase | where UPPER(name) = UPPER(?) |

---

**方法二：@Query 注解**

使用 JPQL 或原生 SQL 编写查询语句。

**① JPQL 查询**

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 1. 位置参数
    @Query("SELECT u FROM User u WHERE u.username = ?1")
    User findByUsername(String username);

    // 2. 命名参数（推荐）
    @Query("SELECT u FROM User u WHERE u.username = :username AND u.age = :age")
    User findByUsernameAndAge(@Param("username") String username,
                               @Param("age") Integer age);

    // 3. 模糊查询
    @Query("SELECT u FROM User u WHERE u.username LIKE %:keyword%")
    List<User> searchByKeyword(@Param("keyword") String keyword);

    // 4. 投影查询（只查部分字段）
    @Query("SELECT new com.example.dto.UserDTO(u.id, u.username) FROM User u")
    List<UserDTO> findAllDTO();

    // 5. 聚合查询
    @Query("SELECT COUNT(u) FROM User u WHERE u.age > :age")
    Long countByAgeGreaterThan(@Param("age") Integer age);

    // 6. 更新操作
    @Modifying
    @Query("UPDATE User u SET u.age = :age WHERE u.id = :id")
    int updateAge(@Param("id") Long id, @Param("age") Integer age);

    // 7. 删除操作
    @Modifying
    @Query("DELETE FROM User u WHERE u.age < :age")
    int deleteByAgeLessThan(@Param("age") Integer age);

    // 8. 关联查询
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.orders WHERE u.id = :id")
    User findWithOrders(@Param("id") Long id);
}
```

**② 原生 SQL 查询**

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 1. 原生 SQL
    @Query(value = "SELECT * FROM users WHERE username = ?1", nativeQuery = true)
    User findByUsernameNative(String username);

    // 2. 分页原生 SQL
    @Query(value = "SELECT * FROM users WHERE age > :age",
           countQuery = "SELECT COUNT(*) FROM users WHERE age > :age",
           nativeQuery = true)
    Page<User> findByAgeNative(@Param("age") Integer age, Pageable pageable);

    // 3. 复杂统计
    @Query(value = "SELECT age, COUNT(*) as count FROM users GROUP BY age",
           nativeQuery = true)
    List<Object[]> statisticsByAge();
}
```

**@Query 注解属性：**

| 属性 | 说明 | 默认值 |
|-----|------|--------|
| **value** | JPQL 或 SQL 语句 | 必填 |
| **nativeQuery** | 是否原生 SQL | false |
| **countQuery** | 分页时的 count 查询 | 自动生成 |
| **name** | 命名查询的名称 | 空 |

---

**方法三：Specification 动态查询**

适合需要根据条件动态拼接查询的场景。

```java
// 1. Repository 继承 JpaSpecificationExecutor
public interface UserRepository
    extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
}

// 2. 构建 Specification
public class UserSpecifications {

    // 按用户名查询
    public static Specification<User> hasUsername(String username) {
        return (root, query, cb) -> cb.equal(root.get("username"), username);
    }

    // 年龄大于
    public static Specification<User> ageGreaterThan(Integer age) {
        return (root, query, cb) -> cb.greaterThan(root.get("age"), age);
    }

    // 模糊查询
    public static Specification<User> usernameLike(String keyword) {
        return (root, query, cb) -> cb.like(root.get("username"), "%" + keyword + "%");
    }
}

// 3. 使用 Specification
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> search(String username, Integer age) {
        Specification<User> spec = Specification.where(null);

        if (username != null) {
            spec = spec.and(UserSpecifications.hasUsername(username));
        }

        if (age != null) {
            spec = spec.and(UserSpecifications.ageGreaterThan(age));
        }

        return userRepository.findAll(spec);
    }
}
```

---

**方法四：自定义 Repository 实现**

极端复杂场景下，直接使用 EntityManager。

```java
// 1. 定义自定义接口
public interface UserRepositoryCustom {
    List<User> findByComplexCondition(String keyword);
}

// 2. 实现接口（命名规范：Repository 名 + Impl）
@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> findByComplexCondition(String keyword) {
        String jpql = "SELECT u FROM User u WHERE ...";
        return entityManager.createQuery(jpql, User.class)
                           .setParameter("keyword", keyword)
                           .getResultList();
    }
}

// 3. Repository 继承自定义接口
public interface UserRepository
    extends JpaRepository<User, Long>, UserRepositoryCustom {
}
```

**4. 方法选择建议**

| 场景 | 推荐方式 | 优先级 |
|-----|---------|-------|
| **简单单表查询** | 方法名查询 | ⭐⭐⭐⭐⭐ |
| **复杂查询、多表关联** | @Query | ⭐⭐⭐⭐⭐ |
| **动态条件查询** | Specification | ⭐⭐⭐⭐ |
| **极端复杂场景** | 自定义实现 | ⭐⭐⭐ |

**5. 最佳实践**

**① 优先使用方法名查询**
```java
// 简洁、清晰
User findByUsername(String username);
```

**② 复杂查询使用 @Query**
```java
// 可读性好
@Query("SELECT u FROM User u WHERE u.age > :age AND u.status = 'ACTIVE'")
List<User> findActiveUsers(@Param("age") Integer age);
```

**③ 动态条件用 Specification**
```java
// 灵活组合条件
Specification<User> spec = Specification.where(hasUsername(username))
                                       .and(ageGreaterThan(age));
```

**关键要点**

1. Spring Data JPA 提供四种自定义查询方式
2. 方法名查询适合简单场景，语义清晰
3. @Query 适合复杂查询，支持 JPQL 和原生 SQL
4. Specification 适合动态条件查询
5. 优先使用方法名查询，其次 @Query

**记忆口诀**：方法名简单语义清，Query 复杂灵活用，Specification 动态拼，自定义实现最后门

### 62. 什么是 @Query 注解？

**1. 核心定义**

`@Query` 是 Spring Data JPA 提供的注解，用于在 Repository 方法上自定义查询语句。它支持 **JPQL（Java Persistence Query Language）** 和 **原生 SQL**，提供了比方法名查询更灵活的查询方式。

**2. @Query 注解的作用**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">@Query 注解核心功能</text>
<rect x="100" y="70" width="600" height="280" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="8"/>
<text x="400" y="110" text-anchor="middle" font-size="16" font-weight="bold">@Query 注解</text>
<rect x="130" y="140" width="250" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="255" y="170" text-anchor="middle" font-size="14" font-weight="bold">JPQL 查询</text>
<text x="150" y="200" font-size="12">• 面向对象的查询语言</text>
<text x="150" y="220" font-size="12">• 使用实体类名</text>
<text x="150" y="240" font-size="12">• 数据库无关</text>
<text x="150" y="260" font-size="12">• 类型安全</text>
<text x="150" y="290" font-size="11" font-family="monospace" fill="#f57c00">SELECT u FROM User u</text>
<rect x="420" y="140" width="250" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="545" y="170" text-anchor="middle" font-size="14" font-weight="bold">原生 SQL</text>
<text x="440" y="200" font-size="12">• 使用表名和列名</text>
<text x="440" y="220" font-size="12">• 特定数据库语法</text>
<text x="440" y="240" font-size="12">• 性能优化</text>
<text x="440" y="260" font-size="12">• 复杂查询</text>
<text x="440" y="290" font-size="11" font-family="monospace" fill="#388e3c">SELECT * FROM users</text>
</svg>

**3. 基本用法**

**① JPQL 查询（推荐）**

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 1. 基础查询
    @Query("SELECT u FROM User u WHERE u.username = ?1")
    User findByUsername(String username);

    // 2. 命名参数（推荐）
    @Query("SELECT u FROM User u WHERE u.username = :username")
    User findByUsernameNamed(@Param("username") String username);

    // 3. 多个参数
    @Query("SELECT u FROM User u WHERE u.username = :username AND u.age = :age")
    User findByUsernameAndAge(@Param("username") String username,
                               @Param("age") Integer age);

    // 4. 模糊查询
    @Query("SELECT u FROM User u WHERE u.username LIKE %:keyword%")
    List<User> searchByKeyword(@Param("keyword") String keyword);

    // 5. 排序
    @Query("SELECT u FROM User u ORDER BY u.age DESC")
    List<User> findAllOrderByAge();
}
```

**② 原生 SQL 查询**

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 1. 原生 SQL
    @Query(value = "SELECT * FROM users WHERE username = ?1", nativeQuery = true)
    User findByUsernameNative(String username);

    // 2. 复杂SQL
    @Query(value = "SELECT u.*, COUNT(o.id) as order_count " +
                   "FROM users u LEFT JOIN orders o ON u.id = o.user_id " +
                   "GROUP BY u.id",
           nativeQuery = true)
    List<Object[]> findUsersWithOrderCount();

    // 3. 数据库特有函数
    @Query(value = "SELECT * FROM users WHERE DATE(create_time) = CURDATE()",
           nativeQuery = true)
    List<User> findTodayUsers();
}
```

**4. @Query 注解属性详解**

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| **value** | String | - | JPQL 或 SQL 查询语句（必填） |
| **nativeQuery** | boolean | false | 是否使用原生 SQL |
| **countQuery** | String | - | 分页时的 count 查询 |
| **name** | String | "" | 命名查询的名称 |

**5. 参数绑定方式**

**方式一：位置参数（?+序号）**

```java
@Query("SELECT u FROM User u WHERE u.username = ?1 AND u.age = ?2")
User findByUsernameAndAge(String username, Integer age);
```

**方式二：命名参数（:参数名，推荐）**

```java
@Query("SELECT u FROM User u WHERE u.username = :username AND u.age = :age")
User findByUsernameAndAge(@Param("username") String username,
                           @Param("age") Integer age);
```

**方式三：SpEL 表达式**

```java
@Query("SELECT u FROM User u WHERE u.username = :#{#username}")
User findByUsername(@Param("username") String username);
```

**6. 高级用法**

**① 投影查询（只查部分字段）**

```java
// 方式1：使用 DTO 构造函数
@Query("SELECT new com.example.dto.UserDTO(u.id, u.username, u.email) FROM User u")
List<UserDTO> findAllDTO();

// 方式2：使用接口投影
public interface UserProjection {
    Long getId();
    String getUsername();
}

@Query("SELECT u.id as id, u.username as username FROM User u")
List<UserProjection> findAllProjection();
```

**② 聚合查询**

```java
// 计数
@Query("SELECT COUNT(u) FROM User u WHERE u.age > :age")
Long countByAgeGreaterThan(@Param("age") Integer age);

// 求和
@Query("SELECT SUM(u.age) FROM User u")
Long sumAge();

// 平均值
@Query("SELECT AVG(u.age) FROM User u")
Double avgAge();

// 分组统计
@Query("SELECT u.age, COUNT(u) FROM User u GROUP BY u.age")
List<Object[]> groupByAge();
```

**③ 更新操作**

```java
@Modifying  // 必须添加
@Transactional  // 需要事务
@Query("UPDATE User u SET u.age = :age WHERE u.id = :id")
int updateAge(@Param("id") Long id, @Param("age") Integer age);

@Modifying
@Transactional
@Query("UPDATE User u SET u.status = :status WHERE u.age > :age")
int updateStatusByAge(@Param("status") String status, @Param("age") Integer age);
```

**④ 删除操作**

```java
@Modifying
@Transactional
@Query("DELETE FROM User u WHERE u.age < :age")
int deleteByAgeLessThan(@Param("age") Integer age);

@Modifying
@Transactional
@Query(value = "DELETE FROM users WHERE create_time < ?1", nativeQuery = true)
int deleteByCreateTimeBefore(Date date);
```

**⑤ 关联查询**

```java
// LEFT JOIN
@Query("SELECT u FROM User u LEFT JOIN u.orders o WHERE u.id = :id")
User findWithOrders(@Param("id") Long id);

// FETCH JOIN（解决 N+1 问题）
@Query("SELECT u FROM User u LEFT JOIN FETCH u.orders WHERE u.id = :id")
User findWithOrdersFetch(@Param("id") Long id);

// 多表关联
@Query("SELECT u FROM User u " +
       "INNER JOIN u.orders o " +
       "WHERE o.status = :status")
List<User> findByOrderStatus(@Param("status") String status);
```

**⑥ 分页查询**

```java
// 自动分页
@Query("SELECT u FROM User u WHERE u.age > :age")
Page<User> findByAge(@Param("age") Integer age, Pageable pageable);

// 原生 SQL 分页（需指定 countQuery）
@Query(value = "SELECT * FROM users WHERE age > :age",
       countQuery = "SELECT COUNT(*) FROM users WHERE age > :age",
       nativeQuery = true)
Page<User> findByAgeNative(@Param("age") Integer age, Pageable pageable);
```

**7. JPQL vs 原生 SQL 对比**

| 对比维度 | JPQL | 原生 SQL |
|---------|------|----------|
| **语法** | 面向对象（实体类、属性） | 面向表（表名、列名） |
| **示例** | `FROM User u` | `FROM users` |
| **数据库无关** | ✓ 是 | ✗ 否 |
| **类型安全** | ✓ 强 | ✗ 弱 |
| **复杂查询** | 中等 | ✓ 强 |
| **性能优化** | 自动 | 手动 |
| **数据库函数** | 标准函数 | 特定数据库函数 |
| **推荐场景** | 常规查询 | 复杂查询、性能优化 |

**8. 使用建议**

**优先使用 JPQL：**
- ✓ 数据库可能切换
- ✓ 常规的 CRUD 操作
- ✓ 追求代码可维护性

**使用原生 SQL：**
- ✓ 需要数据库特有函数
- ✓ 复杂的多表关联
- ✓ 性能优化需求
- ✓ 已有 SQL 需要迁移

**9. 注意事项**

**① @Modifying 必须配合使用**

```java
// ✗ 错误：修改操作未加 @Modifying
@Query("UPDATE User u SET u.age = :age")
int update(@Param("age") Integer age);

// ✓ 正确
@Modifying
@Transactional
@Query("UPDATE User u SET u.age = :age")
int update(@Param("age") Integer age);
```

**② 分页查询需指定 countQuery**

```java
// 原生 SQL 分页必须指定 countQuery
@Query(value = "SELECT * FROM users WHERE age > ?1",
       countQuery = "SELECT COUNT(*) FROM users WHERE age > ?1",
       nativeQuery = true)
Page<User> findByAge(Integer age, Pageable pageable);
```

**③ 参数类型匹配**

```java
// ✗ 错误：参数类型不匹配
@Query("SELECT u FROM User u WHERE u.id = :id")
User findById(@Param("id") String id);  // id 是 Long 类型

// ✓ 正确
@Query("SELECT u FROM User u WHERE u.id = :id")
User findById(@Param("id") Long id);
```

**10. 完整示例**

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 1. 简单查询
    @Query("SELECT u FROM User u WHERE u.username = :username")
    User findByUsername(@Param("username") String username);

    // 2. 模糊查询 + 分页
    @Query("SELECT u FROM User u WHERE u.username LIKE %:keyword%")
    Page<User> search(@Param("keyword") String keyword, Pageable pageable);

    // 3. 原生 SQL + 统计
    @Query(value = "SELECT age, COUNT(*) as count FROM users GROUP BY age",
           nativeQuery = true)
    List<Object[]> statisticsByAge();

    // 4. 更新操作
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.status = :status WHERE u.id = :id")
    int updateStatus(@Param("id") Long id, @Param("status") String status);

    // 5. 关联查询
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.orders WHERE u.id = :id")
    User findWithOrders(@Param("id") Long id);
}
```

**关键要点**

1. @Query 用于自定义查询，支持 JPQL 和原生 SQL
2. JPQL 面向对象，数据库无关；原生 SQL 面向表，灵活强大
3. 推荐使用命名参数（:参数名）而非位置参数
4. 修改/删除操作必须加 @Modifying 和 @Transactional
5. 优先使用 JPQL，复杂场景使用原生 SQL

**记忆口诀**：Query 自定义查询，JPQL 对象 SQL 表名，命名参数更清晰，修改删除加注解

### 63. 如何实现分页查询？

**1. 核心概念**

Spring Data JPA 提供了完善的分页支持，通过 `Pageable` 接口和 `Page` 对象实现分页查询，无需手动计算 offset 和 limit。

**2. 分页核心接口**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring Data JPA 分页核心接口</text>
<rect x="100" y="70" width="250" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="225" y="100" text-anchor="middle" font-size="15" font-weight="bold">Pageable (请求)</text>
<text x="120" y="130" font-size="13">• 页码 (page)</text>
<text x="120" y="150" font-size="13">• 每页大小 (size)</text>
<text x="120" y="170" font-size="13">• 排序 (sort)</text>
<rect x="450" y="70" width="250" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="575" y="100" text-anchor="middle" font-size="15" font-weight="bold">Page (响应)</text>
<text x="470" y="130" font-size="13">• 数据列表 (content)</text>
<text x="470" y="150" font-size="13">• 总记录数 (total)</text>
<text x="470" y="170" font-size="13">• 总页数 (totalPages)</text>
<line x1="350" y1="130" x2="440" y2="130" stroke="#424242" stroke-width="2" marker-end="url(#a)"/>
<text x="395" y="120" font-size="12" fill="#666">查询</text>
<rect x="275" y="230" width="250" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="260" text-anchor="middle" font-size="14" font-weight="bold">PageRequest</text>
<text x="295" y="285" font-size="12">Pageable 的默认实现类</text>
<line x1="400" y1="190" x2="400" y2="230" stroke="#424242" stroke-width="2" marker-end="url(#a)"/>
<defs>
<marker id="a" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#424242"/>
</marker>
</defs>
</svg>

**3. 四种分页实现方式**

**方式一：继承 PagingAndSortingRepository**

```java
public interface UserRepository
    extends PagingAndSortingRepository<User, Long> {

    // 自动支持分页
}

// 使用
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Page<User> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }
}
```

**方式二：方法名查询 + Pageable 参数**

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // 添加 Pageable 参数即可分页
    Page<User> findByAge(Integer age, Pageable pageable);

    Page<User> findByUsernameLike(String username, Pageable pageable);

    // 也可以返回 List（不含分页信息）
    List<User> findByAge(Integer age, Pageable pageable);
}

// 使用
Page<User> page = userRepository.findByAge(25, PageRequest.of(0, 10));
```

**方式三：@Query + Pageable**

```java
public interface UserRepository extends JpaRepository<User, Long> {

    // JPQL 分页
    @Query("SELECT u FROM User u WHERE u.age > :age")
    Page<User> findByAgeGreaterThan(@Param("age") Integer age, Pageable pageable);

    // 原生 SQL 分页（需指定 countQuery）
    @Query(value = "SELECT * FROM users WHERE age > :age",
           countQuery = "SELECT COUNT(*) FROM users WHERE age > :age",
           nativeQuery = true)
    Page<User> findByAgeNative(@Param("age") Integer age, Pageable pageable);
}
```

**方式四：Specification + Pageable**

```java
public interface UserRepository
    extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
}

// 使用
Specification<User> spec = (root, query, cb) ->
    cb.greaterThan(root.get("age"), 25);

Pageable pageable = PageRequest.of(0, 10);
Page<User> page = userRepository.findAll(spec, pageable);
```

**4. PageRequest 创建方式**

```java
// 1. 基本分页（页码从 0 开始）
Pageable pageable = PageRequest.of(0, 10);  // 第1页，每页10条

// 2. 分页 + 排序
Pageable pageable = PageRequest.of(0, 10, Sort.by("age").descending());

// 3. 分页 + 多字段排序
Pageable pageable = PageRequest.of(0, 10,
    Sort.by("age").descending()
        .and(Sort.by("username").ascending())
);

// 4. 使用 Sort.Order
Pageable pageable = PageRequest.of(0, 10,
    Sort.by(
        Sort.Order.desc("age"),
        Sort.Order.asc("username")
    )
);
```

**5. Page 对象常用方法**

```java
Page<User> page = userRepository.findAll(PageRequest.of(0, 10));

// 获取数据
List<User> content = page.getContent();              // 当前页数据
User firstUser = page.getContent().get(0);           // 第一条数据

// 分页信息
int currentPage = page.getNumber();                   // 当前页码（从0开始）
int pageSize = page.getSize();                        // 每页大小
long totalElements = page.getTotalElements();         // 总记录数
int totalPages = page.getTotalPages();                // 总页数

// 判断
boolean hasContent = page.hasContent();               // 是否有数据
boolean hasNext = page.hasNext();                     // 是否有下一页
boolean hasPrevious = page.hasPrevious();             // 是否有上一页
boolean isFirst = page.isFirst();                     // 是否第一页
boolean isLast = page.isLast();                       // 是否最后一页

// 获取下一页/上一页 Pageable
Pageable nextPageable = page.nextPageable();
Pageable previousPageable = page.previousPageable();

// 遍历
page.forEach(user -> System.out.println(user));

// 转换（DTO 转换）
Page<UserDTO> dtoPage = page.map(user -> new UserDTO(user));
```

**6. 完整示例**

**Controller 层：**

```java
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Page<User>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort.Direction dir = direction.equalsIgnoreCase("desc") ?
                             Sort.Direction.DESC : Sort.Direction.ASC;

        Page<User> result = userService.findAll(page, size, sort, dir);
        return ResponseEntity.ok(result);
    }
}
```

**Service 层：**

```java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Page<User> findAll(int page, int size, String sortBy, Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        return userRepository.findAll(pageable);
    }

    public Page<User> searchByKeyword(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findByUsernameLike("%" + keyword + "%", pageable);
    }
}
```

**Repository 层：**

```java
public interface UserRepository extends JpaRepository<User, Long> {

    Page<User> findByUsernameLike(String username, Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.age BETWEEN :minAge AND :maxAge")
    Page<User> findByAgeRange(@Param("minAge") Integer minAge,
                               @Param("maxAge") Integer maxAge,
                               Pageable pageable);
}
```

**7. 返回数据格式**

```json
{
  "content": [
    {"id": 1, "username": "user1", "age": 25},
    {"id": 2, "username": "user2", "age": 30}
  ],
  "pageable": {
    "sort": {"sorted": true, "unsorted": false, "empty": false},
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "totalPages": 5,
  "totalElements": 50,
  "last": false,
  "first": true,
  "number": 0,
  "size": 10,
  "numberOfElements": 10,
  "empty": false
}
```

**8. 性能优化建议**

**① 避免查询总数**

```java
// 如果不需要总数，使用 Slice
Slice<User> slice = userRepository.findByAge(25, PageRequest.of(0, 10));
// Slice 只知道是否有下一页，不查询总数
```

**② 使用覆盖索引**

```sql
-- 为常用查询字段创建索引
CREATE INDEX idx_age ON users(age);
CREATE INDEX idx_username ON users(username);
```

**③ 避免大偏移量**

```java
// 大offset会导致性能问题
// 不推荐：SELECT * FROM users LIMIT 100000, 10

// 推荐：使用ID范围查询
@Query("SELECT u FROM User u WHERE u.id > :lastId ORDER BY u.id")
List<User> findByIdGreaterThan(@Param("lastId") Long lastId, Pageable pageable);
```

**9. 分页 vs Slice**

| 特性 | Page | Slice |
|-----|------|-------|
| **查询总数** | ✓ 是 | ✗ 否 |
| **totalElements** | ✓ 有 | ✗ 无 |
| **totalPages** | ✓ 有 | ✗ 无 |
| **hasNext()** | ✓ 有 | ✓ 有 |
| **性能** | 需要额外 count 查询 | 更快 |
| **适用场景** | 需要总数的分页 | 无限滚动、流式加载 |

```java
// Slice 用法
public interface UserRepository extends JpaRepository<User, Long> {
    Slice<User> findByAge(Integer age, Pageable pageable);
}

Slice<User> slice = userRepository.findByAge(25, PageRequest.of(0, 10));
boolean hasNext = slice.hasNext();  // 只知道是否有下一页
```

**10. 注意事项**

**① 页码从 0 开始**
```java
// 第1页是 page=0，不是 page=1
PageRequest.of(0, 10);  // 第1页
PageRequest.of(1, 10);  // 第2页
```

**② 原生 SQL 必须提供 countQuery**
```java
@Query(value = "SELECT * FROM users",
       countQuery = "SELECT COUNT(*) FROM users",  // 必须
       nativeQuery = true)
Page<User> findAll(Pageable pageable);
```

**③ 排序字段必须存在**
```java
// ✗ 错误：字段不存在
Sort.by("nonExistentField");

// ✓ 正确
Sort.by("username");
```

**关键要点**

1. Spring Data JPA 通过 Pageable 和 Page 实现分页
2. 四种方式：继承接口、方法名、@Query、Specification
3. PageRequest.of(page, size) 创建分页请求（页码从0开始）
4. Page 包含数据和分页信息，Slice 只有数据和 hasNext
5. 原生 SQL 分页必须指定 countQuery

**记忆口诀**：Pageable 请求 Page 响应，页码从零要记住，四种方式都支持，性能优化看场景

### 64. 如何实现动态查询？

**1. 核心问题**

动态查询是指根据不同的查询条件动态生成查询语句。例如，用户可能输入0个、1个或多个查询条件，我们需要灵活地拼接SQL。

**2. 三种动态查询方式**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring Data JPA 动态查询方式</text>
<rect x="50" y="70" width="230" height="340" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="165" y="105" text-anchor="middle" font-size="15" font-weight="bold">① Specification</text>
<text x="165" y="125" text-anchor="middle" font-size="13">(推荐)</text>
<text x="70" y="155" font-size="12">优点：</text>
<text x="70" y="175" font-size="11">• 类型安全</text>
<text x="70" y="195" font-size="11">• 灵活组合条件</text>
<text x="70" y="215" font-size="11">• Spring官方支持</text>
<text x="70" y="245" font-size="12">缺点：</text>
<text x="70" y="265" font-size="11">• 代码相对复杂</text>
<text x="70" y="285" font-size="11">• 学习成本高</text>
<text x="70" y="315" font-size="12">适用场景：</text>
<text x="70" y="335" font-size="11">• 复杂的动态条件</text>
<text x="70" y="355" font-size="11">• 多条件组合查询</text>
<text x="165" y="390" text-anchor="middle" font-size="13" fill="#1565c0" font-weight="bold">⭐⭐⭐⭐⭐</text>
<rect x="300" y="70" width="230" height="340" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="415" y="105" text-anchor="middle" font-size="15" font-weight="bold">② Example</text>
<text x="415" y="125" text-anchor="middle" font-size="13">(简单场景)</text>
<text x="320" y="155" font-size="12">优点：</text>
<text x="320" y="175" font-size="11">• 使用简单</text>
<text x="320" y="195" font-size="11">• 无需写查询逻辑</text>
<text x="320" y="215" font-size="11">• 快速上手</text>
<text x="320" y="245" font-size="12">缺点：</text>
<text x="320" y="265" font-size="11">• 功能有限</text>
<text x="320" y="285" font-size="11">• 不支持复杂条件</text>
<text x="320" y="315" font-size="12">适用场景：</text>
<text x="320" y="335" font-size="11">• 简单相等匹配</text>
<text x="320" y="355" font-size="11">• 原型开发</text>
<text x="415" y="390" text-anchor="middle" font-size="13" fill="#f57c00" font-weight="bold">⭐⭐⭐</text>
<rect x="550" y="70" width="230" height="340" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="665" y="105" text-anchor="middle" font-size="15" font-weight="bold">③ QueryDSL</text>
<text x="665" y="125" text-anchor="middle" font-size="13">(第三方)</text>
<text x="570" y="155" font-size="12">优点：</text>
<text x="570" y="175" font-size="11">• 类型安全</text>
<text x="570" y="195" font-size="11">• 流式API优雅</text>
<text x="570" y="215" font-size="11">• 功能强大</text>
<text x="570" y="245" font-size="12">缺点：</text>
<text x="570" y="265" font-size="11">• 需额外依赖</text>
<text x="570" y="285" font-size="11">• 需生成Q类</text>
<text x="570" y="315" font-size="12">适用场景：</text>
<text x="570" y="335" font-size="11">• 大型项目</text>
<text x="570" y="355" font-size="11">• 追求极致体验</text>
<text x="665" y="390" text-anchor="middle" font-size="13" fill="#388e3c" font-weight="bold">⭐⭐⭐⭐</text>
</svg>

**3. 方法一：Specification（推荐）**

Specification 是 Spring Data JPA 对 JPA Criteria API 的封装，提供类型安全的动态查询。

**步骤 1：Repository 继承 JpaSpecificationExecutor**

```java
public interface UserRepository
    extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
}
```

**步骤 2：构建 Specification**

```java
public class UserSpecifications {

    // 用户名等于
    public static Specification<User> hasUsername(String username) {
        return (root, query, cb) -> {
            if (username == null) {
                return null;  // 返回null表示不添加此条件
            }
            return cb.equal(root.get("username"), username);
        };
    }

    // 年龄大于
    public static Specification<User> ageGreaterThan(Integer age) {
        return (root, query, cb) -> {
            if (age == null) {
                return null;
            }
            return cb.greaterThan(root.get("age"), age);
        };
    }

    // 用户名模糊匹配
    public static Specification<User> usernameLike(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.isEmpty()) {
                return null;
            }
            return cb.like(root.get("username"), "%" + keyword + "%");
        };
    }

    // 创建时间范围
    public static Specification<User> createTimeBetween(Date start, Date end) {
        return (root, query, cb) -> {
            if (start == null || end == null) {
                return null;
            }
            return cb.between(root.get("createTime"), start, end);
        };
    }
}
```

**步骤 3：组合使用**

```java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Page<User> search(String username, Integer minAge, String keyword,
                             int page, int size) {

        // 方式1：链式调用
        Specification<User> spec = Specification.where(null);

        if (username != null) {
            spec = spec.and(UserSpecifications.hasUsername(username));
        }
        if (minAge != null) {
            spec = spec.and(UserSpecifications.ageGreaterThan(minAge));
        }
        if (keyword != null) {
            spec = spec.and(UserSpecifications.usernameLike(keyword));
        }

        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(spec, pageable);
    }

    // 方式2：直接组合
    public List<User> search2(String username, Integer age) {
        Specification<User> spec = Specification.where(
            UserSpecifications.hasUsername(username)
        ).and(
            UserSpecifications.ageGreaterThan(age)
        );

        return userRepository.findAll(spec);
    }
}
```

**常用 Criteria 方法：**

```java
public class UserSpecifications {

    public static Specification<User> buildSpec(UserSearchDTO dto) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. 等于
            if (dto.getUsername() != null) {
                predicates.add(cb.equal(root.get("username"), dto.getUsername()));
            }

            // 2. 不等于
            if (dto.getStatus() != null) {
                predicates.add(cb.notEqual(root.get("status"), "DELETED"));
            }

            // 3. 大于/小于
            if (dto.getMinAge() != null) {
                predicates.add(cb.greaterThan(root.get("age"), dto.getMinAge()));
            }
            if (dto.getMaxAge() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("age"), dto.getMaxAge()));
            }

            // 4. 模糊查询
            if (dto.getKeyword() != null) {
                predicates.add(cb.like(root.get("username"), "%" + dto.getKeyword() + "%"));
            }

            // 5. IN 查询
            if (dto.getAges() != null && !dto.getAges().isEmpty()) {
                predicates.add(root.get("age").in(dto.getAges()));
            }

            // 6. BETWEEN
            if (dto.getStartDate() != null && dto.getEndDate() != null) {
                predicates.add(cb.between(root.get("createTime"),
                                         dto.getStartDate(), dto.getEndDate()));
            }

            // 7. IS NULL / IS NOT NULL
            if (dto.getEmailRequired() != null && dto.getEmailRequired()) {
                predicates.add(cb.isNotNull(root.get("email")));
            }

            // 8. OR 条件
            if (dto.getUsernameOrEmail() != null) {
                Predicate p1 = cb.equal(root.get("username"), dto.getUsernameOrEmail());
                Predicate p2 = cb.equal(root.get("email"), dto.getUsernameOrEmail());
                predicates.add(cb.or(p1, p2));
            }

            // 9. 关联查询
            if (dto.getOrderStatus() != null) {
                Join<User, Order> orderJoin = root.join("orders", JoinType.LEFT);
                predicates.add(cb.equal(orderJoin.get("status"), dto.getOrderStatus()));
            }

            // 10. 子查询
            if (dto.getHasOrders() != null && dto.getHasOrders()) {
                Subquery<Long> subquery = query.subquery(Long.class);
                Root<Order> orderRoot = subquery.from(Order.class);
                subquery.select(orderRoot.get("userId"));
                subquery.where(cb.equal(orderRoot.get("userId"), root.get("id")));
                predicates.add(cb.exists(subquery));
            }

            // 组合所有条件（AND）
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
```

---

**方法二：Example（简单场景）**

Example 适合简单的相等匹配查询。

```java
// Repository 继承 QueryByExampleExecutor
public interface UserRepository
    extends JpaRepository<User, Long>, QueryByExampleExecutor<User> {
}

// 使用
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> search(String username, Integer age) {
        // 1. 创建示例对象
        User probe = new User();
        probe.setUsername(username);
        probe.setAge(age);

        // 2. 创建匹配器
        ExampleMatcher matcher = ExampleMatcher.matching()
            .withIgnoreNullValues()  // 忽略null值
            .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)  // 字符串包含
            .withIgnoreCase();  // 忽略大小写

        // 3. 创建Example
        Example<User> example = Example.of(probe, matcher);

        // 4. 查询
        return userRepository.findAll(example);
    }

    // 分页查询
    public Page<User> searchPage(User probe, int page, int size) {
        Example<User> example = Example.of(probe);
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(example, pageable);
    }
}
```

**Example 限制：**
- 只支持相等匹配（无法实现 >、<、BETWEEN）
- 字符串只支持 starts/contains/ends/regex
- 不支持嵌套或分组条件

---

**方法三：QueryDSL（可选）**

QueryDSL 提供流式API，类型安全。

**步骤 1：添加依赖和插件**

```xml
<dependencies>
    <dependency>
        <groupId>com.querydsl</groupId>
        <artifactId>querydsl-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.querydsl</groupId>
        <artifactId>querydsl-apt</artifactId>
        <scope>provided</scope>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>com.mysema.maven</groupId>
            <artifactId>apt-maven-plugin</artifactId>
            <executions>
                <execution>
                    <goals>
                        <goal>process</goal>
                    </goals>
                    <configuration>
                        <outputDirectory>target/generated-sources/java</outputDirectory>
                        <processor>com.querydsl.apt.jpa.JPAAnnotationProcessor</processor>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

**步骤 2：生成 Q 类后使用**

```java
@Repository
public class UserRepositoryImpl {

    @PersistenceContext
    private EntityManager entityManager;

    public List<User> search(String username, Integer minAge) {
        QUser user = QUser.user;

        JPAQuery<User> query = new JPAQuery<>(entityManager);

        BooleanBuilder builder = new BooleanBuilder();

        if (username != null) {
            builder.and(user.username.eq(username));
        }
        if (minAge != null) {
            builder.and(user.age.gt(minAge));
        }

        return query.from(user)
                   .where(builder)
                   .fetch();
    }
}
```

**4. 三种方式对比**

| 对比维度 | Specification | Example | QueryDSL |
|---------|--------------|---------|----------|
| **类型安全** | ✓ | ✓ | ✓✓ |
| **学习成本** | 中 | 低 | 中高 |
| **功能强大** | ✓✓ | ✗ | ✓✓✓ |
| **代码优雅** | 中 | 高 | ✓✓ |
| **官方支持** | ✓ | ✓ | ✗ |
| **额外依赖** | 无 | 无 | 需要 |
| **推荐度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

**5. 选择建议**

- **简单场景**：Example
- **常规动态查询**：Specification
- **大型项目**：QueryDSL

**关键要点**

1. 动态查询用于根据不同条件灵活拼接查询语句
2. Specification 是官方推荐方式，功能强大
3. Example 适合简单的相等匹配
4. QueryDSL 提供最优雅的API，但需额外配置
5. 实际项目推荐使用 Specification

**记忆口诀**：动态查询三方式，Specification官方推，Example简单快，QueryDSL最优雅

### 65. 什么是 Specification？

**1. 核心定义**

Specification 是 Spring Data JPA 提供的一种类型安全的动态查询规范，它是对 **JPA Criteria API** 的封装，让开发者可以通过编程方式构建复杂的、可组合的查询条件。

**2. Specification 架构**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">Specification 架构</text>
<rect x="250" y="70" width="300" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="400" y="100" text-anchor="middle" font-size="16" font-weight="bold">Specification&lt;T&gt;</text>
<text x="400" y="125" text-anchor="middle" font-size="13">函数式接口</text>
<rect x="100" y="200" width="250" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="225" y="230" text-anchor="middle" font-size="14" font-weight="bold">核心方法</text>
<text x="120" y="260" font-size="12" font-family="monospace">toPredicate(</text>
<text x="130" y="280" font-size="11">Root&lt;T&gt; root,</text>
<text x="130" y="295" font-size="11">CriteriaQuery&lt;?&gt; query,</text>
<text x="130" y="310" font-size="11">CriteriaBuilder cb)</text>
<rect x="450" y="200" width="250" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="575" y="230" text-anchor="middle" font-size="14" font-weight="bold">三大组件</text>
<text x="470" y="260" font-size="12">• Root: 查询根对象</text>
<text x="470" y="280" font-size="12">• Query: 查询对象</text>
<text x="470" y="300" font-size="12">• CriteriaBuilder: 构建器</text>
<rect x="150" y="350" width="200" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="250" y="380" text-anchor="middle" font-size="13" font-weight="bold">组合方式</text>
<text x="170" y="400" font-size="11">and() / or() / not()</text>
<rect x="450" y="350" width="200" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="550" y="380" text-anchor="middle" font-size="13" font-weight="bold">执行接口</text>
<text x="470" y="400" font-size="11">JpaSpecificationExecutor</text>
<line x1="400" y1="150" x2="225" y2="200" stroke="#424242" stroke-width="2" marker-end="url(#arr)"/>
<line x1="400" y1="150" x2="575" y2="200" stroke="#424242" stroke-width="2" marker-end="url(#arr)"/>
<line x1="250" y1="300" x2="250" y2="350" stroke="#424242" stroke-width="2" marker-end="url(#arr)"/>
<line x1="550" y1="300" x2="550" y2="350" stroke="#424242" stroke-width="2" marker-end="url(#arr)"/>
<defs>
<marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#424242"/>
</marker>
</defs>
</svg>

**3. Specification 接口源码**

```java
@FunctionalInterface
public interface Specification<T> extends Serializable {

    /**
     * 创建查询条件（核心方法）
     * @param root 查询根对象，代表查询的实体类型
     * @param query 查询对象，用于设置查询的各种属性
     * @param criteriaBuilder 条件构建器，用于创建 Predicate
     * @return 查询条件（Predicate）
     */
    Predicate toPredicate(Root<T> root,
                         CriteriaQuery<?> query,
                         CriteriaBuilder criteriaBuilder);

    // 静态方法：组合多个 Specification
    static <T> Specification<T> where(Specification<T> spec) {
        return spec;
    }

    // 实例方法：AND 组合
    default Specification<T> and(Specification<T> other) {
        // ...
    }

    // 实例方法：OR 组合
    default Specification<T> or(Specification<T> other) {
        // ...
    }

    // 静态方法：NOT
    static <T> Specification<T> not(Specification<T> spec) {
        // ...
    }
}
```

**4. 三大核心组件**

**① Root&lt;T&gt; - 查询根对象**

代表要查询的实体类型，用于获取实体属性。

```java
// 获取简单属性
root.get("username")           // 获取 username 属性
root.get("age")               // 获取 age 属性

// 获取嵌套属性
root.get("address").get("city")  // 获取 address.city

// 关联查询（JOIN）
Join<User, Order> orderJoin = root.join("orders", JoinType.LEFT);
orderJoin.get("status")
```

**② CriteriaQuery&lt;?&gt; - 查询对象**

用于设置查询的各种属性（排序、分组等）。

```java
// 去重
query.distinct(true);

// 分组（在 Specification 内部使用较少，通常由 JPA 处理）
query.groupBy(root.get("age"));
```

**③ CriteriaBuilder - 条件构建器**

用于创建各种查询条件（Predicate）。

```java
// 等于
cb.equal(root.get("username"), "admin")

// 不等于
cb.notEqual(root.get("status"), "DELETED")

// 大于/小于
cb.greaterThan(root.get("age"), 18)
cb.lessThanOrEqualTo(root.get("age"), 60)

// 模糊查询
cb.like(root.get("username"), "%keyword%")

// IN 查询
root.get("age").in(Arrays.asList(20, 25, 30))

// BETWEEN
cb.between(root.get("age"), 18, 60)

// IS NULL / IS NOT NULL
cb.isNull(root.get("email"))
cb.isNotNull(root.get("email"))

// AND / OR
cb.and(predicate1, predicate2)
cb.or(predicate1, predicate2)
```

**5. 使用步骤**

**步骤 1：Repository 继承 JpaSpecificationExecutor**

```java
public interface UserRepository
    extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    // 继承后自动拥有以下方法：
    // Optional<T> findOne(Specification<T> spec);
    // List<T> findAll(Specification<T> spec);
    // Page<T> findAll(Specification<T> spec, Pageable pageable);
    // List<T> findAll(Specification<T> spec, Sort sort);
    // long count(Specification<T> spec);
}
```

**步骤 2：创建 Specification**

```java
// 方式 1：Lambda 表达式（推荐）
Specification<User> spec = (root, query, cb) -> {
    return cb.equal(root.get("username"), "admin");
};

// 方式 2：静态方法
public class UserSpecifications {
    public static Specification<User> hasUsername(String username) {
        return (root, query, cb) -> cb.equal(root.get("username"), username);
    }
}

// 方式 3：匿名内部类
Specification<User> spec = new Specification<User>() {
    @Override
    public Predicate toPredicate(Root<User> root,
                                 CriteriaQuery<?> query,
                                 CriteriaBuilder cb) {
        return cb.equal(root.get("username"), "admin");
    }
};
```

**步骤 3：使用 Specification 查询**

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> search(String username) {
        Specification<User> spec = (root, query, cb) ->
            cb.equal(root.get("username"), username);

        return userRepository.findAll(spec);
    }
}
```

**6. Specification 组合（核心特性）**

Specification 的强大之处在于可以灵活组合条件。

**① 链式组合（推荐）**

```java
public List<User> search(String username, Integer minAge, String keyword) {
    Specification<User> spec = Specification.where(null);

    // 动态添加条件
    if (username != null) {
        spec = spec.and((root, query, cb) ->
            cb.equal(root.get("username"), username));
    }

    if (minAge != null) {
        spec = spec.and((root, query, cb) ->
            cb.greaterThan(root.get("age"), minAge));
    }

    if (keyword != null) {
        spec = spec.and((root, query, cb) ->
            cb.like(root.get("username"), "%" + keyword + "%"));
    }

    return userRepository.findAll(spec);
}
```

**② 静态方法组合**

```java
public class UserSpecifications {

    public static Specification<User> hasUsername(String username) {
        return (root, query, cb) -> {
            if (username == null) return null;
            return cb.equal(root.get("username"), username);
        };
    }

    public static Specification<User> ageGreaterThan(Integer age) {
        return (root, query, cb) -> {
            if (age == null) return null;
            return cb.greaterThan(root.get("age"), age);
        };
    }

    public static Specification<User> usernameLike(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null) return null;
            return cb.like(root.get("username"), "%" + keyword + "%");
        };
    }
}

// 使用
Specification<User> spec = Specification
    .where(UserSpecifications.hasUsername(username))
    .and(UserSpecifications.ageGreaterThan(minAge))
    .and(UserSpecifications.usernameLike(keyword));

List<User> users = userRepository.findAll(spec);
```

**③ OR 条件组合**

```java
// username = 'admin' OR email = 'admin@example.com'
Specification<User> spec1 = (root, query, cb) ->
    cb.equal(root.get("username"), "admin");

Specification<User> spec2 = (root, query, cb) ->
    cb.equal(root.get("email"), "admin@example.com");

Specification<User> spec = spec1.or(spec2);
```

**④ 复杂组合**

```java
// (username = 'admin' OR email = 'admin@example.com') AND age > 18
Specification<User> spec = Specification
    .where(
        ((Specification<User>) (root, query, cb) ->
            cb.equal(root.get("username"), "admin"))
        .or((root, query, cb) ->
            cb.equal(root.get("email"), "admin@example.com"))
    )
    .and((root, query, cb) ->
        cb.greaterThan(root.get("age"), 18));
```

**7. 完整示例**

```java
// 1. 实体类
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private Integer age;
    private String email;
    private String status;
    // getters and setters...
}

// 2. Repository
public interface UserRepository
    extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
}

// 3. Specification 工具类
public class UserSpecifications {

    // 用户名等于
    public static Specification<User> usernameEquals(String username) {
        return (root, query, cb) -> {
            if (username == null) return null;
            return cb.equal(root.get("username"), username);
        };
    }

    // 年龄区间
    public static Specification<User> ageBetween(Integer minAge, Integer maxAge) {
        return (root, query, cb) -> {
            if (minAge == null && maxAge == null) return null;
            if (minAge == null) return cb.lessThanOrEqualTo(root.get("age"), maxAge);
            if (maxAge == null) return cb.greaterThanOrEqualTo(root.get("age"), minAge);
            return cb.between(root.get("age"), minAge, maxAge);
        };
    }

    // 用户名或邮箱包含关键字
    public static Specification<User> searchByKeyword(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.isEmpty()) return null;
            String pattern = "%" + keyword + "%";
            Predicate usernamePredicate = cb.like(root.get("username"), pattern);
            Predicate emailPredicate = cb.like(root.get("email"), pattern);
            return cb.or(usernamePredicate, emailPredicate);
        };
    }

    // 状态不等于
    public static Specification<User> statusNotEquals(String status) {
        return (root, query, cb) -> {
            if (status == null) return null;
            return cb.notEqual(root.get("status"), status);
        };
    }

    // 邮箱不为空
    public static Specification<User> emailNotNull() {
        return (root, query, cb) -> cb.isNotNull(root.get("email"));
    }
}

// 4. Service
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 综合搜索
    public Page<User> search(String username, Integer minAge, Integer maxAge,
                             String keyword, String status,
                             int page, int size) {

        Specification<User> spec = Specification
            .where(UserSpecifications.usernameEquals(username))
            .and(UserSpecifications.ageBetween(minAge, maxAge))
            .and(UserSpecifications.searchByKeyword(keyword))
            .and(UserSpecifications.statusNotEquals(status))
            .and(UserSpecifications.emailNotNull());

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return userRepository.findAll(spec, pageable);
    }

    // 统计
    public long count(String username, Integer minAge) {
        Specification<User> spec = Specification
            .where(UserSpecifications.usernameEquals(username))
            .and(UserSpecifications.ageBetween(minAge, null));

        return userRepository.count(spec);
    }
}

// 5. Controller
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<Page<User>> search(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<User> result = userService.search(
            username, minAge, maxAge, keyword, status, page, size);
        return ResponseEntity.ok(result);
    }
}
```

**8. Specification vs 其他查询方式**

| 对比维度 | 方法名查询 | @Query | Specification |
|---------|----------|--------|--------------|
| **类型安全** | ✓ | 部分 | ✓✓ |
| **动态条件** | ✗ | ✗ | ✓✓ |
| **复杂度** | 简单 | 中等 | 复杂 |
| **可读性** | ✓✓ | ✓✓ | 中等 |
| **学习成本** | 低 | 中 | 高 |
| **灵活性** | ✗ | 中 | ✓✓ |
| **代码复用** | ✗ | ✗ | ✓✓ |
| **推荐场景** | 简单查询 | 固定复杂查询 | 动态复杂查询 |

**9. 常见的 CriteriaBuilder 方法**

**① 比较操作**

```java
// 等于
cb.equal(root.get("field"), value)

// 不等于
cb.notEqual(root.get("field"), value)

// 大于
cb.greaterThan(root.get("field"), value)
cb.gt(root.get("field"), value)  // 数字类型

// 大于等于
cb.greaterThanOrEqualTo(root.get("field"), value)
cb.ge(root.get("field"), value)

// 小于
cb.lessThan(root.get("field"), value)
cb.lt(root.get("field"), value)

// 小于等于
cb.lessThanOrEqualTo(root.get("field"), value)
cb.le(root.get("field"), value)

// BETWEEN
cb.between(root.get("field"), start, end)
```

**② 字符串操作**

```java
// LIKE
cb.like(root.get("field"), "%keyword%")

// NOT LIKE
cb.notLike(root.get("field"), "%keyword%")

// 忽略大小写
cb.like(cb.lower(root.get("field")), "%keyword%")
```

**③ 空值判断**

```java
// IS NULL
cb.isNull(root.get("field"))

// IS NOT NULL
cb.isNotNull(root.get("field"))
```

**④ 集合操作**

```java
// IN
root.get("field").in(Arrays.asList(value1, value2, value3))

// NOT IN
cb.not(root.get("field").in(Arrays.asList(value1, value2)))
```

**⑤ 逻辑操作**

```java
// AND
cb.and(predicate1, predicate2, ...)

// OR
cb.or(predicate1, predicate2, ...)

// NOT
cb.not(predicate)
```

**⑥ 聚合函数**

```java
// COUNT
cb.count(root)

// SUM
cb.sum(root.get("field"))

// AVG
cb.avg(root.get("field"))

// MAX
cb.max(root.get("field"))

// MIN
cb.min(root.get("field"))
```

**10. 高级用法**

**① 关联查询（JOIN）**

```java
public static Specification<User> hasOrderStatus(String orderStatus) {
    return (root, query, cb) -> {
        if (orderStatus == null) return null;

        // LEFT JOIN orders
        Join<User, Order> orderJoin = root.join("orders", JoinType.LEFT);
        return cb.equal(orderJoin.get("status"), orderStatus);
    };
}
```

**② 子查询**

```java
public static Specification<User> hasOrders() {
    return (root, query, cb) -> {
        // 子查询：查询有订单的用户
        Subquery<Long> subquery = query.subquery(Long.class);
        Root<Order> orderRoot = subquery.from(Order.class);
        subquery.select(orderRoot.get("userId"));
        subquery.where(cb.equal(orderRoot.get("userId"), root.get("id")));

        return cb.exists(subquery);
    };
}
```

**③ 动态排序**

```java
public Page<User> searchWithSort(String username, String sortField,
                                  String direction, int page, int size) {
    Specification<User> spec = UserSpecifications.usernameEquals(username);

    Sort.Direction dir = direction.equalsIgnoreCase("desc") ?
                         Sort.Direction.DESC : Sort.Direction.ASC;
    Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sortField));

    return userRepository.findAll(spec, pageable);
}
```

**11. 最佳实践**

**① 提取为静态方法**

```java
// ✓ 推荐：可复用
public static Specification<User> ageGreaterThan(Integer age) {
    return (root, query, cb) -> {
        if (age == null) return null;
        return cb.greaterThan(root.get("age"), age);
    };
}

// ✗ 不推荐：重复代码
Specification<User> spec = (root, query, cb) ->
    cb.greaterThan(root.get("age"), 18);
```

**② null 值处理**

```java
// ✓ 推荐：返回 null 表示忽略此条件
public static Specification<User> hasUsername(String username) {
    return (root, query, cb) -> {
        if (username == null) return null;  // 忽略此条件
        return cb.equal(root.get("username"), username);
    };
}
```

**③ 复杂条件拆分**

```java
// ✓ 推荐：拆分为多个 Specification
Specification<User> spec = Specification
    .where(hasUsername(username))
    .and(ageGreaterThan(minAge))
    .and(statusEquals(status));

// ✗ 不推荐：全部写在一个 lambda 中
Specification<User> spec = (root, query, cb) -> {
    List<Predicate> predicates = new ArrayList<>();
    // 100 行代码...
    return cb.and(predicates.toArray(new Predicate[0]));
};
```

**12. 注意事项**

**① 性能问题**

```java
// ✗ 避免：循环中创建 Specification
for (String username : usernames) {
    Specification<User> spec = (root, query, cb) ->
        cb.equal(root.get("username"), username);
    userRepository.findAll(spec);  // N 次查询
}

// ✓ 推荐：使用 IN 查询
Specification<User> spec = (root, query, cb) ->
    root.get("username").in(usernames);
userRepository.findAll(spec);  // 1 次查询
```

**② 属性名称要正确**

```java
// ✗ 错误：属性名拼写错误
root.get("usrname")  // 应该是 username

// ✓ 正确
root.get("username")
```

**③ 类型匹配**

```java
// ✗ 错误：类型不匹配
cb.equal(root.get("age"), "18")  // age 是 Integer 类型

// ✓ 正确
cb.equal(root.get("age"), 18)
```

**关键要点**

1. Specification 是 Spring Data JPA 对 JPA Criteria API 的封装，用于动态查询
2. 核心方法 `toPredicate()` 接收三个参数：Root、CriteriaQuery、CriteriaBuilder
3. 支持灵活的条件组合：and()、or()、not()
4. Repository 需要继承 `JpaSpecificationExecutor<T>` 接口
5. 适合复杂的动态查询场景，如高级搜索、筛选功能
6. 提供类型安全的查询构建
7. 通过静态方法提取可提高代码复用性

**记忆口诀**：Specification 动态查询，Root Query Builder 三件套，条件组合灵活用，类型安全又可靠
