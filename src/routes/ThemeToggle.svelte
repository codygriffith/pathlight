<script>
	// @ts-nocheck

	import { browser } from '$app/environment';

	const applyTheme = () => {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
			console.log('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	if (browser) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
			applyTheme();
		});
		applyTheme();
	}

	const toggleTheme = () => {
		if (!('theme' in localStorage) || localStorage.theme === 'light') {
			localStorage.theme = 'dark';
		} else if (localStorage.theme === 'dark') {
			localStorage.theme = 'light';
		}
		// else {
		// 	localStorage.removeItem('theme');
		// }

		applyTheme();
	};
</script>

<button class="theme-toggle w-8" id="theme-toggle" title="Toggles light &amp; dark" aria-label="dark" aria-live="polite" on:click={toggleTheme}>
	<svg class="sun-and-moon flex " aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
		<mask class="moon" id="moon-mask">
			<rect x="0" y="0" width="100%" height="100%" fill="white" />
			<circle class="-translate-x-2 dark:translate-x-0" cx="24" cy="10" r="6" fill="black" />
		</mask>
		<circle class="sun scale-[1.75] dark:scale-[1] dark:text-yellow-200" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
		<g class="sun-beams opacity-0 stroke-2 dark:opacity-100 dark:text-yellow-200 dark:fill-white" stroke="currentColor">
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</g>
	</svg>
</button>

<style>
	@import 'https://unpkg.com/open-props/easings.min.css';

	.theme-toggle > svg {
		stroke-linecap: round;
	}

	.sun-and-moon > :is(.moon, .sun, .sun-beams) {
		transform-origin: center center;
	}

	@-webkit-keyframes octocat-wave {
		0%,
		to {
			transform: rotate(0);
		}
		20%,
		60% {
			transform: rotate(-25deg);
		}
		40%,
		80% {
			transform: rotate(10deg);
		}
	}

	@keyframes octocat-wave {
		0%,
		to {
			transform: rotate(0);
		}
		20%,
		60% {
			transform: rotate(-25deg);
		}
		40%,
		80% {
			transform: rotate(10deg);
		}
	}
</style>
