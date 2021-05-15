import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app-constants';
import { LoginUser } from 'src/app/model/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoaded: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private appConstants: AppConstants
  ) {
    this.createLoginForm();
  }

  ngOnInit(): void {
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
      keepLogin: [true],
    });
    this.isLoaded = true;
  }

  login() {
    this.loginService.clearSession();

    if (this.appConstants.AUTHENTICATION_TYPE == "JWT_Token") {
      this.authenticateUserByJWT(this.loginForm.value);
    } else {
      this.authenticateUserByLoginController(this.loginForm.value);
    }
  }

  authenticateUserByLoginController(loginUser: LoginUser) {
    this.loginService.authenticateUserByLoginController(loginUser).subscribe(
      data => {
        if (data.statusCode == "200") {
          this.getLoggedInUserDetails(loginUser.userName);
        } else {
          alert(data.errorMessage);
        }
      },
      error => {
        console.log("Error occured while authenticating the user");
      }
    );
  }

  authenticateUserByJWT(loginUser: LoginUser) {
    this.loginService.authenticateUserByJWT(loginUser).subscribe(
      data => {
        console.log(data);
        if (data.statusCode == 400) {
          alert(data.errorMessage);
        }
        if(data.token){
          this.loginService.setSessionData("Bearer " + data.token, null, null);
          this.getLoggedInUserDetails(loginUser.userName);
        }
      },
      error => {
        console.log("Error occured while authenticating the user");
      }
    );
  }

  getLoggedInUserDetails(userName: string) {
    this.userService.getUserByUserName(userName).subscribe(
      userData => {
        userData.password = "**********";
        this.loginService.setLoggedInUser(userData);

        if (this.loginForm.value.keepLogin) {
          this.loginService.setSessionData(null, userData, true);
        }
        this.router.navigateByUrl("/home");
      },
      error => {
        console.log(error);
        console.log("Error occured while getting the authenticated user");
      }
    );
  }
}

