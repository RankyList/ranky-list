<script lang="ts">
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    import ButtonIcon from '$component/icon/ButtonIcon.svelte';
    import TierListItem from '$component/tier-list/TierListItem.svelte';

    import type { ParentModalProp } from '$type/modal';
    import type { Prisma } from '@prisma/client';

    export let addItem: () => void;
    export let items: Prisma.TierListItemUncheckedCreateWithoutTierListInput[];
    export let openItemModal: (props: ParentModalProp) => void;
</script>

<Accordion class="card fixed bottom-0 left-0 right-0 shadow-lg" spacing="space-y-0">
    <AccordionItem class="w-full" open>
        <svelte:fragment slot="summary">
            <ButtonIcon action={addItem} classes="ml-auto" ariaLabel="Add an item" />
        </svelte:fragment>
        <svelte:fragment slot="content">
            <div
                class="
                    grid
                    h-40
                    grid-cols-[repeat(auto-fill,minmax(90px,auto))]
                    justify-center gap-1 overflow-y-auto sm:h-56 md:h-52
                    xl:h-60
                    2xl:h-52
                "
            >
                {#each items as item}
                    <TierListItem {item} {openItemModal} />
                {/each}
            </div>
        </svelte:fragment>
    </AccordionItem>
</Accordion>
