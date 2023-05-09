import { readonly, writable } from 'svelte/store';

import { allowedAuthProviders } from '$utils/auth/providers';

import type { AuthProvider, AuthProviderState } from '$types/auth/providers';

const createProviders = () => {
  const { subscribe, set } = writable<AuthProvider[]>([]);

  return {
    subscribe,
    set: (providers: AuthProviderState[]) => {
      const filteredProviders: AuthProvider[] = [];

      providers.forEach((provider) => {
        const providerState = allowedAuthProviders[provider.name];

        if (providerState) {
          filteredProviders.push({ ...provider, ...providerState });
        }
      });

      set(filteredProviders);
    },
  };
};

export const authProviders = createProviders();

export const availableAuthProviders = readonly(authProviders);
