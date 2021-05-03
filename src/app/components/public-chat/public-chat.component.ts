import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/models/message';
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

  constructor (
    private socketService: SocketioService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.socketService.socket.on('publicMessage', data => this.onPublicMessage(data))
  }

  /**
   * Sends message.
   */
  onSubmit(): void {
    this.socketService.socket.emit("publicMessage", { message: this.message.value })
    this.chatForm.reset()
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
      this.onSubmit()
    }
  }

  /**
   * Add incoming message to messages array for display.
   */
  private onPublicMessage(data: Message) {
    this.messages.push(data)

    // Manually detect changes in the DOM to automatically scroll down when needed.
    this.changeDetectorRef.detectChanges()
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
