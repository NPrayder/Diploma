import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-test-chart',
  templateUrl: './test-chart.component.html',
  styleUrls: ['./test-chart.component.scss']
})
export class TestChartComponent implements OnInit {
// Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['05/05/2020', '05/10/2020', '05/12/2020', '05/15/2020', '05/25/2020'];

  public radarChartData: ChartDataSets[] = [
    { data: [20, 10, 80, 170, 56], label: 'Приват банк' },
    { data: [433, 0, 300, 70, 56], label: 'MonoBank' },
  ];
  @Input() radarChartType: ChartType = 'bar';

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
