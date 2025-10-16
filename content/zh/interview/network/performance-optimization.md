## 性能优化
### 86. 如何优化网络性能？

**核心答案：**

网络性能优化是一个系统工程，主要从以下几个维度进行：**减少请求次数、减少传输数据量、提高传输效率、利用缓存机制、优化网络架构**。

**详细说明：**

**1. 减少请求次数**

- **资源合并**：将多个 CSS/JS 文件合并为一个文件
- **CSS Sprites**：将多个小图片合并为一张雪碧图
- **内联资源**：将小的 CSS/JS 直接内联到 HTML 中
- **懒加载**：延迟加载非关键资源
- **按需加载**：根据用户行为动态加载资源

**2. 减少传输数据量**

- **文件压缩**：使用 Gzip、Brotli 压缩文本资源
- **图片优化**：
  - 选择合适的图片格式（WebP、AVIF）
  - 压缩图片质量
  - 使用响应式图片
- **代码压缩**：压缩 HTML、CSS、JavaScript
- **Tree Shaking**：移除未使用的代码
- **精简 HTTP Headers**：减少不必要的请求头

**3. 提高传输效率**

- **使用 CDN**：将资源分发到离用户更近的节点
- **启用 HTTP/2**：支持多路复用、头部压缩
- **使用 HTTP/3 (QUIC)**：基于 UDP，减少延迟
- **域名预解析**：`<link rel="dns-prefetch">`
- **预连接**：`<link rel="preconnect">`
- **预加载**：`<link rel="preload">`
- **TCP 优化**：调整 TCP 窗口大小、启用 TCP Fast Open

**4. 利用缓存机制**

- **浏览器缓存**：合理设置 Cache-Control、ETag
- **Service Worker 缓存**：离线缓存策略
- **CDN 缓存**：边缘节点缓存
- **代理缓存**：反向代理缓存
- **应用缓存**：缓存数据库查询结果、API 响应

**5. 优化网络架构**

- **负载均衡**：分散请求到多个服务器
- **反向代理**：提供缓存和负载均衡
- **数据库优化**：索引优化、查询优化、读写分离
- **微服务架构**：服务拆分、独立部署
- **异步处理**：使用消息队列处理耗时操作

**网络性能优化层次图：**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00f2fe;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#43e97b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#38f9d7;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#fa709a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#fee140;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">网络性能优化体系</text>
  <rect x="50" y="60" width="700" height="80" rx="8" fill="url(#grad1)" opacity="0.8"/>
  <text x="400" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="white">1. 减少请求次数</text>
  <text x="400" y="115" text-anchor="middle" font-size="13" fill="white">资源合并 | CSS Sprites | 内联资源 | 懒加载 | 按需加载</text>
  <rect x="50" y="160" width="700" height="80" rx="8" fill="url(#grad2)" opacity="0.8"/>
  <text x="400" y="190" text-anchor="middle" font-size="16" font-weight="bold" fill="white">2. 减少传输数据量</text>
  <text x="400" y="215" text-anchor="middle" font-size="13" fill="white">文件压缩 | 图片优化 | 代码压缩 | Tree Shaking | 精简 Headers</text>
  <rect x="50" y="260" width="700" height="80" rx="8" fill="url(#grad3)" opacity="0.8"/>
  <text x="400" y="290" text-anchor="middle" font-size="16" font-weight="bold" fill="white">3. 提高传输效率</text>
  <text x="400" y="315" text-anchor="middle" font-size="13" fill="white">CDN | HTTP/2 | HTTP/3 | 预解析 | 预连接 | 预加载 | TCP 优化</text>
  <rect x="50" y="360" width="700" height="80" rx="8" fill="url(#grad4)" opacity="0.8"/>
  <text x="400" y="390" text-anchor="middle" font-size="16" font-weight="bold" fill="white">4. 利用缓存机制</text>
  <text x="400" y="415" text-anchor="middle" font-size="13" fill="white">浏览器缓存 | Service Worker | CDN 缓存 | 代理缓存 | 应用缓存</text>
  <rect x="50" y="460" width="700" height="80" rx="8" fill="url(#grad5)" opacity="0.8"/>
  <text x="400" y="490" text-anchor="middle" font-size="16" font-weight="bold" fill="white">5. 优化网络架构</text>
  <text x="400" y="515" text-anchor="middle" font-size="13" fill="white">负载均衡 | 反向代理 | 数据库优化 | 微服务 | 异步处理</text>
  <text x="400" y="570" text-anchor="middle" font-size="14" fill="#666" font-style="italic">从前端到后端的全方位优化</text>
</svg>

**关键性能指标：**

| 指标 | 说明 | 优化目标 |
|------|------|---------|
| **FCP** (First Contentful Paint) | 首次内容绘制时间 | < 1.8s |
| **LCP** (Largest Contentful Paint) | 最大内容绘制时间 | < 2.5s |
| **FID** (First Input Delay) | 首次输入延迟 | < 100ms |
| **CLS** (Cumulative Layout Shift) | 累积布局偏移 | < 0.1 |
| **TTFB** (Time to First Byte) | 首字节时间 | < 600ms |
| **TTI** (Time to Interactive) | 可交互时间 | < 3.8s |

**优化检查清单：**

**前端优化：**
1. 资源加载优化
   - ✓ 使用 CDN
   - ✓ 启用 Gzip/Brotli 压缩
   - ✓ 图片格式优化（WebP/AVIF）
   - ✓ 懒加载图片和视频
   - ✓ 代码分割和按需加载

2. 渲染优化
   - ✓ 关键 CSS 内联
   - ✓ 异步加载非关键 CSS/JS
   - ✓ 减少重排和重绘
   - ✓ 使用 Web Workers 处理复杂计算

3. 缓存策略
   - ✓ 设置合理的 Cache-Control
   - ✓ 使用 Service Worker
   - ✓ 应用程序级缓存（LocalStorage/IndexedDB）

**后端优化：**
1. 服务器配置
   - ✓ 启用 HTTP/2 或 HTTP/3
   - ✓ 配置负载均衡
   - ✓ 使用反向代理（Nginx）
   - ✓ 开启 Keep-Alive

2. 数据库优化
   - ✓ 索引优化
   - ✓ 查询优化
   - ✓ 连接池管理
   - ✓ 读写分离

3. 应用层优化
   - ✓ API 响应缓存
   - ✓ 数据库查询结果缓存
   - ✓ 异步任务处理
   - ✓ 限流和降级

**网络层优化：**
1. DNS 优化
   - ✓ DNS 预解析
   - ✓ 减少 DNS 查询次数
   - ✓ 使用可靠的 DNS 服务

2. TCP 优化
   - ✓ 调整 TCP 窗口大小
   - ✓ 启用 TCP Fast Open
   - ✓ 减少 TCP 握手时间

3. 协议优化
   - ✓ 升级到 HTTP/2
   - ✓ 考虑使用 HTTP/3（QUIC）
   - ✓ 启用 TLS 1.3

**关键要点：**

1. **网络性能优化是系统工程**，需要前端、后端、网络层协同优化
2. **优先优化关键路径**，先解决影响最大的性能瓶颈
3. **使用性能监控工具**，持续跟踪和优化性能指标
4. **权衡优化成本**，不是所有优化都值得实施
5. **遵循渐进增强原则**，确保基本功能在各种网络条件下可用

**记忆口诀：**

```
网络优化五大法，
减请求，少数据传，
提效率，用缓存，
架构优化不能忘。
前后端配合紧密，
监控指标常关注，
性能优化无止境，
用户体验是王道。
```

### 87. 什么是 CDN？CDN 的工作原理是什么？

**核心答案：**

**CDN (Content Delivery Network，内容分发网络)** 是一种分布式服务器系统，通过在全球各地部署边缘节点服务器，将内容缓存到离用户最近的节点，从而加速内容分发，提高用户访问速度，降低源站压力。

**详细说明：**

**1. CDN 的核心组件**

- **源站 (Origin Server)**：存储原始内容的服务器
- **边缘节点 (Edge Node)**：分布在各地的缓存服务器
- **DNS 服务器**：负责智能解析，将用户请求导向最近的边缘节点
- **负载均衡器**：在多个节点之间分配请求
- **缓存系统**：存储和管理缓存内容

**2. CDN 工作流程**

**传统访问（无 CDN）：**

```
用户 → DNS 解析 → 源站服务器 → 返回内容
问题：距离远、延迟高、源站压力大
```

**CDN 加速访问：**

```
用户 → DNS 解析 → CNAME → CDN DNS → 最近的边缘节点 → 返回内容
优势：距离近、延迟低、源站压力小
```

**CDN 工作原理图：**

<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#333" />
    </marker>
    <marker id="arrowhead-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
    </marker>
    <marker id="arrowhead-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
    </marker>
  </defs>
  <text x="450" y="30" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">CDN 工作原理</text>
  <circle cx="450" cy="350" r="60" fill="#ef4444" stroke="#dc2626" stroke-width="3"/>
  <text x="450" y="345" text-anchor="middle" font-size="14" font-weight="bold" fill="white">源站服务器</text>
  <text x="450" y="365" text-anchor="middle" font-size="11" fill="white">Origin Server</text>
  <circle cx="150" cy="150" r="45" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
  <text x="150" y="145" text-anchor="middle" font-size="12" font-weight="bold" fill="white">边缘节点</text>
  <text x="150" y="160" text-anchor="middle" font-size="10" fill="white">北京</text>
  <circle cx="750" cy="150" r="45" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
  <text x="750" y="145" text-anchor="middle" font-size="12" font-weight="bold" fill="white">边缘节点</text>
  <text x="750" y="160" text-anchor="middle" font-size="10" fill="white">上海</text>
  <circle cx="150" cy="550" r="45" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
  <text x="150" y="545" text-anchor="middle" font-size="12" font-weight="bold" fill="white">边缘节点</text>
  <text x="150" y="560" text-anchor="middle" font-size="10" fill="white">深圳</text>
  <circle cx="750" cy="550" r="45" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
  <text x="750" y="545" text-anchor="middle" font-size="12" font-weight="bold" fill="white">边缘节点</text>
  <text x="750" y="560" text-anchor="middle" font-size="10" fill="white">成都</text>
  <line x1="195" y1="150" x2="390" y2="310" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
  <text x="250" y="200" font-size="11" fill="#666">回源</text>
  <line x1="705" y1="150" x2="510" y2="310" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
  <text x="630" y="200" font-size="11" fill="#666">回源</text>
  <line x1="195" y1="550" x2="390" y2="390" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
  <text x="250" y="500" font-size="11" fill="#666">回源</text>
  <line x1="705" y1="550" x2="510" y2="390" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
  <text x="630" y="500" font-size="11" fill="#666">回源</text>
  <circle cx="60" cy="150" r="25" fill="#10b981" stroke="#059669" stroke-width="2"/>
  <text x="60" y="155" text-anchor="middle" font-size="11" fill="white">用户A</text>
  <circle cx="860" cy="150" r="25" fill="#10b981" stroke="#059669" stroke-width="2"/>
  <text x="860" y="155" text-anchor="middle" font-size="11" fill="white">用户B</text>
  <circle cx="60" cy="550" r="25" fill="#10b981" stroke="#059669" stroke-width="2"/>
  <text x="60" y="555" text-anchor="middle" font-size="11" fill="white">用户C</text>
  <circle cx="860" cy="550" r="25" fill="#10b981" stroke="#059669" stroke-width="2"/>
  <text x="860" y="555" text-anchor="middle" font-size="11" fill="white">用户D</text>
  <line x1="85" y1="150" x2="105" y2="150" stroke="#10b981" stroke-width="3" marker-end="url(#arrowhead-green)"/>
  <text x="90" y="140" font-size="10" fill="#10b981">请求</text>
  <line x1="815" y1="150" x2="795" y2="150" stroke="#10b981" stroke-width="3" marker-end="url(#arrowhead-green)"/>
  <text x="800" y="140" font-size="10" fill="#10b981">请求</text>
  <line x1="85" y1="550" x2="105" y2="550" stroke="#10b981" stroke-width="3" marker-end="url(#arrowhead-green)"/>
  <text x="90" y="540" font-size="10" fill="#10b981">请求</text>
  <line x1="815" y1="550" x2="795" y2="550" stroke="#10b981" stroke-width="3" marker-end="url(#arrowhead-green)"/>
  <text x="800" y="540" font-size="10" fill="#10b981">请求</text>
  <rect x="330" y="60" width="240" height="50" rx="8" fill="#f59e0b" opacity="0.9"/>
  <text x="450" y="85" text-anchor="middle" font-size="14" font-weight="bold" fill="white">CDN DNS 调度系统</text>
  <text x="450" y="100" text-anchor="middle" font-size="11" fill="white">智能解析最近节点</text>
  <line x1="450" y1="110" x2="180" y2="130" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead-blue)"/>
  <line x1="450" y1="110" x2="720" y2="130" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead-blue)"/>
  <line x1="450" y1="110" x2="180" y2="530" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead-blue)"/>
  <line x1="450" y1="110" x2="720" y2="530" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrowhead-blue)"/>
  <rect x="320" y="630" width="260" height="50" rx="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
  <text x="450" y="650" text-anchor="middle" font-size="12" fill="#333">优势：就近访问、降低延迟</text>
  <text x="450" y="665" text-anchor="middle" font-size="12" fill="#333">减少源站压力、提高可用性</text>
</svg>

**3. CDN 详细工作流程**

**步骤 1：用户发起请求**
```
用户在浏览器输入 https://example.com/image.jpg
```

**步骤 2：DNS 解析**
```
1. 浏览器查询本地 DNS 服务器
2. 本地 DNS 返回 CNAME 记录（指向 CDN 域名）
3. 查询 CDN 的权威 DNS 服务器
```

**步骤 3：CDN DNS 智能调度**
```
CDN DNS 根据以下因素选择最优节点：
- 用户 IP 地理位置
- 节点健康状态
- 节点负载情况
- 网络延迟
- 缓存命中率
```

**步骤 4：访问边缘节点**
```
- 如果缓存命中：直接返回内容（Cache Hit）
- 如果缓存未命中：回源获取内容（Cache Miss）
```

**步骤 5：回源（如需要）**
```
1. 边缘节点向源站请求内容
2. 源站返回内容
3. 边缘节点缓存内容
4. 返回给用户
```

**CDN 缓存策略示意图：**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#666" />
    </marker>
  </defs>
  <text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">CDN 缓存策略</text>
  <rect x="50" y="60" width="200" height="80" rx="8" fill="#10b981" opacity="0.9"/>
  <text x="150" y="90" text-anchor="middle" font-size="14" font-weight="bold" fill="white">1. 用户请求</text>
  <text x="150" y="110" text-anchor="middle" font-size="12" fill="white">发起 HTTP 请求</text>
  <text x="150" y="125" text-anchor="middle" font-size="11" fill="white">携带 URL 和 Headers</text>
  <line x1="250" y1="100" x2="300" y2="100" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
  <rect x="300" y="60" width="200" height="150" rx="8" fill="#3b82f6" opacity="0.9"/>
  <text x="400" y="85" text-anchor="middle" font-size="14" font-weight="bold" fill="white">2. 检查缓存</text>
  <path d="M 320 100 L 480 100 L 480 130 L 400 130 L 390 140 L 400 150 L 480 150 L 480 190 L 320 190 Z" fill="#2563eb"/>
  <text x="400" y="118" text-anchor="middle" font-size="12" fill="white">命中缓存？</text>
  <text x="400" y="168" text-anchor="middle" font-size="11" fill="white">检查缓存键</text>
  <text x="400" y="183" text-anchor="middle" font-size="11" fill="white">验证新鲜度</text>
  <line x1="400" y1="210" x2="400" y2="240" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="420" y="230" font-size="11" fill="#10b981" font-weight="bold">命中</text>
  <line x1="500" y1="135" x2="570" y2="135" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="535" y="130" font-size="11" fill="#ef4444" font-weight="bold">未命中</text>
  <rect x="570" y="100" width="180" height="80" rx="8" fill="#ef4444" opacity="0.9"/>
  <text x="660" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="white">3. 回源请求</text>
  <text x="660" y="145" text-anchor="middle" font-size="11" fill="white">向源站请求</text>
  <text x="660" y="160" text-anchor="middle" font-size="11" fill="white">缓存响应</text>
  <text x="660" y="175" text-anchor="middle" font-size="11" fill="white">返回给用户</text>
  <line x1="660" y1="180" x2="660" y2="280" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
  <line x1="660" y1="280" x2="400" y2="280" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow)"/>
  <rect x="250" y="240" width="300" height="80" rx="8" fill="#8b5cf6" opacity="0.9"/>
  <text x="400" y="265" text-anchor="middle" font-size="14" font-weight="bold" fill="white">4. 返回响应</text>
  <text x="400" y="285" text-anchor="middle" font-size="12" fill="white">设置缓存头</text>
  <text x="400" y="300" text-anchor="middle" font-size="11" fill="white">Cache-Control, ETag, Expires</text>
  <text x="400" y="315" text-anchor="middle" font-size="11" fill="white">返回给用户</text>
  <line x1="250" y1="280" x2="200" y2="280" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
  <rect x="50" y="240" width="150" height="80" rx="8" fill="#10b981" opacity="0.9"/>
  <text x="125" y="265" text-anchor="middle" font-size="14" font-weight="bold" fill="white">5. 用户接收</text>
  <text x="125" y="285" text-anchor="middle" font-size="12" fill="white">渲染内容</text>
  <text x="125" y="300" text-anchor="middle" font-size="11" fill="white">缓存到本地</text>
  <rect x="50" y="350" width="700" height="80" rx="5" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1"/>
  <text x="400" y="375" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">缓存键（Cache Key）组成</text>
  <text x="400" y="395" text-anchor="middle" font-size="12" fill="#555">URL + Query String + Vary Headers (Accept-Encoding, User-Agent, etc.)</text>
  <text x="400" y="415" text-anchor="middle" font-size="11" fill="#666">示例: GET /image.jpg?v=1.0 + Accept-Encoding: gzip + Vary: Accept-Encoding</text>
</svg>

**4. CDN 的优势**

**性能优势：**
1. **降低延迟**：用户访问就近节点，减少网络传输距离
2. **提高带宽**：多节点并发传输，突破单点带宽限制
3. **加快加载速度**：静态资源缓存，快速响应

**可靠性优势：**
1. **高可用性**：多节点冗余，单点故障不影响服务
2. **负载均衡**：分散请求到多个节点，避免源站过载
3. **容灾能力**：节点故障自动切换

**安全性优势：**
1. **DDoS 防护**：分散攻击流量到多个节点
2. **WAF 防护**：过滤恶意请求
3. **HTTPS 加速**：边缘节点处理 SSL/TLS

**成本优势：**
1. **减少带宽成本**：降低源站带宽消耗
2. **减少服务器成本**：降低源站服务器数量
3. **降低运维成本**：CDN 提供商负责节点维护

**5. CDN 适用场景**

| 场景 | 说明 | 适用内容 |
|------|------|---------|
| **静态资源加速** | 加速图片、CSS、JS、字体等 | 网站、移动应用 |
| **视频点播** | 加速视频流媒体分发 | 视频网站、在线教育 |
| **直播加速** | 低延迟直播推流和播放 | 直播平台、游戏直播 |
| **下载加速** | 大文件、软件包分发 | 软件下载、游戏更新 |
| **动态加速** | 智能路由、协议优化 | API 接口、动态网站 |
| **全站加速** | 静态+动态混合加速 | 电商网站、企业门户 |

**6. CDN 缓存策略**

**按内容类型：**
```
- 静态资源（图片、CSS、JS）：长时间缓存（1天-1年）
- 动态内容（API、用户数据）：不缓存或短时间缓存
- 半动态内容（新闻、商品详情）：中等时间缓存（5分钟-1小时）
```

**缓存控制：**
```
Cache-Control: max-age=86400        # 缓存 1 天
Cache-Control: no-cache              # 每次验证
Cache-Control: no-store              # 不缓存
Cache-Control: public, max-age=31536000  # 公共缓存 1 年
```

**缓存更新策略：**
1. **基于时间**：设置 TTL (Time To Live)
2. **版本号**：URL 添加版本号 `/image.jpg?v=1.0`
3. **文件哈希**：URL 添加文件哈希 `/image.abc123.jpg`
4. **手动刷新**：通过 CDN 控制台刷新缓存
5. **预加载**：预先将内容推送到边缘节点

**关键要点：**

1. **CDN 是内容分发网络**，通过边缘节点缓存加速内容分发
2. **核心原理是就近访问**，减少网络延迟，提高访问速度
3. **智能 DNS 调度**是 CDN 的关键，根据多种因素选择最优节点
4. **缓存策略很重要**，合理设置缓存时间和更新机制
5. **不仅加速静态资源**，还可加速动态内容和 API 接口

**记忆口诀：**

```
CDN 分发在边缘，
内容缓存离你近，
DNS 调度很智能，
就近访问速度快。
缓存命中直接返，
未命中回源取，
降低延迟减压力，
用户体验大提升。
```
### 88. 什么是负载均衡?常见的负载均衡算法有哪些？

**核心答案：**

**负载均衡 (Load Balancing)** 是一种将网络流量或计算任务分配到多个服务器的技术，目的是优化资源使用、最大化吞吐量、最小化响应时间，避免单点过载，提高系统的可用性和可靠性。

**详细说明：**

**1. 负载均衡的作用**

- **提高性能**:将请求分散到多台服务器,提高并发处理能力
- **提高可用性**:单台服务器故障不影响整体服务
- **可扩展性**:方便水平扩展,增加服务器节点
- **灵活维护**:可以下线部分服务器进行维护
- **流量管理**:控制流量分配,实现灰度发布

**2. 负载均衡分类**

**按层次分类：**

- **DNS 负载均衡** (应用层): 通过 DNS 解析返回不同 IP
- **HTTP 负载均衡** (应用层): 反向代理,如 Nginx、HAProxy
- **TCP/UDP 负载均衡** (传输层): LVS、F5
- **链路层负载均衡**: 根据 MAC 地址分发

**按实现方式分类：**

- **硬件负载均衡**: F5、A10 等专用设备,性能高但成本高
- **软件负载均衡**: Nginx、HAProxy、LVS 等,灵活但性能相对低

**负载均衡架构图：**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#333" />
    </marker>
    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="400" y="30" text-anchor="middle" font-size="22" font-weight="bold" fill="#333">负载均衡架构</text>
  <circle cx="400" cy="100" r="35" fill="#10b981" stroke="#059669" stroke-width="2"/>
  <text x="400" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="white">客户端</text>
  <text x="400" y="110" text-anchor="middle" font-size="11" fill="white">Users</text>
  <line x1="400" y1="135" x2="400" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="420" y="160" font-size="12" fill="#666">请求</text>
  <rect x="280" y="180" width="240" height="80" rx="10" fill="url(#gradient1)" stroke="#5a67d8" stroke-width="3"/>
  <text x="400" y="210" text-anchor="middle" font-size="16" font-weight="bold" fill="white">负载均衡器</text>
  <text x="400" y="230" text-anchor="middle" font-size="13" fill="white">Load Balancer</text>
  <text x="400" y="248" text-anchor="middle" font-size="11" fill="white">分发请求到后端服务器</text>
  <line x1="350" y1="260" x2="150" y2="330" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="400" y1="260" x2="400" y2="330" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="450" y1="260" x2="650" y2="330" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowhead)"/>
  <rect x="50" y="330" width="200" height="100" rx="8" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
  <text x="150" y="360" text-anchor="middle" font-size="14" font-weight="bold" fill="white">服务器 1</text>
  <text x="150" y="380" text-anchor="middle" font-size="12" fill="white">192.168.1.10</text>
  <text x="150" y="400" text-anchor="middle" font-size="11" fill="white">CPU: 30%</text>
  <text x="150" y="415" text-anchor="middle" font-size="11" fill="white">连接数: 150</text>
  <rect x="300" y="330" width="200" height="100" rx="8" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
  <text x="400" y="360" text-anchor="middle" font-size="14" font-weight="bold" fill="white">服务器 2</text>
  <text x="400" y="380" text-anchor="middle" font-size="12" fill="white">192.168.1.11</text>
  <text x="400" y="400" text-anchor="middle" font-size="11" fill="white">CPU: 50%</text>
  <text x="400" y="415" text-anchor="middle" font-size="11" fill="white">连接数: 200</text>
  <rect x="550" y="330" width="200" height="100" rx="8" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
  <text x="650" y="360" text-anchor="middle" font-size="14" font-weight="bold" fill="white">服务器 3</text>
  <text x="650" y="380" text-anchor="middle" font-size="12" fill="white">192.168.1.12</text>
  <text x="650" y="400" text-anchor="middle" font-size="11" fill="white">CPU: 20%</text>
  <text x="650" y="415" text-anchor="middle" font-size="11" fill="white">连接数: 100</text>
  <line x1="150" y1="430" x2="150" y2="480" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
  <line x1="400" y1="430" x2="400" y2="480" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
  <line x1="650" y1="430" x2="650" y2="480" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)"/>
  <rect x="200" y="480" width="400" height="60" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
  <text x="400" y="505" text-anchor="middle" font-size="14" font-weight="bold" fill="white">后端服务集群</text>
  <text x="400" y="525" text-anchor="middle" font-size="12" fill="white">数据库 | 缓存 | 存储 | 微服务</text>
  <rect x="50" y="560" width="700" height="30" rx="5" fill="#e5e7eb"/>
  <text x="400" y="580" text-anchor="middle" font-size="11" fill="#374151">健康检查 | 会话保持 | 故障转移 | 动态扩缩容</text>
</svg>

**3. 常见负载均衡算法**

**静态算法（不考虑服务器状态）：**

**1. 轮询 (Round Robin)**

```
原理：按顺序依次分配请求到每台服务器
优点：简单、公平
缺点：不考虑服务器性能差异

示例：
请求1 → 服务器A
请求2 → 服务器B
请求3 → 服务器C
请求4 → 服务器A (循环)
```

**2. 加权轮询 (Weighted Round Robin)**

```
原理：根据服务器权重分配请求，性能好的服务器权重高
优点：考虑服务器性能差异
缺点：权重需要手动配置

示例（权重 A:3, B:2, C:1）：
A → A → A → B → B → C (循环)
```

**3. IP 哈希 (IP Hash)**

```
原理：根据客户端 IP 计算哈希值，分配到固定服务器
优点：同一 IP 固定到同一服务器，天然会话保持
缺点：服务器增减会导致哈希重新分布

示例：
hash(192.168.1.100) % 3 = 1 → 服务器B
hash(192.168.1.101) % 3 = 0 → 服务器A
```

**4. URL 哈希 (URL Hash)**

```
原理：根据请求 URL 计算哈希值
优点：同一资源固定到同一服务器，提高缓存命中率
缺点：URL 分布不均可能导致负载不均

示例：
hash("/api/user") % 3 = 2 → 服务器C
hash("/api/order") % 3 = 1 → 服务器B
```

**动态算法（考虑服务器实时状态）：**

**5. 最少连接 (Least Connections)**

```
原理：将请求分配给当前连接数最少的服务器
优点：适合长连接场景
缺点：需要维护连接数统计

示例（当前连接数）：
服务器A: 100 连接
服务器B: 150 连接
服务器C: 80 连接 ← 选择此服务器
```

**6. 加权最少连接 (Weighted Least Connections)**

```
原理：结合权重和连接数，计算 连接数/权重 的比值
优点：兼顾性能和负载
缺点：计算复杂度较高

示例：
服务器A: 连接100, 权重3 → 比值 33.3
服务器B: 连接150, 权重2 → 比值 75
服务器C: 连接80, 权重1 → 比值 80
选择比值最小的服务器A
```

**7. 最快响应 (Fastest Response)**

```
原理：选择响应时间最短的服务器
优点：用户体验好
缺点：需要实时监控响应时间

示例（平均响应时间）：
服务器A: 50ms
服务器B: 80ms
服务器C: 30ms ← 选择此服务器
```

**8. 最少负载 (Least Load)**

```
原理：综合考虑 CPU、内存、带宽等指标
优点：最全面的负载评估
缺点：实现复杂，开销大

示例（综合负载）：
服务器A: CPU 80%, 内存 60% → 负载 70%
服务器B: CPU 50%, 内存 70% → 负载 60%
服务器C: CPU 30%, 内存 40% → 负载 35% ← 选择
```

**负载均衡算法对比图：**

<svg viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
  <text x="450" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">负载均衡算法对比</text>
  <rect x="50" y="60" width="250" height="280" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2"/>
  <text x="175" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="#0369a1">静态算法</text>
  <text x="175" y="110" text-anchor="middle" font-size="12" fill="#075985">不考虑服务器状态</text>
  <rect x="70" y="130" width="210" height="45" rx="5" fill="#0ea5e9" opacity="0.8"/>
  <text x="175" y="148" text-anchor="middle" font-size="13" font-weight="bold" fill="white">1. 轮询 (RR)</text>
  <text x="175" y="165" text-anchor="middle" font-size="11" fill="white">简单均匀分配</text>
  <rect x="70" y="185" width="210" height="45" rx="5" fill="#0ea5e9" opacity="0.8"/>
  <text x="175" y="203" text-anchor="middle" font-size="13" font-weight="bold" fill="white">2. 加权轮询 (WRR)</text>
  <text x="175" y="220" text-anchor="middle" font-size="11" fill="white">按权重分配</text>
  <rect x="70" y="240" width="210" height="45" rx="5" fill="#0ea5e9" opacity="0.8"/>
  <text x="175" y="258" text-anchor="middle" font-size="13" font-weight="bold" fill="white">3. IP 哈希</text>
  <text x="175" y="275" text-anchor="middle" font-size="11" fill="white">会话保持</text>
  <rect x="70" y="295" width="210" height="35" rx="5" fill="#0ea5e9" opacity="0.8"/>
  <text x="175" y="318" text-anchor="middle" font-size="13" font-weight="bold" fill="white">4. URL 哈希</text>
  <rect x="330" y="60" width="250" height="280" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="455" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="#92400e">动态算法</text>
  <text x="455" y="110" text-anchor="middle" font-size="12" fill="#78350f">考虑服务器实时状态</text>
  <rect x="350" y="130" width="210" height="45" rx="5" fill="#f59e0b" opacity="0.8"/>
  <text x="455" y="148" text-anchor="middle" font-size="13" font-weight="bold" fill="white">5. 最少连接 (LC)</text>
  <text x="455" y="165" text-anchor="middle" font-size="11" fill="white">连接数最少</text>
  <rect x="350" y="185" width="210" height="45" rx="5" fill="#f59e0b" opacity="0.8"/>
  <text x="455" y="203" text-anchor="middle" font-size="13" font-weight="bold" fill="white">6. 加权最少连接</text>
  <text x="455" y="220" text-anchor="middle" font-size="11" fill="white">权重+连接数</text>
  <rect x="350" y="240" width="210" height="45" rx="5" fill="#f59e0b" opacity="0.8"/>
  <text x="455" y="258" text-anchor="middle" font-size="13" font-weight="bold" fill="white">7. 最快响应</text>
  <text x="455" y="275" text-anchor="middle" font-size="11" fill="white">响应时间最短</text>
  <rect x="350" y="295" width="210" height="35" rx="5" fill="#f59e0b" opacity="0.8"/>
  <text x="455" y="318" text-anchor="middle" font-size="13" font-weight="bold" fill="white">8. 最少负载</text>
  <rect x="610" y="60" width="250" height="280" rx="8" fill="#e9d5ff" stroke="#a855f7" stroke-width="2"/>
  <text x="735" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="#6b21a8">其他算法</text>
  <text x="735" y="110" text-anchor="middle" font-size="12" fill="#581c87">特殊场景</text>
  <rect x="630" y="130" width="210" height="45" rx="5" fill="#a855f7" opacity="0.8"/>
  <text x="735" y="148" text-anchor="middle" font-size="13" font-weight="bold" fill="white">随机 (Random)</text>
  <text x="735" y="165" text-anchor="middle" font-size="11" fill="white">随机选择服务器</text>
  <rect x="630" y="185" width="210" height="45" rx="5" fill="#a855f7" opacity="0.8"/>
  <text x="735" y="203" text-anchor="middle" font-size="13" font-weight="bold" fill="white">一致性哈希</text>
  <text x="735" y="220" text-anchor="middle" font-size="11" fill="white">分布式缓存</text>
  <rect x="630" y="240" width="210" height="45" rx="5" fill="#a855f7" opacity="0.8"/>
  <text x="735" y="258" text-anchor="middle" font-size="13" font-weight="bold" fill="white">地理位置</text>
  <text x="735" y="275" text-anchor="middle" font-size="11" fill="white">就近访问</text>
  <rect x="630" y="295" width="210" height="35" rx="5" fill="#a855f7" opacity="0.8"/>
  <text x="735" y="318" text-anchor="middle" font-size="13" font-weight="bold" fill="white">自适应</text>
  <rect x="50" y="370" width="800" height="300" rx="8" fill="#f3f4f6" stroke="#9ca3af" stroke-width="2"/>
  <text x="450" y="400" text-anchor="middle" font-size="16" font-weight="bold" fill="#374151">算法选择建议</text>
  <text x="80" y="430" font-size="13" font-weight="bold" fill="#1f2937">短连接、无状态服务：</text>
  <text x="280" y="430" font-size="12" fill="#4b5563">轮询、加权轮询</text>
  <text x="80" y="460" font-size="13" font-weight="bold" fill="#1f2937">长连接场景：</text>
  <text x="280" y="460" font-size="12" fill="#4b5563">最少连接、加权最少连接</text>
  <text x="80" y="490" font-size="13" font-weight="bold" fill="#1f2937">需要会话保持：</text>
  <text x="280" y="490" font-size="12" fill="#4b5563">IP 哈希、一致性哈希</text>
  <text x="80" y="520" font-size="13" font-weight="bold" fill="#1f2937">缓存友好：</text>
  <text x="280" y="520" font-size="12" fill="#4b5563">URL 哈希、一致性哈希</text>
  <text x="80" y="550" font-size="13" font-weight="bold" fill="#1f2937">性能差异大：</text>
  <text x="280" y="550" font-size="12" fill="#4b5563">加权轮询、加权最少连接、最少负载</text>
  <text x="80" y="580" font-size="13" font-weight="bold" fill="#1f2937">全球分布：</text>
  <text x="280" y="580" font-size="12" fill="#4b5563">地理位置、DNS 负载均衡</text>
  <text x="80" y="610" font-size="13" font-weight="bold" fill="#1f2937">分布式缓存：</text>
  <text x="280" y="610" font-size="12" fill="#4b5563">一致性哈希</text>
  <text x="80" y="640" font-size="13" font-weight="bold" fill="#1f2937">高可用要求：</text>
  <text x="280" y="640" font-size="12" fill="#4b5563">最快响应、最少负载</text>
</svg>

**4. 负载均衡的关键技术**

**健康检查 (Health Check)：**

```
- 主动检查：定期发送探测请求（TCP、HTTP、HTTPS）
- 被动检查：根据实际请求的成功/失败判断
- 检查间隔：通常 2-5 秒
- 失败阈值：连续失败 N 次标记为不可用
- 恢复阈值：连续成功 M 次恢复可用状态
```

**会话保持 (Session Persistence)：**

```
1. 基于 Cookie：在 Cookie 中存储服务器标识
2. 基于 IP：使用 IP 哈希保证同 IP 到同服务器
3. 基于 Session ID：根据 Session ID 路由
4. 应用层会话共享：Redis、Memcached 等
```

**故障转移 (Failover)：**

```
- 服务器故障自动剔除
- 请求自动转发到健康服务器
- 故障恢复后自动加入
- 避免雪崩效应
```

**流量控制：**

```
- 限流：防止过载
- 熔断：快速失败
- 降级：保证核心功能
- 灰度发布：逐步切换流量
```

**5. 负载均衡器对比**

| 负载均衡器 | 类型 | 层次 | 性能 | 功能 | 适用场景 |
|----------|------|------|------|------|---------|
| **Nginx** | 软件 | L7 | 高 | HTTP/HTTPS、反向代理 | Web 应用 |
| **HAProxy** | 软件 | L4/L7 | 很高 | TCP/HTTP、高级路由 | 高并发场景 |
| **LVS** | 软件 | L4 | 极高 | TCP/UDP、内核级 | 大规模集群 |
| **F5** | 硬件 | L4-L7 | 极高 | 全功能、企业级 | 大型企业 |
| **云负载均衡** | 云服务 | L4/L7 | 弹性 | 托管服务、自动扩展 | 云原生应用 |

**关键要点：**

1. **负载均衡是分布式系统的核心组件**，提高性能、可用性、可扩展性
2. **算法选择要根据场景**，没有万能算法，要权衡各种因素
3. **健康检查必不可少**，及时发现和隔离故障节点
4. **会话保持很重要**，特别是有状态应用
5. **监控和日志**，持续优化负载均衡策略

**记忆口诀：**

```
负载均衡流量分，
多台服务器来承担。
算法选择看场景，
轮询哈希最常见。
动态算法更智能，
连接响应实时算。
健康检查不能少，
故障转移保可用。
```

### 89. 什么是反向代理和正向代理?

**核心答案**

代理服务器是位于客户端和服务器之间的中间服务器。**正向代理**代表客户端向服务器发送请求,服务器不知道真实客户端是谁;**反向代理**代表服务器接收客户端请求,客户端不知道真实服务器是谁。两者的核心区别在于代理的对象不同:正向代理代理客户端,反向代理代理服务器。

**详细说明**

1. **正向代理 (Forward Proxy)**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-forward" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#2196F3"/></marker></defs>
<rect x="20" y="20" width="760" height="360" rx="8" fill="#E3F2FD" stroke="#2196F3" stroke-width="3"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1565C0">正向代理 (Forward Proxy)</text>
<circle cx="120" cy="180" r="50" fill="#BBDEFB" stroke="#1976D2" stroke-width="2"/>
<text x="120" y="175" text-anchor="middle" font-size="14" font-weight="bold" fill="#0D47A1">客户端 A</text>
<text x="120" y="195" text-anchor="middle" font-size="11" fill="#1565C0">192.168.1.10</text>
<circle cx="120" cy="280" r="50" fill="#BBDEFB" stroke="#1976D2" stroke-width="2"/>
<text x="120" y="275" text-anchor="middle" font-size="14" font-weight="bold" fill="#0D47A1">客户端 B</text>
<text x="120" y="295" text-anchor="middle" font-size="11" fill="#1565C0">192.168.1.11</text>
<rect x="320" y="150" width="160" height="120" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="3"/>
<text x="400" y="190" text-anchor="middle" font-size="16" font-weight="bold" fill="#E65100">正向代理</text>
<text x="400" y="210" text-anchor="middle" font-size="12" fill="#F57C00">Proxy Server</text>
<text x="400" y="230" text-anchor="middle" font-size="11" fill="#FF6F00">代理客户端</text>
<text x="400" y="250" text-anchor="middle" font-size="10" fill="#999">203.0.113.50</text>
<rect x="600" y="120" width="140" height="80" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="670" y="155" text-anchor="middle" font-size="14" font-weight="bold" fill="#2E7D32">Google</text>
<text x="670" y="175" text-anchor="middle" font-size="10" fill="#66BB6A">8.8.8.8</text>
<rect x="600" y="220" width="140" height="80" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="670" y="255" text-anchor="middle" font-size="14" font-weight="bold" fill="#2E7D32">Facebook</text>
<text x="670" y="275" text-anchor="middle" font-size="10" fill="#66BB6A">157.240.1.1</text>
<line x1="170" y1="180" x2="315" y2="180" stroke="#2196F3" stroke-width="3" marker-end="url(#arrow-forward)"/>
<text x="240" y="170" text-anchor="middle" font-size="11" fill="#1565C0" font-weight="bold">① 请求</text>
<line x1="170" y1="280" x2="315" y2="240" stroke="#2196F3" stroke-width="3" marker-end="url(#arrow-forward)"/>
<text x="240" y="270" text-anchor="middle" font-size="11" fill="#1565C0" font-weight="bold">① 请求</text>
<line x1="485" y1="180" x2="595" y2="160" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-forward)"/>
<text x="540" y="160" text-anchor="middle" font-size="11" fill="#2E7D32" font-weight="bold">② 转发</text>
<text x="540" y="175" text-anchor="middle" font-size="9" fill="#66BB6A">IP: 203.0.113.50</text>
<line x1="485" y1="240" x2="595" y2="260" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-forward)"/>
<text x="540" y="250" text-anchor="middle" font-size="11" fill="#2E7D32" font-weight="bold">② 转发</text>
<text x="540" y="265" text-anchor="middle" font-size="9" fill="#66BB6A">IP: 203.0.113.50</text>
<rect x="40" y="80" width="220" height="60" rx="5" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/>
<text x="150" y="105" text-anchor="middle" font-size="12" fill="#F57F17" font-weight="bold">客户端感知:</text>
<text x="150" y="125" text-anchor="middle" font-size="10" fill="#666">✓ 知道代理存在</text>
<rect x="540" y="80" width="220" height="60" rx="5" fill="#FFCCBC" stroke="#FF5722" stroke-width="2"/>
<text x="650" y="105" text-anchor="middle" font-size="12" fill="#BF360C" font-weight="bold">服务器感知:</text>
<text x="650" y="125" text-anchor="middle" font-size="10" fill="#666">✗ 不知道真实客户端</text>
<rect x="260" y="330" width="280" height="40" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1"/>
<text x="400" y="355" text-anchor="middle" font-size="11" fill="#2E7D32" font-weight="bold">作用: 突破访问限制、隐藏客户端身份、缓存加速</text>
</svg>

**正向代理特点:**
- **客户端配置**: 客户端需要主动配置代理服务器
- **隐藏客户端**: 服务器看到的是代理服务器的 IP
- **访问控制**: 可以控制客户端访问哪些网站
- **典型应用**: VPN、翻墙工具、企业内网访问控制

**正向代理使用场景:**
1. **突破访问限制**: 访问被屏蔽的网站
2. **隐藏真实 IP**: 保护客户端隐私
3. **访问内网资源**: 通过代理访问内网服务器
4. **提高访问速度**: 代理服务器缓存常用资源
5. **企业上网管理**: 限制员工访问特定网站

2. **反向代理 (Reverse Proxy)**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-reverse" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#FF5722"/></marker></defs>
<rect x="20" y="20" width="760" height="360" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="3"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#E65100">反向代理 (Reverse Proxy)</text>
<circle cx="120" cy="180" r="50" fill="#FFCCBC" stroke="#FF5722" stroke-width="2"/>
<text x="120" y="175" text-anchor="middle" font-size="14" font-weight="bold" fill="#BF360C">用户 A</text>
<text x="120" y="195" text-anchor="middle" font-size="11" fill="#FF5722">客户端</text>
<circle cx="120" cy="280" r="50" fill="#FFCCBC" stroke="#FF5722" stroke-width="2"/>
<text x="120" y="275" text-anchor="middle" font-size="14" font-weight="bold" fill="#BF360C">用户 B</text>
<text x="120" y="295" text-anchor="middle" font-size="11" fill="#FF5722">客户端</text>
<rect x="320" y="150" width="160" height="120" rx="8" fill="#E3F2FD" stroke="#2196F3" stroke-width="3"/>
<text x="400" y="190" text-anchor="middle" font-size="16" font-weight="bold" fill="#1565C0">反向代理</text>
<text x="400" y="210" text-anchor="middle" font-size="12" fill="#1976D2">Nginx / HAProxy</text>
<text x="400" y="230" text-anchor="middle" font-size="11" fill="#1E88E5">代理服务器</text>
<text x="400" y="250" text-anchor="middle" font-size="10" fill="#999">www.example.com</text>
<rect x="600" y="100" width="140" height="70" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="670" y="130" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">Web 服务器 1</text>
<text x="670" y="150" text-anchor="middle" font-size="10" fill="#66BB6A">10.0.1.10</text>
<rect x="600" y="190" width="140" height="70" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="670" y="220" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">Web 服务器 2</text>
<text x="670" y="240" text-anchor="middle" font-size="10" fill="#66BB6A">10.0.1.11</text>
<rect x="600" y="280" width="140" height="70" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="670" y="310" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">Web 服务器 3</text>
<text x="670" y="330" text-anchor="middle" font-size="10" fill="#66BB6A">10.0.1.12</text>
<line x1="170" y1="180" x2="315" y2="200" stroke="#FF5722" stroke-width="3" marker-end="url(#arrow-reverse)"/>
<text x="240" y="180" text-anchor="middle" font-size="11" fill="#FF5722" font-weight="bold">① 请求</text>
<text x="240" y="195" text-anchor="middle" font-size="9" fill="#FF6F00">example.com</text>
<line x1="170" y1="280" x2="315" y2="230" stroke="#FF5722" stroke-width="3" marker-end="url(#arrow-reverse)"/>
<text x="240" y="265" text-anchor="middle" font-size="11" fill="#FF5722" font-weight="bold">① 请求</text>
<line x1="485" y1="180" x2="595" y2="135" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-reverse)"/>
<text x="540" y="150" text-anchor="middle" font-size="11" fill="#2E7D32" font-weight="bold">② 转发</text>
<line x1="485" y1="210" x2="595" y2="225" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-reverse)"/>
<text x="540" y="210" text-anchor="middle" font-size="11" fill="#2E7D32" font-weight="bold">② 转发</text>
<line x1="485" y1="240" x2="595" y2="315" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-reverse)"/>
<text x="540" y="285" text-anchor="middle" font-size="11" fill="#2E7D32" font-weight="bold">② 转发</text>
<rect x="40" y="80" width="220" height="60" rx="5" fill="#FFCCBC" stroke="#FF5722" stroke-width="2"/>
<text x="150" y="105" text-anchor="middle" font-size="12" fill="#BF360C" font-weight="bold">客户端感知:</text>
<text x="150" y="125" text-anchor="middle" font-size="10" fill="#666">✗ 不知道代理存在</text>
<rect x="540" y="80" width="220" height="60" rx="5" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/>
<text x="650" y="105" text-anchor="middle" font-size="12" fill="#F57F17" font-weight="bold">服务器感知:</text>
<text x="650" y="125" text-anchor="middle" font-size="10" fill="#666">✓ 知道代理存在</text>
<rect x="260" y="330" width="280" height="40" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="400" y="355" text-anchor="middle" font-size="11" fill="#1565C0" font-weight="bold">作用: 负载均衡、隐藏服务器、SSL 卸载、缓存静态资源</text>
</svg>

**反向代理特点:**
- **对客户端透明**: 客户端不知道代理的存在
- **隐藏服务器**: 客户端不知道真实服务器地址
- **统一入口**: 所有请求经过同一个代理服务器
- **典型应用**: Nginx、HAProxy、Apache、CDN

**反向代理使用场景:**
1. **负载均衡**: 分发请求到多台后端服务器
2. **隐藏服务器信息**: 保护真实服务器 IP 和架构
3. **SSL/TLS 终止**: 在代理层处理 HTTPS 加密
4. **缓存静态资源**: 减轻后端服务器压力
5. **安全防护**: 防御 DDoS、过滤恶意请求
6. **统一入口**: 多个服务统一域名访问

3. **正向代理 vs 反向代理对比**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="510" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">正向代理 vs 反向代理</text>
<line x1="400" y="75" x2="400" y="515" stroke="#BDBDBD" stroke-width="2"/>
<text x="210" y="95" text-anchor="middle" font-size="16" font-weight="bold" fill="#2196F3">正向代理</text>
<text x="590" y="95" text-anchor="middle" font-size="16" font-weight="bold" fill="#FF9800">反向代理</text>
<rect x="50" y="110" width="320" height="60" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="70" y="135" font-size="13" fill="#1976D2" font-weight="bold">代理对象:</text>
<text x="210" y="135" text-anchor="middle" font-size="12" fill="#333">代理客户端</text>
<text x="210" y="153" text-anchor="middle" font-size="11" fill="#666">为客户端服务</text>
<rect x="430" y="110" width="320" height="60" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="450" y="135" font-size="13" fill="#F57C00" font-weight="bold">代理对象:</text>
<text x="590" y="135" text-anchor="middle" font-size="12" fill="#333">代理服务器</text>
<text x="590" y="153" text-anchor="middle" font-size="11" fill="#666">为服务器服务</text>
<rect x="50" y="185" width="320" height="60" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="70" y="210" font-size="13" fill="#1976D2" font-weight="bold">位置:</text>
<text x="210" y="210" text-anchor="middle" font-size="12" fill="#333">客户端网络内</text>
<text x="210" y="228" text-anchor="middle" font-size="11" fill="#666">靠近客户端</text>
<rect x="430" y="185" width="320" height="60" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="450" y="210" font-size="13" fill="#F57C00" font-weight="bold">位置:</text>
<text x="590" y="210" text-anchor="middle" font-size="12" fill="#333">服务器网络内</text>
<text x="590" y="228" text-anchor="middle" font-size="11" fill="#666">靠近服务器</text>
<rect x="50" y="260" width="320" height="60" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="70" y="285" font-size="13" fill="#1976D2" font-weight="bold">客户端感知:</text>
<text x="210" y="285" text-anchor="middle" font-size="12" fill="#4CAF50" font-weight="bold">✓ 知道</text>
<text x="210" y="303" text-anchor="middle" font-size="11" fill="#666">需主动配置</text>
<rect x="430" y="260" width="320" height="60" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="450" y="285" font-size="13" fill="#F57C00" font-weight="bold">客户端感知:</text>
<text x="590" y="285" text-anchor="middle" font-size="12" fill="#F44336" font-weight="bold">✗ 不知道</text>
<text x="590" y="303" text-anchor="middle" font-size="11" fill="#666">完全透明</text>
<rect x="50" y="335" width="320" height="60" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="70" y="360" font-size="13" fill="#1976D2" font-weight="bold">服务器感知:</text>
<text x="210" y="360" text-anchor="middle" font-size="12" fill="#F44336" font-weight="bold">✗ 不知道</text>
<text x="210" y="378" text-anchor="middle" font-size="11" fill="#666">看到代理 IP</text>
<rect x="430" y="335" width="320" height="60" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="450" y="360" font-size="13" fill="#F57C00" font-weight="bold">服务器感知:</text>
<text x="590" y="360" text-anchor="middle" font-size="12" fill="#4CAF50" font-weight="bold">✓ 知道</text>
<text x="590" y="378" text-anchor="middle" font-size="11" fill="#666">配置代理规则</text>
<rect x="50" y="410" width="320" height="90" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="70" y="435" font-size="13" fill="#1976D2" font-weight="bold">典型应用:</text>
<text x="210" y="455" text-anchor="middle" font-size="11" fill="#666">• VPN、科学上网</text>
<text x="210" y="472" text-anchor="middle" font-size="11" fill="#666">• 企业上网管理</text>
<text x="210" y="489" text-anchor="middle" font-size="11" fill="#666">• 访问内网资源</text>
<rect x="430" y="410" width="320" height="90" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="450" y="435" font-size="13" fill="#F57C00" font-weight="bold">典型应用:</text>
<text x="590" y="455" text-anchor="middle" font-size="11" fill="#666">• Nginx、HAProxy</text>
<text x="590" y="472" text-anchor="middle" font-size="11" fill="#666">• CDN、负载均衡</text>
<text x="590" y="489" text-anchor="middle" font-size="11" fill="#666">• API 网关</text>
</svg>

4. **常见代理软件**

| 类型 | 软件 | 特点 | 使用场景 |
|------|------|------|---------|
| **正向代理** | Squid | 开源、功能强大 | 企业网关 |
| **正向代理** | Privoxy | 隐私保护 | 个人隐私 |
| **正向代理** | Shadowsocks | 轻量、加密 | 科学上网 |
| **反向代理** | Nginx | 高性能、轻量 | Web 服务器 |
| **反向代理** | HAProxy | 专业负载均衡 | 大型网站 |
| **反向代理** | Apache | 功能全面 | 传统服务器 |
| **反向代理** | Traefik | 云原生、动态配置 | 容器环境 |

5. **Nginx 反向代理配置示例**

```nginx
# 基本反向代理
server {
    listen 80;
    server_name www.example.com;

    location / {
        proxy_pass http://backend_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# 负载均衡
upstream backend {
    server 10.0.1.10:8080 weight=3;
    server 10.0.1.11:8080 weight=2;
    server 10.0.1.12:8080 backup;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

**关键要点**

1. **代理方向不同**: 正向代理面向客户端,反向代理面向服务器
2. **感知对象不同**: 正向代理客户端知道,反向代理客户端不知道
3. **应用场景不同**: 正向代理突破限制,反向代理负载均衡
4. **配置位置不同**: 正向代理配置在客户端,反向代理配置在服务器
5. **安全作用不同**: 正向代理保护客户端,反向代理保护服务器

**记忆口诀**

"**正向客户反向服,隐藏对象看方向**"
- **正向客户**: 正向代理代理客户端
- **反向服**: 反向代理代理服务器
- **隐藏对象**: 谁被代理谁被隐藏
- **看方向**: 代理方向决定类型

### 90. 什么是 HTTP 缓存?缓存策略有哪些?

**核心答案**

HTTP 缓存是将 HTTP 请求的响应结果保存在本地(浏览器、代理服务器等),当再次请求相同资源时,直接使用缓存副本而不需要再次从服务器获取,从而减少网络传输、降低服务器负载、提高页面加载速度。HTTP 缓存主要分为**强缓存**和**协商缓存**两大策略。

**详细说明**

1. **HTTP 缓存工作流程**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-cache" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#4CAF50"/></marker><marker id="arrow-cache-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#F44336"/></marker></defs>
<rect x="20" y="20" width="760" height="410" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">HTTP 缓存决策流程</text>
<rect x="320" y="80" width="160" height="60" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="400" y="108" text-anchor="middle" font-size="14" fill="#1565C0" font-weight="bold">① 发起请求</text>
<text x="400" y="128" text-anchor="middle" font-size="11" fill="#666">GET /style.css</text>
<rect x="320" y="165" width="160" height="50" rx="5" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/>
<text x="400" y="195" text-anchor="middle" font-size="13" fill="#F57F17" font-weight="bold">是否有缓存?</text>
<path d="M 400 215 L 400 240" stroke="#757575" stroke-width="2" marker-end="url(#arrow-cache)"/>
<rect x="320" y="240" width="160" height="50" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="400" y="270" text-anchor="middle" font-size="13" fill="#F57C00" font-weight="bold">缓存是否过期?</text>
<path d="M 320 265 L 180 265" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-cache)"/>
<text x="240" y="255" text-anchor="middle" font-size="11" fill="#2E7D32" font-weight="bold">未过期</text>
<rect x="50" y="240" width="130" height="50" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="115" y="260" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">强缓存命中</text>
<text x="115" y="278" text-anchor="middle" font-size="10" fill="#66BB6A">200 (from cache)</text>
<path d="M 400 290 L 400 320" stroke="#F44336" stroke-width="2" marker-end="url(#arrow-cache-red)"/>
<text x="420" y="310" font-size="11" fill="#D32F2F" font-weight="bold">已过期</text>
<rect x="320" y="320" width="160" height="50" rx="5" fill="#FFCCBC" stroke="#FF5722" stroke-width="2"/>
<text x="400" y="350" text-anchor="middle" font-size="13" fill="#D84315" font-weight="bold">协商缓存验证</text>
<path d="M 480 345 L 600 345" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow-cache)"/>
<text x="540" y="335" text-anchor="middle" font-size="11" fill="#1976D2" font-weight="bold">向服务器验证</text>
<rect x="600" y="240" width="150" height="50" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="675" y="260" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">未修改</text>
<text x="675" y="278" text-anchor="middle" font-size="10" fill="#66BB6A">304 Not Modified</text>
<rect x="600" y="320" width="150" height="50" rx="5" fill="#FFEBEE" stroke="#F44336" stroke-width="2"/>
<text x="675" y="340" text-anchor="middle" font-size="12" fill="#C62828" font-weight="bold">已修改</text>
<text x="675" y="358" text-anchor="middle" font-size="10" fill="#EF5350">200 OK + 新内容</text>
<path d="M 480 190 L 600 190 L 600 240" stroke="#F44336" stroke-width="2" marker-end="url(#arrow-cache-red)"/>
<text x="540" y="180" text-anchor="middle" font-size="11" fill="#D32F2F" font-weight="bold">无缓存</text>
<path d="M 675 290 L 675 320" stroke="#757575" stroke-width="2" marker-end="url(#arrow-cache)"/>
<rect x="50" y="390" width="150" height="30" rx="3" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1"/>
<text x="125" y="410" text-anchor="middle" font-size="11" fill="#2E7D32" font-weight="bold">✓ 使用缓存 (快)</text>
<rect x="220" y="390" width="150" height="30" rx="3" fill="#FFF9C4" stroke="#FBC02D" stroke-width="1"/>
<text x="295" y="410" text-anchor="middle" font-size="11" fill="#F57F17" font-weight="bold">→ 验证缓存 (中)</text>
<rect x="390" y="390" width="150" height="30" rx="3" fill="#FFCDD2" stroke="#F44336" stroke-width="1"/>
<text x="465" y="410" text-anchor="middle" font-size="11" fill="#C62828" font-weight="bold">✗ 请求服务器 (慢)</text>
</svg>

2. **强缓存 (Strong Cache)**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="460" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="3"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#2E7D32">强缓存 (Strong Cache)</text>
<rect x="50" y="80" width="340" height="180" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="220" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#2E7D32">1️⃣ Expires (HTTP/1.0)</text>
<rect x="60" y="125" width="320" height="120" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="220" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#388E3C">绝对时间过期</text>
<text x="70" y="175" font-size="11" font-family="monospace" fill="#2E7D32">Expires: Wed, 21 Oct 2025</text>
<text x="70" y="192" font-size="11" font-family="monospace" fill="#2E7D32">14:28:00 GMT</text>
<text x="220" y="220" text-anchor="middle" font-size="10" fill="#666">✓ 优点: 简单易懂</text>
<text x="220" y="235" text-anchor="middle" font-size="10" fill="#F44336">✗ 缺点: 依赖客户端时间</text>
<rect x="410" y="80" width="340" height="180" rx="5" fill="#81C784" stroke="#4CAF50" stroke-width="2"/>
<text x="580" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#1B5E20">2️⃣ Cache-Control (HTTP/1.1)</text>
<rect x="420" y="125" width="320" height="120" rx="3" fill="white" stroke="#4CAF50" stroke-width="1"/>
<text x="580" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#2E7D32">相对时间过期</text>
<text x="430" y="175" font-size="11" font-family="monospace" fill="#1B5E20">Cache-Control: max-age=3600</text>
<text x="430" y="195" font-size="10" fill="#666">(缓存 1 小时 = 3600 秒)</text>
<text x="580" y="220" text-anchor="middle" font-size="10" fill="#4CAF50">✓ 优点: 精确、不依赖时间</text>
<text x="580" y="235" text-anchor="middle" font-size="10" fill="#4CAF50">✓ 优先级高于 Expires</text>
<rect x="50" y="280" width="700" height="180" rx="5" fill="#A5D6A7" stroke="#66BB6A" stroke-width="2"/>
<text x="400" y="310" text-anchor="middle" font-size="15" font-weight="bold" fill="#1B5E20">Cache-Control 常用指令</text>
<rect x="70" y="325" width="310" height="120" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="225" y="348" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">客户端可用:</text>
<text x="80" y="370" font-size="11" font-family="monospace" fill="#333">max-age=秒数</text>
<text x="240" y="370" font-size="10" fill="#666">缓存有效期</text>
<text x="80" y="390" font-size="11" font-family="monospace" fill="#333">no-cache</text>
<text x="240" y="390" font-size="10" fill="#666">需验证后使用</text>
<text x="80" y="410" font-size="11" font-family="monospace" fill="#333">no-store</text>
<text x="240" y="410" font-size="10" fill="#666">不缓存任何内容</text>
<text x="80" y="430" font-size="11" font-family="monospace" fill="#333">private</text>
<text x="240" y="430" font-size="10" fill="#666">仅浏览器缓存</text>
<rect x="400" y="325" width="330" height="120" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="565" y="348" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">服务器可用:</text>
<text x="410" y="370" font-size="11" font-family="monospace" fill="#333">public</text>
<text x="550" y="370" font-size="10" fill="#666">可被代理、CDN 缓存</text>
<text x="410" y="390" font-size="11" font-family="monospace" fill="#333">s-maxage=秒数</text>
<text x="550" y="390" font-size="10" fill="#666">代理服务器缓存时间</text>
<text x="410" y="410" font-size="11" font-family="monospace" fill="#333">must-revalidate</text>
<text x="550" y="410" font-size="10" fill="#666">过期必须验证</text>
<text x="410" y="430" font-size="11" font-family="monospace" fill="#333">immutable</text>
<text x="550" y="430" font-size="10" fill="#666">资源永不改变</text>
</svg>

**强缓存特点:**
- **不发送请求**: 直接从本地缓存读取
- **状态码**: `200 OK (from disk cache)` 或 `(from memory cache)`
- **速度最快**: 无网络开销
- **适用场景**: 静态资源(CSS、JS、图片)

3. **协商缓存 (Negotiation Cache)**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="510" rx="8" fill="#E3F2FD" stroke="#2196F3" stroke-width="3"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1565C0">协商缓存 (Negotiation Cache)</text>
<rect x="50" y="80" width="340" height="210" rx="5" fill="#BBDEFB" stroke="#2196F3" stroke-width="2"/>
<text x="220" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#1565C0">1️⃣ Last-Modified / If-Modified-Since</text>
<rect x="60" y="125" width="320" height="150" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="220" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">基于修改时间</text>
<text x="70" y="175" font-size="11" fill="#1565C0" font-weight="bold">服务器响应:</text>
<text x="70" y="192" font-size="10" font-family="monospace" fill="#333">Last-Modified: Mon, 10 Jun</text>
<text x="70" y="207" font-size="10" font-family="monospace" fill="#333">2024 09:00:00 GMT</text>
<text x="70" y="232" font-size="11" fill="#1565C0" font-weight="bold">客户端请求:</text>
<text x="70" y="249" font-size="10" font-family="monospace" fill="#333">If-Modified-Since: Mon, 10</text>
<text x="70" y="264" font-size="10" font-family="monospace" fill="#333">Jun 2024 09:00:00 GMT</text>
<rect x="410" y="80" width="340" height="210" rx="5" fill="#90CAF9" stroke="#2196F3" stroke-width="2"/>
<text x="580" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#0D47A1">2️⃣ ETag / If-None-Match</text>
<rect x="420" y="125" width="320" height="150" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="580" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#1976D2">基于内容哈希</text>
<text x="430" y="175" font-size="11" fill="#0D47A1" font-weight="bold">服务器响应:</text>
<text x="430" y="192" font-size="10" font-family="monospace" fill="#333">ETag: "33a64df551425fcc"</text>
<text x="430" y="207" font-size="10" fill="#666">(文件内容的哈希值)</text>
<text x="430" y="232" font-size="11" fill="#0D47A1" font-weight="bold">客户端请求:</text>
<text x="430" y="249" font-size="10" font-family="monospace" fill="#333">If-None-Match:</text>
<text x="430" y="264" font-size="10" font-family="monospace" fill="#333">"33a64df551425fcc"</text>
<rect x="50" y="310" width="340" height="210" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="220" y="340" text-anchor="middle" font-size="14" font-weight="bold" fill="#2E7D32">Last-Modified 优缺点</text>
<rect x="60" y="355" width="320" height="150" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="220" y="380" text-anchor="middle" font-size="12" fill="#4CAF50" font-weight="bold">✓ 优点:</text>
<text x="70" y="400" font-size="10" fill="#666">• 节省带宽,只传输修改时间</text>
<text x="70" y="417" font-size="10" fill="#666">• 实现简单</text>
<text x="220" y="442" text-anchor="middle" font-size="12" fill="#F44336" font-weight="bold">✗ 缺点:</text>
<text x="70" y="462" font-size="10" fill="#666">• 精度只到秒,1 秒内多次修改无法识别</text>
<text x="70" y="479" font-size="10" fill="#666">• 文件内容未变但修改时间变了</text>
<text x="70" y="496" font-size="10" fill="#666">• 某些服务器无法精确获取修改时间</text>
<rect x="410" y="310" width="340" height="210" rx="5" fill="#81C784" stroke="#4CAF50" stroke-width="2"/>
<text x="580" y="340" text-anchor="middle" font-size="14" font-weight="bold" fill="#1B5E20">ETag 优缺点</text>
<rect x="420" y="355" width="320" height="150" rx="3" fill="white" stroke="#4CAF50" stroke-width="1"/>
<text x="580" y="380" text-anchor="middle" font-size="12" fill="#4CAF50" font-weight="bold">✓ 优点:</text>
<text x="430" y="400" font-size="10" fill="#666">• 精确识别内容变化</text>
<text x="430" y="417" font-size="10" fill="#666">• 内容未变则 ETag 不变</text>
<text x="430" y="434" font-size="10" fill="#666">• 优先级高于 Last-Modified</text>
<text x="580" y="459" text-anchor="middle" font-size="12" fill="#F44336" font-weight="bold">✗ 缺点:</text>
<text x="430" y="479" font-size="10" fill="#666">• 计算 ETag 消耗服务器资源</text>
<text x="430" y="496" font-size="10" fill="#666">• 分布式系统需统一 ETag 算法</text>
</svg>

**协商缓存特点:**
- **需要验证**: 发送请求到服务器验证资源是否更新
- **状态码**:
  - `304 Not Modified` - 未修改,使用缓存
  - `200 OK` - 已修改,返回新内容
- **速度中等**: 有网络开销但无需传输完整资源
- **适用场景**: 经常更新的资源(HTML、API 数据)

4. **缓存策略最佳实践**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="460" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">不同资源的缓存策略</text>
<rect x="50" y="80" width="340" height="180" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="220" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#2E7D32">静态资源 (强缓存)</text>
<rect x="60" y="125" width="320" height="120" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="220" y="150" text-anchor="middle" font-size="12" fill="#388E3C" font-weight="bold">CSS / JS / 图片</text>
<text x="70" y="175" font-size="10" font-family="monospace" fill="#2E7D32">Cache-Control:</text>
<text x="70" y="192" font-size="10" font-family="monospace" fill="#2E7D32">public, max-age=31536000,</text>
<text x="70" y="209" font-size="10" font-family="monospace" fill="#2E7D32">immutable</text>
<text x="220" y="230" text-anchor="middle" font-size="10" fill="#666">(1 年 = 31536000 秒)</text>
<rect x="410" y="80" width="340" height="180" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="580" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#1565C0">HTML (协商缓存)</text>
<rect x="420" y="125" width="320" height="120" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="580" y="150" text-anchor="middle" font-size="12" fill="#1976D2" font-weight="bold">index.html</text>
<text x="430" y="175" font-size="10" font-family="monospace" fill="#1565C0">Cache-Control:</text>
<text x="430" y="192" font-size="10" font-family="monospace" fill="#1565C0">no-cache</text>
<text x="430" y="209" font-size="10" font-family="monospace" fill="#1565C0">ETag: "abc123"</text>
<text x="580" y="230" text-anchor="middle" font-size="10" fill="#666">(每次验证,内容未变返回 304)</text>
<rect x="50" y="280" width="340" height="180" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="220" y="310" text-anchor="middle" font-size="15" font-weight="bold" fill="#F57C00">API 数据 (短期缓存)</text>
<rect x="60" y="325" width="320" height="120" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="220" y="350" text-anchor="middle" font-size="12" fill="#EF6C00" font-weight="bold">动态接口</text>
<text x="70" y="375" font-size="10" font-family="monospace" fill="#F57C00">Cache-Control:</text>
<text x="70" y="392" font-size="10" font-family="monospace" fill="#F57C00">private, max-age=60</text>
<text x="70" y="409" font-size="10" font-family="monospace" fill="#F57C00">ETag: "xyz789"</text>
<text x="220" y="430" text-anchor="middle" font-size="10" fill="#666">(1 分钟内使用缓存,过期后验证)</text>
<rect x="410" y="280" width="340" height="180" rx="5" fill="#FFEBEE" stroke="#F44336" stroke-width="2"/>
<text x="580" y="310" text-anchor="middle" font-size="15" font-weight="bold" fill="#C62828">敏感数据 (不缓存)</text>
<rect x="420" y="325" width="320" height="120" rx="3" fill="white" stroke="#EF5350" stroke-width="1"/>
<text x="580" y="350" text-anchor="middle" font-size="12" fill="#D32F2F" font-weight="bold">用户信息 / 支付</text>
<text x="430" y="375" font-size="10" font-family="monospace" fill="#E53935">Cache-Control:</text>
<text x="430" y="392" font-size="10" font-family="monospace" fill="#E53935">no-store, no-cache,</text>
<text x="430" y="409" font-size="10" font-family="monospace" fill="#E53935">must-revalidate</text>
<text x="580" y="430" text-anchor="middle" font-size="10" fill="#666">(完全不缓存,每次请求服务器)</text>
</svg>

5. **缓存位置优先级**

1. **Service Worker Cache**: PWA 应用控制的缓存
2. **Memory Cache**: 内存缓存(关闭标签页即失效)
3. **Disk Cache**: 硬盘缓存(持久化存储)
4. **Push Cache**: HTTP/2 推送缓存(会话级别)

6. **实战配置示例**

**Nginx 配置:**
```nginx
location ~* \.(css|js|jpg|png|gif)$ {
    # 静态资源强缓存 1 年
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.html$ {
    # HTML 使用协商缓存
    add_header Cache-Control "no-cache";
    etag on;
}

location /api/ {
    # API 不缓存
    add_header Cache-Control "no-store, no-cache, must-revalidate";
}
```

**Node.js (Express) 配置:**
```javascript
// 静态资源
app.use('/static', express.static('public', {
  maxAge: '1y',
  immutable: true
}));

// HTML 协商缓存
app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('ETag', generateETag(content));
  res.send(content);
});
```

7. **缓存策略对比**

| 策略 | 是否请求服务器 | 状态码 | 性能 | 适用场景 |
|------|--------------|--------|------|---------|
| **强缓存** | ✗ 不请求 | 200 (cache) | ⭐⭐⭐⭐⭐ | 静态资源 |
| **协商缓存** | ✓ 验证请求 | 304 / 200 | ⭐⭐⭐ | HTML、经常更新 |
| **不缓存** | ✓ 每次请求 | 200 | ⭐ | 敏感数据 |

**关键要点**

1. **优先使用强缓存**: 静态资源使用长期缓存 + 文件名哈希
2. **HTML 用协商缓存**: 确保用户获取最新页面
3. **版本化静态资源**: `app.v2.3.4.js` 避免缓存问题
4. **敏感数据不缓存**: 用户信息、支付数据使用 no-store
5. **合理设置过期时间**: 根据更新频率调整 max-age

**记忆口诀**

"**强缓本地不请求,协商验证看修改**"
- **强缓本地**: 强缓存直接使用本地副本
- **不请求**: 不发送网络请求
- **协商验证**: 协商缓存需要验证
- **看修改**: 根据 Last-Modified 或 ETag 判断

### 91. 什么是强缓存和协商缓存？

**核心答案**

强缓存和协商缓存是 HTTP 缓存的两种主要机制：
- **强缓存**：浏览器直接使用本地缓存，不向服务器发送请求
- **协商缓存**：浏览器向服务器验证缓存是否有效，根据服务器响应决定是否使用缓存

**详细说明**

#### 1. 强缓存（Strong Cache）

**工作流程**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead91-1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#2563eb"/></marker></defs>
<rect x="50" y="50" width="120" height="60" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="110" y="85" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">浏览器</text>
<rect x="330" y="50" width="120" height="60" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="390" y="85" text-anchor="middle" font-size="14" fill="#92400e" font-weight="bold">本地缓存</text>
<rect x="610" y="50" width="120" height="60" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="670" y="85" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">服务器</text>
<line x1="170" y1="80" x2="320" y2="80" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead91-1)"/>
<text x="245" y="70" text-anchor="middle" font-size="13" fill="#1e40af">1. 请求资源</text>
<line x1="390" y1="120" x2="390" y2="150" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead91-1)"/>
<text x="490" y="140" text-anchor="middle" font-size="13" fill="#1e40af">2. 检查缓存</text>
<rect x="330" y="170" width="120" height="50" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="390" y="200" text-anchor="middle" font-size="13" fill="#92400e" font-weight="bold">缓存有效？</text>
<line x1="330" y1="195" x2="180" y2="120" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead91-1)" stroke-dasharray="5,5"/>
<text x="240" y="150" text-anchor="middle" font-size="13" fill="#10b981" font-weight="bold">YES: 直接返回</text>
<line x1="450" y1="195" x2="610" y2="80" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead91-1)"/>
<text x="540" y="130" text-anchor="middle" font-size="13" fill="#ef4444" font-weight="bold">NO: 请求服务器</text>
<rect x="50" y="280" width="680" height="80" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="390" y="310" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">强缓存特点：</text>
<text x="390" y="335" text-anchor="middle" font-size="13" fill="#065f46">• 缓存有效期内不发送请求，直接使用本地缓存</text>
<text x="390" y="355" text-anchor="middle" font-size="13" fill="#065f46">• HTTP 状态码：200 (from disk cache / from memory cache)</text>
</svg>

**控制字段**：
- `Cache-Control: max-age=3600`（优先级高）
- `Expires: Wed, 21 Oct 2025 07:28:00 GMT`（HTTP/1.0，优先级低）

**特点**：
- 不发送 HTTP 请求
- 响应速度最快
- 节省带宽
- 状态码：200（from cache）

#### 2. 协商缓存（Negotiation Cache）

**工作流程**：

<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead91-2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#2563eb"/></marker></defs>
<rect x="50" y="30" width="120" height="60" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="110" y="65" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">浏览器</text>
<rect x="610" y="30" width="120" height="60" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="670" y="65" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">服务器</text>
<line x1="170" y1="60" x2="600" y2="60" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead91-2)"/>
<text x="385" y="50" text-anchor="middle" font-size="13" fill="#1e40af">1. 请求 + 缓存标识</text>
<text x="385" y="75" text-anchor="middle" font-size="12" fill="#64748b">(If-None-Match / If-Modified-Since)</text>
<line x1="600" y1="90" x2="180" y2="90" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead91-2)"/>
<text x="385" y="110" text-anchor="middle" font-size="13" fill="#10b981">2. 验证缓存</text>
<rect x="50" y="140" width="680" height="100" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="390" y="165" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">缓存未修改（304）</text>
<text x="390" y="190" text-anchor="middle" font-size="13" fill="#065f46">• 服务器返回 304 Not Modified</text>
<text x="390" y="210" text-anchor="middle" font-size="13" fill="#065f46">• 浏览器使用本地缓存</text>
<text x="390" y="230" text-anchor="middle" font-size="13" fill="#065f46">• 不传输资源内容，节省带宽</text>
<rect x="50" y="260" width="680" height="100" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="390" y="285" text-anchor="middle" font-size="14" fill="#991b1b" font-weight="bold">缓存已修改（200）</text>
<text x="390" y="310" text-anchor="middle" font-size="13" fill="#991b1b">• 服务器返回 200 OK + 新资源</text>
<text x="390" y="330" text-anchor="middle" font-size="13" fill="#991b1b">• 浏览器更新本地缓存</text>
<text x="390" y="350" text-anchor="middle" font-size="13" fill="#991b1b">• 传输完整资源内容</text>
<rect x="50" y="380" width="680" height="80" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="390" y="410" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">协商缓存特点：</text>
<text x="390" y="435" text-anchor="middle" font-size="13" fill="#1e40af">• 每次都需要向服务器发送请求验证</text>
<text x="390" y="455" text-anchor="middle" font-size="13" fill="#1e40af">• 缓存有效时状态码：304 Not Modified</text>
</svg>

**控制字段**：
- `ETag` / `If-None-Match`（基于内容哈希，优先级高）
- `Last-Modified` / `If-Modified-Since`（基于修改时间，优先级低）

**特点**：
- 需要发送 HTTP 请求验证
- 响应速度快于完整请求
- 缓存有效时状态码：304

#### 3. 两种缓存的对比

| 对比维度 | 强缓存 | 协商缓存 |
|---------|--------|---------|
| **是否发送请求** | 不发送 | 每次都发送 |
| **验证方式** | 本地检查时间 | 服务器验证 |
| **状态码** | 200 (from cache) | 304 Not Modified |
| **响应速度** | 最快 | 较快 |
| **带宽消耗** | 无 | 较少（仅请求头） |
| **控制字段** | Cache-Control, Expires | ETag, Last-Modified |
| **优先级** | 高（先检查） | 低（强缓存失效后） |

#### 4. 缓存策略流程

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead91-3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#2563eb"/></marker></defs>
<rect x="320" y="20" width="160" height="50" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="400" y="50" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">发起 HTTP 请求</text>
<line x1="400" y1="70" x2="400" y2="100" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead91-3)"/>
<rect x="320" y="100" width="160" height="50" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="400" y="130" text-anchor="middle" font-size="14" fill="#92400e" font-weight="bold">检查强缓存</text>
<line x1="320" y1="125" x2="240" y2="125" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead91-3)"/>
<text x="270" y="115" text-anchor="middle" font-size="13" fill="#10b981" font-weight="bold">有效</text>
<line x1="480" y1="125" x2="560" y2="125" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead91-3)"/>
<text x="530" y="115" text-anchor="middle" font-size="13" fill="#ef4444" font-weight="bold">失效</text>
<rect x="120" y="100" width="120" height="50" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="180" y="120" text-anchor="middle" font-size="13" fill="#065f46" font-weight="bold">使用本地缓存</text>
<text x="180" y="140" text-anchor="middle" font-size="12" fill="#065f46">(200 from cache)</text>
<rect x="560" y="100" width="160" height="50" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="640" y="130" text-anchor="middle" font-size="14" fill="#92400e" font-weight="bold">检查协商缓存</text>
<line x1="640" y1="150" x2="640" y2="200" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead91-3)"/>
<rect x="560" y="200" width="160" height="50" rx="5" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/>
<text x="640" y="230" text-anchor="middle" font-size="14" fill="#5b21b6" font-weight="bold">发送验证请求</text>
<line x1="560" y1="225" x2="480" y2="225" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead91-3)"/>
<text x="510" y="215" text-anchor="middle" font-size="13" fill="#10b981" font-weight="bold">304</text>
<line x1="640" y1="250" x2="640" y2="300" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead91-3)"/>
<text x="680" y="280" text-anchor="middle" font-size="13" fill="#ef4444" font-weight="bold">200</text>
<rect x="360" y="200" width="120" height="50" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="420" y="220" text-anchor="middle" font-size="13" fill="#065f46" font-weight="bold">使用本地缓存</text>
<text x="420" y="240" text-anchor="middle" font-size="12" fill="#065f46">(304 Not Modified)</text>
<rect x="560" y="300" width="160" height="50" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="640" y="320" text-anchor="middle" font-size="13" fill="#991b1b" font-weight="bold">下载新资源</text>
<text x="640" y="340" text-anchor="middle" font-size="12" fill="#991b1b">(200 OK + 资源)</text>
<rect x="50" y="400" width="700" height="180" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
<text x="400" y="430" text-anchor="middle" font-size="15" fill="#1e293b" font-weight="bold">缓存优先级与选择策略</text>
<text x="80" y="460" text-anchor="start" font-size="13" fill="#334155">1. <tspan font-weight="bold" fill="#2563eb">强缓存优先</tspan>：先检查 Cache-Control/Expires，有效则直接使用</text>
<text x="80" y="485" text-anchor="start" font-size="13" fill="#334155">2. <tspan font-weight="bold" fill="#f59e0b">协商缓存兜底</tspan>：强缓存失效后，使用 ETag/Last-Modified 验证</text>
<text x="80" y="510" text-anchor="start" font-size="13" fill="#334155">3. <tspan font-weight="bold" fill="#8b5cf6">字段优先级</tspan>：Cache-Control > Expires，ETag > Last-Modified</text>
<text x="80" y="535" text-anchor="start" font-size="13" fill="#334155">4. <tspan font-weight="bold" fill="#10b981">适用场景</tspan>：静态资源用强缓存，动态内容用协商缓存</text>
<text x="80" y="560" text-anchor="start" font-size="13" fill="#334155">5. <tspan font-weight="bold" fill="#ef4444">缓存更新</tspan>：通过版本号或内容哈希（如 main.v2.js）强制刷新</text>
</svg>

#### 5. 实际应用场景

**强缓存适用**：
- 静态资源（CSS、JS、图片）
- 长期不变的文件
- 带版本号的资源（如 `app.v1.0.js`）

**协商缓存适用**：
- 经常更新的资源
- HTML 页面
- API 接口响应（较少使用）

**关键要点**

1. **优先级关系**：强缓存 > 协商缓存
2. **请求次数**：强缓存无请求，协商缓存有请求
3. **状态码区别**：200 (cache) vs 304 Not Modified
4. **性能对比**：强缓存最快，协商缓存次之，完整请求最慢
5. **实践建议**：静态资源用强缓存 + 文件名哈希，动态内容用协商缓存

**记忆口诀**

```
强缓存不请求，本地直接用
协商缓存需验证，304 才能行
优先检查强缓存，失效再协商
静态资源强为主，动态内容协为辅
```

### 92. Cache-Control、Expires、ETag、Last-Modified 的作用是什么？

**核心答案**

这四个字段是 HTTP 缓存控制的核心机制：
- **Cache-Control**：HTTP/1.1 强缓存控制（优先级最高）
- **Expires**：HTTP/1.0 强缓存控制（已过时）
- **ETag**：协商缓存的内容标识（基于内容哈希）
- **Last-Modified**：协商缓存的时间标识（基于修改时间）

**详细说明**

#### 1. Cache-Control（强缓存 - 现代标准）

**作用**：HTTP/1.1 引入的缓存控制字段，用于精确控制缓存行为

**常用指令**：

<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="860" height="460" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
<text x="450" y="50" text-anchor="middle" font-size="16" fill="#1e293b" font-weight="bold">Cache-Control 指令详解</text>
<rect x="40" y="70" width="400" height="80" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="70" y="95" text-anchor="start" font-size="14" fill="#1e40af" font-weight="bold">max-age=&lt;seconds&gt;</text>
<text x="70" y="115" text-anchor="start" font-size="12" fill="#1e40af">• 缓存有效期（秒）</text>
<text x="70" y="132" text-anchor="start" font-size="12" fill="#1e40af">• 例：max-age=3600（1小时）</text>
<rect x="460" y="70" width="400" height="80" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="490" y="95" text-anchor="start" font-size="14" fill="#92400e" font-weight="bold">no-cache</text>
<text x="490" y="115" text-anchor="start" font-size="12" fill="#92400e">• 使用前必须验证（协商缓存）</text>
<text x="490" y="132" text-anchor="start" font-size="12" fill="#92400e">• 不是"不缓存"，是"先验证"</text>
<rect x="40" y="165" width="400" height="80" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="70" y="190" text-anchor="start" font-size="14" fill="#991b1b" font-weight="bold">no-store</text>
<text x="70" y="210" text-anchor="start" font-size="12" fill="#991b1b">• 完全不缓存（敏感数据）</text>
<text x="70" y="227" text-anchor="start" font-size="12" fill="#991b1b">• 每次都从服务器获取</text>
<rect x="460" y="165" width="400" height="80" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="490" y="190" text-anchor="start" font-size="14" fill="#065f46" font-weight="bold">public / private</text>
<text x="490" y="210" text-anchor="start" font-size="12" fill="#065f46">• public: 可被任何缓存（CDN）</text>
<text x="490" y="227" text-anchor="start" font-size="12" fill="#065f46">• private: 仅浏览器缓存（默认）</text>
<rect x="40" y="260" width="400" height="80" rx="5" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/>
<text x="70" y="285" text-anchor="start" font-size="14" fill="#5b21b6" font-weight="bold">s-maxage=&lt;seconds&gt;</text>
<text x="70" y="305" text-anchor="start" font-size="12" fill="#5b21b6">• 共享缓存（CDN）的有效期</text>
<text x="70" y="322" text-anchor="start" font-size="12" fill="#5b21b6">• 优先级高于 max-age</text>
<rect x="460" y="260" width="400" height="80" rx="5" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
<text x="490" y="285" text-anchor="start" font-size="14" fill="#9f1239" font-weight="bold">must-revalidate</text>
<text x="490" y="305" text-anchor="start" font-size="12" fill="#9f1239">• 缓存过期后必须验证</text>
<text x="490" y="322" text-anchor="start" font-size="12" fill="#9f1239">• 不能使用过期缓存</text>
<rect x="40" y="355" width="820" height="110" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="450" y="380" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">常用组合示例</text>
<text x="70" y="405" text-anchor="start" font-size="12" fill="#065f46">• <tspan font-weight="bold">Cache-Control: max-age=31536000, immutable</tspan> → 静态资源（1年）</text>
<text x="70" y="425" text-anchor="start" font-size="12" fill="#065f46">• <tspan font-weight="bold">Cache-Control: no-cache</tspan> → HTML页面（每次验证）</text>
<text x="70" y="445" text-anchor="start" font-size="12" fill="#065f46">• <tspan font-weight="bold">Cache-Control: no-store</tspan> → 敏感数据（银行信息）</text>
</svg>

**示例**：
```
Cache-Control: max-age=3600, public
Cache-Control: no-cache, must-revalidate
Cache-Control: no-store
```

#### 2. Expires（强缓存 - 旧标准）

**作用**：HTTP/1.0 的缓存控制字段，指定资源过期的绝对时间

**格式**：GMT 格式的日期时间
```
Expires: Wed, 21 Oct 2025 07:28:00 GMT
```

**缺点与对比**：

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="30" width="350" height="280" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="205" y="60" text-anchor="middle" font-size="15" fill="#991b1b" font-weight="bold">Expires（已过时）</text>
<text x="60" y="90" text-anchor="start" font-size="13" fill="#991b1b">❌ 缺点：</text>
<text x="60" y="115" text-anchor="start" font-size="12" fill="#991b1b">1. 依赖客户端时间</text>
<text x="60" y="135" text-anchor="start" font-size="12" fill="#991b1b">2. 时区问题</text>
<text x="60" y="155" text-anchor="start" font-size="12" fill="#991b1b">3. 时间可能被修改</text>
<text x="60" y="175" text-anchor="start" font-size="12" fill="#991b1b">4. 绝对时间不灵活</text>
<text x="60" y="205" text-anchor="start" font-size="13" fill="#991b1b">✓ 用途：</text>
<text x="60" y="230" text-anchor="start" font-size="12" fill="#991b1b">• HTTP/1.0 兼容</text>
<text x="60" y="250" text-anchor="start" font-size="12" fill="#991b1b">• 作为 Cache-Control 的备用</text>
<text x="60" y="285" text-anchor="start" font-size="11" fill="#991b1b" font-style="italic">优先级：Cache-Control > Expires</text>
<rect x="420" y="30" width="350" height="280" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="595" y="60" text-anchor="middle" font-size="15" fill="#065f46" font-weight="bold">Cache-Control（现代）</text>
<text x="450" y="90" text-anchor="start" font-size="13" fill="#065f46">✓ 优点：</text>
<text x="450" y="115" text-anchor="start" font-size="12" fill="#065f46">1. 相对时间（秒数）</text>
<text x="450" y="135" text-anchor="start" font-size="12" fill="#065f46">2. 不依赖客户端时间</text>
<text x="450" y="155" text-anchor="start" font-size="12" fill="#065f46">3. 更多控制指令</text>
<text x="450" y="175" text-anchor="start" font-size="12" fill="#065f46">4. 精确控制缓存行为</text>
<text x="450" y="205" text-anchor="start" font-size="13" fill="#065f46">✓ 推荐：</text>
<text x="450" y="230" text-anchor="start" font-size="12" fill="#065f46">• HTTP/1.1+ 使用</text>
<text x="450" y="250" text-anchor="start" font-size="12" fill="#065f46">• 现代浏览器首选</text>
<text x="450" y="285" text-anchor="start" font-size="11" fill="#065f46" font-weight="bold">建议：两者都设置以兼容</text>
</svg>

**最佳实践**：同时设置两者以兼容旧浏览器
```
Cache-Control: max-age=3600
Expires: Wed, 21 Oct 2025 07:28:00 GMT
```

#### 3. ETag（协商缓存 - 内容标识）

**作用**：资源的唯一标识符（通常是内容的哈希值），用于精确验证资源是否改变

**工作流程**：

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead92" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#2563eb"/></marker></defs>
<rect x="50" y="30" width="140" height="60" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="120" y="65" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">浏览器</text>
<rect x="610" y="30" width="140" height="60" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="680" y="65" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">服务器</text>
<line x1="190" y1="60" x2="600" y2="60" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead92)"/>
<text x="395" y="50" text-anchor="middle" font-size="13" fill="#1e40af" font-weight="bold">1. 首次请求</text>
<line x1="600" y1="90" x2="200" y2="90" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead92)"/>
<text x="395" y="80" text-anchor="middle" font-size="13" fill="#10b981" font-weight="bold">2. 响应 + ETag</text>
<rect x="220" y="105" width="360" height="40" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="400" y="130" text-anchor="middle" font-size="12" fill="#92400e" font-family="monospace">ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"</text>
<line x1="190" y1="170" x2="600" y2="170" stroke="#8b5cf6" stroke-width="2" marker-end="url(#arrowhead92)"/>
<text x="395" y="160" text-anchor="middle" font-size="13" fill="#5b21b6" font-weight="bold">3. 再次请求 + If-None-Match</text>
<rect x="220" y="185" width="360" height="40" rx="5" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/>
<text x="400" y="210" text-anchor="middle" font-size="12" fill="#5b21b6" font-family="monospace">If-None-Match: "33a64df551425fcc55e4d42a148795d9..."</text>
<rect x="610" y="240" width="140" height="60" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="680" y="265" text-anchor="middle" font-size="13" fill="#92400e" font-weight="bold">服务器比对</text>
<text x="680" y="285" text-anchor="middle" font-size="12" fill="#92400e">ETag 值</text>
<line x1="610" y1="270" x2="200" y2="270" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead92)"/>
<text x="395" y="260" text-anchor="middle" font-size="13" fill="#10b981" font-weight="bold">4a. 未修改 → 304</text>
<rect x="50" y="290" width="140" height="50" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="120" y="310" text-anchor="middle" font-size="12" fill="#065f46" font-weight="bold">304 Not Modified</text>
<text x="120" y="328" text-anchor="middle" font-size="11" fill="#065f46">使用本地缓存</text>
<line x1="610" y1="310" x2="200" y2="310" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead92)"/>
<text x="395" y="330" text-anchor="middle" font-size="13" fill="#ef4444" font-weight="bold">4b. 已修改 → 200 + 新资源</text>
<rect x="50" y="350" width="140" height="50" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="120" y="370" text-anchor="middle" font-size="12" fill="#991b1b" font-weight="bold">200 OK + 新 ETag</text>
<text x="120" y="388" text-anchor="middle" font-size="11" fill="#991b1b">更新缓存</text>
</svg>

**特点**：
- **精确性高**：基于内容哈希，内容不变 ETag 就不变
- **不受时间影响**：即使文件修改时间改变，内容未变 ETag 仍相同
- **开销较大**：需要计算哈希值

**强 ETag vs 弱 ETag**：
```
ETag: "33a64df551425fcc55e4d42a148795d9"   # 强 ETag（完全匹配）
ETag: W/"33a64df551425fcc55e4d42a14879"   # 弱 ETag（语义相同即可）
```

#### 4. Last-Modified（协商缓存 - 时间标识）

**作用**：资源的最后修改时间，用于验证资源是否过期

**工作流程**：

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead92-2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#2563eb"/></marker></defs>
<rect x="50" y="30" width="140" height="60" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="120" y="65" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">浏览器</text>
<rect x="610" y="30" width="140" height="60" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="680" y="65" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">服务器</text>
<line x1="190" y1="60" x2="600" y2="60" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead92-2)"/>
<text x="395" y="50" text-anchor="middle" font-size="13" fill="#1e40af" font-weight="bold">1. 首次请求</text>
<line x1="600" y1="90" x2="200" y2="90" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead92-2)"/>
<text x="395" y="80" text-anchor="middle" font-size="13" fill="#10b981" font-weight="bold">2. 响应 + Last-Modified</text>
<rect x="220" y="105" width="360" height="40" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="400" y="130" text-anchor="middle" font-size="12" fill="#92400e" font-family="monospace">Last-Modified: Wed, 21 Oct 2024 07:28:00 GMT</text>
<line x1="190" y1="170" x2="600" y2="170" stroke="#8b5cf6" stroke-width="2" marker-end="url(#arrowhead92-2)"/>
<text x="395" y="160" text-anchor="middle" font-size="13" fill="#5b21b6" font-weight="bold">3. 再次请求 + If-Modified-Since</text>
<rect x="220" y="185" width="360" height="40" rx="5" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/>
<text x="400" y="210" text-anchor="middle" font-size="12" fill="#5b21b6" font-family="monospace">If-Modified-Since: Wed, 21 Oct 2024 07:28:00 GMT</text>
<rect x="610" y="240" width="140" height="60" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="680" y="265" text-anchor="middle" font-size="13" fill="#92400e" font-weight="bold">服务器比对</text>
<text x="680" y="285" text-anchor="middle" font-size="12" fill="#92400e">修改时间</text>
<line x1="610" y1="270" x2="200" y2="270" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead92-2)"/>
<text x="395" y="260" text-anchor="middle" font-size="13" fill="#10b981" font-weight="bold">4a. 未修改 → 304</text>
<rect x="50" y="290" width="140" height="50" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="120" y="310" text-anchor="middle" font-size="12" fill="#065f46" font-weight="bold">304 Not Modified</text>
<text x="120" y="328" text-anchor="middle" font-size="11" fill="#065f46">使用本地缓存</text>
<line x1="610" y1="310" x2="200" y2="310" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead92-2)"/>
<text x="395" y="330" text-anchor="middle" font-size="13" fill="#ef4444" font-weight="bold">4b. 已修改 → 200 + 新资源</text>
<rect x="50" y="350" width="140" height="50" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="120" y="370" text-anchor="middle" font-size="12" fill="#991b1b" font-weight="bold">200 OK + 新时间</text>
<text x="120" y="388" text-anchor="middle" font-size="11" fill="#991b1b">更新缓存</text>
</svg>

**缺点**：
- **精度限制**：只能精确到秒，1秒内多次修改无法识别
- **时间不可靠**：文件移动、复制会改变修改时间，但内容未变
- **分布式问题**：多服务器时间可能不同步

**特点**：
- 计算成本低（直接读取文件修改时间）
- 不够精确（优先级低于 ETag）

#### 5. 四个字段的优先级与配合

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="740" height="510" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
<text x="400" y="50" text-anchor="middle" font-size="16" fill="#1e293b" font-weight="bold">缓存字段优先级与配合策略</text>
<rect x="60" y="80" width="680" height="100" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="400" y="105" text-anchor="middle" font-size="15" fill="#1e40af" font-weight="bold">强缓存（优先检查）</text>
<text x="400" y="130" text-anchor="middle" font-size="13" fill="#1e40af">Cache-Control（优先级 1） > Expires（优先级 2）</text>
<text x="400" y="150" text-anchor="middle" font-size="12" fill="#1e40af">如果强缓存有效 → 直接使用本地缓存（200 from cache）</text>
<text x="400" y="168" text-anchor="middle" font-size="12" fill="#64748b">如果强缓存失效 ↓ 检查协商缓存</text>
<rect x="60" y="200" width="680" height="100" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="400" y="225" text-anchor="middle" font-size="15" fill="#92400e" font-weight="bold">协商缓存（强缓存失效后）</text>
<text x="400" y="250" text-anchor="middle" font-size="13" fill="#92400e">ETag / If-None-Match（优先级 3） > Last-Modified / If-Modified-Since（优先级 4）</text>
<text x="400" y="270" text-anchor="middle" font-size="12" fill="#92400e">向服务器发送验证请求 → 304（使用缓存）或 200（下载新资源）</text>
<text x="400" y="288" text-anchor="middle" font-size="12" fill="#64748b">如果都未设置 ↓ 直接请求服务器</text>
<rect x="60" y="320" width="680" height="190" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="400" y="345" text-anchor="middle" font-size="15" fill="#065f46" font-weight="bold">最佳实践组合</text>
<text x="90" y="375" text-anchor="start" font-size="13" fill="#065f46" font-weight="bold">1. 静态资源（JS/CSS/图片）：</text>
<text x="110" y="395" text-anchor="start" font-size="12" fill="#065f46" font-family="monospace">Cache-Control: max-age=31536000, immutable</text>
<text x="110" y="413" text-anchor="start" font-size="11" fill="#64748b">• 配合文件名哈希（app.abc123.js）实现长期缓存</text>
<text x="90" y="440" text-anchor="start" font-size="13" fill="#065f46" font-weight="bold">2. HTML 页面（经常更新）：</text>
<text x="110" y="460" text-anchor="start" font-size="12" fill="#065f46" font-family="monospace">Cache-Control: no-cache + ETag + Last-Modified</text>
<text x="110" y="478" text-anchor="start" font-size="11" fill="#64748b">• 每次验证，有更新才下载</text>
<text x="90" y="500" text-anchor="start" font-size="13" fill="#065f46" font-weight="bold">3. 敏感数据（用户信息）：</text>
<text x="110" y="518" text-anchor="start" font-size="12" fill="#065f46" font-family="monospace">Cache-Control: no-store, private</text>
</svg>

#### 6. 完整示例对比

| 场景 | 推荐配置 | 说明 |
|------|---------|------|
| **静态资源** | `Cache-Control: max-age=31536000`<br>`ETag: "abc123"` | 强缓存1年，配合文件哈希 |
| **HTML 页面** | `Cache-Control: no-cache`<br>`ETag: "xyz789"` | 每次验证，确保最新 |
| **API 接口** | `Cache-Control: no-store` | 不缓存，实时数据 |
| **图片资源** | `Cache-Control: max-age=86400, public`<br>`Last-Modified: ...` | CDN缓存1天 |
| **用户数据** | `Cache-Control: no-store, private` | 不缓存敏感信息 |

**关键要点**

1. **优先级顺序**：Cache-Control > Expires > ETag > Last-Modified
2. **强缓存优先**：先检查 Cache-Control/Expires，有效则不发请求
3. **协商缓存兜底**：强缓存失效后，用 ETag/Last-Modified 验证
4. **ETag 更精确**：基于内容哈希，优先级高于 Last-Modified
5. **组合使用**：同时设置多个字段以提高兼容性和灵活性
6. **实践建议**：静态资源用强缓存+哈希，动态内容用协商缓存

**记忆口诀**

```
缓存四剑客，各司其职：
强缓存双雄：Cache-Control 为王，Expires 为辅
协商缓存双杰：ETag 精准，Last-Modified 简单
优先级口诀：新优于旧，强先于协，哈希胜时间
```

### 93. 如何减少 HTTP 请求？

**核心答案**

减少 HTTP 请求的主要方法：
1. **资源合并**：合并多个文件为一个（CSS/JS合并）
2. **CSS Sprites**：合并多个小图标为一张大图
3. **内联资源**：小资源直接嵌入 HTML（Base64、内联样式）
4. **缓存利用**：使用强缓存减少重复请求
5. **懒加载**：按需加载资源（图片、组件）
6. **域名分片**：突破浏览器并发限制（HTTP/1.1）
7. **HTTP/2**：多路复用，一个连接处理多个请求

**详细说明**

#### 1. 资源合并（Bundling）

**CSS 合并**：
<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead93-1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#ef4444"/></marker><marker id="arrowhead93-2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#10b981"/></marker></defs>
<rect x="30" y="30" width="350" height="230" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="205" y="60" text-anchor="middle" font-size="15" fill="#991b1b" font-weight="bold">❌ 优化前（多个请求）</text>
<rect x="60" y="80" width="120" height="40" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="120" y="105" text-anchor="middle" font-size="12" fill="#991b1b">style.css</text>
<rect x="60" y="135" width="120" height="40" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="120" y="160" text-anchor="middle" font-size="12" fill="#991b1b">button.css</text>
<rect x="60" y="190" width="120" height="40" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="120" y="215" text-anchor="middle" font-size="12" fill="#991b1b">layout.css</text>
<line x1="190" y1="100" x2="260" y2="100" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead93-1)"/>
<text x="225" y="90" text-anchor="middle" font-size="11" fill="#991b1b">请求1</text>
<line x1="190" y1="155" x2="260" y2="155" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead93-1)"/>
<text x="225" y="145" text-anchor="middle" font-size="11" fill="#991b1b">请求2</text>
<line x1="190" y1="210" x2="260" y2="210" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead93-1)"/>
<text x="225" y="200" text-anchor="middle" font-size="11" fill="#991b1b">请求3</text>
<rect x="270" y="80" width="90" height="150" rx="3" fill="#fecaca" stroke="#ef4444" stroke-width="1.5"/>
<text x="315" y="160" text-anchor="middle" font-size="13" fill="#991b1b" font-weight="bold">服务器</text>
<rect x="420" y="30" width="350" height="230" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="595" y="60" text-anchor="middle" font-size="15" fill="#065f46" font-weight="bold">✓ 优化后（单个请求）</text>
<rect x="450" y="115" width="140" height="50" rx="3" fill="#d1fae5" stroke="#10b981" stroke-width="1.5"/>
<text x="520" y="145" text-anchor="middle" font-size="13" fill="#065f46" font-weight="bold">bundle.css</text>
<line x1="600" y1="140" x2="670" y2="140" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead93-2)"/>
<text x="635" y="130" text-anchor="middle" font-size="11" fill="#065f46">单次请求</text>
<rect x="680" y="115" width="70" height="50" rx="3" fill="#bbf7d0" stroke="#10b981" stroke-width="1.5"/>
<text x="715" y="145" text-anchor="middle" font-size="12" fill="#065f46" font-weight="bold">服务器</text>
<text x="595" y="210" text-anchor="middle" font-size="13" fill="#065f46">节省 2 个 HTTP 请求</text>
<text x="595" y="235" text-anchor="middle" font-size="12" fill="#64748b">减少建立连接的开销</text>
</svg>

**JS 合并**：
```html
<!-- 优化前：多个请求 -->
<script src="jquery.js"></script>
<script src="utils.js"></script>
<script src="app.js"></script>

<!-- 优化后：单个请求 -->
<script src="bundle.js"></script>
```

**优点**：减少请求数量，降低连接开销
**缺点**：文件变大，任何修改需重新下载整个文件

#### 2. CSS Sprites（雪碧图）

**原理**：将多个小图标合并为一张大图，通过 CSS `background-position` 定位显示

<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="30" width="350" height="150" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="205" y="55" text-anchor="middle" font-size="14" fill="#991b1b" font-weight="bold">❌ 优化前</text>
<rect x="60" y="70" width="50" height="50" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="85" y="100" text-anchor="middle" font-size="11" fill="#991b1b">icon1</text>
<rect x="130" y="70" width="50" height="50" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="155" y="100" text-anchor="middle" font-size="11" fill="#991b1b">icon2</text>
<rect x="200" y="70" width="50" height="50" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="225" y="100" text-anchor="middle" font-size="11" fill="#991b1b">icon3</text>
<rect x="270" y="70" width="50" height="50" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="295" y="100" text-anchor="middle" font-size="11" fill="#991b1b">icon4</text>
<text x="205" y="145" text-anchor="middle" font-size="12" fill="#991b1b">4 个独立图片 = 4 个请求</text>
<rect x="420" y="30" width="350" height="150" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="595" y="55" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">✓ 优化后</text>
<rect x="495" y="70" width="200" height="50" fill="#d1fae5" stroke="#10b981" stroke-width="1.5"/>
<rect x="500" y="75" width="45" height="40" fill="#bbf7d0" stroke="#10b981" stroke-width="1"/>
<rect x="550" y="75" width="45" height="40" fill="#86efac" stroke="#10b981" stroke-width="1"/>
<rect x="600" y="75" width="45" height="40" fill="#4ade80" stroke="#10b981" stroke-width="1"/>
<rect x="645" y="75" width="45" height="40" fill="#22c55e" stroke="#10b981" stroke-width="1"/>
<text x="595" y="145" text-anchor="middle" font-size="12" fill="#065f46">1 张雪碧图 = 1 个请求</text>
<text x="595" y="165" text-anchor="middle" font-size="11" fill="#64748b">通过 background-position 定位</text>
<rect x="30" y="210" width="740" height="150" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="400" y="235" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">CSS 定位示例</text>
<text x="60" y="260" text-anchor="start" font-size="12" fill="#1e40af" font-family="monospace">.icon1 { background-position: 0 0; }</text>
<text x="60" y="280" text-anchor="start" font-size="12" fill="#1e40af" font-family="monospace">.icon2 { background-position: -50px 0; }</text>
<text x="60" y="300" text-anchor="start" font-size="12" fill="#1e40af" font-family="monospace">.icon3 { background-position: -100px 0; }</text>
<text x="60" y="320" text-anchor="start" font-size="12" fill="#1e40af" font-family="monospace">.icon4 { background-position: -150px 0; }</text>
<text x="60" y="345" text-anchor="start" font-size="11" fill="#64748b">• 适用场景：小图标、UI 元素</text>
<text x="400" y="345" text-anchor="start" font-size="11" fill="#64748b">• 缺点：维护成本高，不适合大图</text>
</svg>

#### 3. 内联资源（Inline Resources）

**Base64 编码**：
```html
<!-- 小图片内联 -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..." />
```

**内联样式和脚本**：
```html
<style>
  .critical { color: red; }
</style>

<script>
  // 关键脚本
</script>
```

**适用场景**：首屏关键资源、非常小的文件（< 5KB）
**缺点**：增加 HTML 体积，无法缓存

#### 4. 利用缓存

<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="30" width="740" height="270" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
<text x="400" y="60" text-anchor="middle" font-size="15" fill="#1e293b" font-weight="bold">缓存策略减少请求</text>
<rect x="60" y="80" width="330" height="100" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="225" y="105" text-anchor="middle" font-size="14" fill="#92400e" font-weight="bold">强缓存（最有效）</text>
<text x="80" y="130" text-anchor="start" font-size="12" fill="#92400e">Cache-Control: max-age=31536000</text>
<text x="80" y="150" text-anchor="start" font-size="11" fill="#92400e">• 缓存期内 0 个请求</text>
<text x="80" y="168" text-anchor="start" font-size="11" fill="#92400e">• 适用：静态资源 + 文件哈希</text>
<rect x="410" y="80" width="330" height="100" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="575" y="105" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">协商缓存</text>
<text x="430" y="130" text-anchor="start" font-size="12" fill="#1e40af">ETag / Last-Modified</text>
<text x="430" y="150" text-anchor="start" font-size="11" fill="#1e40af">• 发送验证请求（体积小）</text>
<text x="430" y="168" text-anchor="start" font-size="11" fill="#1e40af">• 304 响应，不传输内容</text>
<rect x="60" y="200" width="680" height="80" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="400" y="225" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">最佳实践</text>
<text x="80" y="245" text-anchor="start" font-size="12" fill="#065f46">• 静态资源：<tspan font-family="monospace">app.[hash].js</tspan> + 强缓存（1年）</text>
<text x="80" y="265" text-anchor="start" font-size="12" fill="#065f46">• HTML 页面：协商缓存（ETag）确保最新</text>
</svg>

#### 5. 懒加载（Lazy Loading）

**图片懒加载**：
```html
<!-- 使用 loading 属性 -->
<img src="image.jpg" loading="lazy" alt="懒加载图片" />

<!-- 或使用 Intersection Observer -->
<img data-src="image.jpg" class="lazy" alt="图片" />
```

**组件懒加载**（React）：
```javascript
const LazyComponent = React.lazy(() => import('./Component'));
```

**路由懒加载**（Vue）：
```javascript
const UserProfile = () => import('./UserProfile.vue')
```

**优点**：首屏加载快，减少初始请求数

#### 6. HTTP/2 多路复用

**HTTP/1.1 vs HTTP/2**：

<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead93-3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#ef4444"/></marker><marker id="arrowhead93-4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#10b981"/></marker></defs>
<rect x="30" y="30" width="350" height="150" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="205" y="55" text-anchor="middle" font-size="14" fill="#991b1b" font-weight="bold">HTTP/1.1（多个连接）</text>
<line x1="80" y1="80" x2="330" y2="80" stroke="#ef4444" stroke-width="3"/>
<text x="205" y="75" text-anchor="middle" font-size="11" fill="#991b1b">连接1：index.html</text>
<line x1="80" y1="105" x2="330" y2="105" stroke="#ef4444" stroke-width="3"/>
<text x="205" y="100" text-anchor="middle" font-size="11" fill="#991b1b">连接2：style.css</text>
<line x1="80" y1="130" x2="330" y2="130" stroke="#ef4444" stroke-width="3"/>
<text x="205" y="125" text-anchor="middle" font-size="11" fill="#991b1b">连接3：app.js</text>
<line x1="80" y1="155" x2="330" y2="155" stroke="#ef4444" stroke-width="3"/>
<text x="205" y="150" text-anchor="middle" font-size="11" fill="#991b1b">连接4：image.jpg</text>
<text x="205" y="175" text-anchor="middle" font-size="11" fill="#64748b">每个连接单独建立、单独传输</text>
<rect x="420" y="30" width="350" height="150" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="595" y="55" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">HTTP/2（单个连接）</text>
<line x1="470" y1="90" x2="720" y2="90" stroke="#10b981" stroke-width="8"/>
<rect x="480" y="75" width="50" height="12" fill="#bbf7d0"/>
<text x="505" y="85" text-anchor="middle" font-size="9" fill="#065f46">HTML</text>
<rect x="540" y="75" width="50" height="12" fill="#86efac"/>
<text x="565" y="85" text-anchor="middle" font-size="9" fill="#065f46">CSS</text>
<rect x="600" y="75" width="50" height="12" fill="#4ade80"/>
<text x="625" y="85" text-anchor="middle" font-size="9" fill="#065f46">JS</text>
<rect x="660" y="75" width="50" height="12" fill="#22c55e"/>
<text x="685" y="85" text-anchor="middle" font-size="9" fill="#065f46">IMG</text>
<text x="595" y="120" text-anchor="middle" font-size="12" fill="#065f46" font-weight="bold">多路复用（Multiplexing）</text>
<text x="595" y="140" text-anchor="middle" font-size="11" fill="#065f46">• 单个 TCP 连接</text>
<text x="595" y="158" text-anchor="middle" font-size="11" fill="#065f46">• 并行传输多个资源</text>
<text x="595" y="175" text-anchor="middle" font-size="11" fill="#64748b">• 无需域名分片</text>
<rect x="30" y="210" width="740" height="150" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="400" y="240" text-anchor="middle" font-size="15" fill="#1e40af" font-weight="bold">HTTP/2 优势</text>
<text x="60" y="270" text-anchor="start" font-size="13" fill="#1e40af">✓ 多路复用：一个连接传输所有资源</text>
<text x="60" y="295" text-anchor="start" font-size="13" fill="#1e40af">✓ 头部压缩：减少请求头体积（HPACK）</text>
<text x="60" y="320" text-anchor="start" font-size="13" fill="#1e40af">✓ 服务器推送：主动推送资源</text>
<text x="60" y="345" text-anchor="start" font-size="12" fill="#64748b">注意：HTTP/2 下不再需要资源合并和域名分片</text>
</svg>

#### 7. 其他优化方法

**使用 CDN**：
- 减少源站请求
- 就近访问，加快速度
- 利用 CDN 缓存

**预加载/预连接**：
```html
<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="//example.com">

<!-- 预连接 -->
<link rel="preconnect" href="//example.com">

<!-- 预加载 -->
<link rel="preload" href="style.css" as="style">
```

**Service Worker**：
- 离线缓存
- 拦截网络请求
- 智能缓存策略

#### 8. 减少请求综合策略

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="740" height="460" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
<text x="400" y="50" text-anchor="middle" font-size="16" fill="#1e293b" font-weight="bold">减少 HTTP 请求优化策略</text>
<rect x="60" y="70" width="330" height="90" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="225" y="95" text-anchor="middle" font-size="14" fill="#92400e" font-weight="bold">1. 减少请求数量</text>
<text x="80" y="118" text-anchor="start" font-size="12" fill="#92400e">• 合并文件（CSS/JS）</text>
<text x="80" y="138" text-anchor="start" font-size="12" fill="#92400e">• CSS Sprites（小图标）</text>
<rect x="410" y="70" width="330" height="90" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="575" y="95" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">2. 避免重复请求</text>
<text x="430" y="118" text-anchor="start" font-size="12" fill="#1e40af">• 强缓存（max-age）</text>
<text x="430" y="138" text-anchor="start" font-size="12" fill="#1e40af">• 协商缓存（ETag）</text>
<rect x="60" y="175" width="330" height="90" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="225" y="200" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">3. 延迟加载</text>
<text x="80" y="223" text-anchor="start" font-size="12" fill="#065f46">• 图片懒加载</text>
<text x="80" y="243" text-anchor="start" font-size="12" fill="#065f46">• 路由/组件按需加载</text>
<rect x="410" y="175" width="330" height="90" rx="5" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/>
<text x="575" y="200" text-anchor="middle" font-size="14" fill="#5b21b6" font-weight="bold">4. 协议升级</text>
<text x="430" y="223" text-anchor="start" font-size="12" fill="#5b21b6">• HTTP/2 多路复用</text>
<text x="430" y="243" text-anchor="start" font-size="12" fill="#5b21b6">• HTTP/3（QUIC）</text>
<rect x="60" y="280" width="680" height="180" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="400" y="310" text-anchor="middle" font-size="15" fill="#065f46" font-weight="bold">实际应用场景推荐</text>
<text x="80" y="340" text-anchor="start" font-size="13" fill="#065f46" font-weight="bold">HTTP/1.1 项目：</text>
<text x="100" y="360" text-anchor="start" font-size="12" fill="#065f46">• 合并 CSS/JS → bundle.css, bundle.js</text>
<text x="100" y="378" text-anchor="start" font-size="12" fill="#065f46">• 小图标使用 CSS Sprites 或 Icon Font</text>
<text x="100" y="396" text-anchor="start" font-size="12" fill="#065f46">• 静态资源强缓存 + 文件哈希（app.[hash].js）</text>
<text x="80" y="425" text-anchor="start" font-size="13" fill="#065f46" font-weight="bold">HTTP/2 项目：</text>
<text x="100" y="445" text-anchor="start" font-size="12" fill="#065f46">• 不合并文件，利用多路复用</text>
<text x="100" y="463" text-anchor="start" font-size="12" fill="#065f46">• 细粒度缓存，修改部分文件不影响其他</text>
</svg>

**关键要点**

1. **优先级排序**：缓存 > 合并 > 懒加载 > 域名分片
2. **HTTP/1.1 策略**：合并文件、雪碧图、域名分片
3. **HTTP/2 策略**：无需合并，利用多路复用
4. **缓存最关键**：强缓存可完全避免请求
5. **懒加载必备**：按需加载非首屏资源
6. **权衡取舍**：合并减少请求但降低缓存效率

**记忆口诀**

```
减少请求有妙招，合并缓存是王道
雪碧图标显神通，懒加载资源按需要
HTTP/2 来助力，多路复用效率高
静态资源强缓存，动态内容协商好
```

### 94. 什么是域名分片？

**核心答案**

域名分片（Domain Sharding）是一种针对 HTTP/1.1 的优化技术，通过将资源分布到多个子域名，**突破浏览器对单个域名的并发连接数限制**，从而加快资源加载速度。

**详细说明**

#### 1. 浏览器并发限制问题

**HTTP/1.1 的限制**：

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="740" height="360" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
<text x="400" y="50" text-anchor="middle" font-size="16" fill="#1e293b" font-weight="bold">浏览器并发连接限制</text>
<rect x="60" y="70" width="680" height="120" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="400" y="100" text-anchor="middle" font-size="14" fill="#991b1b" font-weight="bold">单域名并发限制（HTTP/1.1）</text>
<text x="80" y="130" text-anchor="start" font-size="13" fill="#991b1b">• Chrome/Edge: 6 个并发连接</text>
<text x="80" y="152" text-anchor="start" font-size="13" fill="#991b1b">• Firefox: 6 个并发连接</text>
<text x="80" y="174" text-anchor="start" font-size="13" fill="#991b1b">• Safari: 6 个并发连接</text>
<text x="450" y="130" text-anchor="start" font-size="13" fill="#991b1b">• IE11: 8 个并发连接</text>
<text x="450" y="152" text-anchor="start" font-size="13" fill="#991b1b">• IE10: 8 个并发连接</text>
<text x="450" y="174" text-anchor="start" font-size="13" fill="#991b1b">• 旧版浏览器: 2-4 个</text>
<rect x="60" y="210" width="680" height="150" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="400" y="240" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">问题示例：加载 20 个资源</text>
<line x1="100" y1="270" x2="250" y2="270" stroke="#2563eb" stroke-width="4"/>
<text x="175" y="265" text-anchor="middle" font-size="11" fill="#1e40af">1-6: 并发加载</text>
<line x1="100" y1="295" x2="250" y2="295" stroke="#f59e0b" stroke-width="4"/>
<text x="175" y="290" text-anchor="middle" font-size="11" fill="#f59e0b">7-12: 等待</text>
<line x1="100" y1="320" x2="250" y2="320" stroke="#ef4444" stroke-width="4"/>
<text x="175" y="315" text-anchor="middle" font-size="11" fill="#ef4444">13-18: 继续等待</text>
<line x1="100" y1="345" x2="150" y2="345" stroke="#991b1b" stroke-width="4"/>
<text x="125" y="340" text-anchor="middle" font-size="11" fill="#991b1b">19-20</text>
<text x="550" y="280" text-anchor="middle" font-size="13" fill="#1e40af">超过 6 个的资源</text>
<text x="550" y="305" text-anchor="middle" font-size="13" fill="#1e40af">必须等待前面的</text>
<text x="550" y="330" text-anchor="middle" font-size="13" fill="#1e40af">请求完成后才能加载</text>
</svg>

**并发限制原因**：
- 防止单个客户端占用过多服务器连接
- 避免网络拥塞
- 历史遗留问题（HTTP/1.0 规范建议 2 个）

#### 2. 域名分片原理

**核心思想**：将资源分散到多个子域名，每个域名都有独立的并发限制

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead94" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#2563eb"/></marker></defs>
<rect x="30" y="30" width="350" height="200" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="205" y="60" text-anchor="middle" font-size="15" fill="#991b1b" font-weight="bold">❌ 未使用域名分片</text>
<rect x="60" y="80" width="130" height="30" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="125" y="100" text-anchor="middle" font-size="12" fill="#991b1b" font-weight="bold">www.example.com</text>
<line x1="70" y1="130" x2="180" y2="130" stroke="#2563eb" stroke-width="2"/>
<line x1="70" y1="145" x2="180" y2="145" stroke="#2563eb" stroke-width="2"/>
<line x1="70" y1="160" x2="180" y2="160" stroke="#2563eb" stroke-width="2"/>
<line x1="70" y1="175" x2="180" y2="175" stroke="#2563eb" stroke-width="2"/>
<line x1="70" y1="190" x2="180" y2="190" stroke="#2563eb" stroke-width="2"/>
<line x1="70" y1="205" x2="180" y2="205" stroke="#2563eb" stroke-width="2"/>
<text x="205" y="175" text-anchor="middle" font-size="11" fill="#991b1b">← 6 个并发</text>
<text x="205" y="210" text-anchor="middle" font-size="11" fill="#ef4444">其他资源等待</text>
<rect x="420" y="30" width="350" height="450" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="595" y="60" text-anchor="middle" font-size="15" fill="#065f46" font-weight="bold">✓ 使用域名分片</text>
<rect x="450" y="80" width="130" height="30" rx="3" fill="#d1fae5" stroke="#10b981" stroke-width="1.5"/>
<text x="515" y="100" text-anchor="middle" font-size="11" fill="#065f46" font-weight="bold">cdn1.example.com</text>
<line x1="460" y1="125" x2="570" y2="125" stroke="#2563eb" stroke-width="2"/>
<line x1="460" y1="140" x2="570" y2="140" stroke="#2563eb" stroke-width="2"/>
<line x1="460" y1="155" x2="570" y2="155" stroke="#2563eb" stroke-width="2"/>
<line x1="460" y1="170" x2="570" y2="170" stroke="#2563eb" stroke-width="2"/>
<line x1="460" y1="185" x2="570" y2="185" stroke="#2563eb" stroke-width="2"/>
<line x1="460" y1="200" x2="570" y2="200" stroke="#2563eb" stroke-width="2"/>
<text x="595" y="175" text-anchor="middle" font-size="10" fill="#065f46">← 6 个并发</text>
<rect x="450" y="220" width="130" height="30" rx="3" fill="#d1fae5" stroke="#10b981" stroke-width="1.5"/>
<text x="515" y="240" text-anchor="middle" font-size="11" fill="#065f46" font-weight="bold">cdn2.example.com</text>
<line x1="460" y1="265" x2="570" y2="265" stroke="#8b5cf6" stroke-width="2"/>
<line x1="460" y1="280" x2="570" y2="280" stroke="#8b5cf6" stroke-width="2"/>
<line x1="460" y1="295" x2="570" y2="295" stroke="#8b5cf6" stroke-width="2"/>
<line x1="460" y1="310" x2="570" y2="310" stroke="#8b5cf6" stroke-width="2"/>
<line x1="460" y1="325" x2="570" y2="325" stroke="#8b5cf6" stroke-width="2"/>
<line x1="460" y1="340" x2="570" y2="340" stroke="#8b5cf6" stroke-width="2"/>
<text x="595" y="315" text-anchor="middle" font-size="10" fill="#065f46">← 6 个并发</text>
<rect x="450" y="360" width="130" height="30" rx="3" fill="#d1fae5" stroke="#10b981" stroke-width="1.5"/>
<text x="515" y="380" text-anchor="middle" font-size="11" fill="#065f46" font-weight="bold">cdn3.example.com</text>
<line x1="460" y1="405" x2="570" y2="405" stroke="#f59e0b" stroke-width="2"/>
<line x1="460" y1="420" x2="570" y2="420" stroke="#f59e0b" stroke-width="2"/>
<line x1="460" y1="435" x2="570" y2="435" stroke="#f59e0b" stroke-width="2"/>
<line x1="460" y1="450" x2="570" y2="450" stroke="#f59e0b" stroke-width="2"/>
<text x="595" y="430" text-anchor="middle" font-size="10" fill="#065f46">← 4 个并发</text>
<text x="595" y="470" text-anchor="middle" font-size="12" fill="#065f46" font-weight="bold">总计：18 个并发连接</text>
</svg>

**实现方式**：
```html
<!-- 未优化 -->
<img src="https://www.example.com/img1.jpg">
<img src="https://www.example.com/img2.jpg">
<!-- ... 更多图片 ... -->

<!-- 域名分片优化 -->
<img src="https://cdn1.example.com/img1.jpg">
<img src="https://cdn2.example.com/img2.jpg">
<img src="https://cdn3.example.com/img3.jpg">
<img src="https://cdn1.example.com/img4.jpg">
```

#### 3. 域名分片的优势与劣势

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="30" width="350" height="220" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="205" y="60" text-anchor="middle" font-size="15" fill="#065f46" font-weight="bold">✓ 优势</text>
<text x="60" y="90" text-anchor="start" font-size="13" fill="#065f46" font-weight="bold">1. 提高并发数</text>
<text x="70" y="110" text-anchor="start" font-size="12" fill="#065f46">• 突破单域名限制</text>
<text x="70" y="128" text-anchor="start" font-size="12" fill="#065f46">• 2-4 个子域名最佳</text>
<text x="60" y="155" text-anchor="start" font-size="13" fill="#065f46" font-weight="bold">2. 加快页面加载</text>
<text x="70" y="175" text-anchor="start" font-size="12" fill="#065f46">• 资源并行下载</text>
<text x="70" y="193" text-anchor="start" font-size="12" fill="#065f46">• 减少等待时间</text>
<text x="60" y="220" text-anchor="start" font-size="13" fill="#065f46" font-weight="bold">3. 跨域隔离</text>
<text x="70" y="240" text-anchor="start" font-size="12" fill="#065f46">• Cookie 不随请求发送</text>
<rect x="420" y="30" width="350" height="220" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="595" y="60" text-anchor="middle" font-size="15" fill="#991b1b" font-weight="bold">❌ 劣势</text>
<text x="450" y="90" text-anchor="start" font-size="13" fill="#991b1b" font-weight="bold">1. DNS 查询开销</text>
<text x="460" y="110" text-anchor="start" font-size="12" fill="#991b1b">• 每个域名需 DNS 解析</text>
<text x="460" y="128" text-anchor="start" font-size="12" fill="#991b1b">• 增加延迟（20-120ms）</text>
<text x="450" y="155" text-anchor="start" font-size="13" fill="#991b1b" font-weight="bold">2. TCP 连接成本</text>
<text x="460" y="175" text-anchor="start" font-size="12" fill="#991b1b">• 建立多个 TCP 连接</text>
<text x="460" y="193" text-anchor="start" font-size="12" fill="#991b1b">• TLS 握手开销</text>
<text x="450" y="220" text-anchor="start" font-size="13" fill="#991b1b" font-weight="bold">3. 维护复杂度</text>
<text x="460" y="240" text-anchor="start" font-size="12" fill="#991b1b">• 配置管理困难</text>
<rect x="30" y="270" width="740" height="210" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="400" y="300" text-anchor="middle" font-size="15" fill="#92400e" font-weight="bold">⚠ 注意事项</text>
<text x="60" y="330" text-anchor="start" font-size="13" fill="#92400e" font-weight="bold">最佳实践：</text>
<text x="80" y="355" text-anchor="start" font-size="12" fill="#92400e">• 2-4 个子域名即可（过多导致 DNS 开销超过收益）</text>
<text x="80" y="375" text-anchor="start" font-size="12" fill="#92400e">• 使用 DNS 预解析：<tspan font-family="monospace">&lt;link rel="dns-prefetch" href="//cdn1.example.com"&gt;</tspan></text>
<text x="80" y="395" text-anchor="start" font-size="12" fill="#92400e">• HTTPS 环境下开销更大（需 TLS 握手）</text>
<text x="60" y="425" text-anchor="start" font-size="13" fill="#92400e" font-weight="bold">HTTP/2 下不再需要：</text>
<text x="80" y="445" text-anchor="start" font-size="12" fill="#92400e">• HTTP/2 多路复用，单个连接即可</text>
<text x="80" y="465" text-anchor="start" font-size="12" fill="#92400e">• 域名分片反而降低性能（增加连接开销）</text>
</svg>

#### 4. 实际应用示例

**前端资源分配**：
```javascript
// 动态分配域名
const cdnDomains = [
  'cdn1.example.com',
  'cdn2.example.com',
  'cdn3.example.com',
  'cdn4.example.com'
];

function getCDNUrl(filename) {
  // 根据文件名哈希选择域名
  const hash = filename.split('').reduce((a, b) => {
    return ((a << 5) - a) + b.charCodeAt(0);
  }, 0);
  const domainIndex = Math.abs(hash) % cdnDomains.length;
  return `https://${cdnDomains[domainIndex]}/${filename}`;
}

// 使用
const imageUrl = getCDNUrl('image1.jpg');
// 结果：https://cdn2.example.com/image1.jpg
```

**Nginx 配置示例**：
```nginx
# 配置多个子域名指向同一服务器
server {
    listen 80;
    server_name cdn1.example.com cdn2.example.com cdn3.example.com;

    root /var/www/static;

    # 允许跨域
    add_header Access-Control-Allow-Origin *;
}
```

#### 5. 域名分片的演进

<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="740" height="380" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
<text x="400" y="50" text-anchor="middle" font-size="16" fill="#1e293b" font-weight="bold">域名分片技术演进</text>
<rect x="60" y="80" width="200" height="120" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="160" y="105" text-anchor="middle" font-size="14" fill="#991b1b" font-weight="bold">HTTP/1.0</text>
<text x="160" y="130" text-anchor="middle" font-size="12" fill="#991b1b">• 每请求一个连接</text>
<text x="160" y="150" text-anchor="middle" font-size="12" fill="#991b1b">• 串行加载</text>
<text x="160" y="170" text-anchor="middle" font-size="12" fill="#991b1b">• 非常慢</text>
<text x="160" y="190" text-anchor="middle" font-size="11" fill="#ef4444" font-weight="bold">域名分片无用</text>
<rect x="290" y="80" width="220" height="120" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="400" y="105" text-anchor="middle" font-size="14" fill="#92400e" font-weight="bold">HTTP/1.1</text>
<text x="400" y="130" text-anchor="middle" font-size="12" fill="#92400e">• Keep-Alive（持久连接）</text>
<text x="400" y="150" text-anchor="middle" font-size="12" fill="#92400e">• 6 个并发限制</text>
<text x="400" y="170" text-anchor="middle" font-size="12" fill="#92400e">• 管道化支持</text>
<text x="400" y="190" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">域名分片有效 ✓</text>
<rect x="540" y="80" width="200" height="120" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="640" y="105" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">HTTP/2</text>
<text x="640" y="130" text-anchor="middle" font-size="12" fill="#065f46">• 多路复用</text>
<text x="640" y="150" text-anchor="middle" font-size="12" fill="#065f46">• 单连接并行</text>
<text x="640" y="170" text-anchor="middle" font-size="12" fill="#065f46">• 头部压缩</text>
<text x="640" y="190" text-anchor="middle" font-size="11" fill="#10b981" font-weight="bold">域名分片反效果 ✗</text>
<rect x="60" y="230" width="680" height="150" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="400" y="260" text-anchor="middle" font-size="15" fill="#1e40af" font-weight="bold">现代最佳实践</text>
<text x="80" y="290" text-anchor="start" font-size="13" fill="#1e40af" font-weight="bold">HTTP/1.1 环境：</text>
<text x="100" y="310" text-anchor="start" font-size="12" fill="#1e40af">• 使用 2-4 个子域名（cdn1, cdn2, cdn3, cdn4）</text>
<text x="100" y="328" text-anchor="start" font-size="12" fill="#1e40af">• 配合 DNS 预解析减少延迟</text>
<text x="80" y="355" text-anchor="start" font-size="13" fill="#1e40af" font-weight="bold">HTTP/2 环境：</text>
<text x="100" y="375" text-anchor="start" font-size="12" fill="#1e40af">• 不使用域名分片（反而降低性能）</text>
<text x="100" y="393" text-anchor="start" font-size="12" fill="#1e40af">• 利用多路复用，单域名即可</text>
</svg>

#### 6. 何时使用域名分片

**适合使用**：
- HTTP/1.1 协议
- 大量小文件（图片、CSS、JS）
- 移动端弱网环境
- 需要跨域隔离 Cookie

**不适合使用**：
- HTTP/2 协议（多路复用）
- 文件数量少（DNS 开销大于收益）
- HTTPS 环境下（TLS 握手成本高）
- 现代前端框架（已有构建优化）

**关键要点**

1. **核心原理**：突破浏览器单域名 6 个并发连接限制
2. **最佳数量**：2-4 个子域名（过多导致 DNS 开销）
3. **HTTP/1.1 有效**：显著提升并发加载速度
4. **HTTP/2 无用**：多路复用已解决问题，反而增加开销
5. **权衡取舍**：DNS 查询 vs 并发提升
6. **配合优化**：DNS 预解析、预连接

**记忆口诀**

```
域名分片破限制，HTTP/1.1 显神奇
二到四个最合适，过多反而增延迟
DNS 解析有开销，预解析来帮助你
HTTP/2 不需要，多路复用已搞定
```

**核心答案**

常见的 DNS 记录类型包括：A/AAAA（域名到 IP 地址映射）、CNAME（别名）、MX（邮件服务器）、NS（域名服务器）、TXT（文本记录）、PTR（反向解析）、SOA（授权起始）等。每种记录类型服务于不同的用途。

**详细说明**

1. **A 记录（Address Record）**
   - 将域名映射到 IPv4 地址
   - 最常用的记录类型
   - 示例：`www.example.com → 192.168.1.1`

2. **AAAA 记录（IPv6 Address Record）**
   - 将域名映射到 IPv6 地址
   - IPv6 的对应版本
   - 示例：`www.example.com → 2001:0db8:85a3::8a2e:0370:7334`

3. **CNAME 记录（Canonical Name）**
   - 创建域名别名
   - 将一个域名指向另一个域名
   - 示例：`blog.example.com → www.example.com`
   - 注意：CNAME 不能与其他记录类型共存

4. **MX 记录（Mail Exchange）**
   - 指定邮件服务器
   - 包含优先级设置（数值越小优先级越高）
   - 示例：`example.com → mail.example.com (优先级 10)`

5. **NS 记录（Name Server）**
   - 指定域名的权威 DNS 服务器
   - 用于域名委派
   - 示例：`example.com → ns1.nameserver.com`

6. **TXT 记录（Text Record）**
   - 存储任意文本信息
   - 常用于验证域名所有权
   - SPF、DKIM、DMARC 等邮件验证
   - 示例：`v=spf1 include:_spf.google.com ~all`

7. **PTR 记录（Pointer Record）**
   - 反向 DNS 查询
   - 从 IP 地址查询域名
   - 主要用于邮件服务器验证
   - 示例：`1.1.168.192.in-addr.arpa → www.example.com`

8. **SOA 记录（Start of Authority）**
   - 定义域名的管理信息
   - 包含主 DNS 服务器、管理员邮箱、序列号、刷新时间等
   - 每个区域文件必须有且仅有一个 SOA 记录

9. **SRV 记录（Service Record）**
   - 定义服务的位置
   - 指定服务的主机名和端口号
   - 常用于 VoIP、即时通讯等服务
   - 格式：`_service._proto.name TTL class SRV priority weight port target`

10. **CAA 记录（Certification Authority Authorization）**
    - 指定允许为域名颁发证书的 CA
    - 提高域名安全性
    - 防止证书误发

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="500" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="5"/>
<text x="400" y="80" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">DNS 记录类型总览</text>
<g transform="translate(100, 120)">
<rect x="0" y="0" width="180" height="80" fill="#e7f3ff" stroke="#2196F3" stroke-width="2" rx="5"/>
<text x="90" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976D2">A / AAAA</text>
<text x="90" y="45" text-anchor="middle" font-size="12" fill="#424242">域名 → IP</text>
<text x="90" y="65" text-anchor="middle" font-size="11" fill="#666">最常用</text>
</g>
<g transform="translate(320, 120)">
<rect x="0" y="0" width="180" height="80" fill="#fff3e0" stroke="#FF9800" stroke-width="2" rx="5"/>
<text x="90" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#F57C00">CNAME</text>
<text x="90" y="45" text-anchor="middle" font-size="12" fill="#424242">域名别名</text>
<text x="90" y="65" text-anchor="middle" font-size="11" fill="#666">域名 → 域名</text>
</g>
<g transform="translate(540, 120)">
<rect x="0" y="0" width="180" height="80" fill="#f3e5f5" stroke="#9C27B0" stroke-width="2" rx="5"/>
<text x="90" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#7B1FA2">MX</text>
<text x="90" y="45" text-anchor="middle" font-size="12" fill="#424242">邮件服务器</text>
<text x="90" y="65" text-anchor="middle" font-size="11" fill="#666">含优先级</text>
</g>
<g transform="translate(100, 230)">
<rect x="0" y="0" width="180" height="80" fill="#e8f5e9" stroke="#4CAF50" stroke-width="2" rx="5"/>
<text x="90" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#388E3C">NS</text>
<text x="90" y="45" text-anchor="middle" font-size="12" fill="#424242">域名服务器</text>
<text x="90" y="65" text-anchor="middle" font-size="11" fill="#666">权威 DNS</text>
</g>
<g transform="translate(320, 230)">
<rect x="0" y="0" width="180" height="80" fill="#fce4ec" stroke="#E91E63" stroke-width="2" rx="5"/>
<text x="90" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#C2185B">TXT</text>
<text x="90" y="45" text-anchor="middle" font-size="12" fill="#424242">文本信息</text>
<text x="90" y="65" text-anchor="middle" font-size="11" fill="#666">验证/SPF</text>
</g>
<g transform="translate(540, 230)">
<rect x="0" y="0" width="180" height="80" fill="#e0f2f1" stroke="#009688" stroke-width="2" rx="5"/>
<text x="90" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#00796B">PTR</text>
<text x="90" y="45" text-anchor="middle" font-size="12" fill="#424242">反向解析</text>
<text x="90" y="65" text-anchor="middle" font-size="11" fill="#666">IP → 域名</text>
</g>
<g transform="translate(100, 340)">
<rect x="0" y="0" width="180" height="80" fill="#fff9c4" stroke="#FFC107" stroke-width="2" rx="5"/>
<text x="90" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#F57F17">SOA</text>
<text x="90" y="45" text-anchor="middle" font-size="12" fill="#424242">授权起始</text>
<text x="90" y="65" text-anchor="middle" font-size="11" fill="#666">管理信息</text>
</g>
<g transform="translate(320, 340)">
<rect x="0" y="0" width="180" height="80" fill="#e1f5fe" stroke="#03A9F4" stroke-width="2" rx="5"/>
<text x="90" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#0277BD">SRV</text>
<text x="90" y="45" text-anchor="middle" font-size="12" fill="#424242">服务记录</text>
<text x="90" y="65" text-anchor="middle" font-size="11" fill="#666">主机+端口</text>
</g>
<g transform="translate(540, 340)">
<rect x="0" y="0" width="180" height="80" fill="#ffebee" stroke="#F44336" stroke-width="2" rx="5"/>
<text x="90" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#D32F2F">CAA</text>
<text x="90" y="45" text-anchor="middle" font-size="12" fill="#424242">证书授权</text>
<text x="90" y="65" text-anchor="middle" font-size="11" fill="#666">指定 CA</text>
</g>
</svg>

**实际应用示例**

```
; 区域文件示例
example.com.           IN  SOA   ns1.example.com. admin.example.com. (
                                 2024010101 ; 序列号
                                 3600       ; 刷新时间
                                 1800       ; 重试时间
                                 604800     ; 过期时间
                                 86400 )    ; 最小 TTL

; 域名服务器
example.com.           IN  NS    ns1.example.com.
example.com.           IN  NS    ns2.example.com.

; A 记录
www.example.com.       IN  A     192.168.1.1
ns1.example.com.       IN  A     192.168.1.10
ns2.example.com.       IN  A     192.168.1.11

; AAAA 记录
www.example.com.       IN  AAAA  2001:db8::1

; CNAME 记录
blog.example.com.      IN  CNAME www.example.com.
ftp.example.com.       IN  CNAME www.example.com.

; MX 记录
example.com.           IN  MX    10 mail1.example.com.
example.com.           IN  MX    20 mail2.example.com.

; TXT 记录
example.com.           IN  TXT   "v=spf1 include:_spf.example.com ~all"
_dmarc.example.com.    IN  TXT   "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com"

; PTR 记录（反向区域）
1.1.168.192.in-addr.arpa. IN PTR www.example.com.

; SRV 记录
_sip._tcp.example.com. IN  SRV   10 60 5060 sipserver.example.com.

; CAA 记录
example.com.           IN  CAA   0 issue "letsencrypt.org"
```

**关键要点**

1. **记录选择**
   - A/AAAA：基本的域名解析
   - CNAME：简化多域名管理
   - MX：邮件服务配置
   - TXT：验证和安全策略

2. **使用注意**
   - CNAME 不能与其他记录共存于同一名称
   - 根域名（@）不能使用 CNAME
   - MX 记录必须指向 A 记录，不能指向 CNAME
   - PTR 记录需要 IP 地址所有者配置

3. **安全相关**
   - TXT 记录用于 SPF、DKIM、DMARC 邮件验证
   - CAA 记录防止证书误发
   - DNSSEC 提供额外的安全保护

4. **性能优化**
   - 合理设置 TTL 值
   - 使用 CDN 时配置 CNAME
   - 多个 MX 记录实现负载均衡和容错

**记忆口诀**

**"A加地址，C作别名"** - A 记录指向 IP，CNAME 作别名

**"MX 送信，NS 管域"** - MX 处理邮件，NS 管理域名

**"TXT 验证，PTR 反查"** - TXT 用于验证，PTR 反向查询

**"SOA 做主，SRV 服务"** - SOA 授权管理，SRV 定位服务

### 95. 什么是资源合并和压缩？

**核心答案**

资源合并和压缩是前端性能优化的两大核心技术：
- **资源合并（Bundling）**：将多个小文件合并为一个大文件，减少 HTTP 请求数量
- **资源压缩（Compression）**：减小文件体积，加快传输速度，包括代码压缩（Minify）和传输压缩（Gzip/Brotli）

**详细说明**

#### 1. 资源合并（Bundling）

**原理**：将多个 CSS/JS 文件合并为单个文件

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead95" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#2563eb"/></marker></defs>
<rect x="30" y="30" width="300" height="280" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="180" y="60" text-anchor="middle" font-size="15" fill="#991b1b" font-weight="bold">❌ 合并前</text>
<rect x="60" y="80" width="100" height="40" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="110" y="105" text-anchor="middle" font-size="12" fill="#991b1b">utils.js (5KB)</text>
<rect x="60" y="135" width="100" height="40" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="110" y="160" text-anchor="middle" font-size="12" fill="#991b1b">main.js (8KB)</text>
<rect x="60" y="190" width="100" height="40" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="110" y="215" text-anchor="middle" font-size="12" fill="#991b1b">api.js (6KB)</text>
<rect x="60" y="245" width="100" height="40" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
<text x="110" y="270" text-anchor="middle" font-size="12" fill="#991b1b">ui.js (4KB)</text>
<text x="180" y="300" text-anchor="middle" font-size="12" fill="#991b1b" font-weight="bold">4 个文件，23KB</text>
<line x1="330" y1="175" x2="470" y2="175" stroke="#2563eb" stroke-width="3" marker-end="url(#arrowhead95)"/>
<text x="400" y="165" text-anchor="middle" font-size="13" fill="#2563eb" font-weight="bold">合并</text>
<rect x="470" y="30" width="300" height="280" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="620" y="60" text-anchor="middle" font-size="15" fill="#065f46" font-weight="bold">✓ 合并后</text>
<rect x="520" y="130" width="200" height="80" rx="3" fill="#bbf7d0" stroke="#10b981" stroke-width="2"/>
<text x="620" y="160" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">bundle.js</text>
<text x="620" y="180" text-anchor="middle" font-size="12" fill="#065f46">(23KB)</text>
<text x="620" y="200" text-anchor="middle" font-size="11" fill="#065f46">utils + main + api + ui</text>
<text x="620" y="240" text-anchor="middle" font-size="12" fill="#065f46" font-weight="bold">1 个文件</text>
<text x="620" y="265" text-anchor="middle" font-size="11" fill="#10b981">✓ 减少 3 个 HTTP 请求</text>
<text x="620" y="285" text-anchor="middle" font-size="11" fill="#10b981">✓ 减少连接开销</text>
<text x="620" y="305" text-anchor="middle" font-size="11" fill="#10b981">✓ 加快页面加载</text>
</svg>

**工具**：
- Webpack
- Rollup
- Parcel
- Vite（开发环境不合并，生产环境合并）

**优缺点**：

| 优点 | 缺点 |
|------|------|
| 减少 HTTP 请求 | 文件变大，首次加载慢 |
| 降低连接开销 | 任何修改需重新下载 |
| 利于缓存 | 缓存粒度粗 |

#### 2. 代码压缩（Minification）

**原理**：删除代码中的空格、注释、换行，缩短变量名

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="30" width="350" height="380" rx="5" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
<text x="205" y="60" text-anchor="middle" font-size="15" fill="#1e40af" font-weight="bold">压缩前（可读）</text>
<rect x="50" y="80" width="310" height="300" rx="3" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
<text x="60" y="105" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">// 计算两数之和</text>
<text x="60" y="125" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">function calculateSum(a, b) {</text>
<text x="60" y="145" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">  const result = a + b;</text>
<text x="60" y="165" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">  return result;</text>
<text x="60" y="185" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">}</text>
<text x="60" y="205" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace"></text>
<text x="60" y="225" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">const number1 = 10;</text>
<text x="60" y="245" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">const number2 = 20;</text>
<text x="60" y="265" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">const total = calculateSum(</text>
<text x="60" y="285" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">  number1,</text>
<text x="60" y="305" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">  number2</text>
<text x="60" y="325" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">);</text>
<text x="60" y="345" text-anchor="start" font-size="11" fill="#1e40af" font-family="monospace">console.log(total);</text>
<text x="205" y="400" text-anchor="middle" font-size="12" fill="#1e40af" font-weight="bold">大小：~250 字节</text>
<rect x="420" y="30" width="350" height="380" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="595" y="60" text-anchor="middle" font-size="15" fill="#065f46" font-weight="bold">压缩后（不可读）</text>
<rect x="440" y="80" width="310" height="180" rx="3" fill="#d1fae5" stroke="#10b981" stroke-width="1.5"/>
<text x="450" y="105" text-anchor="start" font-size="11" fill="#065f46" font-family="monospace">function c(a,b){return a+b}</text>
<text x="450" y="125" text-anchor="start" font-size="11" fill="#065f46" font-family="monospace">const n1=10,n2=20,t=c(n1,</text>
<text x="450" y="145" text-anchor="start" font-size="11" fill="#065f46" font-family="monospace">n2);console.log(t);</text>
<text x="595" y="200" text-anchor="middle" font-size="12" fill="#065f46" font-weight="bold">大小：~80 字节</text>
<text x="595" y="230" text-anchor="middle" font-size="13" fill="#10b981" font-weight="bold">✓ 减少 68% 体积</text>
<text x="595" y="260" text-anchor="middle" font-size="12" fill="#065f46">优化内容：</text>
<text x="450" y="285" text-anchor="start" font-size="11" fill="#065f46">• 删除注释</text>
<text x="450" y="305" text-anchor="start" font-size="11" fill="#065f46">• 删除空格和换行</text>
<text x="450" y="325" text-anchor="start" font-size="11" fill="#065f46">• 缩短变量名</text>
<text x="450" y="345" text-anchor="start" font-size="11" fill="#065f46">• 简化表达式</text>
<text x="450" y="365" text-anchor="start" font-size="11" fill="#065f46">• 删除无用代码</text>
</svg>

**工具**：
- **JavaScript**: UglifyJS, Terser, esbuild
- **CSS**: CSSNano, clean-css
- **HTML**: HTMLMinifier

**压缩示例**：
```javascript
// 压缩前
function getUserInfo(userId) {
  const user = database.findUser(userId);
  return user;
}

// 压缩后
function a(b){return c.d(b)}
```

#### 3. 传输压缩（Gzip/Brotli）

**原理**：在服务器端压缩响应内容，浏览器解压后使用

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead95-2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#2563eb"/></marker></defs>
<rect x="50" y="50" width="140" height="80" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="120" y="75" text-anchor="middle" font-size="13" fill="#1e40af" font-weight="bold">浏览器</text>
<text x="120" y="95" text-anchor="middle" font-size="11" fill="#1e40af">请求资源</text>
<text x="120" y="113" text-anchor="start" font-size="10" fill="#64748b">Accept-Encoding:</text>
<text x="120" y="126" text-anchor="start" font-size="10" fill="#64748b">gzip, br</text>
<rect x="610" y="50" width="140" height="80" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="680" y="75" text-anchor="middle" font-size="13" fill="#065f46" font-weight="bold">服务器</text>
<text x="680" y="95" text-anchor="middle" font-size="11" fill="#065f46">返回压缩资源</text>
<text x="640" y="113" text-anchor="start" font-size="10" fill="#64748b">Content-Encoding:</text>
<text x="640" y="126" text-anchor="start" font-size="10" fill="#64748b">gzip</text>
<line x1="190" y1="90" x2="600" y2="90" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead95-2)"/>
<text x="395" y="80" text-anchor="middle" font-size="12" fill="#1e40af">1. 请求 + 支持编码</text>
<line x1="600" y1="120" x2="200" y2="120" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead95-2)"/>
<text x="395" y="140" text-anchor="middle" font-size="12" fill="#10b981">2. 压缩响应</text>
<rect x="50" y="160" width="700" height="260" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
<text x="400" y="190" text-anchor="middle" font-size="15" fill="#1e293b" font-weight="bold">压缩效果对比</text>
<rect x="80" y="210" width="180" height="80" rx="3" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="170" y="235" text-anchor="middle" font-size="13" fill="#92400e" font-weight="bold">原始文件</text>
<text x="170" y="255" text-anchor="middle" font-size="12" fill="#92400e">app.js</text>
<text x="170" y="275" text-anchor="middle" font-size="14" fill="#92400e" font-weight="bold">500 KB</text>
<rect x="310" y="210" width="180" height="80" rx="3" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="400" y="235" text-anchor="middle" font-size="13" fill="#1e40af" font-weight="bold">Gzip 压缩</text>
<text x="400" y="255" text-anchor="middle" font-size="12" fill="#1e40af">app.js.gz</text>
<text x="400" y="275" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">150 KB (-70%)</text>
<rect x="540" y="210" width="180" height="80" rx="3" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="630" y="235" text-anchor="middle" font-size="13" fill="#065f46" font-weight="bold">Brotli 压缩</text>
<text x="630" y="255" text-anchor="middle" font-size="12" fill="#065f46">app.js.br</text>
<text x="630" y="275" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">120 KB (-76%)</text>
<text x="400" y="320" text-anchor="middle" font-size="14" fill="#1e293b" font-weight="bold">不同文件类型压缩率</text>
<text x="100" y="345" text-anchor="start" font-size="12" fill="#1e293b">• HTML/CSS/JS: 70-80%</text>
<text x="100" y="365" text-anchor="start" font-size="12" fill="#1e293b">• JSON/XML: 80-90%</text>
<text x="100" y="385" text-anchor="start" font-size="12" fill="#1e293b">• 文本文件: 60-80%</text>
<text x="450" y="345" text-anchor="start" font-size="12" fill="#64748b">• 图片/视频: 不适合（已压缩）</text>
<text x="450" y="365" text-anchor="start" font-size="12" fill="#64748b">• ZIP/PDF: 不适合（已压缩）</text>
<text x="450" y="385" text-anchor="start" font-size="12" fill="#64748b">• 二进制文件: 效果差</text>
</svg>

**Gzip vs Brotli 对比**：

| 特性 | Gzip | Brotli |
|------|------|--------|
| **压缩率** | 70-80% | 76-85% |
| **压缩速度** | 快 | 较慢 |
| **浏览器支持** | 全部支持 | 现代浏览器 |
| **适用场景** | 通用 | 静态资源 |
| **推荐等级** | 通用 | 优先（静态） |

**Nginx 配置示例**：
```nginx
# 启用 Gzip
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml;
gzip_min_length 1000;
gzip_comp_level 6;

# 启用 Brotli（需安装模块）
brotli on;
brotli_types text/plain text/css application/json application/javascript;
brotli_comp_level 6;
```

#### 4. 图片压缩

**格式选择**：

<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="740" height="340" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
<text x="400" y="50" text-anchor="middle" font-size="16" fill="#1e293b" font-weight="bold">图片格式与压缩策略</text>
<rect x="60" y="70" width="160" height="120" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="140" y="95" text-anchor="middle" font-size="14" fill="#92400e" font-weight="bold">JPEG/JPG</text>
<text x="75" y="120" text-anchor="start" font-size="11" fill="#92400e">• 有损压缩</text>
<text x="75" y="138" text-anchor="start" font-size="11" fill="#92400e">• 适合照片</text>
<text x="75" y="156" text-anchor="start" font-size="11" fill="#92400e">• 不支持透明</text>
<text x="75" y="174" text-anchor="start" font-size="11" fill="#10b981">✓ 压缩率高</text>
<rect x="240" y="70" width="160" height="120" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="320" y="95" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">PNG</text>
<text x="255" y="120" text-anchor="start" font-size="11" fill="#1e40af">• 无损压缩</text>
<text x="255" y="138" text-anchor="start" font-size="11" fill="#1e40af">• 支持透明</text>
<text x="255" y="156" text-anchor="start" font-size="11" fill="#1e40af">• 适合图标</text>
<text x="255" y="174" text-anchor="start" font-size="11" fill="#ef4444">✗ 体积较大</text>
<rect x="420" y="70" width="160" height="120" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="500" y="95" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">WebP</text>
<text x="435" y="120" text-anchor="start" font-size="11" fill="#065f46">• 有损+无损</text>
<text x="435" y="138" text-anchor="start" font-size="11" fill="#065f46">• 支持透明</text>
<text x="435" y="156" text-anchor="start" font-size="11" fill="#065f46">• 体积小 30%</text>
<text x="435" y="174" text-anchor="start" font-size="11" fill="#10b981">✓ 推荐使用</text>
<rect x="600" y="70" width="140" height="120" rx="5" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/>
<text x="670" y="95" text-anchor="middle" font-size="14" fill="#5b21b6" font-weight="bold">AVIF</text>
<text x="615" y="120" text-anchor="start" font-size="11" fill="#5b21b6">• 最新格式</text>
<text x="615" y="138" text-anchor="start" font-size="11" fill="#5b21b6">• 压缩率最高</text>
<text x="615" y="156" text-anchor="start" font-size="11" fill="#5b21b6">• 支持有限</text>
<text x="615" y="174" text-anchor="start" font-size="11" fill="#f59e0b">⚠ 兼容性</text>
<rect x="60" y="210" width="680" height="130" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
<text x="400" y="240" text-anchor="middle" font-size="15" fill="#065f46" font-weight="bold">图片压缩最佳实践</text>
<text x="80" y="265" text-anchor="start" font-size="12" fill="#065f46">1. <tspan font-weight="bold">格式选择</tspan>：WebP > JPEG/PNG（渐进式降级）</text>
<text x="80" y="285" text-anchor="start" font-size="12" fill="#065f46">2. <tspan font-weight="bold">工具压缩</tspan>：ImageOptim, TinyPNG, Squoosh</text>
<text x="80" y="305" text-anchor="start" font-size="12" fill="#065f46">3. <tspan font-weight="bold">懒加载</tspan>：首屏外图片延迟加载</text>
<text x="80" y="325" text-anchor="start" font-size="12" fill="#065f46">4. <tspan font-weight="bold">响应式</tspan>：根据设备尺寸提供不同分辨率（srcset）</text>
</svg>

#### 5. 完整优化流程

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="740" height="460" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
<text x="400" y="50" text-anchor="middle" font-size="16" fill="#1e293b" font-weight="bold">资源合并与压缩完整流程</text>
<rect x="60" y="80" width="680" height="60" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="400" y="105" text-anchor="middle" font-size="14" fill="#92400e" font-weight="bold">1. 开发阶段</text>
<text x="80" y="125" text-anchor="start" font-size="12" fill="#92400e">• 模块化开发（ES6 模块、组件化）</text>
<rect x="60" y="160" width="680" height="60" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
<text x="400" y="185" text-anchor="middle" font-size="14" fill="#1e40af" font-weight="bold">2. 构建阶段（Webpack/Vite）</text>
<text x="80" y="205" text-anchor="start" font-size="12" fill="#1e40af">• 合并文件、Tree Shaking、代码分割、Minify</text>
<rect x="60" y="240" width="680" height="60" rx="5" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/>
<text x="400" y="265" text-anchor="middle" font-size="14" fill="#5b21b6" font-weight="bold">3. 服务器配置</text>
<text x="80" y="285" text-anchor="start" font-size="12" fill="#5b21b6">• 启用 Gzip/Brotli、设置缓存头、CDN 分发</text>
<rect x="60" y="320" width="680" height="60" rx="5" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
<text x="400" y="345" text-anchor="middle" font-size="14" fill="#065f46" font-weight="bold">4. 浏览器加载</text>
<text x="80" y="365" text-anchor="start" font-size="12" fill="#065f46">• 解压、解析、执行（利用缓存避免重复）</text>
<rect x="60" y="400" width="680" height="60" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
<text x="400" y="425" text-anchor="middle" font-size="14" fill="#991b1b" font-weight="bold">性能监控</text>
<text x="80" y="445" text-anchor="start" font-size="12" fill="#991b1b">• Lighthouse、WebPageTest、持续优化</text>
</svg>

**Webpack 配置示例**：
```javascript
// webpack.config.js
module.exports = {
  mode: 'production', // 自动启用压缩
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 删除 console
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all', // 代码分割
    },
  },
};
```

**关键要点**

1. **资源合并**：减少 HTTP 请求，但降低缓存粒度
2. **代码压缩**：Minify 减少 30-50% 体积
3. **传输压缩**：Gzip/Brotli 减少 70-85% 传输体积
4. **图片优化**：使用 WebP，工具压缩，懒加载
5. **权衡取舍**：HTTP/2 环境下不一定需要合并
6. **完整流程**：构建时合并压缩 + 服务器传输压缩

**记忆口诀**

```
合并压缩双管齐下，优化性能效果佳
合并文件减请求，代码压缩体积小
Gzip Brotli 传输快，图片 WebP 显神效
HTTP/1.1 合并好，HTTP/2 分开妙
构建压缩加传输，三管齐下最高效
```
