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
