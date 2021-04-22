export class Alert {
  message: string;
  type: AlertType;
}

export enum AlertType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}