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
    export let classes: string = '';
    export let variant: keyof Variants = 'add';

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

    let colors: string;
    let icon: IconDefinition;

    $: colors = `
        bg-${variants[variant].color ?? variants.add.color}-400
        dark:bg-${variants[variant].color ?? variants.add.color}-600
    `;
    $: icon = variants[variant].icon ?? faPlus;
</script>

<button
    class="aspect-square {colors} flex h-[45px] items-center justify-center rounded w-min {classes}"
    on:click={action}
>
    <Fa {icon} />
</button>
