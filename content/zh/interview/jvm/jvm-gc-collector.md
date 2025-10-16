## 垃圾回收器

### 21. 常见的垃圾回收器有哪些？

Java 有 7 款经典的垃圾回收器，按代际和并发性分类：

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">垃圾回收器全景图</text>
<rect x="50" y="50" width="700" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="400" y="80" text-anchor="middle" font-size="16" font-weight="bold">新生代回收器</text>
<rect x="80" y="100" width="150" height="140" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
<text x="155" y="125" text-anchor="middle" font-size="14" font-weight="bold">Serial</text>
<text x="155" y="145" text-anchor="middle" font-size="11">单线程</text>
<text x="155" y="160" text-anchor="middle" font-size="11">STW</text>
<text x="155" y="175" text-anchor="middle" font-size="11">复制算法</text>
<text x="155" y="195" text-anchor="middle" font-size="10">客户端模式</text>
<text x="155" y="210" text-anchor="middle" font-size="10">JDK 1.3 前</text>
<rect x="250" y="100" width="150" height="140" fill="#fff9c4" stroke="#f9a825" stroke-width="2"/>
<text x="325" y="125" text-anchor="middle" font-size="14" font-weight="bold">ParNew</text>
<text x="325" y="145" text-anchor="middle" font-size="11">多线程</text>
<text x="325" y="160" text-anchor="middle" font-size="11">STW</text>
<text x="325" y="175" text-anchor="middle" font-size="11">复制算法</text>
<text x="325" y="195" text-anchor="middle" font-size="10">Serial 多线程版</text>
<text x="325" y="210" text-anchor="middle" font-size="10">配合 CMS</text>
<rect x="420" y="100" width="150" height="140" fill="#ffe0b2" stroke="#ef6c00" stroke-width="2"/>
<text x="495" y="125" text-anchor="middle" font-size="14" font-weight="bold">Parallel Scavenge</text>
<text x="495" y="145" text-anchor="middle" font-size="11">多线程</text>
<text x="495" y="160" text-anchor="middle" font-size="11">STW</text>
<text x="495" y="175" text-anchor="middle" font-size="11">复制算法</text>
<text x="495" y="195" text-anchor="middle" font-size="10">吞吐量优先</text>
<text x="495" y="210" text-anchor="middle" font-size="10">JDK 8 默认</text>
<rect x="590" y="100" width="140" height="140" fill="#e1bee7" stroke="#7b1fa2" stroke-width="2"/>
<text x="660" y="125" text-anchor="middle" font-size="14" font-weight="bold">G1</text>
<text x="660" y="145" text-anchor="middle" font-size="11">（新生代部分）</text>
<text x="660" y="165" text-anchor="middle" font-size="10">并行+并发</text>
<text x="660" y="182" text-anchor="middle" font-size="10">分区算法</text>
<text x="660" y="200" text-anchor="middle" font-size="10">停顿可控</text>
<text x="660" y="218" text-anchor="middle" font-size="10">JDK 9 默认</text>
<rect x="50" y="290" width="700" height="220" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="400" y="320" text-anchor="middle" font-size="16" font-weight="bold">老年代回收器</text>
<rect x="80" y="340" width="150" height="140" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
<text x="155" y="365" text-anchor="middle" font-size="14" font-weight="bold">Serial Old</text>
<text x="155" y="385" text-anchor="middle" font-size="11">单线程</text>
<text x="155" y="400" text-anchor="middle" font-size="11">STW</text>
<text x="155" y="415" text-anchor="middle" font-size="11">标记-整理</text>
<text x="155" y="435" text-anchor="middle" font-size="10">CMS 后备方案</text>
<rect x="250" y="340" width="150" height="140" fill="#ffe0b2" stroke="#ef6c00" stroke-width="2"/>
<text x="325" y="365" text-anchor="middle" font-size="14" font-weight="bold">Parallel Old</text>
<text x="325" y="385" text-anchor="middle" font-size="11">多线程</text>
<text x="325" y="400" text-anchor="middle" font-size="11">STW</text>
<text x="325" y="415" text-anchor="middle" font-size="11">标记-整理</text>
<text x="325" y="435" text-anchor="middle" font-size="10">吞吐量优先</text>
<rect x="420" y="340" width="150" height="140" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
<text x="495" y="365" text-anchor="middle" font-size="14" font-weight="bold">CMS</text>
<text x="495" y="385" text-anchor="middle" font-size="11">并发</text>
<text x="495" y="400" text-anchor="middle" font-size="11">低停顿</text>
<text x="495" y="415" text-anchor="middle" font-size="11">标记-清除</text>
<text x="495" y="435" text-anchor="middle" font-size="10">JDK 9 弃用</text>
<text x="495" y="450" text-anchor="middle" font-size="10">JDK 14 移除</text>
<rect x="590" y="340" width="140" height="140" fill="#e1bee7" stroke="#7b1fa2" stroke-width="2"/>
<text x="660" y="365" text-anchor="middle" font-size="14" font-weight="bold">G1</text>
<text x="660" y="385" text-anchor="middle" font-size="11">（老年代部分）</text>
<text x="660" y="405" text-anchor="middle" font-size="10">混合收集</text>
<text x="660" y="422" text-anchor="middle" font-size="10">全功能</text>
<text x="660" y="440" text-anchor="middle" font-size="10">面向服务端</text>
</svg>

**新一代低延迟 GC（JDK 11+）：**
- **ZGC**：超低延迟（< 10ms），JDK 11 引入，JDK 15 转正
- **Shenandoah**：超低延迟，Red Hat 主导

**组合搭配：**
- Serial + Serial Old：客户端模式
- ParNew + CMS：低延迟场景（已弃用）
- Parallel Scavenge + Parallel Old：高吞吐量场景
- G1：JDK 9+ 默认，平衡吞吐量和延迟
- ZGC / Shenandoah：超大堆、超低延迟场景

### 22. Serial 垃圾回收器的特点？

**Serial** 是最古老的垃圾回收器，单线程收集，GC 时必须暂停所有用户线程（STW）。

**特点：**
- ✅ **简单高效**：单线程无需线程交互开销
- ✅ **内存占用小**：适合客户端应用
- ❌ **STW 时间长**：不适合大堆内存
- **算法**：新生代用复制，老年代（Serial Old）用标记-整理
- **适用场景**：单核 CPU、小内存（几十 MB）的客户端应用

**启用参数：**`-XX:+UseSerialGC`

### 23. ParNew 垃圾回收器的特点？

**ParNew** 是 Serial 的多线程版本，是 CMS 的默认新生代收集器。

**特点：**
- ✅ **多线程并行**：充分利用多核 CPU
- ✅ **配合 CMS**：唯一能与 CMS 配合的新生代收集器
- ❌ **单核性能不如 Serial**：线程切换开销
- **算法**：标记-复制
- **适用场景**：多核服务器、配合 CMS 使用

**启用参数：**`-XX:+UseParNewGC`（JDK 9 后弃用，被 G1 替代）

### 24. Parallel Scavenge 垃圾回收器的特点？

**Parallel Scavenge** 关注**吞吐量优先**，适合后台运算不需要太多交互的场景。

**特点：**
- ✅ **高吞吐量**：最大化 CPU 利用率
- ✅ **自适应调节**：根据运行情况自动调整参数
- ❌ **停顿时间不可控**：可能较长
- **算法**：标记-复制
- **适用场景**：批处理、科学计算、后台任务

**核心参数：**
- `-XX:MaxGCPauseMillis`：最大 GC 停顿时间
- `-XX:GCTimeRatio`：吞吐量大小（默认99，即 GC 时间占 1%）
- `-XX:+UseAdaptiveSizePolicy`：自适应调节策略

**吞吐量 = 运行用户代码时间 / (运行用户代码时间 + GC 时间)**

### 25. CMS 垃圾回收器的工作流程？优缺点？

**CMS（Concurrent Mark Sweep）**以获取**最短停顿时间**为目标，适合重视响应速度的场景。

**工作流程（4个阶段）：**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">CMS 工作流程</text>
<rect x="50" y="60" width="160" height="100" fill="#ffcdd2" stroke="#c62828" stroke-width="2"/>
<text x="130" y="85" text-anchor="middle" font-size="13" font-weight="bold">1. 初始标记</text>
<text x="130" y="105" text-anchor="middle" font-size="11">(STW)</text>
<text x="130" y="125" text-anchor="middle" font-size="10">标记 GC Roots</text>
<text x="130" y="143" text-anchor="middle" font-size="10">直接关联对象</text>
<rect x="230" y="60" width="160" height="100" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
<text x="310" y="85" text-anchor="middle" font-size="13" font-weight="bold">2. 并发标记</text>
<text x="310" y="105" text-anchor="middle" font-size="11">(并发)</text>
<text x="310" y="125" text-anchor="middle" font-size="10">从 GC Roots</text>
<text x="310" y="143" text-anchor="middle" font-size="10">遍历对象图</text>
<rect x="410" y="60" width="160" height="100" fill="#ffcdd2" stroke="#c62828" stroke-width="2"/>
<text x="490" y="85" text-anchor="middle" font-size="13" font-weight="bold">3. 重新标记</text>
<text x="490" y="105" text-anchor="middle" font-size="11">(STW)</text>
<text x="490" y="125" text-anchor="middle" font-size="10">修正并发标记期间</text>
<text x="490" y="143" text-anchor="middle" font-size="10">变动的对象</text>
<rect x="590" y="60" width="160" height="100" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/>
<text x="670" y="85" text-anchor="middle" font-size="13" font-weight="bold">4. 并发清除</text>
<text x="670" y="105" text-anchor="middle" font-size="11">(并发)</text>
<text x="670" y="125" text-anchor="middle" font-size="10">清理垃圾对象</text>
<text x="670" y="143" text-anchor="middle" font-size="10">用户线程继续运行</text>
<rect x="50" y="190" width="340" height="140" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1"/>
<text x="220" y="215" text-anchor="middle" font-size="14" font-weight="bold">优点</text>
<text x="220" y="240" text-anchor="middle" font-size="12">• 并发收集，低停顿</text>
<text x="220" y="260" text-anchor="middle" font-size="12">• 响应速度快</text>
<text x="220" y="280" text-anchor="middle" font-size="12">• 适合 Web 应用</text>
<rect x="410" y="190" width="340" height="140" fill="#ffebee" stroke="#c62828" stroke-width="1"/>
<text x="580" y="215" text-anchor="middle" font-size="14" font-weight="bold">缺点</text>
<text x="580" y="240" text-anchor="middle" font-size="11">• CPU 敏感（占用资源）</text>
<text x="580" y="260" text-anchor="middle" font-size="11">• 浮动垃圾（无法清理并发期间产生的垃圾）</text>
<text x="580" y="280" text-anchor="middle" font-size="11">• 内存碎片（标记-清除算法）</text>
<text x="580" y="300" text-anchor="middle" font-size="11">• Concurrent Mode Failure → Full GC</text>
</svg>

**启用参数：**`-XX:+UseConcMarkSweepGC`

**注意：** JDK 9 标记弃用，JDK 14 删除，被 G1 替代

### 26. G1 垃圾回收器的工作原理？优缺点？

**G1（Garbage First）** 是面向服务端的垃圾回收器，JDK 9+ 默认 GC，兼顾吞吐量和低延迟。

**核心特点：**
1. **分区（Region）设计**：将堆划分为多个大小相等的独立区域
2. **优先回收价值最大的 Region**：Garbage First 的由来
3. **可预测的停顿时间**：可设置期望停顿时间

<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">G1 堆结构</text>
<rect x="60" y="50" width="80" height="80" fill="#81c784" stroke="#388e3c" stroke-width="1"/>
<text x="100" y="95" text-anchor="middle" font-size="11">Eden</text>
<rect x="150" y="50" width="80" height="80" fill="#81c784" stroke="#388e3c" stroke-width="1"/>
<text x="190" y="95" text-anchor="middle" font-size="11">Eden</text>
<rect x="240" y="50" width="80" height="80" fill="#a5d6a7" stroke="#66bb6a" stroke-width="1"/>
<text x="280" y="95" text-anchor="middle" font-size="11">Survivor</text>
<rect x="330" y="50" width="80" height="80" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="370" y="95" text-anchor="middle" font-size="11">Old</text>
<rect x="420" y="50" width="80" height="80" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="460" y="95" text-anchor="middle" font-size="11">Old</text>
<rect x="510" y="50" width="80" height="80" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1"/>
<text x="550" y="95" text-anchor="middle" font-size="11">Free</text>
<rect x="600" y="50" width="80" height="80" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1"/>
<text x="640" y="95" text-anchor="middle" font-size="11">Humongous</text>
<text x="400" y="155" text-anchor="middle" font-size="12">每个 Region 大小 1-32MB，动态分配角色</text>
<rect x="50" y="180" width="340" height="120" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1"/>
<text x="220" y="205" text-anchor="middle" font-size="14" font-weight="bold">优点</text>
<text x="220" y="228" text-anchor="middle" font-size="11">• 停顿时间可控</text>
<text x="220" y="248" text-anchor="middle" font-size="11">• 无内存碎片（整理）</text>
<text x="220" y="268" text-anchor="middle" font-size="11">• 并行并发收集</text>
<text x="220" y="288" text-anchor="middle" font-size="11">• 适合大堆（> 6GB）</text>
<rect x="410" y="180" width="340" height="120" fill="#ffebee" stroke="#c62828" stroke-width="1"/>
<text x="580" y="205" text-anchor="middle" font-size="14" font-weight="bold">缺点</text>
<text x="580" y="228" text-anchor="middle" font-size="11">• 内存占用高（需要额外内存记录）</text>
<text x="580" y="248" text-anchor="middle" font-size="11">• 小堆性能不如 CMS</text>
<text x="580" y="268" text-anchor="middle" font-size="11">• 额外的卡表维护</text>
</svg>

**启用参数：**`-XX:+UseG1GC`（JDK 9+ 默认）

**Young GC → Mixed GC → Full GC**（逐渐升级）

### 27. ZGC 和 Shenandoah GC 的特点？

**ZGC**（JDK 11+）和 **Shenandoah**（JDK 12+）都是超低延迟垃圾回收器。

**ZGC：**
- **目标**：停顿时间 < 10ms，不随堆大小增加
- **支持堆大小**：TB 级别（最大 16TB）
- **核心技术**：
  - 颜色指针（Colored Pointers）
  - 读屏障（Load Barrier）
  - 并发整理
- **适用**：大内存、低延迟场景（金融、实时系统）

**Shenandoah：**
- **目标**：停顿时间 < 10ms
- **核心技术**：
  - Brooks Pointers（转发指针）
  - 并发整理
  - 无分代设计
- **特点**：Red Hat 主导，不在 Oracle JDK 中

**两者对比：**
- ZGC：Oracle 官方，支持更大堆
- Shenandoah：开源社区，更早成熟

**启用参数：**
- ZGC：`-XX:+UseZGC`
- Shenandoah：`-XX:+UseShenandoahGC`

### 28. 如何选择合适的垃圾回收器？

**选择决策树：**

| 场景 | 推荐 GC | 原因 |
|------|---------|------|
| 客户端应用 | Serial | 简单高效，内存占用小 |
| 服务端，重吞吐量 | Parallel Scavenge + Parallel Old | 高吞吐量，批处理场景 |
| 服务端，重响应 | G1 | 平衡吞吐量和延迟 |
| 大堆（> 100GB），超低延迟 | ZGC / Shenandoah | 停顿时间 < 10ms |
| 遗留系统 | CMS（已弃用） | 低延迟，但有碎片问题 |

**关键指标：**
1. **停顿时间**：用户体验优先 → G1 / ZGC
2. **吞吐量**：计算密集型 → Parallel
3. **堆大小**：< 4GB → G1，> 100GB → ZGC
4. **JDK 版本**：
   - JDK 8：Parallel（默认）或 G1
   - JDK 11+：G1（默认）或 ZGC

**通用建议：**
- **默认选择**：JDK 9+ 使用 G1
- **特殊优化**：根据实际测试调整
- **监控调优**：结合 GC 日志分析
