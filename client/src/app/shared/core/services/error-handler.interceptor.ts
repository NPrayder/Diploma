import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private snackbarService: SnackbarService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(tap(
        () => {
        },
        (error: HttpErrorResponse) => {
          this.snackbarService.showSnackbar(error.error.error);
        }
      ));
  }
}
