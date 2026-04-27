<script lang="ts">
	import favicon from '@/assets/favicon.svg';
	import AppSidebar from '@/components/layout/AppSidebar.svelte';
	import * as Sidebar from '@/components/ui/sidebar/index.js';
	import { ModeWatcher } from 'mode-watcher';

	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>RankyList - Tier list maker</title>

	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">

	<meta name="description" content="Create tier lists instantly with RankyList — a free, fast, and clean tierlist maker. Rank anything: games, movies, characters, and more." />
	<meta name="keywords" content="tier list maker, tierlist, ranking tool, free tier list" />
	<meta property="og:title" content="RankyList - Tier list maker" />
	<meta property="og:description" content="Create and share tier lists for anything." />
	<meta property="og:url" content="https://alpha.rankylist.com/" />
	<meta property="og:type" content="website" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebApplication",
			"name": "RankyList",
			"url": "https://alpha.rankylist.com",
			"applicationCategory": "UtilitiesApplication",
			"description": "A free tier list maker to rank anything."
		}
  	</script>
</svelte:head>

<Sidebar.Provider open={false}>
	<AppSidebar />
	<main class="w-full space-y-8 p-2 sm:p-4">
		{@render children?.()}
	</main>
</Sidebar.Provider>

<!-- Dark Mode -->
<ModeWatcher />
