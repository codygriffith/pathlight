import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex'
import rehypeSlug from 'rehype-slug'
import rehypeSectionize from '@hbsnow/rehype-sectionize';
import toc from '@jsdevtools/rehype-toc'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: [vitePreprocess(), mdsvex({
		extensions: ['.md'],
		rehypePlugins: [rehypeSlug, rehypeSectionize, toc],
	})],
	extensions: ['.svelte', '.md'],
};

export default config;
