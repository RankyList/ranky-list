import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET = (() => {
  const health = {
    uptime: process.uptime(),
    message: 'Service is healthy.',
    date: Date.now(),
  };

  try {
    return json(health);
  } catch (_) {
    health.message = 'Service is unhealthy.';

    error(500, health);
  }
}) satisfies RequestHandler;
