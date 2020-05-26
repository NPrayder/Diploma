import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private showSpinner$: BehaviorSubject<boolean>;

  constructor() {
    this.showSpinner$ = new BehaviorSubject<boolean>(false);
  }

  showSpinner(): void {
    this.showSpinner$.next(true);
  }

  hideSpinner(): void {
    this.showSpinner$.next(false);
  }

  spinnerShowing(): Observable<boolean> {
    return this.showSpinner$.asObservable();
  }
}
