<script lang="ts">
    import Placeholder from './Placeholder.svelte';

    import type { Hst as HstType } from '@histoire/plugin-svelte';

    export let Hst: HstType;

    let height = 50;
    let animate = true;
    let circle = false;
    let restProps: Record<string, string | number | boolean> = {};
    let source = '';

    const handleSourceChange = (newHeight: typeof height, newAnimate: typeof animate, newCircle: typeof circle, newRestProps: typeof restProps) => {
        let newSource = `<Placeholder height={${newHeight}} animate={${String(newAnimate)}} circle={${String(newCircle)}}`;

        for (const [key, value] of Object.entries(newRestProps).filter(([newKey]) => !['height', 'animate', 'circle'].includes(newKey))) {
            newSource += ` ${key}=`;

            if (typeof value === 'string') {
                newSource += `"${value}"`;
            } else if (typeof value === 'number') {
                newSource += `{${value}}`;
            } else {
                newSource += `{${String(value)}}`;
            }
        }

        source = `${newSource} />`;
    };

    $: handleSourceChange(height, animate, circle, restProps);
</script>

<Hst.Story title="Placeholder" icon="grommet-icons:status-placeholder-small" iconColor="#fb923c">
    <svelte:fragment slot="controls">
        <Hst.Number title="Height" bind:value={height} />
        <Hst.Checkbox title="Animate" bind:value={animate} />
        <Hst.Checkbox title="Circle" bind:value={circle} />
        <Hst.Json title="Additional props" bind:value={restProps} />
    </svelte:fragment>

    <Hst.Variant title="Placeholder" icon="grommet-icons:status-placeholder-small" iconColor="#fb923c" {source}>
        <Placeholder {...restProps} {height} {animate} {circle} />
    </Hst.Variant>
</Hst.Story>
