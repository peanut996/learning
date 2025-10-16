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
