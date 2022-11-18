<script lang="ts">
    export let text = 'SvelteKit!';

    const icons = ['🙂', '🤔', '😃', '😮', '😊', '🐢', '🦆', '🔥', '🔥🔥', '🔥🔥🔥'];

    let clicks = 0;

    $: icon = icons.at(Math.min(clicks, icons.length - 1));
</script>

<div class="flex gap-2">
    <button class="btn w-fit bg-warning-500 btn-lg text-white" on:click={() => clicks++}>
        <span>{text}</span>
        <span>{icon}</span>
    </button>

    <button
        class="btn-icon btn-base ring-2 ring-warning-500 ring-inset hover:bg-warning-500"
        on:click={() => (clicks = 0)}>💀</button
    >
</div>
