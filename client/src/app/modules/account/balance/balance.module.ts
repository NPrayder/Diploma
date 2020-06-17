import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceRoutingModule } from './balance-routing.module';
import { RootComponent } from './root/root.component';
import { BalancePreviewComponent } from './balance-preview/balance-preview.component';
import { BalanceDetailComponent } from './balance-detail/balance-detail.component';
import { CardPreviewComponent } from './card-preview/card-preview.component';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    RootComponent,
    BalancePreviewComponent,
    BalanceDetailComponent,
    CardPreviewComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})
export class BalanceModule { }
