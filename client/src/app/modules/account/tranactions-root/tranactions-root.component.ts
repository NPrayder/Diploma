import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../core/services/transaction.service';
import { Transaction } from '../core/models/transaction.interface';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tranactions-root',
  templateUrl: './tranactions-root.component.html',
  styleUrls: ['./tranactions-root.component.scss']
})
export class TranactionsRootComponent implements OnInit {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  categories = new FormControl();
  fromDate: Date;
  toDate: Date;
  categoriesSet = [];

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transactionService.getAllTransactions()
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
        this.filteredTransactions = transactions;

        const catSet = new Set();
        this.transactions.forEach(t => {
          catSet.add(t.mcc);
        });
        this.categoriesSet = [...catSet];
      });
  }

  changeFromDate(event: MatDatepickerInputEvent<any>): void {
    this.fromDate = new Date(event.value);
    this.filteredTransactions = this.transactions.filter(t => {
      return new Date(+t.time).getTime() > this.fromDate.getTime()
        && (this.toDate ? new Date(+t.time).getTime() < this.toDate.getTime() : true);
    });
  }

  changeToDate(event: MatDatepickerInputEvent<any>): void {
    this.toDate = new Date(event.value);
    this.filteredTransactions = this.transactions.filter(t => {
      return new Date(+t.time).getTime() < this.toDate.getTime()
        && (this.fromDate ? new Date(+t.time).getTime() > this.fromDate.getTime() : true);
    });
  }

  changeCategory(): void {
    if (!this.categories.value?.length) {
      if (this.toDate) {
        this.filteredTransactions = this.transactions.filter(t => {
          return new Date(+t.time).getTime() < this.toDate.getTime()
            && (this.fromDate ? new Date(+t.time).getTime() > this.fromDate.getTime() : true);
        });
      } else if (this.fromDate) {
        this.filteredTransactions = this.transactions.filter(t => {
          return new Date(+t.time).getTime() > this.fromDate.getTime()
            && (this.toDate ? new Date(+t.time).getTime() < this.toDate.getTime() : true);
        });
      } else {
        this.filteredTransactions = this.transactions;
      }
      return;
    }

    this.filteredTransactions = this.filteredTransactions.filter(({mcc}) => {
      return this.categories.value.indexOf(mcc) !== -1;
    });
  }
}
