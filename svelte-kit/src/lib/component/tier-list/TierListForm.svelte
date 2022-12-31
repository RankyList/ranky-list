<script lang="ts">
    import { AccordionGroup, AccordionItem } from '@skeletonlabs/skeleton';
    import slugify from 'slugify';

    import ButtonIcon from '$component/icon/ButtonIcon.svelte';
    import EditItemModal from '$component/modal/EditItemModal.svelte';
    import EditRankModal from '$component/modal/EditRankModal.svelte';
    import { openModal } from '$lib/mixin/modal/openModal';

    import TierListItem from './TierListItem.svelte';
    import TierListItems from './TierListItems.svelte';
    import TierListRank from './TierListRank.svelte';

    import type { ParentModalProp } from '$type/modal';
    import type { Prisma } from '@prisma/client';

    import { enhance } from '$app/forms';

    export let action = '';

    export let tierList: Prisma.TierListCreateArgs['data'] = {
        name: '',
        slug: '',
    };

    const defaultRankColors = ['#ef4444', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e'];

    let ranks: Prisma.TierListRankUncheckedCreateWithoutTierListInput[] = [];

    let items: Prisma.TierListItemUncheckedCreateWithoutTierListInput[] = [];

    $: tierList.slug = slugify(tierList.name, {
        lower: true,
        trim: true,
        strict: true,
    });

    $: unassignedItems = items.filter((item) => !item.tierListRankId);

    const addItem = () => {
        items = [
            ...items,
            {
                name: 'Test',
                position: items.length,
            },
        ];
    };

    const addRank = () => {
        ranks = [
            ...ranks,
            {
                name: 'New Rank',
                description: 'Description',
                color: defaultRankColors[ranks.length] ?? defaultRankColors.at(-1),
                position: ranks.length,
            },
        ];
    };

    const deleteRank = (rank: Prisma.TierListRankUncheckedCreateWithoutTierListInput) => {
        ranks = ranks.filter((r) => r !== rank);
    };

    const openItemModal = (props: ParentModalProp) => {
        openModal(EditItemModal, { ...props, updateItem });
    };

    const openRankModal = (props: ParentModalProp) => {
        openModal(EditRankModal, { ...props, updateRank });
    };

    const updateRank = (newRank: Prisma.TierListRankUncheckedCreateWithoutTierListInput) => {
        ranks = [...ranks.filter((r) => r !== newRank), newRank];
    };

    const updateItem = (item: Prisma.TierListItemUncheckedCreateWithoutTierListInput) => {
        items = [...items.filter((i) => i !== item), item];
    };
</script>

<form class="grid gap-10" method="post" {action} use:enhance>
    <div class="grid grid-cols-2 gap-5">
        <label>
            <span>Name</span>
            <input required name="name" bind:value={tierList.name} class="input-group__input | h-full" type="text" />
        </label>
        <label>
            <span>Slug URL</span>
            <input disabled value={tierList.slug} class="input-group__input | h-full" type="text" />
        </label>
    </div>
    <label>
        <span>Description</span>
        <textarea name="description" bind:value={tierList.description} class="input-group__input | h-full" />
    </label>
    <div class="card | grid gap-2 py-4">
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
                                        grid
                                        grid-cols-[auto,3rem]
                                        grid-rows-[3rem]
                                        gap-1
                                        lg:grid-cols-[1.25fr,8fr,min-content]
                                        lg:grid-rows-[max-content]
                                        2xl:grid-cols-[1.25fr,11fr,min-content]
                                    "
                                >
                                    <TierListRank {rank} {openRankModal} classes="row__rank" />
                                    <ButtonIcon
                                        action={() => deleteRank(rank)}
                                        classes="row__button | h-full lg:h-auto"
                                        variant="delete"
                                        ariaLabel="Delete"
                                    />
                                    <div
                                        class="
                                            row__items |
                                            grid
                                            grid-cols-[repeat(auto-fill,minmax(90px,auto))]
                                            justify-start
                                            gap-1
                                            lg:justify-center
                                        "
                                    >
                                        {#each items.filter(({ tierListRankId }) => tierListRankId === rank.id) as item}
                                            <TierListItem {item} {openItemModal} />
                                        {/each}
                                    </div>
                                </div>
                            </svelte:fragment>
                        </AccordionItem>
                    </span>
                {/each}
            </span>
        </AccordionGroup>
        <ButtonIcon action={addRank} classes="mx-auto" ariaLabel="Add a rank" />
    </div>
    <button class="btn btn-filled-primary btn-base" type="submit">Save</button>
</form>

<TierListItems items={unassignedItems} {addItem} {openItemModal} />

<style lang="scss">
    .row {
        grid-template-areas:
            'rank button'
            'items items';

        &__items {
            grid-area: items;
        }

        @media (min-width: 1024px) {
            grid-template-areas: 'rank items button';
        }
    }
</style>
