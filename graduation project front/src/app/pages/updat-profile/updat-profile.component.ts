import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlopalService } from 'src/app/services/glopal.service';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import {
  HttpEventType,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { of } from 'rxjs';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}
@Component({
  selector: 'app-updat-profile',
  templateUrl: './updat-profile.component.html',
  styleUrls: ['./updat-profile.component.css'],
})
export class UpdatProfileComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private global: GlopalService,
    private router: Router
  ) {}

  updateForm = new FormGroup({
    fName: new FormControl(null),
    lName: new FormControl(null),
    email: new FormControl(null),
    age: new FormControl(null),
    dOfBirth: new FormControl(null),
    phoneNumber: new FormControl(null),
    image: new FormControl(null),
  });
  Data: any;
  ngOnInit(): void {
    this.global.myProfile().subscribe(
      (res) => {
        this.Data = res;
      },
      (err) => {
        console.log(1, err);
        this.errorFlag = true;
        this.errorMsg = err.error.message;
      },
      () => {
        this.updateForm.patchValue({
          fName: this.Data.data.user?.fName || '',
          lName: this.Data.data.user?.lName || '',
          image: this.Data.data.user?.image || '',
          dOfBirth: this.Data.data.user?.dOfBirth || '',
          age: this.Data.data.user?.age || '',
          phoneNumber: this.Data.data.user?.phoneNumber || '',
          email: this.Data.data.user?.email || '',
        });
      }
    );
  }

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };
  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0,
      };
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    };
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('photo', this.file.data);
    this.file.inProgress = true;

    this.global
      .uploadProfileImage(formData)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file.progress = Math.round(
                (event.loaded * 100) / event.total
              );
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.file.inProgress = false;
          return of('Upload failed');
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.updateForm.patchValue({ image: event.body.image });
        }
      });
  }

  errorFlag = false;
  errorMsg = '';
  onSubmit() {
    this.global.updateProfile(this.updateForm.getRawValue()).subscribe(
      () => {},
      (err) => {
        console.log(err);
      },
      () => {
        this.router.navigate(['my-profile']);
      }
    );
  }
}
