import { Component, OnInit } from '@angular/core';
import { GlopalService } from 'src/app/services/glopal.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: any;

  constructor(private global: GlopalService) {}

  ngOnInit(): void {
    this.global.getProjects().subscribe((data) => {
      console.log(data.data);

      this.projects = data.data;
    });
  }
}
