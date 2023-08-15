import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

import { loginSchema } from '$schemas/login';
import dayjs from '$utils/dayjs';

import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
  if (locals.user) {
    throw redirect(303, '/');
  }

  const loginForm = await superValidate(loginSchema);
  const authMethods = await locals.pb.collection('users').listAuthMethods();

  return {
    loginForm,
    authProviders: authMethods.authProviders.map((provider) => {
      const authUrl = new URL(provider.authUrl);

      authUrl.searchParams.append('redirect_uri', `${url.origin}/login/${provider.name}`);

      return { name: provider.name, authUrl: authUrl.toString() };
    }),
  };
}) satisfies PageServerLoad;

export const actions = {
  login: async ({ request, locals }) => {
    const loginForm = await superValidate<typeof loginSchema, string>(request, loginSchema);

    if (!loginForm.valid) {
      return fail(400, { loginForm });
    }

    try {
      await locals.pb.collection('users').authWithPassword(loginForm.data.usernameOrEmail, loginForm.data.password);

      try {
        locals.pb.authStore.exportToCookie({ expires: dayjs().add(1, 'year').toDate() });
      } catch (e) {
        return message(loginForm, 'Something went wrong while logging you in...', { status: 500 });
      }
    } catch (e) {
      return message(loginForm, 'Invalid credentials.', { status: 401 });
    }

    return { loginForm };
  },
} satisfies Actions;
