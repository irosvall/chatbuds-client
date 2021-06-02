import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  username: string

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.username = this.userService.username
  }

  onConfirmRemoveAccount(): void {
    this.authService.deleteUser().subscribe(res => {
      if (res.ok) {
        this.alertService.successAlert('Your account has successfully been deleted')
        this.authService.logout().subscribe(() => {
          this.router.navigate(['/'])
        })
      } else {
        this.alertService.warningAlert('Something went wrong, try again')
      }
    })
  }

  onCancelRemoveAccount(): void {
    this.router.navigate(['/'])
  }
}
