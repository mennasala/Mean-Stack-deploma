import { Component } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { GlopalService } from 'src/app/services/glopal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: Login = {
    email: '',
    password: '',
  };
  errorFlag = false;
  errorMsg = '';
  constructor(private glopal: GlopalService) {}
  handleSubmit(form: NgForm) {
    if (form.valid) {
      this.glopal.login(this.model).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.data.token);
        },
        (err) => {
          this.errorFlag = true;
          this.errorMsg = err.error.message;

          console.log(err);
        }
      );
    }
  }
}
