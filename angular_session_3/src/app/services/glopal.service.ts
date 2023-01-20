import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlopalService {
  baseUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}

  login(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/login`, obj);
  }
  getPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
