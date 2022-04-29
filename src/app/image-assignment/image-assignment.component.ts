import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SlideUrl } from '../carousel-dialog/slides-url';
import { DataService } from '../data.service';
import { DBUser } from '../list-users/db-users';
import { Util } from '../util';
import { Image } from './image';


@Component({
  selector: 'app-image-assignment',
  templateUrl: './image-assignment.component.html',
  styleUrls: ['./image-assignment.component.css']
})
export class ImageAssignmentComponent implements OnInit {

  listOfListOfPictures: any[] = [];

  copyListOfListOfPictures: any[] = []

  listOfUsers: DBUser[] = []

  whichTab: string = 'select-images';

  successOrFailure: string = "Success"

  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'email'];
  dataSource: MatTableDataSource<DBUser>;

  @ViewChildren('matIconRef') matIconRefList: QueryList<ElementRef>

  selection = new SelectionModel<DBUser>(true, []);

  selectedPicList: any[] = []

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getImageFileNames()
    this.getUserList();

  }

  getUserList() {
    this.dataService.getUserList().subscribe(data => {
      let users: DBUser[] = data;
      for (let u of users) {
        if (u.email == 'admin') {
          continue;
        }
        if (u.approved == 'yes') {
          this.listOfUsers.push(u);
        }
      }
      this.dataSource = new MatTableDataSource(this.listOfUsers);
    }, err => {
      console.log("error while calling api ", err)
    });
  }

  getImageFileNames() {
    let userId = sessionStorage.getItem("userId") as string;
    this.dataService.getImageObjects(userId).subscribe(res => {
      let imageFileObjectList = res.images
      if (imageFileObjectList != null) {
        let divisor = 4;
        let pictures: any[] = []

        for (let i = 0; i < imageFileObjectList.length; i++) {
          let id = imageFileObjectList[i].id;
          let title = imageFileObjectList[i].filename;
          let src = `${Util.baseUrl}${imageFileObjectList[i].relativePath}`
          let code = imageFileObjectList[i].code;
          let categoryname = imageFileObjectList[i].categoryname;
          let p = {
            id: id,
            title: title,
            src: src,
            selected: false,
            code: code,
            categoryname: categoryname
          }
          if (i < divisor) {
            pictures.push(p);
          } else if (i % divisor == 0) {
            this.listOfListOfPictures.push(pictures);
            pictures = []
            pictures.push(p)
          } else {
            pictures.push(p);
          }
          if (i == imageFileObjectList.length - 1) {
            this.listOfListOfPictures.push(pictures);
          }
        }
        this.copyListOfListOfPictures = this.listOfListOfPictures.slice(0);
      }

    }, err => {

    })
  }

  highlightImage(p) {
    p.selected = !p.selected;
  }

  next() {
    this.selectedPicList = []
    for (let lp of this.listOfListOfPictures) {
      for (let p of lp) {
        if (p.selected) {
          this.selectedPicList.push(p);
        }
      }
    }
    this.whichTab = 'select-users';
  }

  previous() {
    this.whichTab = 'select-images';
  }

  finish() {

    console.log("asdda ", this.selection)

    if (this.selectedPicList && this.selection.selected) {
      let userList: DBUser[] = [];
      let imageList: Image[] = [];
      for (let s of this.selectedPicList) {
        let im = {
          id: s.id,
          filename: s.title,
          code: s.code,
          categorname: s.categorname
        }
        imageList.push(im);
      }

      for (let s of this.selection.selected) {
        userList.push({
          id: s.id,
          firstName: s.firstName,
          lastName: s.lastName,
          email: s.email
        })
      }
      let userImages = {
        userList,
        imageList
      }
      this.dataService.assign(userImages).subscribe(res => {
        this.successOrFailure = 'Success';
        this.whichTab = 'show-msg';
      }, err => {
        this.successOrFailure = 'Failed';
        this.whichTab = 'show-msg';
      })
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        this.selection.select(row)
      });
  }
}
