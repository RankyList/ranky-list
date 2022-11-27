<script lang="ts">
    import '../theme.postcss';
    import '@brainandbones/skeleton/styles/all.css';

    import { AppShell, AppBar, GradientHeading, LightSwitch } from '@brainandbones/skeleton';
</script>

<AppShell>
    <AppBar slot="header" class="nav">
        <svelte:fragment slot="lead">
            <div class="items-center flex gap-3">
                <img class="h-8" src="logo.png" alt="logo">
                <GradientHeading class="text-3xl" tag="span" direction="bg-gradient-to-r" from="from-primary-500" to="to-tertiary-500">
                    RankyList
                </GradientHeading>
            </div>
        </svelte:fragment>
        <svelte:fragment slot="trail">
            <div class="flex gap-5 items-center">
                <LightSwitch />
                <a href="login">Login</a>
            </div>
        </svelte:fragment>    
    </AppBar>

    <slot />
</AppShell>

<style lang="scss">

</style>
