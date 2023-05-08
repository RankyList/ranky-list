<script lang="ts">
    import { MetaTags } from 'svelte-meta-tags';

    export let data;
</script>

<MetaTags title="RankyList" description="Welcome to RankyList. The easiest way to create a tier list." />

<div class="container mx-auto grid gap-5 p-8">
    <h1><span class="from-primary-500 to-secondary-500 bg-gradient-to-r box-decoration-clone bg-clip-text text-transparent">Homepage</span></h1>
    <section class="flex space-x-2">
        <h2>10 most recent tier lists :</h2>
        {#each data.recentTierLists.items as tierList}
            <span>{tierList.name}</span>
        {:else}
            <h2>No recent tier list found.</h2>
        {/each}
    </section>
</div>
