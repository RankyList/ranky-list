import { RANKS_FIXTURE_RANGE, RANKS_FIXTURE_NAMES } from './ranks.js';

import type { Fixture, Reference } from '../index';
import type { TierlistsRecord, TierlistsResponse } from '../../src/lib/types/pocketbase';

export const TIERLISTS_FIXTURE_RANGE = Math.ceil(RANKS_FIXTURE_RANGE / RANKS_FIXTURE_NAMES);

export default ({
  name: 'tierlists',
  order: 2,
  load: async (pb, references, faker) => {
    const records: Reference<TierlistsResponse> = {};
    const rankReferences = references.ranks || {};
    const tierlistNames = ['Tierlist', 'Rankings', ''];

    for (const i of Array(TIERLISTS_FIXTURE_RANGE).keys()) {
      const tierlistRanks: string[] = [];

      for (const n of Array(RANKS_FIXTURE_NAMES).keys()) {
        const rankIndex = i * RANKS_FIXTURE_NAMES + n;

        if (rankIndex < RANKS_FIXTURE_RANGE) {
          tierlistRanks.push(rankReferences[rankIndex].id);
        }
      }

      const name = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.helpers.arrayElement(tierlistNames)}`.trim();

      records[i] = await pb.collection('tierlists').create<TierlistsResponse>({
        name,
        slug: faker.helpers.slugify(name),
        description: faker.lorem.sentences(),
        public: faker.datatype.boolean(),
        canBeTemplate: faker.datatype.boolean(),
        ranks: tierlistRanks,
      } as TierlistsRecord);
    }

    return { records };
  },
}) satisfies Fixture<TierlistsResponse>;
