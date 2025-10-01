# MySQL 面试题

## 基础概念

### 1. 什么是关系型数据库?MySQL 的特点是什么?

#### 核心答案

**关系型数据库(RDBMS)**是基于关系模型的数据库,使用表格(Table)来组织和存储数据,通过SQL语言进行操作。

**MySQL特点**:开源免费、支持多存储引擎、支持事务、高性能、跨平台。

#### 详细说明

**关系型数据库的特点**:
- 数据以二维表格形式存储
- 表与表之间通过主外键建立关系
- 使用SQL(结构化查询语言)进行数据操作
- 支持ACID事务特性
- 数据结构化,有严格的数据类型和约束

**MySQL的主要特点**:

1. **开源免费** - 基于GPL协议,社区版完全免费
2. **性能优异** - 读写性能好,支持高并发
3. **多存储引擎** - InnoDB、MyISAM、Memory等,灵活选择
4. **跨平台** - 支持Linux、Windows、macOS等多种操作系统
5. **支持事务** - InnoDB引擎支持完整的ACID事务
6. **支持主从复制** - 实现读写分离和高可用
7. **丰富的数据类型** - 数值、字符串、日期、JSON等
8. **活跃的社区** - 文档完善,问题解决快

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="300" fill="#f0f4f8" stroke="#2563eb" stroke-width="2" rx="10"/>
<text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#1e293b">MySQL 架构与特点</text>
<rect x="80" y="80" width="200" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="5"/>
<text x="180" y="115" text-anchor="middle" font-size="16" fill="white" font-weight="bold">客户端层</text>
<rect x="80" y="160" width="200" height="60" fill="#8b5cf6" stroke="#6d28d9" stroke-width="2" rx="5"/>
<text x="180" y="185" text-anchor="middle" font-size="14" fill="white">连接器</text>
<text x="180" y="205" text-anchor="middle" font-size="14" fill="white">查询缓存/分析器/优化器</text>
<rect x="80" y="240" width="200" height="60" fill="#ec4899" stroke="#be185d" stroke-width="2" rx="5"/>
<text x="180" y="275" text-anchor="middle" font-size="16" fill="white" font-weight="bold">存储引擎层</text>
<rect x="320" y="80" width="450" height="240" fill="white" stroke="#cbd5e1" stroke-width="2" rx="5"/>
<text x="545" y="110" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">核心特点</text>
<text x="340" y="145" font-size="15" fill="#334155">✓ 开源免费 - GPL协议,社区活跃</text>
<text x="340" y="175" font-size="15" fill="#334155">✓ 高性能 - 支持大并发,查询优化好</text>
<text x="340" y="205" font-size="15" fill="#334155">✓ 多引擎 - InnoDB(事务)、MyISAM(读)</text>
<text x="340" y="235" font-size="15" fill="#334155">✓ 跨平台 - Linux/Windows/macOS</text>
<text x="340" y="265" font-size="15" fill="#334155">✓ 主从复制 - 读写分离、高可用</text>
<text x="340" y="295" font-size="15" fill="#334155">✓ 丰富类型 - 数值/字符串/日期/JSON</text>
</svg>

#### 关键要点

- **关系型** = 表格存储 + 表关系 + SQL操作
- **MySQL优势** = 开源 + 高性能 + 多引擎 + 跨平台
- **适用场景**: 结构化数据、事务要求高、关系复杂的业务系统

#### 记忆口诀

**"开(开源)高(高性能)多(多引擎)跨(跨平台)主(主从复制)"** - MySQL五大特点

2. MySQL 有哪些存储引擎？InnoDB 和 MyISAM 的区别是什么？

### 2. MySQL 有哪些存储引擎?InnoDB 和 MyISAM 的区别是什么?

#### 核心答案

**常见存储引擎**:InnoDB(默认)、MyISAM、Memory、Archive、CSV等。

**InnoDB vs MyISAM核心区别**:InnoDB支持事务和外键,使用行锁;MyISAM不支持事务,使用表锁,查询速度快。

#### 详细说明

**MySQL常见存储引擎**:

| 存储引擎 | 特点 | 适用场景 |
|---------|------|---------|
| **InnoDB** | 支持事务、外键、行锁、MVCC | 高并发写、事务要求高 |
| **MyISAM** | 不支持事务、表锁、查询快 | 读多写少、无事务要求 |
| **Memory** | 数据存在内存、速度极快 | 临时表、缓存 |
| **Archive** | 高压缩比、只支持插入和查询 | 日志归档、历史数据 |
| **CSV** | 以CSV格式存储 | 数据导入导出 |

**InnoDB和MyISAM对比**:

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">InnoDB vs MyISAM 对比</text>
<rect x="50" y="60" width="380" height="420" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="10"/>
<text x="240" y="90" text-anchor="middle" font-size="20" font-weight="bold" fill="#1e40af">InnoDB (默认引擎)</text>
<text x="70" y="130" font-size="16" fill="#1e293b" font-weight="bold">✓ 核心特性:</text>
<text x="90" y="160" font-size="15" fill="#334155">• 支持事务 (ACID)</text>
<text x="90" y="190" font-size="15" fill="#334155">• 支持外键约束</text>
<text x="90" y="220" font-size="15" fill="#334155">• 支持行级锁</text>
<text x="90" y="250" font-size="15" fill="#334155">• 支持 MVCC</text>
<text x="90" y="280" font-size="15" fill="#334155">• 支持崩溃恢复</text>
<text x="70" y="320" font-size="16" fill="#1e293b" font-weight="bold">📁 存储方式:</text>
<text x="90" y="350" font-size="15" fill="#334155">• .ibd 文件(表空间)</text>
<text x="90" y="380" font-size="15" fill="#334155">• 聚簇索引存储</text>
<text x="70" y="420" font-size="16" fill="#1e293b" font-weight="bold">🎯 适用场景:</text>
<text x="90" y="450" font-size="15" fill="#334155">• 高并发写入</text>
<text x="90" y="470" font-size="15" fill="#059669">• 事务要求高的系统</text>
<rect x="470" y="60" width="380" height="420" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="10"/>
<text x="660" y="90" text-anchor="middle" font-size="20" font-weight="bold" fill="#d97706">MyISAM (旧版默认)</text>
<text x="490" y="130" font-size="16" fill="#1e293b" font-weight="bold">✗ 核心特性:</text>
<text x="510" y="160" font-size="15" fill="#334155">• 不支持事务</text>
<text x="510" y="190" font-size="15" fill="#334155">• 不支持外键</text>
<text x="510" y="220" font-size="15" fill="#334155">• 仅支持表级锁</text>
<text x="510" y="250" font-size="15" fill="#334155">• 查询速度快</text>
<text x="510" y="280" font-size="15" fill="#334155">• 占用空间小</text>
<text x="490" y="320" font-size="16" fill="#1e293b" font-weight="bold">📁 存储方式:</text>
<text x="510" y="350" font-size="15" fill="#334155">• .MYD (数据)</text>
<text x="510" y="380" font-size="15" fill="#334155">• .MYI (索引)</text>
<text x="490" y="420" font-size="16" fill="#1e293b" font-weight="bold">🎯 适用场景:</text>
<text x="510" y="450" font-size="15" fill="#334155">• 读多写少</text>
<text x="510" y="470" font-size="15" fill="#dc2626">• 无事务要求</text>
</svg>

**详细对比表**:

| 对比维度 | InnoDB | MyISAM |
|---------|--------|--------|
| **事务支持** | ✅ 支持ACID事务 | ❌ 不支持 |
| **外键约束** | ✅ 支持 | ❌ 不支持 |
| **锁粒度** | 行锁(并发高) | 表锁(并发低) |
| **崩溃恢复** | ✅ 自动恢复 | ❌ 可能损坏 |
| **MVCC** | ✅ 支持 | ❌ 不支持 |
| **全文索引** | ✅ 5.6+支持 | ✅ 支持 |
| **存储空间** | 较大 | 较小 |
| **查询性能** | 中等 | 快(无事务开销) |
| **写入性能** | 高(行锁) | 低(表锁) |
| **COUNT(*)** | 需扫描 | 直接返回 |

#### 关键要点

- **InnoDB = 事务 + 行锁 + 外键 + MVCC** → 现代应用首选
- **MyISAM = 快速读取 + 表锁 + 无事务** → 日志、只读场景
- **MySQL 5.5+默认InnoDB**,除非特殊需求否则使用InnoDB

#### 记忆口诀

**"InnoDB 事外行"** - 事务、外键、行锁
**"MyISAM 快表无"** - 快速查询、表锁、无事务

3. 什么是主键、外键、唯一索引？

### 3. 什么是主键、外键、唯一索引?

#### 核心答案

- **主键(Primary Key)**: 唯一标识表中每一行的列,不能为NULL,一个表只能有一个主键
- **外键(Foreign Key)**: 用于建立表与表之间关系的列,引用另一个表的主键
- **唯一索引(Unique Index)**: 保证列值唯一性的索引,允许NULL值,一个表可以有多个

#### 详细说明

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">主键、外键、唯一索引关系图</text>
<rect x="50" y="80" width="350" height="200" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="8"/>
<text x="225" y="105" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e40af">用户表 (users)</text>
<line x1="70" y1="115" x2="380" y2="115" stroke="#2563eb" stroke-width="2"/>
<text x="80" y="140" font-size="14" fill="#1e293b" font-weight="bold">user_id (主键 🔑)</text>
<rect x="250" y="125" width="120" height="22" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="4"/>
<text x="310" y="141" text-anchor="middle" font-size="13" fill="#78350f">NOT NULL, UNIQUE</text>
<text x="80" y="170" font-size="14" fill="#334155">name</text>
<text x="80" y="200" font-size="14" fill="#334155">email</text>
<rect x="250" y="185" width="120" height="22" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="4"/>
<text x="310" y="201" text-anchor="middle" font-size="13" fill="#4338ca">UNIQUE (唯一索引)</text>
<text x="80" y="230" font-size="14" fill="#334155">phone</text>
<text x="80" y="260" font-size="14" fill="#334155">created_at</text>
<rect x="500" y="80" width="350" height="220" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="8"/>
<text x="675" y="105" text-anchor="middle" font-size="18" font-weight="bold" fill="#be185d">订单表 (orders)</text>
<line x1="520" y1="115" x2="830" y2="115" stroke="#ec4899" stroke-width="2"/>
<text x="530" y="140" font-size="14" fill="#1e293b" font-weight="bold">order_id (主键 🔑)</text>
<rect x="700" y="125" width="120" height="22" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="4"/>
<text x="760" y="141" text-anchor="middle" font-size="13" fill="#78350f">NOT NULL, UNIQUE</text>
<text x="530" y="170" font-size="14" fill="#1e293b" font-weight="bold">user_id (外键 🔗)</text>
<rect x="700" y="155" width="120" height="22" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="4"/>
<text x="760" y="171" text-anchor="middle" font-size="13" fill="#166534">REFERENCES users</text>
<text x="530" y="200" font-size="14" fill="#334155">order_no</text>
<rect x="700" y="185" width="120" height="22" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="4"/>
<text x="760" y="201" text-anchor="middle" font-size="13" fill="#4338ca">UNIQUE (唯一索引)</text>
<text x="530" y="230" font-size="14" fill="#334155">amount</text>
<text x="530" y="260" font-size="14" fill="#334155">status</text>
<text x="530" y="290" font-size="14" fill="#334155">created_at</text>
<path d="M 400 170 L 500 170" stroke="#22c55e" stroke-width="3" marker-end="url(#arrowgreen)" fill="none"/>
<defs><marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#22c55e"/></marker></defs>
<text x="450" y="155" text-anchor="middle" font-size="14" fill="#166534" font-weight="bold">外键关联</text>
<rect x="100" y="350" width="250" height="220" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="225" y="375" text-anchor="middle" font-size="18" font-weight="bold" fill="#d97706">主键 (Primary Key)</text>
<text x="120" y="405" font-size="14" fill="#334155">✓ 唯一标识每一行</text>
<text x="120" y="435" font-size="14" fill="#334155">✓ 不能为 NULL</text>
<text x="120" y="465" font-size="14" fill="#334155">✓ 一个表只能有一个</text>
<text x="120" y="495" font-size="14" fill="#334155">✓ 自动创建唯一索引</text>
<text x="120" y="525" font-size="14" fill="#334155">✓ 常用自增 ID</text>
<text x="120" y="555" font-size="13" fill="#78350f" font-style="italic">PRIMARY KEY (id)</text>
<rect x="400" y="350" width="250" height="220" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="8"/>
<text x="525" y="375" text-anchor="middle" font-size="18" font-weight="bold" fill="#15803d">外键 (Foreign Key)</text>
<text x="420" y="405" font-size="14" fill="#334155">✓ 建立表关系</text>
<text x="420" y="435" font-size="14" fill="#334155">✓ 引用另一表主键</text>
<text x="420" y="465" font-size="14" fill="#334155">✓ 保证参照完整性</text>
<text x="420" y="495" font-size="14" fill="#334155">✓ 可以为 NULL</text>
<text x="420" y="525" font-size="14" fill="#334155">✓ 级联更新/删除</text>
<text x="420" y="555" font-size="13" fill="#166534" font-style="italic">FOREIGN KEY (user_id)</text>
<rect x="700" y="350" width="250" height="220" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="8"/>
<text x="825" y="375" text-anchor="middle" font-size="18" font-weight="bold" fill="#4f46e5">唯一索引 (Unique)</text>
<text x="720" y="405" font-size="14" fill="#334155">✓ 保证列值唯一</text>
<text x="720" y="435" font-size="14" fill="#334155">✓ 允许 NULL 值</text>
<text x="720" y="465" font-size="14" fill="#334155">✓ 一个表可多个</text>
<text x="720" y="495" font-size="14" fill="#334155">✓ 加速查询</text>
<text x="720" y="525" font-size="14" fill="#334155">✓ 常用于 email</text>
<text x="720" y="555" font-size="13" fill="#4338ca" font-style="italic">UNIQUE INDEX (email)</text>
</svg>

**主键特点**:
- 唯一性:每行的主键值必须唯一
- 非空性:主键列不能为NULL
- 唯一性:一个表只能定义一个主键
- 自动索引:主键自动创建唯一索引
- 常见类型:自增ID、UUID、业务主键

**外键特点**:
- 关联性:引用父表的主键或唯一键
- 完整性:保证数据的参照完整性
- 级联操作:支持级联更新/删除
- 可为NULL:外键可以为NULL(表示无关联)
- 性能影响:会影响插入/更新/删除性能

**唯一索引特点**:
- 唯一性:列值不能重复
- 允许NULL:可以有多个NULL值
- 多个唯一索引:一个表可以有多个
- 加速查询:既保证唯一性又提升查询性能
- 常见场景:email、手机号、身份证号等

**三者对比**:

| 特性 | 主键 | 唯一索引 | 外键 |
|-----|------|---------|------|
| **唯一性** | ✅ 必须唯一 | ✅ 必须唯一 | ❌ 可重复 |
| **NULL值** | ❌ 不允许 | ✅ 允许多个NULL | ✅ 允许NULL |
| **数量** | 1个 | 多个 | 多个 |
| **作用** | 标识行 | 保证唯一 | 建立关系 |
| **自动索引** | ✅ 是 | ✅ 是 | ✅ 是(建议) |

#### 关键要点

- **主键 = 唯一 + 非空 + 一个** → 表的身份证
- **外键 = 关联 + 完整性** → 表之间的桥梁
- **唯一索引 = 唯一 + 允许NULL + 多个** → 业务唯一性约束

#### 记忆口诀

**"主唯一非空,外关联完整,唯多个可空"**
- 主键:唯一+非空
- 外键:关联+完整性
- 唯一索引:多个+可NULL

4. MySQL 中的数据类型有哪些？CHAR 和 VARCHAR 的区别是什么？

### 4. MySQL中的数据类型有哪些?CHAR和VARCHAR的区别是什么?

#### 核心答案

**MySQL数据类型**分为:数值型(INT、BIGINT、DECIMAL)、字符串型(CHAR、VARCHAR、TEXT)、日期时间型(DATE、DATETIME、TIMESTAMP)、二进制型(BLOB)、JSON型。

**CHAR vs VARCHAR**:CHAR定长存储,不足补空格,最大255字符;VARCHAR变长存储,按实际长度,最大65535字节。

#### 详细说明

**MySQL数据类型分类**:

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">MySQL 数据类型全景</text>
<rect x="50" y="70" width="200" height="200" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="8"/>
<text x="150" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e40af">数值型</text>
<text x="70" y="125" font-size="14" fill="#334155">整数:</text>
<text x="80" y="150" font-size="13" fill="#475569">• TINYINT (1字节)</text>
<text x="80" y="170" font-size="13" fill="#475569">• INT (4字节)</text>
<text x="80" y="190" font-size="13" fill="#475569">• BIGINT (8字节)</text>
<text x="70" y="220" font-size="14" fill="#334155">小数:</text>
<text x="80" y="240" font-size="13" fill="#475569">• FLOAT (4字节)</text>
<text x="80" y="260" font-size="13" fill="#475569">• DECIMAL (精确)</text>
<rect x="270" y="70" width="200" height="200" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="8"/>
<text x="370" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#be185d">字符串型</text>
<text x="280" y="125" font-size="13" fill="#475569">• CHAR (定长)</text>
<text x="280" y="150" font-size="13" fill="#475569">• VARCHAR (变长)</text>
<text x="280" y="175" font-size="13" fill="#475569">• TEXT (长文本)</text>
<text x="280" y="200" font-size="13" fill="#475569">• TINYTEXT (255B)</text>
<text x="280" y="225" font-size="13" fill="#475569">• MEDIUMTEXT (16MB)</text>
<text x="280" y="250" font-size="13" fill="#475569">• LONGTEXT (4GB)</text>
<rect x="490" y="70" width="200" height="200" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="590" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#d97706">日期时间型</text>
<text x="500" y="125" font-size="13" fill="#475569">• DATE (日期)</text>
<text x="500" y="150" font-size="13" fill="#475569">• TIME (时间)</text>
<text x="500" y="175" font-size="13" fill="#475569">• DATETIME</text>
<text x="500" y="200" font-size="13" fill="#475569">• TIMESTAMP</text>
<text x="500" y="225" font-size="13" fill="#475569">• YEAR (年份)</text>
<rect x="710" y="70" width="160" height="200" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="8"/>
<text x="790" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#15803d">其他类型</text>
<text x="720" y="125" font-size="13" fill="#475569">• BLOB (二进制)</text>
<text x="720" y="150" font-size="13" fill="#475569">• ENUM (枚举)</text>
<text x="720" y="175" font-size="13" fill="#475569">• SET (集合)</text>
<text x="720" y="200" font-size="13" fill="#475569">• JSON</text>
<rect x="100" y="320" width="350" height="200" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="8"/>
<text x="275" y="345" text-anchor="middle" font-size="18" font-weight="bold" fill="#4f46e5">CHAR (定长)</text>
<text x="120" y="375" font-size="14" fill="#334155">✓ 固定长度存储</text>
<text x="120" y="400" font-size="14" fill="#334155">✓ 不足补空格</text>
<text x="120" y="425" font-size="14" fill="#334155">✓ 最大255字符</text>
<text x="120" y="450" font-size="14" fill="#334155">✓ 查询速度快</text>
<text x="120" y="475" font-size="14" fill="#334155">✓ 空间固定</text>
<text x="120" y="500" font-size="13" fill="#4338ca" font-style="italic">适用: 长度固定(MD5、手机号)</text>
<rect x="470" y="320" width="350" height="200" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="645" y="345" text-anchor="middle" font-size="18" font-weight="bold" fill="#d97706">VARCHAR (变长)</text>
<text x="490" y="375" font-size="14" fill="#334155">✓ 变长存储</text>
<text x="490" y="400" font-size="14" fill="#334155">✓ 按实际长度</text>
<text x="490" y="425" font-size="14" fill="#334155">✓ 最大65535字节</text>
<text x="490" y="450" font-size="14" fill="#334155">✓ 节省空间</text>
<text x="490" y="475" font-size="14" fill="#334155">✓ 需1-2字节存长度</text>
<text x="490" y="500" font-size="13" fill="#78350f" font-style="italic">适用: 长度变化(姓名、地址)</text>
</svg>

**CHAR vs VARCHAR 对比**:

| 对比维度 | CHAR | VARCHAR |
|---------|------|---------|
| **存储方式** | 定长,不足补空格 | 变长,按实际长度 |
| **最大长度** | 255字符 | 65535字节 |
| **额外空间** | 无 | 1-2字节(存长度) |
| **性能** | 查询快(固定位置) | 略慢(需计算位置) |
| **空间利用** | 浪费空间 | 节省空间 |
| **适用场景** | 长度固定的数据 | 长度变化的数据 |
| **示例** | MD5(32)、手机号(11) | 姓名、地址、描述 |

**存储示例**:

```sql
-- CHAR(10) 存储 "abc" 实际占用10字节: "abc       " (补7个空格)
-- VARCHAR(10) 存储 "abc" 实际占用4字节: 1字节长度 + 3字节数据
```

**常见数值类型**:

| 类型 | 字节 | 范围 | 说明 |
|-----|------|-----|------|
| **TINYINT** | 1 | -128~127 / 0~255 | 小整数 |
| **INT** | 4 | -21亿~21亿 | 常用整数 |
| **BIGINT** | 8 | 非常大 | 大整数,ID |
| **DECIMAL(M,D)** | 变长 | 精确小数 | 金额 |
| **FLOAT** | 4 | 近似小数 | 科学计数 |

**日期时间类型**:

| 类型 | 格式 | 范围 | 说明 |
|-----|------|-----|------|
| **DATE** | YYYY-MM-DD | 1000~9999 | 只存日期 |
| **TIME** | HH:MM:SS | -838~838小时 | 只存时间 |
| **DATETIME** | YYYY-MM-DD HH:MM:SS | 1000~9999 | 日期+时间 |
| **TIMESTAMP** | 同上 | 1970~2038 | 自动更新,时区 |

**DATETIME vs TIMESTAMP**:
- DATETIME:8字节,不受时区影响,范围更大
- TIMESTAMP:4字节,受时区影响,自动更新,范围小

#### 关键要点

- **CHAR = 定长 + 快 + 浪费空间** → 适合固定长度
- **VARCHAR = 变长 + 省空间 + 略慢** → 适合变化长度
- **选择原则**:长度固定用CHAR,变化用VARCHAR
- **金额用DECIMAL**,避免精度丢失
- **时间戳优选TIMESTAMP**(自动更新)

#### 记忆口诀

**"CHAR定快浪,VARCHAR变省慢"**
- CHAR:定长、快、浪费空间
- VARCHAR:变长、省空间、略慢

**"数字串日二JSON"** - MySQL六大数据类型分类

5. 什么是 NULL 值？如何处理 NULL 值？

### 5. 什么是NULL值?如何处理NULL值?

#### 核心答案

**NULL**表示"未知"或"不存在",不等于0或空字符串。

**处理方法**:使用`IS NULL`/`IS NOT NULL`判断,`IFNULL()`/`COALESCE()`转换,尽量避免NULL列(影响索引和性能)。

#### 详细说明

**NULL的特点**:

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">NULL 值的特点与处理</text>
<rect x="50" y="70" width="380" height="180" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="8"/>
<text x="240" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#b91c1c">NULL 常见误区 ❌</text>
<text x="70" y="125" font-size="15" fill="#334155">✗ NULL ≠ 0</text>
<text x="70" y="150" font-size="15" fill="#334155">✗ NULL ≠ 空字符串 ''</text>
<text x="70" y="175" font-size="15" fill="#334155">✗ NULL = NULL 结果不是 TRUE</text>
<text x="70" y="200" font-size="15" fill="#334155">✗ 任何值与 NULL 运算结果都是 NULL</text>
<text x="70" y="225" font-size="15" fill="#334155">✗ COUNT(column) 不统计 NULL</text>
<rect x="470" y="70" width="380" height="180" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="8"/>
<text x="660" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#15803d">正确处理 ✓</text>
<text x="490" y="125" font-size="15" fill="#334155">✓ 使用 IS NULL 判断</text>
<text x="490" y="150" font-size="15" fill="#334155">✓ 使用 IS NOT NULL 判断</text>
<text x="490" y="175" font-size="15" fill="#334155">✓ 使用 IFNULL(col, default) 转换</text>
<text x="490" y="200" font-size="15" fill="#334155">✓ 使用 COALESCE(col1, col2, ...) 返回首个非NULL</text>
<text x="490" y="225" font-size="15" fill="#334155">✓ 设计时尽量使用 NOT NULL + 默认值</text>
<rect x="50" y="280" width="270" height="190" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="8"/>
<text x="185" y="305" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e40af">NULL 的影响</text>
<text x="70" y="335" font-size="14" fill="#334155">1. 索引问题:</text>
<text x="85" y="360" font-size="13" fill="#475569">• 普通索引可能不包含NULL</text>
<text x="85" y="380" font-size="13" fill="#475569">• IS NULL无法使用索引(部分)</text>
<text x="70" y="410" font-size="14" fill="#334155">2. 性能问题:</text>
<text x="85" y="435" font-size="13" fill="#475569">• 需要额外空间标记NULL</text>
<text x="85" y="455" font-size="13" fill="#475569">• 聚合函数需要特殊处理</text>
<rect x="350" y="280" width="500" height="190" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="600" y="305" text-anchor="middle" font-size="18" font-weight="bold" fill="#d97706">NULL 处理函数</text>
<text x="370" y="335" font-size="14" fill="#1e293b" font-weight="bold">IFNULL(expr, default)</text>
<text x="380" y="355" font-size="13" fill="#475569">如果 expr 为 NULL,返回 default</text>
<text x="370" y="385" font-size="14" fill="#1e293b" font-weight="bold">COALESCE(expr1, expr2, ...)</text>
<text x="380" y="405" font-size="13" fill="#475569">返回第一个非 NULL 值</text>
<text x="370" y="435" font-size="14" fill="#1e293b" font-weight="bold">NULLIF(expr1, expr2)</text>
<text x="380" y="455" font-size="13" fill="#475569">如果 expr1 = expr2,返回 NULL</text>
</svg>

**NULL的比较和运算**:

```sql
-- ❌ 错误用法
SELECT * FROM users WHERE name = NULL;        -- 永远返回空
SELECT * FROM users WHERE name != NULL;       -- 永远返回空

-- ✅ 正确用法
SELECT * FROM users WHERE name IS NULL;       -- 正确
SELECT * FROM users WHERE name IS NOT NULL;   -- 正确

-- NULL 的运算特性
SELECT 1 + NULL;           -- 结果: NULL
SELECT NULL = NULL;        -- 结果: NULL (不是TRUE)
SELECT NULL <=> NULL;      -- 结果: TRUE (安全等于)
SELECT COUNT(NULL);        -- 结果: 0
SELECT COUNT(*);           -- 统计所有行(包括NULL)
SELECT COUNT(column);      -- 不统计 NULL 行
```

**NULL处理函数示例**:

```sql
-- IFNULL: 如果为NULL则使用默认值
SELECT name, IFNULL(phone, '未填写') AS phone FROM users;

-- COALESCE: 返回第一个非NULL值
SELECT name, COALESCE(phone, mobile, '无联系方式') AS contact FROM users;

-- NULLIF: 如果两值相等则返回NULL
SELECT name, NULLIF(score, 0) AS score FROM students;  -- 0分显示为NULL

-- CASE WHEN 处理
SELECT name,
  CASE
    WHEN phone IS NULL THEN '未填写'
    ELSE phone
  END AS phone
FROM users;
```

**NULL对索引的影响**:

- **普通索引**:可以存储NULL值,但可能影响查询优化
- **唯一索引**:允许多个NULL值(NULL被认为互不相等)
- **NOT NULL约束**:不允许NULL,推荐使用

**最佳实践**:

1. **设计时避免NULL**
   - 使用`NOT NULL`约束
   - 提供合理的默认值
   - 0代替数值NULL,''代替字符串NULL

2. **必须使用NULL时**
   - 明确NULL的业务含义
   - 使用`IS NULL`判断
   - 使用`IFNULL()`提供默认值

3. **统计和聚合**
   - 注意`COUNT(column)`不统计NULL
   - 使用`COUNT(*)`统计所有行

#### 关键要点

- **NULL ≠ 任何值**(包括NULL本身)
- **判断NULL**:只能用`IS NULL`/`IS NOT NULL`
- **转换NULL**:`IFNULL()`、`COALESCE()`
- **最佳实践**:尽量使用`NOT NULL + 默认值`
- **NULL影响**:索引效率、统计准确性、存储空间

#### 记忆口诀

**"NULL非零非空非自等"** - NULL的三大特性
**"IS判断,IF转换,NOT避免"** - NULL的处理三步

## 索引

### 6. 什么是索引?索引的优缺点是什么?

#### 核心答案

**索引**是一种数据结构(B+树),用于快速查找数据,类似书的目录。

**优点**:加速查询、排序、分组。
**缺点**:占用空间、降低写入性能、需要维护。

#### 详细说明

**索引的本质**:

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">索引工作原理 (B+ 树)</text>
<rect x="350" y="60" width="200" height="40" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="5"/>
<text x="450" y="85" text-anchor="middle" font-size="16" fill="white" font-weight="bold">根节点 [15, 30]</text>
<rect x="150" y="130" width="150" height="40" fill="#8b5cf6" stroke="#6d28d9" stroke-width="2" rx="5"/>
<text x="225" y="155" text-anchor="middle" font-size="14" fill="white">[5, 10]</text>
<rect x="375" y="130" width="150" height="40" fill="#8b5cf6" stroke="#6d28d9" stroke-width="2" rx="5"/>
<text x="450" y="155" text-anchor="middle" font-size="14" fill="white">[20, 25]</text>
<rect x="600" y="130" width="150" height="40" fill="#8b5cf6" stroke="#6d28d9" stroke-width="2" rx="5"/>
<text x="675" y="155" text-anchor="middle" font-size="14" fill="white">[35, 40]</text>
<line x1="400" y1="100" x2="225" y2="130" stroke="#64748b" stroke-width="2"/>
<line x1="450" y1="100" x2="450" y2="130" stroke="#64748b" stroke-width="2"/>
<line x1="500" y1="100" x2="675" y2="130" stroke="#64748b" stroke-width="2"/>
<rect x="50" y="200" width="100" height="60" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="5"/>
<text x="100" y="220" text-anchor="middle" font-size="12" fill="#166534">叶子节点</text>
<text x="100" y="238" text-anchor="middle" font-size="11" fill="#334155">[1,2,3,4]</text>
<text x="100" y="252" text-anchor="middle" font-size="10" fill="#475569">→数据</text>
<rect x="170" y="200" width="100" height="60" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="5"/>
<text x="220" y="220" text-anchor="middle" font-size="12" fill="#166534">叶子节点</text>
<text x="220" y="238" text-anchor="middle" font-size="11" fill="#334155">[5,6,7,8]</text>
<text x="220" y="252" text-anchor="middle" font-size="10" fill="#475569">→数据</text>
<rect x="290" y="200" width="100" height="60" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="5"/>
<text x="340" y="220" text-anchor="middle" font-size="12" fill="#166534">叶子节点</text>
<text x="340" y="238" text-anchor="middle" font-size="11" fill="#334155">[10,11,12]</text>
<text x="340" y="252" text-anchor="middle" font-size="10" fill="#475569">→数据</text>
<line x1="150" y1="235" x2="170" y2="235" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowg)"/>
<line x1="270" y1="235" x2="290" y2="235" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowg)"/>
<defs><marker id="arrowg" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#22c55e"/></marker></defs>
<line x1="175" y1="170" x2="100" y2="200" stroke="#64748b" stroke-width="2"/>
<line x1="225" y1="170" x2="220" y2="200" stroke="#64748b" stroke-width="2"/>
<line x1="275" y1="170" x2="340" y2="200" stroke="#64748b" stroke-width="2"/>
<text x="100" y="290" font-size="13" fill="#334155" font-weight="bold">B+ 树特点:</text>
<text x="110" y="315" font-size="12" fill="#475569">• 多路平衡查找树</text>
<text x="110" y="335" font-size="12" fill="#475569">• 非叶子节点只存索引</text>
<text x="110" y="355" font-size="12" fill="#475569">• 叶子节点存数据/指针</text>
<text x="110" y="375" font-size="12" fill="#475569">• 叶子节点有序链表</text>
<text x="110" y="395" font-size="12" fill="#475569">• 查询效率O(log n)</text>
<rect x="450" y="280" width="400" height="200" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="650" y="305" text-anchor="middle" font-size="18" font-weight="bold" fill="#d97706">索引 vs 全表扫描</text>
<text x="470" y="335" font-size="14" fill="#1e293b" font-weight="bold">无索引 (全表扫描):</text>
<text x="480" y="360" font-size="13" fill="#475569">扫描100万行 → 慢 🐌</text>
<text x="470" y="395" font-size="14" fill="#1e293b" font-weight="bold">有索引 (B+树查找):</text>
<text x="480" y="420" font-size="13" fill="#059669">只需3-4层查找 → 快 ⚡</text>
<text x="470" y="450" font-size="14" fill="#059669" font-weight="bold">性能提升:</text>
<text x="480" y="470" font-size="13" fill="#dc2626">1,000,000 次 → 3-4 次</text>
</svg>

**索引的优点**:

1. **加速查询** - 通过B+树快速定位数据,避免全表扫描
2. **加速排序** - ORDER BY可直接利用索引顺序
3. **加速分组** - GROUP BY可利用索引
4. **唯一性约束** - 唯一索引保证数据唯一
5. **加速表连接** - JOIN时利用索引提升性能

**索引的缺点**:

1. **占用空间** - 索引本身需要存储空间(磁盘+内存)
2. **降低写性能** - INSERT/UPDATE/DELETE需要同步更新索引
3. **维护成本** - 数据变化时需要维护索引结构
4. **选择不当** - 错误的索引可能不被使用,浪费资源

**索引性能对比**:

| 操作 | 无索引 | 有索引 | 提升 |
|-----|-------|-------|------|
| **查询** | 全表扫描O(n) | B+树查找O(log n) | 1000倍+ |
| **排序** | 需排序O(nlogn) | 直接有序O(1) | 1000倍+ |
| **插入** | 快 | 慢(维护索引) | 降低20%-50% |
| **更新** | 快 | 慢(更新索引) | 降低20%-50% |
| **删除** | 快 | 慢(删除索引) | 降低20%-50% |

**何时使用索引**:

✅ **适合建索引**:
- 频繁作为WHERE条件的列
- 经常用于JOIN的列
- 经常用于ORDER BY/GROUP BY的列
- 区分度高的列(不同值多)
- 数据量大的表

❌ **不适合建索引**:
- 频繁更新的列
- 区分度低的列(如性别,只有两个值)
- 数据量小的表(全表扫描更快)
- 很少使用的列

#### 关键要点

- **索引 = 数据结构(B+树) = 书的目录**
- **优点**:查询快(O(log n)),排序快,分组快
- **缺点**:占空间,写入慢,需维护
- **权衡**:读多写少的场景适合索引
- **原则**:不是越多越好,要根据查询需求建立

#### 记忆口诀

**"查快写慢占空间"** - 索引的三大特性
**"WHERE JOIN ORDER BY"** - 索引使用三大场景

7. MySQL 有哪些索引类型？

### 7. MySQL有哪些索引类型?

#### 核心答案

**按数据结构**:B+树索引(默认)、Hash索引、Full-text索引。
**按物理存储**:聚簇索引、非聚簇索引。
**按逻辑功能**:普通索引、唯一索引、主键索引、联合索引、前缀索引。

#### 详细说明

**MySQL索引分类**:

| 分类维度 | 索引类型 | 说明 |
|---------|---------|------|
| **数据结构** | B+树索引 | 默认,适合范围查询 |
| | Hash索引 | Memory引擎,适合等值查询 |
| | Full-text索引 | 全文搜索 |
| **物理存储** | 聚簇索引 | InnoDB主键索引,数据和索引在一起 |
| | 非聚簇索引 | 二级索引,存储主键值 |
| **逻辑功能** | 普通索引 | 最基本的索引,无约束 |
| | 唯一索引 | 列值唯一,允许NULL |
| | 主键索引 | 特殊唯一索引,不允许NULL |
| | 联合索引 | 多列组合索引 |
| | 前缀索引 | 字符串前N个字符 |

**各类型详解**:

```sql
-- 1. 普通索引 (INDEX)
CREATE INDEX idx_name ON users(name);
ALTER TABLE users ADD INDEX idx_name(name);

-- 2. 唯一索引 (UNIQUE)
CREATE UNIQUE INDEX idx_email ON users(email);
ALTER TABLE users ADD UNIQUE INDEX idx_email(email);

-- 3. 主键索引 (PRIMARY KEY)
ALTER TABLE users ADD PRIMARY KEY(id);

-- 4. 联合索引 (多列)
CREATE INDEX idx_name_age ON users(name, age);

-- 5. 前缀索引 (字符串前N个字符)
CREATE INDEX idx_name_prefix ON users(name(10));

-- 6. 全文索引 (FULLTEXT)
CREATE FULLTEXT INDEX idx_content ON articles(content);
```

**B+树 vs Hash索引**:

| 对比 | B+树索引 | Hash索引 |
|-----|---------|---------|
| **等值查询** | 快 | 非常快O(1) |
| **范围查询** | ✅ 支持 | ❌ 不支持 |
| **排序** | ✅ 支持 | ❌ 不支持 |
| **最左前缀** | ✅ 支持 | ❌ 不支持 |
| **内存占用** | 较大 | 较小 |
| **应用** | 默认,广泛使用 | Memory引擎 |

#### 关键要点

- **默认B+树**:适合范围查询、排序
- **Hash索引**:等值查询快,但不支持范围和排序
- **主键索引**:聚簇索引,数据和索引在一起
- **联合索引**:多列组合,遵循最左前缀
- **全文索引**:用于LIKE '%keyword%'的优化

#### 记忆口诀

**"树哈全"** - B+树、Hash、全文三种数据结构
**"普唯主联前"** - 普通、唯一、主键、联合、前缀五种功能

8. 什么是聚簇索引和非聚簇索引？

### 8. 什么是聚簇索引和非聚簇索引?

#### 核心答案

**聚簇索引**(Clustered Index):数据和索引存储在一起,InnoDB的主键索引就是聚簇索引,叶子节点存储完整数据行。

**非聚簇索引**(Secondary Index):索引和数据分开,叶子节点存储主键值,查询时需回表。

#### 详细说明

<svg viewBox="0 0 900 480" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">聚簇索引 vs 非聚簇索引</text>
<rect x="50" y="60" width="380" height="390" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="8"/>
<text x="240" y="90" text-anchor="middle" font-size="20" font-weight="bold" fill="#1e40af">聚簇索引 (主键)</text>
<rect x="140" y="110" width="200" height="40" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="5"/>
<text x="240" y="135" text-anchor="middle" font-size="14" fill="white">主键 [10, 20, 30]</text>
<rect x="80" y="180" width="140" height="80" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="5"/>
<text x="150" y="205" text-anchor="middle" font-size="13" fill="#166534" font-weight="bold">ID=5</text>
<text x="150" y="225" text-anchor="middle" font-size="11" fill="#334155">name: Alice</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#334155">age: 25</text>
<text x="150" y="255" text-anchor="middle" font-size="11" fill="#475569">完整数据行</text>
<rect x="240" y="180" width="140" height="80" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="5"/>
<text x="310" y="205" text-anchor="middle" font-size="13" fill="#166534" font-weight="bold">ID=15</text>
<text x="310" y="225" text-anchor="middle" font-size="11" fill="#334155">name: Bob</text>
<text x="310" y="240" text-anchor="middle" font-size="11" fill="#334155">age: 30</text>
<text x="310" y="255" text-anchor="middle" font-size="11" fill="#475569">完整数据行</text>
<line x1="200" y1="150" x2="150" y2="180" stroke="#64748b" stroke-width="2"/>
<line x1="280" y1="150" x2="310" y2="180" stroke="#64748b" stroke-width="2"/>
<text x="70" y="295" font-size="14" fill="#1e293b" font-weight="bold">特点:</text>
<text x="80" y="320" font-size="13" fill="#334155">✓ 数据按主键顺序存储</text>
<text x="80" y="345" font-size="13" fill="#334155">✓ 叶子节点=完整数据</text>
<text x="80" y="370" font-size="13" fill="#334155">✓ 一个表只有一个</text>
<text x="80" y="395" font-size="13" fill="#334155">✓ 主键查询最快</text>
<text x="80" y="420" font-size="13" fill="#059669" font-weight="bold">✓ 无需回表</text>
<rect x="470" y="60" width="380" height="390" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="660" y="90" text-anchor="middle" font-size="20" font-weight="bold" fill="#d97706">非聚簇索引 (二级索引)</text>
<rect x="560" y="110" width="200" height="40" fill="#f59e0b" stroke="#d97706" stroke-width="2" rx="5"/>
<text x="660" y="135" text-anchor="middle" font-size="14" fill="white">索引 (name)</text>
<rect x="500" y="180" width="140" height="60" fill="#fecaca" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="570" y="205" text-anchor="middle" font-size="13" fill="#7f1d1d" font-weight="bold">name: Alice</text>
<text x="570" y="225" text-anchor="middle" font-size="11" fill="#991b1b">主键: 5</text>
<rect x="660" y="180" width="140" height="60" fill="#fecaca" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="730" y="205" text-anchor="middle" font-size="13" fill="#7f1d1d" font-weight="bold">name: Bob</text>
<text x="730" y="225" text-anchor="middle" font-size="11" fill="#991b1b">主键: 15</text>
<line x1="620" y1="150" x2="570" y2="180" stroke="#64748b" stroke-width="2"/>
<line x1="700" y1="150" x2="730" y2="180" stroke="#64748b" stroke-width="2"/>
<path d="M 570 240 Q 570 280, 350 280 Q 150 280, 150 260" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowr)" fill="none"/>
<defs><marker id="arrowr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#dc2626"/></marker></defs>
<text x="360" y="295" text-anchor="middle" font-size="12" fill="#dc2626" font-weight="bold">回表查询</text>
<text x="490" y="330" font-size="14" fill="#1e293b" font-weight="bold">特点:</text>
<text x="500" y="355" font-size="13" fill="#334155">✓ 索引和数据分离</text>
<text x="500" y="380" font-size="13" fill="#334155">✓ 叶子节点=主键值</text>
<text x="500" y="405" font-size="13" fill="#334155">✓ 一个表可多个</text>
<text x="500" y="430" font-size="13" fill="#dc2626" font-weight="bold">✗ 需要回表(慢)</text>
</svg>

**聚簇索引 vs 非聚簇索引对比**:

| 对比维度 | 聚簇索引 | 非聚簇索引 |
|---------|---------|-----------|
| **存储** | 数据和索引一起 | 数据和索引分开 |
| **叶子节点** | 完整数据行 | 主键值 |
| **数量** | 一个表只有一个 | 一个表可有多个 |
| **InnoDB** | 主键索引 | 其他索引 |
| **回表** | 不需要 | 需要(先查索引,再查主键) |
| **性能** | 查询快 | 比聚簇索引慢 |
| **适用** | 主键查询 | 非主键查询 |

**查询过程对比**:

```sql
-- 聚簇索引查询 (主键)
SELECT * FROM users WHERE id = 10;
-- 过程: 通过主键索引直接找到数据 → 1次IO

-- 非聚簇索引查询 (普通列)
SELECT * FROM users WHERE name = 'Alice';
-- 过程:
-- 1. 通过name索引找到主键id=5 → 1次IO
-- 2. 通过主键索引找到完整数据 → 1次IO (回表)
-- 总共: 2次IO
```

**InnoDB的聚簇索引规则**:

1. 如果定义了主键,主键就是聚簇索引
2. 如果没有主键,选择第一个NOT NULL唯一索引
3. 如果都没有,InnoDB隐式创建一个ROWID作为聚簇索引

#### 关键要点

- **聚簇索引 = 数据和索引一体 = 主键索引 = 快**
- **非聚簇索引 = 数据和索引分离 = 二级索引 = 需回表**
- **回表**:先查二级索引得主键,再查主键索引得数据
- **优化**:覆盖索引可避免回表(索引已包含所需列)
- **InnoDB必有聚簇索引**,MyISAM全是非聚簇索引

#### 记忆口诀

**"聚一快,非多慢回"**
- 聚簇:一个、快、不回表
- 非聚簇:多个、慢、需回表

9. 什么是联合索引？最左前缀原则是什么？

### 9. 什么是联合索引?最左前缀原则是什么?

#### 核心答案

**联合索引**(复合索引):对多个列建立的索引,如`INDEX(a, b, c)`。

**最左前缀原则**:查询时必须包含索引最左边的列才能使用索引,如`(a,b,c)`索引可用于`a`、`a,b`、`a,b,c`,但不能用于`b`、`c`、`b,c`。

#### 详细说明

<svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">联合索引与最左前缀原则</text>
<rect x="50" y="60" width="800" height="80" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="8"/>
<text x="450" y="85" text-anchor="middle" font-size="18" fill="#1e40af" font-weight="bold">联合索引: INDEX(name, age, city)</text>
<text x="70" y="115" font-size="14" fill="#334155">索引排序规则: 先按 name 排序,name 相同再按 age 排序,age 相同再按 city 排序</text>
<rect x="50" y="160" width="250" height="330" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="8"/>
<text x="175" y="185" text-anchor="middle" font-size="18" fill="#15803d" font-weight="bold">✅ 可以使用索引</text>
<text x="70" y="220" font-size="14" fill="#166534" font-weight="bold">1. WHERE name = 'Alice'</text>
<text x="80" y="240" font-size="12" fill="#475569">→ 使用 (name)</text>
<text x="70" y="270" font-size="14" fill="#166534" font-weight="bold">2. WHERE name = 'Alice'</text>
<text x="80" y="290" font-size="14" fill="#166534" font-weight="bold">   AND age = 25</text>
<text x="80" y="310" font-size="12" fill="#475569">→ 使用 (name, age)</text>
<text x="70" y="340" font-size="14" fill="#166534" font-weight="bold">3. WHERE name = 'Alice'</text>
<text x="80" y="360" font-size="14" fill="#166534" font-weight="bold">   AND age = 25</text>
<text x="80" y="380" font-size="14" fill="#166534" font-weight="bold">   AND city = 'Beijing'</text>
<text x="80" y="400" font-size="12" fill="#475569">→ 使用 (name, age, city)</text>
<text x="70" y="430" font-size="14" fill="#166534" font-weight="bold">4. WHERE name = 'Alice'</text>
<text x="80" y="450" font-size="14" fill="#166534" font-weight="bold">   AND city = 'Beijing'</text>
<text x="80" y="470" font-size="12" fill="#475569">→ 使用 (name) 部分</text>
<rect x="330" y="160" width="250" height="330" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="8"/>
<text x="455" y="185" text-anchor="middle" font-size="18" fill="#b91c1c" font-weight="bold">❌ 不能使用索引</text>
<text x="350" y="220" font-size="14" fill="#7f1d1d" font-weight="bold">1. WHERE age = 25</text>
<text x="360" y="240" font-size="12" fill="#991b1b">→ 缺少最左列 name</text>
<text x="350" y="270" font-size="14" fill="#7f1d1d" font-weight="bold">2. WHERE city = 'Beijing'</text>
<text x="360" y="290" font-size="12" fill="#991b1b">→ 缺少最左列 name</text>
<text x="350" y="320" font-size="14" fill="#7f1d1d" font-weight="bold">3. WHERE age = 25</text>
<text x="360" y="340" font-size="14" fill="#7f1d1d" font-weight="bold">   AND city = 'Beijing'</text>
<text x="360" y="360" font-size="12" fill="#991b1b">→ 缺少最左列 name</text>
<text x="350" y="390" font-size="14" fill="#7f1d1d" font-weight="bold">4. WHERE name LIKE '%Alice'</text>
<text x="360" y="410" font-size="12" fill="#991b1b">→ 前缀模糊查询失效</text>
<rect x="610" y="160" width="240" height="330" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="730" y="185" text-anchor="middle" font-size="18" fill="#d97706" font-weight="bold">⚠️ 部分使用</text>
<text x="630" y="220" font-size="14" fill="#78350f" font-weight="bold">1. WHERE name > 'Alice'</text>
<text x="640" y="240" font-size="12" fill="#92400e">→ 范围查询后失效</text>
<text x="630" y="270" font-size="14" fill="#78350f" font-weight="bold">2. WHERE name = 'Alice'</text>
<text x="640" y="290" font-size="14" fill="#78350f" font-weight="bold">   AND age > 25</text>
<text x="640" y="310" font-size="14" fill="#78350f" font-weight="bold">   AND city = 'Beijing'</text>
<text x="640" y="330" font-size="12" fill="#92400e">→ (name, age) 有效</text>
<text x="640" y="350" font-size="12" fill="#92400e">→ city 无法使用</text>
<text x="630" y="380" font-size="14" fill="#78350f" font-weight="bold">3. ORDER BY name</text>
<text x="640" y="400" font-size="12" fill="#92400e">→ 可用索引排序</text>
<text x="630" y="430" font-size="14" fill="#78350f" font-weight="bold">4. ORDER BY age</text>
<text x="640" y="450" font-size="12" fill="#92400e">→ 不能用(缺name)</text>
</svg>

**最左前缀原则详解**:

假设联合索引`INDEX(a, b, c)`:

| 查询条件 | 是否使用索引 | 使用部分 |
|---------|------------|---------|
| `WHERE a=1` | ✅ 是 | (a) |
| `WHERE a=1 AND b=2` | ✅ 是 | (a,b) |
| `WHERE a=1 AND b=2 AND c=3` | ✅ 是 | (a,b,c) |
| `WHERE a=1 AND c=3` | ✅ 部分 | (a) |
| `WHERE b=2` | ❌ 否 | 无 |
| `WHERE c=3` | ❌ 否 | 无 |
| `WHERE b=2 AND c=3` | ❌ 否 | 无 |
| `WHERE a=1 AND b>2 AND c=3` | ⚠️ 部分 | (a,b),c失效 |

**为什么需要最左前缀?**

联合索引`(a,b,c)`的排序方式:
1. 先按`a`排序
2. `a`相同时按`b`排序
3. `a`和`b`都相同时按`c`排序

如果查询条件跳过了`a`,就无法利用这个排序结构。

**联合索引设计原则**:

1. **区分度高的列放最左**:让索引更有效
2. **常用查询列放最左**:满足大多数查询
3. **范围查询放最后**:避免后续列失效
4. **考虑查询覆盖**:尽量包含查询所需列

**实战示例**:

```sql
-- 创建联合索引
CREATE INDEX idx_name_age_city ON users(name, age, city);

-- ✅ 使用索引
SELECT * FROM users WHERE name = 'Alice';
SELECT * FROM users WHERE name = 'Alice' AND age = 25;
SELECT * FROM users WHERE name = 'Alice' AND age = 25 AND city = 'Beijing';

-- ❌ 不使用索引
SELECT * FROM users WHERE age = 25;
SELECT * FROM users WHERE city = 'Beijing';

-- ⚠️ 部分使用
SELECT * FROM users WHERE name = 'Alice' AND city = 'Beijing';  -- 只用到name
SELECT * FROM users WHERE name > 'Alice' AND age = 25;  -- 只用到name

-- 优化技巧: 调整WHERE顺序(MySQL会自动优化)
SELECT * FROM users WHERE age = 25 AND name = 'Alice';  -- 实际会用到索引
```

**索引顺序优化**:

```sql
-- 不好的设计
INDEX(city, age, name)  -- city区分度低

-- 好的设计
INDEX(name, age, city)  -- name区分度高,常用查询

-- 如果经常这样查询
WHERE name = ? AND age > ? AND city = ?

-- 应该设计为
INDEX(name, city, age)  -- 将范围查询的age放最后
```

#### 关键要点

- **联合索引**:多列组合,按顺序排序
- **最左前缀**:必须包含最左列才能用索引
- **范围查询**:范围条件后的列索引失效
- **优化原则**:区分度高的、常用的、等值查询的放前面
- **MySQL优化器**:会自动调整WHERE条件顺序

#### 记忆口诀

**"联合有序,最左必须,范围终止"**
- 联合索引按列顺序排序
- 最左列必须出现才能用索引
- 范围查询后的列索引失效

10. 什么情况下索引会失效？

### 10. 什么情况下索引会失效?

#### 核心答案

**索引失效的常见情况**:
1. 违反最左前缀原则
2. 在索引列上使用函数或计算
3. 使用`!=`、`<>`、`NOT IN`
4. LIKE以`%`开头
5. 类型隐式转换
6. OR连接的条件有非索引列

#### 详细说明

**索引失效的7大场景**:

| 场景 | 示例 | 原因 |
|-----|------|------|
| **1. 违反最左前缀** | `WHERE b=1` (索引是a,b) | 缺少最左列 |
| **2. 索引列函数** | `WHERE YEAR(date)=2024` | 破坏索引结构 |
| **3. 索引列计算** | `WHERE age+1=26` | 无法定位索引 |
| **4. 不等于** | `WHERE age != 25` | 范围太大 |
| **5. LIKE前缀%** | `WHERE name LIKE '%abc'` | 无法定位起始位置 |
| **6. 类型转换** | `WHERE id='123'` (id是int) | 需转换再比较 |
| **7. OR非索引列** | `WHERE a=1 OR c=3` (c无索引) | 必须全表扫描 |

**详细案例**:

```sql
-- 假设有索引: INDEX(name), INDEX(age), INDEX(name, age)

-- ❌ 1. 违反最左前缀
SELECT * FROM users WHERE age = 25;  -- 只有联合索引(name,age),不能用

-- ❌ 2. 在索引列上使用函数
SELECT * FROM users WHERE YEAR(create_time) = 2024;  -- 失效
-- ✅ 改为
SELECT * FROM users WHERE create_time >= '2024-01-01'
  AND create_time < '2025-01-01';

-- ❌ 3. 在索引列上计算
SELECT * FROM users WHERE age + 1 = 26;  -- 失效
-- ✅ 改为
SELECT * FROM users WHERE age = 25;

-- ❌ 4. 使用 !=、<>、NOT IN
SELECT * FROM users WHERE age != 25;  -- 可能失效(优化器决定)
SELECT * FROM users WHERE age <> 25;  -- 可能失效
SELECT * FROM users WHERE age NOT IN (25, 26);  -- 可能失效
-- ✅ 改为
SELECT * FROM users WHERE age < 25 OR age > 25;

-- ❌ 5. LIKE 以 % 开头
SELECT * FROM users WHERE name LIKE '%Alice';  -- 失效
-- ✅ 改为
SELECT * FROM users WHERE name LIKE 'Alice%';  -- 有效

-- ❌ 6. 隐式类型转换
-- id是INT类型
SELECT * FROM users WHERE id = '123';  -- 失效,实际执行 CAST(id AS CHAR) = '123'
-- ✅ 改为
SELECT * FROM users WHERE id = 123;

-- name是VARCHAR类型
SELECT * FROM users WHERE name = 123;  -- 失效,MySQL会转换字符串
-- ✅ 改为
SELECT * FROM users WHERE name = '123';

-- ❌ 7. OR 连接的条件有非索引列
SELECT * FROM users WHERE name = 'Alice' OR phone = '123';  -- phone无索引,失效
-- ✅ 改为 (如果phone也有索引)
SELECT * FROM users WHERE name = 'Alice'
UNION
SELECT * FROM users WHERE phone = '123';

-- ⚠️ 8. IS NULL 可能失效
SELECT * FROM users WHERE name IS NULL;  -- 可能用索引,取决于NULL值占比

-- ⚠️ 9. 范围查询后的列
-- 联合索引(name, age, city)
SELECT * FROM users WHERE name = 'Alice' AND age > 25 AND city = 'Beijing';
-- age使用索引,但city失效
```

**特殊情况**:

**1. 小表不用索引**:
如果表很小(几百行),MySQL可能选择全表扫描,因为比走索引更快。

**2. 索引选择性低**:
如果列的区分度很低(如性别),MySQL可能不用索引。

**3. MySQL优化器选择**:
即使有索引,优化器可能认为全表扫描更快(如返回大部分数据)。

**如何验证索引是否失效**:

```sql
-- 使用 EXPLAIN 分析查询
EXPLAIN SELECT * FROM users WHERE name LIKE '%Alice';

-- 关注以下字段:
-- type: ALL 表示全表扫描(索引失效)
-- type: ref/range 表示使用索引
-- key: 实际使用的索引名
-- rows: 扫描的行数
```

#### 关键要点

- **函数和计算破坏索引**:不要在索引列上用函数或计算
- **类型要匹配**:避免隐式类型转换
- **LIKE注意前缀**:`'abc%'`可用索引,`'%abc'`不行
- **OR条件谨慎**:OR连接的所有列都要有索引
- **用EXPLAIN验证**:不确定时用EXPLAIN查看执行计划

#### 记忆口诀

**"函算不等前模糊,类型不符OR不全"**
- 函数、计算
- 不等于
- 前缀模糊(LIKE '%...')
- 类型转换
- OR有非索引列

11. 如何选择合适的列建立索引？

### 11. 如何选择合适的列建立索引?

#### 核心答案

**索引选择原则**:
1. WHERE、JOIN、ORDER BY、GROUP BY中频繁使用的列
2. 区分度高的列(重复值少)
3. 数据量大的表
4. 更新不频繁的列

#### 详细说明

**建立索引的5大原则**:

| 原则 | 说明 | 示例 |
|-----|------|------|
| **1. 查询频率高** | WHERE/JOIN/ORDER BY常用 | 用户ID、订单状态 |
| **2. 区分度高** | 不同值占比大(>30%) | 用户ID、手机号 |
| **3. 数据量大** | 表记录数>1000 | 订单表、日志表 |
| **4. 更新频率低** | 减少索引维护成本 | 创建时间、用户名 |
| **5. 长度适中** | 字符串用前缀索引 | email前20字符 |

**区分度计算**:

```sql
-- 计算列的区分度(选择性)
SELECT COUNT(DISTINCT column_name) / COUNT(*) AS selectivity
FROM table_name;

-- 区分度越接近1越好
-- 区分度 > 0.3 适合建索引
-- 区分度 < 0.1 不适合建索引
```

**实战场景**:

```sql
-- ✅ 适合建索引
-- 1. WHERE条件常用
CREATE INDEX idx_status ON orders(status);  -- 订单状态查询频繁

-- 2. JOIN连接列
CREATE INDEX idx_user_id ON orders(user_id);  -- 关联用户表

-- 3. ORDER BY排序
CREATE INDEX idx_create_time ON orders(create_time);  -- 按时间排序

-- 4. 唯一约束
CREATE UNIQUE INDEX idx_email ON users(email);  -- 邮箱唯一

-- 5. 前缀索引(长字符串)
CREATE INDEX idx_url_prefix ON pages(url(50));  -- URL前50字符

-- ❌ 不适合建索引
-- 1. 区分度低
-- CREATE INDEX idx_gender ON users(gender);  -- 只有男女两值

-- 2. 频繁更新
-- CREATE INDEX idx_login_count ON users(login_count);  -- 每次登录都更新

-- 3. 数据量小
-- CREATE INDEX idx_id ON config(id);  -- 配置表只有几十行

-- 4. 不常用查询
-- CREATE INDEX idx_备注 ON users(remark);  -- 很少用于查询
```

#### 关键要点

- **区分度高**:不同值越多越好,>30%适合建索引
- **查询频繁**:经常出现在WHERE/JOIN/ORDER BY
- **数据量大**:小表(<1000行)不需要索引
- **前缀索引**:长字符串(>50字符)考虑前缀索引
- **避免过多**:一个表索引不超过5个(影响写性能)

#### 记忆口诀

**"频繁区分大不变"**
- 频繁:查询频率高
- 区分:区分度高
- 大:数据量大
- 不变:更新频率低

### 12. 什么是覆盖索引?

#### 核心答案

**覆盖索引**(Covering Index):查询的所有列都在索引中,不需要回表查询,直接从索引获取数据。

**优点**:避免回表,减少IO,性能提升显著。

#### 详细说明

```sql
-- 假设有联合索引: INDEX(name, age)

-- ✅ 覆盖索引 - 无需回表
SELECT name, age FROM users WHERE name = 'Alice';
-- 索引 (name, age) 已包含所有需要的列

-- ❌ 非覆盖索引 - 需要回表
SELECT name, age, address FROM users WHERE name = 'Alice';
-- 索引中没有 address,需要回表查主键索引

-- 验证是否使用覆盖索引
EXPLAIN SELECT name, age FROM users WHERE name = 'Alice';
-- Extra: Using index  表示使用了覆盖索引
```

**覆盖索引优化案例**:

```sql
-- 场景: 经常查询 SELECT id, name, age FROM users WHERE name = ?

-- 优化前: INDEX(name)
-- 需要回表获取 id 和 age

-- 优化后: INDEX(name, age)
-- 主键 id 自动包含在辅助索引的叶子节点
-- 所有数据都在索引中,无需回表
```

#### 关键要点

- **定义**:索引包含查询所需的全部列
- **优点**:避免回表,减少IO,性能大幅提升
- **设计**:联合索引设计时考虑查询覆盖
- **验证**:EXPLAIN查看Extra字段是否有"Using index"

#### 记忆口诀

**"索引全含不回表"** - 索引包含全部列,不需要回表

### 13. 什么是索引下推?

#### 核心答案

**索引下推**(Index Condition Pushdown, ICP):MySQL 5.6引入,将WHERE条件的过滤下推到存储引擎层,减少回表次数。

**优点**:减少不必要的回表,提升查询性能。

#### 详细说明

**没有索引下推**(MySQL 5.6之前):

```
1. 存储引擎通过索引找到符合第一个条件的记录
2. 回表获取完整行数据
3. Server层再过滤其他条件
→ 大量无用回表
```

**有索引下推**(MySQL 5.6+):

```
1. 存储引擎通过索引找到符合第一个条件的记录
2. 在索引中继续过滤其他条件(下推)
3. 只对符合所有索引条件的记录回表
→ 减少无用回表
```

**示例**:

```sql
-- 联合索引: INDEX(name, age)
SELECT * FROM users WHERE name LIKE 'A%' AND age = 25;

-- 没有ICP:
-- 1. 通过索引找到所有 name LIKE 'A%' 的记录
-- 2. 回表获取完整数据
-- 3. 过滤 age = 25
-- 假设 name LIKE 'A%' 有1000条,age=25只有10条 → 990次无用回表

-- 有ICP:
-- 1. 通过索引找到 name LIKE 'A%' 的记录
-- 2. 在索引中过滤 age = 25 (下推)
-- 3. 只对10条记录回表
-- → 只需10次回表,性能提升100倍

-- 验证是否使用索引下推
EXPLAIN SELECT * FROM users WHERE name LIKE 'A%' AND age = 25;
-- Extra: Using index condition  表示使用了索引下推
```

**ICP的适用条件**:

1. 只支持 InnoDB 和 MyISAM
2. 只能用于辅助索引(非聚簇索引)
3. 条件列必须都在同一个索引中
4. 不支持子查询

#### 关键要点

- **索引下推**:在索引中提前过滤,减少回表
- **版本**:MySQL 5.6+支持,默认开启
- **效果**:大幅减少回表次数,性能提升显著
- **验证**:EXPLAIN查看"Using index condition"

#### 记忆口诀

**"条件下推索引过滤,减少回表性能提升"**

12. 什么是覆盖索引？
13. 什么是索引下推？

## 事务

### 14. 什么是事务?事务的ACID特性是什么?

#### 核心答案

**事务**(Transaction):一组SQL操作的集合,要么全部执行成功,要么全部回滚失败。

**ACID特性**:
- **A**tomicity(原子性):全部成功或全部失败
- **C**onsistency(一致性):从一个一致状态到另一个一致状态
- **I**solation(隔离性):事务之间互不干扰
- **D**urability(持久性):提交后永久保存

#### 详细说明

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">事务 ACID 特性</text>
<rect x="50" y="70" width="380" height="180" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="8"/>
<text x="240" y="100" text-anchor="middle" font-size="20" font-weight="bold" fill="#1e40af">A - 原子性 (Atomicity)</text>
<text x="70" y="135" font-size="15" fill="#334155" font-weight="bold">定义: 不可分割,全部成功或全部失败</text>
<text x="70" y="165" font-size="14" fill="#475569">• 转账: A扣款 + B加款,同时成功或失败</text>
<text x="70" y="190" font-size="14" fill="#475569">• 实现: undo log (回滚日志)</text>
<text x="70" y="215" font-size="13" fill="#059669">✓ 保证操作"要么全做,要么全不做"</text>
<text x="70" y="235" font-size="13" fill="#dc2626">✗ 不能部分成功部分失败</text>
<rect x="470" y="70" width="380" height="180" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="8"/>
<text x="660" y="100" text-anchor="middle" font-size="20" font-weight="bold" fill="#15803d">C - 一致性 (Consistency)</text>
<text x="490" y="135" font-size="15" fill="#334155" font-weight="bold">定义: 从一个合法状态到另一个合法状态</text>
<text x="490" y="165" font-size="14" fill="#475569">• 转账前后总金额不变</text>
<text x="490" y="190" font-size="14" fill="#475569">• 实现: 约束(主键、外键、触发器)</text>
<text x="490" y="215" font-size="13" fill="#059669">✓ 业务规则始终成立</text>
<text x="490" y="235" font-size="13" fill="#dc2626">✗ 不会出现数据不一致</text>
<rect x="50" y="280" width="380" height="180" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="240" y="310" text-anchor="middle" font-size="20" font-weight="bold" fill="#d97706">I - 隔离性 (Isolation)</text>
<text x="70" y="345" font-size="15" fill="#334155" font-weight="bold">定义: 事务之间互不干扰</text>
<text x="70" y="375" font-size="14" fill="#475569">• 并发事务互不影响</text>
<text x="70" y="400" font-size="14" fill="#475569">• 实现: MVCC + 锁</text>
<text x="70" y="425" font-size="13" fill="#059669">✓ 防止脏读、不可重复读、幻读</text>
<text x="70" y="445" font-size="13" fill="#78350f">⚠️ 4个隔离级别权衡性能与正确性</text>
<rect x="470" y="280" width="380" height="180" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="8"/>
<text x="660" y="310" text-anchor="middle" font-size="20" font-weight="bold" fill="#b91c1c">D - 持久性 (Durability)</text>
<text x="490" y="345" font-size="15" fill="#334155" font-weight="bold">定义: 提交后永久保存,不会丢失</text>
<text x="490" y="375" font-size="14" fill="#475569">• 即使断电、崩溃也不会丢失</text>
<text x="490" y="400" font-size="14" fill="#475569">• 实现: redo log (重做日志)</text>
<text x="490" y="425" font-size="13" fill="#059669">✓ 提交的数据永久有效</text>
<text x="490" y="445" font-size="13" fill="#dc2626">✗ 已提交的修改不会因故障丢失</text>
</svg>

**ACID详解**:

**1. 原子性(Atomicity)**:

```sql
-- 转账示例
BEGIN;
UPDATE account SET balance = balance - 100 WHERE id = 1;  -- A扣款
UPDATE account SET balance = balance + 100 WHERE id = 2;  -- B加款
COMMIT;  -- 两个操作同时成功

-- 如果任何一步失败,自动回滚
-- 实现机制: undo log记录回滚信息
```

**2. 一致性(Consistency)**:

- 转账前:A=1000, B=500, 总额=1500
- 转账后:A=900, B=600, 总额=1500  ✅
- 不会出现:A=900, B=500, 总额=1400  ❌

**3. 隔离性(Isolation)**:

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|---------|-----|----------|------|
| READ UNCOMMITTED | ✗ | ✗ | ✗ |
| READ COMMITTED | ✅ | ✗ | ✗ |
| REPEATABLE READ (默认) | ✅ | ✅ | ✅ |
| SERIALIZABLE | ✅ | ✅ | ✅ |

**4. 持久性(Durability)**:

```sql
-- 事务提交后,数据永久保存
UPDATE users SET balance = 1000 WHERE id = 1;
COMMIT;  -- 提交后,即使系统崩溃,数据也不会丢失

-- 实现机制: redo log先写入磁盘,保证数据不丢失
```

**事务的基本操作**:

```sql
-- 开启事务
BEGIN; -- 或 START TRANSACTION;

-- 执行SQL
UPDATE ...
INSERT ...
DELETE ...

-- 提交事务
COMMIT;  -- 成功,永久保存

-- 回滚事务
ROLLBACK;  -- 失败,撤销所有操作

-- 保存点(部分回滚)
SAVEPOINT sp1;
...
ROLLBACK TO sp1;  -- 回滚到sp1
```

#### 关键要点

- **原子性**:undo log实现回滚
- **一致性**:约束和事务共同保证
- **隔离性**:MVCC+锁实现,有4个级别
- **持久性**:redo log实现,保证不丢数据
- **默认隔离级别**:REPEATABLE READ(可重复读)

#### 记忆口诀

**"原子性全做全不做,一致性前后都合法,隔离性互不干扰,持久性永久保存"**

15. MySQL 如何实现事务？

### 15. MySQL如何实现事务?

#### 核心答案

MySQL通过以下机制实现事务:
- **undo log**:实现原子性(回滚)
- **redo log**:实现持久性(崩溃恢复)
- **MVCC+锁**:实现隔离性(并发控制)
- **约束**:实现一致性(业务规则)

#### 关键要点

- **原子性**: undo log记录修改前数据,回滚时恢复
- **持久性**: redo log先写磁盘,崩溃后重做
- **隔离性**: MVCC(快照读)+锁(当前读)
- **一致性**: 由其他三个特性+约束共同保证

### 16. 什么是事务的隔离级别?各级别分别解决什么问题?

#### 核心答案

**4个隔离级别**(由低到高):
1. **READ UNCOMMITTED**(读未提交):最低级别,会脏读
2. **READ COMMITTED**(读已提交):解决脏读,Oracle默认
3. **REPEATABLE READ**(可重复读):解决不可重复读,MySQL默认
4. **SERIALIZABLE**(串行化):最高级别,完全隔离

#### 详细说明

| 隔离级别 | 脏读 | 不可重复读 | 幻读 | 性能 | 说明 |
|---------|-----|----------|------|------|------|
| **READ UNCOMMITTED** | ❌ 会 | ❌ 会 | ❌ 会 | 最高 | 读到未提交数据 |
| **READ COMMITTED** | ✅ 防 | ❌ 会 | ❌ 会 | 较高 | 只读已提交数据 |
| **REPEATABLE READ** | ✅ 防 | ✅ 防 | ✅ 防* | 中等 | 事务内多次读取一致 |
| **SERIALIZABLE** | ✅ 防 | ✅ 防 | ✅ 防 | 最低 | 完全串行执行 |

*注: MySQL InnoDB的RR级别通过MVCC+间隙锁基本防止了幻读

### 17. 什么是脏读、不可重复读、幻读?

#### 核心答案

- **脏读**(Dirty Read):读到其他事务未提交的数据
- **不可重复读**(Non-repeatable Read):两次读同一行数据不一致
- **幻读**(Phantom Read):两次范围查询结果集不一致(行数变化)

#### 详细说明

**1. 脏读**(最严重):

```
时间  事务A                     事务B
T1    BEGIN                    BEGIN
T2                             UPDATE balance=200 WHERE id=1
T3    SELECT balance=200       (未提交)
T4                             ROLLBACK
T5    SELECT balance=100       数据恢复
→ T3读到了事务B未提交的数据(脏数据)
```

**2. 不可重复读**(UPDATE问题):

```
时间  事务A                     事务B
T1    BEGIN                    BEGIN
T2    SELECT balance=100
T3                             UPDATE balance=200 WHERE id=1
T4                             COMMIT
T5    SELECT balance=200       (已提交)
→ 同一事务内两次读取不一致
```

**3. 幻读**(INSERT/DELETE问题):

```
时间  事务A                     事务B
T1    BEGIN                    BEGIN
T2    SELECT COUNT(*)=5
T3                             INSERT INTO...
T4                             COMMIT
T5    SELECT COUNT(*)=6
→ 同一事务内两次范围查询结果集不同
```

**三者区别**:

| 问题 | 操作 | 影响 | 隔离级别 |
|-----|------|------|---------|
| 脏读 | 读未提交 | 读到错误数据 | READ COMMITTED+ |
| 不可重复读 | UPDATE | 同一行数据变化 | REPEATABLE READ+ |
| 幻读 | INSERT/DELETE | 结果集行数变化 | SERIALIZABLE |

### 18. MySQL默认的事务隔离级别是什么?

#### 核心答案

**REPEATABLE READ**(可重复读)

- 通过MVCC(多版本并发控制)实现
- 防止脏读、不可重复读
- 基本防止幻读(间隙锁)

### 19. 如何设置事务的隔离级别?

#### 核心答案

```sql
-- 查看当前隔离级别
SELECT @@transaction_isolation;
-- 或
SHOW VARIABLES LIKE 'transaction_isolation';

-- 设置全局隔离级别(重启后生效)
SET GLOBAL transaction_isolation = 'READ-COMMITTED';

-- 设置会话隔离级别(当前会话)
SET SESSION transaction_isolation = 'REPEATABLE-READ';

-- 设置下一个事务的隔离级别
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

#### 详细说明

**隔离级别名称**:
- `READ-UNCOMMITTED`
- `READ-COMMITTED`
- `REPEATABLE-READ`
- `SERIALIZABLE`

**配置文件设置** (`my.cnf`):

```ini
[mysqld]
transaction-isolation = REPEATABLE-READ
```

#### 记忆口诀

**"读未读已可重复串行化"** - 四个隔离级别
**"脏读未提交,不可重复UPDATE,幻读INSERT"** - 三个并发问题

16. 什么是事务的隔离级别？各级别分别解决什么问题？
17. 什么是脏读、不可重复读、幻读？
18. MySQL 默认的事务隔离级别是什么？
19. 如何设置事务的隔离级别？

## 锁

### 20. MySQL中有哪些锁?

#### 核心答案

**按粒度分类**:
- **表锁**(Table Lock):锁整张表,开销小,加锁快,并发低
- **行锁**(Row Lock):锁单行数据,开销大,加锁慢,并发高
- **页锁**(Page Lock):锁数据页,介于表锁和行锁之间

**按模式分类**:
- **共享锁**(S锁,读锁):允许多个事务同时读
- **排他锁**(X锁,写锁):只允许一个事务写,阻塞其他读写

**按算法分类**:
- **记录锁**(Record Lock):锁单条索引记录
- **间隙锁**(Gap Lock):锁索引记录之间的间隙
- **临键锁**(Next-Key Lock):记录锁+间隙锁

#### 详细说明

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">MySQL 锁分类全景</text>
<rect x="50" y="70" width="260" height="220" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="8"/>
<text x="180" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e40af">按粒度分类</text>
<rect x="70" y="115" width="220" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="180" y="140" text-anchor="middle" font-size="16" fill="#4338ca" font-weight="bold">表锁 (Table Lock)</text>
<text x="80" y="160" font-size="13" fill="#475569">开销小、并发低、MyISAM</text>
<rect x="70" y="185" width="220" height="60" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="5"/>
<text x="180" y="210" text-anchor="middle" font-size="16" fill="#15803d" font-weight="bold">行锁 (Row Lock)</text>
<text x="80" y="230" font-size="13" fill="#475569">开销大、并发高、InnoDB</text>
<rect x="70" y="255" width="220" height="25" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
<text x="180" y="273" text-anchor="middle" font-size="14" fill="#78350f">页锁 (Page Lock)</text>
<rect x="330" y="70" width="260" height="220" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="8"/>
<text x="460" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#be185d">按模式分类</text>
<rect x="350" y="115" width="220" height="80" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="5"/>
<text x="460" y="140" text-anchor="middle" font-size="16" fill="#15803d" font-weight="bold">共享锁 (S锁/读锁)</text>
<text x="360" y="165" font-size="13" fill="#475569">• 多个事务可同时持有</text>
<text x="360" y="185" font-size="13" fill="#475569">• 允许并发读取</text>
<rect x="350" y="205" width="220" height="75" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="460" y="230" text-anchor="middle" font-size="16" fill="#b91c1c" font-weight="bold">排他锁 (X锁/写锁)</text>
<text x="360" y="252" font-size="13" fill="#475569">• 只能一个事务持有</text>
<text x="360" y="270" font-size="13" fill="#475569">• 阻塞其他所有锁</text>
<rect x="610" y="70" width="240" height="220" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="730" y="95" text-anchor="middle" font-size="18" font-weight="bold" fill="#d97706">按算法分类</text>
<rect x="625" y="115" width="210" height="50" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="730" y="137" text-anchor="middle" font-size="15" fill="#4338ca" font-weight="bold">记录锁 (Record)</text>
<text x="635" y="155" font-size="12" fill="#475569">锁单条索引记录</text>
<rect x="625" y="175" width="210" height="50" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="5"/>
<text x="730" y="197" text-anchor="middle" font-size="15" fill="#15803d" font-weight="bold">间隙锁 (Gap)</text>
<text x="635" y="215" font-size="12" fill="#475569">锁索引间隙</text>
<rect x="625" y="235" width="210" height="45" fill="#fecaca" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="730" y="254" text-anchor="middle" font-size="15" fill="#b91c1c" font-weight="bold">临键锁 (Next-Key)</text>
<text x="635" y="272" font-size="12" fill="#475569">记录锁+间隙锁</text>
<rect x="50" y="320" width="400" height="200" fill="#f0f4f8" stroke="#64748b" stroke-width="2" rx="8"/>
<text x="250" y="345" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">锁兼容性矩阵</text>
<rect x="70" y="360" width="80" height="30" fill="#cbd5e1"/>
<text x="110" y="380" text-anchor="middle" font-size="14" fill="#1e293b" font-weight="bold">已有锁</text>
<rect x="160" y="360" width="130" height="30" fill="#dcfce7"/>
<text x="225" y="380" text-anchor="middle" font-size="14" fill="#15803d" font-weight="bold">S 共享锁</text>
<rect x="300" y="360" width="130" height="30" fill="#fee2e2"/>
<text x="365" y="380" text-anchor="middle" font-size="14" fill="#b91c1c" font-weight="bold">X 排他锁</text>
<rect x="70" y="400" width="80" height="50" fill="#dcfce7"/>
<text x="110" y="428" text-anchor="middle" font-size="14" fill="#15803d" font-weight="bold">S 锁</text>
<rect x="160" y="400" width="130" height="50" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
<text x="225" y="428" text-anchor="middle" font-size="16" fill="#059669" font-weight="bold">✓ 兼容</text>
<rect x="300" y="400" width="130" height="50" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
<text x="365" y="428" text-anchor="middle" font-size="16" fill="#dc2626" font-weight="bold">✗ 冲突</text>
<rect x="70" y="460" width="80" height="50" fill="#fee2e2"/>
<text x="110" y="488" text-anchor="middle" font-size="14" fill="#b91c1c" font-weight="bold">X 锁</text>
<rect x="160" y="460" width="130" height="50" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
<text x="225" y="488" text-anchor="middle" font-size="16" fill="#dc2626" font-weight="bold">✗ 冲突</text>
<rect x="300" y="460" width="130" height="50" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
<text x="365" y="488" text-anchor="middle" font-size="16" fill="#dc2626" font-weight="bold">✗ 冲突</text>
<rect x="480" y="320" width="370" height="200" fill="#f0f4f8" stroke="#64748b" stroke-width="2" rx="8"/>
<text x="665" y="345" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">InnoDB 锁特性</text>
<text x="500" y="375" font-size="14" fill="#334155" font-weight="bold">✓ 默认行锁 (高并发)</text>
<text x="500" y="400" font-size="14" fill="#334155" font-weight="bold">✓ 支持事务</text>
<text x="500" y="425" font-size="14" fill="#334155" font-weight="bold">✓ MVCC (多版本)</text>
<text x="500" y="450" font-size="14" fill="#334155" font-weight="bold">✓ 间隙锁防幻读</text>
<text x="500" y="475" font-size="14" fill="#334155" font-weight="bold">✓ 自动死锁检测</text>
<text x="500" y="500" font-size="13" fill="#78350f">⚠️ 只有通过索引条件检索才用行锁</text>
</svg>

**各类锁详细对比**:

| 锁类型 | 粒度 | 开销 | 加锁速度 | 并发性 | 死锁 | 适用引擎 |
|-------|------|------|---------|--------|------|---------|
| **表锁** | 整张表 | 小 | 快 | 低 | 不会 | MyISAM/InnoDB |
| **行锁** | 单行记录 | 大 | 慢 | 高 | 可能 | InnoDB |
| **页锁** | 数据页 | 中等 | 中等 | 中等 | 可能 | BDB |

**表锁操作**:

```sql
-- 手动加表锁
LOCK TABLES users READ;   -- 读锁(共享锁)
LOCK TABLES users WRITE;  -- 写锁(排他锁)

-- 释放表锁
UNLOCK TABLES;

-- 查看表锁状态
SHOW OPEN TABLES WHERE In_use > 0;
```

**行锁操作**(InnoDB自动加锁):

```sql
-- 自动加行锁(必须在事务中)
BEGIN;

-- 加共享锁(S锁)
SELECT * FROM users WHERE id = 1 LOCK IN SHARE MODE;

-- 加排他锁(X锁)
SELECT * FROM users WHERE id = 1 FOR UPDATE;

-- UPDATE/DELETE/INSERT 自动加排他锁
UPDATE users SET name = 'Alice' WHERE id = 1;

COMMIT;

-- 查看行锁状态
SHOW ENGINE INNODB STATUS;
SELECT * FROM information_schema.innodb_locks;
```

**锁等待与超时**:

```sql
-- 查看锁等待超时时间(默认50秒)
SHOW VARIABLES LIKE 'innodb_lock_wait_timeout';

-- 设置锁等待超时
SET innodb_lock_wait_timeout = 100;

-- 查看当前锁等待
SELECT * FROM information_schema.innodb_lock_waits;
```

**InnoDB行锁的三种算法**:

1. **Record Lock(记录锁)**:
   - 锁定单个索引记录
   - 精确匹配,如`WHERE id = 10`

2. **Gap Lock(间隙锁)**:
   - 锁定索引记录之间的间隙
   - 防止其他事务在间隙中插入数据
   - 只在REPEATABLE READ级别存在

3. **Next-Key Lock(临键锁)**:
   - Record Lock + Gap Lock
   - 锁定记录及其前面的间隙
   - InnoDB默认使用,防止幻读

**何时使用行锁 vs 表锁**:

```sql
-- ✅ 使用行锁 (通过索引)
UPDATE users SET name = 'Bob' WHERE id = 1;
-- InnoDB通过主键索引,只锁id=1的行

-- ❌ 退化为表锁 (未使用索引)
UPDATE users SET name = 'Bob' WHERE name = 'Alice';
-- 如果name列无索引,InnoDB会锁整张表
```

#### 关键要点

- **粒度分类**:表锁(低并发)、行锁(高并发)、页锁(中等)
- **模式分类**:共享锁(读)、排他锁(写)
- **算法分类**:记录锁、间隙锁、临键锁
- **InnoDB优势**:默认行锁,支持MVCC,高并发
- **行锁条件**:必须通过索引检索,否则退化为表锁
- **锁兼容性**:S+S兼容,其他都冲突

#### 记忆口诀

**"表行页,共排他,记录间隙临键"** - MySQL锁的三大分类
**"索引行锁,无索引表锁"** - InnoDB行锁的使用条件

### 21. 什么是行锁、表锁、页锁？

#### 核心答案

**行锁**(Row Lock):锁定单行数据,InnoDB默认使用,并发性能最好。

**表锁**(Table Lock):锁定整张表,MyISAM使用,并发性能最差,但开销小。

**页锁**(Page Lock):锁定数据页(8-16KB),介于行锁和表锁之间,BDB引擎使用(已不常用)。

#### 详细说明

<svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">行锁 vs 表锁 vs 页锁对比</text>
<rect x="50" y="70" width="250" height="420" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="8"/>
<text x="175" y="100" text-anchor="middle" font-size="20" font-weight="bold" fill="#15803d">行锁 (Row Lock)</text>
<rect x="70" y="120" width="210" height="80" fill="#ffffff" stroke="#22c55e" stroke-width="1" rx="5"/>
<text x="175" y="145" text-anchor="middle" font-size="14" fill="#166534" font-weight="bold">锁粒度: 最小 (单行)</text>
<line x1="80" y1="155" x2="270" y2="155" stroke="#cbd5e1" stroke-width="1"/>
<text x="80" y="175" font-size="13" fill="#334155">表 [行1 行2 行3 行4...]</text>
<rect x="80" y="185" width="40" height="8" fill="#22c55e"/>
<text x="130" y="193" font-size="11" fill="#475569">← 只锁这行</text>
<text x="70" y="230" font-size="15" fill="#1e293b" font-weight="bold">特点:</text>
<text x="80" y="255" font-size="13" fill="#334155">✓ 并发度: 最高</text>
<text x="80" y="280" font-size="13" fill="#334155">✓ 开销: 大</text>
<text x="80" y="305" font-size="13" fill="#334155">✓ 加锁速度: 慢</text>
<text x="80" y="330" font-size="13" fill="#334155">✓ 死锁: 可能发生</text>
<text x="80" y="355" font-size="13" fill="#334155">✓ 锁冲突: 少</text>
<text x="70" y="385" font-size="15" fill="#1e293b" font-weight="bold">适用:</text>
<text x="80" y="410" font-size="13" fill="#334155">• 高并发写入</text>
<text x="80" y="435" font-size="13" fill="#334155">• 事务性应用</text>
<text x="80" y="460" font-size="13" fill="#334155">• InnoDB 引擎</text>
<text x="175" y="485" text-anchor="middle" font-size="12" fill="#059669" font-weight="bold">推荐使用 ⭐⭐⭐⭐⭐</text>
<rect x="325" y="70" width="250" height="420" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="8"/>
<text x="450" y="100" text-anchor="middle" font-size="20" font-weight="bold" fill="#b91c1c">表锁 (Table Lock)</text>
<rect x="345" y="120" width="210" height="80" fill="#ffffff" stroke="#dc2626" stroke-width="1" rx="5"/>
<text x="450" y="145" text-anchor="middle" font-size="14" fill="#7f1d1d" font-weight="bold">锁粒度: 最大 (整表)</text>
<line x1="355" y1="155" x2="545" y2="155" stroke="#cbd5e1" stroke-width="1"/>
<text x="355" y="175" font-size="13" fill="#334155">表 [行1 行2 行3 行4...]</text>
<rect x="355" y="185" width="180" height="8" fill="#dc2626"/>
<text x="405" y="193" font-size="11" fill="#475569">← 锁整个表</text>
<text x="345" y="230" font-size="15" fill="#1e293b" font-weight="bold">特点:</text>
<text x="355" y="255" font-size="13" fill="#334155">✗ 并发度: 最低</text>
<text x="355" y="280" font-size="13" fill="#334155">✓ 开销: 小</text>
<text x="355" y="305" font-size="13" fill="#334155">✓ 加锁速度: 快</text>
<text x="355" y="330" font-size="13" fill="#334155">✓ 死锁: 不会发生</text>
<text x="355" y="355" font-size="13" fill="#334155">✗ 锁冲突: 频繁</text>
<text x="345" y="385" font-size="15" fill="#1e293b" font-weight="bold">适用:</text>
<text x="355" y="410" font-size="13" fill="#334155">• 读多写少</text>
<text x="355" y="435" font-size="13" fill="#334155">• 全表扫描</text>
<text x="355" y="460" font-size="13" fill="#334155">• MyISAM 引擎</text>
<text x="450" y="485" text-anchor="middle" font-size="12" fill="#dc2626" font-weight="bold">不推荐高并发 ⭐</text>
<rect x="600" y="70" width="250" height="420" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="725" y="100" text-anchor="middle" font-size="20" font-weight="bold" fill="#d97706">页锁 (Page Lock)</text>
<rect x="620" y="120" width="210" height="80" fill="#ffffff" stroke="#f59e0b" stroke-width="1" rx="5"/>
<text x="725" y="145" text-anchor="middle" font-size="14" fill="#78350f" font-weight="bold">锁粒度: 中等 (数据页)</text>
<line x1="630" y1="155" x2="820" y2="155" stroke="#cbd5e1" stroke-width="1"/>
<text x="630" y="175" font-size="13" fill="#334155">页 [多行数据 8-16KB]</text>
<rect x="630" y="185" width="80" height="8" fill="#f59e0b"/>
<text x="720" y="193" font-size="11" fill="#475569">← 锁这页</text>
<text x="620" y="230" font-size="15" fill="#1e293b" font-weight="bold">特点:</text>
<text x="630" y="255" font-size="13" fill="#334155">◐ 并发度: 中等</text>
<text x="630" y="280" font-size="13" fill="#334155">◐ 开销: 中等</text>
<text x="630" y="305" font-size="13" fill="#334155">◐ 加锁速度: 中等</text>
<text x="630" y="330" font-size="13" fill="#334155">⚠️ 死锁: 可能发生</text>
<text x="630" y="355" font-size="13" fill="#334155">◐ 锁冲突: 中等</text>
<text x="620" y="385" font-size="15" fill="#1e293b" font-weight="bold">适用:</text>
<text x="630" y="410" font-size="13" fill="#334155">• 中等并发</text>
<text x="630" y="435" font-size="13" fill="#334155">• BDB 引擎</text>
<text x="630" y="460" font-size="13" fill="#78350f">(已不常用)</text>
<text x="725" y="485" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="bold">已淘汰 ⭐⭐</text>
</svg>

**详细对比表**:

| 对比维度 | 行锁 | 表锁 | 页锁 |
|---------|------|------|------|
| **锁定粒度** | 单行记录 | 整张表 | 数据页(8-16KB) |
| **并发性能** | ⭐⭐⭐⭐⭐ 最好 | ⭐ 最差 | ⭐⭐⭐ 中等 |
| **锁开销** | 大 | 小 | 中等 |
| **加锁速度** | 慢 | 快 | 中等 |
| **死锁** | ✅ 可能 | ❌ 不会 | ✅ 可能 |
| **锁冲突概率** | 低 | 高 | 中等 |
| **内存消耗** | 高 | 低 | 中等 |
| **适用场景** | 高并发事务 | 全表操作 | (已淘汰) |
| **存储引擎** | InnoDB | MyISAM/InnoDB | BDB |

**行锁的实现原理**:

```sql
-- InnoDB 行锁示例
BEGIN;

-- 场景1: 通过索引查询 → 行锁
UPDATE users SET balance = balance - 100 WHERE id = 10;
-- 只锁 id=10 这一行,其他行可以并发操作

-- 场景2: 未使用索引 → 退化为表锁
UPDATE users SET balance = balance - 100 WHERE name = 'Alice';
-- 如果 name 列无索引,会锁整张表

COMMIT;
```

**表锁的实现原理**:

```sql
-- 手动加表锁
LOCK TABLES users READ;   -- 读锁:允许其他读,阻塞写
LOCK TABLES users WRITE;  -- 写锁:阻塞其他所有读写

-- 释放锁
UNLOCK TABLES;

-- MyISAM 自动表锁
-- SELECT 自动加读锁
-- UPDATE/INSERT/DELETE 自动加写锁
```

**页锁说明**:

- 一次锁定相邻的一组记录
- 介于行锁和表锁之间
- BDB引擎使用(MySQL已不再支持BDB)
- 现代MySQL不再使用页锁

**行锁与表锁的选择**:

```
高并发写入 → 行锁 (InnoDB)
├─ 订单系统
├─ 交易系统
└─ 用户系统

读多写少 → 表锁 (MyISAM)
├─ 日志表
├─ 配置表
└─ 统计表
```

#### 关键要点

- **行锁**:InnoDB默认,高并发,必须通过索引,否则退化为表锁
- **表锁**:MyISAM使用,低并发,开销小,适合全表操作
- **页锁**:已淘汰,不再使用
- **锁粒度**:行锁 < 页锁 < 表锁
- **并发性**:行锁 > 页锁 > 表锁
- **开销**:行锁 > 页锁 > 表锁

#### 记忆口诀

**"行小快高,表大慢低,页已淘汰"**
- 行锁:粒度小、并发高、开销大
- 表锁:粒度大、并发低、开销小
- 页锁:已淘汰

21. 什么是行锁、表锁、页锁？
### 22. 什么是共享锁(S锁)和排他锁(X锁)?

#### 核心答案

**共享锁**(Shared Lock, S锁, 读锁):多个事务可以同时持有同一资源的共享锁,允许并发读取。

**排他锁**(Exclusive Lock, X锁, 写锁):只有一个事务可以持有排他锁,会阻塞其他所有锁(包括共享锁和排他锁)。

#### 详细说明

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">共享锁 vs 排他锁</text>
<rect x="50" y="70" width="380" height="200" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="8"/>
<text x="240" y="100" text-anchor="middle" font-size="20" font-weight="bold" fill="#15803d">共享锁 (S锁 / 读锁)</text>
<text x="70" y="135" font-size="15" fill="#1e293b" font-weight="bold">特点:</text>
<text x="80" y="160" font-size="13" fill="#334155">✓ 多个事务可同时持有</text>
<text x="80" y="185" font-size="13" fill="#334155">✓ 允许并发读取</text>
<text x="80" y="210" font-size="13" fill="#334155">✓ 阻塞写操作(排他锁)</text>
<text x="80" y="235" font-size="13" fill="#334155">✓ 读读不冲突</text>
<text x="240" y="260" text-anchor="middle" font-size="12" fill="#059669" font-weight="bold">SELECT ... LOCK IN SHARE MODE</text>
<rect x="470" y="70" width="380" height="200" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="8"/>
<text x="660" y="100" text-anchor="middle" font-size="20" font-weight="bold" fill="#b91c1c">排他锁 (X锁 / 写锁)</text>
<text x="490" y="135" font-size="15" fill="#1e293b" font-weight="bold">特点:</text>
<text x="500" y="160" font-size="13" fill="#334155">✗ 只能一个事务持有</text>
<text x="500" y="185" font-size="13" fill="#334155">✗ 阻塞所有其他锁</text>
<text x="500" y="210" font-size="13" fill="#334155">✗ 读写都冲突</text>
<text x="500" y="235" font-size="13" fill="#334155">✗ 写写冲突</text>
<text x="660" y="260" text-anchor="middle" font-size="12" fill="#dc2626" font-weight="bold">SELECT ... FOR UPDATE</text>
<rect x="50" y="300" width="800" height="230" fill="#f0f4f8" stroke="#64748b" stroke-width="2" rx="8"/>
<text x="450" y="330" text-anchor="middle" font-size="20" font-weight="bold" fill="#1e293b">锁兼容性矩阵</text>
<rect x="150" y="360" width="120" height="40" fill="#cbd5e1"/>
<text x="210" y="385" text-anchor="middle" font-size="15" fill="#1e293b" font-weight="bold">已有锁 ↓</text>
<rect x="280" y="360" width="140" height="40" fill="#cbd5e1"/>
<text x="350" y="385" text-anchor="middle" font-size="15" fill="#1e293b" font-weight="bold">请求 S 锁 →</text>
<rect x="430" y="360" width="140" height="40" fill="#cbd5e1"/>
<text x="500" y="385" text-anchor="middle" font-size="15" fill="#1e293b" font-weight="bold">请求 X 锁 →</text>
<rect x="150" y="410" width="120" height="50" fill="#dcfce7"/>
<text x="210" y="440" text-anchor="middle" font-size="16" fill="#15803d" font-weight="bold">S 锁</text>
<rect x="280" y="410" width="140" height="50" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/>
<text x="350" y="430" text-anchor="middle" font-size="18" fill="#059669" font-weight="bold">✓ 兼容</text>
<text x="350" y="448" text-anchor="middle" font-size="11" fill="#475569">可以读</text>
<rect x="430" y="410" width="140" height="50" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/>
<text x="500" y="430" text-anchor="middle" font-size="18" fill="#dc2626" font-weight="bold">✗ 冲突</text>
<text x="500" y="448" text-anchor="middle" font-size="11" fill="#475569">等待</text>
<rect x="150" y="470" width="120" height="50" fill="#fee2e2"/>
<text x="210" y="500" text-anchor="middle" font-size="16" fill="#b91c1c" font-weight="bold">X 锁</text>
<rect x="280" y="470" width="140" height="50" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/>
<text x="350" y="490" text-anchor="middle" font-size="18" fill="#dc2626" font-weight="bold">✗ 冲突</text>
<text x="350" y="508" text-anchor="middle" font-size="11" fill="#475569">等待</text>
<rect x="430" y="470" width="140" height="50" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/>
<text x="500" y="490" text-anchor="middle" font-size="18" fill="#dc2626" font-weight="bold">✗ 冲突</text>
<text x="500" y="508" text-anchor="middle" font-size="11" fill="#475569">等待</text>
<rect x="590" y="360" width="240" height="160" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="710" y="385" text-anchor="middle" font-size="16" fill="#1e293b" font-weight="bold">兼容性规则</text>
<text x="605" y="410" font-size="13" fill="#059669" font-weight="bold">✓ S + S = 兼容</text>
<text x="615" y="430" font-size="12" fill="#475569">多个事务可同时读</text>
<text x="605" y="460" font-size="13" fill="#dc2626" font-weight="bold">✗ S + X = 冲突</text>
<text x="615" y="480" font-size="12" fill="#475569">读时不能写</text>
<text x="605" y="505" font-size="13" fill="#dc2626" font-weight="bold">✗ X + X = 冲突</text>
<text x="615" y="523" font-size="12" fill="#475569">写时不能再写</text>
</svg>

**共享锁的使用场景**:

```sql
-- 场景1: 显式加共享锁
BEGIN;
SELECT * FROM users WHERE id = 10 LOCK IN SHARE MODE;
-- 其他事务可以读,但不能修改 id=10 的记录
COMMIT;

-- 场景2: 多个事务并发读
-- 事务A
BEGIN;
SELECT * FROM users WHERE id = 10 LOCK IN SHARE MODE;
-- 持有共享锁

-- 事务B (同时进行)
BEGIN;
SELECT * FROM users WHERE id = 10 LOCK IN SHARE MODE;
-- ✅ 可以获取共享锁,并发读取

-- 事务C (同时进行)
BEGIN;
UPDATE users SET name = 'Alice' WHERE id = 10;
-- ❌ 阻塞,必须等待A和B释放共享锁
```

**排他锁的使用场景**:

```sql
-- 场景1: 显式加排他锁
BEGIN;
SELECT * FROM users WHERE id = 10 FOR UPDATE;
-- 其他事务不能读取或修改 id=10 的记录
COMMIT;

-- 场景2: 自动加排他锁
BEGIN;
UPDATE users SET balance = balance - 100 WHERE id = 10;
-- UPDATE/DELETE/INSERT 自动加排他锁
COMMIT;

-- 场景3: 转账操作(防止并发问题)
BEGIN;
-- 先加排他锁,防止余额被其他事务修改
SELECT balance FROM account WHERE id = 1 FOR UPDATE;
-- 扣款
UPDATE account SET balance = balance - 100 WHERE id = 1;
-- 加款
UPDATE account SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

**锁冲突示例**:

```sql
-- 时间线示例
-- 时间  事务A                                事务B
-- T1    BEGIN
-- T2    SELECT * FROM users WHERE id=10
--       LOCK IN SHARE MODE;
--       (获得 S 锁)
-- T3                                        BEGIN
-- T4                                        SELECT * FROM users WHERE id=10
--                                           LOCK IN SHARE MODE;
--                                           (✅ 获得 S 锁,成功)
-- T5                                        UPDATE users SET name='Bob' WHERE id=10;
--                                           (❌ 请求 X 锁,阻塞等待)
-- T6    COMMIT
--       (释放 S 锁)
-- T7                                        (✅ 获得 X 锁,继续执行)
-- T8                                        COMMIT
```

**共享锁与排他锁的对比**:

| 对比维度 | 共享锁 (S锁) | 排他锁 (X锁) |
|---------|-------------|-------------|
| **持有数量** | 多个事务同时持有 | 只有一个事务持有 |
| **锁定操作** | SELECT (读) | UPDATE/DELETE/INSERT (写) |
| **兼容性** | S+S 兼容 | X+任何锁 都冲突 |
| **阻塞情况** | 不阻塞读,阻塞写 | 阻塞所有读写 |
| **获取方式** | LOCK IN SHARE MODE | FOR UPDATE / 写操作自动 |
| **释放时机** | 事务提交/回滚 | 事务提交/回滚 |
| **应用场景** | 并发查询,防止修改 | 修改数据,防止并发 |

**注意事项**:

```sql
-- ⚠️ 死锁风险
-- 事务A
BEGIN;
SELECT * FROM users WHERE id = 1 LOCK IN SHARE MODE;  -- A持有S锁
UPDATE users SET name = 'Alice' WHERE id = 2;         -- A请求id=2的X锁

-- 事务B
BEGIN;
SELECT * FROM users WHERE id = 2 LOCK IN SHARE MODE;  -- B持有S锁
UPDATE users SET name = 'Bob' WHERE id = 1;           -- B请求id=1的X锁
-- ❌ 死锁: A等B释放id=2的S锁, B等A释放id=1的S锁

-- ✅ 避免死锁: 统一加锁顺序
-- 两个事务都按 id 顺序加锁:先锁 id=1,再锁 id=2
```

**MySQL 8.0 新特性 - NOWAIT 和 SKIP LOCKED**:

```sql
-- NOWAIT: 如果锁被占用,立即返回错误,不等待
SELECT * FROM users WHERE id = 10 FOR UPDATE NOWAIT;

-- SKIP LOCKED: 跳过被锁定的行
SELECT * FROM users WHERE status = 'pending'
FOR UPDATE SKIP LOCKED LIMIT 10;
-- 用于任务队列,跳过正在处理的任务
```

#### 关键要点

- **S锁(共享锁)**:读锁,多个事务可同时持有,读读兼容
- **X锁(排他锁)**:写锁,独占,阻塞所有其他锁
- **兼容性**:只有S+S兼容,其他组合都冲突
- **获取方式**:
  - S锁:`LOCK IN SHARE MODE`
  - X锁:`FOR UPDATE`或写操作自动
- **释放时机**:事务提交或回滚时自动释放

#### 记忆口诀

**"共享读多,排他写独,只有S+S通"**
- 共享锁:多个事务并发读
- 排他锁:独占,阻塞所有
- 只有S+S兼容,其他都冲突

22. 什么是共享锁（S锁）和排他锁（X锁）？
### 23. 什么是意向锁?

#### 核心答案

**意向锁**(Intention Lock):表级锁,用于表明事务"打算"对表中的某些行加什么类型的锁。

**作用**:简化表锁和行锁的冲突检测,提高加表锁的效率。

**类型**:
- **意向共享锁**(IS):表示事务打算给表中的某些行加共享锁(S锁)
- **意向排他锁**(IX):表示事务打算给表中的某些行加排他锁(X锁)

#### 详细说明

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">意向锁工作原理</text>
<rect x="50" y="70" width="800" height="120" fill="#f0f4f8" stroke="#64748b" stroke-width="2" rx="8"/>
<text x="450" y="100" text-anchor="middle" font-size="18" fill="#1e293b" font-weight="bold">为什么需要意向锁?</text>
<rect x="70" y="120" width="380" height="60" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="260" y="142" text-anchor="middle" font-size="15" fill="#b91c1c" font-weight="bold">❌ 没有意向锁的问题</text>
<text x="80" y="165" font-size="13" fill="#475569">事务A:加表锁前,需要遍历所有行</text>
<text x="80" y="182" font-size="13" fill="#475569">检查是否有行锁 → O(n) 很慢!</text>
<rect x="470" y="120" width="360" height="60" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="5"/>
<text x="650" y="142" text-anchor="middle" font-size="15" fill="#15803d" font-weight="bold">✅ 有意向锁的优化</text>
<text x="480" y="165" font-size="13" fill="#475569">事务A:只需检查表级意向锁</text>
<text x="480" y="182" font-size="13" fill="#475569">→ O(1) 很快!</text>
<rect x="50" y="220" width="390" height="350" fill="#dbeafe" stroke="#2563eb" stroke-width="2" rx="8"/>
<text x="245" y="250" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e40af">意向共享锁 (IS)</text>
<text x="70" y="285" font-size="15" fill="#1e293b" font-weight="bold">定义:</text>
<text x="80" y="310" font-size="13" fill="#334155">表示事务打算对表中某些行</text>
<text x="80" y="330" font-size="13" fill="#334155">加共享锁(S锁)</text>
<text x="70" y="365" font-size="15" fill="#1e293b" font-weight="bold">触发时机:</text>
<text x="80" y="390" font-size="13" fill="#334155">SELECT ... LOCK IN SHARE MODE</text>
<text x="80" y="410" font-size="13" fill="#334155">自动在表上加 IS 锁</text>
<text x="70" y="445" font-size="15" fill="#1e293b" font-weight="bold">特点:</text>
<text x="80" y="470" font-size="13" fill="#334155">✓ 表级锁(锁整张表)</text>
<text x="80" y="495" font-size="13" fill="#334155">✓ 与 IS、IX 兼容</text>
<text x="80" y="520" font-size="13" fill="#334155">✓ 与 X(表锁) 冲突</text>
<text x="80" y="545" font-size="13" fill="#334155">✓ 允许其他事务读行</text>
<rect x="460" y="220" width="390" height="350" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="8"/>
<text x="655" y="250" text-anchor="middle" font-size="18" font-weight="bold" fill="#be185d">意向排他锁 (IX)</text>
<text x="480" y="285" font-size="15" fill="#1e293b" font-weight="bold">定义:</text>
<text x="490" y="310" font-size="13" fill="#334155">表示事务打算对表中某些行</text>
<text x="490" y="330" font-size="13" fill="#334155">加排他锁(X锁)</text>
<text x="480" y="365" font-size="15" fill="#1e293b" font-weight="bold">触发时机:</text>
<text x="490" y="390" font-size="13" fill="#334155">SELECT ... FOR UPDATE</text>
<text x="490" y="410" font-size="13" fill="#334155">UPDATE / DELETE / INSERT</text>
<text x="490" y="430" font-size="13" fill="#334155">自动在表上加 IX 锁</text>
<text x="480" y="465" font-size="15" fill="#1e293b" font-weight="bold">特点:</text>
<text x="490" y="490" font-size="13" fill="#334155">✓ 表级锁(锁整张表)</text>
<text x="490" y="515" font-size="13" fill="#334155">✓ 与 IS、IX 兼容</text>
<text x="490" y="540" font-size="13" fill="#334155">✓ 与 S、X(表锁) 冲突</text>
</svg>

**意向锁的兼容性矩阵**:

| 已有锁 ↓ \ 请求锁 → | IS(意向共享) | IX(意向排他) | S(表共享) | X(表排他) |
|-------------------|-------------|-------------|----------|----------|
| **IS** | ✅ 兼容 | ✅ 兼容 | ✅ 兼容 | ❌ 冲突 |
| **IX** | ✅ 兼容 | ✅ 兼容 | ❌ 冲突 | ❌ 冲突 |
| **S** | ✅ 兼容 | ❌ 冲突 | ✅ 兼容 | ❌ 冲突 |
| **X** | ❌ 冲突 | ❌ 冲突 | ❌ 冲突 | ❌ 冲突 |

**关键规则**:
- **意向锁之间(IS与IX)**: 完全兼容
- **意向锁与行锁**: 不冲突(不同级别)
- **意向锁与表锁**: 可能冲突(同级别)

**意向锁的工作流程**:

```sql
-- 场景1: 加行级共享锁
BEGIN;
SELECT * FROM users WHERE id = 10 LOCK IN SHARE MODE;
-- 步骤:
-- 1. 自动在表上加 IS 锁
-- 2. 在 id=10 的行上加 S 锁
COMMIT;

-- 场景2: 加行级排他锁
BEGIN;
UPDATE users SET name = 'Alice' WHERE id = 10;
-- 步骤:
-- 1. 自动在表上加 IX 锁
-- 2. 在 id=10 的行上加 X 锁
COMMIT;
```

**为什么需要意向锁? - 性能优化示例**:

```sql
-- 假设: 事务A正在修改 id=10 的行(持有行级X锁)
-- 事务B想要加表级X锁

-- ❌ 没有意向锁:
-- 事务B必须遍历所有行,检查是否有行锁
-- 如果表有100万行 → 需要检查100万次 → 很慢!

-- ✅ 有意向锁:
-- 1. 事务A加行锁时,自动在表上加 IX 锁
-- 2. 事务B加表锁时,只需检查表的 IX 锁
-- 3. 发现 IX 锁,知道表内有行被锁定,直接阻塞
-- → 只需1次检查 → 很快!
```

**意向锁与表锁、行锁的关系**:

```
                表 (Table)
                  |
        +---------+---------+
        |                   |
    意向锁 IS/IX          表锁 S/X
   (表级,不实际锁行)      (表级,锁全表)
        |
      行锁 S/X
   (行级,锁具体行)
```

**完整示例**:

```sql
-- 事务A: 修改一行
BEGIN;
UPDATE users SET name = 'Alice' WHERE id = 10;
-- 加锁过程:
-- 1. 在表上自动加 IX 锁
-- 2. 在 id=10 行上加 X 锁

-- 事务B: 尝试加表锁
LOCK TABLES users WRITE;  -- 请求表级 X 锁
-- 检查过程:
-- 1. 检查表上的意向锁
-- 2. 发现 IX 锁存在
-- 3. IX 与 X(表锁) 冲突
-- 4. 阻塞等待

-- 事务C: 修改另一行
BEGIN;
UPDATE users SET name = 'Bob' WHERE id = 20;
-- ✅ 成功:
-- 1. 在表上加 IX 锁 (IX 与 IX 兼容)
-- 2. 在 id=20 行上加 X 锁 (不同行)
```

**意向锁的特点总结**:

1. **自动加锁**: 用户无需手动操作,InnoDB自动管理
2. **表级锁**: 虽然是表级,但不会阻塞行级操作
3. **优化性能**: O(n) → O(1) 的检测优化
4. **透明**: 对用户透明,不影响正常的锁使用

**查看意向锁**:

```sql
-- 查看当前锁信息
SELECT * FROM performance_schema.data_locks;

-- 查看锁等待
SELECT * FROM performance_schema.data_lock_waits;

-- 示例输出:
-- LOCK_TYPE | LOCK_MODE | OBJECT_NAME
-- TABLE     | IX        | users        (意向排他锁)
-- RECORD    | X         | users        (行级排他锁)
```

#### 关键要点

- **意向锁**:表级锁,表明事务打算对某些行加锁
- **类型**: IS(打算加S锁)、IX(打算加X锁)
- **自动加锁**:加行锁时自动加意向锁
- **优化性能**:快速判断表锁与行锁是否冲突,O(n)→O(1)
- **兼容性**:IS与IX完全兼容,与表锁可能冲突
- **透明**:用户无需关心,InnoDB自动管理

#### 记忆口诀

**"意向表锁不锁行,快速检测防遍历,IS共享IX排他,行锁自动带意向"**
- 意向锁是表级锁,但不实际锁行
- 避免遍历所有行检查冲突
- IS表示打算加S锁,IX表示打算加X锁
- 加行锁时自动加意向锁

23. 什么是意向锁？
### 24. 什么是间隙锁、临键锁?

#### 核心答案

**间隙锁**(Gap Lock):锁定索引记录之间的间隙,防止其他事务在间隙中插入数据,防止幻读。

**临键锁**(Next-Key Lock):记录锁+间隙锁,锁定索引记录及其前面的间隙,InnoDB默认使用。

**作用**:在REPEATABLE READ隔离级别下防止幻读问题。

#### 详细说明

<svg viewBox="0 0 900 580" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">间隙锁与临键锁</text>
<rect x="50" y="70" width="380" height="230" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="8"/>
<text x="240" y="100" text-anchor="middle" font-size="20" font-weight="bold" fill="#15803d">记录锁 (Record Lock)</text>
<text x="70" y="135" font-size="15" fill="#1e293b" font-weight="bold">锁定范围:</text>
<text x="80" y="160" font-size="13" fill="#334155">只锁定单个索引记录</text>
<rect x="100" y="180" width="240" height="100" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="220" y="200" text-anchor="middle" font-size="12" fill="#475569">索引值: 1  5  10  15  20</text>
<line x1="110" y1="210" x2="330" y2="210" stroke="#cbd5e1" stroke-width="1"/>
<circle cx="178" cy="240" r="8" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
<text x="220" y="245" text-anchor="middle" font-size="13" fill="#166534" font-weight="bold">锁 id=10</text>
<text x="220" y="263" text-anchor="middle" font-size="11" fill="#475569">只锁这个记录</text>
<rect x="470" y="70" width="380" height="230" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
<text x="660" y="100" text-anchor="middle" font-size="20" font-weight="bold" fill="#d97706">间隙锁 (Gap Lock)</text>
<text x="490" y="135" font-size="15" fill="#1e293b" font-weight="bold">锁定范围:</text>
<text x="500" y="160" font-size="13" fill="#334155">锁定索引记录之间的间隙</text>
<rect x="520" y="180" width="240" height="100" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="640" y="200" text-anchor="middle" font-size="12" fill="#475569">索引值: 1  5  10  15  20</text>
<line x1="530" y1="210" x2="750" y2="210" stroke="#cbd5e1" stroke-width="1"/>
<rect x="608" y="225" width="64" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="3"/>
<text x="640" y="245" text-anchor="middle" font-size="13" fill="#78350f" font-weight="bold">锁 (10,15)</text>
<text x="640" y="263" text-anchor="middle" font-size="11" fill="#475569">锁间隙,不锁记录</text>
<rect x="50" y="330" width="800" height="230" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="8"/>
<text x="450" y="360" text-anchor="middle" font-size="20" font-weight="bold" fill="#be185d">临键锁 (Next-Key Lock) = 记录锁 + 间隙锁</text>
<text x="70" y="395" font-size="15" fill="#1e293b" font-weight="bold">锁定范围:</text>
<text x="80" y="420" font-size="13" fill="#334155">锁定索引记录 + 记录前的间隙</text>
<rect x="150" y="440" width="600" height="100" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="450" y="460" text-anchor="middle" font-size="12" fill="#475569">索引值: 1  5  10  15  20</text>
<line x1="170" y1="470" x2="730" y2="470" stroke="#cbd5e1" stroke-width="1"/>
<rect x="338" y="485" width="104" height="40" fill="#fecaca" stroke="#dc2626" stroke-width="2" rx="3"/>
<text x="390" y="500" text-anchor="middle" font-size="13" fill="#7f1d1d" font-weight="bold">锁 (5, 10]</text>
<text x="390" y="515" text-anchor="middle" font-size="11" fill="#475569">间隙 (5,10)</text>
<text x="390" y="528" text-anchor="middle" font-size="11" fill="#475569">+ 记录 10</text>
</svg>

**三种锁的对比**:

| 锁类型 | 锁定范围 | 防止插入 | 防止幻读 | 使用场景 |
|-------|---------|---------|---------|---------|
| **记录锁** | 单个索引记录 | ❌ 否 | ❌ 否 | 精确匹配查询 |
| **间隙锁** | 索引记录之间 | ✅ 是 | ✅ 是 | 范围查询 |
| **临键锁** | 记录+前间隙 | ✅ 是 | ✅ 是 | RR级别默认 |

**间隙锁的工作原理**:

```sql
-- 假设表中有索引值: 1, 5, 10, 15, 20
-- 间隙: (-∞,1), (1,5), (5,10), (10,15), (15,20), (20,+∞)

-- 事务A: 范围查询
BEGIN;
SELECT * FROM users WHERE id BETWEEN 5 AND 15 FOR UPDATE;
-- 加锁范围:
-- 1. 记录锁: id=5, id=10, id=15
-- 2. 间隙锁: (5,10), (10,15)
-- 总共: (5, 15] 临键锁

-- 事务B: 尝试插入
INSERT INTO users (id, name) VALUES (7, 'Alice');
-- ❌ 阻塞! 因为 7 在间隙 (5,10) 中,被间隙锁锁定

INSERT INTO users (id, name) VALUES (3, 'Bob');
-- ✅ 成功! 因为 3 在间隙 (1,5) 中,未被锁定
```

**临键锁的示例**:

```sql
-- 场景: 防止幻读
-- 表中数据: id = 1, 5, 10, 15, 20

-- 事务A
BEGIN;
SELECT * FROM users WHERE id > 5 AND id <= 15 FOR UPDATE;
-- InnoDB 使用临键锁:
-- (5,10] → 锁间隙(5,10)和记录10
-- (10,15] → 锁间隙(10,15)和记录15

-- 事务B
INSERT INTO users (id, name) VALUES (7, 'Alice');
-- ❌ 阻塞! id=7 在间隙 (5,10) 中

INSERT INTO users (id, name) VALUES (12, 'Bob');
-- ❌ 阻塞! id=12 在间隙 (10,15) 中

INSERT INTO users (id, name) VALUES (3, 'Charlie');
-- ✅ 成功! id=3 在间隙 (1,5) 中,未被锁定
```

**间隙锁的特点**:

1. **只在RR级别存在**: READ COMMITTED不使用间隙锁
2. **只锁间隙不锁记录**: 允许其他事务读取记录
3. **防止插入**: 阻止在间隙中INSERT
4. **可能降低并发**: 锁定范围较大

**临键锁的加锁规则**:

```sql
-- 规则1: 唯一索引等值查询
-- 记录存在 → 退化为记录锁
SELECT * FROM users WHERE id = 10 FOR UPDATE;
-- 只锁 id=10,不锁间隙

-- 记录不存在 → 退化为间隙锁
SELECT * FROM users WHERE id = 7 FOR UPDATE;
-- 锁间隙 (5,10),不锁记录

-- 规则2: 非唯一索引等值查询
SELECT * FROM users WHERE age = 25 FOR UPDATE;
-- 临键锁 + 间隙锁

-- 规则3: 范围查询
SELECT * FROM users WHERE id > 10 FOR UPDATE;
-- 使用临键锁,锁 (10,+∞)
```

**幻读问题与间隙锁**:

```sql
-- 没有间隙锁的幻读问题:
-- 时间  事务A                              事务B
-- T1    BEGIN
-- T2    SELECT * FROM users WHERE id BETWEEN 5 AND 15;
--       (返回 id=5, 10, 15 三条记录)
-- T3                                       INSERT INTO users VALUES (7, ...);
--                                          COMMIT;
-- T4    SELECT * FROM users WHERE id BETWEEN 5 AND 15;
--       (返回 id=5, 7, 10, 15 四条记录)
--       → 幻读! 凭空多了一条记录

-- 有间隙锁防止幻读:
-- T1    BEGIN
-- T2    SELECT * FROM users WHERE id BETWEEN 5 AND 15 FOR UPDATE;
--       (加临键锁: (5,15])
-- T3                                       INSERT INTO users VALUES (7, ...);
--                                          ❌ 阻塞等待
-- T4    SELECT * FROM users WHERE id BETWEEN 5 AND 15;
--       (依然是 id=5, 10, 15 三条记录)
-- T5    COMMIT
--       → 没有幻读!
```

**间隙锁的冲突与兼容**:

```sql
-- ✅ 间隙锁之间不冲突
-- 事务A
SELECT * FROM users WHERE id BETWEEN 5 AND 15 FOR UPDATE;
-- 加间隙锁 (5,15)

-- 事务B
SELECT * FROM users WHERE id BETWEEN 5 AND 15 LOCK IN SHARE MODE;
-- ✅ 也可以加间隙锁 (5,15)
-- 间隙锁之间不冲突!

-- ❌ 间隙锁阻止插入
-- 事务C
INSERT INTO users VALUES (7, ...);
-- ❌ 阻塞! 与间隙锁冲突
```

**如何避免间隙锁带来的问题**:

```sql
-- 1. 降低隔离级别为 READ COMMITTED
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- RC 级别不使用间隙锁,但可能出现幻读

-- 2. 使用唯一索引精确匹配
-- ✅ 好: 唯一索引等值查询,只加记录锁
SELECT * FROM users WHERE id = 10 FOR UPDATE;

-- ❌ 差: 范围查询,会加间隙锁
SELECT * FROM users WHERE id > 5 FOR UPDATE;

-- 3. 优化查询条件,缩小锁定范围
-- ❌ 锁定范围大
SELECT * FROM users WHERE create_time > '2024-01-01' FOR UPDATE;

-- ✅ 锁定范围小
SELECT * FROM users
WHERE create_time > '2024-01-01'
  AND id < 1000
FOR UPDATE;
```

**查看当前锁信息**:

```sql
-- 查看锁信息
SELECT * FROM performance_schema.data_locks;

-- 示例输出:
-- LOCK_TYPE | LOCK_MODE    | INDEX_NAME | LOCK_DATA
-- RECORD    | X            | PRIMARY    | 10          (记录锁)
-- RECORD    | X,GAP        | PRIMARY    | 15          (间隙锁)
-- RECORD    | X            | PRIMARY    | 15          (临键锁=记录+间隙)
```

#### 关键要点

- **记录锁**:锁单个索引记录
- **间隙锁**:锁索引记录之间的间隙,防止插入
- **临键锁**:记录锁+间隙锁,InnoDB RR级别默认
- **防幻读**:间隙锁和临键锁防止幻读
- **只在RR级别**:READ COMMITTED不使用间隙锁
- **间隙锁兼容**:多个事务可同时持有同一间隙锁
- **降低并发**:锁定范围大,可能降低并发性能

#### 记忆口诀

**"记录单点,间隙范围,临键两者,防止幻读"**
- 记录锁:锁单个记录
- 间隙锁:锁记录间隙
- 临键锁:记录+间隙
- 作用:防止幻读

24. 什么是间隙锁、临键锁？
### 25. 如何避免死锁?

#### 核心答案

**死锁**:两个或多个事务相互等待对方释放锁,导致永久阻塞。

**避免死锁的方法**:
1. 固定加锁顺序
2. 尽量使用索引,减少锁范围
3. 降低事务隔离级别
4. 合理设计索引,避免间隙锁
5. 为事务设置超时时间
6. 使用乐观锁代替悲观锁

#### 详细说明

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">死锁示例与避免方法</text>
<rect x="50" y="70" width="380" height="180" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="8"/>
<text x="240" y="100" text-anchor="middle" font-size="18" font-weight="bold" fill="#b91c1c">❌ 死锁场景</text>
<text x="70" y="135" font-size="14" fill="#1e293b" font-weight="bold">事务A:</text>
<text x="80" y="160" font-size="13" fill="#475569">1. 锁住资源 R1</text>
<text x="80" y="180" font-size="13" fill="#475569">2. 尝试锁 R2 (等待B释放)</text>
<text x="70" y="210" font-size="14" fill="#1e293b" font-weight="bold">事务B:</text>
<text x="80" y="235" font-size="13" fill="#475569">1. 锁住资源 R2</text>
<text x="240" y="213" text-anchor="middle" font-size="18" fill="#dc2626">⚠</text>
<text x="80" y="255" font-size="13" fill="#475569">2. 尝试锁 R1 (等待A释放)</text>
<path d="M 350 150 Q 450 120, 480 150" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-red)" fill="none"/>
<path d="M 480 230 Q 450 260, 350 230" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-red)" fill="none"/>
<defs><marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#dc2626"/></marker></defs>
<text x="415" y="115" text-anchor="middle" font-size="12" fill="#dc2626" font-weight="bold">互相等待</text>
<text x="415" y="265" text-anchor="middle" font-size="12" fill="#dc2626" font-weight="bold">形成死锁</text>
<rect x="470" y="70" width="380" height="180" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="8"/>
<text x="660" y="100" text-anchor="middle" font-size="18" font-weight="bold" fill="#15803d">✅ 避免死锁</text>
<text x="490" y="135" font-size="14" fill="#1e293b" font-weight="bold">事务A:</text>
<text x="500" y="160" font-size="13" fill="#475569">1. 先锁 R1 (id小的)</text>
<text x="500" y="180" font-size="13" fill="#475569">2. 再锁 R2</text>
<text x="490" y="210" font-size="14" fill="#1e293b" font-weight="bold">事务B:</text>
<text x="500" y="235" font-size="13" fill="#475569">1. 先锁 R1 (id小的)</text>
<text x="660" y="213" text-anchor="middle" font-size="18" fill="#22c55e">✓</text>
<text x="500" y="255" font-size="13" fill="#475569">2. 再锁 R2</text>
<line x1="720" y1="160" x2="720" y2="235" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow-green)"/>
<defs><marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#22c55e"/></marker></defs>
<text x="750" y="200" font-size="12" fill="#15803d" font-weight="bold">顺序一致</text>
<text x="750" y="215" font-size="12" fill="#15803d" font-weight="bold">不会死锁</text>
<rect x="50" y="280" width="800" height="200" fill="#f0f4f8" stroke="#64748b" stroke-width="2" rx="8"/>
<text x="450" y="310" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">避免死锁的6大方法</text>
<rect x="70" y="330" width="250" height="135" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="195" y="355" text-anchor="middle" font-size="15" fill="#1e40af" font-weight="bold">程序设计</text>
<text x="80" y="380" font-size="13" fill="#334155">1. 固定加锁顺序</text>
<text x="80" y="405" font-size="13" fill="#334155">2. 缩短事务时间</text>
<text x="80" y="430" font-size="13" fill="#334155">3. 一次性锁定所有资源</text>
<text x="80" y="455" font-size="13" fill="#334155">4. 使用乐观锁</text>
<rect x="340" y="330" width="250" height="135" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="465" y="355" text-anchor="middle" font-size="15" fill="#15803d" font-weight="bold">数据库配置</text>
<text x="350" y="380" font-size="13" fill="#334155">5. 降低隔离级别(RC)</text>
<text x="350" y="405" font-size="13" fill="#334155">6. 添加索引减少锁范围</text>
<text x="350" y="430" font-size="13" fill="#334155">7. 设置锁超时时间</text>
<text x="350" y="455" font-size="13" fill="#334155">8. 开启死锁检测</text>
<rect x="610" y="330" width="220" height="135" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="720" y="355" text-anchor="middle" font-size="15" fill="#d97706" font-weight="bold">监控处理</text>
<text x="620" y="380" font-size="13" fill="#334155">9. 监控死锁日志</text>
<text x="620" y="405" font-size="13" fill="#334155">10. 定期分析优化</text>
<text x="620" y="430" font-size="13" fill="#334155">11. 业务重试机制</text>
</svg>

**死锁示例**:

```sql
-- ❌ 死锁场景
-- 事务A
BEGIN;
UPDATE account SET balance = balance - 100 WHERE id = 1;  -- 锁 id=1
-- 等待 1 秒
UPDATE account SET balance = balance + 100 WHERE id = 2;  -- 请求 id=2,等待

-- 事务B (同时进行)
BEGIN;
UPDATE account SET balance = balance - 50 WHERE id = 2;   -- 锁 id=2
-- 等待 1 秒
UPDATE account SET balance = balance + 50 WHERE id = 1;   -- 请求 id=1,等待

-- 结果: 死锁! A等B释放id=2, B等A释放id=1
-- MySQL检测到死锁,自动回滚其中一个事务
```

**避免方法1: 固定加锁顺序**

```sql
-- ✅ 正确做法: 统一按 id 升序加锁
-- 事务A
BEGIN;
UPDATE account SET balance = balance - 100 WHERE id = 1;  -- 先锁小id
UPDATE account SET balance = balance + 100 WHERE id = 2;  -- 再锁大id
COMMIT;

-- 事务B
BEGIN;
UPDATE account SET balance = balance + 50 WHERE id = 1;   -- 先锁小id
UPDATE account SET balance = balance - 50 WHERE id = 2;   -- 再锁大id
COMMIT;

-- 结果: 不会死锁! 两个事务都按id顺序加锁
```

**避免方法2: 尽量使用索引,减少锁范围**

```sql
-- ❌ 没有索引,锁整张表
UPDATE users SET status = 'active' WHERE name = 'Alice';
-- 如果 name 无索引,会锁整张表,容易死锁

-- ✅ 有索引,只锁行
CREATE INDEX idx_name ON users(name);
UPDATE users SET status = 'active' WHERE name = 'Alice';
-- 只锁 name='Alice' 的行,减少冲突
```

**避免方法3: 降低事务隔离级别**

```sql
-- ❌ RR 级别使用间隙锁,容易死锁
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
SELECT * FROM users WHERE id BETWEEN 5 AND 15 FOR UPDATE;
-- 锁 (5,15] 包括间隙,范围大

-- ✅ RC 级别不使用间隙锁
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN;
SELECT * FROM users WHERE id BETWEEN 5 AND 15 FOR UPDATE;
-- 只锁存在的记录,不锁间隙,范围小
```

**避免方法4: 缩短事务时间**

```sql
-- ❌ 事务时间长
BEGIN;
SELECT * FROM users WHERE id = 1 FOR UPDATE;
-- ... 执行复杂业务逻辑(5秒)
-- ... 调用外部API(10秒)
UPDATE users SET status = 'done' WHERE id = 1;
COMMIT;  -- 事务持续15秒

-- ✅ 缩短事务时间
-- 1. 先执行业务逻辑
-- 业务逻辑计算...
-- 调用外部API...

-- 2. 最后快速提交事务
BEGIN;
SELECT * FROM users WHERE id = 1 FOR UPDATE;
UPDATE users SET status = 'done' WHERE id = 1;
COMMIT;  -- 事务只持续0.1秒
```

**避免方法5: 一次性锁定所有资源**

```sql
-- ❌ 分批加锁
BEGIN;
UPDATE account SET balance = balance - 100 WHERE id = 1;
-- ... 中间可能被打断
UPDATE account SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- ✅ 一次性锁定
BEGIN;
SELECT * FROM account WHERE id IN (1, 2) FOR UPDATE;  -- 一次性锁定
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

**避免方法6: 使用乐观锁代替悲观锁**

```sql
-- 悲观锁 (容易死锁)
BEGIN;
SELECT * FROM product WHERE id = 1 FOR UPDATE;
UPDATE product SET stock = stock - 1 WHERE id = 1;
COMMIT;

-- 乐观锁 (不使用锁,不会死锁)
-- 1. 读取数据和版本号
SELECT id, stock, version FROM product WHERE id = 1;
-- stock=10, version=5

-- 2. 更新时检查版本号
UPDATE product
SET stock = stock - 1, version = version + 1
WHERE id = 1 AND version = 5;  -- 版本号匹配才更新

-- 如果更新失败(affected rows = 0),说明被其他事务修改过,重试
```

**死锁检测与处理**:

```sql
-- 1. 查看死锁日志
SHOW ENGINE INNODB STATUS;
-- 输出包含 "LATEST DETECTED DEADLOCK" 部分

-- 2. 设置锁等待超时时间
SET innodb_lock_wait_timeout = 50;  -- 默认50秒

-- 3. 开启死锁检测(默认开启)
SET GLOBAL innodb_deadlock_detect = ON;

-- 4. 查看当前锁等待
SELECT * FROM performance_schema.data_lock_waits;

-- 5. 查看锁持有情况
SELECT * FROM performance_schema.data_locks;
```

**应用层处理死锁**:

```java
// 捕获死锁异常,自动重试
int maxRetries = 3;
for (int i = 0; i < maxRetries; i++) {
    try {
        // 执行事务
        transferMoney(fromId, toId, amount);
        break;  // 成功,跳出
    } catch (DeadlockException e) {
        if (i == maxRetries - 1) {
            throw e;  // 最后一次还失败,抛出异常
        }
        // 等待一段随机时间后重试
        Thread.sleep((long)(Math.random() * 1000));
    }
}
```

**死锁避免原则总结**:

1. **程序设计**:
   - 统一加锁顺序(按id升序)
   - 缩短事务时间
   - 一次性锁定所有资源
   - 避免用户交互

2. **数据库优化**:
   - 添加索引,减少锁范围
   - 降低隔离级别(RC)
   - 合理设计事务

3. **监控处理**:
   - 监控死锁日志
   - 设置超时时间
   - 应用层重试机制

#### 关键要点

- **死锁原因**:相互等待对方释放锁
- **核心方法**:固定加锁顺序,按id升序
- **减少锁范围**:使用索引,避免全表锁
- **降低隔离级别**:RC不使用间隙锁
- **缩短事务**:减少锁持有时间
- **乐观锁**:不加锁,使用版本号
- **自动检测**:MySQL自动检测并回滚

#### 记忆口诀

**"顺序一致索引全,降级缩短快提交,乐观重试不怕死"**
- 顺序一致:固定加锁顺序
- 索引全:使用索引,减少锁范围
- 降级:降低隔离级别
- 缩短:缩短事务时间
- 快提交:避免长时间持锁
- 乐观:使用乐观锁
- 重试:应用层重试机制

25. 如何避免死锁？
### 26. 什么是乐观锁和悲观锁?如何实现?

#### 核心答案

**悲观锁**(Pessimistic Lock):假设会发生冲突,在操作前先加锁。MySQL的`FOR UPDATE`、`LOCK IN SHARE MODE`都是悲观锁。

**乐观锁**(Optimistic Lock):假设不会发生冲突,不加锁,通过版本号或CAS机制在更新时检查数据是否被修改。

**对比**:
- 悲观锁:先加锁再操作,高冲突场景
- 乐观锁:先操作再检查,低冲突场景

#### 详细说明

<svg viewBox="0 0 900 550" xmlns="http://www.w3.org/2000/svg">
<text x="450" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">乐观锁 vs 悲观锁</text>
<rect x="50" y="70" width="380" height="240" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="8"/>
<text x="240" y="100" text-anchor="middle" font-size="20" font-weight="bold" fill="#b91c1c">悲观锁 (Pessimistic)</text>
<text x="70" y="135" font-size="15" fill="#1e293b" font-weight="bold">核心思想:</text>
<text x="80" y="160" font-size="13" fill="#475569">假设一定会冲突,先加锁</text>
<text x="70" y="190" font-size="15" fill="#1e293b" font-weight="bold">流程:</text>
<rect x="80" y="205" width="320" height="90" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="90" y="225" font-size="13" fill="#334155">1. 开始事务</text>
<text x="90" y="245" font-size="13" fill="#dc2626" font-weight="bold">2. 加锁 (FOR UPDATE)</text>
<text x="90" y="265" font-size="13" fill="#334155">3. 读取数据</text>
<text x="90" y="285" font-size="13" fill="#334155">4. 修改数据</text>
<rect x="470" y="70" width="380" height="240" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="8"/>
<text x="660" y="100" text-anchor="middle" font-size="20" font-weight="bold" fill="#15803d">乐观锁 (Optimistic)</text>
<text x="490" y="135" font-size="15" fill="#1e293b" font-weight="bold">核心思想:</text>
<text x="500" y="160" font-size="13" fill="#475569">假设不会冲突,不加锁</text>
<text x="490" y="190" font-size="15" fill="#1e293b" font-weight="bold">流程:</text>
<rect x="500" y="205" width="320" height="90" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="510" y="225" font-size="13" fill="#334155">1. 读取数据+版本号</text>
<text x="510" y="245" font-size="13" fill="#334155">2. 修改数据</text>
<text x="510" y="265" font-size="13" fill="#22c55e" font-weight="bold">3. 更新时检查版本号</text>
<text x="510" y="285" font-size="13" fill="#334155">4. 失败则重试</text>
<rect x="50" y="330" width="800" height="200" fill="#f0f4f8" stroke="#64748b" stroke-width="2" rx="8"/>
<text x="450" y="360" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">详细对比</text>
<rect x="70" y="380" width="110" height="30" fill="#cbd5e1"/>
<text x="125" y="400" text-anchor="middle" font-size="14" fill="#1e293b" font-weight="bold">对比项</text>
<rect x="190" y="380" width="150" height="30" fill="#fee2e2"/>
<text x="265" y="400" text-anchor="middle" font-size="14" fill="#b91c1c" font-weight="bold">悲观锁</text>
<rect x="350" y="380" width="150" height="30" fill="#dcfce7"/>
<text x="425" y="400" text-anchor="middle" font-size="14" fill="#15803d" font-weight="bold">乐观锁</text>
<rect x="70" y="420" width="110" height="30" fill="#ffffff"/>
<text x="125" y="440" text-anchor="middle" font-size="13" fill="#334155">加锁时机</text>
<rect x="190" y="420" width="150" height="30" fill="#ffffff"/>
<text x="265" y="440" text-anchor="middle" font-size="12" fill="#475569">操作前加锁</text>
<rect x="350" y="420" width="150" height="30" fill="#ffffff"/>
<text x="425" y="440" text-anchor="middle" font-size="12" fill="#475569">不加锁</text>
<rect x="70" y="460" width="110" height="30" fill="#ffffff"/>
<text x="125" y="480" text-anchor="middle" font-size="13" fill="#334155">性能</text>
<rect x="190" y="460" width="150" height="30" fill="#ffffff"/>
<text x="265" y="480" text-anchor="middle" font-size="12" fill="#475569">并发低</text>
<rect x="350" y="460" width="150" height="30" fill="#ffffff"/>
<text x="425" y="480" text-anchor="middle" font-size="12" fill="#475569">并发高</text>
<rect x="70" y="500" width="110" height="20" fill="#ffffff"/>
<text x="125" y="515" text-anchor="middle" font-size="13" fill="#334155">适用场景</text>
<rect x="190" y="500" width="150" height="20" fill="#ffffff"/>
<text x="265" y="515" text-anchor="middle" font-size="11" fill="#475569">写多读少</text>
<rect x="350" y="500" width="150" height="20" fill="#ffffff"/>
<text x="425" y="515" text-anchor="middle" font-size="11" fill="#475569">读多写少</text>
<rect x="520" y="380" width="310" height="140" fill="#ffffff" stroke="#94a3b8" stroke-width="1" rx="5"/>
<text x="675" y="400" text-anchor="middle" font-size="14" fill="#1e293b" font-weight="bold">选择建议</text>
<text x="530" y="425" font-size="12" fill="#dc2626" font-weight="bold">✓ 悲观锁:</text>
<text x="540" y="443" font-size="11" fill="#475569">冲突频繁、一致性要求高</text>
<text x="540" y="458" font-size="11" fill="#475569">如: 库存扣减、账户余额</text>
<text x="530" y="483" font-size="12" fill="#22c55e" font-weight="bold">✓ 乐观锁:</text>
<text x="540" y="501" font-size="11" fill="#475569">冲突少、性能要求高</text>
<text x="540" y="516" font-size="11" fill="#475569">如: 文章点赞、商品浏览</text>
</svg>

**悲观锁实现方式**:

```sql
-- 方式1: FOR UPDATE (排他锁)
BEGIN;
SELECT * FROM product WHERE id = 1 FOR UPDATE;
-- 其他事务被阻塞,等待锁释放
UPDATE product SET stock = stock - 1 WHERE id = 1;
COMMIT;

-- 方式2: LOCK IN SHARE MODE (共享锁)
BEGIN;
SELECT * FROM product WHERE id = 1 LOCK IN SHARE MODE;
-- 允许其他事务读,但不能写
-- 适用于读取后需要保证数据不被修改的场景
COMMIT;

-- 方式3: 表锁
LOCK TABLES product WRITE;
-- 锁整张表
UPDATE product SET stock = stock - 1 WHERE id = 1;
UNLOCK TABLES;
```

**乐观锁实现方式**:

**方式1: 版本号机制(Version)**

```sql
-- 表结构
CREATE TABLE product (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    stock INT,
    version INT DEFAULT 0  -- 版本号
);

-- 乐观锁更新流程
-- 1. 读取数据和版本号
SELECT id, stock, version FROM product WHERE id = 1;
-- 假设读到: id=1, stock=10, version=5

-- 2. 业务逻辑处理
-- ... 计算新的库存 ...

-- 3. 更新时检查版本号
UPDATE product
SET stock = stock - 1,
    version = version + 1
WHERE id = 1 AND version = 5;  -- 版本号匹配才更新

-- 4. 检查更新结果
-- affected rows = 1 → 更新成功
-- affected rows = 0 → 版本号已变,数据被其他事务修改,需要重试
```

**方式2: 时间戳机制**

```sql
-- 表结构
CREATE TABLE product (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    stock INT,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 乐观锁更新
-- 1. 读取数据和时间戳
SELECT id, stock, update_time FROM product WHERE id = 1;
-- 假设: update_time = '2024-01-01 10:00:00'

-- 2. 更新时检查时间戳
UPDATE product
SET stock = stock - 1
WHERE id = 1 AND update_time = '2024-01-01 10:00:00';

-- 3. 检查结果
-- affected rows = 1 → 成功
-- affected rows = 0 → 时间戳已变,需要重试
```

**方式3: 状态+条件更新(CAS)**

```sql
-- 不使用版本号,直接在UPDATE时检查数据
-- 适用于简单场景

-- 扣库存
UPDATE product
SET stock = stock - 1
WHERE id = 1 AND stock >= 1;  -- 库存足够才扣减

-- 修改状态
UPDATE order_table
SET status = 'processing'
WHERE id = 1 AND status = 'pending';  -- 状态为pending才能处理
```

**完整示例对比**:

```sql
-- 场景: 扣减库存

-- ❌ 不加锁 (可能超卖)
-- 事务A
SELECT stock FROM product WHERE id = 1;  -- stock=10
-- 事务B 同时读取
SELECT stock FROM product WHERE id = 1;  -- stock=10
-- 事务A 更新
UPDATE product SET stock = 9 WHERE id = 1;
-- 事务B 更新
UPDATE product SET stock = 9 WHERE id = 1;  -- 覆盖A的更新,实际卖了2个,库存应该是8

-- ✅ 悲观锁 (性能低但安全)
BEGIN;
SELECT stock FROM product WHERE id = 1 FOR UPDATE;  -- 加排他锁
-- 其他事务被阻塞
IF stock >= 1 THEN
    UPDATE product SET stock = stock - 1 WHERE id = 1;
END IF;
COMMIT;

-- ✅ 乐观锁 (性能高,需要重试)
-- 读取
SELECT id, stock, version FROM product WHERE id = 1;
-- stock=10, version=5

-- 更新
UPDATE product
SET stock = stock - 1, version = version + 1
WHERE id = 1 AND version = 5 AND stock >= 1;

-- 检查 affected rows
IF affected_rows = 0 THEN
    -- 冲突,重试
    RETRY;
END IF;
```

**Java实现乐观锁示例**:

```java
// 使用版本号的乐观锁
public boolean updateProductStock(int productId, int quantity) {
    int maxRetries = 3;
    for (int i = 0; i < maxRetries; i++) {
        // 1. 读取数据和版本号
        Product product = productDao.selectById(productId);
        int stock = product.getStock();
        int version = product.getVersion();

        // 2. 检查库存
        if (stock < quantity) {
            return false;  // 库存不足
        }

        // 3. 更新(带版本号检查)
        int affectedRows = productDao.updateWithVersion(
            productId,
            stock - quantity,
            version + 1,
            version  // WHERE version = ?
        );

        // 4. 检查结果
        if (affectedRows > 0) {
            return true;  // 更新成功
        }

        // 5. 版本号冲突,重试
        Thread.sleep(10);  // 短暂等待
    }

    return false;  // 重试次数耗尽
}
```

**乐观锁vs悲观锁选择**:

| 场景 | 推荐方案 | 原因 |
|-----|---------|------|
| **库存扣减** | 悲观锁 | 冲突频繁,需要强一致性 |
| **账户余额** | 悲观锁 | 金额敏感,不能出错 |
| **抢购秒杀** | 乐观锁 | 高并发,失败可重试 |
| **文章点赞** | 乐观锁 | 冲突少,性能优先 |
| **商品浏览** | 乐观锁 | 读多写少 |
| **订单状态** | 乐观锁 | 状态机转换 |

**乐观锁的优缺点**:

**优点**:
- 不加锁,并发性能高
- 不会产生死锁
- 适合读多写少场景

**缺点**:
- 需要重试机制
- 高冲突场景性能差(频繁重试)
- 需要应用层处理失败

**悲观锁的优缺点**:

**优点**:
- 数据一致性强
- 适合写多场景
- 不需要重试

**缺点**:
- 并发性能低
- 可能产生死锁
- 锁等待影响响应时间

#### 关键要点

- **悲观锁**:先加锁再操作,`FOR UPDATE`、`LOCK IN SHARE MODE`
- **乐观锁**:不加锁,版本号或CAS检查冲突
- **悲观锁适用**:写多读少,冲突频繁,一致性要求高
- **乐观锁适用**:读多写少,冲突少,性能要求高
- **实现方式**:
  - 悲观锁:数据库锁
  - 乐观锁:版本号、时间戳、CAS
- **重试机制**:乐观锁失败需要重试

#### 记忆口诀

**"悲观先锁后操作,乐观先操作后check,写多用悲观,读多用乐观"**
- 悲观:先锁后操作
- 乐观:先操作后检查
- 写多→悲观锁
- 读多→乐观锁


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

27. 如何分析 SQL 的性能？EXPLAIN 的作用是什么？

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

28. 如何优化慢查询？

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

29. 什么是 SQL 注入？如何防止？

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

31. 如何优化 INSERT 语句？
32. 如何优化分页查询？
33. 什么是子查询？什么情况下用 JOIN 替代子查询？

## 日志

34. MySQL 有哪些日志文件？
35. 什么是 binlog？有什么作用？
36. 什么是 redo log 和 undo log？
37. binlog 和 redo log 的区别是什么？
38. 什么是两阶段提交？

## 高可用与性能

39. 什么是主从复制？如何实现？
40. 主从复制有哪些模式？
41. 什么是读写分离？
42. 如何保证主从一致性？
43. 什么是分库分表？什么时候需要分库分表？
44. 垂直分库和水平分库的区别是什么？
45. 分库分表后如何解决跨库查询、事务问题？

## 其他

46. MySQL 如何实现排序？filesort 和 index sort 的区别？
47. MySQL 的架构是怎样的？
48. 什么是 MVCC？如何实现？
49. COUNT(*) 和 COUNT(1) 和 COUNT(列名) 的区别？
50. 如何设计一个高性能的数据库表？31. 如何优化 INSERT 语句？

### 核心答案
批量插入、禁用索引检查、使用事务、优化表结构。

### 详细说明

#### 1. 批量插入数据
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

#### 2. 关闭自动提交,使用事务
```sql
SET autocommit = 0;
BEGIN;
INSERT INTO users VALUES (1, 'Alice');
INSERT INTO users VALUES (2, 'Bob');
-- ... 更多插入
COMMIT;
SET autocommit = 1;
```

#### 3. 主键顺序插入
- 使用自增主键避免页分裂
- 顺序插入比随机插入快

#### 4. 临时禁用索引和约束检查
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

#### 5. 调整参数
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

### 关键要点
1. **批量插入**:减少网络开销和SQL解析
2. **使用事务**:减少磁盘刷新次数
3. **顺序插入**:利用聚簇索引特性
4. **禁用检查**:大批量导入时临时禁用
5. **调整参数**:根据业务调整MySQL参数

### 记忆口诀
**"批事顺禁调"**
- **批**:批量插入
- **事**:使用事务
- **顺**:顺序插入
- **禁**:禁用检查
- **调**:调整参数

32. 如何优化分页查询？

### 核心答案
使用延迟关联、子查询优化、基于游标的分页、避免大偏移量。

### 详细说明

#### 1. 深度分页问题
```sql
-- 问题:越往后翻页越慢
SELECT * FROM users ORDER BY id LIMIT 1000000, 10;
-- MySQL需要扫描1000010行,丢弃前1000000行
```

#### 2. 优化方案

**方案一:延迟关联(覆盖索引)**
```sql
-- 原始慢查询
SELECT * FROM users ORDER BY id LIMIT 1000000, 10;

-- 优化:先查ID,再关联
SELECT u.* FROM users u
INNER JOIN (
  SELECT id FROM users ORDER BY id LIMIT 1000000, 10
) AS t ON u.id = t.id;
-- 子查询只需要扫描索引,不需要回表
```

**方案二:基于游标(记录上次位置)**
```sql
-- 第一页
SELECT * FROM users WHERE id > 0 ORDER BY id LIMIT 10;
-- 返回最后一条id=10

-- 第二页(基于上一页最后一条记录)
SELECT * FROM users WHERE id > 10 ORDER BY id LIMIT 10;
-- 无需OFFSET,性能稳定
```

**方案三:使用BETWEEN**
```sql
-- 如果能计算出ID范围
SELECT * FROM users WHERE id BETWEEN 1000000 AND 1000010 ORDER BY id;
```

#### 3. 业务层优化
- **限制最大页码**:如只允许查看前100页
- **使用ES等搜索引擎**:深度分页场景
- **缓存热点数据**:前几页数据

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="20" width="700" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">分页查询性能对比</text>
<rect x="80" y="100" width="320" height="220" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="240" y="130" text-anchor="middle" font-size="16" font-weight="bold" fill="#c62828">❌ 传统LIMIT分页</text>
<text x="110" y="160" font-size="13" fill="#333" font-weight="bold">查询方式:</text>
<text x="110" y="185" font-size="12" fill="#555">SELECT * FROM users</text>
<text x="110" y="205" font-size="12" fill="#555">ORDER BY id</text>
<text x="110" y="225" font-size="12" fill="#555">LIMIT 1000000, 10;</text>
<text x="110" y="255" font-size="13" fill="#333" font-weight="bold">性能表现:</text>
<text x="120" y="280" font-size="11" fill="#d32f2f">• 扫描:1000010 行</text>
<text x="120" y="300" font-size="11" fill="#d32f2f">• 耗时:随偏移量线性增长</text>
<rect x="420" y="100" width="340" height="220" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="590" y="130" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">✓ 延迟关联优化</text>
<text x="450" y="160" font-size="13" fill="#333" font-weight="bold">查询方式:</text>
<text x="450" y="185" font-size="12" fill="#555">SELECT u.* FROM users u JOIN (</text>
<text x="460" y="205" font-size="12" fill="#555">SELECT id FROM users</text>
<text x="460" y="225" font-size="12" fill="#555">ORDER BY id LIMIT 1000000,10</text>
<text x="450" y="245" font-size="12" fill="#555">) t ON u.id = t.id;</text>
<text x="450" y="275" font-size="13" fill="#333" font-weight="bold">性能表现:</text>
<text x="460" y="300" font-size="11" fill="#2e7d32">• 扫描:1000010 索引(无回表)</text>
<text x="460" y="320" font-size="11" fill="#2e7d32">• 耗时:减少60%-80%</text>
<rect x="80" y="340" width="320" height="220" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="240" y="370" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">⚡ 游标分页(最佳)</text>
<text x="110" y="400" font-size="13" fill="#333" font-weight="bold">查询方式:</text>
<text x="110" y="425" font-size="12" fill="#555">SELECT * FROM users</text>
<text x="110" y="445" font-size="12" fill="#555">WHERE id > last_id</text>
<text x="110" y="465" font-size="12" fill="#555">ORDER BY id LIMIT 10;</text>
<text x="110" y="495" font-size="13" fill="#333" font-weight="bold">性能表现:</text>
<text x="120" y="520" font-size="11" fill="#e65100">• 扫描:仅10行</text>
<text x="120" y="540" font-size="11" fill="#e65100">• 耗时:恒定(不随页数增长)</text>
<rect x="420" y="340" width="340" height="220" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="590" y="370" text-anchor="middle" font-size="16" font-weight="bold" fill="#7b1fa2">性能数据对比</text>
<line x1="450" y1="390" x2="730" y2="390" stroke="#7b1fa2" stroke-width="1"/>
<text x="460" y="415" font-size="12" fill="#333" font-weight="bold">第1页(LIMIT 0,10):</text>
<text x="470" y="435" font-size="11" fill="#555">传统:0.01s | 优化:0.01s</text>
<text x="460" y="460" font-size="12" fill="#333" font-weight="bold">第100页(LIMIT 1000,10):</text>
<text x="470" y="480" font-size="11" fill="#555">传统:0.05s | 优化:0.02s</text>
<text x="460" y="505" font-size="12" fill="#333" font-weight="bold">第10万页(LIMIT 1000000,10):</text>
<text x="470" y="525" font-size="11" fill="#d32f2f">传统:5.2s | </text>
<text x="570" y="525" font-size="11" fill="#2e7d32">优化:1.5s | </text>
<text x="470" y="545" font-size="11" fill="#e65100">游标:0.01s</text>
</svg>

### 关键要点
1. **延迟关联**:利用覆盖索引减少回表
2. **游标分页**:WHERE id > last_id,性能最优
3. **限制深度**:业务上限制最大页码
4. **使用索引**:ORDER BY字段必须有索引
5. **ES替代**:深度分页用搜索引擎

### 记忆口诀
**"延游限索引"**
- **延**:延迟关联
- **游**:游标分页
- **限**:限制深度
- **索**:索引优化
- **引**:引入ES

33. 什么是子查询？什么情况下用 JOIN 替代子查询？

### 核心答案
子查询是嵌套在其他SQL语句中的SELECT查询。当子查询返回大量数据或被多次执行时,应该用JOIN替代以提升性能。

### 详细说明

#### 1. 什么是子查询
子查询是嵌套在主查询中的查询语句,可以出现在SELECT、FROM、WHERE等子句中。

**分类:**
- **标量子查询**:返回单个值
- **列子查询**:返回一列值
- **行子查询**:返回一行值
- **表子查询**:返回临时表

```sql
-- WHERE子查询
SELECT * FROM users WHERE dept_id IN (
  SELECT id FROM departments WHERE name = 'IT'
);

-- FROM子查询
SELECT * FROM (
  SELECT name, age FROM users WHERE age > 18
) AS adults;

-- SELECT子查询
SELECT name, (SELECT COUNT(*) FROM orders WHERE user_id = u.id) AS order_count
FROM users u;
```

#### 2. JOIN vs 子查询

**性能对比:**

```sql
-- 子查询(可能性能差)
SELECT * FROM orders WHERE user_id IN (
  SELECT id FROM users WHERE city = 'Beijing'
);

-- JOIN替代(通常更快)
SELECT o.* FROM orders o
INNER JOIN users u ON o.user_id = u.id
WHERE u.city = 'Beijing';
```

#### 3. 何时用JOIN替代子查询

**应该用JOIN的场景:**

1. **IN子查询返回大量数据**
   ```sql
   -- ❌ 子查询返回百万级数据
   SELECT * FROM orders WHERE user_id IN (
     SELECT id FROM users WHERE status = 'active'
   );

   -- ✓ 用JOIN替代
   SELECT o.* FROM orders o
   INNER JOIN users u ON o.user_id = u.id
   WHERE u.status = 'active';
   ```

2. **相关子查询(会被执行多次)**
   ```sql
   -- ❌ 每行都执行一次子查询
   SELECT name, (
     SELECT COUNT(*) FROM orders WHERE user_id = u.id
   ) AS order_count FROM users u;

   -- ✓ 用LEFT JOIN + GROUP BY
   SELECT u.name, COUNT(o.id) AS order_count
   FROM users u
   LEFT JOIN orders o ON u.id = o.user_id
   GROUP BY u.id;
   ```

3. **需要关联多个表**

**可以保留子查询的场景:**

1. **EXISTS/NOT EXISTS**(通常比JOIN快)
   ```sql
   -- ✓ EXISTS性能好
   SELECT * FROM users u WHERE EXISTS (
     SELECT 1 FROM orders o WHERE o.user_id = u.id
   );
   ```

2. **聚合函数结果作为过滤条件**
   ```sql
   -- ✓ 子查询更清晰
   SELECT * FROM users WHERE age > (
     SELECT AVG(age) FROM users
   );
   ```

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="20" width="700" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">子查询 vs JOIN 性能对比</text>
<rect x="80" y="100" width="320" height="200" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="240" y="130" text-anchor="middle" font-size="16" font-weight="bold" fill="#c62828">❌ IN子查询(慢)</text>
<text x="110" y="160" font-size="12" fill="#333" font-weight="bold">执行过程:</text>
<text x="120" y="185" font-size="11" fill="#555">1. 执行子查询,返回100万ID</text>
<text x="120" y="205" font-size="11" fill="#555">2. 主查询逐行比对IN列表</text>
<text x="120" y="225" font-size="11" fill="#555">3. 临时表存储中间结果</text>
<text x="110" y="255" font-size="12" fill="#333" font-weight="bold">性能问题:</text>
<text x="120" y="280" font-size="11" fill="#d32f2f">• 内存占用大</text>
<text x="240" y="280" font-size="11" fill="#d32f2f">• 比对效率低</text>
<rect x="420" y="100" width="340" height="200" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="590" y="130" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">✓ INNER JOIN(快)</text>
<text x="450" y="160" font-size="12" fill="#333" font-weight="bold">执行过程:</text>
<text x="460" y="185" font-size="11" fill="#555">1. 优化器选择驱动表</text>
<text x="460" y="205" font-size="11" fill="#555">2. 使用索引快速关联</text>
<text x="460" y="225" font-size="11" fill="#555">3. 流式处理,无需临时表</text>
<text x="450" y="255" font-size="12" fill="#333" font-weight="bold">性能优势:</text>
<text x="460" y="280" font-size="11" fill="#2e7d32">• 利用索引 • 流式处理 • 优化器智能</text>
<rect x="80" y="320" width="320" height="200" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="240" y="350" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">⚡ EXISTS子查询(推荐)</text>
<text x="110" y="380" font-size="12" fill="#333" font-weight="bold">特点:</text>
<text x="120" y="405" font-size="11" fill="#555">• 找到第一个匹配即停止</text>
<text x="120" y="425" font-size="11" fill="#555">• 不返回数据,只返回TRUE/FALSE</text>
<text x="120" y="445" font-size="11" fill="#555">• 适合判断存在性</text>
<text x="110" y="475" font-size="12" fill="#333" font-weight="bold">使用场景:</text>
<text x="120" y="500" font-size="11" fill="#e65100">检查关联数据是否存在</text>
<rect x="420" y="320" width="340" height="200" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="590" y="350" text-anchor="middle" font-size="16" font-weight="bold" fill="#7b1fa2">选择建议</text>
<text x="450" y="380" font-size="12" fill="#333" font-weight="bold">用JOIN的场景:</text>
<text x="460" y="400" font-size="11" fill="#555">• IN子查询返回大量数据</text>
<text x="460" y="420" font-size="11" fill="#555">• 相关子查询(每行执行一次)</text>
<text x="460" y="440" font-size="11" fill="#555">• 需要关联查询结果集</text>
<text x="450" y="470" font-size="12" fill="#333" font-weight="bold">用子查询的场景:</text>
<text x="460" y="490" font-size="11" fill="#555">• EXISTS/NOT EXISTS判断</text>
<text x="460" y="510" font-size="11" fill="#555">• 聚合函数作为过滤条件</text>
</svg>

### 关键要点
1. **IN子查询**:大量数据时用JOIN替代
2. **相关子查询**:每行都执行,用JOIN优化
3. **EXISTS**:判断存在性时优于JOIN
4. **聚合过滤**:子查询更清晰
5. **优化器**:现代MySQL优化器会自动优化部分子查询

### 记忆口诀
**"大量相关用JOIN,存在聚合用子查"**
- **大量**:IN返回大量数据用JOIN
- **相关**:相关子查询用JOIN
- **存在**:EXISTS判断保留
- **聚合**:聚合过滤保留

## 日志

34. MySQL 有哪些日志文件？

### 核心答案
MySQL主要有四类日志:错误日志、二进制日志(binlog)、查询日志、慢查询日志,以及InnoDB特有的redo log和undo log。

### 详细说明

#### 1. 错误日志(Error Log)
- **作用**:记录MySQL启动、运行、停止过程中的错误信息
- **位置**:`show variables like 'log_error';`
- **内容**:启动/关闭信息、错误信息、警告信息

#### 2. 二进制日志(Binary Log / binlog)
- **作用**:记录所有修改数据库的SQL语句(DDL和DML)
- **用途**:
  - 主从复制
  - 数据恢复
  - 审计追踪
- **格式**:STATEMENT、ROW、MIXED
- **开启**:`log_bin = ON`

#### 3. 查询日志(General Query Log)
- **作用**:记录所有SQL语句(包括SELECT)
- **特点**:性能开销大,生产环境通常关闭
- **开启**:`general_log = ON`

#### 4. 慢查询日志(Slow Query Log)
- **作用**:记录执行时间超过阈值的SQL
- **用途**:性能分析和优化
- **配置**:
  ```sql
  slow_query_log = ON
  long_query_time = 2  -- 超过2秒记录
  ```

#### 5. Redo Log(重做日志)
- **层级**:InnoDB存储引擎层
- **作用**:崩溃恢复,保证事务持久性(D)
- **特点**:循环写入,固定大小
- **写入时机**:事务提交前

#### 6. Undo Log(回滚日志)
- **层级**:InnoDB存储引擎层
- **作用**:
  - 事务回滚
  - MVCC多版本并发控制
- **特点**:逻辑日志,记录相反操作

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="20" width="700" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">MySQL 日志体系架构</text>
<rect x="70" y="100" width="660" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="125" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">Server层日志</text>
<rect x="90" y="140" width="140" height="65" fill="#ffebee" stroke="#d32f2f" stroke-width="1" rx="3"/>
<text x="160" y="163" text-anchor="middle" font-size="13" font-weight="bold" fill="#d32f2f">错误日志</text>
<text x="160" y="183" text-anchor="middle" font-size="10" fill="#555">Error Log</text>
<text x="160" y="200" text-anchor="middle" font-size="9" fill="#666">启动/错误/警告</text>
<rect x="250" y="140" width="140" height="65" fill="#e3f2fd" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="320" y="163" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976d2">二进制日志</text>
<text x="320" y="183" text-anchor="middle" font-size="10" fill="#555">Binary Log</text>
<text x="320" y="200" text-anchor="middle" font-size="9" fill="#666">复制/恢复</text>
<rect x="410" y="140" width="140" height="65" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="480" y="163" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">查询日志</text>
<text x="480" y="183" text-anchor="middle" font-size="10" fill="#555">General Log</text>
<text x="480" y="200" text-anchor="middle" font-size="9" fill="#666">所有SQL</text>
<rect x="570" y="140" width="140" height="65" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="640" y="163" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">慢查询日志</text>
<text x="640" y="183" text-anchor="middle" font-size="10" fill="#555">Slow Query</text>
<text x="640" y="200" text-anchor="middle" font-size="9" fill="#666">性能分析</text>
<rect x="70" y="250" width="660" height="280" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="275" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">InnoDB存储引擎层日志</text>
<rect x="120" y="300" width="260" height="210" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="5"/>
<text x="250" y="330" text-anchor="middle" font-size="15" font-weight="bold" fill="#ef6c00">Redo Log (重做日志)</text>
<text x="140" y="360" font-size="12" fill="#333" font-weight="bold">作用:</text>
<text x="150" y="380" font-size="11" fill="#555">• 崩溃恢复(Crash Recovery)</text>
<text x="150" y="400" font-size="11" fill="#555">• 保证持久性(D in ACID)</text>
<text x="140" y="425" font-size="12" fill="#333" font-weight="bold">特点:</text>
<text x="150" y="445" font-size="11" fill="#555">• 物理日志(记录数据页变化)</text>
<text x="150" y="465" font-size="11" fill="#555">• 循环写入(固定大小)</text>
<text x="150" y="485" font-size="11" fill="#555">• WAL机制(Write-Ahead Log)</text>
<rect x="420" y="300" width="260" height="210" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="550" y="330" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976d2">Undo Log (回滚日志)</text>
<text x="440" y="360" font-size="12" fill="#333" font-weight="bold">作用:</text>
<text x="450" y="380" font-size="11" fill="#555">• 事务回滚</text>
<text x="450" y="400" font-size="11" fill="#555">• MVCC(多版本并发控制)</text>
<text x="440" y="425" font-size="12" fill="#333" font-weight="bold">特点:</text>
<text x="450" y="445" font-size="11" fill="#555">• 逻辑日志(记录相反操作)</text>
<text x="450" y="465" font-size="11" fill="#555">• INSERT→DELETE</text>
<text x="450" y="485" font-size="11" fill="#555">• UPDATE→反向UPDATE</text>
<rect x="80" y="550" width="640" height="35" fill="#fff9c4" stroke="#f57f17" stroke-width="1" rx="3"/>
<text x="400" y="573" text-anchor="middle" font-size="12" fill="#333">💡 记忆:Server层负责通用功能,InnoDB层负责事务和崩溃恢复</text>
</svg>

### 关键要点
1. **Server层**:错误、binlog、查询、慢查询
2. **InnoDB层**:redo log(持久性)、undo log(原子性+MVCC)
3. **binlog vs redo log**:一个在Server层,一个在引擎层
4. **慢查询日志**:性能优化的关键工具
5. **Redo Log**:循环写,固定大小;Undo Log:随事务增长

### 记忆口诀
**"错二查慢,重回持原"**
- **错**:错误日志
- **二**:二进制日志(binlog)
- **查**:查询日志
- **慢**:慢查询日志
- **重**:Redo Log(重做)
- **回**:Undo Log(回滚)
- **持**:持久性(Redo)
- **原**:原子性(Undo)

35. 什么是 binlog？有什么作用？

### 核心答案
binlog(Binary Log)是MySQL Server层的二进制日志,记录所有修改数据的SQL语句,主要用于主从复制和数据恢复。

### 详细说明

#### 1. binlog基本概念
- **层级**:MySQL Server层(所有存储引擎都有)
- **内容**:记录所有DDL和DML语句(不记录SELECT)
- **格式**:二进制格式,需要mysqlbinlog工具解析

#### 2. binlog三种格式

**STATEMENT模式**
- 记录SQL语句原文
- 优点:日志量小
- 缺点:某些函数(NOW()、UUID())会导致主从不一致

**ROW模式**(推荐)
- 记录每行数据的变化
- 优点:数据准确,不会不一致
- 缺点:日志量大

**MIXED模式**
- 混合使用STATEMENT和ROW
- MySQL自动选择

```sql
-- 查看binlog格式
SHOW VARIABLES LIKE 'binlog_format';

-- 设置ROW格式
SET GLOBAL binlog_format = 'ROW';
```

#### 3. binlog的作用

**主从复制**
- 主库写入binlog
- 从库读取并重放binlog
- 实现数据同步

**数据恢复**
```bash
# 恢复某个时间点的数据
mysqlbinlog --stop-datetime="2024-01-01 10:00:00" \
  mysql-bin.000001 | mysql -u root -p
```

**审计追踪**
- 查看谁在什么时候修改了数据

#### 4. binlog相关配置

```sql
-- 开启binlog
log_bin = ON

-- binlog文件大小(超过后自动轮转)
max_binlog_size = 1G

-- binlog保留时间(秒)
binlog_expire_logs_seconds = 2592000  -- 30天

-- 同步策略
sync_binlog = 1  -- 每次提交都刷盘(最安全)
```

#### 5. binlog写入时机
1. 事务执行过程中,先写入binlog cache
2. 事务提交时,将cache写入binlog文件
3. 根据`sync_binlog`决定何时刷盘

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="20" width="700" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">Binlog 工作原理与应用</text>
<rect x="70" y="100" width="660" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="130" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">Binlog 三种格式对比</text>
<rect x="90" y="150" width="200" height="115" fill="#ffebee" stroke="#d32f2f" stroke-width="1" rx="3"/>
<text x="190" y="175" text-anchor="middle" font-size="13" font-weight="bold" fill="#d32f2f">STATEMENT</text>
<text x="110" y="200" font-size="11" fill="#555">记录:SQL语句原文</text>
<text x="110" y="220" font-size="10" fill="#2e7d32">✓ 日志量小</text>
<text x="110" y="240" font-size="10" fill="#d32f2f">✗ NOW()等函数不一致</text>
<text x="190" y="260" font-size="9" fill="#666" font-style="italic">适合:确定性SQL</text>
<rect x="310" y="150" width="200" height="115" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="410" y="175" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">ROW (推荐)</text>
<text x="330" y="200" font-size="11" fill="#555">记录:每行数据变化</text>
<text x="330" y="220" font-size="10" fill="#2e7d32">✓ 数据准确</text>
<text x="330" y="240" font-size="10" fill="#d32f2f">✗ 日志量大</text>
<text x="410" y="260" font-size="9" fill="#666" font-style="italic">适合:生产环境</text>
<rect x="530" y="150" width="180" height="115" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="620" y="175" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">MIXED</text>
<text x="550" y="200" font-size="11" fill="#555">自动切换</text>
<text x="550" y="220" font-size="10" fill="#2e7d32">✓ 平衡两者</text>
<text x="550" y="240" font-size="10" fill="#666">MySQL自动选择</text>
<text x="620" y="260" font-size="9" fill="#666" font-style="italic">适合:兼容场景</text>
<rect x="70" y="300" width="320" height="320" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="230" y="330" text-anchor="middle" font-size="16" font-weight="bold" fill="#1976d2">主从复制流程</text>
<rect x="100" y="350" width="260" height="50" fill="#fff3e0" stroke="#ef6c00" stroke-width="1" rx="3"/>
<text x="230" y="380" text-anchor="middle" font-size="12" fill="#333">1. 主库执行SQL并写入binlog</text>
<path d="M 230 400 L 230 420" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow1)"/>
<rect x="100" y="420" width="260" height="50" fill="#fff3e0" stroke="#ef6c00" stroke-width="1" rx="3"/>
<text x="230" y="450" text-anchor="middle" font-size="12" fill="#333">2. 从库IO线程读取binlog</text>
<path d="M 230 470 L 230 490" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow1)"/>
<rect x="100" y="490" width="260" height="50" fill="#fff3e0" stroke="#ef6c00" stroke-width="1" rx="3"/>
<text x="230" y="520" text-anchor="middle" font-size="12" fill="#333">3. 写入从库relay log</text>
<path d="M 230 540 L 230 560" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow1)"/>
<rect x="100" y="560" width="260" height="50" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="230" y="590" text-anchor="middle" font-size="12" fill="#333">4. SQL线程重放relay log</text>
<rect x="410" y="300" width="320" height="320" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="570" y="330" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">Binlog 核心应用</text>
<rect x="430" y="350" width="280" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="1" rx="3"/>
<text x="570" y="375" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">数据恢复</text>
<text x="450" y="395" font-size="11" fill="#555">• 全量备份 + binlog增量</text>
<text x="450" y="415" font-size="11" fill="#555">• 误删数据恢复到指定时间点</text>
<rect x="430" y="445" width="280" height="80" fill="#e1f5fe" stroke="#0277bd" stroke-width="1" rx="3"/>
<text x="570" y="470" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">审计追踪</text>
<text x="450" y="490" font-size="11" fill="#555">• 查看谁修改了数据</text>
<text x="450" y="510" font-size="11" fill="#555">• 分析数据变更历史</text>
<rect x="430" y="540" width="280" height="70" fill="#fce4ec" stroke="#c2185b" stroke-width="1" rx="3"/>
<text x="570" y="565" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">实时同步</text>
<text x="450" y="585" font-size="11" fill="#555">• Canal等中间件解析binlog</text>
<text x="450" y="602" font-size="11" fill="#555">• 同步到ES、Redis等</text>
<defs>
<marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/>
</marker>
</defs>
</svg>

### 关键要点
1. **位置**:Server层,所有引擎共享
2. **格式**:STATEMENT、ROW(推荐)、MIXED
3. **用途**:主从复制、数据恢复、审计
4. **安全性**:`sync_binlog=1`每次提交都刷盘
5. **与redo log配合**:两阶段提交保证一致性

### 记忆口诀
**"服务复恢审,行格最安全"**
- **服务**:Server层
- **复**:复制
- **恢**:恢复
- **审**:审计
- **行格**:ROW格式
- **安全**:sync_binlog=1

36. 什么是 redo log 和 undo log？

### 核心答案
- **Redo Log**:InnoDB重做日志,记录物理数据页的修改,用于崩溃恢复,保证持久性(D)
- **Undo Log**:InnoDB回滚日志,记录逻辑相反操作,用于事务回滚和MVCC,保证原子性(A)

### 详细说明

#### 1. Redo Log(重做日志)

**作用:**
- 崩溃恢复:MySQL宕机后,通过redo log恢复未刷盘的数据
- 保证持久性:实现WAL(Write-Ahead Logging)机制

**特点:**
- **物理日志**:记录数据页的物理修改("在页X的偏移Y处写入Z")
- **循环写入**:固定大小,写满后从头覆盖
- **顺序IO**:顺序写入,性能高

**写入流程:**
1. 更新内存中的数据页(Buffer Pool)
2. 写入redo log buffer
3. 事务提交时,将redo log刷盘
4. 后台线程异步将脏页刷盘

```sql
-- 配置redo log
innodb_log_file_size = 512M  -- 单个文件大小
innodb_log_files_in_group = 2  -- 文件个数
innodb_flush_log_at_trx_commit = 1  -- 每次提交都刷盘
```

#### 2. Undo Log(回滚日志)

**作用:**
- 事务回滚:ROLLBACK时根据undo log执行相反操作
- MVCC:ReadView通过undo log读取历史版本

**特点:**
- **逻辑日志**:记录逻辑操作(INSERT对应DELETE)
- **随事务增长**:每个事务生成undo log,事务结束后清理
- **存储在表空间**:undo表空间

**记录内容:**
```sql
-- INSERT操作 → 记录DELETE的信息(主键)
INSERT INTO users VALUES (1, 'Alice');
-- Undo: DELETE FROM users WHERE id = 1;

-- DELETE操作 → 记录INSERT的完整信息
DELETE FROM users WHERE id = 1;
-- Undo: INSERT INTO users VALUES (1, 'Alice');

-- UPDATE操作 → 记录旧值
UPDATE users SET name = 'Bob' WHERE id = 1;
-- Undo: UPDATE users SET name = 'Alice' WHERE id = 1;
```

#### 3. Redo Log vs Undo Log

| 对比项 | Redo Log | Undo Log |
|--------|----------|----------|
| **作用** | 崩溃恢复,保证持久性 | 事务回滚,MVCC |
| **记录内容** | 物理修改(数据页变化) | 逻辑操作(相反操作) |
| **写入方式** | 循环写入,固定大小 | 随事务增长 |
| **使用时机** | MySQL崩溃重启时 | ROLLBACK或读历史版本 |
| **ACID保证** | 持久性(D) | 原子性(A) |

<svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="20" width="700" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">Redo Log vs Undo Log</text>
<rect x="80" y="100" width="320" height="560" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="5"/>
<text x="240" y="135" text-anchor="middle" font-size="16" font-weight="bold" fill="#ef6c00">Redo Log (重做日志)</text>
<rect x="100" y="155" width="280" height="80" fill="#ffebee" stroke="#d32f2f" stroke-width="1" rx="3"/>
<text x="240" y="180" text-anchor="middle" font-size="13" font-weight="bold" fill="#d32f2f">核心目的</text>
<text x="120" y="200" font-size="11" fill="#555">• 崩溃恢复(Crash Recovery)</text>
<text x="120" y="220" font-size="11" fill="#555">• 保证持久性(Durability)</text>
<rect x="100" y="250" width="280" height="90" fill="#e1f5fe" stroke="#0277bd" stroke-width="1" rx="3"/>
<text x="240" y="275" text-anchor="middle" font-size="13" font-weight="bold" fill="#0277bd">特点</text>
<text x="120" y="295" font-size="11" fill="#555">• 物理日志(记录页面变化)</text>
<text x="120" y="315" font-size="11" fill="#555">• 循环写入(固定大小512MB*2)</text>
<text x="120" y="333" font-size="11" fill="#555">• WAL机制(先写日志后写数据)</text>
<rect x="100" y="355" width="280" height="140" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="240" y="380" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">工作流程</text>
<text x="120" y="405" font-size="11" fill="#555">1. 修改Buffer Pool中的数据页</text>
<text x="120" y="425" font-size="11" fill="#555">2. 记录redo log(内存)</text>
<text x="120" y="445" font-size="11" fill="#555">3. 提交时redo log刷盘</text>
<text x="120" y="465" font-size="11" fill="#555">4. 后台线程将脏页刷盘</text>
<text x="120" y="485" font-size="10" fill="#d32f2f" font-style="italic">→ 即使宕机,redo log也能恢复</text>
<rect x="100" y="510" width="280" height="135" fill="#fff9c4" stroke="#f57f17" stroke-width="1" rx="3"/>
<text x="240" y="535" text-anchor="middle" font-size="13" font-weight="bold" fill="#f57f17">记录示例</text>
<text x="120" y="560" font-size="10" fill="#333" font-family="monospace">redo: 在表空间1的</text>
<text x="120" y="578" font-size="10" fill="#333" font-family="monospace">      页100偏移200处</text>
<text x="120" y="596" font-size="10" fill="#333" font-family="monospace">      写入0x1234ABCD</text>
<text x="240" y="625" font-size="9" fill="#666" font-style="italic">(物理层面的精确位置和值)</text>
<rect x="420" y="100" width="320" height="560" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="580" y="135" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">Undo Log (回滚日志)</text>
<rect x="440" y="155" width="280" height="80" fill="#ffebee" stroke="#d32f2f" stroke-width="1" rx="3"/>
<text x="580" y="180" text-anchor="middle" font-size="13" font-weight="bold" fill="#d32f2f">核心目的</text>
<text x="460" y="200" font-size="11" fill="#555">• 事务回滚(ROLLBACK)</text>
<text x="460" y="220" font-size="11" fill="#555">• MVCC(多版本并发控制)</text>
<rect x="440" y="250" width="280" height="90" fill="#e1f5fe" stroke="#0277bd" stroke-width="1" rx="3"/>
<text x="580" y="275" text-anchor="middle" font-size="13" font-weight="bold" fill="#0277bd">特点</text>
<text x="460" y="295" font-size="11" fill="#555">• 逻辑日志(记录相反操作)</text>
<text x="460" y="315" font-size="11" fill="#555">• 随事务增长(事务越多越大)</text>
<text x="460" y="333" font-size="11" fill="#555">• 存储在undo表空间</text>
<rect x="440" y="355" width="280" height="140" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="580" y="380" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">工作流程</text>
<text x="460" y="405" font-size="11" fill="#555">1. 执行SQL前,记录undo log</text>
<text x="460" y="425" font-size="11" fill="#555">2. 执行SQL,修改数据</text>
<text x="460" y="445" font-size="11" fill="#555">3. 提交:清理undo log</text>
<text x="460" y="465" font-size="11" fill="#555">4. 回滚:根据undo log恢复</text>
<text x="460" y="485" font-size="10" fill="#2e7d32" font-style="italic">→ MVCC通过undo log读历史版本</text>
<rect x="440" y="510" width="280" height="135" fill="#fff9c4" stroke="#f57f17" stroke-width="1" rx="3"/>
<text x="580" y="535" text-anchor="middle" font-size="13" font-weight="bold" fill="#f57f17">记录示例</text>
<text x="460" y="560" font-size="10" fill="#333" font-family="monospace">UPDATE id=1 name='Bob'</text>
<text x="460" y="578" font-size="10" fill="#333" font-family="monospace">undo: UPDATE id=1</text>
<text x="460" y="596" font-size="10" fill="#333" font-family="monospace">      name='Alice'</text>
<text x="580" y="625" font-size="9" fill="#666" font-style="italic">(逻辑层面的相反操作)</text>
</svg>

### 关键要点
1. **Redo Log**:崩溃恢复,物理日志,循环写,保证持久性
2. **Undo Log**:事务回滚,逻辑日志,MVCC,保证原子性
3. **WAL机制**:先写redo log,后写数据页
4. **协同工作**:Redo保证不丢,Undo保证可回滚
5. **配置关键**:`innodb_flush_log_at_trx_commit=1`保证安全

### 记忆口诀
**"重做持久物循环,回滚原子逻版本"**
- **重做**:Redo Log
- **持久**:持久性
- **物**:物理日志
- **循环**:循环写入
- **回滚**:Undo Log
- **原子**:原子性
- **逻**:逻辑日志
- **版本**:MVCC多版本

37. binlog 和 redo log 的区别是什么？

### 核心答案
binlog是MySQL Server层的逻辑日志,用于复制和恢复;redo log是InnoDB引擎层的物理日志,用于崩溃恢复。两者通过两阶段提交保证一致性。

### 详细说明

#### 主要区别对比

| 对比维度 | Binlog | Redo Log |
|---------|--------|----------|
| **层级** | MySQL Server层 | InnoDB引擎层 |
| **作用** | 主从复制、数据恢复 | 崩溃恢复 |
| **日志类型** | 逻辑日志(SQL或行变化) | 物理日志(页面修改) |
| **写入方式** | 追加写(append),文件写满后新建 | 循环写(circular),固定大小 |
| **引擎支持** | 所有存储引擎 | 仅InnoDB |
| **日志格式** | STATEMENT/ROW/MIXED | 固定格式 |
| **刷盘时机** | 事务提交时(可配置) | 事务提交时(可配置) |
| **数据恢复** | 可恢复到任意时间点 | 只能恢复到最近checkpoint |

#### 为什么需要两份日志?

**各司其职**:
- **Binlog**:用于数据备份和主从复制,是MySQL的核心功能
- **Redo Log**:用于InnoDB的崩溃恢复,提供ACID中的持久性

**历史原因**:
- MySQL最初没有InnoDB引擎,binlog是MySQL自带的
- InnoDB作为第三方引擎加入MySQL,自带redo log
- 两者配合使用,通过两阶段提交保证一致性

#### 写入时机

```sql
-- Binlog刷盘策略
sync_binlog = 0  -- OS决定何时刷盘(性能最好,可能丢数据)
sync_binlog = 1  -- 每次提交都刷盘(最安全,推荐)
sync_binlog = N  -- 每N个事务刷盘(折中)

-- Redo Log刷盘策略
innodb_flush_log_at_trx_commit = 0  -- 每秒刷盘(性能好,可能丢1秒)
innodb_flush_log_at_trx_commit = 1  -- 每次提交都刷盘(最安全,推荐)
innodb_flush_log_at_trx_commit = 2  -- 写OS cache,每秒刷盘(折中)
```

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="20" width="750" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="425" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">Binlog vs Redo Log 全面对比</text>
<rect x="80" y="100" width="340" height="520" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="250" y="135" text-anchor="middle" font-size="16" font-weight="bold" fill="#f57c00">Binlog (二进制日志)</text>
<rect x="100" y="155" width="300" height="70" fill="#ffebee" stroke="#d32f2f" stroke-width="1" rx="3"/>
<text x="250" y="180" text-anchor="middle" font-size="13" font-weight="bold" fill="#d32f2f">基本信息</text>
<text x="120" y="200" font-size="11" fill="#555">• 层级: MySQL Server层</text>
<text x="120" y="218" font-size="11" fill="#555">• 范围: 所有存储引擎</text>
<rect x="100" y="240" width="300" height="90" fill="#e1f5fe" stroke="#0277bd" stroke-width="1" rx="3"/>
<text x="250" y="265" text-anchor="middle" font-size="13" font-weight="bold" fill="#0277bd">日志特性</text>
<text x="120" y="285" font-size="11" fill="#555">• 类型: 逻辑日志</text>
<text x="120" y="303" font-size="11" fill="#555">• 格式: STATEMENT/ROW/MIXED</text>
<text x="120" y="321" font-size="11" fill="#555">• 写入: 追加写,无限增长</text>
<rect x="100" y="345" width="300" height="90" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="250" y="370" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">核心作用</text>
<text x="120" y="390" font-size="11" fill="#555">• 主从复制</text>
<text x="120" y="408" font-size="11" fill="#555">• 数据恢复(任意时间点)</text>
<text x="120" y="426" font-size="11" fill="#555">• 审计追踪</text>
<rect x="100" y="450" width="300" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="1" rx="3"/>
<text x="250" y="475" text-anchor="middle" font-size="13" font-weight="bold" fill="#f57f17">记录示例</text>
<text x="120" y="495" font-size="10" fill="#333" font-family="monospace">UPDATE users SET</text>
<text x="120" y="513" font-size="10" fill="#333" font-family="monospace">  name='Bob' WHERE id=1;</text>
<rect x="100" y="545" width="300" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="120" y="570" font-size="11" fill="#333">配置: sync_binlog=1</text>
<text x="120" y="590" font-size="10" fill="#666">每次提交都刷盘</text>
<rect x="440" y="100" width="340" height="520" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="610" y="135" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">Redo Log (重做日志)</text>
<rect x="460" y="155" width="300" height="70" fill="#ffebee" stroke="#d32f2f" stroke-width="1" rx="3"/>
<text x="610" y="180" text-anchor="middle" font-size="13" font-weight="bold" fill="#d32f2f">基本信息</text>
<text x="480" y="200" font-size="11" fill="#555">• 层级: InnoDB引擎层</text>
<text x="480" y="218" font-size="11" fill="#555">• 范围: 仅InnoDB</text>
<rect x="460" y="240" width="300" height="90" fill="#e1f5fe" stroke="#0277bd" stroke-width="1" rx="3"/>
<text x="610" y="265" text-anchor="middle" font-size="13" font-weight="bold" fill="#0277bd">日志特性</text>
<text x="480" y="285" font-size="11" fill="#555">• 类型: 物理日志</text>
<text x="480" y="303" font-size="11" fill="#555">• 格式: 固定二进制格式</text>
<text x="480" y="321" font-size="11" fill="#555">• 写入: 循环写,固定大小</text>
<rect x="460" y="345" width="300" height="90" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="610" y="370" text-anchor="middle" font-size="13" font-weight="bold" fill="#7b1fa2">核心作用</text>
<text x="480" y="390" font-size="11" fill="#555">• 崩溃恢复(Crash Recovery)</text>
<text x="480" y="408" font-size="11" fill="#555">• 保证持久性(ACID-D)</text>
<text x="480" y="426" font-size="11" fill="#555">• WAL机制(Write-Ahead Log)</text>
<rect x="460" y="450" width="300" height="80" fill="#fff9c4" stroke="#f57f17" stroke-width="1" rx="3"/>
<text x="610" y="475" text-anchor="middle" font-size="13" font-weight="bold" fill="#f57f17">记录示例</text>
<text x="480" y="495" font-size="10" fill="#333" font-family="monospace">在表空间1,页100,</text>
<text x="480" y="513" font-size="10" fill="#333" font-family="monospace">偏移200,写入0xABCD</text>
<rect x="460" y="545" width="300" height="60" fill="#ffebee" stroke="#d32f2f" stroke-width="1" rx="3"/>
<text x="480" y="570" font-size="11" fill="#333">配置: innodb_flush_</text>
<text x="480" y="590" font-size="10" fill="#666">log_at_trx_commit=1</text>
</svg>

### 关键要点
1. **层级不同**:binlog在Server层,redo log在InnoDB层
2. **用途不同**:binlog用于复制恢复,redo log用于崩溃恢复
3. **格式不同**:binlog是逻辑日志,redo log是物理日志
4. **写入不同**:binlog追加写,redo log循环写
5. **配合使用**:两阶段提交保证一致性

### 记忆口诀
**"服逻追复,引物循崩"**
- **服**:Server层(binlog)
- **逻**:逻辑日志(binlog)
- **追**:追加写(binlog)
- **复**:复制(binlog)
- **引**:引擎层(redo log)
- **物**:物理日志(redo log)
- **循**:循环写(redo log)
- **崩**:崩溃恢复(redo log)

38. 什么是两阶段提交？

### 核心答案
两阶段提交(Two-Phase Commit)是MySQL为保证binlog和redo log一致性而采用的提交协议,分为prepare和commit两个阶段。

### 详细说明

#### 1. 为什么需要两阶段提交?

如果不用两阶段提交,可能出现binlog和redo log不一致:

**场景1:先写redo log,后写binlog**
1. 写入redo log成功
2. MySQL崩溃
3. 重启后通过redo log恢复数据(有这条记录)
4. 但binlog没有这条记录,主从复制时从库没有这条数据
5. **结果:主库有,从库没有,数据不一致**

**场景2:先写binlog,后写redo log**
1. 写入binlog成功
2. MySQL崩溃
3. 重启后没有redo log,这条记录丢失(主库没有)
4. 但binlog有这条记录,从库会执行(从库有)
5. **结果:主库没有,从库有,数据不一致**

#### 2. 两阶段提交流程

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="20" width="700" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">两阶段提交流程</text>
<rect x="100" y="110" width="600" height="70" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="5"/>
<text x="400" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">阶段1: Prepare (准备阶段)</text>
<text x="150" y="168" font-size="12" fill="#555">1. 写入redo log,标记为prepare状态</text>
<path d="M 400 180 L 400 210" stroke="#1976d2" stroke-width="3" marker-end="url(#arrow2)"/>
<rect x="100" y="210" width="600" height="70" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="245" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">阶段2: Write Binlog (写binlog)</text>
<text x="150" y="268" font-size="12" fill="#555">2. 写入binlog到磁盘</text>
<path d="M 400 280 L 400 310" stroke="#1976d2" stroke-width="3" marker-end="url(#arrow2)"/>
<rect x="100" y="310" width="600" height="70" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="400" y="345" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">阶段3: Commit (提交阶段)</text>
<text x="150" y="368" font-size="12" fill="#555">3. 将redo log状态改为commit</text>
<rect x="100" y="410" width="280" height="120" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="240" y="440" text-anchor="middle" font-size="13" font-weight="bold" fill="#d32f2f">崩溃恢复场景</text>
<text x="120" y="465" font-size="11" fill="#555">• 若在prepare前崩溃: 事务未开始,丢弃</text>
<text x="120" y="488" font-size="11" fill="#555">• 若prepare后,binlog前崩溃: 回滚</text>
<text x="120" y="511" font-size="11" fill="#555">• 若binlog后,commit前崩溃: 提交</text>
<rect x="420" y="410" width="280" height="120" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="560" y="440" text-anchor="middle" font-size="13" font-weight="bold" fill="#2e7d32">一致性保证</text>
<text x="440" y="465" font-size="11" fill="#555">• Prepare状态的redo log</text>
<text x="440" y="488" font-size="11" fill="#555">• 如果binlog有对应记录→提交</text>
<text x="440" y="511" font-size="11" fill="#555">• 如果binlog无对应记录→回滚</text>
<defs>
<marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/>
</marker>
</defs>
</svg>

#### 3. 崩溃恢复逻辑

MySQL重启后的恢复策略:
1. 扫描redo log,找到所有prepare状态的事务
2. 对于每个prepare事务,检查binlog是否有对应的完整记录
3. **如果binlog有完整记录**:提交该事务(将redo log改为commit)
4. **如果binlog没有记录**:回滚该事务

#### 4. 如何判断binlog是否完整?

- **STATEMENT格式**:查看是否有完整的COMMIT语句
- **ROW格式**:查看是否有XID_EVENT事件(事务ID)

### 关键要点
1. **目的**:保证binlog和redo log的一致性
2. **阶段**:Prepare(写redo log) → Write Binlog → Commit
3. **恢复**:根据binlog是否完整决定提交或回滚
4. **代价**:多一次fsync,但保证了一致性
5. **配置**:两个参数都设为1最安全

### 记忆口诀
**"准写提,日志双保险"**
- **准**:Prepare阶段
- **写**:Write Binlog
- **提**:Commit阶段
- **双保险**:binlog和redo log都完整才提交

## 高可用与性能

39. 什么是主从复制？如何实现？

### 核心答案
主从复制是MySQL通过binlog将主库数据变更同步到从库的机制,实现数据备份和读写分离。流程:主库写binlog → 从库IO线程读取 → 写入relay log → SQL线程重放。

### 详细说明

#### 1. 主从复制原理

**三线程模型**:
- **主库binlog dump线程**:读取binlog发送给从库
- **从库IO线程**:接收binlog写入relay log
- **从库SQL线程**:读取relay log执行SQL

**复制流程**:
1. 主库执行SQL,记录到binlog
2. 从库IO线程连接主库,请求binlog
3. 主库binlog dump线程读取binlog发送给从库
4. 从库IO线程接收后写入relay log
5. 从库SQL线程读取relay log,重放SQL

#### 2. 配置步骤

**主库配置**:
```sql
-- my.cnf
[mysqld]
server-id = 1  -- 唯一ID
log-bin = mysql-bin  -- 开启binlog
binlog-format = ROW  -- ROW格式

-- 创建复制用户
CREATE USER 'repl'@'%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';

-- 查看主库状态
SHOW MASTER STATUS;
-- 记录File和Position
```

**从库配置**:
```sql
-- my.cnf
[mysqld]
server-id = 2  -- 唯一ID,不同于主库
relay-log = relay-bin  -- relay log文件名

-- 配置主库信息
CHANGE MASTER TO
  MASTER_HOST='192.168.1.100',
  MASTER_USER='repl',
  MASTER_PASSWORD='password',
  MASTER_LOG_FILE='mysql-bin.000001',  -- 主库binlog文件
  MASTER_LOG_POS=154;  -- binlog位置

-- 启动复制
START SLAVE;

-- 查看从库状态
SHOW SLAVE STATUS\G
-- 确认 Slave_IO_Running: Yes
-- 确认 Slave_SQL_Running: Yes
```

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="20" width="700" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1976d2">MySQL 主从复制流程</text>
<rect x="80" y="110" width="280" height="350" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="5"/>
<text x="220" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#ef6c00">主库 (Master)</text>
<rect x="100" y="170" width="240" height="60" fill="#ffebee" stroke="#d32f2f" stroke-width="1" rx="3"/>
<text x="220" y="195" text-anchor="middle" font-size="13" fill="#333">1. 执行SQL(INSERT/UPDATE)</text>
<text x="220" y="218" text-anchor="middle" font-size="11" fill="#666">↓</text>
<rect x="100" y="245" width="240" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="220" y="270" text-anchor="middle" font-size="13" fill="#333">2. 写入Binary Log</text>
<text x="220" y="293" text-anchor="middle" font-size="11" fill="#666">↓</text>
<rect x="100" y="320" width="240" height="60" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="220" y="345" text-anchor="middle" font-size="13" fill="#333">3. Binlog Dump线程</text>
<text x="220" y="365" text-anchor="middle" font-size="10" fill="#666">读取binlog发送给从库</text>
<path d="M 360 350 L 420 280" stroke="#2e7d32" stroke-width="3" stroke-dasharray="5,5" marker-end="url(#arrow3)"/>
<text x="385" y="310" font-size="11" fill="#2e7d32" font-weight="bold">发送binlog</text>
<rect x="440" y="110" width="280" height="350" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="580" y="145" text-anchor="middle" font-size="16" font-weight="bold" fill="#2e7d32">从库 (Slave)</text>
<rect x="460" y="170" width="240" height="60" fill="#e1f5fe" stroke="#0277bd" stroke-width="1" rx="3"/>
<text x="580" y="195" text-anchor="middle" font-size="13" fill="#333">4. IO线程接收binlog</text>
<text x="580" y="218" text-anchor="middle" font-size="11" fill="#666">↓</text>
<rect x="460" y="245" width="240" height="60" fill="#fff9c4" stroke="#f57f17" stroke-width="1" rx="3"/>
<text x="580" y="270" text-anchor="middle" font-size="13" fill="#333">5. 写入Relay Log</text>
<text x="580" y="293" text-anchor="middle" font-size="11" fill="#666">↓</text>
<rect x="460" y="320" width="240" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="580" y="345" text-anchor="middle" font-size="13" fill="#333">6. SQL线程读取relay log</text>
<text x="580" y="365" text-anchor="middle" font-size="10" fill="#666">重放SQL,执行数据变更</text>
<rect x="460" y="395" width="240" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="580" y="425" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">✓ 数据同步完成</text>
<defs>
<marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#2e7d32"/>
</marker>
</defs>
</svg>

### 关键要点
1. **binlog是核心**:主从复制依赖binlog
2. **三线程模型**:dump、IO、SQL线程
3. **异步复制**:主库不等从库,有延迟
4. **server-id唯一**:每个MySQL实例需不同ID
5. **监控指标**:Seconds_Behind_Master(延迟时间)

### 记忆口诀
**"主写从读,三线日志"**
- **主写**:主库写binlog
- **从读**:从库读binlog
- **三线**:dump、IO、SQL三个线程
- **日志**:binlog和relay log
### 40. 主从复制有哪些模式？

#### 核心答案
MySQL主从复制有三种模式:异步复制(默认)、半同步复制、组复制(MGR)。

#### 详细说明

**1. 异步复制(Asynchronous Replication - 默认)**

<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="120" height="80" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="110" y="85" text-anchor="middle" fill="white" font-size="14" font-weight="bold">主库</text>
<text x="110" y="105" text-anchor="middle" fill="white" font-size="12">执行事务</text>
<text x="110" y="120" text-anchor="middle" fill="white" font-size="12">立即返回✓</text>
<rect x="430" y="50" width="120" height="80" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="490" y="85" text-anchor="middle" fill="white" font-size="14" font-weight="bold">从库</text>
<text x="490" y="105" text-anchor="middle" fill="white" font-size="12">异步接收</text>
<text x="490" y="120" text-anchor="middle" fill="white" font-size="12">binlog</text>
<path d="M 170 90 L 430 90" stroke="#FF6B6B" stroke-width="2" fill="none" marker-end="url(#arrowred)"/>
<text x="300" y="80" text-anchor="middle" fill="#FF6B6B" font-size="12">binlog(异步)</text>
<defs><marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#FF6B6B"/></marker></defs>
<text x="110" y="160" text-anchor="middle" fill="#333" font-size="11">不等从库确认</text>
<text x="490" y="160" text-anchor="middle" fill="#333" font-size="11">可能有延迟</text>
</svg>

- 主库执行完事务立即返回,不等从库
- 优点:性能最好
- 缺点:可能丢数据(主库宕机时从库未同步)

**2. 半同步复制(Semi-Synchronous Replication)**

<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="120" height="80" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="110" y="85" text-anchor="middle" fill="white" font-size="14" font-weight="bold">主库</text>
<text x="110" y="105" text-anchor="middle" fill="white" font-size="12">执行事务</text>
<text x="110" y="120" text-anchor="middle" fill="white" font-size="12">等待确认</text>
<rect x="430" y="50" width="120" height="80" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="490" y="85" text-anchor="middle" fill="white" font-size="14" font-weight="bold">从库</text>
<text x="490" y="105" text-anchor="middle" fill="white" font-size="12">接收binlog</text>
<text x="490" y="120" text-anchor="middle" fill="white" font-size="12">返回ACK</text>
<path d="M 170 75 L 430 75" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arroworange)"/>
<text x="300" y="65" text-anchor="middle" fill="#FF9800" font-size="12">binlog</text>
<path d="M 430 105 L 170 105" stroke="#4CAF50" stroke-width="2" fill="none" marker-end="url(#arrowgreen)"/>
<text x="300" y="120" text-anchor="middle" fill="#4CAF50" font-size="12">ACK确认</text>
<defs><marker id="arroworange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#FF9800"/></marker><marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#4CAF50"/></marker></defs>
<text x="110" y="160" text-anchor="middle" fill="#333" font-size="11">至少1个从库确认</text>
<text x="110" y="175" text-anchor="middle" fill="#333" font-size="11">才返回客户端</text>
<text x="490" y="160" text-anchor="middle" fill="#333" font-size="11">收到后立即确认</text>
<rect x="200" y="180" width="200" height="25" fill="#FFF3CD" stroke="#FFC107" stroke-width="1" rx="3"/>
<text x="300" y="197" text-anchor="middle" fill="#856404" font-size="11">数据更安全,性能略降</text>
</svg>

- 主库等待至少一个从库接收binlog后才返回
- 配置:
  ```sql
  -- 主库安装插件
  INSTALL PLUGIN rpl_semi_sync_master SONAME 'semisync_master.so';
  SET GLOBAL rpl_semi_sync_master_enabled = 1;

  -- 从库安装插件
  INSTALL PLUGIN rpl_semi_sync_slave SONAME 'semisync_slave.so';
  SET GLOBAL rpl_semi_sync_slave_enabled = 1;
  ```
- 优点:数据更安全
- 缺点:性能略降

**3. 组复制(Group Replication - MGR)**

<svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg">
<circle cx="300" cy="125" r="100" fill="none" stroke="#9C27B0" stroke-width="2" stroke-dasharray="5,5"/>
<text x="300" y="50" text-anchor="middle" fill="#9C27B0" font-size="14" font-weight="bold">MGR集群(基于Paxos)</text>
<rect x="250" y="80" width="100" height="60" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="300" y="105" text-anchor="middle" fill="white" font-size="12" font-weight="bold">节点1</text>
<text x="300" y="125" text-anchor="middle" fill="white" font-size="11">Primary</text>
<rect x="140" y="150" width="100" height="60" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="190" y="175" text-anchor="middle" fill="white" font-size="12" font-weight="bold">节点2</text>
<text x="190" y="195" text-anchor="middle" fill="white" font-size="11">Secondary</text>
<rect x="360" y="150" width="100" height="60" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="410" y="175" text-anchor="middle" fill="white" font-size="12" font-weight="bold">节点3</text>
<text x="410" y="195" text-anchor="middle" fill="white" font-size="11">Secondary</text>
<path d="M 280 140 L 210 150" stroke="#9C27B0" stroke-width="2" fill="none"/>
<path d="M 320 140 L 390 150" stroke="#9C27B0" stroke-width="2" fill="none"/>
<path d="M 240 180 L 360 180" stroke="#9C27B0" stroke-width="2" fill="none"/>
<text x="300" y="235" text-anchor="middle" fill="#333" font-size="11">所有节点都确认才算成功(强一致性)</text>
</svg>

- MySQL 5.7.17+推出
- 基于Paxos协议的强一致性
- 所有节点都写入才算成功

#### 对比表格

| 模式 | 数据安全性 | 性能 | 延迟 | 使用场景 |
|------|-----------|------|------|---------|
| 异步复制 | 低 | 高 | 有延迟 | 读多写少,允许少量丢失 |
| 半同步复制 | 中 | 中 | 轻微延迟 | 对数据一致性有要求 |
| 组复制(MGR) | 高 | 低 | 基本无延迟 | 金融等强一致性场景 |

#### 关键要点
1. **异步**:默认模式,性能最好但可能丢数据
2. **半同步**:主库等至少一个从库确认
3. **MGR**:强一致性,类似分布式数据库
4. **选择依据**:根据业务对一致性和性能的要求

#### 记忆口诀
**"异快半稳,组最强"**
- **异快**:异步复制快
- **半稳**:半同步稳定
- **组最强**:组复制最强

---

### 41. 什么是读写分离？

#### 核心答案
读写分离是将写操作发送到主库,读操作发送到从库,利用主从复制实现负载均衡,提升数据库性能。

#### 详细说明

**1. 读写分离架构**

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
<rect x="320" y="20" width="100" height="50" fill="#FF9800" stroke="#F57C00" stroke-width="2" rx="5"/>
<text x="370" y="45" text-anchor="middle" fill="white" font-size="14" font-weight="bold">客户端</text>
<text x="370" y="60" text-anchor="middle" fill="white" font-size="11">应用层</text>
<rect x="270" y="110" width="200" height="50" fill="#9C27B0" stroke="#7B1FA2" stroke-width="2" rx="5"/>
<text x="370" y="135" text-anchor="middle" fill="white" font-size="13" font-weight="bold">中间件(路由)</text>
<text x="370" y="150" text-anchor="middle" fill="white" font-size="10">MyCat/ShardingSphere</text>
<rect x="100" y="210" width="120" height="70" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="160" y="235" text-anchor="middle" fill="white" font-size="14" font-weight="bold">主库(Master)</text>
<text x="160" y="255" text-anchor="middle" fill="white" font-size="12">写操作</text>
<text x="160" y="270" text-anchor="middle" fill="white" font-size="11">INSERT/UPDATE/DELETE</text>
<rect x="280" y="210" width="120" height="70" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="340" y="235" text-anchor="middle" fill="white" font-size="14" font-weight="bold">从库1</text>
<text x="340" y="255" text-anchor="middle" fill="white" font-size="12">读操作</text>
<text x="340" y="270" text-anchor="middle" fill="white" font-size="11">SELECT</text>
<rect x="460" y="210" width="120" height="70" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="520" y="235" text-anchor="middle" fill="white" font-size="14" font-weight="bold">从库2</text>
<text x="520" y="255" text-anchor="middle" fill="white" font-size="12">读操作</text>
<text x="520" y="270" text-anchor="middle" fill="white" font-size="11">SELECT</text>
<path d="M 330 160 L 160 210" stroke="#E91E63" stroke-width="3" fill="none" marker-end="url(#arrowwrite)"/>
<text x="240" y="180" text-anchor="middle" fill="#E91E63" font-size="12" font-weight="bold">写</text>
<path d="M 370 160 L 340 210" stroke="#4CAF50" stroke-width="3" fill="none" marker-end="url(#arrowread)"/>
<text x="360" y="180" text-anchor="middle" fill="#4CAF50" font-size="12" font-weight="bold">读</text>
<path d="M 410 160 L 520 210" stroke="#4CAF50" stroke-width="3" fill="none" marker-end="url(#arrowread2)"/>
<text x="480" y="180" text-anchor="middle" fill="#4CAF50" font-size="12" font-weight="bold">读</text>
<path d="M 160 210 L 340 210" stroke="#FF9800" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
<path d="M 340 210 L 520 210" stroke="#FF9800" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
<text x="250" y="200" text-anchor="middle" fill="#FF9800" font-size="10">主从复制</text>
<text x="430" y="200" text-anchor="middle" fill="#FF9800" font-size="10">主从复制</text>
<defs><marker id="arrowwrite" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#E91E63"/></marker><marker id="arrowread" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#4CAF50"/></marker><marker id="arrowread2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#4CAF50"/></marker></defs>
</svg>

**2. 实现方式**

**方式一:应用层实现**
```java
// 伪代码
if (isWriteOperation()) {
    dataSource = masterDataSource;
} else {
    dataSource = slaveDataSource;  // 可以有多个从库负载均衡
}
```

**方式二:中间件实现**
- MyCat
- ProxySQL
- ShardingSphere
- MySQL Router

**3. 优缺点**

<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="30" width="240" height="140" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="170" y="55" text-anchor="middle" fill="#2E7D32" font-size="14" font-weight="bold">✓ 优点</text>
<text x="80" y="80" fill="#333" font-size="12">• 降低主库压力</text>
<text x="80" y="105" fill="#333" font-size="12">• 提升查询性能</text>
<text x="80" y="130" fill="#333" font-size="12">• 读操作可水平扩展</text>
<text x="80" y="155" fill="#333" font-size="12">• 高可用性</text>
<rect x="310" y="30" width="240" height="140" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="430" y="55" text-anchor="middle" fill="#C62828" font-size="14" font-weight="bold">✗ 缺点</text>
<text x="340" y="80" fill="#333" font-size="12">• 主从延迟问题</text>
<text x="340" y="105" fill="#333" font-size="12">• 数据可能不一致</text>
<text x="340" y="130" fill="#333" font-size="12">• 架构复杂度增加</text>
<text x="340" y="155" fill="#333" font-size="12">• 需要路由逻辑</text>
</svg>

**4. 延迟问题解决**
- 强一致性读主库
- 写后读从主库
- 延迟监控告警
- 缓存辅助

#### 关键要点
1. **核心**:主库写,从库读
2. **前提**:主从复制
3. **实现**:应用层或中间件
4. **问题**:主从延迟
5. **适用**:读多写少场景

#### 记忆口诀
**"主写从读,分流提速"**

---

---

### 42. 如何保证主从一致性？

#### 核心答案
通过半同步复制、延迟监控、强制读主、并行复制等方式减少主从不一致。

#### 详细说明

**1. 主从不一致的原因**

<svg viewBox="0 0 650 180" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="30" width="140" height="120" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="120" y="55" text-anchor="middle" fill="#C62828" font-size="13" font-weight="bold">原因</text>
<text x="70" y="80" fill="#333" font-size="11">• 网络延迟</text>
<text x="70" y="100" fill="#333" font-size="11">• 从库负载高</text>
<text x="70" y="120" fill="#333" font-size="11">• 单线程回放慢</text>
<text x="70" y="140" fill="#333" font-size="11">• 大事务执行慢</text>
<path d="M 190 90 L 240 90" stroke="#FF9800" stroke-width="3" fill="none" marker-end="url(#arrow1)"/>
<rect x="240" y="30" width="360" height="120" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="420" y="55" text-anchor="middle" fill="#2E7D32" font-size="13" font-weight="bold">解决方案</text>
<text x="260" y="80" fill="#333" font-size="11">✓ 半同步复制 - 主库等从库确认</text>
<text x="260" y="100" fill="#333" font-size="11">✓ 并行复制 - 多线程回放提速</text>
<text x="260" y="120" fill="#333" font-size="11">✓ 强一致性读 - 重要数据读主库</text>
<text x="260" y="140" fill="#333" font-size="11">✓ 延迟监控 - 及时发现问题</text>
<defs><marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#FF9800"/></marker></defs>
</svg>

**2. 解决方案**

**方案一:半同步复制**
- 主库等从库确认,减少数据丢失
- 配置见问题40

**方案二:并行复制**
```sql
-- MySQL 5.7+
slave-parallel-type = LOGICAL_CLOCK
slave-parallel-workers = 4  -- 并行线程数
```

<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">并行复制原理</text>
<rect x="80" y="50" width="150" height="60" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="155" y="75" text-anchor="middle" fill="white" font-size="12" font-weight="bold">主库binlog</text>
<text x="155" y="95" text-anchor="middle" fill="white" font-size="11">多个事务</text>
<rect x="80" y="140" width="70" height="50" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="115" y="160" text-anchor="middle" fill="white" font-size="11">SQL线程1</text>
<text x="115" y="178" text-anchor="middle" fill="white" font-size="10">并行执行</text>
<rect x="160" y="140" width="70" height="50" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="195" y="160" text-anchor="middle" fill="white" font-size="11">SQL线程2</text>
<text x="195" y="178" text-anchor="middle" fill="white" font-size="10">并行执行</text>
<rect x="370" y="140" width="70" height="50" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="405" y="160" text-anchor="middle" fill="white" font-size="11">SQL线程N</text>
<text x="405" y="178" text-anchor="middle" fill="white" font-size="10">并行执行</text>
<text x="315" y="165" text-anchor="middle" fill="#666" font-size="12">...</text>
<path d="M 155 110 L 115 140" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arrow2)"/>
<path d="M 155 110 L 195 140" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arrow3)"/>
<path d="M 155 110 L 405 140" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arrow4)"/>
<defs><marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#FF9800"/></marker><marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#FF9800"/></marker><marker id="arrow4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#FF9800"/></marker></defs>
</svg>

**方案三:强一致性读**
- 写后读必须读主库
- 实时性要求高的读主库

**方案四:延迟监控**
```sql
-- 查看主从延迟
SHOW SLAVE STATUS\G
-- Seconds_Behind_Master: 延迟秒数
```

**方案五:业务层控制**
- 写完后等待一段时间再读
- 使用缓存减少读库压力

**3. 延迟监控指标**
- `Seconds_Behind_Master`:延迟时间
- IO线程和SQL线程状态
- relay log积压情况

#### 关键要点
1. **半同步**:主库等从库确认
2. **并行复制**:多线程回放提速
3. **读主策略**:重要数据读主库
4. **延迟监控**:及时发现问题
5. **业务容忍**:设计时考虑最终一致性

#### 记忆口诀
**"半并读主监,一致靠设计"**
- **半**:半同步
- **并**:并行复制
- **读主**:强一致读主
- **监**:监控延迟

---

---

### 43. 什么是分库分表？什么时候需要分库分表？

#### 核心答案
分库分表是将大表数据拆分到多个数据库或表中,解决单表数据量过大导致的性能问题。当单表超过1000万行或单库QPS过高时考虑分库分表。

#### 详细说明

**1. 为什么要分库分表**

<svg viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="30" width="280" height="90" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="190" y="55" text-anchor="middle" fill="#C62828" font-size="13" font-weight="bold">单表问题</text>
<text x="70" y="80" fill="#333" font-size="11">• 数据量过大(千万级以上),查询慢</text>
<text x="70" y="100" fill="#333" font-size="11">• 索引占用内存大</text>
<text x="70" y="120" fill="#333" font-size="11">• DDL操作耗时长</text>
<rect x="370" y="30" width="280" height="90" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="510" y="55" text-anchor="middle" fill="#E65100" font-size="13" font-weight="bold">单库问题</text>
<text x="390" y="80" fill="#333" font-size="11">• QPS/TPS达到瓶颈</text>
<text x="390" y="100" fill="#333" font-size="11">• 磁盘IO饱和</text>
<text x="390" y="120" fill="#333" font-size="11">• 连接数不够</text>
<path d="M 190 120 L 190 160" stroke="#4CAF50" stroke-width="3" fill="none" marker-end="url(#arrowdown1)"/>
<path d="M 510 120 L 510 160" stroke="#4CAF50" stroke-width="3" fill="none" marker-end="url(#arrowdown2)"/>
<rect x="50" y="160" width="280" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="190" y="185" text-anchor="middle" fill="#2E7D32" font-size="13" font-weight="bold">✓ 分表</text>
<text x="70" y="210" fill="#333" font-size="11">将一个表拆分成多个表</text>
<rect x="370" y="160" width="280" height="60" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="510" y="185" text-anchor="middle" fill="#2E7D32" font-size="13" font-weight="bold">✓ 分库</text>
<text x="390" y="210" fill="#333" font-size="11">将表分配到多个数据库</text>
<defs><marker id="arrowdown1" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#4CAF50"/></marker><marker id="arrowdown2" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#4CAF50"/></marker></defs>
</svg>

**2. 分库分表策略**

**垂直拆分**:
- 按业务模块拆分(用户库、订单库、商品库)
- 按字段拆分(热数据、冷数据分离)

**水平拆分**:
- 按范围:user_0(1-100万)、user_1(100-200万)
- 按哈希:user_id % 10
- 按时间:order_2024_01、order_2024_02

<svg viewBox="0 0 650 200" xmlns="http://www.w3.org/2000/svg">
<text x="325" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">水平分表示例</text>
<rect x="220" y="45" width="210" height="50" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="325" y="70" text-anchor="middle" fill="white" font-size="13" font-weight="bold">users表(1亿条数据)</text>
<text x="325" y="87" text-anchor="middle" fill="white" font-size="11">性能瓶颈</text>
<path d="M 325 95 L 325 115" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arrowsplit)"/>
<text x="325" y="108" text-anchor="middle" fill="#FF9800" font-size="11" font-weight="bold">按user_id%4拆分</text>
<rect x="40" y="125" width="120" height="60" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="100" y="150" text-anchor="middle" fill="white" font-size="12" font-weight="bold">users_0</text>
<text x="100" y="170" text-anchor="middle" fill="white" font-size="10">user_id%4=0</text>
<rect x="180" y="125" width="120" height="60" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="240" y="150" text-anchor="middle" fill="white" font-size="12" font-weight="bold">users_1</text>
<text x="240" y="170" text-anchor="middle" fill="white" font-size="10">user_id%4=1</text>
<rect x="320" y="125" width="120" height="60" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="380" y="150" text-anchor="middle" fill="white" font-size="12" font-weight="bold">users_2</text>
<text x="380" y="170" text-anchor="middle" fill="white" font-size="10">user_id%4=2</text>
<rect x="460" y="125" width="120" height="60" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="520" y="150" text-anchor="middle" fill="white" font-size="12" font-weight="bold">users_3</text>
<text x="520" y="170" text-anchor="middle" fill="white" font-size="10">user_id%4=3</text>
<defs><marker id="arrowsplit" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#FF9800"/></marker></defs>
</svg>

**3. 何时分库分表**

| 维度 | 分表时机 | 分库时机 |
|------|----------|---------|
| 数据量 | 单表行数超过1000万 | - |
| 文件大小 | 表数据文件超过10GB | - |
| QPS | - | 单库QPS超过3000 |
| 连接数 | - | 单库连接数不够 |
| IO | 查询性能明显下降 | 磁盘IO达到瓶颈 |

**4. 分库分表中间件**
- ShardingSphere
- MyCat
- Vitess

#### 关键要点
1. **目的**:解决单表/单库性能瓶颈
2. **垂直**:按业务或字段拆
3. **水平**:按数据行拆
4. **时机**:千万级数据或高QPS
5. **代价**:复杂度大幅增加

#### 记忆口诀
**"千万行,三千QPS,该分了"**

---

---

### 44. 垂直分库和水平分库的区别是什么？

#### 核心答案
垂直分库按业务模块拆分(用户库、订单库),水平分库按数据行拆分(user_0、user_1)。垂直解决业务耦合,水平解决数据量问题。

#### 详细说明

**1. 垂直分库(Vertical Sharding)**

<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">垂直分库:按业务拆分</text>
<rect x="250" y="45" width="200" height="110" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="350" y="70" text-anchor="middle" fill="white" font-size="13" font-weight="bold">单库(所有业务)</text>
<text x="270" y="95" fill="white" font-size="11">• users表</text>
<text x="270" y="115" fill="white" font-size="11">• orders表</text>
<text x="270" y="135" fill="white" font-size="11">• products表</text>
<path d="M 350 155 L 350 185" stroke="#FF9800" stroke-width="3" fill="none" marker-end="url(#arrowv1)"/>
<text x="350" y="175" text-anchor="middle" fill="#FF9800" font-size="11" font-weight="bold">按业务拆分</text>
<rect x="60" y="195" width="150" height="70" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="135" y="220" text-anchor="middle" fill="white" font-size="12" font-weight="bold">用户库</text>
<text x="80" y="245" fill="white" font-size="10">• users表</text>
<rect x="275" y="195" width="150" height="70" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="350" y="220" text-anchor="middle" fill="white" font-size="12" font-weight="bold">订单库</text>
<text x="295" y="245" fill="white" font-size="10">• orders表</text>
<rect x="490" y="195" width="150" height="70" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="565" y="220" text-anchor="middle" fill="white" font-size="12" font-weight="bold">商品库</text>
<text x="510" y="245" fill="white" font-size="10">• products表</text>
<defs><marker id="arrowv1" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#FF9800"/></marker></defs>
</svg>

**优点**:
- 业务隔离,互不影响
- 可针对不同业务优化
- 降低单库压力

**缺点**:
- 跨库JOIN困难
- 分布式事务问题
- 不解决单表数据量问题

**2. 水平分库(Horizontal Sharding)**

<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">水平分库:按数据行拆分</text>
<rect x="250" y="45" width="200" height="80" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="350" y="70" text-anchor="middle" fill="white" font-size="13" font-weight="bold">users表</text>
<text x="350" y="90" text-anchor="middle" fill="white" font-size="11">1亿条数据</text>
<text x="350" y="110" text-anchor="middle" fill="white" font-size="11">性能瓶颈</text>
<path d="M 350 125 L 350 155" stroke="#FF9800" stroke-width="3" fill="none" marker-end="url(#arrowh1)"/>
<text x="350" y="145" text-anchor="middle" fill="#FF9800" font-size="11" font-weight="bold">按user_id%4拆分</text>
<rect x="30" y="165" width="140" height="100" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="100" y="190" text-anchor="middle" fill="white" font-size="12" font-weight="bold">DB_0</text>
<text x="50" y="215" fill="white" font-size="10">users表</text>
<text x="50" y="235" fill="white" font-size="10">user_id%4=0</text>
<text x="50" y="255" fill="white" font-size="10">2500万行</text>
<rect x="190" y="165" width="140" height="100" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="260" y="190" text-anchor="middle" fill="white" font-size="12" font-weight="bold">DB_1</text>
<text x="210" y="215" fill="white" font-size="10">users表</text>
<text x="210" y="235" fill="white" font-size="10">user_id%4=1</text>
<text x="210" y="255" fill="white" font-size="10">2500万行</text>
<rect x="350" y="165" width="140" height="100" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="420" y="190" text-anchor="middle" fill="white" font-size="12" font-weight="bold">DB_2</text>
<text x="370" y="215" fill="white" font-size="10">users表</text>
<text x="370" y="235" fill="white" font-size="10">user_id%4=2</text>
<text x="370" y="255" fill="white" font-size="10">2500万行</text>
<rect x="510" y="165" width="140" height="100" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="580" y="190" text-anchor="middle" fill="white" font-size="12" font-weight="bold">DB_3</text>
<text x="530" y="215" fill="white" font-size="10">users表</text>
<text x="530" y="235" fill="white" font-size="10">user_id%4=3</text>
<text x="530" y="255" fill="white" font-size="10">2500万行</text>
<defs><marker id="arrowh1" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#FF9800"/></marker></defs>
</svg>

**分片策略**:
- 范围分片:0-1000万在db_0,1000-2000万在db_1
- 哈希分片:user_id % N
- 时间分片:按月份、年份
- 地理分片:按地区

**优点**:
- 解决单表数据量问题
- 可线性扩展
- 提升并发能力

**缺点**:
- 路由复杂
- 跨分片查询困难
- 扩容需要数据迁移

**3. 对比表格**

| 维度 | 垂直分库 | 水平分库 |
|------|---------|---------|
| 拆分依据 | 按业务/表 | 按数据行 |
| 解决问题 | 业务耦合、单库压力 | 单表数据量大 |
| JOIN | 跨库JOIN困难 | 同分片可JOIN |
| 扩展性 | 受业务数量限制 | 可线性扩展 |
| 复杂度 | 中 | 高 |
| 路由策略 | 按表名路由 | 按分片键路由 |

#### 关键要点
1. **垂直**:按业务拆库拆表
2. **水平**:同一表数据拆分
3. **垂直先行**:先垂直再水平
4. **水平解数据**:解决数据量问题
5. **组合使用**:实际中两者结合

#### 记忆口诀
**"垂直分业务,水平分数据"**

---

---

### 45. 分库分表后如何解决跨库查询、事务问题？

#### 核心答案
跨库查询通过应用层聚合、ES等搜索引擎、冗余设计解决;分布式事务通过最终一致性、TCC、Seata等方案解决。

#### 详细说明

**1. 跨库查询问题及解决方案**

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="30" width="600" height="250" fill="#F5F5F5" stroke="#999" stroke-width="1" rx="5"/>
<text x="350" y="55" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">跨库查询解决方案</text>
<rect x="80" y="75" width="260" height="90" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="210" y="100" text-anchor="middle" fill="#1976D2" font-size="12" font-weight="bold">方案1:应用层聚合</text>
<text x="100" y="125" fill="#333" font-size="10">• 查询所有分片</text>
<text x="100" y="145" fill="#333" font-size="10">• 应用内存合并、排序、分页</text>
<text x="100" y="160" fill="#666" font-size="9">适合:数据量小,简单场景</text>
<rect x="360" y="75" width="260" height="90" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="490" y="100" text-anchor="middle" fill="#2E7D32" font-size="12" font-weight="bold">方案2:ES搜索引擎</text>
<text x="380" y="125" fill="#333" font-size="10">• 数据同步到ES</text>
<text x="380" y="145" fill="#333" font-size="10">• 复杂查询走ES</text>
<text x="380" y="160" fill="#666" font-size="9">适合:复杂查询,全文检索</text>
<rect x="80" y="180" width="260" height="90" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="210" y="205" text-anchor="middle" fill="#E65100" font-size="12" font-weight="bold">方案3:冗余设计</text>
<text x="100" y="230" fill="#333" font-size="10">• 订单表冗余用户名称</text>
<text x="100" y="250" fill="#333" font-size="10">• 避免JOIN查询</text>
<text x="100" y="265" fill="#666" font-size="9">适合:常见关联查询</text>
<rect x="360" y="180" width="260" height="90" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="490" y="205" text-anchor="middle" fill="#7B1FA2" font-size="12" font-weight="bold">方案4:全局表</text>
<text x="380" y="230" fill="#333" font-size="10">• 字典表、配置表等小表</text>
<text x="380" y="250" fill="#333" font-size="10">• 每个分片都保存一份</text>
<text x="380" y="265" fill="#666" font-size="9">适合:小表,不常变化</text>
</svg>

**2. 分布式事务问题及解决方案**

<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="20" width="600" height="240" fill="#F5F5F5" stroke="#999" stroke-width="1" rx="5"/>
<text x="350" y="45" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">分布式事务解决方案</text>
<rect x="80" y="60" width="260" height="85" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="210" y="82" text-anchor="middle" fill="#2E7D32" font-size="12" font-weight="bold">✓ 方案1:最终一致性(推荐)</text>
<text x="100" y="105" fill="#333" font-size="10">• 本地消息表</text>
<text x="100" y="122" fill="#333" font-size="10">• 消息队列(RocketMQ/Kafka)</text>
<text x="100" y="139" fill="#333" font-size="10">• 定时任务补偿</text>
<rect x="360" y="60" width="260" height="85" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="490" y="82" text-anchor="middle" fill="#E65100" font-size="12" font-weight="bold">方案2:TCC模式</text>
<text x="380" y="105" fill="#333" font-size="10">• Try:预留资源</text>
<text x="380" y="122" fill="#333" font-size="10">• Confirm:确认提交</text>
<text x="380" y="139" fill="#333" font-size="10">• Cancel:取消释放资源</text>
<rect x="80" y="160" width="260" height="85" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="210" y="182" text-anchor="middle" fill="#1976D2" font-size="12" font-weight="bold">方案3:Seata分布式事务</text>
<text x="100" y="205" fill="#333" font-size="10">• AT模式:自动补偿</text>
<text x="100" y="222" fill="#333" font-size="10">• TCC模式</text>
<text x="100" y="239" fill="#333" font-size="10">• SAGA模式</text>
<rect x="360" y="160" width="260" height="85" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="490" y="182" text-anchor="middle" fill="#7B1FA2" font-size="12" font-weight="bold">方案4:业务设计避免</text>
<text x="380" y="205" fill="#333" font-size="10">• 尽量单库事务</text>
<text x="380" y="222" fill="#333" font-size="10">• 业务流程拆分</text>
<text x="380" y="239" fill="#333" font-size="10">• 先本地后远程</text>
</svg>

**3. 其他问题解决**

**全局ID生成**:
- 雪花算法(Snowflake)
- Redis INCR
- UUID
- 数据库号段模式

**扩容缩容**:
- 双倍扩容(2→4→8)
- 数据迁移工具
- 停服迁移vs在线迁移

#### 关键要点
1. **跨库查询**:ES、应用聚合、冗余
2. **分布式事务**:最终一致性为主
3. **全局ID**:雪花算法等
4. **业务设计**:避免跨库操作
5. **中间件**:ShardingSphere、Seata

#### 记忆口诀
**"查用ES,事务靠补偿,ID用雪花"**

---

## 其他

46. MySQL 如何实现排序？filesort 和 index sort 的区别？

### 46. MySQL 如何实现排序？filesort 和 index sort 的区别？

#### 核心答案
MySQL排序有两种方式:index sort(利用索引有序性)和filesort(内存或磁盘排序)。index sort性能最好,filesort在数据量大时需要磁盘临时文件。

#### 详细说明

**1. Index Sort(索引排序)**

<svg viewBox="0 0 650 200" xmlns="http://www.w3.org/2000/svg">
<text x="325" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">Index Sort - 利用索引有序性</text>
<rect x="80" y="50" width="200" height="130" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="180" y="75" text-anchor="middle" fill="#2E7D32" font-size="12" font-weight="bold">B+树索引</text>
<text x="100" y="100" fill="#333" font-size="10">18</text>
<text x="100" y="120" fill="#333" font-size="10">25</text>
<text x="100" y="140" fill="#333" font-size="10">30</text>
<text x="100" y="160" fill="#333" font-size="10">45</text>
<text x="200" y="100" fill="#666" font-size="9">已排序</text>
<path d="M 280 110 L 350 110" stroke="#4CAF50" stroke-width="3" fill="none" marker-end="url(#arrowidx)"/>
<text x="315" y="100" text-anchor="middle" fill="#4CAF50" font-size="11" font-weight="bold">直接读取</text>
<rect x="350" y="50" width="220" height="130" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="460" y="75" text-anchor="middle" fill="#1976D2" font-size="12" font-weight="bold">结果集</text>
<text x="370" y="100" fill="#333" font-size="10">✓ 无需额外排序</text>
<text x="370" y="120" fill="#333" font-size="10">✓ 性能最好</text>
<text x="370" y="140" fill="#333" font-size="10">✓ 无内存开销</text>
<text x="370" y="160" fill="#666" font-size="9">EXPLAIN: Using index</text>
<defs><marker id="arrowidx" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#4CAF50"/></marker></defs>
</svg>

**条件**:
- ORDER BY字段有索引
- WHERE和ORDER BY使用同一个索引
- 扫描方式按索引顺序

**2. Filesort(文件排序)**

<svg viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">Filesort - 内存/磁盘排序</text>
<rect x="50" y="50" width="140" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="120" y="75" text-anchor="middle" fill="#C62828" font-size="12" font-weight="bold">无序数据</text>
<text x="70" y="100" fill="#333" font-size="10">45</text>
<text x="70" y="115" fill="#333" font-size="10">18</text>
<text x="70" y="125" fill="#333" font-size="10">30</text>
<path d="M 190 90 L 240 90" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arrowf1)"/>
<rect x="240" y="50" width="180" height="180" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="330" y="75" text-anchor="middle" fill="#E65100" font-size="12" font-weight="bold">sort_buffer</text>
<text x="260" y="100" fill="#333" font-size="10">1. 读取数据</text>
<text x="260" y="120" fill="#333" font-size="10">2. 内存排序</text>
<text x="260" y="140" fill="#333" font-size="10">3. 不够用?</text>
<text x="280" y="160" fill="#666" font-size="9">→磁盘临时文件</text>
<text x="260" y="180" fill="#333" font-size="10">4. 外部归并排序</text>
<path d="M 420 110 L 480 110" stroke="#4CAF50" stroke-width="2" fill="none" marker-end="url(#arrowf2)"/>
<rect x="480" y="70" width="170" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="565" y="95" text-anchor="middle" fill="#2E7D32" font-size="12" font-weight="bold">有序结果</text>
<text x="500" y="120" fill="#333" font-size="10">18, 30, 45...</text>
<text x="500" y="140" fill="#666" font-size="9">EXPLAIN: Using filesort</text>
<defs><marker id="arrowf1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#FF9800"/></marker><marker id="arrowf2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#4CAF50"/></marker></defs>
</svg>

**触发条件**:
- ORDER BY字段无索引
- 排序字段和索引顺序不一致
- 使用了SELECT *导致回表

**Filesort算法**:
- **单路排序**:一次性读取所有需要的列,占用内存大
- **双路排序**:先读取排序字段和主键,排序后再回表,占用内存小

**3. 对比总结**

| 维度 | Index Sort | Filesort |
|------|-----------|----------|
| 原理 | 利用索引有序性 | 内存/磁盘排序 |
| 性能 | 最好 | 较差 |
| 内存消耗 | 无额外消耗 | 需要sort_buffer |
| 磁盘IO | 索引扫描 | 可能需要临时文件 |
| EXPLAIN | Using index | Using filesort |
| 适用 | 有合适索引 | 无索引或复杂排序 |

#### 关键要点
1. **Index Sort**:利用索引,性能最好
2. **Filesort**:内存/磁盘排序,性能较差
3. **优化**:创建合适索引,减少SELECT字段
4. **配置**:调整sort_buffer_size
5. **EXPLAIN**:通过Extra字段判断

#### 记忆口诀
**"索引排最快,文件排要慢,加索引优先"**

---
---

### 47. MySQL 的架构是怎样的？

#### 核心答案
MySQL采用分层架构:连接层(管理连接)、服务层(SQL解析优化)、引擎层(存储数据)、存储层(文件系统)。

#### 详细说明

**MySQL四层架构**

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" fill="#333" font-size="16" font-weight="bold">MySQL分层架构</text>
<rect x="100" y="50" width="500" height="70" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="350" y="75" text-anchor="middle" fill="#1976D2" font-size="13" font-weight="bold">连接层(Connection Layer)</text>
<text x="120" y="95" fill="#333" font-size="11">• 客户端连接管理</text>
<text x="350" y="95" fill="#333" font-size="11">• 身份验证</text>
<text x="500" y="95" fill="#333" font-size="11">• 权限校验</text>
<text x="120" y="112" fill="#333" font-size="11">• 连接池管理</text>
<path d="M 350 120 L 350 145" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow47)"/>
<rect x="100" y="145" width="500" height="130" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="350" y="170" text-anchor="middle" fill="#2E7D32" font-size="13" font-weight="bold">服务层(SQL Layer / Server Layer)</text>
<rect x="120" y="185" width="200" height="75" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="220" y="205" text-anchor="middle" fill="#1B5E20" font-size="11" font-weight="bold">Parser(解析器)</text>
<text x="140" y="225" fill="#333" font-size="10">词法分析、语法分析</text>
<text x="140" y="242" fill="#333" font-size="10">生成解析树</text>
<rect x="340" y="185" width="230" height="75" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1" rx="3"/>
<text x="455" y="205" text-anchor="middle" fill="#1B5E20" font-size="11" font-weight="bold">Optimizer(优化器)</text>
<text x="360" y="225" fill="#333" font-size="10">选择最优执行计划</text>
<text x="360" y="242" fill="#333" font-size="10">决定使用哪个索引</text>
<path d="M 350 275 L 350 300" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow472)"/>
<rect x="100" y="300" width="500" height="70" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="350" y="325" text-anchor="middle" fill="#E65100" font-size="13" font-weight="bold">存储引擎层(Storage Engine Layer)</text>
<text x="120" y="345" fill="#333" font-size="11">• InnoDB(默认,事务,行锁)</text>
<text x="370" y="345" fill="#333" font-size="11">• MyISAM(表锁,不支持事务)</text>
<text x="120" y="362" fill="#333" font-size="11">• Memory(内存引擎)</text>
<text x="370" y="362" fill="#333" font-size="11">• Archive(归档,高压缩)</text>
<path d="M 350 370 L 350 395" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow473)"/>
<rect x="100" y="395" width="500" height="50" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="350" y="417" text-anchor="middle" fill="#7B1FA2" font-size="13" font-weight="bold">存储层(File System)</text>
<text x="120" y="435" fill="#333" font-size="11">• 数据文件(.ibd)</text>
<text x="300" y="435" fill="#333" font-size="11">• 日志文件(binlog,redo,undo)</text>
<text x="520" y="435" fill="#333" font-size="11">• 配置文件</text>
<defs><marker id="arrow47" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#666"/></marker><marker id="arrow472" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#666"/></marker><marker id="arrow473" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#666"/></marker></defs>
</svg>

**SQL执行流程**

<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
<text x="300" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">SQL执行流程</text>
<rect x="220" y="40" width="160" height="40" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="300" y="65" text-anchor="middle" fill="#1976D2" font-size="12">1. 客户端连接</text>
<path d="M 300 80 L 300 100" stroke="#666" stroke-width="2" fill="none" marker-end="url(#a1)"/>
<rect x="220" y="100" width="160" height="40" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="300" y="125" text-anchor="middle" fill="#1976D2" font-size="12">2. 权限验证</text>
<path d="M 300 140 L 300 160" stroke="#666" stroke-width="2" fill="none" marker-end="url(#a2)"/>
<rect x="220" y="160" width="160" height="40" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="300" y="185" text-anchor="middle" fill="#2E7D32" font-size="12">3. 解析器(Parser)</text>
<path d="M 300 200 L 300 220" stroke="#666" stroke-width="2" fill="none" marker-end="url(#a3)"/>
<rect x="220" y="220" width="160" height="40" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="300" y="245" text-anchor="middle" fill="#2E7D32" font-size="12">4. 优化器(Optimizer)</text>
<path d="M 300 260 L 300 280" stroke="#666" stroke-width="2" fill="none" marker-end="url(#a4)"/>
<rect x="220" y="280" width="160" height="40" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="300" y="305" text-anchor="middle" fill="#E65100" font-size="12">5. 执行器(Executor)</text>
<path d="M 300 320 L 300 340" stroke="#666" stroke-width="2" fill="none" marker-end="url(#a5)"/>
<rect x="220" y="340" width="160" height="40" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="300" y="365" text-anchor="middle" fill="#7B1FA2" font-size="12">6. 存储引擎</text>
<text x="50" y="185" fill="#666" font-size="10">生成语法树</text>
<text x="50" y="245" fill="#666" font-size="10">生成执行计划</text>
<text x="420" y="305" fill="#666" font-size="10">调用存储引擎API</text>
<text x="420" y="365" fill="#666" font-size="10">返回数据</text>
<defs><marker id="a1" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#666"/></marker><marker id="a2" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#666"/></marker><marker id="a3" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#666"/></marker><marker id="a4" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#666"/></marker><marker id="a5" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#666"/></marker></defs>
</svg>

#### 关键要点
1. **分层架构**:连接、服务、引擎、存储
2. **核心**:服务层负责SQL处理
3. **可插拔**:存储引擎可替换
4. **优化器**:决定执行计划
5. **InnoDB**:默认且推荐的引擎

#### 记忆口诀
**"连服引存,层层分明"**
- **连**:连接层
- **服**:服务层
- **引**:引擎层
- **存**:存储层

---

---

### 48. 什么是 MVCC？如何实现？

#### 核心答案
MVCC(多版本并发控制)通过保存数据的历史版本,实现读写不阻塞。基于undo log、隐藏字段(trx_id、roll_pointer)和ReadView实现。

#### 详细说明

**1. MVCC概念**

<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">MVCC - 多版本并发控制</text>
<rect x="50" y="50" width="280" height="130" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="190" y="75" text-anchor="middle" fill="#C62828" font-size="12" font-weight="bold">传统锁机制</text>
<text x="70" y="100" fill="#333" font-size="10">• 读加共享锁</text>
<text x="70" y="120" fill="#333" font-size="10">• 写加排他锁</text>
<text x="70" y="140" fill="#333" font-size="10">• 读写互斥</text>
<text x="70" y="160" fill="#666" font-size="9">✗ 并发性能差</text>
<path d="M 330 115 L 370 115" stroke="#4CAF50" stroke-width="3" fill="none" marker-end="url(#arrowmvcc)"/>
<text x="350" y="105" text-anchor="middle" fill="#4CAF50" font-size="11" font-weight="bold">改进</text>
<rect x="370" y="50" width="280" height="130" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="510" y="75" text-anchor="middle" fill="#2E7D32" font-size="12" font-weight="bold">MVCC机制</text>
<text x="390" y="100" fill="#333" font-size="10">• 读不加锁</text>
<text x="390" y="120" fill="#333" font-size="10">• 读写不阻塞</text>
<text x="390" y="140" fill="#333" font-size="10">• 快照读vs当前读</text>
<text x="390" y="160" fill="#666" font-size="9">✓ 高并发性能</text>
<defs><marker id="arrowmvcc" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#4CAF50"/></marker></defs>
</svg>

**2. MVCC实现原理 - 三大组件**

**①隐藏字段**

<svg viewBox="0 0 700 140" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="20" text-anchor="middle" fill="#333" font-size="13" font-weight="bold">每行记录的隐藏字段</text>
<rect x="80" y="35" width="540" height="90" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<rect x="100" y="55" width="150" height="60" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="175" y="75" text-anchor="middle" fill="#0D47A1" font-size="11" font-weight="bold">DB_TRX_ID</text>
<text x="110" y="95" fill="#333" font-size="9">最后修改该行的</text>
<text x="110" y="108" fill="#333" font-size="9">事务ID(6字节)</text>
<rect x="270" y="55" width="150" height="60" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="345" y="75" text-anchor="middle" fill="#0D47A1" font-size="11" font-weight="bold">DB_ROLL_PTR</text>
<text x="280" y="95" fill="#333" font-size="9">回滚指针,指向</text>
<text x="280" y="108" fill="#333" font-size="9">undo log(7字节)</text>
<rect x="440" y="55" width="160" height="60" fill="#BBDEFB" stroke="#1976D2" stroke-width="1" rx="3"/>
<text x="520" y="75" text-anchor="middle" fill="#0D47A1" font-size="11" font-weight="bold">DB_ROW_ID</text>
<text x="450" y="95" fill="#333" font-size="9">隐藏主键(6字节)</text>
<text x="450" y="108" fill="#333" font-size="9">无主键时使用</text>
</svg>

**②Undo Log版本链**

<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="20" text-anchor="middle" fill="#333" font-size="13" font-weight="bold">Undo Log版本链</text>
<rect x="420" y="40" width="200" height="60" fill="#4CAF50" stroke="#2E5C8A" stroke-width="2" rx="5"/>
<text x="520" y="60" text-anchor="middle" fill="white" font-size="11" font-weight="bold">最新版本</text>
<text x="440" y="80" fill="white" font-size="10">name='Bob'</text>
<text x="440" y="95" fill="white" font-size="9">trx_id=100</text>
<path d="M 420 70 L 340 70" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arrowundo1)"/>
<text x="370" y="60" text-anchor="middle" fill="#FF9800" font-size="9">roll_ptr</text>
<rect x="140" y="40" width="200" height="60" fill="#7CB342" stroke="#558B2F" stroke-width="2" rx="5"/>
<text x="240" y="60" text-anchor="middle" fill="white" font-size="11" font-weight="bold">旧版本1</text>
<text x="160" y="80" fill="white" font-size="10">name='Alice'</text>
<text x="160" y="95" fill="white" font-size="9">trx_id=99</text>
<path d="M 140 70 L 60 70" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arrowundo2)"/>
<text x="90" y="60" text-anchor="middle" fill="#FF9800" font-size="9">roll_ptr</text>
<rect x="0" y="140" width="120" height="50" fill="#9E9E9E" stroke="#616161" stroke-width="2" rx="5"/>
<text x="60" y="160" text-anchor="middle" fill="white" font-size="11" font-weight="bold">旧版本2</text>
<text x="20" y="180" fill="white" font-size="10">name='Tom'</text>
<path d="M 60 120 L 60 140" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arrowundo3)"/>
<defs><marker id="arrowundo1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#FF9800"/></marker><marker id="arrowundo2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#FF9800"/></marker><marker id="arrowundo3" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#FF9800"/></marker></defs>
</svg>

**③ReadView(读视图)**

快照读时生成,包含:
- `m_ids`:当前活跃事务ID列表
- `min_trx_id`:最小活跃事务ID
- `max_trx_id`:下一个要分配的事务ID
- `creator_trx_id`:当前事务ID

**3. 可见性判断规则**

<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">版本可见性判断流程</text>
<rect x="220" y="45" width="260" height="40" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="350" y="70" text-anchor="middle" fill="#1976D2" font-size="11">trx_id == creator_trx_id?</text>
<path d="M 350 85 L 350 110" stroke="#666" stroke-width="2" fill="none" marker-end="url(#av1)"/>
<text x="380" y="100" fill="#4CAF50" font-size="10">Yes → 可见</text>
<rect x="220" y="110" width="260" height="40" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="350" y="135" text-anchor="middle" fill="#1976D2" font-size="11">trx_id < min_trx_id?</text>
<path d="M 350 150 L 350 175" stroke="#666" stroke-width="2" fill="none" marker-end="url(#av2)"/>
<text x="380" y="165" fill="#4CAF50" font-size="10">Yes → 可见</text>
<rect x="220" y="175" width="260" height="40" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="350" y="200" text-anchor="middle" fill="#1976D2" font-size="11">trx_id >= max_trx_id?</text>
<path d="M 350 215 L 350 240" stroke="#666" stroke-width="2" fill="none" marker-end="url(#av3)"/>
<text x="390" y="230" fill="#F44336" font-size="10">Yes → 不可见</text>
<rect x="180" y="240" width="340" height="30" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="350" y="260" text-anchor="middle" fill="#E65100" font-size="10">min_trx_id ≤ trx_id < max_trx_id: 看是否在m_ids中</text>
<defs><marker id="av1" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#666"/></marker><marker id="av2" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#666"/></marker><marker id="av3" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,0 L3,9 z" fill="#666"/></marker></defs>
</svg>

**4. RC vs RR的ReadView差异**

| 隔离级别 | ReadView生成时机 | 特点 |
|---------|----------------|------|
| READ COMMITTED(RC) | 每次SELECT都生成新的 | 能读到其他事务已提交的最新数据,不可重复读 |
| REPEATABLE READ(RR) | 事务开始时生成一次 | 整个事务期间使用同一个ReadView,可重复读 |

**5. 快照读vs当前读**

- **快照读**:普通SELECT,使用MVCC,不加锁
- **当前读**:SELECT FOR UPDATE、UPDATE、INSERT、DELETE,读最新版本,加锁

#### 关键要点
1. **目的**:读写不阻塞,提升并发
2. **基础**:undo log版本链
3. **核心**:ReadView可见性判断
4. **隔离级别**:RC每次生成,RR一次生成
5. **快照读**:用MVCC;当前读:加锁

#### 记忆口诀
**"版本链,读视图,可见性判断"**

---

---

### 49. COUNT(*) 和 COUNT(1) 和 COUNT(列名) 的区别？

#### 核心答案
COUNT(*)和COUNT(1)效果相同,MySQL会优化为COUNT(*);COUNT(列名)不统计NULL值。InnoDB中COUNT(*)需全表扫描,MyISAM有计数器直接返回。

#### 详细说明

**1. 三种COUNT的区别**

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">三种COUNT对比</text>
<rect x="80" y="50" width="180" height="100" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="170" y="75" text-anchor="middle" fill="#2E7D32" font-size="13" font-weight="bold">COUNT(*)</text>
<text x="100" y="100" fill="#333" font-size="10">• 统计所有行</text>
<text x="100" y="120" fill="#333" font-size="10">• 不忽略NULL</text>
<text x="100" y="140" fill="#666" font-size="9">结果:3</text>
<rect x="280" y="50" width="180" height="100" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="370" y="75" text-anchor="middle" fill="#2E7D32" font-size="13" font-weight="bold">COUNT(1)</text>
<text x="300" y="100" fill="#333" font-size="10">• 等同COUNT(*)</text>
<text x="300" y="120" fill="#333" font-size="10">• MySQL内部转换</text>
<text x="300" y="140" fill="#666" font-size="9">结果:3</text>
<rect x="480" y="50" width="180" height="100" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="570" y="75" text-anchor="middle" fill="#E65100" font-size="13" font-weight="bold">COUNT(列名)</text>
<text x="500" y="100" fill="#333" font-size="10">• 统计非NULL行</text>
<text x="500" y="120" fill="#333" font-size="10">• NULL不计入</text>
<text x="500" y="140" fill="#666" font-size="9">结果:2</text>
<rect x="80" y="180" width="580" height="100" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="370" y="205" text-anchor="middle" fill="#1976D2" font-size="12" font-weight="bold">示例表数据</text>
<text x="100" y="230" fill="#333" font-size="10" font-family="monospace">id | name</text>
<text x="100" y="248" fill="#333" font-size="10" font-family="monospace">---|-----</text>
<text x="100" y="265" fill="#333" font-size="10" font-family="monospace">1  | Alice</text>
<text x="280" y="265" fill="#333" font-size="10" font-family="monospace">2  | Bob</text>
<text x="440" y="265" fill="#333" font-size="10" font-family="monospace">3  | NULL</text>
</svg>

**2. 性能对比**

<svg viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">InnoDB vs MyISAM性能</text>
<rect x="80" y="50" width="280" height="170" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="220" y="75" text-anchor="middle" fill="#C62828" font-size="13" font-weight="bold">InnoDB</text>
<text x="100" y="100" fill="#333" font-size="10">• 没有计数器</text>
<text x="100" y="120" fill="#333" font-size="10">• 需要全表扫描</text>
<text x="100" y="140" fill="#333" font-size="10">• 选最小索引扫描</text>
<text x="100" y="165" fill="#666" font-size="10" font-weight="bold">优化:</text>
<text x="100" y="185" fill="#666" font-size="9">- 二级索引比主键小</text>
<text x="100" y="202" fill="#666" font-size="9">- 自动选二级索引</text>
<rect x="380" y="50" width="280" height="170" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="520" y="75" text-anchor="middle" fill="#2E7D32" font-size="13" font-weight="bold">MyISAM</text>
<text x="400" y="100" fill="#333" font-size="10">• 维护计数器</text>
<text x="400" y="120" fill="#333" font-size="10">• COUNT(*) O(1)</text>
<text x="400" y="140" fill="#333" font-size="10">• 直接返回</text>
<text x="400" y="165" fill="#666" font-size="10" font-weight="bold">注意:</text>
<text x="400" y="185" fill="#666" font-size="9">- 有WHERE时仍需扫描</text>
<text x="400" y="202" fill="#666" font-size="9">- 无WHERE才O(1)</text>
</svg>

**3. COUNT(*)优化方案**

<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="30" width="600" height="150" fill="#F5F5F5" stroke="#999" stroke-width="1" rx="5"/>
<text x="350" y="55" text-anchor="middle" fill="#333" font-size="13" font-weight="bold">InnoDB优化方案</text>
<rect x="70" y="70" width="180" height="90" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="160" y="92" text-anchor="middle" fill="#1976D2" font-size="11" font-weight="bold">方案1:近似值</text>
<text x="85" y="115" fill="#333" font-size="9">SHOW TABLE STATUS</text>
<text x="85" y="132" fill="#333" font-size="9">或统计信息</text>
<text x="85" y="149" fill="#666" font-size="8">不精确但快</text>
<rect x="265" y="70" width="180" height="90" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="355" y="92" text-anchor="middle" fill="#2E7D32" font-size="11" font-weight="bold">方案2:计数表</text>
<text x="280" y="115" fill="#333" font-size="9">单独表维护count</text>
<text x="280" y="132" fill="#333" font-size="9">+1/-1更新</text>
<text x="280" y="149" fill="#666" font-size="8">精确,事务一致</text>
<rect x="460" y="70" width="180" height="90" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="550" y="92" text-anchor="middle" fill="#E65100" font-size="11" font-weight="bold">方案3:Redis计数</text>
<text x="475" y="115" fill="#333" font-size="9">INCR/DECR</text>
<text x="475" y="132" fill="#333" font-size="9">超高性能</text>
<text x="475" y="149" fill="#666" font-size="8">可能不一致</text>
</svg>

#### 关键要点
1. **COUNT(*)和COUNT(1)**:效果相同,推荐用COUNT(*)
2. **COUNT(列名)**:不统计NULL
3. **InnoDB**:需要扫描,慢
4. **MyISAM**:有计数器,快
5. **优化**:Redis计数或计数表

#### 记忆口诀
**"星和一相同,列名去NULL,InnoDB慢用Redis"**

---

---

### 50. 如何设计一个高性能的数据库表？

#### 核心答案
高性能表设计遵循:选对存储引擎(InnoDB)、合理字段类型、恰当索引、适度范式、避免大字段、考虑分区分表。

#### 详细说明

**1. 设计原则概览**

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">高性能表设计六大原则</text>
<rect x="60" y="50" width="190" height="80" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="155" y="72" text-anchor="middle" fill="#1976D2" font-size="11" font-weight="bold">1. 存储引擎</text>
<text x="75" y="95" fill="#333" font-size="9">✓ 优先InnoDB</text>
<text x="75" y="110" fill="#333" font-size="9">✓ 事务+行锁</text>
<text x="75" y="125" fill="#333" font-size="9">✓ 崩溃恢复</text>
<rect x="265" y="50" width="190" height="80" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="360" y="72" text-anchor="middle" fill="#2E7D32" font-size="11" font-weight="bold">2. 字段类型</text>
<text x="280" y="95" fill="#333" font-size="9">✓ 更小的更好</text>
<text x="280" y="110" fill="#333" font-size="9">✓ 简单就好</text>
<text x="280" y="125" fill="#333" font-size="9">✓ 避免NULL</text>
<rect x="470" y="50" width="190" height="80" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="565" y="72" text-anchor="middle" fill="#E65100" font-size="11" font-weight="bold">3. 索引设计</text>
<text x="485" y="95" fill="#333" font-size="9">✓ 高频查询加索引</text>
<text x="485" y="110" fill="#333" font-size="9">✓ 区分度高优先</text>
<text x="485" y="125" fill="#333" font-size="9">✓ 不要过多</text>
<rect x="60" y="145" width="190" height="80" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="155" y="167" text-anchor="middle" fill="#7B1FA2" font-size="11" font-weight="bold">4. 范式设计</text>
<text x="75" y="190" fill="#333" font-size="9">✓ 遵循三范式</text>
<text x="75" y="205" fill="#333" font-size="9">✓ 适度反范式</text>
<text x="75" y="220" fill="#333" font-size="9">✓ 减少JOIN</text>
<rect x="265" y="145" width="190" height="80" fill="#FFEBEE" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="360" y="167" text-anchor="middle" fill="#C62828" font-size="11" font-weight="bold">5. 大字段处理</text>
<text x="280" y="190" fill="#333" font-size="9">✓ TEXT/BLOB分离</text>
<text x="280" y="205" fill="#333" font-size="9">✓ 冷热数据分离</text>
<text x="280" y="220" fill="#333" font-size="9">✓ 扩展表</text>
<rect x="470" y="145" width="190" height="80" fill="#E0F2F1" stroke="#009688" stroke-width="2" rx="5"/>
<text x="565" y="167" text-anchor="middle" fill="#00695C" font-size="11" font-weight="bold">6. 分区分表</text>
<text x="485" y="190" fill="#333" font-size="9">✓ 千万级考虑</text>
<text x="485" y="205" fill="#333" font-size="9">✓ 按时间/哈希</text>
<text x="485" y="220" fill="#333" font-size="9">✓ 垂直+水平</text>
<rect x="60" y="240" width="600" height="60" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2" rx="5"/>
<text x="360" y="265" text-anchor="middle" fill="#F57F17" font-size="11" font-weight="bold">性能检查清单</text>
<text x="80" y="285" fill="#333" font-size="9">✓ 自增主键 ✓ NOT NULL尽量 ✓ 索引3-5个 ✓ 字段类型最小 ✓ utf8mb4字符集</text>
</svg>

**2. 字段类型选择**

<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
<text x="350" y="20" text-anchor="middle" fill="#333" font-size="13" font-weight="bold">常用字段类型选择建议</text>
<rect x="50" y="40" width="600" height="160" fill="#F5F5F5" stroke="#999" stroke-width="1" rx="5"/>
<text x="80" y="65" fill="#1976D2" font-size="10" font-weight="bold">整数类型:</text>
<text x="80" y="85" fill="#333" font-size="9" font-family="monospace">TINYINT(1字节)  -128~127     → 状态、年龄</text>
<text x="80" y="102" fill="#333" font-size="9" font-family="monospace">INT(4字节)      -21亿~21亿   → 常规ID</text>
<text x="80" y="119" fill="#333" font-size="9" font-family="monospace">BIGINT(8字节)   超大范围      → 大数据ID</text>
<text x="80" y="142" fill="#1976D2" font-size="10" font-weight="bold">字符串:</text>
<text x="80" y="162" fill="#333" font-size="9" font-family="monospace">VARCHAR(N)      变长,按需     → 姓名、标题</text>
<text x="80" y="179" fill="#333" font-size="9" font-family="monospace">CHAR(N)         定长,空间换速度→ 固定长度编码</text>
<text x="400" y="65" fill="#1976D2" font-size="10" font-weight="bold">时间类型:</text>
<text x="400" y="85" fill="#333" font-size="9" font-family="monospace">DATETIME(8字节) 1000-9999年</text>
<text x="400" y="102" fill="#333" font-size="9" font-family="monospace">TIMESTAMP(4字节) 1970-2038年</text>
<text x="400" y="119" fill="#666" font-size="8">推荐DATETIME,范围大</text>
<text x="400" y="142" fill="#1976D2" font-size="10" font-weight="bold">金额:</text>
<text x="400" y="162" fill="#333" font-size="9" font-family="monospace">DECIMAL(10,2)   精确小数</text>
<text x="400" y="179" fill="#666" font-size="8">不用FLOAT/DOUBLE</text>
</svg>

**3. 索引设计要点**

- **高频查询字段**:WHERE、ORDER BY、GROUP BY的字段
- **区分度高**:唯一值多的字段(如手机号,不如性别)
- **联合索引**:遵循最左前缀原则
- **覆盖索引**:SELECT的字段都在索引中
- **不要过多**:一般3-5个,影响写入性能
- **字符串前缀索引**:长字符串只索引前N个字符

**4. 反范式设计示例**

适度冗余减少JOIN:
```sql
-- 订单表冗余用户信息
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  user_name VARCHAR(50),    -- 冗余,避免JOIN users表
  amount DECIMAL(10,2)
);
```

**5. 大字段处理**

```sql
-- 主表:常用字段
CREATE TABLE articles (
  id INT PRIMARY KEY,
  title VARCHAR(200),
  author VARCHAR(50),
  created_at DATETIME
);

-- 扩展表:大字段
CREATE TABLE article_content (
  article_id INT PRIMARY KEY,
  content TEXT,              -- 大字段独立
  FOREIGN KEY (article_id) REFERENCES articles(id)
);
```

#### 关键要点
1. **字段类型**:够用就好,越小越好
2. **索引**:精准创建,不贪多
3. **范式**:适度反范式,减少JOIN
4. **大字段**:分离存储
5. **分区分表**:千万级数据考虑

#### 记忆口诀
**"类型小,索引精,冷热分,适度冗"**
- **类型小**:字段类型尽量小
- **索引精**:精准创建索引
- **冷热分**:冷热数据分离
- **适度冗**:适度冗余字段
