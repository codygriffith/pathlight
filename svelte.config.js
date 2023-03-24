import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex'
import rehypeSlug from 'rehype-slug'
import rehypeSectionize from '@hbsnow/rehype-sectionize';
import toc from '@jsdevtools/rehype-toc'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({
		extensions: ['.md'],
		rehypePlugins: [rehypeSlug, rehypeSectionize,  toc],
	})],
	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter(),
		// csp: {
		// 	mode: "auto",
		// 	directives: { "script-src": ["self"] },
		// },
		inlineStyleThreshold: 30288,
	}
};

export default config;
