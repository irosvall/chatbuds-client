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
    const socketOptions: any = {
      autoConnect: false,
      withCredentials: true
    }
    if (env.SOCKET_PATH) {
      socketOptions.path = env.SOCKET_PATH
    }

    this._socket = io(env.DOMAIN_NAME, socketOptions)
  }

  get socket(): Socket {
    return this._socket
  }
}
