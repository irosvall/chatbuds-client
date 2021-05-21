import { User } from "./user";

export interface RandomMessage {
  id?: string;
  sender: User;
  message: string;
}