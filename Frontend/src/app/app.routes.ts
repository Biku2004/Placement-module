import {Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {AdminPageComponent} from './Staff/admin-page/admin-page.component';
import {SignupComponent} from './signup/signup.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DataComponent} from './data/data.component';
import {PlacementPageComponent} from './placement-page/placement-page.component';
import {StudentLoginComponent} from './student-login/student-login.component';
import {StudentDashboardComponent} from './student-dashboard/student-dashboard.component';
import {StudentSignupComponent} from './student-signup/student-signup.component';
// import { StaffDashboardComponent } from './Staff/staff-dashboard/staff-dashboard.component';
import {StaffAllComponent} from './Staff/staff-all/staff-all.component';
import {StaffLoginComponent} from './Staff/staff-login/staff-login.component';
import {StaffSignupComponent} from './Staff/staff-signup/staff-signup.component';
import {CreateJobsComponent} from './Staff/staff-all/create-jobs/create-jobs.component';
import {ContactusComponent} from "./contactus/contactus.component";
import {LearningComponent} from "./learning/learning.component";
import {AboutComponent} from "./about/about.component";
import { StaffEditProfileComponent } from './Staff/staff-all/staff-edit-profile/staff-edit-profile.component';

export const routes: Routes = [
  // {path: 'signup-dasboard', component: SignupComponent}, // Add route for signup
  {path: '', component: SignupComponent}, // Add route for signup
  // {path: '', component: LandingPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'nav', component: NavbarComponent},
  {path: 'data', component: DataComponent},
  {path: 'placement', component: PlacementPageComponent},
  {path: 'login', component: StudentLoginComponent},
  {path: 'student-dashboard', component: StudentDashboardComponent},
  {path: 'signup', component: StudentSignupComponent},
  {path: 'staff-dashboard', component: StaffAllComponent},
  {path: 'staff-login', component: StaffLoginComponent},
  {path: 'staff-signup', component: StaffSignupComponent},
  {path: 'create-job', component: CreateJobsComponent},
  {path: 'contactus', component: ContactusComponent},
  {path: 'learning', component: LearningComponent},
  { path: 'about', component: AboutComponent },
  { path: 'staff-edit-profile', component: StaffEditProfileComponent },
  { path: '', redirectTo: 'about', pathMatch: 'full' }
];
