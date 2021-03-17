import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: number;
  employee: Employee;
  isLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: EmployeeService,
    private router: Router
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
