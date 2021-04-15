import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ){}

  async canActivate(): Promise<boolean> {
    if (!(await this.authService.isLoggedIn())) {
      this.router.navigate(['404'], { skipLocationChange: true })
      return false
    }
    return true
  }
}
