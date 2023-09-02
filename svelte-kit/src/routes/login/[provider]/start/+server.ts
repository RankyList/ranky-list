import { error, redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET = (async ({ params, cookies, locals, url }) => {
  if (locals.user) {
    throw redirect(303, '/');
  }

  const authMethods = await locals.pb.collection('users').listAuthMethods();
  const provider = authMethods.authProviders.find((providerInfo) => providerInfo.name === params.provider);

  if (!provider) {
    throw error(404, { message: 'Provider not found.' });
  }

  cookies.set('code_verifier', provider.codeVerifier);
  cookies.set('state', provider.state);

  const authUrl = new URL(provider.authUrl);

  authUrl.searchParams.set('redirect_uri', `${url.origin}/login/${provider.name}`);

  throw redirect(303, authUrl.toString());
}) satisfies RequestHandler;
