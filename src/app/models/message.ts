import { User } from "./user";

export interface Message {
  id: string,
  sender: User,
  message: string
}