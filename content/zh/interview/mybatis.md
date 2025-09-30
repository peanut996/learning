# MyBatis 面试题

## 基础概念

1. 什么是 MyBatis？MyBatis 的特点是什么？
2. MyBatis 和 JDBC 的区别是什么？
3. MyBatis 和 Hibernate 的区别是什么？
4. MyBatis 的优缺点是什么？
5. MyBatis 的核心组件有哪些？
6. 什么是 ORM 框架？

## 配置文件

7. MyBatis 有哪些配置文件？
8. mybatis-config.xml 的作用是什么？
9. Mapper.xml 的作用是什么？
10. MyBatis 的配置文件加载顺序是怎样的？
11. 如何配置数据源？
12. 如何配置事务管理器？
13. 什么是 typeAliases？如何配置？
14. 什么是 settings？常用的配置有哪些？

## Mapper

15. 什么是 Mapper 接口？
16. Mapper 接口的工作原理是什么？
17. Mapper 接口中的方法可以重载吗？
18. 如何定义 Mapper 接口和映射文件的关系？
19. 什么是 Mapper 的注解开发？
20. XML 配置和注解开发的区别是什么？
21. 如何选择使用 XML 还是注解？

## SQL 映射

22. MyBatis 的 SQL 映射标签有哪些？
23. #{}和${}的区别是什么？
24. 如何防止 SQL 注入？
25. 什么是动态 SQL？
26. 动态 SQL 有哪些标签？
27. if 标签的作用是什么？
28. choose、when、otherwise 标签的作用是什么？
29. where 标签的作用是什么？
30. set 标签的作用是什么？
31. foreach 标签的作用是什么？如何使用？
32. trim 标签的作用是什么？

## 参数映射

33. MyBatis 如何传递参数？
34. 什么是 @Param 注解？
35. 如何传递多个参数？
36. 如何传递对象参数？
37. 如何传递 Map 参数？
38. 如何传递 List 参数？

## 结果映射

39. 什么是 resultType 和 resultMap？
40. resultType 和 resultMap 的区别是什么？
41. 如何自定义 resultMap？
42. 什么是字段映射？
43. 如何处理字段名和属性名不一致的情况？
44. 什么是自动映射？如何配置？

## 关联查询

45. MyBatis 如何实现一对一关联查询？
46. MyBatis 如何实现一对多关联查询？
47. MyBatis 如何实现多对多关联查询？
48. 什么是嵌套查询（N+1 问题）？
49. 什么是嵌套结果映射？
50. 嵌套查询和嵌套结果映射的区别是什么？
51. 什么是 association 标签？
52. 什么是 collection 标签？
53. 什么是延迟加载？如何配置？
54. 延迟加载的原理是什么？

## 缓存机制

55. MyBatis 有哪些缓存？
56. 什么是一级缓存？一级缓存的作用域是什么？
57. 什么是二级缓存？二级缓存的作用域是什么？
58. 一级缓存和二级缓存的区别是什么？
59. 如何开启二级缓存？
60. 什么情况下缓存会失效？
61. 如何清除缓存？
62. MyBatis 如何整合第三方缓存（如 Redis）？

## 插件机制

63. 什么是 MyBatis 插件？
64. MyBatis 插件的原理是什么？
65. 如何自定义 MyBatis 插件？
66. MyBatis 可以拦截哪些对象的方法？
67. 常用的 MyBatis 插件有哪些？
68. 什么是分页插件 PageHelper？如何使用？

## 执行流程

69. MyBatis 的执行流程是怎样的？
70. SqlSessionFactory 的作用是什么？
71. SqlSession 的作用是什么？
72. Executor 的作用是什么？Executor 有哪些类型？
73. StatementHandler 的作用是什么？
74. ParameterHandler 的作用是什么？
75. ResultSetHandler 的作用是什么？

## 高级特性

76. 如何获取自增主键的值？
77. 如何实现批量操作？
78. 什么是类型处理器（TypeHandler）？如何自定义？
79. 什么是对象工厂（ObjectFactory）？
80. 如何实现数据库字段加密？

## Spring 整合

81. MyBatis 如何与 Spring 整合？
82. 什么是 SqlSessionTemplate？
83. 什么是 MapperScannerConfigurer？
84. MyBatis-Spring 的工作原理是什么？
85. 如何在 Spring Boot 中使用 MyBatis？

## 性能优化

86. 如何优化 MyBatis 的性能？
87. 如何避免 N+1 问题？
88. 如何使用批量操作提高性能？
89. 如何使用缓存提高性能？
90. 如何优化 SQL 语句？