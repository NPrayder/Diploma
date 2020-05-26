import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizardRootComponent } from './wizard-root/wizard-root.component';
import { UserResolver } from './core/services/user.resolver';
import { ChooseBankStepComponent } from './choose-bank-step/choose-bank-step.component';
import { MonoStepComponent } from './mono-step/mono-step.component';


const routes: Routes = [
  {
    path: '',
    resolve: [UserResolver],
    component: WizardRootComponent,
    children: [
      {
        path: '',
        component: ChooseBankStepComponent
      },
      {
        path: 'mono',
        component: MonoStepComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WizardRoutingModule { }
