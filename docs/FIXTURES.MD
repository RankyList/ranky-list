# Fixtures

This section concerns fixtures for PocketBase. Fixtures are fake data generated to facilitate development.

- [Fixtures](#fixtures)
  - [How to load fixtures](#how-to-load-fixtures)
    - [Env variables](#env-variables)
    - [Commands](#commands)
  - [How to create a fixture](#how-to-create-a-fixture)
    - [Every necessary step](#every-necessary-step)
    - [Examples](#examples)
      - [Simple fixture](#simple-fixture)
      - [Inserting files](#inserting-files)

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

### Examples

Here are some examples to better understand how to create a fixture.
You can look at other existing fixtures too in the `svelte-kit/fixtures/data` folder (where you will add your new fixture).

#### Simple fixture

Here is an example of what a fixture can look like (taken from the `tierlists.ts` fixture) :

```ts
// svelte-kit/fixtures/data/tierlists.ts

// Import the necessary types with "import type..."
import type { Fixture, Reference } from '../index';
import type { RanksRecord, RanksResponse } from '../../src/lib/types/pocketbase';

// Export useful constants concerning this fixture, such as how many ranks we add per tierlist
export const RANKS_FIXTURE_RANKS_PER_TIERLIST = 5;

// The required default export
export default ({
  // The name of our fixture, usually the name of the file and collection
  name: 'ranks',
  // The order (ascendant) in which to load this fixture
  order: 2,
  // Our load function with PocketBase, records of other fixtures and Faker
  load: async (pb, references, faker) => {
    // Prepare the records we will return
    const records: Reference<RanksResponse> = {};
    // Because we are loading after the "tierlists" fixture, all the tierlists inserted are available inside "references.tierlists"
    const tierlistsReferences = Object.entries(references.tierlists || {});

    // We loop over each tierlist
    for (const [i, tierlist] of tierlistsReferences) {
      // We use the constant defined earlier to know how many ranks to add
      for (const t of Array(RANKS_FIXTURE_RANKS_PER_TIERLIST).keys()) {
        // We create a new record with fake data and add it to our "records" object
        records[i] = await pb.collection('ranks').create<RanksResponse>({
          name: String.fromCharCode(65 + t), // Use the same names for every 5 ranks
          color: faker.internet.color(),
          description: faker.lorem.sentences(),
          position: t,
          tierlist: tierlist.id,
        } as RanksRecord); // Use "as" for type-safety
      }
    }

    // We return our records, which will be available to other fixtures as "references.ranks"
    return { records };
  },
// Use the Fixture<T> type to get full type-safety on your export
}) satisfies Fixture<RanksResponse>;

```

> **Note**  
> Your "records" object can also contain strings as keys (eg: you need to be able to locate a specific user).

With that, your fixture will be automatically loaded.
You can (and should) use a `FormData` instance containing all your fields instead of an object if you want to send files.

> **Warning**
> All module imports (not types) must end with the ".js" extension.

#### Inserting files

To insert a file, you must use a `FormData` object. Take a look at this example from the `users` fixture :

```ts
// svelte-kit/fixtures/data/users.ts

// ...

// Create a new FormData
const formData = new FormData();

try {
  // Get a fake url 🐱
  const url = faker.image.urlLoremFlickr({ category: 'cats' });
  // Use the utils function "downloadImage" to get the image as a Blob
  const avatar = await downloadImage(url, 'blob');

  // Append the Blob "avatar" to our FormData
  formData.append('avatar', avatar, url.split('/').at(-1)?.split('?').at(0));
} catch (_) {
  // Catch the error and show a warning, this just means that our user won't have an avatar (instead of failing all fixtures)
  console.warn(chalk.yellow(`Failed to download image ${avatarUrl}. User ${email} will have no avatar.`));
}

// ...

// Append other necessary fields
formData.append('email', email);

// ...

// Create the record using our `FormData` instance
records[i] = await pb.collection('users').create<UsersResponse>(formData);

```

> **Note**  
> `FormData.append` only accepts `string` or `Blob` as value. For any other value, you can use `JSON.stringify`.
