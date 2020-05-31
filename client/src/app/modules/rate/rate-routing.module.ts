import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyRateComponent } from './currency-rate/currency-rate.component';
import { RateRootComponent } from './rate-root/rate-root.component';
import { CurrencyDetailedViewComponent } from './currency-detailed-view/currency-detailed-view.component';


const routes: Routes = [
  {
    path: '',
    component: RateRootComponent,
    children: [
      {
        path: '',
        component: CurrencyRateComponent,
      },
      {
        path: ':currency',
        component: CurrencyDetailedViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateRoutingModule { }
