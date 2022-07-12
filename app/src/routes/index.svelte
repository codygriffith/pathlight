<script context="module">
	export const prerender = true;
</script>

<script>
	// import { GET, POST } from '$lib/store.js';
	import { onMount } from 'svelte';
	// import process from 'process';
	const API_ENDPOINT = process.env.API_ENDPOINT

	onMount(async () => {
		// if (!isLoggedIn) {
		// 	goto('/');
		// }
		const rawReports = await fetch(API_ENDPOINT, {
			method: 'GET'
		});
		const reports = await rawReports.json();
		console.log(reports);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="" />
</svelte:head>

<div class="relative overflow-hidden">Hello!</div>

<style>
</style>
