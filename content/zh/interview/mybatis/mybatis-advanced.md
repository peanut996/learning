## 高级特性
### 76. 如何获取自增主键的值?

**核心答案**

MyBatis 提供了三种方式获取自增主键:

1. **useGeneratedKeys + keyProperty** (推荐,仅支持支持自增主键的数据库如 MySQL)
2. **selectKey 标签** (通用方案,支持所有数据库)
3. **返回影响行数后手动查询** (不推荐)

**详细说明**

**1. useGeneratedKeys 方式 (推荐)**

最简单高效的方式,适用于 MySQL、PostgreSQL 等支持 JDBC getGeneratedKeys 的数据库:

```xml
<insert id="insertUser" useGeneratedKeys="true" keyProperty="id">
    INSERT INTO user (username, email) VALUES (#{username}, #{email})
</insert>
```

使用方式:
```java
User user = new User("张三", "zhangsan@example.com");
userMapper.insertUser(user);
// 插入后,user.getId() 就能获取到自增主键值
System.out.println("生成的主键: " + user.getId());
```

**批量插入获取主键**:
```xml
<insert id="batchInsert" useGeneratedKeys="true" keyProperty="id">
    INSERT INTO user (username, email) VALUES
    <foreach collection="list" item="user" separator=",">
        (#{user.username}, #{user.email})
    </foreach>
</insert>
```

**2. selectKey 标签 (通用方案)**

通过额外的 SELECT 语句获取主键,支持所有数据库:

MySQL 方式:
```xml
<insert id="insertUser">
    <selectKey keyProperty="id" resultType="long" order="AFTER">
        SELECT LAST_INSERT_ID()
    </selectKey>
    INSERT INTO user (username, email) VALUES (#{username}, #{email})
</insert>
```

Oracle 序列方式:
```xml
<insert id="insertUser">
    <selectKey keyProperty="id" resultType="long" order="BEFORE">
        SELECT USER_SEQ.NEXTVAL FROM DUAL
    </selectKey>
    INSERT INTO user (id, username, email) VALUES (#{id}, #{username}, #{email})
</insert>
```

**3. 注解方式**

```java
@Options(useGeneratedKeys = true, keyProperty = "id")
@Insert("INSERT INTO user (username, email) VALUES (#{username}, #{email})")
int insertUser(User user);
```

**关键配置属性**

<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="20" width="700" height="340" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="8"/>
<text x="400" y="50" font-size="18" font-weight="bold" text-anchor="middle" fill="#212529">主键获取配置属性</text>
<rect x="80" y="80" width="280" height="260" fill="white" stroke="#0d6efd" stroke-width="2" rx="6"/>
<text x="220" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="#0d6efd">useGeneratedKeys 属性</text>
<text x="100" y="145" font-size="14" fill="#495057">• useGeneratedKeys</text>
<text x="120" y="170" font-size="13" fill="#6c757d">启用 JDBC getGeneratedKeys</text>
<text x="100" y="200" font-size="14" fill="#495057">• keyProperty</text>
<text x="120" y="225" font-size="13" fill="#6c757d">主键映射到的对象属性</text>
<text x="100" y="255" font-size="14" fill="#495057">• keyColumn</text>
<text x="120" y="280" font-size="13" fill="#6c757d">数据库主键列名 (可选)</text>
<text x="120" y="305" font-size="12" fill="#6c757d">多列主键逗号分隔</text>
<rect x="440" y="80" width="280" height="260" fill="white" stroke="#198754" stroke-width="2" rx="6"/>
<text x="580" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="#198754">selectKey 属性</text>
<text x="460" y="145" font-size="14" fill="#495057">• keyProperty</text>
<text x="480" y="170" font-size="13" fill="#6c757d">结果映射到的对象属性</text>
<text x="460" y="200" font-size="14" fill="#495057">• resultType</text>
<text x="480" y="225" font-size="13" fill="#6c757d">主键的 Java 类型</text>
<text x="460" y="255" font-size="14" fill="#495057">• order</text>
<text x="480" y="280" font-size="13" fill="#6c757d">BEFORE: 插入前执行</text>
<text x="480" y="305" font-size="13" fill="#6c757d">AFTER: 插入后执行</text>
</svg>

**执行流程对比**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#495057"/>
</marker>
</defs>
<rect x="50" y="20" width="700" height="460" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="8"/>
<text x="400" y="50" font-size="18" font-weight="bold" text-anchor="middle" fill="#212529">两种方式执行流程对比</text>
<rect x="80" y="80" width="300" height="380" fill="white" stroke="#0d6efd" stroke-width="2" rx="6"/>
<text x="230" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="#0d6efd">useGeneratedKeys 流程</text>
<rect x="100" y="130" width="260" height="50" fill="#e7f1ff" stroke="#0d6efd" rx="4"/>
<text x="230" y="160" font-size="13" text-anchor="middle" fill="#212529">1. 执行 INSERT 语句</text>
<line x1="230" y1="180" x2="230" y2="200" stroke="#495057" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="200" width="260" height="50" fill="#e7f1ff" stroke="#0d6efd" rx="4"/>
<text x="230" y="230" font-size="13" text-anchor="middle" fill="#212529">2. JDBC 获取生成的键</text>
<line x1="230" y1="250" x2="230" y2="270" stroke="#495057" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="270" width="260" height="50" fill="#e7f1ff" stroke="#0d6efd" rx="4"/>
<text x="230" y="300" font-size="13" text-anchor="middle" fill="#212529">3. 自动设置到对象属性</text>
<line x1="230" y1="320" x2="230" y2="340" stroke="#495057" stroke-width="2" marker-end="url(#arrowhead)"/>
<ellipse cx="230" cy="360" rx="100" ry="30" fill="#d1e7dd" stroke="#198754" stroke-width="2"/>
<text x="230" y="368" font-size="14" font-weight="bold" text-anchor="middle" fill="#198754">完成 (1次数据库交互)</text>
<rect x="420" y="80" width="300" height="380" fill="white" stroke="#198754" stroke-width="2" rx="6"/>
<text x="570" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="#198754">selectKey 流程 (AFTER)</text>
<rect x="440" y="130" width="260" height="50" fill="#d1e7dd" stroke="#198754" rx="4"/>
<text x="570" y="160" font-size="13" text-anchor="middle" fill="#212529">1. 执行 INSERT 语句</text>
<line x1="570" y1="180" x2="570" y2="200" stroke="#495057" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="440" y="200" width="260" height="50" fill="#d1e7dd" stroke="#198754" rx="4"/>
<text x="570" y="230" font-size="13" text-anchor="middle" fill="#212529">2. 执行 selectKey 查询</text>
<line x1="570" y1="250" x2="570" y2="270" stroke="#495057" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="440" y="270" width="260" height="50" fill="#d1e7dd" stroke="#198754" rx="4"/>
<text x="570" y="300" font-size="13" text-anchor="middle" fill="#212529">3. 获取查询结果</text>
<line x1="570" y1="320" x2="570" y2="340" stroke="#495057" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="440" y="340" width="260" height="50" fill="#d1e7dd" stroke="#198754" rx="4"/>
<text x="570" y="370" font-size="13" text-anchor="middle" fill="#212529">4. 设置到对象属性</text>
<line x1="570" y1="390" x2="570" y2="410" stroke="#495057" stroke-width="2" marker-end="url(#arrowhead)"/>
<ellipse cx="570" cy="430" rx="100" ry="30" fill="#cfe2ff" stroke="#0d6efd" stroke-width="2"/>
<text x="570" y="438" font-size="14" font-weight="bold" text-anchor="middle" fill="#0d6efd">完成 (2次数据库交互)</text>
</svg>

**不同数据库的获取方式**

| 数据库 | useGeneratedKeys | selectKey 函数 |
|--------|-----------------|----------------|
| MySQL | ✅ 支持 | `LAST_INSERT_ID()` |
| PostgreSQL | ✅ 支持 | `CURRVAL('sequence_name')` |
| Oracle | ❌ 不支持 | `SEQUENCE.NEXTVAL` (BEFORE) |
| SQL Server | ✅ 支持 | `SCOPE_IDENTITY()` |
| DB2 | ✅ 支持 | `IDENTITY_VAL_LOCAL()` |

**关键要点**

1. **推荐优先级**: useGeneratedKeys > selectKey > 手动查询
2. **MySQL 最佳实践**: 使用 `useGeneratedKeys="true"`,简单高效
3. **Oracle 最佳实践**: 使用 `selectKey` + 序列,在 BEFORE 时机获取
4. **批量插入**: useGeneratedKeys 同样适用,会按顺序填充每个对象的主键
5. **性能差异**: useGeneratedKeys 只需一次数据库交互,selectKey 需要两次
6. **keyProperty 必须**: 指定主键要设置到对象的哪个属性
7. **多主键支持**: keyProperty 和 keyColumn 可用逗号分隔多个值

**记忆口诀**

**获主方式三选一,推荐方式是 Generated Keys**
**selectKey 通用全支持,BEFORE AFTER 要分清**
**MySQL 一次交互快,Oracle 序列要先取**

### 77. 如何实现批量操作？

**核心答案**

MyBatis 支持三种批量操作方式：**批量 Executor**（推荐）、**foreach 标签**和 **JDBC 批处理**。批量 Executor 通过缓存 SQL 语句并一次性提交到数据库来提高性能，适合大数据量操作。

**详细说明**

**1. 批量 Executor（推荐方式）**

通过设置 ExecutorType.BATCH 使用批量执行器：

```java
// 方式 1：SqlSessionFactory 获取批量 SqlSession
SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH);
try {
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    for (User user : userList) {
        mapper.insertUser(user);  // 添加到批处理队列
    }
    sqlSession.commit();  // 一次性提交所有操作
} finally {
    sqlSession.close();
}

// 方式 2：Spring 中使用 SqlSessionTemplate
SqlSessionTemplate batchTemplate = new SqlSessionTemplate(
    sqlSessionFactory, ExecutorType.BATCH);
```

**2. foreach 标签批量插入**

适合中小数据量的批量插入：

```xml
<!-- Mapper.xml -->
<insert id="batchInsert" parameterType="list">
    INSERT INTO user (name, age, email) VALUES
    <foreach collection="list" item="user" separator=",">
        (#{user.name}, #{user.age}, #{user.email})
    </foreach>
</insert>

<!-- 使用 -->
mapper.batchInsert(userList);
```

**3. JDBC 批处理**

在 MyBatis 配置中开启批处理支持：

```xml
<!-- mybatis-config.xml -->
<settings>
    <setting name="defaultExecutorType" value="BATCH"/>
</settings>
```

**三种方式对比**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead77" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="20" y="20" width="760" height="380" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="8"/>
<text x="400" y="50" font-size="18" font-weight="bold" text-anchor="middle" fill="#212529">MyBatis 批量操作对比</text>
<rect x="50" y="80" width="220" height="300" fill="#e7f5ff" stroke="#339af0" stroke-width="2" rx="6"/>
<text x="160" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="#1971c2">批量 Executor</text>
<text x="60" y="140" font-size="13" fill="#495057">✓ 性能最优</text>
<text x="60" y="165" font-size="13" fill="#495057">✓ 适合大数据量</text>
<text x="60" y="190" font-size="13" fill="#495057">✓ 自动批处理</text>
<text x="60" y="215" font-size="13" fill="#495057">✓ 减少网络开销</text>
<text x="60" y="245" font-size="12" fill="#868e96">适用场景：</text>
<text x="60" y="265" font-size="12" fill="#495057">• 10000+ 条数据</text>
<text x="60" y="285" font-size="12" fill="#495057">• 高频批量操作</text>
<text x="60" y="310" font-size="12" fill="#868e96">注意事项：</text>
<text x="60" y="330" font-size="11" fill="#fa5252">需手动管理 SqlSession</text>
<text x="60" y="350" font-size="11" fill="#fa5252">不能获取自增主键</text>
<rect x="290" y="80" width="220" height="300" fill="#fff4e6" stroke="#fd7e14" stroke-width="2" rx="6"/>
<text x="400" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="#d9480f">foreach 标签</text>
<text x="300" y="140" font-size="13" fill="#495057">✓ 简单易用</text>
<text x="300" y="165" font-size="13" fill="#495057">✓ 一条 SQL 语句</text>
<text x="300" y="190" font-size="13" fill="#495057">✓ Spring 集成好</text>
<text x="300" y="215" font-size="13" fill="#495057">⚠ SQL 长度限制</text>
<text x="300" y="245" font-size="12" fill="#868e96">适用场景：</text>
<text x="300" y="265" font-size="12" fill="#495057">• 100-1000 条数据</text>
<text x="300" y="285" font-size="12" fill="#495057">• 中小批量插入</text>
<text x="300" y="310" font-size="12" fill="#868e96">注意事项：</text>
<text x="300" y="330" font-size="11" fill="#fa5252">SQL 长度不能超限</text>
<text x="300" y="350" font-size="11" fill="#fa5252">内存占用较大</text>
<rect x="530" y="80" width="220" height="300" fill="#f3f0ff" stroke="#7950f2" stroke-width="2" rx="6"/>
<text x="640" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="#5f3dc4">JDBC 批处理</text>
<text x="540" y="140" font-size="13" fill="#495057">✓ 兼容性好</text>
<text x="540" y="165" font-size="13" fill="#495057">✓ 全局配置</text>
<text x="540" y="190" font-size="13" fill="#495057">⚠ 性能一般</text>
<text x="540" y="215" font-size="13" fill="#495057">⚠ 配置复杂</text>
<text x="540" y="245" font-size="12" fill="#868e96">适用场景：</text>
<text x="540" y="265" font-size="12" fill="#495057">• 小批量操作</text>
<text x="540" y="285" font-size="12" fill="#495057">• 简单场景</text>
<text x="540" y="310" font-size="12" fill="#868e96">注意事项：</text>
<text x="540" y="330" font-size="11" fill="#fa5252">影响所有操作</text>
<text x="540" y="350" font-size="11" fill="#fa5252">调试较困难</text>
</svg>

**性能优化建议**

1. **选择合适的批量大小**
   - 小批量（< 100）：使用 foreach 标签
   - 中批量（100-1000）：使用 foreach 或批量 Executor
   - 大批量（> 1000）：使用批量 Executor，分批提交

2. **分批提交策略**

```java
int batchSize = 1000;
List<User> userList = ...; // 10000 条数据

try (SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH)) {
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);

    for (int i = 0; i < userList.size(); i++) {
        mapper.insertUser(userList.get(i));

        // 每 1000 条提交一次
        if ((i + 1) % batchSize == 0) {
            sqlSession.commit();
            sqlSession.clearCache();  // 清除缓存防止内存溢出
        }
    }

    // 提交剩余数据
    sqlSession.commit();
}
```

3. **关闭自动提交**

```java
SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
// false 表示关闭自动提交，手动控制提交时机
```

**关键要点**

1. **性能排序**：批量 Executor > foreach 标签 > JDBC 批处理
2. **数据量选择**：根据数据量选择合适的批量方式
3. **分批提交**：大数据量操作需要分批提交防止内存溢出
4. **事务控制**：批量操作要注意事务的提交和回滚

**记忆口诀**

> 批量操作三方式，Executor 性能最优秀
> foreach 标签中批量，千条以内较适用
> JDBC 批处理简单，全局配置要谨慎
> 分批提交防溢出，手动管理事务稳

### 78. 什么是类型处理器（TypeHandler）？如何自定义？

**核心答案**

TypeHandler 是 MyBatis 中负责 **Java 类型与 JDBC 类型互相转换** 的组件。它在设置参数时将 Java 类型转为 JDBC 类型，在获取结果时将 JDBC 类型转为 Java 类型。自定义 TypeHandler 通过实现 TypeHandler 接口或继承 BaseTypeHandler 类来完成。

**详细说明**

**1. TypeHandler 工作原理**

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead78" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="20" y="20" width="760" height="380" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="8"/>
<text x="400" y="50" font-size="18" font-weight="bold" text-anchor="middle" fill="#212529">TypeHandler 工作流程</text>
<rect x="100" y="90" width="180" height="80" fill="#e7f5ff" stroke="#339af0" stroke-width="2" rx="6"/>
<text x="190" y="120" font-size="15" font-weight="bold" text-anchor="middle" fill="#1971c2">Java 对象</text>
<text x="190" y="145" font-size="13" text-anchor="middle" fill="#495057">String / Date</text>
<text x="190" y="165" font-size="13" text-anchor="middle" fill="#495057">Enum / Custom</text>
<rect x="520" y="90" width="180" height="80" fill="#e7f5ff" stroke="#339af0" stroke-width="2" rx="6"/>
<text x="610" y="120" font-size="15" font-weight="bold" text-anchor="middle" fill="#1971c2">数据库字段</text>
<text x="610" y="145" font-size="13" text-anchor="middle" fill="#495057">VARCHAR / DATE</text>
<text x="610" y="165" font-size="13" text-anchor="middle" fill="#495057">INT / BLOB</text>
<rect x="320" y="80" width="160" height="100" fill="#fff4e6" stroke="#fd7e14" stroke-width="2" rx="6"/>
<text x="400" y="110" font-size="15" font-weight="bold" text-anchor="middle" fill="#d9480f">TypeHandler</text>
<text x="400" y="135" font-size="12" text-anchor="middle" fill="#495057">setParameter()</text>
<text x="400" y="155" font-size="12" text-anchor="middle" fill="#495057">getResult()</text>
<line x1="280" y1="110" x2="315" y2="110" stroke="#339af0" stroke-width="2" marker-end="url(#arrowhead78)"/>
<text x="297" y="105" font-size="11" fill="#495057">设参</text>
<line x1="485" y1="110" x2="520" y2="110" stroke="#339af0" stroke-width="2" marker-end="url(#arrowhead78)"/>
<text x="502" y="105" font-size="11" fill="#495057">写库</text>
<line x1="520" y1="150" x2="485" y2="150" stroke="#40c057" stroke-width="2" marker-end="url(#arrowhead78)"/>
<text x="502" y="145" font-size="11" fill="#495057">读库</text>
<line x1="315" y1="150" x2="280" y2="150" stroke="#40c057" stroke-width="2" marker-end="url(#arrowhead78)"/>
<text x="297" y="145" font-size="11" fill="#495057">取值</text>
<rect x="80" y="220" width="320" height="160" fill="#f3f0ff" stroke="#7950f2" stroke-width="2" rx="6"/>
<text x="240" y="245" font-size="14" font-weight="bold" text-anchor="middle" fill="#5f3dc4">设置参数流程 (setParameter)</text>
<circle cx="110" cy="270" r="18" fill="#7950f2"/>
<text x="110" y="276" font-size="14" font-weight="bold" text-anchor="middle" fill="white">1</text>
<text x="140" y="275" font-size="12" fill="#495057">接收 Java 对象值</text>
<line x1="110" y1="288" x2="110" y2="303" stroke="#7950f2" stroke-width="2" marker-end="url(#arrowhead78)"/>
<circle cx="110" cy="318" r="18" fill="#7950f2"/>
<text x="110" y="324" font-size="14" font-weight="bold" text-anchor="middle" fill="white">2</text>
<text x="140" y="323" font-size="12" fill="#495057">类型转换 / 特殊处理</text>
<line x1="110" y1="336" x2="110" y2="351" stroke="#7950f2" stroke-width="2" marker-end="url(#arrowhead78)"/>
<circle cx="110" cy="366" r="18" fill="#7950f2"/>
<text x="110" y="372" font-size="14" font-weight="bold" text-anchor="middle" fill="white">3</text>
<text x="140" y="371" font-size="12" fill="#495057">设置到 PreparedStatement</text>
<rect x="420" y="220" width="320" height="160" fill="#d0ebff" stroke="#339af0" stroke-width="2" rx="6"/>
<text x="580" y="245" font-size="14" font-weight="bold" text-anchor="middle" fill="#1971c2">获取结果流程 (getResult)</text>
<circle cx="450" cy="270" r="18" fill="#339af0"/>
<text x="450" y="276" font-size="14" font-weight="bold" text-anchor="middle" fill="white">1</text>
<text x="480" y="275" font-size="12" fill="#495057">从 ResultSet 读取值</text>
<line x1="450" y1="288" x2="450" y2="303" stroke="#339af0" stroke-width="2" marker-end="url(#arrowhead78)"/>
<circle cx="450" cy="318" r="18" fill="#339af0"/>
<text x="450" y="324" font-size="14" font-weight="bold" text-anchor="middle" fill="white">2</text>
<text x="480" y="323" font-size="12" fill="#495057">类型转换 / 反序列化</text>
<line x1="450" y1="336" x2="450" y2="351" stroke="#339af0" stroke-width="2" marker-end="url(#arrowhead78)"/>
<circle cx="450" cy="366" r="18" fill="#339af0"/>
<text x="450" y="372" font-size="14" font-weight="bold" text-anchor="middle" fill="white">3</text>
<text x="480" y="371" font-size="12" fill="#495057">返回 Java 对象</text>
</svg>

**2. 自定义 TypeHandler 实现步骤**

**步骤 1：创建 TypeHandler 类**

```java
// 方式 1：继承 BaseTypeHandler（推荐）
public class JsonTypeHandler extends BaseTypeHandler<User> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i,
                                     User parameter, JdbcType jdbcType)
        throws SQLException {
        // Java 对象 → JSON 字符串 → 数据库
        ps.setString(i, JSON.toJSONString(parameter));
    }

    @Override
    public User getNullableResult(ResultSet rs, String columnName)
        throws SQLException {
        // 数据库 → JSON 字符串 → Java 对象
        String json = rs.getString(columnName);
        return json == null ? null : JSON.parseObject(json, User.class);
    }

    @Override
    public User getNullableResult(ResultSet rs, int columnIndex)
        throws SQLException {
        String json = rs.getString(columnIndex);
        return json == null ? null : JSON.parseObject(json, User.class);
    }

    @Override
    public User getNullableResult(CallableStatement cs, int columnIndex)
        throws SQLException {
        String json = cs.getString(columnIndex);
        return json == null ? null : JSON.parseObject(json, User.class);
    }
}

// 方式 2：实现 TypeHandler 接口
public class CustomTypeHandler implements TypeHandler<CustomType> {
    // 需要实现 4 个方法
}
```

**步骤 2：注册 TypeHandler**

```xml
<!-- mybatis-config.xml -->
<typeHandlers>
    <!-- 方式 1：指定类型和处理器 -->
    <typeHandler handler="com.example.handler.JsonTypeHandler"
                 javaType="com.example.User"
                 jdbcType="VARCHAR"/>

    <!-- 方式 2：自动扫描包 -->
    <package name="com.example.handler"/>
</typeHandlers>
```

**步骤 3：使用 TypeHandler**

```xml
<!-- Mapper.xml -->
<resultMap id="userMap" type="User">
    <id column="id" property="id"/>
    <!-- 指定使用自定义 TypeHandler -->
    <result column="extra_info" property="extraInfo"
            typeHandler="com.example.handler.JsonTypeHandler"/>
</resultMap>

<insert id="insertUser">
    INSERT INTO user (id, extra_info)
    VALUES (#{id}, #{extraInfo, typeHandler=com.example.handler.JsonTypeHandler})
</insert>
```

**3. 常见使用场景**

**场景 1：枚举类型处理**

```java
// 枚举类
public enum Gender {
    MALE(1, "男"),
    FEMALE(2, "女");

    private int code;
    private String desc;

    // 构造器和 getter...
}

// 枚举 TypeHandler
public class GenderTypeHandler extends BaseTypeHandler<Gender> {
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i,
                                     Gender parameter, JdbcType jdbcType)
        throws SQLException {
        ps.setInt(i, parameter.getCode());  // 存储编码
    }

    @Override
    public Gender getNullableResult(ResultSet rs, String columnName)
        throws SQLException {
        int code = rs.getInt(columnName);
        return Gender.fromCode(code);  // 根据编码获取枚举
    }
    // 其他方法类似...
}
```

**场景 2：JSON 数据处理**

```java
// JSON 字段处理器
@MappedTypes(Map.class)
@MappedJdbcTypes(JdbcType.VARCHAR)
public class JsonMapTypeHandler extends BaseTypeHandler<Map<String, Object>> {
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i,
                                     Map<String, Object> parameter,
                                     JdbcType jdbcType) throws SQLException {
        ps.setString(i, JSON.toJSONString(parameter));
    }

    @Override
    public Map<String, Object> getNullableResult(ResultSet rs, String columnName)
        throws SQLException {
        String json = rs.getString(columnName);
        return json == null ? null : JSON.parseObject(json, Map.class);
    }
    // 其他方法类似...
}
```

**场景 3：加密字段处理**

```java
// 加密 TypeHandler
public class EncryptTypeHandler extends BaseTypeHandler<String> {
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i,
                                     String parameter, JdbcType jdbcType)
        throws SQLException {
        // 加密后存储
        ps.setString(i, AES.encrypt(parameter));
    }

    @Override
    public String getNullableResult(ResultSet rs, String columnName)
        throws SQLException {
        String encrypted = rs.getString(columnName);
        // 解密后返回
        return encrypted == null ? null : AES.decrypt(encrypted);
    }
    // 其他方法类似...
}
```

**4. TypeHandler 注解**

```java
// 使用注解指定适用的类型
@MappedTypes(User.class)           // Java 类型
@MappedJdbcTypes(JdbcType.VARCHAR) // JDBC 类型
public class UserTypeHandler extends BaseTypeHandler<User> {
    // ...
}
```

**关键要点**

1. **核心作用**：TypeHandler 负责 Java 类型和 JDBC 类型的双向转换
2. **实现方式**：推荐继承 BaseTypeHandler，需实现 4 个方法
3. **常见场景**：枚举转换、JSON 处理、数据加密、自定义类型映射
4. **注册方式**：在 mybatis-config.xml 中注册或使用注解自动识别

**记忆口诀**

> TypeHandler 类型转换器，Java 数据库来互换
> Base 继承实现四方法，设参取值要记全
> 枚举 JSON 加密用，注册配置不可少
> 自定义类型有妙用，扩展 MyBatis 真方便

### 79. 什么是对象工厂（ObjectFactory）？

**核心答案**

ObjectFactory 是 MyBatis 中负责 **创建结果对象实例** 的工厂类。当 MyBatis 从数据库查询结果并需要将数据映射到 Java 对象时，会通过 ObjectFactory 来创建目标对象。自定义 ObjectFactory 可以控制对象的创建过程，实现依赖注入、对象池等高级功能。

**详细说明**

**1. ObjectFactory 工作原理**

<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead79" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="20" y="20" width="760" height="440" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="8"/>
<text x="400" y="50" font-size="18" font-weight="bold" text-anchor="middle" fill="#212529">ObjectFactory 工作流程</text>
<rect x="80" y="90" width="160" height="70" fill="#e7f5ff" stroke="#339af0" stroke-width="2" rx="6"/>
<text x="160" y="115" font-size="14" font-weight="bold" text-anchor="middle" fill="#1971c2">执行 SQL 查询</text>
<text x="160" y="140" font-size="12" text-anchor="middle" fill="#495057">SELECT * FROM</text>
<text x="160" y="155" font-size="12" text-anchor="middle" fill="#495057">user WHERE id=1</text>
<rect x="320" y="90" width="160" height="70" fill="#fff4e6" stroke="#fd7e14" stroke-width="2" rx="6"/>
<text x="400" y="115" font-size="14" font-weight="bold" text-anchor="middle" fill="#d9480f">获取 ResultSet</text>
<text x="400" y="140" font-size="11" text-anchor="middle" fill="#495057">id=1, name=张三</text>
<text x="400" y="155" font-size="11" text-anchor="middle" fill="#495057">age=25, email=...</text>
<rect x="560" y="90" width="160" height="70" fill="#f3f0ff" stroke="#7950f2" stroke-width="2" rx="6"/>
<text x="640" y="115" font-size="14" font-weight="bold" text-anchor="middle" fill="#5f3dc4">ObjectFactory</text>
<text x="640" y="140" font-size="12" text-anchor="middle" fill="#495057">创建对象实例</text>
<text x="640" y="155" font-size="12" text-anchor="middle" fill="#495057">new User()</text>
<line x1="240" y1="125" x2="315" y2="125" stroke="#339af0" stroke-width="2" marker-end="url(#arrowhead79)"/>
<line x1="480" y1="125" x2="555" y2="125" stroke="#fd7e14" stroke-width="2" marker-end="url(#arrowhead79)"/>
<rect x="200" y="210" width="400" height="230" fill="#d0ebff" stroke="#339af0" stroke-width="2" rx="6"/>
<text x="400" y="240" font-size="15" font-weight="bold" text-anchor="middle" fill="#1971c2">ObjectFactory 创建对象的三种方式</text>
<rect x="220" y="260" width="160" height="60" fill="#e7f5ff" stroke="#339af0" stroke-width="1.5" rx="4"/>
<text x="300" y="280" font-size="13" font-weight="bold" text-anchor="middle" fill="#1971c2">方式 1</text>
<text x="300" y="300" font-size="11" text-anchor="middle" fill="#495057">无参构造器</text>
<text x="300" y="315" font-size="10" text-anchor="middle" fill="#868e96">new User()</text>
<rect x="420" y="260" width="160" height="60" fill="#e7f5ff" stroke="#339af0" stroke-width="1.5" rx="4"/>
<text x="500" y="280" font-size="13" font-weight="bold" text-anchor="middle" fill="#1971c2">方式 2</text>
<text x="500" y="300" font-size="11" text-anchor="middle" fill="#495057">有参构造器</text>
<text x="500" y="315" font-size="10" text-anchor="middle" fill="#868e96">new User(id, name)</text>
<rect x="220" y="340" width="160" height="60" fill="#e7f5ff" stroke="#339af0" stroke-width="1.5" rx="4"/>
<text x="300" y="360" font-size="13" font-weight="bold" text-anchor="middle" fill="#1971c2">方式 3</text>
<text x="300" y="380" font-size="11" text-anchor="middle" fill="#495057">静态工厂方法</text>
<text x="300" y="395" font-size="10" text-anchor="middle" fill="#868e96">User.create()</text>
<rect x="420" y="340" width="160" height="60" fill="#fff4e6" stroke="#fd7e14" stroke-width="1.5" rx="4"/>
<text x="500" y="360" font-size="13" font-weight="bold" text-anchor="middle" fill="#d9480f">创建后</text>
<text x="500" y="380" font-size="11" text-anchor="middle" fill="#495057">属性赋值</text>
<text x="500" y="395" font-size="10" text-anchor="middle" fill="#868e96">setter 方法注入</text>
</svg>

**2. 默认 ObjectFactory**

MyBatis 提供的默认实现 `DefaultObjectFactory`：

```java
public class DefaultObjectFactory implements ObjectFactory {
    // 使用默认构造器创建对象
    @Override
    public <T> T create(Class<T> type) {
        return create(type, null, null);
    }

    // 使用指定构造器创建对象
    @Override
    public <T> T create(Class<T> type, List<Class<?>> constructorArgTypes,
                        List<Object> constructorArgs) {
        Class<?> classToCreate = resolveInterface(type);
        return (T) instantiateClass(classToCreate,
                                     constructorArgTypes,
                                     constructorArgs);
    }

    // 判断是否是集合类型
    @Override
    public <T> boolean isCollection(Class<T> type) {
        return Collection.class.isAssignableFrom(type);
    }
}
```

**3. 自定义 ObjectFactory**

**步骤 1：创建自定义 ObjectFactory**

```java
public class CustomObjectFactory extends DefaultObjectFactory {

    private static final long serialVersionUID = 1L;

    @Override
    public <T> T create(Class<T> type) {
        System.out.println("创建对象：" + type.getName());
        return super.create(type);
    }

    @Override
    public <T> T create(Class<T> type,
                        List<Class<?>> constructorArgTypes,
                        List<Object> constructorArgs) {
        System.out.println("使用有参构造器创建：" + type.getName());
        return super.create(type, constructorArgTypes, constructorArgs);
    }

    @Override
    public void setProperties(Properties properties) {
        // 可以接收配置参数
        super.setProperties(properties);
        System.out.println("ObjectFactory 配置参数：" + properties);
    }
}
```

**步骤 2：注册 ObjectFactory**

```xml
<!-- mybatis-config.xml -->
<objectFactory type="com.example.CustomObjectFactory">
    <property name="prop1" value="value1"/>
    <property name="prop2" value="value2"/>
</objectFactory>
```

**4. 实际应用场景**

**场景 1：依赖注入**

```java
// 为创建的对象注入 Spring Bean
public class SpringObjectFactory extends DefaultObjectFactory {

    @Autowired
    private ApplicationContext applicationContext;

    @Override
    public <T> T create(Class<T> type) {
        T instance = super.create(type);

        // 对创建的对象进行依赖注入
        if (applicationContext != null) {
            applicationContext.getAutowireCapableBeanFactory()
                .autowireBean(instance);
        }

        return instance;
    }
}
```

**场景 2：对象池管理**

```java
// 使用对象池提高性能
public class PooledObjectFactory extends DefaultObjectFactory {

    private static final Map<Class<?>, Queue<Object>> pool = new ConcurrentHashMap<>();

    @Override
    public <T> T create(Class<T> type) {
        Queue<Object> queue = pool.computeIfAbsent(type,
            k -> new ConcurrentLinkedQueue<>());

        // 尝试从池中获取
        Object obj = queue.poll();
        if (obj != null) {
            return (T) obj;
        }

        // 池中没有，创建新对象
        return super.create(type);
    }

    // 回收对象到池中
    public void recycle(Object obj) {
        if (obj != null) {
            Queue<Object> queue = pool.get(obj.getClass());
            if (queue != null) {
                queue.offer(obj);
            }
        }
    }
}
```

**场景 3：初始化处理**

```java
// 对象创建后进行初始化
public class InitializingObjectFactory extends DefaultObjectFactory {

    @Override
    public <T> T create(Class<T> type) {
        T instance = super.create(type);

        // 如果实现了特定接口，执行初始化
        if (instance instanceof Initializable) {
            ((Initializable) instance).initialize();
        }

        return instance;
    }
}

// 实体类实现初始化接口
public class User implements Initializable {
    private Long id;
    private String name;

    @Override
    public void initialize() {
        // 初始化默认值
        if (name == null) {
            name = "未命名";
        }
    }
}
```

**场景 4：创建日志记录**

```java
// 记录对象创建日志
public class LoggingObjectFactory extends DefaultObjectFactory {

    private static final Logger logger = LoggerFactory.getLogger(LoggingObjectFactory.class);

    @Override
    public <T> T create(Class<T> type) {
        long start = System.currentTimeMillis();
        T instance = super.create(type);
        long cost = System.currentTimeMillis() - start;

        logger.debug("创建对象 {} 耗时 {} ms", type.getSimpleName(), cost);

        return instance;
    }
}
```

**5. ObjectFactory 与 ResultMap 的关系**

```xml
<!-- 在 resultMap 中指定构造器参数 -->
<resultMap id="userMap" type="User">
    <!-- ObjectFactory 会使用这些参数调用构造器 -->
    <constructor>
        <idArg column="id" javaType="long"/>
        <arg column="name" javaType="string"/>
        <arg column="age" javaType="int"/>
    </constructor>
    <result property="email" column="email"/>
</resultMap>
```

**关键要点**

1. **核心作用**：ObjectFactory 负责创建查询结果对应的 Java 对象实例
2. **默认实现**：DefaultObjectFactory 通过反射调用构造器创建对象
3. **自定义方式**：继承 DefaultObjectFactory 并重写 create 方法
4. **应用场景**：依赖注入、对象池管理、初始化处理、日志记录

**记忆口诀**

> ObjectFactory 对象工厂，结果映射对象创
> 默认实现反射调，无参有参都能造
> 自定义需继承类，重写方法加增强
> 注入池化和初始，扩展功能真不少

### 80. 如何实现数据库字段加密？

**核心答案**

MyBatis 中实现数据库字段加密主要有 **三种方式**：**自定义 TypeHandler**（推荐）、**拦截器 Plugin** 和 **数据库函数**。其中自定义 TypeHandler 最灵活，可以在数据存储前加密、读取后解密，对业务代码无侵入。

**详细说明**

**1. 三种加密方式对比**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead80" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="20" y="20" width="760" height="310" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="8"/>
<text x="400" y="50" font-size="18" font-weight="bold" text-anchor="middle" fill="#212529">数据库字段加密方案对比</text>
<rect x="50" y="80" width="220" height="220" fill="#e7f5ff" stroke="#339af0" stroke-width="2" rx="6"/>
<text x="160" y="110" font-size="15" font-weight="bold" text-anchor="middle" fill="#1971c2">自定义 TypeHandler</text>
<text x="60" y="140" font-size="12" fill="#495057">✓ 透明加解密</text>
<text x="60" y="160" font-size="12" fill="#495057">✓ 业务无感知</text>
<text x="60" y="180" font-size="12" fill="#495057">✓ 灵活可控</text>
<text x="60" y="200" font-size="12" fill="#495057">✓ 推荐方案</text>
<text x="60" y="225" font-size="11" fill="#868e96">适用：敏感字段加密</text>
<text x="60" y="245" font-size="11" fill="#868e96">如：手机号、身份证</text>
<text x="60" y="265" font-size="11" fill="#40c057" font-weight="bold">推荐指数：★★★★★</text>
<rect x="290" y="80" width="220" height="220" fill="#fff4e6" stroke="#fd7e14" stroke-width="2" rx="6"/>
<text x="400" y="110" font-size="15" font-weight="bold" text-anchor="middle" fill="#d9480f">拦截器 Plugin</text>
<text x="300" y="140" font-size="12" fill="#495057">✓ 统一处理</text>
<text x="300" y="160" font-size="12" fill="#495057">✓ 动态配置</text>
<text x="300" y="180" font-size="12" fill="#495057">⚠ 实现复杂</text>
<text x="300" y="200" font-size="12" fill="#495057">⚠ 性能开销</text>
<text x="300" y="225" font-size="11" fill="#868e96">适用：批量字段加密</text>
<text x="300" y="245" font-size="11" fill="#868e96">如：所有敏感数据</text>
<text x="300" y="265" font-size="11" fill="#fd7e14" font-weight="bold">推荐指数：★★★☆☆</text>
<rect x="530" y="80" width="220" height="220" fill="#f3f0ff" stroke="#7950f2" stroke-width="2" rx="6"/>
<text x="640" y="110" font-size="15" font-weight="bold" text-anchor="middle" fill="#5f3dc4">数据库函数</text>
<text x="540" y="140" font-size="12" fill="#495057">✓ 数据库级加密</text>
<text x="540" y="160" font-size="12" fill="#495057">✓ 安全性高</text>
<text x="540" y="180" font-size="12" fill="#495057">⚠ 依赖数据库</text>
<text x="540" y="200" font-size="12" fill="#495057">⚠ 移植性差</text>
<text x="540" y="225" font-size="11" fill="#868e96">适用：核心敏感数据</text>
<text x="540" y="245" font-size="11" fill="#868e96">如：密码、密钥</text>
<text x="540" y="265" font-size="11" fill="#7950f2" font-weight="bold">推荐指数：★★★★☆</text>
</svg>

**2. 方式一：自定义 TypeHandler（推荐）**

**步骤 1：创建加密工具类**

```java
public class AESUtil {
    private static final String ALGORITHM = "AES";
    private static final String KEY = "your-secret-key-16bytes";  // 16字节密钥

    // 加密
    public static String encrypt(String plainText) {
        try {
            SecretKeySpec secretKey = new SecretKeySpec(KEY.getBytes(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encrypted = cipher.doFinal(plainText.getBytes());
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new RuntimeException("加密失败", e);
        }
    }

    // 解密
    public static String decrypt(String encryptedText) {
        try {
            SecretKeySpec secretKey = new SecretKeySpec(KEY.getBytes(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(encryptedText));
            return new String(decrypted);
        } catch (Exception e) {
            throw new RuntimeException("解密失败", e);
        }
    }
}
```

**步骤 2：创建加密 TypeHandler**

```java
@MappedTypes(String.class)
@MappedJdbcTypes(JdbcType.VARCHAR)
public class EncryptTypeHandler extends BaseTypeHandler<String> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i,
                                     String parameter, JdbcType jdbcType)
        throws SQLException {
        // 存储时加密
        ps.setString(i, AESUtil.encrypt(parameter));
    }

    @Override
    public String getNullableResult(ResultSet rs, String columnName)
        throws SQLException {
        String encrypted = rs.getString(columnName);
        // 读取时解密
        return encrypted == null ? null : AESUtil.decrypt(encrypted);
    }

    @Override
    public String getNullableResult(ResultSet rs, int columnIndex)
        throws SQLException {
        String encrypted = rs.getString(columnIndex);
        return encrypted == null ? null : AESUtil.decrypt(encrypted);
    }

    @Override
    public String getNullableResult(CallableStatement cs, int columnIndex)
        throws SQLException {
        String encrypted = cs.getString(columnIndex);
        return encrypted == null ? null : AESUtil.decrypt(encrypted);
    }
}
```

**步骤 3：注册和使用**

```xml
<!-- mybatis-config.xml 注册 TypeHandler -->
<typeHandlers>
    <typeHandler handler="com.example.handler.EncryptTypeHandler"/>
</typeHandlers>

<!-- Mapper.xml 使用 TypeHandler -->
<resultMap id="userMap" type="User">
    <id column="id" property="id"/>
    <result column="name" property="name"/>
    <!-- 手机号字段使用加密 -->
    <result column="phone" property="phone"
            typeHandler="com.example.handler.EncryptTypeHandler"/>
    <!-- 身份证字段使用加密 -->
    <result column="id_card" property="idCard"
            typeHandler="com.example.handler.EncryptTypeHandler"/>
</resultMap>

<insert id="insertUser">
    INSERT INTO user (name, phone, id_card)
    VALUES (#{name},
            #{phone, typeHandler=com.example.handler.EncryptTypeHandler},
            #{idCard, typeHandler=com.example.handler.EncryptTypeHandler})
</insert>
```

**3. 方式二：拦截器 Plugin**

```java
@Intercepts({
    @Signature(type = ParameterHandler.class, method = "setParameters",
               args = {PreparedStatement.class}),
    @Signature(type = ResultSetHandler.class, method = "handleResultSets",
               args = {Statement.class})
})
public class EncryptPlugin implements Interceptor {

    // 需要加密的字段列表
    private static final Set<String> ENCRYPT_FIELDS = new HashSet<>(
        Arrays.asList("phone", "idCard", "email")
    );

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object target = invocation.getTarget();

        // 设置参数时加密
        if (target instanceof ParameterHandler) {
            ParameterHandler handler = (ParameterHandler) target;
            // 获取参数对象并加密敏感字段
            Object parameterObject = handler.getParameterObject();
            encryptFields(parameterObject);
        }

        // 获取结果时解密
        if (target instanceof ResultSetHandler) {
            Object result = invocation.proceed();
            decryptFields(result);
            return result;
        }

        return invocation.proceed();
    }

    private void encryptFields(Object obj) {
        if (obj == null) return;

        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (ENCRYPT_FIELDS.contains(field.getName())) {
                try {
                    field.setAccessible(true);
                    String value = (String) field.get(obj);
                    if (value != null) {
                        field.set(obj, AESUtil.encrypt(value));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private void decryptFields(Object result) {
        // 处理单个对象或列表
        if (result instanceof List) {
            ((List<?>) result).forEach(this::decryptSingleObject);
        } else {
            decryptSingleObject(result);
        }
    }

    private void decryptSingleObject(Object obj) {
        if (obj == null) return;

        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (ENCRYPT_FIELDS.contains(field.getName())) {
                try {
                    field.setAccessible(true);
                    String encrypted = (String) field.get(obj);
                    if (encrypted != null) {
                        field.set(obj, AESUtil.decrypt(encrypted));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

**注册拦截器**

```xml
<!-- mybatis-config.xml -->
<plugins>
    <plugin interceptor="com.example.plugin.EncryptPlugin"/>
</plugins>
```

**4. 方式三：数据库函数**

```xml
<!-- MySQL 示例 -->
<insert id="insertUser">
    INSERT INTO user (name, phone, id_card)
    VALUES (#{name},
            AES_ENCRYPT(#{phone}, 'secret-key'),
            AES_ENCRYPT(#{idCard}, 'secret-key'))
</insert>

<select id="selectUser" resultType="User">
    SELECT id, name,
           AES_DECRYPT(phone, 'secret-key') as phone,
           AES_DECRYPT(id_card, 'secret-key') as idCard
    FROM user
    WHERE id = #{id}
</select>
```

**5. 加密方案最佳实践**

**1. 密钥管理**

```java
// 不要硬编码密钥，从配置中心读取
public class KeyManager {
    private static String encryptKey;

    static {
        // 从配置中心或环境变量读取
        encryptKey = System.getenv("ENCRYPT_KEY");
        if (encryptKey == null) {
            encryptKey = ConfigCenter.getKey("encrypt.key");
        }
    }

    public static String getKey() {
        return encryptKey;
    }
}
```

**2. 选择性加密**

```java
// 使用注解标记需要加密的字段
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Encrypted {
}

public class User {
    private Long id;
    private String name;

    @Encrypted
    private String phone;  // 需要加密

    @Encrypted
    private String idCard; // 需要加密

    private String email;  // 不加密
}
```

**3. 性能优化**

```java
// 缓存 Cipher 实例提高性能
public class CachedCipher {
    private static final ThreadLocal<Cipher> encryptCipher = new ThreadLocal<>();
    private static final ThreadLocal<Cipher> decryptCipher = new ThreadLocal<>();

    public static Cipher getEncryptCipher() throws Exception {
        if (encryptCipher.get() == null) {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, getSecretKey());
            encryptCipher.set(cipher);
        }
        return encryptCipher.get();
    }

    // 类似的 getDecryptCipher() 方法...
}
```

**关键要点**

1. **推荐方案**：自定义 TypeHandler 最灵活，对业务无侵入
2. **密钥管理**：不要硬编码密钥，使用配置中心或环境变量
3. **选择性加密**：只对敏感字段加密，避免性能损耗
4. **算法选择**：推荐使用 AES-256，确保密钥长度足够

**记忆口诀**

> 字段加密三方案，TypeHandler 最简单
> 拦截器统一处理，数据库函数也能办
> 密钥管理要安全，配置中心来保管
> 选择加密看场景，性能安全要权衡
