import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async () => {
  return {
    seo: {
      title: 'About RankyList',
      description: 'What is RankyList? Why does it exist? Find out here.',
    },
  };
}) satisfies PageServerLoad;
