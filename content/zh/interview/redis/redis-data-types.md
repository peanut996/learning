## 数据类型

### 6. String 类型的使用场景和常用命令有哪些？

**核心答案**：String 是 Redis 最基础的数据类型，可以存储字符串、数字、二进制数据，常用于缓存、计数器、分布式锁、限流等场景。

**详细说明**：

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">String 类型全景图</text>
<rect x="30" y="60" width="790" height="240" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">String 的四大使用场景</text>
<rect x="50" y="110" width="180" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 缓存</text>
<text x="60" y="160" font-size="10">• 用户信息缓存</text>
<text x="60" y="180" font-size="10">• 商品详情缓存</text>
<text x="60" y="200" font-size="10">• 页面缓存</text>
<text x="60" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="60" y="245" font-size="9" font-family="monospace">SET/GET/SETEX</text>
<text x="60" y="265" font-size="9" fill="#1976d2" font-weight="bold">✓ 最常用场景</text>
<rect x="245" y="110" width="180" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 计数器</text>
<text x="255" y="160" font-size="10">• 文章阅读量</text>
<text x="255" y="180" font-size="10">• 点赞数统计</text>
<text x="255" y="200" font-size="10">• 库存数量</text>
<text x="255" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="255" y="245" font-size="9" font-family="monospace">INCR/DECR/INCRBY</text>
<text x="255" y="265" font-size="9" fill="#388e3c" font-weight="bold">✓ 原子操作</text>
<rect x="440" y="110" width="180" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 分布式锁</text>
<text x="450" y="160" font-size="10">• 防止重复提交</text>
<text x="450" y="180" font-size="10">• 秒杀库存控制</text>
<text x="450" y="200" font-size="10">• 定时任务互斥</text>
<text x="450" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="450" y="245" font-size="9" font-family="monospace">SET NX EX</text>
<text x="450" y="265" font-size="9" fill="#f57c00" font-weight="bold">✓ 高可用</text>
<rect x="635" y="110" width="170" height="170" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 限流</text>
<text x="645" y="160" font-size="10">• API 限流</text>
<text x="645" y="180" font-size="10">• 滑动窗口</text>
<text x="645" y="200" font-size="10">• 令牌桶</text>
<text x="645" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="645" y="245" font-size="9" font-family="monospace">INCR + EXPIRE</text>
<text x="645" y="265" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 高性能</text>
<rect x="30" y="320" width="790" height="300" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="350" text-anchor="middle" font-size="14" font-weight="bold">常用命令详解</text>
<rect x="50" y="370" width="240" height="230" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="395" text-anchor="middle" font-size="11" font-weight="bold">基础操作</text>
<text x="60" y="420" font-size="10" font-family="monospace">SET key value</text>
<text x="60" y="440" font-size="10" font-family="monospace">GET key</text>
<text x="60" y="460" font-size="10" font-family="monospace">DEL key</text>
<text x="60" y="480" font-size="10" font-family="monospace">EXISTS key</text>
<text x="60" y="500" font-size="10" font-family="monospace">APPEND key value</text>
<text x="60" y="520" font-size="10" font-family="monospace">STRLEN key</text>
<text x="60" y="545" font-size="10" font-family="monospace">MSET k1 v1 k2 v2</text>
<text x="60" y="565" font-size="10" font-family="monospace">MGET k1 k2</text>
<rect x="305" y="370" width="240" height="230" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="395" text-anchor="middle" font-size="11" font-weight="bold">数值操作</text>
<text x="315" y="420" font-size="10" font-family="monospace">INCR key</text>
<text x="315" y="440" font-size="10" font-family="monospace">DECR key</text>
<text x="315" y="460" font-size="10" font-family="monospace">INCRBY key 10</text>
<text x="315" y="480" font-size="10" font-family="monospace">DECRBY key 10</text>
<text x="315" y="500" font-size="10" font-family="monospace">INCRBYFLOAT key 2.5</text>
<text x="315" y="530" font-size="9" fill="#388e3c">• 原子操作</text>
<text x="315" y="550" font-size="9" fill="#388e3c">• 自动转换数字</text>
<text x="315" y="570" font-size="9" fill="#388e3c">• 范围：-2^63 ~ 2^63-1</text>
<rect x="560" y="370" width="240" height="230" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="395" text-anchor="middle" font-size="11" font-weight="bold">高级操作</text>
<text x="570" y="420" font-size="10" font-family="monospace">SETEX key 60 value</text>
<text x="570" y="440" font-size="10" font-family="monospace">SETNX key value</text>
<text x="570" y="460" font-size="10" font-family="monospace">GETSET key newvalue</text>
<text x="570" y="480" font-size="10" font-family="monospace">SETRANGE key 0 abc</text>
<text x="570" y="500" font-size="10" font-family="monospace">GETRANGE key 0 10</text>
<text x="570" y="530" font-size="9" fill="#f57c00">• SETEX：设置+过期</text>
<text x="570" y="550" font-size="9" fill="#f57c00">• SETNX：不存在才设置</text>
<text x="570" y="570" font-size="9" fill="#f57c00">• GETSET：获取旧值并设置新值</text>
</svg>

**String 类型的特点**：

1. **最基础类型**：所有其他类型的基础
2. **二进制安全**：可以存储任意数据（图片、序列化对象等）
3. **最大大小**：512MB
4. **底层实现**：SDS（Simple Dynamic String）

**常用命令分类**：

**1. 基础操作**：
```bash
# 设置值
SET user:1001 "张三"
SET user:1001 "李四" EX 3600  # 设置并指定过期时间（秒）
SET user:1001 "王五" PX 3600000  # 过期时间（毫秒）
SETEX user:1001 3600 "赵六"  # 等价于 SET + EX

# 获取值
GET user:1001  # "赵六"

# 删除
DEL user:1001

# 检查存在
EXISTS user:1001  # 0（不存在）或 1（存在）

# 追加字符串
SET msg "Hello"
APPEND msg " World"  # "Hello World"

# 获取长度
STRLEN msg  # 11

# 批量操作
MSET k1 "v1" k2 "v2" k3 "v3"
MGET k1 k2 k3  # ["v1", "v2", "v3"]
```

**2. 数值操作**：
```bash
# 初始化计数器
SET article:1001:views 0

# 自增（+1）
INCR article:1001:views  # 1
INCR article:1001:views  # 2

# 自减（-1）
DECR article:1001:views  # 1

# 增加指定值
INCRBY article:1001:views 10  # 11

# 减少指定值
DECRBY article:1001:views 5  # 6

# 浮点数增加
SET price 10.5
INCRBYFLOAT price 2.3  # 12.8
```

**3. 分布式锁**：
```bash
# 加锁（SET key value NX EX seconds）
SET lock:order:1001 "uuid-12345" NX EX 10

# 释放锁（Lua 脚本保证原子性）
EVAL "if redis.call('get',KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end" 1 lock:order:1001 "uuid-12345"
```

**4. 限流**：
```bash
# 简单限流（1分钟内最多100次）
SET api:limit:user:1001 0 EX 60
INCR api:limit:user:1001
GET api:limit:user:1001  # 检查是否超过100

# 滑动窗口限流（使用 ZSet 更精确）
```

**5. 缓存**：
```bash
# 缓存对象（JSON）
SET user:1001 '{"name":"张三","age":25,"city":"北京"}' EX 3600

# 缓存页面
SET page:home "<html>...</html>" EX 300

# 缓存查询结果
SET cache:product:list:page1 "[{...},{...}]" EX 600
```

**6. 高级操作**：
```bash
# SETNX（不存在才设置）
SETNX lock:resource "locked"  # 1（成功）或 0（失败）

# GETSET（获取旧值并设置新值）
SET counter 100
GETSET counter 0  # 返回 100，counter 变为 0

# SETRANGE（替换部分字符串）
SET msg "Hello World"
SETRANGE msg 6 "Redis"  # "Hello Redis"

# GETRANGE（获取子串）
GETRANGE msg 0 4  # "Hello"
```

**String 类型的使用场景详解**：

| 场景 | 实现方式 | 优势 | 示例 |
|-----|---------|------|------|
| **缓存** | SET/GET + EXPIRE | 快速读写 | 用户信息、商品详情 |
| **计数器** | INCR/DECR | 原子性 | 阅读量、点赞数 |
| **分布式锁** | SET NX EX | 互斥性 | 防重复提交、秒杀 |
| **限流** | INCR + EXPIRE | 高性能 | API 限流 |
| **Session** | SET + EXPIRE | 支持过期 | 分布式 Session |
| **验证码** | SET + EXPIRE | 自动过期 | 短信验证码 |

**实际应用示例**：

**1. 缓存用户信息**：
```bash
# 设置缓存（1小时过期）
SET user:1001 '{"id":1001,"name":"张三","email":"zhangsan@example.com"}' EX 3600

# 读取缓存
GET user:1001

# 如果缓存不存在，从数据库加载并缓存
# 伪代码：
# if (redis.get(key) == null) {
#     data = db.query(...)
#     redis.set(key, data, 3600)
# }
```

**2. 文章阅读量统计**：
```bash
# 初始化
SET article:1001:views 0

# 每次阅读 +1
INCR article:1001:views

# 获取阅读量
GET article:1001:views  # 1523
```

**3. 分布式锁实现**：
```bash
# 加锁
SET lock:order:1001 "uuid-12345" NX EX 10

# 业务逻辑...

# 释放锁（使用 Lua 脚本保证原子性）
EVAL "if redis.call('get',KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end" 1 lock:order:1001 "uuid-12345"
```

**4. 接口限流**：
```bash
# 1分钟内最多100次
key="api:limit:user:1001"
count = INCR key
if count == 1 then
    EXPIRE key 60
end
if count > 100 then
    return "超过限流阈值"
end
```

**String 内部编码**：

| 编码类型 | 使用条件 | 特点 |
|---------|---------|------|
| **int** | 整数值且范围在 long 内 | 节省内存 |
| **embstr** | 字符串长度 ≤ 44 字节 | 一次分配，紧凑存储 |
| **raw** | 字符串长度 > 44 字节 | SDS 实现，可扩展 |

```bash
# 查看编码类型
OBJECT ENCODING key
```

**性能优化建议**：

1. **批量操作**：使用 MSET/MGET 减少网络往返
2. **合理设置过期**：避免内存浪费
3. **选择合适编码**：短字符串用 embstr
4. **避免大 value**：单个 value 不要超过 10KB
5. **使用 Pipeline**：批量命令一次发送

**关键要点**：
- ✓ **最基础类型**：Redis 最常用的数据类型
- ✓ **二进制安全**：可存储任意数据
- ✓ **原子操作**：INCR/DECR 线程安全
- ✓ **丰富命令**：基础、数值、高级操作
- ✓ **四大场景**：缓存、计数器、锁、限流
- ✓ **最大 512MB**：单个 value 限制
- ⚠ **避免大 value**：影响性能
- ⚠ **合理过期**：防止内存溢出

**记忆口诀**：String 基础最常用，缓存计数加分布式锁，INCR 原子保线程安全，SETEX 过期防内存溢出


### 7. List 类型的使用场景和常用命令有哪些？

**核心答案**：List 是有序的字符串列表，支持头尾操作，常用于消息队列、最新动态、栈和队列等场景。

**详细说明**：

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">List 类型全景图</text>
<rect x="30" y="60" width="790" height="240" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">List 的四大使用场景</text>
<rect x="50" y="110" width="180" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 消息队列</text>
<text x="60" y="160" font-size="10">• 生产者-消费者模式</text>
<text x="60" y="180" font-size="10">• 异步任务处理</text>
<text x="60" y="200" font-size="10">• 订单队列</text>
<text x="60" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="60" y="245" font-size="9" font-family="monospace">LPUSH/RPOP</text>
<text x="60" y="265" font-size="9" fill="#1976d2" font-weight="bold">✓ FIFO 先进先出</text>
<rect x="245" y="110" width="180" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 最新动态</text>
<text x="255" y="160" font-size="10">• 朋友圈/微博</text>
<text x="255" y="180" font-size="10">• 文章列表</text>
<text x="255" y="200" font-size="10">• 最新评论</text>
<text x="255" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="255" y="245" font-size="9" font-family="monospace">LPUSH/LRANGE</text>
<text x="255" y="265" font-size="9" fill="#388e3c" font-weight="bold">✓ 最新N条</text>
<rect x="440" y="110" width="180" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 栈/队列</text>
<text x="450" y="160" font-size="10">• 栈：LPUSH/LPOP</text>
<text x="450" y="180" font-size="10">• 队列：LPUSH/RPOP</text>
<text x="450" y="200" font-size="10">• 阻塞队列：BLPOP</text>
<text x="450" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="450" y="245" font-size="9" font-family="monospace">LPUSH/LPOP</text>
<text x="450" y="265" font-size="9" fill="#f57c00" font-weight="bold">✓ 数据结构</text>
<rect x="635" y="110" width="170" height="170" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 排行榜</text>
<text x="645" y="160" font-size="10">• 评论列表</text>
<text x="645" y="180" font-size="10">• 按时间排序</text>
<text x="645" y="200" font-size="10">• 分页显示</text>
<text x="645" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="645" y="245" font-size="9" font-family="monospace">LRANGE</text>
<text x="645" y="265" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 有序列表</text>
<rect x="30" y="320" width="790" height="300" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="350" text-anchor="middle" font-size="14" font-weight="bold">常用命令详解</text>
<rect x="50" y="370" width="240" height="230" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="395" text-anchor="middle" font-size="11" font-weight="bold">头尾操作</text>
<text x="60" y="420" font-size="10" font-family="monospace">LPUSH key value</text>
<text x="60" y="440" font-size="10" font-family="monospace">RPUSH key value</text>
<text x="60" y="460" font-size="10" font-family="monospace">LPOP key</text>
<text x="60" y="480" font-size="10" font-family="monospace">RPOP key</text>
<text x="60" y="500" font-size="10" font-family="monospace">BLPOP key timeout</text>
<text x="60" y="520" font-size="10" font-family="monospace">BRPOP key timeout</text>
<text x="60" y="545" font-size="10" font-family="monospace">LLEN key</text>
<text x="60" y="565" font-size="10" font-family="monospace">LTRIM key start stop</text>
<rect x="305" y="370" width="240" height="230" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="395" text-anchor="middle" font-size="11" font-weight="bold">查询操作</text>
<text x="315" y="420" font-size="10" font-family="monospace">LRANGE key 0 -1</text>
<text x="315" y="440" font-size="10" font-family="monospace">LINDEX key index</text>
<text x="315" y="460" font-size="10" font-family="monospace">LSET key index value</text>
<text x="315" y="490" font-size="9" fill="#388e3c">• LRANGE：获取范围元素</text>
<text x="315" y="510" font-size="9" fill="#388e3c">• LINDEX：获取指定位置</text>
<text x="315" y="530" font-size="9" fill="#388e3c">• 0是第一个，-1是最后</text>
<text x="315" y="560" font-size="9" fill="#388e3c">• 时间复杂度：O(N)</text>
<rect x="560" y="370" width="240" height="230" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="395" text-anchor="middle" font-size="11" font-weight="bold">修改操作</text>
<text x="570" y="420" font-size="10" font-family="monospace">LINSERT key BEFORE</text>
<text x="570" y="440" font-size="10" font-family="monospace">LREM key count value</text>
<text x="570" y="460" font-size="10" font-family="monospace">RPOPLPUSH src dest</text>
<text x="570" y="490" font-size="9" fill="#f57c00">• LINSERT：插入元素</text>
<text x="570" y="510" font-size="9" fill="#f57c00">• LREM：删除元素</text>
<text x="570" y="530" font-size="9" fill="#f57c00">• RPOPLPUSH：原子转移</text>
<text x="570" y="560" font-size="9" fill="#f57c00">• 支持原子操作</text>
</svg>

**List 类型的特点**：

1. **有序性**：元素按插入顺序排列
2. **可重复**：允许重复元素
3. **双端操作**：支持左右两端插入删除
4. **底层实现**：
   - 元素少：ziplist（压缩列表）
   - 元素多：quicklist（快速列表）

**常用命令分类**：

**1. 头尾操作（Push/Pop）**：
```bash
# 左侧插入（头部）
LPUSH mylist "first"
LPUSH mylist "second"  # ["second", "first"]

# 右侧插入（尾部）
RPUSH mylist "third"   # ["second", "first", "third"]

# 左侧弹出
LPOP mylist  # "second"

# 右侧弹出
RPOP mylist  # "third"

# 阻塞式弹出（超时时间单位：秒）
BLPOP mylist 10  # 等待10秒，如果为空则阻塞
BRPOP mylist 10

# 获取列表长度
LLEN mylist  # 1
```

**2. 范围查询**：
```bash
# 创建列表
RPUSH articles "article1" "article2" "article3" "article4" "article5"

# 获取所有元素
LRANGE articles 0 -1  # ["article1", "article2", ..., "article5"]

# 获取前3个
LRANGE articles 0 2   # ["article1", "article2", "article3"]

# 获取最后2个
LRANGE articles -2 -1 # ["article4", "article5"]

# 获取指定位置元素
LINDEX articles 0     # "article1"
LINDEX articles -1    # "article5"

# 修改指定位置元素
LSET articles 0 "new_article1"
```

**3. 修改操作**：
```bash
# 插入元素（在指定元素前/后）
LINSERT mylist BEFORE "article2" "new_article"
LINSERT mylist AFTER "article2" "another_article"

# 删除元素
# count > 0：从头到尾删除count个value
# count < 0：从尾到头删除count个value
# count = 0：删除所有value
LREM mylist 1 "article1"  # 删除1个article1
LREM mylist -2 "article2" # 从尾部删除2个article2
LREM mylist 0 "article3"  # 删除所有article3

# 保留范围内元素，删除其他
LTRIM mylist 0 99  # 只保留前100个元素

# 原子转移（从source右侧弹出，插入destination左侧）
RPOPLPUSH source destination
```

**4. 阻塞操作**：
```bash
# 阻塞式左侧弹出
BLPOP queue1 queue2 10
# 同时监听多个队列，哪个先有数据就从哪个弹出
# 10秒超时

# 阻塞式右侧弹出
BRPOP queue1 queue2 10

# 阻塞式转移
BRPOPLPUSH source destination 10
```

**实际应用场景**：

**1. 消息队列（生产者-消费者）**：
```bash
# 生产者：添加任务到队列
LPUSH task:queue "process_order:1001"
LPUSH task:queue "send_email:user@example.com"
LPUSH task:queue "generate_report:2023-12"

# 消费者：阻塞式获取任务
BRPOP task:queue 0  # 0表示无限等待
# 返回：["task:queue", "process_order:1001"]

# 处理任务...

# 继续获取下一个任务
BRPOP task:queue 0
```

**2. 最新动态（朋友圈/微博）**：
```bash
# 发布动态（始终插入头部）
LPUSH user:1001:posts "今天天气不错"
LPUSH user:1001:posts "刚吃了一顿大餐"
LPUSH user:1001:posts "分享一篇文章"

# 获取最新10条动态
LRANGE user:1001:posts 0 9

# 限制列表长度（只保留最新100条）
LTRIM user:1001:posts 0 99
```

**3. 评论列表**：
```bash
# 添加评论
RPUSH article:1001:comments "很棒的文章！"
RPUSH article:1001:comments "学到了很多"

# 获取所有评论
LRANGE article:1001:comments 0 -1

# 分页获取评论（每页10条）
# 第1页：0-9
LRANGE article:1001:comments 0 9
# 第2页：10-19
LRANGE article:1001:comments 10 19

# 获取评论总数
LLEN article:1001:comments
```

**4. 栈和队列**：
```bash
# 栈（LIFO：后进先出）
LPUSH stack "item1"
LPUSH stack "item2"
LPUSH stack "item3"
LPOP stack  # "item3"（最后进去的先出来）

# 队列（FIFO：先进先出）
LPUSH queue "task1"
LPUSH queue "task2"
LPUSH queue "task3"
RPOP queue  # "task1"（最先进去的先出来）
```

**5. 限流（滑动窗口）**：
```bash
# 记录用户请求时间戳
LPUSH user:1001:requests "1638000000"
LPUSH user:1001:requests "1638000001"
LPUSH user:1001:requests "1638000002"

# 保留最近60秒的请求
LTRIM user:1001:requests 0 99

# 获取请求数量
LLEN user:1001:requests

# 判断是否超过限流阈值（如100次/分钟）
```

**List 的底层实现**：

| 编码类型 | 使用条件 | 特点 |
|---------|---------|------|
| **ziplist** | 元素数量 < 512 且所有字符串长度 < 64字节 | 内存紧凑，连续存储 |
| **quicklist** | 不满足ziplist条件 | 双向链表 + ziplist，平衡性能和内存 |

```bash
# 查看编码类型
OBJECT ENCODING mylist
```

**性能特点**：

| 操作 | 时间复杂度 | 说明 |
|-----|-----------|------|
| **LPUSH/RPUSH** | O(1) | 头尾插入很快 |
| **LPOP/RPOP** | O(1) | 头尾删除很快 |
| **LINDEX** | O(N) | 访问中间元素较慢 |
| **LINSERT** | O(N) | 需要遍历查找 |
| **LREM** | O(N) | 需要遍历删除 |
| **LRANGE** | O(S+N) | S是偏移量，N是范围长度 |

**性能优化建议**：

1. **避免大列表**：单个列表不要超过10000个元素
2. **使用LTRIM**：定期清理旧数据，保持列表大小
3. **避免LINDEX**：尽量使用LRANGE批量获取
4. **分页合理**：每页不要超过100条
5. **考虑Stream**：复杂消息队列建议使用Redis Stream（5.0+）

**List vs 其他数据类型**：

| 特性 | List | Set | ZSet |
|-----|------|-----|------|
| **有序性** | ✓ | ✗ | ✓（按分数） |
| **可重复** | ✓ | ✗ | ✗ |
| **头尾操作** | ✓ | ✗ | ✗ |
| **范围查询** | ✓ | ✗ | ✓ |
| **典型场景** | 消息队列、最新动态 | 标签、去重 | 排行榜 |

**关键要点**：
- ✓ **有序列表**：按插入顺序排列
- ✓ **双端操作**：支持左右两端操作
- ✓ **消息队列**：LPUSH + BRPOP实现
- ✓ **最新动态**：LPUSH + LRANGE + LTRIM
- ✓ **栈和队列**：灵活实现LIFO和FIFO
- ⚠ **避免大列表**：影响性能
- ⚠ **中间操作慢**：LINDEX、LINSERT是O(N)
- ⚠ **考虑Stream**：复杂场景用Stream更好

**记忆口诀**：List 有序可重复，双端操作最灵活，LPUSH RPOP 做队列，LPUSH LPOP 做栈，消息队列最常用，LTRIM 控制列表长度


### 8. Hash 类型的使用场景和常用命令有哪些？

**核心答案**：Hash 是键值对集合，类似 Java 的 HashMap，常用于存储对象、用户信息、配置参数、购物车等场景。

**详细说明**：

<svg viewBox="0 0 850 650" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Hash 类型全景图</text>
<rect x="30" y="60" width="790" height="240" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">Hash 的四大使用场景</text>
<rect x="50" y="110" width="180" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 对象存储</text>
<text x="60" y="160" font-size="10">• 用户信息</text>
<text x="60" y="180" font-size="10">• 商品详情</text>
<text x="60" y="200" font-size="10">• 配置参数</text>
<text x="60" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="60" y="245" font-size="9" font-family="monospace">HSET/HGET/HGETALL</text>
<text x="60" y="265" font-size="9" fill="#1976d2" font-weight="bold">✓ 结构化存储</text>
<rect x="245" y="110" width="180" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 购物车</text>
<text x="255" y="160" font-size="10">• 商品ID为field</text>
<text x="255" y="180" font-size="10">• 数量为value</text>
<text x="255" y="200" font-size="10">• 增删改查方便</text>
<text x="255" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="255" y="245" font-size="9" font-family="monospace">HINCRBY/HDEL</text>
<text x="255" y="265" font-size="9" fill="#388e3c" font-weight="bold">✓ 高效操作</text>
<rect x="440" y="110" width="180" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 缓存对象</text>
<text x="450" y="160" font-size="10">• 减少序列化</text>
<text x="450" y="180" font-size="10">• 部分更新</text>
<text x="450" y="200" font-size="10">• 节省内存</text>
<text x="450" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="450" y="245" font-size="9" font-family="monospace">HMSET/HMGET</text>
<text x="450" y="265" font-size="9" fill="#f57c00" font-weight="bold">✓ 灵活缓存</text>
<rect x="635" y="110" width="170" height="170" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 计数统计</text>
<text x="645" y="160" font-size="10">• 文章统计</text>
<text x="645" y="180" font-size="10">• 访问计数</text>
<text x="645" y="200" font-size="10">• 多维度统计</text>
<text x="645" y="225" font-size="10" font-weight="bold">命令：</text>
<text x="645" y="245" font-size="9" font-family="monospace">HINCRBY</text>
<text x="645" y="265" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 原子增减</text>
<rect x="30" y="320" width="790" height="300" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="350" text-anchor="middle" font-size="14" font-weight="bold">常用命令详解</text>
<rect x="50" y="370" width="240" height="230" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="395" text-anchor="middle" font-size="11" font-weight="bold">基础操作</text>
<text x="60" y="420" font-size="10" font-family="monospace">HSET key field value</text>
<text x="60" y="440" font-size="10" font-family="monospace">HGET key field</text>
<text x="60" y="460" font-size="10" font-family="monospace">HDEL key field</text>
<text x="60" y="480" font-size="10" font-family="monospace">HEXISTS key field</text>
<text x="60" y="500" font-size="10" font-family="monospace">HLEN key</text>
<text x="60" y="520" font-size="10" font-family="monospace">HKEYS key</text>
<text x="60" y="540" font-size="10" font-family="monospace">HVALS key</text>
<text x="60" y="560" font-size="10" font-family="monospace">HGETALL key</text>
<rect x="305" y="370" width="240" height="230" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="395" text-anchor="middle" font-size="11" font-weight="bold">批量操作</text>
<text x="315" y="420" font-size="10" font-family="monospace">HMSET key f1 v1 f2 v2</text>
<text x="315" y="440" font-size="10" font-family="monospace">HMGET key f1 f2</text>
<text x="315" y="470" font-size="9" fill="#388e3c">• 减少网络往返</text>
<text x="315" y="490" font-size="9" fill="#388e3c">• 提高性能</text>
<text x="315" y="510" font-size="9" fill="#388e3c">• 原子操作</text>
<text x="315" y="540" font-size="9" fill="#388e3c">• 批量设置多个字段</text>
<text x="315" y="560" font-size="9" fill="#388e3c">• 批量获取多个字段</text>
<rect x="560" y="370" width="240" height="230" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="395" text-anchor="middle" font-size="11" font-weight="bold">数值操作</text>
<text x="570" y="420" font-size="10" font-family="monospace">HINCRBY key field inc</text>
<text x="570" y="440" font-size="10" font-family="monospace">HINCRBYFLOAT key field</text>
<text x="570" y="470" font-size="9" fill="#f57c00">• 原子自增</text>
<text x="570" y="490" font-size="9" fill="#f57c00">• 支持负数（减）</text>
<text x="570" y="510" font-size="9" fill="#f57c00">• 浮点数增减</text>
<text x="570" y="540" font-size="9" fill="#f57c00">• 不存在则创建</text>
<text x="570" y="560" font-size="9" fill="#f57c00">• 线程安全</text>
</svg>

**Hash 类型的特点**：

1. **键值对集合**：一个 Hash 中可以存储多个 field-value 对
2. **类似 Java HashMap**：结构相同，操作类似
3. **适合对象存储**：可以将对象的各个属性作为 field 存储
4. **节省内存**：比多个 String key 更节省内存

**常用命令分类**：

**1. 基础操作（单字段）**：
```bash
# 设置单个字段
HSET user:1001 name "张三"
HSET user:1001 age 25
HSET user:1001 city "北京"

# 获取单个字段
HGET user:1001 name  # "张三"

# 删除字段
HDEL user:1001 age

# 检查字段是否存在
HEXISTS user:1001 name  # 1（存在）

# 获取字段数量
HLEN user:1001  # 2

# 获取所有字段名
HKEYS user:1001  # ["name", "city"]

# 获取所有字段值
HVALS user:1001  # ["张三", "北京"]

# 获取所有字段和值
HGETALL user:1001  # {"name": "张三", "city": "北京"}
```

**2. 批量操作**：
```bash
# 批量设置多个字段（推荐）
HMSET user:1002 name "李四" age 30 city "上海"

# 批量获取多个字段
HMGET user:1002 name age  # ["李四", "30"]

# 只在字段不存在时设置
HSETNX user:1002 email "lisi@example.com"
```

**3. 数值操作**：
```bash
# 字段值自增
HINCRBY user:1001 age 1  # 26

# 字段值减少（使用负数）
HINCRBY user:1001 age -1  # 25

# 浮点数增加
HINCRBYFLOAT user:1001 balance 10.5
```

**4. 扫描操作**：
```bash
# 扫描 Hash 中的字段（避免 HGETALL 阻塞）
HSCAN user:1001 0 COUNT 10
```

**实际应用场景**：

**1. 用户信息存储**：
```bash
# 存储用户信息
HMSET user:1001 \
    name "张三" \
    age 25 \
    email "zhangsan@example.com" \
    city "北京" \
    phone "13800138000"

# 获取用户信息
HGETALL user:1001

# 更新部分信息
HSET user:1001 city "上海"

# 获取特定字段
HMGET user:1001 name email
```

**2. 购物车实现**：
```bash
# 添加商品到购物车（商品ID:数量）
HSET cart:user1001 product:1 2    # 商品1，数量2
HSET cart:user1001 product:2 1    # 商品2，数量1

# 增加商品数量
HINCRBY cart:user1001 product:1 1  # 数量+1，变为3

# 减少商品数量
HINCRBY cart:user1001 product:1 -1  # 数量-1，变为2

# 删除商品
HDEL cart:user1001 product:2

# 获取购物车所有商品
HGETALL cart:user1001

# 获取购物车商品数量
HLEN cart:user1001
```

**3. 对象缓存**：
```bash
# 缓存商品信息
HMSET product:1001 \
    name "iPhone 15" \
    price 5999 \
    stock 100 \
    category "手机"

# 获取商品信息
HGETALL product:1001

# 更新库存（原子操作）
HINCRBY product:1001 stock -1  # 库存-1

# 只获取需要的字段
HMGET product:1001 name price
```

**4. 文章统计**：
```bash
# 文章多维度统计
HMSET article:1001:stats \
    views 1000 \
    likes 50 \
    comments 10 \
    shares 5

# 阅读量+1
HINCRBY article:1001:stats views 1

# 点赞+1
HINCRBY article:1001:stats likes 1

# 获取所有统计
HGETALL article:1001:stats
```

**5. 配置管理**：
```bash
# 应用配置
HMSET config:app \
    max_connections 1000 \
    timeout 30 \
    retry 3 \
    debug true

# 获取所有配置
HGETALL config:app

# 更新单个配置
HSET config:app timeout 60
```

**Hash 的底层实现**：

| 编码类型 | 使用条件 | 特点 |
|---------|---------|------|
| **ziplist** | 字段数 < 512 且所有值 < 64字节 | 内存紧凑，连续存储 |
| **hashtable** | 不满足ziplist条件 | 哈希表，O(1)查询 |

```bash
# 查看编码类型
OBJECT ENCODING user:1001
```

**性能特点**：

| 操作 | 时间复杂度 | 说明 |
|-----|-----------|------|
| **HSET/HGET** | O(1) | 单字段操作很快 |
| **HDEL** | O(N) | N是要删除的字段数 |
| **HGETALL** | O(N) | N是字段总数 |
| **HMSET/HMGET** | O(N) | N是操作的字段数 |
| **HINCRBY** | O(1) | 原子操作 |
| **HLEN** | O(1) | 获取字段数量 |

**Hash vs String 对比**：

**使用 String 存储对象**：
```bash
# 方式1：序列化整个对象
SET user:1001 '{"name":"张三","age":25,"city":"北京"}'

# 缺点：
# - 修改任意字段需要反序列化整个对象
# - 浪费带宽和CPU
# - 无法直接操作单个字段

# 方式2：每个字段一个key
SET user:1001:name "张三"
SET user:1001:age 25
SET user:1001:city "北京"

# 缺点：
# - 占用更多内存（key的元数据开销）
# - 无法原子操作多个字段
# - 管理复杂
```

**使用 Hash 存储对象**：
```bash
HMSET user:1001 name "张三" age 25 city "北京"

# 优点：
# ✓ 结构清晰
# ✓ 节省内存
# ✓ 部分更新方便
# ✓ 支持批量操作
# ✓ 原子性好
```

**性能优化建议**：

1. **避免大Hash**：单个Hash不要超过5000个字段
2. **合理使用批量操作**：用HMSET/HMGET减少网络往返
3. **避免HGETALL**：字段多时用HSCAN代替
4. **控制value大小**：单个value不要太大（建议< 1KB）
5. **利用ziplist**：保持字段数和值大小在阈值内

**Hash vs 其他类型**：

| 特性 | Hash | String | List |
|-----|------|--------|------|
| **结构** | 键值对集合 | 单个值 | 有序列表 |
| **适用** | 对象存储 | 简单值、序列化对象 | 队列、列表 |
| **内存** | 节省（相对多个String） | 单个占用少 | 中等 |
| **操作** | 字段级操作 | 整体操作 | 索引操作 |
| **典型场景** | 用户信息、购物车 | 缓存、计数 | 消息队列 |

**关键要点**：
- ✓ **键值对集合**：一个Hash存储多个field-value对
- ✓ **对象存储**：最适合存储对象信息
- ✓ **购物车神器**：field存商品ID，value存数量
- ✓ **部分更新**：无需反序列化整个对象
- ✓ **批量操作**：HMSET/HMGET提高性能
- ⚠ **避免大Hash**：字段数控制在5000以内
- ⚠ **HGETALL慎用**：字段多时用HSCAN

**记忆口诀**：Hash 键值对集合，对象存储最合适，购物车统计配置管理，HMSET批量更高效，字段级操作部分更新，避免大Hash防阻塞


### 9. Redis Set 数据类型的特点和使用场景是什么?

**核心答案**:Set 是无序、不重复的字符串集合,支持集合运算(交集、并集、差集),常用于标签系统、共同好友、去重、抽奖等场景。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Set 类型全景图</text>
<rect x="30" y="60" width="790" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">Set 的四大使用场景</text>
<rect x="50" y="110" width="180" height="150" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 标签系统</text>
<text x="60" y="160" font-size="10">• 文章标签</text>
<text x="60" y="178" font-size="10">• 用户兴趣</text>
<text x="60" y="196" font-size="10">• 商品分类</text>
<text x="60" y="220" font-size="9" font-family="monospace">SADD/SMEMBERS</text>
<text x="60" y="245" font-size="9" fill="#1976d2" font-weight="bold">✓ 自动去重</text>
<rect x="245" y="110" width="180" height="150" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 社交功能</text>
<text x="255" y="160" font-size="10">• 共同好友</text>
<text x="255" y="178" font-size="10">• 关注/粉丝</text>
<text x="255" y="196" font-size="10">• 可能认识</text>
<text x="255" y="220" font-size="9" font-family="monospace">SINTER/SUNION</text>
<text x="255" y="245" font-size="9" fill="#388e3c" font-weight="bold">✓ 集合运算</text>
<rect x="440" y="110" width="180" height="150" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 去重统计</text>
<text x="450" y="160" font-size="10">• 访客去重</text>
<text x="450" y="178" font-size="10">• IP去重</text>
<text x="450" y="196" font-size="10">• 数据去重</text>
<text x="450" y="220" font-size="9" font-family="monospace">SADD/SCARD</text>
<text x="450" y="245" font-size="9" fill="#f57c00" font-weight="bold">✓ 唯一性</text>
<rect x="635" y="110" width="170" height="150" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 抽奖活动</text>
<text x="645" y="160" font-size="10">• 随机抽取</text>
<text x="645" y="178" font-size="10">• 不重复</text>
<text x="645" y="196" font-size="10">• 参与管理</text>
<text x="645" y="220" font-size="9" font-family="monospace">SPOP</text>
<text x="645" y="245" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 随机获取</text>
<rect x="30" y="300" width="790" height="270" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="330" text-anchor="middle" font-size="14" font-weight="bold">常用命令详解</text>
<rect x="50" y="350" width="240" height="200" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="375" text-anchor="middle" font-size="11" font-weight="bold">基础操作</text>
<text x="60" y="400" font-size="10" font-family="monospace">SADD key member</text>
<text x="60" y="418" font-size="10" font-family="monospace">SREM key member</text>
<text x="60" y="436" font-size="10" font-family="monospace">SISMEMBER key member</text>
<text x="60" y="454" font-size="10" font-family="monospace">SMEMBERS key</text>
<text x="60" y="472" font-size="10" font-family="monospace">SCARD key</text>
<text x="60" y="500" font-size="9" fill="#1976d2">• 添加/删除元素</text>
<text x="60" y="520" font-size="9" fill="#1976d2">• 判断/获取/统计</text>
<rect x="305" y="350" width="240" height="200" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="375" text-anchor="middle" font-size="11" font-weight="bold">集合运算</text>
<text x="315" y="400" font-size="10" font-family="monospace">SINTER key1 key2</text>
<text x="315" y="418" font-size="10" font-family="monospace">SUNION key1 key2</text>
<text x="315" y="436" font-size="10" font-family="monospace">SDIFF key1 key2</text>
<text x="315" y="454" font-size="10" font-family="monospace">SINTERSTORE dest k1</text>
<text x="315" y="480" font-size="9" fill="#388e3c">• SINTER: 交集</text>
<text x="315" y="498" font-size="9" fill="#388e3c">• SUNION: 并集</text>
<text x="315" y="516" font-size="9" fill="#388e3c">• SDIFF: 差集</text>
<rect x="560" y="350" width="240" height="200" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="375" text-anchor="middle" font-size="11" font-weight="bold">随机操作</text>
<text x="570" y="400" font-size="10" font-family="monospace">SRANDMEMBER key count</text>
<text x="570" y="418" font-size="10" font-family="monospace">SPOP key count</text>
<text x="570" y="445" font-size="9" fill="#f57c00">• SRANDMEMBER: 随机</text>
<text x="570" y="463" font-size="9" fill="#f57c00">  返回(不删除)</text>
<text x="570" y="481" font-size="9" fill="#f57c00">• SPOP: 随机弹出</text>
<text x="570" y="499" font-size="9" fill="#f57c00">  (删除)</text>
</svg>

**Set 类型的特点**:

1. **无序性**：元素没有顺序
2. **唯一性**：自动去重,不允许重复
3. **集合运算**：支持交、并、差集
4. **底层实现**：整数集合(intset)或哈希表(hashtable)

**常用命令**:

```bash
# 基础操作
SADD tags "Redis" "NoSQL"      # 添加元素
SREM tags "Redis"               # 删除元素
SISMEMBER tags "NoSQL"          # 判断存在(1=存在)
SMEMBERS tags                   # 获取所有元素
SCARD tags                      # 获取元素数量

# 集合运算
SINTER set1 set2                # 交集
SUNION set1 set2                # 并集
SDIFF set1 set2                 # 差集

# 随机操作
SRANDMEMBER lottery 3           # 随机返回3个(不删除)
SPOP lottery 2                  # 随机弹出2个(删除)
```

**使用场景**:

| 场景 | 实现 | 示例 |
|-----|------|------|
| **标签系统** | SADD存储标签 | 文章标签、商品分类 |
| **共同好友** | SINTER求交集 | A和B的共同好友 |
| **点赞功能** | SADD/SREM | 点赞/取消点赞 |
| **抽奖活动** | SPOP随机弹出 | 不重复中奖 |

**关键要点**:
- ✓ **无序不重复**：自动去重
- ✓ **集合运算**：交并差集
- ✓ **随机抽取**:SPOP/SRANDMEMBER
- ⚠ **SMEMBERS慎用**：元素多时用SSCAN

**记忆口诀**:Set无序不重复,集合运算是特色,标签去重和抽奖


### 10. Redis ZSet（有序集合）的特点和使用场景是什么?

**核心答案**:ZSet是有序、不重复的集合,每个元素关联一个分数(score)用于排序,常用于排行榜、延迟队列、优先级队列等场景。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">ZSet 类型全景图</text>
<rect x="30" y="60" width="790" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">ZSet 的四大使用场景</text>
<rect x="50" y="110" width="180" height="150" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 排行榜</text>
<text x="60" y="160" font-size="10">• 游戏排行</text>
<text x="60" y="178" font-size="10">• 销量榜</text>
<text x="60" y="196" font-size="10">• 热搜榜</text>
<text x="60" y="220" font-size="9" font-family="monospace">ZADD/ZREVRANGE</text>
<text x="60" y="245" font-size="9" fill="#1976d2" font-weight="bold">✓ 自动排序</text>
<rect x="245" y="110" width="180" height="150" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 延迟队列</text>
<text x="255" y="160" font-size="10">• 定时任务</text>
<text x="255" y="178" font-size="10">• 订单超时</text>
<text x="255" y="196" font-size="10">• 消息延迟</text>
<text x="255" y="220" font-size="9" font-family="monospace">ZADD+ZRANGEBYSCORE</text>
<text x="255" y="245" font-size="9" fill="#388e3c" font-weight="bold">✓ 按时间排序</text>
<rect x="440" y="110" width="180" height="150" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 优先级队列</text>
<text x="450" y="160" font-size="10">• 任务优先级</text>
<text x="450" y="178" font-size="10">• VIP优先</text>
<text x="450" y="196" font-size="10">• 消息优先级</text>
<text x="450" y="220" font-size="9" font-family="monospace">ZADD+ZPOPMAX</text>
<text x="450" y="245" font-size="9" fill="#f57c00" font-weight="bold">✓ 按优先级</text>
<rect x="635" y="110" width="170" height="150" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 范围查询</text>
<text x="645" y="160" font-size="10">• 成绩排名</text>
<text x="645" y="178" font-size="10">• 价格区间</text>
<text x="645" y="196" font-size="10">• 时间范围</text>
<text x="645" y="220" font-size="9" font-family="monospace">ZRANGEBYSCORE</text>
<text x="645" y="245" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 分数区间</text>
<rect x="30" y="300" width="790" height="270" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="330" text-anchor="middle" font-size="14" font-weight="bold">常用命令详解</text>
<rect x="50" y="350" width="240" height="200" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="375" text-anchor="middle" font-size="11" font-weight="bold">基础操作</text>
<text x="60" y="400" font-size="10" font-family="monospace">ZADD key score member</text>
<text x="60" y="418" font-size="10" font-family="monospace">ZREM key member</text>
<text x="60" y="436" font-size="10" font-family="monospace">ZSCORE key member</text>
<text x="60" y="454" font-size="10" font-family="monospace">ZINCRBY key inc member</text>
<text x="60" y="472" font-size="10" font-family="monospace">ZCARD key</text>
<text x="60" y="500" font-size="9" fill="#1976d2">• 添加/删除/获取</text>
<text x="60" y="520" font-size="9" fill="#1976d2">• 分数增减/统计</text>
<rect x="305" y="350" width="240" height="200" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="375" text-anchor="middle" font-size="11" font-weight="bold">排名查询</text>
<text x="315" y="400" font-size="10" font-family="monospace">ZRANGE key 0 -1</text>
<text x="315" y="418" font-size="10" font-family="monospace">ZREVRANGE key 0 9</text>
<text x="315" y="436" font-size="10" font-family="monospace">ZRANK key member</text>
<text x="315" y="454" font-size="10" font-family="monospace">ZREVRANK key member</text>
<text x="315" y="480" font-size="9" fill="#388e3c">• ZRANGE: 升序</text>
<text x="315" y="498" font-size="9" fill="#388e3c">• ZREVRANGE: 降序</text>
<text x="315" y="516" font-size="9" fill="#388e3c">• RANK: 获取排名</text>
<rect x="560" y="350" width="240" height="200" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="375" text-anchor="middle" font-size="11" font-weight="bold">范围查询</text>
<text x="570" y="400" font-size="10" font-family="monospace">ZRANGEBYSCORE key min</text>
<text x="570" y="418" font-size="10" font-family="monospace">ZPOPMAX key count</text>
<text x="570" y="436" font-size="10" font-family="monospace">ZPOPMIN key count</text>
<text x="570" y="463" font-size="9" fill="#f57c00">• 按分数范围查询</text>
<text x="570" y="481" font-size="9" fill="#f57c00">• 弹出最高/最低分</text>
<text x="570" y="499" font-size="9" fill="#f57c00">• 支持LIMIT分页</text>
</svg>

**ZSet 类型的特点**:

1. **有序性**：按分数(score)自动排序
2. **唯一性**：成员不重复,分数可相同
3. **双索引**：可按分数或成员查询
4. **底层实现**:ziplist或skiplist+hashtable

**常用命令**:

```bash
# 基础操作
ZADD rank 100 "p1" 200 "p2"    # 添加(分数 成员)
ZSCORE rank "p1"                # 获取分数
ZINCRBY rank 50 "p1"            # 分数+50
ZCARD rank                      # 获取数量

# 排名查询
ZREVRANGE rank 0 9 WITHSCORES  # 降序前10名(带分数)
ZREVRANK rank "p1"              # 降序排名(0=第1名)

# 范围查询
ZRANGEBYSCORE rank 100 200     # 分数在[100,200]
ZPOPMAX rank 3                  # 弹出最高的3个(5.0+)
```

**使用场景**:

| 场景 | 实现 | 示例 |
|-----|------|------|
| **排行榜** | 分数=得分 | 游戏排行、销量榜 |
| **延迟队列** | 分数=时间戳 | 定时任务、订单超时 |
| **优先级队列** | 分数=优先级 | 任务优先级 |
| **热搜榜** | 分数=搜索次数 | 热门话题 |

**性能特点**:

| 操作 | 时间复杂度 |
|-----|-----------|
| ZADD/ZREM | O(log N) |
| ZSCORE | O(1) |
| ZRANGE | O(log N + M) |
| ZRANK | O(log N) |

**关键要点**:
- ✓ **有序不重复**：按分数排序
- ✓ **排行榜神器**：自动排序
- ✓ **延迟队列**：时间戳作分数
- ✓ **范围查询**：按分数区间
- ⚠ **操作O(log N)**：比Set慢

**记忆口诀**:ZSet有序不重复,分数排序是核心,排行榜是最佳场景,延迟队列优先级


### 11. Redis 5.0 新增了哪些数据类型?

**核心答案**:Redis 5.0 主要新增了 Stream 数据类型,这是一个专业的消息队列数据结构,支持消费者组、消息持久化、ACK确认等特性。

**详细说明**:

<svg viewBox="0 0 850 550" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Redis 5.0 Stream 核心特性</text>
<rect x="30" y="60" width="790" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">Stream 的四大核心能力</text>
<rect x="50" y="110" width="180" height="130" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 消费者组</text>
<text x="60" y="160" font-size="10">• 多消费者协作</text>
<text x="60" y="178" font-size="10">• 消息分发</text>
<text x="60" y="196" font-size="10">• 负载均衡</text>
<text x="60" y="220" font-size="9" fill="#1976d2" font-weight="bold">✓ 类似Kafka</text>
<rect x="245" y="110" width="180" height="130" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 消息持久化</text>
<text x="255" y="160" font-size="10">• 自动持久化</text>
<text x="255" y="178" font-size="10">• 可靠性高</text>
<text x="255" y="196" font-size="10">• 支持重复消费</text>
<text x="255" y="220" font-size="9" fill="#388e3c" font-weight="bold">✓ 不丢消息</text>
<rect x="440" y="110" width="180" height="130" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ ACK机制</text>
<text x="450" y="160" font-size="10">• 消息确认</text>
<text x="450" y="178" font-size="10">• 重试机制</text>
<text x="450" y="196" font-size="10">• 防止丢失</text>
<text x="450" y="220" font-size="9" fill="#f57c00" font-weight="bold">✓ 可靠消费</text>
<rect x="635" y="110" width="170" height="130" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 消息ID</text>
<text x="645" y="160" font-size="10">• 唯一标识</text>
<text x="645" y="178" font-size="10">• 时间戳</text>
<text x="645" y="196" font-size="10">• 自动生成</text>
<text x="645" y="220" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 有序消息</text>
<rect x="30" y="280" width="790" height="240" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="310" text-anchor="middle" font-size="14" font-weight="bold">Stream 常用命令</text>
<rect x="50" y="330" width="240" height="170" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="355" text-anchor="middle" font-size="11" font-weight="bold">生产消费</text>
<text x="60" y="380" font-size="10" font-family="monospace">XADD stream * k v</text>
<text x="60" y="398" font-size="10" font-family="monospace">XREAD COUNT 10</text>
<text x="60" y="416" font-size="10" font-family="monospace">XRANGE stream - +</text>
<text x="60" y="434" font-size="10" font-family="monospace">XLEN stream</text>
<text x="60" y="460" font-size="9" fill="#1976d2">• XADD: 添加消息</text>
<text x="60" y="478" font-size="9" fill="#1976d2">• XREAD: 读取消息</text>
<rect x="305" y="330" width="240" height="170" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="355" text-anchor="middle" font-size="11" font-weight="bold">消费者组</text>
<text x="315" y="380" font-size="10" font-family="monospace">XGROUP CREATE</text>
<text x="315" y="398" font-size="10" font-family="monospace">XREADGROUP GROUP</text>
<text x="315" y="416" font-size="10" font-family="monospace">XACK stream group id</text>
<text x="315" y="434" font-size="10" font-family="monospace">XPENDING stream group</text>
<text x="315" y="460" font-size="9" fill="#388e3c">• 创建消费者组</text>
<text x="315" y="478" font-size="9" fill="#388e3c">• 组内读取和确认</text>
<rect x="560" y="330" width="240" height="170" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="355" text-anchor="middle" font-size="11" font-weight="bold">管理命令</text>
<text x="570" y="380" font-size="10" font-family="monospace">XDEL stream id</text>
<text x="570" y="398" font-size="10" font-family="monospace">XTRIM stream MAXLEN</text>
<text x="570" y="416" font-size="10" font-family="monospace">XINFO STREAM stream</text>
<text x="570" y="434" font-size="10" font-family="monospace">XINFO GROUPS stream</text>
<text x="570" y="460" font-size="9" fill="#f57c00">• 删除/裁剪消息</text>
<text x="570" y="478" font-size="9" fill="#f57c00">• 查看Stream信息</text>
</svg>

**Stream 数据类型特点**:

1. **消息队列**：专业的消息队列实现
2. **持久化**：消息自动持久化
3. **消费者组**：支持多消费者协作
4. **消息ID**:时间戳+序列号,全局唯一有序
5. **ACK机制**：消息确认,防止丢失

**常用命令**:

```bash
# 生产消息
XADD mystream * name "张三" age 25  # *表示自动生成ID
# 返回: 1609459200000-0 (时间戳-序列号)

# 读取消息
XREAD COUNT 2 STREAMS mystream 0   # 从头开始读2条
XREAD BLOCK 0 STREAMS mystream $   # 阻塞读取新消息

# 范围查询
XRANGE mystream - +                 # 查询所有消息
XRANGE mystream 1609459200000 +    # 从指定ID开始

# 获取长度
XLEN mystream

# 创建消费者组
XGROUP CREATE mystream group1 0    # 从头开始消费

# 消费者组读取
XREADGROUP GROUP group1 consumer1 COUNT 1 STREAMS mystream >

# 确认消息
XACK mystream group1 1609459200000-0

# 查看待处理消息
XPENDING mystream group1

# 删除消息
XDEL mystream 1609459200000-0

# 裁剪消息(保留最新1000条)
XTRIM mystream MAXLEN 1000
```

**Stream vs List 对比**:

| 特性 | Stream | List |
|-----|--------|------|
| **消费者组** | ✓ 支持 | ✗ 不支持 |
| **消息ID** | ✓ 唯一ID | ✗ 无ID |
| **ACK确认** | ✓ 支持 | ✗ 不支持 |
| **重复消费** | ✓ 支持 | ✗ 困难 |
| **消息持久化** | ✓ 自动 | ✓ 自动 |
| **使用场景** | 专业MQ | 简单队列 |

**Stream 消息ID格式**:

```
1609459200000-0
    ↓         ↓
  时间戳    序列号

- 时间戳: 毫秒级Unix时间戳
- 序列号: 同一毫秒内的序列号(从0开始)
- 保证全局唯一且有序
```

**使用场景**:

**1. 消息队列**:
```bash
# 生产者
XADD orders * orderId 1001 amount 100

# 消费者
XREAD COUNT 10 BLOCK 1000 STREAMS orders $
```

**2. 事件溯源**:
```bash
# 记录用户行为
XADD user:1001:events * action "login" time 1609459200
XADD user:1001:events * action "view" page "home"
XADD user:1001:events * action "purchase" productId 101

# 查看所有行为
XRANGE user:1001:events - +
```

**3. 日志收集**:
```bash
# 应用日志
XADD app:logs * level "error" msg "Connection timeout"

# 查询最近100条
XREVRANGE app:logs + - COUNT 100
```

**4. 消费者组协作**:
```bash
# 创建消费者组
XGROUP CREATE tasks task-workers 0

# 多个消费者并行处理
# 消费者1
XREADGROUP GROUP task-workers worker1 COUNT 1 STREAMS tasks >
# 消费者2
XREADGROUP GROUP task-workers worker2 COUNT 1 STREAMS tasks >

# 处理完成后确认
XACK tasks task-workers <message-id>
```

**Redis 5.0 其他改进**:

| 特性 | 说明 |
|-----|------|
| **新的 ZPOPMIN/ZPOPMAX** | ZSet弹出最小/最大元素 |
| **ZPOPMIN/ZPOPMAX** | 支持阻塞版本BZPOPMIN/BZPOPMAX |
| **Stream** | 全新的消息队列数据类型 |
| **新模块API** | 更强大的模块系统 |

**关键要点**:
- ✓ **Stream核心**:Redis 5.0最重要的新特性
- ✓ **专业MQ**:消费者组、ACK、持久化
- ✓ **消息ID**:时间戳+序列号,全局有序
- ✓ **可靠性高**：支持重复消费和ACK确认
- ✓ **替代List**:复杂消息队列场景优先使用Stream
- ⚠ **版本要求**：需要Redis 5.0+

**记忆口诀**:Redis 5.0 Stream登场,消费者组加ACK,消息持久化可靠,专业消息队列强



### 12. 什么是 Bitmap？有什么应用场景？

**核心答案**:Bitmap(位图)是基于 String 类型的位操作,通过操作二进制位来存储信息,每个位只占1bit,极其节省内存,常用于签到、在线状态、布隆过滤器等场景。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">Bitmap 位图全景图</text>
<rect x="30" y="60" width="790" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">Bitmap 的四大使用场景</text>
<rect x="50" y="110" width="180" height="150" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 用户签到</text>
<text x="60" y="160" font-size="10">• 连续签到统计</text>
<text x="60" y="178" font-size="10">• 签到记录</text>
<text x="60" y="196" font-size="10">• 打卡系统</text>
<text x="60" y="220" font-size="9" font-family="monospace">SETBIT/GETBIT</text>
<text x="60" y="245" font-size="9" fill="#1976d2" font-weight="bold">✓ 每天1bit</text>
<rect x="245" y="110" width="180" height="150" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 在线状态</text>
<text x="255" y="160" font-size="10">• 用户在线</text>
<text x="255" y="178" font-size="10">• 活跃统计</text>
<text x="255" y="196" font-size="10">• 实时状态</text>
<text x="255" y="220" font-size="9" font-family="monospace">SETBIT/BITCOUNT</text>
<text x="255" y="245" font-size="9" fill="#388e3c" font-weight="bold">✓ 1亿用户12MB</text>
<rect x="440" y="110" width="180" height="150" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 权限控制</text>
<text x="450" y="160" font-size="10">• 功能权限</text>
<text x="450" y="178" font-size="10">• 开关配置</text>
<text x="450" y="196" font-size="10">• 二值状态</text>
<text x="450" y="220" font-size="9" font-family="monospace">GETBIT判断权限</text>
<text x="450" y="245" font-size="9" fill="#f57c00" font-weight="bold">✓ 高效判断</text>
<rect x="635" y="110" width="170" height="150" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 布隆过滤器</text>
<text x="645" y="160" font-size="10">• 去重判断</text>
<text x="645" y="178" font-size="10">• 缓存穿透</text>
<text x="645" y="196" font-size="10">• 黑名单</text>
<text x="645" y="220" font-size="9" font-family="monospace">多次SETBIT</text>
<text x="645" y="245" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 快速过滤</text>
<rect x="30" y="300" width="790" height="270" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="330" text-anchor="middle" font-size="14" font-weight="bold">Bitmap 常用命令详解</text>
<rect x="50" y="350" width="240" height="200" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="375" text-anchor="middle" font-size="11" font-weight="bold">位操作</text>
<text x="60" y="400" font-size="10" font-family="monospace">SETBIT key offset val</text>
<text x="60" y="418" font-size="10" font-family="monospace">GETBIT key offset</text>
<text x="60" y="436" font-size="10" font-family="monospace">BITCOUNT key</text>
<text x="60" y="454" font-size="10" font-family="monospace">BITPOS key 0/1</text>
<text x="60" y="480" font-size="9" fill="#1976d2">• offset: 位偏移</text>
<text x="60" y="498" font-size="9" fill="#1976d2">• val: 0或1</text>
<text x="60" y="516" font-size="9" fill="#1976d2">• 返回1的个数</text>
<rect x="305" y="350" width="240" height="200" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="375" text-anchor="middle" font-size="11" font-weight="bold">位运算</text>
<text x="315" y="400" font-size="10" font-family="monospace">BITOP AND dest k1 k2</text>
<text x="315" y="418" font-size="10" font-family="monospace">BITOP OR dest k1 k2</text>
<text x="315" y="436" font-size="10" font-family="monospace">BITOP XOR dest k1 k2</text>
<text x="315" y="454" font-size="10" font-family="monospace">BITOP NOT dest key</text>
<text x="315" y="480" font-size="9" fill="#388e3c">• AND: 与运算</text>
<text x="315" y="498" font-size="9" fill="#388e3c">• OR: 或运算</text>
<text x="315" y="516" font-size="9" fill="#388e3c">• XOR: 异或运算</text>
<rect x="560" y="350" width="240" height="200" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="375" text-anchor="middle" font-size="11" font-weight="bold">内存对比</text>
<text x="570" y="400" font-size="10">1亿用户 vs 传统存储:</text>
<text x="570" y="425" font-size="9">• Bitmap: 12MB</text>
<text x="570" y="443" font-size="9">• Set: 约400MB</text>
<text x="570" y="461" font-size="9">• String: 约800MB</text>
<text x="570" y="490" font-size="9" fill="#f57c00" font-weight="bold">✓ 节省98%内存</text>
<text x="570" y="510" font-size="9" fill="#f57c00">• 1 bit vs 32+ bytes</text>
</svg>

**Bitmap 的特点**:

1. **本质**：基于 String 类型,最大512MB
2. **极省内存**：每个状态只占1bit(0或1)
3. **位操作**：支持按位设置、获取、统计
4. **位运算**：支持 AND、OR、XOR、NOT

**常用命令**:

```bash
# 基础操作
SETBIT user:sign:1001 0 1      # 设置第0位为1(第1天签到)
SETBIT user:sign:1001 1 1      # 设置第1位为1(第2天签到)
GETBIT user:sign:1001 0        # 获取第0位(1=已签到)

# 统计签到天数
BITCOUNT user:sign:1001        # 统计1的个数(签到天数)

# 查找第一个0或1
BITPOS user:sign:1001 0        # 找到第一个未签到的天
BITPOS user:sign:1001 1        # 找到第一个签到的天

# 位运算(交集、并集)
BITOP AND result key1 key2     # 两个位图的交集
BITOP OR result key1 key2      # 两个位图的并集
```

**实际应用场景**:

**1. 用户签到系统**:

```bash
# 用户1001在2025年1月的签到记录
# offset 0 代表1月1日,1代表1月2日,以此类推

# 1月1日签到
SETBIT user:sign:1001:202501 0 1

# 1月3日签到
SETBIT user:sign:1001:202501 2 1

# 1月5日签到
SETBIT user:sign:1001:202501 4 1

# 查询1月3日是否签到
GETBIT user:sign:1001:202501 2  # 返回1(已签到)

# 统计1月签到天数
BITCOUNT user:sign:1001:202501  # 返回3

# 查询连续签到
# 需要配合程序逻辑,从offset 0开始依次GETBIT判断
```

**2. 在线用户统计**:

```bash
# 用户ID作为offset
# 1=在线,0=离线

# 用户1001上线
SETBIT online:20250101 1001 1

# 用户1002上线
SETBIT online:20250101 1002 1

# 统计在线人数
BITCOUNT online:20250101

# 判断用户1001是否在线
GETBIT online:20250101 1001  # 返回1(在线)

# 1亿用户只需12MB内存
# 计算: 100,000,000 bits ÷ 8 ÷ 1024 ÷ 1024 ≈ 11.92 MB
```

**3. 活跃用户统计(连续N天活跃)**:

```bash
# 1月1日活跃用户
SETBIT active:20250101 1001 1
SETBIT active:20250101 1002 1
SETBIT active:20250101 1003 1

# 1月2日活跃用户
SETBIT active:20250102 1001 1
SETBIT active:20250102 1002 1

# 1月3日活跃用户
SETBIT active:20250103 1001 1

# 统计3天都活跃的用户(交集)
BITOP AND active:3days active:20250101 active:20250102 active:20250103
BITCOUNT active:3days  # 返回1(只有用户1001)

# 统计3天有任意一天活跃的用户(并集)
BITOP OR active:any3days active:20250101 active:20250102 active:20250103
BITCOUNT active:any3days  # 返回3
```

**4. 用户权限管理**:

```bash
# offset代表不同权限
# 0=读,1=写,2=删除,3=管理员

# 设置用户1001的权限
SETBIT user:perm:1001 0 1  # 有读权限
SETBIT user:perm:1001 1 1  # 有写权限

# 判断是否有删除权限
GETBIT user:perm:1001 2    # 返回0(无删除权限)

# 判断是否有写权限
GETBIT user:perm:1001 1    # 返回1(有写权限)
```

**5. 布隆过滤器实现**:

```bash
# 使用多个hash函数计算多个offset
# 判断元素是否可能存在

# 添加元素(使用3个hash函数)
SETBIT bloom:filter hash1(element) 1
SETBIT bloom:filter hash2(element) 1
SETBIT bloom:filter hash3(element) 1

# 判断元素是否存在
# 如果3个位置都是1,则可能存在
# 如果任意位置是0,则一定不存在
```

**Bitmap 的内存优势**:

| 场景 | 传统方式 | Bitmap | 节省比例 |
|-----|---------|--------|---------|
| **1亿用户在线状态** | Set: 400MB | 12MB | 97% |
| **1亿用户签到(30天)** | Hash: 12GB | 360MB | 97% |
| **1000万用户权限(8位)** | String: 160MB | 10MB | 94% |

**计算方式**:
```
用户数 = 100,000,000
所需bit = 100,000,000
所需字节 = 100,000,000 ÷ 8 = 12,500,000 bytes
所需MB = 12,500,000 ÷ 1024 ÷ 1024 ≈ 11.92 MB
```

**性能特点**:

| 操作 | 时间复杂度 | 说明 |
|-----|-----------|------|
| **SETBIT** | O(1) | 设置位很快 |
| **GETBIT** | O(1) | 获取位很快 |
| **BITCOUNT** | O(N) | N是字节数,不是bit数 |
| **BITPOS** | O(N) | 查找第一个0/1 |
| **BITOP** | O(N) | N是最长字符串长度 |

**使用注意事项**:

1. **offset不能太大**:
   - offset太大会造成内存浪费
   - 例如:SETBIT key 4294967295 1 会分配512MB

2. **连续的ID更适合**:
   - 用户ID: 1, 2, 3, 4... (连续) ✓
   - UUID: 随机字符串 ✗ (不适合)

3. **首次SETBIT会分配内存**:
   - SETBIT key 1000000 1
   - 会立即分配约122KB内存

4. **避免大offset跳跃**:
   ```bash
   # 不好的做法
   SETBIT users 1 1
   SETBIT users 999999999 1  # 会分配约119MB

   # 好的做法:使用Hash+模运算
   # 将大offset映射到小范围
   ```

**Bitmap vs 其他类型对比**:

| 特性 | Bitmap | Set | Hash |
|-----|--------|-----|------|
| **内存占用** | ✓ 极小 | 中等 | 较大 |
| **适用ID类型** | 连续整数 | 任意 | 任意 |
| **查询速度** | ✓ O(1) | O(1) | O(1) |
| **统计功能** | ✓ 强 | 中等 | 弱 |
| **典型场景** | 签到、在线状态 | 标签、去重 | 对象存储 |

**关键要点**:
- ✓ **极省内存**:1亿用户仅12MB
- ✓ **高效统计**:BITCOUNT统计个数
- ✓ **位运算**:AND/OR/XOR支持复杂查询
- ✓ **签到神器**：每天1bit,一年365bit
- ✓ **在线状态**：实时统计在线用户
- ⚠ **适合连续ID**:不连续会浪费内存
- ⚠ **offset限制**：不要设置过大的offset
- ⚠ **二值状态**：只能表示0或1

**记忆口诀**:Bitmap位图占内存少,签到在线状态好,连续ID最适合,offset别设太大了,BITCOUNT统计快,BITOP运算交并差
### 13. 什么是 HyperLogLog？有什么应用场景？

**核心答案**:HyperLogLog 是一种概率统计算法,用于基数统计(统计不重复元素个数),占用内存极小(固定12KB),误差率约0.81%,常用于 UV 统计、大数据去重计数等场景。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">HyperLogLog 全景图</text>
<rect x="30" y="60" width="790" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">HyperLogLog 的四大使用场景</text>
<rect x="50" y="110" width="180" height="150" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ UV统计</text>
<text x="60" y="160" font-size="10">• 独立访客</text>
<text x="60" y="178" font-size="10">• 日活用户</text>
<text x="60" y="196" font-size="10">• 去重计数</text>
<text x="60" y="220" font-size="9" font-family="monospace">PFADD/PFCOUNT</text>
<text x="60" y="245" font-size="9" fill="#1976d2" font-weight="bold">✓ 固定12KB</text>
<rect x="245" y="110" width="180" height="150" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 大数据去重</text>
<text x="255" y="160" font-size="10">• 亿级数据</text>
<text x="255" y="178" font-size="10">• 内存有限</text>
<text x="255" y="196" font-size="10">• 允许误差</text>
<text x="255" y="220" font-size="9" font-family="monospace">海量数据统计</text>
<text x="255" y="245" font-size="9" fill="#388e3c" font-weight="bold">✓ 误差0.81%</text>
<rect x="440" y="110" width="180" height="150" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 搜索推荐</text>
<text x="450" y="160" font-size="10">• 搜索词统计</text>
<text x="450" y="178" font-size="10">• 热门内容</text>
<text x="450" y="196" font-size="10">• 推荐去重</text>
<text x="450" y="220" font-size="9" font-family="monospace">PFMERGE合并</text>
<text x="450" y="245" font-size="9" fill="#f57c00" font-weight="bold">✓ 多维统计</text>
<rect x="635" y="110" width="170" height="150" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 实时统计</text>
<text x="645" y="160" font-size="10">• 实时UV</text>
<text x="645" y="178" font-size="10">• IP去重</text>
<text x="645" y="196" font-size="10">• 快速统计</text>
<text x="645" y="220" font-size="9" font-family="monospace">实时计数</text>
<text x="645" y="245" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 性能高</text>
<rect x="30" y="300" width="790" height="270" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="330" text-anchor="middle" font-size="14" font-weight="bold">HyperLogLog 核心特性</text>
<rect x="50" y="350" width="240" height="200" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="375" text-anchor="middle" font-size="11" font-weight="bold">内存优势</text>
<text x="60" y="405" font-size="10">统计1亿数据:</text>
<text x="60" y="430" font-size="9">• HyperLogLog: 12KB</text>
<text x="60" y="448" font-size="9">• Set: 约400MB</text>
<text x="60" y="466" font-size="9">• Hash: 约800MB</text>
<text x="60" y="495" font-size="9" fill="#1976d2" font-weight="bold">✓ 节省99.997%内存</text>
<text x="60" y="520" font-size="9">• 固定12KB不随数据增长</text>
<rect x="305" y="350" width="240" height="200" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="375" text-anchor="middle" font-size="11" font-weight="bold">误差特性</text>
<text x="315" y="405" font-size="10">标准误差率: 0.81%</text>
<text x="315" y="430" font-size="9">• 统计100万: ±810</text>
<text x="315" y="448" font-size="9">• 统计1亿: ±81000</text>
<text x="315" y="475" font-size="9" fill="#388e3c">• 概率算法,不精确</text>
<text x="315" y="493" font-size="9" fill="#388e3c">• 牺牲精度换内存</text>
<text x="315" y="520" font-size="9" fill="#388e3c" font-weight="bold">✓ UV统计可接受</text>
<rect x="560" y="350" width="240" height="200" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="375" text-anchor="middle" font-size="11" font-weight="bold">常用命令</text>
<text x="570" y="400" font-size="10" font-family="monospace">PFADD key element</text>
<text x="570" y="418" font-size="10" font-family="monospace">PFCOUNT key</text>
<text x="570" y="436" font-size="10" font-family="monospace">PFMERGE dest k1 k2</text>
<text x="570" y="463" font-size="9" fill="#f57c00">• PFADD: 添加元素</text>
<text x="570" y="481" font-size="9" fill="#f57c00">• PFCOUNT: 获取基数</text>
<text x="570" y="499" font-size="9" fill="#f57c00">• PFMERGE: 合并统计</text>
<text x="570" y="525" font-size="9" fill="#f57c00" font-weight="bold">✓ 操作简单</text>
</svg>

**HyperLogLog 的特点**:

1. **固定内存**：无论统计多少数据,始终占用12KB
2. **概率算法**：基于概率统计,有0.81%的误差
3. **去重计数**：自动去重,统计不重复元素个数
4. **不可获取元素**：只能统计数量,不能获取具体元素

**工作原理简述**:

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">HyperLogLog 工作原理</text>
<rect x="50" y="60" width="240" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="170" y="90" text-anchor="middle" font-size="13" font-weight="bold">1. Hash 映射</text>
<text x="60" y="120" font-size="10">元素 → Hash值</text>
<text x="60" y="145" font-size="9" font-family="monospace">"user1" → 010110...</text>
<text x="60" y="165" font-size="9" font-family="monospace">"user2" → 110010...</text>
<text x="60" y="190" font-size="9">前几位决定桶编号</text>
<text x="60" y="210" font-size="9">后续位统计前导0</text>
<text x="60" y="240" font-size="9" fill="#1976d2" font-weight="bold">✓ 均匀分布</text>
<rect x="310" y="60" width="220" height="200" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="420" y="90" text-anchor="middle" font-size="13" font-weight="bold">2. 分桶统计</text>
<text x="320" y="120" font-size="10">16384个桶</text>
<text x="320" y="145" font-size="9">桶0: 最大前导0=3</text>
<text x="320" y="165" font-size="9">桶1: 最大前导0=5</text>
<text x="320" y="185" font-size="9">桶2: 最大前导0=2</text>
<text x="320" y="205" font-size="9">...</text>
<text x="320" y="240" font-size="9" fill="#388e3c" font-weight="bold">✓ 记录最大值</text>
<rect x="550" y="60" width="220" height="200" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="660" y="90" text-anchor="middle" font-size="13" font-weight="bold">3. 调和平均</text>
<text x="560" y="120" font-size="10">基于所有桶的</text>
<text x="560" y="140" font-size="10">最大前导0数</text>
<text x="560" y="165" font-size="9">使用调和平均数</text>
<text x="560" y="185" font-size="9">+ 修正常数</text>
<text x="560" y="205" font-size="9">→ 估算基数</text>
<text x="560" y="240" font-size="9" fill="#f57c00" font-weight="bold">✓ 概率估算</text>
</svg>

**常用命令**:

```bash
# 添加元素
PFADD page:uv user1 user2 user3
# 返回值: 1(添加成功,基数发生变化) 或 0(基数未变化)

# 获取基数(不重复元素个数)
PFCOUNT page:uv
# 返回: 3

# 添加重复元素(不会增加基数)
PFADD page:uv user1
PFCOUNT page:uv  # 仍然是3

# 合并多个HyperLogLog
PFADD page1:uv user1 user2
PFADD page2:uv user2 user3
PFMERGE page:total:uv page1:uv page2:uv
PFCOUNT page:total:uv  # 返回3(user1, user2, user3去重后)
```

**实际应用场景**:

**1. 网站 UV 统计**:

```bash
# 每天的UV统计
# 用户访问时添加
PFADD uv:20250101 user1001
PFADD uv:20250101 user1002
PFADD uv:20250101 user1001  # 重复访问,不重复计数

# 获取当天UV
PFCOUNT uv:20250101  # 返回2

# 统计本周UV(合并7天的数据)
PFMERGE uv:week1 uv:20250101 uv:20250102 uv:20250103 uv:20250104 uv:20250105 uv:20250106 uv:20250107
PFCOUNT uv:week1

# 优势:
# - 1天UV数据只占12KB
# - 7天合并后仍然只占12KB
# - 传统Set存储1亿用户需要400MB
```

**2. 页面访问去重统计**:

```bash
# 统计不同页面的独立访客

# 首页UV
PFADD page:home:uv user1 user2 user3

# 商品页UV
PFADD page:product:uv user2 user3 user4

# 统计访问过首页或商品页的总UV
PFMERGE page:total:uv page:home:uv page:product:uv
PFCOUNT page:total:uv  # 返回4(user1,2,3,4去重)

# 无法直接求交集(HyperLogLog限制)
# 如需交集,建议使用Set
```

**3. 搜索关键词去重统计**:

```bash
# 统计每个关键词的搜索用户数

# 用户搜索"Redis"
PFADD search:redis user1001
PFADD search:redis user1002
PFADD search:redis user1001  # 同一用户重复搜索

# 获取搜索"Redis"的独立用户数
PFCOUNT search:redis  # 返回2

# 用户搜索"MySQL"
PFADD search:mysql user1002
PFADD search:mysql user1003

# 统计搜索Redis或MySQL的总用户数
PFMERGE search:database search:redis search:mysql
PFCOUNT search:database
```

**4. 实时在线用户数统计**:

```bash
# 实时统计在线用户(每分钟更新)

# 当前分钟在线用户
PFADD online:current user1 user2 user3

# 获取在线人数
PFCOUNT online:current  # 返回3

# 下一分钟,清空重新统计
DEL online:current
PFADD online:current user1 user4 user5

# 或者使用时间戳作为key
PFADD online:202501011430 user1 user2
```

**5. IP 地址去重统计**:

```bash
# 统计不同IP访问数

PFADD ip:visits 192.168.1.1
PFADD ip:visits 192.168.1.2
PFADD ip:visits 192.168.1.1  # 重复IP

PFCOUNT ip:visits  # 返回2
```

**HyperLogLog vs 其他方式对比**:

| 方式 | 内存占用 | 精确度 | 适用场景 |
|-----|---------|--------|---------|
| **HyperLogLog** | 12KB(固定) | 99.19% | 大数据UV统计 |
| **Set** | ~400MB(1亿) | 100% | 精确去重,数据量小 |
| **Bitmap** | ~12MB(1亿) | 100% | 连续ID,二值状态 |
| **Hash** | ~800MB(1亿) | 100% | 需要元素详情 |

**内存对比示例**:

```
统计1亿用户的UV:

HyperLogLog:
- 内存: 12KB
- 误差: ±81万(0.81%)
- 适用: UV统计(允许误差)

Set:
- 内存: 约400MB
- 误差: 0
- 适用: 精确统计,数据量不大

节省内存比例: 99.997%
```

**性能特点**:

| 操作 | 时间复杂度 | 说明 |
|-----|-----------|------|
| **PFADD** | O(1) | 添加元素很快 |
| **PFCOUNT** | O(1) | 获取基数很快 |
| **PFMERGE** | O(N) | N是HyperLogLog数量 |

**使用限制**:

1. **只能计数,不能获取元素**:
   ```bash
   PFADD users user1 user2 user3
   PFCOUNT users  # 可以:返回3
   # 不能:获取user1, user2, user3具体是谁
   ```

2. **有误差(0.81%)**:
   ```bash
   # 真实UV: 1,000,000
   # HyperLogLog: 991,900 ~ 1,008,100
   # 误差范围: ±8,100
   ```

3. **不能删除元素**:
   ```bash
   PFADD users user1 user2
   # 无法单独删除user1
   # 只能DEL整个key重新统计
   ```

4. **无法求交集**:
   ```bash
   # 只支持PFMERGE(并集)
   # 不支持交集、差集运算
   ```

**适用与不适用场景**:

**✓ 适用场景**:
- UV(独立访客)统计
- DAU(日活用户)统计
- 搜索关键词去重计数
- IP地址访问统计
- 大数据去重计数(可接受误差)

**✗ 不适用场景**:
- 需要精确计数(如金额统计)
- 需要获取具体元素
- 需要删除单个元素
- 需要交集/差集运算
- 数据量小且要求精确(用Set更好)

**HyperLogLog vs Bitmap 选择**:

| 对比项 | HyperLogLog | Bitmap |
|-------|-------------|--------|
| **内存** | 固定12KB | 取决于最大ID |
| **ID类型** | 任意 | 必须连续整数 |
| **精确度** | 99.19% | 100% |
| **获取元素** | ✗ 不支持 | ✓ 支持 |
| **统计功能** | 基数统计 | 位统计、位运算 |
| **典型场景** | UV统计 | 签到、在线状态 |

**选择建议**:
- **ID连续 + 需要精确** → Bitmap
- **ID任意 + 允许误差 + 数据量大** → HyperLogLog
- **需要元素详情** → Set
- **需要精确 + 数据量小** → Set

**关键要点**:
- ✓ **固定12KB**:无论多少数据都是12KB
- ✓ **去重计数**：自动去重统计基数
- ✓ **UV统计神器**：大数据去重首选
- ✓ **支持合并**:PFMERGE合并多个统计
- ✓ **性能极高**:O(1)添加和计数
- ⚠ **有误差**:0.81%标准误差
- ⚠ **不可逆**：不能获取具体元素
- ⚠ **不能删除**：无法删除单个元素
- ⚠ **无交集**：只支持并集PFMERGE

**记忆口诀**:HyperLogLog固定十二K,基数统计去重强,误差零点八一可接受,UV统计是专长,只能计数不存元素,合并并集用PFMERGE
### 14. 什么是 GEO？有什么应用场景？

**核心答案**:GEO(Geographic)是 Redis 3.2+ 引入的地理位置数据类型,底层基于 ZSet 实现,用于存储和查询地理坐标(经纬度),支持计算距离、范围查询等,常用于附近的人/店铺、打车、外卖配送等 LBS 场景。

**详细说明**:

<svg viewBox="0 0 850 600" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">GEO 地理位置全景图</text>
<rect x="30" y="60" width="790" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="3" rx="5"/>
<text x="425" y="90" text-anchor="middle" font-size="14" font-weight="bold">GEO 的四大使用场景</text>
<rect x="50" y="110" width="180" height="150" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="135" text-anchor="middle" font-size="12" font-weight="bold">1️⃣ 附近的人</text>
<text x="60" y="160" font-size="10">• 社交应用</text>
<text x="60" y="178" font-size="10">• 查找附近</text>
<text x="60" y="196" font-size="10">• 距离排序</text>
<text x="60" y="220" font-size="9" font-family="monospace">GEORADIUS</text>
<text x="60" y="245" font-size="9" fill="#1976d2" font-weight="bold">✓ 按距离查询</text>
<rect x="245" y="110" width="180" height="150" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="335" y="135" text-anchor="middle" font-size="12" font-weight="bold">2️⃣ 附近商家</text>
<text x="255" y="160" font-size="10">• 外卖配送</text>
<text x="255" y="178" font-size="10">• 店铺推荐</text>
<text x="255" y="196" font-size="10">• 范围搜索</text>
<text x="255" y="220" font-size="9" font-family="monospace">GEORADIUSBYMEMBER</text>
<text x="255" y="245" font-size="9" fill="#388e3c" font-weight="bold">✓ LBS应用</text>
<rect x="440" y="110" width="180" height="150" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12" font-weight="bold">3️⃣ 打车距离</text>
<text x="450" y="160" font-size="10">• 计算距离</text>
<text x="450" y="178" font-size="10">• 司机匹配</text>
<text x="450" y="196" font-size="10">• 路程计算</text>
<text x="450" y="220" font-size="9" font-family="monospace">GEODIST</text>
<text x="450" y="245" font-size="9" fill="#f57c00" font-weight="bold">✓ 距离计算</text>
<rect x="635" y="110" width="170" height="150" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="720" y="135" text-anchor="middle" font-size="12" font-weight="bold">4️⃣ 位置追踪</text>
<text x="645" y="160" font-size="10">• 物流追踪</text>
<text x="645" y="178" font-size="10">• 车辆定位</text>
<text x="645" y="196" font-size="10">• 实时位置</text>
<text x="645" y="220" font-size="9" font-family="monospace">GEOPOS</text>
<text x="645" y="245" font-size="9" fill="#7b1fa2" font-weight="bold">✓ 坐标获取</text>
<rect x="30" y="300" width="790" height="270" fill="#fff3e0" stroke="#f57c00" stroke-width="3" rx="5"/>
<text x="425" y="330" text-anchor="middle" font-size="14" font-weight="bold">GEO 常用命令详解</text>
<rect x="50" y="350" width="240" height="200" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="170" y="375" text-anchor="middle" font-size="11" font-weight="bold">添加与查询</text>
<text x="60" y="400" font-size="10" font-family="monospace">GEOADD key lng lat m</text>
<text x="60" y="418" font-size="10" font-family="monospace">GEOPOS key member</text>
<text x="60" y="436" font-size="10" font-family="monospace">GEODIST key m1 m2</text>
<text x="60" y="463" font-size="9" fill="#1976d2">• 添加位置</text>
<text x="60" y="481" font-size="9" fill="#1976d2">• 获取坐标</text>
<text x="60" y="499" font-size="9" fill="#1976d2">• 计算距离</text>
<text x="60" y="525" font-size="9" fill="#1976d2" font-weight="bold">✓ 基础操作</text>
<rect x="305" y="350" width="240" height="200" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="425" y="375" text-anchor="middle" font-size="11" font-weight="bold">范围查询</text>
<text x="315" y="400" font-size="10" font-family="monospace">GEORADIUS key lng</text>
<text x="315" y="418" font-size="10" font-family="monospace">  lat radius unit</text>
<text x="315" y="436" font-size="10" font-family="monospace">GEORADIUSBYMEMBER</text>
<text x="315" y="463" font-size="9" fill="#388e3c">• 按坐标查范围</text>
<text x="315" y="481" font-size="9" fill="#388e3c">• 按成员查范围</text>
<text x="315" y="499" font-size="9" fill="#388e3c">• 支持排序</text>
<text x="315" y="525" font-size="9" fill="#388e3c" font-weight="bold">✓ 核心功能</text>
<rect x="560" y="350" width="240" height="200" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="680" y="375" text-anchor="middle" font-size="11" font-weight="bold">底层实现</text>
<text x="570" y="405" font-size="10">基于 ZSet(有序集合)</text>
<text x="570" y="430" font-size="9">• GeoHash编码</text>
<text x="570" y="448" font-size="9">• 52位整数score</text>
<text x="570" y="466" font-size="9">• 支持ZSet命令</text>
<text x="570" y="493" font-size="9" fill="#f57c00">• 可用ZREM删除</text>
<text x="570" y="520" font-size="9" fill="#f57c00" font-weight="bold">✓ 高效存储</text>
</svg>

**GEO 的特点**:

1. **底层实现**：基于 ZSet,使用 GeoHash 编码
2. **坐标系统**:WGS84 坐标系(经度-180~180,纬度-85.05~85.05)
3. **距离计算**：基于球面距离公式
4. **范围查询**：支持按距离、按坐标查询

**常用命令**:

```bash
# 添加位置(经度 纬度 名称)
GEOADD cities 116.404 39.915 "北京"
GEOADD cities 121.472 31.231 "上海"
GEOADD cities 113.264 23.129 "广州"

# 批量添加
GEOADD cities 114.057 22.543 "深圳" 120.153 30.287 "杭州"

# 获取位置坐标
GEOPOS cities "北京"
# 返回: 116.40400022268295288, 39.91499993026033138

# 计算两地距离
GEODIST cities "北京" "上海" km
# 返回: 1067.5980(公里)

# 单位: m(米), km(千米), mi(英里), ft(英尺)

# 查找附近的位置(按坐标)
GEORADIUS cities 116.404 39.915 1000 km
# 返回北京周围1000公里内的城市

# 查找附近的位置(按成员)
GEORADIUSBYMEMBER cities "北京" 1000 km
# 返回北京周围1000公里内的其他城市

# 带距离和坐标
GEORADIUSBYMEMBER cities "北京" 1000 km WITHDIST WITHCOORD ASC COUNT 5
# WITHDIST: 返回距离
# WITHCOORD: 返回坐标
# ASC: 由近到远排序(DESC由远到近)
# COUNT 5: 限制返回5条

# 获取GeoHash
GEOHASH cities "北京" "上海"
# 返回GeoHash字符串

# 删除位置(使用ZSet的ZREM命令)
ZREM cities "北京"
```

**实际应用场景**:

**1. 附近的人(社交应用)**:

```bash
# 用户上线时更新位置
GEOADD online:users 116.404 39.915 "user1001"
GEOADD online:users 116.405 39.916 "user1002"

# 查找user1001附近5公里内的人
GEORADIUSBYMEMBER online:users "user1001" 5 km WITHDIST ASC

# 返回:
# 1) "user1001"
#    "0.0000"
# 2) "user1002"
#    "0.1234"

# 查找指定坐标附近的人
GEORADIUS online:users 116.404 39.915 5 km WITHDIST COUNT 10
```

**2. 附近的商家(外卖/O2O)**:

```bash
# 商家入驻时添加位置
GEOADD restaurants 116.404 39.915 "麦当劳(国贸店)"
GEOADD restaurants 116.405 39.916 "肯德基(CBD店)"
GEOADD restaurants 116.410 39.920 "海底捞(三里屯店)"

# 用户搜索附近3公里的餐厅
GEORADIUS restaurants 116.404 39.915 3 km WITHDIST ASC COUNT 20

# 按距离排序,只返回前20家
```

**3. 打车/网约车**:

```bash
# 司机上线,添加位置
GEOADD drivers 116.404 39.915 "driver001"
GEOADD drivers 116.408 39.918 "driver002"
GEOADD drivers 116.402 39.913 "driver003"

# 乘客叫车,查找附近5公里内的司机
GEORADIUS drivers 116.405 39.916 5 km WITHDIST ASC COUNT 5

# 返回最近的5个司机及距离

# 计算乘客到司机的距离
GEOADD passengers 116.405 39.916 "passenger001"
GEODIST drivers "driver001" passengers "passenger001" m
```

**4. 物流配送**:

```bash
# 配送站点
GEOADD stations 116.404 39.915 "站点A"
GEOADD stations 116.450 39.950 "站点B"

# 计算订单配送地址到最近站点的距离
GEOADD orders 116.410 39.920 "order12345"
GEORADIUSBYMEMBER orders "order12345" 50 km WITHDIST ASC
# 找到最近的站点进行配送
```

**5. 车辆定位追踪**:

```bash
# 实时更新车辆位置
GEOADD vehicles 116.404 39.915 "car001"

# 每隔几秒更新一次
GEOADD vehicles 116.405 39.916 "car001"  # 位置更新

# 查询车辆当前位置
GEOPOS vehicles "car001"

# 查看车辆周围的其他车辆
GEORADIUSBYMEMBER vehicles "car001" 1 km
```

**GeoHash 原理**:

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">GeoHash 编码原理</text>
<rect x="50" y="60" width="220" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="160" y="90" text-anchor="middle" font-size="13" font-weight="bold">1. 经纬度</text>
<text x="60" y="120" font-size="10">北京坐标:</text>
<text x="60" y="145" font-size="9">经度: 116.404</text>
<text x="60" y="165" font-size="9">纬度: 39.915</text>
<text x="60" y="195" font-size="9">范围:</text>
<text x="60" y="215" font-size="9">经度: -180~180</text>
<text x="60" y="235" font-size="9">纬度: -90~90</text>
<rect x="290" y="60" width="220" height="200" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="90" text-anchor="middle" font-size="13" font-weight="bold">2. 二进制编码</text>
<text x="300" y="120" font-size="10">区间二分编码:</text>
<text x="300" y="145" font-size="9">经度 > 0: 1</text>
<text x="300" y="165" font-size="9">纬度 > 0: 1</text>
<text x="300" y="185" font-size="9">...</text>
<text x="300" y="210" font-size="9">交织编码</text>
<text x="300" y="230" font-size="9">→ 52位整数</text>
<rect x="530" y="60" width="220" height="200" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="640" y="90" text-anchor="middle" font-size="13" font-weight="bold">3. ZSet存储</text>
<text x="540" y="120" font-size="10">member: 北京</text>
<text x="540" y="145" font-size="9">score: GeoHash值</text>
<text x="540" y="165" font-size="9">(52位整数)</text>
<text x="540" y="195" font-size="9">优势:</text>
<text x="540" y="215" font-size="9">• 附近的点score接近</text>
<text x="540" y="235" font-size="9">• 范围查询高效</text>
</svg>

**GeoHash 编码特点**:
- 将二维坐标转换为一维整数
- 相邻的位置GeoHash值接近
- 支持不同精度(字符串长度)
- Redis内部使用52位整数

**性能特点**:

| 操作 | 时间复杂度 | 说明 |
|-----|-----------|------|
| **GEOADD** | O(log N) | 基于ZSet |
| **GEOPOS** | O(log N) | 查找成员 |
| **GEODIST** | O(log N) | 两次查找 |
| **GEORADIUS** | O(N+log M) | N是半径内元素,M是总数 |

**使用注意事项**:

1. **坐标范围限制**:
   - 经度: -180 ~ 180
   - 纬度: -85.05112878 ~ 85.05112878
   - 超出范围会返回错误

2. **精度问题**:
   - 误差约0.5米
   - 基于球面距离,非精确计算
   - 适合大多数LBS场景

3. **大量数据性能**:
   - 百万级数据可能较慢
   - 建议分区存储(如按城市)
   - 或使用专业GIS数据库

4. **删除操作**:
   ```bash
   # GEO没有GEODEL命令
   # 使用ZSet的ZREM删除
   ZREM cities "北京"
   ```

**GEO vs 其他方案对比**:

| 方案 | 优势 | 劣势 | 适用场景 |
|-----|------|------|---------|
| **Redis GEO** | 简单易用,实时性好 | 功能有限,大数据慢 | 中小规模LBS |
| **MySQL空间索引** | 功能完整,支持复杂查询 | 性能一般 | 传统应用 |
| **MongoDB GEO** | 功能丰富,性能好 | 学习成本高 | 大规模GIS |
| **Elasticsearch** | 强大的地理查询 | 资源占用大 | 复杂搜索 |
| **专业GIS** | 功能最强 | 成本高,复杂 | 专业地图应用 |

**底层实现细节**:

```bash
# GEO本质是ZSet
# 可以使用ZSet命令操作

# 查看所有位置
ZRANGE cities 0 -1

# 删除位置
ZREM cities "北京"

# 统计数量
ZCARD cities

# 但score是GeoHash编码,不要直接修改
```

**关键要点**:
- ✓ **底层ZSet**:基于有序集合实现
- ✓ **GeoHash编码**：二维转一维,高效存储
- ✓ **距离计算**：球面距离公式
- ✓ **范围查询**:GEORADIUS核心功能
- ✓ **LBS场景**：附近的人/店铺首选
- ✓ **实时性好**：适合动态位置更新
- ⚠ **精度有限**：约0.5米误差
- ⚠ **大数据慢**：百万级建议分区
- ⚠ **功能简单**：复杂GIS用专业方案

**记忆口诀**:GEO地理位置基于ZSet,GeoHash编码经纬度,GEORADIUS查附近,距离计算用GEODIST,附近的人和商家,打车外卖都靠它
