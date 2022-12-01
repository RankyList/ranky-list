<script lang="ts">
    export let rank: any;
    export let openRankModal: any;
</script>

<div
    class="card | cursor-pointer flex items-center justify-center p-4 text-lg lg:text-xl text-center"
    style="background-color: {rank.color}; word-break: break-word"
    on:click={openRankModal({ ...rank })}
>
    {rank.title}
</div>
