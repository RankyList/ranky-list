import { redirect } from '@sveltejs/kit';
import slugify from 'slugify';

import { prisma } from '$server/prisma';

import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name');
    const description = data.get('description');

    // Very WIP
    if (typeof name === 'string' && (typeof description === 'string' || typeof description === 'undefined')) {
      const tierList = await prisma.tierList.create({
        data: {
          name,
          slug: slugify(name, { strict: true, trim: true, lower: true }),
          description: description,
        },

      });

      throw redirect(303, `/user/tier-list/${tierList.slug}`);
    }
  },
};
