import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../core/models/transaction.interface';
import { BankTypes } from '../core/models/bank-types.enum';

@Component({
  selector: 'app-transactions-preview',
  templateUrl: './transactions-preview.component.html',
  styleUrls: ['./transactions-preview.component.scss']
})
export class TransactionsPreviewComponent implements OnInit {
  @Input() liteVersion: boolean;
  @Input() transactions: Transaction[];

  constructor() {
  }

  ngOnInit(): void {
  }

  isMono(type: BankTypes): boolean {
    return type === BankTypes.MONOBANK;
  }

  groupTransactions(): any {
    const grouped = {};
    this.transactions.forEach(t => {
      const date = new Date(+t.time).toLocaleDateString();
      if (grouped[date]) {
        grouped[date].push(t);
      } else {
        grouped[date] = [t];
      }
    });
    return grouped;
  }

  getKeys(): string[] {
    return Object.keys(this.groupTransactions());
  }
}
