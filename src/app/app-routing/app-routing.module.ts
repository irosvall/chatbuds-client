import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WelcomeComponent } from '../components/pages/welcome/welcome.component'
import { RegisterComponent } from '../components/auth/register/register.component'
import { LoginComponent } from '../components/auth/login/login.component'
import { PageNotFoundComponent } from '../components/errors/page-not-found/page-not-found.component'
import { LogoutComponent } from '../components/auth/logout/logout.component'

import { AuthGuard } from '../guards/auth/auth.guard'
import { AnonymousGuard } from '../guards/anonymous/anonymous.guard'
import { HomeComponent } from '../components/pages/home/home.component'
import { HomeGuard } from '../guards/home/home.guard'
import { RandomChatComponent } from '../components/chats/random-chat/random-chat.component'
import { PrivateChatComponent } from '../components/chats/private-chat/private-chat.component'
import { InternalServerErrorComponent } from '../components/errors/internal-server-error/internal-server-error.component'
import { DeleteAccountComponent } from '../components/auth/delete-account/delete-account.component'
import { ContactComponent } from '../components/pages/contact/contact.component'
import { InformationComponent } from '../components/pages/information/information.component'

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'information', component: InformationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AnonymousGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'findchat', component: RandomChatComponent, canActivate: [AuthGuard] },
  { path: 'chat/:id', component: PrivateChatComponent, canActivate: [AuthGuard] },
  { path: 'delete-account', component: DeleteAccountComponent, canActivate: [AuthGuard] },
  { path: '404', component: PageNotFoundComponent },
  { path: '500', component: InternalServerErrorComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
