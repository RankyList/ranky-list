<script lang="ts">
    import type { PageData } from './$types';

    import Button from '$components/Button.svelte';

    export let data: PageData;
</script>

<div class="flex flex-col gap-4">
    <h1>Welcome to SvelteKit</h1>

    <div class="content">
        <p class="content__text">{data.nestResponse}</p>
    </div>

    <Button text="SvelteKit & Skeleton!" />
</div>

<style lang="scss">
    h1 {
        color: green;
    }

    .content {
        &__text {
            font-size: 2rem;
        }
    }
</style>
