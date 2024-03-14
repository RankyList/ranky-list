<script lang="ts">
    import '../theme.scss';
    import '../global.scss';

    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import {
        AppShell,
        AppBar,
        LightSwitch,
        Modal,
        storePopup,
        type PopupSettings,
        popup,
        getModalStore,
        focusTrap,
        ProgressRadial,
        Avatar,
        initializeStores,
        modeCurrent,
    } from '@skeletonlabs/skeleton';
    import extend from 'just-extend';
    import { onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { MetaTags, type MetaTagsProps } from 'svelte-meta-tags';
    import { Toaster, toast } from 'svelte-sonner';

    import Logo from '$components/icon/ranky-list-logo.svg?component';
    import { initializeAuthWindowStore, getAuthWindowStore } from '$stores/auth-window';
    import { getPocketBaseImageUrl } from '$utils/url';

    import type { ModalComponentRegistry } from '$types/modal';
    import type { LayoutData } from './$types';

    import { browser } from '$app/environment';
    import { enhance } from '$app/forms';
    import { onNavigate } from '$app/navigation';
    import { page } from '$app/stores';
    import IconAlertTriangleFilled from '~icons/tabler/alert-triangle-filled';
    import IconArrowRightCircle from '~icons/tabler/arrow-right-circle';
    import IconUser from '~icons/tabler/user';

    export let data: LayoutData;

    // Initialize stores
    initializeStores();
    initializeAuthWindowStore();

    // Configure the popup store
    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    // Constants
    const modalStore = getModalStore();
    const authWindowStore = getAuthWindowStore();
    const modalComponentRegistry: ModalComponentRegistry = {};
    const userPopup: PopupSettings = {
        event: 'focus-click',
        target: 'user-popup',
        placement: 'bottom',
    };

    /**
     * When a message is received from the auth window.
     */
    const onmessage = (e: MessageEvent) => {
        if (!browser || e.origin !== window.origin) {
            return;
        }

        if (typeof e.data === 'object' && e.data.context === 'oauth' && typeof e.data?.success === 'boolean') {
            authWindowStore.detach(true);
            window.removeEventListener('message', onmessage);
        }
    };

    /**
     * When the authentication window is closed.
     */
    const handleAuthWindowClose = () => {
        if (!browser) {
            return;
        }

        const closed = authWindowStore.close(true);

        if (!closed) {
            toast.error('Sorry, something went wrong while trying to close the authentication window.');
        }
    };

    /**
     * Handle when the auth window is opened/closed.
     */
    const handleAuthWindowChange = (opened: boolean) => {
        if (!browser) {
            return;
        }

        if (opened) {
            window.addEventListener('message', onmessage);
        } else {
            window.removeEventListener('message', onmessage);
        }
    };

    // Automatically close the modal when the user is logged in
    $: if ($page.data.user) {
        modalStore.close();
    }

    // Handle when the auth window is opened/closed
    $: handleAuthWindowChange($authWindowStore.opened);

    // Merge default meta tags with page specific meta tags
    $: metaTags = extend(
        true,
        {
            robots: $page.error ? 'noindex, nofollow' : undefined,
        },
        data.baseSeo,
        $page.data.seo,
        $page.error?.seo,
    ) as MetaTagsProps;

    // Add view transitions
    onNavigate((navigation) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!document.startViewTransition) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();

                await navigation.complete;
            });
        });
    });

    onDestroy(() => {
        if (!browser) {
            return;
        }

        window.removeEventListener('message', onmessage);
    });
</script>

{#key metaTags}
    <MetaTags {...metaTags} titleTemplate={metaTags.title && metaTags.titleTemplate?.endsWith(metaTags.title) ? undefined : metaTags.titleTemplate} />
{/key}
<Modal components={modalComponentRegistry} />
<!-- TODO change the theme to reflect Skeleton ? -->
<Toaster visibleToasts={9} duration={8000} theme={$modeCurrent ? 'light' : 'dark'} />

{#if $authWindowStore.opened}
    <div
        transition:fade
        class="absolute left-0 top-0 z-[9999] flex h-full w-full flex-col items-center justify-center gap-5 bg-gray-700/90"
        use:focusTrap={true}
    >
        <ProgressRadial stroke={60} meter="stroke-primary-500" track="stroke-primary-500/30" />
        <p role="status">Authentication in progress...</p>
        {#if $authWindowStore.window}
            <div role="group" class="flex flex-row gap-3">
                <button
                    type="button"
                    class="variant-ghost btn"
                    on:click={() => {
                        $authWindowStore.window?.focus();
                    }}>Open</button
                >
                <button type="button" class="variant-ghost btn" on:click={handleAuthWindowClose}>Cancel</button>
            </div>
        {/if}
    </div>
{/if}

<AppShell aria-busy={$authWindowStore.opened}>
    <AppBar shadow="shadow" slot="header">
        <svelte:fragment slot="lead">
            <a class="flex items-center gap-3" href="/">
                <Logo height="40" width="40" role="image" aria-label="RankyList logo" />
                <span
                    class="bg-gradient-to-bl from-primary-500 from-50% to-secondary-500 box-decoration-clone bg-clip-text text-3xl text-transparent"
                >
                    RankyList
                </span>
            </a>
        </svelte:fragment>
        <div class="container mx-auto">
            <span class="hidden sm:inline">Find a tierlist</span>
            <span class="hidden sm:inline">Create a tierlist</span>
        </div>
        <svelte:fragment slot="trail">
            <div class="flex items-center gap-5">
                <LightSwitch />
                <noscript>
                    <nav aria-label="My account">
                        {#if $page.data.user}
                            <ul>
                                <li>
                                    <form action="/?/logout" method="post">
                                        <button type="submit">
                                            <span class="flex-auto">Logout</span>
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        {:else}
                            <ul>
                                <li>
                                    <a href="/login">Login</a>
                                </li>
                                <li>
                                    <a href="/register">Register</a>
                                </li>
                            </ul>
                        {/if}
                    </nav>
                </noscript>
                <button class="variant-soft-primary btn-icon" type="button" use:popup={userPopup}>
                    {#if $page.data.user}
                        <Avatar
                            src={$page.data.user.avatar
                                ? getPocketBaseImageUrl({
                                      fileName: $page.data.user.avatar,
                                      collectionIdOrName: $page.data.user.collectionId,
                                      recordId: $page.data.user.id,
                                  })
                                : undefined}
                            initials={$page.data.user.username.at(0)}
                        />
                    {:else}
                        <IconUser />
                    {/if}
                </button>
                <div data-popup="user-popup" class="card variant-filled-surface p-4">
                    <nav aria-label="My account" class="list-nav">
                        {#if $page.data.user}
                            <ul>
                                <li>
                                    <form use:enhance action="/?/logout" method="post">
                                        <button type="submit">
                                            <span class="flex-auto">Logout</span>
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        {:else}
                            <ul>
                                <li>
                                    <a href="/login">Login</a>
                                </li>
                                <li>
                                    <a href="/register">Register</a>
                                </li>
                            </ul>
                        {/if}
                    </nav>
                </div>
            </div>
        </svelte:fragment>
    </AppBar>
    <slot />
    <svelte:fragment slot="pageFooter">
        {#if $page.route.id !== '/about/enable-javascript'}
            <noscript>
                <div class="m-10">
                    <div role="alert" class="alert items-center border border-yellow-500 bg-yellow-500/60 dark:bg-yellow-200/60">
                        <div><IconAlertTriangleFilled /></div>
                        <div class="alert-message">
                            <span>Enable Javascript</span>

                            <p>
                                Javascript is currently disabled (or not available) in your browser. This will considerably lessen your experience on
                                RankyList and certain functionalities will not be available.
                            </p>
                        </div>
                        <div class="alert-actions">
                            <a href="/about/enable-javascript" class="btn btn-lg flex flex-row items-center gap-2 rounded-full">
                                Learn More <IconArrowRightCircle />
                            </a>
                        </div>
                    </div>
                </div>
            </noscript>
        {/if}
    </svelte:fragment>
</AppShell>
