import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ErrorMessage } from 'src/app/models/error-message'
import { Message } from 'src/app/models/message'
import { User } from 'src/app/models/user'
import { AlertService } from 'src/app/services/alert/alert.service'
import { PrivateMessagesService } from 'src/app/services/private-messages/private-messages.service'
import { SocketioService } from 'src/app/services/socketio/socketio.service'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit, OnDestroy {
  chatForm: FormGroup
  menuActivated: Boolean = false
  isRemovingFriend: Boolean = false

  messages: Message[]
  errorMessage: ErrorMessage
  loggedInUsername: string
  friend: User

  private privateMessageSubscription: Subscription
  private validationErrorSubscription: Subscription

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private socketService: SocketioService,
    private privateMessagesService: PrivateMessagesService,
    private userService: UserService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.friend = this.userService.getfriend(this.route.snapshot.paramMap.get('id'))

    // Shows 404 page instead if users are not friends.
    if (!this.friend) {
      this.router.navigate(['404'], { skipLocationChange: true })
      return
    }

    this.messages = this.privateMessagesService.getPrivateMessages(this.friend.userID)
    this.loggedInUsername = this.userService.username
  }
  
  ngOnInit(): void {
    this.initForm()

    // Listen to private messages and validation error messages from socket connection.
    this.privateMessageSubscription = this.socketService.onPrivateMessage()
      .subscribe((message: Message) => this.onPrivateMessage(message))

    this.validationErrorSubscription = this.socketService.onValidationErrorMessage()
      .subscribe((errorMessage: ErrorMessage) => this.onValidationError(errorMessage))

    // Manually detect changes in the DOM to automatically scroll down when needed.
    this.changeDetectorRef.detectChanges()
  }

  ngOnDestroy(): void {
    this.privateMessageSubscription?.unsubscribe()
    this.validationErrorSubscription?.unsubscribe()
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
   * Toggles the menu to show and hide.
   */
  onMenuClick(): void {
    if (this.menuActivated) {
      this.menuActivated = false
    } else {
      this.menuActivated = true
    }
  }

  /**
   * Triggers a confirmation menu to appear for removing the friend.
   */
  onRemoveFriend(): void {
    this.isRemovingFriend = true
    this.menuActivated = false
  }

  /**
   * Cancels removing friend.
   */
  onCancelRemoveFriend(): void {
    this.isRemovingFriend = false
  }

  /**
   * Removes the friend.
   */
  onConfirmRemoveFriend(): void {
    this.userService.removeFriend(this.friend.userID).subscribe(res => {
      if (res.status === 204) {
        this.alertService.successAlert('You are no longer friends with ' + this.friend.username)
        this.router.navigate(['/'])
      } else {
        this.alertService.warningAlert('Something went wrong, try again')
      }
    })
  }

  /**
   * Add incoming message to messages array for display.
   */
  private onPrivateMessage(message: Message): void {
    if (message.sender.userID === this.friend.userID ||
        message.sender.username === this.loggedInUsername) {
      this.messages.push(message)
    }

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
}
