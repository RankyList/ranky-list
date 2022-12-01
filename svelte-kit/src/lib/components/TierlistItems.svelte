<script lang="ts">
    import { AccordionGroup, AccordionItem } from '@brainandbones/skeleton';
    import TierlistItem from './TierlistItem.svelte';

    export let addItem: any;

    type array = {
        description: string;
        image: string;
        title: string;
    };
    export let items: array[];
    export let openItemModal: any;
</script>

<AccordionGroup class="card bottom-0 fixed left-0 right-0 shadow-lg">
    <AccordionItem class="w-full" open>
        <svelte:fragment slot="summary">
            <button class="btn | bg-primary-600" on:click={addItem}>
                Add item
            </button>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <div
                class="
                gap-2
                grid
                grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 2xl:grid-cols-[repeat(16,auto)]
                h-40 sm:h-56 md:h-52 xl:h-60 2xl:h-52
                overflow-y-auto
            "
            >
                {#each items as item}
                    <TierlistItem {item} {openItemModal} />
                {/each}
            </div>
        </svelte:fragment>
    </AccordionItem>
</AccordionGroup>
