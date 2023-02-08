import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlopalService } from 'src/app/services/glopal.service';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css'],
})
export class SingleProjectComponent {
  singleProject: any;
  constructor(
    private activated: ActivatedRoute,
    private glopal: GlopalService
  ) {
    // let projectId = this.activated.snapshot.paramMap.get('id');
    // console.log(projectId);
    let projectId: any;
    this.activated.paramMap.subscribe((res) => {
      console.log(res.get('id'));
      projectId = res.get('id');
    });

    this.glopal.getSingleProject(projectId).subscribe((data) => {
      this.singleProject = data;
    });
  }
}
