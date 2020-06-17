import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';
import { BalancePreviewComponent } from './balance-preview/balance-preview.component';
import { BalanceDetailComponent } from './balance-detail/balance-detail.component';


const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        component: BalancePreviewComponent,
      },
      {
        path: 'preview/:cardNum',
        component: BalanceDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceRoutingModule { }
