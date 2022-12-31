<script lang="ts">
    import Lazy from 'svelte-lazy';

    import Placeholder from '$component/util/Placeholder.svelte';

    import type { ParentModalProp } from '$type/modal';
    import type { Prisma } from '@prisma/client';

    export let item: Prisma.TierListItemUncheckedCreateWithoutTierListInput;
    export let openItemModal: (props: ParentModalProp) => void;
</script>

<span style="order: {item.position}">
    <Lazy height={90} offset={0} placeholder={Placeholder} placeholderProps={{ height: 90 }}>
        <input
            type="image"
            alt={`Image for item ${item.name ?? `number ${item.position}`}`}
            class="cursor-pointer rounded"
            height="90"
            width="90"
            src="https://picsum.photos/90"
            on:click={() => openItemModal({ item })}
        />
    </Lazy>
</span>
