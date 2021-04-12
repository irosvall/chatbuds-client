import { Directive, Input } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms'

import validator from 'validator'

/** 
 * The value must only contain letters and numbers.
 */
export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control && !(validator.isEmail(control.value))) {
    return { email: true }
  } else {
    return null
  }
}

@Directive({
  selector: '[appEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {
  @Input('appEmail') input: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return emailValidator(control)
  }
}
