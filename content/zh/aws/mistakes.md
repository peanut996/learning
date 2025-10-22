# AWS SAP-C02 错题本

本文档记录练习过程中答错的题目，便于后续复习和巩固薄弱知识点。

---

## 题目 328 - Containerizing multi-tier web application

**我的答案**: B
**正确答案**: D

**题目要点**:
- 容器化多层 Web 应用迁移到 AWS
- 实现容错和高可用性、可扩展性
- 频繁访问数据在应用服务器间始终可用
- 前端 Web 服务器需要会话持久性
- 随流量增长扩展
- 最少运营开销

**关键知识点**:
1. **Amazon EKS with managed node groups**: 最小运营开销的容器编排平台，AWS 管理底层节点
2. **Kubernetes deployments**: 实现自动扩展、滚动更新和容错的容器部署方式
3. **Amazon DynamoDB**: 用于存储会话数据，提供高可用性、持久性和全局访问的 NoSQL 数据库
4. **Amazon EFS**: 文件存储系统，支持容器间共享频繁访问数据，跨可用区访问

**为什么不选 B (ECS on EC2 + ElastiCache + EBS)**:
- ❌ ECS on EC2 需要手动管理 EC2 实例，开销较高（不像 Fargate 或 EKS managed nodes）
- ❌ EBS Multi-Attach 支持共享块存储，但不适合容器环境中的频繁访问数据共享，且性能不如 EFS

**为什么不选 A (ECS on Fargate + EFS + SQS)**:
- ❌ SQS 用于存储前端 Web 服务器会话数据是错误的（SQS 是消息队列，不适合持久化会话状态）

**为什么不选 C (EKS + ReplicaSets + EFS for sessions)**:
- ❌ EFS 用于前端 Web 服务器会话数据延迟较高，不适合高性能会话管理

**复习要点**:
- 容器化应用选择 EKS 或 Fargate 以减少运营开销
- 会话数据使用 DynamoDB 或 ElastiCache Redis
- 共享数据使用 EFS 或 S3
- 避免使用队列服务存储状态数据

---

## 题目 329 - Auto Scaling integration with existing ALB

**我的答案**: C
**正确答案**: B

**题目要点**:
- 网站使用 ALB 和 4 个 EC2 实例
- 实例不可用时手动添加新实例
- 需要自动处理实例替换
- 最小化切换停机时间

**关键知识点**:
1. **Auto Scaling group**: 自动维护所需数量的 EC2 实例，实现高可用性和扩展
2. **Launch template**: 定义新实例的配置，确保一致性
3. **无缝集成**: 将现有实例添加到 Auto Scaling group，无需删除现有资源
4. **Application Load Balancer (ALB)**: 分布流量，支持 Auto Scaling group

**为什么不选 C (删除 ALB 和实例 + 新建)**:
- ❌ 删除现有 ALB 和实例会导致停机，用户无法访问网站

**为什么不选 A (删除 ALB + 新建 ALB)**:
- ❌ 删除 ALB 造成停机，创建新 ALB 增加不必要复杂度

**为什么不选 D (等待 ALB 注册实例)**:
- ❌ ALB 不会自动将实例注册到 Auto Scaling group，需要手动附加

**复习要点**:
- Auto Scaling group 可以直接附加到现有 ALB
- 现有实例可以无缝添加到 Auto Scaling group
- 避免删除现有资源以最小化停机

---

## 题目 330 - Minimizing data transfer costs in PrivateLink environment

**我的答案**: D, E
**正确答案**: C, D

**题目要点**:
- 多应用环境部署在多个可用区
- 跨两个 AWS Organizations
- 使用 AWS PrivateLink-powered VPC endpoint services
- 数据传输费用高于预期
- 为开发者提供最小化传输费用的指南

**关键知识点**:
1. **AWS PrivateLink**: 提供私有连接到 VPC 端点服务，避免互联网路由
2. **NLB cross-zone load balancing**: 关闭可减少跨可用区数据传输费用
3. **Availability Zone-specific endpoint DNS**: 使用本地 DNS 保持流量在同一可用区
4. **Data transfer charges**: AWS 对跨可用区和跨区域传输收费

**为什么不选 E (Savings Plan)**:
- ❌ Savings Plan 不覆盖数据传输费用，只适用于计算资源

**为什么不选 A (Resource Access Manager)**:
- ❌ 共享子网不减少数据传输费用，可能增加安全风险

**为什么不选 B (同一组织)**:
- ❌ 虽然可减少一些费用，但不是最有效，且可能不符合组织架构

**复习要点**:
- 关闭 NLB 跨可用区负载均衡以减少费用
- 使用可用区特定端点 DNS 路由
- Savings Plan 不适用于数据传输成本

---

## 题目 331 - Cost-effective backup to S3 using Direct Connect

**我的答案**: C
**正确答案**: A

**题目要点**:
- 本地 Microsoft SQL Server 数据库夜间 200 GB 导出
- 迁移备份到 Amazon S3
- 已设置 10 Gbps Direct Connect 连接
- 最具成本效益的解决方案

**关键知识点**:
1. **AWS Storage Gateway file gateway**: 提供 SMB 文件共享，直接将数据存储到 S3，无需额外存储
2. **AWS Direct Connect**: 提供高速连接到 AWS，优化大型数据传输
3. **Amazon FSx for Windows File Server**: 托管 Windows 文件服务器，但有持续存储成本
4. **Amazon S3**: 持久对象存储，适合长期备份

**为什么不选 C (FSx Multi-AZ)**:
- ❌ 需要为 200 GB 数据支付持续 FSx 存储费用，Multi-AZ 增加成本

**为什么不选 B (FSx Single-AZ)**:
- ❌ 仍需支付持续 FSx 存储费用，且备份到 S3 需要额外配置

**为什么不选 D (Volume Gateway)**:
- ❌ Volume Gateway 适合块存储卷快照，不如 File Gateway 直接高效

**复习要点**:
- File Gateway 直接将文件存储到 S3，成本最低
- FSx 适合需要文件服务器功能的情况，但备份到 S3 更昂贵
- 选择适合数据类型和需求的网关类型

---

## 题目 332 - Establishing cross-region VPC connectivity

**我的答案**: C
**正确答案**: B

**题目要点**:
- 从本地数据中心连接到 AWS
- 连接不同区域的所有 VPC，具有传递路由
- 减少出站流量成本、增加带宽吞吐量、一致网络体验

**关键知识点**:
1. **AWS Direct Connect**: 提供专用高带宽、低延迟连接
2. **Direct Connect Gateway**: 连接多个 VPC 和 transit gateway，支持跨区域
3. **Transit Gateway**: 支持 VPC 间的传递路由
4. **Transit VIF**: 用于 Direct Connect 到 transit gateway 的连接

**为什么不选 C (Site-to-Site VPN + Transit Gateway)**:
- ❌ VPN 带宽受限（最大 1.25 Gbps），成本更高，不提供一致体验

**为什么不选 A (Site-to-Site VPN + VPC Peering)**:
- ❌ VPC Peering 不支持传递路由，且 VPN 带宽和成本问题

**为什么不选 D (Direct Connect + VPN + VPC Peering)**:
- ❌ VPC Peering 不支持传递路由，增加不必要复杂性

**复习要点**:
- Direct Connect 提供高带宽、低成本、一致性能
- Transit Gateway 支持传递路由
- VPC Peering 不支持传递路由

---

## 题目 333 - Cross-account IAM access in AWS Organizations

**我的答案**: B
**正确答案**: D

**题目要点**:
- 迁移工作负载到 AWS Organizations
- 开发和生产分别在不同成员账户
- 在管理账户创建 IAM 用户，能停止或终止两个成员账户的资源

**关键知识点**:
1. **IAM User**: AWS 账户中的身份，用于访问资源
2. **Cross-account Role**: 允许跨账户访问资源
3. **Trust Policy**: 定义哪些实体可以承担角色
4. **AWS Organizations**: 管理多个账户，支持跨账户访问

**为什么不选 B (IAM User in each member + Role in management)**:
- ❌ 这会在成员账户创建多个用户，不符合在管理账户创建单个用户的单一要求

**为什么不选 A (User and Role in management account)**:
- ❌ 角色不能直接配置对其他账户的访问，需要信任策略

**为什么不选 C (User in management + Group in member accounts)**:
- ❌ IAM 用户不能直接添加到其他账户的组，需要使用角色

**复习要点**:
- 使用 cross-account roles 和信任策略实现跨账户访问
- 角色应遵循最小权限原则
- 信任策略指定允许访问的实体

---

## 题目 342 - Automatic detection and remediation of credentials in code

**我的答案**: C
**正确答案**: D

**题目要点**:
- 审计发现开发团队将 IAM 用户密钥放入代码提交到 CodeCommit
- 希望自动查找和修复安全漏洞
- 确保凭证自动安全

**关键知识点**:
1. **AWS CodeCommit**: 托管 Git 仓库
2. **CodeCommit triggers**: 触发 Lambda 函数处理代码提交事件
3. **AWS Lambda**: 执行自定义扫描和修复逻辑
4. **IAM credentials management**: 禁用泄露凭证

**为什么不选 C (Amazon Macie)**:
- ❌ Macie 主要扫描 S3，不适合 CodeCommit 仓库

**为什么不选 A (Systems Manager script)**:
- ❌ 脚本搜索实例，不扫描代码仓库

**为什么不选 B (Scheduled Lambda)**:
- ❌ 定时扫描不实时，且不自动禁用凭证

**复习要点**:
- 使用 CodeCommit triggers 实现实时代码扫描
- Lambda 函数处理凭证检测和修复
- 自动禁用泄露凭证并通知

---

## 题目 335 - Optimizing HPC cluster performance

**我的答案**: B
**正确答案**: A, B, C

**题目要点**:
- HPC 集群从 100 个扩展到 1000 个 EC2 实例后性能下降
- 紧密耦合工作负载，生成大量共享文件存储在 EFS
- 选择设计选择以实现最大性能（选择三个）

**关键知识点**:
1. **单可用区部署**: 减少网络延迟，提高 HPC 性能
2. **弹性网络接口 (ENI)**: 以 4 的倍数附加以优化网络吞吐量
3. **Elastic Fabric Adapter (EFA)**: 提供低延迟高带宽网络，支持 HPC 通信
4. **Amazon EFS**: 共享文件存储，支持 HPC 工作负载

**为什么不选 D (跨多个可用区)**:
- ❌ 跨可用区会增加网络延迟，不适合 HPC 紧密耦合工作负载

**复习要点**:
- HPC 集群应部署在单可用区以最小化延迟
- 使用 EFA 启用实例类型
- 以 4 的倍数附加 ENI 以提高网络性能

---

## 题目 336 - Enforcing tag policies in AWS Organizations

**我的答案**: D
**正确答案**: A

**题目要点**:
- 设计 AWS Organizations 结构
- 标准化整个组织的标签应用流程
- 创建资源时要求特定标签值
- 每个 OU 有唯一标签值

**关键知识点**:
1. **AWS Organizations**: 管理多个账户的框架
2. **Service Control Policies (SCP)**: 控制允许的操作
3. **Tag Policies**: 定义标签标准和强制执行
4. **Organizational Units (OU)**: 账户分组，用于策略应用

**为什么不选 D (SCP deny without tag policy)**:
- ❌ SCP 可以定义标签名称，但不能指定每个 OU 的唯一标签值

**为什么不选 B (Tag policy attached to management account)**:
- ❌ 管理账户策略对所有 OU 适用，不能支持每个 OU 的唯一标签值

**为什么不选 C (SCP allow)**:
- ❌ Allow SCP 不如 Deny SCP 安全，且不适合这种强制执行场景

**复习要点**:
- 使用 SCP Deny 和 Tag Policy 结合
- Tag Policy 附加到 OU 以支持唯一值
- SCP 强制执行标签要求

---

## 题目 108 - Serverless API 访问 DynamoDB

**我的答案**: A, D
**正确答案**: A, C

**题目要点**:
- Serverless 架构
- 公开访问 DynamoDB 数据
- 通过简单的 HTTPS API
- 自动扩展

**关键知识点**:
1. **API Gateway REST API + 直接集成 DynamoDB** ✅
   - REST API 支持 AWS 服务直接集成
   - 可以直接调用 DynamoDB API（GetItem, PutItem, Query, Scan 等）
   - 完全 serverless，无需 Lambda 函数
   - 性能更好（减少 Lambda 冷启动延迟）
   - 自动扩展，按请求计费

2. **API Gateway HTTP API + Lambda + DynamoDB** ✅
   - HTTP API 更便宜、更快（比 REST API 便宜约 70%）
   - HTTP API **不支持直接集成 DynamoDB**，但可以集成 Lambda
   - Lambda 作为中间层访问 DynamoDB
   - 完全 serverless，自动扩展

3. **API Gateway 两种类型对比**:
   | 特性 | REST API | HTTP API |
   |------|----------|----------|
   | AWS 服务集成 | ✅ 支持（DynamoDB, SQS, SNS 等） | ❌ 不支持 |
   | Lambda 集成 | ✅ 支持 | ✅ 支持 |
   | 价格 | 较贵 | 便宜 70% |
   | 性能 | 标准 | 更快 |
   | 功能丰富度 | 功能全面 | 功能简化 |

**为什么不选 B (HTTP API + 直接集成 DynamoDB)**:
- ❌ **HTTP API 不支持 AWS 服务直接集成**
- HTTP API 只支持：Lambda 函数、HTTP endpoints、Private integrations (ALB/NLB)
- 不支持直接调用 DynamoDB、SQS、SNS 等 AWS 服务

**为什么不选 D (Global Accelerator + Lambda@Edge)**:
- ❌ **Lambda@Edge** 是 CloudFront 的功能，不是 Global Accelerator 的
- ❌ Global Accelerator 不能直接集成 Lambda
- 技术上不可行，且过于复杂

**为什么不选 E (NLB + Lambda)**:
- ❌ NLB 不是 serverless（需要管理基础设施）
- NLB 主要用于 TCP/UDP 负载均衡，不是为 HTTP API 设计的

**复习要点**:
- REST API = 支持直接集成 AWS 服务（包括 DynamoDB）
- HTTP API = 只支持 Lambda/HTTP endpoints，但更便宜更快
- 记忆技巧：REST API = Rich features，HTTP API = High performance & High value
- Serverless API 的两种方案：REST API 直连 vs HTTP API + Lambda
- Global Accelerator ≠ Lambda@Edge（Lambda@Edge 属于 CloudFront）

---

## 题目 110 - 跨账户 S3 访问

**我的答案**: A, D
**正确答案**: C, D

**题目要点**:
- Account A 的 S3 bucket 需要被 Account B 的 IAM 用户访问
- 跨账户资源共享
- 需要双向授权

**关键知识点**:
1. **跨账户访问需要双向授权** 🤝
   - Account A（资源侧）：Bucket Policy 必须包含 Principal
   - Account B（身份侧）：IAM Policy 授予用户权限
   - 两者缺一不可

2. **Bucket Policy 必须包含 Principal** ✅
   ```json
   "Principal": {
     "AWS": "arn:aws:iam::AccountB:user/UserDataProcessor"
   }
   ```
   - Principal 指定允许访问的账户/用户
   - 这是资源策略的核心
   - 没有 Principal 的 Bucket Policy 是无效的

3. **IAM Policy 不需要 Principal** ✅
   - IAM Policy 附加到用户/角色上
   - 身份已知，不需要 Principal 字段
   - 只需要指定 Action 和 Resource

**为什么不选 A (CORS)**:
- ❌ CORS 用于**浏览器的跨域请求**
- 用于 Web 应用从不同域名访问 S3
- 与跨账户 IAM 访问完全无关
- 题目是 IAM 用户直接访问，不是浏览器

**为什么不选 B (Bucket Policy 无 Principal)**:
- ❌ 缺少最关键的 **Principal 字段**
- Bucket Policy（资源策略）必须指定 Principal
- 否则无法知道允许谁访问
- 这是一个无效的策略格式

**为什么不选 E (IAM Policy 有 Principal)**:
- ❌ IAM Policy 不应该有 Principal 字段
- IAM Policy 是身份策略，附加到用户上
- 身份已知，不需要 Principal

**策略类型对比**:
| 特性 | Bucket Policy（资源策略） | IAM Policy（身份策略） |
|------|------------------------|-------------------|
| 附加到 | S3 Bucket | IAM User/Role/Group |
| Principal 字段 | ✅ 必需 | ❌ 不用 |
| 用途 | 说明"谁"可以访问 | 说明"可以访问什么" |

**跨账户访问配置清单**:
- ✅ Account A: Bucket Policy + Principal（指定 Account B 的用户）
- ✅ Account B: IAM Policy（授权访问 Account A 的 bucket）
- ✅ 双向授权，缺一不可

**复习要点**:
- 跨账户 S3 访问 = Bucket Policy (with Principal) + IAM Policy
- 资源策略需要 Principal，身份策略不需要
- CORS ≠ 跨账户访问（CORS 是浏览器跨域）
- 记忆：资源策略说"谁"，身份策略说"什么"
- 双向授权机制是 AWS 安全模型的核心

---

## 题目 113 - CloudFormation 删除非空 S3 Bucket

**我的答案**: A, E
**正确答案**: A, D

**题目要点**:
- CloudFormation 模板部署 ECS + S3 bucket
- 删除 stack 时报错（S3 bucket 非空）
- 需要支持频繁删除和重建同名 stack
- 开发和 CI/CD 环境

**关键知识点**:
1. **CloudFormation 无法删除非空的 S3 Bucket** 🚫
   - CloudFormation 默认无法删除包含对象的 S3 bucket
   - 删除 stack 时会报错并回滚
   - 必须先清空 bucket 才能删除

2. **Custom Resource + Lambda 自动清空 Bucket** ✅
   - 使用 CloudFormation Custom Resource
   - 在 stack 删除时触发 Lambda 函数
   - Lambda 函数删除 bucket 中的所有对象
   - 然后 CloudFormation 才能删除空的 bucket
   - 工作流程：
     ```
     Stack Delete → Custom Resource → Lambda 清空 Bucket
     → Lambda 返回 SUCCESS → CloudFormation 删除 Bucket
     ```

3. **IAM 权限是必需的** ✅
   - CloudFormation 执行角色必须有 `s3:DeleteObject` 权限
   - 即使有 Lambda 清空 bucket，没有权限也无法执行
   - CloudFormation 使用的是**执行角色的 IAM 权限**
   - 这是常被忽视但必不可少的配置

**为什么不选 E (Bucket Policy)**:
- ❌ **Bucket Policy 不能解决 CloudFormation 权限问题**
- CloudFormation 检查的是**执行角色的 IAM Policy**，不是 Bucket Policy
- Bucket Policy 控制"谁能访问 bucket"，不影响 CloudFormation 的执行权限
- 混淆了资源策略和身份策略的作用

**IAM Policy vs Bucket Policy 对比**:
| 策略类型 | 作用对象 | CloudFormation 使用 | 是否需要 |
|---------|---------|-------------------|---------|
| **IAM Policy** | 身份（用户/角色） | ✅ 执行角色的权限 | ✅ 必需 (选项 D) |
| **Bucket Policy** | 资源（S3 bucket） | ❌ 不检查 | ❌ 无用 (选项 E) |

**为什么不选 B**:
- ❌ **CAPABILITY_DELETE_NONEMPTY 不存在**
- CloudFormation 只有这些 Capabilities：
  - `CAPABILITY_IAM`
  - `CAPABILITY_NAMED_IAM`
  - `CAPABILITY_AUTO_EXPAND`
- DeletionPolicy: Delete 是默认值，设置了也无法删除非空 bucket

**为什么不选 C**:
- ❌ **DeletionPolicy: Retain** 会保留 bucket，不会删除
- 使用 AWS Config 定时清理增加运维复杂度
- 违反"频繁删除重建 stack"的需求
- bucket 会一直残留，无法重用同名 stack

**CloudFormation DeletionPolicy**:
- `Delete` (默认): 删除 stack 时删除资源
- `Retain`: 删除 stack 时保留资源
- `Snapshot`: 删除前创建快照（仅 RDS、EC2 卷等）

**复习要点**:
- CloudFormation 无法删除非空 S3 bucket → 需要 Custom Resource + Lambda
- CloudFormation 使用执行角色的 IAM 权限，不是 Bucket Policy
- 资源策略 (Bucket Policy) ≠ 身份策略 (IAM Policy)
- Custom Resource 是处理 CloudFormation 限制的标准方案
- 常见需要 Custom Resource 的场景：
  - 清空 S3 bucket
  - 清空 DynamoDB 表
  - 执行自定义逻辑
  - 集成外部 API
- 记忆：身份权限看 IAM，资源访问看 Bucket Policy

---

## 题目 210 - 使用 EventBridge 和 Lambda 防止创建不安全的 Security Group 规则

**我的答案**: C

**正确答案**: A

**题目要点**:
- AWS Organizations 中多个账户
- NonProd OU 中的账户禁止创建包含 0.0.0.0/0 源的入站 Security Group 规则
- 使用最少的运营开销
- 当前已有 EventBridge 规则用于通知

**关键知识点**:
1. **预防性 vs 检测性控制** ⚠️
   - **预防性控制**：在违规发生前阻止（最佳实践）
   - **检测性控制**：违规发生后检测并响应（AWS Config）
   - 本题需要预防创建不安全规则

2. **EventBridge + Lambda 的预防机制** ✅
   - EventBridge 监听 Security Group 规则创建事件
   - 触发 Lambda 函数自动删除违规规则
   - 实现零运营开销的自动化防护
   - 比手动响应 SNS 通知更高效

3. **SCP（Service Control Policy）限制** ❌
   - SCP 用于**组织级别**权限控制
   - 对于 EC2 Security Group，只能**允许**特定操作，不能**拒绝**
   - 不能使用条件键（如 aws:SourceIp）来精确控制 SG 规则
   - 不适合这种细粒度、预防性的要求

4. **AWS Config 检测性规则** ❌
   - vpc-sg-open-only-to-authorized-ports 是**检测性**规则
   - 只能在违规后报告，不能阻止创建
   - 不满足"移除能力"的需求

**为什么不选 C (我的选择)**:
- ❌ SCP 不能"允许"特定条件下的操作，而是通过拒绝来实现控制
- ❌ 使用"不是 0.0.0.0/0"的逻辑仍然是拒绝逻辑，但 SCP 语法不支持这种条件用于 SG
- ❌ SG 规则的权限控制更适合通过自动化工具实现，而不是组织策略

**为什么不选 B**:
- ❌ AWS Config 规则是**检测性**的，只能报告违规
- ❌ 无法"移除创建能力"，只是事后通知
- ❌ 不满足预防性需求

**为什么不选 D**:
- ❌ SCP 不能直接拒绝 ec2:AuthorizeSecurityGroupIngress 操作
- ❌ SG 权限控制不是通过 SCP 实现的，而是通过自动化或 IAM 策略
- ❌ 条件键 aws:SourceIp 在 SCP 中不适用于 SG 规则的精确控制

**控制类型对比**:
| 控制类型 | 时机 | 作用 | 示例服务 |
|---------|------|------|----------|
| **预防性** | 违规前 | 阻止违规发生 | EventBridge + Lambda, SCP |
| **检测性** | 违规后 | 检测并响应 | AWS Config, GuardDuty |

**复习要点**:
- 预防安全违规：EventBridge + Lambda 自动化响应
- SCP 适用于组织级权限，不适合细粒度 SG 控制
- AWS Config 是检测工具，不是预防工具
- Security Group 最佳实践：自动化防止 0.0.0.0/0 入站规则
- 记忆：预防用 EventBridge，检测用 Config，组织用 SCP
- 常见误区：以为 SCP 可以像 IAM 一样精确控制，但 SCP 是粗粒度的
- 复习 AWS Config 规则评估模式：proactive（预防）、detective（检测）、remedial（补救）

---

## 题目 213 - 为 VPC 中的 Lambda 提供固定公网 IP 访问外部服务

**我的答案**: C

**正确答案**: A

**题目要点**:
- Lambda 函数部署在 VPC 中
- 需要访问外部提供商的服务
- 外部提供商只允许特定公网 IPv4 地址访问
- 需要提供单个公网 IP 地址

**关键知识点**:
1. **NAT Gateway 的作用** ✅
   - 为 VPC 中的私有资源提供出站互联网访问
   - 支持关联 Elastic IP，提供固定公网 IP
   - 适用于 Lambda、EC2 等私有资源访问外部服务

2. **Lambda 在 VPC 中的网络访问** ✅
   - Lambda 连接到 VPC 后，默认无互联网访问
   - 需要 NAT Gateway 或 VPC Endpoint 实现出站访问
   - NAT Gateway 提供稳定的公网 IP，用于外部服务白名单

3. **Internet Gateway（IGW）限制** ❌
   - IGW 用于具有公网 IP 的实例的双向访问
   - Lambda 函数无法直接关联公网 IP
   - IGW 本身不提供固定 IP 地址

4. **Egress-only Internet Gateway** ❌
   - 仅用于 IPv6 出站流量
   - 不支持 IPv4，且无法关联 Elastic IP

**为什么不选 C (我的选择)**:
- ❌ IGW 无法为 Lambda 提供固定公网 IP
- ❌ Lambda 在 VPC 中无法直接使用 IGW 进行出站访问
- ❌ IGW 需要实例具有公网 IP，这与 Lambda 的无服务器特性不符

**为什么不选 B**:
- ❌ Egress-only IGW 仅支持 IPv6
- ❌ 无法关联 Elastic IP 提供固定 IPv4 地址
- ❌ 不满足 IPv4 公网访问的需求

**为什么不选 D**:
- ❌ 仅配置路由表无法实现功能
- ❌ IGW 本身不支持关联 Elastic IP
- ❌ 缺少 NAT Gateway 作为出站网关

**VPC 网络组件对比**:
| 组件 | 用途 | IP 类型 | 适用场景 |
|------|------|---------|----------|
| **NAT Gateway** | 出站互联网访问 | IPv4 | Lambda/EC2 访问外部服务 |
| **Internet Gateway** | 双向互联网访问 | IPv4/IPv6 | 公网实例 |
| **Egress-only IGW** | 出站互联网访问 | IPv6 | IPv6 私有资源 |

**Lambda VPC 网络工作流程**:
1. Lambda 函数发起出站请求
2. 请求通过私有子网路由到 NAT Gateway
3. NAT Gateway 使用关联的 Elastic IP 进行 SNAT
4. 外部服务看到固定的公网 IP 地址

**复习要点**:
- VPC 中的 Lambda 需要 NAT Gateway 实现互联网访问
- NAT Gateway + EIP = 固定公网 IP 用于外部集成
- IGW ≠ NAT Gateway（IGW 用于公网实例，NAT 用于私有资源）
- Egress-only IGW 仅 IPv6，不适用于此场景
- 记忆：私有资源出站访问用 NAT，公网实例用 IGW

---

## 题目 214 - 生成 Lambda 函数成本优化 CSV 报告

**我的答案**: D

**正确答案**: B

**题目要点**:
- 静态网站部署在 S3，使用 CloudFront 分发
- API Gateway REST API + Lambda 函数
- 每两周生成 CSV 报告：推荐内存配置、推荐成本、当前 vs 推荐价格差异
- 报告存储在 S3 bucket 中
- 最少开发时间

**关键知识点**:
1. **AWS Compute Optimizer** ✅
   - AWS 托管服务，提供 EC2、Lambda、EBS 等资源优化建议
   - 支持导出 Lambda 函数推荐配置为 CSV
   - API 操作：ExportLambdaFunctionRecommendations
   - 免费启用，无需额外付费

2. **最小开发时间方案** ✅
   - 选择 B：启用 Compute Optimizer + 简单 Lambda 调用 API + EventBridge 调度
   - 相比 A：无需从 CloudWatch Logs 手动提取和整理数据
   - 相比 C：无需设置增强基础设施指标
   - 相比 D：无需购买 Business Support 计划

3. **EventBridge 调度** ✅
   - 用于定期执行 Lambda 函数
   - 支持 cron 表达式实现每两周调度
   - 完全托管，无需管理调度器

4. **Trusted Advisor vs Compute Optimizer** ❌
   - Trusted Advisor：提供一般性建议，需要 Business Support 计划
   - Compute Optimizer：专门针对计算资源优化，更详细的 Lambda 建议
   - Compute Optimizer 更适合此场景

**为什么不选 D (我的选择)**:
- ❌ 需要购买 AWS Business Support 计划，增加成本
- ❌ Trusted Advisor 的检查不如 Compute Optimizer 专门针对 Lambda 优化
- ❌ 在 Trusted Advisor 控制台手动调度导出，开发时间更长

**为什么不选 A**:
- ❌ 需要开发复杂的 Lambda 函数从 CloudWatch Logs 提取数据
- ❌ 手动整理表格格式，开发时间长
- ❌ 相比使用 Compute Optimizer API 更复杂

**为什么不选 C**:
- ❌ 需要设置增强基础设施指标，增加配置时间
- ❌ 在控制台手动调度作业，不够自动化

**解决方案对比**:
| 选项 | 开发时间 | 复杂度 | 成本 |
|------|----------|--------|------|
| **B (Compute Optimizer API)** | 最少 | 低 | 免费 |
| A (CloudWatch Logs 提取) | 中等 | 高 | 标准 |
| C (控制台调度) | 中等 | 中等 | 免费 |
| D (Business Support) | 高 | 高 | 付费 |

**Lambda 优化报告工作流程**:
1. 启用 AWS Compute Optimizer
2. Lambda 函数调用 ExportLambdaFunctionRecommendations API
3. 获取 CSV 格式的优化建议
4. 上传到 S3 bucket
5. EventBridge 每两周触发执行

**复习要点**:
- Compute Optimizer 是 AWS 优化服务的首选
- ExportLambdaFunctionRecommendations API 直接提供 CSV 格式
- 最小开发时间 = 利用现有 AWS 服务和 API
- Business Support 计划主要用于高级支持，不是必需的
- 记忆：Lambda 优化用 Compute Optimizer，EC2 用 Trusted Advisor（基础版）

---

## 题目 216 - 跨账户迁移 Lambda 和 Aurora 数据库

**我的答案**: C

**正确答案**: B

**题目要点**:
- 从 Source 账户迁移到 Target 账户
- Lambda 函数（使用部署包）和 Aurora 数据库
- 已配置 Aurora 自动备份
- 处理关键数据，最小化停机时间

**关键知识点**:
1. **跨账户资源共享限制** ❌
   - Lambda 函数无法通过 RAM 跨账户共享
   - 需要下载部署包并在新账户重新创建
   - RAM 主要用于某些 AWS 服务，如 Aurora、VPC 等

2. **Aurora 跨账户迁移最佳实践** ✅
   - 使用 RAM 共享 Aurora 集群
   - 授予 Target 账户克隆权限
   - 克隆允许在新账户创建数据库副本，同时源数据库保持运行
   - 最小化停机时间的关键

3. **最小停机时间策略** ✅
   - 克隆 vs 快照：克隆更快更灵活
   - 克隆基于源集群，立即可用
   - 快照需要恢复，可能有延迟

4. **部署包处理** ✅
   - Lambda 部署包可以下载并在新账户使用
   - 保持函数代码和配置的一致性

**为什么不选 C (我的选择)**:
- ❌ RAM 无法共享 Lambda 函数
- ❌ Lambda 函数不支持跨账户共享，只能通过部署包迁移
- ❌ 误以为所有资源都可以通过 RAM 共享

**为什么不选 A**:
- ❌ 使用快照而非克隆，恢复时间更长
- ❌ 快照恢复可能导致停机时间增加
- ❌ 不如克隆高效

**为什么不选 D**:
- ❌ 同样无法共享 Lambda 函数
- ❌ 快照恢复不如克隆实时

**迁移策略对比**:
| 方法 | Lambda 迁移 | 数据库迁移 | 停机时间 |
|------|-------------|------------|----------|
| **B (推荐)** | 下载部署包 | RAM 共享 + 克隆 | 最短 |
| A (快照) | 下载部署包 | 共享快照 | 中等 |
| C (错误) | RAM 共享（不支持） | RAM 共享 + 克隆 | 不适用 |
| D (快照) | RAM 共享（不支持） | 共享快照 | 不适用 |

**跨账户迁移工作流程**:
1. 下载 Lambda 部署包到本地
2. 在 Target 账户创建新的 Lambda 函数
3. 使用 RAM 共享 Aurora 集群
4. 在 Target 账户克隆 Aurora 数据库
5. 验证并切换应用流量

**复习要点**:
- Lambda 跨账户迁移：下载部署包重新创建
- Aurora 跨账户迁移：使用 RAM 共享 + 克隆
- 最小停机时间：优先克隆而非快照恢复
- RAM 支持的服务：Aurora、VPC 等，但不包括 Lambda
- 记忆：Lambda 不能共享，用部署包；数据库用 RAM 克隆

---

## 题目 230 - 使用 AWS 创建业务连续性解决方案

**我的答案**: C

**正确答案**: B

**题目要点**:
- 本地主应用故障时，使用 AWS 创建业务连续性
- 应用运行在物理服务器上（也运行其他应用）
- 使用 MySQL 数据库
- 本地应用 OS 与 EC2 兼容
- 要求最小运营开销

**关键知识点**:
1. **AWS Elastic Disaster Recovery (DRS)** ✅
   - AWS 专用的灾难恢复服务
   - 安装复制代理进行持续复制
   - 支持整个服务器（包括应用和数据库）的恢复
   - 最小运营开销，自动化故障转移

2. **业务连续性 vs 迁移** ❌
   - 这是 DR 场景，不是一次性迁移
   - 需要持续同步和快速恢复
   - DRS 专为这种场景设计

3. **DRS 的优势** ✅
   - 安装代理后自动复制
   - 支持频繁的故障转移测试
   - 最近时间点恢复
   - 无需管理复杂的迁移任务

4. **DMS 的局限性** ❌
   - DMS 主要用于数据库迁移
   - 对于完整应用，需要额外配置 EC2 实例
   - 运营开销更高

**为什么不选 C (我的选择)**:
- ❌ DMS + SCT 适合数据库迁移，不适合完整的 DR 场景
- ❌ 需要手动配置 EC2 实例和同步任务
- ❌ 运营开销比 DRS 高

**为什么不选 A**:
- ❌ 手动设置复制和测试实例
- ❌ 需要更多手动操作
- ❌ 比 DRS 复杂

**为什么不选 D**:
- ❌ Storage Gateway 主要用于存储访问
- ❌ 需要手动快照和恢复
- ❌ 不支持实时复制

**DR 解决方案对比**:
| 方法 | 适用场景 | 运营开销 | 恢复时间 |
|------|----------|----------|----------|
| **DRS (推荐)** | 完整应用 DR | 最少 | 最快 |
| DMS | 数据库迁移 | 中等 | 中等 |
| Storage Gateway | 存储备份 | 高 | 最慢 |
| 手动复制 | 自定义 | 高 | 慢 |

**DRS 实施工作流程**:
1. 在源服务器安装复制代理
2. 初始化目标区域的 DRS
3. 定义启动设置
4. 定期进行故障转移测试
5. 故障时从最新时间点恢复

**复习要点**:
- DRS 是 AWS 灾难恢复的首选服务
- 支持块级复制和应用一致性快照
- 最小运营开销，自动化管理
- 适合需要业务连续性的生产应用
- 区别于迁移服务（DMS）和备份服务（Storage Gateway）
- 记忆：完整服务器 DR 用 DRS，数据库迁移用 DMS

---

## 题目 220 - 使用 Transit Gateway 连接本地网络到多个 VPC

**我的答案**: B

**正确答案**: A

**题目要点**:
- 本地数据中心通过 Site-to-Site VPN 连接到 VPC A
- VPC A 和 VPC B 通过 VPC Peering 连接
- 需要从本地服务器访问 VPC B
- 要求最少运营工作量

**关键知识点**:
1. **Transit Gateway（TGW）的优势** ✅
   - AWS 托管的网络中枢，支持连接多个 VPC、VPN、本地网络
   - 简化路由管理，一个地方配置所有路由
   - 支持 hub-and-spoke 架构，最少运营开销

2. **现有架构问题** ❌
   - VPC Peering 仅连接 VPC A 和 VPC B，不包括本地网络
   - 要访问 VPC B，需要通过 VPC A 路由，但这不是最佳实践
   - Site-to-Site VPN 连接到 VPC A 的 VGW，无法直接扩展到 VPC B

3. **Transit Gateway 解决方案** ✅
   - 创建 TGW，附加现有 VPN、VPC A、VPC B
   - 更新 TGW 路由表，添加所有网络的 IP 范围路由
   - 本地网络可以直接访问两个 VPC，无需额外 VPN

4. **选项 B 的问题** ❌
   - 创建新的 Site-to-Site VPN 到 VPC B
   - 增加管理复杂度和成本
   - 不是最少运营工作量的方案

**为什么不选 B (我的选择)**:
- ❌ 需要创建额外的 VPN 连接到 VPC B
- ❌ 增加配置和维护工作量
- ❌ Transit Gateway 可以复用现有 VPN，更高效

**为什么不选 C**:
- ❌ 手动更新所有路由表，BGP 传播等待时间
- ❌ 比 Transit Gateway 更复杂，需要更多手动操作

**为什么不选 D**:
- ❌ 修改 VGW 定义过于复杂
- ❌ 分割路由器不是标准做法
- ❌ 运营工作量大

**网络架构对比**:
| 方法 | 连接方式 | 运营工作量 | 可扩展性 |
|------|----------|------------|----------|
| **A (Transit Gateway)** | 中心辐射 | 最少 | 最高 |
| B (额外 VPN) | 点对点 | 中等 | 低 |
| C (手动路由) | 直接路由 | 高 | 中等 |
| D (修改 VGW) | 修改现有 | 高 | 低 |

**Transit Gateway 部署工作流程**:
1. 创建 Transit Gateway
2. 附加现有 Site-to-Site VPN 到 TGW
3. 附加 VPC A 和 VPC B 到 TGW
4. 配置 TGW 路由表，添加所有网络路由
5. 更新本地路由指向 TGW

**复习要点**:
- Transit Gateway 是多 VPC 和混合网络的首选
- 可以附加 VPN、Direct Connect、VPC
- 路由表集中管理，减少运营开销
- VPC Peering 适合简单场景，TGW 适合复杂网络
- 记忆：需要连接本地到多个 VPC，用 Transit Gateway

---

## 题目 233 - 静态前端成本优化

**我的答案**: B, A

**正确答案**: B, E

**题目要点**:
- 应用前端是静态网站，运行在2个EC2实例上，使用ALB
- 后端是Python应用，运行在3个EC2实例上，使用另一个ALB
- 使用On-Demand实例，峰值使用时间有限（午餐时间）
- 需要优化成本而不影响可用性

**关键知识点**:
1. **静态网站移到 S3** ✅
   - 前端静态内容适合存储在S3
   - 相比EC2实例，S3成本更低且无需管理服务器

2. **burstable实例处理峰值** ✅
   - 后端使用general purpose burstable EC2 instances
   - 适合峰值不频繁的应用，CPU积分自动扩展
   - 比On-Demand便宜，比Spot稳定

3. **实例类型选择** ❌
   - Compute optimized不适合静态前端或峰值后端
   - 需考虑负载模式而非仅实例性能

**为什么不选 A (我的选择)**:
- ❌ 更改为compute optimized实例不优化成本
- ❌ 不考虑峰值负载模式

**为什么不选 C**:
- ❌ Elastic Beanstalk不减少成本
- ❌ 仍需EC2实例运行前端

**为什么不选 D**:
- ❌ Spot实例可能中断，不适合生产环境

**成本优化对比**:
| 组件 | 当前 | 优化后 | 成本影响 |
|------|------|--------|----------|
| 前端 | EC2 + ALB | S3 | 大幅降低 |
| 后端 | On-Demand | Burstable | 中等降低 |
| 可用性 | 高 | 高 | 无影响 |

**工作流程**:
1. 前端静态文件上传到S3
2. 配置CloudFront或直接S3网站托管
3. 后端实例改为burstable类型
4. 监控CPU积分使用情况

**复习要点**:
- 静态前端用S3，动态后端用burstable实例
- 峰值负载用burstable而非Spot
- 可用性优先于成本，但burstable平衡两者
- 记忆：静态内容→S3，峰值后端→burstable实例

---

## 题目 235 - CloudFront 维护期间重定向到 S3

**我的答案**: A, D

**正确答案**: A, C, D

**题目要点**:
- CloudFront分布维护期间显示信息消息而非错误
- 使用S3 bucket存储维护内容
- 现有CloudFront分布使用Elastic Beanstalk域名为源

**关键知识点**:
1. **S3 bucket作为静态内容源** ✅
   - 上传静态维护页面到S3
   - S3适合存储静态HTML/CSS/JS文件

2. **CloudFront第二源 (Second Origin)** ✅
   - 将S3设置为CloudFront分布的第二源
   - 保持现有Elastic Beanstalk源不变

3. **Origin Access Identity (OAI)** ✅
   - 配置CloudFront和S3使用OAI
   - 确保只有CloudFront能访问S3，防止直接访问

4. **缓存行为编辑 (Cache Behavior Edit)** ✅
   - 维护期间编辑默认缓存行为指向S3源
   - 完成后恢复到Elastic Beanstalk源
   - 最小化更改，易于回滚

**为什么不选 B (新CloudFront分布)**:
- ❌ 创建新分布会造成用户混乱
- ❌ 需要重新配置DNS和CDN设置
- ❌ 增加运营复杂度和成本

**为什么不选 E (新分布缓存行为)**:
- ❌ 必须先创建新分布（选项B），复杂且不必要
- ❌ 路径模式设置和优先级管理增加错误风险

**为什么不选 F (Elastic Beanstalk配置)**:
- ❌ Elastic Beanstalk不支持直接从S3提供内容
- ❌ CloudFront已在处理请求，不需要修改应用层

**CloudFront维护重定向工作流程**:
1. 上传维护内容到S3
2. 将S3添加为第二源并配置OAI
3. 维护开始时修改默认缓存行为到S3
4. 维护结束后恢复默认行为到Elastic Beanstalk

**复习要点**:
- CloudFront维护重定向：第二源 + 缓存行为切换
- OAI确保S3安全访问
- 避免创建新分布，保持现有架构
- 最小运营开销：编辑缓存行为而非重建基础设施
- 记忆：维护消息用S3第二源，OAI安全，缓存行为切换流量

---

## 题目 236 - Lambda函数别名简化版本更新

**我的答案**: B

**正确答案**: D

**题目要点**:
- Lambda函数处理图像，参数通过环境变量
- 频繁调整参数并发布新版本
- 应用调用特定版本ARN，更新造成中断
- 需要最小运营开销简化流程

**关键知识点**:
1. **Lambda函数别名 (Lambda Function Alias)** ✅
   - 别名指向函数版本，提供稳定ARN
   - 应用使用别名ARN，无需随版本变化修改
   - 测试新版本后，切换别名指向新版本

2. **环境变量 vs 别名** ✅
   - 环境变量适合静态配置
   - 频繁更新需发布新版本，造成中断
   - 别名允许无缝切换版本

3. **DynamoDB存储参数** ❌
   - 可以动态获取参数，但仍需修改应用ARN
   - 增加DynamoDB管理开销，不符合最小运营要求

**为什么不选 B (我的选择)**:
- ❌ 使用DynamoDB存储参数，虽然可以动态更新，但应用仍需调用新版本ARN
- ❌ 增加DynamoDB表管理，不如别名简单
- ❌ 运营开销更高

**为什么不选 A**:
- ❌ 直接修改已发布版本环境变量，会立即影响所有客户端
- ❌ 无测试机会，不安全

**为什么不选 C**:
- ❌ 硬编码参数需发布新版本，仍需修改应用ARN

**Lambda版本管理对比**:
| 方法 | 应用修改 | 测试支持 | 运营开销 |
|------|----------|----------|----------|
| **别名 (推荐)** | 无需 | ✅ | 最小 |
| 环境变量 | 每次版本发布 | ❌ | 中等 |
| DynamoDB | 每次版本发布 | ✅ | 高 |

**工作流程**:
1. 创建别名指向当前版本
2. 应用使用别名ARN
3. 测试新版本后，更新别名指向新版本

**复习要点**:
- Lambda别名用于无缝版本切换
- 避免频繁修改应用ARN
- 环境变量适合静态配置，动态参数用外部存储
- 最小中断：别名而非直接版本ARN
- 记忆：别名 = 稳定接口，版本 = 代码快照

---

## 题目 239 - 工厂缺陷检测 ML 模型离线部署

**我的答案**: D

**正确答案**: B

**题目要点**:
- 工厂使用 IP 摄像头检测产品缺陷
- 使用 SageMaker 训练的 ML 模型识别缺陷
- 需要在互联网断开时仍能本地反馈
- 有本地 Linux 服务器运行 API

**关键知识点**:
1. **AWS IoT Greengrass 的离线能力** ✅
   - Greengrass 支持设备在断网时继续处理数据
   - 将 ML 模型部署到本地服务器运行推理
   - 无需依赖云端服务，实现真正的离线操作

2. **本地部署的优势** ✅
   - ML 模型在本地运行，响应更快
   - 不受网络延迟和中断影响
   - 满足工厂环境的可靠性要求

3. **其他选项的云依赖问题** ❌
   - 选项 A、C、D 都依赖互联网连接或云服务
   - 在网络中断时无法正常工作

**为什么不选 D (我的选择)**:
- ❌ D - Deploy Amazon Monitron devices on each IP camera. Deploy an Amazon Monitron Gateway on premises. Deploy the ML model to the Amazon Monitron devices. Use Amazon Monitron health state alarms to call the local API from an AWS Lambda function when a defect is detected.
- ❌ Amazon Monitron 主要用于设备健康监控和预测性维护，不是用于运行自定义 ML 模型的工具，无法直接从 IP 摄像头获取图像并运行推理

**为什么不选 A**:
- ❌ A - Set up an Amazon Kinesis video stream from each IP camera to AWS. Use Amazon EC2 instances to take still images of the streams. Upload the images to an Amazon S3 bucket. Deploy a SageMaker endpoint with the ML model. Invoke an AWS Lambda function to call the inference endpoint when new images are uploaded. Configure the Lambda function to call the local API when a defect is detected.
- ❌ 依赖 Kinesis Video Streams 和 SageMaker 端点，需要持续互联网连接上传图像到云端，网络中断时整个系统无法工作

**为什么不选 C**:
- ❌ C - Order an AWS Snowball device. Deploy a SageMaker endpoint the ML model and an Amazon EC2 instance on the Snowball device. Take still images from the cameras. Run inference from the EC2 instance. Configure the instance to call the local API when a defect is detected.
- ❌ AWS Snowball 设备主要用于数据迁移，一次性购买的硬件设备，运营成本高昂，不适合持续的本地推理任务

**AWS IoT Greengrass 工作流程**:
1. 在本地服务器安装 Greengrass Core
2. 部署包含 ML 模型的 Greengrass 组件
3. 组件从 IP 摄像头获取图像
4. 本地运行推理检测缺陷
5. 调用本地 API 提供工人反馈

**复习要点**:
- 离线 ML 推理：使用 AWS IoT Greengrass
- Greengrass 支持本地执行和数据处理
- 工厂自动化场景优先考虑离线能力
- 区别：Greengrass（离线边缘计算）、SageMaker（云端训练推理）
- 记忆：需要本地处理用 Greengrass，网络依赖用云服务

---

## 题目 237 - Global Accelerator 多区域apex domain路由

**我的答案**: A

**正确答案**: C

**题目要点**:
- 多区域应用部署，使用DynamoDB global tables
- 每个区域有ALB，公司管理内部DNS
- 需要通过apex domain访问，最少努力

**关键知识点**:
1. **Apex domain限制** ❌
   - 根域名 (apex domain) 不能用CNAME记录
   - DNS规范：CNAME不能与其他记录共存

2. **AWS Global Accelerator (Global Accelerator)** ✅
   - 提供静态IP地址，支持apex domain（A记录）
   - 自动路由到最佳端点（基于健康和地理）
   - 无需手动配置路由策略

3. **Route 53 CNAME限制** ❌
   - CNAME不能用于apex domain
   - 需要迁移DNS到Route 53，增加复杂性

4. **NLB静态IP** ❌
   - 虽然有静态IP，但仍需手动配置geolocation路由
   - 比Global Accelerator更多努力

**为什么不选 A (我的选择)**:
- ❌ CNAME不能用于apex domain
- ❌ 需要DNS迁移和手动路由配置
- ❌ 相比Global Accelerator更复杂

**为什么不选 B**:
- ❌ 类似A，增加NLB但仍不能apex domain
- ❌ 静态IP需手动路由

**为什么不选 D**:
- ❌ API Gateway + Lambda增加延迟
- ❌ round-robin不如Global Accelerator智能
- ❌ CNAME仍不能apex domain

**全局路由解决方案对比**:
| 方法 | 支持apex | 自动路由 | 运营开销 |
|------|----------|----------|----------|
| **Global Accelerator** | ✅ | ✅ | 最少 |
| Route 53 CNAME | ❌ | ❌ | 高 |
| NLB + Route 53 | ❌ | ❌ | 高 |
| API Gateway | ❌ | ❌ | 高 |

**工作流程**:
1. 创建Global Accelerator加速器
2. 配置端点组指向各区域ALB
3. 使用静态IP创建DNS A记录

**复习要点**:
- Apex domain需要A记录或静态IP，不能CNAME
- Global Accelerator适合多区域低延迟路由
- DynamoDB global tables确保数据一致性
- 最小努力：Global Accelerator自动处理路由
- 记忆：apex domain用Global Accelerator静态IP，子域用CloudFront

---
---

## 题目 239 - 工厂缺陷检测解决方案

**我的答案**: D

**正确答案**: B

**题目要点**:
- 工厂IP摄像头
- SageMaker训练ML模型识别缺陷
- 本地反馈，即使断网
- 本地Linux服务器托管API

**关键知识点**:
1. **AWS IoT Greengrass** ✅
   - 支持离线操作
   - 在本地服务器部署ML模型
   - Greengrass组件处理摄像头图像和推理
   - 检测到缺陷时调用本地API

2. **离线能力** ✅
   - Greengrass允许设备在断网时继续工作

**为什么不选 D (我的选择)**:
- ❌ Amazon Monitron用于设备健康监测，不是ML推理
- ❌ 不适合图像处理和自定义ML模型部署
- ❌ 需要额外硬件，不符合现有Linux服务器

**复习要点**:
- Greengrass适用于边缘计算和离线ML推理
- Monitron是工业监控，不是通用ML平台
- 离线要求优先选择Greengrass

---

## 题目 240 - 迁移业务案例分析

**我的答案**: A

**正确答案**: B

**题目要点**:
- 基于CMDB导出创建迁移业务案例
- 最具成本效益

**关键知识点**:
1. **AWS Migration Evaluator** ✅
   - 免费工具
   - 导入CMDB数据
   - 生成成本分析和AWS服务推荐

**为什么不选 A (我的选择)**:
- ❌ AWS Well-Architected Tool用于评估现有AWS架构
- ❌ 不直接处理CMDB导入和迁移规划

**复习要点**:
- Migration Evaluator专门用于迁移评估
- Well-Architected Tool是架构优化工具
- 免费和成本效益选择Migration Evaluator

---

## 题目 244 - Auto Scaling 实例类型选择优化

**我的答案**: A

**正确答案**: B

**题目要点**:
- Amazon EC2 Spot Instances 在 Auto Scaling 组中使用
- Launch template 使用两个 placement groups 和单一实例类型
- 监控显示 Auto Scaling 实例启动失败和用户等待时间增加
- 需要提高工作负载可靠性

**关键知识点**:
1. **Attribute-based instance type selection** ✅
   - 允许 Auto Scaling 从多个兼容实例类型中选择
   - 提高 Spot 实例可用性，减少启动失败
   - 相比单一实例类型更可靠

2. **Launch configuration vs launch template** ❌
   - Launch configuration 已弃用，不推荐使用
   - Launch template 支持更多功能，如 attribute-based 选择

3. **Placement groups 的局限性** ❌
   - 主要优化网络性能，不解决实例供应问题
   - 增加 placement groups 不会提高实例可用性

4. **实例类型多样化** ✅
   - 通过指定 vCPU、内存等属性而非具体类型
   - AWS 选择最佳可用实例，降低中断风险

**为什么不选 A (我的选择)**:
- ❌ Launch configuration 已弃用，不支持 attribute-based instance type selection
- ❌ 无法实现实例类型多样化

**为什么不选 C**:
- ❌ 增加 placement groups 数量不会解决实例类型单一导致的供应不足
- ❌ Placement groups 主要用于网络优化，不提高可靠性

**为什么不选 D**:
- ❌ 使用更大实例类型不会提高可靠性，反而可能增加成本
- ❌ 不解决 Spot 实例供应多样性的核心问题

**复习要点**:
- Auto Scaling 可靠性优化：使用 attribute-based instance type selection
- Launch template 支持新功能，launch configuration 已弃用
- Spot 实例中断：通过多样化实例类型降低风险
- Placement groups 用于网络，不用于实例供应
- 记忆：单一类型易中断，多样化更可靠

---

## 题目 245 - 文档处理迁移本地文件访问

**我的答案**: B

**正确答案**: C

**题目要点**:
- 文档处理工作负载迁移到AWS
- 应用已更新使用S3 API，但处理服务器暂时无法更新
- 服务器需要快速本地文件访问
- 处理完成后文件必须在30分钟内可公开下载

**关键知识点**:
1. **Amazon FSx for Lustre + S3集成** ✅
   - FSx for Lustre提供高性能文件系统
   - 支持与S3 bucket链接，实现自动导入/导出
   - 允许本地NFS访问，同时同步到S3

2. **导入/导出策略** ✅
   - 导入策略：从S3加载对象到文件系统
   - 导出策略：将文件系统更改同步回S3
   - 确保处理完成后文件在S3中可用

3. **Lustre客户端** ✅
   - Linux兼容的客户端
   - 通过NFS挂载文件系统
   - 提供本地文件系统般的访问体验

4. **S3 File Gateway的局限性** ❌
   - 主要用于从本地访问S3文件
   - 写入依赖缓存，不保证实时同步
   - 不适合将本地生成的文件高效推送到S3

**为什么不选 B (我的选择)**:
- ❌ S3 File Gateway设计用于访问S3文件，不适合将本地文件同步到S3
- ❌ 依赖缓存机制，无法保证30分钟内S3可用性
- ❌ 需要手动RefreshCache API调用，运营开销大

**为什么不选 A**:
- ❌ Lambda不支持本地文件访问
- ❌ 需要重写应用使用S3 API，违反暂时无法更新的需求

**为什么不选 D**:
- ❌ DataSync需要配置定时任务
- ❌ 不如FSx for Lustre的自动同步高效
- ❌ 可能无法满足30分钟可用性要求

**复习要点**:
- 迁移期间本地文件访问：使用FSx for Lustre链接S3
- FSx for Lustre适合高性能计算和S3集成
- S3 File Gateway用于从本地访问S3，DataSync用于批量同步
- 导入/导出策略控制S3同步行为
- 记忆：需要本地访问+ S3存储用FSx for Lustre

---

## 题目 246 - 微服务用户数据删除事件驱动

**我的答案**: A

**正确答案**: C

**题目要点**:
- 无服务器微服务架构
- 中央用户服务删除用户时，其他微服务必须立即删除副本
- 需要跨微服务的数据一致性

**关键知识点**:
1. **Amazon EventBridge自定义事件总线** ✅
   - 支持发布自定义事件
   - 解耦发送者和接收者
   - 立即触发，无需轮询

2. **EventBridge规则** ✅
   - 基于事件模式匹配
   - 可以触发多个目标（Lambda、微服务等）
   - 支持复杂过滤

3. **DynamoDB Streams的局限性** ❌
   - 捕获所有表更改（插入、更新、删除），噪音大
   - 需要额外Lambda处理
   - 不适合精确的用户删除事件

4. **SQS的单消费者限制** ❌
   - 消息只能被一个消费者处理
   - 无法同时通知多个微服务

**为什么不选 A (我的选择)**:
- ❌ DynamoDB Streams产生所有更改事件，噪音过多
- ❌ SQS消息只能被单个微服务消费，无法同时通知多个服务
- ❌ 轮询不是立即的

**为什么不选 B**:
- ❌ DynamoDB不支持直接事件通知
- ❌ 需要通过Streams或Lambda中介
- ❌ 选项描述的功能不存在

**为什么不选 D**:
- ❌ SQS不支持事件过滤器
- ❌ 无法同时分发给多个微服务

**复习要点**:
- 微服务间事件通信：使用EventBridge自定义总线
- 立即响应：EventBridge比轮询更快
- 多目标通知：EventBridge规则支持多个触发
- DynamoDB Streams用于所有更改，EventBridge用于特定事件
- 记忆：跨服务立即通知用EventBridge，单服务队列用SQS

---

## 题目 248 - AWS Control Tower 强制 EBS 加密

**我的答案**: C, D, E

**正确答案**: C, D, F

**题目要点**:
- 公司需要强制生产账户 EBS 加密
- 使用内置蓝图和护栏
- 仅针对当前和未来生产账户

**关键知识点**:
1. **AWS Control Tower 着陆区** ✅
   - 在管理账户创建着陆区
   - 建立 OU 结构和账户
   - 提供内置蓝图和治理

2. **AWS Organizations 账户邀请** ✅
   - 将现有账户加入组织
   - 创建 SCP 确保合规

3. **检测 EBS 加密的护栏** ✅
   - 为生产 OU 创建护栏
   - 检测 EBS 加密违规
   - 仅应用于生产 OU，确保针对性

4. **管理账户 vs OU 护栏** ❌
   - 管理账户护栏应用于整个组织
   - 生产 OU 护栏仅针对生产账户
   - 符合"仅生产账户"的需求

**为什么不选 E (我的选择)**:
- ❌ 选项 E：从管理账户创建检测 EBS 加密的护栏
- ❌ 管理账户护栏应用于所有账户，而非仅生产账户
- ❌ 不符合"仅当前和未来生产账户"的要求

**为什么不选 A**:
- ❌ CloudFormation StackSets 部署 Config 规则
- ❌ 需要自定义配置，缺乏内置蓝图
- ❌ 运营开销更高

**为什么不选 B**:
- ❌ 在现有开发者账户创建着陆区

---

## 题目 324 - 容器镜像漏洞扫描和自动删除

**我的答案**: D

**正确答案**: A

**题目要点**:
- 容器镜像上传后自动扫描漏洞
- 发现Critical或High级别漏洞时自动删除标签
- 通知开发团队

**关键知识点**:
1. **ECR Scan on Push + EventBridge + Step Functions** ✅
   - ECR 推送时自动扫描镜像
   - EventBridge 监听扫描完成事件
   - Step Functions 编排删除标签和通知流程

2. **自动删除违规镜像** ✅
   - 仅在Critical或High漏洞时删除
   - 保留镜像标签以便重新构建
   - 通知团队进行修复

3. **EventBridge 事件驱动架构** ✅
   - 解耦扫描和响应逻辑
   - 支持复杂工作流
   - 立即响应扫描结果

4. **定时扫描 vs 推送扫描** ❌
   - 推送扫描更及时，符合自动要求
   - 定时扫描有延迟，不适合立即响应

5. **SQS 的局限性** ❌
   - 不需要队列持久化扫描结果
   - Step Functions 更适合复杂逻辑
   - SES 不适合内部通知

**为什么不选 D (我的选择)**:
- ❌ 定时扫描不是自动的，不符合"当新镜像上传"要求
- ❌ 无法立即检测和响应新镜像
- ❌ 运营开销更高，需要定期调度

**为什么不选 B**:
- ❌ SQS 不适合此场景，扫描结果不需要队列
- ❌ SES 用于批量邮件，不适合开发团队通知
- ❌ 架构过于复杂

**为什么不选 C**:
- ❌ 手动扫描无法自动化删除
- ❌ 需要持续监控和手动操作
- ❌ 不符合自动要求

**复习要点**:
- 镜像漏洞扫描：ECR scan on push
- 自动响应：EventBridge + Step Functions
- 通知：SNS 而非 SES（SES 用于营销邮件）
- 及时性：推送扫描比定时扫描更好
- 常见误区：以为 SES 可以用于内部通知，但 SES 主要用于外部邮件

---

## 题目 325 - 使用 Compute Savings Plan 优化多账户计算成本

**我的答案**: C

**正确答案**: B

**题目要点**:
- 公司使用 AWS Organizations 管理多个账户
- 工作负载运行在 EC2、Fargate 和 Lambda 上
- 需求不可预测，成本波动大
- 希望在未来 3 年优化计算成本

**关键知识点**:
1. **Compute Savings Plan (计算节省计划)** ✅
   - 支持 EC2、Fargate 和 Lambda
   - 提供高达 66% 的折扣
   - 在组织管理账户级别购买，覆盖所有成员账户

2. **Reserved Instances (预留实例) vs Savings Plans** ✅
   - RI 仅支持 EC2 实例
   - Savings Plans 支持更广泛的计算服务
   - Savings Plans 更灵活，适用于不可预测工作负载

3. **组织级别购买** ✅
   - 在管理账户购买 Savings Plans
   - 自动应用于所有成员账户的符合工作负载
   - 简化管理和最大化节省

4. **基于历史使用量购买** ✅
   - 使用 6 个月平均数据计算推荐
   - 确保承诺量匹配实际使用

**为什么不选 C (我的选择)**:
- ❌ RI 仅支持 EC2，不支持 Fargate 和 Lambda
- ❌ 需要为每个成员账户单独购买和管理，复杂性高
- ❌ 不如组织级别的 Savings Plans 高效

**为什么不选 A**:
- ❌ RI 仅支持 EC2，忽略了 Fargate 和 Lambda 的成本
- ❌ 组织级 RI 仍然仅限于 EC2

**为什么不选 D**:
- ❌ EC2 Instance Savings Plan 仅支持 EC2，不支持 Fargate 和 Lambda
- ❌ 每个成员账户单独购买，管理复杂

**复习要点**:
- Compute Savings Plan：支持 EC2/Fargate/Lambda，最大化节省
- RI vs Savings Plans：RI 仅 EC2，Savings Plans 更灵活
- 组织级购买：简化管理和覆盖所有账户
- 不可预测工作负载：Savings Plans 比 RI 更好
- 记忆：多服务节省用 Compute Savings Plan，纯 EC2 用 Instance Savings Plan

---

## 题目 326 - 使用 AWS Budgets 监控组织成本预算

**我的答案**: D

**正确答案**: B

**题目要点**:
- 公司有数百个 AWS 账户，使用 Organizations 管理
- 财务团队分配每日预算
- 当成本超过预算 80% 时发送邮件通知

**关键知识点**:
1. **AWS Budgets (预算)** ✅
   - 支持组织级预算，聚合所有账户成本
   - 可以设置预算阈值和通知

2. **预估成本 vs 实际成本** ✅
   - Budgets 支持基于预估成本的警报（forecasted）
   - 预估成本允许提前预警，避免超支

3. **SNS 通知** ✅
   - Budgets 使用 SNS 发送通知
   - 支持邮件、短信等多种渠道

4. **SES 不支持** ❌
   - Budgets 不支持直接通过 SES 发送通知
   - 必须使用 SNS

**为什么不选 D (我的选择)**:
- ❌ Budgets 不支持基于实际成本超过 80% 的通知
- ❌ 仅支持预估成本（forecasted costs）
- ❌ 实际成本通知太晚，无法提前预警

**为什么不选 A**:
- ❌ SES 不受 Budgets 支持
- ❌ 预估成本正确，但通知渠道错误

**为什么不选 C**:
- ❌ 每个成员账户单独预算，无法聚合组织总成本
- ❌ 管理复杂，且无法反映整体预算

**复习要点**:
- AWS Budgets：组织级成本监控和警报
- 预估成本通知：允许提前干预
- SNS：Budgets 标准通知渠道
- SES：不支持 Budgets，直接邮件不适用
- 记忆：预算警报用预估成本 + SNS
- ❌ 不推荐使用现有账户，违反最佳实践

**Control Tower 护栏类型对比**:
| 护栏类型 | 适用范围 | 使用场景 |
|---------|----------|----------|
| **OU 护栏** | 特定 OU | 生产环境特定要求 |
| **管理账户护栏** | 整个组织 | 全局治理 |

**工作流程**:
1. 在管理账户创建 Control Tower 着陆区
2. 创建生产和开发 OU
3. 邀请现有账户加入组织
4. 为生产 OU 创建 EBS 加密检测护栏

**复习要点**:
- Control Tower 着陆区：内置蓝图和护栏
- OU 护栏：针对特定组织单元
- 管理账户护栏：全局应用
- 账户邀请：将现有账户纳入治理
- 记忆：生产专用护栏用 OU，全局用管理账户

---

## 题目 250 - EC2实例成本优化和适当调整大小

**我的答案**: D, F

**正确答案**: C, D

**题目要点**:
- 解决方案架构师想要在单一AWS账户中成本优化和适当调整Amazon EC2实例大小
- 确保实例基于CPU、内存和网络指标进行优化
- 选择两个步骤组合

**关键知识点**:
1. **Amazon CloudWatch代理内存指标收集** ✅
   - CloudWatch基本指标不包括内存使用率
   - 需要安装CloudWatch代理来收集内存指标
   - 为Compute Optimizer提供完整的数据

2. **AWS Compute Optimizer** ✅
   - 提供EC2实例、EBS卷、Lambda函数的优化建议
   - 基于CPU、内存、网络等指标分析
   - 生成实例类型和大小的推荐

3. **Amazon CloudWatch vs Compute Optimizer** ✅
   - CloudWatch：监控和收集指标
   - Compute Optimizer：基于指标提供优化建议

4. **Trusted Advisor的局限性** ❌
   - \"Low Utilization Amazon EC2 Instances\"推荐需要Enterprise Support
   - 不适合成本优化场景

5. **Savings Plans** ❌
   - 用于预留实例折扣，不直接用于实例大小调整

**为什么不选 D, F (我的选择)**:
- ❌ 选项F不存在，选项只有A-E
- ❌ 如果指选项D和E：Compute Optimizer正确，但CloudWatch分析不如Compute Optimizer直接提供推荐
- ❌ 缺少内存指标收集（选项C）

**为什么不选 A**:
- ❌ AWS Business Support或Enterprise Support不是必需的
- ❌ Compute Optimizer是免费的，无需高级支持

**为什么不选 B**:
- ❌ Trusted Advisor的\"Low Utilization\"推荐需要Enterprise Support计划
- ❌ 不适合所有账户，且不如Compute Optimizer专门

**为什么不选 E**:
- ❌ Savings Plans用于成本优化，但不基于实时指标调整实例大小
- ❌ 预留实例不解决动态调整大小的需求

**EC2优化工具对比**:
| 工具 | 用途 | 优势 | 局限性 |
|------|------|------|--------|
| **CloudWatch** | 指标收集和监控 | 全面指标 | 不提供优化建议 |
| **Compute Optimizer** | 优化建议 | 基于指标的推荐 | 需要指标数据 |
| **Trusted Advisor** | 一般建议 | 免费基本检查 | 高级功能需付费 |

**EC2成本优化工作流程**:
1. 安装CloudWatch代理收集内存指标
2. 启用Compute Optimizer
3. 接收实例大小和类型的优化建议
4. 根据建议调整实例配置

**复习要点**:
- EC2实例优化：CloudWatch + Compute Optimizer
- 内存指标需要额外代理收集
- Compute Optimizer免费且自动生成建议
- Trusted Advisor高级功能需要付费支持
- 记忆：监控用CloudWatch，优化用Compute Optimizer

---

## 题目 255 - 使用AWS Data Exchange共享Redshift数据

**我的答案**: D

**正确答案**: B

**题目要点**:
- 公司使用AWS运行应用，整理数据存储在Redshift表中
- 通过FTP销售数据给客户，客户数量增加管理困难
- 使用AWS Data Exchange创建数据产品
- 确认客户身份，提供最新数据，最小运营开销

**关键知识点**:
1. **AWS Data Exchange datashare** ✅
   - 连接Data Exchange到Redshift集群创建datashare
   - 允许订阅客户直接查询Redshift数据
   - 实时访问最新数据，无需复制

2. **订阅验证** ✅
   - Data Exchange处理订阅验证
   - 确保只有验证客户能访问
   - 最小运营开销

3. **Redshift数据共享** ✅
   - Datashare允许跨账户共享Redshift数据
   - 实时，无需ETL或复制

4. **Open Data on AWS** ❌
   - 公开数据集，无法控制访问
   - 不能确认客户身份

**为什么不选 D (我的选择)**:
- ❌ Open Data on AWS是公开的，不能用于私有数据销售
- ❌ 无法确认客户身份和控制访问
- ❌ IAM策略不直接支持Data Exchange订阅

**为什么不选 A**:
- ❌ 需要额外API Gateway配置
- ❌ 增加运营开销（维护API）
- ❌ 虽然实时，但更复杂

**为什么不选 C**:
- ❌ 需要定期下载到S3
- ❌ 数据不是最新的（延迟）
- ❌ 运营开销高（维护下载脚本）

**AWS Data Exchange数据共享对比**:
| 方法 | 实时性 | 运营开销 | 访问控制 |
|------|--------|----------|----------|
| **Datashare (推荐)** | ✅ 实时 | 最小 | 订阅验证 |
| APIs | ✅ 实时 | 中等 | 订阅验证 |
| S3 | ❌ 延迟 | 高 | 订阅验证 |
| Open Data | ✅ 实时 | 低 | 无控制 |

**工作流程**:
1. 创建Redshift datashare
2. 连接到Data Exchange
3. 配置订阅验证
4. 客户订阅后直接查询

**复习要点**:
- Data Exchange datashare直接共享Redshift数据
- 订阅验证确保身份确认
- 最小运营开销：无需额外基础设施
- Open Data用于公开数据，不能控制访问
- 记忆：实时共享用datashare，控制访问用订阅验证

---

## 题目 256 - 事件处理解决方案设计

**我的答案**: D

**正确答案**: B

**题目要点**:
- 设计事件处理解决方案，根据接收事件数量缩放
- 处理错误时，事件移动到单独队列审查

**关键知识点**:
1. **SQS + EC2 Auto Scaling** ✅
   - SQS队列缓冲事件
   - ASG基于ApproximateAgeOfOldestMessage缩放
   - 死信队列处理失败消息

2. **ApproximateAgeOfOldestMessage** ✅
   - 指标表示队列中最旧消息的年龄
   - 用于检测积压，触发缩放

3. **死信队列** ✅
   - 处理无法处理的消息
   - 允许后续审查和重试

4. **EventBridge + ALB** ❌
   - 不直接支持基于事件数量缩放
   - 需要手动配置，复杂

**为什么不选 D (我的选择)**:
- ❌ EventBridge不支持直接缩放机制
- ❌ ALB配置复杂，不基于事件数量
- ❌ 重试和死信队列不如SQS + ASG直接

**为什么不选 A**:
- ❌ Lambda有并发限制，不适合大量事件
- ❌ SNS不提供缩放控制

**为什么不选 C**:
- ❌ DynamoDB Stream + Lambda有并发限制
- ❌ 无死信队列机制

**事件处理架构对比**:
| 架构 | 缩放机制 | 错误处理 | 适用场景 |
|------|----------|----------|----------|
| **SQS + ASG** | 基于消息年龄 | 死信队列 | 高负载事件处理 |
| SNS + Lambda | 并发限制 | SQS目标 | 简单通知 |
| DynamoDB + Lambda | 并发限制 | 无 | 数据变更 |
| EventBridge + EC2 | 手动 | 重试 | 复杂路由 |

**工作流程**:
1. 事件发布到SQS
2. 基于消息年龄缩放EC2实例
3. 处理成功或失败到死信队列

**复习要点**:
- SQS提供可靠缓冲和缩放指标
- ApproximateAgeOfOldestMessage触发ASG
- 死信队列处理不可处理事件
- Lambda不适合高并发事件处理
- 记忆：缩放用SQS指标，错误用死信队列

---

## 题目 257 - 处理引擎API解决方案

**我的答案**: A

**正确答案**: B

**题目要点**:
- 处理引擎处理物流中心环境数据
- 数百万设备通过RESTful API发送信息
- API经历不可预测的流量爆发
- 必须处理所有数据，数据丢失不可接受

**关键知识点**:
1. **API Gateway HTTP API + SQS** ✅
   - API Gateway直接集成SQS队列
   - 所有请求入队，无数据丢失
   - Lambda异步处理消息

2. **SQS消息持久性** ✅
   - 保证消息不丢失
   - 处理流量爆发

3. **异步处理** ✅
   - Lambda处理队列消息
   - 解耦API接收和处理

4. **ALB直接集成SQS** ❌
   - ALB不支持SQS作为目标
   - 需要额外中间层

**为什么不选 A (我的选择)**:
- ❌ ALB不能直接将SQS作为目标
- ❌ ALB用于HTTP负载均衡，不支持队列集成
- ❌ 需要手动配置ECS处理

**为什么不选 C**:
- ❌ API Gateway + EC2 Auto Scaling可以处理高负载
- ❌ 但不保证所有消息无丢失处理
- ❌ 同步处理可能丢失数据

**为什么不选 D**:
- ❌ CloudFront用于内容分发，不适合API
- ❌ Kinesis适合实时流，不直接处理REST API
- ❌ 复杂且不保证无丢失

**API架构对比**:
| 架构 | 数据丢失保护 | 集成 | 处理 |
|------|----------------|------|------|
| **API Gateway + SQS** | SQS保证 | 直接 | 异步Lambda |
| ALB + SQS | SQS保证 | 不支持 | ECS同步 |
| API Gateway + EC2 | 无 | 代理 | 同步 |
| CloudFront + Kinesis | 流保证 | 复杂 | 实时Lambda |

**工作流程**:
1. 设备发送到API Gateway
2. 请求直接写入SQS
3. Lambda异步处理

**复习要点**:
- API Gateway HTTP API支持SQS服务集成
- SQS提供消息持久性，防止爆发流量丢失
- 异步处理适合高负载场景
- ALB不能直接集成SQS
- 记忆：爆发流量用API Gateway + SQS，防止丢失

---

## 题目 262 - S3 对象同步和访问点

**我的答案**: A, B

**正确答案**: A, B, E

**题目要点**:
- 应用存储对象到 S3 bucket
- 部署在两个 AWS Regions，同时使用
- 对象在两个 buckets 间保持同步
- 最少运营开销

**关键知识点**:
1. **S3 Multi-Region Access Point** ✅
   - 提供全局端点，无需更改应用代码
   - 基于延迟自动路由到最近的 bucket
   - 简化应用架构

2. **S3 Cross-Region Replication (CRR)** ✅
   - 双向复制确保两个 regions 的 buckets 同步
   - 自动复制新对象和更新
   - 完全托管，无需手动同步

3. **S3 Versioning** ✅
   - CRR 需要启用 versioning
   - 确保对象版本一致性
   - 防止复制冲突

4. **其他选项的局限性** ❌
   - C: 修改应用代码增加复杂度
   - D: 生命周期规则不适合实时同步
   - F: Lambda 复制增加运营开销

**为什么不选 A, B (我的选择)**:
- ❌ 缺少 E（S3 Versioning）
- ❌ CRR 要求启用 versioning，否则无法工作
- ❌ 版本控制是 CRR 的前提条件

**为什么不选 C**:
- ❌ 修改应用存储到两个 buckets 增加复杂性
- ❌ 违反最少运营开销要求

**为什么不选 D**:
- ❌ 生命周期规则用于对象生命周期管理
- ❌ 不适合实时同步，无法保证同步性

**为什么不选 F**:
- ❌ 使用 Lambda 和事件通知手动复制
- ❌ 运营开销高，易出错

**S3 同步方案对比**:

| 方案 | 运营开销 | 实时性 | 自动化 |
|------|----------|--------|--------|
| **Multi-Region AP + CRR + Versioning** | 最小 | ✅ | ✅ |
| 修改应用 | 高 | ✅ | ❌ |
| 生命周期规则 | 中等 | ❌ | ❌ |
| Lambda 事件 | 高 | ❌ | ❌ |

**工作流程**:
1. 启用 S3 Versioning
2. 配置双向 CRR
3. 创建 Multi-Region Access Point
4. 应用使用全局端点，无需修改

**复习要点**:
- S3 对象同步：使用 CRR + Versioning
- 全局访问：Multi-Region Access Point
- 最少开销：托管服务，无需自定义代码
- CRR 要求 versioning 启用
- 记忆：同步用 CRR，访问用 Multi-Region AP，版本用 Versioning

---

## 题目 259 - ECS API SQL注入攻击防护

**我的答案**: B

**正确答案**: C

**题目要点**:
- 公共API运行在ECS任务上，Fargate上，ALB后面
- 基于CPU利用率的Service Auto Scaling
- 最近性能变慢，发现大量SQL注入攻击，服务扩展到最大
- 防止SQL注入到达ECS API服务，允许合法流量，最大运营效率

**关键知识点**:
1. **AWS WAF SQL数据库规则组** ✅
   - 托管规则组专门检测SQL注入模式
   - 自动更新，无需手动维护
   - 附加到ALB提供保护

2. **Web ACL配置** ✅
   - 阻止匹配规则的请求
   - 允许其他合法流量
   - 最大运营效率

3. **Bot Control vs SQL注入** ❌
   - Bot Control用于机器人流量
   - 不专门处理SQL注入

**为什么不选 B (我的选择)**:
- ❌ Bot Control用于阻止机器人，不是SQL注入
- ❌ 不匹配攻击类型

**为什么不选 A**:
- ❌ 只是监控，不阻止攻击
- ❌ 不满足防止攻击到达服务的需求

**为什么不选 D**:
- ❌ 需要Lambda函数抓取日志，维护IP列表
- ❌ 运营开销高，不如托管规则高效

**WAF保护对比**:
| 方法 | 攻击类型 | 运营效率 | 自动更新 |
|------|----------|----------|----------|
| **SQL规则组** | SQL注入 | 高 | ✅ |
| Bot Control | 机器人 | 高 | ✅ |
| 监控 | 无 | 低 | ❌ |
| IP阻塞 | IP基础 | 低 | ❌ |

**工作流程**:
1. 请求通过WAF检查
2. 匹配SQL注入模式则阻止
3. 合法请求到达ALB

**复习要点**:
- WAF托管规则组自动保护常见攻击
- SQL注入规则专门检测数据库攻击
- 附加到ALB提供API保护
- 托管规则无需手动更新
- 记忆：SQL注入用SQL数据库规则组，机器人用Bot Control

---

## 题目 280 - 使用传输网关路由表限制VPC间流量

**我的答案**: D

**正确答案**: C

**题目要点**:
- 多个VPC连接到传输网关，共享互联网流量通过共享服务VPC
- 安全审计显示VPC间可以相互通信
- 需要限制每个VPC只能与预定义的授权VPC通信

**关键知识点**:
1. **传输网关路由表 (Transit Gateway Route Table)** ✅
   - 为每个VPC附件创建专用路由表
   - 精细控制VPC间路由，限制到授权VPC
   - 防止使用默认路由表导致的过度连接

2. **默认路由表 vs 专用路由表** ✅
   - 默认路由表应用到所有附件，导致全连接
   - 专用路由表允许自定义路由规则

3. **VPC间通信隔离** ✅
   - 通过路由表控制实现安全隔离
   - 满足合规和安全要求

**为什么不选 D (我的选择)**:
- ❌ 更新VPC主路由表仅影响单个VPC的路由
- ❌ 无法改变传输网关级别的路由控制
- ❌ 传输网关使用其自己的路由表决定流量转发

**为什么不选 A**:
- ❌ 网络ACL用于子网级别控制
- ❌ 难以管理跨VPC的精细路由
- ❌ 不适合网络层隔离

**为什么不选 B**:
- ❌ 安全组基于实例级别，不控制VPC间路由
- ❌ 无法拒绝到未授权VPC的流量
- ❌ 不适合网络级隔离

**复习要点**:
- 传输网关路由表是控制VPC间流量的关键
- 专用路由表提供精细访问控制
- VPC主路由表不影响传输网关路由决策
- 记忆：VPC间隔离用传输网关路由表，实例级用安全组

---

## 题目 284 - 使用Direct Connect和VPC端点实现私有数据传输到多账户S3

**我的答案**: B

**正确答案**: A, C

**题目要点**:
- 从本地系统私有传输数据到三个不同账户的S3存储桶
- 数据不能通过互联网传输
- 没有现有专用AWS连接

**关键知识点**:
1. **AWS Direct Connect私有VIF** ✅
   - 提供本地到AWS的专用私有连接
   - 支持VPC访问而不通过互联网

2. **S3接口端点 (Interface Endpoint)** ✅
   - 允许通过AWS私有网络访问S3
   - 支持跨账户和本地访问
   - 使用ENI提供私有IP连接

3. **网络账户架构** ✅
   - 集中管理网络资源和连接
   - 通过RAM共享VPC或端点到其他账户

**为什么不选 B (我的选择)**:
- ❌ 公共VIF会通过互联网传输数据
- ❌ 违反了私有传输的要求
- ❌ 公共VIF用于AWS公共服务，但仍通过互联网路由

**为什么不选 D**:
- ❌ 网关端点仅适用于VPC内部访问
- ❌ 不支持跨账户或本地到AWS的连接

**为什么不选 E**:
- ❌ VPC对等不解决本地到AWS的连接问题
- ❌ 对等连接可能仍通过互联网

**复习要点**:
- Direct Connect私有VIF用于私有网络连接
- S3接口端点支持跨网络私有访问
- 公共VIF ≠ 私有传输
- 网关端点适用于VPC内，不适用于混合网络
- 记忆：私有传输用私有VIF + 接口端点

---

## 题目 285 - 为可预测峰值工作负载优化DynamoDB成本

**我的答案**: B

**正确答案**: C

**题目要点**:
- 快餐店每天4小时峰值流量，其余时间低流量
- DynamoDB使用预置模式匹配峰值消耗
- 降低成本并最小化IT运营开销

**关键知识点**:
1. **DynamoDB自动扩展 (Auto Scaling)** ✅
   - 根据实际流量自动调整RCUs和WCUs
   - 峰值时扩展，非峰值时缩减
   - 最少运营开销

2. **预置模式 vs 按需模式** ✅
   - 预置模式适合可预测工作负载
   - 按需模式适合不可预测流量

3. **成本优化策略** ✅
   - 可预测峰值使用自动扩展预置容量
   - 避免手动调整或预留容量浪费

**为什么不选 B (我的选择)**:
- ❌ 按需容量对峰值模式不经济
- ❌ 在峰值时按请求付费可能更昂贵
- ❌ 预置+自动扩展更适合可预测模式

**为什么不选 A**:
- ❌ 手动减少容量需要持续监控
- ❌ 运营开销高，可能导致峰值性能问题

**为什么不选 D**:
- ❌ 预留容量为非峰值时间浪费成本
- ❌ 不灵活，无法适应流量变化

**复习要点**:
- 可预测峰值用预置+自动扩展
- 按需模式适合不可预测工作负载
- 自动扩展最小化运营开销
- 记忆：峰值可预测用Auto Scaling，不可预测用On-demand

---

## 题目 286 - 使用AppSync实现博客评论实时更新

**我的答案**: B

**正确答案**: C

**题目要点**:
- 博客应用使用API Gateway、DynamoDB、Lambda
- 用户在评论部分积极讨论
- 希望评论实时显示以增加参与度

**关键知识点**:
1. **AWS AppSync + WebSockets** ✅
   - AppSync支持GraphQL和实时订阅
   - WebSockets实现低延迟推送
   - 服务器主动推送新评论

2. **轮询 vs 推送** ✅
   - 轮询：客户端定期请求，延迟高
   - 推送：服务器主动发送，实时性强

3. **GraphQL Subscriptions** ✅
   - 客户端订阅数据变更
   - 变更时自动推送更新

**为什么不选 B (我的选择)**:
- ❌ 轮询每10秒请求，延迟高且低效
- ❌ 增加不必要的API调用和负载
- ❌ 不提供真正的实时体验

**为什么不选 A**:
- ❌ CloudFront缓存改善性能，但不提供实时更新
- ❌ 缓存会延迟新评论显示

**为什么不选 D**:
- ❌ 提高Lambda并发改善响应，但不解决实时推送
- ❌ 仍需要客户端轮询

**复习要点**:
- 实时更新用AppSync + WebSockets
- 轮询效率低，不适合高频更新
- GraphQL Subscriptions提供实时数据同步
- 记忆：实时推送用AppSync，缓存用CloudFront

---

## 题目 288 - 使用Elastic Beanstalk Swap Environment URLs完成蓝/绿部署

**我的答案**: D

**正确答案**: B

**题目要点**:
- 使用蓝/绿部署方法更新Elastic Beanstalk环境
- 已创建新环境并部署应用
- 需要完成更新切换流量

**关键知识点**:
1. **Swap Environment URLs** ✅
   - Elastic Beanstalk内置功能
   - 交换两个环境的CNAME记录
   - 实现零停机流量切换

2. **蓝/绿部署** ✅
   - 保持两个环境同时运行
   - 测试新环境后切换流量
   - Swap提供快速回滚能力

3. **CNAME记录交换** ✅
   - Swap操作自动处理DNS更改
   - 无需手动DNS配置

**为什么不选 D (我的选择)**:
- ❌ 更新DNS记录手动且复杂
- ❌ 容易出错，增加停机风险
- ❌ Swap是推荐的自动化方法

**为什么不选 A**:
- ❌ Route 53重定向需要额外配置
- ❌ 不是Elastic Beanstalk原生方法

**为什么不选 C**:
- ❌ Auto Scaling配置与部署无关
- ❌ 不影响流量路由

**复习要点**:
- Swap是Elastic Beanstalk蓝/绿部署的标准方法
- 自动交换CNAME记录实现流量切换
- 比手动DNS更新更安全可靠
- 保持回滚能力
- 记忆：蓝/绿部署用Swap URLs，自动且安全

---

## 题目 296 - 为低利用率实例选择正确的调整大小策略

**我的答案**: A

**正确答案**: B

**题目要点**:
- Auto Scaling组使用单一实例类型
- CPU和内存利用率显示低利用率
- 需要永久降低成本并提高利用率
- 最少未来配置更改

**关键知识点**:
1. **Rightsizing (调整大小)** ✅
   - 根据利用率选择匹配的实例类型
   - 永久降低成本

2. **单一实例类型 vs 混合类型** ✅
   - 单一类型更简单，减少未来更改
   - 混合类型增加管理复杂性

3. **Launch Template更新** ✅
   - 修改Auto Scaling配置
   - 添加新类型，移除旧类型

**为什么不选 A (我的选择)**:
- ❌ 混合实例类型增加配置复杂性
- ❌ 需要更多未来管理更改
- ❌ 虽然提高利用率，但不匹配"最少配置更改"要求

**为什么不选 C**:
- ❌ 指定CPU/内存要求启用混合实例
- ❌ 类似混合类型，增加复杂性

**为什么不选 D**:
- ❌ 脚本维护需要持续工作
- ❌ 不是最少配置更改

**复习要点**:
- 低利用率用Rightsizing替换实例类型
- 单一类型比混合类型更简单
- 最少未来更改意味着稳定解决方案
- 记忆：永久成本降低用实例类型替换，临时用混合类型

---

## 题目 297 - 使用Lambda@Edge提高CloudFront缓存命中率

**我的答案**: D

**正确答案**: A

**题目要点**:
- CloudFront缓存命中率下降
- 查询字符串排序不一致，大小写混合
- 需要尽快提高缓存命中率

**关键知识点**:
1. **Lambda@Edge** ✅
   - 在CloudFront边缘运行函数
   - 处理查看器请求，规范化查询字符串

2. **查询字符串规范化** ✅
   - 排序参数，按名称强制小写
   - 确保相同内容有相同缓存键

3. **Viewer Request Trigger** ✅
   - 在请求到达CloudFront前触发
   - 允许修改请求头和查询字符串

**为什么不选 D (我的选择)**:
- ❌ CloudFront不支持原生大小写不敏感处理
- ❌ 没有内置选项启用此功能
- ❌ 不会解决问题

**为什么不选 B**:
- ❌ 禁用查询字符串缓存会降低效率
- ❌ 所有查询变体都会被缓存

**为什么不选 C**:
- ❌ 反向代理需要应用程序更改
- ❌ 不如边缘处理快速和全局

**复习要点**:
- 查询字符串不一致导致缓存碎片化
- Lambda@Edge viewer request trigger规范化
- 排序+小写确保缓存键一致
- 快速实施，无需应用更改
- 记忆：缓存优化用Lambda@Edge查询字符串处理

---

## 题目 291 - 使用AWS Transfer Family实现高可用SFTP

**我的答案**: C

**正确答案**: B

**题目要点**:
- SFTP服务器运行在单个EC2实例上，通过互联网访问
- 附加Elastic IP和安全组
- 需要提高可用性，最小化管理复杂性和客户干扰
- 不能改变客户连接方式

**关键知识点**:
1. **AWS Transfer Family** ✅
   - 托管SFTP服务，无需管理EC2
   - 支持S3后端，高可用且可扩展

2. **VPC-hosted端点** ✅
   - 允许互联网访问但在VPC内托管
   - 支持安全组和Elastic IP关联

3. **S3集成** ✅
   - Transfer Family直接与S3集成
   - 文件存储在S3中，可靠且持久

**为什么不选 C (我的选择)**:
- ❌ 使用Fargate运行SFTP服务器增加复杂性
- ❌ 需要管理容器、NLB和EFS
- ❌ 不如Transfer Family的托管服务简单

**为什么不选 A**:
- ❌ 公开可访问端点不使用VPC
- ❌ 无法附加安全组控制访问

**为什么不选 D**:
- ❌ 多附加EBS卷有局限性
- ❌ Auto Scaling组管理复杂
- ❌ EBS不如S3适合文件共享

**复习要点**:
- Transfer Family提供托管SFTP服务
- VPC-hosted端点保持客户连接不变
- S3后端提供高可用存储
- 最小化基础设施管理
- 记忆：SFTP高可用用Transfer Family + S3

---

## 题目 319 - Tracking changes to EC2 security groups and alerting on noncompliant changes, fastest way

**我的答案**: B

**正确答案**: D

**题目要点**:
- EC2 security groups configuration tracking
- Noncompliant changes alerting
- Fastest implementation

**关键知识点**:
1. **AWS Config (配置合规服务)** ✅
   - 监控资源配置合规性变化
   - 支持规则检测不符合规定的更改
   - 与SNS集成发送警报

2. **最快部署选项** ✅
   - AWS Config可以快速启用
   - 无需额外基础设施
   - 立即开始监控

3. **其他选项的局限性** ❌
   - CloudTrail：记录更改但不直接提供合规警报
   - Organizations SCPs：治理但设置不快

**为什么不选 B (我的选择)**:
- ❌ AWS CloudTrail捕获更改但需要额外设置合规警报
- ❌ CloudWatch规则可以提供警报但不直接针对不符合安全设置
- ❌ 比AWS Config解决方案更复杂

**为什么不选 A**:
- ❌ AWS Organizations和SCPs需要组织设置
- ❌ 实施更耗时
- ❌ SCPs治理但不直接跟踪更改

**为什么不选 C**:
- ❌ AWS账户上的SCPs用于警报不是标准做法
- ❌ SCPs用于权限控制，不用于监控和警报
- ❌ 无法提供更改警报

**复习要点**:
- AWS Config是合规监控和警报最快的方式
- CloudTrail用于日志记录，Config用于合规
- SCPs用于组织治理
- 始终考虑部署速度和运营开销
- 记忆：快速合规警报用Config + SNS

---

## 题目 323 - Blue/green deployments for ECS Fargate with load balancer and auto scaling

**我的答案**: C

**正确答案**: D

**题目要点**:
- ECS Fargate microservices app
- Blue/green deployments
- Load balancer for traffic distribution
- Auto adjust tasks based on CloudWatch alarm

**关键知识点**:
1. **ECS Blue/Green Deployment (ECS蓝/绿部署)** ✅
   - 使用CodeDeploy实现零停机更新
   - 与ALB集成切换流量

2. **Application Load Balancer (应用负载均衡器)** ✅
   - 支持HTTPS和路径路由
   - 适合微服务蓝/绿部署

3. **Service Auto Scaling (服务自动扩展)** ✅
   - ECS原生功能，响应CloudWatch指标
   - 自动调整任务数量

4. **Fargate限制** ❌
   - 无Cluster Auto Scaling，因为无底层EC2管理

**为什么不选 C (我的选择)**:
- ❌ 使用ALB正确，但Cluster Autoscaler不适用于Fargate
- ❌ Fargate是无服务器，无需集群扩展

**为什么不选 A**:
- ❌ NLB不支持复杂路由，蓝/绿更适合ALB
- ❌ 请求增加配额不是自动扩展

**为什么不选 B**:
- ❌ NLB和Cluster Autoscaler都不合适
- ❌ Fargate不支持Cluster Autoscaler

**复习要点**:
- ECS蓝/绿部署用ALB和CodeDeploy
- Service Auto Scaling用于Fargate自动扩展
- Cluster Autoscaler仅用于EC2集群
- NLB vs ALB：ALB更适合HTTPS和路由
- 记忆：Fargate用Service Auto Scaling，EC2用Cluster Autoscaler

---

## 题目 343 - S3 data lake access with VPC restrictions and least privilege

**我的答案**: D, E

**正确答案**: A, C

**题目要点**:
- Amazon S3 data lake accessed by hundreds of apps across multiple accounts
- Bucket access must not traverse public internet
- Each application minimum necessary permissions

**关键知识点**:
1. **S3 Access Points (S3访问点)** ✅
   - 为每个应用创建专用访问点
   - 配置仅从应用VPC访问
   - 支持最小权限原则

2. **VPC Gateway Endpoints (VPC网关端点)** ✅
   - 为每个应用VPC创建S3网关端点
   - 提供私有路径到S3，不通过互联网
   - 端点策略限制到特定访问点

3. **Cross-account access considerations (跨账户访问考虑)** ✅
   - 访问点在拥有bucket的账户创建
   - 网关端点在每个应用VPC创建

**为什么不选 D (我的选择)**:
- ❌ 在每个账户创建访问点并附加到bucket不符合AWS架构
- ❌ 访问点不能跨账户直接附加到bucket

**为什么不选 E**:
- ❌ 在数据湖VPC创建网关端点不能限制每个应用访问
- ❌ 不支持按应用最小权限

**为什么不选 B**:
- ❌ 接口端点不是为S3设计的，S3使用网关端点
- ❌ 接口端点更昂贵且复杂

**复习要点**:
- S3访问点用于细粒度权限控制
- 网关端点提供私有S3访问
- 访问点在bucket账户，端点在应用VPC
- 最小权限通过访问点策略实现
- 记忆：私有S3访问用网关端点，细粒度用访问点

---

## 题目 352 - Monitoring all data activity on Aurora PostgreSQL cluster

**我的答案**: D
**正确答案**: C

**题目要点**:
- Amazon Aurora PostgreSQL DB cluster用于单区域应用
- 数据库团队需要监控所有数据库上的所有数据活动
- 实现全面数据活动监控

**关键知识点**:
1. **Database Activity Streams (数据库活动流)**: Aurora功能，捕获所有数据库活动，包括SELECT、INSERT等
2. **Amazon Kinesis Data Streams (Kinesis Data Streams)**: 实时数据流，接收活动流数据
3. **Amazon Kinesis Data Firehose (Kinesis Data Firehose)**: 将数据流传递到S3进行存储和分析
4. **AWS DMS CDC (DMS变更数据捕获)**: 用于数据迁移，不适合监控实时活动

**为什么不选 D (我的选择)**:
- ❌ 使用AWS DMS CDC任务监控数据库活动不合适
- ❌ DMS CDC主要用于数据迁移和复制变更，不捕获所有数据活动如SELECT
- ❌ 相比Database Activity Streams，DMS更复杂且不直接支持全面活动监控

**为什么不选 A**:
- ❌ DMS CDC到Kinesis Firehose到OpenSearch不适合活动监控
- ❌ OpenSearch用于搜索，不如S3适合存储和分析活动数据

**为什么不选 B**:
- ❌ Database Activity Stream到EventBridge到Lambda到S3过于复杂
- ❌ EventBridge不适合处理高频数据库活动流，Lambda需要额外解密和处理

**复习要点**:
- Database Activity Streams是Aurora的原生监控功能，捕获所有数据活动
- Kinesis Data Streams和Firehose提供实时流式传输到S3
- DMS CDC适合迁移，不适合监控
- 选择最直接和全面的监控解决方案

---

## 题目 345 - Multi-account cost consolidation and region restriction

**我的答案**: A, D, E
**正确答案**: B, D, E

**题目要点**:
- 五个开发团队的五个AWS账户成本跟踪
- 每月手动登录记录成本
- 严格合规要求，只在美国区域创建资源
- 一些资源已在其他区域创建
- 财务团队需要跟踪和整合所有账户支出
- 确保只能在美国区域创建资源

**关键知识点**:
1. **AWS Organizations (AWS Organizations)**: 管理多个账户，启用所有功能以实现整合计费和跨账户访问。
2. **Service Control Policies (SCPs)**: 应用到OU以限制资源创建到特定区域。
3. **IAM Role (IAM角色)**: 在管理账户创建角色，财务团队通过assume role访问账单控制台。
4. **Cost Explorer (成本浏览器)**: 用于分析和整合所有账户的成本。

**为什么不选 A (我的选择)**:
- ❌ 使用S3存储每月报告不具操作效率，无法实时整合所有账户成本。
- ❌ 每月手动上传报告增加运营开销，不符合最有效要求。

**为什么不选 E (我的选择)**:
- ❌ 在每个AWS账户创建IAM角色需要为每个账户配置，增加管理复杂性。
- ❌ 不如在管理账户创建单一角色高效。

**为什么不选 F**:
- ❌ 在每个账户创建角色类似E，管理复杂。
- ❌ 不集中化。

**复习要点**:
- 多账户成本整合用Organizations + Cost Explorer
- 区域限制用SCPs deny non-US regions
- IAM角色在管理账户集中管理
- 避免手动过程，选择自动化工具

---

# Rotated Mistakes from 2025-10-22

# Q356：错误。选择了 A；正确是 C。

# Q368：错误。选择了 A；正确是 D。

**问题简介**：遗留应用程序迁移到 AWS，需要使用单个弹性 IP 与本地系统通信以确保安全性。解决方案必须自动处理故障。

**用户答案**：A（部署三个 NAT 网关并进行健康检查和手动重建）

**正确答案**：C（单个 NAT 网关配合 CloudWatch 监控和 Lambda 自动化）

**问题的关键点**：
- 私有子网中的应用程序需要通过固定 IP 出站到本地。
- 安全性要求仅使用公司范围内的单个 IP。
- 提供了弹性 IP 用于此目的。
- 解决方案必须自动缓解故障。

**详细知识点解释**：
- NAT 网关（NAT Gateway）通过弹性 IP 为私有子网提供静态 IP 的出站互联网访问。
- 为高可用性，单个 NAT 网关在一个可用区中；故障需要监控和替换。
- CloudWatch 可以使用自定义指标监控 NAT 网关健康。
- AWS Lambda 可以自动化在新子网中创建新 NAT 网关并重新分配弹性 IP。

**复习要点清单**：
- [ ] 理解 NAT 网关（NAT Gateway）与 NAT 实例的区别。
- [ ] 知道如何将弹性 IP 分配给 NAT 网关。
- [ ] 学习 CloudWatch 自定义指标用于资源监控。
- [ ] 查看 Lambda 函数用于自动化资源管理。
- [ ] 比较 NLB 和 ALB 用于静态 IP 要求（NLB 支持静态 IP）。

# Q368：错误。选择了 A；正确是 D。

**问题简介**：公司应用程序服务容器化部署在多个具有公共 IP 的 EC2 实例上，Apache Kafka 集群也部署在 EC2 上，PostgreSQL 数据库迁移到 RDS PostgreSQL。公司预期产品新版本发布时订单量大幅增加，需要减少运营开销并支持产品发布。

**用户答案**：A（创建 EC2 自动扩展组在 ALB 后，创建额外只读副本，创建 Kinesis 数据流并配置应用程序服务使用，存储静态内容在 S3）

**正确答案**：D（在 Amazon EKS 上部署应用程序使用 AWS Fargate 并启用自动扩展在 ALB 后，创建额外只读副本，创建 Amazon Managed Streaming for Apache Kafka 集群并配置应用程序服务使用，存储静态内容在 S3 后使用 CloudFront 分发）

**问题的关键点**：
- 应用程序服务容器化部署在 EC2 实例上，具有公共 IP。
- Kafka 集群在 EC2 上，数据库在 RDS。
- 预期流量激增，需要减少运营开销。
- 允许架构变更以支持扩展。

**详细知识点解释**：
- Amazon EKS (Amazon Elastic Kubernetes Service) 是托管 Kubernetes 服务，结合 AWS Fargate 提供无服务器容器运行时，无需管理 EC2 实例，减少运营开销。
- AWS Fargate 允许按需运行容器，无需预置 EC2。
- Amazon Managed Streaming for Apache Kafka (MSK) 是托管 Kafka 服务，比自管理 EC2 上的 Kafka 更少运营开销。
- 只读副本用于 RDS 扩展读取负载。
- CloudFront 用于全球分发静态内容，减少延迟和成本。

**复习要点清单**：
- [ ] 理解 Amazon EKS 和 AWS Fargate 用于容器化应用程序的无服务器部署。

# Q383：错误。选择了 B；正确是 A。

**问题简介**：公司迁移到云端，想评估现有数据中心虚拟机配置，确保准确调整新Amazon EC2实例大小。需要收集CPU、内存、磁盘利用率等指标，每个实例运行进程清单，以及监控网络连接以映射服务器间通信。最经济收集这些数据的方法。

**用户答案**：B（在本地环境中所有服务器上配置Amazon CloudWatch代理并发布指标到Amazon CloudWatch Logs）

**正确答案**：A（使用AWS Application Discovery Service并在每个虚拟机上部署数据收集代理）

**问题的关键点**：
- 评估数据中心VM配置用于EC2大小调整。
- 收集CPU、内存、磁盘利用率指标。
- 进程清单和网络连接映射。
- 最经济收集数据。

**详细知识点解释**：
- AWS Application Discovery Service (Application Discovery Service) 用于发现和规划迁移。
- 基于代理的发现部署代理到VM，收集详细指标、进程和网络连接。
- 无代理发现收集基本信息，但不包括进程和网络连接细节。
- CloudWatch代理收集指标，但不提供进程清单或网络映射。
- 基于代理的方法最经济，因为提供所需深度信息。

**复习要点清单**：
- [ ] 理解AWS Application Discovery Service用于迁移规划。
- [ ] 知道基于代理vs无代理发现的区别。
- [ ] 学习代理收集的内容：指标、进程、依赖关系。
- [ ] 比较CloudWatch代理与Application Discovery Service。

# Q384：错误。选择了 D；正确是 B。

**问题简介**：公司提供SaaS应用，在AWS Cloud运行。应用在Network Load Balancer (NLB)后面Amazon EC2实例上运行，实例在Auto Scaling组中，分布在单个Region的三个Availability Zones。公司部署应用到额外Regions。必须为客户提供静态IP地址，以便客户添加到allow lists。解决方案必须自动路由客户到地理上最近的Region。

**用户答案**：D（创建AWS Global Accelerator自定义路由加速器。为自定义路由加速器创建监听器。添加每个额外Region中NLB的IP地址和端口。为客户提供Global Accelerator IP地址）

**正确答案**：B（创建AWS Global Accelerator标准加速器。为每个额外Region中的NLB创建标准加速器端点。为客户提供Global Accelerator IP地址）

**问题的关键点**：
- SaaS应用在NLB后面EC2实例，Auto Scaling，跨AZ。
- 部署到多个Regions，提供静态IP给客户。
- 自动路由到最近Region。

**详细知识点解释**：
- AWS Global Accelerator提供静态IP地址，路由到最近端点。
- 标准加速器支持NLB作为端点，自动负载均衡到最近健康端点。
- 自定义路由加速器用于确定性路由到特定实例，不适合NLB负载均衡。
- CloudFront不提供固定IP，且不直接与NLB集成。

**复习要点清单**：
- [ ] 理解AWS Global Accelerator用于全局路由和静态IP。
- [ ] 知道标准加速器vs自定义路由加速器的区别。
- [ ] 学习标准加速器支持的端点：NLB、ALB、EC2、EIP。
- [ ] 比较Global Accelerator与CloudFront用于路由。

# Q386：错误。选择了 ACF；正确是 BDE。

**问题简介**：企业公司为用户构建基础设施服务平台。要求：提供最小权限访问，用户无法配置未批准服务；使用中央账户管理基础设施服务创建；提供将基础设施服务分发到多个AWS Organizations账户的能力；提供强制标签任何用户启动基础设施的能力。

**用户答案**：ACF（A: 使用CloudFormation模板开发基础设施服务，添加到中央S3桶，添加IAM角色或用户到S3桶策略。C: 允许用户IAM角色有AWSCloudFormationFullAccess和AmazonS3ReadOnlyAccess权限。添加Organizations SCP在AWS账户根用户级别，拒绝除CloudFormation和S3外的所有服务。F: 使用CloudFormation Resource Tags属性强制应用标签到任何为用户创建的CloudFormation模板）

**正确答案**：BDE（B: 使用CloudFormation模板开发基础设施服务。将每个模板作为AWS Service Catalog产品上传到中央AWS账户创建的portfolios。共享这些portfolios与公司的Organizations结构。D: 仅允许用户IAM角色有ServiceCatalogEndUserAccess权限。使用自动化脚本导入中央portfolios到本地AWS账户，复制TagOption，分配用户访问，应用启动约束。E: 使用AWS Service Catalog TagOption Library维护公司要求的标签列表。将TagOption应用到AWS Service Catalog产品或portfolios）

**问题的关键点**：
- 基础设施服务平台，最小权限。
- 中央账户管理，分发到org账户。
- 强制标签。

**详细知识点解释**：
- AWS Service Catalog提供自助服务基础设施，集中管理。
- Portfolios共享到Organizations账户。
- TagOption强制标签应用。
- 最小权限通过ServiceCatalogEndUserAccess。

**复习要点清单**：
- [ ] 理解AWS Service Catalog用于基础设施即服务。
- [ ] 知道portfolios和产品在Service Catalog中的作用。
- [ ] 学习TagOption用于强制标签。
- [ ] 比较Service Catalog与直接CloudFormation使用。

# Q387：错误。选择了 C；正确是 D。

**问题简介**：公司部署新web应用。作为设置的一部分，公司配置AWS WAF通过Amazon Kinesis Data Firehose记录到Amazon S3。公司开发Amazon Athena查询，每天运行一次返回前24小时的AWS WAF日志数据。每日日志量恒定。但随着时间，相同查询运行时间增加。解决方案架构师需要设计解决方案防止查询时间继续增加。解决方案必须最小化运营开销。

**用户答案**：C（更新Kinesis Data Firehose配置在Amazon S3中按日期和时间分区数据。为Amazon Redshift创建外部表。配置Amazon Redshift Spectrum查询数据源）

**正确答案**：D（修改Kinesis Data Firehose配置和Athena表定义按日期和时间分区数据。更改Athena查询查看相关分区）

**问题的关键点**：
- AWS WAF日志通过Firehose到S3。
- Athena查询24小时数据，运行时间增加。
- 日志量恒定，但查询变慢。
- 最小运营开销。

**详细知识点解释**：
- 数据分区允许Athena扫描更少数据，提高查询性能。
- Kinesis Data Firehose支持动态分区到S3。
- 更新Athena表定义以包含分区键。
- 查询指定分区以限制扫描数据。

**复习要点清单**：
- [ ] 理解Athena分区用于优化查询。
- [ ] 知道Kinesis Data Firehose动态分区。
- [ ] 学习如何在Athena中定义分区表。
- [ ] 比较分区与不分区查询性能。
- [ ] 学习 Amazon MSK 作为托管 Kafka 的优势。
- [ ] 知道如何使用 CloudFront 加速静态内容交付。
- [ ] 比较 EC2 自管理 vs 托管服务的运营开销。

# Q369：错误。选择了 AB；正确是 BD。

**问题简介**：公司本地数据中心托管 VPN，员工连接 VPN 访问 Windows 主目录文件。最近远程员工大量增长，导致工作时间带宽使用率达到 100%。需要在 AWS 上设计解决方案，支持远程员工增长，减少数据中心带宽使用，并减少运营开销。

**用户答案**：A（创建 AWS Storage Gateway Volume Gateway，将卷挂载到本地文件服务器）B（将主目录迁移到 Amazon FSx for Windows File Server）

**正确答案**：B（将主目录迁移到 Amazon FSx for Windows File Server）D（将远程用户迁移到 AWS Client VPN）

**问题的关键点**：
- 本地 VPN 带宽饱和。
- 需要支持远程访问 Windows 文件。
- 最小化运营开销。
- 选择两个选项。

**详细知识点解释**：
- Amazon FSx for Windows File Server 是完全托管的 Windows 文件服务器，支持 SMB 协议，适合迁移 Windows 主目录，减少本地基础设施。
- AWS Client VPN 提供安全 VPN 连接到 AWS VPC，无需本地 VPN，减少数据中心带宽使用和运营开销。
- 选项 A 的 Storage Gateway 需要本地文件服务器，运营开销更高。
- 选项 C 的 FSx Lustre 用于高性能计算，不适合 Windows 文件。
- 选项 E 的 Direct Connect 增加带宽但不减少使用或最小化开销。

**复习要点清单**：
- [ ] 理解 Amazon FSx for Windows File Server 用于托管 Windows 文件共享。
- [ ] 学习 AWS Client VPN 用于安全远程访问 AWS 资源。
- [ ] 比较 Storage Gateway 和 FSx 的运营开销。
- [ ] 知道如何选择合适的 AWS VPN 解决方案减少本地依赖。

# Q370：错误。选择了 CD；正确是 AC。

**问题简介**：公司拥有多个 AWS 账户，安全审计发现许多未加密的 Amazon EBS 卷附加到 EC2 实例上。解决方案架构师需要加密未加密的卷，并确保将来自动检测未加密的卷。此外，公司希望集中管理多个 AWS 账户，重点关注合规性和安全性。

**用户答案**：C（为每个未加密卷创建快照，从未加密快照创建新加密卷，分离现有卷，用加密卷替换）D（在 AWS Organizations 中创建组织，设置 AWS Control Tower，并开启强制性控制（guardrails），将所有账户加入组织，按 OU 分类 AWS 账户）

**正确答案**：A（在 AWS Organizations 中创建组织，设置 AWS Control Tower，并开启强烈推荐的控制（guardrails），将所有账户加入组织，按 OU 分类 AWS 账户）C（为每个未加密卷创建快照，从未加密快照创建新加密卷，分离现有卷，用加密卷替换）

**问题的关键点**：
- 多个账户需要集中管理合规性和安全性。
- 加密现有未加密 EBS 卷。
- 自动检测未来未加密卷。
- 选择两个选项。

**详细知识点解释**：
- AWS Organizations 提供组织结构以管理多个账户。
- AWS Control Tower 简化多账户设置，强烈推荐的 guardrails 提供安全最佳实践。
- 强制性 guardrails 可能过于严格，不适合所有环境。
- EBS 卷加密通过创建加密快照和替换卷实现。
- 选项 B 是手动脚本，不自动。
- 选项 E 使用 EventBridge 可以检测但不自动加密。

**复习要点清单**：
- [ ] 理解 AWS Organizations 用于多账户管理。
- [ ] 学习 AWS Control Tower 的 guardrails 类型。
- [ ] 知道如何加密现有 EBS 卷。
- [ ] 比较手动 vs 自动合规检测。

# Q371：错误。选择了 C；题库答案 A，但更合理的答案是 B。⚠️ 有争议

**问题简介**：公司将内联网 Web 应用程序托管在 ALB 后面的 EC2 实例上。目前，用户针对内部用户数据库进行身份验证。公司需要使用现有的 AWS Directory Service for Microsoft Active Directory 目录对用户进行身份验证。目录中的所有用户账户必须有权访问应用程序。

**用户答案**：C（将目录添加为新的 IAM 身份提供商 (IdP)。创建新的 IAM 角色，具有 SAML 2.0 联合的实体类型。配置角色策略允许访问 ALB。将新角色配置为 IdP 的默认经过身份验证的用户角色。创建 ALB 的监听器规则。指定监听器规则的 authenticate-oidc 操作）

**题库答案**：A（在目录中创建新的应用程序客户端。创建 ALB 的监听器规则。指定监听器规则的 authenticate-oidc 操作。为 Active Directory 服务配置监听器规则，具有适当的颁发者、客户端 ID 和密钥以及端点详细信息。为 ALB 提供的回调 URL 配置新的应用程序客户端）

**更合理的答案**：B（配置 Amazon Cognito User Pool。使用目录中的元数据配置联合身份提供商 (IdP)。创建应用程序客户端。将应用程序客户端与 User Pool 关联。创建 ALB 的监听器规则。指定监听器规则的 authenticate-cognito 操作。配置监听器规则以使用 User Pool 和应用程序客户端）

**问题的关键点**：
- 将身份验证从内部数据库迁移到 Active Directory。
- 使用 ALB 的身份验证功能。
- 所有目录用户必须有访问权限。
- 需要与 AWS Directory Service for Microsoft Active Directory 集成。

**详细知识点解释**：

🔑 **核心概念：ALB 的两种身份验证方式**

| 认证方式 | 适用场景 | 协议支持 |
|---------|---------|---------|
| authenticate-oidc | 与支持 OIDC 的第三方 IdP 集成 | OpenID Connect |
| authenticate-cognito | 与 Amazon Cognito 集成 | Cognito 管理所有协议 |

💡 **为什么选项 B 更合理？**

1. **AWS 官方推荐的标准集成方式**：
   - AWS Directory Service for Microsoft Active Directory 主要通过 **SAML 2.0** 进行联合认证
   - **不是原生的 OIDC provider**
   - 正确的集成路径：`ALB → authenticate-cognito → Cognito User Pool → SAML federation → AWS Managed AD`

2. **架构清晰且符合最佳实践**：
   ```
   用户 → ALB (authenticate-cognito)
        → Cognito User Pool (作为中间层)
        → SAML 联合
        → AWS Directory Service for Microsoft AD
   ```

3. **Cognito 的优势**：
   - ✅ 原生支持 SAML 2.0 联合
   - ✅ 可以轻松扩展支持其他 IdP
   - ✅ 提供用户池管理和会话管理
   - ✅ AWS 官方文档推荐此方案

❌ **为什么选项 A 有问题？**

1. **技术可行性问题**：
   - AWS Directory Service for Microsoft AD 不是原生 OIDC provider
   - \"在目录中创建应用程序客户端\"这个描述不准确
   - Microsoft AD 主要支持 SAML，不直接支持 OIDC

2. **缺少必要的中间层**：
   - 直接用 authenticate-oidc 连接 AD 不符合 AWS 架构

❌ **为什么选项 C 错误？**

1. **协议不匹配**：
   - 配置的是 SAML 2.0 federation（IAM IdP）
   - 但使用的是 `authenticate-oidc` action
   - **SAML ≠ OIDC**，协议冲突！

2. **架构过于复杂**：
   - 需要创建 IAM IdP
   - 需要创建 IAM role
   - 需要配置 SAML federation
   - 增加了不必要的复杂性

❌ **为什么选项 D 错误？**

1. **使用了错误的 action**：
   - 配置 IAM Identity Center
   - 但用了 `authenticate-cognito`（应该用其他方式）

2. **过度设计**：
   - IAM Identity Center 更适合企业级 SSO
   - 对这个场景来说太复杂

**AWS 服务对比表**：

| 服务 | 主要用途 | 支持的协议 | 与 ALB 集成方式 |
|-----|---------|-----------|---------------|
| AWS Directory Service for Microsoft AD | 托管的 Active Directory | SAML 2.0, Kerberos, LDAP | 通过 Cognito 或 IAM Identity Center |
| Amazon Cognito | 用户身份管理和认证 | SAML, OIDC, OAuth 2.0 | authenticate-cognito |
| IAM Identity Provider | 企业联合身份 | SAML 2.0, OIDC | 不直接与 ALB 集成 |
| IAM Identity Center | 企业级 SSO | SAML 2.0 | 不直接与 ALB 集成 |

**复习要点清单**：
- [ ] 理解 ALB 的 authenticate-oidc 和 authenticate-cognito 的区别
- [ ] 掌握 AWS Directory Service for Microsoft AD 支持的协议（主要是 SAML，不是 OIDC）
- [ ] 学习如何通过 Cognito User Pool 与 Active Directory 集成（SAML federation）
- [ ] 理解 SAML 2.0 和 OIDC 的区别及使用场景
- [ ] 知道 IAM IdP 和 Cognito 的区别
- [ ] 掌握 AWS 官方推荐的 AD 集成最佳实践
- [ ] 警惕题目中协议不匹配的陷阱（如 SAML 配置 + OIDC action）

⚠️ **重要提醒**：这道题在实际考试中如果遇到，建议选择 B。虽然题库答案是 A，但从技术实现的角度，B 才是正确且可行的方案。

# Q373：错误。选择了 D；正确是 A。

**问题简介**：公司正在构建一个运行在 AWS Lambda 函数上的应用程序。数百个客户将使用该应用程序。公司希望为每个客户提供一个特定时间段内的请求配额。这些配额必须匹配客户的使用模式。有些客户必须获得较短时间段内的较高配额。

**用户答案**：D（在 VPC 中创建一个应用负载均衡器 (ALB)，将 Lambda 函数配置为 ALB 的目标，配置 AWS WAF Web ACL 为 ALB，为每个客户配置基于速率的规则，包括适当的请求配额）

**正确答案**：A（创建一个 Amazon API Gateway REST API 与代理集成以调用 Lambda 函数。为每个客户配置 API Gateway 使用计划，包括适当的请求配额。从使用计划为客户需要的每个用户创建 API 密钥）

**问题的关键点**：
- 应用程序运行在 Lambda 上。
- 需要为每个客户设置请求配额，支持不同时间段和使用模式。
- 配额可以是灵活的，以匹配使用情况。

**详细知识点解释**：
- Amazon API Gateway 使用计划 (Usage Plans) 允许为每个 API 密钥设置请求配额和限制，支持按客户定制。
- API 密钥 (API Keys) 可以与使用计划关联，为每个客户提供访问控制。
- AWS WAF (AWS WAF) 的基于速率的规则用于防止 DDoS 或速率限制，但不提供可配置的配额 per customer。
- Lambda 并发限制 (Concurrency Limits) 不适用于请求配额。
- ALB (Application Load Balancer) 不是用于直接管理 Lambda 请求配额的。

**复习要点清单**：
- [ ] 理解 Amazon API Gateway 使用计划用于设置配额和限制。
- [ ] 知道如何使用 API 密钥控制客户访问。
- [ ] 比较 AWS WAF 速率限制与 API Gateway 配额。
- [ ] 学习 Lambda 并发 vs 请求配额的区别。
- [ ] 查看 ALB 与 API Gateway 在 API 管理中的角色。

# Q374：错误。选择了 C；正确是 D。

**问题简介**：一家直播活动公司正在为 AWS 上的票务应用程序设计扩展解决方案。应用程序在销售活动期间利用率高峰。每个销售活动都是一次性计划事件。应用程序在 Auto Scaling 组中的 Amazon EC2 实例上运行。应用程序使用 PostgreSQL 作为数据库层。公司需要一个扩展解决方案，以在销售活动期间最大化可用性。

**用户答案**：C（为 EC2 实例使用预测扩展策略。将数据库托管在 Amazon RDS for PostgreSQL MultiAZ DB 实例上，具有自动扩展只读副本。创建一个 AWS Step Functions 状态机，在销售活动前运行并行 AWS Lambda 函数来预热数据库。创建一个 Amazon EventBridge 规则来调用状态机）

**正确答案**：D（为 EC2 实例使用计划扩展策略。将数据库托管在 Amazon Aurora PostgreSQL Multi-AZ DB 集群上。创建一个 Amazon EventBridge 规则，在销售活动前调用 AWS Lambda 函数创建更大的 Aurora Replica。故障转移到更大的 Aurora Replica。创建另一个 EventBridge 规则，在销售活动后调用另一个 Lambda 函数来缩小 Aurora Replica）

**问题的关键点**：
- 应用程序有计划的高峰销售事件。
- 需要在事件期间最大化可用性。
- EC2 Auto Scaling 组和 PostgreSQL 数据库。

**详细知识点解释**：
- 计划扩展 (Scheduled Scaling) 适合已知计划的事件，如销售高峰。
- Amazon Aurora PostgreSQL 支持创建和故障转移到更大的副本以处理负载。
- 预测扩展 (Predictive Scaling) 基于历史数据预测，但对于一次性事件不如计划扩展可靠。
- RDS for PostgreSQL 不支持像 Aurora 那样的快速副本创建和故障转移。

**复习要点清单**：
- [ ] 理解计划扩展 vs 预测扩展的适用场景。
- [ ] 知道 Amazon Aurora 的副本管理用于扩展。
- [ ] 学习 EventBridge 和 Lambda 用于自动化数据库扩展。
- [ ] 比较 RDS 和 Aurora 在扩展能力上的差异。

# Q375：错误。选择了 BDF；正确是 ADE。

**问题简介**：公司运行本地内联网应用程序。公司希望配置应用程序的云备份。公司选择了 AWS Elastic Disaster Recovery 作为解决方案。公司要求复制流量不通过公共互联网。应用程序也不得从互联网访问。公司不希望此解决方案消耗所有可用网络带宽，因为其他应用程序需要带宽。哪种步骤组合将满足这些要求？（选择三个。）

**用户答案**：B（创建一个 VPC，至少有两个公共子网、虚拟私有网关和互联网网关）D（在本地网络和目标 AWS 网络之间创建一个 AWS Direct Connect 连接和 Direct Connect 网关）F（在配置目标服务器的启动设置时，选择确保 Recovery 实例的私有 IP 地址与源服务器的私有 IP 地址匹配的选项）

**正确答案**：A（创建一个 VPC，至少有两个私有子网、两个 NAT 网关和虚拟私有网关）D（在本地网络和目标 AWS 网络之间创建一个 AWS Direct Connect 连接和 Direct Connect 网关）E（在配置复制服务器时，选择使用私有 IP 地址进行数据复制的选项）

**问题的关键点**：
- 本地内联网应用程序云备份，使用 AWS Elastic Disaster Recovery。
- 复制流量不通过公共互联网。
- 应用程序不可从互联网访问。
- 不消耗所有带宽。

**详细知识点解释**：
- Direct Connect 提供专用连接，避免公共互联网。
- 私有 IP 复制确保流量不通过 NAT 或公共互联网。
- 私有子网和 NAT 网关允许出站但不公开访问。
- 公共子网和互联网网关会暴露应用程序。

**复习要点清单**：
- [ ] 理解 AWS Elastic Disaster Recovery 用于云备份。
- [ ] 知道 Direct Connect 用于私有连接。
- [ ] 学习私有 IP 复制选项。
- [ ] 比较私有 vs 公共 VPC 配置对安全性的影响。

# Q376：错误。选择了 D；正确是 B。

**问题简介**：公司提供图像存储服务，希望在 AWS 上部署面向客户的解决方案。数百万个人客户将使用该解决方案。该解决方案将接收大图像文件批次，调整大小，并存储在 Amazon S3 存储桶中最多 6 个月。解决方案必须处理显著的需求变化。也必须在企业级可靠，并有能力在失败事件中重新运行处理作业。哪种解决方案最经济地满足这些要求？

**用户答案**：D（使用 Amazon Simple Queue Service (Amazon SQS) 处理用户存储图像时发生的 S3 事件。运行 AWS Lambda 函数调整图像大小并存储调整大小的文件在 S3 Standard-Infrequent Access (S3 Standard-lA) 的 S3 存储桶中。创建 S3 Lifecycle 策略将所有存储图像移动到 S3 Glacier Deep Archive 6 个月后）

**正确答案**：B（使用 Amazon EventBridge 处理用户上传图像时发生的 S3 事件。运行 AWS Lambda 函数就地调整图像大小并替换 S3 存储桶中的原始文件。创建 S3 Lifecycle 过期策略在 6 个月后过期所有存储图像）

**问题的关键点**：
- 处理数百万客户的大图像批次。
- 调整大小并存储 6 个月。
- 处理需求变化，可靠，企业级，失败时重新运行。
- 最经济。

**详细知识点解释**：
- Amazon EventBridge 用于事件驱动处理，与 Lambda 集成。
- S3 Lifecycle 过期策略删除文件，比移动到 Glacier 更便宜。
- Step Functions 添加复杂性，SQS 添加队列成本。
- Glacier Deep Archive 更便宜但检索慢，不适合 6 个月过期。

**复习要点清单**：
- [ ] 理解 Amazon EventBridge 用于 S3 事件处理。
- [ ] 知道 S3 Lifecycle 过期 vs 转换策略的成本。
- [ ] 学习 AWS Lambda 用于图像处理的可扩展性。
- [ ] 比较 SQS、Step Functions 与 EventBridge 的成本和复杂性。

# Q377：错误。选择了 D；正确是 C。

**问题简介**：公司有 AWS Organizations 组织，每个部门有单独 AWS 账户。不同部门的应用程序团队独立开发和部署解决方案。公司希望降低计算成本，并在部门间适当管理成本。也希望改善对各个部门账单的可见性。公司不希望在选择计算资源时失去运营灵活性。哪种解决方案将满足这些要求？

**用户答案**：D（为每个部门使用 AWS Budgets。使用 SCP 应用标签到适当资源。购买 Compute Savings Plans）

**正确答案**：C（配置 AWS Organizations 使用合并账单。实施识别部门的标签策略。使用 Tag Editor 应用标签到适当资源。购买 Compute Savings Plans）

**问题的关键点**：
- 多账户组织，每个部门一个账户。
- 降低计算成本，管理跨部门成本。
- 改善部门账单可见性。
- 保持运营灵活性。

**详细知识点解释**：
- 合并账单提供集中成本可见性。
- 标签策略识别部门用于成本分配。
- Compute Savings Plans 提供灵活性，适用于 EC2、Fargate、Lambda。
- Tag Editor 用于应用标签。

**复习要点清单**：
- [ ] 理解 AWS Organizations 合并账单。
- [ ] 知道标签策略用于成本分配。
- [ ] 学习 Compute Savings Plans vs EC2 Instance Savings Plans。
- [ ] 查看 Tag Editor 用于资源标签。

# Q358：错误。选择了 C；正确是 D。

**问题简介**：本地应用程序带有媒体上传迁移到 AWS，需要处理许多用户、可扩展存储、低运营开销，允许重构。

**用户答案**：C（S3 中的静态网站、AppSync API、Lambda 解析器、Cognito）

**正确答案**：D（AWS Amplify 用于静态网站、CloudFront 托管、S3 存储、Cognito）

**问题的关键点**：
- 应用程序服务器过载，频繁添加存储。
- 用户来自美国和加拿大，经过身份验证的上传。
- 允许重构，加速开发、最少运营开销。

**详细知识点解释**：
- AWS Amplify 是构建和部署 Web 应用程序的开发平台，具有最小的开销。
- Amplify 托管与 CloudFront 集成，用于低延迟全球交付。
- Amazon S3 用于可扩展、持久的媒体存储。
- Amazon Cognito 用于用户身份验证和访问控制。
- 选项 D 提供端到端解决方案，与 C 中的手动设置相比运营最少。

**复习要点清单**：
- [ ] 学习 AWS Amplify 用于快速 Web 应用程序开发。
- [ ] 理解 Amplify 托管与 CloudFront。
- [ ] 知道 Amazon S3 用于媒体存储可扩展性。
- [ ] 查看 Amazon Cognito 用于身份验证。

# Q360：错误。选择了 C；正确是 B。

**问题简介**：公司希望管理 20 个不经常使用的业务关键应用程序的成本（Java/Node.js），标准化部署、最小化成本，内存 1GB 平均到 2.5GB，长运行 Java 账单报告。

**用户答案**：C（为每个应用程序使用 AWS Elastic Beanstalk 配合自动扩展和 CloudWatch）

**正确答案**：B（Amazon ECS 容器在 EC2 上配合自动扩展、ECS 任务扩展、CloudWatch）

**问题的关键点**：
- 不经常使用但关键的应用程序。
- Java 和 Node.js 的混合。
- 在标准化部署的同时最小化成本。
- 内存消耗变化，高达 2.5GB 峰值。
- 长运行 Java 应用程序。

**详细知识点解释**：
- Amazon ECS（Amazon ECS）允许在 EC2 上容器化应用程序，实现高效资源利用。
- 基于内存利用率的自动扩展有助于优化可变工作负载的成本。
- ECS 任务扩展提供每个应用程序的细粒度控制。
- AWS Elastic Beanstalk（AWS Elastic Beanstalk）单独部署每个应用程序，可能通过多个 EC2 实例增加成本。
- AWS Lambda（AWS Lambda）有执行时间限制（15 分钟），不适合长运行应用程序。
- D 中的预留实例会导致不经常使用的更高成本。

**复习要点清单**：
- [ ] 理解 Amazon ECS 用于容器编排。
- [ ] 知道 ECS 中基于内存利用率的自动扩展。
- [ ] 比较 ECS 与 Elastic Beanstalk 的成本和标准化。
- [ ] 学习 AWS Lambda 对长运行任务的限制。
- [ ] 查看预留实例与按需用于零星工作负载。

# Q364：错误。选择了 C；正确是 B。

**问题简介**：公司使用 AWS Organizations 希望在所有 EC2 实例上强制 BusinessUnit 标签用于成本跟踪，在手动标记缺失标签后。

**用户答案**：C（创建 SCP 并附加到组织的根。）

**正确答案**：B（启用组织中的标签策略。为 BusinessUnit 标签创建策略。确保标签键大小写合规性开启。对 ec2:instance 资源类型实施标签策略。附加标签策略到组织的管理员账户。）

**问题的关键点**：
- 使用 AWS Organizations 管理多个账户。
- 所有 EC2 实例必须有 BusinessUnit 标签用于成本跟踪。
- 审计发现缺失标签，手动添加。
- 需要在未来强制执行。

**详细知识点解释**：
- AWS Organizations 中的标签策略（Tag Policies）允许跨账户定义和强制标签标准。
- 标签策略可以指定必需标签、允许值和大小写敏感性。
- 对于 EC2 实例，应用于 ec2:instance 资源类型。
- 附加到组织的管理员账户以在组织内强制执行。
- 服务控制策略（SCPs）（服务控制策略）控制权限，不用于标签强制。

**复习要点清单**：
- [ ] 理解 AWS Organizations 标签策略用于标签强制。
- [ ] 知道标签策略与 SCP 的区别。
- [ ] 学习如何附加标签策略到管理员账户。
- [ ] 查看标签策略中的大小写敏感性。
- [ ] 比较根与管理员账户附加策略。

# Q365：错误。选择了 D；正确是 C。

**问题简介**：公司迁移数千个 EC2 实例到 IPv6，私有子网实例不得从公共互联网访问。

**用户答案**：D（使用自定义 IPv6 CIDR 更新 VPC，创建新的 NAT 网关并启用 IPv6 支持，将私有子网路由到它）

**正确答案**：C（使用 Amazon 提供的 IPv6 CIDR 更新 VPC，创建仅出口互联网网关，将私有子网路由到它）

**问题的关键点**：
- 将 EC2 实例组迁移到 IPv6。
- 私有子网有 NAT 网关用于 IPv4 出站。
- 私有实例不得从公共互联网访问。
- 数千个实例在 VPC 中有公共/私有子网。

**详细知识点解释**：
- 仅出口互联网网关（Egress-only Internet Gateway）允许从私有子网 IPv6 出站流量而不允许入站访问。
- NAT 网关不支持 IPv6；仅仅出口 IGW 用于 IPv6 私有子网出站。
- Amazon 提供的 IPv6 CIDR 推荐用于简单性。
- 自定义 IPv6 CIDR 需要仔细规划但工作类似。

**复习要点清单**：
- [ ] 理解仅出口互联网网关用于 IPv6。
- [ ] 知道 NAT 网关对 IPv6 的限制。
- [ ] 学习 IPv6 CIDR 关联到 VPC 和子网。
- [ ] 查看 IPv6 路由（::/0 到仅出口 IGW）。

# Q379：错误。选择了 BC；正确是 BD。

**问题简介**：大型公司迁移IT组合到AWS，每个业务单元有独立AWS账户，支持开发和测试环境。新账户即将创建用于生产。财务部门需要集中支付但保持对每个组支出的可见性。安全团队需要集中机制控制所有公司账户的IAM使用。哪种选项组合以最少努力满足公司需求？（选择两个。）

**用户答案**：B（使用AWS Organizations创建新组织，从付款账户定义OU层次结构，邀请现有账户加入组织，使用Organizations创建新账户）C（要求每个业务单元使用自己的AWS账户，使用标签适当标记每个AWS账户，并启用Cost Explorer来管理计费回扣）

**正确答案**：B（使用AWS Organizations创建新组织，从付款账户定义OU层次结构，邀请现有账户加入组织，使用Organizations创建新账户）D（启用AWS Organizations的所有功能，建立适当的服务控制策略来过滤子账户的IAM权限）

**问题的关键点**：
- 多账户组织，每个业务单元账户。
- 集中支付和成本可见性。
- 集中IAM控制。
- 最少努力。

**详细知识点解释**：
- AWS Organizations提供组织结构管理多个账户，包括合并账单和OU。
- 服务控制策略 (Service Control Policies) 允许集中控制IAM权限。
- 选项B和D一起提供集中高效解决方案。
- C单独使用标签和Cost Explorer不提供IAM集中控制。
- A使用CloudFormation模板需要每个账户手动部署，工作量大。
- E合并所有账户违反隔离且IAM Access Advisor不强制。

**复习要点清单**：
- [ ] 理解AWS Organizations用于多账户管理。
- [ ] 知道服务控制策略用于IAM权限控制。
- [ ] 学习合并账单的成本可见性。
- [ ] 比较不同选项的努力和集中性。

# Q380：错误。选择了 A；正确是 B。

**问题简介**：公司有分析数千气象站天气数据的解决方案。气象站通过Amazon API Gateway REST API发送数据，API有AWS Lambda函数集成。Lambda函数调用第三方服务进行数据预处理。第三方服务过载失败预处理，导致数据丢失。解决方案架构师必须改善解决方案的弹性，确保无数据丢失且失败时可稍后处理数据。

**用户答案**：A（创建Amazon Simple Queue Service队列，将队列配置为API的死信队列）

**正确答案**：B（创建两个Amazon Simple Queue Service队列：主队列和辅助队列，将辅助队列配置为主要队列的死信队列。更新API使用新集成到主队列。配置Lambda函数作为主队列的调用目标）

**问题的关键点**：
- 数据通过API Gateway到Lambda。
- 第三方服务失败导致数据丢失。
- 需要弹性，无数据丢失，失败时稍后处理。

**详细知识点解释**：
- 使用SQS队列缓冲数据，DLQ捕获失败消息。
- 主队列作为初始缓冲，DLQ用于稍后重试。
- A中死信队列不直接附加到API Gateway。
- C和D使用EventBridge，不提供队列和DLQ机制。

**复习要点清单**：
- [ ] 理解SQS用于异步缓冲。
- [ ] 知道死信队列用于失败消息。
- [ ] 学习API Gateway与SQS集成。
- [ ] 比较SQS与EventBridge在弹性中的作用。

# Q381：错误。选择了 BE；正确是 ABD。

**问题简介**：公司构建电子商务网站在AWS上，使用三层Web架构。应用是Java-based，由Amazon CloudFront分发、Apache Web服务器EC2实例Auto Scaling组、后端Amazon Aurora MySQL数据库组成。上个月促销销售事件期间，用户报告错误和超时添加物品到购物车。运营团队恢复Web服务器日志，审查Aurora集群性能指标。有些Web服务器在收集日志前终止，Aurora指标不足以查询性能分析。在高峰流量事件期间，哪种步骤组合必须解决方案架构师采取来改善应用性能可见性？（选择三个。）

**用户答案**：B（实现AWS X-Ray SDK跟踪EC2实例上的传入HTTP请求，在X-Ray SDK for Java中实现SQL查询跟踪）E（启用和配置AWS CloudTrail收集和分析Amazon EC2和Aurora的应用活动）

**正确答案**：A（配置Aurora MySQL数据库集群发布慢查询和错误日志到Amazon CloudWatch Logs）B（实现AWS X-Ray SDK跟踪EC2实例上的传入HTTP请求，在X-Ray SDK for Java中实现SQL查询跟踪）D（在EC2实例上安装和配置Amazon CloudWatch Logs代理，将Apache日志发送到CloudWatch Logs）

**问题的关键点**：
- 三层架构：CloudFront、EC2 Auto Scaling、Aurora。
- 高峰期间错误和超时。
- 需要改善日志收集和性能分析。

**详细知识点解释**：
- Aurora日志到CloudWatch Logs提供数据库性能分析。
- X-Ray跟踪HTTP和SQL请求。
- CloudWatch Logs代理收集EC2 Apache日志，即使实例终止。
- E CloudTrail用于API调用审计，不适合应用性能。

**复习要点清单**：
- [ ] 理解CloudWatch Logs用于日志收集。
- [ ] 知道X-Ray用于分布式跟踪。
- [ ] 学习CloudWatch Logs代理在EC2上的安装。
- [ ] 比较CloudTrail与性能监控工具。

# Q398：错误。选择了 B；正确是 A。

**问题简介**：公司构建 AWS 应用，将日志发送到 Amazon OpenSearch Service 集群进行分析。所有数据必须存储在 VPC 中。一些开发人员在家工作，其他在三个不同办公室。开发人员需要从本地开发机直接访问 OpenSearch Service 来分析和可视化日志。

**用户答案**：B（创建传输网关连接 VPC，创建 AWS Site-to-Site VPN，创建附件到传输网关，指示开发人员使用 OpenVPN 客户端连接）

**正确答案**：A（配置并设置 AWS Client VPN 端点，与 VPC 中的子网关联，配置 Client VPN 自助门户，指示开发人员使用 Client VPN 客户端连接）

**问题的关键点**：
- 应用将日志发送到 OpenSearch 集群。
- 数据必须在 VPC 内。
- 开发人员在家和办公室，需要从本地机访问 OpenSearch。

**详细知识点解释**：
- AWS Client VPN 允许远程用户安全连接到 VPC 中的资源。
- Client VPN 自助门户允许用户自我管理连接。
- OpenSearch Service 在 VPC 中，需要 VPN 访问。
- Site-to-Site VPN 用于站点到站点，而非客户端到站点。

**复习要点清单**：
- [ ] 理解 AWS Client VPN 与 Site-to-Site VPN 的区别。
- [ ] 知道如何配置 Client VPN 端点。
- [ ] 了解 OpenSearch Service 的 VPC 访问要求。

# Q400：错误。选择了 AE；正确是 BE。

**问题简介**：公司运行无服务器应用，包括 AWS Lambda 函数和 Amazon DynamoDB 表。公司创建新功能，要求 Lambda 函数访问 Amazon Neptune DB 集群。Neptune DB 集群位于 VPC 中的三个子网内。哪种解决方案允许 Lambda 函数访问 Neptune DB 集群和 DynamoDB 表？（选择两个。）

**用户答案**：A（在 Neptune VPC 中创建三个公共子网，并通过互联网网关路由流量。将 Lambda 函数托管在三个新公共子网中）E（在 Neptune VPC 中创建三个私有子网。将 Lambda 函数托管在三个新隔离子网中。为 DynamoDB 创建 VPC 端点，并将 DynamoDB 流量路由到 VPC 端点）

**正确答案**：B（在 Neptune VPC 中创建三个私有子网，并通过 NAT 网关路由互联网流量。将 Lambda 函数托管在三个新私有子网中）E（在 Neptune VPC 中创建三个私有子网。将 Lambda 函数托管在三个新隔离子网中。为 DynamoDB 创建 VPC 端点，并将 DynamoDB 流量路由到 VPC 端点）

**问题的关键点**：
- 无服务器应用使用 Lambda 和 DynamoDB。
- 新功能需要访问 VPC 中的 Neptune 集群。
- 需要同时访问 Neptune 和 DynamoDB。

**详细知识点解释**：
- Lambda 需要在 VPC 内访问 Neptune，因为 Neptune 不在公共互联网上。
- 私有子网允许 Lambda 访问 VPC 资源，同时通过 NAT 访问外部服务。
- VPC 端点用于访问 DynamoDB，无需互联网流量。
- 公共子网不适合无服务器安全。
- Neptune 无 VPC 端点，需要 Lambda 在 VPC 内。

**复习要点清单**：
- [ ] 理解 Lambda 在 VPC 中的网络配置。
- [ ] 知道 Neptune 访问要求。
- [ ] 学习 VPC 端点用于 DynamoDB。
- [ ] 比较公共 vs 私有子网对 Lambda 的影响。

# Q404：错误。选择了 A；正确是 C。

**问题简介**：公司安装传感器收集工厂环境参数信息，如湿度、光照。公司需要在 AWS 云中实时流式传输和分析数据。如果任何参数超出可接受范围，工厂运营团队必须立即收到通知。

**用户答案**：A（将数据流式传输到 Amazon Kinesis Data Firehose 交付流。使用 AWS Step Functions 消费和分析 Kinesis Data Firehose 交付流中的数据。使用 Amazon Simple Notification Service (Amazon SNS) 通知运营团队）

**正确答案**：C（将数据流式传输到 Amazon Kinesis 数据流。创建 AWS Lambda 函数消费 Kinesis 数据流并分析数据。使用 Amazon Simple Notification Service (Amazon SNS) 通知运营团队）

**问题的关键点**：
- 传感器数据实时流式传输和分析。
- 参数超出范围时立即通知。
- 需要实时处理。

**详细知识点解释**：
- Amazon Kinesis Data Streams 支持实时数据流，Lambda 可实时消费和处理。
- Kinesis Data Firehose 用于批量交付到存储，不适合实时分析。
- Step Functions 用于编排工作流，不直接处理流数据。

**复习要点清单**：
- [ ] 理解 Kinesis Data Streams vs Data Firehose 的区别。
- [ ] 知道 Lambda 如何消费 Kinesis 流。
- [ ] 学习 SNS 用于实时通知。

# Q405：错误。选择了 C；正确是 D。

**问题简介**：公司准备部署 Amazon Elastic Kubernetes Service (Amazon EKS) 集群用于工作负载。公司期望集群支持不可预测数量的无状态 pods。许多 pods 将在短时间内创建，因为工作负载自动扩展副本数量。哪种解决方案将最大化节点弹性？

**用户答案**：C（配置 Kubernetes Cluster Autoscaler 以确保工作负载节点组的计算容量保持不足配置）

**正确答案**：D（配置工作负载使用基于可用区的拓扑扩展约束）

**问题的关键点**：
- EKS 集群支持不可预测的无状态 pods。
- 短时间内创建许多 pods。
- 最大化节点弹性。

**详细知识点解释**：
- 拓扑扩展约束基于可用区分布 pods，确保如果一个 AZ 失败，其他 AZ 的节点可用。
- Cluster Autoscaler 管理节点数量，但不直接提高节点弹性。
- 节点弹性意味着在失败时保持可用性。

**复习要点清单**：
- [ ] 理解拓扑扩展约束在 Kubernetes 中的作用。
- [ ] 知道如何配置基于 AZ 的 pod 分布。
- [ ] 学习 Cluster Autoscaler vs 拓扑约束的区别。

# Q411：错误。选择了 B；正确是 A。

**问题简介**：公司正在迁移应用程序到 AWS，该应用程序有对延迟敏感的依赖项。公司不确定所有依赖项，但知道低延迟通信使用端口1000上的自定义IP-based协议。公司希望将应用程序及其依赖项一起迁移，以同时将所有低延迟接口移至 AWS。公司已安装 AWS Application Discovery Agent 并收集数据数月。如何识别需要在同一阶段迁移的依赖项？

**用户答案**：B（使用 AWS Application Migration Service 并选择托管应用程序的服务器。可视化网络图以查找与应用程序交互的服务器。配置 Application Migration Service 为所有与应用程序交互的服务器启动测试实例。对测试实例执行验收测试。如果未发现问题，基于测试服务器创建移动组。）

**正确答案**：A（使用 AWS Migration Hub 并选择托管应用程序的服务器。可视化网络图以查找与应用程序交互的服务器。开启数据探索在 Amazon Athena 中。查询服务器间传输的数据以识别在端口1000上通信的服务器。返回 Migration Hub。基于 Athena 查询的发现创建移动组。）

**问题的关键点**：
- 迁移有延迟敏感依赖项的应用程序。
- 依赖项在端口1000上通信。
- 识别依赖项以同一阶段迁移。

**详细知识点解释**：
- AWS Migration Hub 提供网络可视化以查找交互服务器。
- Amazon Athena 查询服务器间传输的数据以识别端口1000通信。
- Application Migration Service 用于迁移执行，而非发现。
- Network Access Analyzer 用于 AWS 服务，而非本地。

**复习要点清单**：
- [ ] 理解 AWS Migration Hub 用于网络可视化。
- [ ] 知道如何使用 Athena 查询网络数据。
- [ ] 区分 Migration Hub 和 Application Migration Service。
- [ ] 学习 Network Access Analyzer 的限制。

# AWS SAP-C02 错题本

本文档记录练习过程中答错的题目，便于后续复习和巩固薄弱知识点。

---

# Q413：错误。选择了 C；正确是 B。

**问题简介**：在线调查公司运行应用程序在AWS Cloud中，应用程序分布并包含运行在自动扩展ECS集群中的微服务。ECS集群是ALB的目标，ALB是CloudFront分布的自定义源。公司有包含敏感数据的调查。敏感数据在通过应用程序时必须加密。只有应用程序的数据处理微服务应该能够解密数据。

**用户答案**：C（创建专用于数据处理微服务的对称AWS KMS密钥。创建Lambda@Edge函数。编程函数使用KMS密钥加密敏感数据。）

**正确答案**：B（创建专用于数据处理微服务的RSA密钥对。将公钥上传到CloudFront分布。创建字段级加密profile和配置。将配置添加到CloudFront缓存行为。）

**问题的关键点**：
- 敏感数据在CloudFront-ALB-ECS微服务间传输时加密。
- 只有数据处理微服务能解密。
- 使用CloudFront字段级加密。

**详细知识点解释**：
- CloudFront字段级加密使用RSA密钥对控制解密，只有持有私钥的服务能解密。
- 对称KMS密钥不提供相同级别的解密控制。
- Lambda@Edge用于自定义逻辑，但不直接处理字段级加密。

**复习要点清单**：
- [ ] 理解CloudFront字段级加密使用RSA密钥对。
- [ ] 知道如何创建和配置字段级加密profile。
- [ ] 区分对称vs非对称加密在解密控制中的作用。
- [ ] 学习Lambda@Edge vs原生CloudFront功能。

# Q414：错误。选择了 C；正确是 B。

**问题简介**：解决方案架构师正在确定现有VPC的DNS策略。VPC使用10.24.34.0/24 CIDR块，也使用Amazon Route 53 Resolver for DNS。新要求规定DNS查询必须使用私有托管区域。此外，具有公共IP地址的实例必须接收相应的公共主机名。

**用户答案**：C（停用VPC的enableDnsSupport属性。激活VPC的enableDnsHostnames属性。创建新的VPC DHCP选项集，并配置doman-name-servers=10.24.34.2。将新的DHCP选项集与VPC关联。）

**正确答案**：B（创建私有托管区域。将私有托管区域与VPC关联。激活VPC的enableDnsSupport属性和enableDnsHostnames属性。创建新的VPC DHCP选项集，并配置domain-name-servers=AmazonProvidedDNsS。将新的DHCP选项集与VPC关联。）

**问题的关键点**：
- VPC DNS策略使用私有托管区域。
- 公共IP实例接收公共主机名。
- 正确解析域名在VPC内。

**详细知识点解释**：
- 私有托管区域需要关联到VPC。
- enableDnsSupport和enableDnsHostnames都必须激活以支持DNS和公共主机名。
- AmazonProvidedDNS用于Route 53 Resolver。

**复习要点清单**：
- [ ] 理解VPC DNS设置：enableDnsSupport和enableDnsHostnames。
- [ ] 知道私有托管区域如何与VPC关联。
- [ ] 学习DHCP选项集配置DNS服务器。
- [ ] 区分公共和私有DNS解析。

# Q416：错误。选择了 AD；正确是 AB。

**问题简介**：研究中心迁移到AWS Cloud，将本地1 PB对象存储移至Amazon S3桶。100名科学家使用此对象存储存储工作相关文档。每位科学家有个人文件夹。所有科学家属于单个IAM用户组。研究中心合规官担心科学家能访问彼此的工作。研究中心有严格义务报告哪个科学家访问哪个文档。负责报告的团队AWS经验很少，想要现成解决方案，最大程度减少运营开销。

**用户答案**：AD（A: 创建身份策略，授予用户读写访问，添加条件指定S3路径必须以S(aws:username)为前缀。应用于科学家IAM用户组。D: 创建S3桶策略，授予科学家IAM用户组中用户读写访问。）

**正确答案**：AB（A: 创建身份策略，授予用户读写访问，添加条件指定S3路径必须以S(aws:username)为前缀。应用于科学家IAM用户组。B: 配置AWS CloudTrail trail捕获S3桶中所有对象级事件。将trail输出存储在另一个S3桶。使用Amazon Athena查询日志并生成报告。）

**问题的关键点**：
- 科学家隔离访问个人文件夹。
- 报告访问活动，合规。
- 最小运营开销，现成解决方案。

**详细知识点解释**：
- 身份策略限制访问特定路径，使用aws:username。
- CloudTrail捕获对象级事件，首选用于S3请求标识。
- Athena查询日志生成报告。
- 桶策略不提供路径级隔离。

**复习要点清单**：
- [ ] 理解身份策略限制S3路径访问。
- [ ] 知道CloudTrail用于S3对象级事件。
- [ ] 学习Athena查询CloudTrail日志。
- [ ] 区分身份策略和桶策略在访问控制中的作用。

# Q418：错误。选择了 B；正确是 A。

**问题简介**：解决方案架构师正在审查公司为Amazon RDS DB实例拍摄快照的过程。公司每天自动拍摄快照，保留7天。需要推荐解决方案，每6小时拍摄快照，保留30天。公司使用AWS Organizations管理所有AWS账户。公司需要RDS快照健康状况的合并视图。

**用户答案**：B（在Amazon RDS中开启跨账户管理功能。创建快照全局策略，指定频率和保留要求。使用管理账户的RDS控制台监控备份状态。）

**正确答案**：A（在AWS Backup中开启跨账户管理功能。创建备份计划，指定频率和保留要求。为DB实例添加标签。通过标签应用备份计划。使用AWS Backup监控备份状态。）

**问题的关键点**：
- RDS快照频率和保留更改。
- 多账户结构使用Organizations。
- 合并视图最小运营开销。

**详细知识点解释**：
- AWS Backup支持跨账户管理，提供合并视图。
- AWS Backup允许自定义频率和保留。
- RDS无原生跨账户管理；AWS Backup是首选。
- 标签应用备份计划简化管理。

**复习要点清单**：
- [ ] 理解AWS Backup跨账户功能。
- [ ] 知道AWS Backup vs RDS快照。
- [ ] 学习使用标签应用备份计划。
- [ ] 区分AWS Backup和Data Lifecycle Manager。

# Q419：错误。选择了 DEF；正确是 CEF。

**问题简介**：公司使用AWS Organizations多账户架构，当前安全配置包括SCP、基于资源的策略、基于身份的策略、信任策略和会话策略。解决方案架构师需要允许账户A中的IAM用户承担账户B中的角色。

**用户答案**：DEF（D: 配置账户B中用户的基于身份策略以允许操作。E: 配置账户B中目标角色的信任策略以允许操作。F: 配置会话策略以允许操作，并通过GetSessionToken API操作编程传递。）

**正确答案**：CEF（C: 配置账户A中用户的基于身份策略以允许操作。E: 配置账户B中目标角色的信任策略以允许操作。F: 配置会话策略以允许操作，并通过GetSessionToken API操作编程传递。）

**问题的关键点**：
- 跨账户角色承担。
- 多账户架构中的IAM配置。
- 允许用户承担角色。

**详细知识点解释**：
- 基于身份策略授予用户承担角色的权限。
- 信任策略允许指定账户或用户承担角色。
- 会话策略限制角色会话权限。
- SCP不直接用于角色承担。

**复习要点清单**：
- [ ] 理解跨账户角色承担流程。
- [ ] 知道信任策略如何控制角色访问。
- [ ] 学习GetSessionToken API与角色会话。
- [ ] 区分SCP和IAM策略在权限控制中的作用。

# Q420：错误。选择了 B；正确是 D。

**问题简介**：公司想要使用Amazon S3备份其本地文件存储解决方案。本地文件存储支持NFS，公司希望新解决方案支持NFS。公司希望在5天后归档备份文件。如果需要归档文件用于灾难恢复，公司愿意等待几天来检索这些文件。

**用户答案**：B（部署AWS Storage Gateway卷网关，与S3桶关联。将文件从本地文件存储移动到卷网关。创建S3生命周期规则，在5天后将文件移动到S3 Glacier Deep Archive。）

**正确答案**：D（部署AWS Storage Gateway文件网关，与S3桶关联。将文件从本地文件存储移动到文件网关。创建S3生命周期规则，在5天后将文件移动到S3 Glacier Deep Archive。）

**问题的关键点**：
- 本地文件备份到S3。
- 支持NFS。
- 5天后归档，愿意等待检索。
- 最具成本效益。

**详细知识点解释**：
- 文件网关适合文件存储，支持NFS。
- 卷网关用于块存储，不适合文件。
- 磁带网关用于磁带备份，不适合文件。
- S3 Glacier Deep Archive最便宜，适合长期归档和等待检索。

**复习要点清单**：
- [ ] 理解Storage Gateway类型：文件、卷、磁带。
- [ ] 知道文件网关支持NFS。
- [ ] 学习S3 Glacier Deep Archive用于长期归档。
- [ ] 区分S3存储类成本和检索时间。

# Q423：错误。选择了 ???；正确是 ACF。

**问题简介**：公司正在部署来自AWS Marketplace的第三方防火墙设备解决方案，用于监控和保护离开公司AWS环境的流量。公司希望将设备部署到共享服务VPC中，并通过设备路由所有出站互联网绑定流量。解决方案架构师需要推荐一种部署方法，优先考虑可靠性和最小化单个AWS区域内防火墙设备之间的故障转移时间。公司已设置从共享服务VPC到其他VPC的路由。

**用户答案**：???（用户之前错误，现在正确）

**正确答案**：ACF（A: 在共享服务VPC中部署两个防火墙设备，每个在不同的可用区。C: 创建新的网关负载均衡器在新共享服务VPC中。创建新的目标组，并附加到新的网关负载均衡器。将每个防火墙设备实例添加到目标组。F: 创建VPC网关负载均衡器端点。添加到共享服务VPC的路由表。指定新端点作为从其他VPC进入共享服务VPC的流量的下一跳。）

**问题的关键点**：
- 部署防火墙设备到共享服务VPC。
- 路由出站流量通过设备。
- 优先可靠性，最小故障转移时间。
- 跨VPC路由已设置。

**详细知识点解释**：
- 网关负载均衡器用于透明代理流量通过第三方设备。
- 跨可用区部署确保高可用性。
- 网关负载均衡器端点允许VPC间路由。
- 网络负载均衡器不适用于透明代理。

**复习要点清单**：
- [ ] 理解网关负载均衡器与网络负载均衡器的区别。
- [ ] 知道如何使用网关负载均衡器端点。
- [ ] 学习跨可用区部署提高可靠性。
- [ ] 区分VPC端点类型：接口、网关、网关负载均衡器。

# Q425：错误。选择了 B；正确是 C。

**问题简介**：公司在美国的一个AWS区域运行销售报告应用程序。应用程序使用Amazon API Gateway区域API和AWS Lambda函数从Amazon RDS for MySQL数据库中的数据生成按需报告。应用程序的前端托管在Amazon S3上，通过Amazon CloudFront分发访问。公司使用Amazon Route 53作为域的DNS服务。Route 53配置了简单路由策略，将流量路由到API Gateway API。在接下来的6个月，公司计划扩展到欧洲运营。超过90%的数据库流量是只读流量。公司已经在新区域部署了API Gateway API和Lambda函数。解决方案架构师必须设计一个解决方案，最小化用户下载报告的延迟。

**用户答案**：B（使用AWS Database Migration Service (AWS DMS)任务与完整加载加变更数据捕获(CDC)来复制原始区域中的主数据库到新区域中的数据库。更改Route 53记录为地理位置路由以连接到API Gateway API。）

**正确答案**：C（为新区域的RDS数据库配置跨区域只读副本。更改Route 53记录为延迟路由以连接到API Gateway API。）

**问题的关键点**：
- 全球扩展应用程序。
- 最小化用户下载报告的延迟。
- 大多数数据库流量是只读。
- API Gateway和Lambda已在新区域部署。

**详细知识点解释**：
- 跨区域只读副本适用于只读流量，减少延迟。
- 延迟路由基于用户位置到最近区域的延迟。
- DMS用于迁移，但只读副本更适合持续只读访问。
- 地理位置路由基于用户位置，不一定是延迟最低。

**复习要点清单**：
- [ ] 理解RDS跨区域只读副本。
- [ ] 知道Route 53延迟路由vs地理位置路由。
- [ ] 学习DMS vs只读副本用于数据库复制。
- [ ] 区分延迟路由和地理位置路由的使用场景。

# Q427：错误。选择了 ABE；正确是 ABC。

**问题简介**：公司正在部署新API到AWS。API使用Amazon API Gateway区域API端点和AWS Lambda函数托管。API从外部供应商API检索数据，将数据存储在Amazon DynamoDB全局表中，并从DynamoDB全局表检索数据。供应商API的API密钥存储在AWS Secrets Manager中，并使用AWS Key Management Service (AWS KMS)中的客户管理密钥加密。公司已将其自己的API部署到单个AWS区域。解决方案架构师需要更改公司API的API组件，以确保组件可以在多个区域以主动-主动配置运行。

**用户答案**：ABE（A: 将API部署到多个区域。配置Amazon Route 53使用自定义域名将流量路由到每个区域API端点。实施Route 53多值答案路由策略。B: 创建新的KMS多区域客户管理密钥。在每个范围内区域创建新的KMS客户管理副本密钥。E: 在每个范围内区域创建新的Secrets Manager秘密。从原始秘密复制秘密值到新秘密。）

**正确答案**：ABC（A: 将API部署到多个区域。配置Amazon Route 53使用自定义域名将流量路由到每个区域API端点。实施Route 53多值答案路由策略。B: 创建新的KMS多区域客户管理密钥。在每个范围内区域创建新的KMS客户管理副本密钥。C: 将现有Secrets Manager秘密复制到其他区域。对于每个范围内区域的复制秘密，选择适当的KMS密钥。）

**问题的关键点**：
- 主动-主动多区域API配置。
- Secrets Manager和KMS密钥在多区域。
- 最小运营开销。

**详细知识点解释**：
- Route 53多值路由平衡负载。
- KMS多区域密钥简化跨区域使用。
- 复制Secrets Manager秘密自动化，避免手动复制。
- 手动创建和复制秘密增加开销。

**复习要点清单**：
- [ ] 理解Route 53多值路由策略。
- [ ] 知道KMS多区域密钥的使用。
- [ ] 学习Secrets Manager秘密复制。
- [ ] 区分自动化复制和手动创建的开销。

# Q431：错误。选择了 D；正确是 C。

**问题简介**：一家研究公司在AWS Cloud中运行每日模拟，模拟在数百个基于Amazon Linux 2的Amazon EC2实例上运行。偶尔模拟会卡住，需要云运维工程师通过SSH连接到EC2实例解决问题。公司政策规定，没有EC2实例可以使用相同的SSH密钥，并且所有连接必须记录在AWS CloudTrail中。

**用户答案**：D（设置AWS Secrets Manager存储EC2 SSH密钥。创建一个新的AWS Lambda函数来创建新的SSH密钥并调用AWS Systems Manager Session Manager在EC2实例上设置SSH密钥。配置Secrets Manager使用Lambda函数进行自动轮换，每天一次。指示工程师在通过任何SSH客户端连接时从Secrets Manager获取SSH密钥。）

**正确答案**：C（启动新的EC2实例，而不为实例设置任何SSH密钥。在每个实例上设置EC2 Instance Connect。为工程师的IAM角色创建一个新的IAM策略，并附加Allow语句用于SendSSHPublicKey操作。指示工程师使用浏览器-based SSH客户端从EC2控制台连接到实例。）

**问题的关键点**：
- 通过SSH连接到EC2实例解决问题。
- 每个实例使用唯一SSH密钥。
- 连接记录在CloudTrail中。

**详细知识点解释**：
- EC2 Instance Connect使用临时SSH密钥，每次用户连接时生成一次性的SSH密钥。
- 用户通过EC2 Instance Connect的连接会记录在AWS CloudTrail中。
- 这符合政策要求，没有重复使用密钥，且连接被记录。
- 其他选项如Secrets Manager或Systems Manager文档不能提供相同的临时密钥和自动记录功能。

**复习要点清单**：
- [ ] 理解EC2 Instance Connect的工作原理。
- [ ] 知道它如何提供唯一临时SSH密钥。
- [ ] 学习连接如何记录在CloudTrail中。
- [ ] 区分EC2 Instance Connect与其他SSH管理方法的差异。

# Q432：错误。选择了 D；正确是 C。

**问题简介**：一家公司正在将移动银行应用程序迁移到VPC中的Amazon EC2实例上运行。后端服务应用程序在本地数据中心运行。数据中心有AWS Direct Connect连接到AWS。运行在VPC中的应用程序需要解析DNS请求到运行在数据中心的本地Active Directory域。

**用户答案**：D（在VPC中提供新的Active Directory域控制器，与本地Active Directory域建立双向信任。）

**正确答案**：C（使用Amazon Route 53 Resolver创建DNS端点。添加条件转发规则以解析本地数据中心和VPC之间的DNS命名空间。）

**问题的关键点**：
- VPC中的应用程序需要解析本地Active Directory域的DNS。
- Direct Connect连接。
- 最少管理开销。

**详细知识点解释**：
- Route 53 Resolver的条件转发规则允许VPC和本地DNS服务器之间的DNS解析，而无需管理额外的域控制器。
- 选项D需要管理额外的域控制器，增加开销。
- 选项A需要维护EC2实例作为DNS服务器。
- 选项B使用私有托管区域，但不直接支持条件转发到本地DNS。

**复习要点清单**：
- [ ] 理解Route 53 Resolver的条件转发规则。
- [ ] 知道如何使用DNS端点进行跨网络DNS解析。
- [ ] 学习Direct Connect环境下DNS解析的最佳实践。
- [ ] 区分Route 53 Resolver与其他DNS解决方案的开销。

# Q434：错误。选择了 C；正确是 D。

**问题简介**：一家公司正在将遗留应用程序从本地数据中心迁移到AWS。应用程序使用MongoDB作为键值数据库。根据公司的技术指南，所有Amazon EC2实例必须托管在没有互联网连接的私有子网中。此外，应用程序和数据库之间的所有连接必须加密。数据库必须能够根据需求扩展。

**用户答案**：C（为应用程序创建新的Amazon DynamoDB表，使用按需容量。使用DynamoDB的接口VPC端点连接到DynamoDB表。）

**正确答案**：D（为应用程序创建新的Amazon DocumentDB（具有MongoDB兼容性）表，使用Provisioned IOPS卷。使用集群端点连接到Amazon DocumentDB。）

**问题的关键点**：
- MongoDB兼容数据库。
- EC2在私有子网，无互联网。
- 加密连接。
- 按需扩展。

**详细知识点解释**：
- Amazon DocumentDB是AWS的MongoDB兼容服务，支持按需扩展。
- 集群端点用于连接DocumentDB，提供高可用性和负载平衡。
- 实例端点不推荐，因为它连接到特定实例。
- DynamoDB使用接口VPC端点，但DynamoDB不是MongoDB兼容的。

**复习要点清单**：
- [ ] 理解Amazon DocumentDB的MongoDB兼容性。
- [ ] 知道集群端点vs实例端点的使用。
- [ ] 学习私有子网中数据库连接的加密。
- [ ] 区分DocumentDB和DynamoDB在MongoDB迁移中的适用性。

# Q436：错误。选择了 D；正确是 A。

**问题简介**：一家公司正在将应用程序重新架构到AWS上运行。公司基础设施包括多个Amazon EC2实例。公司的开发团队需要不同级别的访问。公司希望实施一项政策，要求所有Windows EC2实例加入AWS上的Active Directory域。公司还希望实施增强的安全流程，如多因素认证(MFA)。公司希望尽可能使用托管AWS服务。

**用户答案**：D（创建AWS Directory Service Simple AD实现。启动Amazon WorkSpace。连接到并使用WorkSpace进行域安全配置任务。）

**正确答案**：A（创建AWS Directory Service for Microsoft Active Directory实现。启动Amazon WorkSpace。连接到并使用WorkSpace进行域安全配置任务。）

**问题的关键点**：
- Windows EC2实例加入Active Directory域。
- 不同访问级别和MFA。
- 尽可能使用托管服务。

**详细知识点解释**：
- AWS Managed Microsoft AD支持完整的Active Directory功能，包括MFA和精细访问控制。
- Simple AD不支持MFA和完整的AD功能。
- WorkSpaces是托管服务，用于管理AD。
- 使用EC2实例不是托管服务。

**复习要点清单**：
- [ ] 理解AWS Directory Service的类型：Managed Microsoft AD vs Simple AD。
- [ ] 知道Managed Microsoft AD支持MFA。
- [ ] 学习WorkSpaces用于AD管理的优势。
- [ ] 区分托管服务和自管理服务的优势。

# Q464：错误。选择了 B；正确是 A。

**问题简介**：解决方案架构师在启动前审查应用程序的弹性。应用程序运行在VPC私有子网中的Amazon EC2实例上。该EC2实例由自动扩展组提供，具有最小容量1和最大容量1。应用程序将数据存储在Amazon RDS for MySQL DB实例上。VPC在三个可用区中配置了子网，并配置了单个NAT网关。解决方案架构师需要推荐一个解决方案，以确保应用程序将在多个可用区中运行。

**用户答案**：B（将NAT网关替换为虚拟私有网关。将RDS for MySQL DB实例替换为Amazon Aurora MySQL DB集群。配置自动扩展组在VPC的所有子网中启动实例。将自动扩展组的最小容量和最大容量设置为3。）

**正确答案**：A（在其他可用区中部署额外的NAT网关。使用适当的路由更新路由表。将RDS for MySQL DB实例修改为Multi-AZ配置。配置自动扩展组在可用区中启动实例。将自动扩展组的最小容量和最大容量设置为3。）

**问题的关键点**：
- 应用程序在多个可用区中运行。
- EC2在私有子网，单NAT网关。
- 数据库是RDS MySQL。
- 自动扩展组当前单实例。

**详细知识点解释**：
- 要跨多个AZ运行，需要Multi-AZ RDS和跨AZ的ASG。
- NAT网关需要多个AZ以避免单点故障。
- 虚拟私有网关用于VPN，不适用于NAT。
- Aurora是好的，但不需要替换RDS。

**复习要点清单**：
- [ ] 理解Multi-AZ RDS配置。
- [ ] 知道NAT网关在多个AZ中的部署。
- [ ] 学习自动扩展组跨AZ配置。
- [ ] 区分NAT网关和虚拟私有网关。

# Q472：错误。选择了 D；正确是 A。

**问题简介**：一家公司有一个应用程序使用Amazon Aurora PostgreSQL DB集群作为数据库。DB集群包含一个小主实例和三个较大的副本实例。应用程序运行在AWS Lambda函数上。应用程序对数据库副本实例建立许多短寿命连接以执行只读操作。在高流量期间，应用程序变得不可靠，数据库报告建立了太多连接。高流量期间的频率不可预测。

**用户答案**：D（使用Amazon RDS Proxy为DB集群创建代理。为代理配置Aurora Data API的只读端点。更新Lambda函数连接到代理端点。）

**正确答案**：A（使用Amazon RDS Proxy为DB集群创建代理。配置代理的只读端点。更新Lambda函数连接到代理端点。）

**问题的关键点**：
- Lambda对Aurora副本建立许多短寿命连接。
- 高流量期间连接过多。
- 提高应用程序可靠性。

**详细知识点解释**：
- RDS Proxy支持Aurora，管理连接池，减少连接开销。
- 只读端点用于副本。
- Data API用于Aurora Serverless，不适用于标准Aurora。

**复习要点清单**：
- [ ] 理解RDS Proxy如何管理Lambda到数据库的连接。
- [ ] 知道RDS Proxy的只读端点用于Aurora副本。
- [ ] 学习Data API vs RDS Proxy的区别。
- [ ] 区分Aurora Serverless和标准Aurora的功能。

# Q473：错误。选择了 D；正确是 C。

**问题简介**：一家零售公司正在全世界所有商店安装IoT传感器。在每个传感器制造期间，公司私有证书颁发机构(CA)颁发包含唯一序列号的X.509证书。然后将每个证书部署到相应传感器。解决方案架构师需要给传感器安装后发送数据到AWS的能力。传感器在安装前不能发送数据到AWS。

**用户答案**：D（创建AWS IoT Core预置模板。在Parameters部分包含SerialNumber参数。在模板中包含参数验证。为每个使用CA的设备预置声明证书和私钥。授予AWS IoT Core服务权限在预置期间更新AWS IoT things。）

**正确答案**：C（创建AWS Lambda函数可以验证序列号。创建AWS IoT Core预置模板。在Parameters部分包含SerialNumber参数。添加Lambda函数作为预置前钩子。将CA注册到AWS IoT Core，指定预置模板，并设置allow-auto-registration参数。）

**问题的关键点**：
- 传感器安装后才能发送数据。
- 使用私有CA证书。
- 验证序列号。

**详细知识点解释**：
- AWS IoT Core Fleet Provisioning使用预置前钩子(Lambda)验证序列号。
- 注册CA并启用自动注册，允许传感器在安装时自动预置。
- 选项D需要手动预置每个设备，不适合大规模。

**复习要点清单**：
- [ ] 理解AWS IoT Core Fleet Provisioning。
- [ ] 知道预置前钩子的作用。
- [ ] 学习CA注册和自动注册。
- [ ] 区分Fleet Provisioning选项。

# Q484：错误。选择了 A；正确是 D。

**问题简介**：一家公司计划将应用程序从本地迁移到AWS Cloud。公司将通过移动应用程序底层数据存储到AWS开始迁移。应用程序数据存储在本地共享文件系统上，应用程序服务器通过SMB连接到共享文件系统。解决方案架构师必须实现一个使用Amazon S3桶作为共享存储的解决方案。在应用程序完全迁移和代码重写使用原生Amazon S3 API之前，应用程序必须继续通过SMB访问数据。解决方案架构师必须将应用程序数据迁移到AWS新位置，同时仍允许本地应用程序访问数据。

**用户答案**：A（创建新的Amazon FSx for Windows File Server文件系统。配置AWS DataSync，使用一个位置为本地文件共享，一个位置为新的Amazon FSx文件系统。创建新的DataSync任务，将数据从本地文件共享位置复制到Amazon FSx文件系统。）

**正确答案**：D（为应用程序创建S3桶。部署新的AWS Storage Gateway文件网关到本地VM上。创建新的文件共享，将数据存储在S3桶中并与文件网关关联。将数据从本地存储复制到新的文件网关端点。）

**问题的关键点**：
- 使用S3桶作为共享存储。
- 迁移期间通过SMB访问。
- 本地应用程序继续访问。

**详细知识点解释**：
- AWS Storage Gateway文件网关提供SMB接口到S3。
- 允许无缝迁移，保持SMB兼容性直到重写代码。
- FSx不直接使用S3作为后端。

**复习要点清单**：
- [ ] 理解AWS Storage Gateway文件网关的作用。
- [ ] 知道如何使用文件网关提供SMB到S3。
- [ ] 学习迁移期间保持兼容性的最佳实践。
- [ ] 区分Storage Gateway和FSx在文件存储中的使用。

# Q485：错误。选择了 A；正确是 D。

**问题简介**：一家全球公司有一个移动应用显示票务条形码。客户使用移动应用上的票务参加现场活动。活动扫描仪读取票务条形码并调用后端API根据数据库中的数据验证条形码数据。条形码扫描后，后端逻辑写入数据库的单个表以标记条形码为已使用。公司需要在AWS上部署应用，DNS名称为api.example.com。公司将在全球三个AWS区域托管数据库。

**用户答案**：A（在Amazon Aurora全局数据库集群上托管数据库。在与数据库相同的区域的三个Amazon Elastic Container Service (Amazon ECS)集群上托管后端。创建AWS Global Accelerator加速器以将请求路由到最近的ECS集群。创建Amazon Route 53记录，将api.example.com映射到加速器端点。）

**正确答案**：D（在Amazon DynamoDB全局表上托管数据库。创建Amazon CloudFront分布。关联CloudFront分布与包含验证条形码后端逻辑的Lambda@Edge函数。创建Amazon Route 53记录，将api.example.com映射到CloudFront分布。）

**问题的关键点**：
- 全球低延迟API。
- 数据库在三个区域。
- 单个表写入。

**详细知识点解释**：
- DynamoDB全局表支持跨区域复制和低延迟读取。
- Lambda@Edge允许在CloudFront边缘运行逻辑，减少延迟。
- CloudFront Functions仅用于请求操作，Lambda@Edge用于完整逻辑。

**复习要点清单**：
- [ ] 理解DynamoDB全局表用于全球低延迟。
- [ ] 知道Lambda@Edge vs CloudFront Functions的区别。
- [ ] 学习CloudFront用于全球分发。
- [ ] 区分Aurora全局集群和DynamoDB全局表的适用性。

# Q487：错误。选择了 C；正确是 D。

**问题简介**：为遵守行业法规，解决方案架构师必须设计一个解决方案，将公司的关键数据存储在多个公共AWS区域，包括美国总部所在区域。需要为公司的全球WAN网络提供对AWS存储数据的访问。安全团队要求访问此数据的流量不得通过公共互联网。

**用户答案**：C（从公司总部到AWS区域建立两个AWS Direct Connect连接。使用公司WAN通过DX连接发送流量。使用AWS transit VPC解决方案访问其他AWS区域的数据。）

**正确答案**：D（从公司总部到AWS区域建立两个AWS Direct Connect连接。使用公司WAN通过DX连接发送流量。使用Direct Connect Gateway访问其他AWS区域的数据。）

**问题的关键点**：
- 多区域数据存储。
- 通过WAN访问，不通过互联网。
- 高可用性和成本效益。

**详细知识点解释**：
- Direct Connect Gateway允许单个DX连接访问多个区域。
- 高可用性通过两个DX连接。
- 避免了transit VPC的复杂性。

**复习要点清单**：
- [ ] 理解Direct Connect Gateway的作用。
- [ ] 知道如何使用DX Gateway跨区域访问。
- [ ] 学习DX连接的高可用性配置。
- [ ] 区分transit VPC和Direct Connect Gateway的成本和复杂性。

# Q488：错误。选择了 D；正确是 B。

**问题简介**：一家公司开发了一个在VMware vSphere VM上运行Windows Server的应用程序，本地托管。应用程序数据以专有格式存储，必须通过应用程序读取。公司使用灾难恢复计划，希望在本地环境不可用时临时在AWS上托管应用程序，并在灾难恢复事件完成后返回本地托管。RPO为5分钟。

**用户答案**：D（在AWS上配置Amazon FSx for Windows File Server文件系统。将数据复制到文件系统。当本地环境不可用时，使用CloudFormation模板配置EC2实例并使用AWS::CloudFormation::Init命令挂载Amazon FSx文件共享。）

**正确答案**：B（配置AWS Elastic Disaster Recovery。将数据复制到附加了Amazon EBS卷的复制Amazon EC2实例。当本地环境不可用时，使用Elastic Disaster Recovery启动使用复制卷的EC2实例。）

**问题的关键点**：
- 灾难恢复临时托管应用程序。
- RPO 5分钟。
- 最少操作开销。

**详细知识点解释**：
- AWS Elastic Disaster Recovery是托管灾难恢复服务，提供低操作开销的复制和故障转移。
- FSx需要额外操作来管理文件系统和挂载，增加开销。

**复习要点清单**：
- [ ] 理解AWS Elastic Disaster Recovery的灾难恢复应用。
- [ ] 知道如何使用Elastic Disaster Recovery复制VMware VMs。
- [ ] 学习RPO和灾难恢复最佳实践。
- [ ] 区分Elastic Disaster Recovery和其他存储服务的操作开销。

# Q490：错误。选择了 A；正确是 B。

**问题简介**：一家公司提供一个集中化的Amazon EC2应用程序，托管在单个共享VPC中。该应用程序必须可从其他业务单元VPC中的客户端应用程序访问。应用程序前端配置了Network Load Balancer (NLB)以实现可扩展性。最多10个业务单元VPC需要连接到共享VPC。一些业务单元VPC CIDR块与共享VPC重叠，且彼此之间也可能重叠。网络连接到共享VPC中的集中化应用程序应仅允许来自授权业务单元VPC的流量。

**用户答案**：A（创建AWS Transit Gateway。将共享VPC和授权业务单元VPC附加到transit gateway。创建单个transit gateway路由表并与所有附加VPC关联。允许从附件到路由表的路由自动传播。配置VPC路由表以将流量发送到transit gateway。）

**正确答案**：B（使用集中化应用程序的NLB创建VPC endpoint service，并启用要求端点接受的选项。在每个业务单元VPC中使用端点服务的服务名称创建VPC endpoint。从端点服务控制台接受授权端点请求。）

**问题的关键点**：
- 多VPC连接，CIDR重叠。
- 仅允许授权VPC访问。
- 使用NLB前端。

**详细知识点解释**：
- VPC Endpoint Service允许在重叠CIDR的情况下通过NLB连接服务。
- Transit Gateway不支持重叠CIDR。
- 端点接受提供访问控制。

**复习要点清单**：
- [ ] 理解VPC Endpoint Service在重叠网络中的应用。
- [ ] 知道如何使用NLB创建端点服务。
- [ ] 学习处理重叠CIDR的网络解决方案。
- [ ] 区分Transit Gateway和VPC Endpoint Service的使用场景。

# Q492：错误。选择了 C；正确是 D。

**问题简介**：一家公司使用AWS上的移动应用运行在线竞赛。公司在每个竞赛结束时随机选择获胜者。竞赛持续时间可变。公司在竞赛结束后不需要保留任何数据。公司使用托管在Amazon EC2实例上的自定义代码处理竞赛数据并选择获胜者。EC2实例位于Application Load Balancer之后，并在Amazon RDS DB实例上存储竞赛条目。公司必须设计新架构以降低运行竞赛的成本。

**用户答案**：C（在RDS DB实例前面添加Amazon ElastiCache for Redis集群以缓存竞赛条目。将代码重写为使用Fargate启动类型的Amazon ECS容器。在每个条目上设置ElastiCache TTL属性以在竞赛结束时使条目过期。）

**正确答案**：D（将竞赛条目的存储迁移到Amazon DynamoDB。将代码重写为AWS Lambda函数。在每个条目上设置DynamoDB TTL属性，以在竞赛结束时使每个条目过期。）

**问题的关键点**：
- 竞赛数据临时存储，无需持久保留。
- 降低成本，使用无服务器服务。
- 自动数据过期。

**详细知识点解释**：
- DynamoDB TTL自动过期数据，无需手动删除。
- Lambda提供无服务器计算，成本低。
- ElastiCache和ECS仍需管理资源，成本高于完全无服务器。

**复习要点清单**：
- [ ] 理解DynamoDB TTL用于自动数据过期。
- [ ] 知道Lambda的无服务器优势。
- [ ] 学习无服务器架构的成本优化。
- [ ] 区分缓存解决方案和TTL的差异。

# Q493：错误。选择了 B；正确是 A。

**问题简介**：一家公司实施了新的安全要求。根据新要求，公司必须扫描公司VPC中企业AWS实例的所有流量以查找违反公司安全策略的情况。作为扫描结果，公司可以阻止对特定IP地址的访问。公司部署了一组Amazon EC2实例在私有子网中作为透明代理。公司在这些EC2实例上安装了批准的代理服务器软件。公司修改了所有子网的路由表以使用相应的带有代理软件的EC2实例作为默认路由。公司还创建了符合安全策略的安全组并将这些安全组分配给EC2实例。尽管有这些配置，私有子网中EC2实例的流量并未正确转发到互联网。

**用户答案**：B（添加规则到分配给代理EC2实例的安全组以允许此安全组之间所有实例的所有流量。将此安全组分配给VPC中的所有EC2实例。）

**正确答案**：A（在运行代理软件的EC2实例上禁用源/目的地检查。）

**问题的关键点**：
- 代理EC2实例未正确转发流量。
- 透明代理用于安全扫描。
- 解决转发问题。

**详细知识点解释**：
- 源/目的地检查阻止EC2实例转发非自身IP的流量，禁用它允许代理转发。
- 安全组规则不处理转发，只控制允许流量。
- DHCP和额外ENI过于复杂。

**复习要点清单**：
- [ ] 理解EC2源/目的地检查的作用。
- [ ] 知道如何禁用以启用代理转发。
- [ ] 学习透明代理的配置。
- [ ] 区分安全组和实例检查的差异。

# Q494：错误。选择了 B；正确是 C。

**问题简介**：一家公司正在AWS上手动创建的VPC中运行其解决方案。公司正在使用AWS CloudFormation来配置基础设施的其他部分。根据新要求，公司必须以自动方式管理所有基础设施。公司应该以最少努力的方式满足这个新要求。

**用户答案**：B（创建一个CloudFormation堆栈集，该堆栈集创建VPC。使用堆栈集将VPC导入堆栈。）

**正确答案**：C（创建一个新的CloudFormation模板，该模板严格配置现有的VPC资源和配置。从CloudFormation控制台，通过导入现有资源创建新堆栈。）

**问题的关键点**：
- 将手动VPC迁移到自动管理。
- 使用CloudFormation。
- 最少努力。

**详细知识点解释**：
- CloudFormation支持导入现有资源到堆栈。
- 堆栈集用于多账户/区域，不适合导入。
- CDK和SAM不直接支持导入。

**复习要点清单**：
- [ ] 理解CloudFormation堆栈导入。
- [ ] 知道如何使用导入功能。
- [ ] 学习基础设施自动化。
- [ ] 区分堆栈集和其他工具。

# Q496：错误。选择了 ABC；正确是 ACF。

**问题简介**：一家公司在云中运行一个由数据库和网站组成的应用程序。用户可以将数据发布到网站，进行处理，并通过电子邮件发送回。数据存储在运行在Amazon EC2实例上的MySQL数据库中。数据库在具有两个私有子网的VPC中运行。网站在具有一个公共子网的不同VPC中运行Apache Tomcat的单个EC2实例上。数据库和网站VPC之间有一个VPC对等连接。网站在上个月由于高流量遭受了几次中断。

**用户答案**：ABC（A: 将Tomcat服务器放在Auto Scaling组中，具有多个EC2实例，位于Application Load Balancer之后。B: 配置额外的VPC对等连接。C: 将MySQL数据库迁移到具有一个Aurora副本的Amazon Aurora。）

**正确答案**：ACF（A: 将Tomcat服务器放在Auto Scaling组中，具有多个EC2实例，位于Application Load Balancer之后。C: 将MySQL数据库迁移到具有一个Aurora副本的Amazon Aurora。F: 在网站VPC的不同可用区中创建额外的公共子网。）

**问题的关键点**：
- 应用程序可靠性，处理高流量中断。
- 多VPC设置，VPC对等。
- 数据库和网站分离。

**详细知识点解释**：
- Auto Scaling和ALB提高前端可靠性。
- Aurora提供数据库高可用性。
- 多AZ子网确保跨AZ部署。
- 额外的对等连接不增加可靠性。

**复习要点清单**：
- [ ] 理解Auto Scaling和ALB用于高可用性。
- [ ] 知道Aurora副本的作用。
- [ ] 学习多AZ部署的重要性。
- [ ] 区分对等连接和其他可靠性措施。

# Q498：错误。选择了 BC；正确是 AB。

**问题简介**：一家公司想要将Amazon Aurora MySQL DB集群从现有AWS账户迁移到同一AWS区域的新AWS账户。两个账户都是AWS Organizations中同一组织的成员。公司必须最小化数据库服务中断，然后执行DNS切换到新数据库。

**用户答案**：BC（B: 在新AWS账户中创建Aurora DB集群。使用AWS Database Migration Service (AWS DMS) 在两个Aurora DB集群之间迁移数据。C: 使用AWS Backup从现有AWS账户共享Aurora数据库备份到新AWS账户。从快照在新账户中创建Aurora DB集群。）

**正确答案**：AB（A: 获取现有Aurora数据库的快照。与新AWS账户共享快照。在新账户中从快照创建Aurora DB集群。B: 在新AWS账户中创建Aurora DB集群。使用AWS Database Migration Service (AWS DMS) 在两个Aurora DB集群之间迁移数据。）

**问题的关键点**：
- 跨账户Aurora迁移。
- 最小化中断。
- 使用Organizations。

**详细知识点解释**：
- Aurora快照可以跨账户共享。
- DMS允许实时同步。
- AWS Backup不支持直接共享Aurora备份。

**复习要点清单**：
- [ ] 理解Aurora快照跨账户共享。
- [ ] 知道DMS用于数据库迁移。
- [ ] 学习跨账户迁移策略。
- [ ] 区分Backup和快照共享。

# Q500：错误。选择了 AD；正确是 BD。

**问题简介**：一家公司有多个业务线 (LOB) 汇总到母公司。公司要求解决方案架构师开发一个解决方案，具有以下要求：为所有LOB使用的AWS账户生成单个AWS发票。每个LOB账户的成本应在发票上分开。提供根据公司治理政策限制LOB账户中服务和功能的能力。每个LOB账户应被委派完全管理员权限，无论治理政策如何。

**用户答案**：AD（A: 使用AWS Organizations为每个LOB在母账户中创建组织。然后邀请每个LOB账户加入适当的组织。D: 创建SCP，仅允许批准的服务和功能，然后将策略应用到LOB账户。）

**正确答案**：BD（B: 使用AWS Organizations在母账户中创建单个组织。然后，邀请每个LOB的AWS账户加入组织。D: 创建SCP，仅允许批准的服务和功能，然后将策略应用到LOB账户。）

**问题的关键点**：
- 单个发票，成本分开。
- 限制服务，保持管理员权限。
- 多LOB账户。

**详细知识点解释**：
- Organizations创建单个组织结构。
- SCP限制服务但允许管理员。
- 合并计费处理发票。

**复习要点清单**：
- [ ] 理解Organizations用于多账户管理。
- [ ] 知道SCP如何限制服务。
- [ ] 学习合并计费。
- [ ] 区分多个组织 vs 单个组织。

# Q501：错误。选择了 CD；正确是 DE。

**问题简介**：解决方案架构师部署了一个在自定义域下为两个AWS区域的用户提供服务的Web应用程序。应用程序使用Amazon Route 53延迟-based路由。解决方案架构师为每个区域的单独可用区中的一对Web服务器关联了加权记录集。解决方案架构师运行灾难恢复场景。当一个区域的所有Web服务器停止时，Route 53不会自动将用户重定向到另一个区域。

**用户答案**：CD（C: 延迟资源记录集不能与加权资源记录集结合使用。D: 为与停止Web服务器区域的域关联的延迟别名资源记录集启用评估目标健康设置。）

**正确答案**：DE（D: 为与停止Web服务器区域的域关联的延迟别名资源记录集启用评估目标健康设置。E: 为与停止Web服务器关联的一个或多个加权资源记录集未设置HTTP健康检查。）

**问题的关键点**：
- Route 53延迟路由故障转移。
- 加权记录和健康检查。
- 灾难恢复场景。

**详细知识点解释**：
- 延迟和加权记录可以结合。
- 评估目标健康必须启用。
- HTTP健康检查检测故障。

**复习要点清单**：
- [ ] 理解Route 53延迟和加权路由。
- [ ] 知道健康检查在故障转移中的作用。
- [ ] 学习启用评估目标健康。
- [ ] 区分延迟和加权记录的兼容性。

# Q504：错误。选择了 C；正确是 A。

**问题简介**：一家公司在本地数据中心使用Kubernetes开发新解决方案。公司使用Amazon Elastic Kubernetes Service (Amazon EKS)集群用于其开发和测试环境。生产工作负载的EKS控制平面和数据平面必须位于本地。公司需要一个AWS管理的Kubernetes解决方案。

**用户答案**：C（在本地数据中心安装AWS Outposts服务器。在Outposts服务器上使用扩展集群配置部署Amazon EKS用于生产工作负载。）

**正确答案**：A（在本地数据中心安装AWS Outposts服务器。在Outposts服务器上使用本地集群配置部署Amazon EKS用于生产工作负载。）

**问题的关键点**：
- 本地EKS控制平面和数据平面。
- AWS管理的解决方案。
- 混合云Kubernetes。

**详细知识点解释**：
- 本地集群配置允许控制平面在Outposts上。
- 扩展集群将控制平面放在AWS云中。
- EKS Anywhere不是AWS管理的。

**复习要点清单**：
- [ ] 理解AWS Outposts在EKS中的应用。
- [ ] 知道本地 vs 扩展集群配置。
- [ ] 学习混合云Kubernetes部署。
- [ ] 区分EKS Anywhere和EKS on Outposts。

# Q507：错误。选择了 A；正确是 D。

**问题简介**：一家公司正在部署新的基于Web的应用程序，需要为Linux应用程序服务器提供存储解决方案。公司希望为所有实例创建一个更新应用程序数据的单一位置。活动数据集最大为100 GB。峰值操作每天发生3小时，需要总共225 MiBps的读取吞吐量。设计一个多AZ解决方案，并在另一个AWS区域复制数据以用于灾难恢复 (DR)。DR副本的RPO小于1小时。

**用户答案**：A（部署新的Amazon Elastic File System (Amazon EFS)多AZ文件系统。为文件系统配置75 MiBps的预置吞吐量。实施到DR区域文件系统的复制。）

**正确答案**：D（在生产区域和DR区域部署Amazon FSx for OpenZFS文件系统。创建AWS DataSync计划任务，每10分钟从生产文件系统复制数据到DR文件系统。）

**问题的关键点**：
- 多AZ文件存储。
- 跨区域DR复制，RPO <1小时。
- 高读取吞吐量。

**详细知识点解释**：
- FSx for OpenZFS支持跨区域复制。
- DataSync允许计划复制。
- EFS预置吞吐量不足。

**复习要点清单**：
- [ ] 理解FSx for OpenZFS的跨区域复制。
- [ ] 知道DataSync用于计划数据同步。
- [ ] 学习文件系统DR解决方案。
- [ ] 区分EFS和FSx for OpenZFS。

# Q530：错误。选择了 BDF；正确是 ACE。

**问题简介**：一家公司使用AWS Organizations。公司在集中的网络账户中运行两个防火墙设备。每个防火墙设备在手动配置的高可用Amazon EC2实例上运行。Transit Gateway将集中的网络账户的VPC连接到成员账户的VPC。每个防火墙设备使用静态私有IP地址，然后用于将流量从成员账户路由到互联网。在最近的事件中，一个配置错误的脚本启动了两个防火墙设备的终止。在重建防火墙设备期间，公司编写了一个新脚本在启动时配置防火墙设备。公司希望现代化防火墙设备的部署。防火墙设备需要能够水平扩展以处理网络扩展时的增加流量。公司必须继续使用防火墙设备以符合公司政策。防火墙设备的提供商已确认最新版本的防火墙代码将与所有AWS服务一起工作。

**用户答案**：BDF（B: 在集中的网络账户中部署Network Load Balancer。设置使用AWS PrivateLink的端点服务。D: 创建Auto Scaling组。配置使用新脚本作为用户数据的AWS Launch Wizard部署。F: 在集中的网络账户中创建VPC端点。）

**正确答案**：ACE（A: 在集中的网络账户中部署Gateway Load Balancer。设置使用AWS PrivateLink的端点服务。C: 创建Auto Scaling组和使用新脚本作为用户数据的启动模板。E: 在每个成员账户中创建VPC端点。）

**问题的关键点**：
- 现代化防火墙部署。
- 水平扩展。
- 使用第三方防火墙设备。

**详细知识点解释**：
- Gateway Load Balancer适用于防火墙设备。
- Auto Scaling启用水平扩展。
- VPC端点在成员账户提供连接。

**复习要点清单**：
- [ ] 理解Gateway Load Balancer用于第三方设备。
- [ ] 知道Auto Scaling组水平扩展。
- [ ] 学习PrivateLink端点服务。
- [ ] 区分NLB和GLB的使用场景。

# Q534：错误。选择了 C；正确是 B。

**问题简介**：一家公司计划从本地数据中心迁移到AWS Cloud。公司计划使用AWS Organizations管理的组织中的多个AWS账户。公司将最初创建少量账户，并根据需要添加账户。解决方案架构师必须设计一个在所有AWS账户中启用AWS CloudTrail的解决方案。

**用户答案**：C（在组织的所有AWS账户中创建新的CloudTrail trail。每当创建新账户时创建新trail。定义SCP防止删除或修改trail。将SCP应用到根OU。）

**正确答案**：B（在组织的托管账户中创建新的CloudTrail trail。配置trail记录组织中所有AWS账户的所有事件。）

**问题的关键点**：
- 在所有账户启用CloudTrail。
- 多账户组织。
- 操作效率最高。

**详细知识点解释**：
- 组织trail自动为所有账户启用。
- 无需手动为每个账户配置。
- SCP保护trail。

**复习要点清单**：
- [ ] 理解CloudTrail组织trail。
- [ ] 知道如何在Organizations中启用。
- [ ] 学习多账户治理。
- [ ] 区分手动和自动配置。

# Q508：错误。选择了 A；正确是 C。

**问题简介**：一家公司需要从远程位置的实验中收集数据，该位置没有互联网连接。在实验期间，连接到本地网络的传感器将在一周内生成6 TB专有格式数据。传感器可以配置为定期将数据文件上传到FTP服务器，但传感器没有自己的FTP服务器。传感器也不支持其他协议。公司需要集中收集数据，并尽快将数据移动到AWS Cloud中的对象存储。

**用户答案**：A（订购AWS Snowball Edge Compute Optimized设备。将设备连接到本地网络。配置AWS DataSync与目标桶名称，并在NFS上卸载数据到设备。在实验后，返回设备以将数据加载到Amazon S3。）

**正确答案**：C（订购AWS Snowcone设备，包括Amazon Linux 2 AMI。将设备连接到本地网络。在设备上启动Amazon EC2实例。在EC2实例上安装和配置FTP服务器。配置传感器将数据上传到EC2实例。在实验后，返回设备以将数据加载到Amazon S3。）

**问题的关键点**：
- 离线数据收集，传感器支持FTP。
- 6 TB数据，一周实验。
- 尽快移动到S3。

**详细知识点解释**：
- Snowcone支持EC2实例，用于运行FTP服务器。
- 传感器可以直接FTP上传到设备。
- Snowball Edge更适合大批量数据，不需要FTP服务器。

**复习要点清单**：
- [ ] 理解AWS Snowcone用于边缘数据收集。
- [ ] 知道如何在Snow设备上运行EC2实例。
- [ ] 学习离线数据传输到S3。
- [ ] 区分Snowcone和Snowball Edge的使用场景。

# Q510：错误。选择了 C；正确是 A。

**问题简介**：一家公司正在为制造应用程序设计AWS环境。该应用程序在客户中取得成功，应用程序的用户基础增加了。公司通过1 Gbps AWS Direct Connect连接将AWS环境连接到公司的本地数据中心。公司已为连接配置了BGP。公司必须更新现有的网络连接解决方案，以确保解决方案高度可用、容错且安全。

**用户答案**：C（配置多个私有VIF。在本地数据中心和AWS之间的VIF上负载平衡数据以提供弹性。）

**正确答案**：A（添加动态私有IP AWS Site-to-Site VPN作为辅助路径，以保护传输中的数据并为Direct Connect连接提供弹性。配置MACsec以加密Direct Connect连接内的流量。）

**问题的关键点**：
- 高可用性、容错、安全的网络连接。
- 现有1 Gbps Direct Connect。
- 成本效益。

**详细知识点解释**：
- 动态VPN提供弹性，而不需额外Direct Connect。
- MACsec添加加密层。
- 多个VIF不提供加密。

**复习要点清单**：
- [ ] 理解Direct Connect的高可用性配置。
- [ ] 知道如何添加VPN作为辅助路径。
- [ ] 学习MACsec用于加密。
- [ ] 区分VIF负载平衡和VPN弹性。

# Q522：错误。选择了 C；正确是 A。

**问题简介**：一家公司在本地数据中心运行许多服务。数据中心使用AWS Direct Connect (DX) 和IPSec VPN连接到AWS。服务数据敏感，不能通过互联网传输。公司希望扩展到新市场段，并开始向使用AWS的其他公司提供其服务。

**用户答案**：C（将互联网网关附加到VPC，并确保网络访问控制和安全组规则允许相关的入站和出站流量。）

**正确答案**：A（创建一个接受TCP流量的VPC Endpoint Service，将其托管在Network Load Balancer之后，并通过DX使服务可用。）

**问题的关键点**：
- 敏感数据，不能通过互联网。
- 向其他公司提供服务。
- 使用DX连接。

**详细知识点解释**：
- VPC Endpoint Service允许私有访问服务。
- NLB支持TCP流量，适合端点服务。
- 互联网网关会通过互联网路由流量。

**复习要点清单**：
- [ ] 理解VPC Endpoint Service用于跨账户服务共享。
- [ ] 知道NLB是端点服务的必需负载均衡器。
- [ ] 学习避免互联网路径的安全实践。
- [ ] 区分NLB和ALB在端点服务中的使用。

# Q525：错误。选择了 A；正确是 B。

**问题简介**：一家公司想要将虚拟Microsoft工作负载从本地数据中心迁移到AWS。公司已在AWS上成功测试了一些示例工作负载。公司已创建了到VPC的AWS Site-to-Site VPN连接。解决方案架构师需要生成从数据中心迁移所有工作负载的总拥有成本 (TCO) 报告。简单网络管理协议 (SNMP) 已启用在数据中心的每个VM上。公司不能在数据中心添加更多VM，也不能在VM上安装额外软件。发现数据必须自动导入到AWS Migration Hub。

**用户答案**：A（使用AWS Application Migration Service无代理服务和AWS Migration Hub Strategy Recommendations生成TCO报告。）

**正确答案**：B（启动Windows Amazon EC2实例。在EC2实例上安装Migration Evaluator无代理收集器。配置Migration Evaluator生成TCO报告。）

**问题的关键点**：
- 生成TCO报告。
- 无代理，不能安装软件。
- 自动导入Migration Hub。

**详细知识点解释**：
- Migration Evaluator使用无代理收集器生成TCO。
- SNMP用于数据收集。
- Application Migration Service不生成TCO。

**复习要点清单**：
- [ ] 理解Migration Evaluator用于TCO分析。
- [ ] 知道无代理收集器的优势。
- [ ] 学习Migration Hub的数据导入。
- [ ] 区分迁移服务和评估工具。

# Q526：错误。选择了 C；正确是 A。

**问题简介**：一家公司正在开发移动游戏，使游戏资产在两个AWS区域可用。游戏资产从每个区域的一组Amazon EC2实例后面Application Load Balancer (ALB)提供。公司要求游戏资产从最近的区域获取。如果游戏资产在最近的区域不可用，则应从另一个区域获取。

**用户答案**：C（创建两个Amazon CloudFront分布，每个ALB作为原点。创建一个Amazon Route 53故障转移路由记录指向两个CloudFront分布。设置评估目标健康值为Yes。）

**正确答案**：A（创建一个Amazon CloudFront分布。创建一个原点组，其中一个原点为每个ALB。将其中一个原点设置为主要原点。）

**问题的关键点**：
- 游戏资产从最近区域获取。
- 故障转移到另一个区域。
- 低延迟分发。

**详细知识点解释**：
- CloudFront原点组提供内置故障转移。
- 从最近边缘位置分发。
- Route 53故障转移不必要且复杂。

**复习要点清单**：
- [ ] 理解CloudFront原点组用于故障转移。
- [ ] 知道CloudFront如何提供低延迟。
- [ ] 学习原点组配置。
- [ ] 区分CloudFront和Route 53路由。
