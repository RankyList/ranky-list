<script lang="ts">
    import { AccordionGroup, AccordionItem } from '@brainandbones/skeleton';
    import { v4 as uuidv4 } from 'uuid';

    import type { TierlistItemType, TierlistRankType } from '$src/lib/types/tierlist';
    import { openModal } from '$lib/mixins/openModal';
    import ButtonIcon from '$lib/components/ButtonIcon.svelte';
    import EditItemModal from '$lib/components/EditItemModal.svelte';
    import EditRankModal from '$lib/components/EditRankModal.svelte';
    import TierlistItem from '$lib/components/TierlistItem.svelte';
    import TierlistItems from '$lib/components/TierlistItems.svelte';
    import TierlistRank from '$lib/components/TierlistRank.svelte';

    const rankColors = [
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

    let ranks = [
        {
            color: '#ef4444',
            description: 'Description',
            id: uuidv4(),
            position: 1,
            title: 'S'
        },
        {
            color: '#f59e0b',
            description: 'Description',
            id: uuidv4(),
            position: 2,
            title: 'A'
        }
    ];

    const addItem = () => {
        items = [
            ...items,
            {
                description: 'description',
                id: uuidv4(),
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
                id: uuidv4(),
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

    // For testing
    for (let i = 0; i < 20; i++) {
        items.push({
            description: 'Description',
            id: uuidv4(),
            image: 'https://steamuserimages-a.akamaihd.net/ugc/91599028260504242/274F8D314829AA1EE2594594AD5D7D45E2A3D93F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
            position: i + 1,
            rankId: ranks[0].id,
            title: 'Test item'
        });
    }
    for (let i = 0; i < 40; i++) {
        items.push({
            description: 'Description',
            id: uuidv4(),
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
                            <span class="hidden">{rank.title}</span>
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                            <div
                                class="
                                gap-1
                                grid
                                lg:grid-cols-[1.25fr,8fr,min-content]
                                2xl:grid-cols-[1.25fr,11fr,min-content]
                            "
                            >
                                <TierlistRank {rank} {openRankModal} />
                                <div
                                    class="
                                    gap-1
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
                                <ButtonIcon action={() => deleteRank(rank.id)} variant="delete" />
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
