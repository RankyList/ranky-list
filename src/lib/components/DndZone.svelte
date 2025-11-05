<script lang="ts">
	import { m } from '@/paraglide/messages';
	import type { DndItem } from '@/types/Dnd';
	import { Grip } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import {
		dndzone,
		dragHandle,
		dragHandleZone,
		SHADOW_ITEM_MARKER_PROPERTY_NAME,
		type DndEvent,
		type Options
	} from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	// Constants

	const DURATION = 150;

	// Props
	let {
		children,
		class: className = '',
		isHandleZone = false,
		items = $bindable([]),
		itemClass = '',
		trailingItem,
		type
	}: {
		children?: Snippet<[DndItem<any>]>;
		class?: string;
		isHandleZone?: boolean;
		items: DndItem<any>[];
		itemClass?: string;
		trailingItem?: Snippet;
		type: string;
	} = $props();

	// Methods

	const handleSort = (e: CustomEvent<DndEvent<DndItem<any>>>) => {
		items = e.detail.items as DndItem<any>[];
	};

	const dragZone = (element: HTMLUListElement, options: Options<DndItem<any>>) => {
		return isHandleZone ? dragHandleZone(element, options) : dndzone(element, options);
	};
</script>

<ul
	class={className}
	onconsider={handleSort}
	onfinalize={handleSort}
	use:dragZone={{
		dropTargetStyle: {},
		items,
		flipDurationMs: DURATION,
		type
	} as any}
>
	{#each items as item (`${item.id}${item[SHADOW_ITEM_MARKER_PROPERTY_NAME] ? '_' + item[SHADOW_ITEM_MARKER_PROPERTY_NAME] : ''}`)}
		<li
			animate:flip={{ duration: DURATION }}
			class="relative flex items-stretch {itemClass}"
			id={item.id}
		>
			<!-- Handle -->
			{#if isHandleZone}
				<div
					use:dragHandle
					aria-label={m.tierlist_drag_handle_for({ label: item.label ?? '' })}
					class="grid items-center bg-background px-2 sm:px-4"
				>
					<Grip />
				</div>
			{/if}

			<!-- Content -->
			{@render children?.(item)}

			<!-- Placeholder Shadow -->
			{#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
				{#if isHandleZone}
					<span class="visible absolute inset-0 bg-foreground/5"></span>
				{:else}
					<span class="visible absolute inset-y-0 w-[5.1875rem] bg-foreground/5"></span>
				{/if}
			{/if}
		</li>
	{/each}

	{@render trailingItem?.()}
</ul>
