<script lang="ts">
    import { AccordionGroup, AccordionItem } from '@brainandbones/skeleton';
    import type { tierlistItem, tierlistRank } from '$src/lib/types/tierlist';
    import { openModal } from '$lib/mixins/openModal';

    import EditItemModal from './EditItemModal.svelte';
    import EditRankModal from './EditRankModal.svelte';
    import TierlistItem from './TierlistItem.svelte';
    import TierlistItems from './TierlistItems.svelte';
    import TierlistRank from './TierlistRank.svelte';

    let items: tierlistItem[] = [];

    // For testing
    for (let i = 0; i < 40; i++) {
        items.push({
            description: 'Description',
            id: i.toString(),
            image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
            title: 'Test item'
        })
    }

    let ranks = [
        {
            color: '#ff0000',
            description: 'Description',
            id: '1',
            items: [
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
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
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
                },
                {
                    description: 'Description',
                    id: 'test',
                    image: 'https://i.ytimg.com/vi/cJWojzF3wq8/hqdefault.jpg',
                    title: 'Test item'
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
                id: 'test',
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

    const openItemModal = (props: tierlistItem) => {
        openModal(EditItemModal, props);
    };

    const openRankModal = (props: tierlistRank) => {
        openModal(EditRankModal, props);
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
                                <TierlistItem {item} {openItemModal} />
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
