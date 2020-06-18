import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../../core/models/transaction.interface';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { FormControl } from '@angular/forms';
import { BankTypes } from '../../core/models/bank-types.enum';

@Component({
  selector: 'app-linier-chart',
  templateUrl: './linier-chart.component.html',
  styleUrls: ['./linier-chart.component.scss']
})
export class LinierChartComponent implements OnInit {
  @Input() transactions: Transaction[];
  public lineChartData: ChartDataSets[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  bankType = new FormControl('all');
  flowType = new FormControl('expenses');

  constructor() {
  }

  ngOnInit() {
    this.buildChart();
  }

  filteredTransactions(): Transaction[] {
    let newTransactions = this.transactions;

    if (this.bankType.value !== 'all') {
      newTransactions = newTransactions.filter(t => this.bankType.value === 'mono'
        ? t.type === BankTypes.MONOBANK
        : t.type === BankTypes.PRIVATBANK);
    }

    newTransactions = newTransactions.filter(t => this.flowType.value === 'incomes' ? t.amount > 0 : t.amount < 0);
    return newTransactions;
  }

  buildChart(): void {
    this.lineChartLabels = [];
    this.lineChartData[0].data = [];
    const groupedMap = new Map<string, number>();
    this.filteredTransactions().forEach(t => {
      const date = new Date(+t.time).toLocaleDateString();
      if (groupedMap.has(date)) {
        const spent = groupedMap.get(date);
        groupedMap.set(date, spent + Math.abs(t.amount));
      } else {
        groupedMap.set(date, Math.abs(t.amount));
      }
    });

    for (const key of groupedMap.keys()) {
      this.lineChartLabels.push(key);
    }

    this.lineChartLabels = this.lineChartLabels.reverse();

    console.log(this.lineChartLabels);

    for (const value of groupedMap.values()) {
      this.lineChartData[0].data.push(value);
    }
    this.lineChartData[0].data = this.lineChartData[0].data.reverse();
  }
}
