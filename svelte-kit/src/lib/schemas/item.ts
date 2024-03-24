import { maxLength, minLength, minValue, number, object, string, toTrimmed, toTrimmedEnd, type Input } from 'valibot';

export const ItemSchema = object({
  name: string('Please enter a valid name.', [
    toTrimmed(),
    minLength(1, 'The name of an item must contain at least 1 character.'),
    maxLength(100, 'The name of an item must contain at most 100 characters.'),
  ]),
  description: string('Please enter a valid description.', [
    toTrimmedEnd(),
    maxLength(2000, 'The description of an item must contain at most 2000 characters.'),
  ]),
  position: number("This rank's position is invalid.", [minValue(0, "This rank's position is invalid.")]),
});

export type ItemInput = Input<typeof ItemSchema>;
