## 参数映射

### 33. MyBatis 如何传递参数？

**核心答案**

MyBatis 提供了 5 种参数传递方式：单个参数、多个参数、@Param 注解、JavaBean 对象、Map 集合。不同方式在 XML 中的取值方式不同。

**详细说明**

1. **五种参数传递方式对比**

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:13px Arial;fill:#333}.method{font:13px Arial;fill:#0066cc;font-weight:bold}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.code{font:11px monospace;fill:#333}.title{font:16px Arial;font-weight:bold;fill:#333}.highlight{fill:#fff4e6;stroke:#ffa500;stroke-width:1.5}</style></defs>
<text x="450" y="25" class="title" text-anchor="middle">MyBatis 五种参数传递方式</text>
<rect x="20" y="50" width="170" height="110" class="box" rx="5"/>
<text x="105" y="75" class="method" text-anchor="middle">1. 单个参数</text>
<text x="105" y="95" class="code" text-anchor="middle">User find(Long id)</text>
<text x="105" y="115" class="label" text-anchor="middle">XML 取值:</text>
<text x="105" y="135" class="code" text-anchor="middle">#{id}</text>
<text x="105" y="150" class="code" text-anchor="middle">#{任意名}</text>
<rect x="210" y="50" width="170" height="110" class="box" rx="5"/>
<text x="295" y="75" class="method" text-anchor="middle">2. 多个参数</text>
<text x="295" y="95" class="code" text-anchor="middle" font-size="10">find(String name,</text>
<text x="295" y="108" class="code" text-anchor="middle" font-size="10">     Integer age)</text>
<text x="295" y="125" class="label" text-anchor="middle">XML 取值:</text>
<text x="295" y="145" class="code" text-anchor="middle">#{arg0} #{arg1}</text>
<rect x="400" y="50" width="170" height="110" class="box" rx="5"/>
<text x="485" y="75" class="method" text-anchor="middle">3. @Param</text>
<text x="485" y="95" class="code" text-anchor="middle" font-size="10">find(@Param("n")</text>
<text x="485" y="108" class="code" text-anchor="middle" font-size="10">     String name)</text>
<text x="485" y="125" class="label" text-anchor="middle">XML 取值:</text>
<text x="485" y="145" class="code" text-anchor="middle">#{n}</text>
<rect x="590" y="50" width="140" height="110" class="box" rx="5"/>
<text x="660" y="75" class="method" text-anchor="middle">4. 对象</text>
<text x="660" y="95" class="code" text-anchor="middle">insert(User u)</text>
<text x="660" y="115" class="label" text-anchor="middle">XML 取值:</text>
<text x="660" y="135" class="code" text-anchor="middle">#{id}</text>
<text x="660" y="150" class="code" text-anchor="middle">#{username}</text>
<rect x="750" y="50" width="130" height="110" class="box" rx="5"/>
<text x="815" y="75" class="method" text-anchor="middle">5. Map</text>
<text x="815" y="95" class="code" text-anchor="middle" font-size="10">find(Map m)</text>
<text x="815" y="115" class="label" text-anchor="middle">XML 取值:</text>
<text x="815" y="135" class="code" text-anchor="middle">#{key}</text>
<rect x="20" y="180" width="860" height="130" class="highlight" rx="5"/>
<text x="450" y="205" class="label" text-anchor="middle" font-weight="bold">参数传递原理</text>
<text x="450" y="230" class="label" text-anchor="middle">MyBatis 将参数封装为 Map</text>
<text x="450" y="255" class="code" text-anchor="middle">单参数: {arg0=值, param1=值}</text>
<text x="450" y="275" class="code" text-anchor="middle">多参数: {arg0=值1, arg1=值2, param1=值1, param2=值2}</text>
<text x="450" y="295" class="code" text-anchor="middle">@Param: {指定名=值, param1=值}</text>
<rect x="20" y="330" width="280" height="150" class="box" rx="5"/>
<text x="160" y="355" class="label" text-anchor="middle" font-weight="bold">推荐做法 ✅</text>
<text x="160" y="380" class="label" text-anchor="middle">• 单参数: 直接传递</text>
<text x="160" y="400" class="label" text-anchor="middle">• 多参数: 使用 @Param</text>
<text x="160" y="420" class="label" text-anchor="middle">• 复杂对象: JavaBean</text>
<text x="160" y="440" class="label" text-anchor="middle">• 动态条件: Map</text>
<text x="160" y="460" class="label" text-anchor="middle">• 集合: List/Array</text>
<rect x="320" y="330" width="280" height="150" class="box" rx="5"/>
<text x="460" y="355" class="label" text-anchor="middle" font-weight="bold">不推荐做法 ❌</text>
<text x="460" y="380" class="label" text-anchor="middle">• 多参数不用 @Param</text>
<text x="460" y="400" class="label" text-anchor="middle">  (arg0, arg1 不直观)</text>
<text x="460" y="420" class="label" text-anchor="middle">• 大量 Map 传参</text>
<text x="460" y="440" class="label" text-anchor="middle">  (类型不安全)</text>
<text x="460" y="460" class="label" text-anchor="middle">• 参数超过 5 个</text>
<rect x="620" y="330" width="260" height="150" class="box" rx="5"/>
<text x="750" y="355" class="label" text-anchor="middle" font-weight="bold">特殊类型</text>
<text x="750" y="380" class="label" text-anchor="middle">• List: collection</text>
<text x="750" y="400" class="label" text-anchor="middle">• Array: array</text>
<text x="750" y="420" class="label" text-anchor="middle">• Collection: collection</text>
<text x="750" y="440" class="label" text-anchor="middle">• @Param 覆盖默认</text>
</svg>

2. **方式一：单个参数**

```java
// Mapper 接口
User findById(Long id);
String findUsername(Long userId);
List<User> findByAge(Integer age);
```

```xml
<!-- XML 映射 -->
<select id="findById" resultType="User">
  <!-- 单个参数可以用任意名称 -->
  SELECT * FROM user WHERE id = #{id}
  <!-- 或 #{userId}、#{value}、#{abc} 都可以 -->
</select>

<select id="findUsername" resultType="string">
  SELECT username FROM user WHERE id = #{anyName}
</select>
```

3. **方式二：多个参数（不推荐）**

```java
// Mapper 接口
List<User> findByNameAndAge(String username, Integer age);
```

```xml
<!-- XML 映射：使用 arg0, arg1 -->
<select id="findByNameAndAge" resultType="User">
  SELECT * FROM user
  WHERE username = #{arg0}
    AND age = #{arg1}
</select>

<!-- 或使用 param1, param2 -->
<select id="findByNameAndAge" resultType="User">
  SELECT * FROM user
  WHERE username = #{param1}
    AND age = #{param2}
</select>
```

4. **方式三：@Param 注解（推荐）**

```java
// Mapper 接口
List<User> findByNameAndAge(
  @Param("username") String username,
  @Param("age") Integer age
);

// 分页查询
List<User> findByPage(
  @Param("offset") Integer offset,
  @Param("size") Integer size
);
```

```xml
<!-- XML 映射：使用指定的参数名 -->
<select id="findByNameAndAge" resultType="User">
  SELECT * FROM user
  WHERE username = #{username}
    AND age = #{age}
</select>

<select id="findByPage" resultType="User">
  SELECT * FROM user
  LIMIT #{offset}, #{size}
</select>
```

5. **方式四：JavaBean 对象**

```java
// Mapper 接口
int insert(User user);
int update(User user);

// 查询对象
List<User> search(UserQuery query);
```

```xml
<!-- XML 映射：使用对象属性名 -->
<insert id="insert">
  INSERT INTO user (username, email, age)
  VALUES (#{username}, #{email}, #{age})
</insert>

<update id="update">
  UPDATE user
  SET username = #{username},
      email = #{email},
      age = #{age}
  WHERE id = #{id}
</update>

<!-- 复杂查询对象 -->
<select id="search" resultType="User">
  SELECT * FROM user
  <where>
    <if test="username != null">
      AND username LIKE CONCAT('%', #{username}, '%')
    </if>
    <if test="minAge != null">
      AND age &gt;= #{minAge}
    </if>
    <if test="maxAge != null">
      AND age &lt;= #{maxAge}
    </if>
  </where>
</select>
```

6. **方式五：Map 集合**

```java
// Mapper 接口
List<User> searchByMap(Map<String, Object> params);
int updateByMap(Map<String, Object> params);
```

```xml
<!-- XML 映射：使用 Map 的 key -->
<select id="searchByMap" resultType="User">
  SELECT * FROM user
  <where>
    <if test="username != null">
      AND username = #{username}
    </if>
    <if test="status != null">
      AND status = #{status}
    </if>
  </where>
</select>

<update id="updateByMap">
  UPDATE user
  SET username = #{username},
      email = #{email}
  WHERE id = #{id}
</update>
```

7. **混合使用**

```java
// 对象 + 额外参数
List<User> search(
  @Param("query") UserQuery query,
  @Param("orderBy") String orderBy
);

// 多个对象
int transfer(
  @Param("from") Account from,
  @Param("to") Account to,
  @Param("amount") BigDecimal amount
);
```

```xml
<!-- 对象属性需要加前缀 -->
<select id="search" resultType="User">
  SELECT * FROM user
  WHERE username = #{query.username}
    AND age = #{query.age}
  ORDER BY ${orderBy}
</select>

<update id="transfer">
  UPDATE account SET balance = balance - #{amount}
  WHERE id = #{from.id};

  UPDATE account SET balance = balance + #{amount}
  WHERE id = #{to.id};
</update>
```

8. **参数封装原理**

```java
// MyBatis 内部处理过程
// 1. 单个参数
findById(1L)
→ {arg0=1, param1=1}

// 2. 多个参数（无 @Param）
findByNameAndAge("john", 25)
→ {arg0="john", arg1=25, param1="john", param2=25}

// 3. 使用 @Param
findByNameAndAge(@Param("name") "john", @Param("age") 25)
→ {name="john", age=25, param1="john", param2=25}

// 4. JavaBean
User user = new User();
user.setId(1L);
user.setUsername("john");
→ 直接访问对象属性 user.getId(), user.getUsername()

// 5. Map
Map<String, Object> map = new HashMap<>();
map.put("username", "john");
map.put("age", 25);
→ 直接使用 Map 的 get("username"), get("age")
```

**关键要点**

1. **单个参数**: 最简单，XML 中可用任意名称
2. **多个参数**: 必须用 @Param 注解，否则用 arg0/param1
3. **对象参数**: 通过属性名访问，支持嵌套对象
4. **Map 参数**: 灵活但类型不安全，适合动态条件
5. **@Param 注解**: 多参数场景的最佳实践

**记忆口诀**

📦 **参数传递五方式**
- 单参数随便取
- 多参数用 @Param
- 对象取属性名
- Map 取键值对
- 集合用默认名(list/array)

### 34. 什么是 @Param 注解？

**核心答案**

`@Param` 是 MyBatis 提供的参数注解，用于在 Mapper 接口方法中为参数指定名称，使 XML 映射文件能够通过指定的名称引用参数，提高代码可读性和维护性。

**详细说明**

1. **基本使用**

```java
// Mapper 接口
public interface UserMapper {
    // 使用 @Param 注解
    User findByUsernameAndAge(
        @Param("username") String username,
        @Param("age") Integer age
    );
}
```

```xml
<!-- XML 映射文件 -->
<select id="findByUsernameAndAge" resultType="User">
  SELECT * FROM user
  WHERE username = #{username}  <!-- 使用 @Param 指定的名称 -->
    AND age = #{age}
</select>
```

2. **使用场景对比**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px Arial;fill:#333}.code{font:12px monospace;fill:#0066cc}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.bad{fill:#ffe6e6;stroke:#ff4444;stroke-width:2}.good{fill:#e6ffe6;stroke:#44ff44;stroke-width:2}.title{font:16px Arial;font-weight:bold;fill:#333}</style></defs>
<text x="400" y="25" class="title" text-anchor="middle">@Param 使用场景对比</text>
<rect x="50" y="50" width="330" height="150" class="bad" rx="5"/>
<text x="215" y="75" class="label" text-anchor="middle" font-weight="bold">❌ 不使用 @Param</text>
<text x="215" y="105" class="code" text-anchor="middle">List&lt;User&gt; find(String name,</text>
<text x="215" y="125" class="code" text-anchor="middle">              Integer age);</text>
<text x="215" y="155" class="label" text-anchor="middle" font-weight="bold">XML 中需要使用</text>
<text x="215" y="175" class="code" text-anchor="middle">#{arg0}, #{arg1}</text>
<text x="215" y="190" class="label" text-anchor="middle" font-size="12">或</text>
<text x="215" y="210" class="code" text-anchor="middle">#{param1}, #{param2}</text>
<rect x="420" y="50" width="330" height="150" class="good" rx="5"/>
<text x="585" y="75" class="label" text-anchor="middle" font-weight="bold">✅ 使用 @Param</text>
<text x="585" y="105" class="code" text-anchor="middle">find(@Param("name") String n,</text>
<text x="585" y="125" class="code" text-anchor="middle">     @Param("age") Integer a)</text>
<text x="585" y="155" class="label" text-anchor="middle" font-weight="bold">XML 中使用</text>
<text x="585" y="175" class="code" text-anchor="middle">#{name}, #{age}</text>
<text x="585" y="195" class="label" text-anchor="middle" font-size="12">清晰直观，易于维护</text>
<rect x="50" y="220" width="700" height="160" class="box" rx="5"/>
<text x="400" y="245" class="title" text-anchor="middle">参数封装机制</text>
<text x="400" y="275" class="label" text-anchor="middle" font-weight="bold">不使用 @Param 时:</text>
<text x="400" y="295" class="code" text-anchor="middle">{arg0=值1, arg1=值2, param1=值1, param2=值2}</text>
<text x="400" y="325" class="label" text-anchor="middle" font-weight="bold">使用 @Param 时:</text>
<text x="400" y="345" class="code" text-anchor="middle">{name=值1, age=值2, param1=值1, param2=值2}</text>
<text x="400" y="370" class="label" text-anchor="middle" font-size="12" font-style="italic">注: param1、param2 依然存在但很少使用</text>
</svg>

3. **适用场景**

**场景一: 多个参数（必须使用）**
```java
// ✅ 推荐: 使用 @Param
List<User> findByCondition(
    @Param("username") String username,
    @Param("minAge") Integer minAge,
    @Param("maxAge") Integer maxAge
);

// ❌ 不推荐: 不使用 @Param
List<User> findByCondition(String username, Integer minAge, Integer maxAge);
```

```xml
<!-- 使用 @Param 后的 XML -->
<select id="findByCondition" resultType="User">
  SELECT * FROM user
  WHERE username = #{username}
    AND age BETWEEN #{minAge} AND #{maxAge}
</select>

<!-- 不使用 @Param 的 XML -->
<select id="findByCondition" resultType="User">
  SELECT * FROM user
  WHERE username = #{arg0}  <!-- 不直观 -->
    AND age BETWEEN #{arg1} AND #{arg2}
</select>
```

**场景二: 对象 + 额外参数**
```java
// 组合使用
List<User> search(
    @Param("query") UserQuery query,
    @Param("orderBy") String orderBy,
    @Param("limit") Integer limit
);
```

```xml
<select id="search" resultType="User">
  SELECT * FROM user
  WHERE username = #{query.username}
    AND age = #{query.age}
  ORDER BY ${orderBy}
  LIMIT #{limit}
</select>
```

**场景三: 动态 SQL**
```java
List<User> dynamicSearch(
    @Param("username") String username,
    @Param("email") String email,
    @Param("status") Integer status
);
```

```xml
<select id="dynamicSearch" resultType="User">
  SELECT * FROM user
  <where>
    <if test="username != null and username != ''">
      AND username LIKE CONCAT('%', #{username}, '%')
    </if>
    <if test="email != null">
      AND email = #{email}
    </if>
    <if test="status != null">
      AND status = #{status}
    </if>
  </where>
</select>
```

4. **单个参数场景**

```java
// 单个参数：@Param 可选

// 不使用 @Param (推荐，简洁)
User findById(Long id);

// 使用 @Param (可读性更好)
User findById(@Param("id") Long id);
```

```xml
<!-- 不使用 @Param -->
<select id="findById" resultType="User">
  <!-- 可以用任意名称 -->
  SELECT * FROM user WHERE id = #{id}
</select>

<!-- 使用 @Param -->
<select id="findById" resultType="User">
  <!-- 必须用指定名称 -->
  SELECT * FROM user WHERE id = #{id}
</select>
```

5. **与集合类型配合**

```java
// List 参数
List<User> findByIds(@Param("ids") List<Long> ids);

// Array 参数
List<User> findByIds(@Param("idArray") Long[] ids);

// 多个集合
List<User> findByCondition(
    @Param("userIds") List<Long> userIds,
    @Param("statuses") List<Integer> statuses
);
```

```xml
<!-- List 参数 -->
<select id="findByIds" resultType="User">
  SELECT * FROM user WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</select>

<!-- 多个集合 -->
<select id="findByCondition" resultType="User">
  SELECT * FROM user
  WHERE id IN
  <foreach collection="userIds" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
  AND status IN
  <foreach collection="statuses" item="status" open="(" close=")" separator=",">
    #{status}
  </foreach>
</select>
```

6. **注意事项**

**问题 1: 名称不一致**
```java
// Mapper 接口
User find(@Param("username") String name);  // 参数名是 name
```

```xml
<!-- XML 中必须使用 @Param 指定的名称 -->
<select id="find" resultType="User">
  <!-- ✅ 正确 -->
  WHERE username = #{username}

  <!-- ❌ 错误：不能使用方法参数名 -->
  WHERE username = #{name}
</select>
```

**问题 2: 动态 SQL 判空**
```java
List<User> search(
    @Param("keyword") String keyword
);
```

```xml
<!-- 判空时使用 @Param 指定的名称 -->
<select id="search" resultType="User">
  SELECT * FROM user
  <where>
    <if test="keyword != null and keyword != ''">
      AND username LIKE CONCAT('%', #{keyword}, '%')
    </if>
  </where>
</select>
```

**问题 3: 参数过多**
```java
// ❌ 不推荐：参数太多
User find(
    @Param("p1") String p1,
    @Param("p2") String p2,
    @Param("p3") Integer p3,
    @Param("p4") Integer p4,
    @Param("p5") String p5
);

// ✅ 推荐：封装为对象
User find(@Param("query") UserQuery query);
```

7. **最佳实践**

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px Arial;fill:#333}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.title{font:16px Arial;font-weight:bold;fill:#333}</style></defs>
<text x="400" y="25" class="title" text-anchor="middle">@Param 最佳实践</text>
<rect x="50" y="50" width="220" height="230" class="box" rx="5"/>
<text x="160" y="75" class="label" text-anchor="middle" font-weight="bold">必须使用</text>
<text x="160" y="100" class="label" text-anchor="middle">• 多个参数</text>
<text x="160" y="120" class="label" text-anchor="middle">• 动态 SQL</text>
<text x="160" y="140" class="label" text-anchor="middle">• 集合参数</text>
<text x="160" y="160" class="label" text-anchor="middle">• 对象+额外参数</text>
<text x="160" y="180" class="label" text-anchor="middle">• 参数类型相同时</text>
<rect x="290" y="50" width="220" height="230" class="box" rx="5"/>
<text x="400" y="75" class="label" text-anchor="middle" font-weight="bold">可选使用</text>
<text x="400" y="100" class="label" text-anchor="middle">• 单个参数</text>
<text x="400" y="120" class="label" text-anchor="middle">  (提高可读性)</text>
<text x="400" y="140" class="label" text-anchor="middle">• 单个对象</text>
<text x="400" y="160" class="label" text-anchor="middle">  (明确语义)</text>
<rect x="530" y="50" width="220" height="230" class="box" rx="5"/>
<text x="640" y="75" class="label" text-anchor="middle" font-weight="bold">命名规范</text>
<text x="640" y="100" class="label" text-anchor="middle">• 有意义的名称</text>
<text x="640" y="120" class="label" text-anchor="middle">• 简洁明了</text>
<text x="640" y="140" class="label" text-anchor="middle">• 符合业务语义</text>
<text x="640" y="160" class="label" text-anchor="middle">• 避免缩写</text>
<text x="640" y="180" class="label" text-anchor="middle">• 统一团队规范</text>
</svg>

**关键要点**

1. **作用**: 为方法参数指定名称，在 XML 中通过该名称引用
2. **必用场景**: 多个参数时必须使用，否则用 arg0/param1
3. **可选场景**: 单个参数时可选，但使用后更清晰
4. **命名原则**: 简洁、语义明确、符合业务含义
5. **参数过多**: 超过 3 个参数建议封装为对象

**记忆口诀**

🏷️ **@Param 三原则**
- 多参必须用
- 单参可选用
- 名称要清晰
- 语义要明确

### 35. 如何传递多个参数？

**核心答案**

MyBatis 传递多个参数有三种方式：使用 @Param 注解(推荐)、使用 arg0/param1 索引(不推荐)、封装为对象或 Map(参数多时推荐)。

**详细说明**

1. **三种方式对比**

<svg viewBox="0 0 900 350" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px Arial;fill:#333}.code{font:11px monospace;fill:#0066cc}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.recommend{fill:#e6ffe6;stroke:#44ff44;stroke-width:2}.avoid{fill:#ffe6e6;stroke:#ff4444;stroke-width:2}.title{font:16px Arial;font-weight:bold;fill:#333}</style></defs>
<text x="450" y="25" class="title" text-anchor="middle">多个参数传递方式对比</text>
<rect x="20" y="50" width="280" height="140" class="recommend" rx="5"/>
<text x="160" y="75" class="label" text-anchor="middle" font-weight="bold">✅ 方式一: @Param (推荐)</text>
<text x="160" y="100" class="code" text-anchor="middle">find(@Param("name") String n,</text>
<text x="160" y="115" class="code" text-anchor="middle">     @Param("age") Integer a)</text>
<text x="160" y="140" class="label" text-anchor="middle" font-weight="bold">XML 引用:</text>
<text x="160" y="160" class="code" text-anchor="middle">#{name}, #{age}</text>
<text x="160" y="180" class="label" text-anchor="middle" font-size="12">清晰、直观、易维护</text>
<rect x="320" y="50" width="280" height="140" class="avoid" rx="5"/>
<text x="460" y="75" class="label" text-anchor="middle" font-weight="bold">❌ 方式二: 索引 (不推荐)</text>
<text x="460" y="100" class="code" text-anchor="middle">find(String name,</text>
<text x="460" y="115" class="code" text-anchor="middle">     Integer age)</text>
<text x="460" y="140" class="label" text-anchor="middle" font-weight="bold">XML 引用:</text>
<text x="460" y="160" class="code" text-anchor="middle">#{arg0}, #{arg1}</text>
<text x="460" y="175" class="code" text-anchor="middle">#{param1}, #{param2}</text>
<text x="460" y="185" class="label" text-anchor="middle" font-size="12">不直观、易出错</text>
<rect x="620" y="50" width="260" height="140" class="recommend" rx="5"/>
<text x="750" y="75" class="label" text-anchor="middle" font-weight="bold">✅ 方式三: 封装对象</text>
<text x="750" y="100" class="code" text-anchor="middle" font-size="10">find(@Param("q")</text>
<text x="750" y="113" class="code" text-anchor="middle" font-size="10">     UserQuery query)</text>
<text x="750" y="135" class="label" text-anchor="middle" font-weight="bold">XML 引用:</text>
<text x="750" y="155" class="code" text-anchor="middle">#{q.username}</text>
<text x="750" y="170" class="code" text-anchor="middle">#{q.age}</text>
<text x="750" y="185" class="label" text-anchor="middle" font-size="12">参数多时推荐</text>
<rect x="20" y="210" width="860" height="125" class="box" rx="5"/>
<text x="450" y="235" class="title" text-anchor="middle">参数选择建议</text>
<text x="450" y="265" class="label" text-anchor="middle">• 2-3 个参数: 使用 @Param</text>
<text x="450" y="290" class="label" text-anchor="middle">• 4-5 个参数: 考虑封装对象</text>
<text x="450" y="315" class="label" text-anchor="middle">• 6+ 个参数: 必须封装对象或 Map</text>
</svg>

2. **方式一：使用 @Param 注解（推荐）**

```java
// Mapper 接口
public interface UserMapper {
    // 2 个参数
    List<User> findByUsernameAndAge(
        @Param("username") String username,
        @Param("age") Integer age
    );

    // 3 个参数
    List<User> findByCondition(
        @Param("keyword") String keyword,
        @Param("minAge") Integer minAge,
        @Param("maxAge") Integer maxAge
    );

    // 分页查询
    List<User> findByPage(
        @Param("offset") Integer offset,
        @Param("limit") Integer limit
    );
}
```

```xml
<!-- XML 映射文件 -->
<select id="findByUsernameAndAge" resultType="User">
  SELECT * FROM user
  WHERE username = #{username}
    AND age = #{age}
</select>

<select id="findByCondition" resultType="User">
  SELECT * FROM user
  WHERE username LIKE CONCAT('%', #{keyword}, '%')
    AND age BETWEEN #{minAge} AND #{maxAge}
</select>

<select id="findByPage" resultType="User">
  SELECT * FROM user
  LIMIT #{offset}, #{limit}
</select>
```

3. **方式二：使用 arg/param 索引（不推荐）**

```java
// Mapper 接口（不使用 @Param）
List<User> findByUsernameAndAge(String username, Integer age);
```

```xml
<!-- 使用 arg0, arg1 -->
<select id="findByUsernameAndAge" resultType="User">
  SELECT * FROM user
  WHERE username = #{arg0}
    AND age = #{arg1}
</select>

<!-- 或使用 param1, param2 -->
<select id="findByUsernameAndAge" resultType="User">
  SELECT * FROM user
  WHERE username = #{param1}
    AND age = #{param2}
</select>
```

**问题分析**：
- arg0/param1 不直观，难以理解参数含义
- 参数顺序改变会导致错误
- 代码可读性差，维护困难

4. **方式三：封装为对象**

```java
// 查询对象
@Data
public class UserQuery {
    private String username;
    private String email;
    private Integer minAge;
    private Integer maxAge;
    private Integer status;
}

// Mapper 接口
List<User> search(@Param("query") UserQuery query);

// 或者不使用 @Param (单个对象)
List<User> search(UserQuery query);
```

```xml
<!-- 使用 @Param 时 -->
<select id="search" resultType="User">
  SELECT * FROM user
  <where>
    <if test="query.username != null">
      AND username LIKE CONCAT('%', #{query.username}, '%')
    </if>
    <if test="query.email != null">
      AND email = #{query.email}
    </if>
    <if test="query.minAge != null">
      AND age &gt;= #{query.minAge}
    </if>
    <if test="query.maxAge != null">
      AND age &lt;= #{query.maxAge}
    </if>
    <if test="query.status != null">
      AND status = #{query.status}
    </if>
  </where>
</select>

<!-- 不使用 @Param 时(单个对象) -->
<select id="search" resultType="User">
  SELECT * FROM user
  <where>
    <if test="username != null">
      AND username LIKE CONCAT('%', #{username}, '%')
    </if>
    <!-- 直接使用属性名 -->
  </where>
</select>
```

5. **混合使用**

```java
// 对象 + 额外参数
List<User> search(
    @Param("query") UserQuery query,
    @Param("orderBy") String orderBy,
    @Param("limit") Integer limit
);

// 多个对象
int transfer(
    @Param("fromAccount") Account from,
    @Param("toAccount") Account to,
    @Param("amount") BigDecimal amount
);
```

```xml
<!-- 对象 + 额外参数 -->
<select id="search" resultType="User">
  SELECT * FROM user
  WHERE username = #{query.username}
    AND age &gt;= #{query.minAge}
  ORDER BY ${orderBy}
  LIMIT #{limit}
</select>

<!-- 多个对象 -->
<update id="transfer">
  UPDATE account SET balance = balance - #{amount}
  WHERE id = #{fromAccount.id};

  UPDATE account SET balance = balance + #{amount}
  WHERE id = #{toAccount.id};
</update>
```

6. **使用 Map 传递**

```java
// Mapper 接口
List<User> searchByMap(Map<String, Object> params);
```

```xml
<select id="searchByMap" resultType="User">
  SELECT * FROM user
  <where>
    <if test="username != null">
      AND username = #{username}
    </if>
    <if test="age != null">
      AND age = #{age}
    </if>
  </where>
</select>
```

```java
// 调用方式
Map<String, Object> params = new HashMap<>();
params.put("username", "john");
params.put("age", 25);
List<User> users = userMapper.searchByMap(params);
```

**Map 的缺点**：
- 类型不安全，编译期无法检查
- 没有代码提示，容易写错 key
- 维护困难，不利于重构

7. **最佳实践决策树**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:13px Arial;fill:#333}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.decision{fill:#fff4e6;stroke:#ffa500;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrowhead)}.title{font:16px Arial;font-weight:bold;fill:#333}</style><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0,10 3,0 6" fill="#666"/></marker></defs>
<text x="400" y="25" class="title" text-anchor="middle">多参数传递决策树</text>
<rect x="300" y="50" width="200" height="50" class="decision" rx="5"/>
<text x="400" y="80" class="label" text-anchor="middle" font-weight="bold">参数个数?</text>
<path d="M 300 75 L 150 150" class="arrow"/>
<path d="M 400 100 L 400 150" class="arrow"/>
<path d="M 500 75 L 650 150" class="arrow"/>
<rect x="50" y="150" width="200" height="60" class="box" rx="5"/>
<text x="150" y="170" class="label" text-anchor="middle" font-weight="bold">1 个参数</text>
<text x="150" y="190" class="label" text-anchor="middle">直接传递</text>
<text x="150" y="205" class="label" text-anchor="middle" font-size="12">@Param 可选</text>
<rect x="300" y="150" width="200" height="60" class="box" rx="5"/>
<text x="400" y="170" class="label" text-anchor="middle" font-weight="bold">2-3 个参数</text>
<text x="400" y="190" class="label" text-anchor="middle">使用 @Param</text>
<text x="400" y="205" class="label" text-anchor="middle" font-size="12">清晰直观</text>
<rect x="550" y="150" width="200" height="60" class="box" rx="5"/>
<text x="650" y="170" class="label" text-anchor="middle" font-weight="bold">4+ 个参数</text>
<text x="650" y="190" class="label" text-anchor="middle">封装对象</text>
<text x="650" y="205" class="label" text-anchor="middle" font-size="12">便于维护</text>
<path d="M 400 210 L 400 270" class="arrow"/>
<rect x="300" y="270" width="200" height="50" class="decision" rx="5"/>
<text x="400" y="300" class="label" text-anchor="middle" font-weight="bold">需要动态条件?</text>
<path d="M 300 295 L 150 360" class="arrow"/>
<path d="M 500 295 L 650 360" class="arrow"/>
<rect x="50" y="360" width="200" height="60" class="box" rx="5"/>
<text x="150" y="380" class="label" text-anchor="middle" font-weight="bold">是</text>
<text x="150" y="400" class="label" text-anchor="middle">查询对象</text>
<text x="150" y="415" class="label" text-anchor="middle" font-size="12">支持动态 SQL</text>
<rect x="550" y="360" width="200" height="60" class="box" rx="5"/>
<text x="650" y="380" class="label" text-anchor="middle" font-weight="bold">否</text>
<text x="650" y="400" class="label" text-anchor="middle">实体对象</text>
<text x="650" y="415" class="label" text-anchor="middle" font-size="12">固定字段</text>
<rect x="50" y="450" width="700" height="40" class="box" rx="5"/>
<text x="400" y="475" class="label" text-anchor="middle" font-style="italic">原则: 2-3 个用 @Param，4+ 个封装对象，避免 Map</text>
</svg>

8. **常见错误**

**错误 1: 多参数不用 @Param**
```java
// ❌ 错误
List<User> find(String username, Integer age);

// XML 中
WHERE username = #{username}  // 运行时报错

// ✅ 正确
List<User> find(@Param("username") String username,
                @Param("age") Integer age);
```

**错误 2: 参数过多仍使用 @Param**
```java
// ❌ 不推荐
List<User> find(
    @Param("p1") String p1,
    @Param("p2") String p2,
    @Param("p3") Integer p3,
    @Param("p4") Integer p4,
    @Param("p5") String p5,
    @Param("p6") Integer p6
);

// ✅ 推荐
List<User> find(@Param("query") UserQuery query);
```

**关键要点**

1. **推荐方式**: 2-3 个参数用 @Param，4+ 个封装对象
2. **避免方式**: arg0/param1 索引，大量 Map 传参
3. **混合使用**: 对象 + 额外参数，多个对象
4. **命名规范**: @Param 名称清晰、简洁、语义明确
5. **参数封装**: 超过 3 个参数建议封装为查询对象

**记忆口诀**

🔢 **多参数口诀**
- 单参直接传
- 二三用 @Param
- 四五考虑封装
- 六加必封装
- Map 要慎用

### 36. 如何传递对象参数？

**核心答案**

MyBatis 传递对象参数时,直接将对象作为方法参数,XML 中通过对象属性名(使用 getter 方法)引用参数值,支持嵌套对象和复杂属性访问。

**详细说明**

1. **基本用法**

```java
// 实体类
@Data
public class User {
    private Long id;
    private String username;
    private String email;
    private Integer age;
    private Integer status;
}

// Mapper 接口 - 单个对象参数
int insert(User user);
int update(User user);
int delete(User user);
User findOne(User condition);
```

```xml
<!-- 插入操作 -->
<insert id="insert">
  INSERT INTO user (username, email, age, status)
  VALUES (#{username}, #{email}, #{age}, #{status})
</insert>

<!-- 更新操作 -->
<update id="update">
  UPDATE user
  SET username = #{username},
      email = #{email},
      age = #{age}
  WHERE id = #{id}
</update>

<!-- 删除操作 -->
<delete id="delete">
  DELETE FROM user WHERE id = #{id}
</delete>

<!-- 查询操作 -->
<select id="findOne" resultType="User">
  SELECT * FROM user
  WHERE username = #{username}
    AND email = #{email}
</select>
```

2. **对象参数取值原理**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px Arial;fill:#333}.code{font:12px monospace;fill:#0066cc}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrowhead)}.highlight{fill:#fff4e6;stroke:#ffa500;stroke-width:1.5}.title{font:16px Arial;font-weight:bold;fill:#333}</style><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0,10 3,0 6" fill="#666"/></marker></defs>
<text x="400" y="25" class="title" text-anchor="middle">对象参数取值流程</text>
<rect x="50" y="50" width="700" height="60" class="box" rx="5"/>
<text x="400" y="75" class="label" text-anchor="middle" font-weight="bold">1. Java 代码调用</text>
<text x="400" y="95" class="code" text-anchor="middle">User user = new User(); user.setUsername("john"); user.setAge(25);</text>
<path d="M 400 110 L 400 140" class="arrow"/>
<rect x="50" y="140" width="330" height="80" class="box" rx="5"/>
<text x="215" y="165" class="label" text-anchor="middle" font-weight="bold">2. XML 引用属性</text>
<text x="215" y="185" class="code" text-anchor="middle">#{username}</text>
<text x="215" y="205" class="code" text-anchor="middle">#{age}</text>
<rect x="420" y="140" width="330" height="80" class="box" rx="5"/>
<text x="585" y="165" class="label" text-anchor="middle" font-weight="bold">3. MyBatis 调用 getter</text>
<text x="585" y="185" class="code" text-anchor="middle">user.getUsername()</text>
<text x="585" y="205" class="code" text-anchor="middle">user.getAge()</text>
<path d="M 215 220 L 215 250 L 400 250" class="arrow"/>
<path d="M 585 220 L 585 250 L 400 250" class="arrow"/>
<rect x="50" y="250" width="700" height="60" class="highlight" rx="5"/>
<text x="400" y="275" class="label" text-anchor="middle" font-weight="bold">4. 获取属性值</text>
<text x="400" y="295" class="code" text-anchor="middle">username = "john", age = 25</text>
<path d="M 400 310 L 400 340" class="arrow"/>
<rect x="50" y="340" width="700" height="50" class="box" rx="5"/>
<text x="400" y="370" class="code" text-anchor="middle">INSERT INTO user (username, age) VALUES ('john', 25)</text>
</svg>

3. **单个对象 vs @Param 对象**

```java
// 方式一: 单个对象(不用 @Param)
List<User> search(UserQuery query);
```

```xml
<!-- 直接使用属性名 -->
<select id="search" resultType="User">
  SELECT * FROM user
  WHERE username = #{username}
    AND age = #{age}
</select>
```

```java
// 方式二: 使用 @Param
List<User> search(@Param("query") UserQuery query);
```

```xml
<!-- 需要加前缀 -->
<select id="search" resultType="User">
  SELECT * FROM user
  WHERE username = #{query.username}
    AND age = #{query.age}
</select>
```

4. **嵌套对象**

```java
// 嵌套对象定义
@Data
public class User {
    private Long id;
    private String username;
    private Address address;  // 嵌套对象
    private Department dept;  // 嵌套对象
}

@Data
public class Address {
    private String province;
    private String city;
    private String detail;
}

@Data
public class Department {
    private Long id;
    private String name;
}

// Mapper 接口
int insert(User user);
```

```xml
<!-- 访问嵌套对象属性 -->
<insert id="insert">
  INSERT INTO user (username, province, city, address, dept_id, dept_name)
  VALUES (
    #{username},
    #{address.province},      <!-- 嵌套对象 -->
    #{address.city},
    #{address.detail},
    #{dept.id},               <!-- 嵌套对象 -->
    #{dept.name}
  )
</insert>
```

5. **查询对象(DTO)**

```java
// 查询条件对象
@Data
public class UserQuery {
    private String username;
    private String email;
    private Integer minAge;
    private Integer maxAge;
    private List<Integer> statuses;
    private String orderBy;
    private Integer pageNum;
    private Integer pageSize;
}

// Mapper 接口
List<User> search(UserQuery query);
```

```xml
<!-- 动态 SQL 查询 -->
<select id="search" resultType="User">
  SELECT * FROM user
  <where>
    <if test="username != null and username != ''">
      AND username LIKE CONCAT('%', #{username}, '%')
    </if>
    <if test="email != null">
      AND email = #{email}
    </if>
    <if test="minAge != null">
      AND age &gt;= #{minAge}
    </if>
    <if test="maxAge != null">
      AND age &lt;= #{maxAge}
    </if>
    <if test="statuses != null and statuses.size() > 0">
      AND status IN
      <foreach collection="statuses" item="s" open="(" close=")" separator=",">
        #{s}
      </foreach>
    </if>
  </where>
  <if test="orderBy != null">
    ORDER BY ${orderBy}
  </if>
  <if test="pageNum != null and pageSize != null">
    LIMIT #{pageNum}, #{pageSize}
  </if>
</select>
```

6. **对象 + 额外参数**

```java
// Mapper 接口
List<User> search(
    @Param("query") UserQuery query,
    @Param("orderBy") String orderBy,
    @Param("limit") Integer limit
);
```

```xml
<select id="search" resultType="User">
  SELECT * FROM user
  WHERE username = #{query.username}
    AND age &gt;= #{query.minAge}
  ORDER BY ${orderBy}
  LIMIT #{limit}
</select>
```

7. **多个对象参数**

```java
// Mapper 接口
int transfer(
    @Param("fromAccount") Account from,
    @Param("toAccount") Account to,
    @Param("amount") BigDecimal amount
);
```

```xml
<update id="transfer">
  <!-- 扣除源账户金额 -->
  UPDATE account
  SET balance = balance - #{amount},
      update_time = NOW()
  WHERE id = #{fromAccount.id}
    AND balance &gt;= #{amount};

  <!-- 增加目标账户金额 -->
  UPDATE account
  SET balance = balance + #{amount},
      update_time = NOW()
  WHERE id = #{toAccount.id};
</update>
```

8. **选择性更新**

```java
// Mapper 接口
int updateSelective(User user);
```

```xml
<!-- 只更新非空字段 -->
<update id="updateSelective">
  UPDATE user
  <set>
    <if test="username != null">username = #{username},</if>
    <if test="email != null">email = #{email},</if>
    <if test="age != null">age = #{age},</if>
    <if test="status != null">status = #{status},</if>
    update_time = NOW()
  </set>
  WHERE id = #{id}
</update>
```

9. **集合属性**

```java
@Data
public class BatchInsertRequest {
    private String operator;
    private List<User> users;
}

// Mapper 接口
int batchInsert(BatchInsertRequest request);
```

```xml
<insert id="batchInsert">
  INSERT INTO user (username, email, age, created_by)
  VALUES
  <foreach collection="users" item="user" separator=",">
    (#{user.username}, #{user.email}, #{user.age}, #{operator})
  </foreach>
</insert>
```

10. **注意事项**

**问题 1: 属性名拼写错误**
```xml
<!-- ❌ 错误: 属性名拼错 -->
<select id="find" resultType="User">
  SELECT * FROM user WHERE username = #{userName}  <!-- 实际是 username -->
</select>

<!-- ✅ 正确 -->
<select id="find" resultType="User">
  SELECT * FROM user WHERE username = #{username}
</select>
```

**问题 2: getter 方法缺失**
```java
// ❌ 错误: 没有 getter 方法
public class User {
    private String username;  // 没有 getUsername() 方法
}

// ✅ 正确: 使用 @Data 或手动添加 getter
@Data
public class User {
    private String username;
}
```

**问题 3: 嵌套对象为 null**
```xml
<!-- 当 address 为 null 时 -->
<insert id="insert">
  VALUES (#{address.city})  <!-- 会报 NullPointerException -->
</insert>

<!-- 解决方案: 添加判空 -->
<insert id="insert">
  VALUES (
    <if test="address != null">#{address.city}</if>
    <if test="address == null">NULL</if>
  )
</insert>
```

**关键要点**

1. **属性访问**: XML 中通过属性名访问,实际调用 getter 方法
2. **单对象**: 可不用 @Param,直接用属性名
3. **多对象**: 必须用 @Param,XML 中加前缀
4. **嵌套对象**: 用点号访问,如 #{address.city}
5. **集合属性**: 配合 foreach 标签使用

**记忆口诀**

📦 **对象参数要点**
- 单对象免注解
- 多对象加 @Param
- 属性名调 getter
- 嵌套用点号
- 集合配 foreach

### 37. 如何传递 Map 参数？

**核心答案**

MyBatis 传递 Map 参数时,将 Map 作为方法参数,XML 中通过 Map 的 key 引用值。适合参数不固定或动态条件场景,但类型不安全,不推荐大量使用。

**详细说明**

1. **基本用法**

```java
// Mapper 接口
List<User> searchByMap(Map<String, Object> params);
int updateByMap(Map<String, Object> params);
int insertByMap(Map<String, Object> params);
```

```xml
<!-- 查询 -->
<select id="searchByMap" resultType="User">
  SELECT * FROM user
  WHERE username = #{username}
    AND age = #{age}
</select>

<!-- 更新 -->
<update id="updateByMap">
  UPDATE user
  SET username = #{username},
      email = #{email}
  WHERE id = #{id}
</update>

<!-- 插入 -->
<insert id="insertByMap">
  INSERT INTO user (username, email, age)
  VALUES (#{username}, #{email}, #{age})
</insert>
```

```java
// 调用方式
Map<String, Object> params = new HashMap<>();
params.put("username", "john");
params.put("age", 25);
List<User> users = userMapper.searchByMap(params);
```

2. **动态条件查询**

```java
// Mapper 接口
List<User> dynamicSearch(Map<String, Object> conditions);
```

```xml
<select id="dynamicSearch" resultType="User">
  SELECT * FROM user
  <where>
    <if test="username != null">
      AND username LIKE CONCAT('%', #{username}, '%')
    </if>
    <if test="email != null">
      AND email = #{email}
    </if>
    <if test="minAge != null">
      AND age &gt;= #{minAge}
    </if>
    <if test="maxAge != null">
      AND age &lt;= #{maxAge}
    </if>
    <if test="status != null">
      AND status = #{status}
    </if>
  </where>
  <if test="orderBy != null">
    ORDER BY ${orderBy}
  </if>
  <if test="limit != null">
    LIMIT #{limit}
  </if>
</select>
```

3. **Map 与 @Param 组合**

```java
// Mapper 接口
List<User> search(
    @Param("conditions") Map<String, Object> conditions,
    @Param("orderBy") String orderBy
);
```

```xml
<select id="search" resultType="User">
  SELECT * FROM user
  <where>
    <if test="conditions.username != null">
      AND username = #{conditions.username}
    </if>
    <if test="conditions.age != null">
      AND age = #{conditions.age}
    </if>
  </where>
  ORDER BY ${orderBy}
</select>
```

4. **Map 的优缺点对比**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px Arial;fill:#333}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.good{fill:#e6ffe6;stroke:#44ff44;stroke-width:2}.bad{fill:#ffe6e6;stroke:#ff4444;stroke-width:2}.title{font:16px Arial;font-weight:bold;fill:#333}</style></defs>
<text x="400" y="25" class="title" text-anchor="middle">Map 参数优缺点</text>
<rect x="50" y="50" width="330" height="150" class="good" rx="5"/>
<text x="215" y="75" class="label" text-anchor="middle" font-weight="bold">✅ 优点</text>
<text x="215" y="105" class="label" text-anchor="middle">• 灵活动态</text>
<text x="215" y="125" class="label" text-anchor="middle">• 参数数量不固定</text>
<text x="215" y="145" class="label" text-anchor="middle">• 快速原型开发</text>
<text x="215" y="165" class="label" text-anchor="middle">• 无需定义类</text>
<text x="215" y="185" class="label" text-anchor="middle">• 适合临时查询</text>
<rect x="420" y="50" width="330" height="150" class="bad" rx="5"/>
<text x="585" y="75" class="label" text-anchor="middle" font-weight="bold">❌ 缺点</text>
<text x="585" y="105" class="label" text-anchor="middle">• 类型不安全</text>
<text x="585" y="125" class="label" text-anchor="middle">• 编译期无法检查</text>
<text x="585" y="145" class="label" text-anchor="middle">• 易写错 key</text>
<text x="585" y="165" class="label" text-anchor="middle">• 无代码提示</text>
<text x="585" y="185" class="label" text-anchor="middle">• 维护困难</text>
<rect x="50" y="220" width="330" height="150" class="box" rx="5"/>
<text x="215" y="245" class="label" text-anchor="middle" font-weight="bold">适用场景</text>
<text x="215" y="275" class="label" text-anchor="middle">• 动态查询条件</text>
<text x="215" y="295" class="label" text-anchor="middle">• 临时功能</text>
<text x="215" y="315" class="label" text-anchor="middle">• 工具类方法</text>
<text x="215" y="335" class="label" text-anchor="middle">• 快速原型</text>
<text x="215" y="355" class="label" text-anchor="middle">• 框架内部使用</text>
<rect x="420" y="220" width="330" height="150" class="box" rx="5"/>
<text x="585" y="245" class="label" text-anchor="middle" font-weight="bold">不适用场景</text>
<text x="585" y="275" class="label" text-anchor="middle">• 正式业务代码</text>
<text x="585" y="295" class="label" text-anchor="middle">• 固定参数</text>
<text x="585" y="315" class="label" text-anchor="middle">• 需要类型安全</text>
<text x="585" y="335" class="label" text-anchor="middle">• 长期维护代码</text>
<text x="585" y="355" class="label" text-anchor="middle">• 团队协作项目</text>
</svg>

5. **Map vs 对象对比**

```java
// ❌ 不推荐: 使用 Map
Map<String, Object> params = new HashMap<>();
params.put("usrname", "john");  // 拼写错误，运行时才发现
params.put("age", "25");        // 类型错误，应该是 Integer
List<User> users = mapper.search(params);

// ✅ 推荐: 使用对象
UserQuery query = new UserQuery();
query.setUsername("john");  // 编译期检查，有代码提示
query.setAge(25);           // 类型安全
List<User> users = mapper.search(query);
```

6. **实际应用示例**

**场景一: 通用查询工具**
```java
// 通用查询方法
public List<Map<String, Object>> query(
    String sql,
    Map<String, Object> params
) {
    // 动态 SQL 执行
}
```

**场景二: 导出功能**
```java
// 导出时的动态过滤条件
Map<String, Object> filters = new HashMap<>();
if (startDate != null) {
    filters.put("startDate", startDate);
}
if (endDate != null) {
    filters.put("endDate", endDate);
}
if (status != null) {
    filters.put("status", status);
}
List<User> data = mapper.export(filters);
```

**场景三: 分页参数**
```java
Map<String, Object> pageParams = new HashMap<>();
pageParams.put("offset", (pageNum - 1) * pageSize);
pageParams.put("limit", pageSize);
pageParams.put("orderBy", orderBy);
List<User> users = mapper.findByPage(pageParams);
```

7. **Map 集合值的处理**

```java
// Map 中包含集合
Map<String, Object> params = new HashMap<>();
params.put("ids", Arrays.asList(1L, 2L, 3L));
params.put("statuses", Arrays.asList(1, 2));
```

```xml
<select id="findByMap" resultType="User">
  SELECT * FROM user
  WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
  AND status IN
  <foreach collection="statuses" item="status" open="(" close=")" separator=",">
    #{status}
  </foreach>
</select>
```

8. **注意事项**

**问题 1: Key 拼写错误**
```java
// Java 代码
Map<String, Object> params = new HashMap<>();
params.put("userName", "john");  // 注意是驼峰
```

```xml
<!-- XML 中 -->
WHERE username = #{userName}  <!-- 必须完全一致 -->
```

**问题 2: 类型转换问题**
```java
Map<String, Object> params = new HashMap<>();
params.put("age", "25");  // String 类型

// 可能导致 SQL 错误：WHERE age = '25' (字符串)
// 应该: params.put("age", 25); → WHERE age = 25 (数字)
```

**问题 3: Null 值处理**
```xml
<if test="username != null">
  AND username = #{username}
</if>
<!-- 如果 Map 中没有 username 这个 key，test 为 null -->
```

9. **最佳实践**

```java
// ❌ 避免在正式代码中大量使用
public interface UserMapper {
    List<User> find1(Map<String, Object> p1);
    List<User> find2(Map<String, Object> p2);
    List<User> find3(Map<String, Object> p3);
}

// ✅ 推荐使用明确的对象
public interface UserMapper {
    List<User> findByQuery(UserQuery query);
    List<User> findByFilter(UserFilter filter);
    List<User> findByCondition(UserCondition condition);
}

// ✅ 特殊场景可使用 Map
public interface CommonMapper {
    List<Map<String, Object>> dynamicQuery(
        @Param("sql") String sql,
        @Param("params") Map<String, Object> params
    );
}
```

**关键要点**

1. **适用场景**: 动态条件、临时功能、工具方法
2. **不适场景**: 正式业务、固定参数、长期维护
3. **类型安全**: Map 无编译期检查，对象有类型安全
4. **维护性**: Map 难维护，对象易维护
5. **最佳实践**: 优先使用对象，特殊场景用 Map

**记忆口诀**

🗺️ **Map 参数要慎用**
- 灵活但不安全
- 临时可以用
- 正式要对象
- Key 别写错
- 类型要匹配

### 38. 如何传递 List 参数？

**核心答案**

MyBatis 传递 List 参数时,单个 List 使用 `collection="list"`,使用 @Param 注解则用指定名称,主要配合 `<foreach>` 标签实现 IN 查询和批量操作。

**详细说明**

1. **基本用法**

```java
// Mapper 接口 - 单个 List 参数
List<User> findByIds(List<Long> ids);
List<User> findByUsernames(List<String> usernames);
int batchDelete(List<Long> ids);
```

```xml
<!-- 单个 List 参数，使用 collection="list" -->
<select id="findByIds" resultType="User">
  SELECT * FROM user WHERE id IN
  <foreach collection="list" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</select>

<select id="findByUsernames" resultType="User">
  SELECT * FROM user WHERE username IN
  <foreach collection="list" item="name" open="(" close=")" separator=",">
    #{name}
  </foreach>
</select>

<delete id="batchDelete">
  DELETE FROM user WHERE id IN
  <foreach collection="list" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</delete>
```

2. **使用 @Param 注解**

```java
// Mapper 接口 - 使用 @Param
List<User> findByIds(@Param("ids") List<Long> ids);
List<User> findByCondition(
    @Param("userIds") List<Long> userIds,
    @Param("statuses") List<Integer> statuses
);
```

```xml
<!-- 使用 @Param 指定的名称 -->
<select id="findByIds" resultType="User">
  SELECT * FROM user WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</select>

<!-- 多个 List 参数 -->
<select id="findByCondition" resultType="User">
  SELECT * FROM user
  WHERE id IN
  <foreach collection="userIds" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
  AND status IN
  <foreach collection="statuses" item="status" open="(" close=")" separator=",">
    #{status}
  </foreach>
</select>
```

3. **List 参数命名规则**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px Arial;fill:#333}.code{font:12px monospace;fill:#0066cc}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.recommend{fill:#e6ffe6;stroke:#44ff44;stroke-width:2}.title{font:16px Arial;font-weight:bold;fill:#333}</style></defs>
<text x="400" y="25" class="title" text-anchor="middle">List 参数命名规则</text>
<rect x="50" y="50" width="330" height="150" class="box" rx="5"/>
<text x="215" y="75" class="label" text-anchor="middle" font-weight="bold">单个 List 参数</text>
<text x="215" y="105" class="code" text-anchor="middle">findByIds(List&lt;Long&gt; ids)</text>
<text x="215" y="135" class="label" text-anchor="middle">XML 引用方式:</text>
<text x="215" y="155" class="code" text-anchor="middle">collection="list"</text>
<text x="215" y="175" class="label" text-anchor="middle" font-size="12">或</text>
<text x="215" y="190" class="code" text-anchor="middle">collection="collection"</text>
<rect x="420" y="50" width="330" height="150" class="recommend" rx="5"/>
<text x="585" y="75" class="label" text-anchor="middle" font-weight="bold">使用 @Param (推荐)</text>
<text x="585" y="100" class="code" text-anchor="middle" font-size="11">findByIds(@Param("ids")</text>
<text x="585" y="115" class="code" text-anchor="middle" font-size="11">           List&lt;Long&gt; ids)</text>
<text x="585" y="140" class="label" text-anchor="middle">XML 引用方式:</text>
<text x="585" y="160" class="code" text-anchor="middle">collection="ids"</text>
<text x="585" y="180" class="label" text-anchor="middle" font-size="12">清晰明确</text>
<rect x="50" y="220" width="330" height="150" class="box" rx="5"/>
<text x="215" y="245" class="label" text-anchor="middle" font-weight="bold">多个 List 参数</text>
<text x="215" y="270" class="code" text-anchor="middle" font-size="10">find(List&lt;Long&gt; ids,</text>
<text x="215" y="285" class="code" text-anchor="middle" font-size="10">     List&lt;Integer&gt; status)</text>
<text x="215" y="310" class="label" text-anchor="middle">XML 引用:</text>
<text x="215" y="330" class="code" text-anchor="middle">collection="arg0"</text>
<text x="215" y="345" class="code" text-anchor="middle">collection="arg1"</text>
<text x="215" y="360" class="label" text-anchor="middle" font-size="12">不推荐</text>
<rect x="420" y="220" width="330" height="150" class="recommend" rx="5"/>
<text x="585" y="245" class="label" text-anchor="middle" font-weight="bold">多 List 用 @Param</text>
<text x="585" y="270" class="code" text-anchor="middle" font-size="10">find(@Param("ids") List ids,</text>
<text x="585" y="285" class="code" text-anchor="middle" font-size="10">  @Param("statuses") List s)</text>
<text x="585" y="310" class="label" text-anchor="middle">XML 引用:</text>
<text x="585" y="330" class="code" text-anchor="middle">collection="ids"</text>
<text x="585" y="345" class="code" text-anchor="middle">collection="statuses"</text>
<text x="585" y="360" class="label" text-anchor="middle" font-size="12">推荐</text>
</svg>

4. **批量插入**

```java
// Mapper 接口
int batchInsert(@Param("users") List<User> users);
```

```xml
<insert id="batchInsert">
  INSERT INTO user (username, email, age) VALUES
  <foreach collection="users" item="user" separator=",">
    (#{user.username}, #{user.email}, #{user.age})
  </foreach>
</insert>
```

5. **批量更新**

```java
// Mapper 接口
int batchUpdate(@Param("users") List<User> users);
```

```xml
<!-- 方式一: 多条 UPDATE 语句 -->
<update id="batchUpdate">
  <foreach collection="users" item="user" separator=";">
    UPDATE user
    SET username = #{user.username},
        email = #{user.email}
    WHERE id = #{user.id}
  </foreach>
</update>

<!-- 方式二: CASE WHEN (MySQL) -->
<update id="batchUpdate">
  UPDATE user
  SET username = CASE id
    <foreach collection="users" item="user">
      WHEN #{user.id} THEN #{user.username}
    </foreach>
  END,
  email = CASE id
    <foreach collection="users" item="user">
      WHEN #{user.id} THEN #{user.email}
    </foreach>
  END
  WHERE id IN
  <foreach collection="users" item="user" open="(" close=")" separator=",">
    #{user.id}
  </foreach>
</update>
```

6. **复杂条件查询**

```java
// Mapper 接口
List<User> complexSearch(
    @Param("ids") List<Long> ids,
    @Param("excludeIds") List<Long> excludeIds,
    @Param("statuses") List<Integer> statuses
);
```

```xml
<select id="complexSearch" resultType="User">
  SELECT * FROM user
  <where>
    <if test="ids != null and ids.size() > 0">
      AND id IN
      <foreach collection="ids" item="id" open="(" close=")" separator=",">
        #{id}
      </foreach>
    </if>
    <if test="excludeIds != null and excludeIds.size() > 0">
      AND id NOT IN
      <foreach collection="excludeIds" item="id" open="(" close=")" separator=",">
        #{id}
      </foreach>
    </if>
    <if test="statuses != null and statuses.size() > 0">
      AND status IN
      <foreach collection="statuses" item="status" open="(" close=")" separator=",">
        #{status}
      </foreach>
    </if>
  </where>
</select>
```

7. **List + 其他参数**

```java
// Mapper 接口
List<User> findByIdsAndStatus(
    @Param("ids") List<Long> ids,
    @Param("status") Integer status,
    @Param("minAge") Integer minAge
);
```

```xml
<select id="findByIdsAndStatus" resultType="User">
  SELECT * FROM user
  WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
  AND status = #{status}
  AND age &gt;= #{minAge}
</select>
```

8. **空 List 处理**

```java
// Mapper 接口
List<User> findByIds(@Param("ids") List<Long> ids);
```

```xml
<!-- ❌ 错误: 不判空，ids 为空时生成 WHERE id IN () -->
<select id="findByIds" resultType="User">
  SELECT * FROM user WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</select>

<!-- ✅ 正确: 判空处理 -->
<select id="findByIds" resultType="User">
  SELECT * FROM user
  <if test="ids != null and ids.size() > 0">
    WHERE id IN
    <foreach collection="ids" item="id" open="(" close=")" separator=",">
      #{id}
    </foreach>
  </if>
</select>

<!-- ✅ 更好: 空 List 返回空结果 -->
<select id="findByIds" resultType="User">
  SELECT * FROM user
  WHERE 1 = 1
  <if test="ids != null and ids.size() > 0">
    AND id IN
    <foreach collection="ids" item="id" open="(" close=")" separator=",">
      #{id}
    </foreach>
  </if>
  <if test="ids != null and ids.size() == 0">
    AND 1 = 0  <!-- 返回空结果 -->
  </if>
</select>
```

9. **大 List 性能优化**

```java
// 方式一: 分批处理
public List<User> findByLargeIdList(List<Long> allIds) {
    List<User> result = new ArrayList<>();
    int batchSize = 1000;

    for (int i = 0; i < allIds.size(); i += batchSize) {
        int end = Math.min(i + batchSize, allIds.size());
        List<Long> batch = allIds.subList(i, end);
        result.addAll(userMapper.findByIds(batch));
    }

    return result;
}

// 方式二: 使用临时表(大量 ID 时)
// 1. 创建临时表
// 2. 批量插入 ID
// 3. JOIN 查询
// 4. 删除临时表
```

10. **注意事项**

**问题 1: 忘记 @Param**
```java
// ❌ 多个 List 不用 @Param
List<User> find(List<Long> ids, List<Integer> statuses);

// XML 中
<foreach collection="arg0" ...>  <!-- 不直观 -->
<foreach collection="arg1" ...>

// ✅ 使用 @Param
List<User> find(
    @Param("ids") List<Long> ids,
    @Param("statuses") List<Integer> statuses
);
```

**问题 2: IN 条件数量限制**
```sql
-- 某些数据库 IN 子句有数量限制
-- MySQL: 建议不超过 1000
-- Oracle: 不超过 1000
-- SQL Server: 没有明确限制但建议控制

-- 解决方案: 分批查询或使用临时表
```

**问题 3: 类型不匹配**
```java
List<String> ids = Arrays.asList("1", "2", "3");  // String 类型

// SQL: WHERE id IN ('1', '2', '3')  // 可能有性能问题
// 应该: List<Long> ids = Arrays.asList(1L, 2L, 3L);
```

**关键要点**

1. **单 List**: 用 `collection="list"`,推荐加 @Param
2. **多 List**: 必须用 @Param 区分
3. **空 List**: 必须判空,避免 SQL 语法错误
4. **批量操作**: 配合 foreach 实现插入/更新/删除
5. **性能优化**: 大 List 分批处理,控制 IN 条件数量

**记忆口诀**

📋 **List 参数要点**
- 单 List 用 "list"
- 多 List 加 @Param
- 空 List 要判断
- 配 foreach 标签
- 大 List 要分批
