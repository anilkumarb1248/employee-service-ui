import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyType, Notification } from 'src/app/common/notification';
import { NotificationService } from 'src/app/common/services/notification.service';
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
    private notificationService: NotificationService
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
    this.router.navigateByUrl("employee/view/" + employee.id);
  }

  editEmployee(employee: Employee): void {
    this.router.navigateByUrl("employee/edit/" + employee.id);
  }

  deleteEmployee(id: number): void {
    this.service.deleteEmployee(id).subscribe(
      (data) => {
        if (data.statusCode == "200") {
          this.notificationService.notify(new Notification(data.message, NotifyType.SUCCESS));
          this.loadEmployees();
        } else if (data.statusCode == "204") { // 204 means No-content
          this.notificationService.notify(new Notification(data.errorMessage, NotifyType.WARNING));
        } else {
          this.notificationService.notify(new Notification(data.errorMessage, NotifyType.ERROR));
        }
      },
      (error) => {
        console.log("Error occured while deleting the employee: " + error);
      }
    );
  }

  refreshEmployeeList() {
    this.service.refreshEmployeeList().subscribe(
      data => {
        if (data.statusCode == "200") {
          this.notificationService.notify(new Notification(data.message, NotifyType.SUCCESS));
          this.loadEmployees();
        } else {
          this.notificationService.notify(new Notification(data.errorMessage, NotifyType.ERROR));
        }
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

