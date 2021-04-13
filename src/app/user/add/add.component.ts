import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyType } from 'src/app/common/notification';
import { HelperService } from 'src/app/common/services/helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private elementRef: ElementRef,
    private helperService: HelperService
  ) {
    this.createUserForm();
  }

  ngOnInit(): void {

  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      email: [""],
      mobileNumber: [""],
      userRole: [""],
    });
  }

  addUser() {
    this.service.addUser(this.userForm.value).subscribe(
      data => {
        if (data.statusCode == "201") {
          this.helperService.createNotification(data.message, NotifyType.SUCCESS);
          this.navigateToUserList();
          
        } else if (data.statusCode == "409") {
          this.helperService.createNotification(data.errorMessage, NotifyType.WARNING);
          this.helperService.focusInvalidControl(this.userForm,'userId',this.elementRef);

        } else {
          this.helperService.createNotification(data.errorMessage, NotifyType.ERROR);
          this.navigateToUserList();
        }
      },
      error => {
        console.log("Error occured while adding the user: ", error);
      }
    );
  }

  navigateToUserList() {
    this.router.navigateByUrl("user/list");
  }

  resetForm() {
    this.userForm.reset();
  }

}
