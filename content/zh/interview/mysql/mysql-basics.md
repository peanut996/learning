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
