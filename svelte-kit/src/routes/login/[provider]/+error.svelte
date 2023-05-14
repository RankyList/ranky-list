<script lang="ts">
    import { IconHome } from '@tabler/icons-svelte';

    import { browser } from '$app/environment';
    import { page } from '$app/stores';

    const message = $page.error?.message ?? 'Oops... Something went wrong.';

    if (browser) {
        const opener = window.opener as Window | null;

        if (opener) {
            opener.postMessage({ context: 'oauth', success: false });
        }
    }
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-5">
    <h1>{message}</h1>

    <p>You can close this page.</p>

    <noscript>
        <a href="/" class="btn-filled-tertiary btn btn-lg rounded-full text-white">
            <span><IconHome /></span>
            <span>Home</span>
        </a>
    </noscript>
</div>
