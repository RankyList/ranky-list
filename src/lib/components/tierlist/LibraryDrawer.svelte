<script lang="ts">
	import * as AlertDialog from '@/components/ui/alert-dialog/index.js';
	import * as Card from '@/components/ui/card/index.js';
	import * as Drawer from '@/components/ui/drawer/index.js';
	import * as Tooltip from '@/components/ui/tooltip/index.js';
	import { LOCALSTORAGE_SAVED_TIERLISTS_KEY } from '@/constants';
	import { m } from '@/paraglide/messages.js';
	import type { TierlistType } from '@/types/Dnd';
	import { Trash } from '@lucide/svelte';

	import Button from '../ui/button/button.svelte';

	// Props

	let {
		loadAction,
		open = $bindable(false),
		savedTierlists,
		showAlert = $bindable(false)
	}: {
		loadAction: (tierlist: TierlistType) => void;
		open?: boolean;
		savedTierlists: TierlistType[];
		showAlert: boolean;
	} = $props();

	// States

	let deletedTierlist = $state<TierlistType>();

	// Methods

	const deleteSavedTierlist = (tierlist?: TierlistType) => {
		if (!tierlist) {
			return;
		}

		// Update state
		savedTierlists = savedTierlists.filter((t) => t !== tierlist);

		// Update localstorage
		window.localStorage.setItem(LOCALSTORAGE_SAVED_TIERLISTS_KEY, JSON.stringify(savedTierlists));

		// Close alert
		showAlert = false;
	};

	const handleDeleteTierlist = (tierlist: TierlistType) => {
		// Set the currentlty deleted tierlist
		deletedTierlist = tierlist;

		// Show confirmation alert
		showAlert = true;
	};
</script>

<!-- Library drawer -->
<Drawer.Root bind:open>
	<Drawer.Content>
		<div class="container mx-auto max-h-[50dvh] overflow-y-auto">
			<Drawer.Header>
				<Drawer.Title>{m.library_title()}</Drawer.Title>
			</Drawer.Header>

			<!-- Tierlists -->
			<ul class="grid grid-cols-[repeat(auto-fill,minmax(var(--container-xs),1fr))] gap-4 px-1">
				{#each savedTierlists as tierlist (tierlist.title)}
					<li class="relative">
						<!-- Card -->
						<Tooltip.Provider>
							<Tooltip.Root delayDuration={200}>
								<Tooltip.Trigger class="w-full">
									<Card.Root
										aria-label={`Load ${tierlist.title}`}
										class="aspect-[1.61803] cursor-pointer justify-center p-4 text-center text-pretty hover:bg-surface0 focus-visible:bg-surface0"
										onclick={() => loadAction(tierlist)}
										tabindex={0}
									>
										<Card.Content class="text-2xl font-semibold">
											<span class="line-clamp-2">{tierlist.title}</span>
										</Card.Content>
									</Card.Root>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<p>{m.library_load()} <span class="sr-only">: {tierlist.title}</span></p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>

						<!-- Remove button -->
						<Card.Action
							class="absolute inset-e-4 top-4 data-[size=sm]:inset-e-3 data-[size=sm]:top-3"
						>
							<Tooltip.Provider>
								<Tooltip.Root delayDuration={200}>
									<Tooltip.Trigger>
										<Button
											class="cursor-pointer"
											onclick={() => handleDeleteTierlist(tierlist)}
											size="icon"
											variant="destructive"
										>
											<Trash />
										</Button>
									</Tooltip.Trigger>
									<Tooltip.Content>
										<p>
											{m.library_remove()} <span class="sr-only">: {tierlist.title}</span>
											{m.library_from_saved_tierlists()}
										</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</Tooltip.Provider>
						</Card.Action>
					</li>
				{/each}
			</ul>
			<Drawer.Footer></Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>

<!-- Delete alert dialog -->
<AlertDialog.Root bind:open={showAlert}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{m.tierlist_alert_title()}</AlertDialog.Title>
			<AlertDialog.Description>
				{m.tierlist_alert_delete_description()}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel class="cursor-pointer">{m.alert_cancel()}</AlertDialog.Cancel>
			<AlertDialog.Action
				class="cursor-pointer"
				onclick={() => deleteSavedTierlist(deletedTierlist)}
				variant="destructive">{m.alert_continue()}</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
