import { Directive } from '@angular/core'
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms'

/** 
 * The passwords must match.
 */
export const passwordEqualValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')
  const passwordRepeat = control.get('passwordRepeat')

  // If the passwords match 'null' is return which means the validation passed.
  return password && passwordRepeat && password.value !== passwordRepeat.value ? { passwordEqual: true } : null;
}

@Directive({
  selector: '[appPasswordEqual]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordEqualValidatorDirective, multi: true }]
})

/**
 * Validates two passwords making sure they match each other.
 */
export class PasswordEqualValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordEqualValidator(control);
  }
}
