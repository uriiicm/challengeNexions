import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator,FormControl,ValidationErrors,NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[appValidateInput]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateInputDirective,
      multi: true
    }
  ]
})
export class ValidateInputDirective implements Validator{
  validate(control: FormControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log("control",control.value);
    
    if (control.value && !emailRegex.test(control.value)) {
      return { invalidEmail: true };
    }

    return null;
  }
}
