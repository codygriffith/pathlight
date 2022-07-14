<script context="module">
	export const prerender = true;
</script>

<script>
	import { GET, POST } from '$lib/store.js';
	import { onMount } from 'svelte';
	let response = { reports: [{}] };
	let reports;
	let url;
	// import process from 'process';
	// import dotenv from 'dotenv';
	// dotenv.config({ path: '.env' });

	// const API_ENDPOINT = process.env.API_ENDPOINT;

	// console.log(API_ENDPOINT);

	async function requestAudit() {
		// let res = await fetch(`https://sqs.us-east-1.amazonaws.com/054477282436/pathlight-MySqsQueue-7Av0SPeLhEXe/?Action=SendMessage&MessageBody=${url}`);
		let res  = await POST('/audit', url);
		console.log(res)
		url = '';
	}  

	console.log('red');

	onMount(async () => {
		// if (!isLoggedIn) {
		// 	goto('/');
		// }
		console.log('red');
		response = await GET('/get_audits');
		// console.log(response.reports)
		reports = response.reports;
		console.log(reports);
		console.log(JSON.stringify(reports[13].rawJson))
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="" />
</svelte:head>

<!-- <div class="relative overflow-hidden">Hello!</div> -->
<div class="flex flex-col items-center m-auto w-[100%] mt-16 mb-4">
	<h1 class="text-4xl font-bold mb-8">Website Audit</h1>


	<form class="border-b-[.1vw] w-[30vw]">
		
		<label for="url">https://</label>
		<input name="url" bind:value={url} class="text-center w-[75.5%]" placeholder="pathlight.com"/>
		<button on:click|once={requestAudit} type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Scan Url</button>
	</form>

	<h1 class="text-3xl font-medium mb-3 mt-10">Latest Scans</h1>

	<div class="px-4 sm:px-6 lg:px-8 w-[70vw]">
		<!-- <div class="sm:flex sm:items-center">
			<div class="sm:flex-auto">
				<h1 class="text-xl font-semibold text-gray-900">Users</h1>
				<p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p>
			</div>
			<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
				<button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add user</button>
			</div>
		</div> -->
		<div class="mt-8 flex flex-col mb-10">
			<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<table class="min-w-full divide-y divide-gray-300">
							<thead class="bg-gray-50 justify-between text-lg">
								<tr>
									<th scope="col" class="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6">Url</th>
									<th scope="col" class="px-3 py-3.5 text-left font-semibold text-gray-900">Timestamp</th>
									<th scope="col" class="px-3 py-3.5 text-left font-semibold text-gray-900">Performance</th>
									<th scope="col" class="px-3 py-3.5 text-left font-semibold text-gray-900">Accessibility</th>
									<th scope="col" class="px-3 py-3.5 text-left font-semibold text-gray-900">Best Practices</th>
									<th scope="col" class="px-3 py-3.5 text-left font-semibold text-gray-900">SEO</th>
									<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
										<span class="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white flex-col-reverse text-base">
								{#if response.reports[0].url !== undefined}
									{#each response.reports.reverse() as report}
										<tr>
											<td class="whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6">{report.url}</td>
											<td class="whitespace-nowrap px-3 py-4 text-gray-500">{report.timestamp}</td>
											<td class="whitespace-nowrap px-3 py-4 text-gray-500">{report.scores.performance}</td>
											<td class="whitespace-nowrap px-3 py-4 text-gray-500">{report.scores.accessibility}</td>
											<td class="whitespace-nowrap px-3 py-4 text-gray-500">{report.scores.bestPractices}</td>
											<td class="whitespace-nowrap px-3 py-4 text-gray-500">{report.scores.seo}</td>
											<td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
												<a href="#" class="text-indigo-600 hover:text-indigo-900">View Report</a>
											</td>
										</tr>
									{/each}
								{:else}
									Loading
								{/if}

								<!-- More people... -->
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- {#if response.reports[0].url !== undefined}
		{#each response.reports as report}
			<div class="flex w-[70%] text-lg justify-evenly">
				<p class="w-[25%] text-center">{report.url}</p>
				<p class="w-[35%] text-center">{report.timestamp}</p>
				<p class="w-[5%] text-center">{report.scores.performance}</p>
				<p class="w-[5%] text-center">{report.scores.accessibility}</p>
				<p class="w-[5%] text-center">{report.scores.bestPractices}</p>
				<p class="w-[5%] text-center">{report.scores.seo}</p>
			</div>
		{/each}
	{:else}
		Loading
	{/if} -->
</div>

<style>
</style>
