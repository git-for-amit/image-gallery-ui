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
  isLoginVisible: boolean = true;

  isLoginOrSignUpVisible: boolean = false;
  isLoggedIn: boolean = false;



  constructor(private router: Router) {

  }

  signOut() {
    sessionStorage.removeItem("userId");
    this.router.navigate(['/home']);
  }

  signIn() {
    this.router.navigate(['/login']);
  }

  signUp() {
    this.router.navigate(['/register']);
  }

  home() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        if (this.router.url == '/login') {
          this.showSignUp = true;
          this.isLoginOrSignUpVisible = true;
        } else if (this.router.url == '/register') {
          this.showSignUp = false;
          this.isLoginOrSignUpVisible = true;
        } else {
          this.showSignUp = false;
          this.isLoginOrSignUpVisible = false;
        }


        let userId = sessionStorage.getItem('userId');
        if (userId != null) {
          this.isLoggedIn = true;
          
          if (userId.toLowerCase() == 'admin') {
          }
        } else {
          this.isLoggedIn = false;
        }
      }
    });
  }





}
