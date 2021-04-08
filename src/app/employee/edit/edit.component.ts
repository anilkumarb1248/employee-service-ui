import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyType } from 'src/app/common/notification';
import { HelperService } from 'src/app/common/services/helper.service';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  employee: Employee;
  employeeForm: FormGroup;
  isLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: EmployeeService,
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
    this.loadEmployeeDetails(this.id);
  }

  loadEmployeeDetails(id: number) {
    if (id) {
      this.service.getEmployee(id).subscribe(
        data => {
          this.employee = data;
          console.log(JSON.stringify(data));
          this.isLoaded = true;
          this.createEmployeeForm();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log("Employee id is required")
    }

  }

  createEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      id: [this.employee.id, Validators.required],
      firstName: [this.employee.firstName, Validators.required],
      middleName: [this.employee.middleName],
      lastName: [this.employee.lastName],
      role: [this.employee.role, Validators.required],
      salary: [this.employee.salary, Validators.required],
      dob: [this.employee.dob, Validators.required],
      gender: [this.employee.gender, Validators.required],
      mobileNumber: [this.employee.mobileNumber],
      email: [this.employee.email],
      address: [this.employee.address],
      maritalStatus: [this.employee.maritalStatus, Validators.required]
    });
  }
  updateEmployee() {
    this.service.updateEmployee(this.employeeForm.value).subscribe(
      data => {
        if (data.statusCode == "200") {
          this.helperService.createNotification(data.message, NotifyType.SUCCESS);
          this.navigateToEmployeeList();

        } else if (data.statusCode == "204") { // 204 means No-content
          this.helperService.createNotification(data.errorMessage, NotifyType.WARNING);

        } else if (data.statusCode == "409") {
          this.helperService.createNotification(data.errorMessage, NotifyType.WARNING);
          this.helperService.focusInvalidControl(this.employeeForm,'firstName',this.elementRef);

        } else {
          this.helperService.createNotification(data.errorMessage, NotifyType.ERROR);
          this.navigateToEmployeeList();
        }
      },
      error => {
        console.log("Error occured while updating the employee");
      }
    );
    console.log(JSON.stringify(this.employeeForm.value));
  }

  navigateToEmployeeList() {
    this.router.navigateByUrl("employee/list");
  }

  resetForm() {
    this.employeeForm.setValue(this.employee);
  }

}

