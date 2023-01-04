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
    import type { Variants } from '$lib/types/buttonIcon';

    export let action: (e: Event) => void;
    export let classes = '';
    export let variant: keyof Variants = 'add';

    const variants: Variants = {
        add: {
            color: 'dark:bg-primary-400 dark:bg-primary-600',
            icon: faPlus
        },
        edit: {
            color: 'bg-primary-400 dark:bg-primary-600',
            icon: faPenToSquare
        },
        delete: {
            color: 'bg-warning-400 dark:bg-warning-600',
            icon: faTrashCan
        },
        ok: {
            color: 'bg-tertiary-400 dark:bg-tertiary-600',
            icon: faCheck
        },
        cancel: {
            color: 'bg-warning-400 dark:bg-warning-600',
            icon: faXmark
        }
    };

    let colors: string;
    let icon: IconDefinition;

    $: colors = variants[variant].color ?? variants.add.color;
    $: icon = variants[variant].icon ?? faPlus;
</script>

<button
    class="aspect-square {colors} flex h-[45px] items-center justify-center rounded w-min {classes}"
    on:click={action}
>
    <Fa {icon} />
</button>
