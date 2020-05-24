import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthRootComponent } from './auth-root/auth-root.component';
import { MaterialModule } from '../../shared/modules/material.module';


@NgModule({
  declarations: [AuthRootComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
