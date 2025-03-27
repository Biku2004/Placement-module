import { Component, OnInit } from '@angular/core';
import { AppliedJob } from '../../student-profile/applied-job';
import { StudentService } from '../../student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.css'
})
export class AppliedJobsComponent implements OnInit {
  appliedJobs: AppliedJob[] = [];

  batchYears: string[] = [];
  selectedBatchYear: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadAppliedJobs();
  }

  // ngOnInit() {
  //   this.studentService.getBatchYears().subscribe(
  //       (years) => {
  //           this.batchYears = years;
  //           this.selectedBatchYear = years[0] || '';
  //           this.loadAppliedJobs();
  //       },
  //       (error) => console.error('Error loading batch years:', error)
  //   );
  // }

// this.selectedBatchYear
  loadAppliedJobs() {
    this.studentService.getAppliedJobs().subscribe(
      (applications) => {
        this.appliedJobs = applications.map(app => ({
          jobPostId: app.jobPostId, // Changed from jobId to jobPostId
          companyName: app.companyName || 'Unknown Company',
          jobRole: app.jobRole || 'Unknown Role',
          logo: app.logo ? `data:image/jpeg;base64,${app.logo}` : 'https://via.placeholder.com/50',
          applicationDate: app.applicationDate || new Date().toISOString().split('T')[0],
          status: app.status,
          rounds: app.rounds || [],
          examLink: app.examLink // Add exam link
        }));
      },
      (error) => console.error('Error loading applied jobs:', error)
    );
  }

  // onBatchYearChange() {
  //   this.loadAppliedJobs();
  // }

  deregisterJob(job: AppliedJob) {
    if (confirm(`Are you sure you want to deregister from ${job.jobRole} at ${job.companyName}?`)) {
      this.studentService.deregisterFromJobPosting(job.jobPostId).subscribe(
        () => {
          this.appliedJobs = this.appliedJobs.filter(j => j.jobPostId !== job.jobPostId);
          alert('Successfully deregistered from the job.');
        },
        (error) => {
          console.error('Error deregistering from job:', error);
          alert('Failed to deregister. Please try again.');
        }
      );
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Applied':
        return 'bg-yellow-100 text-yellow-700';
      case 'Under Review':
        return 'bg-blue-100 text-blue-700';
      case 'Offer Received':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  getRoundStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'bg-gray-200 text-gray-700';
      case 'Opened':
        return 'bg-blue-200 text-blue-700';
      case 'Completed':
        return 'bg-green-200 text-green-700';
      case 'Failed':
        return 'bg-red-200 text-red-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  }
}