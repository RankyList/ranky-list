import { prisma } from '$src/lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const tierLists = await prisma.tierList.findMany();

  return { tierLists };
}
