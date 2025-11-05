<script lang="ts">
	import DndZone from '$lib/components/DndZone.svelte';
	import TierlistRow from '$lib/components/tierlist/row/TierlistRow.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Camera, ClipboardCheck, Download, LoaderCircle, Plus, Share2 } from '@lucide/svelte';
	import { defaultRanksColors } from '@/stores/colors';
	import ItemFormModal from '$lib/components/tierlist/item/ItemFormModal.svelte';
	import TierlistItem from '$lib/components/tierlist/item/TierlistItem.svelte';
	import type { TierlistItemType, TierlistRowType } from '@/types/Dnd';
	import { fade } from 'svelte/transition';
	import type { JSONTierlistItem, JSONTierlistRow } from '@/types/JSON';
	import { m } from '@/paraglide/messages';
	import slugify from '@sindresorhus/slugify';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { domToWebp } from 'modern-screenshot';

	// Constants

	const ACTION_RESET_DURATION = 2500;
	const DEFAULT_RANKS = ['SS', 'S', 'A', 'B', 'C', 'D', 'F'];

	// States

	let actions = $state({
		screenshot: {
			loading: false,
			success: false
		},
		URL: {
			loading: false,
			success: false
		}
	});

	let items: TierlistItemType[] = $state([]);

	let rows: TierlistRowType[] = $state(
		DEFAULT_RANKS.map((rank, i) => ({
			data: {
				className: $defaultRanksColors[i],
				color: null,
				items: []
			},
			id: crypto.randomUUID(),
			label: rank
		}))
	);

	let title = $state(m.tierlist_title());

	// Variables

	let rowsElement: HTMLElement;

	// Action Methods

	const handleCopy = () => {
		actions.URL.loading = true;

		navigator.clipboard.writeText(getShareURL(items, rows));

		actions.URL.loading = false;
		actions.URL.success = true;

		window.setTimeout(() => {
			actions.URL.success = false;
		}, ACTION_RESET_DURATION);
	};

	const handleScreenshot = async () => {
		actions.screenshot.loading = true;

		domToWebp(rowsElement).then((dataUrl) => {
			const link = document.createElement('a');
			link.download = `${slugify(title)}.webp`;
			link.href = dataUrl;
			link.click();

			actions.screenshot.loading = false;
			actions.screenshot.success = true;

			window.setTimeout(() => {
				actions.screenshot.success = false;
			}, ACTION_RESET_DURATION);
		});
	};

	// Tierlist Methods

	const createItem = (item: TierlistItemType) => {
		items.push(item);
	};

	const createRow = () => {
		rows.push({
			data: {
				className: $defaultRanksColors.at(-1) ?? '',
				color: null,
				items: []
			},
			id: crypto.randomUUID(),
			label: 'R'
		});
	};

	const deleteItem = (itemId: string) => {
		const item = items.find(({ id }) => id === itemId);

		if (!item) {
			return;
		}

		items = items.filter((i) => i !== item);
	};

	const deleteRow = (rowId: string) => {
		const row = rows.find(({ id }) => id === rowId);

		if (!row) {
			return;
		}

		const rowItems = row.data.items;

		rows = rows.filter((r) => r !== row);
		items = [...items, ...rowItems];
	};

	const updateItem = (item: TierlistItemType) => {
		const itemIndex = items.findIndex((i: TierlistItemType) => i.id === item.id);

		items[itemIndex] = item;
	};

	const updateRow = (row: TierlistRowType) => {
		const rowIndex = rows.findIndex(({ id }) => id === row.id);

		const newRow = row;

		rows[rowIndex] = newRow;
	};

	// Helper Methods

	const getShareURL = (items: TierlistItemType[], rows: TierlistRowType[]) => {
		const itemsParam = encodeURIComponent(btoa(itemsToJSON(items)));
		const rowsParam = encodeURIComponent(btoa(rowsToJSON(rows)));

		return `${page.url.origin}?items=${itemsParam}&rows=${rowsParam}`;
	};

	const itemsToJSON = (items: TierlistItemType[]) => {
		const newItems: JSONTierlistItem[] = [];

		for (const item of items) {
			const newItem: JSONTierlistItem = { ...item };

			delete newItem.id;

			if (!newItem.data?.color) {
				delete newItem.data?.color;
			}

			newItems.push(newItem);
		}

		return JSON.stringify(newItems);
	};

	const paramsToState = (items: TierlistItemType[], rows: TierlistRowType[]) => {
		let newItems: TierlistItemType[] = [];
		let newRows: TierlistRowType[] = [];

		if (items.length) {
			items.forEach((item) => {
				item.id = crypto.randomUUID();

				if (item.data.color === undefined) {
					item.data.color = null;
				}
			});

			newItems = items;
		}

		if (rows.length) {
			rows.forEach((row) => {
				row.id = crypto.randomUUID();

				if (row.data.color === undefined) {
					row.data.color = null;
				}

				if (row.label === undefined) {
					row.label = '';
				}

				if (row.data.items === undefined) {
					row.data.items = [];
				} else {
					row.data.items.forEach((item) => {
						item.id = crypto.randomUUID();

						if (item.data.color === undefined) {
							item.data.color = null;
						}
					});
				}
			});

			newRows = rows;
		}

		return {
			newItems,
			newRows
		};
	};

	const rowsToJSON = (rows: TierlistRowType[]) => {
		const newRows: JSONTierlistRow[] = [];

		// Remove unused properties

		for (const row of rows) {
			const newRow: JSONTierlistRow = { ...row };

			delete newRow.id;

			if (!newRow.data?.color) {
				delete newRow.data?.color;
			}

			if (newRow.label === '') {
				delete newRow.label;
			}

			if (newRow.data?.items && newRow.data.items.length < 1) {
				delete newRow.data?.items;
			} else {
				newRow.data?.items?.forEach((item) => {
					delete item.id;

					if (!item.data?.color) {
						delete item.data?.color;
					}
				});
			}

			newRows.push(newRow);
		}

		return JSON.stringify(newRows);
	};

	// Life-Cycle

	onMount(() => {
		// Load data from URL

		const itemsParam = decodeURIComponent(page.url.searchParams.get('items') ?? '');
		const rowsParam = decodeURIComponent(page.url.searchParams.get('rows') ?? '');

		if (!itemsParam && !rowsParam) {
			return;
		}

		const itemsParsed: TierlistItemType[] = JSON.parse(atob(itemsParam));
		const rowsParsed: TierlistRowType[] = JSON.parse(atob(rowsParam));

		const { newItems, newRows } = paramsToState(itemsParsed, rowsParsed);

		items = newItems;
		rows = newRows;
	});
</script>

{#snippet rowSnippet(row: TierlistRowType)}
	<TierlistRow {row} handleDelete={deleteRow} handleUpdate={updateRow} />
{/snippet}

{#snippet itemSnippet(item: TierlistItemType)}
	<ItemFormModal handleDelete={deleteItem} handleSubmit={updateItem} {item}>
		<TierlistItem {...item} />
	</ItemFormModal>
{/snippet}

{#snippet createItemSnippet()}
	<ItemFormModal handleDelete={deleteItem} handleSubmit={createItem}>
		<span class="grid aspect-square h-[5em] place-items-center">
			<Plus />
		</span>
	</ItemFormModal>
{/snippet}

<!-- Actions -->
<ul class="flex flex-wrap justify-end gap-2">
	<!-- Copy URL -->
	<li>
		<Button class="cursor-pointer" onclick={handleCopy} variant="secondary" size="icon">
			{#if actions.URL.success}
				<span class="absolute" in:fade={{ duration: 150 }} out:fade={{ duration: 600 }}>
					<ClipboardCheck class="dark:text-green" />
				</span>
			{:else if actions.URL.loading}
				<LoaderCircle class="absolute animate-spin" />
			{:else}
				<span class="absolute" in:fade={{ duration: 600 }} out:fade={{ duration: 150 }}>
					<Share2 />
				</span>
			{/if}
		</Button>
	</li>

	<!-- Download Screenshot -->
	<li>
		<Button class="cursor-pointer" onclick={handleScreenshot} variant="secondary" size="icon">
			{#if actions.screenshot.success}
				<span class="absolute" in:fade={{ duration: 150 }} out:fade={{ duration: 600 }}>
					<Download class="dark:text-green" />
				</span>
			{:else if actions.screenshot.loading}
				<LoaderCircle class="absolute animate-spin" />
			{:else}
				<span class="absolute" in:fade={{ duration: 600 }} out:fade={{ duration: 150 }}>
					<Camera />
				</span>
			{/if}
		</Button>
	</li>
</ul>

<!-- Header -->
<header class="mx-auto prose dark:prose-invert">
	<h1 bind:innerText={title} class="py-[0.125em] text-center" contenteditable>{title}</h1>
</header>

<!-- Rows -->
<section class="grid justify-stretch">
	<div bind:this={rowsElement} id="rows">
		<DndZone
			class="tierlist"
			children={rowSnippet}
			isHandleZone
			bind:items={rows}
			type="tierlist-row"
		/>
	</div>
	<Button class="mx-auto mt-4 cursor-pointer" onclick={createRow} variant="secondary" size="icon">
		<Plus />
	</Button>
</section>

<!-- Items -->
<DndZone
	children={itemSnippet}
	class="mr-2 flex min-h-[5rem] min-w-[5rem] flex-wrap overflow-clip rounded border-[3px] border-crust font-bold sm:mr-4"
	bind:items
	trailingItem={createItemSnippet}
	type="tierlist-item"
/>
