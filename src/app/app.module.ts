import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing/app-routing.module'

import { PasswordEqualValidatorDirective } from './validators/password-equal.directive'
import { AlphanumericValidatorDirective } from './validators/alphanumeric.directive'
import { EmailValidatorDirective } from './validators/email.directive'

import { AppComponent } from './app.component'
import { WelcomeComponent } from './components/welcome/welcome.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoutComponent } from './components/logout/logout.component'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RegisterComponent,
    PasswordEqualValidatorDirective,
    AlphanumericValidatorDirective,
    EmailValidatorDirective,
    LoginComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
