import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';
import { SpinnerService } from './spinner.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private snackbarService: SnackbarService,
              private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.hideSpinner();
          }
        },
        (error: HttpErrorResponse) => {
          this.snackbarService.showSnackbar(error.error.error);
          this.spinnerService.hideSpinner();
        }
      ));
  }
}
