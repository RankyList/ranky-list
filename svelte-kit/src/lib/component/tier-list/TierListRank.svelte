<script lang="ts">
    import type { ParentModalProp } from '$type/modal';
    import type { Prisma } from '@prisma/client';

    export let classes = '';
    export let rank: Prisma.TierListRankUncheckedCreateWithoutTierListInput;
    export let openRankModal: (props: ParentModalProp) => void;
</script>

<button
    type="button"
    class="flex cursor-pointer items-center justify-center rounded p-4 text-center text-lg lg:text-xl {classes}"
    style="background-color: {rank.color}; word-break: break-word"
    on:click|preventDefault={() => openRankModal({ rank })}
>
    {rank.name}
</button>
