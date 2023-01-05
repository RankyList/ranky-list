<script lang="ts">
    import { faPenToSquare, faCheck, faPlus, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
    import FaIcon from 'svelte-fa';

    import type { Variants } from '$type/button-variant';

    export let href: null | string = null;
    export let ariaLabel: string;
    export let action: (e: MouseEvent) => void;
    export let classes = '';
    export let variant: keyof Variants = 'add';

    const variants: Variants = {
        add: {
            color: 'bg-primary-400 dark:bg-primary-600',
            icon: faPlus,
        },
        edit: {
            color: 'bg-primary-400 dark:bg-primary-600',
            icon: faPenToSquare,
        },
        delete: {
            color: 'bg-warning-400 dark:bg-warning-600',
            icon: faTrashCan,
        },
        ok: {
            color: 'bg-tertiary-400 dark:bg-tertiary-600',
            icon: faCheck,
        },
        cancel: {
            color: 'bg-warning-400 dark:bg-warning-600',
            icon: faXmark,
        },
    };

    $: currentVariant = variants[variant];
    $: classProp = `aspect-square ${currentVariant.color} flex h-[45px] items-center justify-center rounded w-min ${classes}`;
</script>

{#if !href}
    <button type="button" class={classProp} on:click|preventDefault={action} aria-label={ariaLabel}>
        <FaIcon icon={currentVariant.icon} />
    </button>
{:else}
    <a class={classProp} {href}>
        <FaIcon icon={currentVariant.icon} aria-label={ariaLabel} />
    </a>
{/if}
