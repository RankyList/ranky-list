<script lang="ts">
    export let parent: Record<string, any>;
</script>

<h1>Test hi</h1>

<button class="btn" on:click={parent.onClose}>Close</button>
