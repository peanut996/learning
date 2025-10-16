## 异常处理

### 39. 异常处理机制？

Java 使用**异常对象**来表示程序运行时的错误，通过 `try-catch-finally` 机制处理异常。

#### 异常体系结构

```
Throwable
├── Error（错误，程序无法处理）
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── ...
└── Exception（异常，程序可以处理）
    ├── 受检异常（Checked Exception）
    │   ├── IOException
    │   ├── SQLException
    │   └── ...
    └── RuntimeException（非受检异常）
        ├── NullPointerException
        ├── ArrayIndexOutOfBoundsException
        └── ...
```

#### 异常处理方式

1. **try-catch**：捕获并处理异常
2. **throws**：声明方法可能抛出的异常
3. **throw**：主动抛出异常
4. **finally**：无论是否异常都执行的代码块

```java
try {
    // 可能抛出异常的代码
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // 捕获并处理异常
    System.out.println("除数不能为0");
} finally {
    // 总是执行（资源清理）
    System.out.println("finally 块执行");
}
```

### 40. Error 和 Exception 的区别？

| 特性 | Error | Exception |
|------|-------|-----------|
| **定义** | 严重的系统错误 | 程序可以处理的异常 |
| **是否可恢复** | 不可恢复 | 可恢复 |
| **是否需要捕获** | 不需要 | 受检异常必须捕获 |
| **典型例子** | OutOfMemoryError, StackOverflowError | IOException, SQLException |
| **处理方式** | 程序无法处理，应该终止 | 应该捕获并处理 |

```java
// Error 示例（不应该捕获）
public class ErrorDemo {
    public static void main(String[] args) {
        recursiveMethod();  // StackOverflowError
    }

    static void recursiveMethod() {
        recursiveMethod();  // 无限递归
    }
}

// Exception 示例（应该捕获）
public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            FileReader fr = new FileReader("file.txt");  // IOException
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 41. 受检异常和非受检异常的区别？

| 特性 | 受检异常（Checked） | 非受检异常（Unchecked） |
|------|-------------------|----------------------|
| **父类** | Exception（除 RuntimeException） | RuntimeException 及其子类 |
| **检查时机** | 编译时检查 | 运行时检查 |
| **是否必须处理** | 必须捕获或声明 | 不强制处理 |
| **典型例子** | IOException, SQLException | NullPointerException, IllegalArgumentException |
| **发生原因** | 外部因素（文件、网络） | 编程错误 |

```java
// 受检异常：必须处理
public void readFile() throws IOException {  // 必须声明
    FileReader fr = new FileReader("file.txt");
}

// 或者捕获
public void readFile() {
    try {
        FileReader fr = new FileReader("file.txt");
    } catch (IOException e) {
        e.printStackTrace();
    }
}

// 非受检异常：不强制处理
public void divideNumbers(int a, int b) {
    int result = a / b;  // 可能抛出 ArithmeticException，但不强制处理
}
```

### 42. throw 和 throws 的区别？

| 特性 | throw | throws |
|------|-------|--------|
| **位置** | 方法体内部 | 方法声明处 |
| **作用** | 抛出具体的异常对象 | 声明方法可能抛出的异常类型 |
| **数量** | 一次只能抛出一个异常对象 | 可以声明多个异常类型 |
| **语法** | `throw new Exception()` | `void method() throws Exception` |

```java
// throw：抛出异常对象
public void withdraw(double amount) {
    if (amount < 0) {
        throw new IllegalArgumentException("金额不能为负数");
    }
}

// throws：声明异常
public void readFile() throws IOException, FileNotFoundException {
    FileReader fr = new FileReader("file.txt");
}

// 组合使用
public void processFile() throws IOException {
    if (!fileExists()) {
        throw new FileNotFoundException("文件不存在");
    }
}
```

### 43. try-catch-finally 的执行顺序？

```java
public static int test() {
    try {
        System.out.println("1. try 块");
        return 1;  // 先暂存返回值
    } catch (Exception e) {
        System.out.println("2. catch 块");
        return 2;
    } finally {
        System.out.println("3. finally 块");
        // return 3;  // 不推荐：会覆盖 try/catch 的返回值
    }
}

// 输出：
// 1. try 块
// 3. finally 块
// 返回值：1
```

#### 执行顺序

1. **执行 try 块**
2. 如果有异常，**执行对应的 catch 块**
3. **一定执行 finally 块**（除非 JVM 退出）
4. **返回值**：
   - try/catch 中的 return 值会**先暂存**
   - finally 执行完后再返回
   - finally 中的 return 会**覆盖** try/catch 的返回值（不推荐）

### 44. finally 块一定会执行吗？

**几乎总是执行**，但有以下例外：

1. **JVM 提前退出**：`System.exit(0)`
2. **守护线程**：所有非守护线程结束时，守护线程的 finally 可能不执行
3. **死循环**：try 块中的死循环
4. **断电/kill 进程**：操作系统强制终止

```java
// 示例 1：正常执行
try {
    return 1;
} finally {
    System.out.println("finally 执行");  // ✓ 会执行
}

// 示例 2：JVM 退出，finally 不执行
try {
    System.exit(0);  // JVM 立即退出
} finally {
    System.out.println("finally 执行");  // ✗ 不会执行
}
```

### 45. try-with-resources 是什么？

Java 7 引入的**自动资源管理**机制，自动关闭实现了 `AutoCloseable` 接口的资源。

```java
// 传统方式（繁琐）
FileReader fr = null;
try {
    fr = new FileReader("file.txt");
    // 读取文件
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fr != null) {
        try {
            fr.close();  // 手动关闭
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// try-with-resources（推荐）
try (FileReader fr = new FileReader("file.txt")) {
    // 读取文件
} catch (IOException e) {
    e.printStackTrace();
}  // 自动调用 fr.close()
```

#### 特点

- **自动关闭资源**：退出 try 块时自动调用 `close()`
- **多资源管理**：可以同时管理多个资源
- **异常处理更简洁**：避免 finally 中的嵌套 try-catch

```java
// 多资源管理
try (FileInputStream fis = new FileInputStream("input.txt");
     FileOutputStream fos = new FileOutputStream("output.txt")) {
    // 操作两个流
}  // 自动关闭，关闭顺序与声明顺序相反
```

### 46. 如何自定义异常？

继承 `Exception`（受检异常）或 `RuntimeException`（非受检异常）。

```java
// 自定义受检异常
public class InsufficientBalanceException extends Exception {
    private double amount;

    public InsufficientBalanceException(String message, double amount) {
        super(message);
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }
}

// 自定义非受检异常
public class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(String message) {
        super(message);
    }
}

// 使用
public void withdraw(double amount) throws InsufficientBalanceException {
    if (balance < amount) {
        throw new InsufficientBalanceException("余额不足", amount - balance);
    }
}
```

#### 最佳实践

1. **命名**：以 `Exception` 结尾
2. **提供多个构造方法**：无参、带 message、带 cause
3. **选择父类**：外部因素用 Exception，编程错误用 RuntimeException
4. **添加必要字段**：保存异常相关的上下文信息
