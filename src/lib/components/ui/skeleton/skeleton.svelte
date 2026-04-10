<script lang="ts">
	import { type WithElementRef, type WithoutChildren, cn } from '@/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="skeleton"
	class={cn('bg-muted rounded-md animate-pulse', className)}
	{...restProps}
></div>
