## 枚举

### 73. 什么是枚举？枚举的作用是什么？

**枚举**（Enum）是一种特殊的类，用于定义**一组固定的常量**。

```java
public enum Season {
    SPRING, SUMMER, AUTUMN, WINTER
}

// 使用
Season season = Season.SPRING;
```

**作用**：
- **类型安全**：不能赋值为枚举外的值
- **可读性强**：比整数常量更清晰
- **功能丰富**：可以有字段、方法

### 74. 如何定义枚举？

```java
// 简单枚举
public enum Color {
    RED, GREEN, BLUE
}

// 带字段和方法的枚举
public enum Status {
    SUCCESS(200, "成功"),
    ERROR(500, "失败");

    private int code;
    private String message;

    Status(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }
}
```

### 75. 枚举的特点是什么？

1. 枚举是 **final 类**，不能被继承
2. 构造器默认 **private**
3. 每个枚举常量是该类的 **static final 实例**
4. 自动继承 `java.lang.Enum`
5. 可以实现接口，但不能继承类
6. 支持 **switch** 语句

### 76. 枚举可以实现接口吗？

**可以**。

```java
interface Describable {
    String describe();
}

public enum Color implements Describable {
    RED {
        @Override
        public String describe() {
            return "红色";
        }
    },
    GREEN {
        @Override
        public String describe() {
            return "绿色";
        }
    }
}
```
