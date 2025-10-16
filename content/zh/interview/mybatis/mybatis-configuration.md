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
