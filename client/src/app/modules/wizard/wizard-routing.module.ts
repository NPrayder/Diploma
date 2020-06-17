import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizardRootComponent } from './wizard-root/wizard-root.component';
import { UserResolver } from '../../shared/core/services/user.resolver';
import { ChooseBankStepComponent } from './choose-bank-step/choose-bank-step.component';
import { MonoStepComponent } from './mono-step/mono-step.component';
import { SuccessfulAddingComponent } from './successful-adding/successful-adding.component';
import { PrivatStepComponent } from './privat-step/privat-step.component';


const routes: Routes = [
  {
    path: '',
    resolve: [UserResolver],
    component: WizardRootComponent,
    children: [
      {
        path: 'mono',
        component: MonoStepComponent
      },
      {
        path: 'privat',
        component: PrivatStepComponent,
      },
      {
        path: 'successful-adding',
        component: SuccessfulAddingComponent,
      },
      {
        path: '',
        component: ChooseBankStepComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WizardRoutingModule { }
