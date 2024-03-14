import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async () => {
  return {
    seo: {
      title: 'RankyList contact information',
      description: 'Find how you can contact RankyList, whether through mail, GitHub or Discord.',
    },
  };
}) satisfies PageServerLoad;
