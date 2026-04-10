<script lang="ts">
	import favicon from '@/assets/favicon.svg';
	import AppSidebar from '@/components/layout/AppSidebar.svelte';
	import * as Sidebar from '@/components/ui/sidebar/index.js';
	import { ModeWatcher } from 'mode-watcher';

	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>RankyList - Tierlist maker</title>
	<meta name="description" content="RankyList is THE tierlist maker, clean and simple" />
</svelte:head>

<Sidebar.Provider open={false}>
	<AppSidebar />
	<main class="w-full space-y-8 p-2 sm:p-4">
		{@render children?.()}
	</main>
</Sidebar.Provider>

<!-- Dark Mode -->
<ModeWatcher />
