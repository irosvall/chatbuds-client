import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WelcomeComponent } from '../components/welcome/welcome.component'
import { RegisterComponent } from '../components/register/register.component'
import { LoginComponent } from '../components/login/login.component'
import { PageNotFoundComponent } from '../components/errors/page-not-found/page-not-found.component'
import { AuthGuard } from '../guards/auth/auth.guard'
import { AnonymousGuard } from '../guards/anonymous/anonymous.guard'

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
