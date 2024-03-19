import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    seo: {
      title: 'Propose a suggestion for RankyList',
      description: 'Propose or vote for suggestions on how RankyList can improve.',
    },
  };
}) satisfies PageServerLoad;
