import { Component } from '@angular/core';
import { GlopalService } from 'src/app/services/glopal.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private global: GlopalService, private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // validators.minLength(5)
    // must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter
    password: new FormControl('', [
      Validators.required,
      // Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
    ]),
  });
  submitted = false;
  errorFlag = false;
  errorMsg = '';
  handleSubmit() {
    this.submitted = true;
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.global.login(this.loginForm.value).subscribe(
        (res) => {
          // console.log(res);
          localStorage.setItem('token', res.data.token);
          this.global.isLogIn = true;
          // this.router.navigateByUrl("test/login")
          // test/login
          //this.router.navigate(['test', 'login']);
          this.router.navigate(['projects']);
        },
        (err) => {
          // console.log(err);
          this.errorFlag = true;
          this.errorMsg = err.error.message;
        },
        () => {}
      );
    }
  }
  get userData() {
    return this.loginForm.controls;
  }
  get userEmail() {
    return this.loginForm.get('email');
  }
  get userPassword() {
    return this.loginForm.get('password');
  }
}
