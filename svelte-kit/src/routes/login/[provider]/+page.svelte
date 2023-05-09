<script lang="ts">
    import { browser } from '$app/environment';

    if (browser && window.opener) {
        const opener = window.opener as Window;

        opener.postMessage({ success: true, context: 'oauth' }, window.location.origin);
    }
</script>

<h1>Login successful.</h1>

<p>You can now close this window.</p>
