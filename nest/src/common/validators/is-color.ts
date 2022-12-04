import { registerDecorator, ValidationOptions, ValidationArguments, isRgbColor, isHexColor } from 'class-validator';

/**
* Checks if a value is a color (RGB or Hex).
*/
export function IsColor(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isColor',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, unknown>)[relatedPropertyName];

          return typeof relatedValue === 'string' && (isRgbColor(relatedValue) || isHexColor(relatedValue));
        },
      },
    });
  };
}
