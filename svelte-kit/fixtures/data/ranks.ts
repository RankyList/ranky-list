import type { Fixture, Reference } from '../index';
import type { RanksRecord, RanksResponse } from '../../src/lib/types/pocketbase';
import type { TierListsDataKeys } from './tier-lists';

export type RankReference = Reference<Omit<RanksRecord, 'tierList'>>;

export type TierListRanksData = Record<TierListsDataKeys, RankReference>;

export const DATA = {
  cars: {
    veryFast: {
      name: 'Very Fast',
      color: '#FF0000',
      description: 'The fastest cars',
      position: 0,
    },
    fast: {
      name: 'Fast',
      color: '#FFA500',
      description: 'Fast cars',
      position: 1,
    },
    average: {
      name: 'Average',
      color: '#FFFF00',
      description: 'Average cars',
      position: 2,
    },
    slow: {
      name: 'Slow',
      color: '#008000',
      description: 'Slow cars',
      position: 3,
    },
  },
  frameworks: {
    incredible: {
      name: 'Incredible',
      color: '#008000',
      description: 'Incredible frameworks with amazing DX and performance',
      position: 0,
    },
    good: {
      name: 'Good',
      color: '#0000FF',
      description: 'Good frameworks that get the job done',
      position: 1,
    },
    okay: {
      name: 'Okay',
      color: '#FFA500',
      description: 'Okayish frameworks',
      position: 2,
    },
    outdated: {
      name: 'Outdated',
      color: '#FF0000',
      description: 'Outdated frameworks, you should avoid these unless you really like them',
      position: 3,
    },
  },
  private: {},
  template: {
    s: {
      name: 'S',
      color: '#5E2CA5',
      description: 'S tier',
      position: 0,
    },
    a: {
      name: 'A',
      color: '#FFD700',
      description: 'A tier',
      position: 1,
    },
    b: {
      name: 'B',
      color: '#0000FF',
      description: 'B tier',
      position: 2,
    },
    c: {
      name: 'C',
      color: '#FFA500',
      description: 'C tier',
      position: 3,
    },
  },
} as const satisfies TierListRanksData;

export type RanksDataKeys = keyof typeof DATA;

export default {
  name: 'ranks',
  order: 2,
  load: async (pb, references) => {
    const records: Reference<RanksResponse> = {};
    const tierListsReferences = references.tierLists || {};

    for (const [tierList, ranks] of Object.entries(DATA)) {
      for (const [i, rank] of Object.entries(ranks)) {
        records[i] = await pb.collection('ranks').create({
          name: rank.name,
          color: rank.color,
          description: rank.description,
          position: rank.position,
          tierList: tierListsReferences[tierList].id,
        } as RanksRecord);
      }
    }

    return { records };
  },
} satisfies Fixture<RanksResponse>;
