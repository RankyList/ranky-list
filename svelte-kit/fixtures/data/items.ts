import type { Fixture, Reference } from "..";
import type { ItemsRecord, ItemsResponse } from "../../src/lib/types/pocketbase";

export const ITEMS_FIXTURE_MIN_ITEMS_PER_RANK = 0;
export const ITEMS_FIXTURE_MAX_ITEMS_PER_RANK = 10;

export default ({
  name: 'items',
  order: 3,
  load: async (pb, references, faker) => {
    const records: Reference<ItemsResponse> = {};
    const ranksReferences = Object.values(references.ranks || {});

    for (const rank of ranksReferences) {
      const numItems = Array(faker.datatype.number({
        min: ITEMS_FIXTURE_MIN_ITEMS_PER_RANK,
        max: ITEMS_FIXTURE_MAX_ITEMS_PER_RANK
      }))

      for (const i of numItems.keys()) {
        records[i] = await pb.collection('items').create<ItemsResponse>({
          name: faker.commerce.productName(),
          description: faker.lorem.sentences(),
          position: i,
          rank: rank.id
        } as ItemsRecord);
      }
    }

    return { records };
  },
}) satisfies Fixture<ItemsResponse>;
