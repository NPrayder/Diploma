import { Injectable, SkipSelf } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from '../models/user-interface';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { pluck, switchMap } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<boolean> {
  constructor(private userService: UserService,
              @SkipSelf() private httpClient: HttpClient) {
  }

  resolve(): Observable<boolean> {
    if (!this.userService.user) {
      return this.httpClient.get<User>(`/api/user/get-user/${this.userService.getUserId()}`)
        .pipe(
          pluck('user'),
          switchMap((user: User) => {
            this.userService.setUser(user);
            return of(true);
          })
        );
    }

    return of(true);
  }
}
