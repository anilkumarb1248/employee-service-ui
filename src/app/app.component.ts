import { Component, OnInit } from '@angular/core';
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
    let sd = sessionStorage.getItem("sessionDetails");
    if (sd) {
      let sessionDetails = JSON.parse(sd);
      if(sessionDetails.keepLogin){
        this.loginService.setLoggedInUser(sessionDetails.loggedInUserData);
      }else{
        loginService.clearSession();
      }
    }
  }
  ngOnInit(): void {
  }
}
