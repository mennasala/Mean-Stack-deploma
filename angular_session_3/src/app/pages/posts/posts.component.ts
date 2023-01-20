import { Component } from '@angular/core';
import { GlopalService } from 'src/app/services/glopal.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  constructor(private glopal: GlopalService) {
    this.glopal.getPosts().subscribe((res) => {
      console.log(res);
    });
  }
}
