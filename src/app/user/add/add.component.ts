import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
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
        alert("Added");
        this.navigateToUserList();
      },
      error => {
        console.log("Error occured while adding the user");
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
