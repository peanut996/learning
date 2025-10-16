## 性能调优

### 34. 常用的 JVM 参数有哪些？

**JVM 参数分为三类：**
- **标准参数（-）**：所有 JVM 都支持，如 `-version`
- **X 参数（-X）**：非标准，如 `-Xms`、`-Xmx`
- **XX 参数（-XX）**：不稳定，如 `-XX:+UseG1GC`

**常用参数：**

| 类别 | 参数 | 说明 | 示例 |
|------|------|------|------|
| **堆内存** | `-Xms` | 初始堆大小 | `-Xms512m` |
| | `-Xmx` | 最大堆大小 | `-Xmx2g` |
| | `-Xmn` | 新生代大小 | `-Xmn256m` |
| | `-XX:NewRatio` | 老年代/新生代比例 | `-XX:NewRatio=2`（2:1） |
| | `-XX:SurvivorRatio` | Eden/Survivor比例 | `-XX:SurvivorRatio=8`（8:1:1） |
| **栈** | `-Xss` | 栈大小 | `-Xss256k` |
| **元空间** | `-XX:MetaspaceSize` | 初始元空间大小 | `-XX:MetaspaceSize=128m` |
| | `-XX:MaxMetaspaceSize` | 最大元空间大小 | `-XX:MaxMetaspaceSize=512m` |
| **GC** | `-XX:+UseG1GC` | 使用 G1 收集器 | - |
| | `-XX:+UseSerialGC` | 使用 Serial 收集器 | - |
| | `-XX:MaxGCPauseMillis` | 最大 GC 停顿时间 | `-XX:MaxGCPauseMillis=200` |
| | `-XX:GCTimeRatio` | 吞吐量大小 | `-XX:GCTimeRatio=99` |
| **日志** | `-Xlog:gc*` | GC 日志（JDK 9+） | `-Xlog:gc*:file=gc.log` |
| | `-XX:+PrintGCDetails` | 打印 GC 详情（JDK 8） | - |
| **调试** | `-XX:+HeapDumpOnOutOfMemoryError` | OOM 时 Dump 堆 | - |
| | `-XX:HeapDumpPath` | Dump 文件路径 | `-XX:HeapDumpPath=/logs/` |

**生产环境推荐配置：**
```bash
java -Xms4g -Xmx4g -Xmn2g -Xss256k \
     -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=512m \
     -XX:+UseG1GC -XX:MaxGCPauseMillis=200 \
     -XX:+HeapDumpOnOutOfMemoryError \
     -XX:HeapDumpPath=/logs/heapdump.hprof \
     -Xlog:gc*:file=/logs/gc.log \
     -jar myapp.jar
```

### 35. 如何分析 GC 日志？

**GC 日志关键信息：**
1. **GC 类型**：Minor GC / Major GC / Full GC
2. **GC 原因**：Allocation Failure、System.gc()等
3. **内存变化**：GC 前后的堆大小
4. **停顿时间**：GC 耗时

**示例日志（G1 GC）：**
```
[GC pause (G1 Evacuation Pause) (young), 0.0234567 secs]
   [Parallel Time: 21.5 ms, GC Workers: 4]
   [Eden: 512M(512M)->0B(480M) Survivors: 32M->64M Heap: 1G(4G)->600M(4G)]
   [Times: user=0.08 sys=0.00, real=0.02 secs]
```

**分析要点：**
- **频率**：GC 过于频繁 → 堆太小或对象创建过多
- **停顿时间**：超过目标 → 调整 `-XX:MaxGCPauseMillis`
- **内存回收效果**：回收率低 → 可能有内存泄漏
- **晋升速率**：老年代增长快 → 对象存活时间长

**分析工具：**
- **GCEasy**：在线分析 GC 日志
- **GCViewer**：可视化 GC 日志
- **JVM Profiler**：实时监控

### 36. 什么是内存泄漏？如何排查？

**内存泄漏（Memory Leak）**：对象无法被 GC 回收，但实际上已不再使用，导致可用内存逐渐减少。

**常见原因：**
1. **集合类未清理**：HashMap、List 持续添加，不删除
2. **静态集合**：静态变量引用的集合
3. **监听器未注销**：事件监听器、回调函数
4. **线程未关闭**：ThreadLocal、线程池
5. **资源未释放**：IO流、数据库连接

**排查步骤：**
1. **监控内存趋势**：观察堆内存持续增长
2. **Dump 堆快照**：`jmap -dump:format=b,file=heap.hprof <pid>`
3. **分析快照**：使用 MAT（Memory Analyzer Tool）
4. **定位问题对象**：找到占用内存最多的对象
5. **追溯引用链**：分析 GC Roots 到对象的引用路径

**预防措施：**
- 使用完资源及时关闭（try-with-resources）
- 避免在静态集合中存放大对象
- 及时清理ThreadLocal
- 使用弱引用（WeakReference）

### 37. 什么是内存溢出？常见的内存溢出有哪些？

**内存溢出（OutOfMemoryError, OOM）**：程序申请内存时，没有足够的内存空间供其使用。

**常见的 OOM 类型：**

| 类型 | 原因 | 解决方案 |
|------|------|---------|
| **Java heap space** | 堆内存不足 | 增大 `-Xmx`，检查内存泄漏 |
| **GC overhead limit exceeded** | GC 时间占比 > 98% | 增大堆，优化代码 |
| **Metaspace** | 元空间不足（类太多） | 增大 `-XX:MaxMetaspaceSize` |
| **Unable to create new native thread** | 线程过多 | 减少线程数，增大 `-Xss` |
| **Direct buffer memory** | 直接内存不足（NIO） | 增大 `-XX:MaxDirectMemorySize` |
| **Requested array size exceeds VM limit** | 数组太大 | 拆分数组 |

**示例：**
```
// 堆内存溢出
java.lang.OutOfMemoryError: Java heap space

// 元空间溢出
java.lang.OutOfMemoryError: Metaspace

// 无法创建线程
java.lang.OutOfMemoryError: unable to create new native thread
```

### 38. 如何排查 OOM 问题？

**排查流程：**

1. **获取堆 Dump**
   ```bash
   # OOM 时自动 Dump
   -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/logs/

   # 手动 Dump
   jmap -dump:live,format=b,file=heap.hprof <pid>
   ```

2. **使用 MAT 分析**
   - 打开 heap.hprof
   - 查看 Leak Suspects（泄漏嫌疑）
   - 分析 Dominator Tree（支配树）
   - 查看 GC Roots 引用链

3. **定位问题代码**
   - 找到占用内存最多的类
   - 分析对象的引用路径
   - 检查业务代码

4. **验证修复**
   - 修改代码
   - 压测验证
   - 监控内存趋势

**快速排查命令：**
```bash
# 查看堆内存使用
jmap -heap <pid>

# 查看对象统计
jmap -histo:live <pid> | head -20

# 查看线程栈
jstack <pid> > thread.txt
```

### 39. 常用的 JVM 诊断工具有哪些？

**JDK 自带工具：**
- **jps**：查看 Java 进程
- **jinfo**：查看/修改 JVM 参数
- **jstat**：监控 GC 和堆内存
- **jmap**：生成堆 Dump、查看内存
- **jstack**：生成线程 Dump
- **jcmd**：综合诊断工具（JDK 7+）

**可视化工具：**
- **JConsole**：JDK 自带，监控内存、线程、类
- **VisualVM**：功能强大的性能分析工具
- **JMC（Java Mission Control）**：Oracle 官方工具
- **Arthas**：阿里开源，线上诊断神器

**第三方工具：**
- **MAT（Memory Analyzer Tool）**：Eclipse 出品，分析堆 Dump
- **GCViewer / GCEasy**：GC 日志分析
- **JProfiler / YourKit**：商业性能分析工具
- **Async-profiler**：低开销的性能分析工具

### 40. jmap、jstat、jstack、jinfo 的作用？

| 工具 | 作用 | 常用命令 |
|------|------|---------|
| **jmap** | 内存映射工具 | `jmap -heap <pid>` - 查看堆信息<br>`jmap -histo <pid>` - 对象统计<br>`jmap -dump:format=b,file=heap.hprof <pid>` - Dump 堆 |
| **jstat** | 统计信息监控 | `jstat -gc <pid> 1000 10` - 每秒GC统计，共10次<br>`jstat -gcutil <pid>` - GC 百分比<br>`jstat -gccause <pid>` - GC 原因 |
| **jstack** | 线程堆栈分析 | `jstack <pid>` - 打印线程栈<br>`jstack -l <pid>` - 额外锁信息<br>用于死锁检测、CPU 飙高分析 |
| **jinfo** | 配置信息工具 | `jinfo -flags <pid>` - 查看 JVM 参数<br>`jinfo -flag PrintGC <pid>` - 查看单个参数<br>`jinfo -flag +PrintGC <pid>` - 动态开启参数 |

**实战案例：**
```bash
# 1. CPU 飙高排查
top -Hp <pid>  # 找到占用 CPU 高的线程 ID
printf "%x\n" <线程ID>  # 转换为 16 进制
jstack <pid> | grep <16进制线程ID> -A 20  # 查看线程栈

# 2. 内存泄漏排查
jmap -histo:live <pid> | head -20  # 查看内存占用 Top 20
jmap -dump:live,format=b,file=heap.hprof <pid>  # Dump 堆
# 使用 MAT 分析 heap.hprof

# 3. GC 问题排查
jstat -gcutil <pid> 1000  # 实时监控 GC
jinfo -flag UseG1GC <pid>  # 查看 GC 类型
```

**记忆技巧：**
- **jmap**：map → 内存映射
- **jstat**：stat → 统计
- **jstack**：stack → 栈
- **jinfo**：info → 信息
