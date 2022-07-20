import { sveltekit } from '@sveltejs/kit/vite';
/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    // netlify dev requires port 3000
    server: {
        port: 3000,
      }
};
export default config;