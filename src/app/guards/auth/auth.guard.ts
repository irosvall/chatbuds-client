import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

/**
 * If user is not logged in an 404 page is shown. Otherwise let user access next page.
 */
export class AuthGuard implements CanActivate {
  constructor (
    private router: Router,
    private authService: AuthService,
  ) { }

  /**
   * If user is not logged in an 404 page is shown. Otherwise let user access next page.
   *
   * @returns {Promise<boolean>}
   */
  async canActivate(): Promise<boolean> {
    if (!(await this.authService.isLoggedIn())) {
      this.router.navigate(['404'], { skipLocationChange: true })
      return false
    }
    return true
  }
}
