import PocketBase from 'pocketbase';

import { SECRET_POCKETBASE_URL } from '$env/static/private';

export const pb = new PocketBase(SECRET_POCKETBASE_URL);
