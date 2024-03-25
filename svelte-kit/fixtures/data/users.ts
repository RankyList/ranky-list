import chalk from 'chalk';

import { downloadImage } from '../../src/lib/server/utils/image.js';

import type { Fixture, Reference } from '../index';
import type { UsersRecord, UsersResponse } from '../../src/lib/types/pocketbase';
import type { UsersWebsites } from '../../src/lib/types/expand/pocketbase';

export const USERS_FIXTURE_DEFAULT_PASSWORD = 'XxxxxxxX';

export const DATA = {
  bob: {
    username: 'bob',
    email: 'bob@ranky-list.com',
    emailVisibility: true,
    verified: true,
    websites: {},
  },
  quantumQuasar97: {
    username: 'QuantumQuasar97',
    email: 'quantumquasar97@ranky-list.com',
    emailVisibility: false,
    verified: true,
    websites: {},
  },
  karl: {
    username: 'karl',
    email: 'karl@ranky-list.com',
    emailVisibility: true,
    verified: true,
    websites: {
      0: {
        name: "Karl's Blog",
        url: 'http://local.ranky-list.com',
      },
      1: {
        name: "Karl's Portfolio",
        url: 'http://local.ranky-list.com',
      },
    },
  },
  tierListCreator56: {
    username: 'tierListCreator56',
    email: 'tierListCreator56@ranky-list.com',
    emailVisibility: true,
    verified: true,
    websites: {},
  },
  unverifiedUser: {
    username: 'unverifiedUser',
    email: 'unverifiedUser@ranky-list.com',
    emailVisibility: true,
    verified: false,
    websites: {},
  },
} as const satisfies Reference<
  UsersRecord & {
    username: string;
    email: string;
    emailVisibility: boolean;
    verified: boolean;
    websites?: UsersWebsites;
  }
>;

export type UsersDataKeys = keyof typeof DATA;

export default {
  name: 'users',
  order: 0,
  load: async (pb, references, faker) => {
    const records: Reference<UsersResponse> = {};

    for (const [i, user] of Object.entries(DATA)) {
      const url = faker.image.urlLoremFlickr({ category: 'cats' });
      // We need to use FormData to upload the avatar
      const formData = new FormData();

      try {
        const avatar = await downloadImage(url, 'blob');

        formData.append('avatar', avatar, url.split('/').at(-1)?.split('?').at(0));
      } catch (_) {
        console.warn(chalk.yellow(`Failed to download image ${url}. User ${user.email} will have no avatar.`));
      }

      formData.append('email', user.email);
      formData.append('emailVisibility', user.emailVisibility.toString());
      formData.append('verified', user.verified.toString());
      formData.append('password', USERS_FIXTURE_DEFAULT_PASSWORD);
      formData.append('passwordConfirm', USERS_FIXTURE_DEFAULT_PASSWORD);
      formData.append('websites', JSON.stringify(user.websites || {}));

      records[i] = await pb.collection('users').create<UsersResponse>(formData);
    }

    return { records };
  },
} satisfies Fixture<UsersResponse>;
