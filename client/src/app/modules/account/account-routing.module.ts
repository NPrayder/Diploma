import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountRootComponent } from './account-root/account-root.component';
import { UserResolver } from '../../shared/core/services/user.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsPreviewComponent } from './transactions-preview/transactions-preview.component';
import { TranactionsRootComponent } from './tranactions-root/tranactions-root.component';


const routes: Routes = [
  {
    path: '',
    resolve: [UserResolver],
    component: AccountRootComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'rate',
        loadChildren: () => import('../rate/rate.module').then(module => module.RateModule)
      },
      {
        path: 'transactions',
        component: TranactionsRootComponent
      },
      {
        path: 'balance',
        loadChildren: () => import('./balance/balance.module').then(module => module.BalanceModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
