<script lang="ts">
    import { page } from '$app/stores';
    import IconHome from '~icons/tabler/home';

    const { status } = $page;
    const message = $page.error?.message ?? 'Oops... Something went wrong.';
    const title = `${status} - ${message}`;
    const params = new URLSearchParams({
        labels: 'bug',
        template: 'bug.yml',
        title: `[BUG] ${title}`,
    });
    const href = `https://github.com/RankyList/ranky-list/issues/new?${params.toString()}`;
</script>

<div class="flex h-full flex-col items-center justify-center gap-24">
    <div class="flex flex-col items-center gap-3">
        <h1 class="text-9xl">{status}</h1>
        <hr class="w-full" />
        <h2 class="text-5xl">{message}</h2>
    </div>
    <div class="flex flex-col items-center gap-3">
        {#if $page.error?.seo?.description}
            <p>{$page.error.seo.description}</p>
        {/if}
        <p>
            If you think this should not have happened, make sure to file a <a
                {href}
                rel="noopener noreferrer"
                target="_blank"
                class="variant-soft chip hover:variant-filled">report</a
            >
            to let us know what happened.
        </p>
    </div>
    <a href="/" class="btn-filled-tertiary btn btn-lg rounded-full">
        <span><IconHome /></span>
        <span>Home</span>
    </a>
</div>
