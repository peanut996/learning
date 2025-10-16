## 锁

### 20. 什么是乐观锁和悲观锁？

**定义：**

**悲观锁（Pessimistic Lock）：**
- 假设会发生并发冲突，每次访问数据都会加锁
- **先取锁，再访问**
- 适用于写操作频繁的场景

**乐观锁（Optimistic Lock）：**
- 假设不会发生并发冲突，访问数据时不加锁
- **先修改，提交时检查是否冲突**
- 适用于读操作频繁的场景

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">悲观锁 vs 乐观锁</text>
<rect x="10" y="45" width="330" height="180" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="100" y="70" class="title" fill="#d32f2f">悲观锁 (Pessimistic)</text>
<text x="20" y="95" class="code">核心: 先加锁,再操作</text>
<rect x="30" y="105" width="280" height="30" fill="#ffcdd2" stroke="#d32f2f" stroke-width="1.5"/>
<text x="40" y="125" class="code">1. 获取锁 (阻塞等待)</text>
<line x1="170" y1="135" x2="170" y2="145" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow12)"/>
<rect x="30" y="145" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="40" y="165" class="code">2. 读取/修改数据</text>
<line x1="170" y1="175" x2="170" y2="185" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrow12)"/>
<rect x="30" y="185" width="280" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<text x="40" y="205" class="code">3. 释放锁</text>
<rect x="360" y="45" width="330" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="450" y="70" class="title" fill="#388e3c">乐观锁 (Optimistic)</text>
<text x="370" y="95" class="code">核心: 先操作,提交时检查</text>
<rect x="380" y="105" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="390" y="125" class="code">1. 读取数据 + 版本号</text>
<line x1="520" y1="135" x2="520" y2="145" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green6)"/>
<rect x="380" y="145" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="390" y="165" class="code">2. 修改数据 (不加锁)</text>
<line x1="520" y1="175" x2="520" y2="185" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green6)"/>
<rect x="380" y="185" width="280" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1.5"/>
<text x="390" y="205" class="code">3. CAS提交 (检查版本号)</text>
<rect x="10" y="240" width="330" height="200" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="260" class="title">悲观锁实现</text>
<text x="20" y="285" class="code" fill="#d32f2f">1. synchronized</text>
<text x="20" y="305" class="code" style="fill:#000;">synchronized(lock) {</text>
<text x="30" y="320" class="code" style="fill:#000;">  // 操作数据</text>
<text x="20" y="335" class="code" style="fill:#000;">}</text>
<text x="20" y="360" class="code" fill="#d32f2f">2. ReentrantLock</text>
<text x="20" y="380" class="code" style="fill:#000;">lock.lock();</text>
<text x="20" y="395" class="code" style="fill:#000;">try { /* 操作 */ }</text>
<text x="20" y="410" class="code" style="fill:#000;">finally { lock.unlock(); }</text>
<text x="20" y="430" class="code" fill="#d32f2f">3. 数据库悲观锁</text>
<rect x="350" y="240" width="340" height="200" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="360" y="260" class="title">乐观锁实现</text>
<text x="360" y="285" class="code" fill="#388e3c">1. CAS (AtomicInteger)</text>
<text x="360" y="305" class="code" style="fill:#000;">AtomicInteger count = new AtomicInteger(0);</text>
<text x="360" y="320" class="code" style="fill:#388e3c;">count.incrementAndGet(); // CAS</text>
<text x="360" y="345" class="code" fill="#388e3c">2. 版本号机制</text>
<text x="360" y="365" class="code" style="fill:#000;">UPDATE table SET value=2, version=version+1</text>
<text x="360" y="380" class="code" style="fill:#000;">WHERE id=1 AND version=1;</text>
<text x="360" y="405" class="code" fill="#388e3c">3. 时间戳</text>
<text x="360" y="425" class="code" style="fill:#000;">WHERE id=1 AND update_time='2024-01-01'</text>
<defs>
<marker id="arrow12" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#d32f2f"/></marker>
<marker id="arrow-green6" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#388e3c"/></marker>
</defs>
</svg>

**对比总结：**

| 特性 | 悲观锁 | 乐观锁 |
|------|--------|--------|
| **假设** | 会发生冲突 | 不会发生冲突 |
| **策略** | 先加锁再访问 | 先访问再检查 |
| **阻塞** | 会阻塞 | 不阻塞 |
| **性能** | 高并发下性能差 | 高并发下性能好 |
| **适用** | 写多读少 | 读多写少 |
| **实现** | synchronized、Lock | CAS、版本号 |

**使用场景：**

**悲观锁适用：**
- 写操作频繁，冲突概率高
- 数据一致性要求严格
- 例如：银行转账、库存扣减

**乐观锁适用：**
- 读操作频繁，冲突概率低
- 对响应时间要求高
- 例如：缓存更新、统计计数

**记忆要点：**
- **悲观先锁** —— 假设冲突，先加锁
- **乐观后检** —— 假设无冲突，提交时检查
- **写多用悲观** —— 读多用乐观
- **CAS 是乐观锁** —— synchronized 是悲观锁

### 21. 什么是公平锁和非公平锁？

**定义：**

**公平锁（Fair Lock）：**
- 按照线程请求锁的顺序获取锁（FIFO）
- **先来先得**
- 等待时间最长的线程优先获取锁

**非公平锁（Nonfair Lock）：**
- 不保证线程获取锁的顺序
- **抢占式**
- 可能导致某些线程长期得不到锁（饥饿）

<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">公平锁 vs 非公平锁</text>
<rect x="10" y="45" width="330" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="110" y="70" class="title" fill="#1976d2">公平锁 (Fair)</text>
<text x="20" y="90" class="code">核心: FIFO 队列,先来先得</text>
<rect x="30" y="105" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="50" y="125" class="label">持有锁</text>
<rect x="30" y="145" width="80" height="20" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="45" y="160" class="code">线程A</text>
<line x1="70" y1="165" x2="70" y2="175" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow13)"/>
<rect x="30" y="175" width="80" height="20" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="45" y="190" class="code">线程B</text>
<line x1="70" y1="195" x2="70" y2="205" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow13)"/>
<rect x="30" y="205" width="80" height="20" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="45" y="220" class="code">线程C</text>
<text x="120" y="170" class="code" fill="#388e3c">✓ 顺序获取</text>
<text x="120" y="190" class="code" fill="#388e3c">✓ 无饥饿</text>
<text x="120" y="210" class="code" fill="#d32f2f">✗ 吞吐量低</text>
<rect x="360" y="45" width="330" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="440" y="70" class="title" fill="#f57c00">非公平锁 (Nonfair)</text>
<text x="370" y="90" class="code">核心: 抢占式,可能插队</text>
<rect x="380" y="105" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="400" y="125" class="label">持有锁</text>
<rect x="380" y="145" width="80" height="20" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="395" y="160" class="code">线程A</text>
<rect x="380" y="175" width="80" height="20" fill="#fff3e0" stroke="#f57c00" stroke-width="1.5"/>
<text x="395" y="190" class="code">线程B</text>
<rect x="500" y="105" width="80" height="30" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="515" y="125" class="code">新线程D</text>
<line x1="500" y1="120" x2="460" y2="120" stroke="#d32f2f" stroke-width="3" marker-end="url(#arrow-red4)" stroke-dasharray="5,5"/>
<text x="470" y="110" class="code" fill="#d32f2f">插队!</text>
<text x="485" y="160" class="code" fill="#388e3c">✓ 吞吐量高</text>
<text x="485" y="180" class="code" fill="#d32f2f">✗ 可能饥饿</text>
<rect x="10" y="240" width="330" height="170" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="260" class="title">公平锁示例</text>
<text x="20" y="280" class="code" style="fill:#1976d2;">// ReentrantLock 公平锁</text>
<text x="20" y="300" class="code" style="fill:#000;">Lock lock = new ReentrantLock(true); // true=公平</text>
<text x="20" y="325" class="code" style="fill:#000;">特点:</text>
<text x="30" y="345" class="code">• 线程按申请顺序获取锁</text>
<text x="30" y="365" class="code">• 避免线程饥饿</text>
<text x="30" y="385" class="code">• 需要维护队列,性能略低</text>
<rect x="350" y="240" width="340" height="170" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="360" y="260" class="title">非公平锁示例</text>
<text x="360" y="280" class="code" style="fill:#f57c00;">// ReentrantLock 非公平锁 (默认)</text>
<text x="360" y="300" class="code" style="fill:#000;">Lock lock = new ReentrantLock(); // 默认非公平</text>
<text x="360" y="320" class="code" style="fill:#000;">Lock lock = new ReentrantLock(false); // 显式非公平</text>
<text x="360" y="345" class="code" style="fill:#000;">特点:</text>
<text x="370" y="365" class="code">• 新线程可能直接获取锁</text>
<text x="370" y="385" class="code">• 吞吐量更高</text>
<text x="370" y="405" class="code">• 可能导致线程饥饿</text>
<defs>
<marker id="arrow13" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
<marker id="arrow-red4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#d32f2f"/></marker>
</defs>
</svg>

**实现对比：**

```java
// 1. ReentrantLock - 可选公平/非公平
Lock fairLock = new ReentrantLock(true);     // 公平锁
Lock unfairLock = new ReentrantLock(false);  // 非公平锁（默认）

// 2. synchronized - 非公平锁
synchronized(lock) {
    // 始终是非公平的
}

// 3. ReentrantReadWriteLock - 可选公平/非公平
ReadWriteLock rwLock = new ReentrantReadWriteLock(true); // 公平
```

**性能对比：**

| 指标 | 公平锁 | 非公平锁 |
|------|--------|----------|
| **吞吐量** | 低 | 高 |
| **响应时间** | 稳定 | 不稳定 |
| **饥饿风险** | 无 | 有 |
| **线程切换** | 多 | 少 |

**为什么非公平锁性能更好？**

1. **减少线程切换**：
   - 公平锁：必须唤醒队首线程（可能刚被挂起）
   - 非公平锁：新线程可直接获取锁，避免挂起/唤醒开销

2. **更好的 CPU 缓存利用**：
   - 刚释放锁的线程的数据还在 CPU 缓存中
   - 新线程立即获取锁，可利用热缓存

**使用建议：**

**使用公平锁：**
- 需要严格按顺序处理
- 避免线程饥饿
- 对响应时间稳定性要求高

**使用非公平锁（默认）：**
- 追求高吞吐量
- 允许一定的不公平性
- 大多数场景

**记忆要点：**
- **公平 FIFO** —— 先来先得，队列排队
- **非公平抢占** —— 新线程可插队
- **公平慢但稳** —— 非公平快但可能饥饿
- **默认非公平** —— ReentrantLock 默认非公平

### 22. 什么是共享锁和独占锁？

**定义：**

**独占锁（Exclusive Lock）：**
- 也叫**排他锁、写锁**
- 同一时刻只能有一个线程持有锁
- 其他线程必须等待
- 例如：synchronized、ReentrantLock

**共享锁（Shared Lock）：**
- 也叫**读锁**
- 同一时刻可以被多个线程同时持有
- 适用于读多写少的场景
- 例如：ReentrantReadWriteLock 的读锁

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">独占锁 vs 共享锁</text>
<rect x="10" y="45" width="330" height="180" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="100" y="70" class="title" fill="#d32f2f">独占锁 (Exclusive)</text>
<text x="20" y="90" class="code">核心: 同时只有一个线程持有</text>
<rect x="120" y="105" width="100" height="40" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="145" y="130" class="label">线程A</text>
<text x="130" y="145" class="code" fill="#d32f2f">持有锁</text>
<rect x="40" y="155" width="80" height="30" fill="#e0e0e0" stroke="#666" stroke-width="1.5"/>
<text x="55" y="175" class="code">线程B</text>
<text x="50" y="190" class="code" fill="#666">阻塞</text>
<rect x="200" y="155" width="80" height="30" fill="#e0e0e0" stroke="#666" stroke-width="1.5"/>
<text x="215" y="175" class="code">线程C</text>
<text x="210" y="190" class="code" fill="#666">阻塞</text>
<text x="20" y="215" class="code" fill="#d32f2f">✗ 读读互斥 ✗ 读写互斥 ✗ 写写互斥</text>
<rect x="360" y="45" width="330" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="460" y="70" class="title" fill="#388e3c">共享锁 (Shared)</text>
<text x="370" y="90" class="code">核心: 多个线程可同时持有 (读)</text>
<rect x="380" y="105" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="395" y="125" class="code">线程A 读</text>
<rect x="470" y="105" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="485" y="125" class="code">线程B 读</text>
<rect x="560" y="105" width="80" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="575" y="125" class="code">线程C 读</text>
<text x="420" y="150" class="code" fill="#388e3c">同时持有读锁</text>
<rect x="450" y="165" width="100" height="40" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="475" y="190" class="label">线程D 写</text>
<text x="470" y="205" class="code" fill="#d32f2f">阻塞</text>
<text x="370" y="220" class="code" fill="#388e3c">✓ 读读共享 ✗ 读写互斥 ✗ 写写互斥</text>
<rect x="10" y="240" width="680" height="200" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="260" class="title">ReadWriteLock 示例</text>
<text x="20" y="280" class="code" style="fill:#000;">ReadWriteLock rwLock = new ReentrantReadWriteLock();</text>
<text x="20" y="295" class="code" style="fill:#000;">Lock readLock = rwLock.readLock();   // 共享锁</text>
<text x="20" y="310" class="code" style="fill:#000;">Lock writeLock = rwLock.writeLock(); // 独占锁</text>
<text x="20" y="335" class="code" style="fill:#388e3c;">// 读操作 - 可并发</text>
<text x="20" y="355" class="code" style="fill:#000;">readLock.lock();</text>
<text x="20" y="370" class="code" style="fill:#000;">try {</text>
<text x="30" y="385" class="code" style="fill:#388e3c;">  return data; // 多线程可同时读</text>
<text x="20" y="400" class="code" style="fill:#000;">} finally { readLock.unlock(); }</text>
<text x="360" y="335" class="code" style="fill:#d32f2f;">// 写操作 - 独占</text>
<text x="360" y="355" class="code" style="fill:#000;">writeLock.lock();</text>
<text x="360" y="370" class="code" style="fill:#000;">try {</text>
<text x="370" y="385" class="code" style="fill:#d32f2f;">  data = newValue; // 独占写</text>
<text x="360" y="400" class="code" style="fill:#000;">} finally { writeLock.unlock(); }</text>
<text x="360" y="425" class="code" style="fill:#666;">适用: 读多写少的场景</text>
</svg>

**锁的兼容性：**

|  | 读锁 | 写锁 |
|---|------|------|
| **读锁** | ✓ 兼容 | ✗ 互斥 |
| **写锁** | ✗ 互斥 | ✗ 互斥 |

**Java 实现：**

**1. ReentrantReadWriteLock**
```java
class Cache {
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
    private final Map<String, Object> cache = new HashMap<>();

    // 读操作 - 共享锁
    public Object get(String key) {
        rwLock.readLock().lock();
        try {
            return cache.get(key); // 多线程可同时读
        } finally {
            rwLock.readLock().unlock();
        }
    }

    // 写操作 - 独占锁
    public void put(String key, Object value) {
        rwLock.writeLock().lock();
        try {
            cache.put(key, value); // 独占写
        } finally {
            rwLock.writeLock().unlock();
        }
    }
}
```

**2. StampedLock（JDK 8+）**
```java
class Point {
    private final StampedLock sl = new StampedLock();
    private double x, y;

    // 乐观读
    double distanceFromOrigin() {
        long stamp = sl.tryOptimisticRead(); // 乐观读
        double currentX = x, currentY = y;
        if (!sl.validate(stamp)) { // 检查是否被写
            stamp = sl.readLock(); // 升级为悲观读
            try {
                currentX = x;
                currentY = y;
            } finally {
                sl.unlockRead(stamp);
            }
        }
        return Math.sqrt(currentX * currentX + currentY * currentY);
    }

    // 写锁
    void move(double deltaX, double deltaY) {
        long stamp = sl.writeLock();
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            sl.unlockWrite(stamp);
        }
    }
}
```

**性能对比：**

| 场景 | 独占锁 | 读写锁 |
|------|--------|--------|
| **读多写少** | 慢（读读也互斥） | 快（读读共享） |
| **写多读少** | 适中 | 慢（锁升级开销） |
| **读写均衡** | 适中 | 适中 |

**记忆要点：**
- **独占排他** —— 同时只有一个线程
- **共享并发** —— 多个线程可同时读
- **读读共享** —— 读写、写写互斥
- **读多用读写锁** —— 写多用独占锁

### 23. 什么是自旋锁？

**定义：**
自旋锁（Spin Lock）是指线程在获取锁失败时，不立即阻塞，而是**循环检查锁是否释放**，直到获取锁成功。

**核心思想：**
- 用 **CPU 时间换取阻塞/唤醒的开销**
- 适用于锁持有时间很短的场景
- 避免线程上下文切换

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">自旋锁 vs 阻塞锁</text>
<rect x="10" y="45" width="330" height="160" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="110" y="70" class="title" fill="#f57c00">自旋锁 (Spin Lock)</text>
<text x="20" y="90" class="code">核心: 循环检查,不阻塞</text>
<rect x="30" y="105" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="40" y="125" class="code">尝试获取锁</text>
<line x1="285" y1="120" x2="310" y2="120" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow14)"/>
<text x="290" y="115" class="code" fill="#d32f2f">失败</text>
<line x1="310" y1="120" x2="310" y2="150" stroke="#f57c00" stroke-width="2"/>
<line x1="310" y1="150" x2="25" y2="150" stroke="#f57c00" stroke-width="2"/>
<line x1="25" y1="150" x2="25" y2="120" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow-orange7)"/>
<text x="120" y="165" class="code" fill="#f57c00">循环重试 (自旋)</text>
<text x="20" y="190" class="code" fill="#388e3c">✓ 无上下文切换</text>
<text x="180" y="190" class="code" fill="#d32f2f">✗ CPU空转</text>
<rect x="360" y="45" width="330" height="160" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="450" y="70" class="title" fill="#1976d2">阻塞锁 (Blocking)</text>
<text x="370" y="90" class="code">核心: 获取失败则阻塞</text>
<rect x="380" y="105" width="280" height="30" fill="#fff" stroke="#666" stroke-width="1"/>
<text x="390" y="125" class="code">尝试获取锁</text>
<line x1="520" y1="135" x2="520" y2="145" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow-blue4)"/>
<text x="530" y="143" class="code" fill="#d32f2f">失败</text>
<rect x="380" y="145" width="280" height="30" fill="#e0e0e0" stroke="#666" stroke-width="1.5"/>
<text x="390" y="165" class="code">线程阻塞 (挂起)</text>
<text x="370" y="190" class="code" fill="#388e3c">✓ 不占CPU</text>
<text x="520" y="190" class="code" fill="#d32f2f">✗ 上下文切换</text>
<rect x="10" y="220" width="680" height="170" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="240" class="title">自旋锁实现</text>
<text x="20" y="260" class="code" style="fill:#f57c00;">// 简单自旋锁实现</text>
<text x="20" y="280" class="code" style="fill:#000;">class SpinLock {</text>
<text x="30" y="295" class="code" style="fill:#000;">  private AtomicReference<Thread> owner = new AtomicReference<>();</text>
<text x="30" y="315" class="code" style="fill:#000;">  public void lock() {</text>
<text x="40" y="330" class="code" style="fill:#000;">    Thread current = Thread.currentThread();</text>
<text x="40" y="345" class="code" style="fill:#f57c00;">    while (!owner.compareAndSet(null, current)) {</text>
<text x="50" y="360" class="code" style="fill:#f57c00;">      // 自旋等待 (空循环)</text>
<text x="40" y="375" class="code" style="fill:#000;">    }</text>
<text x="30" y="385" class="code" style="fill:#000;">  }</text>
<defs>
<marker id="arrow14" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
<marker id="arrow-orange7" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/></marker>
<marker id="arrow-blue4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
</defs>
</svg>

**自旋锁的优化：**

**1. 限制自旋次数**
```java
// 自适应自旋
int retries = 0;
while (!tryLock()) {
    if (++retries > MAX_RETRIES) {
        // 超过次数，改为阻塞
        park();
        break;
    }
}
```

**2. 自适应自旋（JDK 6+）**
- 根据上次自旋成功率动态调整自旋次数
- 上次成功 → 增加自旋次数
- 上次失败 → 减少自旋次数

**3. 退避策略**
```java
// 指数退避
int delay = 1;
while (!tryLock()) {
    Thread.sleep(delay);
    delay *= 2; // 逐渐增加等待时间
    if (delay > MAX_DELAY) delay = MAX_DELAY;
}
```

**Java 中的自旋锁：**

**1. synchronized 的轻量级锁**
- 使用 CAS 自旋获取锁
- 默认自旋 10 次（-XX:PreBlockSpin）
- 失败后升级为重量级锁

**2. AtomicXxx 的 CAS 循环**
```java
// AtomicInteger 的自旋
public final int incrementAndGet() {
    for (;;) { // 无限自旋
        int current = get();
        int next = current + 1;
        if (compareAndSet(current, next)) {
            return next; // 成功退出
        }
        // 失败继续自旋
    }
}
```

**优缺点：**

**优点：**
- **无线程切换开销**：避免用户态/内核态切换
- **响应快**：适合短临界区
- **简单**：实现简单

**缺点：**
- **CPU 空转**：浪费 CPU 资源
- **不公平**：可能导致饥饿
- **不适合长临界区**：自旋时间长

**使用场景：**

**适用：**
- 锁持有时间很短（微秒级）
- CPU 核心数多（单核自旋无意义）
- 锁竞争不激烈

**不适用：**
- 锁持有时间长
- 高竞争场景
- 单核 CPU

**记忆要点：**
- **自旋循环等** —— 不阻塞，用 CPU 换时间
- **适合短临界区** —— 锁持有时间短
- **限制自旋次数** —— 避免无限空转
- **轻量级锁用自旋** —— synchronized 优化之一

### 24. ReentrantLock 的实现原理？

**核心原理：**
ReentrantLock 基于 **AQS（AbstractQueuedSynchronizer）**实现，通过 CAS + 队列实现锁的获取和释放。

**关键组件：**

1. **AQS 的 state 字段**
   - state = 0：锁未被占用
   - state > 0：锁被占用，值为重入次数

2. **同步队列（CLH 队列）**
   - 等待锁的线程组成的双向链表
   - 公平锁按 FIFO 顺序获取

3. **独占模式**
   - 同一时刻只有一个线程持有锁

<svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">ReentrantLock 实现原理</text>
<rect x="10" y="45" width="680" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">AQS 同步队列 (CLH)</text>
<rect x="30" y="80" width="100" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="55" y="100" class="label">Head</text>
<text x="45" y="115" class="code">哨兵节点</text>
<line x1="130" y1="105" x2="160" y2="105" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow15)"/>
<rect x="160" y="80" width="100" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="180" y="100" class="label">Thread-1</text>
<text x="170" y="115" class="code">WAITING</text>
<line x1="260" y1="105" x2="290" y2="105" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow15)"/>
<rect x="290" y="80" width="100" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="310" y="100" class="label">Thread-2</text>
<text x="300" y="115" class="code">WAITING</text>
<line x1="390" y1="105" x2="420" y2="105" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow15)"/>
<rect x="420" y="80" width="100" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="440" y="100" class="label">Thread-3</text>
<text x="430" y="115" class="code">WAITING</text>
<line x1="520" y1="105" x2="550" y2="105" stroke="#1976d2" stroke-width="2" marker-end="url(#arrow15)"/>
<rect x="550" y="80" width="100" height="50" fill="#e0e0e0" stroke="#666" stroke-width="1"/>
<text x="580" y="110" class="label">Tail</text>
<text x="30" y="155" class="code">持有锁的线程: Thread-0 (state=1)</text>
<text x="30" y="175" class="code">等待队列: 按顺序唤醒</text>
<text x="30" y="195" class="code" fill="#1976d2">公平锁: 严格按队列顺序</text>
<text x="30" y="215" class="code" fill="#f57c00">非公平锁: 新线程可插队</text>
<rect x="10" y="260" width="330" height="250" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="280" class="title">加锁流程 lock()</text>
<text x="20" y="305" class="code" style="fill:#388e3c;">1. CAS 尝试获取锁</text>
<text x="30" y="325" class="code">if (CAS(state, 0, 1)) {</text>
<text x="40" y="340" class="code">  setOwner(currentThread);</text>
<text x="40" y="355" class="code">  return; // 成功</text>
<text x="30" y="370" class="code">}</text>
<text x="20" y="395" class="code" style="fill:#f57c00;">2. 已持有锁 - 重入</text>
<text x="30" y="415" class="code">if (owner == currentThread) {</text>
<text x="40" y="430" class="code">  state++; // 重入计数</text>
<text x="40" y="445" class="code">  return;</text>
<text x="30" y="460" class="code">}</text>
<text x="20" y="485" class="code" style="fill:#d32f2f;">3. 加入等待队列</text>
<text x="30" y="505" class="code">enqueue() + park(); // 阻塞</text>
<rect x="350" y="260" width="340" height="250" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="360" y="280" class="title">释放锁流程 unlock()</text>
<text x="360" y="305" class="code" style="fill:#388e3c;">1. 减少重入计数</text>
<text x="370" y="325" class="code">int c = state - 1;</text>
<text x="370" y="340" class="code">if (owner != currentThread) {</text>
<text x="380" y="355" class="code">  throw new IllegalMonitorStateException();</text>
<text x="370" y="370" class="code">}</text>
<text x="360" y="395" class="code" style="fill:#1976d2;">2. 完全释放锁</text>
<text x="370" y="415" class="code">if (c == 0) {</text>
<text x="380" y="430" class="code">  setOwner(null);</text>
<text x="380" y="445" class="code">  state = 0;</text>
<text x="380" y="460" class="code" fill="#388e3c">  unparkSuccessor(); // 唤醒后继</text>
<text x="370" y="475" class="code">}</text>
<text x="360" y="500" class="code" style="fill:#666;">state > 0 时不释放,继续持有</text>
<defs>
<marker id="arrow15" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/></marker>
</defs>
</svg>

**核心源码分析：**

```java
public class ReentrantLock {
    private final Sync sync;

    // 内部类 - 基于 AQS
    abstract static class Sync extends AbstractQueuedSynchronizer {
        // 加锁
        final boolean tryAcquire(int acquires) {
            Thread current = Thread.currentThread();
            int c = getState();

            // 1. 锁未被占用
            if (c == 0) {
                // 公平锁: 检查队列是否有人等待
                // 非公平锁: 直接 CAS
                if (compareAndSetState(0, acquires)) {
                    setExclusiveOwnerThread(current);
                    return true;
                }
            }
            // 2. 重入
            else if (current == getExclusiveOwnerThread()) {
                int nextc = c + acquires;
                setState(nextc);
                return true;
            }
            return false;
        }

        // 释放锁
        protected final boolean tryRelease(int releases) {
            int c = getState() - releases;
            if (Thread.currentThread() != getExclusiveOwnerThread())
                throw new IllegalMonitorStateException();

            boolean free = false;
            if (c == 0) {
                free = true;
                setExclusiveOwnerThread(null);
            }
            setState(c);
            return free;
        }
    }

    // 公平锁实现
    static final class FairSync extends Sync {
        final boolean tryAcquire(int acquires) {
            if (hasQueuedPredecessors()) // 检查队列
                return false;
            // ... CAS 获取锁
        }
    }

    // 非公平锁实现
    static final class NonfairSync extends Sync {
        final boolean tryAcquire(int acquires) {
            // 直接 CAS，不检查队列
            return nonfairTryAcquire(acquires);
        }
    }
}
```

**公平锁 vs 非公平锁实现差异：**

| 特性 | 公平锁 | 非公平锁 |
|------|--------|----------|
| **获取锁** | 先检查队列 `hasQueuedPredecessors()` | 直接 CAS |
| **性能** | 较慢 | 较快 |
| **默认** | false | true |

**记忆要点：**
- **基于 AQS** —— state 表示重入次数
- **CLH 队列** —— 等待线程的双向链表
- **可重入** —— state 计数 +1/-1
- **公平/非公平** —— 是否检查队列

### 25. ReentrantReadWriteLock 的实现原理？

**核心原理：**
ReentrantReadWriteLock 使用**一个 int 型 state 字段**同时表示读锁和写锁的状态。

**state 的巧妙设计：**
- **高 16 位**：读锁持有次数
- **低 16 位**：写锁重入次数

<svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="180" y="25" class="title">ReentrantReadWriteLock 实现原理</text>
<rect x="10" y="45" width="680" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="20" y="65" class="title" fill="#1976d2">state 字段设计 (32位 int)</text>
<rect x="50" y="80" width="300" height="50" fill="#c8e6c9" stroke="#388e3c" stroke-width="2"/>
<text x="140" y="100" class="label">高 16 位</text>
<text x="120" y="120" class="code">读锁持有次数 (共享)</text>
<rect x="350" y="80" width="300" height="50" fill="#ffcdd2" stroke="#d32f2f" stroke-width="2"/>
<text x="440" y="100" class="label">低 16 位</text>
<text x="420" y="120" class="code">写锁重入次数 (独占)</text>
<text x="20" y="155" class="code">读锁数 = state >>> 16  |  写锁数 = state & 0xFFFF</text>
<rect x="10" y="180" width="330" height="290" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="200" class="title">读锁 (共享锁)</text>
<text x="20" y="225" class="code" style="fill:#388e3c;">获取读锁:</text>
<text x="30" y="245" class="code">1. 检查是否有写锁</text>
<text x="40" y="260" class="code">if (写锁被占用 && 持有者!=当前线程)</text>
<text x="50" y="275" class="code">  阻塞;</text>
<text x="30" y="295" class="code">2. CAS 增加读锁计数</text>
<text x="40" y="310" class="code">state += (1 << 16); // 高16位+1</text>
<text x="30" y="330" class="code">3. 记录线程重入次数</text>
<text x="40" y="345" class="code">ThreadLocal 记录当前线程读锁数</text>
<text x="20" y="370" class="code" style="fill:#1976d2;">释放读锁:</text>
<text x="30" y="390" class="code">1. 减少读锁计数</text>
<text x="40" y="405" class="code">state -= (1 << 16); // 高16位-1</text>
<text x="30" y="425" class="code">2. 最后一个读线程唤醒写线程</text>
<text x="40" y="440" class="code">if (读锁数 == 0)</text>
<text x="50" y="455" class="code">  unparkSuccessor(); // 唤醒写</text>
<rect x="350" y="180" width="340" height="290" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="360" y="200" class="title">写锁 (独占锁)</text>
<text x="360" y="225" class="code" style="fill:#d32f2f;">获取写锁:</text>
<text x="370" y="245" class="code">1. 检查读锁和写锁</text>
<text x="380" y="260" class="code">if (state != 0) { // 有锁</text>
<text x="390" y="275" class="code">  if (读锁数 > 0) 阻塞; // 有读</text>
<text x="390" y="290" class="code">  if (写锁被其他线程占用) 阻塞;</text>
<text x="380" y="305" class="code">}</text>
<text x="370" y="325" class="code">2. CAS 获取写锁</text>
<text x="380" y="340" class="code">state += 1; // 低16位+1</text>
<text x="370" y="360" class="code">3. 锁降级支持</text>
<text x="380" y="375" class="code">持有写锁时可获取读锁</text>
<text x="360" y="400" class="code" style="fill:#1976d2;">释放写锁:</text>
<text x="370" y="420" class="code">1. 减少写锁计数</text>
<text x="380" y="435" class="code">state -= 1; // 低16位-1</text>
<text x="370" y="455" class="code">2. 完全释放时唤醒等待线程</text>
</svg>

**核心源码分析：**

```java
abstract static class Sync extends AbstractQueuedSynchronizer {
    static final int SHARED_SHIFT   = 16;
    static final int SHARED_UNIT    = (1 << SHARED_SHIFT); // 0x10000
    static final int MAX_COUNT      = (1 << SHARED_SHIFT) - 1; // 0xFFFF
    static final int EXCLUSIVE_MASK = (1 << SHARED_SHIFT) - 1; // 0xFFFF

    // 读锁持有次数
    static int sharedCount(int c)    { return c >>> SHARED_SHIFT; }
    // 写锁持有次数
    static int exclusiveCount(int c) { return c & EXCLUSIVE_MASK; }

    // 获取写锁
    protected final boolean tryAcquire(int acquires) {
        Thread current = Thread.currentThread();
        int c = getState();
        int w = exclusiveCount(c); // 写锁数

        if (c != 0) {
            // 有读锁 或 写锁被其他线程占用
            if (w == 0 || current != getExclusiveOwnerThread())
                return false;
            // 写锁重入
            setState(c + acquires);
            return true;
        }
        // CAS 获取写锁
        if (compareAndSetState(c, c + acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
        return false;
    }

    // 获取读锁
    protected final int tryAcquireShared(int acquires) {
        Thread current = Thread.currentThread();
        int c = getState();

        // 写锁被其他线程占用
        if (exclusiveCount(c) != 0 &&
            getExclusiveOwnerThread() != current)
            return -1;

        int r = sharedCount(c);
        // CAS 增加读锁
        if (compareAndSetState(c, c + SHARED_UNIT)) {
            // 记录线程读锁重入次数（ThreadLocal）
            return 1;
        }
        return -1;
    }
}
```

**锁降级示例：**

```java
class CachedData {
    Object data;
    volatile boolean cacheValid;
    final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();

    void processCachedData() {
        rwl.readLock().lock();
        if (!cacheValid) {
            // 必须先释放读锁
            rwl.readLock().unlock();

            // 获取写锁
            rwl.writeLock().lock();
            try {
                if (!cacheValid) {
                    data = loadData();
                    cacheValid = true;
                }
                // 锁降级：持有写锁的同时获取读锁
                rwl.readLock().lock();
            } finally {
                rwl.writeLock().unlock(); // 释放写锁，保留读锁
            }
        }

        try {
            use(data);
        } finally {
            rwl.readLock().unlock();
        }
    }
}
```

**为什么支持锁降级，不支持锁升级？**

- **锁降级**（写→读）：✓ 支持
  - 持有写锁时，可以获取读锁
  - 保证数据一致性

- **锁升级**（读→写）：✗ 不支持
  - 会导致死锁
  - 多个读线程同时升级，互相等待

**记忆要点：**
- **state 分两半** —— 高 16 位读，低 16 位写
- **读共享写独占** —— 读读可并发
- **支持锁降级** —— 写→读，防止数据不一致
- **不支持锁升级** —— 读→写会死锁

### 26. StampedLock 是什么？

**定义：**
StampedLock 是 JDK 8 引入的高性能锁，提供三种锁模式：**写锁、悲观读锁、乐观读**。

**核心特性：**
- **乐观读（Optimistic Read）**：不加锁，读后验证
- **比 ReadWriteLock 更快**：读操作几乎无锁开销
- **不可重入**：与 ReentrantLock 不同

<svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
<defs><style>.title{font:bold 14px sans-serif;}.label{font:12px sans-serif;}.code{font:11px monospace;fill:#444;}</style></defs>
<text x="220" y="25" class="title">StampedLock 三种模式</text>
<rect x="10" y="45" width="220" height="150" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="70" y="70" class="title" fill="#d32f2f">写锁 (Write)</text>
<text x="20" y="95" class="code">独占锁</text>
<text x="20" y="115" class="code">与读锁互斥</text>
<text x="20" y="140" class="code" style="fill:#388e3c;">✓ 保证独占写</text>
<text x="20" y="160" class="code" style="fill:#d32f2f;">✗ 阻塞所有读</text>
<text x="20" y="180" class="code">stamp = lock.writeLock()</text>
<rect x="240" y="45" width="220" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="280" y="70" class="title" fill="#1976d2">悲观读 (Read)</text>
<text x="250" y="95" class="code">共享锁</text>
<text x="250" y="115" class="code">与写锁互斥</text>
<text x="250" y="140" class="code" style="fill:#388e3c;">✓ 读读并发</text>
<text x="250" y="160" class="code" style="fill:#d32f2f;">✗ 阻塞写</text>
<text x="250" y="180" class="code">stamp = lock.readLock()</text>
<rect x="470" y="45" width="220" height="150" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="500" y="70" class="title" fill="#388e3c">乐观读 (Optimistic)</text>
<text x="480" y="95" class="code">不加锁</text>
<text x="480" y="115" class="code">读后验证</text>
<text x="480" y="140" class="code" style="fill:#388e3c;">✓ 性能最高</text>
<text x="480" y="160" class="code" style="fill:#f57c00;">⚠ 需验证</text>
<text x="480" y="180" class="code">stamp = tryOptimisticRead()</text>
<rect x="10" y="210" width="680" height="280" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="20" y="230" class="title">使用示例</text>
<text x="20" y="255" class="code" style="fill:#000;">class Point {</text>
<text x="30" y="270" class="code" style="fill:#000;">  private final StampedLock sl = new StampedLock();</text>
<text x="30" y="285" class="code" style="fill:#000;">  private double x, y;</text>
<text x="30" y="310" class="code" style="fill:#388e3c;">  // 乐观读 - 高性能</text>
<text x="30" y="330" class="code" style="fill:#000;">  double distanceFromOrigin() {</text>
<text x="40" y="345" class="code" style="fill:#388e3c;">    long stamp = sl.tryOptimisticRead(); // 乐观读</text>
<text x="40" y="360" class="code" style="fill:#000;">    double currentX = x, currentY = y;</text>
<text x="40" y="375" class="code" style="fill:#f57c00;">    if (!sl.validate(stamp)) { // 验证</text>
<text x="50" y="390" class="code" style="fill:#1976d2;">      stamp = sl.readLock(); // 升级为悲观读</text>
<text x="50" y="405" class="code" style="fill:#000;">      try {</text>
<text x="60" y="420" class="code" style="fill:#000;">        currentX = x; currentY = y;</text>
<text x="50" y="435" class="code" style="fill:#000;">      } finally { sl.unlockRead(stamp); }</text>
<text x="40" y="450" class="code" style="fill:#000;">    }</text>
<text x="40" y="465" class="code" style="fill:#000;">    return Math.sqrt(currentX * currentX + currentY * currentY);</text>
<text x="30" y="480" class="code" style="fill:#000;">  }</text>
</svg>

**完整示例：**

```java
class Point {
    private final StampedLock sl = new StampedLock();
    private double x, y;

    // 乐观读
    double distanceFromOrigin() {
        long stamp = sl.tryOptimisticRead(); // 获取乐观读戳
        double currentX = x, currentY = y;    // 读取数据

        if (!sl.validate(stamp)) {            // 验证是否被写
            stamp = sl.readLock();            // 升级为悲观读
            try {
                currentX = x;
                currentY = y;
            } finally {
                sl.unlockRead(stamp);
            }
        }
        return Math.sqrt(currentX * currentX + currentY * currentY);
    }

    // 悲观读
    double[] read() {
        long stamp = sl.readLock();
        try {
            return new double[]{x, y};
        } finally {
            sl.unlockRead(stamp);
        }
    }

    // 写锁
    void move(double deltaX, double deltaY) {
        long stamp = sl.writeLock();
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            sl.unlockWrite(stamp);
        }
    }

    // 锁升级：悲观读 → 写
    void moveIfAtOrigin(double newX, double newY) {
        long stamp = sl.readLock();
        try {
            while (x == 0.0 && y == 0.0) {
                long ws = sl.tryConvertToWriteLock(stamp); // 尝试升级
                if (ws != 0L) {
                    stamp = ws;
                    x = newX;
                    y = newY;
                    break;
                } else {
                    sl.unlockRead(stamp);
                    stamp = sl.writeLock(); // 重新获取写锁
                }
            }
        } finally {
            sl.unlock(stamp);
        }
    }
}
```

**StampedLock vs ReadWriteLock：**

| 特性 | StampedLock | ReadWriteLock |
|------|-------------|---------------|
| **乐观读** | ✓ 支持 | ✗ 不支持 |
| **性能** | 更快 | 较慢 |
| **可重入** | ✗ 不支持 | ✓ 支持 |
| **Condition** | ✗ 不支持 | ✓ 支持 |
| **锁升级** | ✓ 支持 | ✗ 不支持 |

**注意事项：**

1. **不可重入**
```java
StampedLock lock = new StampedLock();
long stamp = lock.writeLock();
lock.writeLock(); // 死锁！不可重入
```

2. **不支持 Condition**
```java
// ✗ StampedLock 没有 newCondition()
```

3. **适用场景**
   - 读多写少
   - 读操作很快
   - 不需要可重入

**记忆要点：**
- **三种模式** —— 写锁、悲观读、乐观读
- **乐观读最快** —— 不加锁，读后验证
- **不可重入** —— 与 ReentrantLock 不同
- **读多写少** —— 性能优于 ReadWriteLock
