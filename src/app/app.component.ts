import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from './model/login-user';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  isLoaded: boolean = false;

  constructor(private loginService: LoginService, private userService: UserService) {
    if (localStorage.getItem('loginData')) {
      //  const loginData = JSON.parse(localStorage.getItem('loginData'));
      const userData = JSON.parse(localStorage.getItem('userData'));
      this.loginService.setLoggedInUser(userData);
    }
  }
  ngOnInit(): void {
  }
}
