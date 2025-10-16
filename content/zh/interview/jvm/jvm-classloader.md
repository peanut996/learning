## 类加载

### 29. 类加载的过程？

类加载是指将 `.class` 文件加载到内存，经过验证、准备、解析、初始化等步骤，最终形成可被 JVM 直接使用的 Java 类型。

**类加载的 5 个阶段：**

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">类加载过程</text>
<rect x="30" y="60" width="120" height="80" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="90" y="90" text-anchor="middle" font-size="13" font-weight="bold">1. 加载</text>
<text x="90" y="108" text-anchor="middle" font-size="10">Loading</text>
<text x="90" y="125" text-anchor="middle" font-size="9">读取字节流</text>
<path d="M 150 100 L 180 100" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="180" y="60" width="120" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="240" y="90" text-anchor="middle" font-size="13" font-weight="bold">2. 验证</text>
<text x="240" y="108" text-anchor="middle" font-size="10">Verification</text>
<text x="240" y="125" text-anchor="middle" font-size="9">确保安全性</text>
<path d="M 300 100 L 330 100" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="330" y="60" width="120" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="390" y="90" text-anchor="middle" font-size="13" font-weight="bold">3. 准备</text>
<text x="390" y="108" text-anchor="middle" font-size="10">Preparation</text>
<text x="390" y="125" text-anchor="middle" font-size="9">分配内存</text>
<path d="M 450 100 L 480 100" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="480" y="60" width="120" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
<text x="540" y="90" text-anchor="middle" font-size="13" font-weight="bold">4. 解析</text>
<text x="540" y="108" text-anchor="middle" font-size="10">Resolution</text>
<text x="540" y="125" text-anchor="middle" font-size="9">符号→直接引用</text>
<path d="M 600 100 L 630 100" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow3)"/>
<rect x="630" y="60" width="120" height="80" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
<text x="690" y="90" text-anchor="middle" font-size="13" font-weight="bold">5. 初始化</text>
<text x="690" y="108" text-anchor="middle" font-size="10">Initialization</text>
<text x="690" y="125" text-anchor="middle" font-size="9">执行 < clinit ></text>
<defs><marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0,0 L0,10 L9,5 z" fill="#388e3c"/></marker></defs>
<rect x="30" y="170" width="720" height="110" fill="#e0f7fa" stroke="#00838f" stroke-width="1"/>
<text x="390" y="195" text-anchor="middle" font-size="13" font-weight="bold">关键点说明</text>
<text x="100" y="220" font-size="11"><tspan font-weight="bold">加载：</tspan>通过类名获取二进制字节流</text>
<text x="100" y="240" font-size="11"><tspan font-weight="bold">验证：</tspan>文件格式、元数据、字节码、符号引用验证</text>
<text x="100" y="260" font-size="11"><tspan font-weight="bold">准备：</tspan>为静态变量分配内存，设置默认值（0/null/false）</text>
<text x="480" y="220" font-size="11"><tspan font-weight="bold">解析：</tspan>将符号引用替换为直接引用</text>
<text x="480" y="240" font-size="11"><tspan font-weight="bold">初始化：</tspan>执行类构造器 &lt;clinit&gt;()，赋予真实初始值</text>
<text x="480" y="260" font-size="11">初始化是类加载的最后一步，线程安全</text>
</svg>

**记忆口诀：加验准解初**（加载→验证→准备→解析→初始化）

**初始化时机（6种情况）：**
1. new、getstatic、putstatic、invokestatic 指令
2. 反射调用
3. 初始化子类时，父类未初始化
4. 虚拟机启动时的主类
5. 动态语言支持（MethodHandle）
6. 接口中定义了默认方法（JDK 8+）

### 30. 什么是双亲委派模型？为什么要使用双亲委派模型？

**双亲委派模型**：当一个类加载器收到类加载请求时，首先委派给父类加载器加载，只有父类加载器无法加载时，子类加载器才尝试加载。

<svg viewBox="0 0 600 350" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowup" markerWidth="10" markerHeight="10" refX="5" refY="1" orient="auto"><path d="M0,9 L10,9 L5,0 z" fill="#d32f2f"/></marker></defs><text x="300" y="25" text-anchor="middle" font-size="18" font-weight="bold">双亲委派模型</text><rect x="200" y="50" width="200" height="50" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/><text x="300" y="80" text-anchor="middle" font-size="13">启动类加载器</text><text x="300" y="95" text-anchor="middle" font-size="10">(Bootstrap)</text><rect x="200" y="130" width="200" height="50" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/><text x="300" y="160" text-anchor="middle" font-size="13">扩展类加载器</text><text x="300" y="175" text-anchor="middle" font-size="10">(Extension)</text><path d="M 300 130 L 300 105" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrowup)"/><text x="320" y="120" font-size="10" fill="#d32f2f">委派 ↑</text><rect x="200" y="210" width="200" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/><text x="300" y="240" text-anchor="middle" font-size="13">应用类加载器</text><text x="300" y="255" text-anchor="middle" font-size="10">(Application)</text><path d="M 300 210 L 300 185" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrowup)"/><text x="320" y="200" font-size="10" fill="#d32f2f">委派 ↑</text><rect x="200" y="290" width="200" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/><text x="300" y="320" text-anchor="middle" font-size="13">自定义类加载器</text><path d="M 300 290 L 300 265" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrowup)"/><text x="320" y="280" font-size="10" fill="#d32f2f">委派 ↑</text><text x="450" y="75" font-size="11">加载 JDK 核心类</text><text x="450" y="90" font-size="9">(rt.jar)</text><text x="450" y="155" font-size="11">加载扩展类</text><text x="450" y="170" font-size="9">(lib/ext)</text><text x="450" y="235" font-size="11">加载应用类</text><text x="450" y="250" font-size="9">(ClassPath)</text><text x="450" y="315" font-size="11">用户自定义</text></svg>
**为什么使用双亲委派？**
1. **避免类重复加载**：确保一个类只被加载一次
2. **保证核心 API 安全**：防止核心类被篡改
   - 例如：自定义 `java.lang.String` 类，双亲委派确保加载的是 JDK 的 String
3. **保证类的唯一性**：同一个类由不同加载器加载是不同的类

**加载过程：**
```
自定义ClassLoader → Application → Extension → Bootstrap
                                           ↓（找不到）
                                  Extension尝试加载
                                           ↓（找不到）
                          Application尝试加载
                                           ↓（找不到）
                  自定义ClassLoader加载
```

### 31. 如何打破双亲委派模型？

**三种打破方式：**

1. **重写 `loadClass()` 方法**（不推荐）
   - 双亲委派逻辑在 `loadClass()` 中
   - 重写可以改变委派逻辑

2. **线程上下文类加载器（TCCI）**
   - JDBC、JNDI 等 SPI 机制使用
   - 核心类需要加载应用类时使用

3. **OSGi 模块化**
   - 复杂的类加载架构
   - 支持模块热插拔

**实际案例：Tomcat**
- Tomcat 有自己的类加载器体系
- 不同 Web 应用隔离，避免冲突
- 打破双亲委派，优先加载 Web 应用的类

### 32. 什么是类加载器？有哪些类加载器？

**类加载器**负责读取 `.class` 文件，将其转换为 `Class` 对象。

**JVM 提供的类加载器：**

| 类加载器 | 加载路径 | 说明 |
|---------|---------|------|
| **启动类加载器** | `$JAVA_HOME/jre/lib` | C++ 实现，加载核心类库 |
| **扩展类加载器** | `$JAVA_HOME/jre/lib/ext` | Java 实现，加载扩展类库 |
| **应用类加载器** | classpath | Java 实现，加载应用类 |

**关键特性：**
- **唯一性**：类的唯一性由类本身 + 类加载器决定
- **可见性**：子加载器可见父加载器加载的类，反之不行
- **单一性**：一个类只被加载一次（同一个加载器）

### 33. 什么是自定义类加载器？如何实现？

**自定义类加载器**用于加载非标准位置的类（如网络、数据库、加密的 class 文件）。

**实现步骤：**
1. 继承 `ClassLoader`
2. 重写 `findClass()` 方法（推荐，保留双亲委派）
3. 在 `findClass()` 中调用 `defineClass()` 将字节码转换为 Class 对象

**示例代码：**
```java
public class MyClassLoader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        // 1. 根据类名获取字节码（从文件、网络等）
        byte[] classData = loadClassData(name);

        if (classData == null) {
            throw new ClassNotFoundException(name);
        }

        // 2. 将字节码转换为 Class 对象
        return defineClass(name, classData, 0, classData.length);
    }

    private byte[] loadClassData(String className) {
        // 从自定义位置加载 .class 文件
        // 例如：网络、数据库、解密文件等
        String path = className.replace('.', '/') + ".class";
        try (InputStream is = getClass().getResourceAsStream(path)) {
            return is.readAllBytes();
        } catch (IOException e) {
            return null;
        }
    }
}
```

**使用场景：**
- **热部署**：动态加载新版本的类
- **代码加密**：加载加密的 class 文件
- **隔离性**：不同模块使用不同的类加载器
