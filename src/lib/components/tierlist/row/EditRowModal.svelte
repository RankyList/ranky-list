<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Pen } from '@lucide/svelte';
	import { defaultRanksColorsHex } from '@/stores/colors';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	import Button from '@/components/ui/button/button.svelte';
	import type { TierlistRowType } from '@/types/Dnd';
	import { mode } from 'mode-watcher';

	// Props

	let {
		row = $bindable()
	}: {
		row: TierlistRowType;
	} = $props();

	// States

	let isOpen = $state(false);
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class="cursor-pointer">
		<Pen />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title
				><span
					class="mr-6 block py-[0.25em] break-all"
					contenteditable
					oninput={(e) => (row.label = e.currentTarget.innerText)}>{row.label}</span
				></Dialog.Title
			>
		</Dialog.Header>

		<div class="space-y-4">
			<!-- Default Colors -->
			<ul class="flex flex-wrap justify-between gap-1">
				{#each $defaultRanksColorsHex[mode.current] as color (color)}
					<li class="flex">
						<Button
							class="size-9 cursor-pointer rounded"
							onclick={() => {
								isOpen = false;
								row.data.color = color;
							}}
							variant="link"
							style="background-color: {color};"
						></Button>
					</li>
				{/each}
			</ul>

			<!-- Custom Color -->
			<div class="text-center">
				<ColorPicker
					bind:hex={row.data.color}
					components={ChromeVariant}
					sliderDirection="horizontal"
				/>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
