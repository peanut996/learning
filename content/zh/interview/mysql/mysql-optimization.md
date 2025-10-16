## SQL 优化

### 27. 如何分析SQL的性能?EXPLAIN的作用是什么?

#### 核心答案

**EXPLAIN**:MySQL提供的SQL执行计划分析工具,显示SQL如何被执行,帮助优化查询性能。

**作用**:查看索引使用情况、扫描行数、连接类型等,定位性能瓶颈。

**关键字段**:
- **type**:访问类型(system > const > eq_ref > ref > range > index > ALL)
- **key**:实际使用的索引
- **rows**:预估扫描行数
- **Extra**:额外信息(Using index、Using filesort等)

#### 详细说明

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">EXPLAIN 执行计划分析</text>
<rect x="50" y="70" width="800" height="60" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="8"/>
<text x="450" y="95" text-anchor="middle" font-size="18" fill="#1e40af" font-weight="bold">EXPLAIN 基本用法</text>
<text x="70" y="120" font-size="14" fill="#334155">EXPLAIN SELECT * FROM users WHERE id = 10;</text>
<rect x="50" y="150" width="800" height="420" fill="#f0f4f8" stroke="#64748b" stroke-width="2" rx="8"/>
<text x="450" y="180" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">EXPLAIN 输出字段详解</text>
<rect x="70" y="200" width="760" height="50" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="5"/>
<text x="90" y="220" font-size="14" fill="#166534" font-weight="bold">1. type (访问类型) - 最重要!</text>
<text x="100" y="240" font-size="12" fill="#475569">system > const > eq_ref > ref > range > index > ALL</text>
<rect x="70" y="260" width="760" height="50" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
<text x="90" y="280" font-size="14" fill="#78350f" font-weight="bold">2. key (使用的索引)</text>
<text x="100" y="300" font-size="12" fill="#475569">实际使用的索引名,NULL表示未使用索引</text>
<rect x="70" y="320" width="760" height="50" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="90" y="340" font-size="14" fill="#7f1d1d" font-weight="bold">3. rows (扫描行数)</text>
<text x="100" y="360" font-size="12" fill="#475569">预估需要扫描的行数,越少越好</text>
<rect x="70" y="380" width="760" height="50" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="90" y="400" font-size="14" fill="#4338ca" font-weight="bold">4. Extra (额外信息)</text>
<text x="100" y="420" font-size="12" fill="#475569">Using index(覆盖索引) | Using filesort(排序) | Using temporary(临时表)</text>
<rect x="70" y="440" width="370" height="120" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="255" y="460" text-anchor="middle" font-size="15" fill="#1e293b" font-weight="bold">type 访问类型排序</text>
<text x="90" y="485" font-size="12" fill="#059669">✓ system/const - 最优</text>
<text x="90" y="505" font-size="12" fill="#059669">✓ eq_ref/ref - 好</text>
<text x="90" y="525" font-size="12" fill="#f59e0b">⚠ range/index - 一般</text>
<text x="90" y="545" font-size="12" fill="#dc2626">✗ ALL - 最差(全表扫描)</text>
<rect x="460" y="440" width="370" height="120" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="645" y="460" text-anchor="middle" font-size="15" fill="#1e293b" font-weight="bold">Extra 重要信息</text>
<text x="480" y="485" font-size="12" fill="#059669">✓ Using index - 覆盖索引</text>
<text x="480" y="505" font-size="12" fill="#dc2626">✗ Using filesort - 文件排序</text>
<text x="480" y="525" font-size="12" fill="#dc2626">✗ Using temporary - 临时表</text>
<text x="480" y="545" font-size="12" fill="#f59e0b">⚠ Using where - 条件过滤</text>
</svg>

**EXPLAIN输出字段完整说明**:

| 字段 | 含义 | 说明 |
|-----|------|------|
| **id** | 查询序号 | SELECT的执行顺序,id越大越先执行 |
| **select_type** | 查询类型 | SIMPLE(简单查询)、PRIMARY(主查询)、SUBQUERY(子查询)等 |
| **table** | 表名 | 正在访问的表 |
| **type** | 访问类型 | 性能从好到差:system > const > eq_ref > ref > range > index > ALL |
| **possible_keys** | 可能用到的索引 | 优化器考虑使用的索引 |
| **key** | 实际使用的索引 | NULL表示未使用索引 |
| **key_len** | 索引使用长度 | 使用索引的字节数,越短越好 |
| **ref** | 索引比较的列 | 显示哪些列或常量被用于查找 |
| **rows** | 扫描行数 | 预估需要扫描的行数 |
| **filtered** | 过滤百分比 | 表示符合查询条件的行占总行数的百分比 |
| **Extra** | 额外信息 | 重要的执行细节 |

**type访问类型详解**:

```sql
-- 1. system/const (最优)
EXPLAIN SELECT * FROM users WHERE id = 1;
-- type: const
-- 通过主键或唯一索引查询单条记录,最快

-- 2. eq_ref (优)
EXPLAIN SELECT * FROM orders o
JOIN users u ON o.user_id = u.id;
-- type: eq_ref
-- 唯一索引扫描,对于每个索引键,表中只有一条记录匹配

-- 3. ref (好)
EXPLAIN SELECT * FROM users WHERE name = 'Alice';
-- type: ref
-- 非唯一索引扫描,返回匹配某个单独值的所有行

-- 4. range (一般)
EXPLAIN SELECT * FROM users WHERE id BETWEEN 10 AND 20;
-- type: range
-- 索引范围扫描,常见于 <、>、BETWEEN、IN

-- 5. index (差)
EXPLAIN SELECT id FROM users;
-- type: index
-- 全索引扫描,比ALL好一点,但仍然扫描所有索引

-- 6. ALL (最差)
EXPLAIN SELECT * FROM users WHERE phone = '123456';
-- type: ALL
-- 全表扫描,没有使用索引,性能最差
```

**Extra额外信息详解**:

```sql
-- ✅ Using index (最好)
EXPLAIN SELECT id, name FROM users WHERE name = 'Alice';
-- Extra: Using index
-- 覆盖索引,查询的列都在索引中,不需要回表

-- ✅ Using index condition (好)
EXPLAIN SELECT * FROM users WHERE name LIKE 'A%' AND age = 25;
-- Extra: Using index condition
-- 索引下推,在索引中过滤数据,减少回表

-- ❌ Using filesort (差)
EXPLAIN SELECT * FROM users ORDER BY age;
-- Extra: Using filesort
-- 无法使用索引排序,需要额外的排序操作,性能差

-- ❌ Using temporary (差)
EXPLAIN SELECT name, COUNT(*) FROM users GROUP BY name;
-- Extra: Using temporary
-- 使用临时表保存中间结果,性能差

-- ⚠️ Using where (一般)
EXPLAIN SELECT * FROM users WHERE age > 25;
-- Extra: Using where
-- 使用WHERE过滤,但没有使用索引
```

**实战案例分析**:

**案例1: 未使用索引(全表扫描)**

```sql
EXPLAIN SELECT * FROM users WHERE name = 'Alice';

-- 输出:
-- type: ALL
-- key: NULL
-- rows: 100000
-- Extra: Using where

-- ❌ 问题: 全表扫描,未使用索引
-- ✅ 优化: 在name列添加索引
CREATE INDEX idx_name ON users(name);

-- 优化后:
-- type: ref
-- key: idx_name
-- rows: 10
-- Extra: Using index condition
```

**案例2: 索引失效(函数操作)**

```sql
EXPLAIN SELECT * FROM users WHERE YEAR(create_time) = 2024;

-- 输出:
-- type: ALL
-- key: NULL
-- rows: 100000

-- ❌ 问题: 在索引列上使用函数,索引失效
-- ✅ 优化: 改写查询条件
EXPLAIN SELECT * FROM users
WHERE create_time >= '2024-01-01'
  AND create_time < '2025-01-01';

-- 优化后:
-- type: range
-- key: idx_create_time
-- rows: 5000
```

**案例3: 排序未使用索引**

```sql
EXPLAIN SELECT * FROM users ORDER BY age;

-- 输出:
-- type: ALL
-- key: NULL
-- rows: 100000
-- Extra: Using filesort

-- ❌ 问题: 排序字段没有索引
-- ✅ 优化: 添加索引
CREATE INDEX idx_age ON users(age);

-- 优化后:
-- type: index
-- key: idx_age
-- rows: 100000
-- Extra: Using index
```

**案例4: JOIN未使用索引**

```sql
EXPLAIN SELECT * FROM orders o
JOIN users u ON o.user_name = u.name;

-- 输出:
-- type: ALL
-- key: NULL
-- rows: 1000000

-- ❌ 问题: JOIN字段没有索引
-- ✅ 优化: 在JOIN字段添加索引
CREATE INDEX idx_user_name ON orders(user_name);
CREATE INDEX idx_name ON users(name);

-- 优化后:
-- type: ref
-- key: idx_user_name
-- rows: 10
```

**EXPLAIN的变体**:

```sql
-- 1. EXPLAIN ANALYZE (MySQL 8.0+)
-- 实际执行查询并返回真实的执行统计
EXPLAIN ANALYZE SELECT * FROM users WHERE name = 'Alice';

-- 2. EXPLAIN FORMAT=JSON
-- 以JSON格式输出,包含更多细节
EXPLAIN FORMAT=JSON SELECT * FROM users WHERE name = 'Alice';

-- 3. EXPLAIN FORMAT=TREE (MySQL 8.0.16+)
-- 以树形格式显示执行计划
EXPLAIN FORMAT=TREE SELECT * FROM users WHERE name = 'Alice';
```

**其他性能分析工具**:

```sql
-- 1. SHOW PROFILE (查看查询执行各阶段耗时)
SET profiling = 1;
SELECT * FROM users WHERE name = 'Alice';
SHOW PROFILES;
SHOW PROFILE FOR QUERY 1;

-- 2. SHOW STATUS (查看服务器状态变量)
SHOW STATUS LIKE 'Handler_read%';

-- 3. 慢查询日志
SET GLOBAL slow_query_log = ON;
SET GLOBAL long_query_time = 2;  -- 超过2秒记录
```

**优化建议根据EXPLAIN结果**:

| 问题 | EXPLAIN特征 | 优化方法 |
|-----|------------|---------|
| **全表扫描** | type=ALL, key=NULL | 添加索引 |
| **索引失效** | key=NULL, possible_keys有值 | 检查WHERE条件,避免函数、类型转换 |
| **扫描行数多** | rows很大 | 优化索引,缩小查询范围 |
| **文件排序** | Extra=Using filesort | 在排序字段添加索引 |
| **临时表** | Extra=Using temporary | 优化GROUP BY或DISTINCT |
| **未覆盖索引** | Extra无Using index | 使用覆盖索引,减少回表 |

#### 关键要点

- **EXPLAIN**:SQL性能分析神器,必须掌握
- **type**:最重要字段,const/ref/range优于index/ALL
- **key**:查看是否使用了索引
- **rows**:扫描行数,越少越好
- **Extra**:
  - Using index(好):覆盖索引
  - Using filesort(差):额外排序
  - Using temporary(差):临时表
- **优化目标**:
  - type尽量达到ref及以上
  - 避免ALL全表扫描
  - 减少扫描行数
  - 避免filesort和temporary

#### 记忆口诀

**"type定快慢,key看索引,rows看数量,Extra看细节"**
- type:访问类型决定性能
- key:是否使用索引
- rows:扫描行数
- Extra:额外信息

**"const ref range好,index ALL要避免"** - type类型记忆

### 28. 如何优化慢查询?

#### 核心答案

**慢查询优化步骤**:
1. **定位慢查询**:开启慢查询日志,记录执行时间超过阈值的SQL
2. **分析慢查询**:使用EXPLAIN分析执行计划
3. **优化策略**:添加索引、优化SQL、调整表结构、缓存结果

**常见慢查询原因**:
- 未使用索引(全表扫描)
- 索引失效
- 返回数据量太大
- JOIN表过多
- 子查询性能差

#### 详细说明

**1. 开启慢查询日志**:

```sql
-- 查看慢查询日志配置
SHOW VARIABLES LIKE 'slow_query%';
SHOW VARIABLES LIKE 'long_query_time';

-- 开启慢查询日志
SET GLOBAL slow_query_log = ON;
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';
SET GLOBAL long_query_time = 2;  -- 超过2秒的查询记录

-- 记录未使用索引的查询
SET GLOBAL log_queries_not_using_indexes = ON;
```

**2. 分析慢查询**:

```sql
-- 使用 mysqldumpslow 分析慢查询日志
-- Linux命令行
mysqldumpslow -s t -t 10 /var/log/mysql/slow.log
-- -s t: 按查询时间排序
-- -t 10: 显示前10条

-- 查看慢查询统计
SHOW STATUS LIKE 'Slow_queries';
```

**3. 优化方法**:

**方法1: 添加索引**

```sql
-- ❌ 慢查询: 全表扫描
SELECT * FROM users WHERE name = 'Alice' AND age = 25;
-- 执行时间: 5秒, 扫描100万行

-- ✅ 优化: 添加联合索引
CREATE INDEX idx_name_age ON users(name, age);
-- 执行时间: 0.01秒, 扫描10行
```

**方法2: 避免SELECT ***

```sql
-- ❌ 慢查询: 返回所有字段
SELECT * FROM users WHERE id = 10;
-- 需要回表,查询所有字段

-- ✅ 优化: 只查询需要的字段
SELECT id, name, email FROM users WHERE id = 10;
-- 如果(id, name, email)都在索引中,使用覆盖索引,无需回表
```

**方法3: 分页优化**

```sql
-- ❌ 慢查询: 深度分页
SELECT * FROM orders ORDER BY id LIMIT 1000000, 20;
-- 需要扫描前100万行,性能极差

-- ✅ 优化: 使用子查询或延迟关联
SELECT * FROM orders
WHERE id >= (SELECT id FROM orders ORDER BY id LIMIT 1000000, 1)
ORDER BY id LIMIT 20;

-- 或使用上次查询的最大ID
SELECT * FROM orders
WHERE id > 999999
ORDER BY id LIMIT 20;
```

**方法4: 优化JOIN**

```sql
-- ❌ 慢查询: JOIN字段无索引
SELECT * FROM orders o
JOIN users u ON o.user_name = u.name;
-- user_name和name都没有索引

-- ✅ 优化: 添加索引
CREATE INDEX idx_user_name ON orders(user_name);
CREATE INDEX idx_name ON users(name);

-- 或者使用ID关联(更快)
SELECT * FROM orders o
JOIN users u ON o.user_id = u.id;
```

**方法5: 避免子查询**

```sql
-- ❌ 慢查询: 子查询
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000);
-- 子查询可能被执行多次

-- ✅ 优化: 改为JOIN
SELECT DISTINCT u.* FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.amount > 1000;
```

**方法6: 优化OR条件**

```sql
-- ❌ 慢查询: OR连接多个条件
SELECT * FROM users WHERE name = 'Alice' OR email = 'alice@example.com';
-- 可能无法使用索引

-- ✅ 优化: 使用UNION
SELECT * FROM users WHERE name = 'Alice'
UNION
SELECT * FROM users WHERE email = 'alice@example.com';
```

**方法7: 避免函数操作索引列**

```sql
-- ❌ 慢查询: 在索引列上使用函数
SELECT * FROM orders WHERE DATE(create_time) = '2024-01-01';
-- 索引失效

-- ✅ 优化: 改写条件
SELECT * FROM orders
WHERE create_time >= '2024-01-01 00:00:00'
  AND create_time < '2024-01-02 00:00:00';
```

**方法8: 优化GROUP BY和ORDER BY**

```sql
-- ❌ 慢查询: 排序字段无索引
SELECT user_id, COUNT(*) FROM orders
GROUP BY user_id
ORDER BY user_id;
-- Extra: Using filesort

-- ✅ 优化: 在GROUP BY字段添加索引
CREATE INDEX idx_user_id ON orders(user_id);
-- Extra: Using index
```

**方法9: 减少返回数据量**

```sql
-- ❌ 慢查询: 返回大量数据
SELECT * FROM orders;  -- 返回100万行

-- ✅ 优化: 分批查询
SELECT * FROM orders WHERE create_time >= '2024-01-01' LIMIT 1000;

-- 或使用流式查询(JDBC)
```

**方法10: 优化COUNT查询**

```sql
-- ❌ 慢查询: COUNT(*)在大表上
SELECT COUNT(*) FROM orders;
-- InnoDB需要扫描所有行

-- ✅ 优化: 使用近似值或缓存
-- 1. 使用 EXPLAIN 获取近似行数
EXPLAIN SELECT COUNT(*) FROM orders;
-- rows字段是近似值

-- 2. 使用统计表
CREATE TABLE order_count (
    count INT,
    update_time TIMESTAMP
);

-- 定期更新统计
```

**慢查询优化总结**:

| 优化方向 | 具体方法 | 效果 |
|---------|---------|------|
| **索引优化** | 添加合适的索引 | ⭐⭐⭐⭐⭐ |
| **SQL改写** | 避免函数、类型转换 | ⭐⭐⭐⭐ |
| **减少数据量** | 只查询必要字段和行 | ⭐⭐⭐⭐ |
| **优化JOIN** | 在连接字段添加索引 | ⭐⭐⭐⭐ |
| **分页优化** | 使用延迟关联或游标 | ⭐⭐⭐⭐ |
| **子查询优化** | 改为JOIN | ⭐⭐⭐ |
| **缓存** | 使用Redis缓存结果 | ⭐⭐⭐⭐⭐ |
| **分库分表** | 水平拆分大表 | ⭐⭐⭐⭐⭐ |

**实战案例**:

**案例1: 电商订单查询优化**

```sql
-- 原SQL: 查询用户最近的订单
SELECT o.*, u.name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.user_id = 123
ORDER BY o.create_time DESC
LIMIT 10;

-- 问题分析:
-- 1. SELECT * 返回所有字段
-- 2. user_id可能没有索引
-- 3. create_time排序可能无索引

-- 优化后:
-- 1. 添加索引
CREATE INDEX idx_user_create ON orders(user_id, create_time DESC);

-- 2. 只查询必要字段
SELECT o.id, o.order_no, o.amount, o.create_time,
       u.name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.user_id = 123
ORDER BY o.create_time DESC
LIMIT 10;

-- 性能提升: 5秒 → 0.01秒
```

**案例2: 统计查询优化**

```sql
-- 原SQL: 统计每个用户的订单数
SELECT user_id, COUNT(*) as order_count
FROM orders
GROUP BY user_id
ORDER BY order_count DESC;

-- 问题: 全表扫描+排序

-- 优化方案1: 添加索引
CREATE INDEX idx_user_id ON orders(user_id);

-- 优化方案2: 使用统计表(定时更新)
CREATE TABLE user_order_stats (
    user_id INT PRIMARY KEY,
    order_count INT,
    update_time TIMESTAMP
);

-- 通过定时任务更新统计表,查询时直接读取
SELECT * FROM user_order_stats ORDER BY order_count DESC;
```

#### 关键要点

- **定位慢查询**:开启慢查询日志
- **分析执行计划**:使用EXPLAIN找出问题
- **索引优化**:最重要,添加合适的索引
- **SQL改写**:避免函数、SELECT *、子查询
- **分页优化**:深度分页使用延迟关联
- **JOIN优化**:在连接字段添加索引
- **减少数据量**:只返回必要的字段和行
- **缓存**:热点数据使用Redis缓存

#### 记忆口诀

**"定位分析加索引,改写SQL减数据,缓存分库终极法"**
- 定位:慢查询日志
- 分析:EXPLAIN
- 加索引:最重要优化手段
- 改写SQL:避免索引失效
- 减数据:只查需要的
- 缓存分库:终极优化

### 29. 什么是SQL注入?如何防止?

#### 核心答案

**SQL注入**(SQL Injection):攻击者通过在输入中插入恶意SQL代码,改变原SQL语句的逻辑,从而获取、篡改或删除数据库数据的攻击手段。

**防止方法**:
1. **预编译语句**(PreparedStatement):最有效
2. **参数化查询**:使用占位符
3. **输入验证**:白名单校验
4. **最小权限原则**:限制数据库权限
5. **避免拼接SQL**:不要直接拼接用户输入

#### 详细说明

**SQL注入原理**:

```sql
-- 正常查询
SELECT * FROM users WHERE username = 'alice' AND password = 'password123';

-- 恶意输入: username = admin' OR '1'='1
-- 拼接后的SQL:
SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = 'password123';
-- '1'='1' 永远为真,跳过密码验证,成功登录!
```

**常见SQL注入攻击场景**:

**场景1: 绕过登录验证**

```sql
-- 正常登录
username: alice
password: password123

-- SQL: SELECT * FROM users WHERE username = 'alice' AND password = 'password123';

-- ❌ SQL注入攻击
username: admin' OR '1'='1' --
password: (任意)

-- 拼接后的SQL:
SELECT * FROM users WHERE username = 'admin' OR '1'='1' -- ' AND password = '...';
-- '1'='1' 永远为真, -- 注释掉后面的代码
-- 结果: 绕过密码验证,登录成功!
```

**场景2: 获取敏感数据**

```sql
-- 正常查询
id: 1

-- SQL: SELECT * FROM users WHERE id = 1;

-- ❌ SQL注入攻击
id: 1 UNION SELECT username, password FROM admin_users

-- 拼接后的SQL:
SELECT * FROM users WHERE id = 1
UNION SELECT username, password FROM admin_users;
-- 结果: 查询到管理员账号密码!
```

**场景3: 删除数据**

```sql
-- 正常删除
id: 1

-- SQL: DELETE FROM orders WHERE id = 1;

-- ❌ SQL注入攻击
id: 1 OR 1=1

-- 拼接后的SQL:
DELETE FROM orders WHERE id = 1 OR 1=1;
-- 结果: 删除所有订单!
```

**场景4: 批量操作**

```sql
-- ❌ SQL注入攻击
id: 1; DROP TABLE users; --

-- 拼接后的SQL:
SELECT * FROM orders WHERE id = 1;
DROP TABLE users;
-- 结果: 删除用户表!
```

**防止SQL注入的方法**:

**方法1: 使用预编译语句(最推荐)**

```java
// ❌ 错误做法: 字符串拼接
String sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(sql);

// ✅ 正确做法: 预编译语句
String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setString(1, username);  // 自动转义特殊字符
pstmt.setString(2, password);
ResultSet rs = pstmt.executeQuery();
```

**方法2: ORM框架参数化查询**

```java
// MyBatis (推荐使用 #{} 占位符)
// ✅ 正确: 使用 #{}
<select id="getUserByName" parameterType="string" resultType="User">
    SELECT * FROM users WHERE username = #{username}
</select>

// ❌ 错误: 使用 ${}(直接拼接,存在注入风险)
<select id="getUserByName" parameterType="string" resultType="User">
    SELECT * FROM users WHERE username = '${username}'
</select>

// JPA
// ✅ 正确
@Query("SELECT u FROM User u WHERE u.username = :username")
User findByUsername(@Param("username") String username);

// Hibernate
// ✅ 正确
Query query = session.createQuery("FROM User WHERE username = :username");
query.setParameter("username", username);
```

**方法3: 输入验证和过滤**

```java
// 白名单验证
public boolean isValidUsername(String username) {
    // 只允许字母、数字、下划线
    return username.matches("^[a-zA-Z0-9_]{3,20}$");
}

// 黑名单过滤(不推荐作为唯一防护)
public String sanitizeInput(String input) {
    // 过滤SQL关键字和特殊字符
    String[] keywords = {"OR", "AND", "UNION", "SELECT", "DROP", "--", ";", "'", "\""};
    for (String keyword : keywords) {
        input = input.replaceAll("(?i)" + keyword, "");
    }
    return input;
}

// ⚠️ 注意: 黑名单过滤容易被绕过,不应作为唯一防护手段
```

**方法4: 使用存储过程**

```sql
-- 创建存储过程
DELIMITER //
CREATE PROCEDURE GetUser(IN p_username VARCHAR(50), IN p_password VARCHAR(50))
BEGIN
    SELECT * FROM users WHERE username = p_username AND password = p_password;
END //
DELIMITER ;

-- Java调用
CallableStatement cstmt = conn.prepareCall("{call GetUser(?, ?)}");
cstmt.setString(1, username);
cstmt.setString(2, password);
ResultSet rs = cstmt.executeQuery();
```

**方法5: 最小权限原则**

```sql
-- 应用程序使用的数据库账号只授予必要的权限
-- ❌ 不要使用 root 或 admin 账号
-- ✅ 创建专用账号,只授予必要权限

CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password';

-- 只授予SELECT、INSERT、UPDATE权限,不授予DROP、DELETE等危险权限
GRANT SELECT, INSERT, UPDATE ON mydb.* TO 'app_user'@'localhost';

-- 不授予 FILE、PROCESS、SUPER 等管理权限
```

**方法6: WAF(Web应用防火墙)**

- ModSecurity
- 云WAF服务(阿里云、腾讯云)
- 拦截常见SQL注入攻击模式

**防止SQL注入的最佳实践**:

| 方法 | 效果 | 推荐度 | 说明 |
|-----|------|-------|------|
| **预编译语句** | ⭐⭐⭐⭐⭐ | ✅ 必须 | 最有效,参数自动转义 |
| **ORM参数化** | ⭐⭐⭐⭐⭐ | ✅ 必须 | MyBatis用#{},JPA用:param |
| **输入验证** | ⭐⭐⭐⭐ | ✅ 推荐 | 白名单验证,限制格式 |
| **最小权限** | ⭐⭐⭐⭐ | ✅ 推荐 | 限制数据库权限 |
| **黑名单过滤** | ⭐⭐ | ⚠️ 不推荐单用 | 容易被绕过 |
| **存储过程** | ⭐⭐⭐ | ✅ 可选 | 减少拼接,但维护成本高 |
| **WAF** | ⭐⭐⭐⭐ | ✅ 推荐 | 多一层防护 |

**实战案例**:

**案例1: 登录功能防SQL注入**

```java
// ❌ 危险代码: 字符串拼接
public User login(String username, String password) {
    String sql = "SELECT * FROM users WHERE username = '" + username +
                 "' AND password = '" + password + "'";
    // 存在SQL注入风险!
    return jdbcTemplate.queryForObject(sql, User.class);
}

// ✅ 安全代码: 预编译
public User login(String username, String password) {
    String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    return jdbcTemplate.queryForObject(sql, new Object[]{username, password}, User.class);
}

// ✅ 更安全: 预编译 + 输入验证
public User login(String username, String password) {
    // 1. 输入验证
    if (!username.matches("^[a-zA-Z0-9_]{3,20}$")) {
        throw new IllegalArgumentException("Invalid username");
    }

    // 2. 密码加密(实际应该存储加密后的密码)
    String hashedPassword = hashPassword(password);

    // 3. 预编译查询
    String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    return jdbcTemplate.queryForObject(sql,
        new Object[]{username, hashedPassword}, User.class);
}
```

**案例2: 动态排序字段防注入**

```java
// ❌ 危险代码: 直接拼接排序字段
public List<User> getUsers(String sortField) {
    String sql = "SELECT * FROM users ORDER BY " + sortField;
    // sortField = "id; DROP TABLE users; --" 会导致SQL注入!
    return jdbcTemplate.query(sql, new UserRowMapper());
}

// ✅ 安全代码: 白名单验证
public List<User> getUsers(String sortField) {
    // 1. 白名单验证
    List<String> allowedFields = Arrays.asList("id", "username", "create_time");
    if (!allowedFields.contains(sortField)) {
        sortField = "id";  // 默认排序字段
    }

    // 2. 拼接SQL(已通过白名单验证,安全)
    String sql = "SELECT * FROM users ORDER BY " + sortField;
    return jdbcTemplate.query(sql, new UserRowMapper());
}
```

**检测SQL注入的方法**:

```sql
-- 1. 手动测试常见注入payload
' OR '1'='1
' OR 1=1 --
' UNION SELECT NULL --
'; DROP TABLE users; --
admin'--

-- 2. 使用工具
-- SQLMap: 自动化SQL注入工具
sqlmap -u "http://example.com/user?id=1" --dbs

-- 3. 代码审计
-- 搜索字符串拼接SQL的代码
grep -r "String sql = .*+.*" src/
```

#### 关键要点

- **SQL注入**:通过恶意输入改变SQL逻辑,获取/篡改/删除数据
- **核心防护**:使用预编译语句(PreparedStatement)
- **ORM框架**:MyBatis用#{}不用${},JPA用:param
- **输入验证**:白名单验证,限制格式和长度
- **最小权限**:应用账号不使用root,只授予必要权限
- **不要拼接**:永远不要直接拼接用户输入
- **多层防护**:预编译+输入验证+最小权限+WAF

#### 记忆口诀

**"预编译第一,参数化占位,输入必校验,权限要最小"**
- 预编译:PreparedStatement
- 参数化:#{},?,:param
- 校验:白名单验证
- 权限:最小权限原则

### 30. 大表如何优化?

#### 核心答案

**大表定义**:通常指单表数据量超过百万级(如500万+),查询和写入性能明显下降的表。

**优化策略**:
1. **垂直拆分**:按列拆分,分离冷热数据
2. **水平拆分**:按行拆分(分库分表),分散数据压力
3. **索引优化**:建立合适索引,定期维护
4. **历史数据归档**:冷数据迁移到归档表
5. **读写分离**:主库写,从库读
6. **缓存**:热点数据放Redis

#### 详细说明

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">大表优化策略全景</text>
<rect x="50" y="70" width="800" height="100" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="8"/>
<text x="450" y="100" text-anchor="middle" font-size="18" fill="#1e40af" font-weight="bold">什么是大表?</text>
<text x="70" y="130" font-size="14" fill="#334155">• 数据量: 单表超过 500万-1000万 行</text>
<text x="70" y="155" font-size="14" fill="#334155">• 性能表现: 查询变慢(>1秒)、写入TPS下降、锁等待增加</text>
<rect x="50" y="190" width="260" height="180" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="8"/>
<text x="180" y="220" text-anchor="middle" font-size="16" font-weight="bold" fill="#15803d">垂直拆分 (按列)</text>
<rect x="70" y="240" width="220" height="120" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="80" y="260" font-size="13" fill="#334155" font-weight="bold">用户表拆分:</text>
<text x="90" y="280" font-size="12" fill="#475569">主表: id, name, phone</text>
<text x="90" y="300" font-size="12" fill="#475569">详情表: id, address, bio</text>
<text x="90" y="320" font-size="12" fill="#475569">统计表: id, login_count</text>
<text x="90" y="340" font-size="11" fill="#059669">✓ 减少单表字段数</text>
<text x="90" y="355" font-size="11" fill="#059669">✓ 分离冷热数据</text>
<rect x="330" y="190" width="260" height="180" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="460" y="220" text-anchor="middle" font-size="16" font-weight="bold" fill="#d97706">水平拆分 (按行)</text>
<rect x="350" y="240" width="220" height="120" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="360" y="260" font-size="13" fill="#334155" font-weight="bold">订单表拆分:</text>
<text x="370" y="280" font-size="12" fill="#475569">orders_2023 (历史)</text>
<text x="370" y="300" font-size="12" fill="#475569">orders_2024 (当前)</text>
<text x="370" y="320" font-size="12" fill="#475569">或按 user_id % 10 分表</text>
<text x="370" y="340" font-size="11" fill="#f59e0b">✓ 降低单表数据量</text>
<text x="370" y="355" font-size="11" fill="#f59e0b">✓ 提升查询性能</text>
<rect x="610" y="190" width="240" height="180" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="8"/>
<text x="730" y="220" text-anchor="middle" font-size="16" font-weight="bold" fill="#b91c1c">历史数据归档</text>
<rect x="630" y="240" width="200" height="120" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="640" y="260" font-size="13" fill="#334155" font-weight="bold">按时间归档:</text>
<text x="650" y="280" font-size="12" fill="#475569">活跃表: 近3个月</text>
<text x="650" y="300" font-size="12" fill="#475569">归档表: 3个月前</text>
<text x="650" y="320" font-size="12" fill="#475569">定期迁移冷数据</text>
<text x="650" y="340" font-size="11" fill="#dc2626">✓ 保持主表精简</text>
<text x="650" y="355" font-size="11" fill="#dc2626">✓ 冷数据可压缩</text>
<rect x="50" y="390" width="800" height="190" fill="#f0f4f8" stroke="#64748b" stroke-width="2" rx="8"/>
<text x="450" y="420" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">大表优化的6大方法</text>
<rect x="70" y="440" width="250" height="130" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="195" y="465" text-anchor="middle" font-size="15" fill="#1e40af" font-weight="bold">结构优化</text>
<text x="80" y="490" font-size="13" fill="#334155">1. 垂直拆分(按列)</text>
<text x="80" y="510" font-size="13" fill="#334155">2. 水平拆分(按行)</text>
<text x="80" y="530" font-size="13" fill="#334155">3. 历史数据归档</text>
<text x="80" y="550" font-size="13" fill="#334155">4. 字段类型优化</text>
<rect x="340" y="440" width="250" height="130" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="465" y="465" text-anchor="middle" font-size="15" fill="#15803d" font-weight="bold">性能优化</text>
<text x="350" y="490" font-size="13" fill="#334155">5. 添加合适索引</text>
<text x="350" y="510" font-size="13" fill="#334155">6. 定期维护表(OPTIMIZE)</text>
<text x="350" y="530" font-size="13" fill="#334155">7. 读写分离</text>
<text x="350" y="550" font-size="13" fill="#334155">8. 使用缓存(Redis)</text>
<rect x="610" y="440" width="220" height="130" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="720" y="465" text-anchor="middle" font-size="15" fill="#d97706" font-weight="bold">应用层优化</text>
<text x="620" y="490" font-size="13" fill="#334155">9. 分页优化</text>
<text x="620" y="510" font-size="13" fill="#334155">10. 异步处理</text>
<text x="620" y="530" font-size="13" fill="#334155">11. 批量操作</text>
<text x="620" y="550" font-size="13" fill="#334155">12. 限流降级</text>
</svg>

**大表优化的12种方法**:

**1. 垂直拆分(按列拆分)**

将一张宽表(字段多)拆分成多张表,按业务维度分离。

```sql
-- 原表: 用户表有50个字段
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    -- ... 基本信息
    address TEXT,            -- 详细地址
    bio TEXT,                -- 个人简介
    preferences JSON,        -- 偏好设置
    -- ... 详细信息
    login_count INT,         -- 登录次数
    last_login_time DATETIME,-- 最后登录
    -- ... 统计信息
);

-- ✅ 拆分后: 3张表
-- 主表: 高频访问的核心字段
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    status TINYINT,
    create_time DATETIME
);

-- 详情表: 低频访问的大字段
CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    address TEXT,
    bio TEXT,
    preferences JSON,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 统计表: 经常变化的统计字段
CREATE TABLE user_stats (
    user_id INT PRIMARY KEY,
    login_count INT,
    last_login_time DATETIME,
    view_count INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 优点:
-- 1. 主表更小,查询更快
-- 2. 分离冷热数据,提升缓存命中率
-- 3. 大字段不影响主表性能
```

**2. 水平拆分(按行拆分/分库分表)**

将一张大表的数据分散到多张表或多个数据库。

```sql
-- 方式1: 按时间分表
CREATE TABLE orders_2023 (
    id BIGINT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2),
    create_time DATETIME
    -- WHERE create_time >= '2023-01-01' AND create_time < '2024-01-01'
);

CREATE TABLE orders_2024 (
    id BIGINT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2),
    create_time DATETIME
    -- WHERE create_time >= '2024-01-01'
);

-- 方式2: 按哈希分表(user_id % 10)
CREATE TABLE orders_0 (...);  -- user_id % 10 = 0
CREATE TABLE orders_1 (...);  -- user_id % 10 = 1
...
CREATE TABLE orders_9 (...);  -- user_id % 10 = 9

-- 优点:
-- 1. 每张表数据量小,查询快
-- 2. 并发写入分散,提升TPS
-- 3. 可以分散到不同数据库服务器
```

**3. 历史数据归档**

将历史冷数据迁移到归档表,保持主表精简。

```sql
-- 主表: 只保留近期数据
CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2),
    create_time DATETIME,
    INDEX idx_create_time (create_time)
);

-- 归档表: 存储历史数据
CREATE TABLE orders_archive (
    id BIGINT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2),
    create_time DATETIME,
    archive_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_create_time (create_time)
) ENGINE=Archive;  -- Archive引擎高压缩比

-- 定期归档脚本(每月执行)
-- 1. 迁移3个月前的数据
INSERT INTO orders_archive
SELECT *, NOW() FROM orders
WHERE create_time < DATE_SUB(NOW(), INTERVAL 3 MONTH);

-- 2. 删除已归档的数据
DELETE FROM orders
WHERE create_time < DATE_SUB(NOW(), INTERVAL 3 MONTH);

-- 3. 优化表
OPTIMIZE TABLE orders;

-- 查询时联合查询
SELECT * FROM orders WHERE id = 123
UNION ALL
SELECT * FROM orders_archive WHERE id = 123;
```

**4. 索引优化**

```sql
-- 检查缺失索引
-- 查看慢查询日志,找出全表扫描的SQL
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';

-- 添加合适的索引
CREATE INDEX idx_user_create ON orders(user_id, create_time);
CREATE INDEX idx_status ON orders(status);

-- 删除冗余索引
-- 如果有 INDEX(a, b),就不需要单独的 INDEX(a)
SHOW INDEX FROM orders;
DROP INDEX redundant_index ON orders;

-- 定期维护索引
ANALYZE TABLE orders;  -- 更新统计信息
OPTIMIZE TABLE orders; -- 重建表,消除碎片
```

**5. 字段类型优化**

```sql
-- ❌ 不合理的字段类型
CREATE TABLE users (
    id VARCHAR(50),        -- 使用字符串做主键
    age VARCHAR(10),       -- 数字用字符串
    status VARCHAR(20),    -- 只有几个状态值
    is_vip VARCHAR(5)      -- 布尔值用字符串
);

-- ✅ 优化后的字段类型
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,  -- 整数主键
    age TINYINT UNSIGNED,                  -- 0-255,节省空间
    status ENUM('pending', 'active', 'inactive'),  -- 枚举
    is_vip BOOLEAN                         -- 布尔值
);

-- 节省空间:
-- VARCHAR(50) → BIGINT: 50字节 → 8字节
-- VARCHAR(10) → TINYINT: 10字节 → 1字节
```

**6. 读写分离**

```
主库 (Master) → 写操作
    ↓ 复制
从库 (Slave1) → 读操作
从库 (Slave2) → 读操作
从库 (Slave3) → 读操作

写操作: INSERT/UPDATE/DELETE → 主库
读操作: SELECT → 从库(负载均衡)
```

**7. 使用缓存**

```java
// 热点数据使用Redis缓存
public User getUser(int userId) {
    // 1. 先查缓存
    String cacheKey = "user:" + userId;
    User user = redisTemplate.opsForValue().get(cacheKey);

    if (user != null) {
        return user;  // 缓存命中
    }

    // 2. 查数据库
    user = userMapper.selectById(userId);

    // 3. 写入缓存
    if (user != null) {
        redisTemplate.opsForValue().set(cacheKey, user, 1, TimeUnit.HOURS);
    }

    return user;
}
```

**8. 定期维护表**

```sql
-- 查看表状态
SHOW TABLE STATUS LIKE 'orders';
-- 关注: Data_length(数据大小)、Index_length(索引大小)、Data_free(碎片)

-- 优化表(消除碎片,重建索引)
OPTIMIZE TABLE orders;
-- 注意: 会锁表,在业务低峰期执行

-- 分析表(更新统计信息)
ANALYZE TABLE orders;
-- 不会锁表,可以经常执行

-- 检查表
CHECK TABLE orders;
-- 检查表是否有错误
```

**9. 分页优化**

```sql
-- ❌ 深度分页很慢
SELECT * FROM orders ORDER BY id LIMIT 1000000, 20;
-- 需要扫描前100万行

-- ✅ 优化: 使用上次查询的最大ID
SELECT * FROM orders
WHERE id > 999999  -- 上次查询的最后一个ID
ORDER BY id LIMIT 20;

-- 或使用子查询
SELECT * FROM orders
WHERE id >= (SELECT id FROM orders ORDER BY id LIMIT 1000000, 1)
ORDER BY id LIMIT 20;
```

**10. 批量操作代替逐条操作**

```sql
-- ❌ 逐条插入
INSERT INTO logs VALUES (1, 'log1');
INSERT INTO logs VALUES (2, 'log2');
...
-- 1000次SQL,很慢

-- ✅ 批量插入
INSERT INTO logs VALUES
(1, 'log1'),
(2, 'log2'),
...
(1000, 'log1000');
-- 1次SQL,快很多

-- 批量更新
UPDATE orders
SET status = 'shipped'
WHERE id IN (1, 2, 3, ..., 1000);
```

**11. 异步处理**

```java
// 大批量操作异步处理
@Async
public void batchUpdateOrders(List<Integer> orderIds) {
    // 分批处理,每批1000条
    for (int i = 0; i < orderIds.size(); i += 1000) {
        List<Integer> batch = orderIds.subList(i, Math.min(i + 1000, orderIds.size()));
        orderMapper.batchUpdate(batch);
        Thread.sleep(100);  // 避免长时间占用连接
    }
}
```

**12. 限流降级**

```java
// 大表查询加限流
@RateLimiter(value = 10, timeout = 1000)  // 每秒最多10次
public List<Order> queryOrders(OrderQuery query) {
    // 限制返回数量
    if (query.getPageSize() > 100) {
        query.setPageSize(100);
    }

    return orderMapper.selectList(query);
}
```

**大表优化决策树**:

```
大表性能问题?
├─ 数据量问题(千万级+)
│  ├─ 历史数据多 → 归档冷数据
│  ├─ 字段多 → 垂直拆分
│  └─ 查询慢 → 水平拆分/分库分表
├─ 查询慢
│  ├─ 无索引 → 添加索引
│  ├─ 索引失效 → 优化SQL
│  └─ 深度分页 → 分页优化
├─ 写入慢
│  ├─ 锁等待 → 读写分离
│  ├─ 单条插入 → 批量操作
│  └─ 并发高 → 分库分表
└─ 磁盘占用大
   ├─ 冗余数据 → 清理/归档
   ├─ 大字段 → 垂直拆分
   └─ 碎片多 → OPTIMIZE TABLE
```

**实战案例**:

**案例1: 订单表优化(从3000万到300万)**

```sql
-- 原表: 3000万条订单
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    order_no VARCHAR(32),
    amount DECIMAL(10,2),
    status VARCHAR(20),
    remark TEXT,              -- 大字段
    create_time DATETIME,
    update_time DATETIME
);

-- 问题:
-- 1. 查询慢: SELECT平均2-3秒
-- 2. 写入慢: INSERT平均500ms
-- 3. 磁盘占用: 100GB

-- 优化方案:
-- 1. 历史数据归档(保留1年内数据)
CREATE TABLE orders_archive LIKE orders;
INSERT INTO orders_archive
SELECT * FROM orders WHERE create_time < '2023-01-01';
DELETE FROM orders WHERE create_time < '2023-01-01';
-- 数据量: 3000万 → 300万

-- 2. 垂直拆分(分离大字段)
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    order_no VARCHAR(32),
    amount DECIMAL(10,2),
    status VARCHAR(20),
    create_time DATETIME,
    update_time DATETIME,
    INDEX idx_user_create (user_id, create_time),
    INDEX idx_status (status)
);

CREATE TABLE order_details (
    order_id BIGINT PRIMARY KEY,
    remark TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 3. 状态字段优化
ALTER TABLE orders MODIFY status ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled');

-- 4. 添加缓存
-- 热点订单(1小时内)缓存到Redis

-- 优化效果:
-- 查询速度: 2-3秒 → 0.1秒 (20-30倍提升)
-- 写入速度: 500ms → 50ms (10倍提升)
-- 磁盘占用: 100GB → 20GB (节省80%)
```

**案例2: 用户表优化(千万级用户)**

```sql
-- 原表: 1000万用户,100个字段
CREATE TABLE users (
    id INT PRIMARY KEY,
    -- 基本信息(20个字段)
    username VARCHAR(50),
    password VARCHAR(100),
    ...
    -- 详细信息(50个字段)
    address TEXT,
    bio TEXT,
    ...
    -- 统计信息(30个字段)
    login_count INT,
    view_count INT,
    ...
);

-- 优化方案: 垂直拆分成3张表
-- 1. 用户主表(高频访问)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    status TINYINT,
    create_time DATETIME,
    UNIQUE INDEX idx_username (username),
    UNIQUE INDEX idx_email (email)
) ENGINE=InnoDB;

-- 2. 用户详情表(低频访问)
CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    real_name VARCHAR(50),
    address TEXT,
    bio TEXT,
    preferences JSON,
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- 3. 用户统计表(频繁更新)
CREATE TABLE user_stats (
    user_id INT PRIMARY KEY,
    login_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    last_login_time DATETIME,
    last_login_ip VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- 查询优化:
-- 登录查询: 只查主表
SELECT id, username, password, status FROM users WHERE username = ?;

-- 个人中心: JOIN查询
SELECT u.*, p.real_name, p.address, s.login_count
FROM users u
LEFT JOIN user_profiles p ON u.id = p.user_id
LEFT JOIN user_stats s ON u.id = s.user_id
WHERE u.id = ?;

-- 更新登录次数: 只更新统计表
UPDATE user_stats SET login_count = login_count + 1 WHERE user_id = ?;

-- 优化效果:
-- 主表大小: 5GB → 500MB (10倍减小)
-- 登录查询: 300ms → 10ms (30倍提升)
-- 缓存命中率: 30% → 80% (主表小,更易缓存)
```

**大表优化对比表**:

| 优化方法 | 适用场景 | 复杂度 | 效果 | 缺点 |
|---------|---------|-------|------|------|
| **垂直拆分** | 字段多,冷热分明 | ⭐⭐ | ⭐⭐⭐⭐ | 需要JOIN |
| **水平拆分** | 数据量大(千万+) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 复杂度高,跨库问题 |
| **历史归档** | 历史数据多 | ⭐⭐ | ⭐⭐⭐⭐ | 查询需要联合 |
| **索引优化** | 查询慢 | ⭐ | ⭐⭐⭐⭐ | 占用空间,影响写入 |
| **读写分离** | 读多写少 | ⭐⭐⭐ | ⭐⭐⭐⭐ | 主从延迟 |
| **缓存** | 热点数据 | ⭐⭐ | ⭐⭐⭐⭐⭐ | 缓存一致性 |

#### 关键要点

- **垂直拆分**:按列拆分,分离冷热数据,减少单表字段
- **水平拆分**:按行拆分(分库分表),降低单表数据量
- **历史归档**:定期迁移冷数据,保持主表精简
- **索引优化**:添加合适索引,定期维护
- **读写分离**:主库写,从库读,分散压力
- **缓存**:热点数据缓存到Redis
- **批量操作**:减少SQL执行次数
- **分页优化**:避免深度分页
- **字段优化**:选择合适的数据类型
- **定期维护**:OPTIMIZE TABLE消除碎片

#### 记忆口诀

**"垂直按列横按行,归档历史索引优,读写分离加缓存,批量异步定期维"**
- 垂直:按列拆分
- 横:按行拆分(分库分表)
- 归档:历史数据归档
- 索引优:索引优化
- 读写分离:主从分离
- 缓存:Redis缓存
- 批量异步:提升写入
- 定期维:表维护

### 31. 如何优化 INSERT 语句?

#### 核心答案
批量插入、禁用索引检查、使用事务、优化表结构。

#### 详细说明

1. 批量插入数据
- **使用多值插入**
  ```sql
  -- 不推荐:每次插入一条
  INSERT INTO users VALUES (1, 'Alice');
  INSERT INTO users VALUES (2, 'Bob');

  -- 推荐:批量插入
  INSERT INTO users VALUES
    (1, 'Alice'),
    (2, 'Bob'),
    (3, 'Charlie');
  ```
- **使用 LOAD DATA INFILE**
  ```sql
  LOAD DATA INFILE '/path/to/data.csv'
  INTO TABLE users
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n';
  ```

2. 关闭自动提交,使用事务
```sql
SET autocommit = 0;
BEGIN;
INSERT INTO users VALUES (1, 'Alice');
INSERT INTO users VALUES (2, 'Bob');
-- ... 更多插入
COMMIT;
SET autocommit = 1;
```

3. 主键顺序插入
- 使用自增主键避免页分裂
- 顺序插入比随机插入快

4. 临时禁用索引和约束检查
```sql
-- 禁用唯一性检查
SET unique_checks = 0;
-- 禁用外键检查
SET foreign_key_checks = 0;

-- 批量插入数据
INSERT INTO users VALUES ...;

-- 恢复检查
SET unique_checks = 1;
SET foreign_key_checks = 1;
```

5. 调整参数
- `innodb_buffer_pool_size`:增大缓冲池
- `innodb_log_file_size`:增大日志文件
- `bulk_insert_buffer_size`:调整批量插入缓冲区

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="30" width="700" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="65" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">INSERT 优化策略对比</text>
<rect x="100" y="120" width="280" height="80" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="240" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">❌ 低效方式</text>
<text x="240" y="170" text-anchor="middle" font-size="12" fill="#333">逐条插入 + 自动提交</text>
<text x="240" y="190" text-anchor="middle" font-size="12" fill="#666">100,000条 ≈ 300秒</text>
<rect x="420" y="120" width="280" height="80" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="560" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">✓ 高效方式</text>
<text x="560" y="170" text-anchor="middle" font-size="12" fill="#333">批量插入 + 事务</text>
<text x="560" y="190" text-anchor="middle" font-size="12" fill="#666">100,000条 ≈ 3秒</text>
<path d="M 240 210 L 240 250" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowred)"/>
<path d="M 560 210 L 560 250" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowgreen)"/>
<rect x="80" y="250" width="320" height="220" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="5"/>
<text x="240" y="275" text-anchor="middle" font-size="14" font-weight="bold" fill="#ef6c00">性能杀手</text>
<text x="110" y="300" font-size="12" fill="#333">• 每条SQL独立执行</text>
<text x="110" y="325" font-size="12" fill="#333">• 每次都要提交事务</text>
<text x="110" y="350" font-size="12" fill="#333">• 重复解析SQL语句</text>
<text x="110" y="375" font-size="12" fill="#333">• 频繁刷新磁盘</text>
<text x="110" y="400" font-size="12" fill="#333">• 索引每次都更新</text>
<text x="110" y="425" font-size="12" fill="#333">• 锁竞争激烈</text>
<text x="240" y="455" font-size="11" fill="#666" font-style="italic">性能提升空间:100倍+</text>
<rect x="420" y="250" width="340" height="220" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="5"/>
<text x="590" y="275" text-anchor="middle" font-size="14" font-weight="bold" fill="#6a1b9a">优化技巧</text>
<text x="450" y="300" font-size="12" fill="#333">1. 批量插入(每批1000-5000条)</text>
<text x="450" y="325" font-size="12" fill="#333">2. 关闭autocommit,手动事务</text>
<text x="450" y="350" font-size="12" fill="#333">3. 主键顺序插入(避免页分裂)</text>
<text x="450" y="375" font-size="12" fill="#333">4. 禁用索引检查(大批量时)</text>
<text x="450" y="400" font-size="12" fill="#333">5. 使用LOAD DATA(CSV导入)</text>
<text x="450" y="425" font-size="12" fill="#333">6. 调大buffer_pool_size</text>
<text x="590" y="455" font-size="11" fill="#666" font-style="italic">合理组合可达最佳性能</text>
<defs>
<marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#c62828"/>
</marker>
<marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#2e7d32"/>
</marker>
</defs>
</svg>

#### 关键要点
1. **批量插入**:减少网络开销和SQL解析
2. **使用事务**:减少磁盘刷新次数
3. **顺序插入**:利用聚簇索引特性
4. **禁用检查**:大批量导入时临时禁用
5. **调整参数**:根据业务调整MySQL参数

#### 记忆口诀
**"批事顺禁调"**
- **批**:批量插入
- **事**:使用事务
- **顺**:顺序插入
- **禁**:禁用检查
- **调**:调整参数


### 32. 如何优化分页查询?

### 33. 什么是子查询?什么情况下用 JOIN 替代子查询?
