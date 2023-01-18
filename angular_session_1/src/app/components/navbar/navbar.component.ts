import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  name: string = 'menna';
  date: Date = new Date();
  imagPath = 'assets/images/imag.jfif';
  getFullName() {
    return 'Menna Selim';
  }
  inputType = 'password';
  tag = '<u>Hellooooooooooooooooo Menna<u/>';
  text = 'Hiiiiiiiiiiiiiiiiiiiiiiiii';
  h1Text = 'Manoon';
  handleClick() {
    this.h1Text = 'Hello Mannon';
  }
  handleInput(ev: any) {
    console.log(ev.target.value);
  }
  handleChange(ev: any) {
    console.log(ev.value);
  }
}
