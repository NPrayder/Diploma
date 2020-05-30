import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../../models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string;
  user: User;
  private user$: ReplaySubject<User>;

  constructor() {
    this.user$ = new ReplaySubject<User>(1);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    this.setToken(token);
    return true;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return this.token;
  }

  setUser(user: User): void {
    this.user$.next(user);
    this.user = user;
    localStorage.setItem('userId', user.id);
  }

  getUser(): Observable<User> {
    return this.user$.asObservable();
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }
}
