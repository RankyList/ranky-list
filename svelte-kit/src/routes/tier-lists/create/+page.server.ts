import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    seo: {
      title: 'Create a tier list',
      description: 'Create a tier list easily, how you want it. Save it locally or online. Share it with friends.',
    },
  };
}) satisfies PageServerLoad;
