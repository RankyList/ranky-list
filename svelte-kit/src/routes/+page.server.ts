import { error } from '@sveltejs/kit';
import { SECRET_API_HOST } from '$env/static/private';

import type { PageServerLoadEvent } from './$types';

export async function load({ fetch }: PageServerLoadEvent) {
  const nestResponse = await fetch(SECRET_API_HOST);

  if (nestResponse.ok) {
    return {
      nestResponse: await nestResponse.text()
    };
  }

  throw error(404, 'API not found :(');
}
