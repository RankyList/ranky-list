import { error, redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

import { dev } from '$app/environment';

export const GET = (async ({ params, cookies, locals, url }) => {
  if (locals.user) {
    redirect(303, '/');
  }

  const authMethods = await locals.pb.collection('users').listAuthMethods();
  const provider = authMethods.authProviders.find((providerInfo) => providerInfo.name === params.provider);

  if (!provider) {
    error(404, { message: 'Provider not found.' });
  }

  cookies.set('code_verifier', provider.codeVerifier, { path: '/', secure: !dev });
  cookies.set('state', provider.state, { path: '/', secure: !dev });

  const authUrl = new URL(provider.authUrl);

  authUrl.searchParams.set('redirect_uri', `${url.origin}/login/${provider.name}`);

  redirect(303, authUrl.toString());
}) satisfies RequestHandler;
