import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  isUserLoggedIn: boolean = false;
  loggedInUser: User;
  isLoaded: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {
    console.log("HomeComponent object is created");
  }

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }

  ngDoCheck(): void {
    console.log("ngDoCheck(): " + this.isUserLoggedIn);
  }

  checkUserLoggedIn() {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
    console.log(this.isUserLoggedIn);
    if (this.isUserLoggedIn) {
      this.router.navigateByUrl("/employee/list");
      // this.router.navigateByUrl("/employee/list", { skipLocationChange: false });
      this.isLoaded = true;
    } else {
      this.router.navigateByUrl("/login/sign-in");
      // this.router.navigateByUrl("/login/sign-in", { skipLocationChange: false });
    }
  }
}
