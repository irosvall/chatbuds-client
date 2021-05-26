import { Component, OnInit } from '@angular/core'
import { AuthService } from './services/auth/auth.service'
import { PrivateMessagesService } from './services/private-messages/private-messages.service'
import { SocketioService } from './services/socketio/socketio.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (
    private socketService: SocketioService,
    private privateMessagesService: PrivateMessagesService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.socketService.setupSocketConnection()

    // Connect to socket if user is logged in.
    this.authService.isLoggedIn().subscribe(loggedIn => {
        if (loggedIn) {
          this.socketService.socket.connect()

          // Makes the private messages service start listen for messages.
          this.privateMessagesService.startListen()
        }
      })
  }
}
