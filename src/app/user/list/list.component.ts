import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyType} from 'src/app/common/notification';
import { HelperService } from 'src/app/common/services/helper.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[];
  isLoaded: boolean = false;

  constructor(
    private service: UserService,
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.service.getUserList().subscribe(
      data => {
        this.users = data;
        this.isLoaded = true;
      },
      error => {
        this.isLoaded = true;
        console.log("Error occured while loading users: " + error);
      }
    );
  }

  addUser() {
    this.router.navigateByUrl("user/add");
  }

  viewUser(user: User): void {
    this.router.navigateByUrl("user/view/" + user.id);
  }

  editUser(user: User): void {
    this.router.navigateByUrl("user/edit/" + user.id);
  }

  deleteUser(id: number): void {
    this.service.deleteUser(id).subscribe(
      (data) => {
        if (data.statusCode == "200") {
          this.helperService.createNotification(data.message, NotifyType.SUCCESS);
          this.loadUsers();
        } else if (data.statusCode == "204") { // 204 means No-content
          this.helperService.createNotification(data.errorMessage, NotifyType.WARNING);
        } else {
          this.helperService.createNotification(data.errorMessage, NotifyType.ERROR);
        }
      },
      (error) => {
        console.log("Error occured while deleting the employee: ", error);
      }
    );
  }

  isListEmpty(): boolean {
    if (this.users?.length == 0) {
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
