import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardRoutingModule } from './wizard-routing.module';
import { WizardRootComponent } from './wizard-root/wizard-root.component';
import { SharedModule } from '../../shared/shared.module';
import { UserResolver } from '../../shared/core/services/user.resolver';
import { ChooseBankStepComponent } from './choose-bank-step/choose-bank-step.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { MonoStepComponent } from './mono-step/mono-step.component';
import { FormsModule } from '@angular/forms';
import { SuccessfulAddingComponent } from './successful-adding/successful-adding.component';
import { WizardService } from './core/services/wizard.service';
import { PrivatStepComponent } from './privat-step/privat-step.component';


@NgModule({
  declarations: [
    WizardRootComponent,
    ChooseBankStepComponent,
    MonoStepComponent,
    SuccessfulAddingComponent,
    PrivatStepComponent
  ],
  imports: [
    CommonModule,
    WizardRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    WizardService,
    UserResolver,
  ]
})
export class WizardModule {
}
