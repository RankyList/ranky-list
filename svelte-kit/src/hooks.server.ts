import { pb } from '$server/pocketbase';
import dayjs from '$utils/dayjs';

import type { Handle, HandleServerError } from '@sveltejs/kit';

import { dev } from '$app/environment';

const ERROR_MAPPING = {
  404: "The page you are looking for doesn't exist. Please check the URL and try again.",
  500: 'An unexpected error occurred. Please try again later.',
} as Record<string, string>;

export const handle = (async ({ event, resolve }) => {
  event.locals.pb = pb;
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    if (event.locals.pb.authStore.isValid) {
      event.locals.user = await event.locals.pb.collection('users').authRefresh();
    }
  } catch (_) {
    event.locals.pb.authStore.clear();
  }

  const response = await resolve(event);

  response.headers.append(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie({ expires: dayjs().add(1, 'year').toDate(), path: '/', secure: !dev }),
  );

  return response;
}) satisfies Handle;

export const handleError: HandleServerError = async ({ status, message }) => {
  return {
    message,
    seo: {
      title: `${status} - ${message}`,
      description: ERROR_MAPPING[status] ?? `Something went wrong : ${message}`,
      robots: 'noindex',
    },
  };
};
