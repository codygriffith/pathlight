<script>
	// @ts-nocheck

	// export let data;
	import { page } from '$app/stores';

	console.log($page.params.slug);

	/**
	 * @type {{ post: { title: any; content: any; }; }}
	 */
	export let data;
</script>

<div class="flex flex-col w-full text-left max-w-[70rem] p-16 pt-8">
	<h1 class="text-xl">{data.title}</h1>
	<h1 class="text-base">{data.date}</h1>
	<svelte:component this={data.content} />
</div>

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
