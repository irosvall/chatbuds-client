import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WelcomeComponent } from '../components/welcome/welcome.component'
import { RegisterComponent } from '../components/register/register.component'
import { LoginComponent } from '../components/login/login.component'
import { PageNotFoundComponent } from '../components/errors/page-not-found/page-not-found.component'
import { LogoutComponent } from '../components/logout/logout.component'

import { AuthGuard } from '../guards/auth/auth.guard'
import { AnonymousGuard } from '../guards/anonymous/anonymous.guard'
import { HomeComponent } from '../components/home/home.component'
import { HomeGuard } from '../guards/home/home.guard'
import { RandomChatComponent } from '../components/random-chat/random-chat.component'
import { PrivateChatComponent } from '../components/private-chat/private-chat.component'
import { FriendGuard } from '../guards/friend/friend.guard'

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AnonymousGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'randomchat', component: RandomChatComponent, canActivate: [AuthGuard] },
  { path: 'chat/:id', component: PrivateChatComponent, canActivate: [AuthGuard] },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
