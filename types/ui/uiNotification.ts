export interface DialogState {
  isOpen: boolean;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}
