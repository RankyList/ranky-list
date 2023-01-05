import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface Variant {
  color: string;
  icon: IconDefinition;
}

export interface Variants {
  add: Variant;
  edit: Variant;
  delete: Variant;
  ok: Variant;
  cancel: Variant;
}
