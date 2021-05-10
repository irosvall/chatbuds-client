import { Chat } from "./chat";

export interface User {
  userID: string;
  username?: string;
  email?: string;
  about?: string;
  friends?: Array<User>;
  createdAt?: string;
  updatedAt?: string;
}
