# Java 面试题

## 基础部分

### 1. Java 的基本数据类型有哪些？

Java 有 8 种基本数据类型：

- **整型**：byte (1字节)、short (2字节)、int (4字节)、long (8字节)
- **浮点型**：float (4字节)、double (8字节)
- **字符型**：char (2字节)
- **布尔型**：boolean (1字节)

### 2. == 和 equals() 的区别？

- `==`：比较的是两个对象的内存地址（引用）
- `equals()`：比较的是两个对象的内容是否相等

```java
String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1 == s2);        // false，不同对象
System.out.println(s1.equals(s2));   // true，内容相同
```

### 3. String、StringBuilder 和 StringBuffer 的区别？

- **String**：不可变类，线程安全，适合少量字符串操作
- **StringBuilder**：可变类，线程不安全，适合单线程大量字符串拼接
- **StringBuffer**：可变类，线程安全（方法加了 synchronized），适合多线程字符串拼接

性能：StringBuilder > StringBuffer > String

## 面向对象

### 4. 面向对象的三大特性？

1. **封装**：隐藏对象的属性和实现细节，对外提供公共访问方式
2. **继承**：子类继承父类的特征和行为，实现代码复用
3. **多态**：同一个行为具有多个不同表现形式
   - 编译时多态：方法重载（Overload）
   - 运行时多态：方法重写（Override）

### 5. 抽象类和接口的区别？

| 特性 | 抽象类 | 接口 |
|------|--------|------|
| 关键字 | abstract class | interface |
| 继承 | 单继承 | 多实现 |
| 成员变量 | 可以有任意修饰符 | 只能是 public static final |
| 方法 | 可以有抽象和非抽象方法 | JDK8前只有抽象方法，JDK8+可以有default和static方法 |
| 构造方法 | 可以有 | 不能有 |

## 集合框架

### 6. ArrayList 和 LinkedList 的区别？

- **ArrayList**：
  - 基于动态数组实现
  - 随机访问快，O(1)
  - 插入删除慢（需要移动元素），O(n)
  - 适合查询多的场景

- **LinkedList**：
  - 基于双向链表实现
  - 随机访问慢，O(n)
  - 插入删除快，O(1)
  - 适合增删多的场景

### 7. HashMap 的工作原理？

1. **数据结构**：数组 + 链表/红黑树（JDK8+）
2. **存储过程**：
   - 计算 key 的 hashCode
   - 通过 hash 算法得到数组索引
   - 如果没有碰撞直接放入数组
   - 如果碰撞，以链表形式存储
   - 链表长度超过8且数组长度>=64，转为红黑树

3. **扩容机制**：
   - 默认初始容量16，负载因子0.75
   - 当元素数量超过容量*负载因子时，扩容为原来的2倍

### 8. ConcurrentHashMap 的实现原理？

- **JDK7**：采用分段锁（Segment），将数据分成多段，每段一个锁
- **JDK8**：取消分段锁，使用 CAS + synchronized 控制并发
  - 数组+链表/红黑树结构
  - put 时对头节点加锁，减小锁粒度

## 多线程

### 9. 创建线程的几种方式？

1. **继承 Thread 类**
```java
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running");
    }
}
```

2. **实现 Runnable 接口**
```java
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable running");
    }
}
```

3. **实现 Callable 接口**（有返回值）
```java
class MyCallable implements Callable<String> {
    public String call() {
        return "Result";
    }
}
```

4. **使用线程池**
```java
ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(() -> System.out.println("Task"));
```

### 10. synchronized 和 ReentrantLock 的区别？

| 特性 | synchronized | ReentrantLock |
|------|--------------|---------------|
| 实现 | JVM 实现 | JDK 实现 |
| 锁类型 | 可重入、非公平 | 可重入、可公平 |
| 释放 | 自动释放 | 手动释放（必须在finally中） |
| 中断 | 不可中断 | 可中断（lockInterruptibly） |
| 尝试获取锁 | 不支持 | 支持（tryLock） |
| 条件队列 | 单个（wait/notify） | 多个（Condition） |

### 11. volatile 关键字的作用？

1. **保证可见性**：一个线程修改后，其他线程立即可见
2. **禁止指令重排序**：通过内存屏障实现
3. **不保证原子性**：i++ 操作不是原子的

应用场景：状态标志、双重检查锁定（DCL）

### 12. 线程池的核心参数？

```java
ThreadPoolExecutor(
    int corePoolSize,      // 核心线程数
    int maximumPoolSize,   // 最大线程数
    long keepAliveTime,    // 空闲线程存活时间
    TimeUnit unit,         // 时间单位
    BlockingQueue<Runnable> workQueue,  // 任务队列
    ThreadFactory threadFactory,        // 线程工厂
    RejectedExecutionHandler handler    // 拒绝策略
)
```

**执行流程**：
1. 线程数 < corePoolSize：创建新线程
2. 线程数 >= corePoolSize：加入队列
3. 队列满且线程数 < maximumPoolSize：创建新线程
4. 线程数 >= maximumPoolSize：执行拒绝策略

## JVM

### 13. Java 内存区域划分？

1. **线程共享**：
   - **堆（Heap）**：存放对象实例，GC 主要区域
   - **方法区（Method Area）**：存储类信息、常量、静态变量

2. **线程私有**：
   - **程序计数器（PC Register）**：记录当前线程执行的字节码行号
   - **虚拟机栈（VM Stack）**：存储局部变量表、操作数栈
   - **本地方法栈（Native Method Stack）**：为 Native 方法服务

### 14. 垃圾回收算法有哪些？

1. **标记-清除（Mark-Sweep）**：标记存活对象，清除未标记对象，产生碎片
2. **标记-复制（Mark-Copy）**：复制存活对象到另一块内存，清空原内存，浪费空间
3. **标记-整理（Mark-Compact）**：标记存活对象，移动到一端，清除边界外内存
4. **分代收集**：根据对象存活周期，采用不同算法

### 15. 常见的垃圾回收器？

- **Serial**：单线程，Stop The World
- **ParNew**：Serial 的多线程版本
- **Parallel Scavenge**：关注吞吐量
- **CMS**：关注停顿时间，采用标记-清除
- **G1**：面向大堆内存，可预测停顿时间
- **ZGC**：低延迟（< 10ms），适合大堆内存

## 常见问题

### 16. 什么是内存泄漏？如何避免？

**内存泄漏**：对象不再使用，但仍被引用，无法被 GC 回收。

**常见原因**：
- 静态集合类持有对象引用
- 监听器未注销
- 数据库连接未关闭
- ThreadLocal 使用后未清理

**避免方法**：
- 及时释放资源（使用 try-with-resources）
- 使用弱引用（WeakReference）
- 注意集合的使用
- 及时清理 ThreadLocal

### 17. 如何排查 OOM 问题？

1. **分析堆转储文件**：使用 jmap 生成 dump 文件
   ```bash
   jmap -dump:format=b,file=heap.hprof <pid>
   ```

2. **使用分析工具**：MAT、JProfiler 分析内存占用

3. **查看 GC 日志**：分析 GC 频率和耗时
   ```
   -XX:+PrintGCDetails -XX:+PrintGCTimeStamps
   ```

4. **监控指标**：堆内存使用率、GC 次数、Full GC 次数

### 18. 类加载机制和双亲委派模型？

**类加载过程**：加载 → 验证 → 准备 → 解析 → 初始化

**双亲委派模型**：
- 当类加载器收到加载请求时，先委托给父加载器
- 父加载器无法加载时，子加载器才尝试加载
- 保证 Java 核心库的安全性

**类加载器**：
1. Bootstrap ClassLoader：加载核心库
2. Extension ClassLoader：加载扩展库
3. Application ClassLoader：加载应用类路径
4. Custom ClassLoader：自定义加载器
