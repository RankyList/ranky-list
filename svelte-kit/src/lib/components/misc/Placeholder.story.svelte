<script lang="ts">
    import Placeholder from './Placeholder.svelte';

    import type { Hst as HstType } from '@histoire/plugin-svelte';

    export let Hst: HstType;

    let height = 50;
    let animate = true;
    let circle = false;
</script>

<Hst.Story title="Placeholder" icon="grommet-icons:status-placeholder-small" iconColor="#fb923c">
    <svelte:fragment slot="controls">
        <Hst.Number title="Height" bind:value={height} />
        <Hst.Checkbox title="Animate" bind:value={animate} />
        <Hst.Checkbox title="Circle" bind:value={circle} />
    </svelte:fragment>

    <Hst.Variant title="Placeholder" icon="grommet-icons:status-placeholder-small" iconColor="#fb923c">
        <Placeholder {height} {animate} {circle} />
    </Hst.Variant>
</Hst.Story>
