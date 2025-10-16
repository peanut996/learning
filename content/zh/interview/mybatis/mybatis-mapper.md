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
