import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {AppLayoutComponent} from './layouts/app-layout/app-layout.component';
import {RegisterComponent} from './register/register.component';
import {MainPageComponent} from './main-page/main-page.component';

const routes: Routes = [
  // {path: '', redirectTo "/login"},
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },
  {
    path: '', component: AppLayoutComponent, children: [
     {path: 'mainpage', component: MainPageComponent},
    ]
  }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{
}
