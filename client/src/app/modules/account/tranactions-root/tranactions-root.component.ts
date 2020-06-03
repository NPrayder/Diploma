import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../core/services/transaction.service';
import { Transaction } from '../core/models/transaction.interface';

@Component({
  selector: 'app-tranactions-root',
  templateUrl: './tranactions-root.component.html',
  styleUrls: ['./tranactions-root.component.scss']
})
export class TranactionsRootComponent implements OnInit {
  transactions: Transaction[];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getAllTransactions()
      .subscribe((transactions: Transaction[]) => {
        this.transactions  = transactions;
      });
  }

}
