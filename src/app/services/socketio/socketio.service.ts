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
  }

  get socket(): Socket {
    return this._socket
  }
}
