<script lang="ts">
    import '../theme.postcss';
    import '@skeletonlabs/skeleton/styles/all.css';
    import '../global.scss';

    import { faArrowCircleRight, faWarning } from '@fortawesome/free-solid-svg-icons';
    import { AppShell, AppBar, LightSwitch, Modal, Toast } from '@skeletonlabs/skeleton';
    import FaIcon from 'svelte-fa';

    import Logo from '$components/icons/ranky-list-logo.svg?component';

    import { page } from '$app/stores';
</script>

<AppShell>
    <AppBar shadow="shadow" slot="header">
        <svelte:fragment slot="lead">
            <a class="flex items-center gap-3" href="/">
                <Logo width="30" role="image" aria-labelledby="RankyList logo" />
                <span class="bg-gradient-to-r from-primary-500 to-tertiary-500 box-decoration-clone bg-clip-text text-3xl text-transparent">
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
                <a href="/login">Login</a>
            </div>
        </svelte:fragment>
    </AppBar>
    <slot />
    <svelte:fragment slot="pageFooter">
        {#if $page.route.id !== '/about/enable-javascript'}
            <noscript>
                <div class="m-10">
                    <div role="alert" class="alert border border-yellow-500 bg-yellow-500/60 dark:bg-yellow-200/60">
                        <div><FaIcon icon={faWarning} size="3x" /></div>
                        <div class="alert-message">
                            <span>Enable Javascript</span>

                            <p>
                                Javascript is currently disabled (or not available) in your browser. This will considerably lessen your experience on
                                RankyList and certain functionalities will not be available.
                            </p>
                        </div>
                        <div class="alert-actions">
                            <a href="/about/enable-javascript" class="btn btn-lg rounded-full">
                                <span>Learn More</span>
                                <span><FaIcon icon={faArrowCircleRight} size="2x" /></span>
                            </a>
                        </div>
                    </div>
                </div>
            </noscript>
        {/if}
    </svelte:fragment>
</AppShell>

<Modal />
<Toast position="r" />
