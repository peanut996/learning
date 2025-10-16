## 其他问题

### 96. 在浏览器中输入 URL 后发生了什么?

**核心答案**

从输入 URL 到页面展示,主要经历以下步骤:①**URL 解析** → ②**DNS 解析**(域名转 IP) → ③**建立 TCP 连接**(三次握手) → ④**发送 HTTP 请求** → ⑤**服务器处理并返回响应** → ⑥**浏览器解析渲染**(HTML/CSS/JS) → ⑦**关闭连接**(四次挥手)。整个过程涉及网络七层模型的多个层次,是前端面试的经典问题。

**详细说明**

1. **完整流程图**

<svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-url" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#2196F3"/></marker></defs>
<rect x="20" y="20" width="760" height="860" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">从输入 URL 到页面展示</text>
<rect x="50" y="80" width="700" height="70" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="80" y="110" font-size="14" fill="#1565C0" font-weight="bold">① URL 解析</text>
<text x="80" y="132" font-size="11" fill="#666">• 解析协议 (http/https)、域名、端口、路径、参数</text>
<text x="80" y="147" font-size="10" font-family="monospace" fill="#1976D2">https://www.example.com:443/path?key=value</text>
<path d="M 400 150 L 400 170" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow-url)"/>
<rect x="50" y="170" width="700" height="90" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="80" y="200" font-size="14" fill="#2E7D32" font-weight="bold">② DNS 解析 (域名 → IP)</text>
<text x="80" y="220" font-size="11" fill="#666">• 浏览器缓存 → 系统缓存 → 路由器缓存</text>
<text x="80" y="237" font-size="11" fill="#666">• 本地 DNS 服务器 → 根 DNS → 顶级域 DNS → 权威 DNS</text>
<text x="80" y="254" font-size="10" font-family="monospace" fill="#4CAF50">www.example.com → 93.184.216.34</text>
<path d="M 400 260 L 400 280" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-url)"/>
<rect x="50" y="280" width="700" height="75" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="80" y="310" font-size="14" fill="#F57C00" font-weight="bold">③ 建立 TCP 连接 (三次握手)</text>
<text x="80" y="330" font-size="11" fill="#666">• 客户端 → SYN → 服务器</text>
<text x="80" y="345" font-size="11" fill="#666">• 服务器 → SYN + ACK → 客户端 → ACK → 服务器</text>
<path d="M 400 355 L 400 375" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow-url)"/>
<rect x="50" y="375" width="340" height="75" rx="5" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2"/>
<text x="80" y="405" font-size="14" fill="#7B1FA2" font-weight="bold">④a 如果是 HTTPS</text>
<text x="80" y="425" font-size="11" fill="#666">• SSL/TLS 握手</text>
<text x="80" y="440" font-size="11" fill="#666">• 协商加密算法和密钥</text>
<rect x="410" y="375" width="340" height="75" rx="5" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/>
<text x="440" y="405" font-size="14" fill="#F57F17" font-weight="bold">④b 如果是 HTTP</text>
<text x="440" y="425" font-size="11" fill="#666">• 直接发送请求</text>
<text x="440" y="440" font-size="11" fill="#666">• 明文传输(不安全)</text>
<path d="M 220 450 L 220 470 L 400 470 L 400 490" stroke="#9C27B0" stroke-width="2" marker-end="url(#arrow-url)"/>
<path d="M 580 450 L 580 470 L 400 470" stroke="#FBC02D" stroke-width="2" marker-end="url(#arrow-url)"/>
<rect x="50" y="490" width="700" height="90" rx="5" fill="#FFEBEE" stroke="#E53935" stroke-width="2"/>
<text x="80" y="520" font-size="14" fill="#C62828" font-weight="bold">⑤ 发送 HTTP 请求</text>
<text x="80" y="540" font-size="11" fill="#666">• 请求行: GET /index.html HTTP/1.1</text>
<text x="80" y="555" font-size="11" fill="#666">• 请求头: Host, User-Agent, Cookie, Accept...</text>
<text x="80" y="570" font-size="11" fill="#666">• 请求体: POST 数据(如有)</text>
<path d="M 400 580 L 400 600" stroke="#E53935" stroke-width="2" marker-end="url(#arrow-url)"/>
<rect x="50" y="600" width="700" height="75" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="80" y="630" font-size="14" fill="#2E7D32" font-weight="bold">⑥ 服务器处理请求并返回响应</text>
<text x="80" y="650" font-size="11" fill="#666">• 状态行: HTTP/1.1 200 OK</text>
<text x="80" y="665" font-size="11" fill="#666">• 响应头: Content-Type, Cache-Control, Set-Cookie...</text>
<path d="M 400 675 L 400 695" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-url)"/>
<rect x="50" y="695" width="700" height="120" rx="5" fill="#BBDEFB" stroke="#2196F3" stroke-width="2"/>
<text x="80" y="725" font-size="14" fill="#1565C0" font-weight="bold">⑦ 浏览器解析渲染页面</text>
<text x="80" y="745" font-size="11" fill="#666">• 解析 HTML 构建 DOM 树</text>
<text x="80" y="760" font-size="11" fill="#666">• 解析 CSS 构建 CSSOM 树</text>
<text x="80" y="775" font-size="11" fill="#666">• 合并为渲染树 (Render Tree)</text>
<text x="80" y="790" font-size="11" fill="#666">• 布局 (Layout) → 绘制 (Paint) → 合成 (Composite)</text>
<text x="80" y="805" font-size="11" fill="#666">• 执行 JavaScript (可能阻塞渲染)</text>
<path d="M 400 815 L 400 835" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow-url)"/>
<rect x="50" y="835" width="700" height="40" rx="5" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/>
<text x="400" y="860" text-anchor="middle" font-size="14" fill="#F57F17" font-weight="bold">⑧ 页面展示完成,关闭 TCP 连接 (四次挥手)</text>
</svg>

2. **① URL 解析详解**

URL 组成部分:
```
https://www.example.com:443/path/page?key=value#hash
协议    域名              端口  路径      参数      片段

• 协议: https (或 http, ftp 等)
• 域名: www.example.com
• 端口: 443 (https 默认), 80 (http 默认)
• 路径: /path/page
• 查询参数: key=value
• 片段标识: #hash (不会发送到服务器)
```

3. **② DNS 解析过程**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-dns" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#4CAF50"/></marker></defs>
<rect x="20" y="20" width="760" height="410" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">DNS 解析查询顺序</text>
<circle cx="120" cy="150" r="50" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="120" y="145" text-anchor="middle" font-size="13" font-weight="bold" fill="#1565C0">浏览器</text>
<text x="120" y="163" text-anchor="middle" font-size="11" fill="#666">缓存</text>
<rect x="220" y="120" width="120" height="60" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="280" y="145" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">系统</text>
<text x="280" y="163" text-anchor="middle" font-size="11" fill="#666">hosts/缓存</text>
<rect x="370" y="120" width="120" height="60" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="430" y="145" text-anchor="middle" font-size="13" font-weight="bold" fill="#F57C00">路由器</text>
<text x="430" y="163" text-anchor="middle" font-size="11" fill="#666">缓存</text>
<rect x="520" y="120" width="120" height="60" rx="5" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2"/>
<text x="580" y="145" text-anchor="middle" font-size="13" font-weight="bold" fill="#7B1FA2">本地DNS</text>
<text x="580" y="163" text-anchor="middle" font-size="11" fill="#666">ISP服务器</text>
<line x1="170" y1="150" x2="215" y2="150" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-dns)"/>
<text x="192" y="140" font-size="10" fill="#2E7D32" font-weight="bold">①</text>
<line x1="340" y1="150" x2="365" y2="150" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-dns)"/>
<text x="352" y="140" font-size="10" fill="#2E7D32" font-weight="bold">②</text>
<line x1="490" y1="150" x2="515" y2="150" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-dns)"/>
<text x="502" y="140" font-size="10" fill="#2E7D32" font-weight="bold">③</text>
<rect x="180" y="240" width="120" height="60" rx="5" fill="#FFEBEE" stroke="#E53935" stroke-width="2"/>
<text x="240" y="265" text-anchor="middle" font-size="13" font-weight="bold" fill="#C62828">根DNS</text>
<text x="240" y="283" text-anchor="middle" font-size="11" fill="#666">13台服务器</text>
<rect x="340" y="240" width="120" height="60" rx="5" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/>
<text x="400" y="265" text-anchor="middle" font-size="13" font-weight="bold" fill="#F57F17">顶级域DNS</text>
<text x="400" y="283" text-anchor="middle" font-size="11" fill="#666">.com .cn</text>
<rect x="500" y="240" width="120" height="60" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="560" y="265" text-anchor="middle" font-size="13" font-weight="bold" fill="#2E7D32">权威DNS</text>
<text x="560" y="283" text-anchor="middle" font-size="11" fill="#666">example.com</text>
<line x1="580" y1="180" x2="260" y2="235" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow-dns)"/>
<text x="400" y="200" font-size="10" fill="#1565C0" font-weight="bold">④ 递归查询</text>
<line x1="295" y1="270" x2="335" y2="270" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow-dns)"/>
<text x="315" y="260" font-size="10" fill="#F57C00" font-weight="bold">⑤</text>
<line x1="455" y1="270" x2="495" y2="270" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow-dns)"/>
<text x="475" y="260" font-size="10" fill="#F57C00" font-weight="bold">⑥</text>
<rect x="200" y="350" width="400" height="60" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="400" y="375" text-anchor="middle" font-size="13" fill="#1565C0" font-weight="bold">⑦ 返回 IP 地址: 93.184.216.34</text>
<text x="400" y="395" text-anchor="middle" font-size="11" fill="#666">缓存到各级 DNS 服务器,下次查询更快</text>
</svg>

**DNS 优化:**
- **DNS 预解析**: `<link rel="dns-prefetch" href="//example.com">`
- **使用 CDN**: 就近访问降低延迟
- **减少域名数量**: 减少 DNS 查询次数

4. **③ TCP 三次握手**

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-tcp" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#2196F3"/></marker></defs>
<rect x="20" y="20" width="660" height="360" rx="8" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="340" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1565C0">TCP 三次握手</text>
<rect x="80" y="100" width="120" height="60" rx="5" fill="#BBDEFB" stroke="#1976D2" stroke-width="2"/>
<text x="140" y="135" text-anchor="middle" font-size="14" font-weight="bold" fill="#0D47A1">客户端</text>
<rect x="480" y="100" width="120" height="60" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="540" y="135" text-anchor="middle" font-size="14" font-weight="bold" fill="#2E7D32">服务器</text>
<line x1="140" y1="180" x2="140" y2="320" stroke="#1976D2" stroke-width="2"/>
<line x1="540" y1="180" x2="540" y2="320" stroke="#4CAF50" stroke-width="2"/>
<line x1="140" y1="200" x2="530" y2="230" stroke="#FF5722" stroke-width="2" marker-end="url(#arrow-tcp)"/>
<text x="340" y="210" text-anchor="middle" font-size="12" fill="#D84315" font-weight="bold">① SYN=1, seq=x</text>
<text x="340" y="225" text-anchor="middle" font-size="10" fill="#666">请求建立连接</text>
<line x1="530" y1="250" x2="140" y2="280" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-tcp)"/>
<text x="340" y="260" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">② SYN=1, ACK=1</text>
<text x="340" y="275" text-anchor="middle" font-size="10" fill="#666">seq=y, ack=x+1 (确认+请求)</text>
<line x1="140" y1="300" x2="530" y2="320" stroke="#FF5722" stroke-width="2" marker-end="url(#arrow-tcp)"/>
<text x="340" y="305" text-anchor="middle" font-size="12" fill="#D84315" font-weight="bold">③ ACK=1, seq=x+1</text>
<text x="340" y="320" text-anchor="middle" font-size="10" fill="#666">ack=y+1 (确认连接)</text>
<rect x="150" y="340" width="380" height="30" rx="3" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1"/>
<text x="340" y="360" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">✓ 连接建立,可以传输数据</text>
</svg>

**为什么是三次而不是两次?**
防止已失效的连接请求报文突然又传到服务器,造成资源浪费。

5. **⑦ 浏览器渲染过程**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-render" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#2196F3"/></marker></defs>
<rect x="20" y="20" width="760" height="460" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">浏览器渲染流程</text>
<rect x="50" y="80" width="200" height="60" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="150" y="105" text-anchor="middle" font-size="13" fill="#1565C0" font-weight="bold">解析 HTML</text>
<text x="150" y="123" text-anchor="middle" font-size="11" fill="#666">构建 DOM 树</text>
<rect x="280" y="80" width="200" height="60" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="380" y="105" text-anchor="middle" font-size="13" fill="#2E7D32" font-weight="bold">解析 CSS</text>
<text x="380" y="123" text-anchor="middle" font-size="11" fill="#666">构建 CSSOM 树</text>
<line x1="150" y1="140" x2="150" y2="170" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow-render)"/>
<line x1="380" y1="140" x2="380" y2="170" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-render)"/>
<rect x="150" y="170" width="330" height="60" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="315" y="195" text-anchor="middle" font-size="13" fill="#F57C00" font-weight="bold">合并 DOM + CSSOM</text>
<text x="315" y="213" text-anchor="middle" font-size="11" fill="#666">生成渲染树 (Render Tree)</text>
<line x1="315" y1="230" x2="315" y2="260" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow-render)"/>
<rect x="200" y="260" width="230" height="60" rx="5" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2"/>
<text x="315" y="285" text-anchor="middle" font-size="13" fill="#7B1FA2" font-weight="bold">布局 (Layout)</text>
<text x="315" y="303" text-anchor="middle" font-size="11" fill="#666">计算节点位置和大小</text>
<line x1="315" y1="320" x2="315" y2="350" stroke="#9C27B0" stroke-width="2" marker-end="url(#arrow-render)"/>
<rect x="200" y="350" width="230" height="60" rx="5" fill="#FFEBEE" stroke="#E53935" stroke-width="2"/>
<text x="315" y="375" text-anchor="middle" font-size="13" fill="#C62828" font-weight="bold">绘制 (Paint)</text>
<text x="315" y="393" text-anchor="middle" font-size="11" fill="#666">绘制文本、颜色、边框等</text>
<line x1="315" y1="410" x2="315" y2="440" stroke="#E53935" stroke-width="2" marker-end="url(#arrow-render)"/>
<rect x="550" y="80" width="200" height="140" rx="5" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/>
<text x="650" y="110" text-anchor="middle" font-size="13" fill="#F57F17" font-weight="bold">JavaScript 执行</text>
<text x="650" y="135" text-anchor="middle" font-size="10" fill="#666">• 可能修改 DOM/CSS</text>
<text x="650" y="152" text-anchor="middle" font-size="10" fill="#666">• 触发重排/重绘</text>
<text x="650" y="175" text-anchor="middle" font-size="10" fill="#E65100" font-weight="bold">⚠️ 阻塞渲染:</text>
<text x="650" y="192" text-anchor="middle" font-size="9" fill="#666">&lt;script&gt; 会阻塞 DOM 解析</text>
<text x="650" y="207" text-anchor="middle" font-size="9" fill="#666">建议: defer/async 异步加载</text>
<path d="M 545 150 L 485 200" stroke="#FBC02D" stroke-width="2" stroke-dasharray="5,5"/>
<rect x="200" y="440" width="230" height="40" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="315" y="465" text-anchor="middle" font-size="13" fill="#2E7D32" font-weight="bold">✓ 页面渲染完成</text>
</svg>

**渲染优化:**
- **CSS 放 `<head>`**: 避免白屏和闪烁
- **JS 放底部或异步**: 避免阻塞 DOM 解析
- **减少重排重绘**: 批量修改 DOM,使用 transform
- **懒加载图片**: 减少初始加载时间

6. **性能优化关键指标**

| 指标 | 说明 | 优化目标 |
|------|------|---------|
| **TTFB** | Time to First Byte | < 200ms |
| **FCP** | First Contentful Paint | < 1.8s |
| **LCP** | Largest Contentful Paint | < 2.5s |
| **TTI** | Time to Interactive | < 3.8s |
| **CLS** | Cumulative Layout Shift | < 0.1 |

7. **完整时序图**

```
用户输入 URL
    ↓
URL 解析 (协议、域名、端口、路径)
    ↓
DNS 查询 (域名 → IP) [缓存 → 递归查询]
    ↓
建立 TCP 连接 (三次握手) [~100-200ms]
    ↓
HTTPS? → SSL/TLS 握手 [~200-300ms]
    ↓
发送 HTTP 请求 (请求行、头、体)
    ↓
服务器处理 (路由、业务逻辑、数据库)
    ↓
返回 HTTP 响应 (状态码、头、体)
    ↓
浏览器接收响应 (下载 HTML)
    ↓
解析 HTML → DOM 树
解析 CSS → CSSOM 树
    ↓
合并 → 渲染树 (Render Tree)
    ↓
布局 (Layout) → 计算位置大小
    ↓
绘制 (Paint) → 转换为像素
    ↓
合成 (Composite) → 显示到屏幕
    ↓
执行 JavaScript → 可能触发重排重绘
    ↓
加载子资源 (CSS、JS、图片、字体...)
    ↓
页面完全加载 (onload 事件)
    ↓
关闭连接 (四次挥手) [或保持连接]
```

**关键要点**

1. **DNS 是第一步**: 域名解析是网络请求的前提
2. **TCP 握手有开销**: HTTP/2 和 HTTP/3 优化了连接复用
3. **HTTPS 多一次握手**: SSL/TLS 增加延迟但提升安全
4. **渲染可以优化**: 减少阻塞,异步加载,懒加载
5. **缓存很重要**: HTTP 缓存、DNS 缓存、浏览器缓存

**记忆口诀**

"**域名解析建连接,请求响应解析渲染呈**"
- **域名解析**: DNS 查询
- **建连接**: TCP 三次握手 (+ TLS 握手)
- **请求响应**: HTTP 请求和响应
- **解析渲染**: DOM/CSS 解析构建渲染树
- **呈**: 最终呈现页面

### 97. 什么是跨域?如何解决跨域问题?

**核心答案**

**跨域**(Cross-Origin)是指浏览器出于安全考虑实施的**同源策略**(Same-Origin Policy),限制了一个源(协议+域名+端口)的文档或脚本访问另一个源的资源。当协议、域名、端口任一不同时,即为跨域。常见解决方案包括:CORS、JSONP、代理服务器、postMessage 等。

**详细说明**

1. **同源策略 (Same-Origin Policy)**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="360" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">同源策略判断</text>
<rect x="50" y="80" width="700" height="60" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="400" y="108" text-anchor="middle" font-size="14" fill="#1565C0" font-weight="bold">当前页面: https://www.example.com:443/page</text>
<text x="400" y="128" text-anchor="middle" font-size="11" fill="#666">协议: https | 域名: www.example.com | 端口: 443</text>
<rect x="50" y="160" width="340" height="200" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="220" y="190" text-anchor="middle" font-size="15" fill="#2E7D32" font-weight="bold">✓ 同源 (允许访问)</text>
<rect x="70" y="205" width="300" height="140" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="220" y="228" text-anchor="middle" font-size="11" font-family="monospace" fill="#4CAF50">https://www.example.com/api</text>
<text x="220" y="245" text-anchor="middle" font-size="9" fill="#66BB6A">✓ 路径不同 (同源)</text>
<text x="220" y="268" text-anchor="middle" font-size="11" font-family="monospace" fill="#4CAF50">https://www.example.com:443/</text>
<text x="220" y="285" text-anchor="middle" font-size="9" fill="#66BB6A">✓ 端口显式声明 (同源)</text>
<text x="220" y="308" text-anchor="middle" font-size="11" font-family="monospace" fill="#4CAF50">https://www.example.com?a=1</text>
<text x="220" y="325" text-anchor="middle" font-size="9" fill="#66BB6A">✓ 参数不同 (同源)</text>
<rect x="410" y="160" width="340" height="200" rx="5" fill="#FFEBEE" stroke="#F44336" stroke-width="2"/>
<text x="580" y="190" text-anchor="middle" font-size="15" fill="#C62828" font-weight="bold">✗ 跨域 (禁止访问)</text>
<rect x="430" y="205" width="300" height="140" rx="3" fill="white" stroke="#EF5350" stroke-width="1"/>
<text x="580" y="228" text-anchor="middle" font-size="11" font-family="monospace" fill="#F44336">http://www.example.com</text>
<text x="580" y="245" text-anchor="middle" font-size="9" fill="#EF5350">✗ 协议不同 (http vs https)</text>
<text x="580" y="268" text-anchor="middle" font-size="11" font-family="monospace" fill="#F44336">https://api.example.com</text>
<text x="580" y="285" text-anchor="middle" font-size="9" fill="#EF5350">✗ 子域名不同</text>
<text x="580" y="308" text-anchor="middle" font-size="11" font-family="monospace" fill="#F44336">https://www.example.com:8080</text>
<text x="580" y="325" text-anchor="middle" font-size="9" fill="#EF5350">✗ 端口不同 (443 vs 8080)</text>
</svg>

**同源策略限制:**
- ✗ 无法读取跨域 Cookie、LocalStorage、IndexedDB
- ✗ 无法操作跨域 DOM
- ✗ 无法发送跨域 AJAX 请求(可以发送但浏览器拦截响应)

**同源策略允许:**
- ✓ `<script src="跨域">` - 加载跨域脚本
- ✓ `<link href="跨域">` - 加载跨域样式
- ✓ `<img src="跨域">` - 加载跨域图片
- ✓ `<video>/<audio src="跨域">` - 加载跨域媒体
- ✓ `<iframe src="跨域">` - 嵌入跨域页面(但无法访问内容)
- ✓ `<form action="跨域">` - 提交跨域表单

2. **跨域解决方案**

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="610" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">跨域解决方案</text>
<rect x="50" y="80" width="340" height="120" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="220" y="110" text-anchor="middle" font-size="15" fill="#2E7D32" font-weight="bold">1️⃣ CORS (推荐)</text>
<rect x="60" y="125" width="320" height="60" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="220" y="148" text-anchor="middle" font-size="12" fill="#388E3C">服务器设置响应头</text>
<text x="70" y="168" font-size="10" font-family="monospace" fill="#2E7D32">Access-Control-Allow-Origin:</text>
<text x="70" y="183" font-size="10" font-family="monospace" fill="#2E7D32">https://www.example.com</text>
<rect x="410" y="80" width="340" height="120" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="580" y="110" text-anchor="middle" font-size="15" fill="#1565C0" font-weight="bold">2️⃣ JSONP</text>
<rect x="420" y="125" width="320" height="60" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="580" y="148" text-anchor="middle" font-size="12" fill="#1976D2">利用 script 标签不跨域</text>
<text x="430" y="168" font-size="10" font-family="monospace" fill="#1565C0">&lt;script src="api?callback=fn"&gt;</text>
<text x="580" y="183" text-anchor="middle" font-size="9" fill="#FF5722">✗ 仅支持 GET,已过时</text>
<rect x="50" y="220" width="340" height="120" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="220" y="250" text-anchor="middle" font-size="15" fill="#F57C00" font-weight="bold">3️⃣ 代理服务器</text>
<rect x="60" y="265" width="320" height="60" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="220" y="288" text-anchor="middle" font-size="12" fill="#EF6C00">同域服务器转发请求</text>
<text x="70" y="308" font-size="10" fill="#666">前端 → 同域代理 → 跨域服务器</text>
<text x="220" y="323" text-anchor="middle" font-size="9" fill="#4CAF50">✓ 开发环境常用 (webpack devServer)</text>
<rect x="410" y="220" width="340" height="120" rx="5" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2"/>
<text x="580" y="250" text-anchor="middle" font-size="15" fill="#7B1FA2" font-weight="bold">4️⃣ Nginx 反向代理</text>
<rect x="420" y="265" width="320" height="60" rx="3" fill="white" stroke="#BA68C8" stroke-width="1"/>
<text x="580" y="288" text-anchor="middle" font-size="12" fill="#6A1B9A">服务器层面代理</text>
<text x="430" y="308" font-size="10" font-family="monospace" fill="#7B1FA2">location /api {</text>
<text x="430" y="323" font-size="10" font-family="monospace" fill="#7B1FA2">  proxy_pass http://api.com;</text>
<rect x="50" y="360" width="340" height="120" rx="5" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/>
<text x="220" y="390" text-anchor="middle" font-size="15" fill="#F57F17" font-weight="bold">5️⃣ postMessage</text>
<rect x="60" y="405" width="320" height="60" rx="3" fill="white" stroke="#FFE082" stroke-width="1"/>
<text x="220" y="428" text-anchor="middle" font-size="12" fill="#F9A825">跨域窗口通信</text>
<text x="70" y="448" font-size="10" font-family="monospace" fill="#F57F17">window.postMessage(data, origin)</text>
<text x="220" y="463" text-anchor="middle" font-size="9" fill="#666">iframe、window.open 等场景</text>
<rect x="410" y="360" width="340" height="120" rx="5" fill="#FFCCBC" stroke="#FF5722" stroke-width="2"/>
<text x="580" y="390" text-anchor="middle" font-size="15" fill="#D84315" font-weight="bold">6️⃣ WebSocket</text>
<rect x="420" y="405" width="320" height="60" rx="3" fill="white" stroke="#FF8A65" stroke-width="1"/>
<text x="580" y="428" text-anchor="middle" font-size="12" fill="#BF360C">不受同源策略限制</text>
<text x="430" y="448" font-size="10" font-family="monospace" fill="#D84315">new WebSocket('ws://api.com')</text>
<text x="580" y="463" text-anchor="middle" font-size="9" fill="#666">需要服务器支持 WebSocket 协议</text>
<rect x="50" y="500" width="340" height="110" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="220" y="530" text-anchor="middle" font-size="15" fill="#2E7D32" font-weight="bold">7️⃣ document.domain</text>
<rect x="60" y="545" width="320" height="50" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="220" y="568" text-anchor="middle" font-size="12" fill="#388E3C">主域相同,子域不同</text>
<text x="70" y="588" font-size="9" font-family="monospace" fill="#2E7D32">document.domain = 'example.com'</text>
<rect x="410" y="500" width="340" height="110" rx="5" fill="#BBDEFB" stroke="#2196F3" stroke-width="2"/>
<text x="580" y="530" text-anchor="middle" font-size="15" fill="#1565C0" font-weight="bold">8️⃣ window.name</text>
<rect x="420" y="545" width="320" height="50" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="580" y="568" text-anchor="middle" font-size="12" fill="#1976D2">利用 window.name 传递数据</text>
<text x="580" y="588" text-anchor="middle" font-size="9" fill="#999">较少使用,已过时</text>
</svg>

3. **CORS 详解 (最推荐的方案)**

**简单请求:**
- 方法: GET、POST、HEAD
- 头部: Accept、Accept-Language、Content-Language、Content-Type(仅 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`)

**预检请求 (Preflight):**
不满足简单请求条件时,浏览器先发送 OPTIONS 请求询问服务器是否允许。

<svg viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-cors" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#2196F3"/></marker></defs>
<rect x="20" y="20" width="660" height="410" rx="8" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="340" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1565C0">CORS 预检请求流程</text>
<rect x="80" y="90" width="120" height="60" rx="5" fill="#BBDEFB" stroke="#1976D2" stroke-width="2"/>
<text x="140" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#0D47A1">浏览器</text>
<rect x="480" y="90" width="120" height="60" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="540" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#2E7D32">服务器</text>
<line x1="140" y1="170" x2="140" y2="390" stroke="#1976D2" stroke-width="2"/>
<line x1="540" y1="170" x2="540" y2="390" stroke="#4CAF50" stroke-width="2"/>
<line x1="140" y1="190" x2="530" y2="210" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow-cors)"/>
<text x="340" y="195" text-anchor="middle" font-size="12" fill="#F57C00" font-weight="bold">① 预检请求 OPTIONS</text>
<text x="340" y="210" text-anchor="middle" font-size="9" font-family="monospace" fill="#666">Origin: https://example.com</text>
<line x1="530" y1="230" x2="140" y2="250" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-cors)"/>
<text x="340" y="235" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">② 预检响应</text>
<text x="340" y="250" text-anchor="middle" font-size="9" font-family="monospace" fill="#666">Access-Control-Allow-Origin: *</text>
<line x1="140" y1="280" x2="530" y2="300" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow-cors)"/>
<text x="340" y="285" text-anchor="middle" font-size="12" fill="#1565C0" font-weight="bold">③ 实际请求 (PUT/DELETE等)</text>
<text x="340" y="300" text-anchor="middle" font-size="9" font-family="monospace" fill="#666">PUT /api/data</text>
<line x1="530" y1="320" x2="140" y2="340" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-cors)"/>
<text x="340" y="325" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">④ 实际响应</text>
<text x="340" y="340" text-anchor="middle" font-size="9" font-family="monospace" fill="#666">200 OK + 数据</text>
<rect x="80" y="370" width="520" height="30" rx="3" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1"/>
<text x="340" y="390" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">✓ 预检通过后,实际请求才发送</text>
</svg>

**CORS 响应头:**
```http
# 允许的源 (* 或具体域名)
Access-Control-Allow-Origin: https://example.com

# 允许的方法
Access-Control-Allow-Methods: GET, POST, PUT, DELETE

# 允许的请求头
Access-Control-Allow-Headers: Content-Type, Authorization

# 允许携带 Cookie
Access-Control-Allow-Credentials: true

# 预检缓存时间 (秒)
Access-Control-Max-Age: 86400
```

4. **各方案对比**

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| **CORS** | 标准、安全、支持所有 HTTP 方法 | 需要服务器配合 | ⭐⭐⭐⭐⭐ 生产环境首选 |
| **JSONP** | 兼容老浏览器 | 仅 GET、不安全 | 已过时 |
| **代理服务器** | 前端无感、灵活 | 需额外服务器 | 开发环境、内网环境 |
| **Nginx 代理** | 性能高、统一入口 | 需运维配置 | 生产环境 API 网关 |
| **postMessage** | 标准、安全 | 仅窗口通信 | iframe、多窗口通信 |
| **WebSocket** | 双向通信、无跨域限制 | 需协议支持 | 实时通信场景 |

5. **实战配置示例**

**Node.js (Express) 配置 CORS:**
```javascript
// 使用 cors 中间件
const cors = require('cors');

// 允许所有源
app.use(cors());

// 自定义配置
app.use(cors({
  origin: 'https://example.com', // 允许的源
  methods: ['GET', 'POST', 'PUT'], // 允许的方法
  credentials: true, // 允许携带 Cookie
  maxAge: 86400 // 预检缓存 24 小时
}));

// 手动设置响应头
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
```

**Nginx 反向代理配置:**
```nginx
server {
    listen 80;
    server_name www.example.com;

    # 前端静态资源
    location / {
        root /var/www/html;
    }

    # 代理 API 请求
    location /api/ {
        proxy_pass http://api.backend.com/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        # 添加 CORS 头
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE';
    }
}
```

**Webpack DevServer 代理:**
```javascript
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.backend.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
};
```

**postMessage 跨域通信:**
```javascript
// 发送方 (父窗口)
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage('Hello', 'https://other-domain.com');

// 接收方 (子窗口)
window.addEventListener('message', (event) => {
  // 验证来源
  if (event.origin !== 'https://example.com') return;

  console.log('收到消息:', event.data);
  // 回复消息
  event.source.postMessage('收到', event.origin);
});
```

**关键要点**

1. **CORS 是主流方案**: 现代浏览器和服务器都支持
2. **预检请求有缓存**: 使用 `Access-Control-Max-Age` 减少请求
3. **生产环境用 Nginx**: 统一处理跨域,提升性能
4. **开发环境用代理**: webpack devServer 等工具配置简单
5. **安全第一**: 不要随意设置 `Access-Control-Allow-Origin: *`

**记忆口诀**

"**协议域名端口同,不同即为跨域中**"
- **协议域名端口**: 同源策略的三要素
- **同**: 三者都相同才是同源
- **不同即为跨域**: 任一不同就跨域
- **CORS 最佳**: 生产环境首选 CORS 方案

### 98. CORS 的原理是什么?

**核心答案**

CORS (Cross-Origin Resource Sharing,跨域资源共享) 是 W3C 标准,通过在 HTTP 响应头中添加特定字段,告知浏览器允许哪些源的网页访问资源。浏览器根据服务器返回的 CORS 头判断是否允许跨域请求。对于**简单请求**直接发送,对于**非简单请求**先发送 **OPTIONS 预检请求**确认权限后再发送实际请求。

**详细说明**

1. **CORS 工作原理**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-cors-detail" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#2196F3"/></marker><marker id="arrow-cors-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#F44336"/></marker></defs>
<rect x="20" y="20" width="760" height="460" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">CORS 工作原理</text>
<rect x="50" y="80" width="200" height="80" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="150" y="110" text-anchor="middle" font-size="14" fill="#1565C0" font-weight="bold">前端页面</text>
<text x="150" y="130" text-anchor="middle" font-size="11" fill="#666">https://example.com</text>
<text x="150" y="148" text-anchor="middle" font-size="10" font-family="monospace" fill="#1976D2">fetch('/api/data')</text>
<rect x="550" y="80" width="200" height="80" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="650" y="110" text-anchor="middle" font-size="14" fill="#2E7D32" font-weight="bold">API 服务器</text>
<text x="650" y="130" text-anchor="middle" font-size="11" fill="#666">https://api.backend.com</text>
<text x="650" y="148" text-anchor="middle" font-size="10" fill="#388E3C">跨域资源</text>
<line x1="250" y1="120" x2="545" y2="120" stroke="#2196F3" stroke-width="3" marker-end="url(#arrow-cors-detail)"/>
<text x="400" y="110" text-anchor="middle" font-size="12" fill="#1565C0" font-weight="bold">① 请求 (带 Origin 头)</text>
<text x="400" y="125" text-anchor="middle" font-size="10" font-family="monospace" fill="#666">Origin: https://example.com</text>
<rect x="300" y="180" width="200" height="100" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="400" y="210" text-anchor="middle" font-size="13" fill="#F57C00" font-weight="bold">浏览器检查</text>
<text x="400" y="232" text-anchor="middle" font-size="11" fill="#666">是否跨域?</text>
<text x="310" y="252" font-size="10" fill="#4CAF50">✓ 同源 → 正常响应</text>
<text x="310" y="268" font-size="10" fill="#F57C00">⚠️ 跨域 → 检查 CORS</text>
<line x1="545" y1="140" x2="250" y2="140" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-cors-detail)"/>
<text x="400" y="155" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">② 响应 (带 CORS 头)</text>
<text x="400" y="170" text-anchor="middle" font-size="9" font-family="monospace" fill="#666">Access-Control-Allow-Origin: https://example.com</text>
<line x1="400" y1="280" x2="400" y2="310" stroke="#FF9800" stroke-width="2" marker-end="url(#arrow-cors-detail)"/>
<rect x="250" y="310" width="300" height="80" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="400" y="340" text-anchor="middle" font-size="13" fill="#2E7D32" font-weight="bold">③ CORS 头匹配?</text>
<text x="400" y="360" text-anchor="middle" font-size="11" fill="#4CAF50">✓ 允许 → 返回数据给 JS</text>
<text x="400" y="378" text-anchor="middle" font-size="11" fill="#F44336">✗ 拒绝 → 抛出 CORS 错误</text>
<rect x="50" y="410" width="330" height="50" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="215" y="440" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">✓ 成功: JS 可访问响应数据</text>
<rect x="420" y="410" width="330" height="50" rx="5" fill="#FFCDD2" stroke="#F44336" stroke-width="2"/>
<text x="585" y="435" text-anchor="middle" font-size="12" fill="#C62828" font-weight="bold">✗ 失败: CORS policy 错误</text>
<text x="585" y="450" text-anchor="middle" font-size="9" fill="#666">请求已发送但浏览器拦截响应</text>
<line x1="300" y1="390" x2="215" y2="405" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-cors-detail)"/>
<line x1="500" y1="390" x2="585" y2="405" stroke="#F44336" stroke-width="2" marker-end="url(#arrow-cors-red)"/>
</svg>

**关键点:**
- CORS 是**服务器主动授权**,而非浏览器主动限制
- 浏览器会**自动添加 Origin 头**,服务器根据此头判断
- 跨域请求**已发送到服务器**,只是浏览器拦截了响应

2. **简单请求 vs 非简单请求**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="510" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">简单请求 vs 非简单请求</text>
<rect x="50" y="80" width="340" height="220" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="220" y="110" text-anchor="middle" font-size="15" fill="#2E7D32" font-weight="bold">简单请求 (Simple Request)</text>
<rect x="60" y="125" width="320" height="160" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="220" y="150" text-anchor="middle" font-size="12" fill="#388E3C" font-weight="bold">条件 (全部满足):</text>
<text x="70" y="175" font-size="11" fill="#666">1. 方法限制:</text>
<text x="80" y="192" font-size="10" fill="#2E7D32">GET / POST / HEAD</text>
<text x="70" y="215" font-size="11" fill="#666">2. 头部限制 (仅以下):</text>
<text x="80" y="232" font-size="10" fill="#2E7D32">Accept, Accept-Language,</text>
<text x="80" y="247" font-size="10" fill="#2E7D32">Content-Language, Content-Type</text>
<text x="70" y="270" font-size="11" fill="#666">3. Content-Type 限制:</text>
<text x="80" y="287" font-size="9" fill="#2E7D32">application/x-www-form-urlencoded</text>
<text x="80" y="301" font-size="9" fill="#2E7D32">multipart/form-data | text/plain</text>
<rect x="410" y="80" width="340" height="220" rx="5" fill="#FFEBEE" stroke="#F44336" stroke-width="2"/>
<text x="580" y="110" text-anchor="middle" font-size="15" fill="#C62828" font-weight="bold">非简单请求 (Preflight)</text>
<rect x="420" y="125" width="320" height="160" rx="3" fill="white" stroke="#EF5350" stroke-width="1"/>
<text x="580" y="150" text-anchor="middle" font-size="12" fill="#D32F2F" font-weight="bold">触发条件 (任一满足):</text>
<text x="430" y="175" font-size="11" fill="#666">1. 方法:</text>
<text x="440" y="192" font-size="10" fill="#E53935">PUT / DELETE / PATCH / CONNECT...</text>
<text x="430" y="215" font-size="11" fill="#666">2. 自定义头部:</text>
<text x="440" y="232" font-size="10" fill="#E53935">Authorization, X-Custom-Header...</text>
<text x="430" y="255" font-size="11" fill="#666">3. Content-Type:</text>
<text x="440" y="272" font-size="10" fill="#E53935">application/json</text>
<text x="440" y="287" font-size="10" fill="#E53935">application/xml</text>
<rect x="50" y="320" width="340" height="190" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="2"/>
<text x="220" y="350" text-anchor="middle" font-size="14" fill="#2E7D32" font-weight="bold">简单请求流程</text>
<rect x="60" y="365" width="320" height="130" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="220" y="390" text-anchor="middle" font-size="11" fill="#388E3C">直接发送请求 ✓</text>
<text x="70" y="415" font-size="10" fill="#666">请求头:</text>
<text x="75" y="432" font-size="9" font-family="monospace" fill="#2E7D32">Origin: https://example.com</text>
<text x="70" y="455" font-size="10" fill="#666">响应头:</text>
<text x="75" y="472" font-size="9" font-family="monospace" fill="#2E7D32">Access-Control-Allow-Origin:</text>
<text x="75" y="486" font-size="9" font-family="monospace" fill="#2E7D32">https://example.com</text>
<rect x="410" y="320" width="340" height="190" rx="5" fill="#FFCDD2" stroke="#F44336" stroke-width="2"/>
<text x="580" y="350" text-anchor="middle" font-size="14" fill="#C62828" font-weight="bold">非简单请求流程</text>
<rect x="420" y="365" width="320" height="130" rx="3" fill="white" stroke="#EF5350" stroke-width="1"/>
<text x="580" y="390" text-anchor="middle" font-size="11" fill="#D32F2F">先发预检 OPTIONS ⚠️</text>
<text x="430" y="415" font-size="10" fill="#666">① 预检请求:</text>
<text x="435" y="432" font-size="9" font-family="monospace" fill="#E53935">OPTIONS /api/data</text>
<text x="430" y="455" font-size="10" fill="#666">② 预检通过后:</text>
<text x="435" y="472" font-size="9" font-family="monospace" fill="#E53935">PUT /api/data (实际请求)</text>
<text x="580" y="490" text-anchor="middle" font-size="9" fill="#FF5722" font-weight="bold">多一次请求,影响性能</text>
</svg>

3. **OPTIONS 预检请求详解**

<svg viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-options" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#FF9800"/></marker></defs>
<rect x="20" y="20" width="710" height="460" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="3"/>
<text x="375" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#F57C00">OPTIONS 预检请求</text>
<rect x="80" y="90" width="140" height="60" rx="5" fill="#FFCC80" stroke="#EF6C00" stroke-width="2"/>
<text x="150" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#E65100">浏览器</text>
<rect x="530" y="90" width="140" height="60" rx="5" fill="#FFA726" stroke="#EF6C00" stroke-width="2"/>
<text x="600" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#E65100">服务器</text>
<line x1="150" y1="170" x2="150" y2="440" stroke="#EF6C00" stroke-width="2"/>
<line x1="600" y1="170" x2="600" y2="440" stroke="#EF6C00" stroke-width="2"/>
<line x1="150" y1="190" x2="590" y2="210" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow-options)"/>
<text x="375" y="195" text-anchor="middle" font-size="12" fill="#1565C0" font-weight="bold">① OPTIONS 预检请求</text>
<rect x="160" y="215" width="430" height="70" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="170" y="235" font-size="10" font-family="monospace" fill="#1565C0">Origin: https://example.com</text>
<text x="170" y="252" font-size="10" font-family="monospace" fill="#1565C0">Access-Control-Request-Method: PUT</text>
<text x="170" y="269" font-size="10" font-family="monospace" fill="#1565C0">Access-Control-Request-Headers:</text>
<text x="180" y="283" font-size="10" font-family="monospace" fill="#1565C0">Content-Type, Authorization</text>
<line x1="590" y1="305" x2="150" y2="325" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-options)"/>
<text x="375" y="310" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">② OPTIONS 预检响应</text>
<rect x="160" y="330" width="430" height="95" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="170" y="350" font-size="10" font-family="monospace" fill="#2E7D32">Access-Control-Allow-Origin: *</text>
<text x="170" y="367" font-size="10" font-family="monospace" fill="#2E7D32">Access-Control-Allow-Methods:</text>
<text x="180" y="382" font-size="10" font-family="monospace" fill="#2E7D32">GET, POST, PUT, DELETE</text>
<text x="170" y="399" font-size="10" font-family="monospace" fill="#2E7D32">Access-Control-Allow-Headers: *</text>
<text x="170" y="416" font-size="10" font-family="monospace" fill="#2E7D32">Access-Control-Max-Age: 86400</text>
<rect x="200" y="440" width="350" height="30" rx="3" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1"/>
<text x="375" y="460" text-anchor="middle" font-size="11" fill="#2E7D32" font-weight="bold">✓ 预检通过,浏览器发送实际请求 (PUT)</text>
</svg>

4. **重要的 CORS 响应头**

| 响应头 | 说明 | 示例 |
|--------|------|------|
| **Access-Control-Allow-Origin** | 允许的源 | `https://example.com` 或 `*` |
| **Access-Control-Allow-Methods** | 允许的 HTTP 方法 | `GET, POST, PUT, DELETE` |
| **Access-Control-Allow-Headers** | 允许的请求头 | `Content-Type, Authorization` |
| **Access-Control-Allow-Credentials** | 是否允许携带 Cookie | `true` |
| **Access-Control-Max-Age** | 预检结果缓存时间(秒) | `86400` (24小时) |
| **Access-Control-Expose-Headers** | JS 可访问的响应头 | `X-Custom-Header` |

5. **携带 Cookie 的跨域请求**

**前端配置:**
```javascript
fetch('https://api.backend.com/data', {
  method: 'POST',
  credentials: 'include', // 携带 Cookie
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ data: 'test' })
});

// 或 XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.withCredentials = true; // 携带 Cookie
```

**后端配置:**
```javascript
// 注意: 携带 Cookie 时不能使用通配符 *
res.header('Access-Control-Allow-Origin', 'https://example.com'); // 具体域名
res.header('Access-Control-Allow-Credentials', 'true'); // 必须
```

6. **CORS 常见错误**

**错误 1: Origin 不匹配**
```
Access to fetch at 'https://api.backend.com' from origin
'https://example.com' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present
```
**解决**: 服务器添加 `Access-Control-Allow-Origin` 响应头

**错误 2: 预检失败**
```
Access to fetch has been blocked by CORS policy:
Response to preflight request doesn't pass access
control check: Method PUT is not allowed
```
**解决**: 服务器添加 `Access-Control-Allow-Methods: PUT`

**错误 3: 自定义头部未授权**
```
Request header field Authorization is not allowed
```
**解决**: 服务器添加 `Access-Control-Allow-Headers: Authorization`

7. **CORS 性能优化**

1. **预检缓存**: 设置 `Access-Control-Max-Age` 减少预检请求
2. **避免非必要的自定义头**: 尽量使用简单请求
3. **使用 GET 代替 POST**: 简单请求不需要预检
4. **统一 API 域名**: 减少跨域场景

**关键要点**

1. **服务器主导**: CORS 是服务器明确授权的机制
2. **浏览器自动处理**: Origin 头和预检请求由浏览器自动添加
3. **预检有开销**: 非简单请求多一次 OPTIONS,需优化
4. **Cookie 需特殊处理**: 不能用 `*`,需具体域名
5. **安全优先**: 不要随意设置 `Access-Control-Allow-Origin: *`

**记忆口诀**

"**简单直发非简检,服务器头浏览验**"
- **简单直发**: 简单请求直接发送
- **非简检**: 非简单请求先预检 (OPTIONS)
- **服务器头**: 服务器返回 CORS 响应头
- **浏览验**: 浏览器验证后决定是否放行

### 99. 什么是 RESTful API?RESTful 的设计原则是什么?

**核心答案**

RESTful API 是遵循 REST (Representational State Transfer,表述性状态转移) 架构风格设计的 Web API。它使用标准的 HTTP 方法(GET、POST、PUT、DELETE)操作资源,通过 URL 定位资源,用 HTTP 状态码表示结果,实现**无状态**、**统一接口**、**资源导向**的 API 设计。核心原则包括:资源、统一接口、无状态、可缓存、分层系统、按需代码(可选)。

**详细说明**

1. **REST 核心概念**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="360" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">REST 核心概念</text>
<rect x="50" y="80" width="220" height="280" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="160" y="110" text-anchor="middle" font-size="15" fill="#1565C0" font-weight="bold">资源 (Resource)</text>
<rect x="60" y="125" width="200" height="220" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="160" y="150" text-anchor="middle" font-size="12" fill="#1976D2">网络上的实体</text>
<text x="70" y="175" font-size="11" fill="#666">• 用户: /users</text>
<text x="70" y="193" font-size="11" fill="#666">• 文章: /articles</text>
<text x="70" y="211" font-size="11" fill="#666">• 订单: /orders</text>
<text x="160" y="240" text-anchor="middle" font-size="12" fill="#1976D2" font-weight="bold">URI 定位资源:</text>
<text x="70" y="262" font-size="10" font-family="monospace" fill="#1565C0">GET /users/123</text>
<text x="70" y="277" font-size="9" fill="#999">获取 ID=123 的用户</text>
<text x="70" y="297" font-size="10" font-family="monospace" fill="#1565C0">GET /articles?page=1</text>
<text x="70" y="312" font-size="9" fill="#999">获取第1页文章列表</text>
<text x="70" y="332" font-size="10" font-family="monospace" fill="#1565C0">POST /users</text>
<text x="70" y="347" font-size="9" fill="#999">创建新用户</text>
<rect x="290" y="80" width="220" height="280" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="400" y="110" text-anchor="middle" font-size="15" fill="#2E7D32" font-weight="bold">表述 (Representation)</text>
<rect x="300" y="125" width="200" height="220" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="400" y="150" text-anchor="middle" font-size="12" fill="#388E3C">资源的表现形式</text>
<text x="310" y="175" font-size="11" fill="#666">• JSON (常用)</text>
<text x="310" y="193" font-size="11" fill="#666">• XML</text>
<text x="310" y="211" font-size="11" fill="#666">• HTML</text>
<text x="400" y="240" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">Accept 协商:</text>
<text x="310" y="262" font-size="10" font-family="monospace" fill="#2E7D32">Accept: application/json</text>
<rect x="310" y="275" width="180" height="60" rx="3" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1"/>
<text x="400" y="295" text-anchor="middle" font-size="9" font-family="monospace" fill="#2E7D32">{</text>
<text x="400" y="308" text-anchor="middle" font-size="9" font-family="monospace" fill="#2E7D32">"id": 123,</text>
<text x="400" y="321" text-anchor="middle" font-size="9" font-family="monospace" fill="#2E7D32">"name": "张三"</text>
<text x="400" y="334" text-anchor="middle" font-size="9" font-family="monospace" fill="#2E7D32">}</text>
<rect x="530" y="80" width="220" height="280" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="640" y="110" text-anchor="middle" font-size="15" fill="#F57C00" font-weight="bold">状态转移 (State Transfer)</text>
<rect x="540" y="125" width="200" height="220" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="640" y="150" text-anchor="middle" font-size="12" fill="#EF6C00">通过 HTTP 方法操作</text>
<text x="550" y="175" font-size="11" fill="#666">• GET - 获取资源</text>
<text x="550" y="193" font-size="11" fill="#666">• POST - 创建资源</text>
<text x="550" y="211" font-size="11" fill="#666">• PUT - 更新资源</text>
<text x="550" y="229" font-size="11" fill="#666">• PATCH - 部分更新</text>
<text x="550" y="247" font-size="11" fill="#666">• DELETE - 删除资源</text>
<text x="640" y="275" text-anchor="middle" font-size="12" fill="#F57C00" font-weight="bold">状态码反馈:</text>
<text x="550" y="295" font-size="10" fill="#4CAF50">200 - 成功</text>
<text x="550" y="310" font-size="10" fill="#4CAF50">201 - 已创建</text>
<text x="550" y="325" font-size="10" fill="#F44336">404 - 未找到</text>
<text x="550" y="340" font-size="10" fill="#F44336">500 - 服务器错误</text>
</svg>

2. **RESTful API 设计原则**

<svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="660" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">REST 六大设计原则</text>
<rect x="50" y="80" width="340" height="110" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="220" y="110" text-anchor="middle" font-size="15" fill="#1565C0" font-weight="bold">1️⃣ 资源导向 (Resource-Based)</text>
<rect x="60" y="125" width="320" height="50" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="220" y="148" text-anchor="middle" font-size="11" fill="#666">• 万物皆资源,用名词而非动词</text>
<text x="70" y="165" font-size="10" fill="#4CAF50">✓ /users/123</text>
<text x="180" y="165" font-size="10" fill="#F44336">✗ /getUser?id=123</text>
<rect x="410" y="80" width="340" height="110" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="580" y="110" text-anchor="middle" font-size="15" fill="#2E7D32" font-weight="bold">2️⃣ 统一接口 (Uniform Interface)</text>
<rect x="420" y="125" width="320" height="50" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="580" y="148" text-anchor="middle" font-size="11" fill="#666">• 使用标准 HTTP 方法</text>
<text x="430" y="165" font-size="10" fill="#666">GET/POST/PUT/DELETE/PATCH</text>
<rect x="50" y="210" width="340" height="110" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="220" y="240" text-anchor="middle" font-size="15" fill="#F57C00" font-weight="bold">3️⃣ 无状态 (Stateless)</text>
<rect x="60" y="255" width="320" height="50" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="220" y="275" text-anchor="middle" font-size="11" fill="#666">• 每个请求包含完整信息</text>
<text x="220" y="292" text-anchor="middle" font-size="11" fill="#666">• 服务器不保存客户端状态</text>
<rect x="410" y="210" width="340" height="110" rx="5" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2"/>
<text x="580" y="240" text-anchor="middle" font-size="15" fill="#7B1FA2" font-weight="bold">4️⃣ 可缓存 (Cacheable)</text>
<rect x="420" y="255" width="320" height="50" rx="3" fill="white" stroke="#BA68C8" stroke-width="1"/>
<text x="580" y="275" text-anchor="middle" font-size="11" fill="#666">• 响应明确标识可否缓存</text>
<text x="580" y="292" text-anchor="middle" font-size="11" fill="#666">• Cache-Control, ETag 等</text>
<rect x="50" y="340" width="340" height="110" rx="5" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/>
<text x="220" y="370" text-anchor="middle" font-size="15" fill="#F57F17" font-weight="bold">5️⃣ 分层系统 (Layered System)</text>
<rect x="60" y="385" width="320" height="50" rx="3" fill="white" stroke="#FFE082" stroke-width="1"/>
<text x="220" y="405" text-anchor="middle" font-size="11" fill="#666">• 客户端不知道中间层</text>
<text x="220" y="422" text-anchor="middle" font-size="11" fill="#666">• 负载均衡、网关、缓存等</text>
<rect x="410" y="340" width="340" height="110" rx="5" fill="#FFCCBC" stroke="#FF5722" stroke-width="2"/>
<text x="580" y="370" text-anchor="middle" font-size="15" fill="#D84315" font-weight="bold">6️⃣ 按需代码 (可选)</text>
<rect x="420" y="385" width="320" height="50" rx="3" fill="white" stroke="#FF8A65" stroke-width="1"/>
<text x="580" y="405" text-anchor="middle" font-size="11" fill="#666">• 服务器可返回可执行代码</text>
<text x="580" y="422" text-anchor="middle" font-size="11" fill="#999">如 JavaScript (很少使用)</text>
<rect x="50" y="470" width="700" height="190" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="400" y="500" text-anchor="middle" font-size="15" fill="#2E7D32" font-weight="bold">RESTful API 设计最佳实践</text>
<rect x="70" y="520" width="330" height="125" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="235" y="545" text-anchor="middle" font-size="12" fill="#388E3C" font-weight="bold">URL 设计:</text>
<text x="80" y="565" font-size="10" fill="#666">• 使用复数名词: /users 而非 /user</text>
<text x="80" y="582" font-size="10" fill="#666">• 层级关系: /users/123/posts</text>
<text x="80" y="599" font-size="10" fill="#666">• 过滤排序: /users?age=18&sort=name</text>
<text x="80" y="616" font-size="10" fill="#666">• 版本控制: /v1/users 或 /api/v2/</text>
<text x="80" y="633" font-size="10" fill="#666">• 小写字母: /user-profiles (kebab-case)</text>
<rect x="420" y="520" width="330" height="125" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="585" y="545" text-anchor="middle" font-size="12" fill="#388E3C" font-weight="bold">响应设计:</text>
<text x="430" y="565" font-size="10" fill="#666">• 返回完整资源: 包含 id, 创建时间等</text>
<text x="430" y="582" font-size="10" fill="#666">• 一致的数据结构: {code, data, msg}</text>
<text x="430" y="599" font-size="10" fill="#666">• 合理的状态码: 200/201/204/400/404</text>
<text x="430" y="616" font-size="10" fill="#666">• 错误信息清晰: {error: "用户不存在"}</text>
<text x="430" y="633" font-size="10" fill="#666">• HATEOAS: 包含相关资源链接</text>
</svg>

3. **HTTP 方法与 CRUD 对应**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="410" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">HTTP 方法与 CRUD</text>
<rect x="50" y="80" width="700" height="330" rx="5" fill="white" stroke="#BDBDBD" stroke-width="1"/>
<rect x="60" y="95" width="120" height="35" rx="3" fill="#2196F3" stroke="#1976D2" stroke-width="1"/>
<text x="120" y="118" text-anchor="middle" font-size="13" fill="white" font-weight="bold">HTTP 方法</text>
<rect x="190" y="95" width="100" height="35" rx="3" fill="#4CAF50" stroke="#388E3C" stroke-width="1"/>
<text x="240" y="118" text-anchor="middle" font-size="13" fill="white" font-weight="bold">CRUD</text>
<rect x="300" y="95" width="200" height="35" rx="3" fill="#FF9800" stroke="#F57C00" stroke-width="1"/>
<text x="400" y="118" text-anchor="middle" font-size="13" fill="white" font-weight="bold">示例</text>
<rect x="510" y="95" width="230" height="35" rx="3" fill="#9C27B0" stroke="#7B1FA2" stroke-width="1"/>
<text x="625" y="118" text-anchor="middle" font-size="13" fill="white" font-weight="bold">说明</text>
<rect x="60" y="140" width="120" height="45" fill="#E3F2FD"/>
<text x="120" y="167" text-anchor="middle" font-size="14" fill="#1565C0" font-weight="bold">GET</text>
<rect x="190" y="140" width="100" height="45" fill="#E8F5E9"/>
<text x="240" y="167" text-anchor="middle" font-size="12" fill="#2E7D32">Read</text>
<rect x="300" y="140" width="200" height="45" fill="#FFF3E0"/>
<text x="400" y="160" text-anchor="middle" font-size="10" font-family="monospace" fill="#EF6C00">GET /users</text>
<text x="400" y="175" text-anchor="middle" font-size="10" font-family="monospace" fill="#EF6C00">GET /users/123</text>
<rect x="510" y="140" width="230" height="45" fill="#F3E5F5"/>
<text x="625" y="160" text-anchor="middle" font-size="10" fill="#666">获取资源列表</text>
<text x="625" y="175" text-anchor="middle" font-size="10" fill="#666">获取单个资源</text>
<rect x="60" y="195" width="120" height="45" fill="#E3F2FD"/>
<text x="120" y="222" text-anchor="middle" font-size="14" fill="#1565C0" font-weight="bold">POST</text>
<rect x="190" y="195" width="100" height="45" fill="#E8F5E9"/>
<text x="240" y="222" text-anchor="middle" font-size="12" fill="#2E7D32">Create</text>
<rect x="300" y="195" width="200" height="45" fill="#FFF3E0"/>
<text x="400" y="222" text-anchor="middle" font-size="10" font-family="monospace" fill="#EF6C00">POST /users</text>
<rect x="510" y="195" width="230" height="45" fill="#F3E5F5"/>
<text x="625" y="215" text-anchor="middle" font-size="10" fill="#666">创建新资源</text>
<text x="625" y="230" text-anchor="middle" font-size="9" fill="#4CAF50">返回 201 Created</text>
<rect x="60" y="250" width="120" height="45" fill="#E3F2FD"/>
<text x="120" y="277" text-anchor="middle" font-size="14" fill="#1565C0" font-weight="bold">PUT</text>
<rect x="190" y="250" width="100" height="45" fill="#E8F5E9"/>
<text x="240" y="277" text-anchor="middle" font-size="12" fill="#2E7D32">Update</text>
<rect x="300" y="250" width="200" height="45" fill="#FFF3E0"/>
<text x="400" y="277" text-anchor="middle" font-size="10" font-family="monospace" fill="#EF6C00">PUT /users/123</text>
<rect x="510" y="250" width="230" height="45" fill="#F3E5F5"/>
<text x="625" y="270" text-anchor="middle" font-size="10" fill="#666">完整更新资源</text>
<text x="625" y="285" text-anchor="middle" font-size="9" fill="#999">需提供所有字段</text>
<rect x="60" y="305" width="120" height="45" fill="#E3F2FD"/>
<text x="120" y="332" text-anchor="middle" font-size="14" fill="#1565C0" font-weight="bold">PATCH</text>
<rect x="190" y="305" width="100" height="45" fill="#E8F5E9"/>
<text x="240" y="332" text-anchor="middle" font-size="12" fill="#2E7D32">Update</text>
<rect x="300" y="305" width="200" height="45" fill="#FFF3E0"/>
<text x="400" y="332" text-anchor="middle" font-size="10" font-family="monospace" fill="#EF6C00">PATCH /users/123</text>
<rect x="510" y="305" width="230" height="45" fill="#F3E5F5"/>
<text x="625" y="325" text-anchor="middle" font-size="10" fill="#666">部分更新资源</text>
<text x="625" y="340" text-anchor="middle" font-size="9" fill="#999">只提供修改字段</text>
<rect x="60" y="360" width="120" height="45" fill="#E3F2FD"/>
<text x="120" y="387" text-anchor="middle" font-size="14" fill="#1565C0" font-weight="bold">DELETE</text>
<rect x="190" y="360" width="100" height="45" fill="#E8F5E9"/>
<text x="240" y="387" text-anchor="middle" font-size="12" fill="#2E7D32">Delete</text>
<rect x="300" y="360" width="200" height="45" fill="#FFF3E0"/>
<text x="400" y="387" text-anchor="middle" font-size="10" font-family="monospace" fill="#EF6C00">DELETE /users/123</text>
<rect x="510" y="360" width="230" height="45" fill="#F3E5F5"/>
<text x="625" y="380" text-anchor="middle" font-size="10" fill="#666">删除资源</text>
<text x="625" y="395" text-anchor="middle" font-size="9" fill="#4CAF50">返回 204 No Content</text>
</svg>

4. **RESTful API 示例**

**用户管理 API:**
```
# 获取用户列表 (支持分页、过滤、排序)
GET /api/v1/users?page=1&limit=20&age=18&sort=name

# 获取单个用户
GET /api/v1/users/123

# 创建用户
POST /api/v1/users
Body: {"name": "张三", "email": "zhangsan@example.com"}
Response: 201 Created, {"id": 124, "name": "张三", ...}

# 完整更新用户
PUT /api/v1/users/123
Body: {"name": "李四", "email": "lisi@example.com", "age": 25}

# 部分更新用户
PATCH /api/v1/users/123
Body: {"age": 26}

# 删除用户
DELETE /api/v1/users/123
Response: 204 No Content

# 获取用户的文章
GET /api/v1/users/123/posts

# 获取用户的第一篇文章
GET /api/v1/users/123/posts/1
```

**标准响应格式:**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 123,
    "name": "张三",
    "email": "zhangsan@example.com",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

5. **RESTful vs 非 RESTful 对比**

| 对比项 | RESTful | 非 RESTful |
|--------|---------|-----------|
| **URL 设计** | `/users/123` | `/getUser?id=123` |
| **HTTP 方法** | GET/POST/PUT/DELETE | 全用 POST |
| **状态** | 无状态 | 可能有状态(Session) |
| **响应格式** | JSON/XML (统一) | 不固定 |
| **错误处理** | HTTP 状态码 | 自定义错误码 |
| **可缓存性** | 支持 HTTP 缓存 | 通常不支持 |
| **优点** | 标准、易理解、可缓存 | 灵活 |
| **缺点** | 复杂场景表达受限 | 不规范、难维护 |

**关键要点**

1. **资源导向**: 用名词表示资源,避免动词
2. **统一接口**: 使用标准 HTTP 方法操作资源
3. **无状态**: 每个请求独立,服务器不保存客户端状态
4. **合理状态码**: 用 HTTP 状态码表示操作结果
5. **版本管理**: API 应有版本控制机制

**记忆口诀**

"**资源名词统一口,无状态码缓存走**"
- **资源名词**: 资源导向,用名词不用动词
- **统一口**: 统一接口,标准 HTTP 方法
- **无状态**: 无状态设计
- **码**: HTTP 状态码
- **缓存走**: 支持缓存机制

### 100. 什么是 RPC?RPC 和 HTTP 的区别是什么?

**核心答案**

RPC (Remote Procedure Call,远程过程调用) 是一种通信协议,允许程序像调用本地函数一样调用远程服务器上的函数,对开发者屏蔽底层网络通信细节。RPC 和 HTTP 的主要区别:①**层级不同**:RPC 是应用层协议,HTTP 是传输协议;②**调用方式**:RPC 面向方法,HTTP 面向资源;③**性能**:RPC 通常更高效(二进制协议);④**耦合度**:RPC 强耦合,HTTP 松耦合。

**详细说明**

1. **RPC 工作原理**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-rpc" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#2196F3"/></marker></defs>
<rect x="20" y="20" width="760" height="460" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">RPC 调用流程</text>
<rect x="50" y="90" width="180" height="360" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="140" y="120" text-anchor="middle" font-size="15" fill="#1565C0" font-weight="bold">客户端 (Caller)</text>
<rect x="70" y="140" width="140" height="50" rx="3" fill="#BBDEFB" stroke="#1976D2" stroke-width="1"/>
<text x="140" y="160" text-anchor="middle" font-size="12" fill="#0D47A1">业务代码</text>
<text x="140" y="178" text-anchor="middle" font-size="10" font-family="monospace" fill="#1565C0">result = add(3, 5)</text>
<line x1="140" y1="190" x2="140" y2="210" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow-rpc)"/>
<rect x="70" y="210" width="140" height="40" rx="3" fill="#90CAF9" stroke="#1976D2" stroke-width="1"/>
<text x="140" y="233" text-anchor="middle" font-size="11" fill="#0D47A1" font-weight="bold">① Client Stub</text>
<text x="140" y="246" text-anchor="middle" font-size="9" fill="#666">(代理对象)</text>
<line x1="140" y1="250" x2="140" y2="270" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow-rpc)"/>
<rect x="70" y="270" width="140" height="40" rx="3" fill="#64B5F6" stroke="#1976D2" stroke-width="1"/>
<text x="140" y="293" text-anchor="middle" font-size="11" fill="#0D47A1" font-weight="bold">② 序列化</text>
<text x="140" y="306" text-anchor="middle" font-size="9" fill="#666">(Marshal)</text>
<line x1="140" y1="310" x2="140" y2="330" stroke="#2196F3" stroke-width="2" marker-end="url(#arrow-rpc)"/>
<rect x="70" y="330" width="140" height="40" rx="3" fill="#42A5F5" stroke="#1976D2" stroke-width="1"/>
<text x="140" y="353" text-anchor="middle" font-size="11" fill="white" font-weight="bold">③ 网络传输</text>
<text x="140" y="366" text-anchor="middle" font-size="9" fill="#E3F2FD">(TCP/UDP)</text>
<rect x="570" y="90" width="180" height="360" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="660" y="120" text-anchor="middle" font-size="15" fill="#2E7D32" font-weight="bold">服务端 (Callee)</text>
<rect x="590" y="330" width="140" height="40" rx="3" fill="#81C784" stroke="#388E3C" stroke-width="1"/>
<text x="660" y="353" text-anchor="middle" font-size="11" fill="white" font-weight="bold">④ 接收请求</text>
<text x="660" y="366" text-anchor="middle" font-size="9" fill="#E8F5E9">(Network)</text>
<line x1="660" y1="330" x2="660" y2="310" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-rpc)"/>
<rect x="590" y="270" width="140" height="40" rx="3" fill="#66BB6A" stroke="#388E3C" stroke-width="1"/>
<text x="660" y="293" text-anchor="middle" font-size="11" fill="white" font-weight="bold">⑤ 反序列化</text>
<text x="660" y="306" text-anchor="middle" font-size="9" fill="#E8F5E9">(Unmarshal)</text>
<line x1="660" y1="270" x2="660" y2="250" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-rpc)"/>
<rect x="590" y="210" width="140" height="40" rx="3" fill="#4CAF50" stroke="#388E3C" stroke-width="1"/>
<text x="660" y="233" text-anchor="middle" font-size="11" fill="white" font-weight="bold">⑥ Server Stub</text>
<text x="660" y="246" text-anchor="middle" font-size="9" fill="#E8F5E9">(调用本地函数)</text>
<line x1="660" y1="210" x2="660" y2="190" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-rpc)"/>
<rect x="590" y="140" width="140" height="50" rx="3" fill="#C8E6C9" stroke="#388E3C" stroke-width="1"/>
<text x="660" y="160" text-anchor="middle" font-size="12" fill="#1B5E20">实际函数</text>
<text x="660" y="178" text-anchor="middle" font-size="10" font-family="monospace" fill="#2E7D32">return a + b</text>
<line x1="210" y1="350" x2="585" y2="350" stroke="#FF9800" stroke-width="3" marker-end="url(#arrow-rpc)"/>
<text x="400" y="340" text-anchor="middle" font-size="12" fill="#F57C00" font-weight="bold">请求: add(3, 5)</text>
<line x1="585" y1="370" x2="210" y2="370" stroke="#4CAF50" stroke-width="3" marker-end="url(#arrow-rpc)"/>
<text x="400" y="390" text-anchor="middle" font-size="12" fill="#2E7D32" font-weight="bold">响应: 8</text>
<rect x="260" y="180" width="280" height="150" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="400" y="210" text-anchor="middle" font-size="13" fill="#F57C00" font-weight="bold">网络传输层</text>
<text x="400" y="235" text-anchor="middle" font-size="11" fill="#666">协议: gRPC / Dubbo / Thrift</text>
<text x="400" y="255" text-anchor="middle" font-size="11" fill="#666">序列化: Protobuf / JSON</text>
<text x="400" y="275" text-anchor="middle" font-size="11" fill="#666">传输: HTTP/2 / TCP</text>
<text x="400" y="295" text-anchor="middle" font-size="10" fill="#999">对开发者透明</text>
<text x="400" y="315" text-anchor="middle" font-size="9" fill="#E65100" font-weight="bold">像调用本地函数一样调用远程服务</text>
</svg>

2. **RPC vs HTTP 对比**

<svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="660" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">RPC vs HTTP 详细对比</text>
<line x1="400" y="75" x2="400" y="665" stroke="#BDBDBD" stroke-width="2"/>
<text x="210" y="95" text-anchor="middle" font-size="16" font-weight="bold" fill="#2196F3">RPC</text>
<text x="590" y="95" text-anchor="middle" font-size="16" font-weight="bold" fill="#FF9800">HTTP (REST)</text>
<rect x="50" y="110" width="320" height="70" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="70" y="135" font-size="13" fill="#1565C0" font-weight="bold">调用方式:</text>
<text x="210" y="135" text-anchor="middle" font-size="12" fill="#333">面向方法/过程</text>
<text x="210" y="155" text-anchor="middle" font-size="11" font-family="monospace" fill="#1976D2">userService.getUser(123)</text>
<text x="210" y="170" text-anchor="middle" font-size="10" fill="#666">像调用本地函数</text>
<rect x="430" y="110" width="320" height="70" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="450" y="135" font-size="13" fill="#F57C00" font-weight="bold">调用方式:</text>
<text x="590" y="135" text-anchor="middle" font-size="12" fill="#333">面向资源</text>
<text x="590" y="155" text-anchor="middle" font-size="11" font-family="monospace" fill="#EF6C00">GET /users/123</text>
<text x="590" y="170" text-anchor="middle" font-size="10" fill="#666">HTTP 请求操作资源</text>
<rect x="50" y="195" width="320" height="70" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="70" y="220" font-size="13" fill="#1565C0" font-weight="bold">传输协议:</text>
<text x="210" y="220" text-anchor="middle" font-size="12" fill="#333">通常基于 TCP</text>
<text x="210" y="240" text-anchor="middle" font-size="11" fill="#666">可用 HTTP/2, WebSocket</text>
<text x="210" y="255" text-anchor="middle" font-size="10" fill="#4CAF50">✓ 长连接,性能高</text>
<rect x="430" y="195" width="320" height="70" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="450" y="220" font-size="13" fill="#F57C00" font-weight="bold">传输协议:</text>
<text x="590" y="220" text-anchor="middle" font-size="12" fill="#333">基于 HTTP/1.1</text>
<text x="590" y="240" text-anchor="middle" font-size="11" fill="#666">短连接(可用 Keep-Alive)</text>
<text x="590" y="255" text-anchor="middle" font-size="10" fill="#F44336">✗ 每次请求有开销</text>
<rect x="50" y="280" width="320" height="70" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="70" y="305" font-size="13" fill="#1565C0" font-weight="bold">数据格式:</text>
<text x="210" y="305" text-anchor="middle" font-size="12" fill="#333">二进制协议</text>
<text x="210" y="325" text-anchor="middle" font-size="11" fill="#666">Protobuf, Thrift, Avro</text>
<text x="210" y="340" text-anchor="middle" font-size="10" fill="#4CAF50">✓ 体积小,速度快</text>
<rect x="430" y="280" width="320" height="70" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="450" y="305" font-size="13" fill="#F57C00" font-weight="bold">数据格式:</text>
<text x="590" y="305" text-anchor="middle" font-size="12" fill="#333">文本协议</text>
<text x="590" y="325" text-anchor="middle" font-size="11" fill="#666">JSON, XML</text>
<text x="590" y="340" text-anchor="middle" font-size="10" fill="#F44336">✗ 可读但体积大</text>
<rect x="50" y="365" width="320" height="70" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="70" y="390" font-size="13" fill="#1565C0" font-weight="bold">性能:</text>
<text x="210" y="390" text-anchor="middle" font-size="12" fill="#4CAF50" font-weight="bold">高性能</text>
<text x="210" y="410" text-anchor="middle" font-size="10" fill="#666">• 二进制传输</text>
<text x="210" y="425" text-anchor="middle" font-size="10" fill="#666">• 长连接复用</text>
<rect x="430" y="365" width="320" height="70" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="450" y="390" font-size="13" fill="#F57C00" font-weight="bold">性能:</text>
<text x="590" y="390" text-anchor="middle" font-size="12" fill="#FF9800" font-weight="bold">中等性能</text>
<text x="590" y="410" text-anchor="middle" font-size="10" fill="#666">• 文本传输开销大</text>
<text x="590" y="425" text-anchor="middle" font-size="10" fill="#666">• HTTP 头部开销</text>
<rect x="50" y="450" width="320" height="70" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="70" y="475" font-size="13" fill="#1565C0" font-weight="bold">耦合度:</text>
<text x="210" y="475" text-anchor="middle" font-size="12" fill="#F44336">强耦合</text>
<text x="210" y="495" text-anchor="middle" font-size="10" fill="#666">需要客户端和服务端</text>
<text x="210" y="510" text-anchor="middle" font-size="10" fill="#666">共享接口定义(IDL)</text>
<rect x="430" y="450" width="320" height="70" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="450" y="475" font-size="13" fill="#F57C00" font-weight="bold">耦合度:</text>
<text x="590" y="475" text-anchor="middle" font-size="12" fill="#4CAF50">松耦合</text>
<text x="590" y="495" text-anchor="middle" font-size="10" fill="#666">基于标准 HTTP</text>
<text x="590" y="510" text-anchor="middle" font-size="10" fill="#666">任何语言都可调用</text>
<rect x="50" y="535" width="320" height="110" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="70" y="560" font-size="13" fill="#1565C0" font-weight="bold">适用场景:</text>
<text x="210" y="582" text-anchor="middle" font-size="11" fill="#666">• 微服务内部通信</text>
<text x="210" y="599" text-anchor="middle" font-size="11" fill="#666">• 高性能要求</text>
<text x="210" y="616" text-anchor="middle" font-size="11" fill="#666">• 同一组织内系统</text>
<text x="210" y="633" text-anchor="middle" font-size="11" fill="#666">• 实时性要求高</text>
<rect x="430" y="535" width="320" height="110" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="450" y="560" font-size="13" fill="#F57C00" font-weight="bold">适用场景:</text>
<text x="590" y="582" text-anchor="middle" font-size="11" fill="#666">• 对外开放 API</text>
<text x="590" y="599" text-anchor="middle" font-size="11" fill="#666">• Web 前端调用</text>
<text x="590" y="616" text-anchor="middle" font-size="11" fill="#666">• 跨组织系统集成</text>
<text x="590" y="633" text-anchor="middle" font-size="11" fill="#666">• 需要人类可读</text>
</svg>

3. **常见 RPC 框架**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="410" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">主流 RPC 框架</text>
<rect x="50" y="80" width="220" height="150" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="160" y="110" text-anchor="middle" font-size="15" fill="#1565C0" font-weight="bold">gRPC (Google)</text>
<rect x="60" y="125" width="200" height="90" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="160" y="148" text-anchor="middle" font-size="11" fill="#666">• 基于 HTTP/2</text>
<text x="160" y="165" text-anchor="middle" font-size="11" fill="#666">• Protobuf 序列化</text>
<text x="160" y="182" text-anchor="middle" font-size="11" fill="#666">• 多语言支持</text>
<text x="160" y="199" text-anchor="middle" font-size="11" fill="#4CAF50">✓ 性能优秀,流式传输</text>
<rect x="290" y="80" width="220" height="150" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="400" y="110" text-anchor="middle" font-size="15" fill="#2E7D32" font-weight="bold">Dubbo (阿里)</text>
<rect x="300" y="125" width="200" height="90" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="400" y="148" text-anchor="middle" font-size="11" fill="#666">• Java 生态</text>
<text x="400" y="165" text-anchor="middle" font-size="11" fill="#666">• 基于 TCP</text>
<text x="400" y="182" text-anchor="middle" font-size="11" fill="#666">• 服务治理完善</text>
<text x="400" y="199" text-anchor="middle" font-size="11" fill="#4CAF50">✓ 中国企业首选</text>
<rect x="530" y="80" width="220" height="150" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="640" y="110" text-anchor="middle" font-size="15" fill="#F57C00" font-weight="bold">Thrift (Facebook)</text>
<rect x="540" y="125" width="200" height="90" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="640" y="148" text-anchor="middle" font-size="11" fill="#666">• 跨语言 IDL</text>
<text x="640" y="165" text-anchor="middle" font-size="11" fill="#666">• 多种传输协议</text>
<text x="640" y="182" text-anchor="middle" font-size="11" fill="#666">• 灵活的序列化</text>
<text x="640" y="199" text-anchor="middle" font-size="11" fill="#4CAF50">✓ 企业级应用</text>
<rect x="50" y="250" width="220" height="150" rx="5" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2"/>
<text x="160" y="280" text-anchor="middle" font-size="15" fill="#7B1FA2" font-weight="bold">JSON-RPC</text>
<rect x="60" y="295" width="200" height="90" rx="3" fill="white" stroke="#BA68C8" stroke-width="1"/>
<text x="160" y="318" text-anchor="middle" font-size="11" fill="#666">• 基于 JSON</text>
<text x="160" y="335" text-anchor="middle" font-size="11" fill="#666">• 轻量级</text>
<text x="160" y="352" text-anchor="middle" font-size="11" fill="#666">• HTTP 传输</text>
<text x="160" y="369" text-anchor="middle" font-size="11" fill="#FF9800">⚠️ 性能一般</text>
<rect x="290" y="250" width="220" height="150" rx="5" fill="#FFF9C4" stroke="#FBC02D" stroke-width="2"/>
<text x="400" y="280" text-anchor="middle" font-size="15" fill="#F57F17" font-weight="bold">tRPC (腾讯)</text>
<rect x="300" y="295" width="200" height="90" rx="3" fill="white" stroke="#FFE082" stroke-width="1"/>
<text x="400" y="318" text-anchor="middle" font-size="11" fill="#666">• Go 微服务框架</text>
<text x="400" y="335" text-anchor="middle" font-size="11" fill="#666">• 插件化设计</text>
<text x="400" y="352" text-anchor="middle" font-size="11" fill="#666">• 多协议支持</text>
<text x="400" y="369" text-anchor="middle" font-size="11" fill="#4CAF50">✓ 云原生友好</text>
<rect x="530" y="250" width="220" height="150" rx="5" fill="#FFCCBC" stroke="#FF5722" stroke-width="2"/>
<text x="640" y="280" text-anchor="middle" font-size="15" fill="#D84315" font-weight="bold">HTTP/REST</text>
<rect x="540" y="295" width="200" height="90" rx="3" fill="white" stroke="#FF8A65" stroke-width="1"/>
<text x="640" y="318" text-anchor="middle" font-size="11" fill="#666">• 标准 HTTP</text>
<text x="640" y="335" text-anchor="middle" font-size="11" fill="#666">• JSON 格式</text>
<text x="640" y="352" text-anchor="middle" font-size="11" fill="#666">• RESTful 设计</text>
<text x="640" y="369" text-anchor="middle" font-size="11" fill="#2196F3">✓ 通用性最强</text>
</svg>

4. **gRPC 示例**

**定义接口 (Protobuf):**
```protobuf
// user.proto
syntax = "proto3";

service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc CreateUser(CreateUserRequest) returns (User);
}

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}

message GetUserRequest {
  int32 id = 1;
}
```

**服务端实现 (Go):**
```go
type server struct {
    pb.UnimplementedUserServiceServer
}

func (s *server) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.User, error) {
    // 查询数据库
    user := &pb.User{
        Id:    req.Id,
        Name:  "张三",
        Email: "zhangsan@example.com",
    }
    return user, nil
}
```

**客户端调用:**
```go
conn, _ := grpc.Dial("localhost:50051", grpc.WithInsecure())
client := pb.NewUserServiceClient(conn)

// 像调用本地函数一样
user, err := client.GetUser(context.Background(), &pb.GetUserRequest{Id: 123})
fmt.Println(user.Name) // 张三
```

5. **RPC vs HTTP 选择建议**

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| **微服务内部通信** | RPC (gRPC/Dubbo) | 高性能、类型安全 |
| **对外开放 API** | HTTP (REST) | 通用性、易调试 |
| **移动端调用** | HTTP (REST) | 简单、防火墙友好 |
| **实时通信** | gRPC (双向流) | 支持流式传输 |
| **Java 生态** | Dubbo | 完善的服务治理 |
| **多语言环境** | gRPC | 官方支持多语言 |
| **简单 CRUD** | HTTP (REST) | 开发效率高 |
| **高并发场景** | RPC | 性能更优 |

6. **混合使用**

现代架构常同时使用 RPC 和 HTTP:
- **内部服务**: 使用 RPC (gRPC/Dubbo) 提升性能
- **API 网关**: 对外提供 HTTP RESTful API
- **BFF 层**: 聚合多个 RPC 服务,统一对外 HTTP 接口

```
移动端/Web → HTTP → API 网关 → gRPC → 微服务 A
                              ↓ gRPC → 微服务 B
                              ↓ gRPC → 微服务 C
```

**关键要点**

1. **RPC 更高效**: 二进制协议、长连接,性能优于 HTTP
2. **HTTP 更通用**: 标准协议,任何语言可调用
3. **RPC 需 IDL**: 接口定义语言(Protobuf 等)定义契约
4. **选择看场景**: 内部用 RPC,对外用 HTTP
5. **不是对立**: 可以混合使用,发挥各自优势

**记忆口诀**

"**RPC 方法快耦合,HTTP 资源慢通用**"
- **RPC 方法**: 面向方法调用
- **快**: 性能更高(二进制、长连接)
- **耦合**: 强耦合,需共享接口定义
- **HTTP 资源**: 面向资源操作
- **慢**: 相对较慢(文本协议、HTTP 开销)
- **通用**: 松耦合,通用性强
