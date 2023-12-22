<svelte:head>
	<title>Contact Us</title>
</svelte:head>

<div class="max-w-[35rem] w-full break-words mb-16 px-6 md:p-0">
	<h1 class="text-center mt-12 text-5xl font-semibold">Contact Us</h1>
	<div class="flex justify-center mb-10 space-y-6">
		<span class="sr-only">Email</span>
		<svg class="flex-shrink-0 w-6 h-6 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
		</svg>
		<span class="ml-3">help@pathlight.dev</span>
	</div>
	<form class="grid grid-cols-1" method="post" name="contactForm">
		<input type="hidden" name="form-name" value="contactForm" />
		<input
			type="email"
			name="email"
			aria-label="email"
			autocomplete="email"
			class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
			placeholder="Email"
		/>
		<textarea
			name="message"
			aria-label="message"
			rows="4"
			class="block w-full my-6 shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
			placeholder="Message"
		/>
		<button
			type="submit"
			class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>Submit
		</button>
	</form>
</div>

<style>
	/* h1 {
		margin: 1% 0 !important;
		font-size: 2.25rem !important;
	} */
	h2 {
		font-size: 2rem !important;
		font-weight: 700 !important;
		margin-top: 4% !important;
	}
	h3 {
		margin: 1% 0 !important;
		font-size: 1.5rem !important;
		font-weight: 500 !important;
		margin-top: 4% !important;
	}
	h4 {
		margin: 1% 0 !important;
		font-size: 1.25rem !important;
		font-weight: 500 !important;
		margin-top: 4% !important;
	}
	p {
		margin: 1% 0 !important;
		font-size: 1.1rem !important;
		line-height: 1.7rem !important;
	}
	li {
		margin: 1% 0 !important;
		margin-left: 3% !important;
		list-style: disc !important;
	}
	time {
		margin-top: 5%;
		display: block;
	}
</style>
