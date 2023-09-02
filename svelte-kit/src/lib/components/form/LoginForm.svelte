<script lang="ts">
    import { ProgressRadial, toastStore } from '@skeletonlabs/skeleton';
    import { IconCircleX, IconX } from '@tabler/icons-svelte';
    import { fade, slide } from 'svelte/transition';
    import { superForm } from 'sveltekit-superforms/client';

    import { loginSchema } from '$schemas/login';
    import { authWindow } from '$stores/auth-window';

    import type { AuthProvider } from '$types/auth/providers';
    import type { LoginSchema } from '$types/schema/login';
    import type { SuperValidated } from 'sveltekit-superforms';

    export let data: SuperValidated<LoginSchema>;
    export let options: Partial<Parameters<typeof superForm<typeof loginSchema>>[1]> = {};
    export let authProviders: AuthProvider[] = [];
    export let timeoutMessage = 'Sorry... This is taking longer than expected.';
    export let oAuthFailedMessage = 'Sorry, something went wrong while starting the authentication process.';

    const { form, enhance, errors, constraints, message, delayed, timeout, submitting } = superForm(data, {
        taintedMessage: null,
        delayMs: 500,
        timeoutMs: 5000,
        validators: loginSchema,
        ...options,
    });

    const handleOAuth = (e: Event, url: string) => {
        e.preventDefault();

        if ($authWindow.opened) {
            return;
        }

        const opened = authWindow.open(url);

        if (!opened) {
            toastStore.trigger({
                message: oAuthFailedMessage,
                classes: 'variant-filled-error',
            });
        }
    };
</script>

{#if $message}
    <div transition:slide role="alert" class="alert variant-ghost">
        <div><IconCircleX /></div>
        <div class="alert-message">
            <p>{$message}</p>
        </div>
        <div class="alert-actions">
            <button
                type="button"
                class="btn-icon variant-ghost"
                on:click={() => {
                    $message = null;
                }}
                aria-label="Close this message."
            >
                <IconX />
            </button>
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

{#if authProviders.length > 0}
    <hr />

    <div class="logo-cloud grid-cols-1 gap-1">
        {#each authProviders as authProvider}
            {@const url = `/login/${authProvider.name}/start`}

            <a
                href={url}
                class="logo-item variant-filled-primary py-4"
                on:click={(e) => handleOAuth(e, url)}
                class:disabled={$authWindow.opened}
                aria-disabled={$authWindow.opened}
            >
                <span><svelte:component this={authProvider.icon} /></span>
                <span>Login with {authProvider.displayName}</span>
            </a>
        {/each}
    </div>
{/if}
