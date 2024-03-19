import type { Fixture, Reference } from '..';
import type { ItemsRecord, ItemsResponse } from '../../src/lib/types/pocketbase';
import type { DATA as RANKS_DATA, RanksDataKeys } from './ranks';

export type RanksData<T extends RanksDataKeys = RanksDataKeys> = {
  [tierlistKey in T]: {
    [key in keyof (typeof RANKS_DATA)[tierlistKey]]: Reference<Omit<ItemsRecord, 'rank'>>;
  };
};

export const DATA = {
  cars: {
    veryFast: {
      teslaModelS: {
        name: 'Tesla Model S',
        description: 'The Tesla Model S can go from 0 to 60 mph in just 1.99 seconds.',
        position: 0,
      },
      nissanGTR: {
        name: 'Nissan GT-R',
        description: 'The Nissan GT-R can reach speeds of up to 196 mph.',
        position: 1,
      },
    },
    fast: {
      porsche911: {
        name: 'Porsche 911',
        description: 'The Porsche 911 can go from 0 to 60 mph in just 3.5 seconds.',
        position: 0,
      },
      bmwM5: {
        name: 'BMW M5',
        description: 'The BMW M5 can reach speeds of up to 190 mph.',
        position: 1,
      },
    },
    average: {
      renaultZoe: {
        name: 'Renault Zoe',
        description: 'The Renault Zoe is a compact electric car with a range of 245 miles.',
        position: 0,
      },
    },
    slow: {
      smartFortwo: {
        name: 'Smart Fortwo',
        description: 'The Smart Fortwo can go from 0 to 60 mph in "just" 14.4 seconds.',
        position: 0,
      },
    },
  },
  frameworks: {
    incredible: {
      svelte: {
        name: 'Svelte',
        description: 'Svelte is a radical new approach to building user interfaces.',
        position: 0,
      },
      sveltekit: {
        name: 'SvelteKit',
        description: 'SvelteKit is a framework for building web applications of all sizes.',
        position: 1,
      },
      symfony: {
        name: 'Symfony',
        description: 'Symfony is a set of reusable PHP components and a PHP framework.',
        position: 2,
      },
      vue3: {
        name: 'Vue 3',
        description: 'Vue 3 is a progressive framework for building user interfaces.',
        position: 3,
      },
    },
    good: {
      react: {
        name: 'React',
        description: 'React is a JavaScript library for building user interfaces.',
        position: 0,
      },
      nextjs: {
        name: 'Next.js',
        description: 'Next.js is a React framework for production.',
        position: 1,
      },
      vue2: {
        name: 'Vue 2',
        description: 'Vue 2 is a progressive framework for building user interfaces.',
        position: 2,
      },
      nuxtjs: {
        name: 'Nuxt.js',
        description: 'Nuxt.js is a framework for creating Vue.js applications.',
        position: 2,
      },
    },
    okay: {
      angular: {
        name: 'Angular',
        description: 'Angular is a platform for building mobile and desktop web applications.',
        position: 0,
      },
      ember: {
        name: 'Ember',
        description: 'Ember.js is a productive, battle-tested JavaScript framework.',
        position: 1,
      },
      meteor: {
        name: 'Meteor',
        description: 'Meteor is a full-stack JavaScript platform for developing modern web and mobile applications.',
        position: 2,
      },
      sapper: {
        name: 'Sapper',
        description: 'Sapper is a framework for building web applications of all sizes.',
        position: 3,
      },
    },
    outdated: {
      backbone: {
        name: 'Backbone',
        description: 'Backbone.js gives structure to web applications by providing models with key-value binding and custom events.',
        position: 0,
      },
      knockout: {
        name: 'Knockout',
        description: 'Knockout is a JavaScript library that helps you to create rich, responsive display and editor user interfaces with a clean underlying data model.',
        position: 1,
      },
      marionette: {
        name: 'Marionette',
        description: 'Marionette simplifies your Backbone application code with robust views and architecture solutions.',
        position: 2,
      },
      polymer: {
        name: 'Polymer',
        description: 'Polymer is a JavaScript library for building web applications using web components.',
        position: 3,
      },
    }
  },
  private: {},
  template: {
    s: {},
    a: {},
    b: {},
    c: {},
  },
} as const satisfies RanksData;

export default {
  name: 'items',
  order: 3,
  load: async (pb, references) => {
    const records: Reference<ItemsResponse> = {};
    const ranksReferences = references.ranks || {};

    for (const ranks of Object.values(DATA)) {
      for (const [rank, items] of Object.entries(ranks)) {
        for (const [i, item] of Object.entries<Omit<ItemsRecord, 'rank'>>(items)) {
          records[i] = await pb.collection('items').create<ItemsResponse>({
            name: item.name,
            description: item.description,
            position: item.position,
            rank: ranksReferences[rank].id,
          } as ItemsRecord);
        }
      }
    }

    return { records };
  },
} satisfies Fixture<ItemsResponse>;
