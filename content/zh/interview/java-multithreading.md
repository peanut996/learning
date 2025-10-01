# Java 多线程和线程池面试题

## 多线程基础

### 1. 创建线程的几种方式？

**核心答案**：Java 中创建线程有 4 种主要方式。

**详细说明**：

1. **继承 Thread 类**
   - 直接继承 Thread 类并重写 run() 方法
   - 缺点：Java 单继承限制，无法继承其他类

2. **实现 Runnable 接口**
   - 实现 Runnable 接口的 run() 方法
   - 优点：避免单继承限制，可以实现多个接口
   - 推荐使用

3. **实现 Callable 接口**
   - 实现 Callable 接口的 call() 方法
   - 优点：可以有返回值，可以抛出异常
   - 需要配合 FutureTask 使用

4. **使用线程池**
   - 通过 ExecutorService 创建和管理线程
   - 优点：线程复用，避免频繁创建销毁线程
   - 生产环境推荐方式

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="150" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="85" text-anchor="middle" font-size="14" font-weight="bold">继承 Thread</text>
<text x="125" y="105" text-anchor="middle" font-size="12">class MyThread</text>
<text x="125" y="120" text-anchor="middle" font-size="12">extends Thread</text>
<rect x="250" y="50" width="150" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="325" y="85" text-anchor="middle" font-size="14" font-weight="bold">实现 Runnable</text>
<text x="325" y="105" text-anchor="middle" font-size="12">class MyRunnable</text>
<text x="325" y="120" text-anchor="middle" font-size="12">implements Runnable</text>
<rect x="450" y="50" width="150" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="525" y="85" text-anchor="middle" font-size="14" font-weight="bold">实现 Callable</text>
<text x="525" y="105" text-anchor="middle" font-size="12">class MyCallable</text>
<text x="525" y="120" text-anchor="middle" font-size="12">implements Callable</text>
<rect x="150" y="180" width="200" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="250" y="215" text-anchor="middle" font-size="14" font-weight="bold">使用线程池</text>
<text x="250" y="235" text-anchor="middle" font-size="12">ExecutorService</text>
<text x="250" y="250" text-anchor="middle" font-size="12">推荐生产环境使用</text>
<path d="M 125 130 L 125 160 L 200 160 L 200 180" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 325 130 L 325 160 L 280 160 L 280 180" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 525 130 L 525 160 L 300 160 L 300 180" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="50" y="310" font-size="13" font-weight="bold">特点对比：</text>
<text x="50" y="330" font-size="12">✓ Thread: 简单直接，但单继承限制</text>
<text x="50" y="350" font-size="12">✓ Runnable: 推荐，解耦任务和线程</text>
<text x="50" y="370" font-size="12">✓ Callable: 有返回值，可抛异常</text>
<text x="50" y="390" font-size="12">✓ 线程池: 最佳实践，资源复用</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**关键要点**：
- 日常开发优先使用 **Runnable** 接口（灵活性好）
- 需要返回值时使用 **Callable** 接口
- 生产环境必须使用 **线程池**（性能和资源管理）
- 避免直接继承 Thread 类（扩展性差）

### 2. 线程的生命周期和状态转换？

**核心答案**：Java 线程有 6 种状态，状态之间按特定规则转换。

**6 种线程状态**（Thread.State 枚举）：

1. **NEW**（新建）- 线程创建但未启动
2. **RUNNABLE**（可运行）- 正在运行或等待 CPU 调度
3. **BLOCKED**（阻塞）- 等待获取监视器锁
4. **WAITING**（等待）- 无限期等待其他线程操作
5. **TIMED_WAITING**（限时等待）- 在指定时间内等待
6. **TERMINATED**（终止）- 线程执行完毕

**状态转换图**：

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="350" y="20" width="100" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="50" text-anchor="middle" font-size="14" font-weight="bold">NEW</text>
<rect x="350" y="120" width="100" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="400" y="150" text-anchor="middle" font-size="14" font-weight="bold">RUNNABLE</text>
<rect x="100" y="220" width="120" height="50" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="160" y="250" text-anchor="middle" font-size="14" font-weight="bold">BLOCKED</text>
<rect x="340" y="220" width="120" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="250" text-anchor="middle" font-size="14" font-weight="bold">WAITING</text>
<rect x="580" y="220" width="160" height="50" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="660" y="250" text-anchor="middle" font-size="14" font-weight="bold">TIMED_WAITING</text>
<rect x="325" y="340" width="150" height="50" fill="#eceff1" stroke="#455a64" stroke-width="2" rx="5"/>
<text x="400" y="370" text-anchor="middle" font-size="14" font-weight="bold">TERMINATED</text>
<path d="M 400 70 L 400 120" stroke="#1976d2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="420" y="100" font-size="11" fill="#1976d2">start()</text>
<path d="M 350 145 L 220 220" stroke="#c62828" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="260" y="180" font-size="11" fill="#c62828">等待锁</text>
<path d="M 200 220 L 380 170" stroke="#388e3c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="280" y="195" font-size="11" fill="#388e3c">获得锁</text>
<path d="M 400 170 L 400 220" stroke="#f57c00" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="420" y="200" font-size="11" fill="#f57c00">wait()</text>
<path d="M 400 220 L 400 170" stroke="#388e3c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="320" y="200" font-size="11" fill="#388e3c">notify()</text>
<path d="M 450 145 L 630 220" stroke="#7b1fa2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="540" y="180" font-size="11" fill="#7b1fa2">sleep(n)</text>
<path d="M 640 220 L 430 170" stroke="#388e3c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="540" y="195" font-size="11" fill="#388e3c">时间到</text>
<path d="M 400 270 L 400 340" stroke="#455a64" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="420" y="310" font-size="11" fill="#455a64">run()结束</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
<text x="50" y="430" font-size="12" font-weight="bold">触发状态转换的关键方法：</text>
<text x="50" y="450" font-size="11">• start() - NEW → RUNNABLE</text>
<text x="50" y="470" font-size="11">• wait() - RUNNABLE → WAITING</text>
<text x="50" y="490" font-size="11">• sleep(n) - RUNNABLE → TIMED_WAITING</text>
<text x="350" y="450" font-size="11">• notify()/notifyAll() - WAITING → RUNNABLE</text>
<text x="350" y="470" font-size="11">• 获取锁 - BLOCKED → RUNNABLE</text>
<text x="350" y="490" font-size="11">• run()结束 - RUNNABLE → TERMINATED</text>
</svg>

**关键要点**：
- **NEW → RUNNABLE**：调用 `start()` 方法
- **RUNNABLE → BLOCKED**：等待获取 synchronized 锁
- **RUNNABLE → WAITING**：调用 `wait()`、`join()` 等方法
- **RUNNABLE → TIMED_WAITING**：调用 `sleep(n)`、`wait(n)` 等方法
- **TERMINATED** 是终点状态，不可逆转

**记忆技巧**：
- BLOCKED 专门用于**锁等待**
- WAITING 和 TIMED_WAITING 的区别在于**是否有超时时间**
- RUNNABLE 包含了操作系统的 Ready 和 Running 两种状态

### 3. 如何启动线程？start() 和 run() 的区别？

**核心答案**：必须调用 `start()` 启动线程，直接调用 `run()` 不会创建新线程。

**详细说明**：

**start() 方法**：
- 创建新的线程并启动
- JVM 会调用该线程的 `run()` 方法
- 只能调用一次，重复调用抛出 `IllegalThreadStateException`
- 线程状态：NEW → RUNNABLE

**run() 方法**：
- 仅仅是一个普通方法调用
- 在当前线程（主线程）中执行
- 不会创建新线程
- 可以多次调用

**对比图示**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="30" text-anchor="middle" font-size="16" font-weight="bold">start() vs run() 的区别</text>
<rect x="50" y="60" width="300" height="280" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="200" y="90" text-anchor="middle" font-size="14" font-weight="bold" fill="#388e3c">✓ 正确方式：thread.start()</text>
<rect x="80" y="110" width="100" height="40" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="130" y="135" text-anchor="middle" font-size="12">主线程</text>
<rect x="80" y="180" width="100" height="40" fill="#bbdefb" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="130" y="205" text-anchor="middle" font-size="12" font-weight="bold">新线程</text>
<path d="M 130 150 L 130 180" stroke="#1976d2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="150" y="170" font-size="11" fill="#1976d2">start()</text>
<rect x="220" y="180" width="100" height="40" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="270" y="200" text-anchor="middle" font-size="11">run() 方法</text>
<text x="270" y="215" text-anchor="middle" font-size="11">在新线程执行</text>
<path d="M 180 200 L 220 200" stroke="#f57c00" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="200" y="195" font-size="11" fill="#f57c00">调用</text>
<text x="200" y="270" text-anchor="middle" font-size="12" fill="#388e3c">• 创建新线程</text>
<text x="200" y="290" text-anchor="middle" font-size="12" fill="#388e3c">• 并发执行</text>
<text x="200" y="310" text-anchor="middle" font-size="12" fill="#388e3c">• 真正的多线程</text>
<rect x="450" y="60" width="300" height="280" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="600" y="90" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">✗ 错误方式：thread.run()</text>
<rect x="480" y="110" width="100" height="40" fill="#fff" stroke="#333" stroke-width="1" rx="3"/>
<text x="530" y="135" text-anchor="middle" font-size="12">主线程</text>
<rect x="620" y="180" width="100" height="40" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="670" y="200" text-anchor="middle" font-size="11">run() 方法</text>
<text x="670" y="215" text-anchor="middle" font-size="11">在主线程执行</text>
<path d="M 530 150 L 670 180" stroke="#c62828" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="600" y="160" font-size="11" fill="#c62828">run()</text>
<text x="480" y="250" font-size="12" fill="#c62828">没有新线程创建</text>
<text x="600" y="270" text-anchor="middle" font-size="12" fill="#c62828">• 不创建新线程</text>
<text x="600" y="290" text-anchor="middle" font-size="12" fill="#c62828">• 顺序执行</text>
<text x="600" y="310" text-anchor="middle" font-size="12" fill="#c62828">• 只是普通方法调用</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**关键要点**：
- ✓ **使用 start()**：启动新线程，实现真正的并发
- ✗ **直接调用 run()**：在当前线程执行，失去多线程意义
- `start()` 只能调用一次，重复调用会抛异常
- `start()` 方法内部会调用 native 的 `start0()` 方法

**记忆口诀**：start 启动线程，run 只是方法

### 4. sleep()、wait()、yield() 和 join() 的区别？

**核心答案**：四个方法的作用和使用场景完全不同。

**详细对比**：

| 方法 | 所属类 | 是否释放锁 | 用途 | 唤醒方式 |
|------|--------|-----------|------|---------|
| **sleep(n)** | Thread | ✗ 不释放 | 让线程休眠指定时间 | 时间到自动唤醒 |
| **wait()** | Object | ✓ 释放 | 线程间通信等待 | notify()/notifyAll() |
| **yield()** | Thread | ✗ 不释放 | 让出 CPU 给同优先级线程 | 立即重新竞争 |
| **join()** | Thread | ✗ 不释放 | 等待另一个线程结束 | 目标线程结束 |

**详细说明**：

**1. sleep(millis) - 线程休眠**
- 属于 `Thread` 类的静态方法
- 让当前线程暂停执行指定毫秒数
- **不释放持有的锁**
- 时间到后自动进入 RUNNABLE 状态
- 状态：RUNNABLE → TIMED_WAITING → RUNNABLE

**2. wait() - 等待通知**
- 属于 `Object` 类的方法
- 必须在 synchronized 块中使用
- **释放对象锁**，让其他线程可以获取锁
- 需要其他线程调用 notify()/notifyAll() 唤醒
- 状态：RUNNABLE → WAITING → RUNNABLE

**3. yield() - 让出 CPU**
- 属于 `Thread` 类的静态方法
- 提示调度器当前线程愿意让出 CPU
- **不释放锁**，只是让出 CPU 时间片
- 立即重新参与 CPU 竞争（可能立即又被调度）
- 仅作为一种"建议"，调度器可以忽略

**4. join() - 等待线程结束**
- 属于 `Thread` 类的实例方法
- 等待指定线程执行完毕
- **当前线程会阻塞**，但不释放锁
- 目标线程执行完毕后自动唤醒
- 状态：RUNNABLE → WAITING → RUNNABLE

**使用场景图示**：

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">四种方法的使用场景</text>
<rect x="50" y="50" width="160" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="130" y="75" text-anchor="middle" font-size="14" font-weight="bold">sleep(n)</text>
<text x="130" y="95" text-anchor="middle" font-size="11">场景：暂停执行</text>
<text x="130" y="115" text-anchor="middle" font-size="11">示例：定时任务</text>
<text x="130" y="135" text-anchor="middle" font-size="11">轮询等待</text>
<rect x="240" y="50" width="160" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="320" y="75" text-anchor="middle" font-size="14" font-weight="bold">wait()</text>
<text x="320" y="95" text-anchor="middle" font-size="11">场景：线程通信</text>
<text x="320" y="115" text-anchor="middle" font-size="11">示例：生产者消费者</text>
<text x="320" y="135" text-anchor="middle" font-size="11">条件等待</text>
<rect x="430" y="50" width="160" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="510" y="75" text-anchor="middle" font-size="14" font-weight="bold">yield()</text>
<text x="510" y="95" text-anchor="middle" font-size="11">场景：优化调度</text>
<text x="510" y="115" text-anchor="middle" font-size="11">示例：降低线程</text>
<text x="510" y="135" text-anchor="middle" font-size="11">优先级影响</text>
<rect x="620" y="50" width="160" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="700" y="75" text-anchor="middle" font-size="14" font-weight="bold">join()</text>
<text x="700" y="95" text-anchor="middle" font-size="11">场景：等待完成</text>
<text x="700" y="115" text-anchor="middle" font-size="11">示例：主线程等待</text>
<text x="700" y="135" text-anchor="middle" font-size="11">子线程结束</text>
<text x="50" y="180" font-size="13" font-weight="bold">关键区别：</text>
<rect x="50" y="190" width="730" height="40" fill="#fff9c4" stroke="#f57f17" stroke-width="1" rx="3"/>
<text x="60" y="210" font-size="12" font-weight="bold">是否释放锁：</text>
<text x="160" y="210" font-size="12">sleep() ✗ 不释放</text>
<text x="280" y="210" font-size="12">wait() ✓ 释放</text>
<text x="380" y="210" font-size="12">yield() ✗ 不释放</text>
<text x="500" y="210" font-size="12">join() ✗ 不释放</text>
<rect x="50" y="240" width="730" height="40" fill="#e1f5fe" stroke="#0277bd" stroke-width="1" rx="3"/>
<text x="60" y="260" font-size="12" font-weight="bold">所属类：</text>
<text x="160" y="260" font-size="12">sleep() → Thread</text>
<text x="300" y="260" font-size="12">wait() → Object</text>
<text x="430" y="260" font-size="12">yield() → Thread</text>
<text x="570" y="260" font-size="12">join() → Thread</text>
<text x="50" y="300" font-size="13" font-weight="bold">典型代码示例：</text>
<rect x="50" y="310" width="350" height="170" fill="#f5f5f5" stroke="#999" stroke-width="1" rx="3"/>
<text x="60" y="330" font-family="monospace" font-size="11">// sleep - 休眠1秒</text>
<text x="60" y="350" font-family="monospace" font-size="11">Thread.sleep(1000);</text>
<text x="60" y="380" font-family="monospace" font-size="11">// wait - 等待通知(需在synchronized中)</text>
<text x="60" y="400" font-family="monospace" font-size="11">synchronized(obj) { obj.wait(); }</text>
<text x="60" y="430" font-family="monospace" font-size="11">// yield - 让出CPU</text>
<text x="60" y="450" font-family="monospace" font-size="11">Thread.yield();</text>
<text x="60" y="470" font-family="monospace" font-size="11">// join - 等待t1线程结束</text>
<rect x="430" y="310" width="350" height="170" fill="#f5f5f5" stroke="#999" stroke-width="1" rx="3"/>
<text x="440" y="330" font-family="monospace" font-size="11">Thread t1 = new Thread(...);</text>
<text x="440" y="350" font-family="monospace" font-size="11">t1.start();</text>
<text x="440" y="370" font-family="monospace" font-size="11">t1.join(); // 等待t1执行完</text>
<text x="440" y="400" font-family="monospace" font-size="11">// notify - 唤醒wait的线程</text>
<text x="440" y="420" font-family="monospace" font-size="11">synchronized(obj) {</text>
<text x="440" y="440" font-family="monospace" font-size="11">  obj.notify();</text>
<text x="440" y="460" font-family="monospace" font-size="11">}</text>
</svg>

**关键要点**：
- **sleep** 不释放锁，指定时间后自动唤醒
- **wait** 释放锁，需要 notify 唤醒，用于线程通信
- **yield** 主动让出 CPU，但立即重新竞争
- **join** 等待目标线程结束，常用于主线程等待子线程

**记忆口诀**：sleep 睡觉不撒手（锁），wait 等待要放手（锁），yield 谦让一下下，join 等你来汇合

### 5. 如何中断线程？

**核心答案**：使用 `interrupt()` 方法发送中断信号,线程需要主动检查并响应中断。

**详细说明**：

Java 没有强制停止线程的安全方法，使用**协作式中断机制**：

**三个核心方法**：
1. **interrupt()** - 设置线程的中断标志位
2. **isInterrupted()** - 检查线程是否被中断（不清除标志）
3. **Thread.interrupted()** - 检查当前线程是否被中断（清除标志）

**中断机制图示**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">线程中断机制</text>
<rect x="50" y="50" width="150" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="125" y="75" text-anchor="middle" font-size="13" font-weight="bold">主线程</text>
<text x="125" y="95" text-anchor="middle" font-size="11">调用 interrupt()</text>
<rect x="350" y="50" width="150" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="425" y="75" text-anchor="middle" font-size="13" font-weight="bold">中断标志位</text>
<text x="425" y="95" text-anchor="middle" font-size="11">设置为 true</text>
<rect x="600" y="50" width="150" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="675" y="75" text-anchor="middle" font-size="13" font-weight="bold">目标线程</text>
<text x="675" y="95" text-anchor="middle" font-size="11">检查并响应</text>
<path d="M 200 80 L 350 80" stroke="#1976d2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="275" y="75" text-anchor="middle" font-size="11" fill="#1976d2">设置标志</text>
<path d="M 500 80 L 600 80" stroke="#f57c00" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="550" y="75" text-anchor="middle" font-size="11" fill="#f57c00">通知</text>
<text x="50" y="150" font-size="13" font-weight="bold">响应中断的两种情况：</text>
<rect x="50" y="165" width="350" height="210" fill="#f5f5f5" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="225" y="190" text-anchor="middle" font-size="13" font-weight="bold">情况1: 线程在运行中</text>
<text x="70" y="215" font-family="monospace" font-size="10">while (!Thread.interrupted()) {</text>
<text x="70" y="235" font-family="monospace" font-size="10">  // 执行任务</text>
<text x="70" y="255" font-family="monospace" font-size="10">}</text>
<text x="70" y="280" font-size="11" fill="#388e3c">✓ 主动检查 interrupted() 标志</text>
<text x="70" y="300" font-size="11" fill="#388e3c">✓ 检查到中断后优雅退出</text>
<text x="70" y="320" font-size="11" fill="#388e3c">✓ 可以清理资源</text>
<text x="70" y="345" font-size="11" fill="#666">适用场景：计算密集型任务</text>
<rect x="420" y="165" width="350" height="210" fill="#f5f5f5" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="595" y="190" text-anchor="middle" font-size="13" font-weight="bold">情况2: 线程在阻塞中</text>
<text x="440" y="215" font-family="monospace" font-size="10">try {</text>
<text x="440" y="235" font-family="monospace" font-size="10">  Thread.sleep(1000);</text>
<text x="440" y="255" font-family="monospace" font-size="10">} catch (InterruptedException e) {</text>
<text x="440" y="275" font-family="monospace" font-size="10">  // 响应中断</text>
<text x="440" y="295" font-family="monospace" font-size="10">}</text>
<text x="440" y="320" font-size="11" fill="#f57c00">✓ sleep/wait/join 会抛异常</text>
<text x="440" y="340" font-size="11" fill="#f57c00">✓ 捕获异常即是响应中断</text>
<text x="440" y="360" font-size="11" fill="#666">适用场景：IO 等待、sleep 等</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**关键要点**：

1. **不要使用 stop()**：已废弃，不安全（可能导致数据不一致）

2. **interrupted() vs isInterrupted()**：
   - `Thread.interrupted()`：静态方法，检查**当前线程**，会**清除**中断标志
   - `isInterrupted()`：实例方法，检查**目标线程**，**不清除**中断标志

3. **阻塞方法会抛出 InterruptedException**：
   - sleep()、wait()、join() 等方法
   - 抛出异常后会**清除中断标志**
   - 需要在 catch 块中决定如何响应

4. **最佳实践**：
   ```java
   // 方式1: 传递中断
   catch (InterruptedException e) {
       Thread.currentThread().interrupt(); // 恢复中断状态
       throw new RuntimeException(e);
   }

   // 方式2: 处理中断
   catch (InterruptedException e) {
       // 清理资源
       return; // 退出
   }
   ```

**记忆口诀**：interrupt 发信号，线程自己要检查，阻塞抛异常，运行查标志

### 6. 什么是守护线程？

**核心答案**：守护线程（Daemon Thread）是在后台提供服务的线程，当所有非守护线程结束时，JVM 会自动退出，不等待守护线程执行完毕。

**详细说明**：

**两类线程**：
1. **用户线程**（User Thread）- 默认类型，前台线程
2. **守护线程**（Daemon Thread）- 后台服务线程

**守护线程特点**：
- 为其他线程提供服务
- JVM 不会等待守护线程执行完毕
- 所有用户线程结束后，守护线程自动终止
- 必须在 `start()` 之前调用 `setDaemon(true)`

**对比图示**：

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">用户线程 vs 守护线程</text>
<rect x="50" y="50" width="320" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="210" y="80" text-anchor="middle" font-size="14" font-weight="bold">用户线程 (User Thread)</text>
<text x="70" y="110" font-size="12">特点：</text>
<text x="70" y="135" font-size="11">• JVM 会等待其执行完毕</text>
<text x="70" y="155" font-size="11">• 默认创建的都是用户线程</text>
<text x="70" y="175" font-size="11">• 主要执行业务逻辑</text>
<text x="70" y="195" font-size="11">• main 线程是用户线程</text>
<text x="70" y="215" font-size="11" fill="#1976d2" font-weight="bold">✓ JVM 等待执行完成</text>
<rect x="430" y="50" width="320" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="590" y="80" text-anchor="middle" font-size="14" font-weight="bold">守护线程 (Daemon Thread)</text>
<text x="450" y="110" font-size="12">特点：</text>
<text x="450" y="135" font-size="11">• JVM 不等待其执行完毕</text>
<text x="450" y="155" font-size="11">• 需要手动设置 setDaemon(true)</text>
<text x="450" y="175" font-size="11">• 提供后台服务</text>
<text x="450" y="195" font-size="11">• GC 线程是守护线程</text>
<text x="450" y="215" font-size="11" fill="#f57c00" font-weight="bold">✓ 用户线程结束即终止</text>
<text x="50" y="260" font-size="13" font-weight="bold">执行流程对比：</text>
<rect x="50" y="275" width="700" height="150" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<line x1="100" y1="300" x2="100" y2="400" stroke="#333" stroke-width="2"/>
<line x1="100" y1="400" x2="700" y2="400" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
<text x="720" y="405" font-size="11">时间</text>
<rect x="120" y="310" width="150" height="30" fill="#1976d2" stroke="#0d47a1" stroke-width="1" rx="3"/>
<text x="195" y="330" text-anchor="middle" font-size="11" fill="#fff">主线程（用户线程）</text>
<rect x="120" y="350" width="200" height="30" fill="#4caf50" stroke="#2e7d32" stroke-width="1" rx="3"/>
<text x="220" y="370" text-anchor="middle" font-size="11" fill="#fff">子线程（用户线程）</text>
<rect x="120" y="390" width="400" height="2" fill="#f57c00"/>
<text x="540" y="395" font-size="11" fill="#f57c00">守护线程（被终止）</text>
<path d="M 270 340 L 270 350" stroke="#c62828" stroke-width="3" stroke-dasharray="5,5"/>
<text x="275" y="345" font-size="10" fill="#c62828">主线程结束</text>
<path d="M 320 380 L 320 390" stroke="#c62828" stroke-width="3" stroke-dasharray="5,5"/>
<text x="325" y="385" font-size="10" fill="#c62828">所有用户线程结束</text>
<text x="325" y="395" font-size="10" fill="#c62828" font-weight="bold">→ JVM 退出</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**典型应用场景**：
- **垃圾回收线程**（GC）- JVM 内置
- **日志异步写入**
- **监控统计**
- **心跳检测**
- **定时任务调度**

**使用示例**：
```java
Thread daemonThread = new Thread(() -> {
    while (true) {
        // 后台任务
    }
});
daemonThread.setDaemon(true);  // 必须在 start() 之前设置
daemonThread.start();
```

**关键要点**：
- ✓ **守护线程不影响 JVM 退出**
- ✗ **不能用于重要任务**（可能未执行完就被终止）
- ⚠ **必须在 start() 前设置**，否则抛出 IllegalThreadStateException
- ⚠ **守护线程创建的子线程默认也是守护线程**

**记忆口诀**：守护线程像保安，主人走了就下班（JVM 退出守护线程立即终止）

### 7. 什么是 ThreadLocal？

**核心答案**：ThreadLocal 是线程局部变量，为每个线程提供独立的变量副本，实现线程间数据隔离。

**详细说明**：

ThreadLocal 提供了线程级别的变量存储，每个线程都有自己的独立副本，互不干扰。

**核心特点**：
- 每个线程有自己的变量副本
- 线程间数据完全隔离
- 避免了线程安全问题
- 常用于保存线程上下文信息

**工作原理图示**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">ThreadLocal 工作原理</text>
<rect x="50" y="60" width="200" height="120" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="150" y="90" text-anchor="middle" font-size="14" font-weight="bold">ThreadLocal 变量</text>
<circle cx="150" cy="130" r="30" fill="#1976d2" stroke="#0d47a1" stroke-width="2"/>
<text x="150" y="140" text-anchor="middle" font-size="12" fill="#fff" font-weight="bold">TL</text>
<rect x="300" y="60" width="150" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="375" y="85" text-anchor="middle" font-size="13" font-weight="bold">线程 A</text>
<rect x="320" y="100" width="110" height="40" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="375" y="115" text-anchor="middle" font-size="11">变量副本 A</text>
<text x="375" y="130" text-anchor="middle" font-size="11" fill="#388e3c">value = "A"</text>
<rect x="500" y="60" width="150" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="575" y="85" text-anchor="middle" font-size="13" font-weight="bold">线程 B</text>
<rect x="520" y="100" width="110" height="40" fill="#fff" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="575" y="115" text-anchor="middle" font-size="11">变量副本 B</text>
<text x="575" y="130" text-anchor="middle" font-size="11" fill="#f57c00">value = "B"</text>
<rect x="300" y="200" width="150" height="100" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="5"/>
<text x="375" y="225" text-anchor="middle" font-size="13" font-weight="bold">线程 C</text>
<rect x="320" y="240" width="110" height="40" fill="#fff" stroke="#7b1fa2" stroke-width="1" rx="3"/>
<text x="375" y="255" text-anchor="middle" font-size="11">变量副本 C</text>
<text x="375" y="270" text-anchor="middle" font-size="11" fill="#7b1fa2">value = "C"</text>
<path d="M 180 130 L 300 120" stroke="#388e3c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 180 130 L 500 120" stroke="#f57c00" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 150 160 L 320 240" stroke="#7b1fa2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="240" y="115" font-size="10" fill="#388e3c">get/set</text>
<text x="340" y="115" font-size="10" fill="#f57c00">get/set</text>
<text x="220" y="210" font-size="10" fill="#7b1fa2">get/set</text>
<text x="50" y="340" font-size="13" font-weight="bold">关键概念：</text>
<text x="50" y="365" font-size="12">• 每个线程访问同一个 ThreadLocal 变量</text>
<text x="50" y="385" font-size="12">• 但实际获取的是该线程自己的副本</text>
<text x="450" y="365" font-size="12" fill="#388e3c">✓ 线程间完全隔离</text>
<text x="450" y="385" font-size="12" fill="#388e3c">✓ 无需同步</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**典型使用场景**：

1. **数据库连接管理**
   - 每个线程独立的数据库连接

2. **用户会话信息**
   - Web 应用中保存当前请求的用户信息

3. **事务上下文**
   - Spring 的事务管理

4. **日期格式化**
   - SimpleDateFormat 线程不安全，用 ThreadLocal 包装

**基本用法**：
```java
// 创建 ThreadLocal
private static ThreadLocal<String> threadLocal = new ThreadLocal<>();

// 设置值
threadLocal.set("Hello");

// 获取值
String value = threadLocal.get();

// 删除值（重要！）
threadLocal.remove();
```

**关键要点**：
- ✓ **线程隔离**：每个线程有独立副本
- ✓ **无需同步**：避免了锁竞争
- ⚠ **必须 remove()**：防止内存泄漏（特别是线程池场景）
- ⚠ **不能实现线程间数据共享**：仅用于线程内部

**记忆口诀**：ThreadLocal 一人一份，各自独立互不扰

### 8. ThreadLocal 的实现原理？

**核心答案**：ThreadLocal 通过在每个 Thread 对象中维护一个 ThreadLocalMap 来存储线程私有数据，key 是 ThreadLocal 对象，value 是线程私有值。

**详细说明**：

**数据结构关系**：

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">ThreadLocal 实现原理</text>
<rect x="50" y="60" width="180" height="180" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="140" y="85" text-anchor="middle" font-size="14" font-weight="bold">Thread 对象</text>
<text x="70" y="110" font-size="11" font-family="monospace">threadLocals</text>
<rect x="70" y="120" width="140" height="100" fill="#fff" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="140" y="140" text-anchor="middle" font-size="12" font-weight="bold">ThreadLocalMap</text>
<text x="80" y="165" font-size="10" font-family="monospace">Entry[] table</text>
<rect x="80" y="175" width="120" height="30" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="2"/>
<text x="90" y="195" font-size="9">key: ThreadLocal</text>
<text x="90" y="210" font-size="9">value: Object</text>
<rect x="280" y="60" width="180" height="180" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="370" y="85" text-anchor="middle" font-size="14" font-weight="bold">ThreadLocal</text>
<text x="290" y="110" font-size="11">方法：</text>
<text x="290" y="135" font-size="10" font-family="monospace">set(T value)</text>
<text x="290" y="155" font-size="10" font-family="monospace">get()</text>
<text x="290" y="175" font-size="10" font-family="monospace">remove()</text>
<text x="290" y="210" font-size="10" fill="#666">作为 Map 的 key</text>
<rect x="510" y="60" width="240" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="630" y="85" text-anchor="middle" font-size="14" font-weight="bold">ThreadLocalMap.Entry</text>
<text x="520" y="110" font-size="11">继承自 WeakReference</text>
<rect x="530" y="125" width="200" height="100" fill="#fff" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="540" y="145" font-size="10" font-family="monospace">WeakReference&lt;ThreadLocal&gt;</text>
<text x="540" y="165" font-size="10" fill="#c62828">↑ 弱引用 key</text>
<text x="540" y="185" font-size="10" font-family="monospace">Object value</text>
<text x="540" y="205" font-size="10" fill="#388e3c">↑ 强引用 value</text>
<path d="M 230 170 L 280 170" stroke="#1976d2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="245" y="165" font-size="9" fill="#1976d2">引用</text>
<path d="M 210 180 L 510 150" stroke="#f57c00" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="350" y="150" font-size="9" fill="#f57c00">Entry 引用</text>
<text x="50" y="270" font-size="13" font-weight="bold">核心流程：</text>
<rect x="50" y="285" width="700" height="190" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="70" y="310" font-size="12" font-weight="bold">1. set(value) 流程：</text>
<text x="80" y="330" font-size="11">① 获取当前线程 Thread.currentThread()</text>
<text x="80" y="350" font-size="11">② 获取该线程的 ThreadLocalMap (thread.threadLocals)</text>
<text x="80" y="370" font-size="11">③ 以当前 ThreadLocal 为 key，value 为值存入 Map</text>
<text x="420" y="310" font-size="12" font-weight="bold">2. get() 流程：</text>
<text x="430" y="330" font-size="11">① 获取当前线程</text>
<text x="430" y="350" font-size="11">② 获取该线程的 ThreadLocalMap</text>
<text x="430" y="370" font-size="11">③ 以当前 ThreadLocal 为 key 查找值</text>
<text x="70" y="405" font-size="12" font-weight="bold">3. 为什么数据隔离？</text>
<text x="80" y="425" font-size="11" fill="#388e3c">• 每个 Thread 对象有自己独立的 ThreadLocalMap</text>
<text x="80" y="445" font-size="11" fill="#388e3c">• 访问时永远从当前线程获取 Map，自然隔离</text>
<text x="80" y="465" font-size="11" fill="#388e3c">• 同一个 ThreadLocal 在不同线程的 Map 中有不同的 value</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**关键设计点**：

1. **存储位置**：
   - 数据存在 Thread 对象中，不是 ThreadLocal 中
   - 每个线程有独立的 ThreadLocalMap

2. **Entry 使用弱引用**：
   - key (ThreadLocal) 是弱引用
   - value 是强引用
   - 避免 ThreadLocal 无法被回收

3. **Hash 冲突解决**：
   - 使用**开放地址法**（线性探测）
   - 不是链表法

**关键要点**：
- ✓ **数据在 Thread 中**：不是 ThreadLocal 中
- ✓ **key 用弱引用**：防止 ThreadLocal 对象无法回收
- ✓ **开放地址法**：解决 hash 冲突
- ⚠ **Entry 的 value 是强引用**：可能导致内存泄漏

**记忆口诀**：数据藏线程，ThreadLocal 当钥匙，弱引用做 key，开放地址解冲突

### 9. ThreadLocal 内存泄漏问题？

**核心答案**：ThreadLocal 可能导致内存泄漏，因为 Entry 的 value 是强引用，即使 ThreadLocal 被回收，value 仍可能无法释放，必须主动调用 `remove()` 清理。

**详细说明**：

**内存泄漏产生原因**：

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">ThreadLocal 内存泄漏机制</text>
<rect x="50" y="50" width="700" height="220" fill="#fff9c4" stroke="#f57f17" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">问题场景：线程池复用线程</text>
<rect x="80" y="90" width="200" height="160" fill="#fff" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="180" y="115" text-anchor="middle" font-size="13" font-weight="bold">Thread（长期存活）</text>
<rect x="100" y="130" width="160" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="1" rx="3"/>
<text x="180" y="150" text-anchor="middle" font-size="12">ThreadLocalMap</text>
<rect x="110" y="160" width="140" height="50" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="2"/>
<text x="120" y="180" font-size="10">key: null</text>
<text x="120" y="195" font-size="10" fill="#c62828" font-weight="bold">value: 大对象 ⚠</text>
<text x="120" y="210" font-size="9" fill="#666">(无法被 GC)</text>
<rect x="350" y="90" width="180" height="160" fill="#fff" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="440" y="115" text-anchor="middle" font-size="13" font-weight="bold">ThreadLocal 对象</text>
<rect x="370" y="130" width="140" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="3"/>
<text x="440" y="155" text-anchor="middle" font-size="11">已被 GC 回收</text>
<path d="M 280 190 L 350 150" stroke="#666" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
<text x="300" y="165" font-size="10" fill="#c62828">弱引用被回收</text>
<text x="300" y="180" font-size="10" fill="#c62828">key → null</text>
<rect x="580" y="90" width="150" height="160" fill="#fff" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="655" y="115" text-anchor="middle" font-size="13" font-weight="bold">大对象</text>
<rect x="600" y="130" width="110" height="100" fill="#fff3e0" stroke="#f57c00" stroke-width="1" rx="3"/>
<text x="655" y="155" text-anchor="middle" font-size="11">仍被强引用</text>
<text x="655" y="175" text-anchor="middle" font-size="11" fill="#c62828">无法被 GC</text>
<text x="655" y="195" text-anchor="middle" font-size="11" fill="#c62828">造成内存泄漏</text>
<path d="M 250 185 L 580 185" stroke="#f57c00" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
<text x="400" y="175" font-size="11" fill="#f57c00" font-weight="bold">强引用</text>
<text x="60" y="290" font-size="13" font-weight="bold">内存泄漏的三个条件：</text>
<rect x="60" y="305" width="680" height="80" fill="#ffebee" stroke="#c62828" stroke-width="1" rx="5"/>
<text x="80" y="330" font-size="12">① <text font-weight="bold">ThreadLocal 对象被回收</text> → Entry 的 key 变为 null（弱引用）</text>
<text x="80" y="355" font-size="12">② <text font-weight="bold">线程长期存活</text> → 线程池复用线程，Thread 对象不被回收</text>
<text x="80" y="380" font-size="12">③ <text font-weight="bold">没有调用 remove()</text> → value 的强引用一直存在，导致大对象无法回收</text>
<text x="60" y="410" font-size="13" font-weight="bold">解决方案：</text>
<rect x="60" y="425" width="330" height="100" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="225" y="450" text-anchor="middle" font-size="13" font-weight="bold" fill="#388e3c">✓ 最佳实践</text>
<text x="80" y="475" font-size="11">1. 使用完后<text font-weight="bold" fill="#388e3c">立即调用 remove()</text></text>
<text x="80" y="495" font-size="11">2. 使用 try-finally 确保清理</text>
<text x="80" y="515" font-size="11">3. 避免存储大对象</text>
<rect x="410" y="425" width="330" height="100" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="575" y="450" text-anchor="middle" font-size="13" font-weight="bold" fill="#1976d2">⚠ 自动清理机制</text>
<text x="430" y="475" font-size="11">• get/set 时会清理 key 为 null 的 Entry</text>
<text x="430" y="495" font-size="11">• 但<text fill="#c62828" font-weight="bold">不保证及时清理</text></text>
<text x="430" y="515" font-size="11">• <text fill="#c62828" font-weight="bold">必须主动 remove()</text></text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**标准使用模式**：
```java
ThreadLocal<Connection> threadLocal = new ThreadLocal<>();

try {
    // 设置值
    threadLocal.set(connection);

    // 使用值
    threadLocal.get().execute(sql);

} finally {
    // 必须清理！
    threadLocal.remove();
}
```

**关键要点**：
- ⚠ **线程池场景高风险**：线程复用导致 ThreadLocalMap 长期存活
- ✓ **必须主动 remove()**：不能依赖自动清理机制
- ✓ **使用 try-finally**：确保异常时也能清理
- ⚠ **key 为 null 不代表无泄漏**：value 仍被强引用

**为什么用弱引用做 key？**
- 如果用强引用，ThreadLocal 对象永远无法回收
- 弱引用至少能让 ThreadLocal 被回收
- 但 value 仍需手动清理

**记忆口诀**：线程池复用线程长寿命，ThreadLocal 必须 remove 防泄漏

### 10. InheritableThreadLocal 是什么？

**核心答案**：InheritableThreadLocal 是 ThreadLocal 的子类，允许子线程继承父线程的 ThreadLocal 值。

**详细说明**：

普通 ThreadLocal 的值在线程间完全隔离，子线程无法访问父线程的 ThreadLocal 值。InheritableThreadLocal 解决了这个问题。

**对比图示**：

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">ThreadLocal vs InheritableThreadLocal</text>
<rect x="50" y="50" width="330" height="180" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="215" y="80" text-anchor="middle" font-size="14" font-weight="bold" fill="#c62828">ThreadLocal (不继承)</text>
<rect x="80" y="100" width="120" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="140" y="125" text-anchor="middle" font-size="12" font-weight="bold">父线程</text>
<text x="140" y="145" text-anchor="middle" font-size="11">value = "Parent"</text>
<rect x="230" y="100" width="120" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="290" y="125" text-anchor="middle" font-size="12" font-weight="bold">子线程</text>
<text x="290" y="145" text-anchor="middle" font-size="11" fill="#c62828">value = null ✗</text>
<path d="M 200 130 L 230 130" stroke="#c62828" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
<text x="215" y="125" text-anchor="middle" font-size="10" fill="#c62828">✗</text>
<text x="80" y="190" font-size="11" fill="#c62828">• 子线程无法访问父线程的值</text>
<text x="80" y="210" font-size="11" fill="#c62828">• 每个线程完全独立</text>
<rect x="420" y="50" width="330" height="180" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="585" y="80" text-anchor="middle" font-size="14" font-weight="bold" fill="#388e3c">InheritableThreadLocal (继承)</text>
<rect x="450" y="100" width="120" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="3"/>
<text x="510" y="125" text-anchor="middle" font-size="12" font-weight="bold">父线程</text>
<text x="510" y="145" text-anchor="middle" font-size="11">value = "Parent"</text>
<rect x="600" y="100" width="120" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="3"/>
<text x="660" y="125" text-anchor="middle" font-size="12" font-weight="bold">子线程</text>
<text x="660" y="145" text-anchor="middle" font-size="11" fill="#388e3c">value = "Parent" ✓</text>
<path d="M 570 130 L 600 130" stroke="#388e3c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="585" y="125" text-anchor="middle" font-size="10" fill="#388e3c">继承</text>
<text x="450" y="190" font-size="11" fill="#388e3c">• 子线程自动继承父线程的值</text>
<text x="450" y="210" font-size="11" fill="#388e3c">• 创建子线程时复制</text>
<text x="50" y="260" font-size="13" font-weight="bold">实现原理：</text>
<rect x="50" y="275" width="700" height="160" fill="#f5f5f5" stroke="#666" stroke-width="1" rx="5"/>
<text x="70" y="300" font-size="12" font-weight="bold">Thread 类中的两个变量：</text>
<text x="80" y="325" font-size="11" font-family="monospace">ThreadLocal.ThreadLocalMap threadLocals;          // 普通 ThreadLocal</text>
<text x="80" y="350" font-size="11" font-family="monospace">ThreadLocal.ThreadLocalMap inheritableThreadLocals; // 可继承的 ThreadLocal</text>
<text x="70" y="380" font-size="12" font-weight="bold">继承时机：</text>
<text x="80" y="405" font-size="11">在创建子线程时 (Thread 构造方法)，如果父线程的 inheritableThreadLocals 不为 null，</text>
<text x="80" y="425" font-size="11">则将父线程的 inheritableThreadLocals <text fill="#388e3c" font-weight="bold">复制</text> 一份给子线程</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
</svg>

**使用场景**：
- **链路追踪**：TraceId 在父子线程间传递
- **用户上下文传递**：主线程的用户信息传递给子线程
- **权限信息传递**：子线程需要父线程的权限上下文

**基本用法**：
```java
// 创建 InheritableThreadLocal
private static InheritableThreadLocal<String> context = new InheritableThreadLocal<>();

// 父线程设置值
context.set("父线程的值");

// 创建子线程
new Thread(() -> {
    // 子线程可以直接获取父线程的值
    String value = context.get(); // 输出: "父线程的值"
}).start();
```

**关键要点**：
- ✓ **自动继承**：子线程创建时自动复制父线程的值
- ✓ **独立修改**：子线程修改不影响父线程
- ⚠ **线程池失效**：线程池复用线程，无法继承新任务的父线程值
- ⚠ **仍需 remove()**：防止内存泄漏

**线程池场景的问题**：
- 线程池中的线程是复用的
- InheritableThreadLocal 只在线程**创建时**继承
- 提交新任务时，线程已存在，不会重新继承

**解决方案**：使用阿里的 **TransmittableThreadLocal** (TTL)

**记忆口诀**：Inheritable 父传子，线程创建时复制，线程池需用 TTL

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

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">线程池执行流程</text>
<rect x="300" y="50" width="200" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5"/>
<text x="400" y="85" text-anchor="middle" font-size="14" font-weight="bold">提交任务</text>
<rect x="300" y="140" width="200" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="165" text-anchor="middle" font-size="12">线程数 &lt; corePoolSize?</text>
<text x="400" y="185" text-anchor="middle" font-size="11">(当前线程数 &lt; 核心线程数)</text>
<rect x="50" y="240" width="180" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="140" y="265" text-anchor="middle" font-size="12" font-weight="bold">创建核心线程</text>
<text x="140" y="285" text-anchor="middle" font-size="11">执行任务</text>
<rect x="310" y="240" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="400" y="265" text-anchor="middle" font-size="12">队列是否已满?</text>
<text x="400" y="285" text-anchor="middle" font-size="11">(workQueue.offer)</text>
<rect x="260" y="340" width="120" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="320" y="365" text-anchor="middle" font-size="12" font-weight="bold">加入队列</text>
<text x="320" y="385" text-anchor="middle" font-size="11">等待执行</text>
<rect x="420" y="340" width="180" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="510" y="365" text-anchor="middle" font-size="11">线程数 &lt; maximumPoolSize?</text>
<text x="510" y="385" text-anchor="middle" font-size="11">(当前 &lt; 最大线程数)</text>
<rect x="420" y="440" width="180" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5"/>
<text x="510" y="465" text-anchor="middle" font-size="12" font-weight="bold">创建非核心线程</text>
<text x="510" y="485" text-anchor="middle" font-size="11">执行任务</text>
<rect x="640" y="440" width="140" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="710" y="465" text-anchor="middle" font-size="12" font-weight="bold">执行拒绝策略</text>
<text x="710" y="485" text-anchor="middle" font-size="11">handler.reject</text>
<path d="M 400 110 L 400 140" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<path d="M 300 170 L 140 240" stroke="#388e3c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="200" y="210" font-size="11" fill="#388e3c" font-weight="bold">是</text>
<path d="M 400 200 L 400 240" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="420" y="225" font-size="11" fill="#666" font-weight="bold">否</text>
<path d="M 310 270 L 230 270" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="270" y="265" font-size="11" fill="#666">否</text>
<path d="M 400 300 L 320 340" stroke="#388e3c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="350" y="325" font-size="11" fill="#388e3c" font-weight="bold">否</text>
<path d="M 490 270 L 510 340" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="515" y="310" font-size="11" fill="#666" font-weight="bold">是</text>
<path d="M 510 400 L 510 440" stroke="#388e3c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="530" y="425" font-size="11" fill="#388e3c" font-weight="bold">是</text>
<path d="M 600 370 L 710 440" stroke="#c62828" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
<text x="670" y="410" font-size="11" fill="#c62828" font-weight="bold">否</text>
<defs>
<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L0,6 L9,3 z" fill="#666"/>
</marker>
</defs>
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

## Future 和 CompletableFuture

### 21. Future 的作用？

**核心答案**：Future 代表异步计算的结果，可以获取任务执行结果、取消任务、判断任务是否完成。

**核心方法**：
- `get()`：阻塞获取结果
- `get(timeout, unit)`：超时获取
- `cancel(boolean)`：取消任务
- `isDone()`：是否完成
- `isCancelled()`：是否取消

**使用示例**：
```java
ExecutorService executor = Executors.newFixedThreadPool(1);

Future<String> future = executor.submit(() -> {
    Thread.sleep(1000);
    return "任务结果";
});

// 阻塞获取结果
String result = future.get(); // 阻塞直到任务完成

// 超时获取
String result = future.get(2, TimeUnit.SECONDS); // 最多等2秒

// 取消任务
future.cancel(true);
```

**关键要点**：
- ✓ **异步获取结果**：不阻塞主线程提交任务
- ⚠ **get() 阻塞**：调用 get() 会阻塞当前线程
- ✓ **超时控制**：get(timeout) 避免无限等待
- ⚠ **异常处理**：get() 抛出 ExecutionException

**记忆口诀**：Future 异步返回，get 阻塞获取

### 22. Future 的局限性？

**核心答案**：Future 只能被动获取结果、不支持组合、不支持回调，无法满足复杂异步编程需求。

**5 大局限性**：

1. **无法主动获取结果**
   - 只能通过 get() 阻塞等待
   - 无法主动通知

2. **不支持回调**
   - 无法在任务完成时自动执行后续操作
   - 必须主动调用 get()

3. **不支持多个 Future 组合**
   - 无法组合多个异步任务
   - 如：等待所有任务完成、任意一个完成等

4. **不支持异常处理**
   - 异常封装在 Future 中
   - 必须 try-catch get()

5. **无法链式调用**
   - 不支持任务编排
   - 无法实现复杂的异步流程

**对比 CompletableFuture**：
CompletableFuture 解决了 Future 的所有局限性。

**记忆口诀**：Future 太被动，组合回调都不行

### 23. CompletableFuture 是什么？

**核心答案**：CompletableFuture 是 Java 8 引入的增强版 Future，支持回调、组合、链式调用，实现强大的异步编程能力。

**核心特性**：
- ✓ **主动完成**：手动设置结果
- ✓ **回调通知**：任务完成自动触发
- ✓ **组合编排**：多任务编排（all/any）
- ✓ **链式调用**：流式 API
- ✓ **异常处理**：优雅的异常处理

**创建 CompletableFuture**：
```java
// 1. 无返回值异步任务
CompletableFuture.runAsync(() -> {
    // 异步执行
});

// 2. 有返回值异步任务
CompletableFuture.supplyAsync(() -> {
    return "结果";
});

// 3. 手动创建并完成
CompletableFuture<String> future = new CompletableFuture<>();
future.complete("手动设置结果");
```

**关键要点**：
- ✓ **异步执行**：runAsync、supplyAsync
- ✓ **手动完成**：complete()
- ✓ **默认线程池**：ForkJoinPool.commonPool()
- ✓ **自定义线程池**：提供 Executor 参数

**记忆口诀**：CompletableFuture 功能强，回调组合链式调

### 24. CompletableFuture 的常用方法？

**核心答案**：CompletableFuture 提供丰富的方法用于任务编排、结果转换、组合、异常处理。

**常用方法分类**：

**1. 任务编排**：
```java
// thenApply - 转换结果
future.thenApply(result -> result.toUpperCase());

// thenAccept - 消费结果（无返回值）
future.thenAccept(result -> System.out.println(result));

// thenRun - 执行后续任务（不依赖结果）
future.thenRun(() -> System.out.println("完成"));
```

**2. 多任务组合**：
```java
// thenCombine - 两个任务都完成后合并结果
future1.thenCombine(future2, (r1, r2) -> r1 + r2);

// thenCompose - 任务链式依赖
future.thenCompose(r -> CompletableFuture.supplyAsync(() -> r + "2"));

// allOf - 等待所有任务完成
CompletableFuture.allOf(f1, f2, f3);

// anyOf - 任意一个任务完成
CompletableFuture.anyOf(f1, f2, f3);
```

**3. 异步后缀**：
```java
// Async 后缀 - 异步执行（使用线程池）
future.thenApplyAsync(r -> r.toUpperCase());
future.thenApplyAsync(r -> r.toUpperCase(), executor);
```

**方法命名规律**：
- **then**：任务完成后
- **Async**：异步执行
- **Apply**：有返回值
- **Accept**：无返回值（消费）
- **Run**：不依赖前置结果

**记忆口诀**：then 之后做，Async 异步跑，Apply 有返回，Accept 来消费

### 25. CompletableFuture 如何处理异常？

**核心答案**：CompletableFuture 提供 exceptionally、handle、whenComplete 三种异常处理方式。

**3 种异常处理方法**：

```java
// 1. exceptionally - 异常时返回默认值
CompletableFuture.supplyAsync(() -> {
    if (true) throw new RuntimeException("错误");
    return "正常结果";
}).exceptionally(ex -> {
    System.err.println("异常: " + ex.getMessage());
    return "默认值"; // 异常时的返回值
});

// 2. handle - 统一处理正常和异常
CompletableFuture.supplyAsync(() -> {
    if (true) throw new RuntimeException("错误");
    return "正常结果";
}).handle((result, ex) -> {
    if (ex != null) {
        return "异常返回: " + ex.getMessage();
    }
    return result;
});

// 3. whenComplete - 不改变结果，只执行额外逻辑
CompletableFuture.supplyAsync(() -> "结果")
.whenComplete((result, ex) -> {
    if (ex != null) {
        System.err.println("异常: " + ex);
    } else {
        System.out.println("成功: " + result);
    }
    // 不改变结果，原结果继续传递
});
```

**对比表**：

| 方法 | 能否改变结果 | 参数 | 使用场景 |
|------|------------|------|---------|
| **exceptionally** | ✓ 是 | Throwable | 异常时返回默认值 |
| **handle** | ✓ 是 | result, Throwable | 统一处理正常和异常 |
| **whenComplete** | ✗ 否 | result, Throwable | 记录日志、清理资源 |

**关键要点**：
- ✓ **exceptionally**：异常时提供默认值
- ✓ **handle**：最灵活，统一处理
- ✓ **whenComplete**：不改变结果，适合日志/清理
- ⚠ **异常传播**：未处理的异常会传递给下游

**记忆口诀**：exceptionally 默认值，handle 能改变，whenComplete 只旁观

## 其他问题

### 26. 什么是 ForkJoinPool？

**核心答案**：ForkJoinPool 是专为分治任务设计的线程池，采用工作窃取算法，将大任务拆分（Fork）成小任务并行执行，最后合并（Join）结果。

**核心概念**：
- **Fork**：将大任务分解成小任务
- **Join**：等待小任务完成并合并结果
- **工作窃取**：空闲线程窃取其他线程的任务

**典型使用场景**：
- 归并排序
- 大数组求和
- 并行流（Stream API）

**基本使用**：
```java
// 继承 RecursiveTask (有返回值) 或 RecursiveAction (无返回值)
class SumTask extends RecursiveTask<Long> {
    private long[] array;
    private int start, end;
    private static final int THRESHOLD = 1000; // 阈值

    @Override
    protected Long compute() {
        if (end - start <= THRESHOLD) {
            // 任务足够小，直接计算
            long sum = 0;
            for (int i = start; i < end; i++) {
                sum += array[i];
            }
            return sum;
        } else {
            // 任务太大，分解
            int mid = (start + end) / 2;
            SumTask left = new SumTask(array, start, mid);
            SumTask right = new SumTask(array, mid, end);

            left.fork();  // Fork 左任务
            right.fork(); // Fork 右任务

            return left.join() + right.join(); // Join 合并结果
        }
    }
}

// 使用
ForkJoinPool pool = new ForkJoinPool();
Long result = pool.invoke(new SumTask(array, 0, array.length));
```

**关键要点**：
- ✓ **分治思想**：大任务拆分成小任务
- ✓ **工作窃取**：提高CPU利用率
- ✓ **递归计算**：适合递归分治算法
- ⚠ **不适合IO任务**：仅适合CPU密集型

**记忆口诀**：Fork 拆分任务，Join 合并结果，工作窃取提效率

### 27. ForkJoinPool 和 ThreadPoolExecutor 的区别？

**核心答案**：ForkJoinPool 专为分治任务设计，采用工作窃取；ThreadPoolExecutor 通用线程池，适合独立任务。

**详细对比**：

| 对比项 | ForkJoinPool | ThreadPoolExecutor |
|-------|-------------|-------------------|
| **设计目的** | 分治任务（递归） | 通用异步任务 |
| **任务类型** | ForkJoinTask（可拆分） | Runnable/Callable |
| **队列** | 双端队列（每个线程一个） | 单个共享队列 |
| **调度策略** | 工作窃取算法 | 队列调度 |
| **适用场景** | CPU密集型分治任务 | 通用异步任务 |
| **典型应用** | 并行流、归并排序 | Web请求处理、异步任务 |

**关键要点**：
- ✓ **ForkJoin**：分治+窃取，适合递归计算
- ✓ **ThreadPool**：通用线程池，适合独立任务
- ⚠ **不要混用**：各有所长

**记忆口诀**：ForkJoin 分而治之，ThreadPool 通用任务

### 28. 什么是工作窃取算法？

**核心答案**：工作窃取（Work Stealing）是一种任务调度算法，空闲线程从其他繁忙线程的任务队列尾部"窃取"任务执行，提高CPU利用率。

**工作原理**：

1. **每个线程维护自己的双端队列**
2. **线程从队列头部取任务**（LIFO）
3. **空闲线程从其他队列尾部窃取任务**（FIFO）
4. **减少竞争**：头尾不同方向

**为什么要窃取**：
- 任务执行时间不均匀
- 某些线程空闲，某些线程繁忙
- 平衡负载，提高CPU利用率

**双端队列的妙处**：
- 自己从头部取（LIFO）：保持热缓存
- 别人从尾部窃（FIFO）：减少竞争

**关键要点**：
- ✓ **负载均衡**：自动平衡任务
- ✓ **减少竞争**：双端队列设计巧妙
- ✓ **提高利用率**：避免线程空闲
- ⚠ **窃取开销**：有一定性能开销

**记忆口诀**：双端队列各取一端，窃取任务平衡负载

### 29. 如何实现一个简单的线程池？

**核心答案**：实现线程池需要任务队列、工作线程数组、线程管理（创建、复用、销毁）。

**简化版实现**：

```java
public class SimpleThreadPool {
    private final BlockingQueue<Runnable> taskQueue;
    private final List<WorkerThread> workers;
    private volatile boolean isRunning = true;

    public SimpleThreadPool(int poolSize, int queueCapacity) {
        taskQueue = new ArrayBlockingQueue<>(queueCapacity);
        workers = new ArrayList<>(poolSize);

        // 创建工作线程
        for (int i = 0; i < poolSize; i++) {
            WorkerThread worker = new WorkerThread();
            workers.add(worker);
            worker.start();
        }
    }

    // 提交任务
    public void execute(Runnable task) {
        if (!isRunning) {
            throw new IllegalStateException("线程池已关闭");
        }
        try {
            taskQueue.put(task); // 阻塞直到队列有空间
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // 关闭线程池
    public void shutdown() {
        isRunning = false;
        for (WorkerThread worker : workers) {
            worker.interrupt(); // 中断工作线程
        }
    }

    // 工作线程
    private class WorkerThread extends Thread {
        @Override
        public void run() {
            while (isRunning || !taskQueue.isEmpty()) {
                try {
                    Runnable task = taskQueue.poll(1, TimeUnit.SECONDS);
                    if (task != null) {
                        task.run(); // 执行任务
                    }
                } catch (InterruptedException e) {
                    // 线程被中断，退出
                    break;
                }
            }
        }
    }
}
```

**核心要素**：
1. **任务队列**：BlockingQueue 存储待执行任务
2. **工作线程**：循环从队列取任务执行
3. **线程管理**：创建、复用、销毁线程
4. **状态控制**：isRunning 控制运行状态

**关键要点**：
- ✓ **阻塞队列**：线程安全的任务队列
- ✓ **线程复用**：工作线程循环取任务
- ✓ **优雅关闭**：等待任务完成后关闭
- ⚠ **简化版**：缺少很多功能（拒绝策略、监控等）

**记忆口诀**：队列存任务，线程循环取，复用提性能

### 30. 线程池使用中有哪些注意事项？

**核心答案**：合理设置参数、使用有界队列、自定义线程工厂、监控告警、优雅关闭、避免使用 Executors。

**关键注意事项**：

**1. 禁止使用 Executors 创建线程池**
- ⚠ **强制规约**：阿里巴巴 Java 开发手册
- ✓ **推荐**：手动创建 ThreadPoolExecutor

**2. 合理设置核心参数**
```java
// 推荐配置
new ThreadPoolExecutor(
    corePoolSize,           // 根据任务类型计算
    maximumPoolSize,        // 略大于核心线程数
    60L,                    // 存活时间
    TimeUnit.SECONDS,
    new ArrayBlockingQueue<>(1000),  // 有界队列！
    new CustomThreadFactory(),       // 自定义线程工厂
    new AbortPolicy()               // 明确拒绝策略
);
```

**3. 必须使用有界队列**
- ⚠ **无界队列风险**：可能导致 OOM
- ✓ **推荐**：ArrayBlockingQueue、LinkedBlockingQueue(指定容量)

**4. 自定义线程工厂**
```java
new ThreadFactory() {
    private AtomicInteger counter = new AtomicInteger(0);

    @Override
    public Thread newThread(Runnable r) {
        Thread thread = new Thread(r);
        thread.setName("MyPool-" + counter.incrementAndGet());
        thread.setUncaughtExceptionHandler((t, e) -> {
            log.error("线程异常: {}", t.getName(), e);
        });
        return thread;
    }
}
```

**5. 监控线程池状态**
- ✓ **定期监控**：线程数、队列大小、任务数
- ✓ **告警机制**：队列堆积、拒绝率告警

**6. 优雅关闭**
```java
// 先 shutdown，超时再 shutdownNow
executor.shutdown();
if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
    executor.shutdownNow();
}
```

**7. 异常处理**
- ⚠ **execute() 异常**：直接打印，可能丢失
- ✓ **submit() + Future.get()**：捕获异常
- ✓ **自定义 afterExecute()**：统一处理

**8. 避免任务相互依赖**
- ⚠ **死锁风险**：任务A等待任务B，但B在队列中
- ✓ **独立任务**：任务之间不要相互等待

**9. 线程池隔离**
- ✓ **不同业务使用不同线程池**
- ⚠ **避免共享**：防止相互影响

**10. 及时 remove() ThreadLocal**
- ⚠ **内存泄漏**：线程池复用线程，ThreadLocal不清理会泄漏
- ✓ **必须 remove()**：任务结束后清理

**关键要点**：
- ⚠ **禁用 Executors**：遵循阿里规约
- ✓ **有界队列**：防止 OOM
- ✓ **监控告警**：及时发现问题
- ✓ **优雅关闭**：避免任务丢失
- ✓ **清理 ThreadLocal**：防止内存泄漏

**记忆口诀**：禁用Executors，有界队列防OOM，监控告警优雅关，ThreadLocal要清理
