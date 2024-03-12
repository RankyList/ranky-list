import type { AuthProviderInfo } from '$types/auth/providers';

import IconBrandDiscord from '~icons/tabler/brand-discord';
import IconBrandGithub from '~icons/tabler/brand-github';
import IconBrandGoogle from '~icons/tabler/brand-google';

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
