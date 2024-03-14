import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    seo: {
      title: 'Tier lists',
      description:
        "Search accross all the tier lists on RankyList and find the one you're looking for. If you're lucky enough, you can even use it as a template.",
    },
  };
}) satisfies PageServerLoad;
