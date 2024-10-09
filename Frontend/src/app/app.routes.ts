import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataComponent } from './data/data.component';
import { PlacementPageComponent } from './placement-page/placement-page.component'; 
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentSignupComponent } from './student-signup/student-signup.component';

export const routes: Routes = [
  { path: 'signup-dasboard', component: SignupComponent }, // Add route for signup
  { path: '', component: LandingPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'nav', component: NavbarComponent },
  { path: 'data', component: DataComponent },
  { path: 'placement', component: PlacementPageComponent },
  { path: 'login', component: StudentLoginComponent },
  { path: 'dashboard', component: StudentDashboardComponent },
  { path: 'signup', component: StudentSignupComponent },
];
