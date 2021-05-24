import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyType } from 'src/app/common/notification';
import { HelperService } from 'src/app/common/services/helper.service';
import { Employee } from 'src/app/model/employee';
import { EmployeePageData } from 'src/app/model/employee-page-data';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employees: Employee[];
  isLoaded: boolean = false;

  enablePaginationFlag: boolean = false;

  pageSize: number;
  pageNumber: number;
  sortOrder: string;
  sortingBy: string;
  previousBtnDisableFlag: boolean = true;
  nextBtnDisableFlag: boolean = false;

  sortingByElements: Array<Object> = [
    { "key": "firstName", "value": "First Name" },
    { "key": "fatherName", "value": "Father Name" },
    { "key": "motherName", "value": "Mother Name" },
    { "key": "salary", "value": "Salary" },
    { "key": "dateOfBirth", "value": "Date of Birth" },
    { "key": "gender", "value": "Gender" },
    { "key": "mobileNumber", "value": "MobileNumber" },
    { "key": "maritalStatus", "value": "Marital Status" }
  ];


  constructor(
    private service: EmployeeService,
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.getPageDataFromLocalStorage(() => {
      if (this.enablePaginationFlag) {
        this.loadEmployeesByPagination();
      } else {
        this.loadEmployeesWithoutPagination();
      }
    });

  }

  loadEmployeesWithoutPagination() {
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

  loadEmployeesByPagination() {
    this.service.getEmployeesByPagination(this.pageNumber, this.pageSize, this.sortOrder, this.sortingBy).subscribe(
      (data) => {
        if (data.length == 0) {
          if (this.pageNumber > 0) {
            this.pageNumber = this.pageNumber - 1;
            this.disableElement("nextPageBtn", true);
            this.setPageDataToLocalStorage(() => { });
            this.helperService.createNotification("No more employees available", NotifyType.WARNING);
          } else {
            this.employees = data;
            this.isLoaded = true;
          }
        } else {
          this.employees = data;
          this.isLoaded = true;
          if (this.pageNumber > 0) {
            this.disableElement("previousPageBtn", false);
            this.setPageDataToLocalStorage(() => { });
          }
        }
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

  deleteAll(): void {
    this.service.deleteAll().subscribe(
      (data) => {
        if (data.statusCode == "200") {
          this.helperService.createNotification(data.message, NotifyType.SUCCESS);
          this.loadEmployees();
        } else {
          this.helperService.createNotification(data.errorMessage, NotifyType.ERROR);
        }
      },
      (error) => {
        console.log("Error occured while deleting all employees: " + error);
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

  addDummyData() {
    this.service.addDummyData().subscribe(
      (data) => {
        if (data) {
          this.helperService.createNotification("Dummy Data added successfully", NotifyType.SUCCESS);
          this.loadEmployees();
        } else {
          this.helperService.createNotification("Failed to add dummy data", NotifyType.ERROR);
        }
      },
      (error) => {
        console.log("Error occured while adding dummy data: " + error);
      }
    );
  }

  importExcel() {
    alert("Development inprogress")
  }

  exportExcel() {
    alert("Development inprogress")
  }

  previousPage() {
    if (this.pageNumber > 0) {
      // this.pageNumber = this.pageNumber - 1;
      // this.loadEmployees();
      this.disableElement("nextPageBtn",false);
      this.loadPageDataByPageNumber(this.pageNumber - 1);
    }
    if (this.pageNumber == 0) {
      this.disableElement("previousPageBtn", true);
      this.setPageDataToLocalStorage(()=>{});
    }
  }

  nextPage() {
    this.loadPageDataByPageNumber(this.pageNumber + 1);
  }

  loadPageDataByPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    if (pageNumber == 0) {
      this.disableElement("previousPageBtn", true);
      this.disableElement("nextPageBtn", false);
    } else {
      this.disableElement("previousPageBtn", false);
    }
    this.setPageDataToLocalStorage(() => {
      this.loadEmployees();
    });

  }


  disableElement(elementId: string, disableFlag: boolean) {
    if (elementId == "previousPageBtn") {
      this.previousBtnDisableFlag = disableFlag;
    } else if (elementId == "nextPageBtn") {
      this.nextBtnDisableFlag = disableFlag;
    }
    // Not working sometimes before html load
    // var element = <HTMLInputElement>document.getElementById(elementId);
    // if (element) {
    //   element.disabled = disableFlag;
    // }
  }

  enablePagination(enableFlag: boolean) {
    this.enablePaginationFlag = enableFlag;
    this.setPageDataToLocalStorage(() => {
      this.loadEmployees();
    });

  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.loadPageDataByPageNumber(0);
  }

  onOrderChange(event: any) {
    this.sortOrder = event.target.value;
    this.loadPageDataByPageNumber(0);
  }

  onSortingChange(event: any) {
    this.sortingBy = event.target.value;
    this.loadPageDataByPageNumber(0);
  }

  getPageDataFromLocalStorage(callBack) {
    let localPageData = localStorage.getItem("employee-page-data");
    let pageData: EmployeePageData;
    if (localPageData) {
      pageData = JSON.parse(localPageData);
    } else {
      pageData = new EmployeePageData();
    }
    this.pageSize = pageData.pageSize;
    this.pageNumber = pageData.pageNumber;
    this.sortOrder = pageData.sortOrder;
    this.sortingBy = pageData.sortingBy;
    this.previousBtnDisableFlag = pageData.previousBtnDisableFlag;
    this.nextBtnDisableFlag = pageData.nextBtnDisableFlag;
    this.enablePaginationFlag = pageData.enablePaginationFlag;
    callBack();
  }

  setPageDataToLocalStorage(callBack) {
    let pageData = new EmployeePageData();
    pageData.pageSize = this.pageSize;
    pageData.pageNumber = this.pageNumber;
    pageData.sortOrder = this.sortOrder;
    pageData.sortingBy = this.sortingBy;
    pageData.enablePaginationFlag = this.enablePaginationFlag;
    pageData.previousBtnDisableFlag = this.previousBtnDisableFlag;
    pageData.nextBtnDisableFlag = this.nextBtnDisableFlag;
    localStorage.setItem("employee-page-data", JSON.stringify(pageData));
    callBack();
  }

}

