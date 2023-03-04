import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({
		extensions: ['.md']
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
