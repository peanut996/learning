## Spring 事务

### 48.什么是 Spring 事务？

**1. 核心定义**

Spring 事务是 Spring 框架提供的一种声明式或编程式的事务管理机制，用于确保数据库操作的 ACID 特性（原子性、一致性、隔离性、持久性）。它通过统一的抽象接口管理不同数据访问技术（JDBC、Hibernate、JPA 等）的事务。

**2. 主要特点**

- **统一抽象**：通过 `PlatformTransactionManager` 接口统一管理不同持久化技术的事务
- **声明式管理**：使用 `@Transactional` 注解，无需手动编写事务代码
- **编程式管理**：通过 `TransactionTemplate` 或直接使用 `PlatformTransactionManager` 进行精细控制
- **AOP 支持**：基于 Spring AOP 实现事务的拦截和管理

**3. 事务管理器架构**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="300" y="30" width="200" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="65" text-anchor="middle" font-size="16" font-weight="bold">PlatformTransaction</text>
<text x="400" y="85" text-anchor="middle" font-size="16" font-weight="bold">Manager (接口)</text>
<rect x="100" y="180" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="190" y="205" text-anchor="middle" font-size="14" font-weight="bold">DataSource</text>
<text x="190" y="225" text-anchor="middle" font-size="14" font-weight="bold">TransactionManager</text>
<rect x="310" y="180" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="205" text-anchor="middle" font-size="14" font-weight="bold">Hibernate</text>
<text x="400" y="225" text-anchor="middle" font-size="14" font-weight="bold">TransactionManager</text>
<rect x="520" y="180" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="610" y="205" text-anchor="middle" font-size="14" font-weight="bold">JPA</text>
<text x="610" y="225" text-anchor="middle" font-size="14" font-weight="bold">TransactionManager</text>
<line x1="370" y1="90" x2="190" y2="180" stroke="#424242" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="90" x2="400" y2="180" stroke="#424242" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="430" y1="90" x2="610" y2="180" stroke="#424242" stroke-width="2" marker-end="url(#arrowhead)"/>
<rect x="80" y="320" width="160" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="160" y="345" text-anchor="middle" font-size="14">JDBC</text>
<text x="160" y="360" text-anchor="middle" font-size="14">Connection</text>
<rect x="320" y="320" width="160" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="345" text-anchor="middle" font-size="14">Hibernate</text>
<text x="400" y="360" text-anchor="middle" font-size="14">Session</text>
<rect x="560" y="320" width="160" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="640" y="345" text-anchor="middle" font-size="14">JPA</text>
<text x="640" y="360" text-anchor="middle" font-size="14">EntityManager</text>
<line x1="160" y1="240" x2="160" y2="320" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="400" y1="240" x2="400" y2="320" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<line x1="640" y1="240" x2="640" y2="320" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
<text x="40" y="450" font-size="14" fill="#666">管理层次：</text>
<text x="40" y="475" font-size="13" fill="#666">顶层 → 统一事务抽象接口</text>
<text x="40" y="495" font-size="13" fill="#666">中层 → 针对不同技术的实现</text>
<text x="40" y="515" font-size="13" fill="#666">底层 → 具体的资源管理</text>
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#424242"/>
</marker>
</defs>
</svg>

**4. ACID 特性保障**

| 特性 | 说明 | Spring 实现方式 |
|------|------|-----------------|
| **原子性 (Atomicity)** | 事务中的所有操作要么全部成功，要么全部失败 | 通过事务管理器控制 commit/rollback |
| **一致性 (Consistency)** | 事务前后数据库状态保持一致 | 依赖应用层逻辑和数据库约束 |
| **隔离性 (Isolation)** | 并发事务之间相互隔离 | 通过设置事务隔离级别 |
| **持久性 (Durability)** | 事务提交后数据永久保存 | 依赖底层数据库实现 |

**5. 使用场景**

- **转账操作**：A 账户扣款和 B 账户加款必须同时成功或失败
- **订单处理**：创建订单、扣减库存、生成支付记录等操作需要原子性
- **批量操作**：批量插入、更新、删除数据时保证一致性
- **分布式场景**：跨多个数据源或服务的事务协调

**关键要点**

1. Spring 事务是对底层数据库事务的高层抽象
2. 支持声明式（注解）和编程式（API）两种管理方式
3. 通过 AOP 实现事务的自动管理和增强
4. 提供统一的事务管理接口，屏蔽底层技术差异

**记忆口诀**：统一抽象管事务，声明编程两方式，AOP 增强保 ACID，多种技术一接口

### 49.Spring 事务的实现方式有哪些？

**1. 两种主要实现方式**

Spring 提供了两种事务管理方式：**声明式事务**和**编程式事务**。

**2. 声明式事务（推荐）**

通过配置（注解或 XML）来声明事务规则，无需在业务代码中显式编写事务管理代码。

**实现方式：**
- **基于注解**：使用 `@Transactional` 注解（最常用）
- **基于 XML**：在配置文件中定义事务切面

**优点：**
- 代码侵入性低，业务逻辑与事务管理分离
- 配置简单，易于维护
- 适合大多数应用场景

**缺点：**
- 灵活性相对较低
- 基于 AOP 代理，存在一些限制（如同类方法调用失效）

**3. 编程式事务**

在代码中显式调用事务管理 API 来控制事务的开启、提交和回滚。

**实现方式：**
- **TransactionTemplate**：Spring 提供的模板类（推荐）
- **PlatformTransactionManager**：直接使用事务管理器接口

**优点：**
- 灵活度高，可以精确控制事务边界
- 适合复杂的事务场景

**缺点：**
- 代码侵入性强
- 增加开发和维护成本

**4. 实现方式对比图**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring 事务实现方式</text>
<rect x="50" y="60" width="300" height="360" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8"/>
<text x="200" y="90" text-anchor="middle" font-size="16" font-weight="bold">声明式事务</text>
<rect x="70" y="110" width="260" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="200" y="135" text-anchor="middle" font-size="14" font-weight="bold">基于注解</text>
<text x="90" y="160" font-size="13">• @Transactional 注解</text>
<text x="90" y="180" font-size="13">• 标注在类或方法上</text>
<text x="90" y="200" font-size="13">• 最常用的方式</text>
<rect x="70" y="225" width="260" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="200" y="250" text-anchor="middle" font-size="14" font-weight="bold">基于 XML</text>
<text x="90" y="275" font-size="13">• 配置 tx:advice</text>
<text x="90" y="295" font-size="13">• 使用 AOP 切面</text>
<text x="80" y="330" font-size="13" fill="#388e3c" font-weight="bold">优点：</text>
<text x="90" y="350" font-size="12">• 代码侵入性低</text>
<text x="90" y="370" font-size="12">• 易于维护</text>
<text x="80" y="395" font-size="13" fill="#d32f2f" font-weight="bold">缺点：</text>
<text x="90" y="415" font-size="12">• 灵活性相对较低</text>
<rect x="450" y="60" width="300" height="360" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="8"/>
<text x="600" y="90" text-anchor="middle" font-size="16" font-weight="bold">编程式事务</text>
<rect x="470" y="110" width="260" height="90" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="600" y="135" text-anchor="middle" font-size="14" font-weight="bold">TransactionTemplate</text>
<text x="490" y="160" font-size="13">• 模板方法模式</text>
<text x="490" y="180" font-size="13">• execute() 执行事务</text>
<rect x="470" y="215" width="260" height="90" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="600" y="240" text-anchor="middle" font-size="14" font-weight="bold">PlatformTransaction</text>
<text x="600" y="258" text-anchor="middle" font-size="14" font-weight="bold">Manager</text>
<text x="490" y="280" font-size="13">• 手动管理事务</text>
<text x="490" y="300" font-size="13">• 更底层的 API</text>
<text x="480" y="330" font-size="13" fill="#388e3c" font-weight="bold">优点：</text>
<text x="490" y="350" font-size="12">• 灵活度高</text>
<text x="490" y="370" font-size="12">• 精确控制</text>
<text x="480" y="395" font-size="13" fill="#d32f2f" font-weight="bold">缺点：</text>
<text x="490" y="415" font-size="12">• 代码侵入性强</text>
</svg>

**5. 具体实现对比**

| 对比维度 | 声明式事务 | 编程式事务 |
|---------|----------|----------|
| **代码侵入性** | 低（无需修改业务代码） | 高（需要嵌入事务代码） |
| **配置方式** | 注解或 XML | 注入 Bean 后调用 API |
| **灵活性** | 中等（方法级别） | 高（代码块级别） |
| **适用场景** | 大部分业务场景 | 复杂事务逻辑 |
| **维护成本** | 低 | 高 |
| **推荐程度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

**6. 选择建议**

**优先使用声明式事务：**
- 常规的 CRUD 操作
- 单一数据源的事务管理
- 需要保持代码整洁的场景

**考虑编程式事务：**
- 需要动态决定事务边界
- 部分代码需要事务，部分不需要
- 需要嵌套复杂的事务逻辑
- 对事务有细粒度控制需求

**关键要点**

1. Spring 提供声明式和编程式两种事务实现方式
2. 声明式事务基于 AOP，通过注解或 XML 配置
3. 编程式事务通过 TransactionTemplate 或 PlatformTransactionManager 实现
4. 实际开发中 95% 的场景使用声明式事务即可

**记忆口诀**：声明编程两方式，注解模板各擅长，声明简洁用得广，编程灵活场景特

### 50. 什么是声明式事务和编程式事务？

**1. 核心区别**

声明式事务和编程式事务是 Spring 提供的两种不同的事务管理方式，主要区别在于事务控制代码的位置和方式。

**2. 声明式事务**

通过配置（注解或 XML）来声明事务的边界和属性，由 Spring AOP 在运行时自动管理事务。

**特点：**
- 事务管理代码与业务逻辑分离
- 基于 AOP 动态代理实现
- 配置简单，代码整洁
- 使用 `@Transactional` 注解或 XML 配置

**3. 编程式事务**

在业务代码中显式调用事务管理 API，手动控制事务的开启、提交、回滚等操作。

**特点：**
- 事务管理代码嵌入业务逻辑
- 使用 `TransactionTemplate` 或 `PlatformTransactionManager`
- 灵活度高，可精确控制
- 代码侵入性强

**4. 实现对比**

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">声明式事务 vs 编程式事务</text>
<rect x="50" y="60" width="350" height="460" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8"/>
<text x="225" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="#1565c0">声明式事务（推荐）</text>
<rect x="70" y="110" width="310" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="225" y="135" text-anchor="middle" font-size="14" font-weight="bold">基于注解方式</text>
<text x="80" y="155" font-size="12" font-family="monospace" fill="#333">@Transactional</text>
<text x="80" y="175" font-size="12" font-family="monospace" fill="#333">public void transfer() {</text>
<text x="90" y="195" font-size="12" font-family="monospace" fill="#333">  // 业务逻辑</text>
<text x="80" y="215" font-size="12" font-family="monospace" fill="#333">}</text>
<rect x="70" y="225" width="310" height="120" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="225" y="250" text-anchor="middle" font-size="14" font-weight="bold">基于 XML 方式</text>
<text x="80" y="270" font-size="11" font-family="monospace" fill="#333">&lt;tx:advice id="txAdvice"&gt;</text>
<text x="90" y="290" font-size="11" font-family="monospace" fill="#333">&lt;tx:method name="transfer*"/&gt;</text>
<text x="80" y="310" font-size="11" font-family="monospace" fill="#333">&lt;/tx:advice&gt;</text>
<text x="80" y="330" font-size="11" font-family="monospace" fill="#333">&lt;aop:config&gt;</text>
<text x="90" y="350" font-size="11" font-family="monospace" fill="#333">&lt;aop:advisor .../&gt;</text>
<text x="80" y="370" font-size="11" font-family="monospace" fill="#333">&lt;/aop:config&gt;</text>
<rect x="70" y="360" width="310" height="145" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="225" y="385" text-anchor="middle" font-size="14" font-weight="bold">优缺点</text>
<text x="80" y="410" font-size="13" fill="#388e3c" font-weight="bold">✓ 优点：</text>
<text x="90" y="430" font-size="12">• 代码简洁，无侵入</text>
<text x="90" y="448" font-size="12">• 易于维护和理解</text>
<text x="90" y="466" font-size="12">• 统一管理事务配置</text>
<text x="80" y="488" font-size="13" fill="#d32f2f" font-weight="bold">✗ 缺点：</text>
<text x="90" y="505" font-size="12">• 灵活性较低</text>
<rect x="450" y="60" width="350" height="460" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="8"/>
<text x="625" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="#e65100">编程式事务（灵活）</text>
<rect x="470" y="110" width="310" height="135" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="625" y="135" text-anchor="middle" font-size="14" font-weight="bold">TransactionTemplate</text>
<text x="480" y="155" font-size="11" font-family="monospace" fill="#333">transactionTemplate.execute(</text>
<text x="490" y="175" font-size="11" font-family="monospace" fill="#333">status -&gt; {</text>
<text x="500" y="195" font-size="11" font-family="monospace" fill="#333">try {</text>
<text x="510" y="215" font-size="11" font-family="monospace" fill="#333">// 业务逻辑</text>
<text x="500" y="235" font-size="11" font-family="monospace" fill="#333">} catch (Exception e) {</text>
<text x="510" y="255" font-size="11" font-family="monospace" fill="#333">status.setRollbackOnly();</text>
<text x="500" y="275" font-size="11" font-family="monospace" fill="#333">}</text>
<text x="490" y="295" font-size="11" font-family="monospace" fill="#333">});</text>
<rect x="470" y="260" width="310" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="625" y="285" text-anchor="middle" font-size="14" font-weight="bold">PlatformTransactionManager</text>
<text x="480" y="305" font-size="11" font-family="monospace" fill="#333">TransactionStatus status =</text>
<text x="490" y="325" font-size="11" font-family="monospace" fill="#333">txManager.getTransaction(def);</text>
<text x="480" y="345" font-size="11" font-family="monospace" fill="#333">// 业务逻辑</text>
<text x="480" y="365" font-size="11" font-family="monospace" fill="#333">txManager.commit(status);</text>
<rect x="470" y="375" width="310" height="130" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="625" y="400" text-anchor="middle" font-size="14" font-weight="bold">优缺点</text>
<text x="480" y="423" font-size="13" fill="#388e3c" font-weight="bold">✓ 优点：</text>
<text x="490" y="443" font-size="12">• 灵活度高</text>
<text x="490" y="461" font-size="12">• 可精确控制事务边界</text>
<text x="480" y="483" font-size="13" fill="#d32f2f" font-weight="bold">✗ 缺点：</text>
<text x="490" y="503" font-size="12">• 代码侵入性强，维护成本高</text>
</svg>

**5. 详细对比表**

| 对比维度 | 声明式事务 | 编程式事务 |
|---------|----------|----------|
| **实现方式** | `@Transactional` 注解或 XML 配置 | `TransactionTemplate` 或 `PlatformTransactionManager` |
| **事务边界** | 方法级别（整个方法） | 代码块级别（可精确控制） |
| **代码侵入** | 无侵入 | 强侵入 |
| **配置复杂度** | 简单（一个注解） | 中等（需要注入和调用） |
| **维护成本** | 低 | 高 |
| **灵活性** | 中（方法粒度） | 高（代码块粒度） |
| **异常处理** | 自动回滚运行时异常 | 需手动控制回滚 |
| **适用场景** | 常规业务场景（95%） | 复杂事务逻辑（5%） |
| **性能开销** | 略高（AOP 代理） | 略低（直接调用） |

**6. 使用场景对比**

**声明式事务适合：**
- 标准的 CRUD 操作
- 事务边界与方法边界一致的场景
- 需要保持代码整洁的项目
- 团队开发的大型项目

**编程式事务适合：**
- 需要在方法内部动态控制事务
- 只对部分代码块开启事务
- 需要根据运行时条件决定是否提交
- 复杂的嵌套事务场景

**7. 典型应用示例对比**

**场景：转账操作**

| 实现方式 | 代码量 | 可读性 | 灵活性 |
|---------|-------|-------|-------|
| **声明式（注解）** | 3 行（1 注解 + 2 行业务） | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **编程式（Template）** | 8-10 行 | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **编程式（Manager）** | 12-15 行 | ⭐⭐ | ⭐⭐⭐⭐⭐ |

**关键要点**

1. 声明式事务基于 AOP，通过配置实现，代码无侵入
2. 编程式事务通过 API 实现，灵活但代码侵入性强
3. 实际开发中 95% 以上场景使用声明式事务
4. 两种方式可以混合使用，根据场景选择合适的方式

**记忆口诀**：声明配置无侵入，编程灵活有代价，常规业务用声明，复杂场景编程化


### 51. @Transactional 注解的作用是什么？

**1. 核心作用**

`@Transactional` 是 Spring 框架提供的声明式事务注解，用于标识需要事务管理的方法或类。它的主要作用是让 Spring 自动为被标注的方法添加事务管理功能，无需手动编写事务控制代码。

**2. 工作原理**

<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">@Transactional 工作流程</text>
<rect x="50" y="60" width="160" height="70" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="130" y="90" text-anchor="middle" font-size="14" font-weight="bold">客户端调用</text>
<text x="130" y="110" text-anchor="middle" font-size="13">@Transactional</text>
<text x="130" y="128" text-anchor="middle" font-size="13">标注的方法</text>
<rect x="280" y="60" width="160" height="70" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="360" y="85" text-anchor="middle" font-size="14" font-weight="bold">AOP 代理</text>
<text x="360" y="105" text-anchor="middle" font-size="13">拦截方法调用</text>
<text x="360" y="123" text-anchor="middle" font-size="13">创建代理对象</text>
<rect x="510" y="60" width="160" height="70" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="590" y="85" text-anchor="middle" font-size="14" font-weight="bold">开启事务</text>
<text x="590" y="105" text-anchor="middle" font-size="13">获取数据库连接</text>
<text x="590" y="123" text-anchor="middle" font-size="13">设置事务属性</text>
<path d="M 210 95 L 270 95" stroke="#424242" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 440 95 L 500 95" stroke="#424242" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<rect x="280" y="170" width="160" height="70" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="360" y="195" text-anchor="middle" font-size="14" font-weight="bold">执行业务逻辑</text>
<text x="360" y="215" text-anchor="middle" font-size="13">目标方法执行</text>
<text x="360" y="233" text-anchor="middle" font-size="13">数据库操作</text>
<path d="M 590 130 L 590 160 L 360 160 L 360 170" stroke="#424242" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<rect x="130" y="280" width="160" height="70" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="210" y="305" text-anchor="middle" font-size="14" font-weight="bold">执行成功</text>
<text x="210" y="325" text-anchor="middle" font-size="13">提交事务</text>
<text x="210" y="343" text-anchor="middle" font-size="13">释放连接</text>
<rect x="450" y="280" width="160" height="70" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="530" y="305" text-anchor="middle" font-size="14" font-weight="bold">抛出异常</text>
<text x="530" y="325" text-anchor="middle" font-size="13">回滚事务</text>
<text x="530" y="343" text-anchor="middle" font-size="13">释放连接</text>
<path d="M 310 240 L 210 280" stroke="#388e3c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 410 240 L 530 280" stroke="#c62828" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="250" y="268" font-size="12" fill="#388e3c">正常返回</text>
<text x="450" y="268" font-size="12" fill="#c62828">异常</text>
<rect x="280" y="390" width="160" height="60" fill="#e0f2f1" stroke="#00897b" stroke-width="2" rx="5"/>
<text x="360" y="415" text-anchor="middle" font-size="14" font-weight="bold">返回结果</text>
<text x="360" y="433" text-anchor="middle" font-size="13">给客户端</text>
<path d="M 210 350 L 210 370 L 360 370 L 360 390" stroke="#424242" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 530 350 L 530 370 L 360 370 L 360 390" stroke="#424242" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#424242"/>
</marker>
</defs>
</svg>

**3. 主要功能**

**① 自动开启事务**
- 方法执行前自动开启数据库事务
- 获取数据库连接并设置事务属性

**② 自动提交事务**
- 方法正常执行完成后自动提交事务
- 将所有数据库修改持久化

**③ 自动回滚事务**
- 方法抛出运行时异常（RuntimeException）时自动回滚
- 可配置回滚规则

**④ 管理事务属性**
- 传播行为（Propagation）
- 隔离级别（Isolation）
- 超时时间（Timeout）
- 只读标识（ReadOnly）

**4. 注解属性说明**

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| **propagation** | Propagation | REQUIRED | 事务传播行为 |
| **isolation** | Isolation | DEFAULT | 事务隔离级别 |
| **timeout** | int | -1 | 超时时间（秒），-1 表示永不超时 |
| **readOnly** | boolean | false | 是否只读事务 |
| **rollbackFor** | Class[] | {} | 指定哪些异常触发回滚 |
| **noRollbackFor** | Class[] | {} | 指定哪些异常不回滚 |
| **rollbackForClassName** | String[] | {} | 异常类名（触发回滚） |
| **noRollbackForClassName** | String[] | {} | 异常类名（不回滚） |

**5. 核心价值**

**① 代码简洁**
- 一个注解替代多行事务管理代码
- 业务逻辑与事务管理完全分离

**② 统一管理**
- 集中配置事务属性
- 便于维护和修改

**③ 降低错误**
- 自动管理事务生命周期
- 减少手动管理导致的错误

**④ 提高效率**
- 基于 AOP 实现，性能优化
- 连接池复用，资源管理高效

**6. 使用限制**

**必须满足以下条件才能生效：**

1. **方法必须是 public**
   - private、protected 方法注解无效

2. **必须通过 Spring 代理调用**
   - 同类内部方法调用不会触发事务

3. **类必须被 Spring 管理**
   - 需要添加 `@Service`、`@Component` 等注解

4. **数据库支持事务**
   - MySQL 使用 InnoDB 引擎

**7. 典型应用场景**

| 场景 | 配置示例 | 说明 |
|------|---------|------|
| **普通增删改** | `@Transactional` | 使用默认配置 |
| **查询操作** | `@Transactional(readOnly=true)` | 只读优化 |
| **重要操作** | `@Transactional(rollbackFor=Exception.class)` | 所有异常都回滚 |
| **长事务** | `@Transactional(timeout=30)` | 设置超时 |
| **批量操作** | `@Transactional(propagation=REQUIRES_NEW)` | 独立事务 |

**关键要点**

1. `@Transactional` 是 Spring 声明式事务的核心注解
2. 通过 AOP 实现自动开启、提交、回滚事务
3. 可以配置传播行为、隔离级别、超时时间等属性
4. 默认只回滚运行时异常，可通过 rollbackFor 扩展
5. 必须通过代理调用才能生效

**记忆口诀**：一注解管事务，AOP 做代理，自动开提交，异常能回滚

### 52. @Transactional 注解可以用在哪些地方?

**1. 可用位置概览**

`@Transactional` 注解可以标注在三个位置：**类、接口、方法**。不同位置的作用范围和优先级不同。

**2. 使用位置详解**

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">@Transactional 可用位置</text>
<rect x="50" y="70" width="230" height="400" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8"/>
<text x="165" y="100" text-anchor="middle" font-size="16" font-weight="bold">① 类级别</text>
<rect x="70" y="120" width="190" height="90" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="165" y="145" text-anchor="middle" font-size="13" font-family="monospace">@Transactional</text>
<text x="165" y="165" text-anchor="middle" font-size="13" font-family="monospace">public class UserService {</text>
<text x="165" y="185" text-anchor="middle" font-size="13" font-family="monospace">  // 所有public方法</text>
<text x="165" y="205" text-anchor="middle" font-size="13" font-family="monospace">}</text>
<text x="70" y="235" font-size="13" fill="#388e3c" font-weight="bold">✓ 作用范围：</text>
<text x="80" y="255" font-size="12">• 整个类的所有 public 方法</text>
<text x="80" y="275" font-size="12">• 所有方法使用相同配置</text>
<text x="70" y="300" font-size="13" fill="#1565c0" font-weight="bold">适用场景：</text>
<text x="80" y="320" font-size="12">• Service 层类</text>
<text x="80" y="340" font-size="12">• 大部分方法需要事务</text>
<text x="80" y="360" font-size="12">• 统一事务配置</text>
<text x="70" y="385" font-size="13" fill="#d32f2f" font-weight="bold">注意事项：</text>
<text x="80" y="405" font-size="12">• 可被方法级注解覆盖</text>
<text x="80" y="425" font-size="12">• private 方法无效</text>
<text x="80" y="445" font-size="12">• 内部调用不生效</text>
<rect x="310" y="70" width="230" height="400" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="8"/>
<text x="425" y="100" text-anchor="middle" font-size="16" font-weight="bold">② 方法级别</text>
<rect x="330" y="120" width="190" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="425" y="145" text-anchor="middle" font-size="12" font-family="monospace">@Transactional(</text>
<text x="425" y="163" text-anchor="middle" font-size="12" font-family="monospace">  propagation=REQUIRED</text>
<text x="425" y="181" text-anchor="middle" font-size="12" font-family="monospace">)</text>
<text x="425" y="199" text-anchor="middle" font-size="12" font-family="monospace">public void save() {}</text>
<text x="330" y="225" font-size="13" fill="#388e3c" font-weight="bold">✓ 作用范围：</text>
<text x="340" y="245" font-size="12">• 仅当前方法</text>
<text x="340" y="265" font-size="12">• 精确控制单个方法</text>
<text x="330" y="290" font-size="13" fill="#1565c0" font-weight="bold">适用场景：</text>
<text x="340" y="310" font-size="12">• 特定方法需要事务</text>
<text x="340" y="330" font-size="12">• 覆盖类级别配置</text>
<text x="340" y="350" font-size="12">• 自定义事务属性</text>
<text x="330" y="375" font-size="13" fill="#ff6f00" font-weight="bold">优先级：</text>
<text x="340" y="395" font-size="12">• 高于类级别</text>
<text x="340" y="415" font-size="12">• 高于接口级别</text>
<text x="340" y="435" font-size="12">• 最高优先级</text>
<rect x="570" y="70" width="230" height="400" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="8"/>
<text x="685" y="100" text-anchor="middle" font-size="16" font-weight="bold">③ 接口级别</text>
<rect x="590" y="120" width="190" height="90" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="685" y="145" text-anchor="middle" font-size="13" font-family="monospace">@Transactional</text>
<text x="685" y="165" text-anchor="middle" font-size="13" font-family="monospace">public interface</text>
<text x="685" y="185" text-anchor="middle" font-size="13" font-family="monospace">  UserService {</text>
<text x="685" y="205" text-anchor="middle" font-size="13" font-family="monospace">}</text>
<text x="590" y="235" font-size="13" fill="#388e3c" font-weight="bold">✓ 作用范围：</text>
<text x="600" y="255" font-size="12">• 接口所有方法</text>
<text x="600" y="275" font-size="12">• 实现类继承配置</text>
<text x="590" y="300" font-size="13" fill="#d32f2f" font-weight="bold">不推荐：</text>
<text x="600" y="320" font-size="12">• JDK 动态代理有效</text>
<text x="600" y="340" font-size="12">• CGLIB 代理无效</text>
<text x="600" y="360" font-size="12">• 可能导致混淆</text>
<text x="590" y="385" font-size="13" fill="#ff6f00" font-weight="bold">建议：</text>
<text x="600" y="405" font-size="12">• 标注在实现类上</text>
<text x="600" y="425" font-size="12">• 避免使用接口注解</text>
<text x="600" y="445" font-size="12">• 提高代码清晰度</text>
</svg>

**3. 不同位置优先级**

当多个位置都标注了 `@Transactional` 时，优先级从高到低为：

```
方法级别 > 类级别 > 接口级别
```

**4. 详细对比表**

| 对比维度 | 类级别 | 方法级别 | 接口级别 |
|---------|-------|---------|---------|
| **作用范围** | 整个类的所有 public 方法 | 单个方法 | 接口的所有方法 |
| **优先级** | 中 | 高（最高） | 低（最低） |
| **使用频率** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐ |
| **推荐程度** | 推荐 | 推荐 | 不推荐 |
| **配置灵活性** | 统一配置 | 精确控制 | 继承配置 |
| **代理类型兼容** | 全部兼容 | 全部兼容 | 仅 JDK 代理 |

**5. 使用规范**

**① 类级别使用规范**

```java
// ✓ 推荐：Service 层统一配置
@Service
@Transactional
public class OrderService {
    // 所有 public 方法自动开启事务
    public void createOrder() { }
    public void updateOrder() { }
}
```

**② 方法级别覆盖**

```java
// ✓ 推荐：方法级覆盖类级配置
@Service
@Transactional
public class UserService {

    // 使用类级别的事务配置
    public void save() { }

    // 覆盖为只读事务
    @Transactional(readOnly = true)
    public User findById(Long id) { }

    // 覆盖传播行为
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveLog() { }
}
```

**③ 接口级别（不推荐）**

```java
// ✗ 不推荐：接口上标注
@Transactional
public interface UserService {
    void save(User user);
}

// ✓ 推荐：实现类上标注
@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Override
    public void save(User user) { }
}
```

**6. 重要限制**

**① 方法访问修饰符限制**

| 修饰符 | 是否生效 | 说明 |
|-------|---------|------|
| **public** | ✓ 生效 | 推荐使用 |
| **protected** | ✗ 不生效 | AOP 代理限制 |
| **private** | ✗ 不生效 | AOP 代理限制 |
| **default** | ✗ 不生效 | 包访问权限不生效 |

**② 调用方式限制**

```java
@Service
@Transactional
public class UserService {

    // ✗ 内部调用不生效（this 调用，绕过代理）
    public void methodA() {
        this.methodB();  // 事务不生效
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void methodB() {
        // 不会创建新事务
    }
}
```

**7. 最佳实践建议**

**① 推荐做法**

1. **Service 层类级别统一配置**
   - 整个 Service 类标注 `@Transactional`
   - 默认配置适用于大部分方法

2. **特殊方法单独配置**
   - 查询方法使用 `@Transactional(readOnly = true)`
   - 需要独立事务的方法使用 `REQUIRES_NEW`

3. **避免接口级别注解**
   - 在实现类或方法上标注
   - 提高代码可读性和兼容性

**② 不推荐做法**

1. ✗ 在接口上使用（CGLIB 代理不生效）
2. ✗ 在 private/protected 方法上使用
3. ✗ 在同类内部调用事务方法
4. ✗ 在非 Spring 管理的类上使用

**关键要点**

1. `@Transactional` 可用于类、方法、接口三个位置
2. 方法级别优先级最高，可覆盖类级别配置
3. 只有 public 方法上的注解才会生效
4. 不推荐在接口上使用（CGLIB 代理不兼容）
5. 实际开发推荐类级别 + 方法级别组合使用

**记忆口诀**：类方法接口三位置，方法优先级最高，public 才能生效果，接口标注不推荐

### 53. Spring 事务的传播行为有哪些？

**1. 什么是事务传播行为**

事务传播行为（Propagation）定义了当一个事务方法被另一个事务方法调用时，如何处理事务的传播和边界。简单说就是：**事务方法之间相互调用时，事务如何传递**。

**2. 七种传播行为**

Spring 定义了 7 种事务传播行为，通过 `Propagation` 枚举定义：

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring 事务传播行为（7种）</text>
<rect x="40" y="60" width="820" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="80" y="90" font-size="15" font-weight="bold" fill="#1565c0">① REQUIRED（默认）</text>
<text x="80" y="115" font-size="13">• 如果当前存在事务，则加入该事务</text>
<text x="80" y="135" font-size="13">• 如果当前没有事务，则创建一个新事务</text>
<text x="80" y="155" font-size="13" fill="#f57c00" font-weight="bold">最常用，适合大部分场景</text>
<rect x="40" y="175" width="820" height="90" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="80" y="205" font-size="15" font-weight="bold" fill="#e65100">② REQUIRES_NEW</text>
<text x="80" y="230" font-size="13">• 创建一个新事务，如果当前存在事务，则挂起当前事务</text>
<text x="80" y="250" font-size="13" fill="#f57c00" font-weight="bold">适合：独立事务、日志记录</text>
<rect x="40" y="280" width="820" height="90" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="80" y="310" font-size="15" font-weight="bold" fill="#6a1b9a">③ SUPPORTS</text>
<text x="80" y="335" font-size="13">• 如果当前存在事务，则加入该事务</text>
<text x="80" y="355" font-size="13">• 如果当前没有事务，则以非事务方式执行</text>
<rect x="40" y="385" width="400" height="90" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="80" y="415" font-size="15" font-weight="bold" fill="#2e7d32">④ NOT_SUPPORTED</text>
<text x="80" y="440" font-size="13">• 以非事务方式执行</text>
<text x="80" y="460" font-size="13">• 如果当前存在事务，则挂起</text>
<rect x="460" y="385" width="400" height="90" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="500" y="415" font-size="15" font-weight="bold" fill="#c62828">⑤ MANDATORY</text>
<text x="500" y="440" font-size="13">• 必须在事务中执行</text>
<text x="500" y="460" font-size="13">• 如果没有事务，抛出异常</text>
<rect x="40" y="490" width="400" height="90" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="80" y="520" font-size="15" font-weight="bold" fill="#f57f00">⑥ NEVER</text>
<text x="80" y="545" font-size="13">• 必须在非事务中执行</text>
<text x="80" y="565" font-size="13">• 如果存在事务，抛出异常</text>
<rect x="460" y="490" width="400" height="90" fill="#e0f2f1" stroke="#00897b" stroke-width="2" rx="5"/>
<text x="500" y="520" font-size="15" font-weight="bold" fill="#00695c">⑦ NESTED</text>
<text x="500" y="545" font-size="13">• 如果当前存在事务，嵌套执行</text>
<text x="500" y="565" font-size="13">• 如果没有事务，行为同 REQUIRED</text>
<text x="50" y="625" font-size="13" fill="#d32f2f" font-weight="bold">使用频率排序：REQUIRED &gt; REQUIRES_NEW &gt; NESTED &gt; SUPPORTS &gt; 其他</text>
</svg>

**3. 详细对比表**

| 传播行为 | 当前有事务 | 当前无事务 | 使用场景 | 使用频率 |
|---------|-----------|-----------|---------|---------|
| **REQUIRED** | 加入当前事务 | 创建新事务 | 默认选择，常规业务 | ⭐⭐⭐⭐⭐ |
| **REQUIRES_NEW** | 挂起当前，创建新事务 | 创建新事务 | 独立事务、日志记录 | ⭐⭐⭐⭐ |
| **SUPPORTS** | 加入当前事务 | 非事务执行 | 查询操作 | ⭐⭐⭐ |
| **NOT_SUPPORTED** | 挂起当前事务 | 非事务执行 | 不需要事务的操作 | ⭐⭐ |
| **MANDATORY** | 加入当前事务 | 抛出异常 | 强制事务环境 | ⭐ |
| **NEVER** | 抛出异常 | 非事务执行 | 禁止事务的操作 | ⭐ |
| **NESTED** | 嵌套事务 | 创建新事务 | 部分回滚场景 | ⭐⭐⭐ |

**4. 常用传播行为详解**

**① REQUIRED（最常用）**

```
方法 A (有事务)
  └─ 调用方法 B (REQUIRED)
      结果：B 加入 A 的事务，共用一个事务

方法 A (无事务)
  └─ 调用方法 B (REQUIRED)
      结果：B 创建新事务
```

**特点：**
- 最常用的传播行为（默认值）
- 保证在同一个事务中执行
- A 或 B 任何一个方法异常，整个事务都回滚

**② REQUIRES_NEW（独立事务）**

```
方法 A (有事务)
  └─ 调用方法 B (REQUIRES_NEW)
      结果：挂起 A 的事务，B 创建新事务
      B 的事务独立于 A，互不影响
```

**特点：**
- B 的事务完全独立
- B 提交或回滚不影响 A
- 适合日志记录、审计等场景

**③ NESTED（嵌套事务）**

```
方法 A (有事务)
  └─ 调用方法 B (NESTED)
      结果：B 在 A 的事务中创建嵌套事务（保存点）
      B 回滚到保存点，A 可以继续
      A 回滚，B 也必须回滚
```

**特点：**
- 外层事务可以控制内层事务
- 内层回滚不影响外层（回滚到保存点）
- 外层回滚，内层必须回滚
- 需要数据库支持（JDBC 3.0 Savepoint）

**5. 传播行为场景图示**

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">三种常用传播行为对比</text>
<text x="140" y="70" text-anchor="middle" font-size="15" font-weight="bold" fill="#1565c0">REQUIRED</text>
<text x="425" y="70" text-anchor="middle" font-size="15" font-weight="bold" fill="#e65100">REQUIRES_NEW</text>
<text x="710" y="70" text-anchor="middle" font-size="15" font-weight="bold" fill="#2e7d32">NESTED</text>
<rect x="40" y="90" width="200" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="140" y="120" text-anchor="middle" font-size="14" font-weight="bold">方法 A 事务</text>
<rect x="60" y="140" width="160" height="110" fill="#bbdefb" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="140" y="165" text-anchor="middle" font-size="13">方法 A 执行</text>
<rect x="70" y="180" width="140" height="60" fill="#90caf9" stroke="#1565c0" stroke-width="2" rx="3"/>
<text x="140" y="205" text-anchor="middle" font-size="12" font-weight="bold">方法 B (REQUIRED)</text>
<text x="140" y="222" text-anchor="middle" font-size="11">加入 A 的事务</text>
<text x="50" y="295" font-size="11" fill="#1565c0">• 共用一个事务</text>
<text x="50" y="315" font-size="11" fill="#1565c0">• 任一失败都回滚</text>
<rect x="325" y="90" width="200" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="120" text-anchor="middle" font-size="14" font-weight="bold">方法 A 事务</text>
<rect x="345" y="140" width="160" height="40" fill="#ffe0b2" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="425" y="165" text-anchor="middle" font-size="13">方法 A 执行</text>
<text x="425" y="200" text-anchor="middle" font-size="12" fill="#666">(挂起)</text>
<rect x="345" y="215" width="160" height="50" fill="#ffcc80" stroke="#e65100" stroke-width="2" rx="3"/>
<text x="425" y="235" text-anchor="middle" font-size="12" font-weight="bold">方法 B (NEW)</text>
<text x="425" y="250" text-anchor="middle" font-size="11">独立新事务</text>
<text x="335" y="295" font-size="11" fill="#e65100">• 两个独立事务</text>
<text x="335" y="315" font-size="11" fill="#e65100">• B 不影响 A</text>
<rect x="610" y="90" width="200" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="3" rx="5"/>
<text x="710" y="120" text-anchor="middle" font-size="14" font-weight="bold">方法 A 事务</text>
<rect x="630" y="140" width="160" height="110" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="3"/>
<text x="710" y="165" text-anchor="middle" font-size="13">方法 A 执行</text>
<rect x="645" y="180" width="130" height="60" fill="#a5d6a7" stroke="#2e7d32" stroke-width="2" rx="3"/>
<text x="710" y="202" text-anchor="middle" font-size="12" font-weight="bold">方法 B (NESTED)</text>
<text x="710" y="217" text-anchor="middle" font-size="11">嵌套事务</text>
<text x="710" y="230" text-anchor="middle" font-size="10">(保存点)</text>
<text x="620" y="295" font-size="11" fill="#2e7d32">• 嵌套在 A 中</text>
<text x="620" y="315" font-size="11" fill="#2e7d32">• B 回滚不影响 A</text>
<text x="50" y="360" font-size="14" font-weight="bold">使用场景示例：</text>
<rect x="40" y="375" width="800" height="150" fill="#f5f5f5" stroke="#9e9e9e" stroke-width="1" rx="5"/>
<text x="60" y="400" font-size="13" font-weight="bold" fill="#1565c0">REQUIRED：</text>
<text x="160" y="400" font-size="12">订单服务调用库存服务，要求在同一事务中</text>
<text x="60" y="435" font-size="13" font-weight="bold" fill="#e65100">REQUIRES_NEW：</text>
<text x="190" y="435" font-size="12">转账操作记录日志，日志必须保存（即使转账失败）</text>
<text x="60" y="470" font-size="13" font-weight="bold" fill="#2e7d32">NESTED：</text>
<text x="150" y="470" font-size="12">批量导入数据，单条失败不影响其他记录继续处理</text>
<text x="60" y="505" font-size="13" font-weight="bold" fill="#7b1fa2">SUPPORTS：</text>
<text x="160" y="505" font-size="12">查询方法，有事务就用，没有也可以</text>
</svg>

**6. 使用建议**

**① 默认使用 REQUIRED**
- 适合 95% 的业务场景
- 保证数据一致性

**② 独立事务使用 REQUIRES_NEW**
- 日志记录（不受业务事务影响）
- 审计信息（必须保存）
- 序列号生成

**③ 部分回滚使用 NESTED**
- 批量操作（允许部分失败）
- 尝试性操作
- 需要数据库支持 Savepoint

**④ 查询操作使用 SUPPORTS**
- 纯查询方法
- 不修改数据
- 配合 readOnly = true

**关键要点**

1. Spring 定义了 7 种事务传播行为
2. REQUIRED 是默认值，适合大部分场景
3. REQUIRES_NEW 创建独立事务，适合日志记录
4. NESTED 创建嵌套事务，支持部分回滚
5. 实际开发中 95% 使用 REQUIRED，5% 使用其他

**记忆口诀**：七种传播行为记，REQUIRED 最常用，NEW 独立 NESTED 嵌套，SUPPORTS 支持可有无

### 54. Spring 事务的隔离级别有哪些？

**1. 什么是事务隔离级别**

事务隔离级别（Isolation Level）定义了一个事务可能受其他并发事务影响的程度，用于解决并发事务带来的数据问题（脏读、不可重复读、幻读）。

**2. 四种标准隔离级别**

Spring 支持 5 种隔离级别（包含一个默认值），通过 `Isolation` 枚举定义：

<svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">Spring 事务隔离级别（5种）</text>
<rect x="50" y="60" width="800" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="90" y="90" font-size="15" font-weight="bold" fill="#1565c0">① DEFAULT（默认）</text>
<text x="90" y="115" font-size="13">• 使用数据库默认的隔离级别</text>
<text x="90" y="135" font-size="13" fill="#f57c00">MySQL 默认：REPEATABLE_READ | Oracle 默认：READ_COMMITTED</text>
<rect x="50" y="155" width="800" height="85" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="90" y="185" font-size="15" font-weight="bold" fill="#c62828">② READ_UNCOMMITTED（读未提交）</text>
<text x="90" y="210" font-size="13">• 最低隔离级别，性能最好，但会出现脏读、不可重复读、幻读</text>
<text x="90" y="230" font-size="13" fill="#d32f2f">⚠️ 几乎不使用</text>
<rect x="50" y="255" width="800" height="85" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="90" y="285" font-size="15" font-weight="bold" fill="#e65100">③ READ_COMMITTED（读已提交）</text>
<text x="90" y="310" font-size="13">• 避免脏读，但会出现不可重复读、幻读</text>
<text x="90" y="330" font-size="13" fill="#f57c00">Oracle、SQL Server 默认级别</text>
<rect x="50" y="355" width="800" height="85" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="90" y="385" font-size="15" font-weight="bold" fill="#2e7d32">④ REPEATABLE_READ（可重复读）</text>
<text x="90" y="410" font-size="13">• 避免脏读、不可重复读，但可能出现幻读</text>
<text x="90" y="430" font-size="13" fill="#388e3c">MySQL InnoDB 默认级别（通过 MVCC 机制也避免了幻读）</text>
<rect x="50" y="455" width="800" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="90" y="485" font-size="15" font-weight="bold" fill="#6a1b9a">⑤ SERIALIZABLE（串行化）</text>
<text x="90" y="505" font-size="13">• 最高隔离级别，完全避免脏读、不可重复读、幻读，但性能最差</text>
</svg>

**3. 并发问题对比**

| 隔离级别 | 脏读 | 不可重复读 | 幻读 | 性能 | 使用频率 |
|---------|-----|----------|-----|------|---------|
| **READ_UNCOMMITTED** | ✗ 会发生 | ✗ 会发生 | ✗ 会发生 | ⭐⭐⭐⭐⭐ | ⭐ |
| **READ_COMMITTED** | ✓ 避免 | ✗ 会发生 | ✗ 会发生 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **REPEATABLE_READ** | ✓ 避免 | ✓ 避免 | ✗ 可能 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **SERIALIZABLE** | ✓ 避免 | ✓ 避免 | ✓ 避免 | ⭐ | ⭐ |

**4. 三种并发问题详解**

<svg viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">事务并发问题</text>
<rect x="50" y="60" width="800" height="120" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="90" y="90" font-size="15" font-weight="bold" fill="#c62828">① 脏读 (Dirty Read)</text>
<text x="90" y="115" font-size="13">• 事务 A 读取了事务 B 未提交的数据</text>
<text x="90" y="135" font-size="13">• 如果事务 B 回滚，则 A 读到的是"脏"数据</text>
<text x="90" y="155" font-size="12" font-family="monospace" fill="#666">示例：A 读到 B 修改但未提交的余额 1000，B 回滚后实际余额是 500</text>
<text x="90" y="170" font-size="12" fill="#d32f2f" font-weight="bold">最严重的问题</text>
<rect x="50" y="195" width="800" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="90" y="225" font-size="15" font-weight="bold" fill="#e65100">② 不可重复读 (Non-Repeatable Read)</text>
<text x="90" y="250" font-size="13">• 事务 A 多次读取同一数据，结果不一致（其他事务修改并提交了数据）</text>
<text x="90" y="270" font-size="13">• 侧重于数据的 UPDATE 操作</text>
<text x="90" y="290" font-size="12" font-family="monospace" fill="#666">示例：A 第一次读余额 500，B 转账后提交，A 第二次读余额变成 1000</text>
<text x="90" y="305" font-size="12" fill="#f57c00" font-weight="bold">影响数据一致性</text>
<rect x="50" y="330" width="800" height="110" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="90" y="360" font-size="15" font-weight="bold" fill="#2e7d32">③ 幻读 (Phantom Read)</text>
<text x="90" y="385" font-size="13">• 事务 A 多次查询，结果集的记录数不一致（其他事务插入或删除了数据）</text>
<text x="90" y="405" font-size="13">• 侧重于数据的 INSERT/DELETE 操作</text>
<text x="90" y="425" font-size="12" font-family="monospace" fill="#666">示例：A 查询年龄 &gt; 18 有 10 条，B 插入 1 条后提交，A 再查变成 11 条</text>
</svg>

**5. 隔离级别使用建议**

**① DEFAULT（推荐）**

```java
// 使用数据库默认隔离级别
@Transactional(isolation = Isolation.DEFAULT)
public void save() {
    // MySQL 默认 REPEATABLE_READ
    // Oracle 默认 READ_COMMITTED
}
```

**优点：**
- 适配不同数据库
- 无需关心底层差异
- 大部分场景适用

**② READ_COMMITTED**

```java
// 适合并发量大、对一致性要求不高的场景
@Transactional(isolation = Isolation.READ_COMMITTED)
public void query() {
    // 避免脏读即可
}
```

**使用场景：**
- 高并发查询
- 统计报表
- Oracle、SQL Server 应用迁移

**③ REPEATABLE_READ**

```java
// MySQL 默认级别，适合需要一致性的场景
@Transactional(isolation = Isolation.REPEATABLE_READ)
public void transfer() {
    // 保证读取一致性
}
```

**使用场景：**
- 转账操作
- 订单处理
- 需要可重复读的业务

**④ SERIALIZABLE**

```java
// 最高隔离级别，性能最差
@Transactional(isolation = Isolation.SERIALIZABLE)
public void criticalOperation() {
    // 完全串行化执行
}
```

**使用场景：**
- 金融核心业务
- 数据完全一致性要求
- 并发量极低的场景

**6. 隔离级别与性能的权衡**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">隔离级别 vs 性能权衡</text>
<line x1="100" y1="280" x2="700" y2="280" stroke="#333" stroke-width="2"/>
<line x1="100" y1="70" x2="100" y2="290" stroke="#333" stroke-width="2"/>
<polygon points="100,60 95,75 105,75" fill="#333"/>
<polygon points="710,280 695,275 695,285" fill="#333"/>
<text x="50" y="85" font-size="13" fill="#333">高</text>
<text x="40" y="175" font-size="13" fill="#333">性能</text>
<text x="50" y="285" font-size="13" fill="#333">低</text>
<text x="85" y="310" font-size="13" fill="#333">低</text>
<text x="350" y="310" font-size="13" fill="#333">隔离级别</text>
<text x="680" y="310" font-size="13" fill="#333">高</text>
<circle cx="150" cy="100" r="8" fill="#c62828"/>
<text x="150" y="130" text-anchor="middle" font-size="12" fill="#c62828" font-weight="bold">READ</text>
<text x="150" y="145" text-anchor="middle" font-size="12" fill="#c62828" font-weight="bold">UNCOMMITTED</text>
<circle cx="300" cy="150" r="8" fill="#f57c00"/>
<text x="300" y="180" text-anchor="middle" font-size="12" fill="#f57c00" font-weight="bold">READ</text>
<text x="300" y="195" text-anchor="middle" font-size="12" fill="#f57c00" font-weight="bold">COMMITTED</text>
<circle cx="500" cy="200" r="8" fill="#388e3c"/>
<text x="500" y="230" text-anchor="middle" font-size="12" fill="#388e3c" font-weight="bold">REPEATABLE</text>
<text x="500" y="245" text-anchor="middle" font-size="12" fill="#388e3c" font-weight="bold">READ</text>
<circle cx="650" cy="250" r="8" fill="#7b1fa2"/>
<text x="650" y="280" text-anchor="middle" font-size="12" fill="#7b1fa2" font-weight="bold">SERIALIZABLE</text>
<path d="M 150 100 L 300 150 L 500 200 L 650 250" stroke="#1976d2" stroke-width="3" fill="none" stroke-dasharray="5,5"/>
<text x="400" y="60" text-anchor="middle" font-size="13" fill="#1565c0" font-weight="bold">隔离级别越高，性能越低</text>
</svg>

**7. 不同数据库默认隔离级别**

| 数据库 | 默认隔离级别 | 说明 |
|-------|------------|------|
| **MySQL InnoDB** | REPEATABLE_READ | 通过 MVCC 避免幻读 |
| **MySQL MyISAM** | 不支持事务 | 表级锁 |
| **Oracle** | READ_COMMITTED | 性能与一致性平衡 |
| **SQL Server** | READ_COMMITTED | 与 Oracle 相同 |
| **PostgreSQL** | READ_COMMITTED | 支持 MVCC |

**关键要点**

1. Spring 支持 5 种隔离级别，包括 DEFAULT（使用数据库默认）
2. 隔离级别从低到高：READ_UNCOMMITTED < READ_COMMITTED < REPEATABLE_READ < SERIALIZABLE
3. 隔离级别越高，数据一致性越好，但性能越差
4. MySQL 默认 REPEATABLE_READ，Oracle 默认 READ_COMMITTED
5. 实际开发中 95% 使用 DEFAULT 即可

**记忆口诀**：未提交已提交可重复串行化，脏读不可重复幻读问题，级别越高性能越差，默认级别最常用

### 55. @Transactional 注解在什么情况下会失效？

**1. 核心问题**

`@Transactional` 注解失效是 Spring 事务使用中最常见的问题。理解失效场景是正确使用事务的关键。

**2. 七大失效场景**

<svg viewBox="0 0 900 680" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">@Transactional 七大失效场景</text>
<rect x="40" y="60" width="820" height="85" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="80" y="90" font-size="15" font-weight="bold" fill="#c62828">① 方法不是 public</text>
<text x="80" y="115" font-size="13">• @Transactional 只能用于 public 方法</text>
<text x="80" y="135" font-size="13">• private、protected、default 方法注解无效</text>
<rect x="40" y="160" width="820" height="85" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="80" y="190" font-size="15" font-weight="bold" fill="#e65100">② 同类方法内部调用（自调用）</text>
<text x="80" y="215" font-size="13">• 类内部方法调用，绕过了 Spring AOP 代理</text>
<text x="80" y="235" font-size="13">• this.method() 调用不会触发事务</text>
<rect x="40" y="260" width="820" height="85" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="80" y="290" font-size="15" font-weight="bold" fill="#2e7d32">③ 异常被捕获未抛出</text>
<text x="80" y="315" font-size="13">• 方法内部 try-catch 捕获了异常但未抛出</text>
<text x="80" y="335" font-size="13">• Spring 无法感知异常，不会回滚</text>
<rect x="40" y="360" width="820" height="85" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="80" y="390" font-size="15" font-weight="bold" fill="#6a1b9a">④ 抛出的异常类型不匹配</text>
<text x="80" y="415" font-size="13">• 默认只回滚 RuntimeException 和 Error</text>
<text x="80" y="435" font-size="13">• 抛出 checked 异常（如 Exception）不会回滚</text>
<rect x="40" y="460" width="820" height="85" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="80" y="490" font-size="15" font-weight="bold" fill="#1565c0">⑤ 数据库引擎不支持事务</text>
<text x="80" y="515" font-size="13">• MySQL 使用 MyISAM 引擎不支持事务</text>
<text x="80" y="535" font-size="13">• 必须使用 InnoDB 引擎</text>
<rect x="40" y="560" width="400" height="85" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="80" y="590" font-size="15" font-weight="bold" fill="#f57f00">⑥ 类未被 Spring 管理</text>
<text x="80" y="615" font-size="13">• 类没有 @Service 等注解</text>
<text x="80" y="635" font-size="13">• Spring 容器未管理该 Bean</text>
<rect x="460" y="560" width="400" height="85" fill="#e0f2f1" stroke="#00897b" stroke-width="2" rx="5"/>
<text x="500" y="590" font-size="15" font-weight="bold" fill="#00695c">⑦ 传播行为配置错误</text>
<text x="500" y="615" font-size="13">• NOT_SUPPORTED 等</text>
<text x="500" y="635" font-size="13">• 导致不开启事务</text>
</svg>

**3. 详细场景分析**

**场景 1：方法不是 public**

```java
// ✗ 错误：private 方法事务不生效
@Service
public class UserService {
    @Transactional  // 无效
    private void save() {
        // 事务不生效
    }

    @Transactional  // 无效
    protected void update() {
        // 事务不生效
    }
}

// ✓ 正确：使用 public 方法
@Service
public class UserService {
    @Transactional
    public void save() {
        // 事务生效
    }
}
```

**原因：** Spring AOP 基于代理，只能拦截 public 方法。

---

**场景 2：同类方法内部调用（最常见）**

```java
// ✗ 错误：内部调用绕过代理
@Service
public class UserService {

    public void methodA() {
        // this 调用，不走代理
        this.methodB();  // 事务不生效
    }

    @Transactional
    public void methodB() {
        // 事务不会开启
    }
}

// ✓ 正确：通过 Spring 注入的 Bean 调用
@Service
public class UserService {
    @Autowired
    private UserService self;  // 注入自己

    public void methodA() {
        self.methodB();  // 通过代理调用，事务生效
    }

    @Transactional
    public void methodB() {
        // 事务正常开启
    }
}
```

**原因：** `this.method()` 是对象内部调用，绕过了 Spring AOP 代理。

---

**场景 3：异常被捕获未抛出**

```java
// ✗ 错误：异常被吃掉
@Service
public class UserService {
    @Transactional
    public void save() {
        try {
            // 数据库操作
            throw new RuntimeException("出错了");
        } catch (Exception e) {
            // 异常被捕获，未抛出
            e.printStackTrace();
        }
        // 事务不会回滚
    }
}

// ✓ 正确：重新抛出异常或手动回滚
@Service
public class UserService {
    @Transactional
    public void save() {
        try {
            // 数据库操作
        } catch (Exception e) {
            // 方式 1：重新抛出
            throw e;

            // 方式 2：手动标记回滚
            // TransactionAspectSupport.currentTransactionStatus()
            //     .setRollbackOnly();
        }
    }
}
```

**原因：** Spring 通过捕获异常判断是否回滚，异常被吃掉则无法感知。

---

**场景 4：抛出的异常类型不匹配**

```java
// ✗ 错误：checked 异常不回滚
@Service
public class UserService {
    @Transactional
    public void save() throws Exception {
        // ...
        throw new Exception("checked 异常");
        // 默认不回滚
    }
}

// ✓ 正确：配置 rollbackFor
@Service
public class UserService {
    @Transactional(rollbackFor = Exception.class)
    public void save() throws Exception {
        // ...
        throw new Exception("checked 异常");
        // 现在会回滚
    }
}
```

**原因：** 默认只回滚 `RuntimeException` 和 `Error`。

---

**场景 5：数据库引擎不支持**

```sql
-- ✗ 错误：MyISAM 不支持事务
CREATE TABLE user (
    id INT PRIMARY KEY
) ENGINE=MyISAM;

-- ✓ 正确：使用 InnoDB
CREATE TABLE user (
    id INT PRIMARY KEY
) ENGINE=InnoDB;
```

**原因：** 事务是数据库层面的特性，引擎必须支持。

---

**场景 6：类未被 Spring 管理**

```java
// ✗ 错误：普通类，未被 Spring 管理
public class UserService {
    @Transactional
    public void save() {
        // 事务不生效
    }
}

// ✓ 正确：添加 Spring 注解
@Service
public class UserService {
    @Transactional
    public void save() {
        // 事务生效
    }
}
```

**原因：** 必须是 Spring 容器管理的 Bean，才能应用 AOP。

---

**场景 7：传播行为配置错误**

```java
// ✗ 错误：NOT_SUPPORTED 不开启事务
@Transactional(propagation = Propagation.NOT_SUPPORTED)
public void save() {
    // 不会开启事务
}

// ✓ 正确：使用默认 REQUIRED
@Transactional
public void save() {
    // 正常开启事务
}
```

**4. 失效场景对比表**

| 场景 | 原因 | 频率 | 解决方案 |
|-----|------|------|---------|
| **非 public 方法** | AOP 代理限制 | ⭐⭐⭐ | 改为 public |
| **内部调用** | 绕过代理 | ⭐⭐⭐⭐⭐ | 注入自身或拆分类 |
| **异常被捕获** | Spring 感知不到异常 | ⭐⭐⭐⭐ | 重新抛出或手动回滚 |
| **异常类型不匹配** | 默认只回滚运行时异常 | ⭐⭐⭐⭐ | rollbackFor=Exception.class |
| **数据库引擎** | 引擎不支持 | ⭐⭐ | 使用 InnoDB |
| **未被 Spring 管理** | 无法应用 AOP | ⭐⭐ | 添加 @Service |
| **传播行为错误** | 配置问题 | ⭐ | 检查传播配置 |

**5. 排查步骤**

**① 检查方法是否 public**
```java
// 确保方法是 public
public void methodName() { }
```

**② 检查是否内部调用**
```java
// 不要使用 this 调用
// this.method() ✗
// 通过注入的 Bean 调用 ✓
```

**③ 检查异常处理**
```java
// 确保异常能被 Spring 捕获
throw new RuntimeException();
// 或配置 rollbackFor
```

**④ 开启事务日志**
```properties
# application.properties
logging.level.org.springframework.transaction=DEBUG
logging.level.org.springframework.jdbc.datasource=DEBUG
```

**关键要点**

1. 最常见失效场景：内部调用、异常被捕获、非 public 方法
2. 内部调用必须通过 Spring 注入的 Bean 调用，不能用 this
3. 异常必须抛出让 Spring 感知，或手动标记回滚
4. 默认只回滚运行时异常，checked 异常需配置 rollbackFor
5. 类必须是 Spring 管理的 Bean，数据库必须支持事务

**记忆口诀**：内部调用最常见，异常捕获要抛出，方法必须是 public，类需 Spring 来管理

### 56. 如何解决事务失效的问题？

**1. 解决方案总览**

针对不同的事务失效场景，有相应的解决方案。以下是系统化的解决方法。

**2. 七大失效场景的解决方案**

<svg viewBox="0 0 900 720" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="18" font-weight="bold">事务失效问题解决方案</text>
<rect x="40" y="60" width="820" height="90" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="80" y="90" font-size="15" font-weight="bold" fill="#1565c0">问题 ① 方法不是 public</text>
<text x="80" y="115" font-size="13" fill="#d32f2f">✗ 原因：AOP 代理只能拦截 public 方法</text>
<text x="80" y="135" font-size="13" fill="#388e3c" font-weight="bold">✓ 解决：将方法改为 public</text>
<rect x="40" y="165" width="820" height="90" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="80" y="195" font-size="15" font-weight="bold" fill="#e65100">问题 ② 同类方法内部调用</text>
<text x="80" y="220" font-size="13" fill="#d32f2f">✗ 原因：this 调用绕过代理对象</text>
<text x="80" y="240" font-size="13" fill="#388e3c" font-weight="bold">✓ 解决：注入自身 Bean / 拆分到不同类 / 使用 AopContext</text>
<rect x="40" y="270" width="820" height="90" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="80" y="300" font-size="15" font-weight="bold" fill="#2e7d32">问题 ③ 异常被捕获未抛出</text>
<text x="80" y="325" font-size="13" fill="#d32f2f">✗ 原因：Spring 无法感知异常</text>
<text x="80" y="345" font-size="13" fill="#388e3c" font-weight="bold">✓ 解决：重新抛出异常 / 手动标记回滚</text>
<rect x="40" y="375" width="820" height="90" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="80" y="405" font-size="15" font-weight="bold" fill="#6a1b9a">问题 ④ 异常类型不匹配</text>
<text x="80" y="430" font-size="13" fill="#d32f2f">✗ 原因：默认只回滚运行时异常</text>
<text x="80" y="450" font-size="13" fill="#388e3c" font-weight="bold">✓ 解决：配置 rollbackFor = Exception.class</text>
<rect x="40" y="480" width="820" height="90" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="80" y="510" font-size="15" font-weight="bold" fill="#c62828">问题 ⑤ 数据库引擎不支持</text>
<text x="80" y="535" font-size="13" fill="#d32f2f">✗ 原因：MyISAM 不支持事务</text>
<text x="80" y="555" font-size="13" fill="#388e3c" font-weight="bold">✓ 解决：使用 InnoDB 引擎</text>
<rect x="40" y="585" width="400" height="90" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="80" y="615" font-size="15" font-weight="bold" fill="#f57f00">问题 ⑥ 类未被管理</text>
<text x="80" y="640" font-size="13" fill="#d32f2f">✗ 无法应用 AOP</text>
<text x="80" y="660" font-size="13" fill="#388e3c" font-weight="bold">✓ 添加 @Service</text>
<rect x="460" y="585" width="400" height="90" fill="#e0f2f1" stroke="#00897b" stroke-width="2" rx="5"/>
<text x="500" y="615" font-size="15" font-weight="bold" fill="#00695c">问题 ⑦ 传播行为错误</text>
<text x="500" y="640" font-size="13" fill="#d32f2f">✗ 配置不当</text>
<text x="500" y="660" font-size="13" fill="#388e3c" font-weight="bold">✓ 检查 propagation</text>
</svg>

**3. 重点问题详细解决方案**

**解决方案 1：方法改为 public**

```java
// ✗ 错误
@Service
public class UserService {
    @Transactional
    private void save() {  // private 方法
    }
}

// ✓ 正确
@Service
public class UserService {
    @Transactional
    public void save() {  // 改为 public
    }
}
```

---

**解决方案 2：解决内部调用（3种方法）**

**方法 2.1：注入自身 Bean（推荐）**

```java
@Service
public class UserService {

    @Autowired
    private UserService self;  // 注入自己

    public void methodA() {
        // 通过注入的 Bean 调用，走代理
        self.methodB();  // ✓ 事务生效
    }

    @Transactional
    public void methodB() {
        // 业务逻辑
    }
}
```

**方法 2.2：拆分到不同的类（最佳实践）**

```java
// 拆分成两个 Service
@Service
public class UserServiceA {

    @Autowired
    private UserServiceB serviceB;

    public void methodA() {
        serviceB.methodB();  // ✓ 事务生效
    }
}

@Service
public class UserServiceB {

    @Transactional
    public void methodB() {
        // 业务逻辑
    }
}
```

**方法 2.3：使用 AopContext（需开启配置）**

```java
// 1. 开启 expose-proxy
@EnableAspectJAutoProxy(exposeProxy = true)
@SpringBootApplication
public class Application {
}

// 2. 使用 AopContext
@Service
public class UserService {

    public void methodA() {
        // 获取代理对象
        UserService proxy = (UserService) AopContext.currentProxy();
        proxy.methodB();  // ✓ 事务生效
    }

    @Transactional
    public void methodB() {
        // 业务逻辑
    }
}
```

---

**解决方案 3：异常处理（2种方法）**

**方法 3.1：重新抛出异常（推荐）**

```java
@Service
public class UserService {

    @Transactional
    public void save() {
        try {
            // 业务逻辑
        } catch (Exception e) {
            // 记录日志
            log.error("保存失败", e);
            // 重新抛出，让 Spring 感知
            throw e;  // ✓ 或者 throw new RuntimeException(e);
        }
    }
}
```

**方法 3.2：手动标记回滚**

```java
@Service
public class UserService {

    @Transactional
    public void save() {
        try {
            // 业务逻辑
        } catch (Exception e) {
            // 手动标记回滚
            TransactionAspectSupport.currentTransactionStatus()
                .setRollbackOnly();
            // 可以返回错误信息，不抛出异常
            return;
        }
    }
}
```

---

**解决方案 4：配置异常回滚类型**

```java
// ✗ 错误：checked 异常不回滚
@Transactional
public void save() throws Exception {
    throw new Exception("业务异常");
}

// ✓ 正确：配置 rollbackFor
@Transactional(rollbackFor = Exception.class)
public void save() throws Exception {
    throw new Exception("业务异常");
}

// ✓ 或者：抛出运行时异常
@Transactional
public void save() {
    throw new RuntimeException("业务异常");
}
```

---

**解决方案 5：更改数据库引擎**

```sql
-- 查看表引擎
SHOW TABLE STATUS LIKE 'user';

-- 修改为 InnoDB
ALTER TABLE user ENGINE = InnoDB;

-- 创建表时指定
CREATE TABLE user (
    id INT PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

**解决方案 6：添加 Spring 管理注解**

```java
// ✗ 错误：普通类
public class UserService {
    @Transactional
    public void save() {
    }
}

// ✓ 正确：添加 @Service
@Service
public class UserService {
    @Transactional
    public void save() {
    }
}
```

---

**解决方案 7：检查传播行为配置**

```java
// ✗ 错误：NOT_SUPPORTED 不开启事务
@Transactional(propagation = Propagation.NOT_SUPPORTED)
public void save() {
}

// ✓ 正确：使用默认 REQUIRED
@Transactional  // 默认 REQUIRED
public void save() {
}

// ✓ 或明确指定
@Transactional(propagation = Propagation.REQUIRED)
public void save() {
}
```

**4. 解决方案对比表**

| 问题 | 解决方案 | 优先级 | 复杂度 |
|-----|---------|-------|-------|
| **非 public 方法** | 改为 public | ⭐⭐⭐⭐⭐ | 简单 |
| **内部调用** | 拆分类 > 注入自身 > AopContext | ⭐⭐⭐⭐⭐ | 中等 |
| **异常被捕获** | 重新抛出 > 手动回滚 | ⭐⭐⭐⭐⭐ | 简单 |
| **异常类型** | rollbackFor=Exception.class | ⭐⭐⭐⭐⭐ | 简单 |
| **数据库引擎** | 改为 InnoDB | ⭐⭐⭐⭐ | 简单 |
| **未被管理** | 添加 @Service | ⭐⭐⭐ | 简单 |
| **传播行为** | 使用 REQUIRED | ⭐⭐ | 简单 |

**5. 最佳实践建议**

**① 规范代码结构**
- Service 方法统一使用 public
- 避免类内部调用事务方法
- 需要内部调用时，拆分成独立的 Service

**② 统一异常处理**
- 业务异常统一抛出 RuntimeException
- 或配置全局 `@Transactional(rollbackFor = Exception.class)`

**③ 开启事务调试**
```properties
# application.properties
logging.level.org.springframework.transaction=DEBUG
```

**④ 使用事务模板**
```java
// 定义统一的事务配置
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Transactional(rollbackFor = Exception.class)
public @interface TxRequired {
}

// 使用
@Service
public class UserService {
    @TxRequired  // 替代 @Transactional
    public void save() {
    }
}
```

**6. 排查工具和技巧**

**① 查看是否生成代理**
```java
@Autowired
private UserService userService;

// 检查是否是代理对象
System.out.println(userService.getClass());
// 应该输出：UserService$$EnhancerBySpringCGLIB$$...
```

**② 使用 TransactionTemplate（保底方案）**
```java
@Service
public class UserService {

    @Autowired
    private TransactionTemplate transactionTemplate;

    public void save() {
        transactionTemplate.execute(status -> {
            try {
                // 业务逻辑
                return null;
            } catch (Exception e) {
                status.setRollbackOnly();
                throw e;
            }
        });
    }
}
```

**关键要点**

1. 内部调用是最常见问题，推荐拆分成独立的 Service
2. 异常必须抛出或手动标记回滚
3. 建议统一配置 rollbackFor = Exception.class
4. 方法必须是 public，类必须被 Spring 管理
5. 开启事务日志有助于排查问题

**记忆口诀**：改 public 拆类注入，异常抛出需配置，引擎 Bean 要检查，日志开启助排查

### 57. 什么是事务的回滚？如何控制回滚？

**1. 什么是事务回滚**

事务回滚（Rollback）是指当事务执行过程中发生错误时，撤销该事务中已执行的所有数据库操作，使数据库恢复到事务开始前的状态，保证数据的一致性和完整性。

**2. 回滚机制原理**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">事务回滚机制</text>
<rect x="50" y="60" width="320" height="300" fill="#e8f5e9" stroke="#388e3c" stroke-width="3" rx="8"/>
<text x="210" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">正常提交流程</text>
<rect x="70" y="110" width="280" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="210" y="140" text-anchor="middle" font-size="14">① 开启事务</text>
<rect x="70" y="175" width="280" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="210" y="205" text-anchor="middle" font-size="14">② 执行操作（A、B、C）</text>
<rect x="70" y="240" width="280" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="210" y="270" text-anchor="middle" font-size="14">③ 操作成功，提交事务</text>
<text x="210" y="320" text-anchor="middle" font-size="15" fill="#388e3c" font-weight="bold">✓ 数据永久保存</text>
<rect x="430" y="60" width="320" height="300" fill="#ffebee" stroke="#c62828" stroke-width="3" rx="8"/>
<text x="590" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="#c62828">回滚流程</text>
<rect x="450" y="110" width="280" height="50" fill="#ffcdd2" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="590" y="140" text-anchor="middle" font-size="14">① 开启事务</text>
<rect x="450" y="175" width="280" height="50" fill="#ffcdd2" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="590" y="205" text-anchor="middle" font-size="14">② 执行操作（A、B、C）</text>
<rect x="450" y="240" width="280" height="50" fill="#ffcdd2" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="590" y="270" text-anchor="middle" font-size="14">③ 发生异常，回滚事务</text>
<text x="590" y="320" text-anchor="middle" font-size="15" fill="#c62828" font-weight="bold">✗ 撤销所有操作</text>
<path d="M 370 200 L 420 200" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
<text x="395" y="190" text-anchor="middle" font-size="12" fill="#666">vs</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<polygon points="0 0, 10 3, 0 6" fill="#666"/>
</marker>
</defs>
</svg>

**3. Spring 事务回滚规则**

**默认回滚行为：**

| 异常类型 | 是否回滚 | 说明 |
|---------|---------|------|
| **RuntimeException** | ✓ 回滚 | 运行时异常 |
| **Error** | ✓ 回滚 | 系统错误 |
| **Exception（checked）** | ✗ 不回滚 | 受检异常 |
| **Throwable** | ✗ 不回滚 | 异常的顶级父类 |

**4. 控制回滚的方法**

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="30" text-anchor="middle" font-size="18" font-weight="bold">控制事务回滚的五种方法</text>
<rect x="40" y="60" width="770" height="90" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="80" y="90" font-size="15" font-weight="bold" fill="#1565c0">方法 ① rollbackFor 属性</text>
<text x="80" y="115" font-size="13">• 指定哪些异常触发回滚</text>
<text x="80" y="135" font-size="12" font-family="monospace">@Transactional(rollbackFor = Exception.class)</text>
<rect x="40" y="165" width="770" height="90" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="80" y="195" font-size="15" font-weight="bold" fill="#e65100">方法 ② noRollbackFor 属性</text>
<text x="80" y="220" font-size="13">• 指定哪些异常不触发回滚</text>
<text x="80" y="240" font-size="12" font-family="monospace">@Transactional(noRollbackFor = IllegalArgumentException.class)</text>
<rect x="40" y="270" width="770" height="90" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="80" y="300" font-size="15" font-weight="bold" fill="#2e7d32">方法 ③ 手动标记回滚</text>
<text x="80" y="325" font-size="13">• 编程式控制回滚</text>
<text x="80" y="345" font-size="12" font-family="monospace">TransactionAspectSupport.currentTransactionStatus().setRollbackOnly()</text>
<rect x="40" y="375" width="770" height="75" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="80" y="405" font-size="15" font-weight="bold" fill="#6a1b9a">方法 ④ 抛出异常</text>
<text x="80" y="430" font-size="13">• 抛出 RuntimeException 或配置的异常类型</text>
<rect x="40" y="465" width="770" height="75" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="80" y="495" font-size="15" font-weight="bold" fill="#f57f00">方法 ⑤ 使用 TransactionTemplate</text>
<text x="80" y="520" font-size="13">• 编程式事务，通过 status.setRollbackOnly() 控制</text>
</svg>

**5. 详细使用示例**

**方法 1：rollbackFor 属性**

```java
// 默认只回滚运行时异常
@Transactional
public void save1() throws Exception {
    // ...
    throw new Exception("checked 异常");
    // ✗ 不会回滚
}

// 配置回滚所有异常
@Transactional(rollbackFor = Exception.class)
public void save2() throws Exception {
    // ...
    throw new Exception("checked 异常");
    // ✓ 会回滚
}

// 配置多个异常类型
@Transactional(rollbackFor = {
    Exception.class,
    IOException.class,
    SQLException.class
})
public void save3() {
    // 这些异常都会触发回滚
}
```

**方法 2：noRollbackFor 属性**

```java
// 指定某些异常不回滚
@Transactional(
    rollbackFor = Exception.class,
    noRollbackFor = IllegalArgumentException.class
)
public void save() {
    try {
        // 业务逻辑
    } catch (IllegalArgumentException e) {
        // 这个异常不会触发回滚
        throw e;
    } catch (Exception e) {
        // 其他异常会回滚
        throw e;
    }
}

// 实际应用：业务异常不回滚
@Transactional(
    rollbackFor = Exception.class,
    noRollbackFor = BusinessException.class  // 自定义业务异常
)
public void processOrder() {
    // 业务异常不回滚，技术异常回滚
}
```

**方法 3：手动标记回滚**

```java
@Service
public class UserService {

    @Transactional
    public void save(User user) {
        try {
            // 执行数据库操作
            userDao.save(user);

            // 业务校验
            if (!validate(user)) {
                // 手动标记回滚
                TransactionAspectSupport.currentTransactionStatus()
                    .setRollbackOnly();
                return;  // 可以正常返回，不抛异常
            }

        } catch (Exception e) {
            // 也可以在异常处理中标记回滚
            TransactionAspectSupport.currentTransactionStatus()
                .setRollbackOnly();
            log.error("保存失败", e);
        }
    }
}
```

**方法 4：抛出异常（最常用）**

```java
@Service
public class UserService {

    @Transactional(rollbackFor = Exception.class)
    public void save(User user) {
        // 数据库操作
        userDao.save(user);

        // 业务校验失败，抛出异常
        if (user.getAge() < 18) {
            throw new IllegalArgumentException("年龄不能小于18岁");
            // 触发回滚
        }

        // 其他操作
        logService.save(log);
    }
}
```

**方法 5：使用 TransactionTemplate**

```java
@Service
public class UserService {

    @Autowired
    private TransactionTemplate transactionTemplate;

    public void save(User user) {
        transactionTemplate.execute(status -> {
            try {
                // 业务逻辑
                userDao.save(user);

                if (!validate(user)) {
                    // 手动标记回滚
                    status.setRollbackOnly();
                    return null;
                }

                return user;
            } catch (Exception e) {
                // 标记回滚
                status.setRollbackOnly();
                throw new RuntimeException(e);
            }
        });
    }
}
```

**6. 回滚场景对比**

| 场景 | 配置方式 | 适用情况 | 推荐度 |
|-----|---------|---------|-------|
| **默认行为** | 无配置 | RuntimeException 和 Error | ⭐⭐⭐ |
| **回滚所有异常** | rollbackFor = Exception.class | 大部分业务场景 | ⭐⭐⭐⭐⭐ |
| **排除特定异常** | noRollbackFor = XXX.class | 特定业务异常不回滚 | ⭐⭐⭐⭐ |
| **手动控制** | setRollbackOnly() | 复杂业务逻辑 | ⭐⭐⭐⭐ |
| **抛出异常** | throw Exception | 标准做法 | ⭐⭐⭐⭐⭐ |

**7. 最佳实践**

**① 统一配置回滚规则**

```java
// 自定义注解
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Transactional(rollbackFor = Exception.class)
public @interface TxRequired {
}

// 使用
@Service
public class UserService {
    @TxRequired  // 统一回滚规则
    public void save() {
    }
}
```

**② 区分业务异常和系统异常**

```java
// 业务异常（不回滚）
public class BusinessException extends RuntimeException {
}

// 系统异常（回滚）
public class SystemException extends RuntimeException {
}

// 配置
@Transactional(
    rollbackFor = Exception.class,
    noRollbackFor = BusinessException.class
)
public void process() {
    // 业务异常不回滚
    throw new BusinessException("库存不足");

    // 系统异常回滚
    throw new SystemException("数据库连接失败");
}
```

**③ 日志记录回滚原因**

```java
@Transactional(rollbackFor = Exception.class)
public void save(User user) {
    try {
        userDao.save(user);
    } catch (Exception e) {
        log.error("保存用户失败，事务将回滚. userId={}", user.getId(), e);
        throw e;  // 重新抛出，触发回滚
    }
}
```

**8. 注意事项**

**① 回滚不会影响已提交的独立事务**

```java
@Service
public class OrderService {

    @Transactional
    public void createOrder() {
        // 操作 1
        orderDao.save(order);

        // 操作 2：独立事务（REQUIRES_NEW）
        logService.saveLog(log);  // 已提交

        // 操作 3：出现异常
        throw new RuntimeException();

        // 结果：操作1回滚，操作2不回滚（已提交）
    }
}
```

**② 部分数据已落库（如缓存、消息）不会回滚**

```java
@Transactional
public void save() {
    // 数据库操作（会回滚）
    userDao.save(user);

    // Redis 操作（不会回滚）
    redisTemplate.set("key", "value");

    // 发送消息（不会回滚）
    mqSender.send(message);

    // 异常
    throw new RuntimeException();

    // 结果：只有数据库操作回滚
}
```

**关键要点**

1. 事务回滚是撤销事务中所有数据库操作，恢复到初始状态
2. 默认只回滚 RuntimeException 和 Error
3. 推荐配置 rollbackFor = Exception.class 回滚所有异常
4. 可通过 setRollbackOnly() 手动标记回滚
5. 回滚只影响数据库操作，不影响缓存、消息等

**记忆口诀**：异常触发自动滚，配置 rollbackFor 扩展，手动标记可控制，缓存消息不回滚
