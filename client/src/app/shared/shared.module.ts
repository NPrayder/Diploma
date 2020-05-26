import { NgModule } from '@angular/core';
import { UserService } from './core/services/user.service';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent],
  providers: [
  ]
})
export class SharedModule {
}
