import { Component, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './home-page/home-page.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { AvEnginnerComponent } from './av-enginner/av-enginner.component'
import { AdminPageComponent } from './admin-page/admin-page.component'
import { EkartComponent } from './ekart/ekart.component'
import { BussinessCardComponent } from './bussiness-card/bussiness-card.component'
import { CommunityPageComponent } from './community-page/community-page.component'
import { ContactComponent } from './home-page/contact/contact.component'
import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '****', redirectTo: '' },
  { path: 'home-page', redirectTo: '' },
  { path: 'contactUs', component: ContactComponent },
  { path: 'login-page/:value', component: LoginPageComponent },
  { path: 'ekart-page', component: EkartComponent },
  { path: 'av-community', component: CommunityPageComponent, canActivate: [AuthGuardService] },
  { path: 'avEngineer-dashboard', component: AvEnginnerComponent, canActivate: [AuthGuardService] },
  { path: 'admin-page', component: AdminPageComponent, canActivate: [AuthGuardService] },
  { path: 'bussiness-card/:emailId', component: BussinessCardComponent }
]   


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
