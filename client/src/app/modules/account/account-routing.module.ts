import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountRootComponent } from './account-root/account-root.component';
import { UserResolver } from '../../shared/core/services/user.resolver';


const routes: Routes = [
  {
    path: '',
    resolve: [UserResolver],
    component: AccountRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
