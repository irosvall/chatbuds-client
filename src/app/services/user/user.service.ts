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
  private _currentUser: User
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
    if (this._currentUser) {
      this.isLoggedIn.next(true)
      return of(this._currentUser);
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
          this._currentUser = user
        }),
        catchError(() => {
          this.isLoggedIn.next(false)
          this._currentUser = undefined
          return of(this._currentUser)
        })
      )
  }

  /**
   * Undefines the user and sets it's logged in state to "false".
   */
  undefineUser(): void {
    this._currentUser = undefined
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

  /**
   * Returns the User object of a friend. If friend is not found undefined is returned.
   *
   * @param {string} id - The ID of the friend to get.
   */
  getfriend(id: string): User | undefined {
    return this.friends.find((user: User) => user.userID === id)
  }

  /**
   * Removes a friend with the user ID.
   */
  removeFriend(userID: string): Observable<any> {
    return this.http.delete<object>(`${env.API_GATEWAY_URL}api/v1/resource/user/removeFriend/${userID}`, this.httpOptionsWithHeaders)
      .pipe(
        tap(() => this.updateUser().subscribe()),
        catchError(this.errorHandlerService.handleError<object>('removeFriend'))
      )
  }

  /**
   * Gets the current user.
   */
  get currentUser(): User {
    if (!this._currentUser) {
      this.updateUser().subscribe((user: User) => {
        this.isLoggedIn.next(true)
        return user
      })
    } else {
      return this._currentUser
    }
  }

  /**
   * Gets the current user's ID.
   */
  get userID(): string {
    return this.currentUser.userID
  }

  /**
   * Gets the current user's username.
   */
  get username(): string {
    return this.currentUser.username
  }

  /**
   * Gets the current user's friends.
   */
  get friends(): Array<User> {
    return this.currentUser.friends
  }
}
