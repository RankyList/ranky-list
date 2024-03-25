import type { Fixture, Reference } from '../index';
import type { TierListsRecord, TierListsResponse } from '../../src/lib/types/pocketbase';
import type { DATA as USER_DATA } from './users';

export type TierListReference = Reference<TierListsRecord & { createdBy: keyof typeof USER_DATA }>;

export const DATA = {
  cars: {
    name: 'Cars',
    slug: 'cars',
    description: 'Ranking of the best cars',
    public: true,
    canBeTemplate: false,
    createdBy: 'bob',
  },
  frameworks: {
    name: 'Best frameworks',
    slug: 'best-frameworks',
    description: 'Ranking of the best frameworks (any language)',
    public: true,
    canBeTemplate: false,
    createdBy: 'karl',
  },
  private: {
    name: 'Private',
    slug: 'private',
    description: 'Private tier list (WIP)',
    public: false,
    canBeTemplate: false,
    createdBy: 'karl',
  },
  template: {
    name: 'Template',
    slug: 'template',
    description: 'Tierlist template',
    public: true,
    canBeTemplate: true,
    createdBy: 'quantumQuasar97',
  },
} as const satisfies TierListReference;

export type TierListsDataKeys = keyof typeof DATA;

export default {
  name: 'tierLists',
  order: 1,
  load: async (pb, references) => {
    const records: Reference<TierListsResponse> = {};
    const usersReferences = references.users || {};

    for (const [i, tierList] of Object.entries(DATA)) {
      records[i] = await pb.collection('tierLists').create({
        name: tierList.name,
        slug: tierList.slug,
        description: tierList.description,
        public: tierList.public,
        canBeTemplate: tierList.canBeTemplate,
        createdBy: usersReferences[tierList.createdBy].id,
      } as TierListsRecord);
    }

    return { records };
  },
} satisfies Fixture<TierListsResponse>;
