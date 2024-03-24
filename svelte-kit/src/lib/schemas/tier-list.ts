import { array, boolean, maxLength, minLength, object, string, toTrimmed, toTrimmedEnd, type Input } from 'valibot';

import { ItemSchema } from './item';
import { RankSchema } from './rank';

export const TierListSchema = object({
  name: string('Please enter a valid name.', [
    toTrimmed(),
    minLength(2, 'The name of your tier list must contain at least 2 characters.'),
    maxLength(200, 'The name of your tier list must contain at most 200 characters.'),
  ]),
  description: string('Please enter a valid description.', [
    toTrimmedEnd(),
    maxLength(2000, 'The description of your tier list must contain at most 2000 characters.'),
  ]),
  public: boolean('Please choose whether your tier list should be public or private.'),
  canBeTemplate: boolean('Please choose whether your tier list can be used as a template.'),
  ranks: array(RankSchema, [
    minLength(1, 'Your tier list must contain at least 1 rank.'),
    maxLength(100, 'Your tier list cannot contain more than 100 ranks.'),
  ]),
  unrakedItems: array(ItemSchema),
});

export type TierListInput = Input<typeof TierListSchema>;
