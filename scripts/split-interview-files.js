#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 定义拆分配置
const splitConfig = {
  spring: [
    { name: 'spring-basics', title: 'Spring 基础', pattern: /^## Spring 基础/, endPattern: /^## Spring Bean/ },
    { name: 'spring-bean', title: 'Spring Bean', pattern: /^## Spring Bean/, endPattern: /^## Spring AOP/ },
    { name: 'spring-aop', title: 'Spring AOP', pattern: /^## Spring AOP/, endPattern: /^## Spring MVC/ },
    { name: 'spring-mvc', title: 'Spring MVC', pattern: /^## Spring MVC/, endPattern: /^## Spring Boot/ },
    { name: 'spring-boot', title: 'Spring Boot', pattern: /^## Spring Boot/, endPattern: /^## Spring 事务/ },
    { name: 'spring-transaction', title: 'Spring 事务', pattern: /^## Spring 事务/, endPattern: /^## Spring Data/ },
    { name: 'spring-data', title: 'Spring Data', pattern: /^## Spring Data/, endPattern: /^## Spring Cloud/ },
    { name: 'spring-cloud', title: 'Spring Cloud', pattern: /^## Spring Cloud/, endPattern: /^## 其他/ },
    { name: 'spring-misc', title: '其他', pattern: /^## 其他/, endPattern: null }
  ],
  network: [
    { name: 'osi-tcp-model', title: 'OSI 和 TCP/IP 模型', pattern: /^## OSI 和 TCP\/IP 模型/, endPattern: /^## 物理层和数据链路层/ },
    { name: 'physical-datalink-layer', title: '物理层和数据链路层', pattern: /^## 物理层和数据链路层/, endPattern: /^## 网络层/ },
    { name: 'network-layer', title: '网络层', pattern: /^## 网络层/, endPattern: /^## 传输层/ },
    { name: 'transport-layer', title: '传输层', pattern: /^## 传输层/, endPattern: /^## 应用层/ },
    { name: 'application-layer', title: '应用层', pattern: /^## 应用层/, endPattern: /^## 网络安全/ },
    { name: 'network-security', title: '网络安全', pattern: /^## 网络安全/, endPattern: /^## 性能优化/ },
    { name: 'performance-optimization', title: '性能优化', pattern: /^## 性能优化/, endPattern: /^## 其他问题/ },
    { name: 'network-misc', title: '其他问题', pattern: /^## 其他问题/, endPattern: null }
  ],
  mybatis: [
    { name: 'mybatis-basics', title: '基础概念', pattern: /^## 基础概念/, endPattern: /^## 配置文件/ },
    { name: 'mybatis-configuration', title: '配置文件', pattern: /^## 配置文件/, endPattern: /^## Mapper/ },
    { name: 'mybatis-mapper', title: 'Mapper', pattern: /^## Mapper/, endPattern: /^## SQL 映射/ },
    { name: 'mybatis-sql-mapping', title: 'SQL 映射', pattern: /^## SQL 映射/, endPattern: /^## 参数映射/ },
    { name: 'mybatis-parameter-mapping', title: '参数映射', pattern: /^## 参数映射/, endPattern: /^## 结果映射/ },
    { name: 'mybatis-result-mapping', title: '结果映射', pattern: /^## 结果映射/, endPattern: /^## 关联查询/ },
    { name: 'mybatis-association', title: '关联查询', pattern: /^## 关联查询/, endPattern: /^## 缓存机制/ },
    { name: 'mybatis-cache', title: '缓存机制', pattern: /^## 缓存机制/, endPattern: /^## 插件机制/ },
    { name: 'mybatis-plugin', title: '插件机制', pattern: /^## 插件机制/, endPattern: /^## 执行流程/ },
    { name: 'mybatis-execution', title: '执行流程', pattern: /^## 执行流程/, endPattern: /^## 高级特性/ },
    { name: 'mybatis-advanced', title: '高级特性', pattern: /^## 高级特性/, endPattern: /^## Spring 整合/ },
    { name: 'mybatis-spring-integration', title: 'Spring 整合', pattern: /^## Spring 整合/, endPattern: /^## 性能优化/ },
    { name: 'mybatis-performance', title: '性能优化', pattern: /^## 性能优化/, endPattern: null }
  ],
  rocketmq: [
    { name: 'rocketmq-basics', title: '基础概念', pattern: /^## 基础概念/, endPattern: /^## 架构设计/ },
    { name: 'rocketmq-architecture', title: '架构设计', pattern: /^## 架构设计/, endPattern: /^## 消息发送/ },
    { name: 'rocketmq-message-sending', title: '消息发送', pattern: /^## 消息发送/, endPattern: /^## 消息消费/ },
    { name: 'rocketmq-message-consumption', title: '消息消费', pattern: /^## 消息消费/, endPattern: /^## 消息可靠性/ },
    { name: 'rocketmq-reliability', title: '消息可靠性', pattern: /^## 消息可靠性/, endPattern: /^## 消息顺序性/ },
    { name: 'rocketmq-ordering', title: '消息顺序性', pattern: /^## 消息顺序性/, endPattern: /^## 消息去重与幂等/ },
    { name: 'rocketmq-deduplication', title: '消息去重与幂等', pattern: /^## 消息去重与幂等/, endPattern: /^## 事务消息/ },
    { name: 'rocketmq-transaction', title: '事务消息', pattern: /^## 事务消息/, endPattern: /^## 延迟消息/ },
    { name: 'rocketmq-delayed-message', title: '延迟消息', pattern: /^## 延迟消息/, endPattern: /^## 消息过滤/ },
    { name: 'rocketmq-message-filtering', title: '消息过滤', pattern: /^## 消息过滤/, endPattern: /^## 高可用/ },
    { name: 'rocketmq-high-availability', title: '高可用', pattern: /^## 高可用/, endPattern: /^## 存储机制/ },
    { name: 'rocketmq-storage', title: '存储机制', pattern: /^## 存储机制/, endPattern: null }
  ],
  redis: [
    { name: 'redis-basics', title: '基础概念', pattern: /^## 基础概念/, endPattern: /^## 数据类型/ },
    { name: 'redis-data-types', title: '数据类型', pattern: /^## 数据类型/, endPattern: /^## 持久化/ },
    { name: 'redis-persistence', title: '持久化', pattern: /^## 持久化/, endPattern: /^## 过期策略与淘汰机制/ },
    { name: 'redis-expiration', title: '过期策略与淘汰机制', pattern: /^## 过期策略与淘汰机制/, endPattern: /^## 缓存问题/ },
    { name: 'redis-cache-issues', title: '缓存问题', pattern: /^## 缓存问题/, endPattern: /^## 事务与锁/ },
    { name: 'redis-transaction-lock', title: '事务与锁', pattern: /^## 事务与锁/, endPattern: /^## 高可用/ },
    { name: 'redis-high-availability', title: '高可用', pattern: /^## 高可用/, endPattern: /^## 性能优化/ },
    { name: 'redis-performance', title: '性能优化', pattern: /^## 性能优化/, endPattern: /^## 其他特性/ },
    { name: 'redis-misc', title: '其他特性', pattern: /^## 其他特性/, endPattern: null }
  ]
};

function splitFile(topic, inputFile, outputDir) {
  console.log(`\n处理 ${topic.toUpperCase()} 文件...`);

  const content = fs.readFileSync(inputFile, 'utf-8');
  const lines = content.split('\n');
  const config = splitConfig[topic];

  config.forEach((section, index) => {
    console.log(`  提取章节: ${section.title}`);

    let startIndex = -1;
    let endIndex = lines.length;

    // 找到起始行
    for (let i = 0; i < lines.length; i++) {
      if (section.pattern.test(lines[i])) {
        startIndex = i;
        break;
      }
    }

    // 找到结束行
    if (section.endPattern) {
      for (let i = startIndex + 1; i < lines.length; i++) {
        if (section.endPattern.test(lines[i])) {
          endIndex = i;
          break;
        }
      }
    }

    if (startIndex === -1) {
      console.warn(`    警告: 未找到章节 "${section.title}"`);
      return;
    }

    // 提取内容
    const sectionContent = lines.slice(startIndex, endIndex).join('\n');

    // 写入文件
    const outputFile = path.join(outputDir, `${section.name}.md`);
    fs.writeFileSync(outputFile, sectionContent.trim() + '\n', 'utf-8');
    console.log(`    ✓ 创建文件: ${section.name}.md (${endIndex - startIndex} 行)`);
  });
}

// 执行拆分
const baseDir = path.join(__dirname, '..');
const interviewDir = path.join(baseDir, 'content/zh/interview');

Object.keys(splitConfig).forEach(topic => {
  const inputFile = path.join(interviewDir, `${topic}.md`);
  const outputDir = path.join(interviewDir, topic);

  if (!fs.existsSync(inputFile)) {
    console.warn(`跳过 ${topic}: 文件不存在`);
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  splitFile(topic, inputFile, outputDir);
});

console.log('\n✓ 所有文件拆分完成！');
