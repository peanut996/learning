## 性能优化

### 86. 如何优化 MyBatis 的性能?

**核心答案**

MyBatis 性能优化可以从配置优化、SQL 优化、缓存优化、批量操作、连接池优化五个方面入手,综合运用可显著提升系统性能。

**详细说明**

1. **配置优化**
   - **启用二级缓存**: 减少数据库访问
   - **配置延迟加载**: 按需加载关联数据
   - **合理设置 fetchSize**: 控制每次获取的记录数
   - **开启 useGeneratedKeys**: 高效获取自增主键
   ```xml
   <settings>
       <setting name="cacheEnabled" value="true"/>
       <setting name="lazyLoadingEnabled" value="true"/>
       <setting name="defaultFetchSize" value="100"/>
       <setting name="useGeneratedKeys" value="true"/>
   </settings>
   ```

2. **SQL 优化**
   - **避免 SELECT ***: 只查询需要的字段
   - **使用合适的索引**: 加快查询速度
   - **分页查询**: 避免一次性加载大量数据
   - **使用 resultMap 复用**: 减少重复配置
   ```xml
   <!-- 不好的做法 -->
   <select id="findAll" resultType="User">
       SELECT * FROM user
   </select>

   <!-- 好的做法 -->
   <select id="findAll" resultType="User">
       SELECT id, name, email FROM user LIMIT #{offset}, #{pageSize}
   </select>
   ```

3. **缓存优化**
   - **一级缓存**: SqlSession 级别,默认开启
   - **二级缓存**: Mapper 级别,需手动开启
   - **整合第三方缓存**: 如 Redis、Ehcache
   - **设置合理的缓存策略**: eviction、flushInterval、size
   ```xml
   <cache eviction="LRU" flushInterval="60000" size="512" readOnly="true"/>
   ```

4. **批量操作优化**
   - **使用 ExecutorType.BATCH**: 批量提交减少网络开销
   - **使用 foreach 标签**: 批量插入/更新
   - **控制批量大小**: 避免单次操作数据过多
   ```java
   // 批量插入
   SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH);
   try {
       UserMapper mapper = session.getMapper(UserMapper.class);
       for (User user : users) {
           mapper.insert(user);
       }
       session.commit();
   } finally {
       session.close();
   }
   ```

5. **连接池优化**
   - **使用成熟的连接池**: Druid、HikariCP
   - **合理设置池大小**: 根据并发量调整
   - **配置连接检测**: 保证连接可用性
   - **设置超时时间**: 避免长时间占用连接
   ```xml
   <dataSource type="com.alibaba.druid.pool.DruidDataSource">
       <property name="initialSize" value="5"/>
       <property name="minIdle" value="5"/>
       <property name="maxActive" value="20"/>
       <property name="maxWait" value="60000"/>
       <property name="testWhileIdle" value="true"/>
   </dataSource>
   ```

**性能优化层次图**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
<linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#4A90E2;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#357ABD;stop-opacity:1"/>
</linearGradient>
<linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#50C878;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#3BA65C;stop-opacity:1"/>
</linearGradient>
<linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#F5A623;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#D68910;stop-opacity:1"/>
</linearGradient>
</defs>
<rect x="10" y="10" width="780" height="480" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="#2c3e50">MyBatis 性能优化体系</text>
<rect x="300" y="70" width="200" height="50" fill="url(#grad1)" stroke="#2c3e50" stroke-width="2" rx="5"/>
<text x="400" y="100" font-size="16" font-weight="bold" text-anchor="middle" fill="white">性能优化</text>
<line x1="400" y1="120" x2="120" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="120" x2="280" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="120" x2="400" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="120" x2="520" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="120" x2="680" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="30" y="180" width="140" height="40" fill="url(#grad2)" stroke="#2c3e50" stroke-width="2" rx="5"/>
<text x="100" y="205" font-size="14" font-weight="bold" text-anchor="middle" fill="white">配置优化</text>
<rect x="210" y="180" width="140" height="40" fill="url(#grad2)" stroke="#2c3e50" stroke-width="2" rx="5"/>
<text x="280" y="205" font-size="14" font-weight="bold" text-anchor="middle" fill="white">SQL优化</text>
<rect x="330" y="180" width="140" height="40" fill="url(#grad2)" stroke="#2c3e50" stroke-width="2" rx="5"/>
<text x="400" y="205" font-size="14" font-weight="bold" text-anchor="middle" fill="white">缓存优化</text>
<rect x="450" y="180" width="140" height="40" fill="url(#grad2)" stroke="#2c3e50" stroke-width="2" rx="5"/>
<text x="520" y="205" font-size="14" font-weight="bold" text-anchor="middle" fill="white">批量操作</text>
<rect x="610" y="180" width="140" height="40" fill="url(#grad2)" stroke="#2c3e50" stroke-width="2" rx="5"/>
<text x="680" y="205" font-size="14" font-weight="bold" text-anchor="middle" fill="white">连接池优化</text>
<rect x="30" y="250" width="140" height="220" fill="white" stroke="#50C878" stroke-width="2" rx="5"/>
<text x="100" y="270" font-size="11" font-weight="bold" text-anchor="middle" fill="#2c3e50">配置项</text>
<text x="35" y="290" font-size="10" fill="#555">• 二级缓存开启</text>
<text x="35" y="310" font-size="10" fill="#555">• 延迟加载启用</text>
<text x="35" y="330" font-size="10" fill="#555">• fetchSize设置</text>
<text x="35" y="350" font-size="10" fill="#555">• useGeneratedKeys</text>
<text x="35" y="370" font-size="10" fill="#555">• mapUnderscoreToCamelCase</text>
<text x="35" y="390" font-size="10" fill="#555">• defaultStatementTimeout</text>
<text x="35" y="420" font-size="9" font-style="italic" fill="#E74C3C">提升: 20-30%</text>
<text x="35" y="435" font-size="9" font-style="italic" fill="#16A085">难度: ★☆☆</text>
<rect x="210" y="250" width="140" height="220" fill="white" stroke="#50C878" stroke-width="2" rx="5"/>
<text x="280" y="270" font-size="11" font-weight="bold" text-anchor="middle" fill="#2c3e50">SQL技巧</text>
<text x="215" y="290" font-size="10" fill="#555">• 避免SELECT *</text>
<text x="215" y="310" font-size="10" fill="#555">• 使用索引</text>
<text x="215" y="330" font-size="10" fill="#555">• 分页查询</text>
<text x="215" y="350" font-size="10" fill="#555">• 减少关联查询</text>
<text x="215" y="370" font-size="10" fill="#555">• 合理使用JOIN</text>
<text x="215" y="390" font-size="10" fill="#555">• 避免N+1问题</text>
<text x="215" y="420" font-size="9" font-style="italic" fill="#E74C3C">提升: 40-60%</text>
<text x="215" y="435" font-size="9" font-style="italic" fill="#16A085">难度: ★★☆</text>
<rect x="330" y="250" width="140" height="220" fill="white" stroke="#50C878" stroke-width="2" rx="5"/>
<text x="400" y="270" font-size="11" font-weight="bold" text-anchor="middle" fill="#2c3e50">缓存策略</text>
<text x="335" y="290" font-size="10" fill="#555">• 一级缓存利用</text>
<text x="335" y="310" font-size="10" fill="#555">• 二级缓存开启</text>
<text x="335" y="330" font-size="10" fill="#555">• Redis集成</text>
<text x="335" y="350" font-size="10" fill="#555">• 缓存粒度控制</text>
<text x="335" y="370" font-size="10" fill="#555">• 缓存失效策略</text>
<text x="335" y="390" font-size="10" fill="#555">• 热点数据预热</text>
<text x="335" y="420" font-size="9" font-style="italic" fill="#E74C3C">提升: 50-80%</text>
<text x="335" y="435" font-size="9" font-style="italic" fill="#16A085">难度: ★★★</text>
<rect x="450" y="250" width="140" height="220" fill="white" stroke="#50C878" stroke-width="2" rx="5"/>
<text x="520" y="270" font-size="11" font-weight="bold" text-anchor="middle" fill="#2c3e50">批量处理</text>
<text x="455" y="290" font-size="10" fill="#555">• BATCH模式</text>
<text x="455" y="310" font-size="10" fill="#555">• foreach批量插入</text>
<text x="455" y="330" font-size="10" fill="#555">• 批量更新</text>
<text x="455" y="350" font-size="10" fill="#555">• 批量删除</text>
<text x="455" y="370" font-size="10" fill="#555">• 控制批次大小</text>
<text x="455" y="390" font-size="10" fill="#555">• 事务管理</text>
<text x="455" y="420" font-size="9" font-style="italic" fill="#E74C3C">提升: 60-90%</text>
<text x="455" y="435" font-size="9" font-style="italic" fill="#16A085">难度: ★★☆</text>
<rect x="610" y="250" width="140" height="220" fill="white" stroke="#50C878" stroke-width="2" rx="5"/>
<text x="680" y="270" font-size="11" font-weight="bold" text-anchor="middle" fill="#2c3e50">连接池</text>
<text x="615" y="290" font-size="10" fill="#555">• 使用Druid/HikariCP</text>
<text x="615" y="310" font-size="10" fill="#555">• 池大小设置</text>
<text x="615" y="330" font-size="10" fill="#555">• 连接检测</text>
<text x="615" y="350" font-size="10" fill="#555">• 超时配置</text>
<text x="615" y="370" font-size="10" fill="#555">• 监控统计</text>
<text x="615" y="390" font-size="10" fill="#555">• 预热连接</text>
<text x="615" y="420" font-size="9" font-style="italic" fill="#E74C3C">提升: 10-20%</text>
<text x="615" y="435" font-size="9" font-style="italic" fill="#16A085">难度: ★☆☆</text>
</svg>

**关键要点**

1. **多维度优化**: 从配置、SQL、缓存、批量、连接池五个层面综合优化
2. **重点突破**: SQL 优化和缓存优化效果最显著
3. **量体裁衣**: 根据实际业务场景选择合适的优化策略
4. **持续监控**: 使用性能监控工具跟踪优化效果
5. **避免过度**: 不是所有场景都需要所有优化手段

**记忆口诀**

配置SQL缓存批量池,五大优化齐发力;
二级延迟分页索引,缓存批处理要记牢。

### 87. 如何避免 N+1 问题?

**核心答案**

N+1 问题是指执行 1 次主查询后,又对 N 条结果分别执行关联查询,导致总共执行 N+1 次 SQL。避免方法包括:使用联表查询(JOIN)、嵌套结果映射、延迟加载、批量查询四种方式。

**详细说明**

1. **N+1 问题示例**
   ```xml
   <!-- 主查询:查询所有订单(1次SQL) -->
   <select id="findAllOrders" resultMap="orderMap">
       SELECT * FROM orders
   </select>

   <!-- 关联查询:每个订单查询用户(N次SQL) -->
   <resultMap id="orderMap" type="Order">
       <id property="id" column="id"/>
       <association property="user" column="user_id" select="findUserById"/>
   </resultMap>

   <select id="findUserById" resultType="User">
       SELECT * FROM user WHERE id = #{id}
   </select>
   ```
   如果有 100 个订单,将执行 1 + 100 = 101 次 SQL 查询!

2. **解决方案一:使用 JOIN 联表查询**
   ```xml
   <!-- 一次SQL完成所有查询 -->
   <select id="findAllOrders" resultMap="orderMap">
       SELECT
           o.id as order_id,
           o.order_no,
           o.amount,
           o.user_id,
           u.id as user_id,
           u.name as user_name,
           u.email as user_email
       FROM orders o
       LEFT JOIN user u ON o.user_id = u.id
   </select>

   <resultMap id="orderMap" type="Order">
       <id property="id" column="order_id"/>
       <result property="orderNo" column="order_no"/>
       <result property="amount" column="amount"/>
       <association property="user" javaType="User">
           <id property="id" column="user_id"/>
           <result property="name" column="user_name"/>
           <result property="email" column="user_email"/>
       </association>
   </resultMap>
   ```
   **优点**: 只需一次数据库交互,性能最优
   **缺点**: 数据冗余,不适合一对多的大数据集

3. **解决方案二:嵌套结果映射**
   ```xml
   <select id="findAllOrdersWithItems" resultMap="orderWithItemsMap">
       SELECT
           o.id as order_id,
           o.order_no,
           i.id as item_id,
           i.product_name,
           i.quantity
       FROM orders o
       LEFT JOIN order_item i ON o.id = i.order_id
   </select>

   <resultMap id="orderWithItemsMap" type="Order">
       <id property="id" column="order_id"/>
       <result property="orderNo" column="order_no"/>
       <collection property="items" ofType="OrderItem">
           <id property="id" column="item_id"/>
           <result property="productName" column="product_name"/>
           <result property="quantity" column="quantity"/>
       </collection>
   </resultMap>
   ```
   **优点**: 一次查询完成,MyBatis 自动处理结果集合并
   **缺点**: 需要手动处理列名冲突

4. **解决方案三:延迟加载 + 批量查询**
   ```xml
   <!-- 开启延迟加载 -->
   <settings>
       <setting name="lazyLoadingEnabled" value="true"/>
       <setting name="aggressiveLazyLoading" value="false"/>
   </settings>

   <resultMap id="orderMap" type="Order">
       <id property="id" column="id"/>
       <association property="user" column="user_id"
                    select="findUserById" fetchType="lazy"/>
   </resultMap>
   ```
   **优点**: 按需加载,不访问关联属性就不执行关联查询
   **缺点**: 仍可能产生 N+1 问题(如果访问所有关联对象)

5. **解决方案四:使用 IN 查询批量加载**
   ```java
   // 先查询所有订单
   List<Order> orders = orderMapper.findAllOrders();

   // 收集所有用户ID
   Set<Long> userIds = orders.stream()
       .map(Order::getUserId)
       .collect(Collectors.toSet());

   // 一次查询所有用户
   List<User> users = userMapper.findByIds(userIds);

   // 在内存中组装关系
   Map<Long, User> userMap = users.stream()
       .collect(Collectors.toMap(User::getId, Function.identity()));

   orders.forEach(order ->
       order.setUser(userMap.get(order.getUserId()))
   );
   ```
   ```xml
   <select id="findByIds" resultType="User">
       SELECT * FROM user WHERE id IN
       <foreach collection="list" item="id" open="(" separator="," close=")">
           #{id}
       </foreach>
   </select>
   ```
   **优点**: 只需 2 次查询(1 + 1),灵活性高
   **缺点**: 需要额外的代码处理关联关系

**N+1 问题解决方案对比**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" style="stop-color:#E74C3C;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#C0392B;stop-opacity:1"/>
</linearGradient>
<linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" style="stop-color:#27AE60;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#229954;stop-opacity:1"/>
</linearGradient>
</defs>
<rect x="10" y="10" width="780" height="580" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="#2c3e50">N+1 问题及解决方案</text>
<rect x="50" y="70" width="700" height="100" fill="#FFF5F5" stroke="#E74C3C" stroke-width="2" rx="5"/>
<text x="400" y="95" font-size="16" font-weight="bold" text-anchor="middle" fill="#E74C3C">N+1 问题示例</text>
<text x="60" y="120" font-size="12" fill="#555">第1次: SELECT * FROM orders → 查询100条订单</text>
<text x="60" y="140" font-size="12" fill="#555">第2-101次: SELECT * FROM user WHERE id = ? → 为每个订单查询用户</text>
<text x="60" y="160" font-size="12" font-weight="bold" fill="#E74C3C">总计: 101 次数据库查询!</text>
<text x="60" y="200" font-size="16" font-weight="bold" fill="#2c3e50">解决方案对比</text>
<rect x="50" y="220" width="160" height="60" fill="url(#grad2)" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="130" y="245" font-size="13" font-weight="bold" text-anchor="middle" fill="white">方案一: JOIN查询</text>
<text x="130" y="265" font-size="11" text-anchor="middle" fill="white">SQL次数: 1次</text>
<rect x="50" y="290" width="160" height="80" fill="white" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="60" y="310" font-size="11" fill="#16A085">✓ 性能最优</text>
<text x="60" y="330" font-size="11" fill="#16A085">✓ 一次数据库交互</text>
<text x="60" y="350" font-size="11" fill="#E74C3C">✗ 数据冗余</text>
<text x="60" y="365" font-size="11" fill="#E74C3C">✗ 不适合大数据集</text>
<rect x="230" y="220" width="160" height="60" fill="url(#grad2)" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="310" y="245" font-size="13" font-weight="bold" text-anchor="middle" fill="white">方案二: 嵌套结果</text>
<text x="310" y="265" font-size="11" text-anchor="middle" fill="white">SQL次数: 1次</text>
<rect x="230" y="290" width="160" height="80" fill="white" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="240" y="310" font-size="11" fill="#16A085">✓ 一次查询完成</text>
<text x="240" y="330" font-size="11" fill="#16A085">✓ 自动处理合并</text>
<text x="240" y="350" font-size="11" fill="#E74C3C">✗ 列名冲突处理</text>
<text x="240" y="365" font-size="11" fill="#F39C12">○ 适合一对多场景</text>
<rect x="410" y="220" width="160" height="60" fill="#F39C12" stroke="#D68910" stroke-width="2" rx="5"/>
<text x="490" y="245" font-size="13" font-weight="bold" text-anchor="middle" fill="white">方案三: 延迟加载</text>
<text x="490" y="265" font-size="11" text-anchor="middle" fill="white">SQL次数: 按需</text>
<rect x="410" y="290" width="160" height="80" fill="white" stroke="#F39C12" stroke-width="2" rx="5"/>
<text x="420" y="310" font-size="11" fill="#16A085">✓ 按需加载数据</text>
<text x="420" y="330" font-size="11" fill="#16A085">✓ 节省内存</text>
<text x="420" y="350" font-size="11" fill="#E74C3C">✗ 可能仍有N+1</text>
<text x="420" y="365" font-size="11" fill="#F39C12">○ 适合部分访问</text>
<rect x="590" y="220" width="160" height="60" fill="url(#grad2)" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="670" y="245" font-size="13" font-weight="bold" text-anchor="middle" fill="white">方案四: IN批量</text>
<text x="670" y="265" font-size="11" text-anchor="middle" fill="white">SQL次数: 2次</text>
<rect x="590" y="290" width="160" height="80" fill="white" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="600" y="310" font-size="11" fill="#16A085">✓ 性能较好</text>
<text x="600" y="330" font-size="11" fill="#16A085">✓ 灵活性高</text>
<text x="600" y="350" font-size="11" fill="#E74C3C">✗ 需额外代码</text>
<text x="600" y="365" font-size="11" fill="#F39C12">○ 通用性强</text>
<text x="60" y="400" font-size="16" font-weight="bold" fill="#2c3e50">性能对比(以100条订单为例)</text>
<rect x="50" y="420" width="700" height="150" fill="white" stroke="#dee2e6" stroke-width="2" rx="5"/>
<line x1="50" y1="450" x2="750" y2="450" stroke="#dee2e6" stroke-width="1"/>
<line x1="150" y1="420" x2="150" y2="570" stroke="#dee2e6" stroke-width="1"/>
<line x1="300" y1="420" x2="300" y2="570" stroke="#dee2e6" stroke-width="1"/>
<line x1="450" y1="420" x2="450" y2="570" stroke="#dee2e6" stroke-width="1"/>
<line x1="600" y1="420" x2="600" y2="570" stroke="#dee2e6" stroke-width="1"/>
<text x="100" y="440" font-size="12" font-weight="bold" text-anchor="middle" fill="#2c3e50">方案</text>
<text x="225" y="440" font-size="12" font-weight="bold" text-anchor="middle" fill="#2c3e50">SQL次数</text>
<text x="375" y="440" font-size="12" font-weight="bold" text-anchor="middle" fill="#2c3e50">网络开销</text>
<text x="525" y="440" font-size="12" font-weight="bold" text-anchor="middle" fill="#2c3e50">数据冗余</text>
<text x="675" y="440" font-size="12" font-weight="bold" text-anchor="middle" fill="#2c3e50">推荐场景</text>
<text x="100" y="475" font-size="11" text-anchor="middle" fill="#555">N+1问题</text>
<text x="225" y="475" font-size="11" text-anchor="middle" fill="#E74C3C">101次</text>
<text x="375" y="475" font-size="11" text-anchor="middle" fill="#E74C3C">极高</text>
<text x="525" y="475" font-size="11" text-anchor="middle" fill="#27AE60">无</text>
<text x="675" y="475" font-size="11" text-anchor="middle" fill="#E74C3C">应避免</text>
<line x1="50" y1="490" x2="750" y2="490" stroke="#dee2e6" stroke-width="1"/>
<text x="100" y="510" font-size="11" text-anchor="middle" fill="#555">JOIN查询</text>
<text x="225" y="510" font-size="11" text-anchor="middle" fill="#27AE60">1次</text>
<text x="375" y="510" font-size="11" text-anchor="middle" fill="#27AE60">最低</text>
<text x="525" y="510" font-size="11" text-anchor="middle" fill="#F39C12">中等</text>
<text x="675" y="510" font-size="11" text-anchor="middle" fill="#27AE60">一对一关联</text>
<line x1="50" y1="520" x2="750" y2="520" stroke="#dee2e6" stroke-width="1"/>
<text x="100" y="540" font-size="11" text-anchor="middle" fill="#555">嵌套结果</text>
<text x="225" y="540" font-size="11" text-anchor="middle" fill="#27AE60">1次</text>
<text x="375" y="540" font-size="11" text-anchor="middle" fill="#27AE60">最低</text>
<text x="525" y="540" font-size="11" text-anchor="middle" fill="#E74C3C">较高</text>
<text x="675" y="540" font-size="11" text-anchor="middle" fill="#27AE60">一对多关联</text>
<line x1="50" y1="550" x2="750" y2="550" stroke="#dee2e6" stroke-width="1"/>
<text x="100" y="565" font-size="11" text-anchor="middle" fill="#555">IN批量查询</text>
<text x="225" y="565" font-size="11" text-anchor="middle" fill="#27AE60">2次</text>
<text x="375" y="565" font-size="11" text-anchor="middle" fill="#27AE60">低</text>
<text x="525" y="565" font-size="11" text-anchor="middle" fill="#27AE60">无</text>
<text x="675" y="565" font-size="11" text-anchor="middle" fill="#27AE60">复杂关联</text>
</svg>

**关键要点**

1. **优先使用 JOIN**: 对于一对一关联,JOIN 查询是最优解
2. **嵌套结果适合一对多**: 处理一对多关联时使用嵌套结果映射
3. **谨慎使用延迟加载**: 延迟加载可能导致隐藏的 N+1 问题
4. **IN 查询灵活通用**: 适合复杂场景和需要精细控制的情况
5. **监控 SQL 执行**: 使用日志或性能监控工具发现 N+1 问题

**记忆口诀**

N加一问题要警惕,一次查询变百次;
JOIN嵌套IN延迟,四种方案来解决;
一对一用JOIN最优,一对多用嵌套结果。

### 88. 如何使用批量操作提高性能?

**核心答案**

MyBatis 批量操作通过减少数据库交互次数来提升性能,主要有三种实现方式:ExecutorType.BATCH 模式、foreach 标签批量 SQL、Spring 的 @Transactional 配合批量操作。合理使用可将性能提升 10-100 倍。

**详细说明**

1. **方式一:使用 ExecutorType.BATCH 模式**

   **原理**: 将多个 SQL 语句缓存起来,一次性发送到数据库执行

   ```java
   // 批量插入示例
   public void batchInsert(List<User> users) {
       SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH);
       try {
           UserMapper mapper = session.getMapper(UserMapper.class);
           for (User user : users) {
               mapper.insert(user);
           }
           session.commit();  // 一次性提交所有SQL
       } catch (Exception e) {
           session.rollback();
           throw e;
       } finally {
           session.close();
       }
   }

   // 批量更新示例
   public void batchUpdate(List<User> users) {
       SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH);
       try {
           UserMapper mapper = session.getMapper(UserMapper.class);
           int count = 0;
           for (User user : users) {
               mapper.update(user);
               // 每1000条提交一次,避免内存溢出
               if (++count % 1000 == 0) {
                   session.commit();
                   session.clearCache();
               }
           }
           session.commit();  // 提交剩余的
       } finally {
           session.close();
       }
   }
   ```

   **优点**:
   - 减少网络往返次数
   - 提升性能显著(10-100倍)
   - 代码改动小

   **注意事项**:
   - 需要手动控制批次大小,避免 OOM
   - 无法立即获取自增主键
   - 异常处理需要整批回滚

2. **方式二:使用 foreach 标签批量 SQL**

   **批量插入**
   ```xml
   <insert id="batchInsert" parameterType="list">
       INSERT INTO user (name, email, age)
       VALUES
       <foreach collection="list" item="user" separator=",">
           (#{user.name}, #{user.email}, #{user.age})
       </foreach>
   </insert>
   ```

   **批量更新(使用 CASE WHEN)**
   ```xml
   <update id="batchUpdate" parameterType="list">
       UPDATE user
       SET
       name = CASE id
           <foreach collection="list" item="user">
               WHEN #{user.id} THEN #{user.name}
           </foreach>
       END,
       email = CASE id
           <foreach collection="list" item="user">
               WHEN #{user.id} THEN #{user.email}
           </foreach>
       END
       WHERE id IN
       <foreach collection="list" item="user" open="(" separator="," close=")">
           #{user.id}
       </foreach>
   </update>
   ```

   **批量删除**
   ```xml
   <delete id="batchDelete" parameterType="list">
       DELETE FROM user WHERE id IN
       <foreach collection="list" item="id" open="(" separator="," close=")">
           #{id}
       </foreach>
   </delete>
   ```

   **优点**:
   - 只执行一条 SQL,性能最优
   - 可以获取影响行数
   - 适合数据量不大的场景

   **注意事项**:
   - SQL 语句可能过长(数据库有限制)
   - 数据量大时需要分批处理
   - 批量更新的 CASE WHEN 语句较复杂

3. **方式三:Spring + MyBatis 批量操作**

   ```java
   @Service
   public class UserService {

       @Autowired
       private SqlSessionFactory sqlSessionFactory;

       @Transactional
       public void batchInsert(List<User> users) {
           SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
           try {
               UserMapper mapper = session.getMapper(UserMapper.class);
               int batchSize = 1000;
               for (int i = 0; i < users.size(); i++) {
                   mapper.insert(users.get(i));
                   if (i % batchSize == 0 || i == users.size() - 1) {
                       session.flushStatements();  // 刷新批处理语句
                   }
               }
           } finally {
               session.close();
           }
       }

       // 使用 SqlSessionTemplate
       @Autowired
       private SqlSessionTemplate sqlSessionTemplate;

       public void batchInsertWithTemplate(List<User> users) {
           SqlSessionTemplate batchSession = new SqlSessionTemplate(
               sqlSessionFactory, ExecutorType.BATCH);

           UserMapper mapper = batchSession.getMapper(UserMapper.class);
           for (User user : users) {
               mapper.insert(user);
           }
           batchSession.flushStatements();
       }
   }
   ```

4. **性能对比**

   假设插入 10,000 条数据:
   - **逐条插入**: 10,000 次数据库交互,耗时约 50 秒
   - **BATCH 模式**: 100 次数据库交互(每批 100 条),耗时约 2 秒
   - **foreach 批量**: 1 次数据库交互,耗时约 0.5 秒

5. **最佳实践**

   ```java
   public void optimizedBatchInsert(List<User> users) {
       if (users == null || users.isEmpty()) {
           return;
       }

       int batchSize = 1000;  // 批次大小
       int total = users.size();

       // 如果数据量小,直接使用 foreach
       if (total <= batchSize) {
           userMapper.batchInsert(users);
           return;
       }

       // 数据量大,使用 BATCH 模式分批处理
       SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH);
       try {
           UserMapper mapper = session.getMapper(UserMapper.class);
           for (int i = 0; i < total; i++) {
               mapper.insert(users.get(i));
               if ((i + 1) % batchSize == 0 || i == total - 1) {
                   session.commit();
                   session.clearCache();  // 清理缓存防止内存溢出
               }
           }
       } catch (Exception e) {
           session.rollback();
           throw new RuntimeException("批量插入失败", e);
       } finally {
           session.close();
       }
   }
   ```

**批量操作性能对比图**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#E74C3C;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#C0392B;stop-opacity:1"/>
</linearGradient>
<linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#F39C12;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#D68910;stop-opacity:1"/>
</linearGradient>
<linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#27AE60;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#229954;stop-opacity:1"/>
</linearGradient>
</defs>
<rect x="10" y="10" width="780" height="530" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="#2c3e50">批量操作性能对比(10,000条数据)</text>
<rect x="50" y="70" width="220" height="450" fill="white" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="160" y="100" font-size="14" font-weight="bold" text-anchor="middle" fill="#2c3e50">逐条插入</text>
<rect x="70" y="120" width="180" height="400" fill="url(#grad1)" rx="5"/>
<text x="160" y="155" font-size="12" font-weight="bold" text-anchor="middle" fill="white">10,000 次 SQL</text>
<text x="160" y="310" font-size="24" font-weight="bold" text-anchor="middle" fill="white">50 秒</text>
<text x="160" y="500" font-size="11" text-anchor="middle" fill="white">性能: ★☆☆☆☆</text>
<rect x="290" y="70" width="220" height="450" fill="white" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="100" font-size="14" font-weight="bold" text-anchor="middle" fill="#2c3e50">BATCH 模式</text>
<rect x="310" y="480" width="180" height="40" fill="url(#grad2)" rx="5"/>
<text x="400" y="195" font-size="12" font-weight="bold" text-anchor="middle" fill="#555">100 次批处理</text>
<text x="400" y="215" font-size="11" text-anchor="middle" fill="#777">(每批100条)</text>
<text x="400" y="350" font-size="24" font-weight="bold" text-anchor="middle" fill="#555">2 秒</text>
<text x="400" y="505" font-size="11" text-anchor="middle" fill="white">性能: ★★★★☆</text>
<rect x="530" y="70" width="220" height="450" fill="white" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="640" y="100" font-size="14" font-weight="bold" text-anchor="middle" fill="#2c3e50">foreach 批量</text>
<rect x="550" y="500" width="180" height="20" fill="url(#grad3)" rx="5"/>
<text x="640" y="195" font-size="12" font-weight="bold" text-anchor="middle" fill="#555">1 次 SQL</text>
<text x="640" y="215" font-size="11" text-anchor="middle" fill="#777">(VALUES合并)</text>
<text x="640" y="350" font-size="24" font-weight="bold" text-anchor="middle" fill="#555">0.5 秒</text>
<text x="640" y="515" font-size="11" text-anchor="middle" fill="white">性能: ★★★★★</text>
<line x1="160" y1="120" x2="160" y2="520" stroke="#fff" stroke-width="2" stroke-dasharray="5,5" opacity="0.3"/>
<line x1="400" y1="480" x2="400" y2="520" stroke="#fff" stroke-width="2" stroke-dasharray="5,5" opacity="0.3"/>
<line x1="640" y1="500" x2="640" y2="520" stroke="#fff" stroke-width="2" stroke-dasharray="5,5" opacity="0.3"/>
<text x="160" y="145" font-size="10" text-anchor="middle" fill="white">网络往返:</text>
<text x="160" y="165" font-size="10" text-anchor="middle" fill="white">10,000 次</text>
<text x="400" y="240" font-size="10" text-anchor="middle" fill="#555">网络往返:</text>
<text x="400" y="255" font-size="10" text-anchor="middle" fill="#555">100 次</text>
<text x="640" y="240" font-size="10" text-anchor="middle" fill="#555">网络往返:</text>
<text x="640" y="255" font-size="10" text-anchor="middle" fill="#555">1 次</text>
<rect x="70" y="180" width="180" height="1" fill="white" opacity="0.3"/>
<text x="160" y="195" font-size="9" text-anchor="middle" fill="white">每条SQL单独执行</text>
<rect x="310" y="270" width="180" height="1" fill="#555" opacity="0.3"/>
<text x="400" y="285" font-size="9" text-anchor="middle" fill="#555">累积后批量执行</text>
<rect x="550" y="270" width="180" height="1" fill="#555" opacity="0.3"/>
<text x="640" y="285" font-size="9" text-anchor="middle" fill="#555">单条SQL多值插入</text>
<text x="160" y="475" font-size="10" text-anchor="middle" fill="white">内存占用: 低</text>
<text x="400" y="460" font-size="10" text-anchor="middle" fill="#555">内存占用: 中</text>
<text x="640" y="480" font-size="10" text-anchor="middle" fill="#555">内存占用: 高</text>
</svg>

**关键要点**

1. **数据量小(<1000)**: 优先使用 foreach 批量 SQL,一次搞定
2. **数据量大(>1000)**: 使用 BATCH 模式分批处理,防止内存溢出和 SQL 过长
3. **控制批次大小**: 建议每批 500-1000 条,根据数据大小调整
4. **定期提交和清缓存**: 避免内存占用过高
5. **异常处理**: 批量操作失败需要整批回滚或记录日志

**记忆口诀**

批量操作三法宝,BATCH模式foreach好;
数据少用foreach快,数据多用BATCH妙;
千条一批防溢出,提交清缓存要记牢。

### 89. 如何使用缓存提高性能?

**核心答案**

MyBatis 提供一级缓存(SqlSession 级别)和二级缓存(Mapper 级别)两种缓存机制,合理使用可以显著减少数据库访问次数。实际应用中还可以整合 Redis 等分布式缓存实现更高级的缓存策略。

**详细说明**

1. **一级缓存(默认开启)**

   **特点**:
   - 作用域: SqlSession 级别
   - 生命周期: SqlSession 创建到关闭
   - 存储位置: 内存中的 HashMap
   - 失效条件: 执行增删改、手动清空、SqlSession 关闭

   ```java
   // 一级缓存示例
   SqlSession session = sqlSessionFactory.openSession();
   try {
       UserMapper mapper = session.getMapper(UserMapper.class);

       // 第一次查询,访问数据库
       User user1 = mapper.findById(1L);
       System.out.println("First query: " + user1);

       // 第二次查询,使用一级缓存,不访问数据库
       User user2 = mapper.findById(1L);
       System.out.println("Second query: " + user2);
       System.out.println(user1 == user2);  // true,同一对象

       // 执行更新操作会清空一级缓存
       mapper.update(new User(2L, "New Name"));

       // 再次查询,一级缓存已失效,重新访问数据库
       User user3 = mapper.findById(1L);
   } finally {
       session.close();
   }
   ```

   **注意事项**:
   - 分布式环境下可能造成数据不一致
   - 可以通过配置关闭: `<setting name="localCacheScope" value="STATEMENT"/>`

2. **二级缓存(需手动开启)**

   **配置步骤**:

   ① 在 mybatis-config.xml 中启用二级缓存
   ```xml
   <settings>
       <setting name="cacheEnabled" value="true"/>
   </settings>
   ```

   ② 在 Mapper.xml 中配置缓存
   ```xml
   <!-- 使用默认配置 -->
   <cache/>

   <!-- 自定义配置 -->
   <cache
       eviction="LRU"           <!-- 缓存回收策略:LRU/FIFO/SOFT/WEAK -->
       flushInterval="60000"    <!-- 刷新间隔:60秒 -->
       size="512"               <!-- 缓存对象数量:512个 -->
       readOnly="false"         <!-- 是否只读:false允许修改 -->
   />
   ```

   ③ 实体类实现 Serializable 接口
   ```java
   public class User implements Serializable {
       private static final long serialVersionUID = 1L;
       private Long id;
       private String name;
       // getters and setters
   }
   ```

   **使用示例**:
   ```java
   // 第一个 SqlSession
   SqlSession session1 = sqlSessionFactory.openSession();
   UserMapper mapper1 = session1.getMapper(UserMapper.class);
   User user1 = mapper1.findById(1L);  // 查询数据库
   session1.commit();  // 提交后数据进入二级缓存
   session1.close();

   // 第二个 SqlSession
   SqlSession session2 = sqlSessionFactory.openSession();
   UserMapper mapper2 = session2.getMapper(UserMapper.class);
   User user2 = mapper2.findById(1L);  // 从二级缓存读取,不查数据库
   session2.close();
   ```

   **缓存回收策略**:
   - **LRU**(Least Recently Used): 移除最长时间不被使用的对象(推荐)
   - **FIFO**(First In First Out): 先进先出,按对象进入缓存的顺序移除
   - **SOFT**: 基于垃圾回收器状态和软引用规则移除对象
   - **WEAK**: 基于垃圾回收器状态和弱引用规则移除对象

3. **整合 Redis 实现分布式缓存**

   **依赖配置**:
   ```xml
   <dependency>
       <groupId>org.mybatis.caches</groupId>
       <artifactId>mybatis-redis</artifactId>
       <version>1.0.0-beta2</version>
   </dependency>
   ```

   **Mapper.xml 配置**:
   ```xml
   <cache type="org.mybatis.caches.redis.RedisCache">
       <property name="host" value="localhost"/>
       <property name="port" value="6379"/>
       <property name="timeout" value="5000"/>
   </cache>
   ```

   **自定义 Redis 缓存实现**:
   ```java
   public class RedisCache implements Cache {
       private final String id;
       private final RedisTemplate<String, Object> redisTemplate;

       public RedisCache(String id) {
           this.id = id;
           this.redisTemplate = SpringContextHolder.getBean("redisTemplate");
       }

       @Override
       public String getId() {
           return id;
       }

       @Override
       public void putObject(Object key, Object value) {
           redisTemplate.opsForValue().set(
               getCacheKey(key), value, 30, TimeUnit.MINUTES
           );
       }

       @Override
       public Object getObject(Object key) {
           return redisTemplate.opsForValue().get(getCacheKey(key));
       }

       @Override
       public Object removeObject(Object key) {
           return redisTemplate.delete(getCacheKey(key));
       }

       @Override
       public void clear() {
           Set<String> keys = redisTemplate.keys(id + ":*");
           if (keys != null && !keys.isEmpty()) {
               redisTemplate.delete(keys);
           }
       }

       private String getCacheKey(Object key) {
           return id + ":" + key.hashCode();
       }
   }
   ```

4. **缓存最佳实践**

   **适合使用缓存的场景**:
   - 查询频繁,修改较少的数据
   - 实时性要求不高的数据
   - 数据量不大,但查询成本高的数据

   **不适合使用缓存的场景**:
   - 实时性要求高的数据
   - 频繁更新的数据
   - 关联关系复杂的数据

   **配置建议**:
   ```xml
   <!-- 针对不同 Mapper 配置不同的缓存策略 -->

   <!-- 用户信息:更新少,查询多 -->
   <cache eviction="LRU" flushInterval="300000" size="1024" readOnly="true"/>

   <!-- 订单信息:更新频繁,缓存时间短 -->
   <cache eviction="LRU" flushInterval="60000" size="512" readOnly="false"/>

   <!-- 某些查询不使用缓存 -->
   <select id="findRealTimeData" resultType="Data" useCache="false">
       SELECT * FROM data WHERE id = #{id}
   </select>
   ```

**MyBatis 缓存架构图**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" style="stop-color:#3498DB;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#2980B9;stop-opacity:1"/>
</linearGradient>
<linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" style="stop-color:#E74C3C;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#C0392B;stop-opacity:1"/>
</linearGradient>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="10" y="10" width="780" height="580" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="#2c3e50">MyBatis 缓存体系</text>
<rect x="300" y="70" width="200" height="50" fill="url(#grad1)" stroke="#2c3e50" stroke-width="2" rx="5"/>
<text x="400" y="100" font-size="16" font-weight="bold" text-anchor="middle" fill="white">应用程序</text>
<line x1="400" y1="120" x2="250" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="120" x2="550" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="170" width="250" height="80" fill="#FFF3CD" stroke="#F39C12" stroke-width="2" rx="5"/>
<text x="225" y="195" font-size="15" font-weight="bold" text-anchor="middle" fill="#2c3e50">一级缓存(本地缓存)</text>
<text x="110" y="215" font-size="11" fill="#555">• 作用域: SqlSession</text>
<text x="110" y="230" font-size="11" fill="#555">• 默认开启</text>
<text x="110" y="245" font-size="11" fill="#555">• 存储: HashMap</text>
<rect x="450" y="170" width="250" height="80" fill="#D1F2EB" stroke="#16A085" stroke-width="2" rx="5"/>
<text x="575" y="195" font-size="15" font-weight="bold" text-anchor="middle" fill="#2c3e50">二级缓存(全局缓存)</text>
<text x="460" y="215" font-size="11" fill="#555">• 作用域: Mapper</text>
<text x="460" y="230" font-size="11" fill="#555">• 需手动开启</text>
<text x="460" y="245" font-size="11" fill="#555">• 跨 SqlSession 共享</text>
<line x1="225" y1="250" x2="225" y2="290" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="575" y1="250" x2="575" y2="290" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="300" width="250" height="120" fill="white" stroke="#F39C12" stroke-width="2" rx="5"/>
<text x="225" y="325" font-size="13" font-weight="bold" text-anchor="middle" fill="#2c3e50">一级缓存流程</text>
<circle cx="120" cy="350" r="5" fill="#3498DB"/>
<text x="135" y="355" font-size="10" fill="#555">1. 查询时先检查一级缓存</text>
<circle cx="120" cy="370" r="5" fill="#3498DB"/>
<text x="135" y="375" font-size="10" fill="#555">2. 命中则直接返回</text>
<circle cx="120" cy="390" r="5" fill="#3498DB"/>
<text x="135" y="395" font-size="10" fill="#555">3. 未命中则查询数据库</text>
<circle cx="120" cy="410" r="5" fill="#3498DB"/>
<text x="135" y="415" font-size="10" fill="#555">4. 结果放入一级缓存</text>
<rect x="450" y="300" width="250" height="120" fill="white" stroke="#16A085" stroke-width="2" rx="5"/>
<text x="575" y="325" font-size="13" font-weight="bold" text-anchor="middle" fill="#2c3e50">二级缓存流程</text>
<circle cx="470" cy="350" r="5" fill="#27AE60"/>
<text x="485" y="355" font-size="10" fill="#555">1. 查询时先检查二级缓存</text>
<circle cx="470" cy="370" r="5" fill="#27AE60"/>
<text x="485" y="375" font-size="10" fill="#555">2. 命中则直接返回</text>
<circle cx="470" cy="390" r="5" fill="#27AE60"/>
<text x="485" y="395" font-size="10" fill="#555">3. 未命中则查一级缓存</text>
<circle cx="470" cy="410" r="5" fill="#27AE60"/>
<text x="485" y="415" font-size="10" fill="#555">4. 提交后放入二级缓存</text>
<line x1="225" y1="420" x2="225" y2="460" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="575" y1="420" x2="575" y2="460" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="470" width="200" height="50" fill="url(#grad2)" stroke="#2c3e50" stroke-width="2" rx="5"/>
<text x="400" y="500" font-size="16" font-weight="bold" text-anchor="middle" fill="white">数据库</text>
<rect x="50" y="540" width="340" height="50" fill="#FADBD8" stroke="#E74C3C" stroke-width="2" rx="5"/>
<text x="220" y="565" font-size="12" font-weight="bold" text-anchor="middle" fill="#2c3e50">缓存失效条件:</text>
<text x="60" y="580" font-size="10" fill="#555">• 执行增删改操作  • 手动清空  • SqlSession关闭</text>
<rect x="410" y="540" width="340" height="50" fill="#D5F4E6" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="580" y="565" font-size="12" font-weight="bold" text-anchor="middle" fill="#2c3e50">Redis分布式缓存:</text>
<text x="420" y="580" font-size="10" fill="#555">• 支持集群  • 数据持久化  • 高性能高可用</text>
<text x="225" y="450" font-size="9" font-style="italic" text-anchor="middle" fill="#999">命中率: 低</text>
<text x="575" y="450" font-size="9" font-style="italic" text-anchor="middle" fill="#999">命中率: 高</text>
</svg>

**关键要点**

1. **一级缓存默认开启**: 同一个 SqlSession 内自动缓存,无需配置
2. **二级缓存需配置**: 适合读多写少的场景,注意数据一致性
3. **选择合适的回收策略**: LRU 最常用,根据场景选择 FIFO/SOFT/WEAK
4. **分布式系统用 Redis**: 跨服务器共享缓存,支持集群
5. **控制缓存粒度**: 不是所有查询都需要缓存,关键查询才启用

**记忆口诀**

一级二级两重缓存,Session和Mapper要分清;
一级默认二级配置,读多写少用缓存;
LRU策略最常用,分布式场景上Redis。

### 90. 如何优化 SQL 语句?

**核心答案**

SQL 优化是 MyBatis 性能优化的关键,主要从减少查询范围、合理使用索引、避免全表扫描、优化 JOIN 查询、使用批量操作五个方面入手,结合 EXPLAIN 分析和慢查询日志进行针对性优化。

**详细说明**

1. **减少查询范围**

   **① 避免 SELECT ***
   ```xml
   <!-- 不推荐:查询所有字段 -->
   <select id="findById" resultType="User">
       SELECT * FROM user WHERE id = #{id}
   </select>

   <!-- 推荐:只查询需要的字段 -->
   <select id="findById" resultType="User">
       SELECT id, name, email, age FROM user WHERE id = #{id}
   </select>
   ```
   **优点**: 减少网络传输量、提高查询速度、减少内存占用

   **② 使用分页查询**
   ```xml
   <!-- 不推荐:一次性查询所有数据 -->
   <select id="findAll" resultType="User">
       SELECT * FROM user
   </select>

   <!-- 推荐:分页查询 -->
   <select id="findByPage" resultType="User">
       SELECT id, name, email
       FROM user
       LIMIT #{offset}, #{pageSize}
   </select>
   ```

   **③ 使用 WHERE 条件过滤**
   ```xml
   <!-- 精确的 WHERE 条件可以利用索引 -->
   <select id="findActiveUsers" resultType="User">
       SELECT id, name, email
       FROM user
       WHERE status = 1
         AND create_time >= #{startTime}
       ORDER BY create_time DESC
       LIMIT 100
   </select>
   ```

2. **合理使用索引**

   **① 在 WHERE、ORDER BY、GROUP BY 字段上建立索引**
   ```sql
   -- 为常用查询字段建立索引
   CREATE INDEX idx_user_email ON user(email);
   CREATE INDEX idx_user_status_time ON user(status, create_time);
   ```

   **② 避免索引失效**
   ```xml
   <!-- 索引失效情况 -->

   <!-- 不推荐:在索引列上使用函数 -->
   <select id="findByYear" resultType="User">
       SELECT * FROM user WHERE YEAR(create_time) = 2024
   </select>

   <!-- 推荐:使用范围查询 -->
   <select id="findByYear" resultType="User">
       SELECT * FROM user
       WHERE create_time >= '2024-01-01'
         AND create_time < '2025-01-01'
   </select>

   <!-- 不推荐:前导模糊查询 -->
   <select id="findByName" resultType="User">
       SELECT * FROM user WHERE name LIKE '%张%'
   </select>

   <!-- 推荐:后缀模糊查询 -->
   <select id="findByName" resultType="User">
       SELECT * FROM user WHERE name LIKE '张%'
   </select>

   <!-- 不推荐:使用 OR 连接 -->
   <select id="findUsers" resultType="User">
       SELECT * FROM user WHERE status = 1 OR age > 18
   </select>

   <!-- 推荐:使用 IN 或 UNION -->
   <select id="findUsers" resultType="User">
       SELECT * FROM user WHERE status = 1
       UNION
       SELECT * FROM user WHERE age > 18
   </select>
   ```

3. **优化 JOIN 查询**

   **① 小表驱动大表**
   ```xml
   <!-- 推荐:用小表(部门10条)驱动大表(用户10000条) -->
   <select id="findUsersWithDept" resultType="UserVO">
       SELECT u.id, u.name, d.dept_name
       FROM department d
       INNER JOIN user u ON d.id = u.dept_id
       WHERE d.status = 1
   </select>
   ```

   **② 减少 JOIN 层级**
   ```xml
   <!-- 不推荐:多层嵌套 JOIN -->
   <select id="findComplex" resultType="OrderVO">
       SELECT o.*, u.*, p.*, c.*
       FROM orders o
       LEFT JOIN user u ON o.user_id = u.id
       LEFT JOIN product p ON o.product_id = p.id
       LEFT JOIN category c ON p.category_id = c.id
   </select>

   <!-- 推荐:拆分查询,在应用层组装 -->
   <select id="findOrders" resultType="Order">
       SELECT * FROM orders WHERE id IN
       <foreach collection="ids" item="id" open="(" separator="," close=")">
           #{id}
       </foreach>
   </select>
   ```

   **③ 使用 EXISTS 代替 IN(适用于子查询返回结果较大时)**
   ```xml
   <!-- IN 查询 -->
   <select id="findUsers1" resultType="User">
       SELECT * FROM user
       WHERE id IN (SELECT user_id FROM orders WHERE status = 1)
   </select>

   <!-- EXISTS 查询(性能更好) -->
   <select id="findUsers2" resultType="User">
       SELECT * FROM user u
       WHERE EXISTS (
           SELECT 1 FROM orders o
           WHERE o.user_id = u.id AND o.status = 1
       )
   </select>
   ```

4. **避免全表扫描**

   **① 使用覆盖索引**
   ```sql
   -- 创建覆盖索引
   CREATE INDEX idx_user_name_email ON user(name, email);
   ```
   ```xml
   <!-- 查询字段全部在索引中,不需要回表 -->
   <select id="findNameAndEmail" resultType="UserVO">
       SELECT name, email FROM user WHERE name = #{name}
   </select>
   ```

   **② 避免 IS NULL 和 IS NOT NULL**
   ```xml
   <!-- 不推荐:IS NULL 可能导致全表扫描 -->
   <select id="findUsers" resultType="User">
       SELECT * FROM user WHERE email IS NULL
   </select>

   <!-- 推荐:使用默认值 -->
   <select id="findUsers" resultType="User">
       SELECT * FROM user WHERE email = ''
   </select>
   ```

5. **使用批量操作**

   **① 批量插入**
   ```xml
   <insert id="batchInsert" parameterType="list">
       INSERT INTO user (name, email, age)
       VALUES
       <foreach collection="list" item="user" separator=",">
           (#{user.name}, #{user.email}, #{user.age})
       </foreach>
   </insert>
   ```

   **② 批量更新**
   ```xml
   <update id="batchUpdate">
       UPDATE user
       SET status = CASE id
           <foreach collection="list" item="user">
               WHEN #{user.id} THEN #{user.status}
           </foreach>
       END
       WHERE id IN
       <foreach collection="list" item="user" open="(" separator="," close=")">
           #{user.id}
       </foreach>
   </update>
   ```

6. **使用 EXPLAIN 分析查询**

   ```sql
   -- 分析查询执行计划
   EXPLAIN SELECT * FROM user WHERE email = 'test@example.com';
   ```

   **关键指标**:
   - **type**: 连接类型(system > const > eq_ref > ref > range > index > ALL)
   - **possible_keys**: 可能使用的索引
   - **key**: 实际使用的索引
   - **rows**: 扫描的行数(越少越好)
   - **Extra**: 额外信息(Using index 表示使用了覆盖索引)

**SQL 优化决策树**

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#3498DB;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#2980B9;stop-opacity:1"/>
</linearGradient>
<linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#27AE60;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#229954;stop-opacity:1"/>
</linearGradient>
<linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#E74C3C;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#C0392B;stop-opacity:1"/>
</linearGradient>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="10" y="10" width="780" height="630" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="#2c3e50">SQL 优化策略</text>
<rect x="300" y="70" width="200" height="50" fill="url(#grad1)" stroke="#2c3e50" stroke-width="2" rx="5"/>
<text x="400" y="100" font-size="15" font-weight="bold" text-anchor="middle" fill="white">慢查询识别</text>
<line x1="400" y1="120" x2="200" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="120" x2="400" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="120" x2="600" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="170" width="180" height="50" fill="url(#grad2)" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="190" y="200" font-size="13" font-weight="bold" text-anchor="middle" fill="white">查询范围优化</text>
<rect x="310" y="170" width="180" height="50" fill="url(#grad2)" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="400" y="200" font-size="13" font-weight="bold" text-anchor="middle" fill="white">索引优化</text>
<rect x="520" y="170" width="180" height="50" fill="url(#grad2)" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="610" y="200" font-size="13" font-weight="bold" text-anchor="middle" fill="white">JOIN优化</text>
<line x1="190" y1="220" x2="190" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="220" x2="400" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="610" y1="220" x2="610" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="260" width="180" height="140" fill="white" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="190" y="280" font-size="11" font-weight="bold" text-anchor="middle" fill="#2c3e50">查询范围</text>
<text x="110" y="300" font-size="10" fill="#555">✓ 避免 SELECT *</text>
<text x="110" y="320" font-size="10" fill="#555">✓ 使用分页查询</text>
<text x="110" y="340" font-size="10" fill="#555">✓ 精确 WHERE 条件</text>
<text x="110" y="360" font-size="10" fill="#555">✓ 减少返回字段</text>
<text x="110" y="380" font-size="10" fill="#555">✓ 避免子查询嵌套</text>
<text x="190" y="395" font-size="9" font-style="italic" fill="#16A085">提升: 30-50%</text>
<rect x="310" y="260" width="180" height="140" fill="white" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="400" y="280" font-size="11" font-weight="bold" text-anchor="middle" fill="#2c3e50">索引使用</text>
<text x="320" y="300" font-size="10" fill="#555">✓ WHERE字段建索引</text>
<text x="320" y="320" font-size="10" fill="#555">✓ 避免索引失效</text>
<text x="320" y="340" font-size="10" fill="#555">✓ 使用覆盖索引</text>
<text x="320" y="360" font-size="10" fill="#555">✓ 联合索引顺序</text>
<text x="320" y="380" font-size="10" fill="#555">✓ 避免函数计算</text>
<text x="400" y="395" font-size="9" font-style="italic" fill="#16A085">提升: 50-90%</text>
<rect x="520" y="260" width="180" height="140" fill="white" stroke="#27AE60" stroke-width="2" rx="5"/>
<text x="610" y="280" font-size="11" font-weight="bold" text-anchor="middle" fill="#2c3e50">JOIN优化</text>
<text x="530" y="300" font-size="10" fill="#555">✓ 小表驱动大表</text>
<text x="530" y="320" font-size="10" fill="#555">✓ 减少JOIN层级</text>
<text x="530" y="340" font-size="10" fill="#555">✓ EXISTS替代IN</text>
<text x="530" y="360" font-size="10" fill="#555">✓ JOIN字段加索引</text>
<text x="530" y="380" font-size="10" fill="#555">✓ 避免笛卡尔积</text>
<text x="610" y="395" font-size="9" font-style="italic" fill="#16A085">提升: 40-70%</text>
<text x="60" y="430" font-size="14" font-weight="bold" fill="#2c3e50">常见索引失效场景</text>
<rect x="50" y="440" width="700" height="190" fill="white" stroke="#E74C3C" stroke-width="2" rx="5"/>
<rect x="60" y="450" width="330" height="30" fill="#FADBD8" rx="3"/>
<text x="70" y="470" font-size="11" font-weight="bold" fill="#2c3e50">失效场景</text>
<rect x="400" y="450" width="340" height="30" fill="#D5F4E6" rx="3"/>
<text x="410" y="470" font-size="11" font-weight="bold" fill="#2c3e50">优化方案</text>
<line x1="60" y1="480" x2="740" y2="480" stroke="#dee2e6" stroke-width="1"/>
<text x="70" y="500" font-size="10" fill="#E74C3C">1. 在索引列上使用函数</text>
<text x="410" y="500" font-size="10" fill="#27AE60">→ 避免函数,改用范围查询</text>
<line x1="60" y1="510" x2="740" y2="510" stroke="#dee2e6" stroke-width="1"/>
<text x="70" y="530" font-size="10" fill="#E74C3C">2. 使用 LIKE '%keyword%'</text>
<text x="410" y="530" font-size="10" fill="#27AE60">→ 改用 'keyword%' 或全文索引</text>
<line x1="60" y1="540" x2="740" y2="540" stroke="#dee2e6" stroke-width="1"/>
<text x="70" y="560" font-size="10" fill="#E74C3C">3. 使用 OR 连接条件</text>
<text x="410" y="560" font-size="10" fill="#27AE60">→ 改用 IN 或 UNION</text>
<line x1="60" y1="570" x2="740" y2="570" stroke="#dee2e6" stroke-width="1"/>
<text x="70" y="590" font-size="10" fill="#E74C3C">4. 索引列进行计算 id + 1 = 10</text>
<text x="410" y="590" font-size="10" fill="#27AE60">→ 改为 id = 9</text>
<line x1="60" y1="600" x2="740" y2="600" stroke="#dee2e6" stroke-width="1"/>
<text x="70" y="620" font-size="10" fill="#E74C3C">5. 联合索引不满足最左前缀</text>
<text x="410" y="620" font-size="10" fill="#27AE60">→ 查询条件包含最左列</text>
</svg>

**关键要点**

1. **优先优化索引**: 索引是 SQL 优化的核心,效果最显著
2. **减少数据扫描范围**: 避免 SELECT *,使用分页和精确条件
3. **避免索引失效**: 不在索引列上使用函数、避免前导模糊查询
4. **优化 JOIN 查询**: 小表驱动大表,减少 JOIN 层级
5. **使用 EXPLAIN 分析**: 定位性能瓶颈,验证优化效果

**记忆口诀**

SQL优化五要点,范围索引JOIN缓存批量;
避免星号用分页,索引失效要警惕;
小表驱动大表好,EXPLAIN分析找瓶颈。
