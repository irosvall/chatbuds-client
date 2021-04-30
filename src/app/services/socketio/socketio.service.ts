import { Injectable } from '@angular/core'
import { io, Socket } from "socket.io-client"
import { environment as env } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private _socket: Socket

  constructor () { 
  }

  setupSocketConnection(): void {
    this._socket = io(env.API_GATEWAY_URL, { autoConnect: false, withCredentials: true })

    this.socket.on('publicMessage', message => {
      console.log(message)
    })

    this.socket.on('validationError', error => {
      console.error(error)
    })

    this.socket.on('message', message => {
      console.log(message)
    })
  }

  get socket(): Socket {
    return this._socket
  }
}
