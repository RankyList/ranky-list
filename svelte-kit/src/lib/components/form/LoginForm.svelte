<script lang="ts">
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { onDestroy } from 'svelte';
    import { fade, slide } from 'svelte/transition';
    import { superForm } from 'sveltekit-superforms/client';

    import { loginSchema } from '$schemas/login';
    import { availableAuthProviders } from '$src/lib/stores/auth-providers';

    import type { LoginSchema } from '$types/schemas/login';
    import type { Validation } from 'sveltekit-superforms';

    import { browser } from '$app/environment';
    import { invalidateAll } from '$app/navigation';

    export let data: Validation<LoginSchema>;
    export let options: Partial<Parameters<typeof superForm>[1]> = {};
    export let timeoutMessage = 'Sorry... This is taking longer than expected.';

    const { form, enhance, errors, constraints, message, delayed, timeout, submitting } = superForm(data, {
        taintedMessage: null,
        delayMs: 500,
        timeoutMs: 5000,
        validators: loginSchema,
        ...options,
    } as Partial<Parameters<typeof superForm>[1]>);

    let authWindow: Window | null = null;

    const onmessage = (e: MessageEvent) => {
        if (!browser || e.origin !== window.origin) {
            return;
        }

        if (!authWindow || authWindow.closed) {
            return;
        }

        if (typeof e.data === 'object' && e.data.context === 'oauth' && e.data?.success) {
            authWindow.close();
        }
    };

    const onclose = () => {
        if (!browser || !authWindow || !authWindow.closed) {
            return;
        }

        window.removeEventListener('message', onmessage);
        authWindow.removeEventListener('beforeunload', onclose);
        authWindow = null;
        invalidateAll();
    };

    const handleOAuth = (e: Event, url: string) => {
        e.preventDefault();

        if (!browser) {
            return;
        }

        if (authWindow && !authWindow.closed) {
            authWindow.focus();
        }

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let width = 1024;
        let height = 768;

        width = width > windowWidth ? windowWidth : width;
        height = height > windowHeight ? windowHeight : height;

        const left = windowWidth / 2 - width / 2;
        const top = windowHeight / 2 - height / 2;

        authWindow = window.open(url, 'rankylist_oauth2_popup', `width=${width},height=${height},top=${top},left=${left},resizable,menubar=no`);

        window.addEventListener('message', onmessage);

        if (authWindow) {
            authWindow.addEventListener('beforeunload', onclose);
        }
    };

    onDestroy(() => {
        if (!browser) {
            return;
        }

        window.removeEventListener('message', onmessage);

        if (authWindow) {
            authWindow.removeEventListener('beforeunload', onclose);
        }
    });
</script>

{#if $message}
    <div transition:slide role="alert" class="alert variant-ghost">
        <div>(icon)</div>
        <div class="alert-message">
            <p>{$message}</p>
        </div>
        <div class="alert-actions">
            <button
                type="button"
                class="btn"
                on:click={() => {
                    $message = null;
                }}>Ok</button
            >
        </div>
    </div>
{/if}

<form method="post" use:enhance class="grid gap-5" action="/login/?/login">
    <div class="label">
        <label for="usernameOrEmail">Username or email</label>
        <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            class="input variant-form-material"
            bind:value={$form.usernameOrEmail}
            data-invalid={$errors.usernameOrEmail}
            {...$constraints.usernameOrEmail}
        />
        {#if $errors.usernameOrEmail}
            <span class="text-error-500" transition:fade>{$errors.usernameOrEmail}</span>
        {/if}
    </div>

    <div class="label">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            name="password"
            class="input variant-form-material"
            bind:value={$form.password}
            data-invalid={$errors.password}
            {...$constraints.password}
        />
        {#if $errors.password}
            <span class="text-error-500" transition:fade>{$errors.password}</span>
        {/if}
    </div>

    <div class="flex flex-col items-center justify-center gap-2">
        <button type="submit" class="btn variant-filled w-fit" disabled={$submitting}>
            <span>Login</span>
            {#if $delayed || $timeout}
                <span transition:fade>
                    <ProgressRadial
                        width="w-5"
                        stroke={40}
                        font={40}
                        meter="stroke-surface-900"
                        track="stroke-surface-300"
                        labelledby="login-form-loading"
                    />
                </span>
                <span id="login-form-loading" class="sr-only">{timeoutMessage}</span>
            {/if}
        </button>
        {#if $timeout}
            <span transition:slide>{timeoutMessage}</span>
        {/if}
    </div>
</form>

{#if $availableAuthProviders.length > 0}
    <hr />
{/if}

{#each $availableAuthProviders as authProvider}
    {@const url = `/login/${authProvider.name}/start`}

    <a href={url} class="btn" on:click={(e) => handleOAuth(e, url)}>
        <span><svelte:component this={authProvider.icon} /></span>
        <span>Login with {authProvider.displayName}</span>
    </a>
{/each}
