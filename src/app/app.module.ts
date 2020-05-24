import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login-page/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { AuthLayoutComponent } from './login-page/layouts/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './main-page/layouts/app-layout/app-layout.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './shared/services/login.service';
import { MainPageComponent } from './main-page/main-page.component';
import { AppControlPanelComponent } from './main-page/app-control-panel/app-control-panel.component';
import { AppRisksTabComponent } from './main-page/app-risks-tab/app-risks-tab.component';
import { AppRiskEditorComponent } from './main-page/app-risk-editor/app-risk-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthLayoutComponent,
    AppLayoutComponent,
    MainPageComponent,
    AppControlPanelComponent,
    AppRisksTabComponent,
    AppRiskEditorComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
