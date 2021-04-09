import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, Gender, MaritalStatus, Role } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
 
  employeeId: number;
  employee: Employee;
  isLoaded: boolean = false;

  public gender: typeof Gender = Gender;
  public role: typeof Role = Role;
  public maritalStatus : typeof MaritalStatus = MaritalStatus;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: EmployeeService,
    private router: Router
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
          this.employee = data;
          this.isLoaded = true;
          console.log(JSON.stringify(data));
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log("Employee id is required")
    }
  }

  navigateToEmployeeList() {
    this.router.navigateByUrl("employee/list");
  }

}
