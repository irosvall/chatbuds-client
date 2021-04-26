import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { User } from 'src/app/models/user'
import { environment as env } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

/**
 * Handles requests towards the resource service that invloves the user.
 */
export class UserService {
  private currentUser: User
  private isLoggedIn: Subject<boolean> = new Subject<boolean>()

  constructor (
    private http: HttpClient,
  ) {}

  getAndDefineCurrentUser(): Observable<User> {
    if (this.currentUser) {
      this.isLoggedIn.next(true)
      return of(this.currentUser);
    } else {
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
  }

  undefineUser(): void {
    this.currentUser = undefined
    this.isLoggedIn.next(false)
  }

  onIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable()
  }
}
