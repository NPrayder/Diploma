import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SKIP_TOKEN_INTERCEPTOR } from '../constants/skip-header';
import { UserService } from './user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers && request.headers.has(SKIP_TOKEN_INTERCEPTOR)) {
      const headers = request.headers.delete(SKIP_TOKEN_INTERCEPTOR);
      return next.handle(request.clone({headers}));
    } else {
      const token = this.userService.getToken();
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      next.handle(request);
    }

    return next.handle(request);
  }
}
