import { array, hexColor, maxLength, minLength, minValue, number, object, string, toTrimmed, toTrimmedEnd, type Input } from 'valibot';

import { ItemSchema } from './item';

export const RankSchema = object({
  name: string('Please enter a valid name.', [
    toTrimmed(),
    minLength(1, 'The name of a rank must contain at least 1 character.'),
    maxLength(100, 'The name of a rank must contain at most 100 characters.'),
  ]),
  color: string('Please enter a valid color.', [toTrimmed(), hexColor('The color of a rank must be a valid hex color code.')]),
  description: string('Please enter a valid description.', [
    toTrimmedEnd(),
    maxLength(2000, 'The description of a rank must contain at most 2000 characters.'),
  ]),
  position: number("This rank's position is invalid.", [minValue(0, "This rank's position is invalid.")]),
  items: array(ItemSchema),
});

export type RankInput = Input<typeof RankSchema>;
