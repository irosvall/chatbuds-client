import { Injectable } from '@angular/core'
import { Message } from 'src/app/models/message'
import { SocketioService } from '../socketio/socketio.service'
import { UserService } from '../user/user.service'

@Injectable({
  providedIn: 'root'
})
export class PrivateMessagesService {
  private privateMessages: { userID: Array<Message> } | {} = {}

  constructor (
    private socketService: SocketioService,
    private userService: UserService,
  ) { }

  /**
   * Start listening for private messages.
   */
  startListen() {
    this.socketService.onPrivateMessage().subscribe((message: Message) => this.onPrivateMessage(message))
  }

  /**
   * Empties the private messages.
   */
  resetMessages() {
    this.privateMessages = {}
  }

  /**
   * Returns the private messages converstion with the specified user.
   *
   * @param {string} userID - The ID of the user to get conversation from.
   */
  getPrivateMessages(userID: string): Array<Message> {
    if (!this.privateMessages.hasOwnProperty(userID)) {
      return []
    }
    return Array.from(this.privateMessages[userID])
  }

  /**
   * Add private message to the user ID property of the other user.
   */
  private onPrivateMessage(message: Message) {
    const senderUserID = message.sender.userID

    if (senderUserID === this.userService.userID) {
      const recieverUserID = message.to

      this.addMessage(message, recieverUserID)
    } else {
      this.addMessage(message, senderUserID)
    }
  }

  /**
   * Adds the private message to corresponding user. Messages per user can't exceed 300.
   */
  private addMessage(message: Message, userID: string) {
    if (!this.privateMessages.hasOwnProperty(userID)) {
      this.privateMessages[userID] = []
    }
    this.privateMessages[userID].push(message)

    if (this.privateMessages[userID].length > 300) {
      this.privateMessages[userID].shift()
    }
  }
}
