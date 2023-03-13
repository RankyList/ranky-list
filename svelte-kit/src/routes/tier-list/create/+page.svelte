<script lang="ts">
    import TierListForm from '$src/lib/component/tier-list/TierListForm.svelte';
</script>

<svelte:head>
    <title>Create a tier list</title>
    <meta name="description" content="Create a new tier list with ease." />
</svelte:head>

<div class="container mx-auto mb-16 grid gap-5 p-8">
    <h1 class="bg-gradient-to-tl from-primary-500 to-tertiary-500 box-decoration-clone bg-clip-text text-transparent">Create a tier list</h1>
    <TierListForm />
</div>
