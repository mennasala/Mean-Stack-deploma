import { Component } from '@angular/core';
import { GlopalService } from 'src/app/services/glopal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public global: GlopalService, private router: Router) {
    if (localStorage.getItem('token')) this.global.isLogIn = true;
    console.log(this.global.isLogIn);
  }

  navigateTo(value) {
    this.router.navigate(['../', value]);
  }
  handleLogOut() {
    localStorage.removeItem('token');
  }
}
