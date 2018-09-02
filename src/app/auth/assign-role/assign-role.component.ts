import { RoleService } from './../../services/role-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { StaffAccount } from '../../models/account.model';
import { AlertService } from '../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit {

  account: StaffAccount = {
    login: {},
  };

  constructor(private roleService: RoleService,
              private alertService: AlertService,
              private dialogRef: MatDialogRef<AssignRoleComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private authService: AuthService) { }

  ngOnInit() {
    // default value
    this.account.right = 'AD';
    this.account.staff = this.data.id;
    this.account.login.email = this.data.contact.email;
  }

  async addRole() {
    const confirm = await this.alertService.confirmUpdate();
    if (confirm.value) {
      const uid = await this.authService.emailSignUp(this.account.login.email, this.account.login.password);

      this.account.uid = uid;
      await this.roleService.addRole(this.account);

      this.alertService.afterUpdateSuccess();
      this.dialogRef.close();
    }
  }

  async deleteRole() {
    const staffId = this.data.id;

    const confirm = await this.alertService.confirmDelete();
    if (confirm.value) {
      this.roleService.deleteRole(staffId);
      this.alertService.afterDeleteSuccess();

      this.dialogRef.close();
    }
  }

}


