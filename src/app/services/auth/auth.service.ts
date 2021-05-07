import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment as env } from '../../../environments/environment'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { ErrorHandlerService } from './../error-handler/error-handler.service'
import { UserService } from '../user/user.service'
import { SocketioService } from '../socketio/socketio.service'
import { LoginUser } from 'src/app/models/login-user'
import { RegisterUser } from 'src/app/models/register-user'

@Injectable({
  providedIn: 'root'
})

/**
 * Handles authorization requests towards the API Gateway.
 */
export class AuthService {
  httpOptions: Object = {
    withCredentials: true,
    observe: 'response',
  }

  httpOptionsWithHeaders: Object = {
    withCredentials: true,
    observe: 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor (
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private userService: UserService,
    private socketService: SocketioService,
  ) { }

  /**
   * Logs in an user.
   */
  login(user: LoginUser): Observable<any> {
    return this.http.post<LoginUser>(`${env.API_GATEWAY_URL}api/v1/auth/login`, JSON.stringify(user), this.httpOptionsWithHeaders)
      .pipe(
        tap(() => {
          this.userService.getAndDefineCurrentUser().subscribe()
          this.socketService.socket.connect()
        }),
        catchError(this.errorHandlerService.handleError<object>('login'))
      )
  }

  /**
   * Logs out an user.
   */
   logout(): Observable<any> {
    return this.http.post<object>(`${env.API_GATEWAY_URL}api/v1/auth/logout`, JSON.stringify({}), this.httpOptionsWithHeaders)
      .pipe(
        tap(() => {
          this.userService.undefineUser()
          this.socketService.socket.disconnect()
        }),
        catchError(this.errorHandlerService.handleError<object>('logout'))
      )
  }

  /**
   * Registers an user.
   */
  register(user: RegisterUser): Observable<any> {
    return this.http.post<RegisterUser>(`${env.API_GATEWAY_URL}api/v1/auth/register`, JSON.stringify(user), this.httpOptionsWithHeaders)
      .pipe(
        catchError(this.errorHandlerService.handleError<object>('register'))
      )
  }

  /**
   * Checks if the user is logged in.
   */
  isLoggedIn(): Observable<boolean> {
    return this.userService.getAndDefineCurrentUser().pipe(
      map(user => {
        if (!user) {
          return false
        } else {
          return true
        }
      }),
      catchError(() => of(false))
    )
  }
}
