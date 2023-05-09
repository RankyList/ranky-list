<script lang="ts">
    import '../theme.postcss';
    import '@skeletonlabs/skeleton/styles/all.css';
    import '../global.scss';

    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import { AppShell, AppBar, LightSwitch, Modal, Toast, storePopup, type PopupSettings, popup, modalStore } from '@skeletonlabs/skeleton';
    import { IconAlertTriangleFilled, IconArrowRightCircle } from '@tabler/icons-svelte';

    import Logo from '$components/icons/ranky-list-logo.svg?component';
    import LoginModal from '$components/modal/LoginModal.svelte';
    import { loginModal } from '$src/lib/utils/modal';
    import { authProviders } from '$stores/auth-providers';

    import type { ModalComponentRegistry } from '$types/modal';

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
</script>

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
                    {#if data.user}
                        <a href="/logout">Logout</a>
                    {:else}
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    {/if}
                </noscript>
                <button class="btn" use:popup={userPopup}>(user icon)</button>
                <div data-popup="user-popup" class="card variant-filled-surface p-4">
                    <nav class="list-nav">
                        {#if data.user}
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
                                    <button type="button" on:click={() => modalStore.trigger(loginModal)}>
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
<Toast position="r" />
