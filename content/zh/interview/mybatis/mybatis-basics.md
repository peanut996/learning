## 基础概念
### 1. 什么是 MyBatis？MyBatis 的特点是什么？

**1. 核心定义**

MyBatis 是一款优秀的持久层框架,它支持自定义 SQL、存储过程以及高级映射。MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作,可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO 为数据库中的记录。

**2. 主要特点**

**1) 简单易学**
- 本身很小且简单,没有任何第三方依赖
- 最简单安装只需两个 jar 文件和配置几个 SQL 映射文件
- 易于学习和使用,上手快

**2) 灵活性强**
- 不会对应用程序的现有设计强加任何影响
- SQL 写在 XML 或注解中,便于统一管理和优化
- 可以根据业务需求自由定制 SQL,支持动态 SQL

**3) 解除 SQL 与程序代码的耦合**
- 通过配置文件或注解将 SQL 和 Java 对象映射成数据库记录
- 提供 XML 标签,支持编写动态 SQL
- SQL 与业务逻辑分离,便于维护

**4) 提供映射标签**
- 支持对象与数据库的 ORM 字段关系映射
- 支持对象关系映射标签,支持对象关系组建维护
- 提供 XML 标签,支持编写动态 SQL

**5) 提供映射标签,支持对象关系组建维护**
- 支持一对一、一对多、多对多关联查询
- 支持嵌套查询和嵌套结果映射
- 提供延迟加载功能

**6) 与 Spring 完美整合**
- 可以与 Spring 框架无缝集成
- 支持 Spring Boot 的自动配置
- 事务管理交由 Spring 容器管理

**3. 工作原理示意图**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563"/>
    </marker>
  </defs>
  <rect x="50" y="50" width="150" height="80" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" rx="5"/>
  <text x="125" y="95" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">应用程序</text>
  <rect x="325" y="50" width="150" height="80" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="400" y="85" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">MyBatis</text>
  <text x="400" y="105" text-anchor="middle" font-family="Arial" font-size="14">SqlSession</text>
  <rect x="600" y="50" width="150" height="80" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="675" y="95" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">数据库</text>
  <rect x="325" y="200" width="150" height="60" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="400" y="235" text-anchor="middle" font-family="Arial" font-size="14">Mapper 接口</text>
  <rect x="325" y="320" width="150" height="60" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="400" y="355" text-anchor="middle" font-family="Arial" font-size="14">Mapper.xml</text>
  <line x1="200" y1="90" x2="325" y2="90" stroke="#4B5563" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="262" y="80" text-anchor="middle" font-family="Arial" font-size="12" fill="#DC2626">调用接口</text>
  <line x1="475" y1="90" x2="600" y2="90" stroke="#4B5563" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="537" y="80" text-anchor="middle" font-family="Arial" font-size="12" fill="#DC2626">执行SQL</text>
  <line x1="400" y1="130" x2="400" y2="200" stroke="#4B5563" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="440" y="165" text-anchor="start" font-family="Arial" font-size="12" fill="#059669">查找映射</text>
  <line x1="400" y1="260" x2="400" y2="320" stroke="#4B5563" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="440" y="290" text-anchor="start" font-family="Arial" font-size="12" fill="#059669">读取SQL</text>
  <rect x="50" y="420" width="700" height="60" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <text x="400" y="445" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">核心流程</text>
  <text x="400" y="465" text-anchor="middle" font-family="Arial" font-size="12">应用 → Mapper接口 → Mapper.xml → SQL执行 → 结果映射 → 返回对象</text>
</svg>

**4. 关键要点**

- MyBatis 是一个**半自动化的 ORM 框架**,需要手动编写 SQL
- 支持**自定义 SQL**、**存储过程**和**高级映射**
- 通过**XML 配置**或**注解**完成 SQL 和对象的映射
- 消除了几乎所有 JDBC 代码,简化了数据库操作
- 灵活性高,适合复杂查询和性能优化场景

**5. 记忆口诀**

**"持久映射配置灵,解耦集成性能优"**
- **持久**: 持久层框架
- **映射**: 对象关系映射
- **配置**: XML/注解配置
- **灵**: 灵活编写 SQL
- **解耦**: SQL 与代码分离
- **集成**: 与 Spring 集成
- **性能优**: 支持缓存和优化

### 2. MyBatis 和 JDBC 的区别是什么？

**1. 核心区别**

MyBatis 是对 JDBC 的封装和增强,消除了大量的 JDBC 样板代码,提供了更简洁、更面向对象的数据库操作方式。

**2. 详细对比**

**1) 代码量**
- **JDBC**: 需要手动编写大量样板代码(加载驱动、获取连接、创建 Statement、处理结果集、关闭资源等)
- **MyBatis**: 只需配置 SQL 映射,框架自动处理底层操作,代码量大幅减少

**2) SQL 管理**
- **JDBC**: SQL 语句硬编码在 Java 代码中,与业务逻辑耦合
- **MyBatis**: SQL 集中在 XML 或注解中管理,与代码分离,便于维护和优化

**3) 参数设置**
- **JDBC**: 需手动调用 `setXxx()` 方法设置每个参数,容易出错
- **MyBatis**: 自动映射参数,支持对象、Map、注解等多种方式传参

**4) 结果处理**
- **JDBC**: 需手动遍历 ResultSet,逐个字段赋值到对象
- **MyBatis**: 自动将结果集映射为 Java 对象,支持复杂映射关系

**5) 资源管理**
- **JDBC**: 需手动关闭 Connection、Statement、ResultSet,易造成资源泄漏
- **MyBatis**: 框架自动管理资源,无需手动关闭

**6) 连接池**
- **JDBC**: 需额外引入第三方连接池(如 Druid、HikariCP)
- **MyBatis**: 内置连接池,也支持集成第三方连接池

**7) 事务管理**
- **JDBC**: 需手动控制事务(commit、rollback)
- **MyBatis**: 支持自动事务管理,也可与 Spring 集成统一管理

**8) 动态 SQL**
- **JDBC**: 需通过字符串拼接构建动态 SQL,代码复杂且易出错
- **MyBatis**: 提供 if、choose、foreach 等标签,轻松构建动态 SQL

**3. 代码对比示意图**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563"/>
    </marker>
  </defs>
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">JDBC vs MyBatis 代码流程对比</text>
  <text x="200" y="70" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#DC2626">JDBC 方式</text>
  <text x="600" y="70" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#2563EB">MyBatis 方式</text>
  <rect x="50" y="90" width="300" height="450" fill="#FEE2E2" stroke="#DC2626" stroke-width="2" rx="5"/>
  <text x="70" y="115" font-family="monospace" font-size="11" fill="#1F2937">1. 加载驱动</text>
  <text x="70" y="135" font-family="monospace" font-size="11" fill="#1F2937">Class.forName("com.mysql...")</text>
  <text x="70" y="165" font-family="monospace" font-size="11" fill="#1F2937">2. 获取连接</text>
  <text x="70" y="185" font-family="monospace" font-size="11" fill="#1F2937">Connection conn = ...</text>
  <text x="70" y="215" font-family="monospace" font-size="11" fill="#1F2937">3. 创建 Statement</text>
  <text x="70" y="235" font-family="monospace" font-size="11" fill="#1F2937">PreparedStatement ps = ...</text>
  <text x="70" y="265" font-family="monospace" font-size="11" fill="#1F2937">4. 设置参数</text>
  <text x="70" y="285" font-family="monospace" font-size="11" fill="#1F2937">ps.setInt(1, id)</text>
  <text x="70" y="305" font-family="monospace" font-size="11" fill="#1F2937">ps.setString(2, name)</text>
  <text x="70" y="335" font-family="monospace" font-size="11" fill="#1F2937">5. 执行查询</text>
  <text x="70" y="355" font-family="monospace" font-size="11" fill="#1F2937">ResultSet rs = ps.execute()</text>
  <text x="70" y="385" font-family="monospace" font-size="11" fill="#1F2937">6. 处理结果集</text>
  <text x="70" y="405" font-family="monospace" font-size="11" fill="#1F2937">while(rs.next()) {</text>
  <text x="70" y="425" font-family="monospace" font-size="11" fill="#1F2937">  obj.setId(rs.getInt(...))</text>
  <text x="70" y="445" font-family="monospace" font-size="11" fill="#1F2937">}</text>
  <text x="70" y="475" font-family="monospace" font-size="11" fill="#1F2937">7. 关闭资源</text>
  <text x="70" y="495" font-family="monospace" font-size="11" fill="#1F2937">rs.close() / ps.close()</text>
  <text x="70" y="515" font-family="monospace" font-size="11" fill="#1F2937">conn.close()</text>
  <rect x="450" y="90" width="300" height="450" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="470" y="115" font-family="monospace" font-size="11" fill="#1F2937">1. 配置文件</text>
  <text x="470" y="135" font-family="monospace" font-size="11" fill="#1F2937">mybatis-config.xml</text>
  <text x="470" y="165" font-family="monospace" font-size="11" fill="#1F2937">2. SQL 映射</text>
  <text x="470" y="185" font-family="monospace" font-size="11" fill="#1F2937">Mapper.xml 配置 SQL</text>
  <text x="470" y="215" font-family="monospace" font-size="11" fill="#1F2937">3. 获取 SqlSession</text>
  <text x="470" y="235" font-family="monospace" font-size="11" fill="#1F2937">SqlSession session = ...</text>
  <text x="470" y="275" font-family="monospace" font-size="11" fill="#1F2937">4. 调用接口方法</text>
  <text x="470" y="295" font-family="monospace" font-size="11" fill="#1F2937">mapper.selectById(id)</text>
  <text x="470" y="345" font-family="monospace" font-size="11" fill="#1F2937">5. 自动处理</text>
  <text x="470" y="365" font-family="monospace" font-size="11" fill="#1F2937">框架自动映射结果</text>
  <text x="470" y="415" font-family="monospace" font-size="11" fill="#1F2937">6. 返回对象</text>
  <text x="470" y="435" font-family="monospace" font-size="11" fill="#1F2937">User user = ...</text>
  <text x="470" y="495" font-family="monospace" font-size="11" fill="#1F2937">7. 自动关闭资源</text>
  <rect x="50" y="560" width="700" height="30" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1" rx="3"/>
  <text x="400" y="580" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">代码量对比: JDBC ~50 行  vs  MyBatis ~5 行</text>
</svg>

**4. 关系示意图**

<svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563"/>
    </marker>
  </defs>
  <rect x="50" y="50" width="150" height="60" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="125" y="85" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">MyBatis</text>
  <rect x="225" y="150" width="150" height="60" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="300" y="185" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">JDBC</text>
  <rect x="400" y="50" width="150" height="60" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" rx="5"/>
  <text x="475" y="85" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">数据库</text>
  <line x1="200" y1="90" x2="225" y2="165" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow2)"/>
  <text x="190" y="130" font-family="Arial" font-size="12" fill="#059669">封装</text>
  <line x1="375" y1="180" x2="400" y2="90" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow2)"/>
  <text x="395" y="140" font-family="Arial" font-size="12" fill="#DC2626">直接访问</text>
  <text x="300" y="240" text-anchor="middle" font-family="Arial" font-size="14" font-style="italic">MyBatis 是 JDBC 的高级封装</text>
</svg>

**5. 关键要点**

- MyBatis 是**对 JDBC 的封装**,底层仍使用 JDBC 操作数据库
- **代码量**: MyBatis 比 JDBC 减少 80% 以上的样板代码
- **维护性**: SQL 与代码分离,便于统一管理和优化
- **易用性**: 自动映射参数和结果,减少手工操作
- **安全性**: 预编译 SQL,有效防止 SQL 注入
- **生产力**: 开发效率大幅提升,专注业务逻辑

**6. 记忆口诀**

**"代码少,管理好,映射自动资源保"**
- **代码少**: 消除 JDBC 样板代码
- **管理好**: SQL 集中管理
- **映射自动**: 参数和结果自动映射
- **资源保**: 自动管理资源,防止泄漏

### 3. MyBatis 和 Hibernate 的区别是什么？

**1. 核心区别**

MyBatis 是**半自动化的 ORM 框架**,需要手动编写 SQL;Hibernate 是**全自动化的 ORM 框架**,自动生成 SQL。两者适用于不同的应用场景。

**2. 详细对比**

**1) SQL 控制**
- **MyBatis**: 需要手动编写 SQL,灵活性高,可精确优化
- **Hibernate**: 自动生成 SQL,开发效率高,但优化困难

**2) 学习曲线**
- **MyBatis**: 简单易学,上手快,只需熟悉 SQL 和基本配置
- **Hibernate**: 学习曲线陡峭,需要掌握 HQL、对象状态、缓存机制等

**3) 开发效率**
- **MyBatis**: 简单 CRUD 需要手写 SQL,开发效率相对较低
- **Hibernate**: 简单 CRUD 无需写 SQL,开发效率高

**4) 性能优化**
- **MyBatis**: 可直接优化 SQL,性能调优灵活
- **Hibernate**: SQL 由框架生成,优化难度大,可能产生冗余查询

**5) 移植性**
- **MyBatis**: SQL 依赖具体数据库,移植性差
- **Hibernate**: 支持多种数据库方言,移植性好

**6) 对象关系映射**
- **MyBatis**: 半对象关系映射,需要手动处理复杂关联
- **Hibernate**: 完全对象关系映射,自动维护对象关系

**7) 缓存机制**
- **MyBatis**: 简单的一级、二级缓存
- **Hibernate**: 强大的多级缓存,支持查询缓存

**8) 适用场景**
- **MyBatis**: 适合需求变化频繁、SQL 优化要求高的项目
- **Hibernate**: 适合业务逻辑复杂、对象关系复杂的企业应用

**3. 对比示意图**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">MyBatis vs Hibernate 对比</text>
  <rect x="50" y="60" width="300" height="450" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="200" y="90" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#2563EB">MyBatis (半自动)</text>
  <text x="70" y="120" font-family="Arial" font-size="13" font-weight="bold">优点:</text>
  <text x="70" y="145" font-family="Arial" font-size="12">✓ SQL 可控,易于优化</text>
  <text x="70" y="165" font-family="Arial" font-size="12">✓ 学习成本低</text>
  <text x="70" y="185" font-family="Arial" font-size="12">✓ 灵活性高</text>
  <text x="70" y="205" font-family="Arial" font-size="12">✓ 轻量级,性能好</text>
  <text x="70" y="225" font-family="Arial" font-size="12">✓ SQL 与代码分离</text>
  <text x="70" y="260" font-family="Arial" font-size="13" font-weight="bold">缺点:</text>
  <text x="70" y="285" font-family="Arial" font-size="12">✗ 需要手写 SQL</text>
  <text x="70" y="305" font-family="Arial" font-size="12">✗ 开发工作量大</text>
  <text x="70" y="325" font-family="Arial" font-size="12">✗ 数据库移植性差</text>
  <text x="70" y="345" font-family="Arial" font-size="12">✗ 对象关系映射弱</text>
  <text x="70" y="380" font-family="Arial" font-size="13" font-weight="bold">适用场景:</text>
  <text x="70" y="405" font-family="Arial" font-size="12">• 需求变化频繁</text>
  <text x="70" y="425" font-family="Arial" font-size="12">• 性能要求高</text>
  <text x="70" y="445" font-family="Arial" font-size="12">• 复杂查询多</text>
  <text x="70" y="465" font-family="Arial" font-size="12">• 互联网应用</text>
  <rect x="450" y="60" width="300" height="450" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="600" y="90" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#F59E0B">Hibernate (全自动)</text>
  <text x="470" y="120" font-family="Arial" font-size="13" font-weight="bold">优点:</text>
  <text x="470" y="145" font-family="Arial" font-size="12">✓ 自动生成 SQL</text>
  <text x="470" y="165" font-family="Arial" font-size="12">✓ 开发效率高</text>
  <text x="470" y="185" font-family="Arial" font-size="12">✓ 数据库无关性</text>
  <text x="470" y="205" font-family="Arial" font-size="12">✓ 对象关系映射强</text>
  <text x="470" y="225" font-family="Arial" font-size="12">✓ 缓存机制完善</text>
  <text x="470" y="260" font-family="Arial" font-size="13" font-weight="bold">缺点:</text>
  <text x="470" y="285" font-family="Arial" font-size="12">✗ 学习曲线陡峭</text>
  <text x="470" y="305" font-family="Arial" font-size="12">✗ SQL 优化困难</text>
  <text x="470" y="325" font-family="Arial" font-size="12">✗ 复杂查询难实现</text>
  <text x="470" y="345" font-family="Arial" font-size="12">✗ 性能调优复杂</text>
  <text x="470" y="380" font-family="Arial" font-size="13" font-weight="bold">适用场景:</text>
  <text x="470" y="405" font-family="Arial" font-size="12">• 业务逻辑复杂</text>
  <text x="470" y="425" font-family="Arial" font-size="12">• 对象关系复杂</text>
  <text x="470" y="445" font-family="Arial" font-size="12">• 需要跨数据库</text>
  <text x="470" y="465" font-family="Arial" font-size="12">• 企业级应用</text>
  <line x1="350" y1="280" x2="450" y2="280" stroke="#9CA3AF" stroke-width="2"/>
  <text x="400" y="275" text-anchor="middle" font-family="Arial" font-size="12" fill="#6B7280">对比</text>
  <rect x="50" y="520" width="700" height="20" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1" rx="3"/>
  <text x="400" y="535" text-anchor="middle" font-family="Arial" font-size="11">核心区别: MyBatis 手动 SQL + 灵活  vs  Hibernate 自动 SQL + 规范</text>
</svg>

**4. 工作流程对比**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563"/>
    </marker>
  </defs>
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">工作流程对比</text>
  <text x="200" y="65" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#2563EB">MyBatis 流程</text>
  <rect x="50" y="80" width="120" height="50" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="110" y="110" text-anchor="middle" font-family="Arial" font-size="12">手写 SQL</text>
  <rect x="50" y="160" width="120" height="50" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="110" y="190" text-anchor="middle" font-family="Arial" font-size="12">配置映射</text>
  <rect x="50" y="240" width="120" height="50" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="110" y="270" text-anchor="middle" font-family="Arial" font-size="12">执行 SQL</text>
  <line x1="110" y1="130" x2="110" y2="160" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow3)"/>
  <line x1="110" y1="210" x2="110" y2="240" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow3)"/>
  <text x="600" y="65" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#F59E0B">Hibernate 流程</text>
  <rect x="530" y="80" width="140" height="50" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="600" y="110" text-anchor="middle" font-family="Arial" font-size="12">定义实体映射</text>
  <rect x="530" y="160" width="140" height="50" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="600" y="190" text-anchor="middle" font-family="Arial" font-size="12">框架生成 SQL</text>
  <rect x="530" y="240" width="140" height="50" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="600" y="270" text-anchor="middle" font-family="Arial" font-size="12">执行 SQL</text>
  <line x1="600" y1="130" x2="600" y2="160" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow3)"/>
  <line x1="600" y1="210" x2="600" y2="240" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow3)"/>
  <rect x="250" y="150" width="280" height="80" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2" rx="5" stroke-dasharray="5,5"/>
  <text x="390" y="180" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">关键差异</text>
  <text x="390" y="200" text-anchor="middle" font-family="Arial" font-size="11">MyBatis: 开发者控制 SQL</text>
  <text x="390" y="218" text-anchor="middle" font-family="Arial" font-size="11">Hibernate: 框架自动生成</text>
  <rect x="50" y="310" width="700" height="30" fill="#FEE2E2" stroke="#DC2626" stroke-width="1" rx="3"/>
  <text x="400" y="330" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">选择建议: 互联网项目首选 MyBatis,传统企业应用可选 Hibernate</text>
</svg>

**5. 关键要点**

- **自动化程度**: MyBatis 半自动,Hibernate 全自动
- **SQL 控制**: MyBatis 手写 SQL 灵活可控,Hibernate 自动生成难优化
- **学习成本**: MyBatis 简单易学,Hibernate 复杂难掌握
- **性能优化**: MyBatis 易于优化,Hibernate 优化困难
- **应用场景**: MyBatis 适合互联网应用,Hibernate 适合企业应用
- **市场趋势**: 国内互联网公司主流选择 MyBatis

**6. 记忆口诀**

**"半自动灵活快,全自动规范慢"**
- **半自动**: MyBatis 半自动化
- **灵活**: SQL 可控,灵活优化
- **快**: 性能好,上手快
- **全自动**: Hibernate 全自动化
- **规范**: 严格的 ORM 规范
- **慢**: 学习慢,优化慢

### 4. MyBatis 的优缺点是什么？

**1. 核心总结**

MyBatis 是一个轻量级、灵活的持久层框架,在 SQL 控制、性能优化方面优势明显,但在开发效率、数据库移植性方面存在不足。

**2. 主要优点**

**1) SQL 灵活可控**
- 可以自由编写优化的 SQL 语句
- 支持复杂查询、联表查询、存储过程
- 便于 SQL 审核和性能调优

**2) 学习成本低**
- 框架简单,只需掌握 SQL 和基本配置
- 上手快,容易理解和使用
- 不需要学习复杂的 ORM 概念

**3) 性能优异**
- 直接控制 SQL,可精确优化
- 支持延迟加载,减少数据库访问
- 提供一级、二级缓存机制
- 避免了 ORM 框架的性能开销

**4) SQL 与代码分离**
- SQL 集中在 XML 文件中管理
- 便于统一维护和版本控制
- DBA 可以直接查看和优化 SQL

**5) 支持动态 SQL**
- 提供 if、choose、foreach 等标签
- 可根据条件动态构建 SQL
- 避免字符串拼接的繁琐和风险

**6) 轻量级框架**
- 体积小,依赖少
- 与 Spring 整合简单
- 不会对现有架构产生影响

**7) 支持多种映射方式**
- 支持 XML 配置和注解
- 支持自动映射和自定义映射
- 灵活处理复杂对象关系

**3. 主要缺点**

**1) 工作量大**
- 需要手写大量 SQL 语句
- 简单 CRUD 也需要配置
- 增加了开发工作量

**2) 数据库移植性差**
- SQL 依赖具体数据库方言
- 切换数据库需要修改 SQL
- 不如 Hibernate 的数据库无关性

**3) 对象关系映射弱**
- 复杂关联关系需要手动处理
- 级联操作不如 Hibernate 完善
- 对象状态管理较弱

**4) 二级缓存较弱**
- 缓存机制相对简单
- 分布式缓存需要第三方集成
- 不如 Hibernate 的缓存完善

**5) 字段映射繁琐**
- 字段名与属性名不一致时需要手动映射
- 大表映射配置工作量大
- 没有自动建表功能

**4. 优缺点对比图**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">MyBatis 优缺点对比</text>
  <rect x="50" y="60" width="320" height="450" fill="#D1FAE5" stroke="#10B981" stroke-width="2" rx="5"/>
  <text x="210" y="90" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#065F46">优点 ✓</text>
  <circle cx="80" cy="125" r="5" fill="#10B981"/>
  <text x="95" y="130" font-family="Arial" font-size="13">SQL 灵活可控,易于优化</text>
  <circle cx="80" cy="160" r="5" fill="#10B981"/>
  <text x="95" y="165" font-family="Arial" font-size="13">学习成本低,上手快</text>
  <circle cx="80" cy="195" r="5" fill="#10B981"/>
  <text x="95" y="200" font-family="Arial" font-size="13">性能优异,支持缓存</text>
  <circle cx="80" cy="230" r="5" fill="#10B981"/>
  <text x="95" y="235" font-family="Arial" font-size="13">SQL 与代码分离,便于维护</text>
  <circle cx="80" cy="265" r="5" fill="#10B981"/>
  <text x="95" y="270" font-family="Arial" font-size="13">支持动态 SQL,灵活构建</text>
  <circle cx="80" cy="300" r="5" fill="#10B981"/>
  <text x="95" y="305" font-family="Arial" font-size="13">轻量级,与 Spring 整合好</text>
  <circle cx="80" cy="335" r="5" fill="#10B981"/>
  <text x="95" y="340" font-family="Arial" font-size="13">支持多种映射方式</text>
  <rect x="70" y="370" width="280" height="120" fill="#ECFDF5" stroke="#10B981" stroke-width="1" rx="3"/>
  <text x="210" y="390" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">适用场景</text>
  <text x="90" y="410" font-family="Arial" font-size="11">• 互联网应用,需求变化快</text>
  <text x="90" y="430" font-family="Arial" font-size="11">• 性能要求高的系统</text>
  <text x="90" y="450" font-family="Arial" font-size="11">• 复杂查询和报表场景</text>
  <text x="90" y="470" font-family="Arial" font-size="11">• 团队熟悉 SQL</text>
  <rect x="430" y="60" width="320" height="450" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="590" y="90" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#991B1B">缺点 ✗</text>
  <circle cx="460" cy="125" r="5" fill="#EF4444"/>
  <text x="475" y="130" font-family="Arial" font-size="13">需要手写大量 SQL</text>
  <circle cx="460" cy="160" r="5" fill="#EF4444"/>
  <text x="475" y="165" font-family="Arial" font-size="13">开发工作量较大</text>
  <circle cx="460" cy="195" r="5" fill="#EF4444"/>
  <text x="475" y="200" font-family="Arial" font-size="13">数据库移植性差</text>
  <circle cx="460" cy="230" r="5" fill="#EF4444"/>
  <text x="475" y="235" font-family="Arial" font-size="13">对象关系映射较弱</text>
  <circle cx="460" cy="265" r="5" fill="#EF4444"/>
  <text x="475" y="270" font-family="Arial" font-size="13">二级缓存机制简单</text>
  <circle cx="460" cy="300" r="5" fill="#EF4444"/>
  <text x="475" y="305" font-family="Arial" font-size="13">字段映射配置繁琐</text>
  <circle cx="460" cy="335" r="5" fill="#EF4444"/>
  <text x="475" y="340" font-family="Arial" font-size="13">没有自动建表功能</text>
  <rect x="450" y="370" width="280" height="120" fill="#FEF2F2" stroke="#EF4444" stroke-width="1" rx="3"/>
  <text x="590" y="390" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">不适用场景</text>
  <text x="470" y="410" font-family="Arial" font-size="11">• 需要频繁切换数据库</text>
  <text x="470" y="430" font-family="Arial" font-size="11">• 简单 CRUD 为主的应用</text>
  <text x="470" y="450" font-family="Arial" font-size="11">• 对象关系极其复杂</text>
  <text x="470" y="470" font-family="Arial" font-size="11">• 团队不熟悉 SQL</text>
  <rect x="50" y="520" width="700" height="20" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="3"/>
  <text x="400" y="535" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">总结: 优点主要在灵活性和性能,缺点主要在开发效率和移植性</text>
</svg>

**5. 权衡示意图**

<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <text x="300" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">MyBatis 权衡取舍</text>
  <line x1="100" y1="150" x2="500" y2="150" stroke="#9CA3AF" stroke-width="3"/>
  <circle cx="300" cy="150" r="8" fill="#F59E0B"/>
  <text x="300" y="140" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">平衡点</text>
  <rect x="80" y="70" width="160" height="60" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="160" y="95" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">高性能</text>
  <text x="160" y="115" text-anchor="middle" font-family="Arial" font-size="12">高灵活性</text>
  <rect x="360" y="70" width="160" height="60" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="440" y="95" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">低效率</text>
  <text x="440" y="115" text-anchor="middle" font-family="Arial" font-size="12">低自动化</text>
  <line x1="160" y1="130" x2="290" y2="148" stroke="#2563EB" stroke-width="2"/>
  <line x1="440" y1="130" x2="310" y2="148" stroke="#EF4444" stroke-width="2"/>
  <text x="300" y="190" text-anchor="middle" font-family="Arial" font-size="13">牺牲部分开发效率</text>
  <text x="300" y="210" text-anchor="middle" font-family="Arial" font-size="13">换取性能和灵活性</text>
  <rect x="100" y="240" width="400" height="40" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1" rx="3"/>
  <text x="300" y="265" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">选择建议: 性能 > 开发效率时选 MyBatis</text>
</svg>

**6. 关键要点**

- **最大优势**: SQL 可控、性能优异、学习简单
- **最大劣势**: 开发工作量大、数据库移植性差
- **权衡取舍**: 牺牲开发效率换取性能和灵活性
- **适用场景**: 互联网应用、复杂查询、性能敏感系统
- **市场地位**: 国内主流持久层框架,特别是互联网公司
- **发展趋势**: MyBatis-Plus 等增强工具弥补了部分缺点

**7. 记忆口诀**

**"灵活性能学习快,工作移植映射差"**
- **灵活**: SQL 灵活可控
- **性能**: 性能优异
- **学习快**: 学习成本低
- **工作**: 开发工作量大
- **移植**: 数据库移植性差
- **映射差**: 对象关系映射弱

### 5. MyBatis 的核心组件有哪些？

**1. 核心组件概览**

MyBatis 的核心组件包括配置层、接口层、执行层和基础支撑层,各组件协同工作完成 SQL 映射和执行。

**2. 核心组件详解**

**1) SqlSessionFactory (会话工厂)**
- **作用**: 创建 SqlSession 实例的工厂
- **生命周期**: 应用级别,整个应用运行期间存在
- **创建方式**: 通过 SqlSessionFactoryBuilder 读取配置文件创建
- **特点**: 线程安全,全局单例

**2) SqlSession (会话)**
- **作用**: 执行 SQL 命令的主要接口
- **功能**: 提供 select、insert、update、delete 等方法
- **生命周期**: 请求级别或方法级别
- **特点**: 线程不安全,用完必须关闭

**3) Mapper (映射器)**
- **作用**: 定义 SQL 映射的接口
- **组成**: Mapper 接口 + Mapper.xml 配置文件
- **功能**: 将接口方法映射到 SQL 语句
- **特点**: 通过动态代理实现

**4) Executor (执行器)**
- **作用**: 真正执行 SQL 的执行引擎
- **类型**:
  - SimpleExecutor: 简单执行器,每次执行都创建新的 Statement
  - ReuseExecutor: 重用执行器,重用预编译的 Statement
  - BatchExecutor: 批量执行器,批量执行 update 操作
- **特点**: 一级缓存在 Executor 中实现

**5) StatementHandler (语句处理器)**
- **作用**: 处理 JDBC Statement 的创建和执行
- **功能**:
  - 创建 Statement 对象
  - 设置参数
  - 执行 SQL
  - 封装结果集
- **类型**: SimpleStatementHandler、PreparedStatementHandler、CallableStatementHandler

**6) ParameterHandler (参数处理器)**
- **作用**: 设置 SQL 参数
- **功能**: 将 Java 对象参数转换为 JDBC 类型
- **特点**: 支持类型转换和参数映射

**7) ResultSetHandler (结果集处理器)**
- **作用**: 处理 SQL 执行结果
- **功能**: 将 JDBC ResultSet 转换为 Java 对象
- **特点**: 支持复杂映射和嵌套查询

**8) TypeHandler (类型处理器)**
- **作用**: Java 类型与 JDBC 类型的转换
- **功能**:
  - setParameter: Java → JDBC
  - getResult: JDBC → Java
- **特点**: 可自定义类型处理器

**9) Configuration (配置对象)**
- **作用**: 存储所有配置信息
- **内容**:
  - 全局配置
  - 映射文件信息
  - 缓存配置
  - 类型别名等
- **特点**: 贯穿整个生命周期

**3. 组件架构图**

<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563"/>
    </marker>
  </defs>
  <text x="450" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">MyBatis 核心组件架构</text>
  <rect x="50" y="60" width="800" height="120" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" rx="5"/>
  <text x="450" y="85" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">配置层 (Configuration Layer)</text>
  <rect x="80" y="100" width="200" height="60" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="180" y="125" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">Configuration</text>
  <text x="180" y="145" text-anchor="middle" font-family="Arial" font-size="11">全局配置信息</text>
  <rect x="320" y="100" width="200" height="60" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="420" y="125" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">mybatis-config.xml</text>
  <text x="420" y="145" text-anchor="middle" font-family="Arial" font-size="11">核心配置文件</text>
  <rect x="560" y="100" width="200" height="60" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="660" y="125" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">Mapper.xml</text>
  <text x="660" y="145" text-anchor="middle" font-family="Arial" font-size="11">SQL 映射文件</text>
  <rect x="50" y="210" width="800" height="140" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="450" y="235" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">接口层 (API Layer)</text>
  <rect x="150" y="255" width="220" height="70" fill="#FEF9C3" stroke="#EAB308" stroke-width="2" rx="5"/>
  <text x="260" y="280" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">SqlSessionFactory</text>
  <text x="260" y="300" text-anchor="middle" font-family="Arial" font-size="11">创建 SqlSession</text>
  <rect x="430" y="255" width="220" height="70" fill="#FEF9C3" stroke="#EAB308" stroke-width="2" rx="5"/>
  <text x="540" y="280" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">SqlSession</text>
  <text x="540" y="300" text-anchor="middle" font-family="Arial" font-size="11">执行 SQL 命令</text>
  <text x="540" y="315" text-anchor="middle" font-family="Arial" font-size="11">获取 Mapper</text>
  <line x1="370" y1="290" x2="430" y2="290" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow4)"/>
  <text x="400" y="280" text-anchor="middle" font-family="Arial" font-size="10" fill="#DC2626">创建</text>
  <rect x="50" y="380" width="800" height="180" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="450" y="405" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">执行层 (Execution Layer)</text>
  <rect x="80" y="425" width="150" height="50" fill="#C7D2FE" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="155" y="455" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">Executor</text>
  <rect x="270" y="425" width="150" height="50" fill="#C7D2FE" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="345" y="440" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">StatementHandler</text>
  <text x="345" y="460" text-anchor="middle" font-family="Arial" font-size="10">语句处理</text>
  <rect x="80" y="495" width="150" height="50" fill="#C7D2FE" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="155" y="510" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">ParameterHandler</text>
  <text x="155" y="530" text-anchor="middle" font-family="Arial" font-size="10">参数处理</text>
  <rect x="270" y="495" width="150" height="50" fill="#C7D2FE" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="345" y="510" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">ResultSetHandler</text>
  <text x="345" y="530" text-anchor="middle" font-family="Arial" font-size="10">结果集处理</text>
  <rect x="480" y="425" width="340" height="120" fill="#C7D2FE" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="650" y="445" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">Mapper (映射器)</text>
  <text x="500" y="470" font-family="Arial" font-size="11">• Mapper 接口</text>
  <text x="500" y="490" font-family="Arial" font-size="11">• SQL 映射配置</text>
  <text x="500" y="510" font-family="Arial" font-size="11">• 动态代理实现</text>
  <text x="500" y="530" font-family="Arial" font-size="11">• 方法与 SQL 的映射</text>
  <line x1="540" y1="325" x2="345" y2="425" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow4)"/>
  <text x="440" y="370" text-anchor="middle" font-family="Arial" font-size="10" fill="#DC2626">调用</text>
  <rect x="50" y="590" width="800" height="80" fill="#D1FAE5" stroke="#10B981" stroke-width="2" rx="5"/>
  <text x="450" y="615" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">基础支撑层 (Support Layer)</text>
  <rect x="100" y="635" width="150" height="25" fill="#A7F3D0" stroke="#10B981" stroke-width="1" rx="3"/>
  <text x="175" y="652" text-anchor="middle" font-family="Arial" font-size="11">TypeHandler</text>
  <rect x="280" y="635" width="150" height="25" fill="#A7F3D0" stroke="#10B981" stroke-width="1" rx="3"/>
  <text x="355" y="652" text-anchor="middle" font-family="Arial" font-size="11">缓存机制</text>
  <rect x="460" y="635" width="150" height="25" fill="#A7F3D0" stroke="#10B981" stroke-width="1" rx="3"/>
  <text x="535" y="652" text-anchor="middle" font-family="Arial" font-size="11">插件机制</text>
  <rect x="640" y="635" width="150" height="25" fill="#A7F3D0" stroke="#10B981" stroke-width="1" rx="3"/>
  <text x="715" y="652" text-anchor="middle" font-family="Arial" font-size="11">数据源/连接池</text>
</svg>

**4. 执行流程图**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563"/>
    </marker>
  </defs>
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">MyBatis 执行流程</text>
  <rect x="50" y="60" width="180" height="50" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="140" y="90" text-anchor="middle" font-family="Arial" font-size="13">1. 加载配置</text>
  <rect x="310" y="60" width="180" height="50" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="400" y="80" text-anchor="middle" font-family="Arial" font-size="13">2. 创建</text>
  <text x="400" y="95" text-anchor="middle" font-family="Arial" font-size="13">SqlSessionFactory</text>
  <rect x="570" y="60" width="180" height="50" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="660" y="90" text-anchor="middle" font-family="Arial" font-size="13">3. 获取 SqlSession</text>
  <rect x="310" y="150" width="180" height="50" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="400" y="180" text-anchor="middle" font-family="Arial" font-size="13">4. 获取 Mapper</text>
  <rect x="310" y="240" width="180" height="50" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="400" y="270" text-anchor="middle" font-family="Arial" font-size="13">5. Executor 执行</text>
  <rect x="50" y="330" width="150" height="50" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="125" y="350" text-anchor="middle" font-family="Arial" font-size="12">6. 参数处理</text>
  <text x="125" y="365" text-anchor="middle" font-family="Arial" font-size="11">ParameterHandler</text>
  <rect x="230" y="330" width="150" height="50" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="305" y="350" text-anchor="middle" font-family="Arial" font-size="12">7. 执行 SQL</text>
  <text x="305" y="365" text-anchor="middle" font-family="Arial" font-size="11">StatementHandler</text>
  <rect x="410" y="330" width="150" height="50" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="485" y="350" text-anchor="middle" font-family="Arial" font-size="12">8. 结果映射</text>
  <text x="485" y="365" text-anchor="middle" font-family="Arial" font-size="11">ResultSetHandler</text>
  <rect x="590" y="330" width="150" height="50" fill="#D1FAE5" stroke="#10B981" stroke-width="2" rx="5"/>
  <text x="665" y="360" text-anchor="middle" font-family="Arial" font-size="13">9. 返回结果</text>
  <line x1="230" y1="85" x2="310" y2="85" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow5)"/>
  <line x1="490" y1="85" x2="570" y2="85" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow5)"/>
  <line x1="660" y1="110" x2="660" y2="130" stroke="#4B5563" stroke-width="2"/>
  <line x1="660" y1="130" x2="400" y2="130" stroke="#4B5563" stroke-width="2"/>
  <line x1="400" y1="130" x2="400" y2="150" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow5)"/>
  <line x1="400" y1="200" x2="400" y2="240" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow5)"/>
  <line x1="310" y1="265" x2="125" y2="330" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow5)"/>
  <line x1="200" y1="355" x2="230" y2="355" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow5)"/>
  <line x1="380" y1="355" x2="410" y2="355" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow5)"/>
  <line x1="560" y1="355" x2="590" y2="355" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow5)"/>
  <rect x="50" y="410" width="700" height="30" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1" rx="3"/>
  <text x="400" y="430" text-anchor="middle" font-family="Arial" font-size="12">配置 → Factory → Session → Mapper → Executor → Handler → 结果</text>
</svg>

**5. 关键要点**

- **配置层**: Configuration、配置文件(mybatis-config.xml、Mapper.xml)
- **接口层**: SqlSessionFactory、SqlSession、Mapper
- **执行层**: Executor、StatementHandler、ParameterHandler、ResultSetHandler
- **支撑层**: TypeHandler、缓存、插件、数据源
- **核心流程**: 从配置加载到结果返回的完整链路
- **设计模式**: 工厂模式、代理模式、责任链模式、模板方法模式

**6. 记忆口诀**

**"配接执支四层次,工厂会话映射器"**
- **配**: 配置层(Configuration)
- **接**: 接口层(SqlSessionFactory、SqlSession)
- **执**: 执行层(Executor、各种 Handler)
- **支**: 基础支撑层
- **工厂**: SqlSessionFactory
- **会话**: SqlSession
- **映射器**: Mapper

### 6. 什么是 ORM 框架？

**1. 核心定义**

ORM (Object-Relational Mapping,对象关系映射) 是一种编程技术,用于在关系型数据库和面向对象编程语言之间建立映射关系,实现数据库表与 Java 对象之间的自动转换。

**2. 详细说明**

**1) 基本概念**
- **关系型数据库**: 以表(Table)、行(Row)、列(Column)组织数据
- **面向对象语言**: 以类(Class)、对象(Object)、属性(Property)组织数据
- **映射关系**:
  - 表(Table) ↔ 类(Class)
  - 行(Row) ↔ 对象(Object)
  - 列(Column) ↔ 属性(Property)

**2) 核心作用**
- **消除阻抗不匹配**: 解决对象模型和关系模型的差异
- **简化数据访问**: 不需要编写大量 SQL 和 JDBC 代码
- **提高开发效率**: 专注业务逻辑,减少数据访问层代码
- **统一操作接口**: 提供面向对象的数据库操作方式

**3) ORM 框架分类**

**a) 全自动 ORM (如 Hibernate)**
- 完全隐藏 SQL,自动生成所有 SQL 语句
- 完整的对象关系映射,自动维护对象关系
- 数据库无关性强,易于切换数据库
- 学习曲线陡峭,复杂查询难实现

**b) 半自动 ORM (如 MyBatis)**
- 需要手动编写 SQL
- 提供灵活的结果映射
- SQL 可控,便于优化
- 学习简单,适合复杂查询

**4) 工作原理**
- 配置映射关系(XML 或注解)
- 框架解析映射配置
- 将对象操作转换为 SQL 语句
- 执行 SQL 并自动映射结果
- 返回 Java 对象

**3. ORM 映射关系图**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow6" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563"/>
    </marker>
  </defs>
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">ORM 对象关系映射</text>
  <rect x="50" y="70" width="300" height="350" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="200" y="100" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">对象模型 (Java)</text>
  <rect x="80" y="130" width="240" height="120" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" rx="5"/>
  <text x="200" y="155" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">User 类</text>
  <text x="100" y="180" font-family="monospace" font-size="11">private Long id;</text>
  <text x="100" y="200" font-family="monospace" font-size="11">private String name;</text>
  <text x="100" y="220" font-family="monospace" font-size="11">private Integer age;</text>
  <text x="100" y="240" font-family="monospace" font-size="11">// getters/setters</text>
  <rect x="80" y="270" width="240" height="130" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" rx="5"/>
  <text x="200" y="295" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">User 对象实例</text>
  <text x="100" y="320" font-family="monospace" font-size="11">User user = new User();</text>
  <text x="100" y="340" font-family="monospace" font-size="11">user.setId(1L);</text>
  <text x="100" y="360" font-family="monospace" font-size="11">user.setName("张三");</text>
  <text x="100" y="380" font-family="monospace" font-size="11">user.setAge(25);</text>
  <rect x="450" y="70" width="300" height="350" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="600" y="100" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">关系模型 (Database)</text>
  <rect x="480" y="130" width="240" height="120" fill="#FEF9C3" stroke="#EAB308" stroke-width="2" rx="5"/>
  <text x="600" y="155" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">user 表结构</text>
  <line x1="490" y1="170" x2="710" y2="170" stroke="#9CA3AF" stroke-width="1"/>
  <text x="500" y="190" font-family="monospace" font-size="11">id BIGINT PRIMARY KEY</text>
  <text x="500" y="210" font-family="monospace" font-size="11">name VARCHAR(50)</text>
  <text x="500" y="230" font-family="monospace" font-size="11">age INT</text>
  <rect x="480" y="270" width="240" height="130" fill="#FEF9C3" stroke="#EAB308" stroke-width="2" rx="5"/>
  <text x="600" y="295" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">数据记录</text>
  <rect x="490" y="305" width="220" height="20" fill="#FFFBEB" stroke="#F59E0B" stroke-width="1"/>
  <text x="500" y="320" font-family="monospace" font-size="10">id | name | age</text>
  <rect x="490" y="325" width="220" height="20" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1"/>
  <text x="500" y="340" font-family="monospace" font-size="10">1  | 张三 | 25</text>
  <rect x="490" y="345" width="220" height="20" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1"/>
  <text x="500" y="360" font-family="monospace" font-size="10">2  | 李四 | 30</text>
  <rect x="490" y="365" width="220" height="20" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1"/>
  <text x="500" y="380" font-family="monospace" font-size="10">3  | 王五 | 28</text>
  <line x1="320" y1="190" x2="430" y2="190" stroke="#4B5563" stroke-width="2"/>
  <polygon points="320,190 335,185 335,195" fill="#4B5563"/>
  <polygon points="430,190 415,185 415,195" fill="#4B5563"/>
  <text x="375" y="180" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#DC2626">ORM 映射</text>
  <text x="375" y="210" text-anchor="middle" font-family="Arial" font-size="10">表 ↔ 类</text>
  <line x1="320" y1="330" x2="430" y2="330" stroke="#4B5563" stroke-width="2"/>
  <polygon points="320,330 335,325 335,335" fill="#4B5563"/>
  <polygon points="430,330 415,325 415,335" fill="#4B5563"/>
  <text x="375" y="320" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#059669">自动转换</text>
  <text x="375" y="350" text-anchor="middle" font-family="Arial" font-size="10">行 ↔ 对象</text>
  <rect x="50" y="440" width="700" height="40" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1" rx="3"/>
  <text x="400" y="460" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">核心: 将面向对象操作自动转换为 SQL,将 SQL 结果自动转换为对象</text>
</svg>

**4. ORM 框架对比**

<svg viewBox="0 0 750 400" xmlns="http://www.w3.org/2000/svg">
  <text x="375" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">ORM 框架对比</text>
  <rect x="50" y="60" width="300" height="300" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="200" y="90" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#4338CA">全自动 ORM</text>
  <text x="200" y="115" text-anchor="middle" font-family="Arial" font-size="13" fill="#4338CA">(Hibernate)</text>
  <text x="70" y="145" font-family="Arial" font-size="12" font-weight="bold">特点:</text>
  <text x="70" y="165" font-family="Arial" font-size="11">✓ 自动生成 SQL</text>
  <text x="70" y="185" font-family="Arial" font-size="11">✓ 完整对象映射</text>
  <text x="70" y="205" font-family="Arial" font-size="11">✓ 数据库无关</text>
  <text x="70" y="225" font-family="Arial" font-size="11">✗ 学习成本高</text>
  <text x="70" y="245" font-family="Arial" font-size="11">✗ SQL 优化难</text>
  <text x="70" y="275" font-family="Arial" font-size="12" font-weight="bold">适用:</text>
  <text x="70" y="295" font-family="Arial" font-size="11">企业级应用</text>
  <text x="70" y="315" font-family="Arial" font-size="11">对象关系复杂</text>
  <text x="70" y="335" font-family="Arial" font-size="11">需要跨数据库</text>
  <rect x="400" y="60" width="300" height="300" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="550" y="90" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#1E40AF">半自动 ORM</text>
  <text x="550" y="115" text-anchor="middle" font-family="Arial" font-size="13" fill="#1E40AF">(MyBatis)</text>
  <text x="420" y="145" font-family="Arial" font-size="12" font-weight="bold">特点:</text>
  <text x="420" y="165" font-family="Arial" font-size="11">✓ 手写 SQL</text>
  <text x="420" y="185" font-family="Arial" font-size="11">✓ 灵活映射</text>
  <text x="420" y="205" font-family="Arial" font-size="11">✓ 易于优化</text>
  <text x="420" y="225" font-family="Arial" font-size="11">✗ 开发量大</text>
  <text x="420" y="245" font-family="Arial" font-size="11">✗ 移植性差</text>
  <text x="420" y="275" font-family="Arial" font-size="12" font-weight="bold">适用:</text>
  <text x="420" y="295" font-family="Arial" font-size="11">互联网应用</text>
  <text x="420" y="315" font-family="Arial" font-size="11">复杂查询多</text>
  <text x="420" y="335" font-family="Arial" font-size="11">性能要求高</text>
  <rect x="50" y="370" width="650" height="20" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="3"/>
  <text x="375" y="385" text-anchor="middle" font-family="Arial" font-size="11">选择建议: 根据项目特点选择合适的 ORM 框架</text>
</svg>

**5. 关键要点**

- **定义**: ORM 是对象与关系数据库之间的映射技术
- **核心映射**: 表↔类、行↔对象、列↔属性
- **主要作用**: 消除阻抗不匹配,简化数据访问
- **两大类型**: 全自动(Hibernate)、半自动(MyBatis)
- **优势**: 提高开发效率,减少 JDBC 代码,面向对象操作
- **常见框架**: Hibernate、MyBatis、JPA、Spring Data JPA

**6. 记忆口诀**

**"对象关系相映射,表类行对列属性"**
- **对象关系**: Object-Relational
- **相映射**: Mapping 映射
- **表类**: Table ↔ Class
- **行对**: Row ↔ Object
- **列属性**: Column ↔ Property
