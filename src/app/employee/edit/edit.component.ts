import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyType } from 'src/app/common/notification';
import { HelperService } from 'src/app/common/services/helper.service';
import { Address } from 'src/app/model/address';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  employeeId: number;
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
      this.employeeId = data.employeeId;
    });
  }

  ngOnInit(): void {
    this.loadEmployeeDetails(this.employeeId);
  }

  loadEmployeeDetails(employeeId: number) {
    if (employeeId) {
      this.service.getEmployee(employeeId).subscribe(
        data => {
          console.log("***************");
          this.employee = data;
          console.log(JSON.stringify(data));
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
      employeeId: [this.employee.employeeId, Validators.required],
      firstName: [this.employee.firstName, Validators.required],
      middleName: [this.employee.middleName],
      lastName: [this.employee.lastName],
      fatherName: [this.employee.fatherName],
      motherName: [this.employee.motherName],
      gurdianName: [this.employee.gurdianName],
      role: [this.employee.role, Validators.required],
      salary: [this.employee.salary, Validators.required],
      dateOfBirth: [this.employee.dateOfBirth, Validators.required],
      gender: [this.employee.gender, Validators.required],
      mobileNumber: [this.employee.mobileNumber],
      alternateNumber: [this.employee.alternateNumber],
      email: [this.employee.email],
      maritalStatus: [this.employee.maritalStatus, Validators.required],
      spouseName: [this.employee.spouseName],
      addressList: this.formBuilder.array([])
    });

    this.populateAddressList(this.employee.addressList);
  }

  populateAddressList(addressList: Address[]) {
    if (addressList) {
      addressList.forEach((address, index) => {
        this.addressList().push(
          this.formBuilder.group({
            houseNumber: [address.houseNumber],
            street: [address.street],
            city: [address.city],
            state: [address.state],
            pincode: [address.pincode]
          })
        );
      });
    }
    this.isLoaded = true;
  }

  addressList(): FormArray {
    return this.employeeForm.get("addressList") as FormArray;
  }

  newAddress(): FormGroup {
    return this.formBuilder.group({
      houseNumber: [""],
      street: [""],
      city: [""],
      state: [""],
      pincode: [""]
    });
  }

  addAddress() {
    this.addressList().push(this.newAddress());
  }

  removeAddress(i: number) {
    this.addressList().removeAt(i);
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
          this.helperService.focusInvalidControl(this.employeeForm, 'firstName', this.elementRef);

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

