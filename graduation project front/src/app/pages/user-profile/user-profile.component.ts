import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlopalService } from 'src/app/services/glopal.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  errFlag = false;
  constructor(private glopal: GlopalService) {}
  ngOnInit(): void {
    this.glopal.myProfile().subscribe(
      (res) => {
        this.user = res.data.user;
        console.log(res);
      },
      (err) => {
        this.errFlag = true;
        console.log(err);
      },
      () => {}
    );
    // console.log('helooooooooooooooooooo');
    // console.log(this.user);
  }
}
