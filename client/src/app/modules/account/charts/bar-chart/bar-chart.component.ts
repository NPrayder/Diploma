import { Component, Input, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { FormControl } from '@angular/forms';
import { Transaction } from '../../core/models/transaction.interface';
import { TransactionService } from '../../core/services/transaction.service';
import { FlowStats } from '../../../../shared/core/models/flow-stats.interface';

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
  flowType = new FormControl('expenses');

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.buildChart();
  }
  getBankName(): string {
    return this.bankType.value === 'mono' ? 'MonoBank' : this.bankType.value === 'privat' ? 'PrivatBank' : 'All';
  }

  buildChart(): void {
    this.barChartLabels = [this.getBankName()];
    this.barChartData[0].data = [];
    this.barChartData[1].data = [];

    this.transactionService.getFlow(this.bankType.value === 'all' ? null : this.bankType.value)
      .subscribe((flow: FlowStats) => {
        this.barChartData[0].data = [Math.abs(flow.expenses), 0];
        this.barChartData[1].data = [flow.incomes, 0];
      });
  }
}
