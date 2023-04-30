import type { TierlistsResponse } from '$src/lib/types/pocketbase.js';

export const load = async ({ locals }) => {
  const recentTierLists = await locals.pb.collection('tierlists').getList<TierlistsResponse>(1, 10, {
    sort: '-created',
  });

  return { recentTierLists: structuredClone(recentTierLists) };
};
