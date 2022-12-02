<script lang="ts">
    import ModalField from './ModalField.svelte';
    import { FileDropzone } from '@brainandbones/skeleton';

    export let description: string;
    export let image: string;
    export let title: string;
    export let parent: Record<string, any>;

    let files: FileList;
</script>

<div class="grid gap-5">
    <ModalField isTitle text={title} />
    <div>
        <FileDropzone bind:files />
        <img alt={title} src={image} />
    </div>
    <ModalField text={description} />
    <button class="btn | bg-primary-600" type="submit" on:click={parent.onClose}>Update</button>
</div>
