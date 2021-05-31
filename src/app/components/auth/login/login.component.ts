import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService } from 'src/app/services/alert/alert.service'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor (
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit(): void {
    const subscription = this.authService.login(this.loginForm.value)
      .subscribe((res) => {
        if (res.status === 200) {
          this.router.navigate([''])
        } else if (res.status === 401) {
          this.alertService.warningAlert('Email or password is wrong')
        } else {
          this.alertService.warningAlert('An error occured, try again')
        }
        subscription.unsubscribe()
      })
  }

  /**
   * Intializes the login form.
   */
  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  get email(): AbstractControl {
    return this.loginForm.get('email')
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')
  }
}
