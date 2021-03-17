import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {
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

}
