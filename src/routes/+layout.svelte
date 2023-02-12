<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="flex flex-col min-h-full items-center dark:text-white dark:bg-gray-700">
	<Header />
	<div class="flex flex-col h-full w-full items-center">
		<slot />
	</div>
</div>
