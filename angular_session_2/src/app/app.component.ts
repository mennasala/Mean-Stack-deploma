import { Component } from '@angular/core';
import { GlobalService } from './services/glopal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular_session_2';
  constructor(public glopal: GlobalService) {}
}
