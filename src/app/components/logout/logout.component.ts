import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.logout()
  }

  private logout(): void {
    const subscription = this.authService.logout()
      .subscribe((res) => {
        if (res.status === 200) {
          this.router.navigate([''])
          // TODO: Update user information
        } else {
          this.router.navigate([''])
          // TODO: Notification it went wrong
        }
        subscription.unsubscribe()
      })
  }
}
