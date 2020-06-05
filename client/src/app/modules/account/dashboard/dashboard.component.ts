import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionService } from '../core/services/transaction.service';
import { Transaction } from '../core/models/transaction.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  transactions: Transaction[];
  subscription: Subscription;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.subscription = new Subscription();

    this.subscription.add(this.transactionService.getAllTransactions()
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
      }));
  }

  ngOnDestroy() {
  }
}
