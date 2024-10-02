import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent }, // Add route for signup
  { path: '', component: LandingPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'nav', component: NavbarComponent },
];
