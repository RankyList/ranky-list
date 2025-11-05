<script lang="ts">
	import type { TierlistItemType } from '@/types/Dnd';

	// Props
	const { data, label }: TierlistItemType = $props();
</script>

<article
	class="grid aspect-square h-[5em] cursor-pointer place-items-center bg-cover bg-center p-4 text-black"
	style="background-color: {data.color}; background-image: url({data.imageUrl});"
>
	{label}
</article>
