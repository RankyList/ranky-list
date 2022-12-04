import { isArray } from 'class-validator';
import slugify from 'slugify';

interface SlugifyOptions {
  replacement?: string;
  remove?: RegExp;
  lower?: boolean;
  strict?: boolean;
  locale?: string;
  trim?: boolean;
};

export const slugifyDefaultOptions: SlugifyOptions = {
  replacement: '-',
  remove: undefined,
  lower: true,
  strict: true,
  locale: 'vi',
  trim: true
};

export const getSlug = (propertyOrProperties: string | string[], options = slugifyDefaultOptions) => {
  const properties = (isArray(propertyOrProperties) ? propertyOrProperties : [propertyOrProperties]) as string[];

  return properties.map((property) => `${ slugify(property, options) }`).join(options.replacement ?? '-');
};

export const getUniqueSlug = (propertyOrProperties: string | string[], options = slugifyDefaultOptions) => {
  const randomNumber = Math.floor(Math.random() * (9999 - 1000) + 1000);
  const id = Math.floor(+new Date() / randomNumber).toString(16);

  return `${ getSlug(propertyOrProperties, options) }${ options.replacement ?? '-' }${ id }`;
};
