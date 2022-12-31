import { prisma } from '$src/lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async () => {
  const recentTierLists = await prisma.tierList.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    take: 10,
  });

  return { recentTierLists };
}) satisfies PageServerLoad;
