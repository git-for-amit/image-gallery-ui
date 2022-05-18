import { Component, OnInit } from '@angular/core';
import { SlideUrl } from '../carousel-dialog/slides-url';
import { DataService } from '../data.service';

@Component({
  selector: 'app-carousel-display',
  templateUrl: './carousel-display.component.html',
  styleUrls: ['./carousel-display.component.css']
})
export class CarouselDisplayComponent implements OnInit {

  slides: SlideUrl[] = []

  selectedSlide: SlideUrl;



  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.slides = this.dataService.slides;
    if (this.slides && this.slides.length) {
      this.selectedSlide = this.slides[0];
    }
    //  this.slides =  [
    //   {
    //     url: 'https://source.unsplash.com/1600x900/?nature,water'
    //   },
    //   {
    //     url: 'https://source.unsplash.com/1600x1600/?nature,forest'
    //   }
    // ]
  }
  onSlideTransitionComplete(event) {
    this.selectedSlide = event as SlideUrl;

  }

  get selectedAttributes(){
    let returnedAttributes: string [] = [];
    if(this.selectedSlide){
      let allAttributes = (this.selectedSlide.attributes as string).split(". ");
      
      for(let a  of allAttributes){
        if(a.trim()){
          returnedAttributes.push(a.trim());
        }
        
      }

    }
    return returnedAttributes
  }

}
