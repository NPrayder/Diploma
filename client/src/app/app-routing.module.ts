import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    path: '**',
    pathMatch: 'full',
    redirectTo: 'wizard'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
