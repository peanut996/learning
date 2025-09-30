# Java Interview Questions

## Basics

### 1. What are the primitive data types in Java?

Java has 8 primitive data types:

- **Integer types**: byte (1 byte), short (2 bytes), int (4 bytes), long (8 bytes)
- **Floating-point types**: float (4 bytes), double (8 bytes)
- **Character type**: char (2 bytes)
- **Boolean type**: boolean (1 byte)

### 2. Difference between == and equals()?

- `==`: Compares memory addresses (references) of two objects
- `equals()`: Compares the content/values of two objects

```java
String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1 == s2);        // false, different objects
System.out.println(s1.equals(s2));   // true, same content
```

### 3. Difference between String, StringBuilder, and StringBuffer?

- **String**: Immutable, thread-safe, suitable for few string operations
- **StringBuilder**: Mutable, not thread-safe, suitable for single-threaded string concatenation
- **StringBuffer**: Mutable, thread-safe (synchronized methods), suitable for multi-threaded string concatenation

Performance: StringBuilder > StringBuffer > String

## Object-Oriented Programming

### 4. What are the three pillars of OOP?

1. **Encapsulation**: Hide object properties and implementation details, provide public access methods
2. **Inheritance**: Subclass inherits features and behaviors from parent class for code reuse
3. **Polymorphism**: Same behavior has multiple different forms
   - Compile-time polymorphism: Method overloading
   - Runtime polymorphism: Method overriding

### 5. Difference between Abstract Class and Interface?

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Keyword | abstract class | interface |
| Inheritance | Single inheritance | Multiple implementation |
| Member variables | Can have any modifiers | Only public static final |
| Methods | Can have both abstract and concrete methods | JDK8- only abstract, JDK8+ can have default and static methods |
| Constructor | Can have | Cannot have |

## Collections Framework

### 6. Difference between ArrayList and LinkedList?

- **ArrayList**:
  - Based on dynamic array
  - Fast random access, O(1)
  - Slow insertion/deletion (requires shifting elements), O(n)
  - Suitable for query-heavy scenarios

- **LinkedList**:
  - Based on doubly-linked list
  - Slow random access, O(n)
  - Fast insertion/deletion, O(1)
  - Suitable for modification-heavy scenarios

### 7. How does HashMap work?

1. **Data structure**: Array + LinkedList/Red-Black Tree (JDK8+)
2. **Storage process**:
   - Calculate key's hashCode
   - Get array index through hash algorithm
   - If no collision, store directly in array
   - If collision, store as linked list
   - When list length > 8 and array length >= 64, convert to red-black tree

3. **Resizing**:
   - Default initial capacity: 16, load factor: 0.75
   - When size exceeds capacity * load factor, resize to 2x

### 8. How does ConcurrentHashMap work?

- **JDK7**: Segment locking - data divided into segments, each with its own lock
- **JDK8**: Removed segment locking, uses CAS + synchronized for concurrency control
  - Array + LinkedList/Red-Black Tree structure
  - Lock head node during put operation to reduce lock granularity

## Multithreading

### 9. Ways to create threads?

1. **Extend Thread class**
```java
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running");
    }
}
```

2. **Implement Runnable interface**
```java
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable running");
    }
}
```

3. **Implement Callable interface** (with return value)
```java
class MyCallable implements Callable<String> {
    public String call() {
        return "Result";
    }
}
```

4. **Use thread pool**
```java
ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(() -> System.out.println("Task"));
```

### 10. Difference between synchronized and ReentrantLock?

| Feature | synchronized | ReentrantLock |
|---------|--------------|---------------|
| Implementation | JVM | JDK |
| Lock type | Reentrant, unfair | Reentrant, can be fair |
| Release | Automatic | Manual (must in finally) |
| Interruption | Not interruptible | Interruptible (lockInterruptibly) |
| Try lock | Not supported | Supported (tryLock) |
| Condition queue | Single (wait/notify) | Multiple (Condition) |

### 11. What does volatile keyword do?

1. **Visibility guarantee**: Changes made by one thread are immediately visible to others
2. **Prevents instruction reordering**: Implemented through memory barriers
3. **No atomicity guarantee**: i++ operation is not atomic

Use cases: Status flags, double-checked locking (DCL)

### 12. Core parameters of ThreadPoolExecutor?

```java
ThreadPoolExecutor(
    int corePoolSize,      // Core pool size
    int maximumPoolSize,   // Maximum pool size
    long keepAliveTime,    // Idle thread keep-alive time
    TimeUnit unit,         // Time unit
    BlockingQueue<Runnable> workQueue,  // Task queue
    ThreadFactory threadFactory,        // Thread factory
    RejectedExecutionHandler handler    // Rejection policy
)
```

**Execution flow**:
1. Threads < corePoolSize: Create new thread
2. Threads >= corePoolSize: Add to queue
3. Queue full and threads < maximumPoolSize: Create new thread
4. Threads >= maximumPoolSize: Execute rejection policy

## JVM

### 13. Java memory areas?

1. **Thread-shared**:
   - **Heap**: Stores object instances, main GC area
   - **Method Area**: Stores class info, constants, static variables

2. **Thread-private**:
   - **Program Counter (PC Register)**: Records current bytecode line number
   - **VM Stack**: Stores local variables, operand stack
   - **Native Method Stack**: Serves native methods

### 14. Garbage collection algorithms?

1. **Mark-Sweep**: Mark live objects, sweep unmarked ones, causes fragmentation
2. **Mark-Copy**: Copy live objects to another region, clear original, wastes space
3. **Mark-Compact**: Mark live objects, move to one end, clear boundary
4. **Generational Collection**: Use different algorithms based on object lifetime

### 15. Common garbage collectors?

- **Serial**: Single-threaded, Stop The World
- **ParNew**: Multi-threaded version of Serial
- **Parallel Scavenge**: Focuses on throughput
- **CMS**: Focuses on pause time, uses mark-sweep
- **G1**: For large heaps, predictable pause times
- **ZGC**: Low latency (< 10ms), suitable for large heaps

## Common Issues

### 16. What is memory leak? How to avoid?

**Memory leak**: Objects no longer used but still referenced, cannot be GC'd.

**Common causes**:
- Static collections holding object references
- Listeners not unregistered
- Database connections not closed
- ThreadLocal not cleaned after use

**Prevention**:
- Release resources timely (use try-with-resources)
- Use weak references (WeakReference)
- Be careful with collections
- Clean ThreadLocal promptly

### 17. How to troubleshoot OOM?

1. **Analyze heap dump**: Use jmap to generate dump file
   ```bash
   jmap -dump:format=b,file=heap.hprof <pid>
   ```

2. **Use analysis tools**: MAT, JProfiler to analyze memory usage

3. **Check GC logs**: Analyze GC frequency and duration
   ```
   -XX:+PrintGCDetails -XX:+PrintGCTimeStamps
   ```

4. **Monitor metrics**: Heap usage, GC count, Full GC count

### 18. Class loading mechanism and parent delegation model?

**Class loading process**: Loading → Verification → Preparation → Resolution → Initialization

**Parent Delegation Model**:
- When class loader receives loading request, delegate to parent loader first
- If parent cannot load, child loader tries
- Ensures security of Java core libraries

**Class loaders**:
1. Bootstrap ClassLoader: Loads core libraries
2. Extension ClassLoader: Loads extension libraries
3. Application ClassLoader: Loads application classpath
4. Custom ClassLoader: Custom loaders
