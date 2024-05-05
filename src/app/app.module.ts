import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeroComponent } from './home-page/hero/hero.component';
import { HeaderComponent } from './home-page/header/header.component';
import { AboutComponent } from './home-page/about/about.component';
import { ValuesComponent } from './home-page/values/values.component';
import { CountsComponent } from './home-page/counts/counts.component';
import { FeaturesComponent } from './home-page/features/features.component';
import { ServicesComponent } from './home-page/services/services.component';
import { PricingComponent } from './home-page/pricing/pricing.component';
import { FaqComponent } from './home-page/faq/faq.component';
import { TeamComponent } from './home-page/team/team.component';
import { ClientsComponent } from './home-page/clients/clients.component';
import { RecentBlogPostsComponent } from './home-page/recent-blog-posts/recent-blog-posts.component';
import { ContactComponent } from './home-page/contact/contact.component';
import { FooterComponent } from './home-page/footer/footer.component';
import { TestimonialsComponent } from './home-page/testimonials/testimonials.component';
import { AvEnginnerComponent } from './av-enginner/av-enginner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvHeaderComponent } from './av-enginner/av-header/av-header.component';
import { AvAboutComponent } from './av-enginner/av-about/av-about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, matDialogAnimations } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { AvSimulatorComponent } from './av-enginner/av-simulator/av-simulator.component';
import { AvMyprofileComponent } from './av-enginner/av-myprofile/av-myprofile.component';
import { AvCalculatorComponent } from './av-enginner/av-calculator/av-calculator.component';
import { BtuCalculatorComponent } from './av-enginner/btu-calculator/btu-calculator.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AvDirectoryComponent } from './av-enginner/av-directory/av-directory.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SpinnerComponent } from './spinner/spinner.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FeedComponent } from './feed/feed.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MatButtonModule } from '@angular/material/button';
import { EkartComponent } from './ekart/ekart.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReportsComponent } from './av-enginner/reports/reports.component';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { BussinessCardComponent } from './bussiness-card/bussiness-card.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommunityPageComponent } from './community-page/community-page.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { CommunityMyPostsComponent } from './community-page/community-my-posts/community-my-posts.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ValuesComponent,
    CountsComponent,
    FeaturesComponent,
    ServicesComponent,
    PricingComponent,
    FaqComponent,
    TestimonialsComponent,
    TeamComponent,
    ClientsComponent,
    RecentBlogPostsComponent,
    ContactComponent,
    FooterComponent,
    LoginPageComponent,
    HomePageComponent,
    AvEnginnerComponent,
    AvHeaderComponent,
    AvAboutComponent,
    AvSimulatorComponent,
    AvMyprofileComponent,
    AvCalculatorComponent,
    BtuCalculatorComponent,
    AvDirectoryComponent,
    FeedbackPageComponent,
    SpinnerComponent,
    FeedComponent,
    AdminPageComponent,
    EkartComponent,
    ReportsComponent,
    BussinessCardComponent,
    CommunityPageComponent,
    CommunityMyPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    RecaptchaFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    RecaptchaModule,
    MatCheckboxModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressBarModule,
    MatNativeDateModule,
    QRCodeModule,
    MatListModule,
  ],
  providers: [
    DatePipe,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1065972689564-bhadjrd6sv3isoq6k17ktkpgijvfolpo.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
