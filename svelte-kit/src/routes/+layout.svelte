<script lang="ts">
    import '../theme.postcss';
    import '@skeletonlabs/skeleton/styles/all.css';
    import '../global.scss';

    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import {
        AppShell,
        AppBar,
        LightSwitch,
        Modal,
        Toast,
        storePopup,
        type PopupSettings,
        popup,
        modalStore,
        focusTrap,
        ProgressRadial,
        toastStore,
        Avatar,
    } from '@skeletonlabs/skeleton';
    import { IconAlertTriangleFilled, IconArrowRightCircle, IconUser } from '@tabler/icons-svelte';
    import { onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';

    import Logo from '$components/icon/ranky-list-logo.svg?component';
    import LoginModal from '$components/modal/LoginModal.svelte';
    import { authProviders } from '$stores/auth-providers';
    import { authWindow } from '$stores/auth-window';
    import { loginModal } from '$utils/modal';

    import type { ModalComponentRegistry } from '$types/modal';

    import { browser } from '$app/environment';
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';

    export let data;

    const modalComponentRegistry: ModalComponentRegistry = {
        loginModal: {
            ref: LoginModal,
            props: { loginForm: data.loginForm },
        },
    };
    const userPopup: PopupSettings = {
        event: 'focus-click',
        target: 'user-popup',
        placement: 'bottom',
    };

    authProviders.set(data.authProviders);
    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    const onmessage = (e: MessageEvent) => {
        if (!browser || e.origin !== window.origin) {
            return;
        }

        if (typeof e.data === 'object' && e.data.context === 'oauth' && typeof e.data?.success === 'boolean') {
            authWindow.detach(true);
            window.removeEventListener('message', onmessage);
        }
    };

    const handleAuthWindowClose = () => {
        if (!browser) {
            return;
        }

        const closed = authWindow.close(true);

        if (!closed) {
            toastStore.trigger({
                message: 'Sorry, something went wrong while trying to close the authentication window.',
                classes: 'variant-filled-error',
            });
        }
    };

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

    $: if ($page.data.user) {
        modalStore.close();
    }

    $: handleAuthWindowChange($authWindow.opened);

    onDestroy(() => {
        if (!browser) {
            return;
        }

        window.removeEventListener('message', onmessage);
    });
</script>

<svelte:body aria-busy={$authWindow.opened} />

{#if $authWindow.opened}
    <div
        transition:fade
        class="absolute left-0 top-0 z-[9999] flex h-full w-full flex-col items-center justify-center gap-5 bg-gray-700/90"
        use:focusTrap={true}
    >
        <ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" />
        <p>Authentication in progress...</p>
        {#if $authWindow.window}
            <div role="group" class="flex flex-row gap-3">
                <button type="button" class="btn variant-ghost" on:click={() => $authWindow.window?.focus()}>Open</button>
                <button type="button" class="btn variant-ghost" on:click={handleAuthWindowClose}>Cancel</button>
            </div>
        {/if}
    </div>
{/if}

<AppShell>
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
                    {#if $page.data.user}
                        <a href="/logout">Logout</a>
                    {:else}
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    {/if}
                </noscript>
                <button class="btn-icon variant-soft-primary" use:popup={userPopup}>
                    {#if $page.data.user}
                        <!-- TODO Change this to proper URL, this is temporary -->
                        <Avatar
                            src={$page.data.user.avatar
                                ? `http://localhost:8090/api/files/_pb_users_auth_/d1ijmt74g6vuvdq/${$page.data.user.avatar}`
                                : undefined}
                            initials={$page.data.user.username.at(0)}
                        />
                    {:else}
                        <IconUser />
                    {/if}
                </button>
                <div data-popup="user-popup" class="card variant-filled-surface p-4">
                    <nav class="list-nav">
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
                                    <button
                                        type="button"
                                        on:click={() => {
                                            if ($page.data.user) {
                                                return;
                                            }

                                            modalStore.trigger(loginModal);
                                        }}
                                    >
                                        <span class="flex-auto">Login</span>
                                    </button>
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

<Modal components={modalComponentRegistry} />
<Toast position="br" zIndex="z-[1000]" />
