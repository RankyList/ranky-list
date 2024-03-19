<script lang="ts">
    import { onDestroy } from 'svelte';

    import { browser } from '$app/environment';
    import IconHome from '~icons/tabler/home';

    let untilClose = 5;
    let timeout: number | null = null;

    if (browser) {
        const timer = () => {
            timeout = window.setTimeout(() => {
                untilClose -= 1;

                if (untilClose <= 0) {
                    window.close();
                } else {
                    timer();
                }
            }, 1000);
        };

        timer();

        const opener = window.opener as Window | null;

        if (opener) {
            opener.postMessage({ context: 'oauth', success: true });
        }
    }

    onDestroy(() => {
        if (browser && timeout) {
            window.clearTimeout(timeout);
            timeout = null;
        }
    });
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-5">
    <h1>You are now logged in.</h1>

    <p>You can leave this page. This window will close automatically in {untilClose}s.</p>

    <noscript>
        <a href="/" class="btn-filled-tertiary btn btn-lg rounded-full">
            <span><IconHome /></span>
            <span>Home</span>
        </a>
    </noscript>
</div>
