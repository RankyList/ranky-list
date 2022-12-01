<script lang="ts">
    export let item: any;
    export let openItemModal: any;
</script>

<div
    class="card | aspect-square bg-center bg-cover cursor-pointer"
    role="button"
    style="background-image: url({item.image})"
    on:click={openItemModal({...item})}
/>
