import { Message } from "./message";
import { User } from "./user";

export interface Chat {
  id: string;
  members?: Array<User>;
  messages?: Array<Message>;
  createdAt?: string;
  updatedAt?: string;
}