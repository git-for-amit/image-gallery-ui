import { Component, OnInit } from '@angular/core';
import { SlideUrl } from '../carousel-dialog/slides-url';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides: SlideUrl[] = [
    {
      url: "/assets/images/banner-1.jpg"
    },
    {
      url: "/assets/images/banner-2.jpg"
    },
    {
      url: "/assets/images/muslin-1-banner.jpg"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
