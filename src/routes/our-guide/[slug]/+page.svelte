<script>
	// @ts-nocheck
	/**
	 * @type {{ post: { title: any; content: any; }; }}
	 */
	export let data;
</script>

<div id="article" class="flex flex-col w-full text-left max-w-[60rem] p-16 pt-8 mt-16 relative">
	<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-4xl">{data.title}</h1>
	<div class="mb-12">
		<dl>
			<dt class="sr-only">Date</dt>
			<dd class="absolute pl-16 top-0 inset-x-0 text-slate-700 dark:text-slate-300"><time datetime="2022-12-15T15:00:00.000Z">{data.dateString}</time></dd>
		</dl>
	</div>
	<svelte:component this={data.content} />
</div>

<style>
	:global(#article h1) {
		margin: 1% 0 !important;
		font-size: 2.25rem !important;
	}
	:global(#article h2) {
		font-size: 2rem !important;
		font-weight: 700 !important;
		margin-top: 6% !important;
	}
	:global(#article h3) {
		margin: 1% 0 !important;
		font-size: 1.5rem !important;
		font-weight: 500 !important;
		margin-top: 4% !important;
	}
	:global(#article p) {
		margin: 1% 0 !important;
		font-size: 1.1rem !important;
		line-height: 1.7rem !important;
	}
	:global(#article li) {
		margin: 1% 0 !important;
		margin-left: 6% !important;
		list-style: disc !important;
	}
</style>
