import { Component, Input, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private appConstants: AppConstants) {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
    this.loginService.isUserLoggedInObservable().subscribe(
      data => {
        if (this.isUserLoggedIn != data) {
          this.isUserLoggedIn = data;
        }
      }
    );
  }

  ngOnInit(): void {
  }

  openSwaggerAPI(){
    window.open(this.appConstants.BASE_URL+ "swagger-ui.html", "_blank");
  }

}
