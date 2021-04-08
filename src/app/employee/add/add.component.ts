import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyType } from 'src/app/common/notification';
import { HelperService } from 'src/app/common/services/helper.service';
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
    private elementRef: ElementRef,
    private helperService: HelperService

  ) {
    this.createEmployeeForm();
  }

  ngOnInit(): void {

  }

  createEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      middleName: [""],
      lastName: [""],
      role: ["", Validators.required],
      salary: ["", Validators.required],
      dob: ["", Validators.required],
      gender: ["", Validators.required],
      mobileNumber: [""],
      email: [""],
      address: [""],
      maritalStatus: ["", Validators.required]
    });
  }

  addEmployee() {
    this.service.addEmployee(this.employeeForm.value).subscribe(
      data => {
        if (data.statusCode == "201") {
          this.helperService.createNotification(data.message, NotifyType.SUCCESS);
          this.navigateToEmployeeList();

        } else if (data.statusCode == "409") {
          this.helperService.createNotification(data.errorMessage, NotifyType.WARNING);
          this.helperService.focusInvalidControl(this.employeeForm,'firstName',this.elementRef);

        } else {
          this.helperService.createNotification(data.errorMessage, NotifyType.ERROR);
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
