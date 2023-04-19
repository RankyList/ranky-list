import { error } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

import type { TierlistResponse } from '$src/lib/types/pocketbase.js';

export const load = async ({ params, locals }) => {
  const { slug } = params;
  let tierList: TierlistResponse;

  try {
    tierList = await locals.pb.collection('tierlist').getFirstListItem(`slug = "${slug}"`);
  } catch (e) {
    if (e instanceof ClientResponseError && e.status === 404) {
      throw error(404, `Tier list "${slug}" not found`);
    }

    throw error(500, { message: 'Something went wrong while trying to retrieve the tier list.' });
  }

  return { tierList: structuredClone(tierList) };
};
