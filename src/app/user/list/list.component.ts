import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users:User[];
  isLoaded: boolean = false;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.service.getUserList().subscribe(
      data=>{
        this.users = data;
        this.isLoaded = true;
      },
      error=>{
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
        if (data.statusCode == '200') {
          this.loadUsers();
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

  refreshUserList() {
    this.service.refreshUserList().subscribe(
      data => {
        console.log(data);
        this.loadUsers();
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
