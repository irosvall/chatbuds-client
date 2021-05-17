import { User } from "./user";

export interface Alert {
  message: string;
  type: AlertType;
}

export class FriendRequestAlert implements Alert {
  message: string;
  type: AlertType = AlertType.FriendRequest;
  from: User;

  constructor (message: string, user: User) {
    this.message = message
    this.from = user
  }
}

export enum AlertType {
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
  FriendRequest = 'friend-request',
}