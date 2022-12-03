import type { ComponentType } from 'svelte';
import { modalStore, type ModalComponent, type ModalSettings } from '@brainandbones/skeleton';

// TODO: Update with the last version of Skeleton modalStore
export function openModal(component: ComponentType, props: Record<string, any>): void {
  const modalComponent: ModalComponent = {
    ref: component,
    props: props,
    slot: ''
  };
  const d: ModalSettings = {
    type: 'component',
    component: modalComponent
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  modalStore.trigger(d);
}
