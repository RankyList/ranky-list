<script lang="ts">
    import { faPenToSquare, faCheck, faPlus, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
    import FaIcon from 'svelte-fa';

    import type { Variants } from '$type/button-variant';

    export let href: null | string = null;
    export let ariaLabel: string;
    export let action: (e: MouseEvent) => void;
    export let classes = '';
    export let padding = 4;
    export let variant: keyof Variants = 'add';

    const variants: Variants = {
        add: {
            color: 'primary',
            icon: faPlus,
        },
        edit: {
            color: 'primary',
            icon: faPenToSquare,
        },
        delete: {
            color: 'warning',
            icon: faTrashCan,
        },
        ok: {
            color: 'tertiary',
            icon: faCheck,
        },
        cancel: {
            color: 'warning',
            icon: faXmark,
        },
    };

    $: currentVariant = variants[variant];
    $: classProp = `aspect-square bg-${currentVariant.color}-400 dark:bg-${currentVariant.color}-600 flex items-center justify-center p-${padding} w-min rounded ${classes}`;
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
