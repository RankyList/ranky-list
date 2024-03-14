<script lang="ts">
    import LoginForm from '$components/form/LoginForm.svelte';
    import { allowedAuthProviders } from '$utils/auth/providers';

    import type { AuthProvider } from '$types/auth/providers';
    import type { PageData } from './$types';

    export let data: PageData;

    const filteredProviders: AuthProvider[] = [];

    data.authProviders.forEach((provider) => {
        const providerState = allowedAuthProviders[provider.name];

        if (providerState) {
            filteredProviders.push({ ...provider, ...providerState });
        }
    });
</script>

<div class="container mx-auto flex h-full flex-col gap-4 py-5">
    <h1 class="text-center">Login</h1>

    <div class="flex flex-grow flex-col items-center justify-center px-2 sm:px-0">
        <section class="card flex w-full flex-col gap-5 p-4 sm:w-96">
            <LoginForm data={data.loginForm} authProviders={filteredProviders} />
        </section>
    </div>
</div>
