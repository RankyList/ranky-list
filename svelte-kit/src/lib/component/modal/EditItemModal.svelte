<script lang="ts">
    import { FileDropzone } from '@skeletonlabs/skeleton';
    import Lazy from 'svelte-lazy';

    import ModalField from '$component/modal/ModalField.svelte';
    import Placeholder from '$component/util/Placeholder.svelte';

    import type { ParentModal } from '$type/modal';
    import type { Prisma } from '@prisma/client';

    export let item: Prisma.TierListItemUncheckedCreateWithoutTierListInput;
    export let parent: ParentModal;
    export let updateItem: (item: Prisma.TierListItemUncheckedCreateWithoutTierListInput) => void;

    let files: FileList;

    $: name = item.name ?? '';
    $: description = item.description ?? '';
    $: url = '';

    const submit = () => {
        updateItem(item);
        parent.onClose();
    };
</script>

<form class="grid gap-5" on:submit|preventDefault={submit}>
    <ModalField isTitle bind:text={name} />
    <ModalField bind:text={description} />
    <h3 class="text-lg">Image</h3>
    <div class="card | grid gap-5 p-4">
        <span class="grid grid-cols-[4fr,90px] gap-4">
            <!-- TODO: Make a working dropzone -->
            <FileDropzone bind:files height="h-full" />
            <Lazy height={90} offset={0} placeholder={Placeholder} placeholderProps={{ height: 90 }}>
                <img
                    alt={`Image for item ${item.name ?? `number ${item.position}`}`}
                    class="rounded"
                    height="90"
                    src="https://picsum.photos/90"
                    width="90"
                />
            </Lazy>
        </span>
        <div class="grid gap-2">
            <label for="url">Or enter url</label>
            <input bind:value={url} placeholder="https://..." type="text" />
        </div>
    </div>
    <button class="btn | bg-primary-400 dark:bg-primary-600" type="submit">Submit</button>
</form>

<slot />
