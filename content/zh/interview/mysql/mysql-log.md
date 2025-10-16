## 日志

### 34. MySQL 有哪些日志文件?

#### 核心答案
MySQL主要有四类日志:错误日志、二进制日志(binlog)、查询日志、慢查询日志,以及InnoDB特有的redo log和undo log。

#### 详细说明

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

#### 关键要点
1. **Server层**:错误、binlog、查询、慢查询
2. **InnoDB层**:redo log(持久性)、undo log(原子性+MVCC)
3. **binlog vs redo log**:一个在Server层,一个在引擎层
4. **慢查询日志**:性能优化的关键工具
5. **Redo Log**:循环写,固定大小;Undo Log:随事务增长

#### 记忆口诀
**"错二查慢,重回持原"**
- **错**:错误日志
- **二**:二进制日志(binlog)
- **查**:查询日志
- **慢**:慢查询日志
- **重**:Redo Log(重做)
- **回**:Undo Log(回滚)
- **持**:持久性(Redo)
- **原**:原子性(Undo)

### 35. 什么是 binlog?有什么作用?

#### 核心答案
binlog(Binary Log)是MySQL Server层的二进制日志,记录所有修改数据的SQL语句,主要用于主从复制和数据恢复。

#### 详细说明

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

#### 关键要点
1. **位置**:Server层,所有引擎共享
2. **格式**:STATEMENT、ROW(推荐)、MIXED
3. **用途**:主从复制、数据恢复、审计
4. **安全性**:`sync_binlog=1`每次提交都刷盘
5. **与redo log配合**:两阶段提交保证一致性

#### 记忆口诀
**"服务复恢审,行格最安全"**
- **服务**:Server层
- **复**:复制
- **恢**:恢复
- **审**:审计
- **行格**:ROW格式
- **安全**:sync_binlog=1

### 36. 什么是 redo log 和 undo log?

#### 核心答案
- **Redo Log**:InnoDB重做日志,记录物理数据页的修改,用于崩溃恢复,保证持久性(D)
- **Undo Log**:InnoDB回滚日志,记录逻辑相反操作,用于事务回滚和MVCC,保证原子性(A)

#### 详细说明

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

#### 关键要点
1. **Redo Log**:崩溃恢复,物理日志,循环写,保证持久性
2. **Undo Log**:事务回滚,逻辑日志,MVCC,保证原子性
3. **WAL机制**:先写redo log,后写数据页
4. **协同工作**:Redo保证不丢,Undo保证可回滚
5. **配置关键**:`innodb_flush_log_at_trx_commit=1`保证安全

#### 记忆口诀
**"重做持久物循环,回滚原子逻版本"**
- **重做**:Redo Log
- **持久**:持久性
- **物**:物理日志
- **循环**:循环写入
- **回滚**:Undo Log
- **原子**:原子性
- **逻**:逻辑日志
- **版本**:MVCC多版本

### 37. binlog 和 redo log 的区别是什么?

#### 核心答案
binlog是MySQL Server层的逻辑日志,用于复制和恢复;redo log是InnoDB引擎层的物理日志,用于崩溃恢复。两者通过两阶段提交保证一致性。

#### 详细说明

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

#### 关键要点
1. **层级不同**:binlog在Server层,redo log在InnoDB层
2. **用途不同**:binlog用于复制恢复,redo log用于崩溃恢复
3. **格式不同**:binlog是逻辑日志,redo log是物理日志
4. **写入不同**:binlog追加写,redo log循环写
5. **配合使用**:两阶段提交保证一致性

#### 记忆口诀
**"服逻追复,引物循崩"**
- **服**:Server层(binlog)
- **逻**:逻辑日志(binlog)
- **追**:追加写(binlog)
- **复**:复制(binlog)
- **引**:引擎层(redo log)
- **物**:物理日志(redo log)
- **循**:循环写(redo log)
- **崩**:崩溃恢复(redo log)

### 38. 什么是两阶段提交?

#### 核心答案
两阶段提交(Two-Phase Commit)是MySQL为保证binlog和redo log一致性而采用的提交协议,分为prepare和commit两个阶段。

#### 详细说明

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

#### 关键要点
1. **目的**:保证binlog和redo log的一致性
2. **阶段**:Prepare(写redo log) → Write Binlog → Commit
3. **恢复**:根据binlog是否完整决定提交或回滚
4. **代价**:多一次fsync,但保证了一致性
5. **配置**:两个参数都设为1最安全

#### 记忆口诀
**"准写提,日志双保险"**
- **准**:Prepare阶段
- **写**:Write Binlog
- **提**:Commit阶段
- **双保险**:binlog和redo log都完整才提交
