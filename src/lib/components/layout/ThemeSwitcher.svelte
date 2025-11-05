<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { m } from '@/paraglide/messages';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button class="size-8 cursor-pointer" onclick={toggleMode} variant="ghost" size="icon">
	<Sun class="scale-100 rotate-0 motion-safe:!transition-all dark:scale-0 dark:-rotate-90" />
	<Moon
		class="absolute scale-0 rotate-90 motion-safe:!transition-all dark:scale-100 dark:rotate-0"
	/>
	<span class="sr-only">{m.layout_toggle_theme()}</span>
</Button>
