import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { InterviewSchedulerComponent } from './interview-scheduler/interview-scheduler.component';
import { CommunicationComponent } from './communication/communication.component';
import { ResourcesComponent } from './resources/resources.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { HeaderComponent } from '../Staff/staff-all/header/header.component';
import { RecruiterSidebarComponent } from './recruiter-sidebar/recruiter-sidebar.component';
import { RecruiterHeaderComponent } from "./recruiter-header/recruiter-header.component";
// import { JobApplicantsComponent } from "./job-applicants/job-applicants.component";
import { CommonModule } from '@angular/common';
import { SidebarService } from '../Staff/staff-all/sidebar/sidebar.service';

@Component({
  selector: 'app-recruiter-all',
  standalone: true,
  imports: [AnalyticsComponent,
    InterviewSchedulerComponent,
    CommunicationComponent,
    ResourcesComponent,
    StudentSearchComponent,
    JobPostingComponent,
    RecruiterSidebarComponent,
    HeaderComponent, RecruiterHeaderComponent,CommonModule],
  templateUrl: './recruiter-all.component.html',
  styleUrl: './recruiter-all.component.css'
})
export class RecruiterAllComponent {

  selectedItems: string[] = [];
  currentDate: Date = new Date();
  constructor(
    private sidebarService: SidebarService
  ) // private authService: AuthService

  {}

  ngOnInit() {
    this.sidebarService.selectedItems$.subscribe((items) => {
      this.selectedItems = items;
    });


  }

}
