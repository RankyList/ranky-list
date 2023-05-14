import { superValidate } from 'sveltekit-superforms/server';

import { loginSchema } from '$schemas/login.js';

export const load = async ({ locals, url }) => {
  const loginForm = await superValidate(loginSchema);

  return {
    user: locals.user ? structuredClone(locals.user.record) : null,
    authProviders: locals.authProviders.authProviders.map((provider) => {
      const authUrl = new URL(provider.authUrl);

      authUrl.searchParams.append('redirect_uri', `${url.origin}/login/${provider.name}`);

      return { name: provider.name, authUrl: authUrl.toString() };
    }),
    loginForm,
  };
};
