<script lang="ts">
    import ColorPicker from 'svelte-awesome-color-picker';
    import type { TierlistRankType } from '$src/lib/types/tierlist';
    import ModalField from '$lib/components/ModalField.svelte';

    export let parent: Record<string, any>;
    export let rank: TierlistRankType;
    export let updateRank: (rank: TierlistRankType) => void;

    const submit = () => {
        updateRank(rank);
        parent.onClose();
    };
</script>

<form class="grid gap-5 relative" on:submit|preventDefault={submit}>
    <ModalField isTitle bind:text={rank.title} />
    <ModalField bind:text={rank.description} />
    <ColorPicker bind:hex={rank.color} isAlpha={false} label="Color" />
    <button class="btn | bg-primary-400 dark:bg-primary-600" type="submit">Submit</button>
</form>

<slot />
