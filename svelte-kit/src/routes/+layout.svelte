<script lang="ts">
    import '../theme.postcss';
    import '@brainandbones/skeleton/styles/all.css';

    import { AppShell, AppBar, GradientHeading, RadioGroup, RadioItem } from '@brainandbones/skeleton';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';

    const theme = writable('dark');

    onMount(() => {
        const html = document.querySelector('html');

        theme.subscribe((value) => {
            if(!html?.classList.contains(value)){
                html?.classList.toggle('dark');
                html?.classList.toggle('light');
            }
        })
    });
</script>

<AppShell>
    <AppBar slot="header" class="nav">
        <svelte:fragment slot="lead">
            <div class="items-center flex gap-3">
                <img class="h-9" src="logo.png" alt="logo">
                <GradientHeading tag="h2" direction="bg-gradient-to-r" from="from-primary-500" to="to-tertiary-500">
                    RankyList
                </GradientHeading>
            </div>
        </svelte:fragment>
        <svelte:fragment slot="trail">
            <div class="flex gap-5 items-center">
                <RadioGroup selected={theme}>
                    <RadioItem value="dark">Dark</RadioItem>
                    <RadioItem value="light">Light</RadioItem>
                </RadioGroup>
                <a href="login">Login</a>
            </div>
        </svelte:fragment>    
    </AppBar>

    <slot />
</AppShell>

<style lang="scss">

</style>
