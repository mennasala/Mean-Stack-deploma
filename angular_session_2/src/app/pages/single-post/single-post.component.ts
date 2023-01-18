import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/glopal.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent {
  singlePost: any;
  constructor(
    private activated: ActivatedRoute,
    private glopal: GlobalService
  ) {
    let postId = this.activated.snapshot.paramMap.get('id');
    this.glopal.getSinglePost(postId).subscribe((data) => {
      this.singlePost = data;
    });
  }
}
