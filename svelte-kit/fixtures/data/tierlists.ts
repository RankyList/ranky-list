import type { Fixture, Reference } from '../index';
import type { TierlistsRecord, TierlistsResponse } from '../../src/lib/types/pocketbase';
import type { DATA as USER_DATA } from './users';

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
    description: 'Private tierlist (WIP)',
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
} as const satisfies Reference<
  TierlistsRecord & {
    createdBy: keyof typeof USER_DATA;
  }
>;

export type TierlistsDataKeys = keyof typeof DATA;

export default {
  name: 'tierlists',
  order: 1,
  load: async (pb, references) => {
    const records: Reference<TierlistsResponse> = {};
    const usersReferences = references.users || {};

    for (const [i, tierlist] of Object.entries(DATA)) {
      records[i] = await pb.collection('tierlists').create<TierlistsResponse>({
        name: tierlist.name,
        slug: tierlist.slug,
        description: tierlist.description,
        public: tierlist.public,
        canBeTemplate: tierlist.canBeTemplate,
        createdBy: usersReferences[tierlist.createdBy].id,
      } as TierlistsRecord);
    }

    return { records };
  },
} satisfies Fixture<TierlistsResponse>;
