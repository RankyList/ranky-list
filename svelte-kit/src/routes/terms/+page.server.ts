import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    seo: {
      title: 'Terms of Service for RankyList',
      description: 'Read the terms of service you agree to while using RankyList.',
    },
  };
}) satisfies PageServerLoad;
