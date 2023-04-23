# Fixtures

This section concerns fixtures for PocketBase. Fixtures are fake data generated to facilitate development.

- [Fixtures](#fixtures)
  - [How to load fixtures](#how-to-load-fixtures)
    - [Env variables](#env-variables)
    - [Commands](#commands)
  - [How to create a fixture](#how-to-create-a-fixture)
    - [Every necessary step](#every-necessary-step)
    - [Example](#example)

## How to load fixtures

> **Warning**
> Be aware that fixtures will delete all current records in your DB, which is why they aren't allowed in production.

First, make sure you have your env variables correctly set.

### Env variables

Some of these variables are already set by default in the `.env` file, however, you can override them in a `.env.local` file (to set your own PocketBase password for example).

> **Note**  
> The correct `.env` file to use is located in the `svelte-kit` folder. The root `.env` file is used for Docker only.

| Variable                     | Description                                                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `SECRET_POCKETBASE_URL`      | The URL to connect to PocketBase. Should be the PocketBase container's name with its associated port.                         |
| `SECRET_POCKETBASE_USERNAME` | The username used by any admin to log into PocketBase.                                                                        |
| `SECRET_POCKETBASE_PASSWORD` | The password used by `SECRET_POCKETBASE_USERNAME`.                                                                            |
| `SECRET_FIXTURES_LOCALE`     | The locale to use for the `Faker` instance. Not required, will default to `en`.                                               |
| `SECRET_FIXTURES_ENV`        | The current Node environment. It must be set and cannot be `prod` or `production` as fixtures should never run in production. |

### Commands

To load fixtures, run `yarn fixtures` in the `svelte-kit` container, or `make fixtures` outside the container.

> **Note**  
> By default, the `yarn fixtures` command will ask you if you want to run fixtures and delete all current records.
> You can omit this prompt by adding `-f` to the command. The `make fixtures` command already does that.

## How to create a fixture

You can easily create your fixture for a newly added collection, or edit an already existing fixture.

### Every necessary step

Follow these steps to create a new fixture for a collection :

1. Create a `.ts` file in the `svelte-kit/fixtures/data` directory.
2. Your file must have a default export of type `Fixture<T>` which contains a `name`, `order` and `load` property.
3. Your fixture's `name` property must be unique. It must be a collection's name.
4. Fixtures are loaded depending on their `order` (ascendant) property. Make sure your fixture has a higher order than the fixtures it depends on so it gets executed after them.
5. Your `load` must be an async callback which receives `pb: PocketBase` as its first argument, an object `references` containing the already registered items by the other fixtures as its second argument, and `faker: Faker`.
6. Your `load` function must return an object with a `records` property, which is an object with `string | number` as its key and a `Response` corresponding to the newly inserted data.

### Example

Here is an example of what a fixture can look like (taken from the `tierlists.ts` fixture) :

```ts
// svelte-kit/fixtures/data/tierlists.ts

// Classic imports (not type) must end with .js
import { RANKS_FIXTURE_RANGE, RANKS_FIXTURE_NAMES } from './ranks.js';

// Import the necessary types for full type-safety
import type { Fixture, Reference } from '../index';
import type { TierlistsRecord, TierlistsResponse } from '../../src/lib/types/pocketbase';

// Define constants that could be helpful to other fixtures, such as how many records we are creating
// Note that we are also using constants declared by the "ranks" fixture
export const TIERLISTS_FIXTURE_RANGE = Math.ceil(RANKS_FIXTURE_RANGE / RANKS_FIXTURE_NAMES);

// The required default export
export default ({
  // The unique name of our fixture. It must be the name of one of the existing collections
  name: 'tierlists',
  // The order (ascendant) in which our fixture will be loaded. Here, we make sure to load it after its dependency "ranks"
  order: 2,
  // The load callback which will insert our records and return them
  load: async (pb, references, faker) => {
    // The object containing all our records
    const records: Reference<TierlistsResponse> = {};
    // Get the "ranks" references if they exist
    const rankReferences = references.ranks || {};
    const tierlistNames = ['Tierlist', 'Rankings', ''];

    // Create a simple loop to add our tierlists
    for (const i of Array(TIERLISTS_FIXTURE_RANGE).keys()) {
      const tierlistRanks: string[] = [];

      // Make sure all our tierlists only have x number of ranks (where x is RANKS_FIXTURE_NAMES)
      for (const n of Array(RANKS_FIXTURE_NAMES).keys()) {
        const rankIndex = i * RANKS_FIXTURE_NAMES + n;

        if (rankIndex < RANKS_FIXTURE_RANGE) {
          tierlistRanks.push(rankReferences[rankIndex].id);
        }
      }

      // Start creating fake data using the faker instance of our load function
      const name = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.helpers.arrayElement(tierlistNames)}`;

      // Create and save the newly added record in our "records" object
      records[i] = await pb.collection('tierlists').create<TierlistsResponse>({
        name,
        slug: faker.helpers.slugify(name),
        description: faker.lorem.sentences(),
        public: faker.datatype.boolean(),
        canBeTemplate: faker.datatype.boolean(),
        ranks: tierlistRanks,
      } as TierlistsRecord);
    }

    // Return an object containing a "records" property with our records
    return { records };
  },
// Use the Fixture<T> type to get full type-safety on your export
}) satisfies Fixture<TierlistsResponse>;

```

> **Note**  
> Your "records" object can also contain strings as keys (eg: you need to be able to locate a specific user).
