import { redirect } from '@sveltejs/kit';

import type { TierlistsResponse } from '$types/pocketbase';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const recentTierLists = await locals.pb.collection('tierlists').getList<TierlistsResponse>(1, 10, {
    sort: '-created',
  });

  return { recentTierLists: structuredClone(recentTierLists) };
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
