import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
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
export class RandomChatComponent implements OnInit {
  chatForm: FormGroup
  messages: Message[] = []
  errorMessage: ErrorMessage
  
  private matchedUser: User

  constructor (
    private socketService: SocketioService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.chatForm.disable()
    this.socketService.socket.emit('randomChatJoin')
    this.socketService.socket.on('chatMatch', matchedUser => this.onChatMatch(matchedUser))
    this.socketService.socket.on('privateMessage', message => this.onPrivateMessage(message))
    this.socketService.socket.on('validationError', errorMessage => this.onValidationError(errorMessage))
  }

  /**
   * Sends message.
   */
  onSubmit(): void {
    this.socketService.socket.emit('privateMessage', { data: { message: this.message.value }, to: this.matchedUser.userID })
    this.chatForm.reset()
    this.errorMessage = undefined
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

  private onChatMatch(matchedUser: User) {
    console.log(matchedUser.username)
    this.chatForm.enable()
    this.matchedUser = matchedUser
  }

  /**
   * Add incoming message to messages array for display.
   */
  private onPrivateMessage(message: Message) {
    console.log(message)
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

  get message(): AbstractControl {
    return this.chatForm.get('message')
  }

  get loggedInUsername(): string {
    return this.userService.username
  }
}
