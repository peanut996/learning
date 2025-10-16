## 可见性

### 5. 什么是可见性问题？

**核心答案**：可见性问题是指一个线程修改了共享变量的值，其他线程无法立即看到这个修改。

**详细说明**：

**可见性问题的根本原因**：

1. **CPU 缓存机制**：每个 CPU 有自己的缓存（L1、L2、L3），线程读写变量时操作的是缓存副本
2. **工作内存隔离**：线程的工作内存中保存了变量副本，修改不会立即同步到主内存
3. **缓存一致性延迟**：即使有缓存一致性协议，同步也不是立即的

**经典可见性问题示例**：

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">可见性问题示例</text>
<rect x="50" y="50" width="700" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="60" y="75" font-family="monospace" font-size="11">boolean flag = false;  // 共享变量</text>
<text x="60" y="95" font-family="monospace" font-size="11">int number = 0;        // 共享变量</text>
<text x="60" y="130" font-family="monospace" font-size="11" fill="#666">// 线程 A 和线程 B 同时访问这些变量</text>
<rect x="50" y="170" width="350" height="280" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="200" y="195" text-anchor="middle" font-size="13" font-weight="bold">线程 A (写线程)</text>
<rect x="70" y="210" width="300" height="220" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="80" y="235" font-family="monospace" font-size="11">// 1. 修改 number</text>
<text x="80" y="255" font-family="monospace" font-size="11">number = 100;</text>
<text x="80" y="285" font-family="monospace" font-size="11">// 2. 修改 flag</text>
<text x="80" y="305" font-family="monospace" font-size="11">flag = true;</text>
<text x="80" y="340" font-size="10" fill="#388e3c" font-weight="bold">工作内存状态：</text>
<text x="80" y="360" font-size="10">number = 100 ✓</text>
<text x="80" y="380" font-size="10">flag = true ✓</text>
<text x="80" y="405" font-size="10" fill="#f57c00" font-weight="bold">⚠️ 但还未刷新到主内存！</text>
<rect x="420" y="170" width="350" height="280" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="595" y="195" text-anchor="middle" font-size="13" font-weight="bold">线程 B (读线程)</text>
<rect x="440" y="210" width="300" height="220" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="450" y="235" font-family="monospace" font-size="11">// 1. 检查 flag</text>
<text x="450" y="255" font-family="monospace" font-size="11">if (flag) {</text>
<text x="465" y="275" font-family="monospace" font-size="11">  // 2. 读取 number</text>
<text x="465" y="295" font-family="monospace" font-size="11">  int temp = number;</text>
<text x="450" y="315" font-family="monospace" font-size="11">}</text>
<text x="450" y="350" font-size="10" fill="#1976d2" font-weight="bold">工作内存状态：</text>
<text x="450" y="370" font-size="10">number = 0 ❌ (旧值)</text>
<text x="450" y="390" font-size="10">flag = false ❌ (旧值)</text>
<text x="450" y="415" font-size="10" fill="#d32f2f" font-weight="bold">⚠️ 看不到线程 A 的修改！</text>
<text x="50" y="475" font-size="12" font-weight="bold">可见性问题：</text>
<text x="50" y="495" font-size="11">线程 B 可能永远看不到 flag=true，或者看到 flag=true 但 number 还是旧值 0</text>
</svg>

**可见性问题的表现**：

1. **变量修改不可见**：线程 A 修改变量，线程 B 一直读到旧值
2. **部分可见**：线程 B 看到部分修改，但不是全部修改
3. **延迟可见**：修改过了很久才对其他线程可见

**可见性问题的后果**：

- **死循环**：线程 B 等待 flag 变化，但永远看不到
- **数据不一致**：读到过期的数据，导致业务逻辑错误
- **线程安全问题**：多线程并发访问出现非预期结果

**关键要点**：
- ✓ **本质原因**：CPU 缓存 + 工作内存隔离
- ✓ **核心表现**：修改对其他线程不可见
- ✓ **常见场景**：标志位、状态变量、配置参数
- ⚠ **需要同步机制**：volatile、synchronized、Lock

**记忆口诀**：缓存副本隔离，修改别人看不到，可见性要保证，同步机制少不了

### 6. 如何保证可见性？

**核心答案**：Java 提供了 volatile、synchronized、Lock、final 等机制来保证可见性。

**详细说明**：

**可见性保证的四种方式**：

<svg viewBox="0 0 850 400" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="16" font-weight="bold">保证可见性的四种方式</text>
<rect x="30" y="60" width="190" height="320" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="90" text-anchor="middle" font-size="13" font-weight="bold">1️⃣ volatile</text>
<text x="45" y="120" font-size="11" font-weight="bold">原理：</text>
<text x="45" y="140" font-size="10">• 写：立即刷新到主内存</text>
<text x="45" y="160" font-size="10">• 读：从主内存读取最新值</text>
<text x="45" y="185" font-size="11" font-weight="bold">特点：</text>
<text x="45" y="205" font-size="10">✓ 轻量级同步</text>
<text x="45" y="225" font-size="10">✓ 不阻塞线程</text>
<text x="45" y="245" font-size="10">✓ 禁止指令重排</text>
<text x="45" y="270" font-size="11" font-weight="bold">使用场景：</text>
<text x="45" y="290" font-size="10">• 状态标志位</text>
<text x="45" y="310" font-size="10">• 一写多读</text>
<text x="45" y="330" font-size="10">• 双重检查锁定</text>
<text x="45" y="360" font-size="10" fill="#1976d2" font-weight="bold">⚠️ 不保证原子性</text>
<rect x="240" y="60" width="190" height="320" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="335" y="90" text-anchor="middle" font-size="13" font-weight="bold">2️⃣ synchronized</text>
<text x="255" y="120" font-size="11" font-weight="bold">原理：</text>
<text x="255" y="140" font-size="10">• 加锁前：清空工作内存</text>
<text x="255" y="160" font-size="10">• 解锁时：刷新到主内存</text>
<text x="255" y="185" font-size="11" font-weight="bold">特点：</text>
<text x="255" y="205" font-size="10">✓ 互斥锁</text>
<text x="255" y="225" font-size="10">✓ 保证可见性+原子性</text>
<text x="255" y="245" font-size="10">✓ 阻塞其他线程</text>
<text x="255" y="270" font-size="11" font-weight="bold">使用场景：</text>
<text x="255" y="290" font-size="10">• 临界区保护</text>
<text x="255" y="310" font-size="10">• 复合操作</text>
<text x="255" y="330" font-size="10">• 方法/代码块同步</text>
<text x="255" y="360" font-size="10" fill="#388e3c" font-weight="bold">✓ 功能最全面</text>
<rect x="450" y="60" width="190" height="320" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="545" y="90" text-anchor="middle" font-size="13" font-weight="bold">3️⃣ Lock (ReentrantLock)</text>
<text x="465" y="120" font-size="11" font-weight="bold">原理：</text>
<text x="465" y="140" font-size="10">• lock()：同步主内存</text>
<text x="465" y="160" font-size="10">• unlock()：刷新主内存</text>
<text x="465" y="185" font-size="11" font-weight="bold">特点：</text>
<text x="465" y="205" font-size="10">✓ 显式锁</text>
<text x="465" y="225" font-size="10">✓ 可中断</text>
<text x="465" y="245" font-size="10">✓ 可设置超时</text>
<text x="465" y="270" font-size="11" font-weight="bold">使用场景：</text>
<text x="465" y="290" font-size="10">• 复杂同步逻辑</text>
<text x="465" y="310" font-size="10">• 公平锁需求</text>
<text x="465" y="330" font-size="10">• 需要中断能力</text>
<text x="465" y="360" font-size="10" fill="#f57c00" font-weight="bold">✓ 更灵活</text>
<rect x="660" y="60" width="170" height="320" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="745" y="90" text-anchor="middle" font-size="13" font-weight="bold">4️⃣ final</text>
<text x="675" y="120" font-size="11" font-weight="bold">原理：</text>
<text x="675" y="140" font-size="10">• 构造完成后</text>
<text x="675" y="160" font-size="10">保证可见性</text>
<text x="675" y="185" font-size="11" font-weight="bold">特点：</text>
<text x="675" y="205" font-size="10">✓ 不可变</text>
<text x="675" y="225" font-size="10">✓ 线程安全</text>
<text x="675" y="245" font-size="10">✓ 无需同步</text>
<text x="675" y="270" font-size="11" font-weight="bold">使用场景：</text>
<text x="675" y="290" font-size="10">• 不变配置</text>
<text x="675" y="310" font-size="10">• 安全发布</text>
<text x="675" y="330" font-size="10">• 常量定义</text>
<text x="675" y="360" font-size="10" fill="#7b1fa2" font-weight="bold">✓ 最安全</text>
</svg>

**1. volatile 关键字**：
- **适用场景**：状态标志、一写多读、配置参数
- **优点**：轻量、无锁、性能好
- **缺点**：不保证原子性

**2. synchronized 关键字**：
- **适用场景**：临界区、复合操作、方法同步
- **优点**：简单、安全、原子性+可见性
- **缺点**：性能开销、可能阻塞

**3. Lock 接口（ReentrantLock）**：
- **适用场景**：复杂同步、公平锁、可中断
- **优点**：灵活、功能丰富
- **缺点**：需手动释放锁

**4. final 关键字**：
- **适用场景**：不可变对象、常量、安全发布
- **优点**：天生线程安全、无需同步
- **缺点**：不可修改

**选择建议**：

| 场景 | 推荐方式 | 原因 |
|-----|---------|-----|
| 状态标志位 | volatile | 轻量、无锁 |
| 计数器 | AtomicInteger | 原子性+性能 |
| 临界区 | synchronized | 简单可靠 |
| 复杂同步 | ReentrantLock | 灵活强大 |
| 不可变对象 | final | 天生线程安全 |

**关键要点**：
- ✓ **volatile**：轻量级，适合标志位
- ✓ **synchronized**：重量级，功能全面
- ✓ **Lock**：显式锁，更灵活
- ✓ **final**：不可变，最安全
- ⚠ **选择合适的方式**：根据场景权衡性能和安全

**记忆口诀**：volatile 轻量标志位，synchronized 临界区，Lock 显式更灵活，final 不变最安全

### 7. volatile 如何保证可见性？

**核心答案**：volatile 通过内存屏障强制读写操作直接访问主内存,保证修改立即可见。

**详细说明**：

**volatile 的可见性保证机制**：

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">volatile 可见性保证机制</text>
<rect x="250" y="60" width="300" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="90" text-anchor="middle" font-size="14" font-weight="bold">主内存 (Main Memory)</text>
<text x="400" y="115" text-anchor="middle" font-size="11" fill="#1976d2" font-weight="bold">volatile int flag = 0</text>
<rect x="50" y="200" width="300" height="300" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="200" y="230" text-anchor="middle" font-size="13" font-weight="bold">线程 A (写操作)</text>
<rect x="70" y="250" width="260" height="230" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="80" y="275" font-family="monospace" font-size="11">// 1. 修改 volatile 变量</text>
<text x="80" y="295" font-family="monospace" font-size="11" fill="#388e3c" font-weight="bold">flag = 1;</text>
<text x="80" y="325" font-size="10" fill="#666">⬇️ volatile 写操作</text>
<text x="80" y="350" font-size="10" fill="#388e3c" font-weight="bold">【内存屏障】</text>
<text x="80" y="370" font-size="10">• 禁止重排序</text>
<text x="80" y="390" font-size="10">• 刷新到主内存</text>
<text x="80" y="410" font-size="10">• 失效其他缓存</text>
<text x="80" y="440" font-size="10" fill="#388e3c" font-weight="bold">✓ 立即写入主内存</text>
<text x="80" y="460" font-size="10" fill="#388e3c" font-weight="bold">✓ 其他线程缓存失效</text>
<rect x="450" y="200" width="300" height="300" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="600" y="230" text-anchor="middle" font-size="13" font-weight="bold">线程 B (读操作)</text>
<rect x="470" y="250" width="260" height="230" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="480" y="275" font-family="monospace" font-size="11">// 1. 读取 volatile 变量</text>
<text x="480" y="295" font-family="monospace" font-size="11" fill="#f57c00" font-weight="bold">int temp = flag;</text>
<text x="480" y="325" font-size="10" fill="#666">⬆️ volatile 读操作</text>
<text x="480" y="350" font-size="10" fill="#f57c00" font-weight="bold">【内存屏障】</text>
<text x="480" y="370" font-size="10">• 禁止重排序</text>
<text x="480" y="390" font-size="10">• 从主内存读取</text>
<text x="480" y="410" font-size="10">• 失效本地缓存</text>
<text x="480" y="440" font-size="10" fill="#f57c00" font-weight="bold">✓ 直接从主内存读</text>
<text x="480" y="460" font-size="10" fill="#f57c00" font-weight="bold">✓ 保证读到最新值</text>
<path d="M 200 200 L 350 140" stroke="#388e3c" stroke-width="2" fill="none" marker-end="url(#arrow-green)"/>
<text x="260" y="165" font-size="10" fill="#388e3c" font-weight="bold">写入主内存</text>
<path d="M 450 140 L 600 200" stroke="#f57c00" stroke-width="2" fill="none" marker-end="url(#arrow-orange)"/>
<text x="510" y="165" font-size="10" fill="#f57c00" font-weight="bold">读取主内存</text>
<text x="50" y="530" font-size="12" font-weight="bold">核心：volatile 通过内存屏障强制所有操作直接访问主内存，跳过CPU缓存</text>
<defs>
<marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#388e3c"/>
</marker>
<marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#f57c00"/>
</marker>
</defs>
</svg>

**volatile 保证可见性的两个操作**：

**1. 写操作（Write）**：
- **步骤 1**：修改工作内存中的变量副本
- **步骤 2**：插入 **StoreStore** 内存屏障（禁止重排）
- **步骤 3**：**立即刷新**到主内存
- **步骤 4**：插入 **StoreLoad** 内存屏障
- **步骤 5**：**失效**其他 CPU 缓存中的副本（通过 MESI 协议）

**2. 读操作（Read）**：
- **步骤 1**：插入 **LoadLoad** 内存屏障
- **步骤 2**：**失效**工作内存中的副本
- **步骤 3**：**直接从主内存**读取最新值
- **步骤 4**：插入 **LoadStore** 内存屏障（禁止重排）

**底层实现机制**：

1. **Lock 前缀指令**：
   - x86 架构下，volatile 写操作会使用 `lock` 前缀指令
   - `lock addl $0x0,(%rsp)` 触发缓存一致性协议

2. **MESI 缓存一致性协议**：
   - **M (Modified)**：独占且已修改
   - **E (Exclusive)**：独占但未修改
   - **S (Shared)**：共享
   - **I (Invalid)**：失效
   - volatile 写操作会将其他 CPU 缓存行置为 I 状态

**volatile 与普通变量的对比**：

| 对比项 | 普通变量 | volatile 变量 |
|-------|---------|--------------|
| **读操作** | 从 CPU 缓存读 | 从主内存读 |
| **写操作** | 写到 CPU 缓存 | 立即写到主内存 |
| **可见性** | 不保证 | 立即可见 |
| **缓存失效** | 不主动失效 | 主动失效其他缓存 |
| **性能** | 快 | 较慢（但比锁快） |

**关键要点**：
- ✓ **写操作**：立即刷新到主内存，失效其他缓存
- ✓ **读操作**：直接从主内存读取最新值
- ✓ **内存屏障**：禁止指令重排序
- ✓ **MESI 协议**：保证缓存一致性
- ⚠ **性能开销**：比普通变量慢，但比锁快得多

**记忆口诀**：volatile 读写访主存，内存屏障禁重排，MESI 协议保一致，缓存失效立即见

### 8. synchronized 如何保证可见性？

**核心答案**：synchronized 通过加锁前清空工作内存、解锁时刷新到主内存来保证可见性。

**详细说明**：

**synchronized 的可见性保证机制**：

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">synchronized 可见性保证</text>
<rect x="300" y="60" width="200" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="90" text-anchor="middle" font-size="13" font-weight="bold">主内存</text>
<text x="400" y="105" text-anchor="middle" font-size="10">共享变量</text>
<rect x="50" y="180" width="320" height="240" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="210" y="210" text-anchor="middle" font-size="13" font-weight="bold">线程 A</text>
<text x="70" y="240" font-size="11" font-weight="bold">1️⃣ 加锁 (monitorenter)</text>
<text x="70" y="260" font-size="10">• 清空工作内存</text>
<text x="70" y="280" font-size="10">• 从主内存加载最新值</text>
<text x="70" y="310" font-size="11" font-weight="bold">2️⃣ 执行同步代码</text>
<text x="70" y="330" font-size="10">• 在工作内存中修改</text>
<text x="70" y="360" font-size="11" font-weight="bold">3️⃣ 解锁 (monitorexit)</text>
<text x="70" y="380" font-size="10" fill="#388e3c" font-weight="bold">• 刷新到主内存</text>
<text x="70" y="400" font-size="10" fill="#388e3c" font-weight="bold">• 释放锁</text>
<rect x="430" y="180" width="320" height="240" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="590" y="210" text-anchor="middle" font-size="13" font-weight="bold">线程 B</text>
<text x="450" y="240" font-size="11" font-weight="bold">1️⃣ 等待锁</text>
<text x="450" y="260" font-size="10">• 等待线程 A 释放</text>
<text x="450" y="290" font-size="11" font-weight="bold">2️⃣ 加锁 (monitorenter)</text>
<text x="450" y="310" font-size="10" fill="#f57c00" font-weight="bold">• 清空工作内存</text>
<text x="450" y="330" font-size="10" fill="#f57c00" font-weight="bold">• 从主内存读最新值</text>
<text x="450" y="360" font-size="11" font-weight="bold">3️⃣ 看到线程 A 的修改</text>
<text x="450" y="380" font-size="10">✓ 保证可见性</text>
<path d="M 210 180 L 350 120" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow)"/>
<text x="270" y="145" font-size="10" fill="#388e3c">解锁刷新</text>
<path d="M 450 120 L 590 180" stroke="#f57c00" stroke-width="2" marker-end="url(#arrow)"/>
<text x="510" y="145" font-size="10" fill="#f57c00">加锁读取</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**happens-before 规则**：
- **解锁 happens-before 加锁**：线程 A 解锁前的所有操作，对线程 B 加锁后可见

**synchronized 的内存语义**：

1. **加锁（monitorenter）**：
   - 清空工作内存中的变量副本
   - 从主内存重新加载最新值

2. **解锁（monitorexit）**：
   - 将工作内存中的修改刷新到主内存
   - 释放锁，允许其他线程获取

**与 volatile 的对比**：

| 对比项 | volatile | synchronized |
|-------|----------|--------------|
| **可见性** | ✓ | ✓ |
| **原子性** | ✗ | ✓ |
| **有序性** | ✓ | ✓ |
| **性能** | 快 | 慢 |
| **阻塞** | 不阻塞 | 阻塞 |
| **适用场景** | 状态标志 | 临界区、复合操作 |

**关键要点**：
- ✓ **加锁时**：清空工作内存，读主内存
- ✓ **解锁时**：刷新工作内存到主内存
- ✓ **happens-before**：解锁 happens-before 加锁
- ✓ **功能全面**：可见性+原子性+有序性
- ⚠ **性能开销**：比 volatile 大，但保证更强

**记忆口诀**：加锁清空读主存，解锁刷新写主存，happens-before 保顺序，互斥保证原子性
