import type { Fixture, Reference } from "..";
import type { ItemsRecord, ItemsResponse } from "../../src/lib/types/pocketbase";

export const ITEMS_FIXTURE_RANGE = 1000;

export default ({
  name: 'items',
  order: 0,
  load: async (pb, references, faker) => {
    const records: Reference<ItemsResponse> = {};

    for (const i of Array(ITEMS_FIXTURE_RANGE).keys()) {
      records[i] = await pb.collection('items').create<ItemsResponse>({
        name: faker.commerce.productName(),
        description: faker.lorem.sentences(),
        position: i,
      } as ItemsRecord);
    }

    return { records };
  },
}) satisfies Fixture<ItemsResponse>;
