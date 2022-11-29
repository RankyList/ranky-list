<script lang="ts">
    import TierlistItemModal from "./TierlistItemModal.svelte";

    export let description: string;
    export let image: string;
    export let title: string;
    export let openModal: Function;
</script>

<div
    class="card | aspect-square bg-center bg-cover cursor-pointer"
    style="background-image: url({image})"
    on:click={openModal(TierlistItemModal, { description, image, title })}
/>
