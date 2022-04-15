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

  navigateToSite(pageName) {
    let url = '';
    switch (pageName) {
      case "yarn":
        url = 'http://premeuropa.com/yarns-products.html'
        break;
      case "homeTextile":
        url = 'http://premeuropa.com/home-textiles-products.html'
        break;
      case "wovenFabrics":
        url = 'http://premeuropa.com/home-textiles-products.html'
        break;
      case "rubberThread":
        url = 'http://premeuropa.com/yarns-threads-products.html'
        break;
      case "infant":
        url = 'http://premeuropa.com/muslin-squares.html';
        break;
    }
    window.open(url, '_blank');
  }
}
