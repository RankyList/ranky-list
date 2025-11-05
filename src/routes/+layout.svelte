<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { localizeHref, locales } from '@/paraglide/runtime';

	import { page } from '$app/state';
	import { ModeWatcher } from 'mode-watcher';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '@/components/layout/AppSidebar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Sidebar.Provider open={false}>
	<AppSidebar />
	<main class="w-full space-y-8 p-2 sm:p-4">
		{@render children?.()}
	</main>
</Sidebar.Provider>

<!-- Paraglide SSG -->
<!-- <div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div> -->

<!-- Dark Mode -->
<ModeWatcher />
