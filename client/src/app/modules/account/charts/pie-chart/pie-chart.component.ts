import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Transaction } from '../../core/models/transaction.interface';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @ViewChild('chart') chart: any;
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  @Input() transactions: Transaction[];

  radarChartLabels: Label[] = [];
  radarChartData: any[];
  radarChartType: ChartType = 'pie';

  constructor() { }

  ngOnInit() {
    const map = new Map<string, number>();
    this.transactions.forEach(t => {
      if (t.amount < 0) {
        if (map.has(t.mcc)) {
          const currentSum = map.get(t.mcc);
          map.set(t.mcc, currentSum + t.amount);
        } else {
          map.set(t.mcc, t.amount);
        }
      }
    });
    for (const key of map.keys()) {
      const shortKey = key.length > 20 ? `${key.substring(0, 20)}...` : key;
      this.radarChartLabels.push([shortKey]);
    }

    const obj = {
      data: [],
      label: null
    };
    for (const value of map.values()) {
      obj.data.push(value);
    }

    this.radarChartData = [
      ...obj.data
    ];
  }
}
