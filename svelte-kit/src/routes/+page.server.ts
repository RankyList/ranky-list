import { redirect } from '@sveltejs/kit';

import type { TierlistsResponse } from '$types/pocketbase.js';

export const load = async ({ locals }) => {
  const recentTierLists = await locals.pb.collection('tierlists').getList<TierlistsResponse>(1, 10, {
    sort: '-created',
  });

  return { recentTierLists: structuredClone(recentTierLists) };
};

export const actions = {
  logout: async ({ locals }) => {
    if (locals.user) {
      locals.pb.authStore.clear();
      locals.user = null;
    }

    throw redirect(302, '/');
  },
};
