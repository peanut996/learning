#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 定义拆分配置
const splitConfig = {
  mysql: [
    { name: 'mysql-basics', title: '基础概念', pattern: /^## 基础概念/, endPattern: /^## 索引/ },
    { name: 'mysql-index', title: '索引', pattern: /^## 索引/, endPattern: /^## 事务/ },
    { name: 'mysql-transaction', title: '事务', pattern: /^## 事务/, endPattern: /^## 锁/ },
    { name: 'mysql-lock', title: '锁', pattern: /^## 锁/, endPattern: /^## SQL 优化/ },
    { name: 'mysql-optimization', title: 'SQL 优化', pattern: /^## SQL 优化/, endPattern: /^## 日志/ },
    { name: 'mysql-log', title: '日志', pattern: /^## 日志/, endPattern: /^## 高可用与性能/ },
    { name: 'mysql-high-availability', title: '高可用与性能', pattern: /^## 高可用与性能/, endPattern: /^## 其他/ },
    { name: 'mysql-misc', title: '其他', pattern: /^## 其他/, endPattern: null }
  ],
  'java-basics': [
    { name: 'java-data-types', title: '数据类型', pattern: /^## 数据类型/, endPattern: /^## 字符串/ },
    { name: 'java-string', title: '字符串', pattern: /^## 字符串/, endPattern: /^## 面向对象/ },
    { name: 'java-oop', title: '面向对象', pattern: /^## 面向对象/, endPattern: /^## 访问修饰符/ },
    { name: 'java-access-modifiers', title: '访问修饰符', pattern: /^## 访问修饰符/, endPattern: /^## 关键字/ },
    { name: 'java-keywords', title: '关键字', pattern: /^## 关键字/, endPattern: /^## 异常处理/ },
    { name: 'java-exception', title: '异常处理', pattern: /^## 异常处理/, endPattern: /^## 对象和类/ },
    { name: 'java-object-class', title: '对象和类', pattern: /^## 对象和类/, endPattern: /^## 反射/ },
    { name: 'java-reflection', title: '反射', pattern: /^## 反射/, endPattern: /^## 泛型/ },
    { name: 'java-generics', title: '泛型', pattern: /^## 泛型/, endPattern: /^## 注解/ },
    { name: 'java-annotation', title: '注解', pattern: /^## 注解/, endPattern: /^## 枚举/ },
    { name: 'java-enum', title: '枚举', pattern: /^## 枚举/, endPattern: /^## I\/O 流/ },
    { name: 'java-io', title: 'I/O 流', pattern: /^## I\/O 流/, endPattern: /^## 其他/ },
    { name: 'java-misc', title: '其他', pattern: /^## 其他/, endPattern: null }
  ],
  'java-concurrency': [
    { name: 'concurrency-basics', title: '并发基础', pattern: /^## 并发基础/, endPattern: /^## synchronized/ },
    { name: 'concurrency-synchronized', title: 'synchronized', pattern: /^## synchronized/, endPattern: /^## volatile/ },
    { name: 'concurrency-volatile', title: 'volatile', pattern: /^## volatile/, endPattern: /^## CAS/ },
    { name: 'concurrency-cas', title: 'CAS', pattern: /^## CAS/, endPattern: /^## 锁/ },
    { name: 'concurrency-lock', title: '锁', pattern: /^## 锁/, endPattern: /^## AQS/ },
    { name: 'concurrency-aqs', title: 'AQS', pattern: /^## AQS/, endPattern: null }
  ],
  'design-patterns': [
    { name: 'patterns-basics', title: '设计模式基础', pattern: /^## 设计模式基础/, endPattern: /^## 创建型模式/ },
    { name: 'patterns-creational', title: '创建型模式', pattern: /^## 创建型模式/, endPattern: /^## 结构型模式/ },
    { name: 'patterns-structural', title: '结构型模式', pattern: /^## 结构型模式/, endPattern: /^## 行为型模式/ },
    { name: 'patterns-behavioral', title: '行为型模式', pattern: /^## 行为型模式/, endPattern: /^## 综合问题/ },
    { name: 'patterns-misc', title: '综合问题', pattern: /^## 综合问题/, endPattern: null }
  ],
  jmm: [
    { name: 'jmm-basics', title: 'JMM 基础', pattern: /^## JMM 基础/, endPattern: /^## 可见性/ },
    { name: 'jmm-visibility', title: '可见性', pattern: /^## 可见性/, endPattern: /^## 原子性/ },
    { name: 'jmm-atomicity', title: '原子性', pattern: /^## 原子性/, endPattern: /^## 有序性/ },
    { name: 'jmm-ordering', title: '有序性', pattern: /^## 有序性/, endPattern: /^## 内存屏障/ },
    { name: 'jmm-memory-barrier', title: '内存屏障', pattern: /^## 内存屏障/, endPattern: /^## 单例模式/ },
    { name: 'jmm-singleton', title: '单例模式', pattern: /^## 单例模式/, endPattern: /^## 对象创建/ },
    { name: 'jmm-object-creation', title: '对象创建', pattern: /^## 对象创建/, endPattern: /^## 其他问题/ },
    { name: 'jmm-misc', title: '其他问题', pattern: /^## 其他问题/, endPattern: null }
  ],
  'java-multithreading': [
    { name: 'multithreading-basics', title: '多线程基础', pattern: /^## 多线程基础/, endPattern: /^## 线程池/ },
    { name: 'multithreading-threadpool', title: '线程池', pattern: /^## 线程池/, endPattern: /^## Future 和 CompletableFuture/ },
    { name: 'multithreading-future', title: 'Future 和 CompletableFuture', pattern: /^## Future 和 CompletableFuture/, endPattern: /^## 其他问题/ },
    { name: 'multithreading-misc', title: '其他问题', pattern: /^## 其他问题/, endPattern: null }
  ],
  'java-collections': [
    { name: 'collections-list', title: 'List', pattern: /^## List/, endPattern: /^## Set/ },
    { name: 'collections-set', title: 'Set', pattern: /^## Set/, endPattern: /^## Map/ },
    { name: 'collections-map', title: 'Map', pattern: /^## Map/, endPattern: /^## Queue/ },
    { name: 'collections-queue', title: 'Queue', pattern: /^## Queue/, endPattern: /^## 其他问题/ },
    { name: 'collections-misc', title: '其他问题', pattern: /^## 其他问题/, endPattern: null }
  ],
  jvm: [
    { name: 'jvm-memory', title: 'JVM 内存结构', pattern: /^## JVM 内存结构/, endPattern: /^## 垃圾回收/ },
    { name: 'jvm-gc', title: '垃圾回收', pattern: /^## 垃圾回收/, endPattern: /^## 垃圾回收算法/ },
    { name: 'jvm-gc-algorithm', title: '垃圾回收算法', pattern: /^## 垃圾回收算法/, endPattern: /^## 垃圾回收器/ },
    { name: 'jvm-gc-collector', title: '垃圾回收器', pattern: /^## 垃圾回收器/, endPattern: /^## 类加载/ },
    { name: 'jvm-classloader', title: '类加载', pattern: /^## 类加载/, endPattern: /^## 性能调优/ },
    { name: 'jvm-tuning', title: '性能调优', pattern: /^## 性能调优/, endPattern: null }
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
