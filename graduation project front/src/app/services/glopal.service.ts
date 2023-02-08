import { getLocaleFirstDayOfWeek } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import {Register} from '../interfaces/register'

@Injectable({
  providedIn: 'root',
})
export class GlopalService {
  baseUrl = 'http://localhost:3000/api/';
  myProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}user/me`);
  }

  isLogIn = false;
  constructor(private http: HttpClient) {}
  register(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/register`, obj);
  }
  login(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/login`, obj);
  }
  // getPosts(): Observable<any> {
  //   return this.http.get('https://jsonplaceholder.typicode.com/posts');
  // }

  updateProfile(obj: any): Observable<any> {
    // console.log('heloooooooooo from glopal service');
    // console.log(obj);

    return this.http.post('http://localhost:3000/api/user/editProfile', obj);
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    console.log(formData);

    return this.http.post<FormData>(
      'http://localhost:3000/api/user/uploadImageToProfile',
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  getProjects(): Observable<any> {
    return this.http.get('http://localhost:3000/api/project/showProjects');
  }

  getSingleProject(projectId: any): Observable<any> {
    // console.log(projectId);

    return this.http.get(
      `http://localhost:3000/api/project/showSingleProject/${projectId}`
    );
  }

  uploadImageToProject(id: any, obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}project/uploadImage/${id}`, obj);
  }
}
