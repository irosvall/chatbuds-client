import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { ErrorMessage } from 'src/app/models/error-message'
import { Message } from 'src/app/models/message'
import { User } from 'src/app/models/user'
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

  constructor (
    private socketService: SocketioService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.socketService.socket.on('chatMatch', matchedUser => this.onChatMatch(matchedUser))
    this.socketService.socket.on('randomChatLeave', () => this.onLeft())
    this.socketService.socket.on('privateMessage', message => this.onPrivateMessage(message))
    this.socketService.socket.on('validationError', errorMessage => this.onValidationError(errorMessage))
  }

  ngOnDestroy(): void {
    this.socketService.socket.emit('randomChatLeave', { to: this.matchedUser?.userID })
  }

  /**
   * Triggers when the user press "start chat".
   */
  onStartSearch(): void {
    this.isLeft = false
    this.hasMatch = false
    this.isSearching = true
    this.socketService.socket.emit('randomChatJoin')
  }

  /**
   * Sends message.
   */
  onSubmit(): void {
    this.socketService.socket.emit('privateMessage', { data: { message: this.message.value }, to: this.matchedUser.userID })
    this.resetChat()
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
  private onChatMatch(matchedUser: User) {
    this.chatForm.enable()
    this.matchedUser = matchedUser
    this.isSearching = false
    this.hasMatch = true
  }

  /**
   * Gets triggered when the other user leaves the chat session.
   */
  private onLeft(): void {
    this.matchedUser = undefined
    this.isLeft = true
    this.chatForm.disable()
    this.resetChat(true)
  }

  /**
   * Add incoming message to messages array for display.
   */
  private onPrivateMessage(message: Message) {
    this.messages.push(message)

    // Manually detect changes in the DOM to automatically scroll down when needed.
    this.changeDetectorRef.detectChanges()
  }

  /**
   * Displays an errorMessage if a validation error happens for message input.
   */
  private onValidationError(message: ErrorMessage) {
    this.errorMessage = message
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
