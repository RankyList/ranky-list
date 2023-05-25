import { error, redirect } from '@sveltejs/kit';

export const GET = ({ params, cookies, locals, url }) => {
  if (locals.user) {
    throw redirect(303, '/');
  }

  const provider = locals.authProviders.authProviders.find((providerInfo) => providerInfo.name === params.provider);

  if (!provider) {
    throw error(404, { message: 'Provider not found.' });
  }

  cookies.set('code_verifier', provider.codeVerifier);
  cookies.set('state', provider.state);

  const authUrl = new URL(provider.authUrl);

  authUrl.searchParams.set('redirect_uri', `${url.origin}/login/${provider.name}`);

  throw redirect(303, authUrl.toString());
};
