import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login-page/login/login.component';
import {AuthLayoutComponent} from './login-page/layouts/auth-layout/auth-layout.component';
import {AppLayoutComponent} from './main-page/layouts/app-layout/app-layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {LoginGuard} from './shared/login.guard';

const routes: Routes = [
  // {path: '', redirectTo "/login"},
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent}
    ]
  },
  { // canActivate: [LoginGuard],
    path: '', component: AppLayoutComponent,   children: [
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
