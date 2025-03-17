import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentSidebarComponent } from "./student-sidebar/student-sidebar.component";
import { StudentHeaderComponent } from "./student-header/student-header.component";
import { SidebarService } from '../Staff/staff-all/sidebar/sidebar.service';
import { JobPortalComponent } from './job-portal/job-portal.component';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AppliedJobsComponent } from "./job-portal/applied-jobs/applied-jobs.component";
import { ApplyJobComponent } from "./job-portal/apply-job/apply-job.component";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [StudentSidebarComponent,
    StudentHeaderComponent,
    CommonModule,
    JobPortalComponent,
    ProgressDashboardComponent,
    NotificationsComponent, AppliedJobsComponent, ApplyJobComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  selectedItems: string[] = [];
    currentDate: Date = new Date();
  
    constructor(
      private sidebarService: SidebarService
    ){}
  
    ngOnInit() {
      this.sidebarService.selectedItems$.subscribe((items) => {
        this.selectedItems = items;
      });

    }
}
