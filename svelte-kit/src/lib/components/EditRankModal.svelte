<script lang="ts">
    import ColorPicker from 'svelte-awesome-color-picker';
    import type { TierlistRankType } from '$src/lib/types/tierlist';
    import ModalField from '$lib/components/ModalField.svelte';

    export let parent: Record<string, any>;
    export let rank: TierlistRankType;
    export let updateRank: (rank: TierlistRankType) => void;

    const submit = (e: Event) => {
        e.preventDefault();

        updateRank(rank);
        parent.onClose();
    };
</script>

<form class="grid gap-5 relative">
    <ModalField isTitle bind:text={rank.title} />
    <ModalField bind:text={rank.description} />
    <ColorPicker bind:hex={rank.color} isAlpha={false} label="Color" />
    <button class="btn | bg-primary-500" type="submit" on:click={submit}>Submit</button>
</form>

<slot />
