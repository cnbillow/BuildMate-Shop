import { Component, OnInit } from '@angular/core';

import { RoleService } from '../../services/role-service.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.scss']
})
export class NewLoginComponent implements OnInit {

  error: string;

  details = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService,
              private roleService: RoleService) { }

  ngOnInit() {}

  async loginStaff() {
    try {
      await this.authService.login(this.details.username, this.details.password);
    } catch (error) {
      this.error = error.message;
    }
  }

}


