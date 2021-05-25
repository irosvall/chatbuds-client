import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { io, Socket } from "socket.io-client"
import { ErrorMessage } from 'src/app/models/error-message'
import { Message } from 'src/app/models/message'
import { User } from 'src/app/models/user'
import { environment as env } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private _socket: Socket
  private privateMessage: Subject<Message> = new Subject<Message>()
  private randomMessage: Subject<Message> = new Subject<Message>()
  private validationErrorMessage: Subject<ErrorMessage> = new Subject<ErrorMessage>()
  private chatMatch: Subject<User> = new Subject<User>()
  private chatLeft: Subject<undefined> = new Subject<undefined>()
  private newFriend: Subject<User> = new Subject<User>()
  private friendRequest: Subject<User> = new Subject<User>()
  private removeFriend: Subject<User> = new Subject<User>()

  constructor () { 
  }

  setupSocketConnection(): void {
    const socketOptions: any = {
      autoConnect: false,
      withCredentials: true
    }
    if (env.SOCKET_PATH) {
      socketOptions.path = env.SOCKET_PATH
    }

    this._socket = io(env.DOMAIN_NAME, socketOptions)

    this._socket.on('privateMessage', message => this.onSocketPrivateMessage(message))
    this._socket.on('randomMessage', message => this.onSocketRandomMessage(message))
    this._socket.on('validationError', errorMessage => this.onSocketValidationError(errorMessage))
    this._socket.on('chatMatch', matchedUser => this.onSocketChatMatch(matchedUser))
    this._socket.on('randomChatLeave', () => this.onSocketChatLeft())
    this._socket.on('newFriend', res => this.onSocketNewFriend(res.user))
    this._socket.on('friendRequest', res => this.onSocketFriendRequest(res.from))
    this._socket.on('removeFriend', res => this.onSocketRemoveFriend(res.user))
  }

  /**
   * Returns observable for private messages.
   */
   onPrivateMessage(): Observable<Message> {
    return this.privateMessage.asObservable()
  }

  /**
   * Returns observable for random messages.
   */
  onRandomMessage(): Observable<Message> {
    return this.randomMessage.asObservable()
  }

  /**
   * Returns observable for validation error messages.
   */
  onValidationErrorMessage(): Observable<ErrorMessage> {
    return this.validationErrorMessage.asObservable()
  }

  /**
   * Returns observable for when the user get's a chat match in random chat.
   */
  onChatMatch(): Observable<User> {
    return this.chatMatch.asObservable()
  }

  /**
   * Returns observable for when the user get's left in random chat.
   */
  onChatLeft(): Observable<undefined> {
    return this.chatLeft.asObservable()
  }

  /**
   * Returns observable for when the user get's a new friend.
   */
  onNewFriend(): Observable<User> {
    return this.newFriend.asObservable()
  }

  /**
   * Returns observable for when the user get's a friend request.
   */
   onFriendRequest(): Observable<User> {
    return this.friendRequest.asObservable()
  }

  /**
   * Returns observable for the removed friend.
   */
  onRemoveFriend(): Observable<User> {
    return this.removeFriend.asObservable()
  }

  private onSocketPrivateMessage(message: Message) {
    this.privateMessage.next(message)
  }

  private onSocketRandomMessage(message: Message) {
    this.randomMessage.next(message)
  }

  private onSocketValidationError(errorMessage: ErrorMessage) {
    this.validationErrorMessage.next(errorMessage)
  }

  private onSocketChatMatch(matchedUser: User) {
    this.chatMatch.next(matchedUser)
  }

  private onSocketChatLeft() {
    this.chatLeft.next()
  }

  private onSocketNewFriend(user: User) {
    this.newFriend.next(user)
  }

  private onSocketFriendRequest(user: User) {
    this.friendRequest.next(user)
  }

  private onSocketRemoveFriend(user: User) {
    this.removeFriend.next(user)
  }

  get socket(): Socket {
    return this._socket
  }
}
