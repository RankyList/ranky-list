import { type ModalComponent, type ModalSettings, modalStore } from '@skeletonlabs/skeleton';

import type { ParentModalProp } from '$type/modal';
import type { ComponentType } from 'svelte';

export function openModal(component: ComponentType, props: ParentModalProp) {
  const modalComponent: ModalComponent = {
    ref: component,
    props: props,
    slot: '',
  };
  const d: ModalSettings = {
    type: 'component',
    component: modalComponent,
  };

  modalStore.trigger(d);
}
