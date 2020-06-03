import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/core/services/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'wizard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/wizard/wizard.module').then(module => module.WizardModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren:  () => import('./modules/account/account.module').then(module => module.AccountModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
