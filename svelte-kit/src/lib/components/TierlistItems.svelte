<script lang="ts">
    import { AccordionGroup, AccordionItem } from '@brainandbones/skeleton';

    import type { TierlistItemType } from '$src/lib/types/tierlist';
    import ButtonIcon from '$lib/components/ButtonIcon.svelte';
    import TierlistItem from '$lib/components/TierlistItem.svelte';

    export let addItem: () => void;
    export let items: TierlistItemType[];
    export let openItemModal: (props: Record<string, any>) => void;
</script>

<AccordionGroup class="card bottom-0 fixed left-0 right-0 shadow-lg" spacing="space-y-0">
    <AccordionItem class="w-full" open>
        <svelte:fragment slot="summary">
            <ButtonIcon action={addItem} classes="ml-auto" />
        </svelte:fragment>
        <svelte:fragment slot="content">
            <div
                class="
                    gap-1
                    grid
                    grid-cols-[repeat(auto-fill,minmax(90px,auto))]
                    h-40 sm:h-56 md:h-52 xl:h-60 2xl:h-52
                    justify-center
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
