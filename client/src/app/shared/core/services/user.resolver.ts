import { Injectable, SkipSelf } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../../models/user-interface';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { pluck, switchMap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable()
export class UserResolver implements Resolve<boolean> {
  constructor(private userService: UserService,
              private spinnerService: SpinnerService,
              @SkipSelf() private httpClient: HttpClient) {
  }

  resolve(): Observable<boolean> {
    if (!this.userService.user) {
      return this.httpClient.get<User>(`/api/user/get-user/${this.userService.getUserId()}`)
        .pipe(
          pluck('user'),
          switchMap((user: User) => {
            this.userService.setUser(user);
            this.spinnerService.hideSpinner();
            return of(true);
          })
        );
    }

    this.spinnerService.hideSpinner();
    return of(true);
  }
}
