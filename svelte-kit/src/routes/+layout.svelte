<script lang="ts">
    import '../theme.postcss';
    import '../global.scss';
    import '@skeletonlabs/skeleton/styles/all.css';

    import { faArrowCircleRight, faWarning } from '@fortawesome/free-solid-svg-icons';
    import { AppShell, AppBar, GradientHeading, LightSwitch, Modal, Alert } from '@skeletonlabs/skeleton';
    import FaIcon from 'svelte-fa';

    import Logo from '$component/icon/svg/ranky-list-logo.svg?component';

    import { page } from '$app/stores';
</script>

<AppShell>
    <AppBar shadow="shadow" slot="header">
        <svelte:fragment slot="lead">
            <a class="flex items-center gap-3" href="/">
                <Logo width="30" role="image" aria-labelledby="RankyList logo" />
                <GradientHeading class="text-3xl" tag="span" direction="bg-gradient-to-r" from="from-primary-500" to="to-tertiary-500">
                    RankyList
                </GradientHeading>
            </a>
        </svelte:fragment>
        <div class="container mx-auto">
            <a class="hidden sm:inline" href="/tier-list">Find a tierlist</a>
            <a class="hidden sm:inline" href="/tier-list/create">Create a tierlist</a>
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
                    <Alert visible background="bg-yellow-500/60 dark:bg-yellow-200/60" border="border border-yellow-500">
                        <svelte:fragment slot="lead"><FaIcon icon={faWarning} size="3x" /></svelte:fragment>
                        <svelte:fragment slot="title">Enable Javascript</svelte:fragment>
                        <span>
                            Javascript is currently disabled (or not available) in your browser. This will considerably lessen your experience on
                            RankyList and certain functionalities will not be available.
                        </span>
                        <svelte:fragment slot="trail">
                            <a href="/about/enable-javascript" class="btn btn-lg rounded-full">
                                <span>Learn More</span>
                                <span><FaIcon icon={faArrowCircleRight} size="2x" /></span>
                            </a>
                        </svelte:fragment>
                    </Alert>
                </div>
            </noscript>
        {/if}
    </svelte:fragment>
</AppShell>

<Modal />
