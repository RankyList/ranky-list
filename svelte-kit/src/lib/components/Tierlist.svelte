<script lang="ts">
    import { AccordionGroup, AccordionItem } from '@brainandbones/skeleton';
    import {dndzone} from "svelte-dnd-action";

    import type { TierlistItemType, TierlistRankType } from '$src/lib/types/tierlist';
    import { openModal } from '$lib/mixins/openModal';
    import ButtonIcon from '$lib/components/ButtonIcon.svelte';
    import EditItemModal from '$lib/components/EditItemModal.svelte';
    import EditRankModal from '$lib/components/EditRankModal.svelte';
    import TierlistItem from '$lib/components/TierlistItem.svelte';
    import TierlistItems from '$lib/components/TierlistItems.svelte';
    import TierlistRank from '$lib/components/TierlistRank.svelte';

    const addItem = () => {
        unAsignedItems = [
            ...unAsignedItems,
            {
                description: 'description',
                id: 'TODO: id',
                image: 'https://steamuserimages-a.akamaihd.net/ugc/91599028260504242/274F8D314829AA1EE2594594AD5D7D45E2A3D93F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
                position: unAsignedItems.length + 1,
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
                items: [],
                position: ranks.length,
                title: 'New Rank'
            }
        ];
    };

    const deleteItem = (item: TierlistItemType) => {
        let rank: TierlistRankType|null = null;

        ranks.every((r) => {
            let found = false

            r.items.every((i) => {
                if(i === item){
                    rank = r
                    found = true
                    return false
                }

                return true
            })

            return !found
        })

        if(rank){
            rank.items = [
                ...rank.items.filter((i) => i !== item)
            ]

            updateRank(rank)
        } else {
            unAsignedItems = [
                ...unAsignedItems.filter((i) => i !== item) 
            ]
        }
    }

    const deleteRank = (rank: TierlistRankType) => {
        ranks = ranks.filter((r) => r !== rank);
    };

    const handleDndConsider = (e: CustomEvent, key: number) => {
        ranks[key].items = e.detail.items
        ranks = [...ranks]
    }

    const handleDndFinalize = (e: CustomEvent, key: number) => {
        ranks[key].items = e.detail.items
        ranks = [...ranks]
    }

    const openItemModal = (props: Record<string, any>) => {
        openModal(EditItemModal, { ...props, deleteItem, updateItem });
    };

    const openRankModal = (props: Record<string, any>) => {
        openModal(EditRankModal, { ...props, updateRank });
    };

    const updateItem = (item: TierlistItemType) => {
        let rank: TierlistRankType|null = null;

        ranks.every((r) => {
            let found = false
            
            r.items.every((i) => {
                if(i === item){
                    rank = r
                    found = true
                    return false
                }

                return true
            })

            return !found
        })

        if(rank){
            rank.items = rank.items.filter((i) => i !== item)
            updateRank(rank)
        } else {
            unAsignedItems = unAsignedItems.filter((i) => i !== item)
        }
    };

    const updateRank = (rank: TierlistRankType) => {
        ranks = [...ranks.filter((r) => r !== rank), rank];
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

    let ranks: TierlistRankType[];
    let unAsignedItems: TierlistItemType[];

    //===== For testing =====//
    ranks = [
        {
            color: '#ef4444',
            description: 'Description',
            id: 'TODO: 1',
            items: [],
            position: 1,
            title: 'S'
        },
        {
            color: '#f59e0b',
            description: 'Description',
            id: 'TODO: 2',
            items: [],
            position: 2,
            title: 'A'
        }
    ];
    unAsignedItems = [];

    // S tier

    for (let i = 0; i < 20; i++) {
        ranks[0].items.push({
            description: 'Description',
            id: `TODO: ${i.toString()}`,
            image: 'https://spectacularnwt.com/sites/default/files/styles/gallery_featured/public/SAHTU-GREATBEAR_0.jpg?itok=El52ELPW',
            position: i + 1,
            title: 'Test item'
        });
    }

    // A tier

    for (let i = 20; i < 30; i++) {
        ranks[1].items.push({
            description: 'Description',
            id: `TODO: ${i.toString()}`,
            image: 'https://www.qub.ac.uk/home/media/Media,697153,en.jpg',
            position: i + 1,
            title: 'Test item'
        });
    }

    // Unranked

    for (let i = 30; i < 100; i++) {
        unAsignedItems.push({
            description: 'Description',
            id: `TODO: ${i.toString()}`,
            image: 'https://www.visitpittsburgh.com/imager/s3_amazonaws_com/visit-pittsburgh/CMS/1920X1080/skyline-night-1_fe6446416451ad8dd6946604554e4620.jpg',
            position: i,
            title: 'Test item'
        });
    }
    //===== For testing =====//
</script>

<div class="card | gap-2 grid py-4">
    <AccordionGroup collapse={false} padding="px-4 py-2" spacing="space-y-0">
        <span class="grid">
            {#each ranks as tier, key}
                <span style={`order: ${tier.position}`}>
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
                                grid-cols-[auto,max-content]
                                lg:grid-cols-[1.25fr,8fr,min-content]
                                2xl:grid-cols-[1.25fr,11fr,min-content]
                                grid-rows-[45px]
                                lg:grid-rows-[max-content]
                            "
                            >
                                <TierlistRank rank={tier} {openRankModal} classes="row__rank" />
                                <ButtonIcon
                                    action={() => deleteRank(tier)}
                                    classes="row__button"
                                    variant="delete"
                                />
                                <div
                                    class="
                                    row__items |
                                    gap-1
                                    grid
                                    grid-cols-[repeat(auto-fill,minmax(96px,auto))]
                                    justify-start
                                    lg:justify-center"
                                    use:dndzone={{items: tier.items, centreDraggedOnCursor: true}}
                                    on:consider={(e) => handleDndConsider(e, key)}
                                    on:finalize={(e) => handleDndFinalize(e, key)}
                                >
                                    {#each tier.items as item(item.id)}
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

<TierlistItems items={unAsignedItems} {addItem} {openItemModal} />

<style lang="scss">
    .row {
        grid-template-areas:
            'rank button'
            'items items';

        &__rank {
            grid-area: rank;
        }

        &__button {
            grid-area: button;
        }

        &__items {
            grid-area: items;
        }

        @media (min-width: 1024px) {
            grid-template-areas: 'rank items button';
        }
    }
</style>
