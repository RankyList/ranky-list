<script lang="ts">
    import type { tierlistItem } from '$src/lib/types/tierlist';

    export let item: tierlistItem;
    export let openItemModal: Function;
</script>

<div
    class="card | aspect-square bg-center bg-cover cursor-pointer"
    role="button"
    style="background-image: url({item.image})"
    on:click={openItemModal({ ...item })}
/>
