import type { Fixture, Reference } from '../index';
import type { RanksRecord, RanksResponse } from '../../src/lib/types/pocketbase';

export const RANKS_FIXTURE_RANKS_PER_TIERLIST = 5;

export default ({
  name: 'ranks',
  order: 2,
  load: async (pb, references, faker) => {
    const records: Reference<RanksResponse> = {};
    const tierlistsReferences = Object.entries(references.tierlists || {});

    for (const [i, tierlist] of tierlistsReferences) {
      for (const t of Array(RANKS_FIXTURE_RANKS_PER_TIERLIST).keys()) {
        records[i] = await pb.collection('ranks').create<RanksResponse>({
          name: String.fromCharCode(65 + t), // Use the same names for every 5 ranks
          color: faker.internet.color(),
          description: faker.lorem.sentences(),
          position: t,
          tierlist: tierlist.id,
        } as RanksRecord);
      }
    }

    return { records };
  },
}) satisfies Fixture<RanksResponse>;
