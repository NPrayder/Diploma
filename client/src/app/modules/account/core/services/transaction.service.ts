import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Transaction } from '../models/transaction.interface';
import { environment } from '../../../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions: ReplaySubject<Transaction[]>;

  constructor(private httpClient: HttpClient) {
    this.transactions = new ReplaySubject<Transaction[]>(1);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(environment.transactionURL)
      .pipe(
        tap((transactions) => this.transactions.next(transactions))
      );
  }
}
