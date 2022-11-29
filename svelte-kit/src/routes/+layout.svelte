<script lang="ts">
    import '../theme.postcss';
    import '@brainandbones/skeleton/styles/all.css';

    import { AppShell, AppBar, GradientHeading, LightSwitch, Modal } from '@brainandbones/skeleton';
</script>

<AppShell>
    <AppBar shadow="shadow" slot="header">
        <svelte:fragment slot="lead">
            <div class="items-center flex gap-3">
                <img alt="logo" class="h-8" src="logo.png" />
                <GradientHeading
                    class="text-3xl"
                    tag="span"
                    direction="bg-gradient-to-r"
                    from="from-primary-500"
                    to="to-tertiary-500"
                >
                    RankyList
                </GradientHeading>
            </div>
        </svelte:fragment>
        <a class="hidden sm:inline" href="/tierlist/create">Create tierlist</a>
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
