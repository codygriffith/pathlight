<script>
	/**
	 * @type {any}
	 */
	let url;
	/**
	 * @type {any}
	 */
	let audit;

	/**
	 * @param {string} url
	 */
	const getPageSpeed = async (url) => {
		audit = fetch(
			`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&key=AIzaSyDNNWbcCCAznBas2yn8YLg-I_sqz2ELIwQ`
		).then(async (res) => {
			let audit = await res.json();
			for (var key in audit.lighthouseResult.categories) {
				audit.lighthouseResult.categories[key].score = Math.floor(audit.lighthouseResult.categories[key].score * 100);
				audit.lighthouseResult.categories[key].color = audit.lighthouseResult.categories[key].score > 90 ? 'green' : audit.lighthouseResult.categories[key].score > 50 ? 'orange' : 'red';
			}
			return audit;
		});
	};
</script>

<div class="flex flex-col w-full p-16 justify-center items-center">
	<div class="flex flex-col w-full">
		<div class="flex flex-col">
			<h2 class="text-4xl font-extrabold tracking-tight sm:text-4xl text-gray-600 dark:text-white" id="newsletter-headline">Website Speed Test & Audit</h2>
			<p class="mt-4 w-full text-xl leading-6">
				See how your site performs and reveal key areas for potential imporvements. Just enter your webpage's URL and you will recieve a detailed report on the page's Lighthouse scores and other Core
				Web Vitals.
			</p>
		</div>
		<div class="mt-8 w-full flex items-center">
			<form class="sm:flex w-full">
				<label for="email-address" class="sr-only">Email address</label>
				<input
					id="email-address"
					name="email-address"
					type="url"
					autocomplete="url"
					bind:value={url}
					required
					class="w-full px-5 py-3 border border-transparent placeholder-gray-500 ring-gray-400 ring-2 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white rounded-md"
					placeholder="Enter a url"
				/>
				<div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
					<button
						on:click|preventDefault={() => getPageSpeed(url)}
						type="submit"
						class="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
					>
						Start Audit
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
{#if audit}
	{#await audit}
		<div class="flex justify-evenly items-center w-3/4">
			<div class="block text-center">
				<p class="text-xl mb-4">Performance</p>
				<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
					<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
						<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
						<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
					</svg>
					<p class="absolute rotate-90 text-black text-xl text-center">--</p>
				</div>
			</div>
			<div class="block text-center">
				<p class="text-xl mb-4">Accessibility</p>
				<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
					<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
						<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
						<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
					</svg>
					<p class="absolute rotate-90 text-black text-xl text-center">--</p>
				</div>
			</div>
			<div class="block text-center">
				<p class="text-xl mb-4">Best Practices</p>
				<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
					<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
						<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
						<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
					</svg>
					<p class="absolute rotate-90 text-black text-xl text-center">--</p>
				</div>
			</div>
			<div class="block text-center">
				<p class="text-xl mb-4">SEO</p>
				<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
					<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
						<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
						<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
					</svg>
					<p class="absolute rotate-90 text-black text-xl text-center">--</p>
				</div>
			</div>
		</div>
	{:then audit}
		{#if audit.lighthouseResult.categories}
			<div class="flex justify-evenly items-center w-3/4">
				{#each Object.values(audit.lighthouseResult.categories) as category}
					<!-- {category.score} -->
					{#if category.title !== 'PWA'}
						<div class="block text-center">
							<p class="text-xl mb-4">{category.title}</p>
							<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
								<svg class="lh-gauge fill-{category.color}-100" height="10%" viewBox="0 0 50 50">
									<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
									<circle
										class="lh-gauge-arc stroke-{category.color}-600"
										r="45%"
										cx="50%"
										cy="50%"
										stroke-width="4"
										stroke-linecap="round"
										pathLength="360"
										style="stroke-dasharray: {category.score * 3.6}, 9999;"
									/>
								</svg>
								<p class="absolute rotate-90 text-black text-xl text-center">{category.score}</p>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	{/await}
{:else}
	<div class="flex justify-evenly items-center w-3/4">
		<div class="block text-center">
			<p class="text-xl mb-4">Performance</p>
			<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
				<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
					<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
					<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
				</svg>
				<p class="absolute rotate-90 text-black text-xl text-center">--</p>
			</div>
		</div>
		<div class="block text-center">
			<p class="text-xl mb-4">Accessibility</p>
			<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
				<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
					<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
					<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
				</svg>
				<p class="absolute rotate-90 text-black text-xl text-center">--</p>
			</div>
		</div>
		<div class="block text-center">
			<p class="text-xl mb-4">Best Practices</p>
			<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
				<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
					<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
					<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
				</svg>
				<p class="absolute rotate-90 text-black text-xl text-center">--</p>
			</div>
		</div>
		<div class="block text-center">
			<p class="text-xl mb-4">SEO</p>
			<div class="-rotate-90 w-[5vw] m-auto flex justify-center items-center">
				<svg class="lh-gauge fill-gray-100" height="10%" viewBox="0 0 50 50">
					<circle class="lh-gauge-base" r="45%" cx="50%" cy="50%" stroke-width="4" />
					<circle class="lh-gauge-arc stroke-gray-600" r="45%" cx="50%" cy="50%" stroke-width="4" stroke-linecap="round" pathLength="360" />
				</svg>
				<p class="absolute rotate-90 text-black text-xl text-center">--</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.lh-gauge-arc {
		animation: load-gauge 1s ease forwards;
	}

	.stroke-red-600 {
		stroke: #dc2626;
	}

	.stroke-green-600 {
		stroke: #16a34a;
	}

	.stroke-orange-600 {
		stroke: #ea580c;
	}

	.fill-red-100 {
		fill: rgb(254 226 226);
	}

	.fill-green-100 {
		fill: rgb(220 252 231);
	}

	.fill-orange-100 {
		fill: rgb(255 237 213);
	}

	@keyframes load-gauge {
		from {
			stroke-dasharray: 0 352;
		}
	}
</style>
