import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DBUser } from '../list-users/db-users';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationValid: boolean = true;

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    email: new FormControl('')
  });



  loginValid: boolean = true;
  constructor(private notificationService: NotificationService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {

      let user: DBUser = {
        firstName: this.form.value["firstName"],
        lastName: this.form.value["lastName"],
        email: this.form.value["email"],
        password: this.form.value["password"],
        roles: ["user"]
      }

      this.dataService.signUp(user).subscribe(data => {
        this.notificationService.alert("Sign Up Successful", "Sign Up Confirmation", () => {
          this.router.navigate(["login"]);
        });
      }, err => {
        this.notificationService.alert("Sign Up Failed", "Error", () => {
          this.router.navigate(["register"]);
        });
      })
    }
  }

}
