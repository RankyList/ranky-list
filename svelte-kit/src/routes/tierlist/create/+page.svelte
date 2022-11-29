<script lang="ts">
    import { GradientHeading } from '@brainandbones/skeleton';
    import Tierlist from '$src/lib/components/Tierlist.svelte';
</script>

<div class="container mx-auto p-8">
    <GradientHeading
        tag="h1"
        direction="bg-gradient-to-tl"
        from="from-primary-500"
        to="to-tertiary-500"
    >
        Create tierlist
    </GradientHeading>
    <Tierlist />
</div>
