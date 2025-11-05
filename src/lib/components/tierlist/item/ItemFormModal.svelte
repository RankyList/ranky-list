<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { defaultRanksColors, defaultRanksColorsHex } from '@/stores/colors';
	import Button from '$lib/components/ui/button/button.svelte';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	import { createForm } from 'felte';
	import type { Snippet } from 'svelte';
	import type { TierlistItemType } from '@/types/Dnd';
	import { Trash } from '@lucide/svelte';
	import type { Uuid } from '@/types/Uuid';
	import { m } from '@/paraglide/messages';
	import { mode } from 'mode-watcher';

	// Props

	let {
		children,
		handleDelete,
		handleSubmit,
		item
	}: {
		children: Snippet;
		handleDelete: (id: Uuid) => void;
		handleSubmit: (item: TierlistItemType) => void;
		item?: TierlistItemType;
	} = $props();

	// Methods

	const newForm = () => {
		return createForm({
			initialValues: {
				imageUrl: item?.data.imageUrl,
				label: item?.label
			},
			onSubmit: (values) => {
				const newItem: TierlistItemType = {
					data: {
						color,
						imageUrl: values.imageUrl
					},
					id: item?.id ?? crypto.randomUUID(),
					label: values.label
				};

				if (item) {
					isOpen = false;
				} else {
					form.reset();
				}

				handleSubmit(newItem);
			}
		});
	};

	// States

	let color: string | null = $state(item?.data.color ?? null);

	let isOpen = $state(false);

	let form = $state(newForm());

	// Effects

	// Recreate form when item changes
	$effect(() => {
		if (!item) {
			return;
		}

		form = newForm();
	});
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class="cursor-pointer">
		{@render children?.()}
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="flex items-center justify-between">
				{!item ? m.tierlist_new_item() : m.tierlist_edit_item()}

				<!-- Delete Button -->
				{#if item}
					<Button
						class="mr-6 cursor-pointer"
						onclick={() => {
							isOpen = false;
							handleDelete(item?.id);
						}}
						variant="destructive"
						size="icon"
					>
						<Trash />
					</Button>
				{/if}
			</Dialog.Title>
		</Dialog.Header>

		<form use:form.form>
			<ul class="space-y-8 py-4">
				<!-- Label -->
				<li class="space-y-2">
					<Label for="item-label">{m.tierlist_label()}</Label>
					<Input id="item-label" name="label" type="text" />
				</li>

				<!-- Default Colors -->
				<li class="space-y-2">
					<Label for="color">{m.tierlist_color()}</Label>
					<ul class="flex flex-wrap justify-between gap-1">
						{#each $defaultRanksColors as defaultColor, i (defaultColor)}
							<li class="flex">
								<label class="sr-only" for="item-color-{defaultColor}"
									>{m.tierlist_color()} {i}</label
								>
								<input
									checked={color ===
										$defaultRanksColorsHex[mode.current as 'light' | 'dark'][
											$defaultRanksColors.indexOf(defaultColor)
										]}
									class="cursor-pointer appearance-none after:block after:size-9 after:rounded after:bg-current after:content-[''] checked:[outline:-webkit-focus-ring-color_auto_1px] checked:outline-offset-2"
									id="item-color-{defaultColor}"
									name="color"
									oninput={() => {
										color =
											$defaultRanksColorsHex[mode.current as 'light' | 'dark'][
												$defaultRanksColors.indexOf(defaultColor)
											];
									}}
									style="color: {$defaultRanksColorsHex[mode.current as 'light' | 'dark'][
										$defaultRanksColors.indexOf(defaultColor)
									]};"
									type="radio"
									value={color}
								/>
							</li>
						{/each}
					</ul>
				</li>

				<!-- Custom Color -->
				<li class="space-y-2">
					<Label for="custom-color">{m.tierlist_custom_color()}</Label>
					<ColorPicker
						bind:hex={color}
						components={ChromeVariant}
						label={m.tierlist_choose_a_color()}
						name="custom-color"
						sliderDirection="horizontal"
					/>
				</li>

				<!-- Image URL -->
				<li class="space-y-2">
					<Label for="image-url">{m.tierlist_image_url()}</Label>
					<Input id="image-url" name="imageUrl" type="text" />
				</li>
			</ul>

			<!-- Submit -->
			<Button class="w-full" type="submit">{m.tierlist_submit()}</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
