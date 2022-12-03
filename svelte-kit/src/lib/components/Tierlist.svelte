<script lang="ts">
    import { AccordionGroup, AccordionItem } from '@brainandbones/skeleton';

    import type { TierlistItemType, TierlistRankType } from '$src/lib/types/tierlist';
    import { openModal } from '$lib/mixins/openModal';
    import ButtonIcon from '$lib/components/ButtonIcon.svelte';
    import EditItemModal from '$lib/components/EditItemModal.svelte';
    import EditRankModal from '$lib/components/EditRankModal.svelte';
    import TierlistItem from '$lib/components/TierlistItem.svelte';
    import TierlistItems from '$lib/components/TierlistItems.svelte';
    import TierlistRank from '$lib/components/TierlistRank.svelte';

    const addItem = () => {
        items = [
            ...items,
            {
                description: 'description',
                image: 'https://steamuserimages-a.akamaihd.net/ugc/91599028260504242/274F8D314829AA1EE2594594AD5D7D45E2A3D93F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
                position: null,
                rankId: null,
                title: 'title'
            }
        ];
    };

    const addRank = () => {
        ranks = [
            ...ranks,
            {
                color: rankColors[ranks.length] ?? rankColors[rankColors.length - 1],
                description: 'Description',
                id: 'TODO: id',
                position: ranks.length,
                title: 'New Rank'
            }
        ];
    };

    const deleteRank = (rank: TierlistRankType) => {
        ranks = ranks.filter((r) => r !== rank);
    };

    const openItemModal = (props: Record<string, any>) => {
        openModal(EditItemModal, { ...props, updateItem });
    };

    const openRankModal = (props: Record<string, any>) => {
        openModal(EditRankModal, { ...props, updateRank });
    };

    const updateItem = (item: TierlistItemType) => {
        items = [...items.filter((i) => i !== item), item];
    };

    const updateRank = (newRank: TierlistRankType) => {
        ranks = [...ranks.filter((r) => r !== newRank), newRank];
    };

    const rankColors: string[] = [
        '#ef4444',
        '#f59e0b',
        '#84cc16',
        '#10b981',
        '#06b6d4',
        '#3b82f6',
        '#8b5cf6',
        '#d946ef',
        '#f43f5e'
    ];

    let items: TierlistItemType[] = [];

    let ranks: TierlistRankType[] = [
        {
            color: '#ef4444',
            description: 'Description',
            id: 'TODO: 1',
            position: 1,
            title: 'S'
        },
        {
            color: '#f59e0b',
            description: 'Description',
            id: 'TODO: 2',
            position: 2,
            title: 'A'
        }
    ];

    // For testing
    for (let i = 0; i < 20; i++) {
        items.push({
            description: 'Description',
            image: 'https://steamuserimages-a.akamaihd.net/ugc/91599028260504242/274F8D314829AA1EE2594594AD5D7D45E2A3D93F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
            position: i + 1,
            rankId: ranks[0].id,
            title: 'Test item'
        });
    }
    for (let i = 0; i < 50; i++) {
        items.push({
            description: 'Description',
            image: 'https://steamuserimages-a.akamaihd.net/ugc/91599028260504242/274F8D314829AA1EE2594594AD5D7D45E2A3D93F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
            position: null,
            rankId: null,
            title: 'Test item'
        });
    }
</script>

<div class="card | gap-2 grid py-4">
    <AccordionGroup collapse={false} padding="px-4 py-2" spacing="space-y-0">
        <span class="grid">
            {#each ranks as rank}
                <span style="order: {rank.position}">
                    <AccordionItem open>
                        <svelte:fragment slot="summary">
                            <span class="hidden" />
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                            <div
                                class="
                                row |
                                gap-1
                                grid
                                grid-cols-[auto,3rem]
                                lg:grid-cols-[1.25fr,8fr,min-content]
                                2xl:grid-cols-[1.25fr,11fr,min-content]
                                grid-rows-[3rem]
                                lg:grid-rows-[max-content]
                            "
                            >
                                <TierlistRank {rank} {openRankModal} classes="row__rank" />
                                <ButtonIcon
                                    action={() => deleteRank(rank)}
                                    classes="row__button | h-full lg:h-auto"
                                    variant="delete"
                                />
                                <div class="
                                    row__items |
                                    gap-1
                                    grid
                                    grid-cols-[repeat(auto-fill,minmax(90px,auto))]
                                    justify-start
                                    lg:justify-center"
                                >
                                    {#each items.filter(({ rankId }) => rankId === rank.id) as item}
                                        <TierlistItem {item} {openItemModal} />
                                    {/each}
                                </div>
                            </div>
                        </svelte:fragment>
                    </AccordionItem>
                </span>
            {/each}
        </span>
    </AccordionGroup>
    <ButtonIcon action={addRank} classes="mx-auto" />
</div>

<TierlistItems items={items.filter(({ rankId }) => rankId === null)} {addItem} {openItemModal} />

<style lang="scss">
    .row {
        grid-template-areas:
            "rank button"
            "items items"
        ;

        &__rank {
            grid-area: rank;
        }

        &__button {
            grid-area: button;
        }

        &__items {
            grid-area: items;
        }

        @media (min-width: 1024px){
            grid-template-areas:
                "rank items button"
            ;
        }
    }
</style>
