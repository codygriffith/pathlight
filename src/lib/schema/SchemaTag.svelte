<script lang="ts">
	import { serializeSchema } from '$lib/schema';
	import type { Schema } from '$lib/schema';

	export let schema: Schema;
</script>

<!-- <svelte:head> -->
	{@html serializeSchema(schema)}
<!-- </svelte:head> -->
