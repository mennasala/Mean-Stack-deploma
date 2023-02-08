import { Component } from '@angular/core';
import { GlopalService } from 'src/app/services/glopal.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent {
  image: any;

  constructor(private global: GlopalService) {}

  model = {
    firstName: 'Menna',
    lastName: 'Salah',
  };
  handleChange(eve: any) {
    console.log(eve);
    this.image = eve.target.files[0];
  }

  handleSubmit() {
    let formData = new FormData();
    formData.append('image', this.image);
    // formData.append('firstName' , this.model.firstName )
    // formData.append('lastName' , this.model.lastName )
  }
}
