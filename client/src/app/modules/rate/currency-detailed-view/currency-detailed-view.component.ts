import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { RateService } from '../../../shared/core/services/rate.service';
import { RateForChart } from '../../../shared/models/rate-for-chart.interface';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-currency-detailed-view',
  templateUrl: './currency-detailed-view.component.html',
  styleUrls: ['./currency-detailed-view.component.scss']
})
export class CurrencyDetailedViewComponent implements OnInit {
  minDate: Date;
  maxDate;
  rates: RateForChart[];

  convertedFrom: string;
  convertedTo = 'UAH';

  fromDate: Date;
  toDate: Date;
  fromValue: number;
  toValue: number;

  canvasHeight: number;

  public lineChartData: ChartDataSets[] = [];
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
            fontColor: 'transparent',
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
  // public lineChartColors: Color[] = [
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   { // dark grey
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   },
  //   { // red
  //     backgroundColor: 'rgba(255,0,0,0.3)',
  //     borderColor: 'red',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   }
  // ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  @ViewChild('dpfrom') dpFrom: MatDatepicker<any>;
  @ViewChild('dpto') dpTo: MatDatepicker<any>;

  constructor(private route: ActivatedRoute,
              private rateService: RateService,
              private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    const {currency} = this.route.snapshot.params;
    this.convertedFrom = currency.toUpperCase();
    this.rateService.getRateByCurrency(currency)
      .subscribe((rates) => {
        this.rates = rates;
        this.toDate = new Date();
        this.fromDate = new Date();
        this.fromDate.setDate(1);
        this.setMinMaxDate();
        this.fillChart();
      });

    this.breakpointObserver.observe('(max-width: 576px')
      .subscribe(({matches}) => {
        this.canvasHeight = matches ? 500 : 200;
      });
  }

  normalizedDate(time: number): Date {
    return new Date(time / 1000);
  }

  setMinMaxDate(): void {
    let date = new Date(this.rates[0].time / 1000);
    this.minDate = date;
    date = new Date(this.rates[this.rates.length - 1].time / 1000);
    this.maxDate = date;
  }

  fillChart(): void {
    const data1 = [];
    const data2 = [];
    const labels = [];
    this.rates.forEach(rate => {
      const date = this.normalizedDate(rate.time);
      if (date >= this.fromDate && date <= this.toDate) {
        data1.push(rate.buy);
        data2.push(rate.sell);
        labels.push(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
      }
    });
    this.lineChartLabels = [];
    this.lineChartData = [];
    this.lineChartLabels.push(...labels);
    this.lineChartData.push({data: data1, label: 'Buy'});
    this.lineChartData.push({data: data2, label: 'Sell'});
  }

  changeFromDate(event: MatDatepickerInputEvent<any>) {
    this.fromDate = new Date(event.value);
    this.fillChart();
  }

  changeToDate(event: MatDatepickerInputEvent<any>) {
    this.toDate = new Date(event.value);
    this.fillChart();
  }

  changeSides(): void {
    [this.convertedFrom, this.convertedTo] = [this.convertedTo, this.convertedFrom];
    this.calcRate();
  }

  calcRate(): void {
    if (this.convertedFrom === 'UAH') {
      const {buy} = this.rates[this.rates.length - 1];
      this.toValue = +(this.fromValue / buy).toFixed(2);
    } else {
      const {sell} = this.rates[this.rates.length - 1];
      this.toValue = +(this.fromValue * sell).toFixed(2);
    }
  }
}
