import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../core/models/transaction.interface';

@Component({
  selector: 'app-transactions-preview',
  templateUrl: './transactions-preview.component.html',
  styleUrls: ['./transactions-preview.component.scss']
})
export class TransactionsPreviewComponent implements OnInit {
  @Input() shortVersion: boolean;
  @Input() transactions: Transaction[];

  displayedColumns: string[] = ['bank', 'npm1', 'category', 'amount', 'balance', 'total'];

  constructor() { }

  ngOnInit(): void {
  }

}
