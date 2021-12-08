import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-account-side-nav',
  templateUrl: './account-side-nav.component.html',
  styleUrls: ['./account-side-nav.component.scss']
})
export class AccountSideNavComponent implements OnInit {

  constructor(private userService : UserService) { }
  user: any = false

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.userService.getUserUpdateListener()
      .subscribe((user: any) => {
        this.user = user
      })
  }

  

}
