<script lang="ts">
    import RankModal from '$src/lib/components/RankModal.svelte';

    export let color: string;
    export let description: string;
    export let openModal: Function;
    export let title: string;
</script>

<div
    class="card | cursor-pointer flex items-center justify-center p-4 text-lg lg:text-xl text-center"
    style="background-color: {color}; word-break: break-word"
    on:click={openModal(RankModal, { color, description, title })}
>
    {title}
</div>
