<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import ThemeSwitcher from '@/components/layout/ThemeSwitcher.svelte';
	import * as DropdownMenu from '@/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '@/components/ui/sidebar/index.js';
	import { m } from '@/paraglide/messages.js';
	import { getLocale, locales, localizeHref } from '@/paraglide/runtime.js';
	import HouseIcon from '@lucide/svelte/icons/house';
	import getUnicodeFlagIcon from 'country-flag-icons/unicode';

	const flags = {
		en: getUnicodeFlagIcon('gb'),
		zh: getUnicodeFlagIcon('cn'),
		hi: getUnicodeFlagIcon('in'),
		es: getUnicodeFlagIcon('es'),
		ar: getUnicodeFlagIcon('sa'),
		fr: getUnicodeFlagIcon('fr')
	};
</script>

<Sidebar.Root class="block!" collapsible="icon">
	<!-- Header -->
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a href={resolve('/')} {...props}>
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
								<span class="flex aspect-square size-8 items-center justify-center rounded-lg">
									{flags[getLocale()]}
								</span>
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width)" align="start">
						{#each locales.filter((locale) => locale !== getLocale()) as locale (locale)}
							<DropdownMenu.Item class="flex justify-between">
								<a
									class="w-full"
									data-sveltekit-reload
									href={resolve(localizeHref(page.url.pathname, { locale }) as '/')}
								>
									{m.locale({}, { locale })}
								</a>
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
