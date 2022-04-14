import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Prem International Showroom';
  showSignUp: boolean = false;
  showLogout: boolean = false;
  showLogin: boolean = false;
  isLoginVisible: boolean = true;






  constructor(private router: Router) {

  }

  signOut() {
    this.router.navigate(['/login']);
  }

  signIn() {
    this.router.navigate(['/login']);
  }

  signUp() {
    this.router.navigate(['/register']);
  }


  ngOnInit(): void {
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        console.log('url ', this.router.url);
        if (this.router.url == '/login') {
          this.showSignUp = true;
          this.showLogin = false;
          this.showLogout = false;
        } else if (this.router.url == '/register') {
          this.showSignUp = false;
          this.showLogin = true;
          this.showLogout = false;
        } else {
          this.showSignUp = false;
          this.showLogin = false;
          this.showLogout = true;
        }

      }
    });
  }





}
