import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyType} from 'src/app/common/notification';
import { HelperService } from 'src/app/common/services/helper.service';
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
    private elementRef: ElementRef,
    private helperService: HelperService
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
      userName: [this.user.userName, Validators.required],
      password: [this.user.password, Validators.required],
      confirmPassword: [this.user.password, Validators.required],
      email: [this.user.email],
      mobileNumber: [this.user.mobileNumber],
      userRole: [this.user.userRole]
    });
  }

  updateUser() {
    this.service.updateUser(this.userForm.value).subscribe(
      data => {
        if (data.statusCode == "200") {
          this.helperService.createNotification(data.message, NotifyType.SUCCESS);
          this.navigateToUserList();

        } else if (data.statusCode == "204") { // 204 means No-content
          this.helperService.createNotification(data.errorMessage, NotifyType.WARNING);
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
