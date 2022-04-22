import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SlideUrl } from '../carousel-dialog/slides-url';
import { DataService } from '../data.service';
import { DBUser } from '../list-users/db-users';
import { Util } from '../util';


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

  displayedColumns: string[] = ['select', 'id', 'firstName', 'lastName', 'email', 'approved'];
  dataSource: MatTableDataSource<DBUser>;

  selection = new SelectionModel<DBUser>(true, []);

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
    this.dataService.getImageFileNames(userId).subscribe(res => {
      let fileNameList = res.fileNameList
      if (fileNameList != null) {
        let divisor = 4;
        let pictures: any[] = []

        for (let i = 0; i < fileNameList.length; i++) {
          let title = fileNameList[i].substring(fileNameList[i].lastIndexOf('/') + 1);
          let src = `${Util.baseUrl}${fileNameList[i]}`
          let p = {
            id: i,
            title: title,
            src: src,
            selected: false

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
    this.whichTab = 'select-users';
  }

  previous() {
    this.whichTab = 'select-images';
  }

  finish() {
    this.whichTab = 'show-msg';

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
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
