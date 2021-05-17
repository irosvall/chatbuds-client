import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { User } from 'src/app/models/user'
import { environment as env } from '../../../environments/environment'
import { ErrorHandlerService } from '../error-handler/error-handler.service'

@Injectable({
  providedIn: 'root'
})

/**
 * Handles requests towards the resource service that invloves the user.
 */
export class UserService {
  private currentUser: User
  private isLoggedIn: Subject<boolean> = new Subject<boolean>()

  private httpOptionsWithHeaders: Object = {
    withCredentials: true,
    observe: 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor (
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  /**
   * Returns observable if user is logged in or not.
   */
  onIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable()
  }

  /**
   * Gets information about the user and updates if it's logged in.
   */
  getAndDefineCurrentUser(): Observable<User> {
    if (this.currentUser) {
      this.isLoggedIn.next(true)
      return of(this.currentUser);
    } else {
      return this.updateUser()
    }
  }

  /**
   * Updates the user information.
   */
  updateUser(): Observable<User> {
    return this.http.get<User>(`${env.API_GATEWAY_URL}api/v1/resource/user`, { withCredentials: true })
      .pipe(
        tap(user => {
          this.isLoggedIn.next(true)
          this.currentUser = user
        }),
        catchError(() => {
          this.isLoggedIn.next(false)
          this.currentUser = undefined
          return of(this.currentUser)
        })
      )
  }

  /**
   * Undefines the user and sets it's logged in state to "false".
   */
  undefineUser(): void {
    this.currentUser = undefined
    this.isLoggedIn.next(false)
  }

  /**
   * Sends a friend request to the user with the ID.
   */
  sendFriendRequest(userID: string): Observable<any> {
    return this.http.patch<object>(`${env.API_GATEWAY_URL}api/v1/resource/user/friendrequest/${userID}`, JSON.stringify({}), this.httpOptionsWithHeaders)
      .pipe(
        tap(() => this.updateUser().subscribe()),
        catchError(this.errorHandlerService.handleError<object>('sendFriendRequest'))
      )
  }

  /**
   * Accepts a friend request from the user with the ID.
   */
  acceptFriendRequest(userID: string): Observable<any> {
    return this.http.patch<object>(`${env.API_GATEWAY_URL}api/v1/resource/user/acceptfriend/${userID}`, JSON.stringify({}), this.httpOptionsWithHeaders)
      .pipe(
        tap(() => this.updateUser().subscribe()),
        catchError(this.errorHandlerService.handleError<object>('acceptFriendRequest'))
      )
  }

  /**
   * Declines a friend request from the user with the ID.
   */
   declineFriendRequest(userID: string): Observable<any> {
    return this.http.patch<object>(`${env.API_GATEWAY_URL}api/v1/resource/user/declinefriend/${userID}`, JSON.stringify({}), this.httpOptionsWithHeaders)
      .pipe(
        tap(() => this.updateUser().subscribe()),
        catchError(this.errorHandlerService.handleError<object>('declineFriendRequest'))
      )
  }

  get username(): string {
    return this.currentUser.username
  }

  get friends(): Array<User> {
    return this.currentUser.friends
  }
}
