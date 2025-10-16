## 网络安全

### 78. 什么是 XSS 攻击?如何防止?

**核心答案**

XSS (Cross-Site Scripting,跨站脚本攻击) 是一种代码注入攻击,攻击者通过在网页中注入恶意脚本,当其他用户浏览该网页时,恶意脚本在用户浏览器中执行,从而窃取用户信息、劫持会话或进行钓鱼攻击。

**详细说明**

1. **XSS 攻击类型**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-xss" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#E53935"/></marker></defs>
<rect x="20" y="20" width="760" height="410" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="50" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">XSS 攻击三大类型</text>
<rect x="50" y="80" width="220" height="330" rx="5" fill="#FFEBEE" stroke="#E53935" stroke-width="2"/>
<text x="160" y="110" text-anchor="middle" font-size="16" font-weight="bold" fill="#C62828">存储型 XSS</text>
<text x="160" y="130" text-anchor="middle" font-size="12" fill="#666">(Stored XSS)</text>
<rect x="60" y="145" width="200" height="120" rx="3" fill="white" stroke="#E57373" stroke-width="1"/>
<text x="160" y="165" text-anchor="middle" font-size="13" font-weight="bold" fill="#D32F2F">攻击流程:</text>
<text x="70" y="185" font-size="11" fill="#666">① 攻击者提交恶意脚本</text>
<text x="70" y="203" font-size="11" fill="#666">② 服务器存储到数据库</text>
<text x="70" y="221" font-size="11" fill="#666">③ 用户访问页面</text>
<text x="70" y="239" font-size="11" fill="#666">④ 服务器返回含恶意脚本</text>
<text x="70" y="257" font-size="11" fill="#666">⑤ 浏览器执行恶意脚本</text>
<rect x="60" y="275" width="200" height="60" rx="3" fill="#FFF8E1" stroke="#FFA726" stroke-width="1"/>
<text x="160" y="293" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">危害等级: ⚠️⚠️⚠️</text>
<text x="70" y="310" font-size="10" fill="#666">影响范围: 所有访问用户</text>
<text x="70" y="325" font-size="10" fill="#666">典型场景: 论坛、评论</text>
<rect x="290" y="80" width="220" height="330" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="400" y="110" text-anchor="middle" font-size="16" font-weight="bold" fill="#EF6C00">反射型 XSS</text>
<text x="400" y="130" text-anchor="middle" font-size="12" fill="#666">(Reflected XSS)</text>
<rect x="300" y="145" width="200" height="120" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="400" y="165" text-anchor="middle" font-size="13" font-weight="bold" fill="#F57C00">攻击流程:</text>
<text x="310" y="185" font-size="11" fill="#666">① 攻击者构造恶意URL</text>
<text x="310" y="203" font-size="11" fill="#666">② 诱骗用户点击链接</text>
<text x="310" y="221" font-size="11" fill="#666">③ 服务器返回含参数页面</text>
<text x="310" y="239" font-size="11" fill="#666">④ 浏览器执行恶意脚本</text>
<text x="310" y="257" font-size="11" fill="#666">⑤ 窃取用户信息</text>
<rect x="300" y="275" width="200" height="60" rx="3" fill="#FFF8E1" stroke="#FFA726" stroke-width="1"/>
<text x="400" y="293" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">危害等级: ⚠️⚠️</text>
<text x="310" y="310" font-size="10" fill="#666">影响范围: 点击链接用户</text>
<text x="310" y="325" font-size="10" fill="#666">典型场景: 搜索框、错误页</text>
<rect x="530" y="80" width="220" height="330" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="640" y="110" text-anchor="middle" font-size="16" font-weight="bold" fill="#2E7D32">DOM 型 XSS</text>
<text x="640" y="130" text-anchor="middle" font-size="12" fill="#666">(DOM-based XSS)</text>
<rect x="540" y="145" width="200" height="120" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="640" y="165" text-anchor="middle" font-size="13" font-weight="bold" fill="#388E3C">攻击流程:</text>
<text x="550" y="185" font-size="11" fill="#666">① 攻击者构造恶意URL</text>
<text x="550" y="203" font-size="11" fill="#666">② 用户点击访问页面</text>
<text x="550" y="221" font-size="11" fill="#666">③ 浏览器解析 DOM</text>
<text x="550" y="239" font-size="11" fill="#666">④ 前端 JS 提取参数</text>
<text x="550" y="257" font-size="11" fill="#666">⑤ 执行恶意代码</text>
<rect x="540" y="275" width="200" height="60" rx="3" fill="#FFF8E1" stroke="#FFA726" stroke-width="1"/>
<text x="640" y="293" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">危害等级: ⚠️⚠️</text>
<text x="550" y="310" font-size="10" fill="#666">影响范围: 点击链接用户</text>
<text x="550" y="325" font-size="10" fill="#666">特点: 不经过服务器</text>
<rect x="65" y="345" width="190" height="50" rx="3" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="160" y="363" text-anchor="middle" font-size="10" fill="#555">示例:</text>
<text x="160" y="378" text-anchor="middle" font-size="9" font-family="monospace" fill="#1565C0">&lt;script&gt;alert('XSS')&lt;/script&gt;</text>
<text x="160" y="391" text-anchor="middle" font-size="9" fill="#666">存储在数据库中</text>
<rect x="305" y="345" width="190" height="50" rx="3" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="400" y="363" text-anchor="middle" font-size="10" fill="#555">示例:</text>
<text x="400" y="378" text-anchor="middle" font-size="8" font-family="monospace" fill="#1565C0">?name=&lt;script&gt;...&lt;/script&gt;</text>
<text x="400" y="391" text-anchor="middle" font-size="9" fill="#666">通过 URL 参数传递</text>
<rect x="545" y="345" width="190" height="50" rx="3" fill="#E3F2FD" stroke="#2196F3" stroke-width="1"/>
<text x="640" y="363" text-anchor="middle" font-size="10" fill="#555">示例:</text>
<text x="640" y="378" text-anchor="middle" font-size="8" font-family="monospace" fill="#1565C0">#&lt;script&gt;...&lt;/script&gt;</text>
<text x="640" y="391" text-anchor="middle" font-size="9" fill="#666">通过 Hash 或 JS 处理</text>
</svg>

2. **XSS 攻击危害**
   - 窃取 Cookie 和 Session: `document.cookie`
   - 劫持用户会话: 冒充用户身份操作
   - 网页挂马: 植入恶意软件下载链接
   - 钓鱼攻击: 伪造登录框窃取密码
   - 键盘记录: 监听用户输入
   - 页面篡改: 修改页面内容进行欺诈
   - 传播蠕虫: 自动发送含恶意脚本的消息

3. **XSS 防御措施**

<svg viewBox="0 0 750 520" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="710" height="480" rx="8" fill="#FAFAFA" stroke="#388E3C" stroke-width="3"/>
<text x="375" y="50" text-anchor="middle" font-size="18" font-weight="bold" fill="#2E7D32">XSS 防御策略</text>
<rect x="50" y="80" width="310" height="200" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="205" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#2E7D32">1️⃣ 输入过滤与验证</text>
<text x="60" y="135" font-size="12" fill="#333">✓ 白名单验证</text>
<text x="70" y="152" font-size="10" fill="#666">- 只允许特定字符(如字母数字)</text>
<text x="60" y="172" font-size="12" fill="#333">✓ 输入长度限制</text>
<text x="70" y="189" font-size="10" fill="#666">- 限制输入内容长度</text>
<text x="60" y="209" font-size="12" fill="#333">✓ 类型检查</text>
<text x="70" y="226" font-size="10" fill="#666">- 验证邮箱、URL、电话等格式</text>
<text x="60" y="246" font-size="12" fill="#333">✓ 移除危险标签</text>
<text x="70" y="263" font-size="10" fill="#666">- 过滤 &lt;script&gt;、&lt;iframe&gt; 等</text>
<rect x="390" y="80" width="310" height="200" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="545" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976D2">2️⃣ 输出编码</text>
<text x="400" y="135" font-size="12" fill="#333">✓ HTML 实体编码</text>
<text x="410" y="152" font-size="10" fill="#666">- &lt; → &amp;lt;  &gt; → &amp;gt;</text>
<text x="400" y="172" font-size="12" fill="#333">✓ JavaScript 编码</text>
<text x="410" y="189" font-size="10" fill="#666">- 转义特殊字符 \' \" \\ 等</text>
<text x="400" y="209" font-size="12" fill="#333">✓ URL 编码</text>
<text x="410" y="226" font-size="10" fill="#666">- encodeURIComponent()</text>
<text x="400" y="246" font-size="12" fill="#333">✓ CSS 编码</text>
<text x="410" y="263" font-size="10" fill="#666">- 避免在样式中插入用户输入</text>
<rect x="50" y="300" width="310" height="180" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="205" y="330" text-anchor="middle" font-size="15" font-weight="bold" fill="#F57C00">3️⃣ HTTP 安全头</text>
<text x="60" y="355" font-size="12" fill="#333">✓ Content-Security-Policy</text>
<text x="70" y="372" font-size="10" fill="#666">- 限制资源加载来源</text>
<text x="70" y="387" font-size="9" font-family="monospace" fill="#E65100">default-src 'self'</text>
<text x="60" y="407" font-size="12" fill="#333">✓ X-XSS-Protection</text>
<text x="70" y="424" font-size="10" fill="#666">- 启用浏览器 XSS 过滤器</text>
<text x="60" y="444" font-size="12" fill="#333">✓ X-Content-Type-Options</text>
<text x="70" y="461" font-size="10" fill="#666">- 防止 MIME 类型嗅探</text>
<rect x="390" y="300" width="310" height="180" rx="5" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2"/>
<text x="545" y="330" text-anchor="middle" font-size="15" font-weight="bold" fill="#7B1FA2">4️⃣ Cookie 安全</text>
<text x="400" y="355" font-size="12" fill="#333">✓ HttpOnly 标志</text>
<text x="410" y="372" font-size="10" fill="#666">- 禁止 JS 访问 Cookie</text>
<text x="410" y="387" font-size="9" font-family="monospace" fill="#6A1B9A">Set-Cookie: id=123; HttpOnly</text>
<text x="400" y="407" font-size="12" fill="#333">✓ Secure 标志</text>
<text x="410" y="424" font-size="10" fill="#666">- 仅通过 HTTPS 传输</text>
<text x="400" y="444" font-size="12" fill="#333">✓ SameSite 属性</text>
<text x="410" y="461" font-size="10" fill="#666">- 限制跨站请求携带 Cookie</text>
</svg>

4. **实战防御代码示例**

**前端防御:**
```javascript
// HTML 转义
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 使用 textContent 而非 innerHTML
element.textContent = userInput;  // ✓ 安全
// element.innerHTML = userInput;  // ✗ 危险
```

**后端防御 (Java):**
```java
// 使用 OWASP Java Encoder
import org.owasp.encoder.Encode;

String safe = Encode.forHtml(userInput);
```

**CSP 配置:**
```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-随机值';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
```

5. **防御最佳实践**

| 防御措施 | 适用场景 | 效果 |
|---------|---------|------|
| **输入验证** | 所有用户输入 | ⭐⭐⭐ |
| **输出编码** | 显示用户内容 | ⭐⭐⭐⭐⭐ |
| **CSP** | 现代浏览器 | ⭐⭐⭐⭐ |
| **HttpOnly** | Cookie 保护 | ⭐⭐⭐⭐ |
| **模板引擎** | 自动转义 | ⭐⭐⭐⭐⭐ |

**关键要点**

1. **永远不信任用户输入**: 对所有输入进行验证和过滤
2. **输出编码是核心**: 根据上下文选择合适的编码方式
3. **多层防御**: 结合输入验证、输出编码、CSP、HttpOnly 等
4. **使用安全框架**: React/Vue 等框架默认转义内容
5. **定期安全审计**: 使用工具扫描潜在 XSS 漏洞

**记忆口诀**

"**入口过滤出口编,CSP 头部 Cookie 防**"
- **入口过滤**: 输入验证和过滤
- **出口编**: 输出时进行 HTML 编码
- **CSP 头部**: 使用内容安全策略
- **Cookie 防**: Cookie 设置 HttpOnly、Secure、SameSite

### 79. 什么是 CSRF 攻击?如何防止?

**核心答案**

CSRF (Cross-Site Request Forgery,跨站请求伪造) 是一种劫持用户身份,在用户不知情的情况下,利用用户的登录状态向目标网站发送恶意请求的攻击方式。攻击者诱导用户访问恶意网站,该网站自动向目标网站发送请求,利用用户的身份执行未授权操作。

**详细说明**

1. **CSRF 攻击原理**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-csrf" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#E53935"/></marker><marker id="arrow-csrf-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#1976D2"/></marker></defs>
<rect x="20" y="20" width="760" height="410" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="50" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">CSRF 攻击流程</text>
<circle cx="100" cy="150" r="45" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="100" y="145" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976D2">用户</text>
<text x="100" y="165" text-anchor="middle" font-size="11" fill="#666">(已登录)</text>
<rect x="300" y="100" width="180" height="100" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="390" y="130" text-anchor="middle" font-size="14" font-weight="bold" fill="#2E7D32">银行网站</text>
<text x="390" y="150" text-anchor="middle" font-size="11" fill="#666">bank.com</text>
<text x="390" y="175" text-anchor="middle" font-size="10" fill="#4CAF50">✓ 用户已认证</text>
<text x="390" y="190" text-anchor="middle" font-size="10" fill="#999">Cookie: session=abc123</text>
<rect x="550" y="100" width="180" height="100" rx="5" fill="#FFEBEE" stroke="#E53935" stroke-width="3"/>
<text x="640" y="130" text-anchor="middle" font-size="14" font-weight="bold" fill="#C62828">恶意网站</text>
<text x="640" y="150" text-anchor="middle" font-size="11" fill="#666">evil.com</text>
<text x="640" y="175" text-anchor="middle" font-size="10" fill="#E53935">⚠️ 攻击者控制</text>
<line x1="145" y1="150" x2="295" y2="150" stroke="#4CAF50" stroke-width="2" marker-end="url(#arrow-csrf-blue)"/>
<text x="220" y="140" text-anchor="middle" font-size="11" fill="#2E7D32" font-weight="bold">① 正常登录</text>
<text x="220" y="155" text-anchor="middle" font-size="9" fill="#666">获得 Session</text>
<rect x="80" y="240" width="40" height="30" rx="3" fill="#FFF3E0" stroke="#FF9800" stroke-width="1"/>
<text x="100" y="260" text-anchor="middle" font-size="10">🎣</text>
<line x1="120" y1="255" x2="545" y2="180" stroke="#FF5722" stroke-width="2" marker-end="url(#arrow-csrf)" stroke-dasharray="5,5"/>
<text x="330" y="210" font-size="11" fill="#D84315" font-weight="bold">② 访问恶意网站</text>
<text x="330" y="225" font-size="9" fill="#666">(点击钓鱼链接/邮件)</text>
<rect x="560" y="230" width="160" height="140" rx="5" fill="#FFF8E1" stroke="#FFA726" stroke-width="2"/>
<text x="640" y="255" text-anchor="middle" font-size="12" font-weight="bold" fill="#F57C00">恶意页面代码</text>
<rect x="570" y="265" width="140" height="95" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="640" y="280" text-anchor="middle" font-size="9" font-family="monospace" fill="#E65100">&lt;img src=</text>
<text x="640" y="293" text-anchor="middle" font-size="9" font-family="monospace" fill="#E65100">"bank.com/transfer</text>
<text x="640" y="306" text-anchor="middle" font-size="9" font-family="monospace" fill="#E65100">?to=attacker</text>
<text x="640" y="319" text-anchor="middle" font-size="9" font-family="monospace" fill="#E65100">&amount=10000"</text>
<text x="640" y="332" text-anchor="middle" font-size="9" font-family="monospace" fill="#E65100">/&gt;</text>
<text x="640" y="350" text-anchor="middle" font-size="8" fill="#999">自动发送请求</text>
<line x1="560" y1="300" x2="485" y2="180" stroke="#E53935" stroke-width="3" marker-end="url(#arrow-csrf)"/>
<text x="500" y="230" font-size="11" fill="#C62828" font-weight="bold">③ 伪造转账请求</text>
<text x="480" y="245" font-size="9" fill="#666">携带用户 Cookie</text>
<text x="480" y="258" font-size="9" font-family="monospace" fill="#999">Cookie: session=abc123</text>
<rect x="310" y="290" width="160" height="80" rx="5" fill="#FFCDD2" stroke="#F44336" stroke-width="2"/>
<text x="390" y="315" text-anchor="middle" font-size="12" font-weight="bold" fill="#C62828">服务器误认为</text>
<text x="390" y="335" text-anchor="middle" font-size="10" fill="#666">✓ Cookie 有效</text>
<text x="390" y="350" text-anchor="middle" font-size="10" fill="#666">✓ 用户本人操作</text>
<text x="390" y="365" text-anchor="middle" font-size="10" fill="#E53935" font-weight="bold">✗ 执行转账!</text>
<rect x="50" y="390" width="180" height="40" rx="5" fill="#C8E6C9" stroke="#4CAF50" stroke-width="1"/>
<text x="140" y="410" text-anchor="middle" font-size="11" fill="#2E7D32" font-weight="bold">用户毫不知情</text>
<text x="140" y="423" text-anchor="middle" font-size="9" fill="#666">钱款已被转走</text>
<circle cx="720" cy="360" r="25" fill="#FFEBEE" stroke="#E53935" stroke-width="2"/>
<text x="720" y="368" text-anchor="middle" font-size="20">💰</text>
<text x="720" y="395" text-anchor="middle" font-size="10" fill="#C62828" font-weight="bold">攻击者得手</text>
</svg>

2. **CSRF 与 XSS 的区别**

| 维度 | CSRF | XSS |
|------|------|-----|
| **攻击方式** | 伪造用户请求 | 注入恶意脚本 |
| **执行位置** | 目标网站服务器 | 用户浏览器 |
| **利用对象** | 用户身份认证 | 网站信任用户输入 |
| **是否需要登录** | ✓ 必须已登录 | ✗ 不需要 |
| **能否窃取信息** | ✗ 无法获取响应 | ✓ 可读取页面数据 |
| **危害** | 执行未授权操作 | 窃取信息、劫持会话 |

3. **CSRF 攻击条件**
   - 用户已在目标网站登录(有有效 Session/Cookie)
   - 目标网站依赖 Cookie 进行身份认证
   - 攻击者能够构造合法的请求参数
   - 用户访问了攻击者控制的网页

4. **CSRF 防御措施**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="560" rx="8" fill="#FAFAFA" stroke="#2E7D32" stroke-width="3"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#2E7D32">CSRF 防御策略</text>
<rect x="50" y="80" width="340" height="220" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="220" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#2E7D32">1️⃣ CSRF Token (推荐)</text>
<rect x="60" y="125" width="320" height="160" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="220" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#388E3C">原理:</text>
<text x="70" y="170" font-size="11" fill="#666">① 服务器生成随机 Token</text>
<text x="70" y="188" font-size="11" fill="#666">② 存储在服务器 Session 中</text>
<text x="70" y="206" font-size="11" fill="#666">③ 表单中包含隐藏 Token 字段</text>
<text x="70" y="224" font-size="11" fill="#666">④ 提交时验证 Token 是否匹配</text>
<text x="70" y="242" font-size="11" fill="#666">⑤ 不匹配则拒绝请求</text>
<text x="220" y="265" text-anchor="middle" font-size="10" fill="#2E7D32" font-weight="bold">✓ 防御效果: ⭐⭐⭐⭐⭐</text>
<text x="220" y="278" text-anchor="middle" font-size="9" font-family="monospace" fill="#1B5E20">&lt;input name="csrf" value="随机值"/&gt;</text>
<rect x="410" y="80" width="340" height="220" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="580" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976D2">2️⃣ SameSite Cookie</text>
<rect x="420" y="125" width="320" height="160" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="580" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#1565C0">Cookie 属性:</text>
<text x="430" y="175" font-size="11" fill="#666">• SameSite=Strict</text>
<text x="440" y="192" font-size="10" fill="#999">完全禁止跨站发送 Cookie</text>
<text x="430" y="212" font-size="11" fill="#666">• SameSite=Lax (推荐)</text>
<text x="440" y="229" font-size="10" fill="#999">GET 导航允许,POST 禁止</text>
<text x="430" y="249" font-size="11" fill="#666">• SameSite=None</text>
<text x="440" y="266" font-size="10" fill="#999">允许跨站(需配合 Secure)</text>
<text x="580" y="285" text-anchor="middle" font-size="9" font-family="monospace" fill="#0D47A1">Set-Cookie: id=123; SameSite=Lax</text>
<rect x="50" y="320" width="340" height="240" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="220" y="350" text-anchor="middle" font-size="15" font-weight="bold" fill="#F57C00">3️⃣ Double Submit Cookie</text>
<rect x="60" y="365" width="320" height="180" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="220" y="390" text-anchor="middle" font-size="12" font-weight="bold" fill="#EF6C00">流程:</text>
<text x="70" y="410" font-size="11" fill="#666">① 生成随机值存入 Cookie</text>
<text x="70" y="428" font-size="11" fill="#666">② 同时放入表单隐藏字段</text>
<text x="70" y="446" font-size="11" fill="#666">③ 提交时对比两者是否一致</text>
<text x="70" y="464" font-size="11" fill="#666">④ 恶意网站无法读取 Cookie</text>
<text x="220" y="490" text-anchor="middle" font-size="10" fill="#F57C00" font-weight="bold">优势: 无需服务器存储</text>
<text x="220" y="507" text-anchor="middle" font-size="9" fill="#666">适合分布式系统</text>
<text x="220" y="530" text-anchor="middle" font-size="9" font-family="monospace" fill="#E65100">Cookie: csrf=abc</text>
<text x="220" y="543" text-anchor="middle" font-size="9" font-family="monospace" fill="#E65100">Form: csrf_token=abc</text>
<rect x="410" y="320" width="340" height="240" rx="5" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2"/>
<text x="580" y="350" text-anchor="middle" font-size="15" font-weight="bold" fill="#7B1FA2">4️⃣ Referer/Origin 验证</text>
<rect x="420" y="365" width="320" height="180" rx="3" fill="white" stroke="#BA68C8" stroke-width="1"/>
<text x="580" y="390" text-anchor="middle" font-size="12" font-weight="bold" fill="#6A1B9A">检查请求来源:</text>
<text x="430" y="415" font-size="11" fill="#666">✓ Referer 头</text>
<text x="440" y="432" font-size="10" fill="#999">验证请求来自同一域名</text>
<text x="440" y="447" font-size="9" font-family="monospace" fill="#4A148C">Referer: https://bank.com</text>
<text x="430" y="470" font-size="11" fill="#666">✓ Origin 头 (更可靠)</text>
<text x="440" y="487" font-size="10" fill="#999">只包含协议、域名、端口</text>
<text x="440" y="502" font-size="9" font-family="monospace" fill="#4A148C">Origin: https://bank.com</text>
<text x="580" y="525" text-anchor="middle" font-size="10" fill="#9C27B0" font-weight="bold">⚠️ 注意: 可能被伪造或隐藏</text>
<text x="580" y="540" text-anchor="middle" font-size="9" fill="#666">不应作为唯一防御手段</text>
</svg>

5. **防御代码示例**

**前端 - CSRF Token:**
```html
<!-- 在表单中包含 Token -->
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="<%= csrfToken %>" />
  <input type="text" name="amount" />
  <button type="submit">转账</button>
</form>
```

**后端验证 (Node.js):**
```javascript
// 使用 csurf 中间件
const csrf = require('csurf');
app.use(csrf({ cookie: true }));

// 验证 Token
app.post('/transfer', (req, res) => {
  // Token 自动验证
  // 不匹配会返回 403
});
```

**Spring Boot:**
```java
// Spring Security 默认开启 CSRF 保护
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http.csrf()
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
        return http.build();
    }
}
```

**SameSite Cookie 配置:**
```http
Set-Cookie: sessionId=abc123; SameSite=Lax; Secure; HttpOnly
```

6. **防御最佳实践**

| 防御措施 | 安全性 | 易用性 | 推荐度 |
|---------|-------|-------|-------|
| **CSRF Token** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ✓✓✓ |
| **SameSite=Lax** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✓✓✓ |
| **Double Submit** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✓✓ |
| **Referer 验证** | ⭐⭐ | ⭐⭐⭐⭐ | ✓ |
| **验证码** | ⭐⭐⭐⭐⭐ | ⭐ | 重要操作 |

**关键要点**

1. **Token 验证是王道**: CSRF Token 是最可靠的防御方式
2. **SameSite 很强大**: 现代浏览器推荐使用 SameSite=Lax
3. **多层防御**: 结合多种防御措施提高安全性
4. **关键操作加验证码**: 转账、修改密码等敏感操作
5. **避免 GET 修改数据**: GET 请求不应执行状态改变操作

**记忆口诀**

"**Token 验证 Same 站点,源头检查加验证码**"
- **Token 验证**: CSRF Token 核心防御
- **Same 站点**: SameSite Cookie 属性
- **源头检查**: Referer/Origin 验证
- **验证码**: 关键操作增加人机验证
### 80. 什么是 SQL 注入?如何防止?

**核心答案**

SQL 注入 (SQL Injection) 是一种代码注入攻击,攻击者通过在应用程序的输入字段中插入恶意的 SQL 代码片段,使这些代码被数据库执行,从而绕过应用程序的安全验证,获取、修改或删除数据库中的数据。

**详细说明**

1. **SQL 注入攻击原理**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-sql" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#E53935"/></marker></defs>
<rect x="20" y="20" width="760" height="460" rx="8" fill="#FAFAFA" stroke="#757575" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">SQL 注入攻击流程</text>
<rect x="50" y="90" width="700" height="170" rx="5" fill="#FFEBEE" stroke="#E53935" stroke-width="2"/>
<text x="400" y="120" text-anchor="middle" font-size="15" font-weight="bold" fill="#C62828">❌ 不安全的代码示例</text>
<rect x="70" y="140" width="660" height="105" rx="3" fill="white" stroke="#EF5350" stroke-width="1"/>
<text x="80" y="165" font-size="12" font-family="monospace" fill="#D32F2F">// 直接拼接 SQL (危险!)</text>
<text x="80" y="185" font-size="12" font-family="monospace" fill="#333">String sql = "SELECT * FROM users WHERE username='" + username + "'</text>
<text x="80" y="203" font-size="12" font-family="monospace" fill="#333">             AND password='" + password + "'";</text>
<text x="80" y="230" font-size="11" font-family="monospace" fill="#1565C0">用户输入: username = admin' OR '1'='1</text>
<rect x="50" y="280" width="700" height="190" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="400" y="310" text-anchor="middle" font-size="15" font-weight="bold" fill="#F57C00">🔓 实际执行的 SQL</text>
<rect x="70" y="325" width="660" height="130" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="80" y="350" font-size="12" font-family="monospace" fill="#E65100">SELECT * FROM users</text>
<text x="80" y="370" font-size="12" font-family="monospace" fill="#E65100">WHERE username='admin' OR '1'='1'</text>
<text x="80" y="390" font-size="12" font-family="monospace" fill="#E65100">AND password=''</text>
<rect x="90" y="405" width="620" height="35" rx="3" fill="#FFCDD2" stroke="#F44336" stroke-width="1"/>
<text x="400" y="425" text-anchor="middle" font-size="11" fill="#C62828" font-weight="bold">⚠️ OR '1'='1' 永远为真,绕过密码验证,返回所有用户!</text>
<circle cx="720" cy="420" r="25" fill="#C62828"/>
<text x="720" y="432" text-anchor="middle" font-size="28" fill="white">⚠️</text>
</svg>

2. **SQL 注入攻击类型**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="510" rx="8" fill="#FAFAFA" stroke="#424242" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">SQL 注入攻击类型</text>
<rect x="50" y="80" width="220" height="200" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="160" y="110" text-anchor="middle" font-size="14" font-weight="bold" fill="#1976D2">Union 注入</text>
<rect x="60" y="125" width="200" height="140" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="160" y="148" text-anchor="middle" font-size="11" fill="#333">利用 UNION 合并查询</text>
<text x="70" y="170" font-size="9" font-family="monospace" fill="#1565C0">' UNION SELECT</text>
<text x="70" y="185" font-size="9" font-family="monospace" fill="#1565C0">username, password</text>
<text x="70" y="200" font-size="9" font-family="monospace" fill="#1565C0">FROM admin --</text>
<text x="160" y="225" text-anchor="middle" font-size="10" fill="#666">获取其他表数据</text>
<text x="160" y="243" text-anchor="middle" font-size="10" fill="#666">如管理员账号密码</text>
<text x="160" y="260" text-anchor="middle" font-size="9" fill="#E53935" font-weight="bold">危害: ⚠️⚠️⚠️</text>
<rect x="290" y="80" width="220" height="200" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="400" y="110" text-anchor="middle" font-size="14" font-weight="bold" fill="#2E7D32">布尔盲注</text>
<rect x="300" y="125" width="200" height="140" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="400" y="148" text-anchor="middle" font-size="11" fill="#333">根据响应判断真假</text>
<text x="310" y="170" font-size="9" font-family="monospace" fill="#2E7D32">' AND 1=1 --</text>
<text x="310" y="185" font-size="9" fill="#666">(页面正常)</text>
<text x="310" y="205" font-size="9" font-family="monospace" fill="#2E7D32">' AND 1=2 --</text>
<text x="310" y="220" font-size="9" fill="#666">(页面异常)</text>
<text x="400" y="243" text-anchor="middle" font-size="10" fill="#666">逐字猜解数据</text>
<text x="400" y="260" text-anchor="middle" font-size="9" fill="#FF9800" font-weight="bold">危害: ⚠️⚠️</text>
<rect x="530" y="80" width="220" height="200" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="640" y="110" text-anchor="middle" font-size="14" font-weight="bold" fill="#F57C00">时间盲注</text>
<rect x="540" y="125" width="200" height="140" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="640" y="148" text-anchor="middle" font-size="11" fill="#333">利用延时判断</text>
<text x="550" y="170" font-size="9" font-family="monospace" fill="#F57C00">' AND SLEEP(5) --</text>
<text x="550" y="190" font-size="9" font-family="monospace" fill="#F57C00">' OR IF(1=1,</text>
<text x="550" y="205" font-size="9" font-family="monospace" fill="#F57C00">SLEEP(5),0) --</text>
<text x="640" y="230" text-anchor="middle" font-size="10" fill="#666">响应延迟 5 秒</text>
<text x="640" y="247" text-anchor="middle" font-size="10" fill="#666">则条件为真</text>
<text x="640" y="264" text-anchor="middle" font-size="9" fill="#FF9800" font-weight="bold">危害: ⚠️⚠️</text>
<rect x="50" y="300" width="220" height="220" rx="5" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2"/>
<text x="160" y="330" text-anchor="middle" font-size="14" font-weight="bold" fill="#7B1FA2">报错注入</text>
<rect x="60" y="345" width="200" height="160" rx="3" fill="white" stroke="#BA68C8" stroke-width="1"/>
<text x="160" y="368" text-anchor="middle" font-size="11" fill="#333">利用错误信息泄露</text>
<text x="70" y="390" font-size="9" font-family="monospace" fill="#7B1FA2">' AND extractvalue(</text>
<text x="70" y="405" font-size="9" font-family="monospace" fill="#7B1FA2">1, concat(0x7e,</text>
<text x="70" y="420" font-size="9" font-family="monospace" fill="#7B1FA2">(SELECT password</text>
<text x="70" y="435" font-size="9" font-family="monospace" fill="#7B1FA2">FROM users LIMIT 1</text>
<text x="70" y="450" font-size="9" font-family="monospace" fill="#7B1FA2">))) --</text>
<text x="160" y="475" text-anchor="middle" font-size="10" fill="#666">通过报错获取数据</text>
<text x="160" y="495" text-anchor="middle" font-size="9" fill="#E53935" font-weight="bold">危害: ⚠️⚠️⚠️</text>
<rect x="290" y="300" width="220" height="220" rx="5" fill="#FFEBEE" stroke="#E53935" stroke-width="2"/>
<text x="400" y="330" text-anchor="middle" font-size="14" font-weight="bold" fill="#C62828">堆叠注入</text>
<rect x="300" y="345" width="200" height="160" rx="3" fill="white" stroke="#EF5350" stroke-width="1"/>
<text x="400" y="368" text-anchor="middle" font-size="11" fill="#333">执行多条 SQL 语句</text>
<text x="310" y="390" font-size="9" font-family="monospace" fill="#C62828">'; DROP TABLE users;</text>
<text x="310" y="405" font-size="9" font-family="monospace" fill="#C62828">--</text>
<text x="310" y="430" font-size="9" font-family="monospace" fill="#C62828">'; UPDATE users SET</text>
<text x="310" y="445" font-size="9" font-family="monospace" fill="#C62828">role='admin' WHERE</text>
<text x="310" y="460" font-size="9" font-family="monospace" fill="#C62828">id=1; --</text>
<text x="400" y="485" text-anchor="middle" font-size="10" fill="#666">修改/删除数据</text>
<text x="400" y="502" text-anchor="middle" font-size="9" fill="#E53935" font-weight="bold">危害: ⚠️⚠️⚠️⚠️⚠️</text>
<rect x="530" y="300" width="220" height="220" rx="5" fill="#FFF8E1" stroke="#FFA726" stroke-width="2"/>
<text x="640" y="330" text-anchor="middle" font-size="14" font-weight="bold" fill="#EF6C00">二次注入</text>
<rect x="540" y="345" width="200" height="160" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="640" y="368" text-anchor="middle" font-size="11" fill="#333">两步攻击</text>
<text x="550" y="390" font-size="10" fill="#666">① 插入恶意数据</text>
<text x="555" y="407" font-size="9" font-family="monospace" fill="#EF6C00">admin'--</text>
<text x="550" y="427" font-size="10" fill="#666">② 数据被使用时触发</text>
<text x="555" y="444" font-size="9" fill="#999">如修改密码时</text>
<text x="555" y="459" font-size="9" font-family="monospace" fill="#EF6C00">UPDATE users SET</text>
<text x="555" y="474" font-size="9" font-family="monospace" fill="#EF6C00">pwd=? WHERE</text>
<text x="555" y="489" font-size="9" font-family="monospace" fill="#EF6C00">name='admin'--'</text>
<text x="640" y="510" text-anchor="middle" font-size="9" fill="#FF9800" font-weight="bold">危害: ⚠️⚠️⚠️</text>
</svg>

3. **SQL 注入防御措施**

<svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="760" height="610" rx="8" fill="#FAFAFA" stroke="#2E7D32" stroke-width="3"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#2E7D32">SQL 注入防御策略</text>
<rect x="50" y="80" width="340" height="250" rx="5" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
<text x="220" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#2E7D32">1️⃣ 参数化查询 (首选)</text>
<rect x="60" y="125" width="320" height="190" rx="3" fill="white" stroke="#81C784" stroke-width="1"/>
<text x="220" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#388E3C">使用预编译语句</text>
<text x="70" y="175" font-size="11" font-family="monospace" fill="#2E7D32">// Java JDBC</text>
<text x="70" y="192" font-size="10" font-family="monospace" fill="#333">String sql = "SELECT *</text>
<text x="70" y="207" font-size="10" font-family="monospace" fill="#333">FROM users WHERE</text>
<text x="70" y="222" font-size="10" font-family="monospace" fill="#333">username=? AND pwd=?";</text>
<text x="70" y="242" font-size="10" font-family="monospace" fill="#1565C0">PreparedStatement ps =</text>
<text x="70" y="257" font-size="10" font-family="monospace" fill="#1565C0">conn.prepareStatement(sql);</text>
<text x="70" y="272" font-size="10" font-family="monospace" fill="#1565C0">ps.setString(1, username);</text>
<text x="70" y="287" font-size="10" font-family="monospace" fill="#1565C0">ps.setString(2, password);</text>
<text x="220" y="305" text-anchor="middle" font-size="10" fill="#2E7D32" font-weight="bold">✓ 防御效果: ⭐⭐⭐⭐⭐</text>
<rect x="410" y="80" width="340" height="250" rx="5" fill="#E3F2FD" stroke="#2196F3" stroke-width="2"/>
<text x="580" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#1976D2">2️⃣ ORM 框架</text>
<rect x="420" y="125" width="320" height="190" rx="3" fill="white" stroke="#64B5F6" stroke-width="1"/>
<text x="580" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#1565C0">使用 ORM 自动防护</text>
<text x="430" y="175" font-size="11" font-family="monospace" fill="#1976D2">// MyBatis</text>
<text x="430" y="192" font-size="10" font-family="monospace" fill="#333">&lt;select id="getUser"&gt;</text>
<text x="430" y="207" font-size="10" font-family="monospace" fill="#333">SELECT * FROM users</text>
<text x="430" y="222" font-size="10" font-family="monospace" fill="#333">WHERE id = #{id}</text>
<text x="430" y="237" font-size="10" font-family="monospace" fill="#333">&lt;/select&gt;</text>
<text x="430" y="262" font-size="11" font-family="monospace" fill="#1976D2">// JPA</text>
<text x="430" y="279" font-size="10" font-family="monospace" fill="#333">userRepository</text>
<text x="430" y="294" font-size="10" font-family="monospace" fill="#333">.findByUsername(name);</text>
<text x="580" y="312" text-anchor="middle" font-size="10" fill="#1976D2" font-weight="bold">✓ 防御效果: ⭐⭐⭐⭐⭐</text>
<rect x="50" y="350" width="340" height="270" rx="5" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
<text x="220" y="380" text-anchor="middle" font-size="15" font-weight="bold" fill="#F57C00">3️⃣ 输入验证与过滤</text>
<rect x="60" y="395" width="320" height="210" rx="3" fill="white" stroke="#FFB74D" stroke-width="1"/>
<text x="220" y="420" text-anchor="middle" font-size="12" font-weight="bold" fill="#EF6C00">严格验证输入</text>
<text x="70" y="445" font-size="11" fill="#666">✓ 白名单验证</text>
<text x="80" y="462" font-size="10" fill="#999">只允许字母数字下划线</text>
<text x="70" y="482" font-size="11" fill="#666">✓ 类型检查</text>
<text x="80" y="499" font-size="10" fill="#999">数字 ID 必须是整数</text>
<text x="70" y="519" font-size="11" fill="#666">✓ 长度限制</text>
<text x="80" y="536" font-size="10" fill="#999">限制输入字符串长度</text>
<text x="70" y="556" font-size="11" fill="#666">✓ 转义特殊字符</text>
<text x="80" y="573" font-size="10" fill="#999">' " \ ; -- 等危险字符</text>
<text x="220" y="595" text-anchor="middle" font-size="10" fill="#F57C00" font-weight="bold">✓ 辅助防御: ⭐⭐⭐</text>
<rect x="410" y="350" width="340" height="270" rx="5" fill="#F3E5F5" stroke="#9C27B0" stroke-width="2"/>
<text x="580" y="380" text-anchor="middle" font-size="15" font-weight="bold" fill="#7B1FA2">4️⃣ 最小权限原则</text>
<rect x="420" y="395" width="320" height="210" rx="3" fill="white" stroke="#BA68C8" stroke-width="1"/>
<text x="580" y="420" text-anchor="middle" font-size="12" font-weight="bold" fill="#6A1B9A">数据库权限控制</text>
<text x="430" y="445" font-size="11" fill="#666">✓ 只读账户</text>
<text x="440" y="462" font-size="10" fill="#999">查询操作使用只读权限</text>
<text x="430" y="482" font-size="11" fill="#666">✓ 禁用危险权限</text>
<text x="440" y="499" font-size="10" fill="#999">不给 DROP、CREATE 权限</text>
<text x="430" y="519" font-size="11" fill="#666">✓ 分离账户</text>
<text x="440" y="536" font-size="10" fill="#999">应用和管理使用不同账户</text>
<text x="430" y="556" font-size="11" fill="#666">✓ 禁用多语句</text>
<text x="440" y="573" font-size="10" fill="#999">限制执行堆叠查询</text>
<text x="580" y="595" text-anchor="middle" font-size="10" fill="#9C27B0" font-weight="bold">✓ 降低危害: ⭐⭐⭐⭐</text>
</svg>

4. **防御代码对比**

**❌ 危险写法 (字符串拼接):**
```java
// 存在 SQL 注入风险!
String sql = "SELECT * FROM users WHERE username='" + username + "'";
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(sql);
```

**✓ 安全写法 (参数化查询):**
```java
// 使用 PreparedStatement
String sql = "SELECT * FROM users WHERE username=?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setString(1, username);
ResultSet rs = pstmt.executeQuery();
```

**MyBatis 防御:**
```xml
<!-- ✓ 使用 #{} 参数化 (安全) -->
<select id="getUser">
  SELECT * FROM users WHERE username = #{username}
</select>

<!-- ❌ 使用 ${} 字符串替换 (危险!) -->
<select id="getUser">
  SELECT * FROM users WHERE username = '${username}'
</select>
```

5. **WAF (Web 应用防火墙) 防护**
   - 检测常见注入模式: `UNION`、`SELECT`、`DROP`、`--` 等
   - 阻止异常请求
   - 记录攻击日志
   - 建议: WAF 不应作为唯一防御手段

6. **防御最佳实践**

| 防御措施 | 防御效果 | 性能影响 | 推荐度 |
|---------|---------|---------|-------|
| **参数化查询** | ⭐⭐⭐⭐⭐ | 极小 | ✓✓✓ |
| **ORM 框架** | ⭐⭐⭐⭐⭐ | 小 | ✓✓✓ |
| **输入验证** | ⭐⭐⭐ | 小 | ✓✓ |
| **最小权限** | ⭐⭐⭐⭐ | 无 | ✓✓✓ |
| **WAF** | ⭐⭐⭐ | 小 | ✓✓ |

**关键要点**

1. **永远使用参数化查询**: 这是最有效的防御措施
2. **避免字符串拼接 SQL**: 即使是管理员输入也要防御
3. **多层防御**: 结合输入验证、参数化、权限控制
4. **定期安全审计**: 使用工具扫描 SQL 注入漏洞
5. **错误信息不泄露**: 不向用户展示详细数据库错误

**记忆口诀**

"**参数预编 ORM 守,输入验证权限小**"
- **参数预编**: 参数化查询 + PreparedStatement
- **ORM 守**: 使用 ORM 框架自动防护
- **输入验证**: 白名单验证输入合法性
- **权限小**: 最小权限原则限制危害

### 81. 什么是 DDoS 攻击？如何防止？

**核心答案**

DDoS（Distributed Denial of Service，分布式拒绝服务）攻击是攻击者通过控制大量僵尸主机，向目标服务器发起海量请求，耗尽目标系统资源，使正常用户无法访问服务的攻击方式。

**详细说明**

1. **DDoS 攻击原理**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead-ddos" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#ef4444"/></marker></defs>
<rect x="350" y="220" width="100" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="5"/>
<text x="400" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold">目标服务器</text>
<text x="400" y="265" text-anchor="middle" fill="white" font-size="12">(正常)</text>
<circle cx="100" cy="100" r="30" fill="#6b7280" stroke="#374151" stroke-width="2"/>
<text x="100" y="105" text-anchor="middle" fill="white" font-size="12">僵尸机1</text>
<circle cx="200" cy="80" r="30" fill="#6b7280" stroke="#374151" stroke-width="2"/>
<text x="200" y="85" text-anchor="middle" fill="white" font-size="12">僵尸机2</text>
<circle cx="150" cy="180" r="30" fill="#6b7280" stroke="#374151" stroke-width="2"/>
<text x="150" y="185" text-anchor="middle" fill="white" font-size="12">僵尸机3</text>
<circle cx="100" cy="280" r="30" fill="#6b7280" stroke="#374151" stroke-width="2"/>
<text x="100" y="285" text-anchor="middle" fill="white" font-size="12">僵尸机N</text>
<circle cx="600" cy="100" r="30" fill="#6b7280" stroke="#374151" stroke-width="2"/>
<text x="600" y="105" text-anchor="middle" fill="white" font-size="12">僵尸机4</text>
<circle cx="700" cy="80" r="30" fill="#6b7280" stroke="#374151" stroke-width="2"/>
<text x="700" y="85" text-anchor="middle" fill="white" font-size="12">僵尸机5</text>
<circle cx="650" cy="180" r="30" fill="#6b7280" stroke="#374151" stroke-width="2"/>
<text x="650" y="185" text-anchor="middle" fill="white" font-size="12">僵尸机6</text>
<circle cx="600" cy="280" r="30" fill="#6b7280" stroke="#374151" stroke-width="2"/>
<text x="600" y="285" text-anchor="middle" fill="white" font-size="12">僵尸机M</text>
<line x1="130" y1="110" x2="350" y2="230" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-ddos)"/>
<line x1="220" y1="95" x2="350" y2="230" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-ddos)"/>
<line x1="180" y1="190" x2="350" y2="240" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-ddos)"/>
<line x1="130" y1="280" x2="350" y2="260" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-ddos)"/>
<line x1="570" y1="110" x2="450" y2="230" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-ddos)"/>
<line x1="680" y1="95" x2="450" y2="230" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-ddos)"/>
<line x1="620" y1="190" x2="450" y2="240" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-ddos)"/>
<line x1="570" y1="280" x2="450" y2="260" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-ddos)"/>
<text x="150" y="50" text-anchor="middle" fill="#dc2626" font-size="16" font-weight="bold">海量请求</text>
<path d="M 120 55 Q 120 70 130 85" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowhead-ddos)"/>
<path d="M 180 55 Q 190 65 200 75" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowhead-ddos)"/>
<text x="650" y="50" text-anchor="middle" fill="#dc2626" font-size="16" font-weight="bold">海量请求</text>
<path d="M 620 55 Q 620 70 610 85" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowhead-ddos)"/>
<path d="M 680 55 Q 690 65 700 75" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowhead-ddos)"/>
<rect x="300" y="380" width="200" height="80" fill="#ef4444" stroke="#991b1b" stroke-width="2" rx="5"/>
<text x="400" y="405" text-anchor="middle" fill="white" font-size="14" font-weight="bold">服务器瘫痪</text>
<text x="400" y="425" text-anchor="middle" fill="white" font-size="12">CPU: 100%</text>
<text x="400" y="443" text-anchor="middle" fill="white" font-size="12">带宽: 耗尽</text>
<line x1="400" y1="280" x2="400" y2="370" stroke="#dc2626" stroke-width="3" stroke-dasharray="5,5" marker-end="url(#arrowhead-ddos)"/>
<text x="420" y="330" fill="#dc2626" font-size="13" font-weight="bold">资源耗尽</text>
<circle cx="50" cy="30" r="25" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
<text x="50" y="35" text-anchor="middle" fill="#78350f" font-size="12" font-weight="bold">攻击者</text>
<path d="M 75 30 Q 87 65 95 85" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,3"/>
<path d="M 75 30 Q 100 50 175 70" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,3"/>
<text x="90" y="60" fill="#d97706" font-size="10">控制</text>
</svg>

2. **DDoS 攻击类型**

   - **带宽耗尽型攻击**
     - UDP Flood：发送大量 UDP 数据包
     - ICMP Flood：发送大量 ping 请求
     - DNS 放大攻击：利用 DNS 响应包比请求包大的特点

   - **资源耗尽型攻击**
     - SYN Flood：发送大量 SYN 请求，耗尽连接资源
     - HTTP Flood：发送大量 HTTP 请求，耗尽服务器资源
     - Slowloris：保持大量慢速连接，占用连接池

   - **应用层攻击**
     - CC 攻击：针对动态页面的高消耗请求
     - 慢速攻击：发送缓慢但合法的请求

3. **DDoS 攻击特征**

   - 流量异常：突然出现大量异常流量
   - 源 IP 分散：来自全球各地的不同 IP
   - 请求模式异常：高频率、相似请求
   - 服务响应缓慢或完全无法访问

4. **防御措施**

<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead-defense" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#3b82f6"/></marker><marker id="arrowhead-block" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#ef4444"/></marker></defs>
<rect x="100" y="50" width="120" height="60" fill="#6b7280" stroke="#374151" stroke-width="2" rx="5"/>
<text x="160" y="75" text-anchor="middle" fill="white" font-size="13" font-weight="bold">攻击流量</text>
<text x="160" y="95" text-anchor="middle" fill="white" font-size="11">(混合)</text>
<rect x="340" y="50" width="120" height="60" fill="#10b981" stroke="#047857" stroke-width="2" rx="5"/>
<text x="400" y="75" text-anchor="middle" fill="white" font-size="13" font-weight="bold">流量清洗</text>
<text x="400" y="93" text-anchor="middle" fill="white" font-size="11">DDoS 防护</text>
<rect x="580" y="50" width="120" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="5"/>
<text x="640" y="75" text-anchor="middle" fill="white" font-size="13" font-weight="bold">正常流量</text>
<text x="640" y="93" text-anchor="middle" fill="white" font-size="11">(到达服务器)</text>
<line x1="220" y1="80" x2="330" y2="80" stroke="#6b7280" stroke-width="3" marker-end="url(#arrowhead-defense)"/>
<line x1="460" y1="80" x2="570" y2="80" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrowhead-defense)"/>
<line x1="400" y1="110" x2="400" y2="160" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-block)"/>
<rect x="330" y="170" width="140" height="40" fill="#ef4444" stroke="#991b1b" stroke-width="2" rx="5"/>
<text x="400" y="195" text-anchor="middle" fill="white" font-size="12" font-weight="bold">恶意流量被过滤</text>
<rect x="50" y="250" width="700" height="330" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="8"/>
<text x="400" y="280" text-anchor="middle" fill="#1f2937" font-size="16" font-weight="bold">DDoS 防御体系</text>
<rect x="80" y="300" width="200" height="110" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
<text x="180" y="325" text-anchor="middle" fill="#1e40af" font-size="13" font-weight="bold">1. 流量识别</text>
<text x="90" y="350" fill="#374151" font-size="11">• 行为分析</text>
<text x="90" y="370" fill="#374151" font-size="11">• 特征匹配</text>
<text x="90" y="390" fill="#374151" font-size="11">• 机器学习识别</text>
<rect x="300" y="300" width="200" height="110" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
<text x="400" y="325" text-anchor="middle" fill="#92400e" font-size="13" font-weight="bold">2. 流量清洗</text>
<text x="310" y="350" fill="#374151" font-size="11">• IP 黑白名单</text>
<text x="310" y="370" fill="#374151" font-size="11">• 限流和过滤</text>
<text x="310" y="390" fill="#374151" font-size="11">• 协议验证</text>
<rect x="520" y="300" width="200" height="110" fill="#d1fae5" stroke="#10b981" stroke-width="2" rx="5"/>
<text x="620" y="325" text-anchor="middle" fill="#047857" font-size="13" font-weight="bold">3. 弹性扩展</text>
<text x="530" y="350" fill="#374151" font-size="11">• CDN 分散流量</text>
<text x="530" y="370" fill="#374151" font-size="11">• 云防护服务</text>
<text x="530" y="390" fill="#374151" font-size="11">• 自动扩容</text>
<rect x="80" y="430" width="310" height="130" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
<text x="235" y="455" text-anchor="middle" fill="#3730a3" font-size="13" font-weight="bold">4. 基础防护措施</text>
<text x="90" y="480" fill="#374151" font-size="11">• 配置防火墙和入侵检测系统</text>
<text x="90" y="500" fill="#374151" font-size="11">• 限制单 IP 连接数和请求频率</text>
<text x="90" y="520" fill="#374151" font-size="11">• 禁用不必要的服务和端口</text>
<text x="90" y="540" fill="#374151" font-size="11">• 实时监控和告警</text>
<rect x="410" y="430" width="310" height="130" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="5"/>
<text x="565" y="455" text-anchor="middle" fill="#9f1239" font-size="13" font-weight="bold">5. 应用层防护</text>
<text x="420" y="480" fill="#374151" font-size="11">• 人机验证 (CAPTCHA)</text>
<text x="420" y="500" fill="#374151" font-size="11">• JS 挑战/Cookie 验证</text>
<text x="420" y="520" fill="#374151" font-size="11">• WAF（Web 应用防火墙）</text>
<text x="420" y="540" fill="#374151" font-size="11">• API 限流和鉴权</text>
</svg>

**关键要点**

1. **DDoS 攻击三要素**
   - 分布式：多个攻击源
   - 拒绝服务：使服务不可用
   - 资源耗尽：带宽、CPU、内存、连接数

2. **防御策略层次**
   - 网络层：流量清洗、黑洞路由
   - 传输层：SYN Cookie、连接限制
   - 应用层：请求验证、行为分析
   - 架构层：分布式部署、弹性扩展

3. **防御关键点**
   - 提前规划：不要等攻击发生才准备
   - 多层防护：单一手段难以完全防御
   - 实时监控：快速发现和响应攻击
   - 使用专业服务：云厂商 DDoS 防护服务

**记忆口诀**

**"分布拒绝耗资源，识别清洗加扩展"**
- **分布拒绝**：DDoS 的本质是分布式拒绝服务
- **耗资源**：攻击目标是耗尽服务器资源
- **识别清洗加扩展**：防御三步走——识别攻击流量、清洗恶意请求、弹性扩展应对

### 82. 什么是 SYN Flood 攻击？

**核心答案**

SYN Flood 攻击是一种 DDoS 攻击方式，攻击者利用 TCP 三次握手机制的缺陷，向目标服务器发送大量伪造源 IP 的 SYN 请求，但不完成握手过程，导致服务器维护大量半连接状态，最终耗尽连接资源，使正常用户无法建立连接。

**详细说明**

1. **正常 TCP 三次握手**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead-normal" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#3b82f6"/></marker></defs>
<rect x="100" y="80" width="120" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="5"/>
<text x="160" y="105" text-anchor="middle" fill="white" font-size="14" font-weight="bold">客户端</text>
<text x="160" y="125" text-anchor="middle" fill="white" font-size="11">(正常)</text>
<rect x="580" y="80" width="120" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="5"/>
<text x="640" y="105" text-anchor="middle" fill="white" font-size="14" font-weight="bold">服务器</text>
<text x="640" y="125" text-anchor="middle" fill="white" font-size="11">(正常)</text>
<line x1="160" y1="140" x2="160" y2="370" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="640" y1="140" x2="640" y2="370" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="160" y1="180" x2="640" y2="210" stroke="#10b981" stroke-width="3" marker-end="url(#arrowhead-normal)"/>
<text x="380" y="175" text-anchor="middle" fill="#047857" font-size="13" font-weight="bold">1. SYN</text>
<text x="380" y="195" text-anchor="middle" fill="#374151" font-size="11">(请求建立连接)</text>
<line x1="640" y1="240" x2="160" y2="270" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrowhead-normal)"/>
<text x="420" y="235" text-anchor="middle" fill="#92400e" font-size="13" font-weight="bold">2. SYN+ACK</text>
<text x="420" y="255" text-anchor="middle" fill="#374151" font-size="11">(确认并请求)</text>
<line x1="160" y1="300" x2="640" y2="330" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrowhead-normal)"/>
<text x="380" y="295" text-anchor="middle" fill="#1e40af" font-size="13" font-weight="bold">3. ACK</text>
<text x="380" y="315" text-anchor="middle" fill="#374151" font-size="11">(确认，连接建立)</text>
<rect x="560" y="350" width="160" height="30" fill="#d1fae5" stroke="#10b981" stroke-width="2" rx="3"/>
<text x="640" y="370" text-anchor="middle" fill="#047857" font-size="12" font-weight="bold">连接建立成功</text>
</svg>

2. **SYN Flood 攻击过程**

<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead-attack" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#ef4444"/></marker><marker id="arrowhead-synack" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><polygon points="0 0, 10 3, 0 6" fill="#f59e0b"/></marker></defs>
<rect x="50" y="80" width="150" height="60" fill="#6b7280" stroke="#374151" stroke-width="2" rx="5"/>
<text x="125" y="105" text-anchor="middle" fill="white" font-size="13" font-weight="bold">攻击者</text>
<text x="125" y="125" text-anchor="middle" fill="white" font-size="11">(伪造源IP)</text>
<rect x="600" y="80" width="150" height="60" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="5"/>
<text x="675" y="105" text-anchor="middle" fill="white" font-size="14" font-weight="bold">目标服务器</text>
<line x1="125" y1="140" x2="125" y2="500" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="675" y1="140" x2="675" y2="500" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5,5"/>
<line x1="125" y1="180" x2="675" y2="200" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-attack)"/>
<text x="380" y="175" text-anchor="middle" fill="#dc2626" font-size="12" font-weight="bold">SYN (源IP: 1.1.1.1 伪造)</text>
<line x1="675" y1="220" x2="300" y2="240" stroke="#f59e0b" stroke-width="3" stroke-dasharray="5,5" marker-end="url(#arrowhead-synack)"/>
<text x="480" y="215" text-anchor="middle" fill="#ea580c" font-size="12" font-weight="bold">SYN+ACK (发往 1.1.1.1)</text>
<text x="480" y="235" text-anchor="middle" fill="#78350f" font-size="10">✗ 无法送达</text>
<rect x="730" y="205" width="60" height="25" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" rx="3"/>
<text x="760" y="222" text-anchor="middle" fill="#92400e" font-size="10">半连接1</text>
<line x1="125" y1="270" x2="675" y2="290" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-attack)"/>
<text x="380" y="265" text-anchor="middle" fill="#dc2626" font-size="12" font-weight="bold">SYN (源IP: 2.2.2.2 伪造)</text>
<line x1="675" y1="310" x2="300" y2="330" stroke="#f59e0b" stroke-width="3" stroke-dasharray="5,5" marker-end="url(#arrowhead-synack)"/>
<text x="480" y="305" text-anchor="middle" fill="#ea580c" font-size="12" font-weight="bold">SYN+ACK (发往 2.2.2.2)</text>
<text x="480" y="325" text-anchor="middle" fill="#78350f" font-size="10">✗ 无法送达</text>
<rect x="730" y="295" width="60" height="25" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" rx="3"/>
<text x="760" y="312" text-anchor="middle" fill="#92400e" font-size="10">半连接2</text>
<line x1="125" y1="360" x2="675" y2="380" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead-attack)"/>
<text x="380" y="355" text-anchor="middle" fill="#dc2626" font-size="12" font-weight="bold">SYN (源IP: 3.3.3.3 伪造)</text>
<line x1="675" y1="400" x2="300" y2="420" stroke="#f59e0b" stroke-width="3" stroke-dasharray="5,5" marker-end="url(#arrowhead-synack)"/>
<rect x="730" y="385" width="60" height="25" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" rx="3"/>
<text x="760" y="402" text-anchor="middle" fill="#92400e" font-size="10">半连接3</text>
<text x="125" y="460" text-anchor="middle" fill="#dc2626" font-size="14" font-weight="bold">持续发送大量 SYN</text>
<path d="M 125 465 L 120 475 L 125 485 L 130 475 Z" fill="#ef4444"/>
<path d="M 125 485 L 120 495 L 125 505 L 130 495 Z" fill="#ef4444"/>
<rect x="580" y="450" width="200" height="80" fill="#fee2e2" stroke="#dc2626" stroke-width="3" rx="5"/>
<text x="680" y="475" text-anchor="middle" fill="#991b1b" font-size="13" font-weight="bold">连接队列耗尽</text>
<text x="680" y="495" text-anchor="middle" fill="#7f1d1d" font-size="11">半连接队列满</text>
<text x="680" y="513" text-anchor="middle" fill="#7f1d1d" font-size="11">无法接受新连接</text>
<rect x="250" y="20" width="300" height="40" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
<text x="400" y="35" text-anchor="middle" fill="#92400e" font-size="12">攻击者伪造大量不存在的源IP</text>
<text x="400" y="52" text-anchor="middle" fill="#78350f" font-size="11">服务器回复的 SYN+ACK 无法送达，ACK 永不到来</text>
</svg>

3. **SYN Flood 攻击特点**

   - **半连接队列堆积**：服务器为每个 SYN 请求分配资源，等待 ACK
   - **伪造源 IP**：攻击者使用不存在或无法路由的 IP 地址
   - **ACK 永不到来**：服务器等待超时（通常 30-120 秒）
   - **资源耗尽**：半连接队列满后，拒绝所有新连接

4. **攻击影响**

<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="700" height="280" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="8"/>
<text x="400" y="85" text-anchor="middle" fill="#1f2937" font-size="16" font-weight="bold">SYN Flood 攻击影响</text>
<rect x="80" y="110" width="200" height="100" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="5"/>
<text x="180" y="135" text-anchor="middle" fill="#991b1b" font-size="13" font-weight="bold">连接资源耗尽</text>
<text x="90" y="160" fill="#7f1d1d" font-size="11">• 半连接队列满</text>
<text x="90" y="180" fill="#7f1d1d" font-size="11">• 内存被占用</text>
<text x="90" y="200" fill="#7f1d1d" font-size="11">• 无法建立新连接</text>
<rect x="300" y="110" width="200" height="100" fill="#fed7aa" stroke="#ea580c" stroke-width="2" rx="5"/>
<text x="400" y="135" text-anchor="middle" fill="#9a3412" font-size="13" font-weight="bold">CPU 负载增加</text>
<text x="310" y="160" fill="#78350f" font-size="11">• 处理大量 SYN 包</text>
<text x="310" y="180" fill="#78350f" font-size="11">• 维护半连接状态</text>
<text x="310" y="200" fill="#78350f" font-size="11">• 超时检查和清理</text>
<rect x="520" y="110" width="200" height="100" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
<text x="620" y="135" text-anchor="middle" fill="#92400e" font-size="13" font-weight="bold">服务不可用</text>
<text x="530" y="160" fill="#78350f" font-size="11">• 正常用户无法连接</text>
<text x="530" y="180" fill="#78350f" font-size="11">• 服务响应超时</text>
<text x="530" y="200" fill="#78350f" font-size="11">• 业务完全中断</text>
<rect x="190" y="230" width="420" height="80" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
<text x="400" y="255" text-anchor="middle" fill="#1e40af" font-size="13" font-weight="bold">典型症状</text>
<text x="400" y="278" text-anchor="middle" fill="#1e3a8a" font-size="11">netstat 显示大量 SYN_RECV 状态的连接</text>
<text x="400" y="297" text-anchor="middle" fill="#1e3a8a" font-size="11">服务器 CPU 使用率飙升，但应用层无明显负载</text>
</svg>

5. **防御措施**

   - **SYN Cookie 技术**
     - 不分配资源，将连接信息编码在 SYN+ACK 的序列号中
     - 收到 ACK 后验证序列号，再建立真正连接
     - Linux 系统可通过 `net.ipv4.tcp_syncookies=1` 开启

   - **减少 SYN 超时时间**
     - 缩短半连接的等待时间（如从 75 秒降到 30 秒）
     - 加快半连接队列的释放速度
     - `net.ipv4.tcp_synack_retries` 设置重传次数

   - **增大半连接队列**
     - 增加 `net.ipv4.tcp_max_syn_backlog` 的值
     - 提高服务器承受能力，但治标不治本

   - **防火墙和 IDS**
     - 限制单 IP 的 SYN 请求速率
     - 检测并过滤异常 SYN 流量
     - 使用专业的 DDoS 防护设备

   - **负载均衡和分布式部署**
     - 分散攻击流量
     - 提高系统整体承受能力

**关键要点**

1. **攻击核心**：利用 TCP 三次握手的第三步（ACK）不发送，导致服务器维护大量半连接

2. **关键特征**：大量 SYN_RECV 状态的连接，源 IP 地址随机且分散

3. **最佳防御**：SYN Cookie 是最有效的防御手段，无需维护半连接队列

4. **检测命令**
   ```bash
   # 查看半连接队列状态
   netstat -n | grep SYN_RECV | wc -l

   # 查看各状态连接数
   netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'
   ```

**记忆口诀**

**"握手不完半连接，Cookie 技术最有效"**
- **握手不完**：只发 SYN，不完成三次握手
- **半连接**：服务器维护大量半连接状态（SYN_RECV）
- **Cookie 技术**：SYN Cookie 是最佳防御手段，不维护半连接队列
- **最有效**：从根本上解决了资源耗尽问题

### 83. 什么是中间人攻击？

**核心答案**

中间人攻击（Man-in-the-Middle Attack，MITM）是一种网络攻击方式，攻击者秘密拦截并可能篡改两个通信方之间的通信内容，而通信双方却误以为他们在直接通信。

**攻击原理**

<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker><marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/></marker></defs>
<rect x="50" y="180" width="120" height="80" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="110" y="215" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e40af">客户端</text><text x="110" y="235" text-anchor="middle" font-size="13" fill="#3b82f6">(Alice)</text>
<rect x="350" y="150" width="120" height="140" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="410" y="185" text-anchor="middle" font-size="16" font-weight="bold" fill="#991b1b">攻击者</text><text x="410" y="205" text-anchor="middle" font-size="13" fill="#dc2626">(中间人)</text><circle cx="390" cy="240" r="20" fill="none" stroke="#ef4444" stroke-width="2"/><path d="M 380 235 L 400 255 M 380 255 L 400 235" stroke="#ef4444" stroke-width="2"/><text x="410" y="273" text-anchor="middle" font-size="11" fill="#dc2626">拦截/篡改</text>
<rect x="630" y="180" width="120" height="80" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="690" y="215" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e40af">服务器</text><text x="690" y="235" text-anchor="middle" font-size="13" fill="#3b82f6">(Bob)</text>
<path d="M 170 200 L 340 180" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead-red)" stroke-dasharray="5,5"/><text x="255" y="175" text-anchor="middle" font-size="12" fill="#dc2626">①请求被劫持</text>
<path d="M 470 180 L 620 200" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead-red)" stroke-dasharray="5,5"/><text x="545" y="175" text-anchor="middle" font-size="12" fill="#dc2626">②伪装转发</text>
<path d="M 620 240 L 480 260" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead-red)" stroke-dasharray="5,5"/><text x="550" y="265" text-anchor="middle" font-size="12" fill="#dc2626">③响应被劫持</text>
<path d="M 360 260 L 180 240" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead-red)" stroke-dasharray="5,5"/><text x="270" y="265" text-anchor="middle" font-size="12" fill="#dc2626">④伪装返回</text>
<rect x="50" y="330" width="700" height="100" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="400" y="355" text-anchor="middle" font-size="14" font-weight="bold" fill="#92400e">攻击者可以做什么？</text><text x="80" y="380" font-size="13" fill="#78350f">• 窃听：读取所有通信内容（密码、信用卡、聊天记录）</text><text x="80" y="400" font-size="13" fill="#78350f">• 篡改：修改请求或响应数据（注入恶意代码、修改转账金额）</text><text x="80" y="420" font-size="13" fill="#78350f">• 伪装：冒充通信双方（钓鱼攻击、身份欺骗）</text>
</svg>

**常见攻击场景**

1. **公共 Wi-Fi 攻击**
   - 攻击者搭建恶意热点（如"Free WiFi"）
   - 用户连接后，所有流量都经过攻击者
   - 未加密的 HTTP 通信完全暴露

2. **ARP 欺骗攻击**
   - 在局域网内发送伪造的 ARP 响应
   - 将自己的 MAC 地址关联到网关 IP
   - 成为网络流量的中转节点

3. **DNS 劫持**
   - 篡改 DNS 响应，将域名解析到恶意服务器
   - 用户访问正确域名，却连接到攻击者服务器
   - 常见于路由器劫持和运营商劫持

4. **SSL 剥离攻击**
   - 攻击者与服务器建立 HTTPS 连接
   - 与客户端使用降级的 HTTP 连接
   - 用户看到的是 HTTP，实际数据被窃取

**防御措施**

<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="740" height="350" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#166534">中间人攻击防御体系</text>
<rect x="60" y="80" width="200" height="120" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="160" y="105" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e40af">传输层防护</text><text x="70" y="130" font-size="13" fill="#1e3a8a">✓ 使用 HTTPS/TLS</text><text x="70" y="150" font-size="13" fill="#1e3a8a">✓ 证书验证（固定证书）</text><text x="70" y="170" font-size="13" fill="#1e3a8a">✓ HSTS 强制 HTTPS</text><text x="70" y="190" font-size="13" fill="#1e3a8a">✓ 双向 TLS 认证</text>
<rect x="300" y="80" width="200" height="120" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="400" y="105" text-anchor="middle" font-size="15" font-weight="bold" fill="#92400e">网络层防护</text><text x="310" y="130" font-size="13" fill="#78350f">✓ 避免公共 Wi-Fi</text><text x="310" y="150" font-size="13" fill="#78350f">✓ 使用 VPN 加密</text><text x="310" y="170" font-size="13" fill="#78350f">✓ 静态 ARP 绑定</text><text x="310" y="190" font-size="13" fill="#78350f">✓ DNSSEC 验证</text>
<rect x="540" y="80" width="200" height="120" rx="6" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/><text x="640" y="105" text-anchor="middle" font-size="15" font-weight="bold" fill="#3730a3">应用层防护</text><text x="550" y="130" font-size="13" fill="#312e81">✓ 端到端加密</text><text x="550" y="150" font-size="13" fill="#312e81">✓ 消息签名验证</text><text x="550" y="170" font-size="13" fill="#312e81">✓ 多因素认证</text><text x="550" y="190" font-size="13" fill="#312e81">✓ 安全意识培训</text>
<rect x="60" y="230" width="680" height="120" rx="6" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/><text x="400" y="255" text-anchor="middle" font-size="15" font-weight="bold" fill="#9f1239">检测方法</text><text x="80" y="280" font-size="13" fill="#831843">1. 证书警告：浏览器提示证书无效或不受信任</text><text x="80" y="300" font-size="13" fill="#831843">2. 地址栏检查：确认 HTTPS 绿锁标志，验证域名正确</text><text x="80" y="320" font-size="13" fill="#831843">3. 网络监控：检测 ARP 表异常，监控 DNS 查询结果</text><text x="80" y="340" font-size="13" fill="#831843">4. 流量分析：使用 Wireshark 等工具检查数据包</text>
</svg>

**真实案例**

1. **超文本咖啡壶控制协议欺骗**（2008）
   - 黑客在咖啡店 Wi-Fi 劫持 HTTP 会话
   - 窃取数千用户的登录凭据

2. **Comcast 注入广告**（2016）
   - 美国运营商 Comcast 在用户 HTTP 流量中注入广告
   - 属于合法但有争议的中间人行为

3. **Lenovo Superfish**（2015）
   - 联想预装的广告软件会安装根证书
   - 允许拦截和解密所有 HTTPS 流量

**HTTPS 如何防止中间人攻击**

<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#22c55e"/></marker></defs>
<rect x="50" y="50" width="140" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="120" y="80" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e40af">客户端</text><text x="120" y="100" text-anchor="middle" font-size="12" fill="#3b82f6">浏览器</text>
<rect x="330" y="50" width="140" height="70" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="400" y="80" text-anchor="middle" font-size="15" font-weight="bold" fill="#991b1b">攻击者</text><text x="400" y="100" text-anchor="middle" font-size="12" fill="#dc2626">无法解密</text>
<rect x="610" y="50" width="140" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="680" y="80" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e40af">服务器</text><text x="680" y="100" text-anchor="middle" font-size="12" fill="#3b82f6">持有私钥</text>
<text x="400" y="160" text-anchor="middle" font-size="14" font-weight="bold" fill="#166534">① TLS 握手 - 证书验证</text><path d="M 190 85 L 600 85" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow-green)"/><text x="395" y="75" text-anchor="middle" font-size="11" fill="#15803d">服务器发送证书（公钥）</text>
<rect x="50" y="180" width="700" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="70" y="205" font-size="13" fill="#78350f">✓ 浏览器验证证书：检查 CA 签名、有效期、域名匹配</text><text x="70" y="225" font-size="13" fill="#78350f">✓ 如果证书无效（攻击者伪造），浏览器显示警告并阻止连接</text>
<text x="400" y="270" text-anchor="middle" font-size="14" font-weight="bold" fill="#166534">② 密钥协商 - 建立加密通道</text><path d="M 190 300 L 600 300" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow-green)"/><text x="395" y="290" text-anchor="middle" font-size="11" fill="#15803d">客户端生成会话密钥，用公钥加密发送</text>
<rect x="50" y="320" width="700" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="70" y="345" font-size="13" fill="#78350f">✓ 只有服务器的私钥能解密，攻击者无法获取会话密钥</text>
</svg>

**关键要点**

1. **攻击本质**
   - 秘密拦截：通信双方不知情
   - 主动欺骗：攻击者冒充双方身份
   - 完全控制：可读取和修改所有数据

2. **危害程度**
   - 信息泄露：账号密码、支付信息、隐私数据
   - 数据篡改：修改交易金额、注入恶意代码
   - 身份伪装：钓鱼攻击、社会工程学

3. **核心防御**
   - 加密传输：使用 HTTPS/TLS
   - 证书验证：确认服务器身份
   - 安全网络：避免不可信的公共 Wi-Fi

**记忆口诀**

```
中间人攻击藏中间，
窃听篡改伪装全。
HTTPS 证书是关键，
公共 Wi-Fi 要小心。
```

### 84. 什么是重放攻击？

**核心答案**

重放攻击（Replay Attack）是一种网络攻击方式，攻击者截获合法用户的有效数据包（如身份认证信息、交易请求等），然后将这些数据包重新发送给接收方，以冒充合法用户或重复执行某个操作。

**攻击原理**

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="arr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker><marker id="arr-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/></marker><marker id="arr-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#22c55e"/></marker></defs>
<text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">重放攻击流程</text>
<rect x="50" y="60" width="120" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="110" y="90" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e40af">合法用户</text><text x="110" y="110" text-anchor="middle" font-size="12" fill="#3b82f6">(Alice)</text>
<rect x="340" y="60" width="120" height="70" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="400" y="90" text-anchor="middle" font-size="15" font-weight="bold" fill="#991b1b">攻击者</text><text x="400" y="110" text-anchor="middle" font-size="12" fill="#dc2626">(窃听并记录)</text>
<rect x="630" y="60" width="120" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="690" y="90" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e40af">服务器</text><text x="690" y="110" text-anchor="middle" font-size="12" fill="#3b82f6">(Bank)</text>
<text x="50" y="175" font-size="14" font-weight="bold" fill="#166534">阶段 1：正常通信被拦截</text><path d="M 170 95 L 620 95" stroke="#22c55e" stroke-width="2" marker-end="url(#arr-green)"/><text x="395" y="85" text-anchor="middle" font-size="11" fill="#15803d">转账 $100 给 Bob (已加密)</text>
<ellipse cx="400" cy="95" rx="60" ry="25" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5"/><path d="M 400 120 L 400 200" stroke="#ef4444" stroke-width="2" marker-end="url(#arr-red)"/><text x="480" y="160" font-size="12" fill="#dc2626">攻击者</text><text x="480" y="175" font-size="12" fill="#dc2626">捕获数据包</text>
<rect x="300" y="200" width="200" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="400" y="225" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">存储的数据包</text><text x="400" y="245" text-anchor="middle" font-size="11" fill="#78350f">{encrypted_data, signature}</text>
<text x="50" y="295" font-size="14" font-weight="bold" fill="#991b1b">阶段 2：重放攻击</text><path d="M 500 235 L 680 140" stroke="#ef4444" stroke-width="3" marker-end="url(#arr-red)" stroke-dasharray="8,4"/><text x="590" y="265" text-anchor="middle" font-size="12" fill="#dc2626">重新发送相同数据包</text><text x="590" y="280" text-anchor="middle" font-size="11" fill="#dc2626">(可能多次重复)</text>
<rect x="580" y="310" width="190" height="90" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="675" y="335" text-anchor="middle" font-size="13" font-weight="bold" fill="#991b1b">攻击效果</text><text x="590" y="355" font-size="12" fill="#dc2626">✗ 重复转账</text><text x="590" y="375" font-size="12" fill="#dc2626">✗ 重复登录</text><text x="590" y="395" font-size="12" fill="#dc2626">✗ 绕过认证</text>
<rect x="30" y="430" width="740" height="60" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/><text x="400" y="455" text-anchor="middle" font-size="14" font-weight="bold" fill="#166534">关键特征</text><text x="50" y="475" font-size="12" fill="#15803d">• 数据包本身是合法的（有效签名、正确加密）</text><text x="450" y="475" font-size="12" fill="#15803d">• 攻击者不需要破解加密或伪造签名</text>
</svg>

**典型攻击场景**

1. **金融交易重放**
   - 攻击者截获转账请求：`Transfer $1000 to Account-X`
   - 重复发送该请求多次
   - 导致受害者账户被多次扣款

2. **身份认证重放**
   - 窃取合法用户的登录凭证（token、cookie）
   - 在凭证有效期内重放，冒充用户登录
   - 即使密码已加密，攻击依然有效

3. **会话劫持**
   - 捕获 HTTP 会话的 Session ID
   - 重放包含 Session ID 的请求
   - 以合法用户身份执行操作

4. **无线网络攻击**
   - 记录 Wi-Fi 认证握手包
   - 重放握手包以通过网络认证
   - 无需破解密码即可接入网络

**防御措施**

<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="740" height="490" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#166534">重放攻击防御方案</text>
<rect x="60" y="80" width="330" height="180" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="225" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e40af">1. 时间戳机制</text><text x="80" y="140" font-size="13" fill="#1e3a8a">原理：每个请求包含当前时间戳</text><circle cx="225" cy="170" r="35" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/><text x="225" y="175" text-anchor="middle" font-size="12" fill="#0c4a6e">请求数据</text><text x="225" y="190" text-anchor="middle" font-size="10" fill="#075985">+ Timestamp</text><text x="80" y="220" font-size="12" fill="#1e3a8a">✓ 服务器检查时间差</text><text x="80" y="238" font-size="12" fill="#1e3a8a">✓ 超过阈值(如 5 分钟)拒绝</text>
<rect x="410" y="80" width="330" height="180" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="575" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#92400e">2. Nonce (随机数)</text><text x="430" y="140" font-size="13" fill="#78350f">原理：每个请求使用唯一随机数</text><circle cx="575" cy="170" r="35" fill="#fef9e7" stroke="#f59e0b" stroke-width="2"/><text x="575" y="175" text-anchor="middle" font-size="12" fill="#78350f">请求数据</text><text x="575" y="190" text-anchor="middle" font-size="10" fill="#92400e">+ Nonce</text><text x="430" y="220" font-size="12" fill="#78350f">✓ 服务器记录已用 Nonce</text><text x="430" y="238" font-size="12" fill="#78350f">✓ 重复 Nonce 拒绝请求</text>
<rect x="60" y="280" width="330" height="100" rx="6" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/><text x="225" y="310" text-anchor="middle" font-size="15" font-weight="bold" fill="#3730a3">3. 序列号机制</text><text x="80" y="335" font-size="12" fill="#312e81">✓ 每个请求带递增序列号</text><text x="80" y="353" font-size="12" fill="#312e81">✓ 服务器验证序列号连续性</text><text x="80" y="371" font-size="12" fill="#312e81">✓ 乱序或重复的序列号被拒绝</text>
<rect x="410" y="280" width="330" height="100" rx="6" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/><text x="575" y="310" text-anchor="middle" font-size="15" font-weight="bold" fill="#9f1239">4. 挑战-响应机制</text><text x="430" y="335" font-size="12" fill="#831843">✓ 服务器发送随机挑战值</text><text x="430" y="353" font-size="12" fill="#831843">✓ 客户端用密钥签名响应</text><text x="430" y="371" font-size="12" fill="#831843">✓ 每次交互使用新挑战值</text>
<rect x="60" y="400" width="680" height="90" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="400" y="425" text-anchor="middle" font-size="15" font-weight="bold" fill="#92400e">5. 组合方案（最安全）</text><text x="80" y="450" font-size="12" fill="#78350f">时间戳 + Nonce + 数字签名：</text><text x="80" y="468" font-size="12" fill="#78350f">• Signature = HMAC(Data + Timestamp + Nonce, SecretKey)</text><text x="80" y="486" font-size="12" fill="#78350f">• 服务器验证签名、时间有效性、Nonce 唯一性</text>
</svg>

**实际案例**

1. **Kerberos 协议**
   - 使用时间戳防御重放攻击
   - 票据（Ticket）有严格的有效期（通常 5-10 分钟）
   - 服务器维护最近时间窗口内的请求缓存

2. **OAuth 2.0**
   - `state` 参数作为 Nonce 防止 CSRF 和重放
   - Access Token 有过期时间
   - Refresh Token 一次性使用

3. **TLS/SSL 握手**
   - 双方交换随机数（Client Random、Server Random）
   - 每次握手生成唯一会话密钥
   - 防止旧会话被重放

4. **比特币交易**
   - 每笔交易包含唯一 TxID（交易哈希）
   - 区块链记录所有交易历史
   - 重复交易会被节点拒绝

**时间戳 vs Nonce 对比**

<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="20" width="350" height="280" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
<text x="215" y="50" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e40af">时间戳方案</text>
<text x="60" y="85" font-size="13" font-weight="bold" fill="#1e3a8a">优点：</text><text x="70" y="105" font-size="12" fill="#1e3a8a">✓ 实现简单，无需服务器存储</text><text x="70" y="123" font-size="12" fill="#1e3a8a">✓ 自动过期，无需维护历史</text><text x="70" y="141" font-size="12" fill="#1e3a8a">✓ 适合高并发场景</text>
<text x="60" y="170" font-size="13" font-weight="bold" fill="#1e3a8a">缺点：</text><text x="70" y="190" font-size="12" fill="#1e3a8a">✗ 依赖时钟同步</text><text x="70" y="208" font-size="12" fill="#1e3a8a">✗ 时间窗口内仍可重放</text><text x="70" y="226" font-size="12" fill="#1e3a8a">✗ 时钟漂移影响安全性</text>
<text x="60" y="255" font-size="13" font-weight="bold" fill="#1e3a8a">适用场景：</text><text x="70" y="275" font-size="12" fill="#1e3a8a">API 调用、微服务通信</text>
<rect x="410" y="20" width="350" height="280" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="585" y="50" text-anchor="middle" font-size="16" font-weight="bold" fill="#92400e">Nonce 方案</text>
<text x="430" y="85" font-size="13" font-weight="bold" fill="#78350f">优点：</text><text x="440" y="105" font-size="12" fill="#78350f">✓ 完全防止重放</text><text x="440" y="123" font-size="12" fill="#78350f">✓ 不依赖时钟同步</text><text x="440" y="141" font-size="12" fill="#78350f">✓ 安全性更高</text>
<text x="430" y="170" font-size="13" font-weight="bold" fill="#78350f">缺点：</text><text x="440" y="190" font-size="12" fill="#78350f">✗ 需要服务器存储已用 Nonce</text><text x="440" y="208" font-size="12" fill="#78350f">✗ 存储开销随请求量增长</text><text x="440" y="226" font-size="12" fill="#78350f">✗ 需要定期清理过期 Nonce</text>
<text x="430" y="255" font-size="13" font-weight="bold" fill="#78350f">适用场景：</text><text x="440" y="275" font-size="12" fill="#78350f">金融交易、关键认证</text>
</svg>

**关键要点**

1. **攻击特征**
   - 不需要破解加密：直接重用合法数据包
   - 时间敏感：通常在短时间窗口内有效
   - 危害严重：可能导致重复交易、未授权访问

2. **防御核心**
   - 唯一性保证：每个请求必须是独特的
   - 时效性限制：请求有明确的有效期
   - 状态验证：服务器记录并验证请求状态

3. **最佳实践**
   - 组合使用多种机制（时间戳 + Nonce + 签名）
   - 使用 HTTPS 防止数据包被截获
   - 实施严格的会话管理和 Token 过期策略

**记忆口诀**

```
重放攻击旧数据，
时间戳 Nonce 来防它。
序列号挑战要记下，
组合使用效果佳。
```

### 85. 什么是防火墙？

**核心答案**

防火墙（Firewall）是一种网络安全设备或软件，部署在内部网络和外部网络（如互联网）之间，根据预定义的安全规则监控和控制进出网络的流量，起到保护内部网络免受未授权访问和恶意攻击的作用。

**防火墙位置与作用**

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="a" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666"/></marker><marker id="a-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/></marker><marker id="a-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#22c55e"/></marker></defs>
<rect x="30" y="100" width="280" height="260" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="170" y="130" text-anchor="middle" font-size="16" font-weight="bold" fill="#991b1b">外部网络（不可信）</text>
<ellipse cx="170" cy="200" rx="40" ry="40" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="170" y="200" text-anchor="middle" font-size="24">🌐</text><text x="170" y="220" text-anchor="middle" font-size="12" fill="#78350f">互联网</text>
<ellipse cx="90" cy="280" rx="35" ry="35" fill="#fecaca" stroke="#dc2626" stroke-width="2"/><text x="90" y="280" text-anchor="middle" font-size="20">☠️</text><text x="90" y="300" text-anchor="middle" font-size="10" fill="#991b1b">黑客</text>
<ellipse cx="250" cy="280" rx="35" ry="35" fill="#fecaca" stroke="#dc2626" stroke-width="2"/><text x="250" y="280" text-anchor="middle" font-size="20">🦠</text><text x="250" y="300" text-anchor="middle" font-size="10" fill="#991b1b">病毒</text>
<rect x="340" y="100" width="130" height="260" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/><text x="405" y="130" text-anchor="middle" font-size="16" font-weight="bold" fill="#92400e">防火墙</text>
<rect x="360" y="150" width="90" height="40" rx="4" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="405" y="175" text-anchor="middle" font-size="11" fill="#166534">允许规则</text>
<rect x="360" y="200" width="90" height="40" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="405" y="225" text-anchor="middle" font-size="11" fill="#991b1b">拒绝规则</text>
<rect x="360" y="250" width="90" height="40" rx="4" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/><text x="405" y="275" text-anchor="middle" font-size="11" fill="#3730a3">检测引擎</text>
<text x="405" y="315" text-anchor="middle" font-size="10" fill="#78350f">过滤</text><text x="405" y="330" text-anchor="middle" font-size="10" fill="#78350f">监控</text><text x="405" y="345" text-anchor="middle" font-size="10" fill="#78350f">日志</text>
<rect x="500" y="100" width="270" height="260" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="635" y="130" text-anchor="middle" font-size="16" font-weight="bold" fill="#166534">内部网络（可信）</text>
<rect x="560" y="170" width="60" height="50" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="590" y="200" text-anchor="middle" font-size="24">💻</text><text x="590" y="215" text-anchor="middle" font-size="10" fill="#1e40af">Web 服务器</text>
<rect x="650" y="170" width="60" height="50" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="680" y="200" text-anchor="middle" font-size="24">🗄️</text><text x="680" y="215" text-anchor="middle" font-size="10" fill="#1e40af">数据库</text>
<rect x="560" y="250" width="60" height="50" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="590" y="280" text-anchor="middle" font-size="24">👤</text><text x="590" y="295" text-anchor="middle" font-size="10" fill="#1e40af">员工电脑</text>
<rect x="650" y="250" width="60" height="50" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="680" y="280" text-anchor="middle" font-size="24">📁</text><text x="680" y="295" text-anchor="middle" font-size="10" fill="#1e40af">文件服务器</text>
<path d="M 200 200 L 330 200" stroke="#ef4444" stroke-width="2" marker-end="url(#a-red)" stroke-dasharray="5,5"/><text x="265" y="190" text-anchor="middle" font-size="11" fill="#dc2626">恶意流量</text>
<path d="M 100 280 L 330 240" stroke="#ef4444" stroke-width="2" marker-end="url(#a-red)" stroke-dasharray="5,5"/><text x="215" y="250" text-anchor="middle" font-size="11" fill="#dc2626">攻击</text>
<line x1="405" y1="190" x2="480" y2="190" stroke="#ef4444" stroke-width="3"/><text x="442" y="180" text-anchor="middle" font-size="14" fill="#dc2626">✗</text>
<path d="M 480 200 L 550 190" stroke="#22c55e" stroke-width="2" marker-end="url(#a-green)"/><text x="515" y="185" text-anchor="middle" font-size="11" fill="#166534">合法流量</text>
<text x="400" y="385" text-anchor="middle" font-size="13" fill="#1f2937">防火墙作为网络边界的安全屏障</text>
</svg>

**防火墙类型**

<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="740" height="450" rx="8" fill="#f9fafb" stroke="#6b7280" stroke-width="2"/>
<text x="400" y="55" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937">防火墙分类</text>
<rect x="60" y="80" width="330" height="170" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><text x="225" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e40af">1. 包过滤防火墙（Packet Filtering）</text>
<text x="80" y="140" font-size="13" font-weight="bold" fill="#1e3a8a">工作层次：网络层和传输层</text><text x="80" y="165" font-size="12" fill="#1e3a8a">检查内容：源/目的 IP、端口号、协议类型</text>
<rect x="90" y="180" width="260" height="60" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1"/><text x="220" y="198" text-anchor="middle" font-size="11" fill="#0c4a6e">规则示例：</text><text x="100" y="215" font-size="10" fill="#075985">允许: src=192.168.1.0/24, dst=any, port=80</text><text x="100" y="230" font-size="10" fill="#075985">拒绝: src=any, dst=192.168.1.100, port=22</text>
<rect x="410" y="80" width="330" height="170" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="575" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="#92400e">2. 状态检测防火墙（Stateful）</text>
<text x="430" y="140" font-size="13" font-weight="bold" fill="#78350f">工作层次：网络层 + 会话层</text><text x="430" y="165" font-size="12" fill="#78350f">检查内容：连接状态、数据包关联关系</text>
<rect x="440" y="180" width="260" height="60" rx="4" fill="#fef9e7" stroke="#f59e0b" stroke-width="1"/><text x="570" y="198" text-anchor="middle" font-size="11" fill="#78350f">特点：</text><text x="450" y="215" font-size="10" fill="#92400e">✓ 维护连接状态表</text><text x="450" y="230" font-size="10" fill="#92400e">✓ 跟踪 TCP 握手、会话状态</text>
<rect x="60" y="270" width="330" height="180" rx="6" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/><text x="225" y="300" text-anchor="middle" font-size="15" font-weight="bold" fill="#3730a3">3. 应用层防火墙（Application Gateway）</text>
<text x="80" y="325" font-size="13" font-weight="bold" fill="#312e81">工作层次：应用层（第 7 层）</text><text x="80" y="345" font-size="12" fill="#312e81">检查内容：HTTP 请求、SQL 语句、文件内容</text>
<rect x="90" y="360" width="260" height="80" rx="4" fill="#eef2ff" stroke="#818cf8" stroke-width="1"/><text x="220" y="378" text-anchor="middle" font-size="11" fill="#3730a3">功能：</text><text x="100" y="395" font-size="10" fill="#4338ca">✓ URL 过滤、内容审查</text><text x="100" y="410" font-size="10" fill="#4338ca">✓ 恶意代码检测</text><text x="100" y="425" font-size="10" fill="#4338ca">✓ 深度包检测（DPI）</text>
<rect x="410" y="270" width="330" height="180" rx="6" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/><text x="575" y="300" text-anchor="middle" font-size="15" font-weight="bold" fill="#9f1239">4. 下一代防火墙（NGFW）</text>
<text x="430" y="325" font-size="13" font-weight="bold" fill="#831843">工作层次：全栈（第 2-7 层）</text><text x="430" y="345" font-size="12" fill="#831843">集成功能：传统防火墙 + IPS + 应用识别</text>
<rect x="440" y="360" width="260" height="80" rx="4" fill="#fdf2f8" stroke="#f472b6" stroke-width="1"/><text x="570" y="378" text-anchor="middle" font-size="11" fill="#9f1239">高级特性：</text><text x="450" y="395" font-size="10" fill="#be185d">✓ 用户身份识别</text><text x="450" y="410" font-size="10" fill="#be185d">✓ 威胁情报集成</text><text x="450" y="425" font-size="10" fill="#be185d">✓ SSL/TLS 解密检查</text>
</svg>

**防火墙规则示例**

<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="20" width="740" height="350" rx="8" fill="#f9fafb" stroke="#6b7280" stroke-width="2"/>
<text x="400" y="50" text-anchor="middle" font-size="16" font-weight="bold" fill="#1f2937">防火墙规则表（ACL - Access Control List）</text>
<rect x="60" y="70" width="50" height="30" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/><text x="85" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="white">序号</text>
<rect x="110" y="70" width="80" height="30" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/><text x="150" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="white">动作</text>
<rect x="190" y="70" width="120" height="30" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/><text x="250" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="white">源 IP</text>
<rect x="310" y="70" width="120" height="30" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/><text x="370" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="white">目标 IP</text>
<rect x="430" y="70" width="80" height="30" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/><text x="470" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="white">协议</text>
<rect x="510" y="70" width="80" height="30" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/><text x="550" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="white">目标端口</text>
<rect x="590" y="70" width="150" height="30" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/><text x="665" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="white">说明</text>
<rect x="60" y="100" width="50" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="85" y="120" text-anchor="middle" font-size="11" fill="#166534">1</text>
<rect x="110" y="100" width="80" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="150" y="120" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">ALLOW</text>
<rect x="190" y="100" width="120" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="250" y="120" text-anchor="middle" font-size="10" fill="#166534">Any</text>
<rect x="310" y="100" width="120" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="370" y="120" text-anchor="middle" font-size="10" fill="#166534">10.0.1.100</text>
<rect x="430" y="100" width="80" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="470" y="120" text-anchor="middle" font-size="11" fill="#166534">TCP</text>
<rect x="510" y="100" width="80" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="550" y="120" text-anchor="middle" font-size="11" fill="#166534">80, 443</text>
<rect x="590" y="100" width="150" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="665" y="120" text-anchor="middle" font-size="10" fill="#166534">允许访问 Web 服务器</text>
<rect x="60" y="130" width="50" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="85" y="150" text-anchor="middle" font-size="11" fill="#166534">2</text>
<rect x="110" y="130" width="80" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="150" y="150" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">ALLOW</text>
<rect x="190" y="130" width="120" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="250" y="150" text-anchor="middle" font-size="10" fill="#166534">192.168.1.0/24</text>
<rect x="310" y="130" width="120" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="370" y="150" text-anchor="middle" font-size="10" fill="#166534">Any</text>
<rect x="430" y="130" width="80" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="470" y="150" text-anchor="middle" font-size="11" fill="#166534">TCP</text>
<rect x="510" y="130" width="80" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="550" y="150" text-anchor="middle" font-size="11" fill="#166534">Any</text>
<rect x="590" y="130" width="150" height="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/><text x="665" y="150" text-anchor="middle" font-size="10" fill="#166534">内网出站流量</text>
<rect x="60" y="160" width="50" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="85" y="180" text-anchor="middle" font-size="11" fill="#991b1b">3</text>
<rect x="110" y="160" width="80" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="150" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">DENY</text>
<rect x="190" y="160" width="120" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="250" y="180" text-anchor="middle" font-size="10" fill="#991b1b">Any</text>
<rect x="310" y="160" width="120" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="370" y="180" text-anchor="middle" font-size="10" fill="#991b1b">10.0.1.200</text>
<rect x="430" y="160" width="80" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="470" y="180" text-anchor="middle" font-size="11" fill="#991b1b">TCP</text>
<rect x="510" y="160" width="80" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="550" y="180" text-anchor="middle" font-size="11" fill="#991b1b">22</text>
<rect x="590" y="160" width="150" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="665" y="180" text-anchor="middle" font-size="10" fill="#991b1b">禁止外部 SSH</text>
<rect x="60" y="190" width="50" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="85" y="210" text-anchor="middle" font-size="11" fill="#991b1b">4</text>
<rect x="110" y="190" width="80" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="150" y="210" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">DENY</text>
<rect x="190" y="190" width="120" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="250" y="210" text-anchor="middle" font-size="10" fill="#991b1b">Any</text>
<rect x="310" y="190" width="120" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="370" y="210" text-anchor="middle" font-size="10" fill="#991b1b">10.0.2.0/24</text>
<rect x="430" y="190" width="80" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="470" y="210" text-anchor="middle" font-size="11" fill="#991b1b">Any</text>
<rect x="510" y="190" width="80" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="550" y="210" text-anchor="middle" font-size="11" fill="#991b1b">Any</text>
<rect x="590" y="190" width="150" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/><text x="665" y="210" text-anchor="middle" font-size="10" fill="#991b1b">隔离敏感网段</text>
<rect x="60" y="220" width="50" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/><text x="85" y="240" text-anchor="middle" font-size="11" fill="#78350f">5</text>
<rect x="110" y="220" width="80" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/><text x="150" y="240" text-anchor="middle" font-size="11" font-weight="bold" fill="#78350f">LOG</text>
<rect x="190" y="220" width="120" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/><text x="250" y="240" text-anchor="middle" font-size="10" fill="#78350f">Any</text>
<rect x="310" y="220" width="120" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/><text x="370" y="240" text-anchor="middle" font-size="10" fill="#78350f">Any</text>
<rect x="430" y="220" width="80" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/><text x="470" y="240" text-anchor="middle" font-size="11" fill="#78350f">ICMP</text>
<rect x="510" y="220" width="80" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/><text x="550" y="240" text-anchor="middle" font-size="11" fill="#78350f">-</text>
<rect x="590" y="220" width="150" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/><text x="665" y="240" text-anchor="middle" font-size="10" fill="#78350f">记录 ICMP 流量</text>
<rect x="60" y="250" width="50" height="30" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/><text x="85" y="270" text-anchor="middle" font-size="11" fill="#4b5563">99</text>
<rect x="110" y="250" width="80" height="30" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/><text x="150" y="270" text-anchor="middle" font-size="11" font-weight="bold" fill="#4b5563">DENY</text>
<rect x="190" y="250" width="120" height="30" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/><text x="250" y="270" text-anchor="middle" font-size="10" fill="#4b5563">Any</text>
<rect x="310" y="250" width="120" height="30" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/><text x="370" y="270" text-anchor="middle" font-size="10" fill="#4b5563">Any</text>
<rect x="430" y="250" width="80" height="30" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/><text x="470" y="270" text-anchor="middle" font-size="11" fill="#4b5563">Any</text>
<rect x="510" y="250" width="80" height="30" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/><text x="550" y="270" text-anchor="middle" font-size="11" fill="#4b5563">Any</text>
<rect x="590" y="250" width="150" height="30" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1"/><text x="665" y="270" text-anchor="middle" font-size="10" fill="#4b5563">默认拒绝所有</text>
<rect x="60" y="300" width="680" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="400" y="325" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">规则匹配原则</text><text x="80" y="345" font-size="12" fill="#78350f">✓ 从上到下顺序匹配，命中第一条规则后停止</text><text x="450" y="345" font-size="12" fill="#78350f">✓ 默认拒绝策略（白名单模式）</text>
</svg>

**硬件防火墙 vs 软件防火墙**

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="20" width="350" height="260" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
<text x="215" y="50" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e40af">硬件防火墙</text>
<rect x="80" y="70" width="270" height="80" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1"/><text x="215" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#0c4a6e">特点</text><text x="90" y="110" font-size="12" fill="#075985">✓ 独立物理设备（如思科 ASA、Palo Alto）</text><text x="90" y="128" font-size="12" fill="#075985">✓ 高性能、低延迟</text><text x="90" y="146" font-size="12" fill="#075985">✓ 部署在网络边界</text>
<rect x="80" y="160" width="270" height="110" rx="4" fill="#bfdbfe" stroke="#0284c7" stroke-width="1"/><text x="215" y="180" text-anchor="middle" font-size="13" font-weight="bold" fill="#0c4a6e">优缺点</text><text x="90" y="200" font-size="11" fill="#1e3a8a">优点：性能强、稳定性高、集中管理</text><text x="90" y="218" font-size="11" fill="#1e3a8a">缺点：成本高、部署复杂</text><text x="90" y="236" font-size="11" fill="#1e3a8a">适用场景：企业网络、数据中心</text><text x="90" y="254" font-size="11" fill="#1e3a8a">典型产品：Cisco Firepower, Fortinet FortiGate</text>
<rect x="410" y="20" width="350" height="260" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
<text x="585" y="50" text-anchor="middle" font-size="16" font-weight="bold" fill="#92400e">软件防火墙</text>
<rect x="450" y="70" width="270" height="80" rx="4" fill="#fef9e7" stroke="#f59e0b" stroke-width="1"/><text x="585" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#78350f">特点</text><text x="460" y="110" font-size="12" fill="#92400e">✓ 运行在操作系统上（如 iptables、Windows 防火墙）</text><text x="460" y="128" font-size="12" fill="#92400e">✓ 灵活配置、成本低</text><text x="460" y="146" font-size="12" fill="#92400e">✓ 部署在主机或虚拟机</text>
<rect x="450" y="160" width="270" height="110" rx="4" fill="#fde68a" stroke="#f59e0b" stroke-width="1"/><text x="585" y="180" text-anchor="middle" font-size="13" font-weight="bold" fill="#78350f">优缺点</text><text x="460" y="200" font-size="11" fill="#92400e">优点：成本低、配置灵活、易于部署</text><text x="460" y="218" font-size="11" fill="#92400e">缺点：性能受限、消耗主机资源</text><text x="460" y="236" font-size="11" fill="#92400e">适用场景：个人电脑、服务器、云主机</text><text x="460" y="254" font-size="11" fill="#92400e">典型产品：iptables, Windows Defender Firewall</text>
</svg>

**防火墙的局限性**

1. **无法防御内部威胁**
   - 内部员工的恶意行为
   - 已授权用户的滥用权限

2. **加密流量难以检测**
   - HTTPS、VPN 流量需要解密才能检查
   - 可能侵犯隐私或影响性能

3. **应用层攻击**
   - SQL 注入、XSS 等应用漏洞
   - 需要配合 WAF（Web 应用防火墙）

4. **零日攻击**
   - 未知漏洞和新型攻击手段
   - 规则库无法及时更新

**关键要点**

1. **核心功能**
   - 访问控制：允许或拒绝特定流量
   - 状态监测：跟踪连接状态
   - 日志记录：记录流量和安全事件

2. **部署位置**
   - 网络边界：外网与内网之间
   - DMZ 区域：隔离公共服务和内部网络
   - 主机层面：每台服务器或终端

3. **配置原则**
   - 最小权限：默认拒绝，显式允许
   - 分层防御：多层防火墙配合使用
   - 定期审计：检查规则合理性

**记忆口诀**

```
防火墙守网络门，
规则匹配过滤勤。
包过滤状态应用层，
硬件软件各有分。
```
