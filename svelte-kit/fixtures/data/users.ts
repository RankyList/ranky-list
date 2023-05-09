import chalk from 'chalk';

import { downloadImage } from '../../src/lib/server/utils/image.js';

import type { Fixture, Reference } from '../index';
import type { UsersResponse } from '../../src/lib/types/pocketbase';
import type { UsersWebsites } from '../../src/lib/types/expand/pocketbase';

export const USERS_FIXTURE_RANGE = 30;
export const USERS_FIXTURE_MIN_WEBSITES_PER_USER = 0;
export const USERS_FIXTURE_MAX_WEBSITES_PER_USER = 3;
export const USERS_FIXTURE_DEFAULT_PASSWORD = 'XxxxxxxX'

export default ({
  name: 'users',
  order: 0,
  load: async (pb, references, faker) => {
    const records: Reference<UsersResponse> = {};

    for (const i of Array(USERS_FIXTURE_RANGE).keys()) {
      const numWebsites = faker.datatype.number({
        min: USERS_FIXTURE_MIN_WEBSITES_PER_USER,
        max: USERS_FIXTURE_MAX_WEBSITES_PER_USER,
      });
      const websites: UsersWebsites = {};
      const url = faker.image.cats();
      const email = faker.internet.email();
      const formData = new FormData();

      try {
        const avatar = await downloadImage(url, 'blob');

        formData.append('avatar', avatar, url.split('/').at(-1)?.split('?').at(0));
      } catch (_) {
        console.warn(chalk.yellow(`Failed to download image ${url}. User ${email} will have no avatar.`));
      }

      for (const w of Array(numWebsites).keys()) {
        const url = faker.internet.url();
        const name = url.split('//')[1] ?? faker.company.name();

        websites[w] = { name, url };
      }

      formData.append('email', email);
      formData.append('emailVisibility', faker.datatype.boolean() ? 'true' : 'false');
      formData.append('verified', 'true');
      formData.append('password', USERS_FIXTURE_DEFAULT_PASSWORD);
      formData.append('passwordConfirm', USERS_FIXTURE_DEFAULT_PASSWORD);
      formData.append('websites', JSON.stringify(websites));

      records[i] = await pb.collection('users').create<UsersResponse>(formData);
    }

    return { records };
  },
}) satisfies Fixture<UsersResponse>;
