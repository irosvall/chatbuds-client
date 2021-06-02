import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing/app-routing.module'

import { PasswordEqualValidatorDirective } from './validators/password-equal.directive'
import { AlphanumericValidatorDirective } from './validators/alphanumeric.directive'
import { EmailValidatorDirective } from './validators/email.directive'

import { AppComponent } from './app.component'
import { WelcomeComponent } from './components/pages/welcome/welcome.component'
import { RegisterComponent } from './components/auth/register/register.component'
import { LoginComponent } from './components/auth/login/login.component'
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component'
import { HeaderComponent } from './components/partials/header/header.component'
import { LogoutComponent } from './components/auth/logout/logout.component'
import { AlertComponent } from './components/partials/alert/alert.component'
import { PublicChatComponent } from './components/chats/public-chat/public-chat.component'
import { HomeComponent } from './components/pages/home/home.component'
import { RandomChatComponent } from './components/chats/random-chat/random-chat.component'
import { FriendListComponent } from './components/partials/friend-list/friend-list.component'
import { PrivateChatComponent } from './components/chats/private-chat/private-chat.component'
import { HttpErrorInterceptor } from './interceptors/http-error/http-error.interceptor'
import { InternalServerErrorComponent } from './components/errors/internal-server-error/internal-server-error.component'
import { FooterComponent } from './components/partials/footer/footer.component'
import { DeleteAccountComponent } from './components/auth/delete-account/delete-account.component'
import { ContactComponent } from './components/pages/contact/contact.component'
import { InformationComponent } from './components/pages/information/information.component'

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
    DeleteAccountComponent,
    ContactComponent,
    InformationComponent,
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
