import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyRateComponent } from './currency-rate/currency-rate.component';
import { RateRootComponent } from './rate-root/rate-root.component';


const routes: Routes = [
  {
    path: '',
    component: RateRootComponent,
    children: [
      {
        path: '',
        component: CurrencyRateComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateRoutingModule { }
