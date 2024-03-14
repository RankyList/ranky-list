import type { LayoutServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = (async ({ locals, url }) => {
  const baseSeo = {
    title: 'RankyList',
    titleTemplate: '%s | RankyList',
    description: 'RankyList is a platform for creating and sharing tier lists. Create a tier list for anything, without the hassle.',
    canonical: new URL(url.pathname, url.origin).href,
  } satisfies MetaTagsProps;

  return {
    user: locals.user ? structuredClone(locals.user.record) : null,
    baseSeo,
  };
}) satisfies LayoutServerLoad;
