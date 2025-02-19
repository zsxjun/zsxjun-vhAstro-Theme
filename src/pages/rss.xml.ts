import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getDescription } from '../utils/index'
import SITE_CONFIG from '../config';
const { Title, Description } = SITE_CONFIG;


export async function GET(context: any) {
	const posts = await getCollection('blog');
	return rss({
		title: Title,
		description: Description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.updated || post.data.date,
			description: getDescription(post),
			link: `/article/${post.data.id}`
		})).reverse(),
	});
}
