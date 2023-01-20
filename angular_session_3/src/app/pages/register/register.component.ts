import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model = {
    firstName: '',
    email: '',
    password: '',
  };
  handleSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
      console.log('Submit Daata...........');
    }
  }
}
