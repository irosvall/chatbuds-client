import { User } from "./user";

export interface Message {
  id?: string;
  sender: User;
  to: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}