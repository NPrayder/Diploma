import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RateRoutingModule } from './rate-routing.module';
import { CurrencyRateComponent } from './currency-rate/currency-rate.component';
import { CurrencyDetailedViewComponent } from './currency-detailed-view/currency-detailed-view.component';
import { RateRootComponent } from './rate-root/rate-root.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CurrencyRateComponent,
    CurrencyDetailedViewComponent,
    RateRootComponent,
  ],
  imports: [
    CommonModule,
    RateRoutingModule,
    SharedModule
  ],
})
export class RateModule { }
