import { Directive, Input } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms'

import validator from 'validator'

/** 
 * The value must only contain letters and numbers.
 */
export const alphanumericValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control && !(validator.isAlphanumeric(control.value))) {
    return { alphanumeric: true }
  } else {
    return null
  }
}

@Directive({
  selector: '[appAlphanumeric]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AlphanumericValidatorDirective, multi: true }]
})
export class AlphanumericValidatorDirective implements Validator {
  @Input('appAlphanumeric') input: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return alphanumericValidator(control)
  }
}
