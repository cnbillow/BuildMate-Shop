import { RoleService } from './role-service.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private roleService: RoleService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.authState().pipe(switchMap(user => this.roleService.getUser(user.uid)),
      map(staffAccount =>  {

      if (staffAccount.right === 'Administrator') {
        return true;
      }
    }));
  }
}
