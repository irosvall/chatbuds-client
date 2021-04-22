import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment as env } from '../../../environments/environment'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { ErrorHandlerService } from './../error-handler/error-handler.service'
import { UserService } from '../user/user.service'

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
  ) { }

 /**
   * Logs in an user.
   *
   * @param {object} data - The object to be inserted in the body of the request
   * @param {string} data.email - User's email.
   * @param {string} data.password - User's password.
   * @returns {Observable<any>}
   */
  login(data: object): Observable<any> {
    return this.http.post<object>(`${env.API_GATEWAY_URL}api/v1/auth/login`, JSON.stringify(data), this.httpOptionsWithHeaders)
      .pipe(
        tap(() => this.userService.getAndDefineCurrentUser().subscribe()),
        catchError(this.errorHandlerService.handleError<object>('login'))
      )
  }

  /**
   * Logs out an user.
   *
   * @returns {Observable<any>}
   */
   logout(): Observable<any> {
    return this.http.post<object>(`${env.API_GATEWAY_URL}api/v1/auth/logout`, JSON.stringify({}), this.httpOptionsWithHeaders)
      .pipe(
        tap(() => this.userService.undefineUser()),
        catchError(this.errorHandlerService.handleError<object>('logout'))
      )
  }

  /**
   * Registers an user.
   *
   * @param {object} data - The object to be inserted in the body of the request
   * @param {string} data.email - User's email.
   * @param {string} data.username - User's username.
   * @param {string} data.password - User's password.
   * @returns {Observable<any>}
   */
  register(data: object): Observable<any> {
    return this.http.post<object>(`${env.API_GATEWAY_URL}api/v1/auth/register`, JSON.stringify(data), this.httpOptionsWithHeaders)
      .pipe(
        catchError(this.errorHandlerService.handleError<object>('register'))
      )
  }

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
