// src/plugins/remark-note.js
import { visit } from 'unist-util-visit';
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

// 处理函数
const nodeTreeFmt = (node: any, parent: any) => {
  if (node.type === 'text') parent.children = node.value.split('\n').map((i: string) => ({ type: 'paragraph', children: [{ type: 'text', value: i }] }));
  if (node.children && node.children.length) node.children.forEach((child: any) => nodeTreeFmt(child, node));
}

// 处理标签
const remarkNote = () => {
  return (tree: any, { data: astroData }: any) => {
    visit(tree, (node, index, parent) => {
      const { type, name, attributes } = node;
      // 处理组件
      if (type == 'textDirective' || type == 'leafDirective' || type == 'containerDirective') {
        // 设置 HTML 标签和 class
        const data = node.data || (node.data = {});
        const hProperties = data.hProperties || (data.hProperties = {});
        // 根据指令类型设置标签
        data.hName = name == 'btn' ? 'a' : 'section';
        // 这是 a 标签
        attributes.link && (hProperties.href = attributes.link);
        // 校验相册元素
        if (name == 'picture') {
          node.children = node.children.flatMap((child: any) => (child.type === 'paragraph' ? child.children : child));
        }
        // 处理 video 组件
        if (name.startsWith('vh')) {
          Object.keys(node.attributes).forEach((i: any) => (hProperties[`data-${i}`] = node.attributes[i]));
        }
        // 处理 note 内容换行问题
        if (name == 'note') {
          nodeTreeFmt(node, parent);
        };
        // 设置 class
        hProperties.class = `vh-node vh-${name}${attributes.type ? ` ${name}-${attributes.type}` : ''}`;
        // 文章字数统计
        const textOnPage = toString(tree);
        const readingTime = getReadingTime(textOnPage);
        astroData.astro.frontmatter.reading_time = readingTime.minutes
        astroData.astro.frontmatter.article_word_count = readingTime.words
      }
    });
  };
}


// Pre中的 Copy 按钮
const addClassNames = () => {
  return (tree: any) => {
    visit(tree, (node, index, parent) => {
      // 处理 a 标签
      if (node.tagName === 'a') {
        node.properties.target = '_blank', node.properties.rel = 'noopener nofollow'
        node.children = [{ type: 'element', tagName: 'span', children: node.children || [] }];
      }
      // 处理代码快
      if (node.tagName === 'pre') {
        const divNode = { type: 'element', tagName: 'section', properties: { class: 'vh-code-box' }, children: [{ type: 'element', tagName: 'span', properties: { class: 'vh-code-copy' } }, node] };
        // 替换父节点的 children 中的 pre 节点为新的 div 节点
        if (parent && index !== null) parent.children.splice(index, 1, divNode);
      }
      // 处理图片 
      if (node.tagName === 'img') {
        // 添加 class 和 loading 属性
        node.properties.class = 'vh-article-img';
        node.properties['data-vh-lz-src'] = node.properties.src;
        node.properties.src = '/assets/images/lazy-loading.webp';
      }
    });

  };
}

export { remarkNote, addClassNames } 