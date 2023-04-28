import { error } from '@sveltejs/kit';

import type { TierlistsResponse } from '$src/lib/types/pocketbase.js';
import type { ListResult } from 'pocketbase';

export const load = async ({ locals }) => {
  let recentTierLists: ListResult<TierlistsResponse>;

  try {
    recentTierLists = await locals.pb.collection('tierlists').getList<TierlistsResponse>(1, 10, {
      sort: '-created',
    });
  } catch (_) {
    throw error(500, { message: 'Something went wrong while trying to retrieve the latest tier lists.' });
  }

  return { recentTierLists: structuredClone(recentTierLists) };
};
