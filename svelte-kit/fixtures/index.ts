import PocketBase from 'pocketbase';
import fs from 'graceful-fs';
import path from 'path';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { type Faker } from '@faker-js/faker';
import { createInterface } from 'readline/promises';

import type { BaseSystemFields, CollectionRecords, CollectionResponses } from '../src/lib/types/pocketbase';

export type Reference<T = BaseSystemFields> = {
  [key: string | number]: T;
};

export type ReferenceHolder<T = BaseSystemFields> = {
  records: Reference<T>;
};

export type ReferenceMap = {
  [key in keyof CollectionResponses]?: Reference<CollectionResponses[key]>;
};

export type Fixture<T = BaseSystemFields> = {
  name: keyof CollectionRecords;
  order?: number;
  load(pb: PocketBase, references: ReferenceMap, faker: Faker): Promise<ReferenceHolder<T>>;
};

const prompt = createInterface({ input: process.stdin, output: process.stdout });
const shouldExecute = process.argv.includes('-f');

if (!shouldExecute) {
  console.log(chalk.yellow('Are you sure you want to execute these fixtures? This will clear all registered collections.'));

  const keepGoing = await prompt.question(chalk.yellow('Enter \'yes\' to continue: '));

  if (!['y', 'ye', 'yes'].includes(keepGoing.toString().trim())) {
    console.log(chalk.red('Aborted by user.'));

    process.exit(0);
  }
}

try {
  console.info(chalk.blue('Loading env variables...'));

  // Load .env, .env.local and check if necessary variables are set
  dotenv.config();

  if (fs.existsSync(path.join(process.cwd(), '.env.local'))) {
    dotenv.config({ path: path.join(process.cwd(), '.env.local'), override: true });
  }

  if (!process.env.SECRET_POCKETBASE_URL) {
    throw new Error('Env variable "SECRET_POCKETBASE_URL" is missing.');
  }

  if (!process.env.SECRET_POCKETBASE_USERNAME) {
    throw new Error('Env variable "SECRET_POCKETBASE_USERNAME" is missing.');
  }

  if (!process.env.SECRET_POCKETBASE_PASSWORD) {
    throw new Error('Env variable "SECRET_POCKETBASE_PASSWORD" is missing.');
  }

  if (['prod', 'production'].includes(process.env.SECRET_FIXTURES_ENV ?? 'prod')) {
    throw new Error('Env variable "SECRET_FIXTURES_ENV" is either missing or set to production. This script will not run in production.');
  }

  if (!process.env.SECRET_FIXTURES_LOCALE) {
    console.warn(chalk.yellow('Env variable "SECRET_FIXTURES_LOCALE" is not set, defaulting to "en".'));
  }

  console.info(chalk.green('Env variables loaded successfully!'));
} catch (err) {
  console.error(chalk.red('Error while loading env variables: ') + chalk.bgRed(err));
  console.dir(err);

  process.exit(1);
}

let pb: PocketBase;
let faker: Faker;

if (process.env.SECRET_FIXTURES_LOCALE) {
  try {
    faker = (await import(`@faker-js/faker/locale/${process.env.SECRET_FIXTURES_LOCALE}`)).faker;
  } catch (_) {
    console.warn(chalk.yellow(`Failed to load locale "${process.env.SECRET_FIXTURES_LOCALE}" for faker. Defaulting en "en".`));

    faker = (await import('@faker-js/faker/locale/en')).faker;
  }
} else {
  faker = (await import('@faker-js/faker/locale/en')).faker;
}

try {
  console.info(chalk.blue('Logging into PocketBase...'));

  // Log in as admin user
  pb = new PocketBase(process.env.SECRET_POCKETBASE_URL);
  await pb.admins.authWithPassword(process.env.SECRET_POCKETBASE_USERNAME, process.env.SECRET_POCKETBASE_PASSWORD);

  console.info(chalk.green('Successfully logged into PocketBase!'));
} catch (err) {
  console.error(chalk.red('Error while logging into PocketBase: ') + chalk.bgRed(err));
  console.dir(err);

  process.exit(1);
}

try {
  console.info(chalk.blue('Loading fixtures...'));

  // Prepare the loading of fixtures
  const fixturesDir = path.join(process.cwd(), 'fixtures', 'data');
  const fixtureFiles = fs.readdirSync(fixturesDir);
  const fixtures: Fixture<CollectionResponses[keyof CollectionResponses]>[] = [];
  const references: ReferenceMap = {};

  // Load the fixtures
  for (const fixtureFile of fixtureFiles) {
    const fixturePath = path.join(fixturesDir, fixtureFile);
    const { default: fixture } = await import(fixturePath) as { default: Fixture<CollectionResponses[keyof CollectionResponses]> };

    if (!fixtures.some((f) => f.name === fixture.name)) {
      fixtures.push(fixture);
    } else {
      console.warn(chalk.yellow(`Fixture ${chalk.underline(fixture.name)} already exists, skipping...`));
    }
  }

  // Sort the fixtures
  fixtures.sort((a, b) => (a.order || 0) - (b.order || 0));

  // Execute the delete function for each collection in reverse order of fixture loading
  for (const fixture of [...fixtures].reverse()) {
    const collectionName = fixture.name;
    console.info(chalk.yellow(`Deleting records in ${chalk.underline(collectionName)} collection...`));

    const { totalItems } = await pb.collection(collectionName).getList(1, 1);
    const records = await pb.collection(collectionName).getFullList({ batch: totalItems });

    for (const record of records) {
      await pb.collection(collectionName).delete(record.id);
    }

    console.info(chalk.green(`Deleted all records in ${chalk.underline(collectionName)} collection.`));
  }

  console.info(chalk.green(`All records deleted successfully!`));

  let fixtureCount = 0;

  // Execute the load function for each fixture
  for (const fixture of fixtures) {
    console.info(chalk.yellow(`Loading fixture ${chalk.underline(fixture.name)}...`));

    let newReference: ReferenceHolder<CollectionResponses[typeof fixture.name]>;

    try {
      newReference = await fixture.load(pb, references, faker);
      // @ts-ignore
      references[fixture.name] = newReference.records;
      fixtureCount += 1;

      console.info(chalk.green(`Loaded fixture: ${chalk.underline(fixture.name)}.`));
    } catch (err) {
      console.error(chalk.red(`Error while loading ${chalk.underline(fixture.name)} fixture: `) + chalk.bgRed(err));
      console.dir(err);

      process.exit(1);
    }
  }

  console.info(chalk.green(`All fixtures (${chalk.underline(fixtureCount)}) loaded successfully!`));

  process.exit(0);
} catch (err) {
  console.error(chalk.red('Error while loading fixtures: ') + chalk.bgRed(err));
  console.dir(err);

  process.exit(1);
}

