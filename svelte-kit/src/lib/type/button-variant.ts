import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface Variant {
  color: 'primary' | 'warning' | 'tertiary';
  icon: IconDefinition;
}

export interface Variants {
  add: Variant;
  edit: Variant;
  delete: Variant;
  ok: Variant;
  cancel: Variant;
}
