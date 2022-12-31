import { error } from '@sveltejs/kit';

import { prisma } from '$server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const slug = params.slug;
  const tierList = await prisma.tierList.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!tierList) {
    throw error(404, `Tier list "${slug}" not found`);
  }

  return {
    tierList,
  };
}) satisfies PageServerLoad;
