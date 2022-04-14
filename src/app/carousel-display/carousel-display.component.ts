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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
   this.slides = this.dataService.slides;
  //  this.slides =  [
  //   {
  //     url: 'https://source.unsplash.com/1600x900/?nature,water'
  //   },
  //   {
  //     url: 'https://source.unsplash.com/1600x1600/?nature,forest'
  //   }
  // ]
  }

}
