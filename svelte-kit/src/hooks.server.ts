import { pb } from '$server/pocketbase';
import dayjs from '$utils/dayjs';

import type { UsersResponse } from './lib/types/pocketbase';

export const handle = async ({ event, resolve }) => {
  event.locals.pb = pb;
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
  event.locals.authProviders = await event.locals.pb.collection('users').listAuthMethods();

  try {
    if (event.locals.pb.authStore.isValid) {
      event.locals.user = await event.locals.pb.collection('users').authRefresh<UsersResponse>();
    }
  } catch (_) {
    event.locals.pb.authStore.clear();
  }

  const response = await resolve(event);

  response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({ expires: dayjs().add(1, 'year').toDate() }));

  return response;
};
