<script>
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="flex flex-row w-full items-center justify-between p-5 sm:px-12 lg:px-20 2xl:px-72 bg-gray-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
	<a href="/" class="flex">
		<img width="151px" height="40px" class="h-12 md:h-10 w-auto hidden dark:flex" src="/Pathlight_logo-light.svg" alt="Pathlight logo" />
		<img width="151px" height="40px" class="h-12 md:h-10 w-auto dark:hidden" src="/Pathlight_logo-dark.svg" alt="Pathlight logo" />
	</a>
	<div class="flex w-full justify-end">
		<nav class="flex pr-5">
			<a href="/our-guide" class="text-base font-medium text-gray-600 dark:text-gray-200 hover:text-gray-900 text-end">Our Guide</a>
		</nav>
	</div>
	<ThemeToggle />
</header>
