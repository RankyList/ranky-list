<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import DndZone from '@/components/DndZone.svelte';
	import ItemFormModal from '@/components/tierlist/item/ItemFormModal.svelte';
	import TierlistItem from '@/components/tierlist/item/TierlistItem.svelte';
	import TierlistRow from '@/components/tierlist/row/TierlistRow.svelte';
	import * as AlertDialog from '@/components/ui/alert-dialog/index.js';
	import Button, { buttonVariants } from '@/components/ui/button/button.svelte';
	import * as Kbd from '@/components/ui/kbd/index.js';
	import * as Tooltip from '@/components/ui/tooltip/index.js';
	import {
		ACTION_RESET_DURATION,
		DEFAULT_RANKS_COLORS,
		LOCALSTORAGE_SAVED_TIERLISTS_KEY
	} from '@/constants';
	import { m } from '@/paraglide/messages.js';
	import type { TierlistItemType, TierlistRowType, TierlistType } from '@/types/Dnd';
	import type { JSONTierlistItem, JSONTierlistRow } from '@/types/JSON';
	import type { LocalizedString } from '@inlang/paraglide-js';
	import {
		Bookmark,
		Camera,
		Check,
		ClipboardCheck,
		Download,
		LoaderCircle,
		Plus,
		Save,
		Share2
	} from '@lucide/svelte';
	import slugify from '@sindresorhus/slugify';
	import { domToWebp } from 'modern-screenshot';
	import { type Snippet, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import LibraryDrawer from './LibraryDrawer.svelte';

	// Action Methods

	const handleLoad = () => {
		actions.library.loading = true;
		showLibrary = true;
	};

	const handleSave = () => {
		actions.save.loading = true;

		// Get saved tierlists
		savedTierlists = JSON.parse(
			window.localStorage.getItem(LOCALSTORAGE_SAVED_TIERLISTS_KEY) ?? '[]'
		) as TierlistType[];

		// Update state
		savedTierlists = [
			...savedTierlists.filter((t) => t.title !== title),
			{
				items,
				rows,
				title
			}
		];

		// Update
		window.localStorage.setItem(LOCALSTORAGE_SAVED_TIERLISTS_KEY, JSON.stringify(savedTierlists));

		// Update UI

		actions.save.loading = false;
		actions.save.success = true;

		window.setTimeout(() => {
			actions.save.success = false;
		}, ACTION_RESET_DURATION);
		// }
	};

	const handleScreenshot = async () => {
		actions.screenshot.loading = true;

		domToWebp(rowsElement).then((dataUrl) => {
			const link = document.createElement('a');

			link.download = `${slugify(title)}.webp`;
			link.href = dataUrl;
			link.click();

			// Update UI

			actions.screenshot.loading = false;
			actions.screenshot.success = true;

			window.setTimeout(() => {
				actions.screenshot.success = false;
			}, ACTION_RESET_DURATION);
		});
	};

	const handleShare = () => {
		actions.share.loading = true;

		navigator.clipboard.writeText(getShareURL(items, rows));

		// Update UI

		actions.share.loading = false;
		actions.share.success = true;

		window.setTimeout(() => {
			actions.share.success = false;
		}, ACTION_RESET_DURATION);
	};

	// Constants

	const ACTIONS = [
		[
			{
				action: handleLoad,
				icon: Bookmark,
				id: 'library',
				label: m.tierlist_library(),
				successIcon: Check
			},
			{
				action: handleSave,
				icon: Save,
				id: 'save',
				label: m.tierlist_save(),
				successIcon: Check
			}
		],
		[
			{
				action: handleScreenshot,
				icon: Camera,
				id: 'screenshot',
				label: m.tierlist_screenshot(),
				successIcon: Download
			},
			{
				action: handleShare,
				icon: Share2,
				id: 'share',
				label: m.tierlist_share(),
				successIcon: ClipboardCheck
			}
		]
	] as const;

	const DEFAULT_RANKS = ['SS', 'S', 'A', 'B', 'C', 'D', 'F'] as const;

	const NEW_RANK_LABEL = 'R';

	// States

	let actions = $state(
		Object.fromEntries(ACTIONS.flat().map(({ id }) => [id, { loading: false, success: false }]))
	);

	let deletingItem = $state<TierlistItemType>();
	let deletingRow = $state<TierlistRowType>();

	let items: TierlistItemType[] = $state([]);

	let loadingTierlist = $state<TierlistType>();

	let rows: TierlistRowType[] = $state(
		DEFAULT_RANKS.map((rank, i) => ({
			data: {
				className: DEFAULT_RANKS_COLORS[i],
				color: null,
				items: []
			},
			id: crypto.randomUUID(),
			label: rank
		}))
	);

	let savedTierlists = $state<TierlistType[]>([]);

	let showDeleteItemAlert = $state(false);
	let showDeleteRowAlert = $state(false);
	let showDeleteTierlistAlert = $state(false);
	let showLibrary = $state(false);
	let showLoadAlert = $state(false);

	let title = $state<LocalizedString | string>(m.tierlist_title());

	// Derived

	let isSaved = $derived.by(() => {
		// If page not loaded, return saved
		if (!browser) {
			return true;
		}

		// If nothing saved, return not saved
		if (savedTierlists.length <= 0) {
			return false;
		}

		// Make a replacer to remove ids value from items and rows
		const replacer = (
			key: string,
			value: TierlistItemType[keyof TierlistItemType] | TierlistRowType[keyof TierlistRowType]
		) => (key === 'id' ? undefined : value);

		// Return true if current tierlist is saved
		return savedTierlists.some(
			(t) => JSON.stringify(t, replacer) === JSON.stringify({ items, rows, title }, replacer)
		);
	});

	// Variables

	let rowsElement: HTMLElement;

	// Methods

	const handleKeyDown = (e: KeyboardEvent) => {
		if (!e.ctrlKey && !e.metaKey) {
			return;
		}

		if (e.key === 's') {
			e.preventDefault();

			handleSave();
		}
	};

	// Library drawer methods

	const handleLoadTierlist = (tierlist: TierlistType) => {
		loadingTierlist = tierlist;

		if (isSaved) {
			loadTierlist();
		} else {
			showLoadAlert = true;
		}
	};

	const loadTierlist = () => {
		if (!loadingTierlist) {
			return;
		}

		// Update state

		items = loadingTierlist.items;
		rows = loadingTierlist.rows;
		title = loadingTierlist.title;

		// Update UI

		showLoadAlert = false;
		showLibrary = false;
		actions.library.success = true;

		window.setTimeout(() => {
			actions.library.success = false;
		}, ACTION_RESET_DURATION);
	};

	// Tierlist Methods

	const createItem = (item: TierlistItemType) => {
		items.push(item);
	};

	const createRow = () => {
		rows.push({
			data: {
				className: DEFAULT_RANKS_COLORS.at(-1) ?? '',
				color: null,
				items: []
			},
			id: crypto.randomUUID(),
			label: NEW_RANK_LABEL
		});
	};

	const deleteItem = () => {
		if (!deletingItem) {
			return;
		}

		items = items.filter((i) => i !== deletingItem);

		showDeleteItemAlert = false;
	};

	const deleteRow = () => {
		if (!deletingRow) {
			return;
		}

		const rowItems = deletingRow.data.items;

		rows = rows.filter((r) => r !== deletingRow);
		items = [...items, ...rowItems];

		showDeleteRowAlert = false;
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

	const handleDeleteItem = (itemId: string) => {
		deletingItem = items.find(({ id }) => id === itemId);

		showDeleteItemAlert = true;
	};

	const handleDeleteRow = (rowId: string) => {
		deletingRow = rows.find(({ id }) => id === rowId);

		showDeleteRowAlert = true;
	};

	// Helper Methods

	/**
	 * Convert tierlist to URL parameters
	 */
	const getShareURL = (items: TierlistItemType[], rows: TierlistRowType[]) => {
		const itemsParam = encodeURIComponent(btoa(itemsToJSON(items)));
		const rowsParam = encodeURIComponent(btoa(rowsToJSON(rows)));

		return `${page.url.origin}?items=${itemsParam}&rows=${rowsParam}`;
	};

	/**
	 * Convert items state to optimized JSON
	 */
	const itemsToJSON = (items: TierlistItemType[]) => {
		const newItems: JSONTierlistItem[] = [];

		for (const item of items) {
			const newItem: JSONTierlistItem = JSON.parse(JSON.stringify(item));

			delete newItem.id;

			if (!newItem.data?.color) {
				delete newItem.data?.color;
			}

			newItems.push(newItem);
		}

		return JSON.stringify(newItems);
	};

	/**
	 * Convert URL parameters to variables
	 */
	const paramsToVariables = (items: TierlistItemType[], rows: TierlistRowType[]) => {
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

	/**
	 * Convert rows state to optimized JSON
	 */
	const rowsToJSON = (rows: TierlistRowType[]) => {
		const newRows: JSONTierlistRow[] = [];

		// Remove unused properties

		for (const row of rows) {
			const newRow: JSONTierlistRow = JSON.parse(JSON.stringify(row));

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

	// Load data from URL
	onMount(() => {
		const itemsParam = decodeURIComponent(page.url.searchParams.get('items') ?? '');
		const rowsParam = decodeURIComponent(page.url.searchParams.get('rows') ?? '');

		if (!itemsParam && !rowsParam) {
			return;
		}

		const itemsParsed: TierlistItemType[] = JSON.parse(atob(itemsParam));
		const rowsParsed: TierlistRowType[] = JSON.parse(atob(rowsParam));

		const { newItems, newRows } = paramsToVariables(itemsParsed, rowsParsed);

		items = newItems;
		rows = newRows;
	});

	// Load saved tierlists
	onMount(() => {
		savedTierlists = JSON.parse(
			window.localStorage.getItem(LOCALSTORAGE_SAVED_TIERLISTS_KEY) ?? '[]'
		) as TierlistType[];
	});

	// Effects

	// Disable loading state when closing drawer
	$effect(() => {
		if (!showLibrary) {
			actions.library.loading = false;
		}
	});
</script>

<!-- Snippets -->

{#snippet rowSnippet(row: TierlistRowType)}
	<TierlistRow {row} handleDelete={handleDeleteRow} handleUpdate={updateRow} />
{/snippet}

{#snippet itemSnippet(item: TierlistItemType)}
	<ItemFormModal handleDelete={handleDeleteItem} handleSubmit={updateItem} {item}>
		<TierlistItem {...item} />
	</ItemFormModal>
{/snippet}

{#snippet createItemSnippet()}
	<li>
		<ItemFormModal handleDelete={deleteItem} handleSubmit={createItem}>
			<span class="grid aspect-square h-[5em] place-items-center">
				<Plus />
			</span>
		</ItemFormModal>
	</li>
{/snippet}

<!-- Window -->
<svelte:window on:keydown={handleKeyDown} />

<!-- Top Bar -->
<div class="flex flex-wrap items-center">
	<!-- Shortcuts -->
	<div class="hidden flex-col items-center gap-4 md:flex">
		<p class="text-sm text-muted-foreground">
			<Kbd.Root>Ctrl + S</Kbd.Root>
			- {m.tierlist_save()}
		</p>
	</div>

	<!-- Actions -->
	<ul class="ms-auto flex flex-wrap gap-4">
		{#each ACTIONS as actionGroup (actionGroup)}
			<li>
				<ul class="flex flex-wrap gap-2">
					{#each actionGroup as { action, icon: Icon, id, label, successIcon: SuccessIcon } (id)}
						<li>
							<Tooltip.Provider>
								<Tooltip.Root delayDuration={200}>
									<Tooltip.Trigger
										aria-label={label}
										class={buttonVariants({
											class: 'cursor-pointer',
											size: 'icon',
											variant: 'secondary'
										})}
										onclick={action}
									>
										{#if actions[id].success}
											<span
												class="absolute"
												in:fade={{ duration: 150 }}
												out:fade={{ duration: 600 }}
											>
												<SuccessIcon class="text-green" />
											</span>
										{:else if actions[id].loading}
											<LoaderCircle class="absolute animate-spin" />
										{:else}
											<span
												class="absolute"
												in:fade={{ duration: 600 }}
												out:fade={{ duration: 150 }}
											>
												<Icon />
											</span>
										{/if}
									</Tooltip.Trigger>
									<Tooltip.Content>
										<p>{label}</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</Tooltip.Provider>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>

<!-- Header -->
<header class="mx-auto prose dark:prose-invert">
	<h1
		bind:innerText={title}
		class={`mb-1 py-[0.125em] text-center break-all ${isSaved ? '' : "after:content-['*']"}`}
		contenteditable
	>
		{title}
	</h1>
</header>

<!-- Rows -->
<div class="grid justify-stretch">
	<div bind:this={rowsElement} id="rows">
		<!-- Show rows when page is loaded -->
		{#if browser}
			<DndZone
				class="tierlist"
				children={rowSnippet as Snippet<[TierlistItemType | TierlistRowType]>}
				isHandleZone
				bind:items={rows}
				type="tierlist-row"
			/>
		{/if}
	</div>

	<Button
		aria-label={m.tierlist_new_row()}
		class="mx-auto my-4 cursor-pointer"
		onclick={createRow}
		variant="secondary"
		size="icon"
	>
		<Plus />
	</Button>
</div>

<!-- Items -->
<DndZone
	children={itemSnippet as Snippet<[TierlistItemType | TierlistRowType]>}
	class="me-2 flex min-h-20 min-w-20 flex-wrap overflow-clip rounded border-[3px] border-crust font-bold sm:me-4"
	bind:items
	trailingItem={createItemSnippet as Snippet}
	type="tierlist-item"
/>

<!-- Saved tierlists drawer -->
<LibraryDrawer
	loadAction={handleLoadTierlist}
	bind:open={showLibrary}
	{savedTierlists}
	bind:showAlert={showDeleteTierlistAlert}
/>

<!-- Delete item alert dialog -->
<AlertDialog.Root bind:open={showDeleteItemAlert}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{m.tierlist_alert_title()}</AlertDialog.Title>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel class="cursor-pointer">{m.alert_cancel()}</AlertDialog.Cancel>
			<AlertDialog.Action class="cursor-pointer" onclick={deleteItem} variant="destructive"
				>{m.alert_continue()}</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<!-- Delete row alert dialog -->
<AlertDialog.Root bind:open={showDeleteRowAlert}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{m.tierlist_alert_title()}</AlertDialog.Title>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel class="cursor-pointer">{m.alert_cancel()}</AlertDialog.Cancel>
			<AlertDialog.Action class="cursor-pointer" onclick={deleteRow} variant="destructive"
				>{m.alert_continue()}</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<!-- Load tierlist alert dialog -->
<AlertDialog.Root bind:open={showLoadAlert}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{m.tierlist_alert_title()}</AlertDialog.Title>
			<AlertDialog.Description>
				The current tierlist has not been saved, do you want to load a new tierlist?
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel class="cursor-pointer">{m.alert_cancel()}</AlertDialog.Cancel>
			<AlertDialog.Action class="cursor-pointer" onclick={loadTierlist} variant="destructive"
				>{m.alert_continue()}</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
