## 线程池

### 11. 为什么使用线程池？

**核心答案**：线程池通过复用线程、控制并发数、统一管理线程，提升性能、降低资源消耗、便于管理。

**详细说明**：

**线程池的优势**：

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">使用线程池的优势</text>
<rect x="50" y="50" width="330" height="180" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="215" y="80" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">✗ 不使用线程池</text>
<rect x="80" y="100" width="270" height="110" fill="#fff" stroke="#666" stroke-width="1" rx="3"/>
<text x="90" y="120" font-size="11">每次任务都创建新线程：</text>
<text x="100" y="140" font-size="10" fill="#c62828">• 频繁创建/销毁线程，开销大</text>
<text x="100" y="160" font-size="10" fill="#c62828">• 无法控制并发数，可能 OOM</text>
<text x="100" y="180" font-size="10" fill="#c62828">• 难以统一管理和监控</text>
<text x="100" y="200" font-size="10" fill="#c62828">• 线程创建时间影响响应速度</text>
<rect x="420" y="50" width="330" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="585" y="80" text-anchor="middle" font-size="14" font-weight="bold" fill="#388e3c">✓ 使用线程池</text>
<rect x="450" y="100" width="270" height="110" fill="#fff" stroke="#666" stroke-width="1" rx="3"/>
<text x="460" y="120" font-size="11">线程复用和统一管理：</text>
<text x="470" y="140" font-size="10" fill="#388e3c">• 线程复用，降低资源消耗</text>
<text x="470" y="160" font-size="10" fill="#388e3c">• 控制最大并发数，防止资源耗尽</text>
<text x="470" y="180" font-size="10" fill="#388e3c">• 统一管理、调优、监控</text>
<text x="470" y="200" font-size="10" fill="#388e3c">• 提高响应速度（线程已创建）</text>
<text x="50" y="260" font-size="13" font-weight="bold">四大核心优势：</text>
<rect x="50" y="275" width="330" height="155" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="215" y="300" text-anchor="middle" font-size="13" font-weight="bold">1️⃣ 降低资源消耗</text>
<text x="70" y="325" font-size="11">• 线程复用，减少创建/销毁开销</text>
<text x="70" y="345" font-size="11">• 一个线程可以处理多个任务</text>
<text x="215" y="375" text-anchor="middle" font-size="13" font-weight="bold">2️⃣ 提高响应速度</text>
<text x="70" y="400" font-size="11">• 线程已创建，任务到达立即执行</text>
<text x="70" y="420" font-size="11">• 无需等待线程创建时间</text>
<rect x="420" y="275" width="330" height="155" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="585" y="300" text-anchor="middle" font-size="13" font-weight="bold">3️⃣ 提高可管理性</text>
<text x="440" y="325" font-size="11">• 统一分配、调优、监控</text>
<text x="440" y="345" font-size="11">• 控制并发数，防止资源耗尽</text>
<text x="585" y="375" text-anchor="middle" font-size="13" font-weight="bold">4️⃣ 提供更多功能</text>
<text x="440" y="400" font-size="11">• 定时执行、周期执行</text>
<text x="440" y="420" font-size="11">• 任务队列、拒绝策略</text>
</svg>

**性能对比**：

| 对比项 | 手动创建线程 | 线程池 |
|-------|------------|-------|
| **创建销毁开销** | 每次都创建/销毁 | 线程复用，开销低 |
| **响应速度** | 需等待线程创建 | 立即执行 |
| **资源控制** | 无法限制线程数 | 可控制最大并发 |
| **管理维护** | 分散，难以管理 | 集中管理，易监控 |
| **功能扩展** | 功能有限 | 定时、周期、队列等 |

**典型使用场景**：
- **Web 服务器**：处理 HTTP 请求
- **数据库连接池**：管理数据库连接
- **异步任务处理**：邮件发送、日志记录
- **批量数据处理**：数据导入、报表生成
- **定时任务**：ScheduledThreadPool

**关键要点**：
- ✓ **降低开销**：线程复用避免频繁创建销毁
- ✓ **提高响应**：线程预创建，任务到达立即执行
- ✓ **资源可控**：限制最大线程数，防止 OOM
- ✓ **便于管理**：统一管理、监控、调优

**记忆口诀**：线程池复用快，资源可控易管理

### 12. 线程池的核心参数？

**核心答案**：ThreadPoolExecutor 有 7 个核心参数：核心线程数、最大线程数、存活时间、时间单位、任务队列、线程工厂、拒绝策略。

**详细说明**：

**ThreadPoolExecutor 构造方法**：
```java
public ThreadPoolExecutor(
    int corePoolSize,              // 核心线程数
    int maximumPoolSize,           // 最大线程数
    long keepAliveTime,            // 空闲线程存活时间
    TimeUnit unit,                 // 时间单位
    BlockingQueue<Runnable> workQueue,   // 任务队列
    ThreadFactory threadFactory,   // 线程工厂
    RejectedExecutionHandler handler     // 拒绝策略
)
```

**7 大核心参数图示**：

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">线程池 7 大核心参数</text>
<rect x="50" y="50" width="700" height="530" fill="#f5f5f5" stroke="#666" stroke-width="2" rx="5"/>
<rect x="70" y="70" width="320" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="230" y="95" text-anchor="middle" font-size="13" font-weight="bold">1️⃣ corePoolSize (核心线程数)</text>
<text x="85" y="120" font-size="11">• 线程池的基本大小</text>
<text x="85" y="140" font-size="11">• 即使空闲也会保留在池中</text>
<rect x="410" y="70" width="320" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="570" y="95" text-anchor="middle" font-size="13" font-weight="bold">2️⃣ maximumPoolSize (最大线程数)</text>
<text x="425" y="120" font-size="11">• 线程池允许创建的最大线程数</text>
<text x="425" y="140" font-size="11">• 包含核心线程 + 非核心线程</text>
<rect x="70" y="165" width="320" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="230" y="190" text-anchor="middle" font-size="13" font-weight="bold">3️⃣ keepAliveTime (存活时间)</text>
<text x="85" y="215" font-size="11">• 非核心线程空闲后的存活时间</text>
<text x="85" y="235" font-size="11">• 超过此时间将被回收</text>
<rect x="410" y="165" width="320" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="570" y="190" text-anchor="middle" font-size="13" font-weight="bold">4️⃣ unit (时间单位)</text>
<text x="425" y="215" font-size="11">• keepAliveTime 的时间单位</text>
<text x="425" y="235" font-size="11">• SECONDS、MILLISECONDS 等</text>
<rect x="70" y="260" width="660" height="100" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="400" y="285" text-anchor="middle" font-size="13" font-weight="bold">5️⃣ workQueue (任务队列)</text>
<text x="85" y="310" font-size="11">• 用于保存等待执行的任务的阻塞队列</text>
<text x="85" y="330" font-size="11">• <text font-weight="bold">ArrayBlockingQueue</text>: 有界队列</text>
<text x="85" y="350" font-size="11">• <text font-weight="bold">LinkedBlockingQueue</text>: 无界队列（默认 Integer.MAX_VALUE）</text>
<rect x="70" y="375" width="320" height="95" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/>
<text x="230" y="400" text-anchor="middle" font-size="13" font-weight="bold">6️⃣ threadFactory (线程工厂)</text>
<text x="85" y="425" font-size="11">• 用于创建新线程</text>
<text x="85" y="445" font-size="11">• 可自定义线程名称、优先级等</text>
<text x="85" y="465" font-size="11">• 默认使用 Executors.defaultThreadFactory()</text>
<rect x="410" y="375" width="320" height="95" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="570" y="400" text-anchor="middle" font-size="13" font-weight="bold">7️⃣ handler (拒绝策略)</text>
<text x="425" y="425" font-size="11">• 任务无法执行时的处理策略</text>
<text x="425" y="445" font-size="11">• AbortPolicy (默认，抛异常)</text>
<text x="425" y="465" font-size="11">• CallerRunsPolicy、DiscardPolicy 等</text>
<text x="70" y="495" font-size="12" font-weight="bold">参数关系：</text>
<text x="70" y="520" font-size="11">当任务数 &gt; corePoolSize 时，任务进入队列；队列满时，创建新线程直到 maximumPoolSize；</text>
<text x="70" y="540" font-size="11">超过 maximumPoolSize 且队列满时，执行拒绝策略；非核心线程空闲 keepAliveTime 后回收。</text>
<text x="70" y="565" font-size="11" font-weight="bold" fill="#c62828">记忆口诀：核心最大存活时间单位，队列工厂拒绝策略</text>
</svg>

**参数详解**：

| 参数 | 说明 | 典型值 |
|------|------|-------|
| **corePoolSize** | 核心线程数，始终保留 | CPU 密集: CPU 核数+1<br>IO 密集: CPU 核数*2 |
| **maximumPoolSize** | 最大线程数 | 根据业务场景调整 |
| **keepAliveTime** | 非核心线程空闲存活时间 | 60 秒 |
| **unit** | 时间单位 | TimeUnit.SECONDS |
| **workQueue** | 任务队列 | ArrayBlockingQueue(有界)<br>LinkedBlockingQueue(无界) |
| **threadFactory** | 线程工厂 | 自定义或默认 |
| **handler** | 拒绝策略 | AbortPolicy(抛异常) |

**关键要点**：
- ✓ **corePoolSize**：始终保留的线程数
- ✓ **maximumPoolSize**：最大可创建的线程数
- ✓ **workQueue**：任务队列，建议使用有界队列
- ⚠ **无界队列风险**：可能导致 OOM
- ⚠ **合理设置参数**：根据任务类型（CPU 密集/IO 密集）调整

**记忆口诀**：核心最大时间单位，队列工厂拒绝策略

### 13. 线程池的执行流程？

**核心答案**：线程池执行任务遵循"核心线程 → 队列 → 最大线程 → 拒绝策略"的流程。

**详细说明**：

**执行流程图**：

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
  <!-- 标题 -->
  <text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">线程池执行流程（正确逻辑）</text>

  <!-- 1. 提交任务 -->
  <rect x="300" y="50" width="200" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
  <text x="400" y="85" text-anchor="middle" font-size="14" font-weight="bold">提交任务</text>

  <!-- 2. 判断核心线程数 -->
  <rect x="300" y="140" width="200" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
  <text x="400" y="165" text-anchor="middle" font-size="12">线程数 &lt; corePoolSize?</text>
  <text x="400" y="185" text-anchor="middle" font-size="11">(当前线程数 &lt; 核心线程数)</text>

  <!-- 3a. 创建核心线程 -->
  <rect x="50" y="240" width="180" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
  <text x="140" y="265" text-anchor="middle" font-size="12" font-weight="bold">创建核心线程</text>
  <text x="140" y="285" text-anchor="middle" font-size="11">立即执行任务</text>

  <!-- 3b. 判断队列是否已满 -->
  <rect x="310" y="270" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
  <text x="400" y="295" text-anchor="middle" font-size="12">队列是否已满?</text>
  <text x="400" y="315" text-anchor="middle" font-size="11">(workQueue.offer)</text>

  <!-- 4a. 加入队列（左分支） -->
  <rect x="50" y="360" width="180" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
  <text x="140" y="385" text-anchor="middle" font-size="12" font-weight="bold">加入队列</text>
  <text x="140" y="405" text-anchor="middle" font-size="11">等待空闲线程执行</text>

  <!-- 4b. 判断最大线程数（右分支） -->
  <rect x="570" y="360" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
  <text x="660" y="385" text-anchor="middle" font-size="11">线程数 &lt; maximumPoolSize?</text>
  <text x="660" y="405" text-anchor="middle" font-size="11">(当前 &lt; 最大线程数)</text>

  <!-- 5a. 创建非核心线程 -->
  <rect x="440" y="480" width="180" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
  <text x="530" y="505" text-anchor="middle" font-size="12" font-weight="bold">创建非核心线程</text>
  <text x="530" y="525" text-anchor="middle" font-size="11">立即执行任务</text>

  <!-- 5b. 执行拒绝策略 -->
  <rect x="660" y="480" width="120" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
  <text x="720" y="505" text-anchor="middle" font-size="12" font-weight="bold">拒绝策略</text>
  <text x="720" y="525" text-anchor="middle" font-size="10">handler.reject</text>

  <!-- 箭头定义 -->
  <defs>
    <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#388e3c"/>
    </marker>
    <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#c62828"/>
    </marker>
    <marker id="arrow-gray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#666"/>
    </marker>
  </defs>

  <!-- 连接线 -->
  <!-- 提交任务 -> 判断核心线程数 -->
  <path d="M 400 110 L 400 140" stroke="#666" stroke-width="2" marker-end="url(#arrow-gray)"/>

  <!-- 判断核心线程数 -> 创建核心线程 (是) -->
  <path d="M 300 170 L 140 240" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green)"/>
  <text x="200" y="200" font-size="11" fill="#388e3c" font-weight="bold">是</text>

  <!-- 判断核心线程数 -> 判断队列是否已满 (否) -->
  <path d="M 400 200 L 400 270" stroke="#666" stroke-width="2" marker-end="url(#arrow-gray)"/>
  <text x="420" y="240" font-size="11" fill="#666" font-weight="bold">否</text>

  <!-- 判断队列是否已满 -> 加入队列 (否，队列未满) - 左分支 -->
  <path d="M 310 300 L 140 360" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green)"/>
  <text x="200" y="325" font-size="11" fill="#388e3c" font-weight="bold">否（未满）</text>

  <!-- 判断队列是否已满 -> 判断最大线程数 (是，队列已满) - 右分支 -->
  <path d="M 490 300 L 660 360" stroke="#666" stroke-width="2" marker-end="url(#arrow-gray)"/>
  <text x="600" y="325" font-size="11" fill="#666" font-weight="bold">是（已满）</text>

  <!-- 判断最大线程数 -> 创建非核心线程 (是) -->
  <path d="M 620 420 L 530 480" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow-green)"/>
  <text x="560" y="445" font-size="11" fill="#388e3c" font-weight="bold">是</text>

  <!-- 判断最大线程数 -> 执行拒绝策略 (否) -->
  <path d="M 690 420 L 720 480" stroke="#c62828" stroke-width="2" marker-end="url(#arrow-red)"/>
  <text x="710" y="445" font-size="11" fill="#c62828" font-weight="bold">否</text>

  <!-- 说明文字 -->
  <rect x="50" y="570" width="700" height="60" fill="#f5f5f5" stroke="#999" stroke-width="1" rx="5"/>
  <text x="400" y="592" text-anchor="middle" font-size="11" font-weight="bold">执行顺序总结：</text>
  <text x="400" y="612" text-anchor="middle" font-size="10">
    ① 核心线程未满 → 创建核心线程　② 核心线程已满 → 尝试加入队列　③ 队列已满 → 创建非核心线程　④ 达到最大线程数 → 执行拒绝策略
  </text>
</svg>

**详细流程说明**：

1. **判断核心线程数**
   - 如果当前线程数 < corePoolSize
   - 创建新的核心线程执行任务（即使有空闲核心线程）

2. **任务加入队列**
   - 如果核心线程已满
   - 尝试将任务加入 workQueue

3. **创建非核心线程**
   - 如果队列已满
   - 且当前线程数 < maximumPoolSize
   - 创建非核心线程执行任务

4. **执行拒绝策略**
   - 如果队列满 且 线程数 = maximumPoolSize
   - 执行 RejectedExecutionHandler

**关键要点**：
- ✓ **优先级**：核心线程 → 队列 → 非核心线程 → 拒绝
- ⚠ **注意**：核心线程数未满时，即使有空闲线程也会创建新线程
- ✓ **队列作用**：缓冲任务，避免频繁创建线程
- ⚠ **无界队列**：maximumPoolSize 参数会失效（永远不会创建非核心线程）

**记忆口诀**：核心满了进队列，队列满了加线程，线程满了就拒绝

### 14. 线程池的拒绝策略有哪些？

**核心答案**：Java 提供了 4 种内置拒绝策略：AbortPolicy（抛异常）、CallerRunsPolicy（调用者运行）、DiscardPolicy（丢弃）、DiscardOldestPolicy（丢弃最旧）。

**详细说明**：

**4 种拒绝策略对比**：

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">线程池 4 种拒绝策略</text>
<rect x="50" y="50" width="330" height="200" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="215" y="80" text-anchor="middle" font-size="14" font-weight="bold">1️⃣ AbortPolicy (默认)</text>
<text x="70" y="110" font-size="11" font-weight="bold">行为：</text>
<text x="80" y="130" font-size="11">• 直接抛出 RejectedExecutionException</text>
<text x="80" y="150" font-size="11">• 拒绝任务，不执行</text>
<text x="70" y="175" font-size="11" font-weight="bold">使用场景：</text>
<text x="80" y="195" font-size="11">• 任务重要，不能丢失</text>
<text x="80" y="215" font-size="11">• 需要感知任务提交失败</text>
<text x="80" y="235" font-size="11" fill="#c62828">✓ 推荐：大部分场景使用</text>
<rect x="420" y="50" width="330" height="200" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="585" y="80" text-anchor="middle" font-size="14" font-weight="bold">2️⃣ CallerRunsPolicy</text>
<text x="440" y="110" font-size="11" font-weight="bold">行为：</text>
<text x="450" y="130" font-size="11">• 由调用线程（提交任务的线程）执行</text>
<text x="450" y="150" font-size="11">• 不丢弃任务</text>
<text x="440" y="175" font-size="11" font-weight="bold">使用场景：</text>
<text x="450" y="195" font-size="11">• 任务不能丢失</text>
<text x="450" y="215" font-size="11">• 可以牺牲调用线程性能</text>
<text x="450" y="235" font-size="11" fill="#388e3c">✓ 优点：提供负反馈，降低提交速度</text>
<rect x="50" y="270" width="330" height="200" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="215" y="300" text-anchor="middle" font-size="14" font-weight="bold">3️⃣ DiscardPolicy</text>
<text x="70" y="330" font-size="11" font-weight="bold">行为：</text>
<text x="80" y="350" font-size="11">• 静默丢弃任务</text>
<text x="80" y="370" font-size="11">• 不抛异常，不执行</text>
<text x="70" y="395" font-size="11" font-weight="bold">使用场景：</text>
<text x="80" y="415" font-size="11">• 任务不重要，可以丢失</text>
<text x="80" y="435" font-size="11">• 如：日志记录、数据采集</text>
<text x="80" y="455" font-size="11" fill="#f57c00">⚠ 危险：任务丢失无感知</text>
<rect x="420" y="270" width="330" height="200" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="585" y="300" text-anchor="middle" font-size="14" font-weight="bold">4️⃣ DiscardOldestPolicy</text>
<text x="440" y="330" font-size="11" font-weight="bold">行为：</text>
<text x="450" y="350" font-size="11">• 丢弃队列中最旧的任务</text>
<text x="450" y="370" font-size="11">• 然后重新提交当前任务</text>
<text x="440" y="395" font-size="11" font-weight="bold">使用场景：</text>
<text x="450" y="415" font-size="11">• 新任务优先级高于旧任务</text>
<text x="450" y="435" font-size="11">• 如：实时数据处理</text>
<text x="450" y="455" font-size="11" fill="#1976d2">⚠ 注意：优先级队列慎用</text>
</svg>

**策略对比表**：

| 拒绝策略 | 行为 | 是否抛异常 | 适用场景 |
|---------|------|-----------|---------|
| **AbortPolicy** | 抛异常拒绝 | ✓ 是 | 默认策略，任务不能丢 |
| **CallerRunsPolicy** | 调用者执行 | ✗ 否 | 任务不能丢，可牺牲提交线程性能 |
| **DiscardPolicy** | 静默丢弃 | ✗ 否 | 任务可丢失（慎用） |
| **DiscardOldestPolicy** | 丢弃最旧任务 | ✗ 否 | 新任务优先级高 |

**自定义拒绝策略**：
```java
// 实现 RejectedExecutionHandler 接口
public class CustomRejectedHandler implements RejectedExecutionHandler {
    @Override
    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
        // 自定义处理逻辑
        // 例如：记录日志、存入数据库、发送告警等
        log.error("Task rejected: {}", r);
    }
}
```

**关键要点**：
- ✓ **AbortPolicy**：默认策略，抛异常，任务不丢失
- ✓ **CallerRunsPolicy**：调用者执行，提供负反馈
- ⚠ **DiscardPolicy**：静默丢弃，危险！
- ⚠ **DiscardOldestPolicy**：丢弃最旧任务，慎用

**记忆口诀**：Abort 抛异常，Caller 自己干，Discard 静默丢，Oldest 丢最旧

### 15. 常见的线程池有哪些？

**核心答案**：Executors 提供了 5 种常见线程池：FixedThreadPool、CachedThreadPool、SingleThreadExecutor、ScheduledThreadPool、WorkStealingPool，但阿里规约禁止直接使用。

**详细说明**：

**5 种线程池对比**：

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">5 种常见线程池</text>
<rect x="50" y="50" width="220" height="160" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="160" y="75" text-anchor="middle" font-size="13" font-weight="bold">FixedThreadPool</text>
<text x="60" y="100" font-size="10">固定大小线程池</text>
<text x="60" y="120" font-size="10">• core = max = n</text>
<text x="60" y="140" font-size="10">• 队列: LinkedBlockingQueue</text>
<text x="60" y="160" font-size="10">• 场景: 负载较重的服务器</text>
<text x="60" y="180" font-size="10" fill="#c62828">⚠ OOM风险: 无界队列</text>
<text x="60" y="200" font-size="9">Executors.newFixedThreadPool(n)</text>
<rect x="290" y="50" width="220" height="160" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" font-size="13" font-weight="bold">CachedThreadPool</text>
<text x="300" y="100" font-size="10">缓存线程池</text>
<text x="300" y="120" font-size="10">• core = 0, max = Integer.MAX</text>
<text x="300" y="140" font-size="10">• 队列: SynchronousQueue</text>
<text x="300" y="160" font-size="10">• 场景: 短期异步小任务</text>
<text x="300" y="180" font-size="10" fill="#c62828">⚠ OOM风险: 无限线程</text>
<text x="300" y="200" font-size="9">Executors.newCachedThreadPool()</text>
<rect x="530" y="50" width="220" height="160" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="640" y="75" text-anchor="middle" font-size="13" font-weight="bold">SingleThreadExecutor</text>
<text x="540" y="100" font-size="10">单线程线程池</text>
<text x="540" y="120" font-size="10">• core = max = 1</text>
<text x="540" y="140" font-size="10">• 队列: LinkedBlockingQueue</text>
<text x="540" y="160" font-size="10">• 场景: 串行执行任务</text>
<text x="540" y="180" font-size="10" fill="#c62828">⚠ OOM风险: 无界队列</text>
<text x="540" y="200" font-size="9">Executors.newSingleThreadExecutor()</text>
<rect x="50" y="230" width="330" height="160" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="215" y="255" text-anchor="middle" font-size="13" font-weight="bold">ScheduledThreadPool</text>
<text x="60" y="280" font-size="10">定时/周期任务线程池</text>
<text x="60" y="300" font-size="10">• core = n, max = Integer.MAX</text>
<text x="60" y="320" font-size="10">• 队列: DelayedWorkQueue</text>
<text x="60" y="340" font-size="10">• 场景: 定时任务、周期任务</text>
<text x="60" y="360" font-size="10" fill="#c62828">⚠ OOM风险: 无限线程</text>
<text x="60" y="380" font-size="9">Executors.newScheduledThreadPool(n)</text>
<rect x="420" y="230" width="330" height="160" fill="#e1f5fe" stroke="#0277bd" stroke-width="2" rx="5"/>
<text x="585" y="255" text-anchor="middle" font-size="13" font-weight="bold">WorkStealingPool</text>
<text x="430" y="280" font-size="10">工作窃取线程池 (Java 8)</text>
<text x="430" y="300" font-size="10">• 基于 ForkJoinPool</text>
<text x="430" y="320" font-size="10">• 并行度 = CPU 核数</text>
<text x="430" y="340" font-size="10">• 场景: 并行计算密集任务</text>
<text x="430" y="360" font-size="10" fill="#388e3c">✓ 推荐: 计算密集场景</text>
<text x="430" y="380" font-size="9">Executors.newWorkStealingPool()</text>
<rect x="50" y="410" width="700" height="170" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="435" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">⚠ 阿里巴巴 Java 开发手册强制规约</text>
<text x="70" y="460" font-size="12" font-weight="bold">禁止使用 Executors 创建线程池，必须手动创建 ThreadPoolExecutor</text>
<text x="70" y="485" font-size="11">原因：</text>
<text x="80" y="505" font-size="10">1. FixedThreadPool 和 SingleThreadExecutor 使用无界队列，可能堆积大量请求导致 OOM</text>
<text x="80" y="525" font-size="10">2. CachedThreadPool 和 ScheduledThreadPool 允许创建 Integer.MAX_VALUE 个线程，可能 OOM</text>
<text x="70" y="550" font-size="11" fill="#388e3c">推荐：手动创建 ThreadPoolExecutor，明确指定核心参数和有界队列</text>
<text x="70" y="570" font-size="9" font-family="monospace">new ThreadPoolExecutor(core, max, time, unit, new ArrayBlockingQueue&lt;&gt;(capacity), factory, handler)</text>
</svg>

**参数对比表**：

| 线程池类型 | corePoolSize | maximumPoolSize | 队列类型 | 主要用途 | OOM 风险 |
|-----------|-------------|-----------------|---------|---------|---------|
| **FixedThreadPool** | n | n | LinkedBlockingQueue(无界) | 固定线程数 | ✗ 队列堆积 |
| **CachedThreadPool** | 0 | Integer.MAX_VALUE | SynchronousQueue | 短期异步任务 | ✗ 线程过多 |
| **SingleThreadExecutor** | 1 | 1 | LinkedBlockingQueue(无界) | 串行执行 | ✗ 队列堆积 |
| **ScheduledThreadPool** | n | Integer.MAX_VALUE | DelayedWorkQueue | 定时/周期任务 | ✗ 线程过多 |
| **WorkStealingPool** | CPU核数 | CPU核数 | ForkJoinPool内部队列 | 并行计算 | ✓ 相对安全 |

**关键要点**：
- ⚠ **禁止直接使用 Executors**：遵循阿里规约
- ✓ **推荐手动创建**：使用 ThreadPoolExecutor，明确参数
- ⚠ **无界队列风险**：可能导致 OOM
- ⚠ **无限线程风险**：可能导致 OOM
- ✓ **使用有界队列**：ArrayBlockingQueue 等

**记忆口诀**：Fixed 固定数，Cached 无限大，Single 单线程，Scheduled 定时跑，WorkStealing 会窃取，Executors 别直接用

### 16. FixedThreadPool 和 CachedThreadPool 的区别？

**核心答案**：FixedThreadPool 固定线程数+无界队列，CachedThreadPool 无限线程+直接交接，分别适合稳定负载和短期突发任务。

**详细对比**：

| 对比项 | FixedThreadPool | CachedThreadPool |
|-------|----------------|------------------|
| **核心线程数** | n（固定） | 0 |
| **最大线程数** | n（固定） | Integer.MAX_VALUE |
| **任务队列** | LinkedBlockingQueue（无界） | SynchronousQueue（容量0） |
| **线程创建** | 最多 n 个 | 无限制 |
| **线程回收** | 不回收核心线程 | 60秒空闲后回收 |
| **适用场景** | 负载稳定，任务量可控 | 短期突发，任务执行快 |
| **OOM风险** | 队列堆积导致 OOM | 线程过多导致 OOM |

**关键要点**：
- ✓ **Fixed**：线程数固定，队列无限
- ✓ **Cached**：线程数无限，队列容量0
- ⚠ **都有OOM风险**：禁止生产使用

**记忆口诀**：Fixed 队列长，Cached 线程多

### 17. 如何合理设置线程池大小？

**核心答案**：CPU 密集型任务：N+1，IO 密集型任务：2N 或 N/(1-阻塞系数)，实际需压测调优。

**计算公式**：

**1. CPU 密集型任务**：
```
最佳线程数 = CPU 核数 + 1
```
- 原因：任务主要消耗 CPU，线程数过多会增加上下文切换
- +1：防止偶尔的缺页中断或其他原因导致的线程暂停

**2. IO 密集型任务**：
```
最佳线程数 = CPU 核数 × 2
或
最佳线程数 = CPU 核数 / (1 - 阻塞系数)
```
- 阻塞系数：0.8-0.9（线程 80%-90% 时间在等待 IO）
- 例如：8核 CPU，阻塞系数 0.9，线程数 = 8 / (1-0.9) = 80

**3. 混合型任务**：
```
建议拆分为 CPU 密集和 IO 密集分别处理
```

**关键要点**：
- ✓ **公式仅供参考**：实际需要压测调优
- ✓ **监控指标**：CPU 使用率、任务等待时间、吞吐量
- ✓ **动态调整**：使用 ThreadPoolExecutor 的 setCorePoolSize() 动态调整

**记忆口诀**：CPU 密集 N+1，IO 密集 2N 起，压测调优最重要

### 18. 线程池如何优雅关闭？shutdown() 和 shutdownNow() 的区别？

**核心答案**：shutdown() 温和关闭（等待任务完成），shutdownNow() 立即关闭（中断任务），生产环境优先 shutdown()。

**对比表**：

| 对比项 | shutdown() | shutdownNow() |
|-------|-----------|--------------|
| **行为** | 不接受新任务，等待已提交任务完成 | 不接受新任务，尝试停止所有任务 |
| **队列任务** | 会执行完 | 不执行，返回未执行任务列表 |
| **执行中任务** | 等待执行完 | 发送中断信号 |
| **返回值** | void | List&lt;Runnable&gt; 未执行的任务 |
| **推荐度** | ✓ 生产环境首选 | ⚠ 紧急情况使用 |

**优雅关闭最佳实践**：
```java
executor.shutdown(); // 温和关闭
try {
    // 等待60秒
    if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
        // 超时则强制关闭
        executor.shutdownNow();
        // 再等待60秒
        if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
            System.err.println("线程池无法终止");
        }
    }
} catch (InterruptedException e) {
    executor.shutdownNow();
    Thread.currentThread().interrupt();
}
```

**关键要点**：
- ✓ **shutdown()**：优雅关闭，等待任务完成
- ⚠ **shutdownNow()**：强制关闭，可能丢失任务
- ✓ **最佳实践**：先 shutdown()，超时再 shutdownNow()

**记忆口诀**：shutdown 等完成，shutdownNow 强制停

### 19. execute() 和 submit() 的区别？

**核心答案**：execute() 无返回值，submit() 返回 Future，submit() 可获取结果和捕获异常。

**详细对比**：

| 对比项 | execute(Runnable) | submit(Callable/Runnable) |
|-------|------------------|--------------------------|
| **接口** | Executor | ExecutorService |
| **参数类型** | Runnable | Callable 或 Runnable |
| **返回值** | void | Future&lt;T&gt; |
| **获取结果** | ✗ 不支持 | ✓ Future.get() |
| **异常处理** | 抛出到控制台 | 封装在 Future 中 |
| **使用场景** | 不关心结果的任务 | 需要获取结果或异常 |

**关键要点**：
- ✓ **execute()**：简单任务，不需要返回值
- ✓ **submit()**：需要返回值或异常捕获
- ⚠ **异常处理**：execute() 异常会直接打印，submit() 需 future.get() 才抛出

**记忆口诀**：execute 不返回，submit 有 Future

### 20. 如何监控线程池状态？

**核心答案**：通过 ThreadPoolExecutor 提供的监控方法获取线程池状态，并可自定义扩展 beforeExecute/afterExecute 等钩子方法。

**核心监控方法**：

```java
ThreadPoolExecutor executor = ...;

// 线程池状态
executor.getPoolSize();          // 当前线程数
executor.getActiveCount();       // 活动线程数
executor.getCorePoolSize();      // 核心线程数
executor.getMaximumPoolSize();   // 最大线程数
executor.getLargestPoolSize();   // 历史最大线程数

// 任务统计
executor.getTaskCount();         // 总任务数
executor.getCompletedTaskCount(); // 已完成任务数
executor.getQueue().size();      // 队列中任务数

// 线程池状态
executor.isShutdown();           // 是否关闭
executor.isTerminated();         // 是否终止
executor.isTerminating();        // 是否正在终止
```

**自定义监控（扩展 ThreadPoolExecutor）**：
```java
public class MonitoredThreadPool extends ThreadPoolExecutor {

    @Override
    protected void beforeExecute(Thread t, Runnable r) {
        super.beforeExecute(t, r);
        // 任务执行前监控
        log.info("任务开始: {}", r);
    }

    @Override
    protected void afterExecute(Runnable r, Throwable t) {
        super.afterExecute(r, t);
        // 任务执行后监控
        log.info("任务结束: {}, 异常: {}", r, t);
    }

    @Override
    protected void terminated() {
        super.terminated();
        // 线程池终止时监控
        log.info("线程池已关闭");
    }
}
```

**关键监控指标**：
- ✓ **线程数**：poolSize、activeCount
- ✓ **队列**：queue.size()
- ✓ **任务数**：taskCount、completedTaskCount
- ✓ **拒绝数**：自定义 RejectedExecutionHandler 统计

**记忆口诀**：线程数、队列长、任务数，三大指标要监控
