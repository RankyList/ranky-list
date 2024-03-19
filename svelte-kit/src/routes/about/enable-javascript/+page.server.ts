import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async () => {
  return {
    seo: {
      title: 'Enabling JavaScript',
      description: 'Why and how to enable JavaScript. You will learn how JavaScript helps improve your user experience.',
    },
  };
}) satisfies PageServerLoad;
