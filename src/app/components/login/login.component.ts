import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit(): void {
  }

  /**
   * Intializes the login form.
   */
   private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  get email(): AbstractControl {
    return this.loginForm.get('email')
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')
  }
}
