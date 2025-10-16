## 关联查询
### 45. MyBatis 如何实现一对一关联查询？

**核心答案**

MyBatis 实现一对一关联查询有两种方式：**嵌套查询（Nested Select）** 和 **嵌套结果映射（Nested Results）**。前者通过两次查询实现（可能引发 N+1 问题），后者通过一次 JOIN 查询实现（推荐）。

**详细说明**

**1. 一对一关系场景示例**

假设有用户表和身份证表，一个用户对应一张身份证：

```sql
-- 用户表
CREATE TABLE user (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT
);

-- 身份证表
CREATE TABLE id_card (
    id INT PRIMARY KEY,
    card_number VARCHAR(18),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
```

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:12px monospace;fill:#0066cc}.key{font:12px sans-serif;fill:#d32f2f}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">一对一关系：用户 ↔ 身份证</text>
<rect x="80" y="80" width="220" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="190" y="105" text-anchor="middle" class="label">User (用户表)</text>
<line x1="100" y1="115" x2="280" y2="115" stroke="#1976d2" stroke-width="2"/>
<text x="110" y="140" class="code">id: INT (PK)</text>
<text x="110" y="165" class="code">name: VARCHAR</text>
<text x="110" y="190" class="code">age: INT</text>
<ellipse cx="120" cy="230" rx="80" ry="35" fill="#fff9c4" stroke="#f57f17" stroke-width="2"/>
<text x="120" y="235" text-anchor="middle" class="code">idCard</text>
<rect x="500" y="80" width="220" height="200" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="610" y="105" text-anchor="middle" class="label">IdCard (身份证表)</text>
<line x1="520" y1="115" x2="700" y2="115" stroke="#388e3c" stroke-width="2"/>
<text x="530" y="140" class="code">id: INT (PK)</text>
<text x="530" y="165" class="code">card_number: VARCHAR</text>
<text x="530" y="190" class="code">user_id: INT (FK)</text>
<text x="530" y="210" class="key">外键 → User.id</text>
<path d="M 300 180 L 500 180" stroke="#ff6f00" stroke-width="3" fill="none" marker-end="url(#arrow1)"/>
<defs><marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#ff6f00"/></marker></defs>
<text x="400" y="170" text-anchor="middle" class="label" fill="#ff6f00">1 : 1</text>
<rect x="250" y="300" width="300" height="30" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="320" text-anchor="middle" class="code">一个用户有且仅有一张身份证</text>
</svg>

**2. 方式一：嵌套查询（Nested Select）**

执行两次 SQL 查询，先查用户，再根据 user_id 查身份证。

**Java 实体类**

```java
public class User {
    private Integer id;
    private String name;
    private Integer age;
    private IdCard idCard;  // 关联的身份证对象
    // getters and setters
}

public class IdCard {
    private Integer id;
    private String cardNumber;
    private Integer userId;
    // getters and setters
}
```

**Mapper XML 配置**

```xml
<!-- 用户 ResultMap -->
<resultMap id="userWithIdCardMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>

    <!-- association：一对一关联 -->
    <association property="idCard"
                 javaType="IdCard"
                 column="id"
                 select="selectIdCardByUserId"/>
</resultMap>

<!-- 查询用户 -->
<select id="selectUserById" resultMap="userWithIdCardMap">
    SELECT * FROM user WHERE id = #{id}
</select>

<!-- 查询身份证 -->
<select id="selectIdCardByUserId" resultType="IdCard">
    SELECT * FROM id_card WHERE user_id = #{id}
</select>
```

**执行流程**：
1. 执行 `selectUserById`，查询用户信息
2. 对于查询到的每个用户，再执行 `selectIdCardByUserId` 查询身份证
3. 将身份证对象设置到用户对象的 `idCard` 属性

**3. 方式二：嵌套结果映射（Nested Results）- 推荐**

通过 JOIN 一次性查询出所有数据，然后映射到对象。

**Mapper XML 配置**

```xml
<!-- 用户 ResultMap -->
<resultMap id="userWithIdCardMap" type="User">
    <id property="id" column="user_id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>

    <!-- 嵌套结果映射 -->
    <association property="idCard" javaType="IdCard">
        <id property="id" column="card_id"/>
        <result property="cardNumber" column="card_number"/>
        <result property="userId" column="user_id"/>
    </association>
</resultMap>

<!-- 查询用户及身份证（一次 JOIN） -->
<select id="selectUserById" resultMap="userWithIdCardMap">
    SELECT
        u.id AS user_id,
        u.name,
        u.age,
        c.id AS card_id,
        c.card_number,
        c.user_id
    FROM user u
    LEFT JOIN id_card c ON u.id = c.user_id
    WHERE u.id = #{id}
</select>
```

**执行流程**：
1. 执行一次 JOIN 查询，获取用户和身份证的所有信息
2. MyBatis 根据 resultMap 配置，将结果映射到 User 和 IdCard 对象

**4. 两种方式对比**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:12px monospace;fill:#0066cc}.pros{font:12px sans-serif;fill:#2e7d32}.cons{font:12px sans-serif;fill:#c62828}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">嵌套查询 vs 嵌套结果映射</text>
<rect x="50" y="60" width="320" height="360" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="210" y="85" text-anchor="middle" class="label">嵌套查询 (Nested Select)</text>
<line x1="70" y1="95" x2="350" y2="95" stroke="#f57c00" stroke-width="2"/>
<text x="70" y="120" class="code">第一次查询: SELECT * FROM user</text>
<text x="70" y="140" class="code">第二次查询: SELECT * FROM id_card</text>
<text x="70" y="160" class="code">WHERE user_id = ?</text>
<text x="70" y="195" class="pros">✓ 配置简单直观</text>
<text x="70" y="215" class="pros">✓ 支持延迟加载</text>
<text x="70" y="235" class="pros">✓ 解耦性好</text>
<text x="70" y="270" class="cons">✗ 存在 N+1 问题</text>
<text x="70" y="290" class="cons">✗ 执行多次 SQL</text>
<text x="70" y="310" class="cons">✗ 性能较差</text>
<text x="70" y="330" class="cons">✗ 数据库压力大</text>
<rect x="70" y="350" width="280" height="50" fill="#ffebee" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="210" y="370" text-anchor="middle" class="code">查询 100 个用户 =</text>
<text x="210" y="390" text-anchor="middle" class="code">1 + 100 = 101 次查询</text>
<rect x="430" y="60" width="320" height="360" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="590" y="85" text-anchor="middle" class="label">嵌套结果映射 (Nested Results)</text>
<line x1="450" y1="95" x2="730" y2="95" stroke="#388e3c" stroke-width="2"/>
<text x="450" y="120" class="code">一次查询: SELECT u.*, c.*</text>
<text x="450" y="140" class="code">FROM user u</text>
<text x="450" y="160" class="code">LEFT JOIN id_card c</text>
<text x="450" y="180" class="code">ON u.id = c.user_id</text>
<text x="450" y="215" class="pros">✓ 只执行一次 SQL</text>
<text x="450" y="235" class="pros">✓ 性能好</text>
<text x="450" y="255" class="pros">✓ 避免 N+1 问题</text>
<text x="450" y="275" class="pros">✓ 数据库压力小</text>
<text x="450" y="310" class="cons">✗ 配置略复杂</text>
<text x="450" y="330" class="cons">✗ 不支持延迟加载</text>
<rect x="450" y="350" width="280" height="50" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="590" y="370" text-anchor="middle" class="code">查询 100 个用户 =</text>
<text x="590" y="390" text-anchor="middle" class="code">1 次查询（推荐）</text>
</svg>

| 对比项 | 嵌套查询 | 嵌套结果映射 |
|--------|----------|--------------|
| **SQL 次数** | N+1 次 | 1 次 |
| **性能** | 较差 | 优秀 |
| **延迟加载** | 支持 | 不支持 |
| **配置复杂度** | 简单 | 略复杂 |
| **适用场景** | 小数据量、需要延迟加载 | 大数据量、性能要求高 |

**5. 注解方式实现**

**嵌套查询（注解）**

```java
@Select("SELECT * FROM user WHERE id = #{id}")
@Results({
    @Result(property = "id", column = "id", id = true),
    @Result(property = "name", column = "name"),
    @Result(property = "age", column = "age"),
    @Result(property = "idCard", column = "id",
            one = @One(select = "selectIdCardByUserId"))
})
User selectUserById(Integer id);

@Select("SELECT * FROM id_card WHERE user_id = #{userId}")
IdCard selectIdCardByUserId(Integer userId);
```

**嵌套结果映射（注解）**

```java
@Select("SELECT u.id AS user_id, u.name, u.age, " +
        "c.id AS card_id, c.card_number, c.user_id " +
        "FROM user u LEFT JOIN id_card c ON u.id = c.user_id " +
        "WHERE u.id = #{id}")
@Results({
    @Result(property = "id", column = "user_id", id = true),
    @Result(property = "name", column = "name"),
    @Result(property = "age", column = "age"),
    @Result(property = "idCard.id", column = "card_id"),
    @Result(property = "idCard.cardNumber", column = "card_number"),
    @Result(property = "idCard.userId", column = "user_id")
})
User selectUserById(Integer id);
```

**关键要点**

1. **推荐使用嵌套结果映射**: 性能好，避免 N+1 问题
2. **association 标签**: 用于配置一对一关联
3. **column 属性**: 指定传递给子查询的参数列
4. **javaType 属性**: 指定关联对象的 Java 类型
5. **别名处理**: JOIN 查询时使用别名避免列名冲突

**记忆口诀**

```
一对一关联两种法，嵌套查询和结果
查询简单 N+1，结果一次性能佳
association 配关联，column 传参数
JOIN 一次效率高，推荐使用结果法
```

### 46. MyBatis 如何实现一对多关联查询？

**核心答案**

一对多关联查询有两种实现方式：**嵌套查询**（分步查询）和**嵌套结果映射**（联合查询）。使用 `<collection>` 标签处理一对多关系。

**详细说明**

**1. 方式对比**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.small{font:12px sans-serif;fill:#555}.box{fill:#fff;stroke:#333;stroke-width:2}.method{fill:#e3f2fd;stroke:#1976d2;stroke-width:2}.pro{fill:#e8f5e9}.con{fill:#ffebee}</style></defs>
<text x="400" y="25" class="title" text-anchor="middle">一对多查询实现方式</text>
<rect x="50" y="50" width="300" height="130" class="method" rx="5"/><text x="200" y="75" class="label" text-anchor="middle" font-weight="bold">嵌套查询（分步查询）</text><text x="60" y="100" class="small">• 先查主表，再查从表</text><text x="60" y="120" class="small">• 执行多次 SQL</text><text x="60" y="140" class="small">• 支持懒加载</text><text x="60" y="160" class="small">• 可能有 N+1 问题</text>
<rect x="450" y="50" width="300" height="130" class="method" rx="5"/><text x="600" y="75" class="label" text-anchor="middle" font-weight="bold">嵌套结果映射（联合查询）</text><text x="460" y="100" class="small">• 一次性联表查询</text><text x="460" y="120" class="small">• 执行一次 SQL</text><text x="460" y="140" class="small">• 不支持懒加载</text><text x="460" y="160" class="small">• 性能更好</text>
<text x="50" y="210" class="label" font-weight="bold">优点</text><rect x="50" y="220" width="150" height="80" class="pro" rx="3"/><text x="60" y="240" class="small">✓ 逻辑清晰</text><text x="60" y="260" class="small">✓ SQL 简单</text><text x="60" y="280" class="small">✓ 可懒加载</text>
<rect x="250" y="220" width="150" height="80" class="con" rx="3"/><text x="260" y="240" class="small">✗ 多次查询</text><text x="260" y="260" class="small">✗ N+1 问题</text><text x="260" y="280" class="small">✗ 性能较差</text>
<rect x="450" y="220" width="150" height="80" class="pro" rx="3"/><text x="460" y="240" class="small">✓ 一次查询</text><text x="460" y="260" class="small">✓ 性能好</text><text x="460" y="280" class="small">✓ 无 N+1 问题</text>
<rect x="650" y="220" width="150" height="80" class="con" rx="3"/><text x="660" y="240" class="small">✗ SQL 复杂</text><text x="660" y="260" class="small">✗ 不能懒加载</text><text x="660" y="280" class="small">✗ 数据冗余</text>
<text x="50" y="330" class="label" font-weight="bold">适用场景</text><rect x="50" y="340" width="350" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="3"/><text x="60" y="360" class="small">需要懒加载或关联数据量不确定时</text><text x="60" y="380" class="small">适合数据量小、查询频率低的场景</text>
<rect x="450" y="340" width="350" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="3"/><text x="460" y="360" class="small">关联数据固定且需要一起使用时</text><text x="460" y="380" class="small">适合数据量大、查询频率高的场景</text>
</svg>

**2. 嵌套查询（分步查询）实现**

```java
// 实体类
public class Department {
    private Long id;
    private String name;
    private List<Employee> employees;  // 一对多关系
}

public class Employee {
    private Long id;
    private String name;
    private Long deptId;
}
```

```xml
<!-- DepartmentMapper.xml -->
<mapper namespace="com.example.mapper.DepartmentMapper">
    <!-- 一对多：使用 collection 标签 -->
    <resultMap id="DeptWithEmployees" type="Department">
        <id property="id" column="id"/>
        <result property="name" column="name"/>

        <!-- collection: 处理一对多关系 -->
        <collection property="employees"
                    column="id"
                    select="com.example.mapper.EmployeeMapper.findByDeptId"
                    fetchType="lazy"/>
    </resultMap>

    <select id="findById" resultMap="DeptWithEmployees">
        SELECT * FROM department WHERE id = #{id}
    </select>
</mapper>

<!-- EmployeeMapper.xml -->
<mapper namespace="com.example.mapper.EmployeeMapper">
    <select id="findByDeptId" resultType="Employee">
        SELECT * FROM employee WHERE dept_id = #{deptId}
    </select>
</mapper>
```

**3. 嵌套结果映射（联合查询）实现**

```xml
<!-- DepartmentMapper.xml -->
<mapper namespace="com.example.mapper.DepartmentMapper">
    <resultMap id="DeptWithEmployees" type="Department">
        <id property="id" column="dept_id"/>
        <result property="name" column="dept_name"/>

        <!-- collection: ofType 指定集合元素类型 -->
        <collection property="employees" ofType="Employee">
            <id property="id" column="emp_id"/>
            <result property="name" column="emp_name"/>
            <result property="deptId" column="dept_id"/>
        </collection>
    </resultMap>

    <select id="findById" resultMap="DeptWithEmployees">
        SELECT
            d.id as dept_id,
            d.name as dept_name,
            e.id as emp_id,
            e.name as emp_name,
            e.dept_id
        FROM department d
        LEFT JOIN employee e ON d.id = e.dept_id
        WHERE d.id = #{id}
    </select>
</mapper>
```

**4. Collection 标签属性**

| 属性 | 说明 | 使用场景 |
|------|------|----------|
| `property` | 实体类中的集合属性名 | 必填 |
| `ofType` | 集合中元素的类型 | 嵌套结果映射必填 |
| `select` | 另一个查询语句的 id | 嵌套查询必填 |
| `column` | 传递给嵌套查询的列名 | 嵌套查询必填 |
| `fetchType` | 加载方式：lazy/eager | 控制懒加载 |
| `javaType` | 集合类型（通常是 List） | 可选 |

**5. 执行流程对比**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.small{font:12px sans-serif;fill:#555}.step{fill:#e3f2fd;stroke:#1976d2;stroke-width:2}.sql{fill:#fff9c4;stroke:#f57f17;stroke-width:1}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrowhead)}</style><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#666"/></marker></defs>
<text x="400" y="25" class="title" text-anchor="middle">执行流程对比</text>
<text x="200" y="55" class="label" text-anchor="middle" font-weight="bold">嵌套查询</text><text x="600" y="55" class="label" text-anchor="middle" font-weight="bold">嵌套结果映射</text>
<rect x="50" y="70" width="300" height="40" class="step" rx="5"/><text x="200" y="95" class="small" text-anchor="middle">1. 查询部门信息</text>
<rect x="50" y="120" width="300" height="50" class="sql" rx="3"/><text x="60" y="140" class="small" font-family="monospace">SELECT * FROM department</text><text x="60" y="160" class="small" font-family="monospace">WHERE id = 1</text>
<path d="M 200 170 L 200 190" class="arrow"/>
<rect x="50" y="190" width="300" height="40" class="step" rx="5"/><text x="200" y="215" class="small" text-anchor="middle">2. 查询员工信息（N次）</text>
<rect x="50" y="240" width="300" height="50" class="sql" rx="3"/><text x="60" y="260" class="small" font-family="monospace">SELECT * FROM employee</text><text x="60" y="280" class="small" font-family="monospace">WHERE dept_id = 1</text>
<path d="M 200 290 L 200 310" class="arrow"/>
<rect x="50" y="310" width="300" height="40" class="step" rx="5"/><text x="200" y="335" class="small" text-anchor="middle">3. 组装结果对象</text>
<text x="200" y="375" class="small" text-anchor="middle" fill="#d32f2f">执行 1+N 次 SQL</text><text x="200" y="395" class="small" text-anchor="middle" fill="#d32f2f">（1次查部门 + N次查员工）</text>
<rect x="450" y="70" width="300" height="40" class="step" rx="5"/><text x="600" y="95" class="small" text-anchor="middle">1. 联表查询</text>
<rect x="450" y="120" width="300" height="90" class="sql" rx="3"/><text x="460" y="140" class="small" font-family="monospace">SELECT d.*, e.*</text><text x="460" y="160" class="small" font-family="monospace">FROM department d</text><text x="460" y="180" class="small" font-family="monospace">LEFT JOIN employee e</text><text x="460" y="200" class="small" font-family="monospace">ON d.id = e.dept_id</text>
<path d="M 600 210 L 600 230" class="arrow"/>
<rect x="450" y="230" width="300" height="40" class="step" rx="5"/><text x="600" y="255" class="small" text-anchor="middle">2. MyBatis 自动组装结果</text>
<rect x="450" y="280" width="300" height="60" class="step" rx="5"/><text x="600" y="305" class="small" text-anchor="middle">3. 合并重复的部门记录</text><text x="600" y="325" class="small" text-anchor="middle">填充员工集合</text>
<text x="600" y="365" class="small" text-anchor="middle" fill="#388e3c">执行 1 次 SQL</text><text x="600" y="385" class="small" text-anchor="middle" fill="#388e3c">（一次性获取所有数据）</text>
<rect x="50" y="410" width="150" height="30" fill="#ffcdd2" stroke="#c62828" stroke-width="1" rx="3"/><text x="125" y="430" class="small" text-anchor="middle">可能 N+1 问题</text>
<rect x="250" y="410" width="100" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1" rx="3"/><text x="300" y="430" class="small" text-anchor="middle">支持懒加载</text>
<rect x="450" y="410" width="150" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1" rx="3"/><text x="525" y="430" class="small" text-anchor="middle">性能更优</text>
<rect x="650" y="410" width="100" height="30" fill="#ffcdd2" stroke="#c62828" stroke-width="1" rx="3"/><text x="700" y="430" class="small" text-anchor="middle">数据冗余</text>
</svg>

**关键要点**

1. **标签选择**：一对多用 `<collection>`，一对一用 `<association>`
2. **属性区别**：`ofType` 指定集合元素类型，`javaType` 指定集合类型
3. **性能考虑**：嵌套结果映射性能更好，但 SQL 更复杂
4. **懒加载**：只有嵌套查询支持懒加载，需配置 `fetchType="lazy"`
5. **N+1 问题**：嵌套查询可能导致 N+1 问题，查询 N 个部门需执行 N+1 次 SQL

**记忆口诀**

```
一对多用 collection，ofType 指定元素型
嵌套查询分两步，可懒加载有 N+1
嵌套结果一次查，联表查询性能强
选择方式看场景，懒加载选前者，性能优选后者
```

### 47. MyBatis 如何实现多对多关联查询？

**核心答案**

多对多关联通过**中间表**实现，本质是**两个一对多**的组合。通常使用**嵌套结果映射**（联合查询三张表）或**嵌套查询**（分步查询）实现。

**详细说明**

**1. 多对多关系结构**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.small{font:12px sans-serif;fill:#555}.table{fill:#e3f2fd;stroke:#1976d2;stroke-width:2}.mid{fill:#fff9c4;stroke:#f57f17;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrowhead)}</style><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#666"/></marker></defs>
<text x="400" y="25" class="title" text-anchor="middle">多对多关系：学生-课程示例</text>
<rect x="50" y="60" width="200" height="140" class="table" rx="5"/><text x="150" y="85" class="label" text-anchor="middle" font-weight="bold">student（学生表）</text><line x1="60" y1="95" x2="240" y2="95" stroke="#1976d2" stroke-width="1"/><text x="60" y="115" class="small" font-family="monospace">id (PK)</text><text x="60" y="135" class="small" font-family="monospace">name</text><text x="60" y="155" class="small" font-family="monospace">age</text><text x="60" y="175" class="small" font-family="monospace">...</text>
<rect x="300" y="150" width="200" height="140" class="mid" rx="5"/><text x="400" y="175" class="label" text-anchor="middle" font-weight="bold">student_course</text><text x="400" y="192" class="small" text-anchor="middle">（中间关联表）</text><line x1="310" y1="200" x2="490" y2="200" stroke="#f57f17" stroke-width="1"/><text x="310" y="220" class="small" font-family="monospace">student_id (FK)</text><text x="310" y="240" class="small" font-family="monospace">course_id (FK)</text><text x="310" y="260" class="small" font-family="monospace">score</text><text x="310" y="280" class="small" font-family="monospace">...</text>
<rect x="550" y="60" width="200" height="140" class="table" rx="5"/><text x="650" y="85" class="label" text-anchor="middle" font-weight="bold">course（课程表）</text><line x1="560" y1="95" x2="740" y2="95" stroke="#1976d2" stroke-width="1"/><text x="560" y="115" class="small" font-family="monospace">id (PK)</text><text x="560" y="135" class="small" font-family="monospace">name</text><text x="560" y="155" class="small" font-family="monospace">credit</text><text x="560" y="175" class="small" font-family="monospace">...</text>
<path d="M 250 130 L 300 210" class="arrow"/><text x="255" y="155" class="small" fill="#d32f2f">1</text><text x="285" y="200" class="small" fill="#d32f2f">N</text>
<path d="M 550 130 L 500 210" class="arrow"/><text x="540" y="155" class="small" fill="#d32f2f">1</text><text x="505" y="200" class="small" fill="#d32f2f">N</text>
<rect x="50" y="320" width="350" height="120" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/><text x="60" y="345" class="label" font-weight="bold">关系说明</text><text x="60" y="370" class="small">• 一个学生可以选修多门课程</text><text x="60" y="390" class="small">• 一门课程可以被多个学生选修</text><text x="60" y="410" class="small">• 通过中间表存储关联关系和额外信息（如成绩）</text><text x="60" y="430" class="small">• 本质是两个一对多关系的组合</text>
<rect x="420" y="320" width="360" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/><text x="430" y="345" class="label" font-weight="bold">实现要点</text><text x="430" y="370" class="small">1. 主表 → 中间表：一对多（collection）</text><text x="430" y="390" class="small">2. 中间表 → 关联表：一对一（association）</text><text x="430" y="410" class="small">3. 或直接：主表 → 关联表（忽略中间表细节）</text><text x="430" y="430" class="small">4. 通常使用三表联查（LEFT JOIN 两次）</text>
</svg>

**2. 实体类设计**

```java
// 学生实体
public class Student {
    private Long id;
    private String name;
    private Integer age;
    private List<Course> courses;  // 多对多：课程列表
}

// 课程实体
public class Course {
    private Long id;
    private String name;
    private Integer credit;
    private List<Student> students;  // 多对多：学生列表
}

// 如果需要中间表信息（如成绩），可以创建关联实体
public class StudentCourse {
    private Long studentId;
    private Long courseId;
    private Integer score;  // 额外信息
    private Student student;
    private Course course;
}
```

**3. 嵌套结果映射实现（推荐）**

```xml
<!-- StudentMapper.xml -->
<mapper namespace="com.example.mapper.StudentMapper">
    <resultMap id="StudentWithCourses" type="Student">
        <id property="id" column="student_id"/>
        <result property="name" column="student_name"/>
        <result property="age" column="student_age"/>

        <!-- 多对多：collection 映射课程列表 -->
        <collection property="courses" ofType="Course">
            <id property="id" column="course_id"/>
            <result property="name" column="course_name"/>
            <result property="credit" column="credit"/>
        </collection>
    </resultMap>

    <!-- 三表联查 -->
    <select id="findStudentWithCourses" resultMap="StudentWithCourses">
        SELECT
            s.id as student_id,
            s.name as student_name,
            s.age as student_age,
            c.id as course_id,
            c.name as course_name,
            c.credit as credit
        FROM student s
        LEFT JOIN student_course sc ON s.id = sc.student_id
        LEFT JOIN course c ON sc.course_id = c.id
        WHERE s.id = #{id}
    </select>
</mapper>
```

**4. 包含中间表信息的实现**

```xml
<resultMap id="StudentWithCourseDetails" type="Student">
    <id property="id" column="student_id"/>
    <result property="name" column="student_name"/>

    <!-- 映射到关联实体，包含中间表信息 -->
    <collection property="courseDetails" ofType="StudentCourse">
        <result property="studentId" column="student_id"/>
        <result property="courseId" column="course_id"/>
        <result property="score" column="score"/>

        <!-- 嵌套映射课程信息 -->
        <association property="course" javaType="Course">
            <id property="id" column="course_id"/>
            <result property="name" column="course_name"/>
            <result property="credit" column="credit"/>
        </association>
    </collection>
</resultMap>

<select id="findWithDetails" resultMap="StudentWithCourseDetails">
    SELECT
        s.id as student_id,
        s.name as student_name,
        c.id as course_id,
        c.name as course_name,
        c.credit as credit,
        sc.score as score
    FROM student s
    LEFT JOIN student_course sc ON s.id = sc.student_id
    LEFT JOIN course c ON sc.course_id = c.id
    WHERE s.id = #{id}
</select>
```

**5. 嵌套查询实现（分步）**

```xml
<!-- StudentMapper.xml -->
<resultMap id="StudentWithCourses" type="Student">
    <id property="id" column="id"/>
    <result property="name" column="name"/>

    <!-- 分步查询：通过中间表查询课程 -->
    <collection property="courses"
                column="id"
                select="com.example.mapper.CourseMapper.findByStudentId"
                fetchType="lazy"/>
</resultMap>

<select id="findById" resultMap="StudentWithCourses">
    SELECT * FROM student WHERE id = #{id}
</select>

<!-- CourseMapper.xml -->
<select id="findByStudentId" resultType="Course">
    SELECT c.*
    FROM course c
    INNER JOIN student_course sc ON c.id = sc.course_id
    WHERE sc.student_id = #{studentId}
</select>
```

**6. 双向关联查询**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.small{font:12px sans-serif;fill:#555}.dir{fill:#e3f2fd;stroke:#1976d2;stroke-width:2}.arrow{stroke:#f57f17;stroke-width:3;fill:none;marker-end:url(#arrowhead2)}</style><marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#f57f17"/></marker></defs>
<text x="400" y="25" class="title" text-anchor="middle">双向多对多查询</text>
<rect x="50" y="60" width="300" height="120" class="dir" rx="5"/><text x="200" y="85" class="label" text-anchor="middle" font-weight="bold">查询学生及其课程</text><text x="60" y="110" class="small" font-family="monospace">StudentMapper.findWithCourses()</text><text x="60" y="135" class="small">SELECT s.*, c.*</text><text x="60" y="155" class="small">FROM student s LEFT JOIN ...</text>
<rect x="450" y="60" width="300" height="120" class="dir" rx="5"/><text x="600" y="85" class="label" text-anchor="middle" font-weight="bold">查询课程及其学生</text><text x="460" y="110" class="small" font-family="monospace">CourseMapper.findWithStudents()</text><text x="460" y="135" class="small">SELECT c.*, s.*</text><text x="460" y="155" class="small">FROM course c LEFT JOIN ...</text>
<path d="M 350 120 L 450 120" class="arrow"/><text x="375" y="110" class="small" fill="#f57f17">Student → Courses</text>
<path d="M 450 140 L 350 140" class="arrow"/><text x="375" y="160" class="small" fill="#f57f17">Course → Students</text>
<rect x="50" y="210" width="700" height="130" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/><text x="60" y="235" class="label" font-weight="bold">实现注意事项</text><text x="60" y="260" class="small">1. **避免循环引用**：Student → Course → Student ... 可能导致序列化问题</text><text x="60" y="280" class="small">2. **按需查询**：根据业务需求决定查询方向，不要总是双向加载</text><text x="60" y="300" class="small">3. **懒加载**：使用 fetchType="lazy" 避免不必要的关联查询</text><text x="60" y="320" class="small">4. **序列化处理**：使用 @JsonIgnore 或 DTO 模式避免循环依赖</text>
</svg>

**关键要点**

1. **三张表**：主表 + 中间表 + 关联表，通过两次 LEFT JOIN 查询
2. **两个 collection**：实质是两个一对多关系（主表→中间表，中间表→关联表）
3. **中间表信息**：如需中间表字段（如成绩），创建关联实体类
4. **双向关联**：注意避免循环引用，使用 `@JsonIgnore` 或 DTO
5. **性能优化**：优先使用嵌套结果映射（一次 SQL），避免 N+1 问题

**记忆口诀**

```
多对多关系中间表，本质就是两个一对多
三表联查 JOIN 两次，collection 映射对象集
需要中间表字段时，建立关联实体类
双向关联避循环，懒加载按需来使用
```

### 48. 什么是嵌套查询（N+1 问题）？

**核心答案**

嵌套查询是**分步查询**的方式，先查主表，再根据主表结果查询关联表。可能导致 **N+1 问题**：查询 N 条主表记录需要执行 1 + N 次 SQL（1 次主查询 + N 次关联查询），严重影响性能。

**详细说明**

**1. N+1 问题产生过程**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.small{font:12px sans-serif;fill:#555}.main{fill:#e3f2fd;stroke:#1976d2;stroke-width:2}.sub{fill:#ffebee;stroke:#c62828;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrowhead)}</style><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#666"/></marker></defs>
<text x="400" y="25" class="title" text-anchor="middle">N+1 问题示例：查询 3 个部门及其员工</text>
<rect x="50" y="50" width="700" height="70" class="main" rx="5"/><text x="400" y="75" class="label" text-anchor="middle" font-weight="bold">第 1 次 SQL：查询所有部门（主查询）</text><text x="60" y="100" class="small" font-family="monospace">SELECT * FROM department</text><text x="60" y="115" class="small">返回 3 条记录：[Dept1, Dept2, Dept3]</text>
<path d="M 400 120 L 400 140" class="arrow"/>
<text x="410" y="160" class="small" fill="#d32f2f" font-weight="bold">触发 N 次子查询</text>
<rect x="50" y="180" width="220" height="80" class="sub" rx="5"/><text x="160" y="205" class="label" text-anchor="middle" font-weight="bold">第 2 次 SQL</text><text x="60" y="230" class="small" font-family="monospace">SELECT * FROM employee</text><text x="60" y="245" class="small" font-family="monospace">WHERE dept_id = 1</text>
<rect x="290" y="180" width="220" height="80" class="sub" rx="5"/><text x="400" y="205" class="label" text-anchor="middle" font-weight="bold">第 3 次 SQL</text><text x="300" y="230" class="small" font-family="monospace">SELECT * FROM employee</text><text x="300" y="245" class="small" font-family="monospace">WHERE dept_id = 2</text>
<rect x="530" y="180" width="220" height="80" class="sub" rx="5"/><text x="640" y="205" class="label" text-anchor="middle" font-weight="bold">第 4 次 SQL</text><text x="540" y="230" class="small" font-family="monospace">SELECT * FROM employee</text><text x="540" y="245" class="small" font-family="monospace">WHERE dept_id = 3</text>
<path d="M 160 120 L 160 180" class="arrow"/><path d="M 400 120 L 400 180" class="arrow"/><path d="M 640 120 L 640 180" class="arrow"/>
<rect x="50" y="290" width="700" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/><text x="60" y="315" class="label" font-weight="bold">问题分析</text><text x="60" y="340" class="small">• 总共执行：<tspan font-weight="bold" fill="#d32f2f">1 + 3 = 4 次 SQL</tspan></text><text x="60" y="360" class="small">• 如果有 100 个部门，就需要执行 <tspan font-weight="bold" fill="#d32f2f">101 次 SQL</tspan></text><text x="60" y="380" class="small">• 大量数据库往返，严重影响性能</text>
<rect x="50" y="410" width="340" height="80" fill="#ffcdd2" stroke="#c62828" stroke-width="2" rx="5"/><text x="60" y="435" class="label" font-weight="bold">性能影响</text><text x="60" y="455" class="small">✗ 数据库连接开销大</text><text x="60" y="475" class="small">✗ 网络往返次数多</text>
<rect x="410" y="410" width="340" height="80" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/><text x="420" y="435" class="label" font-weight="bold">解决方案</text><text x="420" y="455" class="small">✓ 使用嵌套结果映射（联表查询）</text><text x="420" y="475" class="small">✓ 启用懒加载（按需加载）</text>
</svg>

**2. 嵌套查询配置示例**

```xml
<!-- DepartmentMapper.xml -->
<mapper namespace="com.example.mapper.DepartmentMapper">
    <!-- 嵌套查询：会产生 N+1 问题 -->
    <resultMap id="DeptWithEmployees" type="Department">
        <id property="id" column="id"/>
        <result property="name" column="name"/>

        <!--
            select: 指定另一个查询语句
            column: 传递给子查询的参数
            每查一条部门记录，就会执行一次 findByDeptId
        -->
        <collection property="employees"
                    column="id"
                    select="com.example.mapper.EmployeeMapper.findByDeptId"/>
    </resultMap>

    <!-- 主查询：查询所有部门 -->
    <select id="findAll" resultMap="DeptWithEmployees">
        SELECT * FROM department
    </select>
</mapper>

<!-- EmployeeMapper.xml -->
<mapper namespace="com.example.mapper.EmployeeMapper">
    <!-- 子查询：根据部门 ID 查询员工 -->
    <select id="findByDeptId" resultType="Employee">
        SELECT * FROM employee WHERE dept_id = #{deptId}
    </select>
</mapper>
```

**3. SQL 执行日志示例**

```sql
-- 第 1 次：查询所有部门
SELECT * FROM department;
-- 返回: [{id:1, name:'研发部'}, {id:2, name:'销售部'}, {id:3, name:'人事部'}]

-- 第 2 次：查询部门1的员工
SELECT * FROM employee WHERE dept_id = 1;

-- 第 3 次：查询部门2的员工
SELECT * FROM employee WHERE dept_id = 2;

-- 第 4 次：查询部门3的员工
SELECT * FROM employee WHERE dept_id = 3;

-- 总计：1 + 3 = 4 次 SQL
```

**4. N+1 问题对比**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.small{font:12px sans-serif;fill:#555}.bad{fill:#ffebee;stroke:#c62828;stroke-width:2}.good{fill:#e8f5e9;stroke:#388e3c;stroke-width:2}</style></defs>
<text x="400" y="25" class="title" text-anchor="middle">嵌套查询 vs 嵌套结果映射</text>
<text x="200" y="55" class="label" text-anchor="middle" font-weight="bold">嵌套查询（N+1问题）</text><text x="600" y="55" class="label" text-anchor="middle" font-weight="bold">嵌套结果映射</text>
<rect x="50" y="70" width="300" height="140" class="bad" rx="5"/><text x="60" y="95" class="small" font-weight="bold">执行过程：</text><text x="60" y="115" class="small">1. 查询主表：1次</text><text x="60" y="135" class="small">2. 遍历结果集</text><text x="60" y="155" class="small">3. 每条记录查关联表：N次</text><text x="60" y="175" class="small" font-weight="bold" fill="#c62828">总计：1 + N 次 SQL</text><text x="60" y="195" class="small">（N = 主表记录数）</text>
<rect x="450" y="70" width="300" height="140" class="good" rx="5"/><text x="460" y="95" class="small" font-weight="bold">执行过程：</text><text x="460" y="115" class="small">1. LEFT JOIN 联表查询：1次</text><text x="460" y="135" class="small">2. 获取所有数据</text><text x="460" y="155" class="small">3. MyBatis 自动组装结果</text><text x="460" y="175" class="small" font-weight="bold" fill="#388e3c">总计：1 次 SQL</text>
<rect x="50" y="230" width="300" height="70" fill="#fff" stroke="#c62828" stroke-width="2" rx="3"/><text x="60" y="255" class="small">SQL 示例：</text><text x="60" y="275" class="small" font-family="monospace">SELECT * FROM dept;</text><text x="60" y="290" class="small" font-family="monospace">SELECT * FROM emp WHERE dept_id=?</text>
<rect x="450" y="230" width="300" height="70" fill="#fff" stroke="#388e3c" stroke-width="2" rx="3"/><text x="460" y="255" class="small">SQL 示例：</text><text x="460" y="275" class="small" font-family="monospace">SELECT d.*, e.* FROM dept d</text><text x="460" y="290" class="small" font-family="monospace">LEFT JOIN emp e ON d.id=e.dept_id</text>
<rect x="50" y="320" width="140" height="30" fill="#ffcdd2" rx="3"/><text x="120" y="340" class="small" text-anchor="middle">性能差</text>
<rect x="210" y="320" width="140" height="30" fill="#c8e6c9" rx="3"/><text x="280" y="340" class="small" text-anchor="middle">支持懒加载</text>
<rect x="450" y="320" width="140" height="30" fill="#c8e6c9" rx="3"/><text x="520" y="340" class="small" text-anchor="middle">性能好</text>
<rect x="610" y="320" width="140" height="30" fill="#ffcdd2" rx="3"/><text x="680" y="340" class="small" text-anchor="middle">不支持懒加载</text>
<rect x="50" y="370" width="700" height="40" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/><text x="400" y="395" class="small" text-anchor="middle" font-weight="bold">性能对比：查询 100 条记录时，嵌套查询执行 101 次 SQL，嵌套结果映射只需 1 次 SQL</text>
</svg>

**5. 解决 N+1 问题的方法**

**方法一：使用嵌套结果映射（推荐）**

```xml
<resultMap id="DeptWithEmployees" type="Department">
    <id property="id" column="dept_id"/>
    <result property="name" column="dept_name"/>
    <collection property="employees" ofType="Employee">
        <id property="id" column="emp_id"/>
        <result property="name" column="emp_name"/>
    </collection>
</resultMap>

<select id="findAll" resultMap="DeptWithEmployees">
    SELECT
        d.id as dept_id, d.name as dept_name,
        e.id as emp_id, e.name as emp_name
    FROM department d
    LEFT JOIN employee e ON d.id = e.dept_id
</select>
```

**方法二：启用懒加载**

```xml
<!-- mybatis-config.xml -->
<settings>
    <!-- 开启懒加载 -->
    <setting name="lazyLoadingEnabled" value="true"/>
    <!-- 关闭立即加载（按需加载） -->
    <setting name="aggressiveLazyLoading" value="false"/>
</settings>

<!-- Mapper.xml -->
<collection property="employees"
            column="id"
            select="com.example.mapper.EmployeeMapper.findByDeptId"
            fetchType="lazy"/>  <!-- 懒加载 -->
```

**关键要点**

1. **定义**：嵌套查询 = 分步查询，先查主表再查关联表
2. **N+1 问题**：查 N 条主表记录执行 1+N 次 SQL（1 次主查 + N 次关联查）
3. **性能影响**：大量数据库往返，严重降低性能
4. **解决方案**：使用嵌套结果映射（联表查询）或启用懒加载
5. **适用场景**：需要懒加载或关联数据使用频率低时才用嵌套查询

**记忆口诀**

```
嵌套查询分两步，先主后从多次查
查询 N 条主表时，执行 SQL 1+N 次
数据库往返频繁，性能影响要重视
解决方案有两招：联表查询或懒加载
```

### 49. 什么是嵌套结果映射？

**核心答案**

嵌套结果映射是通过**一次联表查询**获取所有数据，由 MyBatis **自动组装**成嵌套的对象结构。使用 `<association>` 或 `<collection>` 标签，配合 `ofType` 属性，直接在 resultMap 中定义关联对象的映射规则。

**详细说明**

**1. 嵌套结果映射原理**

<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.small{font:12px sans-serif;fill:#555}.step{fill:#e3f2fd;stroke:#1976d2;stroke-width:2}.data{fill:#fff9c4;stroke:#f57f17;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrowhead)}</style><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#666"/></marker></defs>
<text x="400" y="25" class="title" text-anchor="middle">嵌套结果映射工作流程</text>
<rect x="50" y="50" width="700" height="80" class="step" rx="5"/><text x="400" y="75" class="label" text-anchor="middle" font-weight="bold">步骤 1：执行联表查询（一次 SQL）</text><text x="60" y="100" class="small" font-family="monospace">SELECT d.id, d.name, e.id, e.name, e.dept_id</text><text x="60" y="120" class="small" font-family="monospace">FROM department d LEFT JOIN employee e ON d.id = e.dept_id</text>
<path d="M 400 130 L 400 150" class="arrow"/>
<rect x="50" y="150" width="700" height="120" class="data" rx="5"/><text x="400" y="175" class="label" text-anchor="middle" font-weight="bold">步骤 2：获取扁平化结果集（存在数据冗余）</text><rect x="70" y="185" width="660" height="75" fill="#fff" stroke="#999" stroke-width="1" rx="3"/><text x="80" y="205" class="small" font-family="monospace">dept_id | dept_name | emp_id | emp_name | dept_id</text><line x1="80" y1="210" x2="720" y2="210" stroke="#999"/><text x="80" y="225" class="small" font-family="monospace">   1    | 研发部    |   101  | 张三     |    1</text><text x="80" y="240" class="small" font-family="monospace">   1    | 研发部    |   102  | 李四     |    1</text><text x="80" y="255" class="small" font-family="monospace">   2    | 销售部    |   103  | 王五     |    2</text>
<path d="M 400 270 L 400 290" class="arrow"/>
<rect x="50" y="290" width="700" height="100" class="step" rx="5"/><text x="400" y="315" class="label" text-anchor="middle" font-weight="bold">步骤 3：MyBatis 根据 resultMap 自动组装</text><text x="60" y="340" class="small">• 识别主表主键（<tspan font-family="monospace">&lt;id&gt;</tspan> 标签），合并重复记录</text><text x="60" y="360" class="small">• 根据 <tspan font-family="monospace">&lt;collection&gt;</tspan> 配置，将关联数据填充到集合属性</text><text x="60" y="380" class="small">• 自动去重，避免主表对象重复创建</text>
<path d="M 400 390 L 400 410" class="arrow"/>
<rect x="50" y="410" width="320" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/><text x="210" y="435" class="label" text-anchor="middle" font-weight="bold">步骤 4：返回嵌套对象</text><text x="60" y="455" class="small" font-family="monospace">Department{id=1, employees=[...]}</text>
<rect x="430" y="410" width="320" height="60" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/><text x="590" y="435" class="label" text-anchor="middle" font-weight="bold">关键优势</text><text x="440" y="455" class="small">✓ 只执行一次 SQL</text><text x="440" y="468" class="small">✓ 无 N+1 问题，性能好</text>
</svg>

**2. 一对一嵌套结果映射**

```xml
<!-- 示例：员工关联部门 -->
<resultMap id="EmployeeWithDept" type="Employee">
    <id property="id" column="emp_id"/>
    <result property="name" column="emp_name"/>

    <!-- association: 一对一关联 -->
    <association property="department" javaType="Department">
        <id property="id" column="dept_id"/>
        <result property="name" column="dept_name"/>
    </association>
</resultMap>

<select id="findById" resultMap="EmployeeWithDept">
    SELECT
        e.id as emp_id,
        e.name as emp_name,
        d.id as dept_id,
        d.name as dept_name
    FROM employee e
    LEFT JOIN department d ON e.dept_id = d.id
    WHERE e.id = #{id}
</select>
```

**3. 一对多嵌套结果映射**

```xml
<!-- 示例：部门关联员工列表 -->
<resultMap id="DeptWithEmployees" type="Department">
    <id property="id" column="dept_id"/>
    <result property="name" column="dept_name"/>

    <!-- collection: 一对多关联 -->
    <collection property="employees" ofType="Employee">
        <id property="id" column="emp_id"/>
        <result property="name" column="emp_name"/>
        <result property="deptId" column="dept_id"/>
    </collection>
</resultMap>

<select id="findById" resultMap="DeptWithEmployees">
    SELECT
        d.id as dept_id,
        d.name as dept_name,
        e.id as emp_id,
        e.name as emp_name
    FROM department d
    LEFT JOIN employee e ON d.id = e.dept_id
    WHERE d.id = #{id}
</select>
```

**4. 核心要素对比**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.small{font:12px sans-serif;fill:#555}.box{fill:#e3f2fd;stroke:#1976d2;stroke-width:2}.highlight{fill:#fff9c4;stroke:#f57f17;stroke-width:2}</style></defs>
<text x="400" y="25" class="title" text-anchor="middle">嵌套结果映射关键要素</text>
<rect x="50" y="50" width="350" height="160" class="box" rx="5"/><text x="225" y="75" class="label" text-anchor="middle" font-weight="bold">一对一（association）</text><text x="60" y="100" class="small" font-weight="bold">标签属性：</text><text x="60" y="120" class="small">• <tspan font-family="monospace">property</tspan>: 对象属性名</text><text x="60" y="140" class="small">• <tspan font-family="monospace">javaType</tspan>: 关联对象类型（必填）</text><text x="60" y="160" class="small" font-weight="bold">使用场景：</text><text x="60" y="180" class="small">员工 → 部门，订单 → 用户</text><text x="60" y="195" class="small">（多对一、一对一关系）</text>
<rect x="420" y="50" width="350" height="160" class="box" rx="5"/><text x="595" y="75" class="label" text-anchor="middle" font-weight="bold">一对多（collection）</text><text x="430" y="100" class="small" font-weight="bold">标签属性：</text><text x="430" y="120" class="small">• <tspan font-family="monospace">property</tspan>: 集合属性名</text><text x="430" y="140" class="small">• <tspan font-family="monospace">ofType</tspan>: 集合元素类型（必填）</text><text x="430" y="160" class="small" font-weight="bold">使用场景：</text><text x="430" y="180" class="small">部门 → 员工列表，用户 → 订单列表</text><text x="430" y="195" class="small">（一对多关系）</text>
<rect x="50" y="230" width="700" height="180" class="highlight" rx="5"/><text x="60" y="255" class="label" font-weight="bold">重要配置说明</text>
<text x="60" y="280" class="small" font-weight="bold">1. &lt;id&gt; 标签至关重要</text><text x="70" y="300" class="small">• 必须配置主键映射（<tspan font-family="monospace">&lt;id property="id" column="id"/&gt;</tspan>）</text><text x="70" y="315" class="small">• MyBatis 根据主键识别并合并重复对象</text><text x="70" y="330" class="small">• 缺少 &lt;id&gt; 会导致对象重复创建，数据错误</text>
<text x="60" y="355" class="small" font-weight="bold">2. 列名别名（Column Alias）</text><text x="70" y="375" class="small">• 避免列名冲突：<tspan font-family="monospace">d.id as dept_id, e.id as emp_id</tspan></text><text x="70" y="390" class="small">• 提高可读性和可维护性</text><text x="70" y="405" class="small">• 与 resultMap 的 column 属性对应</text>
</svg>

**5. 多层嵌套示例**

```xml
<!-- 示例：部门 → 员工 → 项目（两层嵌套） -->
<resultMap id="DeptWithEmpAndProjects" type="Department">
    <id property="id" column="dept_id"/>
    <result property="name" column="dept_name"/>

    <!-- 第一层嵌套：部门的员工 -->
    <collection property="employees" ofType="Employee">
        <id property="id" column="emp_id"/>
        <result property="name" column="emp_name"/>

        <!-- 第二层嵌套：员工的项目 -->
        <collection property="projects" ofType="Project">
            <id property="id" column="proj_id"/>
            <result property="name" column="proj_name"/>
        </collection>
    </collection>
</resultMap>

<select id="findWithEmpAndProjects" resultMap="DeptWithEmpAndProjects">
    SELECT
        d.id as dept_id, d.name as dept_name,
        e.id as emp_id, e.name as emp_name,
        p.id as proj_id, p.name as proj_name
    FROM department d
    LEFT JOIN employee e ON d.id = e.dept_id
    LEFT JOIN project p ON e.id = p.emp_id
    WHERE d.id = #{id}
</select>
```

**关键要点**

1. **一次 SQL**：通过 LEFT JOIN 一次性获取所有数据，无 N+1 问题
2. **自动组装**：MyBatis 根据 `<id>` 标签识别主键，自动合并重复记录
3. **标签选择**：一对一用 `<association>`（javaType），一对多用 `<collection>`（ofType）
4. **列名别名**：使用 `as` 避免列名冲突，提高可读性
5. **不支持懒加载**：所有数据一次性加载，适合必须一起使用的关联数据

**记忆口诀**

```
嵌套结果一次查，联表查询 JOIN 来帮忙
MyBatis 自动来组装，根据主键去重不会慌
association 用于一对一，javaType 指定对象类型
collection 用于一对多，ofType 指定元素型
性能优越无 N+1，适合高频查询场景强
```

### 50. 嵌套查询和嵌套结果映射的区别是什么？

**核心答案**

两者是 MyBatis 实现关联查询的**两种不同方式**：嵌套查询是**分步查询**（多次 SQL，支持懒加载），嵌套结果映射是**联表查询**（一次 SQL，性能更优）。

**详细说明**

**1. 核心区别对比**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.small{font:12px sans-serif;fill:#555}.nested{fill:#ffebee;stroke:#c62828;stroke-width:2}.result{fill:#e8f5e9;stroke:#388e3c;stroke-width:2}.vs{fill:#fff9c4;stroke:#f57f17;stroke-width:3}</style></defs>
<text x="400" y="25" class="title" text-anchor="middle">嵌套查询 vs 嵌套结果映射</text>
<rect x="50" y="50" width="300" height="200" class="nested" rx="5"/><text x="200" y="75" class="label" text-anchor="middle" font-weight="bold">嵌套查询（Nested Select）</text><line x1="60" y1="85" x2="340" y2="85" stroke="#c62828"/><text x="60" y="105" class="small" font-weight="bold">查询方式：</text><text x="60" y="125" class="small">分步查询（先主后从）</text><text x="60" y="145" class="small" font-weight="bold">SQL 次数：</text><text x="60" y="165" class="small" fill="#d32f2f">1 + N 次（可能 N+1 问题）</text><text x="60" y="185" class="small" font-weight="bold">关键字：</text><text x="60" y="205" class="small" font-family="monospace">select + column</text><text x="60" y="225" class="small" font-weight="bold">懒加载：</text><text x="60" y="240" class="small">✓ 支持</text>
<rect x="450" y="50" width="300" height="200" class="result" rx="5"/><text x="600" y="75" class="label" text-anchor="middle" font-weight="bold">嵌套结果映射（Nested Results）</text><line x1="460" y1="85" x2="740" y2="85" stroke="#388e3c"/><text x="460" y="105" class="small" font-weight="bold">查询方式：</text><text x="460" y="125" class="small">联表查询（LEFT JOIN）</text><text x="460" y="145" class="small" font-weight="bold">SQL 次数：</text><text x="460" y="165" class="small" fill="#388e3c">1 次（无 N+1 问题）</text><text x="460" y="185" class="small" font-weight="bold">关键字：</text><text x="460" y="205" class="small" font-family="monospace">ofType / javaType</text><text x="460" y="225" class="small" font-weight="bold">懒加载：</text><text x="460" y="240" class="small">✗ 不支持</text>
<circle cx="400" cy="150" r="40" class="vs"/><text x="400" y="160" class="label" text-anchor="middle" font-weight="bold">VS</text>
<rect x="50" y="270" width="150" height="100" fill="#c8e6c9" stroke="#388e3c" stroke-width="1" rx="3"/><text x="125" y="290" class="small" text-anchor="middle" font-weight="bold">优点</text><text x="60" y="310" class="small">• 逻辑清晰</text><text x="60" y="325" class="small">• SQL 简单</text><text x="60" y="340" class="small">• 可懒加载</text><text x="60" y="355" class="small">• 按需查询</text>
<rect x="210" y="270" width="150" height="100" fill="#ffcdd2" stroke="#c62828" stroke-width="1" rx="3"/><text x="285" y="290" class="small" text-anchor="middle" font-weight="bold">缺点</text><text x="220" y="310" class="small">• 多次查询</text><text x="220" y="325" class="small">• N+1 问题</text><text x="220" y="340" class="small">• 性能较差</text><text x="220" y="355" class="small">• 网络开销大</text>
<rect x="440" y="270" width="150" height="100" fill="#c8e6c9" stroke="#388e3c" stroke-width="1" rx="3"/><text x="515" y="290" class="small" text-anchor="middle" font-weight="bold">优点</text><text x="450" y="310" class="small">• 一次查询</text><text x="450" y="325" class="small">• 性能好</text><text x="450" y="340" class="small">• 无 N+1 问题</text><text x="450" y="355" class="small">• 减少往返</text>
<rect x="600" y="270" width="150" height="100" fill="#ffcdd2" stroke="#c62828" stroke-width="1" rx="3"/><text x="675" y="290" class="small" text-anchor="middle" font-weight="bold">缺点</text><text x="610" y="310" class="small">• SQL 复杂</text><text x="610" y="325" class="small">• 数据冗余</text><text x="610" y="340" class="small">• 不能懒加载</text><text x="610" y="355" class="small">• 全量加载</text>
<rect x="50" y="390" width="340" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/><text x="60" y="415" class="label" font-weight="bold">适用场景</text><text x="60" y="435" class="small">✓ 关联数据使用频率低</text><text x="60" y="450" class="small">✓ 需要按需加载（懒加载）</text><text x="60" y="465" class="small">✓ 关联数据量不确定</text><text x="60" y="480" class="small">✓ 逻辑简单，易于维护</text>
<rect x="410" y="390" width="340" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/><text x="420" y="415" class="label" font-weight="bold">适用场景</text><text x="420" y="435" class="small">✓ 关联数据经常一起使用</text><text x="420" y="450" class="small">✓ 追求查询性能</text><text x="420" y="465" class="small">✓ 数据量大、查询频繁</text><text x="420" y="480" class="small">✓ 数据结构固定</text>
</svg>

**2. 配置方式对比**

**嵌套查询（Nested Select）**

```xml
<resultMap id="DeptWithEmployees" type="Department">
    <id property="id" column="id"/>
    <result property="name" column="name"/>

    <!-- 使用 select 属性指定另一个查询 -->
    <collection property="employees"
                column="id"
                select="com.example.mapper.EmployeeMapper.findByDeptId"
                fetchType="lazy"/>
</resultMap>

<select id="findById" resultMap="DeptWithEmployees">
    SELECT * FROM department WHERE id = #{id}
</select>

<!-- EmployeeMapper.xml -->
<select id="findByDeptId" resultType="Employee">
    SELECT * FROM employee WHERE dept_id = #{deptId}
</select>
```

**嵌套结果映射（Nested Results）**

```xml
<resultMap id="DeptWithEmployees" type="Department">
    <id property="id" column="dept_id"/>
    <result property="name" column="dept_name"/>

    <!-- 使用 ofType 直接定义映射规则 -->
    <collection property="employees" ofType="Employee">
        <id property="id" column="emp_id"/>
        <result property="name" column="emp_name"/>
    </collection>
</resultMap>

<select id="findById" resultMap="DeptWithEmployees">
    SELECT
        d.id as dept_id, d.name as dept_name,
        e.id as emp_id, e.name as emp_name
    FROM department d
    LEFT JOIN employee e ON d.id = e.dept_id
    WHERE d.id = #{id}
</select>
```

**3. 执行流程对比**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.small{font:12px sans-serif;fill:#555}.step{fill:#e3f2fd;stroke:#1976d2;stroke-width:2}.sql{fill:#fff;stroke:#666;stroke-width:1}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrowhead)}</style><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#666"/></marker></defs>
<text x="400" y="25" class="title" text-anchor="middle">执行流程详细对比</text>
<text x="200" y="55" class="label" text-anchor="middle" font-weight="bold">嵌套查询</text><text x="600" y="55" class="label" text-anchor="middle" font-weight="bold">嵌套结果映射</text>
<rect x="50" y="70" width="300" height="50" class="step" rx="5"/><text x="200" y="100" class="small" text-anchor="middle">1. 执行主查询</text>
<rect x="50" y="125" width="300" height="40" class="sql" rx="3"/><text x="60" y="145" class="small" font-family="monospace">SELECT * FROM department</text>
<path d="M 200 165 L 200 180" class="arrow"/>
<rect x="50" y="180" width="300" height="50" class="step" rx="5"/><text x="200" y="210" class="small" text-anchor="middle">2. 遍历结果，执行子查询</text>
<rect x="50" y="235" width="300" height="60" class="sql" rx="3"/><text x="60" y="255" class="small" font-family="monospace">SELECT * FROM employee</text><text x="60" y="270" class="small" font-family="monospace">WHERE dept_id = ?</text><text x="60" y="285" class="small" fill="#d32f2f">（每条记录执行一次）</text>
<path d="M 200 295 L 200 310" class="arrow"/>
<rect x="50" y="310" width="300" height="50" class="step" rx="5"/><text x="200" y="340" class="small" text-anchor="middle">3. 组装结果对象</text>
<text x="200" y="380" class="small" text-anchor="middle" fill="#d32f2f" font-weight="bold">执行 1+N 次 SQL</text><text x="200" y="400" class="small" text-anchor="middle">网络往返次数多</text><text x="200" y="415" class="small" text-anchor="middle">性能较差</text>
<rect x="450" y="70" width="300" height="50" class="step" rx="5"/><text x="600" y="100" class="small" text-anchor="middle">1. 执行联表查询</text>
<rect x="450" y="125" width="300" height="70" class="sql" rx="3"/><text x="460" y="145" class="small" font-family="monospace">SELECT d.*, e.*</text><text x="460" y="160" class="small" font-family="monospace">FROM department d LEFT JOIN</text><text x="460" y="175" class="small" font-family="monospace">employee e ON d.id = e.dept_id</text>
<path d="M 600 195 L 600 210" class="arrow"/>
<rect x="450" y="210" width="300" height="70" class="step" rx="5"/><text x="600" y="235" class="small" text-anchor="middle">2. MyBatis 自动组装</text><text x="460" y="255" class="small">• 识别主键，合并重复对象</text><text x="460" y="270" class="small">• 填充关联集合</text>
<path d="M 600 280 L 600 295" class="arrow"/>
<rect x="450" y="295" width="300" height="50" class="step" rx="5"/><text x="600" y="325" class="small" text-anchor="middle">3. 返回嵌套对象结构</text>
<text x="600" y="365" class="small" text-anchor="middle" fill="#388e3c" font-weight="bold">执行 1 次 SQL</text><text x="600" y="385" class="small" text-anchor="middle">网络往返次数少</text><text x="600" y="400" class="small" text-anchor="middle">性能优越</text><text x="600" y="415" class="small" text-anchor="middle">但存在数据冗余</text>
<rect x="50" y="430" width="150" height="20" fill="#ffebee" rx="3"/><text x="125" y="444" class="small" text-anchor="middle">支持懒加载</text>
<rect x="200" y="430" width="150" height="20" fill="#ffcdd2" rx="3"/><text x="275" y="444" class="small" text-anchor="middle">可能 N+1 问题</text>
<rect x="450" y="430" width="150" height="20" fill="#e8f5e9" rx="3"/><text x="525" y="444" class="small" text-anchor="middle">性能最优</text>
<rect x="610" y="430" width="140" height="20" fill="#ffe0b2" rx="3"/><text x="680" y="444" class="small" text-anchor="middle">数据冗余</text>
</svg>

**4. 属性关键字对比**

| 特性 | 嵌套查询 | 嵌套结果映射 |
|------|---------|-------------|
| **关键属性** | `select`、`column` | `ofType`、`javaType` |
| **SQL 方式** | 分步查询 | 联表查询（JOIN） |
| **SQL 次数** | 1 + N 次 | 1 次 |
| **懒加载** | 支持（`fetchType="lazy"`） | 不支持 |
| **N+1 问题** | 可能存在 | 不存在 |
| **性能** | 较差 | 较好 |
| **SQL 复杂度** | 简单 | 复杂（多表 JOIN） |
| **数据冗余** | 无 | 有（宽表） |
| **配置复杂度** | 简单 | 需配置列别名 |

**5. 选择建议**

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.small{font:12px sans-serif;fill:#555}.choose{fill:#e1f5fe;stroke:#0277bd;stroke-width:2}</style></defs>
<text x="400" y="25" class="title" text-anchor="middle">选择决策树</text>
<rect x="250" y="50" width="300" height="40" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/><text x="400" y="75" class="label" text-anchor="middle" font-weight="bold">关联数据是否总是一起使用？</text>
<path d="M 300 90 L 150 120" stroke="#666" stroke-width="2"/><text x="200" y="110" class="small" fill="#d32f2f">否</text><path d="M 500 90 L 650 120" stroke="#666" stroke-width="2"/><text x="580" y="110" class="small" fill="#388e3c">是</text>
<rect x="20" y="120" width="260" height="80" class="choose" rx="5"/><text x="150" y="145" class="label" text-anchor="middle" font-weight="bold">使用嵌套查询</text><text x="30" y="165" class="small">✓ 懒加载，按需加载</text><text x="30" y="180" class="small">✓ SQL 简单，易维护</text><text x="30" y="195" class="small">✗ 注意 N+1 问题</text>
<rect x="520" y="120" width="260" height="80" class="choose" rx="5"/><text x="650" y="145" class="label" text-anchor="middle" font-weight="bold">使用嵌套结果映射</text><text x="530" y="165" class="small">✓ 性能好，一次查询</text><text x="530" y="180" class="small">✓ 无 N+1 问题</text><text x="530" y="195" class="small">✗ SQL 复杂，有冗余</text>
<rect x="50" y="220" width="700" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/><text x="60" y="245" class="label" font-weight="bold">实际建议</text><text x="60" y="265" class="small">• <tspan font-weight="bold">高频查询、数据量大</tspan>：优先嵌套结果映射（性能优先）</text><text x="60" y="280" class="small">• <tspan font-weight="bold">低频查询、按需加载</tspan>：使用嵌套查询 + 懒加载（灵活性优先）</text>
</svg>

**关键要点**

1. **本质区别**：嵌套查询是多次 SQL，嵌套结果映射是一次 SQL
2. **关键字**：嵌套查询用 `select`，嵌套结果映射用 `ofType/javaType`
3. **性能**：嵌套结果映射性能更优，但不支持懒加载
4. **N+1 问题**：嵌套查询可能有 N+1 问题，嵌套结果映射无此问题
5. **选择依据**：高频查询选嵌套结果映射，低频按需选嵌套查询

**记忆口诀**

```
嵌套查询用 select，分步查询多次跑
嵌套结果 ofType 写，联表查询一次搞
前者支持懒加载，后者性能效率高
高频场景选后者，低频按需选前者妙
```

### 51. 什么是 association 标签?

**核心答案**

association 是 MyBatis 中用于处理**一对一关联映射**的标签，它在 resultMap 中定义一个对象属性与另一个实体的映射关系。

**详细说明**

1. **基本作用**
   - 将数据库查询结果映射为关联的对象属性
   - 支持嵌套查询和嵌套结果两种方式
   - 解决对象间的一对一依赖关系

2. **两种实现方式**

   **方式一：嵌套查询（select 方式）**
   ```xml
   <resultMap id="UserResultMap" type="User">
       <id property="id" column="user_id"/>
       <result property="username" column="username"/>
       <!-- 通过 select 指定另一个查询语句 -->
       <association property="card"
                    column="card_id"
                    select="selectCardById"
                    fetchType="lazy"/>
   </resultMap>

   <select id="selectCardById" resultType="Card">
       SELECT * FROM card WHERE id = #{id}
   </select>
   ```

   **方式二：嵌套结果（resultMap 方式）**
   ```xml
   <resultMap id="UserResultMap" type="User">
       <id property="id" column="user_id"/>
       <result property="username" column="username"/>
       <!-- 直接映射关联对象的字段 -->
       <association property="card" javaType="Card">
           <id property="id" column="card_id"/>
           <result property="cardNo" column="card_no"/>
           <result property="address" column="address"/>
       </association>
   </resultMap>

   <select id="selectUser" resultMap="UserResultMap">
       SELECT u.*, c.id card_id, c.card_no, c.address
       FROM user u
       LEFT JOIN card c ON u.card_id = c.id
       WHERE u.id = #{id}
   </select>
   ```

3. **核心属性对比**

   | 属性 | 说明 | 使用场景 |
   |------|------|----------|
   | property | 对象属性名 | 必填 |
   | javaType | 关联对象的 Java 类型 | 嵌套结果方式 |
   | column | 传递给嵌套查询的列名 | 嵌套查询方式 |
   | select | 执行嵌套查询的语句 id | 嵌套查询方式 |
   | resultMap | 复用的 resultMap id | 复杂映射 |
   | fetchType | 加载方式（lazy/eager） | 性能优化 |

4. **执行流程图**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.text{font-family:Arial,sans-serif;font-size:13px;}.title{font-weight:bold;font-size:14px;}</style></defs>
<rect x="50" y="30" width="150" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="65" text-anchor="middle" class="text title">查询主表</text>
<rect x="50" y="150" width="150" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="125" y="175" text-anchor="middle" class="text">嵌套查询</text>
<text x="125" y="195" text-anchor="middle" class="text">(select方式)</text>
<rect x="275" y="150" width="150" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="350" y="175" text-anchor="middle" class="text">嵌套结果</text>
<text x="350" y="195" text-anchor="middle" class="text">(resultMap方式)</text>
<rect x="50" y="270" width="150" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="125" y="295" text-anchor="middle" class="text">执行额外SQL</text>
<text x="125" y="315" text-anchor="middle" class="text">(可能N+1问题)</text>
<rect x="275" y="270" width="150" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="350" y="295" text-anchor="middle" class="text">一次JOIN查询</text>
<text x="350" y="315" text-anchor="middle" class="text">(性能更好)</text>
<rect x="500" y="150" width="150" height="60" fill="#e0f7fa" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="575" y="175" text-anchor="middle" class="text">组装对象</text>
<text x="575" y="195" text-anchor="middle" class="text">返回结果</text>
<path d="M 125 90 L 125 150" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 125 210 L 125 270" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 200 180 L 275 180" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 200 300 L 275 300" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 350 210 L 350 270" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 425 180 L 500 180" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 425 300 L 475 300 L 475 180 L 500 180" stroke="#333" stroke-width="2" fill="none"/>
<defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#333"/></marker></defs>
<text x="125" y="125" text-anchor="middle" class="text" fill="#666">分支选择</text>
<text x="237" y="175" text-anchor="middle" class="text" fill="#666">或</text>
</svg>

5. **两种方式优劣对比**

   **嵌套查询（select）**
   - ✅ 支持延迟加载，按需查询
   - ✅ SQL 语句简单，易维护
   - ✅ 可复用现有查询语句
   - ❌ 可能产生 N+1 问题
   - ❌ 性能相对较低

   **嵌套结果（resultMap）**
   - ✅ 一次 JOIN 查询，性能高
   - ✅ 避免 N+1 问题
   - ❌ SQL 语句复杂
   - ❌ 不支持延迟加载
   - ❌ 数据冗余，需要去重

**关键要点**

1. **association 用于一对一关系映射**
2. **select 方式支持延迟加载但可能有 N+1 问题**
3. **resultMap 方式性能更好但不支持延迟加载**
4. **根据场景选择合适的实现方式**

**记忆口诀**

```
一对一映射用 association，
select 延迟 N+1 要小心，
resultMap JOIN 性能高，
根据场景选方式。
```

### 52. 什么是 collection 标签?

**核心答案**

collection 是 MyBatis 中用于处理**一对多关联映射**的标签，它在 resultMap 中定义一个集合属性与多个关联实体的映射关系。

**详细说明**

1. **基本作用**
   - 将查询结果映射为集合类型的属性（List、Set 等）
   - 支持嵌套查询和嵌套结果两种方式
   - 解决一对多的关联关系

2. **两种实现方式**

   **方式一：嵌套查询（select 方式）**
   ```xml
   <resultMap id="DeptResultMap" type="Department">
       <id property="id" column="dept_id"/>
       <result property="deptName" column="dept_name"/>
       <!-- 通过 select 查询部门下的所有员工 -->
       <collection property="employees"
                   column="dept_id"
                   select="selectEmployeesByDeptId"
                   fetchType="lazy"
                   ofType="Employee"/>
   </resultMap>

   <select id="selectEmployeesByDeptId" resultType="Employee">
       SELECT * FROM employee WHERE dept_id = #{deptId}
   </select>
   ```

   **方式二：嵌套结果（resultMap 方式）**
   ```xml
   <resultMap id="DeptResultMap" type="Department">
       <id property="id" column="dept_id"/>
       <result property="deptName" column="dept_name"/>
       <!-- 直接映射员工集合 -->
       <collection property="employees" ofType="Employee">
           <id property="id" column="emp_id"/>
           <result property="name" column="emp_name"/>
           <result property="salary" column="salary"/>
       </collection>
   </resultMap>

   <select id="selectDept" resultMap="DeptResultMap">
       SELECT d.id dept_id, d.dept_name,
              e.id emp_id, e.name emp_name, e.salary
       FROM department d
       LEFT JOIN employee e ON d.id = e.dept_id
       WHERE d.id = #{id}
   </select>
   ```

3. **核心属性对比**

   | 属性 | 说明 | 使用场景 |
   |------|------|----------|
   | property | 集合属性名 | 必填 |
   | ofType | 集合中元素的 Java 类型 | 必填 |
   | javaType | 集合的类型（默认 ArrayList） | 可选 |
   | column | 传递给嵌套查询的列名 | 嵌套查询方式 |
   | select | 执行嵌套查询的语句 id | 嵌套查询方式 |
   | resultMap | 复用的 resultMap id | 复杂映射 |
   | fetchType | 加载方式（lazy/eager） | 性能优化 |

4. **与 association 的对比**

<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg">
<defs><style>.text{font-family:Arial,sans-serif;font-size:13px;}.title{font-weight:bold;font-size:14px;}</style></defs>
<text x="350" y="25" text-anchor="middle" class="text title" font-size="16">association vs collection</text>
<rect x="50" y="50" width="250" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="175" y="75" text-anchor="middle" class="text title">association (一对一)</text>
<text x="175" y="95" text-anchor="middle" class="text">javaType: 对象类型</text>
<text x="175" y="115" text-anchor="middle" class="text">property: User.card</text>
<rect x="400" y="50" width="250" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="525" y="75" text-anchor="middle" class="text title">collection (一对多)</text>
<text x="525" y="95" text-anchor="middle" class="text">ofType: 元素类型</text>
<text x="525" y="115" text-anchor="middle" class="text">property: Dept.employees</text>
<rect x="50" y="160" width="250" height="90" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="175" y="185" text-anchor="middle" class="text title">示例场景</text>
<text x="175" y="205" text-anchor="middle" class="text">用户 → 身份证</text>
<text x="175" y="225" text-anchor="middle" class="text">订单 → 收货地址</text>
<rect x="400" y="160" width="250" height="90" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="525" y="185" text-anchor="middle" class="text title">示例场景</text>
<text x="525" y="205" text-anchor="middle" class="text">部门 → 员工列表</text>
<text x="525" y="225" text-anchor="middle" class="text">订单 → 订单项列表</text>
<rect x="50" y="280" width="250" height="70" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="175" y="305" text-anchor="middle" class="text title">返回类型</text>
<text x="175" y="325" text-anchor="middle" class="text">单个对象 (Card)</text>
<rect x="400" y="280" width="250" height="70" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="525" y="305" text-anchor="middle" class="text title">返回类型</text>
<text x="525" y="325" text-anchor="middle" class="text">集合对象 (List&lt;Employee&gt;)</text>
<path d="M 175 130 L 175 160" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 525 130 L 525 160" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 175 250 L 175 280" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 525 250 L 525 280" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#666"/></marker></defs>
</svg>

5. **N+1 问题示例**

   使用嵌套查询（select）时的执行：
   ```
   第 1 次：SELECT * FROM department        -- 查出 10 个部门
   第 2 次：SELECT * FROM employee WHERE dept_id = 1
   第 3 次：SELECT * FROM employee WHERE dept_id = 2
   ...
   第 11 次：SELECT * FROM employee WHERE dept_id = 10

   总共执行 1 + 10 = 11 次 SQL（N+1 问题）
   ```

   使用嵌套结果（resultMap）时的执行：
   ```
   第 1 次：SELECT d.*, e.*
           FROM department d
           LEFT JOIN employee e ON d.id = e.dept_id

   总共执行 1 次 SQL（性能更好）
   ```

6. **数据去重机制**

   嵌套结果方式中，MyBatis 通过 `<id>` 标签识别主对象：
   ```xml
   <resultMap id="DeptResultMap" type="Department">
       <!-- id 标签很关键：用于判断是否是同一个部门 -->
       <id property="id" column="dept_id"/>
       <result property="deptName" column="dept_name"/>
       <collection property="employees" ofType="Employee">
           <!-- id 标签也关键：用于判断是否是同一个员工 -->
           <id property="id" column="emp_id"/>
           <result property="name" column="emp_name"/>
       </collection>
   </resultMap>
   ```

   查询结果：
   ```
   dept_id | dept_name | emp_id | emp_name
   --------|-----------|--------|----------
   1       | 研发部     | 101    | 张三
   1       | 研发部     | 102    | 李四
   1       | 研发部     | 103    | 王五
   ```

   映射后：
   ```
   Department(id=1, name=研发部, employees=[
       Employee(id=101, name=张三),
       Employee(id=102, name=李四),
       Employee(id=103, name=王五)
   ])
   ```

**关键要点**

1. **collection 用于一对多关系，返回集合类型**
2. **ofType 指定集合元素类型，javaType 指定集合类型**
3. **嵌套查询支持延迟加载，嵌套结果性能更好**
4. **嵌套结果必须正确配置 id 标签才能正确去重**

**记忆口诀**

```
一对多集合用 collection，
ofType 指定元素类型，
select 延迟有 N+1，
resultMap JOIN 要去重。
```

### 53. 什么是延迟加载？如何配置？

**核心答案**

延迟加载（Lazy Loading）是指在需要使用关联对象数据时才执行查询，而不是在查询主对象时就加载所有关联数据。它是一种**按需加载**的优化策略。

**详细说明**

1. **延迟加载的意义**

   **不使用延迟加载（立即加载）**
   ```java
   // 查询部门时，立即查询所有员工
   Department dept = mapper.selectDeptById(1);
   // 即使不访问 employees，也已经执行了查询
   ```

   **使用延迟加载**
   ```java
   // 查询部门时，不查询员工
   Department dept = mapper.selectDeptById(1);
   System.out.println(dept.getDeptName()); // 只查询了部门

   // 访问 employees 时才触发查询
   List<Employee> emps = dept.getEmployees(); // 此时才查询员工
   ```

2. **全局配置方式**

   在 `mybatis-config.xml` 中配置：
   ```xml
   <configuration>
       <settings>
           <!-- 全局开启延迟加载 -->
           <setting name="lazyLoadingEnabled" value="true"/>

           <!-- 关闭侵入式延迟加载（重要）-->
           <setting name="aggressiveLazyLoading" value="false"/>

           <!-- 指定触发延迟加载的方法（可选）-->
           <setting name="lazyLoadTriggerMethods"
                    value="equals,clone,hashCode,toString"/>
       </settings>
   </configuration>
   ```

3. **局部配置方式**

   在具体的 association 或 collection 标签中配置：
   ```xml
   <resultMap id="DeptResultMap" type="Department">
       <id property="id" column="id"/>
       <result property="deptName" column="dept_name"/>

       <!-- 局部配置：延迟加载员工信息 -->
       <collection property="employees"
                   column="id"
                   select="selectEmployeesByDeptId"
                   fetchType="lazy"/>  <!-- lazy: 延迟加载, eager: 立即加载 -->
   </resultMap>

   <resultMap id="UserResultMap" type="User">
       <id property="id" column="id"/>
       <result property="username" column="username"/>

       <!-- 局部配置：立即加载身份证信息 -->
       <association property="card"
                    column="card_id"
                    select="selectCardById"
                    fetchType="eager"/>  <!-- 覆盖全局配置 -->
   </resultMap>
   ```

4. **配置参数详解**

   | 配置项 | 作用 | 可选值 | 默认值 |
   |--------|------|--------|--------|
   | lazyLoadingEnabled | 全局延迟加载开关 | true/false | false |
   | aggressiveLazyLoading | 侵入式延迟加载 | true/false | false |
   | lazyLoadTriggerMethods | 触发延迟加载的方法 | 方法名列表 | equals,clone,hashCode,toString |
   | fetchType | 局部加载策略 | lazy/eager | - |

5. **配置优先级**

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
<defs><style>.text{font-family:Arial,sans-serif;font-size:13px;}.title{font-weight:bold;font-size:14px;}</style></defs>
<text x="350" y="25" text-anchor="middle" class="text title" font-size="16">延迟加载配置优先级</text>
<rect x="50" y="50" width="200" height="70" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="150" y="75" text-anchor="middle" class="text title">优先级 1 (最高)</text>
<text x="150" y="95" text-anchor="middle" class="text">fetchType="lazy"</text>
<text x="150" y="110" text-anchor="middle" class="text">或 fetchType="eager"</text>
<rect x="50" y="150" width="200" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="150" y="175" text-anchor="middle" class="text title">优先级 2</text>
<text x="150" y="195" text-anchor="middle" class="text">lazyLoadingEnabled</text>
<text x="150" y="210" text-anchor="middle" class="text">全局配置</text>
<rect x="50" y="250" width="200" height="40" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="150" y="275" text-anchor="middle" class="text">默认行为：立即加载</text>
<rect x="350" y="80" width="300" height="180" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="500" y="105" text-anchor="middle" class="text title">决策流程</text>
<text x="380" y="130" text-anchor="start" class="text">1. 检查 fetchType 属性</text>
<text x="390" y="150" text-anchor="start" class="text">→ 有值：使用该值</text>
<text x="390" y="170" text-anchor="start" class="text">→ 无值：继续</text>
<text x="380" y="195" text-anchor="start" class="text">2. 检查 lazyLoadingEnabled</text>
<text x="390" y="215" text-anchor="start" class="text">→ true：延迟加载</text>
<text x="390" y="235" text-anchor="start" class="text">→ false：立即加载</text>
<path d="M 150 120 L 150 150" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 150 220 L 150 250" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 250 85 L 350 100" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>
<defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#333"/></marker></defs>
</svg>

6. **aggressiveLazyLoading 的影响**

   **aggressiveLazyLoading = true（老版本默认）**
   ```java
   Department dept = mapper.selectDeptById(1);
   // 访问任何属性都会触发所有延迟加载
   System.out.println(dept.getDeptName()); // 触发员工查询！
   ```

   **aggressiveLazyLoading = false（推荐）**
   ```java
   Department dept = mapper.selectDeptById(1);
   // 只访问普通属性不会触发延迟加载
   System.out.println(dept.getDeptName()); // 不触发员工查询
   // 只有访问关联属性才触发
   dept.getEmployees(); // 此时才触发员工查询
   ```

7. **完整配置示例**

   ```xml
   <!-- mybatis-config.xml -->
   <configuration>
       <settings>
           <!-- 开启延迟加载 -->
           <setting name="lazyLoadingEnabled" value="true"/>
           <!-- 关闭侵入式延迟加载 -->
           <setting name="aggressiveLazyLoading" value="false"/>
       </settings>
   </configuration>

   <!-- DepartmentMapper.xml -->
   <resultMap id="DeptResultMap" type="Department">
       <id property="id" column="id"/>
       <result property="deptName" column="dept_name"/>

       <!-- 员工信息：延迟加载（按需加载）-->
       <collection property="employees"
                   column="id"
                   select="selectEmployees"
                   fetchType="lazy"/>

       <!-- 部门经理：立即加载（必需信息）-->
       <association property="manager"
                    column="manager_id"
                    select="selectManager"
                    fetchType="eager"/>
   </resultMap>
   ```

**关键要点**

1. **延迟加载需要配置 lazyLoadingEnabled=true**
2. **必须关闭 aggressiveLazyLoading（设为 false）**
3. **fetchType 局部配置优先级最高**
4. **延迟加载只对嵌套查询（select）有效，嵌套结果（resultMap）无效**

**记忆口诀**

```
延迟加载按需查，
lazyLoadingEnabled 要打开，
aggressiveLazyLoading 要关闭，
fetchType 局部优先级最高。
```

### 54. 延迟加载的原理是什么？

**核心答案**

MyBatis 延迟加载的原理是通过 **CGLIB 或 Javassist 创建代理对象**，在访问关联属性时拦截方法调用，触发额外的 SQL 查询来加载数据。

**详细说明**

1. **代理对象生成流程**

<svg viewBox="0 0 750 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.text{font-family:Arial,sans-serif;font-size:13px;}.title{font-weight:bold;font-size:14px;}</style></defs>
<text x="375" y="25" text-anchor="middle" class="text title" font-size="16">延迟加载原理流程</text>
<rect x="50" y="50" width="180" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="75" text-anchor="middle" class="text title">1. 查询主对象</text>
<text x="140" y="95" text-anchor="middle" class="text">SELECT * FROM dept</text>
<rect x="285" y="50" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="375" y="75" text-anchor="middle" class="text title">2. 创建代理对象</text>
<text x="375" y="95" text-anchor="middle" class="text">CGLIB/Javassist</text>
<rect x="520" y="50" width="180" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="610" y="75" text-anchor="middle" class="text title">3. 返回代理对象</text>
<text x="610" y="95" text-anchor="middle" class="text">Department$Proxy</text>
<rect x="140" y="160" width="180" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="230" y="185" text-anchor="middle" class="text title">4. 访问关联属性</text>
<text x="230" y="205" text-anchor="middle" class="text">dept.getEmployees()</text>
<rect x="430" y="160" width="180" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="520" y="185" text-anchor="middle" class="text title">5. 拦截方法调用</text>
<text x="520" y="205" text-anchor="middle" class="text">MethodInterceptor</text>
<rect x="140" y="270" width="180" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="230" y="295" text-anchor="middle" class="text title">6. 执行延迟查询</text>
<text x="230" y="315" text-anchor="middle" class="text">SELECT * FROM emp</text>
<rect x="430" y="270" width="180" height="60" fill="#e0f7fa" stroke="#0097a7" stroke-width="2" rx="5"/>
<text x="520" y="295" text-anchor="middle" class="text title">7. 填充关联数据</text>
<text x="520" y="315" text-anchor="middle" class="text">设置 employees</text>
<rect x="285" y="380" width="180" height="50" fill="#dcedc8" stroke="#689f38" stroke-width="2" rx="5"/>
<text x="375" y="405" text-anchor="middle" class="text title">8. 返回真实数据</text>
<text x="375" y="420" text-anchor="middle" class="text">List&lt;Employee&gt;</text>
<path d="M 230 80 L 285 80" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 465 80 L 520 80" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 610 110 L 610 140 L 230 140 L 230 160" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 320 190 L 430 190" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 520 220 L 520 240 L 230 240 L 230 270" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 320 300 L 430 300" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 520 330 L 520 360 L 375 360 L 375 380" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#333"/></marker></defs>
<text x="140" y="145" text-anchor="middle" class="text" fill="#666" font-size="11">应用代码调用</text>
<text x="375" y="250" text-anchor="middle" class="text" fill="#666" font-size="11">检测到未加载</text>
<text x="375" y="365" text-anchor="middle" class="text" fill="#666" font-size="11">加载完成</text>
</svg>

2. **核心实现类**

   MyBatis 使用以下类实现延迟加载：

   **代理工厂**
   ```
   ProxyFactory（接口）
   ├── CglibProxyFactory（CGLIB 实现）
   └── JavassistProxyFactory（Javassist 实现）
   ```

   **关键类的职责**
   - `ResultLoaderMap`：存储延迟加载的查询信息
   - `MethodInterceptor`：拦截方法调用，触发延迟加载
   - `EnhancedResultObjectProxyImpl`：增强的代理对象实现

3. **代理对象的结构**

   ```
   原始对象：Department
   ├── id: 1
   ├── deptName: "研发部"
   └── employees: null（未加载）

   代理对象：Department$EnhancerByCGLIB
   ├── 继承 Department
   ├── 包含 MethodInterceptor
   └── 包含 ResultLoaderMap
       └── LoadPair("employees", "selectEmployees", param=1)
   ```

4. **方法拦截机制**

   ```java
   // 伪代码：代理对象的方法拦截逻辑
   public class Department$Proxy extends Department {
       private ResultLoaderMap loaderMap;
       private boolean employeesLoaded = false;

       @Override
       public List<Employee> getEmployees() {
           // 检查是否已加载
           if (!employeesLoaded) {
               // 触发延迟加载
               LoadPair pair = loaderMap.get("employees");
               Object result = pair.load(); // 执行 SQL 查询

               // 设置到真实属性
               super.setEmployees((List<Employee>) result);
               employeesLoaded = true;
           }

           // 返回真实数据
           return super.getEmployees();
       }

       @Override
       public String getDeptName() {
           // 普通属性直接返回，不触发延迟加载
           return super.getDeptName();
       }
   }
   ```

5. **ResultLoaderMap 的作用**

   ```java
   // 延迟加载信息的存储结构
   class ResultLoaderMap {
       private Map<String, LoadPair> loaderMap = new HashMap<>();

       static class LoadPair {
           private String property;        // 属性名：employees
           private String sql;              // SQL语句：selectEmployees
           private Object parameterObject;  // 参数：deptId=1
           private Class<?> targetType;     // 目标类型：Employee

           public Object load() {
               // 通过 SqlSession 执行查询
               return sqlSession.selectList(sql, parameterObject);
           }
       }
   }
   ```

6. **触发时机判断**

   **会触发延迟加载的操作**
   ```java
   dept.getEmployees();              // ✅ 访问关联属性
   dept.getEmployees().size();       // ✅ 访问关联属性后的方法
   ```

   **不会触发延迟加载的操作（aggressiveLazyLoading=false）**
   ```java
   dept.getId();                     // ❌ 访问普通属性
   dept.getDeptName();               // ❌ 访问普通属性
   dept.toString();                  // ❌ toString 是特殊方法
   dept.equals(other);               // ❌ equals 是特殊方法
   ```

   **aggressiveLazyLoading=true 时**
   ```java
   dept.getDeptName();               // ✅ 访问任何属性都会触发！
   ```

7. **代理对象的判断**

   ```java
   Department dept = mapper.selectDeptById(1);

   // 判断是否是代理对象
   System.out.println(dept.getClass());
   // 输出：class com.example.Department$EnhancerByCGLIB$12345

   // 检查是否是 CGLIB 代理
   boolean isProxy = dept.getClass().getName().contains("EnhancerByCGLIB");

   // 获取真实类型
   Class<?> realClass = dept.getClass().getSuperclass();
   System.out.println(realClass); // class com.example.Department
   ```

8. **延迟加载的限制**

   1. **必须是嵌套查询（select）方式**
      - 嵌套结果（resultMap + JOIN）不支持延迟加载
      - 因为数据已经在一次查询中获取了

   2. **需要序列化时要注意**
      ```java
      Department dept = mapper.selectDeptById(1);
      // 序列化代理对象可能失败
      ObjectOutputStream oos = new ObjectOutputStream(fos);
      oos.writeObject(dept); // 可能抛出 NotSerializableException
      ```

   3. **SqlSession 必须保持打开**
      ```java
      Department dept;
      try (SqlSession session = factory.openSession()) {
          dept = mapper.selectDeptById(1);
      } // session 关闭

      dept.getEmployees(); // 抛异常：Session is closed
      ```

**关键要点**

1. **延迟加载通过 CGLIB/Javassist 创建代理对象**
2. **代理对象拦截 getter 方法，触发 SQL 查询**
3. **ResultLoaderMap 存储延迟加载的查询信息**
4. **只对嵌套查询（select）有效，嵌套结果无效**

**记忆口诀**

```
代理对象是关键，
CGLIB 拦截 getter 方法，
ResultLoaderMap 存查询，
访问属性才触发。
```
