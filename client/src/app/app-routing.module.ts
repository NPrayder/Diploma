import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/core/services/auth.guard';
import { UserResolver } from './shared/core/services/user.resolver';


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
    path: 'rate',
    loadChildren: () => import('./modules/rate/rate.module').then(module => module.RateModule)
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
