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

### 21. 什么是行锁、表锁、页锁?

#### 核心答案

**行锁**(Row Lock):锁定单行数据,InnoDB默认使用,并发性能最好。

**表锁**(Table Lock):锁定整张表,MyISAM使用,并发性能最差,但开销小。

**页锁**(Page Lock):锁定数据页(8-16KB),介于行锁和表锁之间,BDB引擎使用(已不常用)。

#### 详细说明

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
