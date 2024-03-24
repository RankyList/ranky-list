import { error } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

import type { TierListsResponse } from '$types/pocketbase';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
  const { tierListSlug } = params;
  let tierList: TierListsResponse;

  try {
    tierList = await locals.pb.collection('tierLists').getFirstListItem(`slug = "${tierListSlug}"`);
  } catch (e) {
    if (e instanceof ClientResponseError && e.status === 404) {
      error(404, `Tier list "${tierListSlug}" not found`);
    }

    error(500, { message: 'Something went wrong while trying to retrieve the tier list.' });
  }

  return {
    tierList: structuredClone(tierList),
    seo: {
      title: tierList.name,
      description: tierList.description || `The ${tierList.name} tier list. Created by TODO.`,
    },
  };
}) satisfies PageServerLoad;
