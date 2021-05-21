import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMessage } from 'src/app/models/error-message';
import { Message } from 'src/app/models/message';
import { MessageType } from 'src/app/models/message-type';
import { SocketioService } from 'src/app/services/socketio/socketio.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-public-chat',
  templateUrl: './public-chat.component.html',
  styleUrls: ['./public-chat.component.css']
})
export class PublicChatComponent implements OnInit {
  chatForm: FormGroup
  messages: Message[] = []
  errorMessage: ErrorMessage
  private _messageType: MessageType

  @Input()
  set messageType(param: MessageType) {
    this._messageType = param;
  }

  constructor (
    private socketService: SocketioService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.socketService.socket.on(this._messageType, message => this.onPublicMessage(message))
    this.socketService.socket.on('validationError', errorMessage => this.onValidationError(errorMessage))
  }

  /**
   * Sends message.
   */
  onSubmit(): void {
    this.socketService.socket.emit(this._messageType, { message: this.message.value })
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