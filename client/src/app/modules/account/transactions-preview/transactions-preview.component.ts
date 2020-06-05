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

  displayedColumns: string[] = ['bank', 'name', 'category', 'amount', 'balance', 'total'];

  constructor() { }

  ngOnInit(): void {
  }

  isMono(type: BankTypes): boolean {
    return type === BankTypes.MONOBANK;
  }
}
