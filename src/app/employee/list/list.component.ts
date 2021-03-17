import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employees: Employee[];
  isLoaded: boolean = false;

  constructor(private service: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.service.getEmployeeList().subscribe(
      (data) => {
        this.employees = data;
        this.isLoaded = true;
      },
      (error) => {
        console.log(error);
        this.isLoaded = true;
      }
    );
  }

  addEmployee() {
    this.router.navigateByUrl("employee/add");
  }

  viewEmployee(employee: Employee): void {
    this.router.navigateByUrl("employee/view/" + employee.id);
  }

  editEmployee(employee: Employee): void {
    this.router.navigateByUrl("employee/edit/" + employee.id);
  }

  deleteEmployee(id: number): void {
    this.service.deleteEmployee(id).subscribe(
      (data) => {
        if (data.statusCode == '200') {
          this.loadEmployees();
          console.log(data.message);
        } else {
          console.log(data.errorMessage);
        }
      },
      (error) => {
        console.log("Error occured while deleting the employee");
      }
    );
  }

  refreshEmployeeList() {
    this.service.refreshEmployeeList().subscribe(
      data => {
        console.log(data);
        this.loadEmployees();
      }
    );

  }

  isListEmpty(): boolean {
    if (this.employees?.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  geClass(index: number): string {
    if (index % 2 == 0) {
      return "table-info";
    } else {
      return "table-warning";
    }
  }

}

