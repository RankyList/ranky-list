<script lang="ts">
    import { AccordionGroup, AccordionItem } from '@brainandbones/skeleton';
    import { openModal } from '../mixins/openModal';

    import EditItemModal from './EditItemModal.svelte';
    import EditRankModal from './EditRankModal.svelte';
    import TierlistItem from './TierlistItem.svelte';
    import TierlistItems from './TierlistItems.svelte';
    import TierlistRank from './TierlistRank.svelte';

    let items = [
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        },
        {
            description: 'Description',
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'item de test'
        }
    ];

    let ranks = [
        {
            color: '#ff0000',
            description: 'Description',
            id: '1',
            items: [
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                }
            ],
            title: 'S'
        },
        {
            color: '#00ff00',
            description: 'Description',
            id: '2',
            items: [
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                },
                {
                    description: 'Description',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'item de test'
                }
            ],
            title: 'A'
        }
    ];

    let editing = false;

    const addItem = () => {
        items = [
            ...items,
            {
                description: 'description',
                image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                title: 'title'
            }
        ];
    };

    const addRank = () => {
        ranks = [
            ...ranks,
            {
                color: '#888888',
                description: 'Description',
                id: 'id',
                items: [],
                title: 'New Rank'
            }
        ];
    };

    const deleteRank = (id: string) => {
        ranks = ranks.filter((rank) => rank.id !== id);
    };

    const openItemModal = (props: any) => {
        openModal(EditItemModal, { ...props });
    };

    const openRankModal = (props: any) => {
        openModal(EditRankModal, { ...props });
    };
</script>

<div class="card | gap-2 grid py-4">
    <AccordionGroup collapse={false} padding="px-4 py-2" spacing="space-y-0">
        {#each ranks as rank}
            <AccordionItem open>
                <svelte:fragment slot="summary">
                    <span class="hidden">{rank.title}</span>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <div
                        class="
                        gap-2
                        grid
                        lg:grid-cols-[1.25fr,8fr,min-content]
                        2xl:grid-cols-[1.25fr,11fr,min-content]
                    "
                    >
                        <TierlistRank {rank} {openRankModal} />
                        <div
                            class="
                            gap-2
                            grid
                            grid-cols-3
                            sm:grid-cols-4
                            md:grid-cols-5
                            lg:grid-cols-8
                            2xl:grid-cols-11
                        "
                        >
                            {#each rank.items as item}
                                <TierlistItem {item} {openItemModal}  />
                            {/each}
                        </div>
                        <button
                            class="btn | self-center aspect bg-warning-600 h-min mx-auto"
                            on:click={() => deleteRank(rank.id)}
                        >
                            Delete rank
                        </button>
                    </div>
                </svelte:fragment>
            </AccordionItem>
        {/each}
    </AccordionGroup>
    <button class="btn | bg-tertiary-600 mx-4 xl:mx-auto xl:w-min" on:click={addRank}>
        Add rank
    </button>
</div>

<TierlistItems {items} {addItem} {openItemModal} />
