## 高可用与性能

### 39. 什么是主从复制？如何实现？

#### 核心答案
主从复制是MySQL通过binlog将主库数据变更同步到从库的机制,实现数据备份和读写分离。流程:主库写binlog → 从库IO线程读取 → 写入relay log → SQL线程重放。

#### 详细说明

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

#### 关键要点
1. **binlog是核心**:主从复制依赖binlog
2. **三线程模型**:dump、IO、SQL线程
3. **异步复制**:主库不等从库,有延迟
4. **server-id唯一**:每个MySQL实例需不同ID
5. **监控指标**:Seconds_Behind_Master(延迟时间)

#### 记忆口诀
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
