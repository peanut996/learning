# MyBatis 面试题

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

## 配置文件

### 7. MyBatis 有哪些配置文件？

**1. 核心配置文件**

MyBatis 主要有两类配置文件:**全局配置文件**(mybatis-config.xml)和**映射配置文件**(Mapper.xml),还可以使用 **properties 配置文件**和**注解配置**。

**2. 配置文件详解**

**1) mybatis-config.xml (全局配置文件)**
- **作用**: MyBatis 的核心配置文件
- **位置**: 通常放在 resources 根目录
- **内容**:
  - 数据源配置
  - 事务管理器
  - 类型别名
  - 插件配置
  - 全局设置
  - Mapper 扫描路径

**2) Mapper.xml (SQL 映射文件)**
- **作用**: 定义 SQL 语句和结果映射
- **位置**: 通常放在 resources/mapper 目录
- **内容**:
  - namespace (命名空间)
  - SQL 映射语句(select、insert、update、delete)
  - 结果映射(resultMap)
  - 参数映射(parameterType)
  - 动态 SQL

**3) jdbc.properties (数据库配置文件)**
- **作用**: 外部化数据库连接信息
- **位置**: resources 目录
- **内容**:
  - 数据库驱动
  - 连接 URL
  - 用户名和密码
  - 连接池配置

**4) 注解配置 (可选)**
- **作用**: 使用注解代替 XML 配置
- **常用注解**:
  - @Select、@Insert、@Update、@Delete
  - @Results、@Result
  - @Param

**3. 配置文件关系图**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow7" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563"/>
    </marker>
  </defs>
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">MyBatis 配置文件体系</text>
  <rect x="250" y="70" width="300" height="100" fill="#DBEAFE" stroke="#2563EB" stroke-width="3" rx="5"/>
  <text x="400" y="100" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">mybatis-config.xml</text>
  <text x="400" y="125" text-anchor="middle" font-family="Arial" font-size="13">(全局配置文件)</text>
  <text x="400" y="145" text-anchor="middle" font-family="Arial" font-size="11">配置数据源、插件、别名等</text>
  <rect x="50" y="230" width="200" height="80" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="150" y="260" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">jdbc.properties</text>
  <text x="150" y="280" text-anchor="middle" font-family="Arial" font-size="11">数据库配置</text>
  <text x="150" y="295" text-anchor="middle" font-family="Arial" font-size="10">driver, url, username...</text>
  <rect x="300" y="230" width="200" height="80" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="400" y="260" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">UserMapper.xml</text>
  <text x="400" y="280" text-anchor="middle" font-family="Arial" font-size="11">SQL 映射文件</text>
  <text x="400" y="295" text-anchor="middle" font-family="Arial" font-size="10">select, insert, update...</text>
  <rect x="550" y="230" width="200" height="80" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="650" y="260" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">OrderMapper.xml</text>
  <text x="650" y="280" text-anchor="middle" font-family="Arial" font-size="11">SQL 映射文件</text>
  <text x="650" y="295" text-anchor="middle" font-family="Arial" font-size="10">select, insert, update...</text>
  <rect x="300" y="360" width="200" height="80" fill="#D1FAE5" stroke="#10B981" stroke-width="2" rx="5"/>
  <text x="400" y="390" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">Mapper 接口</text>
  <text x="400" y="410" text-anchor="middle" font-family="Arial" font-size="11">@Select / @Insert</text>
  <text x="400" y="425" text-anchor="middle" font-family="Arial" font-size="10">(注解方式)</text>
  <line x1="150" y1="230" x2="350" y2="170" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow7)"/>
  <text x="230" y="195" text-anchor="middle" font-family="Arial" font-size="10" fill="#DC2626">引用</text>
  <line x1="400" y1="230" x2="400" y2="170" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow7)"/>
  <text x="420" y="200" text-anchor="middle" font-family="Arial" font-size="10" fill="#DC2626">引用</text>
  <line x1="650" y1="230" x2="450" y2="170" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow7)"/>
  <text x="570" y="195" text-anchor="middle" font-family="Arial" font-size="10" fill="#DC2626">引用</text>
  <line x1="400" y1="310" x2="400" y2="360" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow7)"/>
  <text x="425" y="340" text-anchor="middle" font-family="Arial" font-size="10" fill="#059669">或</text>
  <rect x="50" y="480" width="700" height="50" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1" rx="3"/>
  <text x="400" y="500" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">配置优先级</text>
  <text x="400" y="520" text-anchor="middle" font-family="Arial" font-size="11">mybatis-config.xml > jdbc.properties  |  XML 配置 > 注解配置</text>
</svg>

**4. mybatis-config.xml 结构示例**

<svg viewBox="0 0 700 600" xmlns="http://www.w3.org/2000/svg">
  <text x="350" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">mybatis-config.xml 配置顺序</text>
  <rect x="100" y="60" width="500" height="510" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <text x="350" y="85" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold">&lt;configuration&gt;</text>
  <rect x="120" y="100" width="460" height="30" fill="#DBEAFE" stroke="#2563EB" stroke-width="1" rx="3"/>
  <text x="140" y="120" font-family="monospace" font-size="11">1. &lt;properties&gt; 属性配置</text>
  <rect x="120" y="140" width="460" height="30" fill="#E0E7FF" stroke="#6366F1" stroke-width="1" rx="3"/>
  <text x="140" y="160" font-family="monospace" font-size="11">2. &lt;settings&gt; 全局设置</text>
  <rect x="120" y="180" width="460" height="30" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="3"/>
  <text x="140" y="200" font-family="monospace" font-size="11">3. &lt;typeAliases&gt; 类型别名</text>
  <rect x="120" y="220" width="460" height="30" fill="#FEE2E2" stroke="#EF4444" stroke-width="1" rx="3"/>
  <text x="140" y="240" font-family="monospace" font-size="11">4. &lt;typeHandlers&gt; 类型处理器</text>
  <rect x="120" y="260" width="460" height="30" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="3"/>
  <text x="140" y="280" font-family="monospace" font-size="11">5. &lt;objectFactory&gt; 对象工厂</text>
  <rect x="120" y="300" width="460" height="30" fill="#F3E8FF" stroke="#A855F7" stroke-width="1" rx="3"/>
  <text x="140" y="320" font-family="monospace" font-size="11">6. &lt;plugins&gt; 插件</text>
  <rect x="120" y="340" width="460" height="30" fill="#DCFCE7" stroke="#22C55E" stroke-width="1" rx="3"/>
  <text x="140" y="360" font-family="monospace" font-size="11">7. &lt;environments&gt; 环境配置</text>
  <rect x="150" y="375" width="400" height="60" fill="#F0FDF4" stroke="#16A34A" stroke-width="1" rx="2"/>
  <text x="170" y="395" font-family="monospace" font-size="10">  &lt;environment&gt;</text>
  <text x="170" y="410" font-family="monospace" font-size="10">    &lt;transactionManager&gt; 事务</text>
  <text x="170" y="425" font-family="monospace" font-size="10">    &lt;dataSource&gt; 数据源</text>
  <rect x="120" y="445" width="460" height="30" fill="#FFF7ED" stroke="#FB923C" stroke-width="1" rx="3"/>
  <text x="140" y="465" font-family="monospace" font-size="11">8. &lt;databaseIdProvider&gt; 数据库厂商</text>
  <rect x="120" y="485" width="460" height="30" fill="#FCE7F3" stroke="#EC4899" stroke-width="1" rx="3"/>
  <text x="140" y="505" font-family="monospace" font-size="11">9. &lt;mappers&gt; 映射器</text>
  <text x="350" y="535" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold">&lt;/configuration&gt;</text>
  <rect x="100" y="555" width="500" height="30" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="3"/>
  <text x="350" y="575" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold">注意: 配置元素必须按此顺序声明</text>
</svg>

**5. 关键要点**

- **主配置文件**: mybatis-config.xml,全局唯一,配置环境和行为
- **映射文件**: Mapper.xml,可以有多个,每个对应一个 Mapper 接口
- **属性文件**: jdbc.properties,外部化配置,便于维护
- **注解方式**: 可以代替 Mapper.xml,适合简单 SQL
- **配置顺序**: mybatis-config.xml 中的元素必须按照规定顺序配置
- **推荐做法**: 复杂 SQL 用 XML,简单 SQL 用注解

**6. 记忆口诀**

**"全局映射属性件,配置顺序要记全"**
- **全局**: mybatis-config.xml 全局配置
- **映射**: Mapper.xml 映射文件
- **属性件**: properties 属性文件
- **配置顺序**: 9 大元素按顺序配置

### 8. mybatis-config.xml 的作用是什么？

**1. 核心作用**

mybatis-config.xml 是 MyBatis 的**核心全局配置文件**,用于配置 MyBatis 的运行环境、数据源、事务管理、插件、类型别名等全局性配置,是 MyBatis 启动的基础。

**2. 主要配置内容**

**1) properties (属性配置)**
- 引入外部 properties 文件
- 配置数据库连接信息
- 支持动态替换

**2) settings (全局设置)**
- 缓存开关
- 延迟加载
- 驼峰命名转换
- 日志实现等

**3) typeAliases (类型别名)**
- 为 Java 类型设置别名
- 简化 XML 配置
- 支持包扫描

**4) typeHandlers (类型处理器)**
- Java 类型与 JDBC 类型转换
- 自定义类型处理器

**5) plugins (插件)**
- 拦截器配置
- 分页插件
- 性能监控等

**6) environments (环境配置)**
- 数据源配置
- 事务管理器
- 支持多环境

**7) mappers (映射器)**
- 指定 Mapper 文件位置
- 支持多种加载方式

**3. 配置文件结构图**

<svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">mybatis-config.xml 配置结构</text>
  <rect x="250" y="60" width="300" height="50" fill="#2563EB" stroke="#1E40AF" stroke-width="2" rx="5"/>
  <text x="400" y="90" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#FFFFFF">mybatis-config.xml</text>
  <rect x="50" y="150" width="160" height="520" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="130" y="175" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">配置项</text>
  <rect x="70" y="190" width="120" height="30" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="3"/>
  <text x="130" y="210" text-anchor="middle" font-family="Arial" font-size="11">properties</text>
  <rect x="70" y="230" width="120" height="30" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="3"/>
  <text x="130" y="250" text-anchor="middle" font-family="Arial" font-size="11">settings</text>
  <rect x="70" y="270" width="120" height="30" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="3"/>
  <text x="130" y="290" text-anchor="middle" font-family="Arial" font-size="11">typeAliases</text>
  <rect x="70" y="310" width="120" height="30" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="3"/>
  <text x="130" y="330" text-anchor="middle" font-family="Arial" font-size="11">typeHandlers</text>
  <rect x="70" y="350" width="120" height="30" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="3"/>
  <text x="130" y="370" text-anchor="middle" font-family="Arial" font-size="11">objectFactory</text>
  <rect x="70" y="390" width="120" height="30" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="3"/>
  <text x="130" y="410" text-anchor="middle" font-family="Arial" font-size="11">plugins</text>
  <rect x="70" y="430" width="120" height="30" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="3"/>
  <text x="130" y="450" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold">environments ★</text>
  <rect x="70" y="470" width="120" height="30" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="3"/>
  <text x="130" y="490" text-anchor="middle" font-family="Arial" font-size="11">databaseIdProvider</text>
  <rect x="70" y="510" width="120" height="30" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="3"/>
  <text x="130" y="530" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold">mappers ★</text>
  <text x="130" y="570" text-anchor="middle" font-family="Arial" font-size="10" fill="#6B7280">★ 必须配置</text>
  <text x="130" y="650" text-anchor="middle" font-family="Arial" font-size="10" fill="#DC2626">必须按顺序配置</text>
  <rect x="250" y="150" width="500" height="520" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <text x="500" y="175" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">详细说明</text>
  <text x="270" y="205" font-family="Arial" font-size="11" font-weight="bold">1. properties</text>
  <text x="270" y="220" font-family="Arial" font-size="10">引入外部配置文件,如 jdbc.properties</text>
  <text x="270" y="245" font-family="Arial" font-size="11" font-weight="bold">2. settings</text>
  <text x="270" y="260" font-family="Arial" font-size="10">全局配置:缓存、懒加载、驼峰命名等</text>
  <text x="270" y="285" font-family="Arial" font-size="11" font-weight="bold">3. typeAliases</text>
  <text x="270" y="300" font-family="Arial" font-size="10">类型别名:简化全限定类名的书写</text>
  <text x="270" y="325" font-family="Arial" font-size="11" font-weight="bold">4. typeHandlers</text>
  <text x="270" y="340" font-family="Arial" font-size="10">类型处理器:Java 与 JDBC 类型转换</text>
  <text x="270" y="365" font-family="Arial" font-size="11" font-weight="bold">5. objectFactory</text>
  <text x="270" y="380" font-family="Arial" font-size="10">对象工厂:自定义结果对象的创建</text>
  <text x="270" y="405" font-family="Arial" font-size="11" font-weight="bold">6. plugins</text>
  <text x="270" y="420" font-family="Arial" font-size="10">插件配置:分页插件、拦截器等</text>
  <rect x="260" y="435" width="470" height="85" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="3"/>
  <text x="270" y="455" font-family="Arial" font-size="11" font-weight="bold">7. environments ★ (必配)</text>
  <text x="280" y="475" font-family="Arial" font-size="10">• environment: 环境配置,可配置多个</text>
  <text x="280" y="490" font-family="Arial" font-size="10">• transactionManager: 事务管理器(JDBC/MANAGED)</text>
  <text x="280" y="505" font-family="Arial" font-size="10">• dataSource: 数据源配置(POOLED/UNPOOLED)</text>
  <text x="270" y="540" font-family="Arial" font-size="11" font-weight="bold">8. databaseIdProvider</text>
  <text x="270" y="555" font-family="Arial" font-size="10">数据库厂商标识:支持多数据库 SQL</text>
  <rect x="260" y="570" width="470" height="65" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="3"/>
  <text x="270" y="590" font-family="Arial" font-size="11" font-weight="bold">9. mappers ★ (必配)</text>
  <text x="280" y="610" font-family="Arial" font-size="10">• resource: 指定 Mapper.xml 路径</text>
  <text x="280" y="625" font-family="Arial" font-size="10">• package: 扫描 Mapper 接口包</text>
</svg>

**4. 常用配置示例**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">常用配置示例</text>
  <rect x="50" y="45" width="700" height="380" fill="#1F2937" stroke="#374151" stroke-width="2" rx="5"/>
  <text x="70" y="70" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</text>
  <text x="70" y="90" font-family="monospace" font-size="11" fill="#93C5FD">&lt;configuration&gt;</text>
  <text x="90" y="115" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 1. 引入外部配置 --&gt;</text>
  <text x="90" y="135" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;properties resource="jdbc.properties"/&gt;</text>
  <text x="90" y="160" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 2. 全局设置 --&gt;</text>
  <text x="90" y="180" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;settings&gt;</text>
  <text x="110" y="200" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;setting name="cacheEnabled" value="true"/&gt;</text>
  <text x="110" y="220" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;setting name="mapUnderscoreToCamelCase" value="true"/&gt;</text>
  <text x="90" y="240" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;/settings&gt;</text>
  <text x="90" y="265" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 3. 类型别名 --&gt;</text>
  <text x="90" y="285" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;typeAliases&gt;</text>
  <text x="110" y="305" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;package name="com.example.entity"/&gt;</text>
  <text x="90" y="325" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;/typeAliases&gt;</text>
  <text x="90" y="350" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 4. 环境配置 --&gt;</text>
  <text x="90" y="370" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;environments default="development"&gt;</text>
  <text x="110" y="390" font-family="monospace" font-size="11" fill="#A7F3D0">...</text>
  <text x="90" y="410" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;/environments&gt;</text>
  <text x="70" y="435" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/configuration&gt;</text>
</svg>

**5. 关键要点**

- **核心地位**: MyBatis 的启动配置文件,全局唯一
- **必配项**: environments(环境)、mappers(映射器)
- **常用配置**: properties、settings、typeAliases
- **配置顺序**: 9 大元素必须按照固定顺序配置
- **与 Spring 整合**: 使用 Spring 后,部分配置可由 Spring 管理
- **最佳实践**: 数据库信息外部化到 properties 文件

**6. 记忆口诀**

**"属设别处厂插环库映"** (配置顺序)
- **属**: properties (属性)
- **设**: settings (设置)
- **别**: typeAliases (别名)
- **处**: typeHandlers (处理器)
- **厂**: objectFactory (工厂)
- **插**: plugins (插件)
- **环**: environments (环境) ★
- **库**: databaseIdProvider (数据库)
- **映**: mappers (映射器) ★

### 9. Mapper.xml 的作用是什么？

**1. 核心作用**

Mapper.xml 是 MyBatis 的 **SQL 映射文件**,用于定义 SQL 语句、参数映射和结果映射,将 Mapper 接口的方法与具体的 SQL 语句关联起来。

**2. 主要功能**

**1) 定义 namespace (命名空间)**
- 绑定 Mapper 接口的全限定名
- 确保 SQL 语句的唯一性
- 关联接口方法和 SQL 语句

**2) 编写 SQL 语句**
- select: 查询语句
- insert: 插入语句
- update: 更新语句
- delete: 删除语句
- 支持动态 SQL

**3) 参数映射**
- parameterType: 指定参数类型
- 支持简单类型、对象、Map 等
- 使用 #{} 或 ${} 引用参数

**4) 结果映射**
- resultType: 简单映射
- resultMap: 复杂映射
- 自动映射字段到属性

**5) 动态 SQL**
- if: 条件判断
- choose/when/otherwise: 多分支
- where/set: 智能处理
- foreach: 循环遍历
- trim: 自定义截取

**3. Mapper.xml 结构图**

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">Mapper.xml 文件结构</text>
  <rect x="250" y="60" width="300" height="50" fill="#6366F1" stroke="#4F46E5" stroke-width="2" rx="5"/>
  <text x="400" y="90" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#FFFFFF">UserMapper.xml</text>
  <rect x="100" y="150" width="600" height="470" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <text x="400" y="180" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold">&lt;mapper namespace="com.example.mapper.UserMapper"&gt;</text>
  <rect x="120" y="200" width="560" height="90" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="400" y="225" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">1. resultMap (结果映射)</text>
  <text x="140" y="245" font-family="monospace" font-size="10">&lt;resultMap id="userMap" type="User"&gt;</text>
  <text x="160" y="265" font-family="monospace" font-size="10">&lt;id property="id" column="user_id"/&gt;</text>
  <text x="160" y="280" font-family="monospace" font-size="10">&lt;result property="name" column="user_name"/&gt;</text>
  <text x="140" y="295" font-family="monospace" font-size="10">&lt;/resultMap&gt;</text>
  <rect x="120" y="310" width="560" height="70" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="400" y="335" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">2. select (查询)</text>
  <text x="140" y="355" font-family="monospace" font-size="10">&lt;select id="selectById" resultMap="userMap"&gt;</text>
  <text x="160" y="370" font-family="monospace" font-size="10">SELECT * FROM user WHERE id = #{id}</text>
  <text x="140" y="385" font-family="monospace" font-size="10">&lt;/select&gt;</text>
  <rect x="120" y="400" width="270" height="70" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="255" y="425" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">3. insert (插入)</text>
  <text x="140" y="445" font-family="monospace" font-size="10">&lt;insert id="insert"&gt;</text>
  <text x="160" y="460" font-family="monospace" font-size="10">INSERT INTO user...</text>
  <text x="140" y="475" font-family="monospace" font-size="10">&lt;/insert&gt;</text>
  <rect x="410" y="400" width="270" height="70" fill="#DCFCE7" stroke="#22C55E" stroke-width="2" rx="5"/>
  <text x="545" y="425" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">4. update (更新)</text>
  <text x="430" y="445" font-family="monospace" font-size="10">&lt;update id="update"&gt;</text>
  <text x="450" y="460" font-family="monospace" font-size="10">UPDATE user...</text>
  <text x="430" y="475" font-family="monospace" font-size="10">&lt;/update&gt;</text>
  <rect x="120" y="490" width="560" height="110" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="400" y="515" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">5. 动态 SQL</text>
  <text x="140" y="535" font-family="monospace" font-size="10">&lt;select id="selectByCondition" resultMap="userMap"&gt;</text>
  <text x="160" y="550" font-family="monospace" font-size="10">SELECT * FROM user</text>
  <text x="160" y="565" font-family="monospace" font-size="10">&lt;where&gt;</text>
  <text x="180" y="580" font-family="monospace" font-size="10">&lt;if test="name != null"&gt;AND name = #{name}&lt;/if&gt;</text>
  <text x="160" y="595" font-family="monospace" font-size="10">&lt;/where&gt;</text>
  <text x="140" y="610" font-family="monospace" font-size="10">&lt;/select&gt;</text>
  <text x="400" y="635" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold">&lt;/mapper&gt;</text>
</svg>

**4. 与 Mapper 接口的映射关系**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow8" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563"/>
    </marker>
  </defs>
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Mapper 接口与 Mapper.xml 映射关系</text>
  <rect x="50" y="70" width="300" height="280" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="200" y="100" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold">Mapper 接口</text>
  <text x="200" y="120" text-anchor="middle" font-family="Arial" font-size="12">(UserMapper.java)</text>
  <rect x="70" y="140" width="260" height="190" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="3"/>
  <text x="80" y="160" font-family="monospace" font-size="11">public interface UserMapper {</text>
  <rect x="90" y="175" width="220" height="20" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="2"/>
  <text x="100" y="190" font-family="monospace" font-size="11">User selectById(Long id);</text>
  <rect x="90" y="205" width="220" height="20" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="2"/>
  <text x="100" y="220" font-family="monospace" font-size="11">int insert(User user);</text>
  <rect x="90" y="235" width="220" height="20" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="2"/>
  <text x="100" y="250" font-family="monospace" font-size="11">int update(User user);</text>
  <rect x="90" y="265" width="220" height="20" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="2"/>
  <text x="100" y="280" font-family="monospace" font-size="11">int delete(Long id);</text>
  <text x="80" y="310" font-family="monospace" font-size="11">}</text>
  <rect x="450" y="70" width="300" height="280" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="600" y="100" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold">Mapper.xml</text>
  <text x="600" y="120" text-anchor="middle" font-family="Arial" font-size="12">(UserMapper.xml)</text>
  <rect x="470" y="140" width="260" height="190" fill="#FEF9C3" stroke="#EAB308" stroke-width="1" rx="3"/>
  <text x="480" y="160" font-family="monospace" font-size="10">&lt;mapper namespace="...UserMapper"&gt;</text>
  <rect x="490" y="175" width="240" height="20" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="2"/>
  <text x="500" y="190" font-family="monospace" font-size="10">&lt;select id="selectById"&gt;...&lt;/select&gt;</text>
  <rect x="490" y="205" width="240" height="20" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="2"/>
  <text x="500" y="220" font-family="monospace" font-size="10">&lt;insert id="insert"&gt;...&lt;/insert&gt;</text>
  <rect x="490" y="235" width="240" height="20" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="2"/>
  <text x="500" y="250" font-family="monospace" font-size="10">&lt;update id="update"&gt;...&lt;/update&gt;</text>
  <rect x="490" y="265" width="240" height="20" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="2"/>
  <text x="500" y="280" font-family="monospace" font-size="10">&lt;delete id="delete"&gt;...&lt;/delete&gt;</text>
  <text x="480" y="310" font-family="monospace" font-size="10">&lt;/mapper&gt;</text>
  <line x1="330" y1="185" x2="470" y2="185" stroke="#4B5563" stroke-width="2"/>
  <polygon points="330,185 345,180 345,190" fill="#4B5563"/>
  <polygon points="470,185 455,180 455,190" fill="#4B5563"/>
  <text x="400" y="175" text-anchor="middle" font-family="Arial" font-size="10" fill="#DC2626">方法名 = id</text>
  <line x1="330" y1="215" x2="470" y2="215" stroke="#4B5563" stroke-width="2"/>
  <polygon points="330,215 345,210 345,220" fill="#4B5563"/>
  <polygon points="470,215 455,210 455,220" fill="#4B5563"/>
  <line x1="330" y1="245" x2="470" y2="245" stroke="#4B5563" stroke-width="2"/>
  <polygon points="330,245 345,240 345,250" fill="#4B5563"/>
  <polygon points="470,245 455,240 455,250" fill="#4B5563"/>
  <line x1="330" y1="275" x2="470" y2="275" stroke="#4B5563" stroke-width="2"/>
  <polygon points="330,275 345,270 345,280" fill="#4B5563"/>
  <polygon points="470,275 455,270 455,280" fill="#4B5563"/>
  <rect x="50" y="365" width="700" height="25" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1" rx="3"/>
  <text x="400" y="382" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold">namespace 全限定名 = 接口全限定名  |  SQL 的 id = 接口方法名</text>
</svg>

**5. 关键要点**

- **核心作用**: 定义 SQL 语句和映射关系
- **命名空间**: namespace 必须与 Mapper 接口全限定名一致
- **SQL 标签**: select、insert、update、delete
- **映射方式**: resultType(简单)、resultMap(复杂)
- **参数引用**: #{} 预编译(推荐)、${} 直接替换
- **动态 SQL**: if、choose、where、set、foreach 等标签
- **一一对应**: XML 中的 id 对应接口中的方法名

**6. 记忆口诀**

**"命名空间绑接口,增删改查动态SQL"**
- **命名空间**: namespace 绑定 Mapper 接口
- **绑接口**: id 对应接口方法
- **增删改查**: insert、delete、update、select
- **动态SQL**: if、where、foreach 等动态标签

### 10. MyBatis 的配置文件加载顺序是怎样的？

**1. 核心加载顺序**

MyBatis 配置文件的加载遵循**严格的顺序**,从 mybatis-config.xml 开始,按照配置元素的声明顺序依次加载,同时支持属性的优先级覆盖机制。

**2. mybatis-config.xml 元素加载顺序**

MyBatis 要求 configuration 标签下的子元素**必须按以下顺序配置**:

**1) properties (属性配置)**
- 最先加载
- 可引入外部 properties 文件
- 后续配置可引用这些属性

**2) settings (全局设置)**
- 在 properties 之后加载
- 影响 MyBatis 的运行行为

**3) typeAliases (类型别名)**
- 为 Java 类设置别名
- 后续 XML 中可使用别名

**4) typeHandlers (类型处理器)**
- 定义 Java 类型与 JDBC 类型的转换

**5) objectFactory (对象工厂)**
- 自定义结果对象的实例化

**6) plugins (插件)**
- 拦截器配置
- 如分页插件、性能监控等

**7) environments (环境配置)**
- 数据源和事务管理器配置
- 可配置多个环境

**8) databaseIdProvider (数据库厂商标识)**
- 支持多数据库方言

**9) mappers (映射器)**
- 最后加载
- 引入 SQL 映射文件

**3. 配置加载顺序图**

<svg viewBox="0 0 700 750" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow9" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563"/>
    </marker>
  </defs>
  <text x="350" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">MyBatis 配置加载顺序</text>
  <rect x="200" y="60" width="300" height="50" fill="#2563EB" stroke="#1E40AF" stroke-width="2" rx="5"/>
  <text x="350" y="90" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#FFFFFF">mybatis-config.xml</text>
  <rect x="200" y="140" width="300" height="40" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" rx="5"/>
  <text x="230" y="165" text-anchor="start" font-family="Arial" font-size="13" font-weight="bold">1. properties</text>
  <text x="480" y="165" text-anchor="end" font-family="Arial" font-size="11">属性配置</text>
  <rect x="200" y="190" width="300" height="40" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="230" y="215" text-anchor="start" font-family="Arial" font-size="13" font-weight="bold">2. settings</text>
  <text x="480" y="215" text-anchor="end" font-family="Arial" font-size="11">全局设置</text>
  <rect x="200" y="240" width="300" height="40" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="230" y="265" text-anchor="start" font-family="Arial" font-size="13" font-weight="bold">3. typeAliases</text>
  <text x="480" y="265" text-anchor="end" font-family="Arial" font-size="11">类型别名</text>
  <rect x="200" y="290" width="300" height="40" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="230" y="315" text-anchor="start" font-family="Arial" font-size="13" font-weight="bold">4. typeHandlers</text>
  <text x="480" y="315" text-anchor="end" font-family="Arial" font-size="11">类型处理器</text>
  <rect x="200" y="340" width="300" height="40" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="230" y="365" text-anchor="start" font-family="Arial" font-size="13" font-weight="bold">5. objectFactory</text>
  <text x="480" y="365" text-anchor="end" font-family="Arial" font-size="11">对象工厂</text>
  <rect x="200" y="390" width="300" height="40" fill="#F3E8FF" stroke="#A855F7" stroke-width="2" rx="5"/>
  <text x="230" y="415" text-anchor="start" font-family="Arial" font-size="13" font-weight="bold">6. plugins</text>
  <text x="480" y="415" text-anchor="end" font-family="Arial" font-size="11">插件配置</text>
  <rect x="200" y="440" width="300" height="40" fill="#DCFCE7" stroke="#22C55E" stroke-width="2" rx="5"/>
  <text x="230" y="465" text-anchor="start" font-family="Arial" font-size="13" font-weight="bold">7. environments</text>
  <text x="480" y="465" text-anchor="end" font-family="Arial" font-size="11">环境配置 ★</text>
  <rect x="200" y="490" width="300" height="40" fill="#FFF7ED" stroke="#FB923C" stroke-width="2" rx="5"/>
  <text x="230" y="515" text-anchor="start" font-family="Arial" font-size="13" font-weight="bold">8. databaseIdProvider</text>
  <text x="480" y="515" text-anchor="end" font-family="Arial" font-size="11">数据库厂商</text>
  <rect x="200" y="540" width="300" height="40" fill="#FCE7F3" stroke="#EC4899" stroke-width="2" rx="5"/>
  <text x="230" y="565" text-anchor="start" font-family="Arial" font-size="13" font-weight="bold">9. mappers</text>
  <text x="480" y="565" text-anchor="end" font-family="Arial" font-size="11">映射器 ★</text>
  <line x1="350" y1="110" x2="350" y2="140" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow9)"/>
  <line x1="350" y1="180" x2="350" y2="190" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow9)"/>
  <line x1="350" y1="230" x2="350" y2="240" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow9)"/>
  <line x1="350" y1="280" x2="350" y2="290" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow9)"/>
  <line x1="350" y1="330" x2="350" y2="340" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow9)"/>
  <line x1="350" y1="380" x2="350" y2="390" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow9)"/>
  <line x1="350" y1="430" x2="350" y2="440" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow9)"/>
  <line x1="350" y1="480" x2="350" y2="490" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow9)"/>
  <line x1="350" y1="530" x2="350" y2="540" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow9)"/>
  <rect x="50" y="610" width="600" height="120" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <text x="350" y="635" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">重要提示</text>
  <text x="70" y="660" font-family="Arial" font-size="12">• 配置元素必须按上述顺序出现,否则会报错</text>
  <text x="70" y="680" font-family="Arial" font-size="12">• properties 最先加载,可被后续配置引用</text>
  <text x="70" y="700" font-family="Arial" font-size="12">• mappers 最后加载,此时所有配置已完成</text>
  <text x="70" y="720" font-family="Arial" font-size="12">• environments 和 mappers 是必须配置项 (标记★)</text>
</svg>

**4. 属性优先级加载顺序**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
  <text x="350" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">属性(properties)加载优先级</text>
  <rect x="100" y="70" width="500" height="270" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <rect x="150" y="100" width="400" height="60" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="350" y="125" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">优先级 1 (最高)</text>
  <text x="350" y="145" text-anchor="middle" font-family="Arial" font-size="12">方法参数传递的属性</text>
  <rect x="150" y="175" width="400" height="60" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="350" y="200" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">优先级 2 (中等)</text>
  <text x="350" y="220" text-anchor="middle" font-family="Arial" font-size="12">resource/url 引入的外部配置文件</text>
  <rect x="150" y="250" width="400" height="60" fill="#DCFCE7" stroke="#22C55E" stroke-width="2" rx="5"/>
  <text x="350" y="275" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">优先级 3 (最低)</text>
  <text x="350" y="295" text-anchor="middle" font-family="Arial" font-size="12">properties 标签内的 property 子元素</text>
  <rect x="100" y="350" width="500" height="35" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="3"/>
  <text x="350" y="373" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">规则: 优先级高的会覆盖优先级低的属性值</text>
</svg>

**5. 完整加载流程**

<svg viewBox="0 0 750 350" xmlns="http://www.w3.org/2000/svg">
  <text x="375" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">MyBatis 完整加载流程</text>
  <rect x="50" y="50" width="650" height="280" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <text x="70" y="75" font-family="Arial" font-size="12" font-weight="bold">1. 加载核心配置文件</text>
  <text x="90" y="95" font-family="Arial" font-size="11">• 读取 mybatis-config.xml</text>
  <text x="90" y="115" font-family="Arial" font-size="11">• 解析 XML 为 Configuration 对象</text>
  <text x="70" y="140" font-family="Arial" font-size="12" font-weight="bold">2. 按顺序加载配置元素</text>
  <text x="90" y="160" font-family="Arial" font-size="11">• properties → settings → typeAliases → ...</text>
  <text x="90" y="180" font-family="Arial" font-size="11">• 每个元素依次解析并存入 Configuration</text>
  <text x="70" y="205" font-family="Arial" font-size="12" font-weight="bold">3. 加载 Mapper 映射文件</text>
  <text x="90" y="225" font-family="Arial" font-size="11">• 解析 mappers 配置</text>
  <text x="90" y="245" font-family="Arial" font-size="11">• 逐个加载 Mapper.xml 文件</text>
  <text x="90" y="265" font-family="Arial" font-size="11">• 解析 SQL 语句和映射关系</text>
  <text x="70" y="290" font-family="Arial" font-size="12" font-weight="bold">4. 创建 SqlSessionFactory</text>
  <text x="90" y="310" font-family="Arial" font-size="11">• 基于 Configuration 创建工厂</text>
</svg>

**6. 关键要点**

- **严格顺序**: mybatis-config.xml 中的元素必须按固定顺序配置
- **9 大元素**: properties、settings、typeAliases、typeHandlers、objectFactory、plugins、environments、databaseIdProvider、mappers
- **属性优先级**: 方法参数 > 外部文件 > 内部 property
- **必配项**: environments 和 mappers 必须配置
- **最先最后**: properties 最先加载,mappers 最后加载
- **配置错误**: 顺序错误会导致解析异常

**7. 记忆口诀**

**"属设别处厂插环库映"** (按顺序记忆)
- **属**: properties
- **设**: settings
- **别**: typeAliases
- **处**: typeHandlers
- **厂**: objectFactory
- **插**: plugins
- **环**: environments
- **库**: databaseIdProvider
- **映**: mappers

### 11. 如何配置数据源？

**1. 核心配置方式**

MyBatis 的数据源在 **mybatis-config.xml** 的 **environments** 元素中配置,支持三种内置数据源类型:UNPOOLED、POOLED 和 JNDI,也可以集成第三方连接池。

**2. 三种内置数据源类型**

**1) UNPOOLED (非池化)**
- 每次请求都打开和关闭连接
- 性能较差,适合简单应用
- 配置简单,无需连接池参数

**2) POOLED (池化) ★**
- 使用连接池管理数据库连接
- 性能好,推荐使用
- 支持连接池参数配置

**3) JNDI**
- 使用应用服务器提供的数据源
- 适合 Java EE 环境
- 通过 JNDI 查找数据源

**3. 基本配置示例**

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">数据源配置示例</text>
  <rect x="50" y="60" width="700" height="560" fill="#1F2937" stroke="#374151" stroke-width="2" rx="5"/>
  <text x="70" y="85" font-family="monospace" font-size="11" fill="#93C5FD">&lt;environments default="development"&gt;</text>
  <text x="90" y="110" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 开发环境 --&gt;</text>
  <text x="90" y="130" font-family="monospace" font-size="11" fill="#93C5FD">&lt;environment id="development"&gt;</text>
  <text x="110" y="155" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 事务管理器 --&gt;</text>
  <text x="110" y="175" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;transactionManager type="JDBC"/&gt;</text>
  <text x="110" y="200" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 数据源配置 (POOLED 连接池) --&gt;</text>
  <text x="110" y="220" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;dataSource type="POOLED"&gt;</text>
  <text x="130" y="245" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;property name="driver" value="com.mysql.cj.jdbc.Driver"/&gt;</text>
  <text x="130" y="270" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;property name="url"</text>
  <text x="150" y="290" font-family="monospace" font-size="11" fill="#E5E7EB">value="jdbc:mysql://localhost:3306/test"/&gt;</text>
  <text x="130" y="315" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;property name="username" value="root"/&gt;</text>
  <text x="130" y="340" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;property name="password" value="123456"/&gt;</text>
  <text x="130" y="365" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 连接池参数 --&gt;</text>
  <text x="130" y="385" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;property name="poolMaximumActiveConnections" value="20"/&gt;</text>
  <text x="130" y="405" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;property name="poolMaximumIdleConnections" value="10"/&gt;</text>
  <text x="130" y="425" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;property name="poolTimeToWait" value="20000"/&gt;</text>
  <text x="110" y="450" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;/dataSource&gt;</text>
  <text x="90" y="475" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/environment&gt;</text>
  <text x="90" y="500" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 生产环境 --&gt;</text>
  <text x="90" y="520" font-family="monospace" font-size="11" fill="#93C5FD">&lt;environment id="production"&gt;</text>
  <text x="110" y="540" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;transactionManager type="JDBC"/&gt;</text>
  <text x="110" y="560" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;dataSource type="POOLED"&gt;</text>
  <text x="130" y="580" font-family="monospace" font-size="11" fill="#A7F3D0">...</text>
  <text x="110" y="600" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;/dataSource&gt;</text>
  <text x="90" y="620" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/environment&gt;</text>
  <text x="70" y="645" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/environments&gt;</text>
</svg>

**4. 使用外部配置文件**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">使用 properties 外部化配置</text>
  <rect x="50" y="60" width="340" height="180" fill="#1F2937" stroke="#374151" stroke-width="2" rx="5"/>
  <text x="70" y="85" font-family="monospace" font-size="11" fill="#FCD34D">jdbc.properties</text>
  <line x1="70" y1="90" x2="370" y2="90" stroke="#6B7280" stroke-width="1"/>
  <text x="70" y="115" font-family="monospace" font-size="11" fill="#A7F3D0">driver=com.mysql.cj.jdbc.Driver</text>
  <text x="70" y="140" font-family="monospace" font-size="11" fill="#A7F3D0">url=jdbc:mysql://localhost:3306/test</text>
  <text x="70" y="165" font-family="monospace" font-size="11" fill="#A7F3D0">username=root</text>
  <text x="70" y="190" font-family="monospace" font-size="11" fill="#A7F3D0">password=123456</text>
  <text x="70" y="215" font-family="monospace" font-size="11" fill="#A7F3D0">poolMaxActive=20</text>
  <text x="70" y="240" font-family="monospace" font-size="11" fill="#A7F3D0">poolMaxIdle=10</text>
  <rect x="410" y="60" width="340" height="400" fill="#1F2937" stroke="#374151" stroke-width="2" rx="5"/>
  <text x="430" y="85" font-family="monospace" font-size="11" fill="#FCD34D">mybatis-config.xml</text>
  <line x1="430" y1="90" x2="730" y2="90" stroke="#6B7280" stroke-width="1"/>
  <text x="430" y="115" font-family="monospace" font-size="11" fill="#93C5FD">&lt;configuration&gt;</text>
  <text x="450" y="140" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 1. 引入配置文件 --&gt;</text>
  <text x="450" y="160" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;properties resource="jdbc.properties"/&gt;</text>
  <text x="450" y="190" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 2. 使用配置 --&gt;</text>
  <text x="450" y="210" font-family="monospace" font-size="11" fill="#93C5FD">&lt;environments default="development"&gt;</text>
  <text x="470" y="230" font-family="monospace" font-size="11" fill="#93C5FD">&lt;environment id="development"&gt;</text>
  <text x="490" y="250" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;transactionManager type="JDBC"/&gt;</text>
  <text x="490" y="275" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;dataSource type="POOLED"&gt;</text>
  <text x="510" y="300" font-family="monospace" font-size="10" fill="#FCD34D">&lt;property name="driver" value="${driver}"/&gt;</text>
  <text x="510" y="320" font-family="monospace" font-size="10" fill="#FCD34D">&lt;property name="url" value="${url}"/&gt;</text>
  <text x="510" y="340" font-family="monospace" font-size="10" fill="#FCD34D">&lt;property name="username" value="${username}"/&gt;</text>
  <text x="510" y="360" font-family="monospace" font-size="10" fill="#FCD34D">&lt;property name="password" value="${password}"/&gt;</text>
  <text x="510" y="380" font-family="monospace" font-size="10" fill="#E5E7EB">&lt;property name="poolMaximumActiveConnections"</text>
  <text x="530" y="400" font-family="monospace" font-size="10" fill="#FCD34D">value="${poolMaxActive}"/&gt;</text>
  <text x="490" y="425" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;/dataSource&gt;</text>
  <text x="470" y="445" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/environment&gt;</text>
  <text x="450" y="465" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/environments&gt;</text>
  <text x="430" y="485" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/configuration&gt;</text>
</svg>

**5. 集成第三方连接池 (Druid/HikariCP)**

**1) Druid 连接池配置**

```xml
<!-- 1. 添加依赖 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.x</version>
</dependency>

<!-- 2. 配置数据源 -->
<dataSource type="com.alibaba.druid.pool.DruidDataSourceFactory">
    <property name="driverClassName" value="${driver}"/>
    <property name="url" value="${url}"/>
    <property name="username" value="${username}"/>
    <property name="password" value="${password}"/>
    <property name="initialSize" value="5"/>
    <property name="maxActive" value="20"/>
    <property name="minIdle" value="5"/>
</dataSource>
```

**2) HikariCP 连接池配置**

```xml
<!-- 1. 添加依赖 -->
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>5.x.x</version>
</dependency>

<!-- 2. 配置数据源 -->
<dataSource type="com.zaxxer.hikari.HikariDataSource">
    <property name="driverClassName" value="${driver}"/>
    <property name="jdbcUrl" value="${url}"/>
    <property name="username" value="${username}"/>
    <property name="password" value="${password}"/>
    <property name="maximumPoolSize" value="20"/>
    <property name="minimumIdle" value="5"/>
</dataSource>
```

**6. 关键配置参数**

<svg viewBox="0 0 750 400" xmlns="http://www.w3.org/2000/svg">
  <text x="375" y="25" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">POOLED 连接池常用参数</text>
  <rect x="50" y="50" width="650" height="330" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <rect x="70" y="70" width="300" height="30" fill="#DBEAFE" stroke="#2563EB" stroke-width="1" rx="3"/>
  <text x="220" y="90" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">参数名</text>
  <rect x="380" y="70" width="300" height="30" fill="#DBEAFE" stroke="#2563EB" stroke-width="1" rx="3"/>
  <text x="530" y="90" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">说明</text>
  <text x="85" y="125" font-family="monospace" font-size="11">poolMaximumActiveConnections</text>
  <text x="395" y="125" font-family="Arial" font-size="11">最大活动连接数(默认 10)</text>
  <text x="85" y="155" font-family="monospace" font-size="11">poolMaximumIdleConnections</text>
  <text x="395" y="155" font-family="Arial" font-size="11">最大空闲连接数(默认 5)</text>
  <text x="85" y="185" font-family="monospace" font-size="11">poolMaximumCheckoutTime</text>
  <text x="395" y="185" font-family="Arial" font-size="11">连接被取出的最长时间(默认 20s)</text>
  <text x="85" y="215" font-family="monospace" font-size="11">poolTimeToWait</text>
  <text x="395" y="215" font-family="Arial" font-size="11">获取连接的等待时间(默认 20s)</text>
  <text x="85" y="245" font-family="monospace" font-size="11">poolPingQuery</text>
  <text x="395" y="245" font-family="Arial" font-size="11">测试连接是否有效的 SQL</text>
  <text x="85" y="275" font-family="monospace" font-size="11">poolPingEnabled</text>
  <text x="395" y="275" font-family="Arial" font-size="11">是否启用侦测查询(默认 false)</text>
  <text x="85" y="305" font-family="monospace" font-size="11">poolPingConnectionsNotUsedFor</text>
  <text x="395" y="305" font-family="Arial" font-size="11">多久未使用时进行侦测(默认 0)</text>
  <text x="85" y="335" font-family="monospace" font-size="11">driver</text>
  <text x="395" y="335" font-family="Arial" font-size="11">JDBC 驱动类全限定名 ★</text>
  <text x="85" y="365" font-family="monospace" font-size="11">url / username / password</text>
  <text x="395" y="365" font-family="Arial" font-size="11">数据库连接信息 ★</text>
</svg>

**7. 关键要点**

- **配置位置**: environments 元素中的 dataSource 标签
- **三种类型**: UNPOOLED、POOLED(推荐)、JNDI
- **推荐方式**: 使用 POOLED 类型 + 外部 properties 文件
- **第三方连接池**: 推荐 Druid 或 HikariCP
- **多环境**: 可配置多个 environment,通过 default 指定默认环境
- **最佳实践**: 敏感信息外部化,生产环境使用高性能连接池

**8. 记忆口诀**

**"池化推荐属性外,三方连接性能好"**
- **池化推荐**: POOLED 类型推荐使用
- **属性外**: 配置信息外部化到 properties
- **三方连接**: 集成 Druid/HikariCP
- **性能好**: 连接池提升性能

### 12. 如何配置事务管理器？

**1. 核心概念**

MyBatis 的事务管理器在 **environments** 的 **transactionManager** 元素中配置,提供两种类型:**JDBC** 和 **MANAGED**,用于控制数据库事务的提交和回滚。

**2. 两种事务管理器类型**

**1) JDBC 事务管理器 ★**
- 使用 JDBC 的事务管理机制
- 直接使用 Connection 对象的 commit()、rollback()
- 默认关闭自动提交(autoCommit=false)
- 适合独立应用和 MyBatis 单独使用

**2) MANAGED 事务管理器**
- 将事务管理交给容器(如 Spring、EJB)
- MyBatis 不会主动提交或回滚事务
- 由外部容器管理事务生命周期
- 适合 Java EE 环境或与 Spring 整合

**3. 配置示例**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">事务管理器配置</text>
  <rect x="50" y="60" width="700" height="460" fill="#1F2937" stroke="#374151" stroke-width="2" rx="5"/>
  <text x="70" y="85" font-family="monospace" font-size="11" fill="#93C5FD">&lt;environments default="development"&gt;</text>
  <text x="90" y="115" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 方式一: JDBC 事务管理器 (推荐) --&gt;</text>
  <text x="90" y="135" font-family="monospace" font-size="11" fill="#93C5FD">&lt;environment id="development"&gt;</text>
  <rect x="100" y="145" width="580" height="100" fill="#1E3A5F" stroke="#3B82F6" stroke-width="2" rx="3"/>
  <text x="120" y="170" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;transactionManager type="JDBC"&gt;</text>
  <text x="140" y="195" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 可选: 配置是否跳过设置自动提交 --&gt;</text>
  <text x="140" y="215" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;property name="skipSetAutoCommitOnClose" value="false"/&gt;</text>
  <text x="120" y="240" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;/transactionManager&gt;</text>
  <text x="120" y="265" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;dataSource type="POOLED"&gt;</text>
  <text x="140" y="285" font-family="monospace" font-size="11" fill="#E5E7EB">...</text>
  <text x="120" y="305" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;/dataSource&gt;</text>
  <text x="90" y="325" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/environment&gt;</text>
  <text x="90" y="355" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 方式二: MANAGED 事务管理器 (容器管理) --&gt;</text>
  <text x="90" y="375" font-family="monospace" font-size="11" fill="#93C5FD">&lt;environment id="production"&gt;</text>
  <rect x="100" y="385" width="580" height="90" fill="#1E3A5F" stroke="#F59E0B" stroke-width="2" rx="3"/>
  <text x="120" y="410" font-family="monospace" font-size="11" fill="#FCD34D">&lt;transactionManager type="MANAGED"&gt;</text>
  <text x="140" y="435" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;property name="closeConnection" value="false"/&gt;</text>
  <text x="120" y="460" font-family="monospace" font-size="11" fill="#FCD34D">&lt;/transactionManager&gt;</text>
  <text x="120" y="485" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;dataSource type="JNDI"&gt;...&lt;/dataSource&gt;</text>
  <text x="90" y="505" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/environment&gt;</text>
  <text x="70" y="530" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/environments&gt;</text>
</svg>

**4. 两种类型对比**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">JDBC vs MANAGED 事务管理器</text>
  <rect x="50" y="70" width="330" height="340" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="215" y="100" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#1E40AF">JDBC 类型 ★</text>
  <text x="70" y="130" font-family="Arial" font-size="12" font-weight="bold">特点:</text>
  <text x="70" y="150" font-family="Arial" font-size="11">✓ MyBatis 自己管理事务</text>
  <text x="70" y="170" font-family="Arial" font-size="11">✓ 使用 JDBC Connection 管理</text>
  <text x="70" y="190" font-family="Arial" font-size="11">✓ 支持手动提交和回滚</text>
  <text x="70" y="210" font-family="Arial" font-size="11">✓ 默认关闭自动提交</text>
  <text x="70" y="240" font-family="Arial" font-size="12" font-weight="bold">使用场景:</text>
  <text x="70" y="260" font-family="Arial" font-size="11">• 独立的 MyBatis 应用</text>
  <text x="70" y="280" font-family="Arial" font-size="11">• 桌面应用程序</text>
  <text x="70" y="300" font-family="Arial" font-size="11">• 简单的 Web 应用</text>
  <text x="70" y="330" font-family="Arial" font-size="12" font-weight="bold">事务控制:</text>
  <text x="70" y="350" font-family="monospace" font-size="10">session.commit()</text>
  <text x="70" y="370" font-family="monospace" font-size="10">session.rollback()</text>
  <text x="70" y="390" font-family="monospace" font-size="10">session.close()</text>
  <rect x="420" y="70" width="330" height="340" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="585" y="100" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#92400E">MANAGED 类型</text>
  <text x="440" y="130" font-family="Arial" font-size="12" font-weight="bold">特点:</text>
  <text x="440" y="150" font-family="Arial" font-size="11">✓ 容器管理事务</text>
  <text x="440" y="170" font-family="Arial" font-size="11">✓ MyBatis 不控制事务</text>
  <text x="440" y="190" font-family="Arial" font-size="11">✓ 交给外部框架处理</text>
  <text x="440" y="210" font-family="Arial" font-size="11">✓ 整合 Spring 时常用</text>
  <text x="440" y="240" font-family="Arial" font-size="12" font-weight="bold">使用场景:</text>
  <text x="440" y="260" font-family="Arial" font-size="11">• 与 Spring 整合</text>
  <text x="440" y="280" font-family="Arial" font-size="11">• Java EE 容器</text>
  <text x="440" y="300" font-family="Arial" font-size="11">• EJB 应用</text>
  <text x="440" y="330" font-family="Arial" font-size="12" font-weight="bold">事务控制:</text>
  <text x="440" y="350" font-family="Arial" font-size="10">由 Spring @Transactional</text>
  <text x="440" y="370" font-family="Arial" font-size="10">或容器的声明式事务控制</text>
  <text x="440" y="390" font-family="Arial" font-size="10">MyBatis 不主动提交/回滚</text>
  <rect x="50" y="425" width="700" height="15" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1" rx="3"/>
  <text x="400" y="437" text-anchor="middle" font-family="Arial" font-size="10">选择建议: 独立应用用 JDBC,整合 Spring 用 MANAGED</text>
</svg>

**5. 事务使用示例**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">JDBC 事务管理器使用示例</text>
  <rect x="50" y="60" width="700" height="410" fill="#1F2937" stroke="#374151" stroke-width="2" rx="5"/>
  <text x="70" y="85" font-family="monospace" font-size="11" fill="#FCD34D">// 1. 获取 SqlSession (默认不自动提交)</text>
  <text x="70" y="105" font-family="monospace" font-size="11" fill="#E5E7EB">SqlSession session = sqlSessionFactory.openSession();</text>
  <text x="70" y="125" font-family="monospace" font-size="11" fill="#A7F3D0">// 或明确指定不自动提交</text>
  <text x="70" y="145" font-family="monospace" font-size="11" fill="#E5E7EB">SqlSession session = sqlSessionFactory.openSession(false);</text>
  <text x="70" y="175" font-family="monospace" font-size="11" fill="#FCD34D">// 2. 执行数据库操作</text>
  <text x="70" y="195" font-family="monospace" font-size="11" fill="#E5E7EB">try {</text>
  <text x="90" y="215" font-family="monospace" font-size="11" fill="#E5E7EB">UserMapper mapper = session.getMapper(UserMapper.class);</text>
  <text x="90" y="240" font-family="monospace" font-size="11" fill="#A7F3D0">// 执行多个操作</text>
  <text x="90" y="260" font-family="monospace" font-size="11" fill="#E5E7EB">mapper.insert(user1);</text>
  <text x="90" y="280" font-family="monospace" font-size="11" fill="#E5E7EB">mapper.update(user2);</text>
  <text x="90" y="300" font-family="monospace" font-size="11" fill="#E5E7EB">mapper.delete(userId);</text>
  <text x="90" y="325" font-family="monospace" font-size="11" fill="#FCD34D">// 3. 提交事务</text>
  <text x="90" y="345" font-family="monospace" font-size="11" fill="#A7F3D0">session.commit();</text>
  <text x="70" y="370" font-family="monospace" font-size="11" fill="#E5E7EB">} catch (Exception e) {</text>
  <text x="90" y="390" font-family="monospace" font-size="11" fill="#FCD34D">// 4. 回滚事务</text>
  <text x="90" y="410" font-family="monospace" font-size="11" fill="#FCA5A5">session.rollback();</text>
  <text x="90" y="430" font-family="monospace" font-size="11" fill="#E5E7EB">e.printStackTrace();</text>
  <text x="70" y="450" font-family="monospace" font-size="11" fill="#E5E7EB">} finally {</text>
  <text x="90" y="470" font-family="monospace" font-size="11" fill="#E5E7EB">session.close();</text>
  <text x="70" y="490" font-family="monospace" font-size="11" fill="#E5E7EB">}</text>
</svg>

**6. 配置参数说明**

**1) JDBC 类型参数**

**• skipSetAutoCommitOnClose**
- 默认值: false
- 作用: 关闭连接时是否跳过设置自动提交
- 建议: 保持默认值 false

**2) MANAGED 类型参数**

**• closeConnection**
- 默认值: true
- 作用: MyBatis 是否关闭连接
- 说明: 设为 false 时,由容器管理连接

**7. 与 Spring 整合的事务管理**

<svg viewBox="0 0 750 350" xmlns="http://www.w3.org/2000/svg">
  <text x="375" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">Spring 整合后的事务管理</text>
  <rect x="50" y="50" width="650" height="280" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <text x="70" y="80" font-family="Arial" font-size="13" font-weight="bold">整合 Spring 后:</text>
  <text x="70" y="105" font-family="Arial" font-size="11">• transactionManager 配置会被 Spring 的事务管理器替代</text>
  <text x="70" y="125" font-family="Arial" font-size="11">• 使用 Spring 的 @Transactional 注解声明式事务</text>
  <text x="70" y="145" font-family="Arial" font-size="11">• 不需要手动 commit() 和 rollback()</text>
  <text x="70" y="175" font-family="Arial" font-size="13" font-weight="bold">Spring 配置示例:</text>
  <rect x="80" y="190" width="620" height="120" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="100" y="215" font-family="monospace" font-size="10" fill="#FCD34D">// Service 层使用 @Transactional</text>
  <text x="100" y="235" font-family="monospace" font-size="10" fill="#93C5FD">@Service</text>
  <text x="100" y="255" font-family="monospace" font-size="10" fill="#E5E7EB">public class UserService {</text>
  <text x="120" y="275" font-family="monospace" font-size="10" fill="#A7F3D0">@Transactional</text>
  <text x="120" y="295" font-family="monospace" font-size="10" fill="#E5E7EB">public void updateUser(User user) {</text>
  <text x="140" y="315" font-family="monospace" font-size="10" fill="#E5E7EB">userMapper.update(user);</text>
  <text x="140" y="335" font-family="monospace" font-size="10" fill="#FCD34D">// Spring 自动管理事务</text>
  <text x="120" y="355" font-family="monospace" font-size="10" fill="#E5E7EB">}</text>
  <text x="100" y="375" font-family="monospace" font-size="10" fill="#E5E7EB">}</text>
</svg>

**8. 关键要点**

- **两种类型**: JDBC(自己管理) vs MANAGED(容器管理)
- **默认推荐**: 独立应用使用 JDBC 类型
- **手动事务**: JDBC 类型需要手动 commit() 和 rollback()
- **自动提交**: 默认关闭,需要显式调用 commit()
- **Spring 整合**: 使用 MANAGED 类型或交给 Spring 管理
- **异常处理**: catch 块中必须 rollback(),finally 中必须 close()

**9. 记忆口诀**

**"JDBC 自管提交回,MANAGED 容器不用管"**
- **JDBC**: JDBC 类型
- **自管**: 自己管理事务
- **提交回**: commit() 和 rollback()
- **MANAGED**: MANAGED 类型
- **容器**: 容器管理事务
- **不用管**: MyBatis 不主动管理

### 13. 什么是 typeAliases？如何配置？

**1. 核心概念**

typeAliases(类型别名)是 MyBatis 为 **Java 类型设置的简短名称**,用于简化 XML 配置中类的全限定名书写,提高配置文件的可读性和维护性。

**2. 作用和优势**

**1) 简化类名**
- 将 `com.example.entity.User` 简化为 `User` 或 `user`
- 减少 XML 配置的冗余
- 提高配置文件的可读性

**2) 统一管理**
- 集中配置类型别名
- 便于维护和修改
- 包扫描自动注册

**3) 内置别名**
- MyBatis 内置了常用 Java 类型的别名
- 如 string、int、map、list 等

**3. 三种配置方式**

<svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">typeAliases 三种配置方式</text>
  <rect x="50" y="60" width="700" height="180" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="400" y="90" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold">方式一: 单个类型别名</text>
  <rect x="70" y="105" width="660" height="120" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="130" font-family="monospace" font-size="11" fill="#93C5FD">&lt;typeAliases&gt;</text>
  <text x="110" y="155" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 为单个类指定别名 --&gt;</text>
  <text x="110" y="175" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;typeAlias type="com.example.entity.User" alias="User"/&gt;</text>
  <text x="110" y="195" font-family="monospace" font-size="11" fill="#E5E7EB">&lt;typeAlias type="com.example.entity.Order" alias="Order"/&gt;</text>
  <text x="90" y="215" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/typeAliases&gt;</text>
  <rect x="50" y="260" width="700" height="180" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="400" y="290" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold">方式二: 包扫描 ★ (推荐)</text>
  <rect x="70" y="305" width="660" height="120" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="330" font-family="monospace" font-size="11" fill="#93C5FD">&lt;typeAliases&gt;</text>
  <text x="110" y="355" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 扫描包下所有类,默认别名为类名(首字母小写) --&gt;</text>
  <text x="110" y="375" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;package name="com.example.entity"/&gt;</text>
  <text x="110" y="395" font-family="monospace" font-size="11" fill="#6B7280">// User.java → 别名: user 或 User</text>
  <text x="90" y="415" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/typeAliases&gt;</text>
  <rect x="50" y="460" width="700" height="210" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="400" y="490" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold">方式三: 注解方式</text>
  <rect x="70" y="505" width="660" height="150" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="530" font-family="monospace" font-size="11" fill="#FCD34D">// 1. 在实体类上使用 @Alias 注解</text>
  <text x="90" y="550" font-family="monospace" font-size="11" fill="#93C5FD">@Alias("user")</text>
  <text x="90" y="570" font-family="monospace" font-size="11" fill="#E5E7EB">public class User {</text>
  <text x="110" y="590" font-family="monospace" font-size="11" fill="#E5E7EB">...</text>
  <text x="90" y="610" font-family="monospace" font-size="11" fill="#E5E7EB">}</text>
  <text x="90" y="640" font-family="monospace" font-size="11" fill="#FCD34D">// 2. 配置包扫描</text>
  <text x="90" y="660" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;package name="com.example.entity"/&gt;</text>
</svg>

**4. 使用别名前后对比**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">使用别名的好处</text>
  <rect x="50" y="60" width="330" height="300" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="215" y="90" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#991B1B">使用前 (繁琐)</text>
  <rect x="70" y="110" width="290" height="230" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="135" font-family="monospace" font-size="10" fill="#E5E7EB">&lt;select id="selectById"</text>
  <text x="110" y="160" font-family="monospace" font-size="10" fill="#FCA5A5">resultType="com.example.entity.User"&gt;</text>
  <text x="90" y="185" font-family="monospace" font-size="10" fill="#E5E7EB">SELECT * FROM user WHERE id = #{id}</text>
  <text x="90" y="210" font-family="monospace" font-size="10" fill="#E5E7EB">&lt;/select&gt;</text>
  <text x="90" y="245" font-family="monospace" font-size="10" fill="#E5E7EB">&lt;insert id="insert"</text>
  <text x="110" y="270" font-family="monospace" font-size="10" fill="#FCA5A5">parameterType="com.example.entity.User"&gt;</text>
  <text x="90" y="295" font-family="monospace" font-size="10" fill="#E5E7EB">INSERT INTO user...</text>
  <text x="90" y="320" font-family="monospace" font-size="10" fill="#E5E7EB">&lt;/insert&gt;</text>
  <rect x="420" y="60" width="330" height="300" fill="#D1FAE5" stroke="#10B981" stroke-width="2" rx="5"/>
  <text x="585" y="90" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#065F46">使用后 (简洁)</text>
  <rect x="440" y="110" width="290" height="230" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="460" y="135" font-family="monospace" font-size="10" fill="#E5E7EB">&lt;select id="selectById"</text>
  <text x="480" y="160" font-family="monospace" font-size="10" fill="#A7F3D0">resultType="User"&gt;</text>
  <text x="460" y="185" font-family="monospace" font-size="10" fill="#E5E7EB">SELECT * FROM user WHERE id = #{id}</text>
  <text x="460" y="210" font-family="monospace" font-size="10" fill="#E5E7EB">&lt;/select&gt;</text>
  <text x="460" y="245" font-family="monospace" font-size="10" fill="#E5E7EB">&lt;insert id="insert"</text>
  <text x="480" y="270" font-family="monospace" font-size="10" fill="#A7F3D0">parameterType="User"&gt;</text>
  <text x="460" y="295" font-family="monospace" font-size="10" fill="#E5E7EB">INSERT INTO user...</text>
  <text x="460" y="320" font-family="monospace" font-size="10" fill="#E5E7EB">&lt;/insert&gt;</text>
  <rect x="50" y="375" width="700" height="15" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="3"/>
  <text x="400" y="387" text-anchor="middle" font-family="Arial" font-size="10">对比: 全限定名 40+ 字符 → 别名 4 字符,简洁 90%</text>
</svg>

**5. MyBatis 内置别名**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="25" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">MyBatis 内置类型别名</text>
  <rect x="50" y="50" width="700" height="480" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <rect x="70" y="70" width="200" height="30" fill="#DBEAFE" stroke="#2563EB" stroke-width="1" rx="3"/>
  <text x="170" y="90" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">别名</text>
  <rect x="280" y="70" width="200" height="30" fill="#DBEAFE" stroke="#2563EB" stroke-width="1" rx="3"/>
  <text x="380" y="90" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">对应的 Java 类型</text>
  <rect x="490" y="70" width="240" height="30" fill="#DBEAFE" stroke="#2563EB" stroke-width="1" rx="3"/>
  <text x="610" y="90" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">说明</text>
  <text x="85" y="125" font-family="monospace" font-size="11">string</text>
  <text x="295" y="125" font-family="monospace" font-size="11">java.lang.String</text>
  <text x="505" y="125" font-family="Arial" font-size="10">字符串</text>
  <text x="85" y="150" font-family="monospace" font-size="11">int / integer</text>
  <text x="295" y="150" font-family="monospace" font-size="11">java.lang.Integer</text>
  <text x="505" y="150" font-family="Arial" font-size="10">整数(包装类)</text>
  <text x="85" y="175" font-family="monospace" font-size="11">_int</text>
  <text x="295" y="175" font-family="monospace" font-size="11">int</text>
  <text x="505" y="175" font-family="Arial" font-size="10">整数(基本类型)</text>
  <text x="85" y="200" font-family="monospace" font-size="11">long</text>
  <text x="295" y="200" font-family="monospace" font-size="11">java.lang.Long</text>
  <text x="505" y="200" font-family="Arial" font-size="10">长整数(包装类)</text>
  <text x="85" y="225" font-family="monospace" font-size="11">_long</text>
  <text x="295" y="225" font-family="monospace" font-size="11">long</text>
  <text x="505" y="225" font-family="Arial" font-size="10">长整数(基本类型)</text>
  <text x="85" y="250" font-family="monospace" font-size="11">double</text>
  <text x="295" y="250" font-family="monospace" font-size="11">java.lang.Double</text>
  <text x="505" y="250" font-family="Arial" font-size="10">双精度浮点数</text>
  <text x="85" y="275" font-family="monospace" font-size="11">boolean</text>
  <text x="295" y="275" font-family="monospace" font-size="11">java.lang.Boolean</text>
  <text x="505" y="275" font-family="Arial" font-size="10">布尔值</text>
  <text x="85" y="300" font-family="monospace" font-size="11">date</text>
  <text x="295" y="300" font-family="monospace" font-size="11">java.util.Date</text>
  <text x="505" y="300" font-family="Arial" font-size="10">日期</text>
  <text x="85" y="325" font-family="monospace" font-size="11">map</text>
  <text x="295" y="325" font-family="monospace" font-size="11">java.util.Map</text>
  <text x="505" y="325" font-family="Arial" font-size="10">Map 集合</text>
  <text x="85" y="350" font-family="monospace" font-size="11">hashmap</text>
  <text x="295" y="350" font-family="monospace" font-size="11">java.util.HashMap</text>
  <text x="505" y="350" font-family="Arial" font-size="10">HashMap</text>
  <text x="85" y="375" font-family="monospace" font-size="11">list</text>
  <text x="295" y="375" font-family="monospace" font-size="11">java.util.List</text>
  <text x="505" y="375" font-family="Arial" font-size="10">List 集合</text>
  <text x="85" y="400" font-family="monospace" font-size="11">arraylist</text>
  <text x="295" y="400" font-family="monospace" font-size="11">java.util.ArrayList</text>
  <text x="505" y="400" font-family="Arial" font-size="10">ArrayList</text>
  <text x="85" y="425" font-family="monospace" font-size="11">object</text>
  <text x="295" y="425" font-family="monospace" font-size="11">java.lang.Object</text>
  <text x="505" y="425" font-family="Arial" font-size="10">Object 对象</text>
  <text x="85" y="450" font-family="monospace" font-size="11">byte[]</text>
  <text x="295" y="450" font-family="monospace" font-size="11">byte[]</text>
  <text x="505" y="450" font-family="Arial" font-size="10">字节数组</text>
  <text x="85" y="475" font-family="monospace" font-size="11">...</text>
  <text x="295" y="475" font-family="Arial" font-size="10">还有更多内置别名</text>
  <text x="505" y="475" font-family="Arial" font-size="10">查看官方文档</text>
  <rect x="70" y="495" width="660" height="20" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="3"/>
  <text x="400" y="509" text-anchor="middle" font-family="Arial" font-size="10">注意: 内置别名不区分大小写,如 String、string、STRING 都可以</text>
</svg>

**6. 关键要点**

- **作用**: 简化 Java 类型的全限定名
- **三种方式**: 单个配置、包扫描(推荐)、注解
- **推荐方式**: 使用包扫描 + @Alias 注解
- **默认规则**: 包扫描时,别名为类名首字母小写
- **内置别名**: MyBatis 内置常用类型别名,可直接使用
- **不区分大小写**: 别名使用时不区分大小写

**7. 记忆口诀**

**"别名简化全限名,包扫注解最方便"**
- **别名**: typeAliases 类型别名
- **简化**: 简化类名书写
- **全限名**: 全限定类名
- **包扫**: 包扫描方式
- **注解**: @Alias 注解
- **最方便**: 推荐使用方式

### 14. 什么是 settings？常用的配置有哪些？

**1. 核心概念**

settings 是 MyBatis 的**全局配置参数**,用于改变 MyBatis 的运行时行为,如缓存开关、懒加载、驼峰命名转换等,是 MyBatis 性能优化和功能定制的重要配置。

**2. 配置位置和格式**

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
  <text x="350" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">settings 配置格式</text>
  <rect x="50" y="50" width="600" height="230" fill="#1F2937" stroke="#374151" stroke-width="2" rx="5"/>
  <text x="70" y="75" font-family="monospace" font-size="11" fill="#93C5FD">&lt;configuration&gt;</text>
  <text x="90" y="100" font-family="monospace" font-size="11" fill="#93C5FD">&lt;settings&gt;</text>
  <text x="110" y="125" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 开启二级缓存 --&gt;</text>
  <text x="110" y="145" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;setting name="cacheEnabled" value="true"/&gt;</text>
  <text x="110" y="170" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 驼峰命名转换 --&gt;</text>
  <text x="110" y="190" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;setting name="mapUnderscoreToCamelCase" value="true"/&gt;</text>
  <text x="110" y="215" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 延迟加载 --&gt;</text>
  <text x="110" y="235" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;setting name="lazyLoadingEnabled" value="true"/&gt;</text>
  <text x="90" y="260" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/settings&gt;</text>
  <text x="70" y="280" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/configuration&gt;</text>
</svg>

**3. 常用配置参数**

<svg viewBox="0 0 900 750" xmlns="http://www.w3.org/2000/svg">
  <text x="450" y="25" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">settings 常用配置参数</text>
  <rect x="50" y="50" width="800" height="680" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <rect x="70" y="70" width="250" height="30" fill="#DBEAFE" stroke="#2563EB" stroke-width="1" rx="3"/>
  <text x="195" y="90" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">参数名</text>
  <rect x="330" y="70" width="180" height="30" fill="#DBEAFE" stroke="#2563EB" stroke-width="1" rx="3"/>
  <text x="420" y="90" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">默认值</text>
  <rect x="520" y="70" width="310" height="30" fill="#DBEAFE" stroke="#2563EB" stroke-width="1" rx="3"/>
  <text x="675" y="90" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">说明</text>
  <rect x="70" y="105" width="760" height="35" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="2"/>
  <text x="85" y="127" font-family="monospace" font-size="10" font-weight="bold">cacheEnabled ★</text>
  <text x="345" y="127" font-family="monospace" font-size="10">true</text>
  <text x="535" y="127" font-family="Arial" font-size="10">全局开启或关闭二级缓存</text>
  <text x="85" y="165" font-family="monospace" font-size="10" font-weight="bold">lazyLoadingEnabled ★</text>
  <text x="345" y="165" font-family="monospace" font-size="10">false</text>
  <text x="535" y="165" font-family="Arial" font-size="10">全局开启或关闭延迟加载</text>
  <rect x="70" y="180" width="760" height="35" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="2"/>
  <text x="85" y="202" font-family="monospace" font-size="10" font-weight="bold">mapUnderscoreToCamelCase ★</text>
  <text x="345" y="202" font-family="monospace" font-size="10">false</text>
  <text x="535" y="202" font-family="Arial" font-size="10">开启驼峰命名转换(user_name→userName)</text>
  <text x="85" y="240" font-family="monospace" font-size="10">aggressiveLazyLoading</text>
  <text x="345" y="240" font-family="monospace" font-size="10">false</text>
  <text x="535" y="240" font-family="Arial" font-size="10">积极延迟加载,访问对象任意属性时加载所有</text>
  <text x="85" y="275" font-family="monospace" font-size="10">autoMappingBehavior</text>
  <text x="345" y="275" font-family="monospace" font-size="10">PARTIAL</text>
  <text x="535" y="275" font-family="Arial" font-size="10">自动映射行为(NONE/PARTIAL/FULL)</text>
  <text x="85" y="310" font-family="monospace" font-size="10">autoMappingUnknownColumnBehavior</text>
  <text x="345" y="310" font-family="monospace" font-size="10">NONE</text>
  <text x="535" y="310" font-family="Arial" font-size="10">发现未知列时的行为(NONE/WARNING/FAILING)</text>
  <text x="85" y="345" font-family="monospace" font-size="10">defaultExecutorType</text>
  <text x="345" y="345" font-family="monospace" font-size="10">SIMPLE</text>
  <text x="535" y="345" font-family="Arial" font-size="10">默认执行器(SIMPLE/REUSE/BATCH)</text>
  <text x="85" y="380" font-family="monospace" font-size="10">defaultStatementTimeout</text>
  <text x="345" y="380" font-family="monospace" font-size="10">null</text>
  <text x="535" y="380" font-family="Arial" font-size="10">SQL 超时时间(秒)</text>
  <text x="85" y="415" font-family="monospace" font-size="10">defaultFetchSize</text>
  <text x="345" y="415" font-family="monospace" font-size="10">null</text>
  <text x="535" y="415" font-family="Arial" font-size="10">驱动返回结果的默认获取数量</text>
  <text x="85" y="450" font-family="monospace" font-size="10">safeRowBoundsEnabled</text>
  <text x="345" y="450" font-family="monospace" font-size="10">false</text>
  <text x="535" y="450" font-family="Arial" font-size="10">允许嵌套语句使用分页(RowBounds)</text>
  <text x="85" y="485" font-family="monospace" font-size="10">safeResultHandlerEnabled</text>
  <text x="345" y="485" font-family="monospace" font-size="10">true</text>
  <text x="535" y="485" font-family="Arial" font-size="10">允许嵌套语句使用 ResultHandler</text>
  <text x="85" y="520" font-family="monospace" font-size="10">multipleResultSetsEnabled</text>
  <text x="345" y="520" font-family="monospace" font-size="10">true</text>
  <text x="535" y="520" font-family="Arial" font-size="10">允许单条语句返回多结果集</text>
  <text x="85" y="555" font-family="monospace" font-size="10">useColumnLabel</text>
  <text x="345" y="555" font-family="monospace" font-size="10">true</text>
  <text x="535" y="555" font-family="Arial" font-size="10">使用列标签代替列名</text>
  <text x="85" y="590" font-family="monospace" font-size="10">useGeneratedKeys</text>
  <text x="345" y="590" font-family="monospace" font-size="10">false</text>
  <text x="535" y="590" font-family="Arial" font-size="10">允许 JDBC 获取数据库生成的主键</text>
  <text x="85" y="625" font-family="monospace" font-size="10">logImpl</text>
  <text x="345" y="625" font-family="monospace" font-size="10">未设置</text>
  <text x="535" y="625" font-family="Arial" font-size="10">日志实现(SLF4J/LOG4J/LOG4J2/STDOUT等)</text>
  <text x="85" y="660" font-family="monospace" font-size="10">callSettersOnNulls</text>
  <text x="345" y="660" font-family="monospace" font-size="10">false</text>
  <text x="535" y="660" font-family="Arial" font-size="10">null 值是否调用 setter 方法</text>
  <text x="85" y="695" font-family="monospace" font-size="10">returnInstanceForEmptyRow</text>
  <text x="345" y="695" font-family="monospace" font-size="10">false</text>
  <text x="535" y="695" font-family="Arial" font-size="10">空行时返回实例对象还是 null</text>
</svg>

**4. 重点配置详解**

<svg viewBox="0 0=800 650" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="25" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">重点配置详解</text>
  <rect x="50" y="50" width="700" height="120" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="400" y="80" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">1. cacheEnabled (二级缓存开关)</text>
  <text x="70" y="105" font-family="Arial" font-size="11">• true: 开启所有 Mapper 的二级缓存(默认)</text>
  <text x="70" y="125" font-family="Arial" font-size="11">• false: 关闭所有二级缓存</text>
  <text x="70" y="145" font-family="Arial" font-size="11">• 推荐: 开启,可在单个 Mapper 中控制</text>
  <rect x="50" y="185" width="700" height="120" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="400" y="215" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">2. lazyLoadingEnabled (延迟加载)</text>
  <text x="70" y="240" font-family="Arial" font-size="11">• true: 开启全局延迟加载</text>
  <text x="70" y="260" font-family="Arial" font-size="11">• false: 关闭延迟加载,关联对象立即加载(默认)</text>
  <text x="70" y="280" font-family="Arial" font-size="11">• 推荐: 按需开启,避免 N+1 问题</text>
  <rect x="50" y="320" width="700" height="140" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="400" y="350" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">3. mapUnderscoreToCamelCase (驼峰命名转换) ★</text>
  <text x="70" y="375" font-family="Arial" font-size="11">• true: 自动将数据库下划线命名转为驼峰命名</text>
  <text x="70" y="395" font-family="Arial" font-size="11">• false: 不转换(默认)</text>
  <text x="70" y="415" font-family="Arial" font-size="11">• 示例: user_name → userName, create_time → createTime</text>
  <text x="70" y="435" font-family="Arial" font-size="11">• 推荐: 开启,符合 Java 命名规范</text>
  <rect x="50" y="475" width="700" height="120" fill="#DCFCE7" stroke="#22C55E" stroke-width="2" rx="5"/>
  <text x="400" y="505" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">4. logImpl (日志实现)</text>
  <text x="70" y="530" font-family="Arial" font-size="11">• 可选值: SLF4J | LOG4J | LOG4J2 | STDOUT_LOGGING</text>
  <text x="70" y="550" font-family="Arial" font-size="11">• STDOUT_LOGGING: 控制台输出,开发调试推荐</text>
  <text x="70" y="570" font-family="Arial" font-size="11">• 生产环境: 使用 SLF4J 或 LOG4J2</text>
</svg>

**5. 推荐配置示例**

<svg viewBox="0 0 750" y="450" xmlns="http://www.w3.org/2000/svg">
  <text x="375" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">开发环境推荐配置</text>
  <rect x="50" y="50" width="650" height="380" fill="#1F2937" stroke="#374151" stroke-width="2" rx="5"/>
  <text x="70" y="75" font-family="monospace" font-size="11" fill="#93C5FD">&lt;settings&gt;</text>
  <text x="90" y="100" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 开启二级缓存 --&gt;</text>
  <text x="90" y="120" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;setting name="cacheEnabled" value="true"/&gt;</text>
  <text x="90" y="150" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 开启延迟加载 --&gt;</text>
  <text x="90" y="170" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;setting name="lazyLoadingEnabled" value="true"/&gt;</text>
  <text x="90" y="190" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;setting name="aggressiveLazyLoading" value="false"/&gt;</text>
  <text x="90" y="220" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 驼峰命名转换 --&gt;</text>
  <text x="90" y="240" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;setting name="mapUnderscoreToCamelCase" value="true"/&gt;</text>
  <text x="90" y="270" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 开启 JDBC 主键生成 --&gt;</text>
  <text x="90" y="290" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;setting name="useGeneratedKeys" value="true"/&gt;</text>
  <text x="90" y="320" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- 控制台日志输出 --&gt;</text>
  <text x="90" y="340" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;setting name="logImpl" value="STDOUT_LOGGING"/&gt;</text>
  <text x="90" y="370" font-family="monospace" font-size="11" fill="#FCD34D">&lt;!-- SQL 超时时间 30 秒 --&gt;</text>
  <text x="90" y="390" font-family="monospace" font-size="11" fill="#A7F3D0">&lt;setting name="defaultStatementTimeout" value="30"/&gt;</text>
  <text x="70" y="415" font-family="monospace" font-size="11" fill="#93C5FD">&lt;/settings&gt;</text>
</svg>

**6. 关键要点**

- **位置**: mybatis-config.xml 中 properties 之后
- **作用**: 全局配置 MyBatis 运行行为
- **必配推荐**: mapUnderscoreToCamelCase、logImpl
- **性能优化**: cacheEnabled、lazyLoadingEnabled
- **开发调试**: logImpl 设为 STDOUT_LOGGING
- **生产环境**: 关闭 STDOUT_LOGGING,使用专业日志框架

**7. 记忆口诀**

**"缓存懒加驼峰日志,设置全局改行为"**
- **缓存**: cacheEnabled
- **懒加**: lazyLoadingEnabled
- **驼峰**: mapUnderscoreToCamelCase
- **日志**: logImpl
- **设置全局**: settings 全局配置
- **改行为**: 改变运行行为

## Mapper

### 15. 什么是 Mapper 接口？

**1. 核心定义**

Mapper 接口是 MyBatis 中用于**定义数据库操作方法的 Java 接口**,通过动态代理技术,MyBatis 会自动为接口生成实现类,将接口方法与 XML 或注解中的 SQL 语句绑定,实现面向接口的编程。

**2. Mapper 接口特点**

**1) 只需定义接口,无需实现**
- 只定义方法签名,不需要写实现类
- MyBatis 自动生成代理对象
- 运行时动态绑定 SQL

**2) 方法名对应 SQL 的 id**
- 接口方法名 = Mapper.xml 中的 statement id
- namespace = 接口全限定名
- 一一对应关系

**3) 参数和返回值自动映射**
- 方法参数自动映射到 SQL 参数
- SQL 结果自动映射为返回值
- 支持简单类型、对象、集合等

**4) 无需 SqlSession 操作**
- 不需要手动调用 session.selectOne()
- 直接调用接口方法即可
- 代码更简洁优雅

**3. Mapper 接口示例**

<svg viewBox="0 0 800" y="600" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">Mapper 接口定义</text>
  <rect x="50" y="60" width="700" height="520" fill="#1F2937" stroke="#374151" stroke-width="2" rx="5"/>
  <text x="70" y="85" font-family="monospace" font-size="11" fill="#FCD34D">// UserMapper.java</text>
  <text x="70" y="105" font-family="monospace" font-size="11" fill="#93C5FD">package com.example.mapper;</text>
  <text x="70" y="135" font-family="monospace" font-size="11" fill="#93C5FD">import com.example.entity.User;</text>
  <text x="70" y="155" font-family="monospace" font-size="11" fill="#93C5FD">import java.util.List;</text>
  <text x="70" y="185" font-family="monospace" font-size="11" fill="#FCD34D">/** Mapper 接口: 只定义方法,不需要实现 */</text>
  <text x="70" y="205" font-family="monospace" font-size="11" fill="#E5E7EB">public interface UserMapper {</text>
  <text x="90" y="235" font-family="monospace" font-size="11" fill="#FCD34D">// 1. 查询单个用户</text>
  <text x="90" y="255" font-family="monospace" font-size="11" fill="#A7F3D0">User selectById(Long id);</text>
  <text x="90" y="285" font-family="monospace" font-size="11" fill="#FCD34D">// 2. 查询所有用户</text>
  <text x="90" y="305" font-family="monospace" font-size="11" fill="#A7F3D0">List&lt;User&gt; selectAll();</text>
  <text x="90" y="335" font-family="monospace" font-size="11" fill="#FCD34D">// 3. 插入用户</text>
  <text x="90" y="355" font-family="monospace" font-size="11" fill="#A7F3D0">int insert(User user);</text>
  <text x="90" y="385" font-family="monospace" font-size="11" fill="#FCD34D">// 4. 更新用户</text>
  <text x="90" y="405" font-family="monospace" font-size="11" fill="#A7F3D0">int update(User user);</text>
  <text x="90" y="435" font-family="monospace" font-size="11" fill="#FCD34D">// 5. 删除用户</text>
  <text x="90" y="455" font-family="monospace" font-size="11" fill="#A7F3D0">int delete(Long id);</text>
  <text x="90" y="485" font-family="monospace" font-size="11" fill="#FCD34D">// 6. 条件查询</text>
  <text x="90" y="505" font-family="monospace" font-size="11" fill="#A7F3D0">List&lt;User&gt; selectByCondition(User condition);</text>
  <text x="90" y="535" font-family="monospace" font-size="11" fill="#FCD34D">// 7. 分页查询</text>
  <text x="90" y="555" font-family="monospace" font-size="11" fill="#A7F3D0">List&lt;User&gt; selectByPage(@Param("offset") int offset,</text>
  <text x="225" y="575" font-family="monospace" font-size="11" fill="#A7F3D0">@Param("limit") int limit);</text>
  <text x="70" y="600" font-family="monospace" font-size="11" fill="#E5E7EB">}</text>
</svg>

**4. 使用 Mapper 接口**

<svg viewBox="0 0 800" y="400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="25" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Mapper 接口使用示例</text>
  <rect x="50" y="50" width="700" height="330" fill="#1F2937" stroke="#374151" stroke-width="2" rx="5"/>
  <text x="70" y="75" font-family="monospace" font-size="11" fill="#FCD34D">// 1. 获取 SqlSession</text>
  <text x="70" y="95" font-family="monospace" font-size="11" fill="#E5E7EB">SqlSession session = sqlSessionFactory.openSession();</text>
  <text x="70" y="125" font-family="monospace" font-size="11" fill="#FCD34D">// 2. 获取 Mapper 接口代理对象</text>
  <text x="70" y="145" font-family="monospace" font-size="11" fill="#A7F3D0">UserMapper userMapper = session.getMapper(UserMapper.class);</text>
  <text x="70" y="175" font-family="monospace" font-size="11" fill="#FCD34D">// 3. 直接调用接口方法</text>
  <text x="70" y="195" font-family="monospace" font-size="11" fill="#E5E7EB">User user = userMapper.selectById(1L);</text>
  <text x="70" y="215" font-family="monospace" font-size="11" fill="#E5E7EB">List&lt;User&gt; users = userMapper.selectAll();</text>
  <text x="70" y="245" font-family="monospace" font-size="11" fill="#FCD34D">// 4. 插入/更新/删除</text>
  <text x="70" y="265" font-family="monospace" font-size="11" fill="#E5E7EB">int rows = userMapper.insert(newUser);</text>
  <text x="70" y="285" font-family="monospace" font-size="11" fill="#E5E7EB">userMapper.update(user);</text>
  <text x="70" y="305" font-family="monospace" font-size="11" fill="#E5E7EB">userMapper.delete(1L);</text>
  <text x="70" y="335" font-family="monospace" font-size="11" fill="#FCD34D">// 5. 提交并关闭</text>
  <text x="70" y="355" font-family="monospace" font-size="11" fill="#E5E7EB">session.commit();</text>
  <text x="70" y="375" font-family="monospace" font-size="11" fill="#E5E7EB">session.close();</text>
</svg>

**5. Mapper 接口 vs 传统方式对比**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Mapper 接口 vs 传统 SqlSession 方式</text>
  <rect x="50" y="70" width="330" height="340" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="215" y="100" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#991B1B">传统方式 (繁琐)</text>
  <rect x="70" y="120" width="290" height="270" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="145" font-family="monospace" font-size="10" fill="#FCD34D">// 需要记住 SQL statement id</text>
  <text x="90" y="170" font-family="monospace" font-size="10" fill="#FCA5A5">User user = session.selectOne(</text>
  <text x="110" y="190" font-family="monospace" font-size="10" fill="#FCA5A5">"com.example.mapper.UserMapper.selectById",</text>
  <text x="110" y="210" font-family="monospace" font-size="10" fill="#FCA5A5">1L</text>
  <text x="90" y="230" font-family="monospace" font-size="10" fill="#FCA5A5">);</text>
  <text x="90" y="260" font-family="monospace" font-size="10" fill="#FCA5A5">List&lt;User&gt; users = session.selectList(</text>
  <text x="110" y="280" font-family="monospace" font-size="10" fill="#FCA5A5">"com.example.mapper.UserMapper.selectAll"</text>
  <text x="90" y="300" font-family="monospace" font-size="10" fill="#FCA5A5">);</text>
  <text x="90" y="330" font-family="monospace" font-size="10" fill="#FCA5A5">int rows = session.insert(</text>
  <text x="110" y="350" font-family="monospace" font-size="10" fill="#FCA5A5">"com.example.mapper.UserMapper.insert",</text>
  <text x="110" y="370" font-family="monospace" font-size="10" fill="#FCA5A5">user</text>
  <text x="90" y="390" font-family="monospace" font-size="10" fill="#FCA5A5">);</text>
  <rect x="420" y="70" width="330" height="340" fill="#D1FAE5" stroke="#10B981" stroke-width="2" rx="5"/>
  <text x="585" y="100" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#065F46">Mapper 接口 (简洁)</text>
  <rect x="440" y="120" width="290" height="270" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="460" y="145" font-family="monospace" font-size="10" fill="#FCD34D">// 获取 Mapper 接口代理</text>
  <text x="460" y="165" font-family="monospace" font-size="10" fill="#E5E7EB">UserMapper mapper =</text>
  <text x="480" y="185" font-family="monospace" font-size="10" fill="#E5E7EB">session.getMapper(UserMapper.class);</text>
  <text x="460" y="215" font-family="monospace" font-size="10" fill="#FCD34D">// 直接调用接口方法</text>
  <text x="460" y="240" font-family="monospace" font-size="10" fill="#A7F3D0">User user = mapper.selectById(1L);</text>
  <text x="460" y="270" font-family="monospace" font-size="10" fill="#A7F3D0">List&lt;User&gt; users = mapper.selectAll();</text>
  <text x="460" y="300" font-family="monospace" font-size="10" fill="#A7F3D0">int rows = mapper.insert(user);</text>
  <text x="460" y="340" font-family="monospace" font-size="10" fill="#6B7280">// 类型安全、代码提示、易维护</text>
  <rect x="50" y="425" width="700" height="15" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="3"/>
  <text x="400" y="437" text-anchor="middle" font-family="Arial" font-size="10">Mapper 接口方式: 类型安全 + IDE 提示 + 编译检查</text>
</svg>

**6. 关键要点**

- **定义**: 只需定义接口,MyBatis 自动生成实现
- **映射关系**: 接口全限定名 = namespace,方法名 = statement id
- **动态代理**: 运行时生成代理对象,无需手写实现类
- **类型安全**: 编译期检查,避免字符串拼写错误
- **代码简洁**: 直接调用方法,无需 session.selectOne()
- **推荐使用**: Mapper 接口是 MyBatis 的推荐开发方式

**7. 记忆口诀**

**"接口定义不实现,代理绑定SQL现"**
- **接口定义**: 定义 Mapper 接口
- **不实现**: 无需写实现类
- **代理**: 动态代理技术
- **绑定**: 与 XML/注解绑定
- **SQL 现**: SQL 自动执行

### 16. Mapper 接口的工作原理是什么？

**1. 核心原理**

Mapper 接口通过 **JDK 动态代理**机制工作,MyBatis 在运行时为接口生成代理对象,当调用接口方法时,代理对象会拦截调用,根据方法信息查找对应的 SQL 语句并执行。

**2. 工作流程**

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow10" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563"/>
    </marker>
  </defs>
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">Mapper 接口工作流程</text>
  <rect x="250" y="70" width="300" height="50" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="400" y="100" text-anchor="middle" font-family="Arial" font-size="14">1. 调用 Mapper 接口方法</text>
  <rect x="250" y="150" width="300" height="50" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="400" y="180" text-anchor="middle" font-family="Arial" font-size="14">2. JDK 动态代理拦截</text>
  <rect x="250" y="230" width="300" height="50" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="400" y="260" text-anchor="middle" font-family="Arial" font-size="14">3. MapperProxy 处理调用</text>
  <rect x="250" y="310" width="300" height="50" fill="#DCFCE7" stroke="#22C55E" stroke-width="2" rx="5"/>
  <text x="400" y="340" text-anchor="middle" font-family="Arial" font-size="14">4. 查找对应的 MappedStatement</text>
  <rect x="250" y="390" width="300" height="50" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="400" y="420" text-anchor="middle" font-family="Arial" font-size="14">5. 执行 SQL 语句</text>
  <rect x="250" y="470" width="300" height="50" fill="#F3E8FF" stroke="#A855F7" stroke-width="2" rx="5"/>
  <text x="400" y="500" text-anchor="middle" font-family="Arial" font-size="14">6. 结果映射并返回</text>
  <line x1="400" y1="120" x2="400" y2="150" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow10)"/>
  <line x1="400" y1="200" x2="400" y2="230" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow10)"/>
  <line x1="400" y1="280" x2="400" y2="310" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow10)"/>
  <line x1="400" y1="360" x2="400" y2="390" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow10)"/>
  <line x1="400" y1="440" x2="400" y2="470" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow10)"/>
  <rect x="50" y="550" width="700" height="80" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <text x="400" y="575" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">核心机制</text>
  <text x="70" y="595" font-family="Arial" font-size="11">• JDK 动态代理: Proxy.newProxyInstance() 生成代理对象</text>
  <text x="70" y="615" font-family="Arial" font-size="11">• MapperProxy: InvocationHandler 实现类,拦截方法调用</text>
</svg>

**3. 详细原理图解**

<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
  <text x="450" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Mapper 代理原理详解</text>
  <rect x="50" y="60" width="800" height="620" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <rect x="80" y="90" width="350" height="80" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="255" y="115" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">步骤 1: 获取代理对象</text>
  <text x="100" y="140" font-family="monospace" font-size="10">UserMapper mapper =</text>
  <text x="120" y="160" font-family="monospace" font-size="10">session.getMapper(UserMapper.class);</text>
  <rect x="470" y="90" width="350" height="80" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" rx="5"/>
  <text x="645" y="115" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">内部实现</text>
  <text x="490" y="135" font-family="monospace" font-size="9">MapperProxyFactory.newInstance()</text>
  <text x="490" y="155" font-family="monospace" font-size="9">→ Proxy.newProxyInstance(</text>
  <text x="510" y="170" font-family="monospace" font-size="9">classLoader, [UserMapper.class],</text>
  <text x="510" y="185" font-family="monospace" font-size="9">new MapperProxy(...))</text>
  <rect x="80" y="200" width="350" height="100" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="255" y="225" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">步骤 2: 调用接口方法</text>
  <text x="100" y="250" font-family="monospace" font-size="10">User user = mapper.selectById(1L);</text>
  <text x="100" y="275" font-family="Arial" font-size="10">↓</text>
  <text x="100" y="295" font-family="Arial" font-size="10">代理对象拦截方法调用</text>
  <rect x="470" y="200" width="350" height="100" fill="#FEF9C3" stroke="#EAB308" stroke-width="2" rx="5"/>
  <text x="645" y="225" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">方法信息</text>
  <text x="490" y="245" font-family="Arial" font-size="10">• 接口: UserMapper</text>
  <text x="490" y="265" font-family="Arial" font-size="10">• 方法名: selectById</text>
  <text x="490" y="285" font-family="Arial" font-size="10">• 参数: [1L]</text>
  <rect x="80" y="330" width="740" height="120" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="450" y="355" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">步骤 3: MapperProxy.invoke() 处理</text>
  <rect x="100" y="370" width="700" height="65" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="120" y="390" font-family="monospace" font-size="9" fill="#FCD34D">// MapperProxy 的 invoke 方法</text>
  <text x="120" y="405" font-family="monospace" font-size="9" fill="#E5E7EB">public Object invoke(Object proxy, Method method, Object[] args) {</text>
  <text x="140" y="420" font-family="monospace" font-size="9" fill="#A7F3D0">// 构建 statementId = namespace + "." + methodName</text>
  <text x="140" y="435" font-family="monospace" font-size="9" fill="#E5E7EB">return sqlSession.selectOne(statementId, args);</text>
  <text x="120" y="450" font-family="monospace" font-size="9" fill="#E5E7EB">}</text>
  <rect x="80" y="480" width="350" height="80" fill="#DCFCE7" stroke="#22C55E" stroke-width="2" rx="5"/>
  <text x="255" y="505" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">步骤 4: 查找 SQL</text>
  <text x="100" y="530" font-family="Arial" font-size="10">statementId:</text>
  <text x="100" y="550" font-family="monospace" font-size="9">com.example.mapper.UserMapper.selectById</text>
  <rect x="470" y="480" width="350" height="80" fill="#D1FAE5" stroke="#10B981" stroke-width="2" rx="5"/>
  <text x="645" y="505" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">MappedStatement</text>
  <text x="490" y="525" font-family="Arial" font-size="10">• SQL: SELECT * FROM user...</text>
  <text x="490" y="545" font-family="Arial" font-size="10">• resultType: User</text>
  <rect x="80" y="590" width="740" height="70" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="450" y="615" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">步骤 5-6: 执行 SQL 并返回结果</text>
  <text x="100" y="640" font-family="Arial" font-size="10">Executor → StatementHandler → ParameterHandler → ResultSetHandler</text>
  <text x="100" y="655" font-family="Arial" font-size="10">→ 返回映射后的 User 对象</text>
</svg>

**4. 核心类说明**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="25" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">核心类与职责</text>
  <rect x="50" y="50" width="700" height="430" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <rect x="70" y="70" width="250" height="30" fill="#DBEAFE" stroke="#2563EB" stroke-width="1" rx="3"/>
  <text x="195" y="90" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">类名</text>
  <rect x="330" y="70" width="400" height="30" fill="#DBEAFE" stroke="#2563EB" stroke-width="1" rx="3"/>
  <text x="530" y="90" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">职责</text>
  <text x="85" y="125" font-family="monospace" font-size="11" font-weight="bold">MapperRegistry</text>
  <text x="345" y="125" font-family="Arial" font-size="10">注册和管理所有 Mapper 接口</text>
  <text x="85" y="155" font-family="monospace" font-size="11" font-weight="bold">MapperProxyFactory</text>
  <text x="345" y="155" font-family="Arial" font-size="10">Mapper 接口的代理工厂,创建代理对象</text>
  <text x="85" y="185" font-family="monospace" font-size="11" font-weight="bold">MapperProxy</text>
  <text x="345" y="185" font-family="Arial" font-size="10">实现 InvocationHandler,拦截方法调用</text>
  <text x="85" y="215" font-family="monospace" font-size="11" font-weight="bold">MapperMethod</text>
  <text x="345" y="215" font-family="Arial" font-size="10">封装 Mapper 方法的信息和执行逻辑</text>
  <text x="85" y="245" font-family="monospace" font-size="11" font-weight="bold">MappedStatement</text>
  <text x="345" y="245" font-family="Arial" font-size="10">封装一个 SQL 节点的所有信息</text>
  <text x="85" y="275" font-family="monospace" font-size="11" font-weight="bold">Configuration</text>
  <text x="345" y="275" font-family="Arial" font-size="10">全局配置,存储所有映射信息</text>
  <rect x="70" y="300" width="660" height="160" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" rx="5"/>
  <text x="400" y="325" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">关键代码逻辑</text>
  <rect x="90" y="340" width="620" height="105" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="110" y="360" font-family="monospace" font-size="9" fill="#FCD34D">// 1. Configuration 中注册 Mapper</text>
  <text x="110" y="375" font-family="monospace" font-size="9" fill="#E5E7EB">mapperRegistry.addMapper(UserMapper.class);</text>
  <text x="110" y="395" font-family="monospace" font-size="9" fill="#FCD34D">// 2. 获取代理对象</text>
  <text x="110" y="410" font-family="monospace" font-size="9" fill="#E5E7EB">MapperProxyFactory factory = knownMappers.get(type);</text>
  <text x="110" y="425" font-family="monospace" font-size="9" fill="#E5E7EB">return factory.newInstance(sqlSession);</text>
  <text x="110" y="445" font-family="monospace" font-size="9" fill="#FCD34D">// 3. 创建 JDK 代理</text>
  <text x="110" y="460" font-family="monospace" font-size="9" fill="#E5E7EB">Proxy.newProxyInstance(..., new MapperProxy(...));</text>
</svg>

**5. 关键要点**

- **动态代理**: 使用 JDK 动态代理生成接口实现
- **MapperProxy**: InvocationHandler 实现,拦截所有方法调用
- **方法映射**: 接口全限定名.方法名 → MappedStatement
- **无需实现**: 开发者只需定义接口,代理自动生成
- **类型安全**: 编译期检查,避免字符串拼写错误
- **透明调用**: 调用接口方法如同调用普通对象方法

**6. 记忆口诀**

**"动态代理拦方法,映射查找执SQL"**
- **动态代理**: JDK 动态代理
- **拦方法**: MapperProxy 拦截方法调用
- **映射**: 方法映射到 SQL
- **查找**: 查找 MappedStatement
- **执SQL**: 执行 SQL 语句

### 17. Mapper 接口中的方法可以重载吗？

**1. 核心答案**

**不可以**。Mapper 接口中的方法**不支持重载**,因为 MyBatis 使用**接口全限定名 + 方法名**作为唯一标识来查找对应的 SQL 语句,如果方法重载,会导致多个方法映射到同一个 statement id,产生冲突。

**2. 原因分析**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">为什么不能重载?</text>
  <rect x="50" y="70" width="700" height="450" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <rect x="80" y="100" width="640" height="120" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="400" y="130" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold">❌ 错误示例: 方法重载</text>
  <rect x="100" y="150" width="600" height="55" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="120" y="170" font-family="monospace" font-size="10" fill="#FCA5A5">User selectById(Long id);  // 方法1</text>
  <text x="120" y="190" font-family="monospace" font-size="10" fill="#FCA5A5">User selectById(String username);  // 方法2 (重载)</text>
  <rect x="80" y="240" width="640" height="130" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="400" y="270" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">问题分析</text>
  <text x="100" y="295" font-family="Arial" font-size="11">• statement id = com.example.mapper.UserMapper.selectById</text>
  <text x="100" y="315" font-family="Arial" font-size="11">• 两个方法都映射到同一个 id</text>
  <text x="100" y="335" font-family="Arial" font-size="11">• MyBatis 无法区分调用哪个方法</text>
  <text x="100" y="355" font-family="Arial" font-size="11">• 运行时抛出异常: Ambiguous methods detected</text>
  <rect x="80" y="390" width="640" height="110" fill="#D1FAE5" stroke="#10B981" stroke-width="2" rx="5"/>
  <text x="400" y="420" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold">✓ 正确做法: 使用不同方法名</text>
  <rect x="100" y="440" width="600" height="45" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="120" y="460" font-family="monospace" font-size="10" fill="#A7F3D0">User selectById(Long id);</text>
  <text x="120" y="480" font-family="monospace" font-size="10" fill="#A7F3D0">User selectByUsername(String username);</text>
</svg>

**3. 映射机制详解**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Mapper 方法映射机制</text>
  <rect x="50" y="70" width="320" height="340" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="210" y="100" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">Mapper 接口</text>
  <rect x="70" y="120" width="280" height="270" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="140" font-family="monospace" font-size="10" fill="#E5E7EB">public interface UserMapper {</text>
  <rect x="100" y="155" width="230" height="20" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" rx="2"/>
  <text x="110" y="170" font-family="monospace" font-size="10" fill="#1F2937">User selectById(Long id);</text>
  <text x="90" y="200" font-family="monospace" font-size="10" fill="#E5E7EB">List&lt;User&gt; selectAll();</text>
  <text x="90" y="230" font-family="monospace" font-size="10" fill="#E5E7EB">int insert(User user);</text>
  <text x="90" y="260" font-family="monospace" font-size="10" fill="#E5E7EB">int update(User user);</text>
  <text x="90" y="290" font-family="monospace" font-size="10" fill="#E5E7EB">int delete(Long id);</text>
  <text x="90" y="330" font-family="monospace" font-size="10" fill="#E5E7EB">}</text>
  <text x="90" y="360" font-family="Arial" font-size="10" fill="#A7F3D0">接口全限定名:</text>
  <text x="90" y="380" font-family="monospace" font-size="9" fill="#A7F3D0">com.example.mapper.UserMapper</text>
  <rect x="430" y="70" width="320" height="340" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="590" y="100" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">Mapper.xml</text>
  <rect x="450" y="120" width="280" height="270" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="470" y="140" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;mapper namespace="...UserMapper"&gt;</text>
  <rect x="460" y="155" width="270" height="20" fill="#E0F2FE" stroke="#0284C7" stroke-width="1" rx="2"/>
  <text x="470" y="170" font-family="monospace" font-size="9" fill="#1F2937">&lt;select id="selectById"&gt;...&lt;/select&gt;</text>
  <text x="470" y="195" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;select id="selectAll"&gt;...&lt;/select&gt;</text>
  <text x="470" y="220" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;insert id="insert"&gt;...&lt;/insert&gt;</text>
  <text x="470" y="245" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;update id="update"&gt;...&lt;/update&gt;</text>
  <text x="470" y="270" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;delete id="delete"&gt;...&lt;/delete&gt;</text>
  <text x="470" y="305" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;/mapper&gt;</text>
  <text x="470" y="340" font-family="Arial" font-size="10" fill="#A7F3D0">statement id:</text>
  <text x="470" y="360" font-family="monospace" font-size="9" fill="#A7F3D0">namespace + "." + id</text>
  <text x="470" y="380" font-family="monospace" font-size="9" fill="#A7F3D0">= ...UserMapper.selectById</text>
  <line x1="210" y1="165" x2="430" y2="165" stroke="#DC2626" stroke-width="2"/>
  <polygon points="210,165 225,160 225,170" fill="#DC2626"/>
  <polygon points="430,165 415,160 415,170" fill="#DC2626"/>
  <text x="320" y="155" text-anchor="middle" font-family="Arial" font-size="10" fill="#DC2626" font-weight="bold">方法名 = id</text>
</svg>

**4. 解决方案**

<svg viewBox="0 0 750 450" xmlns="http://www.w3.org/2000/svg">
  <text x="375" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">替代方案</text>
  <rect x="50" y="50" width="650" height="130" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="375" y="80" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">方案 1: 使用不同的方法名</text>
  <rect x="70" y="95" width="610" height="70" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="115" font-family="monospace" font-size="10" fill="#A7F3D0">User selectById(Long id);</text>
  <text x="90" y="135" font-family="monospace" font-size="10" fill="#A7F3D0">User selectByUsername(String username);</text>
  <text x="90" y="155" font-family="monospace" font-size="10" fill="#A7F3D0">User selectByEmail(String email);</text>
  <rect x="50" y="200" width="650" height="150" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="375" y="230" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">方案 2: 使用对象封装参数</text>
  <rect x="70" y="245" width="610" height="90" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="265" font-family="monospace" font-size="10" fill="#FCD34D">// 定义查询条件对象</text>
  <text x="90" y="285" font-family="monospace" font-size="10" fill="#E5E7EB">public class UserQuery {</text>
  <text x="110" y="305" font-family="monospace" font-size="10" fill="#E5E7EB">Long id; String username; String email;</text>
  <text x="90" y="325" font-family="monospace" font-size="10" fill="#E5E7EB">}</text>
  <text x="90" y="350" font-family="monospace" font-size="10" fill="#A7F3D0">User selectByCondition(UserQuery query);</text>
  <rect x="50" y="370" width="650" height="70" fill="#DCFCE7" stroke="#22C55E" stroke-width="2" rx="5"/>
  <text x="375" y="400" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">方案 3: 使用 @Param 注解 + 动态 SQL</text>
  <rect x="70" y="415" width="610" height="20" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="430" font-family="monospace" font-size="10" fill="#A7F3D0">List&lt;User&gt; select(@Param("id") Long id, @Param("name") String name);</text>
</svg>

**5. 实际案例对比**

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">错误 vs 正确</text>
  <rect x="50" y="50" width="330" height="220" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" rx="5"/>
  <text x="215" y="80" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#991B1B">❌ 错误: 方法重载</text>
  <rect x="70" y="95" width="290" height="160" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="115" font-family="monospace" font-size="10" fill="#FCA5A5">// 接口</text>
  <text x="90" y="135" font-family="monospace" font-size="10" fill="#FCA5A5">User find(Long id);</text>
  <text x="90" y="155" font-family="monospace" font-size="10" fill="#FCA5A5">User find(String name); // 重载</text>
  <text x="90" y="185" font-family="monospace" font-size="10" fill="#FCA5A5">// XML</text>
  <text x="90" y="205" font-family="monospace" font-size="10" fill="#FCA5A5">&lt;select id="find"&gt;...&lt;/select&gt;</text>
  <text x="90" y="225" font-family="monospace" font-size="10" fill="#FCA5A5">&lt;select id="find"&gt;...&lt;/select&gt;</text>
  <text x="90" y="245" font-family="monospace" font-size="10" fill="#DC2626">// 冲突! 两个 id 相同</text>
  <rect x="420" y="50" width="330" height="220" fill="#D1FAE5" stroke="#10B981" stroke-width="2" rx="5"/>
  <text x="585" y="80" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#065F46">✓ 正确: 不同方法名</text>
  <rect x="440" y="95" width="290" height="160" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="460" y="115" font-family="monospace" font-size="10" fill="#A7F3D0">// 接口</text>
  <text x="460" y="135" font-family="monospace" font-size="10" fill="#A7F3D0">User findById(Long id);</text>
  <text x="460" y="155" font-family="monospace" font-size="10" fill="#A7F3D0">User findByName(String name);</text>
  <text x="460" y="185" font-family="monospace" font-size="10" fill="#A7F3D0">// XML</text>
  <text x="460" y="205" font-family="monospace" font-size="10" fill="#A7F3D0">&lt;select id="findById"&gt;...&lt;/select&gt;</text>
  <text x="460" y="225" font-family="monospace" font-size="10" fill="#A7F3D0">&lt;select id="findByName"&gt;...&lt;/select&gt;</text>
  <text x="460" y="245" font-family="monospace" font-size="10" fill="#10B981">// 正确! 不同的 id</text>
</svg>

**6. 关键要点**

- **不支持重载**: Mapper 接口方法不能重载
- **唯一标识**: namespace + 方法名作为唯一 statement id
- **命名建议**: 使用语义化的方法名,如 selectById、selectByUsername
- **参数封装**: 复杂参数使用对象封装
- **动态 SQL**: 使用动态 SQL 处理多种查询条件
- **编译检查**: 方法重载会导致运行时异常

**7. 记忆口诀**

**"接口方法不重载,唯一标识防冲突"**
- **接口方法**: Mapper 接口方法
- **不重载**: 不支持方法重载
- **唯一标识**: namespace.方法名
- **防冲突**: 避免 statement id 冲突

### 18. 如何定义 Mapper 接口和映射文件的关系？

**1. 核心要点**

Mapper 接口与映射文件通过**三个关键绑定关系**建立联系:**namespace 绑定接口**、**方法名对应 id**、**参数和返回值类型匹配**。

**2. 三大绑定规则**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">Mapper 接口与映射文件绑定规则</text>
  <rect x="50" y="70" width="700" height="150" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="400" y="100" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold">规则 1: namespace = 接口全限定名</text>
  <rect x="70" y="120" width="320" height="80" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="140" font-family="monospace" font-size="10" fill="#FCD34D">// 接口</text>
  <text x="90" y="160" font-family="monospace" font-size="10" fill="#E5E7EB">package com.example.mapper;</text>
  <text x="90" y="180" font-family="monospace" font-size="10" fill="#A7F3D0">public interface UserMapper {</text>
  <text x="110" y="200" font-family="monospace" font-size="10" fill="#E5E7EB">...</text>
  <rect x="410" y="120" width="320" height="80" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="430" y="140" font-family="monospace" font-size="10" fill="#FCD34D">// XML</text>
  <text x="430" y="160" font-family="monospace" font-size="10" fill="#A7F3D0">&lt;mapper namespace=</text>
  <text x="450" y="180" font-family="monospace" font-size="10" fill="#A7F3D0">"com.example.mapper.UserMapper"&gt;</text>
  <text x="430" y="200" font-family="monospace" font-size="10" fill="#E5E7EB">...</text>
  <rect x="50" y="240" width="700" height="150" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="400" y="270" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold">规则 2: 方法名 = statement id</text>
  <rect x="70" y="290" width="320" height="80" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="310" font-family="monospace" font-size="10" fill="#FCD34D">// 接口方法</text>
  <text x="90" y="330" font-family="monospace" font-size="10" fill="#A7F3D0">User selectById(Long id);</text>
  <text x="90" y="350" font-family="monospace" font-size="10" fill="#A7F3D0">int insert(User user);</text>
  <rect x="410" y="290" width="320" height="80" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="430" y="310" font-family="monospace" font-size="10" fill="#FCD34D">// XML statement</text>
  <text x="430" y="330" font-family="monospace" font-size="10" fill="#A7F3D0">&lt;select id="selectById"&gt;...&lt;/select&gt;</text>
  <text x="430" y="350" font-family="monospace" font-size="10" fill="#A7F3D0">&lt;insert id="insert"&gt;...&lt;/insert&gt;</text>
  <rect x="50" y="410" width="700" height="160" fill="#E0E7FF" stroke="#6366F1" stroke-width="2" rx="5"/>
  <text x="400" y="440" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold">规则 3: 参数和返回值类型匹配</text>
  <rect x="70" y="460" width="320" height="90" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="480" font-family="monospace" font-size="10" fill="#FCD34D">// 方法签名</text>
  <text x="90" y="500" font-family="monospace" font-size="10" fill="#A7F3D0">User selectById(Long id);</text>
  <text x="90" y="520" font-family="monospace" font-size="10" fill="#6B7280">// 参数: Long</text>
  <text x="90" y="540" font-family="monospace" font-size="10" fill="#6B7280">// 返回: User</text>
  <rect x="410" y="460" width="320" height="90" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="430" y="480" font-family="monospace" font-size="10" fill="#FCD34D">// SQL 配置</text>
  <text x="430" y="500" font-family="monospace" font-size="10" fill="#A7F3D0">&lt;select id="selectById"</text>
  <text x="450" y="520" font-family="monospace" font-size="10" fill="#A7F3D0">parameterType="long"</text>
  <text x="450" y="540" font-family="monospace" font-size="10" fill="#A7F3D0">resultType="User"&gt;</text>
</svg>

**3. 完整示例**

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">完整配置示例</text>
  <rect x="50" y="60" width="330" height="550" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="215" y="90" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">UserMapper.java</text>
  <rect x="70" y="110" width="290" height="480" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="90" y="130" font-family="monospace" font-size="9" fill="#93C5FD">package com.example.mapper;</text>
  <text x="90" y="155" font-family="monospace" font-size="9" fill="#93C5FD">import com.example.entity.User;</text>
  <text x="90" y="175" font-family="monospace" font-size="9" fill="#93C5FD">import java.util.List;</text>
  <text x="90" y="200" font-family="monospace" font-size="9" fill="#FCD34D">/** ① 接口全限定名 */</text>
  <text x="90" y="220" font-family="monospace" font-size="9" fill="#E5E7EB">public interface UserMapper {</text>
  <text x="110" y="250" font-family="monospace" font-size="9" fill="#FCD34D">/** ② 方法名 = statement id */</text>
  <text x="110" y="270" font-family="monospace" font-size="9" fill="#A7F3D0">User selectById(Long id);</text>
  <text x="110" y="300" font-family="monospace" font-size="9" fill="#A7F3D0">List&lt;User&gt; selectAll();</text>
  <text x="110" y="330" font-family="monospace" font-size="9" fill="#A7F3D0">List&lt;User&gt; selectByName(</text>
  <text x="130" y="350" font-family="monospace" font-size="9" fill="#A7F3D0">@Param("name") String name</text>
  <text x="110" y="370" font-family="monospace" font-size="9" fill="#A7F3D0">);</text>
  <text x="110" y="400" font-family="monospace" font-size="9" fill="#FCD34D">/** ③ 参数和返回值类型 */</text>
  <text x="110" y="420" font-family="monospace" font-size="9" fill="#A7F3D0">int insert(User user);</text>
  <text x="110" y="450" font-family="monospace" font-size="9" fill="#A7F3D0">int update(User user);</text>
  <text x="110" y="480" font-family="monospace" font-size="9" fill="#A7F3D0">int delete(Long id);</text>
  <text x="90" y="510" font-family="monospace" font-size="9" fill="#E5E7EB">}</text>
  <text x="90" y="540" font-family="Arial" font-size="9" fill="#6B7280">全限定名:</text>
  <text x="90" y="560" font-family="monospace" font-size="8" fill="#6B7280">com.example.mapper.UserMapper</text>
  <rect x="420" y="60" width="330" height="550" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="585" y="90" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">UserMapper.xml</text>
  <rect x="440" y="110" width="290" height="480" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="460" y="130" font-family="monospace" font-size="9" fill="#FCD34D">&lt;!-- ① namespace 绑定接口 --&gt;</text>
  <text x="460" y="150" font-family="monospace" font-size="9" fill="#A7F3D0">&lt;mapper namespace=</text>
  <text x="480" y="170" font-family="monospace" font-size="9" fill="#A7F3D0">"com.example.mapper.UserMapper"&gt;</text>
  <text x="470" y="200" font-family="monospace" font-size="9" fill="#FCD34D">&lt;!-- ② id = 方法名 --&gt;</text>
  <text x="470" y="220" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;select id="selectById"</text>
  <text x="490" y="240" font-family="monospace" font-size="9" fill="#E5E7EB">resultType="User"&gt;</text>
  <text x="480" y="260" font-family="monospace" font-size="9" fill="#E5E7EB">SELECT * FROM user WHERE id = #{id}</text>
  <text x="470" y="280" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;/select&gt;</text>
  <text x="470" y="310" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;select id="selectAll"</text>
  <text x="490" y="330" font-family="monospace" font-size="9" fill="#E5E7EB">resultType="User"&gt;</text>
  <text x="480" y="350" font-family="monospace" font-size="9" fill="#E5E7EB">SELECT * FROM user</text>
  <text x="470" y="370" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;/select&gt;</text>
  <text x="470" y="400" font-family="monospace" font-size="9" fill="#FCD34D">&lt;!-- ③ 类型匹配 --&gt;</text>
  <text x="470" y="420" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;insert id="insert"</text>
  <text x="490" y="440" font-family="monospace" font-size="9" fill="#E5E7EB">parameterType="User"&gt;</text>
  <text x="480" y="460" font-family="monospace" font-size="9" fill="#E5E7EB">INSERT INTO user...</text>
  <text x="470" y="480" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;/insert&gt;</text>
  <text x="470" y="510" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;update id="update"&gt;...&lt;/update&gt;</text>
  <text x="470" y="535" font-family="monospace" font-size="9" fill="#E5E7EB">&lt;delete id="delete"&gt;...&lt;/delete&gt;</text>
  <text x="460" y="565" font-family="monospace" font-size="9" fill="#A7F3D0">&lt;/mapper&gt;</text>
</svg>

**4. 文件位置规范**

<svg viewBox="0 0 750 400" xmlns="http://www.w3.org/2000/svg">
  <text x="375" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">推荐的文件组织结构</text>
  <rect x="50" y="50" width="650" height="330" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" rx="5"/>
  <rect x="70" y="70" width="600" height="140" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" rx="5"/>
  <text x="370" y="95" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">方式 1: 同包同名 (推荐)</text>
  <rect x="90" y="110" width="540" height="85" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="110" y="130" font-family="monospace" font-size="10" fill="#FCD34D">src/main/java/com/example/mapper/</text>
  <text x="130" y="150" font-family="monospace" font-size="10" fill="#A7F3D0">└── UserMapper.java</text>
  <text x="110" y="175" font-family="monospace" font-size="10" fill="#FCD34D">src/main/resources/com/example/mapper/</text>
  <text x="130" y="195" font-family="monospace" font-size="10" fill="#A7F3D0">└── UserMapper.xml</text>
  <rect x="70" y="230" width="600" height="130" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
  <text x="370" y="255" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold">方式 2: 分离目录</text>
  <rect x="90" y="270" width="540" height="75" fill="#1F2937" stroke="#374151" stroke-width="1" rx="3"/>
  <text x="110" y="290" font-family="monospace" font-size="10" fill="#FCD34D">src/main/java/com/example/mapper/</text>
  <text x="130" y="310" font-family="monospace" font-size="10" fill="#E5E7EB">└── UserMapper.java</text>
  <text x="110" y="335" font-family="monospace" font-size="10" fill="#FCD34D">src/main/resources/mapper/</text>
  <text x="130" y="355" font-family="monospace" font-size="10" fill="#E5E7EB">└── UserMapper.xml</text>
</svg>

**5. 配置 Mapper 扫描**

<svg viewBox="0 0=750" y="350" xmlns="http://www.w3.org/2000/svg">
  <text x="375" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">mybatis-config.xml 配置</text>
  <rect x="50" y="50" width="650" height="280" fill="#1F2937" stroke="#374151" stroke-width="2" rx="5"/>
  <text x="70" y="75" font-family="monospace" font-size="10" fill="#93C5FD">&lt;mappers&gt;</text>
  <text x="90" y="100" font-family="monospace" font-size="10" fill="#FCD34D">&lt;!-- 方式1: 指定单个 XML 文件 --&gt;</text>
  <text x="90" y="120" font-family="monospace" font-size="10" fill="#E5E7EB">&lt;mapper resource="mapper/UserMapper.xml"/&gt;</text>
  <text x="90" y="150" font-family="monospace" font-size="10" fill="#FCD34D">&lt;!-- 方式2: 指定单个接口 --&gt;</text>
  <text x="90" y="170" font-family="monospace" font-size="10" fill="#E5E7EB">&lt;mapper class="com.example.mapper.UserMapper"/&gt;</text>
  <text x="90" y="200" font-family="monospace" font-size="10" fill="#FCD34D">&lt;!-- 方式3: 扫描包 (推荐) --&gt;</text>
  <text x="90" y="220" font-family="monospace" font-size="10" fill="#A7F3D0">&lt;package name="com.example.mapper"/&gt;</text>
  <text x="90" y="250" font-family="Arial" font-size="10" fill="#6B7280">// 扫描包下所有接口,自动查找同名 XML</text>
  <text x="90" y="280" font-family="Arial" font-size="10" fill="#6B7280">// 要求: XML 与接口同包同名</text>
  <text x="70" y="310" font-family="monospace" font-size="10" fill="#93C5FD">&lt;/mappers&gt;</text>
</svg>

**6. 关键要点**

- **namespace 绑定**: 必须是接口的全限定名
- **方法对应**: 方法名必须与 statement id 完全一致
- **类型匹配**: 参数和返回值类型要匹配
- **推荐位置**: XML 与接口同包同名
- **包扫描**: 使用 package 标签批量注册
- **命名规范**: 建议 XxxMapper.java 对应 XxxMapper.xml

**7. 记忆口诀**

**"空间绑接口,方法对标识,类型要匹配"**
- **空间**: namespace
- **绑接口**: 绑定接口全限定名
- **方法**: 接口方法
- **对标识**: 对应 statement id
- **类型**: 参数和返回值
- **要匹配**: 类型必须匹配

### 19.什么是 Mapper 的注解开发？

**核心答案**

Mapper 注解开发是 MyBatis 提供的一种**无需编写 XML 映射文件，直接在 Mapper 接口方法上使用注解来配置 SQL 语句和结果映射**的开发方式。它让代码更简洁，SQL 和 Java 代码在同一处，便于维护简单的 CRUD 操作。

**详细说明**

**1. 常用注解类型**

```
SQL 操作注解 (4个)
├── @Select    查询操作
├── @Insert    插入操作
├── @Update    更新操作
└── @Delete    删除操作

参数映射注解
├── @Param     指定参数名称
└── @Options   配置选项(主键生成、缓存等)

结果映射注解 (3个)
├── @Results      定义结果集映射
├── @Result       定义字段映射
└── @ResultMap    引用已定义的结果映射

关联查询注解 (2个)
├── @One       一对一关联
└── @Many      一对多关联
```

**2. 基本使用示例**

**简单 CRUD**

```java
public interface UserMapper {

    // 查询单个用户
    @Select("SELECT * FROM user WHERE id = #{id}")
    User findById(@Param("id") Long id);

    // 查询所有用户
    @Select("SELECT * FROM user")
    List<User> findAll();

    // 插入用户(获取自增主键)
    @Insert("INSERT INTO user(name, age, email) VALUES(#{name}, #{age}, #{email})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(User user);

    // 更新用户
    @Update("UPDATE user SET name=#{name}, age=#{age} WHERE id=#{id}")
    int update(User user);

    // 删除用户
    @Delete("DELETE FROM user WHERE id = #{id}")
    int delete(@Param("id") Long id);
}
```

**动态 SQL (使用 Provider)**

```java
public interface UserMapper {

    // 使用 SQL Provider 实现动态 SQL
    @SelectProvider(type = UserSqlProvider.class, method = "selectByCondition")
    List<User> findByCondition(UserQuery query);

    @InsertProvider(type = UserSqlProvider.class, method = "insertSelective")
    int insertSelective(User user);
}

// SQL Provider 类
public class UserSqlProvider {

    public String selectByCondition(UserQuery query) {
        return new SQL() {{
            SELECT("*");
            FROM("user");
            if (query.getName() != null) {
                WHERE("name LIKE #{name}");
            }
            if (query.getAge() != null) {
                WHERE("age = #{age}");
            }
        }}.toString();
    }

    public String insertSelective(User user) {
        return new SQL() {{
            INSERT_INTO("user");
            if (user.getName() != null) {
                VALUES("name", "#{name}");
            }
            if (user.getAge() != null) {
                VALUES("age", "#{age}");
            }
            if (user.getEmail() != null) {
                VALUES("email", "#{email}");
            }
        }}.toString();
    }
}
```

**3. 结果映射示例**

**字段映射不一致**

```java
public interface UserMapper {

    @Results(id = "userResultMap", value = {
        @Result(property = "id", column = "user_id", id = true),
        @Result(property = "userName", column = "user_name"),
        @Result(property = "createTime", column = "create_time")
    })
    @Select("SELECT user_id, user_name, create_time FROM user WHERE user_id = #{id}")
    User findById(@Param("id") Long id);

    // 复用结果映射
    @ResultMap("userResultMap")
    @Select("SELECT user_id, user_name, create_time FROM user")
    List<User> findAll();
}
```

**一对一关联**

```java
public interface OrderMapper {

    @Select("SELECT * FROM `order` WHERE id = #{id}")
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "orderNo", column = "order_no"),
        @Result(property = "user", column = "user_id",
                one = @One(select = "com.example.mapper.UserMapper.findById"))
    })
    Order findById(@Param("id") Long id);
}
```

**一对多关联**

```java
public interface UserMapper {

    @Select("SELECT * FROM user WHERE id = #{id}")
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "name", column = "name"),
        @Result(property = "orders", column = "id",
                many = @Many(select = "com.example.mapper.OrderMapper.findByUserId"))
    })
    User findByIdWithOrders(@Param("id") Long id);
}
```

**4. 注解开发对比图**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead19" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
<polygon points="0 0, 10 3.5, 0 7" fill="#666"></polygon>
</marker>
</defs>
<rect x="50" y="30" width="300" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"></rect>
<text x="200" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#1565c0">XML 映射</text>
<text x="70" y="90" font-size="14" fill="#424242">• 接口: UserMapper.java</text>
<text x="70" y="115" font-size="14" fill="#424242">• 映射: UserMapper.xml</text>
<text x="70" y="140" font-size="14" fill="#424242">• SQL 在 XML 中</text>
<text x="70" y="165" font-size="14" fill="#424242">• 支持复杂动态 SQL</text>
<text x="70" y="190" font-size="14" fill="#424242">• SQL 和代码分离</text>
<rect x="450" y="30" width="300" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"></rect>
<text x="600" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#e65100">注解开发</text>
<text x="470" y="90" font-size="14" fill="#424242">• 接口: UserMapper.java</text>
<text x="470" y="115" font-size="14" fill="#424242">• 映射: @Select/@Insert 等</text>
<text x="470" y="140" font-size="14" fill="#424242">• SQL 在注解中</text>
<text x="470" y="165" font-size="14" fill="#424242">• 适合简单 CRUD</text>
<text x="470" y="190" font-size="14" fill="#424242">• SQL 和代码一体</text>
<rect x="150" y="250" width="500" height="150" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"></rect>
<text x="400" y="280" text-anchor="middle" font-size="16" font-weight="bold" fill="#333">使用建议</text>
<text x="170" y="310" font-size="14" fill="#424242">简单查询:</text>
<text x="270" y="310" font-size="14" fill="#e65100" font-weight="bold">注解开发 ✓</text>
<text x="170" y="335" font-size="14" fill="#424242">复杂动态 SQL:</text>
<text x="310" y="335" font-size="14" fill="#1565c0" font-weight="bold">XML 映射 ✓</text>
<text x="170" y="360" font-size="14" fill="#424242">关联查询:</text>
<text x="270" y="360" font-size="14" fill="#1565c0" font-weight="bold">XML 映射 ✓</text>
<text x="170" y="385" font-size="14" fill="#424242">混合使用:</text>
<text x="270" y="385" font-size="14" fill="#666" font-weight="bold">可以共存 ✓</text>
</svg>

**5. 注解开发的优势**

| 特性 | 说明 |
| :--- | :--- |
| **代码集中** | SQL 和 Java 方法在同一处，无需切换文件 |
| **类型安全** | 编译时检查，减少字符串错误 |
| **简洁高效** | 无需额外 XML 文件，适合简单场景 |
| **快速开发** | CRUD 操作一行注解搞定 |
| **IDE 支持** | 重构、导航更方便 |

**6. 注解开发的局限**

| 局限性 | 影响 |
| :--- | :--- |
| **复杂 SQL 不友好** | 长 SQL 拼接可读性差 |
| **动态 SQL 困难** | 需要 Provider 类，增加复杂度 |
| **XML 功能更强** | 一些高级特性(如 SQL 片段复用)仅 XML 支持 |
| **维护成本** | 修改 SQL 需要重新编译 |

**关键要点**

1.  **注解开发**：在接口方法上用 `@Select/@Insert/@Update/@Delete` 配置 SQL。
2.  **适用场景**：简单的 CRUD 操作，SQL 语句不太复杂。
3.  **Provider 机制**：通过 `@SelectProvider` 等实现动态 SQL。
4.  **结果映射**：使用 `@Results/@Result` 处理字段映射。
5.  **混合使用**：注解和 XML 可以在同一项目中共存。

**记忆口诀**

```
注解开发很简洁，CRUD 注解一行搞
简单查询用注解，复杂 SQL 还靠 XML
Provider 实现动态，Results 映射结果
混合使用无冲突，按需选择是王道
```

**相关问题**

-   XML 配置和注解开发的区别是什么？
-   如何选择使用 XML 还是注解？
-   Mapper 接口的工作原理是什么？


### 20. XML 配置和注解开发的区别是什么?

**核心答案**

XML 配置和注解开发是 MyBatis 中两种不同的开发方式，主要区别体现在配置位置、复杂度支持、可维护性和使用场景上。

**详细说明**

1. **配置方式对比**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.subtitle{font:14px sans-serif;fill:#555}.label{font:13px sans-serif;fill:#333}.code{font:12px monospace;fill:#d63384}.line{stroke:#999;stroke-width:1.5;fill:none}.box{fill:#fff;stroke:#0d6efd;stroke-width:2}.anno-box{fill:#fff;stroke:#198754;stroke-width:2}.highlight{fill:#e7f3ff}.anno-highlight{fill:#e7f5e7}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">XML 配置 vs 注解开发对比</text>
<text x="200" y="60" text-anchor="middle" class="subtitle">XML 配置方式</text>
<text x="600" y="60" text-anchor="middle" class="subtitle">注解开发方式</text>
<line x1="400" y1="70" x2="400" y2="480" class="line" stroke-dasharray="4"/>
<g id="xml-side">
<rect x="20" y="90" width="360" height="80" class="box"/>
<text x="30" y="110" class="label" font-weight="bold">UserMapper.java</text>
<text x="30" y="135" class="code">public interface UserMapper {</text>
<text x="40" y="155" class="code">  User selectById(Long id);</text>
<text x="30" y="165" class="code">}</text>
<rect x="20" y="185" width="360" height="130" class="box"/>
<rect x="25" y="190" width="350" height="30" class="highlight"/>
<text x="30" y="210" class="label" font-weight="bold">UserMapper.xml (SQL 配置在这里)</text>
<text x="30" y="235" class="code">&lt;mapper namespace="UserMapper"&gt;</text>
<text x="40" y="255" class="code">&lt;select id="selectById"</text>
<text x="60" y="270" class="code">resultType="User"&gt;</text>
<text x="50" y="285" class="code">SELECT * FROM user</text>
<text x="50" y="300" class="code">WHERE id = #{id}</text>
<text x="40" y="310" class="code">&lt;/select&gt;</text>
<text x="30" y="330" font-size="12" fill="#0d6efd" font-weight="bold">✓ 支持复杂 SQL</text>
<text x="30" y="350" font-size="12" fill="#0d6efd" font-weight="bold">✓ SQL 与代码解耦</text>
<text x="30" y="370" font-size="12" fill="#0d6efd" font-weight="bold">✓ 易于维护复杂映射</text>
<text x="30" y="390" font-size="12" fill="#dc3545" font-weight="bold">✗ 需要维护两个文件</text>
</g>
<g id="annotation-side">
<rect x="420" y="90" width="360" height="150" class="anno-box"/>
<rect x="425" y="95" width="350" height="30" class="anno-highlight"/>
<text x="430" y="115" class="label" font-weight="bold">UserMapper.java (SQL 配置在这里)</text>
<text x="430" y="140" class="code">public interface UserMapper {</text>
<text x="440" y="160" class="code">@Select("SELECT * FROM user")</text>
<text x="440" y="175" class="code">@Results({</text>
<text x="450" y="190" class="code">@Result(column="id",</text>
<text x="460" y="205" class="code">property="id")</text>
<text x="440" y="220" class="code">})</text>
<text x="440" y="235" class="code">User selectById(Long id);</text>
<text x="430" y="245" class="code">}</text>
<text x="430" y="280" font-size="12" fill="#198754" font-weight="bold">✓ 配置集中在接口</text>
<text x="430" y="300" font-size="12" fill="#198754" font-weight="bold">✓ 代码简洁紧凑</text>
<text x="430" y="320" font-size="12" fill="#198754" font-weight="bold">✓ 适合简单 SQL</text>
<text x="430" y="340" font-size="12" fill="#dc3545" font-weight="bold">✗ 复杂 SQL 难维护</text>
<text x="430" y="360" font-size="12" fill="#dc3545" font-weight="bold">✗ 动态 SQL 需要额外工具</text>
</g>
<g id="legend">
<rect x="150" y="420" width="500" height="60" fill="#f8f9fa" stroke="#ddd" stroke-width="1" rx="5"/>
<text x="400" y="440" text-anchor="middle" font-size="13" font-weight="bold" fill="#555">使用建议</text>
<text x="160" y="460" font-size="12" fill="#0d6efd">• XML 配置:</text>
<text x="240" y="460" font-size="12" fill="#666">复杂 SQL、动态查询、多表关联</text>
<text x="160" y="475" font-size="12" fill="#198754">• 注解开发:</text>
<text x="240" y="475" font-size="12" fill="#666">简单 CRUD、单表操作、快速开发</text>
</g>
</svg>

2. **功能特性对比**

| 对比维度 | XML 配置 | 注解开发 |
|---------|---------|---------|
| **配置位置** | 独立的 XML 文件 | Java 接口方法上 |
| **SQL 复杂度** | 支持任意复杂度 SQL | 简单 SQL 较好，复杂 SQL 难维护 |
| **动态 SQL** | 完整支持 `<if>`、`<foreach>` 等标签 | 需要使用 `@SelectProvider` 等拼接 |
| **结果映射** | 完整的 `<resultMap>` 支持 | `@Results`、`@Result` 较繁琐 |
| **代码耦合度** | SQL 与 Java 代码解耦 | SQL 嵌入在 Java 代码中 |
| **可维护性** | 复杂场景维护性好 | 简单场景维护性好 |
| **开发效率** | 需要维护两个文件 | 快速，只需一个文件 |
| **可读性** | XML 格式清晰，易于阅读大段 SQL | 简单查询一目了然 |
| **重构支持** | IDE 重构支持较弱 | IDE 重构支持较好 |

3. **动态 SQL 对比示例**

**XML 方式（推荐用于复杂场景）:**
```xml
<select id="findUsers" resultType="User">
  SELECT * FROM user
  <where>
    <if test="name != null">
      AND name LIKE #{name}
    </if>
    <if test="age != null">
      AND age = #{age}
    </if>
    <if test="ids != null">
      AND id IN
      <foreach collection="ids" item="id"
               open="(" separator="," close=")">
        #{id}
      </foreach>
    </if>
  </where>
</select>
```

**注解方式（复杂，不推荐）:**
```java
@SelectProvider(type = UserSqlProvider.class, method = "findUsers")
List<User> findUsers(Map<String, Object> params);

// 需要额外的 Provider 类
class UserSqlProvider {
  public String findUsers(Map<String, Object> params) {
    SQL sql = new SQL();
    sql.SELECT("*").FROM("user");
    if (params.get("name") != null) {
      sql.WHERE("name LIKE #{name}");
    }
    if (params.get("age") != null) {
      sql.WHERE("age = #{age}");
    }
    // foreach 逻辑需要手动拼接...
    return sql.toString();
  }
}
```

4. **混合使用策略**

实际项目中，两种方式可以混合使用：

```java
@Mapper
public interface UserMapper {
  // 简单查询用注解
  @Select("SELECT * FROM user WHERE id = #{id}")
  User selectById(Long id);

  @Insert("INSERT INTO user(name, age) VALUES(#{name}, #{age})")
  @Options(useGeneratedKeys = true, keyProperty = "id")
  int insert(User user);

  // 复杂查询用 XML（需要在 UserMapper.xml 中配置）
  List<User> findByConditions(UserQuery query);

  List<User> findWithOrders(Long userId);
}
```

**关键要点**

1. **XML 配置优势**
   - 适合复杂 SQL、多表关联、动态查询
   - SQL 与代码分离，便于 DBA 审查和优化
   - 完整的 MyBatis 功能支持

2. **注解开发优势**
   - 适合简单 CRUD、单表操作
   - 代码集中，快速开发
   - IDE 支持更好（重构、导航）

3. **选择建议**
   - 优先使用 XML 配置（企业级应用主流）
   - 简单操作可使用注解提高开发效率
   - 复杂项目采用混合模式
   - 团队规范统一配置方式

**记忆口诀**

```
XML 配重用，注解配快速
简单用注解，复杂写 XML
动态 SQL 强，还得靠 XML
企业级开发，混合效果佳
```


### 21. 如何选择使用 XML 还是注解?

**核心答案**

根据 SQL 复杂度、团队规范、维护性需求来选择。简单 CRUD 优先注解，复杂查询、动态 SQL、多表关联必须用 XML。

**详细说明**

1. **选择决策树**

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:13px sans-serif;fill:#333}.code{font:11px monospace;fill:#666}.box{fill:#fff;stroke:#0d6efd;stroke-width:2}.decision{fill:#fff5e6;stroke:#fd7e14;stroke-width:2}.result-xml{fill:#e7f3ff;stroke:#0d6efd;stroke-width:2}.result-anno{fill:#e7f5e7;stroke:#198754;stroke-width:2}.line{stroke:#666;stroke-width:2;fill:none;marker-end:url(#arrow)}.yes-line{stroke:#198754;stroke-width:2}.no-line{stroke:#dc3545;stroke-width:2}</style><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker><marker id="yes-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#198754"/></marker><marker id="no-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#dc3545"/></marker></defs>
<text x="400" y="25" text-anchor="middle" class="title">XML vs 注解选择决策树</text>
<ellipse cx="400" cy="70" rx="80" ry="30" class="decision"/>
<text x="400" y="75" text-anchor="middle" class="label" font-weight="bold">开始评估</text>
<line x1="400" y1="100" x2="400" y2="140" class="line"/>
<rect x="300" y="140" width="200" height="50" rx="10" class="decision"/>
<text x="400" y="160" text-anchor="middle" class="label">SQL 是否复杂?</text>
<text x="400" y="177" text-anchor="middle" class="code">(多表/子查询/动态SQL)</text>
<line x1="320" y1="190" x2="150" y2="240" class="yes-line" marker-end="url(#yes-arrow)"/>
<text x="215" y="210" fill="#198754" font-size="12" font-weight="bold">是</text>
<line x1="480" y1="190" x2="650" y2="240" class="no-line" marker-end="url(#no-arrow)"/>
<text x="585" y="210" fill="#dc3545" font-size="12" font-weight="bold">否</text>
<rect x="40" y="240" width="220" height="70" rx="8" class="result-xml"/>
<text x="150" y="265" text-anchor="middle" class="label" font-weight="bold">✓ 使用 XML 配置</text>
<text x="150" y="285" text-anchor="middle" font-size="11" fill="#0d6efd">复杂 SQL 维护性好</text>
<text x="150" y="300" text-anchor="middle" font-size="11" fill="#0d6efd">完整动态 SQL 支持</text>
<rect x="540" y="240" width="220" height="50" rx="10" class="decision"/>
<text x="650" y="260" text-anchor="middle" class="label">是否需要动态</text>
<text x="650" y="277" text-anchor="middle" class="label">条件拼接?</text>
<line x1="590" y1="290" x2="400" y2="340" class="yes-line" marker-end="url(#yes-arrow)"/>
<text x="475" y="310" fill="#198754" font-size="12" font-weight="bold">是</text>
<line x1="710" y1="290" x2="710" y2="340" class="no-line" marker-end="url(#no-arrow)"/>
<text x="735" y="320" fill="#dc3545" font-size="12" font-weight="bold">否</text>
<rect x="290" y="340" width="220" height="70" rx="8" class="result-xml"/>
<text x="400" y="365" text-anchor="middle" class="label" font-weight="bold">✓ 使用 XML 配置</text>
<text x="400" y="385" text-anchor="middle" font-size="11" fill="#0d6efd">动态 SQL 标签强大</text>
<text x="400" y="400" text-anchor="middle" font-size="11" fill="#0d6efd">避免字符串拼接</text>
<rect x="600" y="340" width="220" height="50" rx="10" class="decision"/>
<text x="710" y="360" text-anchor="middle" class="label">是否有多个</text>
<text x="710" y="377" text-anchor="middle" class="label">复杂结果映射?</text>
<line x1="660" y1="390" x2="520" y2="440" class="yes-line" marker-end="url(#yes-arrow)"/>
<text x="570" y="410" fill="#198754" font-size="12" font-weight="bold">是</text>
<line x1="760" y1="390" x2="760" y2="440" class="no-line" marker-end="url(#no-arrow)"/>
<text x="785" y="420" fill="#dc3545" font-size="12" font-weight="bold">否</text>
<rect x="410" y="440" width="220" height="70" rx="8" class="result-xml"/>
<text x="520" y="465" text-anchor="middle" class="label" font-weight="bold">✓ 使用 XML 配置</text>
<text x="520" y="485" text-anchor="middle" font-size="11" fill="#0d6efd">resultMap 功能完整</text>
<text x="520" y="500" text-anchor="middle" font-size="11" fill="#0d6efd">嵌套映射清晰</text>
<rect x="650" y="440" width="220" height="50" rx="10" class="decision"/>
<text x="760" y="460" text-anchor="middle" class="label">团队是否有</text>
<text x="760" y="477" text-anchor="middle" class="label">统一规范?</text>
<line x1="710" y1="490" x2="610" y2="530" class="yes-line" marker-end="url(#yes-arrow)"/>
<text x="640" y="505" fill="#198754" font-size="12" font-weight="bold">是</text>
<line x1="810" y1="490" x2="810" y2="530" class="no-line" marker-end="url(#no-arrow)"/>
<text x="835" y="515" fill="#dc3545" font-size="12" font-weight="bold">否</text>
<rect x="500" y="530" width="220" height="70" rx="8" class="result-xml"/>
<text x="610" y="555" text-anchor="middle" class="label" font-weight="bold">✓ 遵循团队规范</text>
<text x="610" y="575" text-anchor="middle" font-size="11" fill="#666">统一技术栈</text>
<text x="610" y="590" text-anchor="middle" font-size="11" fill="#666">降低维护成本</text>
<rect x="700" y="530" width="220" height="70" rx="8" class="result-anno"/>
<text x="810" y="555" text-anchor="middle" class="label" font-weight="bold">✓ 使用注解开发</text>
<text x="810" y="575" text-anchor="middle" font-size="11" fill="#198754">简单 CRUD 快速</text>
<text x="810" y="590" text-anchor="middle" font-size="11" fill="#198754">代码集中紧凑</text>
</svg>

2. **场景匹配表**

| 场景类型 | 推荐方式 | 理由 |
|---------|---------|------|
| **单表 CRUD** | 注解 | 简单直观，开发快速 |
| **按 ID 查询** | 注解 | 一行 `@Select` 搞定 |
| **简单插入/更新** | 注解 | 无需额外文件 |
| **多表关联查询** | XML | JOIN 语句复杂，XML 可读性好 |
| **动态条件查询** | XML | `<if>`、`<where>` 标签强大 |
| **批量操作** | XML | `<foreach>` 标签方便 |
| **复杂分页查询** | XML | 需要动态 ORDER BY、WHERE |
| **结果嵌套映射** | XML | `<resultMap>` 支持复杂映射 |
| **SQL 频繁变更** | XML | DBA 可独立维护 |
| **快速原型开发** | 注解 | 减少文件切换 |

3. **混合使用最佳实践**

```java
@Mapper
public interface UserMapper {

  // ========== 简单操作用注解 ==========

  @Select("SELECT * FROM user WHERE id = #{id}")
  User findById(Long id);

  @Insert("INSERT INTO user(name, email, age) " +
          "VALUES(#{name}, #{email}, #{age})")
  @Options(useGeneratedKeys = true, keyProperty = "id")
  int insert(User user);

  @Update("UPDATE user SET status = #{status} WHERE id = #{id}")
  int updateStatus(@Param("id") Long id, @Param("status") Integer status);

  @Delete("DELETE FROM user WHERE id = #{id}")
  int deleteById(Long id);

  // ========== 复杂操作用 XML ==========

  // 在 UserMapper.xml 中配置
  List<User> findByConditions(UserQuery query);

  // 复杂分页查询
  List<User> findWithPagination(PageQuery query);

  // 多表关联
  List<UserVO> findUsersWithOrders(@Param("status") Integer status);

  // 批量插入
  int batchInsert(List<User> users);
}
```

4. **企业级项目推荐配置**

**方案一：XML 为主（推荐）**
```
优点:
- 统一配置风格，维护性好
- 完整功能支持，扩展性强
- DBA 可参与 SQL 优化
- 便于代码审查

缺点:
- 需要维护 XML 文件
- 简单操作略显繁琐

适用: 中大型项目、团队协作、长期维护
```

**方案二：混合模式（灵活）**
```
优点:
- 简单操作快速开发
- 复杂操作维护性好
- 灵活适应不同场景

缺点:
- 需要团队规范约束
- 新人学习成本稍高

适用: 快速迭代、中小型项目
```

**方案三：注解为主（不推荐）**
```
优点:
- 开发速度快
- 代码集中

缺点:
- 复杂 SQL 难维护
- 缺少动态 SQL 支持
- 不适合企业级应用

适用: 简单 CRUD 项目、个人项目
```

**关键要点**

1. **XML 优先场景（必须）**
   - 动态 SQL（多条件查询）
   - 多表关联（JOIN 查询）
   - 复杂结果映射（嵌套对象）
   - 批量操作（foreach）

2. **注解优先场景（可选）**
   - 单表 CRUD
   - 按主键查询
   - 简单状态更新
   - 无动态条件的查询

3. **选择原则**
   - 团队规范 > 个人喜好
   - 可维护性 > 开发速度
   - 复杂用 XML，简单用注解
   - 长期项目优先 XML

4. **迁移策略**
   - 注解转 XML：性能无损，可读性提升
   - XML 转注解：需评估 SQL 复杂度
   - 逐步迁移，不要一次性全改

**记忆口诀**

```
简单 CRUD 注解快，复杂查询 XML 佳
动态条件必用 XML，多表关联不用猜
企业项目 XML 主，混合模式也不差
团队规范是关键，统一风格好维护
```

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
## 缓存机制
### 55. MyBatis 有哪些缓存？

**核心答案**

MyBatis 有**两级缓存**：
1. **一级缓存（本地缓存）**：SqlSession 级别，默认开启
2. **二级缓存（全局缓存）**：Mapper 级别，需要手动开启

**详细说明**

1. **两级缓存对比**

   | 特性 | 一级缓存 | 二级缓存 |
   |------|---------|---------|
   | 作用域 | SqlSession | Mapper（namespace） |
   | 生命周期 | SqlSession 关闭后失效 | 应用程序运行期间 |
   | 默认状态 | 默认开启，无法关闭 | 默认关闭，需手动开启 |
   | 数据结构 | PerpetualCache（HashMap） | PerpetualCache + 装饰器 |
   | 线程安全 | 线程隔离（每个线程独立） | 需要考虑并发 |
   | 配置复杂度 | 无需配置 | 需要配置 |
   | 缓存失效 | update/insert/delete 操作 | update/insert/delete 操作 |

2. **缓存层级结构**

<svg viewBox="0 0 750 420" xmlns="http://www.w3.org/2000/svg">
<defs><style>.text{font-family:Arial,sans-serif;font-size:13px;}.title{font-weight:bold;font-size:14px;}</style></defs>
<text x="375" y="25" text-anchor="middle" class="text title" font-size="16">MyBatis 缓存层级</text>
<rect x="50" y="50" width="180" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="80" text-anchor="middle" class="text title">应用程序</text>
<rect x="50" y="140" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="140" y="165" text-anchor="middle" class="text title">SqlSession A</text>
<text x="140" y="185" text-anchor="middle" class="text" font-size="11">一级缓存（默认开启）</text>
<rect x="285" y="140" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="375" y="165" text-anchor="middle" class="text title">SqlSession B</text>
<text x="375" y="185" text-anchor="middle" class="text" font-size="11">一级缓存（默认开启）</text>
<rect x="520" y="140" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="610" y="165" text-anchor="middle" class="text title">SqlSession C</text>
<text x="610" y="185" text-anchor="middle" class="text" font-size="11">一级缓存（默认开启）</text>
<rect x="167" y="250" width="416" height="70" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="375" y="275" text-anchor="middle" class="text title">二级缓存（需手动开启）</text>
<text x="375" y="295" text-anchor="middle" class="text">Mapper 级别 / Namespace 级别</text>
<text x="375" y="310" text-anchor="middle" class="text" font-size="11">跨 SqlSession 共享</text>
<rect x="167" y="360" width="416" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="375" y="390" text-anchor="middle" class="text title">数据库</text>
<path d="M 140 100 L 140 140" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 140 200 L 140 220 L 230 220 L 230 250" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 375 200 L 375 250" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 610 200 L 610 220 L 520 220 L 520 250" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<path d="M 375 320 L 375 360" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
<text x="270" y="237" text-anchor="middle" class="text" fill="#666" font-size="11">未命中</text>
<text x="480" y="237" text-anchor="middle" class="text" fill="#666" font-size="11">未命中</text>
<text x="375" y="345" text-anchor="middle" class="text" fill="#666" font-size="11">未命中</text>
<defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#333"/></marker></defs>
<path d="M 140 220 L 70 220 L 70 120 L 100 120" stroke="#4caf50" stroke-width="2" fill="none" marker-end="url(#arrowhead2)" stroke-dasharray="5,5"/>
<path d="M 375 220 L 305 220 L 305 120 L 335 120" stroke="#4caf50" stroke-width="2" fill="none" marker-end="url(#arrowhead2)" stroke-dasharray="5,5"/>
<path d="M 520 220 L 590 220 L 590 120 L 560 120" stroke="#4caf50" stroke-width="2" fill="none" marker-end="url(#arrowhead2)" stroke-dasharray="5,5"/>
<defs><marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#4caf50"/></marker></defs>
<text x="55" y="165" text-anchor="end" class="text" fill="#4caf50" font-size="10">命中</text>
<text x="295" y="165" text-anchor="end" class="text" fill="#4caf50" font-size="10">命中</text>
<text x="605" y="165" text-anchor="start" class="text" fill="#4caf50" font-size="10">命中</text>
</svg>

3. **查询流程**

   ```
   1. 应用发起查询请求
      ↓
   2. 检查一级缓存（SqlSession）
      ├─ 命中 → 直接返回
      └─ 未命中
         ↓
   3. 检查二级缓存（Mapper）
      ├─ 命中 → 返回并存入一级缓存
      └─ 未命中
         ↓
   4. 查询数据库
      ↓
   5. 结果存入一级缓存
      ↓
   6. SqlSession 提交后，数据进入二级缓存
      ↓
   7. 返回结果
   ```

4. **一级缓存示例**

   ```java
   SqlSession session = factory.openSession();
   UserMapper mapper = session.getMapper(UserMapper.class);

   // 第一次查询，从数据库获取
   User user1 = mapper.selectById(1);
   System.out.println("第一次查询");

   // 第二次查询，从一级缓存获取（不会发 SQL）
   User user2 = mapper.selectById(1);
   System.out.println("第二次查询");

   System.out.println(user1 == user2); // true，同一个对象

   session.close();
   ```

   **控制台输出**
   ```
   DEBUG - ==>  Preparing: SELECT * FROM user WHERE id = ?
   DEBUG - ==> Parameters: 1(Integer)
   DEBUG - <==      Total: 1
   第一次查询
   第二次查询  // 注意：没有 SQL 日志
   true
   ```

5. **一级缓存失效的场景**

   ```java
   SqlSession session = factory.openSession();
   UserMapper mapper = session.getMapper(UserMapper.class);

   // 第一次查询
   User user1 = mapper.selectById(1);

   // 场景1：执行了 update/insert/delete
   mapper.updateUser(new User(2, "张三"));
   User user2 = mapper.selectById(1); // 重新查询数据库

   // 场景2：手动清空缓存
   session.clearCache();
   User user3 = mapper.selectById(1); // 重新查询数据库

   // 场景3：不同的 SqlSession
   SqlSession session2 = factory.openSession();
   UserMapper mapper2 = session2.getMapper(UserMapper.class);
   User user4 = mapper2.selectById(1); // 重新查询数据库

   // 场景4：不同的查询参数
   User user5 = mapper.selectById(2); // 重新查询数据库
   ```

6. **二级缓存示例**

   **配置二级缓存**
   ```xml
   <!-- mybatis-config.xml -->
   <settings>
       <setting name="cacheEnabled" value="true"/>
   </settings>

   <!-- UserMapper.xml -->
   <cache/>  <!-- 开启二级缓存 -->

   <select id="selectById" resultType="User">
       SELECT * FROM user WHERE id = #{id}
   </select>
   ```

   **使用二级缓存**
   ```java
   // Session1 查询
   SqlSession session1 = factory.openSession();
   UserMapper mapper1 = session1.getMapper(UserMapper.class);
   User user1 = mapper1.selectById(1); // 查询数据库
   session1.commit(); // 提交后数据进入二级缓存
   session1.close();

   // Session2 查询
   SqlSession session2 = factory.openSession();
   UserMapper mapper2 = session2.getMapper(UserMapper.class);
   User user2 = mapper2.selectById(1); // 从二级缓存获取
   session2.close();

   System.out.println(user1 == user2); // false，不同对象
   System.out.println(user1.equals(user2)); // true，内容相同
   ```

7. **缓存的数据结构**

   ```
   一级缓存（PerpetualCache）：
   HashMap<CacheKey, Object>
   ├── CacheKey: namespace.id.sql.params.offset.limit
   └── Object: 查询结果

   示例：
   CacheKey = "com.example.UserMapper.selectById:1"
   Value = User(id=1, name="张三")
   ```

   ```
   二级缓存（带装饰器的 PerpetualCache）：
   LruCache (最近最少使用淘汰)
   └── SynchronizedCache (线程安全)
       └── SerializedCache (序列化存储)
           └── PerpetualCache (基础缓存)
   ```

**关键要点**

1. **一级缓存：SqlSession 级别，默认开启，无法关闭**
2. **二级缓存：Mapper 级别，需手动开启，跨 SqlSession 共享**
3. **缓存查询顺序：一级缓存 → 二级缓存 → 数据库**
4. **update/insert/delete 操作会清空缓存**

**记忆口诀**

```
一级缓存 Session 级别，
二级缓存 Mapper 共享，
查询先查一级再二级，
增删改操作会清空。
```

### 56. 什么是一级缓存?一级缓存的作用域是什么?

**核心答案**

一级缓存是 MyBatis 默认开启的缓存机制,作用域是 **SqlSession 级别**。同一个 SqlSession 内相同查询会直接从缓存获取,不再访问数据库。

**详细说明**

**1. 一级缓存特点**

- **默认开启**: 无需配置,自动启用
- **本地缓存**: 存储在 SqlSession 对象内存中
- **生命周期**: 与 SqlSession 相同,SqlSession 关闭则缓存清空
- **不可跨会话**: 不同 SqlSession 之间的缓存互不影响

**2. 工作流程**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="200" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="95" text-anchor="middle" font-size="16" font-weight="bold">SqlSession</text>
<rect x="50" y="180" width="200" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="150" y="215" text-anchor="middle" font-size="14">一级缓存</text>
<text x="150" y="235" text-anchor="middle" font-size="12" fill="#666">(HashMap)</text>
<rect x="550" y="180" width="200" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="650" y="225" text-anchor="middle" font-size="16" font-weight="bold">数据库</text>
<path d="M 150 130 L 150 180" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="160" y="160" font-size="12" fill="#666">查询1</text>
<path d="M 250 220 L 550 220" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="380" y="210" font-size="12" fill="#4caf50">缓存未命中</text>
<text x="380" y="230" font-size="12" fill="#4caf50">查询数据库</text>
<path d="M 550 240 L 250 240" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="380" y="260" font-size="12" fill="#4caf50">返回并缓存</text>
<ellipse cx="150" cy="350" rx="40" ry="30" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="150" y="358" text-anchor="middle" font-size="12">查询2</text>
<path d="M 190 350 L 330 240" stroke="#ff5722" stroke-width="2" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>
<text x="220" y="290" font-size="12" fill="#ff5722">相同查询</text>
<text x="220" y="310" font-size="12" fill="#ff5722">直接返回</text>
<rect x="30" y="420" width="100" height="30" fill="#4caf50" opacity="0.2" rx="3"/>
<text x="80" y="440" text-anchor="middle" font-size="11">首次查询</text>
<rect x="150" y="420" width="100" height="30" fill="#ff5722" opacity="0.2" rx="3"/>
<text x="200" y="440" text-anchor="middle" font-size="11">缓存命中</text>
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**3. 缓存机制**

1. **查询执行**: 首次查询时生成缓存 Key (SQL + 参数 + 分页等)
2. **缓存存储**: 查询结果以 Key-Value 形式存入 HashMap
3. **后续查询**: 相同查询时先查缓存,命中则直接返回
4. **缓存失效**: 执行增删改操作或手动清空会清除缓存

**4. 作用域范围**

| 维度 | 说明 |
|------|------|
| **空间范围** | 仅限当前 SqlSession |
| **时间范围** | SqlSession 从创建到关闭 |
| **隔离性** | 不同 SqlSession 互不影响 |
| **共享性** | 无法跨会话共享 |

**5. 缓存失效情况**

- SqlSession 执行 commit()、rollback()、close()
- SqlSession 执行任何增、删、改操作
- 手动调用 SqlSession.clearCache()
- 查询条件不同(SQL 或参数变化)

**关键要点**

1. 一级缓存默认开启,无法关闭
2. 作用域是 SqlSession,不可跨会话
3. 增删改操作会清空整个一级缓存
4. 适合单次会话内的重复查询场景

**记忆口诀**

> **"一级会话本地存,增删改后自动清"**
> - 一级 = SqlSession 级别
> - 本地存 = 内存 HashMap
> - 自动清 = 写操作清空

### 57. 什么是二级缓存?二级缓存的作用域是什么?

**核心答案**

二级缓存是 MyBatis 提供的跨 SqlSession 的缓存机制,作用域是 **Mapper(Namespace) 级别**。同一个 Mapper 下的所有 SqlSession 共享同一个二级缓存。

**详细说明**

**1. 二级缓存特点**

- **需手动开启**: 默认关闭,需配置启用
- **跨会话共享**: 多个 SqlSession 共享同一缓存
- **Mapper 级别**: 以 namespace 为单位独立缓存
- **分布式支持**: 可集成 Redis 等分布式缓存

**2. 作用域架构**

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="750" height="520" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="8"/>
<text x="425" y="85" text-anchor="middle" font-size="18" font-weight="bold" fill="#333">MyBatis Application</text>
<rect x="100" y="120" width="650" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="6"/>
<text x="425" y="150" text-anchor="middle" font-size="16" font-weight="bold" fill="#1976d2">二级缓存 (Namespace: UserMapper)</text>
<rect x="120" y="180" width="180" height="100" fill="#fff" stroke="#1976d2" stroke-width="2" rx="4"/>
<text x="210" y="210" text-anchor="middle" font-size="14" font-weight="bold">SqlSession 1</text>
<rect x="130" y="225" width="160" height="50" fill="#ffeb3b" opacity="0.3" rx="3"/>
<text x="210" y="255" text-anchor="middle" font-size="12">一级缓存</text>
<rect x="335" y="180" width="180" height="100" fill="#fff" stroke="#1976d2" stroke-width="2" rx="4"/>
<text x="425" y="210" text-anchor="middle" font-size="14" font-weight="bold">SqlSession 2</text>
<rect x="345" y="225" width="160" height="50" fill="#ffeb3b" opacity="0.3" rx="3"/>
<text x="425" y="255" text-anchor="middle" font-size="12">一级缓存</text>
<rect x="550" y="180" width="180" height="100" fill="#fff" stroke="#1976d2" stroke-width="2" rx="4"/>
<text x="640" y="210" text-anchor="middle" font-size="14" font-weight="bold">SqlSession 3</text>
<rect x="560" y="225" width="160" height="50" fill="#ffeb3b" opacity="0.3" rx="3"/>
<text x="640" y="255" text-anchor="middle" font-size="12">一级缓存</text>
<path d="M 210 180 L 210 165 M 425 180 L 425 165 M 640 180 L 640 165" stroke="#4caf50" stroke-width="3" marker-start="url(#arrow2)"/>
<text x="320" y="175" font-size="12" fill="#4caf50" font-weight="bold">共享二级缓存</text>
<rect x="100" y="360" width="650" height="200" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="6"/>
<text x="425" y="390" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">二级缓存 (Namespace: OrderMapper)</text>
<rect x="250" y="420" width="150" height="100" fill="#fff" stroke="#f57c00" stroke-width="2" rx="4"/>
<text x="325" y="445" text-anchor="middle" font-size="14" font-weight="bold">SqlSession 4</text>
<rect x="450" y="420" width="150" height="100" fill="#fff" stroke="#f57c00" stroke-width="2" rx="4"/>
<text x="525" y="445" text-anchor="middle" font-size="14" font-weight="bold">SqlSession 5</text>
<path d="M 325 420 L 325 405 M 525 420 L 525 405" stroke="#4caf50" stroke-width="3" marker-start="url(#arrow2)"/>
<rect x="650" y="120" width="130" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="4"/>
<text x="715" y="155" text-anchor="middle" font-size="12" font-weight="bold">说明</text>
<text x="660" y="180" font-size="11" fill="#333">✓ 同 namespace</text>
<text x="670" y="200" font-size="11" fill="#333">共享缓存</text>
<defs>
<marker id="arrow2" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto">
<polygon points="10 0, 0 3, 10 6" fill="#4caf50"/>
</marker>
</defs>
</svg>

**3. 工作流程**

1. **查询执行**: SqlSession 先查二级缓存,未命中再查一级缓存
2. **数据写入**: SqlSession 提交(commit)后,一级缓存数据写入二级缓存
3. **缓存共享**: 其他 SqlSession 可直接从二级缓存获取数据
4. **缓存失效**: namespace 下任何增删改操作清空该二级缓存

**4. 作用域对比**

| 特性 | 一级缓存 | 二级缓存 |
|------|----------|----------|
| **作用域** | SqlSession | Mapper(Namespace) |
| **生命周期** | SqlSession 级别 | 应用级别 |
| **共享范围** | 单个会话 | 同 namespace 的所有会话 |
| **默认状态** | 默认开启 | 默认关闭 |
| **配置要求** | 无需配置 | 需显式开启 |

**5. 缓存查询顺序**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="150" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="85" text-anchor="middle" font-size="14" font-weight="bold">1. 查询请求</text>
<rect x="50" y="160" width="150" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="125" y="185" text-anchor="middle" font-size="13">2. 二级缓存</text>
<text x="125" y="205" text-anchor="middle" font-size="11" fill="#666">(Mapper级)</text>
<rect x="50" y="270" width="150" height="60" fill="#ffeb3b" opacity="0.5" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="125" y="295" text-anchor="middle" font-size="13">3. 一级缓存</text>
<text x="125" y="315" text-anchor="middle" font-size="11" fill="#666">(Session级)</text>
<rect x="500" y="270" width="150" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="575" y="305" text-anchor="middle" font-size="14" font-weight="bold">4. 数据库</text>
<path d="M 125 110 L 125 160" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<path d="M 125 220 L 125 270" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<path d="M 200 300 L 500 300" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="240" y="145" font-size="11" fill="#666">命中?</text>
<text x="240" y="255" font-size="11" fill="#666">命中?</text>
<text x="330" y="290" font-size="11" fill="#666">未命中</text>
<path d="M 200 190 L 450 80 L 600 80" stroke="#4caf50" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead2)"/>
<text x="380" y="70" font-size="11" fill="#4caf50">命中返回</text>
<path d="M 200 300 L 300 240 L 450 190 L 600 190" stroke="#4caf50" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead2)"/>
<text x="420" y="180" font-size="11" fill="#4caf50">命中返回</text>
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
<marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#4caf50"/>
</marker>
</defs>
</svg>

**6. 使用注意事项**

- 必须实现 Serializable 接口(用于序列化存储)
- SqlSession 需 commit 才会写入二级缓存
- 不同 namespace 的缓存互不影响
- 分布式环境建议使用 Redis 等外部缓存

**关键要点**

1. 二级缓存作用域是 Mapper(Namespace)
2. 多个 SqlSession 共享同一个二级缓存
3. 需显式配置才能开启
4. 查询优先级: 二级缓存 > 一级缓存 > 数据库

**记忆口诀**

> **"二级命名空间共,提交之后才生效"**
> - 二级 = Mapper/Namespace 级别
> - 空间共 = 跨 SqlSession 共享
> - 提交后 = commit 后写入

### 58. 一级缓存和二级缓存的区别是什么?

**核心答案**

一级缓存和二级缓存主要在 **作用域、生命周期、共享范围** 三个方面存在区别:

**详细说明**

**1. 核心区别对比**

| 维度 | 一级缓存 | 二级缓存 |
|------|----------|----------|
| **作用域** | SqlSession | Mapper(Namespace) |
| **生命周期** | SqlSession 创建到关闭 | 应用启动到关闭 |
| **共享范围** | 单个会话内部 | 同 namespace 的所有会话 |
| **默认状态** | 默认开启,无法关闭 | 默认关闭,需手动开启 |
| **存储位置** | SqlSession 内存 | Configuration 对象 |
| **序列化要求** | 无要求 | 必须实现 Serializable |
| **事务要求** | 无特殊要求 | 需 commit 后生效 |
| **失效时机** | 增删改/关闭会话 | namespace 下增删改 |

**2. 架构层次对比**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="450" fill="#fafafa" stroke="#333" stroke-width="2" rx="8"/>
<text x="400" y="85" text-anchor="middle" font-size="18" font-weight="bold">MyBatis 缓存架构</text>
<rect x="100" y="120" width="280" height="350" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="6"/>
<text x="240" y="155" text-anchor="middle" font-size="16" font-weight="bold" fill="#1976d2">一级缓存 (Session级)</text>
<rect x="130" y="180" width="220" height="100" fill="#fff" stroke="#1976d2" stroke-width="2" rx="4"/>
<text x="240" y="210" text-anchor="middle" font-size="14" font-weight="bold">SqlSession A</text>
<ellipse cx="240" cy="250" rx="80" ry="25" fill="#ffeb3b" opacity="0.4" stroke="#fbc02d" stroke-width="2"/>
<text x="240" y="257" text-anchor="middle" font-size="12">LocalCache</text>
<rect x="130" y="310" width="220" height="100" fill="#fff" stroke="#1976d2" stroke-width="2" rx="4"/>
<text x="240" y="340" text-anchor="middle" font-size="14" font-weight="bold">SqlSession B</text>
<ellipse cx="240" cy="380" rx="80" ry="25" fill="#ffeb3b" opacity="0.4" stroke="#fbc02d" stroke-width="2"/>
<text x="240" y="387" text-anchor="middle" font-size="12">LocalCache</text>
<path d="M 195 280 L 195 310" stroke="#ff5722" stroke-width="2" marker-end="url(#cross)"/>
<path d="M 285 280 L 285 310" stroke="#ff5722" stroke-width="2" marker-end="url(#cross)"/>
<text x="380" y="300" font-size="11" fill="#ff5722" font-weight="bold">不共享</text>
<rect x="420" y="120" width="280" height="350" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="6"/>
<text x="560" y="155" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">二级缓存 (Mapper级)</text>
<ellipse cx="560" cy="215" rx="100" ry="35" fill="#4caf50" opacity="0.3" stroke="#388e3c" stroke-width="2"/>
<text x="560" y="220" text-anchor="middle" font-size="13" font-weight="bold">UserMapper Cache</text>
<rect x="440" y="270" width="100" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="4"/>
<text x="490" y="295" text-anchor="middle" font-size="12">Session 1</text>
<text x="490" y="315" text-anchor="middle" font-size="10" fill="#666">共享访问</text>
<rect x="560" y="270" width="100" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="4"/>
<text x="610" y="295" text-anchor="middle" font-size="12">Session 2</text>
<text x="610" y="315" text-anchor="middle" font-size="10" fill="#666">共享访问</text>
<path d="M 490 270 L 530 250" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<path d="M 610 270 L 580 250" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<ellipse cx="560" cy="395" rx="100" ry="35" fill="#9c27b0" opacity="0.3" stroke="#7b1fa2" stroke-width="2"/>
<text x="560" y="400" text-anchor="middle" font-size="13" font-weight="bold">OrderMapper Cache</text>
<rect x="490" y="370" width="60" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="520" y="395" text-anchor="middle" font-size="10">Session 3</text>
<path d="M 520 370 L 535 430" stroke="#7b1fa2" stroke-width="2" marker-start="url(#arrowup)"/>
<text x="440" y="265" font-size="10" fill="#4caf50" font-weight="bold">同namespace</text>
<text x="440" y="445" font-size="10" fill="#7b1fa2" font-weight="bold">不同namespace隔离</text>
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#4caf50"/>
</marker>
<marker id="arrowup" markerWidth="10" markerHeight="10" refX="3" refY="1" orient="auto">
<polygon points="0 10, 3 0, 6 10" fill="#7b1fa2"/>
</marker>
<marker id="cross" markerWidth="12" markerHeight="12" refX="6" refY="6">
<line x1="2" y1="2" x2="10" y2="10" stroke="#ff5722" stroke-width="2"/>
<line x1="10" y1="2" x2="2" y2="10" stroke="#ff5722" stroke-width="2"/>
</marker>
</defs>
</svg>

**3. 查询流程对比**

**一级缓存查询流程:**
1. SqlSession 接收查询请求
2. 检查当前 Session 的 LocalCache
3. 命中则返回,未命中查询数据库
4. 查询结果存入 LocalCache 并返回

**二级缓存查询流程:**
1. SqlSession 接收查询请求
2. 先检查 Mapper 级别的二级缓存
3. 未命中再检查一级缓存
4. 都未命中才查询数据库
5. commit 后一级缓存数据写入二级缓存

**4. 配置要求对比**

**一级缓存配置:**
```xml
<!-- 一级缓存默认开启,无需配置 -->
<!-- 只能通过 localCacheScope 控制范围 -->
<settings>
  <setting name="localCacheScope" value="SESSION"/>
  <!-- SESSION(默认) 或 STATEMENT -->
</settings>
```

**二级缓存配置:**
```xml
<!-- 1. 全局开启 -->
<settings>
  <setting name="cacheEnabled" value="true"/>
</settings>

<!-- 2. Mapper.xml 中启用 -->
<cache/>

<!-- 3. 实体类实现 Serializable -->
public class User implements Serializable {
  // ...
}
```

**5. 失效机制对比**

| 失效场景 | 一级缓存 | 二级缓存 |
|----------|----------|----------|
| **增删改操作** | 清空当前 Session 缓存 | 清空对应 namespace 缓存 |
| **会话关闭** | 缓存销毁 | 缓存保留 |
| **手动清除** | clearCache() | 需清空整个 namespace |
| **跨会话操作** | 不影响 | 所有会话缓存失效 |
| **事务回滚** | 缓存清空 | 未 commit 不写入 |

**6. 使用场景对比**

**一级缓存适用场景:**
- 单次会话内的重复查询
- 事务内的多次相同查询
- 不需要跨会话共享的场景

**二级缓存适用场景:**
- 读多写少的数据(如字典表)
- 需要跨会话共享的数据
- 对实时性要求不高的数据
- 分布式场景配合 Redis 使用

**关键要点**

1. **作用域**: 一级是 Session,二级是 Mapper
2. **共享性**: 一级不共享,二级跨 Session 共享
3. **配置**: 一级默认开启,二级需手动配置
4. **优先级**: 查询时先查二级,再查一级,最后查库

**记忆口诀**

> **"一级会话独占用,二级映射全局通"**
> - 一级独占 = SqlSession 私有
> - 二级全局 = Mapper 共享
> - 查询顺序: 二级 → 一级 → 数据库

### 59. 如何开启二级缓存?

**核心答案**

开启二级缓存需要 **三步配置**:
1. 在 mybatis-config.xml 中设置 `cacheEnabled=true`
2. 在 Mapper.xml 中添加 `<cache/>` 标签
3. 实体类实现 `Serializable` 接口

**详细说明**

**1. 完整配置步骤**

<svg viewBox="0 0 750 450" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="200" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="80" text-anchor="middle" font-size="14" font-weight="bold">步骤1: 全局配置</text>
<text x="150" y="105" text-anchor="middle" font-size="12" fill="#666">mybatis-config.xml</text>
<text x="150" y="120" text-anchor="middle" font-size="11" fill="#1976d2">cacheEnabled=true</text>
<rect x="275" y="50" width="200" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="375" y="80" text-anchor="middle" font-size="14" font-weight="bold">步骤2: Mapper配置</text>
<text x="375" y="105" text-anchor="middle" font-size="12" fill="#666">UserMapper.xml</text>
<text x="375" y="120" text-anchor="middle" font-size="11" fill="#f57c00">添加 &lt;cache/&gt;</text>
<rect x="500" y="50" width="200" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="600" y="80" text-anchor="middle" font-size="14" font-weight="bold">步骤3: 实体类配置</text>
<text x="600" y="105" text-anchor="middle" font-size="12" fill="#666">User.java</text>
<text x="600" y="120" text-anchor="middle" font-size="11" fill="#388e3c">implements Serializable</text>
<path d="M 250 90 L 275 90" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<path d="M 475 90 L 500 90" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="262" y="85" font-size="12" fill="#666">→</text>
<text x="487" y="85" font-size="12" fill="#666">→</text>
<rect x="150" y="180" width="450" height="220" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"/>
<text x="375" y="210" text-anchor="middle" font-size="15" font-weight="bold" fill="#333">配置生效流程</text>
<ellipse cx="200" cy="260" rx="50" ry="35" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="200" y="268" text-anchor="middle" font-size="12">全局开关</text>
<ellipse cx="375" cy="260" rx="50" ry="35" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="375" y="268" text-anchor="middle" font-size="12">Mapper</text>
<text x="375" y="283" text-anchor="middle" font-size="10">缓存区</text>
<ellipse cx="550" cy="260" rx="50" ry="35" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
<text x="550" y="268" text-anchor="middle" font-size="12">可序列化</text>
<path d="M 250 260 L 325 260" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<path d="M 425 260 L 500 260" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="330" width="250" height="50" fill="#4caf50" opacity="0.2" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="375" y="360" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">✓ 二级缓存已启用</text>
<path d="M 375 295 L 375 330" stroke="#4caf50" stroke-width="2" marker-end="url(#arrowhead)"/>
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#333"/>
</marker>
</defs>
</svg>

**2. 步骤一:全局配置(mybatis-config.xml)**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <settings>
    <!-- 开启二级缓存全局开关 -->
    <setting name="cacheEnabled" value="true"/>
  </settings>
</configuration>
```

**3. 步骤二:Mapper配置(UserMapper.xml)**

**基础配置:**
```xml
<mapper namespace="com.example.mapper.UserMapper">
  <!-- 使用默认配置开启二级缓存 -->
  <cache/>

  <select id="findById" resultType="User">
    SELECT * FROM user WHERE id = #{id}
  </select>
</mapper>
```

**高级配置:**
```xml
<mapper namespace="com.example.mapper.UserMapper">
  <!-- 自定义缓存配置 -->
  <cache
    eviction="LRU"
    flushInterval="60000"
    size="512"
    readOnly="false"/>

  <!-- eviction: 缓存回收策略
       - LRU(默认): 最近最少使用
       - FIFO: 先进先出
       - SOFT: 软引用
       - WEAK: 弱引用

    flushInterval: 刷新间隔(毫秒)
    size: 缓存对象数量
    readOnly: 是否只读
       - true: 返回缓存对象引用(性能高,不安全)
       - false(默认): 返回序列化副本(性能低,安全)
  -->
</mapper>
```

**4. 步骤三:实体类配置(User.java)**

```java
import java.io.Serializable;

public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String username;
    private String email;

    // getters and setters
}
```

**为什么需要序列化?**
- 二级缓存可能存储到磁盘或分布式缓存
- 序列化保证对象可正确存储和传输
- readOnly=false 时需要深拷贝对象

**5. 注解方式开启**

```java
@CacheNamespace(
    eviction = FifoCache.class,  // 缓存回收策略
    flushInterval = 60000,       // 刷新间隔
    size = 512,                  // 缓存大小
    readWrite = true,            // 可读写(非只读)
    blocking = false             // 是否阻塞
)
public interface UserMapper {
    @Select("SELECT * FROM user WHERE id = #{id}")
    User findById(Long id);
}
```

**6. 验证缓存是否生效**

```java
public class CacheTest {
    public static void main(String[] args) {
        SqlSessionFactory factory = ...;

        // 第一个会话
        SqlSession session1 = factory.openSession();
        UserMapper mapper1 = session1.getMapper(UserMapper.class);
        User user1 = mapper1.findById(1L);
        session1.commit();  // 必须commit才写入二级缓存
        session1.close();

        // 第二个会话
        SqlSession session2 = factory.openSession();
        UserMapper mapper2 = session2.getMapper(UserMapper.class);
        User user2 = mapper2.findById(1L);  // 从二级缓存获取
        session2.close();

        // 如果开启日志,会看到只执行一次SQL
    }
}
```

**7. 配置注意事项**

| 配置项 | 必选 | 说明 |
|--------|------|------|
| **cacheEnabled** | 是 | 全局开关,默认 true |
| **&lt;cache/&gt;** | 是 | 必须在每个 Mapper 中声明 |
| **Serializable** | 视情况 | readOnly=false 时必须 |
| **commit** | 是 | 不 commit 不写入缓存 |

**8. 集成第三方缓存(Redis示例)**

```xml
<mapper namespace="com.example.mapper.UserMapper">
  <!-- 使用 Redis 作为二级缓存 -->
  <cache type="org.mybatis.caches.redis.RedisCache"/>
</mapper>
```

```xml
<!-- pom.xml 添加依赖 -->
<dependency>
  <groupId>org.mybatis.caches</groupId>
  <artifactId>mybatis-redis</artifactId>
  <version>1.0.0-beta2</version>
</dependency>
```

**关键要点**

1. **三步配置**: 全局开关 + Mapper 声明 + 实体序列化
2. **commit 必须**: SqlSession 必须 commit 才写入二级缓存
3. **序列化要求**: readOnly=false 时必须实现 Serializable
4. **独立配置**: 每个 Mapper 可独立配置缓存策略

**记忆口诀**

> **"全局开关先打开,映射文件加标签,实体序列不能忘,提交事务才生效"**
> - 全局开关 = cacheEnabled
> - 加标签 = &lt;cache/&gt;
> - 实体序列 = Serializable
> - 提交事务 = commit()

### 60. 什么情况下缓存会失效?

**核心答案**

MyBatis 缓存失效主要发生在以下情况:
1. **增删改操作**:执行 INSERT、UPDATE、DELETE 会清空缓存
2. **会话关闭**:SqlSession 关闭导致一级缓存失效
3. **手动清除**:调用 clearCache() 方法
4. **查询条件变化**:SQL 或参数不同导致缓存未命中

**详细说明**

**1. 一级缓存失效场景**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="450" fill="#fafafa" stroke="#333" stroke-width="2" rx="8"/>
<text x="400" y="85" text-anchor="middle" font-size="18" font-weight="bold">一级缓存失效场景</text>
<rect x="100" y="120" width="280" height="100" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="240" y="150" text-anchor="middle" font-size="14" font-weight="bold">场景1: 执行增删改</text>
<text x="130" y="175" font-size="12" fill="#666">• INSERT / UPDATE / DELETE</text>
<text x="130" y="195" font-size="12" fill="#666">• 清空整个 SqlSession 缓存</text>
<text x="130" y="210" font-size="11" fill="#f44336">⚠️ 任何写操作都会清空</text>
<rect x="420" y="120" width="280" height="100" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="560" y="150" text-anchor="middle" font-size="14" font-weight="bold">场景2: 会话关闭</text>
<text x="450" y="175" font-size="12" fill="#666">• session.close()</text>
<text x="450" y="195" font-size="12" fill="#666">• session.commit()</text>
<text x="450" y="210" font-size="11" fill="#ff9800">⚠️ 生命周期结束</text>
<rect x="100" y="250" width="280" height="100" fill="#e8eaf6" stroke="#3f51b5" stroke-width="2" rx="5"/>
<text x="240" y="280" text-anchor="middle" font-size="14" font-weight="bold">场景3: 手动清除</text>
<text x="130" y="305" font-size="12" fill="#666">• session.clearCache()</text>
<text x="130" y="325" font-size="12" fill="#666">• 主动清空当前会话缓存</text>
<text x="130" y="340" font-size="11" fill="#3f51b5">ℹ️ 很少使用</text>
<rect x="420" y="250" width="280" height="100" fill="#e0f2f1" stroke="#009688" stroke-width="2" rx="5"/>
<text x="560" y="280" text-anchor="middle" font-size="14" font-weight="bold">场景4: 查询条件变化</text>
<text x="450" y="305" font-size="12" fill="#666">• SQL 语句不同</text>
<text x="450" y="325" font-size="12" fill="#666">• 参数值不同</text>
<text x="450" y="340" font-size="11" fill="#009688">ℹ️ 缓存Key不匹配</text>
<rect x="260" y="380" width="280" height="100" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="410" text-anchor="middle" font-size="14" font-weight="bold">场景5: localCacheScope=STATEMENT</text>
<text x="290" y="435" font-size="12" fill="#666">• 每条语句执行后清除</text>
<text x="290" y="455" font-size="12" fill="#666">• 配置关闭一级缓存</text>
<text x="290" y="470" font-size="11" fill="#9c27b0">⚠️ 性能影响大</text>
</svg>

**2. 二级缓存失效场景**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="400" fill="#fafafa" stroke="#333" stroke-width="2" rx="8"/>
<text x="400" y="85" text-anchor="middle" font-size="18" font-weight="bold">二级缓存失效场景</text>
<rect x="100" y="120" width="280" height="100" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="240" y="150" text-anchor="middle" font-size="14" font-weight="bold">场景1: Namespace写操作</text>
<text x="130" y="175" font-size="12" fill="#666">• 对应Mapper的增删改</text>
<text x="130" y="195" font-size="12" fill="#666">• 清空该namespace所有缓存</text>
<text x="130" y="210" font-size="11" fill="#f44336">⚠️ 影响所有SqlSession</text>
<rect x="420" y="120" width="280" height="100" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="560" y="150" text-anchor="middle" font-size="14" font-weight="bold">场景2: 未提交事务</text>
<text x="450" y="175" font-size="12" fill="#666">• SqlSession未commit</text>
<text x="450" y="195" font-size="12" fill="#666">• 一级缓存未写入二级</text>
<text x="450" y="210" font-size="11" fill="#ff9800">⚠️ 必须commit</text>
<rect x="100" y="250" width="280" height="100" fill="#e8eaf6" stroke="#3f51b5" stroke-width="2" rx="5"/>
<text x="240" y="280" text-anchor="middle" font-size="14" font-weight="bold">场景3: flushInterval超时</text>
<text x="130" y="305" font-size="12" fill="#666">• 配置的刷新间隔到期</text>
<text x="130" y="325" font-size="12" fill="#666">• 自动清空缓存</text>
<text x="130" y="340" font-size="11" fill="#3f51b5">ℹ️ 定时清理机制</text>
<rect x="420" y="250" width="280" height="100" fill="#e0f2f1" stroke="#009688" stroke-width="2" rx="5"/>
<text x="560" y="280" text-anchor="middle" font-size="14" font-weight="bold">场景4: flushCache=true</text>
<text x="450" y="305" font-size="12" fill="#666">• 标签配置强制刷新</text>
<text x="450" y="325" font-size="12" fill="#666">• 每次查询都清空</text>
<text x="450" y="340" font-size="11" fill="#009688">ℹ️ 很少使用</text>
</svg>

**3. 具体失效示例**

**示例1: 增删改导致一级缓存失效**

```java
SqlSession session = factory.openSession();
UserMapper mapper = session.getMapper(UserMapper.class);

// 第一次查询,结果进入缓存
User user1 = mapper.findById(1L);  // SQL: SELECT * FROM user WHERE id = 1

// 执行更新操作,清空一级缓存
mapper.updateUser(user);           // 一级缓存被清空

// 第二次查询,缓存已失效,重新查询数据库
User user2 = mapper.findById(1L);  // SQL: SELECT * FROM user WHERE id = 1
```

**示例2: 二级缓存失效**

```java
// 会话1: 查询并提交
SqlSession session1 = factory.openSession();
UserMapper mapper1 = session1.getMapper(UserMapper.class);
User user1 = mapper1.findById(1L);  // 查询数据库
session1.commit();                  // 写入二级缓存
session1.close();

// 会话2: 更新操作,清空二级缓存
SqlSession session2 = factory.openSession();
UserMapper mapper2 = session2.getMapper(UserMapper.class);
mapper2.updateUser(user);           // 清空UserMapper的二级缓存
session2.commit();
session2.close();

// 会话3: 查询,二级缓存已失效
SqlSession session3 = factory.openSession();
UserMapper mapper3 = session3.getMapper(UserMapper.class);
User user3 = mapper3.findById(1L);  // 重新查询数据库
session3.close();
```

**4. 缓存失效对比表**

| 失效场景 | 一级缓存 | 二级缓存 | 影响范围 |
|----------|----------|----------|----------|
| **INSERT操作** | ✓ 清空 | ✓ 清空 | 当前Session / 整个Namespace |
| **UPDATE操作** | ✓ 清空 | ✓ 清空 | 当前Session / 整个Namespace |
| **DELETE操作** | ✓ 清空 | ✓ 清空 | 当前Session / 整个Namespace |
| **commit()** | ✓ 清空 | ✗ 不清空 | 当前Session |
| **close()** | ✓ 销毁 | ✗ 不销毁 | 当前Session |
| **clearCache()** | ✓ 清空 | ✗ 不影响 | 当前Session |
| **查询条件变化** | ✗ 未命中 | ✗ 未命中 | Key不匹配 |
| **超时(flushInterval)** | ✗ 无影响 | ✓ 清空 | 整个Namespace |

**5. 特殊配置影响**

**useCache 配置:**
```xml
<select id="findById" resultType="User" useCache="false">
  SELECT * FROM user WHERE id = #{id}
  <!-- useCache=false: 不使用二级缓存 -->
</select>
```

**flushCache 配置:**
```xml
<select id="findAll" resultType="User" flushCache="true">
  SELECT * FROM user
  <!-- flushCache=true: 每次查询清空缓存 -->
</select>

<update id="updateUser" flushCache="true">
  UPDATE user SET name = #{name} WHERE id = #{id}
  <!-- 更新操作默认 flushCache=true -->
</update>
```

**localCacheScope 配置:**
```xml
<settings>
  <!-- SESSION: 会话级缓存(默认) -->
  <!-- STATEMENT: 语句级缓存(查询后立即清空) -->
  <setting name="localCacheScope" value="STATEMENT"/>
</settings>
```

**6. 避免缓存失效的建议**

1. **读写分离**: 读操作不影响缓存,写操作清空缓存
2. **合理使用二级缓存**: 只对读多写少的数据开启
3. **注意跨Mapper影响**: 不同Mapper修改同一数据可能导致脏读
4. **分布式场景**: 使用Redis等外部缓存保证一致性

**关键要点**

1. **增删改必失效**: 任何写操作都会清空缓存
2. **一级缓存短命**: SqlSession 关闭即失效
3. **二级缓存持久**: 只有写操作或超时才失效
4. **查询条件敏感**: SQL 或参数变化导致缓存未命中

**记忆口诀**

> **"增删改必清,关闭毁一级,提交写二级,条件变失效"**
> - 增删改清空缓存
> - close() 销毁一级缓存
> - commit() 写入二级缓存
> - 查询条件变化无法命中

### 61. 如何清除缓存？

**核心答案**

MyBatis 提供了多种方式清除缓存：一级缓存通过 commit、rollback、close 或手动调用 clearCache() 清除；二级缓存通过配置 flushCache 属性、手动调用方法或设置缓存刷新间隔清除。

**详细说明**

1. **一级缓存清除方式**
   - **自动清除**：
     - 执行 commit() 操作
     - 执行 rollback() 操作
     - 执行 close() 关闭 SqlSession
     - 执行任何 insert、update、delete 操作
   - **手动清除**：
     - 调用 `sqlSession.clearCache()` 方法

2. **二级缓存清除方式**
   - **配置清除**：在 SQL 映射中设置 `flushCache="true"`
   - **全局清除**：在配置文件中设置缓存刷新间隔
   - **手动清除**：调用 Cache 对象的 clear() 方法
   - **自动清除**：执行增删改操作时自动清除

3. **清除时机对比**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="380" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">缓存清除时机</text>
<rect x="80" y="90" width="300" height="300" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="230" y="115" text-anchor="middle" font-size="16" font-weight="bold" fill="#1976d2">一级缓存清除</text>
<text x="100" y="145" font-size="13" fill="#424242">1. SqlSession 关闭</text>
<text x="100" y="175" font-size="13" fill="#424242">2. 执行 commit()</text>
<text x="100" y="205" font-size="13" fill="#424242">3. 执行 rollback()</text>
<text x="100" y="235" font-size="13" fill="#424242">4. 执行 clearCache()</text>
<text x="100" y="265" font-size="13" fill="#424242">5. 执行 update 操作</text>
<text x="100" y="295" font-size="13" fill="#424242">6. 执行 insert 操作</text>
<text x="100" y="325" font-size="13" fill="#424242">7. 执行 delete 操作</text>
<rect x="100" y="340" width="260" height="35" fill="#fff3e0" stroke="#ff9800" stroke-width="1" rx="3"/>
<text x="230" y="363" text-anchor="middle" font-size="12" fill="#e65100">作用域：SqlSession</text>
<rect x="420" y="90" width="300" height="300" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="570" y="115" text-anchor="middle" font-size="16" font-weight="bold" fill="#7b1fa2">二级缓存清除</text>
<text x="440" y="145" font-size="13" fill="#424242">1. 设置 flushCache="true"</text>
<text x="440" y="175" font-size="13" fill="#424242">2. 执行增删改操作</text>
<text x="440" y="205" font-size="13" fill="#424242">3. 缓存刷新间隔到期</text>
<text x="440" y="235" font-size="13" fill="#424242">4. 手动调用 clear()</text>
<text x="440" y="265" font-size="13" fill="#424242">5. 缓存达到最大容量</text>
<text x="440" y="295" font-size="13" fill="#424242">6. LRU 策略淘汰</text>
<rect x="440" y="340" width="260" height="35" fill="#fff3e0" stroke="#ff9800" stroke-width="1" rx="3"/>
<text x="570" y="363" text-anchor="middle" font-size="12" fill="#e65100">作用域：Namespace</text>
</svg>

4. **配置示例**

**一级缓存手动清除：**
```java
SqlSession sqlSession = sqlSessionFactory.openSession();
try {
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);

    // 第一次查询，从数据库获取
    User user1 = mapper.getUserById(1);

    // 手动清除一级缓存
    sqlSession.clearCache();

    // 第二次查询，重新从数据库获取
    User user2 = mapper.getUserById(1);
} finally {
    sqlSession.close();
}
```

**二级缓存配置清除：**
```xml
<!-- 查询时不清除缓存（默认） -->
<select id="getUserById" resultType="User" flushCache="false">
    SELECT * FROM user WHERE id = #{id}
</select>

<!-- 更新时清除缓存（默认） -->
<update id="updateUser" flushCache="true">
    UPDATE user SET name = #{name} WHERE id = #{id}
</update>
```

**配置缓存刷新间隔：**
```xml
<cache flushInterval="60000"/> <!-- 60秒自动刷新 -->
```

5. **清除策略选择**

| 场景 | 推荐方式 | 说明 |
|------|---------|------|
| 事务回滚 | 自动清除 | rollback() 自动清除一级缓存 |
| 数据更新 | 自动清除 | 增删改操作自动清除缓存 |
| 强制刷新 | clearCache() | 需要确保数据最新时使用 |
| 定时刷新 | flushInterval | 适合数据变化不频繁的场景 |
| 批量操作 | flushCache="true" | 确保批量操作后缓存同步 |

**关键要点**

1. **一级缓存**：SqlSession 级别，事务操作自动清除
2. **二级缓存**：Namespace 级别，需配置清除策略
3. **自动 vs 手动**：大多数情况依赖自动清除，特殊场景手动清除
4. **清除粒度**：一级缓存全部清除，二级缓存可按 namespace 清除
5. **性能影响**：频繁清除会降低缓存效果，需平衡数据一致性

**记忆口诀**

"一级清除七时机，二级配置六方式，增删改查要注意，缓存一致是关键"

### 62. MyBatis 如何整合第三方缓存（如 Redis）？

**核心答案**

MyBatis 通过实现 Cache 接口来整合第三方缓存。对于 Redis，可以使用 mybatis-redis 模块或自定义实现 Cache 接口，将缓存操作委托给 Redis 客户端（如 Jedis、Lettuce）。

**详细说明**

1. **整合方式**
   - **使用官方模块**：mybatis-redis（推荐）
   - **自定义实现**：实现 org.apache.ibatis.cache.Cache 接口
   - **使用第三方库**：如 mybatis-ehcache、mybatis-caffeine

2. **整合架构**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="440" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">MyBatis 整合 Redis 架构</text>
<rect x="320" y="90" width="160" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">MyBatis</text>
<line x1="400" y1="140" x2="400" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="320" y="180" width="160" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="210" text-anchor="middle" font-size="14" font-weight="bold" fill="#e65100">Cache Interface</text>
<line x1="400" y1="230" x2="400" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="120" y="270" width="180" height="60" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="210" y="295" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">RedisCache</text>
<text x="210" y="315" text-anchor="middle" font-size="11" fill="#4a148c">(Custom Impl)</text>
<rect x="500" y="270" width="180" height="60" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="590" y="295" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">MybatisRedisCache</text>
<text x="590" y="315" text-anchor="middle" font-size="11" fill="#4a148c">(Official Module)</text>
<line x1="300" y1="230" x2="210" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="500" y1="230" x2="590" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="210" y1="330" x2="210" y2="370" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="590" y1="330" x2="590" y2="370" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="120" y="370" width="180" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="210" y="400" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">Jedis/Lettuce</text>
<rect x="500" y="370" width="180" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="590" y="400" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">JedisPool</text>
<line x1="210" y1="420" x2="210" y2="440" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="590" y1="420" x2="590" y2="440" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<ellipse cx="400" cy="450" rx="100" ry="25" fill="#ffebee" stroke="#f44336" stroke-width="2"/>
<text x="400" y="458" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">Redis Server</text>
<line x1="300" y1="450" x2="210" y2="440" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="500" y1="450" x2="590" y2="440" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
</svg>

3. **使用官方 mybatis-redis**

**添加依赖：**
```xml
<dependency>
    <groupId>org.mybatis.caches</groupId>
    <artifactId>mybatis-redis</artifactId>
    <version>1.0.0-beta2</version>
</dependency>
```

**配置 redis.properties：**
```properties
host=localhost
port=6379
connectionTimeout=5000
soTimeout=5000
password=
database=0
clientName=mybatis-redis
```

**在 Mapper.xml 中使用：**
```xml
<cache type="org.mybatis.caches.redis.RedisCache"/>
```

4. **自定义 Redis 缓存实现**

```java
public class MyRedisCache implements Cache {
    private final String id;
    private static RedisTemplate<String, Object> redisTemplate;

    // 静态设置 RedisTemplate
    public static void setRedisTemplate(RedisTemplate<String, Object> template) {
        redisTemplate = template;
    }

    public MyRedisCache(String id) {
        if (id == null) {
            throw new IllegalArgumentException("Cache ID cannot be null");
        }
        this.id = id;
    }

    @Override
    public String getId() {
        return this.id;
    }

    @Override
    public void putObject(Object key, Object value) {
        if (value != null) {
            // 使用 namespace:key 作为 Redis 键
            String redisKey = id + ":" + key.toString();
            redisTemplate.opsForValue().set(redisKey, value, 30, TimeUnit.MINUTES);
        }
    }

    @Override
    public Object getObject(Object key) {
        String redisKey = id + ":" + key.toString();
        return redisTemplate.opsForValue().get(redisKey);
    }

    @Override
    public Object removeObject(Object key) {
        String redisKey = id + ":" + key.toString();
        return redisTemplate.delete(redisKey);
    }

    @Override
    public void clear() {
        // 清除当前 namespace 的所有缓存
        Set<String> keys = redisTemplate.keys(id + ":*");
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }

    @Override
    public int getSize() {
        Set<String> keys = redisTemplate.keys(id + ":*");
        return keys != null ? keys.size() : 0;
    }
}
```

**配置使用：**
```xml
<cache type="com.example.cache.MyRedisCache"/>
```

5. **Spring Boot 整合配置**

**application.yml：**
```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password:
    database: 0
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0

mybatis:
  configuration:
    cache-enabled: true
```

**配置类：**
```java
@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);

        // 使用 Jackson 序列化
        Jackson2JsonRedisSerializer<Object> serializer =
            new Jackson2JsonRedisSerializer<>(Object.class);

        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(serializer);

        // 初始化自定义缓存
        MyRedisCache.setRedisTemplate(template);

        return template;
    }
}
```

6. **对比选择**

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| mybatis-redis | 官方支持，配置简单 | 功能有限，扩展性差 | 快速接入，简单场景 |
| 自定义实现 | 灵活控制，功能完善 | 需要自己维护 | 复杂需求，定制化场景 |
| Spring Cache | 与 Spring 无缝集成 | 需要引入 Spring | Spring Boot 项目 |

**关键要点**

1. **实现 Cache 接口**：是整合第三方缓存的核心
2. **序列化问题**：注意对象序列化方式的选择
3. **键的设计**：使用 namespace:key 避免冲突
4. **过期时间**：合理设置缓存过期时间
5. **线程安全**：确保缓存实现的线程安全性

**记忆口诀**

"实现接口是基础，Redis 客户端做支撑，序列化要选好，键值设计要清晰"
## 插件机制
### 63. 什么是 MyBatis 插件？

**核心答案**

MyBatis 插件是基于 JDK 动态代理和拦截器模式实现的扩展机制，允许在 SQL 执行的特定时机拦截并修改 MyBatis 的核心对象方法调用，实现日志记录、性能监控、分页、数据加密等功能。

**详细说明**

1. **插件的本质**
   - **拦截器模式**：通过 @Intercepts 注解声明拦截点
   - **动态代理**：使用 JDK 动态代理包装目标对象
   - **责任链模式**：多个插件形成拦截器链
   - **AOP 思想**：在方法执行前后插入自定义逻辑

2. **插件架构**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="490" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">MyBatis 插件工作原理</text>
<rect x="300" y="90" width="200" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">SqlSessionFactory</text>
<line x1="400" y1="140" x2="400" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="170" width="200" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="200" text-anchor="middle" font-size="14" font-weight="bold" fill="#e65100">拦截器链</text>
<line x1="400" y1="220" x2="400" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="80" y="250" width="160" height="60" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="160" y="275" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">Plugin 1</text>
<text x="160" y="295" text-anchor="middle" font-size="11" fill="#4a148c">日志插件</text>
<rect x="280" y="250" width="160" height="60" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="360" y="275" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">Plugin 2</text>
<text x="360" y="295" text-anchor="middle" font-size="11" fill="#4a148c">分页插件</text>
<rect x="480" y="250" width="160" height="60" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="560" y="275" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">Plugin 3</text>
<text x="560" y="295" text-anchor="middle" font-size="11" fill="#4a148c">性能监控</text>
<line x1="320" y1="220" x2="160" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="220" x2="360" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="480" y1="220" x2="560" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="160" y1="310" x2="160" y2="340" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="360" y1="310" x2="360" y2="340" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="560" y1="310" x2="560" y2="340" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="340" width="200" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="370" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">目标对象</text>
<line x1="240" y1="365" x2="300" y2="365" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="440" y1="365" x2="500" y2="365" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="120" y="420" width="140" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="190" y="450" text-anchor="middle" font-size="13" font-weight="bold" fill="#c62828">Executor</text>
<rect x="290" y="420" width="140" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="360" y="435" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">Statement</text>
<text x="360" y="455" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">Handler</text>
<rect x="460" y="420" width="140" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="530" y="435" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">Parameter</text>
<text x="530" y="455" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">Handler</text>
<rect x="630" y="420" width="140" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="700" y="435" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">ResultSet</text>
<text x="700" y="455" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">Handler</text>
<line x1="330" y1="390" x2="190" y2="420" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="360" y1="390" x2="360" y2="420" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="420" y1="390" x2="530" y2="420" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="470" y1="390" x2="700" y2="420" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
</svg>

3. **可拦截的四大对象**

| 对象 | 作用 | 可拦截方法 |
|------|------|-----------|
| **Executor** | SQL 执行器 | update、query、commit、rollback 等 |
| **StatementHandler** | SQL 语句处理 | prepare、parameterize、batch、update、query |
| **ParameterHandler** | 参数处理 | getParameterObject、setParameters |
| **ResultSetHandler** | 结果集处理 | handleResultSets、handleOutputParameters |

4. **插件执行流程**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="340" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">插件执行流程</text>
<rect x="100" y="90" width="150" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="175" y="120" text-anchor="middle" font-size="13" fill="#1976d2">1. 创建目标对象</text>
<line x1="250" y1="115" x2="300" y2="115" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="90" width="150" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="375" y="120" text-anchor="middle" font-size="13" fill="#e65100">2. 遍历拦截器链</text>
<line x1="450" y1="115" x2="500" y2="115" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="500" y="90" width="150" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="575" y="120" text-anchor="middle" font-size="13" fill="#7b1fa2">3. 创建代理对象</text>
<line x1="175" y1="140" x2="175" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="180" width="150" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="175" y="210" text-anchor="middle" font-size="13" fill="#2e7d32">4. 调用方法</text>
<line x1="250" y1="205" x2="300" y2="205" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="180" width="150" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="375" y="210" text-anchor="middle" font-size="13" fill="#c62828">5. 拦截器处理</text>
<line x1="450" y1="205" x2="500" y2="205" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="500" y="180" width="150" height="50" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="575" y="210" text-anchor="middle" font-size="13" fill="#f57f17">6. 执行目标方法</text>
<line x1="575" y1="140" x2="575" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="375" y1="230" x2="375" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="270" width="150" height="50" fill="#e1f5fe" stroke="#03a9f4" stroke-width="2" rx="5"/>
<text x="375" y="300" text-anchor="middle" font-size="13" fill="#01579b">7. 返回结果</text>
</svg>

5. **插件示例**

```java
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class,
                RowBounds.class, ResultHandler.class}
    )
})
public class ExamplePlugin implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 执行前处理
        System.out.println("Before query...");

        // 执行目标方法
        Object result = invocation.proceed();

        // 执行后处理
        System.out.println("After query...");

        return result;
    }

    @Override
    public Object plugin(Object target) {
        // 使用 Plugin.wrap 创建代理对象
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
        // 获取配置参数
        String param = properties.getProperty("param");
    }
}
```

6. **常见应用场景**

| 场景 | 说明 | 示例 |
|------|------|------|
| **性能监控** | 记录 SQL 执行时间 | 慢查询日志 |
| **SQL 改写** | 动态修改 SQL | 多租户、分页 |
| **数据加密** | 敏感字段加解密 | 身份证号、手机号 |
| **权限控制** | 数据权限过滤 | 行级权限 |
| **日志记录** | 记录完整 SQL | SQL 审计 |

**关键要点**

1. **动态代理**：插件基于 JDK 动态代理实现
2. **四大对象**：只能拦截 Executor、StatementHandler、ParameterHandler、ResultSetHandler
3. **执行顺序**：多个插件按配置顺序形成责任链
4. **性能影响**：每个插件增加一层代理，注意性能开销
5. **线程安全**：插件实例是单例，需保证线程安全

**记忆口诀**

"四大对象可拦截，动态代理做增强，责任链式顺序执行，监控分页都能干"

### 64. MyBatis 插件的原理是什么？

**核心答案**

MyBatis 插件原理基于 JDK 动态代理和责任链模式。在创建四大核心对象（Executor、StatementHandler、ParameterHandler、ResultSetHandler）时，通过 InterceptorChain 遍历所有插件，使用 Plugin.wrap() 方法层层包装目标对象，生成代理对象。当调用目标方法时，会先经过代理对象的 invoke 方法，执行插件的 intercept 方法。

**详细说明**

1. **核心组件**
   - **Interceptor 接口**：定义插件规范
   - **InterceptorChain**：管理所有插件的责任链
   - **Plugin 类**：提供代理对象创建的工具方法
   - **@Intercepts/@Signature**：声明拦截点

2. **工作流程**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="540" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">MyBatis 插件原理详解</text>
<rect x="100" y="90" width="600" height="70" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="110" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">1. 初始化阶段</text>
<text x="120" y="135" font-size="12" fill="#424242">• 解析配置文件中的 &lt;plugins&gt; 标签</text>
<text x="120" y="152" font-size="12" fill="#424242">• 创建 Interceptor 实例并加入 InterceptorChain</text>
<line x1="400" y1="160" x2="400" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="180" width="600" height="90" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="200" text-anchor="middle" font-size="14" font-weight="bold" fill="#e65100">2. 对象创建阶段</text>
<text x="120" y="225" font-size="12" fill="#424242">• 创建四大核心对象（Executor/StatementHandler/...）</text>
<text x="120" y="242" font-size="12" fill="#424242">• 调用 interceptorChain.pluginAll(target)</text>
<text x="120" y="259" font-size="12" fill="#424242">• 遍历所有插件，调用 plugin(target) 方法</text>
<line x1="400" y1="270" x2="400" y2="290" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="290" width="280" height="90" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="240" y="310" text-anchor="middle" font-size="14" font-weight="bold" fill="#7b1fa2">3a. 匹配拦截点</text>
<text x="120" y="335" font-size="12" fill="#424242">• 检查插件的 @Signature</text>
<text x="120" y="352" font-size="12" fill="#424242">• 匹配目标对象和方法</text>
<text x="120" y="369" font-size="12" fill="#424242">• 不匹配则返回原对象</text>
<rect x="420" y="290" width="280" height="90" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="560" y="310" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">3b. 创建代理</text>
<text x="440" y="335" font-size="12" fill="#424242">• 匹配则调用 Plugin.wrap()</text>
<text x="440" y="352" font-size="12" fill="#424242">• 使用 JDK 动态代理</text>
<text x="440" y="369" font-size="12" fill="#424242">• 返回代理对象</text>
<line x1="380" y1="335" x2="420" y2="335" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="560" y1="380" x2="560" y2="400" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="400" width="600" height="90" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="400" y="420" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">4. 方法调用阶段</text>
<text x="120" y="445" font-size="12" fill="#424242">• 调用代理对象的方法</text>
<text x="120" y="462" font-size="12" fill="#424242">• 触发 InvocationHandler.invoke()</text>
<text x="120" y="479" font-size="12" fill="#424242">• 执行插件的 intercept() 方法</text>
<line x1="400" y1="490" x2="400" y2="510" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="510" width="600" height="50" fill="#e1f5fe" stroke="#03a9f4" stroke-width="2" rx="5"/>
<text x="400" y="530" text-anchor="middle" font-size="14" font-weight="bold" fill="#01579b">5. 执行目标方法</text>
<text x="120" y="550" font-size="12" fill="#424242">• 调用 invocation.proceed() 执行真正的业务逻辑</text>
</svg>

3. **核心代码分析**

**InterceptorChain（拦截器链）：**
```java
public class InterceptorChain {
    // 存储所有插件
    private final List<Interceptor> interceptors = new ArrayList<>();

    // 对目标对象应用所有插件
    public Object pluginAll(Object target) {
        for (Interceptor interceptor : interceptors) {
            // 每个插件包装一次，形成代理链
            target = interceptor.plugin(target);
        }
        return target;
    }

    public void addInterceptor(Interceptor interceptor) {
        interceptors.add(interceptor);
    }
}
```

**Plugin（代理工具类）：**
```java
public class Plugin implements InvocationHandler {
    private final Object target;
    private final Interceptor interceptor;
    private final Map<Class<?>, Set<Method>> signatureMap;

    // 创建代理对象
    public static Object wrap(Object target, Interceptor interceptor) {
        // 获取插件声明的拦截点
        Map<Class<?>, Set<Method>> signatureMap =
            getSignatureMap(interceptor);

        Class<?> type = target.getClass();
        // 获取目标对象实现的所有被拦截的接口
        Class<?>[] interfaces = getAllInterfaces(type, signatureMap);

        if (interfaces.length > 0) {
            // 创建 JDK 动态代理
            return Proxy.newProxyInstance(
                type.getClassLoader(),
                interfaces,
                new Plugin(target, interceptor, signatureMap)
            );
        }
        return target;
    }

    // InvocationHandler 接口方法
    @Override
    public Object invoke(Object proxy, Method method, Object[] args)
            throws Throwable {
        try {
            // 检查是否需要拦截该方法
            Set<Method> methods = signatureMap.get(method.getDeclaringClass());
            if (methods != null && methods.contains(method)) {
                // 执行插件的拦截逻辑
                return interceptor.intercept(
                    new Invocation(target, method, args)
                );
            }
            // 不拦截则直接执行
            return method.invoke(target, args);
        } catch (Exception e) {
            throw ExceptionUtil.unwrapThrowable(e);
        }
    }
}
```

**Executor 创建过程（示例）：**
```java
public Executor newExecutor(Transaction transaction) {
    // 创建基础 Executor
    Executor executor = new SimpleExecutor(this, transaction);

    // 应用所有插件
    executor = (Executor) interceptorChain.pluginAll(executor);

    return executor;
}
```

4. **代理链结构**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="290" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">多层代理结构</text>
<rect x="100" y="100" width="120" height="60" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="160" y="125" text-anchor="middle" font-size="12" fill="#1976d2">Plugin3</text>
<text x="160" y="145" text-anchor="middle" font-size="11" fill="#424242">代理对象</text>
<line x1="220" y1="130" x2="260" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="260" y="100" width="120" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="320" y="125" text-anchor="middle" font-size="12" fill="#e65100">Plugin2</text>
<text x="320" y="145" text-anchor="middle" font-size="11" fill="#424242">代理对象</text>
<line x1="380" y1="130" x2="420" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="420" y="100" width="120" height="60" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="480" y="125" text-anchor="middle" font-size="12" fill="#7b1fa2">Plugin1</text>
<text x="480" y="145" text-anchor="middle" font-size="11" fill="#424242">代理对象</text>
<line x1="540" y1="130" x2="580" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="580" y="100" width="120" height="60" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="640" y="125" text-anchor="middle" font-size="12" fill="#2e7d32">Target</text>
<text x="640" y="145" text-anchor="middle" font-size="11" fill="#424242">目标对象</text>
<text x="100" y="200" font-size="13" font-weight="bold" fill="#212529">调用顺序：</text>
<rect x="100" y="210" width="600" height="90" fill="#fff" stroke="#ccc" stroke-width="1" rx="3"/>
<text x="120" y="235" font-size="12" fill="#424242">1. 客户端调用 Plugin3.method()</text>
<text x="120" y="255" font-size="12" fill="#424242">2. Plugin3.intercept() → invocation.proceed() → Plugin2.method()</text>
<text x="120" y="275" font-size="12" fill="#424242">3. Plugin2.intercept() → invocation.proceed() → Plugin1.method()</text>
<text x="120" y="295" font-size="12" fill="#424242">4. Plugin1.intercept() → invocation.proceed() → Target.method()</text>
</svg>

5. **关键机制对比**

| 特性 | 说明 |
|------|------|
| **代理方式** | JDK 动态代理（基于接口） |
| **代理层数** | 每个插件一层，形成代理链 |
| **执行顺序** | 配置顺序的倒序执行 |
| **方法匹配** | 基于 @Signature 注解配置 |
| **性能开销** | 每层代理增加方法调用开销 |

**关键要点**

1. **JDK 动态代理**：必须基于接口，这就是为什么只能拦截四大对象
2. **责任链模式**：多个插件形成链式调用
3. **层层包装**：每个插件都包装前一个对象
4. **签名匹配**：通过 @Signature 精确匹配拦截点
5. **执行顺序**：先配置的插件在外层，后执行拦截逻辑

**记忆口诀**

"动态代理做包装，责任链式层层套，签名匹配定拦截，先配置的后执行"

### 65. 如何自定义 MyBatis 插件？

**核心答案**

自定义 MyBatis 插件需要：1) 实现 Interceptor 接口的三个方法；2) 使用 @Intercepts 和 @Signature 注解声明拦截点；3) 在配置文件中注册插件或使用 @Component 自动注册。核心是实现 intercept() 方法编写拦截逻辑。

**详细说明**

1. **实现步骤**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="390" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">自定义插件步骤</text>
<rect x="250" y="90" width="300" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="14" fill="#1976d2">1. 实现 Interceptor 接口</text>
<line x1="400" y1="140" x2="400" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="160" width="300" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="190" text-anchor="middle" font-size="14" fill="#e65100">2. 添加 @Intercepts 注解</text>
<line x1="400" y1="210" x2="400" y2="230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="230" width="300" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="260" text-anchor="middle" font-size="14" fill="#7b1fa2">3. 实现三个核心方法</text>
<line x1="400" y1="280" x2="400" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="300" width="200" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="200" y="330" text-anchor="middle" font-size="13" fill="#2e7d32">intercept()</text>
<rect x="320" y="300" width="160" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="330" text-anchor="middle" font-size="13" fill="#2e7d32">plugin()</text>
<rect x="500" y="300" width="200" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="600" y="330" text-anchor="middle" font-size="13" fill="#2e7d32">setProperties()</text>
<line x1="350" y1="280" x2="200" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="280" x2="400" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="280" x2="600" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="350" x2="400" y2="370" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="370" width="300" height="40" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="400" y="395" text-anchor="middle" font-size="14" fill="#c62828">4. 注册插件</text>
</svg>

2. **完整示例：SQL 执行时间监控插件**

```java
/**
 * SQL 执行时间监控插件
 */
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "update",
        args = {MappedStatement.class, Object.class}
    ),
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class,
                RowBounds.class, ResultHandler.class}
    )
})
@Component  // Spring 环境下自动注册
public class SqlTimingPlugin implements Interceptor {

    // 慢查询阈值（毫秒）
    private long slowSqlThreshold = 1000;

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 记录开始时间
        long startTime = System.currentTimeMillis();

        // 获取拦截的对象和参数
        MappedStatement mappedStatement =
            (MappedStatement) invocation.getArgs()[0];
        Object parameter = invocation.getArgs()[1];

        try {
            // 执行目标方法
            Object result = invocation.proceed();

            // 计算执行时间
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;

            // 记录日志
            logSqlTiming(mappedStatement, parameter, duration);

            return result;
        } catch (Exception e) {
            // 异常也要记录
            long endTime = System.currentTimeMillis();
            logSqlError(mappedStatement, parameter,
                       endTime - startTime, e);
            throw e;
        }
    }

    @Override
    public Object plugin(Object target) {
        // 使用 Plugin.wrap 创建代理对象
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
        // 读取配置参数
        String threshold = properties.getProperty("slowSqlThreshold");
        if (threshold != null) {
            this.slowSqlThreshold = Long.parseLong(threshold);
        }
    }

    private void logSqlTiming(MappedStatement ms,
                             Object parameter,
                             long duration) {
        if (duration > slowSqlThreshold) {
            String sqlId = ms.getId();
            String sql = getSql(ms, parameter);
            log.warn("慢查询 [{}ms] {}: {}", duration, sqlId, sql);
        } else {
            log.debug("SQL执行 [{}ms] {}", duration, ms.getId());
        }
    }

    private void logSqlError(MappedStatement ms,
                            Object parameter,
                            long duration,
                            Exception e) {
        String sqlId = ms.getId();
        String sql = getSql(ms, parameter);
        log.error("SQL执行失败 [{}ms] {}: {}, 异常: {}",
                 duration, sqlId, sql, e.getMessage());
    }

    private String getSql(MappedStatement ms, Object parameter) {
        BoundSql boundSql = ms.getBoundSql(parameter);
        return boundSql.getSql().replaceAll("\\s+", " ");
    }
}
```

3. **更多实用插件示例**

**分页插件（简化版）：**
```java
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class,
                RowBounds.class, ResultHandler.class}
    )
})
public class PagePlugin implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object[] args = invocation.getArgs();
        MappedStatement ms = (MappedStatement) args[0];
        Object parameter = args[1];
        RowBounds rowBounds = (RowBounds) args[2];

        // 如果需要分页
        if (rowBounds != RowBounds.DEFAULT) {
            // 修改 SQL，添加 LIMIT 子句
            BoundSql boundSql = ms.getBoundSql(parameter);
            String sql = boundSql.getSql();
            String pageSql = sql + " LIMIT " + rowBounds.getOffset()
                           + ", " + rowBounds.getLimit();

            // 创建新的 MappedStatement
            MappedStatement newMs = copyMappedStatement(ms, pageSql);
            args[0] = newMs;
        }

        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
        // 可配置数据库方言等
    }
}
```

**数据脱敏插件：**
```java
@Intercepts({
    @Signature(
        type = ResultSetHandler.class,
        method = "handleResultSets",
        args = {Statement.class}
    )
})
public class DataMaskingPlugin implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 获取原始结果
        Object result = invocation.proceed();

        // 对结果进行脱敏处理
        if (result instanceof List) {
            List<?> list = (List<?>) result;
            for (Object item : list) {
                maskSensitiveData(item);
            }
        }

        return result;
    }

    private void maskSensitiveData(Object obj) {
        if (obj == null) return;

        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field : fields) {
            // 检查是否有 @Sensitive 注解
            if (field.isAnnotationPresent(Sensitive.class)) {
                field.setAccessible(true);
                try {
                    Object value = field.get(obj);
                    if (value instanceof String) {
                        String masked = maskString((String) value);
                        field.set(obj, masked);
                    }
                } catch (Exception e) {
                    log.error("数据脱敏失败", e);
                }
            }
        }
    }

    private String maskString(String str) {
        if (str == null || str.length() < 2) return str;
        // 保留首尾字符
        return str.charAt(0) + "***" + str.charAt(str.length() - 1);
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {}
}
```

4. **插件注册方式**

**XML 配置方式：**
```xml
<configuration>
    <plugins>
        <plugin interceptor="com.example.plugin.SqlTimingPlugin">
            <property name="slowSqlThreshold" value="2000"/>
        </plugin>
    </plugins>
</configuration>
```

**Spring Boot 配置方式：**
```java
@Configuration
public class MyBatisConfig {

    @Bean
    public SqlTimingPlugin sqlTimingPlugin() {
        SqlTimingPlugin plugin = new SqlTimingPlugin();
        Properties properties = new Properties();
        properties.setProperty("slowSqlThreshold", "1000");
        plugin.setProperties(properties);
        return plugin;
    }
}
```

5. **开发注意事项**

| 注意点 | 说明 |
|--------|------|
| **性能影响** | 避免在 intercept() 中执行耗时操作 |
| **异常处理** | 必须正确处理异常，避免影响主流程 |
| **线程安全** | 插件是单例，注意共享状态的线程安全 |
| **签名准确** | @Signature 的参数必须与目标方法完全匹配 |
| **插件顺序** | 多个插件的顺序很重要，后配置的先执行 |

**关键要点**

1. **三个方法**：intercept（核心逻辑）、plugin（创建代理）、setProperties（参数配置）
2. **注解声明**：@Intercepts 和 @Signature 准确声明拦截点
3. **代理创建**：通常使用 Plugin.wrap() 简化代理创建
4. **参数获取**：通过 invocation.getArgs() 获取方法参数
5. **执行目标**：调用 invocation.proceed() 继续执行

**记忆口诀**

"实现接口三方法，注解声明拦截点，wrap 包装成代理，proceed 执行真逻辑"

### 66. MyBatis 可以拦截哪些对象的方法？

**核心答案**

MyBatis 插件只能拦截四大核心对象：Executor（执行器）、StatementHandler（语句处理器）、ParameterHandler（参数处理器）、ResultSetHandler（结果集处理器）。这是因为插件基于 JDK 动态代理实现，只有这四个对象在创建时会被 InterceptorChain 包装。

**详细说明**

1. **四大可拦截对象**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="490" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">MyBatis 四大可拦截对象</text>
<rect x="100" y="100" width="280" height="100" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="240" y="125" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976d2">Executor (执行器)</text>
<text x="120" y="150" font-size="12" fill="#424242">• update()</text>
<text x="120" y="170" font-size="12" fill="#424242">• query()</text>
<text x="120" y="190" font-size="12" fill="#424242">• commit() / rollback()</text>
<rect x="420" y="100" width="280" height="100" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="560" y="125" text-anchor="middle" font-size="15" font-weight="bold" fill="#e65100">StatementHandler (语句处理)</text>
<text x="440" y="150" font-size="12" fill="#424242">• prepare()</text>
<text x="440" y="170" font-size="12" fill="#424242">• parameterize()</text>
<text x="440" y="190" font-size="12" fill="#424242">• query() / update()</text>
<rect x="100" y="230" width="280" height="100" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="240" y="255" text-anchor="middle" font-size="15" font-weight="bold" fill="#7b1fa2">ParameterHandler (参数处理)</text>
<text x="120" y="280" font-size="12" fill="#424242">• getParameterObject()</text>
<text x="120" y="300" font-size="12" fill="#424242">• setParameters()</text>
<rect x="420" y="230" width="280" height="100" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="560" y="255" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">ResultSetHandler (结果处理)</text>
<text x="440" y="280" font-size="12" fill="#424242">• handleResultSets()</text>
<text x="440" y="300" font-size="12" fill="#424242">• handleOutputParameters()</text>
<rect x="100" y="360" width="600" height="140" fill="#fff" stroke="#ccc" stroke-width="1" rx="3"/>
<text x="120" y="385" font-size="13" font-weight="bold" fill="#212529">拦截时机：</text>
<text x="140" y="410" font-size="12" fill="#424242">1. Executor: SQL 执行前后（缓存、事务、批量操作）</text>
<text x="140" y="430" font-size="12" fill="#424242">2. StatementHandler: SQL 预编译和执行（SQL 改写、分页）</text>
<text x="140" y="450" font-size="12" fill="#424242">3. ParameterHandler: 参数设置（参数加密、类型转换）</text>
<text x="140" y="470" font-size="12" fill="#424242">4. ResultSetHandler: 结果映射（数据脱敏、结果转换）</text>
</svg>

2. **各对象详细说明**

**Executor（执行器）**
- **职责**：SQL 执行的总调度器，管理缓存和事务
- **拦截时机**：SQL 执行的最早阶段
- **常见用途**：
  - 慢查询监控
  - SQL 日志记录
  - 分布式事务
  - 自定义缓存

**可拦截方法签名：**
```java
@Signature(
    type = Executor.class,
    method = "update",
    args = {MappedStatement.class, Object.class}
)

@Signature(
    type = Executor.class,
    method = "query",
    args = {MappedStatement.class, Object.class,
            RowBounds.class, ResultHandler.class}
)

@Signature(
    type = Executor.class,
    method = "query",
    args = {MappedStatement.class, Object.class,
            RowBounds.class, ResultHandler.class,
            CacheKey.class, BoundSql.class}
)

@Signature(
    type = Executor.class,
    method = "commit",
    args = {boolean.class}
)

@Signature(
    type = Executor.class,
    method = "rollback",
    args = {boolean.class}
)
```

**StatementHandler（语句处理器）**
- **职责**：处理 JDBC Statement，设置参数、执行 SQL
- **拦截时机**：SQL 预编译和执行阶段
- **常见用途**：
  - SQL 改写（分页、多租户）
  - SQL 统计分析
  - 动态表名替换

**可拦截方法签名：**
```java
@Signature(
    type = StatementHandler.class,
    method = "prepare",
    args = {Connection.class, Integer.class}
)

@Signature(
    type = StatementHandler.class,
    method = "parameterize",
    args = {Statement.class}
)

@Signature(
    type = StatementHandler.class,
    method = "batch",
    args = {Statement.class}
)

@Signature(
    type = StatementHandler.class,
    method = "update",
    args = {Statement.class}
)

@Signature(
    type = StatementHandler.class,
    method = "query",
    args = {Statement.class, ResultHandler.class}
)
```

**ParameterHandler（参数处理器）**
- **职责**：设置 PreparedStatement 的参数
- **拦截时机**：参数绑定阶段
- **常见用途**：
  - 参数加密
  - 参数类型转换
  - 参数校验

**可拦截方法签名：**
```java
@Signature(
    type = ParameterHandler.class,
    method = "getParameterObject",
    args = {}
)

@Signature(
    type = ParameterHandler.class,
    method = "setParameters",
    args = {PreparedStatement.class}
)
```

**ResultSetHandler（结果集处理器）**
- **职责**：处理 JDBC ResultSet，映射为 Java 对象
- **拦截时机**：结果集映射阶段
- **常见用途**：
  - 数据脱敏
  - 结果转换
  - 字段解密

**可拦截方法签名：**
```java
@Signature(
    type = ResultSetHandler.class,
    method = "handleResultSets",
    args = {Statement.class}
)

@Signature(
    type = ResultSetHandler.class,
    method = "handleOutputParameters",
    args = {CallableStatement.class}
)
```

3. **执行顺序关系**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="340" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">SQL 执行流程与拦截点</text>
<rect x="300" y="100" width="200" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="130" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">1. Executor</text>
<line x1="400" y1="150" x2="400" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="170" width="200" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="200" text-anchor="middle" font-size="14" font-weight="bold" fill="#e65100">2. StatementHandler</text>
<line x1="400" y1="220" x2="400" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="300" y="240" width="200" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="270" text-anchor="middle" font-size="14" font-weight="bold" fill="#7b1fa2">3. ParameterHandler</text>
<line x1="400" y1="290" x2="400" y2="310" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<ellipse cx="400" cy="330" rx="80" ry="25" fill="#ffebee" stroke="#f44336" stroke-width="2"/>
<text x="400" y="338" text-anchor="middle" font-size="13" font-weight="bold" fill="#c62828">执行 SQL</text>
<line x1="480" y1="330" x2="560" y2="270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="560" y="240" width="200" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="660" y="270" text-anchor="middle" font-size="14" font-weight="bold" fill="#2e7d32">4. ResultSetHandler</text>
<text x="100" y="130" font-size="11" fill="#666">缓存、事务</text>
<text x="100" y="200" font-size="11" fill="#666">SQL 准备</text>
<text x="100" y="270" font-size="11" fill="#666">参数绑定</text>
<text x="660" y="230" font-size="11" fill="#666" text-anchor="middle">结果映射</text>
</svg>

4. **不能拦截的对象**

MyBatis 中以下对象**不能**直接拦截：
- Configuration
- SqlSessionFactory
- SqlSession
- Mapper 接口（但可以拦截其底层的 Executor）
- TypeHandler
- ObjectFactory

5. **选择拦截点的建议**

| 需求 | 推荐拦截点 | 原因 |
|------|----------|------|
| SQL 监控 | Executor | 最早阶段，可获取完整 SQL 信息 |
| 分页改写 | StatementHandler | 可直接修改 SQL 语句 |
| 参数加密 | ParameterHandler | 参数设置阶段处理 |
| 结果脱敏 | ResultSetHandler | 结果返回前处理 |
| 多租户 | StatementHandler | 可改写 SQL 添加租户条件 |
| 性能分析 | Executor | 可统计完整执行时间 |

**关键要点**

1. **四大对象**：只能拦截 Executor、StatementHandler、ParameterHandler、ResultSetHandler
2. **拦截原因**：因为只有这四个对象在创建时会被 InterceptorChain 包装
3. **执行顺序**：按照 SQL 执行流程顺序调用
4. **方法签名**：@Signature 必须准确匹配方法签名
5. **选择原则**：根据需求选择最合适的拦截点

**记忆口诀**

"执行语句参结果，四大对象能拦截，SQL 流程有顺序，选对位置是关键"

### 67. 常用的 MyBatis 插件有哪些？

**核心答案**

常用的 MyBatis 插件主要有：PageHelper（分页插件）、MyBatis-Plus（增强工具）、通用 Mapper（简化 CRUD）、MyBatis Generator（代码生成）、P6Spy（SQL 监控）、Dynamic Datasource（多数据源）等。其中 PageHelper 是使用最广泛的分页解决方案。

**详细说明**

1. **主流插件分类**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="440" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">常用 MyBatis 插件分类</text>
<rect x="320" y="90" width="160" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">MyBatis 插件</text>
<line x1="300" y1="140" x2="150" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="140" x2="400" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="500" y1="140" x2="650" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="80" y="180" width="140" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="150" y="210" text-anchor="middle" font-size="13" font-weight="bold" fill="#e65100">分页类</text>
<rect x="330" y="180" width="140" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="210" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">增强类</text>
<rect x="580" y="180" width="140" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="650" y="210" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">工具类</text>
<line x1="150" y1="230" x2="150" y2="260" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="230" x2="400" y2="260" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="650" y1="230" x2="650" y2="260" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="80" y="260" width="140" height="40" fill="#fff9c4" stroke="#fbc02d" stroke-width="1" rx="3"/>
<text x="150" y="285" text-anchor="middle" font-size="12" fill="#f57f17">PageHelper</text>
<rect x="80" y="310" width="140" height="40" fill="#fff9c4" stroke="#fbc02d" stroke-width="1" rx="3"/>
<text x="150" y="335" text-anchor="middle" font-size="12" fill="#f57f17">JSqlParser</text>
<rect x="330" y="260" width="140" height="40" fill="#e1bee7" stroke="#ab47bc" stroke-width="1" rx="3"/>
<text x="400" y="285" text-anchor="middle" font-size="12" fill="#6a1b9a">MyBatis-Plus</text>
<rect x="330" y="310" width="140" height="40" fill="#e1bee7" stroke="#ab47bc" stroke-width="1" rx="3"/>
<text x="400" y="335" text-anchor="middle" font-size="12" fill="#6a1b9a">通用 Mapper</text>
<rect x="580" y="260" width="140" height="40" fill="#c8e6c9" stroke="#66bb6a" stroke-width="1" rx="3"/>
<text x="650" y="285" text-anchor="middle" font-size="12" fill="#2e7d32">P6Spy</text>
<rect x="580" y="310" width="140" height="40" fill="#c8e6c9" stroke="#66bb6a" stroke-width="1" rx="3"/>
<text x="650" y="335" text-anchor="middle" font-size="12" fill="#2e7d32">MBG</text>
<rect x="580" y="360" width="140" height="40" fill="#c8e6c9" stroke="#66bb6a" stroke-width="1" rx="3"/>
<text x="650" y="385" text-anchor="middle" font-size="12" fill="#2e7d32">Dynamic DS</text>
<rect x="80" y="420" width="640" height="40" fill="#ffebee" stroke="#f44336" stroke-width="1" rx="3"/>
<text x="400" y="445" text-anchor="middle" font-size="13" fill="#c62828">监控类：Druid Filter、MyBatis Log Plugin</text>
</svg>

2. **重点插件详解**

**PageHelper（分页插件）⭐⭐⭐⭐⭐**

最流行的 MyBatis 分页插件，支持多种数据库。

```xml
<!-- Maven 依赖 -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.4.6</version>
</dependency>
```

```java
// 使用示例
// 方式1：使用 PageHelper.startPage
PageHelper.startPage(1, 10);
List<User> users = userMapper.selectAll();
PageInfo<User> pageInfo = new PageInfo<>(users);

// 方式2：使用 PageHelper.offsetPage
PageHelper.offsetPage(0, 10);
List<User> users = userMapper.selectAll();
```

**特点：**
- 支持 MySQL、Oracle、PostgreSQL 等多种数据库
- 自动识别数据库方言
- 支持物理分页和逻辑分页
- 线程安全，使用 ThreadLocal 存储分页参数

---

**MyBatis-Plus（增强工具）⭐⭐⭐⭐⭐**

提供强大的 CRUD 操作增强，无需编写 XML。

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.3</version>
</dependency>
```

```java
// Mapper 接口继承 BaseMapper
public interface UserMapper extends BaseMapper<User> {
    // 自动拥有 CRUD 方法
}

// 使用示例
// 1. 基础 CRUD
userMapper.insert(user);
userMapper.selectById(1);
userMapper.updateById(user);
userMapper.deleteById(1);

// 2. 条件构造器
QueryWrapper<User> wrapper = new QueryWrapper<>();
wrapper.eq("status", 1)
       .like("name", "张")
       .orderByDesc("create_time");
List<User> users = userMapper.selectList(wrapper);

// 3. Lambda 方式
LambdaQueryWrapper<User> lambda = new LambdaQueryWrapper<>();
lambda.eq(User::getStatus, 1)
      .like(User::getName, "张");

// 4. 分页查询
Page<User> page = new Page<>(1, 10);
userMapper.selectPage(page, wrapper);
```

**特点：**
- 内置 CRUD 操作，减少代码量
- 强大的条件构造器
- 内置分页插件
- 自动填充、逻辑删除
- 乐观锁插件
- SQL 性能分析

---

**通用 Mapper（tk.mybatis）⭐⭐⭐⭐**

提供通用的 CRUD 操作，简化开发。

```xml
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper-spring-boot-starter</artifactId>
    <version>4.2.1</version>
</dependency>
```

```java
// 继承 Mapper 接口
public interface UserMapper extends Mapper<User> {
}

// 使用示例
userMapper.selectByPrimaryKey(1);
userMapper.selectAll();
userMapper.insert(user);

// 条件查询
Example example = new Example(User.class);
example.createCriteria()
       .andEqualTo("status", 1)
       .andLike("name", "%张%");
List<User> users = userMapper.selectByExample(example);
```

---

**MyBatis Generator（MBG）⭐⭐⭐⭐**

代码生成器，根据数据库表自动生成实体类、Mapper 接口和 XML。

```xml
<dependency>
    <groupId>org.mybatis.generator</groupId>
    <artifactId>mybatis-generator-core</artifactId>
    <version>1.4.1</version>
</dependency>
```

```xml
<!-- generatorConfig.xml -->
<generatorConfiguration>
    <context id="DB2Tables" targetRuntime="MyBatis3">
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                       connectionURL="jdbc:mysql://localhost:3306/db"
                       userId="root"
                       password="password"/>

        <javaModelGenerator targetPackage="com.example.entity"
                           targetProject="src/main/java"/>

        <sqlMapGenerator targetPackage="mapper"
                        targetProject="src/main/resources"/>

        <javaClientGenerator type="XMLMAPPER"
                            targetPackage="com.example.mapper"
                            targetProject="src/main/java"/>

        <table tableName="user" domainObjectName="User"/>
    </context>
</generatorConfiguration>
```

---

**P6Spy（SQL 监控）⭐⭐⭐**

监控和记录所有 JDBC 操作，输出完整 SQL。

```xml
<dependency>
    <groupId>p6spy</groupId>
    <artifactId>p6spy</artifactId>
    <version>3.9.1</version>
</dependency>
```

```properties
# spy.properties
driverlist=com.mysql.cj.jdbc.Driver
logMessageFormat=com.p6spy.engine.spy.appender.CustomLineFormat
customLogMessageFormat=执行时间: %(executionTime)ms | SQL: %(sql)
```

---

**Dynamic Datasource（多数据源）⭐⭐⭐⭐**

动态数据源切换，支持主从、读写分离。

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
    <version>3.6.1</version>
</dependency>
```

```java
// 使用注解切换数据源
@DS("slave")
public List<User> selectUsers() {
    return userMapper.selectAll();
}
```

3. **插件对比**

| 插件 | 主要功能 | 使用难度 | 推荐指数 |
|------|---------|---------|---------|
| PageHelper | 分页 | ⭐ | ⭐⭐⭐⭐⭐ |
| MyBatis-Plus | 增强 CRUD | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 通用 Mapper | 通用 CRUD | ⭐⭐ | ⭐⭐⭐⭐ |
| MBG | 代码生成 | ⭐⭐ | ⭐⭐⭐⭐ |
| P6Spy | SQL 监控 | ⭐ | ⭐⭐⭐ |
| Dynamic DS | 多数据源 | ⭐⭐⭐ | ⭐⭐⭐⭐ |

**关键要点**

1. **PageHelper**：分页必备，简单易用，支持多种数据库
2. **MyBatis-Plus**：功能最强大，推荐新项目使用
3. **通用 Mapper**：适合老项目改造，侵入性小
4. **选择建议**：新项目推荐 MyBatis-Plus，老项目可用 PageHelper + 通用 Mapper
5. **组合使用**：多个插件可以同时使用，但注意配置顺序

**记忆口诀**

"分页用 PageHelper，增强选 Plus，代码生成 MBG，监控有 P6Spy"

### 68. 什么是分页插件 PageHelper？如何使用？

**核心答案**

PageHelper 是 MyBatis 最流行的物理分页插件，通过拦截 Executor 的 query 方法，在 SQL 执行前自动改写 SQL 添加分页语句（如 LIMIT），并在执行后进行 count 查询获取总数。使用时只需在查询前调用 `PageHelper.startPage(pageNum, pageSize)` 即可。

**详细说明**

1. **PageHelper 工作原理**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="490" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">PageHelper 工作原理</text>
<rect x="250" y="90" width="300" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="14" fill="#1976d2">1. 调用 startPage(pageNum, pageSize)</text>
<line x1="400" y1="140" x2="400" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="170" width="300" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="200" text-anchor="middle" font-size="14" fill="#e65100">2. 分页参数存入 ThreadLocal</text>
<line x1="400" y1="220" x2="400" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="250" width="300" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="280" text-anchor="middle" font-size="14" fill="#7b1fa2">3. 执行查询方法</text>
<line x1="400" y1="300" x2="400" y2="330" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="330" width="300" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="360" text-anchor="middle" font-size="14" fill="#2e7d32">4. 拦截器拦截 Executor.query</text>
<line x1="400" y1="380" x2="200" y2="410" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="380" x2="600" y2="410" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="80" y="410" width="240" height="50" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="200" y="440" text-anchor="middle" font-size="13" fill="#f57f17">5a. 改写 SQL 添加 LIMIT</text>
<rect x="480" y="410" width="240" height="50" fill="#ffccbc" stroke="#ff7043" stroke-width="2" rx="5"/>
<text x="600" y="440" text-anchor="middle" font-size="13" fill="#d84315">5b. 执行 COUNT 查询</text>
<line x1="200" y1="460" x2="200" y2="480" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="600" y1="460" x2="600" y2="480" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="480" width="300" height="30" fill="#e1f5fe" stroke="#03a9f4" stroke-width="2" rx="5"/>
<text x="400" y="500" text-anchor="middle" font-size="13" fill="#01579b">6. 返回 Page 对象（含总数）</text>
</svg>

2. **快速开始**

**添加依赖（Spring Boot）：**
```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.4.6</version>
</dependency>
```

**基础使用：**
```java
// 方式1：基础分页
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public PageInfo<User> getUserList(int pageNum, int pageSize) {
        // 1. 设置分页参数（必须紧跟查询）
        PageHelper.startPage(pageNum, pageSize);

        // 2. 执行查询（第一个 SELECT 会被分页）
        List<User> users = userMapper.selectAll();

        // 3. 用 PageInfo 包装结果（包含总数、总页数等）
        PageInfo<User> pageInfo = new PageInfo<>(users);

        return pageInfo;
    }
}
```

**PageInfo 包含的信息：**
```java
pageInfo.getTotal();       // 总记录数
pageInfo.getPages();       // 总页数
pageInfo.getPageNum();     // 当前页码
pageInfo.getPageSize();    // 每页数量
pageInfo.getList();        // 数据列表
pageInfo.isHasPreviousPage(); // 是否有上一页
pageInfo.isHasNextPage();     // 是否有下一页
```

3. **高级用法**

**排序查询：**
```java
// 按字段排序
PageHelper.startPage(1, 10, "create_time desc, id asc");
List<User> users = userMapper.selectAll();

// 或使用 OrderBy
PageHelper.orderBy("create_time desc");
List<User> users = userMapper.selectAll();
```

**合理化分页（页码越界处理）：**
```java
// reasonable=true：pageNum<=0 查第一页，pageNum>pages 查最后一页
PageHelper.startPage(pageNum, pageSize, true);
```

**支持多种参数传递方式：**
```java
// 方式1：startPage
PageHelper.startPage(1, 10);

// 方式2：offsetPage（基于 offset）
PageHelper.offsetPage(0, 10);

// 方式3：使用 Page 对象
Page<User> page = PageHelper.startPage(1, 10);

// 方式4：RowBounds（不推荐，逻辑分页）
List<User> users = userMapper.selectAll(new RowBounds(0, 10));
```

**只查询部分信息：**
```java
// 只需要数据列表，不需要总数
Page<User> page = PageHelper.startPage(1, 10)
                            .setCount(false);
List<User> users = userMapper.selectAll();

// 只需要总数，不需要数据
Page<User> page = PageHelper.startPage(1, 10)
                            .count();
Long total = page.getTotal();
```

4. **配置选项**

**application.yml 配置：**
```yaml
pagehelper:
  # 数据库方言（自动检测）
  helper-dialect: mysql
  # 合理化分页参数
  reasonable: true
  # 支持通过参数传递分页参数
  support-methods-arguments: true
  # 分页参数
  params: count=countSql
  # 自动识别数据库
  auto-runtime-dialect: true
```

**XML 配置方式：**
```xml
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor">
        <property name="helperDialect" value="mysql"/>
        <property name="reasonable" value="true"/>
        <property name="supportMethodsArguments" value="true"/>
    </plugin>
</plugins>
```

5. **多数据库支持**

PageHelper 自动识别数据库方言，支持：

| 数据库 | 分页语法 |
|--------|---------|
| MySQL | `LIMIT #{offset}, #{limit}` |
| Oracle | `ROWNUM` 或 `ROW_NUMBER()` |
| PostgreSQL | `LIMIT #{limit} OFFSET #{offset}` |
| SQL Server | `OFFSET #{offset} ROWS FETCH NEXT #{limit} ROWS ONLY` |
| H2 | `LIMIT #{limit} OFFSET #{offset}` |
| SQLite | `LIMIT #{limit} OFFSET #{offset}` |

6. **使用注意事项**

**避免的错误用法：**
```java
// ❌ 错误：startPage 和查询之间有其他查询
PageHelper.startPage(1, 10);
int count = userMapper.count();  // 这个查询会被分页！
List<User> users = userMapper.selectAll();  // 这个不会分页

// ✅ 正确：startPage 紧跟查询
PageHelper.startPage(1, 10);
List<User> users = userMapper.selectAll();

// ❌ 错误：在循环中使用
for (int i = 0; i < 10; i++) {
    PageHelper.startPage(i, 10);
    userMapper.selectAll();  // 只有第一次生效
}

// ✅ 正确：每次都要设置
for (int i = 0; i < 10; i++) {
    PageHelper.startPage(i, 10);
    List<User> users = userMapper.selectAll();
    // 使用 users
}
```

**ThreadLocal 清理：**
```java
// PageHelper 会自动清理 ThreadLocal
// 但在异步、线程池场景需要手动清理
try {
    PageHelper.startPage(1, 10);
    return userMapper.selectAll();
} finally {
    PageHelper.clearPage();  // 手动清理
}
```

7. **性能优化**

```java
// 1. 不需要 count 查询时关闭
PageHelper.startPage(1, 10, false);

// 2. 大数据量时使用游标
Page<User> page = PageHelper.startPage(1, 10)
                            .setCount(false);  // 关闭 count

// 3. 使用缓存（查询条件相同时）
@Cacheable("users")
public PageInfo<User> getUserList(int pageNum, int pageSize) {
    PageHelper.startPage(pageNum, pageSize);
    List<User> users = userMapper.selectAll();
    return new PageInfo<>(users);
}
```

**关键要点**

1. **使用简单**：只需在查询前调用 startPage，无需修改 SQL
2. **ThreadLocal**：使用 ThreadLocal 存储分页参数，线程安全
3. **自动识别**：自动识别数据库方言，无需手动配置
4. **物理分页**：改写 SQL 实现物理分页，性能好
5. **紧跟原则**：startPage 必须紧跟第一个 SELECT 查询

**记忆口诀**

"查询之前先 startPage，紧跟查询不能乱，PageInfo 包装拿结果，物理分页性能好"
## 执行流程
### 69. MyBatis 的执行流程是怎样的？

**核心答案**

MyBatis 的执行流程：1) 加载配置文件创建 SqlSessionFactory；2) 通过 SqlSessionFactory 创建 SqlSession；3) SqlSession 获取 Mapper 代理对象；4) 通过 Executor 执行 SQL（经过 StatementHandler、ParameterHandler）；5) 使用 ResultSetHandler 处理结果集；6) 返回结果并关闭 SqlSession。

**详细说明**

1. **完整执行流程图**

<svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="640" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">MyBatis 完整执行流程</text>
<rect x="280" y="90" width="240" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="13" fill="#1976d2">1. 加载 mybatis-config.xml</text>
<line x1="400" y1="140" x2="400" y2="160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="160" width="240" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="190" text-anchor="middle" font-size="13" fill="#e65100">2. 创建 SqlSessionFactory</text>
<line x1="400" y1="210" x2="400" y2="230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="230" width="240" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="260" text-anchor="middle" font-size="13" fill="#7b1fa2">3. 创建 SqlSession</text>
<line x1="400" y1="280" x2="400" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="300" width="240" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="330" text-anchor="middle" font-size="13" fill="#2e7d32">4. 获取 Mapper 代理对象</text>
<line x1="400" y1="350" x2="400" y2="370" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="370" width="240" height="50" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" rx="5"/>
<text x="400" y="400" text-anchor="middle" font-size="13" fill="#f57f17">5. 调用 Mapper 方法</text>
<line x1="400" y1="420" x2="400" y2="440" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="440" width="240" height="50" fill="#ffccbc" stroke="#ff7043" stroke-width="2" rx="5"/>
<text x="400" y="470" text-anchor="middle" font-size="13" fill="#d84315">6. Executor 执行</text>
<line x1="400" y1="490" x2="200" y2="520" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="490" x2="600" y2="520" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="520" width="200" height="40" fill="#e1bee7" stroke="#ab47bc" stroke-width="1" rx="3"/>
<text x="200" y="545" text-anchor="middle" font-size="12" fill="#6a1b9a">7a. StatementHandler</text>
<rect x="500" y="520" width="200" height="40" fill="#b2dfdb" stroke="#26a69a" stroke-width="1" rx="3"/>
<text x="600" y="545" text-anchor="middle" font-size="12" fill="#00695c">7b. 缓存处理</text>
<line x1="200" y1="560" x2="200" y2="580" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="580" width="200" height="40" fill="#c8e6c9" stroke="#66bb6a" stroke-width="1" rx="3"/>
<text x="200" y="605" text-anchor="middle" font-size="12" fill="#2e7d32">8. ParameterHandler</text>
<line x1="200" y1="620" x2="400" y2="650" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="600" y1="560" x2="400" y2="650" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<ellipse cx="400" cy="660" rx="80" ry="25" fill="#ffebee" stroke="#f44336" stroke-width="2"/>
<text x="400" y="668" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">执行 SQL</text>
<line x1="400" y1="675" x2="400" y2="695" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="320" y1="685" x2="200" y2="705" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="100" y="705" width="200" height="40" fill="#b3e5fc" stroke="#29b6f6" stroke-width="1" rx="3"/>
<text x="200" y="730" text-anchor="middle" font-size="12" fill="#01579b">9. ResultSetHandler</text>
<line x1="300" y1="725" x2="380" y2="725" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="380" y="705" width="200" height="40" fill="#dcedc8" stroke="#9ccc65" stroke-width="1" rx="3"/>
<text x="480" y="730" text-anchor="middle" font-size="12" fill="#33691e">10. 返回结果</text>
</svg>

2. **分阶段详解**

**阶段一：初始化阶段**

```java
// 1. 读取配置文件
InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");

// 2. 创建 SqlSessionFactoryBuilder
SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();

// 3. 解析配置，创建 Configuration 对象
// 4. 构建 SqlSessionFactory（单例）
SqlSessionFactory factory = builder.build(inputStream);
```

**Configuration 对象包含：**
- 数据源配置
- Mapper 映射信息
- 类型处理器
- 插件拦截器
- 缓存配置
- 所有 SQL 语句（MappedStatement）

---

**阶段二：创建 SqlSession**

```java
// 1. 从 SqlSessionFactory 获取 SqlSession
SqlSession sqlSession = factory.openSession();

// 底层实现：
// - 从数据源获取 Connection
// - 创建 Transaction（事务管理器）
// - 创建 Executor（执行器）
// - 应用插件代理 Executor
```

**Executor 类型：**
- **SimpleExecutor**：默认，每次执行创建新的 Statement
- **ReuseExecutor**：重用 Statement
- **BatchExecutor**：批量执行

---

**阶段三：获取 Mapper 代理**

```java
// 1. 获取 Mapper 接口代理对象
UserMapper mapper = sqlSession.getMapper(UserMapper.class);

// 2. 底层使用 JDK 动态代理
// MapperProxyFactory.newInstance() 创建代理对象
```

**代理实现：**
```java
public class MapperProxy<T> implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) {
        // 1. 如果是 Object 方法（toString 等），直接执行
        if (Object.class.equals(method.getDeclaringClass())) {
            return method.invoke(this, args);
        }

        // 2. 获取 MapperMethod（封装了方法信息）
        MapperMethod mapperMethod = cachedMapperMethod(method);

        // 3. 执行 SQL
        return mapperMethod.execute(sqlSession, args);
    }
}
```

---

**阶段四：执行 SQL**

```java
// 1. 调用 Mapper 方法
User user = mapper.getUserById(1);

// 2. 转发到 SqlSession
// sqlSession.selectOne("com.example.UserMapper.getUserById", 1);

// 3. SqlSession 委托给 Executor
executor.query(ms, parameter, rowBounds, handler);
```

**Executor 执行流程：**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="390" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">Executor 执行细节</text>
<rect x="280" y="90" width="240" height="50" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="120" text-anchor="middle" font-size="13" fill="#1976d2">1. 检查一级缓存</text>
<line x1="400" y1="140" x2="400" y2="170" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="170" width="240" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="400" y="200" text-anchor="middle" font-size="13" fill="#e65100">2. 创建 StatementHandler</text>
<line x1="400" y1="220" x2="400" y2="250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="250" width="240" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="280" text-anchor="middle" font-size="13" fill="#7b1fa2">3. 预编译 SQL (prepare)</text>
<line x1="400" y1="300" x2="400" y2="330" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="330" width="240" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="400" y="360" text-anchor="middle" font-size="13" fill="#2e7d32">4. 设置参数 (setParameters)</text>
<line x1="280" y1="355" x2="200" y2="355" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="80" y="330" width="120" height="50" fill="#b3e5fc" stroke="#29b6f6" stroke-width="1" rx="3"/>
<text x="140" y="360" text-anchor="middle" font-size="12" fill="#01579b">Parameter</text>
<text x="140" y="375" text-anchor="middle" font-size="12" fill="#01579b">Handler</text>
<line x1="400" y1="380" x2="400" y2="400" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<ellipse cx="400" cy="410" rx="100" ry="20" fill="#ffebee" stroke="#f44336" stroke-width="2"/>
<text x="400" y="415" text-anchor="middle" font-size="12" font-weight="bold" fill="#c62828">执行 SQL 查询</text>
<line x1="500" y1="410" x2="600" y2="355" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="600" y="330" width="120" height="50" fill="#dcedc8" stroke="#9ccc65" stroke-width="1" rx="3"/>
<text x="660" y="360" text-anchor="middle" font-size="12" fill="#33691e">ResultSet</text>
<text x="660" y="375" text-anchor="middle" font-size="12" fill="#33691e">Handler</text>
</svg>

**StatementHandler 职责：**
```java
// 1. 预编译 SQL
PreparedStatement stmt = connection.prepareStatement(sql);

// 2. 设置参数（委托给 ParameterHandler）
parameterHandler.setParameters(stmt);

// 3. 执行查询
ResultSet rs = stmt.executeQuery();

// 4. 处理结果（委托给 ResultSetHandler）
List<Object> result = resultSetHandler.handleResultSets(stmt);
```

---

**阶段五：结果映射**

```java
// ResultSetHandler 处理结果集
public class DefaultResultSetHandler {
    public List<Object> handleResultSets(Statement stmt) {
        // 1. 获取 ResultSet
        ResultSet rs = stmt.getResultSet();

        // 2. 根据 resultMap 或 resultType 映射
        while (rs.next()) {
            Object rowValue = createResultObject(rs);
            // 自动映射或手动映射字段
            applyAutomaticMappings(rs, rowValue);
            applyPropertyMappings(rs, rowValue);
            results.add(rowValue);
        }

        return results;
    }
}
```

3. **核心组件关系**

| 组件 | 职责 | 生命周期 |
|------|------|---------|
| SqlSessionFactory | 创建 SqlSession | 应用级别（单例） |
| SqlSession | 执行 SQL、管理事务 | 请求/方法级别 |
| Executor | 执行器，调度 SQL 执行 | SqlSession 级别 |
| StatementHandler | JDBC Statement 处理 | 方法级别 |
| ParameterHandler | 参数设置 | 方法级别 |
| ResultSetHandler | 结果集映射 | 方法级别 |

4. **代码示例**

```java
// 完整使用示例
public class MyBatisExample {
    public static void main(String[] args) {
        SqlSession sqlSession = null;
        try {
            // 1. 获取 SqlSession
            sqlSession = SqlSessionFactoryUtil.openSession();

            // 2. 获取 Mapper
            UserMapper mapper = sqlSession.getMapper(UserMapper.class);

            // 3. 执行查询
            User user = mapper.getUserById(1);

            // 4. 提交事务
            sqlSession.commit();

            System.out.println(user);
        } catch (Exception e) {
            // 5. 回滚事务
            if (sqlSession != null) {
                sqlSession.rollback();
            }
            e.printStackTrace();
        } finally {
            // 6. 关闭 SqlSession
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
    }
}
```

**关键要点**

1. **两阶段**：初始化阶段（创建 SqlSessionFactory）+ 执行阶段（执行 SQL）
2. **三层架构**：SqlSession → Executor → StatementHandler
3. **四大对象**：Executor、StatementHandler、ParameterHandler、ResultSetHandler
4. **动态代理**：Mapper 接口通过 JDK 动态代理实现
5. **缓存机制**：一级缓存在 Executor 中，二级缓存在 Configuration 中

**记忆口诀**

"配置工厂会话开，代理映射方法调，执行器调度四对象，结果映射终返回"

### 70. SqlSessionFactory 的作用是什么？

**核心答案**

SqlSessionFactory 是 MyBatis 的核心工厂类，负责创建 SqlSession 实例。它包含了 MyBatis 的所有配置信息（Configuration 对象），是应用级别的单例对象，线程安全。主要作用是：管理数据源和事务、创建 SqlSession、维护配置信息。

**详细说明**

1. **SqlSessionFactory 在架构中的位置**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="440" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">SqlSessionFactory 架构位置</text>
<rect x="100" y="90" width="600" height="80" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="400" y="115" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976d2">应用层</text>
<text x="130" y="140" font-size="12" fill="#424242">• Service 层</text>
<text x="130" y="160" font-size="12" fill="#424242">• Controller 层</text>
<line x1="400" y1="170" x2="400" y2="200" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="250" y="200" width="300" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="3" rx="5"/>
<text x="400" y="225" text-anchor="middle" font-size="15" font-weight="bold" fill="#e65100">SqlSessionFactory</text>
<text x="400" y="245" text-anchor="middle" font-size="11" fill="#e65100">（单例、线程安全）</text>
<line x1="400" y1="260" x2="400" y2="290" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="280" y="290" width="240" height="50" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="400" y="320" text-anchor="middle" font-size="13" fill="#7b1fa2">SqlSession (多例)</text>
<line x1="350" y1="340" x2="200" y2="380" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="450" y1="340" x2="600" y2="380" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="120" y="380" width="160" height="50" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="5"/>
<text x="200" y="410" text-anchor="middle" font-size="13" fill="#2e7d32">Executor</text>
<rect x="520" y="380" width="160" height="50" fill="#ffebee" stroke="#f44336" stroke-width="2" rx="5"/>
<text x="600" y="410" text-anchor="middle" font-size="13" fill="#c62828">数据库连接</text>
</svg>

2. **主要作用**

**1. 创建 SqlSession**

SqlSessionFactory 最核心的功能是创建 SqlSession。

```java
// 创建 SqlSession 的多种方式
public interface SqlSessionFactory {

    // 1. 默认配置（自动提交=false）
    SqlSession openSession();

    // 2. 指定是否自动提交
    SqlSession openSession(boolean autoCommit);

    // 3. 指定 Connection
    SqlSession openSession(Connection connection);

    // 4. 指定事务隔离级别
    SqlSession openSession(TransactionIsolationLevel level);

    // 5. 指定 Executor 类型
    SqlSession openSession(ExecutorType execType);

    // 6. 组合配置
    SqlSession openSession(ExecutorType execType, boolean autoCommit);
}
```

**ExecutorType 类型：**
- **SIMPLE**：默认，每次执行创建新的 PreparedStatement
- **REUSE**：重用 PreparedStatement
- **BATCH**：批量执行，用于批量更新

---

**2. 管理 Configuration**

SqlSessionFactory 持有 Configuration 对象，包含所有配置信息。

```java
public class DefaultSqlSessionFactory implements SqlSessionFactory {
    private final Configuration configuration;

    public DefaultSqlSessionFactory(Configuration configuration) {
        this.configuration = configuration;
    }

    public Configuration getConfiguration() {
        return configuration;
    }
}
```

**Configuration 包含：**
- 环境配置（数据源、事务管理器）
- Mapper 注册信息
- TypeHandler 类型处理器
- 插件拦截器
- 缓存配置
- 所有 MappedStatement（SQL 映射）

---

**3. 维护数据源和事务管理器**

```java
public SqlSession openSession() {
    // 1. 从 Environment 获取数据源和事务工厂
    Environment environment = configuration.getEnvironment();
    TransactionFactory txFactory = environment.getTransactionFactory();

    // 2. 创建事务对象
    Transaction tx = txFactory.newTransaction(
        environment.getDataSource(),
        level,
        autoCommit
    );

    // 3. 创建 Executor
    Executor executor = configuration.newExecutor(tx, execType);

    // 4. 创建 SqlSession
    return new DefaultSqlSession(configuration, executor, autoCommit);
}
```

3. **创建方式**

**使用 SqlSessionFactoryBuilder（传统方式）：**

```java
public class SqlSessionFactoryUtil {

    private static SqlSessionFactory sqlSessionFactory;

    static {
        try {
            // 1. 读取配置文件
            InputStream inputStream = Resources.getResourceAsStream(
                "mybatis-config.xml"
            );

            // 2. 创建 SqlSessionFactoryBuilder
            SqlSessionFactoryBuilder builder =
                new SqlSessionFactoryBuilder();

            // 3. 构建 SqlSessionFactory（单例）
            sqlSessionFactory = builder.build(inputStream);

        } catch (IOException e) {
            throw new RuntimeException("初始化 SqlSessionFactory 失败", e);
        }
    }

    // 获取 SqlSession
    public static SqlSession openSession() {
        return sqlSessionFactory.openSession();
    }

    // 获取自动提交的 SqlSession
    public static SqlSession openSession(boolean autoCommit) {
        return sqlSessionFactory.openSession(autoCommit);
    }
}
```

**使用 Spring 集成（推荐）：**

```java
@Configuration
public class MyBatisConfig {

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource)
            throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();

        // 设置数据源
        factoryBean.setDataSource(dataSource);

        // 设置配置文件位置
        factoryBean.setConfigLocation(
            new ClassPathResource("mybatis-config.xml")
        );

        // 设置 Mapper 文件位置
        factoryBean.setMapperLocations(
            new PathMatchingResourcePatternResolver()
                .getResources("classpath:mapper/*.xml")
        );

        return factoryBean.getObject();
    }
}
```

**Spring Boot 自动配置：**

```yaml
# application.yml
mybatis:
  config-location: classpath:mybatis-config.xml
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.example.entity
  configuration:
    map-underscore-to-camel-case: true
```

```java
// Spring Boot 自动创建 SqlSessionFactory
@Autowired
private SqlSessionFactory sqlSessionFactory;
```

4. **与 SqlSession 的关系**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
<rect x="50" y="30" width="700" height="340" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="60" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">SqlSessionFactory vs SqlSession</text>
<rect x="100" y="100" width="250" height="240" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="5"/>
<text x="225" y="130" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976d2">SqlSessionFactory</text>
<text x="120" y="160" font-size="12" fill="#424242">• 应用级别（单例）</text>
<text x="120" y="185" font-size="12" fill="#424242">• 线程安全</text>
<text x="120" y="210" font-size="12" fill="#424242">• 包含 Configuration</text>
<text x="120" y="235" font-size="12" fill="#424242">• 创建 SqlSession</text>
<text x="120" y="260" font-size="12" fill="#424242">• 管理数据源</text>
<text x="120" y="285" font-size="12" fill="#424242">• 生命周期：整个应用</text>
<text x="120" y="310" font-size="12" fill="#424242">• 创建方式：Builder</text>
<rect x="450" y="100" width="250" height="240" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="5"/>
<text x="575" y="130" text-anchor="middle" font-size="15" font-weight="bold" fill="#e65100">SqlSession</text>
<text x="470" y="160" font-size="12" fill="#424242">• 请求/方法级别（多例）</text>
<text x="470" y="185" font-size="12" fill="#424242">• 线程不安全</text>
<text x="470" y="210" font-size="12" fill="#424242">• 执行 SQL 操作</text>
<text x="470" y="235" font-size="12" fill="#424242">• 管理事务</text>
<text x="470" y="260" font-size="12" fill="#424242">• 管理一级缓存</text>
<text x="470" y="285" font-size="12" fill="#424242">• 生命周期：一次请求</text>
<text x="470" y="310" font-size="12" fill="#424242">• 创建方式：Factory</text>
<line x1="350" y1="220" x2="450" y2="220" stroke="#666" stroke-width="3" marker-end="url(#arrowhead)"/>
<text x="400" y="210" text-anchor="middle" font-size="12" fill="#666">创建</text>
</svg>

5. **最佳实践**

**1. 单例模式**
```java
// ✅ 正确：使用单例
public class MyBatisUtil {
    private static final SqlSessionFactory factory = buildFactory();

    public static SqlSession openSession() {
        return factory.openSession();
    }
}

// ❌ 错误：每次创建新的 Factory
public SqlSession getSession() {
    SqlSessionFactory factory = new SqlSessionFactoryBuilder()
        .build(inputStream);  // 错误！
    return factory.openSession();
}
```

**2. SqlSession 使用完必须关闭**
```java
// ✅ 正确：使用 try-with-resources
try (SqlSession session = factory.openSession()) {
    UserMapper mapper = session.getMapper(UserMapper.class);
    return mapper.getUserById(id);
}

// ❌ 错误：不关闭 SqlSession
SqlSession session = factory.openSession();
UserMapper mapper = session.getMapper(UserMapper.class);
return mapper.getUserById(id);  // 连接泄露！
```

**3. Spring 集成自动管理**
```java
// Spring 环境下，SqlSession 由 Spring 管理
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;  // Spring 自动注入

    public User getUser(Integer id) {
        return userMapper.getUserById(id);
        // 无需手动关闭，Spring 自动管理
    }
}
```

6. **核心属性对比**

| 特性 | SqlSessionFactory | SqlSession |
|------|------------------|------------|
| 作用域 | 应用级别（单例） | 请求/方法级别 |
| 线程安全 | 是 | 否 |
| 生命周期 | 整个应用运行期间 | 一次请求或方法调用 |
| 主要职责 | 创建 SqlSession | 执行 SQL、管理事务 |
| 是否可共享 | 可以（单例） | 不可以（线程不安全） |
| 关闭时机 | 应用停止时 | 使用完立即关闭 |

**关键要点**

1. **单例模式**：SqlSessionFactory 应该是应用级别的单例
2. **线程安全**：SqlSessionFactory 是线程安全的，可以被多个线程共享
3. **工厂职责**：负责创建 SqlSession，管理配置和数据源
4. **一次构建**：通过 SqlSessionFactoryBuilder 构建，之后重复使用
5. **Spring 集成**：推荐使用 Spring 管理，自动配置和注入

**记忆口诀**

"工厂单例线程安，创建会话管配置，数据源和事务管，Spring 集成更方便"

### 71. SqlSession 的作用是什么？

**核心答案**

SqlSession 是 MyBatis 的**核心接口**，代表和数据库的**一次会话**，提供了执行 SQL、获取 Mapper、管理事务的所有方法。就像 JDBC 中的 Connection，但功能更强大。

**详细说明**

**1. SqlSession 的核心职责**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="300" y="20" width="200" height="60" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="400" y="55" font-size="18" fill="white" text-anchor="middle" font-weight="bold">SqlSession</text>
<rect x="50" y="150" width="150" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="125" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">SQL 执行</text>
<text x="125" y="200" font-size="12" fill="#666" text-anchor="middle">select()</text>
<text x="125" y="218" font-size="12" fill="#666" text-anchor="middle">insert/update/delete</text>
<rect x="240" y="150" width="150" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="315" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">Mapper 获取</text>
<text x="315" y="200" font-size="12" fill="#666" text-anchor="middle">getMapper()</text>
<text x="315" y="218" font-size="12" fill="#666" text-anchor="middle">动态代理</text>
<rect x="430" y="150" width="150" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="505" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">事务管理</text>
<text x="505" y="200" font-size="12" fill="#666" text-anchor="middle">commit()</text>
<text x="505" y="218" font-size="12" fill="#666" text-anchor="middle">rollback()</text>
<rect x="620" y="150" width="150" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="695" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">缓存管理</text>
<text x="695" y="200" font-size="12" fill="#666" text-anchor="middle">clearCache()</text>
<text x="695" y="218" font-size="12" fill="#666" text-anchor="middle">一级缓存</text>
<path d="M 400 80 L 125 150" stroke="#4A90E2" stroke-width="2" fill="none" marker-end="url(#arrowblue)"/>
<path d="M 400 80 L 315 150" stroke="#4A90E2" stroke-width="2" fill="none" marker-end="url(#arrowblue)"/>
<path d="M 400 80 L 505 150" stroke="#4A90E2" stroke-width="2" fill="none" marker-end="url(#arrowblue)"/>
<path d="M 400 80 L 695 150" stroke="#4A90E2" stroke-width="2" fill="none" marker-end="url(#arrowblue)"/>
<rect x="50" y="280" width="720" height="120" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="410" y="305" font-size="14" fill="#E67E22" text-anchor="middle" font-weight="bold">⚠️ 重要特性</text>
<text x="70" y="330" font-size="13" fill="#666" text-anchor="start">• 线程不安全：每个线程应该有自己的 SqlSession 实例</text>
<text x="70" y="355" font-size="13" fill="#666" text-anchor="start">• 会话级别：一次会话一个 SqlSession，用完即关闭</text>
<text x="70" y="380" font-size="13" fill="#666" text-anchor="start">• 自动管理：一级缓存（Session Cache）作用域为 SqlSession 生命周期</text>
<rect x="250" y="430" width="300" height="50" fill="#E8F8E8" stroke="#52C41A" stroke-width="2" rx="5"/>
<text x="400" y="460" font-size="14" fill="#389E0D" text-anchor="middle" font-weight="bold">获取方式：sqlSessionFactory.openSession()</text>
<defs>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**2. SqlSession 的主要方法**

| 方法类别 | 主要方法 | 说明 |
|---------|---------|------|
| **查询操作** | `selectOne()` | 查询单条记录 |
| | `selectList()` | 查询多条记录 |
| | `selectMap()` | 查询结果转为 Map |
| **更新操作** | `insert()` | 插入数据 |
| | `update()` | 更新数据 |
| | `delete()` | 删除数据 |
| **事务操作** | `commit()` | 提交事务 |
| | `rollback()` | 回滚事务 |
| **Mapper 操作** | `getMapper()` | 获取 Mapper 接口代理对象 |
| **缓存操作** | `clearCache()` | 清空一级缓存 |
| **资源管理** | `close()` | 关闭 SqlSession |

**3. SqlSession 的生命周期**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="160" height="80" fill="#52C41A" stroke="#389E0D" stroke-width="2" rx="5"/>
<text x="130" y="85" font-size="14" fill="white" text-anchor="middle" font-weight="bold">1. 创建</text>
<text x="130" y="110" font-size="12" fill="white" text-anchor="middle">openSession()</text>
<rect x="250" y="50" width="160" height="80" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="330" y="85" font-size="14" fill="white" text-anchor="middle" font-weight="bold">2. 使用</text>
<text x="330" y="110" font-size="12" fill="white" text-anchor="middle">执行 SQL/事务</text>
<rect x="450" y="50" width="160" height="80" fill="#FA8C16" stroke="#D46B08" stroke-width="2" rx="5"/>
<text x="530" y="85" font-size="14" fill="white" text-anchor="middle" font-weight="bold">3. 提交/回滚</text>
<text x="530" y="110" font-size="12" fill="white" text-anchor="middle">commit/rollback</text>
<rect x="650" y="50" width="130" height="80" fill="#F5222D" stroke="#CF1322" stroke-width="2" rx="5"/>
<text x="715" y="85" font-size="14" fill="white" text-anchor="middle" font-weight="bold">4. 关闭</text>
<text x="715" y="110" font-size="12" fill="white" text-anchor="middle">close()</text>
<path d="M 210 90 L 250 90" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 410 90 L 450 90" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 610 90 L 650 90" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="50" y="180" width="730" height="180" fill="#F0F0F0" stroke="#999" stroke-width="2" rx="5"/>
<text x="415" y="210" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">典型使用模式（try-with-resources）</text>
<text x="70" y="240" font-size="12" fill="#333" font-family="monospace">try (SqlSession session = sqlSessionFactory.openSession()) {</text>
<text x="90" y="265" font-size="12" fill="#52C41A" font-family="monospace">// 1. 获取 Mapper</text>
<text x="90" y="285" font-size="12" fill="#333" font-family="monospace">UserMapper mapper = session.getMapper(UserMapper.class);</text>
<text x="90" y="305" font-size="12" fill="#52C41A" font-family="monospace">// 2. 执行操作</text>
<text x="90" y="325" font-size="12" fill="#333" font-family="monospace">User user = mapper.selectById(1);</text>
<text x="90" y="345" font-size="12" fill="#52C41A" font-family="monospace">// 3. 自动提交和关闭</text>
<text x="70" y="365" font-size="12" fill="#333" font-family="monospace">}</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
</defs>
</svg>

**4. SqlSession 的两种实现**

| 实现类 | 适用场景 | 特点 |
|-------|---------|------|
| **DefaultSqlSession** | 单独使用 MyBatis | 线程不安全，需手动管理 |
| **SqlSessionTemplate** | Spring 整合 | 线程安全，自动管理事务和生命周期 |

**关键要点**

1. **会话概念**：SqlSession = 一次数据库会话，包含连接、缓存、事务
2. **线程不安全**：不能在多线程间共享，每个线程独立使用
3. **及时关闭**：用完必须关闭，释放数据库连接（建议 try-with-resources）
4. **两种用法**：
   - 直接调用 `session.selectOne()` 等方法
   - 通过 `getMapper()` 获取接口代理对象（推荐）
5. **自动提交**：`openSession()` 默认不自动提交，`openSession(true)` 开启自动提交

**记忆口诀**

```
会话代表一次连 (会话)
SQL 执行全靠它 (执行)
Mapper 获取找代理 (代理)
事务缓存它管理 (管理)
线程不安用完关 (关闭)
```

### 72. Executor 的作用是什么？Executor 有哪些类型？

**核心答案**

Executor 是 MyBatis 的**核心执行器**，负责**真正执行 SQL 语句**、管理缓存和事务。SqlSession 只是门面，实际工作由 Executor 完成。有三种类型：**SimpleExecutor**（简单）、**ReuseExecutor**（复用）、**BatchExecutor**（批量）。

**详细说明**

**1. Executor 在 MyBatis 架构中的位置**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="300" y="20" width="200" height="60" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="400" y="55" font-size="18" fill="white" text-anchor="middle" font-weight="bold">SqlSession (门面)</text>
<path d="M 400 80 L 400 130" stroke="#333" stroke-width="3" marker-end="url(#arrow)"/>
<text x="480" y="110" font-size="13" fill="#999" font-style="italic">委托</text>
<rect x="300" y="130" width="200" height="60" fill="#FA541C" stroke="#D4380D" stroke-width="2" rx="5"/>
<text x="400" y="165" font-size="18" fill="white" text-anchor="middle" font-weight="bold">Executor (执行器)</text>
<path d="M 400 190 L 200 260" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 400 190 L 400 260" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 400 190 L 600 260" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<rect x="80" y="260" width="240" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="200" y="290" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">StatementHandler</text>
<text x="200" y="315" font-size="12" fill="#666" text-anchor="middle">SQL 语句处理</text>
<rect x="360" y="260" width="240" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="480" y="290" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">ParameterHandler</text>
<text x="480" y="315" font-size="12" fill="#666" text-anchor="middle">参数设置</text>
<rect x="640" y="260" width="150" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="715" y="290" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">ResultSetHandler</text>
<text x="715" y="315" font-size="12" fill="#666" text-anchor="middle">结果映射</text>
<rect x="200" y="370" width="400" height="60" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="400" y="395" font-size="14" fill="#E67E22" text-anchor="middle" font-weight="bold">核心职责：SQL 执行调度 + 缓存管理 + 事务控制</text>
<text x="400" y="415" font-size="12" fill="#999" text-anchor="middle">Executor 是 SqlSession 的"大脑"</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**2. Executor 的三种类型**

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<rect x="300" y="20" width="250" height="60" fill="#722ED1" stroke="#531DAB" stroke-width="2" rx="5"/>
<text x="425" y="55" font-size="18" fill="white" text-anchor="middle" font-weight="bold">Executor 三剑客</text>
<rect x="50" y="130" width="220" height="180" fill="#F0F5FF" stroke="#597EF7" stroke-width="2" rx="5"/>
<text x="160" y="160" font-size="16" fill="#1D39C4" text-anchor="middle" font-weight="bold">SimpleExecutor</text>
<text x="160" y="185" font-size="13" fill="#666" text-anchor="middle">(简单执行器)</text>
<line x1="60" y1="195" x2="260" y2="195" stroke="#D9D9D9" stroke-width="1"/>
<text x="70" y="220" font-size="12" fill="#333" text-anchor="start">• 默认类型</text>
<text x="70" y="240" font-size="12" fill="#333" text-anchor="start">• 每次执行创建新</text>
<text x="75" y="255" font-size="12" fill="#666" text-anchor="start">Statement</text>
<text x="70" y="275" font-size="12" fill="#333" text-anchor="start">• 用完立即关闭</text>
<text x="70" y="295" font-size="12" fill="#52C41A" text-anchor="start">✓ 简单可靠</text>
<rect x="315" y="130" width="220" height="180" fill="#FFF7E6" stroke="#FFA940" stroke-width="2" rx="5"/>
<text x="425" y="160" font-size="16" fill="#D46B08" text-anchor="middle" font-weight="bold">ReuseExecutor</text>
<text x="425" y="185" font-size="13" fill="#666" text-anchor="middle">(复用执行器)</text>
<line x1="325" y1="195" x2="525" y2="195" stroke="#D9D9D9" stroke-width="1"/>
<text x="335" y="220" font-size="12" fill="#333" text-anchor="start">• 复用 Statement</text>
<text x="335" y="240" font-size="12" fill="#333" text-anchor="start">• 缓存预编译的</text>
<text x="340" y="255" font-size="12" fill="#666" text-anchor="start">PreparedStatement</text>
<text x="335" y="275" font-size="12" fill="#333" text-anchor="start">• 减少编译次数</text>
<text x="335" y="295" font-size="12" fill="#52C41A" text-anchor="start">✓ 性能提升</text>
<rect x="580" y="130" width="220" height="180" fill="#F6FFED" stroke="#95DE64" stroke-width="2" rx="5"/>
<text x="690" y="160" font-size="16" fill="#389E0D" text-anchor="middle" font-weight="bold">BatchExecutor</text>
<text x="690" y="185" font-size="13" fill="#666" text-anchor="middle">(批量执行器)</text>
<line x1="590" y1="195" x2="790" y2="195" stroke="#D9D9D9" stroke-width="1"/>
<text x="600" y="220" font-size="12" fill="#333" text-anchor="start">• 批量执行 SQL</text>
<text x="600" y="240" font-size="12" fill="#333" text-anchor="start">• 使用 JDBC 批处理</text>
<text x="600" y="260" font-size="12" fill="#333" text-anchor="start">• 适合大量写操作</text>
<text x="600" y="280" font-size="12" fill="#333" text-anchor="start">• 需手动 flush</text>
<text x="600" y="300" font-size="12" fill="#52C41A" text-anchor="start">✓ 批量高效</text>
<path d="M 425 80 L 160 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<path d="M 425 80 L 425 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<path d="M 425 80 L 690 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<rect x="50" y="340" width="750" height="120" fill="#FFF" stroke="#999" stroke-width="2" rx="5"/>
<text x="425" y="370" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">性能对比（执行 1000 次 INSERT）</text>
<rect x="80" y="390" width="180" height="50" fill="#E6F7FF" stroke="#597EF7" stroke-width="1" rx="3"/>
<text x="170" y="415" font-size="12" fill="#1D39C4" text-anchor="middle">Simple: ~1000ms</text>
<text x="170" y="435" font-size="11" fill="#999" text-anchor="middle">1000 次编译</text>
<rect x="290" y="390" width="180" height="50" fill="#FFF7E6" stroke="#FFA940" stroke-width="1" rx="3"/>
<text x="380" y="415" font-size="12" fill="#D46B08" text-anchor="middle">Reuse: ~800ms</text>
<text x="380" y="435" font-size="11" fill="#999" text-anchor="middle">1 次编译</text>
<rect x="500" y="390" width="180" height="50" fill="#F6FFED" stroke="#95DE64" stroke-width="1" rx="3"/>
<text x="590" y="415" font-size="12" fill="#389E0D" text-anchor="middle">Batch: ~200ms</text>
<text x="590" y="435" font-size="11" fill="#999" text-anchor="middle">批量提交</text>
<rect x="150" y="490" width="550" height="140" fill="#F0F0F0" stroke="#999" stroke-width="2" rx="5"/>
<text x="425" y="520" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">配置方式</text>
<text x="170" y="550" font-size="12" fill="#333" font-family="monospace">&lt;setting name="defaultExecutorType" value="SIMPLE"/&gt;</text>
<text x="170" y="575" font-size="12" fill="#52C41A" font-family="monospace">// 或通过代码指定</text>
<text x="170" y="595" font-size="12" fill="#333" font-family="monospace">SqlSession session = factory.openSession(ExecutorType.BATCH);</text>
<text x="170" y="615" font-size="11" fill="#999">可选值：SIMPLE (默认) | REUSE | BATCH</text>
<defs>
<marker id="arrowpurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#722ED1"/>
</marker>
</defs>
</svg>

**3. Executor 的核心职责**

| 职责 | 说明 | 涉及方法 |
|-----|------|---------|
| **SQL 执行** | 调度 StatementHandler 执行 SQL | `query()`, `update()` |
| **缓存管理** | 管理一级缓存（本地缓存） | `createCacheKey()`, `clearLocalCache()` |
| **事务控制** | 协调事务提交和回滚 | `commit()`, `rollback()` |
| **批处理** | 处理批量操作（BatchExecutor） | `flushStatements()` |
| **延迟加载** | 支持关联查询的延迟加载 | `deferLoad()` |

**4. 三种 Executor 的使用场景**

<svg viewBox="0 0 750 400" xmlns="http://www.w3.org/2000/svg">
<text x="375" y="30" font-size="16" fill="#333" text-anchor="middle" font-weight="bold">选择决策树</text>
<rect x="300" y="50" width="150" height="50" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="375" y="80" font-size="14" fill="white" text-anchor="middle">需要批量操作？</text>
<path d="M 325 100 L 200 160" stroke="#52C41A" stroke-width="2" marker-end="url(#arrowgreen)"/>
<text x="250" y="135" font-size="13" fill="#52C41A" font-weight="bold">是</text>
<path d="M 425 100 L 550 160" stroke="#F5222D" stroke-width="2" marker-end="url(#arrowred)"/>
<text x="500" y="135" font-size="13" fill="#F5222D" font-weight="bold">否</text>
<rect x="100" y="160" width="200" height="60" fill="#52C41A" stroke="#389E0D" stroke-width="2" rx="5"/>
<text x="200" y="185" font-size="14" fill="white" text-anchor="middle" font-weight="bold">BatchExecutor</text>
<text x="200" y="205" font-size="12" fill="white" text-anchor="middle">大批量写入/更新</text>
<rect x="450" y="160" width="200" height="50" fill="#FFA940" stroke="#D46B08" stroke-width="2" rx="5"/>
<text x="550" y="190" font-size="14" fill="white" text-anchor="middle">相同 SQL 频繁执行？</text>
<path d="M 500 210 L 450 270" stroke="#52C41A" stroke-width="2" marker-end="url(#arrowgreen)"/>
<text x="465" y="245" font-size="13" fill="#52C41A" font-weight="bold">是</text>
<path d="M 600 210 L 650 270" stroke="#F5222D" stroke-width="2" marker-end="url(#arrowred)"/>
<text x="635" y="245" font-size="13" fill="#F5222D" font-weight="bold">否</text>
<rect x="350" y="270" width="200" height="60" fill="#FFA940" stroke="#D46B08" stroke-width="2" rx="5"/>
<text x="450" y="295" font-size="14" fill="white" text-anchor="middle" font-weight="bold">ReuseExecutor</text>
<text x="450" y="315" font-size="12" fill="white" text-anchor="middle">减少编译开销</text>
<rect x="570" y="270" width="160" height="60" fill="#597EF7" stroke="#1D39C4" stroke-width="2" rx="5"/>
<text x="650" y="295" font-size="14" fill="white" text-anchor="middle" font-weight="bold">SimpleExecutor</text>
<text x="650" y="315" font-size="12" fill="white" text-anchor="middle">默认选择</text>
<rect x="50" y="360" width="650" height="30" fill="#E6F7FF" stroke="#1890FF" stroke-width="1" rx="3"/>
<text x="375" y="380" font-size="12" fill="#096DD9" text-anchor="middle">💡 大多数场景使用 SimpleExecutor 即可，批量操作必选 BatchExecutor</text>
<defs>
<marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#52C41A"/>
</marker>
<marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#F5222D"/>
</marker>
</defs>
</svg>

**5. CachingExecutor 装饰器**

所有 Executor 都可以被 **CachingExecutor** 装饰，用于实现二级缓存：

```
CachingExecutor (二级缓存)
    ↓ 装饰
SimpleExecutor / ReuseExecutor / BatchExecutor
```

- 开启二级缓存后，自动使用 CachingExecutor 包装原始 Executor
- 先查二级缓存，未命中再委托给内部 Executor

**关键要点**

1. **核心作用**：Executor 是 MyBatis 的"发动机"，负责 SQL 执行的全流程
2. **三种类型**：
   - **Simple**：默认，简单直接
   - **Reuse**：复用 Statement，适合重复 SQL
   - **Batch**：批处理，适合大量写操作
3. **性能差异**：Batch > Reuse > Simple（批量场景下）
4. **配置灵活**：全局配置或单次 openSession 时指定
5. **装饰模式**：CachingExecutor 负责二级缓存，透明包装其他 Executor

**记忆口诀**

```
执行核心是 Executor (执行器)
Simple 简单是默认 (默认)
Reuse 复用省编译 (复用)
Batch 批量最高效 (批量)
缓存装饰二级开 (装饰)
```

### 73. StatementHandler 的作用是什么？

**核心答案**

StatementHandler 是 MyBatis 的**语句处理器**，负责**与 JDBC 打交道**，完成 SQL 语句的**准备、参数设置、执行和结果处理**。它是 MyBatis 和 JDBC 之间的桥梁，封装了所有 JDBC Statement 的操作。

**详细说明**

**1. StatementHandler 在执行流程中的位置**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="320" y="20" width="160" height="60" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="400" y="55" font-size="16" fill="white" text-anchor="middle" font-weight="bold">Executor</text>
<path d="M 400 80 L 400 130" stroke="#333" stroke-width="3" marker-end="url(#arrow)"/>
<text x="320" y="110" font-size="13" fill="#999" font-style="italic">委托</text>
<rect x="280" y="130" width="240" height="70" fill="#FA541C" stroke="#D4380D" stroke-width="3" rx="5"/>
<text x="400" y="160" font-size="18" fill="white" text-anchor="middle" font-weight="bold">StatementHandler</text>
<text x="400" y="185" font-size="13" fill="white" text-anchor="middle">SQL 语句处理核心</text>
<rect x="50" y="250" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="150" y="275" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">1. 创建 Statement</text>
<text x="150" y="295" font-size="12" fill="#666" text-anchor="middle">prepare()</text>
<text x="150" y="315" font-size="11" fill="#999" text-anchor="middle">获取 JDBC Connection</text>
<rect x="280" y="250" width="240" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="400" y="275" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">2. 设置参数</text>
<text x="400" y="295" font-size="12" fill="#666" text-anchor="middle">parameterize()</text>
<text x="400" y="315" font-size="11" fill="#999" text-anchor="middle">委托 ParameterHandler</text>
<rect x="550" y="250" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="650" y="275" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">3. 执行 SQL</text>
<text x="650" y="295" font-size="12" fill="#666" text-anchor="middle">query() / update()</text>
<text x="650" y="315" font-size="11" fill="#999" text-anchor="middle">调用 Statement.execute()</text>
<rect x="165" y="370" width="470" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="400" y="395" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">4. 处理结果集</text>
<text x="400" y="415" font-size="12" fill="#666" text-anchor="middle">resultSetHandler.handleResultSets()</text>
<text x="400" y="435" font-size="11" fill="#999" text-anchor="middle">委托 ResultSetHandler 映射结果</text>
<path d="M 400 200 L 150 250" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 400 200 L 400 250" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 400 200 L 650 250" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 300 330 L 400 370" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 600 330 L 400 370" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<text x="250" y="360" font-size="11" fill="#999">查询</text>
<text x="550" y="360" font-size="11" fill="#999">更新</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**2. StatementHandler 的三种实现类型**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="280" y="20" width="240" height="60" fill="#722ED1" stroke="#531DAB" stroke-width="2" rx="5"/>
<text x="400" y="55" font-size="18" fill="white" text-anchor="middle" font-weight="bold">StatementHandler 类型</text>
<rect x="50" y="130" width="200" height="160" fill="#F0F5FF" stroke="#597EF7" stroke-width="2" rx="5"/>
<text x="150" y="160" font-size="15" fill="#1D39C4" text-anchor="middle" font-weight="bold">SimpleStatementHandler</text>
<line x1="60" y1="170" x2="240" y2="170" stroke="#D9D9D9" stroke-width="1"/>
<text x="70" y="195" font-size="12" fill="#333" text-anchor="start">对应 JDBC:</text>
<text x="70" y="215" font-size="12" fill="#666" text-anchor="start" font-weight="bold">Statement</text>
<line x1="60" y1="225" x2="240" y2="225" stroke="#D9D9D9" stroke-width="1"/>
<text x="70" y="245" font-size="12" fill="#333" text-anchor="start">• 无预编译</text>
<text x="70" y="265" font-size="12" fill="#333" text-anchor="start">• SQL 直接拼接</text>
<text x="70" y="280" font-size="11" fill="#F5222D" text-anchor="start">⚠️ SQL 注入风险</text>
<rect x="300" y="130" width="200" height="160" fill="#FFF7E6" stroke="#FFA940" stroke-width="2" rx="5"/>
<text x="400" y="160" font-size="15" fill="#D46B08" text-anchor="middle" font-weight="bold">PreparedStatementHandler</text>
<line x1="310" y1="170" x2="490" y2="170" stroke="#D9D9D9" stroke-width="1"/>
<text x="320" y="195" font-size="12" fill="#333" text-anchor="start">对应 JDBC:</text>
<text x="320" y="215" font-size="12" fill="#666" text-anchor="start" font-weight="bold">PreparedStatement</text>
<line x1="310" y1="225" x2="490" y2="225" stroke="#D9D9D9" stroke-width="1"/>
<text x="320" y="245" font-size="12" fill="#333" text-anchor="start">• 预编译 SQL</text>
<text x="320" y="265" font-size="12" fill="#333" text-anchor="start">• 参数占位符 ?</text>
<text x="320" y="280" font-size="11" fill="#52C41A" text-anchor="start">✓ 默认使用</text>
<rect x="550" y="130" width="200" height="160" fill="#F6FFED" stroke="#95DE64" stroke-width="2" rx="5"/>
<text x="650" y="160" font-size="15" fill="#389E0D" text-anchor="middle" font-weight="bold">CallableStatementHandler</text>
<line x1="560" y1="170" x2="740" y2="170" stroke="#D9D9D9" stroke-width="1"/>
<text x="570" y="195" font-size="12" fill="#333" text-anchor="start">对应 JDBC:</text>
<text x="570" y="215" font-size="12" fill="#666" text-anchor="start" font-weight="bold">CallableStatement</text>
<line x1="560" y1="225" x2="740" y2="225" stroke="#D9D9D9" stroke-width="1"/>
<text x="570" y="245" font-size="12" fill="#333" text-anchor="start">• 调用存储过程</text>
<text x="570" y="265" font-size="12" fill="#333" text-anchor="start">• 支持 OUT 参数</text>
<text x="570" y="280" font-size="11" fill="#1890FF" text-anchor="start">ℹ️ 特殊场景</text>
<path d="M 400 80 L 150 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<path d="M 400 80 L 400 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<path d="M 400 80 L 650 130" stroke="#722ED1" stroke-width="2" marker-end="url(#arrowpurple)"/>
<rect x="100" y="330" width="600" height="190" fill="#F0F0F0" stroke="#999" stroke-width="2" rx="5"/>
<text x="400" y="360" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">StatementHandler 核心方法</text>
<rect x="130" y="380" width="260" height="120" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="140" y="400" font-size="12" fill="#52C41A" font-family="monospace">// 1. 准备 Statement</text>
<text x="140" y="420" font-size="12" fill="#333" font-family="monospace">Statement prepare(Connection conn);</text>
<text x="140" y="445" font-size="12" fill="#52C41A" font-family="monospace">// 2. 设置参数</text>
<text x="140" y="465" font-size="12" fill="#333" font-family="monospace">void parameterize(Statement stmt);</text>
<text x="140" y="488" font-size="12" fill="#52C41A" font-family="monospace">// 3. 执行查询/更新</text>
<rect x="410" y="380" width="260" height="120" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="420" y="400" font-size="12" fill="#333" font-family="monospace">&lt;E&gt; List&lt;E&gt; query(</text>
<text x="430" y="420" font-size="12" fill="#333" font-family="monospace">Statement stmt,</text>
<text x="430" y="440" font-size="12" fill="#333" font-family="monospace">ResultHandler handler);</text>
<text x="420" y="465" font-size="12" fill="#333" font-family="monospace">int update(Statement stmt);</text>
<defs>
<marker id="arrowpurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#722ED1"/>
</marker>
</defs>
</svg>

**3. StatementHandler 与其他组件的协作**

<svg viewBox="0 0 750 400" xmlns="http://www.w3.org/2000/svg">
<rect x="275" y="20" width="200" height="60" fill="#FA541C" stroke="#D4380D" stroke-width="2" rx="5"/>
<text x="375" y="55" font-size="16" fill="white" text-anchor="middle" font-weight="bold">StatementHandler</text>
<rect x="50" y="150" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="150" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">ParameterHandler</text>
<text x="150" y="205" font-size="12" fill="#666" text-anchor="middle">设置 SQL 参数</text>
<rect x="275" y="150" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="375" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">ResultSetHandler</text>
<text x="375" y="205" font-size="12" fill="#666" text-anchor="middle">处理结果集映射</text>
<rect x="500" y="150" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="600" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">JDBC Statement</text>
<text x="600" y="205" font-size="12" fill="#666" text-anchor="middle">执行 SQL</text>
<path d="M 330 80 L 150 150" stroke="#4A90E2" stroke-width="2" stroke-dasharray="5,5"/>
<text x="230" y="120" font-size="12" fill="#999">调用</text>
<path d="M 420 80 L 375 150" stroke="#4A90E2" stroke-width="2" stroke-dasharray="5,5"/>
<text x="400" y="120" font-size="12" fill="#999">调用</text>
<path d="M 420 80 L 600 150" stroke="#4A90E2" stroke-width="2" stroke-dasharray="5,5"/>
<text x="520" y="120" font-size="12" fill="#999">使用</text>
<rect x="100" y="270" width="550" height="110" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="375" y="300" font-size="14" fill="#E67E22" text-anchor="middle" font-weight="bold">执行流程示例（PreparedStatement）</text>
<text x="120" y="325" font-size="12" fill="#666" text-anchor="start">1. prepare(): 从连接池获取 Connection，创建 PreparedStatement</text>
<text x="120" y="345" font-size="12" fill="#666" text-anchor="start">2. parameterize(): 调用 ParameterHandler 设置参数（ps.setString(1, "张三")）</text>
<text x="120" y="365" font-size="12" fill="#666" text-anchor="start">3. query(): 执行 ps.executeQuery()，获取 ResultSet，委托 ResultSetHandler 处理</text>
</svg>

**4. StatementHandler 的职责清单**

| 职责 | 具体操作 | 说明 |
|-----|---------|------|
| **创建 Statement** | 从 Connection 获取 Statement 对象 | 根据类型创建不同的 Statement |
| **SQL 预编译** | PreparedStatement 编译 SQL | 提高性能，防止 SQL 注入 |
| **参数设置** | 委托 ParameterHandler 设置参数 | 将 Java 对象转为 JDBC 参数 |
| **执行 SQL** | 调用 Statement.execute*() 方法 | query/update/batch 等 |
| **结果映射** | 委托 ResultSetHandler 处理结果集 | 将 ResultSet 转为 Java 对象 |
| **批处理** | addBatch() 和 executeBatch() | 批量执行提高性能 |

**5. RoutingStatementHandler 路由器**

实际使用中，MyBatis 创建的是 **RoutingStatementHandler**，它是一个路由器：

```
RoutingStatementHandler (路由)
    ↓ 根据 statementType 选择
    ├─ SimpleStatementHandler
    ├─ PreparedStatementHandler (默认)
    └─ CallableStatementHandler
```

- 在构造时根据 MappedStatement 的 `statementType` 属性选择实际处理器
- 所有方法调用都委托给内部的实际 StatementHandler

**关键要点**

1. **桥梁作用**：StatementHandler 是 MyBatis 和 JDBC 之间的桥梁
2. **核心流程**：prepare → parameterize → execute → handle results
3. **三种类型**：
   - **Simple**：对应 Statement，无预编译
   - **Prepared**：对应 PreparedStatement，预编译（默认）
   - **Callable**：对应 CallableStatement，存储过程
4. **协作模式**：与 ParameterHandler、ResultSetHandler 紧密配合
5. **路由设计**：RoutingStatementHandler 负责选择具体实现

**记忆口诀**

```
Statement 处理最前线 (前线)
准备参数再执行 (流程)
Simple 直接 Prepared 编译 (类型)
Callable 存储过程用 (特殊)
JDBC 桥梁全靠它 (桥梁)
```

### 74. ParameterHandler 的作用是什么？

**核心答案**

ParameterHandler 是 MyBatis 的**参数处理器**，负责将**用户传入的 Java 参数**转换为**JDBC Statement 可用的参数**。它通过 `setParameters()` 方法将参数按顺序设置到 PreparedStatement 的占位符（`?`）中。

**详细说明**

**1. ParameterHandler 在参数设置流程中的位置**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="100" y="30" width="150" height="60" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="175" y="65" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">用户传入参数</text>
<rect x="100" y="110" width="150" height="40" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="175" y="135" font-size="12" fill="#666" text-anchor="middle">userId = 123</text>
<path d="M 250 60 L 320 60" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="320" y="30" width="180" height="60" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="410" y="65" font-size="14" fill="white" text-anchor="middle" font-weight="bold">StatementHandler</text>
<path d="M 500 60 L 570 60" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<text x="535" y="50" font-size="12" fill="#999">委托</text>
<rect x="570" y="20" width="180" height="80" fill="#FA541C" stroke="#D4380D" stroke-width="3" rx="5"/>
<text x="660" y="55" font-size="18" fill="white" text-anchor="middle" font-weight="bold">ParameterHandler</text>
<text x="660" y="80" font-size="12" fill="white" text-anchor="middle">参数转换核心</text>
<path d="M 660 100 L 660 170" stroke="#52C41A" stroke-width="3" marker-end="url(#arrowgreen)"/>
<text x="690" y="140" font-size="12" fill="#52C41A" font-weight="bold">setParameters()</text>
<rect x="530" y="170" width="260" height="100" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="660" y="195" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">JDBC PreparedStatement</text>
<rect x="550" y="210" width="220" height="50" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="560" y="230" font-size="11" fill="#333" font-family="monospace">ps.setInt(1, 123);</text>
<text x="560" y="248" font-size="11" fill="#333" font-family="monospace">ps.setString(2, "张三");</text>
<rect x="50" y="310" width="700" height="120" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="400" y="340" font-size="14" fill="#E67E22" text-anchor="middle" font-weight="bold">核心职责</text>
<text x="70" y="365" font-size="13" fill="#666" text-anchor="start">1. 获取参数映射信息（ParameterMapping）</text>
<text x="70" y="390" font-size="13" fill="#666" text-anchor="start">2. 根据参数类型调用对应的 TypeHandler</text>
<text x="70" y="415" font-size="13" fill="#666" text-anchor="start">3. 按顺序将参数设置到 PreparedStatement 的 ? 占位符</text>
<rect x="100" y="180" width="380" height="100" fill="#F0F5FF" stroke="#597EF7" stroke-width="2" rx="5"/>
<text x="290" y="205" font-size="13" fill="#1D39C4" text-anchor="middle" font-weight="bold">参数类型转换（TypeHandler）</text>
<text x="120" y="230" font-size="11" fill="#666" text-anchor="start">Integer → setInt()</text>
<text x="120" y="250" font-size="11" fill="#666" text-anchor="start">String → setString()</text>
<text x="120" y="270" font-size="11" fill="#666" text-anchor="start">Date → setTimestamp()</text>
<text x="290" y="230" font-size="11" fill="#666" text-anchor="start">Boolean → setBoolean()</text>
<text x="290" y="250" font-size="11" fill="#666" text-anchor="start">BigDecimal → setBigDecimal()</text>
<text x="290" y="270" font-size="11" fill="#666" text-anchor="start">自定义 → custom handler</text>
<path d="M 480 230 L 530 230" stroke="#4A90E2" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowblue)"/>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
<marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#52C41A"/>
</marker>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**2. ParameterHandler 的工作流程**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" font-size="16" fill="#333" text-anchor="middle" font-weight="bold">参数设置流程（4 步骤）</text>
<rect x="50" y="60" width="180" height="100" fill="#E6F7FF" stroke="#1890FF" stroke-width="2" rx="5"/>
<text x="140" y="90" font-size="14" fill="#096DD9" text-anchor="middle" font-weight="bold">1. 获取参数对象</text>
<text x="70" y="115" font-size="12" fill="#666" text-anchor="start">• 从 BoundSql 中</text>
<text x="75" y="135" font-size="12" fill="#666" text-anchor="start">获取用户传入的</text>
<text x="75" y="150" font-size="12" fill="#666" text-anchor="start">参数对象</text>
<rect x="260" y="60" width="180" height="100" fill="#FFF7E6" stroke="#FFA940" stroke-width="2" rx="5"/>
<text x="350" y="90" font-size="14" fill="#D46B08" text-anchor="middle" font-weight="bold">2. 获取参数映射</text>
<text x="280" y="115" font-size="12" fill="#666" text-anchor="start">• 解析 SQL 中的</text>
<text x="285" y="135" font-size="12" fill="#666" text-anchor="start">#{} 占位符</text>
<text x="280" y="150" font-size="12" fill="#666" text-anchor="start">• ParameterMapping</text>
<rect x="470" y="60" width="180" height="100" fill="#F6FFED" stroke="#52C41A" stroke-width="2" rx="5"/>
<text x="560" y="90" font-size="14" fill="#389E0D" text-anchor="middle" font-weight="bold">3. 遍历设置参数</text>
<text x="490" y="115" font-size="12" fill="#666" text-anchor="start">• for 循环处理</text>
<text x="495" y="135" font-size="12" fill="#666" text-anchor="start">每个参数</text>
<text x="490" y="150" font-size="12" fill="#666" text-anchor="start">• 调用 TypeHandler</text>
<rect x="260" y="190" width="280" height="100" fill="#FFF1F0" stroke="#FF4D4F" stroke-width="2" rx="5"/>
<text x="400" y="220" font-size="14" fill="#CF1322" text-anchor="middle" font-weight="bold">4. 调用 JDBC 方法设置</text>
<text x="280" y="245" font-size="12" fill="#666" text-anchor="start">• ps.setInt(1, value);</text>
<text x="280" y="265" font-size="12" fill="#666" text-anchor="start">• ps.setString(2, value);</text>
<text x="280" y="280" font-size="12" fill="#666" text-anchor="start">• ...</text>
<path d="M 230 110 L 260 110" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 440 110 L 470 110" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 560 160 L 480 190" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 350 160 L 420 190" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="50" y="320" width="700" height="160" fill="#F0F0F0" stroke="#999" stroke-width="2" rx="5"/>
<text x="400" y="350" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">代码示例：ParameterHandler 内部逻辑（简化）</text>
<text x="70" y="375" font-size="11" fill="#333" font-family="monospace">public void setParameters(PreparedStatement ps) {</text>
<text x="90" y="395" font-size="11" fill="#52C41A" font-family="monospace">List&lt;ParameterMapping&gt; mappings = boundSql.getParameterMappings();</text>
<text x="90" y="415" font-size="11" fill="#333" font-family="monospace">for (int i = 0; i &lt; mappings.size(); i++) {</text>
<text x="110" y="435" font-size="11" fill="#1890FF" font-family="monospace">Object value = getValueFromParameter(parameterObject, mapping);</text>
<text x="110" y="455" font-size="11" fill="#FA541C" font-family="monospace">TypeHandler handler = mapping.getTypeHandler();</text>
<text x="110" y="470" font-size="11" fill="#FA541C" font-family="monospace">handler.setParameter(ps, i + 1, value, jdbcType); // 调用 JDBC</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
</defs>
</svg>

**3. 参数映射示例**

| SQL 中的占位符 | 参数对象 | TypeHandler | JDBC 方法 |
|---------------|---------|-------------|----------|
| `#{id}` | `userId = 123` | IntegerTypeHandler | `ps.setInt(1, 123)` |
| `#{name}` | `userName = "张三"` | StringTypeHandler | `ps.setString(2, "张三")` |
| `#{age}` | `userAge = null` | IntegerTypeHandler | `ps.setNull(3, Types.INTEGER)` |
| `#{createTime}` | `date = new Date()` | DateTypeHandler | `ps.setTimestamp(4, timestamp)` |

**4. ParameterHandler 的核心接口**

<svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg">
<rect x="200" y="30" width="300" height="80" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="350" y="60" font-size="16" fill="white" text-anchor="middle" font-weight="bold">ParameterHandler 接口</text>
<text x="350" y="90" font-size="13" fill="white" text-anchor="middle">(只有一个默认实现)</text>
<rect x="50" y="160" width="280" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="190" y="190" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">主要方法</text>
<text x="70" y="215" font-size="12" fill="#333" font-family="monospace">void setParameters(</text>
<text x="80" y="233" font-size="12" fill="#333" font-family="monospace">PreparedStatement ps);</text>
<rect x="370" y="160" width="280" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="510" y="190" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">其他方法</text>
<text x="390" y="215" font-size="12" fill="#333" font-family="monospace">Object getParameterObject();</text>
<text x="390" y="233" font-size="11" fill="#999">// 获取用户参数对象</text>
<path d="M 350 110 L 190 160" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 350 110 L 510 160" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<rect x="100" y="270" width="500" height="60" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="350" y="295" font-size="13" fill="#E67E22" text-anchor="middle" font-weight="bold">默认实现：DefaultParameterHandler</text>
<text x="350" y="315" font-size="12" fill="#666" text-anchor="middle">MyBatis 内置唯一实现，处理所有参数设置逻辑</text>
<defs>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**5. 与 TypeHandler 的关系**

<svg viewBox="0 0 750 350" xmlns="http://www.w3.org/2000/svg">
<rect x="250" y="30" width="250" height="60" fill="#FA541C" stroke="#D4380D" stroke-width="2" rx="5"/>
<text x="375" y="65" font-size="16" fill="white" text-anchor="middle" font-weight="bold">ParameterHandler</text>
<text x="375" y="125" font-size="13" fill="#999" font-style="italic">委托给</text>
<rect x="100" y="150" width="550" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="375" y="180" font-size="15" fill="#2E5C8A" text-anchor="middle" font-weight="bold">TypeHandler（类型处理器）</text>
<text x="120" y="210" font-size="12" fill="#666" text-anchor="start">IntegerTypeHandler | StringTypeHandler | DateTypeHandler | BooleanTypeHandler | ...</text>
<path d="M 375 90 L 375 150" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="50" y="270" width="650" height="60" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="375" y="295" font-size="13" fill="#E67E22" text-anchor="middle" font-weight="bold">⚠️ 关键理解</text>
<text x="375" y="315" font-size="12" fill="#666" text-anchor="middle">ParameterHandler 负责"调度"，TypeHandler 负责"执行"具体的类型转换</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
</defs>
</svg>

**关键要点**

1. **核心作用**：将 Java 参数转换为 JDBC PreparedStatement 可用的参数
2. **工作流程**：
   - 获取参数对象 → 解析参数映射 → 遍历设置 → 调用 JDBC 方法
3. **与 TypeHandler 配合**：
   - ParameterHandler：调度者，决定"哪个参数"、"哪个位置"
   - TypeHandler：执行者，决定"如何转换"
4. **处理特殊情况**：
   - null 值处理：`ps.setNull(index, jdbcType)`
   - 自定义类型：通过自定义 TypeHandler 扩展
5. **唯一实现**：DefaultParameterHandler 是 MyBatis 内置唯一实现

**记忆口诀**

```
参数转换找 Handler (作用)
Java 对象变 JDBC (转换)
TypeHandler 来帮忙 (协作)
顺序设置占位符 (流程)
PreparedStatement 调用它 (目标)
```

### 75. ResultSetHandler 的作用是什么？

**核心答案**

ResultSetHandler 是 MyBatis 的**结果集处理器**，负责将 **JDBC ResultSet（查询结果）**映射成 **Java 对象**。它是 MyBatis ORM 功能的核心，实现了从关系型数据到对象模型的转换。

**详细说明**

**1. ResultSetHandler 在查询流程中的位置**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="100" y="30" width="180" height="60" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="190" y="65" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">StatementHandler</text>
<path d="M 280 60 L 350 60" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<text x="315" y="50" font-size="12" fill="#999">执行</text>
<rect x="350" y="30" width="180" height="60" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="440" y="65" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">JDBC Statement</text>
<path d="M 440 90 L 440 150" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<text x="470" y="125" font-size="12" fill="#999">返回</text>
<rect x="340" y="150" width="200" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="440" y="180" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">JDBC ResultSet</text>
<rect x="355" y="200" width="170" height="20" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="365" y="214" font-size="10" fill="#666" font-family="monospace">id | name | age</text>
<path d="M 440 230 L 440 290" stroke="#52C41A" stroke-width="3" marker-end="url(#arrowgreen)"/>
<text x="470" y="265" font-size="13" fill="#52C41A" font-weight="bold">映射转换</text>
<rect x="300" y="290" width="280" height="80" fill="#FA541C" stroke="#D4380D" stroke-width="3" rx="5"/>
<text x="440" y="320" font-size="18" fill="white" text-anchor="middle" font-weight="bold">ResultSetHandler</text>
<text x="440" y="345" font-size="13" fill="white" text-anchor="middle">handleResultSets()</text>
<path d="M 440 370 L 440 430" stroke="#52C41A" stroke-width="3" marker-end="url(#arrowgreen)"/>
<rect x="320" y="430" width="240" height="60" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="440" y="455" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">Java 对象（List&lt;User&gt;）</text>
<text x="440" y="475" font-size="11" fill="#666" text-anchor="middle">User(id=1, name="张三", age=25)</text>
<rect x="50" y="160" width="250" height="120" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="175" y="190" font-size="13" fill="#E67E22" text-anchor="middle" font-weight="bold">核心职责</text>
<text x="70" y="215" font-size="12" fill="#666" text-anchor="start">1. 遍历 ResultSet 行</text>
<text x="70" y="235" font-size="12" fill="#666" text-anchor="start">2. 读取列值</text>
<text x="70" y="255" font-size="12" fill="#666" text-anchor="start">3. 类型转换（TypeHandler）</text>
<text x="70" y="270" font-size="12" fill="#666" text-anchor="start">4. 对象映射（反射/构造器）</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
<marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#52C41A"/>
</marker>
</defs>
</svg>

**2. ResultSetHandler 的映射流程**

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" font-size="16" fill="#333" text-anchor="middle" font-weight="bold">结果集映射流程（5 步骤）</text>
<rect x="50" y="60" width="160" height="90" fill="#E6F7FF" stroke="#1890FF" stroke-width="2" rx="5"/>
<text x="130" y="90" font-size="14" fill="#096DD9" text-anchor="middle" font-weight="bold">1. 遍历行</text>
<text x="70" y="115" font-size="11" fill="#666" text-anchor="start">while (rs.next()) {</text>
<text x="75" y="130" font-size="11" fill="#666" text-anchor="start">// 处理每一行</text>
<text x="70" y="145" font-size="11" fill="#666" text-anchor="start">}</text>
<rect x="240" y="60" width="160" height="90" fill="#FFF7E6" stroke="#FFA940" stroke-width="2" rx="5"/>
<text x="320" y="90" font-size="14" fill="#D46B08" text-anchor="middle" font-weight="bold">2. 读取列值</text>
<text x="260" y="115" font-size="11" fill="#666" text-anchor="start">rs.getInt("id")</text>
<text x="260" y="130" font-size="11" fill="#666" text-anchor="start">rs.getString("name")</text>
<text x="260" y="145" font-size="11" fill="#666" text-anchor="start">rs.getInt("age")</text>
<rect x="430" y="60" width="160" height="90" fill="#F6FFED" stroke="#52C41A" stroke-width="2" rx="5"/>
<text x="510" y="90" font-size="14" fill="#389E0D" text-anchor="middle" font-weight="bold">3. 类型转换</text>
<text x="450" y="115" font-size="11" fill="#666" text-anchor="start">TypeHandler</text>
<text x="450" y="130" font-size="11" fill="#666" text-anchor="start">getResult(rs,</text>
<text x="455" y="145" font-size="11" fill="#666" text-anchor="start">"columnName")</text>
<rect x="620" y="60" width="180" height="90" fill="#FFF1F0" stroke="#FF4D4F" stroke-width="2" rx="5"/>
<text x="710" y="90" font-size="14" fill="#CF1322" text-anchor="middle" font-weight="bold">4. 创建对象</text>
<text x="640" y="115" font-size="11" fill="#666" text-anchor="start">反射创建实例</text>
<text x="640" y="130" font-size="11" fill="#666" text-anchor="start">user = new User();</text>
<text x="640" y="145" font-size="11" fill="#666" text-anchor="start">或构造器初始化</text>
<rect x="290" y="180" width="270" height="90" fill="#F0F5FF" stroke="#597EF7" stroke-width="2" rx="5"/>
<text x="425" y="210" font-size="14" fill="#1D39C4" text-anchor="middle" font-weight="bold">5. 属性赋值</text>
<text x="310" y="235" font-size="11" fill="#666" text-anchor="start">user.setId(id);</text>
<text x="310" y="250" font-size="11" fill="#666" text-anchor="start">user.setName(name);</text>
<text x="310" y="265" font-size="11" fill="#666" text-anchor="start">user.setAge(age);</text>
<path d="M 210 105 L 240 105" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 400 105 L 430 105" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 590 105 L 620 105" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 710 150 L 500 180" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 320 150 L 380 180" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="50" y="310" width="750" height="220" fill="#F0F0F0" stroke="#999" stroke-width="2" rx="5"/>
<text x="425" y="340" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">映射策略（根据 resultType 或 resultMap）</text>
<rect x="80" y="360" width="320" height="150" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="240" y="385" font-size="13" fill="#1890FF" text-anchor="middle" font-weight="bold">resultType（简单映射）</text>
<text x="100" y="410" font-size="11" fill="#666" text-anchor="start">• 自动映射：列名 = 属性名</text>
<text x="100" y="430" font-size="11" fill="#666" text-anchor="start">• 驼峰转换：user_name → userName</text>
<text x="100" y="450" font-size="11" fill="#666" text-anchor="start">• 适合简单 POJO</text>
<text x="100" y="470" font-size="11" fill="#333" font-family="monospace">&lt;select resultType="User"&gt;</text>
<text x="105" y="490" font-size="11" fill="#333" font-family="monospace">SELECT * FROM user</text>
<rect x="440" y="360" width="340" height="150" fill="#FFF" stroke="#D9D9D9" stroke-width="1" rx="3"/>
<text x="610" y="385" font-size="13" fill="#FA541C" text-anchor="middle" font-weight="bold">resultMap（复杂映射）</text>
<text x="460" y="410" font-size="11" fill="#666" text-anchor="start">• 自定义映射规则</text>
<text x="460" y="430" font-size="11" fill="#666" text-anchor="start">• 处理嵌套对象（association/collection）</text>
<text x="460" y="450" font-size="11" fill="#666" text-anchor="start">• 适合复杂关联查询</text>
<text x="460" y="470" font-size="11" fill="#333" font-family="monospace">&lt;resultMap id="userMap"&gt;</text>
<text x="465" y="490" font-size="11" fill="#333" font-family="monospace">&lt;id column="id" property="userId"/&gt;</text>
<text x="465" y="505" font-size="11" fill="#333" font-family="monospace">&lt;result column="name".../&gt;</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
</defs>
</svg>

**3. ResultSetHandler 的核心接口**

<svg viewBox="0 0 750 350" xmlns="http://www.w3.org/2000/svg">
<rect x="200" y="30" width="350" height="80" fill="#1890FF" stroke="#096DD9" stroke-width="2" rx="5"/>
<text x="375" y="60" font-size="16" fill="white" text-anchor="middle" font-weight="bold">ResultSetHandler 接口</text>
<text x="375" y="90" font-size="13" fill="white" text-anchor="middle">(唯一实现：DefaultResultSetHandler)</text>
<rect x="100" y="160" width="250" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="225" y="190" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">主要方法</text>
<text x="120" y="215" font-size="11" fill="#333" font-family="monospace">&lt;E&gt; List&lt;E&gt; handleResultSets(</text>
<text x="125" y="235" font-size="11" fill="#333" font-family="monospace">Statement stmt);</text>
<rect x="390" y="160" width="280" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="530" y="190" font-size="14" fill="#2E5C8A" text-anchor="middle" font-weight="bold">其他方法</text>
<text x="410" y="215" font-size="11" fill="#333" font-family="monospace">void handleOutputParameters(</text>
<text x="415" y="235" font-size="11" fill="#333" font-family="monospace">CallableStatement cs);</text>
<text x="410" y="250" font-size="10" fill="#999">// 处理存储过程 OUT 参数</text>
<path d="M 375 110 L 225 160" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<path d="M 375 110 L 530 160" stroke="#4A90E2" stroke-width="2" marker-end="url(#arrowblue)"/>
<rect x="100" y="270" width="550" height="60" fill="#FFF9E6" stroke="#FFB84D" stroke-width="2" rx="5"/>
<text x="375" y="295" font-size="13" fill="#E67E22" text-anchor="middle" font-weight="bold">核心实现：DefaultResultSetHandler</text>
<text x="375" y="315" font-size="12" fill="#666" text-anchor="middle">处理简单映射、嵌套查询、嵌套结果映射、延迟加载等所有场景</text>
<defs>
<marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#4A90E2"/>
</marker>
</defs>
</svg>

**4. ResultSetHandler 处理的场景**

| 场景 | 说明 | 示例 |
|-----|------|------|
| **简单类型映射** | 基本类型、String、Date 等 | `Integer count = selectOne()` |
| **POJO 映射** | JavaBean 对象 | `User user = selectOne()` |
| **Map 映射** | 键值对 | `Map<String, Object> map` |
| **集合映射** | List、Set 等 | `List<User> users` |
| **嵌套对象** | association（一对一） | User → Department |
| **嵌套集合** | collection（一对多） | Department → List<User> |
| **多结果集** | 存储过程返回多个 ResultSet | 同时处理多个查询结果 |
| **延迟加载** | 按需加载关联对象 | 访问时才查询关联数据 |

**5. 与 TypeHandler 的关系**

<svg viewBox="0 0 750 300" xmlns="http://www.w3.org/2000/svg">
<rect x="250" y="30" width="250" height="60" fill="#FA541C" stroke="#D4380D" stroke-width="2" rx="5"/>
<text x="375" y="65" font-size="16" fill="white" text-anchor="middle" font-weight="bold">ResultSetHandler</text>
<text x="375" y="125" font-size="13" fill="#999" font-style="italic">委托给</text>
<rect x="100" y="150" width="550" height="80" fill="#E8F4F8" stroke="#4A90E2" stroke-width="2" rx="5"/>
<text x="375" y="180" font-size="15" fill="#2E5C8A" text-anchor="middle" font-weight="bold">TypeHandler（类型处理器）</text>
<text x="120" y="210" font-size="12" fill="#666" text-anchor="start">getResult(ResultSet rs, String columnName) → 读取列值并转换为 Java 类型</text>
<path d="M 375 90 L 375 150" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="50" y="260" width="650" height="30" fill="#E6F7FF" stroke="#1890FF" stroke-width="1" rx="3"/>
<text x="375" y="280" font-size="12" fill="#096DD9" text-anchor="middle">💡 ResultSetHandler 读取列 → TypeHandler 转换类型 → 对象属性赋值</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#333"/>
</marker>
</defs>
</svg>

**关键要点**

1. **核心作用**：将 JDBC ResultSet 转换为 Java 对象（ORM 的核心）
2. **映射策略**：
   - **resultType**：简单自动映射，适合单表查询
   - **resultMap**：复杂自定义映射，适合关联查询
3. **处理流程**：
   - 遍历行 → 读取列 → 类型转换 → 创建对象 → 属性赋值
4. **与 TypeHandler 配合**：
   - ResultSetHandler：调度者，负责整体映射流程
   - TypeHandler：执行者，负责具体列值的类型转换
5. **支持复杂场景**：嵌套对象、嵌套集合、延迟加载、多结果集

**记忆口诀**

```
结果映射 ResultSetHandler (作用)
ResultSet 变 Java 对象 (转换)
TypeHandler 列转换 (协作)
resultMap 复杂映射 (策略)
ORM 核心全靠它 (地位)
```

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
## Spring 整合

### 81. MyBatis 如何与 Spring 整合？

**核心答案**

MyBatis 通过 **mybatis-spring** 整合包与 Spring 集成，主要通过 `SqlSessionFactoryBean` 创建 SqlSessionFactory、使用 `SqlSessionTemplate` 管理 SqlSession、通过 `MapperScannerConfigurer` 自动扫描 Mapper 接口，并将其注册为 Spring Bean，实现事务由 Spring 统一管理。

**详细说明**

**1. 整合架构图**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:12px monospace;fill:#0066cc}.small{font:11px sans-serif;fill:#666}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">MyBatis-Spring 整合架构</text>
<rect x="50" y="60" width="700" height="420" fill="#f5f5f5" stroke="#9e9e9e" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" class="label">Spring 容器</text>
<rect x="100" y="110" width="250" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="225" y="135" text-anchor="middle" class="label">数据源配置</text>
<text x="120" y="160" class="code">DataSource</text>
<text x="120" y="180" class="small">数据库连接池</text>
<rect x="450" y="110" width="250" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="575" y="135" text-anchor="middle" class="label">MyBatis 配置</text>
<text x="470" y="160" class="code">mybatis-config.xml</text>
<text x="470" y="180" class="small">类型别名、插件等</text>
<rect x="225" y="220" width="350" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="245" text-anchor="middle" class="label">SqlSessionFactoryBean</text>
<text x="245" y="270" class="code">创建 SqlSessionFactory</text>
<text x="245" y="290" class="small">整合核心组件</text>
<rect x="100" y="330" width="250" height="80" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="225" y="355" text-anchor="middle" class="label">SqlSessionTemplate</text>
<text x="120" y="380" class="code">线程安全的 SqlSession</text>
<text x="120" y="400" class="small">自动提交/事务管理</text>
<rect x="450" y="330" width="250" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="575" y="355" text-anchor="middle" class="label">MapperScannerConfigurer</text>
<text x="470" y="380" class="code">扫描并注册 Mapper</text>
<text x="470" y="400" class="small">动态代理 Bean</text>
<rect x="225" y="430" width="350" height="40" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="455" text-anchor="middle" class="label">Mapper 接口 (Spring Bean)</text>
<path d="M 225 190 L 350 220" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 575 190 L 450 220" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 400 300 L 225 330" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 400 300 L 575 330" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 225 410 L 350 430" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 575 410 L 450 430" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs>
</svg>

**2. 整合步骤**

**步骤 1: 添加依赖**

```xml
<!-- MyBatis 核心包 -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.13</version>
</dependency>

<!-- MyBatis-Spring 整合包 -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>3.0.3</version>
</dependency>

<!-- Spring JDBC (事务管理) -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>6.0.11</version>
</dependency>
```

**步骤 2: 配置数据源**

```xml
<!-- applicationContext.xml -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx">

    <!-- 配置数据源 -->
    <bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/test"/>
        <property name="username" value="root"/>
        <property name="password" value="password"/>
    </bean>
</beans>
```

**步骤 3: 配置 SqlSessionFactory**

```xml
<!-- 配置 SqlSessionFactoryBean -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <!-- 注入数据源 -->
    <property name="dataSource" ref="dataSource"/>

    <!-- 指定 MyBatis 配置文件位置 -->
    <property name="configLocation" value="classpath:mybatis-config.xml"/>

    <!-- 指定 Mapper XML 文件位置 -->
    <property name="mapperLocations" value="classpath:mapper/*.xml"/>

    <!-- 配置类型别名包 -->
    <property name="typeAliasesPackage" value="com.example.entity"/>
</bean>
```

**步骤 4: 配置 SqlSessionTemplate**

```xml
<!-- 配置 SqlSessionTemplate (可选) -->
<bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
    <constructor-arg ref="sqlSessionFactory"/>
</bean>
```

**步骤 5: 配置 Mapper 扫描**

```xml
<!-- 方式 1: 使用 MapperScannerConfigurer -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="com.example.mapper"/>
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
</bean>

<!-- 方式 2: 使用 @MapperScan 注解 (Java 配置) -->
```

**步骤 6: 配置事务管理器**

```xml
<!-- 配置事务管理器 -->
<bean id="transactionManager"
      class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>

<!-- 开启注解事务 -->
<tx:annotation-driven transaction-manager="transactionManager"/>
```

**3. Java 配置方式**

```java
@Configuration
@MapperScan("com.example.mapper")  // 扫描 Mapper 接口
@EnableTransactionManagement       // 开启事务管理
public class MyBatisConfig {

    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setUsername("root");
        dataSource.setPassword("password");
        return dataSource;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);

        // 设置 MyBatis 配置
        org.apache.ibatis.session.Configuration configuration =
            new org.apache.ibatis.session.Configuration();
        configuration.setMapUnderscoreToCamelCase(true);
        factoryBean.setConfiguration(configuration);

        // 设置 Mapper XML 位置
        factoryBean.setMapperLocations(
            new PathMatchingResourcePatternResolver()
                .getResources("classpath:mapper/*.xml"));

        return factoryBean.getObject();
    }

    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
```

**4. 使用 Mapper**

```java
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;  // 自动注入 Mapper

    @Transactional  // Spring 事务管理
    public void saveUser(User user) {
        userMapper.insert(user);
    }

    public User getUserById(Long id) {
        return userMapper.selectById(id);
    }
}
```

**5. 整合的核心组件**

| 组件 | 作用 | 说明 |
|------|------|------|
| **SqlSessionFactoryBean** | 创建 SqlSessionFactory | Spring 工厂 Bean，整合核心 |
| **SqlSessionTemplate** | 线程安全的 SqlSession | 替代原生 SqlSession |
| **MapperScannerConfigurer** | 扫描并注册 Mapper | 自动创建 Mapper 代理 Bean |
| **DataSourceTransactionManager** | 事务管理器 | 统一管理事务 |

**6. 整合的优势**

1. **统一事务管理**: 由 Spring 管理事务，支持声明式事务
2. **自动资源管理**: SqlSession 自动关闭，无需手动管理
3. **依赖注入**: Mapper 作为 Spring Bean，直接注入使用
4. **线程安全**: SqlSessionTemplate 保证线程安全
5. **配置集中**: 数据源、事务等统一在 Spring 中配置

**关键要点**

1. **核心依赖**: mybatis + mybatis-spring + spring-jdbc
2. **三大组件**: SqlSessionFactoryBean、SqlSessionTemplate、MapperScannerConfigurer
3. **事务管理**: 使用 Spring 的 DataSourceTransactionManager
4. **Mapper 注入**: 通过 @Autowired 直接注入 Mapper 接口
5. **配置方式**: 支持 XML 配置和 Java 配置两种方式

**记忆口诀**

```
MyBatis 整合 Spring，三大组件要记清
FactoryBean 造工厂，Template 管会话
MapperScanner 扫接口，注册 Bean 到容器
事务交给 Spring 管，@Transactional 加方法
配置集中好维护，依赖注入更优雅
```
### 82. 什么是 SqlSessionTemplate？

**核心答案**

`SqlSessionTemplate` 是 MyBatis-Spring 提供的线程安全的 SqlSession 实现，用于替代原生的 SqlSession。它是 Spring 管理的 Bean，可以直接注入使用，自动处理 SqlSession 的打开、关闭、提交、回滚，并与 Spring 的事务管理器集成。

**详细说明**

**1. SqlSessionTemplate 的作用**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:12px monospace;fill:#0066cc}.small{font:11px sans-serif;fill:#666}.highlight{font:bold 13px sans-serif;fill:#d32f2f}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">SqlSessionTemplate vs 原生 SqlSession</text>
<rect x="50" y="60" width="300" height="300" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="200" y="85" text-anchor="middle" class="label">原生 SqlSession</text>
<text x="70" y="120" class="code">SqlSession session =</text>
<text x="70" y="140" class="code">  factory.openSession();</text>
<text x="70" y="165" class="code">try {</text>
<text x="70" y="185" class="code">  user = mapper.selectById(1);</text>
<text x="70" y="205" class="code">  session.commit();</text>
<text x="70" y="225" class="code">} catch(Exception e) {</text>
<text x="70" y="245" class="code">  session.rollback();</text>
<text x="70" y="265" class="code">} finally {</text>
<text x="70" y="285" class="code">  session.close();</text>
<text x="70" y="305" class="code">}</text>
<text x="200" y="340" text-anchor="middle" class="highlight">✗ 需要手动管理</text>
<rect x="450" y="60" width="300" height="300" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="600" y="85" text-anchor="middle" class="label">SqlSessionTemplate</text>
<text x="470" y="120" class="code">@Autowired</text>
<text x="470" y="140" class="code">SqlSessionTemplate template;</text>
<text x="470" y="180" class="code">// 直接使用，无需关闭</text>
<text x="470" y="200" class="code">User user =</text>
<text x="470" y="220" class="code">  template.selectOne(</text>
<text x="470" y="240" class="code">    "selectById", 1);</text>
<text x="470" y="280" class="code">// 自动管理生命周期</text>
<text x="470" y="300" class="code">// 事务由 Spring 控制</text>
<text x="600" y="340" text-anchor="middle" class="highlight">✓ 自动管理</text>
</svg>

**2. 核心特性**

**线程安全**
- SqlSessionTemplate 是线程安全的
- 可以被多个 DAO 或 Mapper 共享
- 内部使用 ThreadLocal 保证每个线程独立的 SqlSession

**自动资源管理**
- 自动打开和关闭 SqlSession
- 无需手动调用 close() 方法
- 异常时自动回滚

**Spring 事务集成**
- 参与 Spring 管理的事务
- 支持声明式事务 @Transactional
- 自动提交或回滚

**3. 配置方式**

**XML 配置**

```xml
<!-- 配置 SqlSessionTemplate -->
<bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
    <constructor-arg index="0" ref="sqlSessionFactory"/>
</bean>

<!-- 可选：指定执行器类型 -->
<bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
    <constructor-arg index="0" ref="sqlSessionFactory"/>
    <constructor-arg index="1" value="BATCH"/>
    <!-- SIMPLE, REUSE, BATCH -->
</bean>
```

**Java 配置**

```java
@Configuration
public class MyBatisConfig {

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(
            SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

    // 批量执行器版本
    @Bean
    public SqlSessionTemplate batchSqlSessionTemplate(
            SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(
            sqlSessionFactory,
            ExecutorType.BATCH
        );
    }
}
```

**4. 使用方式**

**方式 1: 直接注入使用**

```java
@Repository
public class UserDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public User selectById(Long id) {
        return sqlSessionTemplate.selectOne(
            "com.example.mapper.UserMapper.selectById",
            id
        );
    }

    public List<User> selectAll() {
        return sqlSessionTemplate.selectList(
            "com.example.mapper.UserMapper.selectAll"
        );
    }

    public int insert(User user) {
        return sqlSessionTemplate.insert(
            "com.example.mapper.UserMapper.insert",
            user
        );
    }

    public int update(User user) {
        return sqlSessionTemplate.update(
            "com.example.mapper.UserMapper.update",
            user
        );
    }

    public int delete(Long id) {
        return sqlSessionTemplate.delete(
            "com.example.mapper.UserMapper.delete",
            id
        );
    }
}
```

**方式 2: 继承 SqlSessionDaoSupport（已过时）**

```java
@Repository
public class UserDao extends SqlSessionDaoSupport {

    @Autowired
    public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
        super.setSqlSessionFactory(sqlSessionFactory);
    }

    public User selectById(Long id) {
        // 通过 getSqlSession() 获取 SqlSessionTemplate
        return getSqlSession().selectOne(
            "com.example.mapper.UserMapper.selectById",
            id
        );
    }
}
```

**方式 3: 获取 Mapper（推荐）**

```java
@Service
public class UserService {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public User getUserById(Long id) {
        // 通过 SqlSessionTemplate 获取 Mapper
        UserMapper mapper = sqlSessionTemplate.getMapper(UserMapper.class);
        return mapper.selectById(id);
    }
}
```

**5. 内部实现原理**

```java
public class SqlSessionTemplate implements SqlSession {

    private final SqlSessionFactory sqlSessionFactory;
    private final ExecutorType executorType;
    private final SqlSessionProxy sqlSessionProxy;

    public SqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        this(sqlSessionFactory, sqlSessionFactory.getConfiguration()
            .getDefaultExecutorType());
    }

    public SqlSessionTemplate(
            SqlSessionFactory sqlSessionFactory,
            ExecutorType executorType) {
        this.sqlSessionFactory = sqlSessionFactory;
        this.executorType = executorType;

        // 创建动态代理，拦截所有方法调用
        this.sqlSessionProxy = (SqlSessionProxy) Proxy.newProxyInstance(
            SqlSessionFactory.class.getClassLoader(),
            new Class[] { SqlSession.class },
            new SqlSessionInterceptor()  // 核心拦截器
        );
    }

    // SqlSessionInterceptor 负责管理 SqlSession 生命周期
    private class SqlSessionInterceptor implements InvocationHandler {
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) {
            // 获取与当前 Spring 事务绑定的 SqlSession
            SqlSession sqlSession = getSqlSession(
                SqlSessionTemplate.this.sqlSessionFactory,
                SqlSessionTemplate.this.executorType,
                SqlSessionTemplate.this.exceptionTranslator
            );

            try {
                // 执行实际的数据库操作
                Object result = method.invoke(sqlSession, args);

                // 如果不在 Spring 事务中，自动提交
                if (!isSqlSessionTransactional(sqlSession)) {
                    sqlSession.commit(true);
                }

                return result;
            } catch (Throwable t) {
                // 异常处理和转换
                throw unwrapThrowable(t);
            } finally {
                // 关闭 SqlSession（如果不在事务中）
                closeSqlSession(sqlSession);
            }
        }
    }
}
```

**6. 与 Spring 事务的集成**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:11px monospace;fill:#0066cc}.step{font:12px sans-serif;fill:#1976d2}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">SqlSessionTemplate 事务流程</text>
<rect x="50" y="60" width="180" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="95" text-anchor="middle" class="label">@Transactional</text>
<rect x="50" y="150" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="140" y="185" text-anchor="middle" class="label">Spring 开启事务</text>
<rect x="50" y="240" width="180" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="140" y="275" text-anchor="middle" class="label">获取 SqlSession</text>
<rect x="310" y="60" width="180" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="400" y="95" text-anchor="middle" class="label">绑定到事务</text>
<rect x="310" y="150" width="180" height="60" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="5"/>
<text x="400" y="185" text-anchor="middle" class="label">执行 SQL</text>
<rect x="310" y="240" width="180" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="275" text-anchor="middle" class="label">Spring 提交/回滚</text>
<rect x="570" y="150" width="180" height="60" fill="#e0f2f1" stroke="#00695c" stroke-width="2" rx="5"/>
<text x="660" y="185" text-anchor="middle" class="label">关闭 SqlSession</text>
<path d="M 140 120 L 140 150" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 140 210 L 140 240" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 230 270 L 310 270" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 400 120 L 400 150" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 400 210 L 400 240" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 490 180 L 570 180" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker></defs>
<text x="140" y="140" text-anchor="middle" class="step">1</text>
<text x="140" y="230" text-anchor="middle" class="step">2</text>
<text x="270" y="265" text-anchor="middle" class="step">3</text>
<text x="400" y="50" text-anchor="middle" class="step">4</text>
<text x="400" y="230" text-anchor="middle" class="step">5</text>
<text x="530" y="175" text-anchor="middle" class="step">6</text>
</svg>

**7. 主要方法**

| 方法 | 说明 |
|------|------|
| `selectOne(String, Object)` | 查询单个对象 |
| `selectList(String, Object)` | 查询列表 |
| `selectMap(String, String)` | 查询 Map |
| `insert(String, Object)` | 插入数据 |
| `update(String, Object)` | 更新数据 |
| `delete(String, Object)` | 删除数据 |
| `commit()` | 提交事务（通常由 Spring 管理） |
| `rollback()` | 回滚事务（通常由 Spring 管理） |
| `getMapper(Class<T>)` | 获取 Mapper 接口 |

**关键要点**

1. **线程安全**: 可以被多个线程并发访问，内部使用动态代理
2. **自动管理**: 无需手动关闭 SqlSession，自动处理资源
3. **事务集成**: 与 Spring 事务无缝集成，支持 @Transactional
4. **执行器类型**: 支持 SIMPLE、REUSE、BATCH 三种执行器
5. **替代方案**: 现在更推荐直接使用 @MapperScan + @Autowired Mapper

**记忆口诀**

```
SqlSessionTemplate 线程安全，Spring 整合核心组件
自动管理生命周期，无需手动关闭会话
参与 Spring 事务管理，@Transactional 控制
动态代理拦截调用，获取绑定 SqlSession
提交回滚由 Spring 管，异常处理更优雅
```
### 83. 什么是 MapperScannerConfigurer？

**核心答案**

`MapperScannerConfigurer` 是 MyBatis-Spring 提供的一个 BeanDefinitionRegistryPostProcessor，用于自动扫描指定包下的 Mapper 接口，并将它们注册为 Spring 的 Bean（MapperFactoryBean），使得 Mapper 接口可以通过 @Autowired 注入使用。

**详细说明**

**1. MapperScannerConfigurer 的作用**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:11px monospace;fill:#0066cc}.small{font:10px sans-serif;fill:#666}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">MapperScannerConfigurer 工作流程</text>
<rect x="50" y="60" width="200" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="85" text-anchor="middle" class="label">扫描目标包</text>
<text x="70" y="110" class="code">com.example.mapper</text>
<text x="70" y="130" class="code">├─ UserMapper.java</text>
<text x="70" y="145" class="code">├─ OrderMapper.java</text>
<rect x="300" y="60" width="200" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" class="label">识别 Mapper 接口</text>
<text x="320" y="110" class="code">interface UserMapper {</text>
<text x="320" y="130" class="code">  User selectById(Long id);</text>
<text x="320" y="145" class="code">}</text>
<rect x="550" y="60" width="200" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="650" y="85" text-anchor="middle" class="label">创建动态代理</text>
<text x="570" y="110" class="code">MapperFactoryBean</text>
<text x="570" y="130" class="code">  ↓</text>
<text x="570" y="145" class="code">MapperProxy</text>
<rect x="175" y="200" width="450" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="400" y="225" text-anchor="middle" class="label">注册到 Spring 容器</text>
<text x="195" y="250" class="code">beanName: userMapper</text>
<text x="195" y="270" class="code">beanClass: MapperFactoryBean&lt;UserMapper&gt;</text>
<rect x="175" y="310" width="450" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="335" text-anchor="middle" class="label">依赖注入使用</text>
<text x="195" y="360" class="code">@Autowired</text>
<text x="195" y="380" class="code">private UserMapper userMapper;</text>
<path d="M 150 160 L 300 110" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 500 110 L 550 110" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 650 160 L 500 200" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 400 280 L 400 310" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow)"/>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker></defs>
<text x="220" y="135" text-anchor="middle" class="small">1. 扫描</text>
<text x="525" y="100" text-anchor="middle" class="small">2. 识别</text>
<text x="575" y="180" text-anchor="middle" class="small">3. 创建</text>
<text x="400" y="300" text-anchor="middle" class="small">4. 注册</text>
<rect x="50" y="410" width="700" height="30" fill="#ffebee" stroke="#c62828" stroke-width="1" rx="3"/>
<text x="400" y="430" text-anchor="middle" class="code">核心：将 Mapper 接口自动注册为 Spring Bean</text>
</svg>

**2. 配置方式**

**方式 1: XML 配置**

```xml
<!-- 基本配置 -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <!-- 指定扫描的包 -->
    <property name="basePackage" value="com.example.mapper"/>

    <!-- 指定 SqlSessionFactory（可选） -->
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
</bean>

<!-- 高级配置 -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <!-- 扫描多个包，用逗号或分号分隔 -->
    <property name="basePackage"
              value="com.example.mapper,com.example.dao"/>

    <!-- 指定 SqlSessionTemplate（与 sqlSessionFactory 二选一） -->
    <property name="sqlSessionTemplateBeanName" value="sqlSessionTemplate"/>

    <!-- 指定标注了特定注解的接口才扫描 -->
    <property name="annotationClass" value="org.apache.ibatis.annotations.Mapper"/>

    <!-- 指定实现了特定接口的才扫描 -->
    <property name="markerInterface" value="com.example.BaseMapper"/>

    <!-- 指定 Mapper Bean 的命名策略 -->
    <property name="nameGenerator" ref="beanNameGenerator"/>
</bean>
```

**方式 2: Java 配置（使用 @MapperScan）**

```java
@Configuration
@MapperScan(
    basePackages = "com.example.mapper",        // 扫描的包
    sqlSessionFactoryRef = "sqlSessionFactory", // SqlSessionFactory Bean 名称
    annotationClass = Mapper.class,             // 指定注解
    markerInterface = BaseMapper.class          // 指定父接口
)
public class MyBatisConfig {
    // 配置其他 Bean
}

// 扫描多个包
@Configuration
@MapperScan(basePackages = {"com.example.mapper", "com.example.dao"})
public class MyBatisConfig {
    // ...
}
```

**3. 核心属性**

| 属性 | 类型 | 说明 | 必填 |
|------|------|------|------|
| **basePackage** | String | 要扫描的包路径，多个用逗号分隔 | ✓ |
| **sqlSessionFactoryBeanName** | String | SqlSessionFactory Bean 名称 | ✗ |
| **sqlSessionTemplateBeanName** | String | SqlSessionTemplate Bean 名称 | ✗ |
| **annotationClass** | Class | 只扫描标注了指定注解的接口 | ✗ |
| **markerInterface** | Class | 只扫描继承了指定接口的接口 | ✗ |
| **nameGenerator** | BeanNameGenerator | Bean 命名策略 | ✗ |

**4. 工作原理**

```java
public class MapperScannerConfigurer
    implements BeanDefinitionRegistryPostProcessor, BeanFactoryAware {

    private String basePackage;
    private String sqlSessionFactoryBeanName;

    @Override
    public void postProcessBeanDefinitionRegistry(
            BeanDefinitionRegistry registry) {

        // 创建 ClassPathMapperScanner 扫描器
        ClassPathMapperScanner scanner =
            new ClassPathMapperScanner(registry);

        // 设置过滤器（注解、父接口等）
        if (annotationClass != null) {
            scanner.setAnnotationClass(annotationClass);
        }
        if (markerInterface != null) {
            scanner.setMarkerInterface(markerInterface);
        }

        // 设置 SqlSessionFactory
        scanner.setSqlSessionFactoryBeanName(
            this.sqlSessionFactoryBeanName);

        // 注册过滤器（只扫描接口）
        scanner.registerFilters();

        // 执行扫描并注册 BeanDefinition
        scanner.scan(
            StringUtils.tokenizeToStringArray(
                this.basePackage,
                ConfigurableApplicationContext.CONFIG_LOCATION_DELIMITERS
            )
        );
    }
}

// ClassPathMapperScanner 核心逻辑
public class ClassPathMapperScanner extends ClassPathBeanDefinitionScanner {

    @Override
    protected Set<BeanDefinitionHolder> doScan(String... basePackages) {
        // 扫描指定包下的所有接口
        Set<BeanDefinitionHolder> beanDefinitions = super.doScan(basePackages);

        if (beanDefinitions.isEmpty()) {
            logger.warn("No MyBatis mapper was found in '"
                + Arrays.toString(basePackages) + "' package.");
        } else {
            // 处理扫描到的每个 Mapper 接口
            processBeanDefinitions(beanDefinitions);
        }

        return beanDefinitions;
    }

    private void processBeanDefinitions(Set<BeanDefinitionHolder> holders) {
        for (BeanDefinitionHolder holder : holders) {
            GenericBeanDefinition definition =
                (GenericBeanDefinition) holder.getBeanDefinition();

            // 获取 Mapper 接口的全限定名
            String beanClassName = definition.getBeanClassName();

            // 将 BeanClass 修改为 MapperFactoryBean
            definition.setBeanClass(MapperFactoryBean.class);

            // 将 Mapper 接口作为构造函数参数
            definition.getConstructorArgumentValues()
                .addGenericArgumentValue(beanClassName);

            // 设置 SqlSessionFactory 属性
            definition.getPropertyValues()
                .add("sqlSessionFactory",
                    new RuntimeBeanReference(
                        this.sqlSessionFactoryBeanName));

            // 设置自动装配模式
            definition.setAutowireMode(
                AbstractBeanDefinition.AUTOWIRE_BY_TYPE);
        }
    }
}
```

**5. 过滤规则示例**

**只扫描带 @Mapper 注解的接口**

```java
@Configuration
@MapperScan(
    basePackages = "com.example.mapper",
    annotationClass = Mapper.class
)
public class MyBatisConfig {
    // 只有标注了 @Mapper 的接口才会被扫描
}

// Mapper 接口
@Mapper
public interface UserMapper {
    User selectById(Long id);
}
```

**只扫描继承特定接口的 Mapper**

```java
// 定义基础 Mapper 接口
public interface BaseMapper<T> {
    int insert(T entity);
    int update(T entity);
    int delete(Long id);
}

@Configuration
@MapperScan(
    basePackages = "com.example.mapper",
    markerInterface = BaseMapper.class
)
public class MyBatisConfig {
    // 只有继承 BaseMapper 的接口才会被扫描
}

// 具体 Mapper 接口
public interface UserMapper extends BaseMapper<User> {
    User selectById(Long id);
}
```

**6. 与 @MapperScan 的关系**

`@MapperScan` 是对 `MapperScannerConfigurer` 的封装，底层仍然使用 MapperScannerConfigurer：

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Import(MapperScannerRegistrar.class)  // 导入注册器
public @interface MapperScan {
    String[] basePackages() default {};
    String sqlSessionFactoryRef() default "";
    Class<? extends Annotation> annotationClass() default Annotation.class;
    // ...
}

// MapperScannerRegistrar 内部创建 MapperScannerConfigurer
class MapperScannerRegistrar implements ImportBeanDefinitionRegistrar {
    @Override
    public void registerBeanDefinitions(
            AnnotationMetadata metadata,
            BeanDefinitionRegistry registry) {

        AnnotationAttributes attrs = AnnotationAttributes.fromMap(
            metadata.getAnnotationAttributes(MapperScan.class.getName()));

        // 创建 MapperScannerConfigurer 的 BeanDefinition
        BeanDefinitionBuilder builder =
            BeanDefinitionBuilder.genericBeanDefinition(
                MapperScannerConfigurer.class);

        builder.addPropertyValue("basePackage",
            StringUtils.collectionToCommaDelimitedString(
                attrs.getStringArray("basePackages")));

        // 注册到容器
        registry.registerBeanDefinition(
            beanName, builder.getBeanDefinition());
    }
}
```

**7. MapperFactoryBean 的作用**

MapperScannerConfigurer 扫描后，每个 Mapper 接口都会被包装为 MapperFactoryBean：

```java
public class MapperFactoryBean<T> implements FactoryBean<T> {

    private Class<T> mapperInterface;
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public T getObject() throws Exception {
        // 通过 SqlSession 获取 Mapper 代理对象
        return getSqlSession().getMapper(this.mapperInterface);
    }

    @Override
    public Class<T> getObjectType() {
        return this.mapperInterface;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
```

**关键要点**

1. **自动扫描**: 无需手动配置每个 Mapper Bean，自动扫描注册
2. **包路径配置**: 支持扫描多个包，用逗号或分号分隔
3. **过滤机制**: 支持按注解、父接口过滤需要扫描的接口
4. **Bean 名称**: 默认使用接口名首字母小写作为 Bean 名称
5. **推荐使用 @MapperScan**: Java 配置方式更简洁，与 @Configuration 配合使用

**记忆口诀**

```
MapperScannerConfigurer 扫描器，自动注册 Mapper 接口
指定包路径 basePackage，多包扫描逗号隔
SqlSessionFactory 要注入，可用 Bean 名来引用
annotationClass 按注解过滤，markerInterface 按接口
扫描后创建 FactoryBean，动态代理注入容器
@MapperScan 更简洁，Java 配置推荐用
```
### 84. MyBatis-Spring 的工作原理是什么？

**核心答案**

MyBatis-Spring 的工作原理是通过 **SqlSessionFactoryBean** 创建 SqlSessionFactory，使用 **SqlSessionTemplate** 提供线程安全的 SqlSession，通过 **MapperScannerConfigurer** 扫描 Mapper 接口并创建动态代理对象注册为 Spring Bean，最后利用 Spring 的事务管理器统一管理事务，实现 MyBatis 与 Spring 的无缝整合。

**详细说明**

**1. 整体架构流程**

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:11px monospace;fill:#0066cc}.small{font:10px sans-serif;fill:#666}.step{font:bold 14px sans-serif;fill:#fff}</style></defs>
<text x="425" y="30" text-anchor="middle" class="title">MyBatis-Spring 工作原理</text>
<rect x="50" y="60" width="750" height="520" fill="#f5f5f5" stroke="#757575" stroke-width="2" rx="5"/>
<text x="425" y="85" text-anchor="middle" class="label">Spring 容器启动</text>
<circle cx="150" cy="140" r="40" fill="#1976d2" stroke="#0d47a1" stroke-width="2"/>
<text x="150" y="148" text-anchor="middle" class="step">1</text>
<text x="150" y="195" text-anchor="middle" class="label">SqlSessionFactoryBean</text>
<text x="150" y="210" text-anchor="middle" class="small">创建 SqlSessionFactory</text>
<circle cx="425" cy="140" r="40" fill="#388e3c" stroke="#1b5e20" stroke-width="2"/>
<text x="425" y="148" text-anchor="middle" class="step">2</text>
<text x="425" y="195" text-anchor="middle" class="label">MapperScannerConfigurer</text>
<text x="425" y="210" text-anchor="middle" class="small">扫描 Mapper 接口</text>
<circle cx="700" cy="140" r="40" fill="#f57c00" stroke="#e65100" stroke-width="2"/>
<text x="700" y="148" text-anchor="middle" class="step">3</text>
<text x="700" y="195" text-anchor="middle" class="label">MapperFactoryBean</text>
<text x="700" y="210" text-anchor="middle" class="small">创建 Mapper 代理</text>
<rect x="275" y="250" width="300" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="425" y="275" text-anchor="middle" class="label">Service 层注入 Mapper</text>
<text x="295" y="300" class="code">@Autowired</text>
<text x="295" y="320" class="code">private UserMapper userMapper;</text>
<circle cx="150" cy="390" r="40" fill="#7b1fa2" stroke="#4a148c" stroke-width="2"/>
<text x="150" y="398" text-anchor="middle" class="step">4</text>
<text x="150" y="445" text-anchor="middle" class="label">调用 Mapper 方法</text>
<text x="150" y="460" text-anchor="middle" class="small">userMapper.selectById(1)</text>
<circle cx="425" cy="390" r="40" fill="#c62828" stroke="#b71c1c" stroke-width="2"/>
<text x="425" y="398" text-anchor="middle" class="step">5</text>
<text x="425" y="445" text-anchor="middle" class="label">SqlSessionTemplate</text>
<text x="425" y="460" text-anchor="middle" class="small">获取 SqlSession</text>
<circle cx="700" cy="390" r="40" fill="#00695c" stroke="#004d40" stroke-width="2"/>
<text x="700" y="398" text-anchor="middle" class="step">6</text>
<text x="700" y="445" text-anchor="middle" class="label">执行 SQL</text>
<text x="700" y="460" text-anchor="middle" class="small">查询数据库</text>
<rect x="275" y="500" width="300" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="425" y="525" text-anchor="middle" class="label">Spring 事务管理</text>
<text x="295" y="545" class="code">提交/回滚事务，关闭 SqlSession</text>
<path d="M 190 140 L 385 140" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 465 140 L 660 140" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 575 210 L 425 250" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 275 330 L 190 390" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 190 390 L 385 390" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 465 390 L 660 390" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 575 460 L 425 500" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs>
</svg>

**2. 核心组件及工作流程**

**阶段 1: 容器启动阶段**

**SqlSessionFactoryBean 初始化**

```java
public class SqlSessionFactoryBean implements FactoryBean<SqlSessionFactory>,
        InitializingBean {

    private DataSource dataSource;
    private Resource configLocation;
    private Resource[] mapperLocations;

    @Override
    public void afterPropertiesSet() throws Exception {
        // 创建 SqlSessionFactory
        this.sqlSessionFactory = buildSqlSessionFactory();
    }

    protected SqlSessionFactory buildSqlSessionFactory() throws Exception {
        // 1. 创建 Configuration 对象
        Configuration configuration = new Configuration();

        // 2. 加载 mybatis-config.xml
        if (this.configLocation != null) {
            XMLConfigBuilder xmlConfigBuilder =
                new XMLConfigBuilder(this.configLocation.getInputStream());
            configuration = xmlConfigBuilder.parse();
        }

        // 3. 设置数据源（关键：与 Spring 集成）
        Environment environment = new Environment(
            "development",
            new SpringManagedTransactionFactory(),  // Spring 事务工厂
            this.dataSource
        );
        configuration.setEnvironment(environment);

        // 4. 解析 Mapper XML 文件
        if (this.mapperLocations != null) {
            for (Resource mapperLocation : this.mapperLocations) {
                XMLMapperBuilder xmlMapperBuilder =
                    new XMLMapperBuilder(mapperLocation.getInputStream(),
                        configuration, mapperLocation.toString());
                xmlMapperBuilder.parse();
            }
        }

        // 5. 构建 SqlSessionFactory
        return new SqlSessionFactoryBuilder().build(configuration);
    }

    @Override
    public SqlSessionFactory getObject() {
        return this.sqlSessionFactory;
    }
}
```

**MapperScannerConfigurer 扫描注册**

```java
public class MapperScannerConfigurer
        implements BeanDefinitionRegistryPostProcessor {

    @Override
    public void postProcessBeanDefinitionRegistry(
            BeanDefinitionRegistry registry) {

        // 1. 创建 Mapper 扫描器
        ClassPathMapperScanner scanner =
            new ClassPathMapperScanner(registry);

        // 2. 扫描指定包下的所有接口
        scanner.scan(basePackage);

        // 3. 为每个 Mapper 接口创建 MapperFactoryBean
        // 将 BeanClass 设置为 MapperFactoryBean
        // 将 Mapper 接口类型作为构造参数
    }
}
```

**阶段 2: Mapper 代理创建**

**MapperFactoryBean 创建代理对象**

```java
public class MapperFactoryBean<T> implements FactoryBean<T> {

    private Class<T> mapperInterface;
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public T getObject() throws Exception {
        // 通过 SqlSessionTemplate 获取 Mapper 代理对象
        return getSqlSession().getMapper(this.mapperInterface);
    }

    private SqlSession getSqlSession() {
        // 返回 SqlSessionTemplate（线程安全）
        return this.sqlSessionTemplate;
    }
}

// MyBatis 内部创建动态代理
public class MapperProxy<T> implements InvocationHandler {

    private final SqlSession sqlSession;
    private final Class<T> mapperInterface;

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) {
        // 拦截 Mapper 接口方法调用
        // 转换为 SqlSession 的方法调用
        MapperMethod mapperMethod =
            new MapperMethod(mapperInterface, method, sqlSession);
        return mapperMethod.execute(sqlSession, args);
    }
}
```

**阶段 3: SQL 执行阶段**

**SqlSessionTemplate 管理 SqlSession**

```java
public class SqlSessionTemplate implements SqlSession {

    private final SqlSessionFactory sqlSessionFactory;
    private final ExecutorType executorType;
    private final SqlSession sqlSessionProxy;

    public SqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        // 创建动态代理
        this.sqlSessionProxy = (SqlSession) Proxy.newProxyInstance(
            SqlSessionFactory.class.getClassLoader(),
            new Class[] { SqlSession.class },
            new SqlSessionInterceptor()  // 拦截器
        );
    }

    private class SqlSessionInterceptor implements InvocationHandler {
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) {
            // 1. 获取与 Spring 事务绑定的 SqlSession
            SqlSession sqlSession = getSqlSession(
                SqlSessionTemplate.this.sqlSessionFactory,
                SqlSessionTemplate.this.executorType
            );

            try {
                // 2. 执行实际的 SQL 操作
                Object result = method.invoke(sqlSession, args);

                // 3. 如果不在 Spring 事务中，自动提交
                if (!isSqlSessionTransactional(sqlSession)) {
                    sqlSession.commit(true);
                }

                return result;
            } catch (Throwable t) {
                // 4. 异常处理
                throw unwrapThrowable(t);
            } finally {
                // 5. 关闭 SqlSession（如果不在事务中）
                closeSqlSession(sqlSession);
            }
        }
    }

    // 获取 SqlSession（关键方法）
    public static SqlSession getSqlSession(
            SqlSessionFactory sessionFactory,
            ExecutorType executorType) {

        // 从 Spring 事务管理器获取 SqlSession
        SqlSessionHolder holder = (SqlSessionHolder)
            TransactionSynchronizationManager.getResource(sessionFactory);

        // 如果存在，返回事务中的 SqlSession
        if (holder != null && holder.isSynchronizedWithTransaction()) {
            return holder.getSqlSession();
        }

        // 否则创建新的 SqlSession
        SqlSession session = sessionFactory.openSession(executorType);

        // 如果在 Spring 事务中，注册同步器
        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            holder = new SqlSessionHolder(session, executorType);
            TransactionSynchronizationManager.bindResource(
                sessionFactory, holder);

            // 注册事务同步回调
            TransactionSynchronizationManager.registerSynchronization(
                new SqlSessionSynchronization(holder, sessionFactory));
        }

        return session;
    }
}
```

**阶段 4: 事务管理**

**Spring 事务管理器整合**

```java
public class DataSourceTransactionManager extends AbstractPlatformTransactionManager {

    @Override
    protected void doBegin(Object transaction, TransactionDefinition definition) {
        // 1. 开启数据库连接
        Connection con = dataSource.getConnection();

        // 2. 设置自动提交为 false
        con.setAutoCommit(false);

        // 3. 将连接绑定到当前线程
        TransactionSynchronizationManager.bindResource(
            dataSource, new ConnectionHolder(con));
    }

    @Override
    protected void doCommit(DefaultTransactionStatus status) {
        // 提交事务
        Connection con = getConnection();
        con.commit();
    }

    @Override
    protected void doRollback(DefaultTransactionStatus status) {
        // 回滚事务
        Connection con = getConnection();
        con.rollback();
    }
}

// MyBatis-Spring 的事务工厂
public class SpringManagedTransactionFactory implements TransactionFactory {

    @Override
    public Transaction newTransaction(DataSource dataSource, ...) {
        // 返回由 Spring 管理的事务对象
        return new SpringManagedTransaction(dataSource);
    }
}

public class SpringManagedTransaction implements Transaction {

    @Override
    public Connection getConnection() {
        // 从 Spring 事务管理器获取连接
        ConnectionHolder holder = (ConnectionHolder)
            TransactionSynchronizationManager.getResource(dataSource);
        return holder.getConnection();
    }

    @Override
    public void commit() {
        // 空实现，由 Spring 管理
    }

    @Override
    public void rollback() {
        // 空实现，由 Spring 管理
    }
}
```

**3. 关键技术点**

| 技术点 | 实现方式 | 作用 |
|--------|----------|------|
| **线程安全** | ThreadLocal + 动态代理 | 保证 SqlSession 线程安全 |
| **事务绑定** | TransactionSynchronizationManager | SqlSession 与 Spring 事务绑定 |
| **自动关闭** | 动态代理 + finally 块 | 自动关闭 SqlSession |
| **Mapper 注入** | FactoryBean + 动态代理 | Mapper 接口作为 Spring Bean |
| **事务同步** | TransactionSynchronization | 事务提交/回滚时回调 |

**4. 执行流程时序图**

```
用户代码                    Spring                MyBatis-Spring              MyBatis
   |                          |                         |                         |
   |--@Transactional--------->|                         |                         |
   |                          |--开启事务--------------->|                         |
   |                          |                         |--创建 Connection-------->|
   |                          |                         |<-绑定到 ThreadLocal------|
   |                          |                         |                         |
   |--userMapper.select()---->|                         |                         |
   |                          |--调用代理方法---------->|                         |
   |                          |                         |--getSqlSession()------->|
   |                          |                         |<-从 ThreadLocal 获取-----|
   |                          |                         |--execute SQL----------->|
   |                          |                         |<-返回结果---------------|
   |<-返回结果----------------|<------------------------|                         |
   |                          |                         |                         |
   |--方法结束--------------->|                         |                         |
   |                          |--提交事务-------------->|                         |
   |                          |                         |--commit()-------------->|
   |                          |                         |--close()--------------->|
```

**关键要点**

1. **FactoryBean 模式**: 使用 SqlSessionFactoryBean 和 MapperFactoryBean 创建对象
2. **动态代理**: SqlSessionTemplate 和 Mapper 都使用动态代理
3. **线程绑定**: 通过 TransactionSynchronizationManager 实现线程绑定
4. **事务集成**: 使用 SpringManagedTransactionFactory 整合事务
5. **自动管理**: 自动管理 SqlSession 生命周期，无需手动关闭

**记忆口诀**

```
MyBatis-Spring 三大宝，FactoryBean 全用到
SqlSessionFactory 先创建，数据源事务都配好
MapperScanner 扫接口，动态代理 Bean 注册
SqlSessionTemplate 线程安全，ThreadLocal 来绑定
Spring 事务管理器，统一提交和回滚
动态代理加拦截，自动关闭 SqlSession
三个组件紧配合，无缝整合真优雅
```
### 85. 如何在 Spring Boot 中使用 MyBatis？

**核心答案**

在 Spring Boot 中使用 MyBatis 非常简单，只需添加 **mybatis-spring-boot-starter** 依赖，配置数据源和 MyBatis 属性，使用 **@MapperScan** 或 **@Mapper** 注解扫描 Mapper 接口即可。Spring Boot 自动配置会自动创建 SqlSessionFactory、SqlSessionTemplate 等核心组件。

**详细说明**

**1. 快速开始步骤**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 16px sans-serif;fill:#333}.label{font:14px sans-serif;fill:#333}.code{font:11px monospace;fill:#0066cc}.step{font:bold 18px sans-serif;fill:#fff}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title">Spring Boot 整合 MyBatis 步骤</text>
<rect x="100" y="70" width="150" height="80" fill="#1976d2" stroke="#0d47a1" stroke-width="2" rx="5"/>
<circle cx="175" cy="95" r="18" fill="#fff"/>
<text x="175" y="103" text-anchor="middle" class="step">1</text>
<text x="175" y="135" text-anchor="middle" class="label" fill="#fff">添加依赖</text>
<rect x="325" y="70" width="150" height="80" fill="#388e3c" stroke="#1b5e20" stroke-width="2" rx="5"/>
<circle cx="400" cy="95" r="18" fill="#fff"/>
<text x="400" y="103" text-anchor="middle" class="step">2</text>
<text x="400" y="135" text-anchor="middle" class="label" fill="#fff">配置数据源</text>
<rect x="550" y="70" width="150" height="80" fill="#f57c00" stroke="#e65100" stroke-width="2" rx="5"/>
<circle cx="625" cy="95" r="18" fill="#fff"/>
<text x="625" y="103" text-anchor="middle" class="step">3</text>
<text x="625" y="135" text-anchor="middle" class="label" fill="#fff">创建 Mapper</text>
<rect x="212" y="200" width="150" height="80" fill="#7b1fa2" stroke="#4a148c" stroke-width="2" rx="5"/>
<circle cx="287" cy="225" r="18" fill="#fff"/>
<text x="287" y="233" text-anchor="middle" class="step">4</text>
<text x="287" y="265" text-anchor="middle" class="label" fill="#fff">使用 @MapperScan</text>
<rect x="438" y="200" width="150" height="80" fill="#c62828" stroke="#b71c1c" stroke-width="2" rx="5"/>
<circle cx="513" cy="225" r="18" fill="#fff"/>
<text x="513" y="233" text-anchor="middle" class="step">5</text>
<text x="513" y="265" text-anchor="middle" class="label" fill="#fff">注入使用</text>
<path d="M 250 110 L 325 110" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 475 110 L 550 110" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 400 150 L 310 200" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 600 150 L 540 200" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 362 240 L 438 240" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs>
<rect x="200" y="320" width="400" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="345" text-anchor="middle" class="label">✓ Spring Boot 自动配置完成</text>
<text x="400" y="365" text-anchor="middle" class="code">无需手动配置 SqlSessionFactory</text>
</svg>

**2. 步骤 1: 添加依赖**

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- MyBatis Spring Boot Starter（核心） -->
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>3.0.3</version>
    </dependency>

    <!-- 数据库驱动 -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- 连接池（可选，推荐 HikariCP） -->
    <dependency>
        <groupId>com.zaxxer</groupId>
        <artifactId>HikariCP</artifactId>
    </dependency>
</dependencies>
```

**3. 步骤 2: 配置数据源**

**application.yml 配置**

```yaml
spring:
  datasource:
    # 数据源配置
    url: jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver

    # HikariCP 连接池配置（可选）
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000

# MyBatis 配置
mybatis:
  # MyBatis 配置文件位置（可选）
  config-location: classpath:mybatis-config.xml

  # Mapper XML 文件位置
  mapper-locations: classpath:mapper/*.xml

  # 类型别名包
  type-aliases-package: com.example.entity

  # MyBatis Configuration 配置
  configuration:
    # 开启驼峰命名转换
    map-underscore-to-camel-case: true
    # 日志实现
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    # 开启二级缓存
    cache-enabled: true
    # 延迟加载
    lazy-loading-enabled: true
    aggressive-lazy-loading: false
```

**application.properties 配置**

```properties
# 数据源配置
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# MyBatis 配置
mybatis.mapper-locations=classpath:mapper/*.xml
mybatis.type-aliases-package=com.example.entity
mybatis.configuration.map-underscore-to-camel-case=true
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

**4. 步骤 3: 创建实体类和 Mapper**

**实体类**

```java
package com.example.entity;

public class User {
    private Long id;
    private String username;
    private String email;
    private Integer age;

    // Getters and Setters
}
```

**Mapper 接口**

```java
package com.example.mapper;

import com.example.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper  // 方式 1: 使用 @Mapper 注解（推荐）
public interface UserMapper {

    // 注解方式
    @Select("SELECT * FROM user WHERE id = #{id}")
    User selectById(Long id);

    @Select("SELECT * FROM user")
    List<User> selectAll();

    @Insert("INSERT INTO user(username, email, age) VALUES(#{username}, #{email}, #{age})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(User user);

    @Update("UPDATE user SET username=#{username}, email=#{email}, age=#{age} WHERE id=#{id}")
    int update(User user);

    @Delete("DELETE FROM user WHERE id = #{id}")
    int delete(Long id);

    // XML 方式
    User selectByIdXml(Long id);
    List<User> selectAllXml();
}
```

**Mapper XML 文件**

```xml
<!-- src/main/resources/mapper/UserMapper.xml -->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.mapper.UserMapper">

    <select id="selectByIdXml" resultType="User">
        SELECT * FROM user WHERE id = #{id}
    </select>

    <select id="selectAllXml" resultType="User">
        SELECT * FROM user
    </select>

</mapper>
```

**5. 步骤 4: 配置 Mapper 扫描**

**方式 1: 使用 @MapperScan（推荐）**

```java
package com.example;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.mapper")  // 扫描 Mapper 接口
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

**方式 2: 在每个 Mapper 接口上使用 @Mapper**

```java
// 无需 @MapperScan，在每个 Mapper 接口上加 @Mapper
@Mapper
public interface UserMapper {
    // ...
}
```

**6. 步骤 5: 在 Service 中使用**

```java
package com.example.service;

import com.example.entity.User;
import com.example.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public User getUserById(Long id) {
        return userMapper.selectById(id);
    }

    public List<User> getAllUsers() {
        return userMapper.selectAll();
    }

    @Transactional  // Spring 事务管理
    public void saveUser(User user) {
        userMapper.insert(user);
    }

    @Transactional
    public void updateUser(User user) {
        userMapper.update(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        userMapper.delete(id);
    }
}
```

**7. Controller 层使用**

```java
package com.example.controller;

import com.example.entity.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public String createUser(@RequestBody User user) {
        userService.saveUser(user);
        return "User created successfully";
    }

    @PutMapping
    public String updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return "User updated successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }
}
```

**8. Spring Boot 自动配置原理**

**MybatisAutoConfiguration 自动配置类**

```java
@Configuration
@ConditionalOnClass({ SqlSessionFactory.class, SqlSessionFactoryBean.class })
@ConditionalOnSingleCandidate(DataSource.class)
@EnableConfigurationProperties(MybatisProperties.class)
@AutoConfigureAfter({ DataSourceAutoConfiguration.class, ... })
public class MybatisAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        // 自动创建 SqlSessionFactory
        SqlSessionFactoryBean factory = new SqlSessionFactoryBean();
        factory.setDataSource(dataSource);

        // 设置配置
        if (properties.getConfigLocation() != null) {
            factory.setConfigLocation(properties.getConfigLocation());
        }

        // 设置 Mapper 位置
        if (properties.getMapperLocations() != null) {
            factory.setMapperLocations(properties.getMapperLocations());
        }

        return factory.getObject();
    }

    @Bean
    @ConditionalOnMissingBean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        // 自动创建 SqlSessionTemplate
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
```

**9. 配置属性对照表**

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `mybatis.config-location` | MyBatis 配置文件位置 | `classpath:mybatis-config.xml` |
| `mybatis.mapper-locations` | Mapper XML 文件位置 | `classpath:mapper/*.xml` |
| `mybatis.type-aliases-package` | 类型别名包 | `com.example.entity` |
| `mybatis.type-handlers-package` | 类型处理器包 | `com.example.handler` |
| `mybatis.configuration.*` | MyBatis Configuration 配置 | 见下表 |

**Configuration 配置项**

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `map-underscore-to-camel-case` | 驼峰命名转换 | `false` |
| `cache-enabled` | 二级缓存 | `true` |
| `lazy-loading-enabled` | 延迟加载 | `false` |
| `log-impl` | 日志实现 | - |
| `default-executor-type` | 执行器类型 | `SIMPLE` |

**10. 多数据源配置（进阶）**

```java
@Configuration
@MapperScan(
    basePackages = "com.example.mapper.primary",
    sqlSessionFactoryRef = "primarySqlSessionFactory"
)
public class PrimaryDataSourceConfig {

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource.primary")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    @Primary
    public SqlSessionFactory primarySqlSessionFactory(
            @Qualifier("primaryDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        return bean.getObject();
    }
}
```

**关键要点**

1. **Starter 依赖**: 使用 mybatis-spring-boot-starter 简化配置
2. **自动配置**: Spring Boot 自动创建 SqlSessionFactory 和 SqlSessionTemplate
3. **配置文件**: 在 application.yml 中配置数据源和 MyBatis 属性
4. **Mapper 扫描**: 使用 @MapperScan 或 @Mapper 注解
5. **零 XML**: 可以使用纯注解方式，无需 XML 配置

**记忆口诀**

```
Spring Boot 整合 MyBatis，starter 依赖先添加
application.yml 配数据源，mybatis 配置一起写
创建 Mapper 接口加注解，@Mapper 或 @MapperScan
自动配置全搞定，SqlSessionFactory 不用管
Service 注入 Mapper 用，@Transactional 加事务
简单方便零配置，开箱即用真优雅
```





**核心答案**

MyBatis 缓存失效的常见场景包括:**增删改操作**、**SqlSession 关闭**、**手动清除**、**缓存过期**、**参数变化**等。一级和二级缓存的失效时机略有差异。

**详细说明**

1. **缓存失效场景总览**

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead85" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/></marker><style>.title85{font:bold 18px sans-serif;fill:#1e293b}.label85{font:14px sans-serif;fill:#334155}.code85{font:12px monospace;fill:#059669}.invalid{fill:#fee2e2;stroke:#ef4444;stroke-width:2}.valid{fill:#dcfce7;stroke:#22c55e;stroke-width:2}</style></defs>
<text x="400" y="30" text-anchor="middle" class="title85">缓存失效场景</text>
<rect x="50" y="60" width="700" height="60" class="invalid" rx="8"/><text x="70" y="85" class="label85" font-weight="bold">场景 1: 增删改操作</text><text x="70" y="105" class="code85">执行 INSERT、UPDATE、DELETE 后清空缓存</text>
<rect x="50" y="140" width="700" height="60" class="invalid" rx="8"/><text x="70" y="165" class="label85" font-weight="bold">场景 2: SqlSession 关闭/提交</text><text x="70" y="185" class="code85">一级缓存:关闭清空 | 二级缓存:提交写入</text>
<rect x="50" y="220" width="700" height="60" class="invalid" rx="8"/><text x="70" y="245" class="label85" font-weight="bold">场景 3: 手动清除</text><text x="70" y="265" class="code85">调用 clearCache() 方法</text>
<rect x="50" y="300" width="700" height="60" class="invalid" rx="8"/><text x="70" y="325" class="label85" font-weight="bold">场景 4: 缓存过期</text><text x="70" y="345" class="code85">达到 flushInterval 配置的时间间隔</text>
<rect x="50" y="380" width="700" height="60" class="invalid" rx="8"/><text x="70" y="405" class="label85" font-weight="bold">场景 5: 参数变化</text><text x="70" y="425" class="code85">查询参数、SQL 语句、分页参数任一变化</text>
<rect x="50" y="460" width="700" height="60" class="invalid" rx="8"/><text x="70" y="485" class="label85" font-weight="bold">场景 6: 缓存容量满</text><text x="70" y="505" class="code85">达到 size 上限,按回收策略(LRU/FIFO)清理</text>
<rect x="50" y="540" width="700" height="60" class="invalid" rx="8"/><text x="70" y="565" class="label85" font-weight="bold">场景 7: 跨命名空间操作</text><text x="70" y="585" class="code85">其他 Mapper 修改了相同表的数据</text>
</svg>

2. **详细失效场景分析**

**场景1:增删改操作(最常见)**

- **行为**:执行 INSERT、UPDATE、DELETE 语句后,MyBatis 会自动清空对应 namespace 的缓存
- **原因**:保证数据一致性,避免读取到过期数据
- **作用范围**:
  - 一级缓存:清空当前 SqlSession 的所有缓存
  - 二级缓存:清空整个 namespace 的缓存

```java
SqlSession session = factory.openSession();
UserMapper mapper = session.getMapper(UserMapper.class);

// 第一次查询,缓存结果
User user1 = mapper.selectById(1); // 查数据库

// 执行更新操作,清空缓存
mapper.updateUser(user1);

// 第二次查询,缓存失效,重新查询
User user2 = mapper.selectById(1); // 再次查数据库
```

**场景2:SqlSession 关闭/提交**

- **一级缓存**:SqlSession 关闭时清空
- **二级缓存**:SqlSession 提交时写入,回滚时丢弃

```java
SqlSession session = factory.openSession();
User user = mapper.selectById(1); // 查询并缓存

session.close(); // 一级缓存清空
// 或
session.commit(); // 一级缓存数据写入二级缓存
```

**场景3:手动清除**

```java
SqlSession session = factory.openSession();
UserMapper mapper = session.getMapper(UserMapper.class);

User user1 = mapper.selectById(1); // 查询并缓存

// 手动清空一级缓存
session.clearCache();

User user2 = mapper.selectById(1); // 重新查询数据库
```

**场景4:缓存过期(仅二级缓存)**

```xml
<cache flushInterval="60000"/> <!-- 60秒后自动刷新 -->
```

- 达到 `flushInterval` 设置的时间后,缓存自动失效
- 仅对二级缓存有效,一级缓存无超时机制

**场景5:参数变化**

缓存 Key 由以下因素组成,任一变化都会导致缓存失效:

| 组成部分 | 说明 | 示例 |
|----------|------|------|
| MappedStatement ID | namespace + SQL ID | `UserMapper.selectById` |
| SQL 语句 | 原始 SQL | `SELECT * FROM user WHERE id = ?` |
| 参数值 | 传入的参数 | `id=1` vs `id=2` |
| RowBounds | 分页参数 | `offset=0, limit=10` |

```java
User user1 = mapper.selectById(1);   // 缓存 key1
User user2 = mapper.selectById(2);   // 不同参数,缓存 key2
```

**场景6:缓存容量满**

```xml
<cache size="512" eviction="LRU"/>
```

- 当缓存对象数量达到 `size` 上限时,按回收策略移除旧数据
- **LRU**:移除最久未使用的对象
- **FIFO**:移除最早进入的对象

**场景7:跨命名空间操作(脏读问题)**

```java
// UserMapper 查询并缓存
User user = userMapper.selectById(1);

// 其他 Mapper 修改了 user 表
orderMapper.updateUserStatus(1, "inactive");

// UserMapper 再次查询,仍然命中缓存(数据不一致)
User cachedUser = userMapper.selectById(1); // 脏读!
```

**解决方案**:使用 `<cache-ref>` 共享缓存或禁用二级缓存

3. **一级缓存 vs 二级缓存失效对比**

| 失效场景 | 一级缓存 | 二级缓存 |
|----------|----------|----------|
| **增删改操作** | ✓ 清空 | ✓ 清空 |
| **SqlSession 关闭** | ✓ 清空 | ✗ 不影响 |
| **SqlSession 提交** | ✓ 清空(写入二级) | ✓ 接收一级数据 |
| **SqlSession 回滚** | ✓ 清空 | ✓ 不接收数据 |
| **手动清除** | ✓ clearCache() | ✓ 清空 namespace |
| **缓存超时** | ✗ 无超时机制 | ✓ flushInterval |
| **容量限制** | ✗ 无限制 | ✓ size 限制 |
| **参数变化** | ✓ 不同 key | ✓ 不同 key |

4. **避免缓存失效的最佳实践**

1. **分离读写操作**:将查询和修改操作放在不同的 SqlSession
2. **及时提交事务**:确保修改操作尽快生效
3. **使用 cache-ref**:多个 Mapper 操作同一表时共享缓存
4. **合理配置过期时间**:根据数据更新频率设置 flushInterval
5. **禁用不必要的缓存**:频繁更新的数据不适合缓存

```xml
<!-- 禁用特定 SQL 的缓存 -->
<select id="selectRealTimeData" useCache="false">
    SELECT * FROM stock_price WHERE symbol = #{symbol}
</select>

<!-- 修改操作不清空缓存(慎用) -->
<update id="updateLog" flushCache="false">
    UPDATE access_log SET count = count + 1
</update>
```

**关键要点**

1. 🔄 **增删改清空**:任何写操作都会清空缓存
2. 🔒 **会话关闭失效**:一级缓存随 SqlSession 关闭而清空
3. ⏱️ **超时失效**:二级缓存可配置自动过期时间
4. ⚠️ **脏读风险**:跨 namespace 操作可能导致数据不一致

**记忆口诀**

```
增删改后缓存清,
关闭提交需留意,
参数变化 Key 不同,
超时容量也失效。
```

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

