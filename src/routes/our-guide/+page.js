// @ts-nocheck
export const load = async () => {
    const allPostFiles = import.meta.glob('/src/lib/our-guide/*.md');
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver();
            const postPath = path.slice(8, -3);

            return {
                meta: metadata,
                path: postPath
            };
        })
    );

    return { allPosts }
}