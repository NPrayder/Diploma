import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(message: string, action: string = 'OK'): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right'
    });
  }
}
