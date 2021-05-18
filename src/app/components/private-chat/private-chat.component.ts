import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ErrorMessage } from 'src/app/models/error-message'
import { Message } from 'src/app/models/message'
import { User } from 'src/app/models/user'
import { SocketioService } from 'src/app/services/socketio/socketio.service'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {
  chatForm: FormGroup
  messages: Message[] = []
  errorMessage: ErrorMessage
  friend: User

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private socketService: SocketioService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.friend = this.userService.getfriend(this.route.snapshot.paramMap.get('id'))

    // Shows 404 page instead if users are not friends.
    if (!this.friend) {
      this.router.navigate(['404'], { skipLocationChange: true })
    }
  }

  ngOnInit(): void {
    this.initForm()
    this.socketService.socket.on('privateMessage', message => this.onPrivateMessage(message))
    this.socketService.socket.on('validationError', errorMessage => this.onValidationError(errorMessage))
  }

  /**
   * Sends message.
   */
  onSubmit(): void {
    this.socketService.socket.emit('privateMessage', { data: { message: this.message.value }, to: this.friend.userID })
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
  private onPrivateMessage(message: Message): void {
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
