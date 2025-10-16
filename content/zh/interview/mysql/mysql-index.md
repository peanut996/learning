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
