# Design Patterns Interview Questions

## Design Patterns Fundamentals

1. What are design patterns? What is their purpose?
2. What are the categories of design patterns?
3. What are creational patterns, structural patterns, and behavioral patterns?
4. What are the six principles of design patterns?
5. What is the Single Responsibility Principle (SRP)?
6. What is the Open-Closed Principle (OCP)?
7. What is the Liskov Substitution Principle (LSP)?
8. What is the Dependency Inversion Principle (DIP)?
9. What is the Interface Segregation Principle (ISP)?
10. What is the Law of Demeter (LoD)?

## Creational Patterns

### Singleton Pattern

11. What is the Singleton pattern? What are its application scenarios?
12. What are the implementation methods of Singleton pattern?
13. What is eager initialization Singleton? What are its pros and cons?
14. What is lazy initialization Singleton? How to make it thread-safe?
15. What is Double-Checked Locking (DCL) Singleton? Why use volatile?
16. What is static inner class Singleton?
17. What is enum Singleton? Why is enum recommended for implementing Singleton?
18. How to prevent Singleton pattern from being broken by reflection?
19. How to prevent Singleton pattern from being broken by serialization?
20. Is Spring's Singleton Bean thread-safe?

### Factory Pattern

21. What is Simple Factory pattern? What are its pros and cons?
22. What is Factory Method pattern? What are the differences from Simple Factory?
23. What is Abstract Factory pattern? What are the differences from Factory Method?
24. What are the application scenarios of Factory pattern?
25. Where does Spring use Factory pattern?

### Builder Pattern

26. What is Builder pattern? What is its purpose?
27. What are the differences between Builder pattern and Factory pattern?
28. What are the application scenarios of Builder pattern?
29. What design pattern does StringBuilder use?

### Prototype Pattern

30. What is Prototype pattern? What is its purpose?
31. What are shallow copy and deep copy?
32. How to implement deep copy?
33. What are the application scenarios of Prototype pattern?
34. Is Object's clone() method shallow copy or deep copy?

## Structural Patterns

### Proxy Pattern

35. What is Proxy pattern? What is its purpose?
36. What are the categories of Proxy pattern?
37. What is static proxy? What are its pros and cons?
38. What is dynamic proxy? What are the implementation methods?
39. What is the implementation principle of JDK dynamic proxy?
40. What is the implementation principle of CGLIB dynamic proxy?
41. What are the differences between JDK dynamic proxy and CGLIB proxy?
42. What design pattern does Spring AOP use?
43. What are the application scenarios of Proxy pattern?

### Adapter Pattern

44. What is Adapter pattern? What is its purpose?
45. What are the categories of Adapter pattern?
46. What are the differences between Adapter pattern and Decorator pattern?
47. What are the application scenarios of Adapter pattern?
48. What pattern does HandlerAdapter in Spring MVC use?

### Decorator Pattern

49. What is Decorator pattern? What is its purpose?
50. What are the differences between Decorator pattern and inheritance?
51. What are the application scenarios of Decorator pattern?
52. What design pattern does Java I/O stream use?

### Bridge Pattern

53. What is Bridge pattern? What is its purpose?
54. What are the application scenarios of Bridge pattern?
55. What design pattern does JDBC driver use?

### Facade Pattern

56. What is Facade pattern? What is its purpose?
57. What are the application scenarios of Facade pattern?
58. What are the pros and cons of Facade pattern?

### Composite Pattern

59. What is Composite pattern? What is its purpose?
60. What are the application scenarios of Composite pattern?
61. What design pattern does file system use?

### Flyweight Pattern

62. What is Flyweight pattern? What is its purpose?
63. How does Flyweight pattern reduce memory usage?
64. What are the application scenarios of Flyweight pattern?
65. What design pattern does String constant pool use?
66. What design pattern does Integer cache use?

## Behavioral Patterns

### Template Method Pattern

67. What is Template Method pattern? What is its purpose?
68. What are the application scenarios of Template Method pattern?
69. What design pattern does AbstractList use?
70. Where does Spring use Template Method pattern?

### Strategy Pattern

71. What is Strategy pattern? What is its purpose?
72. What are the differences between Strategy pattern and Simple Factory pattern?
73. What are the application scenarios of Strategy pattern?
74. How to eliminate if-else?
75. What design pattern does Comparator use?

### Observer Pattern

76. What is Observer pattern? What is its purpose?
77. What are the roles in Observer pattern?
78. What are the application scenarios of Observer pattern?
79. What design pattern does Spring's event mechanism use?
80. What design pattern is used in MVC pattern?

### Chain of Responsibility Pattern

81. What is Chain of Responsibility pattern? What is its purpose?
82. What are the application scenarios of Chain of Responsibility pattern?
83. What design pattern does Servlet's Filter use?
84. What design pattern does Spring's interceptor use?

### Iterator Pattern

85. What is Iterator pattern? What is its purpose?
86. What are the application scenarios of Iterator pattern?
87. What design pattern does Java Collections Framework use?

### Command Pattern

88. What is Command pattern? What is its purpose?
89. What are the application scenarios of Command pattern?
90. What design pattern does Runnable interface use?

### State Pattern

91. What is State pattern? What is its purpose?
92. What are the differences between State pattern and Strategy pattern?
93. What are the application scenarios of State pattern?
94. What design pattern can be used for order status transitions?

### Memento Pattern

95. What is Memento pattern? What is its purpose?
96. What are the application scenarios of Memento pattern?
97. How to implement undo and redo functionality?

### Mediator Pattern

98. What is Mediator pattern? What is its purpose?
99. What are the application scenarios of Mediator pattern?
100. What design pattern concept does MQ message queue use?

### Visitor Pattern

101. What is Visitor pattern? What is its purpose?
102. What are the application scenarios of Visitor pattern?

### Interpreter Pattern

103. What is Interpreter pattern? What is its purpose?
104. What are the application scenarios of Interpreter pattern?
105. What design pattern does Spring's EL expression use?

## Comprehensive Questions

106. Which design patterns have you used in real projects?
107. How to choose appropriate design patterns?
108. What problems can overuse of design patterns cause?
109. What are the differences between design patterns and architectural patterns?
110. What design patterns are used in the Spring framework?
