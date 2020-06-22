import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    LottieModule.forRoot({player: playerFactory})
  ],
  exports: [
    HeaderComponent,
    PreloaderComponent,
  ],
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    PreloaderComponent,
  ],
  providers: []
})
export class SharedModule {
}
