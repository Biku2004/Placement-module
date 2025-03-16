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
import { JobPortalComponent } from './job-portal/job-portal.component';
import { ApplyJobComponent } from './student-dashboard/job-portal/apply-job/apply-job.component';
import { AppliedJobsComponent } from './student-dashboard/job-portal/applied-jobs/applied-jobs.component';
import { JobPostingComponent } from './recruiter-all/job-posting/job-posting.component';
import { StudentSearchComponent } from './recruiter-all/student-search/student-search.component';
import { InterviewSchedulerComponent } from './recruiter-all/interview-scheduler/interview-scheduler.component';
import { AnalyticsComponent } from './recruiter-all/analytics/analytics.component';
import { CommunicationComponent } from './recruiter-all/communication/communication.component';
import { ResourcesComponent } from './recruiter-all/resources/resources.component';
import { RecruiterAllComponent } from './recruiter-all/recruiter-all.component';
import { RecruiterProvidedComponent } from './Staff/staff-all/recruiters-provided-jobs/recruiters-provided-jobs.component';


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
  {path: 'about', component: AboutComponent },
  {path: 'staff-edit-profile', component: StaffEditProfileComponent },
  {path: 'recruiter-jobs-provided', component: RecruiterProvidedComponent },
  {path: 'job-portal',component:JobPortalComponent},
  {path: 'apply-job',component:ApplyJobComponent},
  {path: 'applied-jobs',component:AppliedJobsComponent},
  {path: 'recruiter/jobs/post', component: JobPostingComponent },
  {path: 'recruiter/students', component: StudentSearchComponent },
  {path: 'recruiter/interviews', component: InterviewSchedulerComponent },
  {path: 'recruiter/analytics', component: AnalyticsComponent },
  {path: 'recruiter/communication', component: CommunicationComponent },
  {path: 'recruiter/resources', component: ResourcesComponent },
  {path: 'recruiter-dashboard', component: RecruiterAllComponent},
  {path: '', redirectTo: 'about', pathMatch: 'full' }
];
