import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideUrl } from '../carousel-dialog/slides-url';
import { DataService } from '../data.service';
import { Util } from '../util';



@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

  listOfListOfPictures: any[] = [];

  copyListOfListOfPictures: any[] = []

  slides: SlideUrl[] = []

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getImageFileNames()
  }

  getImageFileNames() {
    this.dataService.getImageFileNames().subscribe(res => {
      let fileNameList = res.fileNameList
      if (fileNameList != null) {
        let divisor = 3;
        let pictures: any[] = []

        for (let i = 0; i < fileNameList.length; i++) {
          let title = fileNameList[i].substring(fileNameList[i].lastIndexOf('/') + 1);
          let src = `${Util.baseUrl}${fileNameList[i]}`
          let srcCopy = `${Util.baseUrl}${fileNameList[i]}?add-colon=true`
          this.slides.push({
            "url": encodeURI(srcCopy)
          })
          let p = {
            id: i,
            title: title,
            src: src

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

  search(e: string) {

  }
  openCarousel() {
    this.dataService.slides = this.slides;
    this.router.navigate(['/product-description']);
  }
}
