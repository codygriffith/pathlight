import site from '$lib/schema/data/site.json'

import type { WebSite, WithContext } from 'schema-dts'
export type Schema = WebSite | WithContext<WebSite>

// @ts-ignore
export { default as SchemaTag } from '$lib/schema/SchemaTag.svelte';

export function serializeSchema(thing: Schema) {
    return `<script type="application/ld+json">${JSON.stringify(thing)}</script>`
}

