import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountRootComponent } from './account-root/account-root.component';
import { SharedModule } from '../../shared/shared.module';
import { UserResolver } from '../../shared/core/services/user.resolver';


@NgModule({
  declarations: [AccountRootComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ],
  providers: [
    UserResolver
  ]
})
export class AccountModule { }
