import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  // TODO: Make alert component
  message: string

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit(): void {
    const subscription = this.authService.login({
      email: this.email.value,
      password: this.password.value
    })
      .subscribe((res) => {
          if (res.status === 401) {
            this.message = 'Email or password is wrong'
          } else if (res.status === 200) {
            this.message = 'You are now logged in'
          } else {
            this.message = 'An error occured, try again'
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
