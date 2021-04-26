import { Injectable } from '@angular/core'
import { io, Socket } from "socket.io-client"
import { environment as env } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: Socket

  constructor () { 
  }

  setupSocketConnection(): void {
    this.socket = io(env.API_GATEWAY_URL)

    this.socket.on('message', message => {
      console.log(message)
    })
  }
}
