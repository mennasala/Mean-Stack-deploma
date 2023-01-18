import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  inputVal: any;
  handleInput() {
    console.log(this.inputVal);
  }
  handleChangeInput(ev: any) {
    console.log(ev);
  }
}
