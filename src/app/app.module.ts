import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing/app-routing.module'

import { PasswordEqualValidatorDirective } from './validators/password-equal.directive'
import { AlphanumericValidatorDirective } from './validators/alphanumeric.directive'
import { EmailValidatorDirective } from './validators/email.directive'

import { AppComponent } from './app.component'
import { WelcomeComponent } from './components/welcome/welcome.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component'
import { HeaderComponent } from './components/header/header.component'
import { LogoutComponent } from './components/logout/logout.component'
import { AlertComponent } from './components/alert/alert.component'
import { PublicChatComponent } from './components/public-chat/public-chat.component'
import { HomeComponent } from './components/home/home.component'
import { RandomChatComponent } from './components/random-chat/random-chat.component'
import { FriendListComponent } from './components/friend-list/friend-list.component'
import { PrivateChatComponent } from './components/private-chat/private-chat.component'
import { HttpErrorInterceptor } from './interceptors/http-error/http-error.interceptor';
import { InternalServerErrorComponent } from './components/errors/internal-server-error/internal-server-error.component';
import { FooterComponent } from './components/footer/footer.component'

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
    AlertComponent,
    PublicChatComponent,
    HomeComponent,
    RandomChatComponent,
    FriendListComponent,
    PrivateChatComponent,
    InternalServerErrorComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
