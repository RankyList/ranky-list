<script lang="ts">
    import TierListPreview from '$component/tier-list/TierListPreview.svelte';

    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>RankyList</title>
    <meta name="description" content="Welcome to RankyList. The easiest way to create a tier list." />
</svelte:head>

<div class="container mx-auto grid gap-5 p-8">
    <h1><span class="bg-gradient-to-tl from-primary-500 to-tertiary-500 box-decoration-clone bg-clip-text text-transparent">Homepage</span></h1>
    <section class="flex space-x-2">
        <h2>Recent tier lists :</h2>
        {#each data.recentTierLists as tierList}
            <TierListPreview {tierList} />
        {:else}
            <h2>No recent tier list found.</h2>
        {/each}
    </section>
</div>
