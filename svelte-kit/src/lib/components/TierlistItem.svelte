<script lang="ts">
    import Lazy from 'svelte-lazy';
    import type { TierlistItemType } from '$src/lib/types/tierlist';

    export let item: TierlistItemType;
    export let openItemModal: (props: Record<string, any>) => void;
</script>

<span style="order: {item.position}">
    <Lazy height={100}>
        <img
            alt="item"
            class="cursor-pointer rounded"
            src={item.image}
            on:click={openItemModal({ item })}
        />
    </Lazy>
</span>
