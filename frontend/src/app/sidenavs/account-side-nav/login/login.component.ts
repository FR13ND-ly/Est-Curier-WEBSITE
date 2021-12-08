import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }
  
  login(){
    this.userService.login()
  }

  onFacebookLogin() {
    this.userService.facebookLogin()
  }

  onClose() {
    this.userService.setOpen(false)
  }
}
