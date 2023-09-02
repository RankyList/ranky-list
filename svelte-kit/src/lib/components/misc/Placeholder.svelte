<script lang="ts">
    export let height: number;
    export let animate = true;
    export let circle = false;

    $: classes = `placeholder ${$$props.class || ''}}`;
    $: style = `height: ${height}px; ${$$props.style || ''}`;
</script>

<div {...$$props} class={classes} class:animate-pulse={animate} class:placeholder-circle={circle} {style} />
