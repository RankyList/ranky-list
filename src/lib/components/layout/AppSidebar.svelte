<script lang="ts">
	import HouseIcon from '@lucide/svelte/icons/house';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ThemeSwitcher from '$lib/components/layout/ThemeSwitcher.svelte';
	import { getLocale, setLocale, locales, type Locale } from '@/paraglide/runtime';
	import { m } from '@/paraglide/messages';
	import getUnicodeFlagIcon from 'country-flag-icons/unicode';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	const flags = {
		en: getUnicodeFlagIcon('gb'),
		zh: getUnicodeFlagIcon('cn'),
		hi: getUnicodeFlagIcon('in'),
		es: getUnicodeFlagIcon('es'),
		ar: getUnicodeFlagIcon('sa'),
		fr: getUnicodeFlagIcon('fr')
	};
</script>

<Sidebar.Root class="!block" collapsible="icon">
	<!-- Header -->
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a href="/" {...props}>
							<HouseIcon />
							<span>Home</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<!-- Content -->
	<Sidebar.Content></Sidebar.Content>
	<!-- Footer -->
	<Sidebar.Footer>
		<Sidebar.Menu>
			<!-- Language -->
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								aria-label={m.layout_change_language()}
								class="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								size="lg"
								{...props}
							>
								<div class="flex aspect-square size-8 items-center justify-center rounded-lg">
									{flags[getLocale()]}
								</div>
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width)" align="start">
						{#each locales.filter((locale) => locale !== getLocale()) as locale (locale)}
							<DropdownMenu.Item
								class="flex justify-between"
								onSelect={() => setLocale(locale as Locale)}
							>
								<span>{m.locale({}, { locale })}</span>
								<span>{flags[locale]}</span>
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
			<!-- Theme -->
			<Sidebar.MenuItem>
				<ThemeSwitcher />
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
