# RocketMQ 面试题

## 基础概念

1. 什么是 RocketMQ？RocketMQ 的特点是什么？
2. RocketMQ 的核心组件有哪些？
3. 什么是 Producer、Consumer、Broker、NameServer？
4. RocketMQ 和 Kafka 的区别是什么？
5. RocketMQ 的应用场景有哪些？

## 架构设计

6. RocketMQ 的整体架构是怎样的？
7. NameServer 的作用是什么？为什么不使用 ZooKeeper？
8. Broker 的作用是什么？Master 和 Slave 的区别是什么？
9. 什么是 Topic 和 Queue？它们之间的关系是什么？
10. 什么是 Message Queue？
11. RocketMQ 如何实现路由发现？
12. Producer 如何知道向哪个 Broker 发送消息？

## 消息发送

13. RocketMQ 有哪些消息发送方式？
14. 什么是同步发送、异步发送、单向发送？
15. 如何保证消息发送成功？
16. 什么是消息发送的重试机制？
17. 消息发送失败如何处理？
18. 什么是批量消息？如何发送批量消息？
19. 如何选择 Message Queue 进行发送？

## 消息消费

20. RocketMQ 有哪些消费模式？
21. 什么是集群消费和广播消费？
22. 什么是 Push 消费和 Pull 消费？
23. Consumer 如何实现负载均衡？
24. 什么是消费位点（Offset）？
25. 消费失败如何处理？
26. 什么是消费重试机制？
27. 什么是死信队列（Dead Letter Queue）？
28. 如何保证消息被消费？

## 消息可靠性

29. 如何保证消息不丢失？
30. Producer 端如何保证消息不丢失？
31. Broker 端如何保证消息不丢失？
32. Consumer 端如何保证消息不丢失？
33. 什么是消息刷盘机制？同步刷盘和异步刷盘的区别是什么？
34. 什么是主从同步？同步复制和异步复制的区别是什么？

## 消息顺序性

35. RocketMQ 如何保证消息的顺序性？
36. 什么是全局顺序消息和分区顺序消息？
37. 如何实现顺序消息？
38. 顺序消息在消费失败时如何处理？

## 消息去重与幂等

39. RocketMQ 如何保证消息不重复？
40. 什么情况下会出现重复消息？
41. 如何实现消息的幂等性？
42. 什么是消息的唯一标识（MessageId 和 Key）？

## 事务消息

43. 什么是事务消息？
44. RocketMQ 如何实现事务消息？
45. 事务消息的执行流程是什么？
46. 什么是事务消息的回查机制？
47. 事务消息的应用场景有哪些？

## 延迟消息

48. 什么是延迟消息？
49. RocketMQ 如何实现延迟消息？
50. RocketMQ 支持哪些延迟级别？
51. 如何自定义延迟时间？

## 消息过滤

52. RocketMQ 支持哪些消息过滤方式？
53. 什么是 Tag 过滤和 SQL92 过滤？
54. 如何使用 Tag 进行消息过滤？
55. 如何使用 SQL92 进行消息过滤？

## 性能优化

56. 如何提高 RocketMQ 的性能？
57. 如何优化 Producer 的性能？
58. 如何优化 Consumer 的性能？
59. 什么是消息堆积？如何处理消息堆积？
60. 如何监控 RocketMQ 的性能指标？

## 高可用

61. RocketMQ 如何实现高可用？
62. Broker 如何实现主从切换？
63. 什么是 Dledger 模式？
64. NameServer 如何实现高可用？
65. 如何避免单点故障？

## 存储机制

66. RocketMQ 的消息存储结构是怎样的？
67. 什么是 CommitLog、ConsumeQueue、IndexFile？
68. RocketMQ 为什么这么快？
69. 什么是零拷贝技术？RocketMQ 如何使用？
70. RocketMQ 的消息存储如何清理？