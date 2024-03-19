import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async () => {
  return {
    seo: {
      title: 'FAQ and Guide for RankyList',
      description:
        'Find answers to common questions and get the help you need with our comprehensive FAQ page. Browse our list of frequently asked questions to learn more about our product or service.',
    },
  };
}) satisfies PageServerLoad;
