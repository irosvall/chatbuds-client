import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { passwordEqualValidator } from '../validators/password-equal.directive';

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
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
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
