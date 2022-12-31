export interface ParentModal {
  background: string;
  buttonNeutral: string;
  buttonPositive: string;
  buttonTextCancel: string;
  buttonTextConfirm: string;
  buttonTextSubmit: string;
  height: string;
  padding: string;
  regionBackdrop: string;
  regionBody: string;
  regionFooter: string;
  regionHeader: string;
  rounded: string;
  shadow: string;
  spacing: string;
  width: string;
  onClose: () => void;
  [key: string | number | symbol]: unknown;
}

export type ParentModalProp = Partial<ParentModal>;
