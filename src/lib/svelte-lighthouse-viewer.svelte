<script>
	import { onMount } from "svelte";
	import { renderReport } from "./lighthouse-viewer.es.js";

	export let reportJson = {};

	let container;

	onMount(() => {
		const renderedReport = renderReport(reportJson, {});
		container.appendChild(renderedReport);
	});
</script>

<div bind:this={container} />
