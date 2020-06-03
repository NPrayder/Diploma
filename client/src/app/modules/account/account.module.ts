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
import { TestChartComponent } from './test-chart/test-chart.component';
import { ChartsModule } from 'ng2-charts';
import { TransactionsPreviewComponent } from './transactions-preview/transactions-preview.component';
import { TranactionsRootComponent } from './tranactions-root/tranactions-root.component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';


@NgModule({
  declarations: [
    AccountRootComponent,
    DashboardComponent,
    NavigationComponent,
    TestChartComponent,
    TransactionsPreviewComponent,
    TranactionsRootComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    RateModule,
    MaterialModule,
    ChartsModule,
    CdkTableModule
  ],
  providers: [
    UserResolver
  ]
})
export class AccountModule {
}
