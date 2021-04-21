import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
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

  constructor (
    private http: HttpClient,
  ) { }

  getCurrentUser(): Observable<User> {
    if (this.currentUser) {
      return of(this.currentUser);
    } else {
      return this.http.get<User>(`${env.API_GATEWAY_URL}api/v1/resource/user`, { withCredentials: true })
        .pipe(
          tap(user => this.currentUser = user),
          catchError(this.currentUser = undefined)
        )
    }
  }

  defineUser(user: User): void {
    this.currentUser = user
  }

  undefineUser(): void {
    this.currentUser = undefined
  }
}
