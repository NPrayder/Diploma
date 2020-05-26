import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const isAuthenticated = this.userService.isAuthenticated();

    if (next.routeConfig.path === 'login') {
      return !isAuthenticated || await this.router.navigate(['wizard']);
    }

    return isAuthenticated || await this.router.navigate(['login']);
  }

}
