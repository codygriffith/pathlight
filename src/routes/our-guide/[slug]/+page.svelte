<script>
	// @ts-nocheck
	/**
	 * @type {{ post: { title: any; content: any; }; }}
	 */
	export let data;
	import { SchemaTag } from '$lib/schema';

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://pathlight.dev/our-guide/${data.title.replaceAll(' ', '-')}`
		},
		headline: data.title,
		description: data.summary,
		author: {
			'@type': 'Person',
			name: data.author
		},
		datePublished: data.date,
		dateModified: data.edited,
		publisher: {
			'@type': 'Organization',
			name: data.publisher
			// logo: {
			// 	'@type': 'ImageObject',
			// 	url: 'https://www.example.com/logo.png',
			// 	width: 600,
			// 	height: 60
			// }
		},
		// image: {
		// 	'@type': 'ImageObject',
		// 	url: 'https://www.example.com/image.jpg',
		// 	width: 1200,
		// 	height: 630
		// },
		articleSection: data.category,
		keywords: data.tags,
		wordCount: data.wordCount,
		genre: 'article'
		// about: [
		// 	{
		// 		'@type': 'Thing',
		// 		name: 'Lighthouse'
		// 	},
		// 	{
		// 		'@type': 'Thing',
		// 		name: 'Web Development'
		// 	}
		// ],
		// educationalUse: [
		// 	{
		// 		'@type': 'EducationalUse',
		// 		name: 'Reference'
		// 	}
		// ]
	};

	import { onMount } from 'svelte';
  import { tick } from 'svelte';

  let observer;
  let activeIndex = '';
  let previousActiveLink;

  onMount(async () => {
    // Wait for the next DOM update
    await tick();

    const headings = document.querySelectorAll('.toc > h1, h2, h3, h4, h5, h6');

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          changeActiveIndex(`#${entry.target.id}`);
        });
      },
      {
        rootMargin: '-50% 0px',
      }
    );

    headings.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading);
      }
    });

    return () => {
      headings.forEach((heading) => {
        observer.unobserve(heading);
      });
	  observer.disconnect();
    };
  });

  function changeActiveIndex(id) {
    if (previousActiveLink) {
      previousActiveLink.classList.remove('text-blue-500');
    }

    const activeLink = document.querySelector(`a[href='${id}']`);
    if (activeLink) {
      activeLink.classList.add('text-blue-500');
      previousActiveLink = activeLink;
    }

    activeIndex = id;
  }

  $: console.log(activeIndex)
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.summary} />
	<SchemaTag {schema} />
</svelte:head>

<article id="article" class="flex flex-row-reverse w-full text-left p-5 sm:p-16 pt-8 mt-16 relative justify-between">
	<!-- <h1 class="text-4xl sm:text-3xl font-extrabold tracking-tight leading-10 text-slate-900 dark:text-slate-200 md:text-4xl">{data.title}</h1> -->
	<!-- <div class="absolute pl-5 sm:pl-16 top-3 inset-x-0 text-slate-700 dark:text-slate-300"><time datetime="2022-12-15T15:00:00.000Z">{data.dateString}</time></div> -->
	<svelte:component this={data.content} />
</article>

<style>
	/* :global(#article h1) {
		margin: 1% 0 !important;
		font-size: 2.25rem !important;
	} */
	:global(code) {
		/* background-color: #f9f9f9; */
		/* border: 1px solid #e1e1e1; */
		border-radius: 4px;
		padding: 1em;
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.9em;
		white-space: pre-wrap;
		line-height: 1.4;
		overflow-x: auto;
	}
	:global(.toc){
		width: 30%;
		border-radius: .4rem;
    	box-shadow: inset 0.2vw 0.2vw 1vw #2625252a;
    	padding: 2%;
    	background: #0000000d;
		font-size: .92rem;
		height: fit-content;
    	position: sticky;
    	top: 2vw;
	}
	:global(code::before, code::after){
		content: '`';
	}
	:global(.toc::before){
		content: 'Table of Contents';
		font-size: 1.5vw;
    	font-weight: 500;
	}
	:global(.toc>ol>li::marker) {
    	font-size: 0 !important;
    	width: 0 !important;
	}
	:global(.toc>ol>li>a) {
    	display: none;
	}
	:global(#article > section){
		width: 60%;
	}
	:global(#article h1) {
		font-size: 2.3rem !important;
		font-weight: 600 !important;
		/* margin-top: 2% !important; */
		margin-bottom: 2% !important;
	}
	:global(#article h2) {
		font-size: 2rem !important;
		font-weight: 500 !important;
		margin-top: 6% !important;
	}
	:global(#article h3) {
		margin: 1% 0 !important;
		font-size: 1.5rem !important;
		font-weight: 500 !important;
		margin-top: 4% !important;
	}
	:global(#article h4) {
		margin: 1% 0 !important;
		font-size: 1.3rem !important;
		font-weight: 500 !important;
		margin-top: 4% !important;
	}
	:global(#article p) {
		margin: 1% 0 !important;
		font-size: 1.1rem !important;
		line-height: 1.7rem !important;
	}
	:global(#article li) {
		margin: 1% 0;
		margin-left: 4%;
		list-style: disc;
	}
	
	:global(nav > ol, nav > ol > li) {
		list-style: none !important;
		margin: 1% 0 !important;
		margin-left: 0% !important;
		/* list-style: disc !important; */
	}
	:global(nav li) {
		list-style: none !important;
		margin-top: 2% !important;
		/* margin-left: 0% !important; */
		/* list-style: disc !important; */
	}
	:global(nav > ol > li > ol > li) {
		list-style: none !important;
		margin-left: 0% !important;
	}
	:global(#date) {
		
	}
</style>
