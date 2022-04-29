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
    let userId = sessionStorage.getItem("userId") as string;
    this.dataService.getImageObjects(userId).subscribe(res => {
      let imageFileObjectList = res.images
      if (imageFileObjectList != null) {
        let divisor = 3;
        let pictures: any[] = []

        for (let i = 0; i < imageFileObjectList.length; i++) {
          let title = imageFileObjectList[i].filename;
          let src = `${Util.baseUrl}${imageFileObjectList[i].relativePath}`
          let code = imageFileObjectList[i].code;
          let categoryname = imageFileObjectList[i].categoryname;
          let srcCopy = `${Util.baseUrl}${imageFileObjectList[i].relativePath}?add-colon=true`
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
          if (i == imageFileObjectList.length - 1) {
            this.listOfListOfPictures.push(pictures);
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
