import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyType } from 'src/app/common/notification';
import { HelperService } from 'src/app/common/services/helper.service';
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

  constructor(
    private service: EmployeeService,
    private router: Router,
    private helperService: HelperService
  ) { }

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
    this.router.navigateByUrl("employee/view/" + employee.employeeId);
  }

  editEmployee(employee: Employee): void {
    this.router.navigateByUrl("employee/edit/" + employee.employeeId);
  }

  deleteEmployee(employee: Employee): void {
    this.service.deleteEmployee(employee.employeeId).subscribe(
      (data) => {
        if (data.statusCode == "200") {
          this.helperService.createNotification(data.message, NotifyType.SUCCESS);
          this.loadEmployees();
        } else if (data.statusCode == "204") { // 204 means No-content
          this.helperService.createNotification(data.errorMessage, NotifyType.WARNING);
        } else {
          this.helperService.createNotification(data.errorMessage, NotifyType.ERROR);
        }
      },
      (error) => {
        console.log("Error occured while deleting the employee: " + error);
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

