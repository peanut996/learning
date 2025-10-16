## 单例模式

### 22. 双重检查锁定（DCL）为什么要使用 volatile？

**核心答案**：防止指令重排序导致其他线程看到未完全初始化的对象。

**详细说明**：

**不使用 volatile 的 DCL 问题**：

```java
public class Singleton {
    private static Singleton instance;  // 没有 volatile！

    public static Singleton getInstance() {
        if (instance == null) {              // ① 第一次检查
            synchronized (Singleton.class) {
                if (instance == null) {      // ② 第二次检查
                    instance = new Singleton();  // ③ 问题所在！
                }
            }
        }
        return instance;
    }
}
```

**问题分析**：

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="16" font-weight="bold">DCL 指令重排序问题</text>
<rect x="50" y="60" width="700" height="220" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5"/>
<text x="70" y="90" font-size="13" font-weight="bold">new Singleton() 的三个步骤：</text>
<text x="90" y="120" font-family="monospace" font-size="11">1. memory = allocate();    // 分配内存空间</text>
<text x="90" y="145" font-family="monospace" font-size="11">2. ctorInstance(memory);   // 初始化对象</text>
<text x="90" y="170" font-family="monospace" font-size="11">3. instance = memory;      // 设置引用指向内存</text>
<text x="70" y="205" font-size="11" fill="#f57c00" font-weight="bold">⚠️ 可能重排序为：1 → 3 → 2</text>
<text x="90" y="230" font-family="monospace" font-size="11" fill="#d32f2f">1. memory = allocate();</text>
<text x="90" y="255" font-family="monospace" font-size="11" fill="#d32f2f">3. instance = memory;      // instance != null 但未初始化！</text>
<rect x="50" y="300" width="700" height="220" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5"/>
<text x="70" y="330" font-size="13" font-weight="bold" fill="#d32f2f">❌ 多线程问题场景：</text>
<text x="90" y="360" font-size="11" fill="#388e3c" font-weight="bold">线程 A：</text>
<text x="110" y="380" font-size="10">1. 执行 new Singleton()</text>
<text x="110" y="400" font-size="10">2. 分配内存</text>
<text x="110" y="420" font-size="10" fill="#d32f2f">3. instance = memory（未初始化！）</text>
<text x="90" y="455" font-size="11" fill="#f57c00" font-weight="bold">线程 B：</text>
<text x="110" y="475" font-size="10">1. 检查 instance != null（✓）</text>
<text x="110" y="495" font-size="10" fill="#d32f2f" font-weight="bold">2. 返回 instance（使用未初始化对象，NPE！）</text>
</svg>

**使用 volatile 的正确 DCL**：

```java
public class Singleton {
    private static volatile Singleton instance;  // 加 volatile！

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                    // volatile 禁止重排序：
                    // 1. 分配内存
                    // 2. 初始化对象
                    // 3. 设置引用
                    // 保证 2 在 3 之前完成
                }
            }
        }
        return instance;
    }
}
```

**volatile 的作用**：
1. **禁止重排序**：保证初始化完成后才设置引用
2. **保证可见性**：一个线程的修改对其他线程立即可见
3. **happens-before**：初始化 happens-before 引用赋值

**关键要点**：
- ✗ **无 volatile**：可能返回未初始化对象
- ✓ **有 volatile**：禁止重排序，保证初始化完成
- ✓ **happens-before**：初始化 hb 引用赋值
- ⚠ **性能**：volatile 有一定开销

**记忆口诀**：DCL 要加 volatile，禁止重排保初始化，引用赋值在最后，线程安全才可靠

### 23. 不使用 volatile 的 DCL 有什么问题？

**核心答案**：会因为指令重排序返回未完全初始化的对象，导致 NullPointerException 或其他异常。

**详细说明**：

**核心问题**：对象实例化的三个步骤可能被重排序

**问题表现**：
1. **返回半初始化对象**：对象内存已分配，但字段未初始化
2. **NullPointerException**：访问对象字段时抛出异常
3. **数据不一致**：使用到未初始化的字段值

**具体示例**：

```java
public class Singleton {
    private int field = 100;  // 实例字段

    private static Singleton instance;  // 没有 volatile

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }

    public int getField() {
        return field;
    }
}

// 线程 A 创建实例时发生重排序：
// 1. 分配内存
// 2. instance 指向内存（field 还是默认值 0）
// 3. 初始化 field = 100

// 线程 B 获取实例：
Singleton s = Singleton.getInstance();  // instance != null
int value = s.getField();  // 可能得到 0 而不是 100！
```

**问题发生条件**：
1. 多线程并发访问
2. 没有使用 volatile
3. JVM 或 CPU 进行了指令重排序
4. 恰好在重排序的时间窗口内访问

**解决方案对比**：

| 方案 | 优点 | 缺点 |
|-----|------|------|
| **加 volatile** | 简单，性能好 | 需要 JDK 1.5+ |
| **静态内部类** | 懒加载，线程安全 | 不能传参数 |
| **枚举单例** | 最安全，防反序列化 | 不能懒加载 |

**关键要点**：
- ✗ **问题**：返回未初始化对象
- ✗ **后果**：NPE 或数据不一致
- ✓ **原因**：指令重排序
- ✓ **解决**：使用 volatile 或其他方案

**记忆口诀**：DCL 无 volatile 有风险，半初始化对象被返回，字段未赋值访问异常，volatile 禁重排保安全

### 24. 如何实现线程安全的单例模式？

**核心答案**：可以使用饿汉式、DCL、静态内部类、枚举等方式实现线程安全的单例。

**详细说明**：

**五种线程安全的单例实现**：

```java
// 1. 饿汉式（类加载时初始化）
public class Singleton1 {
    private static final Singleton1 INSTANCE = new Singleton1();

    private Singleton1() {}

    public static Singleton1 getInstance() {
        return INSTANCE;
    }
}
// 优点：简单，天然线程安全
// 缺点：不支持懒加载，可能浪费内存

// 2. DCL（双重检查锁定）
public class Singleton2 {
    private static volatile Singleton2 instance;

    private Singleton2() {}

    public static Singleton2 getInstance() {
        if (instance == null) {
            synchronized (Singleton2.class) {
                if (instance == null) {
                    instance = new Singleton2();
                }
            }
        }
        return instance;
    }
}
// 优点：懒加载，性能好
// 缺点：代码复杂，需要 volatile

// 3. 静态内部类（推荐）
public class Singleton3 {
    private Singleton3() {}

    private static class Holder {
        private static final Singleton3 INSTANCE = new Singleton3();
    }

    public static Singleton3 getInstance() {
        return Holder.INSTANCE;
    }
}
// 优点：懒加载，线程安全，简洁
// 缺点：不能传参数

// 4. 枚举单例（最安全，推荐）
public enum Singleton4 {
    INSTANCE;

    public void doSomething() {
        // ...
    }
}
// 优点：线程安全，防止反序列化和反射攻击
// 缺点：不支持懒加载

// 5. 同步方法（不推荐，性能差）
public class Singleton5 {
    private static Singleton5 instance;

    private Singleton5() {}

    public static synchronized Singleton5 getInstance() {
        if (instance == null) {
            instance = new Singleton5();
        }
        return instance;
    }
}
// 优点：简单，线程安全
// 缺点：性能差，每次获取都要同步
```

**方案对比**：

| 方案 | 懒加载 | 线程安全 | 性能 | 推荐度 |
|-----|-------|---------|------|--------|
| **饿汉式** | ✗ | ✓ | 高 | ⭐⭐⭐ |
| **DCL** | ✓ | ✓ | 高 | ⭐⭐⭐⭐ |
| **静态内部类** | ✓ | ✓ | 高 | ⭐⭐⭐⭐⭐ |
| **枚举** | ✗ | ✓ | 高 | ⭐⭐⭐⭐⭐ |
| **同步方法** | ✓ | ✓ | 低 | ⭐ |

**选择建议**：
- **一般场景**：静态内部类（Holder）
- **需要懒加载**：DCL 或静态内部类
- **最高安全性**：枚举单例
- **简单场景**：饿汉式

**关键要点**：
- ✓ **静态内部类**：最推荐，简洁高效
- ✓ **枚举**：最安全，防反射和反序列化
- ✓ **DCL**：懒加载，需要 volatile
- ⚠ **避免同步方法**：性能太差

**记忆口诀**：单例模式五种方，静态内类最推荐，枚举单例最安全，DCL 加 volatile，饿汉简单不懒加载
