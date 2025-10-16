## I/O 流

### 77. Java 中有哪些 I/O 流？

Java I/O 流分为两大类：**字节流**和**字符流**。

**字节流**（处理二进制数据）：
```
InputStream / OutputStream
├── FileInputStream / FileOutputStream
├── BufferedInputStream / BufferedOutputStream
├── DataInputStream / DataOutputStream
└── ObjectInputStream / ObjectOutputStream
```

**字符流**（处理文本数据）：
```
Reader / Writer
├── FileReader / FileWriter
├── BufferedReader / BufferedWriter
├── InputStreamReader / OutputStreamWriter
└── StringReader / StringWriter
```

### 78. 字节流和字符流的区别？

| 特性 | 字节流 | 字符流 |
|------|-------|-------|
| **基类** | InputStream / OutputStream | Reader / Writer |
| **处理单位** | 字节（8 bit） | 字符（16 bit） |
| **适用场景** | 所有类型文件（图片、视频、音频） | 文本文件 |
| **编码** | 无需考虑编码 | 需要处理字符编码 |
| **缓冲区** | 无默认缓冲 | 有默认缓冲 |

```java
// 字节流：复制图片
try (FileInputStream fis = new FileInputStream("image.jpg");
     FileOutputStream fos = new FileOutputStream("copy.jpg")) {
    byte[] buffer = new byte[1024];
    int len;
    while ((len = fis.read(buffer)) != -1) {
        fos.write(buffer, 0, len);
    }
}

// 字符流：读取文本
try (FileReader fr = new FileReader("test.txt");
     BufferedReader br = new BufferedReader(fr)) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}
```

### 79. 什么是缓冲流？为什么要使用缓冲流？

**缓冲流**在内存中提供缓冲区，减少 I/O 次数，提高效率。

```java
// 不使用缓冲流（效率低）
FileInputStream fis = new FileInputStream("file.txt");
int data;
while ((data = fis.read()) != -1) {  // 每次读 1 字节，频繁 I/O
    // 处理数据
}

// 使用缓冲流（效率高）
BufferedInputStream bis = new BufferedInputStream(new FileInputStream("file.txt"));
int data;
while ((data = bis.read()) != -1) {  // 内部批量读取到缓冲区
    // 处理数据
}
```

**优势**：
- **提高性能**：批量读写，减少系统调用
- **提供额外方法**：`BufferedReader.readLine()`

### 80. 什么是序列化和反序列化？

**序列化**：将对象转换为字节流，用于存储或网络传输。
**反序列化**：将字节流恢复为对象。

```java
// 序列化
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.ser"))) {
    Person p = new Person("Tom", 20);
    oos.writeObject(p);
}

// 反序列化
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.ser"))) {
    Person p = (Person) ois.readObject();
}
```

**应用场景**：
- 对象持久化（保存到文件/数据库）
- 网络传输（RPC、缓存）
- 深拷贝

### 81. 如何实现序列化？

实现 `Serializable` 接口（标记接口，无需实现方法）。

```java
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
    private transient String password;  // 不序列化

    // getter/setter
}
```

### 82. serialVersionUID 的作用是什么？

`serialVersionUID` 用于**验证序列化版本的一致性**。

```java
// 序列化时的版本
class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
}

// 反序列化时，如果类结构改变（添加字段）但 serialVersionUID 相同，可以兼容
class Person implements Serializable {
    private static final long serialVersionUID = 1L;  // 相同
    private String name;
    private int age;  // 新增字段
}

// 如果不指定 serialVersionUID，JVM 会自动生成
// 类结构改变后，自动生成的 ID 会变化，导致 InvalidClassException
```

**最佳实践**：显式声明 `serialVersionUID`。

### 83. 什么是 NIO？NIO 和 IO 的区别？

**NIO**（New I/O）是 Java 1.4 引入的新 I/O API，提供更高效的 I/O 操作。

| 特性 | 传统 I/O | NIO |
|------|---------|-----|
| **阻塞性** | 阻塞（Blocking） | 非阻塞（Non-blocking） |
| **面向** | 流（Stream） | 缓冲区（Buffer） + 通道（Channel） |
| **选择器** | 无 | Selector（多路复用） |
| **性能** | 较低 | 高（适合高并发） |
| **使用复杂度** | 简单 | 复杂 |

```java
// 传统 I/O
InputStream is = socket.getInputStream();
is.read(bytes);  // 阻塞直到数据到达

// NIO
Selector selector = Selector.open();
channel.register(selector, SelectionKey.OP_READ);
selector.select();  // 非阻塞，可以同时监听多个 channel
```

**应用场景**：
- **I/O**：少量连接，数据量大
- **NIO**：大量连接，数据量小（高并发服务器）
