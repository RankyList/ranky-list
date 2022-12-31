<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>{data.tierList.name}</title>
    <meta name="description" content={data.tierList.description ?? `The ${data.tierList.name} tier list. Created by TODO.`} />
</svelte:head>

<h1>{data.tierList.name}</h1>
