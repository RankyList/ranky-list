<script lang="ts">
	import DndZone from '@/components/DndZone.svelte';
	import ItemFormModal from '@/components/tierlist/item/ItemFormModal.svelte';
	import TierlistItem from '@/components/tierlist/item/TierlistItem.svelte';
	import EditRowModal from '@/components/tierlist/row/EditRowModal.svelte';
	import * as AlertDialog from '@/components/ui/alert-dialog/index.js';
	import Button from '@/components/ui/button/button.svelte';
	import { m } from '@/paraglide/messages.js';
	import type { TierlistItemType, TierlistRowType } from '@/types/Dnd';
	import type { Uuid } from '@/types/Uuid';
	import { Trash } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	// Props

	const {
		handleDelete,
		handleUpdate,
		row
	}: {
		handleDelete: (id: Uuid) => void;
		handleUpdate: (row: TierlistRowType) => void;
		row: TierlistRowType;
	} = $props();

	// States

	let deletingItemId = $state<Uuid>();

	let rowState = $state(row);

	let showDeleteItemAlert = $state(false);

	// Methods

	const deleteItem = () => {
		rowState.data.items = rowState.data.items.filter(
			(item: TierlistItemType) => item.id !== deletingItemId
		);

		showDeleteItemAlert = false;
	};

	const handleDeleteItem = (id: Uuid) => {
		deletingItemId = id;

		showDeleteItemAlert = true;
	};

	const handleItemSubmit = (item: TierlistItemType) => {
		const itemIndex = rowState.data.items.findIndex((i: TierlistItemType) => i.id === item.id);

		if (itemIndex !== undefined) {
			rowState.data.items[itemIndex] = item;
		} else {
			rowState.data.items.push(item);
		}
	};

	// Effects

	// Update row
	$effect(() => {
		handleUpdate(rowState);
	});
</script>

{#snippet itemSnippet(item: TierlistItemType)}
	<ItemFormModal handleDelete={handleDeleteItem} handleSubmit={handleItemSubmit} {item}>
		<TierlistItem {...item} />
	</ItemFormModal>
{/snippet}

<div class="flex w-full items-center gap-2 bg-background px-2 sm:gap-4 sm:px-4">
	<!-- Edit Modal -->
	<EditRowModal row={rowState} />

	<!-- Content -->
	<div class="flex grow">
		<!-- Header -->
		<div
			class="{rowState.data
				.className} grid min-h-20.75 w-[4em] shrink-0 cursor-text place-items-center p-[1em] break-all text-black sm:w-[8em]"
			contenteditable
			bind:innerText={rowState.label}
			style="background-color: {rowState.data.color};"
		>
			{rowState.label}
		</div>

		<!-- Items -->
		<DndZone
			children={itemSnippet as Snippet<[TierlistItemType | TierlistRowType]>}
			class="flex grow flex-wrap border-crust"
			bind:items={rowState.data.items}
			type="tierlist-item"
		/>
	</div>

	<!-- Remove Button -->
	<Button
		aria-label={`${m.tierlist_remove_row()} ${rowState.label}`}
		class="cursor-pointer"
		onclick={() => handleDelete(rowState.id)}
		variant="destructive"
		size="icon"
	>
		<Trash />
	</Button>
</div>

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
