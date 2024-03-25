import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    seo: {
      title: 'Edit tier list',
      description: 'Edit your tier list here.',
    },
  };
}) satisfies PageServerLoad;
