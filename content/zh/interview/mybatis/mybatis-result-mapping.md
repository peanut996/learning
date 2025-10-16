## 结果映射
### 39. 什么是 resultType 和 resultMap？

**核心答案**

resultType 和 resultMap 是 MyBatis 中用于定义查询结果如何映射到 Java 对象的两种方式：
- **resultType**：指定简单的 Java 类型，MyBatis 自动将查询结果映射到该类型
- **resultMap**：自定义结果映射规则，可以处理复杂的对象关系和字段映射

**详细说明**

**1. resultType**

直接指定返回值的全限定类名或类型别名，MyBatis 会自动完成映射：

```xml
<!-- 返回基本类型 -->
<select id="count" resultType="int">
    SELECT COUNT(*) FROM user
</select>

<!-- 返回实体类 -->
<select id="findById" resultType="com.example.User">
    SELECT id, username, email FROM user WHERE id = #{id}
</select>

<!-- 使用类型别名 -->
<select id="findAll" resultType="User">
    SELECT * FROM user
</select>

<!-- 返回 Map -->
<select id="findMap" resultType="map">
    SELECT id, username FROM user WHERE id = #{id}
</select>
```

**2. resultMap**

通过 `<resultMap>` 标签自定义映射规则：

```xml
<!-- 定义 resultMap -->
<resultMap id="userResultMap" type="User">
    <id property="id" column="user_id"/>
    <result property="username" column="user_name"/>
    <result property="email" column="user_email"/>
</resultMap>

<!-- 使用 resultMap -->
<select id="findById" resultMap="userResultMap">
    SELECT user_id, user_name, user_email FROM user WHERE user_id = #{id}
</select>
```

**映射流程对比**

<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead-39" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker><style>.text-39{font-family:ui-monospace,monospace;font-size:13px;fill:#333}.box-39{fill:#f8f9fa;stroke:#999;stroke-width:1.5}.arrow-39{stroke:#666;stroke-width:1.5;fill:none;marker-end:url(#arrowhead-39)}.header-39{fill:#4a90e2;stroke:#357abd;stroke-width:1.5}.title-39{font-size:15px;font-weight:600;fill:#fff}.label-39{font-size:12px;fill:#666}</style></defs><rect class="header-39" x="30" y="20" width="320" height="35" rx="3"/><text class="title-39" x="190" y="43" text-anchor="middle">resultType 自动映射</text><rect class="box-39" x="50" y="80" width="120" height="80" rx="3"/><text class="text-39" x="110" y="105" text-anchor="middle" font-weight="600">SQL 结果集</text><text class="text-39" x="70" y="130" font-size="11">id: 1</text><text class="text-39" x="70" y="145" font-size="11">username: "张三"</text><rect class="box-39" x="230" y="80" width="120" height="80" rx="3"/><text class="text-39" x="290" y="105" text-anchor="middle" font-weight="600">Java 对象</text><text class="text-39" x="250" y="130" font-size="11">id = 1</text><text class="text-39" x="250" y="145" font-size="11">username = "张三"</text><path class="arrow-39" d="M 170 120 L 230 120"/><text class="label-39" x="200" y="110" text-anchor="middle">自动映射</text><text class="label-39" x="200" y="140" text-anchor="middle" font-size="10">(字段名=属性名)</text><rect class="header-39" x="30" y="200" width="320" height="35" rx="3"/><text class="title-39" x="190" y="223" text-anchor="middle">resultMap 自定义映射</text><rect class="box-39" x="50" y="260" width="120" height="100" rx="3"/><text class="text-39" x="110" y="285" text-anchor="middle" font-weight="600">SQL 结果集</text><text class="text-39" x="70" y="310" font-size="11">user_id: 1</text><text class="text-39" x="70" y="325" font-size="11">user_name: "张三"</text><text class="text-39" x="70" y="340" font-size="11">dept_id: 100</text><rect class="box-39" x="230" y="260" width="120" height="100" rx="3"/><text class="text-39" x="290" y="285" text-anchor="middle" font-weight="600">Java 对象</text><text class="text-39" x="250" y="310" font-size="11">id = 1</text><text class="text-39" x="250" y="325" font-size="11">username = "张三"</text><text class="text-39" x="250" y="340" font-size="11">dept = Dept{}</text><path class="arrow-39" d="M 170 300 L 230 300"/><text class="label-39" x="200" y="280" text-anchor="middle">自定义映射</text><text class="label-39" x="200" y="295" text-anchor="middle" font-size="10">(规则映射)</text><rect class="box-39" x="420" y="80" width="340" height="280" rx="3"/><text class="text-39" x="590" y="105" text-anchor="middle" font-weight="600">使用场景对比</text><text class="text-39" x="440" y="140" font-weight="600">resultType 适用于：</text><text class="label-39" x="460" y="165">✓ 字段名与属性名一致</text><text class="label-39" x="460" y="185">✓ 简单类型（int、String）</text><text class="label-39" x="460" y="205">✓ Map 类型</text><text class="label-39" x="460" y="225">✓ 简单实体映射</text><text class="text-39" x="440" y="260" font-weight="600">resultMap 适用于：</text><text class="label-39" x="460" y="285">✓ 字段名与属性名不一致</text><text class="label-39" x="460" y="305">✓ 复杂对象（一对一、一对多）</text><text class="label-39" x="460" y="325">✓ 需要类型转换</text><text class="label-39" x="460" y="345">✓ 需要自定义映射规则</text><rect x="30" y="390" width="740" height="70" fill="#fff7e6" stroke="#ffa940" stroke-width="1.5" rx="3"/><text class="text-39" x="50" y="415" font-weight="600">💡 关键要点</text><text class="label-39" x="50" y="435">1. resultType 简单直接，适合简单映射；resultMap 灵活强大，适合复杂映射</text><text class="label-39" x="50" y="450">2. 不能同时使用 resultType 和 resultMap</text></svg>

**关键要点**

1. **resultType 特点**
   - 简单直接，自动映射
   - 要求字段名与属性名一致（或开启驼峰命名）
   - 适合简单场景

2. **resultMap 特点**
   - 灵活强大，完全可控
   - 可以处理复杂对象关系
   - 可以自定义映射规则

3. **互斥关系**
   - resultType 和 resultMap 不能同时使用
   - 一个查询语句只能选择其中一种

**记忆口诀**

```
简单直接用 Type
复杂关系用 Map
字段一致选 Type
字段不同选 Map
```

### 40. resultType 和 resultMap 的区别是什么？

**核心答案**

resultType 和 resultMap 的主要区别在于：
- **映射方式**：resultType 自动映射，resultMap 手动配置
- **适用场景**：resultType 适合简单映射，resultMap 适合复杂映射
- **灵活性**：resultType 简单但受限，resultMap 灵活但繁琐
- **关联查询**：resultType 不支持，resultMap 支持（association、collection）

**详细说明**

**对比维度图**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs><style>.text-40{font-family:ui-monospace,monospace;font-size:12px;fill:#333}.header-40{fill:#e8f4f8;stroke:#4a90e2;stroke-width:1.5}.box-40{fill:#f8f9fa;stroke:#999;stroke-width:1.5}.vs-40{fill:#ffa940;stroke:#ff7a00;stroke-width:2}.title-40{font-size:14px;font-weight:600;fill:#333}.label-40{font-size:11px;fill:#666}</style></defs><rect class="vs-40" x="370" y="20" width="60" height="40" rx="5"/><text class="text-40" x="400" y="45" text-anchor="middle" font-size="18" font-weight="700" fill="#fff">VS</text><rect class="header-40" x="30" y="20" width="320" height="40" rx="3"/><text class="title-40" x="190" y="45" text-anchor="middle">resultType</text><rect class="header-40" x="450" y="20" width="320" height="40" rx="3"/><text class="title-40" x="610" y="45" text-anchor="middle">resultMap</text><rect class="box-40" x="30" y="80" width="320" height="110" rx="3"/><text class="text-40" x="50" y="100" font-weight="600">1. 映射方式</text><text class="label-40" x="60" y="120">• 自动映射</text><text class="label-40" x="60" y="140">• 基于字段名匹配</text><text class="label-40" x="60" y="160">• 支持驼峰转换</text><text class="label-40" x="60" y="180">• 零配置</text><rect class="box-40" x="450" y="80" width="320" height="110" rx="3"/><text class="text-40" x="470" y="100" font-weight="600">1. 映射方式</text><text class="label-40" x="480" y="120">• 手动配置映射规则</text><text class="label-40" x="480" y="140">• 显式指定字段和属性</text><text class="label-40" x="480" y="160">• 完全可控</text><text class="label-40" x="480" y="180">• 需要配置</text><rect class="box-40" x="30" y="200" width="320" height="110" rx="3"/><text class="text-40" x="50" y="220" font-weight="600">2. 适用场景</text><text class="label-40" x="60" y="240">• 简单实体映射</text><text class="label-40" x="60" y="260">• 基本类型（int、String）</text><text class="label-40" x="60" y="280">• Map 类型</text><text class="label-40" x="60" y="300">• 字段名与属性名一致</text><rect class="box-40" x="450" y="200" width="320" height="110" rx="3"/><text class="text-40" x="470" y="220" font-weight="600">2. 适用场景</text><text class="label-40" x="480" y="240">• 复杂对象映射</text><text class="label-40" x="480" y="260">• 一对一、一对多关联</text><text class="label-40" x="480" y="280">• 字段名与属性名不一致</text><text class="label-40" x="480" y="300">• 需要类型转换</text><rect class="box-40" x="30" y="320" width="320" height="90" rx="3"/><text class="text-40" x="50" y="340" font-weight="600">3. 优点</text><text class="label-40" x="60" y="360">• 简单快捷，无需配置</text><text class="label-40" x="60" y="380">• 代码简洁</text><text class="label-40" x="60" y="400">• 适合快速开发</text><rect class="box-40" x="450" y="320" width="320" height="90" rx="3"/><text class="text-40" x="470" y="340" font-weight="600">3. 优点</text><text class="label-40" x="480" y="360">• 灵活强大，完全可控</text><text class="label-40" x="480" y="380">• 支持复杂映射</text><text class="label-40" x="480" y="400">• 可复用配置</text><rect class="box-40" x="30" y="420" width="320" height="90" rx="3"/><text class="text-40" x="50" y="440" font-weight="600">4. 缺点</text><text class="label-40" x="60" y="460">• 灵活性受限</text><text class="label-40" x="60" y="480">• 不支持关联查询</text><text class="label-40" x="60" y="500">• 字段名必须匹配</text><rect class="box-40" x="450" y="420" width="320" height="90" rx="3"/><text class="text-40" x="470" y="440" font-weight="600">4. 缺点</text><text class="label-40" x="480" y="460">• 配置繁琐</text><text class="label-40" x="480" y="480">• 代码量较大</text><text class="label-40" x="480" y="500">• 学习成本高</text><rect x="30" y="530" width="740" height="55" fill="#fff7e6" stroke="#ffa940" stroke-width="1.5" rx="3"/><text class="text-40" x="50" y="550" font-weight="600">💡 选择建议</text><text class="label-40" x="50" y="570">简单查询优先使用 resultType；复杂关联、字段不匹配、需要类型转换时使用 resultMap</text></svg>

**1. 映射机制对比**

| 特性 | resultType | resultMap |
|-----|-----------|-----------|
| 映射方式 | 自动映射 | 手动配置 |
| 字段匹配 | 名称相同或驼峰转换 | 显式指定 |
| 配置复杂度 | 低 | 高 |
| 灵活性 | 低 | 高 |

**2. 代码示例对比**

```xml
<!-- resultType 示例 -->
<select id="findById" resultType="User">
    SELECT id, username, email FROM user WHERE id = #{id}
</select>

<!-- resultMap 示例 -->
<resultMap id="userMap" type="User">
    <id property="id" column="user_id"/>
    <result property="username" column="user_name"/>
    <result property="email" column="user_email"/>
</resultMap>

<select id="findById" resultMap="userMap">
    SELECT user_id, user_name, user_email FROM user WHERE user_id = #{id}
</select>
```

**3. 功能支持对比**

```xml
<!-- resultType：不支持关联查询 -->
<select id="findUser" resultType="User">
    SELECT * FROM user WHERE id = #{id}
    <!-- 无法映射关联的 department 对象 -->
</select>

<!-- resultMap：支持关联查询 -->
<resultMap id="userWithDept" type="User">
    <id property="id" column="id"/>
    <result property="username" column="username"/>
    <!-- 一对一关联 -->
    <association property="department" javaType="Department">
        <id property="id" column="dept_id"/>
        <result property="name" column="dept_name"/>
    </association>
</resultMap>

<select id="findUserWithDept" resultMap="userWithDept">
    SELECT u.*, d.id AS dept_id, d.name AS dept_name
    FROM user u
    LEFT JOIN department d ON u.dept_id = d.id
    WHERE u.id = #{id}
</select>
```

**4. 性能对比**

- **resultType**
  - 映射速度快（反射机制简单）
  - 适合高频简单查询
  - 无额外配置开销

- **resultMap**
  - 映射速度稍慢（解析配置）
  - 首次加载时解析配置，后续使用缓存
  - 复杂映射场景下性能优于多次查询

**关键要点**

1. **互斥关系**
   - 一个查询语句只能使用其中一种
   - 不能同时指定 resultType 和 resultMap

2. **选择原则**
   - 能用 resultType 就用 resultType（简单场景）
   - 需要复杂映射时必须用 resultMap

3. **驼峰命名**
   ```xml
   <!-- 开启驼峰命名后，user_name 可以自动映射到 userName -->
   <settings>
       <setting name="mapUnderscoreToCamelCase" value="true"/>
   </settings>
   ```

**记忆口诀**

```
Type 自动 Map 手动
Type 简单 Map 复杂
Type 快速 Map 灵活
简单用 Type 省事，复杂用 Map 强大
```

### 41. 如何自定义 resultMap？

**核心答案**

自定义 resultMap 需要使用 `<resultMap>` 标签，通过以下步骤完成：
1. 使用 `<resultMap>` 定义映射规则（id、type 属性）
2. 使用 `<id>` 映射主键字段
3. 使用 `<result>` 映射普通字段
4. 使用 `<association>` 映射一对一关联
5. 使用 `<collection>` 映射一对多关联
6. 在查询语句中通过 resultMap 属性引用

**详细说明**

**1. 基本结构**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead-41" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker><style>.text-41{font-family:ui-monospace,monospace;font-size:12px;fill:#333}.box-41{fill:#f8f9fa;stroke:#999;stroke-width:1.5}.header-41{fill:#4a90e2;stroke:#357abd;stroke-width:1.5}.arrow-41{stroke:#666;stroke-width:1.5;fill:none;marker-end:url(#arrowhead-41)}.title-41{font-size:14px;font-weight:600;fill:#fff}.label-41{font-size:11px;fill:#666}.code-41{font-family:ui-monospace,monospace;font-size:11px;fill:#e83e8c}</style></defs><rect class="header-41" x="30" y="20" width="740" height="35" rx="3"/><text class="title-41" x="400" y="43" text-anchor="middle">resultMap 结构组成</text><rect class="box-41" x="50" y="80" width="200" height="140" rx="3"/><text class="text-41" x="150" y="100" text-anchor="middle" font-weight="600">&lt;resultMap&gt;</text><text class="label-41" x="70" y="125">id = "唯一标识"</text><text class="label-41" x="70" y="145">type = "Java类型"</text><text class="label-41" x="70" y="165">extends = "继承其他map"</text><text class="label-41" x="70" y="185">autoMapping = "自动映射"</text><rect class="box-41" x="280" y="80" width="200" height="70" rx="3"/><text class="text-41" x="380" y="100" text-anchor="middle" font-weight="600">&lt;id&gt;</text><text class="label-41" x="300" y="120">property = "对象属性"</text><text class="label-41" x="300" y="140">column = "数据库字段"</text><rect class="box-41" x="510" y="80" width="200" height="70" rx="3"/><text class="text-41" x="610" y="100" text-anchor="middle" font-weight="600">&lt;result&gt;</text><text class="label-41" x="530" y="120">property = "对象属性"</text><text class="label-41" x="530" y="140">column = "数据库字段"</text><rect class="box-41" x="280" y="170" width="200" height="70" rx="3"/><text class="text-41" x="380" y="190" text-anchor="middle" font-weight="600">&lt;association&gt;</text><text class="label-41" x="300" y="210">一对一关联</text><text class="label-41" x="300" y="230">javaType = "关联类型"</text><rect class="box-41" x="510" y="170" width="200" height="70" rx="3"/><text class="text-41" x="610" y="190" text-anchor="middle" font-weight="600">&lt;collection&gt;</text><text class="label-41" x="530" y="210">一对多关联</text><text class="label-41" x="530" y="230">ofType = "集合元素类型"</text><path class="arrow-41" d="M 150 220 L 150 260"/><path class="arrow-41" d="M 150 260 L 380 260 L 380 240"/><path class="arrow-41" d="M 150 260 L 610 260 L 610 240"/><text class="label-41" x="160 270" text-anchor="middle">包含</text><rect class="box-41" x="50" y="280" width="700" height="200" rx="3"/><text class="text-41" x="70" y="300" font-weight="600">完整示例：</text><text class="code-41" x="70" y="320">&lt;resultMap id="userResultMap" type="com.example.User"&gt;</text><text class="code-41" x="90" y="340">&lt;!-- 主键映射 --&gt;</text><text class="code-41" x="90" y="355">&lt;id property="id" column="user_id"/&gt;</text><text class="code-41" x="90" y="375">&lt;!-- 普通字段映射 --&gt;</text><text class="code-41" x="90" y="390">&lt;result property="username" column="user_name"/&gt;</text><text class="code-41" x="90" y="405">&lt;result property="email" column="user_email"/&gt;</text><text class="code-41" x="90" y="425">&lt;!-- 一对一关联 --&gt;</text><text class="code-41" x="90" y="440">&lt;association property="department" javaType="Department"&gt;</text><text class="code-41" x="110" y="455">&lt;id property="id" column="dept_id"/&gt;</text><text class="code-41" x="110" y="470">&lt;result property="name" column="dept_name"/&gt;</text><text class="code-41" x="90" y="455">&lt;/association&gt;</text><text class="code-41" x="70" y="470">&lt;/resultMap&gt;</text></svg>

**2. 基础映射示例**

```xml
<!-- 简单字段映射 -->
<resultMap id="userMap" type="com.example.User">
    <!-- id 标签：映射主键，MyBatis 会优化性能 -->
    <id property="id" column="user_id"/>

    <!-- result 标签：映射普通字段 -->
    <result property="username" column="user_name"/>
    <result property="email" column="user_email"/>
    <result property="createTime" column="create_time"/>
</resultMap>

<!-- 使用 resultMap -->
<select id="findById" resultMap="userMap">
    SELECT user_id, user_name, user_email, create_time
    FROM user
    WHERE user_id = #{id}
</select>
```

**3. 类型转换映射**

```xml
<resultMap id="userMap" type="User">
    <id property="id" column="id"/>

    <!-- 使用 javaType 指定 Java 类型 -->
    <result property="age" column="age" javaType="int"/>

    <!-- 使用 jdbcType 指定数据库类型 -->
    <result property="email" column="email" jdbcType="VARCHAR"/>

    <!-- 使用 typeHandler 自定义类型转换 -->
    <result property="phone" column="phone"
            typeHandler="com.example.PhoneTypeHandler"/>
</resultMap>
```

**4. 一对一关联映射**

```xml
<resultMap id="userWithDeptMap" type="User">
    <id property="id" column="id"/>
    <result property="username" column="username"/>

    <!-- association：一对一关联 -->
    <association property="department" javaType="Department">
        <id property="id" column="dept_id"/>
        <result property="name" column="dept_name"/>
        <result property="location" column="dept_location"/>
    </association>
</resultMap>

<select id="findUserWithDept" resultMap="userWithDeptMap">
    SELECT u.id, u.username,
           d.id AS dept_id, d.name AS dept_name, d.location AS dept_location
    FROM user u
    LEFT JOIN department d ON u.dept_id = d.id
    WHERE u.id = #{id}
</select>
```

**5. 一对多关联映射**

```xml
<resultMap id="userWithOrdersMap" type="User">
    <id property="id" column="id"/>
    <result property="username" column="username"/>

    <!-- collection：一对多关联 -->
    <collection property="orders" ofType="Order">
        <id property="id" column="order_id"/>
        <result property="orderNo" column="order_no"/>
        <result property="amount" column="amount"/>
    </collection>
</resultMap>

<select id="findUserWithOrders" resultMap="userWithOrdersMap">
    SELECT u.id, u.username,
           o.id AS order_id, o.order_no, o.amount
    FROM user u
    LEFT JOIN `order` o ON u.id = o.user_id
    WHERE u.id = #{id}
</select>
```

**6. resultMap 继承**

```xml
<!-- 基础 resultMap -->
<resultMap id="baseUserMap" type="User">
    <id property="id" column="id"/>
    <result property="username" column="username"/>
    <result property="email" column="email"/>
</resultMap>

<!-- 继承并扩展 -->
<resultMap id="extendedUserMap" type="User" extends="baseUserMap">
    <!-- 继承 baseUserMap 的所有映射，并添加新的映射 -->
    <result property="phone" column="phone"/>
    <result property="address" column="address"/>
</resultMap>
```

**7. 嵌套 resultMap 引用**

```xml
<!-- 定义可复用的 Department resultMap -->
<resultMap id="departmentMap" type="Department">
    <id property="id" column="dept_id"/>
    <result property="name" column="dept_name"/>
</resultMap>

<!-- 在其他 resultMap 中引用 -->
<resultMap id="userMap" type="User">
    <id property="id" column="id"/>
    <result property="username" column="username"/>

    <!-- 引用已定义的 resultMap -->
    <association property="department" resultMap="departmentMap"/>
</resultMap>
```

**8. 配置属性说明**

| 属性 | 说明 | 示例 |
|-----|------|-----|
| id | resultMap 唯一标识 | id="userMap" |
| type | 映射的 Java 类型 | type="com.example.User" |
| extends | 继承其他 resultMap | extends="baseMap" |
| autoMapping | 是否自动映射 | autoMapping="true" |
| property | Java 对象属性名 | property="username" |
| column | 数据库字段名 | column="user_name" |
| javaType | Java 类型 | javaType="String" |
| jdbcType | JDBC 类型 | jdbcType="VARCHAR" |
| typeHandler | 类型处理器 | typeHandler="..." |

**关键要点**

1. **主键映射必须使用 `<id>` 标签**
   - 提高性能（缓存、嵌套结果去重）
   - 不要用 `<result>` 替代

2. **复用 resultMap**
   - 通过 extends 继承
   - 通过 resultMap 引用
   - 提高代码复用性

3. **自动映射**
   ```xml
   <resultMap id="userMap" type="User" autoMapping="true">
       <!-- 只配置特殊字段，其他字段自动映射 -->
       <id property="id" column="user_id"/>
   </resultMap>
   ```

**记忆口诀**

```
定义 Map 先写 id
主键用 id 普通用 result
一对一用 association
一对多用 collection
继承复用用 extends
```

### 42. 什么是字段映射？

**核心答案**

字段映射（Field Mapping）是指将数据库查询结果中的列（column）映射到 Java 对象的属性（property）的过程。MyBatis 提供了自动映射和手动映射两种方式来完成这个映射过程。

**详细说明**

**映射过程可视化**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead-42" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker><style>.text-42{font-family:ui-monospace,monospace;font-size:12px;fill:#333}.box-42{fill:#f8f9fa;stroke:#999;stroke-width:1.5}.db-42{fill:#e8f4f8;stroke:#4a90e2;stroke-width:1.5}.java-42{fill:#fff7e6;stroke:#ffa940;stroke-width:1.5}.arrow-42{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrowhead-42)}.title-42{font-size:14px;font-weight:600;fill:#333}.label-42{font-size:11px;fill:#666}.mapping-42{fill:#52c41a;stroke:#389e0d;stroke-width:1.5}</style></defs><text class="title-42" x="400" y="30" text-anchor="middle">字段映射流程</text><rect class="db-42" x="50" y="60" width="220" height="200" rx="3"/><text class="text-42" x="160" y="85" text-anchor="middle" font-weight="600">数据库结果集</text><rect class="box-42" x="70" y="100" width="180" height="140" rx="2"/><text class="text-42" x="80" y="120" font-size="11" font-weight="600">SELECT 结果：</text><text class="text-42" x="90" y="145" font-size="10">user_id: 1</text><text class="text-42" x="90" y="165" font-size="10">user_name: "张三"</text><text class="text-42" x="90" y="185" font-size="10">user_email: "zhang@example.com"</text><text class="text-42" x="90" y="205" font-size="10">create_time: "2024-01-01"</text><text class="text-42" x="90" y="225" font-size="10">dept_id: 100</text><rect class="java-42" x="530" y="60" width="220" height="200" rx="3"/><text class="text-42" x="640" y="85" text-anchor="middle" font-weight="600">Java 对象</text><rect class="box-42" x="550" y="100" width="180" height="140" rx="2"/><text class="text-42" x="560" y="120" font-size="11" font-weight="600">User 对象：</text><text class="text-42" x="570" y="145" font-size="10">id = 1</text><text class="text-42" x="570" y="165" font-size="10">username = "张三"</text><text class="text-42" x="570" y="185" font-size="10">email = "zhang@example.com"</text><text class="text-42" x="570" y="205" font-size="10">createTime = Date</text><text class="text-42" x="570" y="225" font-size="10">deptId = 100</text><rect class="mapping-42" x="310" y="120" width="180" height="100" rx="3"/><text class="text-42" x="400" y="140" text-anchor="middle" font-weight="600">字段映射</text><text class="label-42" x="330" y="165" font-size="10">user_id → id</text><text class="label-42" x="330" y="185" font-size="10">user_name → username</text><text class="label-42" x="330" y="205" font-size="10">create_time → createTime</text><path class="arrow-42" d="M 270 160 L 310 160"/><path class="arrow-42" d="M 490 160 L 530 160"/><rect x="30" y="290" width="740" height="110" fill="#fff" stroke="#999" stroke-width="1.5" rx="3"/><text class="text-42" x="50" y="315" font-weight="600">映射方式对比</text><rect class="box-42" x="50" y="325" width="340" height="65" rx="2"/><text class="text-42" x="70" y="345" font-weight="600">1. 自动映射（resultType）</text><text class="label-42" x="80" y="365">• 字段名与属性名完全一致</text><text class="label-42" x="80" y="380">• 开启驼峰转换后支持下划线命名</text><rect class="box-42" x="410" y="325" width="340" height="65" rx="2"/><text class="text-42" x="430" y="345" font-weight="600">2. 手动映射（resultMap）</text><text class="label-42" x="440" y="365">• 显式指定映射关系</text><text class="label-42" x="440" y="380">• 支持复杂类型转换和关联</text></svg>

**1. 自动字段映射**

MyBatis 会自动将数据库列名与 Java 属性名进行匹配：

```java
// Java 类
public class User {
    private Integer id;        // 对应数据库字段 id
    private String username;   // 对应数据库字段 username
    private String email;      // 对应数据库字段 email
}
```

```xml
<!-- 自动映射 -->
<select id="findById" resultType="User">
    SELECT id, username, email FROM user WHERE id = #{id}
</select>
```

**2. 手动字段映射**

通过 resultMap 显式指定映射关系：

```xml
<resultMap id="userMap" type="User">
    <!-- column: 数据库字段名 -->
    <!-- property: Java 对象属性名 -->
    <id property="id" column="user_id"/>
    <result property="username" column="user_name"/>
    <result property="email" column="user_email"/>
</resultMap>

<select id="findById" resultMap="userMap">
    SELECT user_id, user_name, user_email FROM user WHERE user_id = #{id}
</select>
```

**3. 驼峰命名映射**

开启驼峰命名后，数据库下划线命名会自动转换为驼峰命名：

```xml
<!-- mybatis-config.xml -->
<settings>
    <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>
```

映射关系：
- `user_id` → `userId`
- `user_name` → `userName`
- `create_time` → `createTime`
- `is_deleted` → `isDeleted`

**4. 类型转换映射**

MyBatis 自动处理常见的类型转换：

| 数据库类型 | Java 类型 | 说明 |
|----------|----------|------|
| INT/BIGINT | Integer/Long | 数值类型 |
| VARCHAR/CHAR | String | 字符串类型 |
| TIMESTAMP/DATETIME | Date/LocalDateTime | 日期时间类型 |
| DECIMAL | BigDecimal | 精确小数 |
| TINYINT(1) | Boolean | 布尔类型 |

**5. 映射配置选项**

```xml
<resultMap id="userMap" type="User">
    <!-- jdbcType: 指定 JDBC 类型 -->
    <result property="email" column="email" jdbcType="VARCHAR"/>

    <!-- javaType: 指定 Java 类型 -->
    <result property="age" column="age" javaType="java.lang.Integer"/>

    <!-- typeHandler: 自定义类型处理器 -->
    <result property="phone" column="phone"
            typeHandler="com.example.PhoneTypeHandler"/>
</resultMap>
```

**6. 字段映射规则**

**匹配优先级**：
1. resultMap 显式配置（最高优先级）
2. 驼峰命名自动转换
3. 完全相同的名称匹配
4. typeAlias 别名匹配

**映射示例**：

```xml
<!-- 场景 1：字段名完全一致 -->
<select id="find1" resultType="User">
    SELECT id, username, email FROM user
    <!-- id → id, username → username, email → email -->
</select>

<!-- 场景 2：使用别名实现映射 -->
<select id="find2" resultType="User">
    SELECT user_id AS id, user_name AS username FROM user
    <!-- user_id → id, user_name → username -->
</select>

<!-- 场景 3：开启驼峰转换 -->
<select id="find3" resultType="User">
    SELECT user_id, user_name FROM user
    <!-- user_id → userId, user_name → userName -->
</select>

<!-- 场景 4：使用 resultMap -->
<select id="find4" resultMap="userMap">
    SELECT user_id, user_name FROM user
    <!-- 按 resultMap 配置映射 -->
</select>
```

**关键要点**

1. **映射方式选择**
   - 字段名一致：使用自动映射（resultType）
   - 字段名不一致：使用手动映射（resultMap）或 SQL 别名
   - 复杂对象：必须使用 resultMap

2. **性能考虑**
   - 自动映射性能略优于手动映射
   - 但差异很小，可以忽略
   - 优先考虑代码可维护性

3. **驼峰命名转换**
   - 建议开启（mapUnderscoreToCamelCase=true）
   - 遵循 Java 命名规范
   - 减少手动映射配置

**记忆口诀**

```
字段映射分两种
自动手动看场景
名称一致用自动
名称不同用手动
驼峰转换很方便
下划线自动变驼峰
```

### 43. 如何处理字段名和属性名不一致的情况？

**核心答案**

MyBatis 提供了 4 种方式处理字段名和属性名不一致的情况：
1. **SQL 别名（AS）**：在 SQL 中使用 AS 关键字为字段取别名
2. **驼峰命名转换**：开启 mapUnderscoreToCamelCase 配置
3. **resultMap 手动映射**：显式配置字段与属性的映射关系
4. **全局别名映射**：使用 SQL 片段复用别名配置

**详细说明**

**解决方案对比图**

<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
<defs><style>.text-43{font-family:ui-monospace,monospace;font-size:12px;fill:#333}.box-43{fill:#f8f9fa;stroke:#999;stroke-width:1.5}.header-43{fill:#4a90e2;stroke:#357abd;stroke-width:1.5}.title-43{font-size:14px;font-weight:600;fill:#fff}.label-43{font-size:11px;fill:#666}.problem-43{fill:#fff1f0;stroke:#ff4d4f;stroke-width:1.5}.solution-43{fill:#f6ffed;stroke:#52c41a;stroke-width:1.5}</style></defs><rect class="header-43" x="30" y="20" width="740" height="35" rx="3"/><text class="title-43" x="400" y="43" text-anchor="middle">处理字段名与属性名不一致的四种方法</text><rect class="problem-43" x="50" y="80" width="700" height="60" rx="3"/><text class="text-43" x="70" y="100" font-weight="600">❌ 问题场景</text><text class="label-43" x="70" y="120">数据库字段：user_id, user_name, user_email, create_time</text><text class="label-43" x="70" y="135">Java 属性：   id, username, email, createTime</text><rect class="solution-43" x="50" y="160" width="330" height="160" rx="3"/><text class="text-43" x="70" y="180" font-weight="600">方法 1：SQL 别名（AS）</text><text class="label-43" x="70" y="200">优点：简单直接，无需额外配置</text><text class="label-43" x="70" y="215">缺点：每个 SQL 都要写别名</text><text class="label-43" x="70" y="240" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">SELECT user_id AS id,</text><text class="label-43" x="88" y="255" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">user_name AS username,</text><text class="label-43" x="88" y="270" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">user_email AS email,</text><text class="label-43" x="88" y="285" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">create_time AS createTime</text><text class="label-43" x="70" y="300" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">FROM user</text><rect class="solution-43" x="420" y="160" width="330" height="160" rx="3"/><text class="text-43" x="440" y="180" font-weight="600">方法 2：驼峰命名转换</text><text class="label-43" x="440" y="200">优点：零配置，全局生效</text><text class="label-43" x="440" y="215">缺点：仅支持下划线→驼峰</text><text class="label-43" x="440" y="240" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">&lt;settings&gt;</text><text class="label-43" x="458" y="255" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">&lt;setting name=</text><text class="label-43" x="476" y="270" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">"mapUnderscoreToCamelCase"</text><text class="label-43" x="476" y="285" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">value="true"/&gt;</text><text class="label-43" x="440" y="300" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">&lt;/settings&gt;</text><rect class="solution-43" x="50" y="340" width="330" height="160" rx="3"/><text class="text-43" x="70" y="360" font-weight="600">方法 3：resultMap 映射</text><text class="label-43" x="70" y="380">优点：灵活强大，支持复杂映射</text><text class="label-43" x="70" y="395">缺点：配置繁琐</text><text class="label-43" x="70" y="420" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">&lt;resultMap id="userMap" type="User"&gt;</text><text class="label-43" x="88" y="435" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">&lt;id property="id"</text><text class="label-43" x="106" y="450" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">column="user_id"/&gt;</text><text class="label-43" x="88" y="465" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">&lt;result property="username"</text><text class="label-43" x="106" y="480" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">column="user_name"/&gt;</text><text class="label-43" x="70" y="495" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">&lt;/resultMap&gt;</text><rect class="solution-43" x="420" y="340" width="330" height="160" rx="3"/><text class="text-43" x="440" y="360" font-weight="600">方法 4：SQL 片段复用</text><text class="label-43" x="440" y="380">优点：复用别名配置</text><text class="label-43" x="440" y="395">缺点：需要维护 SQL 片段</text><text class="label-43" x="440" y="420" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">&lt;sql id="userColumns"&gt;</text><text class="label-43" x="458" y="435" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">user_id AS id,</text><text class="label-43" x="458" y="450" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">user_name AS username</text><text class="label-43" x="440" y="465" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">&lt;/sql&gt;</text><text class="label-43" x="440" y="485" font-family="ui-monospace,monospace" font-size="10" fill="#e83e8c">&lt;include refid="userColumns"/&gt;</text></svg>

**方法 1：SQL 别名（推荐用于简单场景）**

```xml
<select id="findById" resultType="User">
    SELECT
        user_id AS id,
        user_name AS username,
        user_email AS email,
        create_time AS createTime
    FROM user
    WHERE user_id = #{id}
</select>
```

**优点**：
- 简单直接，易于理解
- 无需额外配置
- 适合少量查询

**缺点**：
- 每个 SQL 都要写别名
- 代码重复
- 维护成本高

---

**方法 2：驼峰命名转换（推荐，最常用）**

```xml
<!-- mybatis-config.xml 全局配置 -->
<configuration>
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
</configuration>
```

```xml
<!-- Mapper.xml -->
<select id="findById" resultType="User">
    SELECT user_id, user_name, user_email, create_time
    FROM user
    WHERE user_id = #{id}
    <!-- 自动映射：user_id → userId, user_name → userName -->
</select>
```

**自动转换规则**：
- `user_id` → `userId`
- `user_name` → `userName`
- `create_time` → `createTime`
- `is_deleted` → `isDeleted`

**优点**：
- 一次配置，全局生效
- 符合 Java 命名规范
- 零代码侵入

**缺点**：
- 仅支持下划线转驼峰
- 不支持其他命名规则

---

**方法 3：resultMap 手动映射（用于复杂场景）**

```xml
<resultMap id="userResultMap" type="com.example.User">
    <!-- 主键映射 -->
    <id property="id" column="user_id"/>

    <!-- 普通字段映射 -->
    <result property="username" column="user_name"/>
    <result property="email" column="user_email"/>
    <result property="createTime" column="create_time"/>
    <result property="updateTime" column="update_time"/>
</resultMap>

<select id="findById" resultMap="userResultMap">
    SELECT user_id, user_name, user_email, create_time, update_time
    FROM user
    WHERE user_id = #{id}
</select>
```

**优点**：
- 完全可控，灵活强大
- 支持复杂映射关系
- 支持类型转换

**缺点**：
- 配置繁琐
- 代码量大
- 维护成本高

---

**方法 4：SQL 片段复用（用于多处复用）**

```xml
<!-- 定义可复用的 SQL 片段 -->
<sql id="userColumns">
    user_id AS id,
    user_name AS username,
    user_email AS email,
    create_time AS createTime,
    update_time AS updateTime
</sql>

<!-- 在多个查询中复用 -->
<select id="findById" resultType="User">
    SELECT <include refid="userColumns"/>
    FROM user
    WHERE user_id = #{id}
</select>

<select id="findAll" resultType="User">
    SELECT <include refid="userColumns"/>
    FROM user
</select>

<select id="findByName" resultType="User">
    SELECT <include refid="userColumns"/>
    FROM user
    WHERE user_name = #{name}
</select>
```

**优点**：
- 复用别名配置
- 统一维护
- 减少重复代码

**缺点**：
- 需要维护 SQL 片段
- 增加了一层间接性

---

**组合使用示例**

实际开发中常组合使用多种方法：

```xml
<!-- 1. 开启驼峰转换（处理常规字段） -->
<settings>
    <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>

<!-- 2. 使用 resultMap（处理特殊字段） -->
<resultMap id="userMap" type="User" autoMapping="true">
    <!-- autoMapping="true" 自动映射驼峰字段 -->

    <!-- 只配置特殊字段 -->
    <id property="id" column="user_id"/>

    <!-- 需要类型转换的字段 -->
    <result property="status" column="status"
            typeHandler="com.example.StatusTypeHandler"/>

    <!-- 关联对象 -->
    <association property="department" javaType="Department">
        <id property="id" column="dept_id"/>
        <result property="name" column="dept_name"/>
    </association>
</resultMap>

<select id="findById" resultMap="userMap">
    SELECT u.user_id, u.user_name, u.status,
           d.id AS dept_id, d.name AS dept_name
    FROM user u
    LEFT JOIN department d ON u.dept_id = d.id
    WHERE u.user_id = #{id}
</select>
```

**选择建议**

| 场景 | 推荐方法 | 理由 |
|-----|---------|------|
| 下划线命名 | 驼峰转换 | 最简单，全局生效 |
| 少量查询 | SQL 别名 | 简单直接 |
| 复杂映射 | resultMap | 灵活可控 |
| 多处复用 | SQL 片段 | 统一维护 |
| 特殊字段 | 组合使用 | 兼顾效率和灵活性 |

**关键要点**

1. **优先级顺序**
   - resultMap 显式配置（最高优先级）
   - SQL 别名
   - 驼峰转换
   - 完全相同的名称匹配

2. **最佳实践**
   - 新项目：开启驼峰转换 + 特殊场景用 resultMap
   - 老项目：根据实际情况选择合适方案
   - 团队协作：统一命名规范

**记忆口诀**

```
字段属性不一致
四种方法来处理
简单用别名
全局开驼峰
复杂用 Map
复用用片段
推荐驼峰转换，最省事
```



**8�TH**

MyBatis Л$͹�� � sT��:
1. **LWӜ ** - ( JOIN ��, !'��@	pn
2. **LW��** - (P��,e��sTpn

$͹�� `<association>` ~Mn

**���**

1. **�:o:�**

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}.header{font:bold 16px sans-serif;}</style></defs>
<rect x="80" y="50" width="200" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="180" y="80" text-anchor="middle" class="header" fill="#1976d2">User ((7)</text>
<text x="100" y="120" class="label" fill="#666">id: 1</text>
<text x="100" y="150" class="label" fill="#666">name: " 	"</text>
<text x="100" y="180" class="label" fill="#666">email: "zhang@xx.com"</text>
<text x="100" y="210" class="label" fill="#666">idCardId: 100</text>
<rect x="420" y="50" width="200" height="200" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="520" y="80" text-anchor="middle" class="header" fill="#2e7d32">IdCard (���)</text>
<text x="440" y="120" class="label" fill="#666">id: 100</text>
<text x="440" y="150" class="label" fill="#666">number: "110..."</text>
<text x="440" y="180" class="label" fill="#666">address: "�"</text>
<text x="440" y="210" class="label" fill="#666">userId: 1</text>
<path d="M 280 150 L 420 150" stroke="#f57c00" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
<text x="350" y="140" text-anchor="middle" class="label" fill="#f57c00" font-weight="bold">1 : 1</text>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker></defs>
</svg>

```java
// �S{
public class User {
    private Long id;
    private String name;
    private String email;
    private IdCard idCard;  //  � sT
}

public class IdCard {
    private Long id;
    private String number;
    private String address;
}
```

2. **� : LWӜ  (�P)**

( JOIN ��,� resultMap  LW�a

```xml
<!-- �I resultMap -->
<resultMap id="userWithIdCardMap" type="User">
    <!-- (7W� -->
    <id property="id" column="user_id"/>
    <result property="name" column="user_name"/>
    <result property="email" column="email"/>

    <!--  � sT:association -->
    <association property="idCard" javaType="IdCard">
        <id property="id" column="card_id"/>
        <result property="number" column="card_number"/>
        <result property="address" column="card_address"/>
    </association>
</resultMap>

<!-- ���� -->
<select id="findUserById" resultMap="userWithIdCardMap">
    SELECT
        u.id AS user_id,
        u.name AS user_name,
        u.email,
        c.id AS card_id,
        c.number AS card_number,
        c.address AS card_address
    FROM user u
    LEFT JOIN id_card c ON u.id = c.user_id
    WHERE u.id = #{id}
</select>
```

**gLA**:

<svg viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:13px sans-serif;}.num{font:bold 16px sans-serif;}</style></defs>
<rect x="50" y="30" width="650" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="70" y="55" class="num" fill="#1976d2">1</text>
<text x="110" y="55" class="label" font-weight="bold">gL JOIN ��</text>
<text x="110" y="75" class="label" fill="#666" font-size="11"> ! SQL ��(7����@	pn</text>
<rect x="50" y="110" width="650" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="70" y="135" class="num" fill="#2e7d32">2</text>
<text x="110" y="135" class="label" font-weight="bold">�Ӝ�</text>
<text x="110" y="155" class="label" fill="#666" font-size="11">9n resultMap Mn �*W�</text>
<rect x="50" y="190" width="650" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="70" y="215" class="num" fill="#e65100">3</text>
<text x="110" y="215" class="label" font-weight="bold">���a</text>
<text x="110" y="235" class="label" fill="#666" font-size="11">� User �a,��v�n IdCard �a</text>
</svg>

**�**:
- �gL ! SQL,'��
- M N+1 ���
- pn �'}

**:�**:
- SQL 
B, �� JOIN
- resultMap Mn�

3. **��: LW��**

($*�˄��,� select ^'sT

```xml
<!-- �I resultMap -->
<resultMap id="userWithIdCardMap2" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="email" column="email"/>

    <!--  � sT:LW�� -->
    <association property="idCard"
                 javaType="IdCard"
                 column="id"
                 select="findIdCardByUserId"/>
</resultMap>

<!-- ;�� -->
<select id="findUserById2" resultMap="userWithIdCardMap2">
    SELECT id, name, email FROM user WHERE id = #{id}
</select>

<!-- P�� -->
<select id="findIdCardByUserId" resultType="IdCard">
    SELECT id, number, address
    FROM id_card
    WHERE user_id = #{userId}
</select>
```

**gLA**:

<svg viewBox="0 0 750 360" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:13px sans-serif;}.num{font:bold 16px sans-serif;}</style></defs>
<rect x="50" y="30" width="650" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="70" y="55" class="num" fill="#1976d2">1</text>
<text x="110" y="55" class="label" font-weight="bold">gL;��</text>
<text x="110" y="75" class="label" fill="#666" font-size="11">SELECT id, name, email FROM user WHERE id = 1</text>
<rect x="50" y="110" width="650" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="70" y="135" class="num" fill="#2e7d32">2</text>
<text x="110" y="135" class="label" font-weight="bold">��(7pn</text>
<text x="110" y="155" class="label" fill="#666" font-size="11">�0 user.id = 1</text>
<rect x="50" y="190" width="650" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="70" y="215" class="num" fill="#e65100">3</text>
<text x="110" y="215" class="label" font-weight="bold">gLP��</text>
<text x="110" y="235" class="label" fill="#666" font-size="11">SELECT id, number, address FROM id_card WHERE user_id = 1</text>
<rect x="50" y="270" width="650" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="70" y="295" class="num" fill="#7b1fa2">4</text>
<text x="110" y="295" class="label" font-weight="bold">��Ӝ</text>
<text x="110" y="315" class="label" fill="#666" font-size="11"> IdCard �a�n0 User.idCard ^'</text>
</svg>

**�**:
- SQL �U,���
- �
(P��
- /�ߠ}

**:�**:
- gL$! SQL,'���
- ��� N+1 ���

4. **$͹��**

| y' | LWӜ  | LW�� |
|------|------------|---------|
| **SQL p�** | 1 ! | 2 ! |
| **'�** | � | N |
| **SQL 
B�** | � (JOIN) | N (�U��) |
| **Mn
B�** | - (resultMap) | N |
| **�ߠ}** | 
/ | / |
| **N+1 �** | � | 	�i |
| **�P:o** | ��� |  ���� |

5. **�ߠ}Mn**

LW��/�ߠ},�(��sT�a�MgLP��

```xml
<!-- h@Mn -->
<settings>
    <setting name="lazyLoadingEnabled" value="true"/>
    <setting name="aggressiveLazyLoading" value="false"/>
</settings>

<!-- @�Mn -->
<association property="idCard"
             javaType="IdCard"
             column="id"
             select="findIdCardByUserId"
             fetchType="lazy"/>  <!-- lazy: �ߠ}  eager: �s�} -->
```

6. **�E�(��**

<svg viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px sans-serif;}</style></defs>
<rect x="50" y="30" width="600" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="80" y="55" class="label" font-weight="bold" fill="#2e7d32"> �P: LWӜ  (JOIN)</text>
<text x="100" y="80" class="label" fill="#666" font-size="12">" '� , !��</text>
<text x="100" y="100" class="label" fill="#666" font-size="12">" (�����ؑ��</text>
<rect x="50" y="130" width="600" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="80" y="155" class="label" font-weight="bold" fill="#1976d2">� �	: LW�� + �ߠ}</text>
<text x="100" y="180" class="label" fill="#666" font-size="12">" (�sTpn
;/ ��:o</text>
<text x="100" y="200" class="label" fill="#666" font-size="12">" M�}
Ł�pn</text>
</svg>

**s.��**

1. **association ~**: �(� � �� sT
2. **LWӜ **: '�,�P(
3. **LW��**: u;'�,/�ߠ}
4. **N+1 �**: LW�� �,��(�ߠ}
5. **+
**: JOIN ���{(+
M
��

**����**

```
 � sT	$�,
LWӜ'��
JOIN �� !},
resultMap Mn�
LW��u;�,
egL$!�
�ߠ}D�,
	 �} �`
```
