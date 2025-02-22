
import path from 'path';
import dayjs from 'dayjs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 获取命令行参数
const articleName = process.argv.slice(2).join('');
const articleID = crypto.createHash('md5').update(String(dayjs().valueOf())).digest('hex');
if (!articleName) {
  console.error('请提供文章名称，例如：pnpm newpost "第一篇文章"');
  process.exit(1);
}
const ArticleContent = `---
title: ${articleName}
categories: 分类
tags:
  - 标签
id: "${articleID.slice(0, 16)}"
date: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}
cover: "封面图URL (为空默认随机内置封面 /public/assets/images/banner)"
---

:::note
文章描述
:::

### 标题1

::btn[按钮]{link="链接" type="info"}`;
const init = async () => {
  // 写文件
  const now = dayjs();
  const targetDir = path.join(__dirname, '../src/content/blog', `${now.year()}/${now.format('MM')}`);
  await fs.mkdir(path.dirname(targetDir), { recursive: true });
  await fs.writeFile(path.join(targetDir, `${articleName}.md`), ArticleContent, 'utf8');
  console.log(`文章 ${articleName} 已创建`);
}
init();