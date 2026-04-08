<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import type { TierlistItemType } from '@/types/Dnd';

	// Props
	const { data, label }: TierlistItemType = $props();
</script>

{#snippet image()}
	<img
		alt=""
		class="h-full min-w-full object-cover"
		decoding="async"
		height="80"
		loading="lazy"
		src={data.imageUrl}
		width="80"
	/>
{/snippet}

<article
	class="relative h-[5em] min-w-[5em] cursor-pointer bg-cover bg-center text-black"
	style="background-color: {data.color};"
>
	{#if data.imageUrl}
		{#if label}
			<Tooltip.Provider>
				<Tooltip.Root delayDuration={200}>
					<Tooltip.Trigger
						aria-label={`${m.tierlist_edit_item()} ${label}`}
						class="h-full min-w-full cursor-pointer"
					>
						{@render image()}
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>{label}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		{:else}
			{@render image()}
		{/if}
	{:else}
		<span class="absolute inset-0 grid place-items-center p-4 break-all">{label}</span>
	{/if}
</article>
