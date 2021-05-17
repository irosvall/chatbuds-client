import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { ErrorMessage } from 'src/app/models/error-message'
import { Message } from 'src/app/models/message'
import { User } from 'src/app/models/user'
import { AlertService } from 'src/app/services/alert/alert.service'
import { SocketioService } from 'src/app/services/socketio/socketio.service'
import { UserService } from 'src/app/services/user/user.service'
@Component({
  selector: 'app-random-chat',
  templateUrl: './random-chat.component.html',
  styleUrls: ['./random-chat.component.css']
})
export class RandomChatComponent implements OnInit, OnDestroy {
  public chatForm: FormGroup
  public messages: Message[] = []
  public errorMessage: ErrorMessage

  // States to update the template depending on.
  public isSearching: Boolean = false
  public hasMatch: Boolean = false
  public isLeft: Boolean = false

  private matchedUser: User
  private previousMatch: User

  constructor (
    private socketService: SocketioService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.socketService.socket.on('chatMatch', matchedUser => this.onChatMatch(matchedUser))
    this.socketService.socket.on('randomChatLeave', () => this.onLeft())
    this.socketService.socket.on('privateMessage', message => this.onPrivateMessage(message))
    this.socketService.socket.on('validationError', errorMessage => this.onValidationError(errorMessage))
  }

  ngOnDestroy(): void {
    this.leaveChat()
  }

  /**
   * Triggers when the user press "start chat".
   */
  onStartSearch(): void {
    this.isLeft = false
    this.hasMatch = false
    this.isSearching = true
    this.socketService.socket.emit('randomChatJoin', {
      options: {
        previousChatBuddy: this.previousMatch?.userID 
      }
    })
  }

  /**
   * Sends message.
   */
  onSubmit(): void {
    this.socketService.socket.emit('privateMessage', { data: { message: this.message.value }, to: this.matchedUser.userID })
    this.resetChat()
  }

  /**
   * Makes user leave the current chat buddy and search for a new one.
   */
  onSearchNew(): void {
    if (!this.isLeft) {
      this.leaveChat()
    }
    this.previousMatch = this.matchedUser
    this.matchedUser = undefined
    this.onStartSearch()
  }

  /**
   * Sends a friend request to the current chat buddy.
   */
  onAddFriend(): void {
    this.userService.sendFriendRequest(this.matchedUser.userID).subscribe(res => {
      if (res.ok) {
        this.alertService.successAlert('Friend request sent')
      } else if (res.status === 409) {
        this.alertService.infoAlert('A friend request has already been sent')
      } else {
        this.alertService.warningAlert('An error occured, try again')
      }
    })
  }

  /**
   * When user presses a key submit message when the key is enter.
   */
  onKeydown(event: KeyboardEvent): void {
    if (event.code === 'Enter' &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey) {
      event.preventDefault()
      if (this.chatForm.valid) {
        this.onSubmit()
      }
    }
  }

  /**
   * Triggers when the user gets matched with another user.
   */
  private onChatMatch(matchedUser: User): void {
    this.resetChat(true)
    this.chatForm.enable()
    this.matchedUser = matchedUser
    this.isSearching = false
    this.hasMatch = true
  }

  /**
   * Gets triggered when the other user leaves the chat session.
   */
  private onLeft(): void {
    this.isLeft = true
    this.chatForm.disable()
  }

  /**
   * Add incoming message to messages array for display.
   */
  private onPrivateMessage(message: Message): void {
    this.messages.push(message)

    // Manually detect changes in the DOM to automatically scroll down when needed.
    this.changeDetectorRef.detectChanges()
  }

  /**
   * Displays an errorMessage if a validation error happens for message input.
   */
  private onValidationError(message: ErrorMessage): void {
    this.errorMessage = message
  }

  /**
   * Emits a socket message that the user has left the chat.
   */
  private leaveChat(): void {
    this.socketService.socket.emit('randomChatLeave', { to: this.matchedUser?.userID })
  }

  /**
   * Intializes the chat form.
   */
  private initForm(): void {
    this.chatForm = new FormGroup({
      message: new FormControl('', Validators.required)
    })
  }

  /**
   * Resets the chat.
   *
   * @param {Boolean} shouldDeleteMessages - Decides whether or not the messages should get deleted.
   */
  private resetChat(shouldDeleteMessages: Boolean = false): void {
    this.chatForm.reset()
    this.errorMessage = undefined

    if (shouldDeleteMessages) {
      this.messages = []
    }
  }

  get message(): AbstractControl {
    return this.chatForm.get('message')
  }

  get loggedInUsername(): string {
    return this.userService.username
  }
}
