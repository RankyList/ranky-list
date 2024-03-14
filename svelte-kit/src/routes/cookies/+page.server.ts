import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async () => {
  return {
    seo: {
      title: 'Why and how we use cookies',
      description: "Find RankyList's cookie policy here, why we use them and how your data is personal data is used.",
    },
  };
}) satisfies PageServerLoad;
