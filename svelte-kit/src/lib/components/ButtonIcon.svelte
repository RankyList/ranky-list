<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faCheck,
        faPenToSquare,
        faPlus,
        faTrashCan,
        faXmark,
        type IconDefinition
    } from '@fortawesome/free-solid-svg-icons';

    export let action: (e: Event) => void;
    export let classes = '';
    export let padding = 4;
    export let variant: keyof Variants = 'add';

    type Variant = {
        color: string;
        icon: IconDefinition;
    };

    type Variants = {
        add: Variant;
        edit: Variant;
        delete: Variant;
        ok: Variant;
        cancel: Variant;
    };

    const variants: Variants = {
        add: {
            color: 'primary',
            icon: faPlus
        },
        edit: {
            color: 'primary',
            icon: faPenToSquare
        },
        delete: {
            color: 'warning',
            icon: faTrashCan
        },
        ok: {
            color: 'tertiary',
            icon: faCheck
        },
        cancel: {
            color: 'warning',
            icon: faXmark
        }
    };

    let color: string;
    let icon: IconDefinition;

    $: color = variants[variant].color ?? 'primary';
    $: icon = variants[variant].icon ?? faPlus;
</script>

<button
    class="aspect-square bg-{color}-400 dark:bg-{color}-600 flex items-center justify-center p-{padding} rounded w-min {classes}"
    on:click={action}
>
    <Fa {icon} />
</button>
