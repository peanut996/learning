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

21. 什么是行锁、表锁、页锁？
22. 什么是共享锁（S锁）和排他锁（X锁）？
23. 什么是意向锁？
24. 什么是间隙锁、临键锁？
25. 如何避免死锁？
26. 什么是乐观锁和悲观锁？如何实现？

## SQL 优化

27. 如何分析 SQL 的性能？EXPLAIN 的作用是什么？
28. 如何优化慢查询？
29. 什么是 SQL 注入？如何防止？
30. 大表如何优化？
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
50. 如何设计一个高性能的数据库表？