import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRootComponent } from './auth-root/auth-root.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {
    path: '',
    component: AuthRootComponent,
    children: [
      {
        path: '',
        component: SignInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
