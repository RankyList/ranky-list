<script lang="ts">
    import { FileDropzone } from '@brainandbones/skeleton';
    import Lazy from 'svelte-lazy';
    import type { TierlistItemType } from '$src/lib/types/tierlist';
    import ModalField from '$lib/components/ModalField.svelte';

    export let item: TierlistItemType;
    export let parent: Record<string, any>;
    export let updateItem: (item: TierlistItemType) => void;

    let files: FileList;
    let url = '';

    const submit = (e: Event) => {
        e.preventDefault();

        // TODO: Make a real url check
        if (url.length >= 8) {
            item.image = url;
        }

        updateItem(item);
        parent.onClose();
    };
</script>

<form class="grid gap-5">
    <ModalField isTitle bind:text={item.title} />
    <ModalField bind:text={item.description} />
    <h3 class="text-lg">Image</h3>
    <div class="card | gap-5 grid p-4">
        <span class="gap-4 grid grid-cols-[4fr,1fr]">
            <!-- TODO: Make a working dropzone -->
            <FileDropzone bind:files height="h-full" />
            <Lazy>
                <img alt="item" class="rounded" src={item.image} />
            </Lazy>
        </span>
        <div class="gap-2 grid">
            <label for="url">Or enter url</label>
            <input bind:value={url} placeholder="https://..." type="text" />
        </div>
    </div>
    <button class="btn | bg-primary-400 dark:bg-primary-600" type="submit" on:click={submit}
        >Submit</button
    >
</form>

<slot />
