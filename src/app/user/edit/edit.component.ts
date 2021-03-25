import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyType, Notification } from 'src/app/common/notification';
import { NotificationService } from 'src/app/common/services/notification.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  user: User;
  userForm: FormGroup;
  isLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.activatedRoute.params.subscribe(data => {
      this.id = data.id;
    });
  }

  ngOnInit(): void {
    this.loadUserDetails(this.id);
  }

  loadUserDetails(id: number) {
    if (id) {
      this.service.getUser(id).subscribe(
        data => {
          this.user = data;
          this.isLoaded = true;
          this.createUserForm();
          console.log(JSON.stringify(data));
        },
        error => {
          this.isLoaded = true;
          console.log(error);
        }
      );
    } else {
      console.log("User id is required")
    }
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      id: [this.user.id],
      userId: [this.user.userId, Validators.required],
      fullName: [this.user.fullName, Validators.required],
      password: [this.user.password, Validators.required],
      confirmPassword: [this.user.password, Validators.required],
      email: [this.user.email, Validators.required],
      mobileNumber: [this.user.mobileNumber, Validators.required],
      accessTypes: [this.user.accessTypes]
    });
  }

  updateUser() {
    this.service.updateUser(this.userForm.value).subscribe(
      data => {
        if (data.statusCode == "200") {
          this.notificationService.notify(new Notification(data.message, NotifyType.SUCCESS));
          this.navigateToUserList();
        } else if (data.statusCode == "204") { // 204 means No-content
          this.notificationService.notify(new Notification(data.errorMessage, NotifyType.WARNING));
        } else {
          this.notificationService.notify(new Notification(data.errorMessage, NotifyType.ERROR));
          this.navigateToUserList();
        }
      },
      error => {
        console.warn("Error occured while updating the user: ", error);
      }
    );
    console.log(JSON.stringify(this.userForm.value));
  }

  navigateToUserList() {
    this.router.navigateByUrl("user/list");
  }

  resetForm() {
    this.userForm.patchValue(this.user);
  }
}
