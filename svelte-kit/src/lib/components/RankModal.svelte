<script lang="ts">
    // import { Color, ColorInput } from 'color-picker-svelte'

    export let color: string;
    export let description: string;
    export let title: string;

    // let newColor = new Color(color)
</script>

<div class="card | border-0 grid gap-5">
    <h3>{ title }</h3>
    <p>{ description }</p>
    <!-- <ColorInput bind:newColor title="Color" /> -->
</div>
