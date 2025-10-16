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
