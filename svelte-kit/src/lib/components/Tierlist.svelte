<script lang="ts">
    import { AccordionGroup, AccordionItem } from '@brainandbones/skeleton';
    import type { TierlistItemType, TierlistRankType } from '$src/lib/types/tierlist';
    import { openModal } from '$lib/mixins/openModal';

    import EditItemModal from '$lib/components/EditItemModal.svelte';
    import EditRankModal from '$lib/components/EditRankModal.svelte';
    import TierlistItem from '$lib/components/TierlistItem.svelte';
    import TierlistItems from '$lib/components/TierlistItems.svelte';
    import TierlistRank from '$lib/components/TierlistRank.svelte';

    let items: TierlistItemType[] = [];

    // For testing
    for (let i = 0; i < 20; i++) {
        items.push({
            description: 'Description',
            id: i.toString(),
            image: 'https://steamuserimages-a.akamaihd.net/ugc/91599028260504242/274F8D314829AA1EE2594594AD5D7D45E2A3D93F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
            position: i + 1,
            rankId: '1',
            title: 'Test item'
        });
    }
    for (let i = 0; i < 40; i++) {
        items.push({
            description: 'Description',
            id: i.toString(),
            image: 'https://steamuserimages-a.akamaihd.net/ugc/91599028260504242/274F8D314829AA1EE2594594AD5D7D45E2A3D93F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
            position: null,
            rankId: null,
            title: 'Test item'
        });
    }

    let ranks = [
        {
            color: '#ff0000',
            description: 'Description',
            id: '1',
            position: 1,
            title: 'S'
        },
        {
            color: '#00ff00',
            description: 'Description',
            id: '2',
            position: 2,
            title: 'A'
        }
    ];

    const addItem = () => {
        items = [
            ...items,
            {
                description: 'description',
                id: 'test',
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
                color: '#888888',
                description: 'Description',
                id: 'test',
                position: ranks.length,
                title: 'New Rank'
            }
        ];
    };

    const deleteRank = (id: string) => {
        ranks = ranks.filter((rank) => rank.id !== id);
    };

    const openItemModal = (props: Record<string, any>) => {
        openModal(EditItemModal, { ...props, updateItem });
    };

    const openRankModal = (props: Record<string, any>) => {
        openModal(EditRankModal, { ...props, updateRank });
    };

    const updateItem = (item: TierlistItemType) => {
        items = [...items.filter(({ id }) => id !== item.id), item];
    };

    const updateRank = (newRank: TierlistRankType) => {
        ranks = [...ranks.filter(({ id }) => id !== newRank.id), newRank];
    };
</script>

<div class="card | gap-2 grid py-4">
    <AccordionGroup collapse={false} padding="px-4 py-2" spacing="space-y-0">
        <span class="grid">
            {#each ranks as rank}
                <span style="order: {rank.position}">
                    <AccordionItem open>
                        <svelte:fragment slot="summary">
                            <span class="hidden">{rank.title}</span>
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                            <div
                                class="
                                gap-4
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
                                    {#each items.filter(({ rankId }) => rankId === rank.id) as item}
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
                </span>
            {/each}
        </span>
    </AccordionGroup>
    <button class="btn | bg-primary-600 mx-4 xl:mx-auto xl:w-min" on:click={addRank}>
        Add rank
    </button>
</div>

<TierlistItems items={items.filter(({ rankId }) => rankId === null)} {addItem} {openItemModal} />
