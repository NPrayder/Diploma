import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardRoutingModule } from './wizard-routing.module';
import { WizardRootComponent } from './wizard-root/wizard-root.component';
import { SharedModule } from '../../shared/shared.module';
import { UserResolver } from './core/services/user.resolver';
import { ChooseBankStepComponent } from './choose-bank-step/choose-bank-step.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { MonoStepComponent } from './mono-step/mono-step.component';


@NgModule({
  declarations: [
    WizardRootComponent,
    ChooseBankStepComponent,
    MonoStepComponent
  ],
  imports: [
    CommonModule,
    WizardRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    UserResolver
  ]
})
export class WizardModule {
}
