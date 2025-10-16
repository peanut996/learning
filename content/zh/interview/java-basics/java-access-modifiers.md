## 访问修饰符

### 28. Java 有哪些访问修饰符？它们的区别是什么？

Java 有 **4 种访问修饰符**，用于控制类、方法、变量的访问权限：

| 修饰符 | 说明 | 适用范围 |
|-------|------|---------|
| **private** | 私有的，只能在本类中访问 | 成员变量、方法、内部类 |
| **default**（无修饰符） | 包级私有，同一包内可访问 | 类、成员变量、方法 |
| **protected** | 受保护的，同包或子类可访问 | 成员变量、方法 |
| **public** | 公开的，任何地方都可访问 | 类、成员变量、方法 |

#### 访问权限从小到大

```
private < default < protected < public
```

### 29. public、protected、default、private 的访问范围是什么？

| 访问修饰符 | 本类 | 同包 | 子类（不同包） | 其他包 |
|-----------|------|------|--------------|--------|
| **private** | ✓ | ✗ | ✗ | ✗ |
| **default** | ✓ | ✓ | ✗ | ✗ |
| **protected** | ✓ | ✓ | ✓ | ✗ |
| **public** | ✓ | ✓ | ✓ | ✓ |

#### 代码示例

```java
// 包 com.example.a
public class Parent {
    private int privateVar = 1;      // 只能在 Parent 类中访问
    int defaultVar = 2;              // 同包可访问
    protected int protectedVar = 3;  // 同包 + 子类可访问
    public int publicVar = 4;        // 任何地方可访问
}

// 包 com.example.a（同包）
class SamePackage {
    void test() {
        Parent p = new Parent();
        // p.privateVar;     // ✗ 编译错误
        p.defaultVar;        // ✓
        p.protectedVar;      // ✓
        p.publicVar;         // ✓
    }
}

// 包 com.example.b（不同包）
class Child extends Parent {
    void test() {
        // this.privateVar;     // ✗ 编译错误
        // this.defaultVar;     // ✗ 编译错误
        this.protectedVar;      // ✓ 子类可访问
        this.publicVar;         // ✓
    }
}

// 包 com.example.b（不同包，非子类）
class Other {
    void test() {
        Parent p = new Parent();
        // p.privateVar;     // ✗
        // p.defaultVar;     // ✗
        // p.protectedVar;   // ✗
        p.publicVar;         // ✓
    }
}
```

#### 关键要点

- **顶层类**只能用 `public` 或 `default`
- **成员变量**推荐使用 `private`，提供 getter/setter 方法
- **protected** 主要用于继承场景，允许子类访问
