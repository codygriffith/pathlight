<script>
	// @ts-nocheck
	export let data;
</script>

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
			<article class="w-full flex">
				<div class="mr-14 mt-1">
					<time class="">{post.meta.date}</time>
				</div>
				<div class="border-l border-slate-500 dark:border-white w-full">
					<svg viewBox="0 0 9 9" class="-ml-[.35rem] right-full mr-6 top-2 -mb-36 text-slate-300 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block">
						<circle cx="4.5" cy="4.5" r="4.5" stroke="currentColor" class="dark:fill-white fill-slate-600" stroke-width="2" />
					</svg>
					<div class="relative hover:bg-slate-800/40 rounded-2xl pl-6 ml-8 p-6 my-14 w-full mt-28 mb-6">
						<div class="font-semibold">{post.meta.title}</div>
						<p>
							{post.meta.summary}
						</p>
						<a class="flex items-center text-sm text-sky-500 font-medium" href="/our-guide/understanding-the-different-metrics-in-lighthouse">
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
		<div class="w-full h-16 -mt-6 z-50 absolute bg-white" />
	</div>
</div>
