import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WelcomeComponent } from '../components/welcome/welcome.component'
import { RegisterComponent } from '../components/register/register.component'
import { LoginComponent } from '../components/login/login.component'
import { PageNotFoundComponent } from '../components/errors/page-not-found/page-not-found.component'

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
