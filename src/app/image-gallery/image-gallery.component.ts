import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  subcategoryNameToSlideUrlMap: Map<string, SlideUrl[]> = new Map<string, SlideUrl[]>();

  categoryname: string = 'Fabrics'
  params: Params;

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.activatedRoute.params.subscribe(params => {
      this.params = params;
      console.log(this.params)
    });
  }

  ngOnInit(): void {
    this.categoryname = this.params['categoryname'];
    this.getImageFileNames(this.categoryname)
  }

  getImageFileNames(categoryname?: string) {
    let userId = sessionStorage.getItem("userId") as string;

    this.dataService.getImageObjects(userId, categoryname).subscribe(res => {
      let imageFileObjectList = res.images
      if (imageFileObjectList != null) {
        let divisor = 3;
        let pictures: any[] = []

        for (let i = 0; i < imageFileObjectList.length; i++) {
          let title = imageFileObjectList[i].filename;
          let id = imageFileObjectList[i].id;
          let src = `${Util.baseUrl}${imageFileObjectList[i].relativePath}`
          let code = imageFileObjectList[i].code;
          let categoryname = imageFileObjectList[i].categoryname;
          let srcCopy = `${Util.baseUrl}${imageFileObjectList[i].relativePath}?add-colon=true`
          let filename = imageFileObjectList[i].filename;
          let attributes = imageFileObjectList[i].attributes;
          let subcategoryname = imageFileObjectList[i].subcategoryname;
          let s: SlideUrl = {
            "url": encodeURI(srcCopy),
            id: id,
            code: code,
            categoryname: categoryname,
            filename: filename,
            subcategoryname: subcategoryname,
            attributes: attributes
          };
          this.slides.push(s);
          let sUrl  = this.subcategoryNameToSlideUrlMap.get(subcategoryname as string);

          if(!sUrl){
            sUrl = [];
          }
          sUrl.push(s);

          this.subcategoryNameToSlideUrlMap.set(subcategoryname as string, sUrl);

          let p = {
            id: id,
            title: title,
            src: src,
            code: code,
            categoryname: categoryname,
            subcategoryname: subcategoryname
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
  openCarousel(subcategoryname) {
    let slides = this.subcategoryNameToSlideUrlMap.get(subcategoryname);
    this.dataService.slides = slides as SlideUrl [];

   // this.dataService.slides = this.slides;
    this.router.navigate(['/product-description']);
  }
}
