import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    seo: {
      title: 'Edit',
      description: 'Edit your profile here.',
    },
  };
}) satisfies PageServerLoad;
