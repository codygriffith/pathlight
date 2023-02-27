<script lang="ts">
	import { SchemaTag } from '$lib/schema';
	import { websiteSchema } from '$lib/schema';
</script>

<svelte:head>
	<title>About Pathlight</title>
	<meta name="description" content="Pathlight is an online tool that helps website owners optimize their website's performance by providing a comprehensive analysis of their Lighthouse scores and actionable insights for improvement.">
	<SchemaTag schema={websiteSchema} />
</svelte:head>

<div class="max-w-[65rem] w-full break-words mb-16 px-6">
	<h1 class="text-center font-semibold text-4xl md:text-5xl mt-10 mb-4">About</h1>
	<p class="text-center text-base md:text-lg mb-2">
		Pathlight is an online tool that helps website owners optimize their website's performance by providing a comprehensive analysis of their Lighthouse scores and actionable insights for improvement.
	</p>
	<div class="flex mt-14 flex-col md:flex-row justify-between">
		<div class="w-full md:w-[45%]">
			<h1 class="text-2xl font-semibold">Usage</h1>
			<p class="mt-4">
				With Pathlight, you can easily and quickly measure your website's Lighthouse score through a user-friendly interface. Simply enter your website's URL, and our tool will generate a
				comprehensive report on your website's performance metrics.
			</p>
			<p class="mt-4">Our tool is designed to provide website owners with a simple and effective way to optimize their website's performance with data-driven decisions.</p>
		</div>
		<div class="w-full md:w-[45%] mt-14 md:mt-0">
			<h1 class="text-2xl font-semibold">A Mission</h1>
			<p class="mt-4">
				At Pathlight, we are committed to making the internet a faster, more accessible, and more user-friendly place by providing website owners with the tools they need to optimize their website's
				performance.
			</p>
			<p class="mt-4">If you have any questions or comments about our platform, we would love to hear from you. Please don't hesitate to contact us at help@pathlight.dev.</p>
		</div>
	</div>
	<ul class="mt-14 md:mt-8">
		<h1 class="text-2xl font-semibold mb-4">Features</h1>
		<li class="ml-6 mt-3">Lighthouse Score Analysis: Pathlight provides a detailed analysis of your website's Lighthouse scores, including metrics such as page load speed, accessibility, and SEO.</li>
		<li class="ml-6 mt-3">User-friendly Interface: Pathlight's user-friendly interface makes it easy for website owners to test their website's performance and generate a comprehensive report.</li>
		<li class="ml-6 mt-3">
			Actionable Insights: Pathlight's report provides actionable insights into your website's performance, highlighting areas that require optimization and providing you with recommendations to
			improve your website's speed, functionality, and overall user experience.
		</li>
	</ul>
</div>

<style>
	li {
		list-style: disc;
	}
</style>
