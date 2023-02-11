<script>
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<div class="static top-0 bg-gray-200 dark:bg-slate-800 w-full">
	<div class="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
		<a href="#" class="flex">
			<img class="h-8 w-auto sm:h-10 hidden dark:flex" src="/Pathlight_logo-light.svg" alt="" />
			<img class="h-8 w-auto sm:h-10 dark:hidden" src="/Pathlight_logo-dark.svg" alt="" />
		</a>
		<div class="flex w-full justify-end">
			<nav class="flex space-x-10">
				<a href="#" class="text-base font-medium text-gray-500 dark:text-gray-200 hover:text-gray-900 text-end"> About </a>
			</nav>
		</div>
		<ThemeToggle />
	</div>
</div>
