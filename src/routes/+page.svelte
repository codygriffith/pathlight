<script>
	// @ts-ignore
	import { browser } from '$app/environment';
	/**
	 * @type {any}
	 */
	let url;
	/**
	 * @type {any}
	 */
	let audit;

	import SvelteLighthouseViewer from '$lib/svelte-lighthouse-viewer.svelte';
	// if (browser) {

	// }

	// /**
	//  * @type {string}
	//  */

	/**
	 * @type {any}
	 */
	let reportHTML;

	/**
	 * @param {string} url
	 */
	const getPageSpeed = async (url) => {
		audit = fetch(
			`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&key=AIzaSyDNNWbcCCAznBas2yn8YLg-I_sqz2ELIwQ`
		).then(async (res) => {
			let audit = await res.json();
			for (var key in audit.lighthouseResult.categories) {
				// audit.lighthouseResult.categories[key].score = Math.floor(audit.lighthouseResult.categories[key].score * 100);
				audit.lighthouseResult.categories[key].color = audit.lighthouseResult.categories[key].score * 100 > 90 ? 'green' : audit.lighthouseResult.categories[key].score * 100 > 50 ? 'orange' : 'red';
			}

			console.log(audit);

			const svelteAppElement = document.getElementById('svelte-app');

			if (svelteAppElement) {
				const app = new SvelteLighthouseViewer({
					target: svelteAppElement,
					props: {
						json: audit.lighthouseResult
					}
				});
			}

			// let report = await fetch('/report.txt');
			// reportHTML = await report.text().then(async (res) => {
			// 	return res.replace('__GET_LIGHTHOUSE_JSON__', JSON.stringify(audit.lighthouseResult));
			// });
			// // reportHTML = reportHTML.replace('__GET_LIGHTHOUSE_JSON__', JSON.stringify(audit.lighthouseResult));
			// console.log(reportHTML);

			return audit;
		});
	};
</script>

<div class="flex flex-col w-full max-w-[90rem] p-5 sm:p-16 justify-center items-center">
	<div class="flex flex-col w-full">
		<div class="flex flex-col">
			<h2 class="text-5xl font-extrabold tracking-tight sm:text-4xl text-gray-600 dark:text-white" id="newsletter-headline">Website Speed Test & Audit</h2>
			<p class="mt-4 w-full text-lg sm:text-xl leading-6">
				See how your site performs and reveal key areas for potential imporvements. Just enter your webpage's URL and you will recieve a detailed report on the page's Lighthouse scores and other Core
				Web Vitals.
			</p>
		</div>
		<div class="mt-8 w-full flex items-center">
			<form class="sm:flex w-full">
				<label for="email-address" class="sr-only">Email address</label>
				<input
					id="email-address"
					name="email-address"
					type="url"
					autocomplete="url"
					bind:value={url}
					required
					class="w-full px-5 py-3 border border-transparent placeholder-gray-500 ring-gray-400 ring-2 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white rounded-md"
					placeholder="Enter a url"
				/>
				<div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
					<button
						on:click|preventDefault|once={() => getPageSpeed(url)}
						type="submit"
						class="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
					>
						Start Audit
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- {#if audit}
	{#await audit}
		<div class="flex justify-evenly items-center w-3/4">
			<div class="block text-center">
				<p class="text-xl mb-4">Performance</p>
				<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
					<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
						<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
						<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
					</svg>
					<p class="absolute rotate-90 text-black text-xl text-center">--</p>
				</div>
			</div>
			<div class="block text-center">
				<p class="text-xl mb-4">Accessibility</p>
				<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
					<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
						<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
						<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
					</svg>
					<p class="absolute rotate-90 text-black text-xl text-center">--</p>
				</div>
			</div>
			<div class="block text-center">
				<p class="text-xl mb-4">Best Practices</p>
				<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
					<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
						<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
						<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
					</svg>
					<p class="absolute rotate-90 text-black text-xl text-center">--</p>
				</div>
			</div>
			<div class="block text-center">
				<p class="text-xl mb-4">SEO</p>
				<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
					<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
						<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
						<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
					</svg>
					<p class="absolute rotate-90 text-black text-xl text-center">--</p>
				</div>
			</div>
		</div>
	{:then audit}
		{#if audit.lighthouseResult.categories}
			<div class="flex justify-evenly items-center w-3/4">
				{#each Object.values(audit.lighthouseResult.categories) as category}
					{#if category.title !== 'PWA'}
						<div class="block text-center">
							<p class="text-xl mb-4">{category.title}</p>
							<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
								<svg class="lh-gauge fill-{category.color}-100" height="10%" viewBox="0 0 50 50">
									<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
									<circle
										class="lh-gauge-arc stroke-{category.color}-600"
										r="45%"
										cx="50%"
										cy="50%"
										stroke-width="4"
										stroke-linecap="round"
										pathLength="360"
										style="stroke-dasharray: {category.score * 100 * 3.6}, 9999;"
									/>
								</svg>
								<p class="absolute rotate-90 text-black text-xl text-center">{category.score * 100}</p>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	{/await}
{:else} 
	<div class="flex justify-evenly items-center w-3/4">
		<div class="block text-center">
			<p class="text-xl mb-4">Performance</p>
			<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
				<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
					<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
					<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
				</svg>
				<p class="absolute rotate-90 text-black text-xl text-center">--</p>
			</div>
		</div>
		<div class="block text-center">
			<p class="text-xl mb-4">Accessibility</p>
			<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
				<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
					<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
					<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
				</svg>
				<p class="absolute rotate-90 text-black text-xl text-center">--</p>
			</div>
		</div>
		<div class="block text-center">
			<p class="text-xl mb-4">Best Practices</p>
			<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
				<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
					<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
					<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
				</svg>
				<p class="absolute rotate-90 text-black text-xl text-center">--</p>
			</div>
		</div>
		<div class="block text-center">
			<p class="text-xl mb-4">SEO</p>
			<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
				<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
					<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
					<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
				</svg>
				<p class="absolute rotate-90 text-black text-xl text-center">--</p>
			</div>
		</div>
	</div>
{/if} -->

<div id="svelte-app" class="w-full max-w-[90rem]" />

<style>
	.lh-gauge-arc {
		animation: load-gauge 1s ease forwards;
	}

	.stroke-red-600 {
		stroke: #dc2626;
	}

	.stroke-green-600 {
		stroke: #16a34a;
	}

	.stroke-orange-600 {
		stroke: #ea580c;
	}

	.fill-red-100 {
		fill: rgb(254 226 226);
	}

	.fill-green-100 {
		fill: rgb(220 252 231);
	}

	.fill-orange-100 {
		fill: rgb(255 237 213);
	}

	@keyframes load-gauge {
		from {
			stroke-dasharray: 0 352;
		}
	}

	:global(.lh-topbar, .lh-sticky-header) {
		display: none !important;
	}

	/* , .lh-header-container */

	:global(.lh-root, .lh-categories .lh-gauge__wrapper--pass, .lh-gauge__wrapper--pass, .lh-gauge__label, .lh-audit-group__header, .lh-audit-group__summary) {
		background: unset !important;
		color: unset !important;
		font-family: unset !important;
	}

	:global(.lh-header-container .lh-scores-wrapper) {
		border-bottom: 1px solid gray !important;
		width: 90%;
		margin: auto;
	}

	:global(.lh-dark .lh-header-container .lh-scores-wrapper) {
		border-bottom: 1px solid white !important;
		width: 90%;
		margin: auto;
	}

	:global(.lh-dark .lh-header-container .lh-scores-wrapper) {
		border-bottom: 1px solid white;
		width: 90%;
		margin: auto;
	}

	:global(.lh-audit) {
		/* border-top: 1px solid gray !important; */
		border-bottom: 1px solid gray !important;
	}

	:global(details.lh-clump > summary) {
		/* border-top: 1px solid gray !important; */
		border-bottom: 1px solid gray !important;
		/* border-top: 1px solid gray !important; */
	}

	:global(.lh-metric) {
		border-top: 1px solid gray !important;
	}

	:global(.lh-button) {
		border: 1px solid gray !important;
		background-color: unset !important;
	}

	:global(.lh-dark .lh-button) {
		border: 1px solid gray !important;
		background-color: rgb(36, 36, 36) !important;
	}

	:global(.lh-clump .lh-audit-group__header) {
		/* border-top: 1px solid gray !important; */
		border-bottom: none !important;
	}

	:global(.lh-dark .lh-audit) {
		border-top: 1px solid gray;
	}

	:global(.lh-table) {
		border: unset;
	}

	/* :global(.lh-dark) {

	} */

	:global(.lh-dark) {
		--color-gray-700: var(--color-gray-300) !important;
		--color-gray-600: var(--color-gray-700) !important;
		--link-color: rgb(95, 95, 204) !important;
	}

	:global(.lh-scores-header .lh-gauge__wrapper) {
		--gauge-wrapper-width: 15% !important;
	}

	:global(.dark .lh-dark) {
		--color-gray-200: var(--color-gray-800);
		--color-gray-300: #616161;
		--color-gray-400: var(--color-gray-600);
		--color-gray-700: white !important;
		--color-gray-50: #757575;
		--color-gray-600: white !important;
		--color-green-700: var(--color-green) !important;
		--color-orange-700: var(--color-orange);
		--color-red-700: var(--color-red);
		--color-teal-600: var(--color-cyan-500);
		--color-hover: rgba(0, 0, 0, 0.2);
		--color-informative: var(--color-blue-200);
		--env-item-background-color: #393535;
		--link-color: var(--color-blue-200);
		--locale-selector-background-color: var(--color-gray-200);
		--plugin-badge-background-color: var(--color-gray-800);
		--report-background-color: var(--color-gray-900);
		--report-border-color-secondary: var(--color-gray-200);
		--report-text-color-secondary: var(--color-gray-400);
		--report-text-color: var(--color-gray-100);
		--snippet-color: var(--color-cyan-500);
		--topbar-background-color: var(--color-gray);
		--toplevel-warning-background-color: hsl(33deg 14% 18%);
		--toplevel-warning-message-text-color: var(--color-orange-700);
		--toplevel-warning-text-color: var(--color-gray-100);
		--plugin-icon-url: var(--plugin-icon-url-dark);
		--pwa-installable-gray-url: var(--pwa-installable-gray-url-dark);
		--pwa-optimized-gray-url: var(--pwa-optimized-gray-url-dark);
	}

	/* .lh-category {
    	padding: var(--category-padding);
    	max-width: var(--report-content-max-width);
	} */

	:global(.lh-category) {
		--category-padding: 2.5%;
		--report-content-max-width: 95%;
	}

	:global(.lh-category-header__description) {
		--category-padding: 2.5%;
		--report-content-max-width: 95%;
		font-size: 1.35vw;
	}

	:global(.lh-scores-header) {
		/* justify-content: center; */
		/* padding: 0 6%; */
	}
</style>
