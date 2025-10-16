## 垃圾回收算法

### 15. 标记-清除算法的原理？优缺点？

**标记-清除算法（Mark-Sweep）** 是最基础的垃圾收集算法，分为两个阶段：

<svg viewBox="0 0 850 400" xmlns="http://www.w3.org/2000/svg">
<text x="425" y="25" text-anchor="middle" font-size="20" font-weight="bold">标记-清除算法</text>
<text x="200" y="60" text-anchor="middle" font-size="16" font-weight="bold">阶段 1：标记</text>
<rect x="50" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="80" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="120" y="80" width="60" height="50" fill="#f44336" stroke="#c62828" stroke-width="2"/>
<text x="150" y="110" text-anchor="middle" font-size="11" fill="white">垃圾</text>
<rect x="190" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="220" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="260" y="80" width="60" height="50" fill="#f44336" stroke="#c62828" stroke-width="2"/>
<text x="290" y="110" text-anchor="middle" font-size="11" fill="white">垃圾</text>
<rect x="330" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="360" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<defs>
  <marker id="arrowright" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
    <path d="M0,0 L0,6 L9,3 z" fill="#666"/>
  </marker>
</defs>

<path d="M 400 105 L 500 105" stroke="#666" stroke-width="3" marker-end="url(#arrowright)"/>
<text x="450" y="95" text-anchor="middle" font-size="12" fill="#666" font-weight="bold">清除垃圾</text>
<text x="650" y="60" text-anchor="middle" font-size="16" font-weight="bold">阶段 2：清除</text>
<rect x="510" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="540" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="580" y="80" width="60" height="50" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1" stroke-dasharray="3,3"/>
<text x="610" y="110" text-anchor="middle" font-size="11" fill="#666">空闲</text>
<rect x="650" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="680" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<rect x="720" y="80" width="60" height="50" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1" stroke-dasharray="3,3"/>
<text x="750" y="110" text-anchor="middle" font-size="11" fill="#666">空闲</text>
<rect x="790" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
<text x="820" y="110" text-anchor="middle" font-size="11" fill="white">存活</text>
<text x="680" y="155" text-anchor="middle" font-size="12" fill="#d32f2f" font-weight="bold">⚠ 产生内存碎片</text>
<rect x="50" y="240" width="340" height="140" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2" rx="5"/>
<text x="220" y="265" text-anchor="middle" font-size="14" font-weight="bold">优点</text>
<text x="70" y="290" font-size="12">• 实现简单</text>
<text x="70" y="310" font-size="12">• 不需要移动对象</text>
<text x="70" y="330" font-size="12">• 适合存活对象多的场景</text>
<text x="85" y="350" font-size="12">（老年代）</text>
<rect x="460" y="240" width="340" height="140" fill="#ffcdd2" stroke="#c62828" stroke-width="2" rx="5"/>
<text x="630" y="265" text-anchor="middle" font-size="14" font-weight="bold">缺点</text>
<text x="480" y="290" font-size="12">• 效率不稳定（对象多时慢）</text>
<text x="480" y="310" font-size="12">• 产生内存碎片</text>
<text x="480" y="330" font-size="12">• 需要维护空闲列表</text>
<text x="480" y="350" font-size="12">• 分配大对象时可能失败</text>
</svg>

**核心问题：内存碎片**
- 清除后内存不连续，出现很多小的空闲区域
- 即使总空闲空间足够，也可能无法分配大对象
- 需要额外的空闲列表维护成本

### 16. 标记-复制算法的原理？优缺点？

**标记-复制算法（Mark-Copy）** 将内存分为两块，每次只使用其中一块。GC 时将存活对象复制到另一块，然后清空当前块。

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg"><text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">标记-复制算法（新生代）</text><text x="200" y="60" text-anchor="middle" font-size="16" font-weight="bold">GC 前</text><rect x="50" y="80" width="300" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/><text x="200" y="100" text-anchor="middle" font-size="13" font-weight="bold">Eden 区（使用中）</text><rect x="70" y="110" width="40" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/><text x="90" y="135" text-anchor="middle" font-size="10" fill="white">存活</text><rect x="120" y="110" width="40" height="40" fill="#f44336" stroke="#c62828" stroke-width="1"/><text x="140" y="135" text-anchor="middle" font-size="10" fill="white">垃圾</text><rect x="170" y="110" width="40" height="40" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/><text x="190" y="135" text-anchor="middle" font-size="10" fill="white">存活</text><rect x="220" y="110" width="40" height="40" fill="#f44336" stroke="#c62828" stroke-width="1"/><text x="240" y="135" text-anchor="middle" font-size="10" fill="white">垃圾</text><rect x="270" y="110" width="40" height="40" fill="#f44336" stroke="#c62828" stroke-width="1"/><text x="290" y="135" text-anchor="middle" font-size="10" fill="white">垃圾</text><text x="200" y="180" text-anchor="middle" font-size="11">8 个对象，2 个存活，6 个垃圾</text><rect x="50" y="220" width="140" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/><text x="120" y="240" text-anchor="middle" font-size="13" font-weight="bold">Survivor 0</text><text x="120" y="260" text-anchor="middle" font-size="11">（空闲）</text><rect x="210" y="220" width="140" height="80" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1"/><text x="280" y="240" text-anchor="middle" font-size="13" font-weight="bold">Survivor 1</text><text x="280" y="260" text-anchor="middle" font-size="11">（空闲）</text><defs><marker id="arrowright" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0,0 L0,10 L9,5 z" fill="#388e3c"/></marker></defs><path d="M 360 140 L 440 140" stroke="#388e3c" stroke-width="3" marker-end="url(#arrowright)"/><text x="400" y="130" text-anchor="middle" font-size="12" fill="#d32f2f" font-weight="bold">复制存活对象</text><text x="600" y="60" text-anchor="middle" font-size="16" font-weight="bold">GC 后</text><rect x="450" y="80" width="300" height="120" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1" stroke-dasharray="5,5"/><text x="600" y="100" text-anchor="middle" font-size="13" font-weight="bold">Eden 区（清空）</text><text x="600" y="125" text-anchor="middle" font-size="11" fill="#666">全部清空，无碎片</text><rect x="450" y="220" width="140" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/><text x="520" y="240" text-anchor="middle" font-size="13" font-weight="bold">Survivor 0</text><text x="520" y="258" text-anchor="middle" font-size="11">（使用中）</text><rect x="470" y="265" width="40" height="30" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/><text x="490" y="283" text-anchor="middle" font-size="10" fill="white">存活</text><rect x="520" y="265" width="40" height="30" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/><text x="540" y="283" text-anchor="middle" font-size="10" fill="white">存活</text><rect x="610" y="220" width="140" height="80" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1"/><text x="680" y="240" text-anchor="middle" font-size="13" font-weight="bold">Survivor 1</text><text x="680" y="260" text-anchor="middle" font-size="11">（空闲）</text><text x="600" y="180" text-anchor="middle" font-size="11" fill="#2e7d32" font-weight="bold">✓ 只保留存活对象，无碎片</text><rect x="50" y="330" width="340" height="110" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2" rx="5"/><text x="220" y="355" text-anchor="middle" font-size="14" font-weight="bold">优点</text><text x="70" y="377" font-size="12">• 无内存碎片</text><text x="70" y="397" font-size="12">• 效率高（只复制存活对象）</text><text x="70" y="417" font-size="12">• 适合存活对象少的场景（新生代）</text><rect x="410" y="330" width="340" height="110" fill="#ffcdd2" stroke="#c62828" stroke-width="2" rx="5"/><text x="580" y="355" text-anchor="middle" font-size="14" font-weight="bold">缺点</text><text x="430" y="377" font-size="12">• 浪费一半内存（实际只用 10%）</text><text x="430" y="397" font-size="12">• 存活对象多时效率低</text><text x="430" y="417" font-size="12">• 需要额外的空间担保</text></svg>

**HotSpot 的优化：Eden + 2个Survivor（8:1:1）**
- Eden : Survivor0 : Survivor1 = 8 : 1 : 1
- 每次使用 Eden + 1个Survivor，利用率 90%
- GC 时将存活对象复制到另一个 Survivor
- 如果 Survivor 放不下，则直接进入老年代（空间担保）

**适用场景：新生代**（对象存活率低，通常 < 10%）

### 17. 标记-整理算法的原理？优缺点？

**标记-整理算法（Mark-Compact）** 标记后不是直接清理，而是让所有存活对象向内存一端移动，然后清理边界外的内存。

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg"><text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">标记-整理算法</text><text x="200" y="60" text-anchor="middle" font-size="16" font-weight="bold">整理前</text><rect x="50" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/><text x="80" y="110" text-anchor="middle" font-size="11" fill="white">存活</text><rect x="120" y="80" width="60" height="50" fill="#f44336" stroke="#c62828" stroke-width="2"/><text x="150" y="110" text-anchor="middle" font-size="11" fill="white">垃圾</text><rect x="190" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/><text x="220" y="110" text-anchor="middle" font-size="11" fill="white">存活</text><rect x="260" y="80" width="60" height="50" fill="#f44336" stroke="#c62828" stroke-width="2"/><text x="290" y="110" text-anchor="middle" font-size="11" fill="white">垃圾</text><rect x="330" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/><text x="360" y="110" text-anchor="middle" font-size="11" fill="white">存活</text><text x="200" y="155" text-anchor="middle" font-size="11">内存碎片化</text><defs><marker id="arrowright2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#666"/></marker></defs><path d="M 395 105 L 445 105" stroke="#666" stroke-width="3" marker-end="url(#arrowright2)"/><text x="420" y="85" text-anchor="middle" font-size="12" fill="#d32f2f" font-weight="bold">压缩整理</text><text x="420" y="145" text-anchor="middle" font-size="10" fill="#666">移动存活对象到一端</text><text x="620" y="60" text-anchor="middle" font-size="16" font-weight="bold">整理后</text><rect x="450" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/><text x="480" y="110" text-anchor="middle" font-size="11" fill="white">存活</text><rect x="520" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/><text x="550" y="110" text-anchor="middle" font-size="11" fill="white">存活</text><rect x="590" y="80" width="60" height="50" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/><text x="620" y="110" text-anchor="middle" font-size="11" fill="white">存活</text><rect x="660" y="80" width="130" height="50" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="1" stroke-dasharray="3,3"/><text x="725" y="110" text-anchor="middle" font-size="11" fill="#666">清空区域</text><text x="620" y="155" text-anchor="middle" font-size="11" fill="#2e7d32" font-weight="bold">✓ 连续内存，无碎片</text><rect x="50" y="280" width="340" height="110" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2" rx="5"/><text x="220" y="305" text-anchor="middle" font-size="14" font-weight="bold">优点</text><text x="70" y="327" font-size="12">• 无内存碎片</text><text x="70" y="347" font-size="12">• 内存利用率高（无需预留空间）</text><text x="70" y="367" font-size="12">• 适合存活对象多的场景（老年代）</text><rect x="410" y="280" width="340" height="110" fill="#ffcdd2" stroke="#c62828" stroke-width="2" rx="5"/><text x="580" y="305" text-anchor="middle" font-size="14" font-weight="bold">缺点</text><text x="430" y="327" font-size="12">• 移动对象开销大</text><text x="430" y="347" font-size="12">• 需要暂停用户线程（STW）</text><text x="430" y="367" font-size="12">• 更新所有引用，效率较低</text></svg>

**三种算法对比：**

| 算法 | 速度 | 空间利用率 | 是否移动对象 | 适用场景 |
|------|------|-----------|-------------|----------|
| 标记-清除 | 中等 | 低（碎片） | 否 | 老年代 |
| 标记-复制 | 快 | 低（50%或90%） | 是 | 新生代 |
| 标记-整理 | 慢 | 高 | 是 | 老年代 |

**记忆技巧：**
- **清除**：最简单，但有碎片（像扫地，不整理）
- **复制**：最快，但浪费空间（像搬家，只带走有用的）
- **整理**：最慢，但最节省（像整理书架，移动归位）

### 18. 分代收集算法是什么？

**分代收集（Generational Collection）** 根据对象存活周期的不同，将堆分为新生代和老年代，针对不同代使用不同的收集算法。

**理论基础：弱分代假说（Weak Generational Hypothesis）**
1. **大部分对象朝生夕死**：98% 的对象在创建后很快死亡
2. **熬过多次 GC 的对象难以消亡**：存活时间长的对象会继续存活很久

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">分代收集模型</text>
<rect x="50" y="50" width="700" height="370" fill="#f5f5f5" stroke="#333" stroke-width="2"/>
<text x="400" y="75" text-anchor="middle" font-size="16" font-weight="bold">Java 堆</text>
<rect x="80" y="100" width="640" height="150" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="400" y="125" text-anchor="middle" font-size="15" font-weight="bold">新生代（Young Generation）1/3</text>
<rect x="100" y="140" width="400" height="90" fill="#81c784" stroke="#388e3c" stroke-width="1"/>
<text x="300" y="165" text-anchor="middle" font-size="13">Eden 区（80%）</text>
<text x="300" y="185" text-anchor="middle" font-size="11">对象首次分配的区域</text>
<text x="300" y="203" text-anchor="middle" font-size="11">存活率：< 10%</text>
<rect x="520" y="140" width="90" height="90" fill="#a5d6a7" stroke="#66bb6a" stroke-width="1"/>
<text x="565" y="165" text-anchor="middle" font-size="12">Survivor 0</text>
<text x="565" y="185" text-anchor="middle" font-size="11">(10%)</text>
<rect x="620" y="140" width="90" height="90" fill="#a5d6a7" stroke="#66bb6a" stroke-width="1"/>
<text x="665" y="165" text-anchor="middle" font-size="12">Survivor 1</text>
<text x="665" y="185" text-anchor="middle" font-size="11">(10%)</text>
<text x="565" y="210" text-anchor="middle" font-size="10">两个 Survivor</text>
<text x="565" y="223" text-anchor="middle" font-size="10">交替使用</text>
<rect x="80" y="270" width="640" height="130" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="400" y="295" text-anchor="middle" font-size="15" font-weight="bold">老年代（Old Generation）2/3</text>
<text x="400" y="320" text-anchor="middle" font-size="12">存放长期存活的对象</text>
<text x="400" y="340" text-anchor="middle" font-size="12">对象经过多次 Minor GC 后晋升到这里</text>
<text x="400" y="360" text-anchor="middle" font-size="12">存活率：> 90%</text>
<text x="400" y="380" text-anchor="middle" font-size="11" fill="#d32f2f">大对象直接分配到老年代</text>
</svg>

### 19. 新生代和老年代使用什么垃圾回收算法？

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">分代与算法对应关系</text>
<rect x="50" y="60" width="330" height="260" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
<text x="215" y="90" text-anchor="middle" font-size="16" font-weight="bold">新生代</text>
<text x="215" y="115" text-anchor="middle" font-size="13">特点：对象朝生夕死</text>
<text x="215" y="140" text-anchor="middle" font-size="13" fill="#d32f2f" font-weight="bold">标记-复制算法</text>
<rect x="80" y="160" width="270" height="140" fill="#bbdefb" stroke="#1565c0" stroke-width="1"/>
<text x="215" y="185" text-anchor="middle" font-size="12" font-weight="bold">为什么选择复制算法？</text>
<text x="215" y="210" text-anchor="middle" font-size="11">• 存活对象少（< 10%）</text>
<text x="215" y="230" text-anchor="middle" font-size="11">• 复制成本低</text>
<text x="215" y="250" text-anchor="middle" font-size="11">• 无内存碎片</text>
<text x="215" y="270" text-anchor="middle" font-size="11">• 效率高，适合频繁 GC</text>
<rect x="420" y="60" width="330" height="260" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
<text x="585" y="90" text-anchor="middle" font-size="16" font-weight="bold">老年代</text>
<text x="585" y="115" text-anchor="middle" font-size="13">特点：对象存活率高</text>
<text x="585" y="140" text-anchor="middle" font-size="13" fill="#d32f2f" font-weight="bold">标记-清除 或 标记-整理</text>
<rect x="450" y="160" width="270" height="140" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/>
<text x="585" y="185" text-anchor="middle" font-size="12" font-weight="bold">为什么不用复制算法？</text>
<text x="585" y="210" text-anchor="middle" font-size="11">• 存活对象多（> 90%）</text>
<text x="585" y="230" text-anchor="middle" font-size="11">• 复制成本高</text>
<text x="585" y="250" text-anchor="middle" font-size="11">• 没有额外空间做担保</text>
<text x="585" y="270" text-anchor="middle" font-size="11">• GC 频率低，容忍整理开销</text>
</svg>

**对象晋升规则（新生代 → 老年代）：**
1. **年龄达标**：经过 15 次 Minor GC 仍存活（-XX:MaxTenuringThreshold）
2. **动态年龄判定**：Survivor 中相同年龄对象大小总和 > Survivor 空间一半
3. **大对象直接进入**：大对象（如大数组）直接分配到老年代
4. **空间担保失败**：Survivor 放不下时，直接进入老年代

**记忆技巧：**
- **新生代**：年轻人流动性大 → 复制算法（搬家）
- **老年代**：老年人稳定不动 → 清除/整理算法（原地整理）

### 20. 什么是 Minor GC、Major GC 和 Full GC？

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg"><text x="400" y="25" text-anchor="middle" font-size="20" font-weight="bold">GC 类型对比</text><rect x="50" y="60" width="230" height="360" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/><text x="165" y="90" text-anchor="middle" font-size="16" font-weight="bold">Minor GC</text><text x="165" y="115" text-anchor="middle" font-size="13">(Young GC)</text><rect x="70" y="130" width="190" height="270" fill="#bbdefb" stroke="#1565c0" stroke-width="1"/><text x="165" y="155" text-anchor="middle" font-size="13" font-weight="bold">发生区域</text><text x="165" y="175" text-anchor="middle" font-size="12">新生代</text><text x="165" y="205" text-anchor="middle" font-size="13" font-weight="bold">触发条件</text><text x="165" y="225" text-anchor="middle" font-size="11">Eden 区满</text><text x="165" y="255" text-anchor="middle" font-size="13" font-weight="bold">频率</text><text x="165" y="275" text-anchor="middle" font-size="11" fill="#d32f2f">非常频繁</text><text x="165" y="305" text-anchor="middle" font-size="13" font-weight="bold">停顿时间</text><text x="165" y="325" text-anchor="middle" font-size="11" fill="#4caf50">短（几十毫秒）</text><text x="165" y="355" text-anchor="middle" font-size="13" font-weight="bold">算法</text><text x="165" y="375" text-anchor="middle" font-size="11">标记-复制</text><rect x="295" y="60" width="230" height="360" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/><text x="410" y="90" text-anchor="middle" font-size="16" font-weight="bold">Major GC</text><text x="410" y="115" text-anchor="middle" font-size="13">(Old GC)</text><rect x="315" y="130" width="190" height="270" fill="#ffe0b2" stroke="#ef6c00" stroke-width="1"/><text x="410" y="155" text-anchor="middle" font-size="13" font-weight="bold">发生区域</text><text x="410" y="175" text-anchor="middle" font-size="12">老年代</text><text x="410" y="205" text-anchor="middle" font-size="13" font-weight="bold">触发条件</text><text x="410" y="225" text-anchor="middle" font-size="11">老年代满</text><text x="410" y="245" text-anchor="middle" font-size="11">晋升失败</text><text x="410" y="275" text-anchor="middle" font-size="13" font-weight="bold">频率</text><text x="410" y="295" text-anchor="middle" font-size="11">较少</text><text x="410" y="325" text-anchor="middle" font-size="13" font-weight="bold">算法</text><text x="410" y="345" text-anchor="middle" font-size="11">标记-清除/整理</text><text x="410" y="375" text-anchor="middle" font-size="13" font-weight="bold">停顿时间</text><text x="410" y="395" text-anchor="middle" font-size="11" fill="#d32f2f">长（数秒）</text><rect x="540" y="60" width="230" height="360" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/><text x="655" y="90" text-anchor="middle" font-size="16" font-weight="bold">Full GC</text><text x="655" y="115" text-anchor="middle" font-size="13" fill="#d32f2f">(最重量级)</text><rect x="560" y="130" width="190" height="270" fill="#ffcdd2" stroke="#c62828" stroke-width="1"/><text x="655" y="152" text-anchor="middle" font-size="13" font-weight="bold">发生区域</text><text x="655" y="169" text-anchor="middle" font-size="10">整个堆+元空间</text><text x="655" y="192" text-anchor="middle" font-size="13" font-weight="bold">触发条件</text><text x="655" y="209" text-anchor="middle" font-size="10">System.gc()</text><text x="655" y="224" text-anchor="middle" font-size="10">老年代空间不足</text><text x="655" y="239" text-anchor="middle" font-size="10">元空间不足</text><text x="655" y="262" text-anchor="middle" font-size="13" font-weight="bold">频率</text><text x="655" y="279" text-anchor="middle" font-size="11">很少</text><text x="655" y="302" text-anchor="middle" font-size="13" font-weight="bold">停顿时间</text><text x="655" y="319" text-anchor="middle" font-size="10" fill="#d32f2f">最长</text><text x="655" y="334" text-anchor="middle" font-size="9" fill="#d32f2f">(数秒到数十秒)</text><text x="655" y="355" text-anchor="middle" font-size="13" font-weight="bold">影响</text><text x="655" y="372" text-anchor="middle" font-size="10" fill="#d32f2f">Stop The World</text></svg>

**关键区别：**

| 类型 | 作用范围 | 速度 | 是否 STW | 触发频率 |
|------|---------|------|---------|---------|
| Minor GC | 新生代 | 快 | 是（短） | 非常高 |
| Major GC | 老年代 | 慢 | 是（长） | 较低 |
| Full GC | 整个堆+元空间 | 最慢 | 是（最长） | 很低 |

**注意事项：**
1. **Minor GC 不一定触发 Major GC**，但 Major GC 往往伴随至少一次 Minor GC
2. **Full GC = Minor GC + Major GC + 元空间 GC**
3. **CMS 收集器**中，Major GC 指单独收集老年代，与 Full GC 有区别
4. **G1 收集器**中，Mixed GC 同时回收新生代和部分老年代

**记忆技巧：小少中大全**
- **Minor**：小范围（新生代），少停顿
- **Major**：中范围（老年代），大停顿
- **Full**：全范围（整个堆），全停顿
