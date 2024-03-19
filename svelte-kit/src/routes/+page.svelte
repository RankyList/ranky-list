<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<div class="container mx-auto grid gap-5 p-8">
    <h1 class="h1">
        <span class="bg-gradient-to-bl from-primary-500 from-50% to-secondary-500 box-decoration-clone bg-clip-text text-transparent">Homepage</span>
    </h1>
    <section class="flex space-x-2">
        <h2>10 most recent tier lists :</h2>
        {#each data.recentTierLists.items as tierList}
            <span>{tierList.name}</span>
        {:else}
            <h2>No recent tier list found.</h2>
        {/each}
    </section>
</div>
