import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor (
    private router: Router,
    private authService: AuthService,
  ) { }
  
  /**
   * If user is not logged in an welcome page is shown. Otherwise let user access the home page.
   *
   * @returns {Observable<boolean>}
   */
  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['welcome'])
        }
      })
    )
  }
}
