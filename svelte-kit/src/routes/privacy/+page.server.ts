import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    seo: {
      title: 'Privacy Policy for RankyList',
      description: 'Read the privacy policy of RankyList.',
    },
  };
}) satisfies PageServerLoad;
