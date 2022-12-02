<script lang="ts">
    import type { TierlistRankType } from '$src/lib/types/tierlist';

    export let rank: TierlistRankType;
    export let openRankModal: (props: Record<string, any>) => void;
</script>

<div
    class="card | cursor-pointer flex items-center justify-center p-4 text-lg lg:text-xl text-center"
    style="background-color: {rank.color}; word-break: break-word"
    on:click={openRankModal({ rank })}
>
    {rank.title}
</div>
