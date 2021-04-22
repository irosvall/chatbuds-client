import { Chat } from "./chat";

export interface User {
  username: string;
  email?: string;
  about?: string;
  friends?: Array<User>;
  chats?: Array<Chat>;
  createdAt?: string;
  updatedAt?: string;
}
