import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.createLoginForm();
  }

  ngOnInit(): void {
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userId: ["", Validators.required],
      password: ["", Validators.required],
      keepLogin: [false],
    });
    this.isLoaded = true;
  }

  login() {
    this.loginService.authenticateUser(this.loginForm.value).subscribe(
      data => {
        if (data.statusCode == "200") {
          this.userService.getUserByUserId(this.loginForm.value.userId).subscribe(
            userData => {
              this.loginService.setLoggedInUser(userData);

              if (this.loginForm.value.keepLogin) {
                localStorage.setItem('loginData', JSON.stringify(this.loginForm.value));
                localStorage.setItem('userData', JSON.stringify(userData));
              }

              this.router.navigateByUrl("/home");
            },
            error => {
              console.log("Error occured while getting the authenticated user");
            }
          );
        } else {
          alert(data.errorMessage);
        }
      },
      error => {
        console.log("Error occured while authenticating the user");
      }
    );
  }

}
