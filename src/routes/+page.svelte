<script>
	import SvelteLighthouseViewer from "$lib/svelte-lighthouse-viewer.svelte";

	export let data;

	let url;
	let audit;
	let reportJson;
	let auditing;

	const getPageSpeed = async (url) => {
		auditing = true;
		audit = fetch(
			`https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&key=AIzaSyBae-cofkMp_oVZsi4SuMIT2W2mGwmSBtY`,
		).then(async (res) => {
			let audit = await res.json();
			reportJson = audit.lighthouseResult;
			auditing = false;
			return audit;
		});
	};
</script>

<svelte:head>
	<title>Website Speed Test &amp; Audit - Pathlight</title>
	<meta
		name="description"
		content="See how your site performs and reveal key areas for potential imporvements. Just enter your webpage's URL and you will recieve a detailed report on the page's Lighthouse scores and other Core Web Vitals."
	/>
</svelte:head>

<div
	class="flex flex-col w-full p-5 sm:px-12 lg:px-20 2xl:px-72 pt-16 justify-center items-center"
>
	<div class="flex flex-col w-full">
		<div class="flex flex-col">
			<h2
				class="text-5xl font-extrabold tracking-tight sm:text-4xl text-gray-600 dark:text-white"
				id="newsletter-headline"
			>
				Website Speed Test & Audit
			</h2>
			<p class="mt-4 w-full text-lg sm:text-xl leading-6">
				See how your site performs and reveal key areas for potential
				imporvements. Just enter your webpage's URL and you will recieve
				a detailed report on the page's Lighthouse scores and other Core
				Web Vitals.
			</p>
		</div>
		<div class="mt-8 w-full flex items-center">
			<form class="sm:flex w-full">
				<label for="url" class="sr-only">URL</label>
				<input
					id="url"
					name="url"
					type="url"
					autocomplete="url"
					bind:value={url}
					required
					class="w-full px-5 py-3 border border-transparent placeholder-gray-500 ring-gray-400 ring-2 text-black focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white rounded-md"
					placeholder="Enter a url"
				/>
				<div
					class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0"
				>
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

{#if auditing}
	<div role="status">
		<svg
			aria-hidden="true"
			class="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 m-4"
			viewBox="0 0 100 101"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor"
			/>
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="currentFill"
			/>
		</svg>
		<span class="sr-only">Loading...</span>
	</div>
{:else if reportJson}
	<SvelteLighthouseViewer {reportJson} />
{/if}

<div id="svelte-app" class="w-full max-w-[90rem]" />

<style>
	@keyframes load-gauge {
		from {
			stroke-dasharray: 0 352;
		}
	}

	:global(.lh-topbar, .lh-sticky-header) {
		display: none !important;
	}

	/* , .lh-header-container */

	:global(
			.lh-root,
			.lh-categories .lh-gauge__wrapper--pass,
			.lh-gauge__wrapper--pass,
			.lh-gauge__label,
			.lh-audit-group__header,
			.lh-audit-group__summary
		) {
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
