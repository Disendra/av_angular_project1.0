import { Component, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './home-page/home-page.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { AvEnginnerComponent } from './av-enginner/av-enginner.component'
import { AdminPageComponent } from './admin-page/admin-page.component'
import { EkartComponent } from './ekart/ekart.component'
import { BussinessCardComponent } from './bussiness-card/bussiness-card.component'
import { CanActivateService } from './services/can-activate.service'
import { CommunityPageComponent } from './community-page/community-page.component'

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '****', redirectTo: '' },
  { path: 'home-page', redirectTo: '' },
  { path: 'login-page/:value', component: LoginPageComponent },
  { path: 'ekart-page/:sessionId', component: EkartComponent },
  { path: 'avCommunity/:sessionId', component: CommunityPageComponent, canActivate: [CanActivateService] },
  { path: 'avEngineer-dashboard/:sessionId', component: AvEnginnerComponent, canActivate: [CanActivateService] },
  { path: 'av-community', component: CommunityPageComponent, canActivate: [CanActivateService] },
  { path: 'admin-page', component: AdminPageComponent, canActivate: [CanActivateService] },
  { path: 'bussiness-card/:emailId/:timeStamp', component: BussinessCardComponent, canActivate: [CanActivateService] },
  // { path: 'av-about', component: AvAboutComponent} 
]   

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
