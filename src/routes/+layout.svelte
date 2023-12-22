<script>
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="flex flex-col w-full min-h-full justify-between items-center dark:text-white dark:bg-gray-700">
	<div class="w-full">
		<Header />
		<div class="flex flex-col w-full items-center">
			<slot />
		</div>
	</div>
	<Footer />
</div>
