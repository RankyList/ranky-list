import { ITEMS_FIXTURE_RANGE } from './items.js';

import type { Fixture, Reference } from '../index';
import type { RanksRecord, RanksResponse } from '../../src/lib/types/pocketbase';

export const RANKS_FIXTURE_RANGE = 50;
export const RANKS_FIXTURE_MAX_ITEMS = 5;
export const RANKS_FIXTURE_NAMES = 5;

export default ({
  name: 'ranks',
  order: 1,
  load: async (pb, references, faker) => {
    const records: Reference<RanksResponse> = {};
    const itemReferences = references.items || {};

    for (const i of Array(RANKS_FIXTURE_RANGE).keys()) {
      const rankItems: string[] = [];
      const numItems = faker.datatype.number({ min: 0, max: RANKS_FIXTURE_MAX_ITEMS });

      for (const n of Array(numItems).keys()) {
        const itemIndex = faker.datatype.number({ min: 0, max: ITEMS_FIXTURE_RANGE - 1 });
        const itemId = itemReferences[itemIndex].id;

        if (!rankItems.includes(itemId)) {
          rankItems.push(itemId);
        }
      }

      records[i] = await pb.collection('ranks').create<RanksResponse>({
        name: String.fromCharCode(65 + (i % RANKS_FIXTURE_NAMES)), // Use the same names for every 5 ranks
        color: faker.internet.color(),
        description: faker.lorem.sentences(),
        position: i,
        items: rankItems,
      } as RanksRecord);
    }

    return { records };
  },
}) satisfies Fixture<RanksResponse>;
