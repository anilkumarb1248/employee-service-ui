import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private service:EmployeeService,
    private router:Router
    ) {
    this.createEmployeeForm();
  }

  ngOnInit(): void {

  }

  createEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      firstName:["",Validators.required],
      middleName:["",Validators.required],
      lastName:["",Validators.required],
      role:["",Validators.required],
      salary:["",Validators.required],
      dob:["",Validators.required],
      gender:["",Validators.required],
      mobileNumber:["",Validators.required],
      email:["",Validators.required],
      address:["",Validators.required],
      pinCode:["",Validators.required],
      maritalStaus:["",Validators.required]
    });
  }

  addEmployee() {
    this.service.addEmployee(this.employeeForm.value).subscribe(
      data=>{
        alert("Added");
        this.navigateToEmployeeList();
      },
      error=>{
        console.log("Error occured while adding the employee");
      }
    );
    console.log(JSON.stringify(this.employeeForm.value));
  }

  navigateToEmployeeList() {
    this.router.navigateByUrl("employee/list");
  }

  resetForm(){
    this.employeeForm.reset();
  }

}
