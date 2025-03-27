import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { jobService } from '../recruiter.service';
import { JobService } from '../create-jobs/job.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobApplication } from './job-application';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-job-applicants-1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-applicants.component.html',
  styleUrl: './job-applicants.component.css',
})
export class JobApplicantsComponent1 implements OnInit {
  jobId: number | null = null;
  applications: JobApplication[] = [];
  error: string | null = null;
  selectedApplications: number[] = [];
  examLinkInput: string = '';
  testScheduledTimeInput: string = ''; // Format: "YYYY-MM-DDTHH:MM" (e.g., "2025-03-25T10:00")

  batchYears: string[] = [];
  selectedBatchYear: string = '';

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    // Get jobId from route params
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.jobId) {
      this.loadApplications();
    } else {
      this.error = 'Invalid job ID';
    }
  }

  loadApplications(): void {
    if (this.jobId) {
      this.jobService.getJobPostApplications(this.jobId).subscribe(
        (applications) => {
          console.log('Applications loaded:', applications);
          this.applications = applications;
        },
        (error) => {
          console.error('Error loading applications:', error);
          this.error = 'Failed to load applicants. Please try again.';
        }
      );
    }
  }

  rejectApplication(application: JobApplication) {
    if (confirm(`Reject application from ${application.studentEmail}?`)) {
      this.jobService.rejectApplication(application.id).subscribe(
        (updatedApp) => {
          application.status = updatedApp.status;
          application.rounds = updatedApp.rounds;
        },
        (error) => console.error('Error rejecting application:', error)
      );
    }
  }

  shortlistApplication(application: JobApplication) {
    if (
      confirm(
        `Shortlist ${application.studentEmail} for ${application.jobRole}?`
      )
    ) {
      this.jobService.shortlistApplication(application.id).subscribe(
        (updatedApp) => {
          application.status = updatedApp.status;
          application.rounds = updatedApp.rounds;
        },
        (error) => console.error('Error shortlisting application:', error)
      );
    }
  }

  updateRoundStatus(
    application: JobApplication,
    roundName: string,
    status: string
  ) {
    this.jobService
      .updateRoundStatus(application.id, roundName, status)
      .subscribe(
        (updatedApp) => {
          application.status = updatedApp.status;
          application.rounds = updatedApp.rounds;
        },
        (error) => console.error('Error updating round status:', error)
      );
  }

  toggleSelection(application: JobApplication) {
    application.selected = !application.selected;
    this.updateSelectedApplications();
  }

  toggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.applications.forEach((app) => (app.selected = checked));
    this.updateSelectedApplications();
  }

  updateSelectedApplications() {
    this.selectedApplications = this.applications
      .filter((app) => app.selected)
      .map((app) => app.id);
  }

  // bulkReject() {
  //   if (this.selectedApplications.length === 0) {
  //       alert('Please select at least one application.');
  //       return;
  //   }
  //   if (confirm(`Reject ${this.selectedApplications.length} selected applications?`)) {
  //       this.jobService.bulkRejectApplications(this.selectedApplications).subscribe(
  //           (updatedApps) => {
  //             updatedApps.forEach((updatedApp: JobApplication) => {
  //                   const app = this.applications.find(a => a.id === updatedApp.id);
  //                   if (app) {
  //                       app.status = updatedApp.status;
  //                       app.rounds = updatedApp.rounds;
  //                       app.selected = false;
  //                   }
  //               });
  //               this.updateSelectedApplications();
  //           },
  //           (error) => console.error('Error bulk rejecting:', error)
  //       );
  //   }
  // }

  // bulkShortlist() {
  //   if (this.selectedApplications.length === 0) {
  //       alert('Please select at least one application.');
  //       return;
  //   }
  //   if (confirm(`Shortlist ${this.selectedApplications.length} selected applications?`)) {
  //       this.jobService.bulkShortlistApplications(this.selectedApplications).subscribe(
  //           (updatedApps) => {
  //             updatedApps.forEach((updatedApp: JobApplication) => {
  //                   const app = this.applications.find(a => a.id === updatedApp.id);
  //                   if (app) {
  //                       app.status = updatedApp.status;
  //                       app.rounds = updatedApp.rounds;
  //                       app.selected = false;
  //                   }
  //               });
  //               this.updateSelectedApplications();
  //           },
  //           (error) => console.error('Error bulk shortlisting:', error)
  //       );
  //   }
  // }

  exportToExcel() {
    if (this.jobId) {
      this.jobService.exportJobApplications(this.jobId).subscribe(
        (blob) => {
          saveAs(blob, 'applicants.xlsx');
        },
        (error) => console.error('Error exporting to Excel:', error)
      );
    }
  }

  setExamDetails(application: JobApplication) {
    if (!this.examLinkInput || !this.testScheduledTimeInput) {
      alert('Please provide both an exam link and a scheduled time.');
      return;
    }
    this.jobService
      .setExamDetails(
        application.id,
        this.examLinkInput,
        this.testScheduledTimeInput
      )
      .subscribe(
        (updatedApp) => {
          application.examLink = updatedApp.examLink;
          application.testScheduledTime = updatedApp.testScheduledTime;
          application.rounds = updatedApp.rounds;
          this.examLinkInput = '';
          this.testScheduledTimeInput = '';
          alert('Exam details set successfully.');
        },
        (error) => console.error('Error setting exam details:', error)
      );
  }

  // New method to check if "Test" round exists
  hasTestRound(application: JobApplication): boolean {
    return application.rounds.some((r) => r.name === 'Test');
  }
}
