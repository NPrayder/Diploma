import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountRootComponent } from './account-root/account-root.component';
import { SharedModule } from '../../shared/shared.module';
import { UserResolver } from '../../shared/core/services/user.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RateModule } from '../rate/rate.module';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { TransactionsPreviewComponent } from './transactions-preview/transactions-preview.component';
import { TranactionsRootComponent } from './tranactions-root/tranactions-root.component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { LinierChartComponent } from './charts/linier-chart/linier-chart.component';
import { RadarChartComponent } from './charts/radar-chart/radar-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountRootComponent,
    DashboardComponent,
    NavigationComponent,
    PieChartComponent,
    TransactionsPreviewComponent,
    TranactionsRootComponent,
    LinierChartComponent,
    RadarChartComponent,
    BarChartComponent
  ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        SharedModule,
        RateModule,
        MaterialModule,
        ChartsModule,
        CdkTableModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [
    UserResolver
  ]
})
export class AccountModule {
}
