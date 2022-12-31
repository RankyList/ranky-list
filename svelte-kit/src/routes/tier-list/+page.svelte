<script lang="ts">
    import TierListPreview from '$component/tier-list/TierListPreview.svelte';

    import type { PageData } from './$types';

    export let data: PageData;

    $: plural = data.tierLists.length > 1;
</script>

<svelte:head>
    <title>Tier lists</title>
    <meta name="description" content="Easily find any tier list with the help of filters." />
</svelte:head>

<h1>{`${data.tierLists.length} tier ${plural ? 'lists' : 'list'} found`}</h1>

{#each data.tierLists as tierList}
    <TierListPreview {tierList} />
{:else}
    <span>No tier list found.</span>
{/each}
