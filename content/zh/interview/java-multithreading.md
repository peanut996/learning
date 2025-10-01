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

## 线程池

### 11. 为什么使用线程池？

### 12. 线程池的核心参数？

### 13. 线程池的执行流程？

### 14. 线程池的拒绝策略有哪些？

### 15. 常见的线程池有哪些？

### 16. FixedThreadPool 和 CachedThreadPool 的区别？

### 17. 如何合理设置线程池大小？

### 18. 线程池如何优雅关闭？shutdown() 和 shutdownNow() 的区别？

### 19. execute() 和 submit() 的区别？

### 20. 如何监控线程池状态？

## Future 和 CompletableFuture

### 21. Future 的作用？

### 22. Future 的局限性？

### 23. CompletableFuture 是什么？

### 24. CompletableFuture 的常用方法？

### 25. CompletableFuture 如何处理异常？

## 其他问题

### 26. 什么是 ForkJoinPool？

### 27. ForkJoinPool 和 ThreadPoolExecutor 的区别？

### 28. 什么是工作窃取算法？

### 29. 如何实现一个简单的线程池？

### 30. 线程池使用中有哪些注意事项？
