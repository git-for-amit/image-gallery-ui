import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideUrl } from '../carousel-dialog/slides-url';
import { DataService } from '../data.service';
import { Util } from '../util';


@Component({
  selector: 'app-image-assignment',
  templateUrl: './image-assignment.component.html',
  styleUrls: ['./image-assignment.component.css']
})
export class ImageAssignmentComponent implements OnInit {

  listOfListOfPictures: any[] = [];

  copyListOfListOfPictures: any[] = []

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getImageFileNames()
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
          let srcCopy = `${Util.baseUrl}${fileNameList[i]}?add-colon=true`
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
}
