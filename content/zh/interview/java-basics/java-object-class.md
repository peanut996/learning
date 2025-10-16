## 对象和类

### 47. 什么是对象？什么是类？

**类**是对象的**模板/蓝图**，定义了对象的属性和行为。
**对象**是类的**具体实例**，拥有实际的数据和状态。

```java
// 类：模板
public class Car {
    String brand;   // 属性
    int speed;

    void run() {    // 行为
        System.out.println("汽车在行驶");
    }
}

// 对象：实例
Car myCar = new Car();  // 创建对象
myCar.brand = "Tesla";
myCar.speed = 100;
myCar.run();
```

**类是对象的抽象，对象是类的具体化。**

### 48. 如何创建对象？

Java 有 **4 种**创建对象的方式：

```java
// 1. new 关键字（最常用）
Car car1 = new Car();

// 2. 反射
Class<?> clazz = Class.forName("Car");
Car car2 = (Car) clazz.newInstance();

// 3. clone() 方法
Car car3 = (Car) car1.clone();

// 4. 反序列化
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("car.obj"));
Car car4 = (Car) ois.readObject();
```

### 49. 对象的生命周期是怎样的？

1. **创建阶段**：通过 new 关键字分配内存，调用构造方法初始化
2. **使用阶段**：对象被引用，执行方法，访问属性
3. **不可达阶段**：没有任何引用指向该对象
4. **回收阶段**：GC 标记并回收内存

```java
Car car = new Car();  // 1. 创建
car.run();            // 2. 使用
car = null;           // 3. 不可达
// 4. 等待 GC 回收
```

### 50. 什么是方法签名？

方法签名 = **方法名 + 参数列表**（类型、顺序、数量）

**不包括**：返回值类型、访问修饰符、异常声明。

```java
// 方法签名：add(int, int)
public int add(int a, int b) { }

// 方法签名：add(double, double) - 不同签名，可以重载
public double add(double a, double b) { }

// ✗ 编译错误：签名相同，返回值不同
// public double add(int a, int b) { }
```

### 51. 什么是可变参数？如何使用？

可变参数允许方法接受**不定数量的参数**，本质是**数组**。

```java
// 语法：type... paramName
public static int sum(int... numbers) {
    int total = 0;
    for (int num : numbers) {
        total += num;
    }
    return total;
}

// 调用
sum(1, 2, 3);       // 传入 3 个参数
sum(1, 2, 3, 4, 5); // 传入 5 个参数
sum();              // 传入 0 个参数
```

**注意**：
- 可变参数必须是**最后一个参数**
- 一个方法**最多只能有一个**可变参数

### 52. Java 中参数传递是值传递还是引用传递？

Java **只有值传递**（pass by value）。

- **基本类型**：传递值的副本
- **引用类型**：传递引用的副本（对象地址的副本）

```java
public static void main(String[] args) {
    int num = 10;
    modify(num);
    System.out.println(num);  // 10（未改变）

    Person p = new Person("Tom");
    modifyPerson(p);
    System.out.println(p.name);  // "Jerry"（改变了）

    reassignPerson(p);
    System.out.println(p.name);  // "Jerry"（未改变）
}

static void modify(int n) {
    n = 20;  // 修改的是副本
}

static void modifyPerson(Person person) {
    person.name = "Jerry";  // 通过引用修改对象
}

static void reassignPerson(Person person) {
    person = new Person("Alice");  // 重新赋值的是副本
}
```

**关键**：传递的是引用的副本，不是引用本身。

### 53. 什么是浅拷贝和深拷贝？

| 特性 | 浅拷贝（Shallow Copy） | 深拷贝（Deep Copy） |
|------|---------------------|-------------------|
| **基本类型** | 复制值 | 复制值 |
| **引用类型** | 复制引用（共享对象） | 复制对象（新对象） |
| **独立性** | 修改会互相影响 | 完全独立 |

```java
class Person implements Cloneable {
    String name;
    Address address;  // 引用类型

    // 浅拷贝
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();  // 只复制引用，不复制 address 对象
    }

    // 深拷贝
    public Person deepClone() {
        Person copy = new Person();
        copy.name = this.name;
        copy.address = new Address(this.address.city);  // 复制新对象
        return copy;
    }
}
```

### 54. 如何实现对象克隆？

实现 `Cloneable` 接口，重写 `clone()` 方法。

```java
public class Person implements Cloneable {
    private String name;
    private int age;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();  // 浅拷贝
    }

    // 使用
    public static void main(String[] args) throws CloneNotSupportedException {
        Person p1 = new Person("Tom", 20);
        Person p2 = (Person) p1.clone();
    }
}
```

### 55. Object 类有哪些方法？

Object 是所有类的父类，主要方法：

```java
public class Object {
    // 1. 对象比较
    public boolean equals(Object obj) { }
    public int hashCode() { }

    // 2. 对象字符串表示
    public String toString() { }

    // 3. 对象克隆
    protected Object clone() throws CloneNotSupportedException { }

    // 4. 获取运行时类
    public final Class<?> getClass() { }

    // 5. 多线程相关
    public final void wait() throws InterruptedException { }
    public final void notify() { }
    public final void notifyAll() { }

    // 6. 垃圾回收（已废弃）
    protected void finalize() throws Throwable { }
}
```

### 56. hashCode() 和 equals() 的关系？

**关系**：
1. 两个对象 `equals()` 返回 true，`hashCode()` **必须相同**
2. 两个对象 `hashCode()` 相同，`equals()` **不一定** true（哈希冲突）
3. 重写 `equals()` **必须同时重写** `hashCode()`

```java
Person p1 = new Person("Tom", 20);
Person p2 = new Person("Tom", 20);

// 正确实现
p1.equals(p2);     // true
p1.hashCode() == p2.hashCode();  // true
```

### 57. 为什么重写 equals() 必须重写 hashCode()？

**原因**：保证对象在 `HashMap`、`HashSet` 等集合中的正确性。

```java
Person p1 = new Person("Tom", 20);
Person p2 = new Person("Tom", 20);

// 只重写 equals，不重写 hashCode
Set<Person> set = new HashSet<>();
set.add(p1);
set.add(p2);  // ✗ 会添加成功（hashCode 不同）

System.out.println(set.size());  // 2（错误！应该是 1）
```

**正确做法**：同时重写两个方法。

```java
@Override
public boolean equals(Object obj) {
    if (this == obj) return true;
    if (!(obj instanceof Person)) return false;
    Person p = (Person) obj;
    return age == p.age && Objects.equals(name, p.name);
}

@Override
public int hashCode() {
    return Objects.hash(name, age);
}
```

### 58. toString() 方法的作用是什么？

返回对象的**字符串表示**，用于调试和日志输出。

```java
// 默认实现：类名@哈希码
Person p = new Person("Tom", 20);
System.out.println(p);  // Person@15db9742

// 重写 toString
@Override
public String toString() {
    return "Person{name='" + name + "', age=" + age + "}";
}

System.out.println(p);  // Person{name='Tom', age=20}
```

**最佳实践**：使用 IDE 自动生成或 Lombok 的 `@ToString`。
