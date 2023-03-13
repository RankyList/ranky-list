<script lang="ts">
    import { faHome } from '@fortawesome/free-solid-svg-icons';
    import FaIcon from 'svelte-fa';

    import { page } from '$app/stores';

    const status = $page.status;
    const message = $page.error?.message ?? 'Oops... Something went wrong.';
    const title = `${status} - ${message}`;
    const params = new URLSearchParams({
        labels: 'bug',
        template: 'bug.yml',
        title: `[BUG] ${title}`,
    });
    const href = `https://github.com/RankyList/ranky-list/issues/new?${params.toString()}`;
    const additionalMessage = {
        404: "The page you are looking for doesn't exist. Please check the URL and try again.",
    }[status];
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={message} />
</svelte:head>

<div class="flex h-full flex-col items-center justify-around">
    <div class="flex flex-col items-center gap-3">
        <h1 class="text-9xl">{status}</h1>
        <hr class="!border-t-2 border-primary-500" />
        <h2 class="text-5xl">{message}</h2>
    </div>
    <div class="flex flex-col items-center gap-3">
        {#if additionalMessage}
            <p>{additionalMessage}</p>
        {/if}
        <p>
            If you think this should not have happened, make sure to file a <a {href} rel="noopener noreferrer" target="_blank">report</a>
            to let us know what happened.
        </p>
    </div>
    <a href="/" class="btn-filled-tertiary btn btn-lg rounded-full text-white">
        <span><FaIcon icon={faHome} /></span>
        <span>Home</span>
    </a>
</div>
