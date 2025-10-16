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
