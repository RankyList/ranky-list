<script lang="ts">
    import { MetaTags } from 'svelte-meta-tags';

    import LoginForm from '$components/form/LoginForm.svelte';
    import { allowedAuthProviders } from '$utils/auth/providers';

    import type { AuthProvider } from '$types/auth/providers';

    export let data;

    const filteredProviders: AuthProvider[] = [];

    data.authProviders.forEach((provider) => {
        const providerState = allowedAuthProviders[provider.name];

        if (providerState) {
            filteredProviders.push({ ...provider, ...providerState });
        }
    });
</script>

<MetaTags title="Login" description="Login to access your RankyList account. You can create and share your tier lists easily." />

<div class="container mx-auto flex h-full flex-col gap-4 py-5">
    <h1 class="text-center">Login</h1>

    <div class="flex flex-grow flex-col items-center justify-center px-2 sm:px-0">
        <section class="card flex w-full flex-col gap-5 p-4 sm:w-96">
            <LoginForm data={data.loginForm} authProviders={filteredProviders} />
        </section>
    </div>
</div>
