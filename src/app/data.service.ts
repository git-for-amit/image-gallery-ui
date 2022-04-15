import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SlideUrl } from './carousel-dialog/slides-url';
import { FileNameList } from './image-gallery/file-name-list';
import { DBUser } from './list-users/db-users';
import { Util } from './util';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  slides: SlideUrl[] = []

  url = `${Util.baseUrl}`;
  constructor(private http: HttpClient) { }

  getUserList(): Observable<DBUser[]> {
    let listUsersUrl = this.url + 'users/';
    return this.http.get<DBUser[]>(listUsersUrl);
  }

  signIn(user: DBUser) {
    let singInUrl = this.url + 'users/sign-in';
    return this.http.post(singInUrl, user);
  }

  signUp(user: DBUser) {
    let singUpUrl = this.url + 'users/sign-up';
    return this.http.post(singUpUrl, user);
  }

  getImageFileNames(): Observable<FileNameList> {
    let getImageNames = this.url + 'images/admin';
    return this.http.get<FileNameList>(getImageNames);
  }

  approve(user: DBUser) {
    let approveUrl = this.url + 'users/approve';
    return this.http.post(approveUrl, user);
  }
}
