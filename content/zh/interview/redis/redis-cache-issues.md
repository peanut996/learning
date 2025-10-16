## 缓存问题

### 26. 什么是缓存穿透？如何解决？

**核心答案：**

**缓存穿透**是指查询一个**不存在的数据**，由于缓存和数据库都没有该数据，导致每次请求都会穿透缓存直接查询数据库，给数据库带来巨大压力。

**解决方案：**
1. **布隆过滤器（推荐）**：在缓存前增加一层布隆过滤器，快速判断数据是否存在
2. **缓存空值**：将不存在的数据也缓存起来，设置较短的过期时间
3. **参数校验**：在接口层对参数进行合法性校验

**详细说明：**

#### 问题场景

**正常请求流程：**
```
客户端 → 缓存（有数据）→ 返回
客户端 → 缓存（无数据）→ 数据库（有数据）→ 写缓存 → 返回
```

**缓存穿透流程：**
```
客户端 → 缓存（无数据）→ 数据库（无数据）→ 返回空
客户端 → 缓存（无数据）→ 数据库（无数据）→ 返回空  ← 持续穿透！
```

**典型场景：**
```bash
# 恶意查询不存在的用户
GET /user/999999999  # 用户不存在
GET /user/888888888  # 用户不存在
GET /user/777777777  # 用户不存在
# 每次都会查询缓存（miss）→ 查询数据库（miss）
```

**危害：**
1. 大量请求直接打到数据库
2. 数据库压力剧增，可能被打垮
3. 缓存完全失去作用
4. 系统响应变慢或不可用
5. 容易被恶意攻击利用

<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="450" y="25" text-anchor="middle" font-size="20" font-weight="bold">缓存穿透问题示意图</text>
<rect x="50" y="50" width="800" height="240" fill="#ffe4e1" stroke="#dc143c" stroke-width="3" rx="8"/>
<text x="450" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc143c">❌ 缓存穿透场景</text>
<rect x="100" y="100" width="120" height="80" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="5"/>
<text x="160" y="130" text-anchor="middle" font-size="14" font-weight="bold">客户端</text>
<text x="160" y="150" text-anchor="middle" font-size="11">查询 user:999</text>
<text x="160" y="165" text-anchor="middle" font-size="10" fill="#dc143c">(不存在)</text>
<rect x="320" y="100" width="120" height="80" fill="#ffd700" stroke="#ff8c00" stroke-width="2" rx="5"/>
<text x="380" y="130" text-anchor="middle" font-size="14" font-weight="bold">Redis</text>
<text x="380" y="150" text-anchor="middle" font-size="11">缓存</text>
<text x="380" y="165" text-anchor="middle" font-size="10" fill="#dc143c">❌ 不存在</text>
<rect x="540" y="100" width="120" height="80" fill="#90ee90" stroke="#228b22" stroke-width="2" rx="5"/>
<text x="600" y="130" text-anchor="middle" font-size="14" font-weight="bold">MySQL</text>
<text x="600" y="150" text-anchor="middle" font-size="11">数据库</text>
<text x="600" y="165" text-anchor="middle" font-size="10" fill="#dc143c">❌ 不存在</text>
<line x1="220" y1="130" x2="310" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="265" y="120" text-anchor="middle" font-size="10" fill="#333">① 查询缓存</text>
<line x1="440" y1="130" x2="530" y2="130" stroke="#666" stroke-width="2" marker-end="url(#arrow5)"/>
<text x="485" y="120" text-anchor="middle" font-size="10" fill="#333">② 缓存未命中</text>
<text x="485" y="133" text-anchor="middle" font-size="10" fill="#333">查询数据库</text>
<line x1="530" y1="150" x2="450" y2="150" stroke="#dc143c" stroke-width="2" marker-end="url(#arrow5)" stroke-dasharray="5,5"/>
<text x="490" y="143" text-anchor="middle" font-size="10" fill="#dc143c">③ 数据不存在</text>
<line x1="320" y1="150" x2="230" y2="150" stroke="#dc143c" stroke-width="2" marker-end="url(#arrow5)" stroke-dasharray="5,5"/>
<text x="275" y="143" text-anchor="middle" font-size="10" fill="#dc143c">④ 返回空</text>
<text x="160" y="210" text-anchor="middle" font-size="11" fill="#dc143c" font-weight="bold">⚠️ 下次请求重复上述流程</text>
<text x="160" y="225" text-anchor="middle" font-size="10" fill="#666">大量不存在的数据请求</text>
<text x="160" y="240" text-anchor="middle" font-size="10" fill="#666">持续穿透到数据库</text>
<ellipse cx="600" cy="220" rx="80" ry="40" fill="none" stroke="#dc143c" stroke-width="3" stroke-dasharray="10,5"/>
<text x="600" y="215" text-anchor="middle" font-size="12" fill="#dc143c" font-weight="bold">数据库压力</text>
<text x="600" y="230" text-anchor="middle" font-size="11" fill="#dc143c">持续增加 ↑↑↑</text>
<rect x="50" y="310" width="800" height="270" fill="#f0fff0" stroke="#32cd32" stroke-width="3" rx="8"/>
<text x="450" y="335" text-anchor="middle" font-size="16" font-weight="bold" fill="#228b22">✅ 解决方案对比</text>
<rect x="80" y="355" width="230" height="200" fill="#e0f7fa" stroke="#00acc1" stroke-width="2" rx="5"/>
<text x="195" y="380" text-anchor="middle" font-size="14" font-weight="bold" fill="#00695c">① 布隆过滤器</text>
<text x="90" y="405" font-size="11" fill="#333">原理：</text>
<text x="95" y="422" font-size="10" fill="#666">• 初始化时加载所有数据 ID</text>
<text x="95" y="437" font-size="10" fill="#666">• 请求先经过布隆过滤器</text>
<text x="95" y="452" font-size="10" fill="#666">• 不存在直接拒绝</text>
<text x="90" y="475" font-size="11" fill="#228b22">优点：</text>
<text x="95" y="490" font-size="10" fill="#666">• 内存占用极小</text>
<text x="95" y="505" font-size="10" fill="#666">• 查询速度快 O(k)</text>
<text x="90" y="528" font-size="11" fill="#dc143c">缺点：</text>
<text x="95" y="543" font-size="10" fill="#666">• 存在误判率（约 1%）</text>
<rect x="330" y="355" width="230" height="200" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="445" y="380" text-anchor="middle" font-size="14" font-weight="bold" fill="#f57f17">② 缓存空值</text>
<text x="340" y="405" font-size="11" fill="#333">原理：</text>
<text x="345" y="422" font-size="10" fill="#666">• 数据库无数据时</text>
<text x="345" y="437" font-size="10" fill="#666">• 缓存设置空值标记</text>
<text x="345" y="452" font-size="10" fill="#666">• 下次直接返回空</text>
<text x="340" y="475" font-size="11" fill="#228b22">优点：</text>
<text x="345" y="490" font-size="10" fill="#666">• 实现简单</text>
<text x="345" y="505" font-size="10" fill="#666">• 完全避免穿透</text>
<text x="340" y="528" font-size="11" fill="#dc143c">缺点：</text>
<text x="345" y="543" font-size="10" fill="#666">• 占用缓存空间</text>
<rect x="580" y="355" width="230" height="200" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="695" y="380" text-anchor="middle" font-size="14" font-weight="bold" fill="#7b1fa2">③ 参数校验</text>
<text x="590" y="405" font-size="11" fill="#333">原理：</text>
<text x="595" y="422" font-size="10" fill="#666">• 接口层参数验证</text>
<text x="595" y="437" font-size="10" fill="#666">• 非法参数直接拒绝</text>
<text x="595" y="452" font-size="10" fill="#666">• 限制请求频率</text>
<text x="590" y="475" font-size="11" fill="#228b22">优点：</text>
<text x="595" y="490" font-size="10" fill="#666">• 简单有效</text>
<text x="595" y="505" font-size="10" fill="#666">• 防止恶意攻击</text>
<text x="590" y="528" font-size="11" fill="#dc143c">缺点：</text>
<text x="595" y="543" font-size="10" fill="#666">• 无法完全避免</text>
</svg>

#### 解决方案详解

**方案一：布隆过滤器（推荐）**

**原理：**
- 布隆过滤器是一种空间效率极高的概率型数据结构
- 用于判断一个元素是否在集合中
- 可能有误判（False Positive），但不会漏判（False Negative）

**实现步骤：**
```java
// 1. 初始化布隆过滤器
BloomFilter<Long> bloomFilter = BloomFilter.create(
    Funnels.longFunnel(),
    100000000,  // 预期数据量
    0.01        // 误判率 1%
);

// 2. 启动时加载所有有效 ID
List<Long> userIds = userDao.getAllUserIds();
for (Long userId : userIds) {
    bloomFilter.put(userId);
}

// 3. 查询时先过滤
public User getUser(Long userId) {
    // 先查布隆过滤器
    if (!bloomFilter.mightContain(userId)) {
        return null;  // 一定不存在，直接返回
    }

    // 可能存在，继续查询缓存和数据库
    User user = redis.get("user:" + userId);
    if (user == null) {
        user = db.getUser(userId);
        if (user != null) {
            redis.set("user:" + userId, user);
        }
    }
    return user;
}
```

**优点：**
- 内存占用极小（1 亿数据约 12MB）
- 查询速度极快（O(k)，k 为哈希函数个数）
- 可以过滤绝大部分不存在的请求

**缺点：**
- 存在误判率（约 1%），但可以接受
- 不支持删除（可使用 Counting Bloom Filter）
- 需要定期更新（新增数据时需要添加到过滤器）

**方案二：缓存空值**

**实现步骤：**
```java
public User getUser(Long userId) {
    // 1. 查询缓存
    String cacheKey = "user:" + userId;
    String value = redis.get(cacheKey);

    // 2. 缓存命中
    if (value != null) {
        if ("NULL".equals(value)) {
            return null;  // 空值标记
        }
        return JSON.parseObject(value, User.class);
    }

    // 3. 查询数据库
    User user = db.getUser(userId);

    // 4. 数据库也没有，缓存空值
    if (user == null) {
        redis.setex(cacheKey, 300, "NULL");  // 5 分钟过期
        return null;
    }

    // 5. 正常缓存数据
    redis.setex(cacheKey, 3600, JSON.toJSONString(user));
    return user;
}
```

**优点：**
- 实现简单，易于理解
- 完全避免了缓存穿透
- 不存在误判

**缺点：**
- 占用缓存空间
- 短期数据不一致（空值过期前，新增数据无法查到）
- 恶意攻击时，大量不同的不存在 ID 会占满缓存

**优化：**
- 空值设置较短的过期时间（5-10 分钟）
- 结合布隆过滤器使用

**方案三：参数校验 + 限流**

**实现步骤：**
```java
@RestController
public class UserController {

    @GetMapping("/user/{userId}")
    @RateLimit(limit = 100, period = 60)  // 限流
    public User getUser(@PathVariable Long userId) {
        // 1. 参数校验
        if (userId == null || userId <= 0 || userId > 10000000) {
            throw new IllegalArgumentException("非法的用户 ID");
        }

        // 2. IP 黑名单检查
        if (isBlacklisted(getClientIp())) {
            throw new ForbiddenException("IP 已被封禁");
        }

        // 3. 正常查询
        return userService.getUser(userId);
    }
}
```

**优点：**
- 在入口处拦截非法请求
- 防止恶意攻击
- 保护后端服务

**缺点：**
- 无法完全避免缓存穿透
- 需要维护黑名单
- 限流可能影响正常用户

#### 综合方案（推荐）

**多层防护：**
```
1. 接口层：参数校验 + 限流
2. 缓存前：布隆过滤器快速过滤
3. 缓存层：缓存空值（短期）
4. 监控层：异常请求告警
```

**实现代码：**
```java
public User getUser(Long userId) {
    // 第一层：参数校验
    if (userId == null || userId <= 0) {
        return null;
    }

    // 第二层：布隆过滤器
    if (!bloomFilter.mightContain(userId)) {
        return null;  // 一定不存在
    }

    // 第三层：查询缓存
    String cacheKey = "user:" + userId;
    String value = redis.get(cacheKey);
    if (value != null) {
        return "NULL".equals(value) ? null : JSON.parseObject(value, User.class);
    }

    // 第四层：查询数据库
    User user = db.getUser(userId);

    // 第五层：缓存结果（包括空值）
    if (user == null) {
        redis.setex(cacheKey, 300, "NULL");  // 空值缓存 5 分钟
    } else {
        redis.setex(cacheKey, 3600, JSON.toJSONString(user));
    }

    return user;
}
```

**关键要点：**

1. **缓存穿透的本质**：查询不存在的数据，缓存失去作用
2. **危害严重**：大量请求直接打到数据库，可能导致数据库崩溃
3. **布隆过滤器是最优解**：空间小、速度快、效果好
4. **缓存空值简单有效**：但要注意过期时间和空间占用
5. **多层防护最安全**：参数校验 + 布隆过滤器 + 缓存空值
6. **监控很重要**：及时发现异常请求，快速响应
7. **定期更新过滤器**：新增数据时要同步更新布隆过滤器

**实际案例：**

```bash
# 场景：电商系统遭受缓存穿透攻击
# 攻击者使用不存在的商品 ID 疯狂请求

# 问题现象
- 数据库 CPU 100%
- 查询响应时间从 10ms 上升到 5s
- 正常用户无法访问

# 解决方案
1. 紧急限流，封禁攻击 IP
2. 增加参数校验（商品 ID 范围）
3. 部署布隆过滤器
4. 缓存空值，过期时间 5 分钟

# 效果
- 数据库压力降低 95%
- 响应时间恢复到 20ms
- 成功防御攻击
```

**记忆口诀：**

> **"不存在的数据，穿透到数据库"**
> - 穿透原因：数据不存在，缓存和数据库都没有
> - 布隆过滤：提前拦截，不存在的不让过
> - 缓存空值：查过一次，空结果也缓存
> - 参数校验：入口拦截，非法请求不接受
> - 多层防护：层层把关，确保万无一失

### 27. 什么是缓存击穿？如何解决？

**核心答案：**

**缓存击穿**是指一个**热点 key** 在缓存过期的瞬间，有大量并发请求同时访问这个 key，导致所有请求都打到数据库，造成数据库瞬时压力骤增。

**解决方案：**
1. **互斥锁（Mutex）**：只让一个线程查询数据库，其他线程等待
2. **逻辑过期**：不设置物理过期时间，用逻辑字段标记过期
3. **提前更新**：在key快过期前主动刷新

**详细说明：**

#### 问题场景

**正常情况：**
```
时刻 1: key 存在 → 100 个请求 → 全部命中缓存 ✅
时刻 2: key 过期 → 第1个请求 → 查DB → 写缓存 → 返回 ✅
时刻 3: key 存在 → 99 个请求 → 全部命中缓存 ✅
```

**缓存击穿情况：**
```
时刻 1: key 存在 → 100 个请求 → 全部命中缓存 ✅
时刻 2: key 过期 → 100 个请求同时到达 → 全部查DB ❌
       ↓
       数据库瞬间压力激增！
```

**典型场景：**
```bash
# 热门商品详情在高峰期过期
商品ID: product:hot_item_001
访问量: 10万 QPS
过期时间: 正好在秒杀活动期间过期
结果: 10万个请求同时查询数据库
```

**缓存击穿 vs 缓存穿透 vs 缓存雪崩：**

| 维度 | 缓存击穿 | 缓存穿透 | 缓存雪崩 |
|-----|---------|---------|---------|
| 问题 | 热点key过期 | 查询不存在的数据 | 大量key同时过期 |
| 影响 | 单个热点key | 任意不存在的key | 大量key |
| 频率 | 低（偶发） | 持续 | 低（偶发） |
| 危害 | 数据库瞬时压力大 | 数据库持续压力 | 数据库雪崩 |

<svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow6" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker>
</defs>
<text x="450" y="25" text-anchor="middle" font-size="20" font-weight="bold">缓存击穿问题示意图</text>
<rect x="50" y="50" width="800" height="250" fill="#ffe4e1" stroke="#dc143c" stroke-width="3" rx="8"/>
<text x="450" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc143c">❌ 缓存击穿场景</text>
<rect x="100" y="100" width="650" height="40" fill="#ffd700" stroke="#ff8c00" stroke-width="2" rx="5"/>
<text x="425" y="125" text-anchor="middle" font-size="13" font-weight="bold">热点 key (product:1000) 过期时刻</text>
<g transform="translate(100, 150)">
<rect x="0" y="0" width="80" height="45" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="3"/>
<text x="40" y="25" text-anchor="middle" font-size="11">请求1</text>
<rect x="95" y="0" width="80" height="45" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="3"/>
<text x="135" y="25" text-anchor="middle" font-size="11">请求2</text>
<rect x="190" y="0" width="80" height="45" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="3"/>
<text x="230" y="25" text-anchor="middle" font-size="11">请求3</text>
<rect x="285" y="0" width="80" height="45" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="3"/>
<text x="325" y="25" text-anchor="middle" font-size="11">...</text>
<rect x="380" y="0" width="80" height="45" fill="#87ceeb" stroke="#4169e1" stroke-width="2" rx="3"/>
<text x="420" y="25" text-anchor="middle" font-size="11">请求100</text>
</g>
<line x1="425" y1="205" x2="425" y2="230" stroke="#dc143c" stroke-width="3" marker-end="url(#arrow6)"/>
<text x="450" y="225" font-size="12" fill="#dc143c" font-weight="bold">同时</text>
<rect x="320" y="235" width="210" height="50" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="425" y="255" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc143c">Redis 缓存 miss!</text>
<text x="425" y="275" text-anchor="middle" font-size="11" fill="#666">所有请求同时查询数据库</text>
<ellipse cx="425" cy="250" rx="160" ry="60" fill="none" stroke="#dc143c" stroke-width="3" stroke-dasharray="10,5"/>
<rect x="50" y="320" width="800" height="310" fill="#f0fff0" stroke="#32cd32" stroke-width="3" rx="8"/>
<text x="450" y="345" text-anchor="middle" font-size="16" font-weight="bold" fill="#228b22">✅ 解决方案对比</text>
<rect x="80" y="365" width="230" height="240" fill="#e0f7fa" stroke="#00acc1" stroke-width="2" rx="5"/>
<text x="195" y="390" text-anchor="middle" font-size="14" font-weight="bold" fill="#00695c">① 互斥锁（推荐）</text>
<text x="90" y="415" font-size="11" fill="#333">原理：</text>
<text x="95" y="432" font-size="10" fill="#666">• 第一个请求加锁查DB</text>
<text x="95" y="447" font-size="10" fill="#666">• 其他请求等待或重试</text>
<text x="95" y="462" font-size="10" fill="#666">• 查完释放锁，写缓存</text>
<text x="90" y="485" font-size="11" fill="#228b22">优点：</text>
<text x="95" y="500" font-size="10" fill="#666">• 实现简单</text>
<text x="95" y="515" font-size="10" fill="#666">• 完全避免击穿</text>
<text x="95" y="530" font-size="10" fill="#666">• 保证数据一致性</text>
<text x="90" y="553" font-size="11" fill="#dc143c">缺点：</text>
<text x="95" y="568" font-size="10" fill="#666">• 等待可能超时</text>
<text x="95" y="583" font-size="10" fill="#666">• 吞吐量略降</text>
<rect x="330" y="365" width="230" height="240" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="445" y="390" text-anchor="middle" font-size="14" font-weight="bold" fill="#f57f17">② 逻辑过期</text>
<text x="340" y="415" font-size="11" fill="#333">原理：</text>
<text x="345" y="432" font-size="10" fill="#666">• 不设物理过期时间</text>
<text x="345" y="447" font-size="10" fill="#666">• 添加逻辑过期字段</text>
<text x="345" y="462" font-size="10" fill="#666">• 过期后异步更新</text>
<text x="340" y="485" font-size="11" fill="#228b22">优点：</text>
<text x="345" y="500" font-size="10" fill="#666">• 高可用，无阻塞</text>
<text x="345" y="515" font-size="10" fill="#666">• 性能好</text>
<text x="345" y="530" font-size="10" fill="#666">• 用户体验佳</text>
<text x="340" y="553" font-size="11" fill="#dc143c">缺点：</text>
<text x="345" y="568" font-size="10" fill="#666">• 短暂数据不一致</text>
<text x="345" y="583" font-size="10" fill="#666">• 实现复杂</text>
<rect x="580" y="365" width="230" height="240" fill="#f3e5f5" stroke="#9c27b0" stroke-width="2" rx="5"/>
<text x="695" y="390" text-anchor="middle" font-size="14" font-weight="bold" fill="#7b1fa2">③ 提前更新</text>
<text x="590" y="415" font-size="11" fill="#333">原理：</text>
<text x="595" y="432" font-size="10" fill="#666">• 监控 key 的 TTL</text>
<text x="595" y="447" font-size="10" fill="#666">• 过期前主动刷新</text>
<text x="595" y="462" font-size="10" fill="#666">• 定时任务更新</text>
<text x="590" y="485" font-size="11" fill="#228b22">优点：</text>
<text x="595" y="500" font-size="10" fill="#666">• 避免过期</text>
<text x="595" y="515" font-size="10" fill="#666">• 数据一致</text>
<text x="590" y="553" font-size="11" fill="#dc143c">缺点：</text>
<text x="595" y="568" font-size="10" fill="#666">• 需要额外任务</text>
<text x="595" y="583" font-size="10" fill="#666">• 可能更新过于频繁</text>
</svg>

#### 解决方案详解

**方案一：互斥锁（Mutex Key）**

**原理：**
- 使用 Redis 的 SETNX 命令实现分布式锁
- 只有获得锁的线程才能查询数据库
- 其他线程等待或重试

**实现步骤：**
```java
public Product getProduct(Long productId) {
    String cacheKey = "product:" + productId;
    String lockKey = "lock:product:" + productId;

    // 1. 查询缓存
    Product product = redis.get(cacheKey);
    if (product != null) {
        return product;
    }

    // 2. 缓存未命中，尝试获取互斥锁
    String lockValue = UUID.randomUUID().toString();
    boolean getLock = redis.setNX(lockKey, lockValue, 10);  // 10秒超时

    if (getLock) {
        // 3. 获得锁，查询数据库
        try {
            // 双重检查：可能其他线程已经写入缓存
            product = redis.get(cacheKey);
            if (product != null) {
                return product;
            }

            // 查询数据库
            product = db.getProduct(productId);

            // 写入缓存
            if (product != null) {
                redis.setex(cacheKey, 3600, product);
            } else {
                redis.setex(cacheKey, 60, "NULL");  // 空值缓存
            }

            return product;
        } finally {
            // 4. 释放锁
            redis.del(lockKey, lockValue);  // 使用 Lua 脚本确保原子性
        }
    } else {
        // 5. 未获得锁，等待后重试
        Thread.sleep(50);
        return getProduct(productId);  // 递归重试
    }
}
```

**Lua 脚本安全释放锁：**
```lua
-- 只有持有锁的线程才能删除锁
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end
```

**优点：**
- 完全避免缓存击穿
- 实现相对简单
- 保证数据一致性

**缺点：**
- 未获得锁的线程需要等待，可能超时
- 会降低系统吞吐量
- 需要处理锁的超时和释放问题

**方案二：逻辑过期（永不过期）**

**原理：**
- 不设置 Redis 的 TTL
- 在缓存数据中添加逻辑过期时间字段
- 查询时检查逻辑过期时间
- 过期后异步更新，先返回旧数据

**实现步骤：**
```java
// 缓存数据结构
@Data
public class CacheData<T> {
    private T data;           // 实际数据
    private Long expireTime;  // 逻辑过期时间
}

public Product getProduct(Long productId) {
    String cacheKey = "product:" + productId;

    // 1. 查询缓存（永远不会过期）
    CacheData<Product> cacheData = redis.get(cacheKey);

    if (cacheData == null) {
        // 初次查询，需要加载数据
        return loadDataWithMutex(productId);
    }

    // 2. 检查逻辑过期时间
    if (cacheData.getExpireTime() > System.currentTimeMillis()) {
        // 未过期，直接返回
        return cacheData.getData();
    }

    // 3. 已过期，尝试获取锁
    String lockKey = "lock:product:" + productId;
    boolean getLock = redis.setNX(lockKey, "1", 10);

    if (getLock) {
        // 4. 获得锁，异步更新缓存
        threadPool.submit(() -> {
            try {
                Product product = db.getProduct(productId);
                CacheData<Product> newData = new CacheData<>();
                newData.setData(product);
                newData.setExpireTime(System.currentTimeMillis() + 3600000);
                redis.set(cacheKey, newData);  // 永不过期
            } finally {
                redis.del(lockKey);
            }
        });
    }

    // 5. 先返回旧数据
    return cacheData.getData();
}
```

**优点：**
- 高可用，不会阻塞请求
- 性能好，用户体验佳
- 避免缓存击穿

**缺点：**
- 短暂的数据不一致（返回旧数据）
- 实现较复杂
- 需要维护逻辑过期时间

**方案三：提前更新（双缓存）**

**原理：**
- 监控热点 key 的 TTL
- 在 key 过期前主动刷新
- 使用定时任务或缓存预热

**实现步骤：**
```java
// 方式1：读取时检查 TTL
public Product getProduct(Long productId) {
    String cacheKey = "product:" + productId;

    Product product = redis.get(cacheKey);
    if (product != null) {
        // 检查剩余 TTL
        long ttl = redis.ttl(cacheKey);
        if (ttl < 300) {  // 剩余时间小于 5 分钟
            // 异步刷新缓存
            threadPool.submit(() -> refreshCache(productId));
        }
        return product;
    }

    // 缓存不存在，正常加载
    return loadDataWithMutex(productId);
}

// 方式2：定时任务刷新热点数据
@Scheduled(fixedDelay = 60000)  // 每分钟执行一次
public void refreshHotKeys() {
    List<Long> hotProductIds = getHotProductIds();  // 获取热点商品ID

    for (Long productId : hotProductIds) {
        Product product = db.getProduct(productId);
        redis.setex("product:" + productId, 3600, product);
    }
}
```

**优点：**
- 完全避免 key 过期
- 数据始终保持最新
- 用户体验好

**缺点：**
- 需要额外的定时任务
- 可能更新过于频繁，浪费资源
- 需要识别热点 key

#### 三种方案对比

| 方案 | 实时性 | 性能 | 复杂度 | 推荐场景 |
|-----|-------|------|-------|---------|
| 互斥锁 | 高 | 中 | 低 | 数据一致性要求高 |
| 逻辑过期 | 中 | 高 | 高 | 高并发，可容忍短暂不一致 |
| 提前更新 | 高 | 高 | 中 | 已知热点数据 |

**关键要点：**

1. **缓存击穿的特点**：热点 key 过期，大量并发打到数据库
2. **与穿透的区别**：击穿是 key 存在但过期，穿透是 key 不存在
3. **互斥锁最常用**：实现简单，保证一致性
4. **逻辑过期适合高并发**：性能最好，但数据可能短暂不一致
5. **提前更新最优**：但需要识别热点 key
6. **锁的超时时间要合理**：避免死锁和超时
7. **双重检查必不可少**：防止重复查询数据库

**实际案例：**

```bash
# 场景：电商秒杀活动
商品: iPhone 15 Pro Max
并发: 10万 QPS
缓存过期: 正好在开抢时过期

# 使用互斥锁方案
第 1 个请求: 获得锁 → 查询 DB → 写缓存 → 释放锁
第 2-10万个请求: 等待 50ms → 重试 → 命中缓存 → 返回

# 效果
- 只有 1 次数据库查询
- 数据库压力可控
- 响应时间略增（50-100ms）
- 成功抗住 10万 QPS
```

**记忆口诀：**

> **"热点过期，大量击穿"**
> - 击穿特点：热点 key 过期，并发量大
> - 互斥锁：一个查库，其他等待
> - 逻辑过期：永不过期，逻辑判断
> - 提前更新：未到过期，主动刷新
> - 核心思想：减少并发查库


### 28. 什么是缓存雪崩？如何解决？

**核心答案**：缓存雪崩是指大量缓存key在同一时间失效，导致请求全部打到数据库，造成数据库压力骤增甚至宕机的现象。

**详细说明**：

缓存雪崩的两种典型场景：
1. **大量key同时过期**：大批量数据设置了相同的过期时间
2. **Redis服务宕机**：整个缓存服务不可用

**雪崩过程流程**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-avalanche" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#e74c3c"/>
    </marker>
  </defs>
  <rect x="50" y="50" width="120" height="60" fill="#3498db" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="110" y="85" text-anchor="middle" fill="white" font-size="14" font-weight="bold">应用服务器</text>
  <rect x="340" y="50" width="120" height="60" fill="#e74c3c" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="400" y="75" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Redis</text>
  <text x="400" y="95" text-anchor="middle" fill="white" font-size="12">(大量key失效)</text>
  <rect x="630" y="50" width="120" height="60" fill="#e67e22" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="690" y="75" text-anchor="middle" fill="white" font-size="14" font-weight="bold">MySQL</text>
  <text x="690" y="95" text-anchor="middle" fill="white" font-size="12">(压力骤增)</text>
  <line x1="170" y1="80" x2="330" y2="80" stroke="#34495e" stroke-width="2" marker-end="url(#arrowhead-avalanche)"/>
  <text x="250" y="70" text-anchor="middle" fill="#2c3e50" font-size="12">1. 查询缓存</text>
  <line x1="400" y1="110" x2="400" y2="140" stroke="#e74c3c" stroke-width="3"/>
  <line x1="380" y1="140" x2="420" y2="140" stroke="#e74c3c" stroke-width="3"/>
  <text x="400" y="165" text-anchor="middle" fill="#e74c3c" font-size="14" font-weight="bold">缓存未命中</text>
  <line x1="170" y1="90" x2="200" y2="180" stroke="#e74c3c" stroke-width="2"/>
  <line x1="200" y1="180" x2="620" y2="180" stroke="#e74c3c" stroke-width="2" marker-end="url(#arrowhead-avalanche)"/>
  <text x="410" y="170" text-anchor="middle" fill="#e74c3c" font-size="12">2. 大量请求直达DB</text>
  <rect x="550" y="230" width="280" height="80" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="690" y="255" text-anchor="middle" fill="#c0392b" font-size="13" font-weight="bold">雪崩效应</text>
  <text x="690" y="275" text-anchor="middle" fill="#e74c3c" font-size="11">• 数据库连接耗尽</text>
  <text x="690" y="293" text-anchor="middle" fill="#e74c3c" font-size="11">• 响应时间暴增</text>
  <line x1="690" y1="110" x2="690" y2="220" stroke="#e74c3c" stroke-width="3" marker-end="url(#arrowhead-avalanche)" stroke-dasharray="5,5"/>
  <circle cx="110" cy="320" r="8" fill="#e74c3c"/>
  <text x="130" y="325" fill="#2c3e50" font-size="12">请求峰值：10000 QPS</text>
  <circle cx="400" cy="320" r="8" fill="#e74c3c"/>
  <text x="420" y="325" fill="#2c3e50" font-size="12">缓存miss率：100%</text>
  <circle cx="690" cy="355" r="8" fill="#e74c3c"/>
  <text x="710" y="360" fill="#2c3e50" font-size="12">数据库负载：崩溃</text>
</svg>

**解决方案**：

| 方案 | 说明 | 优点 | 缺点 |
|------|------|------|------|
| **随机过期时间** | 在基础过期时间上增加随机值(如30min+random(5min)) | 简单有效，避免集中失效 | 无法完全避免 |
| **热点数据永不过期** | 关键数据设置为永久，通过后台更新 | 高可用性 | 需维护更新逻辑 |
| **多级缓存** | 本地缓存+Redis+数据库 | 多重保护 | 架构复杂 |
| **互斥锁** | 缓存失效时，只让一个线程查DB并重建缓存 | 减少DB压力 | 并发性能下降 |
| **限流降级** | 对数据库访问进行限流和熔断 | 保护数据库 | 部分请求失败 |
| **Redis高可用** | 主从+哨兵/集群，保证服务可用 | 避免服务雪崩 | 运维成本高 |

**实现示例（随机过期时间）**：

```java
// 设置随机过期时间，避免同时失效
public void setWithRandomExpire(String key, Object value, long baseTime) {
    // 基础过期时间 + 随机时间(0-300秒)
    long expire = baseTime + new Random().nextInt(300);
    redisTemplate.opsForValue().set(key, value, expire, TimeUnit.SECONDS);
}

// 互斥锁方案
public Object getData(String key) {
    Object data = redisTemplate.opsForValue().get(key);
    if (data == null) {
        String lockKey = "lock:" + key;
        // 尝试获取锁
        if (redisTemplate.opsForValue().setIfAbsent(lockKey, "1", 10, TimeUnit.SECONDS)) {
            try {
                // 再次检查缓存
                data = redisTemplate.opsForValue().get(key);
                if (data == null) {
                    // 查询数据库
                    data = getFromDB(key);
                    // 重建缓存（随机过期）
                    setWithRandomExpire(key, data, 1800);
                }
            } finally {
                redisTemplate.delete(lockKey);
            }
        } else {
            // 未获取到锁，等待后重试
            Thread.sleep(50);
            return getData(key);
        }
    }
    return data;
}
```

**关键要点**：
- 雪崩本质：大量缓存同时失效 → 流量全部冲击数据库
- 预防为主：随机过期时间 + 热点数据永不过期
- 应急措施：限流降级 + 互斥锁
- 架构保障：Redis高可用 + 多级缓存

**记忆口诀**：
> **"雪崩三板斧，随机锁限流"**
> - 随机：过期时间加随机值
> - 锁：互斥锁重建缓存
> - 限流：保护数据库
### 29. 什么是缓存预热？

**核心答案**：缓存预热是指在系统启动或流量到来之前，提前将热点数据加载到缓存中，避免冷启动时大量请求打到数据库。

**详细说明**：

**为什么需要预热**：
- **冷启动问题**：系统刚启动时，缓存为空，所有请求都会访问数据库
- **流量冲击**：高峰期突然到来，数据库可能承受不住压力
- **性能下降**：首次访问响应慢，影响用户体验

**预热时机场景**：

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-warmup" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#27ae60"/>
    </marker>
  </defs>
  <rect x="50" y="40" width="680" height="280" fill="#ecf9f2" stroke="#27ae60" stroke-width="2" rx="8"/>
  <text x="390" y="70" text-anchor="middle" fill="#27ae60" font-size="16" font-weight="bold">缓存预热生命周期</text>
  <rect x="80" y="100" width="150" height="70" fill="#3498db" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="155" y="125" text-anchor="middle" fill="white" font-size="13" font-weight="bold">系统启动</text>
  <text x="155" y="145" text-anchor="middle" fill="white" font-size="11">• 服务重启</text>
  <text x="155" y="160" text-anchor="middle" fill="white" font-size="11">• 版本发布</text>
  <rect x="280" y="100" width="150" height="70" fill="#27ae60" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="355" y="120" text-anchor="middle" fill="white" font-size="13" font-weight="bold">预热阶段</text>
  <text x="355" y="140" text-anchor="middle" fill="white" font-size="11">加载热点数据</text>
  <text x="355" y="160" text-anchor="middle" fill="white" font-size="11">预计算结果</text>
  <rect x="480" y="100" width="150" height="70" fill="#e67e22" stroke="#2c3e50" stroke-width="2" rx="5"/>
  <text x="555" y="125" text-anchor="middle" fill="white" font-size="13" font-weight="bold">正常服务</text>
  <text x="555" y="145" text-anchor="middle" fill="white" font-size="11">• 缓存命中高</text>
  <text x="555" y="160" text-anchor="middle" fill="white" font-size="11">• 性能稳定</text>
  <line x1="230" y1="135" x2="270" y2="135" stroke="#2c3e50" stroke-width="2" marker-end="url(#arrowhead-warmup)"/>
  <line x1="430" y1="135" x2="470" y2="135" stroke="#2c3e50" stroke-width="2" marker-end="url(#arrowhead-warmup)"/>
  <rect x="80" y="200" width="150" height="90" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="155" y="220" text-anchor="middle" fill="#c0392b" font-size="12" font-weight="bold">❌ 不预热</text>
  <text x="155" y="240" text-anchor="middle" fill="#e74c3c" font-size="10">缓存miss率: 100%</text>
  <text x="155" y="255" text-anchor="middle" fill="#e74c3c" font-size="10">数据库压力: 极高</text>
  <text x="155" y="270" text-anchor="middle" fill="#e74c3c" font-size="10">响应时间: 慢</text>
  <text x="155" y="285" text-anchor="middle" fill="#e74c3c" font-size="10">可能导致: 雪崩</text>
  <rect x="280" y="200" width="150" height="90" fill="#e6ffe6" stroke="#27ae60" stroke-width="2" rx="5"/>
  <text x="355" y="220" text-anchor="middle" fill="#27ae60" font-size="12" font-weight="bold">✓ 预热后</text>
  <text x="355" y="240" text-anchor="middle" fill="#27ae60" font-size="10">缓存miss率: 低</text>
  <text x="355" y="255" text-anchor="middle" fill="#27ae60" font-size="10">数据库压力: 正常</text>
  <text x="355" y="270" text-anchor="middle" fill="#27ae60" font-size="10">响应时间: 快</text>
  <text x="355" y="285" text-anchor="middle" fill="#27ae60" font-size="10">服务稳定</text>
  <rect x="480" y="200" width="220" height="90" fill="#fff9e6" stroke="#f39c12" stroke-width="2" rx="5"/>
  <text x="590" y="220" text-anchor="middle" fill="#d68910" font-size="12" font-weight="bold">典型预热场景</text>
  <text x="590" y="240" text-anchor="middle" fill="#e67e22" font-size="10">• 秒杀活动前</text>
  <text x="590" y="255" text-anchor="middle" fill="#e67e22" font-size="10">• 大促销前</text>
  <text x="590" y="270" text-anchor="middle" fill="#e67e22" font-size="10">• 热点新闻发布前</text>
  <text x="590" y="285" text-anchor="middle" fill="#e67e22" font-size="10">• 定时任务执行前</text>
</svg>

**预热方法对比**：

| 方法 | 适用场景 | 优点 | 缺点 |
|------|---------|------|------|
| **全量预热** | 数据量小，全部为热点 | 简单直接，覆盖全面 | 耗时长，资源消耗大 |
| **热点预热** | 热点数据明确（如Top100商品） | 快速高效，针对性强 | 需识别热点数据 |
| **定时预热** | 定期更新（如每日排行榜） | 自动化，保持新鲜度 | 需维护定时任务 |
| **懒加载预热** | 首次访问时触发 | 按需加载，节省资源 | 首次访问慢 |
| **渐进式预热** | 大数据量场景 | 分批加载，平稳启动 | 实现复杂 |

**实现示例**：

```java
@Component
public class CacheWarmUpService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductService productService;

    // 1. 启动时预热热点商品
    @PostConstruct
    public void warmUpHotProducts() {
        log.info("开始预热热点商品缓存...");

        // 查询热点商品ID列表（如销量Top100）
        List<Long> hotProductIds = productService.getHotProductIds(100);

        // 分批加载，避免数据库压力过大
        int batchSize = 10;
        for (int i = 0; i < hotProductIds.size(); i += batchSize) {
            List<Long> batch = hotProductIds.subList(i,
                Math.min(i + batchSize, hotProductIds.size()));

            // 批量查询数据库
            List<Product> products = productService.getByIds(batch);

            // 写入缓存
            products.forEach(product -> {
                String key = "product:" + product.getId();
                redisTemplate.opsForValue().set(key, product,
                    1800 + new Random().nextInt(300), TimeUnit.SECONDS);
            });

            // 控制预热速度，避免冲击数据库
            Thread.sleep(100);
        }

        log.info("热点商品缓存预热完成，共{}个商品", hotProductIds.size());
    }

    // 2. 定时预热（每天凌晨3点）
    @Scheduled(cron = "0 0 3 * * ?")
    public void scheduledWarmUp() {
        warmUpHotProducts();
    }

    // 3. 活动前预热
    public void warmUpForPromotion(Long promotionId) {
        // 获取活动商品列表
        List<Product> promotionProducts =
            productService.getPromotionProducts(promotionId);

        // 预热活动商品
        promotionProducts.forEach(product -> {
            String key = "product:" + product.getId();
            // 活动期间设置更长的过期时间
            redisTemplate.opsForValue().set(key, product,
                3600, TimeUnit.SECONDS);
        });

        log.info("活动商品预热完成，活动ID: {}", promotionId);
    }
}
```

**预热最佳实践**：
1. **分批加载**：避免一次性加载过多数据
2. **限流控制**：控制预热速度，防止数据库压力过大
3. **监控进度**：记录预热进度和成功率
4. **异常处理**：预热失败不应影响系统启动
5. **优先级排序**：优先预热最热点的数据
6. **健康检查**：预热完成后才对外提供服务

**关键要点**：
- 预热目的：避免冷启动，减少数据库压力
- 预热时机：系统启动、大促前、定时任务
- 预热策略：全量 vs 热点，同步 vs 异步
- 注意事项：分批加载、限流控制、异常处理

**记忆口诀**：
> **"预热三要素，热点分批控"**
> - 热点：优先预热热门数据
> - 分批：避免一次性加载过多
> - 控：控制速度和异常
### 30. 什么是缓存降级？

**核心答案**：缓存降级是指当系统压力过大或缓存服务出现故障时，暂时关闭部分非核心功能的缓存，或直接返回默认值/降级数据，以保证核心业务正常运行的一种保护策略。

**详细说明**：

**降级的核心思想**：牺牲次要功能，保证核心服务

**降级触发场景**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-degrade" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#e67e22"/>
    </marker>
  </defs>
  <rect x="50" y="30" width="700" height="340" fill="#fff9f0" stroke="#e67e22" stroke-width="2" rx="8"/>
  <text x="400" y="60" text-anchor="middle" fill="#d68910" font-size="16" font-weight="bold">缓存降级触发条件与策略</text>
  <rect x="80" y="90" width="200" height="120" fill="#e74c3c" stroke="#c0392b" stroke-width="2" rx="5"/>
  <text x="180" y="115" text-anchor="middle" fill="white" font-size="14" font-weight="bold">系统异常</text>
  <text x="180" y="140" text-anchor="middle" fill="white" font-size="11">• Redis宕机</text>
  <text x="180" y="158" text-anchor="middle" fill="white" font-size="11">• 缓存响应超时</text>
  <text x="180" y="176" text-anchor="middle" fill="white" font-size="11">• 网络故障</text>
  <text x="180" y="194" text-anchor="middle" fill="white" font-size="11">触发: 自动降级</text>
  <rect x="300" y="90" width="200" height="120" fill="#e67e22" stroke="#d68910" stroke-width="2" rx="5"/>
  <text x="400" y="115" text-anchor="middle" fill="white" font-size="14" font-weight="bold">性能压力</text>
  <text x="400" y="140" text-anchor="middle" fill="white" font-size="11">• 请求量暴增</text>
  <text x="400" y="158" text-anchor="middle" fill="white" font-size="11">• CPU/内存告警</text>
  <text x="400" y="176" text-anchor="middle" fill="white" font-size="11">• 响应时间过长</text>
  <text x="400" y="194" text-anchor="middle" fill="white" font-size="11">触发: 动态降级</text>
  <rect x="520" y="90" width="200" height="120" fill="#f39c12" stroke="#e67e22" stroke-width="2" rx="5"/>
  <text x="620" y="115" text-anchor="middle" fill="white" font-size="14" font-weight="bold">预期活动</text>
  <text x="620" y="140" text-anchor="middle" fill="white" font-size="11">• 大促活动</text>
  <text x="620" y="158" text-anchor="middle" fill="white" font-size="11">• 秒杀场景</text>
  <text x="620" y="176" text-anchor="middle" fill="white" font-size="11">• 流量高峰</text>
  <text x="620" y="194" text-anchor="middle" fill="white" font-size="11">触发: 人工降级</text>
  <line x1="180" y1="210" x2="180" y2="240" stroke="#e67e22" stroke-width="3" marker-end="url(#arrowhead-degrade)"/>
  <line x1="400" y1="210" x2="400" y2="240" stroke="#e67e22" stroke-width="3" marker-end="url(#arrowhead-degrade)"/>
  <line x1="620" y1="210" x2="620" y2="240" stroke="#e67e22" stroke-width="3" marker-end="url(#arrowhead-degrade)"/>
  <rect x="80" y="240" width="640" height="110" fill="#27ae60" stroke="#229954" stroke-width="2" rx="5"/>
  <text x="400" y="265" text-anchor="middle" fill="white" font-size="15" font-weight="bold">降级策略执行</text>
  <rect x="100" y="280" width="140" height="55" fill="#2ecc71" stroke="#27ae60" stroke-width="1" rx="3"/>
  <text x="170" y="300" text-anchor="middle" fill="white" font-size="11" font-weight="bold">返回默认值</text>
  <text x="170" y="318" text-anchor="middle" fill="white" font-size="9">返回固定内容</text>
  <text x="170" y="330" text-anchor="middle" fill="white" font-size="9">如: 空列表、0</text>
  <rect x="255" y="280" width="140" height="55" fill="#2ecc71" stroke="#27ae60" stroke-width="1" rx="3"/>
  <text x="325" y="300" text-anchor="middle" fill="white" font-size="11" font-weight="bold">返回降级数据</text>
  <text x="325" y="318" text-anchor="middle" fill="white" font-size="9">返回兜底数据</text>
  <text x="325" y="330" text-anchor="middle" fill="white" font-size="9">如: 静态推荐</text>
  <rect x="410" y="280" width="140" height="55" fill="#2ecc71" stroke="#27ae60" stroke-width="1" rx="3"/>
  <text x="480" y="300" text-anchor="middle" fill="white" font-size="11" font-weight="bold">关闭非核心</text>
  <text x="480" y="318" text-anchor="middle" fill="white" font-size="9">停止缓存更新</text>
  <text x="480" y="330" text-anchor="middle" fill="white" font-size="9">如: 评论、点赞</text>
  <rect x="565" y="280" width="140" height="55" fill="#2ecc71" stroke="#27ae60" stroke-width="1" rx="3"/>
  <text x="635" y="300" text-anchor="middle" fill="white" font-size="11" font-weight="bold">简化响应</text>
  <text x="635" y="318" text-anchor="middle" fill="white" font-size="9">减少字段</text>
  <text x="635" y="330" text-anchor="middle" fill="white" font-size="9">如: 仅返回必要</text>
</svg>

**降级层级策略**：

| 层级 | 业务类型 | 降级策略 | 示例 |
|------|---------|---------|------|
| **核心业务** | 不可降级 | 全力保障 | 登录、支付、下单 |
| **重要业务** | 部分降级 | 简化功能、返回缓存数据 | 商品详情(减少推荐)、购物车 |
| **一般业务** | 优先降级 | 返回默认值或降级数据 | 评论列表、浏览历史 |
| **次要业务** | 完全降级 | 直接关闭功能 | 猜你喜欢、相关推荐 |

**降级 vs 限流 vs 熔断对比**：

| 维度 | 降级 | 限流 | 熔断 |
|------|------|------|------|
| **目的** | 保证核心功能 | 控制流量 | 快速失败 |
| **触发** | 系统压力/故障 | 请求量超阈值 | 错误率超阈值 |
| **作用范围** | 功能级别 | 接口级别 | 服务级别 |
| **恢复方式** | 手动/自动恢复 | 流量下降后自动恢复 | 半开状态探测 |

**实现示例**：

```java
@Service
public class ProductService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    // 降级开关配置（可通过配置中心动态调整）
    @Value("${degrade.product.recommend:false}")
    private boolean degradeRecommend;

    @Value("${degrade.product.comment:false}")
    private boolean degradeComment;

    // 获取商品详情（核心业务，不降级）
    public ProductVO getProductDetail(Long productId) {
        // 1. 查询商品基本信息（必须保证）
        Product product = getProductFromCache(productId);

        ProductVO vo = new ProductVO();
        vo.setBasicInfo(product);

        // 2. 推荐商品（可降级）
        if (degradeRecommend) {
            // 降级：返回默认推荐或空列表
            vo.setRecommendList(getDefaultRecommendList());
        } else {
            vo.setRecommendList(getRecommendProducts(productId));
        }

        // 3. 评论列表（可降级）
        if (degradeComment) {
            // 降级：返回空评论或只返回缓存的热门评论
            vo.setComments(getCachedHotComments(productId));
        } else {
            vo.setComments(getComments(productId));
        }

        return vo;
    }

    // 带熔断降级的缓存查询
    @HystrixCommand(
        fallbackMethod = "getProductFallback",
        commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "1000"),
            @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "50")
        }
    )
    public Product getProductFromCache(Long productId) {
        try {
            // 尝试从缓存获取
            Product product = (Product) redisTemplate.opsForValue()
                .get("product:" + productId);

            if (product == null) {
                // 缓存未命中，查询数据库
                product = productMapper.selectById(productId);
                redisTemplate.opsForValue().set("product:" + productId,
                    product, 30, TimeUnit.MINUTES);
            }
            return product;
        } catch (Exception e) {
            // Redis异常，触发降级
            log.warn("Redis异常，降级查询数据库, productId: {}", productId, e);
            throw e; // 抛出异常触发Hystrix降级
        }
    }

    // 降级方法：缓存失败时直接查询数据库
    public Product getProductFallback(Long productId, Throwable e) {
        log.error("缓存降级，直接查询数据库, productId: {}", productId);
        return productMapper.selectById(productId);
    }

    // 默认推荐列表（降级数据）
    private List<Product> getDefaultRecommendList() {
        // 返回预设的热门商品或空列表
        return Collections.emptyList();
    }

    // 只返回缓存的热门评论（降级策略）
    private List<Comment> getCachedHotComments(Long productId) {
        try {
            return (List<Comment>) redisTemplate.opsForValue()
                .get("hot_comments:" + productId);
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}

// 降级配置管理
@Component
public class DegradeManager {

    @Autowired
    private ConfigService configService; // 配置中心

    // 动态调整降级开关
    public void updateDegradeSwitch(String key, boolean value) {
        configService.updateConfig(key, String.valueOf(value));
        log.info("降级开关更新: {} = {}", key, value);
    }

    // 监控指标，自动降级
    @Scheduled(fixedRate = 5000)
    public void autoDegrade() {
        // 获取系统指标
        double cpuUsage = SystemMonitor.getCpuUsage();
        long redisLatency = RedisMonitor.getAvgLatency();

        // CPU使用率超过80%，自动降级非核心功能
        if (cpuUsage > 0.8) {
            updateDegradeSwitch("degrade.product.recommend", true);
            updateDegradeSwitch("degrade.product.comment", true);
            log.warn("CPU使用率过高 {}%, 触发自动降级", cpuUsage * 100);
        }

        // Redis延迟超过100ms，降级
        if (redisLatency > 100) {
            updateDegradeSwitch("degrade.cache.all", true);
            log.warn("Redis延迟过高 {}ms, 触发缓存降级", redisLatency);
        }
    }
}
```

**降级最佳实践**：
1. **分级管理**：核心、重要、一般、次要业务分级
2. **开关控制**：可通过配置中心动态控制降级开关
3. **自动降级**：根据监控指标自动触发降级
4. **降级预案**：提前准备降级数据和策略
5. **快速恢复**：降级后能快速恢复正常服务
6. **监控告警**：降级后及时通知相关人员

**关键要点**：
- 降级本质：牺牲次要功能，保证核心服务
- 降级时机：系统异常、性能压力、预期高峰
- 降级策略：默认值、降级数据、关闭功能、简化响应
- 降级层级：核心不降、重要部分降、一般优先降、次要完全降

**记忆口诀**：
> **"降级保核心，分级开关控"**
> - 保：保证核心业务
> - 分级：业务分级管理
> - 开关控：动态开关控制
### 31. 如何保证缓存与数据库的数据一致性？

**核心答案**：缓存与数据库的一致性无法做到强一致，只能做到最终一致。常见策略包括：Cache Aside模式（旁路缓存）、Read/Write Through模式、Write Behind模式，实际应用中多采用"先更新数据库，再删除缓存"的方案，配合延迟双删、MQ异步补偿等机制。

**详细说明**：

**一致性问题根源**：缓存和数据库是两个独立系统，更新无法保证原子性

**常见的缓存更新策略对比**：

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-consistency" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#3498db"/>
    </marker>
    <marker id="arrowhead-error" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#e74c3c"/>
    </marker>
  </defs>
  <rect x="30" y="20" width="740" height="410" fill="#f8f9fa" stroke="#34495e" stroke-width="2" rx="8"/>
  <text x="400" y="50" text-anchor="middle" fill="#2c3e50" font-size="16" font-weight="bold">四种缓存更新策略对比</text>
  <rect x="60" y="80" width="160" height="330" fill="#e8f5e9" stroke="#27ae60" stroke-width="2" rx="5"/>
  <text x="140" y="105" text-anchor="middle" fill="#27ae60" font-size="13" font-weight="bold">① 先删缓存后更新DB</text>
  <rect x="75" y="115" width="130" height="45" fill="#fff" stroke="#27ae60" stroke-width="1" rx="3"/>
  <text x="140" y="133" text-anchor="middle" fill="#2c3e50" font-size="10">1. 删除缓存</text>
  <text x="140" y="148" text-anchor="middle" fill="#2c3e50" font-size="10">2. 更新数据库</text>
  <line x1="140" y1="160" x2="140" y2="175" stroke="#27ae60" stroke-width="2" marker-end="url(#arrowhead-consistency)"/>
  <rect x="75" y="175" width="130" height="55" fill="#fff9e6" stroke="#f39c12" stroke-width="1" rx="3"/>
  <text x="140" y="193" text-anchor="middle" fill="#d68910" font-size="10" font-weight="bold">问题场景</text>
  <text x="140" y="207" text-anchor="middle" fill="#e67e22" font-size="9">并发读取到旧数据</text>
  <text x="140" y="220" text-anchor="middle" fill="#e67e22" font-size="9">并写入缓存→脏数据</text>
  <rect x="75" y="240" width="130" height="75" fill="#e6f7ff" stroke="#3498db" stroke-width="1" rx="3"/>
  <text x="140" y="258" text-anchor="middle" fill="#2980b9" font-size="10" font-weight="bold">优点</text>
  <text x="140" y="272" text-anchor="middle" fill="#34495e" font-size="9">• 实现简单</text>
  <text x="140" y="285" text-anchor="middle" fill="#34495e" font-size="9">• 性能较好</text>
  <rect x="75" y="325" width="130" height="75" fill="#ffe6e6" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="140" y="343" text-anchor="middle" fill="#c0392b" font-size="10" font-weight="bold">缺点</text>
  <text x="140" y="357" text-anchor="middle" fill="#e74c3c" font-size="9">• 并发易产生脏数据</text>
  <text x="140" y="370" text-anchor="middle" fill="#e74c3c" font-size="9">• DB更新失败缓存空</text>
  <text x="140" y="383" text-anchor="middle" fill="#e74c3c" font-size="9">• 不推荐使用</text>
  <rect x="240" y="80" width="160" height="330" fill="#e8f8f5" stroke="#16a085" stroke-width="2" rx="5"/>
  <text x="320" y="105" text-anchor="middle" fill="#16a085" font-size="13" font-weight="bold">② 先更新DB后删缓存</text>
  <rect x="255" y="115" width="130" height="45" fill="#fff" stroke="#16a085" stroke-width="1" rx="3"/>
  <text x="320" y="133" text-anchor="middle" fill="#2c3e50" font-size="10">1. 更新数据库</text>
  <text x="320" y="148" text-anchor="middle" fill="#2c3e50" font-size="10">2. 删除缓存</text>
  <line x1="320" y1="160" x2="320" y2="175" stroke="#16a085" stroke-width="2" marker-end="url(#arrowhead-consistency)"/>
  <rect x="255" y="175" width="130" height="55" fill="#fff9e6" stroke="#f39c12" stroke-width="1" rx="3"/>
  <text x="320" y="193" text-anchor="middle" fill="#d68910" font-size="10" font-weight="bold">问题场景</text>
  <text x="320" y="207" text-anchor="middle" fill="#e67e22" font-size="9">删缓存失败→不一致</text>
  <text x="320" y="220" text-anchor="middle" fill="#e67e22" font-size="9">(极小概率)</text>
  <rect x="255" y="240" width="130" height="75" fill="#e6f7ff" stroke="#3498db" stroke-width="1" rx="3"/>
  <text x="320" y="258" text-anchor="middle" fill="#2980b9" font-size="10" font-weight="bold">优点</text>
  <text x="320" y="272" text-anchor="middle" fill="#34495e" font-size="9">• 不一致概率低</text>
  <text x="320" y="285" text-anchor="middle" fill="#34495e" font-size="9">• 性能好</text>
  <text x="320" y="298" text-anchor="middle" fill="#27ae60" font-size="9">• ✓ 推荐方案</text>
  <rect x="255" y="325" width="130" height="75" fill="#ffe6e6" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="320" y="343" text-anchor="middle" fill="#c0392b" font-size="10" font-weight="bold">缺点</text>
  <text x="320" y="357" text-anchor="middle" fill="#e74c3c" font-size="9">• 删缓存可能失败</text>
  <text x="320" y="370" text-anchor="middle" fill="#e74c3c" font-size="9">• 需补偿机制</text>
  <rect x="420" y="80" width="160" height="330" fill="#fef5e7" stroke="#d68910" stroke-width="2" rx="5"/>
  <text x="500" y="105" text-anchor="middle" fill="#d68910" font-size="13" font-weight="bold">③ 先更新DB后更新缓存</text>
  <rect x="435" y="115" width="130" height="45" fill="#fff" stroke="#d68910" stroke-width="1" rx="3"/>
  <text x="500" y="133" text-anchor="middle" fill="#2c3e50" font-size="10">1. 更新数据库</text>
  <text x="500" y="148" text-anchor="middle" fill="#2c3e50" font-size="10">2. 更新缓存</text>
  <line x1="500" y1="160" x2="500" y2="175" stroke="#d68910" stroke-width="2" marker-end="url(#arrowhead-consistency)"/>
  <rect x="435" y="175" width="130" height="55" fill="#ffe6e6" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="500" y="193" text-anchor="middle" fill="#c0392b" font-size="10" font-weight="bold">问题场景</text>
  <text x="500" y="207" text-anchor="middle" fill="#e74c3c" font-size="9">并发时顺序错乱</text>
  <text x="500" y="220" text-anchor="middle" fill="#e74c3c" font-size="9">→缓存是旧值</text>
  <rect x="435" y="240" width="130" height="75" fill="#e6f7ff" stroke="#3498db" stroke-width="1" rx="3"/>
  <text x="500" y="258" text-anchor="middle" fill="#2980b9" font-size="10" font-weight="bold">优点</text>
  <text x="500" y="272" text-anchor="middle" fill="#34495e" font-size="9">• 缓存一直有效</text>
  <text x="500" y="285" text-anchor="middle" fill="#34495e" font-size="9">• 读性能好</text>
  <rect x="435" y="325" width="130" height="75" fill="#ffe6e6" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="500" y="343" text-anchor="middle" fill="#c0392b" font-size="10" font-weight="bold">缺点</text>
  <text x="500" y="357" text-anchor="middle" fill="#e74c3c" font-size="9">• 并发易不一致</text>
  <text x="500" y="370" text-anchor="middle" fill="#e74c3c" font-size="9">• 浪费资源</text>
  <text x="500" y="383" text-anchor="middle" fill="#e74c3c" font-size="9">• 不推荐</text>
  <rect x="600" y="80" width="160" height="330" fill="#fdeef4" stroke="#8e44ad" stroke-width="2" rx="5"/>
  <text x="680" y="105" text-anchor="middle" fill="#8e44ad" font-size="13" font-weight="bold">④ 延迟双删</text>
  <rect x="615" y="115" width="130" height="60" fill="#fff" stroke="#8e44ad" stroke-width="1" rx="3"/>
  <text x="680" y="130" text-anchor="middle" fill="#2c3e50" font-size="10">1. 删除缓存</text>
  <text x="680" y="143" text-anchor="middle" fill="#2c3e50" font-size="10">2. 更新数据库</text>
  <text x="680" y="156" text-anchor="middle" fill="#2c3e50" font-size="10">3. 延迟后再删缓存</text>
  <text x="680" y="169" text-anchor="middle" fill="#8e44ad" font-size="9">(sleep 500ms)</text>
  <line x1="680" y1="175" x2="680" y2="190" stroke="#8e44ad" stroke-width="2" marker-end="url(#arrowhead-consistency)"/>
  <rect x="615" y="190" width="130" height="40" fill="#fff9e6" stroke="#f39c12" stroke-width="1" rx="3"/>
  <text x="680" y="207" text-anchor="middle" fill="#d68910" font-size="10" font-weight="bold">解决问题</text>
  <text x="680" y="221" text-anchor="middle" fill="#e67e22" font-size="9">消除脏数据</text>
  <rect x="615" y="240" width="130" height="75" fill="#e6f7ff" stroke="#3498db" stroke-width="1" rx="3"/>
  <text x="680" y="258" text-anchor="middle" fill="#2980b9" font-size="10" font-weight="bold">优点</text>
  <text x="680" y="272" text-anchor="middle" fill="#34495e" font-size="9">• 一致性更高</text>
  <text x="680" y="285" text-anchor="middle" fill="#34495e" font-size="9">• 适合读多写少</text>
  <rect x="615" y="325" width="130" height="75" fill="#ffe6e6" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="680" y="343" text-anchor="middle" fill="#c0392b" font-size="10" font-weight="bold">缺点</text>
  <text x="680" y="357" text-anchor="middle" fill="#e74c3c" font-size="9">• 延迟时间难确定</text>
  <text x="680" y="370" text-anchor="middle" fill="#e74c3c" font-size="9">• 影响吞吐量</text>
</svg>

**推荐方案：先更新数据库，后删除缓存 + 补偿机制**

| 组件 | 作用 | 实现方式 |
|------|------|---------|
| **主流程** | 先更新DB，后删缓存 | 同步操作 |
| **重试机制** | 删缓存失败时重试 | 消息队列异步重试 |
| **延迟双删** | 防止并发脏数据 | 延迟后再次删除 |
| **订阅binlog** | 最终一致性保障 | Canal监听MySQL binlog异步删缓存 |
| **设置过期时间** | 兜底方案 | 即使不一致，过期后也会恢复 |

**实现示例**：

```java
@Service
public class CacheConsistencyService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    // 方案1: 先更新DB，后删缓存（推荐）
    @Transactional
    public void updateProduct(Product product) {
        // 1. 更新数据库
        productMapper.updateById(product);

        // 2. 删除缓存
        String cacheKey = "product:" + product.getId();
        try {
            redisTemplate.delete(cacheKey);
        } catch (Exception e) {
            // 删除失败，发送MQ消息异步重试
            log.error("删除缓存失败，发送MQ重试, productId: {}", product.getId(), e);
            rabbitTemplate.convertAndSend("cache.delete.exchange",
                "cache.delete.key", cacheKey);
        }
    }

    // 方案2: 延迟双删（提高一致性）
    @Transactional
    public void updateProductWithDelayedDoubleDelete(Product product) {
        String cacheKey = "product:" + product.getId();

        // 1. 先删除缓存
        redisTemplate.delete(cacheKey);

        // 2. 更新数据库
        productMapper.updateById(product);

        // 3. 延迟后再次删除缓存
        CompletableFuture.runAsync(() -> {
            try {
                // 延迟500ms（根据业务读取数据库的平均时间调整）
                Thread.sleep(500);
                redisTemplate.delete(cacheKey);
            } catch (Exception e) {
                log.error("延迟删除缓存失败, productId: {}", product.getId(), e);
            }
        });
    }

    // MQ消费者：异步重试删除缓存
    @RabbitListener(queues = "cache.delete.queue")
    public void retryDeleteCache(String cacheKey) {
        int maxRetry = 3;
        for (int i = 0; i < maxRetry; i++) {
            try {
                redisTemplate.delete(cacheKey);
                log.info("异步删除缓存成功: {}, 重试次数: {}", cacheKey, i);
                return;
            } catch (Exception e) {
                log.warn("异步删除缓存失败: {}, 重试次数: {}", cacheKey, i, e);
                if (i == maxRetry - 1) {
                    // 多次重试失败，记录告警
                    log.error("异步删除缓存最终失败: {}", cacheKey);
                }
                try {
                    Thread.sleep(1000 * (i + 1)); // 递增延迟
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }

    // 方案3: 基于Canal监听binlog（终极方案）
    // Canal监听MySQL binlog，异步删除缓存
    @Component
    public class CanalBinlogListener {

        @Autowired
        private RedisTemplate<String, Object> redisTemplate;

        // Canal客户端监听product表的update事件
        public void onProductUpdate(CanalEntry.RowData rowData) {
            // 获取更新的商品ID
            Long productId = getProductIdFromRowData(rowData);

            // 删除缓存
            String cacheKey = "product:" + productId;
            try {
                redisTemplate.delete(cacheKey);
                log.info("Canal监听到product更新，删除缓存: {}", cacheKey);
            } catch (Exception e) {
                log.error("Canal删除缓存失败: {}", cacheKey, e);
                // 可以再次发送MQ重试
            }
        }
    }
}
```

**方案选型建议**：

| 场景 | 推荐方案 | 理由 |
|------|---------|------|
| **一般业务** | 先更新DB后删缓存 + 设置过期时间 | 简单高效，过期时间兜底 |
| **高一致性要求** | 延迟双删 + MQ异步补偿 | 多重保障 |
| **核心业务** | Canal binlog + MQ重试 + 过期时间 | 终极方案，多层保障 |
| **读多写少** | 延迟双删 | 减少脏数据概率 |
| **写多读少** | 先更新DB后删缓存 | 性能优先 |

**关键要点**：
- 一致性目标：强一致不可能，只能追求最终一致
- 推荐策略：先更新DB，后删缓存
- 补偿机制：MQ异步重试 + binlog监听
- 兜底方案：设置合理的过期时间
- 延迟双删：提高一致性，但影响性能

**记忆口诀**：
> **"先更库后删缓，消息队列来补偿，binlog监听保兜底，过期时间是保障"**
> - 先更库后删缓：推荐的主策略
> - 消息队列来补偿：删除失败时异步重试
> - binlog监听保兜底：Canal监听最终保障
> - 过期时间是保障：最后的兜底方案
### 32. 什么是双写一致性问题？

**核心答案**：双写一致性问题是指在更新数据时需要同时写缓存和数据库，由于两个系统的写操作无法保证原子性，可能因为并发、网络延迟、写入顺序等原因导致缓存和数据库的数据不一致。

**详细说明**：

**双写一致性的核心矛盾**：无法保证缓存和数据库的原子性更新

**双写一致性的四种典型问题场景**：

<svg viewBox="0 0 850 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-dual" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#e74c3c"/>
    </marker>
    <marker id="arrowhead-ok" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#27ae60"/>
    </marker>
  </defs>
  <rect x="20" y="20" width="810" height="460" fill="#fef9f3" stroke="#e67e22" stroke-width="2" rx="8"/>
  <text x="425" y="50" text-anchor="middle" fill="#d68910" font-size="16" font-weight="bold">双写一致性四大典型问题</text>
  <rect x="50" y="80" width="380" height="180" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="240" y="105" text-anchor="middle" fill="#c0392b" font-size="14" font-weight="bold">问题1: 先删缓存，后更新DB的并发问题</text>
  <rect x="70" y="120" width="160" height="130" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="150" y="138" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程A（写）</text>
  <text x="150" y="155" text-anchor="middle" fill="#34495e" font-size="10">t1: 删除缓存 ✓</text>
  <text x="150" y="175" text-anchor="middle" fill="#95a5a6" font-size="10">t2: (等待中...)</text>
  <text x="150" y="205" text-anchor="middle" fill="#95a5a6" font-size="10">t3: (等待中...)</text>
  <text x="150" y="235" text-anchor="middle" fill="#34495e" font-size="10">t4: 更新DB=新值 ✓</text>
  <rect x="250" y="120" width="160" height="130" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="330" y="138" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程B（读）</text>
  <text x="330" y="155" text-anchor="middle" fill="#95a5a6" font-size="10">t1: (未启动)</text>
  <text x="330" y="175" text-anchor="middle" fill="#e74c3c" font-size="10">t2: 读缓存miss</text>
  <text x="330" y="195" text-anchor="middle" fill="#e74c3c" font-size="10">t3: 查DB=旧值</text>
  <text x="330" y="215" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">写入缓存=旧值 ✗</text>
  <text x="330" y="235" text-anchor="middle" fill="#95a5a6" font-size="10">t4: (已完成)</text>
  <line x1="150" y1="155" x2="330" y2="175" stroke="#e74c3c" stroke-width="2" stroke-dasharray="3,3"/>
  <text x="240" y="165" text-anchor="middle" fill="#e74c3c" font-size="9">窗口期</text>
  <rect x="450" y="80" width="360" height="180" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="630" y="105" text-anchor="middle" fill="#c0392b" font-size="14" font-weight="bold">问题2: 先更新DB，后删缓存的并发问题</text>
  <rect x="470" y="120" width="160" height="130" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="550" y="138" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程A（读）</text>
  <text x="550" y="155" text-anchor="middle" fill="#e74c3c" font-size="10">t1: 读缓存miss</text>
  <text x="550" y="175" text-anchor="middle" fill="#e74c3c" font-size="10">t2: 查DB=旧值</text>
  <text x="550" y="195" text-anchor="middle" fill="#95a5a6" font-size="10">t3: (慢查询...)</text>
  <text x="550" y="225" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">t5: 写缓存=旧值 ✗</text>
  <rect x="650" y="120" width="140" height="130" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="720" y="138" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程B（写）</text>
  <text x="720" y="165" text-anchor="middle" fill="#95a5a6" font-size="10">t2: (未启动)</text>
  <text x="720" y="185" text-anchor="middle" fill="#34495e" font-size="10">t3: 更新DB新值</text>
  <text x="720" y="205" text-anchor="middle" fill="#34495e" font-size="10">t4: 删缓存 ✓</text>
  <text x="720" y="225" text-anchor="middle" fill="#95a5a6" font-size="10">t5: (已完成)</text>
  <line x1="550" y1="175" x2="720" y2="185" stroke="#e74c3c" stroke-width="2" stroke-dasharray="3,3"/>
  <text x="635" y="172" text-anchor="middle" fill="#e74c3c" font-size="9">窗口期</text>
  <rect x="50" y="280" width="380" height="190" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="240" y="305" text-anchor="middle" fill="#c0392b" font-size="14" font-weight="bold">问题3: 先更新DB，后更新缓存的顺序问题</text>
  <rect x="70" y="320" width="160" height="140" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="150" y="338" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程A（写value=1）</text>
  <text x="150" y="358" text-anchor="middle" fill="#34495e" font-size="10">t1: 更新DB=1 ✓</text>
  <text x="150" y="378" text-anchor="middle" fill="#95a5a6" font-size="10">t2: (网络延迟...)</text>
  <text x="150" y="398" text-anchor="middle" fill="#95a5a6" font-size="10">t3: (延迟中...)</text>
  <text x="150" y="428" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">t4: 更新缓存=1 ✗</text>
  <text x="150" y="448" text-anchor="middle" fill="#c0392b" font-size="9">(覆盖了value=2)</text>
  <rect x="250" y="320" width="160" height="140" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="330" y="338" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">线程B（写value=2）</text>
  <text x="330" y="358" text-anchor="middle" fill="#95a5a6" font-size="10">t1: (未启动)</text>
  <text x="330" y="378" text-anchor="middle" fill="#34495e" font-size="10">t2: 更新DB=2 ✓</text>
  <text x="330" y="398" text-anchor="middle" fill="#34495e" font-size="10">t3: 更新缓存=2 ✓</text>
  <text x="330" y="418" text-anchor="middle" fill="#95a5a6" font-size="10">t4: (已完成)</text>
  <text x="240" y="395" text-anchor="middle" fill="#e74c3c" font-size="10">结果: DB=2, Cache=1</text>
  <rect x="450" y="280" width="360" height="190" fill="#ffe6e6" stroke="#e74c3c" stroke-width="2" rx="5"/>
  <text x="630" y="305" text-anchor="middle" fill="#c0392b" font-size="14" font-weight="bold">问题4: 缓存或DB写入失败</text>
  <rect x="470" y="320" width="330" height="140" fill="#fff" stroke="#e74c3c" stroke-width="1" rx="3"/>
  <text x="635" y="345" text-anchor="middle" fill="#2c3e50" font-size="12" font-weight="bold">写入失败场景</text>
  <rect x="490" y="360" width="140" height="85" fill="#fff9e6" stroke="#f39c12" stroke-width="1" rx="3"/>
  <text x="560" y="378" text-anchor="middle" fill="#d68910" font-size="10" font-weight="bold">场景A</text>
  <text x="560" y="395" text-anchor="middle" fill="#e67e22" font-size="9">1. 更新DB成功 ✓</text>
  <text x="560" y="410" text-anchor="middle" fill="#e74c3c" font-size="9">2. 删缓存失败 ✗</text>
  <text x="560" y="425" text-anchor="middle" fill="#c0392b" font-size="9">→ 缓存是旧数据</text>
  <text x="560" y="437" text-anchor="middle" fill="#c0392b" font-size="8">(网络/Redis故障)</text>
  <rect x="650" y="360" width="140" height="85" fill="#fff9e6" stroke="#f39c12" stroke-width="1" rx="3"/>
  <text x="720" y="378" text-anchor="middle" fill="#d68910" font-size="10" font-weight="bold">场景B</text>
  <text x="720" y="395" text-anchor="middle" fill="#e74c3c" font-size="9">1. 更新缓存成功 ✓</text>
  <text x="720" y="410" text-anchor="middle" fill="#e74c3c" font-size="9">2. 更新DB失败 ✗</text>
  <text x="720" y="425" text-anchor="middle" fill="#c0392b" font-size="9">→ 数据不一致</text>
  <text x="720" y="437" text-anchor="middle" fill="#c0392b" font-size="8">(事务回滚)</text>
</svg>

**双写一致性问题分类**：

| 问题类型 | 原因 | 影响 | 解决方案 |
|---------|------|------|---------|
| **并发读写** | 删缓存后，并发读查到旧值并写缓存 | 缓存脏数据 | 延迟双删 |
| **并发写写** | 两个写操作顺序错乱 | 缓存与DB不一致 | 分布式锁、串行化 |
| **写入失败** | 删缓存/更新DB失败 | 不一致 | 重试机制、MQ补偿 |
| **网络延迟** | 更新顺序颠倒 | 脏数据 | 版本号、时间戳 |

**解决双写一致性的核心策略**：

**1. 推荐方案：先更新DB，后删缓存**
- 不一致概率最低（需要极端并发+慢查询）
- 配合重试机制和MQ补偿

**2. 延迟双删（解决并发读写问题）**
```
删除缓存 → 更新DB → 延迟N毫秒 → 再删除缓存
```

**3. 分布式锁（解决并发写写问题）**
```
获取锁 → 更新DB → 删除缓存 → 释放锁
```

**4. 订阅binlog（最终一致性保障）**
```
Canal监听MySQL binlog → 异步删除缓存
```

**实现示例**：

```java
@Service
public class DualWriteConsistencyService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private RedissonClient redissonClient;

    @Autowired
    private ProductMapper productMapper;

    // 解决方案1: 延迟双删（处理并发读写）
    @Transactional
    public void updateWithDelayedDoubleDelete(Product product) {
        String cacheKey = "product:" + product.getId();

        // 第一次删除缓存
        redisTemplate.delete(cacheKey);

        // 更新数据库
        productMapper.updateById(product);

        // 延迟后再次删除（清除并发读产生的脏数据）
        CompletableFuture.runAsync(() -> {
            try {
                Thread.sleep(500); // 延迟时间 > 业务读取DB的时间
                redisTemplate.delete(cacheKey);
            } catch (Exception e) {
                log.error("延迟双删失败", e);
            }
        });
    }

    // 解决方案2: 分布式锁（处理并发写写）
    @Transactional
    public void updateWithDistributedLock(Product product) {
        String lockKey = "lock:product:" + product.getId();
        RLock lock = redissonClient.getLock(lockKey);

        try {
            // 获取分布式锁，等待最多10秒，锁30秒后自动释放
            if (lock.tryLock(10, 30, TimeUnit.SECONDS)) {
                try {
                    // 更新数据库
                    productMapper.updateById(product);

                    // 删除缓存
                    String cacheKey = "product:" + product.getId();
                    redisTemplate.delete(cacheKey);
                } finally {
                    lock.unlock();
                }
            } else {
                throw new RuntimeException("获取锁失败");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("获取锁被中断", e);
        }
    }

    // 解决方案3: 版本号机制（处理写顺序问题）
    @Transactional
    public void updateWithVersion(Product product) {
        String cacheKey = "product:" + product.getId();
        String versionKey = "product:version:" + product.getId();

        // 更新数据库（乐观锁，version字段+1）
        int updated = productMapper.updateByIdWithVersion(product);
        if (updated == 0) {
            throw new RuntimeException("版本冲突，更新失败");
        }

        // 获取新版本号
        long newVersion = product.getVersion();

        // 使用Lua脚本，只有当版本号更大时才删除缓存
        String script =
            "local currentVersion = redis.call('GET', KEYS[1]) " +
            "if not currentVersion or tonumber(ARGV[1]) > tonumber(currentVersion) then " +
            "  redis.call('SET', KEYS[1], ARGV[1]) " +
            "  redis.call('DEL', KEYS[2]) " +
            "  return 1 " +
            "else " +
            "  return 0 " +
            "end";

        redisTemplate.execute(
            new DefaultRedisScript<>(script, Long.class),
            Arrays.asList(versionKey, cacheKey),
            String.valueOf(newVersion)
        );
    }

    // 解决方案4: 先更新DB后删缓存 + MQ重试（生产推荐）
    @Transactional
    public void updateWithMQRetry(Product product) {
        String cacheKey = "product:" + product.getId();

        try {
            // 1. 更新数据库
            productMapper.updateById(product);

            // 2. 发送删除缓存消息到MQ
            CacheDeleteMessage message = new CacheDeleteMessage();
            message.setCacheKey(cacheKey);
            message.setRetryCount(0);
            message.setMaxRetry(3);

            rabbitTemplate.convertAndSend(
                "cache.delete.exchange",
                "cache.delete.routing.key",
                message
            );

        } catch (Exception e) {
            // 数据库更新失败，事务回滚
            log.error("更新失败", e);
            throw e;
        }
    }

    // MQ消费者: 删除缓存并重试
    @RabbitListener(queues = "cache.delete.queue")
    public void deleteCache(CacheDeleteMessage message) {
        try {
            redisTemplate.delete(message.getCacheKey());
            log.info("删除缓存成功: {}", message.getCacheKey());
        } catch (Exception e) {
            // 删除失败，重试
            if (message.getRetryCount() < message.getMaxRetry()) {
                message.setRetryCount(message.getRetryCount() + 1);
                // 延迟后重新发送到MQ
                rabbitTemplate.convertAndSend(
                    "cache.delete.exchange",
                    "cache.delete.routing.key",
                    message,
                    msg -> {
                        msg.getMessageProperties().setDelay(
                            1000 * message.getRetryCount()
                        );
                        return msg;
                    }
                );
            } else {
                log.error("删除缓存最终失败: {}", message.getCacheKey());
            }
        }
    }
}
```

**方案对比与选型**：

| 方案 | 一致性 | 性能 | 复杂度 | 适用场景 |
|------|--------|------|--------|---------|
| **先更新DB后删缓存** | ★★★☆☆ | ★★★★★ | ★☆☆☆☆ | 一般业务 |
| **延迟双删** | ★★★★☆ | ★★★☆☆ | ★★☆☆☆ | 读多写少 |
| **分布式锁** | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | 并发写多 |
| **版本号机制** | ★★★★☆ | ★★★★☆ | ★★★☆☆ | 需要顺序保证 |
| **Canal binlog** | ★★★★★ | ★★★★☆ | ★★★★☆ | 核心业务 |

**关键要点**：
- 双写本质：缓存和数据库两个系统无法原子更新
- 核心矛盾：一致性 vs 性能 vs 复杂度的权衡
- 推荐策略：先更新DB后删缓存 + MQ重试
- 高级方案：延迟双删 + 分布式锁 + binlog监听
- 兜底保障：设置合理的缓存过期时间

**记忆口诀**：
> **"双写难一致，策略分场景，先库后删缓，延迟锁版本"**
> - 双写难一致：双写天然存在一致性问题
> - 策略分场景：根据业务场景选择方案
> - 先库后删缓：推荐的基础策略
> - 延迟锁版本：三种增强方案
