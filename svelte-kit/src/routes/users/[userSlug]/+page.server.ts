import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    seo: {
      title: 'User WIP',
      description: 'This is the profile of...',
    },
  };
}) satisfies PageServerLoad;
