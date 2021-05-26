import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth/auth.service'

@Injectable({
  providedIn: 'root'
})

/**
 * If user is logged in an 404 page is shown. Otherwise let user access next page.
 */
export class AnonymousGuard implements CanActivate {
  constructor (
    private router: Router,
    private authService: AuthService,
  ) { }

  /**
   * If user is logged in an 404 page is shown. Otherwise let user access next page.
   *
   * @returns {Observable<boolean>}
   */
  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['404'], { skipLocationChange: true })
        }
      }),
      map(isLoggedIn => !isLoggedIn)
    )
  }
}
