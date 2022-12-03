<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faCheck,
        faPenToSquare,
        faPlus,
        faTrashCan,
        faXmark
    } from '@fortawesome/free-solid-svg-icons';

    export let action: () => void;
    export let classes = '';
    export let padding = 4;
    export let variant = 'add';

    let color: string;
    let icon: any;

    if (variant === 'add') {
        color = 'primary';
        icon = faPlus;
    } else if (variant === 'edit') {
        color = 'primary';
        icon = faPenToSquare;
    } else if (variant === 'delete') {
        color = 'warning';
        icon = faTrashCan;
    } else if (variant === 'ok') {
        color = 'tertiary';
        icon = faCheck;
    } else if (variant === 'cancel') {
        color = 'warning';
        icon = faXmark;
    }
</script>

<button
    class="aspect-square bg-{color}-400 dark:bg-{color}-600 flex items-center justify-center p-{padding} rounded w-min {classes}"
    on:click={action}
>
    <Fa {icon} />
</button>
