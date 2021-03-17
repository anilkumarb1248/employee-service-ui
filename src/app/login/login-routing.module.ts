import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotComponent } from './forgot/forgot.component';
import { PageNotFoundComponent } from '../common/page-not-found/page-not-found.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full'},
      { path: 'sign-in', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
