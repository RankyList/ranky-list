<script lang="ts">
	import { Trash } from '@lucide/svelte';
	import EditRowModal from '$lib/components/tierlist/row/EditRowModal.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import DndZone from '@/components/DndZone.svelte';
	import TierlistItem from '$lib/components/tierlist/item/TierlistItem.svelte';
	import ItemFormModal from '$lib/components/tierlist/item/ItemFormModal.svelte';
	import type { Uuid } from '@/types/Uuid';
	import type { TierlistItemType, TierlistRowType } from '@/types/Dnd';

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

	let rowState = $state(row);

	// Methods

	const handleItemDelete = (id: Uuid) => {
		rowState.data.items = rowState.data.items.filter((item: TierlistItemType) => item.id !== id);
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
	<ItemFormModal handleDelete={handleItemDelete} handleSubmit={handleItemSubmit} {item}>
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
				.className} grid min-h-[5.1875rem] w-[4em] shrink-0 cursor-text place-items-center p-[1em] break-all text-black sm:w-[8em]"
			contenteditable
			bind:innerText={rowState.label}
			style="background-color: {rowState.data.color};"
		>
			{rowState.label}
		</div>

		<!-- Items -->
		<DndZone
			children={itemSnippet}
			class="flex grow flex-wrap border-crust"
			bind:items={rowState.data.items}
			type="tierlist-item"
		/>
	</div>

	<!-- Remove Button -->
	<!-- TODO : Fix hydration_mismatch -->
	<Button
		class="cursor-pointer"
		onclick={() => handleDelete(rowState.id)}
		variant="destructive"
		size="icon"
	>
		<Trash />
	</Button>
</div>
