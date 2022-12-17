<script lang="ts">
    import { FileDropzone } from '@brainandbones/skeleton';
    import Lazy from 'svelte-lazy';
    import type { TierlistItemType } from '$src/lib/types/tierlist';
    import ButtonIcon from '$lib/components/ButtonIcon.svelte';
    import ModalField from '$lib/components/ModalField.svelte';

    export let item: TierlistItemType;
    export let parent: Record<string, any>;
    export let deleteItem: (item: TierlistItemType) => void;
    export let updateItem: (item: TierlistItemType) => void;

    const handleDelete = () => {
        deleteItem(item)
        parent.onClose();
    }

    const submit = () => {
        // TODO: Make a real url check
        if (url.length >= 8) {
            item.image = url;
        }

        updateItem(item);
        parent.onClose();
    };

    let files: FileList;

    $: url = '';
</script>

<form class="grid gap-5" on:submit|preventDefault={submit}>
    <span class="flex gap-2">
        <ButtonIcon action={handleDelete} variant="delete" />
        <ModalField isTitle bind:text={item.title} />
    </span>
    <ModalField bind:text={item.description} />
    <h3 class="text-lg">Image</h3>
    <div class="card | gap-5 grid p-4">
        <span class="gap-4 grid grid-cols-[4fr,96px]">
            <!-- TODO: Make a working dropzone -->
            <FileDropzone bind:files height="h-full" />
            <Lazy height={96}>
                <img alt="item" class="rounded" height="96" src={item.image} width="96" />
            </Lazy>
        </span>
        <div class="gap-2 grid">
            <label for="url">Or enter url</label>
            <input bind:value={url} placeholder="https://..." type="text" />
        </div>
    </div>
    <button class="btn | bg-primary-400 dark:bg-primary-600" type="submit">Submit</button>
</form>

<slot />
