import { error, redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';

import type { UsersResponse } from '$types/pocketbase.js';

export const load = async ({ url, locals, params, cookies }) => {
  if (locals.user) {
    throw redirect(303, '/');
  }

  const provider = locals.authProviders.authProviders.find((providerInfo) => providerInfo.name === params.provider);

  if (!provider) {
    throw error(404, { message: 'Provider not found.' });
  }

  const hasError = url.searchParams.get('error');
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const codeVerifier = cookies.get('code_verifier');
  const requiredState = cookies.get('state');

  cookies.delete('code_verifier', { path: '/' });
  cookies.delete('state', { path: '/' });

  if (hasError) {
    throw error(401, { message: hasError === 'access_denied' ? 'Login denied.' : 'Login cancelled.' });
  }

  if (!code || !codeVerifier || state !== requiredState) {
    throw error(400, { message: 'Login failed.' });
  }

  try {
    await locals.pb.collection('users').authWithOAuth2Code(provider.name, code, codeVerifier, `${url.origin}/login/${provider.name}`);

    try {
      locals.pb.authStore.exportToCookie({ expires: dayjs().add(1, 'year').toDate() });
    } catch (_) {
      throw error(401, { message: 'Login failed.' });
    }
  } catch (_) {
    throw error(401, { message: 'Login failed.' });
  }

  try {
    if (locals.pb.authStore.isValid) {
      locals.user = await locals.pb.collection('users').authRefresh<UsersResponse>();
    }
  } catch (_) {
    locals.pb.authStore.clear();
  }

  return { user: locals.user ? structuredClone(locals.user.record) : null };
};
