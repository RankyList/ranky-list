<script lang="ts">
    import '../theme.postcss';
    import '@brainandbones/skeleton/styles/all.css';

    import { AppShell, AppBar, GradientHeading, LightSwitch, Modal } from '@brainandbones/skeleton';
</script>

<AppShell>
    <AppBar shadow="shadow" slot="header">
        <svelte:fragment slot="lead">
            <a class="items-center flex gap-3" href="/">
                <img alt="logo" class="h-8" src="/logo.png" />
                <GradientHeading
                    class="text-3xl"
                    tag="span"
                    direction="bg-gradient-to-r"
                    from="from-primary-500"
                    to="to-tertiary-500"
                >
                    RankyList
                </GradientHeading>
            </a>
        </svelte:fragment>
        <div class="container mx-auto">
            <a class="hidden sm:inline" href="/tierlist/create">Create a tierlist</a>
        </div>
        <svelte:fragment slot="trail">
            <div class="flex gap-5 items-center">
                <LightSwitch />
                <a href="/login">Login</a>
            </div>
        </svelte:fragment>
    </AppBar>

    <slot />
</AppShell>

<Modal />
