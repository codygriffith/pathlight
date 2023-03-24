<!-- CodeBlock.svelte -->
<script>
	export let language = 'go';
	export let code = `Hello World`;

	function copyCodeToClipboard() {
		const textArea = document.createElement('textarea');
		textArea.value = code;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);
	}
</script>

<div class="code bg-black rounded-md mb-4">
	<div class="flex relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md">
		<span>{language}</span>
		<button class="flex ml-auto gap-2" on:click={copyCodeToClipboard}>
			<svg
				stroke="currentColor"
				fill="none"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="h-4 w-4"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
				<rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
			</svg>
			Copy code
		</button>
	</div>
	<div class="p-4 overflow-y-auto">
		<codeSnippet class="!whitespace-pre hljs language-{language}">{code}</codeSnippet>
	</div>
</div>

<style>
	:global(code) {
		border: unset;
		background-color: unset !important;
		font-family: 'Ubuntu Mono' !important;
		font-size: unset !important;
		padding: 0 !important;
		font-weight: 600 !important;
		color: rgb(218, 216, 216) !important;
	}
</style>
