## SQL 映射

### 22. MyBatis 的 SQL 映射标签有哪些?

**核心答案**

MyBatis 的 SQL 映射标签分为四大类：**基础操作标签**（select、insert、update、delete）、**结果映射标签**（resultMap、association、collection）、**动态 SQL 标签**（if、choose、where、set、foreach、trim）、**其他辅助标签**（sql、include、bind）。

**详细说明**

1. **标签分类全景图**

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.subtitle{font:bold 14px sans-serif;fill:#555}.label{font:12px sans-serif;fill:#333}.tag{font:11px monospace;fill:#d63384}.desc{font:10px sans-serif;fill:#666}.box{fill:#fff;stroke:#0d6efd;stroke-width:2}.category{fill:#e7f3ff;stroke:#0d6efd;stroke-width:2}.tag-box{fill:#fff;stroke:#6c757d;stroke-width:1.5}.line{stroke:#999;stroke-width:1.5}</style></defs>
<text x="450" y="25" text-anchor="middle" class="title">MyBatis SQL 映射标签全景</text>
<g id="category1">
<rect x="20" y="50" width="200" height="280" rx="8" class="category"/>
<text x="120" y="75" text-anchor="middle" class="subtitle">基础操作标签</text>
<rect x="30" y="90" width="180" height="50" rx="5" class="tag-box"/>
<text x="40" y="108" class="tag">&lt;select&gt;</text>
<text x="40" y="123" class="desc">查询语句，返回结果集</text>
<text x="40" y="135" class="desc" font-style="italic">最常用，支持复杂查询</text>
<rect x="30" y="150" width="180" height="50" rx="5" class="tag-box"/>
<text x="40" y="168" class="tag">&lt;insert&gt;</text>
<text x="40" y="183" class="desc">插入语句，返回影响行数</text>
<text x="40" y="195" class="desc" font-style="italic">支持获取自增主键</text>
<rect x="30" y="210" width="180" height="50" rx="5" class="tag-box"/>
<text x="40" y="228" class="tag">&lt;update&gt;</text>
<text x="40" y="243" class="desc">更新语句，返回影响行数</text>
<text x="40" y="255" class="desc" font-style="italic">常用于修改数据</text>
<rect x="30" y="270" width="180" height="50" rx="5" class="tag-box"/>
<text x="40" y="288" class="tag">&lt;delete&gt;</text>
<text x="40" y="303" class="desc">删除语句，返回影响行数</text>
<text x="40" y="315" class="desc" font-style="italic">物理删除数据</text>
</g>
<g id="category2">
<rect x="240" y="50" width="200" height="280" rx="8" class="category"/>
<text x="340" y="75" text-anchor="middle" class="subtitle">结果映射标签</text>
<rect x="250" y="90" width="180" height="55" rx="5" class="tag-box"/>
<text x="260" y="108" class="tag">&lt;resultMap&gt;</text>
<text x="260" y="123" class="desc">自定义结果映射</text>
<text x="260" y="135" class="desc" font-style="italic">处理复杂对象映射</text>
<rect x="250" y="155" width="180" height="50" rx="5" class="tag-box"/>
<text x="260" y="173" class="tag">&lt;association&gt;</text>
<text x="260" y="188" class="desc">一对一关联映射</text>
<text x="260" y="200" class="desc" font-style="italic">嵌套对象属性</text>
<rect x="250" y="215" width="180" height="50" rx="5" class="tag-box"/>
<text x="260" y="233" class="tag">&lt;collection&gt;</text>
<text x="260" y="248" class="desc">一对多关联映射</text>
<text x="260" y="260" class="desc" font-style="italic">集合属性映射</text>
<rect x="250" y="275" width="180" height="48" rx="5" class="tag-box"/>
<text x="260" y="293" class="tag">&lt;discriminator&gt;</text>
<text x="260" y="308" class="desc">鉴别器，根据条件映射</text>
</g>
<g id="category3">
<rect x="460" y="50" width="200" height="280" rx="8" class="category"/>
<text x="560" y="75" text-anchor="middle" class="subtitle">动态 SQL 标签</text>
<rect x="470" y="90" width="180" height="35" rx="5" class="tag-box"/>
<text x="480" y="108" class="tag">&lt;if&gt;</text>
<text x="480" y="120" class="desc">条件判断</text>
<rect x="470" y="133" width="180" height="35" rx="5" class="tag-box"/>
<text x="480" y="151" class="tag">&lt;choose&gt; &lt;when&gt; &lt;otherwise&gt;</text>
<text x="480" y="163" class="desc">多条件分支（类似 switch）</text>
<rect x="470" y="176" width="180" height="35" rx="5" class="tag-box"/>
<text x="480" y="194" class="tag">&lt;where&gt;</text>
<text x="480" y="206" class="desc">智能 WHERE 子句</text>
<rect x="470" y="219" width="180" height="35" rx="5" class="tag-box"/>
<text x="480" y="237" class="tag">&lt;set&gt;</text>
<text x="480" y="249" class="desc">智能 SET 子句</text>
<rect x="470" y="262" width="180" height="35" rx="5" class="tag-box"/>
<text x="480" y="280" class="tag">&lt;foreach&gt;</text>
<text x="480" y="292" class="desc">循环迭代（批量操作）</text>
<rect x="470" y="305" width="180" height="35" rx="5" class="tag-box"/>
<text x="480" y="323" class="tag">&lt;trim&gt;</text>
<text x="480" y="335" class="desc">自定义字符串截取</text>
</g>
<g id="category4">
<rect x="680" y="50" width="200" height="280" rx="8" class="category"/>
<text x="780" y="75" text-anchor="middle" class="subtitle">其他辅助标签</text>
<rect x="690" y="90" width="180" height="50" rx="5" class="tag-box"/>
<text x="700" y="108" class="tag">&lt;sql&gt;</text>
<text x="700" y="123" class="desc">SQL 片段定义</text>
<text x="700" y="135" class="desc" font-style="italic">复用 SQL 代码</text>
<rect x="690" y="150" width="180" height="50" rx="5" class="tag-box"/>
<text x="700" y="168" class="tag">&lt;include&gt;</text>
<text x="700" y="183" class="desc">引用 SQL 片段</text>
<text x="700" y="195" class="desc" font-style="italic">配合 &lt;sql&gt; 使用</text>
<rect x="690" y="210" width="180" height="50" rx="5" class="tag-box"/>
<text x="700" y="228" class="tag">&lt;bind&gt;</text>
<text x="700" y="243" class="desc">创建变量绑定</text>
<text x="700" y="255" class="desc" font-style="italic">用于 OGNL 表达式</text>
<rect x="690" y="270" width="180" height="50" rx="5" class="tag-box"/>
<text x="700" y="288" class="tag">&lt;cache&gt;</text>
<text x="700" y="303" class="desc">二级缓存配置</text>
<text x="700" y="315" class="desc" font-style="italic">Mapper 级别缓存</text>
</g>
<g id="examples">
<rect x="20" y="350" width="860" height="280" fill="#f8f9fa" stroke="#ddd" stroke-width="2" rx="8"/>
<text x="450" y="375" text-anchor="middle" class="subtitle">标签使用频率与组合</text>
<rect x="40" y="390" width="250" height="80" fill="#fff" stroke="#198754" stroke-width="2" rx="5"/>
<text x="165" y="410" text-anchor="middle" font-size="13" font-weight="bold" fill="#198754">高频组合 (90%)</text>
<text x="50" y="430" font-size="11" fill="#333">&lt;select&gt; + &lt;if&gt; + &lt;where&gt;</text>
<text x="50" y="448" font-size="11" fill="#333">&lt;update&gt; + &lt;if&gt; + &lt;set&gt;</text>
<text x="50" y="466" font-size="11" fill="#333">&lt;insert&gt; + &lt;foreach&gt;</text>
<rect x="310" y="390" width="270" height="80" fill="#fff" stroke="#0d6efd" stroke-width="2" rx="5"/>
<text x="445" y="410" text-anchor="middle" font-size="13" font-weight="bold" fill="#0d6efd">中频组合 (8%)</text>
<text x="320" y="430" font-size="11" fill="#333">&lt;select&gt; + &lt;resultMap&gt; + &lt;association&gt;</text>
<text x="320" y="448" font-size="11" fill="#333">&lt;select&gt; + &lt;choose&gt; + &lt;when&gt;</text>
<text x="320" y="466" font-size="11" fill="#333">&lt;sql&gt; + &lt;include&gt;</text>
<rect x="600" y="390" width="260" height="80" fill="#fff" stroke="#ffc107" stroke-width="2" rx="5"/>
<text x="730" y="410" text-anchor="middle" font-size="13" font-weight="bold" fill="#e67e00">低频组合 (2%)</text>
<text x="610" y="430" font-size="11" fill="#333">&lt;bind&gt; + 动态条件</text>
<text x="610" y="448" font-size="11" fill="#333">&lt;discriminator&gt; 鉴别器</text>
<text x="610" y="466" font-size="11" fill="#333">&lt;trim&gt; 自定义截取</text>
<text x="40" y="500" font-size="12" font-weight="bold" fill="#555">典型场景示例:</text>
<rect x="40" y="510" width="820" height="110" fill="#fff" stroke="#6c757d" stroke-width="1" rx="3"/>
<text x="50" y="530" font-size="11" font-family="monospace" fill="#d63384">&lt;select id="findUsers" resultType="User"&gt;</text>
<text x="60" y="547" font-size="11" font-family="monospace" fill="#666">SELECT &lt;include refid="baseColumns"/&gt; FROM user</text>
<text x="60" y="564" font-size="11" font-family="monospace" fill="#d63384">&lt;where&gt;</text>
<text x="70" y="581" font-size="11" font-family="monospace" fill="#d63384">&lt;if test="name != null"&gt;</text>
<text x="80" y="598" font-size="11" font-family="monospace" fill="#666">AND name LIKE CONCAT('%', #{name}, '%')</text>
<text x="70" y="612" font-size="11" font-family="monospace" fill="#d63384">&lt;/if&gt;</text>
<text x="60" y="625" font-size="11" font-family="monospace" fill="#d63384">&lt;/where&gt;</text>
<text x="50" y="642" font-size="11" font-family="monospace" fill="#d63384">&lt;/select&gt;</text>
</g>
</svg>

2. **标签详细说明表**

| 标签 | 作用 | 常用属性 | 使用频率 |
|-----|------|---------|---------|
| **基础操作** |
| `<select>` | 查询操作 | id, resultType, resultMap, parameterType | ★★★★★ |
| `<insert>` | 插入操作 | id, parameterType, useGeneratedKeys, keyProperty | ★★★★★ |
| `<update>` | 更新操作 | id, parameterType | ★★★★★ |
| `<delete>` | 删除操作 | id, parameterType | ★★★★☆ |
| **结果映射** |
| `<resultMap>` | 自定义结果映射 | id, type, extends, autoMapping | ★★★★☆ |
| `<association>` | 一对一关联 | property, javaType, select, resultMap | ★★★☆☆ |
| `<collection>` | 一对多关联 | property, ofType, select, resultMap | ★★★☆☆ |
| `<discriminator>` | 鉴别器 | column, javaType | ★☆☆☆☆ |
| **动态 SQL** |
| `<if>` | 条件判断 | test | ★★★★★ |
| `<choose>` | 多分支选择 | - | ★★★☆☆ |
| `<when>` | 分支条件 | test | ★★★☆☆ |
| `<otherwise>` | 默认分支 | - | ★★★☆☆ |
| `<where>` | 智能 WHERE | - | ★★★★★ |
| `<set>` | 智能 SET | - | ★★★★☆ |
| `<foreach>` | 循环迭代 | collection, item, index, open, close, separator | ★★★★☆ |
| `<trim>` | 字符串截取 | prefix, suffix, prefixOverrides, suffixOverrides | ★★☆☆☆ |
| **其他辅助** |
| `<sql>` | SQL 片段 | id | ★★★☆☆ |
| `<include>` | 引用片段 | refid | ★★★☆☆ |
| `<bind>` | 变量绑定 | name, value | ★★☆☆☆ |
| `<cache>` | 二级缓存 | eviction, flushInterval, size, readOnly | ★☆☆☆☆ |

3. **常见标签组合模式**

**模式 1：动态查询**
```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  <where>
    <if test="name != null">AND name = #{name}</if>
    <if test="age != null">AND age = #{age}</if>
  </where>
</select>
```

**模式 2：动态更新**
```xml
<update id="updateUser">
  UPDATE user
  <set>
    <if test="name != null">name = #{name},</if>
    <if test="age != null">age = #{age},</if>
  </set>
  WHERE id = #{id}
</update>
```

**模式 3：批量操作**
```xml
<insert id="batchInsert">
  INSERT INTO user (name, age) VALUES
  <foreach collection="list" item="user" separator=",">
    (#{user.name}, #{user.age})
  </foreach>
</insert>
```

**模式 4：SQL 复用**
```xml
<sql id="baseColumns">
  id, name, age, email, create_time
</sql>

<select id="findById" resultType="User">
  SELECT <include refid="baseColumns"/> FROM user WHERE id = #{id}
</select>
```

**关键要点**

1. **必须掌握的标签（Top 5）**
   - `<select>`、`<insert>`、`<update>`、`<delete>` - 基础 CRUD
   - `<if>` + `<where>` - 动态查询（最常用）
   - `<foreach>` - 批量操作
   - `<resultMap>` - 复杂映射
   - `<sql>` + `<include>` - 代码复用

2. **标签使用原则**
   - 优先使用高级标签（`<where>`、`<set>`）避免手动拼接
   - 复杂映射用 `<resultMap>`，简单映射用 `resultType`
   - SQL 重复代码提取为 `<sql>` 片段
   - 动态条件必用 `<if>` + `<where>` 组合

3. **性能注意事项**
   - `<association>` 和 `<collection>` 避免 N+1 问题
   - `<foreach>` 批量操作控制数量（建议 ≤ 1000）
   - `<cache>` 二级缓存谨慎使用
   - 动态 SQL 过多影响性能

**记忆口诀**

```
四大操作增删改查，结果映射 resultMap
动态 SQL if where 用，批量 foreach 不可少
sql include 复用妙，bind 变量偶尔搞
choose when 做分支，trim 截取少人知
```

### 23. #{}和${}的区别是什么?

**核心答案**

`#{}` 是预编译参数占位符（推荐），使用 PreparedStatement，能防止 SQL 注入；`${}` 是字符串替换，直接拼接 SQL，存在注入风险，仅用于表名、列名等不能用占位符的场景。

**详细说明**

1. **核心区别对比**

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.subtitle{font:bold 14px sans-serif;fill:#555}.label{font:12px sans-serif;fill:#333}.code{font:11px monospace;fill:#d63384}.desc{font:11px sans-serif;fill:#666}.safe{fill:#d1e7dd;stroke:#198754;stroke-width:2}.unsafe{fill:#f8d7da;stroke:#dc3545;stroke-width:2}.box{fill:#fff;stroke:#0d6efd;stroke-width:2}.line{stroke:#999;stroke-width:1.5}</style></defs>
<text x="450" y="25" text-anchor="middle" class="title">#{} vs ${} 完整对比</text>
<g id="param-box">
<rect x="50" y="50" width="350" height="240" rx="8" class="safe"/>
<text x="225" y="75" text-anchor="middle" class="subtitle" fill="#198754">#{} 参数占位符 (推荐)</text>
<text x="70" y="105" class="label" font-weight="bold">原始 SQL:</text>
<text x="70" y="125" class="code">SELECT * FROM user WHERE name = #{name}</text>
<line x1="60" y1="135" x2="390" y2="135" class="line"/>
<text x="70" y="155" class="label" font-weight="bold">编译后 SQL:</text>
<text x="70" y="175" class="code">SELECT * FROM user WHERE name = ?</text>
<line x1="60" y1="185" x2="390" y2="185" class="line"/>
<text x="70" y="205" class="label" font-weight="bold">执行时:</text>
<text x="70" y="225" class="desc">PreparedStatement.setString(1, "admin")</text>
<text x="70" y="242" class="desc">最终: WHERE name = 'admin'</text>
<text x="70" y="265" font-size="12" fill="#198754" font-weight="bold">✓ 预编译，防止 SQL 注入</text>
<text x="70" y="282" font-size="12" fill="#198754" font-weight="bold">✓ 性能更好（SQL 可缓存）</text>
</g>
<g id="string-box">
<rect x="500" y="50" width="350" height="240" rx="8" class="unsafe"/>
<text x="675" y="75" text-anchor="middle" class="subtitle" fill="#dc3545">${} 字符串替换 (谨慎)</text>
<text x="520" y="105" class="label" font-weight="bold">原始 SQL:</text>
<text x="520" y="125" class="code">SELECT * FROM user WHERE name = '${name}'</text>
<line x1="510" y1="135" x2="840" y2="135" class="line"/>
<text x="520" y="155" class="label" font-weight="bold">编译后 SQL:</text>
<text x="520" y="175" class="code">SELECT * FROM user WHERE name = 'admin'</text>
<line x1="510" y1="185" x2="840" y2="185" class="line"/>
<text x="520" y="205" class="label" font-weight="bold">执行时:</text>
<text x="520" y="225" class="desc">直接执行 SQL（字符串已替换）</text>
<text x="520" y="242" class="desc">最终: WHERE name = 'admin'</text>
<text x="520" y="265" font-size="12" fill="#dc3545" font-weight="bold">✗ 字符串拼接，有注入风险</text>
<text x="520" y="282" font-size="12" fill="#dc3545" font-weight="bold">✗ SQL 无法缓存</text>
</g>
<g id="injection-example">
<rect x="50" y="310" width="800" height="220" fill="#fff3cd" stroke="#ffc107" stroke-width="3" rx="8"/>
<text x="450" y="335" text-anchor="middle" class="subtitle" fill="#e67e00">SQL 注入风险演示</text>
<rect x="70" y="350" width="360" height="160" fill="#fff" stroke="#198754" stroke-width="2" rx="5"/>
<text x="250" y="370" text-anchor="middle" font-size="13" fill="#198754" font-weight="bold">#{} 安全示例</text>
<text x="80" y="395" class="label">用户输入: <tspan class="code">admin' OR '1'='1</tspan></text>
<text x="80" y="415" class="code">SQL: SELECT * FROM user</text>
<text x="90" y="432" class="code">WHERE name = #{name}</text>
<line x1="80" y1="445" x2="420" y2="445" stroke="#ddd" stroke-width="1"/>
<text x="80" y="462" class="desc">实际执行:</text>
<text x="80" y="479" class="code" fill="#198754">WHERE name = 'admin'' OR ''1''=''1'</text>
<text x="80" y="496" class="desc" fill="#198754" font-weight="bold">参数被转义，查询失败，安全！</text>
<rect x="470" y="350" width="360" height="160" fill="#fff" stroke="#dc3545" stroke-width="2" rx="5"/>
<text x="650" y="370" text-anchor="middle" font-size="13" fill="#dc3545" font-weight="bold">${} 危险示例</text>
<text x="480" y="395" class="label">用户输入: <tspan class="code">admin' OR '1'='1</tspan></text>
<text x="480" y="415" class="code">SQL: SELECT * FROM user</text>
<text x="490" y="432" class="code">WHERE name = '${name}'</text>
<line x1="480" y1="445" x2="820" y2="445" stroke="#ddd" stroke-width="1"/>
<text x="480" y="462" class="desc">实际执行:</text>
<text x="480" y="479" class="code" fill="#dc3545">WHERE name = 'admin' OR '1'='1'</text>
<text x="480" y="496" class="desc" fill="#dc3545" font-weight="bold">SQL 注入成功，返回所有数据！</text>
</g>
</svg>

2. **详细对比表**

| 对比维度 | #{} | ${} |
|---------|-----|-----|
| **处理方式** | 预编译参数占位符 | 字符串替换 |
| **JDBC 实现** | PreparedStatement | Statement |
| **SQL 安全性** | ✓ 防止 SQL 注入 | ✗ 存在注入风险 |
| **性能** | ✓ SQL 可缓存，性能好 | ✗ 每次都编译，性能差 |
| **参数类型** | 自动类型转换 | 只能是字符串 |
| **引号处理** | 自动添加引号 | 需要手动添加 |
| **使用场景** | WHERE 条件、INSERT 值 | 表名、列名、ORDER BY |
| **推荐程度** | ★★★★★ 优先使用 | ★☆☆☆☆ 特殊场景 |

3. **适用场景对比**

**#{} 适用场景（99%）**

```xml
<!-- 1. WHERE 条件查询 -->
<select id="findById" resultType="User">
  SELECT * FROM user WHERE id = #{id}
</select>

<!-- 2. INSERT 插入值 -->
<insert id="insert">
  INSERT INTO user (name, age) VALUES (#{name}, #{age})
</insert>

<!-- 3. UPDATE 更新值 -->
<update id="update">
  UPDATE user SET name = #{name} WHERE id = #{id}
</update>

<!-- 4. LIKE 模糊查询 -->
<select id="findByName" resultType="User">
  SELECT * FROM user
  WHERE name LIKE CONCAT('%', #{name}, '%')
</select>

<!-- 5. IN 查询 -->
<select id="findByIds" resultType="User">
  SELECT * FROM user WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</select>
```

**${} 适用场景（1%，特殊需求）**

```xml
<!-- 1. 动态表名（不推荐，建议用 Map 映射） -->
<select id="findByTable" resultType="Map">
  SELECT * FROM ${tableName} WHERE id = #{id}
</select>

<!-- 2. 动态列名 -->
<select id="findByColumn" resultType="User">
  SELECT ${columnName} FROM user WHERE id = #{id}
</select>

<!-- 3. ORDER BY 排序字段（必须白名单校验） -->
<select id="findWithOrder" resultType="User">
  SELECT * FROM user ORDER BY ${orderColumn} ${orderType}
</select>

<!-- 4. 动态 SQL 片段 -->
<select id="findWithCondition" resultType="User">
  SELECT * FROM user ${whereClause}
</select>
```

4. **安全使用 ${} 的方法**

```java
// ❌ 错误：直接使用用户输入
public List<User> findUsers(String tableName) {
  return mapper.findByTable(tableName); // SQL 注入风险！
}

// ✓ 正确：白名单校验
public List<User> findUsers(String tableName) {
  // 白名单校验
  Set<String> allowedTables = Set.of("user", "admin", "customer");
  if (!allowedTables.contains(tableName)) {
    throw new IllegalArgumentException("Invalid table name");
  }
  return mapper.findByTable(tableName);
}

// ✓ 正确：使用枚举
public enum OrderColumn {
  NAME("name"), AGE("age"), CREATE_TIME("create_time");
  private final String column;
  // ...
}

public List<User> findWithOrder(OrderColumn orderColumn) {
  return mapper.findWithOrder(orderColumn.getColumn(), "ASC");
}
```

5. **性能对比**

```
场景: 查询用户 1000 次

#{} 方式:
- 首次: 编译 SQL + 执行 (10ms)
- 后续: 使用缓存 (1ms × 999)
- 总耗时: ≈ 1009ms

${} 方式:
- 每次: 编译 SQL + 执行 (10ms × 1000)
- 总耗时: ≈ 10000ms

性能差距: ${} 慢约 10 倍！
```

**关键要点**

1. **强制规则**
   - 99% 场景使用 `#{}`，1% 特殊场景用 `${}`
   - `${}` 必须配合白名单校验
   - 永远不要直接用 `${}` 接收用户输入

2. **#{} 优势**
   - 预编译，防止 SQL 注入
   - 性能更好，SQL 可缓存
   - 自动类型转换和引号处理

3. **${} 使用场景**
   - 动态表名/列名（必须白名单）
   - ORDER BY 排序字段（必须枚举）
   - 特殊 SQL 片段（完全可控）

4. **LIKE 查询注意**
   ```xml
   <!-- ✓ 正确 -->
   WHERE name LIKE CONCAT('%', #{name}, '%')

   <!-- ✗ 错误 -->
   WHERE name LIKE '%${name}%'  ← SQL 注入风险！
   ```

**记忆口诀**

```
井号预编译，安全又高效
美元字符串，注入风险多
参数传值用井号，表名列名用美元
美元必须加校验，白名单枚举保安全
十次有九用井号，一次美元要谨慎
```

### 24. 如何防止 SQL 注入?

**核心答案**

防止 SQL 注入的核心方法：**优先使用 `#{}` 预编译参数**，避免使用 `${}`；必须使用 `${}` 时进行**白名单校验**；对用户输入进行**严格校验和转义**。

**详细说明**

1. **SQL 注入攻击原理**

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.subtitle{font:bold 13px sans-serif;fill:#555}.label{font:12px sans-serif;fill:#333}.code{font:11px monospace;fill:#d63384}.desc{font:10px sans-serif;fill:#666}.danger{fill:#f8d7da;stroke:#dc3545;stroke-width:2}.safe{fill:#d1e7dd;stroke:#198754;stroke-width:2}.warning{fill:#fff3cd;stroke:#ffc107;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrow)}</style><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs>
<text x="450" y="25" text-anchor="middle" class="title">SQL 注入防护完整方案</text>
<g id="attack-flow">
<rect x="50" y="50" width="800" height="180" rx="8" class="danger"/>
<text x="450" y="75" text-anchor="middle" class="subtitle" fill="#dc3545">❌ SQL 注入攻击流程</text>
<rect x="70" y="90" width="180" height="120" fill="#fff" stroke="#dc3545" stroke-width="2" rx="5"/>
<text x="160" y="110" text-anchor="middle" class="label" font-weight="bold">1. 恶意输入</text>
<text x="80" y="130" class="code">username:</text>
<text x="80" y="147" class="code" fill="#dc3545">admin' OR '1'='1</text>
<text x="80" y="164" class="code">password:</text>
<text x="80" y="181" class="code" fill="#dc3545">anything</text>
<text x="80" y="198" class="desc">攻击者构造恶意输入</text>
<line x1="250" y1="150" x2="290" y2="150" class="arrow"/>
<rect x="290" y="90" width="220" height="120" fill="#fff" stroke="#dc3545" stroke-width="2" rx="5"/>
<text x="400" y="110" text-anchor="middle" class="label" font-weight="bold">2. 拼接 SQL (${} 方式)</text>
<text x="300" y="130" class="code" font-size="10">SELECT * FROM user</text>
<text x="300" y="145" class="code" font-size="10">WHERE username='${username}'</text>
<text x="300" y="160" class="code" font-size="10">AND password='${password}'</text>
<line x1="300" y1="170" x2="500" y2="170" stroke="#ddd" stroke-width="1"/>
<text x="300" y="185" class="desc">变成:</text>
<text x="300" y="198" class="code" font-size="9" fill="#dc3545">WHERE username='admin'</text>
<text x="300" y="210" class="code" font-size="9" fill="#dc3545">OR '1'='1' AND password='...'</text>
<line x1="510" y1="150" x2="550" y2="150" class="arrow"/>
<rect x="550" y="90" width="270" height="120" fill="#fff" stroke="#dc3545" stroke-width="2" rx="5"/>
<text x="685" y="110" text-anchor="middle" class="label" font-weight="bold">3. 注入成功</text>
<text x="560" y="135" class="code" font-size="10" fill="#dc3545">WHERE username='admin' OR '1'='1'</text>
<text x="560" y="150" class="code" font-size="10" fill="#dc3545">AND password='anything'</text>
<line x1="560" y1="160" x2="810" y2="160" stroke="#ddd" stroke-width="1"/>
<text x="560" y="178" class="desc">条件 '1'='1' 永远为真</text>
<text x="560" y="193" class="desc" fill="#dc3545" font-weight="bold">绕过密码验证，返回所有用户！</text>
<text x="560" y="208" class="desc" fill="#dc3545" font-weight="bold">攻击者获得所有数据访问权限</text>
</g>
<g id="defense">
<rect x="50" y="250" width="800" height="230" rx="8" class="safe"/>
<text x="450" y="275" text-anchor="middle" class="subtitle" fill="#198754">✓ 正确的防护方案</text>
<rect x="70" y="290" width="240" height="170" fill="#fff" stroke="#198754" stroke-width="2" rx="5"/>
<text x="190" y="310" text-anchor="middle" class="label" font-weight="bold">方案 1: 使用 #{} (推荐)</text>
<text x="80" y="335" class="code" font-size="10">SELECT * FROM user</text>
<text x="80" y="350" class="code" font-size="10">WHERE username = #{username}</text>
<text x="80" y="365" class="code" font-size="10">AND password = #{password}</text>
<line x1="80" y1="375" x2="300" y2="375" stroke="#ddd" stroke-width="1"/>
<text x="80" y="390" class="desc">编译为:</text>
<text x="80" y="405" class="code" font-size="9" fill="#198754">WHERE username = ?</text>
<text x="80" y="418" class="code" font-size="9" fill="#198754">AND password = ?</text>
<text x="80" y="433" class="desc">参数:</text>
<text x="80" y="446" class="code" font-size="9" fill="#198754">"admin' OR '1'='1" (被转义)</text>
<rect x="330" y="290" width="240" height="170" fill="#fff" stroke="#198754" stroke-width="2" rx="5"/>
<text x="450" y="310" text-anchor="middle" class="label" font-weight="bold">方案 2: 白名单校验</text>
<text x="340" y="330" class="code" font-size="10">// 使用 ${} 前先校验</text>
<text x="340" y="345" class="code" font-size="10">Set&lt;String&gt; allowed =</text>
<text x="350" y="360" class="code" font-size="10">Set.of("id", "name", "age");</text>
<text x="340" y="378" class="code" font-size="10">if (!allowed.contains(</text>
<text x="350" y="393" class="code" font-size="10">orderColumn)) {</text>
<text x="350" y="408" class="code" font-size="10">throw new Exception();</text>
<text x="340" y="423" class="code" font-size="10">}</text>
<text x="340" y="448" class="desc" fill="#198754" font-weight="bold">只允许预定义的值</text>
<rect x="590" y="290" width="240" height="170" fill="#fff" stroke="#198754" stroke-width="2" rx="5"/>
<text x="710" y="310" text-anchor="middle" class="label" font-weight="bold">方案 3: 输入校验</text>
<text x="600" y="330" class="code" font-size="10">// 1. 长度限制</text>
<text x="600" y="345" class="code" font-size="10">if (name.length() &gt; 50)</text>
<text x="610" y="360" class="code" font-size="10">throw exception;</text>
<text x="600" y="378" class="code" font-size="10">// 2. 格式校验</text>
<text x="600" y="393" class="code" font-size="10">Pattern.matches("[a-zA-Z0-9]+"</text>
<text x="610" y="408" class="code" font-size="10">, input);</text>
<text x="600" y="426" class="code" font-size="10">// 3. 敏感字符过滤</text>
<text x="600" y="441" class="code" font-size="10">filter("'", ";", "--")</text>
</g>
</svg>

2. **防护方案详解**

**方案 1：使用 #{} 预编译（最重要）**

```xml
<!-- ✓ 正确：使用 #{} -->
<select id="login" resultType="User">
  SELECT * FROM user
  WHERE username = #{username} AND password = #{password}
</select>

<!-- ✗ 错误：使用 ${} -->
<select id="login" resultType="User">
  SELECT * FROM user
  WHERE username = '${username}' AND password = '${password}'
</select>
```

```java
// 原理：PreparedStatement 自动转义
String sql = "SELECT * FROM user WHERE username = ? AND password = ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setString(1, "admin' OR '1'='1"); // 自动转义为 "admin'' OR ''1''=''1"
ps.setString(2, "password");
```

**方案 2：${}白名单校验（必须）**

```java
// ✓ 正确：白名单校验
public List<User> findByOrder(String orderColumn, String orderType) {
  // 1. 列名白名单
  Set<String> allowedColumns = Set.of("id", "name", "age", "create_time");
  if (!allowedColumns.contains(orderColumn)) {
    throw new IllegalArgumentException("Invalid order column");
  }

  // 2. 排序方向白名单
  Set<String> allowedTypes = Set.of("ASC", "DESC");
  if (!allowedTypes.contains(orderType.toUpperCase())) {
    throw new IllegalArgumentException("Invalid order type");
  }

  return mapper.findByOrder(orderColumn, orderType);
}

// ✓ 更好：使用枚举
public enum OrderColumn {
  ID("id"), NAME("name"), AGE("age"), CREATE_TIME("create_time");

  private final String column;
  OrderColumn(String column) { this.column = column; }
  public String getColumn() { return column; }
}

public List<User> findByOrder(OrderColumn column, OrderType type) {
  return mapper.findByOrder(column.getColumn(), type.name());
}
```

**方案 3：输入校验**

```java
// 1. 长度限制
@Size(max = 50, message = "用户名不能超过50个字符")
private String username;

// 2. 格式校验
@Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "用户名只能包含字母、数字和下划线")
private String username;

// 3. 自定义校验
public boolean isValidInput(String input) {
  // 黑名单：拒绝危险字符
  String[] blackList = {"'", "\"", ";", "--", "/*", "*/", "xp_", "sp_", "exec", "execute", "union", "select", "drop", "delete", "update", "insert"};
  for (String keyword : blackList) {
    if (input.toLowerCase().contains(keyword.toLowerCase())) {
      return false;
    }
  }
  return true;
}
```

**方案 4：特殊场景处理**

```xml
<!-- LIKE 查询 -->
<!-- ✓ 正确 -->
<select id="findByName" resultType="User">
  SELECT * FROM user
  WHERE name LIKE CONCAT('%', #{name}, '%')
</select>

<!-- ✗ 错误 -->
<select id="findByName" resultType="User">
  SELECT * FROM user
  WHERE name LIKE '%${name}%'
</select>

<!-- IN 查询 -->
<!-- ✓ 正确：使用 foreach -->
<select id="findByIds" resultType="User">
  SELECT * FROM user WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</select>

<!-- ✗ 错误 -->
<select id="findByIds" resultType="User">
  SELECT * FROM user WHERE id IN (${ids})
</select>
```

3. **防护级别对比**

| 防护级别 | 方案 | 安全性 | 使用场景 |
|---------|------|--------|---------|
| **L1 最高** | 全部使用 `#{}`，无 `${}` | ★★★★★ | 90% 场景 |
| **L2 高** | `${}` + 枚举白名单 | ★★★★☆ | ORDER BY、动态列名 |
| **L3 中** | `${}` + 字符串白名单 | ★★★☆☆ | 动态表名 |
| **L4 低** | `${}` + 格式校验 | ★★☆☆☆ | 特殊场景（不推荐）|
| **L5 危险** | `${}` 无校验 | ★☆☆☆☆ | 禁止使用！ |

4. **常见注入攻击与防护**

```java
// 攻击 1：万能密码
// 输入: username = admin' OR '1'='1' --
// 防护: 使用 #{username}

// 攻击 2：联合查询
// 输入: id = 1' UNION SELECT username, password FROM admin --
// 防护: 使用 #{id}

// 攻击 3：批量删除
// 输入: id = 1'; DROP TABLE user; --
// 防护: 使用 #{id}

// 攻击 4：时间盲注
// 输入: id = 1' AND SLEEP(5) --
// 防护: 使用 #{id}

// 攻击 5：报错注入
// 输入: id = 1' AND extractvalue(1, concat(0x7e, (SELECT version()))) --
// 防护: 使用 #{id}
```

**关键要点**

1. **三大核心原则**
   - **优先使用 `#{}`** - 99% 场景的首选
   - **必须白名单校验** - 使用 `${}` 时的强制要求
   - **输入严格验证** - 长度、格式、内容三重检查

2. **强制规则**
   - 永远不要信任用户输入
   - `${}` 必须配合白名单或枚举
   - 禁止在 WHERE 条件中使用 `${}`
   - LIKE 查询使用 CONCAT + `#{}`

3. **额外防护措施**
   - 使用最小权限数据库账号
   - 开启数据库审计日志
   - 定期进行安全扫描
   - 使用 WAF（Web 应用防火墙）

4. **代码审查检查点**
   - 搜索所有 `${}` 使用
   - 检查是否有白名单校验
   - 验证参数是否经过转义
   - 确认无字符串拼接 SQL

**记忆口诀**

```
井号预编译，注入攻不破
美元要谨慎，白名单必过
用户输入验，长度格式查
LIKE 用 CONCAT，IN 用 foreach 夸
表名列名枚举化，排序字段莫乱搭
三大防线层层守，SQL 注入无处躲
```

### 25. 什么是动态 SQL?

**核心答案**

动态 SQL 是 MyBatis 根据运行时条件动态生成 SQL 语句的机制，通过 `<if>`、`<where>`、`<foreach>` 等标签实现 SQL 的条件拼接，避免手动字符串拼接的复杂性和安全风险。

**详细说明**

1. **动态 SQL 核心概念**

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.subtitle{font:bold 13px sans-serif;fill:#555}.label{font:12px sans-serif;fill:#333}.code{font:10px monospace;fill:#d63384}.desc{font:11px sans-serif;fill:#666}.static{fill:#f8d7da;stroke:#dc3545;stroke-width:2}.dynamic{fill:#d1e7dd;stroke:#198754;stroke-width:2}.box{fill:#fff;stroke:#0d6efd;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrow)}</style><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs>
<text x="450" y="25" text-anchor="middle" class="title">静态 SQL vs 动态 SQL</text>
<g id="static-sql">
<rect x="50" y="50" width="380" height="240" rx="8" class="static"/>
<text x="240" y="75" text-anchor="middle" class="subtitle" fill="#dc3545">❌ 静态 SQL（传统方式）</text>
<rect x="70" y="90" width="340" height="180" fill="#fff" stroke="#dc3545" stroke-width="2" rx="5"/>
<text x="80" y="110" class="label" font-weight="bold">问题场景: 多条件查询</text>
<text x="80" y="132" class="code">// 需要根据条件拼接 SQL</text>
<text x="80" y="147" class="code">String sql = "SELECT * FROM user WHERE 1=1";</text>
<text x="80" y="162" class="code">if (name != null) {</text>
<text x="90" y="177" class="code">sql += " AND name = '" + name + "'";</text>
<text x="80" y="192" class="code">}</text>
<text x="80" y="207" class="code">if (age != null) {</text>
<text x="90" y="222" class="code">sql += " AND age = " + age;</text>
<text x="80" y="237" class="code">}</text>
<text x="80" y="255" class="desc" fill="#dc3545" font-weight="bold">✗ 代码冗长繁琐</text>
<text x="80" y="268" class="desc" fill="#dc3545" font-weight="bold">✗ SQL 注入风险</text>
</g>
<g id="dynamic-sql">
<rect x="470" y="50" width="380" height="240" rx="8" class="dynamic"/>
<text x="660" y="75" text-anchor="middle" class="subtitle" fill="#198754">✓ 动态 SQL（MyBatis）</text>
<rect x="490" y="90" width="340" height="180" fill="#fff" stroke="#198754" stroke-width="2" rx="5"/>
<text x="500" y="110" class="label" font-weight="bold">同样场景: MyBatis 动态 SQL</text>
<text x="500" y="132" class="code">&lt;select id="findUsers" resultType="User"&gt;</text>
<text x="510" y="147" class="code">SELECT * FROM user</text>
<text x="510" y="162" class="code">&lt;where&gt;</text>
<text x="520" y="177" class="code">&lt;if test="name != null"&gt;</text>
<text x="530" y="192" class="code">AND name = #{name}</text>
<text x="520" y="207" class="code">&lt;/if&gt;</text>
<text x="520" y="222" class="code">&lt;if test="age != null"&gt;</text>
<text x="530" y="237" class="code">AND age = #{age}</text>
<text x="520" y="252" class="code">&lt;/if&gt;</text>
<text x="510" y="267" class="code">&lt;/where&gt;</text>
<text x="500" y="282" class="code">&lt;/select&gt;</text>
<text x="500" y="300" class="desc" fill="#198754" font-weight="bold">✓ 代码简洁清晰</text>
<text x="500" y="313" class="desc" fill="#198754" font-weight="bold">✓ 安全无注入风险</text>
</g>
<g id="execution-flow">
<rect x="50" y="310" width="800" height="270" rx="8" fill="#f8f9fa" stroke="#0d6efd" stroke-width="2"/>
<text x="450" y="335" text-anchor="middle" class="subtitle" fill="#0d6efd">动态 SQL 执行流程</text>
<rect x="80" y="350" width="200" height="90" rx="5" class="box"/>
<text x="180" y="375" text-anchor="middle" class="label" font-weight="bold">1. 接收参数</text>
<text x="90" y="395" class="desc">name = "张三"</text>
<text x="90" y="410" class="desc">age = null</text>
<text x="90" y="425" class="desc">status = 1</text>
<line x1="280" y1="395" x2="320" y2="395" class="arrow"/>
<rect x="320" y="350" width="200" height="90" rx="5" class="box"/>
<text x="420" y="375" text-anchor="middle" class="label" font-weight="bold">2. 条件判断</text>
<text x="330" y="395" class="desc">name != null ✓</text>
<text x="330" y="410" class="desc">age != null ✗</text>
<text x="330" y="425" class="desc">status != null ✓</text>
<line x1="520" y1="395" x2="560" y2="395" class="arrow"/>
<rect x="560" y="350" width="250" height="90" rx="5" class="box"/>
<text x="685" y="375" text-anchor="middle" class="label" font-weight="bold">3. 生成 SQL</text>
<text x="570" y="395" class="code" font-size="9">SELECT * FROM user</text>
<text x="570" y="410" class="code" font-size="9">WHERE name = ?</text>
<text x="570" y="425" class="code" font-size="9">AND status = ?</text>
<text x="570" y="438" class="desc" fill="#198754">(age 条件被跳过)</text>
<rect x="80" y="460" width="740" height="105" fill="#fff" stroke="#6c757d" stroke-width="1.5" rx="5"/>
<text x="90" y="480" class="label" font-weight="bold">常见动态 SQL 场景:</text>
<text x="100" y="500" class="desc">• <tspan font-weight="bold">多条件查询</tspan> - 用户可选择多个筛选条件</text>
<text x="100" y="517" class="desc">• <tspan font-weight="bold">动态更新</tspan> - 只更新传入的非空字段</text>
<text x="100" y="534" class="desc">• <tspan font-weight="bold">批量操作</tspan> - IN 查询、批量插入/删除</text>
<text x="100" y="551" class="desc">• <tspan font-weight="bold">分支选择</tspan> - 根据不同条件执行不同 SQL</text>
</g>
</svg>

2. **动态 SQL 六大标签**

| 标签 | 作用 | 使用频率 | 典型场景 |
|-----|------|---------|---------|
| **`<if>`** | 单条件判断 | ★★★★★ | 可选查询条件 |
| **`<where>`** | 智能 WHERE 子句 | ★★★★★ | 多条件查询 |
| **`<set>`** | 智能 SET 子句 | ★★★★☆ | 动态更新 |
| **`<foreach>`** | 循环迭代 | ★★★★☆ | IN 查询、批量操作 |
| **`<choose>` `<when>` `<otherwise>`** | 多分支选择 | ★★★☆☆ | 复杂条件分支 |
| **`<trim>`** | 自定义截取 | ★★☆☆☆ | 高级场景 |

3. **典型应用场景**

**场景 1：多条件查询（最常用）**

```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  <where>
    <if test="name != null and name != ''">
      AND name LIKE CONCAT('%', #{name}, '%')
    </if>
    <if test="age != null">
      AND age = #{age}
    </if>
    <if test="status != null">
      AND status = #{status}
    </if>
    <if test="startDate != null and endDate != null">
      AND create_time BETWEEN #{startDate} AND #{endDate}
    </if>
  </where>
</select>
```

**可能生成的 SQL：**
- 无条件：`SELECT * FROM user`
- 只有 name：`SELECT * FROM user WHERE name LIKE '%张三%'`
- name + age：`SELECT * FROM user WHERE name LIKE '%张三%' AND age = 25`

**场景 2：动态更新（按需更新）**

```xml
<update id="updateUser">
  UPDATE user
  <set>
    <if test="name != null">name = #{name},</if>
    <if test="age != null">age = #{age},</if>
    <if test="email != null">email = #{email},</if>
    <if test="status != null">status = #{status},</if>
  </set>
  WHERE id = #{id}
</update>
```

**可能生成的 SQL：**
- 更新 name：`UPDATE user SET name = ? WHERE id = ?`
- 更新 name + age：`UPDATE user SET name = ?, age = ? WHERE id = ?`

**场景 3：批量操作（IN 查询）**

```xml
<select id="findByIds" resultType="User">
  SELECT * FROM user
  WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</select>
```

**生成的 SQL：**
```sql
SELECT * FROM user WHERE id IN (1, 2, 3, 4, 5)
```

**场景 4：分支选择（类似 switch）**

```xml
<select id="findByType" resultType="User">
  SELECT * FROM user
  <where>
    <choose>
      <when test="type == 1">
        AND status = 'ACTIVE' AND level = 'VIP'
      </when>
      <when test="type == 2">
        AND status = 'ACTIVE' AND points > 1000
      </when>
      <otherwise>
        AND status = 'ACTIVE'
      </otherwise>
    </choose>
  </where>
</select>
```

4. **动态 SQL 优势**

**对比传统 JDBC 拼接：**

```java
// ❌ 传统方式（繁琐且危险）
public List<User> findUsers(String name, Integer age, Integer status) {
  StringBuilder sql = new StringBuilder("SELECT * FROM user WHERE 1=1");
  List<Object> params = new ArrayList<>();

  if (name != null && !name.isEmpty()) {
    sql.append(" AND name LIKE ?");
    params.add("%" + name + "%");
  }
  if (age != null) {
    sql.append(" AND age = ?");
    params.add(age);
  }
  if (status != null) {
    sql.append(" AND status = ?");
    params.add(status);
  }

  PreparedStatement ps = conn.prepareStatement(sql.toString());
  for (int i = 0; i < params.size(); i++) {
    ps.setObject(i + 1, params.get(i));
  }
  // ... 执行查询
}

// ✓ MyBatis 动态 SQL（简洁且安全）
// 只需在 XML 中配置，调用时传参即可
List<User> users = mapper.findUsers(name, age, status);
```

**优势总结：**

1. **代码简洁** - 减少 80% 的 SQL 拼接代码
2. **安全可靠** - 自动防止 SQL 注入
3. **易于维护** - SQL 与代码分离，集中管理
4. **可读性好** - XML 标签语义清晰
5. **性能优化** - SQL 可缓存，复用执行计划

**关键要点**

1. **动态 SQL 本质**
   - 根据条件动态生成 SQL
   - 避免手动字符串拼接
   - 框架自动处理边界情况

2. **核心标签组合**
   - `<if>` + `<where>` - 多条件查询
   - `<if>` + `<set>` - 动态更新
   - `<foreach>` - 批量操作
   - `<choose>` - 复杂分支

3. **使用原则**
   - 优先使用 `<where>` 代替 `WHERE 1=1`
   - 优先使用 `<set>` 自动处理逗号
   - 复杂逻辑用 `<choose>` 代替多个 `<if>`
   - 批量操作控制数量（≤1000）

4. **注意事项**
   - `<if>` 条件使用 OGNL 表达式
   - 字符串判断要加 `!= ''`
   - `<where>` 会自动去除第一个 AND/OR
   - `<set>` 会自动去除最后一个逗号

**记忆口诀**

```
动态 SQL 根据条件变，避免手工拼接烦
if 判断条件真或假，where 智能去 AND 加
set 更新逗号自动删，foreach 循环批量办
choose when 分支多选择，trim 截取高手玩
标签组合威力大，SQL 拼接不再难
```

### 26. 动态 SQL 有哪些标签?

**核心答案**

MyBatis 动态 SQL 有 **6 类核心标签**：`<if>` 条件判断、`<where>` 智能 WHERE、`<set>` 智能 SET、`<foreach>` 循环迭代、`<choose>/<when>/<otherwise>` 多分支选择、`<trim>` 自定义截取，以及辅助标签 `<bind>`、`<sql>`、`<include>`。

**详细说明**

1. **动态 SQL 标签全景图**

<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.cat-title{font:bold 13px sans-serif;fill:#fff}.tag-name{font:bold 11px monospace;fill:#d63384}.attr{font:10px monospace;fill:#0d6efd}.desc{font:10px sans-serif;fill:#666}.freq{font:10px sans-serif;fill:#666;font-weight:bold}.core{fill:#0d6efd;stroke:#fff;stroke-width:1}.helper{fill:#6c757d;stroke:#fff;stroke-width:1}.tag-box{fill:#fff;stroke:#0d6efd;stroke-width:1.5;rx:4}</style></defs>
<text x="450" y="25" text-anchor="middle" class="title">MyBatis 动态 SQL 标签完整体系</text>
<g id="core-tags">
<rect x="30" y="50" width="420" height="560" rx="10" class="core"/>
<text x="240" y="75" text-anchor="middle" class="cat-title">核心标签（必须掌握）</text>
<rect x="50" y="90" width="380" height="75" class="tag-box"/>
<text x="60" y="108" class="tag-name">&lt;if test="条件表达式"&gt;</text>
<text x="70" y="125" class="desc">• 单条件判断，最常用的动态标签</text>
<text x="70" y="140" class="desc">• test 属性使用 OGNL 表达式</text>
<text x="70" y="155" class="desc">• 可嵌套使用，支持 AND/OR 逻辑</text>
<text x="350" y="108" class="freq" fill="#198754">★★★★★</text>
<rect x="50" y="175" width="380" height="75" class="tag-box"/>
<text x="60" y="193" class="tag-name">&lt;where&gt;</text>
<text x="70" y="210" class="desc">• 智能添加 WHERE 关键字</text>
<text x="70" y="225" class="desc">• 自动去除第一个 AND 或 OR</text>
<text x="70" y="240" class="desc">• 配合 &lt;if&gt; 实现多条件查询</text>
<text x="350" y="193" class="freq" fill="#198754">★★★★★</text>
<rect x="50" y="260" width="380" height="75" class="tag-box"/>
<text x="60" y="278" class="tag-name">&lt;set&gt;</text>
<text x="70" y="295" class="desc">• 智能添加 SET 关键字</text>
<text x="70" y="310" class="desc">• 自动去除最后一个多余逗号</text>
<text x="70" y="325" class="desc">• 用于 UPDATE 语句的动态字段更新</text>
<text x="350" y="278" class="freq" fill="#198754">★★★★☆</text>
<rect x="50" y="345" width="380" height="90" class="tag-box"/>
<text x="60" y="363" class="tag-name">&lt;foreach collection="集合" item="元素"</text>
<text x="100" y="378" class="tag-name">open="(" close=")" separator=","&gt;</text>
<text x="70" y="395" class="desc">• 循环迭代集合元素</text>
<text x="70" y="410" class="desc">• 用于 IN 查询、批量插入/删除</text>
<text x="70" y="425" class="desc">• 支持 List、Array、Map 类型</text>
<text x="350" y="363" class="freq" fill="#198754">★★★★☆</text>
<rect x="50" y="445" width="380" height="80" class="tag-box"/>
<text x="60" y="463" class="tag-name">&lt;choose&gt; &lt;when&gt; &lt;otherwise&gt;</text>
<text x="70" y="480" class="desc">• 多分支选择（类似 Java switch）</text>
<text x="70" y="495" class="desc">• &lt;when&gt; 满足则执行，否则 &lt;otherwise&gt;</text>
<text x="70" y="510" class="desc">• 只会匹配一个分支</text>
<text x="350" y="463" class="freq" fill="#ffc107">★★★☆☆</text>
<rect x="50" y="535" width="380" height="65" class="tag-box"/>
<text x="60" y="553" class="tag-name">&lt;trim prefix="前缀" suffix="后缀"</text>
<text x="100" y="568" class="tag-name">prefixOverrides="覆盖前缀"&gt;</text>
<text x="70" y="585" class="desc">• 自定义字符串截取和拼接</text>
<text x="70" y="600" class="desc">• 可替代 &lt;where&gt; 和 &lt;set&gt; 的高级版</text>
<text x="350" y="553" class="freq" fill="#6c757d">★★☆☆☆</text>
</g>
<g id="helper-tags">
<rect x="470" y="50" width="400" height="350" rx="10" class="helper"/>
<text x="670" y="75" text-anchor="middle" class="cat-title">辅助标签（提升效率）</text>
<rect x="490" y="90" width="360" height="75" class="tag-box"/>
<text x="500" y="108" class="tag-name">&lt;sql id="片段ID"&gt;</text>
<text x="510" y="125" class="desc">• 定义可重用的 SQL 片段</text>
<text x="510" y="140" class="desc">• 避免重复代码，便于维护</text>
<text x="510" y="155" class="desc">• 常用于定义公共列、条件</text>
<text x="780" y="108" class="freq" fill="#0d6efd">★★★☆☆</text>
<rect x="490" y="175" width="360" height="65" class="tag-box"/>
<text x="500" y="193" class="tag-name">&lt;include refid="片段ID"/&gt;</text>
<text x="510" y="210" class="desc">• 引用 &lt;sql&gt; 定义的片段</text>
<text x="510" y="225" class="desc">• 配合 &lt;sql&gt; 实现代码复用</text>
<text x="780" y="193" class="freq" fill="#0d6efd">★★★☆☆</text>
<rect x="490" y="250" width="360" height="65" class="tag-box"/>
<text x="500" y="268" class="tag-name">&lt;bind name="变量名" value="表达式"/&gt;</text>
<text x="510" y="285" class="desc">• 创建临时变量绑定</text>
<text x="510" y="300" class="desc">• 常用于 LIKE 查询的模糊匹配</text>
<text x="780" y="268" class="freq" fill="#6c757d">★★☆☆☆</text>
<rect x="490" y="325" width="360" height="65" class="tag-box"/>
<text x="500" y="343" class="tag-name">&lt;selectKey&gt; / &lt;generatedKeys&gt;</text>
<text x="510" y="360" class="desc">• 获取自增主键值</text>
<text x="510" y="375" class="desc">• 用于插入后获取生成的 ID</text>
<text x="780" y="343" class="freq" fill="#0d6efd">★★★☆☆</text>
</g>
<g id="usage-examples">
<rect x="470" y="420" width="400" height="190" rx="10" fill="#f8f9fa" stroke="#0d6efd" stroke-width="2"/>
<text x="670" y="445" text-anchor="middle" font-size="13" font-weight="bold" fill="#0d6efd">标签使用频率统计</text>
<rect x="490" y="460" width="360" height="140" fill="#fff" stroke="#ddd" stroke-width="1" rx="3"/>
<text x="500" y="480" font-size="11" fill="#198754" font-weight="bold">高频 (90%): &lt;if&gt; + &lt;where&gt;</text>
<text x="510" y="497" font-size="10" fill="#666">多条件查询、可选条件过滤</text>
<text x="500" y="518" font-size="11" fill="#0d6efd" font-weight="bold">中频 (8%): &lt;foreach&gt; + &lt;set&gt; + &lt;choose&gt;</text>
<text x="510" y="535" font-size="10" fill="#666">批量操作、动态更新、分支选择</text>
<text x="500" y="556" font-size="11" fill="#6c757d" font-weight="bold">低频 (2%): &lt;trim&gt; + &lt;bind&gt;</text>
<text x="510" y="573" font-size="10" fill="#666">高级场景、特殊需求</text>
<text x="500" y="594" font-size="11" fill="#6c757d">辅助标签: &lt;sql&gt; + &lt;include&gt; (代码复用)</text>
</g>
<g id="combination-pattern">
<rect x="30" y="630" width="840" height="55" rx="8" fill="#fff3cd" stroke="#ffc107" stroke-width="2"/>
<text x="450" y="650" text-anchor="middle" font-size="12" font-weight="bold" fill="#e67e00">常见标签组合模式</text>
<text x="40" y="668" font-size="11" fill="#333">&lt;if&gt; + &lt;where&gt; (查询)   |   &lt;if&gt; + &lt;set&gt; (更新)   |   &lt;foreach&gt; + IN (批量)   |   &lt;choose&gt; + &lt;when&gt; (分支)   |   &lt;sql&gt; + &lt;include&gt; (复用)</text>
</g>
</svg>

2. **标签详细说明表**

| 标签 | 属性 | 作用 | 典型场景 |
|-----|------|------|---------|
| **核心标签** |
| `<if>` | test | 条件判断 | 可选查询条件、动态字段 |
| `<where>` | - | 智能 WHERE 子句 | 多条件查询 |
| `<set>` | - | 智能 SET 子句 | 动态更新非空字段 |
| `<foreach>` | collection, item, index, open, close, separator | 循环迭代 | IN 查询、批量插入 |
| `<choose>` | - | 分支容器 | 多条件分支 |
| `<when>` | test | 分支条件 | 满足条件执行 |
| `<otherwise>` | - | 默认分支 | 所有 when 不满足时执行 |
| `<trim>` | prefix, suffix, prefixOverrides, suffixOverrides | 自定义截取 | 复杂字符串处理 |
| **辅助标签** |
| `<sql>` | id | SQL 片段定义 | 公共字段、条件复用 |
| `<include>` | refid | 引用 SQL 片段 | 引入复用代码 |
| `<bind>` | name, value | 变量绑定 | LIKE 查询、复杂表达式 |

3. **标签使用示例**

**`<if>` - 条件判断**
```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  WHERE 1=1
  <if test="name != null and name != ''">
    AND name = #{name}
  </if>
  <if test="age != null">
    AND age = #{age}
  </if>
</select>
```

**`<where>` - 智能 WHERE**
```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  <where>
    <if test="name != null">AND name = #{name}</if>
    <if test="age != null">AND age = #{age}</if>
  </where>
</select>
```

**`<set>` - 智能 SET**
```xml
<update id="updateUser">
  UPDATE user
  <set>
    <if test="name != null">name = #{name},</if>
    <if test="age != null">age = #{age},</if>
  </set>
  WHERE id = #{id}
</update>
```

**`<foreach>` - 循环迭代**
```xml
<!-- IN 查询 -->
<select id="findByIds" resultType="User">
  SELECT * FROM user WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</select>

<!-- 批量插入 -->
<insert id="batchInsert">
  INSERT INTO user (name, age) VALUES
  <foreach collection="list" item="user" separator=",">
    (#{user.name}, #{user.age})
  </foreach>
</insert>
```

**`<choose>` - 多分支选择**
```xml
<select id="findByType" resultType="User">
  SELECT * FROM user
  <where>
    <choose>
      <when test="type == 1">
        AND level = 'VIP'
      </when>
      <when test="type == 2">
        AND points > 1000
      </when>
      <otherwise>
        AND status = 'ACTIVE'
      </otherwise>
    </choose>
  </where>
</select>
```

**`<trim>` - 自定义截取**
```xml
<!-- 等价于 <where> -->
<trim prefix="WHERE" prefixOverrides="AND |OR ">
  <if test="name != null">AND name = #{name}</if>
  <if test="age != null">AND age = #{age}</if>
</trim>

<!-- 等价于 <set> -->
<trim prefix="SET" suffixOverrides=",">
  <if test="name != null">name = #{name},</if>
  <if test="age != null">age = #{age},</if>
</trim>
```

**`<sql>` + `<include>` - 代码复用**
```xml
<sql id="baseColumns">
  id, name, age, email, create_time, update_time
</sql>

<select id="findById" resultType="User">
  SELECT <include refid="baseColumns"/> FROM user WHERE id = #{id}
</select>

<select id="findAll" resultType="User">
  SELECT <include refid="baseColumns"/> FROM user
</select>
```

**`<bind>` - 变量绑定**
```xml
<select id="findByName" resultType="User">
  <bind name="pattern" value="'%' + name + '%'"/>
  SELECT * FROM user WHERE name LIKE #{pattern}
</select>
```

4. **标签组合最佳实践**

```xml
<!-- 完整的多条件查询示例 -->
<sql id="baseColumns">
  u.id, u.name, u.age, u.email, u.status
</sql>

<select id="searchUsers" resultType="User">
  SELECT <include refid="baseColumns"/>
  FROM user u
  <where>
    <if test="name != null and name != ''">
      <bind name="nameLike" value="'%' + name + '%'"/>
      AND u.name LIKE #{nameLike}
    </if>
    <if test="ageRange != null">
      <choose>
        <when test="ageRange == 'young'">
          AND u.age BETWEEN 0 AND 25
        </when>
        <when test="ageRange == 'middle'">
          AND u.age BETWEEN 26 AND 50
        </when>
        <otherwise>
          AND u.age > 50
        </otherwise>
      </choose>
    </if>
    <if test="statuses != null and statuses.size() > 0">
      AND u.status IN
      <foreach collection="statuses" item="status" open="(" close=")" separator=",">
        #{status}
      </foreach>
    </if>
  </where>
  ORDER BY u.create_time DESC
</select>
```

**关键要点**

1. **必须掌握的标签（Top 4）**
   - `<if>` - 所有动态 SQL 的基础
   - `<where>` - 多条件查询必备
   - `<set>` - 动态更新必备
   - `<foreach>` - 批量操作必备

2. **标签选择原则**
   - 优先使用 `<where>` 替代 `WHERE 1=1`
   - 优先使用 `<set>` 自动处理逗号
   - 复杂分支用 `<choose>` 替代多个 `<if>`
   - 重复 SQL 用 `<sql>` + `<include>` 复用

3. **性能注意事项**
   - `<foreach>` 批量操作控制数量（≤1000）
   - 避免过度嵌套（≤3层）
   - 复杂动态 SQL 考虑拆分
   - 合理使用 `<sql>` 片段提高可读性

4. **常见错误**
   - 忘记 `<if>` 中 `test` 属性
   - 字符串判断漏掉 `!= ''`
   - `<foreach>` 的 `collection` 属性写错
   - `<choose>` 中多个 `<when>` 都满足只执行第一个

**记忆口诀**

```
if 判断最常用，where set 智能控
foreach 循环批量搞，choose when 分支通
trim 截取高级用，sql include 复用功
bind 绑定变量妙，六大标签要记牢
```

### 27. if 标签的作用是什么?

**核心答案**

`<if>` 标签用于**条件判断**，当 `test` 属性的表达式为 true 时，包含的 SQL 片段才会被拼接到最终 SQL 中，是动态 SQL 中使用频率最高的标签。

**详细说明**

1. **if 标签工作原理**

<svg viewBox="0 0 850 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:12px sans-serif;fill:#333}.code{font:10px monospace;fill:#d63384}.desc{font:10px sans-serif;fill:#666}.true-path{fill:#d1e7dd;stroke:#198754;stroke-width:2}.false-path{fill:#f8d7da;stroke:#dc3545;stroke-width:2}.box{fill:#fff;stroke:#0d6efd;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrow)}.yes-arrow{stroke:#198754;stroke-width:2.5;fill:none;marker-end:url(#yes-mark)}.no-arrow{stroke:#dc3545;stroke-width:2.5;fill:none;marker-end:url(#no-mark)}</style><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker><marker id="yes-mark" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#198754"/></marker><marker id="no-mark" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#dc3545"/></marker></defs>
<text x="425" y="25" text-anchor="middle" class="title">&lt;if&gt; 标签条件判断流程</text>
<g id="input">
<rect x="320" y="50" width="210" height="80" rx="8" class="box"/>
<text x="425" y="70" text-anchor="middle" class="label" font-weight="bold">1. 接收参数</text>
<text x="330" y="92" class="code">name = "张三"</text>
<text x="330" y="107" class="code">age = null</text>
<text x="330" y="122" class="code">status = 1</text>
<line x1="425" y1="130" x2="425" y2="165" class="arrow"/>
</g>
<g id="decision">
<ellipse cx="425" cy="190" rx="85" ry="35" fill="#fff3cd" stroke="#ffc107" stroke-width="2"/>
<text x="425" y="188" text-anchor="middle" class="label" font-weight="bold">test 表达式</text>
<text x="425" y="203" text-anchor="middle" class="code" font-size="9">name != null?</text>
</g>
<g id="true-branch">
<line x1="510" y1="190" x2="650" y2="190" class="yes-arrow"/>
<text x="570" y="180" fill="#198754" font-size="11" font-weight="bold">true</text>
<rect x="650" y="150" width="170" height="80" rx="8" class="true-path"/>
<text x="735" y="170" text-anchor="middle" class="label" font-weight="bold">包含 SQL 片段</text>
<text x="660" y="195" class="code" font-size="9">AND name = #{name}</text>
<text x="660" y="215" class="desc" fill="#198754" font-weight="bold">✓ 拼接到最终 SQL</text>
</g>
<g id="false-branch">
<line x1="340" y1="190" x2="200" y2="190" class="no-arrow"/>
<text x="280" y="180" fill="#dc3545" font-size="11" font-weight="bold">false</text>
<rect x="30" y="150" width="170" height="80" rx="8" class="false-path"/>
<text x="115" y="170" text-anchor="middle" class="label" font-weight="bold">跳过 SQL 片段</text>
<text x="40" y="195" class="code" font-size="9">AND name = #{name}</text>
<text x="40" y="215" class="desc" fill="#dc3545" font-weight="bold">✗ 不会拼接到 SQL</text>
</g>
<g id="result">
<line x1="735" y1="230" x2="735" y2="270" class="arrow"/>
<line x1="115" y1="230" x2="115" y2="320" class="arrow"/>
<line x1="115" y1="320" x2="425" y2="320" class="arrow"/>
<line x1="735" y1="270" x2="425" y2="270" class="arrow"/>
<line x1="425" y1="270" x2="425" y2="295" class="arrow"/>
<rect x="280" y="295" width="290" height="110" rx="8" fill="#e7f3ff" stroke="#0d6efd" stroke-width="2"/>
<text x="425" y="315" text-anchor="middle" class="label" font-weight="bold">2. 最终生成的 SQL</text>
<text x="290" y="340" class="code">SELECT * FROM user WHERE 1=1</text>
<text x="290" y="360" class="code" fill="#198754">AND name = ?    ← if(true) 包含</text>
<text x="290" y="380" class="code" fill="#dc3545">/* age 条件跳过 */  ← if(false) 跳过</text>
<text x="290" y="398" class="code" fill="#198754">AND status = ?  ← if(true) 包含</text>
</g>
</svg>

2. **基本语法**

```xml
<if test="条件表达式">
  SQL 片段
</if>
```

**属性说明：**
- `test`：必填，OGNL 表达式，返回 true 或 false

3. **常见使用场景**

**场景 1：可选查询条件（最常用）**

```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  WHERE 1=1
  <if test="name != null and name != ''">
    AND name = #{name}
  </if>
  <if test="age != null">
    AND age = #{age}
  </if>
  <if test="status != null">
    AND status = #{status}
  </if>
</select>
```

**场景 2：动态字段更新**

```xml
<update id="updateUser">
  UPDATE user
  SET update_time = NOW()
  <if test="name != null">
    , name = #{name}
  </if>
  <if test="age != null">
    , age = #{age}
  </if>
  <if test="email != null">
    , email = #{email}
  </if>
  WHERE id = #{id}
</update>
```

**场景 3：复杂条件组合**

```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  WHERE 1=1
  <!-- 姓名模糊查询 -->
  <if test="name != null and name != ''">
    AND name LIKE CONCAT('%', #{name}, '%')
  </if>
  <!-- 年龄范围查询 -->
  <if test="minAge != null and maxAge != null">
    AND age BETWEEN #{minAge} AND #{maxAge}
  </if>
  <!-- 时间范围查询 -->
  <if test="startDate != null and endDate != null">
    AND create_time BETWEEN #{startDate} AND #{endDate}
  </if>
</select>
```

**场景 4：嵌套 if 条件**

```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  WHERE 1=1
  <if test="searchType != null">
    <if test="searchType == 'name'">
      AND name = #{keyword}
    </if>
    <if test="searchType == 'email'">
      AND email = #{keyword}
    </if>
  </if>
</select>
```

4. **test 表达式详解**

**支持的判断类型：**

```xml
<!-- 1. null 判断 -->
<if test="name != null">
  AND name = #{name}
</if>

<!-- 2. 空字符串判断 -->
<if test="name != null and name != ''">
  AND name = #{name}
</if>

<!-- 3. 数字比较 -->
<if test="age > 18">
  AND age > 18
</if>

<!-- 4. 布尔值判断 -->
<if test="isActive">
  AND status = 'ACTIVE'
</if>

<!-- 5. 集合判断 -->
<if test="ids != null and ids.size() > 0">
  AND id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</if>

<!-- 6. 字符串比较 -->
<if test="type == 'VIP'">
  AND user_level = 'VIP'
</if>

<!-- 7. 逻辑运算 -->
<if test="(age != null and age > 18) or status == 'VIP'">
  AND (age > 18 OR status = 'VIP')
</if>

<!-- 8. 方法调用 -->
<if test="name != null and name.length() > 0">
  AND name = #{name}
</if>
```

5. **常见陷阱与解决方案**

**陷阱 1：字符串判断漏掉空判断**
```xml
<!-- ❌ 错误：只判断 null -->
<if test="name != null">
  AND name = #{name}
</if>
<!-- 如果 name = ""，条件为 true，但 SQL 会变成 AND name = '' -->

<!-- ✓ 正确：同时判断 null 和空字符串 -->
<if test="name != null and name != ''">
  AND name = #{name}
</if>
```

**陷阱 2：数字 0 的判断**
```xml
<!-- ❌ 错误：0 会被判断为 false -->
<if test="age">
  AND age = #{age}
</if>
<!-- 如果 age = 0，条件为 false，跳过该条件 -->

<!-- ✓ 正确：显式判断 null -->
<if test="age != null">
  AND age = #{age}
</if>
```

**陷阱 3：特殊字符需要转义**
```xml
<!-- ❌ 错误：XML 特殊字符未转义 -->
<if test="age > 18 && age < 60">
  AND age BETWEEN 18 AND 60
</if>

<!-- ✓ 正确：使用 and 代替 && -->
<if test="age > 18 and age < 60">
  AND age BETWEEN 18 AND 60
</if>

<!-- 或使用 CDATA -->
<if test="<![CDATA[ age > 18 && age < 60 ]]>">
  AND age BETWEEN 18 AND 60
</if>
```

**陷阱 4：多个 if 可能产生多余 AND/OR**
```xml
<!-- ❌ 问题：如果只有 age 有值，SQL 变成 WHERE AND age = ? -->
<select id="findUsers" resultType="User">
  SELECT * FROM user WHERE
  <if test="name != null">
    AND name = #{name}
  </if>
  <if test="age != null">
    AND age = #{age}
  </if>
</select>

<!-- ✓ 方案1：WHERE 1=1 -->
<select id="findUsers" resultType="User">
  SELECT * FROM user WHERE 1=1
  <if test="name != null">AND name = #{name}</if>
  <if test="age != null">AND age = #{age}</if>
</select>

<!-- ✓ 方案2：使用 <where> 标签（推荐）-->
<select id="findUsers" resultType="User">
  SELECT * FROM user
  <where>
    <if test="name != null">AND name = #{name}</if>
    <if test="age != null">AND age = #{age}</if>
  </where>
</select>
```

6. **性能与最佳实践**

**最佳实践：**

1. **字符串判断加空检查**
   ```xml
   <if test="name != null and name != ''">
   ```

2. **优先使用 `<where>` 标签**
   ```xml
   <where>
     <if test="name != null">AND name = #{name}</if>
   </where>
   ```

3. **避免过度嵌套（≤3层）**
   ```xml
   <!-- ✓ 推荐 -->
   <if test="type == 'A'">...</if>

   <!-- ✗ 不推荐 -->
   <if test="a">
     <if test="b">
       <if test="c">
         <if test="d">...</if>
       </if>
     </if>
   </if>
   ```

4. **复杂条件考虑使用 `<choose>`**
   ```xml
   <!-- 多个互斥条件用 choose 更清晰 -->
   <choose>
     <when test="type == 1">AND level = 'VIP'</when>
     <when test="type == 2">AND points > 1000</when>
     <otherwise>AND status = 'ACTIVE'</otherwise>
   </choose>
   ```

**关键要点**

1. **`<if>` 核心特性**
   - 动态 SQL 最基础、最常用的标签
   - 通过 `test` 属性判断条件
   - 条件为 true 时包含 SQL 片段

2. **test 表达式注意事项**
   - 使用 OGNL 表达式
   - 字符串判断要加 `!= ''`
   - 数字 0 不等于 null
   - 特殊字符需要转义或使用 CDATA

3. **常见组合**
   - `<if>` + `<where>` - 多条件查询
   - `<if>` + `<set>` - 动态更新
   - `<if>` + `<foreach>` - 条件批量操作

4. **避免的错误**
   - 忘记判断空字符串
   - 直接用布尔表达式判断数字
   - XML 特殊字符未转义
   - 多个 `<if>` 不用 `<where>` 包裹

**记忆口诀**

```
if 判断最常见，test 表达式是关键
null 判断要记牢，字符串加空检查好
数字零和 null 异，布尔直接判真假
OGNL 支持很强大，逻辑运算样样行
XML 转义莫忘记，where 标签配合佳
```

### 28. choose、when、otherwise 标签的作用是什么?

**核心答案**

`<choose>`、`<when>`、`<otherwise>` 组合实现**多分支选择**（类似 Java 的 switch-case），`<when>` 按顺序判断条件，**只执行第一个满足条件的分支**，所有 `<when>` 都不满足时执行 `<otherwise>`。

**详细说明**

1. **choose-when-otherwise 工作原理**

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.subtitle{font:bold 13px sans-serif;fill:#555}.label{font:12px sans-serif;fill:#333}.code{font:10px monospace;fill:#d63384}.desc{font:10px sans-serif;fill:#666}.when-box{fill:#cfe2ff;stroke:#0d6efd;stroke-width:2}.otherwise-box{fill:#f8d7da;stroke:#dc3545;stroke-width:2}.result{fill:#d1e7dd;stroke:#198754;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrow)}.yes{stroke:#198754;stroke-width:2.5}.no{stroke:#dc3545;stroke-width:2.5}</style><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs>
<text x="450" y="25" text-anchor="middle" class="title">choose-when-otherwise 执行流程（类似 switch-case）</text>
<g id="comparison">
<rect x="50" y="50" width="380" height="170" rx="8" fill="#f8f9fa" stroke="#6c757d" stroke-width="2"/>
<text x="240" y="75" text-anchor="middle" class="subtitle">Java switch-case</text>
<text x="70" y="100" class="code" font-size="11">switch (type) {</text>
<text x="80" y="118" class="code" font-size="11">case 1:</text>
<text x="90" y="133" class="code" font-size="11">return "VIP";</text>
<text x="80" y="148" class="code" font-size="11">case 2:</text>
<text x="90" y="163" class="code" font-size="11">return "普通";</text>
<text x="80" y="178" class="code" font-size="11">default:</text>
<text x="90" y="193" class="code" font-size="11">return "访客";</text>
<text x="70" y="208" class="code" font-size="11">}</text>
<rect x="470" y="50" width="380" height="170" rx="8" fill="#f8f9fa" stroke="#6c757d" stroke-width="2"/>
<text x="660" y="75" text-anchor="middle" class="subtitle">MyBatis choose-when</text>
<text x="490" y="100" class="code" font-size="11">&lt;choose&gt;</text>
<text x="500" y="118" class="code" font-size="11">&lt;when test="type == 1"&gt;</text>
<text x="510" y="133" class="code" font-size="11">AND level = 'VIP'</text>
<text x="500" y="148" class="code" font-size="11">&lt;/when&gt;</text>
<text x="500" y="163" class="code" font-size="11">&lt;when test="type == 2"&gt;</text>
<text x="510" y="178" class="code" font-size="11">AND level = '普通'</text>
<text x="500" y="193" class="code" font-size="11">&lt;/when&gt;</text>
<text x="500" y="208" class="code" font-size="11">&lt;otherwise&gt;...&lt;/otherwise&gt;</text>
<text x="490" y="223" class="code" font-size="11">&lt;/choose&gt;</text>
</g>
<g id="flow">
<rect x="50" y="250" width="800" height="280" rx="8" fill="#fff" stroke="#0d6efd" stroke-width="2"/>
<text x="450" y="275" text-anchor="middle" class="subtitle" fill="#0d6efd">执行流程示例（type = 2）</text>
<rect x="350" y="295" width="200" height="50" rx="5" fill="#fff3cd" stroke="#ffc107" stroke-width="2"/>
<text x="450" y="315" text-anchor="middle" class="label" font-weight="bold">开始 choose</text>
<text x="450" y="332" text-anchor="middle" class="code" font-size="9">type = 2</text>
<line x1="450" y1="345" x2="450" y2="365" class="arrow"/>
<rect x="70" y="365" width="160" height="55" rx="5" class="when-box"/>
<text x="150" y="383" text-anchor="middle" class="label" font-weight="bold">when 1</text>
<text x="80" y="400" class="code" font-size="9">test: type == 1</text>
<text x="80" y="415" class="desc" fill="#dc3545" font-weight="bold">✗ false, 跳过</text>
<line x1="230" y1="392" x2="280" y2="392" class="no"/>
<text x="250" y="385" fill="#dc3545" font-size="11" font-weight="bold">否</text>
<rect x="280" y="365" width="160" height="55" rx="5" class="when-box"/>
<text x="360" y="383" text-anchor="middle" class="label" font-weight="bold">when 2</text>
<text x="290" y="400" class="code" font-size="9">test: type == 2</text>
<text x="290" y="415" class="desc" fill="#198754" font-weight="bold">✓ true, 执行</text>
<line x1="360" y1="420" x2="360" y2="455" class="yes"/>
<text x="370" y="440" fill="#198754" font-size="11" font-weight="bold">是</text>
<rect x="490" y="365" width="160" height="55" rx="5" fill="#e9ecef" stroke="#6c757d" stroke-width="2" opacity="0.5"/>
<text x="570" y="383" text-anchor="middle" class="label" fill="#999">when 3</text>
<text x="500" y="400" class="code" font-size="9" fill="#999">test: type == 3</text>
<text x="500" y="415" class="desc" fill="#999">不会被判断</text>
<rect x="690" y="365" width="140" height="55" rx="5" fill="#e9ecef" stroke="#6c757d" stroke-width="2" opacity="0.5"/>
<text x="760" y="383" text-anchor="middle" class="label" fill="#999">otherwise</text>
<text x="700" y="400" class="desc" fill="#999">不会执行</text>
<rect x="260" y="455" width="200" height="60" rx="5" class="result"/>
<text x="360" y="475" text-anchor="middle" class="label" font-weight="bold">执行结果</text>
<text x="270" y="495" class="code" font-size="9">AND level = '普通'</text>
<text x="270" y="510" class="desc" fill="#198754" font-weight="bold">只执行第一个满足条件的分支</text>
</g>
</svg>

2. **基本语法**

```xml
<choose>
  <when test="条件1">
    SQL 片段1
  </when>
  <when test="条件2">
    SQL 片段2
  </when>
  <when test="条件3">
    SQL 片段3
  </when>
  <otherwise>
    默认 SQL 片段
  </otherwise>
</choose>
```

**关键特性：**
- 从上到下按顺序判断 `<when>` 条件
- **只执行第一个满足条件的分支**
- 所有 `<when>` 都不满足时，执行 `<otherwise>`
- `<otherwise>` 可选，类似 switch 的 default

3. **典型应用场景**

**场景 1：用户等级查询**

```xml
<select id="findUsersByLevel" resultType="User">
  SELECT * FROM user
  <where>
    <choose>
      <when test="level == 1">
        AND user_level = 'VIP' AND points >= 10000
      </when>
      <when test="level == 2">
        AND user_level = 'SVIP' AND points >= 50000
      </when>
      <when test="level == 3">
        AND user_level = 'GOLD' AND points >= 100000
      </when>
      <otherwise>
        AND user_level = 'NORMAL'
      </otherwise>
    </choose>
  </where>
</select>
```

**场景 2：排序方式选择**

```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  WHERE status = 'ACTIVE'
  <choose>
    <when test="orderType == 'time'">
      ORDER BY create_time DESC
    </when>
    <when test="orderType == 'name'">
      ORDER BY name ASC
    </when>
    <when test="orderType == 'points'">
      ORDER BY points DESC
    </when>
    <otherwise>
      ORDER BY id DESC
    </otherwise>
  </choose>
</select>
```

**场景 3：搜索类型选择**

```xml
<select id="search" resultType="User">
  SELECT * FROM user
  <where>
    <choose>
      <when test="searchType == 'name'">
        AND name LIKE CONCAT('%', #{keyword}, '%')
      </when>
      <when test="searchType == 'email'">
        AND email LIKE CONCAT('%', #{keyword}, '%')
      </when>
      <when test="searchType == 'phone'">
        AND phone = #{keyword}
      </when>
      <otherwise>
        AND (name LIKE CONCAT('%', #{keyword}, '%')
         OR email LIKE CONCAT('%', #{keyword}, '%'))
      </otherwise>
    </choose>
  </where>
</select>
```

**场景 4：时间范围动态查询**

```xml
<select id="findByTimeRange" resultType="Order">
  SELECT * FROM orders
  <where>
    <choose>
      <when test="timeRange == 'today'">
        AND DATE(create_time) = CURDATE()
      </when>
      <when test="timeRange == 'week'">
        AND create_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      </when>
      <when test="timeRange == 'month'">
        AND create_time >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
      </when>
      <when test="startTime != null and endTime != null">
        AND create_time BETWEEN #{startTime} AND #{endTime}
      </when>
      <otherwise>
        AND create_time >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
      </otherwise>
    </choose>
  </where>
</select>
```

4. **choose vs 多个 if 对比**

**使用多个 if（可能执行多个分支）：**
```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  <where>
    <if test="type == 1">
      AND level = 'VIP'
    </if>
    <if test="type == 2">
      AND level = 'SVIP'
    </if>
    <if test="type == 3">
      AND level = 'GOLD'
    </if>
  </where>
</select>

<!-- 如果 type = 1，只会添加 AND level = 'VIP' -->
<!-- 但如果多个条件都满足，会都执行（通常不是期望行为）-->
```

**使用 choose（只执行一个分支）：**
```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  <where>
    <choose>
      <when test="type == 1">
        AND level = 'VIP'
      </when>
      <when test="type == 2">
        AND level = 'SVIP'
      </when>
      <when test="type == 3">
        AND level = 'GOLD'
      </when>
      <otherwise>
        AND level = 'NORMAL'
      </otherwise>
    </choose>
  </where>
</select>

<!-- 只会执行第一个满足条件的分支，更符合 switch 语义 -->
```

**对比表：**

| 特性 | 多个 `<if>` | `<choose>-<when>` |
|-----|------------|------------------|
| **执行方式** | 所有满足条件的都执行 | 只执行第一个满足的 |
| **类似语法** | 多个独立 if | switch-case |
| **默认分支** | 无 | `<otherwise>` |
| **使用场景** | 多个独立条件 | 互斥条件选择 |
| **适用** | 多条件组合查询 | 单一条件多分支 |

5. **常见错误与注意事项**

**错误 1：多个 when 都满足，期望都执行**
```xml
<!-- ❌ 错误理解：以为会执行所有满足的 when -->
<choose>
  <when test="age > 18">AND adult = true</when>
  <when test="age > 60">AND senior = true</when>
</choose>
<!-- 如果 age = 65，只会执行第一个 when，不会执行第二个 -->

<!-- ✓ 正确：使用多个 if -->
<if test="age > 18">AND adult = true</if>
<if test="age > 60">AND senior = true</if>
```

**错误 2：when 顺序错误**
```xml
<!-- ❌ 错误：顺序不当导致后面条件永远不执行 -->
<choose>
  <when test="age != null">
    AND age = #{age}
  </when>
  <when test="age > 18">  <!-- 永远不会执行 -->
    AND age > 18
  </when>
</choose>

<!-- ✓ 正确：更具体的条件放前面 -->
<choose>
  <when test="age != null and age > 18">
    AND age > 18
  </when>
  <when test="age != null">
    AND age = #{age}
  </when>
</choose>
```

**错误 3：忘记 otherwise 导致无默认处理**
```xml
<!-- ⚠ 风险：所有 when 都不满足时，无任何条件 -->
<choose>
  <when test="type == 1">AND level = 'VIP'</when>
  <when test="type == 2">AND level = 'SVIP'</when>
</choose>
<!-- 如果 type = 3，不会有任何条件 -->

<!-- ✓ 推荐：添加 otherwise -->
<choose>
  <when test="type == 1">AND level = 'VIP'</when>
  <when test="type == 2">AND level = 'SVIP'</when>
  <otherwise>AND level = 'NORMAL'</otherwise>
</choose>
```

6. **复杂场景：choose 嵌套**

```xml
<select id="complexQuery" resultType="User">
  SELECT * FROM user
  <where>
    <!-- 外层：按用户类型分类 -->
    <choose>
      <when test="userType == 'VIP'">
        <!-- 内层：VIP 用户按积分分级 -->
        <choose>
          <when test="points > 10000">
            AND level = 'VIP_GOLD'
          </when>
          <when test="points > 5000">
            AND level = 'VIP_SILVER'
          </when>
          <otherwise>
            AND level = 'VIP_BRONZE'
          </otherwise>
        </choose>
      </when>
      <when test="userType == 'NORMAL'">
        AND level = 'NORMAL'
      </when>
      <otherwise>
        AND level = 'GUEST'
      </otherwise>
    </choose>
  </where>
</select>
```

**关键要点**

1. **核心特性**
   - 类似 Java 的 switch-case
   - 按顺序判断，只执行第一个满足的分支
   - `<otherwise>` 作为默认分支

2. **使用场景**
   - 互斥条件选择（用户等级、排序方式）
   - 搜索类型切换
   - 时间范围选择
   - 状态分支处理

3. **与 if 的区别**
   - `<if>` - 多个独立条件，可能都执行
   - `<choose>` - 互斥条件，只执行一个

4. **注意事项**
   - 条件顺序很重要
   - 建议添加 `<otherwise>` 作为兜底
   - 避免过度嵌套（≤2层）
   - 复杂逻辑考虑拆分

**记忆口诀**

```
choose when 类 switch，多分支选择不用愁
when 条件从上判，满足一个就停手
otherwise 默认值，兜底方案要配够
if 独立都执行，choose 互斥选其一
顺序很关键，具体条件排前头
```

### 29. where 标签的作用是什么?

**核心答案**

`<where>` 标签用于**智能生成 WHERE 子句**，能自动添加 WHERE 关键字，并**自动去除第一个多余的 AND 或 OR**，避免手动拼接 `WHERE 1=1` 的繁琐写法。

**详细说明**

1. **where 标签智能处理机制**

<svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.subtitle{font:bold 13px sans-serif;fill:#555}.label{font:12px sans-serif;fill:#333}.code{font:10px monospace;fill:#d63384}.desc{font:10px sans-serif;fill:#666}.bad{fill:#f8d7da;stroke:#dc3545;stroke-width:2}.good{fill:#d1e7dd;stroke:#198754;stroke-width:2}.box{fill:#fff;stroke:#0d6efd;stroke-width:2}</style></defs>
<text x="450" y="25" text-anchor="middle" class="title">&lt;where&gt; 标签智能处理机制</text>
<g id="traditional">
<rect x="50" y="50" width="380" height="200" rx="8" class="bad"/>
<text x="240" y="75" text-anchor="middle" class="subtitle" fill="#dc3545">❌ 传统方式（WHERE 1=1）</text>
<rect x="70" y="90" width="340" height="145" fill="#fff" stroke="#dc3545" stroke-width="2" rx="5"/>
<text x="80" y="110" class="code">SELECT * FROM user</text>
<text x="80" y="127" class="code" fill="#dc3545">WHERE 1=1  ← 多余的条件</text>
<text x="80" y="144" class="code">&lt;if test="name != null"&gt;</text>
<text x="90" y="161" class="code">AND name = #{name}</text>
<text x="80" y="178" class="code">&lt;/if&gt;</text>
<text x="80" y="195" class="code">&lt;if test="age != null"&gt;</text>
<text x="90" y="212" class="code">AND age = #{age}</text>
<text x="80" y="229" class="code">&lt;/if&gt;</text>
<text x="80" y="250" class="desc" fill="#dc3545" font-weight="bold">✗ WHERE 1=1 冗余</text>
<text x="80" y="263" class="desc" fill="#dc3545" font-weight="bold">✗ SQL 可读性差</text>
</g>
<g id="where-tag">
<rect x="470" y="50" width="380" height="200" rx="8" class="good"/>
<text x="660" y="75" text-anchor="middle" class="subtitle" fill="#198754">✓ 使用 &lt;where&gt; 标签</text>
<rect x="490" y="90" width="340" height="145" fill="#fff" stroke="#198754" stroke-width="2" rx="5"/>
<text x="500" y="110" class="code">SELECT * FROM user</text>
<text x="500" y="127" class="code" fill="#198754">&lt;where&gt;  ← 智能添加 WHERE</text>
<text x="510" y="144" class="code">&lt;if test="name != null"&gt;</text>
<text x="520" y="161" class="code">AND name = #{name}</text>
<text x="510" y="178" class="code">&lt;/if&gt;</text>
<text x="510" y="195" class="code">&lt;if test="age != null"&gt;</text>
<text x="520" y="212" class="code">AND age = #{age}</text>
<text x="510" y="229" class="code">&lt;/if&gt;</text>
<text x="500" y="240" class="code" fill="#198754">&lt;/where&gt;</text>
<text x="500" y="260" class="desc" fill="#198754" font-weight="bold">✓ 自动去除第一个 AND</text>
<text x="500" y="273" class="desc" fill="#198754" font-weight="bold">✓ SQL 简洁优雅</text>
</g>
<g id="scenarios">
<rect x="50" y="270" width="800" height="230" rx="8" fill="#f8f9fa" stroke="#0d6efd" stroke-width="2"/>
<text x="450" y="295" text-anchor="middle" class="subtitle" fill="#0d6efd">&lt;where&gt; 标签的三种智能处理场景</text>
<rect x="70" y="310" width="240" height="175" class="box"/>
<text x="190" y="330" text-anchor="middle" class="label" font-weight="bold">场景1: 有条件满足</text>
<text x="80" y="355" class="code" font-size="9">name = "张三", age = null</text>
<line x1="80" y1="365" x2="300" y2="365" stroke="#ddd" stroke-width="1"/>
<text x="80" y="380" class="desc">SQL 片段:</text>
<text x="80" y="395" class="code" font-size="9">&lt;where&gt;</text>
<text x="90" y="410" class="code" font-size="9" fill="#198754">AND name = #{name}  ← 有AND</text>
<text x="80" y="425" class="code" font-size="9">&lt;/where&gt;</text>
<line x1="80" y1="435" x2="300" y2="435" stroke="#ddd" stroke-width="1"/>
<text x="80" y="450" class="desc">生成 SQL:</text>
<text x="80" y="465" class="code" font-size="9" fill="#198754">WHERE name = ?  ← AND被去除</text>
<rect x="330" y="310" width="240" height="175" class="box"/>
<text x="450" y="330" text-anchor="middle" class="label" font-weight="bold">场景2: 多个条件满足</text>
<text x="340" y="355" class="code" font-size="9">name = "张三", age = 25</text>
<line x1="340" y1="365" x2="560" y2="365" stroke="#ddd" stroke-width="1"/>
<text x="340" y="380" class="desc">SQL 片段:</text>
<text x="340" y="395" class="code" font-size="9">&lt;where&gt;</text>
<text x="350" y="410" class="code" font-size="9" fill="#198754">AND name = #{name}</text>
<text x="350" y="425" class="code" font-size="9">AND age = #{age}</text>
<text x="340" y="440" class="code" font-size="9">&lt;/where&gt;</text>
<line x1="340" y1="450" x2="560" y2="450" stroke="#ddd" stroke-width="1"/>
<text x="340" y="465" class="desc">生成 SQL:</text>
<text x="340" y="480" class="code" font-size="9" fill="#198754">WHERE name = ? AND age = ?</text>
<rect x="590" y="310" width="240" height="175" class="box"/>
<text x="710" y="330" text-anchor="middle" class="label" font-weight="bold">场景3: 无条件满足</text>
<text x="600" y="355" class="code" font-size="9">name = null, age = null</text>
<line x1="600" y1="365" x2="820" y2="365" stroke="#ddd" stroke-width="1"/>
<text x="600" y="380" class="desc">SQL 片段:</text>
<text x="600" y="395" class="code" font-size="9">&lt;where&gt;</text>
<text x="610" y="410" class="code" font-size="9" fill="#6c757d">(无内容)</text>
<text x="600" y="425" class="code" font-size="9">&lt;/where&gt;</text>
<line x1="600" y1="435" x2="820" y2="435" stroke="#ddd" stroke-width="1"/>
<text x="600" y="450" class="desc">生成 SQL:</text>
<text x="600" y="465" class="code" font-size="9" fill="#198754">SELECT * FROM user</text>
<text x="600" y="480" class="desc" font-size="8" fill="#666">(WHERE 不会被添加)</text>
</g>
</svg>

2. **基本语法**

```xml
<where>
  <if>条件1</if>
  <if>条件2</if>
  ...
</where>
```

**智能处理规则：**
- 子元素有内容时，自动添加 WHERE 关键字
- 自动去除第一个 AND 或 OR
- 子元素全部为空时，不添加 WHERE

3. **典型应用场景**

**场景 1：多条件查询（最常用）**

```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  <where>
    <if test="name != null and name != ''">
      AND name LIKE CONCAT('%', #{name}, '%')
    </if>
    <if test="age != null">
      AND age = #{age}
    </if>
    <if test="status != null">
      AND status = #{status}
    </if>
  </where>
</select>
```

**可能生成的 SQL：**
- `name = "张三"`：`WHERE name LIKE '%张三%'`
- `name = "张三", age = 25`：`WHERE name LIKE '%张三%' AND age = 25`
- 无参数：`SELECT * FROM user`（无 WHERE）

**场景 2：时间范围查询**

```xml
<select id="findByDateRange" resultType="Order">
  SELECT * FROM orders
  <where>
    <if test="startDate != null">
      AND create_time >= #{startDate}
    </if>
    <if test="endDate != null">
      AND create_time &lt;= #{endDate}
    </if>
    <if test="status != null">
      AND status = #{status}
    </if>
  </where>
  ORDER BY create_time DESC
</select>
```

**场景 3：复杂条件组合**

```xml
<select id="searchUsers" resultType="User">
  SELECT * FROM user
  <where>
    <!-- 基础条件 -->
    <if test="keyword != null and keyword != ''">
      AND (name LIKE CONCAT('%', #{keyword}, '%')
       OR email LIKE CONCAT('%', #{keyword}, '%'))
    </if>
    <!-- 年龄范围 -->
    <if test="minAge != null and maxAge != null">
      AND age BETWEEN #{minAge} AND #{maxAge}
    </if>
    <!-- 状态列表 -->
    <if test="statuses != null and statuses.size() > 0">
      AND status IN
      <foreach collection="statuses" item="status" open="(" close=")" separator=",">
        #{status}
      </foreach>
    </if>
    <!-- VIP 标识 -->
    <if test="isVip != null and isVip == true">
      AND level IN ('VIP', 'SVIP', 'GOLD')
    </if>
  </where>
</select>
```

**场景 4：配合 choose 使用**

```xml
<select id="findByType" resultType="User">
  SELECT * FROM user
  <where>
    <!-- 固定条件 -->
    AND is_deleted = 0
    <!-- 动态条件 -->
    <choose>
      <when test="type == 1">
        AND level = 'VIP'
      </when>
      <when test="type == 2">
        AND points > 1000
      </when>
      <otherwise>
        AND status = 'ACTIVE'
      </otherwise>
    </choose>
    <!-- 其他条件 -->
    <if test="city != null">
      AND city = #{city}
    </if>
  </where>
</select>
```

4. **where 标签 vs WHERE 1=1 对比**

| 对比维度 | WHERE 1=1 | `<where>` 标签 |
|---------|-----------|---------------|
| **SQL 冗余** | ✗ 有多余的 `1=1` | ✓ 无冗余 |
| **可读性** | ✗ 较差 | ✓ 清晰 |
| **性能** | ✗ 微弱影响 | ✓ 最优 |
| **维护性** | ✗ 需要记住加 `1=1` | ✓ 自动处理 |
| **灵活性** | ✓ 简单直接 | ✓ 智能处理 |
| **推荐程度** | ★★☆☆☆ | ★★★★★ |

5. **常见错误与注意事项**

**错误 1：where 内第一个条件不加 AND/OR**

```xml
<!-- ❌ 错误：第一个条件不加 AND -->
<where>
  <if test="name != null">
    name = #{name}  ← 缺少 AND
  </if>
  <if test="age != null">
    AND age = #{age}
  </if>
</where>
<!-- 如果只有 name，生成: WHERE name = ?（正确）-->
<!-- 如果两个都有，生成: WHERE name = ? AND age = ?（正确）-->
<!-- 看似正常，但不统一，容易漏写 AND -->

<!-- ✓ 推荐：统一都加 AND -->
<where>
  <if test="name != null">
    AND name = #{name}
  </if>
  <if test="age != null">
    AND age = #{age}
  </if>
</where>
```

**错误 2：where 标签内有固定条件**

```xml
<!-- ⚠ 注意：固定条件也要加 AND -->
<where>
  AND is_deleted = 0  ← 固定条件
  <if test="name != null">
    AND name = #{name}
  </if>
</where>
<!-- 生成: WHERE is_deleted = 0 AND name = ? -->
<!-- AND is_deleted = 0 的 AND 会被去除 -->

<!-- ✓ 更清晰的写法 -->
<where>
  AND is_deleted = 0
  <if test="name != null">AND name = #{name}</if>
</where>
```

**错误 3：OR 条件处理**

```xml
<!-- ⚠ 注意：OR 也会被去除 -->
<where>
  <if test="name != null">
    OR name = #{name}
  </if>
  <if test="email != null">
    OR email = #{email}
  </if>
</where>
<!-- 如果两个都有，生成: WHERE name = ? OR email = ? -->
<!-- 第一个 OR 被自动去除 -->

<!-- ✓ 正确：用括号包裹 OR 条件 -->
<where>
  <if test="name != null or email != null">
    AND (
      <if test="name != null">name = #{name}</if>
      <if test="name != null and email != null">OR</if>
      <if test="email != null">email = #{email}</if>
    )
  </if>
</where>
```

6. **高级用法：嵌套 where**

```xml
<select id="complexQuery" resultType="User">
  SELECT * FROM user
  <where>
    <!-- 主条件 -->
    <if test="mainCondition != null">
      AND (
        <!-- 嵌套子查询条件 -->
        user_id IN (
          SELECT user_id FROM user_vip
          <where>
            <if test="level != null">AND level = #{level}</if>
            <if test="expireDate != null">AND expire_date > #{expireDate}</if>
          </where>
        )
      )
    </if>
    <!-- 其他条件 -->
    <if test="status != null">
      AND status = #{status}
    </if>
  </where>
</select>
```

7. **where 标签等价的 trim 实现**

```xml
<!-- where 标签 -->
<where>
  <if test="name != null">AND name = #{name}</if>
</where>

<!-- 等价的 trim 实现 -->
<trim prefix="WHERE" prefixOverrides="AND |OR ">
  <if test="name != null">AND name = #{name}</if>
</trim>
```

**关键要点**

1. **where 标签核心功能**
   - 智能添加 WHERE 关键字
   - 自动去除第一个 AND 或 OR
   - 子元素为空时不添加 WHERE

2. **使用原则**
   - 优先使用 `<where>` 代替 `WHERE 1=1`
   - 所有条件统一加 AND（推荐）
   - 固定条件放在最前面

3. **常见组合**
   - `<where>` + `<if>` - 多条件查询
   - `<where>` + `<choose>` - 分支条件
   - `<where>` + `<foreach>` - IN 查询

4. **注意事项**
   - 第一个条件的 AND 会被去除
   - OR 条件需要特别注意括号
   - 避免过度嵌套

**记忆口诀**

```
where 标签最智能，WHERE 关键字自动添
第一个 AND 被去除，多余 OR 也照办
条件为空不添加，SQL 简洁又好看
统一都加 AND 前缀，规范一致不会乱
WHERE 1=1 成历史，where 标签是首选
```

### 30. set 标签的作用是什么？

**核心答案**

`<set>` 标签用于动态生成 UPDATE 语句的 SET 子句，自动处理逗号分隔和移除多余的逗号。

**详细说明**

1. **主要功能**
   - 自动添加 SET 关键字
   - 自动处理字段间的逗号
   - 移除末尾多余的逗号
   - 至少包含一个更新字段

2. **语法结构**

```xml
<update id="updateUser">
  UPDATE user
  <set>
    <if test="username != null">username = #{username},</if>
    <if test="email != null">email = #{email},</if>
    <if test="age != null">age = #{age},</if>
  </set>
  WHERE id = #{id}
</update>
```

3. **工作原理**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px Arial;fill:#333}.code{font:12px monospace;fill:#0066cc}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrowhead)}.note{fill:#fff4e6;stroke:#ffa500;stroke-width:1.5}</style><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0,10 3,0 6" fill="#666"/></marker></defs>
<text x="400" y="25" class="label" text-anchor="middle" font-weight="bold" font-size="16">set 标签处理流程</text>
<rect x="50" y="50" width="700" height="60" class="box" rx="5"/>
<text x="400" y="75" class="label" text-anchor="middle" font-weight="bold">1. 原始 SQL 模板</text>
<text x="400" y="95" class="code" text-anchor="middle">&lt;set&gt;&lt;if test="username!=null"&gt;username=#{username},&lt;/if&gt;...&lt;/set&gt;</text>
<path d="M 400 110 L 400 140" class="arrow"/>
<rect x="50" y="140" width="330" height="80" class="box" rx="5"/>
<text x="215" y="165" class="label" text-anchor="middle" font-weight="bold">2. 条件判断</text>
<text x="215" y="185" class="label" text-anchor="middle">username != null ✓</text>
<text x="215" y="205" class="label" text-anchor="middle">email == null ✗</text>
<rect x="420" y="140" width="330" height="80" class="box" rx="5"/>
<text x="585" y="165" class="label" text-anchor="middle" font-weight="bold">3. 拼接 SQL</text>
<text x="585" y="185" class="code" text-anchor="middle">username = 'John',</text>
<text x="585" y="205" class="code" text-anchor="middle">age = 25,</text>
<path d="M 215 220 L 215 250 L 400 250" class="arrow"/>
<path d="M 585 220 L 585 250 L 400 250" class="arrow"/>
<rect x="50" y="250" width="700" height="60" class="note" rx="5"/>
<text x="400" y="275" class="label" text-anchor="middle" font-weight="bold">4. 移除末尾逗号</text>
<text x="400" y="295" class="code" text-anchor="middle">username = 'John', age = 25</text>
<path d="M 400 310 L 400 340" class="arrow"/>
<rect x="50" y="340" width="700" height="50" class="box" rx="5"/>
<text x="400" y="370" class="code" text-anchor="middle">UPDATE user SET username = 'John', age = 25 WHERE id = 1</text>
</svg>

4. **实际应用场景**

**场景一：部分字段更新**
```xml
<!-- 只更新非空字段 -->
<update id="updateUserSelective">
  UPDATE user
  <set>
    <if test="username != null">username = #{username},</if>
    <if test="email != null">email = #{email},</if>
    <if test="phone != null">phone = #{phone},</if>
    <if test="status != null">status = #{status},</if>
  </set>
  WHERE id = #{id}
</update>
```

**场景二：带条件的字段更新**
```xml
<!-- 根据不同条件更新不同字段 -->
<update id="updateUserByCondition">
  UPDATE user
  <set>
    <if test="type == 1">
      username = #{username},
      email = #{email},
    </if>
    <if test="type == 2">
      phone = #{phone},
      address = #{address},
    </if>
    update_time = NOW()
  </set>
  WHERE id = #{id}
</update>
```

5. **与 trim 标签的对比**

`<set>` 等价于以下 `<trim>` 配置：

```xml
<!-- set 标签 -->
<set>
  <if test="username != null">username = #{username},</if>
</set>

<!-- 等价的 trim 标签 -->
<trim prefix="SET" suffixOverrides=",">
  <if test="username != null">username = #{username},</if>
</trim>
```

6. **注意事项**

**问题：所有条件都不满足**
```xml
<!-- 错误：没有字段可更新 -->
<update id="updateUser">
  UPDATE user
  <set>
    <if test="username != null">username = #{username},</if>
    <if test="email != null">email = #{email},</if>
  </set>
  WHERE id = #{id}
</update>
<!-- 结果：UPDATE user  WHERE id = ? (SQL 语法错误) -->
```

**解决方案：添加默认更新字段**
```xml
<update id="updateUser">
  UPDATE user
  <set>
    <if test="username != null">username = #{username},</if>
    <if test="email != null">email = #{email},</if>
    update_time = NOW()  <!-- 确保至少有一个字段更新 -->
  </set>
  WHERE id = #{id}
</update>
```

**关键要点**

1. **自动处理逗号**：无需手动管理字段间的逗号
2. **动态更新**：只更新传入的非空字段
3. **安全保障**：确保至少包含一个更新字段
4. **简化代码**：比手动拼接 SQL 更简洁安全

**记忆口诀**

📝 **SET 标签三特点**
- 自动加 SET 关键字
- 移除末尾多余逗号
- 至少一个字段更新

### 31. foreach 标签的作用是什么?如何使用?

**核心答案**

`<foreach>` 标签用于遍历集合参数,动态生成 IN 查询、批量插入、批量更新等 SQL 语句,是处理集合类型参数的核心标签。

**详细说明**

1. **核心属性**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px Arial;fill:#333}.attr{font:13px Arial;fill:#0066cc}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.desc{fill:#fff4e6;stroke:#ffa500;stroke-width:1.5}.title{font:16px Arial;font-weight:bold;fill:#333}</style></defs>
<text x="400" y="25" class="title" text-anchor="middle">foreach 标签六大属性</text>
<rect x="50" y="50" width="330" height="80" class="box" rx="5"/>
<text x="215" y="75" class="attr" font-weight="bold">collection</text>
<text x="215" y="95" class="label" text-anchor="middle">指定要遍历的集合</text>
<text x="215" y="115" class="label" text-anchor="middle">list/array/map</text>
<rect x="420" y="50" width="330" height="80" class="box" rx="5"/>
<text x="585" y="75" class="attr" font-weight="bold">item</text>
<text x="585" y="95" class="label" text-anchor="middle">当前迭代的元素</text>
<text x="585" y="115" class="label" text-anchor="middle">#{item} 引用</text>
<rect x="50" y="150" width="330" height="80" class="box" rx="5"/>
<text x="215" y="175" class="attr" font-weight="bold">index</text>
<text x="215" y="195" class="label" text-anchor="middle">当前迭代的索引</text>
<text x="215" y="215" class="label" text-anchor="middle">List:下标 Map:key</text>
<rect x="420" y="150" width="330" height="80" class="box" rx="5"/>
<text x="585" y="175" class="attr" font-weight="bold">open</text>
<text x="585" y="195" class="label" text-anchor="middle">开始字符</text>
<text x="585" y="215" class="label" text-anchor="middle">如: (</text>
<rect x="50" y="250" width="330" height="80" class="box" rx="5"/>
<text x="215" y="275" class="attr" font-weight="bold">close</text>
<text x="215" y="295" class="label" text-anchor="middle">结束字符</text>
<text x="215" y="315" class="label" text-anchor="middle">如: )</text>
<rect x="420" y="250" width="330" height="80" class="box" rx="5"/>
<text x="585" y="275" class="attr" font-weight="bold">separator</text>
<text x="585" y="295" class="label" text-anchor="middle">元素分隔符</text>
<text x="585" y="315" class="label" text-anchor="middle">如: ,</text>
<rect x="50" y="350" width="700" height="40" class="desc" rx="5"/>
<text x="400" y="375" class="label" text-anchor="middle">组合示例: ( item1 , item2 , item3 )</text>
</svg>

2. **基本语法**

```xml
<foreach collection="集合名" item="元素名" index="索引名"
         open="开始字符" close="结束字符" separator="分隔符">
  #{item}
</foreach>
```

3. **常见应用场景**

**场景一: IN 查询**
```xml
<!-- 根据 ID 列表查询用户 -->
<select id="findUsersByIds" resultType="User">
  SELECT * FROM user
  WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</select>

<!-- 生成 SQL: SELECT * FROM user WHERE id IN (1, 2, 3, 4, 5) -->
```

**场景二: 批量插入**
```xml
<!-- 批量插入用户 -->
<insert id="batchInsert">
  INSERT INTO user (username, email, age) VALUES
  <foreach collection="users" item="user" separator=",">
    (#{user.username}, #{user.email}, #{user.age})
  </foreach>
</insert>

<!-- 生成 SQL:
INSERT INTO user (username, email, age) VALUES
('user1', 'user1@email.com', 25),
('user2', 'user2@email.com', 30)
-->
```

**场景三: 批量更新**
```xml
<!-- 批量更新用户状态 -->
<update id="batchUpdate">
  <foreach collection="users" item="user" separator=";">
    UPDATE user
    SET status = #{user.status}
    WHERE id = #{user.id}
  </foreach>
</update>

<!-- 生成 SQL:
UPDATE user SET status = 1 WHERE id = 1;
UPDATE user SET status = 0 WHERE id = 2
-->
```

4. **collection 参数说明**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px Arial;fill:#333}.code{font:12px monospace;fill:#0066cc}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrowhead)}</style><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0,10 3,0 6" fill="#666"/></marker></defs>
<text x="400" y="25" class="label" text-anchor="middle" font-weight="bold" font-size="16">collection 参数类型</text>
<rect x="50" y="50" width="220" height="80" class="box" rx="5"/>
<text x="160" y="75" class="label" text-anchor="middle" font-weight="bold">List 类型</text>
<text x="160" y="95" class="code" text-anchor="middle">collection="list"</text>
<text x="160" y="115" class="label" text-anchor="middle" font-size="12">单个 List 参数</text>
<rect x="290" y="50" width="220" height="80" class="box" rx="5"/>
<text x="400" y="75" class="label" text-anchor="middle" font-weight="bold">Array 类型</text>
<text x="400" y="95" class="code" text-anchor="middle">collection="array"</text>
<text x="400" y="115" class="label" text-anchor="middle" font-size="12">单个数组参数</text>
<rect x="530" y="50" width="220" height="80" class="box" rx="5"/>
<text x="640" y="75" class="label" text-anchor="middle" font-weight="bold">@Param 指定</text>
<text x="640" y="95" class="code" text-anchor="middle">collection="ids"</text>
<text x="640" y="115" class="label" text-anchor="middle" font-size="12">@Param("ids")</text>
<path d="M 160 130 L 160 170" class="arrow"/>
<path d="M 400 130 L 400 170" class="arrow"/>
<path d="M 640 130 L 640 170" class="arrow"/>
<rect x="50" y="170" width="700" height="60" class="box" rx="5"/>
<text x="400" y="195" class="code" text-anchor="middle">List&lt;Integer&gt; findUsersByIds(List&lt;Long&gt; ids)</text>
<text x="400" y="215" class="code" text-anchor="middle">List&lt;User&gt; findUsersByIds(@Param("ids") List&lt;Long&gt; ids)</text>
<rect x="50" y="250" width="220" height="80" class="box" rx="5"/>
<text x="160" y="275" class="label" text-anchor="middle" font-weight="bold">Map 类型</text>
<text x="160" y="295" class="code" text-anchor="middle">collection="map的key"</text>
<text x="160" y="315" class="label" text-anchor="middle" font-size="12">Map 中的集合</text>
<rect x="290" y="250" width="220" height="80" class="box" rx="5"/>
<text x="400" y="275" class="label" text-anchor="middle" font-weight="bold">对象属性</text>
<text x="400" y="295" class="code" text-anchor="middle">collection="user.roles"</text>
<text x="400" y="315" class="label" text-anchor="middle" font-size="12">对象内的集合属性</text>
<rect x="530" y="250" width="220" height="80" class="box" rx="5"/>
<text x="640" y="275" class="label" text-anchor="middle" font-weight="bold">默认名称</text>
<text x="640" y="295" class="code" text-anchor="middle">collection="collection"</text>
<text x="640" y="315" class="label" text-anchor="middle" font-size="12">Collection 接口</text>
</svg>

5. **index 属性的使用**

**List 集合: index 是下标**
```xml
<foreach collection="users" item="user" index="i">
  <!-- i 是从 0 开始的下标 -->
  #{i}: #{user.username}
</foreach>
```

**Map 集合: index 是 key**
```xml
<foreach collection="userMap" item="user" index="key">
  <!-- key 是 Map 的键 -->
  #{key}: #{user.username}
</foreach>
```

6. **高级应用**

**复杂批量插入(带 ON DUPLICATE KEY)**
```xml
<insert id="batchInsertOrUpdate">
  INSERT INTO user (id, username, email) VALUES
  <foreach collection="users" item="user" separator=",">
    (#{user.id}, #{user.username}, #{user.email})
  </foreach>
  ON DUPLICATE KEY UPDATE
    username = VALUES(username),
    email = VALUES(email)
</insert>
```

**动态 OR 条件**
```xml
<select id="searchUsers" resultType="User">
  SELECT * FROM user
  <where>
    <foreach collection="keywords" item="keyword" open="(" close=")" separator="OR">
      username LIKE CONCAT('%', #{keyword}, '%')
    </foreach>
  </where>
</select>
```

7. **注意事项**

**问题 1: 空集合处理**
```xml
<!-- 当集合为空时,会生成: WHERE id IN () -->
<!-- 解决方案: 添加判断 -->
<if test="ids != null and ids.size() > 0">
  WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</if>
```

**问题 2: 批量操作性能**
```xml
<!-- 单条执行效率低 -->
<foreach collection="users" item="user">
  INSERT INTO user VALUES (#{user.id}, #{user.name});
</foreach>

<!-- 批量插入效率高 -->
INSERT INTO user VALUES
<foreach collection="users" item="user" separator=",">
  (#{user.id}, #{user.name})
</foreach>
```

**关键要点**

1. **六大属性**: collection(必填)、item(必填)、index、open、close、separator
2. **三大场景**: IN 查询、批量插入、批量更新
3. **collection 命名**: 单个 List 用 "list",数组用 "array",多参数用 @Param
4. **性能优化**: 批量操作优于循环单条执行

**记忆口诀**

🔄 **foreach 六属性**
- collection 定集合
- item 取元素名
- index 拿索引键
- open 开始符
- close 结束符
- separator 分隔符

### 32. trim 标签的作用是什么？

**核心答案**

`<trim>` 标签是 MyBatis 中最灵活的动态 SQL 标签，用于添加前缀/后缀，并自动移除多余的前缀/后缀，是 `<where>` 和 `<set>` 标签的底层实现。

**详细说明**

1. **四大核心属性**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px Arial;fill:#333}.attr{font:13px Arial;fill:#0066cc;font-weight:bold}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.example{fill:#fff4e6;stroke:#ffa500;stroke-width:1.5}.title{font:16px Arial;font-weight:bold;fill:#333}</style></defs>
<text x="400" y="25" class="title" text-anchor="middle">trim 标签四大属性</text>
<rect x="50" y="50" width="330" height="100" class="box" rx="5"/>
<text x="215" y="75" class="attr" text-anchor="middle">prefix</text>
<text x="215" y="95" class="label" text-anchor="middle">添加前缀</text>
<text x="215" y="115" class="label" text-anchor="middle">在内容前添加指定字符串</text>
<text x="215" y="135" class="label" text-anchor="middle" font-size="12">(当内容不为空时)</text>
<rect x="420" y="50" width="330" height="100" class="box" rx="5"/>
<text x="585" y="75" class="attr" text-anchor="middle">suffix</text>
<text x="585" y="95" class="label" text-anchor="middle">添加后缀</text>
<text x="585" y="115" class="label" text-anchor="middle">在内容后添加指定字符串</text>
<text x="585" y="135" class="label" text-anchor="middle" font-size="12">(当内容不为空时)</text>
<rect x="50" y="170" width="330" height="100" class="box" rx="5"/>
<text x="215" y="195" class="attr" text-anchor="middle">prefixOverrides</text>
<text x="215" y="215" class="label" text-anchor="middle">移除前缀</text>
<text x="215" y="235" class="label" text-anchor="middle">移除内容开头的指定字符</text>
<text x="215" y="255" class="label" text-anchor="middle" font-size="12">如: AND | OR</text>
<rect x="420" y="170" width="330" height="100" class="box" rx="5"/>
<text x="585" y="195" class="attr" text-anchor="middle">suffixOverrides</text>
<text x="585" y="215" class="label" text-anchor="middle">移除后缀</text>
<text x="585" y="235" class="label" text-anchor="middle">移除内容末尾的指定字符</text>
<text x="585" y="255" class="label" text-anchor="middle" font-size="12">如: ,</text>
<rect x="50" y="290" width="700" height="90" class="example" rx="5"/>
<text x="400" y="315" class="label" text-anchor="middle" font-weight="bold">执行顺序</text>
<text x="400" y="335" class="label" text-anchor="middle">1. 移除前缀 (prefixOverrides)</text>
<text x="400" y="355" class="label" text-anchor="middle">2. 移除后缀 (suffixOverrides)</text>
<text x="400" y="375" class="label" text-anchor="middle">3. 添加前缀 (prefix) 和后缀 (suffix)</text>
</svg>

2. **基本语法**

```xml
<trim prefix="前缀" suffix="后缀"
      prefixOverrides="要移除的前缀"
      suffixOverrides="要移除的后缀">
  SQL 内容
</trim>
```

3. **实现 WHERE 标签功能**

```xml
<!-- 使用 where 标签 -->
<where>
  <if test="username != null">AND username = #{username}</if>
  <if test="email != null">AND email = #{email}</if>
</where>

<!-- 等价的 trim 实现 -->
<trim prefix="WHERE" prefixOverrides="AND |OR ">
  <if test="username != null">AND username = #{username}</if>
  <if test="email != null">AND email = #{email}</if>
</trim>

<!-- 说明:
1. prefix="WHERE" - 添加 WHERE 前缀
2. prefixOverrides="AND |OR " - 移除开头的 AND 或 OR
3. 注意: AND 和 OR 后面有空格
-->
```

4. **实现 SET 标签功能**

```xml
<!-- 使用 set 标签 -->
<set>
  <if test="username != null">username = #{username},</if>
  <if test="email != null">email = #{email},</if>
</set>

<!-- 等价的 trim 实现 -->
<trim prefix="SET" suffixOverrides=",">
  <if test="username != null">username = #{username},</if>
  <if test="email != null">email = #{email},</if>
</trim>

<!-- 说明:
1. prefix="SET" - 添加 SET 前缀
2. suffixOverrides="," - 移除末尾的逗号
-->
```

5. **高级应用场景**

**场景一: 动态 INSERT 语句**
```xml
<insert id="insertSelective">
  INSERT INTO user
  <trim prefix="(" suffix=")" suffixOverrides=",">
    <if test="username != null">username,</if>
    <if test="email != null">email,</if>
    <if test="age != null">age,</if>
  </trim>
  <trim prefix="VALUES (" suffix=")" suffixOverrides=",">
    <if test="username != null">#{username},</if>
    <if test="email != null">#{email},</if>
    <if test="age != null">#{age},</if>
  </trim>
</insert>

<!-- 生成 SQL:
INSERT INTO user (username, email) VALUES ('john', 'john@email.com')
-->
```

**场景二: 复杂 WHERE 条件**
```xml
<select id="search" resultType="User">
  SELECT * FROM user
  <trim prefix="WHERE" prefixOverrides="AND |OR ">
    <if test="startDate != null">
      AND create_time &gt;= #{startDate}
    </if>
    <if test="endDate != null">
      AND create_time &lt;= #{endDate}
    </if>
    <trim prefix="AND (" suffix=")" prefixOverrides="OR ">
      <if test="username != null">
        OR username LIKE CONCAT('%', #{username}, '%')
      </if>
      <if test="email != null">
        OR email LIKE CONCAT('%', #{email}, '%')
      </if>
    </trim>
  </trim>
</select>
```

**场景三: 批量更新特定字段**
```xml
<update id="batchUpdateStatus">
  UPDATE user
  <trim prefix="SET" suffixOverrides=",">
    <if test="status != null">status = #{status},</if>
    <if test="updateBy != null">update_by = #{updateBy},</if>
    update_time = NOW(),
  </trim>
  WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</update>
```

6. **执行流程演示**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.label{font:14px Arial;fill:#333}.code{font:12px monospace;fill:#0066cc}.box{fill:#f0f8ff;stroke:#4682b4;stroke-width:2}.arrow{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrowhead)}.highlight{fill:#fff4e6;stroke:#ffa500;stroke-width:1.5}</style><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0,10 3,0 6" fill="#666"/></marker></defs>
<text x="400" y="25" class="label" text-anchor="middle" font-weight="bold" font-size="16">trim 标签执行流程</text>
<rect x="50" y="50" width="700" height="60" class="box" rx="5"/>
<text x="400" y="75" class="label" text-anchor="middle" font-weight="bold">1. 原始内容</text>
<text x="400" y="95" class="code" text-anchor="middle">AND username = 'john' AND email = 'john@email.com',</text>
<path d="M 400 110 L 400 140" class="arrow"/>
<rect x="50" y="140" width="700" height="60" class="highlight" rx="5"/>
<text x="400" y="165" class="label" text-anchor="middle" font-weight="bold">2. 移除前缀 (prefixOverrides="AND |OR ")</text>
<text x="400" y="185" class="code" text-anchor="middle">username = 'john' AND email = 'john@email.com',</text>
<path d="M 400 200 L 400 230" class="arrow"/>
<rect x="50" y="230" width="700" height="60" class="highlight" rx="5"/>
<text x="400" y="255" class="label" text-anchor="middle" font-weight="bold">3. 移除后缀 (suffixOverrides=",")</text>
<text x="400" y="275" class="code" text-anchor="middle">username = 'john' AND email = 'john@email.com'</text>
<path d="M 400 290 L 400 320" class="arrow"/>
<rect x="50" y="320" width="700" height="60" class="box" rx="5"/>
<text x="400" y="345" class="label" text-anchor="middle" font-weight="bold">4. 添加前缀和后缀 (prefix="WHERE")</text>
<text x="400" y="365" class="code" text-anchor="middle">WHERE username = 'john' AND email = 'john@email.com'</text>
<rect x="50" y="400" width="700" height="40" class="highlight" rx="5"/>
<text x="400" y="425" class="label" text-anchor="middle" font-style="italic">注意: 如果内容为空，则不添加 prefix 和 suffix</text>
</svg>

7. **注意事项**

**问题 1: 空格的重要性**
```xml
<!-- 错误: 缺少空格 -->
<trim prefixOverrides="AND|OR">
  <!-- 无法正确移除 "AND " 或 "OR " -->
</trim>

<!-- 正确: 包含空格 -->
<trim prefixOverrides="AND |OR ">
  <!-- 可以正确移除 "AND " 或 "OR " -->
</trim>
```

**问题 2: 多个分隔符**
```xml
<!-- 使用 | 分隔多个要移除的字符串 -->
<trim prefixOverrides="AND |OR |WHERE ">
  <!-- 可以移除 AND、OR、WHERE -->
</trim>

<trim suffixOverrides=", |; ">
  <!-- 可以移除逗号或分号 -->
</trim>
```

**问题 3: 内容为空的处理**
```xml
<!-- 所有条件都不满足时 -->
<trim prefix="WHERE" prefixOverrides="AND ">
  <if test="false">AND username = #{username}</if>
</trim>
<!-- 结果: 不会添加 WHERE，避免 SQL 语法错误 -->
```

8. **与其他标签对比**

| 标签 | trim 等价写法 | 使用场景 |
|------|--------------|----------|
| `<where>` | `prefix="WHERE" prefixOverrides="AND \|OR "` | WHERE 条件 |
| `<set>` | `prefix="SET" suffixOverrides=","` | UPDATE SET |
| 自定义 | 任意组合四个属性 | 复杂场景 |

**关键要点**

1. **最灵活**: trim 是最底层、最灵活的动态 SQL 标签
2. **四属性**: prefix、suffix、prefixOverrides、suffixOverrides
3. **执行顺序**: 先移除前后缀，再添加前后缀
4. **注意空格**: prefixOverrides 和 suffixOverrides 中的空格很重要
5. **空内容保护**: 内容为空时不添加 prefix 和 suffix

**记忆口诀**

✂️ **trim 标签四步走**
- 先移除前缀词 (prefixOverrides)
- 再移除后缀符 (suffixOverrides)
- 添加前缀串 (prefix)
- 添加后缀串 (suffix)
- 内容空不处理
