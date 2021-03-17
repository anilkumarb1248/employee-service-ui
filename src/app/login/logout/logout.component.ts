import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.logoutUser();
  }

  logoutUser() {
    this.loginService.setLoggedInUser(null);
    localStorage.setItem('loginData', null);
    localStorage.setItem('userData', null);
    this.router.navigateByUrl("/home");
  }
}
