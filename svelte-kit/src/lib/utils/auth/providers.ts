import { IconBrandDiscord, IconBrandGithub, IconBrandGoogle } from '@tabler/icons-svelte';

import type { AuthProviderInfo } from '$types/auth/providers';

export const allowedAuthProviders: Record<string, AuthProviderInfo> = {
  discord: {
    displayName: 'Discord',
    icon: IconBrandDiscord,
  },
  github: {
    displayName: 'GitHub',
    icon: IconBrandGithub,
  },
  google: {
    displayName: 'Google',
    icon: IconBrandGoogle,
  },
};
