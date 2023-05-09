import { IconBrandDiscord } from '@tabler/icons-svelte';

import type { AuthProviderInfo } from '$src/lib/types/auth/providers';

export const allowedAuthProviders: Record<string, AuthProviderInfo> = {
  discord: {
    displayName: 'Discord',
    icon: IconBrandDiscord,
  },
};
