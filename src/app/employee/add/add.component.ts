import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification, NotifyType } from 'src/app/common/notification';
import { NotificationService } from 'src/app/common/services/notification.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: EmployeeService,
    private router: Router,
    private notificationService: NotificationService

  ) {
    this.createEmployeeForm();
  }

  ngOnInit(): void {

  }

  createEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      middleName: ["", Validators.required],
      lastName: ["", Validators.required],
      role: ["", Validators.required],
      salary: ["", Validators.required],
      dob: ["", Validators.required],
      gender: ["", Validators.required],
      mobileNumber: ["", Validators.required],
      email: ["", Validators.required],
      address: ["", Validators.required],
      pinCode: ["", Validators.required],
      maritalStaus: ["", Validators.required]
    });
  }

  addEmployee() {
    this.service.addEmployee(this.employeeForm.value).subscribe(
      data => {
        if (data.statusCode == "201") {
          this.notificationService.notify(new Notification(data.message, NotifyType.SUCCESS));
          this.navigateToEmployeeList();
        } else if (data.statusCode == "409") {
          this.notificationService.notify(new Notification(data.errorMessage, NotifyType.WARNING));
          // Let the user modify the duplicate entry
        } else {
          this.notificationService.notify(new Notification(data.errorMessage, NotifyType.ERROR));
          this.navigateToEmployeeList();
        }
      },
      error => {
        console.log("Error occured while adding the employee: " + error);
      }
    );
    console.log(JSON.stringify(this.employeeForm.value));
  }

  navigateToEmployeeList() {
    this.router.navigateByUrl("employee/list");
  }

  resetForm() {
    this.employeeForm.reset();
  }

}
