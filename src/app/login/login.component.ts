import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DBUser } from '../list-users/db-users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginValid: boolean = true;
  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      let dbUser: DBUser = {
        email: this.form.value["email"],
        password: this.form.value["password"]
      }
      this.dataService.signIn(dbUser).subscribe(data => {
        this.router.navigate(["image-gallery"]);
      }, err => {
        console.log("error while signIn ", err)
      })
    }
  }
  @Input() error: string = '';

  @Output() submitEM = new EventEmitter();

  constructor(private dataService: DataService, private router: Router) {

  }
}
