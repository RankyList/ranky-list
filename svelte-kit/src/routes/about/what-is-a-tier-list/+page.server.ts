import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async () => {
  return {
    seo: {
      title: 'What is a tier list?',
      description: 'Find out what a tier list is and how you can use RankyList to create one.',
    },
  };
}) satisfies PageServerLoad;
