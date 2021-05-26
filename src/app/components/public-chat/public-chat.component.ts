import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { ErrorMessage } from 'src/app/models/error-message'
import { Message } from 'src/app/models/message'
import { SocketioService } from 'src/app/services/socketio/socketio.service'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-public-chat',
  templateUrl: './public-chat.component.html',
  styleUrls: ['./public-chat.component.css']
})
export class PublicChatComponent implements OnInit, OnDestroy {
  chatForm: FormGroup
  messages: Message[] = []
  errorMessage: ErrorMessage

  private publicMessageSubscription: Subscription
  private validationErrorSubscription: Subscription

  constructor (
    private socketService: SocketioService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm()

    // Listen to public messages and validation error messages from socket connection.
    this.publicMessageSubscription = this.socketService.onPublicMessage()
      .subscribe((message: Message) => this.onPublicMessage(message))

    this.validationErrorSubscription = this.socketService.onValidationErrorMessage()
      .subscribe((errorMessage: ErrorMessage) => this.onValidationError(errorMessage))
  }

  ngOnDestroy(): void {
    this.publicMessageSubscription?.unsubscribe()
    this.validationErrorSubscription?.unsubscribe()
  }

  /**
   * Sends message.
   */
  onSubmit(): void {
    this.socketService.socket.emit('publicMessage', { message: this.message.value })
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

  /**
   * Add incoming message to messages array for display.
   */
  private onPublicMessage(message: Message) {
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
