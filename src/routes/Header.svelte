<script>
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<div class="static top-0 bg-gray-200 dark:bg-slate-800 w-full">
	<div class="flex justify-between items-center w-full max-w-[90rem] m-auto p-5 sm:px-16">
		<a href="/" class="flex">
			<img class="h-10 w-auto hidden dark:flex" src="/Pathlight_logo-light.svg" alt="Pathlight logo" />
			<img class="h-10 w-auto dark:hidden" src="/Pathlight_logo-dark.svg" alt="Pathlight logo" />
		</a>
		<div class="flex w-full justify-end">
			<nav class="flex px-8">
				<a href="/our-guide" class="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-200 hover:text-gray-900 text-end"> Our Guide </a>
			</nav>
		</div>
		<ThemeToggle />
	</div>
</div>
