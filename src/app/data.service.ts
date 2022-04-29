import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SlideUrl } from './carousel-dialog/slides-url';
import { ImageList } from './image-assignment/image-list';
import { UserImages } from './image-assignment/user-images';
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

  getImageFileNames(userId: string): Observable<FileNameList> {
    let getImageNames = this.url + `images/${userId}`;
    return this.http.get<FileNameList>(getImageNames);
  }

  getImageObjects(userId: string): Observable<ImageList> {
    let getImageNames = this.url + `images/${userId}`;
    return this.http.get<ImageList>(getImageNames);
  }

  approve(user: DBUser) {
    let approveUrl = this.url + 'users/approve';
    return this.http.post(approveUrl, user);
  }

  upload(formData: FormData) {
    let uploadUrl = this.url + 'images/upload-all';
    return this.http.post(uploadUrl, formData);
  }

  assign(userImages: UserImages) {
    let uploadUrl = this.url + 'images/assign';
    return this.http.post(uploadUrl, userImages);
  }
}
