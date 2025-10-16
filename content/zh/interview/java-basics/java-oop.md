## 面向对象

### 16. 面向对象的三大特性？

面向对象编程（Object-Oriented Programming, OOP）的三大基本特性是**封装（Encapsulation）**、**继承（Inheritance）**和**多态（Polymorphism）**。这三者共同构成了 OOP 的基石。

#### 三大特性概览

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">面向对象三大特性</text>
  <rect x="50" y="70" width="220" height="200" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="8"/>
  <text x="160" y="100" font-size="16" font-weight="bold" text-anchor="middle" fill="#1565C0">封装</text>
  <text x="160" y="125" font-size="12" text-anchor="middle" fill="#1976D2">(Encapsulation)</text>
  <path d="M 110 140 L 110 180 L 150 180 L 150 140 Z" fill="#BBDEFB" stroke="#1976D2"/>
  <text x="130" y="165" font-size="11" fill="#0D47A1">数据</text>
  <path d="M 160 140 L 210 160 L 160 180 Z" fill="#90CAF9" stroke="#1976D2"/>
  <text x="180" y="165" font-size="11" fill="#0D47A1">方法</text>
  <text x="160" y="210" font-size="11" text-anchor="middle" fill="#333">隐藏内部，暴露接口</text>
  <text x="160" y="230" font-size="11" text-anchor="middle" fill="#333">保证安全，简化使用</text>

  <rect x="290" y="70" width="220" height="200" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="8"/>
  <text x="400" y="100" font-size="16" font-weight="bold" text-anchor="middle" fill="#2E7D32">继承</text>
  <text x="400" y="125" font-size="12" text-anchor="middle" fill="#388E3C">(Inheritance)</text>
  <rect x="350" y="140" width="100" height="30" fill="#A5D6A7" stroke="#388E3C"/>
  <text x="400" y="160" font-size="11" text-anchor="middle" fill="#1B5E20">父类</text>
  <path d="M 400 170 L 370 200" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <path d="M 400 170 L 430 200" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <rect x="330" y="200" width="80" height="30" fill="#C8E6C9" stroke="#388E3C"/>
  <text x="370" y="220" font-size="11" text-anchor="middle" fill="#1B5E20">子类A</text>
  <rect x="390" y="200" width="80" height="30" fill="#C8E6C9" stroke="#388E3C"/>
  <text x="430" y="220" font-size="11" text-anchor="middle" fill="#1B5E20">子类B</text>
  <text x="400" y="250" font-size="11" text-anchor="middle" fill="#333">代码复用，扩展功能</text>

  <rect x="530" y="70" width="220" height="200" fill="#FFF3E0" stroke="#FF9800" stroke-width="2" rx="8"/>
  <text x="640" y="100" font-size="16" font-weight="bold" text-anchor="middle" fill="#E65100">多态</text>
  <text x="640" y="125" font-size="12" text-anchor="middle" fill="#F57C00">(Polymorphism)</text>
  <text x="640" y="150" font-size="11" text-anchor="middle" fill="#333">父类引用 ref;</text>
  <text x="640" y="170" font-size="11" text-anchor="middle" fill="#333">ref = new 子类A();</text>
  <text x="640" y="190" font-size="11" text-anchor="middle" fill="#333">ref = new 子类B();</text>
  <text x="640" y="210" font-size="11" text-anchor="middle" fill="#333">ref.method();</text>
  <text x="640" y="240" font-size="11" text-anchor="middle" fill="#333">同一接口，多种实现</text>
  <text x="640" y="260" font-size="11" text-anchor="middle" fill="#333">提高灵活性和可扩展性</text>
  <defs>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#4CAF50"/></marker>
  </defs>
</svg>

---

### 1. 封装 (Encapsulation)

**定义**：将对象的**数据（属性）**和**行为（方法）**捆绑在一起，并对数据的访问进行限制，只通过公共的接口（方法）暴露给外部。简单来说，就是**隐藏内部细节，对外提供公共访问方式**。

**生活比喻**：就像一台自动售货机。你只需要知道按哪个按钮（公共接口），就能得到想要的饮料（结果），而不需要关心机器内部复杂的制冷、存储、掉落机制（内部细节）。

<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>.text{font-family:sans-serif;}.title{font-size:18px;font-weight:bold;text-anchor:middle;}.subtitle{font-size:14px;font-weight:bold;text-anchor:middle;}.label{font-size:12px;text-anchor:middle;}.small-label{font-size:10px;text-anchor:middle;}</style>
  </defs>
  <rect x="1" y="1" width="498" height="298" fill="#F7F9FA" stroke="#D0D7DE" stroke-width="1" rx="15" />

  <!-- Main Capsule -->
  <rect x="20" y="50" width="400" height="200" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="20"/>
  <text x="250" y="35" class="title" fill="#1565C0">封装 (Encapsulation)</text>

  <!-- Inner Data Core -->
  <rect x="150" y="80" width="200" height="140" fill="#BBDEFB" stroke="#1976D2" stroke-width="1.5" rx="10"/>
  <text x="250" y="100" class="subtitle" fill="#0D47A1">内部数据 (Private)</text>
  <text x="250" y="130" class="label" fill="#333">- String name</text>
  <text x="250" y="150" class="label" fill="#333">- int age</text>
  <text x="250" y="170" class="label" fill="#333">- double balance</text>
  <text x="250" y="200" class="small-label" fill="#666">(外界无法直接访问)</text>

  <!-- Public Methods (Gates) -->
  <g>
    <rect x="50" y="90" width="80" height="30" fill="#FFFFFF" stroke="#4CAF50" stroke-width="2" rx="5"/>
    <text x="90" y="110" class="label" fill="#2E7D32">+ getName()</text>
    <path d="M130 105 L 150 105" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow)"/>
  </g>
  <g>
    <rect x="50" y="140" width="80" height="30" fill="#FFFFFF" stroke="#4CAF50" stroke-width="2" rx="5"/>
    <text x="90" y="160" class="label" fill="#2E7D32">+ setAge()</text>
    <path d="M130 155 L 150 155" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow)"/>
  </g>
  <g>
    <rect x="50" y="190" width="80" height="30" fill="#FFFFFF" stroke="#4CAF50" stroke-width="2" rx="5"/>
    <text x="90" y="210" class="label" fill="#2E7D32">+ deposit()</text>
    <path d="M130 205 L 150 205" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow)"/>
  </g>
  <text x="90" y="75" class="subtitle" fill="#2E7D32">公共接口 (Public)</text>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#4CAF50" />
    </marker>
  </defs>
</svg>

**代码示例**：
```java
public class Person {
    // 1. 私有化属性，隐藏内部数据
    private String name;
    private int age;

    // 2. 提供公共的 getter/setter 方法作为访问接口
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    // 3. 在方法中可以加入控制逻辑，保证数据安全
    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            System.out.println("年龄不合法！");
        }
    }
}
```

**优点**：
- **安全性**：保护内部数据不被外部随意修改。
- **简化使用**：调用者只需关心公共接口，无需了解复杂实现。
- **高内聚，低耦合**：内部修改不影响外部调用者。

---

### 2. 继承 (Inheritance)

**定义**：允许一个类（子类）**继承**另一个类（父类）的属性和方法。子类可以复用父类的代码，并可以添加自己独有的特性或重写父类的方法。

**生活比喻**：就像生物界的“遗传”。“猫”和“狗”都继承自“动物”类。“动物”有“吃”、“睡”等通用行为，而“猫”有独特的“抓老鼠”行为，“狗”有独特的“看家”行为。

<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
  <rect x="100" y="30" width="200" height="50" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="5"/>
  <text x="200" y="50" font-size="14" font-weight="bold" text-anchor="middle" fill="#2E7D32">父类：Animal</text>
  <text x="200" y="70" font-size="11" text-anchor="middle" fill="#388E3C">+ eat()</text>
  <path d="M 200 80 L 150 130" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <path d="M 200 80 L 250 130" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <rect x="80" y="130" width="140" height="70" fill="#C8E6C9" stroke="#66BB6A" stroke-width="2" rx="5"/>
  <text x="150" y="150" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">子类：Dog</text>
  <text x="150" y="170" font-size="11" text-anchor="middle" fill="#333">（继承 eat()）</text>
  <text x="150" y="190" font-size="11" text-anchor="middle" fill="#1B5E20">+ bark()</text>
  <rect x="230" y="130" width="140" height="70" fill="#C8E6C9" stroke="#66BB6A" stroke-width="2" rx="5"/>
  <text x="300" y="150" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">子类：Cat</text>
  <text x="300" y="170" font-size="11" text-anchor="middle" fill="#333">（继承 eat()）</text>
  <text x="300" y="190" font-size="11" text-anchor="middle" fill="#1B5E20">+ catchMouse()</text>
</svg>

**代码示例**：
```java
// 父类
class Animal {
    public void eat() {
        System.out.println("动物在吃东西...");
    }
}

// 子类 Dog 继承 Animal
class Dog extends Animal {
    public void bark() {
        System.out.println("狗在汪汪叫...");
    }
}

// 子类 Cat 继承 Animal
class Cat extends Animal {
    public void catchMouse() {
        System.out.println("猫在抓老鼠...");
    }
}

public class Test {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();  // 调用从父类继承的方法
        dog.bark(); // 调用自己的方法
    }
}
```

**优点**：
- **代码复用**：减少重复代码，提高开发效率。
- **易于扩展**：可以在不修改父类的情况下，扩展新的功能。
- **构建层次结构**：形成清晰的类层次关系，符合人类认知。

---

### 3. 多态 (Polymorphism)

**定义**：指**同一行为**，作用于**不同对象**上时，会产生**不同效果**。多态的前提是**继承**和**方法重写**，以及**父类引用指向子类对象**。

**生活比喻**：按下“开”按钮（同一行为），对于电视机（对象1），是打开屏幕；对于收音机（对象2），是开始播放声音。同一个“开”的行为，产生了不同的结果。

<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
  <text x="200" y="30" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">Animal ref = ?</text>
  <path d="M 200 40 L 120 80" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange)"/>
  <path d="M 200 40 L 280 80" stroke="#FF9800" stroke-width="2" marker-end="url(#arrowOrange)"/>
  <rect x="70" y="80" width="100" height="50" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2" rx="5"/>
  <text x="120" y="100" font-size="12" font-weight="bold" text-anchor="middle" fill="#E65100">new Dog()</text>
  <text x="120" y="120" font-size="11" text-anchor="middle" fill="#333">汪汪叫</text>
  <rect x="230" y="80" width="100" height="50" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2" rx="5"/>
  <text x="280" y="100" font-size="12" font-weight="bold" text-anchor="middle" fill="#E65100">new Cat()</text>
  <text x="280" y="120" font-size="11" text-anchor="middle" fill="#333">喵喵叫</text>
  <text x="200" y="170" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">ref.makeSound();</text>
  <text x="200" y="200" font-size="12" text-anchor="middle" fill="#F57C00">编译时：调用 Animal 的方法</text>
  <text x="200" y="220" font-size="12" text-anchor="middle" fill="#F57C00">运行时：执行具体子类的方法</text>
  <defs>
    <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#FF9800"/></marker>
  </defs>
</svg>

**代码示例**：
```java
// 父类
class Animal {
    public void makeSound() {
        System.out.println("动物发出声音...");
    }
}

// 子类 Dog 重写方法
class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("汪汪汪！");
    }
}

// 子类 Cat 重写方法
class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("喵喵喵！");
    }
}

public class Test {
    public static void main(String[] args) {
        // 父类引用指向子类对象
        Animal myDog = new Dog();
        Animal myCat = new Cat();

        // 调用同样的方法，表现出不同行为
        myDog.makeSound(); // 输出: 汪汪汪！
        myCat.makeSound(); // 输出: 喵喵喵！
    }
}
```

**优点**：
- **灵活性**：允许将子类对象视为父类类型，屏蔽了不同子类之间的差异。
- **可扩展性**：增加新的子类无需修改现有代码，符合“开闭原则”。
- **可维护性**：代码更简洁，逻辑更清晰。

#### 总结对比

| 特性 | 核心思想 | 目的 | 关键字 |
|---|---|---|---|
| **封装** | 隐藏细节 | 保护数据、简化使用 | `private` |
| **继承** | 代码复用 | 扩展功能、构建层次 | `extends` |
| **多态** | 同一接口，多种实现 | 提高灵活性和可扩展性 | `implements`, `@Override` |

### 17. 重载（Overload）和重写（Override）的区别？

重载和重写是 Java 多态性中两个非常重要且容易混淆的概念。它们在定义、规则和作用上都有本质的区别。

#### 核心区别图示

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">重载 (Overload) vs 重写 (Override)</text>

  <!-- Overload Panel -->
  <rect x="50" y="70" width="330" height="360" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="8"/>
  <text x="215" y="100" font-size="18" font-weight="bold" text-anchor="middle" fill="#1565C0">重载 (Overload)</text>
  <text x="215" y="125" font-size="12" text-anchor="middle" fill="#1976D2">编译时多态</text>
  <rect x="80" y="150" width="270" height="200" fill="#BBDEFB" stroke="#1976D2" stroke-width="1.5" rx="5"/>
  <text x="215" y="170" font-size="13" font-weight="bold" text-anchor="middle" fill="#0D47A1">同一个类 (e.g., Calculator)</text>
  <text x="90" y="200" font-size="12" text-anchor="start" fill="#333">+ add(int a, int b)</text>
  <text x="90" y="230" font-size="12" text-anchor="start" fill="#333">+ add(int a, int b, int c)</text>
  <text x="90" y="260" font-size="12" text-anchor="start" fill="#333">+ add(double a, double b)</text>
  <text x="215" y="300" font-size="11" font-weight="bold" text-anchor="middle" fill="#0D47A1">方法名相同，参数列表不同</text>
  <text x="215" y="320" font-size="11" text-anchor="middle" fill="#666">(类型、数量、顺序不同)</text>
  <text x="215" y="380" font-size="12" font-weight="bold" text-anchor="middle" fill="#1565C0">“同名不同参，方法在同类”</text>

  <!-- Override Panel -->
  <rect x="420" y="70" width="330" height="360" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="8"/>
  <text x="585" y="100" font-size="18" font-weight="bold" text-anchor="middle" fill="#2E7D32">重写 (Override)</text>
  <text x="585" y="125" font-size="12" text-anchor="middle" fill="#388E3C">运行时多态</text>
  <rect x="450" y="150" width="270" height="80" fill="#C8E6C9" stroke="#66BB6A" stroke-width="1.5" rx="5"/>
  <text x="585" y="170" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">父类 (Animal)</text>
  <text x="460" y="200" font-size="12" text-anchor="start" fill="#333">+ makeSound()</text>
  <path d="M 585 230 L 585 250" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <rect x="450" y="250" width="270" height="80" fill="#A5D6A7" stroke="#66BB6A" stroke-width="1.5" rx="5"/>
  <text x="585" y="270" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">子类 (Dog)</text>
  <text x="460" y="300" font-size="12" text-anchor="start" fill="#333">+ makeSound()  <tspan fill="#FF9800">@Override</tspan></text>
  <text x="585" y="380" font-size="12" font-weight="bold" text-anchor="middle" fill="#2E7D32">“同名同参，方法在子类”</text>

  <defs>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto"><path d="M0,4 L8,4 L4,8 z" fill="#4CAF50"/></marker>
  </defs>
</svg>

#### 详细对比表

| 对比维度 | 重载 (Overload) | 重写 (Override) |
|---|---|---|
| **发生位置** | 同一个类中 | 父子类之间 |
| **方法签名** | **方法名必须相同，参数列表必须不同**（类型、数量、顺序） | **方法名和参数列表必须完全相同** |
| **返回类型** | 可以不同，但仅返回类型不同不足以构成重载 | 必须相同或是父类返回类型的子类（协变返回类型） |
| **访问修饰符** | 无要求 | 子类方法的访问权限**不能严于**父类（只能更宽松或相同） |
| **抛出异常** | 无要求 | 子类方法抛出的异常**不能比**父类更宽泛（可以是父类异常的子类或不抛出） |
| **多态性** | **编译时多态**（静态绑定） | **运行时多态**（动态绑定） |
| **英文** | Overload | Override |
| **关系** | 无继承关系 | 必须有继承或实现关系 |

#### 代码示例

**重载 (Overload) 示例：**
```java
class Calculator {
    // 重载 add 方法
    public int add(int a, int b) {
        System.out.println("调用 add(int, int)");
        return a + b;
    }

    public int add(int a, int b, int c) {
        System.out.println("调用 add(int, int, int)");
        return a + b + c;
    }

    public double add(double a, double b) {
        System.out.println("调用 add(double, double)");
        return a + b;
    }\n}

public class OverloadTest {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        calc.add(1, 2);       // 编译时确定调用第一个 add
        calc.add(1, 2, 3);    // 编译时确定调用第二个 add
        calc.add(1.0, 2.0);   // 编译时确定调用第三个 add
    }
}
```

**重写 (Override) 示例：**
```java
class Animal {
    public void makeSound() {
        System.out.println("动物发出声音");
    }
}

class Dog extends Animal {
    // 重写父类的 makeSound 方法
    @Override
    public void makeSound() {
        System.out.println("汪汪汪！");
    }
}

public class OverrideTest {
    public static void main(String[] args) {
        Animal animal = new Animal();
        Animal dog = new Dog(); // 父类引用指向子类对象

        animal.makeSound(); // 运行时调用 Animal 的方法
        dog.makeSound();    // 运行时确定调用 Dog 的方法
    }
}
```

#### 关键要点

1.  **“两同两小一大”原则（重写）**
    *   **两同**：方法名相同，参数列表相同。
    *   **两小**：子类返回类型小于等于父类；子类抛出异常小于等于父类。
    *   **一大**：子类访问修饰符大于等于父类。

2.  **绑定时机不同**
    *   **重载**是**静态绑定**或**编译时绑定**。编译器根据方法的参数列表在编译时就能确定调用哪个方法。
    *   **重写**是**动态绑定**或**运行时绑定**。运行时JVM根据对象的实际类型来确定调用哪个方法。

3.  **目的不同**
    *   **重载**是为了提供功能相似但参数不同的多个方法，方便调用者。
    *   **重写**是为了让子类根据需要实现自己独特的行为，实现多态。

4.  **记忆口诀**
    *   **重载**：“同名不同参，方法在同类”。
    *   **重写**：“同名同参，方法在子类”。

### 18. 抽象类和接口的区别？

抽象类和接口是 Java 中实现抽象的两种核心机制，它们都用于定义规范，但设计理念和使用场景有很大不同。

#### 核心区别图示

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">抽象类 (Abstract Class) vs 接口 (Interface)</text>

  <!-- Abstract Class Panel -->
  <rect x="50" y="70" width="330" height="330" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" rx="8"/>
  <text x="215" y="100" font-size="18" font-weight="bold" text-anchor="middle" fill="#1565C0">抽象类</text>
  <text x="215" y="125" font-size="12" text-anchor="middle" fill="#1976D2">“is-a” 关系 (是一个...)</text>
  <rect x="80" y="150" width="270" height="150" fill="#BBDEFB" stroke="#1976D2" stroke-width="1.5" rx="5" stroke-dasharray="4"/>
  <text x="215" y="170" font-size="13" font-weight="bold" text-anchor="middle" fill="#0D47A1">abstract class Shape</text>
  <text x="90" y="200" font-size="12" text-anchor="start" fill="#333">+ String color;</text>
  <text x="90" y="220" font-size="12" text-anchor="start" fill="#333">+ getColor(); // 普通方法</text>
  <text x="90" y="240" font-size="12" text-anchor="start" fill="#333">+ abstract draw(); // 抽象方法</text>
  <path d="M 215 300 L 215 320" stroke="#2196F3" stroke-width="2" marker-end="url(#arrowBlue)"/>
  <text x="215" y="315" font-size="11" text-anchor="middle" fill="#1976D2">extends</text>
  <rect x="140" y="320" width="150" height="50" fill="#FFFFFF" stroke="#1976D2" stroke-width="1.5" rx="5"/>
  <text x="215" y="340" font-size="13" font-weight="bold" text-anchor="middle" fill="#0D47A1">Circle</text>
  <text x="215" y="360" font-size="11" text-anchor="middle" fill="#666">“圆形是一个形状”</text>

  <!-- Interface Panel -->
  <rect x="420" y="70" width="330" height="330" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2" rx="8"/>
  <text x="585" y="100" font-size="18" font-weight="bold" text-anchor="middle" fill="#2E7D32">接口</text>
  <text x="585" y="125" font-size="12" text-anchor="middle" fill="#388E3C">“can-do” 关系 (能做...)</text>
  <rect x="450" y="150" width="270" height="80" fill="#C8E6C9" stroke="#66BB6A" stroke-width="1.5" rx="5"/>
  <text x="585" y="170" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">interface Flyable</text>
  <text x="460" y="200" font-size="12" text-anchor="start" fill="#333">+ fly(); // 默认 public abstract</text>
  <path d="M 515 230 L 515 250" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <path d="M 655 230 L 655 250" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrowGreen)"/>
  <text x="515" y="245" font-size="11" text-anchor="middle" fill="#388E3C">implements</text>
  <text x="655" y="245" font-size="11" text-anchor="middle" fill="#388E3C">implements</text>
  <rect x="450" y="250" width="130" height="50" fill="#FFFFFF" stroke="#388E3C" stroke-width="1.5" rx="5"/>
  <text x="515" y="270" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">Bird</text>
  <text x="515" y="290" font-size="11" text-anchor="middle" fill="#666">“鸟能飞”</text>
  <rect x="590" y="250" width="130" height="50" fill="#FFFFFF" stroke="#388E3C" stroke-width="1.5" rx="5"/>
  <text x="655" y="270" font-size="13" font-weight="bold" text-anchor="middle" fill="#1B5E20">Airplane</text>
  <text x="655" y="290" font-size="11" text-anchor="middle" fill="#666">“飞机能飞”</text>

  <defs>
    <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto"><path d="M0,4 L8,4 L4,8 z" fill="#2196F3"/></marker>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto"><path d="M0,4 L8,4 L4,8 z" fill="#4CAF50"/></marker>
  </defs>
</svg>

#### 详细对比表

| 对比维度 | 抽象类 (Abstract Class) | 接口 (Interface) |
|---|---|---|
| **关键字** | `abstract class` | `interface` |
| **继承/实现** | **单继承** (`extends`) | **多实现** (`implements`) |
| **设计理念** | **is-a** (是什么)，体现继承关系，强调“属于...类” | **can-do** (能做什么)，体现能力，强调“具备...能力” |
| **构造方法** | **有** (用于子类初始化) | **没有** |
| **成员变量** | 可以是各种类型 (普通变量、常量) | 默认 `public static final` (常量) |
| **成员方法** | 可包含**抽象方法**和**普通方法** | JDK 8 前只能有**抽象方法**<br>JDK 8+ 可有 `default` 和 `static` 方法<br>JDK 9+ 可有 `private` 方法 |
| **方法访问权限** | `public`, `protected`, `default` | 默认 `public` (JDK 9+ `private` 除外) |
| **代码共享** | 适合共享**代码和状态** (成员变量) | 适合共享**行为规范** (JDK 8+ 可共享默认实现) |

#### 代码示例

**抽象类示例：**
```java
// 抽象类：定义了“形状”的通用属性和行为
abstract class Shape {
    protected String color; // 共享状态

    public Shape(String color) { // 构造方法
        this.color = color;
    }

    public String getColor() { // 普通方法，共享代码
        return color;
    }

    public abstract double getArea(); // 抽象方法，由子类实现
}

// 子类：圆形是一个形状
class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color); // 调用父类构造
        this.radius = radius;
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}
```

**接口示例：**
```java
// 接口：定义了“可飞行的”能力
interface Flyable {
    void fly(); // 行为规范

    // JDK 8+ 默认方法
    default void takeOff() {
        System.out.println("正在起飞...");
    }
}

// 实现类：鸟能飞
class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鸟在扇动翅膀飞行...");
    }
}

// 实现类：飞机也能飞
class Airplane implements Flyable {
    @Override
    public void fly() {
        System.out.println("飞机依靠引擎飞行...");
    }
}
```

#### 如何选择？

- **优先使用接口**：接口更加灵活，因为它允许一个类实现多个接口，解耦性更好。

- **使用抽象类的场景**：
    1.  **共享代码**：当多个子类有共同的代码或成员变量时。
    2.  **定义模板**：使用模板方法设计模式，定义一个算法的骨架，而将一些步骤延迟到子类中实现。
    3.  **强烈的 `is-a` 关系**：当子类和父类之间存在明显的“是一个”关系时。
    4.  **需要非 `public` 方法**：当需要定义 `protected` 或 `default` 的抽象方法时。

#### 关键要点

1.  **继承限制**：类只能单继承抽象类，但可以多实现接口。这是最核心的区别。
2.  **设计目的**：抽象类用于**抽象事物**（is-a），接口用于**定义能力**（can-do）。
3.  **成员类型**：抽象类可以有状态（成员变量）和构造方法，接口不能。
4.  **JDK 8+ 的变化**：接口引入了 `default` 和 `static` 方法，使其也能包含具体实现，缩小了与抽象类的部分差距，但设计理念的根本区别依然存在。

### 19. 什么是构造方法？构造方法的特点是什么？

**构造方法**（Constructor）是一种特殊的成员方法，它的核心作用是在创建对象时**初始化对象的状态**（即为成员变量赋初始值）。

#### 构造方法的核心特点

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="30" font-size="20" font-weight="bold" text-anchor="middle" fill="#333">构造方法的特点</text>

  <rect x="50" y="60" width="700" height="320" fill="#F7F9FA" stroke="#D0D7DE" stroke-width="1" rx="10"/>

  <!-- Code Block -->
  <g>
    <text x="80" y="90" font-family="monospace" font-size="12">public class <tspan font-weight="bold" fill="#2196F3">Person</tspan> {</text>
    <text x="100" y="110" font-family="monospace" font-size="12">private String name;</text>
    <text x="100" y="130" font-family="monospace" font-size="12">private int age;</text>
    <text x="80" y="150" font-family="monospace" font-size="12"></text>
    <text x="100" y="170" font-family="monospace" font-size="12">public <tspan font-weight="bold" fill="#2196F3">Person</tspan>(String name, int age) {</text>
    <text x="120" y="190" font-family="monospace" font-size="12">this.name = name;</text>
    <text x="120" y="210" font-family="monospace" font-size="12">this.age = age;</text>
    <text x="100" y="230" font-family="monospace" font-size="12">}</text>
    <text x="80" y="250" font-family="monospace" font-size="12">}</text>
  </g>

  <!-- Annotations -->
  <g fill="#C62828" font-size="12" font-family="sans-serif">
    <path d="M 320 170 L 360 170" stroke="#C62828" stroke-width="2" marker-end="url(#arrowRed)"/>
    <text x="365" y="165">1. 方法名与类名完全相同</text>
    <path d="M 200 160 L 200 140 L 360 110" stroke="#C62828" stroke-width="2" marker-end="url(#arrowRed)"/>
    <text x="365" y="105">2. 没有任何返回类型 (连 void 都没有)</text>
  </g>

  <!-- Invocation -->
  <g>
    <text x="80" y="300" font-family="monospace" font-size="12"><tspan fill="#2196F3">Person</tspan> p = <tspan fill="#E65100">new</tspan> <tspan fill="#2196F3">Person</tspan>("张三", 25);</text>
    <path d="M 200 285 Q 250 260, 290 240" stroke="#4CAF50" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrowGreen)"/>
    <text x="150" y="270" fill="#2E7D32" font-size="12">3. 使用 new 关键字自动调用</text>
  </g>

  <!-- Other Characteristics -->
  <g x="450" y="200" fill="#0D47A1" font-size="12" font-family="sans-serif">
    <text y="0">4. 主要作用是初始化成员变量。</text>
    <text y="20">5. 每个类都有构造方法，如果没有显式定义，</text>
    <text y="35" x="10">编译器会提供一个无参的默认构造方法。</text>
    <text y="55">6. 一旦定义了任何构造方法，编译器就不再提供默认的。</text>
    <text y="75">7. 构造方法可以重载 (Overload)。</text>
    <text y="95">8. 构造方法不能被 `static`, `final`, `abstract` 修饰。</text>
  </g>

  <defs>
    <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#C62828"/></marker>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#4CAF50"/></marker>
  </defs>
</svg>

#### 代码示例

```java
public class Car {
    private String brand;
    private int speed;

    // 1. 无参构造方法 (默认构造方法)
    // 如果不写任何构造方法，编译器会自动生成一个这样的方法
    public Car() {
        this.brand = "未知品牌"; // 为成员变量提供默认值
        System.out.println("无参构造方法被调用！");
    }

    // 2. 有参构造方法 (重载)
    public Car(String brand) {
        this.brand = brand;
        System.out.println("有参构造方法(String)被调用！");
    }

    // 3. 多个参数的构造方法 (重载)
    public Car(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
        System.out.println("有参构造方法(String, int)被调用！");
    }

    public void showInfo() {
        System.out.println("品牌: " + this.brand + ", 速度: " + this.speed);
    }

    public static void main(String[] args) {
        // 使用 new 关键字自动调用构造方法
        Car car1 = new Car(); // 调用无参构造
        car1.showInfo();

        Car car2 = new Car("特斯拉"); // 调用有参构造
        car2.showInfo();

        Car car3 = new Car("比亚迪", 120); // 调用多参数构造
        car3.showInfo();
    }
}
```

#### 默认构造方法陷阱

如果一个类**没有**显式定义任何构造方法，Java 编译器会为其提供一个公开的、无参数的默认构造方法。

```java
class MyClass { 
    // 编译器自动添加 public MyClass() {}
}
MyClass obj = new MyClass(); // 合法
```

但是，如果**已经**定义了任何构造方法（无论有参还是无参），编译器就**不再**提供默认构造方法。

```java
class AnotherClass {
    private String name;

    // 只定义了有参构造
    public AnotherClass(String name) {
        this.name = name;
    }
}

// AnotherClass obj = new AnotherClass(); // 编译错误！
// 错误信息: The constructor AnotherClass() is undefined
// 因为已经定义了有参构造，编译器不再提供无参的默认构造了。
```

#### 关键要点

1.  **名称必须与类名相同**。
2.  **没有返回类型**，连 `void` 也不行。
3.  **核心作用**是**初始化对象**，为成员变量赋初始值。
4.  通过 `new` 关键字在创建对象时被**自动调用**。
5.  如果程序员不提供，编译器会提供一个**默认的无参构造方法**。
6.  如果程序员提供了任何构造方法，编译器就**不再提供**默认的。
7.  构造方法可以**重载**，以提供多种对象初始化方式。
8.  构造方法不能被 `static`, `final`, `abstract` 等关键字修饰。

### 20. 什么是 this 关键字？this 的作用是什么？

`this` 是 Java 的一个关键字，代表**当前对象的引用**。它指向正在调用方法或构造器的那个对象实例。

#### this 的主要作用

1. **区分成员变量和局部变量**
   ```java
   public class Person {
       private String name;

       public void setName(String name) {
           this.name = name;  // this.name 是成员变量，name 是参数
       }
   }
   ```

2. **调用本类的其他构造方法**
   ```java
   public class Person {
       private String name;
       private int age;

       public Person() {
           this("未知", 0);  // 调用另一个构造方法
       }

       public Person(String name, int age) {
           this.name = name;
           this.age = age;
       }
   }
   ```

3. **返回当前对象（支持链式调用）**
   ```java
   public class Builder {
       private String name;

       public Builder setName(String name) {
           this.name = name;
           return this;  // 返回当前对象
       }

       // 使用：new Builder().setName("Tom").setAge(20)
   }
   ```

4. **将当前对象作为参数传递**
   ```java
   public class Button {
       public void onClick() {
           eventHandler.handle(this);  // 将当前按钮对象传递给处理器
       }
   }
   ```

#### 关键要点

- **this 不能在静态方法中使用**（静态方法属于类，不属于对象）
- **this() 调用构造方法必须放在第一行**
- **this 本质上是一个引用变量**，存储当前对象的内存地址

### 21. 什么是 super 关键字？super 的作用是什么？

`super` 是 Java 的一个关键字，代表**父类对象的引用**。它用于在子类中访问父类的成员（属性、方法、构造方法）。

#### super 的主要作用

1. **访问父类的成员变量**
   ```java
   class Parent {
       protected String name = "父类";
   }

   class Child extends Parent {
       private String name = "子类";

       public void display() {
           System.out.println(super.name);  // 输出：父类
           System.out.println(this.name);   // 输出：子类
       }
   }
   ```

2. **调用父类的方法**
   ```java
   class Parent {
       public void show() {
           System.out.println("父类方法");
       }
   }

   class Child extends Parent {
       @Override
       public void show() {
           super.show();  // 调用父类的 show 方法
           System.out.println("子类方法");
       }
   }
   ```

3. **调用父类的构造方法**
   ```java
   class Parent {
       public Parent(String name) {
           System.out.println("父类构造：" + name);
       }
   }

   class Child extends Parent {
       public Child() {
           super("参数");  // 必须放在第一行
           System.out.println("子类构造");
       }
   }
   ```

#### this 和 super 的区别

| 特性 | this | super |
|------|------|-------|
| **代表对象** | 当前对象 | 父类对象 |
| **访问成员** | 本类成员 | 父类成员 |
| **构造调用** | 本类其他构造方法 | 父类构造方法 |
| **使用位置** | 任意位置 | 任意位置 |
| **构造调用位置** | 必须第一行 | 必须第一行 |

#### 关键要点

- **super() 必须是子类构造方法的第一条语句**
- 如果没有显式调用 `super()`，编译器会自动添加 `super()`（无参构造）
- **super 不能在静态方法中使用**
- **this() 和 super() 不能同时出现**在同一个构造方法中

### 22. 什么是内部类？内部类有哪些分类？

**内部类**（Inner Class）是定义在另一个类内部的类。内部类可以访问外部类的所有成员（包括私有成员）。

#### 内部类的四种分类

1. **成员内部类**（Member Inner Class）
   - 定义在外部类的成员位置
   - 可以访问外部类的所有成员
   - 依赖于外部类实例

   ```java
   public class Outer {
       private int x = 10;

       class Inner {  // 成员内部类
           public void show() {
               System.out.println(x);  // 可以访问外部类成员
           }
       }

       public void test() {
           Inner inner = new Inner();  // 创建内部类实例
           inner.show();
       }
   }
   ```

2. **静态内部类**（Static Nested Class）
   - 使用 `static` 修饰的内部类
   - 不依赖外部类实例
   - 只能访问外部类的静态成员

   ```java
   public class Outer {
       private static int x = 10;

       static class StaticInner {  // 静态内部类
           public void show() {
               System.out.println(x);  // 只能访问静态成员
           }
       }
   }

   // 使用：Outer.StaticInner inner = new Outer.StaticInner();
   ```

3. **局部内部类**（Local Inner Class）
   - 定义在方法或代码块中
   - 只能在定义它的方法/代码块中使用
   - 可以访问外部类成员和方法的 final/effectively final 变量

   ```java
   public class Outer {
       public void method() {
           final int y = 20;

           class LocalInner {  // 局部内部类
               public void show() {
                   System.out.println(y);
               }
           }

           LocalInner inner = new LocalInner();
           inner.show();
       }
   }
   ```

4. **匿名内部类**（Anonymous Inner Class）
   - 没有名字的内部类
   - 通常用于实现接口或继承类的一次性使用
   - 常用于事件监听、线程创建等场景

   ```java
   // 实现接口
   Runnable runnable = new Runnable() {
       @Override
       public void run() {
           System.out.println("匿名内部类");
       }
   };

   // 继承类
   Thread thread = new Thread() {
       @Override
       public void run() {
           System.out.println("匿名内部类继承");
       }
   };
   ```

#### 内部类的优点

- **封装性更好**：可以隐藏实现细节
- **可以访问外部类私有成员**：增强了类之间的关联
- **实现多重继承**：一个类可以有多个内部类分别继承不同的类

### 23. 静态内部类和非静态内部类的区别？

| 特性 | 非静态内部类（成员内部类） | 静态内部类 |
|------|------------------------|-----------|
| **修饰符** | 无 static | 有 static |
| **依赖外部类实例** | 是 | 否 |
| **创建方式** | `Outer.Inner inner = outer.new Inner()` | `Outer.Inner inner = new Outer.Inner()` |
| **访问外部类成员** | 可以访问所有成员（包括实例和静态） | 只能访问静态成员 |
| **持有外部类引用** | 是（隐式持有 Outer.this） | 否 |
| **可以定义静态成员** | 否（除了 static final 常量） | 是 |
| **内存占用** | 较大（持有外部类引用） | 较小 |

#### 代码示例

```java
public class Outer {
    private int instanceVar = 10;
    private static int staticVar = 20;

    // 非静态内部类
    class Inner {
        public void show() {
            System.out.println(instanceVar);  // ✓ 可以访问实例变量
            System.out.println(staticVar);    // ✓ 可以访问静态变量
        }
    }

    // 静态内部类
    static class StaticInner {
        public void show() {
            // System.out.println(instanceVar);  // ✗ 不能访问实例变量
            System.out.println(staticVar);       // ✓ 可以访问静态变量
        }
    }
}

// 使用
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();              // 非静态需要外部类实例
Outer.StaticInner staticInner = new Outer.StaticInner();  // 静态不需要
```

#### 关键要点

- **静态内部类性能更好**：不持有外部类引用，避免内存泄漏
- **非静态内部类适合需要访问外部类实例成员的场景**
- **静态内部类类似于静态方法**：属于类而非实例

### 24. 匿名内部类是什么？如何使用？

**匿名内部类**是一种没有名字的内部类，主要用于**创建某个接口或抽象类的临时实现**。它在定义的同时就创建了对象，通常用于一次性使用的场景。

#### 使用场景

1. **实现接口**
   ```java
   // 传统方式
   class MyRunnable implements Runnable {
       public void run() {
           System.out.println("线程执行");
       }
   }
   Thread t = new Thread(new MyRunnable());

   // 匿名内部类方式
   Thread t = new Thread(new Runnable() {
       @Override
       public void run() {
           System.out.println("线程执行");
       }
   });

   // Lambda 表达式（Java 8+，函数式接口）
   Thread t = new Thread(() -> System.out.println("线程执行"));
   ```

2. **继承抽象类**
   ```java
   abstract class Animal {
       abstract void makeSound();
   }

   Animal dog = new Animal() {
       @Override
       void makeSound() {
           System.out.println("汪汪汪");
       }
   };
   dog.makeSound();
   ```

3. **事件监听（GUI 编程常见）**
   ```java
   button.addActionListener(new ActionListener() {
       @Override
       public void actionPerformed(ActionEvent e) {
           System.out.println("按钮被点击");
       }
   });
   ```

#### 匿名内部类的特点

- **没有类名**，在定义时直接创建对象
- **没有构造方法**（因为没有类名）
- **只能使用一次**，不能重复创建实例
- 可以访问外部类成员和方法的 **final 或 effectively final 变量**
- **不能定义静态成员**（除了 static final 常量）

#### 关键要点

- 匿名内部类适合**简单、临时**的实现
- 对于函数式接口，**优先使用 Lambda 表达式**（Java 8+）
- 复杂逻辑建议**定义具名类**，提高代码可读性

### 25. 什么是多态？多态的实现方式有哪些？

**多态**（Polymorphism）是指**同一个行为具有多种不同的表现形式**。在 Java 中，多态允许父类引用指向子类对象，并在运行时根据实际对象类型调用相应的方法。

#### 多态的两种实现方式

1. **编译时多态（静态多态）**
   - 通过**方法重载**（Overload）实现
   - 编译期确定调用哪个方法

   ```java
   public class Calculator {
       public int add(int a, int b) {
           return a + b;
       }

       public double add(double a, double b) {
           return a + b;
       }

       public int add(int a, int b, int c) {
           return a + b + c;
       }
   }
   ```

2. **运行时多态（动态多态）**
   - 通过**方法重写**（Override）和**继承/接口实现**
   - 运行时根据实际对象类型确定调用哪个方法

   ```java
   class Animal {
       public void makeSound() {
           System.out.println("动物叫");
       }
   }

   class Dog extends Animal {
       @Override
       public void makeSound() {
           System.out.println("汪汪汪");
       }
   }

   class Cat extends Animal {
       @Override
       public void makeSound() {
           System.out.println("喵喵喵");
       }
   }

   // 使用多态
   Animal animal1 = new Dog();  // 父类引用指向子类对象
   Animal animal2 = new Cat();
   animal1.makeSound();  // 输出：汪汪汪（运行时确定）
   animal2.makeSound();  // 输出：喵喵喵
   ```

#### 多态的三个必要条件

1. **继承**：必须有子类继承父类或实现接口
2. **重写**：子类重写父类的方法
3. **向上转型**：父类引用指向子类对象（`Animal animal = new Dog()`）

#### 多态的优点

- **扩展性好**：添加新的子类不需要修改现有代码
- **代码复用**：通过父类引用操作不同的子类对象
- **降低耦合度**：面向接口编程，提高灵活性

### 26. 什么是向上转型和向下转型？

**向上转型**和**向下转型**是 Java 中对象类型转换的两种方式，用于处理继承关系中父类和子类引用之间的转换。

#### 1. 向上转型（Upcasting）

**定义**：子类对象转换为父类引用，**自动进行，无需强制类型转换**。

```java
class Animal {
    public void eat() {
        System.out.println("动物吃东西");
    }
}

class Dog extends Animal {
    public void bark() {
        System.out.println("汪汪汪");
    }
}

// 向上转型（自动）
Animal animal = new Dog();  // Dog 对象转为 Animal 引用
animal.eat();   // ✓ 可以调用父类方法
// animal.bark();  // ✗ 不能调用子类特有方法（编译错误）
```

**特点**：
- **自动、安全**，不需要强制转换
- 只能访问**父类定义的方法**，子类特有方法不可见
- **多态的基础**

#### 2. 向下转型（Downcasting）

**定义**：父类引用转换为子类引用，**需要强制类型转换**。

```java
Animal animal = new Dog();  // 向上转型

// 向下转型（强制转换）
Dog dog = (Dog) animal;
dog.bark();  // ✓ 可以调用子类方法

// 错误示例：实际对象不是 Cat
Animal animal2 = new Dog();
Cat cat = (Cat) animal2;  // 运行时抛出 ClassCastException
```

**特点**：
- 需要**显式强制转换**：`(SubClass) parentRef`
- **可能抛出 ClassCastException**，需要先用 `instanceof` 判断
- 转换后可以访问**子类特有方法**

#### 安全的向下转型

```java
Animal animal = new Dog();

// 推荐：先用 instanceof 判断
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.bark();  // 安全
}
```

#### 关键对比

| 特性 | 向上转型 | 向下转型 |
|------|---------|---------|
| **转换方向** | 子类 → 父类 | 父类 → 子类 |
| **是否需要强制转换** | 否（自动） | 是（必须） |
| **安全性** | 100% 安全 | 可能失败（ClassCastException） |
| **访问范围** | 只能访问父类成员 | 可以访问子类成员 |
| **使用场景** | 多态、统一处理 | 需要访问子类特有功能 |

#### 关键要点

- **向上转型是多态的基础**，编译时自动完成
- **向下转型需谨慎**，务必用 `instanceof` 检查类型
- 转型不会改变对象本身，只改变引用的**访问能力**

### 27. 什么是 instanceof 关键字？

`instanceof` 是 Java 的一个**二元运算符**，用于**判断对象是否是某个类的实例**，或者是否是该类的子类实例。返回 `boolean` 类型。

#### 语法

```java
object instanceof ClassName
```

#### 基本使用

```java
class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

Dog dog = new Dog();
Animal animal = new Dog();

System.out.println(dog instanceof Dog);      // true
System.out.println(dog instanceof Animal);   // true（子类是父类实例）
System.out.println(dog instanceof Cat);      // false
System.out.println(animal instanceof Dog);   // true（实际对象是 Dog）

// null 检查
Animal nullAnimal = null;
System.out.println(nullAnimal instanceof Animal);  // false（null 不是任何类的实例）
```

#### 主要用途

1. **安全的向下转型前检查**
   ```java
   Animal animal = getAnimal();  // 不确定具体类型

   if (animal instanceof Dog) {
       Dog dog = (Dog) animal;  // 安全转型
       dog.bark();
   } else if (animal instanceof Cat) {
       Cat cat = (Cat) animal;
       cat.meow();
   }
   ```

2. **多态场景中的类型判断**
   ```java
   public void handleAnimal(Animal animal) {
       if (animal instanceof Dog) {
           System.out.println("处理狗");
       } else if (animal instanceof Cat) {
           System.out.println("处理猫");
       }
   }
   ```

3. **接口实现检查**
   ```java
   Object obj = "Hello";
   if (obj instanceof Comparable) {
       Comparable c = (Comparable) obj;
       // 安全使用 Comparable 方法
   }
   ```

#### 注意事项

- **null 永远返回 false**：`null instanceof AnyClass` 总是 false
- **编译时检查**：如果类型完全无关（不在继承树上），编译器会报错
- **接口检查**：可以用于检查是否实现了某个接口

#### Java 14+ 模式匹配增强

```java
// 传统方式
if (obj instanceof String) {
    String str = (String) obj;
    System.out.println(str.length());
}

// Java 14+ 模式匹配
if (obj instanceof String str) {
    System.out.println(str.length());  // 自动转型
}
```

#### 关键要点

- **instanceof 是向下转型前的必备检查**，避免 ClassCastException
- **null 检查**：`instanceof` 会自动处理 null，无需额外判断
- **优先考虑多态设计**，减少对 instanceof 的依赖
