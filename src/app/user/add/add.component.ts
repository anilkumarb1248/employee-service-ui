import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyType, Notification } from 'src/app/common/notification';
import { NotificationService } from 'src/app/common/services/notification.service';
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
    private notificationService: NotificationService
  ) {
    this.createUserForm();
  }

  ngOnInit(): void {

  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      userId: ["", Validators.required],
      fullName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      email: ["", Validators.required],
      mobileNumber: ["", Validators.required],
      accessTypes: []
    });
  }

  addUser() {
    this.service.addUser(this.userForm.value).subscribe(
      data => {
        if (data.statusCode == "201") {
          this.notificationService.notify(new Notification(data.message, NotifyType.SUCCESS));
          this.navigateToUserList();
        } else if (data.statusCode == "409") {
          this.notificationService.notify(new Notification(data.errorMessage, NotifyType.WARNING));
          // Let the user modify the duplicate entry
        } else {
          this.notificationService.notify(new Notification(data.errorMessage, NotifyType.ERROR));
          this.navigateToUserList();
        }
      },
      error => {
        console.log("Error occured while adding the user: ", error);
      }
    );
    console.log(JSON.stringify(this.userForm.value));
  }

  navigateToUserList() {
    this.router.navigateByUrl("user/list");
  }

  resetForm() {
    this.userForm.reset();
  }

}
