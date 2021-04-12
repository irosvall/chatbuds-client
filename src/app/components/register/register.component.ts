import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'

import { passwordEqualValidator } from '../../validators/password-equal.directive'
import { alphanumericValidator } from '../../validators/alphanumeric.directive'
import { emailValidator } from '../../validators/email.directive'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup
  
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit(): void {
    this.authService.register({
      email: this.email.value, 
      username: this.username.value, 
      password: this.password.value
    })
      .subscribe()
  }

  /**
   * Intializes the registration form.
   */
  private initForm() : void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), alphanumericValidator]),
      email: new FormControl('', [Validators.required, Validators.maxLength(320), emailValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]),
      passwordRepeat: new FormControl('', Validators.required),
    }, { validators: passwordEqualValidator })
  }

  get username() {
    return this.registerForm.get('username')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get passwordRepeat() {
    return this.registerForm.get('passwordRepeat')
  }
}
