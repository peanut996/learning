## Queue

### 21. Queue 和 Deque 的区别？

**Queue（队列）：**
- 单向队列，FIFO（先进先出）
- 只能从队尾添加，队头删除
- 主要方法：`offer()`, `poll()`, `peek()`

**Deque（双端队列）：**
- 双向队列，两端都可操作
- 可作为队列（FIFO）或栈（LIFO）使用
- 主要方法：`offerFirst/Last()`, `pollFirst/Last()`, `peekFirst/Last()`

**关系：**
- Deque 继承 Queue
- Deque 功能更强大，可替代 Queue 和 Stack

**常用实现类：**
- **Queue**：LinkedList, ArrayDeque, PriorityQueue
- **Deque**：ArrayDeque, LinkedList

**记忆要点：**
- **Queue 单向** —— FIFO，一端进一端出
- **Deque 双向** —— 两端都可进出，可当栈用
- **ArrayDeque 推荐** —— 比 LinkedList 快，比 Stack 好

### 22. ArrayDeque 和 LinkedList 的区别？

| 特性 | ArrayDeque | LinkedList |
|------|-----------|------------|
| **底层结构** | 循环数组 | 双向链表 |
| **随机访问** | 不支持（没有 get(index)） | 支持但慢 O(n) |
| **头尾操作** | O(1) | O(1) |
| **内存占用** | 连续内存，缓存友好 | 额外存储指针 |
| **扩容** | 需要复制数组 | 不需要 |
| **性能** | 更快 | 较慢 |
| **null 元素** | 不允许 | 允许 |

**ArrayDeque 优势：**
- 基于数组，缓存局部性好
- 无需额外指针，内存效率高
- 作为栈和队列性能都更好

**选择建议：**
- **ArrayDeque**：实现栈/队列的首选
- **LinkedList**：需要在中间插入删除时使用

**记忆要点：**
- **ArrayDeque 更快** —— 循环数组，缓存友好
- **不允许 null** —— ArrayDeque 的限制
- **替代 Stack** —— ArrayDeque 性能更好

### 23. PriorityQueue 的实现原理？

**核心原理：**
PriorityQueue 基于 **二叉堆**（完全二叉树）实现，默认**小顶堆**（最小元素在堆顶）。

**底层结构：**
- 使用**数组**存储堆
- 逻辑上是完全二叉树
- 父节点索引 = `(i-1)/2`，左子节点 = `2*i+1`，右子节点 = `2*i+2`

**关键特性：**
- **优先级排序**：每次取出最小（或最大）元素
- **不允许 null**：无法比较
- **非线程安全**
- **时间复杂度**：插入 O(log n)，取出 O(log n)，查看堆顶 O(1)

**排序方式：**
1. **自然排序**：元素实现 Comparable
2. **自定义排序**：传入 Comparator（如实现大顶堆）

**常用方法：**
- `offer(e)`：插入元素
- `poll()`：取出并删除堆顶元素
- `peek()`：查看堆顶元素（不删除）

**应用场景：**
- Top K 问题
- 任务调度（优先级队列）
- Dijkstra 算法

**记忆要点：**
- **二叉堆实现** —— 数组存储，O(log n) 操作
- **默认小顶堆** —— 最小元素优先出队
- **Top K 问题** —— 经典应用

### 24. BlockingQueue 有哪些实现类？

**主要实现类：**

**1. ArrayBlockingQueue**
- 底层：**有界数组**
- 锁：一把 ReentrantLock
- 特点：FIFO，容量固定

**2. LinkedBlockingQueue**
- 底层：**有界链表**（默认 Integer.MAX_VALUE）
- 锁：两把锁（takeLock, putLock）
- 特点：FIFO，吞吐量高

**3. PriorityBlockingQueue**
- 底层：**无界二叉堆**
- 特点：优先级排序，支持扩容

**4. DelayQueue**
- 底层：PriorityQueue + 延迟获取
- 特点：元素到期后才能取出

**5. SynchronousQueue**
- 底层：无存储空间
- 特点：直接传递，生产者必须等待消费者

**6. LinkedTransferQueue**
- 底层：链表
- 特点：transfer() 方法，更高效

**记忆要点：**
- **ArrayBlockingQueue** —— 有界数组，一把锁
- **LinkedBlockingQueue** —— 有界链表，两把锁，吞吐量高
- **生产者-消费者** —— BlockingQueue 典型应用

### 25. ArrayBlockingQueue 和 LinkedBlockingQueue 的区别？

| 特性 | ArrayBlockingQueue | LinkedBlockingQueue |
|------|-------------------|---------------------|
| **底层结构** | 数组 | 链表 |
| **容量** | 必须指定，有界 | 可选（默认 Integer.MAX_VALUE） |
| **锁** | 一把 ReentrantLock | 两把锁（takeLock, putLock） |
| **并发度** | 读写互斥 | 读写可并发 |
| **内存占用** | 固定，预分配 | 动态分配，节点对象 |
| **性能** | 写入快（无对象创建） | 吞吐量高（读写分离） |

**ArrayBlockingQueue：**
- 适合：已知容量上限，内存敏感
- 缺点：读写互斥，并发度低

**LinkedBlockingQueue：**
- 适合：高吞吐量场景
- 优点：读写分离，并发度高
- 缺点：每个元素需额外节点对象

**选择建议：**
- **高吞吐量** → LinkedBlockingQueue
- **固定容量、低内存** → ArrayBlockingQueue
- **线程池** → LinkedBlockingQueue（Executors 默认使用）

**记忆要点：**
- **Array 一把锁** —— 读写互斥
- **Linked 两把锁** —— 读写分离，吞吐量高
- **线程池默认** —— LinkedBlockingQueue
