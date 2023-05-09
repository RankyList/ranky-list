import type { ModalSettings as BaseModalSettings, ModalComponent as BaseModalComponent, CssClasses } from '@skeletonlabs/skeleton';
import type { SvelteComponent } from 'svelte';

export type ModalComponentNames = 'loginModal';

export interface ModalComponent extends BaseModalComponent {
  ref: typeof SvelteComponent;
}

export type ModalComponentRegistry = Record<ModalComponentNames, ModalComponent>;

export interface ModalSettings extends BaseModalSettings {
  component?: ModalComponent | ModalComponentNames;
}

export interface ModalParent {
  position: CssClasses;
  duration: number;
  flyOpacity: number;
  flyX: number;
  flyY: number;
  background: CssClasses;
  width: CssClasses;
  height: CssClasses;
  padding: CssClasses;
  spacing: CssClasses;
  rounded: CssClasses;
  shadow: CssClasses;
  buttonNeutral: CssClasses;
  buttonPositive: CssClasses;
  buttonTextCancel: string;
  buttonTextConfirm: string;
  buttonTextSubmit: string;
  regionBackdrop: CssClasses;
  regionHeader: CssClasses;
  regionBody: CssClasses;
  regionFooter: CssClasses;
  onClose: () => void;
}
