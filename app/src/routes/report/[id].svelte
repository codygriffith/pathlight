<script context="module">
	export const prerender = true;
</script>

<script>
   import { page } from '$app/stores';
	import { GET, POST } from '$lib/store.js';
	import { onMount } from 'svelte';
   console.log($page.params.id)

	console.log('red');

	onMount(async () => {
		const response = await GET(`/viewReport?id=${$page.params.id}`);
    	console.log(response)
		console.log(document.getElementsByTagName("html")[0].innerHTML)
		document.getElementsByTagName("html")[0].innerHTML = response
	//   console.log('green')
      // window.__LIGHTHOUSE_JSON__ = response.rawJson;
		// if (!isLoggedIn) {
		// 	goto('/');
		// }
      
      
   });
   
</script>

<svelte:head>
	<title>Report</title>
	<meta name="description" content="" />
</svelte:head>
