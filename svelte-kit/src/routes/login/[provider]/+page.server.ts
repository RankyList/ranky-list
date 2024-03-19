import { error, redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';

import type { UsersResponse } from '$types/pocketbase';
import type { PageServerLoad } from './$types';
import type { RecordAuthResponse } from 'pocketbase';

import { dev } from '$app/environment';

export const load = (async ({ url, locals, params, cookies }) => {
  if (locals.user) {
    redirect(303, '/');
  }

  const authMethods = await locals.pb.collection('users').listAuthMethods();
  const provider = authMethods.authProviders.find((providerInfo) => providerInfo.name === params.provider);

  if (!provider) {
    error(404, { message: 'Provider not found.' });
  }

  const hasError = url.searchParams.get('error');
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const codeVerifier = cookies.get('code_verifier');
  const requiredState = cookies.get('state');

  cookies.delete('code_verifier', { path: '/' });
  cookies.delete('state', { path: '/' });

  if (hasError) {
    error(401, { message: hasError === 'access_denied' ? 'Login denied.' : 'Login cancelled.' });
  }

  if (!code || !codeVerifier || state !== requiredState) {
    error(400, { message: 'Login failed.' });
  }

  let user: RecordAuthResponse<UsersResponse> | null = null;

  try {
    user = await locals.pb
      .collection('users')
      .authWithOAuth2Code<UsersResponse>(provider.name, code, codeVerifier, `${url.origin}/login/${provider.name}`);

    try {
      locals.pb.authStore.exportToCookie({ expires: dayjs().add(1, 'year').toDate(), path: '/', secure: !dev });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error exporting auth to cookie:', e);

      error(401, { message: 'Login failed.' });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error authenticating with OAuth2 code:', e);

    error(401, { message: 'Login failed.' });
  }

  return {
    user: structuredClone(user.record),
    seo: {
      title: 'Login successful',
      description: 'You are now logged in.',
      robots: 'noindex, nofollow',
    },
  };
}) satisfies PageServerLoad;
