## 其他问题

### 26. 什么是快速失败（fail-fast）？

**定义：**
快速失败（fail-fast）是一种错误检测机制，当检测到集合在迭代过程中被修改时，立即抛出 `ConcurrentModificationException`。

**实现原理：**
- 集合维护一个 `modCount`（修改计数器）
- 每次结构性修改（add/remove）时 `modCount++`
- 迭代器创建时记录 `expectedModCount = modCount`
- 每次迭代检查：`if (modCount != expectedModCount) throw ConcurrentModificationException`

**触发场景：**
```java
List<String> list = new ArrayList<>();
for (String s : list) {
    list.remove(s); // 抛出 ConcurrentModificationException
}
```

**解决方案：**
1. 使用迭代器的 remove() 方法
2. 使用并发集合（如 CopyOnWriteArrayList）
3. 使用传统 for 循环（从后往前删除）

**记忆要点：**
- **modCount 检测** —— 修改计数器不一致抛异常
- **遍历时不可修改** —— 使用迭代器的 remove()
- **非线程安全** —— 单线程也会触发（遍历时修改）

### 27. 什么是安全失败（fail-safe）？

**定义：**
安全失败（fail-safe）是在迭代时操作集合的副本，不会抛出 `ConcurrentModificationException`。

**实现原理：**
- 迭代时使用集合的快照/副本
- 修改不影响正在进行的迭代
- 不检查 modCount

**典型实现：**
- `CopyOnWriteArrayList`
- `CopyOnWriteArraySet`
- `ConcurrentHashMap`

**特点：**
- **线程安全**：允许并发修改
- **弱一致性**：迭代器看到的可能不是最新数据
- **内存开销**：需要复制数据（CopyOnWrite）

**fail-fast vs fail-safe：**

| 特性 | fail-fast | fail-safe |
|------|-----------|-----------|
| **异常** | 抛出 ConcurrentModificationException | 不抛异常 |
| **数据** | 原集合 | 集合副本/快照 |
| **一致性** | 强一致 | 弱一致（最终一致） |
| **性能** | 快 | 慢（复制开销） |
| **代表** | ArrayList, HashMap | CopyOnWriteArrayList, ConcurrentHashMap |

**记忆要点：**
- **fail-safe 不抛异常** —— 操作副本，允许并发修改
- **弱一致性** —— 可能读到旧数据
- **CopyOnWrite** —— 典型 fail-safe 实现

### 28. Iterator 和 ListIterator 的区别？

| 特性 | Iterator | ListIterator |
|------|----------|--------------|
| **适用范围** | 所有 Collection | 仅 List |
| **遍历方向** | 单向（向后） | 双向（向前/向后） |
| **方法** | hasNext(), next(), remove() | 继承 Iterator，增加 hasPrevious(), previous(), add(), set() |
| **添加元素** | 不支持 | 支持 add() |
| **修改元素** | 不支持 | 支持 set() |
| **索引** | 无 | nextIndex(), previousIndex() |

**Iterator 示例：**
```java
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    it.remove(); // 只能删除
}
```

**ListIterator 示例：**
```java
ListIterator<String> lit = list.listIterator();
while (lit.hasNext()) {
    String s = lit.next();
    lit.set("new"); // 可以修改
    lit.add("add"); // 可以添加
}
while (lit.hasPrevious()) { // 可以反向遍历
    lit.previous();
}
```

**记忆要点：**
- **Iterator 通用单向** —— 所有集合，只能向后
- **ListIterator 双向增强** —— 仅 List，支持双向+增删改
- **List 专用** —— ListIterator 功能更强大

### 29. Comparable 和 Comparator 的区别？

| 特性 | Comparable | Comparator |
|------|------------|------------|
| **位置** | 内部排序（修改类） | 外部排序（不修改类） |
| **方法** | `int compareTo(T o)` | `int compare(T o1, T o2)` |
| **包** | java.lang | java.util |
| **使用** | 类实现接口 | 创建比较器对象 |
| **灵活性** | 固定一种排序 | 可定义多种排序 |

**Comparable 示例（自然排序）：**
```java
class Student implements Comparable<Student> {
    int age;
    @Override
    public int compareTo(Student o) {
        return this.age - o.age; // 按年龄升序
    }
}
Collections.sort(list); // 使用 compareTo
```

**Comparator 示例（自定义排序）：**
```java
// 按姓名排序
Comparator<Student> nameComparator = (s1, s2) -> s1.name.compareTo(s2.name);
Collections.sort(list, nameComparator);

// 按年龄降序
Comparator<Student> ageComparator = (s1, s2) -> s2.age - s1.age;
Collections.sort(list, ageComparator);
```

**使用场景：**
- **Comparable**：类有明确的默认排序规则（如学号、ID）
- **Comparator**：需要多种排序方式，或无法修改类代码

**记忆要点：**
- **Comparable 内部一种** —— compareTo，修改类，固定排序
- **Comparator 外部多种** —— compare，灵活排序
- **策略模式** —— Comparator 是策略模式的应用

### 30. 如何实现集合的线程安全？

**主要方法：**

**1. 使用并发集合（推荐）**
- **CopyOnWriteArrayList**：读多写少的 List
- **CopyOnWriteArraySet**：读多写少的 Set
- **ConcurrentHashMap**：高并发 Map
- **ConcurrentSkipListMap**：有序 Map
- **BlockingQueue 系列**：生产者-消费者

**2. Collections 同步包装**
```java
List<String> list = Collections.synchronizedList(new ArrayList<>());
Set<String> set = Collections.synchronizedSet(new HashSet<>());
Map<String, String> map = Collections.synchronizedMap(new HashMap<>());
```
- 优点：简单方便
- 缺点：性能差（方法级锁），遍历时需手动同步

**3. 手动加锁**
```java
List<String> list = new ArrayList<>();
ReentrantLock lock = new ReentrantLock();

lock.lock();
try {
    list.add("item");
} finally {
    lock.unlock();
}
```

**性能对比：**
1. **并发集合**：最快（细粒度锁、无锁读）
2. **手动加锁**：中等（可控制粒度）
3. **synchronized 包装**：最慢（粗粒度锁）

**选择建议：**
- **List**：
  - 读多写少 → CopyOnWriteArrayList
  - 一般并发 → Collections.synchronizedList
- **Map**：
  - 高并发 → ConcurrentHashMap
  - 一般并发 → Collections.synchronizedMap
- **Queue**：
  - 生产者-消费者 → BlockingQueue 系列

**记忆要点：**
- **优先并发集合** —— ConcurrentHashMap, CopyOnWriteArrayList
- **避免 synchronized 包装** —— 性能差
- **遍历需同步** —— synchronizedXxx 遍历时需额外加锁
