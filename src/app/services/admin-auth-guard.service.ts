import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(){
    let user = this.authService.currentUser;

    if(user && user.admin)
      return true;

    this.router.navigate(['/no-access']);
    return false;
  }

}
