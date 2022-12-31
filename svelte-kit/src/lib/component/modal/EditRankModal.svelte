<script lang="ts">
    import ColorPicker from 'svelte-awesome-color-picker';

    import ModalField from '$component/modal/ModalField.svelte';

    import type { ParentModal } from '$type/modal';
    import type { Prisma } from '@prisma/client';

    export let parent: ParentModal;
    export let rank: Prisma.TierListRankUncheckedCreateWithoutTierListInput;
    export let updateRank: (rank: Prisma.TierListRankUncheckedCreateWithoutTierListInput) => void;

    $: description = rank.description ?? '';

    const submit = () => {
        updateRank(rank);
        parent.onClose();
    };
</script>

<form class="relative grid gap-5" on:submit|preventDefault={submit}>
    <ModalField isTitle bind:text={rank.name} />
    <ModalField bind:text={description} />
    <ColorPicker bind:hex={rank.color} isAlpha={false} label="Color" />
    <button class="btn | bg-primary-400 dark:bg-primary-600" type="submit">Submit</button>
</form>

<slot />
