import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { PasswordEqualValidatorDirective } from './validators/password-equal.directive'
import { AlphanumericValidatorDirective } from './validators/alphanumeric.directive'
import { EmailValidatorDirective } from './validators/email.directive'

import { AppComponent } from './app.component'
import { WelcomeComponent } from './components/welcome/welcome.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RegisterComponent,
    PasswordEqualValidatorDirective,
    AlphanumericValidatorDirective,
    EmailValidatorDirective,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
