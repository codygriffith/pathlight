<script context="module">
	export const prerender = true;
</script>

<script>
	// clearInterval(interval);
	import { GET, POST } from '$lib/store.js';
	import { onMount } from 'svelte';
	import FakeProgress from 'fake-progress';

	let response = { reports: { items: [{}] } };
	let pendingAudits = [];
	let lastEvaluatedKey;
	let url = '';
	let reports;

	var onEachSecond = function () {
		pendingAudits = pendingAudits;
	};

	var interval = setInterval(onEachSecond, 500);

	var onEnd = function () {
		pendingAudits = pendingAudits;
	};

	var checkProgress = async function () {
		console.log('self');
		response = await GET('/get_audits');
		reports = response.reports.items;
		reports.forEach((report) => {
			report.timestamp = new Date(report.timestamp);
		});
		reports = reports.sort((a, b) => b.timestamp - a.timestamp).reverse();
		lastEvaluatedKey = response.reports.lastEvaluatedKey || null;
		pendingAudits.forEach((audit) => {
			let found = reports.find((el) => el.id == audit.id);
			if (found) {
				audit.progress.end();
			}
			pendingAudits = pendingAudits;
		});
	};

	async function requestAudit() {
		let res = await POST('/audit', url);
		console.log(res);
		res.progress = new FakeProgress({
			timeConstant: 50000,
			autoStart: true
		});
		pendingAudits.push(res);
		pendingAudits = pendingAudits;
		url = '';
	}

	async function loadReports() {
		let res = await GET(`/get_audits?exclusiveStartKey=${lastEvaluatedKey.id}`);
		lastEvaluatedKey = res.reports.lastEvaluatedKey || null;
		reports = reports.push(res.reports.items);
		reports = reports;
	}

	onMount(async () => {
		// if (!isLoggedIn) {
		// 	goto('/');
		// }
		response = await GET('/get_audits');
		reports = response.reports.items;
		lastEvaluatedKey = response.reports.lastEvaluatedKey || null;
		reports.forEach((report) => {
			report.timestamp = new Date(report.timestamp);
		});
		reports = reports.sort((a, b) => b.timestamp - a.timestamp).reverse();
		setInterval(checkProgress, 5000);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="" />
</svelte:head>

<!-- <div class="relative overflow-hidden">Hello!</div> -->
<div class="flex flex-col items-center m-auto w-[100%] mt-16 mb-4">
	<!-- <button on:click={() => p.start()} type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">End</button> -->

	<h1 class="text-4xl font-bold mb-8">Website Audit</h1>

	<form class="border-b-[.1vw] w-[30vw]">
		<label for="url">https://</label>
		<input name="url" bind:value={url} class="text-center w-[75.5%]" placeholder="pathlight.dev" />
		<button on:click={requestAudit} type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Scan Url</button>
	</form>

	<!-- {#if pendingAudits.length > 0} -->
	{#if reports !== undefined && reports !== null && pendingAudits.length > 0}
		<div class="mt-8 flex flex-col mb-10">
			<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<table class="min-w-full divide-y divide-gray-300">
							<thead class="bg-gray-50 justify-between text-sm">
								<tr>
									<th scope="col" class="font-normal pl-4 pr-3 text-gray-900 sm:pl-6 text-center">Url</th>
									<th scope="col" class="font-normal px-3 text-gray-900 text-center">Progress</th>
									<th scope="col" class="relative pl-3 pr-4 sm:pr-6" />
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white flex-col-reverse text-sm">
								{#each pendingAudits as report}
									<tr>
										<td class="whitespace-nowrap py-2 pl-4 pr-3 font-normal text-gray-900 sm:pl-6">{report.url}</td>
										<td class="whitespace-nowrap py-2 pl-4 pr-3 font-normal text-gray-900 sm:pl-6 w-[20vw]">
											<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700/20">
												<div class="bg-blue-500 text-[.25vw] font-normal text-blue-100 text-center leading-none rounded-full transition-all duration-[4000ms]" style="width: {(report.progress.progress * 100).toFixed(3)}%">&nbsp;</div>
											</div>
										</td>

										<td class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
											{#if report.progress.progress * 100 >= 100}
												<a href="/report/view?id={report.id}" class="text-indigo-600 font-normal hover:text-indigo-900">View Report</a>
											{:else}
												<a href="/report/view?id={report.id}" style="pointer-events: none" class="text-indigo-600 font-normal hover:text-indigo-900">View Report</a>
											{/if}
										</td>

									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	{/if}
	

	<div class="text-center mb-3">
		<h1 class="text-3xl font-medium mt-10">Latest Scans</h1>
		{#if reports !== undefined && reports !== null} 
			<p>{reports.length} total reports</p>
		{:else}
			<p>0</p>
		{/if}

	</div>

	<div class="px-4 sm:px-6 lg:px-8 w-[70vw]">
		<div class="mt-8 flex flex-col mb-10">
			<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<table class="min-w-full divide-y divide-gray-300">
							<thead class="bg-gray-50 justify-between text-lg">
								<tr>
									<th scope="col" class="py-4 pl-4 pr-3 text-left w-[20%] font-semibold text-gray-900 sm:pl-6">Url</th>
									<th scope="col" class="px-3 py-3.5 text-left font-semibold text-gray-900">Timestamp</th>
									<th scope="col" class="px-3 py-3.5 text-left font-semibold text-gray-900">Performance</th>
									<th scope="col" class="px-3 py-3.5 text-left font-semibold text-gray-900">Accessibility</th>
									<th scope="col" class="px-3 py-3.5 text-left font-semibold text-gray-900">Best Practices</th>
									<th scope="col" class="px-3 py-3.5 text-left font-semibold text-gray-900">SEO</th>
									<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 text-sm">
										<!-- {#if reports !== undefined && reports !== null} -->
											<!-- {reports.length} -->
										<!-- {/if} -->
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white text-base">
								{#if reports !== undefined && reports !== null}
									{#each reports.reverse() as report}
										<tr>
											<td class="whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6">{report.url}</td>
											<td class="whitespace-nowrap px-3 py-4 text-gray-500">{report.timestamp.toUTCString()}</td>
											<td class="whitespace-nowrap px-3 py-4 text-gray-500">{report.scores.performance}</td>
											<td class="whitespace-nowrap px-3 py-4 text-gray-500">{report.scores.accessibility}</td>
											<td class="whitespace-nowrap px-3 py-4 text-gray-500">{report.scores.bestPractices}</td>
											<td class="whitespace-nowrap px-3 py-4 text-gray-500">{report.scores.seo}</td>
											<td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
												<a href="/report/view?id={report.id}" class="text-indigo-600 hover:text-indigo-900">View Report</a>
											</td>
										</tr>
									{/each}
								<!-- {:else} -->
									<!-- Loading -->
								{/if}

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- <button on:click={loadReports} type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Scan Url</button> -->
	</div>
</div>

<style>
</style>
