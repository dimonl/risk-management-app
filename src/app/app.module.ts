import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './services/login.service';
import { MainPageComponent } from './main-page/main-page.component';
import { AppControlPanelComponent } from './app-control-panel/app-control-panel.component';
import { AppRisksTabComponent } from './app-risks-tab/app-risks-tab.component';
import { AppRiskEditorComponent } from './app-risk-editor/app-risk-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    AuthLayoutComponent,
    AppLayoutComponent,
    RegisterComponent,
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
