import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    seo: {
      title: 'Register',
      description: 'Create an account here to save and share your tier lists.',
    },
  };
}) satisfies PageServerLoad;
