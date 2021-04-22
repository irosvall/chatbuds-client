import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AlertService } from 'src/app/services/alert/alert.service'
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
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.logout()
  }

  private logout(): void {
    const subscription = this.authService.logout()
      .subscribe((res) => {
        if (res.status === 200) {
          this.alertService.successAlert('You are now logged out')
          this.router.navigate([''])
        } else {
          this.alertService.warningAlert('Something went wrong')
          this.router.navigate([''])
        }
        subscription.unsubscribe()
      })
  }
}
