import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/models/message';
import { SocketioService } from 'src/app/services/socketio/socketio.service';

@Component({
  selector: 'app-public-chat',
  templateUrl: './public-chat.component.html',
  styleUrls: ['./public-chat.component.css']
})
export class PublicChatComponent implements OnInit {
  chatForm: FormGroup
  messages: Message[] = []

  constructor(
    private socketService: SocketioService
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
   * Intializes the chat form.
   */
  private initForm(): void {
    this.chatForm = new FormGroup({
      message: new FormControl('', Validators.required)
    })
  }

  /**
   * Add incoming message to messages array for display.
   */
  private onPublicMessage(data: Message) {
    this.messages.push(data)
  }

  get message(): AbstractControl {
    return this.chatForm.get('message')
  }
}
