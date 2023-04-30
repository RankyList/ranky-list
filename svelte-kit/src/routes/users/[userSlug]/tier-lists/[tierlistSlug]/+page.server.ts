import { error } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

import type { TierlistsResponse } from '$src/lib/types/pocketbase.js';

export const load = async ({ params, locals }) => {
  const { tierlistSlug } = params;
  let tierList: TierlistsResponse;

  try {
    tierList = await locals.pb.collection('tierlists').getFirstListItem(`slug = "${tierlistSlug}"`);
  } catch (e) {
    if (e instanceof ClientResponseError && e.status === 404) {
      throw error(404, `Tier list "${tierlistSlug}" not found`);
    }

    throw error(500, { message: 'Something went wrong while trying to retrieve the tier list.' });
  }

  return { tierList: structuredClone(tierList) };
};
