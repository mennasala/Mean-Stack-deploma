import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  ok = true;
  num = 3;
  arr = [1, 2, 3, 4, 5];
  month = [
    'january',
    'February',
    'March',
    'April',
    'May',
    'June',
    'july',
    'Augest',
    'September',
    'October',
    'November',
  ];
  monNum = 1;
  borderClass = 'border border-danger';
  bgClass = 'bg-light';
  showText() {
    this.ok = !this.ok;
  }
}
