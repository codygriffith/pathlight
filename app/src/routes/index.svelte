<script context="module">
	export const prerender = true;
</script>

<script>
	// import { GET, POST } from '$lib/store.js';
	import { onMount } from 'svelte';
	// import process from 'process';
	import dotenv from 'dotenv';
	dotenv.config({ path: '.env' });

	const API_ENDPOINT = process.env.API_ENDPOINT;

	console.log(API_ENDPOINT);
	console.log('red');

	onMount(async () => {
		// if (!isLoggedIn) {
		// 	goto('/');
		// }

		// console.log(API_ENDPOINT);
		console.log('red');
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
