import { Component } from '@angular/core';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css'],
})
export class Comp1Component {
  curDate = new Date();
  text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam qui non quis exercitationem at iure illum consectetur nemo cumque, officia ad, officiis, enim omnis architecto eveniet porro quam consequuntur deleniti.';
  arr = [1, 2, 3, 4];
  name = 'MennaTullah Salah Selim';
  obj = {
    name: 'menna Selim',
    age: 22,
  };
}
