import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

console.log({ production });

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs'
		}),
		paths: {
			// change below to your repo name
			// assets: process.env.NODE_ENV !== 'production' ? '' : '/autobase-kit',
			base: process.env.NODE_ENV !== 'production' ? '' : '/autobase-kit'
		},
		vite: {
			define: {
				'process.env': process.env
			}
		}
	}
};

export default config;
