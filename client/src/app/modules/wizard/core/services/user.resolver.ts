import { Injectable, SkipSelf } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../../../../shared/models/user-interface';
import { UserService } from '../../../../shared/core/services/user.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { pluck, switchMap } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<boolean>{
  constructor(private userService: UserService,
              @SkipSelf() private httpClient: HttpClient) {
  }

  resolve(): Observable<boolean> {
    return this.httpClient.get<User>(`/api/user/get-user/${this.userService.getUserId()}`)
      .pipe(
        pluck('user'),
        switchMap((user: User) => {
          this.userService.setUser(user);
          return of(true);
        })
      );
  }
}
