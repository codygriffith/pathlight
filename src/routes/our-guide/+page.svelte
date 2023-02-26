<script>
	// @ts-nocheck
	export let data;
</script>

<svelte:head>
	<title>Pathlight Guide to Acing Your Web Audits</title>
</svelte:head>

<div class="flex flex-col w-full max-w-[70rem] p-5 sm:p-16 justify-center items-center">
	<div class="flex flex-col">
		<h2 class="text-5xl font-extrabold tracking-tight sm:text-4xl text-gray-600 dark:text-white" id="newsletter-headline">Our Guide to Acing Your Web Audits</h2>
		<p class="mt-4 w-full text-lg sm:text-xl leading-6">
			See how your site performs and reveal key areas for potential imporvements. Just enter your webpage's URL and you will recieve a detailed report on the page's Lighthouse scores and other Core
			Web Vitals.
		</p>
	</div>
	<div class="relative sm:pb-12 mt-16">
		{#each data.allPosts as post}
			<article class="w-full flex flex-col sm:flex-row">
				<div class="mr-14 sm:mt-1 ml-10 sm:ml-0 text-sm">
					<time class="text-slate-700 dark:text-slate-100">{post.meta.date}</time>
				</div>
				<div class="border-l -mt-5 sm:mt-0 border-slate-500 dark:border-white w-full">
					<svg viewBox="0 0 9 9" class="-ml-[.35rem] right-full mr-6 top-2 -mb-36 text-slate-300 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block">
						<circle cx="4.5" cy="4.5" r="4.5" stroke="currentColor" class="dark:fill-white fill-slate-600" stroke-width="2" />
					</svg>
					<div class="relative hover:bg-slate-400/20 dark:hover:bg-slate-800/40 rounded-2xl pl-6 ml-4 sm:ml-8 p-6 my-14 w-full mt-36 sm:mt-28 mb-6">
						<div class="font-semibold mb-2">{post.meta.title}</div>
						<p>
							{post.meta.summary}
						</p>
						<a class="flex items-center text-sm text-sky-500 font-medium mt-4" href="/our-guide/understanding-the-different-metrics-in-lighthouse">
							<span class="absolute inset-0 sm:rounded-2xl" />
							Read more

							<svg
								class="relative mt-px overflow-visible ml-2.5 text-sky-300 dark:text-sky-700"
								width="3"
								height="6"
								viewBox="0 0 3 6"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="M0 0L3 3L0 6" /></svg
							>
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>
	<div class="w-full h-16 -mt-7 md:-mt-16 z-50 bg-white dark:bg-gray-700" />
</div>
