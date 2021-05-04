export interface Alert {
  message: string;
  type: AlertType;
}

export enum AlertType {
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}