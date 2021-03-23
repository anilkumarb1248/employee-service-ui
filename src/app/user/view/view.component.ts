import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: number;
  user: User;
  isLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: UserService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(data => {
      this.id = data.id;
    });
  }

  ngOnInit(): void {
    this.loadUserDetails(this.id);
  }

  loadUserDetails(id: number) {
    if (id) {
      this.service.getUser(id).subscribe(
        data => {
          this.user = data;
          this.isLoaded = true;
          console.log(JSON.stringify(data));
        },
        error => {
          this.isLoaded = true;
          console.log(error);
        }
      );
    } else {
      console.log("User id is required")
    }
  }

  navigateToUserList() {
    this.router.navigateByUrl("user/list");
  }
}
