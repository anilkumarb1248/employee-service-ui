import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyType, Notification } from 'src/app/common/notification';
import { NotificationService } from 'src/app/common/services/notification.service';
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
    private notificationService: NotificationService
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
      middleName: [this.employee.middleName, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      role: [this.employee.role, Validators.required],
      salary: [this.employee.salary, Validators.required],
      dob: [this.employee.dob, Validators.required],
      gender: [this.employee.gender, Validators.required],
      mobileNumber: [this.employee.mobileNumber, Validators.required],
      email: [this.employee.email, Validators.required],
      address: [this.employee.address, Validators.required],
      pinCode: [this.employee.pinCode, Validators.required],
      maritalStaus: [this.employee.maritalStaus, Validators.required]
    });
  }
  updateEmployee() {
    this.service.updateEmployee(this.employeeForm.value).subscribe(
      data => {
        if (data.statusCode == "200") {
          this.notificationService.notify(new Notification(data.message, NotifyType.SUCCESS));
          this.navigateToEmployeeList();
        } else if (data.statusCode == "204") { // 204 means No-content
          this.notificationService.notify(new Notification(data.errorMessage, NotifyType.WARNING));
        } else {
          this.notificationService.notify(new Notification(data.errorMessage, NotifyType.ERROR));
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

