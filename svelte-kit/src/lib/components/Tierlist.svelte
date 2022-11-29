<script lang="ts">
    import { AccordionGroup, AccordionItem, modalStore, type ModalComponent, type ModalSettings } from '@brainandbones/skeleton';
    import TierlistRank from './TierlistRank.svelte';
    import TierlistItem from '$src/lib/components/TierlistItem.svelte';
    import type { ComponentType } from 'svelte';

    let rows = [
        {
            color: '#f00',
            description: 'Description',
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
                },
            ],
            title: 'Eclaté au sol de fouuuu'
        },
        {
            color: '#0f0',
            description: 'Description',
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
                },
            ],
            title: 'Eclaté au sol de fouuuuuuuuuu'
        }
    ];

    const addNewRow = () => {
        rows = [
            ...rows,
            {
                color: '#888',
                description: 'Description',
                items: [],
                title: 'New Rank'
            }
        ]
    }

    function openModal(component: ComponentType, props: any): void {
        const modalComponent: ModalComponent = {
            ref: component,
            props: props,
        };
        const d: ModalSettings = {
            type: 'component',
            component: modalComponent
        };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        modalStore.trigger(d);
    }
</script>

<div class="card | !bg-surface-200 dark:!bg-surface-800 gap-2 grid py-4">
    <AccordionGroup collapse={false} padding="px-4 py-2" spacing="space-y-0">
        {#each rows as { color, description, items, title }}
            <AccordionItem open>
                <svelte:fragment slot="summary">
                    <span class="hidden">{title}</span>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="gap-2 grid lg:grid-cols-[1.25fr,8fr] 2xl:grid-cols-[1.25fr,11fr]">
                        <TierlistRank {color} {description} {title} {openModal} />
                        <div
                            class="gap-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 2xl:grid-cols-11"
                        >
                            {#each items as item}
                                <TierlistItem {...item} {openModal} />
                            {/each}
                        </div>
                    </div>
                </svelte:fragment>
            </AccordionItem>
        {/each}
    </AccordionGroup>
    <button class="btn-icon | bg-primary-500 flex font-mono mx-auto text-2xl" on:click={addNewRow}>+</button>
</div>
