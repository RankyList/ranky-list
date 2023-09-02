import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  return {
    user: locals.user ? structuredClone(locals.user.record) : null,
  };
}) satisfies LayoutServerLoad;
