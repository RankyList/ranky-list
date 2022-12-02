<script lang="ts">
    import ModalField from './ModalField.svelte';

    export let color: string;
    export let description: string;
    export let title: string;

    export let parent: Record<string, any>;
</script>

<div class="grid gap-5 relative">
    <ModalField isTitle text={title} />
    <ModalField text={description} />
    <div class="flex gap-2">
        <label for="color">Color :</label>
        <input id="color" name="color" type="color" value={color} />
    </div>
    <button class="btn | bg-primary-500" type="submit" on:click={parent.onClose}>Update</button>
</div>
