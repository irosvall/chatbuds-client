import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordEqualValidator } from '../validators/password-equal.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup
  
  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.registerForm.value)
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
