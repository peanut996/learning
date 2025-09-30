# Java Concurrency Interview Questions

## Concurrency Basics

### 1. What's the difference between concurrency and parallelism?

### 2. What is thread safety?

### 3. What is deadlock? How to avoid deadlock?

### 4. What is livelock and starvation?

### 5. What's the difference between process and thread?

### 6. What's the difference between coroutine and thread?

## synchronized

### 7. How does synchronized work internally?

### 8. What's the difference when synchronized is used in different locations?

### 9. What are the lock optimization mechanisms of synchronized? (biased lock, lightweight lock, heavyweight lock)

### 10. What's the difference between synchronized and ReentrantLock?

### 11. What is a reentrant lock?

## volatile

### 12. What does the volatile keyword do?

### 13. How is volatile implemented internally? (memory barriers)

### 14. Can volatile guarantee atomicity?

### 15. What's the difference between volatile and synchronized?

## CAS

### 16. What is CAS?

### 17. How does CAS work internally?

### 18. What are the problems with CAS? (ABA problem, spin overhead, single variable only)

### 19. How to solve the ABA problem?

## Locks

### 20. What are optimistic lock and pessimistic lock?

### 21. What are fair lock and unfair lock?

### 22. What are shared lock and exclusive lock?

### 23. What is a spin lock?

### 24. How does ReentrantLock work internally?

### 25. How does ReentrantReadWriteLock work internally?

### 26. What is StampedLock?

## AQS

### 27. What is AQS?

### 28. How does AQS work internally?

### 29. What are the applications of AQS?

### 30. What's the difference between CountDownLatch, CyclicBarrier and Semaphore?
