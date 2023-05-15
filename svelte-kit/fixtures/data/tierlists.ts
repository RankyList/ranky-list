import type { Fixture, Reference } from '../index';
import type { TierlistsRecord, TierlistsResponse } from '../../src/lib/types/pocketbase';

export const TIERLISTS_FIXTURE_MIN_TIERLISTS_PER_USER = 1;
export const TIERLISTS_FIXTURE_MAX_TIERLISTS_PER_USER = 10;

export default ({
  name: 'tierlists',
  order: 1,
  load: async (pb, references, faker) => {
    const records: Reference<TierlistsResponse> = {};
    const tierlistNames = ['Tierlist', 'Rankings', ''];
    const usersReferences = Object.entries(references.users || {});

    for (const [i, user] of usersReferences) {
      const numTierlists = faker.number.int({
        min: TIERLISTS_FIXTURE_MIN_TIERLISTS_PER_USER,
        max: TIERLISTS_FIXTURE_MAX_TIERLISTS_PER_USER,
      });

      for (const t of Array(numTierlists).keys()) {
        const name = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.helpers.arrayElement(tierlistNames)}`.trim();

        records[i] = await pb.collection('tierlists').create<TierlistsResponse>({
          name,
          slug: faker.helpers.slugify(name).toLocaleLowerCase(),
          description: faker.lorem.sentences(),
          public: faker.datatype.boolean(),
          canBeTemplate: faker.datatype.boolean(),
          createdBy: user.id,
        } as TierlistsRecord);
      }
    }

    return { records };
  },
}) satisfies Fixture<TierlistsResponse>;
