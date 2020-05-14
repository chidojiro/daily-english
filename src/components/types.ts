export interface IGeneralDialogProps {
  visible: boolean;
  onOk: () => Promise<any>;
  onCancel: () => void;
}
