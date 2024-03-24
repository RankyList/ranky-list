import { redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const recentTierLists = await locals.pb.collection('tierLists').getList(1, 10, {
    sort: '-created',
  });

  return {
    recentTierLists: structuredClone(recentTierLists),
    seo: {
      title: 'RankyList',
      description: 'RankyList is a platform for creating and sharing tier lists. Create a tier list for anything, without the hassle.',
    },
  };
}) satisfies PageServerLoad;

export const actions = {
  logout: async ({ locals }) => {
    if (locals.user) {
      locals.pb.authStore.clear();
      locals.user = null;
    }

    redirect(302, '/');
  },
} satisfies Actions;
