<script lang="ts">
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { Field, Control, Label, FieldErrors, Description } from 'formsnap';
    import { fade, slide } from 'svelte/transition';
    import { toast } from 'svelte-sonner';
    import { valibotClient } from 'sveltekit-superforms/adapters';
    import { superForm } from 'sveltekit-superforms/client';

    import { LoginSchema } from '$schemas/login';
    import { getAuthWindowStore } from '$stores/auth-window';
    import { defaultFormOptions } from '$utils/form/defaults';

    import type { LoginInput } from '$schemas/login';
    import type { AuthProvider } from '$types/auth/providers';
    import type { SuperValidated } from 'sveltekit-superforms';

    import IconCircleX from '~icons/tabler/circle-x';
    import IconX from '~icons/tabler/x';

    export let data: SuperValidated<LoginInput>;
    export let options: Partial<Parameters<typeof superForm<LoginInput>>[1]> = {};
    export let authProviders: AuthProvider[] = [];
    export let timeoutMessage = 'Sorry... This is taking longer than expected.';
    export let oAuthFailedMessage = 'Sorry, something went wrong while starting the authentication process.';

    const authWindowStore = getAuthWindowStore();
    const form = superForm(data, {
        ...defaultFormOptions,
        validators: valibotClient(LoginSchema),
        ...options,
    });
    const { form: formData, enhance, message, delayed, timeout, submitting } = form;

    const handleOAuth = (e: Event, url: string) => {
        e.preventDefault();

        if ($authWindowStore.opened) {
            return;
        }

        const opened = authWindowStore.open(url);

        if (!opened) {
            toast.error(oAuthFailedMessage);
        }
    };
</script>

{#if $message}
    <div transition:slide role="alert" class="alert variant-ghost">
        <div aria-hidden="true"><IconCircleX /></div>
        <div class="alert-message">
            <p>{$message}</p>
        </div>
        <div class="alert-actions">
            <button
                type="button"
                class="variant-ghost btn-icon"
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
    <Field {form} name="usernameOrEmail">
        <div class="label">
            <Control let:attrs>
                <Label>Username or email</Label>
                <input {...attrs} class="input variant-form-material" bind:value={$formData.usernameOrEmail} />
            </Control>
            <Description />
            <FieldErrors />
        </div>
    </Field>

    <Field {form} name="password">
        <div class="label">
            <Control let:attrs>
                <Label>Password</Label>
                <input {...attrs} class="input variant-form-material" bind:value={$formData.password} />
            </Control>
            <Description />
            <FieldErrors />
        </div>
    </Field>

    <div class="flex flex-col items-center justify-center gap-2">
        <button type="submit" class="variant-filled btn w-fit" disabled={$submitting}>
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
                on:click={(e) => {
                    handleOAuth(e, url);
                }}
                class:disabled={$authWindowStore.opened}
                aria-disabled={$authWindowStore.opened}
            >
                <span><svelte:component this={authProvider.icon} /></span>
                <span>Login with {authProvider.displayName}</span>
            </a>
        {/each}
    </div>
{/if}
