import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
  ],
  declarations: [
    HeaderComponent,
    NotFoundComponent,
  ],
  providers: []
})
export class SharedModule {
}
