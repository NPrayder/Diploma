import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { SKIP_TOKEN_INTERCEPTOR_HEADER } from '../../../../shared/core/constants/skip-header';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  signIn(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>('/api/login', {
      email,
      password
    }, {
      headers: SKIP_TOKEN_INTERCEPTOR_HEADER
    });
  }

  signUp(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>('/api/login/sign-up', {
      name,
      email,
      password
    }, {
      headers: SKIP_TOKEN_INTERCEPTOR_HEADER
    });
  }
}
