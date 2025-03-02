// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkDirective from "remark-directive"; /* Handle directives */
import { remarkNote, addClassNames } from './src/plugins/markdown.formate'
import swup from '@swup/astro';
// https://astro.build/config
export default defineConfig({
	site: 'https://www.vvhan.com',
	integrations: [
		swup({
			theme: false,
			animationClass: "vh-animation-",
			containers: [".vh-animation"],
			smoothScrolling: true,
			progress: true,
			cache: true,
			preload: true,
			accessibility: true,
			updateHead: true,
			updateBodyClass: false,
			globalInstance: true
		}),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
			// 处理末尾带 / 的 url
			serialize: (item) => ({ ...item, url: item.url.endsWith('/') ? item.url.slice(0, -1) : item.url })
		}),
		mdx()],
	markdown: {
		rehypePlugins: [addClassNames],
		remarkPlugins: [remarkDirective, remarkNote],
		syntaxHighlight: 'shiki',
		shikiConfig: { theme: 'github-light' },
	},
	server: { host: '0.0.0.0' }
});
