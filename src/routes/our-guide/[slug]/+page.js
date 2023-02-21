// @ts-ignore

// export const prerender = true;
// export const ssr = true;
// export const csr = true;

export async function load({ params }) {
    const post = await import(`../../../../src/lib/our-guide/${params.slug}.md`)
    const { title, date } = post.metadata
    const content = post.default

    return {
        content,
        title,
        date,
    }
}