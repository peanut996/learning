# Java Basics Interview Questions

## Data Types

### 1. What are the primitive data types in Java? How many bytes does each occupy?

Java has 8 primitive data types:

| Type | Bytes | Bits | Range | Default |
|------|-------|------|-------|---------|
| byte | 1 | 8 | -128 ~ 127 | 0 |
| short | 2 | 16 | -32768 ~ 32767 | 0 |
| int | 4 | 32 | -2^31 ~ 2^31-1 | 0 |
| long | 8 | 64 | -2^63 ~ 2^63-1 | 0L |
| float | 4 | 32 | IEEE 754 | 0.0f |
| double | 8 | 64 | IEEE 754 | 0.0d |
| char | 2 | 16 | 0 ~ 65535 | '\u0000' |
| boolean | 1 | 8 | true/false | false |

### 2. What is autoboxing and unboxing?

- **Autoboxing**: Automatic conversion from primitive type to wrapper class
- **Unboxing**: Automatic conversion from wrapper class to primitive type

```java
// Autoboxing
Integer i = 10;  // Equivalent to Integer i = Integer.valueOf(10);

// Unboxing
int n = i;  // Equivalent to int n = i.intValue();
```

**Considerations**:
- Wrapper types can be null, unboxing may throw NullPointerException
- Frequent boxing/unboxing affects performance

### 3. Integer caching mechanism?

Integer caches integers from -128 to 127:

```java
Integer a = 127;
Integer b = 127;
System.out.println(a == b);  // true, uses cache

Integer c = 128;
Integer d = 128;
System.out.println(c == d);  // false, outside cache range
```

Other wrappers have similar caching:
- Byte, Short, Long: -128 ~ 127
- Character: 0 ~ 127
- Boolean: true and false

## Strings

### 4. Why is String designed to be immutable?

1. **Security**: String is commonly used as HashMap key, parameters, etc. Immutability ensures hashCode consistency
2. **Thread-safety**: Immutable objects are naturally thread-safe
3. **String pool optimization**: Strings with same content can share memory
4. **Prevent modification**: Avoids tampering with critical parameters like URLs, file paths

### 5. Difference between == and equals()?

- `==`:
  - Primitive types: Compares values
  - Reference types: Compares memory addresses

- `equals()`:
  - Object's default implementation is ==
  - String, Integer, etc. override equals() to compare content

```java
String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1 == s2);        // false, different objects
System.out.println(s1.equals(s2));   // true, same content

String s3 = "hello";
String s4 = "hello";
System.out.println(s3 == s4);        // true, string pool
```

### 6. Difference between String, StringBuilder, and StringBuffer?

| Feature | String | StringBuilder | StringBuffer |
|---------|--------|---------------|--------------|
| Mutability | Immutable | Mutable | Mutable |
| Thread-safety | Safe | Unsafe | Safe (synchronized) |
| Performance | Low | High | Medium |
| Use case | Few operations | Single-thread concat | Multi-thread concat |

Performance: StringBuilder > StringBuffer > String

```java
// String concatenation (not recommended)
String s = "hello";
for (int i = 0; i < 1000; i++) {
    s += i;  // Creates new object each time
}

// StringBuilder concatenation (recommended)
StringBuilder sb = new StringBuilder("hello");
for (int i = 0; i < 1000; i++) {
    sb.append(i);  // Modifies original object
}
```

### 7. What does String's intern() method do?

`intern()` method puts string into string pool:

```java
String s1 = new String("hello");
String s2 = s1.intern();
String s3 = "hello";

System.out.println(s1 == s2);  // false
System.out.println(s2 == s3);  // true, both point to pool
```

## Object-Oriented Programming

### 8. What are the three pillars of OOP?

1. **Encapsulation**
   - Hide object properties and implementation details
   - Provide public access methods (getter/setter)
   - Improve security and maintainability

2. **Inheritance**
   - Subclass inherits features and behaviors from parent
   - Enables code reuse
   - Java supports single inheritance only

3. **Polymorphism**
   - Same behavior has multiple different forms
   - Compile-time polymorphism: Method overloading
   - Runtime polymorphism: Method overriding

### 9. Difference between Overload and Override?

**Method Overloading**:
- Same class, same method name, different parameters
- Independent of return type
- Compile-time polymorphism

```java
public class Math {
    public int add(int a, int b) { return a + b; }
    public double add(double a, double b) { return a + b; }
    public int add(int a, int b, int c) { return a + b + c; }
}
```

**Method Overriding**:
- Subclass overrides parent's method
- Same method name and parameters
- Return type same or subtype
- Access modifier cannot be more restrictive
- Runtime polymorphism

```java
class Animal {
    public void makeSound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof");
    }
}
```

### 10. Difference between Abstract Class and Interface?

| Feature | Abstract Class | Interface |
|---------|----------------|-----------|
| Keyword | abstract class | interface |
| Inheritance | Single (extends) | Multiple (implements) |
| Member variables | Any modifiers | public static final |
| Methods | Can have abstract and concrete methods | JDK8-: only abstract<br>JDK8+: can have default and static<br>JDK9+: can have private |
| Constructor | Can have | Cannot have |
| Access modifiers | Can have public, protected | Methods default public |

**Use cases**:
- Abstract class: "is-a" relationship, common properties and behaviors
- Interface: "can-do" relationship, defines capabilities and contracts

```java
// Abstract class example
abstract class Animal {
    private String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public abstract void makeSound();
    
    public void sleep() {
        System.out.println("Sleeping...");
    }
}

// Interface example
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

// Class can extend one abstract class, implement multiple interfaces
class Duck extends Animal implements Flyable, Swimmable {
    public Duck(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println("Quack");
    }
    
    @Override
    public void fly() {
        System.out.println("Duck flying");
    }
    
    @Override
    public void swim() {
        System.out.println("Duck swimming");
    }
}
```

## Other Basics

### 11. Pass by value or pass by reference in Java?

**Java is always pass-by-value**.

- **Primitive types**: Passes copy of value
- **Reference types**: Passes copy of reference (address value)

```java
public void test() {
    int a = 10;
    changeValue(a);
    System.out.println(a);  // 10, unchanged
    
    Person p = new Person("Tom");
    changeName(p);
    System.out.println(p.name);  // "Jerry", changed
    
    changeReference(p);
    System.out.println(p.name);  // "Jerry", unchanged
}

void changeValue(int x) {
    x = 20;  // Modifies copy
}

void changeName(Person person) {
    person.name = "Jerry";  // Modifies object through reference
}

void changeReference(Person person) {
    person = new Person("Alice");  // Modifies copy of reference
}
```

### 12. Difference between final, finally, finalize?

- **final**:
  - Class: Cannot be inherited
  - Method: Cannot be overridden
  - Variable: Cannot be modified (constant)

- **finally**:
  - Block in try-catch-finally
  - Always executes regardless of exception
  - Commonly used for resource cleanup

- **finalize**:
  - Method in Object class, called before GC reclaims object
  - Deprecated, use try-with-resources instead

### 13. What does static keyword do?

- **Static variable**: Class variable, shared by all instances
- **Static method**: Class method, called through class name
- **Static block**: Executes when class loads, once only
- **Static inner class**: Doesn't hold reference to outer class

```java
public class Demo {
    private static int count = 0;  // Static variable
    
    static {  // Static block
        System.out.println("Static block");
    }
    
    public static void increment() {  // Static method
        count++;
    }
    
    static class Inner {  // Static inner class
        // ...
    }
}
```

**Note**:
- Static methods cannot access non-static members
- Cannot use this and super in static methods

### 14. Exception handling mechanism?

**Exception hierarchy**:
```
Throwable
├── Error (Errors program cannot handle)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception (Exceptions program can handle)
    ├── RuntimeException (Unchecked exceptions)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   └── ClassCastException
    └── IOException (Checked exceptions, must handle)
        ├── FileNotFoundException
        └── SQLException
```

**try-catch-finally**:
```java
try {
    // Code that may throw exception
} catch (SpecificException e) {
    // Handle specific exception
} catch (Exception e) {
    // Handle other exceptions
} finally {
    // Always executes
}
```

**try-with-resources** (recommended):
```java
try (FileInputStream fis = new FileInputStream("file.txt")) {
    // Use resource
} catch (IOException e) {
    // Handle exception
}
// Resource automatically closed
```
