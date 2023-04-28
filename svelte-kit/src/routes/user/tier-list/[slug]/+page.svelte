<script lang="ts">
    import { MetaTags } from 'svelte-meta-tags';

    export let data;
</script>

<MetaTags title={data.tierList.name} description={data.tierList.description ?? `The ${data.tierList.name} tier list. Created by TODO.`} />

<h1>{data.tierList.name}</h1>
