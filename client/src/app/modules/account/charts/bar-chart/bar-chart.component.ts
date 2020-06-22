import { Component, Input, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { FormControl } from '@angular/forms';
import { Transaction } from '../../core/models/transaction.interface';
import { TransactionService } from '../../core/services/transaction.service';
import { BankTypes } from '../../core/models/bank-types.enum';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() transactions: Transaction[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['incomes'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {data: [], label: 'Expenses'},
    {data: [], label: 'Incomes'}
  ];

  bankType = new FormControl('all');

  constructor() {
  }

  ngOnInit() {
    this.buildChart();
  }

  getBankName(): string {
    return this.bankType.value === 'mono' ? 'MonoBank' : this.bankType.value === 'privat' ? 'PrivatBank' : 'All';
  }

  filteredTransactions(): Transaction[] {
    let newTransactions = this.transactions;

    if (this.bankType.value !== 'all') {
      newTransactions = newTransactions.filter(t => this.bankType.value === 'mono'
        ? t.type === BankTypes.MONOBANK
        : t.type === BankTypes.PRIVATBANK);
    }

    return newTransactions;
  }

  buildChart(): void {
    this.barChartLabels = [this.getBankName()];
    this.barChartData[0].data = [];
    this.barChartData[1].data = [];

    let incomes = 0;
    let expenses = 0;

    this.filteredTransactions().forEach(t => {
      if (t.amount > 0) {
        incomes += t.amount;
      } else {
        expenses += Math.abs(t.amount);
      }
    });

    this.barChartData[0].data = [expenses, 0];
    this.barChartData[1].data = [incomes, 0];
  }
}
