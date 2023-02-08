import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { GlopalService } from 'src/app/services/glopal.service';

class CustomValidators {
  static passwordContainsNumber(control: AbstractControl): ValidationErrors {
    const regex = /\d/;

    if (regex.test(control.value) && control.value !== null) {
      return null;
    } else {
      return { passwordInvalid: true };
    }
  }

  static passwordsMatch(control: AbstractControl): ValidationErrors {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (
      password === confirmPassword &&
      password !== null &&
      confirmPassword !== null
    ) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private global: GlopalService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // console.log('helooooooooooooooooooooooooooooooo');
  }

  registerForm = new FormGroup(
    {
      fName: new FormControl('', [Validators.required]),
      lName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        CustomValidators.passwordContainsNumber,
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: CustomValidators.passwordsMatch,
    }
  );

  errorFlag = false;
  errorMsg = '';
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.global.register(this.registerForm.value).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('role', res.data.roleName);
        this.router.navigate(['login']);
      },
      (err) => {
        console.log(err);
        this.errorFlag = true;
        this.errorMsg = err.error.message;
      },
      () => {}
    );
  }
}
