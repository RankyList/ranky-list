<script lang="ts">
    import { GradientHeading } from '@skeletonlabs/skeleton';

    import TierListForm from '$src/lib/component/tier-list/TierListForm.svelte';
</script>

<svelte:head>
    <title>Create a tier list</title>
    <meta name="description" content="Create a new tier list with ease." />
</svelte:head>

<div class="container mx-auto mb-16 grid gap-5 p-8">
    <GradientHeading tag="h1" direction="bg-gradient-to-tl" from="from-primary-500" to="to-tertiary-500">Create a tier list</GradientHeading>
    <TierListForm />
</div>
